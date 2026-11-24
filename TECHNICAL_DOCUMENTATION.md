# TeddyPups — Technical Documentation

**Status:** Phase 1 frontend foundation and Phase 2 puppy catalogue/profile UI are implemented in `frontend/`. Backend/API/database remain proposed and are not started. Production build verification is currently blocked by npm registry DNS.  
**Required stack:** React, JavaScript/JSX, Tailwind CSS, React Router, Node.js, Express, MongoDB, Mongoose and REST APIs. No TypeScript or Angular.

## 1. Architecture

The browser React application communicates with Express over HTTPS/JSON. Express uses Mongoose to read public content and persist enquiries in MongoDB. Images/videos live in object storage/CDN; MongoDB stores URLs and metadata. A protected admin interface is optional and requires approval.

```text
Browser: React + React Router + Tailwind
              | HTTPS / JSON
              v
       Node.js + Express REST API
              | Mongoose
              v
            MongoDB

React img/video ----------------> Media CDN / object storage
Optional Admin UI --------------> Protected admin API
```

## 2. Proposed folder structure

```text
P-mart/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── common/
│       │   ├── layout/
│       │   ├── puppy/
│       │   ├── gallery/
│       │   ├── faq/
│       │   └── forms/
│       ├── pages/
│       ├── hooks/
│       ├── context/
│       ├── services/
│       ├── utils/
│       ├── styles/
│       ├── App.jsx
│       └── main.jsx
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   └── server.js
├── .env.example
├── .gitignore
├── README.md
├── PROJECT_ANALYSIS.md
├── TECHNICAL_DOCUMENTATION.md
├── PROJECT_PROGRESS.md
├── TESTING.md
└── AI_PROMPT_LOG.md
```

This is a proposal, not the existing repository structure. The inspected repository initially contained only README.md. Use .js for server/config/logic and .jsx for React UI.

## 3. Frontend responsibilities and routes

React renders public pages and interactive UI. React Router owns navigation and direct deep links. Tailwind and a small global stylesheet own responsive design, typography, visual tokens and reduced-motion styles. A centralized API service handles requests, JSON parsing, cancellation and normalized errors.

| Path | Page |
|---|---|
| `/` | HomePage |
| `/puppies` | PuppiesPage |
| `/puppies/:slug` | PuppyDetailPage |
| `/gone-home` | GoneHomePage |
| `/happy-families` | HappyFamiliesPage |
| `/how-it-works` | HowItWorksPage |
| `/faq` | FaqPage |
| `/contact` | ContactPage |
| `/admin/login` | AdminLoginPage (conditional) |
| `/admin/*` | Admin routes (conditional) |
| `*` | NotFoundPage |

Confirm whether Delivery & collection is a standalone route or section anchor.

### Component plan

**Shared:** AppLayout, SiteHeader, MobileNavigation, SiteFooter, Breadcrumbs, PageHeading, SectionHeading, Button, ResponsiveImage.

**Home:** HomeHero, FeaturedPuppies, WaysToMeet, PuppyJourneyPreview, TrustFeatures, WhatsAppConversationIllustration (only if confirmed), HappyFamiliesPreview, FaqPreview, FinalCta.

**Catalogue/profile:** PuppyCatalogue, PuppyCard, PuppyFilters (only if verified), CatalogueCount, EmptyState, PuppyDetail, PuppyGallery, MediaThumbnail, MediaLightbox, PuppyFacts, HealthPromise, PuppyJourneySteps, PuppyEnquiryForm, AdjacentPuppyLinks.

**Other pages:** GoneHomeGrid/Card, FamilyGallery/Photo, JourneyTabs/Steps, PromiseFeatures, DeliveryOptions, FaqSearch/List/AccordionItem, ContactForm/Details, MapLink.

One reusable puppy profile renders each record by slug. Do not duplicate page implementations per puppy.

## 4. State and API communication

- Local state for menus, gallery index, tabs, accordions and form fields.
- Focused hooks such as usePuppies/usePuppy/useFaqs/useFamilyMoments.
- Use fetch in a small API service; add query caching only if complexity warrants it.
- Use AbortController for unmount/parameter changes.
- Keep filter state in URL only if confirmed filters benefit from shareability/history.
- Avoid Redux by default; Context may hold genuinely global config/auth state.
- Provide loading, error, empty and retry states.
- Client env values are public; never expose credentials/admin secrets in Vite variables.

