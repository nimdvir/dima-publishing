---
name: online-quiz-creation
description: >
  Create Brightspace-importable online quizzes as paired CSV + MD files.
  Supports all 7 Brightspace question types (MC, MS, TF, SA, WR, M, O).
  Use when: generating LMS quiz files from chapter content, RATs, or any
  instructional source; converting questions into import-ready Brightspace
  format with hints, per-option feedback, difficulty ratings, and answer keys;
  creating standalone online quizzes for any subject or topic.
argument-hint: "ch05" or "10 MC + 2 MS questions on normalization from Chapter 5" or "15 mixed-type questions about SQL joins from ch06-lets-build"
---

# BITM330 Online Quiz Creation Skill

Create a Brightspace-ready online quiz as paired CSV + MD files. The CSV follows
the `Sample_Question_Import_UTF8.csv` import format exactly so it can be imported
directly into Brightspace. The MD is a complete human-readable mirror — every
CSV field is visible in the MD, including metadata, hints, per-option feedback,
difficulty ratings, points, and a quick-reference answer key table.

This skill is source-agnostic: it works from any chapter, section, companion file,
or general instructional material the user provides. The user controls the question
count, type mix, Bloom distribution, and output location.

## Abbreviations

- **MC** — single-answer Multiple Choice (`NewQuestion,MC`)
- **MS** — Multi-Select (Select ALL that apply; `NewQuestion,MS`)
- **TF** — True/False (`NewQuestion,TF`)
- **SA** — Short Answer (`NewQuestion,SA`)
- **WR** — Written Response (`NewQuestion,WR`)
- **M** — Matching (`NewQuestion,M`)
- **O** — Ordering (`NewQuestion,O`)
- **Brightspace** — D2L Brightspace LMS
- **CSV UTF-8** — CSV encoded as UTF-8 with BOM, required for Brightspace import of non-ASCII characters
- **RAT** — Readiness Assessment Test (existing chapter companion quizzes)

## When to Use

Use this skill when the user asks to:

- create a Brightspace-importable quiz from chapter content
- generate paired CSV + MD quiz files for LMS deployment
- convert existing RAT questions into import-ready Brightspace format
- build a standalone online quiz from any instructional source
- produce questions with hints, per-option feedback, difficulty ratings, and explanations
- add a new dated quiz file to `books/database-book/Brightspace/Rats/` (or a user-specified location)

Do not use this skill for:

- creating or revising chapter companion RAT files (use `rat-creator`)
- building SAM-style PetVax labs (use `lab-creation`)
- building autograded chapter labs from Lets-Build content (use `autograded-lab`)
- creating reflection or review questions (use `reflection`)
- editing main chapter prose (use `chapter-editor`)

## Mandatory User Input Gathering

Before generating any quiz, ask the user the following questions. Do not proceed
to generation until you have clear answers for at least items 1–4.

1. **Source material** — What should the questions be based on?
   - A chapter number (e.g., "ch05")
   - A specific file path (e.g., "chapter-drafts/ch05-sql/main/ch05-main-2026-05-21.md")
   - A section or topic description (e.g., "normalization and anomalies from Chapter 3")
   - An existing RAT or quiz file to adapt

2. **Number of questions** — How many questions? (Default: 10)

3. **Question type mix** — Which types and in what proportions?
   - All 7 Brightspace types are available: MC, MS, TF, SA, WR, M, O
   - Default mix when not specified: 8 MC + 2 MS
   - Examples of user requests: "10 MC", "5 MC + 3 MS + 2 TF", "all MS", "3 MC + 2 SA + 1 WR"

4. **Output file prefix and location** — What to name the files and where to put them.
   - Default location: `books/database-book/Brightspace/Rats/`
   - Default filename pattern: `{prefix}-{YYYY-MM-DD}.{csv|md}`
   - Example: `ch05-normalization-quiz-2026-06-17.csv` and `ch05-normalization-quiz-2026-06-17.md`

5. **Bloom level targets** (optional) — Target Bloom levels for the questions.
   - If unspecified, aim for a mix: ~20% Remember/Understand, ~50% Apply/Analyze, ~30% Evaluate/Create

6. **Additional features** (optional, ask or infer):
   - Include Hints? (default: yes)
   - Include per-option feedback? (default: yes for MC/MS/TF)
   - Include Difficulty ratings? (default: yes, scale 1–5)
   - Include question IDs? (default: yes, auto-generated)
   - Points per question? (default: 1 for MC/TF, 2 for MS, varies for others)

## Source File Selection

Base the quiz questions primarily on the source the user specifies.

