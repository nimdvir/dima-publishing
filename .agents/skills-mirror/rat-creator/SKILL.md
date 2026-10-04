---
name: rat-creator
description: >
  Create or revise BITM330 Readiness Assessment Tests (RATs) and chapter quizzes.
  Use when: drafting a new RAT companion file; revising an existing RAT or quiz;
  generating Bloom-structured multiple-choice and Select ALL questions; producing a
  complete answer key with option-by-option reasoning; creating or updating a dated
  chNN-rat-YYYY-MM-DD.md file in a chapter's rat/ folder. Do not use for reflection
  questions, labs, Lets-Build activities, chapter editing, image work, or LMS-import
  autograded labs.
argument-hint: Chapter number, chapter folder, main file path, or existing RAT file path (for example, "ch07" or "chapter-drafts/ch07-normalization/main/ch07-main-2026-05-21.md")
---

# BITM330 RAT Creator Skill

Create or revise the Readiness Assessment Test (RAT) companion for a BITM330 chapter. A RAT is a chapter-grounded readiness quiz that checks whether students completed the reading and can reason with chapter concepts before class.

The goal is not memorization. The goal is clear reasoning about data, systems, and decisions.

## Abbreviations

- **RAT** - Readiness Assessment Test.
- **MC** - single-answer multiple choice.
- **Select ALL** - multiple-answer question using the phrase `Select ALL that apply`.
- **GD** / **GDB** - Grading Database, the canonical running case when relevant.

Use these abbreviations consistently in notes, section labels, and final responses.

## When to Use

Use this skill when the user asks to:

- create a RAT for a BITM330 chapter
- create a chapter quiz or readiness quiz
- revise an existing RAT file
- add or repair a RAT answer key
- convert chapter concepts into Bloom-structured quiz questions
- check a RAT for question distribution, answer-key completeness, or student-facing correctness markers
- create a new dated file in a chapter's `rat/` folder

Do not use this skill for:

- full chapter editing or main manuscript revision, use `chapter-editor` or `chapter-editor-light`
- Review and Reflection companion files, use `reflection`
- Lets-Build companion files, use `lets-build-creator`
- PetVax lab transfer, use `lab-creation`
- LMS-import autograded labs, use `autograded-lab`
- image suggestions, prompts, or production
- general lecture quizzes outside the BITM330 chapter companion pattern

## Source File Selection

Base a new RAT primarily on the most recent dated source files for the chapter.

1. Use the latest main chapter file: `chapter-drafts/<chapter-folder>/main/chNN-main-YYYY-MM-DD.md`.
2. Use the latest Lets-Build file when it clarifies applied examples, SQL tasks, schema details, or expected outputs.
3. Use the latest Terms or Term Treasury file when it helps keep vocabulary precise.
4. Use the book outline as a scope check: `../../../.docs/outline/outline-taglines-2026-05-06.md`.
5. Do not base a new RAT primarily on Reflection, Lab, archived drafts, image files, or old RAT files.
6. If the user asks to revise an existing RAT, use that RAT as the target while checking it against the current chapter sources.
7. If several source files have the same apparent date or the chapter identity is ambiguous, ask before writing.

## File Naming and Location

When creating a new RAT or making a meaningful revision, create a new dated file. Do not overwrite older dated RAT files unless the user explicitly names that file as the target.

- Filename pattern: `chNN-rat-YYYY-MM-DD.md`
- Example: `ch07-rat-2026-05-26.md`
- Location: `chapter-drafts/<chapter-folder>/rat/`

If the chapter does not yet have a `rat/` folder, create it under the chapter folder.

## Required RAT Structure

Every RAT must contain these sections in this order:

1. Title
2. Header image
3. Assessment Design Notes (including Bloom Distribution, Design Criterion Coverage, and AI-Resistance Strategies)
4. Questions grouped under Bloom headers (with page breaks between each Bloom section)
5. Answer Key
6. Question Distribution Summary

Use this title pattern:

```markdown
# Readiness Assessment Test (RAT): [Chapter Title]
```

Use the centered animated GIF header immediately below the title. Every RAT must include this GIF directly under the H1 title, followed by a centered `<p>` tag for spacing before the Assessment Design Notes:

```html
<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/RAT_nqr5a3?_a=BAMAAAX00" alt="RAT or Quiz section icon" width="220">
</p>
<p align="center">
```

## Heading Rules

- H1 is used only for the RAT title.
- H2 is used for Assessment Design Notes, Bloom sections (`## Remember Questions`, `## Understand Questions`, `## Apply Questions`, `## Analyze Questions`, `## Evaluate Questions`), Answer Key, and Question Distribution Summary.
- H3 is used inside the Answer Key for `### Remember Questions`, `### Understand Questions`, `### Apply Questions`, `### Analyze Questions`, `### Evaluate Questions`.
- Do not use H4 headings.
- Do not skip heading levels.
- Do not add per-question Bloom tags.
- Do not create separate global question-type sections.

