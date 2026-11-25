# TeddyPups Website — Project Analysis

**Research date:** 24 November 2026  
**Reference:** https://puppy.instabizweb.com/  
**Repository:** https://github.com/dikshaforsure/P-mart  
**Document role:** Phase 0 research baseline, maintained with verified implementation analysis through Phase 5
**Current frontend status:** Phases 0–5 public-page implementation complete; homepage visual refinement, integrated browser QA, backend enquiry persistence and deployment remain open.

## 1. Evidence and limits

Public pages and crawlable content on the supplied host were inspected. Several individual puppy profiles were opened to compare records and gallery differences. No private source code, CMS, API, database, administrator panel, analytics or enquiry-delivery backend was available.

The browser-readable page output exposes headings, links, text, image descriptions and control labels; it does not certify pixel-level styling, exact CSS values, all hover states, mobile breakpoints, animation timing or behaviour. Those require visual browser inspection at fixed viewport sizes and remain unverified.

A separate domain, teddypups.ae, has inconsistent indexed content (including different contact information and catalogue/family details). It is excluded. The supplied host puppy.instabizweb.com is the only reference baseline unless the project owner changes it.

## 2. Website overview

TeddyPups U.A.E. presents itself as a Dubai-based premium miniature/teacup puppy business. It describes two customer journeys: puppies available locally in Dubai and imported/order-upon-request puppies sourced through breeders abroad. Main conversion paths are browsing a puppy, viewing its profile, contacting via WhatsApp, submitting an enquiry or visiting the showroom.

The tone is warm, playful and editorial, using puppy/family language and recurring sketchbook, passport and “home” motifs. Exact fonts, colours, spacing tokens and animation effects are not confirmed by text extraction.

## 3. Route inventory

| Page | Observed path | Purpose |
|---|---|---|
| Homepage | `/` | Brand introduction, featured puppies, journey, trust, families, FAQ preview and conversion CTA |
| Available puppies | `/puppies` | Current available catalogue |
| Individual puppy | `/puppies/:slug` | Puppy facts, media, enquiry and adjacent navigation |
| Gone home | `/gone-home` | Previously homed puppy catalogue |
| Happy families | `/happy-families` | Family/puppy photo wall |
| How it works | `/how-it-works` | Local and imported journeys, delivery and trust |
| FAQ | `/faq` | Searchable question/answer content |
| Visit & contact | `/contact` | Contact form, phone, WhatsApp, email and showroom |

Footer links also expose **Delivery & collection**. Its destination was not conclusively resolved: determine whether it is a standalone page, anchor or alias before implementation.

Global navigation includes Home, Puppies, Happy families, How it works, FAQ, Visit & contact and WhatsApp. A skip-to-content link is present. The menu output repeats navigation and has a Close action plus “where to, friend?”.

## 4. Page analysis

### 4.1 Homepage

Observed sequence:
1. Header/navigation, WhatsApp action and menu affordance.
2. Hero eyebrow “every puppy is family”, headline “Premium teacup puppies in Dubai”, showroom/import copy and catalogue/WhatsApp CTAs.
3. Moving/rotating puppy or breed labels and a visual element.
4. “Meet the pups” featured catalogue teaser and “Meet them all”.
5. “Two ways to meet your puppy”: Dubai showroom and imported-for-you options, with image/copy/CTA.
6. “Your puppy journey” with three short steps: choose breed, get photos/details, secure/safe delivery.
7. WhatsApp-style illustrated conversation/selection region with breed options and showroom puppy images.
8. Trust features: veterinary/health, travel, 24/7 support and family trust.
9. Happy-family testimonial and image preview.
10. FAQ preview with three questions and link to full FAQ.
11. Final puppy CTA section with WhatsApp and contact navigation.
12. Footer with page links, contact and social links.

The homepage is image-led and story-driven; exact colours, typography, card proportions, image crops and movement need screenshot comparison.

### 4.2 Available puppies

Route `/puppies`. Observed heading “Available puppies”, intro says listings show actual puppy photos, and “from Teddy’s sketchbook” / “self-portrait” microcopy. The page contains 15 entries, an “Already gone home” teaser and footer.

Current supplied-host catalogue snapshot:
1. Max — Maltipoo, boy, 3 months, video.
2. Korean Teacup Maltipoo — girl, 2 months, video.
3. Korean Teacup Poodle — girl, 2 months.
4. Maltipoo & Cavapoo — boy, 3 months Maltipoo & 2 months Cavapoo, video.
5. Toy Poodle — boy & girl, 2 months.
6. Maltipoo — girl, 3 months, video.
7. Pomeranian — girl, 3 months.
8. Copper — Cavapoo, boy, 2 months.
9. Shih Tzu — girl, 2 months.
10. Shih Tzu — boy, 2 months.
11. Maltipoo — girl, 2.5 months.
12. Maltipoo — girl, 2 months.
13. Korean Teacup Pomeranian — girl, 2 months.
14. Korean Teacup Pomeranian — girl, 2 months.
15. Korean Teacup Pomeranian — boy, 2 months.

No catalogue facet controls were exposed in the supplied-host crawl. A different domain’s indexed version indicates Where/Collection/Breed/Sex filters, but it is not the supplied reference. Therefore filters must be confirmed in an interactive browser on the supplied host before they are designed or coded. Filtering is a requested investigation item, not a confirmed fact.

### 4.3 Puppy profiles

Observed route pattern `/puppies/<slug>`. Pages share a common structure but individual records and galleries differ.

Representative profiles:
- Max: `/puppies/maltipoo-max-male`, Maltipoo, boy, 3 months, “Imported for you”; gallery count 1/2 with an image and video item.
- Korean Teacup Maltipoo: `/puppies/korean-teacup-maltipoo-female`, girl, 2 months, “Imported for you”; gallery count 1/11, ten image thumbnails and one video item.
- Korean Teacup Poodle: `/puppies/korean-teacup-poodle-female`, girl, 2 months, “Imported for you”; gallery count 1/4.

