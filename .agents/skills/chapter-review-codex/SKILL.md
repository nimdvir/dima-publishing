---
name: chapter-review-codex
description: >
  Repo-canonical final review orchestrator for complete BITM330 database-book chapter packages.
  Use after a chapter has been substantially edited and is ready for final package review across
  stable source files under books/database-book/files/source. Reviews chapter index, core concepts,
  Let's Build, Terms Treasury, Review and Reflection, RAT, lab, cover/front matter when included,
  media, figure captions, image storage, image manifests, callouts, author comments, term consistency,
  outline coverage, word count, reports, progress logging, edit tracking, validation, and DOCX readiness.
  Coordinates existing specialized skills rather than duplicating or replacing them.
---
# Chapter Review Codex

**Book:** *Using Data to Drive Business Performance: Databases and Management Information Systems*

`chapter-review-codex` is the single canonical final-review skill for BITM330 database-book chapters.

It merges the strongest ideas from the prior `chapter-review-codex`, `chapter-review-gpt`, and `chapter-final-pass` drafts:

- repo-canonical source discipline;
- stable source-file workflow;
- interactive menu and mode selection;
- Phase 0 plan-and-approval gate;
- media dry-run gate;
- figure-number diff preview;
- structured companion audit tables;
- image storage and manifest contract;
- term mega table and first-use marking rules;
- `.reports/` versus `.edits/` separation;
- lightweight branch for cover/about/acknowledgements;
- DOCX-last build discipline;
- no automatic sync or deploy.

This skill is an **orchestrator**. It coordinates specialized skills, checks their outputs, and produces final review artifacts. It should not replace specialized skills or restate every rule they own.

## Argument Hint

Accept a chapter number, chapter folder, source package path, or mode, such as `ch01`, `ch01 full`, `ch01 dry-run`, `ch01 media-only`, `ch01 companions-only`, `books/database-book/files/source/chapters/ch01-introduction-to-course`, `0-cover-image front-matter-only`, or `01-acknowlgements language-only`.


---

## 1. Core Source Model

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

Lab answer files do **not** belong anywhere under:

```text
books/database-book/files/source
```

The canonical editing flow is:

```text
Google Drive dated drafts
        ↓
one-time documented import
        ↓
stable repo source files
        ↓
Git-controlled editing
        ↓
reports, manifests, logs, and builds
```

---

## 2. What Final Review Means

A chapter is not complete just because the prose reads well. It is complete when the full instructional package is coherent:

```text
chapter index
→ core concepts
→ callouts
→ Let's Build
→ Terms Treasury
→ Review and Reflection
→ RAT
→ Lab
→ media and figure records
→ term appendix
→ outline coverage
→ word count
→ reports
→ logs and tracker
→ DOCX readiness
```

The review should confirm:

1. The chapter reads clearly.
2. The chapter index is navigation-only.
3. The companion files align with the chapter.
4. The lab transfers from Let's Build.
5. No answer files are exposed.
6. Images are stored, delivered, captioned, accessible, and documented.
7. Terms are consistent and deduplicated across the book.
8. Reports make gaps and unresolved issues visible.
9. DOCX is built only after content is stable.
10. Deployment is never automatic.

---

## 3. Non-Negotiable Rules

1. **Repo source is canonical.** Normal editing happens in `books/database-book/files/source`.
2. **Do not overwrite from Google Drive.** Dated drafts are historical references unless the user explicitly asks to compare or merge.
3. **Do not expose lab answers.** No `*-answers-*` files may remain under `books/database-book/files/source`.
4. **Dated lab question files are not canonical after migration.** Merge useful student-facing content into stable lab `index.md`, then remove dated question files from active source when approved.
5. **Plan first, write after approval.** Phase 0 produces a plan and proposed-actions table. Dry runs are always allowed.
6. **Media side effects require a dry-run gate.** No optimization, copying, Cloudinary upload, Cloudinary folder creation, manifest write, ledger write, caption rewrite, or Markdown image rewrite before explicit approval.
7. **Original media is preserved.** Never move, rename, delete, overwrite, compress-in-place, or reorganize original images during final review.
8. **Chapter indexes are navigation pages.** They may orient and link, but must not duplicate full chapter, lab, RAT, terms, review, or companion content.
9. **Lab indexes are student-facing lab pages.** The lab folder `index.md` owns the canonical student-facing lab content.
10. **Build DOCX last.** Build only after text, links, media records, reports, and validation are stable.
11. **Do not deploy.** Do not run `book-deploy`, publish, push, or production deploy without a separate explicit request.
12. **Do not auto-sync.** `chapter-sync` is legacy/import/audit only. Do not run it as part of normal final review.
13. **Do not claim completion when anything is unresolved.** Report missing, skipped, blocked, partial, or unresolved items clearly.

---

## 4. Approval Gates

Preflight is always read-only. After preflight:

- If the user asked for a dry run, stop after the plan.
- If the user asked for edit-and-report, ordinary grammar, style, heading, comment, and non-destructive Markdown fixes may proceed only after Phase 0 approval.
- Ask before deleting or removing active-source files, including dated question files and answer files.
- Ask before any media side effect.
- Ask before route-affecting folder renames.
- Ask before unstyled DOCX fallback if a reference DOCX is missing.
- Ask before reader build checks.
- Ask before `chapter-sync`, deployment, commits, pushes, or merges.

`chapter-sync`, commits, pushes, and deployment are outside the default final review. They require separate explicit user requests.

---

## 5. Specialized Skills To Coordinate

Load only the skills needed for the current mode.

