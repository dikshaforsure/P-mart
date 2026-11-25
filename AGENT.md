# AGENT.md — TeddyPups Clone Project Handoff

> **Purpose:** Persistent operating guide for every AI coding agent working on this repository. Read it before inspecting or editing code. Keep it current whenever implementation, verification, scope or project status changes.
>
> **Last updated:** 25 November 2026  
> **Destination repository:** https://github.com/dikshaforsure/P-mart  
> **Working branch:** develop  
> **Reference site:** https://puppy.instabizweb.com/  

---

## 1. Instructions for every new agent

You are joining an existing project. Do not treat this repository as a fresh scaffold and do not rely on a previous chat transcript as the source of truth.

Before doing anything:

1. Read this entire file.
2. Fetch the latest remote develop branch and record its exact HEAD.
3. Inspect recent commits and the current contents of all files relevant to the task.
4. Read the corresponding project notes in PROJECT_PROGRESS.md, PROJECT_ANALYSIS.md, AI_PROMPT_LOG.md, TESTING.md and TECHNICAL_DOCUMENTATION.md as needed.
5. Inspect the live reference website and the relevant files already present in this destination repository.
6. Distinguish completed work from unverified visual behaviour and unresolved scope.
7. Continue from the repository's actual state. Never restart, overwrite or duplicate work merely because the chat context changed.

If a task is already complete, audit it against its acceptance criteria and report evidence. Do not implement it again without a demonstrated gap.

### After every meaningful task or phase

- Update this file with the new phase status, commits, verification, remaining work and any newly discovered constraints.
- Update the relevant project documentation files.
- Commit changes only to develop.
- Fetch the changed remote files/commit again and verify the saved state.
- Report exact test/build/browser verification. Clearly separate automated tests from manual browser checks.
- Preserve historical phase records and previous verification evidence.

When a chat is approaching its context limit, leave the repository in a committed, documented state where possible. The next chat should be able to resume by reading this file and inspecting the latest branch.

---

## 2. Project goal

Build a responsive, reference-faithful React clone of the TeddyPups public website for the Blutec AI technical assignment.

The public reference is the supplied host:

- Website: https://puppy.instabizweb.com/

The clone should preserve the reference's warm, playful, editorial/storybook identity, puppy/family content, navigation and customer-contact journeys while keeping data and application structure maintainable.

The project is not a recreation of the reference site's private backend. Do not pretend private API contracts, CRM behaviour, enquiry persistence or internal administration functionality are known when they are not exposed.

---

## 3. Repository and technical constraints

### Destination

- GitHub repository: dikshaforsure/P-mart
- Primary development branch: develop
- Never commit or push this project work to main.
- Before each task, fetch the latest develop HEAD. Do not use a hard-coded old SHA as the current baseline.

### Frontend stack

- React
- JavaScript and JSX only
- Vite
- Tailwind CSS v4 through the existing Vite plugin
- React Router DOM
- Vitest
- React Testing Library
- jsdom

The frontend package scripts are:

- npm run dev
- npm test
- npm run test:watch
- npm run build
- npm run preview

The package declares Node ^20.19.0 or >=22.12.0.

### Hard restrictions

- Do not introduce TypeScript, TSX, Angular or another framework.
- Do not add dependencies for a small task that can be completed with existing React, CSS or browser-native APIs.
- Do not alter package manifests/lockfiles unless required and explicitly justified.
- Do not redesign completed pages to make a new task easier.
- Do not silently change route names, slugs, puppy status, media URLs, source content, contact numbers or shared configuration.
- Do not invent missing puppy names, family captions, testimonials, policies, business guarantees, contact details, API endpoints or successful submission states.
- Do not replace source imagery with generic stock imagery.
- Do not claim pixel-perfect visual fidelity from jsdom tests or a production build.

---

## 4. Source-of-truth and research rules

1. Use only https://puppy.instabizweb.com/ as the designated external reference website. Do not use teddypups.ae to overwrite content; it has previously shown conflicting origin/contact details.
2. Inspect the live reference pages, visible content, links, image behaviour and interactions directly when source comparison is needed. Use the destination repository's existing files, data, assets and project documentation to guide implementation.
3. A text extract or old screenshot cannot establish exact layout, responsive behaviour, animation timing or remote media availability.
4. Follow what the designated reference website visibly supports. If a fact or behaviour cannot be verified from that website or the existing destination project, say it is unknown rather than inventing it.
5. Keep asset provenance in frontend/ASSET_SOURCES.md. Public accessibility does not establish permission to redistribute images or videos.
6. Retain the source hostname in existing media references unless an approved asset migration is explicitly in scope.
7. If a page, URL, image or media item cannot be checked, record the limitation instead of substituting unrelated content.

Do not use or disclose any other code repository as the reference for this assignment. The designated public reference is the live website above; the destination repository and its existing project files are the implementation workspace.

Inspect current destination files rather than relying on external source-code paths or old snippets.

