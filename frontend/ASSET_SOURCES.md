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
