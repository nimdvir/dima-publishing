# Chapter 6 Final Check — 2026-06-21

## Scope

| Component | File | Status |
|---|---|---|
| Chapter Index | `ch06-relational-model/index.md` | found |
| Core Concepts | `ch06-relational-model/ch06-main-2026-06-17.md` | found (dated only) |
| Let's Build | `ch06-relational-model/ch06-lets-build-2026-06-17.md` | found (dated only) |
| Terms Treasury | `ch06-relational-model/ch06-terms-2026-06-16.md` | found (dated only) |
| Review & Reflection | `ch06-relational-model/ch06-reflection-2026-06-19.md` | found (dated only) |
| RAT | `ch06-relational-model/ch06-rat-2026-05-19.md` | found (dated only) |
| Lab | `labs/lab-06-relational-model/index.md` | found |
| Reports folder | `.reports/` | found |
| Edit notes | `.edits/ch06-edits.md` | found (3 unchecked items) |
| Image manifest | `files/manifests/image-manifest.csv` | n/a |

## Executive Summary

- **Overall status:** NEEDS_FIXES
- **Main blocker:** No stable flat filenames — all source files use dated filenames (`ch06-main-2026-06-17.md` instead of `core-concepts.md`). This breaks the canonical source model and will cause DOCX build and import tooling issues.
- **Import readiness:** Blocked (filename migration needed first)
- **Deploy readiness:** Blocked
- **Recommended next step:** Rename files to stable flat names, then verify remaining edit items

## Package Inventory

| Component | Expected Path | Status | Notes |
|---|---|---|---|
| Chapter index | `ch06-relational-model/index.md` | found | Navigation, video embed, roadmap |
| Core concepts | `ch06-relational-model/core-concepts.md` | **missing** | Dated file exists: `ch06-main-2026-06-17.md` |
| Let's Build | `ch06-relational-model/lets-build.md` | **missing** | Dated file exists: `ch06-lets-build-2026-06-17.md` |
| Terms Treasury | `ch06-relational-model/terms-treasury.md` | **missing** | Dated file exists: `ch06-terms-2026-06-16.md` |
| Review & Reflection | `ch06-relational-model/review-questions.md` | **missing** | Dated file exists: `ch06-reflection-2026-06-19.md` |
| RAT | `ch06-relational-model/rat.md` | **missing** | Dated file exists: `ch06-rat-2026-05-19.md` |
| Lab | `labs/lab-06-relational-model/index.md` | found | Access-based, PetVax, 6 tables |
| Edit notes | `.edits/ch06-edits.md` | found | 3 unchecked verification items from 2026-06-13 audit |

## Safety Scan

| Issue Type | Count | Severity | Notes |
|---|---:|---|---|
| Unresolved author comments | 0 | pass | HTML comment edit history present but resolved |
| Raw local paths | 0 | pass | All image paths are Cloudinary URLs |
| Answer exposure risks | 0 | pass | Lab answers in `instructor/lab-06-answers-2026-05-24.md`, marked "Do not distribute" |
| Visible answer keys in student-facing files | 0 | pass | RAT answer key in designated section |
| Broken or suspicious local links | 0 | pass | Cross-references verified |
| Allowed figure-suggestion comments | present | info | Edit-history HTML comments present |

## Main Chapter Check

| Check | Status | Notes |
|---|---|---|
| Clear chapter arc | pass | Flat-table failure → relational model → entities → keys → integrity → redesign → joins → Access → FDs |
| Learning objectives present | pass | 8 learning objectives listed |
| Heading hierarchy valid | pass | H1 chapter, H2 sections, H3 subsections |
| Core concepts coherent | pass | 10-section structure matches outline |
| Callouts valid | pass | Converted to canonical HTML format (2026-06-17 edit) |
| Examples support student learning | pass | Grading Database 7-table redesign walkthrough |
| Visual pedagogy adequate | pass | Cloudinary images with captions |
| Summary present and useful | pass | Chapter Summary section |
| Cross-chapter signposting | pass | References Ch4, Ch5, bridges to Ch7 |

## Companion Alignment

| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Let's Build | pass | Uses Grading Database, Access, 7-table build; prepares for Lab 06 | Accept |
| Lab | pass | PetVax, Access, 6 tables + 5 relationships + 3 payoff queries; answers in instructor/ | Accept |
| Terms Treasury | pass | 23 terms with definitions, business significance, examples; acronyms table | Accept |
| Review & Reflection | warning | Repo version 2026-06-19; GD has 2026-06-21 version | Import newer GD version |
| RAT | warning | Repo version 2026-05-19; GD has 2026-06-21 version | Import newer GD version |

## Media and Figures

| Check | Status | Notes |
|---|---|---|
| All required images in place | pass | Cloudinary-hosted throughout |
| No raw local image paths | pass | All URLs are cloudinary.com |
| Instructional figures captioned | pass | Captions present |
| Alt text adequate | pass | Alt text on images |
| Decorative images not numbered | pass | Section icons unnumbered |
| Figure suggestion comments resolved or documented | pass | Edit-history HTML comments retained as documentation |
| Image manifest / ledger current | n/a | No chapter-specific manifest |

## Figure Table

| Figure | File | Placement | Alt Text | Caption | Source / URL | Status |
|---|---|---|---|---|---|---|
| Section icons | ch00-* | Various | Named | Decorative | Cloudinary | ok |
| Content figures | ch06-* | Throughout | Descriptive | Numbered | Cloudinary | ok |

