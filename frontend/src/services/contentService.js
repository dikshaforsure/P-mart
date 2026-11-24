import {
  availablePuppies,
  familyPreview,
  faqPreview,
  journeySteps,
  siteSettings,
  trustFeatures,
  waysToMeet,
} from '../data/siteContent';

// UI components depend on this service contract, not on the local fixture source.
// Phase 2 can replace these functions with fetch calls without changing page components.
const wait = (value) => Promise.resolve(value);

export const contentService = {
  getSiteSettings: () => wait(siteSettings),
  getFeaturedPuppies: (limit = 6) => wait(availablePuppies.slice(0, limit)),
  getWaysToMeet: () => wait(waysToMeet),
  getJourneySteps: () => wait(journeySteps),
  getTrustFeatures: () => wait(trustFeatures),
  getFamilyPreview: () => wait(familyPreview),
  getFaqPreview: () => wait(faqPreview),
};
