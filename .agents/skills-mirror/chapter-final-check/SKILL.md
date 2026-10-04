---

name: chapter-final-check
description: >
Final readiness checker for complete BITM330 database-book chapter packages.
Use when checking whether a chapter is ready for import, DOCX export, and deployment.
Reviews the full chapter package: chapter index, core concepts, Let's Build,
Terms Treasury, Review and Reflection, RAT, lab, media, figure captions, image
records, answer exposure risks, outline coverage, word count, unresolved edits,
DOCX readiness, import readiness, and deploy readiness. This skill reports readiness,
blockers, and recommended next commands. It does not edit, import, deploy, commit,
push, or publish unless the user separately and explicitly requests those actions.
argument-hint: Chapter number, chapter folder, source package path, or mode, such as "ch09", "ch09 full", "ch09 dry-run", "ch09 media-only", "books/database-book/files/source/chapters/ch09-database-design".
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Chapter Final Check

`chapter-final-check` is the final readiness checker for BITM330 database-book chapters.

It answers one question:

```text
Is this chapter package ready for DOCX, import, and deployment?
```

It does not replace `chapter-editor`, `chapter-media`, `lab-creation`, `lets-build-creator`, `term-creator`, `rat-creator`, `reflection`, or `chapter-production-flow`.

It checks whether their work has produced a complete, coherent, safe, and publishable chapter package.

---

## Core Role

Use `chapter-final-check` after the main chapter and companions have been substantially drafted or revised.

It checks:

* chapter index;
* core concepts / main chapter;
* Let's Build;
* Terms Treasury;
* Review and Reflection;
* RAT / quiz;
* matching lab;
* media and figures;
* alt text and captions;
* image manifest or media ledger;
* answer exposure risks;
* unresolved author comments;
* unresolved chapter edit notes;
* outline coverage;
* word count;
* DOCX readiness;
* import readiness;
* deploy readiness.

The output is a readiness report, not a rewrite.

---

## Relationship to Other Skills

| Need                                                    | Use                                          |
| ------------------------------------------------------- | -------------------------------------------- |
| Decide what to do next                                  | `chapter-command-center`                     |
| Clarify active workflow                                 | `book-workflow-routing`                      |
| Manage the chapter lifecycle                            | `chapter-production-flow`                    |
| Edit main prose and visual pedagogy                     | `chapter-editor`                             |
| Handle images, placement, Cloudinary, and media records | `chapter-media`                              |
| Create or revise Let's Build                            | `lets-build-creator`                         |
| Create or revise lab                                    | `lab-creation`                               |
| Create or revise Terms Treasury                         | `term-creator`                               |
| Create or revise Review and Reflection                  | `reflection`                                 |
| Create or revise RAT / quiz                             | `rat-creator`                                |
| Build DOCX                                              | `chapter-docx-build`                         |
| Import Drive drafts into repo                           | `chapter-source-import`                      |
| Deploy or publish                                       | `book-deploy`, only after explicit approval  |
| Final readiness check                                   | `chapter-final-check`                        |

> **Legacy note:** `chapter-sync` is an older dated-file sync route. Use `chapter-source-import` as the current safe Drive-to-repo import gate.

---

## Non-Negotiable Rules

1. **Do not edit by default.** This skill checks readiness and writes reports. It does not rewrite chapter content unless the user explicitly asks for a fix pass.
2. **Do not import automatically.** The skill may recommend `chapter-source-import`, but it must not run it without a separate explicit user request.
3. **Do not deploy automatically.** The skill may recommend deployment readiness, but it must not deploy, publish, commit, push, or merge.
4. **Do not expose lab answers.** No answer files, answer keys, or solution files may be present in student-facing source.
5. **Do not hide blockers.** If something is missing, stale, incomplete, unsafe, or unresolved, report it clearly.
6. **Do not make the report look cleaner than the source.** The report must reflect the real state of the chapter.
7. **Do not overwrite Google Drive drafts.** Stable repo source is canonical for production.
8. **Do not perform media side effects.** Media optimization, Cloudinary upload, manifest writes, and link rewriting belong to `chapter-media`.
9. **Do not build DOCX by default.** Recommend `chapter-docx-build` when ready.
10. **When uncertain, mark as `needs-review`.**

---

## Canonical Source Model

Normal production source lives under:

```text
books/database-book/files/source
```

Expected chapter structure:

