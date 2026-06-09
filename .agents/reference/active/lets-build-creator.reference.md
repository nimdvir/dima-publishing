# Let's Build Creator — Reference

Long-form companion to the `lets-build-creator` skill at [`.github/skills/lets-build-creator/SKILL.md`](../../.github/skills/lets-build-creator/SKILL.md).

Read this when you need depth: the Grading Database (GD) schema, per-chapter LB focus, platform-specific writing rules (Access SQL, standard SQL, Power BI, macros, DBA, BI), difficulty control, and worked examples of the heading hierarchy.

The SKILL.md file is authoritative for hard rules (heading hierarchy, terminology, output structure). This document expands on the *why* and the *how*.

## Abbreviations

- **LB** — Let's Build (the chapter companion section/file).
- **GD** / **GDB** — Grading Database (the canonical running case used across the book).
- **PetVax** — the veterinary clinic case used by the sibling `lab-creation` skill, not by LB.

## Overview

The Let's Build is the chapter's hands-on practice section. It comes immediately after the main chapter summary and:

- gives readers a concrete way to apply the concepts they just read
- uses the Grading Database as the continuous running case
- produces an artifact (logic map, query result, ERD, dashboard, decision memo) that a student could keep
- becomes the source material for the chapter's `lab-creation` (PetVax transfer) and `autograded-lab` (LMS-import quiz)

If the chapter is the *theory* of one part of the data-to-decisions arc, the LB is the *gym*.

## Position in the chapter pipeline

```text
Main chapter (concepts + summary)
   │
   ▼
Let's Build  ←─── this skill
   │   (Grading Database; concept → action → output → interpretation)
   ▼
Lab  ←──────────── lab-creation (transfers LB to PetVax for graded SAM-style work)
   │
   ▼
Autograded Lab  ← autograded-lab (objective LMS quiz derived from LB)
   │
   ▼
Reflection  ←──── reflection (review and synthesis)
```

Everything downstream depends on the LB being **specific**, **convertible**, and **scoped**.

## Grading Database — authoritative schema

Use only the tables relevant to the current chapter. Match the chapter's working schema if it differs (some early chapters use a simplified view).

```text
STUDENT(StudentID, FirstName, LastName, Email, Birthday, Grade)
ASSIGNMENT(Type, Quantity, Points, Points_per_one)
SCHEDULE(ClassNum, Week, Date, Day, Topic, Format)
ATTENDANCE(AttendanceID, ClassNum, StudentID, Attended)
DELIVERABLE(DeliverableID, Type, DeliverableNumber, DueDate, Topic)
STUDENT_GRADE(GradeID, StudentID, DeliverableID, Score)
GRADE_SCALE(LetterGrade, MinScore, MaxScore)
```

Common roles students take in LB tasks:

- **Reader** of the schema (Ch 1–2): just identify entities, attributes, and relationships.
- **Operator** (Ch 3–6): enter data, build tables, write basic SQL.
- **Analyst** (Ch 7–9, 12): run KPI queries, interpret outputs.
- **Designer** (Ch 10): model new requirements as an ERD extension.
- **DBA** (Ch 11, 13): apply backups, security, indexes, views, triggers.
- **BI developer** (Ch 14): build Power BI visuals on top of the GD.
- **Strategist** (Ch 15–17): tie GD outputs to course-level decisions.

The two-phase arc of the book:

1. **Build phase (Ch 1–10):** build and query the GD.
2. **Operate / decide phase (Ch 11–17):** govern, visualize, and reason from it.

## Source hierarchy for authoring

When writing an LB, your sources in order of priority:

1. The **most recent main chapter file** (`chNN-main-YYYY-MM-DD.md`) — the only required source.
2. The **previous chapter's LB** — to keep voice and tool progression consistent.
3. The **book outline** at [`.docs/outline/outline-taglines-2026-05-06.md`](../outline/outline-taglines-2026-05-06.md) — to confirm scope.
4. The **chapter tracker** at [`.docs/.edits/chapter-tracker.md`](../.edits/chapter-tracker.md) — to see Next/Done items.

