import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeFiles = ["blog", "comments", "news", "releases"];

test("lane pages pass rendered Markdown headings to StarlightPage", async () => {
  const layout = await readFile(new URL("../src/layouts/LaneLayout.astro", import.meta.url), "utf8");
  assert.match(layout, /headings=\{Astro\.props\.headings\}/);

  for (const lane of routeFiles) {
    const route = await readFile(
      new URL(`../src/pages/${lane}/[slug].astro`, import.meta.url),
      "utf8",
    );
    assert.match(route, /const \{ Content, headings \} = await render\(entry\)/);
    assert.match(route, /headings=\{headings\}/);
  }
});

test("the public consumer advertises only the retained fullInteractive comments mode", async () => {
  const schema = await readFile(new URL("../src/content.config.ts", import.meta.url), "utf8");
  const index = await readFile(new URL("../src/pages/comments/index.astro", import.meta.url), "utf8");

  assert.match(schema, /discussionCommentsDisplay: z\.literal\("fullInteractive"\)/);
  assert.doesNotMatch(schema, /discussionEmbedUrl|z\.enum\(\["simple", "full"/);
  assert.match(index, /comments-only.*fullInteractive/s);
  await assert.rejects(() => readFile(new URL("../src/content/comments/simple.md", import.meta.url)));
  await assert.rejects(() => readFile(new URL("../src/content/comments/full.md", import.meta.url)));
});

test("the Astro Alpha profile binds one To record and one server-rendered From record", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const layout = await readFile(new URL("../src/layouts/LaneLayout.astro", import.meta.url), "utf8");
  const toPage = await readFile(new URL("../src/content/comments/plugin-sandbox/index.md", import.meta.url), "utf8");
  const fromPage = await readFile(new URL("../src/content/comments/forum-roadmap.md", import.meta.url), "utf8");

  assert.equal(
    packageJson.dependencies["astro-discussion-bridge"],
    "file:vendor/astro-discussion-bridge-0.1.0-alpha.20260829.2.tgz",
  );
  assert.match(toPage, /discussionbridgeResourceId: "9d03ae0b-a657-45b4-94fb-fb7906c156be"/);
  assert.match(toPage, /discourseTopicId: "18"/);
  assert.match(fromPage, /discussionbridgeResourceId: "631e976c-9107-4a19-90ed-6221b54b1f0c"/);
  assert.match(fromPage, /discussionFromDiscourse: true/);
  assert.match(layout, /FromDiscourse/);
  assert.match(layout, /resourceId=\{Astro\.props\.resourceId\}/);
  assert.doesNotMatch(`${layout}\n${toPage}\n${fromPage}`, /dbc_f1cb2cb232f25584e8a1c5c9|X-DiscussionBridge-Secret/);
});