Observed structure:
1. Breadcrumb to Available puppies/current puppy.
2. “hello, it’s me” label.
3. Main media, previous/next controls, current index, thumbnail strip and video marker where applicable.
4. Availability badge, title and breed/sex/age/location facts.
5. Puppy-specific WhatsApp CTA and Send an enquiry action.
6. “Every Teddy Pup comes” health list: vaccinated, dewormed, verified health certificate from licensed vets, thoroughly checked.
7. “the way home” four-step journey; local/imported wording can vary.
8. Puppy-specific enquiry form: required name and phone/WhatsApp, optional email/area/message, website field (appears to be honeypot) and submit button.
9. Previous pup / Next pup links.

Build one reusable profile driven by API content. Preserve variable media counts/types; do not assume one gallery size. Combined listings (Maltipoo & Cavapoo, Toy Poodle boy & girl) need source-faithful representation. Only a subset of all 15 profiles was deeply inspected; audit every profile and media item before final seed data.

### 4.4 Gone home

Route `/gone-home`. Heading/copy explain these puppies have joined families, with a link back to available puppies. The visible list contains 27 entries:
Ace (Pomeranian, boy), Leo (Poodle, boy), Mia (Maltipoo, girl), Sadie (Maltipoo, girl), unnamed Pomeranian (boy), Ollie (Pomsky, boy), Bruno (Maltipoo, boy), Buddy (Maltese, boy), Charlie (Maltese, boy), Daisy (Pomeranian, girl), Bella (Pomeranian, girl), Teddy (Poodle, boy), Molly (Poodle, girl), Coco (Pomsky, girl), Rosie (Pomsky, girl), Leo (Pomeranian, boy), Molly (Poodle, girl), Rocky (Poodle, boy), Sophie (Maltipoo, girl), Lola (Maltipoo, girl), Rex (Pomeranian, boy), Finn (Pomsky, boy), Zoe (Maltipoo, girl), Mimi (Pomeranian, girl), Bailey (Bichon, boy), unnamed Maltipoo (girl), unnamed Poodle (girl).

The “one ticket home / admit one” motif appears in the listing. Individual gone-home detail routes were not established; implement as a listing unless further inspection proves otherwise. Preserve unnamed records without invented names.

### 4.5 Happy families

Route `/happy-families`. Page heading and intro, “64 moments and counting”, a Sarah M. testimonial attributed to Dubai, UAE, and a gallery of linked images. Some captions include Lulu with her new mummy, adorable Maltipoo baby, my new teddy puppy, our new puppies, gang of 3, so happy and new pup. Confirm rendered count, image-viewer behaviour and mobile layout manually; no filter UI was confirmed.

### 4.6 How it works

Route `/how-it-works`. Intro describes local showroom visits and imported orders. Section links target Two ways home, Our premium puppy promise, Delivery & collection and Why choose us.

Two tabs are visible: “In Dubai meet in person” and “Imported order upon request”. Local path contains four steps: Explore our puppies, Choose your puppy, Meet before you choose, Pick-up or delivery. Imported path contains: Reserve your puppy, Personalized consultation, Import and arrival, Welcome home. Other sections cover breeders, transparency, travel, same-day collection, Dubai delivery, international cargo, worldwide delivery and final CTA. Confirm tab keyboard semantics and transitions in browser.

### 4.7 FAQ

Route `/faq`. Heading “Questions & answers”, support prompt, search placeholder “delivery, Korea, vaccinated…”, count “9 notes on the board”, decorative “?!” and WhatsApp ask-your-own-question link. Nine entries:
- Are your puppies vaccinated and health-checked?
- Can I meet a puppy before I decide?
- Can I take my puppy home the same day?
- Do you import puppies from abroad?
- How does an imported puppy travel to Dubai?
- Will I see photos and health details first?
- Do you deliver?
- Which breeds do you usually have?
- Is there help after my puppy comes home?

Search control and question/answer pairs are confirmed. Exact filtering, empty-state and accordion semantics require interactive verification.

### 4.8 Visit & contact

Route `/contact`. Heading “Get in touch with us”; letter-style form with required name and phone, optional email, area, puppy selector and message, plus a website field likely intended as a honeypot. Submit action reads “Post my letter”. Contact area shows phone +971 50 000 0000, an obfuscated email link in extraction, Downtown Dubai, UAE, Google Maps action and showroom image. Confirm actual email and action destinations in a browser before configuring.

## 5. Interaction inventory

| Interaction | Location/trigger | Reproduction requirement | Evidence |
|---|---|---|---|
| Primary navigation | Header links | Route navigation/current page state | Confirmed |
| Mobile menu | Menu / Close | Toggle overlay, scroll lock, focus management, Escape | Partially confirmed |
| WhatsApp | Header, hero, profile, footer | Correct configured wa.me link; puppy-specific context where shown | Confirmed |
| Puppy card | Catalogue | Open matching profile slug | Confirmed |
| Catalogue filtering | Catalogue | Verify controls and combination semantics before coding | Unverified on supplied host |
| Gallery selection | Profile arrows/thumbnails | Change media, active thumb and counter | Controls/count exposed |
| Video | Profile gallery video thumbnail | Play with controls/poster/accessibility | Media item confirmed; mechanics unverified |
| Profile previous/next | Profile footer | Navigate adjacent items in catalogue order | Confirmed links |
| Puppy enquiry | Profile form/CTA | Validate and persist own enquiry | Form UI confirmed; backend unknown |
| FAQ search | FAQ input | Search questions/answers and empty state | Search control confirmed; logic unverified |
| FAQ accordion | FAQ pairs | Accessible expand/collapse | Pair structure confirmed; mechanics unverified |
| Journey tabs | How it works | Swap local/imported content | Tab labels confirmed |
| Section navigation | How it works | Scroll to section | Confirmed links |
| Family viewer | Happy families | Inspect modal/lightbox before implementation | Unverified |
| Scroll/hover/page effects | Whole site | Measure triggers/timing in browser | Unverified |
| Sticky/floating actions | Page/footer | Reproduce positioning only after viewport check | CTA exists; position unverified |

## 6. Animation and visual-effect plan

Text extraction does not establish exact animations. These are verification targets and implementation options, not claims that every effect exists.

