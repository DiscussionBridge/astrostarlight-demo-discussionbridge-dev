import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import starlight from "@astrojs/starlight";
import discussionBridge from "astro-discussion-bridge";

const connectBridge = process.env.DISCUSSIONBRIDGE_BRIDGE_CONNECT === "1";

export default defineConfig({
  site: "https://astrostarlight.demo.discussionbridge.dev",
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    mermaid({ enableLog: false }),
    starlight({
      title: "DiscussionBridge for Astro",
      components: {
        SocialIcons: "./src/components/SocialIcons.astro",
        MarkdownContent: "./src/components/MarkdownContent.astro",
      },
      social: [
        {
          icon: "github",
          label: "DiscussionBridge on GitHub",
          href: "https://github.com/DiscussionBridge",
        },
        {
          icon: "discourse",
          label: "DiscussionBridge community forum",
          href: "https://forum.discussionbridge.dev/",
        },
        {
          icon: "blueSky",
          label: "DiscussionBridge on Bluesky",
          href: "https://bsky.app/profile/discussionbridge.bsky.social",
        },
        {
          icon: "discord",
          label: "DiscussionBridge on Discord",
          href: "https://discord.gg/Y7SRQAxKq",
        },
        {
          icon: "mastodon",
          label: "DiscussionBridge on Mastodon",
          href: "https://mastodon.social/@DiscussionBridge",
        },
        {
          icon: "reddit",
          label: "DiscussionBridge on Reddit",
          href: "https://www.reddit.com/r/DiscussionBridge/",
        },
        {
          icon: "youtube",
          label: "DiscussionBridge on YouTube",
          href: "https://www.youtube.com/@DiscussionBridge",
        },
      ],
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
                { label: "Shared Simple", link: "/comments/shared-simple/" },
                { label: "Shared Full", link: "/comments/shared-full/" },
                { label: "Standalone → The Bridge", link: "/comments/standalone-upgrade/" },
                { label: "FullInteractive", link: "/comments/full-interactive/" },
                { label: "Plugin-controlled", link: "/comments/plugin-bridge/" },
                { label: "Source authorship", link: "/comments/authored/" },
                { label: "Rich content", link: "/comments/rich-content/" },
                { label: "From Discourse", link: "/comments/forum-roadmap/" },
                { label: "The Bridge publishes", link: "/comments/bridge-publisher/" },
              ],
            },
          ],
        },
        {
          label: "DiscussionBridge",
          items: [
            { label: "Demo hub", link: "https://demo.discussionbridge.dev/" },
            { label: "Publisher matrix", link: "https://demo.discussionbridge.dev/discourse/" },
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
        dynamicHeight: false,
        embedMaxHeight: "none",
        embedViewportMaxHeight: "none",
      },
      publishOnBuild: {
        enabled: connectBridge,
        stateFile: ".discussionbridge/astro-publication-state.json",
        docsDir: "src/content/comments",
        routeBase: "comments",
        lane: "astro-demo",
        visibility: "unlisted",
      },
    }),
  ],
});
