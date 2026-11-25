import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import { referenceAssets } from '../../data/referenceAssets';
import PawMark from '../shared/PawMark';

export default function WaysToMeet({ ways = [] }) {
  return (
    <section className="ways-section home-ways-section">
      <div className="page-shell section">
        <div className="section-topline"><span>02 / TWO LITTLE PATHS</span><span>FIND YOUR WAY HOME</span></div>
        <SectionHeading eyebrow="the beginning of something lovely" title="Two ways to meet your puppy" description="Whether your new best friend is already here or a little farther away, we’ll make the journey feel close." />
        <div className="ways-signpost" aria-hidden="true">
          <span className="ways-signpost-board ways-signpost-board-left">IN DUBAI <PawMark /></span>
          <span className="ways-signpost-post" />
          <span className="ways-signpost-board ways-signpost-board-right"><PawMark /> FROM ABROAD</span>
        </div>
        <div className="ways-grid">
          {ways.map((way, index) => (
            <article className={'way-card way-card-' + (index + 1)} key={way.id}>
              <div className="way-card-art">
                <img
                  src={index === 0 ? referenceAssets.dubaiPuppy : referenceAssets.featuredPuppies[1]}
                  alt={index === 0 ? 'A TeddyPups puppy in the Dubai showroom' : 'A Korean Teacup Maltipoo puppy featured by TeddyPups'}
                  loading="lazy"
                />
                <span className="way-card-art-stamp"><PawMark /></span>
              </div>
              <div className="way-card-copy">
                <p className="eyebrow">{way.eyebrow || (index === 1 ? 'A little farther away' : 'In our showroom')}</p>
                <h3>{way.title}</h3>
                <p>{way.description}</p>
                <Link className="text-link" to={way.href}>{way.action} <span>↗</span></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
