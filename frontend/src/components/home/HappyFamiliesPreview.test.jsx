import { MemoryRouter } from 'react-router-dom';
import { render, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HappyFamiliesPreview from './HappyFamiliesPreview';
import { familyPreview } from '../../data/siteContent';
import { referenceAssets } from '../../data/referenceAssets';

describe('HappyFamiliesPreview', () => {
  it('renders all four reference family photographs with their matching captions', () => {
    const { container } = render(
      <MemoryRouter>
        <HappyFamiliesPreview family={familyPreview} />
      </MemoryRouter>
    );
    const cards = container.querySelectorAll('.family-photo');
    expect(cards).toHaveLength(4);

    cards.forEach((card, index) => {
      const image = within(card).getByRole('img');
      expect(image).toHaveAttribute('src', referenceAssets.familyMoments[index]);
      expect(image).toHaveAttribute('loading', 'lazy');
      expect(card).toHaveTextContent(familyPreview.moments[index].caption);
    });
  });
});
