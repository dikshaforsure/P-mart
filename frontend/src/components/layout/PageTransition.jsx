import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PawMark from '../shared/PawMark';
import TeddyRunner from './TeddyRunner';

const ENTRANCE_DURATION = 440;
const RUN_DURATION = 1480;
const EXIT_DURATION = 540;

const pawPrints = [
  { left: '12%', top: '49%', rotation: '-18deg', delay: '0.1s' },
  { left: '23%', top: '53%', rotation: '14deg', delay: '0.27s' },
  { left: '34%', top: '48%', rotation: '-15deg', delay: '0.44s' },
  { left: '45%', top: '53%', rotation: '17deg', delay: '0.61s' },
  { left: '56%', top: '48%', rotation: '-14deg', delay: '0.78s' },
  { left: '67%', top: '53%', rotation: '16deg', delay: '0.95s' },
];

export default function PageTransition() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  const [phase, setPhase] = useState('idle');

  useLayoutEffect(() => {
    if (previousPath.current === pathname) return undefined;
    previousPath.current = pathname;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (prefersReducedMotion) {
      setPhase('idle');
      return undefined;
    }

    setPhase('entering');

    const runningTimer = window.setTimeout(() => {
      setPhase('running');
    }, ENTRANCE_DURATION);

    const exitingTimer = window.setTimeout(() => {
      setPhase('exiting');
    }, ENTRANCE_DURATION + RUN_DURATION);

    const finishTimer = window.setTimeout(() => {
      setPhase('idle');
    }, ENTRANCE_DURATION + RUN_DURATION + EXIT_DURATION);

    return () => {
      window.clearTimeout(runningTimer);
      window.clearTimeout(exitingTimer);
      window.clearTimeout(finishTimer);
    };
  }, [pathname]);

  if (phase === 'idle') return null;

  return (
    <div
      className="page-transition-curtain"
      data-phase={phase}
      data-testid="page-transition"
      role="status"
      aria-live="polite"
      aria-label="TeddyPups page transition"
    >
      <div className="page-transition-track" aria-hidden="true">
        {pawPrints.map((paw, index) => (
          <span
            className="page-transition-paw"
            data-testid="page-transition-paw"
            key={index}
            style={{
              left: paw.left,
              top: paw.top,
              '--paw-rotation': paw.rotation,
              '--paw-delay': paw.delay,
            }}
          >
            <PawMark />
          </span>
        ))}
        <div className="page-transition-runner">
          <TeddyRunner />
        </div>
      </div>
      <p className="page-transition-message">every puppy is family</p>
    </div>
  );
}
