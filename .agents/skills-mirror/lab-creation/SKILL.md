---
name: lab-creation
description: >
  Create or revise a BITM330 chapter lab as a SAM-style guided activity that transfers the chapter's
  Let's Build activity from the Grading Database to the PetVax veterinary clinic project. Use when:
  building a dated lab pair (questions + answers) inside a lab-NN folder; converting Let's Build
  steps into a step-by-step student instructions file; designing auto-gradable check questions that
  verify the student is doing the work; specifying a structured artifact file that will be parsed
  and graded by an AI agent. For pure single-file LMS-import autograded quizzes, see the sibling
  `autograded-lab` skill.
argument-hint: Chapter number or lab folder (for example, "ch02", "lab-02", or "chapter-drafts/ch02-mis-and-bitm/lets-build/ch02-lets-build-2026-05-21.md")
---

# BITM330 Lab Creation Skill

Create or revise a BITM330 chapter lab. The lab is a **SAM-style guided activity**: students follow numbered steps, perform real work, answer auto-gradable check questions along the way, and submit a structured file that proves they did the work.

## Core principle

> **Let's Build teaches the concept using the Grading Database. The Lab applies the same logic to PetVax.**

The lab mirrors the chapter's Let's Build structure and concepts but transfers them to the PetVax veterinary clinic scenario. The lab is graded; the Let's Build is guided practice. The lab is also independent: students should be able to complete it after reading the chapter and working through Let's Build, without the lab re-teaching the full chapter.

## What a lab is

A BITM330 lab is a SAM/MyTAP-style guided activity:

- Students read a short PetVax scenario.
- They follow a numbered list of steps that double as instructions.
- They perform real work on a file they will submit.
- Some steps end with an auto-gradable check question.
- They upload the final artifact file.
- The quiz and artifact are graded together.

A lab is not a chapter rewrite, not a lecture, not a RAT, not a pure reflection prompt, and not an unstructured project.

## Two-part grading model

Every lab has two graded parts:

1. **Quiz part — exact questions.** Auto-gradable questions confirm the student understands the material and actually performed the steps. Each quiz answer should come from doing the work, so a value the student computed or observed becomes the answer they select or enter.
2. **File submission part — proof of work.** A structured artifact file the student uploads so an AI grader can confirm they completed every step, not just guessed the quiz answers.

Final grade = quiz score + AI-graded artifact.

**Lab 01 is the only exception: it is quiz-only with no file submission.** Because Chapter 1 is orientation, students answer the quiz but do not need to build or upload a technical artifact. The Lab 01 questions file must still explain how the two-part model works in later labs.

## Missing-file rule

For every lab with a required artifact:

> If the required file submission is missing, the student receives zero for the file-submission part and may receive zero for the entire lab if the instructor configures the lab that way.

State the missing-file rule clearly in the `## Submission` section.

## No migration boilerplate

Do not include migration scaffolding in a lab file unless the author explicitly asks for it. Specifically, do not add:

- `## Source Links`
- `## Migration Notes`
- `## Migrated Section Draft`

Do not link to centralized section labs or answer outlines. A lab file is a clean, student-facing handout, not a migration record. The questions file must never link to the answers file.

## Relationship to `autograded-lab`

Both skills create labs.

Use this one, `lab-creation`, by default.

Use `autograded-lab` only when the requirement is a **single-file, pure LMS-import autograded quiz** with no submitted artifact.

## Folder layout

Each lab lives in its own folder under:

```
BITM330-Book-draft/chapter-drafts/Labs-draft/
```

Required structure:

```
Labs-draft/
  lab-NN-<slug>/
    lab-NN-questions-YYYY-MM-DD.md
    lab-NN-answers-YYYY-MM-DD.md
    assets/
      <project files: .accdb, .xlsx, .sql, screenshots, templates, starter data>
```

