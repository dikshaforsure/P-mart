import { useState } from 'react';
import { getWhatsAppUrl } from '../../utils/whatsapp';

export default function PuppyNoteForm({ puppy }) {
  const [fields, setFields] = useState({ name: '', phone: '', email: '', area: '', message: '' });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const puppyName = puppy.displayName || puppy.name || puppy.breed || 'this puppy';

  const update = (event) => {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setNotice('');
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!fields.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!fields.phone.trim()) nextErrors.phone = 'Please enter your phone number.';
    else if (!/^[+()\d\s.-]{7,25}$/.test(fields.phone.trim())) nextErrors.phone = 'Please enter a valid phone number.';
    if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setNotice('Please check the highlighted fields.');
      return;
    }

    const message = [
      `Hello TeddyPups, my name is ${fields.name.trim()}.`,
      `I would like to enquire about ${puppyName} (${puppy.slug}).`,
      `Phone: ${fields.phone.trim()}`,
      fields.email.trim() ? `Email: ${fields.email.trim()}` : '',
      fields.area.trim() ? `Area: ${fields.area.trim()}` : '',
      fields.message.trim() ? `Note: ${fields.message.trim()}` : '',
    ].filter(Boolean).join('\n');

    const opened = window.open(getWhatsAppUrl(message), '_blank');
    if (opened) opened.opener = null;
    setNotice(opened
      ? 'WhatsApp opened with your note. Please send the message there to contact TeddyPups.'
      : 'Your note is ready, but the browser blocked the new tab. Use the WhatsApp enquiry link above to send it.');
  };

  return (
    <section id="puppy-note" className="puppy-note-section" aria-labelledby="puppy-note-title">
      <div>
        <p className="eyebrow">A little note</p>
        <h2 id="puppy-note-title">A note about {puppyName}</h2>
        <p>Leave your details and we’ll prepare a WhatsApp message about this puppy. Nothing is sent until you send the message in WhatsApp.</p>
      </div>
      <form className="puppy-note-form" onSubmit={submit} noValidate>
        <div className="puppy-form-row">
          <label htmlFor="puppy-enquiry-name">Your name <span aria-hidden="true">*</span>
            <input id="puppy-enquiry-name" name="name" autoComplete="name" value={fields.name} onChange={update} required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'puppy-name-error' : undefined} />
            {errors.name && <small id="puppy-name-error" className="puppy-field-error">{errors.name}</small>}
          </label>
          <label htmlFor="puppy-enquiry-phone">Phone number <span aria-hidden="true">*</span>
            <input id="puppy-enquiry-phone" name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={update} required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'puppy-phone-error' : undefined} />
            {errors.phone && <small id="puppy-phone-error" className="puppy-field-error">{errors.phone}</small>}
          </label>
        </div>
        <div className="puppy-form-row">
          <label htmlFor="puppy-enquiry-email">Email address
            <input id="puppy-enquiry-email" name="email" type="email" autoComplete="email" value={fields.email} onChange={update} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'puppy-email-error' : undefined} />
            {errors.email && <small id="puppy-email-error" className="puppy-field-error">{errors.email}</small>}
          </label>
          <label htmlFor="puppy-enquiry-area">Your area
            <input id="puppy-enquiry-area" name="area" autoComplete="address-level2" value={fields.area} onChange={update} />
          </label>
        </div>
        <label htmlFor="puppy-enquiry-message">Your note
          <textarea id="puppy-enquiry-message" name="message" rows="4" value={fields.message} onChange={update} maxLength="1200" />
        </label>
        <div className="puppy-note-submit">
          <button type="submit" className="button button-dark">Send my note in WhatsApp <span aria-hidden="true">↗</span></button>
          <span>Required fields are marked *</span>
        </div>
        {notice && <p className="puppy-form-notice" role="status" aria-live="polite">{notice}</p>}
      </form>
    </section>
  );
}
