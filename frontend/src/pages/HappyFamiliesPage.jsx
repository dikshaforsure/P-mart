import { useEffect, useRef, useState } from 'react';
import PageIntro from '../components/shared/PageIntro';
import PawMark from '../components/shared/PawMark';
import familyMoments from '../data/families.json';
import { familyPreview } from '../data/siteContent';

function FamilyPhoto({ item, className, contain = false, eager = false }) {
  const [failed, setFailed] = useState(false);

  if (!item?.url || failed) {
    return <span className={className + ' happy-families-photo-fallback'} role="img" aria-label="Family photo unavailable">Photo unavailable</span>;
  }

  return (
    <img
      className={className}
      src={item.url}
      alt={item.alt || 'A happy TeddyPups family with their new puppy'}
      width={item.width || undefined}
      height={item.height || undefined}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={{
        objectFit: contain ? 'contain' : 'cover',
        objectPosition: ((item.focalX ?? 0.5) * 100) + '% ' + ((item.focalY ?? 0.5) * 100) + '%',
      }}
      onError={() => setFailed(true)}
    />
  );
}

function FamilyMomentCard({ item, index, onOpen }) {
  const caption = item.caption || '';
  const label = 'Open photo ' + (index + 1) + ' of ' + familyMoments.length + (caption ? ': ' + caption : '');
  const tilts = [-2.2, 1.4, -1.1, 1.8, -0.7, 1.1, -1.6, 0.6];
  const tapes = ['#f6d79a', '#cfe5f6', '#f9cdbf', '#fbe3b4'];

  return (
    <li className="happy-families-wall__item">
      <button
        className="happy-families-wall__print"
        type="button"
        aria-label={label}
        data-moment-id={item.id}
        onClick={(event) => onOpen(index, event.currentTarget)}
      >
        <span className="happy-families-polaroid" style={{ '--polaroid-tilt': tilts[index % tilts.length] + 'deg', '--polaroid-tape': tapes[index % tapes.length] }}>
          <span className="happy-families-polaroid__tape" aria-hidden="true" />
          <span className="happy-families-polaroid__photo">
            <FamilyPhoto
              item={item}
              className="happy-families-polaroid__image"
              eager={index < 2}
            />
          </span>
          <span className="happy-families-polaroid__caption">{caption}</span>
        </span>
        <span className="happy-families-wall__paw" aria-hidden="true"><PawMark /></span>
      </button>
    </li>
  );
}

function FamilyLightbox({ items, index, onClose, onNavigate }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const startXRef = useRef(0);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';

    if (dialog && !dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    }
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog?.open) {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
      }
      previousFocusRef.current?.focus?.();
    };
  }, []);

  const move = (delta) => {
    onNavigate((current) => (current + delta + items.length) % items.length);
  };
  const item = items[index];

  return (
    <dialog
      ref={dialogRef}
      className="happy-families-lightbox"
      aria-label="Happy families photos"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          move(-1);
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          move(1);
        }
      }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onTouchStart={(event) => { startXRef.current = event.touches[0]?.clientX ?? 0; }}
      onTouchEnd={(event) => {
        const endX = event.changedTouches[0]?.clientX ?? startXRef.current;
        const delta = endX - startXRef.current;
        if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1);
      }}
    >
      <div className="happy-families-lightbox__bar">
        <p>Happy families · photo {index + 1} of {items.length}</p>
        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close photo viewer">×</button>
      </div>
      <div className="happy-families-lightbox__stage" key={item.id}>
        <FamilyPhoto item={item} className="happy-families-lightbox__image" contain />
      </div>
      {items.length > 1 && (
        <>
          <button className="happy-families-lightbox__previous" type="button" onClick={() => move(-1)} aria-label="Previous photo">‹</button>
          <button className="happy-families-lightbox__next" type="button" onClick={() => move(1)} aria-label="Next photo">›</button>
        </>
      )}
      {item.caption && <p className="happy-families-lightbox__caption">{item.caption}</p>}
    </dialog>
  );
}

export default function HappyFamiliesPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const triggerRef = useRef(null);
  const isViewerOpen = activeIndex !== null;

  const openViewer = (index, trigger) => {
    triggerRef.current = trigger;
    setActiveIndex(index);
  };
  const closeViewer = () => setActiveIndex(null);

  return (
    <article className="happy-families-page">
      <div className="page-shell happy-families-shell">
        <header className="happy-families-header">
          <PageIntro
            eyebrow="our wall of happy endings"
            title="Happy families"
            description="Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends."
            className="happy-families-intro"
          />
          <p className="happy-families-count">{familyMoments.length} moments and counting</p>
          <figure className="happy-families-testimonial">
            <span className="happy-families-testimonial__tape" aria-hidden="true" />
            <blockquote>“{familyPreview.quote}”</blockquote>
            <figcaption>{familyPreview.author}</figcaption>
          </figure>
        </header>

        <section className="happy-families-gallery" aria-label="Family and puppy photo gallery">
          <ul className="happy-families-wall" aria-label="Photos from TeddyPups families">
            {familyMoments.map((item, index) => (
              <FamilyMomentCard key={item.id} item={item} index={index} onOpen={openViewer} />
            ))}
          </ul>
        </section>

        <p className="happy-families-signoff">every one of them was a Teddy Pup once</p>
      </div>

      {isViewerOpen && (
        <FamilyLightbox
          items={familyMoments}
          index={activeIndex}
          onClose={closeViewer}
          onNavigate={setActiveIndex}
        />
      )}
    </article>
  );
}
