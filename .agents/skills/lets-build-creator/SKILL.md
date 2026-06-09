---
name: lets-build-creator
description: >
  Create or revise the "Let's Build" (LB) companion section for a BITM330 textbook chapter.
  Use when: drafting a new LB; revising an existing LB; adding hands-on practice with the
  Grading Database (GD/GDB); turning chapter concepts into Access, SQL, SQLite, Power BI,
  macro, DBA, or BI activities; preparing the LB that will feed the chapter's Lab and
  Autograded Lab. Do not use for full chapter editing, image work, reflection-only files,
  RAT/quiz files, or PetVax lab transfer.
argument-hint: Chapter number, chapter folder, or main file path (for example, "ch04" or "chapter-drafts/ch04-databases/main/ch04-main-2026-05-19.md").
---

# BITM330 Let's Build Creator Skill

Create or revise the Let's Build (LB) section for a BITM330 chapter. The LB translates the chapter's concepts into guided, hands-on practice using the Grading Database. It comes after the main chapter summary and is the foundation for the chapter's Lab and Autograded Lab.

## Abbreviations

- **LB** — Let's Build (the chapter companion section/file).
- **GD** / **GDB** — Grading Database (the canonical running case).
- **PetVax** — the veterinary clinic case used by the sibling `lab-creation` skill, not by LB.

Use these abbreviations consistently in section text, comments, and commit messages.

## Purpose

A Let's Build section answers one question:

> What did students just learn, and how can they build, test, or think it through right now?

LB sits between concept and assessment:

```text
Main chapter  →  Let's Build (GD)  →  Lab (PetVax)  →  Autograded Lab  →  Reflection
```

The LB you create here is the source that the sibling skills `lab-creation` and `autograded-lab` will transfer and assess. Design every section so its tasks can be converted into objective questions and into a PetVax transfer.

## When to use

Use this skill when the user asks to:

- create a Let's Build for a chapter
- revise an existing LB
- add hands-on GD practice to a chapter
- turn chapter concepts into Access, SQL, SQLite, Power BI, macro, DBA, or BI activities
- prepare the LB that will feed the chapter's Lab and Autograded Lab

Do not use this skill for:

- rewriting the whole chapter (use `chapter-editor` or `chapter-editor-light`)
- image suggestions, prompts, or production
- reflection-only files (use `reflection`)
- RAT or quiz files
- PetVax lab transfer (use `lab-creation`)
- LMS-import autograded quizzes (use `autograded-lab`)

## Core principle

Every LB section should connect:

```text
Concept  →  Action  →  Output  →  Interpretation
```

The Grading Database is a continuous system. Each chapter's LB extends, refines, queries, analyzes, governs, or interprets the same GD — not a fresh case.

## Source file selection

1. Use the most recent main chapter file: `chapter-drafts/<chapter-folder>/main/chNN-main-YYYY-MM-DD.md`.
2. Do not use image files, image-ideas files, reflection files, RAT files, or lab files as the source.
3. If multiple main files exist, use the latest dated one. If ambiguous, ask before writing.

## File naming and location

- Pattern: `chNN-lets-build-YYYY-MM-DD.md`
- Location: `chapter-drafts/<chapter-folder>/lets-build/`
- On a meaningful revision, create a **new dated file**. Do not overwrite the prior dated file.

## Heading hierarchy (hard rule)

The LB file is a companion to a chapter, not a standalone document.

- **No H1.** The H1 is reserved for the chapter title.
- **H2 `## Let's Build`** opens the file. It is followed immediately by the centered Let's Build icon, and then a brief intro paragraph (what students will think through or build, and how it connects to the chapter just read). Every LB file must include this icon directly under the H2, followed by a centered `<p>` tag for spacing before the intro paragraph:

```html
<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">
```

- **H3** is used for every named LB section.
- **No H4.** Do not promote questions, tasks, or rhythm cues ("Ask", "Try it", "Guided answer") to H4 headings. Questions and rhythm cues are **bolded inline prose**.
- **No level skipping.** Do not jump from H2 to anything other than H3.
- **No numbered headings.** No "Block 1", "Step 1", "Prompt 2.1", "Part A". Use bold descriptive names only.

### Inline question pattern

Questions and prompts inside a section are bolded inline, not headings:

```markdown
**What KPIs would tell you the course is performing well?**

A useful first set goes beyond grades: current weighted average, missing
deliverables count, attendance rate, participation rate, ...
```

## Required output structure — choose by chapter type

Pick the pattern that matches the chapter. Both use the same H2 → H3 hierarchy.

### Section pattern (concept-heavy chapters: Ch 1, 2, 8, 15, 17)

Canonical exemplar: [`ch02-lets-build-2026-05-22.md`](../../../BITM330-Book-draft/chapter-drafts/ch02-mis-and-bitm/lets-build/ch02-lets-build-2026-05-22.md).

Required shape:

```markdown
## Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

<one short paragraph: what students think through, how it connects to the chapter,
and the no-submission note pointing to the companion Lab NN>

### <First framing section>
### <Three to five content sections moving from concept to application>
### <Optional wrap-up artifact section, e.g., Your Course Performance Logic Map>
### Final Reflection
### Peek Ahead — Chapter N+1
### What This Prepares You For
```

Inside each H3 section, use **bolded inline questions** followed by guided answers. The rhythm cues — Ask → Try it → Guided answer → Concept connection → Reflection — appear as inline bold labels when useful, never as headings.

Use the no-submission framing for concept-heavy LBs: state plainly that there is no submission for this LB and that Lab NN is where the work is done for a grade.

### Task pattern (build chapters: Ch 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14)

Required shape:

