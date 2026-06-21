# Chapter 7 Final Check — 2026-06-21

## Scope

| Component | File | Status |
|---|---|---|
| Chapter Index | `ch07-normalization/index.md` | found |
| Core Concepts | `ch07-normalization/core-concepts.md` | found |
| Let's Build | `ch07-normalization/lets-build.md` | found |
| Terms Treasury | `ch07-normalization/terms-treasury.md` | found |
| Review & Reflection | `ch07-normalization/review-questions.md` | found |
| RAT | `ch07-normalization/rat.md` | found |
| Lab | `labs/lab-07-normalization/index.md` | found |
| Reports folder | `.reports/` | found |
| Edit notes | `.edits/ch07-edits.md` | missing (GD-only) |
| Image manifest | `files/manifests/image-manifest.csv` | n/a |

## Executive Summary

- **Overall status:** READY_WITH_WARNINGS
- **Main blocker:** Author decision pending on appendix routing (SQL/Access/Review → companions vs main). GD drift — all sections have newer drafts on GD (06-19, 06-21) vs repo (06-16).
- **Import readiness:** Ready (with warnings)
- **Deploy readiness:** Blocked (import not completed)
- **Recommended next step:** Resolve appendix routing decision, then `chapter-source-import ch07`

## Package Inventory

| Component | Expected Path | Status | Notes |
|---|---|---|---|
| Chapter index | `ch07-normalization/index.md` | found | Navigation, video embed, roadmap |
| Core concepts | `ch07-normalization/core-concepts.md` | found | Imported from ch07-main-2026-06-16.md |
| Let's Build | `ch07-normalization/lets-build.md` | found | Imported from ch07-lets-build-2026-06-16.md |
| Terms Treasury | `ch07-normalization/terms-treasury.md` | found | Imported from ch07-terms-2026-06-16.md |
| Review & Reflection | `ch07-normalization/review-questions.md` | found | Imported from ch07-reflection-2026-06-16.md |
| RAT | `ch07-normalization/rat.md` | found | Imported from ch07-rat-2026-06-16.md |
| Lab | `labs/lab-07-normalization/index.md` | found | Normalization, PetVax flat-to-normalized |
| Edit notes | `.edits/ch07-edits.md` | **missing** | GD has `ch07-edits-2026-05-26.md` with open appendix-routing decision |

## Safety Scan

| Issue Type | Count | Severity | Notes |
|---|---:|---|---|
| Unresolved author comments | 0 | pass | No TODO/FIXME/TBD/TK/XXX found in sampled content |
| Raw local paths | 0 | pass | All image paths are Cloudinary URLs |
| Answer exposure risks | 0 | pass | Lab answers in `instructor/lab-07-answers-2026-05-26.md`, marked "Do not distribute" |
| Visible answer keys in student-facing files | 0 | pass | RAT answer key in designated section; reflection answer key clearly separated |
| Broken or suspicious local links | 0 | pass | Cross-references to chapters use anchors |
| Allowed figure-suggestion comments | present | info | Production notes and HTML comments present |

## Main Chapter Check

| Check | Status | Notes |
|---|---|---|
| Clear chapter arc | pass | Flat-table problems → FDs → 1NF → 2NF → 3NF → normalized GD → analytics → denormalization → mistakes |
| Learning objectives present | pass | Index roadmap covers all sections |
| Heading hierarchy valid | pass | 7.1-7.10 subsections consistent |
| Core concepts coherent | pass | Cumulative progression through normal forms |
| Callouts valid | pass | Canonical HTML callout format |
| Examples support student learning | pass | Grading Database throughout; flat table → normalized step-by-step |
| Visual pedagogy adequate | pass | Cloudinary figures with captions |
| Summary present and useful | pass | Chapter Summary section |
| Cross-chapter signposting | pass | References Ch4, Ch5, Ch6; bridges to Ch8 |

## Companion Alignment

| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Let's Build | pass | Grading Database, Access, flat→normalized migration + midterm review; prepares for Lab 07 | Accept |
| Lab | pass | PetVax flat-to-normalized, answers in instructor/ | Accept |
| Terms Treasury | pass | 15 normalization terms with definitions, business significance, examples; acronyms table | Accept |
| Review & Reflection | warning | Repo version 2026-06-16; GD has 2026-06-21 version | Import newer GD version |
| RAT | warning | Repo version 2026-06-16; GD has 2026-06-21 version; 40 questions across all Bloom levels | Import newer GD version |

## Media and Figures

| Check | Status | Notes |
|---|---|---|
| All required images in place | pass | Cloudinary-hosted throughout |
| No raw local image paths | pass | All URLs are cloudinary.com |
| Instructional figures captioned | pass | Captions present |
| Alt text adequate | pass | Alt text on section icons and figures |
| Decorative images not numbered | pass | Section icons unnumbered |
| Figure suggestion comments resolved or documented | pass | Production HTML comments present |
| Image manifest / ledger current | n/a | GD has `ch07-figures.csv` in `.images/` |

## Figure Table