## Outline Coverage

Compared against `plans/outline/outline-2026-06-12.md`.

| Outline Item | Status | Current Location | Notes |
|---|---|---|---|
| §1: Why One Big Table Fails | covered | ch06-main §1 | 1.1-1.6 all present |
| §2: What the Relational Model Does Differently | covered | ch06-main §2 | 2.1-2.5 all present |
| §3: Entities, Attributes, Relationships | covered | ch06-main §3 | 3.1-3.5 all present |
| §4: Keys | covered | ch06-main §4 | Candidate, primary, composite, natural, surrogate |
| §5: Foreign Keys and Relationship Types | covered | ch06-main §5 | 1:1, 1:M, M:N |
| §6: Integrity Rules | covered | ch06-main §6 | Entity + referential integrity |
| §7: Redesigning the Grading Database | covered | ch06-main §7 | 7-table schema |
| §8: Querying with Joins | covered | ch06-main §8 | INNER/LEFT/RIGHT/FULL/CROSS |
| §9: Microsoft Access as Visual Learning Tool | covered | ch06-main §9 | Hands-on tutorial |
| §10: Functional Dependencies | covered | ch06-main §10 | Bridge to Ch7 |
| Key Concepts, Summary, References | covered | ch06-main | End matter present |

## Word Count

| Component | File | Words | Included in Package Total? | Notes |
|---|---:|---|---|---|
| Chapter Index | `index.md` | 236 | yes | navigation |
| Core Concepts | `ch06-main-2026-06-17.md` | 4,268 | yes | main chapter |
| Let's Build | `ch06-lets-build-2026-06-17.md` | 2,423 | yes | companion |
| Terms Treasury | `ch06-terms-2026-06-16.md` | 974 | yes | companion |
| Review & Reflection | `ch06-reflection-2026-06-19.md` | 1,738 | yes | companion (includes answer key) |
| RAT | `ch06-rat-2026-05-19.md` | 2,037 | yes | companion (includes answer key) |
| Lab | `labs/lab-06-relational-model/index.md` | 847 | yes | student-facing only |
| **Total** | | **12,523** | | |

## DOCX Readiness

| Check | Status | Notes |
|---|---|---|
| Required files present | **blocked** | Files exist but use dated filenames — Pandoc build script expects stable flat names (`core-concepts.md`, `lets-build.md`, etc.) |
| Answer files excluded | ready | Lab answers in instructor/ |
| Images reachable | ready | All Cloudinary URLs |
| Reference DOCX available | needs-review | Not verified |
| Build command assumptions clear | blocked | Filename mismatch will cause build failure |
| Recommended next command | **Rename files first, then** `chapter-docx-build ch06` | |

## Import Readiness

| Check | Status | Notes |
|---|---|---|
| Main chapter ready | warning | Content ready but filename not in canonical form |
| Companions ready | warning | RAT (05-19) stale; reflection (06-19) slightly behind GD (06-21) |
| Lab ready | ready | Answers safely in instructor/ |
| Media ready | ready | All Cloudinary, no raw paths |
| No answer exposure risks | ready | Confirmed |
| No unresolved blockers | **blocked** | 3 unchecked edits in ch06-edits.md; filename migration needed |
| Recommended next command | Fix filenames, then `chapter-source-import ch06` | |

## Deploy Readiness

| Check | Status | Notes |
|---|---|---|
| Import completed or ready | **blocked** | Filename migration + import needed |
| Build output ready | deferred | DOCX not yet built |
| No publication blockers | **blocked** | Multiple blockers |
| Recommended next command | `book-deploy` — only after all blockers resolved | |

## Unresolved Items

- [ ] **BLOCKER:** No stable flat filenames — rename `ch06-main-2026-06-17.md` → `core-concepts.md`, `ch06-lets-build-2026-06-17.md` → `lets-build.md`, etc.
- [ ] **BLOCKER:** 3 unchecked verification items in `ch06-edits.md` (sections 4-10, end sections, companion freshness)
- [ ] RAT is stale (repo: 2026-05-19, GD: 2026-06-21)
- [ ] GD has newer main (06-19), lets-build (06-19), terms (06-19), reflection (06-21), rat (06-21)

## Recommended Commands

| Goal | Command | Run Now? |
|---|---|---|
| Migrate to stable filenames | Manual rename or `chapter-source-import ch06` | **yes — blocker** |
| Verify remaining edit items | `chapter-editor ch06` review | yes |
| Import newer GD content | `chapter-source-import ch06` | after filename fix |
| Build DOCX | `chapter-docx-build ch06` | after filename fix |
| Deploy | `book-deploy` | only after explicit approval |

## Readiness Verdict

**Overall status:** NEEDS_FIXES

**Main reason:** Chapter 6 uses dated filenames (`ch06-main-2026-06-17.md`) instead of the canonical stable flat names (`core-concepts.md`, `lets-build.md`, `terms-treasury.md`, `review-questions.md`, `rat.md`). This breaks the source model shared by chapters 5 and 7, and will cause DOCX build and import tooling failures. Additionally, 3 structural verification items from the 2026-06-13 audit remain unchecked in `ch06-edits.md`.

**Recommended next step:** Rename dated files to stable flat names, then run `chapter-source-import ch06` to pull newer GD companions, then verify remaining edit items.
