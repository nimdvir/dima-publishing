# RAT (Readiness Assessment Test) Creation Guidelines

> These instructions consolidate the design patterns used across all chapter RATs in the BITM330 textbook. Follow them when creating a new RAT for any chapter.

---

## Structure

- **40 questions total**.
- Questions are grouped under **five Bloom level headers**.
- Each Bloom section contains **8 questions**.
- Every question must be **numbered** and in **bold**.
- Do **not** add per-question Bloom tags (for example, no `*Bloom's Level: Apply*`).
- Do **not** create separate global sections for question types.
- Randomize question order **within each Bloom section** after drafting.

---

## Sections (in order)

1. **Title** - `# Readiness Assessment Test (RAT): [Chapter Title]`
2. **Image** - Centered RAT image (see template below)
3. **Questions** - Bloom headers with 8 questions per level
4. **Assessment Design Notes** - Bloom distribution table + AI-Resistance Strategies
5. **Answer Key** - Every question repeated with answer(s) and explanation citing chapter language
6. **Question Distribution Summary** - Three tables: Bloom Level, Question Type, Design Criterion

---

## Image Header

Each RAT includes a centered image at the top, immediately after the title:

```html
<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/w_200/f_auto/q_auto/RAT_big?_a=BAMAAAhK0" alt="RAT" />
</p>
```

---

## Bloom's Taxonomy Distribution

Target distribution across all 40 questions:

| Bloom Level | Target Count | Notes |
|---|---|---|
| **Remember** | 8 | Foundational vocabulary and structural facts, with minimal pure recall |
| **Understand** | 8 | Explain why concepts matter, interpret and paraphrase |
| **Apply** | 8 | Use chapter concepts in realistic scenarios and SQL tasks |
| **Analyze** | 8 | Compare alternatives, break down systems, diagnose trade-offs |
| **Evaluate** | 8 | Judge design quality and choose best approach under constraints |

- Bloom level is expressed by section header only.
- Keep cognitive rigor increasing from Remember to Evaluate.

---

## Question Type Rules

Use both question formats in **every Bloom section**.

### Single-answer multiple choice

- 4 options
- labeled **A-D**
- exactly **one correct answer**

### Multiple-answer questions

- stem includes **Select ALL that apply**
- 5 options
- labeled **A-E**
- **at least two correct answers**

### Formatting rules

- Place each answer option on its own line in the question body.
- Do not mark any option as correct in student-facing content.

Example:

```markdown
**12. Which SQL clause filters rows after grouping?**

A. SELECT

B. WHERE

C. HAVING

D. ORDER BY
```

Example:

```markdown
**13. Select ALL that apply: Which activities are performed by a DBMS?**

A. Managing database storage

B. Executing SQL queries

C. Designing website layouts

D. Enforcing integrity constraints

E. Managing concurrent access
```

---

## Design Criterion Targets

| Criterion | Target Count |
|---|---|
| **Application-based** | ~12-14 |
| **Scenario-based** | ~10-12 |
| **Definition-only** | ~8-10 |

Required: distribute these criteria across all Bloom sections, not in a single block.

Coverage matrix template:

| Design Criterion | Bloom Sections Used | Questions | Count |
|---|---|---|---|
| Application-based | ... | ... | ... |
| Scenario-based | ... | ... | ... |
| Definition-only | ... | ... | ... |

---

## AI-Resistance Strategies

Apply **at least 5** of the following techniques per RAT, and spread them across multiple Bloom sections:

1. **Chapter-specific reasoning over generic knowledge** - Distractors are plausible but conflict with this chapter's framing.
2. **Schema-specific context** - Use exact tables, columns, sample data, and SQL from the chapter.
3. **Scenario-based stems with embedded traps** - Correct answers depend on chapter principles, not generic recall.
4. **Multi-answer questions with fine-grained distinctions** - Each option is plausible and must be evaluated independently.
5. **Distractors drawn from adjacent concepts** - Wrong answers borrow language from nearby but distinct topics.
6. **Non-obvious correct answers** - Correct options are paraphrased and not keyword-matched.
7. **Output prediction from concrete data** - Ask what a query returns using chapter data.
8. **Stage-progression reasoning** - Reference chapter sequence or multi-step progression when relevant.
9. **Platform-specific details** - Include SQLite vs SQL Server vs Access differences when covered.

---

## Chapter Artifact Checklist

Before finalizing a RAT, confirm inclusion of:

- chapter-specific terminology
- at least two references to chapter tables/columns
- at least two references to chapter SQL logic or output
- at least one chapter-grounded scenario tied to organizational impact
- platform-specific behavior if the chapter discusses it

---

## Answer Key Requirements

For **every question**, include:

1. Full question text exactly as written.
2. Correct answer(s).
3. Explanation tied to chapter language (quote or close paraphrase with section reference).
4. Option-by-option table with one row per option.

### Single-answer answer key format

Use a table with rows **A-D**:

| Option | Correct? | Reasoning |
|---|---|---|
| A | ... | ... |
| B | ... | ... |
| C | ... | ... |
| D | ... | ... |

### Multiple-answer answer key format

Use a table with rows **A-E**:

| Option | Correct? | Reasoning |
|---|---|---|
| A | ... | ... |
| B | ... | ... |
| C | ... | ... |
| D | ... | ... |
| E | ... | ... |

---

## Question Distribution Summary Tables

Include three tables at the end of the answer key:

**Table 1: Bloom Level**

| Bloom Level | Questions | Count |
|---|---|---|
| Remember | ... | 8 |
| Understand | ... | 8 |
| Apply | ... | 8 |
| Analyze | ... | 8 |
| Evaluate | ... | 8 |

**Table 2: Question Type**

| Question Type | Questions | Count |
|---|---|---|
| Single-answer MC | ... | ... |
| Multiple-answer (Select ALL) | ... | ... |

**Table 3: Design Criterion**

| Design Criterion | Questions | Count |
|---|---|---|
| Application-based | ... | ... |
| Scenario-based | ... | ... |
| Definition-only | ... | ... |

---

## Pedagogical Philosophy

- The goal is not to catch mistakes; it is to help students think clearly.
- Minimize memorization and maximize interpretation, application, and judgment.
- Use mixed question formats at all Bloom levels to reduce pattern-based guessing.
- Connect questions to organizational goals, design implications, or measurable outcomes.
- "This book is not about memorizing commands. It is about learning how to think clearly about data, systems, and decisions."

---

## IMPORTANT: Quiz and Poll Usage

When generating RAT questions for actual student assessments:

- **NEVER** use `recommended` markers on answer options.
- **NEVER** mark options with `correct`, checkmarks, or any correctness indicator.
- Treat all options as equally weighted in presentation.

---

## Preflight Quality Check

Before publishing, verify:

- 40 total questions with 8 under each Bloom header
- mixed question types within every Bloom section
- no per-question Bloom tags
- each option appears on its own line in question bodies
- answer key includes row-by-row option reasoning for every question
- all three summary tables are complete
