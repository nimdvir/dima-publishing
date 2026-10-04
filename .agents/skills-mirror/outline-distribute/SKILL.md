---
name: outline-distribute
description: >
  Distribute content from a book-outline candidate file into the per-chapter
  outline files (ch01-outline.md through ch16-outline.md + general-notes.md).
  Use when: a new outline candidate is dropped into the candidates folder and
  needs to be parsed into the individual chapter outline files; updating the
  chapter outlines from a revised master outline; importing chapter-level
  detail (subsections, Let's Build, Lab) from any structured outline source.
  Each target file gets a source attribution blockquote.
argument-hint: Candidate filename or "list" (e.g., "16-chapters-blueprint-deepseek-2026-07-11.md", "list", "--all")
---

# Outline Distribute

**Parse a candidate outline file → distribute to per-chapter outline files**

---

## Purpose

`outline-distribute` takes a single book-outline candidate file from the
`candidates/` folder and distributes its chapter-level content into the
individual `chNN-outline.md` files under `chapter-outline/`.

This is NOT a blind copy. It is a **parse-then-distribute** workflow that
adapts to the candidate file's structure, extracts what belongs to each
chapter, and writes clean outline files with source attribution.

Use this skill to:

- Import a new candidate outline into the chapter outline structure
- Refresh all chapter outlines from a revised master
- Extract chapter detail from any structured outline format
- Add source attribution to chapter outline files

---

## Folder Layout

```
BITM330-Book-draft/
├── 00-general/
│   └── book-outline/
│       └── candidates/          ← Source: outline candidates live here
│           ├── 16-chapters-blueprint-deepseek-2026-07-11.md
│           ├── outline-2026-06-05.md
│           ├── BITM330-book-outline-MASTER-2026-07-10.md
│           └── ... (23+ candidate files)
│
└── chapter-drafts/
    └── 0-book-outline/
        └── chapter-outline/     ← Target: per-chapter files live here
            ├── ch01-outline.md
            ├── ch02-outline.md
            ├── ...
            ├── ch16-outline.md
            └── general-notes.md
```

---

## When to Use This Skill

Use `outline-distribute` for requests like:

- Distribute the DeepSeek blueprint into chapter outlines
- Parse `BITM330-book-outline-MASTER-2026-07-10.md` into ch01–ch16 files
- Update all chapter outlines from the latest candidate
- Show me what's in the candidates folder
- Distribute all the content from `outline-2026-06-05.md`
- Refresh general-notes.md from the master outline

---

## When NOT to Use This Skill

Do not use this skill for:

| Task | Use instead |
|---|---|
| Editing individual chapter outlines by hand | Direct file edit |
| Writing chapter prose | `chapter-editor` |
| Importing Drive drafts to repo | `chapter-source-import` |
| Building the book for deployment | `book-deploy` |
| Creating a new outline from scratch | Write the candidate file first, then use this skill |

---

## Supported Modes

| Mode | Behavior |
|---|---|
| `list` | List all candidate files with brief summaries; no distribution |
| `distribute <filename>` | Parse one candidate file → update all 17 target files |
| `--all` | Distribute every candidate file sequentially (rare — use only when rebuilding) |
| `--dry-run` | Parse and show what would change; no file writes |
| `--chapter <NN>` | Distribute only the specified chapter(s) from the candidate |

---

## Step 1 — List Candidates (if requested)

If the user asks what's available, list the files in:

```
G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\00-general\book-outline\candidates\
```

For each file, read the first ~30 lines and produce a one-line summary:
- Filename
- Date (from filename if present)
- Apparent structure (e.g., "16-chapter headers", "comparison table", "migration plan")

Skip `desktop.ini`.

---

## Step 2 — Read and Classify the Candidate File

Read the FULL candidate file. Classify its structure:

### Structure Types

| Type | Signature | Distribution Approach |
|---|---|---|
| **Chapter-heading outline** | Has `# CH01:`, `## Chapter 1:`, or `### Chapter 1:` style headers for chapters 1–16 | Parse chapter-by-chapter; extract subsections, Let's Build, and Lab |
| **Numbered-section outline** | Uses `1.1`, `2.1`, `3.1` style numbering with chapter titles | Map number ranges to chapters; extract content blocks |
| **Master/merged outline** | Contains both chapter-level headers AND general book-level sections (Final Book Logic, Migration Map, etc.) | Split: chapter content → chNN files; book-level content → general-notes.md |
| **Comparison/analysis** | Side-by-side tables, recommendation text, not chapter-structured | Extract to general-notes.md only; flag as not distributable to individual chapters |
| **Migration plan** | Describes old→new chapter mapping, not chapter content | Extract to general-notes.md only |
| **Notes/collection** | Unstructured, links, bullet points, not chapter-organized | Skip or extract only identifiable chapter references |

---

## Step 3 — Determine What Goes Where

### For each chapter (CH01–CH16), identify these sections in the candidate:

1. **Chapter title** — the heading line
2. **Main Chapter Subsections** — numbered/conceptual list under the chapter
3. **Let's Build** — the hands-on activity for that chapter
4. **Lab** — the lab assignment for that chapter

### For general-notes.md, identify:

- Book-level summaries (Highlights, Final Book Logic, progression diagrams)
- Migration maps (old→new chapter tables)
- Decision provenance (which model/date produced the outline)
- Marketing/positioning text
- Cross-chapter notes that don't belong to a single chapter
- Comparison tables and analysis

---

## Step 4 — Write Target Files

For each `chNN-outline.md`, write in this canonical format:

```markdown
# CHNN: [Chapter Title]

> **Source:** `[full path to the candidate file]`

## Main Chapter Subsections

1. Subsection one
2. Subsection two
...

## Let's Build

**Let's Build N: [Title]**

[Activity description — tables, steps, deliverables as in source]

## Lab

**Lab N: [Title]**

[Lab description — deliverables, requirements as in source]
```

### Rules

1. **Preserve the source's subsection numbering and wording exactly.** Do not renumber or reword.
2. **Preserve tables, code blocks, and lists** from the source as-is.
3. **If the source lacks a Let's Build or Lab section** for a chapter, omit that heading rather than writing "TBD" or blank.
4. **If the source has extra chapter-level content** (purpose statements, learning objectives, package structure), append it under an `## Additional Detail` heading rather than dropping it.
5. **The source blockquote** must use the full absolute path to the candidate file.
6. **Overwrite the target file completely** — the candidate is the new authority for that chapter's outline.

### For general-notes.md

Write in this format:

```markdown
# General Notes — [Short Source Description]

> **Source:** `[full path to the candidate file]`
> **Date:** [date from filename or content]
> **Source model:** [if identifiable, e.g., "DeepSeek V4 Pro", "Claude", "GPT"]

---

[All book-level content from the candidate — Highlights, Final Book Logic,
Migration Maps, decision notes, positioning text, comparison tables, etc.]

---

## [Any pre-existing sections to preserve, e.g., Recommended Positioning]
```

### Rules for general-notes.md

1. **Accumulate, don't replace.** If general-notes.md already has content from a previous candidate, append the new candidate's book-level content under a new `---` separator with its own source blockquote.
2. **Deduplicate.** If the same section (e.g., "Recommended Positioning") appears in both the existing file and the new candidate, keep the existing version and note that the candidate had a duplicate.
3. **Always add a source blockquote** at the top of the contributed section.

---

## Step 5 — Verify

After writing, verify:

1. All 17 files exist: `ch01-outline.md` through `ch16-outline.md` + `general-notes.md`
2. Each chapter file starts with `# CHNN:` and a source blockquote
3. No chapter file is empty or has only a header
4. The source path in each file matches the candidate that was distributed
5. `general-notes.md` has the new content with its source blockquote

Report:
- Which candidate was distributed
- How many chapter files were updated
- What went into general-notes.md
- Any chapters that had missing sections in the source (flag for manual review)

---

## Candidate File Inventory (as of 2026-07-16)

The candidates folder contains these files. This inventory should be refreshed
when the user asks for a `list`.

| File | Date | Type |
|---|---|---|
| `16-chapters-blueprint-deepseek-2026-07-11.md` | 2026-07-11 | Chapter-heading outline (already distributed) |
| `bitm-330-outline-DeppSeek.md` | 2026-07-07 | Chapter-heading outline |
| `BITM330-book-final-outline-2026-07-08-claude.md` | 2026-07-08 | Chapter-heading outline |
| `BITM330-BOOK-Notes2.md` | — | Notes/collection |
| `BITM330-book-outline-FINAL-2026-07-09-claude (1).md` | 2026-07-09 | Chapter-heading outline |
| `BITM330-book-outline-FINAL-2026-07-09-claude.md` | 2026-07-09 | Chapter-heading outline |
| `BITM330-book-outline-FINAL-2026-07-10-gpt56.md` | 2026-07-10 | Chapter-heading outline |
| `BITM330-book-outline-FINAL-2026-07-11-chatGPT-v1.md` | 2026-07-11 | Chapter-heading outline |
| `BITM330-book-outline-FINAL-2026-07-11-claude-v3.md` | 2026-07-11 | Chapter-heading outline |
| `BITM330-book-outline-FINAL-2026-07-11-claude.md` | 2026-07-11 | Chapter-heading outline |
| `BITM330-book-outline-MASTER-2026-07-10.md` | 2026-07-10 | Master/merged outline |
| `BITM330-book-outline-UNIFIED-FINAL-2026-07-10-claude.md` | 2026-07-10 | Master/merged outline |
| `migration-plan-gpt-2026-07-11-deepseek-instructions.md` | 2026-07-11 | Migration plan |
| `migration-plan-gpt-2026-07-11.md` | 2026-07-11 | Migration plan |
| `outline-2026-06-05.md` | 2026-06-05 | Numbered-section outline |
| `outline-2026-06-12.md` | 2026-06-12 | Numbered-section outline |
| `outline-7-7-26.md` | 2026-07-07 | Chapter-heading outline |
| `outline-DeepSeek-2026-07-07.md` | 2026-07-07 | Chapter-heading outline |
| `outline-final-chatgpt-7-10-26.md` | 2026-07-10 | Chapter-heading outline |
| `outline-Gemini-2026-07-07.md` | 2026-07-07 | Chapter-heading outline |
| `outline-GLM-2026-07-07.md` | 2026-07-07 | Chapter-heading outline |
| `outline-GPT-2026-07-07.md` | 2026-07-07 | Chapter-heading outline |
| `side-by-side-outline-comparison-2026-07-08.md` | 2026-07-08 | Comparison/analysis |

---

## Notes

- The `candidates/` folder is the **inbox**. Files arrive here from various
  AI models and sessions. After distribution, they remain as historical
  reference — do not delete or move them.
- The `chapter-outline/` folder is the **working set**. These are the files
  the chapter-editor and other skills read to understand chapter structure.
- Different candidate files use different heading conventions. The AI agent
  must adapt its parsing to each file's structure rather than expecting a
  single format.
- Some candidate files (comparisons, migration plans, notes) contain no
  distributable chapter content. For these, extract what's useful into
  `general-notes.md` and report that no chapter files were updated.
- The `general-notes.md` file is cumulative — it grows with each distributed
  candidate rather than being replaced. Chapter files are replaced.
