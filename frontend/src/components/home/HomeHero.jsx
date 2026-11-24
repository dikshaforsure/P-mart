import { Link } from 'react-router-dom';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import { referenceAssets } from '../../data/referenceAssets';

export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot"></span> every puppy is family</p>
        <h1>Premium teacup<br /><em>puppies</em> in Dubai</h1>
        <p className="hero-description">Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.</p>
        <div className="hero-actions">
          <Link className="button button-dark" to="/puppies">View available puppies <span>↗</span></Link>
          <a className="button button-outline" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Enquire on WhatsApp <span>↗</span></a>
        </div>
        <div className="hero-note"><span className="hero-note-star">✳</span><span>Real puppies.<br />Real photos. Real love.</span></div>
      </div>
      <div className="hero-visual" aria-label="TeddyPups hero puppy photograph">
        <img className="hero-photo" src={referenceAssets.homeHero} alt="A tiny fluffy puppy photographed for TeddyPups" loading="eager" />
        <div className="hero-sticker"><span>made for</span><strong>your<br />heart</strong><span>♡</span></div>
        <div className="hero-vertical-note">A NEW LITTLE LOVE STORY · DUBAI · U.A.E.</div>
      </div>
      <div className="hero-bottom-line"><span>THE TEDDYPUPS WAY</span><span>SHOWROOM · IMPORTED · ALWAYS FAMILY</span><span>SCROLL TO MEET THE PUPS ↓</span></div>
    </section>
  );
}
