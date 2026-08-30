---
title: "Standalone-to-Bridge Upgrade"
description: "Begin with plugin-free Discourse comments, then adopt the same discussion into The Bridge without creating a duplicate topic."
date: "2026-08-30"
discussionCommentsDisplay: "full"
discussionSync: false
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