---

## 5. Current project status

### Current branch snapshot at creation of this handoff

The latest remote develop HEAD inspected before creating this file was:

1443b66d2679f035c97a658e4d947ef3f2a8245a

Commit message: docs: record Phase 5 contact fidelity follow-up

GitHub Actions run [#31](https://github.com/dikshaforsure/P-mart/actions/runs/45544612194) completed successfully against that exact HEAD.

This SHA is a historical baseline for this handoff file, not a permanent current HEAD. Every new agent must fetch the branch again.

### Phase completion overview

| Phase | Scope | Status |
|---|---|---|
| 0 | Reference research and project documentation | Complete; source limitations documented |
| 1 | Frontend foundation and initial homepage | Implemented; do not infer browser polish from code presence |
| 2 | Available puppy catalogue, data layer and reusable puppy profiles | Implemented |
| 3 | Puppy profile storybook close-out/corrections | Implemented; real-browser visual QA outstanding |
| 4 | Shared header/footer, How It Works and FAQ | Implemented |
| 5 | Gone Home, Happy Families and Contact | Implemented; real-browser visual QA and contact/backend limitations remain |
| 6 | Homepage reference-fidelity refinement | Implemented on develop; interactive mascot, slower paw trail, scalloped shared header and route scroll reset committed; CI run #56 green; real-browser visual QA outstanding |
| 7 | Integrated browser/responsive QA across all public routes | Not completed |
| 8 | Backend enquiry persistence/notifications/admin scope decision and implementation if approved | Not completed / scope approval required |
| 9 | Deployment, final security/configuration and handoff | Not completed |

Do not call the entire project complete. Phases 0–6 public frontend implementation is committed; integrated browser/responsive QA, backend scope and deployment remain open.

---

## 6. Completed implementation record

Commit references below are historical evidence. Always fetch live files before making changes.

### Phase 2 — Catalogue and reusable profiles

- Destination branch: develop
- Implementation commit: 0a1720104729a40fa770a7a849ee9ae7d9dcaa15
- Documentation follow-up: ec630aae429d932730738710090b2986f2590cfc
- Catalogue filters, cards and URL filter state were implemented and tested.
- Existing 42 puppy records were retained: 15 available and 27 sold.
- The reusable /puppies/:slug route supports exact-slug lookup, variable image/video galleries and existing WhatsApp enquiry handoff.
- Historical sold profiles remain addressable.
- Detailed historical CI results are recorded in PROJECT_PROGRESS.md; read that file before quoting a Phase 2 result.

### Phase 3 — Puppy profile source-fidelity close-out

- Initial profile implementation/fixes include 3ab43aa136fdf40c9dd3b2dd53fd6f60db9f9837.
- Audit/refinement: 02be169ed8dd690840934f3994322683f6df9e49.
- Final close-out code commit: 610ae3c4e703daeb199a5a8494cc644bf8f91194.
- Documentation commit at the time: 2cf2501667568cff3553640b3d4c4840fbde5dfe.
- Final code CI run #24: https://github.com/dikshaforsure/P-mart/actions/runs/45481254438
- Verified on that run: focused 5 files / 38 tests; full 15 files / 74 tests; production build passed using Vite 8.3.8.

Critical source hierarchy:

**Available profile**
1. Chapter 1: “hello, it’s me”
2. Chapter 2: “what comes with [name]”
3. Chapter 3: “the way home” with journey trail
4. Chapter 4: “dear TeddyPups…” enquiry letter

**Sold profile**
1. Chapter 1: “the day they went home”
2. Chapter 2: “what comes with [name]”
3. Chapter 3: “dear TeddyPups…” enquiry letter

Sold profiles do not show the journey chapter/trail. Both available and sold profiles have previous/next links. Available order follows available catalogue order; sold order follows the reference Gone Home archive order.

Phase 3 features include:
- Reusable source-style SVG mascot and hanging information-board treatment.
- Paw-print journey connector for available profiles.
- Keyed 0.42-second gallery page-turn wrapper.
- RequestAnimationFrame-throttled profile ribbon progress.
- Reduced-motion support and cleanup for observers/listeners/frames.
- Existing gallery/lightbox, video, keyboard, touch, fallback, form validation and WhatsApp handoff retained.

Do not add the homepage-only ReferencePuppyJourney, global pointer PawTrail or PuppyDriver to individual profile routes.

**Known Phase 3 limitation:** no real-browser visual comparison at the requested viewports has been completed.

### Phase 4 — Shared shell, How It Works and FAQ

- Implementation commit: 86ae5779f79f51c14c09de950393d34c6660c7bc
- Documentation follow-up: 4c2ad275b707139fdcfdee37cede3c36462f6d8c
- CI run #15: https://github.com/dikshaforsure/P-mart/actions/runs/45474656254
- Verified on that run: focused 4 files / 15 tests; full 14 files / 64 tests; Vite 8.3.8 production build passed.
- Header/footer were refined while retaining navigation, focus, Escape, focus loop, route-close and body-scroll-lock behaviour.
- /how-it-works supports the source's local/imported tabs, two four-step paths, section anchors and supporting content.
- /faq uses the existing nine FAQ records, search, clear/reset, count, accordion semantics and no-result state.
- Existing FAQ source JSON was retained.
- Some unsupported guarantee/policy statements were qualified rather than promoted as unconditional promises.

### Phase 5 — Gone Home, Happy Families and Contact

- Initial implementation commit: 85a5a6fcd45b74aea661ffa57cebe41752d9dd39
- Follow-up test correction: 0fec72305c72b09915fb4d453bacc205e38d9469
- Phase 5 implementation record: a290f1ace5c17ac1d0480bb8d46901a343497235
- Contact option/source clarification: c108eae1ea9f9977aff50a2fc8deb92bfeb1bc48
- Contact fidelity correction code commit: bed9eeab2394292462e4dcb2820ddae27a32b59e
- Latest Phase 5 documentation commit: 1443b66d2679f035c97a658e4d947ef3f2a8245a
- Phase 5 CI run #27: https://github.com/dikshaforsure/P-mart/actions/runs/45543194059
- Contact correction CI run #30: https://github.com/dikshaforsure/P-mart/actions/runs/45544244042
- Latest docs-head CI run #31: https://github.com/dikshaforsure/P-mart/actions/runs/45544612194

**Gone Home**
- Dedicated page frontend/src/pages/GoneHomePage.jsx.
- Uses existing goneHomePuppies, source ticket-card motif, 27 sold records in source order, puppy profile links and available-puppies CTA.
- Unavailable image for one record gets a stable paw fallback.
- Do not duplicate sold records in JSX or invent missing names.

**Happy Families**
- Dedicated page frontend/src/pages/HappyFamiliesPage.jsx.
- Full 64-item page gallery comes from frontend/src/data/families.json.
- Eight homepage preview moments in siteContent.js are separate and are not the full gallery.
- Testimonial uses verified familyPreview.quote and familyPreview.author.
- Full gallery preserves source order, IDs, captions, alt text, dimensions and focal points.
- Accessible native-dialog lightbox includes close, previous/next, Escape, arrow-key, touch-swipe, backdrop, focus restoration and background-scroll locking.
- Eight gallery entries have non-empty captions; others remain uncaptained as in the source data.

**Contact**
- Dedicated page frontend/src/pages/ContactPage.jsx.
- Source field order: name, phone, email, area, puppy selector, message, website honeypot.
- Name and phone required; email optional; puppy selector optional.
- The 15 visible puppy choice labels/order match the source. Source private option UUIDs are not reused; stable local values are used.
- Validation, inline feedback and honeypot exist.
- Reuses existing PuppyMascot with contact-specific accessible label/facing/presentation.
- Showroom image has a fixed-size fallback on image error.
- Tablet/narrow layout below 1024px places the letter before contact details.
- The destination does not have a verified contact API. Form submit prepares and opens the existing configured WhatsApp link; visitor must manually send. Do not claim backend delivery or successful persistence.
- The source contact template's current number +971 54 167 6733 conflicts with an earlier crawl note that recorded +971 50 000 0000 and a provider-style link. Destination keeps its existing WhatsApp helper and does not print an unconfirmed phone number. Do not change the number/configuration without assignment-owner confirmation.

Phase 5 CI run #30 verified:
- Focused 5 files / 31 tests passed.
- Full frontend suite 18 files / 97 tests passed.
- Production build passed with Vite 8.3.8.

Run #31 completed successfully on the latest Phase 5 documentation HEAD. The detailed 5/31 and 18/97 counts above are explicitly recorded for run #30 in project documentation.

---

## 7. Current architecture and important files

### Application/routing

- frontend/src/main.jsx — application entry.
- frontend/src/app/App.jsx — React Router routes.
- frontend/src/app/App.test.jsx — route integration tests.
- frontend/src/components/layout/ — shared app layout, header/footer, PawTrail and ScrollToTop.

Implemented public routes:
- /
- /puppies
- /puppies/:slug
- /gone-home
- /happy-families
- /how-it-works
- /faq
- /contact

All three formerly placeholder routes for Gone Home, Happy Families and Contact now use dedicated page components.

### Pages

- frontend/src/pages/HomePage.jsx
- frontend/src/pages/PuppiesPage.jsx
- frontend/src/pages/PuppyProfilePage.jsx
- frontend/src/pages/GoneHomePage.jsx
- frontend/src/pages/HappyFamiliesPage.jsx
- frontend/src/pages/HowItWorksPage.jsx
- frontend/src/pages/FaqPage.jsx
- frontend/src/pages/ContactPage.jsx
- frontend/src/pages/NotFoundPage.jsx

### Data and services

- frontend/src/data/puppies.json — 42 records, 15 available and 27 sold.
- frontend/src/data/puppyData.js — available/sold mapping, lookup and adjacent ordering.
- frontend/src/data/breeds.json
- frontend/src/data/families.json — complete 64-record family gallery.
- frontend/src/data/home-families.json — source family/home data snapshot; inspect before reuse.
- frontend/src/data/faq.json — nine FAQ records.
- frontend/src/data/siteContent.js — shared site settings and homepage preview content.
- frontend/src/data/howItWorksContent.js — How It Works page-specific data.
- frontend/src/data/referenceAssets.js — homepage reference image assets.
- frontend/src/services/contentService.js — Promise-based service boundary over current static data.

Use the existing service/data patterns. Do not duplicate data inside page components.

### Shared components

- frontend/src/components/shared/ — PageIntro, SectionHeading, JourneyStep, PawMark and related shared pieces.
- frontend/src/components/puppies/ — PuppyCard, PuppyGallery, PuppyNoteForm, PuppyMascot.
- frontend/src/components/layout/ — SiteHeader, SiteFooter and AppLayout.

### Utilities/styles

- frontend/src/utils/whatsapp.js — single existing WhatsApp URL helper. Preserve configuration unless confirmed otherwise.
- frontend/src/styles/index.css — global tokens and page-scoped CSS.

### Documentation

- PROJECT_PROGRESS.md — chronological implementation and verification history.
- PROJECT_ANALYSIS.md — research/source comparisons and discrepancies.
- AI_PROMPT_LOG.md — user/agent task history and implementation prompts.
- TESTING.md — test instructions and recorded test evidence.
- TECHNICAL_DOCUMENTATION.md — architecture and technical design.
- frontend/ASSET_SOURCES.md — asset provenance, remote media and rights caveats.
- This file, AGENT.md — standing rules, current snapshot and chat-to-chat handoff.

---

## 8. Unresolved constraints and risks

These are intentional known limitations, not permission to guess.

### A. Real-browser responsive/visual QA is outstanding

No full real-browser viewport pass, screenshots or screenshot-to-reference comparison has been completed for the public site.

Required viewports for the final pass:
- 1440 × 900
- 1280 × 800
- 1024 × 768
- 768 × 1024
- 390 × 844
- 375 × 812

At minimum inspect:
- Homepage hero, sections, images and any decorative motion.
- Available catalogue and filters.
- Available and sold profiles, including mascot, hanging board, gallery page-turn, paw connector, ribbon, enquiry and adjacent cards.
- Gone Home ticket grid.
- Happy Families full photo wall and lightbox.
- How It Works tabs, anchors and responsive state.
- FAQ search and accordion.
- Contact form, validation, mascot, showroom card and WhatsApp handoff.
- Header mobile menu, footer, direct routes and no horizontal overflow.
- Browser console and network/media loading where possible.
- prefers-reduced-motion.

Do not call the site pixel-perfect before this is performed and documented.

### B. Contact number / WhatsApp uncertainty

- Contact source current template indicates +971 54 167 6733.
- Earlier extracted crawl recorded +971 50 000 0000 and a different provider-style WhatsApp link.
- Destination currently uses getWhatsAppUrl() reading siteSettings.whatsappNumber; current data value observed is 971500000000.
- This value is not independently confirmed as the intended production destination.
- Destination Contact does not display a disputed telephone number and does not change the configured helper.
- Ask the assignment owner to confirm the public contact destination before changing any shared phone/WhatsApp configuration.

### C. No enquiry backend or persistence

- No verified destination contact/profile enquiry API is available in the frontend repository.
- Contact and puppy profile forms use explicit WhatsApp handoffs.
- Contact input is not persisted to MongoDB.
- No email notification, enquiry dashboard or protected admin is implemented.
- Never show a false successful-submission state. A prepared WhatsApp message is not the same as a sent message.
- Backend persistence/admin/notifications require a separate scope decision and secure design.

### D. Media reachability and rights

- Puppy and family image URLs reference puppy.instabizweb.com.
- The Contact showroom photograph is also remote from that host.
- Remote media response/loading has not been audited across all routes in a real browser.
- No asset-rights approval is documented.
- Do not download/rehost assets or claim production usage rights without assignment/client approval.

### E. Available puppy origin discrepancy

- The 15 current available records in puppies.json use imported origin labels.
- The alternate teddypups.ae host has previously shown the same puppy inventory as In Dubai.
- That alternate host is not the designated reference.
- Do not change origin labels based on it. Recheck the supplied host or ask the assignment owner if the distinction affects presentation.

### F. Deployment

- No deployment completion is documented.
- Verify production environment, routes/deep links, asset delivery, contact destination, HTTPS and security before claiming deployment readiness.

---

## 9. Next planned phase — Phase 7: Integrated browser and responsive QA

Phase 6 homepage implementation is complete and committed. Do not restart or reimplement it unless a real-browser comparison demonstrates a specific defect.

**Verified Phase 6 code commit:** `184424063be64b111b6c7bf763acff9a7a99075a`  
**Phase 6 implementation CI:** [run #36](https://github.com/dikshaforsure/P-mart/actions/runs/45552850391) — passed focused public-page/route tests, full frontend suite and production build.  
**Latest verified homepage/header/scroll implementation:** 392a440feb845edc6e6da016c4598e53f4fa4a21. **Latest regression-test corrections:** b7c70dd6a8992ebd33920db07ef781a141babfa4 and 5d3d4e310258b1edeff4d4532f10329c4dc572c0. CI run #56 passed on the latest test revision. Fetch the live develop head before continuing.

### Phase 7 objective

Perform real-browser visual, responsive, accessibility and interaction QA across every implemented public route. Compare the running destination application with the designated live reference site `https://puppy.instabizweb.com/`. Automated jsdom tests and a successful production build are not substitutes for this work.

### Required viewports

- 1440 × 900
- 1280 × 800
- 1024 × 768
- 768 × 1024
- 390 × 844
- 375 × 812

Use browser/device emulation or actual devices where possible. Record browser name/version, viewport, commit SHA, observed issue and evidence for each material finding. Capture screenshots for the clone and reference when permitted by the available tools.

### Public routes and interactions to verify

- `/`: hero, six-puppy portrait lineup, image crops/focal positions, quilt edge, mascot, breed ribbon, puppy-door focus/hover/touch behavior, signpost, four-step route, existing WhatsApp illustration, trust cards, family preview, FAQ preview and final CTA.
- `/puppies`: catalogue listing, every supported filter, combined filters, query-string persistence, result count, reset and profile navigation.
- `/puppies/:slug`: representative available and sold profiles; correct chapter counts/content; gallery navigation/lightbox/video fallback; available-only journey; adjacent puppy links; enquiry validation and WhatsApp handoff.
- `/gone-home`: all sold puppy cards, order, image fallback and profile links.
- `/happy-families`: all 64 family photos, captions, lightbox previous/next, close, Escape, arrow keys, touch swipe, backdrop, focus restoration and body-scroll lock.
- `/how-it-works`: local/imported tabs, keyboard behavior, anchors, responsive cards and CTAs.
- `/faq`: search, clear, live result count, accordion open/close and empty state.
- `/contact`: field order, required/optional validation, selector, honeypot, showroom image fallback, responsive letter order and explicit WhatsApp handoff. Do not submit a real message without permission.
- Shared header/mobile menu/footer, direct route loads, refresh/deep links, browser back/forward and not-found route.

### Visual and technical checks

- No unintended horizontal overflow at any required viewport or 200% browser zoom.
- Check layout at orientation changes and tablet breakpoints; inspect sticky/fixed elements, image aspect ratios, typography wrapping, card gaps and CTA visibility.
- Test keyboard-only navigation, visible focus, semantic headings/landmarks/labels, accessible names, dialog focus behavior and touch target usability.
- Verify `prefers-reduced-motion`; decorative animation must not interfere with navigation or reading.
- Inspect console errors, failed network requests and remote image/video loading when the browser environment allows it.
- Do not claim that remote assets load correctly, that video playback works or that page motion is correct unless directly tested.

### Work policy and exit criteria

1. Fetch the current `develop` head and inspect the current code before testing.
2. Use the live reference website as the designated external reference and the destination repository as the implementation source of truth.
3. Create an issue/evidence list before editing. Separate real functional defects from subjective styling differences.
4. Fix only verified defects with the smallest possible changes. Do not redesign completed pages or alter data, contact configuration, routes, content or shared components without clear evidence and justification.
5. Add focused regression tests for defects where applicable; retain the full-suite and production-build workflow.
6. Re-run focused tests, full `npm test`, and `npm run build`; inspect the exact diff.
7. Update `AGENT.md`, `PROJECT_PROGRESS.md`, `TESTING.md`, `PROJECT_ANALYSIS.md` and/or `AI_PROMPT_LOG.md` as appropriate. Record all screenshots/manual checks and limitations.
8. Commit only to `develop`, verify the remote commit, and confirm the corresponding CI result.

If a real browser is unavailable, do not invent browser results or mark Phase 7 complete. Report the exact limitation and provide a precise manual QA checklist the user can execute.
---

## 10. Following phases

### Phase 7 — Integrated browser and responsive QA

After Phase 6, audit every public route at the six viewport sizes listed above. Capture screenshots where tools permit. Check direct route loads, browser console, network errors, image/video handling, focus/keyboard/mobile interactions, reduced motion, overflow and page transitions.

Fix only verified defects. Avoid redesigning already accepted pages. If the agent cannot operate a real browser, explicitly state that and provide a precise manual QA checklist rather than claiming visual checks were performed.

### Phase 8 — Backend enquiry scope decision

Before implementing, confirm whether the assignment requires actual persisted enquiries.

If approved, design a secure backend contract first. Expected topics:
- Node/Express application structure if absent.
- MongoDB/Mongoose connection via environment variables.
- Enquiry schema and input validation.
- Honeypot/rate limiting and abuse protections.
- Safe acknowledgement/error states.
- Email notification only with configured provider credentials.
- No exposed secrets or client-only authorization.
- Separate testing with a test DB.
- Do not build admin CRUD unless explicitly in scope.

If the backend remains out of scope, document the frontend WhatsApp-only limitation.

### Phase 9 — Deployment and handoff

- Production build.
- Environment variable inventory.
- Deep-link fallback/routing.
- HTTPS/CORS/security.
- Database/media configuration if backend is added.
- Contact number confirmation.
- Asset-rights decision.
- Smoke test every route.
- Final project documentation and handoff.

---

## 11. Required engineering workflow

For each change:

1. **Inspect:** fetch exact current source files, data, tests and current branch.
2. **Compare:** identify source-supported deltas before editing.
3. **Plan minimally:** list files expected to change and why.
4. **Implement:** preserve all unrelated logic, data, style and names.
5. **Test:** add/update focused tests for new and existing behaviour.
6. **Full verification:** run npm test and npm run build from the frontend directory.
7. **Diff audit:** review changed files, accidental formatting/data drift, secrets, unrelated modifications and regressions.
8. **Document:** update progress, analysis, prompt log, testing/assets and this AGENT file as appropriate.
9. **Commit:** use a descriptive commit on develop.
10. **Verify remote:** fetch commit and final file contents; check GitHub Actions result.
11. **Report:** state exact facts and limitations. Do not imply browser checks occurred when only jsdom ran.

### Testing commands

From frontend/:

- Focused tests, e.g. npx vitest run src/pages/SomePage.test.jsx
- Full suite: npm test
- Build: npm run build

Do not modify the test workflow so it stops running the full suite/build. A focused phase test can be added while retaining full verification.

If npm install/build/tests fail, capture exact command/error. Do not fabricate success.

---

## 12. Documentation maintenance contract

This file is intended to survive chat limits and agent changes. Keep it operational and factual.

At the end of every phase:
- Update the status table.
- Update current phase and next planned phase.
- Replace the old baseline with the new latest verified commit, while retaining historical commit records.
- Add implementation and documentation commit SHAs.
- Record CI run links and exact test/build counts.
- Record any unresolved issue or user decision.
- Update the changed-file and architecture map if it materially changed.
- Add new source discrepancies and asset provenance.
- Keep browser/manual QA separate from CI/automated test claims.

Do not delete earlier phase notes or rewrite old CI results. Add dated follow-up sections.

---

## 13. New-chat handoff prompt

When starting a new chat, provide this message together with repository access:

“Continue the TeddyPups project in dikshaforsure/P-mart. Read the root AGENT.md completely before acting. Fetch the latest develop branch and inspect recent commits and the current task state. Treat AGENT.md and the repository as the source of truth, not prior chat summaries. Preserve completed phases, work only on develop, inspect source before edits, continue only incomplete work, run tests/build, update AGENT.md and project docs, commit and verify remote state. Do not invent content or claim unperformed browser verification. First report the current state you found and the exact next action.”


## 8. Phase 6 — Homepage storybook refinement

**Implementation state:** Homepage storybook design and screenshot-driven corrections are committed on develop. Latest hero polish commit: `cbb67ab3516e92ce135f4796cabcf18ba9e99036`. Manual real-browser visual QA remains outstanding.

- Reworked the hero into a warm cream/sunrise scene with six puppy portraits from existing featured puppy records, preserving cover images, focal positions and profile links.
- Reused the existing Teddy mascot and paw SVG. Added a local scalloped quilt treatment and hand-drawn underline.
- Restyled the breed ribbon as a stitched fabric strip.
- Converted featured puppy cards into arched showroom doorways with hinged panels, paw peepholes, availability labels and keyboard-focus interaction. Mobile shows the photo without relying on hover.
- Added a decorative wooden signpost above the existing two-path cards.
- Split the existing combined final journey description into secure-your-puppy and safe-delivery milestones using only its existing factual clauses.
- Restyled the existing WhatsApp illustration, trust cards, family preview, FAQ notes and final CTA using homepage-scoped cocoa/toffee/honey styles. Reused the existing mascot in the final CTA.
- Visual QA follow-up after owner-provided screenshots: increased the open center pocket between hero portraits, added keyboard-accessible hover lift, moved the showroom door hinge to the outer edge (with the knob on the free edge), and restored fixed Polaroid photo/caption sizing.
- Latest hero follow-up: shifted the visible mascot artwork left inside its SVG viewBox so the dog itself—not only its container—is centered in the hero; disabled the right-ear flap in this hero placement to keep the ears balanced and centered the speech bubble with the face.
- Added a randomized automatic puppy portrait cycle. One or two portraits dip below the quilt and return at random intervals of approximately 2.9–4.7 seconds. The cycle is disabled when `prefers-reduced-motion: reduce` is active.
- Changed the hero heading to the soft Fraunces display face and modestly increased shared desktop navigation, wordmark and WhatsApp label typography to better match the supplied reference screenshot. The header typography adjustment is intentional and shared; hero-only effects remain scoped under `.home-page-storybook`.
- Added focused HomeHero tests for single/double portrait dips and reduced-motion handling. Existing route/data/contact behavior and all non-homepage page components remain unchanged.

**Verification:** GitHub Actions [run #41](https://github.com/dikshaforsure/P-mart/actions/runs/45570910674) passed on implementation commit `cbb67ab3516e92ce135f4796cabcf18ba9e99036`: focused public-page/route checks (5 files / 31 tests), complete frontend suite (21 files / 103 tests) and Vite 8.3.8 production build. Build completed successfully; Vite emitted its existing bundle-size advisory. Local test/build commands were not executed in this environment. No real-browser screenshot comparison, live animation inspection or viewport interaction check was performed; those remain part of Phase 7.

### Global mouse paw cursor and movement trail (25 November 2026)

- Added `frontend/src/components/layout/PawTrail.jsx` once in `AppLayout`, so the effect is shared by all public routes and is not duplicated inside individual pages/profile routes.
- Reused the existing `PawMark.jsx` SVG for each animated trail footprint. The CSS custom cursor carries the matching PawMark silhouette in a small data-URI SVG.
- Fine-pointer mouse/pen movement creates a footprint after a distance/time threshold; marks fade away after 780 ms, with a capped 14-mark layer to keep rendering bounded.
- Text inputs/textareas/contenteditable retain the text insertion cursor; disabled controls retain `not-allowed`. Coarse/touch devices do not receive the custom cursor/trail. The trail is disabled for `prefers-reduced-motion`.
- Pointer listeners and all outstanding timeout handles are removed on component unmount.
- Added `PawTrail.test.jsx`: footprint creation/fade, touch suppression, coarse-pointer suppression, reduced-motion suppression and unmount timer cleanup.
- No new dependency, route, asset download, or puppy/contact data change.

**Implementation commit:** `d12b7753fef7ac31f5040c96078a764fc9363779`  
**CI:** [GitHub Actions run #43](https://github.com/dikshaforsure/P-mart/actions/runs/45571912528) passed focused checks (5 files / 31 tests), full frontend suite (22 files / 108 tests) and the Vite 8.3.8 production build.

**Manual verification:** real-browser cursor appearance, trail density and visual performance have not been inspected in a browser. Check on a mouse/pen desktop and confirm that touch devices retain their native pointer behavior.
### Happy Families page opening layout refinement — 25 November 2026

- The owner screenshot showed the testimonial auto-placed in the second grid row's first column while the second column was unoccupied.
- Reorganized the opening area into a two-column feature row: the existing Sarah M. testimonial on the left and a four-photo Polaroid collage on the right.
- The collage uses records 1–4 from the existing families.json array. The lower masonry wall renders records 5–64. All 64 source photos therefore appear once, in original order, with original IDs, captions, alt text, focal positions and image URLs preserved.
- FamilyMomentCard still receives the original full-array index, so accessible photo numbers and lightbox navigation remain aligned with the 64-item dataset.
- Tablet and mobile layouts stack the testimonial and collage; the collage remains two columns on narrow screens.
- Updated HappyFamiliesPage and App route tests cover both lists, all 64 ordered photo buttons and the featured-image failure fallback.
- The live reference page could not be opened in the web inspection tool for this follow-up; the correction is based on the supplied screenshot and inspected destination source.

**Implementation:** 2374cd56506ed080c0f01f0ce7cf5bf59340e106; route-test correction: cd2297de6a7bfbd4224cc1b1779ec7cbe50e25c0.
**CI:** [run #46](https://github.com/dikshaforsure/P-mart/actions/runs/45573989205) passed focused checks (5 files / 32 tests), full frontend suite (22 files / 109 tests) and Vite 8.3.8 production build.

**Manual visual QA:** no real-browser screenshot comparison has been completed. The layout has not been visually verified at the six Phase 7 viewport sizes.
### Happy Families lightbox image-fit correction (25 November 2026)

- Owner screenshot showed a portrait source photograph (photo 13, 1306 × 1600) rendered as a wide stage-sized image and visibly cropped.
- Replaced the dialog's percentage-height image arrangement with a three-row grid: fixed toolbar, minmax(0,1fr) image stage, and optional caption.
- The lightbox image now uses intrinsic sizing (`width/height: auto`) and `max-width/max-height: 100%` with `object-fit: contain`, so portrait and landscape originals fit fully within the available stage without stretching or cropping.
- Kept source width/height attributes, source focal data, image URLs, gallery thumbnails, navigation, keyboard/touch behavior, focus restoration and background scroll lock unchanged.
- Added a regression test for photo 13 and a landscape source photo to verify intrinsic dimension attributes and contain sizing.

**Implementation commit:** `04ead9cc5dd50e6dec25f3fa79184e3dcc9e688a`.
**CI:** [run #48](https://github.com/dikshaforsure/P-mart/actions/runs/45576189601) passed focused checks (5 files / 33 tests), the complete frontend suite (22 files / 110 tests) and Vite 8.3.8 production build (65 modules transformed).

**Manual verification:** the fix has not been inspected in a real browser yet. Confirm portrait and landscape lightbox photos at desktop and mobile sizes; automated tests verify the sizing styles and source dimensions, not rendered browser geometry.
### Homepage Teddy mascot and paw-trail refinement (25 November 2026)

- Owner screenshots compare the destination hero with the supplied reference. The existing PuppyMascot SVG already contains open/shut eye groups and two separate front-paw shapes. Reused these; no replacement illustration or external asset was added.
- PuppyMascot.jsx now exposes the two existing front paw shapes as data-p="paw-left" and data-p="paw-right" groups. No global mascot animation behavior was changed.
- Homepage HomeHero wraps Teddy in an accessible button. Hover/focus triggers a short two-blink eye animation. Clicking triggers a short alternating two-paw wave and cycles the existing bubble text through woof woof!, ruff ruff!, yip-yip!, arf arf! and paw-some to see you!. The phrase is also announced through a polite live region. Other PuppyMascot placements remain non-interactive.
- The homepage mascot is larger (clamp(260px,26vw,360px) on desktop) and placed lower. Its stacking order remains below the quilt (hero-mascot-anchor z-index 4; hero-quilt z-index 5), so the cloud/scallop boundary overlays the lower paws. Responsive sizing overrides are included for tablet/mobile.
- Global PawTrail uses an 84px minimum distance AND 220ms minimum interval between prints, a maximum of five simultaneously rendered stamps, and 1.8-second fade duration. It remains limited to fine mouse/pen pointers, ignores touch/coarse devices, respects reduced motion, and cleans up listeners/timeouts.
- No package manifest, lockfile, dependency, route, image URL, puppy data or contact configuration was changed. The repository has no committed frontend/package-lock.json; the workflow currently installs using npm ranges.
- Tests were added/updated for mascot button greetings/wave state, presence of both paw groups, trail spacing/cadence, five-mark cap and 1.8-second fading. The trail component focused tests passed in the first CI attempt.
- First workflow attempt #51: focused checks passed (5 files / 33 tests); full suite reached 112 passed and 1 failed. Failure was the new HomeHero test using direct DOM .click() instead of RTL fireEvent.click(). The test was corrected in commit ca41cfeb3c5337f4f578351378e8e3c1284f5c26.
- Workflow #52, attempts 1 and 2, failed in npm install before any tests/build with ETARGET No matching version found for tldts-core@^7.5.6. No production-build result exists after the test correction. Do not change dependencies to mask this external resolution failure without checking the dependency tree and confirming a compatible version.
- Real-browser mascot scale/layering, hover blink, click wave and trail cadence have not been visually inspected. jsdom can assert state/timers but does not validate rendered animation or layering.
### Shared scalloped header edge and route scroll reset — 25 November 2026

- Owner compared the destination's straight lower header edge with the supplied original screenshot, which shows a repeated scalloped/cloud edge. The shared .site-header now removes its straight border and renders a repeated radial-gradient scallop in ::after, with a subtle drop shadow. The decoration spans all routes because it is applied to the shared header; nav content, sticky positioning and mobile menu behavior remain unchanged.
- Added frontend/src/components/layout/ScrollToTop.jsx to the shared AppLayout. It sets browser history scroll restoration to manual, then jumps to the top on pathname changes. Valid hash destinations are scrolled into view instead; query-only changes (including catalogue filters) do not trigger a reset.
- Added ScrollToTop.test.jsx covering initial/path navigation reset, query-only state retention and hash-target navigation. SiteHeader.test.jsx now confirms the shared banner retains its header class.
- No route, content, contact, data, package or dependency changes.
- Implementation commit: 392a440feb845edc6e6da016c4598e53f4fa4a21. Scroll-test isolation correction: b7c70dd6a8992ebd33920db07ef781a141babfa4. Mascot visible-bubble assertion correction: 5d3d4e310258b1edeff4d4532f10329c4dc572c0.
- GitHub Actions run #56 (https://github.com/dikshaforsure/P-mart/actions/runs/45588040638) passed against 5d3d4e310258b1edeff4d4532f10329c4dc572c0: focused checks 5 files / 33 tests; full suite 23 files / 116 tests; Vite 8.3.8 production build passed (66 modules transformed).
- Real-browser visual inspection of the scallop depth/shadow across desktop/mobile and real navigation scroll behavior has not been performed. jsdom confirms scroll calls and branch behavior but cannot measure rendered header geometry.