| Need | Skill |
|---|---|
| Main prose, structure, grammar, comments, readability, build hygiene | `chapter-editor` |
| Light language-only polish | `chapter-editor-light` |
| Callout syntax, type selection, density, conversion | `call-out` |
| Media discovery and read-only inventory | `chapter-media-inventory` |
| Media placement, optimization planning, delivery workflow | `chapter-media` |
| Image optimization, Cloudinary upload, link rewriting, ledger updates | `image-link-optimizer` |
| Figure suggestions | `figure-suggestion`, if available |
| Figure placement | `image-placement`, if available |
| Let's Build review or revision | `lets-build-creator` |
| Lab review, Lab 1 merge, PetVax transfer practice | `lab-creation` |
| RAT / quiz review or revision | `rat-creator` |
| Review and Reflection review or revision | `reflection` |
| Terms Treasury, term registry, first-use marking | `term-creator` |
| Chapter-specific edit notes | `edits` |
| Rolling progress log | `progress-update` |
| Chapter status tracking | `chapter-tracker` |
| Platform source import/sync audit only | `chapter-sync` |
| DOCX export logic | `chapter-docx-build`, adapted for stable repo source |
| Pandoc syntax/build compatibility | `pandoc-extensions` |
| Deployment | `book-deploy`, only after separate explicit approval |

If this skill conflicts with a specialized skill in that skill's domain, follow the specialized skill unless the user's explicit request or the repo-canonical workflow says otherwise.

Known override: for Lab 1 migration, the repo-canonical rule wins: stable lab `index.md` owns student-facing lab content.

---

## 6. Source Priority

Use sources in this order:

1. The user's explicit request and selected mode.
2. Root `AGENTS.md`, if present.
3. `.agents/README.md`, if present.
4. Target repo source files under `books/database-book/files/source`.
5. `books/database-book/AGENTS.md`, if present.
6. `.github/copilot-instructions.md`, if present.
7. Existing specialized skills listed above.
8. Canonical book edit workflow documentation, especially `books/database-book/plans/book-edit/canonical-book-edit-source-workflow-2026-06-10.md`, if present.
9. Active outline file, preferably `books/database-book/plans/outline/outline-2026-06-12.md`, or a newer repo-canonical outline.
10. Source import manifest, `books/database-book/files/manifests/source-import-manifest.csv`, if present.
11. Media manifest, `books/database-book/files/manifests/image-manifest.csv`, if present.
12. Chapter edit notes, `books/database-book/.edits/chNN-edits.md`, if present.
13. Relevant files under `.agents/reference/active/`.
14. Google Drive source files only as historical references or external originals.

---

## 7. Expected Repo Layout

Canonical source root:

```text
books/database-book/files/source
```

Expected layout:

```text
books/database-book/files/source/
  chapters/
    chNN-slug/
      index.md
      core-concepts.md
      lets-build.md
      review-questions.md
      terms-treasury.md
      rat.md
  labs/
    lab-NN-slug/
      index.md
  appendices/
    term-mega-table.md
  manifests/
    source-import-manifest.csv
    build-manifest.json
    image-manifest.csv
```

Generated reports:

```text
books/database-book/.reports/
```

Edit and progress records:

```text
books/database-book/.edits/edit-log.md
books/database-book/.edits/chNN-edits.md
books/database-book/.edits/chapter-tracker.md
```

---

## 8. Supported Modes

Accept a chapter folder name, chapter number, source path, mixed package description, non-chapter folder, or optional mode keyword.

Mode keywords:

```text
full
dry-run
language-only
media-only
companions-only
terms-only
outline-only
word-count-only
docx-only
front-matter-only
```

### 8.1 Interactive Menu

When invoked without a mode keyword and the request is ambiguous, present this menu:

```text
## Chapter Review Codex — chNN

What would you like to do?

1. Full review — all phases, with approval gates before writes
2. Dry run — inventory, detected issues, proposed actions, then stop
3. Language and callouts only
4. Media and figures only
5. Companions audit only
6. Terms and appendix only
7. Outline coverage only
8. Word count only
9. DOCX only
10. Front matter only
```

If the user's request already identifies the mode, skip the menu.

There is intentionally no sync/deploy menu item.

### 8.2 Repo-Canonical Source Mode

Use when the target is under:

```text
books/database-book/files/source
```

Rules:

- Edit stable files directly when the user requested edit-and-report and approved the plan.
- Do not create dated draft filenames inside `files/source`.
- Use Git history, reports, and manifests for traceability.
- Keep generated reports outside student-facing source.

### 8.3 Legacy Draft Reference Mode

Use for older paths such as:

```text
BITM330-Book-draft/chapter-drafts/
G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\
```

Rules:

- Treat these as references unless explicitly editing legacy drafts.
- Do not import automatically.
- Compare and merge manually.
- Preserve dated-file history if editing legacy drafts.

### 8.4 Mixed Package Mode

Use when the user includes a chapter plus front matter, cover, lab, or appendices.

Example for Chapter 1:

```text
books/database-book/files/source/chapters/ch01-introduction-to-course
books/database-book/files/source/chapters/01-acknowlgements
books/database-book/files/source/chapters/0-cover-image
books/database-book/files/source/labs/lab-01-petvax-intro
```

Rules:

- Treat named folders as one review package.
- Include front matter in style and word-count review.
- Do not merge front matter into the chapter unless explicitly requested.
- Keep visible page titles accurate even if folder names contain legacy typos.
- Do not rename routed folders unless build/routing effects are known.

### 8.5 Front Matter Only / Lightweight Mode

For non-chapter folders such as:

```text
0-cover-image
01-acknowlgements
```

Run only the relevant subset:

- preflight;
- plan and approval;
- file inventory;
- comment/path scan;
- language/style review;
- one-off media check if images are present;
- word count;
- final-review report;
- logging.

Skip:

- lab;
- Let's Build;
- RAT;
- Terms Treasury;
- term mega table;
- chapter-wide figure numbering;
- chapter DOCX unless explicitly requested.

---

# Phase 0 — Read-Only Preflight and Approval Plan

Before editing anything:

1. Resolve chapter number, chapter slug, source mode, mode keyword, and requested scope.
2. Read required repo instructions and relevant specialized skills.
3. Check Git status.
4. Locate expected files.
5. Determine whether cover, front matter, lab, appendices, reports, media, and DOCX are in scope.
6. Search for answer exposure risks.
7. Identify media/file-removal/DOCX-fallback approval needs.
8. Do not deploy or publish.

## 0.1 Preflight Table

Use this table in the plan or report:

```markdown
## Chapter Review Preflight — chNN

| Component | Expected Path | Status | Notes |
|---|---|---|---|
| Chapter index | `books/database-book/files/source/chapters/chNN-slug/index.md` | found / missing / n/a | navigation only |
| Core concepts | `.../core-concepts.md` | found / missing / n/a | main chapter |
| Let's Build | `.../lets-build.md` | found / missing / n/a | Grading Database practice |
| Review & Reflection | `.../review-questions.md` | found / missing / n/a | questions + key |
| Terms Treasury | `.../terms-treasury.md` | found / missing / n/a | chapter terms |
| RAT | `.../rat.md` | found / missing / n/a | readiness quiz |
| Lab | `books/database-book/files/source/labs/lab-NN-slug/index.md` | found / missing / n/a | PetVax transfer |
| Cover | selected cover path | found / missing / n/a | front matter |
| Acknowledgements / About Author | selected path | found / missing / n/a | front matter |
| Reports folder | `books/database-book/.reports/` | found / create / n/a | generated reports |
| Image manifest | `books/database-book/files/manifests/image-manifest.csv` | found / create / n/a | media provenance |
```

## 0.2 Create Missing Infrastructure

Create these only if needed by the requested run and after approval:

```text
books/database-book/.reports/
books/database-book/files/manifests/
books/database-book/files/source/appendices/
```

If `image-manifest.csv` does not exist and media work is approved, create it with this exact schema:

```csv
chapter,figure_number,source_file,nearest_heading,image_type,alt_text,caption,original_path,optimized_file,cloudinary_public_id,cloudinary_url,status,width,height,size_bytes,last_checked,notes
```

If the term appendix does not exist and term appendix work is in scope, create:

```text
books/database-book/files/source/appendices/term-mega-table.md
```

## 0.3 Risk Scan

Search the full source tree:

```text
books/database-book/files/source
```

for:

```text
*-answers-*
*answers*.md
answer-key
solution
solutions
G:\
C:\
file:///
TODO
FIXME
TK
```

Any answer file under `files/source` is an exposure risk. Do not copy answer content into reports.

## 0.4 Plan and Approval Gate

Print this before any write:

```markdown
## Final Review Plan — chNN

**Mode:** full / dry-run / language-only / media-only / companions-only / terms-only / outline-only / word-count-only / docx-only / front-matter-only

### Files Present

| Component | Path | Status | Notes |
|---|---|---|---|
| Chapter index | `.../index.md` | present / missing / n/a | navigation only |
| Core concepts | `.../core-concepts.md` | present / missing / n/a | main chapter |
| Let's Build | `.../lets-build.md` | present / missing / n/a | companion |
| Terms Treasury | `.../terms-treasury.md` | present / missing / n/a | companion |
| Review & Reflection | `.../review-questions.md` | present / missing / n/a | companion |
| RAT | `.../rat.md` | present / missing / n/a | companion |
| Lab index | `.../labs/lab-NN-slug/index.md` | present / missing / n/a | canonical lab |
| Cover | `.../0-cover-image/index.md` | present / missing / n/a | Chapter 1/front matter |
| About/Acknowledgements | `.../01-acknowlgements/...md` | present / missing / n/a | Chapter 1/front matter |
| Reports folder | `books/database-book/.reports/` | present / create / n/a | generated reports |
| Image manifest | `books/database-book/files/manifests/image-manifest.csv` | present / create / n/a | media provenance |

### Detected Issues

| Issue Type | Count | Severity | Notes |
|---|---:|---|---|
| Author comments | 0 | blocker/warning |  |
| TODO/FIXME/TK | 0 | blocker/warning |  |
| Raw local paths | 0 | blocker |  |
| Answer-file exposure risks | 0 | blocker |  |
| Lab duplication risk | yes/no | warning |  |
| Missing captions | 0 | warning |  |
| Unnumbered instructional figures | 0 | warning |  |
| Companion structural issues | 0 | warning |  |
| Outline gaps | 0 | info/warning |  |
| Term issues | 0 | warning |  |
| DOCX blockers | 0 | blocker |  |

### Proposed Actions

| Phase | Action | Files Touched | Approval Needed |
|---:|---|---|---|
| 1 | Whole-package inventory | reports only | no for dry run |
| 2 | Resolve comments/TODOs | source files, edit notes | yes |
| 3 | Language/style pass | source files | yes |
| 4 | Navigation/index cleanup | `index.md` files | yes |
| 5 | Lab canonicalization / answer removal | lab files | yes |
| 6 | Callout cleanup | source files | yes |
| 7 | Media dry run | report only | no |
| 7–8 | Media side effects and manifest | Markdown, images, Cloudinary, manifest | explicit yes |
| 9 | Companion revisions | companion files | yes |
| 10 | Outline report | `.reports/` only | yes unless dry run |
| 11 | Word count report | `.reports/` only | yes unless dry run |
| 12 | Manifest staleness check | report only | no |
| 14 | Logs/tracker | `.edits/` | yes |
| 15 | DOCX build | `.build/` | yes |

Approve this plan? Reply: yes / dry run only / changes / skip phases.
```

For `dry-run`, stop after the plan.

---

# Phase 1 — Whole-Package Read

Read every included Markdown file before editing.

For each file, record:

- path;
- role;
- H1/H2/H3 headings;
- approximate word count;
- image count;
- callout count;
- code block count;
- table count;
- internal links;
- external links;
- author comments;
- TODOs;
- raw Windows paths;
- suspected duplicates;
- whether it is student-facing, instructor-only, generated, or navigation-only.

Use this table in the final report:

```markdown
| File | Role | Words | Images | Callouts | Comments/TODOs | Notes |
|---|---|---:|---:|---:|---:|---|
```

Do not begin major rewrites until the package has been read.

---

# Phase 2 — Comment, TODO, and Artifact Scan

Search all included files for unresolved work markers:

```text
TODO
FIXME
COMMENT
AUTHOR
NOTE TO SELF
IMAGE
FIGURE
ADD IMAGE
PLACE IMAGE
VERIFY
CHECK
DUPLICATE
REWRITE
EXPAND
REMOVE
NEEDS
TBD
TK
XXX
```

Also detect:

```markdown
<!-- HTML comments -->
// line comments
[comment]
[[comment]]
```

For each item:

