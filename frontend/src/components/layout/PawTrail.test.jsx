import { act, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PawTrail from './PawTrail';

function configurePointer({ fine = true, reducedMotion = false } = {}) {
  vi.stubGlobal('matchMedia', vi.fn((query) => ({
    matches: query.includes('pointer: fine') ? fine : reducedMotion,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })));
}

function movePointer(x, y, pointerType = 'mouse') {
  const event = new Event('pointermove');
  Object.defineProperties(event, {
    clientX: { value: x },
    clientY: { value: y },
    pointerType: { value: pointerType },
  });
  window.dispatchEvent(event);
}

describe('PawTrail', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('leaves a fading paw footprint behind fine-pointer mouse movement', () => {
    vi.useFakeTimers();
    configurePointer();
    const { container } = render(<PawTrail />);

    act(() => movePointer(120, 180));
    const stamp = container.querySelector('.paw-trail-stamp');

    expect(stamp).toBeInTheDocument();
    expect(stamp).toHaveStyle({ left: '120px', top: '180px' });
    expect(stamp.querySelector('svg')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(780));
    expect(container.querySelector('.paw-trail-stamp')).not.toBeInTheDocument();
  });

  it('does not add a footprint for touch-pointer movement', () => {
    configurePointer();
    const { container } = render(<PawTrail />);

    act(() => movePointer(120, 180, 'touch'));
    expect(container.querySelector('.paw-trail-layer')).not.toBeInTheDocument();
  });

  it('does not mount the trail on coarse-pointer devices', () => {
    configurePointer({ fine: false });
    const { container } = render(<PawTrail />);

    act(() => movePointer(120, 180));
    expect(container.querySelector('.paw-trail-layer')).not.toBeInTheDocument();
  });

  it('respects the reduced-motion preference', () => {
    configurePointer({ reducedMotion: true });
    const { container } = render(<PawTrail />);

    act(() => movePointer(120, 180));
    expect(container.querySelector('.paw-trail-layer')).not.toBeInTheDocument();
  });

  it('cleans up pending trail timers when unmounted', () => {
    vi.useFakeTimers();
    configurePointer();
    const { container, unmount } = render(<PawTrail />);

    act(() => movePointer(120, 180));
    expect(container.querySelector('.paw-trail-stamp')).toBeInTheDocument();

    unmount();
    act(() => vi.advanceTimersByTime(780));
    expect(container.querySelector('.paw-trail-stamp')).not.toBeInTheDocument();
  });
});
