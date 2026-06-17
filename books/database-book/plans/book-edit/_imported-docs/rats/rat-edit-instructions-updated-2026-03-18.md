---
name: rat-skill
description: Generate or edit Readiness Assessment Tests (RATs) for BITM330 chapters using Bloom section structure, chapter-grounded reasoning, and conversion-safe markdown formatting.
---

# RAT Skill - Generation and Editing Instructions

This skill governs creating and editing Readiness Assessment Tests (RATs) for BITM330.

RATs evaluate whether students completed the reading and can reason with chapter concepts before class.

The goal is not memorization. The goal is clear reasoning about data, systems, and decisions.

---

## Input Requirements

Required inputs:

1. Chapter number
2. Chapter title
3. Chapter text or summary
4. Key concepts introduced in the chapter

Optional inputs:

- schema examples
- SQL queries
- sample data
- platform notes (SQLite, SQL Server, Access)

---

## Important Editing Rules

When editing an existing RAT:

1. Preserve the author's structure when possible.
2. Address all author comments or notes.
3. Remove TODO/comment markers after applying the requested fix.

If the RAT includes comments such as:

```markdown
// this question seems too easy
// need scenario here
// verify SQL syntax
```

Interpret and revise accordingly in the final output.

---

## RAT Structure

Each RAT must contain **40 questions total**.

Questions are grouped by Bloom level headers with **8 questions in each section**:

- Remember
- Understand
- Apply
- Analyze
- Evaluate

Rules:

- Do not add per-question Bloom labels.
- Do not create separate global sections for question types.
- Keep questions numbered and bold.
- Randomize question order within each Bloom section after drafting.

---

## Question Types

Use both question types in every Bloom section.

### Single-answer multiple choice

- 4 options (A-D)
- exactly one correct answer

### Multiple-answer questions

- stem includes `Select ALL that apply`
- 5 options (A-E)
- at least two correct answers

### Question formatting rules

Every question must:

- be numbered
- be bold
- place each answer option on its own line
- avoid revealing the correct answer

Example:

```markdown
**7. Which SQL clause filters rows after grouping?**

A. SELECT

B. WHERE

C. HAVING

D. ORDER BY
```

Example:

```markdown
**8. Select ALL that apply: Which activities are performed by a DBMS?**

A. Managing database storage

B. Executing SQL queries

C. Designing website layouts

D. Enforcing integrity constraints

E. Managing concurrent access
```

---

## RAT Sections (in order)

1. Title
2. Header image
3. Questions grouped under Bloom headers
4. Assessment Design Notes
5. Answer Key
6. Question Distribution Summary tables

---

## Title

```markdown
# Readiness Assessment Test (RAT): [Chapter Title]
```

---

## Header Image

Place immediately under the title.

```markdown
![RAT](https://res.cloudinary.com/dkndq6lyz/image/upload/w_200/f_auto/q_auto/RAT_big?_a=BAMAAAhK0)
```

---

## Bloom Distribution (fixed)

| Bloom Level | Target Count |
|---|---|
| Remember | 8 |
| Understand | 8 |
| Apply | 8 |
| Analyze | 8 |
| Evaluate | 8 |

Bloom section intent:

- **Remember**: foundational vocabulary and structural facts with minimal pure recall.
- **Understand**: interpretation and explanation of why concepts matter.
- **Apply**: realistic technical or business scenarios.
- **Analyze**: decomposition, comparison, and diagnosis of trade-offs.
- **Evaluate**: judgment of best approach under constraints.

---

## Design Criterion Targets

| Design Criterion | Target Count |
|---|---|
| Application-based | ~12-14 |
| Scenario-based | ~10-12 |
| Definition-only | ~8-10 |

Distribute criteria across multiple Bloom sections.

Coverage matrix template:

| Design Criterion | Bloom Sections Used | Questions | Count |
|---|---|---|---|
| Application-based | ... | ... | ... |
| Scenario-based | ... | ... | ... |
| Definition-only | ... | ... | ... |

---

## AI-Resistance Strategies

Apply at least five strategies per RAT, spread across multiple Bloom sections:

1. Chapter-specific reasoning over generic knowledge
2. Chapter schema and sample-data grounding
3. Scenario stems with chapter-specific traps
4. Multi-answer options requiring fine-grained discrimination
5. Distractors from adjacent concepts
6. Non-obvious paraphrased correct answers
7. Query-output prediction from concrete data
8. Multi-step progression reasoning
9. Platform-specific differences discussed in chapter

