---
title: "DiscussionBridge for Astro: Plain Markdown Demo"
description: A plain Markdown page proving DiscussionBridge for Astro docs do not need to become MDX.
discussionCommentsDisplay: "full"
---

# DiscussionBridge for Astro: Plain Markdown Demo

This page is intentionally `.md`, not `.mdx`.

The Starlight `MarkdownContent` override renders the DiscussionBridge component
after the document content. The standard Discourse embed resolves this page by
its canonical URL; no forum topic is hard-coded into the Markdown.
