import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getWhatsAppUrl } from '../../utils/whatsapp';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Puppies', to: '/puppies' },
  { label: 'Happy families', to: '/happy-families' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Visit & contact', to: '/contact' },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef(null);
  const closeRef = useRef(null);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);
  useEffect(() => {
    if (!menuOpen) return undefined;
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { setMenuOpen(false); triggerRef.current?.focus(); }
      if (event.key === 'Tab') {
        const items = document.querySelectorAll('#mobile-navigation a, #mobile-navigation button');
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('menu-open');
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand-mark" aria-label="TeddyPups home">
            <span className="brand-name">TeddyPups</span>
            <span className="brand-region">U.A.E.</span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map((link) => <NavLink key={link.to} to={link.to} end={link.to === '/'}>{link.label}</NavLink>)}
          </nav>
          <a className="header-whatsapp" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">WhatsApp us <span>↗</span></a>
          <button ref={triggerRef} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)}>
            <span>Menu</span><i aria-hidden="true"><b></b><b></b></i>
          </button>
        </div>
      </header>
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`} id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Mobile navigation" aria-hidden={!menuOpen} inert={!menuOpen}>
        <div className="mobile-menu-top">
          <Link to="/" className="brand-mark" onClick={() => { setMenuOpen(false); triggerRef.current?.focus(); }}><span className="brand-name">TeddyPups</span><span className="brand-region">U.A.E.</span></Link>
          <button ref={closeRef} className="menu-close" type="button" onClick={() => { setMenuOpen(false); triggerRef.current?.focus(); }}>Close <span aria-hidden="true">×</span></button>
        </div>
        <p className="mobile-menu-note">where to, friend?</p>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => { setMenuOpen(false); triggerRef.current?.focus(); }}>
              <span className="mobile-menu-index">0{index + 1}</span>{link.label}<span className="mobile-menu-arrow">↗</span>
            </NavLink>
          ))}
        </nav>
        <a className="mobile-whatsapp" href={getWhatsAppUrl()} target="_blank" rel="noreferrer">WhatsApp us ↗</a>
      </div>
      {menuOpen && <button type="button" className="mobile-menu-backdrop" aria-label="Close navigation menu" onClick={() => { setMenuOpen(false); triggerRef.current?.focus(); }} />}
    </>
  );
}
