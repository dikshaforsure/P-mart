# TeddyPups — Testing Strategy and Evidence

**Phase 0 status:** Strategy documented; no application tests executed. All planned checks are **NOT RUN** until actually performed and recorded.

## 1. Principles

Test each phase boundary before expanding scope. Use unit tests for pure functions/validators, integration tests for Express/Mongo and browser E2E for user flows. Use isolated test databases and deterministic fixtures; never use production customer data. Record exact commands, runtime, date, commit, pass/fail/skip counts and unresolved failures. Visual fidelity, touch behaviour, animation and production behaviour require manual checks.

## 2. Proposed tooling

- Frontend: Vitest + React Testing Library.
- Backend/API: Node test runner or Vitest/Jest with Supertest.
- Browser E2E: Playwright.
- Accessibility: axe-core with Playwright plus keyboard/manual review.
- ESLint/Prettier only if configured consistently in foundation phase.

Choose a minimal compatible set in Phase 1; do not install every option by default.

## 3. Frontend matrix

| Area | Checks | Status |
|---|---|---|
| Routing | All public paths, 404, deep-link refresh, back/forward | NOT RUN — app absent |
| Shared layout | Header/footer on all pages, active nav, destinations | NOT RUN |
| Mobile menu | Open/close, Escape, focus restore, scroll lock | NOT RUN |
| Catalogue | Source records, empty/loading/error states, confirmed filters/count/clear | NOT RUN |
| Puppy profile | Slug lookup, 404, variable media, facts, adjacent links | NOT RUN |
| Gallery | Thumbnail, arrows, video, lightbox/Escape | NOT RUN |
| FAQ | Search, no-results, accessible accordion | NOT RUN |
| How it works | Tabs, anchors, keyboard support | NOT RUN |
| Contact/enquiry | Required fields, optional fields, server errors, success/failure, honeypot | NOT RUN |
| Family gallery | Count, alt text, responsive columns, viewer if confirmed | NOT RUN |
| Performance | Lazy images, deferred video, layout stability, bundle size | NOT RUN |

## 4. Backend/API matrix

| Area/endpoint | Cases | Status |
|---|---|---|
| Health | API up; DB readiness; no secret leakage | NOT RUN |
| GET puppies | Defaults, pagination, empty, invalid facets, max limit, stable sort | NOT RUN |
| GET puppy by slug | Existing, unknown and malformed slug | NOT RUN |
| GET gone-home | Correct status data and pagination | NOT RUN |
| GET family moments | Published-only, ordering and pagination | NOT RUN |
| GET FAQs | Published-only, query search and empty result | NOT RUN |
| POST enquiries | Valid payload; missing required fields; malformed email; phone edge cases; long text; unexpected fields | NOT RUN |
| Spam controls | Populated honeypot, rate threshold, oversized request, proxy correctness | NOT RUN |
| Errors | Validation, 404, DB unavailable and unexpected exception; safe response | NOT RUN |
| Admin (conditional) | Anonymous 401/403, valid/invalid login, expiry, logout, authorization, CSRF | NOT RUN |

A successful enquiry test must assert the record in the isolated test database, not just HTTP 201.

## 5. Database checks

- Connect with test URI.
- Required fields/enums and invalid schema data.
- Unique puppy slug index.
- Catalogue indexes match actual query patterns.
- Enquiry source and optional puppy references.
- Seed idempotence/no duplicates.
- Safe behaviour during DB outage.
- No secrets or real personal records in fixtures.

**Status:** NOT RUN — models and DB configuration do not exist.

## 6. Responsive/visual regression

Compare reference and clone at 360×800, 390×844, 768×1024, 1024×768 and 1440×900. Capture route tops and key sections. Compare section order, max width, gutters, typography, line height, card ratio/gaps, image crop, CTA sizing and footer. Check 200% zoom, horizontal overflow, mobile orientation, safe-area insets, menu, gallery, forms and sticky controls. Record intentional deviations.

**Status:** NOT RUN — clone UI absent and reference viewport screenshots not captured.

