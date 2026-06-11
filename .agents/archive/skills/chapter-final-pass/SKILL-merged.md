---
name: chapter-final-review
description: >
  UNIFIED MERGED DRAFT. Reconciles all three competing review drafts
  (chapter-final-pass, chapter-review-codex, chapter-review-gpt) plus the
  GPT and Claude merge proposals into one canonical workflow. The
  chapter-review-codex repo-canonical workflow is the base. It adds GPT's
  comprehensive reports, media-documentation contract, image manifest,
  term mega-table, DOCX structure, validation checklist, and final-
  response contract. It adds Claude's interactive numbered menu, plan-
  and-approval gate, partial modes, diff-preview gates, idempotency
  rules, and lightweight front-matter branch. It deliberately excludes
  auto-sync, auto-deploy, the dated Lab 1 runbook-as-canonical model, the
  singular appendix/terms-list.csv path, and the old manifest-staleness
  workflow. Designed for the repo-canonical source model under
  books/database-book/files/source. Use when reviewing the whole chapter
  package: chapter index, core concepts, Let's Build, Terms Treasury,
  Review and Reflection, RAT, lab, media, figure captions, outline
  coverage, term consistency, word count, progress logging, edit
  tracking, reports, and DOCX readiness. Coordinates existing skills such
  as chapter-editor, call-out, chapter-media-inventory, chapter-media,
  image-link-optimizer, lets-build-creator, lab-creation, rat-creator,
  reflection, term-creator, progress-update, edits, chapter-tracker, and
  chapter-docx-build.
argument-hint: >
  Chapter folder name or number — e.g. "ch01", "ch01-introduction-to-course",
  "01-acknowlgements", or "0-cover-image". An optional mode keyword may
  follow (e.g. "ch01 dry-run", "ch01 language-only", "ch01 media-only").
---

# Chapter Final Review (Unified)

> **Unified draft.** This file reconciles all three competing review
> drafts (`chapter-final-pass`, `chapter-review-codex`,
> `chapter-review-gpt`) plus the GPT and Claude merge proposals into one
> canonical workflow. It sits next to the existing
> `chapter-final-pass/SKILL.md`; only `SKILL.md` is auto-registered as a
> skill, so this `SKILL-merged.md` is not auto-loaded. Promote it to the
> live skill by saving it as the canonical `SKILL.md` (in this folder or
> a new `chapter-final-review/` folder) once it is approved.

Run a final, whole-package review of a BITM330 chapter after editing is complete. This skill is an orchestrator. It does not replace specialized skills; it coordinates them, applies repo-canonical rules, and produces the final review artifacts.

## Source Model

Use the repository as the working source of truth:

```text
books/database-book/files/source
```

Google Drive dated drafts are historical source material. Google Drive image folders remain the original media library. Do not continue the old dated Google Drive chapter-sync workflow for normal editing.

Canonical chapter files use stable names:

```text
books/database-book/files/source/chapters/chNN-slug/
  index.md
  core-concepts.md
  lets-build.md
  review-questions.md
  terms-treasury.md
  rat.md
```

Canonical lab files use stable lab folders:

```text
books/database-book/files/source/labs/lab-NN-slug/index.md
```

Lab answer files do not belong under `books/database-book/files/source`.

## Operating Principle

Review the complete chapter package as a student and production unit:

1. The chapter should read clearly.
2. The companion files should align with the chapter.
3. The lab should transfer from Let's Build.
4. Images should be delivered, documented, captioned, and accessible.
5. Terms should be consistent and deduplicated across the book.
6. Reports should make gaps and unresolved issues visible.
7. DOCX should be built only after content is stable.
8. Deployment is never automatic.

## Interactive Start Menu (Patch 1)

When invoked without a mode keyword, present this menu and wait for a numeric selection. The skill defers all writes until Phase 0b approval, regardless of which option is chosen.

