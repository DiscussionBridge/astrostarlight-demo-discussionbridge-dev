# Astro and Starlight Demo for DiscussionBridge

Public surface: https://astrostarlight.demo.discussionbridge.dev/

This repository owns the Astro and Starlight DiscussionBridge demo. It builds
and deploys independently as a Cloudflare Worker with static assets.

The pinned adapter artifact is
`vendor/astro-discussion-bridge-0.2.0-alpha.20.tgz`. It contains 43 members, is
43,930 bytes, and its SHA-256 is
`b63b62a40a1283d9b333f1a35c7b44da3976f029c8b2b9548ad2e0388d5f82f9`.
It supports plugin-free `simple` and `full` comments, receiver-backed
Interactive mode, safe adoption of a canonical Discourse Core embed, source
authorship, authenticated From Discourse presentation, and explicitly
authorized materialization of a forum-owned publication as a native Astro
content page. Simple mode keeps a
generated fallback and refreshes public replies at page load without cookies or
credentials; it shows five initially and discloses up to 50 through a native
Show more control. When the forum enables its public Discourse attribution,
Simple also shows the bundled official Discourse wordmark without coupling it
to the independent DiscussionBridge credit. Publication and release acceptance
remain separate gates.

The Starlight head override preserves Starlight's native head output and adds
the DiscussionBridge Google Analytics property `G-K9SYR7QENF` to every route.

GitHub verifies installation, dependency audit, and source tests without
receiving production credentials. The GitHub-connected Cloudflare Workers build
owns the credentialed production build and deployment, with
`DISCUSSIONBRIDGE_BRIDGE_CONNECT=1` and the server-only Connection ID and secret
stored as protected build values.

```powershell
npm ci
npm run build
npm run deploy:dry-run
npm run deploy
```

Deployment requires a reviewed build and explicit production authorization.
