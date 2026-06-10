Database Book Development Plan
Summary
Close v1.1 with verification and small cleanup, not a full redesign pass.
Make Git source migration the next major milestone: all 17 chapters, stable filenames, manifests, validation.
Expand the reader only after source files are stable.
Start the paid Next/Supabase/Stripe platform after the book source and full-reader pipeline are dependable.
Key Changes
Keep index.md as the chapter Introduction source. Do not remove it unless both generators are changed first.
Use stable chapter slugs as manifest IDs, such as sql, normalization, and database-design; keep ch05 only as display/order metadata.
Standardize outline storage as files/source/outline/ with book-outline.md, chapter-taglines.md, and chapter-registry.yml.
Add root book.yml as the shared book config for generators and future platforms.
Create files/manifests/source-import-manifest.csv and build-manifest.json; do not create per-chapter source manifests.
Keep original images on Google Drive; use Cloudinary URLs or later asset tokens in Markdown.
Never import lab answers.
Implementation Order
Stabilize v1.1

Run generate/lint/build.
Verify home hero, Motion cover, favicon, reader width, OTP highlighting, mobile layout, and no exposed AI Assistant route.
Remove or quarantine unused AI assistant code only if it is not referenced.
Reconcile Source Workflow

Update planning docs to resolve conflicts: index.md stays, stable slug IDs win, singular outline/ wins.
Add book.yml, chapter-registry.yml, and files/manifests/.
Dry-Run Migration

Write scripts/import-latest-drafts.ps1 -DryRun.
Select latest canonical dated Drive drafts by filename date.
Exclude rewrites, notes, backups, outlines, scratch files, and answer files.
Report selected files, missing files, same-date conflicts, hashes, and destinations.
Import Source

Import all 17 chapters into stable files:
index.md, core-concepts.md, lets-build.md, review-questions.md, terms-treasury.md, rat.md.
Import 15 student-facing lab question files to files/source/labs/*/index.md.
Generate source-import-manifest.csv.
Keep migration as its own commit before editorial edits.
Validate and Expand Readers

Update generators to use book.yml/registry instead of hard-coded chapter lists where practical.
Validate full-book rendering with cursor-online-reader.
Expand v1.1 from 4 chapters only if it remains useful as the production-style reader reference.
Build Outputs

Add source validation checks for empty files, raw Windows paths, missing sections, answer leakage, malformed Markdown, and broken image references.
Record formal reader/DOCX/EPUB/PDF builds in build-manifest.json.
Paid Platform Later

Start v2A only after source migration and full-reader validation.
Reuse the existing Next.js/Supabase/Stripe plan, including server-side access checks and Stripe webhook-only access grants.
Test Plan
npm run generate, npm run lint, and npm run build pass for v1.1.
Dry-run migration produces a complete report before copying.
All 17 chapters have expected stable source files or explicit missing-source rows.
No lab answer files exist under files/source.
No raw G:\ or C:\ paths remain in imported Markdown unless flagged.
Full-book generator renders all chapters without placeholders except known missing-source cases.
Formal build writes a valid build-manifest.json.
Assumptions
Existing dirty/untracked repo changes are intentional and must not be reverted.
The book source is the priority over paid-platform proof.
v1.1 is a frontend prototype/reference, not the long-term paid platform.
Google Drive becomes historical source plus image library after migration.