# BITM330 Lab Creation — Reference

Long-form reference for the [`lab-creation`](./SKILL.md) skill. The SKILL.md file is the short, agent-actionable spec. This file holds the design rationale, the full question-type catalog with discussion, the integrated-workflow pattern, and the Lab 02 addendum with the PetVax Performance Logic Map template.

---

## 1. Core Principle

> **Let's Build teaches the concept using the Grading Database. The Lab asks students to apply the same concept to PetVax.**

The lab is not a new conceptual exposition. It is a graded, applied transfer of what the chapter and Let's Build already taught. If a concept does not appear in the chapter or its Let's Build, it should not appear in the lab.

## 2. What a Lab Is (and Isn't)

A BITM330 lab is a **SAM/MyTAP-style guided activity**:

- Students read a short scenario.
- They follow a numbered list of **steps** that double as **instructions**.
- They perform real work on a file they will submit (tables, data, queries, formulas, screenshots, a logic map).
- Some steps end with a **check question** with an exact, auto-gradable answer (e.g., "How many dogs are patients?", "What is the exact total billed in March?").
- They upload the final file.

A lab is **not** a quiz. It is **not** an open-ended reflection. It is **not** an unstructured project.

## 3. Required Lab Components

| Component                | Purpose                                                                |
| ------------------------ | ---------------------------------------------------------------------- |
| Lab title                | Chapter/lab number + PetVax-focused title                              |
| Chapter alignment        | Names the chapter and the concepts covered                             |
| Scenario                 | Brief, continuing PetVax narrative                                     |
| Required files/tools     | Lists starter files in `assets/` and the tool the student will use     |
| Step-by-step instructions| Numbered steps the student performs on the artifact                    |
| Auto-gradable checks     | Embedded after relevant steps; exact answers only                      |
| Artifact submission      | Structured file proving the student did the work                       |
| Rubric (in answers file) | Sections, point values, acceptable variations, common mistakes         |
| Notes for AI grader      | How to parse the file, partial credit, faked-submission signals        |
| Submission instructions  | Naming convention, file format, upload destination                     |

## 4. Folder and File Layout

```text
Labs-draft/
  lab-NN-<slug>/
    lab-NN-questions-<YYYY-MM-DD>.md
    lab-NN-answers-<YYYY-MM-DD>.md
    assets/
      <starter files, templates, screenshots, datasets>
```

- Major edits create a **new dated pair**. Never overwrite a prior pair.
- `assets/` holds binary or shared deliverables (`.accdb`, `.xlsx`, `.sql`, images, PDF templates).
- Use one set of `assets/` per lab folder. Do not mix labs.

## 5. Platform Neutrality

The delivery platform (Brightspace, custom system, other) is undecided. Write the questions file as portable Markdown. Each check question should carry the minimum metadata an LMS converter would need:

| Field                          | Required?                                |
| ------------------------------ | ---------------------------------------- |
| Step number                    | Yes                                      |
| Question type                  | Yes (from the allowed list only)         |
| Prompt                         | Yes                                      |
| Answer choices (if applicable) | Yes                                      |
| Correct answer                 | Yes (in the answers file)                |
| Accepted variants              | Yes for short-answer numeric items       |
| Points                         | Recommended                              |
| Feedback                       | Recommended                              |
| Connection to artifact         | Yes when the answer appears in the file  |

## 6. Allowed Quiz Question Types

The questions file may use **only** these auto-gradable types:

| Type            | Use For                                                        |
| --------------- | -------------------------------------------------------------- |
| Multiple choice | Concept checks with one correct answer                         |
| True/False      | Quick distinction checks                                       |
| Matching        | Concept-to-example mapping                                     |
| Ordering        | Sequences (DIKW, workflow, process steps)                      |
| Multi-select    | Identifying all valid KPIs, components, risks, fields          |
| Short answer    | Exact numbers from a query result (e.g., counts, sums)         |

Disallowed in the quiz: open-ended written response, scenario response, paragraph reasoning, anything requiring human or AI judgment.

All open reasoning lives in the artifact file, where the AI grader applies the rubric.

## 7. Integrated Workflow Pattern

Steps and the artifact must be a single flow, not two parallel assignments.

| Step    | Student Does                          | Artifact Connection                |
| ------- | ------------------------------------- | ---------------------------------- |
| Step 1  | Picks one PetVax problem/scenario     | Appears in artifact header         |
| Step 2  | Picks one KPI or data slice           | Appears in artifact                |
| Step 3  | Builds/updates the table or query     | Appears in artifact                |
| Step 4  | Runs query / computes value           | Value appears in artifact          |
| Step 4* | Check question: enter exact value     | Must match the artifact value      |
| Step 5  | Repeats on another slice              | Appears in artifact                |
| Step N  | Uploads the artifact                  | Artifact = scored evidence         |

The artifact is the polished result of the steps, not a separate deliverable.

## 8. Anti-Generic-AI Design

Generic AI-generated submissions should be easy to detect.

