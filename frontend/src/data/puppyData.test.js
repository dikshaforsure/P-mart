import { describe, expect, it } from 'vitest';
import {
  allPuppies,
  availablePuppies,
  getAdjacentAvailablePuppies,
  getAvailablePuppyCards,
  getPuppyBySlug,
  toPuppyCardData,
} from './puppyData';

describe('puppy data catalogue', () => {
  it('retains the complete source snapshot and unique slugs', () => {
    expect(allPuppies).toHaveLength(42);
    expect(new Set(allPuppies.map((puppy) => puppy.slug)).size).toBe(allPuppies.length);
    expect(allPuppies.every((puppy) => typeof puppy.slug === 'string' && puppy.slug.length > 0)).toBe(true);
  });

  it('exposes only published available puppies in the catalogue', () => {
    expect(availablePuppies).toHaveLength(15);
    expect(availablePuppies.every((puppy) => puppy.status === 'available' && puppy.published !== false)).toBe(true);
    expect(availablePuppies.some((puppy) => puppy.status === 'sold')).toBe(false);
  });

  it('finds both available and sold records by exact slug', () => {
    const available = availablePuppies[0];
    const sold = allPuppies.find((puppy) => puppy.status === 'sold');

    expect(getPuppyBySlug(available.slug)).toBe(available);
    expect(sold).toBeDefined();
    expect(getPuppyBySlug(sold.slug)).toBe(sold);
    expect(getPuppyBySlug('')).toBeNull();
    expect(getPuppyBySlug('not-a-real-puppy')).toBeNull();
    expect(getPuppyBySlug(available.slug.toUpperCase())).toBeNull();
  });

  it('wraps previous and next navigation in available-record order', () => {
    const first = availablePuppies[0];
    const last = availablePuppies[availablePuppies.length - 1];

    expect(getAdjacentAvailablePuppies(first.slug)).toEqual({ previous: last, next: availablePuppies[1] });
    expect(getAdjacentAvailablePuppies(last.slug)).toEqual({
      previous: availablePuppies[availablePuppies.length - 2],
      next: first,
    });
  });

  it('returns no adjacent available records for an unavailable slug', () => {
    const sold = allPuppies.find((puppy) => puppy.status === 'sold');
    expect(getAdjacentAvailablePuppies(sold.slug)).toEqual({ previous: null, next: null });
  });

  it('maps a puppy to the card contract without losing gallery metadata', () => {
    const puppy = availablePuppies.find((record) => record.media.some((item) => item.kind === 'video'));
    const card = toPuppyCardData(puppy);

    expect(card.slug).toBe(puppy.slug);
    expect(card.cover).toBe(puppy.cover);
    expect(card.media).toBe(puppy.media);
    expect(card.hasVideo).toBe(true);
    expect(card.origin).toBe(puppy.origin);
  });

  it('applies safe limits to featured puppy cards', () => {
    expect(getAvailablePuppyCards(3)).toHaveLength(3);
    expect(getAvailablePuppyCards(0)).toHaveLength(0);
    expect(getAvailablePuppyCards(-4)).toHaveLength(0);
    expect(getAvailablePuppyCards(Number.NaN)).toHaveLength(availablePuppies.length);
    expect(getAvailablePuppyCards()).toHaveLength(availablePuppies.length);
  });

  it('uses sensible fallbacks for incomplete card records', () => {
    const card = toPuppyCardData({ slug: 'minimal-puppy', status: 'available', media: null });

    expect(card.name).toBe('TeddyPup');
    expect(card.media).toEqual([]);
    expect(card.hasVideo).toBe(false);
    expect(card.cover).toBeNull();
  });
});
