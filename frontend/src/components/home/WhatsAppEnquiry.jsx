import { getWhatsAppUrl } from '../../utils/whatsapp';

const breeds = ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];

export default function WhatsAppEnquiry() {
  return (
    <section className="whatsapp-section">
      <div className="whatsapp-inner page-shell">
        <div className="whatsapp-copy">
          <p className="eyebrow">a little note, a big hello</p>
          <h2>Not sure who<br />your <em>one</em> is yet?</h2>
          <p>Tell us what kind of little friend you’re dreaming of. We’ll guide you based on availability and your lifestyle.</p>
          <a className="button button-light" href={getWhatsAppUrl("Hi TeddyPups! I'd love help finding the right puppy for me.")} target="_blank" rel="noreferrer">Say hello on WhatsApp <span>↗</span></a>
        </div>
        <div className="chat-card" aria-label="Illustration of a WhatsApp enquiry conversation">
          <div className="chat-top"><span className="chat-avatar">T</span><div><strong>TeddyPups U.A.E.</strong><small>online · here for you</small></div><span className="chat-dots">···</span></div>
          <div className="chat-body"><p className="chat-time">TODAY · A LITTLE HELLO</p><div className="chat-bubble chat-in">Hi TeddyPups! I’d love to know more about your puppies.</div><div className="chat-bubble chat-out">Select your preferred breed or tell us what you’re looking for. We’ll guide you based on availability and your lifestyle.</div><p className="chat-prompt">A few of our little favourites</p><div className="chat-breed-list">{breeds.map((breed) => <a key={breed} href={getWhatsAppUrl(`Hi TeddyPups! I’m interested in a ${breed}.`)} target="_blank" rel="noreferrer">{breed} ↗</a>)}</div><div className="chat-input-fake"><span>Write a little message...</span><span>➤</span></div></div>
          <span className="chat-footnote">a friendly illustration · not a live chat</span>
        </div>
      </div>
    </section>
  );
}
