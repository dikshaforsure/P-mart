import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PuppyGallery from '../components/puppies/PuppyGallery';
import PuppyNoteForm from '../components/puppies/PuppyNoteForm';
import { contentService } from '../services/contentService';
import { getWhatsAppUrl } from '../utils/whatsapp';

const careItems = [
  'Vaccinated',
  'Dewormed',
  'Verified health certificate from licensed vets',
  'Thoroughly checked before joining your family',
];

const localJourney = [
  { number: '01', title: 'Come and meet', description: 'Arrange a visit to meet your puppy at the Downtown Dubai showroom.' },
  { number: '02', title: 'Spend time together', description: 'Get to know your puppy in person before you make your decision.' },
  { number: '03', title: 'Pick-up or delivery', description: 'Take your puppy home or arrange delivery within Dubai.' },
  { number: '04', title: 'We stay in touch', description: 'Our team is here for settling-in, nutrition and training questions.' },
];

const importedJourney = [
  { number: '01', title: 'Reserve your puppy', description: 'Tell us which puppy has captured your heart.' },
  { number: '02', title: 'Personalized consultation', description: 'We finalize details with you and share updates on your puppy’s journey.' },
  { number: '03', title: 'Import and arrival', description: 'We manage health checks, travel arrangements, and documentation.' },
  { number: '04', title: 'Welcome home', description: 'We help your new puppy settle in and ensure a smooth transition into your home.' },
];

function ChapterHeading({ number, children }) {
  return (
    <p className="tp-profile-chapter">
      <span className="tp-profile-chapter-number" aria-hidden="true">{number}</span>
      <span>{children}</span>
    </p>
  );
}

function displayName(puppy) {
  return puppy.displayName || puppy.name || puppy.breed || 'TeddyPup';
}

function AdjacentPuppyCard({ puppy, direction }) {
  if (!puppy) return <span className="tp-profile-adjacent-empty" aria-hidden="true" />;

  const label = direction === 'previous' ? 'Previous pup' : 'Next pup';
  const name = displayName(puppy);
  const image = puppy.cover?.url;

  return (
    <Link
      className={'tp-profile-adjacent-card tp-profile-adjacent-card--' + direction}
      to={'/puppies/' + puppy.slug}
    >
      <span className="tp-profile-adjacent-image">
        {image
          ? <img src={image} alt={puppy.cover?.alt || name + ', ' + (puppy.breed || 'puppy')} loading="lazy" />
          : <span aria-hidden="true">♡</span>}
      </span>
      <span className="tp-profile-adjacent-copy">
        <span className="tp-profile-adjacent-label">{label}</span>
        <strong>{name}</strong>
      </span>
      <span className="tp-profile-adjacent-arrow" aria-hidden="true">{direction === 'previous' ? '↙' : '↗'}</span>
    </Link>
  );
}

function PawStamp() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
    </svg>
  );
}

