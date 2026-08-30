---
title: "Full Comments Mode"
description: "Plugin-free standard Discourse comments embedding."
date: "2026-08-29"
discussionCommentsDisplay: "full"
discourseTopicId: 13
discourseTopicUrl: "https://bridge.demo.discussionbridge.dev/t/astro-full-comments-standard-discourse-embed/13"
discussionSync: false
---

## Full mode

This page uses `discussionCommentsDisplay: "full"`.

It uses Discourse Core's standard comments embed. Accounts, sessions, replies,
moderation, and notification behavior remain entirely owned by Discourse, and
neither a DiscussionBridge credential nor a receiver-plugin mapping is
required.

This remains an important option for publishers who want the standard
Discourse experience. Its styling and frame behavior are intentionally shown
as-is—the integration limitations that prompted the enhanced plugin-backed
mode should remain visible rather than being hidden from prospective users.

## Imported article display

Discourse Core enables `embed_truncate` by default. On the forum, the imported
article therefore opens as an excerpt with **Show more…** available for the
complete rendered page. A forum operator can disable that setting when the
preferred default is to show the complete imported article immediately.

This is a forum-wide Discourse presentation choice. It does not change which
Astro page owns the discussion or whether DiscussionBridge is installed.
