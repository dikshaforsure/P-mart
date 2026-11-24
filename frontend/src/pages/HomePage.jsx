import { useEffect, useState } from 'react';
import { contentService } from '../services/contentService';
import HomeHero from '../components/home/HomeHero';
import BreedShowcase from '../components/home/BreedShowcase';
import FeaturedPuppies from '../components/home/FeaturedPuppies';
import WaysToMeet from '../components/home/WaysToMeet';
import PuppyJourney from '../components/home/PuppyJourney';
import WhatsAppEnquiry from '../components/home/WhatsAppEnquiry';
import TrustHighlights from '../components/home/TrustHighlights';
import HappyFamiliesPreview from '../components/home/HappyFamiliesPreview';
import FaqPreview from '../components/home/FaqPreview';
import FinalCallToAction from '../components/home/FinalCallToAction';

export default function HomePage() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      contentService.getFeaturedPuppies(6),
      contentService.getWaysToMeet(),
      contentService.getJourneySteps(),
      contentService.getTrustFeatures(),
      contentService.getFamilyPreview(),
      contentService.getFaqPreview(),
    ]).then(([puppies, ways, steps, features, family, faqs]) => {
      if (active) setContent({ puppies, ways, steps, features, family, faqs });
    });
    return () => { active = false; };
  }, []);

  if (!content) return <div className="home-loading" aria-label="Loading homepage"><span>Every puppy is family</span></div>;

  return (
    <>
      <HomeHero />
      <BreedShowcase />
      <FeaturedPuppies puppies={content.puppies} />
      <WaysToMeet ways={content.ways} />
      <PuppyJourney steps={content.steps} />
      <WhatsAppEnquiry />
      <TrustHighlights features={content.features} />
      <HappyFamiliesPreview family={content.family} />
      <FaqPreview faqs={content.faqs} />
      <FinalCallToAction />
    </>
  );
}
