---
name: chapter-source-import
description: >
  Safely reconcile and import BITM330 database-book chapter drafts from Google Drive
  into stable repository source files. Use when comparing dated Drive drafts against
  repo files, detecting drift, importing safe updates, updating source manifests,
  fixing answer-file exposure, and maintaining the chapter-section status dashboard.
argument-hint: Chapter range or command (e.g., "Ch01–Ch04", "Ch05", "--dry-run", "preflight only")
---

# Chapter Source Import

**Compare-first reconciliation — Drive chapter draft → repo canonical source**

---

## Purpose

`chapter-source-import` safely moves chapter source material from Google Drive drafts
into the repository's stable source structure.

This skill is **not** a blind file transfer tool. It is a **compare-first reconciliation
and import workflow**.

Use this skill to:

- Reconcile Drive drafts with repo source files
- Check what changed in Drive
- Import safe updates after classification
- Compare Drive vs. repo for drift
- Update the source import manifest (`source-import-manifest.csv`)
- Create or update the chapter-section status dashboard (`chapter-section-status.md`)
- Fix lab answer exposure
- Prepare chapter source for reader readiness

---

## When to Use This Skill

Use `chapter-source-import` for requests like:

- Reconcile Ch01–Ch04 from Drive
- Check whether Ch05 is newer in Drive or repo
- Import safe updates for Ch05–Ch08
- Create a drift report for all chapters
- Update the chapter-section-status table
- Check answer-file exposure before reader launch
- Compare latest Drive drafts against `source-import-manifest.csv`

---

## When NOT to Use This Skill

Do not use this skill for:

| Task | Use instead |
|---|---|
| Chapter prose editing | `chapter-editor` / `chapter-editor-light` |
| Chapter readiness / production lifecycle | `chapter-production-flow` |
| Final package review | `chapter-review-codex` |
| DOCX build | `chapter-docx-build` |
| Reader build / deploy | `book-deploy` |
| Media / image optimization | `chapter-media` / `image-link-optimizer` |
| Supabase / Auth / Stripe / platform code | Platform-specific task or plan |
| Commit / push / merge / deploy | Separate workflow after approval |

---

## Supported Modes

| Mode | Behavior |
|---|---|
| `preflight` | Git safety + repo inspection only; no Drive scan |
| `dry-run` | Full scan + classify + report; no file writes |
| `reconcile` | Full scan + classify + report + await approval |
| `drift-report` | Compare all Drive dates vs. manifest; table output only |
| `import-approved` | Import only sections the user approved |
| `status-dashboard` | Create or update `chapter-section-status.md` only |
| `lab-safety` | Scan for exposed answer files only |
| `logs-only` | Update edit log / tracker / edits files only |
| `handoff` | Print handoff report; no changes |

If no mode is provided, default to **preflight + reconciliation report only**.
Do not make changes before the user approves.

---

## Absolute Safety Rule

Do not copy files from Google Drive into the repo without reconciliation.

Only import when:

```
Drive source is clearly newer
AND repo file has not been independently edited since the last import
AND importing will not overwrite useful repo-specific cleanup
```

If unsure, classify the item as **Conflict** or **Ambiguous** and stop for user review.

---

## Do Not Do These Things

Never:

- blindly overwrite repo files
- create dated production files in the repo
- create `.sync-manifest.json`
- use the old `chapter-sync` workflow unless explicitly requested
- auto-create or switch branches before reporting working-tree status
- delete repo-only variants such as `lets-build-v2.md`
- delete embedded answer keys from `review-questions.md` or `rat.md`
- expose lab answer files
- introduce YAML frontmatter
- introduce a new metadata-comment format
- run `npm install` / `generate` / `lint` / `build`
- edit homepage text
- implement Coming Soon behavior
- start Supabase / Auth work
- start Stripe / payment work
- commit, push, merge, or deploy

---

## Paths