```text
## Chapter Final Pass — chNN

What would you like to do?

1. Full review — every phase, single approval gate at Phase 0b
2. Dry run / inventory only — Phases 0a, 0b, 1, 2 only; no writes
3. Language and callouts only — Phases 1, 2, 3, 11 (callouts), 19, 20
4. Media only — Phases 12, 13, 14, 15, 16 with media-write gate
5. Companions audit only — Phases 5, 6, 7, 9, 10 (read-only audits)
6. Terms and appendix only — Phases 7, 8 (term registry + appendix sync)
7. Outline and word count only — Phases 17, 18, 19
8. DOCX only — Phases 18, 21
9. Front matter only — lightweight branch (see Lightweight Branch section)
```

If the user invoked the skill with a mode keyword, skip the menu and proceed to Phase 0a for that mode. Mode keywords accepted: `dry-run`, `language-only`, `media-only`, `companions-only`, `terms-only`, `outline-only`, `docx-only`, `front-matter-only`.

For non-chapter folders (`0-cover-image`, `01-acknowlgements`), force option **9 — Front matter only** regardless of menu input.

## Relevant Skills

Load only the skills needed for the current pass.

| Need | Skill |
|---|---|
| Main prose, grammar, structure, comments, flow | `chapter-editor` |
| Callout syntax, type selection, density, conversion | `call-out` |
| Image inventory and unused/used audit | `chapter-media-inventory` |
| Image placement, figure planning, media orchestration | `chapter-media` |
| Optimization, Cloudinary upload, link rewrite, ledger | `image-link-optimizer` |
| Let's Build review or revision | `lets-build-creator` |
| Lab review or revision | `lab-creation` |
| RAT review or revision | `rat-creator` |
| Review and Reflection review or revision | `reflection` |
| Terms Treasury, first-use marking, dedupe | `term-creator` |
| Book-wide progress log | `progress-update` |
| Chapter-specific edit notes | `edits` |
| Book/chapter task tracker | `chapter-tracker` |
| DOCX build | `chapter-docx-build` |
| Pandoc command choices | `pandoc-extensions` |

Do not duplicate the full instructions of those skills. Read and apply the relevant skill when that subsystem is touched.

## Phase 0a - Preflight

Before changing anything:

1. Resolve the chapter number, chapter slug, and requested scope.
2. Read root `AGENTS.md`.
3. Read `books/database-book/AGENTS.md` if present.
4. Confirm repo-canonical source layout.
5. Check git status.
6. Identify files in scope.
7. Confirm whether this is:
   - skill creation only,
   - final review dry run only,
   - final review with edits,
   - final review plus media processing,
   - final review plus DOCX build.
8. Do not deploy or publish.

For Chapter 1, the typical full scope is:

```text
books/database-book/files/source/chapters/0-cover-image
books/database-book/files/source/chapters/01-acknowlgements
books/database-book/files/source/chapters/ch01-introduction-to-course
books/database-book/files/source/labs/lab-01-petvax-intro
```

Keep the visible folder spelling unless routing/build code is updated separately. For example, do not rename `01-acknowlgements` only to fix spelling during final review.

## Phase 0b - Plan And Approval Gate (Patch 2)

After Preflight and before any phase that writes, print a single plan block and wait for explicit approval. This gate runs in every mode except `dry-run` (which stops at the end of Phase 0b automatically).

