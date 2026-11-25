import { useLayoutEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PawMark from '../shared/PawMark';
import TeddyRunner from './TeddyRunner';

const ENTRANCE_DURATION = 440;
const RUN_DURATION = 3000;
const EXIT_DURATION = 540;

const pawPrints = [
  { left: '31%', top: '53%', rotation: '-18deg' },
  { left: '36.5%', top: '50%', rotation: '14deg' },
  { left: '42%', top: '54%', rotation: '-15deg' },
  { left: '47.5%', top: '51%', rotation: '17deg' },
  { left: '53%', top: '54%', rotation: '-14deg' },
];

function getPawDelay(left) {
  const viewportWidth = window.innerWidth || 1280;
  const runnerWidth = Math.min(172, Math.max(100, viewportWidth * 0.085));
  const startOffset = runnerWidth * 1.1;
  const travelDistance = viewportWidth * 0.58 + startOffset;
  const pawPosition = (viewportWidth * Number.parseFloat(left)) / 100;
  const passedPositionTime = ((pawPosition + startOffset) / travelDistance) * RUN_DURATION;

  return Math.round(passedPositionTime + 80) + 'ms';
}

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
      data-run-duration-ms={RUN_DURATION}
      data-testid="page-transition"
      role="status"
      aria-live="polite"
      aria-label="TeddyPups page transition"
    >
      <div className="page-transition-track" aria-hidden="true">
        {pawPrints.map((paw, index) => {
          const delay = getPawDelay(paw.left);

          return (
            <span
              className="page-transition-paw"
              data-testid="page-transition-paw"
              data-paw-delay={delay}
              key={index}
              style={{
                left: paw.left,
                top: paw.top,
                '--paw-rotation': paw.rotation,
                '--paw-delay': delay,
              }}
            >
              <PawMark />
            </span>
          );
        })}
        <div className="page-transition-runner">
          <TeddyRunner />
        </div>
      </div>
      <p className="page-transition-message">every puppy is family</p>
    </div>
  );
}