| Role | Path |
|---|---|
| Drive draft root | `G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\` |
| Repo canonical source | `books/database-book/files/source/chapters/` |
| Labs source | `books/database-book/files/source/labs/` |
| Manifest | `books/database-book/files/manifests/source-import-manifest.csv` |
| Chapter-section status | `books/database-book/.edits/chapter-section-status.md` |
| Edit log | `books/database-book/.edits/edit-log.md` |
| Chapter tracker | `books/database-book/.edits/chapter-tracker.md` |
| Chapter edit notes | `books/database-book/.edits/chNN-edits.md` |

---

## Drive-to-Repo Section Mapping

| Drive subfolder | Drive filename pattern | Repo stable filename |
|---|---|---|
| `main/` | `chNN-main-YYYY-MM-DD.md` | `core-concepts.md` |
| `lets-build/` | `chNN-lets-build-YYYY-MM-DD.md` | `lets-build.md` |
| `terms/` | `chNN-terms-YYYY-MM-DD.md` | `terms-treasury.md` |
| `reflection/` | `chNN-reflection-YYYY-MM-DD.md` | `review-questions.md` |
| `rat/` | `chNN-rat-YYYY-MM-DD.md` | `rat.md` |

The repo uses stable filenames (no dates). Dated Drive filenames determine source content
version only.

---

## Stable Repo File Convention

Each chapter folder should use stable filenames:

```
index.md
core-concepts.md
lets-build.md
review-questions.md
terms-treasury.md
rat.md
```

Example:

```
books/database-book/files/source/chapters/ch01-introduction-to-course/
  index.md
  core-concepts.md
  lets-build.md
  review-questions.md
  terms-treasury.md
  rat.md
```

Do not create active dated files such as `ch01-main-2026-06-05.md` inside the repo chapter
source folder.

---

## Metadata Comment Convention

Every imported repo file must have this comment as its **first line**:

```text
<!-- metadata: date="YYYY-MM-DD" -->
```

- `YYYY-MM-DD` = date from the Drive source filename
- No YAML frontmatter
- No multi-line metadata blocks
- One metadata comment per file, always on line 1

This is the primary date stamp for reconciliation. It tells you what Drive version is in
the repo without opening the file.

---

## Classification System

Before importing any file, classify every section using this table:

| Classification | Condition | Action |
|---|---|---|
| **Current** | Drive date == repo metadata date; manifest SHA matches | No action needed |
| **Drive-newer** | Drive has a newer dated file than repo metadata date; repo not independently edited | Safe to import **after approval** |
| **Repo-newer** | Repo metadata date > Drive latest date | Do NOT import; flag for review |
| **Conflict** | Both Drive and repo have new changes, OR repo has a manual edit variant (e.g., `lets-build-v2.md`) | Do NOT import; flag for manual review |
| **Missing** | Repo has no stable file for this section | Import from Drive **after approval** |
| **Ambiguous** | Dates unclear, Drive has multiple candidates, SHA mismatch with same date | Pause; report to user; do not import |

Classification is required before any file is touched.

### Evidence for Repo-newer

Evidence that repo may be newer than Drive includes:

- file has commits after the last `imported_at` timestamp
- file contains metadata newer than the manifest
- file contains manual cleanup, image fixes, callout fixes, or reader-specific formatting
- file differs from the Drive source in ways that look intentional, not just whitespace
- file has a repo-only variant such as `lets-build-v2.md` that appears to contain newer manual work

---

## Repo-Variant Rule

If a chapter folder contains a file like `lets-build-v2.md`, `core-concepts-v2.md`, or any
`*-v2.md` alongside the stable filename, classify the corresponding section as **Conflict**
regardless of Drive dates. These files indicate the user has made manual repo edits that
exist only in the repo and have not been reconciled with the Drive source.

Do not overwrite the stable filename when a `*-v2.md` exists.

Do not delete `*-v2.md` files. Flag them in `chNN-edits.md` only after approval.

---

## Index / Reader Navigation Rule

`index.md` is the chapter landing and navigation file. It controls chapter title,
description, links, lab visibility, and Coming Soon status. It is tied to platform state,
not only manuscript state.

### Default Behavior

- `index.md` is **repo-owned by default**.
- Validate `index.md` for each requested chapter.
- Report status, flag stale links/labs/variants.
- **Do not import or overwrite `index.md` during normal `chapter-source-import` runs.**

### Drive `main/` Does Not Map to `index.md`

The Drive `main/` folder maps **only** to `core-concepts.md`. Never treat `main/` as the
source for `index.md`.

### Optional Explicit Index Import

If Nim wants to maintain index drafts in Google Drive, they must live in a separate
folder:

```
chapter-drafts/chNN/index/chNN-index-YYYY-MM-DD.md
```

or:

```
chapter-drafts/chNN/chapter-index/chNN-index-YYYY-MM-DD.md
```

These may map to repo `index.md` **only** in an explicit approved mode:

```
import-index-approved
```

Before overwriting any repo `index.md`, show:

1. current repo `index.md`
2. proposed Drive index draft
3. diff summary
4. broken/stale link check
5. lab visibility check

Then stop for approval.

### Validation Checklist

For each chapter in scope, validate `index.md` by checking:

- Chapter title is present and accurate
- Chapter description is present and not obviously outdated
- Links point to stable repo filenames — not dated Drive-source filenames:
  - `core-concepts.md`
  - `lets-build.md`
  - `review-questions.md`
  - `terms-treasury.md`
  - `rat.md`
- Lab links are visible only when the student-facing lab file is confirmed ready
- Commented-out lab links (`<!-- ... -->`) are flagged if they appear stale
- Repo-only variants (e.g., `lets-build-v2.md`) are noted if `index.md` still links
  to the base filename (`lets-build.md`)

### Index Status Classification

| Status | Meaning |
|---|---|
| Current | Links and description are accurate |
| Needs review | Links work, but description, lab status, or variant files need review |
| Missing | `index.md` does not exist |
| Broken links | One or more linked files do not exist in the repo |
| Stale lab note | Lab comment or link does not match current lab readiness state |

Report the classification for each chapter in the reconciliation summary.

Do not regenerate `index.md` unless Nim explicitly approves.

---

## Manifest Format

File: `books/database-book/files/manifests/source-import-manifest.csv`

Use this as the official technical ledger. Do not rely only on filename dates.

Columns:
```
content_id, component, source_path, source_filename, source_date, source_sha256,
destination_path, imported_at, status, notes
```

- `content_id` = chapter slug (e.g., `introduction-to-course`)
- `component` = section type: `main`, `lets-build`, `terms`, `reflection`, `rat`
- `source_sha256` = SHA256 of the Drive source file at import time
- `imported_at` = ISO-8601 UTC timestamp
- `status` = `imported-normalized` (standard import), `skipped-current`, `conflict-not-imported`

Append a new row for every section imported. Do not modify existing rows.

If the existing CSV columns differ, preserve the existing format and update consistently.

Do not replace this manifest with `.sync-manifest.json`.

---

## Manifest / Status / Metadata Rules

Avoid date drift. Use the three records this way:

| Record | Purpose |
|---|---|
| `source-import-manifest.csv` | Technical ledger: source file, source date, hash, destination, import timestamp |
| Top-of-file metadata comment | Quick per-file source date stamp |
| `chapter-section-status.md` | Human-readable reader-readiness dashboard |

The status file must not invent dates unsupported by the manifest, metadata comment,
or verified Drive source.

---

## Chapter Section Status Dashboard

Create or update:

```
books/database-book/.edits/chapter-section-status.md
```

Use this table format:

```
# Chapter Section Status

