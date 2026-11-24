import { Link } from 'react-router-dom';
import { getWhatsAppUrl } from '../../utils/whatsapp';

export default function FinalCallToAction() {
  return (
    <section className="final-cta-section">
      <div className="final-cta-inner page-shell"><p className="eyebrow">welcome home</p><span className="final-cta-star">✳</span><h2>Ready to meet your<br /><em>new best friend?</em></h2><p>Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.</p><div className="final-cta-actions"><a href={getWhatsAppUrl()} target="_blank" rel="noreferrer" className="button button-dark">Enquire on WhatsApp <span>↗</span></a><Link to="/contact" className="button button-outline">Visit & contact <span>↗</span></Link></div><div className="final-cta-script">Home, at last.</div></div>
    </section>
  );
}
