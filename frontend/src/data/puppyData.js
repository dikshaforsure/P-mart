import puppyRecords from './puppies.json';
import breedRecords from './breeds.json';
export const allPuppies = puppyRecords;
export const availablePuppies = allPuppies.filter(puppy => puppy.status === 'available' && puppy.published !== false);
export const breeds = breedRecords;

// This explicit sequence matches the reference Gone Home archive cards.
export const goneHomeOrder = [
  'pomeranian-ace-boy', 'poodle-leo-male', 'maltipoo-mia-girl', 'maltipoo-sadie-girl',
  'blue-marle-pomeranian', 'pomsky-ollie-boy', 'maltipoo-bruno-boy', 'maltese-buddy-male',
  'maltese-charlie-male', 'pomeranian-daisy-girl', 'pomeranian-bella-female',
  'poodle-teddy-male', 'poodle-molly-female', 'pomski-coco-girl', 'pomsky-rosie-girl',
  'pomeranian-leo-boy', 'poodle-molly-girl', 'poodle-rocky-boy', 'maltipoo-sophie-girl',
  'maltipoo-lola-girl', 'pomeranian-rex-boy', 'pomsky-finn-male', 'maltipoo-zoe-girl',
  'pomeranian-mimi-girl', 'bichon-bailey-boy', 'puppy', 'maltipo',
];
export const goneHomePuppies = goneHomeOrder
  .map((slug) => allPuppies.find((puppy) => puppy.slug === slug))
  .filter((puppy) => puppy && puppy.status === 'sold' && puppy.published !== false);
export function getPuppyBySlug(slug) { return slug ? allPuppies.find(p => p.slug === slug) ?? null : null; }
export function getAdjacentAvailablePuppies(slug) {
  const index=availablePuppies.findIndex(p=>p.slug===slug);
  if(index<0||availablePuppies.length<2) return {previous:null,next:null};
  return {previous:availablePuppies[(index-1+availablePuppies.length)%availablePuppies.length],next:availablePuppies[(index+1)%availablePuppies.length]};
}
export function toPuppyCardData(p) {
  return {id:p.id??p.slug,slug:p.slug,name:p.name||p.displayName||p.breed||'TeddyPup',breed:p.breed||'',sex:p.genderLabel||p.gender||'',age:p.age||'',status:p.status,cover:p.cover??null,media:Array.isArray(p.media)?p.media:[],hasVideo:Array.isArray(p.media)&&p.media.some(m=>m.kind==='video'),origin:p.origin??null};
}
export function getAvailablePuppyCards(limit=availablePuppies.length) {
  const safeLimit=Number.isFinite(limit)?Math.max(0,limit):availablePuppies.length;
  return availablePuppies.slice(0,safeLimit).map(toPuppyCardData);
}

export function getAdjacentSoldPuppies(slug) {
  const index = goneHomePuppies.findIndex((puppy) => puppy.slug === slug);
  if (index < 0 || goneHomePuppies.length < 2) return { previous: null, next: null };
  return {
    previous: goneHomePuppies[(index - 1 + goneHomePuppies.length) % goneHomePuppies.length],
    next: goneHomePuppies[(index + 1) % goneHomePuppies.length],
  };
}