Do not use image-ideas files, reflection drafts, or RAT drafts as the source.

## The two structural patterns

The SKILL.md file lists the required shape of each. This section explains *when* to choose which.

### Section pattern — for concept-heavy chapters

Use for: Ch 1, 2, 8, 15, 17.

These chapters don't yet (or no longer) center on building artifacts. The LB walks students through *thinking* — framing, classifying, interpreting, planning, transferring.

Hallmarks:

- 5–8 H3 sections.
- Each section opens with a **bolded inline question** and gives a guided answer.
- A wrap-up artifact (e.g., a Logic Map) appears near the **end**, never as the spine.
- Ends with `### Final Reflection`, `### Peek Ahead — Chapter N+1`, `### What This Prepares You For`.
- No graded submission for the LB itself — the companion Lab NN is where the work is submitted.

### Task pattern — for build chapters

Use for: Ch 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14.

These chapters teach a tool or technique. The LB is a guided build with named, ordered task sections.

Hallmarks:

- Every task section: action → SQL/screenshot/click path → expected output → short interpretation.
- Explicit `### Check Your Work` with verifiable outputs.
- `### Submit or Save` describes the artifact name the student keeps.
- `### Peek Ahead — Chapter N+1` closes the file.

## Per-chapter LB map

| Chapter | Pattern | LB centerpiece |
| --- | --- | --- |
| 1 | section | Project charter for the GD; entities, attributes, questions |
| 2 | section | DIKW, KPIs, IPO, five components; Course Performance Logic Map |
| 3 | task | Google Sheets data types, anomalies, spreadsheet limits |
| 4 | task | Access tables, form, query, report on GD |
| 5 | task | SQL in SQLite and Access SQL view |
| 6 | task | Relationships, foreign keys, referential integrity |
| 7 | task | Normalize a denormalized GD extract to 3NF |
| 8 | section | Midterm review and consolidation across Ch 1–7 |
| 9 | task | Advanced SQL: CTEs, window functions, CASE |
| 10 | task | ERD extension to handle a new GD requirement |
| 11 | task | DBA: backup, security, roles, indexing |
| 12 | task | BI queries and a short decision memo |
| 13 | task | Indexes, views, triggers, transactions |
| 14 | task | Access → Power BI dashboard on GD |
| 15 | section | Strategic alignment and value-chain audit using GD outputs |
| 16 | task | Portfolio assembly (selecting and labeling artifacts) |
| 17 | section | Transfer the GD method to a new problem domain |

## Platform-specific writing rules

### Access SQL (Ch 4–7)

- Use `*` for wildcards in `LIKE` patterns.
- No `LIMIT`; use `TOP n`.
- Use square brackets around identifiers with spaces.
- Show the SQL View pane explicitly the first time per chapter.
- Avoid features Access does not support (CTEs, window functions).

### Standard SQL (Ch 5, 9, 12)

- Default to SQLite syntax unless the chapter targets a different engine.
- Format SQL on multiple lines, keywords uppercase, one clause per line.
- Comment only where logic is non-obvious.
- Show the expected output as a small table beneath the query.

### Power BI (Ch 14)

- Use field names, not query names, in step-by-step instructions.
- Specify visual type, axis, value, and any filter.
- Show one screenshot per major step; describe what to look for.

### Macros (Ch 4 forms; Ch 11 DBA)

- Show the macro name, trigger event, and full action list.
- Note any unsupported actions in web-published Access.

### DBA tasks (Ch 11, 13)

- Always pair the action with verification (e.g., create user → log in as that user).
- Use the GD itself as the target; do not introduce a separate DBA database.

### BI tasks and decision memos (Ch 12, 14, 15)

- Require a one-paragraph interpretation under every KPI table.
- Decision memos: audience, recommendation, evidence, risk, next step.

## Difficulty control

LB difficulty should rise slowly across the book.

