import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '../components/common/SectionHeading';
import PuppyCard from '../components/puppies/PuppyCard';
import { contentService } from '../services/contentService';

function slugify(value = '') {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function puppyHasBreed(puppy, breedSlug) {
  if (Array.isArray(puppy.breeds) && puppy.breeds.length) {
    return puppy.breeds.some((breed) => breed.slug === breedSlug);
  }
  return slugify(puppy.breed) === breedSlug;
}

function puppyHasCollection(puppy, collectionSlug) {
  return Array.isArray(puppy.collections)
    && puppy.collections.some((collection) => collection.slug === collectionSlug);
}

function FilterChip({ active, children, onClick, label }) {
  return (
    <button
      type="button"
      className={
        'rounded-full border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sage-dark)] ' +
        (active
          ? 'border-[var(--ink)] bg-[var(--ink)] text-white'
          : 'border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--sage-dark)]')
      }
      aria-pressed={active}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function PuppiesPage() {
  const [puppies, setPuppies] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [failed, setFailed] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let active = true;
    Promise.all([
      contentService.getAvailablePuppies(),
      contentService.getBreeds(),
    ]).then(([puppyItems, breedItems]) => {
      if (active) {
        setPuppies(puppyItems);
        setBreeds(breedItems);
      }
    }).catch(() => {
      if (active) setFailed(true);
    });
    return () => { active = false; };
  }, []);

  const originFilter = searchParams.get('origin') || '';
  const breedFilter = searchParams.get('breed') || '';
  const genderFilter = searchParams.get('gender') || '';
  const collectionFilter = searchParams.get('collection') || '';
  const hasFilters = Boolean(originFilter || breedFilter || genderFilter || collectionFilter);

  const origins = useMemo(() => {
    if (!puppies) return [];
    const unique = new Map();
    puppies.forEach((puppy) => {
      if (puppy.origin?.slug) {
        unique.set(puppy.origin.slug, {
          slug: puppy.origin.slug,
          name: puppy.origin.name || puppy.origin.slug,
        });
      }
    });
    return Array.from(unique.values());
  }, [puppies]);

  const availableBreeds = useMemo(() => {
    if (!puppies) return [];
    return breeds.filter((breed) => puppies.some((puppy) => puppyHasBreed(puppy, breed.slug)));
  }, [puppies, breeds]);

  const availableCollections = useMemo(() => {
    if (!puppies) return [];
    const unique = new Map();
    puppies.forEach((puppy) => {
      (puppy.collections || []).forEach((collection) => {
        if (collection?.slug) {
          unique.set(collection.slug, {
            slug: collection.slug,
            name: collection.name || collection.slug,
          });
        }
      });
    });
    return Array.from(unique.values());
  }, [puppies]);

  const genderOptions = useMemo(() => {
    if (!puppies) return [];
    const options = [
      { value: 'male', label: 'Boys' },
      { value: 'female', label: 'Girls' },
    ];
    return options.filter(({ value }) => puppies.some((puppy) =>
      puppy.gender === value || puppy.gender === 'male-female'
    ));
  }, [puppies]);

  const filteredPuppies = useMemo(() => {
    if (!puppies) return [];
    return puppies.filter((puppy) => {
      const matchesOrigin = !originFilter || puppy.origin?.slug === originFilter;
      const matchesBreed = !breedFilter || puppyHasBreed(puppy, breedFilter);
      const matchesGender = !genderFilter || puppy.gender === genderFilter || puppy.gender === 'male-female';
      const matchesCollection = !collectionFilter || puppyHasCollection(puppy, collectionFilter);
      return matchesOrigin && matchesBreed && matchesGender && matchesCollection;
    });
  }, [puppies, originFilter, breedFilter, genderFilter, collectionFilter]);

  const toggleFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (next.get(key) === value) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams(new URLSearchParams());

  return (
    <section className="puppies-page page-shell">
      <div className="puppies-page-topline"><span>FROM TEDDY’S SKETCHBOOK</span><span>REAL PUPPIES · REAL PHOTOS</span></div>
      <SectionHeading eyebrow="a little hello from us" title="Available puppies" description="Meet the little ones who are ready to find their people. Every puppy has their own story, and it might just begin with you." />
      {puppies === null && !failed ? <div className="puppy-state" role="status" aria-live="polite">Finding the little ones…</div>
        : failed ? <div className="puppy-state" role="alert">We couldn’t load the puppy list. Please refresh the page or contact us on WhatsApp.</div>
        : puppies.length === 0 ? <div className="puppy-state" role="status">No puppies are listed as available right now. Please check back soon.</div>
        : (
          <>
            <div className="mt-8 grid gap-4 rounded-3xl border border-[var(--line)] bg-[#eee9e0] p-5 md:p-6" aria-label="Filter available puppies">
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by location">
                <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Where</span>
                <FilterChip active={!originFilter && !collectionFilter} onClick={clearFilters} label="Show puppies from everywhere">Everywhere</FilterChip>
                {origins.map((origin) => (
                  <FilterChip
                    key={origin.slug}
                    active={originFilter === origin.slug}
                    onClick={() => toggleFilter('origin', origin.slug)}
                    label={'Filter by ' + origin.name}
                  >
                    {origin.name}
                  </FilterChip>
                ))}
              </div>

              {availableBreeds.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 border-t border-[var(--line)] pt-4" role="group" aria-label="Filter by breed">
                  <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Breed</span>
                  {availableBreeds.map((breed) => (
                    <FilterChip
                      key={breed.slug}
                      active={breedFilter === breed.slug}
                      onClick={() => toggleFilter('breed', breed.slug)}
                      label={'Filter by ' + breed.name}
                    >
                      {breed.name}
                    </FilterChip>
                  ))}
                </div>
              )}

              {genderOptions.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 border-t border-[var(--line)] pt-4" role="group" aria-label="Filter by gender">
                  <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Boy or girl</span>
                  {genderOptions.map((gender) => (
                    <FilterChip
                      key={gender.value}
                      active={genderFilter === gender.value}
                      onClick={() => toggleFilter('gender', gender.value)}
                      label={'Show ' + gender.label.toLowerCase()}
                    >
                      {gender.label}
                    </FilterChip>
                  ))}
                </div>
              )}

              {availableCollections.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 border-t border-[var(--line)] pt-4" role="group" aria-label="Filter by collection">
                  <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Collection</span>
                  {availableCollections.map((collection) => (
                    <FilterChip
                      key={collection.slug}
                      active={collectionFilter === collection.slug}
                      onClick={() => toggleFilter('collection', collection.slug)}
                      label={'Filter by ' + collection.name}
                    >
                      {collection.name}
                    </FilterChip>
                  ))}
                </div>
              )}

              {hasFilters && (
                <div className="flex justify-end border-t border-[var(--line)] pt-3">
                  <button
                    type="button"
                    className="text-xs font-semibold text-[var(--sage-dark)] underline underline-offset-4 hover:text-[var(--ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            <p className="mt-8 text-sm text-[var(--muted)]" role="status" aria-live="polite">
              {filteredPuppies.length} {filteredPuppies.length === 1 ? 'puppy' : 'puppies'} {hasFilters ? 'match your filters' : 'looking for a home'}
            </p>

            {filteredPuppies.length > 0 ? (
              <>
                <div className="puppy-catalogue-grid mt-6" role="list" aria-label="Available puppies">
                  {filteredPuppies.map((puppy) => <PuppyCard puppy={puppy} key={puppy.id || puppy.slug} />)}
                </div>
                <p className="puppy-catalogue-note">Each little one is unique. Contact us for current photos, videos and details.</p>
              </>
            ) : (
              <div className="mt-8 rounded-3xl border border-[var(--line)] bg-[#eee9e0] px-6 py-10 text-center">
                <h2 className="font-[var(--serif)] text-2xl">No puppies match just now.</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--muted)]">Try a different combination or clear the filters to see all available puppies.</p>
                <button type="button" className="button button-dark mt-6" onClick={clearFilters}>Show all puppies</button>
              </div>
            )}
          </>
        )}
    </section>
  );
}
