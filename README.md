# Astro and Starlight Demo for DiscussionBridge

Public surface: https://astrostarlight.demo.discussionbridge.dev/

This repository owns the Astro and Starlight DiscussionBridge demo. It builds
and deploys independently as a Cloudflare Worker with static assets.

The pinned adapter artifact is
`vendor/astro-discussion-bridge-0.1.0-alpha.20260824.2.tgz`. It contains 67
members, is 108,671 bytes, and its SHA-256 is
`7bb85f7658c5391b23ebf914cbe6fbac1bfa28c99bd7f64b5c7c51ad2e39940d`.
It supersedes the Alpha.5-only `0.1.0` artifact with the qualified security,
trust, and packaged-browser correction candidate. Publication and release
acceptance remain separate gates.

```powershell
npm ci
npm run build
npm run deploy:dry-run
npm run deploy
```

Deployment requires a reviewed build and explicit production authorization.
