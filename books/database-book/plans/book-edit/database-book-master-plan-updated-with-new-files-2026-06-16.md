# Database Book Platform — Updated Simple Master Plan

**Date:** 2026-06-16  
**Project:** `books/database-book/`  
**Primary deployment:** `https://data-pilot.dimapublishing.com/`  
**Purpose:** Update the previously unified plan after considering the additional files: `README.md`, `simple-platform-plan-v2a-next-steps-6-12.md`, `simplified-plan-gpt-06-12.md`, `SUMMARY.md`, `v2a-setup-06-12.md`, and `Chapter 1 Editing.txt`.

---

## 1. Executive Decision

Use this working model:

```text
v1.1 = stable course reader
v1.2 = stable source/chapter workflow
v2A = paid-access sandbox in the Claude pilot
v2B = later learning features
Chapter visual workflow = controlled chapter-production subworkflow
```

The most important rule remains:

> Do not turn the current deployed reader into the paid platform.

The deployed/course-facing reader should remain stable and frontend-only. The paid-access work should be tested separately in the existing Claude pilot first, then later folded into a cleaner productized v2 reader if needed.

---

## 2. Corrected Current State

| Area | Updated status | Practical interpretation |
|---|---|---|
| v1.1 reader | Done / deployed / tagged, but still needs manual QA | Treat as stable unless a launch-blocking bug appears. |
| v1.2 source workflow | Largely done in planning files | Stable filenames, `book.yml`, registry, and manifest workflow now belong in the active contract. |
| Course launch | Active | Focus on student usability: assigned chapters, labs, mobile, no answers exposed. |
| v2A paid platform | Next | Use `platform-pilots/claude/` as the immediate sandbox. |
| v2B learning features | Deferred | Do not add notes, progress, search, submissions, dashboard, or LMS tools yet. |
| Chapter 1 / visual workflow | Add as editorial-production workflow | Use approval gates before scanning image folders, inserting new visuals, or optimizing images. |

---

## 3. Resolved Plan Conflicts

| Conflict | Earlier version | New resolution |
|---|---|---|
| Is Stage 2 still future work? | Earlier consolidated plan treated migration/source infrastructure as upcoming. | The newer simple plan and summary treat v1.2 source workflow as done or substantially done. Keep it in the plan as an active contract, but verify file presence before relying on it. |
| Where does v2A live? | Some plans say create `reader-hybrid-v2/`. | Immediate v2A testing should happen in `platform-pilots/claude/` because the setup checklist, migration, and access logic are already there. A future `reader-hybrid-v2/` can become the cleaned-up/fused product app after the sandbox proves the flow. |
| Four tables or five tables? | Earlier v2A plans include `course_roster`. | Immediate v2A pilot uses 4 tables: `profiles`, `access_grants`, `purchases`, `processed_stripe_events`. Defer `course_roster` until v2A+ or v2B unless enrollment verification becomes launch-critical. |
| Does Chapter 1 visual workflow change platform priorities? | It looks like another workflow. | It is not a platform phase. It becomes a chapter-production subworkflow used during content polishing. |
| Are image folders automatically scanned? | Some chapter workflows might imply broad scanning. | Only existing image references in the chapter may be standardized automatically. Scanning folders, inserting new images, copying, optimizing, renaming, and production reports require explicit approval. |
| Should all images become JPG? | Optimization docs may lean toward JPG derivatives. | Preserve PNG for diagrams, ERDs, screenshots, and text-heavy visuals; use JPG mainly for photos or gradient-heavy images. |

---

## 4. Five-Stage Roadmap

```text
Stage 1 — v1.1 Course Reader              ✅ done; verify only
Stage 2 — v1.2 Source/Chapter Workflow    ✅ mostly done; enforce contract
Stage 3 — Course Launch                   ⏳ active
Stage 4 — v2A Paid-Access Sandbox         ⏳ next
Stage 5 — v2B Learning Features           🔒 deferred
```

---

## 5. Stage 1 — v1.1 Course Reader

### Goal

Keep the deployed reader stable for students.

### Location

```text
books/database-book/platform-pilots/reader-hybrid-v1.1/
```

### Rules

Do not add:

```text
Stripe
Supabase
real login
student accounts
database access
protected paid routes
notes
persistent progress
AI assistant
```

### Verification checklist

Run from `reader-hybrid-v1.1/`:

```bash
npm install
npm run generate
npm run lint
npm run build
npm run preview
```

Manual QA:

```text
Home page loads
Book reader loads
Labs page loads
Demo Access/Login page loads
Core Concepts label is correct
On This Page works
Mobile layout works
No horizontal overflow
Favicon / manifest work
No AI Assistant route appears
```

---

## 6. Stage 2 — v1.2 Source and Chapter Workflow

### Goal

Use the repository as the working source of truth.

### Stable chapter files

Each chapter folder should use:

```text
index.md
core-concepts.md
lets-build.md
review-questions.md
terms-treasury.md
rat.md
```

### Active source location

```text
books/database-book/files/source/chapters/
```

### Supporting files

```text
books/database-book/book.yml
books/database-book/files/source/outline/book-outline.md
books/database-book/files/source/outline/chapter-registry.yml
books/database-book/files/manifests/source-import-manifest.csv
books/database-book/files/manifests/build-manifest.json
```

### Rules

```text
Git stores history.
Do not use active dated filenames as working files.
Do not edit in Drive and Git in parallel.
Never import lab answer files.
Original images stay on Google Drive or Cloudinary; do not dump originals into the repo.
```

### Important verification item

The uploaded summary says `build-manifest.json` belongs under `files/manifests/`. Before treating this complete, verify it exists in the current branch and records the deployment/build commit. If absent, create or regenerate it as part of course-launch hardening.