## Page Breaks

A page break must separate each Bloom section and separate the questions from the Answer Key. Use the canonical page break format:

```html
<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
```

Insert page breaks between:
- Assessment Design Notes and `## Remember Questions`
- Each adjacent pair of Bloom sections (Remember → Understand, Understand → Apply, Apply → Analyze, Analyze → Evaluate)
- The last Bloom section (`## Evaluate Questions`) and `## Answer Key`

## Bloom Distribution

Each RAT contains exactly **40 questions total**.


| Bloom Level | Required Count | Intent                                                                |
| ----------- | -------------- | --------------------------------------------------------------------- |
| Remember    | 8              | Foundational vocabulary and structural facts with minimal pure recall |
| Understand  | 8              | Explain why concepts matter, interpret, and paraphrase                |
| Apply       | 8              | Use chapter concepts in realistic scenarios and technical tasks       |
| Analyze     | 8              | Compare alternatives, break down systems, and diagnose trade-offs     |
| Evaluate    | 8              | Judge design quality and choose the best approach under constraints   |


Rules:

- Express Bloom level only through the section header.
- Keep cognitive rigor increasing from Remember to Evaluate.
- Randomize question order within each Bloom section after drafting.
- Keep every section to exactly 8 questions.

## Question Types

Use both question formats in every Bloom section.

### Single-Answer Multiple Choice

- 4 options.
- Labels are A-D.
- Exactly one correct answer.
- The student-facing section does not mark the correct answer.

Example:

```markdown
**7. Which SQL clause filters rows after grouping?**

A. SELECT

B. WHERE

C. HAVING

D. ORDER BY
```

### Multiple-Answer Select ALL

- Stem includes `Select ALL that apply`.
- 5 options.
- Labels are A-E.
- At least two correct answers.
- The student-facing section does not mark correct answers.

Example:

```markdown
**8. Select ALL that apply: Which activities are performed by a DBMS?**

A. Managing database storage

B. Executing SQL queries

C. Designing website layouts

D. Enforcing integrity constraints

E. Managing concurrent access
```

## Question Formatting Rules

Every question must:

- be numbered
- be bold
- place each answer option on its own line
- avoid revealing the correct answer in the question section
- avoid vague stems that could fit any business course
- use plausible distractors derived from chapter concepts

Do not use `recommended`, `correct`, checkmarks, bolded correct options, answer labels, or any other correctness indicators in the student-facing questions.

## Chapter Grounding

Questions must be anchored in the chapter's actual content. Use chapter-specific terminology, frameworks, examples, tables, columns, SQL logic, business scenarios, and platform notes when relevant.

Before finalizing, confirm the RAT includes:

- chapter-specific terminology
- at least two references to chapter tables or columns when the chapter includes database examples
- at least two references to chapter SQL logic or output when the chapter includes SQL
- at least one scenario tied to organizational impact or business decision-making
- platform-specific behavior when the chapter discusses SQLite, SQL Server, Access, Power BI, or another named platform

Weak:

```markdown
What is a primary key?
```

Stronger:

```markdown
In this chapter's Grading Database example, why is StudentID a stronger primary key than Name?
```

## Design Criterion Targets

Distribute the design criteria across Bloom sections rather than isolating them in one block.


| Design Criterion  | Target Count |
| ----------------- | ------------ |
| Application-based | 12-14        |
| Scenario-based    | 10-12        |
| Definition-only   | 8-10         |


Use this coverage matrix in the Assessment Design Notes:


| Design Criterion  | Bloom Sections Used | Questions | Count |
| ----------------- | ------------------- | --------- | ----- |
| Application-based | ...                 | ...       | ...   |
| Scenario-based    | ...                 | ...       | ...   |
| Definition-only   | ...                 | ...       | ...   |


## AI-Resistance Strategies

Apply at least five strategies per RAT, spread across multiple Bloom sections:

1. Chapter-specific reasoning over generic knowledge.
2. Schema-specific context using exact tables, columns, sample data, and SQL from the chapter.
3. Scenario stems with embedded traps that depend on chapter principles.
4. Multi-answer options that require fine-grained discrimination.
5. Distractors drawn from adjacent but distinct concepts.
6. Non-obvious correct answers that are paraphrased rather than keyword-matched.
7. Output prediction from concrete data.
8. Stage-progression reasoning tied to the chapter sequence.
9. Platform-specific details when the chapter covers them.

Do not make questions adversarial for their own sake. The point is to reward careful reading and reasoning.

## Assessment Design Notes

After the header image, before the student-facing questions, include:

```markdown
## Assessment Design Notes
```

This section must include:

- a short note on how the RAT supports readiness for the chapter
- the **Bloom Distribution** table (fixed 8-8-8-8-8 count)
- the **Design Criterion Coverage** matrix
- a list of **AI-Resistance Strategies Used**

