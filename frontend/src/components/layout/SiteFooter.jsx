import { Link } from 'react-router-dom';
import { getWhatsAppUrl } from '../../utils/whatsapp';
import PawMark from '../shared/PawMark';

const exploreLinks = [
  ['Available puppies', '/puppies'],
  ['Gone home', '/gone-home'],
  ['Happy families', '/happy-families'],
  ['How it works', '/how-it-works'],
  ['Delivery & collection', '/how-it-works#delivery'],
  ['FAQ', '/faq'],
  ['Visit & contact', '/contact'],
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/teddypups.worldwide/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@teddypupsuae' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61567496944539' },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <svg className="footer-hill" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z" />
      </svg>
      <span className="footer-moon" aria-hidden="true" />
      <span className="footer-star footer-star-one" aria-hidden="true">✦</span>
      <span className="footer-star footer-star-two" aria-hidden="true">✧</span>
      <div className="footer-top">
        <div className="footer-brand-block">
          <Link to="/" className="footer-brand" aria-label="TeddyPups U.A.E. home">
            <span className="footer-brand-paw" aria-hidden="true"><PawMark /></span>
            <span className="footer-brand-name">TeddyPups<small>U.A.E.</small></span>
          </Link>
          <p>Home, at last.</p>
          <p className="footer-brand-copy">TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.</p>
          <a className="footer-whatsapp" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">Ask us on WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
        <nav className="footer-column" aria-label="Explore">
          <p className="footer-label">Explore</p>
          {exploreLinks.map(([label, to]) => <Link key={label} to={to}>{label}</Link>)}
        </nav>
        <div className="footer-column footer-contact-column">
          <p className="footer-label">Say hello</p>
          <a href="mailto:teddypupsadmin@gmail.com">teddypupsadmin@gmail.com</a>
          <span>Downtown Dubai, United Arab Emirates</span>
          <div className="footer-socials" aria-label="TeddyPups social channels">
            {socialLinks.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label} ↗</a>)}
          </div>
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} TeddyPups U.A.E.</span><span>every puppy is family</span></div>
    </footer>
  );
}
