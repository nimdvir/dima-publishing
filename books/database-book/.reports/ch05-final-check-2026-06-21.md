# Chapter 5 Final Check — 2026-06-21

## Scope

| Component | File | Status |
|---|---|---|
| Chapter Index | `ch05-sql/index.md` | found |
| Core Concepts | `ch05-sql/core-concepts.md` | found |
| Let's Build | `ch05-sql/lets-build.md` | found |
| Terms Treasury | `ch05-sql/terms-treasury.md` | found |
| Review & Reflection | `ch05-sql/review-questions.md` | found |
| RAT | `ch05-sql/rat.md` | found |
| Lab | `labs/lab-05-sql/index.md` | found |
| Reports folder | `.reports/` | found |
| Edit notes | `.edits/ch05-edits.md` | missing |
| Image manifest | `files/manifests/image-manifest.csv` | n/a |

## Executive Summary

- **Overall status:** READY_WITH_WARNINGS
- **Main blocker:** Companion staleness — RAT (2026-05-19) and Reflection (2026-05-27) are 1–2 months behind more recent GD drafts.
- **Import readiness:** Ready (with warnings)
- **Deploy readiness:** Blocked (import not completed)
- **Recommended next step:** `chapter-source-import ch05` to pull newer GD companions

## Package Inventory

| Component | Expected Path | Status | Notes |
|---|---|---|---|
| Chapter index | `ch05-sql/index.md` | found | Navigation, video embed, roadmap |
| Core concepts | `ch05-sql/core-concepts.md` | found | Imported from ch05-main-2026-06-17.md |
| Let's Build | `ch05-sql/lets-build.md` | found | Imported from ch05-lets-build-2026-06-17.md |
| Terms Treasury | `ch05-sql/terms-treasury.md` | found | Imported from ch05-terms-2026-06-16.md |
| Review & Reflection | `ch05-sql/review-questions.md` | found | Imported from ch05-reflection-2026-05-27.md |
| RAT | `ch05-sql/rat.md` | found | Imported from ch05-rat-2026-05-19.md |
| Lab | `labs/lab-05-sql/index.md` | found | SQLite, PetVax, two-part (quiz + SQL file) |
| Edit notes | `.edits/ch05-edits.md` | **missing** | No repo-side edit tracking for this chapter |

## Safety Scan

| Issue Type | Count | Severity | Notes |
|---|---:|---|---|
| Unresolved author comments | 0 | pass | No TODO/FIXME/TBD/TK/XXX found in sampled content |
| Raw local paths | 0 | pass | All image paths are Cloudinary URLs |
| Answer exposure risks | 0 | pass | Lab answers in `instructor/lab-05-answers-2026-06-03.md`, marked "Do not distribute" |
| Visible answer keys in student-facing files | 0 | pass | RAT answer key placed in designated section; reflection answer key clearly separated |
| Broken or suspicious local links | 0 | pass | Cross-references to chapters use relative anchors |
| Allowed figure-suggestion comments | present | info | HTML comment figure suggestions found in core-concepts |

## Main Chapter Check

| Check | Status | Notes |
|---|---|---|
| Clear chapter arc | pass | SQL foundations → dataset → DDL/DML → SELECT → joins → aggregation |
| Learning objectives present | pass | Yes, in index.md roadmap |
| Heading hierarchy valid | pass | Part → subsection structure consistent |
| Core concepts coherent | pass | 6 parts, progressive from simple SELECT to aggregation |
| Callouts valid | pass | Canonical HTML callout format observed (key-takeaway, info) |
| Examples support student learning | pass | Grading Database examples throughout |
| Visual pedagogy adequate | pass | Multiple Cloudinary figures with captions |
| Summary present and useful | pass | Chapter Summary section confirmed |

## Companion Alignment

| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Let's Build | pass | Uses Grading Database, SQLite, prepares for Lab 05 | Accept |
| Lab | pass | PetVax scenario, two-part grading, answers in instructor/ | Accept |
| Terms Treasury | pass | 22 terms with definitions, business significance, examples; acronyms table | Accept |
| Review & Reflection | warning | Repo version from 2026-05-27; GD has 2026-06-21 version | Import newer GD version via `chapter-source-import` |
| RAT | warning | Repo version from 2026-05-19; GD has 2026-06-21 version | Import newer GD version via `chapter-source-import` |

## Media and Figures

