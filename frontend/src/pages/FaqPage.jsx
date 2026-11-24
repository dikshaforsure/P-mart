import { useMemo, useState } from 'react';
import { getWhatsAppUrl } from '../utils/whatsapp';
import PageIntro from '../components/shared/PageIntro';
import PawMark from '../components/shared/PawMark';
import faqRecords from '../data/faq.json';

function splitFaqRecord(record) {
  const text = typeof record?.text === 'string' ? record.text.trim() : '';
  const questionEnd = text.indexOf('?');
  if (questionEnd < 0) return { question: text, answer: '' };
  return {
    question: text.slice(0, questionEnd + 1).trim(),
    answer: text.slice(questionEnd + 1).trim(),
  };
}

function FaqNote({ item, index }) {
  const [open, setOpen] = useState(false);
  const questionId = `faq-question-${index}`;
  const answerId = `faq-answer-${index}`;

  return (
    <li className="faq-note" data-open={open ? 'true' : 'false'}>
      <span className="faq-note-pin" aria-hidden="true" />
      <h2>
        <button
          id={questionId}
          type="button"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={() => setOpen((current) => !current)}
        >
          <span>{item.question}</span>
          <span className="faq-note-chevron" aria-hidden="true">⌄</span>
        </button>
      </h2>
      <div id={answerId} className="faq-note-answer" role="region" aria-labelledby={questionId} hidden={!open}>
        <div className="faq-note-flap"><p>{item.answer}</p></div>
      </div>
    </li>
  );
}

export default function FaqPage() {
  const [search, setSearch] = useState('');
  const entries = useMemo(() => faqRecords.map(splitFaqRecord), []);
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const matches = entries.filter((item) =>
    `${item.question} ${item.answer}`.toLocaleLowerCase().includes(normalizedSearch)
  );
  const countText = normalizedSearch
    ? `${matches.length} ${matches.length === 1 ? 'note' : 'notes'} found`
    : `${matches.length} notes on the board`;

  return (
    <article className="faq-page">
      <section className="faq-hero">
        <div className="page-shell faq-hero-inner">
          <PageIntro
            eyebrow="A little help from TeddyPups"
            title="Questions & answers"
            description="Can't find what you're looking for? Message us on WhatsApp — our team is available 24/7."
          />
          <span className="faq-hero-paw" aria-hidden="true"><PawMark /></span>
        </div>
      </section>

      <div className="page-shell faq-content">
        <aside className="faq-search-panel" aria-label="Find a question">
          <label htmlFor="faq-search">sniff out a question</label>
          <div className="faq-search-input">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
            <input
              id="faq-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="delivery, Korea, vaccinated…"
              autoComplete="off"
            />
            {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear FAQ search">×</button>}
          </div>
          <p className="faq-count" aria-live="polite">{countText}</p>
          <div className="faq-search-note" aria-hidden="true">
            <span className="faq-search-bubble">?</span>
            <PawMark />
          </div>
          <a className="button button-dark faq-own-question" href={getWhatsAppUrl('Hi TeddyPups! I have a question: ' + search.trim())} target="_blank" rel="noreferrer">
            Ask your own question <span aria-hidden="true">↗</span>
          </a>
        </aside>

        <section className="faq-board" aria-label="Frequently asked questions">
          {matches.length ? (
            <ul className="faq-notes">
              {matches.map((item) => {
                const originalIndex = entries.indexOf(item);
                return <FaqNote key={originalIndex} item={item} index={originalIndex} />;
              })}
            </ul>
          ) : (
            <div className="faq-empty">
              <span aria-hidden="true">♡</span>
              <h2 role="status">No note about “{search.trim()}” yet.</h2>
              <p>Try another word, or ask the TeddyPups team directly.</p>
              <a className="button button-dark" href={getWhatsAppUrl('Hi TeddyPups! I have a question about: ' + search.trim())} target="_blank" rel="noreferrer">
                Ask us on WhatsApp <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
