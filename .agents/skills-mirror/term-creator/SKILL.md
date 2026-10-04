---
name: term-creator
description: >
  Create or revise BITM330 chapter Terms and Term Treasury companion files efficiently.
  Use when: drafting chapter terms; creating a dated chNN-terms-YYYY-MM-DD.md file;
  extracting essential vocabulary from main and Lets-Build files; adding terms;
  removing terms; deduplicating vocabulary; building a Term Treasury table with
  Definition, Business Significance, and Examples; maintaining a separate Acronyms
  and Abbreviations section; synchronizing chapter terms with .docs/Terms/terms-list.csv;
  and marking first meaningful occurrences of included terms in the main chapter file
  when in scope. Do not use for full chapter editing, RATs, reflection questions,
  labs, image work, or general glossary work outside BITM330 chapters.
argument-hint: Chapter number, chapter folder, main file path, or existing terms file path (for example, "ch08" or "chapter-drafts/ch08-midterm-review/terms/ch08-terms-2026-05-26.md")
---

# BITM330 Term Creator Skill

Create or revise the Terms or Term Treasury companion for a BITM330 chapter. The output is a curated vocabulary file that helps students understand the chapter's key vocabulary and keeps the central term registry synchronized.

A Term Treasury is not a glossary dump. It is a short, high-signal learning layer for chapter comprehension, exam readiness, and cross-chapter consistency.

The skill must be efficient: include important terms, avoid trivial vocabulary, avoid redundant synonyms, and do not overbuild the terms file.

## When to Use

Use this skill when the user asks to:

- create terms for a chapter
- create a Term Treasury
- create or revise a chapter terms file
- extract chapter vocabulary from a main file or Lets-Build file
- add terms to a chapter terms file
- remove terms from a chapter terms file
- deduplicate terms across chapters
- update or synchronize `.docs/Terms/terms-list.csv`
- check a chapter terms file against the central term registry
- mark the first meaningful occurrence of included terms in the chapter itself

Do not use this skill for:

- full chapter editing or main manuscript revision, use `chapter-editor` or `chapter-editor-light`
- Lets-Build authoring, use `lets-build-creator`
- Review and Reflection companion files, use `reflection`
- RAT or quiz files, use `rat-creator`
- Lab or autograded lab files, use `lab-creation` or `autograded-lab`
- image suggestions, prompts, or production
- general glossary work outside the BITM330 book project

## Core Goals

For each chapter, produce:

1. A clean, dated Term Treasury Markdown file.
2. A focused list of important terms and concepts.
3. Definitions written for undergraduate business students.
4. Business significance statements that explain why each term matters.
5. Examples that connect terms to the chapter, the Grading Database, SQL, analytics, information systems, or business decision-making.
6. A synchronized central CSV entry for included chapter terms.
7. Optional first-use term marking in the main chapter file when in scope.

## Source File Selection

Resolve the target chapter from the user's argument, which may be a chapter number, chapter folder, main file path, or existing terms file path.

Base a new terms file or full terms revision on these sources, in order:

1. The most recent dated main chapter file: `BITM330-Book-draft/chapter-drafts/<chapter-folder>/main/chNN-main-YYYY-MM-DD.md`.
2. The most recent dated Lets-Build file when it exists: `BITM330-Book-draft/chapter-drafts/<chapter-folder>/lets-build/chNN-lets-build-YYYY-MM-DD.md`.
3. The existing latest terms file for the same chapter, if revising terms.
4. The central term registry: `.docs/Terms/terms-list.csv`.
5. The latest available book outline in `.docs/outline/` as a scope check only.

Do not base terms primarily on Reflection, RAT, Lab, image, archive, backup, or build-output files.

If several source files have the same apparent date or the chapter identity is ambiguous, ask before writing.

## File Naming and Location

Create or revise chapter terms in the chapter's `terms/` folder.

