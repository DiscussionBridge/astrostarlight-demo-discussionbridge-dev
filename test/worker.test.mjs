import assert from "node:assert/strict";
import test from "node:test";

import worker from "../worker/index.mjs";

test("delegates non-API requests to static assets", async () => {
  const expected = new Response("asset", { status: 200 });
  const env = { ASSETS: { fetch: async () => expected } };
  const response = await worker.fetch(new Request("https://example.test/"), env);
  assert.equal(response, expected);
});

test("rejects invalid topic IDs", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/api/discourse/topics/not-a-number.json"),
    { ASSETS: { fetch: async () => assert.fail("asset fallback called") } },
  );
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Invalid topic ID." });
});

test("rejects non-GET topic requests", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/api/discourse/topics/33.json", { method: "POST" }),
    { ASSETS: { fetch: async () => assert.fail("asset fallback called") } },
  );
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("Allow"), "GET");
});

test("proxies numeric topic IDs without caching", async (context) => {
  const originalFetch = globalThis.fetch;
  context.after(() => {
    globalThis.fetch = originalFetch;
  });

  globalThis.fetch = async (url, init) => {
    assert.equal(url, "https://forum.discussionbridge.dev/t/33.json");
    assert.equal(init.headers.Accept, "application/json");
    return Response.json({ id: 33 });
  };

  const response = await worker.fetch(
    new Request("https://example.test/api/discourse/topics/33.json"),
    { ASSETS: { fetch: async () => assert.fail("asset fallback called") } },
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await response.json(), { id: 33 });
});