1. If a chapter number is given, use the most recent dated files in that chapter's folders:
   - `chapter-drafts/<chapter-folder>/main/chNN-main-YYYY-MM-DD.md` (primary)
   - `chapter-drafts/<chapter-folder>/lets-build/chNN-lets-build-YYYY-MM-DD.md` (for applied examples)
   - `chapter-drafts/<chapter-folder>/terms/chNN-terms-YYYY-MM-DD.md` (for vocabulary precision)
2. If a specific file path is given, use that file as the primary source.
3. If the user references existing RATs in `Brightspace/Rats/`, use them as style
   references for question quality, scenario framing, and Bloom alignment — but
   generate fresh questions, not copies.
4. Use the book outline (`.docs/outline/`) only as a scope check.
5. Do not base quiz questions on Reflection files, Lab files, or archived drafts
   unless the user explicitly asks.

## File Naming and Location

- **CSV output**: `{user-specified-path}/{prefix}-{YYYY-MM-DD}.csv`
- **MD output**: `{user-specified-path}/{prefix}-{YYYY-MM-DD}.md`
- **Default path**: `books/database-book/Brightspace/Rats/`

Always create a new dated file pair. Do not overwrite existing files unless the
user explicitly names that file as the target.

If the target directory does not exist, create it.

## CSV Output Specification

The CSV must follow the `Sample_Question_Import_UTF8.csv` format exactly.
Reference file (read-only): `books/database-book/Brightspace/Rats/Sample_Question_Import_UTF8.csv`

### Global CSV Rules

- File encoding: **CSV UTF-8** (UTF-8 with BOM). Always write with `encoding='utf-8-sig'`.
- Column count: **5 columns** per row. Every row has exactly 5 comma-separated fields.
- Blank separator rows: `,,,,` between each question.
- Comment lines start with `//` in column 1.
- Question IDs (when used) should follow the pattern: `{CourseCode}-{QuestionNumber}` (e.g., `BITM330-Q01`).
- All text fields that contain commas, quotes, or newlines must be double-quoted.

### Metadata Comment Block (Top of CSV)

Every CSV must start with a metadata comment block:

```csv
"// Brightspace CSV Import — {quiz title}",,,,
"// Source: {source description}",,,,
"// Date: {YYYY-MM-DD}",,,,
"// {N} questions: {type breakdown}",,,,
"// Bloom distribution: {distribution}",,,,
"// Save as CSV UTF-8 before importing",,,,
,,,,,
```

Then a blank separator row, then the questions begin.

### Question Type: MC (Multiple Choice)

```csv
NewQuestion,MC,,,
ID,{CourseCode}-{QNN},,,
Title,"{Short title for the question}",,,
QuestionText,"{Full question text. May include a short description on a new line.}",,,
Points,{points},,,
Difficulty,{1-5},,,
Option,{weight},"{option text}",,"{per-option feedback}"
Option,{weight},"{option text}",,"{per-option feedback}"
...
Hint,,,,"{hint text}"
Feedback,,,,"{explanation text}"
```

- **Weight values**: `100` for the correct answer, `0` for all distractors.
  Partial credit (e.g., `50`) is allowed but rare.
- **Option count**: typically 4. Must have exactly one correct option (weight=100).
- **Hint** row: omit if no hint; include the field label with empty col3/col5 when present.

### Question Type: MS (Multi-Select / Select ALL that apply)

```csv
NewQuestion,MS,,,
ID,{CourseCode}-{QNN},,,
Title,"{Short title}",,,
QuestionText,"{Full question text; prefix with 'Select ALL that apply: '}",,,
Points,{points},,,
Difficulty,{1-5},,,
Scoring,RightAnswers,,,
Option,{1|0},"{option text}",,"{per-option feedback}"
Option,{1|0},"{option text}",,"{per-option feedback}"
...
Hint,,,,"{hint text}"
Feedback,,,,"{explanation text}"
```

- **Weight values**: `1` for correct options, `0` for distractors.
- **Scoring**: always `RightAnswers` for MS.
- At least 2 correct options required for an MS question.
- The question text should always include the phrase "Select ALL that apply".
- **Option count**: typically 5.

### Question Type: TF (True/False)

```csv
NewQuestion,TF,,,
ID,{CourseCode}-{QNN},,,
Title,"{Short title}",,,
QuestionText,"{Full question text}",,,
Points,{points},,,
Difficulty,{1-5},,,
TRUE,{weight},,"{feedback for TRUE}"
FALSE,{weight},,"{feedback for FALSE}"
Hint,,,,"{hint text}"
Feedback,,,,"{explanation text}"
```

- **Weight values**: `100` for the correct answer, `0` for the incorrect answer.