| Effect to inspect | Location | Implementation if confirmed | Performance/accessibility |
|---|---|---|---|
| Menu transition | Mobile nav | CSS transform/opacity + React state | Focus restore; reduced motion |
| Route transition | Page change | Short CSS opacity/translate | Never delay navigation |
| Scroll reveal | Sections/cards | IntersectionObserver + CSS class | Disconnect observer |
| Card hover | Catalogue/gallery | CSS transform/shadow/image scale | Disable for reduced motion/coarse pointer |
| Hero puppy/illustration | Home/CTA | CSS/SVG; RAF only if necessary | Stop RAF offscreen/unmount |
| Moving breed labels | Hero | CSS animation | Pause/simplify reduced motion |
| Gallery transition | Profile | CSS opacity/scale | Keyboard arrows/Escape; scroll lock |
| Video | Gallery | Native video controls/poster | Defer source loading |
| FAQ expansion | FAQ | CSS grid/height transition | aria-expanded; reduced motion |
| Decorative cursor | Desktop | Only if confirmed | Never block pointer; disable touch/reduced motion |
| SVG motion | Any page | Inline SVG/CSS transforms | Keep lightweight |

Prefer IntersectionObserver to continuous scroll handlers. If a listener is required, use passive events and requestAnimationFrame throttling, then clean up listeners/frames in effect teardown. Respect `prefers-reduced-motion: reduce`. Avoid expensive continuous effects on mobile.

## 7. Responsive analysis

Mobile/tablet breakpoints and exact responsive behaviour were not certified by text extraction. Inspect reference and clone at 360, 390, 768, 1024 and 1440px. Measure navigation collapse/menu, hero stack and image crop, catalogue columns/card ratios, profile media and thumbnail overflow, video size, FAQ search/tap targets, contact fields/errors, footer stacking, sticky actions, horizontal overflow, line wrapping and safe areas.

Proposed responsive intent (validate, not observed): single-column content on small screens, compact navigation, swipe-friendly gallery with visible controls, touch-friendly targets, fluid typography and constrained content width.

## 8. Content and assets needed

- 15 available puppy records: stable ID/slug, source display name, breed, sex/group, age label, location/collection mode, status, ordered media array (type, URL, thumbnail, poster, alt, caption), sort order and featured state.
- 27 gone-home records: display name (may be empty), breed, sex, source location label, media, caption and order.
- Family moments: image, optional caption/alt and order.
- 9 FAQs: question, answer, order and categories only if verified.
- Business settings: phone, email, address, WhatsApp, map and social links.

Publicly accessible media is not automatically licensed for reuse. Confirm rights/assignment conditions; keep an asset provenance register. Do not hotlink reference media as permanent production storage. Store binaries in object storage/CDN and URLs/metadata in MongoDB.

## 9. Architecture implications

Public reads are needed for available puppies, individual profiles, gone-home entries, family gallery and FAQs. Catalogue filtering should only expose facets confirmed on the supplied host. Use a single enquiry POST route for both forms, with source and optional puppy reference. Add server-side validation, request-size limits, rate limiting and honeypot handling. Admin CRUD is useful for dynamic availability/content/enquiry triage but is not proven to exist publicly and must be approved as internal scope.

## 10. Assumptions, uncertainties and risks

1. Snapshot date is 24 November 2026; inventory can change.
2. Supplied subdomain is the sole baseline; teddypups.ae is not merged.
3. Exact visuals, breakpoints and animations require real-browser inspection.
4. Filters are not exposed in supplied-host crawl.
5. Only a subset of 15 profiles has detailed media inspection.
6. Contact email and some hrefs were obfuscated; verify before implementation.
7. Reference form persistence, email/CRM delivery and spam logic are not visible.
8. No admin/CMS/private APIs were inspected.
9. Health and breeder assertions are public copy, not independently verified.
10. Unnamed gone-home entries must remain unnamed.
11. Supplied-host baseline: 15 available, 27 gone-home, 64 family-moment label, 9 FAQs; recheck before seed.

## 11. Sources inspected

- https://puppy.instabizweb.com/
- https://puppy.instabizweb.com/puppies
- https://puppy.instabizweb.com/gone-home
- https://puppy.instabizweb.com/happy-families
- https://puppy.instabizweb.com/how-it-works
- https://puppy.instabizweb.com/faq
- https://puppy.instabizweb.com/contact
- https://puppy.instabizweb.com/puppies/maltipoo-max-male
- https://puppy.instabizweb.com/puppies/korean-teacup-maltipoo-female
- https://puppy.instabizweb.com/puppies/korean-teacup-poodle-female

**Phase 0 status:** Planning only. No application code was created, dependencies installed or tests executed.


## 12. Phase 2 — puppy catalogue and profile reconciliation (24 November 2026)

### Structured dataset audit
- `puppies.json` contains 42 records: 15 marked `available`, 27 marked `sold`. There are 42 unique slugs.
- `breeds.json` contains 8 breed records.
- `pages.json` contains 42 puppy profile route keys. All 15 available puppy slugs have exact matching `/puppies/<slug>` route keys; no slugs were generated or renamed.
- `faq.json`, `families.json` and `home-families.json` remain preserved and are not used to render Phase 2 pages.
- The earlier Phase 1 JavaScript list of 15 puppies contained outdated duplicate slug values. It has been removed from the puppy data flow; `puppies.json` is now the sole puppy record source.

