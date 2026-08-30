---
title: "Platform Authorship Mapping"
description: "Astro reports a primary author and coauthor while The Bridge controls the visible Discourse topic owner."
date: "2026-08-30"
discussionCommentsDisplay: "fullInteractive"
discussionSourceMode: "astro-managed"
discussionSync: true
discussionUnlisted: true
authors:
  - id: "astro:phil"
    name: "Phil"
  - id: "astro:discussionbridge-team"
    name: "DiscussionBridge Team"
primaryAuthor: "astro:phil"
discussionbridgeExternalId: "astro-page:3ec46813b4f887022bd67753023be909b81cca35307a92983b41c28003c31510"
discussionbridgeResourceId: "502a03c4-1e71-41e4-8639-6fd2364f275b"
discourseTopicId: "17"
discourseTopicUrl: "https://bridge.demo.discussionbridge.dev/t/platform-authorship-mapping/17"
---

## One source, two authorship systems

This Astro page reports **Phil** as its primary source author and the
**DiscussionBridge Team** as a coauthor. The Astro adapter sends those bounded,
stable platform identities to The Bridge.

The forum does not let an adapter impersonate an arbitrary Discourse account.
Instead, the Content Connection's **Authors** tab lets a forum operator map the
primary Astro identity to an approved Discourse user. The selected Discourse
user owns the companion topic, while both source authors remain credited in
the first post.

## Safe fallback and reconciliation

Each connection can use its selected fallback author or hold a new publication
until an operator maps the primary platform author. Existing topics keep their
original forum owner unless an operator performs a separate reassignment.

This makes authorship reusable across WordPress, Ghost, Statamic, Astro, and
publishing Discourse without turning source metadata into forum authority.
