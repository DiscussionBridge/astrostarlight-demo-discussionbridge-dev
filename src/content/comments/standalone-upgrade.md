---
title: "Standalone-to-Bridge Upgrade"
description: "Begin with plugin-free Discourse comments, then adopt the same discussion into The Bridge without creating a duplicate topic."
date: "2026-08-30"
discussionCommentsDisplay: "fullInteractive"
discussionSync: true
discourseTopicId: "18"
discourseTopicUrl: "https://bridge.demo.discussionbridge.dev/t/standalone-to-bridge-upgrade-discussionbridge-for-astro/18"
discussionbridgeExternalId: "astro-page:3664fb85513adbb8b7646913e17d2fd619e569fccbb47ce294b7f4d9c40afba8"
discussionbridgeResourceId: "858d81eb-65f2-424a-a8a0-cb9c32fc8481"
---

## Begin standalone

This page starts with DiscussionBridge for Astro in its standalone `full`
mode. Discourse Core creates or resolves the ordinary embed topic from this
page's canonical URL. No DiscussionBridge receiver credential or Bridge Record
is required.

## Add The Bridge later

The same page can later enable the receiver-backed `fullInteractive` mode. The
Astro adapter presents the existing topic identity, and The Bridge adopts it
only when Discourse Core independently confirms that this exact canonical page
already owns the topic.

## Preserve the discussion

The upgrade must retain the original topic, replies, and canonical page URL.
It must not create a replacement topic or make an arbitrary forum topic
claimable by an adapter.
