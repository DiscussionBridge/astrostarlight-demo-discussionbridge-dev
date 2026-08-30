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

test("the public consumer advertises all three intentional comments modes", async () => {
  const schema = await readFile(new URL("../src/content.config.ts", import.meta.url), "utf8");
  const index = await readFile(new URL("../src/pages/comments/index.astro", import.meta.url), "utf8");

  assert.match(schema, /discussionCommentsDisplay: z\.enum\(\["simple", "full", "fullInteractive"\]\)/);
  assert.doesNotMatch(schema, /discussionEmbedUrl/);
  assert.match(index, /simple.*full.*fullInteractive/s);
  const simple = await readFile(new URL("../src/content/comments/simple.md", import.meta.url), "utf8");
  const full = await readFile(new URL("../src/content/comments/full.md", import.meta.url), "utf8");
  assert.match(simple, /discussionCommentsDisplay: "simple"/);
  assert.match(full, /discussionCommentsDisplay: "full"/);
});

test("the Astro Alpha profile binds one To record and one server-rendered From record", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const layout = await readFile(new URL("../src/layouts/LaneLayout.astro", import.meta.url), "utf8");
  const toPage = await readFile(new URL("../src/content/comments/plugin-bridge/index.md", import.meta.url), "utf8");
  const fromPage = await readFile(new URL("../src/content/comments/forum-roadmap.md", import.meta.url), "utf8");

  assert.equal(
    packageJson.dependencies["astro-discussion-bridge"],
    "file:vendor/astro-discussion-bridge-0.1.0-alpha.20260830.1.tgz",
  );
  assert.match(toPage, /discussionbridgeResourceId: "[0-9a-f-]{36}"/);
  assert.match(toPage, /discourseTopicId: "[1-9][0-9]*"/);
  assert.match(fromPage, /discussionbridgeResourceId: "c1a52d5b-ee88-4fab-a1c3-a36cf86f8563"/);
  assert.match(fromPage, /discussionFromDiscourse: true/);
  assert.match(layout, /FromDiscourse/);
  assert.match(layout, /resourceId=\{Astro\.props\.resourceId\}/);
  assert.match(layout, /https:\/\/bridge\.demo\.discussionbridge\.dev/);
  assert.doesNotMatch(layout, /sandbox-forum\.discussionbridge\.dev/);
  assert.doesNotMatch(`${layout}\n${toPage}\n${fromPage}`, /dbc_f1cb2cb232f25584e8a1c5c9|X-DiscussionBridge-Secret/);
});
