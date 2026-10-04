---
name: chapter-sync
description: >
  Incrementally sync the latest canonical chapter files (5 sections + lab questions) from the
  BITM330 editing repository into the dima-publishing platform chapter folder as flat files.
  Copies only what changed, deletes superseded dated files, detects target-side conflicts via a
  per-chapter .sync-manifest.json, and regenerates index.md. Supports --dry-run, --force, --all.
argument-hint: Chapter number or folder name plus optional flags (e.g., "03", "ch04-databases", "--all", "--dry-run", "--force")
---

# Chapter Sync: Incrementally Copy Chapter Files to Platform

Sync the canonical chapter section files from the BITM330 editing repository into the
dima-publishing platform chapter folder. Each chapter becomes a flat folder containing the
five dated section files (main, lets-build, reflection, terms, rat), an optional **lab
questions** file, a generated `index.md`, and a hidden `.sync-manifest.json` that tracks
what was synced.

This skill is **incremental and safe**:

- Copies a file only when the source is newer or the destination is missing.
- Deletes the superseded older dated file so only one current file per section remains.
- Detects when the destination copy was edited independently (a **conflict**) before
  overwriting it.
- Never runs the heavy `bookData` regeneration automatically -- it only offers it.
- Syncs lab **questions only**. Lab **answers are instructor-only and never copied.**

**Source (always):** `G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts`

**Lab source (always):** `G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\Labs-draft`

**Destination (always):** `C:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\files\source\chapters`

---

## Expected Chapter Structure

```
chNN-slug/
├── index.md                          # Generated -- links to the files below
├── .sync-manifest.json               # Generated -- tracks source, date, hash per file
├── chNN-main-YYYY-MM-DD.md           # Copied from source main/
├── chNN-lets-build-YYYY-MM-DD.md     # Copied from source lets-build/
├── chNN-reflection-YYYY-MM-DD.md     # Copied from source reflection/
├── chNN-terms-YYYY-MM-DD.md          # Copied from source terms/
├── chNN-rat-YYYY-MM-DD.md            # Copied from source rat/
└── lab-NN-questions-YYYY-MM-DD.md    # Optional -- copied from Labs-draft (questions only)
```

Flat files only. The lab questions file is present only for chapters that have a lab.
`images/` is **not** managed by this skill.

---

## Out of Scope: Front Matter

This skill syncs **numbered chapter folders only** (`chNN-slug/`). Front-matter and
cover folders are **repo-native**: they are authored and edited directly in the platform
repo, have no upstream source in the editing repository, and are **never synced**.

Examples (do not sync, do not list as candidates, do not create manifests for):

- `0-cover-image/`
- `01-acknowlgements/` (for example `00-preface.md`, `00-acknowlgements.md`)

These folders have no `chNN`-prefixed dated section files, so `--all` already skips them
because no matching source folder exists. Editing them directly in the repo is the correct
workflow. If one of these files ever needs an upstream source, that is a separate decision --
do not fold it into chapter sync.

---

## How the "Latest File" Is Determined

To find the **latest canonical file** for a section in the legacy source:

1. List all `.md` files in the legacy section subfolder (`main/`, `lets-build/`, etc.)
2. Filter for files matching the canonical pattern: `chNN-<section>-YYYY-MM-DD.md`
3. **Exclude** all non-canonical files:
   - `chNN-edit-*`
   - `chNN-rewrite-*`
   - `chNN-*-concepts.md`
   - `chNN-edited-*`
   - `chNN-main-edited-*`
   - `chNN-main-rewritten-*`
   - `chNN-rewrite-claude-*`
   - `chNN-TermTreasury-*`
   - `*-draft*.md`, `*-outline*.md`
   - Bare undated `chNN-<section>.md`
   - Any file lacking a `YYYY-MM-DD` date in the canonical position
4. From matching files, extract the `YYYY-MM-DD` date from the filename
5. Select the file with the most recent date
6. If no canonical dated file is found, the section has **no source file available**

The same rule applies to the lab questions file in `Labs-draft/` (see Lab Questions below).

---

## Lab Questions (Questions Only -- Never Answers)

Each chapter that has a lab gets its **questions** file copied into the chapter folder as an
optional sixth file. Answers are **never** synced.

