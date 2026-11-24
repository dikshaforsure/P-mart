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

Phase 2 does not add TypeScript, runtime dependencies, backend/API/database code, catalogue filters, sorting or search controls. Test-only development dependencies (Vitest, jsdom and React Testing Library) are added for automated verification. The npm registry could not be resolved in this environment, so dependencies were not installed and the Vite production build could not run. Media reachability and browser/mobile layout still need verification in a network-enabled browser. See the root `TESTING.md` and `PROJECT_PROGRESS.md` for the execution record.


## Phase 2 automated tests

The frontend test suite uses Vitest, jsdom and React Testing Library. From this directory:

```bash
npm install
npm run test
```

`npm run test` runs once and exits with a pass/fail result. Use `npm run test:watch` for interactive watch mode. The current Vitest 5 runner requires Node.js 22.12 or newer.

The automated suite covers:
- JSON-backed puppy filtering, unique/exact slugs, historical records, adjacent navigation and card mapping.
- The puppy content-service methods and homepage featured-puppy links.
- Catalogue loading, populated, empty and failed states, plus URL-backed origin, breed, gender and collection filters.
- Reusable profile rendering for available, sold, local-origin and unknown-slug records, plus real application route wiring.
- Gallery image/video rendering, thumbnail selection, previous/next wrapping, full-screen photo/video viewing with keyboard navigation, captions/metadata and failed/missing-media fallbacks.
- Enquiry form required fields, phone/email validation, prefilled puppy-specific WhatsApp URL, popup handling and safe opener behaviour.

These tests exercise application logic and DOM behavior in jsdom. They do not replace the production build, real-browser responsive checks, external media reachability, native video playback, or manual WhatsApp handoff verification.


GitHub Actions runs this same suite on every push to `develop`, on pull requests targeting `develop`, and on manual workflow dispatch. Workflow definition: `.github/workflows/phase2-tests.yml`.


Latest recorded CI result: GitHub Actions run [#2](https://github.com/dikshaforsure/P-mart/actions/runs/45454988634) passed all 10 test files and 44 tests on 24 November 2026. See the execution record in the root `TESTING.md`.


## Phase 3 profile reference-fidelity audit follow-up

The existing reusable puppy profile was audited against the individual available and sold reference templates. The follow-up aligns the page with the reference's three numbered chapters, framed puppy-information board, care paper nested below the board, dotted origin journey and separate unnumbered enquiry letter. The paw stamp now sits on the letter itself.

Profile-only CSS remains scoped under `.tp-profile-storybook` and `.tp-profile-*`. The gallery thumbnail strip now scrolls horizontally, its stage uses the reference ratios at mobile and wider widths, and the desktop information column/tablet layout follows the reference breakpoints.

The existing profile data, exact-slug lookup, available/sold handling, origin-driven journey, adjacency service, gallery/lightbox behavior and puppy-specific WhatsApp enquiry remain intact. No catalogue files, data/services, route definitions, gallery component or gallery tests were changed.

GitHub Actions [run #13](https://github.com/dikshaforsure/P-mart/actions/runs/45465525378) passed the focused profile/form/gallery checks (**3 files / 19 tests**), the complete frontend suite (**10 files / 47 tests**) and the Vite production build. Real-browser desktop/tablet/mobile visual validation and external media playback/network checks have not yet been performed; see root `TESTING.md`.

The five placeholder routes (Gone home, Happy families, How it works, FAQ and Contact), homepage refinement and shared header/footer work remain in the broader project backlog.
