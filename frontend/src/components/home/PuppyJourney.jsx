import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';

const milestoneMarks = ['⌕', '▧', '♡', '⌂'];

function getMilestones(steps) {
  if (steps.length === 3 && steps[2]) {
    return [
      steps[0],
      steps[1],
      { number: '03', title: 'Secure your puppy', description: 'Once confirmed, we handle everything professionally.' },
      { number: '04', title: 'Safe delivery', description: 'We ensure your puppy reaches you safely and stress-free.' },
    ];
  }
  return steps;
}

export default function PuppyJourney({ steps = [] }) {
  const milestones = getMilestones(steps);

  return (
    <section className="section journey-section page-shell home-journey-section">
      <div className="section-topline"><span>03 / FROM HELLO TO HOME</span><span>A THOUGHTFUL LITTLE JOURNEY</span></div>
      <SectionHeading eyebrow="the TeddyPups way" title="Your puppy journey" description="A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful." />
      <div className="journey-route" aria-hidden="true">
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none">
          <path d="M18 83 C130 10 220 10 310 70 S480 126 590 58 S790 8 982 76" />
          <circle cx="150" cy="45" r="6" /><circle cx="420" cy="91" r="6" />
          <circle cx="690" cy="37" r="6" /><circle cx="930" cy="63" r="6" />
        </svg>
      </div>
      <div className="journey-grid home-journey-grid">
        {milestones.map((step, index) => (
          <article className="journey-step" key={step.number || index}>
            <span className="journey-number">{step.number || String(index + 1).padStart(2, '0')}</span>
            <div className="journey-step-mark" aria-hidden="true">{milestoneMarks[index] || '♡'}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
      <div className="journey-bottom"><span>We’ll be with you at every little step.</span><Link to="/how-it-works" className="text-link">How it works <span>↗</span></Link></div>
    </section>
  );
}