export default function PuppyProfilePage() {
  const { slug } = useParams();
  const [puppy, setPuppy] = useState(undefined);
  const [adjacent, setAdjacent] = useState({ previous: null, next: null });

  useEffect(() => {
    let active = true;
    setPuppy(undefined);
    Promise.all([
      contentService.getPuppyBySlug(slug),
      contentService.getAdjacentAvailablePuppies(slug),
    ]).then(([record, neighbours]) => {
      if (active) {
        setPuppy(record);
        setAdjacent(neighbours);
      }
    }).catch(() => {
      if (active) setPuppy(null);
    });
    return () => { active = false; };
  }, [slug]);

  if (puppy === undefined) {
    return <div className="puppy-profile-state page-shell" role="status" aria-live="polite">Opening this little story…</div>;
  }

  if (!puppy) {
    return (
      <section className="puppy-profile-not-found page-shell">
        <p className="eyebrow">A little detour</p>
        <h1>We couldn’t find this TeddyPup.</h1>
        <p>The puppy link may have changed, or the record may not be in this catalogue snapshot.</p>
        <Link className="button button-dark" to="/puppies">See available puppies <span aria-hidden="true">↗</span></Link>
      </section>
    );
  }

  const name = displayName(puppy);
  const isAvailable = puppy.status === 'available';
  const isImported = puppy.origin?.slug === 'imported';
  const gender = puppy.genderLabel || puppy.gender || 'Not specified';
  const location = puppy.origin?.name || (isAvailable ? 'Location to be confirmed' : 'Previously homed');
  const journey = isImported ? importedJourney : localJourney;
  const whatsappMessage = 'Hi TeddyPups! I\'d love to know more about ' + name + ' (' + puppy.slug + ') — ' + (puppy.breed || 'puppy') + ', ' + gender + ', ' + (puppy.age || 'age to be confirmed') + '. Please share current photos, videos and details.';

  return (
    <article className="puppy-profile-page tp-profile-storybook">
      <div className="tp-profile-ribbon" aria-hidden="true"><span /></div>
      <div className="puppy-profile-shell page-shell tp-profile-shell">
        <nav className="puppy-breadcrumbs tp-profile-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/puppies">Available puppies</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{name}</span>
        </nav>

        <ChapterHeading number="1">{isAvailable ? 'hello, it’s me' : 'the day they went home'}</ChapterHeading>

        <div className="puppy-profile-main tp-profile-main">
          <PuppyGallery puppy={puppy} />
          <div className="puppy-profile-copy tp-profile-copy">
            <div className="tp-profile-info-board">
              <p className="tp-profile-handwritten">{isAvailable ? 'A little friend, a big new chapter' : 'A happy ending, kept in our sketchbook'}</p>
              <p className={'puppy-profile-status tp-profile-status ' + (isAvailable ? 'is-available' : 'is-homed')}>
                <span className="tp-profile-status-mark" aria-hidden="true">{isAvailable ? '✳' : '♡'}</span>
                {isAvailable ? 'Available' : 'Gone home'}
              </p>
              <h1>{name}</h1>
              <p className="puppy-profile-breed tp-profile-breed">{puppy.breed || 'A little TeddyPup'}</p>

              <dl className="puppy-profile-facts tp-profile-facts">
                <div><dt>Breed</dt><dd>{puppy.breed || 'To be confirmed'}</dd></div>
                <div><dt>Boy or girl</dt><dd>{gender}</dd></div>
                <div><dt>Age</dt><dd>{puppy.age || 'To be confirmed'}</dd></div>
                <div><dt>Where</dt><dd>{location}</dd></div>
              </dl>

              {puppy.description && <p className="puppy-profile-description">{puppy.description}</p>}
              {puppy.colour && <p className="puppy-profile-colour">Colour · {puppy.colour}</p>}

              {isAvailable ? (
                <div className="puppy-profile-actions tp-profile-actions">
                  <a className="button button-dark" href={getWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer">
                    Ask about {name} on WhatsApp <span aria-hidden="true">↗</span>
                  </a>
                  <a className="button button-outline" href="#puppy-note">
                    Send an enquiry <span aria-hidden="true">↓</span>
                  </a>
                </div>
              ) : (
                <p className="puppy-homed-note tp-profile-homed-note">This puppy has already found a home. Have a look at the little ones currently available.</p>
              )}
              {isAvailable && <p className="puppy-or-send-note tp-profile-or-send">Or send us a note below ♡</p>}
            </div>

            <div className="tp-profile-paper">
              <ChapterHeading number="2">what comes with {name}</ChapterHeading>
              <div className="tp-profile-paper-content">
                <div>
                  <h2>Every Teddy Pup comes</h2>
                  <p>Every TeddyPups puppy is described as vaccinated, dewormed and checked before going home. Ask the team for this puppy’s individual health records.</p>
                </div>
                <ul>
                  {careItems.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
                </ul>
              </div>
              <span className="tp-profile-paper-note" aria-hidden="true">a little promise from us ♡</span>
            </div>
          </div>
        </div>
      </div>

      <section className="puppy-journey-section page-shell tp-profile-journey">
        <ChapterHeading number="3">the way home</ChapterHeading>
        <div className="puppy-journey-heading tp-profile-journey-heading">
          <p className="tp-profile-journey-eyebrow">{isImported ? 'Imported for you' : 'Meet them in Dubai'}</p>
          <h2>{isImported ? 'Coming home from abroad' : name + '’s way home'}</h2>
          <p>{isImported
            ? 'From your first message to arrival in Dubai, TeddyPups coordinates the import journey and keeps you informed.'
            : 'From your first visit to the first day at home, we’ll help you through each step.'}</p>
        </div>
        <ol className="puppy-journey-steps tp-profile-trail">
          {journey.map((step) => (
            <li className="puppy-journey-step" key={step.number}>
              <span className="tp-profile-trail-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {isAvailable && (
        <div className="page-shell tp-profile-letter-wrap">
          <PuppyNoteForm
            puppy={puppy}
            stamp={<span className="tp-profile-letter-stamp" aria-hidden="true"><PawStamp /></span>}
          />
        </div>
      )}

      {isAvailable && (
        <nav className="puppy-adjacent-nav page-shell tp-profile-neighbours" aria-label="Browse other available puppies">
          <AdjacentPuppyCard puppy={adjacent.previous} direction="previous" />
          <Link className="button button-outline tp-profile-all-puppies" to="/puppies">See every puppy <span aria-hidden="true">↗</span></Link>
          <AdjacentPuppyCard puppy={adjacent.next} direction="next" />
        </nav>
      )}
    </article>
  );
}
