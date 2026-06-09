---
name: autograded-lab
description: >
  Create or revise a BITM330 chapter lab companion as an autograded LMS-friendly assessment derived
  from the chapter's Lets-Build content. Use when: building a dated chapter lab; converting hands-on
  steps into multiple-choice, select-all, code-input, and file-upload questions; preparing labs for
  Brightspace import with an answer key and submission checklist.
argument-hint: Chapter number, chapter folder, or Lets-Build file path (for example, "ch04" or "chapter-drafts/ch04-databases/lets-build/ch04-lets-build-2026-05-19.md")
---

# BITM330 Autograded Lab Skill

Create or revise a chapter lab companion as an autograded assessment derived primarily from the chapter's current Lets-Build section. The output is a student-facing lab in question-and-answer format designed for LMS deployment and automatic grading where feasible.

## Purpose

Use this skill when a chapter lab should:

- correspond directly to chapter concepts and the Lets-Build workflow
- be completable in about 60 minutes
- use objective, machine-checkable question formats
- support Brightspace or similar LMS deployment
- produce dated lab companions without overwriting legacy source files

This is not an open-ended worksheet and not a reflection exercise.

## Core Output Model

Build labs from four autograded task types only:

- single-answer multiple choice
- multiple-answer select-all-that-apply
- short code input (SQL or similarly precise formulas/expressions)
- file upload (CSV, `.accdb`, `.sqlite`, narrowly scoped screenshots, or other clearly named deliverables)

Do not default to open-ended prose responses.

## File Naming and Location

When creating or significantly revising a lab, create a new dated file. Do not overwrite.

- Filename pattern: `ch<number>-lab-<YYYY-MM-DD>.md`
- Example: `ch04-lab-2026-03-22.md`
- Location: `chapter-drafts/<chapter-folder>/lab/`

Treat undated lab files as source inputs, not overwrite targets.

## Source Priority

Base the lab primarily on:

1. the most recent Lets-Build file
2. the main chapter file
3. the Terms or Term Treasury file

Use older lab files only as tertiary references. Do not base on RAT files, reflection files, or drifted legacy labs.

## Chapter and Platform Progression

Unless overridden:

- Chapter 1: project description and orientation only
- Chapter 3: Google Sheets
- Chapter 4: Microsoft Access
- Chapter 5: SQLite
- Chapter 6: Microsoft Access
- Chapter 7: mixed Access + SQLite

For other chapters, infer the tool from Lets-Build and main manuscript while preserving continuity.

## Project Context

Use the Veterinary Clinic / Pet Hospital / PetVax dataset as the applied lab context when the chapter uses the lab project rather than the Grading Database. Use shared assets from `BITM330-Book-draft/Labs/` rather than duplicating data in the lab file.

## YAML Metadata

Every lab file must begin with a YAML block. Required fields: `title`, `chapter`, `section` (always `"Lab"`), `description` (1-2 sentences), `keywords` (5-10), `date`, `author` if known.

### Example

```yaml
---
title: "Chapter 4: Autograded Lab"
chapter: 4
section: "Lab"
description: "Provides an autograded Microsoft Access lab aligned with Chapter 4 concepts on databases, tables, constraints, and DBMS use."
keywords:
  - autograded lab
  - Microsoft Access
  - databases
  - tables
  - DBMS
  - chapter 4
date: 2026-03-22
author: "Nimrod Dvir"
---
```

## Required Output Structure

```markdown
# Chapter <number>: Lab

*<short italic tagline that explains what students will build, inspect, answer, or submit>*
```

Immediately after the title block, insert the shared lab opening image using a centered Markdown table:

```markdown
| ![Lab section banner](<relative-path-to-lB.gif>) |
| :--: |
```

- Source asset: `.images/Ch0 General/sections/resize/lB.gif`
- Convert to the correct relative path from the chapter's `lab/` folder.

### Section Order

1. YAML block
2. Title
3. Tagline
4. Lab Overview
5. Platform and Required Files
6. Estimated Time
7. Question Set
8. Submission Checklist
9. Answer Key
10. LMS Notes

## Heading Rules

