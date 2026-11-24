import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FeaturedPuppies from './FeaturedPuppies';

describe('FeaturedPuppies', () => {
  it('renders homepage puppy cards and links to their reusable profiles', () => {
    render(<BrowserRouter><FeaturedPuppies puppies={[{
      id: 'max-id',
      slug: 'maltipoo-max-male',
      name: 'Max',
      breed: 'Maltipoo',
      sex: 'Boy',
      age: '3 months',
      cover: { url: '/max.jpg', alt: 'Max in the garden' },
      hasVideo: true,
    }]} /></BrowserRouter>);

    const cardLink = screen.getByRole('link', { name: /Max/i });
    expect(cardLink).toHaveAttribute('href', '/puppies/maltipoo-max-male');
    expect(screen.getByRole('img', { name: 'Max in the garden' })).toHaveAttribute('src', '/max.jpg');
    expect(screen.getByText('Maltipoo · Boy · 3 months')).toBeInTheDocument();
    expect(screen.getByText('▶ video')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /See all available puppies/i })).toHaveAttribute('href', '/puppies');
  });

  it('shows the image fallback when a featured puppy photo errors', () => {
    render(<BrowserRouter><FeaturedPuppies puppies={[{
      id: 'max-id',
      slug: 'maltipoo-max-male',
      name: 'Max',
      breed: 'Maltipoo',
      sex: 'Boy',
      age: '3 months',
      cover: { url: '/broken.jpg', alt: 'Max photo' },
      hasVideo: false,
    }]} /></BrowserRouter>);

    fireEvent.error(screen.getByRole('img', { name: 'Max photo' }));
    expect(screen.getByText('Photo unavailable')).toBeInTheDocument();
  });
});
