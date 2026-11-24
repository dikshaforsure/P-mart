import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';
import { availablePuppies } from '../data/puppyData';

function renderAt(path) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

afterEach(() => {
  window.history.replaceState({}, '', '/');
});

describe('application puppy routes', () => {
  it('connects /puppies to the catalogue page', async () => {
    renderAt('/puppies');
    expect(await screen.findByRole('list', { name: 'Available puppies' })).toBeInTheDocument();
  });

  it('connects /puppies/:slug to the reusable profile page', async () => {
    const puppy = availablePuppies[0];
    renderAt('/puppies/' + puppy.slug);

    expect(await screen.findByRole('heading', {
      level: 1,
      name: puppy.displayName || puppy.name || puppy.breed,
    })).toBeInTheDocument();
  });

  it('keeps the application not-found route for unmatched paths', async () => {
    renderAt('/this-route-does-not-exist');
    expect(await screen.findByRole('heading', { name: 'This page wandered off.' })).toBeInTheDocument();
  });
});
