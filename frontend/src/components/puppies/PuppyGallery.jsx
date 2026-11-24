import { useEffect,useState } from 'react';
function galleryMedia(puppy) { const list=Array.isArray(puppy.media)?puppy.media.filter(Boolean):[]; return list.length?list:(puppy.cover?[puppy.cover]:[]); }
export default function PuppyGallery({puppy}) {
 const media=galleryMedia(puppy); const [activeIndex,setActiveIndex]=useState(0); const [failed,setFailed]=useState({});
 useEffect(()=>{setActiveIndex(0);setFailed({});},[puppy.slug]);
 if(!media.length) return <div className="puppy-gallery-empty" role="status">Photos and videos for this puppy are not available right now.</div>;
 const index=Math.min(activeIndex,media.length-1); const active=media[index]; const key=active.id||active.url;
 const move=step=>setActiveIndex(current=>(current+step+media.length)%media.length);
 return <section className="puppy-gallery" aria-label={`${puppy.displayName||puppy.name||'Puppy'} photo and video gallery`}>
  <div className="puppy-gallery-stage"><span className="puppy-gallery-count" aria-live="polite">{index+1} / {media.length}</span>
   {active.kind==='video'
    ? failed[key] ? <div className="puppy-gallery-fallback" role="status">This video is unavailable right now.</div>
      : <video key={key} controls playsInline preload="metadata" poster={active.poster?.url||undefined} width={active.width||undefined} height={active.height||undefined} aria-label={active.alt||`Video of ${puppy.displayName||puppy.name||'the puppy'}`}><source src={active.url} type="video/mp4"/>Your browser does not support this video.</video>
    : failed[key] ? <div className="puppy-gallery-fallback" role="status">This photo is unavailable right now.</div>
      : <img key={key} src={active.url} alt={active.alt||`${puppy.displayName||puppy.name||'Puppy'}, ${puppy.breed||''}`} width={active.width||undefined} height={active.height||undefined} style={{objectPosition:`${(active.focalX??0.5)*100}% ${(active.focalY??0.5)*100}%`}} onError={()=>setFailed(current=>({...current,[key]:true}))}/>}
   {media.length>1&&<><button type="button" className="puppy-gallery-arrow puppy-gallery-previous" onClick={()=>move(-1)} aria-label="Previous photo or video">←</button><button type="button" className="puppy-gallery-arrow puppy-gallery-next" onClick={()=>move(1)} aria-label="Next photo or video">→</button></>}
  </div>
  {active.caption&&<p className="puppy-gallery-caption">{active.caption}</p>}
  {media.length>1&&<div className="puppy-gallery-thumbnails" aria-label="Choose gallery media">{media.map((item,i)=>{const video=item.kind==='video',src=video?item.poster?.url:item.url,thumbKey=`thumb-${item.id||item.url}`;return <button type="button" key={item.id||item.url||i} className={`puppy-gallery-thumbnail ${i===index?'is-active':''}`} onClick={()=>setActiveIndex(i)} aria-label={`Show ${video?'video':'photo'} ${i+1} of ${media.length}`} aria-pressed={i===index}>{src&&!failed[thumbKey]?<img src={src} alt="" loading="lazy" onError={()=>setFailed(current=>({...current,[thumbKey]:true}))}/>:<span className="puppy-gallery-thumb-fallback" aria-hidden="true">♡</span>}{video&&<span className="puppy-gallery-video-mark" aria-hidden="true">▶</span>}</button>;})}</div>}
 </section>;
}
