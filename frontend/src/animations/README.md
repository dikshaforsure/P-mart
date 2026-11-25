# Animation conventions

- Prefer CSS transitions/keyframes for short, decorative effects.
- Use `useScrollReveal` / IntersectionObserver for one-time entrance reveals.
- Every observer/listener/animation frame must be cleaned up by its owning hook.
- Respect `prefers-reduced-motion`; do not animate solely for decoration.
- Do not add animation dependencies until a measured reference effect requires one.