### Question Type: SA (Short Answer)

```csv
NewQuestion,SA,,,
ID,{CourseCode}-{QNN},,,
Title,"{Short title}",,,
QuestionText,"{Full question text}",,,
Points,{points},,,
Difficulty,{1-5},,,
InputBox,{rows},{cols},,
Answer,{weight},"{expected answer text}",{regexp flag}
Answer,{weight},"{alternate acceptable answer}",{regexp flag}
Hint,,,,"{hint text}"
Feedback,,,,"{explanation text}"
```

- **InputBox**: rows and columns for the answer input box (e.g., `3,40`).
- **Answer weight**: typically `100` for the primary correct answer.
- **regexp flag**: use `regexp` in column 4 if the answer text is a regular expression; leave blank for literal match.
- Multiple Answer rows are allowed for alternate acceptable answers.

### Question Type: WR (Written Response)

```csv
NewQuestion,WR,,,
ID,{CourseCode}-{QNN},,,
Title,"{Short title}",,,
QuestionText,"{Full question text}",,,
Points,{points},,,
Difficulty,{1-5},,,
InitialText,"{Initial text shown in the response box}",,,
AnswerKey,"{Expected answer or grading rubric}",,,
Hint,,,,"{hint text}"
Feedback,,,,"{explanation text}"
```

- WR questions are manually graded. The AnswerKey provides the expected response
  or a grading rubric for the instructor.

### Question Type: M (Matching)

```csv
NewQuestion,M,,,
ID,{CourseCode}-{QNN},,,
Title,"{Short title}",,,
QuestionText,"{Full question text}",,,
Points,{points},,,
Difficulty,{1-5},,,
Scoring,EquallyWeighted,,,
Choice,{n},"{choice text}",,
Choice,{n},"{choice text}",,
...
Match,{n},"{match text}",,
Match,{n},"{match text}",,
...
Hint,,,,"{hint text}"
Feedback,,,,"{explanation text}"
```

- **Choice numbers**: sequential starting at 1.
- **Match numbers**: reference the Choice number they pair with.
- **Scoring**: `EquallyWeighted` is standard; `RightMinusWrong` is an alternative.

### Question Type: O (Ordering)

```csv
NewQuestion,O,,,
ID,{CourseCode}-{QNN},,,
Title,"{Short title}",,,
QuestionText,"{Full question text}",,,
Points,{points},,,
Difficulty,{1-5},,,
Scoring,RightMinusWrong,,,
Item,"{item text}",{HTML flag},"{feedback for this position}"
Item,"{item text}",{HTML flag},"{feedback for this position}"
...
Hint,,,,"{hint text}"
Feedback,,,,"{explanation text}"
```

- **Items are listed in the correct order** in the CSV. Brightspace shuffles them for display.
- **HTML flag**: `HTML` if the item text contains HTML, `NOT HTML` otherwise.
- **Scoring**: `RightMinusWrong` is standard; `EquallyWeighted` is an alternative.

## MD Output Specification

The MD file is a complete human-readable mirror of the CSV. Every CSV field must
be represented in the MD so nothing is hidden from the reviewer.

### Metadata Header

```markdown
# {Quiz Title}

**Source:** {source description}
**Date:** {YYYY-MM-DD}
**Total:** {N} questions ({type breakdown})
**Bloom distribution:** {distribution}
**CSV file:** `{csv-filename}`

---
```

### Per-Question Format

Every question uses this structure, with slight variations by type:

```markdown
## {Type Label} Questions

**Q{N}. {Title}**

_Short description: {one-sentence description of what the question tests}_

{Full question text}

A. {option text} ← ✓ CORRECT
_Feedback: {per-option feedback}_

B. {option text}
_Feedback: {per-option feedback}_

C. {option text}
_Feedback: {per-option feedback}_

D. {option text}
_Feedback: {per-option feedback}_

**Hint:** {hint text}

**Explanation:** {feedback/explanation text}

**Points:** {points} | **Difficulty:** {difficulty}/5 | **ID:** {question ID} | **Bloom:** {Bloom level}

---
```

### Type-Specific MD Variations

**MS (Multi-Select):** Use `✓ CORRECT` / blank markers on each option.
The question text should include "Select ALL that apply".

**TF (True/False):** Two options only: True and False.

```markdown
**Q{N}. {Title}**

{Full question text}

- [ ] True
- [ ] False

**Correct Answer:** {True|False}

**Hint:** {hint text}

**Explanation:** {explanation text}

**Points:** {points} | **Difficulty:** {difficulty}/5 | **ID:** {question ID} | **Bloom:** {Bloom level}
```

