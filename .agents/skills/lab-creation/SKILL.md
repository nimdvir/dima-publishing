---
name: lab-creation
description: >
  Create or revise a BITM330 chapter lab as a SAM-style guided activity that transfers the chapter's
  Let's Build (taught with the Grading Database) to the PetVax veterinary clinic project. Use when:
  building a dated lab pair (questions + answers) inside a lab-NN folder; converting Let's Build
  steps into a step-by-step instructions file students follow; designing auto-gradable check
  questions that verify the student is doing the work; specifying a structured artifact file that
  will be parsed and graded by an AI agent. For pure single-file LMS-import autograded quizzes, see
  the sibling `autograded-lab` skill.
argument-hint: Chapter number or lab folder (for example, "ch02", "lab-02", or "chapter-drafts/ch02-mis-and-bitm/lets-build/ch02-lets-build-2026-05-21.md")
---

# BITM330 Lab Creation Skill

Create or revise a BITM330 chapter lab. The lab is a **SAM-style guided activity**: students follow numbered steps, perform real work (build tables, run queries, update data, write formulas), answer auto-gradable check questions along the way, and submit a structured file that proves they did the work.

For background and the full design rationale, see [lab-creation.md](./lab-creation.md) in this folder.

## Core Principle

> **Let's Build teaches the concept using the Grading Database. The Lab applies the same logic to PetVax.**

The lab mirrors the chapter's Let's Build structure and concepts but transfers them to the PetVax veterinary clinic scenario. The lab is graded; the Let's Build is not. The lab is also independent — students should be able to complete it after reading the chapter and working through Let's Build, without re-teaching concepts.

## Two-Part Grading Model

Every lab has two graded parts:

1. **Quiz part — answering exact questions.** Auto-gradable questions (mostly multiple choice, plus the other allowed types) that confirm the student understands the material and actually performed the steps. Each quiz answer should come from doing the work, so a value the student computed or observed becomes the answer they select.
2. **File submission part — proof of work.** A structured artifact file the student uploads so an AI grader can confirm they completed every step, not just guessed the quiz answers.

Final grade = quiz score + AI-graded artifact.

**Lab 01 is the only exception: it is quiz-only with no file submission.** Because Chapter 1 is orientation, students answer the quiz but do not build or upload an artifact. The Lab 01 questions file must still explain how the two-part model works in every later lab, so students know what to expect.

## No Migration Boilerplate

Do not include migration scaffolding in a lab file unless the author explicitly asks for it. Specifically, do not add `## Source Links`, `## Migration Notes`, or `## Migrated Section Draft` sections, and do not link to centralized section labs or answer outlines. A lab file is a clean, student-facing handout, not a migration record. The questions file must never link to the answers file.

## Relationship to `autograded-lab`

Both skills create labs. Use this one (`lab-creation`) by default. Use `autograded-lab` only when the requirement is a **single-file, pure LMS-import autograded quiz** with no submitted artifact.

## Folder Layout

Each lab lives in its own folder under `BITM330-Book-draft/chapter-drafts/Labs-draft/`:

```text
Labs-draft/
  lab-NN-<slug>/
    lab-NN-questions-<YYYY-MM-DD>.md
    lab-NN-answers-<YYYY-MM-DD>.md
    assets/
      <project files: .accdb, .xlsx, .sql, screenshots, templates, starter data>
```

- Folder naming: `lab-NN-<slug>`.
- **Major edits never overwrite.** Create a new dated pair of files.
- Treat undated or older lab files as source history.

### Confirmed slugs (labs 01–08)

- `lab-01-petvax-intro` — PetVax project introduction (orientation only)
- `lab-02-petvax-system` — ch02, conceptual PetVax system analysis
- `lab-03-data-types-and-tables` — ch03, data types and simple tables
- `lab-04-intro-to-access` — ch04, intro to MS Access
- `lab-05-sql` — ch05, SQL
- `lab-06-relational-model` — ch06, relational model
- `lab-07-normalization` — ch07, normalization
- `lab-08-midterm-review` — ch08, midterm test review

Labs 09–15 are not yet slugged.

## Source Priority

Base the lab on, in this order:

1. The most recent Let's Build file in the chapter's `lets-build/` folder.
2. The main chapter file.
3. The Terms/Term Treasury file.

Do not base labs on RAT or reflection files. Use older lab files only as tertiary references.

## What the Lab Actually Is

The questions file is **an instructions file students follow**, modeled on SAM/MyTAP projects:

- Brief intro and scenario.
- A numbered list of **steps**. Each step is an instruction the student performs on the artifact file (build a table, enter records, run a query, write a formula, build a chart, etc.).
- Some steps end with an **auto-gradable check question** whose answer comes from doing the step (e.g., "How many dogs are patients?", "How many cats are overweight?", "What is the exact total billed for visits in March?").
- A final step that asks students to upload the artifact file.

Grade = quiz check-question correctness **plus** AI-graded review of the submitted file.

### Platform-neutral

The hosting platform (Brightspace, custom system, other) is undecided. Write so the questions file is convertible to any LMS later. Do not hard-code Brightspace conventions.

## Allowed Quiz Question Types (auto-gradable only)

The questions file may use **only** these types. No open-ended written response.

