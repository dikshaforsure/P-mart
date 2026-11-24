const breeds = ['Max', 'Korean Teacup Maltipoo', 'Korean Teacup Poodle', 'Maltipoo & Cavapoo', 'Toy Poodle', 'Maltipoo'];

export default function BreedShowcase() {
  return (
    <section className="breed-showcase" aria-label="Puppies and breeds">
      <span className="breed-showcase-label">A few little faces</span>
      <div className="breed-marquee"><div className="breed-marquee-track">{[...breeds, ...breeds].map((breed, index) => <span key={`${breed}-${index}`}>{breed}<i>✳</i></span>)}</div></div>
    </section>
  );
}