## 5. REST API design

Prefix `/api/v1`. Standard success:
```json
{ "success": true, "data": {}, "meta": {} }
```

Standard error:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please correct the highlighted fields.",
    "fields": { "phone": "Enter a valid phone number." }
  }
}
```

### Public reads

| Method | Route | Purpose | Request | Response data |
|---|---|---|---|---|
| GET | `/api/v1/puppies` | Available catalogue | Optional verified `breed`, `sex`, `where`, `collection`, `page`, `limit`, `sort` | `{items,total,page,limit,filters?}` |
| GET | `/api/v1/puppies/:slug` | One profile | slug path param | Puppy detail and ordered media |
| GET | `/api/v1/gone-home` | Homed puppy archive | optional page/limit | `{items,total,page,limit}` |
| GET | `/api/v1/happy-families` | Family gallery | optional page/limit | `{items,total,page,limit}` |
| GET | `/api/v1/faqs` | FAQ content | optional `q` | `{items,total}` |
| GET | `/api/v1/site-settings/public` | Public business contact info | none | Allowlisted phone/email/address/social fields |

Catalogue filters must be restricted to facets verified on the supplied host. Validate enum values, whitelist sort keys, bound page size and combine facets predictably (AND semantics unless testing shows otherwise).

### Enquiry persistence

| Method | Route | Purpose | Request body |
|---|---|---|---|
| POST | `/api/v1/enquiries` | Store contact or profile enquiry | `{name,phone,email?,area?,message?,puppyId?,puppySlug?,source,website?}` |

Example request:
```json
{
  "name": "Example Customer",
  "phone": "+971501234567",
  "email": "customer@example.com",
  "area": "Downtown Dubai",
  "message": "I would like more information.",
  "puppySlug": "maltipoo-max-male",
  "source": "puppy-profile",
  "website": ""
}
```

Server trims/validates fields, validates optional email, checks reasonable international phone format, limits lengths, verifies any puppy reference, handles populated honeypot submissions, rate-limits by IP and limits request size. Return HTTP 201 with safe acknowledgement and generated enquiry ID; do not return private document fields.

Example response:
```json
{ "success": true, "data": { "id": "generated-id", "message": "Your enquiry has been received." } }
```

Only claim email delivery if a provider is configured and its response confirms acceptance.

### Conditional admin API

A compact admin panel is useful for stock/media, FAQ, family moments and enquiry triage, but is not evidenced as a public reference feature. Keep optional until approved.

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/v1/admin/auth/login` | Authenticate admin |
| POST | `/api/v1/admin/auth/logout` | End/revoke session |
| GET | `/api/v1/admin/auth/me` | Current admin |
| GET/POST | `/api/v1/admin/puppies` | List/create |
| GET/PATCH/DELETE | `/api/v1/admin/puppies/:id` | Read/update/delete |
| GET/POST | `/api/v1/admin/faqs` | List/create |
| PATCH/DELETE | `/api/v1/admin/faqs/:id` | Update/delete |
| GET/POST | `/api/v1/admin/family-moments` | List/create |
| PATCH/DELETE | `/api/v1/admin/family-moments/:id` | Update/delete |
| GET | `/api/v1/admin/enquiries` | Paginated/filter enquiries |
| PATCH | `/api/v1/admin/enquiries/:id` | Change status/internal note |

## 6. MongoDB collections

### Puppy
Fields: optional name, unique slug, breed, sex (male/female/mixed/unknown), source-faithful ageLabel, availability (available/gone-home), locationType (dubai/imported/unknown), displayLocation, optional verified collectionType, media array (type, URL, thumbnail, poster, alt, caption, order), source-specific copy, sortOrder, featured flag, publishedAt and timestamps. Index unique slug plus availability/sort order and verified filter fields.

### Enquiry
Fields: name, phone, optional normalizedPhone, email, area, message, source, optional puppy ObjectId/slug, status (new/contacted/closed/spam), optional privacy-minimized IP hash and timestamps. Index createdAt/status/puppy. Define retention; avoid unnecessary raw IP storage.

