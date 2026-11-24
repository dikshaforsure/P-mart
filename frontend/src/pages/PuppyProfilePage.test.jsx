import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PuppyProfilePage from './PuppyProfilePage';
import { allPuppies, availablePuppies } from '../data/puppyData';

function renderProfile(slug) {
  return render(
    <MemoryRouter initialEntries={['/puppies/' + slug]}>
      <Routes>
        <Route path="/puppies/:slug" element={<PuppyProfilePage />} />
      </Routes>
    </MemoryRouter>
  );
}

function displayName(puppy) {
  return puppy.displayName || puppy.name || puppy.breed || 'TeddyPup';
}

describe('PuppyProfilePage', () => {
  it('renders an available puppy profile, gallery, facts and enquiry links', async () => {
    const puppy = availablePuppies[0];
    renderProfile(puppy.slug);

    expect(await screen.findByRole('heading', { level: 1, name: displayName(puppy) })).toBeInTheDocument();
    expect(screen.getByText('Available', { exact: true })).toBeInTheDocument();
    expect(screen.getByText(puppy.breed, { exact: true })).toBeInTheDocument();
    expect(await screen.findByText('1 / ' + (puppy.media.length || 1))).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'A note about ' + displayName(puppy) })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Browse other available puppies' })).toBeInTheDocument();

    const askLink = screen.getByRole('link', { name: new RegExp('Ask about ' + displayName(puppy)) });
    expect(askLink.getAttribute('href')).toContain('wa.me/');
    expect(new URL(askLink.href).searchParams.get('text')).toContain(puppy.slug);
    expect(screen.getByText('Imported for you')).toBeInTheDocument();
  });

  it('keeps sold puppies accessible as historical profiles without an enquiry form', async () => {
    const puppy = allPuppies.find((record) => record.status === 'sold');
    renderProfile(puppy.slug);

    expect(await screen.findByRole('heading', { level: 1, name: displayName(puppy) })).toBeInTheDocument();
    expect(screen.getByText('Gone home', { exact: true })).toBeInTheDocument();
    expect(screen.getByText(/This puppy has already found a home/)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /A note about/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Browse other available puppies' })).not.toBeInTheDocument();
  });

  it('uses the local journey copy for a record whose origin is local', async () => {
    const puppy = allPuppies.find((record) => record.origin && record.origin.slug === 'local');
    expect(puppy).toBeDefined();
    renderProfile(puppy.slug);

    expect(await screen.findByRole('heading', { level: 1, name: displayName(puppy) })).toBeInTheDocument();
    expect(screen.getByText('Meet them in Dubai')).toBeInTheDocument();
    expect(screen.getByText('Come and meet')).toBeInTheDocument();
  });

  it('shows a not-found state for an unknown slug', async () => {
    renderProfile('this-puppy-does-not-exist');

    expect(await screen.findByRole('heading', { level: 1, name: 'We couldn’t find this TeddyPup.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /See available puppies/ })).toHaveAttribute('href', '/puppies');
  });
});
