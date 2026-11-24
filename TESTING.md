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
