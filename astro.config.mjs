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
      provider: "discourse",
      preset: "starlight",
      discourseUrl: "https://forum.discussionbridge.dev",
      siteUrl: "https://astrostarlight.demo.discussionbridge.dev",
      replies: {
        refreshEndpoint: "/api/discourse/topics/{topicId}.json",
      },
      publishOnBuild: {
        enabled: connectSandbox,
        lanes: connectSandbox ? [
          {
            name: "plugin-sandbox",
            docsDir: "src/content/comments/plugin-sandbox",
            routeBase: "comments/plugin-sandbox",
            discourseUrl: "https://sandbox-forum.discussionbridge.dev",
            controlledCreation: {
              connectionIdEnv: "DISCUSSIONBRIDGE_SANDBOX_CONNECTION_ID",
              connectionSecretEnv: "DISCUSSIONBRIDGE_SANDBOX_CONNECTION_SECRET",
              lane: "comments",
              visibility: "listed",
            },
          },
        ] : [
          {
            name: "docs",
            docsDir: "src/content/docs",
            categoryId: 5,
            tags: ["discussionbridge", "astro", "starlight-demo", "docs"],
          },
          {
            name: "releases",
            docsDir: "src/content/releases",
            routeBase: "releases",
            categoryId: 5,
            tags: ["discussionbridge", "astro", "starlight-demo", "releases"],
          },
          {
            name: "blog",
            docsDir: "src/content/blog",
            routeBase: "blog",
            categoryId: 5,
            tags: ["discussionbridge", "astro", "starlight-demo", "blog"],
          },
          {
            name: "news",
            docsDir: "src/content/news",
            routeBase: "news",
            categoryId: 5,
            tags: ["discussionbridge", "astro", "starlight-demo", "news"],
          },
          {
            name: "comments",
            docsDir: "src/content/comments",
            routeBase: "comments",
            categoryId: 5,
            tags: ["discussionbridge", "astro", "starlight-demo", "comments"],
          },
        ],
      },
    }),
  ],
});
