export const analyticsOptions = {
  providers: [
    { name: 'fathom', siteId: 'HFEVBRGI' },
    { name: 'plausible', scriptSrc: 'https://plausible.io/js/pa-20ZdU_sdR2mFxktHt8mlO.js' },
    {
      name: 'google-analytics', measurementId: 'G-K9SYR7QENF', pageviews: 'provider',
      consent: { mode: 'immediate', initial: {
        analyticsStorage: 'granted', adStorage: 'denied', adUserData: 'denied', adPersonalization: 'denied',
      } },
    },
    { name: 'matomo', trackerUrl: 'https://matomo.codeworkslabs.net/matomo.php', scriptSrc: 'https://matomo.codeworkslabs.net/matomo.js', siteId: '5', eventCategory: 'DiscussionBridge' },
    { name: 'umami', scriptSrc: 'https://umami.codeworkslabs.net/script.js', websiteId: '082e80a9-2fab-4df6-b4f0-c9c09ef9ab5c' },
  ],
  events: true,
};
