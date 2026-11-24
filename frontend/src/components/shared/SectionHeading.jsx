export default function SectionHeading({ number, eyebrow, title, description, id }) {
  return (
    <header className="storybook-section-heading">
      <div className="storybook-section-heading-top">
        {number && <span className="storybook-section-number" aria-hidden="true">{number}</span>}
        {eyebrow && <p>{eyebrow}</p>}
      </div>
      <h2 id={id}>{title}</h2>
      {description && <p className="storybook-section-description">{description}</p>}
    </header>
  );
}