| Type            | Use For                                                        |
| --------------- | -------------------------------------------------------------- |
| Multiple choice | Concept checks with one correct answer                         |
| True/False      | Quick distinction checks                                       |
| Matching        | Concept-to-example mapping                                     |
| Ordering        | Sequences (DIKW, workflow, process steps)                      |
| Multi-select    | Identifying all valid KPIs, components, risks, fields          |
| Short answer    | **Exact** answers only — typically numbers from a query result |

Open-ended reasoning, scenario analysis, and applied explanation belong **only** in the submitted artifact file.

## The Submitted Artifact File

The artifact file proves the student did the work and will be parsed and graded by an AI agent.

Requirements the skill must enforce:

- **Fixed, parseable structure.** Consistent headings or fixed table layouts the AI grader can locate.
- **Explicit required fields.** Every section the rubric scores has a labeled placeholder in the template.
- **One scenario carried through.** The student picks one PetVax problem/scenario and uses it consistently across all sections.
- **Evidence of work.** Tables, query text, formulas, screenshots, exported results — whatever the chapter's tool produces.
- **Rubric-aligned.** Sections in the artifact match sections in the answers-file rubric one-to-one.

Artifact format depends on the chapter's tool:

- Conceptual labs (Ch02): Google Doc / PDF, e.g., a one-page PetVax Performance Logic Map.
- Sheets labs (Ch03): Google Sheet (`.xlsx` or shared link).
- Access labs (Ch04, Ch06, Ch07): `.accdb`.
- SQL labs (Ch05): `.sql` file plus query-result screenshots or CSV exports.
- Review labs (Ch08): mixed.

## Anti-Generic-AI Design

The lab must make a generic ChatGPT submission detectable. Require:

- one consistent scenario carried through all responses;
- student-specific choices (chosen problem, chosen KPI, chosen pet, chosen date range);
- intermediate quiz answers that must match values present in the artifact;
- exact computed answers where possible (numeric short-answer checks);
- screenshots or exported results in technical labs.

## Chapter / Tool Progression

| Lab | Chapter | Tool / Artifact                                      | Notes                                      |
| --- | ------- | ---------------------------------------------------- | ------------------------------------------ |
| 01  | (intro) | Google Doc                                           | PetVax project orientation; very light     |
| 02  | ch02    | Google Doc — PetVax Performance Logic Map            | Conceptual; no schema, SQL, Access         |
| 03  | ch03    | Google Sheet                                         | Data types, fields, records, simple tables |
| 04  | ch04    | MS Access `.accdb`                                   | Intro to Access; tables and basic objects  |
| 05  | ch05    | SQL file + result screenshots                        | SELECT, filtering, aggregation             |
| 06  | ch06    | MS Access `.accdb`                                   | Relational model; relationships            |
| 07  | ch07    | MS Access `.accdb`                                   | Normalization                              |
| 08  | ch08    | Mixed                                                | Midterm test review                        |

### Lab 02 — allowed / not allowed

- Allowed: business-system framing, KPIs, decisions, business processes, DIKW, R.E.A.D., information behavior, five components, one-page logic map.
- Not allowed: data types, schema, SQL, Access, relationships, normalization.

## Time Budget

Target **about 60 minutes** per lab.

- Limit required work to one coherent workflow with one consistent scenario.
- Optional extensions are fine but never required.
- If the lab exceeds 60 minutes, cut scope before adding more steps.

## Required Output Structure

### `lab-NN-questions-<YYYY-MM-DD>.md`

```markdown
# Lab NN: <Title>

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center">

<p align="center"><em><short italic tagline></em></p>

## Overview
- What the lab is about.
- How it connects to Chapter NN and Let's Build NN.
- That the lab has two graded parts: a quiz (exact answers) and a submitted file (proof of work). For Lab 01 only, note there is no file to submit yet and explain how submission works in later labs.
- Estimated time.

## Scenario
Short PetVax scenario the student will work with.

## Required Files and Tools
- Starter file(s) in `assets/`.
- Tool the student needs (Google Doc, Sheets, Access, SQL client, etc.).
- Final artifact format and naming convention.

## Steps
Numbered list. Each step contains:
1. **Do:** the instruction the student performs on the artifact.
2. **Check (if applicable):** an auto-gradable check question from the allowed types.

Group related steps under H3 step-group headings when helpful.

## Submission
- Exact filename convention for the artifact.
- Where/how to upload.
- Reminder that quiz score + AI-graded artifact = final grade.

## Optional Extensions
Short list of optional steps; clearly marked as not required.
```

### `lab-NN-answers-<YYYY-MM-DD>.md`

```markdown
# Lab NN: Answer Key and Rubric

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center">

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
- Required sections present.

## Notes for the AI Grader
Short prose: how to read the file, how to score partial credit, what counts as a faked/generic submission.
```

## Heading Rules

- H1 only for the lab title.
- Immediately under the H1, insert the standard lab section icon, centered, followed by a blank centered spacer tag and then the italic tagline:

  ```html
  <p align="center">
    <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
  </p>

  <p align="center">

  <p align="center"><em><short italic tagline></em></p>
  ```
- H2 for required top-level sections.
- H3 for step groups or rubric sub-tables.
- Do not skip heading levels.

## Cross-Links

- The questions file may reference the chapter and its Let's Build for context, but must **not** link to the answers file.
- The answers file is kept separate and is not surfaced to students.
- The chapter's main file may reference the lab folder, not a specific dated file.