---

## 7. Chapter Editing and Visual Production Workflow

This is a recurring workflow for chapters such as Chapter 1. It should not be confused with platform work.

### 7.1 Content editing flow

Use this order:

```text
1. Edit the stable repo source file.
2. Commit content changes with a chapter prefix.
3. Run source/build validation.
4. QA the reader output.
5. Only then proceed to visual production if needed.
```

Example commit:

```bash
git add books/database-book/files/source/chapters/ch01-introduction-to-course/core-concepts.md
git commit -m "ch01: revise core concepts introduction"
```

### 7.2 Visual workflow gates

Only this can be automatic:

```text
Standardize existing image references already present in the chapter file.
```

Everything else requires explicit approval:

```text
scan chapter-local .images folder
scan global .images folder
read image-planning .md/.csv/.txt files
suggest additional visuals
insert additional visuals
copy images
optimize images
rename images
convert formats
update production paths
create production report
```

### 7.3 Standard figure format

Use:

```markdown
![Accessible alt text](.images/figure-01.1-short-slug.png)

*Figure 1.1 — Caption explaining what the figure shows and why it matters.*
```

### 7.4 Image preservation rules

```text
Never overwrite originals.
Never modify source images.
Never delete existing images.
Never delete captions.
Never move global images; copy them.
Use collision-safe naming.
Verify outputs.
Report what changed.
```

### 7.5 Format rule

Do not automatically convert every image to JPG.

Use:

| Image type | Preferred format |
|---|---|
| Diagrams, ERDs, screenshots with text, flat-color visuals | PNG |
| Photos, gradients, complex photographic images | JPG |
| Animated examples | GIF, unless a static version is explicitly requested |
| Vector diagrams | SVG if the pipeline supports it; otherwise export to PNG |

---

## 8. Stage 3 — Course Launch

### Goal

Students can use the reader when the course starts.

### Must be ready

```text
v1.1 reader deployed with stable URL
ch01–ch04 available
Labs 01–04 available
Mobile layout works
No lab answers exposed
Unfinished chapters show Coming Soon
Reader navigation is understandable
```

### Not required for launch

```text
Stripe
Supabase
paid access
student accounts
notes
progress
search
all 17 chapters fully polished
```

### Student-facing note

```text
The online reader is the primary textbook platform for this course. Chapters and labs will be released progressively. The first assigned readings and labs are available now; later chapters may show “Coming soon” until they are assigned.
```

---

## 9. Stage 4 — v2A Paid-Access Sandbox

### Goal

Prove:

```text
account → preview → payment → signed webhook → access grant → protected reader
```

### Immediate working directory

```text
books/database-book/platform-pilots/claude/
```

### Why use Claude first?

Because the new setup file already identifies this folder as the working v2A testbed, with:

```text
Supabase migration
profiles table
access_grants table
purchases table
processed_stripe_events table
Stripe checkout route
Stripe webhook route
ch01 preview bypass
ch02+ access gating
```

### v2A pilot scope

Immediate pilot tables:

| Table | Purpose |
|---|---|
| `profiles` | User display/profile data |
| `access_grants` | Who can read protected chapters |
| `purchases` | Stripe payment audit log |
| `processed_stripe_events` | Webhook idempotency |

Deferred until v2A+ / v2B:

```text
course_roster
notes
admin dashboard
instructor dashboard
student submissions
gradebook
LTI / institutional SSO
```

### v2A access logic

```text
ch01-introduction = preview/free
ch02+ = locked unless the user has an active access_grant
```

### v2A testing sequence

```text
1. Apply Supabase migration.
2. Create Stripe test product and price.
3. Add STRIPE_PRICE_ID.
4. Run local dev server.
5. Confirm logged-out users can read ch01.
6. Confirm logged-out users cannot read ch02.
7. Confirm signed-in unpaid users see locked UI.
8. Complete Stripe test checkout with card 4242 4242 4242 4242.
9. Confirm webhook inserts access_grant.
10. Confirm paid user can read ch02.
11. Confirm duplicate webhook does not duplicate grants.
12. Confirm service role key never reaches the browser.
```

### Safety rule

```text
Stripe test mode only.
No live payment keys.
No real student charges.
Do not unlock access from the browser success page.
Webhook controls access.
```

---

## 10. Stage 5 — v2B Learning Features

Do not start until v2A passes the full test checklist.

Deferred features:

```text
progress tracking
private student notes
lab completion tracking
lab submissions
protected search
accessibility hardening
instructor/admin dashboard
LMS integration
analytics
AI assistant
```

---

## 11. Immediate Priority Queue

### Priority 1 — Course launch stability

```text
Manual QA of deployed reader
Verify ch01–ch04 render correctly
Verify Labs 01–04 render correctly
Check mobile
Check no answer files exposed
Confirm Coming Soon behavior
Confirm build manifest exists or create it
```

### Priority 2 — Chapter workflow enforcement

```text
Use stable repo files only
Stop using active dated files
Commit chapter edits with chNN prefixes
Apply visual workflow approval gates
Do not production-optimize images without approval
```

### Priority 3 — v2A setup

```text
Use platform-pilots/claude/
Apply Supabase SQL
Create Stripe test product
Set STRIPE_PRICE_ID
Run local test
Deploy preview to Vercel
Configure Stripe webhook
Validate access_grants flow
```

---

## 12. One-Sentence Plan

```text
Keep v1.1 stable for students, enforce the stable Git-based chapter workflow, treat image production as an approval-gated editorial subworkflow, and use the Claude pilot to prove Stripe/Supabase access before building a polished v2 platform.
```