1. Determine whether it can be safely resolved.
2. Resolve it if the instruction is clear and in scope.
3. Move unresolved student-facing items to `books/database-book/.edits/chNN-edits.md`.
4. Preserve useful context from removed comments in the final report.
5. Never leave unresolved author comments in student-facing Markdown.

Report format:

```markdown
## Author Comments and TODOs

| Location | Marker | Resolution | Follow-up |
|---|---|---|---|
```

---

# Phase 3 — Language, Grammar, and Style Review

Use `chapter-editor` for substantial prose/style issues.

For every student-facing file in scope:

1. Correct grammar, spelling, punctuation, and capitalization.
2. Smooth awkward sentences.
3. Remove accidental repetition.
4. Improve transitions between sections.
5. Preserve technical meaning.
6. Preserve the instructor's approachable teaching voice.
7. Keep language professional but not stiff.
8. Avoid over-polishing into generic prose.
9. Avoid long dense paragraphs.
10. Standardize list punctuation.
11. Check heading hierarchy.
12. Remove excessive blank lines.
13. Preserve Markdown, code, links, embeds, and tables.
14. Do not change code examples unless they are wrong.
15. Do not rewrite visible examples into new scenarios unless alignment requires it.

Check for:

- repeated introductions;
- repeated promises or chapter goals;
- unclear pronoun references;
- inconsistent capitalization of book-specific terms;
- inconsistent use of Grading Database, GD, or GDB;
- inconsistent use of PetVax;
- inconsistent title casing in headings;
- unsupported claims;
- captions that sound like image prompts instead of textbook captions.

For Chapter 1, use the orientation-chapter structure. Do not force later-chapter structure onto Chapter 1.

---

# Phase 4 — Structure, Navigation, and Front Matter

## 4.1 Chapter Index

A chapter folder `index.md` is navigation and short orientation only.

Allowed:

- one H1;
- one short orientation paragraph;
- links to component files;
- short labels;
- a lab link when the lab exists and is part of the publishing source.

Not allowed:

- duplicated lab instructions;
- duplicated chapter introduction;
- full learning objectives;
- RAT explanations;
- answer keys;
- Terms Treasury content;
- long companion summaries;
- old import/migration notes.

Example:

```markdown
# Chapter 1: Introduction to the Textbook

This chapter is your map for the book. It explains where the book is going, what you will build, which tools you will use, and why this material matters for business students.

## Chapter Files

- [Main Chapter](core-concepts.md)
- [Let's Build](lets-build.md)
- [Review & Reflection](review-questions.md)
- [Terms Treasury](terms-treasury.md)
- [Readiness Assessment Test](rat.md)
- [Lab 01: PetVax Introduction](../../labs/lab-01-petvax-intro/index.md)
```

## 4.2 Lab Index

A lab folder `index.md` is the canonical student-facing lab page.

It may include:

- lab title;
- scenario;
- learning goal;
- student instructions;
- quiz-only explanation for Lab 1;
- later-lab model explanation;
- images;
- assessment instructions;
- student-facing questions.

It must not link to answers.

## 4.3 Front Matter

For included front matter:

- fix visible text and page titles;
- keep folder names unless route-safe renaming is explicitly approved;
- ensure About the Author, Acknowledgments, Copyright/Imprint, and Cover are separate concepts;
- do not put ISBN/copyright metadata inside About the Author unless required by the front-matter model;
- do not number cover art, author portraits, publisher logos, or badges as instructional figures.

---

# Phase 5 — Lab Review, Lab 1 Deduplication, and Answer Safety

Use `lab-creation`.

Check:

- lab number matches chapter number;
- lab title matches course progression;
- student-facing instructions are complete;
- Lab 1 quiz-only exception is clear;
- later labs use quiz + artifact model where appropriate;
- no answer key is visible;
- no answer-file links exist;
- tools do not jump ahead of the chapter;
- time budget is plausible;
- questions are auto-gradable where intended;
- artifact requirements are explicit when applicable;
- lab scenario uses PetVax as transfer practice;
- lab aligns with Let's Build.

## 5.1 Lab 1 Canonical Source

For Lab 1:

```text
books/database-book/files/source/labs/lab-01-petvax-intro/index.md
```

is the single canonical student-facing lab file.

If a dated file exists, such as:

```text
lab-01-questions-YYYY-MM-DD.md
```

merge useful student-facing content into `index.md`.

After the merge and approval:

- remove the dated questions file from active source;
- do not leave duplicated visible content;
- do not leave the dated file linked from navigation;
- log the merge in the report.

## 5.2 Chapter Index Deduplication

If Chapter 1 `index.md` duplicates Lab 1 instructions:

- remove the duplicate lab explanation;
- keep only short navigation and an optional lab link;
- keep the chapter index navigation-only.

## 5.3 Answer File Exposure

Search anywhere under:

```text
books/database-book/files/source
```

for:

```text
*-answers-*
*answers*.md
```

If found:

1. Report the file path in the preflight.
2. Ask before removing it from active source.
3. Do not relocate it inside public source.
4. Confirm no student-facing Markdown links reference it.
5. Do not delete or modify any external/original Google Drive copy.
6. Record the removal in the final review report and edit log.
7. Do not copy answer content into reports.

## 5.4 Audit Output

```markdown
| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Lab | pass / warning / fail | bullet list of issues with line numbers | accept / revise / delegate to lab-creation / manual review |
```

---

# Phase 6 — Callout Review

Use `call-out`.

Check:

- canonical HTML format;
- valid semantic classes;
- concrete headline;
- reasonable density;
- no stacked callouts unless justified;
- no decorative callouts;
- no inline styles;
- no CSS injected into Markdown;
- HTML lists inside callouts use HTML list tags.

Canonical format:

```html
<div class="callout type">
  <p><strong>EMOJI Label: Headline</strong></p>
  <p>Short callout text.</p>
</div>
```

Do not add callouts merely to make a section look busy.

Audit output:

```markdown
| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Callouts | pass / warning / fail | issues with line numbers | accept / revise / delegate to call-out / manual review |
```

---

# Phase 7 — Media, Figures, and Manifests

Use `chapter-media-inventory` first. Inventory is read-only.