**SA (Short Answer):** Show the expected answer(s) and whether they use regexp matching.

```markdown
**Q{N}. {Title}**

{Full question text}

**Expected Answer(s):**

- "{answer text}" {regexp indicator}

**Input Box:** {rows} rows × {cols} columns

**Hint:** {hint text}

**Explanation:** {explanation text}

**Points:** {points} | **Difficulty:** {difficulty}/5 | **ID:** {question ID} | **Bloom:** {Bloom level}
```

**WR (Written Response):** Show the initial text and answer key/rubric.

```markdown
**Q{N}. {Title}**

{Full question text}

**Initial Text Shown to Student:** {initial text}

**Answer Key / Grading Rubric:**
{answer key text}

**Hint:** {hint text}

**Explanation:** {explanation text}

**Points:** {points} | **Difficulty:** {difficulty}/5 | **ID:** {question ID} | **Bloom:** {Bloom level}
```

**M (Matching):** Show the choice→match pairs in a table.

```markdown
**Q{N}. {Title}**

{Full question text}

| Choice     | Correct Match        |
| ---------- | -------------------- |
| {choice 1} | {match for choice 1} |
| {choice 2} | {match for choice 2} |

**Scoring:** {scoring method}

**Hint:** {hint text}

**Explanation:** {explanation text}

**Points:** {points} | **Difficulty:** {difficulty}/5 | **ID:** {question ID} | **Bloom:** {Bloom level}
```

**O (Ordering):** Show items in the correct order.

```markdown
**Q{N}. {Title}**

{Full question text}

**Correct Order:**

1. {item 1}
2. {item 2}
3. {item 3}

**Scoring:** {scoring method}

**Hint:** {hint text}

**Explanation:** {explanation text}

**Points:** {points} | **Difficulty:** {difficulty}/5 | **ID:** {question ID} | **Bloom:** {Bloom level}
```

### Quick-Reference Answer Key Table

Every MD must end with a summary table:

```markdown
---

## Quick-Reference Answer Key

| #   | Type | Correct Answer(s) | Points | Difficulty | Bloom    |
| --- | ---- | ----------------- | ------ | ---------- | -------- |
| 1   | MS   | A, C, D, E        | 2      | 5          | Evaluate |
| 2   | MS   | A, C, D, E        | 2      | 4          | Analyze  |
| 3   | MC   | C                 | 1      | 4          | Analyze  |
| 4   | MC   | A                 | 1      | 5          | Evaluate |
| ... | ...  | ...               | ...    | ...        | ...      |
```

### MD Writing Rules

- **Option lettering**: Use uppercase letters: A, B, C, D, E, F...
- **Correct answer marker for MC/MS**: `← ✓ CORRECT` appended to the option line.
- **Per-option feedback**: Italicized on the line after the option: `*Feedback: {text}*`.
- **Hint**: If a question has no hint, omit the `**Hint:**` line entirely.
- **Difficulty**: Always shown as `{n}/5`.
- **Bloom level**: Shown in the metadata line and in the answer key table.
- **Separator**: `---` between questions.
- **Option order in MD**: Match the order in the CSV (which should be the display order).
  Do not reorder options in the MD relative to the CSV.

## Question Design Rules

1. **Scenario-based**: Favor scenario questions (e.g., "A clinic wants to...") over
   bare definition recall. Embed the concept in a realistic business or academic situation.

2. **Bloom-grounded**: Distribute questions across Bloom levels as agreed with the user.
   Default: ~20% Remember/Understand, ~50% Apply/Analyze, ~30% Evaluate/Create.

3. **AI-resistant distractors**: Every distractor should be plausible to someone who
   has not read the material, but clearly wrong to someone who has. Avoid:
   - obviously absurd options
   - "all of the above" / "none of the above"
   - options that differ only by one word
   - joke answers

4. **Chapter-anchored explanations**: Every Feedback/Explanation must reference
   where in the source material the answer can be found. Use specific section names
   or quoted passages. Example: `In "Why Databases Matter for Business Performance," the chapter says...`

5. **Option count**: 4 options for MC, 5 for MS. Keep options parallel in length
   and grammatical form. Avoid making the correct answer noticeably longer or shorter.

6. **One clear correct answer**: For MC, exactly one option is unambiguously correct.
   For MS, at least 2 options are correct and the question stem makes the
   multi-select nature clear.

7. **No trick questions**: The goal is to verify understanding, not to trap students.

8. **Distinct question IDs**: Every question gets a unique ID. Use the pattern
   `{CourseCode}-{QQQ}` (e.g., `BITM330-Q01`, `BITM330-Q02`).

## Creation Workflow