```text
books/database-book/files/source/chapters/chNN-slug/
  index.md
  core-concepts.md
  lets-build.md
  review-questions.md
  terms-treasury.md
  rat.md
```

Expected lab structure:

```text
books/database-book/files/source/labs/lab-NN-slug/
  index.md
```

Generated reports live under:

```text
books/database-book/.reports/
```

Operational records live under:

```text
books/database-book/.edits/
```

Expected operational files:

```text
books/database-book/.edits/edit-log.md
books/database-book/.edits/chNN-edits.md
books/database-book/.edits/chapter-tracker.md
```

Media manifests may live under:

```text
books/database-book/files/manifests/image-manifest.csv
```

Legacy or operational media ledgers may also exist:

```text
.images/book-media.md
.images/master-image-index.csv
```

Use Google Drive dated drafts only as historical references unless the user explicitly requests legacy comparison or migration.

---

## Supported Modes

Accept these modes:

```text
full
dry-run
media-only
companions-only
terms-only
outline-only
word-count-only
docx-ready
sync-ready
deploy-ready
```

If no mode is provided, use `full`.

### Mode Definitions

| Mode              | Purpose                                                               |
| ----------------- | --------------------------------------------------------------------- |
| `full`            | Check complete chapter package readiness                              |
| `dry-run`         | Inventory and report only; no report files written unless approved    |
| `media-only`      | Check images, captions, alt text, figure records, and media readiness |
| `companions-only` | Check Let's Build, lab, terms, review/reflection, and RAT alignment   |
| `terms-only`      | Check Terms Treasury and term appendix readiness                      |
| `outline-only`    | Check chapter package against current outline                         |
| `word-count-only` | Compute and report word count by component                            |
| `docx-ready`      | Check whether DOCX build can run safely                               |
| `import-ready`    | Check whether chapter appears ready for Drive-to-repo import           |
| `deploy-ready`    | Check whether chapter appears ready for deployment after import        |

---

## Phase 0 — Resolve Scope

Before checking, resolve:

1. chapter number;
2. chapter slug;
3. mode;
4. canonical source folder;
5. matching lab folder;
6. whether front matter is in scope;
7. whether appendices are in scope;
8. whether DOCX readiness is requested;
9. whether import/deploy readiness is requested.

If the chapter is unclear, ask:

```text
Which chapter should I check?
```

If the mode is unclear, default to `full`.

---

## Phase 1 — Package Inventory

Locate expected files.

Use this table in the report:

```markdown
## Package Inventory

| Component | Expected Path | Status | Notes |
|---|---|---|---|
| Chapter index | `books/database-book/files/source/chapters/chNN-slug/index.md` | found / missing / n/a | navigation only |
| Core concepts | `books/database-book/files/source/chapters/chNN-slug/core-concepts.md` | found / missing / n/a | main chapter |
| Let's Build | `books/database-book/files/source/chapters/chNN-slug/lets-build.md` | found / missing / n/a | Grading Database practice |
| Terms Treasury | `books/database-book/files/source/chapters/chNN-slug/terms-treasury.md` | found / missing / n/a | terms file |
| Review & Reflection | `books/database-book/files/source/chapters/chNN-slug/review-questions.md` | found / missing / n/a | review/reflection |
| RAT | `books/database-book/files/source/chapters/chNN-slug/rat.md` | found / missing / n/a | readiness quiz |
| Lab | `books/database-book/files/source/labs/lab-NN-slug/index.md` | found / missing / n/a | PetVax transfer |
| Reports folder | `books/database-book/.reports/` | found / missing | generated reports |
| Edit notes | `books/database-book/.edits/chNN-edits.md` | found / missing | unresolved chapter items |
| Image manifest | `books/database-book/files/manifests/image-manifest.csv` | found / missing / n/a | media provenance |
```

---

## Phase 2 — Student-Facing Safety Scan

Search student-facing source files for unsafe or unresolved material.

Check for:

```text
TODO
FIXME
TBD
TK
XXX
VERIFY
ADD IMAGE
PLACE IMAGE
REWRITE
REMOVE
COMMENT
AUTHOR
NOTE TO SELF
G:\
C:\
file:///
*-answers-*
answers
answer-key
solution
solutions
```

Also detect:

```markdown
<!-- HTML comments -->
// line comments
```

Not every HTML comment is bad. Figure suggestions such as the following are allowed as production notes:

