---
name: edits
description: >
  Manage the .edits file for a BITM330 chapter. Use when: adding new edit notes or flagged content
  to a chapter's edit file; reviewing pending edits for a chapter; incorporating edit entries into
  the chapter main draft; archiving completed edits. One edit file per chapter in .edits/.
argument-hint: Chapter number or edit file path (e.g., "ch05", "ch05-edits-2026-05-13.md")
---

# BITM330 Edits Skill

**Book:** *Using Data to Drive Business Performance: Databases and Management Information Systems*

This skill manages the `.edits` file for a single chapter. It does not edit the main chapter manuscript except during Incorporate mode.

---

## Edit File Contract

Each chapter has **exactly one** edit file:

```
chapter-drafts/chNN-<slug>/.edits/chNN-edits-<YYYY-MM-DD>.md
```

Rules:
- **One file per chapter.** No multiple dated files.
- **Filename date = date last updated.** Rename the file whenever you touch it if today's date differs from the current filename date.
- **New entries go at the top** of the active section, newest first.
- **Archived entries live at the bottom** under `# Archive` (H1).

Standard file structure:

```markdown
# Ch[NN] Edit Notes

## YYYY-MM-DD — [newest entry label]
*[brief context note]*

[content]

---

## YYYY-MM-DD — [older entry label]
*[brief context note]*

[content]

---

# Archive

## YYYY-MM-DD — [incorporated entry label]
*Incorporated into ch[NN] main on YYYY-MM-DD.*

[content]

---
```

---

## Step 1 — Locate the Edit File

1. Look in `chapter-drafts/chNN-<slug>/.edits/` for a file matching `chNN-edits-*.md`.
2. At most one such file should exist per chapter.
3. If multiple files exist, stop and tell the user: "Found multiple edit files for Ch[NN]. Please consolidate them before proceeding."
4. If the file's date is not today and you are about to write to it, rename it to `chNN-edits-<today>.md` before making any changes.

---

## Step 2 — Determine the Operation

Ask the user (or infer from context) which mode is needed:

| Mode | When to use |
|---|---|
| **Add** | Adding a new edit note, suggestion, or moved content to the edit file |
| **Review** | Showing the user all pending (non-archived) entries without modifying the file |
| **Incorporate** | Merging a pending entry into the chapter main draft and archiving it |

---

## Step 3 — Add Mode

Use when adding a new entry to the edit file.

1. Locate the edit file (Step 1). Rename if needed.
2. Insert a new H2 block at the **top** of the file, below the H1 title and before any existing entries:

```markdown
## YYYY-MM-DD — [short label describing the edit]
*[brief context: where this came from, what needs to happen with it]*

[edit content here]

---
```

3. If no edit file exists yet, create `chNN-edits-<today>.md` with the full structure:

```markdown
# Ch[NN] Edit Notes

## YYYY-MM-DD — [short label]
*[brief context]*

[edit content here]

---
```

4. Confirm back to the user: "Added to `chNN-edits-<today>.md`."
5. Ensure the chapter's row in `.docs/.edits/chapter-tracker.md` has `· Review .edits/chNN-edits-<today>.md and integrate` in its Next cell. If no row exists, add one.

---

## Step 4 — Review Mode

Use when the user wants to see what is pending for a chapter.

1. Read the edit file.
2. Identify all H2 entries that appear **before** the `# Archive` heading. These are pending.
3. List each pending entry as:
   - **Date:** YYYY-MM-DD
   - **Label:** [entry label from H2]
   - **Summary:** one sentence describing the content
4. Do **not** modify the file.
5. If there are no pending entries, report: "No pending edits for Ch[NN]."

---

## Step 5 — Incorporate Mode

Use when the user wants to merge a pending edit into the chapter main draft.

### 5a — Identify the entry

Ask the user which entry to incorporate (by label, date, or "the first one"). If only one pending entry exists, use it without asking.

### 5b — Read the chapter main file

Find the most recent dated file in `chapter-drafts/chNN-<slug>/main/`. Read it to understand the current structure.

### 5c — Insert into the main file

Based on the edit content:
- Find the most appropriate placement in the main file (match to the relevant section by topic).
- Insert the content cleanly, preserving the chapter's heading hierarchy and style.
- If the placement is ambiguous, ask the user before inserting.

### 5d — Update the edit file

1. Remove the H2 entry from the active section of the edit file.
2. Rename the edit file to `chNN-edits-<today>.md` if the date differs.
3. Append to the bottom of the file, under `# Archive` (create the section if it does not exist):

```markdown
## YYYY-MM-DD — [label]
*Incorporated into ch[NN] main on <today>.*

[original content]

---
```

### 5e — Tracker sync

- If pending entries remain: leave the tracker row unchanged.
- If all entries are now archived: remove `· Review .edits/chNN-edits-*.md and integrate` from the Next cell.
- Update the Done cell and Updated date.

---

## Step 6 — Confirm

After any operation, confirm briefly:

- **Add:** "Added '[label]' to `chNN-edits-<today>.md`."
- **Review:** List of pending entries (see Step 4).
- **Incorporate:** "Integrated '[label]' into ch[NN] main. Entry archived in `chNN-edits-<today>.md`."
