import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PawMark from '../shared/PawMark';
import TeddyRunner from './TeddyRunner';

const ENTRANCE_DURATION = 440;
const DEFAULT_RUN_DURATION = 2700;
const MIN_RUN_DURATION = 2200;
const MAX_RUN_DURATION = 3200;
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

function getRunDuration() {
  const connection = typeof navigator === 'undefined'
    ? undefined
    : navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) return DEFAULT_RUN_DURATION;

  const effectiveType = connection.effectiveType;
  const downlink = Number(connection.downlink);

  if (effectiveType === 'slow-2g') return MAX_RUN_DURATION;
  if (effectiveType === '2g') return 3000;
  if (effectiveType === '3g') return DEFAULT_RUN_DURATION;

  if (effectiveType === '4g') {
    if (Number.isFinite(downlink) && downlink > 0) {
      const speedProgress = Math.min(1, Math.max(0, (downlink - 1) / 9));
      return Math.round(2900 - speedProgress * 700);
    }
    return 2400;
  }

  if (Number.isFinite(downlink) && downlink > 0) {
    const estimate = 3100 - Math.log2(1 + downlink) * 350;
    return Math.round(Math.min(MAX_RUN_DURATION, Math.max(MIN_RUN_DURATION, estimate)));
  }

  return DEFAULT_RUN_DURATION;
}

function getRunnerWidth(viewportWidth) {
  return Math.min(190, Math.max(132, viewportWidth * 0.1));
}

function getRunnerStartOffset(viewportWidth) {
  return Math.round(Math.min(32, Math.max(18, viewportWidth * 0.025)) * 10) / 10;
}

function getStrideHalfDuration(viewportWidth, runDuration, startOffset) {
  const runnerWidth = getRunnerWidth(viewportWidth);
  const travelDistance = Math.max(1, viewportWidth * 0.5 - startOffset);
  const referenceStrideDistance = (runnerWidth / 300) * 92;
  const estimatedHalfDuration = (runDuration * referenceStrideDistance) / (travelDistance * 2);

  return Math.round(Math.min(200, Math.max(90, estimatedHalfDuration)));
}

function getPawDelay(left, viewportWidth, runDuration, runnerStartOffset) {
  const runnerWidth = getRunnerWidth(viewportWidth);
  const trailingEdgeOffset = runnerWidth * 0.55;
  const totalTravel = Math.max(1, viewportWidth * 0.5 - runnerStartOffset);
  const pawPosition = (viewportWidth * Number.parseFloat(left)) / 100;
  const passedDistance = Math.max(0, pawPosition - trailingEdgeOffset - runnerStartOffset);
  const passedPositionTime = Math.min(runDuration - 120, (passedDistance / totalTravel) * runDuration);

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
  const [runDuration, setRunDuration] = useState(() => getRunDuration());

  const updatePhase = useCallback((nextPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
    onActiveChange?.(nextPhase !== 'idle');
  }, [onActiveChange]);

  const startTransition = useCallback(() => {
    setRunDuration(getRunDuration());
    updatePhase('entering');
  }, [updatePhase]);

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
    startTransition();
  }, [pathname, onActiveChange, startTransition]);

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
      startTransition();
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  }, [navigate, pathname, startTransition]);

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

  const runnerStartOffset = getRunnerStartOffset(viewportWidth);
  const strideHalfDuration = getStrideHalfDuration(viewportWidth, runDuration, runnerStartOffset);
  const runnerStyle = {
    '--runner-start-offset': `${runnerStartOffset}px`,
    '--runner-run-duration': `${runDuration}ms`,
    '--runner-stride-duration': `${strideHalfDuration}ms`,
    '--runner-diagonal-offset': `-${strideHalfDuration}ms`,
    '--runner-head-lag': `-${Math.max(14, Math.round(strideHalfDuration * 0.18))}ms`,
    '--runner-tail-duration': `${Math.round(strideHalfDuration * 1.35)}ms`,
  };

  if (phase === 'idle') return null;

  return (
    <div
      className="page-transition-curtain"
      data-phase={phase}
      data-run-duration-ms={runDuration}
      data-runner-start-offset-px={runnerStartOffset}
      data-testid="page-transition"
      aria-hidden="true"
      onAnimationEnd={handleCurtainAnimationEnd}
    >
      <div className="page-transition-track">
        {pawPrints.map((paw, index) => {
          const delay = getPawDelay(paw.left, viewportWidth, runDuration, runnerStartOffset);

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
        <div
          className="page-transition-runner"
          data-testid="page-transition-runner"
          style={runnerStyle}
          onAnimationEnd={handleRunnerAnimationEnd}
        >
          <TeddyRunner />
        </div>
      </div>
      <p className="page-transition-message">every puppy is family</p>
    </div>
  );
}
