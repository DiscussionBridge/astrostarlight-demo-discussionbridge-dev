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