| Check | Status | Notes |
|---|---|---|
| All required images in place | pass | Cloudinary-hosted images throughout |
| No raw local image paths | pass | All URLs are cloudinary.com |
| Instructional figures captioned | pass | Captions present with figure numbers |
| Alt text adequate | pass | Alt text on section icons and figures |
| Decorative images not numbered | pass | Section icons (Core Concepts, Let's Build, etc.) unnumbered |
| Figure suggestion comments resolved or documented | pass | HTML comment suggestions present; consistent with production notes |
| Image manifest / ledger current | n/a | No chapter-specific manifest |

## Figure Table

| Figure | File | Placement | Alt Text | Caption | Source / URL | Status |
|---|---|---|---|---|---|---|
| 5.3 | ch05-before-after-query | Part 1 | Descriptive | Before-and-After Query View | Cloudinary | ok |
| 5.4 | ch05-sql-in-app-stack | Part 1 | Descriptive | SQL in the Application Stack | Cloudinary | ok |
| 5.5 | ch05-declarative-vs-imperative | Part 1 | Descriptive | Declarative vs. Imperative Query Execution | Cloudinary | ok |
| 5.6 | ch05-sql-query-pipeline | Part 1 | Descriptive | The SQL Query Pipeline | Cloudinary | ok |
| Section icons | ch00-* | Various | Named | Decorative | Cloudinary | ok |

## Outline Coverage

Compared against `plans/outline/outline-2026-06-12.md`.

| Outline Item | Status | Current Location | Notes |
|---|---|---|---|
| Part 1: SQL Foundations and Tools | covered | core-concepts.md §Part 1 | All subsections present |
| Part 2: The Chapter 5 Teaching Dataset | covered | core-concepts.md §Part 2 | GRADEBOOK + GRADE_WEIGHT |
| Part 3: Creating Tables and Inserting Data | covered | core-concepts.md §Part 3 | DDL/DML covered |
| Part 4: Querying Data with SELECT | covered | core-concepts.md §Part 4 | SELECT/FROM/WHERE/ORDER BY |
| Part 5: A First Look at Joins | covered | core-concepts.md §Part 5 | INNER JOIN teaser |
| Part 6: Aggregation, Grouping, and Calculated Results | covered | core-concepts.md §Part 6 | GROUP BY/HAVING/CASE |
| Appendix: Grading Database | covered | core-concepts.md | Application appendix |
| Chapter Summary | covered | core-concepts.md | Present |

## Word Count

| Component | File | Words | Included in Package Total? | Notes |
|---|---:|---|---|---|
| Chapter Index | `index.md` | 275 | yes | navigation |
| Core Concepts | `core-concepts.md` | 4,656 | yes | main chapter |
| Let's Build | `lets-build.md` | 1,810 | yes | companion |
| Terms Treasury | `terms-treasury.md` | 1,165 | yes | companion |
| Review & Reflection | `review-questions.md` | 3,105 | yes | companion (includes answer key) |
| RAT | `rat.md` | 3,635 | yes | companion (includes answer key) |
| Lab | `labs/lab-05-sql/index.md` | 1,488 | yes | student-facing only |
| **Total** | | **16,134** | | |

## DOCX Readiness

| Check | Status | Notes |
|---|---|---|
| Required files present | ready | All 5 sections + index |
| Answer files excluded | ready | Lab answers in instructor/; RAT/reflection answer keys are part of companion files (by design) |
| Images reachable | ready | All Cloudinary URLs |
| Reference DOCX available | needs-review | Not verified |
| Build command assumptions clear | ready | Pandoc with reference docx |
| Recommended next command | `chapter-docx-build ch05` | |

## Import Readiness

| Check | Status | Notes |
|---|---|---|
| Main chapter ready | ready | Passes all checks |
| Companions ready | warning | RAT (05-19) and Reflection (05-27) have newer GD versions |
| Lab ready | ready | Answers safely in instructor/ |
| Media ready | ready | All Cloudinary, no raw paths |
| No answer exposure risks | ready | Confirmed |
| No unresolved blockers | ready | |
| Recommended next command | `chapter-source-import ch05` | Pull 06-21 RAT and reflection from GD |

## Deploy Readiness

| Check | Status | Notes |
|---|---|---|
| Import completed or ready | blocked | Import not yet run |
| Build output ready | deferred | DOCX not yet built |
| No publication blockers | blocked | Import required first |
| Recommended next command | `book-deploy` — only after import and DOCX build | |

## Unresolved Items

- [ ] RAT is stale (repo: 2026-05-19, GD: 2026-06-21)
- [ ] Reflection is stale (repo: 2026-05-27, GD: 2026-06-21)
- [ ] No `ch05-edits.md` in repo `.edits/` — consider creating one for tracking
- [ ] GD has newer main (06-19) and lets-build (06-19) — evaluate whether to import

## Recommended Commands

| Goal | Command | Run Now? |
|---|---|---|
| Import newer GD companions | `chapter-source-import ch05` | yes |
| Create edit tracking | `edits ch05` | yes |
| Build DOCX | `chapter-docx-build ch05` | after import |
| Deploy | `book-deploy` | only after explicit approval |

## Readiness Verdict

**Overall status:** READY_WITH_WARNINGS

**Main reason:** Core package is solid — all 5 sections present, lab safe, media clean. RAT and Reflection are 1–2 months behind GD drafts. No blocking issues for DOCX build.

**Recommended next step:** `chapter-source-import ch05` to pull newer RAT and Reflection from Google Drive, then `chapter-docx-build ch05`.
