# Database Book Platform — Simple Master Plan

**Date:** 2026-06-16  
**Project:** `books/database-book/`  
**Primary deployment:** `https://data-pilot.dimapublishing.com/`  
**Purpose:** Replace the scattered planning files with one practical execution plan.

---

## 1. Executive Decision

Use a **two-track strategy**:

| Track | Purpose | Current Role |
|---|---|---|
| **Track A — Course Reader** | Keep the current reader stable and usable for students. | Immediate course-facing platform. |
| **Track B — Paid Platform Sandbox** | Build the future protected platform with account, payment, and access control. | Separate pilot; do not merge into the course reader yet. |

The critical principle is simple:

> **Do not turn the current reader into the paid platform. Keep v1.1 stable. Build v2A separately.**

---

## 2. Current State

### 2.1 Reader / Deployment

- The current reader is treated as the stable course-facing platform.
- v1.1 should remain frontend-only.
- It should support available chapters, labs, navigation, mobile reading, and demo access.
- It should **not** add Supabase, Stripe, real authentication, database access, AI Assistant, notes, or persistent progress.

### 2.2 Source / Book Repository

The repo now has the correct content contract:

```text
books/database-book/
  book.yml
  files/
    source/
      chapters/
      labs/
      outline/
        book-outline.md
        chapter-taglines.md
        chapter-registry.yml
    manifests/
      source-import-manifest.csv
```

Each chapter folder should use the six stable files:

```text
index.md
core-concepts.md
lets-build.md
review-questions.md
terms-treasury.md
rat.md
```

These labels are locked:

```text
Introduction
Core Concepts
Let's Build
Review Questions
Terms Treasury
RAT: Reading Test
```

Never rename **Core Concepts** to **Main Concepts**.

### 2.3 Migration / Provenance

- The repo is the working source of truth.
- Google Drive is now the historical source archive and original media/image library.
- Use Git history for revision tracking instead of active dated Markdown filenames.
- Use `source-import-manifest.csv` for import provenance.
- Use `build-manifest.json` for formal release/build provenance.

---

## 3. Unified Stage Plan

## Stage 1 — Freeze and Verify v1.1 Course Reader

**Goal:** Make sure students can reliably use the deployed reader.

**Location:**

```text
books/database-book/platform-pilots/reader-hybrid-v1.1/
```

**Checklist:**

- [ ] Open `https://data-pilot.dimapublishing.com/`
- [ ] Confirm Home loads
- [ ] Confirm Book reader loads
- [ ] Confirm Labs page loads
- [ ] Confirm Demo Login / Access page loads
- [ ] Confirm sidebar/navigation labels are clear
- [ ] Confirm **Core Concepts** appears correctly
- [ ] Confirm “On this page” works
- [ ] Confirm mobile layout works
- [ ] Confirm no AI Assistant route is exposed
- [ ] Confirm no answer files are exposed
- [ ] Confirm unfinished chapters/labs show clear placeholders

**Build checks:**

```bash
cd books/database-book/platform-pilots/reader-hybrid-v1.1
npm install
npm run generate
npm run lint
npm run build
```

**Exit criteria:**

```text
v1.1 is stable enough for course use.
Students can read assigned chapters and labs.
No backend/payment/user-data work has been added to v1.1.
```

---

## Stage 2 — Stabilize the Source Workflow

**Goal:** Make the book easy to edit without breaking the reader.

**Rules:**

| Rule | Decision |
|---|---|
| Canonical source | Git repo |
| Drive role | Historical archive + image library |
| Active filenames | Stable filenames only |
| Versioning | Git commits, not dated active files |
| Import provenance | `files/manifests/source-import-manifest.csv` |
| Build provenance | `files/manifests/build-manifest.json` |
| Lab answers | Never import |

**Tasks:**

- [ ] Confirm all required chapter folders exist
- [ ] Confirm each available chapter has stable filenames
- [ ] Remove or archive old dated active files only after verification
- [ ] Confirm `book.yml` matches the current chapter structure
- [ ] Confirm `chapter-registry.yml` resolves all image/source mismatches
- [ ] Confirm `source-import-manifest.csv` reflects the latest import
- [ ] Create or update `build-manifest.json` after formal builds
- [ ] Add a short editing workflow note for future chapter edits

**Recommended branch pattern:**

```bash
content/ch05-sql
content/ch06-relational-model
platform/v2a-paid-access
```

**Recommended commit pattern:**

```bash
ch05: revise SQL SELECT examples
lab-05: update SQL practice instructions
build: record reader build manifest
migration: import latest canonical source files
```

---

## Stage 3 — Course Launch Readiness

**Goal:** Make the platform usable for students before expanding features.

**Minimum course launch scope:**

| Area | Required? |
|---|---:|
| Stable public URL | Yes |
| First assigned chapters | Yes |
| First assigned labs | Yes |
| Mobile readability | Yes |
| Clear navigation | Yes |
| Answer-file protection | Yes |
| All 17 chapters polished | No |
| Stripe/payment | No |
| Real student accounts | No |
| Notes/progress/search | No |

