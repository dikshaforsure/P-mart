import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PuppyMascot from './PuppyMascot';

describe('PuppyMascot', () => {
  it('renders the source mascot artwork with animated SVG parts and an accessible label', () => {
    const boardRef = { current: document.createElement('div') };
    render(<PuppyMascot boardRef={boardRef} puppyName="Luna" />);

    const mascot = screen.getByRole('img', { name: "Teddy, the TeddyPups puppy, peeking over Luna's information board" });
    expect(mascot).toHaveAttribute('viewBox', '0 0 300 240');
    expect(mascot.querySelector('[data-p="earL"]')).toBeInTheDocument();
    expect(mascot.querySelector('[data-p="earR"]')).toBeInTheDocument();
    expect(mascot.querySelector('[data-p="open"]')).toBeInTheDocument();
    expect(mascot.querySelector('[data-p="shut"]')).toBeInTheDocument();
    expect(mascot.querySelector('[data-p="blink"]')).toBeInTheDocument();
    expect(mascot.querySelector('[data-p="paw-left"]')).toBeInTheDocument();
    expect(mascot.querySelector('[data-p="paw-right"]')).toBeInTheDocument();
    expect(screen.getByText('hello!')).toHaveAttribute('aria-hidden', 'true');
  });

  it('supports the source contact-page presentation without a hanging ring or speech bubble', () => {
    render(
      <PuppyMascot
        puppyName="you"
        label="Teddy, waiting for your letter"
        facing="left"
        showRing={false}
        bubbleText=""
      />
    );

    const artwork = screen.getByRole('img', { name: 'Teddy, waiting for your letter' });
    const buddy = artwork.closest('.pup-buddy');
    expect(buddy).toHaveAttribute('data-facing', 'left');
    expect(buddy.querySelector('.tp-profile-tag-ring')).not.toBeInTheDocument();
    expect(buddy.querySelector('.pup-bubble')).not.toBeInTheDocument();
  });

  it('reveals the hanging board when it enters view and disconnects the observer', () => {
    const observers = [];
    class TestObserver {
      constructor(callback) {
        this.callback = callback;
        this.observe = vi.fn();
        this.unobserve = vi.fn();
        this.disconnect = vi.fn();
        observers.push(this);
      }
    }
    vi.stubGlobal('IntersectionObserver', TestObserver);
    const board = document.createElement('div');
    const { unmount } = render(<PuppyMascot boardRef={{ current: board }} puppyName="Buddy" />);

    expect(observers).toHaveLength(1);
    expect(observers[0].observe).toHaveBeenCalledWith(board);
    observers[0].callback([{ target: board, isIntersecting: true }]);
    expect(board).toHaveAttribute('data-revealed', 'true');
    expect(observers[0].unobserve).toHaveBeenCalledWith(board);

    unmount();
    expect(observers[0].disconnect).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });

  it('skips the reveal observer when reduced motion is preferred', () => {
    const matchMedia = vi.fn(() => ({ matches: true }));
    vi.stubGlobal('matchMedia', matchMedia);
    const board = document.createElement('div');
    render(<PuppyMascot boardRef={{ current: board }} puppyName="Bailey" />);

    expect(board).toHaveAttribute('data-revealed', 'true');
    expect(matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
    vi.unstubAllGlobals();
  });
});
