# Astro and Starlight Demo for DiscussionBridge

Public surface: https://astrostarlight.demo.discussionbridge.dev/

This repository owns the Astro and Starlight DiscussionBridge demo. It builds
and deploys independently as a Cloudflare Worker with static assets.

The pinned adapter artifact is
`vendor/astro-discussion-bridge-0.1.0-alpha.20260824.1.tgz`. It contains 67
members, is 108,594 bytes, and its SHA-256 is
`2aac43d6c945c3f67c4b5542271ed1cd99b534250fb14d62af559467fa1fe8a6`.
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
