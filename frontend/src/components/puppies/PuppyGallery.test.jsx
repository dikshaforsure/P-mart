import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PuppyGallery from './PuppyGallery';

const image = (id, url, alt) => ({
  id,
  url,
  kind: 'image',
  alt,
  width: 600,
  height: 800,
  focalX: 0.3,
  focalY: 0.6,
});

function makePuppy(overrides = {}) {
  return {
    slug: 'luna-maltipoo-girl',
    name: 'Luna',
    displayName: 'Luna',
    breed: 'Maltipoo',
    media: [
      image('one', '/luna-one.jpg', 'Luna photo one'),
      image('two', '/luna-two.jpg', 'Luna photo two'),
      image('three', '/luna-three.jpg', 'Luna photo three'),
    ],
    ...overrides,
  };
}

describe('PuppyGallery', () => {
  it('shows an accessible empty state when the puppy has no media or cover', () => {
    render(<PuppyGallery puppy={makePuppy({ media: [], cover: null })} />);
    expect(screen.getByRole('status')).toHaveTextContent('Photos and videos for this puppy are not available right now.');
  });

  it('uses the cover as a fallback when the media array is empty', () => {
    render(<PuppyGallery puppy={makePuppy({ media: [], cover: image('cover', '/cover.jpg', 'Luna cover') })} />);
    expect(screen.getByRole('img', { name: 'Luna cover' })).toHaveAttribute('src', '/cover.jpg');
    expect(screen.getByText('1 / 1')).toBeInTheDocument();
  });

  it('changes media with next, previous and thumbnail controls and wraps at both ends', () => {
    render(<PuppyGallery puppy={makePuppy()} />);
    expect(screen.getByRole('img', { name: 'Luna photo one' })).toHaveAttribute('src', '/luna-one.jpg');
    expect(screen.getByText('1 / 3')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next photo or video' }));
    expect(screen.getByRole('img', { name: 'Luna photo two' })).toHaveAttribute('src', '/luna-two.jpg');
    expect(screen.getByText('2 / 3')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Previous photo or video' }));
    expect(screen.getByRole('img', { name: 'Luna photo one' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next photo or video' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next photo or video' }));
    expect(screen.getByRole('img', { name: 'Luna photo three' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Next photo or video' }));
    expect(screen.getByRole('img', { name: 'Luna photo one' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Previous photo or video' }));
    expect(screen.getByRole('img', { name: 'Luna photo three' })).toBeInTheDocument();
  });

  it('updates the active item when a thumbnail is selected', () => {
    render(<PuppyGallery puppy={makePuppy()} />);
    const thirdThumbnail = screen.getByRole('button', { name: 'Show photo 3 of 3' });
    fireEvent.click(thirdThumbnail);

    expect(thirdThumbnail).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('img', { name: 'Luna photo three' })).toBeInTheDocument();
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
  });

  it('opens the full-screen viewer and supports keyboard navigation', () => {
    render(<PuppyGallery puppy={makePuppy()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Luna, photo 1 of 3, full screen' }));

    const dialog = screen.getByRole('dialog', { name: 'Luna photos and videos' });
    expect(dialog).toHaveAttribute('open');
    expect(within(dialog).getByRole('img', { name: 'Luna photo one' })).toHaveAttribute('src', '/luna-one.jpg');

    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(within(dialog).getByRole('img', { name: 'Luna photo two' })).toHaveAttribute('src', '/luna-two.jpg');

    fireEvent.click(within(dialog).getByRole('button', { name: 'Close full-screen gallery' }));
    expect(screen.queryByRole('dialog', { name: 'Luna photos and videos' })).not.toBeInTheDocument();
  });

  it('renders video controls, poster and duration in the gallery', () => {
    const puppy = makePuppy({
      media: [
        image('still', '/still.jpg', 'Luna still'),
        {
          id: 'video',
          url: '/luna.mp4',
          kind: 'video',
          alt: 'Luna playing',
          durationS: 67,
          poster: { url: '/luna-poster.jpg', alt: 'Luna video poster' },
        },
      ],
    });
    const { container } = render(<PuppyGallery puppy={puppy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next photo or video' }));

    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('playsinline');
    expect(video).toHaveAttribute('preload', 'metadata');
    expect(video).toHaveAttribute('poster', '/luna-poster.jpg');
    expect(video.querySelector('source')).toHaveAttribute('src', '/luna.mp4');
    expect(video).toHaveAttribute('aria-label', 'Luna playing');
    expect(screen.getByRole('button', { name: /Show video 2 of 2, duration 1:07/ })).toBeInTheDocument();
  });

  it('shows a fallback when the active image or video fails', () => {
    const { container, rerender } = render(<PuppyGallery puppy={makePuppy()} />);
    fireEvent.error(screen.getByRole('img', { name: 'Luna photo one' }));
    expect(screen.getByText('This photo is unavailable right now.')).toBeInTheDocument();

    const videoPuppy = makePuppy({
      media: [{ id: 'video', url: '/broken.mp4', kind: 'video', alt: 'Luna video' }],
    });
    rerender(<PuppyGallery puppy={videoPuppy} />);
    fireEvent.error(container.querySelector('video'));
    expect(screen.getByText('This video is unavailable right now.')).toBeInTheDocument();
  });

  it('shows a fallback for media records with a missing URL', () => {
    render(<PuppyGallery puppy={makePuppy({ media: [{ id: 'missing-url', kind: 'image' }] })} />);
    expect(screen.getByText('This photo is unavailable right now.')).toBeInTheDocument();
  });
});
