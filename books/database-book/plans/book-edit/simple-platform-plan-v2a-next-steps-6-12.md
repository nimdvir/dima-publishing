# Database Book Platform — Simple Master Plan

**Date:** 2026-06-12  
**Supersedes:** older `database-book-plan-*.md` files  
**Canonical refs:** `book-plan-codex.md`, `06-locked-decisions.md`

---

## Nim Edit

Add this to homepage:
*Using Data to Drive Business Performance* is an applied introduction to databases, information systems, analytics, and managerial decision-making. The book teaches students how data moves from raw records into structured tables, relationships, queries, dashboards, and business decisions.

Through examples, labs, and running projects such as the Grading Database, students learn not only how database systems work, but why they matter for organizational performance, evidence-based management, and strategic decision-making.

The book connects technical skills with business judgment, preparing students to use data as a reliable foundation for better decisions.


## Purpose

Build the database textbook platform in a practical sequence that supports the course now, while preparing for paid access later.

**Immediate goal:**
> Students can read the assigned chapters and labs when the course starts.

**Longer-term goal:**
> Students can log in, pay through Stripe, and access the protected textbook platform.

---

## The Big Picture — Five Stages

```
Stage 1 — v1.1 Course Reader          ✅ DONE — tagged reader-v1.1-stable
Stage 2 — v1.2 Source/Chapter Workflow ✅ DONE — stable filenames, book.yml, manifests
Stage 3 — Course Launch                ⏳ ACTIVE
Stage 4 — v2A Paid-Access Pilot        ⏳ NEXT — Claude pilot as base
Stage 5 — v2B Learning Features        🔒 DEFERRED
```

---

## Stage 1 — v1.1 Course Reader ✅

**Goal:** Freeze the course reader for student use.

**Location:** `platform-pilots/reader-hybrid-v1.1/`

**Status:** Built, deployed to Vercel, tagged `reader-v1.1-stable`. Do not modify.

---

## Stage 2 — v1.2 Source and Chapter Workflow ✅

**Goal:** Stable chapter filenames and editing workflow.

**Stable filenames per chapter:**
```
index.md
core-concepts.md
lets-build.md
review-questions.md
terms-treasury.md
rat.md
```

**Infrastructure created:**
```
books/database-book/book.yml
books/database-book/files/source/outline/book-outline.md
books/database-book/files/source/outline/chapter-registry.yml
books/database-book/files/manifests/source-import-manifest.csv
```

**Rule:** Git stores history. Do not use active dated filenames as working files.

---

## Stage 3 — Course Launch ⏳

**Goal:** Students can use the reader when the course starts.

**Must be ready:**
- v1.1 reader deployed with stable URL
- ch01–ch04 available (core concepts + labs)
- Mobile layout works
- No answer files exposed
- Unfinished chapters show "Coming Soon"

**Not required at launch:**
- Stripe, Supabase, student accounts, paid access, notes, progress

**Student-facing note:**
> The online reader is the primary textbook platform. Chapters and labs will be released progressively. The first assigned readings and labs are available now.

---

## Stage 4 — v2A Paid-Access Pilot ⏳

**Goal:** Test full paid-access flow before fall. Separate app, not mixed into v1.1.

**Location:** `platform-pilots/claude/` — use as the v2A app (Next.js 16 + Supabase + Stripe).

**Technology:** Next.js · TypeScript · Supabase Auth · Supabase Postgres + RLS · Stripe Checkout · Stripe Webhooks · Vercel

### Access Flow

```
student creates account
  ↓
student pays through Stripe Checkout
  ↓
Stripe sends signed webhook to /api/stripe/webhook
  ↓
server verifies webhook signature
  ↓
purchase + access_grant rows written via service role
  ↓
protected reader unlocks for that user
```

**Rule:** Never unlock access from the browser success page. Webhook only.

### Supabase Tables (v2A — 4 tables)

