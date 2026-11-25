export default function PageIntro({ eyebrow, title, description, className = '' }) {
  return (
    <header className={`page-intro ${className}`.trim()}>
      {eyebrow && <p className="page-intro-eyebrow">{eyebrow}</p>}
      <h1>{title}</h1>
      {description && <p className="page-intro-description">{description}</p>}
    </header>
  );
}
