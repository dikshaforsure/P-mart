import { useState } from 'react';
import PageIntro from '../components/shared/PageIntro';
import { getWhatsAppUrl } from '../utils/whatsapp';

const contactPuppyOptions = [
  { value: 'any-puppy', label: 'any puppy (not sure yet)' },
  { value: 'max', label: 'Max (Maltipoo, boy)' },
  { value: 'korean-teacup-maltipoo-girl', label: 'Korean Teacup Maltipoo (girl)' },
  { value: 'korean-teacup-poodle-girl', label: 'Korean Teacup Poodle (girl)' },
  { value: 'maltipoo-cavapoo-boy', label: 'Maltipoo & Cavapoo (boy)' },
  { value: 'toy-poodle-boy-girl', label: 'Toy Poodle (boy & girl)' },
  { value: 'maltipoo-girl-one', label: 'Maltipoo (girl)' },
  { value: 'pomeranian-girl', label: 'Pomeranian (girl)' },
  { value: 'copper-cavapoo-boy', label: 'Copper (Cavapoo, boy)' },
  { value: 'shih-tzu-girl', label: 'Shih Tzu (girl)' },
  { value: 'shih-tzu-boy', label: 'Shih Tzu (boy)' },
  { value: 'maltipoo-girl-two', label: 'Maltipoo (girl)' },
  { value: 'maltipoo-girl-three', label: 'Maltipoo (girl)' },
  { value: 'korean-teacup-pomeranian-girl-one', label: 'Korean Teacup Pomeranian (girl)' },
  { value: 'korean-teacup-pomeranian-girl-two', label: 'Korean Teacup Pomeranian (girl)' },
  { value: 'korean-teacup-pomeranian-boy', label: 'Korean Teacup Pomeranian (boy)' },
];

const contactImage = {
  url: 'https://puppy.instabizweb.com/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg',
  alt: 'The apricot teddy bear puppy from our showroom, held up to say hello',
};

function validateFields(fields) {
  const errors = {};
  const name = fields.name.trim();
  const phone = fields.phone.trim().replace(/[\s()-]/g, '');

  if (name.length < 2) errors.name = 'Please enter your name (at least 2 characters).';
  if (name.length > 80) errors.name = 'Please keep your name to 80 characters or fewer.';
  if (!fields.phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!/^\+?[0-9]{7,15}$/.test(phone)) errors.phone = 'Please enter a valid phone number with country code.';
  if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (fields.area.length > 80) errors.area = 'Please keep your area to 80 characters or fewer.';
  if (fields.message.length > 2000) errors.message = 'Please keep your message to 2,000 characters or fewer.';
  return errors;
}