**Student-facing framing:**

> The online reader is the primary textbook platform for this course. Chapters and labs will be released progressively. Assigned readings and labs are available now; later materials may show “Coming soon” until released.

**Exit criteria:**

```text
Students have a stable URL and can begin the course without needing accounts or payment.
```

---

## Stage 4 — Build v2A Paid-Access Sandbox

**Goal:** Prove account → profile → payment → access → protected reader.

**Location:**

```text
books/database-book/platform-pilots/reader-hybrid-v2/
```

**Important:** v2A is a separate sandbox. It should not replace the deployed course reader until the full test flow passes.

### 4.1 Stack

```text
Next.js App Router
TypeScript
Supabase Auth
Supabase Postgres
Supabase Row-Level Security
Stripe Checkout
Stripe Webhooks
Vercel
```

### 4.2 Required Tables

| Table | Purpose |
|---|---|
| `course_roster` | Uploaded course enrollment / eligibility |
| `profiles` | User profile connected to Supabase Auth |
| `purchases` | Stripe payment audit log |
| `access_grants` | Who can access the protected book |
| `processed_stripe_events` | Webhook idempotency |

### 4.3 Routes

```text
/
 /preview
 /preview/ch01
 /login
 /register
 /account
 /access
 /success
 /cancel
 /book
 /book/ch01
 /api/stripe/create-checkout-session
 /api/stripe/webhook
```

### 4.4 Access Rule

A user can open the protected reader only when:

```text
user is logged in
profile exists
student is matched to a course roster or has manual access
active access_grant exists for database-book-2026
```

### 4.5 Stripe Safety Rule

Never unlock access from the browser success page.

Correct flow:

```text
Stripe Checkout completes
Stripe sends signed webhook
server verifies webhook
server records purchase
server creates access_grant
protected reader unlocks
```

Use **Stripe test mode only** until all validation cases pass.

### 4.6 v2A Validation

- [ ] Logged-out visitor can view preview
- [ ] Logged-out visitor cannot access `/book`
- [ ] Logged-in unpaid student cannot access `/book`
- [ ] Student can complete test Stripe payment
- [ ] Webhook signature verification works
- [ ] Purchase is recorded
- [ ] Access grant is created
- [ ] Paid student can open protected reader
- [ ] Duplicate webhook does not duplicate access
- [ ] Refund/revocation path works
- [ ] Service-role key never reaches browser

**Exit criteria:**

```text
v2A proves secure paid access in test mode with ch01–ch04 content.
```

---

## Stage 5 — Add v2B Learning Features Later

**Gate:** Do not start until v2A passes.

### 5.1 Add First

| Feature | Scope |
|---|---|
| Progress | Resume reading, page completion, chapter completion |
| Notes | Private student notes tied to selected text/page |
| Labs | Read instructions, download files, mark complete |
| Search | Server-side protected search |
| Accessibility hardening | Keyboard, focus, landmarks, contrast, captions |

### 5.2 Defer Further

Do not build these until the platform has stable users and content:

```text
AI Assistant
Instructor dashboard
Student submissions
Gradebook
LTI / LMS integration
Institutional SSO
Advanced analytics
Recommendation engine
Semantic search
```

---

## 4. What to Ignore or Archive

The old planning files should not all be treated equally.

| Plan Type | Keep As | Action |
|---|---|---|
| v1.1 completion specs | Historical implementation reference | Archive/reference only |
| Source migration docs | Detailed reference | Keep, but follow this master plan first |
| Architecture reference | Technical appendix | Keep |
| Locked decisions | Authoritative constraints | Keep |
| v2A paid platform docs | Future-stage detail | Keep, but do not start before Stage 4 |
| v2B learning feature docs | Future-stage detail | Keep, but do not start before Stage 5 |
| Old static-reader plans | Superseded concept | Archive |
| Palette experiments | Design reference only | Do not let them override v1.1 design system unless intentionally redesigning |

---

## 5. The Simplified Priority Order

```text
1. Keep current reader stable.
2. Verify first chapters and labs.
3. Stabilize the Git-based source workflow.
4. Launch/use the course reader.
5. Build v2A paid-access sandbox separately.
6. Add v2B learning features only after paid access works.
```

---

## 6. Immediate Next 10 Tasks

1. QA the deployed reader at `https://data-pilot.dimapublishing.com/`.
2. Run `generate`, `lint`, and `build` in `reader-hybrid-v1.1`.
3. Confirm all visible reader labels use **Core Concepts**.
4. Confirm labs do not expose answers.
5. Confirm first assigned chapters/labs are complete enough for students.
6. Confirm `source-import-manifest.csv` reflects the latest imports.
7. Create/update `build-manifest.json` for the current deployed build.
8. Add a one-page “How to edit a chapter” workflow note.
9. Mark older plan files as superseded in the planning README.
10. Start v2A only in a separate branch/folder after the above is stable.

---

## 7. One-Sentence Strategy

**Use v1.1 to teach the course; use v1.2 to stabilize the manuscript workflow; use v2A to prove secure paid access; use v2B to add learning features.**
