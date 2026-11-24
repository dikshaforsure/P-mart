# AI-Assisted Development Log

This log records AI-assisted work with factual limits. Add actual prompts, tools/models (only when known), changed files and verifiable outcomes after each phase. Do not fabricate model identity, tool usage, commits or test results.

## Session 1 — Phase 0 research and documentation

**Date:** 24 November 2026  
**Phase:** 0 — Analysis and planning  
**Assistant:** ChatGPT. A precise model/version identifier was not captured in the available execution metadata, so none is asserted.

### Tools actually used
- GitHub connector: repository metadata, tree, README, commit history/details and documentation branch creation.
- Web browser: opened the supplied reference routes and representative puppy profiles.
- No local terminal, IDE, package manager, database, browser automation or application runtime was used.

### User prompt (faithful summary, not verbatim)

The user requested Phase 0 only: analyse the supplied TeddyPups site and repository, document page/listing/profile differences, interactions, animations, responsive gaps, propose MERN architecture and API/data models, create five Markdown documents, commit/push them, preserve existing content/history, install no dependencies and write no app code, then stop for review.

### Verified observations
- Repository `dikshaforsure/P-mart`: default branch `main`; tracked tree initially contained only README.md; README had two duplicate `# P-mart` headings; two visible commits both titled `first commit`.
- Connected `dikshaforsure` account reported admin/maintain/push permissions.
- Created branch `docs/phase-0-analysis` from `main`.
- Inspected homepage, `/puppies`, `/gone-home`, `/happy-families`, `/how-it-works`, `/faq`, `/contact`, plus representative Max, Korean Teacup Maltipoo and Korean Teacup Poodle profiles.
- Supplied-host snapshot: 15 available, 27 gone-home, FAQ count 9, family gallery label “64 moments and counting”.
- Separate `teddypups.ae` domain has conflicting indexed values and was excluded.

### Documentation outputs
- PROJECT_ANALYSIS.md
- TECHNICAL_DOCUMENTATION.md
- PROJECT_PROGRESS.md
- TESTING.md
- AI_PROMPT_LOG.md

### Implementation/test state
No application code, components, services, API routes, models, dependencies, lockfiles, tests or deployments were created or run in this session.

**GitHub write status:** Documentation branch created. Record commit SHA and successful post-write file verification only after the documentation commit exists and is checked.

### Future log accuracy rules
- Label prompt summaries as summaries unless exact prompt text is recorded.
- Record a specific model only when execution metadata or user-provided evidence shows it.
- List only tools/actions actually used and files actually changed.
- Keep tests NOT RUN until executed with evidence.
- Distinguish proposals from implemented behaviour.


## Session 2 — Phase 1 frontend foundation and homepage

**Date:** 24 November 2026  
**Phase:** 1 — Frontend setup, shared layout, routes and homepage  
**Assistant:** ChatGPT. A precise model/version identifier was not captured in the available execution metadata, so none is asserted.

### User prompt (faithful summary, not verbatim)
The user asked to inspect the current repository, create a self-contained `frontend/` folder with Vite, React, JavaScript/JSX, Tailwind CSS and React Router DOM, establish all public routes and shared layout, implement the homepage section-by-section, keep data access behind service functions for later Express integration, organise animation logic, test responsive behaviour/build and update project docs without starting catalogue/profile/other-page/backend implementation.

### Tools and actions actually used
- GitHub connector to re-inspect the Phase 0 branch, tracked tree, README and existing documentation.
- Web browser to revisit the live homepage and inspect the supplied-host linked images and selected puppy-profile image links.
- Local container filesystem to write frontend source files and documentation.
- Node.js syntax checks and globally available TypeScript compiler parser for JavaScript/JSX syntax validation.
- npm install was attempted but failed because the environment could not resolve registry.npmjs.org.

### Files and work added
- Created a self-contained Vite React app under `frontend/`.
- Added router, shared header/mobile nav/footer/layout, route placeholders and not-found page.
- Added homepage sections as separate components.
- Added local content fixtures, a service adapter boundary, WhatsApp URL helper and scroll-reveal hook.
- Added source-host reference media mapping and asset source register; these are external URLs, not downloaded local binaries.
- Added frontend README, `.gitignore` and `.env.example`.
- Added the Phase 1 progress and test evidence sections to existing root documentation.