## 7. Accessibility

- Keyboard navigation for nav, buttons, tabs, accordion, gallery and forms.
- Visible focus and logical order.
- Semantic headings, landmarks and labels.
- Accessible button names and meaningful image alt text.
- Correct tabs/accordion ARIA state and relationships.
- Gallery dialog focus management, Escape, current-item label and focus restoration.
- Field errors associated with inputs.
- Contrast measured after design tokens are known.
- Reduced-motion support and usable touch targets.

**Status:** NOT RUN.

## 8. Security

- No secrets in Git or browser bundle.
- Independent server-side validation.
- CORS allowlist and security headers.
- Request size limits, enquiry rate limiting and honeypot.
- Safe errors without stack traces.
- Admin authentication/authorization if included.
- Strong password hashes; never plaintext.
- Secure HttpOnly/SameSite cookies and CSRF strategy if cookie auth.
- Login throttling and no account enumeration.
- Dependency audit before deployment.
- Restricted MongoDB user/network and backup review.

**Status:** NOT RUN — server/authentication absent.

## 9. Browser compatibility

Test latest stable Chrome/Chromium desktop and Android, Firefox desktop, Safari macOS/iOS and Edge desktop. Verify CSS layout, sticky/fixed elements, video controls/formats, form controls, browser history/deep links and reduced motion.

**Status:** NOT RUN.

## 10. End-to-end user journeys

1. Home → catalogue → Max profile → gallery media → WhatsApp.
2. Open a profile with longer gallery and verify actual count/media.
3. Previous/next navigation and browser back.
4. Search FAQ and open/close an answer.
5. Switch local/imported journey tab.
6. Submit valid contact enquiry and assert Mongo persistence.
7. Submit invalid data; verify field errors, honeypot and rate limit.
8. Navigate gone-home and happy families on mobile.
9. If admin exists: log in, change availability, verify public list.
10. Unknown slug and API/database outage render safe, useful UI.

**Status:** NOT RUN — application absent.

## 11. Deployment smoke tests

Verify HTTPS frontend/API, direct route refresh, production CORS, MongoDB connection/seed, CDN media, controlled enquiry submission (staging/test unless live submission approved), safe logs and server-side secrets. Record deployment ID/commit and test date.

**Status:** NOT RUN — not deployed.

## 12. Execution log

| Date | Phase | Action | Environment | Result |
|---|---|---|---|---|
| 24 Nov 2026 | 0 | GitHub metadata/tree/README/history inspection | GitHub remote | Research completed; not an app test |
| 24 Nov 2026 | 0 | Public reference route inspection | Supplied live host | Content/route research only; viewport/interaction tests not run |

## 13. Evidence rule

For every executed test record exact command/manual steps, tested commit, environment (Node/browser/database), expected and actual result, pass/fail/skip counts and remaining issues. Do not label proposed tests as passed.


## 14. Phase 1 execution record — frontend foundation

**Date:** 24 November 2026

| Command/check | Result | Evidence / limitation |
|---|---|---|
| `node -v` | PASS | v22.16.0 |
| `npm -v` | PASS | 10.9.2 |
| `node --check` on Vite config, data, service, helper and hook JS files | PASS | All selected plain JS files parsed |
| TypeScript compiler parser via `transpileModule` over all `.js`/`.jsx` source files | PASS | 25 files parsed; 0 syntax diagnostics. Parser only; not included in app dependencies |
| Custom relative-import resolution scan | PASS | All relative imports resolve to local files |
| Custom TypeScript-file scan | PASS | No .ts or .tsx files found |
| CSS brace balance | PASS | 326 opening and 326 closing braces |
| `npm create vite@latest . -- --template react --no-interactive` | BLOCKED | Command timed out before creating files; scaffold then written explicitly |
| `npm install --no-audit --no-fund --fetch-retries=0 --fetch-timeout=20000` | BLOCKED | npm returned EAI_AGAIN while resolving registry.npmjs.org |
| `npm run dev` | NOT RUN | Dependencies unavailable |
| `npm run build` | NOT RUN | Dependencies unavailable |
| Browser visual/mobile checks | NOT RUN | No development server or browser automation available |
| Browser console checks | NOT RUN | No running app |