```text
## Chapter Final Pass Plan — chNN

Target folder: books/database-book/files/source/chapters/<folder>/
Lab folder:    books/database-book/files/source/labs/lab-NN-<slug>/
Mode:          [full | dry-run | language-only | media-only | ...]

### Files Present
- index.md                   [present | missing]
- core-concepts.md           [present | missing]
- lets-build.md              [present | missing]
- review-questions.md        [present | missing]
- terms-treasury.md          [present | missing]
- rat.md                     [present | missing]
- images/                    [N files | empty | missing]
- lab folder index.md        [present | missing]
- lab dated questions file   [path | merged into index | missing]
- lab answers file           [must NOT be present | flag if found]

### Detected Issues (read-only)
- Unresolved author comments: N
- Bare absolute Windows paths: N
- Image references missing captions: N
- Captions missing "Figure N.X — " prefix: N
- Lab folder duplication risk: yes/no
- Outline gaps (in outline, missing in chapter): N
- Outline extras (in chapter, not in outline): N
- Companion structural issues: N (see Phase 5–11 audit tables)
- Terms not yet marked on first occurrence in main/lets-build: N
- Image manifest drift vs. delivered figures: yes/no

### Proposed Actions
| Phase | Proposed Action                                | Files Touched                                                 | Reversible |
|------:|------------------------------------------------|---------------------------------------------------------------|:----------:|
|     1 | Inventory files (read-only)                    | none                                                          | n/a        |
|     2 | Comment and edit scan (read-only)              | none                                                          | n/a        |
|     3 | Main chapter review (delegated)                | core-concepts.md (only on author approval inside chapter-editor) | yes     |
|     4 | Chapter index check                            | index.md (only if it duplicates the lab body)                 | yes        |
|   5–11| Companion audits (read-only)                   | none                                                          | n/a        |
|    12 | Media inventory CSV                            | .reports/chNN-media-inventory-YYYY-MM-DD.csv                  | yes        |
|    13 | Media dry-run gate                             | none                                                          | n/a        |
| 14–16 | Media writes (after dry-run approval only)     | optimized files, image-manifest.csv, chapter Markdown captions| yes        |
|    17 | Outline coverage report                        | .reports/chNN-current-outline-YYYY-MM-DD.md                   | yes        |
|    18 | Word count report                              | .reports/chNN-word-count-YYYY-MM-DD.csv                       | yes        |
|    19 | Final review report                            | .reports/chNN-final-review-YYYY-MM-DD.md                      | yes        |
|    20 | Edit and progress logging                      | .edits/edit-log.md, .edits/chNN-edits.md, .edits/chapter-tracker.md | yes  |
|    21 | DOCX build (delegated)                         | chapters/chNN-slug/.build/chNN-full-YYYY-MM-DD.docx           | yes        |
|    22 | Validation pass (read-only)                    | none                                                          | n/a        |
|    23 | Final response                                 | none                                                          | n/a        |

### Open Questions
1. Run the chapter-editor language pass on `core-concepts.md` now, or skip it?
2. Apply term first-use marking to `lets-build.md` as well as `core-concepts.md`?
3. Lab 1 cleanup: confirm merge-and-delete of dated questions file (codex rule)?
4. Any phases or files to skip?

Approve this plan? (yes / changes / dry run only)
```

Rules:

- Stop here on `dry-run`.
- Stop here on `changes` and re-print after edits.
- Proceed only on explicit `yes`.
- Never start a media write phase (14–16) without a separate dry-run approval inside Phase 13.
- Never start the DOCX phase (21) before content is stable.

## Phase 1 - File Inventory

Inventory the full chapter package.

For a normal chapter, include:

```text
chapter index
core-concepts.md
lets-build.md
terms-treasury.md
review-questions.md
rat.md
matching lab index.md
```

For Chapter 1, also include front matter as requested:

```text
0-cover-image/index.md
01-acknowlgements/01-acknowlgements.md
```

Record:

- file path
- role
- word count
- H1 count
- top-level headings
- author comments
- TODOs
- image references
- raw local paths
- broken or suspicious links
- companion alignment issues
- build risks

Use stable file paths in reports. Do not use dated Google Drive filenames as current source unless explicitly comparing provenance.

## Phase 2 - Comment And Edit Scan

Scan every file in scope for:

- `//` comments
- `<!-- ... -->` comments
- `TODO`
- `FIXME`
- `TK`
- placeholder text
- raw `G:\...`, `C:\...`, or `file:///...` paths
- image insertion notes
- stale dated-file references
- answer-file references
- malformed Markdown
- duplicate sections
- visible student-facing editorial notes

Author comments are high priority. Resolve each one or quote it verbatim in the final review report under unresolved decisions.

Never leave unresolved author comments in student-facing prose.

## Phase 3 - Main Chapter Review

Use `chapter-editor` for core prose and build-readiness rules.

Check:

- grammar
- spelling
- sentence clarity
- paragraph length
- student readability
- repetition
- transitions
- heading hierarchy
- page breaks
- chapter structure
- summary quality
- references
- student-facing tone
- no stale comments
- no malformed tables
- no raw local image paths
- no unintentional duplicated figures or captions

