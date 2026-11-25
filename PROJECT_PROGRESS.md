# TeddyPups Clone — Project Progress

**Last updated:** 25 November 2026  
**Current phase:** Phase 6 — Homepage storybook refinement and visual QA corrections (implemented; final CI run #39 passed; manual browser QA pending)  
**Status:** Public-frontend implementation milestones Phases 0–6 are implemented on `develop`. Homepage visual-QA commit `745d6e6121ce4353076aa7bd2b275528048f0dbd` passed GitHub Actions run [#39](https://github.com/dikshaforsure/P-mart/actions/runs/45565628125): focused public-page/route checks, full frontend test suite and production build. The follow-up corrects hero portrait spacing/hover lift, outward door hinges and family Polaroid image sizing. Real-browser screenshot comparison and integrated responsive QA across all public routes remain outstanding. This is frontend scope only: no enquiry API/database persistence, deployment or production asset rights approval is claimed. Next work: integrated browser/responsive QA across all public routes; separately determine whether backend enquiry persistence/admin is in scope.

## 1. Objectives

Build a responsive, visually accurate and functional public website based on the supplied TeddyPups reference, using React, JavaScript/JSX, Tailwind CSS, React Router, Node.js, Express, MongoDB and Mongoose.

Required public experiences are homepage, available catalogue/reusable profiles, gone-home archive, happy-family gallery, how-it-works, FAQ and contact. Enquiries must be validated server-side and persisted in our own MongoDB. Architecture should remain modular, accessible, testable and deployable.

## 2. Scope

**In scope:** public pages, shared layout, catalogue/profile pages, variable media galleries, gone-home and family galleries, journey tabs, FAQ search/accordion, contact and profile enquiry forms, REST API, Mongo persistence, validation, anti-spam, responsive refinement, verified animations, tests and deployment.

**Conditional / needs approval:** protected admin panel for managing puppies/availability/media, FAQs, family content and enquiries. Recommended as a small internal tool if content changes after launch. Email notifications and CAPTCHA are optional and need scope justification.

**Out of scope unless requested:** customer accounts, checkout/payments, cart, delivery tracking, unrelated CRM and recreation of private reference backend. No TypeScript, Angular or TSX.

## 3. Phase roadmap

| Phase | Scope | Deliverables | Exit condition |
|---|---|---|---|
| 0 — Research/docs | Inspect reference and repo; capture gaps and architecture | Five Markdown documents | Docs committed/verified; open questions recorded |
| 1 — Foundation | Client/server JS structure, scripts, Tailwind, Router, Express health endpoint, env handling | Runnable frontend/backend skeleton | Both services start, health responds, build checks pass |
| 2 — Database/backend | Mongo connection, Mongoose models, validation/errors, public GET APIs and seed plan | Models, routes/controllers/services and seed data | DB connects and representative API reads pass |
| 3 — Shared layout/home | Design tokens, responsive header/footer and homepage sections | Layout and HomePage | Visual comparison and navigation pass |
| 4 — Puppy catalogue/profiles | Available list, verified filters, reusable profile, variable galleries, adjacent navigation | Catalogue/profile UI and hooks | Every listing/profile resolves; media/filters work |
| 5 — Gone home/families | Homed puppy archive and family gallery | Two page modules and datasets | Accurate records/counts and responsive galleries |
| 6 — Content pages | How-it-works tabs/anchors, FAQ search/accordion, contact UI | Content pages and forms | Keyboard/mobile interactions pass |
| 7 — Enquiries/admin | Persist enquiries, validate/rate-limit/honeypot; optional protected admin CRUD | Enquiry API/UI, optional admin | Valid records persist; invalid/spam rejected; admin protected if included |
| 8 — Motion/responsive | Confirmed effects, cleanup and mobile refinement | CSS/SVG/JS effects and responsive polish | No leaks, overflow or reduced-motion failures |
| 9 — Integration/testing/deploy | API integration, E2E/security/browser tests, production config and deployment | Deployed app and handoff | Deep links, media, database, forms and smoke tests verified |

Reorder only with documented dependency reasoning. Backend contracts should stabilize before full page integration.

## 4. Working contract for every phase

1. Inspect current code and working tree before edits.
2. Implement only requested phase scope.
3. Preserve unrelated content, names, structure and configuration.
4. Run relevant tests/build checks and report exact commands/results.
5. Update project docs and AI prompt log accurately.
6. Provide manual test instructions; report unverified behaviour and bugs.
7. Stop for the user's review/manual testing before continuing.

Never claim passing tests, API responses, database writes or deployment without evidence.

## 5. Acceptance criteria

### Phase 1 — Foundation
- JavaScript/JSX only.
- Client and API start with documented commands.
- React Router supports page routes and direct deep links.
- Express health endpoint and centralized error handling work.
- Tailwind builds; existing content is preserved; .env ignored and .env.example uses placeholders.

### Phase 2 — Backend/data
- Mongo connects via environment config.
- Mongoose schemas validate required fields/enums and define indexes.
- Public APIs use consistent responses, pagination and error codes.
- Seed values are source-faithful; no invented fields.
- Errors do not leak stack traces/secrets.

### Phase 3 — Layout/home
- Header/footer/navigation and homepage responsive.
- Section order, hierarchy, image crops and CTA placement compared with reference.
- Links, keyboard navigation and fixed-viewport comparisons pass.

### Phase 4 — Catalogue/profile
- Catalogue reflects approved snapshot.
- Confirmed filters combine correctly/count accurately.
- Each profile is data-driven and deep-linkable.
- Variable image/video gallery, thumbnails, counters and adjacent navigation work.

### Phase 5 — Archive/gallery
- Gone-home/family content from verified inventory.
- Missing names/captions are not invented.
- Media lazy-loaded with useful alt text and responsive sizing.
- No mobile overflow.

### Phase 6 — Content pages
- Local/imported tabs are accessible.
- Section anchors work.
- FAQ search covers question/answer and provides empty state.
- Contact form validates and shows clear submission states.

### Phase 7 — Enquiries/admin
- Valid enquiries persist in test DB and return safe acknowledgement.
- Invalid data and spam controls work.
- Optional admin routes require server-side auth/authorization and hashed passwords.

### Phase 8 — Motion/responsive
- Only verified effects are recreated.
- Reduced motion disables/simplifies decoration.
- Observers/listeners/RAF are cleaned up.
- No mobile jank or horizontal scroll.

### Phase 9 — Deployment
- HTTPS and correct production config.
- Deep routes work after refresh.
- Database, CDN assets and enquiry POST work in production.
- CORS, secrets, logs and security reviewed; smoke tests recorded.

## 6. Repository baseline

Inspected 24 November 2026 via connected GitHub account:
- Repository: `dikshaforsure/P-mart`
- Public; default branch `main`
- Main head: `eaa4569f3a236e3476c6843defba69cb0437b721`
- Tracked tree: only `README.md`
- README: two duplicate `# P-mart` headings
- Visible commit history: two commits, both titled `first commit`
- Connected `dikshaforsure` account reports admin, maintain and push permissions.
- No package manifests, app source, lockfile, tests or build scripts existed at baseline.

A documentation branch `docs/phase-0-analysis` was created from main. Main was not changed at branch creation. Record final commit/verification below after actual writes.

## 7. Phase 0 decisions

- Only `puppy.instabizweb.com` is reference baseline.
- Snapshot observed: 15 available, 27 gone-home, 64 family-moment label and 9 FAQs.
- Do not merge inconsistent indexed content from teddypups.ae.
- Puppy detail is one reusable route driven by data.
- Contact/profile forms share an Enquiry model/POST API with source discriminator.
- Images/videos use Cloudinary or object storage/CDN; MongoDB stores references/metadata.
- No Redux by default; local state/hooks/context should suffice.
- Admin is conditional internal functionality, not a proven public reference feature.

## 8. Pending work

- [ ] Visual inspection at desktop/tablet/mobile viewports.
- [ ] Confirm filters and interaction on supplied host.
- [ ] Audit all 15 profiles, media and adjacent links.
- [ ] Verify gone-home media and possible detail routes.
- [ ] Verify family count and viewer behaviour.
- [ ] Test FAQ search and accordion.
- [ ] Inspect animations and reduced-motion behaviour.
- [ ] Confirm contact email and WhatsApp/map/social destinations.
- [ ] Resolve Delivery & collection route.
- [ ] Commit and fetch-verify five docs on docs/phase-0-analysis.
- [ ] Approve/decline admin and email notification scope.

## 9. Risks

| Risk | Mitigation |
|---|---|
| Inventory changes | Recheck before seed and record snapshot date |
| Two domains disagree | Use supplied host only |
| Text crawl cannot prove visual fidelity | Capture fixed viewport screenshots and interaction recordings |
| Media rights unclear | Confirm permission and track provenance |
| Reference form backend unknown | Build own validated Mongo-backed endpoint |
| Admin expands scope | Keep conditional and approve before implementation |
| Media performance | CDN transforms, lazy loading, posters and stable dimensions |

## 10. Phase 0 completion record

Phase 0 is complete only when the five docs are committed and fetched/verified. No app source, dependencies, database, application tests or deployment have been created/run in this phase.


## Phase 1 — Frontend foundation and homepage (24 November 2026)

**Status:** Source implementation prepared; runtime/build verification blocked by npm registry DNS from the current execution environment.

### Implemented in `frontend/`
- Vite + React JavaScript application configured with React Router DOM and Tailwind CSS v4's Vite plugin.
- Shared app layout, responsive header/mobile menu and footer.
- Routes established for all planned public pages and `/puppies/:slug`; all non-home routes remain deliberate placeholders.
- Homepage split into independent sections: hero, moving breed strip, puppy preview, two ways to meet, journey steps, WhatsApp-style enquiry illustration, trust highlights, family preview, FAQ preview and final CTA.
- Local fixture data accessed through `contentService.js`; components do not import the fixture module directly.
- Reference-host media paths recorded in `frontend/ASSET_SOURCES.md` and `src/data/referenceAssets.js`. Media is currently hotlinked from the reference host; usage rights and local/CDN transfer remain to be confirmed.
- Frontend README and local `.gitignore` / `.env.example` added.

### Source checks executed
- Node.js version: v22.16.0; npm: 10.9.2.
- `node --check` passed for the plain JavaScript configuration/data/service/helper/hook files.
- TypeScript's parser (`transpileModule`, JSX emit) parsed all 25 JavaScript/JSX files with zero syntax errors. This was used only as a syntax parser; it is not an application dependency and no TypeScript source was added.
- Custom static check confirmed all relative source imports resolve.
- Custom static check confirmed no .ts/.tsx files.
- CSS opening/closing brace counts matched (326 each).

### Blocked verification
- `npm create vite@latest . -- --template react --no-interactive` timed out before creating files; the scaffold was then written explicitly.
- `npm install --no-audit --no-fund --fetch-retries=0 --fetch-timeout=20000` failed with `EAI_AGAIN` resolving `registry.npmjs.org`.
- No `node_modules` or package lockfile was created.
- Consequently, `npm run dev`, `npm run build`, browser/viewport checks and browser-console verification were **not run**.
- GitHub commit/push status for Phase 1 must be recorded after the changes are committed and fetched back.

### Scope boundary
No puppy catalogue, profile detail implementation, other public page content, backend, API, database, enquiry persistence or admin panel was developed in this phase.


## Phase 2 — Puppy catalogue and reusable profiles (24 November 2026)

**Branch:** `develop`  
**Scope:** `/puppies` and `/puppies/:slug` only. The Phase 1 homepage, shared layout and navigation remain in place.

### Implemented
- `/puppies` now renders the records filtered from `puppies.json` where `status === "available"` and `published !== false`. The current snapshot contains 15 available and 27 sold records.
- Every card uses that record's cover URL and metadata, displays name, breed, gender, age and its current data-source location, and links using the exact stored slug.
- `/puppies/:slug` uses one reusable page and exact-slug lookup for all 42 records. Available profiles show enquiry actions and previous/next available navigation. Historical sold profiles remain addressable and show a gone-home state; unknown slugs get a profile-specific not-found state.
- Galleries read variable `media[]` arrays. Images render as images; videos render as controlled native video with their own poster, dimensions, duration, focal point and error fallback. Thumbnails, previous/next controls, captions and active-media count are included.
- Existing `contentService.js` now exposes available records, slug lookup, adjacent available puppies and breeds through `puppyData.js`. The duplicate Phase 1 JavaScript puppy list was removed; the homepage teaser now uses the same JSON puppy records.
- Profile-specific WhatsApp messages reuse the existing helper. The note form validates locally and opens WhatsApp with the note; no backend persistence or successful enquiry submission is claimed.
- Added scoped responsive styling and keyboard/semantic catalogue list treatment without replacing Phase 1 design tokens.

### Data reconciliation
- All six existing JSON datasets were preserved. Puppy history remains 42 records, including the 27 sold entries.
- All 15 available record slugs match the 15 available puppy route keys in `pages.json`. No slug was generated or renamed.
- The committed snapshot marks all 15 available puppies as `origin.slug: "imported"`. A current crawl on a different TeddyPups hostname (`teddypups.ae`) lists the same 15 as “In Dubai”, while the supplied `puppy.instabizweb.com` host could not be inspected directly in this session. This conflict is recorded and no origin values were changed: the requested host remains the authority and its current origin labels need reconfirmation.
- Puppy media URLs remain external and no binaries were added.

### Verification limits
- JSON counts, uniqueness and available-slug coverage were checked from the remote source.
- npm installation failed with `EAI_AGAIN` resolving `registry.npmjs.org`; `npm run build` consequently fails because Vite is not installed. No production build or dev server success is claimed.
- Exact-host catalogue/profile checks, direct media load tests, browser route tests, responsive viewport checks and browser-console checks remain incomplete. The alternative host crawl is recorded separately in `PROJECT_ANALYSIS.md` and `TESTING.md`.
- Backend, authentication, database, the full FAQ/family/contact/How It Works pages and catalogue filtering/search/sort were not started.


## Phase 3 — Puppy profile storybook refinement

**Date:** 25 November 2026  
**Branch:** `develop`  
**Implementation:** `309cb4bae695b43bef91e74f1d38c2fb2341a81a`  
**Follow-up fixes:** `f689f9c27421b129f5c3c4797574c36d5683cee5`, `3ab43aa136fdf40c9dd3b2dd53fd6f60db9f9837`

### Completed
- Refined the reusable `/puppies/:slug` page into a TeddyPups-inspired storybook layout with numbered chapter headings, warm paper background, decorative ribbon, framed gallery treatment, paper-style care panel, numbered journey trail, letter-style enquiry panel and adjacent puppy preview cards.
- Retained exact-slug lookup and data-driven available/sold profiles; the same page continues to render the existing dataset records.
- Preserved the gallery's existing image/video switching, full-screen viewer, keyboard navigation, touch swipe, native video controls, and missing-media fallbacks.
- Preserved the profile WhatsApp CTA and the note form's local validation and explicit user-initiated WhatsApp handoff. No enquiry API or database persistence was introduced.
- Kept profile-only CSS selectors scoped under `.tp-profile-storybook`; the catalogue's new sketchbook styling and query-param filters were not modified.
- Extended profile and note-form tests to cover the chapter structure, enquiry heading and adjacent puppy previews.

### Verification
- GitHub Actions run [#11](https://github.com/dikshaforsure/P-mart/actions/runs/45461978023) passed for commit `3ab43aa136fdf40c9dd3b2dd53fd6f60db9f9837`: **10 test files, 45 tests passed, 0 failed**.
- The first two CI attempts exposed a dropped local-origin label and a stale single-match breed assertion. Both were corrected before the passing run.
- Manual browser comparison, responsive viewport inspection, live media fetch verification and production-build verification were not performed in this phase.

### Remaining work at the end of Phase 2 (historical snapshot)
This status predates the later Phase 3 and Phase 4 work. Phase 4 subsequently completed the shared shell, How It Works and FAQ. Gone Home, Happy Families and Contact remain the next planned implementation phase; homepage refinement and the final site-wide visual/responsive review remain outstanding.


### Phase 3 audit/refinement follow-up — 25 November 2026

**Baseline inspected:** `77a808f947d674d9bfddf9af6872b67a9433a646`  
**Implementation commit:** `02be169ed8dd690840934f3994322683f6df9e49`

The reference-fidelity audit confirmed that the storybook profile, mixed-media gallery, care copy, origin-specific journey, letter form and adjacent-puppy links were already present. The verified remaining structure/layout gaps were corrected without changing their underlying application logic:

- The chapter-count statement in this earlier record was incorrect: it described one shared three-chapter hierarchy and an unnumbered enquiry. Direct template verification in the Phase 3 close-out below establishes four numbered chapters for available profiles and three for sold profiles; the enquiry letter is numbered in both. The paw-stamp placement correction itself remains valid.
- Grouped the existing puppy facts, status and actions in a framed information board, with the existing care paper immediately beneath it in the same right-hand column.
- Matched the reference gallery stage ratio at larger widths and changed the thumbnail list from a wrapping grid to a horizontally scrollable strip.
- Matched the reference's tablet stack/vertical journey transition at 1024px and retained a sticky information column only at desktop widths.
- Matched the sold-profile Chapter 1 wording to the reference's “the day they went home”.

The code change touched only `PuppyProfilePage.jsx`, `PuppyProfilePage.test.jsx`, `PuppyNoteForm.jsx`, `styles/index.css` and the frontend CI workflow. The gallery component/tests, catalogue implementation and tests, puppy JSON/data services, WhatsApp utility and route definitions were left unchanged. The note form still validates locally and opens a prefilled WhatsApp message only after explicit user submission; no backend or persistence was added.

### Verification for the audit/refinement

GitHub Actions run [#13](https://github.com/dikshaforsure/P-mart/actions/runs/45465525378) passed against the implementation commit `02be169ed8dd690840934f3994322683f6df9e49`:

- Focused profile, enquiry-form and gallery tests: **3 files, 19 tests passed**.
- Full frontend suite: **10 files, 47 tests passed**.
- Production build: **passed** with Vite 8.3.8 (52 modules transformed).

Run [#11](https://github.com/dikshaforsure/P-mart/actions/runs/45461978023) remains the correct evidence for the earlier Phase 3 implementation/fix commit `3ab43aa136fdf40c9dd3b2dd53fd6f60db9f9837` (10 files / 45 tests). Run [#12](https://github.com/dikshaforsure/P-mart/actions/runs/45462331819) corresponds to the documentation-only commit `77a808f947d674d9bfddf9af6872b67a9433a646`; it also ran the test suite and passed 10 files / 45 tests, but is not substituted for run #11 as the original implementation evidence.

No real-browser visual comparison, desktop/tablet/mobile overflow inspection, browser-console/network inspection or live native-media playback check was performed. The build and jsdom test results do not establish pixel-level parity.


## Phase 4 — Shared Shell, How It Works and FAQ

**Date:** 25 November 2026  
**Baseline `develop` commit:** `984652e8fde64cb715e063d556fbbebe96689dd0`  
**Implementation commit:** `86ae5779f79f51c14c09de950393d34c6660c7bc`  
**Verification:** [GitHub Actions run #15](https://github.com/dikshaforsure/P-mart/actions/runs/45474656254)

### Initial state and reference audit
- The current header and footer were functional shared components, but their visual treatment was simpler than the reference shell.
- `/how-it-works` and `/faq` still rendered `PlaceholderPage`.
- The existing `frontend/src/data/faq.json` already contained the same nine question/answer records as the reference FAQ data. It was kept unchanged and remains the runtime content source.
- The reference How It Works page contains local and imported journey tabs, two distinct four-step panels, a puppy-promise section, delivery/collection and a why-choose-us section. The homepage's existing three-step `journeySteps` data was not repurposed for these separate page panels.

### Delivered
- Refined the shared header brand/navigation/active paw marker, desktop CTA and mobile menu presentation. The existing focus return, Escape handling, focus loop, route-close and body scroll-lock behavior were preserved.
- Replaced the footer's placeholder contact/social treatment with verified reference-source email, location and social links. The existing WhatsApp helper was retained; its configured destination was not changed and no additional phone number was introduced.
- Implemented `/how-it-works` with four anchored sections: two-way journey, puppy promise, delivery/collection and why choose us. The In Dubai/Imported tabs switch between distinct four-step panels and support arrow/Home/End keyboard navigation with tab semantics.
- Implemented `/faq` from `faq.json`. Search matches question and answer text, result count updates, clear restores all nine notes, answers expand/collapse with `aria-expanded`/`aria-controls`, and the no-result state offers a WhatsApp follow-up.
- Added small shared `PageIntro`, `SectionHeading`, `JourneyStep` and `PawMark` components. Page-specific styles are namespaced under `how-*` and `faq-*`; common shell styling is intentionally shared.

### Content and preservation decisions
- Reference copy that could read as a new business guarantee, medical promise, reservation policy or delivery commitment was not introduced as an unconditional destination-site claim. Journey and delivery copy is phrased with the existing FAQ as the support source and asks customers to confirm arrangements with the team.
- `faq.json`, `siteContent.js`, `puppyData.js`, `contentService.js`, the WhatsApp helper and the homepage implementation were not modified.
- `/gone-home`, `/happy-families` and `/contact` remain placeholders. No homepage redesign was started.

### Changed files
Implementation commit changed 17 files: `.github/workflows/phase2-tests.yml`, `frontend/src/app/App.jsx`, `frontend/src/app/App.test.jsx`, `frontend/src/components/layout/SiteHeader.jsx`, `SiteHeader.test.jsx`, `SiteFooter.jsx`, `SiteFooter.test.jsx`, new shared `PageIntro.jsx`, `SectionHeading.jsx`, `JourneyStep.jsx`, `PawMark.jsx`, new `data/howItWorksContent.js`, new `pages/HowItWorksPage.jsx` and its test, new `pages/FaqPage.jsx` and its test, and `styles/index.css`.

The catalogue components, catalogue filters/data, puppy profiles, gallery/lightbox, enquiry form, WhatsApp configuration, and homepage components were not altered.

### Verification
GitHub Actions run [#15](https://github.com/dikshaforsure/P-mart/actions/runs/45474656254) passed for the exact implementation commit:
- Focused Phase 4 tests: **4 files / 15 tests passed**.
- Complete frontend test suite: **14 files / 64 tests passed, 0 failures**.
- Production build: **passed** with Vite 8.3.8.

Baseline run [#14](https://github.com/dikshaforsure/P-mart/actions/runs/45466221520), at the baseline commit above, passed 10 files / 47 tests and its production build. These are separate executions; run #15 is the Phase 4 verification.

No real-browser viewport testing, screenshots, manual mobile/tablet interaction, browser console inspection or network request inspection was performed in this phase. CI jsdom tests and a production build do not establish pixel-perfect visual parity.

### Remaining work
Next implementation phase: Gone Home, Happy Families and Contact. Homepage refinement and the final site-wide visual/responsive audit remain outstanding.


## Phase 3 close-out — source-accurate puppy profile hierarchy and interactions (25 November 2026)

**Baseline inspected:** \`4c2ad275b707139fdcfdee37cede3c36462f6d8c\`  
**Final code commit on \`develop\`:** \`610ae3c4e703daeb199a5a8494cc644bf8f91194\`  
**Phase 4 status:** Complete; this close-out corrects the earlier Phase 3 profile interpretation and does not change the Phase 4 shell, How It Works or FAQ.

### Source re-check and corrected hierarchy

The available Max and Korean Teacup Maltipoo templates and sold Buddy and Bailey templates were re-read directly alongside the Gone Home archive and the source mascot/motion modules. The earlier Phase 3 note incorrectly generalized the profile sequence. The reference has two distinct structures:

- **Available:** Chapter 1 “hello, it's me”; Chapter 2 “what comes with [name]”; Chapter 3 “the way home” with the journey trail; Chapter 4 “dear TeddyPups…” enquiry letter.
- **Sold:** Chapter 1 “the day they went home”; Chapter 2 “what comes with [name]”; Chapter 3 “dear TeddyPups…” enquiry letter. Sold profiles do not render the way-home chapter or journey trail.

Both types retain previous/next puppy links. Available adjacency still follows the existing available catalogue sequence and wrap-around. Sold adjacency now follows the exact 27-card order in the reference Gone Home page, using an explicit slug order in the mapping layer. The 42-record \`puppies.json\` file, statuses, slugs, media URLs, origin values and record ordering were not changed.

### Implementation

- Made the enquiry letter a numbered chapter on both profile types. Sold profiles now render the existing validated note form with sold-specific copy and message content explaining that the puppy already found a home and visitors can ask about TeddyPups or similar puppies that may currently be available.
- Preserved the local validation and explicit WhatsApp handoff. The form prepares a message; it does not send automatically, make an API request or claim an enquiry was delivered.
- Added the reusable \`PuppyMascot.jsx\` using the reference inline SVG structure and \`data-p\` parts for ears, eyes/blink and other artwork, with an accessible label, speech bubble, hanging ring and an IntersectionObserver reveal/swing. The observer is disconnected during cleanup and reduced motion bypasses the reveal animation. A mocked-service test also covers the local-origin journey branch without altering the all-imported available puppy records.
- Replaced the profile journey's dotted connector with a profile-scoped paw-print mask that runs horizontally on desktop and vertically at narrower widths.
- Wrapped only the active gallery stage media in a keyed \`.clone-gallery-page\` element and added the short 0.42-second page-turn animation. The existing media selection, video controls, thumbnails, dialog/lightbox, keyboard/touch behavior and cleanup logic remain in place.
- Replaced the static ribbon band with a profile-only scroll-progress fill updated through a requestAnimationFrame-throttled handler. Scroll/resize listeners, pending frames and the optional ResizeObserver are cleaned up; reduced motion uses a static ribbon.
- Kept the source animation boundary: no homepage \`ReferencePuppyJourney\`, \`PuppyDriver\` or global pointer \`PawTrail\` was mounted/copied onto individual profile routes.

### Files changed

Code and test changes are limited to:
\`frontend/src/pages/PuppyProfilePage.jsx\`, \`frontend/src/pages/PuppyProfilePage.test.jsx\`, \`frontend/src/components/puppies/PuppyMascot.jsx\`, \`frontend/src/components/puppies/PuppyMascot.test.jsx\`, \`frontend/src/components/puppies/PuppyGallery.jsx\`, \`frontend/src/components/puppies/PuppyGallery.test.jsx\`, \`frontend/src/components/puppies/PuppyNoteForm.jsx\`, \`frontend/src/components/puppies/PuppyNoteForm.test.jsx\`, \`frontend/src/data/puppyData.js\`, \`frontend/src/data/puppyData.test.js\`, \`frontend/src/services/contentService.js\`, \`frontend/src/styles/index.css\` and \`.github/workflows/phase2-tests.yml\`.

No dependency was added. The homepage, catalogue page/components/styles, Phase 4 pages and shell, FAQ source data, puppy JSON dataset, WhatsApp helper/config and route definitions remain outside this change.

### Automated verification

GitHub Actions [run #24](https://github.com/dikshaforsure/P-mart/actions/runs/45481254438) passed against the exact final code commit \`610ae3c4e703daeb199a5a8494cc644bf8f91194\`:

- Focused command: \`npx vitest run src/pages/PuppyProfilePage.test.jsx src/components/puppies/PuppyGallery.test.jsx src/components/puppies/PuppyNoteForm.test.jsx src/components/puppies/PuppyMascot.test.jsx src/data/puppyData.test.js\` — **5 files / 38 tests passed**.
- Full command: \`npm test\` — **15 files / 74 tests passed, 0 failures**.
- Production command: \`npm run build\` — **passed** with Vite 8.3.8.
- CI dependency installation: \`npm install --no-audit --no-fund\` — passed.

The older Phase 3 run #13 and Phase 4 runs #15/#16 listed above are retained as historical evidence for their original commits; run #24 is the close-out verification.

### Manual verification and remaining work

The requested viewport checks at 1440×900, 1280×800, 1024×768, 768×1024, 390×844 and 375×812 were **not performed in a real browser** in this session. No screenshots, live media/network validation, browser-console inspection or direct WhatsApp send were performed. Automated jsdom coverage and a production build do not prove visual parity, media availability or absence of viewport overflow; no pixel-perfect claim is made.

Next implementation phase: **Gone Home, Happy Families and Contact**. Those pages are not implemented by this close-out. Homepage refinement and the broader site-wide responsive/browser audit also remain outstanding.


## Phase 5 — Gone Home, Happy Families and Contact (25 November 2026)

**Starting \`develop\` baseline:** \`2cf2501667568cff3553640b3d4c4840fbde5dfe\`  
**Page implementation commit:** \`85a5a6fcd45b74aea661ffa57cebe41752d9dd39\`  
**Test correction commit:** \`0fec72305c72b09915fb4d453bacc205e38d9469\`  
**Final code verification:** [GitHub Actions run #27](https://github.com/dikshaforsure/P-mart/actions/runs/45543194059)

### Reference and destination audit

Inspected the source templates \`src/templates/gone-home.html\`, \`src/templates/happy-families.html\` and \`src/templates/contact.html\`; source data \`src/data/families.json\` and \`src/data/home-families.json\`; and source modules \`src/components.tsx\`, \`src/Template.tsx\`, \`src/types.ts\`, \`src/app.css\` and \`src/reference.css\`. The destination routes, existing shell/data/services/WhatsApp helper, all relevant page tests, asset source register, CSS and project documentation were inspected before implementation.

### Delivered pages

- **Gone Home — \`/gone-home\`:** replaced the placeholder with the “one ticket home” / “admit one” archive treatment. It renders exactly the 27 existing \`goneHomePuppies\` entries in the verified source order, links each ticket to its puppy profile, uses the existing cover/media and factual breed/sex/origin metadata, and includes the available-puppies CTA. The one sold record without a cover or image media item displays a designed paw fallback rather than an invented image. Generic breed-only labels remain generic; no puppy record was renamed or reordered.
- **Happy Families — \`/happy-families\`:** replaced the placeholder with the source introduction, “64 moments and counting” label, Sarah M. testimonial, polaroid/masonry family wall and sign-off. Reused the existing \`frontend/src/data/families.json\` (64 items in the exact source order; eight records carry captions) and \`familyPreview.quote/author\`. The eight \`familyPreview.moments\` are homepage-preview content and were not treated as the full page inventory. The native-dialog image viewer supports close, Escape, arrow-key and touch-swipe navigation, previous/next controls, backdrop dismissal, focus restoration and body-scroll cleanup. Image failures leave a stable fallback in the card.
- **Contact — \`/contact\`:** replaced the placeholder with the letter-style contact form, reference field order, source puppy-choice labels, required name/phone validation, optional email validation, area/message limits and the source \`website\` honeypot. The page reuses the configured \`getWhatsAppUrl()\` helper, includes the existing verified email, Downtown Dubai location, source map link and source showroom photo. No uncertain telephone number is newly displayed.

### Contact delivery limitation

The destination has no verified contact endpoint or backend acknowledgement. The form therefore does **not** send a fake API request or claim a request was received. It composes the form values into the existing configured WhatsApp handoff, opens that link from the submit gesture and exposes the prepared link if the popup is blocked. The visitor is told to review and send the message in WhatsApp. The 15 puppy-choice labels and their order match the source. Because the source option UUIDs belong to an unavailable private backend and the destination has no contact API, the page uses stable local option values and includes the selected visible label in the WhatsApp handoff; it does not submit or persist those option IDs. The reference form's visible fields and honeypot intent were preserved; the reference private endpoint/demo envelope animation was not copied. The WhatsApp helper/configuration and footer phone/email settings were not changed.

### Data, asset and preservation notes

The 27-record sold dataset and its verified order were reused from \`goneHomePuppies\`; no second JSX dataset was introduced. Destination \`families.json\` was compared to reference \`src/data/families.json\`: all 64 records, ordering, IDs, captions, alt text, dimensions and focal points match; only the destination's existing absolute reference-host URLs differ from the source JSON's root-relative paths, so those URLs were left untouched. The contact showroom image is referenced from the supplied reference template. No image binaries were downloaded or added. Public access does not establish reuse rights; assignment/client asset permission remains outstanding. The source/usage details were added to \`frontend/ASSET_SOURCES.md\`.

Phase 3 profile behavior, Phase 4 shared shell/How It Works/FAQ, homepage, catalogue, puppy data JSON, family JSON and WhatsApp configuration were preserved. No TypeScript, dependency, package/lockfile or route-path changes were introduced; the three existing route elements now render dedicated components.

### Files changed

- \`frontend/src/pages/GoneHomePage.jsx\` and \`GoneHomePage.test.jsx\`
- \`frontend/src/pages/HappyFamiliesPage.jsx\` and \`HappyFamiliesPage.test.jsx\`
- \`frontend/src/pages/ContactPage.jsx\` and \`ContactPage.test.jsx\`
- \`frontend/src/app/App.jsx\` and \`App.test.jsx\`
- \`frontend/src/styles/index.css\` (page-scoped Phase 5 selectors)
- \`frontend/ASSET_SOURCES.md\`
- \`.github/workflows/phase2-tests.yml\` (focused Phase 5 test command; full suite/build retained)

No puppy/family data JSON, siteContent, contentService, WhatsApp utility, shared header/footer, Phase 3 profile, Phase 4 pages or homepage code was modified.

### Automated verification

GitHub Actions [run #27](https://github.com/dikshaforsure/P-mart/actions/runs/45543194059) passed on the exact tested code commit \`0fec72305c72b09915fb4d453bacc205e38d9469\`:

- Focused: \`npx vitest run src/pages/GoneHomePage.test.jsx src/pages/HappyFamiliesPage.test.jsx src/pages/ContactPage.test.jsx src/app/App.test.jsx\` — **4 files / 26 tests passed**.
- Full: \`npm test\` — **18 files / 95 tests passed**.
- Production: \`npm run build\` — **passed**, Vite 8.3.8.
- CI install: \`npm install --no-audit --no-fund\` — passed.

### Manual verification and next work

No real-browser checks at 1440×900, 1280×800, 1024×768, 768×1024, 390×844 or 375×812 were performed. No screenshot capture, live image request audit, browser-console inspection, manual lightbox/touch testing, or manual WhatsApp send was performed. Automated jsdom coverage and the production build do not establish visual parity, media reachability or production asset permissions; no pixel-perfect claim is made.

**Next planned work:** homepage visual refinement and a final integrated responsive/browser QA pass across all public routes. Backend contact persistence, enquiry notifications/admin tooling, final asset-rights approval and deployment remain separate open scope items and are not implemented by Phase 5.


### Phase 5 Contact fidelity follow-up — mascot, image fallback and tablet order (25 November 2026)

**Initial Phase 5 audit head:** \`0fec72305c72b09915fb4d453bacc205e38d9469\`  
**Direct parent before this correction:** \`c108eae1ea9f9977aff50a2fc8deb92bfeb1bc48\`  
**Correction commit:** \`bed9eeab2394292462e4dcb2820ddae27a32b59e\`  
**Verification:** [GitHub Actions run #30](https://github.com/dikshaforsure/P-mart/actions/runs/45544244042)

The Phase 5 pages were already present at the start of this follow-up. A second inspection of the source \`contact.html\` and the current page implementation identified three small fidelity/resilience corrections:

- Reused \`PuppyMascot.jsx\` on Contact with optional label/facing/ring/bubble props. Its defaults preserve the individual puppy-profile presentation; Contact now shows the source-style “Teddy, waiting for your letter” SVG beneath the letter form, facing left.
- Added a stable placeholder when the remote showroom photograph fails to load. The showroom card, visit details and map link remain available.
- Corrected the tablet layout below 1024px to one column and made the letter form precede the contact details, matching the source page's narrow-screen flow. Desktop two-column placement is retained.
- Added tests for the mascot's optional source presentation and Contact's image-error fallback; included the mascot test in the Phase 5 focused workflow command.

No dataset, media URL, WhatsApp helper/configuration, contact details, route, other page or package dependency was changed.

#### Contact source-number discrepancy

A direct inspection of the supplied reference repository's current \`src/templates/contact.html\` shows \`+971 54 167 6733\` in its visible WhatsApp/call links. An earlier reference crawl note in \`frontend/ASSET_SOURCES.md\` recorded \`+971 50 000 0000\` and a provider-style WhatsApp URL. These observations conflict across source snapshots. This follow-up records the direct template evidence but does not change the existing destination WhatsApp helper, footer contact values or display a new phone number. Confirm the intended public number with the assignment owner before changing it.

#### Verification and manual QA

Run #30 passed against the exact correction commit:
- Focused: **5 files / 31 tests passed**.
- Full frontend suite: **18 files / 97 tests passed**.
- Production build: **passed**, Vite 8.3.8.

No browser screenshots or manual checks at 1440×900, 1280×800, 1024×768, 768×1024, 390×844 or 375×812 were performed. Live image reachability, actual WhatsApp sending, asset permission and deployed behavior remain unverified.


## Phase 6 — Homepage storybook refinement

The homepage now has a warm storybook visual system scoped to the homepage wrapper. The hero uses six existing featured puppy records, cover images, focal positions and profile links, plus the existing Teddy mascot and paw-mark SVG. A local scalloped quilt, hand-drawn underline and stitched breed ribbon establish the visual tone.

Featured puppy cards use arched showroom-door frames with hinged panels, paw peepholes, availability labels and responsive mobile-open treatment. The two meeting paths gain a wooden signpost. The three existing journey entries are presented as four milestones by splitting the combined final description into its two existing factual clauses. Trust, family, FAQ, WhatsApp and final CTA sections receive scoped scrapbook/polaroid styling. The existing mascot is reused in the CTA.

Focused component tests cover the six-puppy hero lineup, four journey milestones and four family-preview photographs/captions. The visual-QA follow-up widens the hero's central mascot gap, lifts puppy portraits on hover/focus, moves door hinges to the outer edge and restores full-height family Polaroid images. GitHub Actions run [#39](https://github.com/dikshaforsure/P-mart/actions/runs/45565628125) passed the focused public-page/route checks, complete frontend test suite and Vite production build. Real-browser screenshots and viewport QA remain outstanding.
