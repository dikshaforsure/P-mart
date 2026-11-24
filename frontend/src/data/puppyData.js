import puppyRecords from './puppies.json';
import breedRecords from './breeds.json';
export const allPuppies = puppyRecords;
export const availablePuppies = allPuppies.filter(puppy => puppy.status === 'available' && puppy.published !== false);
export const breeds = breedRecords;
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
