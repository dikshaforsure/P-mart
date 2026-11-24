import { useEffect, useRef, useState } from 'react';

function galleryMedia(puppy) {
  const items = Array.isArray(puppy.media) ? puppy.media.filter(Boolean) : [];
  return items.length ? items : (puppy.cover ? [puppy.cover] : []);
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '';
  const total = Math.round(seconds);
  return Math.floor(total / 60) + ':' + String(total % 60).padStart(2, '0');
}

export default function PuppyGallery({ puppy }) {
  const media = galleryMedia(puppy);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failed, setFailed] = useState({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxRef = useRef(null);
  const stageVideoRef = useRef(null);
  const touchStartX = useRef(0);
  const puppyName = puppy.displayName || puppy.name || 'Puppy';

  useEffect(() => {
    setActiveIndex(0);
    setFailed({});
    setLightboxOpen(false);
  }, [puppy.slug]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const dialog = lightboxRef.current;
    if (!dialog) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    }
    document.body.style.overflow = 'hidden';
    dialog.querySelector('[data-lightbox-close]')?.focus();

    return () => {
      if (dialog.open) {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
      }
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [lightboxOpen]);

  if (!media.length) {
    return <div className="puppy-gallery-empty" role="status">Photos and videos for this puppy are not available right now.</div>;
  }

  const index = Math.min(activeIndex, media.length - 1);
  const active = media[index];
  const mediaKey = active.id || active.url || 'media-' + index;
  const focalStyle = {
    objectPosition: ((active.focalX ?? 0.5) * 100) + '% ' + ((active.focalY ?? 0.5) * 100) + '%',
  };
  const failedActive = Boolean(failed[mediaKey]);
  const hasActiveUrl = typeof active.url === 'string' && active.url.length > 0;
  const move = (step) => setActiveIndex((current) => (current + step + media.length) % media.length);
  const openLightbox = () => {
    stageVideoRef.current?.pause();
    setLightboxOpen(true);
  };

  const handleLightboxKeyDown = (event) => {
    if (event.key === 'ArrowLeft' && media.length > 1) {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'ArrowRight' && media.length > 1) {
      event.preventDefault();
      move(1);
    }
  };

  const handleTouchEnd = (event) => {
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;
    if (Math.abs(distance) > 45 && media.length > 1) move(distance > 0 ? -1 : 1);
  };

  return (
    <section className="puppy-gallery" aria-label={puppyName + ' photo and video gallery'}>
      <div className="puppy-gallery-stage">
        <span className="puppy-gallery-count" aria-live="polite">{index + 1} / {media.length}</span>
        <div
          key={puppy.slug + ':' + mediaKey}
          className="clone-gallery-page"
          data-media-key={puppy.slug + ':' + mediaKey}
        >
          {active.kind === 'video' ? (
            !hasActiveUrl || failedActive ? (
              <div className="puppy-gallery-fallback" role="status">This video is unavailable right now.</div>
            ) : (
              <>
                <video
                  ref={stageVideoRef}
                  key={mediaKey}
                  controls
                  playsInline
                  preload="metadata"
                  poster={active.poster?.url || undefined}
                  width={active.width || undefined}
                  height={active.height || undefined}
                  style={{ ...focalStyle, width: '100%', height: '100%', objectFit: 'cover' }}
                  aria-label={active.alt || 'Video of ' + puppyName}
                  onError={() => setFailed((current) => ({ ...current, [mediaKey]: true }))}
                >
                  <source src={active.url} type="video/mp4" />
                  Your browser does not support this video.
                </video>
                <button
                  type="button"
                  className="puppy-gallery-expand absolute bottom-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-[var(--paper)]/90 text-xl text-[var(--ink)] shadow-md hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sage-dark)]"
                  onClick={openLightbox}
                  aria-label={'Open ' + puppyName + ' video full screen'}
                >
                  ⛶
                </button>
              </>
            )
          ) : (
            !hasActiveUrl || failedActive ? (
              <div className="puppy-gallery-fallback" role="status">This photo is unavailable right now.</div>
            ) : (
              <button
                type="button"
                className="puppy-gallery-image-trigger absolute inset-0 block h-full w-full cursor-zoom-in border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--sage-dark)]"
                onClick={openLightbox}
                aria-label={'Open ' + puppyName + ', photo ' + (index + 1) + ' of ' + media.length + ', full screen'}
              >
                <img
                  key={mediaKey}
                  src={active.url}
                  alt={active.alt || puppyName + ', ' + (puppy.breed || '')}
                  width={active.width || undefined}
                  height={active.height || undefined}
                  style={{ ...focalStyle, width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={() => setFailed((current) => ({ ...current, [mediaKey]: true }))}
                />
              </button>
            )
          )}
        </div>
        {media.length > 1 && (
          <>
            <button type="button" className="puppy-gallery-arrow puppy-gallery-previous" onClick={() => move(-1)} aria-label="Previous photo or video">←</button>
            <button type="button" className="puppy-gallery-arrow puppy-gallery-next" onClick={() => move(1)} aria-label="Next photo or video">→</button>
          </>
        )}
      </div>
      {active.caption && <p className="puppy-gallery-caption">{active.caption}</p>}
      {media.length > 1 && (
        <div className="puppy-gallery-thumbnails" aria-label="Choose gallery media">
          {media.map((item, itemIndex) => {
            const isVideo = item.kind === 'video';
            const source = isVideo ? item.poster?.url : item.url;
            const thumbnailKey = 'thumbnail-' + (item.id || item.url || itemIndex);
            const failedThumbnail = Boolean(failed[thumbnailKey]);
            const duration = isVideo ? formatDuration(item.durationS) : '';
            return (
              <button
                type="button"
                key={item.id || item.url || itemIndex}
                className={'puppy-gallery-thumbnail ' + (itemIndex === index ? 'is-active' : '')}
                onClick={() => setActiveIndex(itemIndex)}
                aria-label={'Show ' + (isVideo ? 'video' : 'photo') + ' ' + (itemIndex + 1) + ' of ' + media.length + (duration ? ', duration ' + duration : '')}
                aria-pressed={itemIndex === index}
              >
                {source && !failedThumbnail ? (
                  <img
                    src={source}
                    alt=""
                    loading="lazy"
                    onError={() => setFailed((current) => ({ ...current, [thumbnailKey]: true }))}
                  />
                ) : (
                  <span className="puppy-gallery-thumb-fallback" aria-hidden="true">♡</span>
                )}
                {isVideo && <span className="puppy-gallery-video-mark" aria-hidden="true">{duration || '▶'}</span>}
              </button>
            );
          })}
        </div>
      )}

      {lightboxOpen && (
        <dialog
          ref={lightboxRef}
          className="puppy-gallery-lightbox fixed inset-0 m-0 flex h-[100dvh] max-h-none w-screen max-w-none flex-col border-0 bg-[#26241f]/95 p-0 text-white backdrop:bg-black/70"
          aria-label={puppyName + ' photos and videos'}
          onCancel={(event) => {
            event.preventDefault();
            setLightboxOpen(false);
          }}
          onKeyDown={handleLightboxKeyDown}
          onClick={(event) => {
            if (event.target === event.currentTarget) setLightboxOpen(false);
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? 0;
          }}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/15 px-4 py-3 md:px-8 md:py-5">
            <p className="text-sm font-semibold tracking-wide md:text-base">
              {puppyName} · {active.kind === 'video' ? 'video' : 'photo'} {index + 1} of {media.length}
            </p>
            <button
              type="button"
              data-lightbox-close
              onClick={() => setLightboxOpen(false)}
              className="grid size-10 shrink-0 place-items-center rounded-full border border-white/35 text-3xl leading-none hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              aria-label="Close full-screen gallery"
            >
              ×
            </button>
          </div>
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 py-4 md:px-16 md:py-8"
            onClick={(event) => {
              if (event.target === event.currentTarget) setLightboxOpen(false);
            }}
          >
            {!hasActiveUrl || failedActive ? (
              <div className="puppy-gallery-fallback" role="status">This media is unavailable right now.</div>
            ) : active.kind === 'video' ? (
              <video
                key={'lightbox-' + mediaKey}
                poster={active.poster?.url || undefined}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="h-auto w-auto max-w-full object-contain"
                style={{ maxHeight: 'calc(100dvh - 120px)' }}
                aria-label={active.alt || 'Video of ' + puppyName}
                onError={() => setFailed((current) => ({ ...current, [mediaKey]: true }))}
              >
                <source src={active.url} type="video/mp4" />
                Your browser does not support this video.
              </video>
            ) : (
              <img
                key={'lightbox-' + mediaKey}
                src={active.url}
                alt={active.alt || puppyName + ', ' + (puppy.breed || '')}
                className="h-auto w-auto max-w-full object-contain"
                style={{ ...focalStyle, maxHeight: 'calc(100dvh - 120px)' }}
                onError={() => setFailed((current) => ({ ...current, [mediaKey]: true }))}
              />
            )}
          </div>
          {media.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-3xl text-[#26241f] shadow-lg hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:left-5 md:size-12"
                onClick={() => move(-1)}
                aria-label="Previous media"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-3xl text-[#26241f] shadow-lg hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-5 md:size-12"
                onClick={() => move(1)}
                aria-label="Next media"
              >
                ›
              </button>
            </>
          )}
          {active.caption && <p className="shrink-0 px-12 pb-4 text-center text-sm text-white/80 md:pb-6">{active.caption}</p>}
        </dialog>
      )}
    </section>
  );
}