- Filename pattern: `chNN-terms-YYYY-MM-DD.md`
- Example: `ch08-terms-2026-05-26.md`
- Location: `BITM330-Book-draft/chapter-drafts/<chapter-folder>/terms/`

If the chapter does not yet have a `terms/` folder, create it under the chapter folder.

When creating a new terms file or making a meaningful revision, create a new dated file. Do not overwrite older dated terms files unless the user explicitly names that file as the target.

Create a new dated file for:

- a new terms companion
- a full revision
- a four-column Term Treasury migration
- an Acronyms and Abbreviations migration
- a legacy-format migration

If today's dated file already exists:

- edit it in place for a minor correction, small addition, or small removal
- create a new same-day variant only when the user requests it or the local chapter already uses that pattern

## Required Output Structure

Use this production Term Treasury format for new files, full revisions, and meaningful migrations.

```markdown
# Chapter NN Term Treasury - Chapter Topic

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-terms-sizedmin" alt="Terms Treasury section icon" width="220">
</p>

<p align="center">

<!-- Companion: Key terms and definitions - YYYY-MM-DD -->

| Term / Concept | Definition | Business Significance | Examples |
|---|---|---|---|
| **Database** | A structured collection of related data and metadata designed for reliable storage, retrieval, and management. | Serves as the official record of activity and helps organizations preserve and use data consistently to improve coordination and performance. | The Grading Database tables, relationships, and rules. |
| **DBMS (Database Management System)** | The software engine that creates, manages, queries, secures, and administers databases. | Provides the mechanism to protect, retrieve, and reorganize records; manages data independence. | Microsoft Access, SQLite, PostgreSQL. |

## Acronyms and Abbreviations

| Abbreviation | Full Form | Brief Meaning | Where It Appears |
|---|---|---|---|
| **DBMS** | Database Management System | Software that manages databases. | Database architecture and tool discussion |
| **SQL** | Structured Query Language | A language for querying and managing relational databases. | SQL examples and later query chapters |
| **PK** | Primary Key | A field that uniquely identifies each row. | Table design and relationship examples |
| **FK** | Foreign Key | A field that connects one table to another. | Relationships, ERDs, joins |
```

Rules:

- Use one H1 title at the top.
- Place the centered Term Treasury icon immediately below the H1 title. Every chapter terms file must include this icon directly under the title, followed by a centered `<p>` tag for spacing before the companion comment:

```html
<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-terms-sizedmin" alt="Terms Treasury section icon" width="220">
</p>

<p align="center">
```

- Use a brief HTML companion comment under the icon.
- Use a main Markdown table with these columns: `Term / Concept`, `Definition`, `Business Significance`, and `Examples`.
- Bold each term in the `Term / Concept` column.
- Put terms in alphabetical order by term or concept name.
- Do not group terms by letter.
- Keep definitions concise and student-friendly.
- Keep business significance practical and tied to business value.
- Keep examples concrete and chapter-relevant.
- Include `## Acronyms and Abbreviations` only when the chapter has meaningful short forms students need to recognize.

## Field Guidance

### Term / Concept

Use the clearest student-facing name.

Prefer:

- `Database`
- `DBMS (Database Management System)`
- `Primary Key`
- `Foreign Key`
- `Entity`
- `Relationship`
- `Query`

Avoid:

- overly long phrases
- one-off wording from a single sentence
- duplicate synonyms
- tool-specific labels unless the tool is central to the lesson

### Definition

The definition should answer: What does this term mean?

Rules:

- Use one sentence when possible.
- Use two sentences only when needed for accuracy.
- Write for undergraduate business readers.
- Avoid circular definitions.
- Avoid dense technical language unless the term requires it.

### Business Significance

The business significance should answer: Why does this term matter for organizations, managers, systems, decisions, or performance?

Good significance statements connect the term to:

- reliable records
- better decisions
- fewer errors
- improved coordination
- faster reporting
- accountability
- data quality
- automation
- analytics
- governance
- operational performance

### Examples

Examples should answer: Where would students see this term in practice?

Use examples from:

- the Grading Database
- the Vet Clinic or Pet Hospital database
- SQL examples
- Microsoft Access, SQLite, PostgreSQL, or Supabase
- familiar business settings such as retail stores, restaurants, banks, hospitals, delivery apps, streaming platforms, customer service systems, and college courses

Keep examples short. Use fragments when appropriate.

## Acronyms and Abbreviations

Use a separate `## Acronyms and Abbreviations` section only when the chapter contains meaningful short forms students need to recognize.

Use this table:

```markdown
## Acronyms and Abbreviations

| Abbreviation | Full Form | Brief Meaning | Where It Appears |
|---|---|---|---|
| **SQL** | Structured Query Language | A language used to query and manage relational databases. | Query examples and SQL labs |
```

Rules:

- Include acronyms, initialisms, and common abbreviations.
- Bold each abbreviation in the first column.
- Keep the full form precise.
- Keep the brief meaning to one short sentence or sentence fragment.
- Use `Where It Appears` to point students to the chapter context.
- Do not include obvious general abbreviations unless they matter for the chapter.
- Do not include file extensions such as `.md`, `.csv`, or `.sql` unless the chapter explicitly teaches them.
- Do not duplicate an acronym or abbreviation as both a main term and a short-form entry unless both are pedagogically useful.
- If an acronym is also a major concept, include it in the main Term Treasury table and also list it in `Acronyms and Abbreviations`.

Rule of thumb:

| Case | Put in Main Table? | Put in Acronyms and Abbreviations? |
|---|---|---|
| `SQL` as a language students must understand | Yes, if the chapter teaches SQL conceptually | Yes |
| `DBMS` as a major concept | Yes | Yes |
| `PK` and `FK` as shorthand only | Maybe | Yes |
| `ERD` as a diagram type | Yes, if taught conceptually | Yes |
| `CSV` mentioned only once | No, unless central | Maybe |
| Tool labels like `UI`, `URL`, `PDF` | Usually no | Only if needed |

The two layers serve different purposes:

- Main table: understand the concept.
- Acronyms and Abbreviations table: decode the short form.

## Term Selection Rules
<np>
Include only important terms. A term is important if it is:

- conceptually central to the chapter
- used repeatedly in the main or Lets-Build files
- required for understanding later chapters
- tied to database design, SQL, analytics, information systems, business logic, or managerial decision-making
- explicitly defined or strongly implied in the chapter
- useful for exam readiness or student comprehension
- likely to confuse students if left undefined
- needed to understand chapter examples, tables, diagrams, or SQL

Do not include:

- trivial words
- obvious English words
- one-off mentions
- UI labels, button names, or menu names unless central to the chapter's tool workflow
- redundant synonyms
- terms already introduced in earlier chapters, unless the user explicitly asks for repeated vocabulary or the chapter extends the concept
- proper names of files, folders, or screenshots unless part of the chapter's instructional vocabulary
- every SQL keyword unless the chapter explicitly teaches those keywords

Target range:

- Short chapter: 8-12 terms
- Standard chapter: 12-20 terms
- Dense technical chapter: 20-30 terms only when justified

If more than 30 candidate terms seem important, prioritize the terms needed for chapter comprehension and list the rest as excluded candidates in the final report only when useful.

## Candidate Harvesting and Coverage Check

When creating or fully revising terms, scan the latest main chapter and relevant Lets-Build file for:

- headings and subheadings
- bolded or emphasized vocabulary
- formal definition callouts
- inline definitions such as "X is..." or "X refers to..."
- repeated domain phrases
- SQL, database, analytics, information systems, business logic, and decision-making vocabulary
- acronyms, initialisms, and common abbreviations
- terms likely to confuse students if left undefined
- terms needed to understand examples, tables, diagrams, screenshots, or SQL
- terms needed for later chapters

Before finalizing:

1. Compare harvested concept terms against the main Term Treasury table.
2. Compare harvested short forms against `Acronyms and Abbreviations`.
3. Check `.docs/Terms/terms-list.csv` for prior-chapter ownership.
4. Exclude weak, redundant, or prior-chapter-only candidates.
5. Note intentionally excluded or intentionally repeated prior-chapter terms in the final report when useful.

## Efficiency Rules

- Do not extract every noun phrase.
- Do not include every repeated word.
- Do not overfit to the wording of one paragraph.
- Prefer terms that unlock the chapter's main argument.
- Prefer terms students will need for quizzes, labs, SQL work, or later chapters.
- If a term is useful but not essential, exclude it and mention it in the final report only if needed.
- If the chapter has too many candidates, rank them by instructional importance before writing the terms file.
- Do not spend effort polishing excluded terms.
- Do not rewrite unrelated chapter prose while marking term occurrences.

## Cross-Chapter Deduplication

Before adding terms, read `.docs/Terms/terms-list.csv`.

Use the CSV as the central registry for first-chapter term ownership:

- If a term already appears in an earlier chapter, do not add it to the current chapter by default.
- If the chapter reuses a prior term, leave it out of the current terms file unless the user explicitly wants repeated vocabulary or the current chapter extends the concept in a meaningful way.
- If a similar term already exists with different wording, flag the similarity in working notes and choose the existing canonical wording when appropriate.
- If a genuinely new chapter-specific variation is needed, add the more precise term and definition.

Normalize terms for duplicate checks by:

- trimming whitespace
- removing Markdown bold markers
- removing HTML tags
- comparing case-insensitively
- treating repeated spaces as one space
- comparing common acronym/full-name pairs when obvious

Preserve the chosen display capitalization in the terms file and CSV.

## CSV Synchronization

The central CSV is `.docs/Terms/terms-list.csv`.

The current minimum CSV header is:

```csv
term,chapter
```

Preserve the existing CSV schema unless the user explicitly asks to migrate it.

If the CSV already has expanded columns, such as:

```csv
term,chapter,definition,business_significance,examples
```

then update the existing expanded fields as well. Do not silently rewrite the whole CSV schema.

Every terms-file change must be reflected in the CSV for the same chapter.

Abbreviation-only decoding entries should be added to the CSV only when they also function as chapter terms. Do not turn the central CSV into a general abbreviation dump.

### Before Editing

1. Read the existing CSV.
2. Identify all rows for the target chapter.
3. Read the latest target terms file, if one exists.
4. Determine which terms are being added, retained, changed, or removed.

### Adding Terms

When adding a term to the chapter terms file:

- add exactly one matching CSV row for the term and chapter
- do not add duplicate rows for the same normalized term and chapter
- do not add the term to the current chapter if it already belongs to an earlier chapter, unless the user explicitly requests repeated vocabulary or the current chapter meaningfully extends the term
- append new rows near the existing block for that chapter when practical; otherwise append them at the end
- preserve the CSV header and existing row order as much as practical

### Removing Terms

When removing a term from the chapter terms file:

- remove the matching CSV row only for the same normalized term and the same chapter
- never remove CSV rows for other chapters
- if the same term appears for another chapter, preserve that other row
- if the term was not in the CSV for the current chapter, do not create unrelated CSV churn
- if removal would leave no CSV rows for the chapter, keep the CSV header intact

### CSV Safety Checks

After updating the CSV:

- confirm the header is valid and unchanged unless a migration was explicitly requested
- confirm no duplicate normalized `term,chapter` rows were introduced
- confirm every newly added chapter term has one matching CSV row, unless it was intentionally excluded as prior-chapter vocabulary
- confirm every removed chapter term no longer has a CSV row for that same chapter
- confirm no unrelated chapter rows were changed

This skill supersedes older append-only CSV guidance. The current rule is chapter-scoped synchronization: add CSV rows for terms added to the chapter, and remove CSV rows for terms removed from that same chapter.

## Updating Legacy Terms Files

Older chapter terms files may use a loose-description format, a two-column table, or an `## Acronyms` section.

