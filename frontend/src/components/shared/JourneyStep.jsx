export default function JourneyStep({ number, title, description }) {
  return (
    <li className="how-step">
      <span className="how-step-number" aria-hidden="true">{number}</span>
      <p className="how-step-kicker">Step {number}</p>
      <h3>{title}</h3>
      <p className="how-step-description">{description}</p>
    </li>
  );
}
