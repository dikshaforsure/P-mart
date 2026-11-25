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

  it('connects /gone-home to the source-ordered sold ticket archive', async () => {
    renderAt('/gone-home');
    expect(await screen.findByRole('heading', { level: 1, name: 'Gone home' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Puppies who have gone home' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('connects /happy-families to the full family photo wall', async () => {
    renderAt('/happy-families');
    expect(await screen.findByRole('heading', { level: 1, name: 'Happy families' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: 'Photos from TeddyPups families' })).toBeInTheDocument();
    expect(screen.getByText('64 moments and counting')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('connects /contact to the visit details and letter form', async () => {
    renderAt('/contact');
    expect(await screen.findByRole('heading', { level: 1, name: 'Get in touch with us' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Your name (required)' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Visit us in Downtown Dubai' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('connects /how-it-works to the complete journey page', async () => {
    renderAt('/how-it-works');
    expect(await screen.findByRole('heading', { level: 1, name: 'How it works' })).toBeInTheDocument();
    expect(screen.getByRole('tablist', { name: 'Ways to bring your puppy home' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('connects /faq to the searchable FAQ page', async () => {
    renderAt('/faq');
    expect(await screen.findByRole('heading', { level: 1, name: 'Questions & answers' })).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'sniff out a question' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('keeps the application not-found route for unmatched paths', async () => {
    renderAt('/this-route-does-not-exist');
    expect(await screen.findByRole('heading', { name: 'This page wandered off.' })).toBeInTheDocument();
  });
});