This is not a passing application build. Re-run dependency installation, dev server and production build locally once npm registry access is available. Manual visual checks remain required at 360, 390, 768, 1024 and 1440px.


Additional Phase 1 command outcomes:
- `npm run dev -- --host 0.0.0.0` — BLOCKED, exit 127: `sh: 1: vite: not found` (dependencies were not installed).
- `npm run build` — BLOCKED, exit 127: `sh: 1: vite: not found` (dependencies were not installed).


## 15. Phase 2 execution record — puppy catalogue and profiles (24 November 2026)

### Dataset and reference checks
| Check | Result | Evidence / caveat |
|---|---|---|
| Parse all six JSON files | PASS | All six JSON sources parsed from the current `develop` branch |
| Puppy records/statuses | PASS | 42 total; 15 available; 27 sold |
| Puppy slug uniqueness | PASS | 42 unique slugs; no duplicates |
| Available profile route coverage | PASS | All 15 available slugs match exact `/puppies/<slug>` keys in `pages.json` |
| Supporting dataset counts | PASS | 8 breeds, 9 FAQs, 64 `families.json` entries, 64 `home-families.json` entries |
| Available media metadata | PASS | 51 image records and 6 video records across 15 available puppies |
| Current listing/profile comparison | PASS WITH HOST CAVEAT | The accessible `teddypups.ae` host lists 15; all 15 corresponding profile paths were opened. Display name, breed, gender, age and gallery item count matched the JSON snapshot for the accessible crawl |
| Exact supplied host comparison | BLOCKED | `puppy.instabizweb.com` catalogue/profile paths could not be fetched directly in this run. Do not claim that the alternate hostname is identical |
| Origin/location reconciliation | UNRESOLVED | `puppies.json` marks all 15 available origins as imported; the alternate live host labels all 15 In Dubai. No JSON origin correction was made because the requested host could not be verified |
| Direct media binary loading | NOT VERIFIED | No successful per-URL image/video network test was completed; external DNS/network resolution failed in this environment |

### Profile routes inspected on accessible alternate hostname
These are 15/15 exact slugs opened on `teddypups.ae`, not on the specified `puppy.instabizweb.com` hostname:
1. `maltipoo-max-male`
2. `korean-teacup-maltipoo-female`
3. `korean-teacup-poodle-female`
4. `maltipoo-cavapoo-male`
5. `toy-poodle-male-female`
6. `maltipoo-female-2`
7. `pomeranian-female`
8. `copper-male`
9. `shitzu-female`
10. `shitzu-male`
11. `maltipoo-female-1`
12. `maltipoo-female`
13. `korean-teacup-pomeranian-1`
14. `korean-teacup-pomeranian`
15. `korean-teacup-pomeranian-male`

The accessible alternate-host profile media counts were 2, 11, 4, 3, 3, 7, 3, 4, 2, 2, 4, 4, 2, 2 and 4 respectively, matching the JSON gallery lengths. This validates the data-to-page slug and gallery-size relationship for that alternate crawl, not the requested host's current availability or asset response status.

### Runtime and UI checks
| Check/command | Result | Evidence |
|---|---|---|
| Node version | PASS | v22.16.0 |
| npm version | PASS | 10.9.2 |
| `npm install --no-audit --no-fund --fetch-retries=0 --fetch-timeout=12000` | BLOCKED | `EAI_AGAIN` resolving `registry.npmjs.org` |
| `npm run build` | BLOCKED | `vite: not found`; dependencies could not be installed |
| `npm run dev` | NOT RUN | Vite unavailable |
| Browser smoke tests for all routes | NOT RUN | No running dev server/browser session |
| Gallery interactive navigation and native video playback | NOT RUN | No browser runtime; external media fetch not verified |
| Desktop/tablet/mobile viewport review | NOT RUN | Requires a running browser |
| Browser console and failed media request review | NOT RUN | No browser session |
| Keyboard/assistive technology test | NOT RUN | Semantic list, labels, visible focus and native controls are in source; manual execution remains required |

