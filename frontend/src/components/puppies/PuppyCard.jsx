import { useState } from 'react';
import { Link } from 'react-router-dom';

const washColours = ['#f2be6b', '#bfddf5', '#f4c8bb', '#c9d9bd', '#e7d1eb', '#b9d7d2'];

function SketchInk() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className="tp-sketch__ink">
      <path className="tp-sketch__line" pathLength="1" d="M50 2.5C68 1.8 87 13 96 31c9 18 5 39-8 53-13 14-34 16-51 11C18 90 5 76 3 57 1 38 12 17 29 8 36 4 43 3 50 2.5Z" />
      <path className="tp-sketch__line tp-sketch__line--retrace" pathLength="1" d="M31 4C16 12 7 27 5 43c-2 18 4 34 17 46" />
      <g className="tp-sketch__doodle" transform="translate(3 12) rotate(-18)">
        <path d="M0 0l3 2m-4 3h5m-4 3 3-2" fill="none" stroke="#c2622b" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <g className="tp-sketch__doodle" transform="translate(93 74) rotate(14)">
        <path d="M0 0l3 2m-4 3h5m-4 3 3-2" fill="none" stroke="#c2622b" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function PawDoodle() {
  return (
    <svg viewBox="0 0 70 70" aria-hidden="true" className="tp-sketch__paw">
      <path d="M34 30c-9-2-17 6-17 15 0 7 6 11 13 9 4-1 7-1 11 0 7 2 13-2 13-9 0-9-8-17-17-15Z" fill="#d4893f" opacity=".8" />
      <ellipse cx="13" cy="25" rx="6" ry="9" transform="rotate(-28 13 25)" fill="#d4893f" />
      <ellipse cx="28" cy="12" rx="6" ry="9" transform="rotate(-8 28 12)" fill="#d4893f" />
      <ellipse cx="46" cy="12" rx="6" ry="9" transform="rotate(8 46 12)" fill="#d4893f" />
      <ellipse cx="59" cy="25" rx="6" ry="9" transform="rotate(28 59 25)" fill="#d4893f" />
    </svg>
  );
}

export default function PuppyCard({ puppy, index = 0 }) {
  const [failed, setFailed] = useState(false);
  const cover = puppy.cover;
  const name = puppy.displayName || puppy.name || puppy.breed || 'TeddyPup';
  const show = cover?.kind === 'image' && cover.url && !failed;
  const hasVideo = Array.isArray(puppy.media) && puppy.media.some((media) => media.kind === 'video');
  const tilts = [-0.7, 0.55, -0.35, 0.8, -0.5, 0.35];
  const tilt = tilts[index % tilts.length];
  const wash = washColours[index % washColours.length];
  const position = ((cover?.focalX ?? 0.5) * 100) + '% ' + ((cover?.focalY ?? 0.5) * 100) + '%';
  const gender = puppy.genderLabel || (puppy.gender === 'male' ? 'boy' : puppy.gender === 'female' ? 'girl' : puppy.gender === 'male-female' ? 'boys & girls' : 'puppy');

  return (
    <li className="tp-sketch-card">
      <Link
        to={'/puppies/' + puppy.slug}
        className="tp-sketch"
        aria-label={name + ', ' + (puppy.breed || 'puppy') + ', ' + gender + ', ' + (puppy.age || 'age to be confirmed') + ', available'}
        style={{ '--tilt': tilt + 'deg', '--d': (index * 65) + 'ms', '--wash': wash }}
      >
        <span className="tp-sketch__frame">
          <svg aria-hidden="true" viewBox="0 0 100 100" className="tp-sketch__wash">
            <path d="M96 50C97 65 83 89 59 95 38 101 13 87 5 65-3 44 5 19 26 8 48-4 76 4 89 22c6 8 8 18 7 28Z" />
          </svg>
          <span className="tp-sketch__photo">
            {show ? (
              <img
                src={cover.url}
                alt={cover.alt || name}
                width={cover.width || undefined}
                height={cover.height || undefined}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: position }}
                onError={() => setFailed(true)}
              />
            ) : (
              <span className="tp-sketch__fallback">
                <span aria-hidden="true">♡</span>
                <small>{cover?.url ? 'Photo unavailable' : 'Photo coming soon'}</small>
              </span>
            )}
          </span>
          <SketchInk />
          <span className="tp-sketch__sticker">Available</span>
          {hasVideo && <span className="tp-sketch__video">▶ video</span>}
          <PawDoodle />
        </span>
        <span className="tp-sketch__name">{name}</span>
        <span className="tp-sketch__meta">
          {(puppy.breed ? puppy.breed + ' · ' : '') + gender + ' · ' + (puppy.age || 'age to be confirmed')}
        </span>
      </Link>
    </li>
  );
}
