# Astro and Starlight Demo for DiscussionBridge

Public surface: https://astrostarlight.demo.discussionbridge.dev/

This repository owns the Astro and Starlight DiscussionBridge demo. It builds
and deploys independently as a Cloudflare Worker with static assets.

The pinned adapter artifact is
`vendor/astro-discussion-bridge-0.1.0-alpha.20260831.1.tgz`. It contains 21
members, is 23,107 bytes, and its SHA-256 is
`6695e65009e97972512e9348b6881ee4230de8ac8aaf075c0d06f1780a6168d3`.
It supports plugin-free `simple` and `full` comments, receiver-backed
`fullInteractive`, safe adoption of a canonical Discourse Core embed, source
authorship, and authenticated From Discourse presentation. Simple mode fetches
public replies in bounded batches, shows five initially, and discloses up to 50
through a native Show more control. Publication and release acceptance remain
separate gates.

```powershell
npm ci
npm run build
npm run deploy:dry-run
npm run deploy
```

Deployment requires a reviewed build and explicit production authorization.
