import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PuppyNoteForm from './PuppyNoteForm';

const puppy = {
  slug: 'luna-maltipoo-girl',
  displayName: 'Luna',
  breed: 'Maltipoo',
};

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Aarav' } });
  fireEvent.change(screen.getByLabelText(/Phone number/), { target: { value: '+91 98765 43210' } });
}

describe('PuppyNoteForm', () => {
  it('labels the form as a puppy-specific enquiry', () => {
    render(<PuppyNoteForm puppy={puppy} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Ask about Luna' })).toBeInTheDocument();
    expect(screen.getByText(/Nothing is sent until you send the message in WhatsApp/)).toBeInTheDocument();
  });

  it('validates required name and phone fields without opening WhatsApp', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    render(<PuppyNoteForm puppy={puppy} />);
    fireEvent.click(screen.getByRole('button', { name: /Send my note in WhatsApp/i }));

    expect(screen.getByText('Please enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter your phone number.')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Your name/ })).toHaveAttribute('aria-invalid', 'true');
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('validates malformed phone numbers and optional email addresses', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    render(<PuppyNoteForm puppy={puppy} />);
    fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Aarav' } });
    fireEvent.change(screen.getByLabelText(/Phone number/), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/Email address/), { target: { value: 'not-an-email' } });
    fireEvent.click(screen.getByRole('button', { name: /Send my note in WhatsApp/i }));

    expect(screen.getByText('Please enter a valid phone number.')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('opens a prefilled puppy-specific WhatsApp message after valid input', () => {
    const popup = { opener: window };
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(popup);
    render(<PuppyNoteForm puppy={puppy} />);
    fillRequiredFields();
    fireEvent.change(screen.getByLabelText(/Email address/), { target: { value: 'aarav@example.com' } });
    fireEvent.change(screen.getByLabelText(/Your area/), { target: { value: 'Patna' } });
    fireEvent.change(screen.getByLabelText(/Your note/), { target: { value: 'Please share a current video.' } });
    fireEvent.click(screen.getByRole('button', { name: /Send my note in WhatsApp/i }));

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith(expect.stringContaining('wa.me/'), '_blank');
    const openedUrl = new URL(openSpy.mock.calls[0][0]);
    const message = openedUrl.searchParams.get('text');
    expect(message).toContain('Hello TeddyPups, my name is Aarav.');
    expect(message).toContain('Luna (luna-maltipoo-girl)');
    expect(message).toContain('Phone: +91 98765 43210');
    expect(message).toContain('Email: aarav@example.com');
    expect(message).toContain('Area: Patna');
    expect(message).toContain('Note: Please share a current video.');
    expect(popup.opener).toBeNull();
    expect(screen.getByRole('status')).toHaveTextContent('Please send the message there to contact TeddyPups.');
  });

  it('explains when the browser blocks the WhatsApp tab', () => {
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    render(<PuppyNoteForm puppy={puppy} />);
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: /Send my note in WhatsApp/i }));

    expect(screen.getByRole('status')).toHaveTextContent('the browser blocked the new tab');
    expect(openSpy).toHaveBeenCalledTimes(1);
  });

  it('uses sold-profile wording and prepares a truthful similar-puppy enquiry', () => {
    const soldPuppy = { ...puppy, status: 'sold' };
    const openSpy = vi.spyOn(window, 'open').mockReturnValue({ opener: window });
    render(<PuppyNoteForm puppy={soldPuppy} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Looking for a puppy like this?' })).toBeInTheDocument();
    expect(screen.getByText(/This puppy has already found a home/)).toHaveTextContent(/similar puppies that may currently be available/);

    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: /Send my note in WhatsApp/i }));

    const message = new URL(openSpy.mock.calls[0][0]).searchParams.get('text');
    expect(message).toContain("I saw Luna's story (luna-maltipoo-girl)");
    expect(message).toContain('this puppy has already found a home');
    expect(message).toContain('similar puppies that may currently be available');
    expect(message).not.toContain('I would like to enquire about Luna (luna-maltipoo-girl).');
    expect(screen.getByRole('status')).toHaveTextContent('Please send the message there to contact TeddyPups.');
  });

});