For Chapter 1, use the orientation-chapter structure. Do not force later-chapter structure onto Chapter 1.

## Phase 4 - Chapter Index Rules

Distinguish chapter indexes from lab indexes.

### Chapter Index

A chapter folder `index.md` is navigation and short orientation only.

It may include:

- chapter title
- brief description
- links to chapter files
- link to the matching lab when the reader needs it

It must not duplicate the full Lab body.

For Chapter 1:

```text
books/database-book/files/source/chapters/ch01-introduction-to-course/index.md
```

Keep this file navigation-only.

### Lab Index

A lab folder `index.md` is the canonical student-facing lab page.

For Lab 1:

```text
books/database-book/files/source/labs/lab-01-petvax-intro/index.md
```

This is the lab instruction page. Do not reduce it to a navigation stub.

## Phase 5 - Lab Review

Use `lab-creation`.

Check:

- lab number matches chapter number
- lab title matches course progression
- student-facing instructions are complete
- Lab 1 quiz-only exception is clear
- later labs use the quiz + artifact model where appropriate
- no answer key is visible
- no answer-file links exist
- tools do not jump ahead of the chapter
- time budget is plausible
- questions are auto-gradable where intended
- artifact requirements are explicit when applicable
- lab scenario uses PetVax as transfer practice
- lab aligns with Let's Build

### Lab 1 Duplication Rule

For Lab 1:

1. Treat `books/database-book/files/source/labs/lab-01-petvax-intro/index.md` as canonical.
2. If `lab-01-questions-YYYY-MM-DD.md` exists in the lab folder, merge any useful student-facing content into `index.md`.
3. Remove the dated questions file from active source after merge.
4. If `lab-01-answers-YYYY-MM-DD.md` exists anywhere under `books/database-book/files/source`, remove it from active source.
5. Do not move answer files into a public repo source folder.
6. Do not delete or alter any external/original Google Drive answer copy.
7. Confirm no student-facing Markdown links to an answer file.

### Audit Output (Patch 4)

End this phase with a row in the companion audit table:

```markdown
| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Lab | pass / warning / fail | bullet list of issues with line numbers | accept / revise / delegate to lab-creation / manual review |
```

Do not edit lab files inline. Defer fixes to a follow-up `lab-creation` run.

## Phase 6 - Let's Build Review

Use `lets-build-creator`.

Check:

- Let's Build increases in difficulty
- it remains within the chapter scope
- it uses the Grading Database as guided practice
- it prepares the matching PetVax lab
- it does not smuggle in future chapter topics
- expected outputs are clear
- section rhythm is concept -> action -> output -> interpretation
- companion lab is referenced by exact name where appropriate
- tool progression is correct

For Chapter 1, Let's Build should orient students to the Grading Database and prepare the Lab 1 PetVax orientation without requiring database construction yet.

### Audit Output (Patch 4)

```markdown
| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Let's Build | pass / warning / fail | issues with line numbers | accept / revise / delegate to lets-build-creator / manual review |
```

## Phase 7 - Terms Review

Use `term-creator`.

Check:

- Terms Treasury has the required structure
- definitions are student-friendly and chapter-grounded
- business significance is clear
- examples are concrete
- acronyms are handled separately
- chapter terms match actual chapter vocabulary
- terms are not duplicated unnecessarily across chapters
- first meaningful occurrences are marked in the chapter text

Use plain bold for first-use marking unless the reader has a verified `.term-highlight` CSS class. Do not add inline color styles to Markdown.

### Audit Output (Patch 4)

```markdown
| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Terms Treasury | pass / warning / fail | issues with line numbers | accept / revise / delegate to term-creator / manual review |
```

## Phase 8 - Book-Level Term Mega Table

Maintain a book-level term appendix.

Preferred path:

```text
books/database-book/files/source/appendices/term-mega-table.md
```

Create the folder if missing.

Use this table:

```markdown
| Term / Concept | First Introduced | Definition | Business Significance | Related Chapters |
|---|---|---|---|---|
```

Rules:

- one normalized row per term
- record the first chapter where the term appears
- do not duplicate terms already introduced earlier unless the later chapter extends the concept meaningfully
- preserve student-facing definitions
- keep related chapters as a concise list
- do not use the term appendix as a dumping ground for every noun phrase

If a central CSV registry is later added, keep the appendix and registry synchronized.

## Phase 9 - Review And Reflection Review

Use `reflection`.

Check:

- required sections exist:
  - Review Questions
  - Reflection Questions
  - Personal Reflection Questions
  - Answer Key
- question sections have no answers
- answer key maps clearly to questions
- questions are chapter-grounded
- questions are not generic filler
- review questions check understanding
- reflection questions require interpretation or judgment
- personal reflection questions connect to student experience
- suggested answers are plausible and useful
- terminology matches main chapter and Terms Treasury

### Audit Output (Patch 4)

```markdown
| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Review and Reflection | pass / warning / fail | issues with line numbers | accept / revise / delegate to reflection / manual review |
```

## Phase 10 - RAT Review

Use `rat-creator`.

Check:

- required RAT structure is present
- questions are relevant to the chapter
- student-facing questions contain no correctness markers
- answer key is complete
- option-by-option reasoning is present
- Bloom distribution matches the RAT skill expectations
- question types are valid
- AI-resistance and scenario grounding are present
- no stale chapter references remain
- no answers leak outside the answer key

### Audit Output (Patch 4)

```markdown
| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| RAT | pass / warning / fail | issues with line numbers | accept / revise / delegate to rat-creator / manual review |
```

## Phase 11 - Callout Review

Use `call-out`.

Check:

- all callouts use canonical HTML format
- callout classes are valid
- callout headlines are concrete
- callouts are not decorative
- callouts are not stacked
- density is reasonable
- legacy blockquote, GitHub alert, emoji-only, or ad-hoc callouts are converted only when they improve learning
- callouts do not replace full reflection questions or lab instructions

Do not add callouts merely to make a section look busy.

### Audit Output (Patch 4)

```markdown
| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Callouts | pass / warning / fail | issues with line numbers | accept / revise / delegate to call-out / manual review |
```

## Phase 12 - Media Inventory

Use `chapter-media-inventory` first. This phase is read-only.

Inventory:

- existing Markdown images
- HTML `<img>` tags
- Cloudinary URLs
- local relative image paths
- raw Windows paths
- missing source files
- weak alt text
- missing or weak captions
- decorative images
- instructional figures
- unused candidate images
- image comments requesting insertion
- existing figure numbering

Write chapter-specific media inventory to:

```text
books/database-book/.reports/chNN-media-inventory-YYYY-MM-DD.csv
```

Create `books/database-book/.reports/` if missing.

Suggested CSV schema:

```csv
chapter,figure_number,source_file,nearest_heading,image_type,alt_text,caption,original_path,optimized_file,cloudinary_public_id,cloudinary_url,status,width,height,size_bytes,last_checked,notes
```

## Phase 13 - Media Dry-Run Gate

Before media side effects, show a dry-run table and stop.

The dry run must stop before:

- optimization
- copying optimized files
- Cloudinary uploads
- Cloudinary folder creation
- Cloudinary overwrites
- media ledger writes
- repo manifest writes
- Markdown rewrites
- caption rewrites
- image deletions

Proceed only after explicit approval.

Dry-run table columns:

```markdown
| Action | File | Placement | Source / Original | Proposed Optimized File | Proposed Cloudinary Public ID | Proposed Caption | Status | Notes |
|---|---|---|---|---|---|---|---|---|
```

## Phase 14 - Image Storage And Documentation Contract

Images are textbook assets, not only Markdown links.

### Original Images

