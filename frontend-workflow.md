# TeddyPups Frontend Workflow & Implementation Guide

> **Purpose:** Code-oriented explanation of the frontend architecture, each implemented visitor workflow, the prompting/development process, and the responsibility of every tracked file in the inspected snapshot.
>
> **Repository:** https://github.com/dikshaforsure/P-mart  
> **Scope:** Frontend only  
> **Branch:** develop  
> **Snapshot HEAD:** 9b724cb835b1e8b569784c7b6afe6193f7d01d87  
> **Snapshot date:** 25 November 2026  
> **Tracked files inspected:** 92

This document describes the exact repository snapshot above. It is a living guide: after later commits, update the SHA, file inventory, code explanations, workflows and verification evidence. Do not treat planned backend/deployment work as implemented.

---

## 1. Project overview

TeddyPups is a reference-faithful multi-page public website frontend built for a technical assignment. Its visual language is warm and playful: paper-like backgrounds, editorial typography, hand-drawn outlines, paw marks, a reusable puppy mascot, puppy/family photographs, Polaroid and ticket motifs, and storybook-style page sections.

The application is currently **frontend-only and backed by local static data**. It implements routes, catalogue filters, reusable puppy profiles, mixed-media galleries, family photo viewing, FAQs, local/imported journey tabs, forms and WhatsApp handoffs. It does not contain an implemented backend server, database, API endpoint, authentication, enquiry persistence, email notification or admin dashboard.

### Current snapshot at a glance

| Area | Current implementation |
|---|---|
| Framework | React 19, JavaScript/JSX |
| Build/dev | Vite 8 |
| Styling | Tailwind CSS v4 Vite plugin plus page-scoped CSS |
| Routing | React Router DOM 7 |
| Tests | Vitest 5, React Testing Library, jsdom |
| Puppy records | 42 total: 15 available, 27 sold |
| Puppy media | 125 images and 6 videos across puppy media arrays |
| Family gallery | 64 image records |
| FAQ | 9 records |
| Public pages | Home, Puppies, Puppy Profile, Gone Home, Happy Families, How It Works, FAQ, Contact, Not Found |
| Backend | Not implemented |
| Enquiry | Client-side validation + WhatsApp message preparation; visitor manually sends |
| Latest CI at snapshot | Run #49: 22 test files / 110 tests passed; production build passed |

### Visitor capabilities

1. Browse the homepage and open featured puppy profiles.
2. Browse available puppies and combine origin, breed, gender and collection filters; selections are reflected in the URL.
3. Open an available or sold profile, inspect facts/care/journey content, browse photos/videos and prepare an enquiry.
4. Browse 27 sold puppies in the Gone Home archive.
5. Browse 64 family photos and open a keyboard/touch-enabled full-size viewer.
6. Switch between local and imported journeys.
7. Search FAQ questions and answers and expand individual notes.
8. Fill the Contact letter or puppy-specific note form and open a prefilled WhatsApp message.

---

## 2. Development method: two-chat AI-assisted workflow

The project deliberately separated engineering direction/prompt design from implementation execution.

- **Chat A — engineering lead and prompt architect:** inspected the designated live reference and destination repository, decomposed the next feature, identified preservation constraints, prepared acceptance criteria and wrote the bounded implementation prompt. It also maintained cross-phase context and documentation.
- **Chat B — coding agent:** received the approved prompt, inspected the current destination branch and relevant files, implemented the requested functionality, added/updated tests and reported changed files and verification.
- **Additional prompt-refinement chats:** were used to review wording, clarify visual and functional requirements, identify ambiguity and improve the prompt before it was sent to the coding agent.
- **Owner review:** screenshots and manual observations were used to identify visible defects. Each defect became a focused follow-up prompt rather than an unrelated redesign.

This separation kept each coding-agent conversation focused and reduced unnecessary context consumption. The prompt architect retained the broad project history; the coding agent received the information needed for the current task. Chat length limits were managed by dividing work into milestones, sending bounded prompts, recording durable project state in repository documentation and handing off from the latest branch rather than relying on one long transcript.

### Prompt-to-implementation loop

~~~mermaid
flowchart TD
 A[Inspect live reference and visible behavior] --> B[Inspect current develop branch and relevant files]
 B --> C[Identify gap, constraints and preserved behavior]
 C --> D[Draft bounded implementation prompt]
 D --> E[Refine prompt in additional review chats]
 E --> F[Send approved prompt to coding agent]
 F --> G[Agent inspects destination code and implements]
 G --> H[Add or update focused tests]
 H --> I[Run focused tests, full suite and build]
 I --> J{Evidence passes?}
 J -- No --> K[Analyze failure and write narrow correction prompt]
 K --> F
 J -- Yes --> L[Review diff and check for unrelated changes]
 L --> M[Update progress, prompt, technical and test docs]
 M --> N[Commit to develop and verify remote state/CI]
 N --> O[Owner checks screenshots and page behavior]
 O --> P{New defect or requirement?}
 P -- Yes --> C
 P -- No --> Q[Move to next milestone]
~~~

### Why this approach worked

1. **Source-first:** prompts came from the live site, linked media, owner screenshots and current destination code—not from guesses.
2. **Bounded scope:** one prompt normally covered one page, feature group or tightly related correction.
3. **Preservation:** prompts named behavior that must not regress: route paths, exact slugs, source data, ordering, gallery state, WhatsApp configuration and completed pages.
4. **Acceptance criteria:** the coding agent was asked for observable outcomes, not merely “make it look better”.
5. **Verification:** focused tests, full suite and production build were requested for meaningful implementation work.
6. **Context management:** durable state lived in repository documentation; the coding chat was not expected to retain every earlier discussion.
7. **Human review:** screenshots exposed visual problems that automated DOM tests cannot prove.

### How live-site photos/resources were used

The designated reference website is https://puppy.instabizweb.com/. Public page content, linked puppy photographs, family photographs, media URLs, page structure, labels and visible interactions were inspected and used as implementation references. Owner-provided screenshots were used during later refinement.

