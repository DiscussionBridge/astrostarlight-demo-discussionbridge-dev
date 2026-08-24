const discourseUrl = "https://forum.discussionbridge.dev";
const topicPath = /^\/api\/discourse\/topics\/([^/]+)\.json$/;
const proxyTimeoutMs = 10_000;
const maxResponseBytes = 2 * 1024 * 1024;
const maxCookedBytes = 512 * 1024;
const maxPosts = 1_000;

function json(body, status, extraHeaders = {}) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extraHeaders },
  });
}

function safeTopicId(value) {
  return /^[1-9]\d*$/.test(value) && Number.isSafeInteger(Number(value));
}

function jsonContentType(response) {
  const value = response.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  return value === "application/json" || value?.endsWith("+json");
}

async function boundedText(response) {
  const declared = response.headers.get("content-length");
  if (declared) {
    const bytes = Number(declared);
    if (!Number.isSafeInteger(bytes) || bytes < 0 || bytes > maxResponseBytes) {
      await response.body?.cancel().catch(() => undefined);
      throw new Error("oversize");
    }
  }
  if (!response.body) throw new Error("missing body");
  const reader = response.body.getReader();
  const chunks = [];
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxResponseBytes) throw new Error("oversize");
      chunks.push(value);
    }
  } catch (error) {
    await reader.cancel().catch(() => undefined);
    throw error;
  }
  const joined = new Uint8Array(bytes);
  let offset = 0;
  for (const chunk of chunks) {
    joined.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(joined);
}

function positiveSafeInteger(value) {
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0;
}

function validateTopicPayload(value, expectedTopicId) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("invalid payload");
  if (!positiveSafeInteger(value.id) || value.id !== expectedTopicId) throw new Error("wrong topic");
  const posts = value.post_stream?.posts;
  if (!Array.isArray(posts) || posts.length > maxPosts) throw new Error("invalid posts");
  for (const post of posts) {
    if (!post || typeof post !== "object" || Array.isArray(post)) throw new Error("invalid post");
    for (const key of ["id", "post_number", "topic_id"]) {
      if (!positiveSafeInteger(post[key])) throw new Error("invalid post identity");
    }
    if (post.topic_id !== expectedTopicId) throw new Error("wrong topic");
    if (typeof post.score !== "number" || !Number.isFinite(post.score)) throw new Error("invalid score");
    for (const key of ["username", "topic_slug", "created_at", "cooked"]) {
      if (typeof post[key] !== "string" || !post[key] || post[key].length > 1_000_000) {
        throw new Error("invalid post string");
      }
    }
    if (new TextEncoder().encode(post.cooked).byteLength > maxCookedBytes) throw new Error("oversize cooked");
    if (!Number.isFinite(Date.parse(post.created_at))) throw new Error("invalid date");
  }
}

export async function proxyDiscourseTopic(
  topicIdText,
  { fetchImpl = fetch, timeoutMs = proxyTimeoutMs } = {},
) {
  if (!safeTopicId(topicIdText)) return json({ error: "Invalid topic ID." }, 400);
  const topicId = Number(topicIdText);
  const upstreamUrl = new URL(`/t/${topicId}.json`, discourseUrl);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(upstreamUrl.href, {
      headers: { Accept: "application/json" },
      redirect: "error",
      signal: controller.signal,
    });
    if (!response.ok || !response.url || response.url !== upstreamUrl.href || !jsonContentType(response)) {
      await response.body?.cancel().catch(() => undefined);
      throw new Error("upstream response boundary");
    }
    const text = await boundedText(response);
    const payload = JSON.parse(text);
    validateTopicPayload(payload, topicId);
    return new Response(text, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    const timedOut = controller.signal.aborted || error?.name === "AbortError";
    return json(
      { error: timedOut ? "Discussion request timed out." : "Discussion unavailable." },
      timedOut ? 504 : 502,
    );
  } finally {
    clearTimeout(timeout);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const match = topicPath.exec(url.pathname);
    if (!match) return env.ASSETS.fetch(request);
    if (request.method !== "GET") {
      return json({ error: "Method not allowed." }, 405, { Allow: "GET" });
    }
    return proxyDiscourseTopic(match[1]);
  },
};