Originals stay in the external image library or chapter image folder:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images
.images/<Chapter Image Folder>/
```

Rules:

- do not delete originals
- do not overwrite originals
- do not rename originals during final review
- unused images remain available for future placement

### Optimized Used Images

Used optimized images go to:

```text
.images/<Chapter Image Folder>/chNN-used/
```

Example:

```text
.images/Ch01 Introduction to Course/ch01-used/
```

Never overwrite existing optimized files. Use collision suffixes such as `-v2`.

### Cloudinary Delivery

Preserve the currently deployed public path convention unless a migration is separately approved.

For Chapter 1, default to:

```text
bitm330book/ch01-introduction-to-course
```

Do not silently migrate Chapter 1 assets to:

```text
Database-book-BITM330/ch01-introduction-to-course
```

unless the user approves a media migration.

### Repo Canonical Media Manifest

Maintain:

```text
books/database-book/files/manifests/image-manifest.csv
```

Create it if missing with this exact schema:

```csv
chapter,figure_number,source_file,nearest_heading,image_type,alt_text,caption,original_path,optimized_file,cloudinary_public_id,cloudinary_url,status,width,height,size_bytes,last_checked,notes
```

Rows must be idempotent. Do not create duplicate rows for the same normalized image placement.

### Operational Ledgers

Continue using these only when required by existing image skills:

```text
.images/book-media.md
.images/master-image-index.csv
```

Treat them as operational cache/index files, not the primary repo-canonical provenance file.

## Phase 15 - Figure Captions And Numbering

Number content-bearing instructional figures sequentially within the chapter package:

```markdown
![Accessible alt text](image-url-or-path)

*Figure 1.1 - Caption explaining what the figure shows and why it matters instructionally.*
```

Rules:

- figure number format is `Figure N.X`
- Chapter 1 figures are `Figure 1.1`, `Figure 1.2`, etc.
- captions explain instructional value
- alt text describes what the image shows
- do not number decorative section icons
- do not number cover art
- do not number author images
- do not number publisher logos
- do not number UI badges or recurring section icons
- multiple instructional images at one placement each get their own number

### Diff And Approval Gate (Patch 3)

Before rewriting captions, build a chapter-wide ordered list of non-decorative figures across `core-concepts.md` and `lets-build.md` in document order. Compute the proposed renumbered caption for each. Print this diff table:

```markdown
| File              | Line | Current Caption                                          | Renumbered Caption                                                           |
|-------------------|-----:|----------------------------------------------------------|------------------------------------------------------------------------------|
| core-concepts.md  |  142 | *From data toward better business decisions.*            | *Figure 1.1 — From data toward better business decisions.*                   |
| core-concepts.md  |  267 | *Figure 1.2 — Tables, columns, rows.*                    | *Figure 1.2 — Tables, columns, rows.* (no change)                            |
| lets-build.md     |   88 | *A first look at the Grading Database.*                  | *Figure 1.7 — A first look at the Grading Database.*                         |
```

Idempotency:

- If a caption already begins with the correct `Figure N.X — ` prefix, mark it `(no change)` and skip rewriting.
- If the prefix is missing, prepend it.
- If the number is wrong (renumbering shifted earlier figures), correct it.
- Replace `|` with `/` in caption text before writing.
- Do not modify alt text in this phase.

Ask once: `Apply these caption updates? (yes / no / changes)`

On `yes`, write all caption updates in a single pass per file. On `no` or `changes`, surface the diff in the final-review report under *Unresolved Decisions* and continue.

## Phase 16 - Chapter Figure Table

The final review report must include a figure table.

```markdown
## Chapter N Figure Table

