# TeddyPups — Technical Documentation

**Status:** Proposed design; implementation has not started.  
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
