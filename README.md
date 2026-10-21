# SafeLease SG

A responsive, bilingual browser app built from the attached SafeLease design prompt and red-and-white references. The app uses dependency-free JavaScript modules, CSS, localStorage, IndexedDB, and a service worker. The original reference files are retained in `reference/` and excluded from deployment.

## Run

From this folder:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173. Camera and service worker require localhost or HTTPS. Tests: `node --test tests/core.test.js`.

## Implemented

- Responsive desktop navigation rail, tablet result/record panes, mobile bottom navigation and sheets.
- English/Chinese interface, dark appearance, reduced-motion preferences, keyboard focus and labelled controls.
- Sample dashboard and an option to replace the sample with a personal lease.
- Listing link and screenshot validation; itemised sample results; honest “Not checked” outcomes for unconnected live analysis.
- Guided CEA lookup with a real official link and persisted user-reported outcomes.
- PayNow comparison with word alignment, X masking, trailing XX hidden-length rules, insufficient-letter and company-name handling.
- Validated lease entry, calculated deposit/refund dates, renewal totals, received-refund state and downloadable calendar reminders.
- In-app camera capture, SHA-256 of original captured bytes, IndexedDB storage, room requirements, separate annotation layers and notes. Gallery import is disabled.
- Device-time 48-hour local record window, local confirmation, one-sided closure, and a clearly labelled landlord confirmation demonstration.
- Move-out capture with an adjustable move-in ghost overlay where a reference photo exists.
- Editable deduction-request, deduction-dispute and final-notice letters, selected record attachments and browser print-to-PDF preview.
- Review-request draft download, local profile settings, data export including original photo bytes, explicit local-data deletion.
- Installable PWA manifest, generated brand icons and offline app-shell cache.

## Important boundaries

This is a functioning local preview, not an operational rental-verification service. The UI explicitly labels these boundaries:

- No backend account authentication, OTP delivery, school validation, checkout or payment processing.
- No live reverse-image search, OCR or automated listing analysis. Sample findings are not findings about user-entered listings.
- No human review delivery, cross-device secure landlord links, remote notifications or authenticated co-signature.
- No Singapore cloud region, server timestamps, automatic upload queue, C2PA inspection or scheduled retention deletion.
- Device-time and SHA-256 are useful local records, not trusted proof of capture time or room condition.
- The sample landlord confirmation does not modify the real local record. Real bilateral locking requires server-side authentication and append-only storage.
- PDF export uses the browser print dialog. Data backup uses JSON with original photo data URLs.
- Account signup and the future 2028 paid owner portal are not implemented as services.
- Device-specific iOS splash assets, video capture, interactive spring gestures and a background-sync upload backend are not included.

Production development should connect these services and enforce access, timestamps, append-only record versions and retention server-side before inviting tenants or landlords to rely on the app as evidence storage. A newly signed agreement is deliberately not described as automatically resetting tribunal eligibility.

## Validation

Automated tests cover name comparison edge cases, inclusive tenancy month calculations, dates including leap days, and listing URL validation. Browser checks cover navigation, name match/mismatch, sample check completion, CEA result persistence, Chinese layout at 320px, and the evidence flow. Hardware camera capture and the system print dialog need real-device acceptance testing.

## Official guidance linked in the app

- CEA Public Register: https://eservices.cea.gov.sg/aceas/public-register/sales/1
- Singapore Courts, small-claim eligibility: https://www.judiciary.gov.sg/civil/cases-eligible-small-claim