- Folder naming: `lab-NN-<slug>`.
- Major edits never overwrite prior files.
- Create a new dated pair of files.
- Treat undated or older lab files as source history.
- `assets/` holds binary or shared deliverables (.accdb, .xlsx, .sql, images, PDF templates).
- Use one `assets/` folder per lab folder. Do not mix assets across labs.

## Recommended lab slugs

Use these unless the user specifies a different slug.

| Lab | Slug | Chapter focus |
| --- | ---- | ------------- |
| 01  | `lab-01-petvax-intro` | PetVax project introduction |
| 02  | `lab-02-petvax-system` | Information systems, DIKW, R.E.A.D., KPIs |
| 03  | `lab-03-data-types-and-tables` | Data fundamentals and spreadsheet structure |
| 04  | `lab-04-intro-to-access` | Intro to Microsoft Access |
| 05  | `lab-05-sql` | SQL basics |
| 06  | `lab-06-relational-model` | Relational model and relationships |
| 07  | `lab-07-normalization` | Normalization |
| 08  | `lab-08-midterm-review` | Midterm review |
| 09  | `lab-09-database-design-erd` | Database design and ER modeling |
| 10  | `lab-10-advanced-sql` | Advanced SQL for business analysis |
| 11  | `lab-11-dba` | Database administration |
| 12  | `lab-12-business-intelligence` | Business intelligence |
| 13  | `lab-13-database-hardening` | Advanced database techniques |
| 14  | `lab-14-powerbi-dashboard` | Power BI dashboard |
| 15  | `lab-15-strategic-analysis` | Strategic SQL and IS alignment |
| 16  | `lab-16-final-integration` | Final project integration |
| 17  | `lab-17-course-reflection-portfolio` | Course synthesis and portfolio |

## Source priority

Base the lab on, in this order:

1. The most recent Let's Build file in the chapter's `lets-build/` folder.
2. The main chapter file.
3. The Terms/Terms Treasury file.

Do not base labs on RAT files or reflection files. Use older lab files only as tertiary references.

## Platform neutrality

The delivery platform is undecided. Write the questions file as portable Markdown. Do not hard-code Brightspace, Canvas, Moodle, or other LMS-specific conventions unless the user asks.

Each check question should carry the minimum metadata an LMS converter would need:

| Field | Required |
| ----- | -------- |
| Step number | Yes |
| Question type | Yes |
| Prompt | Yes |
| Answer choices | Yes, if applicable |
| Correct answer | Yes, in the answers file |
| Accepted variants | Yes, for short-answer numeric items |
| Points | Recommended |
| Feedback | Recommended |
| Connection to artifact | Yes when the answer appears in the file |

## Allowed quiz question types

The questions file may use only these auto-gradable types:

| Type | Use for |
| ---- | ------- |
| Multiple choice | Concept checks with one correct answer |
| True/False | Quick distinction checks |
| Matching | Concept-to-example mapping |
| Ordering | Sequences such as DIKW, workflow, or process steps |
| Multi-select | Identifying all valid KPIs, components, risks, fields, or query elements |
| Short answer | Exact answers only, usually numbers from a query result |

Disallowed in the quiz:

- open-ended written response;
- paragraph reasoning;
- scenario response;
- anything requiring human or AI judgment.

Open reasoning, scenario analysis, and applied explanation belong only in the submitted artifact file, where the AI grader applies the rubric.

## The submitted artifact file

The artifact file proves the student did the work and will be parsed and graded by an AI agent.

The lab must enforce:

- **Fixed, parseable structure.** Use consistent headings or fixed table layouts the AI grader can locate.
- **Explicit required fields.** Every section the rubric scores has a labeled placeholder in the template.
- **One scenario carried through.** The student picks one PetVax problem, KPI, pet, owner, date range, or business scenario and uses it consistently.
- **Evidence of work.** Tables, query text, formulas, screenshots, exported results, dashboards, diagrams, or documented outputs.
- **Rubric alignment.** Sections in the artifact match sections in the answers-file rubric one-to-one.
- **Artifact-check consistency.** Numeric quiz answers should match values visible in the artifact when possible.

