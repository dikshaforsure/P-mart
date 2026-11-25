import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import SiteHeader from './SiteHeader';

function CurrentPath() {
  const location = useLocation();
  return <p role="status">{location.pathname}</p>;
}

function renderHeader(path = '/') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <SiteHeader />
      <Routes><Route path="*" element={<CurrentPath />} /></Routes>
    </MemoryRouter>
  );
}

describe('SiteHeader', () => {
  it('renders real route links and marks the current section active', () => {
    renderHeader('/puppies/example-puppy');

    const banner = screen.getByRole('banner');
    expect(banner).toHaveClass('site-header');

    const mainNavigation = screen.getByRole('navigation', { name: 'Main navigation' });
    const puppiesLink = within(mainNavigation).getByRole('link', { name: 'Puppies' });

    expect(puppiesLink).toHaveAttribute('href', '/puppies');
    expect(puppiesLink).toHaveAttribute('aria-current', 'page');
    expect(within(mainNavigation).getByRole('link', { name: 'How it works' })).toHaveAttribute('href', '/how-it-works');
    expect(within(mainNavigation).getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '/faq');
  });

  it('opens the mobile menu, closes with Escape and restores focus to the trigger', () => {
    renderHeader('/');

    const trigger = screen.getByRole('button', { name: 'Open navigation menu' });
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Mobile navigation' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(dialog).toBeInTheDocument();
    expect(dialog).not.toHaveAttribute('aria-hidden', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
    expect(dialog).toHaveAttribute('aria-hidden', 'true');
  });

  it('navigates from the mobile menu and closes the menu', () => {
    renderHeader('/');

    fireEvent.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    const dialog = screen.getByRole('dialog', { name: 'Mobile navigation' });
    fireEvent.click(within(dialog).getByRole('link', { name: /How it works/ }));

    expect(screen.getByRole('status')).toHaveTextContent('/how-it-works');
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toHaveAttribute('aria-expanded', 'false');
  });
});
