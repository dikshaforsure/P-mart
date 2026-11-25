import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import SiteFooter from './SiteFooter';

describe('SiteFooter', () => {
  it('renders the reference-backed email and location without placeholder contact details', () => {
    render(<MemoryRouter><SiteFooter /></MemoryRouter>);

    expect(screen.getByRole('link', { name: 'teddypupsadmin@gmail.com' })).toHaveAttribute('href', 'mailto:teddypupsadmin@gmail.com');
    expect(screen.getByText('Downtown Dubai, United Arab Emirates')).toBeInTheDocument();
    expect(screen.queryByText(/address to be confirmed/i)).not.toBeInTheDocument();
    expect(screen.queryByText('+971 50 000 0000')).not.toBeInTheDocument();
  });

  it('links every footer destination to its existing route or page section', () => {
    render(<MemoryRouter><SiteFooter /></MemoryRouter>);

    const navigation = screen.getByRole('navigation', { name: 'Explore' });
    expect(within(navigation).getByRole('link', { name: 'How it works' })).toHaveAttribute('href', '/how-it-works');
    expect(within(navigation).getByRole('link', { name: 'Delivery & collection' })).toHaveAttribute('href', '/how-it-works#delivery');
    expect(within(navigation).getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '/faq');
  });

  it('uses the existing WhatsApp helper and source-backed social destinations', () => {
    render(<MemoryRouter><SiteFooter /></MemoryRouter>);

    expect(screen.getByRole('link', { name: /Ask us on WhatsApp/ })).toHaveAttribute('href', expect.stringContaining('wa.me/'));
    expect(screen.getByRole('link', { name: 'Instagram ↗' })).toHaveAttribute('href', 'https://www.instagram.com/teddypups.worldwide/');
    expect(screen.getByRole('link', { name: 'TikTok ↗' })).toHaveAttribute('href', 'https://www.tiktok.com/@teddypupsuae');
    expect(screen.getByRole('link', { name: 'Facebook ↗' })).toHaveAttribute('href', 'https://www.facebook.com/profile.php?id=61567496944539');
  });
});
