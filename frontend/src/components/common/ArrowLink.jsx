import { Link } from 'react-router-dom';

export default function ArrowLink({ to, children, external = false, className = '' }) {
  const content = <>{children}<span aria-hidden="true"> ↗</span></>;
  return external
    ? <a className={`arrow-link ${className}`} href={to} target="_blank" rel="noreferrer">{content}</a>
    : <Link className={`arrow-link ${className}`} to={to}>{content}</Link>;
}
