import assert from "node:assert/strict";
import test from "node:test";
import worker, { proxyDiscourseTopic } from "../worker/index.mjs";

function topicPayload(topicId = 33) {
  return { id: topicId, post_stream: { posts: [{
    id: 1, post_number: 1, topic_id: topicId, score: 1, username: "discobot",
    topic_slug: "topic", created_at: "2026-08-24T00:00:00.000Z",
    cooked: "<p>Trusted Discourse cooked HTML.</p>",
  }] } };
}

function upstreamResponse(payload = topicPayload(), options = {}) {
  const response = Response.json(payload, options);
  Object.defineProperty(response, "url", {
    value: options.url ?? "https://forum.discussionbridge.dev/t/33.json",
  });
  return response;
}

test("delegates non-API requests to static assets", async () => {
  const expected = new Response("asset", { status: 200 });
  const env = { ASSETS: { fetch: async () => expected } };
  assert.equal(await worker.fetch(new Request("https://example.test/"), env), expected);
});

test("rejects invalid topic IDs and non-GET requests", async () => {
  for (const id of ["not-a-number", "0", "9007199254740993"]) {
    const response = await worker.fetch(
      new Request(`https://example.test/api/discourse/topics/${id}.json`),
      { ASSETS: { fetch: async () => assert.fail("asset fallback called") } },
    );
    assert.equal(response.status, 400);
  }
  const response = await worker.fetch(
    new Request("https://example.test/api/discourse/topics/33.json", { method: "POST" }),
    { ASSETS: { fetch: async () => assert.fail("asset fallback called") } },
  );
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("Allow"), "GET");
});

test("proxies a bounded exact-topic JSON response without caching", async () => {
  const response = await proxyDiscourseTopic("33", {
    fetchImpl: async (url, init) => {
      assert.equal(url, "https://forum.discussionbridge.dev/t/33.json");
      assert.equal(init.headers.Accept, "application/json");
      assert.equal(init.redirect, "error");
      assert.ok(init.signal instanceof AbortSignal);
      return upstreamResponse();
    },
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await response.json(), topicPayload());
});

test("rejects foreign finals, redirects, status errors, and non-JSON bodies", async () => {
  const nonJson = new Response("not json", { headers: { "Content-Type": "text/html" } });
  Object.defineProperty(nonJson, "url", { value: "https://forum.discussionbridge.dev/t/33.json" });
  const cases = [
    async () => upstreamResponse(topicPayload(), { url: "https://attacker.invalid/t/33.json" }),
    async () => { throw new TypeError("redirect mode is error"); },
    async () => upstreamResponse(topicPayload(), { status: 503 }),
    async () => nonJson,
  ];
  for (const fetchImpl of cases) {
    const response = await proxyDiscourseTopic("33", { fetchImpl });
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: "Discussion unavailable." });
  }
});

test("rejects oversized, malformed, and wrong-topic payloads", async () => {
  const oversized = upstreamResponse();
  oversized.headers.set("Content-Length", String(2 * 1024 * 1024 + 1));
  const wrongPost = topicPayload();
  wrongPost.post_stream.posts[0].topic_id = 34;
  const values = [
    oversized,
    upstreamResponse({ id: 33, post_stream: { posts: [{ cooked: "<p>x</p>" }] } }),
    upstreamResponse(topicPayload(34), { url: "https://forum.discussionbridge.dev/t/33.json" }),
    upstreamResponse(wrongPost),
    upstreamResponse({ post_stream: { posts: [] } }),
    upstreamResponse({ id: null, post_stream: { posts: [] } }),
    upstreamResponse({ id: "33", post_stream: { posts: [] } }),
    upstreamResponse({ id: Number.MAX_SAFE_INTEGER + 1, post_stream: { posts: [] } }),
  ];
  for (const upstream of values) {
    const response = await proxyDiscourseTopic("33", { fetchImpl: async () => upstream });
    assert.equal(response.status, 502);
  }
});

test("accepts an exact top-level topic identity with an empty post stream", async () => {
  const response = await proxyDiscourseTopic("33", {
    fetchImpl: async () => upstreamResponse({ id: 33, post_stream: { posts: [] } }),
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { id: 33, post_stream: { posts: [] } });
});

test("bounds stalled upstream requests", async () => {
  const response = await proxyDiscourseTopic("33", {
    timeoutMs: 5,
    fetchImpl: async (_url, init) => await new Promise((_resolve, reject) => {
      init.signal.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
    }),
  });
  assert.equal(response.status, 504);
  assert.deepEqual(await response.json(), { error: "Discussion request timed out." });
});

test("cancels rejected upstream bodies on early boundaries and streamed overflow", async () => {
  for (const mode of ["declared", "foreign", "streamed"]) {
    let cancellations = 0;
    const body = new ReadableStream({
      start(controller) {
        if (mode === "streamed") controller.enqueue(new Uint8Array(2 * 1024 * 1024 + 1));
      },
      cancel() {
        cancellations += 1;
      },
    });
    const response = new Response(body, {
      headers: {
        "Content-Type": "application/json",
        ...(mode === "declared" ? { "Content-Length": String(2 * 1024 * 1024 + 1) } : {}),
      },
    });
    Object.defineProperty(response, "url", {
      value: mode === "foreign"
        ? "https://attacker.invalid/t/33.json"
        : "https://forum.discussionbridge.dev/t/33.json",
    });
    const result = await proxyDiscourseTopic("33", { fetchImpl: async () => response });
    assert.equal(result.status, 502);
    assert.equal(cancellations, 1, `${mode} rejection cancels exactly once`);
  }
});
