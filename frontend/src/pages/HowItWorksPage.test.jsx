import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import HowItWorksPage from './HowItWorksPage';

function renderPage() {
  return render(<MemoryRouter><HowItWorksPage /></MemoryRouter>);
}

describe('HowItWorksPage', () => {
  it('renders the full page introduction and the four main sections', () => {
    renderPage();

    expect(screen.getByRole('heading', { level: 1, name: 'How it works' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Two ways home' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Our premium puppy promise' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Delivery & collection' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Why choose us' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Delivery & collection/ })).toHaveAttribute('href', '#delivery');
  });

  it('shows the local journey by default and switches to the imported journey', () => {
    renderPage();

    const localTab = screen.getByRole('tab', { name: /In Dubai/ });
    const importedTab = screen.getByRole('tab', { name: /Imported/ });
    const localPanel = document.getElementById('panel-local');
    const importedPanel = document.getElementById('panel-imported');

    expect(localTab).toHaveAttribute('aria-selected', 'true');
    expect(importedTab).toHaveAttribute('aria-selected', 'false');
    expect(localPanel).not.toHaveAttribute('hidden');
    expect(importedPanel).toHaveAttribute('hidden');
    expect(screen.getByRole('heading', { name: 'Meet your puppy in person' })).toBeInTheDocument();
    expect(localPanel.querySelectorAll('.how-step')).toHaveLength(4);

    fireEvent.click(importedTab);

    expect(importedTab).toHaveAttribute('aria-selected', 'true');
    expect(localTab).toHaveAttribute('aria-selected', 'false');
    expect(localPanel).toHaveAttribute('hidden');
    expect(importedPanel).not.toHaveAttribute('hidden');
    expect(screen.getByRole('heading', { name: 'Order upon request' })).toBeInTheDocument();
    expect(importedPanel.querySelectorAll('.how-step')).toHaveLength(4);
  });

  it('supports arrow-key tab navigation and moves focus to the selected tab', () => {
    renderPage();

    const localTab = screen.getByRole('tab', { name: /In Dubai/ });
    const importedTab = screen.getByRole('tab', { name: /Imported/ });
    localTab.focus();
    fireEvent.keyDown(localTab, { key: 'ArrowRight' });

    expect(importedTab).toHaveAttribute('aria-selected', 'true');
    expect(importedTab).toHaveFocus();
    fireEvent.keyDown(importedTab, { key: 'Home' });
    expect(localTab).toHaveAttribute('aria-selected', 'true');
    expect(localTab).toHaveFocus();
  });

  it('keeps its calls to action on existing routes and uses the WhatsApp helper', () => {
    renderPage();

    expect(screen.getByRole('link', { name: /Meet the puppies/ })).toHaveAttribute('href', '/puppies');
    expect(screen.getByRole('link', { name: /Read the FAQs/ })).toHaveAttribute('href', '/faq');
    expect(screen.getByRole('link', { name: /Ask us on WhatsApp/ }).getAttribute('href')).toContain('wa.me/');
  });
});
