import { describe, expect, it } from 'vitest';
import { allPuppies, availablePuppies, goneHomePuppies, getAdjacentSoldPuppies } from './puppyData';

describe('puppy profile source data', () => {
  it('retains all 42 original puppy records and their available/sold totals', () => {
    expect(allPuppies).toHaveLength(42);
    expect(availablePuppies).toHaveLength(15);
    expect(allPuppies.filter((puppy) => puppy.status === 'sold')).toHaveLength(27);
    expect(goneHomePuppies).toHaveLength(27);
  });

  it('uses the verified Gone Home archive ordering for sold profile adjacency', () => {
    const buddy = getAdjacentSoldPuppies('maltese-buddy-male');
    expect(buddy.previous.slug).toBe('maltipoo-bruno-boy');
    expect(buddy.next.slug).toBe('maltese-charlie-male');

    const bailey = getAdjacentSoldPuppies('bichon-bailey-boy');
    expect(bailey.previous.slug).toBe('pomeranian-mimi-girl');
    expect(bailey.next.slug).toBe('puppy');
  });

  it('wraps sold-profile neighbours at both ends of the Gone Home order', () => {
    const first = goneHomePuppies[0];
    const last = goneHomePuppies[goneHomePuppies.length - 1];

    expect(getAdjacentSoldPuppies(first.slug).previous.slug).toBe(last.slug);
    expect(getAdjacentSoldPuppies(first.slug).next.slug).toBe(goneHomePuppies[1].slug);
    expect(getAdjacentSoldPuppies(last.slug).previous.slug).toBe(goneHomePuppies[goneHomePuppies.length - 2].slug);
    expect(getAdjacentSoldPuppies(last.slug).next.slug).toBe(first.slug);
  });
});
