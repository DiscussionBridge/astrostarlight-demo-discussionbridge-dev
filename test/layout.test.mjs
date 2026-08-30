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

test("the Astro Alpha profile binds distinct To records and one server-rendered From record", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const layout = await readFile(new URL("../src/layouts/LaneLayout.astro", import.meta.url), "utf8");
  const toPage = await readFile(new URL("../src/content/comments/plugin-bridge/index.md", import.meta.url), "utf8");
  const interactivePage = await readFile(new URL("../src/content/comments/full-interactive.md", import.meta.url), "utf8");
  const fromPage = await readFile(new URL("../src/content/comments/forum-roadmap.md", import.meta.url), "utf8");

  assert.equal(
    packageJson.dependencies["astro-discussion-bridge"],
    "file:vendor/astro-discussion-bridge-0.1.0-alpha.20260830.4.tgz",
  );
  assert.match(toPage, /discussionbridgeResourceId: "[0-9a-f-]{36}"/);
  assert.match(toPage, /discourseTopicId: "[1-9][0-9]*"/);
  assert.match(interactivePage, /discussionSync: true/);
  assert.match(interactivePage, /discussionbridgeResourceId: "[0-9a-f-]{36}"/);
  assert.notEqual(
    /discourseTopicId: "?([1-9][0-9]*)"?/.exec(toPage)?.[1],
    /discourseTopicId: "?([1-9][0-9]*)"?/.exec(interactivePage)?.[1],
  );
  assert.match(fromPage, /discussionbridgeResourceId: "c1a52d5b-ee88-4fab-a1c3-a36cf86f8563"/);
  assert.match(fromPage, /discussionFromDiscourse: true/);
  assert.match(layout, /FromDiscourse/);
  assert.match(layout, /resourceId=\{Astro\.props\.resourceId\}/);
  assert.match(layout, /https:\/\/bridge\.demo\.discussionbridge\.dev/);
  assert.doesNotMatch(layout, /sandbox-forum\.discussionbridge\.dev/);
  assert.doesNotMatch(`${layout}\n${toPage}\n${fromPage}`, /dbc_f1cb2cb232f25584e8a1c5c9|X-DiscussionBridge-Secret/);
});

test("standalone full comments can begin without a Bridge mapping", async () => {
  const laneLayout = await readFile(new URL("../src/layouts/LaneLayout.astro", import.meta.url), "utf8");
  const markdownLayout = await readFile(
    new URL("../src/components/MarkdownContent.astro", import.meta.url),
    "utf8",
  );
  const adoptionPage = await readFile(
    new URL("../src/content/comments/standalone-upgrade.md", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(laneLayout, /commentsDisplay && Astro\.props\.topicUrl/);
  assert.doesNotMatch(markdownLayout, /discussionCommentsDisplay && topicUrl/);
  assert.match(laneLayout, /sourceUrl=\{Astro\.url\.href\}/);
  assert.match(markdownLayout, /sourceUrl=\{Astro\.url\.href\}/);
  assert.match(adoptionPage, /discussionCommentsDisplay: "full"/);
  assert.match(adoptionPage, /discussionSync: false/);
  assert.doesNotMatch(adoptionPage, /discussionbridgeResourceId|discourseTopicId|discourseTopicUrl/);
});

test("the authored demo supplies stable platform identities and one primary author", async () => {
  const authoredPage = await readFile(
    new URL("../src/content/comments/authored.md", import.meta.url),
    "utf8",
  );

  assert.match(authoredPage, /id: "astro:phil"/);
  assert.match(authoredPage, /id: "astro:discussionbridge-team"/);
  assert.match(authoredPage, /primaryAuthor: "astro:phil"/);
  assert.doesNotMatch(authoredPage, /discourseUsername|connectionSecret/);
});