Artifact format depends on the chapter's tool:

| Chapter | Typical artifact |
| ------- | ---------------- |
| Ch01 | Quiz only or short orientation worksheet |
| Ch02 | Google Doc/PDF — PetVax Performance Logic Map |
| Ch03 | Google Sheet or `.xlsx` |
| Ch04 | Access `.accdb` |
| Ch05 | `.sql` file plus query-result screenshots or CSV exports |
| Ch06 | Access `.accdb` |
| Ch07 | Access `.accdb` plus normalization notes if needed |
| Ch08 | Mixed review artifact |
| Ch09 | ERD export PDF/PNG plus Mermaid or DDL text |
| Ch10 | `.sql` file plus output screenshots/CSV |
| Ch11 | DBA plan PDF plus evidence of backup/index/integrity work |
| Ch12 | BI query/report package or decision memo |
| Ch13 | SQL hardening script plus proof of execution |
| Ch14 | `.pbix` file or dashboard PDF |
| Ch15 | Strategic SQL output plus interpretation memo |
| Ch16 | Complete PetVax capstone package |
| Ch17 | Portfolio/reflection package |

## Anti-generic-AI design

The lab must make a generic AI-generated submission detectable. Require:

- one consistent scenario carried through all responses;
- student-specific choices, such as chosen problem, KPI, pet, owner, service, date range, or report focus;
- intermediate quiz answers that must match values present in the artifact;
- exact computed answers where possible;
- screenshots, exported outputs, or actual files in technical labs;
- required sections in the artifact with fixed labels.

Do not rely on open prose alone. Always pair reasoning with checkable evidence.

## Integrated workflow pattern

Steps and the artifact must be a single flow, not two parallel assignments.

Example pattern:

| Step | Student does | Artifact connection |
| ---- | ------------ | ------------------- |
| Step 1 | Chooses one PetVax problem or scenario | Appears in artifact header |
| Step 2 | Picks one KPI or data slice | Appears in artifact |
| Step 3 | Builds or updates a table/query/form/report | Appears in artifact |
| Step 4 | Runs query or computes value | Value appears in artifact |
| Step 4 check | Enters exact value | Must match artifact value |
| Step 5 | Repeats on another slice | Appears in artifact |
| Final step | Uploads artifact | Artifact = scored evidence |

The artifact is the polished result of the steps, not a separate deliverable.

## Time budget

Target about **60 minutes** per lab.

- Use one coherent workflow with one consistent scenario.
- Keep required deliverables concise.
- Optional extensions are allowed but never required.
- If a lab grows beyond 60 minutes, cut scope before adding steps.

## Chapter and tool progression

| Lab | Chapter | Tool / Artifact | Focus |
| --- | ------- | --------------- | ----- |
| 01  | ch01 | Quiz only or short Google Doc | PetVax project orientation |
| 02  | ch02 | Google Doc/PDF — PetVax Performance Logic Map | DIKW, R.E.A.D., KPIs, information systems |
| 03  | ch03 | Google Sheet / `.xlsx` | Data types, fields, records, metadata, validation |
| 04  | ch04 | Microsoft Access `.accdb` | Tables, validation, forms, queries, reports |
| 05  | ch05 | SQL file + screenshots/CSV | SQL basics, SELECT, filtering, aggregation, first joins |
| 06  | ch06 | Microsoft Access `.accdb` | Relational model, PK/FK, relationships, referential integrity |
| 07  | ch07 | Microsoft Access `.accdb` | Normalization to 3NF |
| 08  | ch08 | Mixed review artifact | Midterm review and integration |
| 09  | ch09 | ERD PDF/PNG + Mermaid/DDL text | Database design and ER modeling |
| 10  | ch10 | SQL file + screenshots/CSV | Advanced SQL, diagnostics, CTEs, views, window functions |
| 11  | ch11 | DBA plan + database evidence | Security, backup, recovery, roles, indexing |
| 12  | ch12 | BI reports/queries + memo | KPIs, analytical views, decision support |
| 13  | ch13 | SQL hardening script + evidence | Indexes, constraints, triggers, audit trails, transactions |
| 14  | ch14 | `.pbix` or dashboard PDF | Power BI, Power Query, DAX, dashboard design |
| 15  | ch15 | Strategic analysis memo + SQL outputs | Strategy, trend analysis, early warning, scenario testing |
| 16  | ch16 | Complete PetVax capstone package | Full-course integration |
| 17  | ch17 | Portfolio/reflection package | Course synthesis and professional reflection |

