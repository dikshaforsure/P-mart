import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PuppyProfilePage from './PuppyProfilePage';
import { contentService } from '../services/contentService';
import { allPuppies, availablePuppies, goneHomePuppies } from '../data/puppyData';

function renderProfile(slug) {
  return render(
    <MemoryRouter initialEntries={['/puppies/' + slug]}>
      <Routes>
        <Route path="/puppies/:slug" element={<PuppyProfilePage />} />
      </Routes>
    </MemoryRouter>
  );
}
function displayName(puppy) {
  return puppy.displayName || puppy.name || puppy.breed || 'TeddyPup';
}
function adjacentCards(navigation) {
  return within(navigation).getAllByRole('link').filter((link) => link.classList.contains('tp-profile-adjacent-card'));
}
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('PuppyProfilePage', () => {
  it('renders an available puppy with four chapters, its journey, mascot and enquiry letter', async () => {
    const puppy = availablePuppies[0];
    renderProfile(puppy.slug);
    expect(await screen.findByRole('heading', { level: 1, name: displayName(puppy) })).toBeInTheDocument();
    expect(screen.getByText('Available', { exact: true })).toBeInTheDocument();
    expect(screen.getAllByText(puppy.breed, { exact: true })).toHaveLength(2);
    expect(await screen.findByText('1 / ' + (puppy.media.length || 1))).toBeInTheDocument();
    expect(screen.getByText('hello, it’s me')).toBeInTheDocument();
    expect(screen.getByText(new RegExp('what comes with this ' + displayName(puppy)))).toBeInTheDocument();
    expect(screen.getByText('the way home')).toBeInTheDocument();
    expect(screen.getByText('dear TeddyPups…')).toBeInTheDocument();
    expect(document.querySelectorAll('.tp-profile-chapter')).toHaveLength(4);
    expect(document.querySelector('.tp-profile-journey')).toBeInTheDocument();
    expect(document.querySelector('.tp-profile-trail')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ask about ' + displayName(puppy) })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Browse other available puppies' })).toBeInTheDocument();
    expect(screen.getByText('Imported for you')).toBeInTheDocument();

    const board = document.querySelector('.tp-profile-info-board');
    const carePanel = document.querySelector('.tp-profile-paper');
    expect(board).toContainElement(screen.getByRole('heading', { level: 1, name: displayName(puppy) }));
    expect(document.querySelector('.tp-profile-copy')).toContainElement(carePanel);
    expect(within(carePanel).getByRole('heading', { level: 2, name: 'Every Teddy Pup comes' })).toBeInTheDocument();
    expect(within(carePanel).getAllByRole('listitem')).toHaveLength(4);
    expect(carePanel.querySelector('.tp-profile-paper-content p')).not.toBeInTheDocument();
    expect(board.querySelector('.tp-profile-tag-ring')).toBeInTheDocument();
    expect(board.querySelector('.pup-buddy svg')).toHaveAccessibleName(/Teddy, the TeddyPups puppy/);
    expect(document.querySelector('#puppy-note .tp-profile-letter-stamp')).toHaveAttribute('aria-hidden', 'true');
    const askLink = screen.getByRole('link', { name: new RegExp('Ask about ' + displayName(puppy)) });
    expect(askLink.getAttribute('href')).toContain('wa.me/');
    expect(new URL(askLink.href).searchParams.get('text')).toContain(puppy.slug);
    expect(screen.getByRole('link', { name: /Send an enquiry/ })).toHaveAttribute('href', '#puppy-note');
    expect(document.getElementById('puppy-note')).toBeInTheDocument();
    const availableNav = screen.getByRole('navigation', { name: 'Browse other available puppies' });
    const cards = adjacentCards(availableNav);
    expect(cards).toHaveLength(2);
    expect(cards.every((card) => card.querySelector('img') || card.querySelector('.tp-profile-adjacent-image'))).toBe(true);
  });

  it('preserves available previous/next catalogue ordering and wrap-around', async () => {
    const firstView = renderProfile(availablePuppies[0].slug);
    const firstNav = await screen.findByRole('navigation', { name: 'Browse other available puppies' });
    const firstCards = adjacentCards(firstNav);
    expect(firstCards[0]).toHaveAttribute('href', '/puppies/' + availablePuppies.at(-1).slug);
    expect(firstCards[1]).toHaveAttribute('href', '/puppies/' + availablePuppies[1].slug);
    firstView.unmount();

    renderProfile(availablePuppies.at(-1).slug);
    const lastNav = await screen.findByRole('navigation', { name: 'Browse other available puppies' });
    const lastCards = adjacentCards(lastNav);
    expect(lastCards[0]).toHaveAttribute('href', '/puppies/' + availablePuppies[availablePuppies.length - 2].slug);
    expect(lastCards[1]).toHaveAttribute('href', '/puppies/' + availablePuppies[0].slug);
  });

  it('renders sold profiles with three chapters, no journey and a truthful Chapter 3 enquiry', async () => {
    const puppy = allPuppies.find((record) => record.status === 'sold');
    renderProfile(puppy.slug);
    expect(await screen.findByRole('heading', { level: 1, name: displayName(puppy) })).toBeInTheDocument();
    expect(document.querySelector('.tp-profile-status')).toHaveTextContent('Gone home');
    expect(screen.getByText('the day they went home')).toBeInTheDocument();
    expect(screen.getByText(new RegExp('what comes with this ' + displayName(puppy)))).toBeInTheDocument();
    const carePanel = document.querySelector('.tp-profile-paper');
    expect(within(carePanel).getByRole('heading', { level: 2, name: 'Every Teddy Pup comes' })).toBeInTheDocument();
    expect(within(carePanel).getAllByRole('listitem')).toHaveLength(4);
    expect(carePanel.querySelector('.tp-profile-paper-content p')).not.toBeInTheDocument();
    expect(screen.getByText('dear TeddyPups…')).toBeInTheDocument();
    expect(document.querySelectorAll('.tp-profile-chapter')).toHaveLength(3);
    expect(document.querySelector('.tp-profile-journey')).not.toBeInTheDocument();
    expect(document.querySelector('.tp-profile-trail')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Looking for a puppy like this?' })).toBeInTheDocument();
    expect(document.querySelector('.tp-profile-homed-note')).toHaveTextContent(/similar puppies that may currently be available/);
    expect(screen.getByRole('navigation', { name: 'Browse other gone-home puppies' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Gone home' })).toHaveAttribute('href', '/gone-home');
  });

  it('matches Buddy and Bailey navigation to the Gone Home reference cards', async () => {
    const buddy = goneHomePuppies.find((record) => record.slug === 'maltese-buddy-male');
    const buddyView = renderProfile(buddy.slug);
    const buddyCards = adjacentCards(await screen.findByRole('navigation', { name: 'Browse other gone-home puppies' }));
    expect(buddyCards[0]).toHaveAttribute('href', '/puppies/maltipoo-bruno-boy');
    expect(buddyCards[1]).toHaveAttribute('href', '/puppies/maltese-charlie-male');
    buddyView.unmount();

    const bailey = goneHomePuppies.find((record) => record.slug === 'bichon-bailey-boy');
    renderProfile(bailey.slug);
    expect(await screen.findByRole('heading', { level: 1, name: displayName(bailey) })).toBeInTheDocument();
    const baileyCards = adjacentCards(screen.getByRole('navigation', { name: 'Browse other gone-home puppies' }));
    expect(baileyCards[0]).toHaveAttribute('href', '/puppies/pomeranian-mimi-girl');
    expect(baileyCards[1]).toHaveAttribute('href', '/puppies/puppy');
  });

  it('wraps sold-profile neighbours at both ends of the Gone Home order', async () => {
    const firstView = renderProfile(goneHomePuppies[0].slug);
    const firstCards = adjacentCards(await screen.findByRole('navigation', { name: 'Browse other gone-home puppies' }));
    expect(firstCards[0]).toHaveAttribute('href', '/puppies/' + goneHomePuppies.at(-1).slug);
    expect(firstCards[1]).toHaveAttribute('href', '/puppies/' + goneHomePuppies[1].slug);
    firstView.unmount();

    renderProfile(goneHomePuppies.at(-1).slug);
    const lastCards = adjacentCards(await screen.findByRole('navigation', { name: 'Browse other gone-home puppies' }));
    expect(lastCards[0]).toHaveAttribute('href', '/puppies/' + goneHomePuppies[goneHomePuppies.length - 2].slug);
    expect(lastCards[1]).toHaveAttribute('href', '/puppies/' + goneHomePuppies[0].slug);
  });

  it('uses the current available origin to choose the matching journey', async () => {
    const puppy = availablePuppies[0];
    renderProfile(puppy.slug);
    expect(await screen.findByRole('heading', { level: 1, name: displayName(puppy) })).toBeInTheDocument();
    expect(screen.getByText('Imported for you')).toBeInTheDocument();
    expect(screen.getByText('Coming home from abroad')).toBeInTheDocument();
  });

  it('selects the local journey for an available puppy whose origin is local', async () => {
    const puppy = { ...availablePuppies[0], origin: { ...availablePuppies[0].origin, slug: 'local', name: 'Dubai' } };
    vi.spyOn(contentService, 'getPuppyBySlug').mockResolvedValue(puppy);
    vi.spyOn(contentService, 'getAdjacentAvailablePuppies').mockResolvedValue({ previous: null, next: null });

    renderProfile(puppy.slug);

    expect(await screen.findByRole('heading', { level: 1, name: displayName(puppy) })).toBeInTheDocument();
    expect(screen.getByText('Meet them in Dubai')).toBeInTheDocument();
    expect(screen.getByText('Come and meet')).toBeInTheDocument();
    expect(screen.getByText(displayName(puppy) + '’s way home')).toBeInTheDocument();
  });

  it('cleans up profile ribbon listeners and a pending animation frame', async () => {
    const originalRequest = window.requestAnimationFrame;
    const originalCancel = window.cancelAnimationFrame;
    const requestFrame = vi.fn(() => 37);
    const cancelFrame = vi.fn();
    window.requestAnimationFrame = requestFrame;
    window.cancelAnimationFrame = cancelFrame;
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderProfile(availablePuppies[0].slug);
    await screen.findByRole('heading', { level: 1, name: displayName(availablePuppies[0]) });
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), { passive: true });
    expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(cancelFrame).toHaveBeenCalledWith(37);
    window.requestAnimationFrame = originalRequest;
    window.cancelAnimationFrame = originalCancel;
  });

  it('shows the existing not-found state for an unknown slug', async () => {
    renderProfile('this-puppy-does-not-exist');
    expect(await screen.findByRole('heading', { level: 1, name: 'We couldn’t find this TeddyPup.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /See available puppies/ })).toHaveAttribute('href', '/puppies');
  });
});
