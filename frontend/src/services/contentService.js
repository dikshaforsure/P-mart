import { availablePuppies, getAdjacentAvailablePuppies, getAvailablePuppyCards, getPuppyBySlug, breeds } from '../data/puppyData';
import { familyPreview, faqPreview, journeySteps, siteSettings, trustFeatures, waysToMeet } from '../data/siteContent';
const wait = value => Promise.resolve(value);
export const contentService = {
  getSiteSettings: () => wait(siteSettings),
  getFeaturedPuppies: (limit = 6) => wait(getAvailablePuppyCards(limit)),
  getAvailablePuppies: () => wait(availablePuppies),
  getPuppyBySlug: slug => wait(getPuppyBySlug(slug)),
  getAdjacentAvailablePuppies: slug => wait(getAdjacentAvailablePuppies(slug)),
  getBreeds: () => wait(breeds),
  getWaysToMeet: () => wait(waysToMeet),
  getJourneySteps: () => wait(journeySteps),
  getTrustFeatures: () => wait(trustFeatures),
  getFamilyPreview: () => wait(familyPreview),
  getFaqPreview: () => wait(faqPreview),
};