Inventory:

- existing Markdown images;
- HTML `<img>` tags;
- Cloudinary URLs;
- local relative image paths;
- raw Windows paths;
- missing source files;
- weak alt text;
- missing or weak captions;
- decorative images;
- instructional figures;
- unused candidate images;
- image comments requesting insertion;
- existing figure numbering.

## 7.1 Original Media Root

External original media remains at:

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.images
```

Rules:

- do not delete originals;
- do not overwrite originals;
- do not rename originals during final review;
- unused images remain available for future placement;
- stop and report if a requested image/source is missing.

## 7.2 Chapter Used Images

Used optimized images go to:

```text
.images/<Chapter Image Folder>/chNN-used/
```

Never overwrite existing optimized files. Use collision suffixes such as `-v2`.

## 7.3 Cloudinary Convention

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

## 7.4 Mandatory Media Dry Run

Before media side effects, show a dry-run table and stop.

The dry run must stop before:

- optimization;
- copying optimized files;
- Cloudinary uploads;
- Cloudinary folder creation;
- Cloudinary overwrites;
- media ledger writes;
- repo manifest writes;
- Markdown rewrites;
- caption rewrites;
- image deletions.

Dry-run table:

```markdown
## Media Dry Run — chNN

| Action | File | Placement | Source / Original | Proposed Optimized File | Proposed Cloudinary Public ID | Proposed Caption | Manifest Impact | Status | Notes |
|---|---|---|---|---|---|---|---|---|---|
```

Proceed only after explicit approval.

## 7.5 Figure Numbering

Number content-bearing instructional figures sequentially across the chapter package:

```markdown
![Accessible alt text](image-url-or-path)

*Figure 1.1 — Caption explaining what the figure shows and why it matters instructionally.*
```

Rules:

- figure number format is `Figure N.X`;
- Chapter 1 figures are `Figure 1.1`, `Figure 1.2`, etc.;
- captions explain instructional value;
- alt text describes what the image shows;
- do not number decorative section icons;
- do not number cover art;
- do not number author images;
- do not number publisher logos;
- do not number UI badges or recurring section icons;
- multiple instructional images at one placement each get their own number;
- numbering is in document order across included chapter files, not restarted per file.

Show a diff table before rewriting captions:

```markdown
| File | Line | Current Caption | Proposed Caption | Action |
|---|---:|---|---|---|
```

Idempotency:

- if a caption already begins with the correct `Figure N.X —`, leave it;
- if the prefix is missing, prepend it;
- if the number is wrong, correct it;
- if decorative, do not number;
- do not modify alt text during renumbering unless media work explicitly includes alt text edits.

Ask once before writing caption changes.

## 7.6 Chapter Figure Table

The final review report must include:

```markdown
## Chapter NN Figure Table

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
| `needs-approval` | action proposed but not approved |

## 7.7 Repo Media Manifest

Maintain:

```text
books/database-book/files/manifests/image-manifest.csv
```

Approved schema:

```csv
chapter,figure_number,source_file,nearest_heading,image_type,alt_text,caption,original_path,optimized_file,cloudinary_public_id,cloudinary_url,status,width,height,size_bytes,last_checked,notes
```

Rules:

1. Create the file if missing and media work is approved.
2. Append or update rows idempotently.
3. Do not duplicate rows for the same normalized image placement.
4. If `image-manifest.csv` and `.images/book-media.md` disagree, flag the mismatch.

## 7.8 Operational Media Ledgers

Continue using these only when required by existing image skills:

```text
.images/book-media.md
.images/master-image-index.csv
```

Treat them as operational cache/index files, not the primary repo-canonical provenance file.

## 7.9 Chapter Media Inventory CSV

Write:

```text
books/database-book/.reports/chNN-media-inventory-YYYY-MM-DD.csv
```

Use the same schema as `image-manifest.csv` when practical so chapter reports and canonical manifest can be compared.

---

# Phase 8 — Terms, First-Use Marking, and Term Mega Table

Use `term-creator`.

## 8.1 Chapter Terms Treasury

Check that `terms-treasury.md` has:

- title;
- required header/icon if required by the current skill;
- terms table;
- definitions;
- business significance;
- examples;
- acronyms and abbreviations when needed.

Expected table:

```markdown
| Term / Concept | Definition | Business Significance | Examples |
|---|---|---|---|
```

Check for:

- duplicate terms;
- trivial terms;
- missing definitions;
- weak business significance;
- vague examples;
- inconsistent capitalization;
- unexplained acronyms;
- terms used in RAT/lab but missing from terms file.

## 8.2 First Meaningful Occurrence Marking

Mark only the first meaningful occurrence of each key term in the main/core chapter, and when appropriate, Let's Build.

Default marking:

```markdown
**Database**
```

If the live site has a verified semantic term style, use the approved pattern from `term-creator`, such as:

```html
<span class="term-highlight">**Database**</span>
```

or another approved repository pattern.

If `.term-highlight` is absent or unverified, log a follow-up instead of adding inline color styles.

Skip occurrences inside fenced code blocks, inline code, HTML comments, image alt text, captions, link text, headings, and existing term-highlight markup.

Show a diff table before writing term highlights:

```markdown
| File | Line | Term | Current Text | Proposed Markup | Action |
|---|---:|---|---|---|---|
```

Ask once before applying.

## 8.3 Term Mega Table Appendix

Preferred repo path:

```text
books/database-book/files/source/appendices/term-mega-table.md
```

Create the folder if missing and term appendix work is in scope.

Use this structure:

```markdown
# Term Mega Table

This appendix collects key terms across the book. Each term appears once, with the first chapter where it is introduced meaningfully.

| Term / Concept | First Introduced | Definition | Business Significance | Related Chapters | Source |
|---|---|---|---|---|---|
```

Rules:

1. Normalize terms for deduplication.
2. Each term appears once.
3. `First Introduced` is the earliest meaningful chapter.
4. Preserve student-facing definitions.
5. Keep related chapters concise.
6. Do not create separate rows for capitalization variants.
7. Keep acronyms as separate rows only if students need the acronym itself.
8. Do not invent terms not present in the chapter package unless adding them is required for coherence.
9. If a repo-canonical CSV term registry is later added, keep the appendix and registry synchronized.
10. Treat older `.docs/Terms/terms-list.csv` references as legacy unless the user explicitly asks for migration.

