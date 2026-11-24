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