When making a meaningful revision to an older terms file:

1. Preserve useful existing content.
2. Create a new dated file unless the user explicitly asked to edit a specific file in place.
3. Migrate concept terms into the four-column Term Treasury table.
4. Migrate short forms into `## Acronyms and Abbreviations`.
5. Add the standard centered Term Treasury GIF and companion HTML comment if missing.
6. Synchronize `.docs/Terms/terms-list.csv` for the current chapter.

## Marking Terms in the Chapter

For a full term-creation pass or when the user asks for synchronization, check the latest main chapter file for included terms.

Use one of these formats:

- Portable default: `**Database**`
- Styled semantic hook when HTML/class support is explicitly in scope: `<strong class="term-highlight">Database</strong>`

Do not create or edit CSS as part of this skill. The class hook only prepares the Markdown/HTML for a later styling task if the active publishing pipeline supports it.

Rules:

- Mark only the first meaningful occurrence of each included term in the main chapter.
- Do not mark every repeated occurrence.
- Do not mark whole sentences.
- Do not mark terms inside headings just to satisfy this rule.
- Do not mark terms inside code blocks.
- Do not mark terms inside URLs, image paths, YAML front matter, or HTML attributes.
- Do not mark a term if doing so makes the sentence visually cluttered.
- Do not mark terms in the terms file itself.
- Do not mark companion files unless the user explicitly asks or the workflow says to synchronize Lets-Build as well.
- If the chapter already uses a different term-highlighting pattern, flag it before changing the system.

Accessibility rules:

- Do not use color alone as the only signal.
- Keep the term bold or semantically emphasized even if a CSS class is used.
- Avoid inline color styles in chapter Markdown.
- Ensure styled term markers remain readable in print, DOCX, HTML, and screen-reader contexts as much as practical.

## Workflow

1. Resolve the target chapter and chapter folder.
2. Locate the latest dated main file.
3. Locate the latest dated Lets-Build file, if present and relevant.
4. Locate the latest dated terms file, if present.
5. Read `.docs/Terms/terms-list.csv`.
6. Harvest candidate concept terms and short forms from the main and Lets-Build files.
7. Filter candidates using the term selection, efficiency, coverage, and cross-chapter deduplication rules.
8. Split concept terms from abbreviations and acronyms.
9. Draft or revise the chapter terms file using the four-column main table and optional `Acronyms and Abbreviations` table.
10. Compare the previous chapter terms list to the revised list.
11. Add CSV rows for newly included chapter terms.
12. Remove CSV rows for terms removed from the same chapter.
13. Run the CSV safety checks.
14. If in scope, mark first meaningful occurrences in the main chapter using plain bold or the `term-highlight` semantic hook.
15. If Lets-Build synchronization is explicitly in scope, mark first meaningful occurrences there as well.
16. If the terms task is tracked, update the chapter tracker using the `chapter-tracker` skill rules.
17. Report the terms file path, CSV changes, main term count, acronym/abbreviation count, highlighted terms, and any prior-chapter terms that were intentionally excluded or repeated.

## Chapter Tracker

When actual chapter term work is completed and the task is tracked, use the `chapter-tracker` skill rules.

- Read only the Active table unless the user explicitly asks to read Archive.
- Remove the completed Next item.
- Update the Done cell with a one-line summary.
- Update the Updated date.
- Add the required Archive line.

Do not update the chapter tracker merely because this skill file itself was changed.

## Final Response Checklist

When finishing a term-creation or term-revision task, report briefly:

- created or updated terms file
- whether a new dated file was created
- number of main concept terms included
- number of acronyms and abbreviations included
- CSV rows added
- CSV rows removed
- source files used
- terms highlighted in the main chapter, or why highlighting was skipped
- whether Lets-Build marking was performed or skipped
- terms intentionally excluded because they already belong to earlier chapters
- prior-chapter terms intentionally repeated or extended
- excluded candidates, if useful
- unresolved ambiguity, if any