```html
<!-- 🎨 Figure Suggestion: Create a simple ERD showing how STUDENT, DELIVERABLE, and STUDENT_GRADE connect through primary and foreign keys. -->
```

But unresolved author comments, TODOs, raw local paths, and answer exposure risks must be reported.

Use this table:

```markdown
## Safety Scan

| Issue Type | Count | Severity | Notes |
|---|---:|---|---|
| Unresolved author comments | 0 | blocker / warning / pass |  |
| TODO/FIXME/TK markers | 0 | blocker / warning / pass |  |
| Raw local paths | 0 | blocker / warning / pass |  |
| Answer exposure risks | 0 | blocker / pass |  |
| Visible answer keys in student-facing files | 0 | blocker / pass |  |
| Broken or suspicious local links | 0 | warning / pass |  |
| Allowed figure-suggestion comments | 0 | info |  |
```

---

## Phase 3 — Main Chapter Check

Check `core-concepts.md`.

Review:

* H1/H2/H3 hierarchy;
* introduction;
* learning objectives;
* core concept structure;
* section flow;
* summary;
* callout quality;
* code block formatting;
* tables;
* figure placement;
* visual pedagogy comments;
* unresolved author notes;
* chapter-level coherence;
* relationship to previous and next chapters.

Report:

```markdown
## Main Chapter Check

| Check | Status | Notes |
|---|---|---|
| Clear chapter arc | pass / warning / fail |  |
| Learning objectives present | pass / warning / fail |  |
| Heading hierarchy valid | pass / warning / fail |  |
| Core concepts coherent | pass / warning / fail |  |
| Callouts valid | pass / warning / fail |  |
| Examples support student learning | pass / warning / fail |  |
| Visual pedagogy adequate | pass / warning / fail |  |
| Summary present and useful | pass / warning / fail |  |
```

If problems require editing, recommend `chapter-editor`.

---

## Phase 4 — Companion Alignment Check

Check that each companion is present, current, and aligned.

### Let's Build

Check:

* uses the Grading Database;
* does not use PetVax as its main scenario;
* matches the chapter's concepts;
* includes guided practice;
* follows required heading rules;
* prepares students for the lab.

### Lab

Check:

* uses PetVax;
* transfers the same logic from Let's Build;
* lab number matches chapter number;
* no answer files or answer links are exposed;
* artifact requirements are clear when applicable;
* Lab 1 quiz-only exception is respected if applicable;
* later labs use quiz plus artifact when applicable.

### Terms Treasury

Check:

* key terms from the chapter are included;
* definitions are accurate and student-friendly;
* business significance is present;
* examples are concrete;
* duplicates are controlled.

### Review and Reflection

Check:

* review questions match chapter content;
* reflection questions require meaningful thinking;
* questions do not expose answer keys prematurely;
* format is consistent.

### RAT

Check:

* questions match chapter content;
* answer key is placed only where appropriate;
* question types and Bloom levels are appropriate;
* no answer leakage occurs in student-facing sections.

Use:

```markdown
## Companion Alignment

| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Let's Build | pass / warning / fail / missing |  | accept / revise with `lets-build-creator` |
| Lab | pass / warning / fail / missing |  | accept / revise with `lab-creation` |
| Terms Treasury | pass / warning / fail / missing |  | accept / revise with `term-creator` |
| Review & Reflection | pass / warning / fail / missing |  | accept / revise with `reflection` |
| RAT | pass / warning / fail / missing |  | accept / revise with `rat-creator` |
```

---

## Phase 5 — Media and Figure Readiness

Check media readiness. Do not execute media work.

Inspect:

* Markdown images;
* HTML `<img>` tags;
* Cloudinary URLs;
* raw local paths;
* missing alt text;
* weak alt text;
* missing captions;
* weak captions;
* unnumbered instructional figures;
* decorative icons that should not be numbered;
* unresolved figure-suggestion comments;
* image manifest rows;
* existing media report files.

Figure suggestions should use hidden HTML comments:

```html
<!-- 🎨 Figure Suggestion: Describe the visual and why it would help students. -->
```

Do not require the old visible heading format:

```markdown
#### 🎨 Figure Suggestion
```

Report:

```markdown
## Media and Figures

| Check | Status | Notes |
|---|---|---|
| All required images in place | pass / warning / fail |  |
| No raw local image paths | pass / warning / fail |  |
| Instructional figures captioned | pass / warning / fail |  |
| Alt text adequate | pass / warning / fail |  |
| Decorative images not numbered | pass / warning / fail |  |
| Figure suggestion comments resolved or documented | pass / warning / fail |  |
| Image manifest / ledger current | pass / warning / fail / n/a |  |
```

