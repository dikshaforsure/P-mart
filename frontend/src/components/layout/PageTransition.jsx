import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PawMark from '../shared/PawMark';
import TeddyRunner from './TeddyRunner';

const ENTRANCE_DURATION = 440;
const RUN_DURATION = 3200;
const EXIT_DURATION = 540;

const pawPrints = [
  { left: '27%', top: '50%', rotation: '-17deg' },
  { left: '31.5%', top: '52%', rotation: '13deg' },
  { left: '36%', top: '49%', rotation: '-12deg' },
  { left: '40.5%', top: '52%', rotation: '16deg' },
  { left: '45%', top: '49%', rotation: '-15deg' },
];

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

function getPawDelay(left, viewportWidth) {
  const runnerWidth = Math.min(190, Math.max(132, viewportWidth * 0.1));
  const initialCenterOffset = runnerWidth;
  const totalTravel = viewportWidth * 0.5 + runnerWidth * 1.5;
  const pawPosition = (viewportWidth * Number.parseFloat(left)) / 100;
  const passedPositionTime = ((pawPosition + initialCenterOffset) / totalTravel) * RUN_DURATION;

  return `${Math.round(passedPositionTime + 120)}ms`;
}

export default function PageTransition({ onActiveChange }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(pathname);
  const pendingNavigation = useRef(null);
  const navigatingBehindCurtain = useRef(false);
  const phaseRef = useRef('entering');
  const [phase, setPhase] = useState('entering');
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth || 1280);

  const updatePhase = useCallback((nextPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
    onActiveChange?.(nextPhase !== 'idle');
  }, [onActiveChange]);

  useLayoutEffect(() => {
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;

    if (prefersReducedMotion()) {
      pendingNavigation.current = null;
      navigatingBehindCurtain.current = false;
      updatePhase('idle');
      return;
    }

    if (!pathChanged) {
      if (phaseRef.current !== 'idle') onActiveChange?.(true);
      return;
    }

    if (navigatingBehindCurtain.current) {
      navigatingBehindCurtain.current = false;
      updatePhase('running');
      return;
    }

    // Browser back/forward and programmatic navigation cannot be held before
    // the router commits; this layout effect covers the destination before paint.
    pendingNavigation.current = null;
    updatePhase('entering');
  }, [pathname, onActiveChange, updatePhase]);

  useEffect(() => {
    const updateViewport = () => setViewportWidth(window.innerWidth || 1280);
    window.addEventListener('resize', updateViewport, { passive: true });

    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const anchor = event.target?.closest?.('a[href]');
      if (!anchor || anchor.hasAttribute('download') || anchor.hasAttribute('data-no-transition')) return;

      const target = (anchor.getAttribute('target') || '').toLowerCase();
      if (target && target !== '_self') return;
      if (anchor.rel.split(/\s+/).includes('external')) return;

      if (phaseRef.current !== 'idle' || pendingNavigation.current) {
        event.preventDefault();
        return;
      }
      if (prefersReducedMotion()) return;

      let destination;
      try {
        destination = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (destination.origin !== window.location.origin || destination.pathname === pathname) return;

      event.preventDefault();
      pendingNavigation.current = `${destination.pathname}${destination.search}${destination.hash}`;
      updatePhase('entering');
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  }, [navigate, pathname, updatePhase]);

  useEffect(() => {
    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mediaQuery?.addEventListener) return undefined;

    const handlePreferenceChange = (event) => {
      if (!event.matches) return;
      pendingNavigation.current = null;
      navigatingBehindCurtain.current = false;
      updatePhase('idle');
    };

    mediaQuery.addEventListener('change', handlePreferenceChange);
    return () => mediaQuery.removeEventListener('change', handlePreferenceChange);
  }, [updatePhase]);

  const handleCurtainAnimationEnd = (event) => {
    if (event.target !== event.currentTarget) return;

    if (event.animationName === 'page-transition-drop' && phaseRef.current === 'entering') {
      const destination = pendingNavigation.current;
      if (destination) {
        pendingNavigation.current = null;
        navigatingBehindCurtain.current = true;
        navigate(destination);
      } else {
        updatePhase('running');
      }
      return;
    }

    if (event.animationName === 'page-transition-lift' && phaseRef.current === 'exiting') {
      updatePhase('idle');
    }
  };

  const handleRunnerAnimationEnd = (event) => {
    if (
      event.target === event.currentTarget &&
      event.animationName === 'page-transition-run-across' &&
      phaseRef.current === 'running'
    ) {
      updatePhase('exiting');
    }
  };

  if (phase === 'idle') return null;

  return (
    <div
      className="page-transition-curtain"
      data-phase={phase}
      data-run-duration-ms={RUN_DURATION}
      data-testid="page-transition"
      aria-hidden="true"
      onAnimationEnd={handleCurtainAnimationEnd}
    >
      <div className="page-transition-track">
        {pawPrints.map((paw, index) => {
          const delay = getPawDelay(paw.left, viewportWidth);

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
        <div className="page-transition-runner" data-testid="page-transition-runner" onAnimationEnd={handleRunnerAnimationEnd}>
          <TeddyRunner />
        </div>
      </div>
      <p className="page-transition-message">every puppy is family</p>
    </div>
  );
}
