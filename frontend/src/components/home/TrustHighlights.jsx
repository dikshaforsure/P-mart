import SectionHeading from '../common/SectionHeading';

export default function TrustHighlights({ features = [] }) {
  return (
    <section className="trust-section section page-shell">
      <div className="trust-intro"><p className="eyebrow">puppy passport · teddy checked</p><SectionHeading title="Why families trust TeddyPups" description="From health checks and safe travel to 24/7 support, we’re here from the first hello to homecoming." /></div>
      <div className="trust-grid">{features.map((feature) => <article className="trust-item" key={feature.number}><div className="trust-item-top"><span>{feature.number}</span><b aria-hidden="true">{feature.mark}</b></div><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
    </section>
  );
}