### Verification
- Node v22.16.0 and npm 10.9.2 observed.
- Plain JS `node --check`: passed.
- 25 JS/JSX files parsed with 0 syntax diagnostics via the TypeScript compiler parser (used only for source validation; no TypeScript files/dependency added).
- Relative import scan: passed.
- No TypeScript source files: confirmed.
- CSS brace balance: passed.
- npm install: failed with EAI_AGAIN on registry.npmjs.org.
- Vite development server, production build, browser interactions and responsive viewport checks: NOT RUN.

### Scope boundary
No backend, MongoDB, API, catalogue, individual profile, gone-home, happy-families, how-it-works, FAQ or contact-page implementation was started. These routes are placeholders only.


## Session 3 — Phase 2 puppy catalogue and profiles

**Date:** 24 November 2026  
**Branch:** `develop`

### User request summary
Inspect existing source and all six JSON datasets; verify puppy availability, slugs and media; implement the actual catalogue and one reusable profile route; support mixed variable-length galleries and WhatsApp enquiry; preserve the Phase 1 homepage/design; update documentation; commit directly to `develop` without branching.

### Changes delivered
- Added `puppyData.js` as the JSON-backed puppy/breed mapping layer and extended the existing `contentService.js`.
- Removed the duplicate 15-record JS puppy fixture. Homepage featured cards and the catalogue now use the JSON data source.
- Implemented `/puppies` with loading, error, empty and failed-image states; added semantic list roles and keyboard-focusable profile links.
- Implemented reusable `/puppies/:slug` profile lookup for current and historical records; unknown slugs render an in-app not-found state.
- Added variable image/video gallery with native controls, poster, dimensions, caption, duration, focal-point metadata, thumbnail selection and failed-media fallback.
- Added profile-specific WhatsApp actions and locally validating note form; no backend request or persistence is present.
- Added responsive Phase 2 CSS scoped to the existing design tokens.

### Source reconciliation
- Parsed all six JSON files: 42 puppies (15 available, 27 sold), 8 breeds, 9 FAQs and 64 entries in each family snapshot.
- All 15 available slugs match the profile route keys in `pages.json`; all 42 puppy slugs are unique.
- Opened all 15 corresponding puppy profiles on the currently accessible `teddypups.ae` hostname. Display names, breeds, gender, age and gallery counts matched the JSON snapshot.
- The user-specified `puppy.instabizweb.com` host was not directly accessible. The current alternate hostname labels all 15 as In Dubai, while the committed JSON labels all 15 Imported. No origin change was made; the discrepancy remains explicit.
- No media binaries were downloaded. Direct media loading was not verified.

### Verification
npm install was blocked by `EAI_AGAIN` to the npm registry. `npm run build` was attempted and is blocked because Vite is not installed. No browser, responsive, playback or console tests were run. These are not recorded as passed.

## Session 4 — Puppy catalogue filters and sketchbook visual refinement

