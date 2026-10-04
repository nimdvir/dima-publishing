---
name: chapter-gap-analysis
description: >
  Perform a complete editorial audit of a BITM330 chapter draft against its source materials
  and produce a detailed CSV of every gap, inconsistency, redundancy, or integration need.
  Use when: comparing a chapter draft to the files in its sources folder; identifying missing
  content, missing integration, incomplete explanations, missing SQL examples, structural
  issues, terminology mismatches, redundancies, or pedagogical gaps; generating a reusable
  edit-audit CSV the author can work through systematically.
argument-hint: Chapter number and path to the most recent edited chapter file (e.g., "Chapter 08, ch08-edited-2026-03-08.md"); the corresponding sources folder is assumed to be sibling to the chapter file.
---

# Chapter Gap Analysis Skill

Audit a BITM330 chapter draft against everything in its sources folder and produce one detailed CSV of recommendations.

## When To Use

- A chapter has a `*-sources/` folder of `.md` and `.csv` materials and you need to confirm nothing important was dropped.
- Preparing a revision pass and you want a structured worklist instead of free-form notes.
- Validating that SQL features explained in the chapter are also demonstrated with examples.
- Checking for redundant or duplicated content between sections.

## Editing Rules (Mandatory)

Before performing any analysis, follow the editing rules from the live `chapter-editor` skill:

- `.agents/skills/chapter-editor/SKILL.md`
- `.agents/skills/call-out/SKILL.md` for callout syntax, canonical classes, density rules, and conversion rules.

Those rules define writing style, pedagogical structure, formatting conventions, SQL example standards, and terminology. All recommendations must comply with them. For lighter cleanup-only passes, see `.agents/skills/chapter-editor-light/SKILL.md`.

## Inputs

The user provides:

- **Chapter number** (e.g., `08`).
- **Path to the most recent edited chapter file** (e.g., `ch08-edited-2026-03-08.md`).

The chapter's sources folder is assumed to sit alongside the chapter file.

## Expected Folder Structure

```text
chapter-drafts/
  ch08-advanced-sql-queries/
    ch08-edited-2026-03-08.md
    ch08-sources/
      source1.md
      source2.md
      notes.csv
```

## Files To Analyze

Inside the sources folder, analyze only:

- `*.md`
- `*.csv`

Ignore all other file types.

## Primary Objective

Compare the edited chapter file against all source materials and identify everything that is missing, incomplete, inconsistent, or needing integration.

### Categories To Detect

- **Missing Content** — concepts present in sources but not in the chapter.
- **Missing Integration** — source content that exists but has not been incorporated into the chapter narrative.
- **Incomplete Coverage** — concepts that appear in the chapter but are underdeveloped or unclear.
- **Missing Examples** — SQL features explained but not demonstrated with queries.
- **Missing Teaching Elements** — opportunities to add diagrams, examples, walkthroughs, exercises, business scenarios, or step-by-step tutorials.
- **Structural Issues** — sections that should be reorganized, merged, expanded, renamed, or clarified.
- **Callout Formatting Issues** — callouts that use legacy blockquote, `:::callout`, GitHub alert, emoji-only, non-canonical class, duplicated, overused, clustered, or decorative formats instead of the `call-out` skill's canonical HTML format.
- **Technical Issues** — SQL syntax problems, conceptual inaccuracies, inconsistent terminology, mismatches between chapter and sources.
- **Redundancies** — content repeated unnecessarily between sections.
- **Integration Opportunities** — ideas from multiple source files that should be combined into a stronger explanation.

## Output

Produce one detailed CSV inside the sources folder:

```text
ch08-sources/ch08-edit-audit.csv
```

### CSV Columns

```text
RecommendationID
Chapter
IssueCategory
SectionAffected
Topic
ProblemDescription
RecommendedAction
IntegrationSuggestion
SourceFile
SourceLocation
Priority
PedagogicalImpact
SQLCoverageImpact
EstimatedEffort
```

### Column Definitions

- **RecommendationID** — sequential number.
- **Chapter** — chapter number.
- **IssueCategory** — one of: `MissingContent`, `MissingIntegration`, `IncompleteExplanation`, `ExampleNeeded`, `StructuralIssue`, `CalloutFormatting`, `TerminologyFix`, `SQLCorrection`, `Redundancy`, `PedagogicalGap`, `ConceptClarification`.
- **SectionAffected** — section of the edited chapter impacted.
- **Topic** — concept or SQL feature involved.
- **ProblemDescription** — detailed explanation of what is missing or incorrect.
- **RecommendedAction** — what should be added, rewritten, merged, or removed.
- **IntegrationSuggestion** — how the source content should be incorporated.
- **SourceFile** — which source file revealed the issue.
- **SourceLocation** — heading or approximate location within the source.
- **Priority** — `High`, `Medium`, or `Low`.
- **PedagogicalImpact** — how the change improves learning.
- **SQLCoverageImpact** — one of: `None`, `ExampleImprovement`, `QueryCorrection`, `NewConceptCoverage`.
- **EstimatedEffort** — `Small`, `Medium`, or `Large`.

## Analysis Guidance

The textbook is written for undergraduate MIS / BITM students learning databases, SQL, and business analytics in a practical course.

Prioritize recommendations that improve:

- conceptual clarity
- SQL comprehension
- logical chapter flow
- completeness of coverage
- real-world applicability
- callout usefulness, consistency, and density without visual clutter

For callout-related findings, recommend canonical HTML conversion only when the callout improves learning. Do not recommend adding callouts as decoration. Flag overuse when callouts exceed the `call-out` skill's density or placement guidance.

## CSV Formatting Rules

- Quote any field containing commas, especially `ProblemDescription`, `RecommendedAction`, and `IntegrationSuggestion`.
- Save with UTF-8 encoding.
- Use one row per recommendation; do not bundle multiple issues into one row.
- Populate every column — no blanks.

## Scope Limit

Do **not** rewrite the chapter as part of this skill. The deliverable is the audit CSV. Chapter revisions are a separate task handled by `chapter-editor` (or `chapter-editor-light` for cleanup-only passes).

## Final Deliverable

One detailed CSV file in the chapter's sources folder, complete enough that the author can systematically revise the chapter, ensure all source material is incorporated, and maintain pedagogical consistency across the textbook.
