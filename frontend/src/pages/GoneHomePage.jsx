import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageIntro from '../components/shared/PageIntro';
import PawMark from '../components/shared/PawMark';
import { goneHomePuppies } from '../data/puppyData';

function puppyName(puppy) {
  return puppy.displayName || puppy.name || puppy.breed || 'TeddyPup';
}

function puppyMeta(puppy) {
  const name = puppyName(puppy);
  const breed = puppy.breed || '';
  const gender = (puppy.genderLabel || puppy.gender || '').toLowerCase();
  if (name.trim().toLowerCase() === breed.trim().toLowerCase()) return gender || breed;
  return [breed, gender].filter(Boolean).join(', ');
}

function TicketPhoto({ puppy, name }) {
  const [failed, setFailed] = useState(false);
  const image = puppy.cover && puppy.cover.url
    ? puppy.cover
    : Array.isArray(puppy.media)
      ? puppy.media.find((item) => item.kind === 'image' && item.url)
      : null;

  if (!image || failed) {
    return (
      <span className="gone-home-ticket__photo-fallback" role="img" aria-label={failed ? name + ' photo unavailable' : 'No photo supplied for ' + name}>
        <PawMark />
      </span>
    );
  }

  return (
    <img
      src={image.url}
      alt={image.alt || name + ', ' + (puppy.breed || 'puppy')}
      width={image.width || undefined}
      height={image.height || undefined}
      loading="lazy"
      decoding="async"
      style={{
        objectPosition: ((image.focalX ?? 0.5) * 100) + '% ' + ((image.focalY ?? 0.5) * 100) + '%',
      }}
      onError={() => setFailed(true)}
    />
  );
}

function TicketCard({ puppy, index }) {
  const name = puppyName(puppy);
  const meta = puppyMeta(puppy);
  const route = puppy.origin?.slug === 'local' ? 'Dubai showroom' : 'TeddyPups';
  const tilt = [-1.4, 1.1, -0.6, 1.6, -1.1, 0.8][index % 6];

  return (
    <li className="gone-home-ticket" style={{ '--ticket-tilt': tilt + 'deg' }}>
      <Link
        className="gone-home-ticket__link"
        to={'/puppies/' + puppy.slug}
        data-puppy-slug={puppy.slug}
        aria-label={'View ' + name + ', ' + (puppy.breed || 'puppy') + ' — already gone home'}
      >
        <span className="gone-home-ticket__main">
          <span className="gone-home-ticket__photo">
            <TicketPhoto puppy={puppy} name={name} />
          </span>
          <span className="gone-home-ticket__body">
            <span className="gone-home-ticket__kicker">one ticket home</span>
            <span className="gone-home-ticket__name">{name}</span>
            <span className="gone-home-ticket__meta">{meta}</span>
            <span className="gone-home-ticket__route">
              <span>{route}</span>
              <svg viewBox="0 0 60 12" aria-hidden="true">
                <path d="M2 6h46" />
                <path d="M44 2l6 4-6 4" />
              </svg>
              <span>home ♥</span>
            </span>
          </span>
        </span>
        <span className="gone-home-ticket__stub" aria-hidden="true">
          <span>admit one</span>
        </span>
      </Link>
    </li>
  );
}

export default function GoneHomePage() {
  return (
    <article className="gone-home-page">
      <div className="page-shell gone-home-shell">
        <header className="gone-home-boothhead">
          <div className="gone-home-intro-wrap">
            <PageIntro
              eyebrow="one ticket home"
              title="Gone home"
              description="Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match."
              className="gone-home-intro"
            />
            <Link className="button button-dark gone-home-cta" to="/puppies">
              See available puppies <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="gone-home-booth" aria-hidden="true">
            <div className="gone-home-booth__ticket">
              <span>ADMIT</span>
              <strong>ONE</strong>
              <small>♥</small>
            </div>
            <div className="gone-home-booth__counter"><span>tickets home</span></div>
          </div>
        </header>

        <ul className="gone-home-tickets" aria-label="Puppies who have gone home">
          {goneHomePuppies.map((puppy, index) => (
            <TicketCard key={puppy.slug} puppy={puppy} index={index} />
          ))}
        </ul>
      </div>
    </article>
  );
}
