import { useEffect, useRef, useState } from 'react';
import PawMark from '../shared/PawMark';

const TRAIL_DISTANCE = 30;
const TRAIL_INTERVAL = 42;
const TRAIL_LIFETIME = 780;
const MAX_TRAIL_MARKS = 14;

export default function PawTrail() {
  const [marks, setMarks] = useState([]);
  const nextId = useRef(0);
  const lastPoint = useRef(null);
  const timers = useRef(new Map());

  useEffect(() => {
    const supportsFinePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    if (!supportsFinePointer || prefersReducedMotion) return undefined;

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      if (!Number.isFinite(event.clientX) || !Number.isFinite(event.clientY)) return;

      const now = window.performance?.now?.() ?? Date.now();
      const previous = lastPoint.current;
      const dx = previous ? event.clientX - previous.x : 0;
      const dy = previous ? event.clientY - previous.y : 0;
      const distance = Math.hypot(dx, dy);

      if (previous && distance < TRAIL_DISTANCE && now - previous.time < TRAIL_INTERVAL) return;

      lastPoint.current = { x: event.clientX, y: event.clientY, time: now };
      const id = nextId.current + 1;
      nextId.current = id;
      const direction = previous ? (Math.atan2(dy, dx) * 180) / Math.PI + 90 : -18;
      const rotation = direction + (id % 2 === 0 ? 13 : -13);

      setMarks((current) => [
        ...current,
        { id, x: event.clientX, y: event.clientY, rotation, tone: id % 3 },
      ].slice(-MAX_TRAIL_MARKS));

      const timer = window.setTimeout(() => {
        setMarks((current) => current.filter((mark) => mark.id !== id));
        timers.current.delete(id);
      }, TRAIL_LIFETIME);
      timers.current.set(id, timer);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current.clear();
      lastPoint.current = null;
    };
  }, []);

  if (!marks.length) return null;

  return (
    <div className="paw-trail-layer" aria-hidden="true">
      {marks.map((mark) => (
        <span
          className={'paw-trail-stamp paw-trail-stamp--' + mark.tone}
          key={mark.id}
          style={{
            left: mark.x + 'px',
            top: mark.y + 'px',
            '--paw-rotation': mark.rotation + 'deg',
          }}
        >
          <PawMark />
        </span>
      ))}
    </div>
  );
}