- **Lab source folder:** `Labs-draft/lab-NN-<slug>/`
- **File to copy:** the latest canonical `lab-NN-questions-YYYY-MM-DD.md`
- **Lab number = chapter number.** ch01 -> lab-01, ch05 -> lab-05, ch08 (midterm) -> lab-08.
- Chapters with **no** `lab-NN-questions-*.md` (e.g., ch16, ch17, or any chapter without a
  lab) simply skip the lab file -- this is not an error.

**Hard exclusion rule (safety):** never copy, list as a candidate, or reference any file
matching `*-answers-*`. Lab answers stay in `Labs-draft/` only. If a destination chapter
folder somehow contains an `*-answers-*` file, flag it in the report as an exposure risk and
recommend deletion -- do not silently ignore it.

The copied questions file is linked from `index.md` under a **Lab** heading.

---

## `.sync-manifest.json`

Each destination chapter folder holds a hidden `.sync-manifest.json` that records what was
synced. It powers fast skip decisions and conflict detection.

```json
{
  "chapter": "ch01-introduction-to-course",
  "last_sync": "2026-06-06T14:00:00Z",
  "files": {
    "main":       { "source": "...\\main\\ch01-main-2026-06-03.md",        "source_date": "2026-06-03", "synced_at": "2026-06-06T14:00:00Z", "hash": "sha256:..." },
    "lets-build": { "source": "...\\lets-build\\ch01-lets-build-2026-06-03.md", "source_date": "2026-06-03", "synced_at": "...", "hash": "sha256:..." },
    "reflection": { "source": "...", "source_date": "...", "synced_at": "...", "hash": "sha256:..." },
    "terms":      { "source": "...", "source_date": "...", "synced_at": "...", "hash": "sha256:..." },
    "rat":        { "source": "...", "source_date": "...", "synced_at": "...", "hash": "sha256:..." },
    "lab":        { "source": "...\\Labs-draft\\lab-01-petvax-intro\\lab-01-questions-2026-06-03.md", "source_date": "2026-06-03", "synced_at": "...", "hash": "sha256:..." }
  }
}
```

- `hash` is the SHA-256 of the **destination** file content at the time it was last written
  by this skill.
- If the manifest is missing, treat every section as **NEEDS SYNC** and fall back to
  filename-date comparison only (no conflict detection possible on the first run).
- Write the manifest after a successful sync.

---

## Incremental Rules

For each section (and the lab questions file):

1. **Skip (CURRENT)** when the latest source date equals the manifest `source_date` **and**
   the destination file still exists with the recorded name.
2. **Copy (NEEDS SYNC)** when the latest source date is newer than the manifest `source_date`,
   or the destination file is missing, or there is no manifest entry.
3. **Delete superseded:** after copying a newer dated file, delete the older dated file for
   that same section so exactly one current file per section remains.
4. **Regenerate `index.md`** only when a filename changed this run or `index.md` is missing.
5. **Conflict (CONFLICT):** before overwriting, hash the current destination file and compare
   it to the manifest `hash`. If they differ, the destination was edited independently --
   do not overwrite silently (see Conflict Handling).

Sync is **one-directional** (source -> target). This skill never copies changes back from
the destination into the editing repository.

---

## Conflict Handling

A **CONFLICT** means the destination file's current content does not match the hash recorded
in the manifest -- someone edited the published copy directly (for example, a Cloudinary link
fix made on the platform side).

When a conflict is detected for a file that also has a newer source:

1. Mark it **CONFLICT** in the comparison report (do not auto-copy).
2. Warn the user and offer choices:
   - **Overwrite** with the source version (loses the target-side edit).
   - **Keep target** (skip this file; leave the destination as-is).
   - **Show diff** (display source vs. destination so the user can decide).
3. Apply only the chosen action. Never reverse-sync the target edit back to source.
4. `--force` overrides conflict detection and overwrites without asking (see Modes & Flags).

---

## Procedure

### 1. Parse arguments

Separate the chapter token from any flags. Recognized flags: `--all`, `--dry-run`, `--force`
(see Modes & Flags). The remaining token resolves the chapter:

- Just the number: `"03"` -- scan the destination root for a folder starting with `ch03-`
- Short prefix: `"ch03"` -- same resolution
- Full folder name: `"ch04-databases"` -- used as-is
- The literal `"--all"` -- process every chapter folder that has a matching source

Resolve against the destination root, then find the matching source folder with the same
name. If the destination folder does not exist yet, create it (unless `--dry-run`). If the
source folder does not exist, report the error and list available source chapter folders.

### 2. Read the manifest

Load `.sync-manifest.json` from the destination chapter folder if present. Use it to decide
CURRENT vs NEEDS SYNC quickly and to enable conflict detection. If it is missing, treat all
sections as NEEDS SYNC and skip conflict detection for this run.

### 3. Scan source sections and lab

For each of the 5 canonical sections (main, lets-build, reflection, terms, rat), find the
latest canonical dated file in the source chapter's subfolder. Then look up the matching
`Labs-draft/lab-NN-<slug>/` folder and find the latest `lab-NN-questions-*.md` (questions
only; **never** `*-answers-*`).

Build a map: `section -> { filename, date, fullPath }`, plus an optional `lab` entry.

### 4. Scan destination and classify each file

For each section and the lab, compare source date, manifest entry, and destination file to
assign a status:

- **CURRENT** -- source date matches manifest and destination file exists. No action.
- **NEEDS SYNC** -- source is newer, or destination/manifest entry missing.
- **NEW** -- no destination file and no manifest entry yet (first sync of this section/lab).
- **CONFLICT** -- destination file content hash differs from the manifest hash (edited on
  the platform side). Requires a decision before overwriting.

### 5. Lightweight link audit (flag-only)

Scan the **main** file being synced for likely link problems and list them in the report.
Never fix them here -- just flag and recommend `chapter-media`:

- Raw Windows paths (`G:\...`, `C:\...`) used as image or link targets.
- Stale folder-name references that no longer match the chapter slug.
- Images with no Cloudinary URL when sibling images in the same file use Cloudinary.

### 6. Build the comparison report

```
-- ch01-introduction-to-course -------------------------------------

  Section     Source date   Destination            Status
  main        2026-06-03    ch01-main-2026-06-02.md NEEDS SYNC
  lets-build  2026-06-03    ch01-lets-build-2026-06-03.md CURRENT
  reflection  2026-06-03    ch01-reflection-2026-06-03.md CURRENT
  terms       2026-06-03    ch01-terms-2026-06-03.md      CURRENT
  rat         2026-06-03    ch01-rat-2026-06-03.md        CURRENT
  lab (q)     2026-06-03    lab-01-questions-2026-06-02.md NEEDS SYNC
  index.md                  (regenerate -- filenames changed)

  Changed this run: main, lab questions
  Flagged links:    1 raw Windows path in main -> recommend chapter-media
```

If any file is **CONFLICT**, call it out prominently above the table.

### 7. Ask before proceeding

> "Sync ch01? Will copy 2 file(s) (1 overwrite), delete 1 superseded file, and regenerate
> index.md. Proceed?"

Only proceed if the user confirms. In `--dry-run`, stop here and report what *would* happen.

### 8. Execute

For each NEEDS SYNC / NEW file (and each CONFLICT the user chose to overwrite):

1. Copy the source file into the destination chapter folder (flat).
2. Delete the superseded older dated file for that section, if any.
3. Record the new `source`, `source_date`, `synced_at`, and destination `hash` in the
   manifest.

Then:

4. Regenerate `index.md` if any filename changed or it is missing.
5. Write `.sync-manifest.json`.
6. Never copy any `*-answers-*` file under any circumstance.

### 9. Confirm

Show the final flat chapter folder listing and a summary of what was copied, deleted,
skipped, flagged, and any conflicts. Then offer the downstream build (see below).

---

## `index.md` Format

```markdown
# Chapter 1: Introduction to the Textbook

This chapter is your map for the book. It explains where the book is going, what you will
build, which tools you will use, and why this material matters for business students.

## Chapter Files

- [Main Chapter](ch01-main-2026-06-03.md)
- [Let's Build](ch01-lets-build-2026-06-03.md)
- [Review & Reflection](ch01-reflection-2026-06-03.md)
- [Terms Treasury](ch01-terms-2026-06-03.md)
- [Readiness Assessment Test](ch01-rat-2026-06-03.md)

## Lab

- [Lab 1 Questions](lab-01-questions-2026-06-03.md)
```

