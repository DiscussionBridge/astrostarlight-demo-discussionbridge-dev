# Astro and Starlight Demo for DiscussionBridge

Public surface: https://astrostarlight.demo.discussionbridge.dev/

This repository owns the Astro and Starlight DiscussionBridge demo. It builds
and deploys independently as a Cloudflare Worker with static assets.

The pinned adapter artifact is `vendor/astro-discussion-bridge-0.1.0.tgz`.
It was packed from exact adapter commit
`476c581d8003e8286121133d8fcb2f4883ecc701` for the Alpha.5 frame-boundary
correction. Its size is 96,291 bytes
and its SHA-256 is
`4ca56bdc1da672285a34ab9b24c64e178bf21bb09a39f7f42a3af03af5a20661`.

```powershell
npm ci
npm run build
npm run deploy:dry-run
npm run deploy
```

Deployment requires a reviewed build and explicit production authorization.
