import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Link, MemoryRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

function TestRoute() {
  return (
    <>
      <Link to="/next">Open next page</Link>
      <Link to="/current?breed=poodle">Change filter</Link>
      <Link to="/next#details">Open next page section</Link>
      <section id="details">Target section</section>
    </>
  );
}

function renderRoutes(initialEntry = '/current') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<TestRoute />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ScrollToTop', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('jumps to the top on initial load and when the pathname changes', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    renderRoutes();

    expect(window.history.scrollRestoration).toBe('manual');
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'instant' });

    fireEvent.click(screen.getByRole('link', { name: 'Open next page' }));
    expect(scrollTo).toHaveBeenCalledTimes(2);
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: 'instant' });
  });

  it('keeps the current scroll position for query-only changes', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    renderRoutes();
    scrollTo.mockClear();

    fireEvent.click(screen.getByRole('link', { name: 'Change filter' }));
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it('scrolls to an in-page hash target instead of forcing the top', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const scrollIntoView = vi.fn();
    HTMLElement.prototype.scrollIntoView = scrollIntoView;
    renderRoutes();

    fireEvent.click(screen.getByRole('link', { name: 'Open next page section' }));
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant', block: 'start' });
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });
});