| Figure | File | Placement | Alt Text | Caption | Source / URL | Status |
|---|---|---|---|---|---|---|
| Section icons | ch00-* | Various | Named | Decorative | Cloudinary | ok |
| Content figures | ch07-* | Throughout | Descriptive | Numbered | Cloudinary | ok |

## Outline Coverage

Compared against `plans/outline/outline-2026-06-12.md`.

| Outline Item | Status | Current Location | Notes |
|---|---|---|---|
| 7.1: Why Normalization Matters | covered | core-concepts.md §7.1 | Flat table, redundancy, anomalies |
| 7.2: Functional Dependencies | covered | core-concepts.md §7.2 | Determinants, FDs in GD |
| 7.3: Normal Forms Overview | covered | core-concepts.md §7.3 | Checklist framing |
| 7.4: First Normal Form (1NF) | covered | core-concepts.md §7.4 | Multi-valued cells, repeating columns |
| 7.5: Second Normal Form (2NF) | covered | core-concepts.md §7.5 | Partial dependencies, junction tables |
| 7.6: Third Normal Form (3NF) | covered | core-concepts.md §7.6 | Transitive dependencies, lookup tables |
| 7.7: The Normalized Grading Database | covered | core-concepts.md §7.7 | 7-table schema, before/after |
| 7.8: Normalization and Analytics | covered | core-concepts.md §7.8 | JOIN-based analytics |
| 7.9: Denormalization | covered | core-concepts.md §7.9 | Intentional redundancy cases |
| 7.10: Common Normalization Mistakes | covered | core-concepts.md §7.10 | Anti-patterns |
| Key Concepts, Summary, Looking Ahead, References | covered | core-concepts.md | End matter present |

## Word Count

| Component | File | Words | Included in Package Total? | Notes |
|---|---:|---|---|---|
| Chapter Index | `index.md` | 312 | yes | navigation |
| Core Concepts | `core-concepts.md` | 2,356 | yes | main chapter |
| Let's Build | `lets-build.md` | 1,947 | yes | companion |
| Terms Treasury | `terms-treasury.md` | 765 | yes | companion |
| Review & Reflection | `review-questions.md` | 3,394 | yes | companion (includes answer key) |
| RAT | `rat.md` | 4,373 | yes | companion (includes answer key) |
| Lab | `labs/lab-07-normalization/index.md` | 1,693 | yes | student-facing only |
| **Total** | | **14,840** | | |

## DOCX Readiness

| Check | Status | Notes |
|---|---|---|
| Required files present | ready | All 5 stable files + index |
| Answer files excluded | ready | Lab answers in instructor/; RAT/reflection answer keys are part of companion files (by design) |
| Images reachable | ready | All Cloudinary URLs |
| Reference DOCX available | needs-review | Not verified |
| Build command assumptions clear | ready | Pandoc with reference docx |
| Recommended next command | `chapter-docx-build ch07` | |

## Import Readiness

| Check | Status | Notes |
|---|---|---|
| Main chapter ready | ready | Passes all checks |
| Companions ready | warning | All 5 companions have newer GD versions (06-19, 06-21 vs repo 06-16) |
| Lab ready | ready | Answers safely in instructor/ |
| Media ready | ready | All Cloudinary, no raw paths |
| No answer exposure risks | ready | Confirmed |
| No unresolved blockers | warning | Author decision needed on appendix routing |
| Recommended next command | `chapter-source-import ch07` | After appendix decision |

## Deploy Readiness

| Check | Status | Notes |
|---|---|---|
| Import completed or ready | **blocked** | Import not yet run |
| Build output ready | deferred | DOCX not yet built |
| No publication blockers | warning | Appendix routing decision pending |
| Recommended next command | `book-deploy` — only after import, DOCX build, and appendix decision | |

## Unresolved Items

- [ ] **Author decision needed:** Route SQL/Access/Review appendices to companions or keep in main chapter (flagged in GD `ch07-edits-2026-05-26.md` and chapter tracker)
- [ ] All 5 sections have newer GD drafts (06-19 main/lets-build/terms, 06-21 reflection/rat)
- [ ] No `ch07-edits.md` in repo `.edits/` — consider creating one or importing from GD
- [ ] Chapter tracker says lab is "Coming soon" in reader — verify lab is actually published

## Recommended Commands

| Goal | Command | Run Now? |
|---|---|---|
| Resolve appendix routing | Author decision then `chapter-editor ch07` if restructuring needed | yes |
| Import newer GD content | `chapter-source-import ch07` | after appendix decision |
| Create edit tracking | `edits ch07` | yes |
| Build DOCX | `chapter-docx-build ch07` | after import |
| Deploy | `book-deploy` | only after explicit approval |

## Readiness Verdict

**Overall status:** READY_WITH_WARNINGS

**Main reason:** Core package is solid — all 5 stable files present, lab safe, media clean, outline fully covered. GD drift affects all companions (repo at 06-16, GD at 06-19/06-21). One author decision pending: whether to route SQL/Access/Review appendices to companions or keep in main chapter. No blocking issues for DOCX build.

**Recommended next step:** Resolve appendix routing decision, then `chapter-source-import ch07` to pull all newer GD companions, then `chapter-docx-build ch07`.
