import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Link, MemoryRouter, useLocation } from 'react-router-dom';
import PageTransition from './PageTransition';

function RouteControls() {
  const location = useLocation();

  return (
    <div>
      <p data-testid="current-path">{location.pathname}</p>
      <Link to="/puppies">Open puppies</Link>
      <Link to="/?breed=poodle">Change catalogue filter</Link>
      <Link to="/#featured">Jump to homepage section</Link>
      <Link to="/happy-families">Open happy families</Link>
    </div>
  );
}

function renderTransition(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <PageTransition />
      <RouteControls />
    </MemoryRouter>
  );
}

afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('PageTransition', () => {
  it('does not show the loading curtain on the initial page load', () => {
    vi.useFakeTimers();
    renderTransition();

    expect(screen.getByTestId('current-path')).toHaveTextContent('/');
    expect(screen.queryByTestId('page-transition')).not.toBeInTheDocument();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('drops in, runs Teddy left-to-right, then lifts away on a pathname change', () => {
    vi.useFakeTimers();
    renderTransition();

    fireEvent.click(screen.getByRole('link', { name: 'Open puppies' }));

    const curtain = screen.getByTestId('page-transition');
    expect(curtain).toHaveAttribute('data-phase', 'entering');
    expect(curtain).toHaveAttribute('role', 'status');
    expect(withinStatusPaws(curtain)).toBe(6);
    expect(screen.getByTestId('teddy-runner-svg')).toBeInTheDocument();
    expect(screen.getByTestId('current-path')).toHaveTextContent('/puppies');

    act(() => vi.advanceTimersByTime(440));
    expect(screen.getByTestId('page-transition')).toHaveAttribute('data-phase', 'running');

    act(() => vi.advanceTimersByTime(1480));
    expect(screen.getByTestId('page-transition')).toHaveAttribute('data-phase', 'exiting');

    act(() => vi.advanceTimersByTime(540));
    expect(screen.queryByTestId('page-transition')).not.toBeInTheDocument();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('does not animate query-only or hash-only navigation', () => {
    vi.useFakeTimers();
    renderTransition();

    fireEvent.click(screen.getByRole('link', { name: 'Change catalogue filter' }));
    expect(screen.queryByTestId('page-transition')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: 'Jump to homepage section' }));
    expect(screen.queryByTestId('page-transition')).not.toBeInTheDocument();
  });

  it('respects reduced-motion preferences and skips the transition', () => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', vi.fn((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })));
    renderTransition();

    fireEvent.click(screen.getByRole('link', { name: 'Open happy families' }));

    expect(screen.getByTestId('current-path')).toHaveTextContent('/happy-families');
    expect(screen.queryByTestId('page-transition')).not.toBeInTheDocument();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('clears all transition timers if the layout unmounts mid-animation', () => {
    vi.useFakeTimers();
    const { unmount } = renderTransition();

    fireEvent.click(screen.getByRole('link', { name: 'Open puppies' }));
    expect(vi.getTimerCount()).toBe(3);

    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});

function withinStatusPaws(curtain) {
  return curtain.querySelectorAll('[data-testid="page-transition-paw"]').length;
}