1. **Gather input** — Ask the user the mandatory questions (source, count, types,
   prefix/location). Do not skip this step.

2. **Read the source** — Read the source chapter, section, or files the user specified.
   If multiple files, read the main chapter file first, then Lets-Build, then Terms.
   If the user specified an existing RAT/quiz file as the source, read it fully.

3. **Review existing RATs for style** — Briefly scan 1–2 existing RAT files in
   `books/database-book/Brightspace/Rats/` (especially the deepseek-format pairs)
   to calibrate question style, scenario depth, explanation quality, and Bloom targeting.

4. **Design the questions** — Draft all questions in the requested type mix and
   Bloom distribution. For each question, define:
   - Title (short, descriptive)
   - QuestionText (full question, scenario-rich)
   - Options (plausible, AI-resistant)
   - Correct answer(s)
   - Per-option feedback (why each option is right or wrong)
   - Hint (a nudge toward the answer without giving it away)
   - Explanation (the full feedback, referencing the source)
   - Difficulty (1=easy recall, 5=requires synthesis/evaluation)
   - Points

5. **Write the MD file** — Produce the complete MD file following the output
   specification. Include the metadata header, all question sections, and the
   quick-reference answer key table.

6. **Write the CSV file** — Produce the complete CSV file following the output
   specification. Write with `encoding='utf-8-sig'`. Include the metadata comment
   block. Use blank separator rows between questions. Verify every field is in
   the correct column.

7. **Cross-validate** — Before reporting completion, verify:
   - The CSV and MD have the same number of questions in the same order.
   - Every question in the CSV has a matching entry in the MD.
   - Correct answers in the MD answer key match the CSV weights.
   - All question IDs are unique.
   - The CSV file is valid UTF-8 with BOM.
   - No truncated or missing fields.

8. **Report to user** — Summarize what was created: file paths, question count by
   type, Bloom distribution, and any notable design decisions. Include the full
   paths to both output files.

## Quality Checklist

Before finalizing, verify:

- [ ] CSV encoding is UTF-8 with BOM (`utf-8-sig`)
- [ ] CSV has exactly 5 columns per row
- [ ] Blank separator rows (`,,,,`) between each question
- [ ] Metadata comment block at top of CSV with date, source, question breakdown
- [ ] Every MC has exactly one Option with weight `100`
- [ ] Every MS has Scoring=RightAnswers and at least 2 Options with weight `1`
- [ ] Every TF has the correct weight on TRUE or FALSE
- [ ] All question IDs are unique
- [ ] MD metadata header matches CSV comment block
- [ ] MD per-question sections include: Title, Short description, QuestionText,
      lettered options with correctness markers, per-option feedback, Hint (if present),
      Explanation, Points, Difficulty, ID, Bloom
- [ ] MD Quick-Reference Answer Key table is complete and correct
- [ ] CSV and MD question counts match
- [ ] CSV and MD correct answers are consistent
- [ ] No "all of the above" or "none of the above" options
- [ ] No joke or absurd distractors
- [ ] Every explanation references a specific section or passage in the source
- [ ] Option text is parallel in length and grammatical form within each question

## Final Response to User

After creating both files, report:

```markdown
## Quiz Created: {quiz title}

**Files:**

- CSV: `{full path to CSV}`
- MD: `{full path to MD}`

**Summary:**

- {N} total questions
- Type breakdown: {e.g., 8 MC + 2 MS}
- Bloom distribution: {e.g., 2 Remember, 5 Analyze, 3 Evaluate}
- Difficulty range: {min}–{max}/5
- All questions include hints and per-option feedback

**Import instructions:**

1. Open the CSV in a text editor and confirm it reads correctly
2. In Brightspace, go to Course Admin → Import/Export/Copy Components
3. Select "Import Components" → upload the CSV file
4. Review imported questions in the Question Library

The MD file contains the complete answer key for instructor review.
```

## Reference Files

- **CSV format template**: `books/database-book/Brightspace/Rats/Sample_Question_Import_UTF8.csv`
  — The authoritative Brightspace CSV schema. Read-only; never modify.
- **Best-practice CSV example**: `books/database-book/Brightspace/Rats/rat1_top_questions_deepseek.csv`
  — A complete example with Hint, per-option feedback, Difficulty, Points, and IDs.
- **Best-practice MD example**: `books/database-book/Brightspace/Rats/rat1_top_questions_deepseek.md`
  — A complete example with lettered options, answer key table, and Bloom labeling.
- **Chapter RAT companion style**: `books/database-book/Brightspace/Rats/rat*-gemini.csv`
  and `rat*-gemini.md` — Additional style references for question quality and Bloom targeting.
