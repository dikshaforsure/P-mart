import { Link } from 'react-router-dom';
import { siteSettings } from '../../data/siteContent';
import { getWhatsAppUrl } from '../../utils/whatsapp';

const exploreLinks = [
  ['Available puppies', '/puppies'],
  ['Gone home', '/gone-home'],
  ['Happy families', '/happy-families'],
  ['How it works', '/how-it-works'],
  ['Delivery & collection', '/how-it-works#delivery'],
  ['FAQ', '/faq'],
  ['Visit & contact', '/contact'],
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand-block">
          <Link to="/" className="footer-brand">TeddyPups<span>U.A.E.</span></Link>
          <p>Home, at last.</p>
          <p className="footer-brand-copy">TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.</p>
        </div>
        <div className="footer-column">
          <p className="footer-label">Explore</p>
          {exploreLinks.map(([label, to]) => <Link key={label} to={to}>{label}</Link>)}
        </div>
        <div className="footer-column footer-contact-column">
          <p className="footer-label">Say hello</p>
          <a href={getWhatsAppUrl()}>WhatsApp {siteSettings.phoneDisplay} ↗</a>
          <a href={`tel:${siteSettings.phoneTel}`}>{siteSettings.phoneDisplay}</a>
          <span>Email · address to be confirmed</span>
          <span>{siteSettings.city}</span>
          <div className="footer-socials" aria-label="Social channels listed by the reference; destination URLs not confirmed">
            <span>Instagram</span><span>TikTok</span><span>Facebook</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} TeddyPups U.A.E.</span><span>every puppy is family</span></div>
    </footer>
  );
}
