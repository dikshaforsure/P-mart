import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWhatsAppUrl } from '../utils/whatsapp';
import PageIntro from '../components/shared/PageIntro';
import SectionHeading from '../components/shared/SectionHeading';
import JourneyStep from '../components/shared/JourneyStep';
import { deliveryOptions, journeyOptions, puppyPromiseItems, whyChooseItems } from '../data/howItWorksContent';

function JourneyPostcard({ type, label }) {
  if (type === 'local') {
    return (
      <div className="how-postcard how-postcard-local" aria-hidden="true">
        <span className="how-postcard-sun" />
        <svg viewBox="0 0 300 120" preserveAspectRatio="none">
          <path d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28" />
        </svg>
        <span className="how-postcard-place">{label}</span>
      </div>
    );
  }

  return (
    <div className="how-postcard how-postcard-imported" aria-hidden="true">
      <svg className="how-postcard-route" viewBox="0 0 320 150" preserveAspectRatio="none">
        <path d="M28 128C90 20 230 20 292 118" />
      </svg>
      <svg className="how-postcard-plane" viewBox="0 0 64 40">
        <path d="M4 22l20-2 12-14h6l-6 14 14-1 6-7h4l-3 10 3 10h-4l-6-7-14-1 6 14h-6L24 24 4 22z" />
      </svg>
      <span className="how-postcard-from">{label}</span>
      <span className="how-postcard-to">Dubai</span>
    </div>
  );
}

export default function HowItWorksPage() {
  const [activeJourney, setActiveJourney] = useState('local');
  const tabRefs = useRef({});

  const selectJourney = (journey) => {
    setActiveJourney(journey);
    tabRefs.current[journey]?.focus();
  };

  const handleTabKeyDown = (event) => {
    const order = ['local', 'imported'];
    const currentIndex = order.indexOf(activeJourney);
    let next = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = order[(currentIndex + 1) % order.length];
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = order[(currentIndex - 1 + order.length) % order.length];
    if (event.key === 'Home') next = order[0];
    if (event.key === 'End') next = order[order.length - 1];
    if (next) {
      event.preventDefault();
      selectJourney(next);
    }
  };

  return (
    <article className="how-page">
      <div className="how-page-shell page-shell">
        <PageIntro
          eyebrow="A little guide"
          title="How it works"
          description="Whether you choose to visit us locally or ask about a premium breed from overseas, TeddyPups is here to guide you through the experience."
        />

        <nav className="how-page-toc" aria-label="On this page">
          <a href="#two-ways"><span>1</span>Two ways home</a>
          <a href="#promise"><span>2</span>Our puppy promise</a>
          <a href="#delivery"><span>3</span>Delivery & collection</a>
          <a href="#why"><span>4</span>Why choose us</a>
        </nav>

        <section className="how-journeys" id="two-ways" aria-labelledby="two-ways-title">
          <div className="how-journeys-top">
            <SectionHeading number="1" eyebrow="choose your way" title="Two ways home" id="two-ways-title" />
            <div className="how-journeys-pick">
              <div className="how-switch" role="tablist" aria-label="Ways to bring your puppy home" onKeyDown={handleTabKeyDown}>
                <span className="how-switch-thumb" aria-hidden="true" style={{ '--at': activeJourney === 'imported' ? 1 : 0 }} />
                {Object.values(journeyOptions).map((journey) => (
                  <button
                    key={journey.id}
                    ref={(node) => { tabRefs.current[journey.id] = node; }}
                    type="button"
                    role="tab"
                    id={`tab-${journey.id}`}
                    aria-selected={activeJourney === journey.id}
                    aria-controls={`panel-${journey.id}`}
                    tabIndex={activeJourney === journey.id ? 0 : -1}
                    className="how-switch-tab"
                    onClick={() => setActiveJourney(journey.id)}
                  >
                    <span>{journey.label}</span>
                    <small>{journey.hint}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="how-journey-panel" id="panel-local" role="tabpanel" aria-labelledby="tab-local" hidden={activeJourney !== 'local'} tabIndex={0}>
            <div className="how-journey-head">
              <div>
                <h3>{journeyOptions.local.title}</h3>
                <p>{journeyOptions.local.description}</p>
              </div>
              <JourneyPostcard type="local" label={journeyOptions.local.postcardLabel} />
            </div>
            <ol className="how-steps">
              {journeyOptions.local.steps.map((step) => <JourneyStep key={step.number} {...step} />)}
            </ol>
          </div>

          <div className="how-journey-panel" id="panel-imported" role="tabpanel" aria-labelledby="tab-imported" hidden={activeJourney !== 'imported'} tabIndex={0}>
            <div className="how-journey-head">
              <div>
                <h3>{journeyOptions.imported.title}</h3>
                <p>{journeyOptions.imported.description}</p>
                <p className="how-journey-note">From Europe and Korea to Dubai, the available options depend on the breed and request.</p>
              </div>
              <JourneyPostcard type="imported" label={journeyOptions.imported.postcardLabel} />
            </div>
            <ol className="how-steps">
              {journeyOptions.imported.steps.map((step) => <JourneyStep key={step.number} {...step} />)}
            </ol>
          </div>
        </section>

        <section className="how-paper-section" id="promise" aria-labelledby="promise-title">
          <div className="how-paper">
            <SectionHeading number="2" eyebrow="puppy passport" title="Our premium puppy promise" id="promise-title" description="The details that help you make an informed decision and feel supported along the way." />
            <ul className="how-promise-grid">
              {puppyPromiseItems.map((item) => (
                <li className="how-promise-item" key={item.mark}>
                  <span>{item.mark}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="how-delivery-section" id="delivery" aria-labelledby="delivery-title">
          <SectionHeading number="3" eyebrow="the last little mile" title="Delivery & collection" id="delivery-title" description="From a visit in Downtown Dubai to an international journey, the team can explain the options for the puppy you are considering." />
          <ul className="how-delivery-grid">
            {deliveryOptions.map((item) => (
              <li className="how-delivery-card" key={item.mark}>
                <span>{item.mark}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="how-why-section" id="why" aria-labelledby="why-title">
          <div className="how-why-copy">
            <SectionHeading number="4" eyebrow="every step of the way" title="Why choose us" id="why-title" description="We want the process of finding your new family member to feel considered, clear and full of care." />
            <div className="how-why-actions">
              <Link className="button button-dark" to="/puppies">Meet the puppies <span aria-hidden="true">↗</span></Link>
              <Link className="button button-outline" to="/faq">Read the FAQs <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <ul className="how-why-list">
            {whyChooseItems.map((item) => (
              <li key={item.title}>
                <span aria-hidden="true">{item.mark}</span>
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </li>
            ))}
          </ul>
        </section>

        <div className="how-bottom-cta">
          <div><p className="how-bottom-kicker">Still deciding?</p><h2>A little question is always welcome.</h2></div>
          <a className="button button-dark" href={getWhatsAppUrl('Hi TeddyPups! I have a question about the puppy journey.') } target="_blank" rel="noreferrer">Ask us on WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  );
}
