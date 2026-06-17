# Let's Build Summary

Updated: 2026-05-18

## Purpose

This document consolidates the current author guidance for the book's Let's Build material. It summarizes the shared project, the files in `.docs/lets-build`, the operating rules that shape Let's Build content, and the chapter-by-chapter flow of the running project.

## What Let's Build Is

Let's Build is the book's step-by-step companion track. It is where guided work belongs. In this repository, the main chapter file explains concepts, while the Let's Build file gives students a structured way to apply those ideas in a continuing project.

The repo-level rules are consistent on four points:

- Let's Build is a companion file, not part of the main chapter manuscript.
- Step-by-step guided work belongs in Let's Build.
- Each chapter's Let's Build file should live in that chapter's `lets-build` folder.
- The canonical filename pattern is `chXX-lets-build-YYYY-MM-DD.md`.

## Shared Project

The central Let's Build project is the Grading Database. It is a running case that continues across the book rather than resetting each chapter.

### Project Description

The Grading Database is a relational database system for tracking students, class sessions, deliverables, scores, and attendance. It is used as the common instructional anchor so students can move from business questions to data structure, querying, analysis, reporting, governance, and strategy in one continuous system.

The canonical schema used in the guidance files is:

- `STUDENT(StudentID, FirstName, LastName, Email, Birthday, Grade)`
- `ASSIGNMENT(Type, Quantity, Points, Points_per_one)`
- `SCHEDULE(ClassNum, Week, Date, Day, Topic, Format)`
- `ATTENDANCE(AttendanceID, ClassNum, StudentID, Attended)`
- `DELIVERABLE(DeliverableID, Type, DeliverableNumber, DueDate, Topic)`
- `STUDENT_GRADE(GradeID, StudentID, DeliverableID, Score)`

### Why This Project Works

The Grading Database is used because students already understand the business context. That familiarity lowers the barrier to entry while still supporting real database work:

- identifying entities and business questions
- defining attributes and data types
- moving from flat data to related tables
- writing SQL queries and calculations
- building reports and dashboards
- addressing administration, governance, and strategy

### Running-Project Principle

The strongest instruction repeated across the source files is that the Grading Database should act as a living system. Each chapter should extend, refine, query, analyze, govern, or interpret the same project. The point is continuity, not disconnected exercises.

## Supporting Files In `.docs/lets-build`

| File | Role | Notes |
| --- | --- | --- |
| `lets-build-description.md` | Core project description | Best source for the Grading Database description, schema, phases, and instructional rationale. |
| `lets-build-outline-2026-05-06.md` | Primary chapter-by-chapter outline | Best source for the current Let's Build sequence across the book. |
| `let-build-outline.md` | Earlier integration guidance | Useful for the continuous-project rule and broader chapter integration notes. Keep as source history. |
| `relationship.png` | Supporting image | ERD-style support asset for Let's Build documentation. |
| `relationship.jpg` | Supporting image | Alternate format of the same relationship image. |

## Source Hierarchy For Future Edits

When consolidating or updating Let's Build content, use this source order:

1. `lets-build-description.md` for the project description and canonical schema.
2. `lets-build-outline-2026-05-06.md` for the chapter-by-chapter Let's Build arc.
3. `let-build-outline.md` for earlier but still useful integration guidance.
4. The latest chapter-level Let's Build companion file when chapter-specific detail is needed or when the docs outline is incomplete.
5. `.docs/_toc.yml`, `.docs/outline/outline-taglines-2026-05-06.md`, and `.github/copilot-instructions.md` for structure, naming, and alignment.

## Authoring Rules

These are the practical instructions that appear across the current guidance:

- Keep Let's Build separate from the main chapter manuscript.
- Use the Grading Database as the shared instructional anchor.
- Keep examples and terminology consistent across chapters.
- Scale complexity gradually as the course progresses.
- Use each chapter's Let's Build to move the same project forward.
- Keep deliverables concrete so students can show what they built or concluded.
- Prefer one clear activity arc per chapter: overview, what students do, deliverable, and why it matters.

## Chapter-By-Chapter Overview

The outline below summarizes the intended flow of the Let's Build experience across the book.

### Chapter 1: Meet the Project

- Focus: Introduce the Grading Database as a business problem and course-long build.
- Student work: Identify entities, sketch the basic system, and write business questions.
- Deliverable: Project Charter.

### Chapter 2: Mapping Information to Decisions

- Focus: Apply DIKW, IPO, and the five-component model to the Grading Database.
- Student work: Map raw data to decisions, diagram inputs and outputs, and identify system components.
- Deliverable: DIKW table, IPO diagram, five-component matrix, and reflection.

### Chapter 3: Data In Google Sheets

- Focus: Experience the limits of flat spreadsheet data before moving into databases.
- Student work: Build a flat grading sheet, classify data types, and identify update, insertion, and deletion anomalies.
- Deliverable: Annotated Google Sheet and reflection on spreadsheet limitations.

