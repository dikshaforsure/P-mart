export default function SectionHeading({ eyebrow, title, description, light = false, align = 'left' }) {
  return (
    <div className={`section-heading ${align === 'center' ? 'text-center' : ''} ${light ? 'section-heading-light' : ''}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {description && <p className="section-heading-description">{description}</p>}
    </div>
  );
}