### Faq
Fields: question, answer, category only if verified, order, published and timestamps. Index published/order.

### FamilyMoment
Fields: imageUrl, thumbnailUrl, altText, optional caption, order, published and optional consent/source reference. Do not infer identity or personal details from images.

### Admin (conditional)
Fields: unique email, passwordHash, role, active, lastLoginAt and timestamps. No public signup or plaintext passwords.

### SiteSettings (optional)
One settings record with public phone/email/address/map/WhatsApp/social URLs; expose only allowlisted public fields.

## 7. Security and authentication

If admin is approved:
- Hash passwords with Argon2id or bcrypt using a suitable work factor.
- Prefer server-managed HttpOnly, Secure (production), SameSite cookies with CSRF protection for mutating cookie-authenticated routes.
- Do not store long-lived credentials in localStorage.
- Throttle login and use generic failures to reduce account enumeration.
- Protect every admin route at API layer and enforce roles server-side.
- Validate request bodies/params and limit payload sizes.
- Use Helmet/security headers, CORS allowlist, safe errors and redacted structured logs.
- Use least-privilege Mongo credentials, network restrictions and backups.
- Store secrets in env/deployment secret manager; commit placeholders only.
- Enquiry spam controls: website honeypot, rate limiting, length limits and optional minimum fill time. Add CAPTCHA only if abuse warrants it.

## 8. Image/video storage

Recommended practical option: Cloudinary for image/video upload, transformations, thumbnails and delivery. Alternative: S3-compatible object storage plus CDN for portability/cost control. MongoDB stores asset IDs and URLs, not binary files. Use responsive transforms, lazy loading, stable dimensions/aspect ratios, video posters and deferred source loading. Confirm rights to assets before reuse.

## 9. Animation/performance

Use CSS for simple effects. Use IntersectionObserver for reveal-on-scroll and disconnect during cleanup. Use requestAnimationFrame only for measured custom motion; cancel on unmount/offscreen. Remove event listeners; use passive scroll listeners only if needed. Honour prefers-reduced-motion and coarse pointers. Avoid loading video until requested. No large animation library is justified yet.

## 10. Deployment

- Frontend: Vercel, Netlify or equivalent; configure direct deep-link fallback for SPA routes.
- API: Node-compatible host such as Render/Railway/Fly.io with HTTPS and health endpoint.
- Database: MongoDB Atlas with network restrictions, backups and separate environments.
- Media: Cloudinary or object-storage/CDN.
- CORS restricted to frontend origin; configure trusted proxy deliberately for rate limiting.
- Separate local/staging/production values.
- Smoke-test deep links, form POST, database connectivity, CORS and media in production.
- Select provider at deployment time after checking current plan limits.

## 11. Environment variables

Server: NODE_ENV, PORT, MONGODB_URI, CLIENT_ORIGIN, SESSION_SECRET (if session cookies), one-time admin bootstrap secret only if used, Cloudinary credentials if selected, mail keys only if email integration is approved.

Client: VITE_API_BASE_URL only (public URL).

Never commit .env or credentials; .env.example contains placeholders only.

## 12. Open decisions

1. Confirm catalogue facets and URL filter state on supplied host.
2. Approve or omit admin; recommend a minimal internal tool if content/inventory must be maintained.
3. Decide whether enquiry email notifications are required; MongoDB persistence is baseline.
4. Confirm asset reuse permissions and storage provider.
5. Select monorepo scripts and deployment host in Phase 1.
6. Use one Enquiry model/POST API with source discriminator for both forms (recommended).


## Phase 1 frontend implementation note (24 November 2026)

The repository implementation uses a root-level `frontend/` directory (rather than the earlier proposed `client/` name) to reserve the repository root for a future sibling `backend/` directory. The application source currently follows this structure:

```text
frontend/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── ASSET_SOURCES.md
└── src/
    ├── app/
    ├── animations/
    ├── assets/images/
    ├── assets/videos/
    ├── components/common/
    ├── components/home/
    ├── components/layout/
    ├── data/
    ├── hooks/
    ├── pages/
    ├── services/
    ├── styles/
    ├── utils/
    └── main.jsx
```