The app preserves remote URLs and metadata such as dimensions, alt text, focal points, captions, video duration and poster images. The implementation did not download the reference photographs into the repository. Public accessibility is not proof of copyright or redistribution permission; rights and production use still require approval.

The workflow was: inspect the live page/resource, identify the corresponding destination component or data record, refine a precise prompt, send it to the coding agent, then inspect the result and request focused corrections if needed.

---

## 3. Prompt history by milestone

The root AI_PROMPT_LOG.md is the historical source for this register. It labels summaries and reconstructed prompt briefs as such. The entries below are **faithful summaries of the objective and prompting approach**, not invented verbatim quotations.

| Milestone | Prompt objective | Main result |
|---|---|---|
| Phase 0 — research | Inspect the live website and destination baseline; map pages, interactions, responsive concerns, data and risks; create planning/technical/testing/progress/prompt docs only; no app code or dependencies. | Research and documentation foundation. |
| Phase 1 — frontend foundation | Build a self-contained React/JSX/Vite/Tailwind/Router frontend; establish shared shell, route placeholders, homepage sections, service/data boundary and reusable utilities; document test limitations. | Frontend app foundation and first homepage. |
| Phase 2 — catalogue/profile | Inspect JSON and media; preserve exact slugs; implement available catalogue and reusable dynamic profile; retain sold historical records and mixed image/video media; reuse WhatsApp helper. | Puppy data mapping, catalogue, cards, profile and gallery. |
| Catalogue filter refinement | Make filters visible; combine origin/breed/gender/Korean Teacup collection; persist filters in URL; derive options from real records; style cards without redesigning unrelated routes. | URL-backed filters, counts, empty state and sketchbook cards. |
| Profile storybook refinement | Compare profile to reference; refine chapter hierarchy, information/care board, mascot, journey, gallery and enquiry letter; preserve data and existing gallery logic. | Storybook profile styling and interactions. |
| Profile fidelity audit | Reinspect available/sold examples; correct chapter differences, facts board, care panel, gallery ratios and thumbnail behavior; do not duplicate completed work. | Corrected profile hierarchy and scoped CSS. |
| Phase 4 — shared shell, How It Works, FAQ | Refine header/footer while preserving focus/keyboard behavior; add local/imported journey tabs and four steps each; use existing FAQ data for search/accordion; avoid unsupported claims. | Shared shell, How It Works and FAQ pages. |
| Profile close-out | Reconfirm source-specific available/sold hierarchy; available has four chapters and journey; sold has three chapters without journey; preserve enquiry and navigation. | Source-accurate available/sold profile behavior. |
| Phase 5 — public pages | Implement Gone Home, Happy Families and Contact from existing data; preserve 27 sold and 64 family records; build accessible lightbox; validate Contact; do not invent private API behavior. | Three dedicated pages, tests and asset provenance. |
| Contact follow-up | Reuse mascot with Contact-specific presentation; provide showroom-image fallback; correct narrow-screen ordering without changing contact configuration. | Mascot variant and responsive Contact correction. |
| Phase 6 — homepage refinement | Refine homepage section-by-section using existing data, assets, mascot, routes and helpers; scope styles and preserve other pages. | Storybook homepage sections. |
| Screenshot-driven corrections | Compare owner screenshots with current code; fix hero portrait composition, puppy door hinge/knob and family Polaroid image sizing; add focused regression tests. | Homepage screenshot-reported defects corrected. |
| Hero animation/typography | Correct mascot alignment; add controlled portrait dip cycle; honor reduced motion and clean timers; refine heading/navigation typography. | Random one/two portrait cycle and tests. |
| Global paw cursor/trail | Add paw cursor for fine mouse/pen devices and bounded fading trail; suppress on touch/coarse pointer/reduced motion; clean listeners/timers. | Global PawTrail and five tests. |
| Happy Families opening layout | Fill empty upper-right area shown in owner screenshot; use four existing family photos beside testimonial and remaining 60 below; preserve source order/lightbox indexes. | 4-photo feature + 60-photo masonry wall. |
| Full-image fitting | Preserve portrait/landscape dimensions in full-screen viewer; use contain sizing; test representative aspect ratios. | Original family photo aspect ratio retained in lightbox. |

### Reusable prompt structure

This is a template for future tasks, not a historical quotation:

1. Role: senior frontend engineer / React architect / QA engineer.
2. Repository and branch: identify destination and branch; fetch latest develop first.
3. Source of truth: designated live reference URL, owner screenshots and current destination files.
4. Objective: one named feature/page and visitor behavior.
5. Inspection: exact current components, data, routes, services and styles to inspect.
6. Preservation: behavior, data, slugs, assets, configuration and files that must remain unchanged.
7. Implementation: states, error handling, responsive behavior, keyboard/touch and reduced motion.
8. Scope: likely files and explicit exclusions; explain any necessary deviations.
9. Acceptance criteria: measurable expected results.
10. Verification: focused tests, full suite, build and manual browser checks if available.
11. Documentation: update progress, technical notes, prompt log, tests and asset register where relevant.
12. Git: commit only to develop, report SHA, verify remote state and CI; never claim unrun checks.

---

## 4. Runtime architecture and data flow

### Frontend architecture

~~~mermaid
flowchart TB
 Browser[Browser URL and user input] --> Main[main.jsx]
 Main --> App[App.jsx / BrowserRouter]
 App --> Layout[AppLayout]
 Layout --> Header[SiteHeader]
 Layout --> Paw[PawTrail]
 Layout --> Page[Selected page component]
 Layout --> Footer[SiteFooter]
 Page --> Parts[Page-specific components]
 Parts --> Service[contentService]
 Service --> Data[JSON and JS data]
 Parts --> Helpers[WhatsApp helper / scroll hook]
 Parts --> CSS[styles/index.css]
 Data --> UI[Rendered React UI]
 Helpers --> UI
~~~

### Layers and responsibility

