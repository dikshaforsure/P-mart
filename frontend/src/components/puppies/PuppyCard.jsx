import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function PuppyCard({ puppy }) {
 const [failed,setFailed]=useState(false);
 const cover=puppy.cover; const name=puppy.name||puppy.displayName||puppy.breed||'TeddyPup';
 const show=cover?.kind==='image'&&cover.url&&!failed;
 return <article className="catalogue-puppy-card" role="listitem"><Link to={`/puppies/${puppy.slug}`} className="catalogue-puppy-link">
  <div className="catalogue-puppy-image">{show
   ? <img src={cover.url} alt={cover.alt||`${name}, ${puppy.genderLabel||'puppy'} ${puppy.breed||''}`} width={cover.width||undefined} height={cover.height||undefined} loading="lazy"
       style={{objectPosition:`${(cover.focalX??0.5)*100}% ${(cover.focalY??0.5)*100}%`}} onError={()=>setFailed(true)}/>
   : <div className="catalogue-image-fallback"><span aria-hidden="true">♡</span><small>{cover?.url?'Photo unavailable':'Photo coming soon'}</small></div>}</div>
  <div className="catalogue-puppy-details"><h2>{name}</h2><p>{puppy.breed}</p>
   <div className="catalogue-puppy-facts"><span>{puppy.genderLabel||puppy.gender||'Puppy'}</span><span>{puppy.age||'Age to be confirmed'}</span></div>
   <p className="catalogue-puppy-location">{puppy.origin?.name||'Location to be confirmed'}</p>
  </div>
 </Link></article>;
}