| Figure | Placement | Image Type | Alt Text | Caption | Source / Original | Optimized File | Cloudinary URL | Status | Notes |
|---|---|---|---|---|---|---|---|---|---|
```

Status vocabulary:

| Status | Meaning |
|---|---|
| `delivered` | optimized, uploaded, linked, captioned, and documented |
| `local-only` | local image exists but has not been uploaded |
| `missing-source` | Markdown references an image whose source cannot be found |
| `caption-needed` | image lacks a proper numbered instructional caption |
| `alt-needed` | image has weak or missing alt text |
| `unused` | image exists but is not placed |
| `decorative` | icon or visual decoration, not numbered as a figure |
| `skipped` | intentionally skipped with explanation |

## Phase 17 - Outline Coverage

Compare the chapter package against:

```text
books/database-book/plans/outline/outline-2026-06-05.md
```

If a newer repo-canonical outline exists, use the newest clear outline source and report which file was used.

Create:

```text
books/database-book/.reports/chNN-current-outline-YYYY-MM-DD.md
```

Include:

- current H1/H2/H3 outline by file
- expected outline topics
- covered topics
- partial topics
- missing topics
- intentionally omitted topics
- topics that appear but may belong elsewhere
- short recommendation list

It is acceptable for the chapter not to cover every outline item, but missing or partial coverage must be visible.

## Phase 18 - Word Count

Create:

```text
books/database-book/.reports/chNN-word-count-YYYY-MM-DD.csv
```

Suggested schema:

```csv
chapter,file,role,word_count,last_checked,notes
```

Report:

- word count per file
- main chapter word count
- companion word counts
- lab word count
- total package word count
- whether duplication inflated the count
- whether the package is unusually long for its role

## Phase 19 - Reports

Create:

```text
books/database-book/.reports/chNN-final-review-YYYY-MM-DD.md
books/database-book/.reports/chNN-current-outline-YYYY-MM-DD.md
books/database-book/.reports/chNN-media-inventory-YYYY-MM-DD.csv
books/database-book/.reports/chNN-word-count-YYYY-MM-DD.csv
```

The final review report must include:

1. Scope and files reviewed
2. Source model confirmation
3. Edit/comment tally
4. Grammar/style summary
5. Structure and heading findings
6. Companion alignment (paste the audit tables from Phases 5–11)
7. Lab review
8. Let's Build-to-Lab alignment
9. Terms and term appendix status
10. RAT status
11. Review and Reflection status
12. Callout status
13. Media inventory summary
14. Chapter figure table
15. Outline coverage summary
16. Word count summary
17. Answer-file exposure check
18. DOCX build status
19. Progress-log/tracker updates
20. Unresolved decisions
21. Recommended follow-ups

## Phase 20 - Progress And Edit Tracking

Use repo-side edit tracking.

Rolling book-wide log:

```text
books/database-book/.edits/edit-log.md
```

Chapter-specific edit notes:

```text
books/database-book/.edits/chNN-edits.md
```

Chapter tracker:

```text
books/database-book/.edits/chapter-tracker.md
```

Rules:

- use `progress-update` for session outcomes
- use `edits` for chapter-specific pending or archived notes
- use `chapter-tracker` for tracked task status
- do not create new Google Drive `.docs/.edits` files
- do not put generated audit reports in `.edits`; use `.reports`

## Phase 21 - DOCX Build

Build DOCX last, after content and media checks pass.

For repo-canonical source, adapt the old `chapter-docx-build` expectation to stable files.

For Chapter 1, combine in this order when in scope:

1. cover image page
2. publication/acknowledgements/about-author page
3. `core-concepts.md`
4. `lets-build.md`
5. `terms-treasury.md`
6. `review-questions.md`
7. `rat.md`
8. Lab 1 `index.md`

Exclude:

- navigation-only chapter index from DOCX unless explicitly requested
- dated superseded lab question files
- lab answer files
- generated reports
- hidden manifests

Save DOCX under the chapter build folder:

```text
books/database-book/files/source/chapters/chNN-slug/.build/chNN-full-YYYY-MM-DD.docx
```

Create `.build/` if missing.

Use the configured reference DOCX only if accessible. If the reference DOCX is not accessible, report the missing style dependency and either stop or build an unstyled DOCX only with explicit approval.

Do not publish or deploy after DOCX.

## Phase 22 - Validation

Before final response, confirm:

- no unresolved author comments remain in student-facing source
- no TODO/FIXME/TK placeholders remain unless intentionally preserved and reported
- no raw Windows image paths remain in student-facing Markdown
- no `*-answers-*` files remain anywhere under `books/database-book/files/source`
- no student-facing links point to answer files
- Lab 1 has one canonical student-facing source file
- chapter index remains navigation-only
- media dry-run approval was obtained before media side effects
- image manifest exists with approved schema
- Chapter N instructional figures appear in the manifest
- figure captions are numbered and instructional
- decorative images are not numbered
- final review report exists
- outline report exists
- media inventory CSV exists
- word-count CSV exists
- DOCX exists if build was in scope
- progress log was updated
- tracker was updated if a tracked task was completed

## Lightweight Branch — Front Matter Only (Patch 5)

For non-chapter folders such as `0-cover-image` and `01-acknowlgements`, run a reduced pipeline. Front matter is not a chapter package: there are no companions, no lab, no terms registry entry, no RAT, no Let's Build, no chapter-wide figure numbering, and no DOCX build.

Run only:

- **Phase 0a** — Preflight (scope = front-matter folder).
- **Phase 0b** — Plan and approval gate (proposed-actions table reduced to phases below).
- **Phase 1** — File inventory (folder Markdown only).
- **Phase 2** — Comment and edit scan.
- **Phase 3** — Main file review via `chapter-editor`, scoped to the folder's Markdown files.
- **Phase 12** — Media inventory (read-only; do not write the media-inventory CSV).
- **Phase 18** — Word count (do not write the word-count CSV).
- **Phase 19** — Write only the final-review report `.reports/<folder>-final-review-YYYY-MM-DD.md`. Skip the outline-coverage, media-inventory, and word-count CSVs.
- **Phase 20** — Logging.
- **Phase 22** — Validation, scoped.

Skip these phases for front matter:

- 4 (chapter index vs lab index — front matter is neither)
- 5–11 (companions; none apply)
- 13–16 (chapter-wide media writes; only run on explicit user request)
- 17 (outline coverage — only if the canonical outline references the folder)
- 21 (DOCX build — front matter is stitched into a chapter DOCX, not built standalone)

Front-matter folders never trigger automatic figure renumbering, term highlighting, manifest writes, or chapter-tracker rows.

## Phase 23 - Final Response (Patch 6)

Print this fixed Markdown report at the end of every run, including dry runs. Do not paste chapter prose. Keep the response on one screen.

```markdown
## Chapter Final Pass — Report — chNN

