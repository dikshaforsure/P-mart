import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ContactPage from './ContactPage';
import { getWhatsAppUrl } from '../utils/whatsapp';

describe('ContactPage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the reference contact heading, showroom links and ordered form fields', () => {
    render(<ContactPage />);

    expect(screen.getByRole('heading', { level: 1, name: 'Get in touch with us' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Visit us in Downtown Dubai' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'teddypupsadmin@gmail.com' })).toHaveAttribute('href', 'mailto:teddypupsadmin@gmail.com');
    expect(screen.getByRole('link', { name: /Open in Google Maps/ })).toHaveAttribute('href', 'https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7');

    const fields = [
      screen.getByRole('textbox', { name: 'Your name (required)' }),
      screen.getByRole('textbox', { name: 'Phone or WhatsApp number with country code (required)' }),
      screen.getByRole('textbox', { name: 'Email (optional)' }),
      screen.getByRole('textbox', { name: 'Your area (optional)' }),
      screen.getByRole('combobox', { name: "Puppy you're interested in (optional)" }),
      screen.getByRole('textbox', { name: 'Your message (optional)' }),
    ];
    expect(fields.map((field) => field.getAttribute('name'))).toEqual([
      'name', 'phone', 'email', 'area', 'puppyId', 'message',
    ]);
    expect(fields[0]).toBeRequired();
    expect(fields[1]).toBeRequired();
    expect(fields[2]).not.toBeRequired();
    expect(fields[4]).not.toBeRequired();
    expect(fields[5]).not.toBeRequired();
    expect(screen.getByRole('button', { name: /Post my letter/ })).toBeInTheDocument();
    expect(screen.getByText(/prepare a WhatsApp message for you to review and send/)).toBeInTheDocument();
  });

  it('validates required name and phone and validates email only when supplied', () => {
    render(<ContactPage />);
    fireEvent.click(screen.getByRole('button', { name: /Post my letter/ }));

    expect(screen.getByText('Please enter your name (at least 2 characters).')).toBeInTheDocument();
    expect(screen.getByText('Please enter your phone number.')).toBeInTheDocument();

    fireEvent.change(screen.getByRole('textbox', { name: 'Your name (required)' }), { target: { value: 'A' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Phone or WhatsApp number with country code (required)' }), { target: { value: 'abc' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email (optional)' }), { target: { value: 'not-an-email' } });
    fireEvent.click(screen.getByRole('button', { name: /Post my letter/ }));

    expect(screen.getByText('Please enter your name (at least 2 characters).')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid phone number with country code.')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('prepares the complete WhatsApp letter but does not claim that it was sent', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue({ opener: null });
    render(<ContactPage />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Your name (required)' }), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Phone or WhatsApp number with country code (required)' }), { target: { value: '+971 50 123 4567' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email (optional)' }), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Your area (optional)' }), { target: { value: 'Dubai Marina' } });
    fireEvent.change(screen.getByRole('combobox', { name: "Puppy you're interested in (optional)" }), { target: { value: 'max' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Your message (optional)' }), { target: { value: 'Please share more details.' } });
    fireEvent.click(screen.getByRole('button', { name: /Post my letter/ }));

    expect(openSpy).toHaveBeenCalledOnce();
    const url = openSpy.mock.calls[0][0];
    const message = new URL(url).searchParams.get('text');
    expect(url).toBe(getWhatsAppUrl(message));
    expect(message).toContain('Dear TeddyPups');
    expect(message).toContain('Jane Doe');
    expect(message).toContain('+971 50 123 4567');
    expect(message).toContain('jane@example.com');
    expect(message).toContain('Dubai Marina');
    expect(message).toContain('Max (Maltipoo, boy)');
    expect(message).toContain('Please share more details.');
    expect(screen.getByRole('status')).toHaveTextContent('press Send in WhatsApp');
    expect(screen.getByRole('link', { name: /Open prepared WhatsApp message/ })).toHaveAttribute('href', url);
    expect(screen.getByRole('button', { name: /Letter prepared/ })).toBeDisabled();
  });

  it('silently ignores a filled website honeypot', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue({ opener: null });
    render(<ContactPage />);

    fireEvent.change(screen.getByRole('textbox', { name: 'Your name (required)' }), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByRole('textbox', { name: 'Phone or WhatsApp number with country code (required)' }), { target: { value: '+971501234567' } });
    fireEvent.change(document.querySelector('[name="website"]'), { target: { value: 'spam.example' } });
    fireEvent.click(screen.getByRole('button', { name: /Post my letter/ }));

    expect(openSpy).not.toHaveBeenCalled();
    expect(screen.queryByRole('link', { name: /Open prepared WhatsApp message/ })).not.toBeInTheDocument();
  });

  it('uses the existing WhatsApp helper and does not display an uncertain telephone number', () => {
    render(<ContactPage />);

    const link = screen.getByRole('link', { name: /Message us on WhatsApp/ });
    expect(link).toHaveAttribute('href', getWhatsAppUrl('Hi TeddyPups! I would love to know more about your puppies.'));
    expect(screen.queryByText('+971 54 167 6733')).not.toBeInTheDocument();
    expect(screen.queryByText('+971 50 000 0000')).not.toBeInTheDocument();
  });
});
