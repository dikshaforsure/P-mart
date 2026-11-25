import { BrowserRouter } from 'react-router-dom';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
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

  it('lets visitors click Teddy to wave and cycle through playful greeting bubbles', () => {
    vi.useFakeTimers();
    const { container } = render(<BrowserRouter><HomeHero puppies={puppies} /></BrowserRouter>);
    const teddyButton = screen.getByRole('button', { name: 'Ask Teddy to wave hello' });

    expect(screen.getByText('hello!')).toBeInTheDocument();
    expect(teddyButton.querySelector('[data-p="paw-left"]')).toBeInTheDocument();
    expect(teddyButton.querySelector('[data-p="paw-right"]')).toBeInTheDocument();

    fireEvent.click(teddyButton);
    expect(screen.getByText('woof woof!')).toBeInTheDocument();
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('woof woof!');

    act(() => { vi.advanceTimersByTime(16); });
    expect(teddyButton).toHaveClass('is-waving');

    act(() => { vi.advanceTimersByTime(980); });
    expect(teddyButton).not.toHaveClass('is-waving');

    fireEvent.click(teddyButton);
    expect(screen.getByText('ruff ruff!')).toBeInTheDocument();
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent('ruff ruff!');
  });

  it('automatically dips one puppy portrait before bringing it back up', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
    const { container } = render(<BrowserRouter><HomeHero puppies={puppies} /></BrowserRouter>);
    const cards = container.querySelectorAll('.hero-puppy-peek');

    act(() => { vi.advanceTimersByTime(2300); });
    expect([...cards].filter((card) => card.classList.contains('is-dipping'))).toHaveLength(1);

    act(() => { vi.advanceTimersByTime(850); });
    expect([...cards].filter((card) => card.classList.contains('is-dipping'))).toHaveLength(0);
  });

  it('can automatically dip two puppy portraits in a cycle', () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    const { container } = render(<BrowserRouter><HomeHero puppies={puppies} /></BrowserRouter>);
    const cards = container.querySelectorAll('.hero-puppy-peek');

    act(() => { vi.advanceTimersByTime(2300); });
    expect([...cards].filter((card) => card.classList.contains('is-dipping'))).toHaveLength(2);
  });

  it('does not start the automatic portrait cycle when reduced motion is requested', () => {
    vi.useFakeTimers();
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: true }));
    const { container } = render(<BrowserRouter><HomeHero puppies={puppies} /></BrowserRouter>);
    const cards = container.querySelectorAll('.hero-puppy-peek');

    act(() => { vi.advanceTimersByTime(10000); });
    expect([...cards].some((card) => card.classList.contains('is-dipping'))).toBe(false);
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