**Mode:** <full | dry-run | language-only | media-only | companions-only | terms-only | outline-only | docx-only | front-matter-only>
**Started:** YYYY-MM-DD HH:MM    **Finished:** YYYY-MM-DD HH:MM
**Scope:** <chapter folder, lab folder, front-matter folders included>

### Counts
| Metric                                  | Value |
|-----------------------------------------|------:|
| Author comments resolved                | N     |
| Callouts converted                      | N     |
| Figures renumbered                      | N     |
| Terms newly marked on first use         | N     |
| Terms added to mega-table               | N     |
| Outline gaps (missing in chapter)       | N     |
| Outline extras (not in outline)         | N     |
| Total chapter word count                | NNNN  |

### Files Written
- <relative path 1>
- <relative path 2>
- ...

### Reports Created
- books/database-book/.reports/chNN-final-review-YYYY-MM-DD.md
- books/database-book/.reports/chNN-current-outline-YYYY-MM-DD.md
- books/database-book/.reports/chNN-media-inventory-YYYY-MM-DD.csv
- books/database-book/.reports/chNN-word-count-YYYY-MM-DD.csv

### Unresolved Decisions
- <bullet, quoting any escalated author comment verbatim>
- ...

### Recommended Next Steps
- <bullet>
- ...

### Deployment Note
This skill does not run `chapter-sync` or `book-deploy`. If the chapter is
ready to publish, run those skills as separate, explicit steps.
```

## Safety Rules

- Never delete original external media.
- Never overwrite original images.
- Never create Cloudinary folders without explicit approval.
- Never overwrite Cloudinary assets.
- Never publish, deploy, commit, or push without explicit request.
- Never move lab answers into another public source folder.
- Never silently migrate from one Cloudinary folder convention to another.
- Never use Google Drive dated drafts as current source without saying why.
- Never leave answer files under `books/database-book/files/source`.
- Never hide unresolved author comments.
- Never make a report look clean when the chapter still has known blockers.
- Never auto-run `chapter-sync` or `book-deploy` from this skill.
- Never restart figure numbering inside a chapter; numbering is chapter-wide and document-order.
- Never inject `.term-highlight` HTML spans unless the CSS class is verified for the current build target.
