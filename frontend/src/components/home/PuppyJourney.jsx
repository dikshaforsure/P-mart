import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';

export default function PuppyJourney({ steps = [] }) {
  return (
    <section className="section journey-section page-shell">
      <div className="section-topline"><span>03 / FROM HELLO TO HOME</span><span>A THOUGHTFUL LITTLE JOURNEY</span></div>
      <SectionHeading eyebrow="the TeddyPups way" title="Your puppy journey" description="A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful." />
      <div className="journey-grid">
        {steps.map((step, index) => <article className="journey-step" key={step.number}><span className="journey-number">{step.number}</span><div className="journey-step-mark">{['⌕', '▧', '♡'][index]}</div><h3>{step.title}</h3><p>{step.description}</p></article>)}
      </div>
      <div className="journey-bottom"><span>We’ll be with you at every little step.</span><Link to="/how-it-works" className="text-link">How it works <span>↗</span></Link></div>
    </section>
  );
}