No production build, dev server or browser test is marked passed. The app needs an npm-network-enabled install/build and real-browser smoke test before acceptance/deployment.


## 16. Phase 2 automated frontend test suite — added 24 November 2026

### Tooling added

- Vitest 5 for one-shot and watch-mode test execution.
- jsdom for a browser-like DOM environment.
- React Testing Library and `@testing-library/jest-dom` for component and accessibility-oriented DOM assertions.
- The test configuration merges the existing Vite configuration, so the React and Tailwind plugins are reused rather than replaced.
- `npm run test` runs `vitest run` (one-shot, suitable for local verification); `npm run test:watch` starts Vitest watch mode.

Vitest 5 requires Node.js 22.12 or newer. The existing application runtime engine declaration has not been changed.

### Test files and coverage

| Test file | Coverage |
|---|---|
| `src/data/puppyData.test.js` | Complete dataset counts, slug uniqueness, available/published filtering, available and sold slug lookup, unknown/case-mismatched slugs, adjacent navigation wrapping, card mapping, safe limits and sparse-record fallbacks |
| `src/services/contentService.test.js` | Available records, featured-card limits, exact and sold slug lookup, adjacent records and breed data |
| `src/components/puppies/PuppyCard.test.jsx` | Image metadata/focal point, puppy facts, exact profile URL, missing cover and image-error fallback |
| `src/components/puppies/PuppyGallery.test.jsx` | Empty/cover fallback, next/previous wrapping, thumbnail selection, video controls/poster/duration, missing URLs and image/video error states |
| `src/components/puppies/PuppyNoteForm.test.jsx` | Required fields, phone/email validation, puppy-specific WhatsApp message, optional details, popup blocked state and opener isolation |
| `src/components/home/FeaturedPuppies.test.jsx` | Homepage featured card/profile route, source photo, video indicator, catalogue CTA and image-error fallback |
| `src/pages/PuppiesPage.test.jsx` | Catalogue population and correct links, loading state, empty state and rejected service state |
| `src/pages/PuppyProfilePage.test.jsx` | Available profile facts/gallery/actions, imported journey, historical sold profile, local journey copy and unknown-slug not-found state |
| `src/app/App.test.jsx` | Actual BrowserRouter wiring for catalogue, parameterized profile and application not-found route |
| `src/utils/whatsapp.test.js` | Configured WhatsApp number, message encoding and default enquiry message |

The tests use the repository JSON records for representative available and sold puppies, not live network requests or production contact data.

### Execution record

| Command/check | Result | Evidence / limitation |
|---|---|---|
| Test source and configuration added | ADDED | 10 test files plus Vitest configuration and shared setup |
| `npm run test` in this environment | BLOCKED — NOT EXECUTED | The environment could not resolve `registry.npmjs.org` during the Phase 2 dependency-install attempt; test packages are not installed here. No test pass count is claimed |
| Local execution requested | PENDING | From `frontend/`, run `npm install` then `npm run test`; share the complete output so any failures can be diagnosed against this commit |
| Production build and browser checks | SEPARATE | Automated jsdom tests do not validate a production build, remote image/video availability, real native video playback or responsive layouts |

A test is considered passed only after the runner executes it successfully. The addition of test files is not evidence that the suite itself has passed.


## 17. GitHub Actions execution for Phase 2

The workflow `.github/workflows/phase2-tests.yml` runs on pushes to `develop`, pull requests targeting `develop`, and manual dispatch. It installs the frontend dependencies with Node.js 22 and runs `npm run test` from `frontend/`. This provides a network-enabled CI runner in addition to the developer's local test command.

The workflow has been added to the branch. Its result must be read from the GitHub Actions run for the workflow commit; the workflow definition itself is not evidence of a passing run. Until that run reports success, the suite remains **ADDED — EXECUTION PENDING**.
