import { useEffect, useState } from 'react';
import SectionHeading from '../components/common/SectionHeading';
import PuppyCard from '../components/puppies/PuppyCard';
import { contentService } from '../services/contentService';

export default function PuppiesPage() {
  const [puppies, setPuppies] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    contentService.getAvailablePuppies().then(items => { if (active) setPuppies(items); })
      .catch(() => { if (active) setFailed(true); });
    return () => { active = false; };
  }, []);
  return <section className="puppies-page page-shell">
    <div className="puppies-page-topline"><span>FROM TEDDY’S SKETCHBOOK</span><span>REAL PUPPIES · REAL PHOTOS</span></div>
    <SectionHeading eyebrow="a little hello from us" title="Available puppies" description="Meet the little ones who are ready to find their people. Every puppy has their own story, and it might just begin with you." />
    {puppies === null && !failed ? <div className="puppy-state" role="status" aria-live="polite">Finding the little ones…</div>
      : failed ? <div className="puppy-state" role="alert">We couldn’t load the puppy list. Please refresh the page or contact us on WhatsApp.</div>
      : puppies.length === 0 ? <div className="puppy-state" role="status">No puppies are listed as available right now. Please check back soon.</div>
      : <><div className="puppy-catalogue-grid" aria-label="Available puppies">{puppies.map(p => <PuppyCard puppy={p} key={p.id || p.slug} />)}</div>
        <p className="puppy-catalogue-note">Each little one is unique. Contact us for current photos, videos and details.</p></>}
  </section>;
}