- Ch 1–2: zero technical execution. Pure framing.
- Ch 3–4: single-tool tasks; no joins.
- Ch 5–7: one-join queries; basic normalization.
- Ch 8: synthesis only, no new technique.
- Ch 9–10: multi-join queries; ERD design.
- Ch 11–13: governance and tuning.
- Ch 14: visualization layer.
- Ch 15–17: strategy and transfer.

If a draft LB requires a concept not yet taught, either remove it or replace it with a reference to the chapter that will teach it.

## Mapping LB sections to labs and quizzes

Each LB H3 section should be designed so that:

1. **`lab-creation`** can transfer the same action to PetVax (vet clinic) data with minimal rewriting.
2. **`autograded-lab`** can convert the section into 2–4 objective questions (multiple choice, select-all, code-input, file-upload) with a clear correct answer.

Practical authoring habits that make this easy:

- Name the artifact a student saves (e.g., `gd_q1_kpi_summary.sql`).
- State expected output as a small table or short list, not as prose.
- Avoid open-ended "discuss" prompts as the only content of a section.
- Keep each task scoped to one tool and one technique.

## Long-form quality checklist

Use in addition to the SKILL.md checklist when doing a careful pass:

- [ ] Every H3 section is convertible to a PetVax transfer.
- [ ] Every H3 section yields at least one objective question.
- [ ] No concept, tool, or table is used before the chapter that teaches it.
- [ ] Voice is second-person and instructor-warm; no "we will utilize".
- [ ] No em dashes used as a sentence stylistic crutch.
- [ ] No premature strategy content (scale, financials, SWOT, ROI) in Ch 1–10 LBs.
- [ ] The companion Lab is linked by exact name and the lab number matches the chapter number.
- [ ] Wrap-up artifacts appear at the end, not as the spine.
- [ ] The LB stops where the chapter stops; advanced material is pushed to the next chapter's LB.

## Good vs anti-pattern openings

### Good (concept-heavy, Ch 2)

```markdown
## Let's Build

In this section you will think through what makes the course you are taking
actually *work* as an information system: what KPIs would tell us it is performing
well, where the evidence lives, and how that evidence turns into a decision.
There is no submission for this Let's Build — the graded work happens in
Lab 02 — Managing PetVax as a Business System.

### The Course as a System

**What KPIs would tell you the course is performing well?**

A useful first set goes beyond grades: ...
```

### Anti-pattern (do not do this)

```markdown
# Let's Build  ← H1 is wrong; reserved for the chapter title

## Block 1: KPIs  ← numbered heading and the word "block" are both banned

#### Prompt 1.1  ← H4 and the word "prompt" are both banned

Let us utilize a SWOT analysis to ...  ← AI-style phrasing; off-scope for Ch 2
```

## Worked heading hierarchy example (Ch 2, section pattern)

```markdown
## Let's Build

<intro paragraph>

### The Course as a System
### From Performance to KPIs to Decisions
### Where the Evidence Comes From
### From Records to Action
### Naming the System
### Your Course Performance Logic Map
### Final Reflection
### Peek Ahead — Chapter 3
### What This Prepares You For
```

Inside each H3, all questions and rhythm cues ("Ask", "Try it", "Guided answer", "Concept connection") are **bolded inline prose**, never headings.

## See also

- Skill file (authoritative rules): [`.github/skills/lets-build-creator/SKILL.md`](../../.github/skills/lets-build-creator/SKILL.md)
- Lab transfer skill: [`.github/skills/lab-creation/SKILL.md`](../../.github/skills/lab-creation/SKILL.md)
- Autograded quiz skill: [`.github/skills/autograded-lab/SKILL.md`](../../.github/skills/autograded-lab/SKILL.md)
- Reflection skill: [`.github/skills/reflection/SKILL.md`](../../.github/skills/reflection/SKILL.md)
- Outline: [`.docs/outline/outline-taglines-2026-05-06.md`](../outline/outline-taglines-2026-05-06.md)
- Chapter tracker: [`.docs/.edits/chapter-tracker.md`](../.edits/chapter-tracker.md)
