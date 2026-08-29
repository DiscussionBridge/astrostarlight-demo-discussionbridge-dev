# Astro and Starlight Demo for DiscussionBridge

Public surface: https://astrostarlight.demo.discussionbridge.dev/

This repository owns the Astro and Starlight DiscussionBridge demo. It builds
and deploys independently as a Cloudflare Worker with static assets.

The pinned adapter artifact is
`vendor/astro-discussion-bridge-0.1.0-alpha.20260828.2.tgz`. It contains 16
members, is 15,187 bytes, and its SHA-256 is
`9b13f4a70fac4712201f820788de44c828c6db0bbe5a2d566db83e233dbccb51`.
It is the reduced controlled-creation and mapped `fullInteractive` consumer;
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