| Table | Purpose |
|-------|---------|
| `access_grants` | Who can read the book; service-role writes only |
| `purchases` | Audit log of Stripe payments; service-role writes only |
| `processed_stripe_events` | Webhook idempotency |
| `profiles` | User display info; user reads/writes own row |

Migration file: `supabase/migrations/0001_init.sql`

### Chapter Access Logic

```
ch01-introduction → preview: true → FREE for everyone
ch02+             → preview: false → requires active access_grant
```

Logic in `src/app/book/[chapter]/page.tsx`:
```ts
const locked = !chapter.preview && !access;
```

`content/book.yaml` marks ch01 with `preview: true`.

### Environment Variables (`.env`)

| Variable | Status |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Set |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Set |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Set |
| `STRIPE_SECRET_KEY` | ✅ Set |
| `STRIPE_WEBHOOK_SECRET` | ✅ Set |
| `STRIPE_PRICE_ID` | ⏳ Needs real `price_XXXX` |
| `NEXT_PUBLIC_SITE_URL` | ✅ Set |
| `NEXT_PUBLIC_BOOK_PRODUCT_ID` | ✅ `database-book` |

### v2A Routes

```
/                              — home + pricing
/book                          — TOC (previews labeled; locked chapters shown)
/book/ch01-introduction        — FREE (preview)
/book/ch02-mis-and-bitm        — LOCKED (requires payment)
/auth/signup                   — register
/auth/login                    — sign in
/api/checkout                  — creates Stripe Checkout session
/api/stripe/webhook            — receives Stripe events
/api/auth/callback             — Supabase OAuth/magic-link callback
```

### v2A Validation Checklist

```
□ Logged-out visitor can read ch01
□ Logged-out visitor cannot read ch02
□ Signed-in unpaid user cannot read ch02
□ Stripe test checkout completes (card 4242 4242 4242 4242)
□ Webhook fires and access_grant row appears in Supabase
□ Signed-in paid user can read ch02
□ Duplicate webhook does not duplicate access_grant
□ SUPABASE_SERVICE_ROLE_KEY never reaches the browser
```

### Deployment Steps

1. Apply migration in Supabase SQL Editor (`0001_init.sql`)
2. Create Stripe test product → copy `price_XXXX` into `.env`
3. `npm run dev` — local test against checklist above
4. `vercel --yes` — deploy
5. Add all 8 env vars to Vercel project
6. `vercel --prod --yes` — redeploy with vars
7. Configure Stripe webhook → `https://<vercel-url>/api/stripe/webhook` → event: `checkout.session.completed`
8. Update `STRIPE_WEBHOOK_SECRET` in Vercel env, redeploy

See also: `v2a-setup-06-12.md` for the detailed step-by-step test sequence.

---

## Stage 5 — v2B Learning Features 🔒 Deferred

Do not start until v2A is stable.

Planned features: progress tracking · student notes · lab submission · protected search · accessibility hardening

Not building yet: AI assistant · instructor dashboard · gradebook · LTI · real institutional SSO

---

## Editing Rules While Course Is Running

- Edit chapters in `books/database-book/files/source/chapters/`
- Use Git commits for version history — no active dated files
- Use branches for active edits: `content/ch02-revision`, `platform/v2a-paid-access`
- Keep `main` deployable; use preview branches for risky changes
- Never push lab answer files to the public source repo

---

## Priority Order

```
1.  ✅ v1.1 reader works and is deployed
2.  ⏳ First chapters and labs available for course start
3.  ⏳ Students can use the reader
4.  ⏳ Chapter editing workflow is stable
5.  ⏳ v2A paid-access pilot — Supabase + Stripe tested in test mode
6.  🔒 v2B learning features — after v2A is proven
```

---

## Simple Summary

| Horizon | Goal |
|---------|------|
| Now | Course reader deployed, ch01–ch04 available |
| Next | Source/content workflow stable |
| Summer | v2A: Supabase + Stripe pilot tested |
| Fall | Use paid access only after test-mode flow is proven |
