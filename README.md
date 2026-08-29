# Astro and Starlight Demo for DiscussionBridge

Public surface: https://astrostarlight.demo.discussionbridge.dev/

This repository owns the Astro and Starlight DiscussionBridge demo. It builds
and deploys independently as a Cloudflare Worker with static assets.

The pinned adapter artifact is
`vendor/astro-discussion-bridge-0.1.0-alpha.20260829.2.tgz`. It contains 20
members, is 17,291 bytes, and its SHA-256 is
`d8a0214b01448031bfe5eb70527f16678a38e0117dd4a61d12ba0f8f6dad1edf`.
It is the two-direction Bridge Record and mapped `fullInteractive` adapter;
the former CLI, direct-Core publishing, imports, navigation, replies renderer,
and fixed-height presentation are not included. Publication and release
acceptance remain separate gates.

```powershell
npm ci
npm run build
npm run deploy:dry-run
npm run deploy
```

Deployment requires a reviewed build and explicit production authorization.
