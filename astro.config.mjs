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
            { label: "Comments Mode Demos", link: "/comments/" },
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
        docsDir: "src/content/comments/plugin-bridge",
        routeBase: "comments/plugin-bridge",
        lane: "astro-demo",
        visibility: "unlisted",
      },
    }),
  ],
});
