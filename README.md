# Astro and Starlight Demo for DiscussionBridge

Public surface: https://astrostarlight.demo.discussionbridge.dev/

This repository owns the Astro and Starlight DiscussionBridge demo. It builds
and deploys independently as a Cloudflare Worker with static assets.

The pinned adapter artifact is
`vendor/astro-discussion-bridge-0.1.0-alpha.20260831.4.tgz`. It contains 25
members, is 29,240 bytes, and its SHA-256 is
`97c3a7eb2907a5e76567d5da64ac52755d893832df05a648b0a85b42c81f8480`.
It supports plugin-free `simple` and `full` comments, receiver-backed
`fullInteractive`, safe adoption of a canonical Discourse Core embed, source
authorship, and authenticated From Discourse presentation. Simple mode keeps a
generated fallback and refreshes public replies at page load without cookies or
credentials; it shows five initially and discloses up to 50 through a native
Show more control. Publication and release acceptance remain separate gates.

```powershell
npm ci
npm run build
npm run deploy:dry-run
npm run deploy
```

Deployment requires a reviewed build and explicit production authorization.