---

## Chapter Artifact Checklist

Before finalizing:

- include chapter-specific terminology
- reference chapter tables/columns
- include chapter SQL logic or output interpretation
- include chapter-grounded business scenarios
- include platform notes where relevant

---

## Designing Questions Robust to AI

Use chapter-specific framing and chapter artifacts.

Weak:

```markdown
What is a primary key?
```

Stronger:

```markdown
In this chapter's Grading Database example, why is StudentID a stronger primary key than Name?
```

Use plausible distractors derived from related concepts, not obviously wrong options.

---

## Answer Key Requirements

For every question:

1. Repeat full question text exactly.
2. State correct answer(s).
3. Provide full explanation citing chapter language (section reference plus quote or close paraphrase).
4. Include option-by-option table with one row per option.

Single-answer format (rows A-D):

| Option | Correct? | Reasoning |
|---|---|---|
| A | ... | ... |
| B | ... | ... |
| C | ... | ... |
| D | ... | ... |

Multiple-answer format (rows A-E):

| Option | Correct? | Reasoning |
|---|---|---|
| A | ... | ... |
| B | ... | ... |
| C | ... | ... |
| D | ... | ... |
| E | ... | ... |

---

## Question Distribution Summary

At the end of the RAT include three tables.

### Bloom Level

| Bloom Level | Questions | Count |
|---|---|---|
| Remember | ... | 8 |
| Understand | ... | 8 |
| Apply | ... | 8 |
| Analyze | ... | 8 |
| Evaluate | ... | 8 |

### Question Type

| Question Type | Questions | Count |
|---|---|---|
| Single-answer MC | ... | ... |
| Select ALL | ... | ... |

### Design Criterion

| Design Criterion | Questions | Count |
|---|---|---|
| Application-based | ... | ... |
| Scenario-based | ... | ... |
| Definition-only | ... | ... |

---

## Student-Facing Quiz Rule

When generating actual student assessments:

- Never mark options with `correct`, `recommended`, checkmarks, or equivalent indicators.
- Correctness appears only in the answer key.

---

## Preflight Checklist

Before final output, confirm:

- 40 total questions
- 8 questions in each Bloom section
- mixed question types in every Bloom section
- no per-question Bloom labels
- one option per line in question body
- answer key includes per-option row reasoning for every question
- all three summary tables are complete

Source Priority for RAT Construction

The RAT must be based on the most recent instructional source files for the chapter.

Use these files as the primary source base:

the most recent chapter main file

the most recent Lets-Build file

the most recent Terms or Term Treasury file

Do not base RAT questions on:

Reflection files

Discussion question files

Lab files

Rationale

The RAT is meant to assess whether students completed the reading and understood the instructional content before class.

Therefore:

the main chapter file provides the conceptual and explanatory foundation

the Lets-Build file provides applied logic, workflow, and practical execution

the Terms file provides core vocabulary and formal definitions

Reflection and lab materials serve different purposes:

Reflection files are designed for discussion, judgment, and post-reading synthesis

Lab files are designed for hands-on work and create-level activity

These may inform tone or terminology, but they must not serve as the basis for RAT question design.

Source Selection Rules

When multiple dated versions exist, always use the most recent dated version of:

ch<number>-main-<date>.md or equivalent main chapter file

ch<number>-lets-build-<date>.md

ch<number>-terms-<date>.md or equivalent terms file

If legacy naming is used, choose the newest file that clearly maps to each source type.

Priority order:

Main chapter file

Lets-Build file

Terms / Term Treasury file

Question Construction Rule

Questions should be derived from:

chapter concepts explained in the main file

practical applications and workflows introduced in Lets-Build

vocabulary and formal definitions from the Terms file

Questions should not be lifted from:

reflection prompts

discussion prompts

lab exercises

Avoid turning open-ended reflection content into multiple-choice questions unless the underlying concept is clearly taught in the main, Lets-Build, or Terms files.

Preflight Source Check

Before drafting the RAT, confirm:

the most recent main chapter file was used

the most recent Lets-Build file was used

the most recent Terms file was used

Reflection and Lab files were not used as primary assessment sources