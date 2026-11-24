# TeddyPups Frontend

Frontend application for the TeddyPups website. The Phase 1 Vite/React application, homepage and shared layout remain the foundation; Phase 2 adds the puppy catalogue and reusable profile experience.

## Requirements and commands

- Node.js 20.19+ (or 22.12+)
- npm 10+

```bash
cd frontend
npm install
npm run dev
npm run build
npm run preview
```

Vite normally serves the app at http://localhost:5173.

## Structure

```text
src/
├── app/                 # React Router and app composition
├── components/
│   ├── common/          # Shared presentation components
│   ├── home/            # Phase 1 homepage sections
│   ├── layout/          # Shared header, footer and page shell
│   └── puppies/         # Reusable puppy cards, gallery and note form
├── data/
│   ├── puppies.json     # 42 current/historical puppy records
│   ├── breeds.json      # Breed reference data
│   ├── pages.json       # Reference page/route metadata
│   ├── faq.json         # FAQ snapshot, reserved for later phase
│   ├── families.json    # Family image snapshot, reserved for later phase
│   ├── home-families.json
│   ├── puppyData.js     # JSON access, filtering, slug lookup and mapping
│   ├── siteContent.js   # Non-puppy homepage copy and settings
│   └── referenceAssets.js
├── pages/               # Homepage, puppy catalogue, profile and placeholders
├── services/            # Existing content/data access boundary
├── styles/              # Shared Phase 1 tokens plus scoped Phase 2 styles
└── utils/               # WhatsApp link helper and small utilities
```

## Puppy data and routes

The JSON files remain the structured content source. `puppyData.js` imports `puppies.json` and `breeds.json`; all 42 records are retained. The catalogue filters only records with `status === "available"` and `published !== false`. Profile lookup uses exact `slug` values and never derives slugs from names. Previous/next links are calculated from the available-record order.

- `/` — existing Phase 1 homepage (preserved).
- `/puppies` — responsive, data-driven list of currently available snapshot records.
- `/puppies/:slug` — one reusable profile for any record in the 42-record dataset. Sold records remain accessible as historical profiles; unknown slugs show a not-found state.
- `/gone-home`, `/happy-families`, `/how-it-works`, `/faq`, `/contact` — unchanged placeholders for later phases.

All 15 available JSON slugs match the 15 available path keys in `pages.json`. The JSON currently labels these origins as imported. A different, currently crawlable TeddyPups hostname lists all 15 as “In Dubai”; the supplied `puppy.instabizweb.com` host was not directly accessible during this phase. The JSON origins were therefore retained rather than silently changed based on another hostname.

## Gallery and enquiry

The gallery uses the source `media[]` metadata and varies with each puppy. Images and videos are rendered with different elements; videos have native playback controls and their supplied poster, dimensions, duration, alt text and focal point. Thumbnails, previous/next controls, captions and unavailable-media fallbacks are included.

Media URLs remain remote references to the source host. No image/video binaries have been downloaded. Profile WhatsApp actions contain the selected puppy name and slug. The note form validates locally and opens a prefilled WhatsApp message; nothing is persisted or submitted to a backend.

## Verification and limitations

Phase 2 does not add TypeScript, dependencies, backend/API/database code, catalogue filters, sorting or search controls. The npm registry could not be resolved in this environment, so dependencies were not installed and the Vite production build could not run. Media reachability and browser/mobile layout still need verification in a network-enabled browser. See the root `TESTING.md` and `PROJECT_PROGRESS.md` for the execution record.