Keep the notes useful to the instructor. Do not reveal the answer key in this section.

## Answer Key Requirements

After the student-facing questions (following the final page break), include:

```markdown
## Answer Key
```

For every question, include:

1. Full question text exactly as written.
2. Correct answer or answers.
3. Explanation tied to chapter language, using a section reference plus a quote or close paraphrase when possible.
4. Option-by-option table with one row per option.

For single-answer MC questions, use rows A-D:


| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | ...      | ...       |
| B      | ...      | ...       |
| C      | ...      | ...       |
| D      | ...      | ...       |


For Select ALL questions, use rows A-E:


| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | ...      | ...       |
| B      | ...      | ...       |
| C      | ...      | ...       |
| D      | ...      | ...       |
| E      | ...      | ...       |


Answer-key explanations should be direct, chapter-grounded, and instructor-like. Do not over-explain distractors, but do make clear why each option is correct or incorrect.

## Question Distribution Summary

At the end of the RAT, include:

```markdown
## Question Distribution Summary
```

Include all three summary tables.

**Table 1: Bloom Level**


| Bloom Level | Questions | Count |
| ----------- | --------- | ----- |
| Remember    | ...       | 8     |
| Understand  | ...       | 8     |
| Apply       | ...       | 8     |
| Analyze     | ...       | 8     |
| Evaluate    | ...       | 8     |


**Table 2: Question Type**


| Question Type                | Questions | Count |
| ---------------------------- | --------- | ----- |
| Single-answer MC             | ...       | ...   |
| Multiple-answer (Select ALL) | ...       | ...   |


**Table 3: Design Criterion**


| Design Criterion  | Questions | Count |
| ----------------- | --------- | ----- |
| Application-based | ...       | ...   |
| Scenario-based    | ...       | ...   |
| Definition-only   | ...       | ...   |


## Creation Workflow

When creating a RAT:

1. Identify the chapter number, chapter folder, and chapter title.
2. Locate the latest dated main chapter file.
3. Read enough of the main file to extract learning objectives, key concepts, examples, tables, SQL, callouts, and summary points.
4. Read the latest Lets-Build and Terms files when they exist and are relevant.
5. Check the outline to avoid adding content outside the chapter scope.
6. Draft question targets by Bloom level before writing the full RAT.
7. Draft the student-facing questions first, preserving the required counts and mixed question types.
8. Draft Assessment Design Notes.
9. Draft the full Answer Key with option-by-option reasoning.
10. Complete the Question Distribution Summary.
11. Save the RAT as a new dated file in the chapter's `rat/` folder.
12. Run the validation checklist below before final response.

## Revision Workflow

When revising an existing RAT:

1. Read the target RAT and identify its structure, question count, answer-key coverage, and author comments.
2. Read the current main chapter file and supporting Lets-Build or Terms files as needed.
3. Preserve useful existing questions and answer-key material when they remain accurate.
4. Address all author comments and `//` notes.
5. Remove TODO or `//` markers once resolved.
6. Fix distribution, formatting, and correctness-marker problems.
7. Create a new dated file unless the user explicitly asks to edit the existing file.
8. Do not change Reflection, Lab, Lets-Build, Terms, or main chapter files unless the user asks.

## Quality Checklist

Before finalizing, confirm:

- The file uses the required title and centered RAT image header.
- There are exactly 40 student-facing questions.
- Each Bloom section has exactly 8 questions.
- Every Bloom section includes both single-answer MC and Select ALL questions.
- Student-facing questions contain no correctness markers.
- Every question is bold and numbered.
- Every option appears on its own line.
- Single-answer questions use A-D and exactly one correct answer.
- Select ALL questions use A-E and at least two correct answers.
- Questions are chapter-grounded and avoid generic memorization where possible.
- Assessment Design Notes include Bloom distribution, design criteria, and AI-resistance strategies.
- The Answer Key repeats every full question and includes correct answer(s), explanation, and option-by-option reasoning.
- The Question Distribution Summary includes Bloom Level, Question Type, and Design Criterion tables.
- The output file is saved as `chNN-rat-YYYY-MM-DD.md` in the chapter's `rat/` folder unless the user requested a specific target.

## Final Response to User

After creating or revising a RAT, respond with:

```markdown
Done - created/revised RAT for Chapter NN.

- Source chapter: <filename.md>
- Output file: <filename.md>
- Questions: 40 total, 8 per Bloom section
- Question types: <single-answer count> single-answer MC; <Select ALL count> Select ALL
- Answer key: complete / partial with note
- Validation: <brief result>
```

If you could not complete a required source check or validation step, say so clearly.

## Source History

This skill consolidates the legacy RAT guidance from:

- `../../../.docs/RATS/rat-edit-instructions-updated-2026-03-18.md`
- `../../../.docs/RATS/rat-edit-instructions.md`
- `../../../.docs/RATS/RAT-GUIDELINES.md`