```markdown
## Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

<one short paragraph: what students will build with the GD and what they will be able
to do at the end>

### Purpose
### What You Will Practice
### Before You Begin
### <Named H3 task sections — each is: action → SQL/screenshot → expected output>
### Check Your Work
### What This Shows
### Common Mistakes
### Submit or Save
### Peek Ahead — Chapter N+1
```

Each named task section opens with what to do, shows readable SQL or the click path, and describes the expected output before moving on.

## Running case default

Use the **Grading Database** unless the user specifies otherwise. Canonical schema (use only the tables relevant to the chapter; follow the chapter's working schema if it differs):

```text
STUDENT(StudentID, FirstName, LastName, Email, Birthday, Grade)
ASSIGNMENT(Type, Quantity, Points, Points_per_one)
SCHEDULE(ClassNum, Week, Date, Day, Topic, Format)
ATTENDANCE(AttendanceID, ClassNum, StudentID, Attended)
DELIVERABLE(DeliverableID, Type, DeliverableNumber, DueDate, Topic)
STUDENT_GRADE(GradeID, StudentID, DeliverableID, Score)
GRADE_SCALE(LetterGrade, MinScore, MaxScore)
```

Do not introduce a concept, tool, or table before the chapter that teaches it.

## Tool progression (do not jump ahead)

| Chapter | LB focus |
| --- | --- |
| 1 | Conceptual: project charter, entities, business questions |
| 2 | Conceptual: DIKW, KPIs, IPO, five components — no DB yet |
| 3 | Google Sheets data types, anomalies, spreadsheet limits |
| 4 | Access tables, form, query, report |
| 5 | SQL in SQLite and Access SQL view |
| 6 | Relationships, foreign keys, referential integrity |
| 7 | Normalization to 3NF |
| 8 | Midterm review and consolidation |
| 9 | Advanced SQL: CTEs, window functions, CASE |
| 10 | ERD design |
| 11 | DBA: backup, security, roles, indexing |
| 12 | BI queries, KPIs, decision memos |
| 13 | Indexes, views, triggers, transactions |
| 14 | Access → Power BI dashboard |
| 15 | Strategic alignment, value-chain audit |
| 16 | Portfolio assembly |
| 17 | Transfer to a new problem |

## Style rules

- Short, concrete, readable; second person; instructor voice.
- Plain explanation before and after every code block.
- Readable SQL with comments only where logic is non-obvious.
- Callouts (Tip, Note, Common Mistake, Good Practice, Check Your Work) used sparingly.
- One quick-classify mini-check per LB at most (5 rows, classify each as X / Y / Z, with model answers). Use it to harden a fuzzy distinction.
- Do not preview strategy content (scale tradeoffs, financial value, SWOT, ROI) in early chapters; that belongs in Ch 11–15.

## Connection to downstream artifacts

The LB is the source for two sibling skills:

- `lab-creation` transfers the LB to a PetVax scenario for graded SAM-style work.
- `autograded-lab` converts the LB into a single-file LMS-import quiz.

Design each H3 section so its tasks are easy to transfer and easy to convert into objective questions (clear expected output, explicit artifact to save, named queries/files).

Always link the companion lab by exact name in the LB intro (e.g., `Lab 02 — Managing PetVax as a Business System`). The lab number always matches the chapter number — never write `Lab 1` for Chapter 2.

## Quality checklist

Before finalizing, confirm:

- [ ] LB starts with `## Let's Build` (H2), followed by the centered Let's Build icon, then a brief intro paragraph.
- [ ] All named sections are H3. No H1, no H4, no level skipping.
- [ ] Questions and rhythm cues are bolded inline prose, not headings.
- [ ] No numbered headings ("Block 1", "Step 1", "Prompt 2.1", "Part A").
- [ ] The words "block" and "prompt" do not appear as structural labels.
- [ ] Abbreviations LB and GD/GDB are used consistently.
- [ ] Companion lab is referenced by exact name; lab number matches the chapter number.
- [ ] The LB stays inside the chapter's scope (no premature tools or topics).
- [ ] Concept-heavy LBs land at 5–8 H3 sections.
- [ ] Every section connects concept → action → output → interpretation.
- [ ] Every section is convertible to a PetVax transfer and to objective questions.
- [ ] The LB ends with a `### Peek Ahead — Chapter N+1` hand-off.

## Anti-patterns to avoid

- Front-loading a logic-map or framework table as the **spine** of the LB. Summary artifacts belong at the end as a wrap-up section, not as the driver.
- Adding a sixth or seventh section that smuggles in advanced material the chapter hasn't taught.
- Previewing strategy/IS-planning content in early chapters.
- Wholesale rewriting an LB when a surgical edit was requested.
- Mis-numbering the companion lab.
- Promoting questions, tasks, or rhythm cues to H4 headings.
- Using the words "block" or "prompt" as structural labels.

## Revising an existing LB

When revising:

1. Preserve the existing rhythm and useful tasks.
2. Prefer small, targeted insertions over restructure.
3. Improve flow, add missing expected outputs, add check-your-work.
4. Do not change assignment requirements without asking.
5. Wrap-up artifacts (e.g., a one-page Logic Map) may be **added at the end** but must not become the spine.
6. Create a new dated file rather than overwriting the prior dated file.

## Final response to user

After creating or revising, respond with:

```markdown
Done — created/revised Let's Build for Chapter NN.

- Source chapter: <filename.md>
- Pattern used: section / task
- Sections: <comma-separated H3 names>
- Companion lab referenced: Lab NN — <title>
- Concepts reinforced: <short list>
```

## Reference

Detailed style, platform-specific patterns (Access SQL, Power BI, macros, DBA, BI), worked examples, and the per-chapter LB map: [`.agents/reference/lets-build-creator.reference.md`](../../reference/lets-build-creator.reference.md).