Add a figure table:

```markdown
## Figure Table

| Figure | File | Placement | Alt Text | Caption | Source / URL | Status | Notes |
|---|---|---|---|---|---|---|---|
```

If media problems require work, recommend `chapter-media`.

---

## Phase 6 — Outline Coverage

Compare the chapter package to the current outline.

Preferred outline path:

```text
books/database-book/plans/outline/
```

Use the newest clear outline file.

Classify each outline item:

| Status                  | Meaning                                                |
| ----------------------- | ------------------------------------------------------ |
| `covered`               | present and adequately addressed                       |
| `partial`               | present but underdeveloped                             |
| `missing`               | absent                                                 |
| `moved-to-companion`    | handled in Let's Build, lab, RAT, terms, or reflection |
| `intentionally-omitted` | not appropriate for this chapter package               |
| `unclear`               | needs author decision                                  |

Report:

```markdown
## Outline Coverage

| Outline Item | Status | Current Location | Notes |
|---|---|---|---|
```

If outline comparison cannot be completed because no outline is found, mark as `needs-review`.

---

## Phase 7 — Word Count

Compute approximate word count by component.

Counting rules:

* count visible prose;
* count captions;
* count callout visible text;
* count questions in student-facing files;
* exclude YAML front matter;
* exclude raw URLs;
* exclude image URLs;
* exclude fenced code blocks unless the user asks to include them;
* exclude generated reports;
* exclude lab answer files because they should not be in source.

Report:

```markdown
## Word Count

| Component | File | Words | Included in Package Total? | Notes |
|---|---|---:|---|---|
| Chapter Index | `index.md` | 0 | yes | navigation |
| Core Concepts | `core-concepts.md` | 0 | yes | main chapter |
| Let's Build | `lets-build.md` | 0 | yes | companion |
| Terms Treasury | `terms-treasury.md` | 0 | yes | companion |
| Review & Reflection | `review-questions.md` | 0 | yes | companion |
| RAT | `rat.md` | 0 | yes | companion |
| Lab | `labs/lab-NN-slug/index.md` | 0 | yes | lab |
| Total |  | 0 |  |  |
```

---

## Phase 8 — DOCX Readiness

Check whether DOCX build can run.

Check:

* required source files exist;
* navigation-only index is excluded unless intentionally included;
* lab answer files are excluded;
* generated reports are excluded;
* hidden manifests are excluded;
* images are reachable;
* no raw local paths remain;
* reference DOCX or style assumptions are clear;
* no obvious Pandoc blockers remain.

Report:

```markdown
## DOCX Readiness

| Check | Status | Notes |
|---|---|---|
| Required files present | ready / blocked / needs-review |  |
| Answer files excluded | ready / blocked |  |
| Images reachable | ready / blocked / needs-review |  |
| Reference DOCX available | ready / blocked / needs-review |  |
| Build command assumptions clear | ready / blocked / needs-review |  |
| Recommended next command | `chapter-docx-build chNN` / not ready |  |
```

Do not run DOCX build unless the user explicitly asks.

---

## Phase 9 — Import Readiness

Check whether the chapter appears ready for Drive-to-repo import via `chapter-source-import`.

Import readiness requires:

* main chapter passes final check;
* companions are present or intentionally deferred;
* lab is aligned or intentionally deferred;
* media has no blocking raw paths;
* no answer exposure risks exist;
* no unresolved author comments remain;
* reports are current enough;
* DOCX readiness is either ready or intentionally deferred;
* user has approved moving from review to import.

Report:

```markdown
## Import Readiness

| Check | Status | Notes |
|---|---|---|
| Main chapter ready | ready / blocked / needs-review |  |
| Companions ready | ready / blocked / needs-review |  |
| Lab ready | ready / blocked / needs-review |  |
| Media ready | ready / blocked / needs-review |  |
| No answer exposure risks | ready / blocked |  |
| No unresolved blockers | ready / blocked / needs-review |  |
| Recommended next command | `chapter-source-import chNN` / not ready |  |
```

The skill may recommend:

```text
chapter-source-import chNN
```

But it must not run it.

---

## Phase 10 — Deploy Readiness

Check whether the chapter appears ready for deploy after import.

