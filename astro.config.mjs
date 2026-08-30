import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import discussionBridge from "astro-discussion-bridge";

const connectBridge = process.env.DISCUSSIONBRIDGE_BRIDGE_CONNECT === "1";

export default defineConfig({
  site: "https://astrostarlight.demo.discussionbridge.dev",
  integrations: [
    starlight({
      title: "DiscussionBridge for Astro",
      components: {
        MarkdownContent: "./src/components/MarkdownContent.astro",
      },
      sidebar: [
        {
          label: "Demo",
          items: [
            { label: "Starlight Demo", link: "/" },
            { label: "Plain Markdown Demo", slug: "existing-md-page" },
            {
              label: "Comments & Bridge",
              items: [
                { label: "Choose a mode", link: "/comments/" },
                { label: "Simple comments", link: "/comments/simple/" },
                { label: "Full — Discourse Core", link: "/comments/full/" },
                { label: "Standalone → The Bridge", link: "/comments/standalone-upgrade/" },
                { label: "FullInteractive", link: "/comments/full-interactive/" },
                { label: "Plugin-controlled", link: "/comments/plugin-bridge/" },
                { label: "Source authorship", link: "/comments/authored/" },
                { label: "From Discourse", link: "/comments/forum-roadmap/" },
              ],
            },
          ],
        },
        {
          label: "DiscussionBridge",
          items: [
            { label: "Demo hub", link: "https://demo.discussionbridge.dev/" },
            { label: "DiscussionBridge.dev", link: "https://discussionbridge.dev/" },
          ],
        },
      ],
    }),
    discussionBridge({
      discourseUrl: "https://bridge.demo.discussionbridge.dev",
      siteUrl: "https://astrostarlight.demo.discussionbridge.dev",
      comments: {
        enabled: true,
        dynamicHeight: true,
        embedMaxHeight: "none",
        embedViewportMaxHeight: "none",
      },
      publishOnBuild: {
        enabled: connectBridge,
        docsDir: "src/content/comments",
        routeBase: "comments",
        lane: "astro-demo",
        visibility: "unlisted",
      },
    }),
  ],
});