Last updated: <YYYY-MM-DD>

## Status Legend

| Status | Meaning |
|---|---|
| Ready | Safe to show students in the reader |
| Current | Repo matches latest known source or is already current |
| Imported | Imported to repo but not fully reviewed |
| Drive newer | Drive appears newer and may be safe to import |
| Repo newer | Repo appears newer or more polished than Drive |
| Needs review | Exists but needs Nim's review |
| Conflict | Drive and repo both appear changed; manual merge needed |
| Ambiguous | Cannot determine the correct source |
| Draft in Drive | Draft exists in Drive but has not been imported |
| Coming soon | Placeholder/student-facing future section |
| Missing | Required section does not exist yet |
| Blocked | Cannot proceed until issue is resolved |

## Section Status Table

| Chapter | Section | Reader Status | Notes | Date |
|---|---|---|---|---|
```

Use `Date` to mean the latest verified Drive source date for that section, supported by
the manifest, metadata comment, or inspected Drive source.

For each active chapter, include rows for:

```
Core Concepts
Let's Build
Terms Treasury
Review Questions
RAT
Lab
Index / Reader Navigation
```

For future chapters, use either section-level rows or chapter-level Coming Soon rows,
depending on maintainability.

---

## Lab Answer Safety

Lab answer files must not be exposed in student-facing source folders.

Answer files are allowed only inside instructor-only folders such as:

```
books/database-book/files/source/labs/lab-NN-slug/instructor/
```

### Safety Check

Search under `books/database-book/files/source/` for risky filename patterns:

```
answers
answer-key
solutions
instructor-solutions
```

### Rules

- If an answer file exists at a lab root **and** the same file exists in `instructor/`:
  delete the root-level copy only after approval.
- If an answer file exists at a lab root **and does not** exist in `instructor/`:
  move it there only after approval.
- Do not delete embedded answer keys inside `review-questions.md` or `rat.md` unless
  Nim explicitly changes that decision.
- Do not move or delete files without approval unless explicitly instructed.

---

## Edit Log

Update `books/database-book/.edits/edit-log.md` only after approved implementation.

Record:

- source reconciliation completed
- sections imported or skipped based on comparison
- `source-import-manifest.csv` updated if imports occurred
- `chapter-section-status.md` created or updated
- lab answer exposure fixed or verified
- repo-only variants flagged for review

Do not record reader build, homepage, Coming Soon, deployment, Supabase, or Stripe
in this skill.

---

## Chapter Tracker

Update `books/database-book/.edits/chapter-tracker.md` only if meaningful chapter-level
status changed.

Do not add noise for every small file import.

---

## Phase 0 — Git / Working Tree Safety

Before inspecting or changing files, report:

- current branch
- `git status`
- uncommitted changes
- untracked files

Do not auto-create or switch branches.

If the working tree contains unrelated user changes, stop and ask.

Suggested branch for later use, only after approval:

```
launch/chapter-source-import
```

or for a specific range:

```
launch/ch01-ch04-reconciliation
```

---

## Phase 1 — Preflight Inspection

Inspect these files and folders:

- `books/database-book/files/source/chapters/`
- `books/database-book/files/source/labs/`
- `books/database-book/book.yml`
- `books/database-book/files/source/outline/chapter-registry.yml`
- `books/database-book/files/manifests/source-import-manifest.csv`
- `books/database-book/.edits/edit-log.md`
- `books/database-book/.edits/chapter-tracker.md`
- `books/database-book/.edits/chapter-section-status.md`
- `books/database-book/scripts/import-latest-drafts.ps1`

Also check for:

- `.sync-manifest.json` files
- lab answer files outside instructor folders
- repo-only variants such as `lets-build-v2.md`

Report findings before making changes.

---

## Phase 2 — Scope

Ask or determine:

1. Which chapters to reconcile (e.g., Ch01–Ch04, or a single chapter)
2. Mode: **Reconcile + Import** or **Dry Run (report only)**
3. Whether to include labs in the reconciliation check

If no answer is given, default to Dry Run mode for safety.

---

## Phase 3 — Drive Preflight

For each chapter in scope:

1. List all Drive section subfolders (`main/`, `lets-build/`, `terms/`, `reflection/`, `rat/`)
2. Identify the latest dated file in each subfolder (highest date in filename)
3. List any `*-v2.md` or other variant files in the repo chapter folder
4. Read the `<!-- metadata: date="..." -->` comment from each repo stable file
5. Check the manifest for the last imported SHA for each section

Report the full comparison table before proceeding.

---

## Phase 4 — Classify Each Section

Using the Drive date, repo metadata date, manifest SHA, and git working tree status,
assign a classification to every section. Present the full table to the user:

```
| Chapter | Section | Drive Date | Repo Metadata | Manifest | Classification | Action |
|---|---|---|---|---|---|---|
| Ch01 | Core Concepts | 2026-06-05 | 2026-06-05 | ✓ | Current | None |
| Ch04 | Let's Build | 2026-06-13 | 2026-06-02 | ✓ | Conflict | Flag; no import |
```

Do not proceed to Phase 5 without user confirmation of the classification table.

---

## Phase 5 — Required Pre-Implementation Report

Before making changes, output this report and wait for approval:

```
## Chapter Source Import Preflight