Audit output:

```markdown
| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Terms Treasury | pass / warning / fail | issues with line numbers | accept / revise / delegate to term-creator / manual review |
```

---

# Phase 9 — Companion Alignment

Review the chapter as a learning system.

Use a structured audit table:

```markdown
| Component | Status | Issues | Recommended Action |
|---|---|---|---|
| Let's Build | pass / warning / fail | ... | accept / revise / delegate |
| Lab | pass / warning / fail | ... | accept / revise / delegate |
| Terms Treasury | pass / warning / fail | ... | accept / revise / delegate |
| Review & Reflection | pass / warning / fail | ... | accept / revise / delegate |
| RAT | pass / warning / fail | ... | accept / revise / delegate |
```

## 9.1 Let's Build

Use `lets-build-creator`.

Check that:

- it uses the Grading Database, not PetVax;
- it connects concept → action → output → interpretation;
- activities increase in difficulty;
- it prepares students for the lab;
- it does not become a full graded lab;
- it is relevant to the chapter topic;
- headings follow the required hierarchy;
- it does not contain answer-key-only material.

For Chapter 1, Let's Build should orient students to the Grading Database and prepare the Lab 1 PetVax orientation without requiring database construction yet.

## 9.2 Lab

Use `lab-creation`.

Check that:

- Lab uses PetVax;
- Lab transfers the same logic from Let's Build;
- Lab 1 is quiz-only unless the author changes the model;
- later labs use quiz plus artifact submission;
- questions are auto-gradable;
- instructions are student-facing;
- answer files are not linked;
- lab does not duplicate chapter index content;
- lab image comments are resolved only after media approval;
- Lab 1 has one canonical source file.

## 9.3 RAT

Use `rat-creator`.

Check that:

- RAT questions match chapter content;
- required structure is present;
- Bloom sections are present as required;
- answer key exists;
- option-by-option reasoning exists if required;
- question distribution summary exists;
- questions assess readiness, not obscure trivia;
- no answers are exposed before the answer key section.

## 9.4 Review and Reflection

Use `reflection`.

Check that:

- metadata exists if required;
- title and chapter metadata are correct;
- review questions stay close to chapter concepts;
- reflection questions require interpretation, comparison, evaluation, or application;
- personal reflection questions connect to students' experience and development;
- answer key exists;
- headings are correct;
- questions are relevant to the current chapter, not generic;
- there is no answer leakage in question sections.

---

# Phase 10 — Outline Coverage and Current Outline Report

Compare the current chapter package against:

```text
books/database-book/plans/outline/outline-2026-06-12.md
```

If a newer repo-canonical outline exists, use the newest clear outline source and report which file was used.

Extract H1/H2/H3 from:

- `core-concepts.md`;
- `lets-build.md`;
- `review-questions.md`;
- `terms-treasury.md`;
- `rat.md`;
- lab `index.md` if in scope;
- selected front matter only for front-matter notes, not chapter outline coverage.

Classify each outline item:

```text
covered
partially covered
missing
moved to companion
intentionally omitted
not applicable
unclear
```

Do not force every outline item into the chapter. Missing content can be reported without being inserted.

Write:

```text
books/database-book/.reports/chNN-current-outline-YYYY-MM-DD.md
```

Structure:

```markdown
# Chapter NN Current Outline Review — YYYY-MM-DD

## Compared Against

`books/database-book/plans/outline/outline-2026-06-12.md`

## Current Heading Tree

[extracted headings]

## Coverage Table

| Outline Item | Status | Current Location | Notes |
|---|---|---|---|

## Missing or Partial Items

- [ ] ...

## Recommended Follow-Up

- [ ] ...
```

Never overwrite the canonical outline.

---

# Phase 11 — Word Count

Compute word count before and after cleanup when possible.

Write:

```text
books/database-book/.reports/chNN-word-count-YYYY-MM-DD.csv
```

Counting rules:

- count visible prose;
- count captions;
- count callout visible text;
- count questions and answer keys in student-facing companion files;
- exclude YAML front matter;
- exclude raw URLs;
- exclude HTML tags but count visible text inside HTML;
- exclude image URLs;
- exclude Markdown link URLs but count link text;
- exclude fenced code blocks unless requested;
- exclude navigation-only indexes from main chapter count but include them in package count;
- exclude answer files because they should not be in source.

Required table:

```markdown
## Word Count

| Component | File | Words | Included In Package Total? | Notes |
|---|---|---:|---|---|
| Cover | `0-cover-image/index.md` | 0 | yes | front matter |
| About Author / Acknowledgements | `01-acknowlgements/01-acknowlgements.md` | 0 | yes | front matter |
| Chapter Index | `chNN-slug/index.md` | 0 | yes | navigation |
| Core Concepts | `core-concepts.md` | 0 | yes | main chapter |
| Let's Build | `lets-build.md` | 0 | yes | companion |
| Review & Reflection | `review-questions.md` | 0 | yes | companion |
| Terms Treasury | `terms-treasury.md` | 0 | yes | companion |
| RAT | `rat.md` | 0 | yes | companion |
| Lab | `labs/lab-NN-slug/index.md` | 0 | yes | lab |
| **Total** |  | **0** |  |  |
```

Also report:

- main/core-only word count;
- companion total;
- full package total;
- front matter total;
- lab total;
- whether duplication inflated the count.

---

# Phase 12 — Manifest Staleness Check

This phase is read-only.

If present, read:

```text
books/database-book/files/manifests/source-import-manifest.csv
```

For rows whose destination path falls under the current chapter package:

1. Resolve the legacy `source_path` if available.
2. Compare the legacy source's last-modified date against the recorded source date if available.
3. Mark rows as current, stale, missing-source, or not-checkable.

Print:

```markdown
| Component | Source Date | Latest Legacy Date | Status | Notes |
|---|---|---|---|---|
```

If stale rows exist, report:

```text
Manifest staleness detected. Compare or sync explicitly before publishing.
```

