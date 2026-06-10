# BITM330 Book Platform Build Plan

Date: 2026-05-19
Status: Approved and implementation started

## Position

This plan is sound.

The platform should be built as a separate application that treats this repository as the authored content source. The first implementation target should remain the reader MVP, not payments, LTI, or lab grading.

## Working Rules

1. Keep this repository as the source of truth for book content.
2. Ship the reader before authentication complexity grows.
3. Do not build payment before deep links and chapter rendering work.
4. Choose one authoritative lab source before building the full importer.

## Build Order

### Phase 1: Reader MVP

Build:

1. Home page
2. Book dashboard
3. Chapter reader
4. Collapsible chapter navigation
5. Part navigation for main, Let's Build, terms, reflection, RAT, and lab
6. Deep links to chapter and part views
7. Responsive layout
8. Local asset serving for existing manuscript images

### Phase 2: Content Pipeline

Build:

1. Latest-file selection by dated filename
2. Markdown-first rendering
3. Front matter stripping and title extraction
4. Heading anchor extraction
5. Image and embedded asset normalization
6. Import warnings for unresolved paths and unsupported content

### Phase 3: Access and Identity

Build:

1. Instructor and guest login with hashed passwords
2. Student first-time verification flow
3. Safe long-term login method after verification
4. Redirect-back behavior for deep links
5. Access grant checks

### Phase 4: Progress and Search

Build:

1. Section progress events
2. Manual complete or incomplete state
3. Chapter progress rollups
4. Access-aware search across chapters and companion parts

### Phase 5: Payment

Build:

1. One provider first
2. Payment webhook processing
3. Access activation after successful payment
4. Redirect to originally requested page

### Phase 6: Labs and Reporting

Build:

1. Readable lab pages
2. Lab completion state
3. Submission flow
4. Instructor reporting
5. Grading later

### Phase 7: LMS Integration

Build only after the native platform is stable:

1. Brightspace launch
2. Role mapping
3. Deep links from LMS modules
4. Grade passback if needed

## Content Contract

The current repository structure is split by chapter and part. The implementation should use the latest dated file in each chapter part folder.

Representative source files:

- `.docs/book-build/book-platform-guidlines-chatgpt.md`
- `BITM330-Book-draft/chapter-drafts/ch04-databases/main/ch04-main-edited-2026-05-18.md`
- `BITM330-Book-draft/chapter-drafts/ch04-databases/lets-build/ch04-lets-build-2026-03-22.md`
- `BITM330-Book-draft/chapter-drafts/ch04-databases/terms/ch04-terms-2026-03-22.md`
- `BITM330-Book-draft/chapter-drafts/ch04-databases/lab/ch04-lab.md`
- `BITM330-Book-draft/Labs/sections/part-02-databases-and-the-relational-model/ch07-normalization/lab.md`

Open decision:

- Pick one authoritative lab source before implementing the full lab pipeline.

## Current Implementation

Implementation has started in `book-platform/`.

Current delivered slice:

1. FastAPI app scaffold
2. Filesystem-backed chapter discovery
3. Latest dated Markdown selection per chapter part
4. Markdown rendering for chapter parts
5. Dashboard and chapter reader routes
6. Local asset proxy route for repo-hosted content
7. Responsive templates and base styling

## Immediate Next Steps

1. Install the new app dependencies in the local virtual environment.
2. Validate the app starts and can render Chapter 4.
3. Add chapter-part labels and heading anchor navigation.
4. Normalize more image edge cases and embedded HTML.
5. Decide the lab source authority.
6. Add a persistent content index instead of rescanning the filesystem on each request.

## Not in Scope for the First Working Cut

1. PayPal
2. Full admin UI
3. Autograding
4. LTI launch
5. Grade passback
6. Multi-book tenancy beyond basic model readiness
