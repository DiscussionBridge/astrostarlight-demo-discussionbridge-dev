---
title: "Plugin-Controlled Dev Forum Comments"
description: "A stable-preproduction demonstration of forum-authorized companion-topic creation."
date: "2026-08-22"
discussionCommentsDisplay: "fullInteractive"
discourseTopicId: 45
discourseTopicUrl: "https://dev-forum.discussionbridge.dev/t/45"
---

## Stable-preproduction creation

This page exercises the DiscussionBridge plugin installed on
`dev-forum.discussionbridge.dev`. During an explicitly authorized build window,
the Astro adapter asks the dev forum to create or resolve this page's companion
topic.

The connection credential remains server-only. The forum selects the operating
identity, category, tags, lane policy, and effective visibility. Repeating the
same build resolves the durable mapping instead of creating a second topic.
