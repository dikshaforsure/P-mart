import { Link, useLocation } from 'react-router-dom';

const labels = {
  '/puppies': ['From Teddy’s sketchbook', 'Available puppies'],
  '/gone-home': ['One ticket home', 'Gone home'],
  '/happy-families': ['Little moments, big love', 'Happy families'],
  '/how-it-works': ['A little guide', 'How it works'],
  '/faq': ['Questions & answers', 'Questions, answered'],
  '/contact': ['Write us a little note', 'Get in touch with us'],
};

export default function PlaceholderPage({ title }) {
  const location = useLocation();
  const copy = labels[location.pathname] || ['A new chapter', title || 'Coming soon'];
  return (
    <section className="placeholder-page page-shell">
      <p className="eyebrow">{copy[0]}</p>
      <h1>{copy[1]}</h1>
      <p>This page is planned for a later development phase. For now, head back home to meet the TeddyPups experience.</p>
      <Link className="button button-dark" to="/">Back to home <span>↗</span></Link>
    </section>
  );
}
