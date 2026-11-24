import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';

export default function FaqPreview({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="faq-preview-section section page-shell">
      <div className="section-topline"><span>05 / A FEW ANSWERS</span><span>NO QUESTION TOO SMALL</span></div>
      <div className="faq-preview-layout"><div><SectionHeading eyebrow="a little peace of mind" title="Questions, answered" description="A few things you might be wondering before you meet your new best friend." /><Link className="text-link" to="/faq">Read all questions <span>↗</span></Link></div>
        <div className="faq-preview-list">{faqs.map((faq, index) => <article className={`faq-preview-item ${openIndex === index ? 'faq-open' : ''}`} key={faq.question}><button type="button" aria-expanded={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}><span className="faq-preview-index">0{index + 1}</span><span>{faq.question}</span><span className="faq-plus">{openIndex === index ? '−' : '+'}</span></button>{openIndex === index && <p>{faq.answer}</p>}</article>)}</div>
      </div>
    </section>
  );
}
