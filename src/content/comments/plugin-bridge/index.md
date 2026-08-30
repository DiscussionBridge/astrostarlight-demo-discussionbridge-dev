---
title: "Plugin-Controlled Bridge Comments"
description: "An end-to-end demonstration of forum-authorized companion-topic creation on The Bridge."
date: "2026-08-30"
discussionCommentsDisplay: "fullInteractive"
discussionSourceMode: "astro-managed"
discussionSync: true
discussionUnlisted: true
discussionSummary: |
  <div data-theme-toc="true"></div>

  ## Test purpose

  This page demonstrates the complete DiscussionBridge plugin path. The Astro
  adapter asks The Bridge to create or resolve its companion topic before the
  embedded discussion is exposed to a reader.

  ## Forum-authorized creation

  The forum—not the page visitor—selects the operating identity, category,
  tags, lane policy, and effective visibility. Repeating the same build
  resolves the durable Bridge Record instead of creating another topic.

  ## Mapping stability

  This page owns one Astro Bridge Record on The Bridge. Rebuilding, refreshing,
  or syncing the page must preserve that resource and topic identity.

  ## Interaction boundary

  Reply, Like, Quote, edit, sign-in, sign-up, moderation, and session behavior
  remain owned by Discourse Core. DiscussionBridge supplies the mapped
  comments-only presentation without reimplementing those actions.

  ## Layout stress checks

  With the Starlight table of contents visible, use the Discourse contents and
  timeline controls, scroll to the bottom of the iframe, and open and close the
  composer. The iframe must not clip or overlap the host navigation, and the
  DiscussionBridge credit must remain below the complete discussion boundary.
discussionbridgeResourceId: "b145249d-9f3e-439d-b33f-c03ab123eb2e"
discourseTopicId: "15"
discourseTopicUrl: "https://bridge.demo.discussionbridge.dev/t/plugin-controlled-bridge-comments/15"
---

## Test purpose

This page demonstrates the complete DiscussionBridge plugin path. The Astro
adapter asks **The Bridge** to create or resolve the companion topic before the
embedded discussion is exposed to a reader.

It also provides a realistic Starlight **On this page** table of contents for
testing the discussion iframe beside a populated host-page navigation rail.

## Forum-authorized creation

The forum—not the page visitor—selects the operating identity, category, tags,
lane policy, and effective visibility. Repeating the same build resolves the
durable Bridge Record instead of creating another topic.

## Mapping stability

This page owns one Astro Bridge Record on The Bridge. Rebuilding, refreshing,
or syncing the page must preserve that resource and topic identity.

## Visibility boundary

The companion topic remains unlisted in Discourse while still being accessible
through this mapped Astro page and its direct forum URL. Listing or unlisting
the topic remains a forum decision.

## Interaction boundary

Reply, Like, Quote, edit, sign-in, sign-up, moderation, and session behavior
remain owned by Discourse Core. DiscussionBridge supplies the mapped
comments-only presentation without reimplementing those actions.

## Layout stress checks

With the Starlight table of contents visible, use the Discourse topic progress,
scroll to the bottom of the iframe, and open and close the composer. The iframe
must not clip or overlap the host navigation, and the DiscussionBridge credit
must remain below the complete discussion boundary.
