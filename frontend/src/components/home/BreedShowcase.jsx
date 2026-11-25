import PawMark from '../shared/PawMark';

const breeds = ['Max', 'Korean Teacup Maltipoo', 'Korean Teacup Poodle', 'Maltipoo & Cavapoo', 'Toy Poodle', 'Maltipoo'];

export default function BreedShowcase() {
  return (
    <section className="breed-showcase breed-showcase-storybook" aria-label="Puppies and breeds">
      <span className="breed-showcase-label">A few little faces from our puppy family</span>
      <div className="breed-marquee">
        <div className="breed-marquee-track">
          {[...breeds, ...breeds].map((breed, index) => (
            <span key={breed + '-' + index}>{breed}<PawMark className="breed-paw" /></span>
          ))}
        </div>
      </div>
    </section>
  );
}
