<!-- metadata: date="2026-06-21" -->

# Lab 08: Midterm Review — PetVax Synthesis

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center"><em>Connect everything from the first half of the course by reviewing your PetVax work against a structured checklist, then answer a short synthesis quiz.</em></p>

# Overview

This lab is different from the ones that came before it. Labs 01 through 07 asked you to build something new each week: a logic map, a spreadsheet, an Access database, SQL queries, relationships, a normalized design. Lab 08 asks you to stop building and instead review what you have built.

In the first half of BITM330, you followed a clear path:

```text
Data → Tables → Relationships → Queries → Decisions
```

Each PetVax lab added one piece to that path. Now, before the midterm, you will go back through all of your PetVax work and check it against a structured review. The goal is to make sure the pieces connect — not just that each lab was done, but that you understand how they support one another.

This lab connects to Chapter 8 and to the Let's Build review you completed with the Grading Database. Where Let's Build asked you to review your Grading Database work, this lab asks you to do the same review for PetVax.

**Estimated time:** about 45 minutes.

# How This Lab Is Graded

This lab has **two graded parts**. You must complete both.

## Part 1 — Brightspace quiz (auto-graded)

You answer a set of exact-answer questions inside the Brightspace quiz for this lab. Every answer comes from work you actually performed during the review. If a question asks about a primary key in your PetVax database, the answer comes from your own `.accdb` file.

## Part 2 — Completed review checklist (AI-checked)

You download the review checklist template below, fill it out as you inspect your PetVax work, and upload the completed file. An AI grader confirms the checklist is complete and that your answers match the evidence in your PetVax files.

**Final grade = Brightspace quiz score + AI-graded checklist.**

> ⚠️ **Missing-file rule:** If the completed review checklist is missing, you receive zero for the file-submission part and may receive zero for the entire lab.

# Scenario

PetVax has been your applied case since Lab 01. Across seven labs, you have:

- Modeled the clinic as an information system (Lab 02)
- Worked with spreadsheet data and recognized flat-file problems (Lab 03)
- Built an Access database with tables, forms, queries, and reports (Lab 04)
- Wrote SQL queries against PetVax data in SQLite (Lab 05)
- Created relational designs with primary keys, foreign keys, and referential integrity (Lab 06)
- Normalized a flat clinic table into a proper six-table design (Lab 07)

The clinic owner is now asking an important question: **Is our data system reliable enough to support real business decisions?**

Your job in this lab is to answer that question by reviewing every piece of PetVax work you have completed and verifying that the data chain holds together — from raw data, through tables and relationships, to queries that produce trustworthy answers.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part A: Schema Review Checklist

Open your most recent PetVax Access database and complete this checklist. For every item, mark **Yes** or **No**. If you mark **No**, write one sentence explaining what still needs to be fixed.

| # | Checklist Item | Yes/No | Fix Needed (if No) |
|---|---------------|--------|---------------------|
| 1 | Every table has a primary key. | | |
| 2 | Every foreign key relationship is defined clearly. | | |
| 3 | Referential integrity is enforced where your platform supports it. | | |
| 4 | No table contains repeating columns (e.g., Pet1Name, Pet2Name, Pet3Name). | | |
| 5 | No field stores multiple values in one cell (e.g., "dog, cat" in a species field). | | |
| 6 | No partial dependencies remain (a non-key field should depend on the whole primary key, not part of it). | | |
| 7 | No transitive dependencies remain (a non-key field should not depend on another non-key field). | | |
| 8 | Field names use a consistent style across all tables. | | |
| 9 | Table names are clear and describe exactly one subject. | | |
| 10 | The OWNER table stores owner information and nothing else. | | |
| 11 | The PET table stores pet information and nothing else. | | |
| 12 | Visit/appointment data lives in its own table, not inside the PET or OWNER table. | | |
| 13 | Treatment/service data is separated from visit data. | | |
| 14 | The database uses appropriate data types (Text, Number, Date/Time, Currency, Yes/No). | | |

# Part B: Query Bank Review

Return to the PetVax SQL queries you wrote in Lab 05 and any additional queries from Labs 06 and 07. For each query you can locate, fill in a row in this table.

| # | Query Purpose | Tables Used | SQL Features Used | First Lab Where You Used This |
|---|--------------|-------------|-------------------|-------------------------------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

If you have fewer than five saved PetVax queries, write new ones now that answer these business questions:

- Which pets belong to each owner?
- How many appointments has each pet had?
- Which treatments were performed on each visit?
- What is the total billing for each owner?
- Which pets have had no appointments in the last six months?

# Part C: Concept Connection Map

Below is a list of terms from the first half of the course. For each term, write one sentence describing **how it appears in your PetVax work** — not just a definition, but a concrete example from your own files.

