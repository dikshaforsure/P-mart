# TeddyPups Website — Project Analysis

**Research date:** 24 November 2026  
**Reference:** https://puppy.instabizweb.com/  
**Repository:** https://github.com/dikshaforsure/P-mart  
**Phase:** 0 — Research and planning only

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
