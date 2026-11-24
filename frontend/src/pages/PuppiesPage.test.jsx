import { MemoryRouter } from 'react-router-dom';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { contentService } from '../services/contentService';
import { availablePuppies } from '../data/puppyData';
import PuppiesPage from './PuppiesPage';

function renderPage(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <PuppiesPage />
    </MemoryRouter>
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('PuppiesPage catalogue', () => {
  it('renders every available puppy and only their exact profile destinations', async () => {
    renderPage();
    const list = await screen.findByRole('list', { name: 'Available puppies' });
    const cards = within(list).getAllByRole('listitem');
    const profileLinks = within(list).getAllByRole('link');

    expect(cards).toHaveLength(availablePuppies.length);
    expect(profileLinks.map((link) => link.getAttribute('href'))).toEqual(
      availablePuppies.map((puppy) => '/puppies/' + puppy.slug)
    );
  });

  it('shows the visible filter board and filters by breed, including multi-breed puppies', async () => {
    renderPage(['/puppies']);
    expect(await screen.findByRole('heading', { name: 'Who are you looking for?' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Filter by Poodle' }));
    const list = screen.getByRole('list', { name: 'Available puppies' });
    const links = within(list).getAllByRole('link');

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/puppies/korean-teacup-poodle-female',
      '/puppies/toy-poodle-male-female',
    ]);
    expect(screen.getByLabelText('Catalogue results')).toHaveTextContent('2 puppies match your filters');
  });

  it('filters the catalogue by the Korean Teacup collection from the URL', async () => {
    renderPage(['/puppies?collection=korean-teacup']);
    const list = await screen.findByRole('list', { name: 'Available puppies' });
    const links = within(list).getAllByRole('link');

    expect(links).toHaveLength(5);
    expect(links.every((link) => link.getAttribute('href').includes('korean-teacup'))).toBe(true);
    expect(screen.getByRole('button', { name: 'Filter by Korean Teacup collection' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows loading and then the empty-catalogue state', async () => {
    let resolveRequest;
    vi.spyOn(contentService, 'getAvailablePuppies').mockReturnValue(new Promise((resolve) => {
      resolveRequest = resolve;
    }));
    renderPage();
    expect(screen.getByRole('status')).toHaveTextContent('Finding the little ones');

    await act(async () => {
      resolveRequest([]);
    });
    expect(screen.getByText(/No puppies are listed as available right now/)).toBeInTheDocument();
  });

  it('shows an error message if the catalogue request rejects', async () => {
    vi.spyOn(contentService, 'getAvailablePuppies').mockRejectedValue(new Error('catalogue unavailable'));
    renderPage();
    expect(await screen.findByRole('alert')).toHaveTextContent('We couldn’t load the puppy list');
  });
});
