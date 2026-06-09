---
name: reflection
description: >
  Create or revise a BITM330 chapter Review and Reflection companion file. Use when: drafting
  Review, Reflection, and Personal Reflection questions for a chapter; producing the full Answer
  Key; generating or updating the dated reflection companion in a chapter's reflection/ folder.
argument-hint: Chapter number, chapter folder, or main file path (for example, "ch05" or "chapter-drafts/ch05-sql/main/ch05-main-2026-05-19.md")
---

# BITM330 Review and Reflection Skill

Create or revise the Review and Reflection companion for a BITM330 chapter. The output is a student-facing file with Review Questions, Reflection Questions, Personal Reflection Questions, and a complete Answer Key with suggested answers.

## Purpose

This skill creates a guided thinking document that helps students:

- consolidate what they learned
- think more deeply about the chapter's meaning
- connect chapter ideas to real-world applications
- relate the material to their own development

This is not a quiz and not a lab.

## Question-Type Distinction

- Review = understanding the chapter (stays close to text, concepts, definitions, frameworks, examples).
- Reflection = interpreting the chapter (interpretation, comparison, evaluation, application).
- Personal reflection = relating the chapter to oneself (habits, goals, strengths, weaknesses, professional identity).

## File Naming and Location

When creating or significantly revising the companion, create a new dated file. Do not overwrite the old one.

- Filename pattern: `ch<number>-reflection-<YYYY-MM-DD>.md`
- Example: `ch01-reflection-2026-03-19.md`
- Location: `chapter-drafts/<chapter-folder>/reflection/`

## Source Priority

Base the section primarily on the most recent versions of:

1. the main chapter file
2. the Lets-Build file
3. the Terms or Term Treasury file

Do not base it primarily on RAT files, Lab files, or older reflection files (unless preserving useful ideas).

## YAML Metadata

Every reflection companion file must begin with a YAML block. Required fields:

- `title`
- `chapter`
- `section` (always `"Review and Reflection"`)
- `description` (1-2 sentences)
- `keywords` (5-10)
- `date`
- `author` if known

### Example

```yaml
---
title: "Chapter 1: Review and Reflection"
chapter: 1
section: "Review and Reflection"
description: "Provides review, reflection, and personal reflection questions to help students consolidate Chapter 1 concepts and connect them to practice and personal growth."
keywords:
  - review questions
  - reflection questions
  - BITM330
  - information systems
  - business thinking
  - chapter 1
date: 2026-03-19
author: "Nimrod Dvir"
---
```

## Output Structure

```markdown
# Chapter <number>: Review and Reflection

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-revie-resized" alt="Review and Reflection section icon" width="220">
</p>

*<short italic tagline that captures the section's purpose>*
```

## Header Image

Include the following HTML immediately after the H1 title so the icon appears at the top of the reflection section (under the header and above the tagline):

```html
<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-revie-resized" alt="Review and Reflection section icon" width="220">
</p>
```

### Required Sections in Order

1. YAML block
2. Title
3. Tagline
4. Review Questions
5. Reflection Questions
6. Personal Reflection Questions
7. Answer Key

## Heading Rules

- H1 only for the chapter title.
- H2 for the main sections (Review Questions, Reflection Questions, Personal Reflection Questions, Answer Key).
- H3 only inside the Answer Key for Review Questions, Reflection Questions, and Personal Reflection Questions subsections.
- Do not skip heading levels.
- Do not rename, reorder, merge, or add sections.

## Review Questions

```markdown
## Review Questions
```

Immediately below, include one italic sentence explaining the purpose. Then include 5-10 open-ended questions (no answers in this section). Focus on definitions, concepts, frameworks, examples, and chapter logic.

All review questions must be in bold.

Review questions should help students recall key terms, explain concepts, summarize frameworks, and connect chapter components.

## Reflection Questions

```markdown
## Reflection Questions
```

Italic intro sentence, then 5-10 open-ended questions requiring interpretation, comparison, judgment, or application. Connect chapter ideas to business logic, trade-offs, or system design.

All reflection questions must be in bold.

## Personal Reflection Questions

```markdown
## Personal Reflection Questions
```

Italic intro sentence, then 5-10 open-ended questions inviting self-assessment and personal connection. Keep questions grounded in the chapter but focused on the student's own experience or development.

All personal reflection questions must be in bold.

## Answer Key

A page break must separate the question sections from the Answer Key:

```html
<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>
```

```markdown
## Answer Key

### Review Questions

**Question 1: [full question text]**
**Suggested Answer:** [response]

### Reflection Questions

**Question 1: [full question text]**
**Suggested Answer:** [response]

### Personal Reflection Questions

**Question 1: [full question text]**
**Suggested Answer:** [response]
```

### Answer Key Rules

- Number questions within each subsection so the Answer Key maps clearly to the earlier question lists.
- Bold the entire question line, including the `Question <number>:` label.
- Keep `Suggested Answer:` unbolded.
- Review answers: direct, chapter-grounded.
- Reflection answers: show reasoning and interpretation.
- Personal Reflection answers: plausible model responses, not single correct answers.
- Reference chapter concepts explicitly, use Terms-file vocabulary, reflect business implications where relevant.

## Question Writing Rules

- Clear, instructor-like, chapter-grounded.
- No vague filler ("What did you think of this chapter?", "Why is this important?", "How do you feel about databases?").
- Reject any question that can be answered with one vague sentence, requires no thinking, or could apply to any generic business course.

## Chapter Grounding

Use chapter frameworks, examples, terminology, Grading Database references, Lets-Build logic, and course-role progression where relevant. Do not write generic business-school reflection prompts.

## Cross-File Consistency

Match the main chapter terminology, Lets-Build examples, and Term Treasury vocabulary. Do not introduce conflicting definitions.

## Question Count

- 5-10 questions per section.
- Preferred target: 6-8 strong questions per section.
- Quality matters more than hitting the maximum.

## Tagline

Concise, polished, inviting, relevant to the chapter. Sounds like a textbook companion, not marketing.

Examples:

- *Review the core ideas, then think more deeply about how this chapter connects ideas, systems, and decisions.*
- *Use these questions to strengthen your understanding and reflect on the chapter's broader meaning.*
- *This section helps you move from reading the chapter to thinking with it.*
