import { BrowserRouter } from 'react-router-dom';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HomeHero from './HomeHero';

const puppies = Array.from({ length: 6 }, (_, index) => ({
  id: 'puppy-' + (index + 1),
  slug: 'puppy-' + (index + 1),
  name: index === 0 ? 'Max' : '',
  breed: index === 0 ? 'Maltipoo' : 'Puppy breed ' + (index + 1),
  cover: {
    url: '/puppy-' + (index + 1) + '.jpg',
    alt: 'Puppy ' + (index + 1) + ' portrait',
    focalX: 0.4,
    focalY: 0.6,
  },
}));

describe('HomeHero', () => {
  it('shows six puppy links with profile destinations and the existing CTAs', () => {
    render(<BrowserRouter><HomeHero puppies={puppies} /></BrowserRouter>);
    expect(screen.getByRole('heading', { level: 1, name: /Premium teacup puppies in Dubai/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View available puppies/i })).toHaveAttribute('href', '/puppies');
    expect(screen.getByRole('link', { name: /Enquire on WhatsApp/i })).toHaveAttribute('target', '_blank');
    const lineup = screen.getByRole('list', { name: /puppies looking for their families/i });
    expect(within(lineup).getAllByRole('link')).toHaveLength(6);
    expect(within(lineup).getByRole('link', { name: /Meet Max/i })).toHaveAttribute('href', '/puppies/puppy-1');
    expect(within(lineup).getByRole('img', { name: 'Puppy 1 portrait' })).toHaveAttribute('src', '/puppy-1.jpg');
    expect(within(lineup).getByRole('link', { name: /Puppy breed 2/i })).toHaveAttribute('href', '/puppies/puppy-2');
    const cards = within(lineup).getAllByRole('listitem');
    expect(cards.map((card) => card.style.getPropertyValue('--hero-puppy-left'))).toEqual([
      '7%', '22%', '36%', '64%', '78%', '93%',
    ]);
  });
});