## Lab 09 and Lab 10 sequencing rule

Lab 09 transfers Chapter 9's design logic to PetVax. It should ask students to move from business requirements to ERD, Mermaid, SQL DDL, and constraints.

Lab 10 transfers Chapter 10's advanced SQL logic to PetVax. It should build on the PetVax design from Lab 09 and ask students to write advanced analytical queries that diagnose problems, calculate metrics, rank performance, detect exceptions, and support decisions.

Use this sequence:

```
Design the PetVax system  →  understand its relationships  →  query it professionally
```

## Lab 02 allowed / not allowed

Lab 02 is intentionally light and conceptual.

Allowed:

- business-system framing;
- KPIs;
- decisions;
- business processes;
- DIKW;
- R.E.A.D.;
- information behavior;
- five-component framework;
- one-page logic map.

Not allowed:

- data types;
- schema design;
- SQL;
- Access;
- relationships;
- normalization.

Those belong to later labs.

## Required output structure

### `lab-NN-questions-YYYY-MM-DD.md`

Use this structure:

```markdown
---
section: "Lab Questions"
lab: "Lab NN"
title: "<Lab Title>"
date: "YYYY-MM-DD"
---

# Lab NN: <Title>

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center"><em><short italic tagline></em></p>

## Overview

- What the lab is about.
- How it connects to Chapter NN and Let's Build NN.
- That the lab has two graded parts: a quiz with exact answers and a submitted file as proof of work.
- For Lab 01 only, note there is no file to submit yet and explain how submission works in later labs.
- Estimated time.

## Scenario

Short PetVax scenario the student will work with.

## Required Files and Tools

- Starter file(s) in `assets/`.
- Tool the student needs.
- Final artifact format and naming convention.

## Steps

Numbered list. Each step contains:

1. **Do:** the instruction the student performs on the artifact.
2. **Check:** when applicable, an auto-gradable check question from the allowed types.

Group related steps under H3 step-group headings when helpful.

## Submission

- Exact filename convention for the artifact.
- Where/how to upload, stated platform-neutrally unless the user specifies otherwise.
- Reminder that quiz score + AI-graded artifact = final grade.
- Missing-file rule.

## Optional Extensions

Short list of optional steps, clearly marked as not required.
```

### `lab-NN-answers-YYYY-MM-DD.md`

Use this structure:

```markdown
---
section: "Lab Answers"
lab: "Lab NN"
title: "<Lab Title>"
date: "YYYY-MM-DD"
---

# Lab NN: Answer Key and Rubric

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center"><em>Instructor answer key and AI-grading rubric.</em></p>

## Quiz Answer Key

One row per check question, in step order:

| Step | Type | Correct Answer | Accepted Variants | Points | Feedback |
| ---- | ---- | -------------- | ----------------- | ------ | -------- |

## Artifact Rubric (AI Grader)

One row per required section of the artifact:

| Section | What to Look For | Acceptable Variations | Common Mistakes | Points |
| ------- | ---------------- | --------------------- | --------------- | ------ |

## Consistency Checks

- Same scenario used throughout.
- Quiz numeric answers match values in the artifact.
- Required sections are present.
- Required file opens successfully.
- File is not blank, corrupted, or obviously generic.

## Notes for the AI Grader

Short prose explaining how to read the file, how to score partial credit, what counts as a faked/generic submission, and how to handle acceptable variations.
```

