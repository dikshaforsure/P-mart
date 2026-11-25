import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';

export default function FaqPreview({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-preview-section section page-shell home-faq-section">
      <div className="section-topline"><span>05 / A FEW ANSWERS</span><span>NO QUESTION TOO SMALL</span></div>
      <div className="faq-preview-layout">
        <div>
          <SectionHeading eyebrow="a little peace of mind" title="Questions, answered" description="A few things you might be wondering before you meet your new best friend." />
          <Link className="text-link" to="/faq">Read all questions <span>↗</span></Link>
        </div>
        <div className="faq-preview-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const answerId = 'home-faq-answer-' + index;
            return (
              <article className={'faq-preview-item ' + (isOpen ? 'faq-open' : '')} key={faq.question}>
                <button type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                  <span className="faq-preview-index">0{index + 1}</span>
                  <span>{faq.question}</span>
                  <span className="faq-plus" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <div className="faq-preview-answer" id={answerId} hidden={!isOpen}><p>{faq.answer}</p></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