### Current available snapshot in JSON order
| # | Canonical slug | Display name | Breed | Gender | Age | Media items |
|---:|---|---|---|---|---|---:|
| 1 | `maltipoo-max-male` | Max | Maltipoo | Boy | 3 months | 2 |
| 2 | `korean-teacup-maltipoo-female` | Korean Teacup Maltipoo | Korean Teacup Maltipoo | Girl | 2 months | 11 |
| 3 | `korean-teacup-poodle-female` | Korean Teacup Poodle | Korean Teacup Poodle | Girl | 2 months | 4 |
| 4 | `maltipoo-cavapoo-male` | Maltipoo & Cavapoo | Maltipoo & Cavapoo | Boy | 3 months Maltipoo & 2 months Cavapoo | 3 |
| 5 | `toy-poodle-male-female` | Toy Poodle | Toy Poodle | Boy & girl | 2 months | 3 |
| 6 | `maltipoo-female-2` | Maltipoo | Maltipoo | Girl | 3 months | 7 |
| 7 | `pomeranian-female` | Pomeranian | Pomeranian | Girl | 3 months | 3 |
| 8 | `copper-male` | Copper | Cavapoo | Boy | 2 months | 4 |
| 9 | `shitzu-female` | Shih Tzu | Shih Tzu | Girl | 2 months | 2 |
| 10 | `shitzu-male` | Shih Tzu | Shih Tzu | Boy | 2 months | 2 |
| 11 | `maltipoo-female-1` | Maltipoo | Maltipoo | Girl | 2.5 months | 4 |
| 12 | `maltipoo-female` | Maltipoo | Maltipoo | Girl | 2 months | 4 |
| 13 | `korean-teacup-pomeranian-1` | Korean Teacup Pomeranian | Korean Teacup Pomeranian | Girl | 2 months | 2 |
| 14 | `korean-teacup-pomeranian` | Korean Teacup Pomeranian | Korean Teacup Pomeranian | Girl | 2 months | 2 |
| 15 | `korean-teacup-pomeranian-male` | Korean Teacup Pomeranian | Korean Teacup Pomeranian | Boy | 2 months | 4 |

The available media arrays include 51 images and 6 videos across these 15 records. The variable item counts are retained as source metadata.

### Live-source comparison and unresolved origin conflict
The supplied reference URL remains `https://puppy.instabizweb.com/`. Direct page access to its catalogue and profile paths was unavailable in this execution session. A current, accessible TeddyPups crawl exists on `https://www.teddypups.ae/`, which is a different hostname.

The alternate-host catalogue crawl lists the same 15 puppy names/breeds/genders/ages and reports “In Dubai 15 / Imported 0”. The accessible alternate-host profiles opened during this phase were:
- `https://www.teddypups.ae/puppies/maltipoo-max-male` — gallery 2/2; Max, Maltipoo, boy, 3 months; In Dubai.
- `https://www.teddypups.ae/puppies/korean-teacup-maltipoo-female` — gallery 1/11; Korean Teacup Maltipoo, girl, 2 months; In Dubai.
- `https://www.teddypups.ae/puppies/korean-teacup-poodle-female` — gallery 1/4; Korean Teacup Poodle, girl, 2 months; In Dubai.
- `https://www.teddypups.ae/puppies/copper-male` — gallery 1/4; Copper, Cavapoo, boy, 2 months; In Dubai.

The committed `puppies.json` snapshot marks all 15 available entries as `origin.slug: "imported"`. Phase 0 inspection of the supplied `puppy.instabizweb.com` profile also showed Max as imported. Because the exact target host could not be fetched now and the current alternative host is not the requested URL, this phase does **not** overwrite those origin fields. The catalogue/profile display the origin retained in the committed JSON. The 11 other profile contents were not independently opened on the alternate host, and none of the 15 profiles was reverified from the exact supplied host in this session. Recheck origins against the requested domain before treating this discrepancy as resolved.

### Profile page structure observed on accessible current profiles
The alternate-host profiles exposed this common structure: gallery with media count and thumbnails; breadcrumbs; availability; name and breed; gender, age and location; WhatsApp enquiry/visit actions; “What comes with” care details; a four-step “way home” journey; profile note form; previous/next puppy links; footer. The implementation follows this hierarchy with one reusable React profile component. Imported/local journey copy is selected from the JSON origin field. Generic health/care copy is shared across profiles; the JSON does not contain individual veterinary records.

### Phase 2 data and UI decisions
- `puppyData.js` is a pure mapping/filtering/lookup layer over `puppies.json` and `breeds.json`.
- `contentService.js` is the existing service boundary used by catalogue/profile routes and the Phase 1 homepage feature section.
- The catalogue only renders records marked available and published; sold records remain in the complete dataset and can still be resolved by direct slug.
- Media is referenced directly from each JSON URL; no local binary copies or new asset transformations are introduced.
- Catalogue filters, search and sorting were not added because they were not requested and must be confirmed on the exact supplied host.

### Network/media caveat
The JSON media host remains `puppy.instabizweb.com/media/...`. Direct media URL checks could not complete because external DNS resolution failed. The browser-visible galleries on the alternate host expose different media counts, but successful direct loading of every original JSON image/video URL was not verified.


### Expanded accessible-host profile verification
After the initial profile review, the remaining available puppy profile paths were opened on `teddypups.ae`, completing 15/15 profile path checks on that alternate hostname. The complete accessible-host gallery-count sequence in dataset order is:

`2, 11, 4, 3, 3, 7, 3, 4, 2, 2, 4, 4, 2, 2, 4`

This matches the media-array lengths in `puppies.json` for all 15 currently available slugs. The additional paths opened were `maltipoo-cavapoo-male`, `toy-poodle-male-female`, `maltipoo-female-2`, `pomeranian-female`, `shitzu-female`, `shitzu-male`, `maltipoo-female-1`, `maltipoo-female`, `korean-teacup-pomeranian-1`, `korean-teacup-pomeranian` and `korean-teacup-pomeranian-male`.

All 15 of these accessible-host profile pages label the puppies as In Dubai. That does not resolve the original-host conflict: no profile on the specified `puppy.instabizweb.com` host was re-opened successfully in this phase, and the existing JSON continues to mark the 15 origins Imported. Keep this source/hostname distinction visible in future data corrections.


## Phase 3 reference comparison — profile page and remaining site gaps

### Profile page comparison
The reference profile template `src/templates/puppies__maltipoo-max-male.html` was compared with the existing reusable React profile. The reference structure uses a numbered chapter sequence, storybook media frame, paper care panel, dotted paw-trail journey, letter-style enquiry and image-backed previous/next puppy links. These elements are now represented in `PuppyProfilePage.jsx`, `PuppyNoteForm.jsx` and scoped additions to `styles/index.css`.