| Layer | Responsibility | Main files |
|---|---|---|
| Runtime | Mount React and global CSS | main.jsx |
| Router | Map URLs to pages | app/App.jsx |
| Shared shell | Header, mobile menu, pointer trail, main landmark, footer | AppLayout, SiteHeader, PawTrail, SiteFooter |
| Pages | Own page-level loading/search/form/gallery state | pages/*.jsx |
| Reusable components | Cards, gallery, mascot, headings, journey and paw marks | components/* |
| Data | Source snapshots and editable content | data/*.json, data/*.js |
| Service boundary | Promise-returning content methods | services/contentService.js |
| Utilities/hooks | WhatsApp URL generation and scroll reveal | utils/whatsapp.js, hooks/useScrollReveal.js |
| Styling | Shared tokens and scoped page CSS | styles/index.css |

**Important:** contentService.js currently wraps local static data with Promise.resolve. It is an asynchronous-looking facade, not an HTTP client. There is no fetch/axios request, API endpoint, database query or persistence behind it. A future API integration can replace the service implementation while keeping page-facing methods stable, but that is not current functionality.

---

## 5. Route map

| URL | Page component | Purpose |
|---|---|---|
| / | HomePage.jsx | Homepage sections and enquiry entry points |
| /puppies | PuppiesPage.jsx | Available catalogue and filters |
| /puppies/:slug | PuppyProfilePage.jsx | Reusable available/sold profile |
| /gone-home | GoneHomePage.jsx | Sold-puppy archive |
| /happy-families | HappyFamiliesPage.jsx | 64 family photos and lightbox |
| /how-it-works | HowItWorksPage.jsx | Local/imported journey explanation |
| /faq | FaqPage.jsx | Searchable FAQs and accordion |
| /contact | ContactPage.jsx | Contact details, map, letter form |
| * | NotFoundPage.jsx | Unknown-route fallback |

Every public page is nested under AppLayout, so header, global PawTrail and footer are not duplicated inside each page.

---

## 6. Visitor workflows and implementation details

### 6.1 Homepage

**Flow:** / → HomePage → contentService → homepage sections.

HomePage composes the following sections in order:

1. HomeHero
2. BreedShowcase
3. FeaturedPuppies
4. WaysToMeet
5. PuppyJourney
6. TrustHighlights
7. HappyFamiliesPreview
8. FaqPreview
9. WhatsAppEnquiry
10. FinalCallToAction

The hero uses up to six existing available puppy records. Each portrait links to its exact profile slug and uses focal metadata for image positioning. The portrait cycle starts after a delay, chooses one or two cards, removes the dip state and schedules another cycle. Both timers are cleared on unmount. The cycle does not start when prefers-reduced-motion is enabled.

The puppy showroom uses arched door-style cards, real cover photos, profile links, availability labels, optional video chips and image-error fallbacks. CSS hover/focus opens the door; touch layouts show the photo without requiring hover.

The family preview uses eight homepage moments and mapped images. It is not the full family page gallery.

The homepage journey displays four milestones. The underlying siteContent journey currently contains three records; PuppyJourney splits the existing third combined description into “Secure your puppy” and “Safe delivery”. This is a presentation split of existing copy, not an additional operational process.

### 6.2 Catalogue

**Flow:** /puppies → PuppiesPage → contentService.getAvailablePuppies() → PuppyCard list.

1. Initial state is puppies=null; a loading status appears.
2. On mount the page calls the service once.
3. A local active flag prevents state updates after unmount.
4. Success stores records; rejection displays an alert; empty data displays a dedicated empty state.
5. URL parameters are read for origin, breed, gender and collection.
6. Filter options derive from the available dataset.
7. Active filters combine with AND logic.
8. Clicking a chip toggles only its parameter and preserves other parameters.
9. Clear removes all query parameters.
10. Result count updates and cards retain source order.
11. A card opens /puppies/:slug.

All 15 currently available records are marked Imported. The full 42-record snapshot includes 30 Imported and 12 Local records across both available and sold statuses. Therefore the current catalogue should not invent an In Dubai option when no available record matches local origin.

### 6.3 Puppy data and profile lookup

puppies.json holds 42 records with unique slugs: 15 available and 27 sold. A record may contain identity, breed, gender, age, status, published flag, cover, media, origin, collections and breed references. Media metadata may include ID, URL, kind, width, height, alt, caption, focalX/focalY, color, blurDataUrl, durationS and poster.

puppyData.js exports:
- allPuppies: all 42 source records.
- availablePuppies: published available records only.
- breeds: breed reference data.
- goneHomeOrder/goneHomePuppies: explicit 27-slug sold archive order.
- getPuppyBySlug: exact slug lookup.
- getAdjacentAvailablePuppies: previous/next in available order with wrap-around.
- getAdjacentSoldPuppies: previous/next in Gone Home order with wrap-around.
- toPuppyCardData: normalized card object retaining cover/gallery metadata.
- getAvailablePuppyCards: featured card mapping with safe limit.

### 6.4 Available and sold profile workflow

**Flow:** /puppies/:slug → PuppyProfilePage.

1. useParams reads slug.
2. The page resets to loading and clears previous adjacency.
3. contentService.getPuppyBySlug performs exact lookup.
4. Missing record renders an in-app not-found state.
5. Sold record uses sold archive adjacency; available record uses available-list adjacency.
6. Render chapter hierarchy based on status.

| Available | Sold |
|---|---|
| 1. hello, it’s me | 1. the day they went home |
| 2. what comes with [name] | 2. what comes with [name] |
| 3. the way home + journey | 3. dear TeddyPups… enquiry |
| 4. dear TeddyPups… enquiry | No journey chapter |

Both profile types keep gallery, facts/care board, mascot, note form and previous/next navigation. Sold enquiry wording explains that the puppy has already found a home and asks about similar puppies that may currently be available.

The profile ribbon calculates scroll progress. Scroll/resize listeners schedule a requestAnimationFrame update; ResizeObserver is used when available; listeners, observer and pending frame are cleaned. Reduced motion sets the band to its completed state.

### 6.5 Puppy gallery

PuppyGallery uses media[] when present, otherwise cover. It tracks active index, failed media by identity, lightbox state, dialog ref, video ref and touch start position.

Main stage:
- Images open the full-screen viewer through an accessible button.
- Videos use native controls, playsInline, metadata preload and poster.
- Previous/next wraps around.
- Thumbnails update activeIndex and aria-pressed.
- Missing/failed media renders a status fallback.
- Stage is keyed by puppy slug/media identity to trigger the CSS page-turn transition.

Lightbox:
- Native dialog with showModal when available and an open-attribute fallback.
- Saves prior focus/body overflow, locks page scrolling and focuses close.
- Escape closes; arrow keys navigate; touch swipe navigates; backdrop click closes.
- Stage video pauses before opening.
- On close/unmount, previous overflow and focus are restored.
- Displays metadata and optional captions.

### 6.6 Gone Home

**Flow:** /gone-home → GoneHomePage → goneHomePuppies.

The page uses the explicit 27-slug order from puppyData.js. Each record renders a ticket card with source-order metadata, photo, name/breed/gender, ticket motif and exact profile link. Missing or failed images use a paw fallback without breaking the link. The CTA leads to /puppies. Sold records are not duplicated in JSX or reclassified as available.

### 6.7 Happy Families

**Flow:** /happy-families → HappyFamiliesPage → families.json.

All 64 family records render once in source order. The first four are shown in a featured collage beside the testimonial; the remaining 60 render in the lower masonry wall. Original global indexes are retained so button labels and lightbox indexes remain 1–64.

Each card is an accessible button with photo number/caption; it retains source ID, caption, alt, dimensions and focal point. Failed images become placeholders.

Lightbox behavior:
- Native dialog.
- Intrinsic width/height attributes retained.
- contain sizing with auto width/height and max bounds preserves portrait/landscape aspect ratio.
- Close, Escape, arrow keys, previous/next, touch swipe and backdrop dismissal.
- Body scroll lock, close-button focus and focus restoration.
- Caption only when source data has one.

The family dataset contains 64 images and eight non-empty captions. The full-image fitting correction is in commit 04ead9cc5dd50e6dec25f3fa79184e3dcc9e688a.

### 6.8 How It Works

**Flow:** /how-it-works → HowItWorksPage → howItWorksContent.js.

Four anchor sections: Two ways home, Our puppy promise, Delivery & collection, Why choose us. Local is selected by default. Tabs change selected state and panel visibility. Arrow keys cycle between local/imported; Home/End jump to first/last and focus follows selection. Both journeys contain four data-driven steps. Promise, delivery and why-choose-us sections map data records into cards/lists.

### 6.9 FAQ

**Flow:** /faq → FaqPage → faq.json.

Each FAQ record stores question and answer in one string. splitFaqRecord splits at the first question mark. The parsed entries are memoized; search filters both question and answer using normalized text. The page shows a live count, clear/reset and empty state. Each FAQ note owns its open state and connects button/answer with aria-controls, aria-labelledby and aria-expanded.

Homepage FaqPreview is a separate three-question preview sourced from siteContent.js; the full page uses all nine faq.json records.

### 6.10 Contact form

**Flow:** /contact → ContactPage.

State contains name, phone, email, area, puppyId, message, field errors, notice, prepared URL and showroom image failure.

Validation:
- Name required, 2–80 characters.
- Phone required; spaces/parentheses/hyphens removed for validation; optional leading plus and 7–15 digits accepted.
- Email optional and validated only when supplied.
- Area max 80 characters.
- Message max 2,000 characters.
- Hidden website honeypot is checked; filled honeypot submissions are ignored.

Valid submission builds a multi-line letter, inserts the selected visible puppy label, generates the URL through getWhatsAppUrl and opens a new tab. If a window handle is returned, opener is nulled. If the popup is blocked, a prepared-message link is shown. Visitor still must press Send in WhatsApp.

**This is not API submission.** No database record or email is created, and the app does not claim that TeddyPups received the message.

### 6.11 Puppy-specific enquiry

PuppyNoteForm validates required name/phone and optional email. It builds a message containing puppy name and slug. For a sold puppy, it explains that the puppy has already found a home and asks about similar currently available puppies. It opens WhatsApp and explains that the visitor must send the message.

### 6.12 Global paw cursor and trail

PawTrail is mounted once in AppLayout, not separately on each route. CSS uses the paw-shaped cursor on fine mouse/pen devices. The React trail listens to pointermove and:
- ignores touch and invalid coordinates;
- creates a mark only after a 30 px distance or 42 ms interval threshold;
- retains at most 14 marks;
- removes each mark after 780 ms;
- derives rotation from pointer direction with alternating variation;
- disables the trail for coarse pointer and reduced motion;
- cleans event listener and all pending timers on unmount.

Text inputs and disabled controls retain semantic cursor behavior.

---

## 7. File-by-file inventory (92 tracked files)

This inventory corresponds to snapshot 9b724cb835b1e8b569784c7b6afe6193f7d01d87. Every tracked file was opened and inspected. JSON files are described by schema/role; test files by the behavior they assert; stylesheet/docs by their responsibilities.

### 7.1 Root docs and CI

| File | Responsibility |
|---|---|
| .github/workflows/phase2-tests.yml | GitHub Actions workflow on push to develop, PRs to develop and manual dispatch. Uses Ubuntu/Node 22, installs frontend dependencies, runs focused public-page tests, full npm test and production build. The filename is historical; workflow now covers more than Phase 2. |
| README.md | Currently only contains the P-mart heading twice; not yet a useful project entry point. |
| AGENT.md | Persistent agent operating rules, source-of-truth policy, phase history, file map, risks, QA roadmap and handoff. Its current-HEAD text is historical; always fetch live develop. |
| AI_PROMPT_LOG.md | Historical prompt intent, implementation sessions, changed files, commits, tests and limitations. It distinguishes prompt summaries from reconstructed illustrative prompts. |
| PROJECT_ANALYSIS.md | Research and reference analysis: routes, visible interactions, page comparisons, data discrepancies, assets, risks and phase audits. |
| PROJECT_PROGRESS.md | Chronological phase status, acceptance criteria, commits, file changes, CI evidence, risks and pending work. Earlier entries are historical snapshots. |
| TECHNICAL_DOCUMENTATION.md | Architecture notes, proposed backend/API/data models, route/component map and future deployment design. Proposed server features are not implemented. |
| TESTING.md | Test strategy and evidence history, accessibility/security/browser matrices, CI runs and explicit NOT RUN markers. |

### 7.2 Frontend configuration and shell

| File | Responsibility |
|---|---|
| frontend/.env.example | Placeholder VITE_API_BASE_URL for future API integration; current static frontend does not require it. |
| frontend/.gitignore | Ignores node_modules, dist, env files except .env.example, Vite cache and OS metadata. |
| frontend/ASSET_SOURCES.md | Asset provenance, remote-host dependency, no-binary-download record, rights caveat, contact-number discrepancy and family/gallery mapping. |
| frontend/README.md | Setup commands, frontend structure, route/data behavior, gallery, tests and historical phase notes; some statements describe older project stages. |
| frontend/index.html | Vite HTML shell; language, viewport, theme color, SEO title/description, Google Fonts and #root mount. |
| frontend/package.json | ESM package; Node engine; dev/build/preview/test scripts; React 19, Router 7, Vite 8, Tailwind v4, Vitest 5, jsdom and Testing Library. |
| frontend/vite.config.js | React and Tailwind Vite plugins; dev host 0.0.0.0. |
| frontend/vitest.config.js | jsdom environment, setup file, JS/JSX test pattern and mock cleanup/restoration. |
| frontend/src/main.jsx | React entry; imports App and global CSS; mounts App in StrictMode. |
| frontend/src/test/setup.js | jest-dom matchers and Testing Library cleanup after each test. |

### 7.3 Animation/assets notes

| File | Responsibility |
|---|---|
| frontend/src/animations/README.md | Animation conventions: CSS first, observer/listener/frame cleanup, reduced motion and no unnecessary animation dependencies. |
| frontend/src/assets/images/README.md | Intended location for approved owned/licensed images; current homepage images remain remote references pending approval. |
| frontend/src/assets/videos/README.md | No local videos currently; documents future approved video/poster handling. |

### 7.4 Router and shared layout

| File | Responsibility |
|---|---|
| frontend/src/app/App.jsx | BrowserRouter and nested routes under AppLayout; maps all public routes and wildcard fallback. |
| frontend/src/app/App.test.jsx | Route integration tests for catalogue, dynamic profile, Gone Home, Happy Families, Contact, How It Works, FAQ and not-found plus shared landmarks. |
| frontend/src/components/layout/AppLayout.jsx | Global PawTrail, SiteHeader, main#main-content Outlet and SiteFooter. |
| frontend/src/components/layout/PawTrail.jsx | Fine-pointer global trail; throttling, mark cap, expiry, movement rotation, reduced-motion/coarse-pointer suppression and cleanup. |
| frontend/src/components/layout/PawTrail.test.jsx | Tests footprint creation/removal, touch/coarse-pointer/reduced-motion suppression and timer cleanup. |
| frontend/src/components/layout/SiteHeader.jsx | Brand/nav/active state, WhatsApp CTA, mobile dialog, route-close, Escape, focus return/loop, body scroll lock and skip link. |
| frontend/src/components/layout/SiteHeader.test.jsx | Tests active links, mobile open/Escape/focus restoration and navigation-triggered close. |
| frontend/src/components/layout/SiteFooter.jsx | Explore links, email, Downtown Dubai location, social links and existing WhatsApp helper. |
| frontend/src/components/layout/SiteFooter.test.jsx | Verifies email/location, links, no placeholder/disputed phone text, WhatsApp helper and social destinations. |

### 7.5 Common/shared components

| File | Responsibility |
|---|---|
| frontend/src/components/common/ArrowLink.jsx | Router/external link abstraction with decorative arrow and safe new-tab rel. |
| frontend/src/components/common/SectionHeading.jsx | General heading with optional eyebrow/description, light variant and centered alignment. |
| frontend/src/components/shared/JourneyStep.jsx | Numbered How It Works step list item. |
| frontend/src/components/shared/PageIntro.jsx | Standard page intro with optional eyebrow/title/description/class. |
| frontend/src/components/shared/PawMark.jsx | Reusable inline paw SVG using currentColor. |
| frontend/src/components/shared/SectionHeading.jsx | Storybook heading with optional number/eyebrow/description/id; distinct from common heading. |

### 7.6 Homepage components

| File | Responsibility |
|---|---|
| frontend/src/components/home/BreedShowcase.jsx | Repeating breed/name marquee with PawMark separators; CSS-driven. |
| frontend/src/components/home/FaqPreview.jsx | Homepage FAQ accordion preview; first item open by default; links to full FAQ. |
| frontend/src/components/home/FeaturedPuppies.jsx | Homepage puppy door cards with real image/focal metadata, profile links, fallback, video chip and CTA to catalogue. |
| frontend/src/components/home/FeaturedPuppies.test.jsx | Tests puppy facts, route, image/video and failed-image fallback. |
| frontend/src/components/home/FinalCallToAction.jsx | Final homepage CTA with WhatsApp, Contact link, paw and shared mascot. |
| frontend/src/components/home/HappyFamiliesPreview.jsx | Homepage testimonial and four family photo previews from familyPreview/referenceAssets. |
| frontend/src/components/home/HappyFamiliesPreview.test.jsx | Tests four mapped photo URLs, lazy loading and captions. |
| frontend/src/components/home/HomeHero.jsx | Hero copy/CTAs, six linked puppy portraits, focal positions, mascot/quilt and randomized portrait dip cycle with reduced-motion/timer cleanup. |
| frontend/src/components/home/HomeHero.test.jsx | Tests hero title/CTAs, six profile links/positions, one/two portrait cycle and reduced-motion suppression. |
| frontend/src/components/home/PuppyJourney.jsx | Four homepage milestones; splits existing combined third description into two display milestones; links to How It Works. |
| frontend/src/components/home/PuppyJourney.test.jsx | Ensures the split uses existing copy and does not add a new operational process. |
| frontend/src/components/home/TrustHighlights.jsx | Maps trust feature records into stamped cards and heading. |
| frontend/src/components/home/WaysToMeet.jsx | Maps local/imported cards to reference images, descriptions, route links and paw signpost. |
| frontend/src/components/home/WhatsAppEnquiry.jsx | Decorative chat illustration, breed quick links and WhatsApp CTA; explicitly not a live chat. |

### 7.7 Puppy components

| File | Responsibility |
|---|---|
| frontend/src/components/puppies/PuppyCard.jsx | Sketch-style catalogue card with SVG doodles, pastel wash, focal image, fallback, labels, metadata and exact profile link. |
| frontend/src/components/puppies/PuppyCard.test.jsx | Tests route, image metadata/focal point, facts, video label and image fallbacks. |
| frontend/src/components/puppies/PuppyGallery.jsx | Mixed image/video gallery, thumbnails, wrapping navigation, native controls, lightbox, keyboard/touch, captions, failures, scroll lock and focus restoration. |
| frontend/src/components/puppies/PuppyGallery.test.jsx | Tests gallery rendering/navigation, thumbnails, lightbox, video metadata, failure fallback and keyed page-turn identity. |
| frontend/src/components/puppies/PuppyMascot.jsx | Inline SVG mascot with label/facing/ring/bubble props; IntersectionObserver reveal and reduced-motion handling. |
| frontend/src/components/puppies/PuppyMascot.test.jsx | Tests SVG/accessibility, Contact variant, observer reveal/disconnect and reduced-motion fallback. |
| frontend/src/components/puppies/PuppyNoteForm.jsx | Puppy-specific form; required name/phone, optional email; available/sold-specific WhatsApp message; manual-send feedback. |
| frontend/src/components/puppies/PuppyNoteForm.test.jsx | Tests validation, message content, popup handling and sold-puppy wording. |

### 7.8 Data files

| File | Responsibility |
|---|---|
| frontend/src/data/breeds.json | Eight breed slug/name records. |
| frontend/src/data/families.json | Full 64-image family gallery with IDs, URLs, dimensions, alt, captions, focal points and blur/color metadata; eight captions. |
| frontend/src/data/faq.json | Nine FAQ strings containing question followed by answer. |
| frontend/src/data/home-families.json | Separate 64-record family/home snapshot with its own order/metadata; not the homepage's eight preview records. |
| frontend/src/data/howItWorksContent.js | Local/imported journeys (four steps each), puppy promise, delivery options and why-choose-us data. |
| frontend/src/data/pages.json | Reference route/page metadata snapshot with paths, template names, titles and source metadata. |
| frontend/src/data/puppies.json | Canonical 42 puppy records: 15 available, 27 sold; exact slugs, status/origin, breeds, cover and media metadata. 41 have media; poodle-molly-female has none. |
| frontend/src/data/puppyData.js | Derived available/sold collections, exact lookup, explicit archive order, adjacency, card mapping and safe featured limits. |
| frontend/src/data/puppyData.test.js | Tests record count/unique slugs, available filtering, media metadata, exact lookup, adjacency/wrap-around and card mapping/limits. |
| frontend/src/data/referenceAssets.js | Maps hero, showroom, six featured puppy and eight homepage family image URLs through source-host image endpoint; no local binaries. |
| frontend/src/data/siteContent.js | Brand/site settings, configured WhatsApp number, ways-to-meet, homepage journey, trust features, family quote/eight moments and three FAQ preview records. |

### 7.9 Pages

| File | Responsibility |
|---|---|
| frontend/src/pages/ContactPage.jsx | Contact details/map/showroom image fallback, letter form, honeypot, validation and prepared WhatsApp handoff. |
| frontend/src/pages/ContactPage.test.jsx | Tests field order/required semantics, mascot/image fallback, validation, message content, popup and honeypot. |
| frontend/src/pages/FaqPage.jsx | FAQ parsing/search/count/clear/empty state/WhatsApp follow-up and accessible accordion. |
| frontend/src/pages/FaqPage.test.jsx | Tests all records, search/count, clear, accordion ARIA and no-result WhatsApp path. |
| frontend/src/pages/GoneHomePage.jsx | 27 source-ordered sold ticket cards, profile links, metadata and photo fallback. |
| frontend/src/pages/GoneHomePage.test.jsx | Tests page motif/CTA, sold order/profile links, generic labels and image fallback. |
| frontend/src/pages/HappyFamiliesPage.jsx | 4 featured + 60 masonry photos, testimonial, full-source-order lightbox, keyboard/touch/backdrop controls, intrinsic dimensions and contain-fit image. |
| frontend/src/pages/HappyFamiliesPage.test.jsx | Tests 64 records/order, 4+60 split, testimonial, captions/alt, fallback, keyboard, aspect ratio, swipe, focus/scroll restoration and backdrop. |
| frontend/src/pages/HomePage.jsx | Homepage composition and asynchronous loading of site content/featured puppies through contentService. |
| frontend/src/pages/HowItWorksPage.jsx | Local/imported tabs, keyboard navigation, anchor sections, journey steps, promise/delivery/why cards and WhatsApp CTA. |
| frontend/src/pages/HowItWorksPage.test.jsx | Tests sections, tab/panel state, four-step journeys, keyboard navigation and CTAs. |
| frontend/src/pages/NotFoundPage.jsx | Wildcard route message and link home. |
| frontend/src/pages/PlaceholderPage.jsx | Generic historical placeholder component; current completed routes do not use it in App.jsx. |
| frontend/src/pages/PuppiesPage.jsx | Catalogue loading/error/empty states, URL-backed filters, combined logic, result count and PuppyCard list. |
| frontend/src/pages/PuppiesPage.test.jsx | Tests available profile links, breed/multi-breed filter, collection filter, loading/empty and rejected service state. |
| frontend/src/pages/PuppyProfilePage.jsx | Exact-slug lookup, available/sold chapter structure, gallery, facts/care, mascot, origin journey, enquiry, adjacency and scroll ribbon. |
| frontend/src/pages/PuppyProfilePage.test.jsx | Tests available/sold chapter differences, profile data/mascot/gallery, navigation and unknown/error states. |

### 7.10 Services, hooks, styles and utilities

| File | Responsibility |
|---|---|
| frontend/src/services/contentService.js | Promise-returning facade over static puppy/site data; exposes settings, featured/available puppies, lookup, adjacency, breeds and homepage content. Not an HTTP API. |
| frontend/src/services/contentService.test.js | Tests Promise results, featured limit, exact/sold lookup, adjacent available records and breed data. |
| frontend/src/hooks/useScrollReveal.js | IntersectionObserver hook adding is-visible once in view; immediately reveals for reduced motion or missing observer; disconnects on cleanup. |
| frontend/src/styles/index.css | Global tokens/base styles, shared shell, catalogue, profile/gallery/mascot, How It Works, FAQ, Gone Home, Happy Families, Contact, homepage storybook and paw cursor/trail styles; responsive and reduced-motion rules. |
| frontend/src/utils/whatsapp.js | Single WhatsApp URL builder using siteSettings.whatsappNumber and encodeURIComponent. |
| frontend/src/utils/whatsapp.test.js | Tests configured wa.me path and encoded/default message. |

---

## 8. CSS and interaction conventions

styles/index.css is a large shared stylesheet containing appended feature/page sections. It includes:
- shared palette and typography tokens;
- TeddyPups cocoa/toffee/paper/honey tokens and paw mask;
- shared header, mobile menu and footer;
- sketchbook catalogue/cards;
- profile storybook, gallery page-turn, mascot and scroll ribbon;
- How It Works, FAQ, Gone Home, Happy Families and Contact styles;
- homepage storybook hero, quilt, puppy doors, signpost, journey, trust, Polaroids, FAQ and CTA;
- paw cursor/trail;
- responsive breakpoints and prefers-reduced-motion overrides.

Future CSS rules:
1. Scope new styles under the page root class.
2. Reuse tokens, PawMark and PuppyMascot.
3. Avoid broad global selectors for page-specific fixes.
4. Do not require hover for touch interactions.
5. Keep keyboard focus visible.
6. Disable non-essential motion for reduced-motion users.
7. Preserve source image dimensions/focal points; use contain for full-image viewing and cover only for intentional crops.
8. Avoid animation dependencies for small effects handled by CSS/browser APIs.
9. Test cross-route CSS leakage after shared stylesheet edits.

---

## 9. Automated tests and CI

Vitest runs JS/JSX tests. jsdom provides a simulated DOM. React Testing Library tests behavior through accessible roles, labels, buttons and links. jest-dom provides DOM matchers. Test setup cleans up after each test. Fake timers are used for timed effects; browser APIs such as matchMedia, IntersectionObserver and window.open are mocked/stubbed when required.

### Latest evidence at snapshot

- Commit: 9b724cb835b1e8b569784c7b6afe6193f7d01d87
- GitHub Actions: [run #49](https://github.com/dikshaforsure/P-mart/actions/runs/45576434807)
- Result: success

| Check | Result |
|---|---|
| Focused public-page/route tests | 5 files / 33 tests passed |
| Complete frontend suite | 22 files / 110 tests passed |
| Production build | Passed; Vite 8.3.8; 65 modules transformed |
| Bundle advisory | One or more minified chunks exceed Vite's 500 kB warning threshold |
| Real-browser visual QA | Not completed |
| External media/network audit | Not completed |
| Manual WhatsApp send | Not completed |
| Deployment | Not completed |

CI proves commands completed in GitHub's runner. It does not prove pixel-level visual parity, media availability, browser-specific layout, native video playback or that a visitor sends a WhatsApp message.

### Local commands

From repository root:

~~~bash
cd frontend
npm install
npm run dev
npm test
npm run build
npm run preview
~~~

### CI flow

~~~mermaid
flowchart TD
 A[Push develop / PR develop / manual dispatch] --> B[Checkout]
 B --> C[Node 22]
 C --> D[Install dependencies]
 D --> E[Focused page/route tests]
 E --> F[Full Vitest suite]
 F --> G[Vite production build]
 G --> H[Success or failure]
~~~

---

## 10. Known limitations and discrepancies

### 10.1 Real-browser QA is open

jsdom tests do not render actual CSS layout. Complete browser QA remains outstanding at 1440×900, 1280×800, 1024×768, 768×1024, 390×844 and 375×812. Inspect all routes, direct URLs, console/network, image/video loading, mobile menu, touch, keyboard, focus, zoom, reduced motion, overflow and scroll effects. Capture screenshots and compare to the designated live reference. Do not claim pixel-perfect fidelity until this is complete.

### 10.2 Contact-number discrepancy

siteContent.js currently stores phoneDisplay +971 50 000 0000, phoneTel +971500000000 and WhatsApp number 971500000000. Reference observations recorded conflicting contact values across snapshots. Contact UI avoids printing a new phone number, but WhatsApp links use the existing configured siteSettings value. Confirm the production destination with the assignment owner before changing it.

### 10.3 Puppy origin snapshot

Overall dataset origins: 30 Imported and 12 Local. Available records: all 15 Imported. Do not overwrite origin values based on assumptions or another hostname. Confirm current business truth before changing the source snapshot.

### 10.4 External media and rights

Puppy/family assets remain remote references to puppy.instabizweb.com. No binary assets were copied into the repo. Complete network reachability was not audited in a real browser. Public accessibility does not establish reuse rights; obtain approval and an approved asset package before production redistribution.

### 10.5 No enquiry persistence

Contact and puppy note forms do not call a server. They prepare WhatsApp text and open the configured destination. There is no database record, email notification, enquiry history or admin dashboard. Any persistence work needs a separate approved backend scope, endpoint contract, validation, privacy/retention, rate limiting and access control.

### 10.6 CSS size and bundle warning

The main stylesheet is large and contains scoped page sections. Avoid broad cleanup while feature work continues. Vite reports a >500 kB minified chunk advisory. Evaluate code splitting/media loading only after browser QA and with tests and route behavior preserved.

### 10.7 Documentation drift

Older docs preserve earlier project states, counts, phase plans and verification snapshots. They are historical records. Use current source files and latest dated progress entries for current behavior. Do not rewrite history to imply earlier states never existed.

---

## 11. Recommended roadmap

### Phase 7 — integrated browser/responsive QA

1. Run latest develop locally.
2. Capture every public route at the six required viewport sizes.
3. Compare with the designated live reference.
4. Check image/video network responses, console, navigation, forms, dialogs, keyboard, touch, focus and reduced motion.
5. Record each defect with route, viewport, screenshot, expected behavior and actual behavior.
6. Fix only confirmed issues in narrow commits.
7. Rerun focused tests, full suite and build.
8. Update this guide, TESTING.md, PROJECT_PROGRESS.md and AGENT.md.

### Phase 8 — backend decision (only if approved)

Decide whether the assignment requires enquiry persistence, email notifications, puppy inventory management, content/FAQ/gallery management, authentication/admin, file storage/CDN and privacy/retention policy. Agree endpoint contracts and error behavior before replacing static service methods. Do not invent API behavior.

### Phase 9 — deployment

Confirm environment variables and WhatsApp destination; approve media rights/hosting; configure HTTPS, SPA route fallback and cache policy; test direct dynamic routes; run deployed smoke/media/network tests; verify privacy/contact behavior/accessibility; record release commit and rollback plan.

---

## 12. Safe workflow for future changes

Before any new task:

1. Fetch latest develop HEAD.
2. Read AGENT.md completely.
3. Read this guide's relevant file/workflow entries.
4. Inspect current code and tests directly.
5. Inspect relevant live reference page and owner screenshots.
6. Define requested behavior and preserved behavior.
7. Make the smallest necessary code change.
8. Add/update tests.
9. Run focused tests, full suite and build.
10. Review diff for unrelated edits, data loss, route changes, formatting churn or invented content.
11. Update project docs with actual results.
12. Commit only to develop.
13. Fetch the remote commit/file and verify saved state.
14. Report exact test counts, build, CI URL and checks not run.

### Prompt checklist

- Is the feature/page named precisely?
- Is the designated reference URL stated?
- Are relevant destination files named for inspection?
- Are preserved behaviors and exclusions explicit?
- Are data values/assets/configuration to retain identified?
- Are responsive, keyboard, touch, reduced-motion and error states included where relevant?
- Are acceptance criteria measurable?
- Are tests/build/docs/Git requirements explicit?
- Does the prompt prohibit fabricated APIs and false success states?
- Must the agent report changed files and checks actually run?

---

## 13. Company-facing project explanation

> I built a reference-faithful multi-page React frontend for TeddyPups. I first decomposed the live website into routes, data structures and interactions, then implemented the application incrementally using React, JavaScript, Vite, React Router and Tailwind/CSS. I kept puppy and family content in structured JSON, created reusable components for cards, profiles, galleries and page sections, and used a Promise-based service layer to separate page components from the current static data source.
>
> I used a two-chat AI-assisted workflow: one conversation acted as engineering lead and prompt architect, while a separate coding-agent conversation implemented each bounded task. I refined prompts with additional review chats, used live-site photographs/resources and owner screenshots as references, and broke implementation into milestones to keep the coding context focused. I reviewed results, requested targeted corrections, added regression tests and maintained project documentation.
>
> The frontend includes URL-backed catalogue filters, reusable available/sold profiles, mixed image/video galleries, accessible lightboxes, keyboard-operable journey tabs, searchable FAQs, a 64-photo family gallery, validated enquiry forms and WhatsApp handoffs. The latest GitHub Actions run passed 110 tests across 22 test files and a production build. The current scope is frontend-only: integrated real-browser QA, backend persistence and deployment remain separate milestones.

### Suggested live demo order

1. Homepage hero and puppy doors.
2. Catalogue filters; combine filters and show URL query parameters.
3. Open a puppy profile; browse image/video, open lightbox and use adjacent navigation.
4. Open a sold profile and explain its different chapter hierarchy.
5. Show Gone Home and its 27 sold records.
6. Open Happy Families; navigate all 64 photos and demonstrate original aspect-ratio fitting.
7. Switch local/imported tabs and use keyboard arrows.
8. Search and expand an FAQ.
9. Submit a valid Contact letter in a controlled demo and explain the manual WhatsApp send.
10. Show tests, CI and repository documentation.

---

## 14. Document maintenance record

| Field | Value |
|---|---|
| Document | frontend-workflow.md |
| Repository | dikshaforsure/P-mart |
| Branch | develop |
| Initial snapshot | 9b724cb835b1e8b569784c7b6afe6193f7d01d87 |
| Files inspected | 92 tracked files |
| Latest CI evidence | Run #49 |
| Full suite | 22 files / 110 tests passed |
| Production build | Passed; Vite 8.3.8 |
| Browser visual QA | Outstanding |
| Backend | Not implemented |
| Deployment | Not completed |

**Update rule:** after each meaningful future change, update the relevant file explanations, workflows, tests, prompt summary, known limitations, commit/CI evidence and snapshot SHA. Never mark manual browser QA complete based only on CI.
