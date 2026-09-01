# Astro and Starlight Demo for DiscussionBridge

Public surface: https://astrostarlight.demo.discussionbridge.dev/

This repository owns the Astro and Starlight DiscussionBridge demo. It builds
and deploys independently as a Cloudflare Worker with static assets.

The pinned adapter artifact is
`vendor/astro-discussion-bridge-0.1.0-alpha.20260831.2.tgz`. It contains 25
members, is 29,242 bytes, and its SHA-256 is
`5f5d90bc8e4bc35da73a5baa0142d0739d16ea65f2c5f0d27c0b1301b7b4e0f4`.
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