This phase never modifies the manifest and never runs `chapter-sync`.

---

# Phase 13 — Reports

Write generated reports to:

```text
books/database-book/.reports/
```

Required reports for full review:

```text
chNN-final-review-YYYY-MM-DD.md
chNN-current-outline-YYYY-MM-DD.md
chNN-media-inventory-YYYY-MM-DD.csv
chNN-word-count-YYYY-MM-DD.csv
```

Optional reports:

```text
chNN-comment-scan-YYYY-MM-DD.csv
chNN-link-check-YYYY-MM-DD.csv
chNN-callout-audit-YYYY-MM-DD.csv
```

Do not place generated audit reports in `.edits`.

Final review report structure:

```markdown
# Chapter NN Final Review Report — YYYY-MM-DD

## Scope

| Component | File | Status |
|---|---|---|

## Executive Summary

- Overall status:
- Production readiness:
- Major blockers:
- Recommended next step:

## Completed Work

- [x] ...

## Files Changed

| File | Change Type | Notes |
|---|---|---|

## Files Removed From Active Source

| File | Reason | Notes |
|---|---|---|

## Language, Grammar, and Style

## Structure and Navigation

## Author Comments and TODOs

| Location | Marker | Resolution | Follow-up |
|---|---|---|---|

## Lab Review

| Check | Status | Notes |
|---|---|---|

## Answer Exposure Check

| Check | Status | Notes |
|---|---|---|

## Callouts

| Issue | Location | Resolution |
|---|---|---|

## Media and Figures

[Insert Chapter NN Figure Table]

## Media Manifest Updates

| Manifest | Status | Rows Added/Updated | Notes |
|---|---:|---:|---|

## Terms and Term Mega Table

| Check | Status | Notes |
|---|---|---|

## Companion Alignment

| Component | Status | Issues | Recommended Action |
|---|---|---|---|

## Outline Coverage

| Outline Item | Status | Current Location | Notes |
|---|---|---|---|

## Word Count Summary

| Component | Words |
|---|---:|

## Manifest Staleness

| Component | Status | Notes |
|---|---|---|

## DOCX Build

- Built:
- Output:
- Reference DOCX:
- Issues:

## Validation Checklist

- [ ] No unresolved author comments remain.
- [ ] No TODOs remain in student-facing source unless intentionally documented.
- [ ] No raw Windows paths remain in student-facing Markdown.
- [ ] No `*-answers-*` files remain under `books/database-book/files/source`.
- [ ] Lab has one canonical student-facing source file.
- [ ] Chapter index is navigation-only.
- [ ] Instructional figure captions are numbered.
- [ ] Media rows exist in the figure table.
- [ ] `image-manifest.csv` exists and has the approved schema when media work is in scope.
- [ ] Term mega table exists if term appendix work is in scope.
- [ ] Word counts are reported.
- [ ] Outline coverage is reported.
- [ ] Progress log updated.
- [ ] Tracker updated or follow-up recorded.
- [ ] DOCX built or build blocker reported.
- [ ] Deployment was not run.

## Unresolved Items

- [ ] ...

## Recommended Next Actions

- [ ] ...
```

Do not make a report look clean when known blockers remain.

---

# Phase 14 — Logs, Edit Notes, and Tracker

Use `progress-update`, `edits`, and `chapter-tracker`.

Rolling edit log:

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

- use `progress-update` for session outcomes;
- use `edits` for chapter-specific pending or archived notes;
- use `chapter-tracker` for tracked task status;
- do not create new Google Drive `.docs/.edits` files;
- do not put generated audit reports in `.edits`; use `.reports`;
- if tracker conventions are unclear, report a follow-up rather than inventing a new tracker format.

---

# Phase 15 — DOCX Build

Use `chapter-docx-build` logic adapted for stable repo files. Build DOCX last.

For Chapter 1 package, combine in this order when in scope:

```text
books/database-book/files/source/chapters/0-cover-image/index.md
books/database-book/files/source/chapters/01-acknowlgements/01-acknowlgements.md
books/database-book/files/source/chapters/ch01-introduction-to-course/core-concepts.md
books/database-book/files/source/chapters/ch01-introduction-to-course/lets-build.md
books/database-book/files/source/chapters/ch01-introduction-to-course/terms-treasury.md
books/database-book/files/source/chapters/ch01-introduction-to-course/review-questions.md
books/database-book/files/source/chapters/ch01-introduction-to-course/rat.md
books/database-book/files/source/labs/lab-01-petvax-intro/index.md
```

For other chapters, use:

```text
core-concepts.md
lets-build.md
terms-treasury.md
review-questions.md
rat.md
matching lab index.md
```

Exclude:

```text
navigation-only chapter index.md unless explicitly requested
dated superseded lab question files
lab answer files
generated reports
hidden manifests
```

Save to:

```text
books/database-book/files/source/chapters/chNN-slug/.build/chNN-full-YYYY-MM-DD.docx
```

Create `.build/` if missing.

Use the configured reference DOCX only if accessible. If missing or inaccessible:

1. stop the DOCX build;
2. report the missing style dependency;
3. do not attempt unstyled fallback unless approved.

Confirm:

- `.docx` exists;
- size is nonzero;
- no missing image/resource errors;
- output path is recorded in the final report.

Do not publish or deploy after DOCX.

---

# Phase 16 — Optional Reader Build, Sync, or Deploy

These are outside the default final review.

## 16.1 Reader Build Check

If the user explicitly asks for reader validation, optionally run the relevant reader generator/build. Record build status in the report.

## 16.2 Chapter Sync

Run `chapter-sync` only when the user explicitly asks to sync after final review. Do not use it as a normal overwrite or migration step.

If `chapter-sync` reports a conflict, stop and surface the conflict file list. Do not auto-resolve.

## 16.3 Deployment

Run `book-deploy` only after a separate explicit deployment request. Final review may say whether deployment appears ready, but it does not deploy by itself.

---

## Chapter 1 Special Profile

When invoked for Chapter 1, default scope includes:

```text
books/database-book/files/source/chapters/ch01-introduction-to-course
books/database-book/files/source/chapters/01-acknowlgements
books/database-book/files/source/chapters/0-cover-image
books/database-book/files/source/labs/lab-01-petvax-intro
```

Expected Chapter 1 files:

```text
ch01-introduction-to-course/index.md
ch01-introduction-to-course/core-concepts.md
ch01-introduction-to-course/lets-build.md
ch01-introduction-to-course/review-questions.md
ch01-introduction-to-course/terms-treasury.md
ch01-introduction-to-course/rat.md
labs/lab-01-petvax-intro/index.md
01-acknowlgements/01-acknowlgements.md
0-cover-image/index.md
```

Special rules:

1. Keep Chapter 1 `index.md` navigation-only.
2. Lab 1 `index.md` is the single canonical student-facing lab file.
3. Merge useful student-facing content from any dated Lab 1 questions file into Lab 1 `index.md`.
4. Remove dated Lab 1 questions files from active source after approved merge.
5. Remove all answer files from active source after approval.
6. Resolve Lab 1 image comments only after media dry-run approval.
7. Preserve Chapter 1 Cloudinary path convention: `bitm330book/ch01-introduction-to-course`.
8. Do not number cover art, section icons, author portraits, publisher logos, or badges.
9. Number instructional Chapter 1 figures as `Figure 1.1`, `Figure 1.2`, etc.
10. Fix visible "acknowledgements/about author" text, but do not rename routed folders unless route-safe.

---

## Lightweight Branch For Non-Chapter Folders

For folders such as:

```text
0-cover-image
01-acknowlgements
```

run only the relevant subset:

- preflight;
- language/style pass;
- media only if the folder contains requested instructional media;
- word count;
- manifest staleness if applicable;
- logging.

Skip companion, term, lab, RAT, and chapter-wide figure numbering unless the user explicitly includes them in a mixed package.

---

## Validation

After edits and report generation, confirm:

### Source Cleanliness

- no unresolved author comments in student-facing files;
- no TODOs unless intentionally documented;
- no raw Windows image paths;
- no broken local links;
- no absolute local links;
- no answer files under `books/database-book/files/source`;
- no links to answer files;
- no duplicate active Lab 1 source files;
- navigation index remains short.

### Media Validation

- media dry run was approved before side effects;
- all instructional figures have numbered captions;
- decorative icons are not numbered;
- `image-manifest.csv` exists when media delivery was in scope;
- `image-manifest.csv` has the approved schema;
- figure table exists in the final review report;
- local images were not rewritten to raw Windows paths;
- Cloudinary paths preserve the approved convention for Chapter 1.

### Term Validation

- terms file exists;
- no duplicate normalized terms in the chapter terms file;
- term mega table exists when in scope;
- no duplicate normalized terms in the term mega table;
- first meaningful term occurrences are bolded or follow the approved style;
- if `.term-highlight` CSS is absent, styling follow-up is logged instead of adding inline colors.

### Companion Validation

- Let's Build uses Grading Database;
- Lab uses PetVax;
- Lab 1 is quiz-only unless changed intentionally;
- RAT follows required structure;
- review/reflection questions are relevant;
- answer keys are not exposed in student-facing places;
- companion files align with the chapter.

### Report Validation

For full review, confirm these exist:

```text
books/database-book/.reports/chNN-final-review-YYYY-MM-DD.md
books/database-book/.reports/chNN-current-outline-YYYY-MM-DD.md
books/database-book/.reports/chNN-media-inventory-YYYY-MM-DD.csv
books/database-book/.reports/chNN-word-count-YYYY-MM-DD.csv
```

---

## Final Response Contract

At the end, respond in this format when a full review was run:

```markdown
Done — I completed the Chapter NN review pass.

## Reviewed

- Chapter index: yes/no
- Core concepts: yes/no
- Let's Build: yes/no
- Terms Treasury: yes/no
- Review & Reflection: yes/no
- RAT: yes/no
- Lab: yes/no
- Cover/front matter: yes/no
- Media: yes/no
- Term appendix: yes/no
- DOCX: yes/no

## Key Results

- Language/style issues corrected: X
- Author comments resolved: X
- Remaining unresolved items: X
- Lab duplication fixed: yes/no
- Answer exposure risks removed: X
- Instructional figures reviewed: X
- Figure captions numbered: X
- Media manifest rows added/updated: X
- Terms reviewed: X
- Outline gaps found: X
- Total word count: X
- DOCX built: yes/no
- Deployment run: no

## Files Changed

- `...`

## Files Removed From Active Source

- `...`

## Reports Created

- `books/database-book/.reports/chNN-final-review-YYYY-MM-DD.md`
- `books/database-book/.reports/chNN-current-outline-YYYY-MM-DD.md`
- `books/database-book/.reports/chNN-media-inventory-YYYY-MM-DD.csv`
- `books/database-book/.reports/chNN-word-count-YYYY-MM-DD.csv`

## Manifests / Logs Updated

- `books/database-book/files/manifests/image-manifest.csv`
- `books/database-book/.edits/edit-log.md`
- `books/database-book/.edits/chNN-edits.md`, if applicable
- chapter tracker, if applicable

## Unresolved Items

- [ ] ...

## Next Recommended Step

...
```

Do not paste full chapter text. Do not claim completion if any required component is missing, blocked, skipped, or unresolved.

---

## Safety

1. Never delete original external media.
2. Never overwrite original images.
3. Never create Cloudinary folders without explicit approval.
4. Never overwrite Cloudinary assets.
5. Never publish, deploy, commit, or push without explicit request.
6. Never move lab answers into another public source folder.
7. Never silently migrate from one Cloudinary folder convention to another.
8. Never use Google Drive dated drafts as current source without saying why.
9. Never leave answer files under `books/database-book/files/source`.
10. Never hide unresolved author comments.
11. Never overwrite the canonical outline file.
12. Never modify the legacy `BITM330-Book-draft` folder during repo-canonical final review.
13. Never embed Cloudinary credentials or print MCP tokens.
14. Never inject `.term-highlight` HTML spans unless the CSS class is verified for the current build target.
15. Never make a report look clean when known blockers remain.
16. When in doubt, flag and continue instead of fabricating fixes.