Deploy readiness requires:

* import readiness is ready;
* no blocking final-check issues remain;
* chapter has been imported or user explicitly accepts pre-import deploy risk;
* build output is ready or intentionally deferred;
* no answer exposure risks exist;
* no local paths remain;
* no missing images remain;
* no unresolved publication blockers remain.

Report:

```markdown
## Deploy Readiness

| Check | Status | Notes |
|---|---|---|
| Import completed or ready | ready / blocked / needs-review |  |
| Build output ready | ready / blocked / deferred |  |
| No publication blockers | ready / blocked / needs-review |  |
| Recommended next command | `book-deploy` / not ready |  |
```

The skill may recommend:

```text
book-deploy
```

But it must not run deploy, publish, commit, push, or merge.

---

## Phase 11 — Readiness Verdict

Assign one overall status.

| Status                | Meaning                                                 |
| --------------------- | ------------------------------------------------------- |
| `READY`               | No blockers. Import or DOCX can proceed.                 |
| `READY_WITH_WARNINGS` | No blockers, but some non-blocking follow-up exists.    |
| `NEEDS_FIXES`         | One or more issues should be fixed before import or DOCX. |
| `BLOCKED`             | Critical issue prevents publication or safe import.      |
| `INSUFFICIENT_INFO`   | Required files or context are missing.                  |

Use:

```markdown
## Readiness Verdict

**Overall status:** READY / READY_WITH_WARNINGS / NEEDS_FIXES / BLOCKED / INSUFFICIENT_INFO

**Main reason:** <one-sentence explanation>

**Recommended next step:** <specific command or action>
```

---

## Phase 12 — Final Report

For full checks, write or output a report using this structure.

Preferred report path when writing is approved:

```text
books/database-book/.reports/chNN-final-check-YYYY-MM-DD.md
```

Report structure:

```markdown
# Chapter NN Final Check — YYYY-MM-DD

## Scope

| Component | File | Status |
|---|---|---|

## Executive Summary

- Overall status:
- Main blocker:
- Sync readiness:
- Deploy readiness:
- Recommended next step:

## Package Inventory

## Safety Scan

## Main Chapter Check

## Companion Alignment

## Media and Figures

## Figure Table

## Outline Coverage

## Word Count

## DOCX Readiness

## Sync Readiness

## Deploy Readiness

## Unresolved Items

- [ ] ...

## Recommended Commands

| Goal | Command | Run Now? |
|---|---|---|
| Fix main chapter | `chapter-editor chNN` | yes / no |
| Fix media | `chapter-media chNN` | yes / no |
| Fix companions | `chapter-production-flow chNN companions` | yes / no |
| Build DOCX | `chapter-docx-build chNN` | yes / no |
| Import | `chapter-source-import chNN` | only after explicit approval |
| Deploy | `book-deploy` | only after explicit approval |

## Readiness Verdict
```

---

## Final Response Contract

When the check is complete, respond:

```markdown
## Chapter NN Final Check Complete

**Overall status:** READY / READY_WITH_WARNINGS / NEEDS_FIXES / BLOCKED / INSUFFICIENT_INFO

### Key Results

- Main chapter: pass / warning / fail
- Companions: pass / warning / fail
- Lab: pass / warning / fail
- Media: pass / warning / fail
- Answer exposure risks: none / found
- DOCX readiness: ready / blocked / needs-review
- Sync readiness: ready / blocked / needs-review
- Deploy readiness: ready / blocked / needs-review

### Reports Created

- `books/database-book/.reports/chNN-final-check-YYYY-MM-DD.md`

### Recommended Next Step

`<specific command>`

### Sync / Deploy

Recommended: yes / no

Not run. Sync and deploy require separate explicit approval.
```

Do not paste the full report unless the user asks.

---

## Safety Rules

1. Never sync automatically.
2. Never deploy automatically.
3. Never commit, push, merge, or publish automatically.
4. Never expose answer files.
5. Never copy answer-key content into reports.
6. Never run media side effects.
7. Never upload to Cloudinary.
8. Never overwrite original media.
9. Never create or delete source files unless the user explicitly requests a fix pass.
10. Never claim readiness if blockers remain.
11. Never ignore raw local paths.
12. Never ignore unresolved author comments.
13. Never require all warnings to be fixed before sync unless they are blockers.
14. Never treat hidden figure-suggestion comments as student-facing errors.
15. Always give a concrete recommended next command.
