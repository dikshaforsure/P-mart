import {useEffect,useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import PuppyGallery from '../components/puppies/PuppyGallery';
import PuppyNoteForm from '../components/puppies/PuppyNoteForm';
import {contentService} from '../services/contentService';
import {getWhatsAppUrl} from '../utils/whatsapp';
const care=['Vaccinated','Dewormed','Health certificate from licensed vets','Checked before joining your family'];
const steps=[{number:'01',title:'Ask',description:'Message us on WhatsApp. We’ll share current photos, videos and the details you need.'},{number:'02',title:'Meet',description:'Arrange a visit to meet your puppy at our Dubai showroom.'},{number:'03',title:'Come home',description:'Local puppies can go home after your visit, or we can discuss delivery within Dubai.'},{number:'04',title:'We’re still here',description:'Our team is available to help with settling in, feeding and training questions.'}];
export default function PuppyProfilePage(){
 const {slug}=useParams();const [puppy,setPuppy]=useState(undefined),[adjacent,setAdjacent]=useState({previous:null,next:null});
 useEffect(()=>{let active=true;setPuppy(undefined);Promise.all([contentService.getPuppyBySlug(slug),contentService.getAdjacentAvailablePuppies(slug)]).then(([record,neighbors])=>{if(active){setPuppy(record);setAdjacent(neighbors);}}).catch(()=>{if(active)setPuppy(null);});return()=>{active=false;};},[slug]);
 if(puppy===undefined)return <div className="puppy-profile-state page-shell" role="status" aria-live="polite">Opening this little story…</div>;
 if(!puppy)return <section className="puppy-profile-not-found page-shell"><p className="eyebrow">A little detour</p><h1>We couldn’t find this TeddyPup.</h1><p>The puppy link may have changed, or the record may not be in this catalogue snapshot.</p><Link className="button button-dark" to="/puppies">See available puppies <span aria-hidden="true">↗</span></Link></section>;
 const name=puppy.displayName||puppy.name||puppy.breed||'TeddyPup',available=puppy.status==='available',gender=puppy.genderLabel||(puppy.gender?puppy.gender.replace('-',' & '):'Not specified'),location=puppy.origin?.name||(available?'Location to be confirmed':'Previously homed');
 const msg=`Hi TeddyPups! I'd love to know more about ${name} (${puppy.slug}) — ${puppy.breed||'puppy'}, ${gender}, ${puppy.age||'age to be confirmed'}. Please share current photos, videos and details.`;
 return <article className="puppy-profile-page">
  <div className="puppy-profile-shell page-shell">
   <nav className="puppy-breadcrumbs" aria-label="Breadcrumb"><Link to="/puppies">Available puppies</Link><span aria-hidden="true">/</span><span aria-current="page">{name}</span></nav>
   <div className="puppy-profile-main"><PuppyGallery puppy={puppy}/><div className="puppy-profile-copy">
    <p className="eyebrow">{available?'hello, it’s me':'a little story from teddy’s sketchbook'}</p><p className={`puppy-profile-status ${available?'is-available':'is-homed'}`}>{available?'Available':'Gone home'}</p>
    <h1>{name}</h1><p className="puppy-profile-breed">{puppy.breed}</p>
    <dl className="puppy-profile-facts"><div><dt>Gender</dt><dd>{gender}</dd></div><div><dt>Age</dt><dd>{puppy.age||'To be confirmed'}</dd></div><div><dt>Location</dt><dd>{location}</dd></div></dl>
    {puppy.description&&<p className="puppy-profile-description">{puppy.description}</p>}{puppy.colour&&<p className="puppy-profile-colour">Colour · {puppy.colour}</p>}
    {available?<div className="puppy-profile-actions"><a className="button button-dark" href={getWhatsAppUrl(msg)} target="_blank" rel="noreferrer">Ask about {name} <span aria-hidden="true">↗</span></a><a className="button button-outline" href={getWhatsAppUrl(`Hi TeddyPups! I'd like to arrange a visit to meet ${name} (${puppy.slug}) at your Dubai showroom.`)} target="_blank" rel="noreferrer">Arrange a visit <span aria-hidden="true">↗</span></a></div>:<p className="puppy-homed-note">This puppy has already found a home. Have a look at the little ones currently available.</p>}
    {available&&<p className="puppy-or-send-note">Or send us a note below</p>}
   </div></div>
  </div>
  <section className="puppy-care-section"><div className="page-shell puppy-care-layout"><div><p className="eyebrow">With every TeddyPups puppy</p><h2>Little details, thoughtfully cared for.</h2><p>These are the shared care details described by TeddyPups on its puppy profiles.</p></div><ul>{care.map(item=><li key={item}><span aria-hidden="true">✳</span>{item}</li>)}</ul></div></section>
  <section className="puppy-journey-section page-shell"><div className="puppy-journey-heading"><p className="eyebrow">A new chapter together</p><h2>{name}’s way home</h2><p>From your first message to the first day at home, we’ll help you understand each step.</p></div><div className="puppy-journey-steps">{steps.map(step=><div className="puppy-journey-step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></div>)}</div></section>
  {available&&<div className="page-shell"><PuppyNoteForm puppy={puppy}/></div>}
  {available&&<nav className="puppy-adjacent-nav page-shell" aria-label="Browse other available puppies"><div>{adjacent.previous&&<Link to={`/puppies/${adjacent.previous.slug}`}><span>← Previous little one</span><strong>{adjacent.previous.displayName||adjacent.previous.name||adjacent.previous.breed}</strong></Link>}</div><Link className="button button-outline" to="/puppies">See every puppy <span aria-hidden="true">↗</span></Link><div className="puppy-adjacent-next">{adjacent.next&&<Link to={`/puppies/${adjacent.next.slug}`}><span>Next little one →</span><strong>{adjacent.next.displayName||adjacent.next.name||adjacent.next.breed}</strong></Link>}</div></nav>}
 </article>;
}