- H1 only for the lab title.
- H2 for required top-level sections.
- H3 for question-group subsections only.
- Do not skip heading levels.

## Time and Scope

Target about 60 minutes:

- recognition/understanding chapters: ~10-14 objective questions
- platform-build chapters: ~12-18 objective + 1-3 upload checkpoints
- mixed-tool chapters: ~14-20 objective + 2-4 upload checkpoints

Do not burn the hour on setup before students answer anything.

## Question-Type Rules

### Single-Answer Multiple Choice

- Prefer 4 options.
- Plausible distractors.
- Correct answer grounded in current chapter and Lets-Build content.
- No trivia, no wording traps.

### Multiple-Answer (Select All That Apply)

- State explicitly that more than one answer may be correct.
- At least 2 correct answers when used.
- Avoid ambiguous combinations.

### Code Input

- Use only when answers can be checked reliably.
- Short, deterministic SQL prompts.
- Single statement unless multi-statement is explicitly desired.
- Exact target tables/fields from the chapter/tool context.
- Include expected answer and accepted variants in the Answer Key.

For non-SQL chapters, formula-style code input is acceptable only when exact checking is feasible (e.g., a Google Sheets formula).

### File Upload

Every upload prompt must specify:

- exactly which file to upload
- expected filename or naming convention
- what object/content must exist in the file
- how the upload connects to chapter concepts

Pair uploads with objective follow-up questions when possible.

## Chapter-Specific Guidance

### Chapter 1 — Orientation only

Recognition/understanding questions about project purpose, main entities, and what students will do later. No database building.

### Chapter 3 — Google Sheets

Fields, records, data types, filters, lookups, pivot behavior, spreadsheet fragility. Upload Google Sheets export (CSV) only if a stable deliverable is required.

### Chapter 4 — Microsoft Access

Databases, tables, DBMS roles, field types, simple objects, one-big-table limits. Upload `.accdb` files or exported tables when students create Access artifacts.

### Chapter 5 — SQLite

SQL syntax, table creation, inserts, filtering, aggregation, simple joins (where chapter supports). Heavy use of code input. Upload `.sqlite` or `.db` files when students build the database.

### Chapter 6 — Microsoft Access (relational)

Relational design and Access implementation. Object-aware prompts tied to tables, relationships, and query behavior.

### Chapter 7 — Mixed Access + SQLite

Compare implementation choices across both. Require recognition of the same relational logic in both tools. At least one upload or verification task per environment if the chapter build supports it.

## Answer Key

Every lab includes a full Answer Key for all non-upload questions.

````markdown
## Answer Key

### Multiple Choice and Multiple Answer

**Question 1: [full question text]**
**Correct Answer:** B
**Explanation:** [brief chapter-grounded reason]

### Code Input

**Question 8: [full prompt text]**
**Expected Answer:**

```sql
SELECT ...
```

**Accepted Variants:** [optional]
**Explanation:** [brief reason]
````

For upload items, provide a grading checklist instead of a machine-graded answer.

## Submission Checklist

For every upload item, include:

- required file type
- expected filename or naming pattern
- required objects/exported content inside the file
- the concept being demonstrated

Keep upload requirements precise enough for another instructor or LMS assistant to verify consistently.

## LMS Notes

End each lab with a short LMS Notes section:

- suggested grouping of questions by type
- which questions are auto-gradable directly
- which upload items need checklist-based review
- any filename rules or import notes

## Writing Rules

- Clear, direct wording.
- Tied to chapter concepts and Lets-Build tasks.
- No subjective evaluation language.
- No open-ended discussion prompts.
- No long prose responses.
- Faithful to the current chapter version.

## Consistency Rules

- Preserve chapter terminology.
- Use current table names, field names, and platform names exactly.
- Align difficulty with chapter sequence.
- Keep the arc tight: chapter concept -> tool action -> graded evidence.

## Preferred Workflow

1. Identify the current dated Lets-Build file.
2. Confirm the platform for that chapter.
3. Extract the core tasks and concepts.
4. Translate them into autograded question types.
5. Add upload checkpoints only where artifact submission is necessary.
6. Create the dated lab file in the chapter's `lab/` folder.
7. Include the answer key and LMS notes.
