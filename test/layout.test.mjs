import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeFiles = ["blog", "comments", "news", "releases"];
const stockContentFiles = [
  "src/content/blog/content-lanes.md",
  "src/content/docs/index.md",
  "src/content/docs/existing-md-page.md",
  "src/content/news/content-lanes-live.md",
  "src/content/releases/2_1.md",
];

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

test("stock Astro content dogfoods canonical Core embeds without legacy bindings", async () => {
  for (const path of stockContentFiles) {
    const content = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
    assert.match(content, /discussionCommentsDisplay: "full"/);
    assert.doesNotMatch(content, /forum\.discussionbridge\.dev/);
    assert.doesNotMatch(content, /discussionSourceHash|discussionLastSyncedAt/);
    assert.doesNotMatch(content, /discourseTopicId|discourseTopicUrl/);
  }
});

test("the public consumer advertises all three intentional comments modes", async () => {
  const schema = await readFile(new URL("../src/content.config.ts", import.meta.url), "utf8");
  const index = await readFile(new URL("../src/pages/comments/index.astro", import.meta.url), "utf8");
  const config = await readFile(new URL("../astro.config.mjs", import.meta.url), "utf8");

  assert.match(schema, /discussionCommentsDisplay: z\.enum\(\["simple", "full", "fullInteractive"\]\)/);
  assert.doesNotMatch(schema, /discussionEmbedUrl/);
  assert.match(index, /simple.*full.*fullInteractive/s);
  const simple = await readFile(new URL("../src/content/comments/simple.md", import.meta.url), "utf8");
  const full = await readFile(new URL("../src/content/comments/full.md", import.meta.url), "utf8");
  assert.match(simple, /discussionCommentsDisplay: "simple"/);
  assert.match(full, /discussionCommentsDisplay: "full"/);
  assert.match(index, /embed_truncate/);
  assert.match(index, /Show more…/);
  assert.match(full, /show the complete imported article immediately/);
  for (const route of [
    "simple",
    "full",
    "shared-simple",
    "shared-full",
    "standalone-upgrade",
    "full-interactive",
    "plugin-bridge",
    "authored",
    "rich-content",
    "forum-roadmap",
    "bridge-publisher",
  ]) {
    assert.match(config, new RegExp(`/comments/${route}/`));
  }
});

test("shared presentation pages bind the exact Bridge-wide topics", async () => {
  const simple = await readFile(new URL("../src/content/comments/shared-simple.md", import.meta.url), "utf8");
  const full = await readFile(new URL("../src/content/comments/shared-full.md", import.meta.url), "utf8");
  assert.match(simple, /discussionCommentsDisplay: "simple"/);
  assert.match(simple, /discourseTopicId: 54/);
  assert.match(full, /discussionCommentsDisplay: "full"/);
  assert.match(full, /discourseTopicId: 56/);
  assert.doesNotMatch(`${simple}\n${full}`, /Connection-Secret|dbc_[0-9a-f]+/u);
});

