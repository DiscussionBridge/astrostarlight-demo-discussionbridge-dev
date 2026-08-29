import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import discussionBridge from "astro-discussion-bridge";

const connectSandbox = process.env.DISCUSSIONBRIDGE_SANDBOX_CONNECT === "1";

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
      discourseUrl: "https://sandbox-forum.discussionbridge.dev",
      siteUrl: "https://astrostarlight.demo.discussionbridge.dev",
      comments: {
        enabled: true,
        dynamicHeight: true,
        embedMaxHeight: "none",
        embedViewportMaxHeight: "none",
      },
      publishOnBuild: {
        enabled: connectSandbox,
        docsDir: "src/content/comments/plugin-sandbox",
        routeBase: "comments/plugin-sandbox",
        lane: "astro-alpha",
        visibility: "unlisted",
      },
    }),
  ],
});