The current homepage uses `contentService.js` as its data-access contract and `siteContent.js` as local fixtures. UI components consume service results and do not import fixture data directly. Reference image URLs are centralised in `data/referenceAssets.js`; they are currently remote URLs from the supplied reference domain and must be moved to approved project-owned assets/CDN after reuse permission is confirmed.

Current package versions are pinned by compatible semver ranges in `frontend/package.json`: React 19.3, React DOM 19.3, React Router DOM 7.18, Vite 8.3, React plugin 6.3 and Tailwind CSS/Vite plugin 4.3. The manifest declares Node.js >=20.19. Dependency installation was not completed in the execution environment due npm registry DNS failure, so compatibility has not been proven by an install/build here.


## Phase 2 implementation — puppy catalogue and profiles (24 November 2026)

### Data modules and service contract
- `data/puppies.json` remains the complete 42-record puppy snapshot; it is not replaced by JSX data.
- `data/breeds.json` provides breed reference values. `data/pages.json` is retained for route metadata. `faq.json`, `families.json` and `home-families.json` remain for later phases.
- `data/puppyData.js` exports all records, the available/published filter, exact-slug lookup, previous/next available lookup and a card mapping helper.
- `services/contentService.js` exposes available records, slug lookup, neighbours and breeds, while retaining the Phase 1 homepage service functions.
- The duplicate puppy array in `siteContent.js` was removed. Homepage featured puppies and the catalogue now read from the same JSON source.

### Route/component map
| Route/component | Responsibility |
|---|---|
| `/puppies` — `PuppiesPage` | Current available records, loading/error/empty states and responsive card grid |
| `/puppies/:slug` — `PuppyProfilePage` | Exact slug lookup for available and historical sold records |
| `PuppyCard` | Accessible card with source cover, name, breed, gender, age and data origin |
| `PuppyGallery` | Variable image/video collection, active count, thumbnails, previous/next and failed-media states |
| `PuppyNoteForm` | Local input validation and profile-specific WhatsApp handoff |
| `puppyData.js` | Filtering, mapping, lookup and adjacency; no component-level puppy fixture duplication |

Unknown profile slugs return a profile not-found state. Sold records remain resolvable and are not included in the available catalogue.

### Gallery media handling
- Gallery selection uses the `media[]` array, with the cover as a fallback only when the array is empty.
- `kind === "video"` renders a native controlled `video` element with an optional poster; all other known image records render as `img`. Image URLs are never used as video sources.
- Source `url`, `poster`, `width`, `height`, `alt`, `caption`, `durationS`, `focalX` and `focalY` are retained. Video duration is presented on video thumbnails where available.
- Missing or failed URLs show clear unavailable-media fallbacks. No binaries are downloaded into Git.
- Catalogue and profile images use lazy loading and source dimensions where present.

### Profile and enquiry behaviour
- Puppy details use source `displayName/name`, breed, `genderLabel/gender`, age, origin and description/colour fields.
- Shared care content reflects common TeddyPups copy; users are directed to ask for the individual puppy’s records. It does not fabricate individual health certificates.
- Journey content is selected from `origin.slug` (`local` or `imported`) and uses the corresponding showroom or import steps.
- WhatsApp links include the selected puppy's name and slug and reuse the Phase 1 helper.
- The note form validates required name/phone and optional email, then prepares a WhatsApp message. There is no server call, persistence or false success acknowledgement.

### Styling/accessibility
Phase 2 styling is appended to the existing `index.css` and uses the Phase 1 warm-paper/ink/sage/serif tokens. The catalogue is three columns at wide desktop and two on mobile; profiles use a desktop gallery/details split and stack at narrower widths. Gallery thumbnails/arrows, list semantics, labels, status messages, visible focus and input error descriptions are implemented. Browser-level accessibility and responsive checks remain pending.


## Phase 3 — Storybook profile presentation

