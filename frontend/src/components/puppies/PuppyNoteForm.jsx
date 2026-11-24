import {useState} from 'react';
import {getWhatsAppUrl} from '../../utils/whatsapp';
export default function PuppyNoteForm({puppy}) {
 const [fields,setFields]=useState({name:'',phone:'',email:'',area:'',message:''}),[errors,setErrors]=useState({}),[notice,setNotice]=useState('');
 const name=puppy.displayName||puppy.name||puppy.breed||'this puppy';
 const update=e=>{const {name,value}=e.target;setFields(v=>({...v,[name]:value}));setErrors(v=>({...v,[name]:''}));setNotice('');};
 const submit=e=>{e.preventDefault();const next={};
  if(!fields.name.trim())next.name='Please enter your name.';
  if(!fields.phone.trim())next.phone='Please enter your phone number.';
  else if(!/^[+()\d\s.-]{7,25}$/.test(fields.phone.trim()))next.phone='Please enter a valid phone number.';
  if(fields.email.trim()&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))next.email='Please enter a valid email address.';
  if(fields.message.length>1200)next.message='Please keep your note under 1,200 characters.';
  setErrors(next);if(Object.keys(next).length){setNotice('Please check the highlighted fields.');return;}
  const message=[`Hello TeddyPups, my name is ${fields.name.trim()}.`,`I would like to enquire about ${name} (${puppy.slug}).`,`Phone: ${fields.phone.trim()}`,fields.email.trim()?`Email: ${fields.email.trim()}`:'',fields.area.trim()?`Area: ${fields.area.trim()}`:'',fields.message.trim()?`Note: ${fields.message.trim()}`:''].filter(Boolean).join('\n');
  const opened=window.open(getWhatsAppUrl(message),'_blank','noopener,noreferrer');
  setNotice(opened?'WhatsApp opened with your note. Please send the message there to contact TeddyPups.':'Your note is ready. Use the WhatsApp enquiry link above to send it.');
 };
 return <section className="puppy-note-section" aria-labelledby="puppy-note-title">
  <div><p className="eyebrow">A little note</p><h2 id="puppy-note-title">Tell us what’s on your mind.</h2><p>Share your details and we’ll prepare a puppy-specific WhatsApp note for you.</p></div>
  <form className="puppy-note-form" onSubmit={submit} noValidate>
   <div className="puppy-form-row">
    <label>Your name <span aria-hidden="true">*</span><input name="name" autoComplete="name" value={fields.name} onChange={update} required aria-invalid={!!errors.name} aria-describedby={errors.name?'puppy-name-error':undefined}/>{errors.name&&<small id="puppy-name-error" className="puppy-field-error">{errors.name}</small>}</label>
    <label>Phone number <span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={update} required aria-invalid={!!errors.phone} aria-describedby={errors.phone?'puppy-phone-error':undefined}/>{errors.phone&&<small id="puppy-phone-error" className="puppy-field-error">{errors.phone}</small>}</label>
   </div>
   <div className="puppy-form-row">
    <label>Email address<input name="email" type="email" autoComplete="email" value={fields.email} onChange={update} aria-invalid={!!errors.email} aria-describedby={errors.email?'puppy-email-error':undefined}/>{errors.email&&<small id="puppy-email-error" className="puppy-field-error">{errors.email}</small>}</label>
    <label>Your area<input name="area" autoComplete="address-level2" value={fields.area} onChange={update}/></label>
   </div>
   <label>Your note<textarea name="message" rows="4" value={fields.message} onChange={update} maxLength="1200" aria-invalid={!!errors.message} aria-describedby={errors.message?'puppy-message-error':undefined}/>{errors.message&&<small id="puppy-message-error" className="puppy-field-error">{errors.message}</small>}</label>
   <div className="puppy-note-submit"><button type="submit" className="button button-dark">Prepare WhatsApp note <span aria-hidden="true">↗</span></button><span>Required fields are marked *</span></div>
   {notice&&<p className="puppy-form-notice" role="status" aria-live="polite">{notice}</p>}
  </form>
 </section>;
}