The description is taken from the first substantive paragraph of the main chapter file. The
file links use the actual filenames copied into the folder. Omit the **Lab** heading
entirely for chapters that have no lab questions file.

---

## Modes & Flags

- **`--dry-run`** -- read-only preview. Run steps 1-6, print the comparison report and what
  *would* change, then stop. Copy nothing, delete nothing, write no manifest.
- **`--force`** -- skip the date check and conflict detection; overwrite every destination
  file with the latest source and rewrite the manifest. Use to repair a corrupted or
  drifted destination. Still never copies `*-answers-*`.
- **`--all`** -- process every chapter (see below). Combine with `--dry-run` to preview the
  whole book.

Flags may be combined (e.g., `--all --dry-run`). Without flags, the skill runs incrementally
and asks before writing.

---

## Downstream Build (offer, never automatic)

The platform's `generateBookData.ts` reads `files/source/chapters` and regenerates
`src/generated/bookData.ts`. This is the heavy "rebuild everything" step and is **out of the
file-sync path**.

After a sync that changed at least one file, list the changed chapters and **offer** to run
the generator:

> "Synced ch01 (2 files changed). Run `npm run generate` to rebuild bookData.ts now? (yes / no)"

Run it only with explicit approval. Never run it automatically, and never run it in
`--dry-run`.

---

## `--all` Mode

When invoked with `--all`, process every chapter folder that has a matching source. Print a
compact one-line status per chapter:

```
ch01  2 copied  1 deleted  index regen   lab synced   DONE
ch02  0 copied  0 deleted  CURRENT                     SKIP
ch03  1 copied  1 deleted  index regen                 DONE
ch04  CONFLICT in main -- needs decision                HOLD
ch16  no lab questions -- sections only                DONE
...
```

Summary at the end:

```
3 chapters synced . 12 current . 1 conflict held . 0 errors
```

Then ask: "Sync all chapters with pending changes? (yes / select chapters / no)". Resolve
any CONFLICT chapters individually before overwriting them.

---

## Edge Cases

- **Chapter folder not found in source**: Report error and list available source chapter
  folders.
- **No canonical files in a section**: Skip that section; note it in the report.
- **Section subfolder missing**: Same as above -- skip the section.
- **No lab questions file**: Skip the lab file; this is normal for ch16, ch17, and any
  chapter without a lab. Do not treat as an error.
- **`*-answers-*` found in destination**: Flag as an exposure risk and recommend deletion;
  never create or keep one via this skill.
- **Missing manifest**: Treat all sections as NEEDS SYNC; compare by filename date; skip
  conflict detection for this run; write a fresh manifest after syncing.
- **CONFLICT**: Do not overwrite without a decision (overwrite / keep target / show diff),
  unless `--force` is set.
- **Destination folder doesn't exist**: Create it (unless `--dry-run`).
- **Already current**: Report all files CURRENT and skip copying. Still regenerate
  `index.md` if missing.
- **Partial sync**: Copy only the sections that are NEEDS SYNC; leave CURRENT ones alone.

---

## Verification

After syncing, verify:

1. Exactly **one** current dated file per section exists in the chapter folder (superseded
   files deleted), with dates matching the latest source.
2. The lab questions file (if any) is present and **no** `*-answers-*` file exists in the
   destination.
3. `index.md` exists with links to all synced files (using actual filenames), with the
   **Lab** heading only when a lab file is present.
4. `.sync-manifest.json` is written with a `source`, `source_date`, `synced_at`, and `hash`
   for each synced file.

---

## Cross-Skill Handoff

In `chapter-editor`, after a main file edit is approved and ready for publishing, suggest:

```
**Handoff:** Run `chapter-sync` to copy the latest chapter files to the platform,
regenerate index.md, and (optionally) rebuild bookData.ts.
```

Lab questions come from `Labs-draft/` produced by `lab-creation`. Image/link issues flagged
during sync are handed off to `chapter-media`, not fixed here.
