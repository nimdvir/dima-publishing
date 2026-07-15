<!-- metadata: date="2026-06-13"; type="edits"; chapter="11"; source="outline-audit" -->

# Ch11 Edit Notes

## 2026-07-14 — Core Concepts pagination, media repair, and production deployment

- [x] Created the dated Drive successor `ch11-main-2026-07-14.md`; preserved the prior draft.
- [x] Added canonical page-break boundaries and imported the corrected draft through the source-import workflow.
- [x] Generated exactly nine meaningful Core Concepts reader pages at `/book/ch11/core-concepts/1` through `/9`.
- [x] Repaired all 14 Chapter 11 figures by moving/renaming their Cloudinary assets into `Database-book-BITM330/ch11-database-administration/` and replacing the broken provisional URLs with verified delivery URLs.
- [x] Updated the Chapter 11 media ledger and figures index; all 14 final image URLs returned HTTP 200.
- [x] Completed the Chapter 11 final check with no blockers. `validate:access`, `generate`, `lint`, and `build` passed; only the existing Vite large-chunk warning remained.
- [x] Deployed the validated reader to Vercel production (`dima-media/dima-publishing`), deployment `dpl_43JsvcWqzhaiQnDAZQHzocH4iRSp`.
- [x] Confirmed the canonical live route: <https://dima-publishing.vercel.app/book/ch11/core-concepts/1>.
- [ ] Commit and push the scoped Chapter 11 changes separately after reviewing the repository's unrelated existing modifications.

## 2026-06-13 — Outline-to-chapter structural audit

*Compared `outline-2026-06-12.md` against GD draft `ch11-main-rewritten-2026-05-18.md` and dima-pub `core-concepts.md`. Content coverage matches — numbering convention differs between draft (11.1-11.4+ decimal) and source core-concepts (flat 1-5).*

- [x] Content verified: DBA fundamentals, core responsibilities (six pillars), concurrency control (locks, deadlocks), transactions and ACID, security (CIA triad), backup/recovery, performance monitoring, maintenance — all present in both GD and dima-pub
- [ ] **DECIDE:** Should dima-pub `core-concepts.md` use draft-style decimal numbering (11.1-11.4+) or keep simplified flat numbering (1-5)? If aligning, renumber source sections.
- [ ] Companion freshness: check latest dated files for Let's Build, Terms, Reflection, RAT

---

# Archive

*No archived entries yet.*
