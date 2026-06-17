# Database Book Next Moves

**Date:** 2026-06-17  
**Project:** `books/database-book/`  
**Primary deployment:** `https://data-pilot.dimapublishing.com/`  
**Purpose:** Simple current-action plan after reviewing the active book-edit plans.

## Source Plans Considered

- `README.md`
- `SUMMARY.md`
- `simple-platform-plan-v2a-next-steps-6-12.md`
- `simplified-plan-gpt-06-12.md`
- `v2a-setup-06-12.md`
- `database-book-simple-master-plan-2026-06-16.md`
- `database-book-master-plan-updated-with-new-files-2026-06-16.md`

## Main Decision

Use a two-track strategy:

| Track | Purpose | Current action |
|---|---|---|
| Track A: Course Reader | Keep the current reader stable for students. | Use `reader-hybrid-v1.1` and `data-pilot.dimapublishing.com`. |
| Track B: Clean Paid Platform Pilot | Prove login, payment, webhook, and access control without touching v1.1. | Create a clean `reader-hybrid-v2/` pilot and deploy it separately. |

Do not turn the deployed v1.1 reader into the paid platform. Keep v1.1 frontend-only. Keep Supabase, Stripe, real auth, progress, notes, and paid routes out of it.

## Current Read

- `data-pilot.dimapublishing.com` is the student-facing v1.1 reader deployment.
- `reader-hybrid-v1.1` is the active course reader, not the Next/Supabase/Stripe app.
- `reader-hybrid-v1.1` TypeScript lint passed during the 2026-06-17 inspection.
- The generated v1.1 reader currently includes front matter, chapters 1-10, and labs 1-10.
- Known generated placeholders are `ch05` introduction, `ch08` review questions, and `ch08` RAT.
- The source repository now has the stable source contract and `source-import-manifest.csv`.
- The repo still contains tracked lab instructor answer files under `files/source/labs/**/instructor/`; this conflicts with the launch rule that answer files should not be exposed.
- `platform-pilots/claude/` is an older Next.js/Supabase/Stripe reference app, not the platform the user is currently using.
- The v2A setup docs say the immediate schema is 4 tables, but the Claude migration should be audited before reuse because related progress/notes traces may still be present.
- The preferred path is a clean new pilot and clean new deployment before anything is moved toward the main/student-facing reader.

## Do Now

1. Course launch cleanup
   - Fix the three generated placeholders.
   - QA the deployed reader on desktop and mobile.
   - Verify chapters 1-10 and labs 1-10 render clearly.
   - Confirm no AI Assistant route is exposed.
   - Confirm no lab answer files are exposed in the public reader.
   - Decide whether chapters 11-17 stay hidden/coming-soon for now or whether the v1.1 generator should expand beyond chapter 10.

2. Source workflow hardening
   - Treat Git as the working source of truth.
   - Use `files/manifests/source-import-manifest.csv` as the migration ledger.
   - Move active chapter work toward stable filenames:
     - `index.md`
     - `core-concepts.md`
     - `lets-build.md`
     - `review-questions.md`
     - `terms-treasury.md`
     - `rat.md`
   - Keep dated Markdown files as historical inputs only, not active working files.
   - Confirm or create `files/manifests/build-manifest.json` for formal reader builds.
   - Review the dirty working tree before platform edits, especially current ch07/ch08 sync changes and untracked plan files.

3. Clean v2A pilot setup
   - Create a clean `books/database-book/platform-pilots/reader-hybrid-v2/` app for the paid-access pilot.
   - Treat `books/database-book/platform-pilots/claude/` as reference code only, not the destination app.
   - Use only audited pieces from `claude`: Supabase auth pattern, Stripe Checkout route, signed webhook route, access grant logic, and migration concepts.
   - Give the clean pilot its own Vercel project and preview URL.
   - Do not replace `data-pilot.dimapublishing.com` with v2A.
   - Audit the Supabase migration before applying it.
   - Align the migration and docs: either keep a strict 4-table v2A schema or explicitly document any added table.
   - Use Stripe test mode only.
   - Prove checkout, signed webhook, access grant creation, duplicate webhook handling, and service-role isolation before considering live payment work.

4. Chapter visual workflow
   - Treat visual/media work as an approval-gated chapter-production subworkflow, not a platform phase.
   - It is acceptable to standardize image references already present in a chapter file.
   - Require explicit approval before scanning image folders, inserting new visuals, copying images, optimizing files, renaming files, converting formats, or creating production reports.
   - Preserve PNG for diagrams, ERDs, screenshots, and text-heavy visuals; use JPG mainly for photos or photographic/gradient-heavy images.

## Defer

- Do not start v2B learning features yet.
- Do not add notes, persistent progress, protected search, submissions, dashboards, LMS integration, or AI Assistant to v1.1.
- Do not use live Stripe keys or charge real students until the complete v2A test-mode flow passes.
- Do not move the clean v2A pilot to the main/student-facing deployment until the separate deployment passes the full checklist.

## Test Plan

For v1.1:

```powershell
cd books/database-book/platform-pilots/reader-hybrid-v1.1
npm run generate
npm run lint
npm run build
```

Then manually verify:

- Home page loads.
- Book reader loads.
- Labs page loads.
- Demo access/login works as expected.
- "Core Concepts" is the visible label.
- "On this page" works.
- Mobile layout has no horizontal overflow.
- Placeholder behavior is intentional and clear.
- Public reader output does not expose answer files.

For the clean v2A pilot:

```powershell
cd books/database-book/platform-pilots/reader-hybrid-v2
npm run lint
npm run build
```

Then test only in test mode:

- Logged-out visitor can view the preview chapter.
- Logged-out visitor cannot access protected chapters.
- Signed-in unpaid user sees locked UI.
- Stripe test checkout succeeds.
- Signed webhook creates `access_grants`.
- Duplicate webhook does not duplicate grants.
- Paid user can access protected content.
- Service-role key never reaches browser code.

## Working Assumptions

- The immediate priority is a reliable course reader, not paid access.
- `reader-hybrid-v1.1` remains the student-facing deployment.
- `platform-pilots/claude/` is a reference implementation only.
- `reader-hybrid-v2/` is the clean paid-access pilot target and should have its own deployment before any main-reader move.
- The newer June 16 plans supersede older broad platform plans where they conflict, but the live repo state still needs to be verified before acting on any checklist.

## One-Sentence Strategy

Use v1.1 to teach the course now, enforce the stable Git-based source workflow, treat visual production as approval-gated, and build a clean separately deployed v2 pilot using only audited lessons from the Claude reference app.
