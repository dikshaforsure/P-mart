import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PuppyCard from '../components/puppies/PuppyCard';
import { contentService } from '../services/contentService';

function puppyHasBreed(puppy, breedSlug) {
  return Array.isArray(puppy.breeds) && puppy.breeds.length
    ? puppy.breeds.some((breed) => breed.slug === breedSlug)
    : puppy.breed?.toLowerCase().replace(/[^a-z0-9]+/g, '-') === breedSlug;
}

function StickerChip({ active, children, onClick, label }) {
  return (
    <button type="button" className="tp-sticker-chip" aria-pressed={active} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

function FilterRow({ label, children }) {
  return (
    <div className="puppy-filter-row" role="group" aria-label={'Filter by ' + label}>
      <span className="puppy-filter-label">{label}</span>
      <div className="puppy-filter-options">{children}</div>
    </div>
  );
}

function SketchbookBuddy() {
  return (
    <div className="tp-sketchbook__self" aria-label="Teddy, our little mascot">
      <div className="tp-buddy-doodle">
        <svg viewBox="0 0 180 170" role="img" aria-label="A little doodle of Teddy the puppy">
          <ellipse cx="90" cy="151" rx="53" ry="7" fill="#2a170e" opacity=".1" />
          <path d="M44 106c-8-18-3-39 10-49 11-10 23-12 36-12s26 2 37 12c13 10 18 31 10 49-5 21-23 32-48 32s-43-11-45-32Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round"/>
          <path d="M54 59C34 35 31 19 44 18c17-2 29 20 32 40M126 59c20-24 23-40 10-41-17-2-29 20-32 40" fill="#e4a352" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round"/>
          <ellipse cx="73" cy="91" rx="5" ry="7" fill="#2a170e"/><ellipse cx="107" cy="91" rx="5" ry="7" fill="#2a170e"/>
          <circle cx="75" cy="88" r="1.8" fill="white"/><circle cx="109" cy="88" r="1.8" fill="white"/>
          <path d="M82 106q8-8 16 0-1 10-8 10t-8-10Z" fill="#2a170e"/>
          <path d="M90 115v7m0 0q-8 8-14 0m14 0q8 8 14 0" fill="none" stroke="#2a170e" strokeWidth="3" strokeLinecap="round"/>
          <path d="M68 115q-9 6-15 0m74 0q-9 6-15 0" fill="none" stroke="#c2622b" strokeWidth="3" strokeLinecap="round" opacity=".8"/>
          <path d="M42 132q-20 4-19-15" fill="none" stroke="#2a170e" strokeWidth="5" strokeLinecap="round"/>
          <path d="M22 117q-11-11-2-18 12-5 16 8" fill="#f2be6b" stroke="#2a170e" strokeWidth="3"/>
        </svg>
      </div>
      <span className="tp-sketchbook__caption">Teddy says hello</span>
    </div>
  );
}

export default function PuppiesPage() {
  const [puppies, setPuppies] = useState(null);
  const [failed, setFailed] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let active = true;
    contentService.getAvailablePuppies()
      .then((items) => { if (active) setPuppies(items); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, []);

  const originFilter = searchParams.get('origin') || '';
  const breedFilter = searchParams.get('breed') || '';
  const genderFilter = searchParams.get('gender') || '';
  const collectionFilter = searchParams.get('collection') || '';
  const hasFilters = Boolean(originFilter || breedFilter || genderFilter || collectionFilter);

  const originOptions = useMemo(() => {
    if (!puppies) return [];
    const hasLocal = puppies.some((puppy) => puppy.origin?.slug === 'local');
    return [
      ...(hasLocal ? [{ value: 'local', label: 'In Dubai' }] : []),
      ...(puppies.some((puppy) => puppy.origin?.slug === 'imported') ? [{ value: 'imported', label: 'Imported' }] : []),
    ];
  }, [puppies]);

  const breedOptions = useMemo(() => {
    if (!puppies) return [];
    const ordered = [
      ['maltipoo', 'Maltipoo'],
      ['pomeranian', 'Pomeranian'],
      ['poodle', 'Poodle'],
      ['cavapoo', 'Cavapoo'],
      ['shih-tzu', 'Shih Tzu'],
    ];
    return ordered.filter(([slug]) => puppies.some((puppy) => puppyHasBreed(puppy, slug)));
  }, [puppies]);

  const genderOptions = useMemo(() => {
    if (!puppies) return [];
    return [
      ...(puppies.some((puppy) => puppy.gender === 'male' || puppy.gender === 'male-female') ? [{ value: 'male', label: 'Boys' }] : []),
      ...(puppies.some((puppy) => puppy.gender === 'female' || puppy.gender === 'male-female') ? [{ value: 'female', label: 'Girls' }] : []),
    ];
  }, [puppies]);

  const filteredPuppies = useMemo(() => {
    if (!puppies) return [];
    return puppies.filter((puppy) =>
      (!originFilter || puppy.origin?.slug === originFilter)
      && (!breedFilter || puppyHasBreed(puppy, breedFilter))
      && (!genderFilter || puppy.gender === genderFilter || puppy.gender === 'male-female')
      && (!collectionFilter || puppy.collections?.some((collection) => collection.slug === collectionFilter))
    );
  }, [puppies, originFilter, breedFilter, genderFilter, collectionFilter]);

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (next.get(key) === value) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams(new URLSearchParams());
  const collectionActive = collectionFilter === 'korean-teacup';

  return (
    <section className="puppies-page tp-sketchbook">
      <div className="page-shell">
        <div className="puppies-page-topline">
          <span>FROM TEDDY’S SKETCHBOOK</span>
          <span>REAL PUPPIES · REAL PHOTOS</span>
        </div>

        <div className="tp-sketchbook__head">
          <div className="tp-sketchbook__words">
            <p className="tp-sketchbook__eyebrow">from Teddy's sketchbook</p>
            <h1 className="tp-sketchbook__title">
              Available puppies
              <svg aria-hidden="true" viewBox="0 0 400 24" preserveAspectRatio="none" className="tp-sketchbook__underline">
                <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" />
              </svg>
            </h1>
            <p className="tp-sketchbook__lede">Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.</p>
          </div>
          <SketchbookBuddy />
        </div>

        {puppies === null && !failed ? (
          <div className="puppy-state" role="status">Finding the little ones…</div>
        ) : failed ? (
          <div className="puppy-state" role="alert">We couldn’t load the puppy list. Please refresh the page or contact us on WhatsApp.</div>
        ) : puppies.length === 0 ? (
          <div className="puppy-state" role="status">No puppies are listed as available right now. Please check back soon.</div>
        ) : (
          <div className="puppy-catalogue">
            <div className="tp-sketchpad puppy-filter-board" aria-label="Filter available puppies">
              <div className="puppy-filter-board-heading">
                <span className="puppy-filter-board-spark" aria-hidden="true">✳</span>
                <div>
                  <p className="puppy-filter-board-kicker">Find your little friend</p>
                  <h2>Who are you looking for?</h2>
                </div>
                <span className="puppy-filter-board-note">tap a sticker to filter</span>
              </div>

              <FilterRow label="where">
                <StickerChip active={!originFilter && !collectionActive} onClick={clearFilters}>Everywhere</StickerChip>
                {originOptions.map((option) => (
                  <StickerChip key={option.value} active={originFilter === option.value} onClick={() => setFilter('origin', option.value)} label={'Filter by ' + option.label}>
                    {option.label}
                  </StickerChip>
                ))}
                <StickerChip active={collectionActive} onClick={() => setFilter('collection', 'korean-teacup')} label="Filter by Korean Teacup collection">Korean Teacup</StickerChip>
              </FilterRow>

              <FilterRow label="breed">
                {breedOptions.map(([value, label]) => (
                  <StickerChip key={value} active={breedFilter === value} onClick={() => setFilter('breed', value)} label={'Filter by ' + label}>
                    {label}
                  </StickerChip>
                ))}
              </FilterRow>

              <FilterRow label="boy or girl">
                {genderOptions.map((option) => (
                  <StickerChip key={option.value} active={genderFilter === option.value} onClick={() => setFilter('gender', option.value)} label={'Show ' + option.label.toLowerCase()}>
                    {option.label}
                  </StickerChip>
                ))}
                {hasFilters && (
                  <button type="button" className="puppy-filter-clear" onClick={clearFilters}>
                    Clear filters <span aria-hidden="true">↺</span>
                  </button>
                )}
              </FilterRow>
            </div>

            <p className="puppy-catalogue-count mt-8 text-sm" aria-label="Catalogue results" role="status" aria-live="polite">
              <span>{filteredPuppies.length}</span> {filteredPuppies.length === 1 ? 'puppy' : 'puppies'} {hasFilters ? 'match your filters' : 'looking for a home'}
            </p>

            {filteredPuppies.length ? (
              <ul className="puppy-catalogue-grid mt-6" aria-label="Available puppies">
                {filteredPuppies.map((puppy, index) => (
                  <PuppyCard key={puppy.id || puppy.slug} puppy={puppy} index={index} />
                ))}
              </ul>
            ) : (
              <div className="puppy-filter-empty">
                <span aria-hidden="true">♡</span>
                <h2>No puppies match just now.</h2>
                <p>Try another little combination or clear the stickers to see everyone again.</p>
                <button type="button" className="puppy-filter-empty-button" onClick={clearFilters}>Show all puppies</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