- One scenario carried through all steps and all artifact sections.
- Student-specific choices (chosen pet, chosen problem, chosen date range).
- Numeric short-answer values must match values in the artifact.
- Exact computed answers wherever the chapter's tool produces them.
- Screenshots or exported results in technical labs.
- Required sections in the artifact, each with a labeled placeholder in the template.

Do not rely on open prose alone. Always pair reasoning with checkable evidence.

## 9. AI-Grading Compatibility

The artifact file is parsed and graded by an AI agent (likely on a weekly cycle).

The answers file must give the AI grader:

| Element                | Purpose                                |
| ---------------------- | -------------------------------------- |
| Rubric (table)         | Consistent scoring                     |
| Required sections      | Detect missing work                    |
| Expected answer features | Identify good responses              |
| Acceptable variations  | Avoid false negatives                  |
| Common mistakes        | Trigger automated feedback             |
| Point values           | Score                                  |
| Consistency checks     | Same scenario throughout               |
| Notes for grader       | How to read the file, partial credit   |

The artifact template should use stable headings or fixed tables so the grader can locate each scored field.

## 10. Time and Cognitive Load

- Target **~60 minutes** per lab.
- One coherent workflow with one scenario carried through.
- Required deliverable is concise.
- Optional extensions are allowed but never required.
- If a lab grows beyond 60 minutes, cut steps before adding more.

## 11. Chapter Progression Rules

| Lab | Chapter | Tool / Artifact                                | Focus                                              |
| --- | ------- | ---------------------------------------------- | -------------------------------------------------- |
| 01  | intro   | Google Doc                                     | PetVax project orientation; very light             |
| 02  | ch02    | Google Doc — PetVax Performance Logic Map      | Conceptual MIS/BITM; no schema, SQL, Access        |
| 03  | ch03    | Google Sheet                                   | Data types, fields, records, simple tables         |
| 04  | ch04    | MS Access `.accdb`                             | Intro to Access; tables and basic objects          |
| 05  | ch05    | SQL file + screenshots / CSV                   | SELECT, filtering, aggregation                     |
| 06  | ch06    | MS Access `.accdb`                             | Relational model; relationships                    |
| 07  | ch07    | MS Access `.accdb`                             | Normalization                                      |
| 08  | ch08    | Mixed                                          | Midterm test review                                |

Labs 09–15 not yet slugged.

## 12. Output Sequence Inside Each File

### `lab-NN-questions-<YYYY-MM-DD>.md`

1. YAML
2. Title + tagline
3. Overview
4. Scenario
5. Required Files and Tools
6. Steps (numbered, with embedded checks)
7. Submission
8. Optional Extensions

### `lab-NN-answers-<YYYY-MM-DD>.md`

1. YAML (section: `"Lab Answers"`)
2. Title
3. Quiz Answer Key (table)
4. Artifact Rubric (table)
5. Consistency Checks
6. Notes for the AI Grader

---

## Lab 02 Addendum — Managing PetVax as a Business System

Lab 02 is intentionally light and conceptual. It mirrors Let's Build 2 (which uses the course as the worked example) and transfers the same logic to PetVax.

### What students do

1. Read a short PetVax scenario.
2. Choose one PetVax performance problem.
3. Identify one KPI tied to that problem.
4. Answer auto-gradable check questions distinguishing data, information, knowledge, wisdom, KPI, decision, R.E.A.D. stages, and the five components.
5. Build a one-page **PetVax Performance Logic Map**.
6. Connect the chosen problem to data, information, knowledge, wisdom/decision, process, information user/use, R.E.A.D., five-component risk, and "why this is an information system."
7. Submit the completed logic map.

### PetVax Performance Logic Map template

The student fills in the right column. The AI grader scores each row.

| Layer                              | Student Answer |
| ---------------------------------- | -------------- |
| PetVax performance problem         |                |
| KPI                                |                |
| Data: one raw fact                 |                |
| Information: summary or comparison |                |
| Knowledge: pattern or explanation  |                |
| Wisdom: decision or action         |                |
| Process that creates the data      |                |
| Information user and use           |                |
| R.E.A.D. stage most involved       |                |
| Weakest five-component link        |                |
| Why this is an information system  |                |

### Allowed / not allowed in Lab 02

- Allowed: business-system framing, KPIs, decisions, business processes, DIKW, R.E.A.D., information behavior, five components, one-page logic map.
- Not allowed: data types, schema design, SQL, MS Access, relationships, normalization. Those belong to later labs.

---

## Relationship to `autograded-lab`

`autograded-lab` produces a single-file, pure LMS-import quiz from four objective question types (MC, multi-select, short code input, file upload). It has no artifact-rubric component and no PetVax transfer requirement.

`lab-creation` (this skill) produces a SAM-style two-file lab (questions + answers) inside a per-lab folder, requires a PetVax transfer of the Let's Build, requires an AI-gradable artifact, and uses a broader auto-gradable question-type catalog.

Use `lab-creation` by default. Use `autograded-lab` only when the requirement is explicitly a single-file LMS quiz with no artifact.
