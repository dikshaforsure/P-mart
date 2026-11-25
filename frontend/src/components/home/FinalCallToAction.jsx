import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import PuppyMascot from '../puppies/PuppyMascot';
import PawMark from '../shared/PawMark';

export default function FinalCallToAction() {
  const mascotRef = useRef(null);

  return (
    <section className="final-cta-section home-final-cta">
      <div className="final-cta-inner page-shell">
        <span className="final-cta-paw" aria-hidden="true"><PawMark /></span>
        <p className="eyebrow">welcome home</p>
        <span className="final-cta-star" aria-hidden="true">✳</span>
        <h2>Ready to meet your<br /><em>new best friend?</em></h2>
        <p>Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.</p>
        <div className="final-cta-actions">
          <a href={getWhatsAppUrl()} target="_blank" rel="noreferrer" className="button button-dark">Enquire on WhatsApp <span>↗</span></a>
          <Link to="/contact" className="button button-outline">Visit & contact <span>↗</span></Link>
        </div>
        <div className="final-cta-script">Home, at last.</div>
        <div className="final-cta-mascot-anchor" ref={mascotRef}>
          <PuppyMascot boardRef={mascotRef} label="Teddy, the TeddyPups puppy, welcoming you home" facing="left" showRing={false} bubbleText="" />
        </div>
      </div>
    </section>
  );
}