### Git / Working Tree
- Current branch:
- Working tree status:
- Uncommitted changes:
- Untracked files:
- Recommendation:

### Repo Findings
- Chapter source folder:
- Lab source folder:
- Import script:
- Manifest:
- Chapter-section status file:
- Existing `.sync-manifest.json` files:
- Answer-file exposure:
- Repo-only variants:

### Chapters and Sections Checked

| Chapter | Section | Latest Drive File | Drive Date | Repo File | Manifest Date | Metadata Comment | Repo Evidence | Classification | Recommended Action |
|---|---|---|---|---|---|---|---|---|---|
| ChNN | Core Concepts |  |  | core-concepts.md |  |  |  |  |  |
| ChNN | Let's Build |  |  | lets-build.md |  |  |  |  |  |
| ChNN | Terms Treasury |  |  | terms-treasury.md |  |  |  |  |  |
| ChNN | Review Questions |  |  | review-questions.md |  |  |  |  |  |
| ChNN | RAT |  |  | rat.md |  |  |  |  |  |

### Lab / Index Readiness Checked

| Chapter | Item | Status | Notes |
|---|---|---|---|
| ChNN | Lab |  |  |
| ChNN | index.md |  |  |

### Proposed Changes
- Files safe to import:
- Files to leave unchanged:
- Files needing manual review:
- Files needing lab safety cleanup:
- Tracking files to update:

### Not Included
- Reader build
- Homepage text
- Coming Soon implementation
- Commit/push/deploy
- Supabase/Auth
- Stripe/payment

### Risks / Questions
- ...