The reusable `PuppyProfilePage.jsx` retains its existing data loading, exact-slug lookup, available/sold states, WhatsApp CTA, origin-driven journey data and adjacent-available-puppy service. The reference-fidelity follow-up is recorded in implementation commit [`02be169`](https://github.com/dikshaforsure/P-mart/commit/02be169ed8dd690840934f3994322683f6df9e49).

The profile uses three numbered storybook chapters:
1. Puppy introduction, gallery, status and facts.
2. Puppy care paper, nested beneath the framed information board in the right-hand profile column.
3. Imported/local journey with a numbered dotted trail.

The enquiry is a separate, unnumbered letter panel. Its paw stamp is rendered inside the existing `.tp-profile-letter` section. The profile CSS remains scoped under `.tp-profile-storybook` and `.tp-profile-*`; catalogue selectors and catalogue behavior are not changed.

The refinement makes the gallery thumbnails a horizontally scrollable strip, uses a 4:5 stage on narrow screens and 5:6 from 768px, and stacks the main profile layout and journey trail below 1024px. The information column is sticky only at desktop widths. These are presentation changes; `PuppyGallery.jsx` and its keyboard/touch/video/lightbox logic are unchanged.

`PuppyNoteForm.jsx` retains the field names, required-name/phone validation, phone/email checks, puppy-specific message construction, current WhatsApp URL helper, popup handling and explicit user-initiated handoff. No API, persistence or automatic-send behavior was introduced. The existing health-record disclaimer and shared care copy are unchanged.

GitHub Actions run [#13](https://github.com/dikshaforsure/P-mart/actions/runs/45465525378) passed the three focused profile/form/gallery files (19 tests), the complete frontend suite (10 files, 47 tests) and `npm run build`. Browser-level responsive comparison, native media playback, external asset reachability and pixel-level parity remain unverified.


## Phase 4 — Shared Shell, How It Works and FAQ

**Implementation:** [`86ae5779f79f51c14c09de950393d34c6660c7bc`](https://github.com/dikshaforsure/P-mart/commit/86ae5779f79f51c14c09de950393d34c6660c7bc)

### Routes and components
| Route/component | Responsibility |
|---|---|
| `/how-it-works` — `HowItWorksPage.jsx` | Local/imported tabs, two separate four-step journeys, promise, delivery/collection and why-choose-us sections |
| `/faq` — `FaqPage.jsx` | Runtime rendering from `data/faq.json`, combined question/answer search, live count, empty state and accessible accordion |
| `PageIntro.jsx` | Reusable page-level eyebrow, heading and description |
| `SectionHeading.jsx` | Reusable numbered/eyebrow section heading |
| `JourneyStep.jsx` | Reusable numbered journey card |
| `PawMark.jsx` | Small reusable brand/paw SVG for shared shell and page details |

### State and accessibility
- The journey selection is local React state in `HowItWorksPage`. Tabs use `role=tablist`, `role=tab`, `aria-selected`, `aria-controls`, roving `tabIndex` and Home/End/arrow-key handling. Each panel is connected through `aria-labelledby`.
- FAQ entries are parsed from existing single-string `question?answer` JSON records at the first question mark. Search is case-insensitive across both fields. The count is announced using `aria-live`, and the clear button resets the controlled search.
- Each FAQ note has a semantic button, `aria-expanded`, `aria-controls` and an associated labeled answer region. Search and accordion state are independent.
- Shared mobile navigation retains its body-scroll lock, focus return, Escape and tab-loop behavior. `NavLink` active matching includes nested puppy profile paths under `/puppies`.

### Content and dependencies
No new package or framework was introduced. The FAQ data was not changed. Page journey/promise/delivery content is in `data/howItWorksContent.js`; the existing homepage `journeySteps` data remains untouched. The footer references the email, location and social links from the source shell while retaining the destination WhatsApp helper configuration.

CSS for the new routes uses `how-*` and `faq-*` selectors. Shared shell and page-heading selectors intentionally apply across existing routes. Responsive styles include a stacked tablet layout, mobile journey cards/search layout and reduced-motion handling.

### Verification
Run [#15](https://github.com/dikshaforsure/P-mart/actions/runs/45474656254) passed the four focused test files (15 tests), full frontend suite (14 files / 64 tests) and production build (Vite 8.3.8). No browser-level responsive inspection or visual snapshot comparison was run; jsdom and build results do not verify actual viewport rendering.
