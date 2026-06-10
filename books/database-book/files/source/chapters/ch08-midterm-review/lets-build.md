<!-- Sources: .docs/lets-build/lets-build-outline-2026-05-06.md; .docs/outline/outline-taglines-2026-05-06.md -->

# Let's Build: Midterm Review Lab

![Let's Build](<../../../../.images/Ch0 General/sections/section optimized/resize-let-build-resize-optimized.gif>)

## Overview

This chapter is a structured review, not a new build. The purpose is to help you connect Chapters 1 through 7 into one clear framework before the midterm. You should leave this lab knowing not only what each topic means, but how the topics support one another inside the Grading Database project.

## What You Will Need

- Your latest normalized database from Chapter 7
- Earlier notes from Chapters 1-7
- Any SQL files, screenshots, or diagrams you created in the first half of the course

## Part A: Schema Review Checklist

Open your current database and complete this checklist.

- [ ] Every table has a primary key.
- [ ] Every foreign key relationship is defined clearly.
- [ ] Referential integrity is enforced where your platform supports it.
- [ ] No table contains repeating columns.
- [ ] No field stores multiple values in one cell.
- [ ] No partial dependencies remain.
- [ ] No transitive dependencies remain.
- [ ] Field names use a consistent style.
- [ ] Table names are clear and professional.

If you check "no" for any item, write one sentence explaining what still needs to be fixed.

## Part B: Query Bank Review

Return to the business questions from Chapter 1 and rebuild or collect the queries that answer them.

For each query, annotate:

- the business question it answers
- the tables it uses
- the SQL features it relies on
- the chapter where you first learned that feature

Use a simple structure like this:

| Query name | Business question | SQL concepts used | First chapter used |
|---|---|---|---|
| `Q1_CurrentGrades` | What is each student's current performance? | `SELECT`, `JOIN`, `AVG`, `GROUP BY` | Chapter 5 |
| `Q2_AttendanceByStudent` | Who is missing class most often? | `SELECT`, `JOIN`, calculated field | Chapter 5 |

## Part C: Concept Map

Create a one-page concept map connecting the major ideas from Chapters 1-7.

Your map should include these terms:

- data
- information
- database
- table
- primary key
- foreign key
- relational model
- normalization
- SQL
- anomaly

Next to each term, add one concrete example from your Grading Database.

## Part D: Practice Explanation

Choose any two of the following prompts and answer them in short paragraphs.

1. Why is a primary key different from an ordinary field?
2. Why did the flat-table design become a problem?
3. Why is normalization useful even when it adds more tables?
4. How does SQL help turn stored data into business answers?
5. What is one business risk that appears when database design is sloppy?

## Part E: Optional Peer Review

If peer review is part of your class process, exchange databases or diagrams with a classmate.

Give feedback on one of these areas:

- a normalization issue that still remains
- a missing or unclear relationship
- a naming problem that makes the design hard to read
- a query that works but is hard to understand

Keep the feedback specific and respectful.

## Deliverable

Submit the following:

- completed schema checklist
- annotated query bank
- concept map
- short written responses to two review prompts
- optional peer review note, if assigned

## Study Advice

If a topic still feels weak, go back to the database object or query that demonstrates it. Review is most useful when it stays tied to a real example, not only a definition.

## Connection Forward

Chapter 9 moves back into hands-on SQL and uses the normalized database you reviewed here.