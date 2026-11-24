import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PuppyCard from './PuppyCard';

const puppy = {
  id: 'luna-id',
  slug: 'luna-maltipoo-girl',
  displayName: 'Luna',
  name: 'Luna',
  breed: 'Maltipoo',
  genderLabel: 'Girl',
  age: '3 months',
  origin: { name: 'Imported' },
  cover: {
    kind: 'image',
    url: 'https://example.test/luna.jpg',
    alt: 'Luna sitting in the garden',
    width: 600,
    height: 800,
    focalX: 0.25,
    focalY: 0.4,
  },
};

function renderCard(record = puppy) {
  return render(<BrowserRouter><PuppyCard puppy={record} /></BrowserRouter>);
}

describe('PuppyCard', () => {
  it('renders the puppy image, facts and exact profile destination', () => {
    renderCard();

    const link = screen.getByRole('link', { name: /Luna/i });
    const image = screen.getByRole('img', { name: 'Luna sitting in the garden' });

    expect(link).toHaveAttribute('href', '/puppies/luna-maltipoo-girl');
    expect(image).toHaveAttribute('src', puppy.cover.url);
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('width', '600');
    expect(image).toHaveAttribute('height', '800');
    expect(image).toHaveStyle({ objectPosition: '25% 40%' });
    expect(screen.getByText('Maltipoo')).toBeInTheDocument();
    expect(screen.getByText('Girl')).toBeInTheDocument();
    expect(screen.getByText('3 months')).toBeInTheDocument();
    expect(screen.getByText('Imported')).toBeInTheDocument();
  });

  it('shows a photo-coming-soon fallback when no cover exists', () => {
    renderCard({ ...puppy, cover: null });

    expect(screen.getByText('Photo coming soon')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('shows an unavailable fallback after the cover image errors', () => {
    renderCard();

    fireEvent.error(screen.getByRole('img', { name: 'Luna sitting in the garden' }));

    expect(screen.getByText('Photo unavailable')).toBeInTheDocument();
  });
});