| Term | How It Appears in My PetVax Work |
|------|----------------------------------|
| Primary key | |
| Foreign key | |
| One-to-many relationship | |
| Many-to-many relationship | |
| Junction table | |
| Referential integrity | |
| Normalization (1NF) | |
| Normalization (2NF) | |
| Normalization (3NF) | |
| SELECT query | |
| JOIN | |
| WHERE clause | |
| GROUP BY | |
| Aggregate function (COUNT, AVG, SUM) | |
| NULL handling | |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part D: The Data Chain Check

The first half of BITM330 follows this chain:

```text
Data → Tables → Relationships → Queries → Decisions
```

For each link in the chain, answer one question about your PetVax work:

**Data → Tables:** Look at your PetVax spreadsheet from Lab 03. What is one piece of data that was repeated in the flat file but is now stored only once in your normalized database? Write the specific field name and the table where it now lives.

---

**Tables → Relationships:** Open your PetVax relationship page in Access. Which relationship do you think is most important for the clinic's daily operations? Name the two tables and explain why that relationship matters in one sentence.

---

**Relationships → Queries:** Pick one PetVax query that joins at least two tables. Write the SQL below and explain what business question it answers.

```sql
-- Write your query here

```

---

**Queries → Decisions:** Based on your query results, what is one recommendation you would give the PetVax clinic owner? Be specific — do not say "improve operations." Name a concrete change the owner could make based on what the data shows.

---

# Lab Quiz

Answer all questions. Every answer comes from the work you did in Parts A through D above. Do not guess — open your PetVax files and check.

## Question 1 — Primary Key (Multiple Choice)

In your PetVax database, which field serves as the primary key of the PET table?

- A. OwnerID
- B. PetName
- C. PetID
- D. Species

## Question 2 — Relationships (Multiple Choice)

How many relationships did you define in your PetVax Access database?

- A. 0-2
- B. 3-4
- C. 5-6
- D. 7 or more

## Question 3 — Referential Integrity (True/False)

In your PetVax database, referential integrity is enforced on at least one relationship.

- True
- False

## Question 4 — Schema Review (Multiple Choice)

In your schema review checklist, how many items did you mark as "No" (needs fixing)?

- A. 0 — all items passed
- B. 1-2 items need fixing
- C. 3-4 items need fixing
- D. 5 or more items need fixing

## Question 5 — Normalization (Multiple Choice)

In your normalized PetVax design from Lab 07, how many tables did the final design contain?

- A. 3-4 tables
- B. 5-6 tables
- C. 7-8 tables
- D. 9 or more tables

## Question 6 — Data Chain (Multiple Choice)

Which link in the data chain do you think is currently the weakest in your PetVax work?

```text
Data → Tables → Relationships → Queries → Decisions
```

- A. Data → Tables (raw data is still messy or incomplete)
- B. Tables → Relationships (table design is fine but relationships need work)
- C. Relationships → Queries (relationships exist but queries are weak)
- D. Queries → Decisions (queries work but the business recommendation is unclear)

## Question 7 — Query Bank (Multiple Choice)

How many working PetVax queries did you list in Part B?

- A. 0-2 queries
- B. 3-4 queries
- C. 5-6 queries
- D. 7 or more queries

## Question 8 — Concept Map (Select All That Apply)

Which of the following concepts did you mark as clearly present in your PetVax work? Select all that apply.

- A. Primary keys on every table
- B. Foreign keys connecting related tables
- C. At least one one-to-many relationship
- D. At least one query that uses JOIN
- E. At least one query that uses GROUP BY
- F. At least one query that filters with WHERE

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Submission

Submit the following file to the Lab 08 file submission assignment:

**Required file:** `lab-08-petvax-review-checklist.docx` or `lab-08-petvax-review-checklist.pdf`

Your submission must include:

- Completed Part A table (all 14 rows, Yes/No marked, fix notes for any "No")
- Completed Part B table (at least 5 query rows)
- Completed Part C table (all 15 concept rows with PetVax-specific examples)
- Completed Part D (all 4 chain-link answers with specific details from your files)

Download the checklist template from the course LMS. Fill in every field. The AI grader will confirm that all four parts are complete and that your answers are consistent with your quiz responses.

> ⚠️ If the completed checklist file is missing, you receive zero for the file-submission part and may receive zero for the entire lab.

# Lab 08 Completion Checklist

Before you submit, verify:

- [ ] Part A: All 14 schema checklist items marked Yes or No, with fix notes for any No
- [ ] Part B: At least 5 queries listed with tables, features, and lab source
- [ ] Part C: All 15 concept terms have a PetVax-specific example
- [ ] Part D: All 4 data chain questions answered with specific details
- [ ] Your Brightspace quiz answers match what is in your checklist
- [ ] The file is saved as a PDF or DOCX and uploaded to the correct assignment folder
