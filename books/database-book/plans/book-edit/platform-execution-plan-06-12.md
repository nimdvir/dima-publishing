# Database Book Platform — Execution Plan

**Date:** 2026-06-12
**Status:** Active — operationalizes `book-plan-codex.md` and `06-locked-decisions.md`
**Role:** 1–2 week sprint execution plan. Does NOT replace canonical architectural documents.

## TL;DR

Two parallel tracks for summer 2026.

- **Track A**: Close v1.1 reader, deploy for course use, continue chapter editing safely.
- **Track B**: Build a v2A paid-access sandbox (Next.js + Supabase + Stripe) using the Claude pilot as a reference template — prove account → profile → roster → payment → access → protected reader.

---

## 1. Where We Are (2026-06-12)

### v1.1 Reader — ✅ Deployed
- All visual/motion work done (two-column hero, animated cover, page transitions, OTP highlighting)
- Favicon files present in `public/`
- Built, deployed to Vercel (`reader-hybrid-v11.vercel.app`), tagged `reader-v1.1-stable`

### Source Chapters
- ch01-04: Fully migrated to stable filenames (all 6 files: index.md, core-concepts.md, lets-build.md, review-questions.md, terms-treasury.md, rat.md)
- ch05-16: Chapter folders exist with varying content
- ch17: Has core-concepts.md, lets-build.md only
- `book.yml` + `chapter-registry.yml` exist
- `source-import-manifest.csv` created

### v2A — Claude pilot reference exists
- `platform-pilots/claude/` has Next.js 16.2.6 + React 19 + Supabase + Stripe:
  - Supabase Auth (email magic link), Postgres + RLS, Stripe Checkout + verified webhooks
  - **Use as reference/template, not unreviewed copy.**

---

## 2. The Plan: Two Parallel Tracks

```
                    ┌──────────────────────────────┐
                    │  platform-execution-plan      │
                    │  operationalizes codex +      │
                    │  locked-decisions             │
                    └──────────────┬───────────────┘
                                   │
            ┌──────────────────────┴──────────────────────┐
            ▼                                             ▼
   ┌─────────────────────┐                    ┌──────────────────────┐
   │ Track A: Course      │                    │ Track B: v2A Paid-   │
   │ Reader Stability     │                    │ Access Sandbox       │
   └──────────┬──────────┘                    └──────────┬───────────┘
              │                                         │
              ▼                                         ▼
   ┌─────────────────────┐                    ┌──────────────────────┐
   │ Deploy v1.1         │                    │ Prove paid-access    │
   │ Students can read   │                    │ flow with ch01-04    │
   │ ch01-04 + labs      │                    │ Stripe test mode ONLY│
   └─────────────────────┘                    └──────────────────────┘
```

### TRACK A — Course Reader Stability

**A1 — Verify, tag, and deploy v1.1** ✅ DONE
- Built, deployed on Vercel, tagged `reader-v1.1-stable`

**A2 — Ensure ch01-04 + Labs 01-04 are student-ready**
- Verify all 4 chapters render correctly in the deployed reader
- Verify all 4 labs are accessible and complete
- No answer files exposed
- "Coming Soon" placeholder for chapters 5-17

**A3 — Continue chapter editing and migration safely**
- Import ch05-17 from Google Drive drafts as needed
- Use stable filenames per locked decisions
- NEVER import lab answer files
- Full ch05-17 migration is NOT a blocker for Track B

### TRACK B — v2A Paid-Access Sandbox

**B1 — Scaffold v2A from Claude pilot as reference template**
- Create `platform-pilots/reader-hybrid-v2/` using Claude pilot as starting template
- Audit before adopting: Next.js version, Supabase versions, webhook behavior, RLS, service-role isolation
- Set up `.env.example` with all required vars (test keys only)

**B2 — Supabase schema: 5 tables**
| Table | Purpose |
|---|---|
| `course_roster` | Student enrollment (student_id, net_id, email, full_name, section, course_key, status) |
| `profiles` | User profile (user_id, email, full_name, student_id, net_id, role) |
| `purchases` | Stripe checkout audit log |
| `access_grants` | Who can read the protected book (unique per user+product) |
| `processed_stripe_events` | Webhook idempotency (service-role only) |

