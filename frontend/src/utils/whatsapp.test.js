import { describe, expect, it } from 'vitest';
import { siteSettings } from '../data/siteContent';
import { getWhatsAppUrl } from './whatsapp';

describe('getWhatsAppUrl', () => {
  it('uses the configured WhatsApp business number and encodes a message', () => {
    const message = 'Hello TeddyPups! I would like to ask about Max & Luna.';
    const url = new URL(getWhatsAppUrl(message));

    expect(url.origin).toBe('https://wa.me');
    expect(url.pathname).toBe('/' + siteSettings.whatsappNumber);
    expect(url.searchParams.get('text')).toBe(message);
  });

  it('provides the default enquiry message when no message is supplied', () => {
    const url = new URL(getWhatsAppUrl());
    expect(url.searchParams.get('text')).toContain('TeddyPups');
    expect(url.searchParams.get('text')).toContain('puppies');
  });
});
