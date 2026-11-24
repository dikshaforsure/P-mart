import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import FaqPage from './FaqPage';
import faqRecords from '../data/faq.json';

function renderPage() {
  return render(<MemoryRouter><FaqPage /></MemoryRouter>);
}

describe('FaqPage', () => {
  it('renders every FAQ record from the existing JSON source', () => {
    renderPage();

    expect(screen.getByRole('heading', { level: 1, name: 'Questions & answers' })).toBeInTheDocument();
    expect(screen.getByText(`${faqRecords.length} notes on the board`)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(faqRecords.length);
    expect(screen.getByRole('button', { name: /Are your puppies vaccinated and health-checked/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Is there help after my puppy comes home/ })).toBeInTheDocument();
  });

  it('filters across both question and answer text and updates the result count', () => {
    renderPage();

    const search = screen.getByRole('searchbox', { name: 'sniff out a question' });
    fireEvent.change(search, { target: { value: 'cargo' } });

    expect(screen.getByText('1 note found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Do you deliver/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Can I meet a puppy/ })).not.toBeInTheDocument();
  });

  it('shows an empty state for no matches and clears the query back to all notes', () => {
    renderPage();

    const search = screen.getByRole('searchbox', { name: 'sniff out a question' });
    fireEvent.change(search, { target: { value: 'not-a-real-faq-term' } });

    expect(screen.getByText('0 notes found')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('No note about');
    fireEvent.click(screen.getByRole('button', { name: 'Clear FAQ search' }));

    expect(search).toHaveValue('');
    expect(screen.getByText(`${faqRecords.length} notes on the board`)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(faqRecords.length);
  });

  it('expands and collapses answers with correct accessible relationships', () => {
    renderPage();

    const question = screen.getByRole('button', { name: /Are your puppies vaccinated and health-checked/ });
    const answerId = question.getAttribute('aria-controls');
    const answer = document.getElementById(answerId);

    expect(question).toHaveAttribute('aria-expanded', 'false');
    expect(answer).toHaveAttribute('aria-labelledby', question.id);
    expect(answer).toHaveAttribute('hidden');

    fireEvent.click(question);
    expect(question).toHaveAttribute('aria-expanded', 'true');
    expect(answer).not.toHaveAttribute('hidden');
    expect(within(answer).getByText(/verified health certificate/)).toBeInTheDocument();

    fireEvent.click(question);
    expect(question).toHaveAttribute('aria-expanded', 'false');
    expect(answer).toHaveAttribute('hidden');
  });

  it('offers the WhatsApp follow-up when the search has no result', () => {
    renderPage();
    fireEvent.change(screen.getByRole('searchbox', { name: 'sniff out a question' }), { target: { value: 'no-matches' } });

    expect(screen.getByRole('link', { name: /Ask us on WhatsApp/ }).getAttribute('href')).toContain('wa.me/');
  });
});