### Chapter 4: First Table In Microsoft Access

- Focus: Build the first real database objects in Access.
- Student work: Create a `Students` table, build a query, create a form, and generate a report.
- Deliverable: `GradingDB_Ch4.accdb` with table, query, form, report, and an exported PDF.

### Chapter 5: Writing SQL For The Grading Database

- Focus: Write SQL directly in SQLite and Access.
- Student work: Create and populate tables, run basic SELECT queries, and compare SQL across tools.
- Deliverable: SQL script, saved Access query, screenshots or outputs, and reflection.

### Chapter 6: Splitting The Flat Table Into Related Tables

- Focus: Move from a single table to a relational design.
- Student work: design `Students`, `Courses`, `Sections`, and `Enrollments`; create relationships; test referential integrity.
- Deliverable: relational schema in Access, relationship evidence, SQL DDL, and a short explanation of why the flat design failed.

### Chapter 7: Normalizing The Grading Database

- Focus: Bring the design to 3NF.
- Student work: identify 1NF, 2NF, and 3NF issues, resolve dependencies, and produce a cleaned schema.
- Deliverable: normalized schema, diagram, and audit log.

### Chapter 8: Midterm Review Lab

- Focus: Consolidate the first half of the project.
- Student work: review schema quality, reuse or write a query bank, and connect key concepts in a concept map.
- Deliverable: completed checklist, annotated queries, and concept map.

### Chapter 9: Advanced SQL On The Grading Database

- Focus: Use SQL for deeper analysis.
- Student work: write queries with aggregation, CASE, subqueries, CTEs, window functions, and missing-work detection.
- Deliverable: annotated advanced SQL file with outputs.

### Chapter 10: Designing The ERD In Lucidchart

- Focus: Produce a professional ERD from the working database.
- Student work: draw entities, attributes, keys, relationships, and trace business questions back to the design.
- Deliverable: exported ERD plus a written summary of how it reflects business requirements.

### Chapter 11: Applying DBA Practices

- Focus: Manage the database as an administrator.
- Student work: define roles, create a backup and recovery plan, walk through a recovery scenario, and test indexing effects.
- Deliverable: access policy, backup plan, recovery walkthrough, and performance note.

### Chapter 12: Business Intelligence For The Grading Department

- Focus: Move from query output to managerial insight.
- Student work: define KPIs, build summary reports, compare trends, and write a decision memo.
- Deliverable: KPI queries, formatted report, comparison output, and decision memo.

### Chapter 13: Advanced Database Techniques

- Focus: Apply performance and automation features.
- Student work: add indexes, create views, build parameterized queries, and write triggers.
- Deliverable: SQL files, proof of execution, and written design justification.

### Chapter 14: Power BI Dashboard From Access

- Focus: Connect the Access database to Power BI for reporting.
- Student work: load the tables, create DAX measures, build dashboard pages, and optionally publish or export.
- Deliverable: `.pbix` dashboard file and reflection.

### Chapter 15: Strategic Reflection

- Focus: Treat the database as a strategic asset.
- Student work: apply Porter's Five Forces, map the value chain, audit strategic alignment, and write a capability statement.
- Deliverable: strategy analysis set plus a professional capability statement.

### Chapter 16: Full-Cycle Portfolio Review

- Focus: Assemble the full project story from concept to portfolio.
- Student work: collect prior deliverables, write a project narrative, and complete a self-assessment.
- Deliverable: portfolio package, narrative, and self-assessment.

### Chapter 17: Design A System That Matters

- Focus: Transfer the full process to a new real-world problem.
- Student work: choose a problem, define entities and queries, review governance and ethics, and pitch the system.
- Deliverable: problem statement, system design, governance review, and managerial business case.

## Patterns Across All Let's Build Sections

Across the current guidance, the sections follow a stable pattern:

- a short overview that connects the chapter concept to the running project
- a concrete list of what students do
- a clear deliverable
- a brief explanation of why the work matters

This structure makes the Let's Build material easy to align with both chapter learning goals and graded deliverables.

## Source Notes And Known Issues

These issues surfaced while gathering the current Let's Build instructions:

- The docs outline is the best current high-level source, but some chapter-level companion files use older or inconsistent naming.
- Chapter-level Let's Build folders are missing for Chapters 7 and 8 even though the docs outline includes both chapters.
- The Chapter 1 dated file uses a nonstandard date format: `ch01-lets-build-26-03-18.md`.
- Some later chapter folders contain misplaced legacy files, especially around Chapters 15 through 17.
- If a future editor needs chapter-specific implementation detail, the latest dated chapter-level file should be checked after the docs sources, and differences should be noted explicitly.

## Recommended Use

Use this summary as the quick reference for authoring or reviewing Let's Build content. Use the outline and description files when drafting new material, and use chapter-level companion files only to extend detail or resolve local gaps.
