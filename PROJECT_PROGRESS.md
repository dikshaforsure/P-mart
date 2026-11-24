# TeddyPups Clone — Project Progress

**Last updated:** 24 November 2026  
**Current phase:** Phase 0 — Analysis and documentation  
**Status:** Planning baseline prepared; implementation not started.

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