## Heading rules

Questions file:

- H1 only for the lab title.
- Immediately under the H1, insert the standard lab section icon, centered, followed by a blank centered spacer tag and then the italic tagline.
- H2 for required top-level sections.
- H3 for step groups when helpful.
- Do not skip heading levels.

Answers file:

- H1 only for the answer key title.
- Immediately under the H1, insert the standard lab section icon, centered, followed by a blank centered spacer tag and then the italic tagline.
- H2 for answer key, artifact rubric, consistency checks, and grader notes.
- H3 for optional sub-rubrics when needed.
- Do not skip heading levels.

Use this icon block:

```html
<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>
```

Use this tagline pattern:

```html
<p align="center"><em><short italic tagline></em></p>
```

## Cross-links

- The questions file may reference the chapter and its Let's Build for context.
- The questions file must not link to the answers file.
- The answers file is private/instructor-facing and is not surfaced to students.
- The chapter's main file may reference the lab folder, not a specific dated file.

## Quality checklist

Before finalizing, confirm:

- [ ] Lab transfers the chapter's LB from GD to PetVax.
- [ ] Lab does not introduce concepts that were not taught in the chapter or LB.
- [ ] Questions file is student-facing and does not link to the answers file.
- [ ] Answers file includes quiz key and artifact rubric.
- [ ] Every lab after Lab 01 has two graded parts: quiz + file submission.
- [ ] Missing-file rule is stated.
- [ ] Every auto-gradable check uses an allowed question type.
- [ ] No open-ended reasoning appears as a quiz question.
- [ ] Open reasoning appears only in the submitted artifact.
- [ ] Artifact has a fixed, parseable structure.
- [ ] Rubric sections match artifact sections.
- [ ] Numeric answers are exact and artifact-linked when possible.
- [ ] Lab has one coherent PetVax scenario carried through.
- [ ] Student-specific choices are included where useful.
- [ ] Lab targets about 60 minutes.
- [ ] Optional extensions are clearly not required.
- [ ] Icon HTML uses the centered `<p align="center">` pattern and is closed correctly.
- [ ] Heading levels are valid.
- [ ] Lab number matches chapter number.

## Anti-patterns to avoid

- Turning the lab into a lecture.
- Re-teaching the entire chapter.
- Writing a pure quiz when a file submission is required.
- Creating open-ended quiz questions.
- Asking for unsupported file types without a reason.
- Linking to the answers file from the questions file.
- Using the Grading Database as the lab scenario.
- Mixing GD and PetVax in the same lab task.
- Adding reflection-only work without checkable evidence.
- Asking for screenshots when a structured file would be better.
- Creating generic artifacts that AI can fake easily.
- Treating Lab 09 ERD as after-the-fact documentation.
- Treating Lab 10 advanced SQL as disconnected syntax practice.
- Leaving the submitted artifact structure vague.

## Revising an existing lab

When revising:

1. Preserve useful existing steps.
2. Keep the lab within chapter scope.
3. Prefer targeted edits over full rewrites unless the structure is broken.
4. Add missing check questions where exact outputs exist.
5. Add missing artifact-rubric details.
6. Create a new dated questions/answers pair.
7. Do not overwrite older files.
8. Do not change assignment requirements without asking.

## Final response to user

After creating or revising, respond with:

```markdown
Done — created/revised Lab NN.

- Lab folder: <lab-NN-slug>
- Files created/revised:
  - lab-NN-questions-YYYY-MM-DD.md
  - lab-NN-answers-YYYY-MM-DD.md
- Source Let's Build: <filename.md>
- Artifact required: <format / filename convention>
- Auto-gradable checks: <count>
- Main PetVax transfer: <brief description>
```
