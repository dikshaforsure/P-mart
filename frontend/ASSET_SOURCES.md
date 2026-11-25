# Homepage asset source register

**Reference host:** https://puppy.instabizweb.com/  
**Inspection date:** 24 November 2026

The current homepage uses images whose media paths were exposed by the supplied reference site's own public image links. They are represented in `src/data/referenceAssets.js` through the reference host's Next image endpoint. This avoids substituting unrelated stock photos.

| Usage | Source record | Notes |
|---|---|---|
| Hero | Homepage image link | Black-and-white fluffy puppy photograph from supplied host |
| Dubai showroom card | Homepage “Puppies in Dubai” image | Golden puppy being held in showroom |
| Puppy cards 1–6 | Main gallery images from the six corresponding public puppy profiles | Max, Korean Teacup Maltipoo, Korean Teacup Poodle, Maltipoo & Cavapoo, Toy Poodle, Maltipoo |
| Happy-family preview | First eight linked images on the homepage Happy families section | Family/puppy images; captions are kept in `siteContent.js` |

## Important media handling

- These are external image references; no binary image files were downloaded into this workspace.
- The current site is dependent on the source host continuing to serve these URLs.
- Confirm assignment/client permissions before shipping the images as production assets. Public accessibility does not establish reuse rights.
- Once approved, download/transfer the approved originals into `src/assets/images/` or a project-owned CDN and update only `src/data/referenceAssets.js`.
- Preserve alt text and use responsive dimensions/lazy loading for below-the-fold images.
- No puppy videos were added in this phase.

## Contact-link verification note

The visible reference phone is `+971 50 000 0000`. The supplied page's WhatsApp anchor was inspected separately and resolved to a prefilled `wa.me` URL for `919898124987` with unrelated “Insta Biz Web” text. That appears to be a template/provider destination rather than a TeddyPups contact, so it is not copied into this app. Current WhatsApp links are generated from the phone number visibly printed on the site (`971500000000`); confirm that displayed number is the intended live WhatsApp destination before production use. The email address is obscured in the accessible page extract and is therefore not linked in the footer.


## Phase 2 puppy profile media

The catalogue and profile components read cover/gallery records from `src/data/puppies.json`. URLs remain direct remote references to the `puppy.instabizweb.com/media/...` host. Image and video items are selected by `kind`; videos use their poster object where present. Metadata such as dimensions, alt, caption, duration and focal points is kept in the dataset and used by the UI.

No binary files were downloaded or added to the repository. Direct network verification of each media URL could not complete in this environment, so do not treat media reachability as confirmed. The currently crawlable `teddypups.ae` profile pages show matching gallery counts but are a separate hostname from the requested media source. Confirm asset rights and actual media responses before deployment.


## Phase 5 public-page asset register

**Reference templates inspected:** \`src/templates/gone-home.html\`, \`src/templates/happy-families.html\`, \`src/templates/contact.html\`, \`src/data/families.json\` and \`src/data/home-families.json\`.

| Usage | Destination data/source | Notes |
|---|---|---|
| Gone Home ticket portraits | Existing \`frontend/src/data/puppies.json\` cover/media records | All 27 sold cards reuse the existing profile media metadata and supplied-host URLs. The sold record \`poodle-molly-female\` has no cover/media in the destination snapshot; the ticket displays a designed paw fallback rather than an invented image. |
| Happy Families gallery | Existing \`frontend/src/data/families.json\` (64 records) | ID order, captions, alt text, dimensions and focal points were compared with reference \`src/data/families.json\`. The destination already contains the full 64-image page gallery; it is not the 8-item homepage preview. |
| Happy Families testimonial | Existing \`familyPreview.quote\` and \`familyPreview.author\` in \`frontend/src/data/siteContent.js\` | Source text and attribution verified against \`happy-families.html\`; the eight \`familyPreview.moments\` are not used as the page gallery inventory. |
| Contact showroom image | \`https://puppy.instabizweb.com/media/skvodl2NZiKq/cefab5eee9/27b888_323008bb0f6a41d4bde2a0da7206cd98f003.jpg\` | The image URL and alt text are taken from the supplied reference \`contact.html\`. No binary was downloaded. |

- Family gallery source contains exactly 64 image buttons; eight records have non-empty captions (including the caption attached to photo 59). The destination data preserves all 64 entries in their source order.
- Destination \`families.json\` already uses absolute URLs at \`https://puppy.instabizweb.com/media/...\`; the reference JSON uses root-relative \`/media/...\` paths. The destination URLs were left unchanged.
- No new image binaries or generic stock images were added. Remote media reachability was not independently verified in a browser in this task.
- Asset ownership/reuse permissions are not established by public availability. Obtain assignment/client approval before production redistribution or local copying.
