import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import PawMark from '../shared/PawMark';

function PuppyCard({ puppy, index }) {
  const [imageFailed, setImageFailed] = useState(false);
  const displayName = puppy.name || puppy.breed || 'TeddyPup';
  const alt = (puppy.cover && puppy.cover.alt) || (displayName + ', a ' + puppy.breed + ' puppy');
  const focalX = Number.isFinite(puppy.cover && puppy.cover.focalX) ? puppy.cover.focalX * 100 : 50;
  const focalY = Number.isFinite(puppy.cover && puppy.cover.focalY) ? puppy.cover.focalY * 100 : 50;

  return (
    <Link to={'/puppies/' + puppy.slug} className={'puppy-preview-card puppy-door-card puppy-card-' + (index + 1)} aria-label={'Meet ' + displayName + ', ' + puppy.breed + ' puppy'}>
      <div className="puppy-card-plaque">
        <h3>{displayName}</h3>
        <p>{[puppy.breed, puppy.sex, puppy.age].filter(Boolean).join(' · ')}</p>
      </div>
      <div className="puppy-card-media">
        {puppy.cover && puppy.cover.url && !imageFailed ? (
          <img src={puppy.cover.url} alt={alt} loading="lazy" style={{ objectPosition: focalX + '% ' + focalY + '%' }} onError={() => setImageFailed(true)} />
        ) : (
          <div className="puppy-card-image-fallback" aria-label="Puppy photo unavailable"><PawMark /><small>Photo unavailable</small></div>
        )}
        <span className="puppy-door-leaf" aria-hidden="true">
          <span className="puppy-door-peephole"><PawMark /></span>
          <span className="puppy-door-knob" />
        </span>
        {puppy.hasVideo && <span className="video-chip">▶ video</span>}
        <span className="puppy-door-availability">Available</span>
      </div>
      <div className="puppy-card-meta">
        <span>little paws, big personalities</span>
        <span className="puppy-card-arrow" aria-hidden="true">↗</span>
      </div>
    </Link>
  );
}

export default function FeaturedPuppies({ puppies = [] }) {
  return (
    <section className="section featured-section page-shell home-puppy-showroom">
      <div className="section-topline"><span>01 / THE LITTLE ONES</span><span>REAL PUPPIES · REAL PHOTOS</span></div>
      <SectionHeading eyebrow="from Teddy’s sketchbook" title="Meet the pups" description="Real puppies, real photos, looking for their families right now." />
      <div className="puppy-preview-grid home-puppy-doors">
        {puppies.map((puppy, index) => <PuppyCard puppy={puppy} index={index} key={puppy.id || puppy.slug} />)}
      </div>
      <div className="section-bottom-action">
        <span>Small paws. Big personalities.</span>
        <Link className="button button-outline" to="/puppies">See all available puppies <span>↗</span></Link>
      </div>
    </section>
  );
}
