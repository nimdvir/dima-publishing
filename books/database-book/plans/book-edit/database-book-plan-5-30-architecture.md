# Database Book Paid Platform — Architecture & Build Companion

Companion to [database-book-plan-5-30.md](database-book-plan-5-30.md). The original is a
requirements document (the *what*). This file adds the architecture decisions, the security
boundary, the Stripe webhook flow, and an executable MVP-0 build sequence (the *how*).

Canonical build location: `dima-publishing/books/database-book/` with `source/` (book content)
and `platform/` (Next.js app) kept separate.

---

## 0. Architecture Decisions (resolve before building)

- **Canonical home:** `dima-publishing/books/database-book/`. Keep `source/` and `platform/` separate.
- **Static vs dynamic:** The earlier static HTML reader concept becomes ONLY the public
  `/preview` tier. The Next.js app is the real paid product. Reconcile or archive the stale
  static-reader `books/database-book/PLAN.md` and the legacy `BITM330-book-drive/book-platform/`.
- **Security boundary = Supabase RLS.** Paid-content gating and private-notes isolation are
  enforced by Postgres Row-Level Security plus server-side route checks, NEVER client-side.
- **Secrets stay server-side.** Stripe secret keys, price IDs, and access checks live in server
  route handlers / server components only.
- **Stack:** Next.js (App Router) + Supabase (Postgres/Auth) + Stripe Checkout + Cloudinary
  (images/audio) + YouTube (video) + Vercel hosting. Tailwind + shadcn/ui.

## 1. Source-to-reader mapping (fixes original §5)

- Real manuscripts use dated multi-part files: `chNN-main-YYYY-MM-DD.md` plus `lets-build/`,
  `terms/`, `reflection/`, `rat/`, `lab/`. They are NOT `index.md`.
- Build step must: (a) resolve the most-recent dated file per part by filename date,
  (b) select which parts feed the reader (MVP: `main` only), (c) rewrite image links to
  Cloudinary delivery URLs.
- Add `source/book.yaml` (chapter order + slugs + preview flag) and per-chapter front matter.

## 2. Data model + RLS (expands original §24)

Core MVP tables: `users` (Supabase auth), `access_grants`, `purchases`, `notes`, `progress`.

- `access_grants(user_id, product_id, status, start_date, end_date, stripe_customer_id, stripe_session_id)`
- RLS rules to specify explicitly:
  - `notes`: user can SELECT/INSERT/UPDATE/DELETE only `where user_id = auth.uid()`.
    Instructors have NO read path to private notes (no policy grants it).
  - `access_grants`: user reads only own row; only the service role (webhook) writes.
  - Paid chapter content served only when an active grant exists for `auth.uid()`.
- StudentID: do NOT store in MVP (not needed for login -> pay -> read). If later required,
  restricted column + encryption-at-rest, never as a credential.

## 3. Stripe flow (expands original §4, SEC-05)

- One Product, Prices per access model (`one_time` = mode `payment`; `semester` = dated
  one-time or subscription later). Price IDs stored server-side only.
- Server creates the Checkout Session with success/cancel URLs; access granted ONLY after the
  webhook confirms payment.
- Webhook handler must be **idempotent** (dedupe on Stripe event id) and **signature-verified**;
  it writes `access_grants.status` via the service role.
- Use Stripe test mode for all dev; never expose secret keys to the client.

## 4. Phased build (replaces single large MVP in original §32)

### MVP-0 — Prove the core loop (build first)

login -> Stripe checkout -> webhook grants access -> read RLS-gated Markdown chapter
-> collapsible sidebar nav -> bottom prev/next nav. No notes UI, no admin UI
(grant/revoke via SQL). Public `/preview/[chapter]` for one sample chapter.

### MVP-1 — Reader experience

Notes (CRUD, private by default, RLS-enforced), resume-last-location, admin grant/revoke UI,
media embeds (Cloudinary image, YouTube, audio + transcript), accessibility pass (WCAG 2.2 AA
on own UI; vendor widgets verified separately).

### Phase 2+ — Same as original §33 (bookmarks, progress, search, checkpoints, glossary;
then instructor layer; then LTI; then advanced).

## 5. Corrections to original requirements

- **Search (§12):** Pagefind is static-only — use it ONLY for the public preview. Gated
  chapters use Supabase Postgres full-text search.
- **Audio (§13/14):** verify the Cloudinary plan allows audio delivery + bandwidth before
  committing MED-04; otherwise use object storage.
- **Accessibility (A11Y-12/14):** Stripe Checkout + YouTube accessibility are vendor-owned;
  audit scope is your own UI. Note vendor components as separately verified.

---

## Verification

1. MVP-0: an unpaid user is server-side blocked from `/book/[chapter]`; a paid user reads it.
2. RLS test: user A cannot read user B's notes via direct API/SQL.
3. Stripe test-mode purchase flips `access_grants.status` exactly once on duplicate webhooks.
4. Build resolves the correct most-recent dated `main` file per chapter.
5. WCAG 2.2 AA automated + keyboard pass on own UI (reader, nav, login, notes).

## Scope

- MVP-0 includes: auth, payment, gating, reader, nav, one preview chapter.
- MVP-0 excludes: notes UI, admin UI, search, instructor analytics, LTI, AI, SQL sandbox.
- StudentID storage excluded from MVP entirely.