### Behaviour deliberately retained
The profile still reads the existing JSON record by exact slug, retains sold puppy records as historical profiles, uses the existing available-puppy adjacency service, renders mixed image/video media from `media[]`, and uses the current WhatsApp helper for contact. The full-screen gallery dialog and navigation were already implemented before this refinement and were preserved.

### Remaining comparison gaps
- `/gone-home`, `/happy-families`, `/how-it-works`, `/faq` and `/contact` are still generic placeholder routes in the React application despite corresponding source templates being available.
- The homepage section set exists, but its compositions and mascot/scene interactions remain less complete than the reference's illustrated homepage.
- Shared header/footer still use the earlier minimal treatment rather than the reference shell's full decorative treatment.
- Manual browser validation at desktop, tablet and mobile sizes is still pending. This pass did not claim pixel-perfect equivalence.


### Phase 3 audit/refinement follow-up

The follow-up audit compared the live React profile against the available-puppy Max and Korean Teacup Maltipoo templates and the sold Buddy/Bailey templates, plus the reference component and CSS sources. It correctly identified the care-paper position, facts-board enclosure, thumbnail wrapping, gallery ratio/tablet breakpoint and paw-stamp placement as refinement areas. However, its interpretation of the chapter sequence was incomplete: it treated available and sold pages as one hierarchy and described the available enquiry letter as unnumbered. The Phase 3 close-out below supersedes that structural conclusion.

