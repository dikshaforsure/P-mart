import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import { referenceAssets } from '../../data/referenceAssets';

function PuppyCard({ puppy, index }) {
  return (
    <Link to={`/puppies/${puppy.slug}`} className={`puppy-preview-card puppy-card-${index + 1}`}>
      <div className="puppy-card-media">
        {index < 6 && <img src={referenceAssets.featuredPuppies[index]} alt={`${puppy.name}, a puppy featured by TeddyPups`} loading="lazy" />}
        {puppy.hasVideo && <span className="video-chip">▶ video</span>}
      </div>
      <div className="puppy-card-meta"><div><h3>{puppy.name}</h3><p>{puppy.breed} · {puppy.sex} · {puppy.age}</p></div><span className="puppy-card-arrow">↗</span></div>
    </Link>
  );
}

export default function FeaturedPuppies({ puppies = [] }) {
  return (
    <section className="section featured-section page-shell">
      <div className="section-topline"><span>01 / THE LITTLE ONES</span><span>REAL PUPPIES · REAL PHOTOS</span></div>
      <SectionHeading eyebrow="from Teddy’s sketchbook" title="Meet the pups" description="Real puppies, real photos, looking for their families right now." />
      <div className="puppy-preview-grid">{puppies.map((puppy, index) => <PuppyCard puppy={puppy} index={index} key={puppy.id} />)}</div>
      <div className="section-bottom-action"><span>Small paws. Big personalities.</span><Link className="button button-outline" to="/puppies">See all available puppies <span>↗</span></Link></div>
    </section>
  );
}
