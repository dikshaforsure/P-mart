import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import { referenceAssets } from '../../data/referenceAssets';

export default function HappyFamiliesPreview({ family }) {
  if (!family) return null;
  return (
    <section className="family-section section">
      <div className="page-shell">
        <div className="section-topline"><span>04 / THE BEST PART</span><span>LOVE, DELIVERED</span></div>
        <SectionHeading eyebrow="little moments, big love" title={family.heading} description={family.description} />
        <div className="family-layout">
          <blockquote className="family-quote"><span className="quote-mark">“</span><p>{family.quote}</p><cite>{family.author}</cite></blockquote>
          <div className="family-photo-wall">{family.moments.slice(0, 4).map((moment, index) => <div className={`family-photo family-photo-${index + 1}`} key={moment.id}><img src={referenceAssets.familyMoments[index]} alt="A TeddyPups family welcoming a puppy" loading="lazy" /><span>{moment.caption}</span></div>)}</div>
        </div>
        <div className="family-link-row"><span>Every little homecoming means the world to us.</span><Link to="/happy-families" className="button button-outline">See every happy family <span>↗</span></Link></div>
      </div>
    </section>
  );
}