Approve? Reply `yes`, `dry run only`, or `revise`.
```

Do not make changes before approval.

---

## Phase 6 — Import (Safe Sections Only)

If the user approves implementation, import only sections classified as **Drive-newer**
or **Missing**.

Do not import sections classified as **Current**, **Repo-newer**, **Conflict**, or
**Ambiguous**.

For every imported file:

1. Read the Drive source file
2. Strip YAML frontmatter if present (only if the existing importer already does this safely)
3. Preserve meaningful repo-compatible formatting where possible
4. Add or replace the metadata comment on line 1:
   ```text
   <!-- metadata: date="YYYY-MM-DD" -->
   ```
5. Write to the repo stable filename
6. Compute SHA256 of the Drive source file
7. Append a row to `source-import-manifest.csv`
8. Update `chapter-section-status.md`

---

## Phase 7 — Flag Conflicts and Repo-newer

For every section not imported, flag in the chapter's edit notes file:
`books/database-book/.edits/chNN-edits.md`

Include:
- Section name and classification
- Drive date vs. repo metadata date
- What manual variant file exists (if any)
- Recommended next action (merge, archive, delete, or keep reviewing)

---

## Dry Run / Drift Report Mode

When mode is **Dry Run**:
- Run all Phases 0–4 (preflight, Drive scan, classification)
- Do NOT write any files
- Print the full classification table and a summary
- Note which sections would be imported and which would be flagged

Use Dry Run when:
- Running the first reconciliation on a chapter
- Auditing the current state without making changes
- Checking for drift before a scheduled import

---

## Handoff Report

End every run with:

```
## Chapter Source Import Handoff

### Mode
preflight / dry-run / reconcile / drift-report / import-approved / status-dashboard / lab-safety / logs-only / handoff

### Chapters Checked
- ...

### Imported
- ...

### Left Unchanged
- ...

### Repo Newer / Conflicts / Ambiguous
- ...

### Lab Safety
- ...

### Tracking Updated
- `source-import-manifest.csv`: yes/no
- `chapter-section-status.md`: yes/no
- `edit-log.md`: yes/no
- `chNN-edits.md`: yes/no
- `chapter-tracker.md`: yes/no

### Not Done
- Reader build
- Homepage text
- Coming Soon implementation
- Commit/push/deploy
- Supabase/Auth
- Stripe/payment

### Next Recommended Step
- ...
```

---

## Common Scenarios

### "ch04 Let's Build has both a Drive file and a v2 in the repo"
→ Classify as **Conflict**. Flag in `ch04-edits.md`. Do not import until user decides whether to:
  - Keep v2.md as the canonical version (update manifest date, remove v2 variant)
  - Merge v2.md edits into the Drive file
  - Archive v2.md and import from Drive

### "Drive has a new file dated today but it appears to be a copy of an older file"
→ Check content or SHA. If content matches the already-imported version, classify as **Current**.
  Do not import a file just because its filename date is newer.

### "A section is missing from the repo but exists in Drive"
→ Classify as **Missing**. Import directly after approval.

### "Repo metadata date is newer than Drive latest file"
→ Classify as **Repo-newer**. The user has edited the repo file directly. Flag and do not import.

---

## Absolute Stop Rules

Stop and ask before proceeding if:

- a requested Drive source file is missing
- multiple ambiguous Drive files could be latest
- the repo file appears newer than Drive
- both repo and Drive changed since last import
- the importer would create dated repo production files
- the importer would create `.sync-manifest.json`
- the importer would overwrite unexpected files
- lab answer files would remain exposed
- the reader would expose instructor answer files
- the working tree contains unrelated user changes
- any reader build / homepage / Coming Soon work is about to begin
- any Supabase or Stripe work is about to begin
- a commit, push, merge, or deploy is needed

---

## Existing Import Script

The repo may contain:

```
books/database-book/scripts/import-latest-drafts.ps1
```

The script may be used for dry-run/discovery if appropriate.

Do not run it in execution mode until after reconciliation is complete and approved.

If the script cannot distinguish **Repo-newer**, **Conflict**, or **Ambiguous**,
then do not use it for execution without explicit approval.

If the script would create dated repo production files or `.sync-manifest.json`, stop.

---

## Final Contract

This skill exists to make Drive-to-repo import safer, not faster at the expense of
correctness.

The correct default behavior is:

```
inspect → compare → classify → ask → import only safe updates → update records → stop
```

The workflow boundaries are:

```
chapter-source-import = Drive draft reconciliation/import
chapter-production-flow = chapter production lifecycle
book-deploy = reader build/deploy
v2A work = Supabase/Stripe
```