test("the Astro rich-content proof renders portable headings, Mermaid, math and media", async () => {
  const config = await readFile(new URL("../astro.config.mjs", import.meta.url), "utf8");
  const importedRenderer = await readFile(
    new URL("../src/components/ImportedRichContent.astro", import.meta.url),
    "utf8",
  );
  const markdownLayout = await readFile(
    new URL("../src/components/MarkdownContent.astro", import.meta.url),
    "utf8",
  );
  const markdown = await readFile(
    new URL("../src/content/comments/rich-content.md", import.meta.url),
    "utf8",
  );

  assert.match(config, /mermaid\(\{ enableLog: false \}\)/);
  assert.match(config, /remarkPlugins: \[remarkMath\]/);
  assert.match(config, /rehypePlugins: \[rehypeKatex\]/);
  assert.match(markdown, /```mermaid/);
  assert.match(markdown, /\$E = mc\^2\$/);
  assert.match(markdown, /bridge-content-flow\.svg/);
  assert.match(markdown, /discussionCommentsDisplay: "fullInteractive"/);
  assert.match(markdown, /discussionSync: true/);
  assert.match(markdown, /discussionbridgeResourceId: "[0-9a-f-]{36}"/);
  assert.match(markdown, /discourseTopicId: "[1-9][0-9]*"/);
  assert.match(importedRenderer, /code\.lang-mermaid/);
  assert.match(importedRenderer, /mermaid\.run/);
  assert.match(importedRenderer, /astro:page-load/);
  assert.match(importedRenderer, /renderImportedRichContent/);
  assert.match(importedRenderer, /\.discussionbridge-record, main article/);
  assert.match(importedRenderer, /max-width: 100%/);
  assert.match(importedRenderer, /katex\.render/);
  assert.match(importedRenderer, /querySelectorAll<HTMLParagraphElement>\("p"\)/);
  assert.ok(importedRenderer.includes("\\[math\\]"));
  assert.match(markdownLayout, /import ImportedRichContent from "\.\/ImportedRichContent\.astro"/);
  assert.match(markdownLayout, /<ImportedRichContent \/>/);
});

test("the Astro Alpha profile binds distinct To records and one server-rendered From record", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const layout = await readFile(new URL("../src/layouts/LaneLayout.astro", import.meta.url), "utf8");
  const toPage = await readFile(new URL("../src/content/comments/plugin-bridge/index.md", import.meta.url), "utf8");
  const interactivePage = await readFile(new URL("../src/content/comments/full-interactive.md", import.meta.url), "utf8");
  const fromPage = await readFile(new URL("../src/content/comments/forum-roadmap.md", import.meta.url), "utf8");

  assert.equal(
    packageJson.dependencies["astro-discussion-bridge"],
    "file:vendor/astro-discussion-bridge-0.1.0-alpha.20260902.2.tgz",
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
  assert.match(fromPage, /discussionCommentsDisplay: "full"/);
  assert.match(fromPage, /discourseTopicId: "14"/);
  assert.match(fromPage, /discourseTopicUrl: "https:\/\/bridge\.demo\.discussionbridge\.dev\/t\/the-bridge-roadmap-for-astro\/14"/);
  assert.ok(layout.indexOf("<FromDiscourse") < layout.indexOf("<Discussion"));
  assert.match(layout, /FromDiscourse/);
  assert.match(layout, /showTopicLink={!Astro\.props\.commentsDisplay}/);
  assert.match(layout, /resourceId=\{Astro\.props\.resourceId\}/);
  assert.match(layout, /https:\/\/bridge\.demo\.discussionbridge\.dev/);
  assert.doesNotMatch(layout, /sandbox-forum\.discussionbridge\.dev/);
  assert.doesNotMatch(`${layout}\n${toPage}\n${fromPage}`, /dbc_f1cb2cb232f25584e8a1c5c9|X-DiscussionBridge-Secret/);
});

test("standalone full comments can upgrade through the exact existing topic", async () => {
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
  assert.match(adoptionPage, /discussionCommentsDisplay: "fullInteractive"/);
  assert.match(adoptionPage, /discussionSync: true/);
  assert.match(adoptionPage, /embed_truncate/);
  assert.match(adoptionPage, /Show more…/);
  assert.match(adoptionPage, /discussionbridgeExternalId: "astro-page:[0-9a-f]{64}"/);
  assert.match(adoptionPage, /discussionbridgeResourceId: "[0-9a-f-]{36}"/);
  assert.match(adoptionPage, /discourseTopicId: "18"/);
  assert.match(
    adoptionPage,
    /discourseTopicUrl: "https:\/\/bridge\.demo\.discussionbridge\.dev\/t\/standalone-to-bridge-upgrade-discussionbridge-for-astro\/18"/,
  );
});

test("the Discourse publisher materializes one native Astro page", async () => {
  const page = await readFile(
    new URL("../src/content/comments/bridge-publisher.md", import.meta.url),
    "utf8",
  );

  assert.match(page, /discussionbridgeNativePublication: true/);
  assert.match(page, /discussionbridgeResourceId: f01cba5f-73a8-423b-b156-25b39ef2ba9b/);
  assert.match(page, /discussionbridgeSourceRevision: post:149:version:2/);
  assert.match(page, /discourseTopicId: 53/);
  assert.match(page, /discussionCommentsDisplay: fullInteractive/);
  assert.match(page, /The Bridge publishes everywhere/);
  assert.doesNotMatch(page, /DISCUSSIONBRIDGE_CONNECTION_SECRET|X-DiscussionBridge-Secret/);
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