export default function ContactPage() {
  const [fields, setFields] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    puppyId: 'any-puppy',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [handoffUrl, setHandoffUrl] = useState('');

  const updateField = (event) => {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setNotice('');
    setHandoffUrl('');
  };

  const submit = (event) => {
    event.preventDefault();
    if (handoffUrl) return;

    const formData = new FormData(event.currentTarget);
    if (String(formData.get('website') || '').trim()) return;

    const nextErrors = validateFields(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setNotice('Please check the highlighted fields before continuing.');
      return;
    }

    const selectedPuppy = contactPuppyOptions.find((option) => option.value === fields.puppyId);
    const message = [
      'Dear TeddyPups,',
      'My name is ' + fields.name.trim() + ', and you can reach me on ' + fields.phone.trim() + '.',
      fields.email.trim() ? 'My email is ' + fields.email.trim() + '.' : '',
      fields.area.trim() ? 'I live in ' + fields.area.trim() + '.' : '',
      "I'm curious about " + (selectedPuppy?.label || 'any puppy (not sure yet)') + '.',
      fields.message.trim() ? 'A little note: ' + fields.message.trim() : '',
    ].filter(Boolean).join('\n');
    const url = getWhatsAppUrl(message);

    let opened = null;
    try {
      opened = window.open(url, '_blank');
      if (opened) opened.opener = null;
    } catch {
      opened = null;
    }

    setHandoffUrl(url);
    setNotice(opened
      ? 'WhatsApp opened with your letter. Review it and press Send in WhatsApp to contact TeddyPups.'
      : 'Your letter is prepared. Open the WhatsApp link below and press Send there to contact TeddyPups.');
  };

  return (
    <article className="contact-page">
      <div className="page-shell contact-page-shell">
        <PageIntro
          eyebrow="Write us a little note"
          title="Get in touch with us"
          description="Have questions about our puppies or adoption process? Fill out this letter and we will prepare a WhatsApp message for you to review and send."
          className="contact-page-intro"
        />

        <div className="contact-page-layout">
          <aside className="contact-page-details" aria-label="Contact and showroom information">
            <a
              className="button button-dark contact-page-whatsapp"
              href={getWhatsAppUrl('Hi TeddyPups! I would love to know more about your puppies.')}
              target="_blank"
              rel="noreferrer"
            >
              Message us on WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <div className="contact-page-detail">
              <span className="contact-page-detail__label">Email</span>
              <a href="mailto:teddypupsadmin@gmail.com">teddypupsadmin@gmail.com</a>
            </div>

            <section className="contact-page-visit" aria-labelledby="contact-visit-title">
              <div className="contact-page-visit__stripe" aria-hidden="true" />
              <div className="contact-page-visit__copy">
                <p className="contact-page-detail__label">Come say hello</p>
                <h2 id="contact-visit-title">Visit us in Downtown Dubai</h2>
                <p>Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face.</p>
                <p className="contact-page-address">Downtown Dubai, United Arab Emirates</p>
                <a
                  className="button button-outline"
                  href="https://maps.app.goo.gl/ZdJvwHBSQWWZT54s7"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="contact-page-visit__photo">
                <img
                  src={contactImage.url}
                  alt={contactImage.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>
          </aside>

          <section className="contact-page-letter-wrap" aria-labelledby="contact-letter-title">
            <form className="contact-page-letter" onSubmit={submit} noValidate>
              <span className="contact-page-stamp" aria-hidden="true">♥</span>
              <h2 id="contact-letter-title">Dear TeddyPups,</h2>

              <p className="contact-page-line">
                my name is{' '}
                <span className="contact-page-blank contact-page-blank--name">
                  <label className="sr-only" htmlFor="contact-name">Your name (required)</label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    minLength={2}
                    maxLength={80}
                    required
                    value={fields.name}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && <small className="contact-page-field-error" id="contact-name-error">{errors.name}</small>}
                </span>
                , and you can reach me on{' '}
                <span className="contact-page-blank contact-page-blank--phone">
                  <label className="sr-only" htmlFor="contact-phone">Phone or WhatsApp number with country code (required)</label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={fields.phone}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                  />
                  {errors.phone && <small className="contact-page-field-error" id="contact-phone-error">{errors.phone}</small>}
                </span>
                {' '}or by email at{' '}
                <span className="contact-page-blank contact-page-blank--email">
                  <label className="sr-only" htmlFor="contact-email">Email (optional)</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="optional"
                    value={fields.email}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && <small className="contact-page-field-error" id="contact-email-error">{errors.email}</small>}
                </span>
                .
              </p>

              <p className="contact-page-line">
                I live in{' '}
                <span className="contact-page-blank contact-page-blank--area">
                  <label className="sr-only" htmlFor="contact-area">Your area (optional)</label>
                  <input
                    id="contact-area"
                    name="area"
                    autoComplete="address-level2"
                    maxLength={80}
                    placeholder="e.g. Dubai Marina"
                    value={fields.area}
                    onChange={updateField}
                    aria-invalid={Boolean(errors.area)}
                    aria-describedby={errors.area ? "contact-area-error" : undefined}
                  />
                  {errors.area && <small className="contact-page-field-error" id="contact-area-error">{errors.area}</small>}
                </span>
                , and I'm curious about{' '}
                <span className="contact-page-blank contact-page-blank--puppy">
                  <label className="sr-only" htmlFor="contact-puppy">Puppy you're interested in (optional)</label>
                  <select id="contact-puppy" name="puppyId" value={fields.puppyId} onChange={updateField}>
                    {contactPuppyOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </span>
                .
              </p>

              <label className="sr-only" htmlFor="contact-message">Your message (optional)</label>
              <textarea
                id="contact-message"
                className="contact-page-message"
                name="message"
                rows={4}
                maxLength={2000}
                placeholder="Anything else you'd like to tell us…"
                value={fields.message}
                onChange={updateField}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
              />
              {errors.message && <small className="contact-page-field-error" id="contact-message-error">{errors.message}</small>}

              <div className="contact-page-honeypot" aria-hidden="true">
                <label htmlFor="contact-website">Website
                  <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
                </label>
              </div>

              <div className="contact-page-signoff">
                <p>with love, a future puppy parent</p>
                <button className="button button-dark" type="submit" disabled={Boolean(handoffUrl)}>
                  {handoffUrl ? 'Letter prepared' : 'Post my letter'} <span aria-hidden="true">↗</span>
                </button>
              </div>

              {notice && <p className="contact-page-notice" role="status" aria-live="polite">{notice}</p>}
              {handoffUrl && (
                <a className="contact-page-handoff" href={handoffUrl} target="_blank" rel="noreferrer">
                  Open prepared WhatsApp message <span aria-hidden="true">↗</span>
                </a>
              )}
            </form>
          </section>
        </div>
      </div>
    </article>
  );
}
