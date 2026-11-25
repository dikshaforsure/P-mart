import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import GoneHomePage from './GoneHomePage';
import { goneHomePuppies } from '../data/puppyData';

function renderPage() {
  return render(<MemoryRouter><GoneHomePage /></MemoryRouter>);
}

describe('GoneHomePage', () => {
  it('renders the source introduction, ticket motif and available-puppies CTA', () => {
    renderPage();

    expect(screen.getByRole('heading', { level: 1, name: 'Gone home' })).toBeInTheDocument();
    expect(screen.getByText(/Every puppy here has already joined a loving family/)).toBeInTheDocument();
    expect(within(screen.getByRole('list', { name: 'Puppies who have gone home' })).getAllByText('one ticket home')).toHaveLength(27);
    expect(screen.getByText('tickets home')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /See available puppies/ })).toHaveAttribute('href', '/puppies');
  });

  it('renders all 27 sold puppies in the verified reference order with profile links', () => {
    renderPage();

    expect(goneHomePuppies).toHaveLength(27);
    const list = screen.getByRole('list', { name: 'Puppies who have gone home' });
    const cards = within(list).getAllByRole('link');
    expect(cards).toHaveLength(goneHomePuppies.length);
    expect(cards.map((card) => card.dataset.puppySlug)).toEqual(goneHomePuppies.map((puppy) => puppy.slug));
    expect(cards.map((card) => card.getAttribute('href'))).toEqual(
      goneHomePuppies.map((puppy) => '/puppies/' + puppy.slug)
    );
    expect(list).not.toHaveTextContent('Available');
    expect(list.querySelectorAll('.gone-home-ticket__kicker')).toHaveLength(27);
    expect(list.querySelectorAll('.gone-home-ticket__stub')).toHaveLength(27);
  });

  it('keeps generic breed labels for records that have no individual puppy name', () => {
    renderPage();

    const genericRecords = goneHomePuppies.filter((puppy) =>
      (puppy.displayName || puppy.name || '').trim().toLowerCase() === (puppy.breed || '').trim().toLowerCase()
    );
    expect(genericRecords.length).toBeGreaterThan(0);
    genericRecords.forEach((puppy) => {
      const card = document.querySelector('[data-puppy-slug="' + puppy.slug + '"]');
      expect(card).toHaveTextContent(puppy.displayName || puppy.name);
    });
    expect(document.querySelector('[data-puppy-slug="blue-marle-pomeranian"]')).toHaveTextContent('Pomeranian');
  });

  it('shows a stable paw fallback for the sold record without a cover or media', () => {
    renderPage();

    const missing = goneHomePuppies.find((puppy) =>
      !puppy.cover?.url && !puppy.media?.some((item) => item.kind === 'image' && item.url)
    );
    expect(missing).toBeDefined();
    const card = document.querySelector('[data-puppy-slug="' + missing.slug + '"]');
    expect(card.querySelector('.gone-home-ticket__photo-fallback')).toBeInTheDocument();
  });

  it('replaces a failed remote image without removing its ticket link', () => {
    renderPage();

    const list = screen.getByRole('list', { name: 'Puppies who have gone home' });
    const image = within(list).getAllByRole('img').find((item) => item.tagName === 'IMG');
    const link = image.closest('a');

    fireEvent.error(image);

    expect(link).toBeInTheDocument();
    expect(link.querySelector('.gone-home-ticket__photo-fallback')).toBeInTheDocument();
    expect(within(list).getAllByRole('link')).toHaveLength(27);
  });
});
