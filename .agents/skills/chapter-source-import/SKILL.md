# Skill: chapter-source-import

**Compare-first reconciliation — Drive chapter draft → repo canonical source**

---

## Purpose

Safely reconcile Google Drive chapter draft files with the repo canonical source under
`books/database-book/files/source/chapters/`. Classifies every section before touching
any file. Never overwrites a repo file that has been manually edited or is newer than
the Drive source. Records every import in `source-import-manifest.csv`.

Use this skill to:
- Run a reconciliation pass for one or more chapters
- Import only sections that are clearly Drive-newer or Missing from the repo
- Produce a classified report without importing (Dry Run / Drift Report mode)
- Flag Conflicts and Repo-newer sections for manual review

**Do NOT use this skill for:**
- Reader builds or deploys (use `book-deploy`)
- Chapter editing (use `chapter-editor`)
- Supabase, Stripe, or platform code

---

## Paths

| Role | Path |
|---|---|
| Drive draft root | `G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\` |
| Repo canonical source | `books/database-book/files/source/chapters/` |
| Labs source | `books/database-book/files/source/labs/` |
| Manifest | `books/database-book/files/manifests/source-import-manifest.csv` |
| Edit notes | `books/database-book/.edits/` |

---

## Drive-to-Repo Section Mapping

| Drive subfolder | Drive filename pattern | Repo stable filename |
|---|---|---|
| `main/` | `chNN-main-YYYY-MM-DD.md` | `core-concepts.md` |
| `lets-build/` | `chNN-lets-build-YYYY-MM-DD.md` | `lets-build.md` |
| `terms/` | `chNN-terms-YYYY-MM-DD.md` | `terms-treasury.md` |
| `reflection/` | `chNN-reflection-YYYY-MM-DD.md` | `review-questions.md` |
| `rat/` | `chNN-rat-YYYY-MM-DD.md` | `rat.md` |

**Rule:** The repo uses stable filenames (no dates). Dated Drive filenames are used to determine the source content version only.

---

## Metadata Comment Convention

Every imported repo file must have this comment on its **first line**:

```text
<!-- metadata: date="YYYY-MM-DD" -->
```

- `YYYY-MM-DD` = date from the Drive source filename
- No YAML frontmatter
- No multi-line metadata blocks
- One metadata comment per file, always on line 1

This is the primary date stamp for reconciliation. It tells you what Drive version is in the repo without opening the file.

---

## Classification System

Before importing any file, classify every section using this table:

| Classification | Condition | Action |
|---|---|---|
| **Current** | Drive date == repo metadata date; manifest SHA matches | No action needed |
| **Drive-newer** | Drive has a newer dated file than repo metadata date | Safe to import |
| **Repo-newer** | Repo metadata date > Drive latest date | Do NOT import; flag for review |
| **Conflict** | Both Drive and repo have new changes, OR repo has a manual edit variant (e.g., `lets-build-v2.md`) | Do NOT import; flag for manual review |
| **Missing** | Repo has no stable file for this section | Import from Drive |
| **Ambiguous** | Dates unclear, Drive has multiple candidates, SHA mismatch with same date | Pause; report to user; do not import |

**Classification is required before any file is touched.**

---

## Repo-Variant Rule

If a chapter folder contains a file like `lets-build-v2.md`, `core-concepts-v2.md`, or any
`*-v2.md` alongside the stable filename, classify the corresponding section as **Conflict**
regardless of Drive dates. These files indicate the user has made manual repo edits that
exist only in the repo and have not been reconciled with the Drive source.

Do not overwrite the stable filename when a `*-v2.md` exists.

---

## Index / Reader Navigation Rule

Each chapter folder must have an `index.md`. During a reconciliation run:

1. Verify `index.md` exists in the chapter folder.
2. Check that every section file present (`core-concepts.md`, `lets-build.md`, etc.)
   has a corresponding active link in `index.md`.
3. Check for stale comments such as:
   ```text
   <!-- Lab not yet in publishing repo: ... -->
   ```
   If the lab IS present in `files/source/labs/`, flag this in the chapter's edit notes
   (`books/database-book/.edits/chNN-edits.md`). Do not edit `index.md` automatically —
   report the stale note for the user to review link paths.

---

## Manifest Format

File: `books/database-book/files/manifests/source-import-manifest.csv`

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

---

## Phase 0 — Git Pre-flight Check

Before starting, run:

```powershell
git status --short
git branch --show-current
```

Verify:
- Working branch is `main` (or the expected branch)
- No uncommitted edits to chapter source files that would conflict with an import
- If modified chapter files exist in the working tree, classify affected sections as **Conflict**
  and do not import them. Flag for the user.

---

## Phase 1 — Scope

Ask the user:

1. Which chapters to reconcile (e.g., Ch01–Ch04, or a single chapter)
2. Mode: **Reconcile + Import** or **Dry Run (report only)**
3. Whether to include labs in the reconciliation check

If no answer is given, default to Dry Run mode for safety.

---

## Phase 2 — Drive Preflight

For each chapter in scope:

1. List all Drive section subfolders (`main/`, `lets-build/`, `terms/`, `reflection/`, `rat/`)
2. Identify the latest dated file in each subfolder (highest date in filename)
3. List any `*-v2.md` or other variant files in the repo chapter folder
4. Read the `<!-- metadata: date="..." -->` comment from each repo stable file
5. Check the manifest for the last imported SHA for each section

Report the full comparison table before proceeding.

---

## Phase 3 — Classify Each Section

Using the Drive date, repo metadata date, manifest SHA, and git working tree status,
assign a classification to every section. Present the full table to the user:

```
| Chapter | Section        | Drive Date | Repo Metadata | Manifest | Classification | Action        |
|---------|---------------|------------|---------------|----------|----------------|---------------|
| Ch01    | Core Concepts | 2026-06-05 | 2026-06-05    | ✓        | Current        | None          |
| Ch04    | Let's Build   | 2026-06-13 | 2026-06-02    | ✓        | Conflict       | Flag; no import |
```

Do not proceed to Phase 4 without user confirmation of the classification table.

---

## Phase 4 — Import (safe sections only)

For sections classified as **Drive-newer** or **Missing**:

1. Read the Drive source file
2. Strip YAML frontmatter if present
3. Add or replace the metadata comment on line 1:
   ```text
   <!-- metadata: date="YYYY-MM-DD" -->
   ```
4. Write to the repo stable filename
5. Compute SHA256 of the Drive source file
6. Append a row to `source-import-manifest.csv`

For all other classifications (Current, Conflict, Repo-newer, Ambiguous): no file is written.

---

## Phase 5 — Flag Conflicts and Repo-newer

For every section not imported, create or update the chapter's edit notes file:
`books/database-book/.edits/chNN-edits.md`

Include:
- Section name and classification
- Drive date vs. repo metadata date
- What manual variant file exists (if any)
- Recommended next action (merge, archive, delete, or keep reviewing)

---

## Phase 6 — Post-Run Summary

Report to the user:
- How many sections imported
- How many sections were Current (no action needed)
- How many sections were flagged as Conflict or Repo-newer
- Whether `source-import-manifest.csv` was updated
- Whether any edit notes files were created or updated
- Any index.md stale-link issues detected

---

## Dry Run / Drift Report Mode

When mode is **Dry Run**:
- Run all Phases 0–3 (preflight, Drive scan, classification)
- Do NOT write any files
- Print the full classification table and a summary
- Note which sections would be imported and which would be flagged

Use Dry Run when:
- Running the first reconciliation on a chapter
- Auditing the current state without making changes
- Checking for drift before a scheduled import

---

## What NOT to Do

- Do not create `.sync-manifest.json` files (the repo uses `source-import-manifest.csv` only)
- Do not create dated repo files (e.g., `core-concepts-2026-06-05.md`) — stable names only
- Do not auto-create git branches
- Do not run `npm build`, `vercel deploy`, or any reader build commands
- Do not commit or push changes
- Do not modify Supabase or Stripe config
- Do not delete existing repo files (only write to stable filenames or append to manifest)
- Do not import a section whose Drive file content appears identical to an earlier version
  just because it has a newer filename date (check SHA or diff content before importing)

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
→ Classify as **Missing**. Import directly.

### "Repo metadata date is newer than Drive latest file"
→ Classify as **Repo-newer**. The user has edited the repo file directly. Flag and do not import.
