import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HappyFamiliesPage from './HappyFamiliesPage';
import familyMoments from '../data/families.json';
import { familyPreview } from '../data/siteContent';

describe('HappyFamiliesPage', () => {
  it('renders the source introduction, count and closing line', () => {
    render(<HappyFamiliesPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Happy families' })).toBeInTheDocument();
    expect(screen.getByText('our wall of happy endings')).toBeInTheDocument();
    expect(screen.getByText(/Nothing makes us happier than seeing our puppies in loving homes/)).toBeInTheDocument();
    expect(screen.getByText('64 moments and counting')).toBeInTheDocument();
    expect(screen.getByText('every one of them was a Teddy Pup once')).toBeInTheDocument();
  });

  it('balances the testimonial with four featured photos and keeps the remaining records in the gallery', () => {
    const { container } = render(<HappyFamiliesPage />);

    const feature = container.querySelector('.happy-families-feature');
    expect(feature).toBeInTheDocument();
    expect(feature.querySelector('.happy-families-testimonial')).toBeInTheDocument();
    expect(feature.querySelectorAll('.happy-families-feature-wall > li')).toHaveLength(4);
    expect(container.querySelectorAll('.happy-families-wall > li')).toHaveLength(60);
  });

  it('uses the existing verified testimonial and its attribution', () => {
    render(<HappyFamiliesPage />);

    expect(document.querySelector('.happy-families-testimonial blockquote')).toHaveTextContent(familyPreview.quote);
    expect(screen.getByText(familyPreview.author)).toBeInTheDocument();
    expect(familyPreview.author).toBe('Sarah M., Dubai, UAE');
  });

  it('renders all 64 gallery records in source order with the supplied captions and alt text', () => {
    render(<HappyFamiliesPage />);

    const featured = screen.getByRole('list', { name: 'Featured photos from TeddyPups families' });
    const gallery = screen.getByRole('list', { name: 'More photos from TeddyPups families' });
    const buttons = [
      ...within(featured).getAllByRole('button', { name: /Open photo/ }),
      ...within(gallery).getAllByRole('button', { name: /Open photo/ }),
    ];
    expect(familyMoments).toHaveLength(64);
    expect(within(featured).getAllByRole('button', { name: /Open photo/ })).toHaveLength(4);
    expect(within(gallery).getAllByRole('button', { name: /Open photo/ })).toHaveLength(60);
    expect(buttons).toHaveLength(64);
    expect(buttons.map((button) => button.dataset.momentId)).toEqual(familyMoments.map((item) => item.id));
    expect(within(gallery).getByText(familyMoments[45].caption)).toBeInTheDocument();
    expect(within(gallery).getByText(familyMoments[58].caption)).toBeInTheDocument();
    const images = [...within(featured).getAllByRole('img'), ...within(gallery).getAllByRole('img')].filter((item) => item.tagName === 'IMG');
    expect(images).toHaveLength(64);
    expect(images[0]).toHaveAttribute('alt', familyMoments[0].alt);
  });

  it('replaces a failed family photo with a stable placeholder and keeps the gallery intact', () => {
    render(<HappyFamiliesPage />);

    const featured = screen.getByRole('list', { name: 'Featured photos from TeddyPups families' });
    const gallery = screen.getByRole('list', { name: 'More photos from TeddyPups families' });
    fireEvent.error(featured.querySelector('img'));

    expect(featured.querySelector('.happy-families-photo-fallback')).toBeInTheDocument();
    expect(featured.querySelectorAll('li').length + gallery.querySelectorAll('li').length).toBe(64);
  });

  it('opens the source photo viewer and navigates with the keyboard', () => {
    render(<HappyFamiliesPage />);

    const firstPhoto = screen.getByRole('button', { name: 'Open photo 1 of 64' });
    firstPhoto.focus();
    fireEvent.click(firstPhoto);

    const dialog = screen.getByRole('dialog', { name: 'Happy families photos' });
    expect(dialog).toHaveAttribute('open');
    expect(screen.getByText('Happy families · photo 1 of 64')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close photo viewer' })).toHaveFocus();

    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(screen.getByText('Happy families · photo 2 of 64')).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(screen.getByText('Happy families · photo 1 of 64')).toBeInTheDocument();
  });

  it('supports touch swipe and visible previous/next buttons', () => {
    render(<HappyFamiliesPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Open photo 1 of 64' }));

    const dialog = screen.getByRole('dialog', { name: 'Happy families photos' });
    expect(screen.getByRole('button', { name: 'Previous photo' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next photo' })).toBeInTheDocument();

    fireEvent.touchStart(dialog, { touches: [{ clientX: 220 }] });
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 120 }] });
    expect(screen.getByText('Happy families · photo 2 of 64')).toBeInTheDocument();
  });

  it('closes with Escape, restores focus and unlocks background scrolling', () => {
    render(<HappyFamiliesPage />);
    const trigger = screen.getByRole('button', { name: 'Open photo 1 of 64' });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog', { name: 'Happy families photos' });
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.keyDown(dialog, { key: 'Escape' });

    expect(screen.queryByRole('dialog', { name: 'Happy families photos' })).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
    expect(document.activeElement).toBe(trigger);
  });

  it('closes when the viewer backdrop is clicked', () => {
    render(<HappyFamiliesPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Open photo 1 of 64' }));

    fireEvent.click(screen.getByRole('dialog', { name: 'Happy families photos' }));

    expect(screen.queryByRole('dialog', { name: 'Happy families photos' })).not.toBeInTheDocument();
  });
});
