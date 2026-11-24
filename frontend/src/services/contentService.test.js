import { describe, expect, it } from 'vitest';
import { contentService } from './contentService';
import { allPuppies, availablePuppies, breeds } from '../data/puppyData';

describe('contentService puppy methods', () => {
  it('returns the available puppy source records', async () => {
    await expect(contentService.getAvailablePuppies()).resolves.toBe(availablePuppies);
  });

  it('returns featured cards with the requested limit', async () => {
    const cards = await contentService.getFeaturedPuppies(4);

    expect(cards).toHaveLength(4);
    expect(cards[0].slug).toBe(availablePuppies[0].slug);
    expect(cards.every((card) => card.status === 'available')).toBe(true);
  });

  it('looks up exact slugs and preserves historical sold profiles', async () => {
    const sold = allPuppies.find((puppy) => puppy.status === 'sold');

    await expect(contentService.getPuppyBySlug(sold.slug)).resolves.toBe(sold);
    await expect(contentService.getPuppyBySlug('unknown-slug')).resolves.toBeNull();
  });

  it('returns adjacent available puppies and breed reference data', async () => {
    const first = availablePuppies[0];
    const last = availablePuppies[availablePuppies.length - 1];

    await expect(contentService.getAdjacentAvailablePuppies(first.slug)).resolves.toEqual({
      previous: last,
      next: availablePuppies[1],
    });
    await expect(contentService.getBreeds()).resolves.toBe(breeds);
  });
});