- RLS on all tables. Users read only own rows. Service role writes access_grants + purchases.
- **No `notes` table** — belongs in v2B.

**B3 — Supabase Auth + profile form + roster upload**
- Email magic link + email/password auth
- `/register` and `/account` with profile fields
- Roster CSV upload/import — verify enrollment eligibility
- NetID is profile verification, NOT institutional SSO

**B4 — Stripe Checkout test mode + verified webhook**
- Stripe test mode ONLY (pk_test_, sk_test_, whsec_test_)
- Product + price: `database-book-2026`
- Webhook flow: verify signature → idempotency → record purchase → create access_grant
- Browser NEVER grants access directly

**B5 — Protected reader with ch01-04**
- Port reader UI from v1.1 to Next.js App Router
- Per-chapter JSON loading (ch01-04 first)
- Protected chapters load server-side only via `hasBookAccess()`
- Routes: `/`, `/preview`, `/book`, `/login`, `/register`, `/account`, `/access`

**B6 — End-to-end validation (10 test cases)**
1. Logged-out → landing page + preview only
2. Logged-out → cannot access `/book`
3. Logged-in unpaid → cannot access `/book`
4. Stripe test purchase completes
5. Verified webhook records purchase
6. Webhook creates active access_grant
7. Paid student → can open `/book`
8. Refresh preserves access
9. Duplicate webhook = idempotent
10. Refund/revocation path works

---

## 3. Guardrails

### What v2A IS
- Prove: account → profile → roster → payment → access → protected reader
- Stripe test mode ONLY
- ch01-04 content only
- Separate app from v1.1 — zero risk to the student reader

### What v2A is NOT
- NOT live with real student payments
- NOT full 17-chapter reader
- NOT including notes, progress, search, or AI Assistant (v2B)
- NOT replacing v1.1 as the course reader

### Stripe safety rule
```
Stripe test mode only until ALL of:
  - webhook signature verification works
  - idempotency prevents duplicate grants
  - RLS prevents cross-user data access
  - protected reader correctly gates server-side
  - refund/revocation path is tested
No pk_live_ / sk_live_ keys until then.
```

---

## 4. Reference: Key Decisions

- **Stable filenames**: index.md, core-concepts.md, lets-build.md, review-questions.md, terms-treasury.md, rat.md
- **Reader area label**: "Core Concepts" (never "Main Concepts")
- **v1.1 stack**: React 18 + Vite 5 + plain CSS + motion
- **v2A stack**: Next.js App Router + TypeScript + Supabase Auth + Stripe Checkout
- **NetID**: Profile verification field only — not institutional SSO

---

## 5. Reference: Existing Assets

| Asset | Location | Use for |
|---|---|---|
| Claude pilot (v2A reference) | `platform-pilots/claude/` | B1 — template to audit/adapt |
| v1.1 reader (visual ref) | `platform-pilots/reader-hybrid-v1.1/` | B5 — port reader UI |
| book.yml | `books/database-book/book.yml` | Chapter metadata |
| chapter-registry.yml | `files/source/outline/chapter-registry.yml` | Folder mappings |
| Supabase migration | `claude/supabase/migrations/0001_init.sql` | B2 — reference (needs roster) |
| Stripe + access libs | `claude/src/lib/stripe.ts`, `access.ts` | B4-B5 — server patterns |

---

## 6. Verification Checklist

### Track A
- [x] `npm run generate && npm run lint && npm run build` pass
- [ ] Visual QA passed (hero, reader, mobile, OTP)
- [x] v1.1 deployed on Vercel
- [ ] Sidebar and page labels correct
- [ ] ch01-04 + Labs 01-04 student-ready
- [x] Git tag `reader-v1.1-stable` pushed

### Track B
- [ ] Supabase project running with 5 tables + RLS
- [ ] Roster CSV upload/import working
- [ ] Supabase Auth working (email magic link + profile form)
- [ ] Stripe test checkout completes end-to-end
- [ ] Verified webhook creates access grant
- [ ] Protected reader gates server-side
- [ ] All 10 validation test cases pass
- [ ] Stripe still in test mode — no live keys deployed
