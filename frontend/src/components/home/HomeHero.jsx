import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import PuppyMascot from '../puppies/PuppyMascot';
import PawMark from '../shared/PawMark';

const puppyTilts = ['-5deg', '3deg', '-2deg', '2deg', '-3deg', '4deg'];
const puppyPositions = [7, 22, 36, 64, 78, 93];

export default function HomeHero({ puppies = [] }) {
  const mascotRef = useRef(null);
  const [dippingPuppies, setDippingPuppies] = useState([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (prefersReducedMotion || puppies.length < 2) return undefined;

    let animationTimer;
    let dipTimer;
    let previousSelection = [];

    const runPuppyCycle = () => {
      let candidates = puppies.map((_, index) => index).filter((index) => !previousSelection.includes(index));
      const count = Math.random() < 0.68 ? 1 : 2;
      if (candidates.length < count) candidates = puppies.map((_, index) => index);

      const selected = [];
      for (let index = 0; index < count; index += 1) {
        const randomIndex = Math.floor(Math.random() * candidates.length);
        selected.push(candidates.splice(randomIndex, 1)[0]);
      }

      previousSelection = selected;
      setDippingPuppies(selected);
      dipTimer = window.setTimeout(() => setDippingPuppies([]), 850);
      animationTimer = window.setTimeout(runPuppyCycle, 2900 + Math.random() * 1800);
    };

    animationTimer = window.setTimeout(runPuppyCycle, 2300);
    return () => {
      window.clearTimeout(animationTimer);
      window.clearTimeout(dipTimer);
    };
  }, [puppies.length]);

  return (
    <section className="home-hero home-hero-storybook" aria-labelledby="hero-title">
      <span className="hero-sunwash" aria-hidden="true" />
      <div className="hero-copy hero-story-copy">
        <p className="eyebrow hero-eyebrow">
          every puppy is family
          <svg className="hero-hand-underline" viewBox="0 0 220 24" preserveAspectRatio="none" aria-hidden="true">
            <path d="M4 14c18-10 30 8 48-1s28-9 46 0 30 8 48-1 30-9 48 0 18 2 22 0" />
          </svg>
        </p>
        <h1 id="hero-title">Premium teacup <em>puppies in Dubai</em></h1>
        <p className="hero-description">Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.</p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/puppies">View available puppies <span>↗</span></Link>
          <a className="button button-outline" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Enquire on WhatsApp <span>↗</span></a>
        </div>
        <p className="hero-hand-note"><span aria-hidden="true">✳</span> Real puppies. Real photos. Real love.</p>
      </div>
      <div className="hero-stage">
        <ul className="hero-puppy-lineup" aria-label="Some of the puppies looking for their families">
          {puppies.slice(0, 6).map((puppy, index) => {
            const displayName = puppy.name || puppy.breed || 'TeddyPup';
            const focalX = Number.isFinite(puppy.cover && puppy.cover.focalX) ? puppy.cover.focalX * 100 : 50;
            const focalY = Number.isFinite(puppy.cover && puppy.cover.focalY) ? puppy.cover.focalY * 100 : 50;
            return (
              <li
                className={`hero-puppy-peek${dippingPuppies.includes(index) ? ' is-dipping' : ''}`}
                key={puppy.id || puppy.slug}
                style={{
                  '--hero-puppy-left': puppyPositions[index] + '%',
                  '--hero-puppy-tilt': puppyTilts[index] || '0deg',
                  '--hero-puppy-delay': (index * 90) + 'ms',
                }}
              >
                <Link to={'/puppies/' + puppy.slug} aria-label={'Meet ' + displayName + ', ' + puppy.breed + ' puppy'}>
                  <span className="hero-puppy-photo">
                    {puppy.cover && puppy.cover.url ? (
                      <img
                        src={puppy.cover.url}
                        alt={puppy.cover.alt || (displayName + ', a ' + puppy.breed + ' puppy')}
                        loading={index < 3 ? 'eager' : 'lazy'}
                        style={{ objectPosition: focalX + '% ' + focalY + '%' }}
                      />
                    ) : (
                      <span className="hero-puppy-fallback" aria-label="Puppy photograph unavailable"><PawMark /></span>
                    )}
                  </span>
                  <span className="hero-puppy-name">{displayName}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="hero-mascot-anchor" ref={mascotRef}>
          <PuppyMascot
            boardRef={mascotRef}
            label="Teddy, the TeddyPups puppy, peeking over the hero blanket"
            showRing={false}
            bubbleText="hello!"
          />
        </div>
        <div className="hero-quilt" aria-hidden="true">
          <div className="hero-quilt-paws"><PawMark /><PawMark /><PawMark /><PawMark /><PawMark /></div>
          <svg className="hero-quilt-edge" viewBox="0 0 760 40" preserveAspectRatio="none">
            <defs>
              <pattern id="home-quilt-scallop" width="76" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40V27A38 25 0 0 1 76 27V40Z" fill="#fff1d8" />
                <path d="M0 27A38 25 0 0 1 76 27" fill="none" stroke="#2a170e" strokeWidth="3" />
                <path d="M11 33A27 19 0 0 1 65 33" fill="none" stroke="#2a170e" strokeWidth="1.6" strokeDasharray="3.5 5.5" strokeLinecap="round" opacity=".42" />
              </pattern>
            </defs>
            <rect width="760" height="40" fill="url(#home-quilt-scallop)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
