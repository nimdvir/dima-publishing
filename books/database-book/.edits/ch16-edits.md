<!-- metadata: date="2026-06-13"; type="edits"; chapter="16"; source="outline-audit" -->

# Ch16 Edit Notes

## 2026-07-20 — Import revised main draft, convert separators to page breaks

- **Source:** `G:\...\ch16-final-review\main\ch16-main-revised-2026-07-20.md` (1979 lines)
- **Archived:** Previous content retained in `.archive/2026-07-20/core-concepts.md`; upstream also retains `archive/core-concepts-old.md`
- **Conversion:** 44 `---` section separators → `<!-- PAGE BREAK -->` + `<div>` page breaks
- **Generate:** 18 chapters, 120 sections, 317 pages, 0 warnings
- **Lint:** Passed (`tsc --noEmit`)
- **Build:** Vite production build succeeded (2520 modules, 7.42s)
- **GitHub:** Revised Chapter 16 commits confirmed on `origin/main`.
- **Deploy:** Local preview/build confirmed in preserved notes; production deployment was not re-verified during consolidation.
- **Next:** Review production status before any new deploy.

---

## 2026-06-13 — Outline-to-chapter structural audit

*Compared `outline-2026-06-12.md` against GD draft `ch16-main-draft-2026-05-18.md` and dima-pub `core-concepts.md`. Main file appears incomplete (stops at 16.3 of 16.11 expected). GD companion files scattered across wrong chapter folders.*

### Main file completeness

- [x] 16.1-16.3: Final Integration Point, Project Overview, Final Project Tasks (13 tasks) — present
- [x] 16.4-16.11+: ~~Project SQL Guidance, Final Test Overview, Publication Scoring Logic, Core Test Queries, Test Question Map, Study Strategy, Submission Checklist, Final Reflection~~ — **confirmed** (2026-07-20 revised draft covers 16.1–16.20+, 1979 lines, 40 sections)

### GD companion file organization

- [ ] `ch16-lets-build-2026-05-19.md` found in GD ch13 folder — move to ch16
- [ ] Companion files for terms/reflection/rat appear in ch15 folders — verify ownership and move to ch16 if they belong here
- [ ] **MISSING from dima-pub:** `terms-treasury.md`, `review-questions.md`, `rat.md`

### Actions

- [ ] **VERIFY:** Read GD main file beyond 16.3 — does content continue or is file actually truncated?
- [ ] **ORGANIZE:** Sort GD companion files into correct ch16 folders
- [ ] Import missing companions to dima-pub once located

---

# Archive

*No archived entries yet.*
