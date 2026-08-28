import assert from "node:assert/strict";
import test from "node:test";
import worker from "../worker/index.mjs";

test("delegates every request to the static asset binding", async () => {
  const expected = new Response("asset", { status: 200 });
  let received;
  const request = new Request("https://example.test/comments/plugin-sandbox/");
  const env = { ASSETS: { fetch: async (value) => { received = value; return expected; } } };

  assert.equal(await worker.fetch(request, env), expected);
  assert.equal(received, request);
});
