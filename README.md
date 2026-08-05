# Astro and Starlight Demo for DiscussionBridge

Public surface: https://astrostarlight.demo.discussionbridge.dev/

This repository owns the Astro and Starlight DiscussionBridge demo. It builds
and deploys independently as a Cloudflare Worker with static assets.

The pinned adapter artifact is `vendor/astro-discussion-bridge-0.1.0.tgz`.
Its SHA-256 is
`d1e651f452aca12830d1ee7f9283c554b5eac8d4cb9c324bad0ec415b9d05070`.

```powershell
npm ci
npm run build
npm run deploy:dry-run
npm run deploy
```

Deployment requires a reviewed build and explicit production authorization.