The historical implementation commit [`02be169`](https://github.com/dikshaforsure/P-mart/commit/02be169ed8dd690840934f3994322683f6df9e49) delivered the facts/status/actions board, preserved the care paper below it in the same column, refined desktop/tablet stacking and the thumbnail strip, and used the sold template's “the day they went home” Chapter 1 label. Its earlier chapter-count note was not correct: later direct template verification establishes **four** chapters for available profiles (hello, care, journey, enquiry letter) and **three** for sold profiles (day they went home, care, enquiry letter). The enquiry letter is numbered for both; only available profiles have the way-home journey section.

The data lookup, exact slugs, origin-based available journey selection, available adjacency, gallery/lightbox, form validation and WhatsApp destination/message construction were preserved. The sold-profile journey rendering mentioned in the previous note did not match the sold source template; the Phase 3 close-out removes it and gives sold profiles their source-ordered previous/next links using the Gone Home archive slug order. The reference's API-backed envelope submission/animation was not copied: both forms still prepare an explicit WhatsApp handoff and do not claim an enquiry was sent.

GitHub Actions run [#13](https://github.com/dikshaforsure/P-mart/actions/runs/45465525378), on the implementation commit, passed 3 focused files / 19 tests, the complete 10-file / 47-test suite and the production build. Real-browser comparison at desktop, tablet and mobile breakpoints, live image/video network checks and browser-console inspection remain unverified. The other placeholder routes, homepage and shared header/footer remain broader project work and were not included in this profile pass.


## Phase 4 reference comparison — shared shell, How It Works and FAQ

The destination baseline at `984652e8fde64cb715e063d556fbbebe96689dd0` was inspected against the reference shell templates, `how-it-works.html`, `faq.html`, `components.tsx`, `Template.tsx`, `types.ts`, `app.css` and `reference.css`.

### Verified existing content and reuse
- The destination FAQ JSON contains nine question/answer strings matching the reference FAQ's nine notes. The JSON remains the source of truth and is not duplicated in JSX.
- The destination header already had React Router links, route-close behavior, Escape handling, focus return and a keyboard focus loop for its mobile menu. These behaviors were retained while updating its presentation and active route marker.
- The destination content service/site content already had a three-step journey used on the homepage. The reference How It Works page has different local/imported sequences of four steps each, so the new route uses its own page content data and leaves the homepage content/service alone.
- The reference footer provides the email, Dubai location, social destinations and WhatsApp links. The new footer uses the verified email/location/social references, but keeps the destination WhatsApp helper and its configured destination unchanged. No phone number was newly introduced into the UI.

### New page behavior
`/how-it-works` implements local/imported tabs with a selected-state thumb, separate four-step journeys, keyboard tab navigation, in-page section links, paper-style promise content, delivery/collection cards, why-choose-us details and links back to puppies/FAQ/WhatsApp.

`/faq` parses each existing `faq.json` string at its first question mark, then searches both resulting question and answer fields. It displays live note counts, supports clear-to-reset, and provides independent semantic accordion buttons with explicit region IDs and ARIA relationships. The no-result state retains a WhatsApp path for follow-up.

### Content accuracy decisions
Some reference language describes health guarantees, ethical sourcing and reservation-only arrangements. Those claims were not elevated into new blanket business promises. Page copy was qualified, and existing FAQ content remains unchanged. Delivery wording points users to confirm the arrangements relevant to their destination with the team rather than presenting every reference statement as a verified policy.

### Scope and verification
The shared shell was updated, but the homepage was not redesigned. `/gone-home`, `/happy-families` and `/contact` remain untouched placeholders. The catalogue, puppy profile, gallery, note form, puppy data/services and WhatsApp helper remain unchanged.

Implementation commit [`86ae5779`](https://github.com/dikshaforsure/P-mart/commit/86ae5779f79f51c14c09de950393d34c6660c7bc) was verified by GitHub Actions [run #15](https://github.com/dikshaforsure/P-mart/actions/runs/45474656254): 4 focused files / 15 tests, 14 full-suite files / 64 tests, and a successful Vite 8.3.8 production build. Real-browser desktop/tablet/mobile comparison, overflow inspection, console/network checks and manual social/WhatsApp handoff were not performed.


## Phase 3 close-out — source-accurate available and sold profile behavior (25 November 2026)

**Destination baseline:** \`4c2ad275b707139fdcfdee37cede3c36462f6d8c\`  
**Final verified code commit:** \`610ae3c4e703daeb199a5a8494cc644bf8f91194\`  
**CI:** [GitHub Actions run #24](https://github.com/dikshaforsure/P-mart/actions/runs/45481254438)

### Reference files re-inspected

Compared \`puppies__maltipoo-max-male.html\`, \`puppies__korean-teacup-maltipoo-female.html\`, \`puppies__maltese-buddy-male.html\`, \`puppies__bichon-bailey-boy.html\`, \`gone-home.html\`, \`mascot.html\`, \`ScrollPuppy.tsx\`, \`LivePagePuppies.ts\`, \`PawTrail.tsx\`, \`motion/reference-motion.js\`, \`animations.ts\`, \`app.css\` and \`reference.css\`. The route integration confirms that the homepage journey and global pointer PawTrail are distinct effects and are not to be mounted on individual puppy profiles.

### Correct source hierarchy

| Available profile | Sold profile |
|---|---|
| 1. hello, it's me | 1. the day they went home |
| 2. what comes with [name] | 2. what comes with [name] |
| 3. the way home + journey | 3. dear TeddyPups… + enquiry |
| 4. dear TeddyPups… + enquiry | No journey chapter |

Both source types have previous/next links. Available adjacency continues to follow the current available-record order with wrap-around. Sold adjacency is now resolved through a separate ordered slug list matching the 27 cards in the source Gone Home archive; the destination puppy JSON and record order were not modified.

### Corrections and preserved functionality

The sold journey is removed, the enquiry form appears on both statuses with correct chapter numbering, sold-specific enquiry wording makes clear that the profile puppy has already found a home, and mocked-service coverage exercises the local-origin available journey branch without changing dataset values. Existing required name/phone checks, optional email validation and manual WhatsApp send handoff remain. The source mascot's SVG groups/parts are converted to JSX and animated locally with reduced-motion support and observer cleanup. The profile journey connector uses a repeating paw mask. The active gallery stage uses a keyed 0.42-second page wrapper without changing lightbox state or native video controls. The ribbon uses a rAF-throttled scroll progress update with cleanup for listeners, frames and optional ResizeObserver.

The Phase 4 shared shell, How It Works, FAQ, homepage, catalogue, data JSON, route table and WhatsApp utility/config are unchanged. No TypeScript, additional runtime, external motion library or dependency was added.

### Verification

Run #22 on the exact code commit passed:
- Focused: **5 files / 38 tests passed**.
- Full suite: **15 files / 74 tests passed**.
- Production build: **passed** (Vite 8.3.8).

No manual viewport checks, screenshot capture, browser-console inspection or live image/video request validation were performed. Responsive CSS and reduced-motion rules were added and unit-tested where applicable, but their visual behavior remains unverified at 1440×900, 1280×800, 1024×768, 768×1024, 390×844 and 375×812.

Next implementation phase: **Gone Home, Happy Families and Contact**; these routes remain outside this close-out.


## Phase 5 — Gone Home, Happy Families and Contact

**Destination baseline:** \`2cf2501667568cff3553640b3d4c4840fbde5dfe\`  
**Final tested code commit:** \`0fec72305c72b09915fb4d453bacc205e38d9469\`  
**CI evidence:** [GitHub Actions run #27](https://github.com/dikshaforsure/P-mart/actions/runs/45543194059)

### Source templates and modules inspected

Compared \`src/templates/gone-home.html\`, \`src/templates/happy-families.html\`, \`src/templates/contact.html\`, \`src/data/families.json\`, \`src/data/home-families.json\`, \`src/components.tsx\`, \`src/Template.tsx\`, \`src/types.ts\`, \`src/app.css\` and \`src/reference.css\` from the supplied reference repository. The destination already carried the 27-entry Gone Home order from the Phase 3 sold-profile navigation work, plus a full 64-record \`frontend/src/data/families.json\`.

### Gone Home

The reference uses admission-ticket cards with a one-ticket-home motif, vertical admit-one stub, circular puppy image, name/breed/sex and source-route cue. The new page renders all 27 sold records through \`goneHomePuppies\` without duplicating data. The ticket links each slug to \`/puppies/:slug\`; the page CTA links to \`/puppies\`. A source record with no cover/media uses a non-breaking paw placeholder. No labels or profile statuses convert a sold record into an available one.

### Happy Families

The page renders the complete 64-item \`families.json\` gallery in source order, not the eight homepage \`familyPreview.moments\`. It uses the existing Sarah M. testimonial quote/attribution from \`siteContent.js\`; eight gallery items retain their source captions and all others remain uncaptained as in the dataset. The photo wall uses a responsive 2/3/4-column masonry layout and a native \`dialog\` viewer with close, previous/next, Escape, arrow-key, touch-swipe, backdrop dismissal, focus restoration and background-scroll locking. Image failure is contained within a stable placeholder. Image records continue to reference the supplied source host; no local copying or permission assumption was made.

### Contact

The source form field sequence is name, phone, email, area, puppy selector, message and off-screen \`website\` honeypot. Name/phone are required; email remains optional; area and message retain source length limits; the puppy selector remains optional with source labels. The 15 puppy-choice labels and their order match the source. Because the source option UUIDs belong to an unavailable private backend and the destination has no contact API, the page uses stable local option values and includes the selected visible label in the WhatsApp handoff; it does not submit or persist those option IDs. Name, phone and supplied email are validated client-side and feedback is associated with controls. The honeypot is hidden from ordinary users and assistive technology and filled values are ignored.

No destination contact API/service/endpoint was available in scope. Rather than fabricating a POST endpoint or showing a false success state, submitting valid input composes all provided values and opens the existing \`getWhatsAppUrl()\` destination; the visitor must send the message in WhatsApp. A visible prepared-message link is provided for popup-blocked cases. The existing WhatsApp configuration remains untouched. The source contact page's ambiguous phone/WhatsApp destination is not newly printed; known email and Downtown Dubai location/map link are retained. The showroom image comes from the supplied reference \`contact.html\` and its use remains subject to client asset approval.

### Preservation and changed files

Implemented three dedicated page components and focused tests, replaced only their three placeholder routes, added three route integration checks, added page-scoped styles, updated the workflow's focused Phase 5 test command, and extended \`ASSET_SOURCES.md\` with 64-image and contact-image provenance. Existing catalogue/profile pages, puppy/family JSON, homepage, shared header/footer, Phase 4 How It Works/FAQ, WhatsApp utility/settings and route paths were preserved. No dependencies or package/lockfile changes were made.

### Verification and remaining work

Run #27 on the final tested code commit passed **4 focused files / 26 tests**, the full suite **18 files / 95 tests**, and the Vite 8.3.8 production build. The full browser viewport pass, screenshot comparison, live remote-media request check, browser-console inspection and manual WhatsApp handoff were not performed. Homepage visual refinement, integrated public-route responsive QA, backend enquiry persistence/notifications/admin decisions, asset-rights approval and deployment remain open.


## Phase 5 Contact fidelity follow-up — source details and responsive correction

A second inspection of the Contact template confirmed that its mascot is a page-specific use of the shared puppy SVG with the accessible description “Teddy, waiting for your letter”. The destination reuses the existing \`PuppyMascot\` component through optional presentation props, retaining the original profile defaults. Contact also now shows a stable showroom-photo fallback on image error and follows the reference's single-column, letter-first flow below 1024px; desktop columns remain unchanged.

The correction is in commit \`bed9eeab2394292462e4dcb2820ddae27a32b59e\`. It does not change page data, the source-host image URL, WhatsApp helper/configuration, footer values, routes or dependencies. CI run [#30](https://github.com/dikshaforsure/P-mart/actions/runs/45544244042) passed 5 focused files / 31 tests, the 18-file / 97-test frontend suite and the Vite 8.3.8 production build.

**Contact-number evidence remains conflicting:** the directly inspected reference \`src/templates/contact.html\` currently contains the \`+971 54 167 6733\` call and WhatsApp links, while the earlier asset crawl note recorded different number/link observations. The destination continues using its already configured WhatsApp helper and does not expose a new phone number. Resolve the intended public contact number with the assignment owner before altering shared contact configuration.

No real-browser viewport QA, screenshots, live image reachability test, manual WhatsApp send, asset-rights approval, API persistence or deployment were completed.

## Happy Families opening layout screenshot follow-up — 25 November 2026

The owner-provided screenshot showed the main title/description and count in the opening header, followed by a testimonial card on the left and a large blank area on the right. In the destination implementation, the header grid had only three children (intro, count, testimonial), so automatic grid placement left its second column unoccupied on the testimonial row.

The correction moves the existing testimonial into a dedicated feature row and fills the opposite column with four real Polaroid cards from the first four existing families.json records. The lower masonry wall renders the remaining 60 records, so the 64-photo set is unique and remains in source order across the complete page. The same FamilyMomentCard component and original global indexes preserve accessibility labels and lightbox navigation.

The reference route was not retrievable via the web inspection tool during this follow-up. CI run #46 passed focused checks (5 files / 32 tests), the full suite (22 files / 109 tests) and the production build. Browser screenshot verification remains open.
## Happy Families lightbox aspect-ratio correction — 25 November 2026

The owner screenshot of photo 13 showed the portrait original (families.json record 13: 1306 × 1600) rendered across the full width of the lightbox stage and cropped. Source inspection found that the stage used `height: calc(100% - 54px)` while the image was forced to `width: 100%; height: 100%`. Although `object-fit: contain` was present, the stage's percentage sizing made the image element fill the whole stage box rather than constrain its own dimensions to the source ratio.

The dialog now uses a three-row grid (toolbar / flexible stage / optional caption). The lightbox image has automatic width and height with maximum width and height bounded by the stage and `object-fit: contain`. This allows tall portrait photos to remain narrower and wide landscape photos to use the available width without cropping either. The thumbnail collage still uses cover cropping, and all source dimensions/URLs and lightbox interactions remain unchanged.

CI run #48 passed focused checks (5 files / 33 tests), full suite (22 files / 110 tests) and production build. The reference site was not needed to diagnose this screenshot-specific destination bug; real-browser verification is still outstanding.
## Homepage mascot and paw trail screenshot refinement — 25 November 2026

Source: the two owner-provided screenshots of the destination and designated reference hero. Destination source inspection confirmed the reusable SVG mascot already has open/shut eye layers and two front-paw paths within its ledge group. Rather than substitute an illustration, the existing front paws were separated into individually animatable SVG groups. Homepage-only interaction wraps the existing mascot in a button; hover/focus runs the existing eyelid layers as a brief blink, and click cycles five dog-like phrases plus an alternating paw wave. A polite live region announces phrase changes. Other PuppyMascot instances remain non-interactive.

The hero mascot was increased and lowered while preserving its z-index below the existing quilt (mascot z-index 4, quilt z-index 5), so the lower paws tuck behind the scalloped boundary. Responsive sizing is included.

Trail feedback was that the 30px/42ms marks looked dense and too fast. The new threshold requires both at least 84px of movement and 220ms elapsed since the last mark, and only the most recent five footprints stay mounted; each footprint fades over 1.8 seconds. No asset, package/dependency, route, puppy data or contact changes.

Code commit: 46a6eb59e086ea1e81aec1a28bc2702ae15e20f7. Test correction: ca41cfeb3c5337f4f578351378e8e3c1284f5c26.

CI run #51 focused step passed (5 files / 33 tests); full suite had 112 pass and one HomeHero test failure caused by raw DOM .click(), then the test was corrected. CI run #52 attempts 1 and 2 failed during npm installation with ETARGET for tldts-core@^7.5.6, before tests/build. The frontend has no committed package lock and no dependency changes were made. Real-browser rendering/animation/layering remains unverified.
## Shared header scallop and route scroll behavior — 25 November 2026

Reference comparison: the owner-provided original screenshot shows a repeating downward scalloped/cloud edge under the shared navigation bar, whereas the destination header previously ended in a straight border. The live reference page was opened and confirms the same primary navigation destinations and WhatsApp action; its text extraction does not expose CSS/visual geometry. The scallop geometry is therefore based on the actual owner-provided screenshot, not an unsupported claim about extracted source CSS.

Destination inspection found the header is centralized in SiteHeader.jsx and styled by a later .site-header override in index.css. The shared header now uses a repeating 60px radial-gradient ellipse decoration on ::after and a subtle drop shadow; the straight border is removed. Sticky positioning and existing header content/navigation are retained.

The app uses BrowserRouter nested around the shared AppLayout but had no route scroll manager. Since client-side route transitions reuse one document, the viewport was not being reset after pathname changes. Added ScrollToTop to AppLayout: history scroll restoration is set to manual; pathname changes jump to (0,0); hash links target their element; query-only changes are ignored so catalogue filter state doesn't bounce the visitor to the top.

ScrollToTop tests cover initial load/path changes, search/filter query changes and hash targets. CI run #56 passed 5 focused files / 33 tests and 23 full-suite files / 116 tests, plus Vite 8.3.8 production build (66 modules transformed). Visual browser geometry and actual browser back/forward behavior remain outstanding for Phase 7.
## Paw-trail length adjustment — 25 November 2026

Owner requested slightly more visible footprints and a slightly longer trail, while keeping the existing walking-speed spacing. Inspected PawTrail.jsx, PawTrail.test.jsx and CSS together because both JS cleanup timing and CSS animation duration control how long prints remain visible.

Adjusted only the visible tail size and lifetime: MAX_TRAIL_MARKS 5 → 7; TRAIL_LIFETIME 1800ms → 2200ms; `.paw-trail-stamp` animation-duration 1800ms → 2200ms. Kept TRAIL_DISTANCE 84px, TRAIL_INTERVAL 220ms and footprint size 24px unchanged. The unchanged thresholds preserve the slow cadence and distance between new prints; the additional two marks and modestly longer lifetime make the trail more visible without speeding it up or tightening the spacing.

Focused tests assert seven active marks maximum, persistence after 1800ms, removal at 2200ms and timer cleanup. GitHub Actions run #58 passed the focused step (5 files / 33 tests), full suite (23 files / 116 tests) and Vite 8.3.8 build (66 modules). Real-browser visual appearance is not verified yet.
## Puppy profile Chapter 2 content/layout correction — 25 November 2026

### Screenshot comparison and cause

The owner supplied two screenshots: destination (1917 × 1035) and designated reference (1876 × 778), showing the same 'what comes with [puppy]' Chapter 2 care panel for a Korean Teacup Poodle. The destination had a narrow two-column content block (`.85fr 1.15fr`), with `Every Teddy Pup comes` and an explanatory paragraph occupying the first column; the checklist itself was further split into two columns. This created four lines for the heading, around seven lines for the additional paragraph, and several narrow multi-line checklist entries. The reference screenshot instead has a compact handwritten chapter label, a full-width heading, and a vertical one-column checklist.

### Change

Changed only the shared Chapter 2 component/layout: added 'this' to the chapter label, moved `Every Teddy Pup comes` to the full content width, removed the extra explanatory paragraph, and rendered the four existing checklist statements in a single column. Tightened panel padding from a maximum of 48px to 42px, set the content gap to 17px and list gap to 12px; mobile gaps are slightly tighter. The paper background, border, tape, slight rotation, footer note, chapter number and existing care-item wording remain. This applies to both available and sold puppy profile pages.

No puppy JSON, profile routing, gallery, chapter count, enquiry, contact or health claim was changed. The four checklist items remain: Vaccinated; Dewormed; Verified health certificate from licensed vets; Thoroughly checked before joining your family.

Reference route inspection via web tool failed, so the exact visual comparison is grounded in the two owner-supplied screenshots and the destination source files.

Implementation commit `8c8aa0d3ed62cfa8c2a44a9eb4a27e6a074ae5d5`. CI run #60 passed 5 focused files / 33 tests, full 23 files / 116 tests, and Vite 8.3.8 build (66 modules). Real-browser rendering and responsive card-height comparison remain outstanding.
## Reference-inspired cross-route loading curtain — 25 November 2026

### Reference observation

The supplied 1918 × 1053 screenshot shows a full-viewport warm pale-honey loading scene, a subtle central light glow, repeating diagonal diamond/quilt lines, a small full-body TeddyPups-style dog, a trail of pawprints and the centered handwritten phrase 'every puppy is family'. The browser/OS taskbar is visible along the lower edge of the captured screenshot; it is not recreated inside the webpage.

The requested transition sequence is: the curtain enters from above and travels down to cover the page; Teddy runs left-to-right and leaves sequential pawprints; the curtain then travels upward (bottom-to-top exit) to reveal the destination route.

### Implementation

Mounted PageTransition in the shared AppLayout, so it responds to pathname changes across all public routes. It does not appear on initial load and ignores query-only/hash-only changes. Browser back/forward navigation that changes the pathname also triggers it. The destination route is resolved behind the overlay while the curtain covers it.

Timing: 440ms entrance; 1480ms runner/paw sequence; 540ms exit. The new TeddyRunner.jsx is a locally authored inline SVG (body, face, tail, four legs); CSS animates its bounce, head, tail and leg gait while moving across the viewport. Six existing PawMark SVGs appear in sequence. The quilt/diamond pattern and central glow are CSS only. Text and overlay status are accessible through a polite status region; interaction is blocked during the short transition.

Reduced-motion preference skips the transition entirely. Query-only catalogue filter changes and hash jumps do not animate. All phase timers are cleaned on unmount or interrupted navigation. No external libraries, assets or site content/data are introduced.

Implementation commit 34185b01a587ebdfef6172cba304ad09600f2309. CI run #62 passed 5 focused files / 33 tests; full suite 24 files / 121 tests; Vite 8.3.8 production build (68 modules transformed). CSS/SVG animation fidelity and responsive viewport rendering remain unverified in a real browser.
### Responsive pawprint delay correction

The first transition implementation used fixed CSS delays. A follow-up changed the six print delays to derive from viewport width and the runner width (the same clamp used by the CSS at the target viewport), calculating the time at which the dog has traversed each print's horizontal position and adding a short trailing offset. This keeps the marks behind the runner at different viewport widths. The six positions, runner movement and phase durations are unchanged.

Follow-up commit `ce8028e8929694ae5014416c6c34b985f9a63fc1`. CI run #64 passed 5 focused files / 33 tests, full suite 24 files / 121 tests and production build (68 modules transformed).