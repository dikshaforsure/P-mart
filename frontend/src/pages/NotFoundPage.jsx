import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return <section className="placeholder-page page-shell"><p className="eyebrow">A little detour</p><h1>This page wandered off.</h1><Link className="button button-dark" to="/">Back home ↗</Link></section>;
}
