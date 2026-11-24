import { useEffect, useState } from 'react';

function galleryMedia(puppy) {
  const items = Array.isArray(puppy.media) ? puppy.media.filter(Boolean) : [];
  return items.length ? items : (puppy.cover ? [puppy.cover] : []);
}

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '';
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

export default function PuppyGallery({ puppy }) {
  const media = galleryMedia(puppy);
  const [activeIndex, setActiveIndex] = useState(0);
  const [failed, setFailed] = useState({});

  useEffect(() => {
    setActiveIndex(0);
    setFailed({});
  }, [puppy.slug]);

  if (!media.length) {
    return <div className="puppy-gallery-empty" role="status">Photos and videos for this puppy are not available right now.</div>;
  }

  const index = Math.min(activeIndex, media.length - 1);
  const active = media[index];
  const mediaKey = active.id || active.url || `media-${index}`;
  const focalStyle = {
    objectPosition: `${(active.focalX ?? 0.5) * 100}% ${(active.focalY ?? 0.5) * 100}%`,
  };
  const failedActive = Boolean(failed[mediaKey]);
  const hasActiveUrl = typeof active.url === 'string' && active.url.length > 0;
  const move = (step) => setActiveIndex((current) => (current + step + media.length) % media.length);

  return (
    <section className="puppy-gallery" aria-label={`${puppy.displayName || puppy.name || 'Puppy'} photo and video gallery`}>
      <div className="puppy-gallery-stage">
        <span className="puppy-gallery-count" aria-live="polite">{index + 1} / {media.length}</span>
        {active.kind === 'video' ? (
          !hasActiveUrl || failedActive ? (
            <div className="puppy-gallery-fallback" role="status">This video is unavailable right now.</div>
          ) : (
            <video
              key={mediaKey}
              controls
              playsInline
              preload="metadata"
              poster={active.poster?.url || undefined}
              width={active.width || undefined}
              height={active.height || undefined}
              style={focalStyle}
              aria-label={active.alt || `Video of ${puppy.displayName || puppy.name || 'the puppy'}`}
              onError={() => setFailed((current) => ({ ...current, [mediaKey]: true }))}
            >
              <source src={active.url} type="video/mp4" />
              Your browser does not support this video.
            </video>
          )
        ) : (
          !hasActiveUrl || failedActive ? (
            <div className="puppy-gallery-fallback" role="status">This photo is unavailable right now.</div>
          ) : (
            <img
              key={mediaKey}
              src={active.url}
              alt={active.alt || `${puppy.displayName || puppy.name || 'Puppy'}, ${puppy.breed || ''}`}
              width={active.width || undefined}
              height={active.height || undefined}
              style={focalStyle}
              onError={() => setFailed((current) => ({ ...current, [mediaKey]: true }))}
            />
          )
        )}
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
            const thumbnailKey = `thumbnail-${item.id || item.url || itemIndex}`;
            const failedThumbnail = Boolean(failed[thumbnailKey]);
            const duration = isVideo ? formatDuration(item.durationS) : '';
            return (
              <button
                type="button"
                key={item.id || item.url || itemIndex}
                className={`puppy-gallery-thumbnail ${itemIndex === index ? 'is-active' : ''}`}
                onClick={() => setActiveIndex(itemIndex)}
                aria-label={`Show ${isVideo ? 'video' : 'photo'} ${itemIndex + 1} of ${media.length}${duration ? `, duration ${duration}` : ''}`}
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
    </section>
  );
}