**Date:** 24 November 2026  
**Branch:** \`develop\`  
**UI implementation commit:** \`0a1720104729a40fa770a7a849ee9ae7d9dcaa15\`

### Reconstructed design brief (illustrative, not a historical verbatim prompt)

The following prompt is a retrospective reconstruction written to explain the implemented work. It is not presented as the exact text of an earlier user message.

> Review the current puppy catalogue in my React application and compare its UI and interactions with the source implementation in \`Khushiii720/TeddyPups-Clone\`, particularly the catalogue-related components and reference styles under \`src/\`. The catalogue must make it obvious that visitors can filter puppies; do not leave the filter controls hidden or visually indistinguishable from ordinary text.
>
> Rework the catalogue presentation to follow the source site's playful sketchbook direction: warm paper-like background, hand-drawn outlines, doodle details, pastel card surfaces, slightly irregular/tilted puppy cards, sticker-like labels and a filter board that looks like part of the same visual system. Keep the implementation native to this project's existing React + JavaScript/JSX + Tailwind/CSS stack; do not copy the source TypeScript architecture.
>
> Add accessible, visibly interactive filters for the available data: origin/location where records support it, puppy breed, collection (including Korean Teacup), and gender. Filters should combine rather than overwrite one another, update the URL query string so selections can be shared or refreshed, and show an accurate result count. Derive available choices from the real puppy dataset; do not invent local puppies or unsupported filter options just to fill the UI.
>
> Keep the existing data flow and routes intact, make the cards responsive, preserve meaningful image text and keyboard accessibility, and add/update focused component tests for filtering and card presentation. Do not redesign unrelated pages as part of this catalogue-only task.

### Implementation actually committed

- Reworked \`frontend/src/pages/PuppiesPage.jsx\` to present the catalogue heading, sketchbook treatment, visible filter board, filter chips and result count.
- Filter selections are represented in URL search parameters. Updating one filter preserves the other active selections.
- Filter categories cover available origin values, breeds, the Korean Teacup collection and gender. Choice availability is based on the current puppy data rather than fabricated records.
- In the current snapshot, all 15 available puppies are marked imported. Therefore the UI should not offer a misleading “Local/In Dubai” option when there are no matching local records.
- Updated \`frontend/src/components/puppies/PuppyCard.jsx\` with sketch-inspired framing, pastel card treatments, hand-drawn SVG decoration and sticker-style availability/video labels while retaining puppy metadata and profile navigation.
- Added/updated \`frontend/src/pages/PuppiesPage.test.jsx\` and \`frontend/src/components/puppies/PuppyCard.test.jsx\` for the filter and card behaviour.
- Appended catalogue-specific styling to \`frontend/src/styles/index.css\`; unrelated homepage and profile styles were not intentionally redesigned in this pass.

### Verification recorded

- The branch head was \`0a1720104729a40fa770a7a849ee9ae7d9dcaa15\` when this log entry was prepared.
- GitHub Actions workflow **Phase 2 frontend tests**, run \`45458699475\`, completed with conclusion \`success\` for that implementation commit. The dependency-install and test-suite steps both completed successfully.
- This CI result verifies the automated test workflow only. A manual visual/browser comparison at desktop and mobile sizes was not performed in this session.

### Scope boundary

This pass concerns the available-puppy catalogue and its cards. It does not complete a site-wide visual port: the individual puppy profile, homepage, archive, family gallery, How It Works, FAQ and contact pages still require their own source-grounded review and implementation.


## Session 5 — Puppy profile storybook visual refinement

**Date:** 25 November 2026  
**Branch:** `develop`

### User request summary
Inspect the latest `develop` branch and the matching reference source, treat the user's newly implemented catalogue filters/cards as completed, identify gaps on the remaining pages, report inspected files and proposed changes first, then implement the next phase incrementally with appropriate tests and without unrelated refactoring.

### Reference comparison
Compared the React profile and supporting components with:
- Reference `src/templates/puppies__maltipoo-max-male.html`
- `src/components.tsx` and `src/Template.tsx` for gallery, full-screen viewer and enquiry patterns
- `src/reference.css` and `src/app.css` for storybook profile styling
- Reference `home.html`, `how-it-works.html`, `faq.html`, `contact.html`, `gone-home.html`, `happy-families.html` and shared shell templates to document the remaining site-wide gaps.

### Implementation
- Added a profile-only storybook presentation: chapter markers, paper-style care promise, journey trail, letter-style enquiry treatment and previous/next puppy image cards.
- Preserved existing data lookup, available/sold behaviour, WhatsApp contact, gallery/lightbox and adjacency service logic.
- Extended `PuppyProfilePage.test.jsx` and `PuppyNoteForm.test.jsx`.
- Appended profile-only style rules to `frontend/src/styles/index.css`; catalogue page/card styles and URL query filter logic were not modified.

### Verification
- Final GitHub Actions run [#11](https://github.com/dikshaforsure/P-mart/actions/runs/45461978023) passed: 10 test files and 45 tests, zero failures.
- Two earlier runs exposed test regressions and were corrected; the successful run is the final verification evidence.
- Manual visual browser checks and a production build were not performed here.

### Outstanding scope
The generic placeholder routes and the remaining homepage/shared-shell comparison are still incomplete. Do not describe the overall website as visually complete until those pages are implemented and manually checked.
