# Astro and Starlight Demo for DiscussionBridge

Public surface: https://astrostarlight.demo.discussionbridge.dev/

This repository owns the Astro and Starlight DiscussionBridge demo. It builds
and deploys independently as a Cloudflare Worker with static assets.

The pinned adapter artifact is
`vendor/astro-discussion-bridge-0.1.0-alpha.20260903.5.tgz`. It contains 39
members, is 42,672 bytes, and its SHA-256 is
`cb7fe059ee91dd6fab79bafca938d942a8f8a28811f721511cf9de8d75935824`.
It supports plugin-free `simple` and `full` comments, receiver-backed
`fullInteractive`, safe adoption of a canonical Discourse Core embed, source
authorship, authenticated From Discourse presentation, and explicitly
authorized materialization of a forum-owned publication as a native Astro
content page. Simple mode keeps a
generated fallback and refreshes public replies at page load without cookies or
credentials; it shows five initially and discloses up to 50 through a native
Show more control. When the forum enables its public Discourse attribution,
Simple also shows the bundled official Discourse wordmark without coupling it
to the independent DiscussionBridge credit. Publication and release acceptance
remain separate gates.

```powershell
npm ci
npm run build
npm run deploy:dry-run
npm run deploy
```

Deployment requires a reviewed build and explicit production authorization.
