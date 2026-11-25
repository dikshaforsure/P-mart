import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Link, MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import PageTransition from './PageTransition';

function RouteControls() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <p data-testid="current-path">{location.pathname}</p>
      <Link to="/puppies">Open puppies</Link>
      <Link to="/?breed=poodle">Change catalogue filter</Link>
      <Link to="/#featured">Jump to homepage section</Link>
      <Link to="/happy-families">Open happy families</Link>
      <a href="https://example.org/" target="_blank" rel="noreferrer">Open external tab</a>
      <a href="/puppies" target="_blank" rel="noreferrer">Open internal tab</a>
      <a href="/puppies" download="puppies.txt">Download puppies</a>
      <button type="button" onClick={() => navigate(-1)}>Browser back</button>
      <button type="button" onClick={() => navigate(1)}>Browser forward</button>
    </div>
  );
}

function renderTransition(initialEntry = '/') {
  const onActiveChange = vi.fn();
  const view = render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <PageTransition onActiveChange={onActiveChange} />
      <RouteControls />
    </MemoryRouter>
  );
  return { ...view, onActiveChange };
}

function completeCurrentTransition() {
  const curtain = screen.queryByTestId('page-transition');
  if (!curtain) return;

  if (curtain.getAttribute('data-phase') === 'entering') {
    fireEvent.animationEnd(curtain, { animationName: 'page-transition-drop' });
  }

  const runner = screen.queryByTestId('page-transition-runner');
  if (runner && screen.queryByTestId('page-transition')?.getAttribute('data-phase') === 'running') {
    fireEvent.animationEnd(runner, { animationName: 'page-transition-run-across' });
  }

  const exitingCurtain = screen.queryByTestId('page-transition');
  if (exitingCurtain?.getAttribute('data-phase') === 'exiting') {
    fireEvent.animationEnd(exitingCurtain, { animationName: 'page-transition-lift' });
  }
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('PageTransition', () => {
  it('runs the full puppy loading sequence on the initial application mount', () => {
    const { onActiveChange } = renderTransition();

    const curtain = screen.getByTestId('page-transition');
    expect(curtain).toHaveAttribute('data-phase', 'entering');
    expect(curtain).toHaveAttribute('aria-hidden', 'true');
    expect(curtain).toHaveAttribute('data-run-duration-ms', '3200');
    expect(screen.getByTestId('current-path')).toHaveTextContent('/');
    expect(onActiveChange).toHaveBeenLastCalledWith(true);

    fireEvent.animationEnd(curtain, { animationName: 'page-transition-drop' });
    expect(screen.getByTestId('page-transition')).toHaveAttribute('data-phase', 'running');

    fireEvent.animationEnd(screen.getByTestId('page-transition-runner'), { animationName: 'page-transition-run-across' });
    expect(screen.getByTestId('page-transition')).toHaveAttribute('data-phase', 'exiting');

    fireEvent.animationEnd(screen.getByTestId('page-transition'), { animationName: 'page-transition-lift' });
    expect(screen.queryByTestId('page-transition')).not.toBeInTheDocument();
    expect(onActiveChange).toHaveBeenLastCalledWith(false);
  });

  it('covers the current page before committing an internal link destination', () => {
    const { onActiveChange } = renderTransition();
    completeCurrentTransition();

    fireEvent.click(screen.getByRole('link', { name: 'Open puppies' }));
    expect(screen.getByTestId('page-transition')).toHaveAttribute('data-phase', 'entering');
    expect(screen.getByTestId('current-path')).toHaveTextContent('/');
    expect(onActiveChange).toHaveBeenLastCalledWith(true);

    // A duplicate click while the curtain is dropping cannot queue a second navigation.
    fireEvent.click(screen.getByRole('link', { name: 'Open puppies' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/');

    fireEvent.animationEnd(screen.getByTestId('page-transition'), { animationName: 'page-transition-drop' });
    expect(screen.getByTestId('current-path')).toHaveTextContent('/puppies');
    expect(screen.getByTestId('page-transition')).toHaveAttribute('data-phase', 'running');

    fireEvent.animationEnd(screen.getByTestId('page-transition-runner'), { animationName: 'page-transition-run-across' });
    fireEvent.animationEnd(screen.getByTestId('page-transition'), { animationName: 'page-transition-lift' });
    expect(screen.queryByTestId('page-transition')).not.toBeInTheDocument();
  });

  it('stamps five SVG pawprints in order with in-run delays', () => {
    renderTransition();
    const curtain = screen.getByTestId('page-transition');
    const paws = [...curtain.querySelectorAll('[data-testid="page-transition-paw"]')];
    const delays = paws.map((paw) => Number.parseFloat(paw.getAttribute('data-paw-delay')));

    expect(paws).toHaveLength(5);
    expect(paws.every((paw) => paw.querySelector('svg'))).toBe(true);
    expect(delays.every((delay) => Number.isFinite(delay) && delay > 0 && delay < 3200)).toBe(true);
    expect(delays).toEqual([...delays].sort((a, b) => a - b));
    expect(paws.map((paw) => paw.style.left)).toEqual(['27%', '31.5%', '36%', '40.5%', '45%']);
  });

  it('uses a dedicated 300 by 240 running puppy with separate anatomy groups', () => {
    renderTransition();
    const puppy = screen.getByTestId('teddy-runner-svg');

    expect(puppy).toHaveAttribute('viewBox', '0 0 300 240');
    for (const part of [
      'body', 'head', 'left-ear', 'right-ear', 'rear-far-leg',
      'front-far-leg', 'rear-near-leg', 'front-near-leg',
      'tail', 'eyes', 'nose', 'mouth', 'tongue', 'ground-shadow',
    ]) {
      expect(puppy.querySelector(`[data-part="${part}"]`)).toBeInTheDocument();
    }
    expect(puppy.querySelectorAll('.teddy-runner-leg')).toHaveLength(4);
  });

  it('does not transition query-only or hash-only navigation', () => {
    renderTransition();
    completeCurrentTransition();

    fireEvent.click(screen.getByRole('link', { name: 'Change catalogue filter' }));
    expect(screen.queryByTestId('page-transition')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: 'Jump to homepage section' }));
    expect(screen.queryByTestId('page-transition')).not.toBeInTheDocument();
  });

  it('does not intercept external, new-tab or download links', () => {
    renderTransition();
    completeCurrentTransition();

    fireEvent.click(screen.getByRole('link', { name: 'Open external tab' }));
    fireEvent.click(screen.getByRole('link', { name: 'Open internal tab' }));
    fireEvent.click(screen.getByRole('link', { name: 'Download puppies' }));

    expect(screen.getByTestId('current-path')).toHaveTextContent('/');
    expect(screen.queryByTestId('page-transition')).not.toBeInTheDocument();
  });

  it('supports back and forward pathname changes', () => {
    renderTransition();
    completeCurrentTransition();

    fireEvent.click(screen.getByRole('link', { name: 'Open puppies' }));
    fireEvent.animationEnd(screen.getByTestId('page-transition'), { animationName: 'page-transition-drop' });
    expect(screen.getByTestId('current-path')).toHaveTextContent('/puppies');
    fireEvent.animationEnd(screen.getByTestId('page-transition-runner'), { animationName: 'page-transition-run-across' });
    fireEvent.animationEnd(screen.getByTestId('page-transition'), { animationName: 'page-transition-lift' });

    fireEvent.click(screen.getByRole('button', { name: 'Browser back' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/');
    expect(screen.getByTestId('page-transition')).toHaveAttribute('data-phase', 'entering');
    completeCurrentTransition();

    fireEvent.click(screen.getByRole('button', { name: 'Browser forward' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/puppies');
    expect(screen.getByTestId('page-transition')).toHaveAttribute('data-phase', 'entering');
  });

  it('skips initial and navigation transitions when reduced motion is requested', () => {
    vi.stubGlobal('matchMedia', vi.fn((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })));

    renderTransition();
    expect(screen.queryByTestId('page-transition')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: 'Open puppies' }));
    expect(screen.getByTestId('current-path')).toHaveTextContent('/puppies');
    expect(screen.queryByTestId('page-transition')).not.toBeInTheDocument();
  });

  it('recalculates paw placement delays after a viewport resize', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });
    renderTransition();
    const firstDelay = screen.getAllByTestId('page-transition-paw')[0].getAttribute('data-paw-delay');

    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1280 });
    fireEvent.resize(window);
    const resizedDelay = screen.getAllByTestId('page-transition-paw')[0].getAttribute('data-paw-delay');

    expect(resizedDelay).not.toBe(firstDelay);
  });

  it('cleans up global listeners when the transition component unmounts', () => {
    const removeDocumentListener = vi.spyOn(document, 'removeEventListener');
    const removeWindowListener = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderTransition();

    unmount();

    expect(removeDocumentListener).toHaveBeenCalledWith('click', expect.any(Function), true);
    expect(removeWindowListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
