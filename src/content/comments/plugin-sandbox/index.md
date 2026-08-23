---
title: "Plugin-Controlled Sandbox Comments"
description: "An end-to-end sandbox demonstration of forum-authorized companion-topic creation."
date: "2026-08-04"
discussionCommentsDisplay: "fullInteractive"
discourseTopicId: 10
discourseTopicUrl: "https://sandbox-forum.discussionbridge.dev/t/plugin-controlled-sandbox-comments/10"
discussionSourceMode: "astro-managed"
discussionSync: true
discussionUnlisted: true
discussionSummary: |
  <div data-theme-toc="true">

  ## Test purpose

  This page demonstrates the DiscussionBridge plugin path. The Astro adapter
  asks the sandbox forum to create or resolve the companion topic before the
  embedded discussion is exposed to a reader.

  It also provides a realistic table of contents for testing the embedded
  Discourse discussion beside the Astro/Starlight host-page navigation rail.

  ## Forum-authorized creation

  The forum—not the page visitor—selects the operating identity, category,
  tags, and effective visibility. Repeating the same request resolves the
  durable mapping instead of creating another topic.

  ## Mapping stability

  This page reuses the accepted sandbox mapping and topic 10. Rebuilding,
  refreshing, or syncing the Astro page must preserve that mapping rather than
  create a second topic or change its forum-owned policy.

  ## Visibility boundary

  The companion topic remains unlisted in Discourse while still being
  accessible through this mapped Astro page and its direct forum URL. Listing
  or unlisting the topic remains a forum decision.

  ## Interaction boundary

  Reply, Like, Quote, edit, sign-in, sign-up, moderation, and session behavior
  remain owned by Discourse Core. DiscussionBridge supplies the mapped
  comments-only presentation and clear composer labels without reimplementing
  those security-sensitive actions.

  ## Layout stress checks

  With the Starlight table of contents visible, use the Discourse contents and
  timeline controls, scroll to the bottom of the iframe, and open and close the
  composer. The iframe must not clip or overlap the host navigation, and the
  DiscussionBridge credit must remain below the complete discussion boundary.

  ## Recovery boundary

  The sandbox has a recorded provider snapshot for this acceptance window. A
  failed candidate is preserved as immutable evidence and superseded; it is
  never silently retagged or rewritten.

  </div>
discussionSourceHash: "668373a224dfb3f0478eefbcc0dc4e53cc85da72cb3d11d9112655897db240ef"
discussionLastSyncedAt: "2026-08-23T20:46:32.175Z"
---

## Test purpose

This page demonstrates the DiscussionBridge plugin path. The Astro adapter
asks the sandbox forum to create or resolve the companion topic before the
embedded discussion is exposed to a reader.

It also provides a realistic Starlight **On this page** table of contents for
testing the discussion iframe beside a populated host-page navigation rail.

## Forum-authorized creation

The forum—not the page visitor—selects the operating identity, category, tags,
and effective visibility. Repeating the same request resolves the durable
mapping instead of creating another topic.

## Mapping stability

This page reuses the accepted sandbox mapping and topic 10. Rebuilding or
refreshing the Astro page must resolve that mapping rather than create a second
topic or change its forum-owned policy.

## Visibility boundary

The companion topic can remain unlisted in Discourse while still being
accessible through this mapped Astro page and its direct forum URL. Listing or
unlisting the topic remains a forum decision.

## Interaction boundary

Reply, Like, Quote, edit, sign-in, sign-up, moderation, and session behavior
remain owned by Discourse Core. DiscussionBridge supplies the mapped
comments-only presentation and clear composer labels without reimplementing
those security-sensitive actions.

## Layout stress checks

With the Starlight table of contents visible, use Discourse topic progress,
scroll to the bottom of the iframe, and open and close the composer. The iframe
must not clip or overlap the host navigation, and the DiscussionBridge credit
must remain below the complete discussion boundary.

## Recovery boundary

The sandbox has a recorded provider snapshot for this acceptance window. A
failed candidate is preserved as immutable evidence and superseded; it is never
silently retagged or rewritten.
