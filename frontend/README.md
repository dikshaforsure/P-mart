# TeddyPups Frontend

Frontend application for the TeddyPups website project. This directory is intentionally self-contained so the repository can later host a separate `backend/` application.

## Requirements

- Node.js 20.19+ (or 22.12+)
- npm 10+

## Install and run

```bash
cd frontend
npm install
npm run dev
```

Vite prints the local development URL (normally http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Structure

```text
src/
├── app/                 # Router and app composition
├── animations/          # Animation conventions and future shared effects
├── assets/              # Local image/video assets (add only approved source assets)
├── components/
│   ├── common/          # Small reusable presentation components
│   ├── home/            # Independent homepage sections
│   └── layout/          # Header, footer and shared page shell
├── data/                # Local fixture content for the current frontend phase
├── hooks/               # Reusable React hooks
├── pages/               # Route-level page components and placeholders
├── services/            # Data-access contract, replaceable by REST calls later
├── styles/              # Tailwind entry and project design styles
├── utils/               # Small pure helpers
└── main.jsx             # Vite/React entry point
```

## Data/API boundary

Homepage sections request content from `src/services/contentService.js`. The current service returns local JavaScript fixtures from `src/data/siteContent.js`; no backend, API persistence or database is involved. Later, the service functions can call the Express API while keeping section components unchanged.

## Assets

The homepage currently references the original image URLs exposed by the supplied `puppy.instabizweb.com` pages. These mappings are centralised in `src/data/referenceAssets.js` and documented in `ASSET_SOURCES.md`. They are remote references, not downloaded files. Confirm reuse rights before production use; once approved, move the originals to `src/assets/images/` or a project-owned CDN. No video files have been added. Do not replace reference media with unrelated stock imagery.

## Routing

Implemented page routes are `/`, `/puppies`, `/puppies/:slug`, `/gone-home`, `/happy-families`, `/how-it-works`, `/faq`, and `/contact`. Non-home routes are placeholders in this phase.

## Notes

- JavaScript and JSX only; no TypeScript files.
- React Router handles client-side navigation.
- Tailwind CSS is installed through its Vite plugin. The additional `index.css` contains project-specific design styles.
- No backend, form persistence, admin panel or puppy catalogue implementation is part of this phase.
- The displayed WhatsApp number is copied from the reference page; confirm that it is the intended live destination before production use. The email and social destination URLs have not been verified.
