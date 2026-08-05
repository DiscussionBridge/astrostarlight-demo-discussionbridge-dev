const discourseUrl = "https://forum.discussionbridge.dev";
const topicPath = /^\/api\/discourse\/topics\/([^/]+)\.json$/;

function json(body, status, extraHeaders = {}) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const match = topicPath.exec(url.pathname);

    if (!match) {
      return env.ASSETS.fetch(request);
    }

    if (request.method !== "GET") {
      return json({ error: "Method not allowed." }, 405, { Allow: "GET" });
    }

    const topicId = match[1];
    if (!/^\d+$/.test(topicId)) {
      return json({ error: "Invalid topic ID." }, 400);
    }

    const response = await fetch(`${discourseUrl}/t/${topicId}.json`, {
      headers: { Accept: "application/json" },
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": response.headers.get("Content-Type") ?? "application/json; charset=utf-8",
      },
    });
  },
};
