# Casual member photos

This folder holds the "casual side" photo for each member's flip card on
`members-templated.html` — as opposed to `assets/img/members/`, which holds
the professional/composite photos.

**Naming convention**: same as `assets/img/members/` — `Last, First.jpg`
(comma-space), e.g. `Doe, Jane.jpg`. `.jpeg` works too — just use whichever
extension the photo file actually has, and make sure `casualPhoto` in
`members-data.js` matches it exactly.

**To add one**: drop the photo in here, then set that member's `casualPhoto`
field in [`../../../js/members-data.js`](../../../js/members-data.js) to
`"assets/img/members-casual/Last, First.jpg"`.

If a member doesn't have a casual photo yet, leave `casualPhoto: null` in
their data entry — the site automatically falls back to a neutral
placeholder image instead of showing a broken image or another member's
photo.
