---
name: chapter-tracker
description: >
  View and update the BITM330 chapter tracker. Use when: checking what work is pending for a chapter
  or any book-level task; adding a new todo; marking a task complete; moving a finished row to the
  archive; reviewing overall book progress. Do NOT read the Archive section unless explicitly asked.
argument-hint: Optional chapter number or task (e.g., "Ch05", "mark Ch04 images complete", "add skill todo")
---

# BITM330 Chapter Tracker

**Tracker file:** `.docs/.edits/chapter-tracker.md`

---

## Step 1 — Read the Active section only

Open and read the tracker. Stop at the `## Archive` heading — do not read below it.

```text
G:\My Drive\0-Projects\!-important\BITM330-book-drive\.docs\.edits\chapter-tracker.md
```

The Active table is a single flat table with a **Category** column. Categories are:

- **Chapters** — chapter main manuscripts (Ch column contains chapter number)
- **Skills** — `.agents/skills/` SKILL.md files
- **Images** — figure generation and placement tasks
- **Build** — DOCX build scripts and outputs
- **Book Structure** — Let's Build outlines, Labs section, TOC
- **General** — quality audits, configuration files, cross-cutting tasks

For non-chapter rows, the Ch column is `—`.

---

## Step 2 — Identify the task

Determine what the user needs:

- **View progress** — summarize the Active table: list all rows with pending Next items, grouped by Category.
- **Add a todo** — append `· item` to the Next cell of an existing row, or insert a new row with the correct Category.
- **Mark complete** — follow Step 3.
- **Move row to archive** — follow Step 4.

---

## Step 3 — Mark a next action complete

When a specific next action is done:

1. Remove the completed item from the Next cell.
2. Update the Done cell with a one-line summary of what was done.
3. Update the Updated date to today.
4. Append one line to the Archive table:

```
| YYYY-MM-DD | ChNN | one-line description of what was done |
```

5. If the Next cell is now empty, follow Step 4.

---

## Step 4 — Move a completed row to Archive

When a chapter's Next cell is empty:

1. Delete the row from the Active table.
2. Add a final archive line:

```
| YYYY-MM-DD | ChNN | Chapter complete — all tracked tasks done |
```

---

## Step 5 — Confirm

Report back briefly:
- What row was updated or added.
- Current state of the Next cell for that chapter.
- No need to print the full table unless the user asks.
