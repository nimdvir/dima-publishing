# Chapter 10 — Advanced SQL for Business Analysis

> **Review copy — regenerated 2026-07-07 AFTER structural fixes. This reflects current source content.**
> Source folder: `books/database-book/files/source/chapters/ch10-advanced-sql-queries/`
> Components below are in reader order: Introduction, Core Concepts, Let's Build, Review Questions, Terms Treasury, RAT.


<!-- =================================================================== -->
<!-- COMPONENT: index.md -->
<!-- =================================================================== -->

````````````
===== Introduction (index.md) =====
````````````

# Chapter 10: Advanced SQL for Business Analysis

Chapter 5 introduced SQL as the language of relational databases. Chapter 9 showed how to design databases from requirements. This chapter returns to SQL with a more advanced goal: using queries to diagnose data problems, restructure messy data into clean normalized tables, connect those tables, calculate meaningful metrics, and create reusable reporting logic.

## Chapter Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/kFlSsAMlYTU" title="Chapter 10 overview video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Watch the Chapter 10 overview video](https://www.youtube.com/watch?v=kFlSsAMlYTU)

# Chapter Roadmap

| Topic | Why It Matters |
| --- | --- |
| [10.1 From Basic SQL to Advanced SQL](#10-1-from-basic-sql-to-advanced-sql) | Bridge from simple SELECT to the analytical queries that drive business decisions. |
| [10.2 Grading Database Refresher](#10-2-grading-database-refresher) | Revisit the Grading Database schema before applying advanced techniques to it. |
| [10.3 Diagnosing and Restructuring Data with SQL](#10-3-diagnosing-and-restructuring-data-with-sql) | Use SQL to find and fix data problems before they corrupt your analysis. |
| [10.4 Advanced JOIN Patterns](#10-4-advanced-join-patterns) | Go beyond INNER JOIN — master LEFT, RIGHT, CROSS, and self-joins for complex questions. |
| [10.5 Cleaning and Conditional Functions](#10-5-cleaning-and-conditional-functions) | Transform messy real-world data into clean, analysis-ready results with CASE and COALESCE. |
| [10.6 Analytical Aggregation](#10-6-analytical-aggregation) | Move beyond basic GROUP BY to produce business-ready summary reports. |
| [10.7 Date and Time Queries](#10-7-date-and-time-queries) | Filter, group, and calculate using dates — essential for any business timeline analysis. |
| [10.8 Weighted Grades and Policy Tables](#10-8-weighted-grades-and-policy-tables) | Apply SQL to a real academic scenario — computing grades with configurable weights. |
| [10.9 Window Functions](#10-9-window-functions) | Learn the advanced technique that ranks, partitions, and computes running totals without GROUP BY. |
| [10.10 Reusable Reporting Pipelines](#10-10-reusable-reporting-pipelines) | Build SQL workflows you can run repeatedly — the foundation of business intelligence. |

---


<!-- =================================================================== -->
<!-- COMPONENT: core-concepts.md -->
<!-- =================================================================== -->

````````````
===== Core Concepts (core-concepts.md) =====
````````````

# Chapter 10: Advanced SQL for Business Analysis

*Figure 10.1 — Advanced SQL acts as a bridge from clean, normalized storage to reporting and decisions.*

Chapter 5 introduced SQL as the language of relational databases. Chapter 9 showed how to design databases from requirements. This chapter returns to SQL with a more advanced goal: using queries to diagnose data problems, restructure messy data into clean normalized tables, connect those tables, calculate meaningful metrics, and create reusable reporting logic.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Core Concepts
<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-concepts" alt="Core Concepts section icon" width="220">
</p>

## 10.1 From Basic SQL to Advanced SQL

Chapter 5 focused on SQL grammar: retrieving rows, filtering, sorting, joining, and summarizing. This chapter asks a different question:

> How can SQL support reliable analysis and decision-making across a real relational database?

A beginner writes one query to answer one question. An advanced user asks how the query fits into a larger workflow: Is the data clean? Which tables provide context? Should the logic be saved for reuse? Is the calculation based on a business rule stored in a table?

### Four Questions Before Writing an Advanced Query

| Question                           | SQL Implication                                                  |
| ---------------------------------- | ---------------------------------------------------------------- |
| What is the business question?     | Determines filters, calculations, and output columns.            |
| Which table stores the main event? | Start from `STUDENT_GRADE`, `ATTENDANCE`, etc.                   |
| Which tables provide context?      | Join to `STUDENT`, `DELIVERABLE`, `ASSIGNMENT_TYPE`, `SCHEDULE`. |
| What kind of output is needed?     | Choose joins, aggregation, window functions, views, or CTEs.     |

### Example: Turning a Business Question into SQL Logic

> Which students are at risk because their average score is below 75?

```sql
SELECT s.StudentID, s.FirstName, s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
HAVING AVG(sg.Score) < 75
ORDER BY AverageScore ASC;
```

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: From syntax to decisions</strong></p>
  <p>Advanced SQL begins when you stop asking "What syntax do I need?" and start asking "What decision does this query support?"</p>
</div>

## 10.2 Grading Database Refresher

The Grading Database is the running case for this chapter. Most queries follow one of three relational pathways.

| Table             | What It Stores                                 |
| ----------------- | ---------------------------------------------- |
| `STUDENT`         | Student identity and contact information       |
| `ASSIGNMENT_TYPE` | Category-level grading rules (weights, points) |
| `DELIVERABLE`     | Specific graded items (Quiz 1, Exam 2, etc.)   |
| `STUDENT_GRADE`   | One student's score on one deliverable         |
| `SCHEDULE`        | Class meetings, weeks, dates, and topics       |
| `ATTENDANCE`      | Whether a student attended a class meeting     |
| `GRADE_SCALE`     | Letter-grade thresholds                        |

**Student Performance:** `STUDENT → STUDENT_GRADE → DELIVERABLE → ASSIGNMENT_TYPE`
**Attendance:** `STUDENT → ATTENDANCE → SCHEDULE`
**Grade Interpretation:** `STUDENT_GRADE → GRADE_SCALE`

A normalized database stores facts cleanly. SQL turns those facts into views, summaries, and decisions. The design principles behind this schema were covered in Chapter 9.

## 10.3 Diagnosing and Restructuring Data with SQL

<!-- FIGURE 10.3 — IMAGE PROMPT (nano-banana / Gemini): Clean modern textbook diagram, flat vector illustration on a white background, 16:9. On the left, one wide "flat" spreadsheet-style table with visibly repeated/redundant rows (the same student name and class repeated on several rows). A bold arrow points right to three smaller, tidy normalized tables labeled "Students", "Deliverables", and "Grades", connected by thin key-relationship lines (primary key / foreign key). Minimal, correctly spelled labels; professional, high-contrast, uncluttered. When generated, place here as: ![Figure 10.3 — Restructuring a flat table into normalized tables](IMAGE_URL) -->

Before building dashboards or calculating grades, check whether the data can be trusted. SQL can answer diagnostic questions directly. When problems are found, SQL can also restructure the data into a sound relational design — turning diagnosis into action.

### 10.3.1 Detecting Repeated Data in a Flat Table

In a flat table like `GRADE_FLAT`, student details repeat in every grade row:

```sql
SELECT StudentID, FirstName, LastName, Email,
       COUNT(*) AS TimesRepeated
FROM GRADE_FLAT
GROUP BY StudentID, FirstName, LastName, Email
HAVING COUNT(*) > 1;
```

If Alice appears in three rows, her student details are stored three times. In the normalized design, she appears once in `STUDENT`. As introduced in Chapters 6 and 7, this redundancy is exactly what normalization prevents.

### 10.3.2 Detecting Conflicting Values

Repeated data becomes dangerous when copies disagree:

```sql
SELECT StudentID, COUNT(DISTINCT Email) AS EmailVersions
FROM GRADE_FLAT
GROUP BY StudentID
HAVING COUNT(DISTINCT Email) > 1;
```

If this returns rows, the same student has conflicting email values — an update anomaly.

### 10.3.3 Other Diagnostic Patterns

The same `GROUP BY` + `HAVING COUNT(DISTINCT ...) > 1` pattern detects many problems:

| Problem                              | What to Check                                                                           |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| Inconsistent deliverable definitions | `GROUP BY DeliverableType, DeliverableNumber` then `HAVING COUNT(DISTINCT DueDate) > 1` |
| Duplicate grade records              | `GROUP BY StudentID, DeliverableID` then `HAVING COUNT(*) > 1`                          |
| Scores outside valid range           | `WHERE Score < 0 OR Score > 100`                                                        |
| Orphaned grade records               | `LEFT JOIN STUDENT ... WHERE s.StudentID IS NULL`                                       |

<div class="callout tip">
  <p><strong>💡 Tip: Diagnose before you analyze</strong></p>
  <p>Diagnostic SQL helps you test the health of a database before trusting its reports. If SQL can detect inconsistency, your design is already too permissive.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### 10.3.4 Extracting Entities from a Flat Table

Diagnosis tells you what is wrong. The next step is fixing it — using SQL to extract distinct entities and restructure them into normalized tables. This is normalization in practice, not as a theory exercise but as a series of SQL operations.

The key insight: every group of columns that repeats together represents a separate entity. In `GRADE_FLAT`:

- `StudentID`, `FirstName`, `LastName`, `Email` — these describe a **Student**.
- `Type`, `DeliverableNumber`, `DueDate`, `Topic` — these describe a **Deliverable**.
- `Score` — this is the **relationship** between a student and a deliverable.

`SELECT DISTINCT` and `GROUP BY` are the workhorses of entity extraction.

**Extracting students** — each student appears once, regardless of how many grades they have:

```sql
SELECT DISTINCT StudentID, FirstName, LastName, Email
FROM GRADE_FLAT
ORDER BY StudentID;
```

The result is a clean list of unique students — exactly what belongs in a `STUDENT` table.

**Extracting deliverables** — `GROUP BY` collects unique deliverable definitions:

```sql
SELECT Type, DeliverableNumber,
       MIN(DueDate) AS DueDate,
       MIN(Topic) AS Topic
FROM GRADE_FLAT
GROUP BY Type, DeliverableNumber
ORDER BY Type, DeliverableNumber;
```

Using `MIN(DueDate)` instead of just `DueDate` handles the case where conflicting due dates exist for the same deliverable — `GROUP BY` requires an aggregate function for columns not in the `GROUP BY` clause. In a clean dataset, all values would be identical anyway.

### 10.3.5 Creating Normalized Tables from Queries

Extracting entities with `SELECT DISTINCT` is only the first step. To make the normalization permanent, create new tables that store the extracted data.

**`CREATE TABLE AS SELECT` (PostgreSQL, SQLite):**

```sql
CREATE TABLE STUDENT AS
SELECT DISTINCT StudentID, FirstName, LastName, Email
FROM GRADE_FLAT;
```

This creates a new `STUDENT` table and populates it in one step. The table structure is inferred from the query results.

Creating the `DELIVERABLE` table with a surrogate key:

```sql
CREATE TABLE DELIVERABLE AS
SELECT ROW_NUMBER() OVER (ORDER BY Type, DeliverableNumber) AS DeliverableID,
       Type, DeliverableNumber, DueDate, Topic
FROM (
    SELECT DISTINCT Type, DeliverableNumber,
           MIN(DueDate) AS DueDate, MIN(Topic) AS Topic
    FROM GRADE_FLAT
    GROUP BY Type, DeliverableNumber
) AS unique_deliverables;
```

Creating the `STUDENT_GRADE` junction table — this stores only relationships and outcomes, not descriptive data:

```sql
CREATE TABLE STUDENT_GRADE AS
SELECT StudentID, DeliverableType, DeliverableNumber, Score
FROM GRADE_FLAT;
```

**`SELECT INTO` (Access, SQL Server):**

Microsoft Access uses `SELECT … INTO` instead:

```sql
SELECT DISTINCT StudentID, FirstName, LastName, Email
INTO STUDENT
FROM GRADE_FLAT;
```

<div class="callout note">
  <p><strong>📝 Note: Create-from-query is a bridge</strong></p>
  <p><code>CREATE TABLE AS SELECT</code> gets data into separate tables quickly, but it does not automatically create primary keys, foreign keys, or constraints. Those must be added separately. Think of this step as framing the house — the walls go up fast, but you still need wiring, plumbing, and inspection.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### 10.3.6 Migrating Data and Adding Constraints

When tables already exist with the correct structure but are empty, populate them using `INSERT INTO … SELECT` — the workhorse of data migration. Unlike `INSERT INTO … VALUES`, which inserts one row at a time, this pattern moves entire sets of rows.

**Populating the STUDENT table:**

```sql
INSERT INTO STUDENT (StudentID, FirstName, LastName, Email)
SELECT DISTINCT StudentID, FirstName, LastName, Email
FROM GRADE_FLAT
WHERE StudentID IS NOT NULL
  AND FirstName IS NOT NULL
  AND LastName IS NOT NULL;
```

**Populating STUDENT_GRADE** — this requires mapping from the flat table's deliverable columns to the new `DeliverableID`:

```sql
INSERT INTO STUDENT_GRADE (StudentID, DeliverableID, Score)
SELECT gf.StudentID, d.DeliverableID, gf.Score
FROM GRADE_FLAT gf
JOIN DELIVERABLE d
    ON gf.Type = d.Type
    AND gf.DeliverableNumber = d.DeliverableNumber;
```

Once data is migrated and verified clean, harden the tables with constraints. A practical sequencing rule: **clean first, constrain second.** If the data is messy, constraint violations will block the migration. Load the data, query for violations, fix them, then apply constraints.

**Adding primary keys:**

```sql
ALTER TABLE STUDENT
ADD CONSTRAINT pk_student PRIMARY KEY (StudentID);

ALTER TABLE DELIVERABLE
ADD CONSTRAINT pk_deliverable PRIMARY KEY (DeliverableID);
```

**Adding foreign keys** — these guarantee that every grade record points to a real student and a real deliverable:

```sql
ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT fk_sg_student
FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID);

ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT fk_sg_deliverable
FOREIGN KEY (DeliverableID) REFERENCES DELIVERABLE(DeliverableID);
```

**Adding validation constraints:**

```sql
ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT chk_score CHECK (Score >= 0 AND Score <= 100);

ALTER TABLE STUDENT
ADD CONSTRAINT uq_email UNIQUE (Email);
```

<div class="callout important">
  <p><strong>❗ Important: SQLite constraint limitation</strong></p>
  <p>SQLite does not support adding a <code>PRIMARY KEY</code> with <code>ALTER TABLE</code> after creation. Define primary keys in the original <code>CREATE TABLE</code> statement or recreate the table. This is a platform-specific detail to watch for.</p>
</div>

### 10.3.7 Verifying and Finalizing the New Schema

Before discarding the original flat table, verify the migration was correct.

**Check row counts match:**

```sql
SELECT COUNT(*) FROM GRADE_FLAT;
SELECT COUNT(*) FROM STUDENT_GRADE;
```

The count of grade rows should match — the volume of data has not changed, but duplicated descriptive data has been dramatically reduced.

**Check for orphaned rows** — grades that could not be mapped to a deliverable:

```sql
SELECT *
FROM GRADE_FLAT gf
LEFT JOIN DELIVERABLE d
    ON gf.Type = d.Type AND gf.DeliverableNumber = d.DeliverableNumber
WHERE d.DeliverableID IS NULL;
```

If this returns rows, some data is inconsistent and must be resolved before constraints are enforced.

**Reconstruct the original data** to confirm correctness:

```sql
SELECT s.FirstName, s.LastName, sg.Score
FROM STUDENT s
JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID;
```

If results match the original flat table output, normalization preserved correctness.

**Drop the old table:**

```sql
DROP TABLE GRADE_FLAT;
```

From this point forward, all queries operate on the normalized relational design. SQL has served not just as a query language but as a **refactoring tool** — reshaping data, enforcing structure, and preparing the system for reliable analytics.

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: SQL as a refactoring tool</strong></p>
  <p>SQL is not only for querying data. It can diagnose problems, extract entities, create normalized tables, migrate data, and enforce constraints. The same language that answers business questions can build the structures that make those answers trustworthy.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.4 Advanced JOIN Patterns

<!-- FIGURE 10.4 — IMAGE PROMPT (nano-banana / Gemini): Clean modern textbook diagram, flat vector illustration on a white background, 16:9. Four small labeled set diagrams in a row showing SQL JOIN types — "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", and "FULL / CROSS JOIN" — each as two overlapping circles (Venn style) labeled "Students" and "Grades", with the region that the join returns shaded in a single accent color. Correctly spelled labels under each diagram; professional, high-contrast, uncluttered. When generated, place here as: ![Figure 10.4 — SQL JOIN types compared](IMAGE_URL) -->

### 10.4.1 Complete Gradebook Report

A complete gradebook needs student names, deliverable labels, due dates, and scores — all from different tables:

```sql
SELECT s.StudentID, s.FirstName, s.LastName,
       d.DeliverableType, d.DeliverableNumber, d.DueDate, sg.Score
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
JOIN DELIVERABLE AS d ON sg.DeliverableID = d.DeliverableID
ORDER BY s.LastName, d.DeliverableType, d.DeliverableNumber;
```

### 10.4.2 Finding Missing Grades with `CROSS JOIN` and `LEFT JOIN`

Missing work is tricky because missing rows are invisible unless you first generate the rows that *should* exist:

```sql
SELECT s.StudentID, s.FirstName, s.LastName,
       d.DeliverableType, d.DeliverableNumber, d.DueDate
FROM STUDENT AS s
CROSS JOIN DELIVERABLE AS d
LEFT JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID AND d.DeliverableID = sg.DeliverableID
WHERE sg.GradeID IS NULL
ORDER BY s.LastName, d.DueDate;
```

`CROSS JOIN` creates every expected student-deliverable pair. `LEFT JOIN` checks for actual grades. `WHERE sg.GradeID IS NULL` keeps only the missing ones.

<div class="callout avoid">
  <p><strong>❌ Avoid: Searching only the grade table for missing grades</strong></p>
  <p>Missing grades are absent from <code>STUDENT_GRADE</code>. You need an expected list first.</p>
</div>

### 10.4.3 Join Checklist

| Situation                               | Preferred Join             |
| --------------------------------------- | -------------------------- |
| Only matched records matter             | `INNER JOIN`               |
| Need all rows from the left table       | `LEFT JOIN`                |
| Need expected combinations              | `CROSS JOIN` + `LEFT JOIN` |
| Need to diagnose missing parent records | `LEFT JOIN` + `IS NULL`    |

## 10.5 Cleaning and Conditional Functions

Real data is rarely clean. Access uses `Nz()` and `IIf()`; other SQL systems use `COALESCE()` and `CASE`. This section treats Access as a gateway: learn the idea in Access, then recognize the portable equivalent.

### Access vs. Portable SQL

| Need                          | Microsoft Access                     | SQLite / PostgreSQL                                      |
| ----------------------------- | ------------------------------------ | -------------------------------------------------------- |
| Replace `NULL` with a default | `Nz([Score], 0)`                     | `COALESCE(Score, 0)`                                     |
| Conditional value             | `IIf([Score] >= 60, "Pass", "Fail")` | `CASE WHEN Score >= 60 THEN 'Pass' ELSE 'Fail' END`      |
| Current date                  | `Date()`                             | `CURRENT_DATE` / `DATE('now')`                           |
| Days between dates            | `DateDiff("d", [Start], [End])`      | Platform-specific                                        |
| Extract year                  | `DatePart("yyyy", [DueDate])`        | `EXTRACT(YEAR FROM DueDate)` / `strftime('%Y', DueDate)` |

The concept is portable. The function name is not always portable.

### Multi-Level Performance Bands

```sql
SELECT s.FirstName, s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore,
       CASE
           WHEN AVG(sg.Score) >= 90 THEN 'High Performance'
           WHEN AVG(sg.Score) >= 80 THEN 'On Track'
           WHEN AVG(sg.Score) >= 70 THEN 'Needs Attention'
           ELSE 'At Risk'
       END AS PerformanceBand
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY AverageScore ASC;
```

<div class="callout important">
  <p><strong>❗ Important: NULL is not zero</strong></p>
  <p>Only treat missing scores as zero if the grading policy says missing work counts as zero. Otherwise, display "Not Graded."</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.6 Analytical Aggregation

Aggregation turns many rows into summary information. This is where SQL becomes a business analytics tool.

### 10.6.1 Average Score Per Student

```sql
SELECT s.StudentID, s.FirstName, s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore,
       COUNT(sg.GradeID) AS NumberOfGrades
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY AverageScore DESC;
```

### 10.6.2 `HAVING` for Group Filters

`WHERE` filters rows before aggregation. `HAVING` filters groups after aggregation.

```sql
SELECT s.StudentID, s.FirstName, s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
HAVING AVG(sg.Score) < 75;
```

<div class="callout avoid">
  <p><strong>❌ Avoid: Using WHERE with aggregates</strong></p>
  <p>Do not write <code>WHERE AVG(Score) &lt; 75</code>. Aggregate conditions belong in <code>HAVING</code>.</p>
</div>

### 10.6.3 Conditional Aggregation

Count or sum only the rows that meet a condition:

```sql
SELECT d.DeliverableType, d.DeliverableNumber,
       COUNT(CASE WHEN sg.Score >= 70 THEN 1 END) AS PassingCount,
       COUNT(CASE WHEN sg.Score < 70 THEN 1 END) AS FailingCount
FROM DELIVERABLE AS d
JOIN STUDENT_GRADE AS sg ON d.DeliverableID = sg.DeliverableID
GROUP BY d.DeliverableID, d.DeliverableType, d.DeliverableNumber;
```

### 10.6.4 Attendance Rate Per Student

```sql
SELECT s.StudentID, s.FirstName, s.LastName,
       ROUND(100.0 * SUM(CASE WHEN a.Attended = 1 THEN 1 ELSE 0 END) / COUNT(*), 1) AS AttendanceRate
FROM STUDENT AS s
JOIN ATTENDANCE AS a ON s.StudentID = a.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY AttendanceRate ASC;
```

### 10.6.5 `COUNT(*)` vs. `COUNT(column)`

| Expression                  | Meaning                                             |
| --------------------------- | --------------------------------------------------- |
| `COUNT(*)`                  | Counts all rows, including rows with `NULL` values. |
| `COUNT(Score)`              | Counts rows where `Score` is not `NULL`.            |
| `COUNT(DISTINCT StudentID)` | Counts unique student IDs.                          |

## 10.7 Date and Time Queries

Date syntax varies across platforms, so learn the pattern and look up the specific function.

### Date Function Reference

| Need         | Access                          | SQLite                              | PostgreSQL                    |
| ------------ | ------------------------------- | ----------------------------------- | ----------------------------- |
| Current date | `Date()`                        | `DATE('now')`                       | `CURRENT_DATE`                |
| Add 7 days   | `DateAdd("d", 7, [DueDate])`    | `DATE(DueDate, '+7 days')`          | `DueDate + INTERVAL '7 days'` |
| Days between | `DateDiff("d", [Start], [End])` | `JULIANDAY(End) - JULIANDAY(Start)` | `EndDate - StartDate`         |
| Extract year | `DatePart("yyyy", [DueDate])`   | `strftime('%Y', DueDate)`           | `EXTRACT(YEAR FROM DueDate)`  |

### Overdue Deliverables Without Grades

```sql
SELECT s.StudentID, s.FirstName, s.LastName,
       d.DeliverableType, d.DeliverableNumber, d.DueDate
FROM STUDENT AS s
CROSS JOIN DELIVERABLE AS d
LEFT JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID AND d.DeliverableID = sg.DeliverableID
WHERE d.DueDate < CURRENT_DATE AND sg.GradeID IS NULL
ORDER BY d.DueDate, s.LastName;
```

For SQLite, replace `CURRENT_DATE` with `DATE('now')`. For Access, use `Date()`.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.8 Weighted Grades and Policy Tables

A final grade is rarely a simple average. Different categories carry different weights. The correct design principle:

> Store grading policy in a table, not inside scattered formulas.

### Weighted Final Grade Using a CTE

```sql
WITH CategoryAverages AS (
    SELECT sg.StudentID, d.DeliverableType,
           AVG(sg.Score) AS CategoryAverage
    FROM STUDENT_GRADE AS sg
    JOIN DELIVERABLE AS d ON sg.DeliverableID = d.DeliverableID
    GROUP BY sg.StudentID, d.DeliverableType
)
SELECT s.StudentID, s.FirstName, s.LastName,
       ROUND(SUM(ca.CategoryAverage * gw.CategoryWeight), 2) AS WeightedFinalGrade
FROM STUDENT AS s
JOIN CategoryAverages AS ca ON s.StudentID = ca.StudentID
JOIN GRADE_WEIGHT AS gw ON ca.DeliverableType = gw.DeliverableType
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY WeightedFinalGrade DESC;
```

This query has two stages: (1) calculate category averages, (2) multiply each by its weight and sum.

### Joining to the Grade Scale

After calculating the weighted numeric grade, convert it to a letter grade by joining to `GRADE_SCALE`:

```sql
-- After computing FinalNumericGrade via CTE:
SELECT fg.StudentID, fg.FirstName, fg.LastName,
       fg.FinalNumericGrade, gs.LetterGrade
FROM FinalGrades AS fg
JOIN GRADE_SCALE AS gs
  ON fg.FinalNumericGrade BETWEEN gs.MinScore AND gs.MaxScore;
```

<div class="callout avoid">
  <p><strong>❌ Avoid: Averaging averages</strong></p>
  <p>Do not average category averages unless every category has the same weight. Use a weight table.</p>
</div>

## 10.9 Window Functions

<!-- FIGURE 10.9 — IMAGE PROMPT (nano-banana / Gemini): Clean modern textbook diagram, flat vector illustration on a white background, 16:9. Show a table of student scores grouped into two colored partitions (by class), illustrating a SQL window function: within each partition a "RANK" column is computed, with small arrows indicating a "window" sliding over the partitioned, ordered rows. Include tidy labels "PARTITION BY class" and "ORDER BY score DESC". Keep detail rows visible (contrast with GROUP BY which collapses them). Correctly spelled minimal labels; professional, high-contrast. When generated, place here as: ![Figure 10.9 — How a SQL window function partitions and ranks rows](IMAGE_URL) -->

Ordinary aggregation collapses rows. Window functions calculate summaries while preserving detail rows.

### `GROUP BY` vs. Window Functions

| Need                                    | Use             |
| --------------------------------------- | --------------- |
| One row per group                       | `GROUP BY`      |
| Keep detail rows and add summary values | Window function |
| Rank rows                               | Window function |

### Student Average Next to Each Score

```sql
SELECT sg.StudentID, sg.DeliverableID, sg.Score,
       ROUND(AVG(sg.Score) OVER (PARTITION BY sg.StudentID), 2) AS StudentAverage
FROM STUDENT_GRADE AS sg
ORDER BY sg.StudentID, sg.DeliverableID;
```

Each grade row remains visible, but the student's average appears alongside it.

### Ranking Students by Average

```sql
WITH StudentAverages AS (
    SELECT s.StudentID, s.FirstName, s.LastName,
           AVG(sg.Score) AS AverageScore
    FROM STUDENT AS s
    JOIN STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
    GROUP BY s.StudentID, s.FirstName, s.LastName
)
SELECT StudentID, FirstName, LastName,
       ROUND(AverageScore, 2) AS AverageScore,
       RANK() OVER (ORDER BY AverageScore DESC) AS ClassRank
FROM StudentAverages;
```

`RANK()` assigns equal rank to ties and leaves gaps. `DENSE_RANK()` assigns equal rank without gaps. `ROW_NUMBER()` assigns a unique sequence even for ties.

<div class="callout note">
  <p><strong>📝 Note: Platform support</strong></p>
  <p>Window functions are supported in PostgreSQL and modern SQLite. Microsoft Access does not support SQL window functions directly.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.10 Reusable Reporting Pipelines

<!-- FIGURE 10.10 — IMAGE PROMPT (nano-banana / Gemini): Clean modern textbook diagram, flat vector illustration on a white background, 16:9. A left-to-right horizontal pipeline flow with four connected, labeled stages joined by arrows: "Raw Tables" (small table icon) → "SQL View" (gear/document icon) → "Aggregated Metrics" (small bar-chart icon) → "Reusable Report" (dashboard icon). Convey that logic is saved once and reused. Correctly spelled minimal labels; consistent accent color; professional, high-contrast, uncluttered. When generated, place here as: ![Figure 10.10 — A reusable SQL reporting pipeline](IMAGE_URL) -->

Writing one correct query is useful. Writing query logic that can be reused is more valuable.

| Tool         | Best For                             | Scope      |
| ------------ | ------------------------------------ | ---------- |
| **Subquery** | One calculation inside another query | Temporary  |
| **CTE**      | Multi-step readable logic            | Temporary  |
| **View**     | Saved reporting logic                | Persistent |

### Views as Saved Reports

```sql
CREATE VIEW StudentPerformanceSummary AS
SELECT s.StudentID, s.FirstName, s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore,
       CASE WHEN AVG(sg.Score) < 70 THEN 'At Risk'
            WHEN AVG(sg.Score) < 80 THEN 'Needs Attention'
            ELSE 'On Track' END AS Status
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName;
```

Query it like a table: `SELECT * FROM StudentPerformanceSummary WHERE Status = 'At Risk';`

### Subqueries for Comparisons

```sql
SELECT s.FirstName, s.LastName, sg.Score
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg ON s.StudentID = sg.StudentID
WHERE sg.Score > (SELECT AVG(Score) FROM STUDENT_GRADE);
```

A **scalar subquery** returns exactly one value and can be used like a constant in a `SELECT` or `WHERE` clause — as shown above, where the subquery computes the overall average score to compare against.

### `EXISTS` for Relationship Checks

```sql
SELECT s.StudentID, s.FirstName, s.LastName
FROM STUDENT AS s
WHERE EXISTS (
    SELECT 1 FROM STUDENT_GRADE AS sg
    JOIN DELIVERABLE AS d ON sg.DeliverableID = d.DeliverableID
    WHERE sg.StudentID = s.StudentID AND d.DeliverableType = 'Exam'
);
```

### Choosing the Right Tool

| Situation                     | Best Tool             |
| ----------------------------- | --------------------- |
| Short one-time comparison     | Subquery              |
| Multi-step readable logic     | CTE                   |
| Logic reused across reports   | View                  |
| Combining similar result sets | `UNION` / `UNION ALL` |
| Access-based reusable query   | Saved query           |

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Query logic as infrastructure</strong></p>
  <p>Reusable SQL logic is part of database design. Good queries become analytical infrastructure.</p>
</div>

## 10.11 Safe Data Modification

Advanced SQL includes modifying data. That power requires discipline.

### The Safe Workflow

1. Write a `SELECT` to identify the target rows.
2. Verify the result.
3. Convert the `SELECT` into `UPDATE` or `DELETE`.
4. Run the modification only when the target rows are confirmed.

```sql
-- Step 1: Verify
SELECT StudentID, FirstName, LastName, Email
FROM STUDENT WHERE StudentID = 101;

-- Step 2: Update
UPDATE STUDENT SET Email = 'alice.johnson@albany.edu'
WHERE StudentID = 101;

-- Step 3: Verify again
SELECT StudentID, FirstName, LastName, Email
FROM STUDENT WHERE StudentID = 101;
```

<div class="callout warning">
  <p><strong>⚠️ Warning: Missing WHERE clause</strong></p>
  <p><code>UPDATE STUDENT SET Email = 'unknown@albany.edu';</code> changes <em>every</em> student. <code>DELETE FROM STUDENT_GRADE;</code> removes <em>every</em> grade. SQL does what you ask, not what you mean.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Transactions as a Safety Preview

```sql
BEGIN TRANSACTION;
UPDATE STUDENT_GRADE SET Score = 88 WHERE GradeID = 42;
-- If correct: COMMIT;
-- If wrong: ROLLBACK;
```

Transactions are covered more fully in the database administration chapter.

## 10.12 Integrated Example: At-Risk Student Report

This section pulls the chapter together. The instructor needs a report identifying students who may need support, including average score, missing grades, attendance rate, and a risk category.

```sql
WITH MissingGrades AS (
    SELECT s.StudentID, COUNT(*) AS MissingGradeCount
    FROM STUDENT AS s
    CROSS JOIN DELIVERABLE AS d
    LEFT JOIN STUDENT_GRADE AS sg
      ON s.StudentID = sg.StudentID AND d.DeliverableID = sg.DeliverableID
    WHERE sg.GradeID IS NULL
    GROUP BY s.StudentID
),
ScoreAverages AS (
    SELECT StudentID, AVG(Score) AS AverageScore
    FROM STUDENT_GRADE GROUP BY StudentID
),
AttendanceRates AS (
    SELECT StudentID,
           100.0 * SUM(CASE WHEN Attended = 1 THEN 1 ELSE 0 END) / COUNT(*) AS AttendanceRate
    FROM ATTENDANCE GROUP BY StudentID
)
SELECT s.StudentID, s.FirstName, s.LastName,
       ROUND(COALESCE(sa.AverageScore, 0), 2) AS AverageScore,
       COALESCE(mg.MissingGradeCount, 0) AS MissingGradeCount,
       ROUND(COALESCE(ar.AttendanceRate, 0), 1) AS AttendanceRate,
       CASE
           WHEN COALESCE(sa.AverageScore, 0) < 70
             OR COALESCE(ar.AttendanceRate, 0) < 70
             OR COALESCE(mg.MissingGradeCount, 0) >= 3 THEN 'High Risk'
           WHEN COALESCE(sa.AverageScore, 0) < 80
             OR COALESCE(ar.AttendanceRate, 0) < 80
             OR COALESCE(mg.MissingGradeCount, 0) >= 1 THEN 'Needs Attention'
           ELSE 'On Track'
       END AS RiskCategory
FROM STUDENT AS s
LEFT JOIN ScoreAverages AS sa ON s.StudentID = sa.StudentID
LEFT JOIN MissingGrades AS mg ON s.StudentID = mg.StudentID
LEFT JOIN AttendanceRates AS ar ON s.StudentID = ar.StudentID
ORDER BY RiskCategory, AverageScore ASC;
```

| CTE               | What It Does                                               |
| ----------------- | ---------------------------------------------------------- |
| `MissingGrades`   | Counts expected student-deliverable pairs with no grade.   |
| `ScoreAverages`   | Calculates each student's average score.                   |
| `AttendanceRates` | Calculates each student's attendance percentage.           |
| Final `SELECT`    | Joins the pieces and labels each student by risk category. |

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: SQL as a decision pipeline</strong></p>
  <p>Advanced SQL is not a single clever trick. It is a readable pipeline of smaller logical steps that transforms normalized data into actionable reports.</p>
</div>

## Chapter Summary

This chapter moved SQL from basic retrieval into advanced analysis and reporting. The chapter began by reframing SQL as a way to support business questions, not merely return data.

You reviewed the Grading Database schema and learned how its normalized structure — designed in Chapter 9 — shapes query design. Diagnostic SQL revealed how to detect redundancy, conflicting values, duplicates, invalid scores, and orphaned rows. You then learned how to go beyond diagnosis: using SQL to extract entities from flat tables, create normalized tables with `CREATE TABLE AS SELECT` and `SELECT INTO`, migrate data with `INSERT INTO … SELECT`, and harden the new schema with primary keys, foreign keys, and validation constraints. The same language that finds problems can fix them.

Advanced join patterns reconstructed gradebook reports, identified missing work, and connected attendance to schedules. Analytical aggregation — `GROUP BY`, `HAVING`, conditional counts, and attendance rates — turned raw rows into performance metrics. Cleaning and conditional functions (`CASE`, `COALESCE`, Access `IIf()` and `Nz()`) made output interpretable across platforms.

Weighted-grade calculations showed why grading policy belongs in a table, not in scattered formulas. Window functions preserved detail rows while adding rankings and averages alongside each score. Views, CTEs, and subqueries provided tools for managing query complexity and building reusable logic.

The chapter closed with safe `UPDATE`/`DELETE` workflows and an integrated at-risk student report that combined missing-grade detection, score averages, attendance rates, and conditional risk labeling into one readable CTE pipeline.

The main lesson: advanced SQL is not about making queries complicated. It is about making data work reliable, explainable, and useful for decisions. Chapter 11 will shift from querying and analyzing data to managing the database itself — administration, security, backup, and governance.

*Review and practice questions for this chapter are in the Review and Reflection companion.*

---

## References

Connolly, T., & Begg, C. (2015). *Database systems: A practical approach to design, implementation, and management* (6th ed.). Pearson.

Date, C. J. (2004). *An introduction to database systems* (8th ed.). Pearson/Addison Wesley.

Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7th ed.). Pearson.

Hoffer, J. A., Venkataraman, R., & Topi, H. (2019). *Modern database management* (13th ed.). Pearson.

Laudon, K. C., & Laudon, J. P. (2024). *Management information systems: Managing the digital firm* (18th ed.). Pearson.

Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7th ed.). McGraw-Hill Education.


<!-- =================================================================== -->
<!-- COMPONENT: lets-build.md -->
<!-- =================================================================== -->

````````````
===== Let's Build (lets-build.md) =====
````````````

# Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

This Let's Build gives you hands-on practice with the advanced SQL techniques from Chapter 10. You will map the entire Grading Database (GDB) schema visually in Lucidchart, then write diagnostic, analytical, and reporting queries that turn normalized data into actionable information. Every task uses the same seven-table GDB you have been working with throughout the course. For submission, complete the exercises below and save your Lucidchart ERD and your SQL scripts. The companion **Lab 10 — Advanced SQL for Business Analysis** is where your graded PetVax transfer work lives.

## Purpose

Writing advanced SQL starts with understanding the schema. Before you can join tables, compute weighted grades, or build reporting pipelines, you need to see how the tables connect — which columns are keys, which pathways carry the most important queries, and where referential integrity guards the data. This LB has you map that schema visually, then apply the chapter's techniques: diagnostic queries, CTE pipelines, views, window functions, and safe data modification.

## What You Will Practice

- Drawing a seven-table entity-relationship diagram in Lucidchart with Crow's Foot notation
- Writing diagnostic queries that detect data quality problems before analysis
- Building multi-stage CTEs to compute weighted final grades with risk flags
- Creating reusable views that combine attendance and grade data
- Using window functions to rank and compare without collapsing detail rows
- Practicing safe `UPDATE` workflows with transactions

## Before You Begin

You will need:

- **Lucidchart** (free education account at [lucid.co](https://lucid.co)) — for the ERD
- **SQLite** ([sqliteonline.com](https://sqliteonline.com/) or DB Browser for SQLite) or **Supabase** (PostgreSQL) — for all SQL exercises
- The populated Grading Database from your earlier work. If you need to recreate it, the schema is:

```text
STUDENT(StudentID, FirstName, LastName, Email, Birthday)
ASSIGNMENT_TYPE(Type, Quantity, Points, Points_per_one)
DELIVERABLE(DeliverableID, Type, DeliverableNumber, DueDate, Topic)
STUDENT_GRADE(GradeID, StudentID, DeliverableID, Score)
SCHEDULE(ClassNum, Week, Date, Day, Topic, Format)
ATTENDANCE(AttendanceID, ClassNum, StudentID, Attended)
GRADE_SCALE(LetterGrade, MinScore, MaxScore)
```

## Map the Grading Database Schema with Lucidchart

Before writing a single query, draw the complete seven-table ERD. A clear diagram makes every join, every relationship pathway, and every constraint visible at a glance.

**What to do:**

1. Open Lucidchart and create a new **Entity Relationship Diagram** from the template gallery.
2. Add an entity box for each of the seven tables. Inside each box, list the table name at the top, then all columns. Bold or underline the primary key column.
3. Draw relationship lines between tables. Use **Crow's Foot notation** to show cardinality:
   - One student has many grades → `STUDENT (1)` ─── `< (M) STUDENT_GRADE`
   - One deliverable has many grades → `DELIVERABLE (1)` ─── `< (M) STUDENT_GRADE`
   - One schedule entry has many attendance records → `SCHEDULE (1)` ─── `< (M) ATTENDANCE`
   - One student has many attendance records → `STUDENT (1)` ─── `< (M) ATTENDANCE`
   - One assignment type defines many deliverables → `ASSIGNMENT_TYPE (1)` ─── `< (M) DELIVERABLE`
4. Label each relationship line with the foreign key column that carries the reference. For example, the line from `STUDENT` to `STUDENT_GRADE` should show `StudentID` as the FK in `STUDENT_GRADE`.
5. Add a note on the diagram identifying the three main relational pathways:
   - **Student Performance:** `STUDENT → STUDENT_GRADE → DELIVERABLE → ASSIGNMENT_TYPE`
   - **Attendance:** `STUDENT → ATTENDANCE → SCHEDULE`
   - **Grade Interpretation:** `STUDENT_GRADE → GRADE_SCALE`

**Expected output:** A single Lucidchart ERD showing all seven tables, their columns with PKs marked, relationship lines in Crow's Foot notation, FK labels, and the three relational pathways annotated. Export as a PNG or PDF and save for submission.

<div class="callout tip">
  <p><strong>💡 Tip: Lucidchart Crow's Foot quick start</strong></p>
  <p>In Lucidchart, drag an entity shape onto the canvas for each table. To set Crow's Foot notation, select a relationship line, open the line settings panel, and choose the Crow's Foot endpoint style. The "one" side gets a single vertical line; the "many" side gets the three-pronged crow's foot.</p>
</div>

## Diagnose Data Quality with SQL

The chapter opened with a critical principle: diagnose before you analyze. Use SQL to check whether the GDB data can be trusted.

**What to do:**

Write a query that finds any `STUDENT_GRADE` rows where the `Score` is outside the valid range of 0 to 100.

```sql
-- Write your query here
```

Then write a second query that checks for duplicate grade records — the same student with more than one score for the same deliverable.

```sql
-- Write your query here
```

**Expected output:** The first query returns zero rows if all scores are valid; otherwise it lists the offending rows. The second query returns zero rows if every student has at most one score per deliverable. If either query returns rows, the data needs cleaning before the analyses that follow.

## Build a CTE Pipeline for Weighted Final Grades

Section 10.8 showed how to compute weighted final grades from policy stored in a table. Build a three-stage CTE pipeline that produces a ranked class list with risk flags.

**What to do:**

Write a single query with three CTE stages:

1. **CategoryAverages** — Compute each student's average score per deliverable type (Quiz, Exam, Project, Homework).
2. **WeightedGrades** — Multiply each category average by its weight and sum. Use these weights: Quiz = 0.20, Exam = 0.30, Project = 0.30, Homework = 0.20.
3. **FlaggedStudents** — Assign a letter grade (A ≥ 90, B ≥ 80, C ≥ 70, D ≥ 60, F < 60) and a risk flag (`At Risk` if below 70, `Needs Attention` if below 80, `On Track` otherwise).

The final `SELECT` should return: student full name, weighted final grade (2 decimals), letter grade, and risk flag — ordered by grade ascending so at-risk students appear first.

**Expected output:** One row per student with four columns. Students with the lowest weighted grades appear at the top. Every student has a letter grade and a human-readable risk flag.

## Create a Reusable View for the Performance Dashboard

Section 10.10 introduced views as saved query logic. Create a view that instructors can query repeatedly to monitor student performance at a glance.

**What to do:**

Create a view called `StudentPerformanceDashboard` that returns for each student:

| Column | Source |
|---|---|
| `StudentName` | `FirstName || ' ' || LastName` |
| `AverageScore` | `AVG(Score)` from `STUDENT_GRADE`, rounded to 2 decimals |
| `SubmissionCount` | `COUNT(GradeID)` from `STUDENT_GRADE` |
| `AttendanceRate` | Percentage of classes attended, rounded to 1 decimal |
| `Status` | `At Risk` if average < 70 OR attendance < 70; `Needs Attention` if either < 80; `On Track` otherwise |

Use `LEFT JOIN` so students with no grades or no attendance still appear. After creating the view, query it with `SELECT * FROM StudentPerformanceDashboard ORDER BY Status, AverageScore ASC;`

**Expected output:** The `SELECT` from the view returns one row per student with five columns, sorted so at-risk students appear first. Students with zero grades show `NULL` or 0 for `AverageScore` depending on your handling.

## Rank Students with Window Functions

Section 10.9 showed that window functions calculate rankings and running values without collapsing detail rows. Use them to rank students and to show each score in context.

**What to do:**

Write a query that, for every grade record, shows:

| Column | How |
|---|---|
| `StudentName` | Joined from `STUDENT` |
| `DeliverableLabel` | e.g., "Quiz 1", "Exam 2" |
| `Score` | From `STUDENT_GRADE` |
| `StudentAverage` | `AVG(Score) OVER (PARTITION BY StudentID)` |
| `ClassRank` | `RANK() OVER (ORDER BY StudentAverage DESC)` — computed in a CTE first |

Order by `ClassRank`, then `StudentName`, then `DeliverableLabel`.

**Expected output:** Every grade row appears with the student's overall average and class rank alongside it. Students are grouped by rank. You can see each individual score next to the summary — the defining advantage of window functions over `GROUP BY`.

## Practice Safe Updates with Transactions

Section 10.11 emphasized that `UPDATE` and `DELETE` require discipline. Practice the safe workflow: verify, then modify, then verify again — wrapped in a transaction.

**What to do:**

The instructor decides to add 2 bonus points to all Homework scores, capped at 100.

1. Write a `SELECT` that shows every Homework score before the change.
2. Wrap the `UPDATE` in a transaction. Use `CASE` to cap scores at 100.
3. Write a verification `SELECT` that confirms no score exceeds 100.
4. Include comments showing where you would `ROLLBACK` if the verification fails.

**Expected output:** Before running `COMMIT`, your verification query shows all scores ≤ 100. The transaction block is clearly structured with the verify → modify → verify → commit/rollback pattern.

## Check Your Work

| Task | What to Verify |
|---|---|
| Lucidchart ERD | Seven tables, PKs marked, Crow's Foot notation, FK labels, three pathways annotated |
| Diagnostic queries | Score range query returns valid results; duplicate check returns zero rows on clean data |
| CTE pipeline | One row per student; weighted grades sum weights × category averages; risk flags match thresholds |
| Performance view | `SELECT * FROM StudentPerformanceDashboard` returns all students with five columns |
| Window functions | Every grade row has a `StudentAverage` and `ClassRank`; students grouped by rank |
| Safe update | Transaction block follows verify → modify → verify pattern; comments show rollback point |

## What This Shows

- The Lucidchart ERD proves you can read a normalized schema and communicate its structure visually — a skill every database professional uses.
- The diagnostic queries show that SQL is not just for answers — it is for verifying that your data can be trusted before you build reports on it.
- The CTE pipeline demonstrates how advanced SQL breaks a complex calculation (weighted grades + letter mapping + risk flags) into readable, auditable stages.
- The view shows how reusable query logic becomes analytical infrastructure — define once, query repeatedly.
- The window function exercise proves you understand the difference between collapsing rows (`GROUP BY`) and enriching rows (window functions).
- The safe update task ingrains the discipline of verify → modify → verify, which protects real databases from irreversible mistakes.

## Common Mistakes

- **Forgetting to mark PKs and FKs on the ERD.** An ERD without keys is just a picture of boxes. The keys are what make it a database diagram.
- **Using `WHERE` instead of `HAVING` for aggregate conditions.** `WHERE` filters rows before aggregation; `HAVING` filters groups after.
- **Averaging averages.** If you average category averages without weighting, a quiz average of 95 counts the same as an exam average of 95 — even if exams are worth twice as much. Always multiply by weight before summing.
- **Committing before verifying.** Never run `COMMIT` until your verification `SELECT` confirms the `UPDATE` or `DELETE` affected exactly the rows you intended.
- **Confusing `RANK()` and `ROW_NUMBER()`.** `RANK()` gives ties the same number and leaves gaps. `ROW_NUMBER()` assigns a unique number even for ties. Know which one your report needs.
- **Forgetting `LEFT JOIN` in the view.** `INNER JOIN` drops students with no grades or no attendance. Use `LEFT JOIN` so every student appears in the dashboard.

## Submit or Save

Save the following for submission:

1. **Lucidchart ERD** — exported as PNG or PDF, named `ch10-gdb-erd-YourName.png`
2. **SQL script** — a single `.sql` file containing all five queries (diagnostic, CTE pipeline, view creation, window function, transaction), named `ch10-advanced-sql-YourName.sql`
3. **Screenshot** — of your `StudentPerformanceDashboard` view output showing all students

The companion **Lab 10 — Advanced SQL for Business Analysis** transfers these skills to the PetVax veterinary clinic database. That is where your graded submission lives.

## Peek Ahead — Chapter 11

Chapter 11 shifts from querying and analyzing data to managing the database itself. You will learn about administration, security, backup, indexing, and governance — the practices that keep a production database reliable, fast, and safe. The queries you wrote here become part of a larger system that someone has to protect and maintain.


<!-- =================================================================== -->
<!-- COMPONENT: review-questions.md -->
<!-- =================================================================== -->

````````````
===== Review Questions (review-questions.md) =====
````````````

# Chapter 10: Review and Reflection

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-revie-resized" alt="Review and Reflection section icon" width="220">
</p>

*Use these questions to move from reading about advanced SQL to thinking with it — as a diagnostic tool, an analytical language, and a decision-support system.*

# Review Questions

*These questions help you recall and explain the key concepts, patterns, and techniques from Chapter 10.*

**1. What is the difference between basic SQL and advanced SQL as described in this chapter?**

**2. What are the three relational pathways in the Grading Database, and why does knowing them matter before writing a query?**

**3. What diagnostic questions can SQL answer about a flat table before any analysis begins? Name at least three and the SQL pattern used to answer each.**

**4. How do you extract entities from a flat table using SQL? Walk through the extraction of a STUDENT table and a DELIVERABLE table from GRADE_FLAT.**

**5. What is the `CROSS JOIN` + `LEFT JOIN` + `IS NULL` pattern, and why is it necessary for finding missing grades — as opposed to simply querying the STUDENT_GRADE table?**

**6. What is the difference between `WHERE` and `HAVING`, and why does it matter when writing queries with both row-level filters and aggregate conditions?**

**7. What is a CTE, and how does the three-CTE pipeline in the at-risk student report (§10.12) use CTEs to break a complex problem into readable stages?**

**8. How do window functions differ from ordinary aggregation with `GROUP BY`? Give an example where a window function is the right choice.**

# Reflection Questions

*These questions ask you to interpret, compare, and apply the chapter's ideas to broader analytical and business contexts.*

**1. The chapter argues that "advanced SQL is not about making queries complicated — it is about making data work reliable, explainable, and useful for decisions." Do you agree? Support your answer with a specific example from the chapter.**

**2. The `CROSS JOIN` + `LEFT JOIN` + `IS NULL` pattern finds what is missing by first generating what should exist. In what business situations outside of grading would this pattern be valuable? Describe two.**

**3. Compare a view and a CTE as tools for reusable query logic. When would you choose one over the other for a reporting task?**

**4. The chapter presents SQL as both a diagnostic tool and a refactoring tool — it can find data problems and then fix them by restructuring tables. In a real organization, who should be responsible for running diagnostic queries and driving normalization — the database administrator, the analyst, or both? Explain your reasoning.**

**5. The weighted-grade calculation stores grading policy in a table rather than hard-coding weights in formulas. What are the risks of hard-coding business rules inside queries or spreadsheets? Describe a scenario where a policy-table approach prevents a costly error.**

**6. Window functions add analytical power without collapsing detail rows. How might a retail manager use `RANK()` and `AVG() OVER` to understand store performance while still seeing individual transaction data?**

**7. The safe `UPDATE` workflow uses verify → modify → verify wrapped in a transaction. Why is this discipline especially important in a business database where multiple people rely on the data for daily decisions?**

# Personal Reflection Questions

*These questions invite you to connect the chapter's ideas to your own skills, habits, and professional development.*

**1. Before this chapter, when you worked with data in a spreadsheet or database, how often did you check for data quality problems before building summaries or charts? How will your approach change after learning diagnostic SQL?**

**2. The chapter describes the shift from "one query, one answer" thinking to "query as part of a workflow" thinking. Where in your own work or study habits do you currently think one-step-at-a-time, and where could a pipeline mindset improve your results?**

**3. Writing a CTE pipeline forces you to name each stage and make your logic readable to others — including your future self. Think of a project or analysis you have done where the steps were unclear when you returned to it later. How would CTEs have helped?**

**4. Which of the advanced SQL patterns in this chapter — diagnostic queries, CTEs, window functions, views, or safe updates — feels most useful for the kind of work you want to do after this course? Why?**

**5. The chapter emphasizes that SQL logic is portable across platforms even when function names differ. How comfortable are you with the idea of learning a concept in one tool and applying it in another? What skills or habits would help you become more platform-adaptable?**

**6. The at-risk student report chains multiple techniques into one decision-support pipeline. If you were building a similar report for a manager in a field you care about — healthcare, retail, sports, finance — what would the pipeline measure, and what would the risk categories be?**

**7. Look back at your Let's Build 10 work and your Lab 10 PetVax ERD. What was the hardest concept to transfer from the Grading Database to PetVax, and what did that difficulty teach you about the difference between following examples and truly understanding a technique?**

---

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Answer Key

## Review Questions

**Question 1: What is the difference between basic SQL and advanced SQL as described in this chapter?**

**Suggested Answer:** Basic SQL retrieves data — it answers one question with one query. Advanced SQL uses the same core syntax (`SELECT`, `FROM`, `WHERE`, `JOIN`, `GROUP BY`) but in more deliberate combinations to build reliable analytical workflows. The shift is from asking isolated questions to designing systems that diagnose data quality, connect normalized tables, compute meaningful metrics, and produce reusable, auditable reports. The chapter frames it as moving from "What syntax do I need?" to "What decision does this query support?"

**Question 2: What are the three relational pathways in the Grading Database, and why does knowing them matter before writing a query?**

**Suggested Answer:** The three pathways are: (1) Student Performance — `STUDENT → STUDENT_GRADE → DELIVERABLE → ASSIGNMENT_TYPE`; (2) Attendance — `STUDENT → ATTENDANCE → SCHEDULE`; (3) Grade Interpretation — `STUDENT_GRADE → GRADE_SCALE`. Knowing these pathways matters because they form a mental map of the database. Before writing a query, you can identify which pathway carries the data you need, which tables to join, and in what order. This makes query design faster and reduces errors.

**Question 3: What diagnostic questions can SQL answer about a flat table before any analysis begins? Name at least three and the SQL pattern used to answer each.**

**Suggested Answer:** (1) Detecting repeated data — `GROUP BY` on identity columns with `HAVING COUNT(*) > 1` reveals how many times each entity's details are duplicated. (2) Detecting conflicting values — `GROUP BY` with `HAVING COUNT(DISTINCT column) > 1` reveals inconsistent copies of the same fact (e.g., two different emails for the same student). (3) Detecting scores outside a valid range — `WHERE Score < 0 OR Score > 100` finds invalid numeric data. (4) Detecting orphaned records — `LEFT JOIN … WHERE parent_key IS NULL` finds child rows with no matching parent. (5) Detecting duplicate grade records — `GROUP BY StudentID, DeliverableID HAVING COUNT(*) > 1` finds multiple scores for the same student-deliverable pair.

**Question 4: How do you extract entities from a flat table using SQL? Walk through the extraction of a STUDENT table and a DELIVERABLE table from GRADE_FLAT.**

**Suggested Answer:** Entity extraction uses `SELECT DISTINCT` or `GROUP BY` to isolate unique rows. For STUDENT: `SELECT DISTINCT StudentID, FirstName, LastName, Email FROM GRADE_FLAT` returns each student exactly once, regardless of how many grades they have. For DELIVERABLE: `SELECT Type, DeliverableNumber, MIN(DueDate) AS DueDate, MIN(Topic) AS Topic FROM GRADE_FLAT GROUP BY Type, DeliverableNumber` collects unique deliverable definitions. `MIN()` is used for columns not in the `GROUP BY` clause to handle potential conflicts. The extracted entities are then used to create normalized tables via `CREATE TABLE AS SELECT` or populated via `INSERT INTO … SELECT`.

**Question 5: What is the `CROSS JOIN` + `LEFT JOIN` + `IS NULL` pattern, and why is it necessary for finding missing grades — as opposed to simply querying the STUDENT_GRADE table?**

**Suggested Answer:** The pattern works in three steps: (1) `CROSS JOIN` between `STUDENT` and `DELIVERABLE` generates every expected student-deliverable pair — the complete set of what *should* exist. (2) `LEFT JOIN` to `STUDENT_GRADE` checks which pairs actually have a grade record. (3) `WHERE sg.GradeID IS NULL` keeps only the pairs with no match — the missing grades. Simply querying `STUDENT_GRADE` cannot find missing grades because missing rows are, by definition, absent from that table. You must first generate the expected list to detect what is not there.

**Question 6: What is the difference between `WHERE` and `HAVING`, and why does it matter when writing queries with both row-level filters and aggregate conditions?**

**Suggested Answer:** `WHERE` filters individual rows *before* aggregation occurs. `HAVING` filters groups *after* aggregation. This order matters: you cannot use `WHERE AVG(Score) < 75` because `AVG()` has not been computed yet at the row-filtering stage. The correct pattern is `GROUP BY … HAVING AVG(Score) < 75`. A query can use both — for example, `WHERE Score IS NOT NULL` to exclude NULL scores from the average calculation, then `HAVING AVG(Score) < 75` to keep only the low-performing groups.

**Question 7: What is a CTE, and how does the three-CTE pipeline in the at-risk student report (§10.12) use CTEs to break a complex problem into readable stages?**

**Suggested Answer:** A Common Table Expression (CTE) is a named, temporary result set defined with `WITH` that exists for the duration of a single query. The at-risk report uses three CTEs: `MissingGrades` counts expected student-deliverable pairs with no grade; `ScoreAverages` calculates each student's average score; `AttendanceRates` calculates each student's attendance percentage. The final `SELECT` joins these three CTEs together and applies `CASE` logic to label each student as High Risk, Needs Attention, or On Track. Each CTE solves one sub-problem, making the overall query readable in stages rather than one dense block of nested logic.

**Question 8: How do window functions differ from ordinary aggregation with `GROUP BY`? Give an example where a window function is the right choice.**

**Suggested Answer:** `GROUP BY` collapses multiple rows into one summary row per group — you lose the detail rows. Window functions compute summaries *alongside* the detail rows without collapsing them. For example, `AVG(Score) OVER (PARTITION BY StudentID)` adds each student's average as a new column next to every individual grade row. A window function is the right choice when you need both the detail and the summary visible together — such as showing each individual quiz score next to the student's running quiz average, or ranking students by average while still listing every grade they earned.

## Reflection Questions

**Question 1: The chapter argues that "advanced SQL is not about making queries complicated — it is about making data work reliable, explainable, and useful for decisions." Do you agree? Support your answer with a specific example from the chapter.**

**Suggested Answer:** I agree. The at-risk student report (§10.12) is a strong example. It does not use obscure syntax or clever single-line tricks. It uses three clearly named CTEs — MissingGrades, ScoreAverages, AttendanceRates — each solving one well-defined sub-problem. The final query joins them and labels students by risk category. The result is not a complicated query; it is a readable pipeline that an instructor or administrator could audit step by step. The complexity is in the problem (multiple data sources, multiple metrics, conditional labeling), not in the SQL. The solution makes the data work reliable because each CTE can be verified independently, explainable because the stages are named and ordered logically, and useful because it directly answers a managerial question: which students need support?

**Question 2: The `CROSS JOIN` + `LEFT JOIN` + `IS NULL` pattern finds what is missing by first generating what should exist. In what business situations outside of grading would this pattern be valuable? Describe two.**

**Suggested Answer:** (1) Inventory management — `PRODUCT CROSS JOIN WAREHOUSE` generates every product-warehouse combination that should exist if every product were stocked everywhere. `LEFT JOIN` to `INVENTORY` and filtering for `IS NULL` reveals which products are out of stock at which warehouses. (2) Subscription services — `CUSTOMER CROSS JOIN SERVICE_PLAN` generates every customer-plan combination. `LEFT JOIN` to `SUBSCRIPTION` and filtering for `IS NULL` identifies customers who have not subscribed to a plan they might benefit from — a cross-sell opportunity. In both cases, the missing rows are invisible unless you first generate the expected set.

**Question 3: Compare a view and a CTE as tools for reusable query logic. When would you choose one over the other for a reporting task?**

**Suggested Answer:** A view is persistent — it is saved in the database and can be queried repeatedly by multiple users, reports, and tools. A CTE is temporary — it exists only within a single query. Choose a view when the same logic will be used across multiple reports or by multiple people (e.g., a `StudentPerformanceDashboard` that instructors query daily). Choose a CTE when the logic is specific to one analytical pipeline and benefits from being defined close to where it is used (e.g., the `MissingGrades` CTE that only makes sense inside the at-risk report). Views create reusable infrastructure; CTEs create readable, self-contained query logic.

**Question 4: The chapter presents SQL as both a diagnostic tool and a refactoring tool — it can find data problems and then fix them by restructuring tables. In a real organization, who should be responsible for running diagnostic queries and driving normalization — the database administrator, the analyst, or both? Explain your reasoning.**

**Suggested Answer:** Both, but with different roles. Analysts are often the first to encounter data quality problems because they are the ones building reports and noticing inconsistencies. They should run diagnostic queries as a standard first step before any analysis — the chapter's "diagnose before you analyze" principle. The DBA is responsible for the structural fix: creating normalized tables, adding constraints, and managing the migration. However, the analyst should be able to write the extraction and migration queries because they understand the data's meaning and can verify correctness. The ideal workflow is collaborative: the analyst diagnoses and proposes the restructuring; the DBA reviews, hardens, and deploys it. This division respects both the analyst's domain knowledge and the DBA's responsibility for production integrity.

**Question 5: The weighted-grade calculation stores grading policy in a table rather than hard-coding weights in formulas. What are the risks of hard-coding business rules inside queries or spreadsheets? Describe a scenario where a policy-table approach prevents a costly error.**

**Suggested Answer:** Hard-coding business rules scatters logic across multiple places — every query, spreadsheet, and report that uses the rule must be updated individually when the rule changes. This creates maintenance burden and inconsistency risk. Scenario: A university changes its grading weights from Quiz=20%, Exam=40%, Project=40% to Quiz=15%, Exam=35%, Project=50%. With hard-coded weights, someone must find and update every query and spreadsheet that calculates final grades — missing one produces conflicting grade reports. With a policy table, one `UPDATE GRADE_WEIGHT SET CategoryWeight = 0.35 WHERE Type = 'Exam'` changes the rule for every query that joins to the table. The policy-table approach makes the rule visible, auditable, and changeable in one place.

**Question 6: Window functions add analytical power without collapsing detail rows. How might a retail manager use `RANK()` and `AVG() OVER` to understand store performance while still seeing individual transaction data?**

**Suggested Answer:** A retail manager could write a query that shows every transaction with three window-function columns: `AVG(SaleAmount) OVER (PARTITION BY StoreID)` to show each store's average sale next to every transaction, `RANK() OVER (ORDER BY AVG(SaleAmount) OVER (PARTITION BY StoreID) DESC)` to rank stores by average sale amount, and `SUM(SaleAmount) OVER (PARTITION BY StoreID ORDER BY TransactionDate ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)` for a running revenue total per store. The manager sees individual transactions (which items sold, at what time, by which cashier) alongside store-level performance context — without losing the detail that explains *why* a store ranks high or low.

**Question 7: The safe `UPDATE` workflow uses verify → modify → verify wrapped in a transaction. Why is this discipline especially important in a business database where multiple people rely on the data for daily decisions?**

**Suggested Answer:** In a business database, a mistaken `UPDATE` or `DELETE` has immediate downstream consequences — incorrect financial reports, wrong customer communications, flawed inventory orders. Unlike a personal spreadsheet where errors affect only you, a production database error can ripple through departments. The verify → modify → verify pattern ensures you see exactly which rows will change before changing them, and confirms the change affected only the intended rows. Wrapping it in a transaction adds a safety net: if the post-modification verification reveals a problem, `ROLLBACK` undoes everything instantly. Without this discipline, one missing `WHERE` clause could update every customer's email or delete every order — and in many systems, there is no undo.

## Personal Reflection Questions

**Question 1: Before this chapter, when you worked with data in a spreadsheet or database, how often did you check for data quality problems before building summaries or charts? How will your approach change after learning diagnostic SQL?**

**Suggested Answer:** [Model response] Before this chapter, I typically trusted the data as-is and jumped straight to analysis. I might have noticed an obviously wrong number, but I never systematically checked for duplicates, conflicting values, or orphaned records. After this chapter, I plan to make diagnostic queries a standard first step — at minimum checking for NULLs in key columns, duplicate rows, and values outside expected ranges. The chapter's point that "if SQL can detect inconsistency, your design is already too permissive" changed how I think about data: the absence of error messages does not mean the data is clean.

**Question 2: The chapter describes the shift from "one query, one answer" thinking to "query as part of a workflow" thinking. Where in your own work or study habits do you currently think one-step-at-a-time, and where could a pipeline mindset improve your results?**

**Suggested Answer:** [Model response] In course projects, I often write a single query or formula to answer an immediate question, then copy-paste the result somewhere else and start over for the next question. A pipeline mindset would mean building one reusable query, saving it as a view or CTE chain, and letting downstream questions build on it. For example, instead of recalculating student averages three different ways for three different assignments, I could define the average once and reference it. The pipeline approach saves time and reduces the chance that different versions of "the same number" disagree.

**Question 3: Writing a CTE pipeline forces you to name each stage and make your logic readable to others — including your future self. Think of a project or analysis you have done where the steps were unclear when you returned to it later. How would CTEs have helped?**

**Suggested Answer:** [Model response] Last semester I built a multi-step spreadsheet analysis with several intermediate calculation columns. When I reopened it weeks later, I could not remember what each column represented or why certain formulas referenced certain cells. If I had built the same logic with named CTEs — `MonthlyRevenue`, `YearOverYearGrowth`, `TopPerformers` — each stage would have a clear label and a defined purpose. CTEs force you to name your thinking steps, which serves as built-in documentation that your future self (or a colleague) can read sequentially.

**Question 4: Which of the advanced SQL patterns in this chapter — diagnostic queries, CTEs, window functions, views, or safe updates — feels most useful for the kind of work you want to do after this course? Why?**

**Suggested Answer:** [Model response] (Answers will vary by student; this is a plausible model.) Window functions feel most useful for my interest in business analytics. The ability to rank, compare, and compute running totals without losing detail is exactly what dashboards and performance reports need. I can see myself using `RANK()` to compare regional sales performance and `AVG() OVER` to show individual transactions against store averages. The chapter made me realize that `GROUP BY` was giving me summaries at the cost of hiding the story behind the numbers — window functions give me both.

**Question 5: The chapter emphasizes that SQL logic is portable across platforms even when function names differ. How comfortable are you with the idea of learning a concept in one tool and applying it in another? What skills or habits would help you become more platform-adaptable?**

**Suggested Answer:** [Model response] I am moderately comfortable — I can usually figure out the equivalent function in a new tool, but it takes time and Google searches. The chapter's comparison tables (Access vs. SQLite vs. PostgreSQL) were helpful because they showed that the *concept* is the same even when the *name* differs — `Nz()` and `COALESCE()` do the same thing, just in different dialects. To become more platform-adaptable, I should focus on understanding what a function *does* conceptually before memorizing its name, keep a personal cross-reference of common function equivalents, and practice the same query in at least two platforms when learning a new technique.

**Question 6: The at-risk student report chains multiple techniques into one decision-support pipeline. If you were building a similar report for a manager in a field you care about — healthcare, retail, sports, finance — what would the pipeline measure, and what would the risk categories be?**

**Suggested Answer:** [Model response] (Answers will vary; this is a plausible model.) In healthcare, I would build a patient readmission risk pipeline. CTE 1 — `RecentDischarges`: patients discharged in the last 30 days. CTE 2 — `FollowUpGaps`: patients with no scheduled follow-up appointment within 14 days. CTE 3 — `ConditionRisk`: patients with chronic conditions (diabetes, heart disease) from their medical history. The final query would join these and label patients as High Risk (chronic condition + no follow-up), Needs Attention (one risk factor), or On Track (follow-up scheduled, no chronic flags). The report would help a hospital allocate care-coordinator resources to the patients most likely to be readmitted.

**Question 7: Look back at your Let's Build 10 work and your Lab 10 PetVax ERD. What was the hardest concept to transfer from the Grading Database to PetVax, and what did that difficulty teach you about the difference between following examples and truly understanding a technique?**

**Suggested Answer:** [Model response] (Answers will vary; this is a plausible model.) The hardest part was mapping the `CROSS JOIN` + `LEFT JOIN` pattern to PetVax. In the Grading Database, finding missing grades made intuitive sense because I understand what a "missing grade" means. In PetVax, I had to think harder about what "missing" means — missing treatments for a visit? missing payments? The expected set was less obvious. This taught me that following an example means you can reproduce it in the same domain; truly understanding a technique means you can identify where the pattern applies in a new domain with different entities and business questions. The latter requires understanding the *problem structure* (what should exist vs. what does exist), not just the SQL syntax.


<!-- =================================================================== -->
<!-- COMPONENT: terms-treasury.md -->
<!-- =================================================================== -->

````````````
===== Terms Treasury (terms-treasury.md) =====
````````````

# Chapter 10 Term Treasury — Advanced SQL for Business Analysis

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-terms-sizedmin" alt="Terms Treasury section icon" width="220">
</p>

<p align="center">

<!-- Companion: Key terms and definitions — 2026-06-16 -->

| Term / Concept | Definition | Business Significance | Examples |
|---|---|---|---|
| **Advanced SQL** | The deliberate use of core SQL patterns — joins, aggregation, conditional logic, window functions, CTEs, and views — to build reliable analytical workflows, not just retrieve rows. | Transforms SQL from a lookup tool into a decision-support language that produces trustworthy reports, KPIs, and risk assessments for managers. | The at-risk student report in §10.12 that chains three CTEs to combine missing grades, score averages, and attendance rates into one actionable output. |
| **CASE Expression** | SQL conditional logic that evaluates conditions in order and returns the first matching result. Used to classify, label, and transform values inside queries. | Translates raw numbers into business categories — letter grades, risk flags, performance bands — that managers and instructors can act on. | `CASE WHEN AVG(Score) >= 90 THEN 'High Performance' WHEN AVG(Score) >= 80 THEN 'On Track' … END AS PerformanceBand` |
| **COALESCE** | A function that returns the first non-NULL value from a list of arguments, replacing missing data with meaningful defaults. | Prevents NULL values from breaking calculations, misleading averages, or displaying blank cells in reports. Essential for clean, interpretable output. | `COALESCE(sa.AverageScore, 0)` — treats students with no grades as having a 0 average rather than a NULL that would hide them from reports. |
| **Common Table Expression (CTE)** | A named, temporary result set defined with `WITH` that exists for the duration of a single query. Breaks complex logic into readable, named stages. | Makes multi-step analytical queries auditable and maintainable. A manager reviewing an at-risk report can read each CTE stage like a paragraph in an argument. | `WITH MissingGrades AS (…), ScoreAverages AS (…), AttendanceRates AS (…)` — the at-risk report in §10.12 chains three CTEs. |
| **Conditional Aggregation** | Using `CASE` inside an aggregate function (`COUNT`, `SUM`) to count or sum only the rows that meet a condition. | Enables a single query to produce side-by-side comparisons — pass rates vs. fail rates, attended vs. missed — without multiple separate queries. | `COUNT(CASE WHEN Score >= 70 THEN 1 END) AS PassingCount` counts only passing scores in one column. |
| **CREATE TABLE AS SELECT (CTAS)** | A statement that creates a new table and populates it from query results in one step. Used for entity extraction during SQL-driven normalization. | Allows analysts to restructure messy flat data into clean normalized tables without switching tools or losing data — a practical engineering skill. | `CREATE TABLE STUDENT AS SELECT DISTINCT StudentID, FirstName, LastName, Email FROM GRADE_FLAT;` |
| **CROSS JOIN + LEFT JOIN Pattern** | A two-step join pattern: `CROSS JOIN` generates every expected combination of rows, then `LEFT JOIN … WHERE … IS NULL` keeps only the combinations with no match. | The only reliable way to find what is missing — unsubmitted work, unattended classes, unassigned vets — because missing rows leave no trace in a single table. | `STUDENT CROSS JOIN DELIVERABLE LEFT JOIN STUDENT_GRADE … WHERE GradeID IS NULL` returns every student-deliverable pair with no grade. |
| **Data Anomaly** | A data integrity problem — update, insertion, or deletion — caused by storing redundant data in a flat table rather than a normalized design. | Anomalies damage trust in reports, increase maintenance labor, and weaken decisions. SQL diagnostic queries detect them before they cause business harm. | An update anomaly: correcting Alice's email in 3 of 6 rows leaves 3 inconsistent copies. An insertion anomaly: you cannot add a new student until they receive a grade. |
| **Data Migration (INSERT INTO … SELECT)** | Populating an existing table with rows produced by a query. The primary tool for moving data from flat tables into normalized structures. | Enables controlled, verifiable restructuring of inherited data without manual re-entry. Each migration step can be validated before proceeding. | `INSERT INTO STUDENT (StudentID, FirstName, LastName, Email) SELECT DISTINCT StudentID, FirstName, LastName, Email FROM GRADE_FLAT;` |
| **Diagnostic Query** | A SQL query that detects data quality problems — duplication, conflicting values, invalid ranges, orphaned records — before analysis begins. | Prevents "garbage in, garbage out." A five-minute diagnostic scan can save hours of investigating misleading reports built on bad data. | `SELECT StudentID, COUNT(DISTINCT Email) AS EmailVersions … HAVING COUNT(DISTINCT Email) > 1` reveals students with conflicting contact information. |
| **Entity Extraction** | Using `SELECT DISTINCT` or `GROUP BY` to isolate the unique rows that belong in a separate table — students, deliverables, or any distinct real-world object hidden inside a flat table. | The first practical step in transforming an inherited flat file into a proper relational database. Turns diagnosis into action. | `SELECT DISTINCT StudentID, FirstName, LastName, Email FROM GRADE_FLAT` extracts the student entity from a flat grade table. |
| **Flat Table** | A single table that stores everything — student details, deliverable definitions, and scores — in one place, with values repeated across many rows. | The most common real-world data problem. Flat tables feel convenient but create redundancy, anomalies, and maintenance nightmares at scale. | A `GRADE_FLAT` table where Alice's name and email appear in six rows, once per grade — six copies of the same facts waiting to conflict. |
| **Policy Table** | A database table that stores business rules — such as grade weights, letter-grade thresholds, or discount rates — so that calculations reference stored policy rather than hard-coded formulas. | Makes business logic visible, auditable, and changeable in one place. When grading weights change, you update one row, not every query and spreadsheet. | `GRADE_SCALE(LetterGrade, MinScore, MaxScore)` — joining to this table converts numeric grades to letters using stored rules, not scattered `CASE` expressions. |
| **Relational Spine** | The central join pathway through a normalized database that connects the most important entities for reporting — in the Grading Database, `STUDENT → STUDENT_GRADE → DELIVERABLE`. | Provides a mental map of the database. Most analytical queries travel along the spine; knowing it makes query design faster and more reliable. | The student performance pathway: `STUDENT → STUDENT_GRADE → DELIVERABLE → ASSIGNMENT_TYPE`. |
| **Scalar Subquery** | A subquery that returns exactly one value — one row, one column — and can be used like a constant in a `SELECT` list or `WHERE` clause. | Enables row-by-row comparisons against a computed baseline — above average, below target, higher than last month — inside a single query. | `WHERE Score > (SELECT AVG(Score) FROM STUDENT_GRADE)` returns every score above the overall class average. |
| **Transaction** | A group of SQL operations wrapped in `BEGIN` / `COMMIT` (or `ROLLBACK`) that executes as a single atomic unit — all succeed or none do. | Protects data from partial updates. If a discount curve or grade change goes wrong, `ROLLBACK` undoes it completely. Essential discipline for anyone who modifies production data. | `BEGIN TRANSACTION; UPDATE STUDENT_GRADE SET Score = …; -- verify; COMMIT;` — the safe update workflow in §10.11. |
| **View** | A named, saved query that behaves like a virtual table. Views store logic, not data, and re-execute against current data each time they are queried. | Creates reusable reporting infrastructure. A dashboard view defined once can be queried by multiple users, tools, and reports without rewriting logic. | `CREATE VIEW StudentPerformanceSummary AS SELECT …` — query it anytime with `SELECT * FROM StudentPerformanceSummary WHERE Status = 'At Risk';` |
| **Window Function** | An analytical function (`RANK`, `ROW_NUMBER`, `AVG OVER`, `SUM OVER`) that computes values across a set of rows without collapsing them into groups. Uses `OVER()` with optional `PARTITION BY` and `ORDER BY`. | Preserves detail while adding context — a student's individual score can appear next to their average and class rank. Enables rankings, running totals, and moving averages without losing row-level visibility. | `RANK() OVER (ORDER BY AverageScore DESC) AS ClassRank` — each student keeps their detail row and gains a rank. |

# Acronyms and Abbreviations

| Abbreviation | Full Form | Brief Meaning | Where It Appears |
|---|---|---|---|
| **CTAS** | CREATE TABLE AS SELECT | A statement that creates and populates a table from query results in one step. | §10.3.5 — entity extraction and normalization workflow |
| **CTE** | Common Table Expression | A named temporary query defined with `WITH`, used to break complex logic into readable stages. | Throughout §10.8, §10.10, and §10.12 |
| **FK** | Foreign Key | A column referencing the primary key of another table, enforcing referential integrity. | §10.2 schema refresher; §10.3.6 constraint addition |
| **PK** | Primary Key | A column or combination of columns that uniquely identifies each row. | §10.2 schema refresher; §10.3.6 constraint addition |


<!-- =================================================================== -->
<!-- COMPONENT: rat.md -->
<!-- =================================================================== -->

````````````
===== RAT: Reading Test (rat.md) =====
````````````

# Readiness Assessment Test (RAT): Advanced SQL for Business Analysis

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/RAT_nqr5a3?_a=BAMAAAX00" alt="RAT or Quiz section icon" width="220">
</p>
<p align="center">

## Assessment Design Notes

This RAT checks whether students completed the Chapter 10 reading and can reason with advanced SQL concepts — diagnostic queries, SQL-driven normalization, CTEs, window functions, views, safe data modification, and decision-support pipelines — before class discussion. Questions are grounded in the Grading Database schema, chapter SQL examples, and business analysis scenarios.

### Bloom Distribution

| Bloom Level | Required Count | Intent |
| ----------- | -------------- | ------ |
| Remember    | 8              | Foundational vocabulary, schema facts, and core SQL pattern names |
| Understand  | 8              | Explain why patterns matter, interpret query behavior, connect concepts to purpose |
| Apply       | 8              | Identify correct SQL syntax, choose the right pattern for a given task |
| Analyze     | 8              | Compare alternatives, diagnose query problems, trace multi-stage logic |
| Evaluate    | 8              | Judge design quality, choose the best approach under constraints |

### Design Criterion Coverage

| Design Criterion  | Bloom Sections Used | Questions | Count |
| ----------------- | ------------------- | --------- | ----- |
| Application-based | Apply, Analyze      | 17-32     | 16    |
| Scenario-based    | Understand, Evaluate | 9-16, 33-40 | 16    |
| Definition-only   | Remember            | 1-8       | 8     |

### AI-Resistance Strategies Used

1. **Chapter-specific reasoning** — questions reference exact GDB tables, columns, and SQL patterns from §10.2–10.12.
2. **Schema-specific context** — multiple questions require knowing the seven-table GDB schema and relational pathways.
3. **Scenario stems with embedded traps** — distractors use real SQL vocabulary in subtly incorrect ways.
4. **Multi-answer options requiring discrimination** — Select ALL questions demand fine-grained knowledge of what a pattern does and does not do.
5. **Distractors drawn from adjacent concepts** — wrong answers use terms from normalization, joins, and aggregation that are correct in other contexts.
6. **Non-obvious correct answers paraphrased** — correct choices are reworded from chapter prose, not keyword-matched.
7. **Output prediction from concrete data** — several questions ask students to predict what a query returns or how a pipeline behaves.
8. **Stage-progression reasoning** — questions trace the CTE pipeline stages and normalization workflow in order.
9. **Platform-specific details** — questions cover Access vs. SQLite vs. PostgreSQL function differences from §10.5 and §10.7.

---

## Remember Questions

**1. What is the defining characteristic of advanced SQL as described in Chapter 10?**

A. Using more than three tables in a single query
B. Writing queries that use every SQL keyword
C. Using core SQL patterns in deliberate combinations to build reliable analytical workflows
D. Writing SQL that runs on multiple database platforms simultaneously

**2. How many tables are in the Grading Database schema used throughout Chapter 10?**

A. 5
B. 6
C. 7
D. 8

**3. Which of the following is NOT one of the three relational pathways identified in the Grading Database refresher?**

A. Student Performance: STUDENT → STUDENT_GRADE → DELIVERABLE → ASSIGNMENT_TYPE
B. Attendance: STUDENT → ATTENDANCE → SCHEDULE
C. Grade Interpretation: STUDENT_GRADE → GRADE_SCALE
D. Course Planning: SCHEDULE → DELIVERABLE → STUDENT

**4. What does the acronym CTE stand for in SQL?**

A. Calculated Table Expression
B. Common Table Expression
C. Composite Table Extension
D. Conditional Transaction Element

**5. A window function differs from GROUP BY aggregation in what fundamental way?**

A. Window functions are faster than GROUP BY
B. Window functions can only be used with numeric columns
C. Window functions compute summaries without collapsing detail rows
D. Window functions require a separate CREATE statement

**6. What does the COALESCE function do in SQL?**

A. Combines two tables into one
B. Returns the first non-NULL value from a list of arguments
C. Converts a string to uppercase
D. Rounds a numeric value to the nearest integer

**7. What does a CROSS JOIN between STUDENT (5 rows) and DELIVERABLE (6 rows) produce?**

A. 5 rows — one per student
B. 6 rows — one per deliverable
C. 11 rows — the sum of both tables
D. 30 rows — every combination of student and deliverable

**8. Which SQL commands are used to control a transaction?**

A. START and STOP
B. BEGIN, COMMIT, and ROLLBACK
C. OPEN, CLOSE, and SAVE
D. CREATE, ALTER, and DROP

## Understand Questions

**9. Why is the CROSS JOIN + LEFT JOIN + IS NULL pattern necessary for finding missing grades?**

A. Because STUDENT_GRADE does not contain student names
B. Because missing rows are absent from STUDENT_GRADE — you must first generate the expected set to detect what is not there
C. Because CROSS JOIN is faster than INNER JOIN for large tables
D. Because LEFT JOIN automatically filters NULL values

**10. Why can you NOT write `WHERE AVG(Score) < 75` in a SQL query?**

A. Because AVG is not a valid SQL function
B. Because WHERE clauses cannot contain numbers
C. Because WHERE filters individual rows before aggregation occurs, and AVG has not been computed yet at that stage
D. Because AVG can only be used in the SELECT clause

**11. According to Chapter 10, why is storing grading weights in a policy table better than hard-coding them in formulas?**

A. Policy tables use less storage space
B. Hard-coded formulas run slower on large datasets
C. Policy tables make rules visible, auditable, and changeable in one place — updating one row changes every query that references the table
D. Hard-coded formulas cannot use decimal values

**12. What is the difference between RANK() and ROW_NUMBER() as described in §10.9?**

A. RANK() works only with numeric columns; ROW_NUMBER() works with any data type
B. RANK() assigns equal rank to ties and leaves gaps; ROW_NUMBER() assigns a unique sequential number even for ties
C. RANK() requires a PARTITION BY clause; ROW_NUMBER() does not
D. RANK() is used with GROUP BY; ROW_NUMBER() is used with ORDER BY

**13. Why does Chapter 10 emphasize running diagnostic queries before building reports?**

A. Diagnostic queries are required by most database platforms
B. Diagnostic queries reveal data quality problems — duplication, conflicts, invalid values — that would make reports misleading
C. Diagnostic queries run faster and warm up the database cache
D. Diagnostic queries are the only way to create new tables

**14. What is the key difference between a view and a CTE in terms of persistence?**

A. A view is saved in the database and can be queried repeatedly; a CTE exists only within a single query
B. A CTE is saved permanently; a view is temporary
C. Views can only contain SELECT statements; CTEs can contain INSERT and UPDATE
D. There is no difference — view and CTE are two names for the same thing

**15. Why does the safe UPDATE workflow in §10.11 use verify → modify → verify?**

A. Because SQL requires three statements for every UPDATE
B. To confirm exactly which rows will change before changing them, and to confirm the change affected only the intended rows after
C. Because the database automatically rolls back if you skip the verification step
D. To satisfy the requirements of the ACID properties

**16. According to the chapter, when should you use a window function instead of GROUP BY?**

A. When you need to delete rows after aggregation
B. When you need one summary row per group
C. When you need to keep detail rows visible while adding summary values like averages or ranks alongside them
D. When the table has fewer than 100 rows

## Apply Questions

**17. Which SQL query correctly detects duplicate grade records — the same student with more than one score for the same deliverable?**

A. `SELECT * FROM STUDENT_GRADE WHERE Score = Score;`
B. `SELECT StudentID, DeliverableID, COUNT(*) FROM STUDENT_GRADE GROUP BY StudentID HAVING COUNT(*) > 1;`
C. `SELECT StudentID, DeliverableID, COUNT(*) AS DuplicateCount FROM STUDENT_GRADE GROUP BY StudentID, DeliverableID HAVING COUNT(*) > 1;`
D. `SELECT DISTINCT StudentID, DeliverableID FROM STUDENT_GRADE;`

**18. Which statement correctly uses CREATE TABLE AS SELECT to extract unique students from a flat GRADE_FLAT table?**

A. `CREATE TABLE STUDENT FROM (SELECT * FROM GRADE_FLAT);`
B. `CREATE TABLE STUDENT AS SELECT DISTINCT StudentID, FirstName, LastName, Email FROM GRADE_FLAT;`
C. `SELECT DISTINCT StudentID, FirstName, LastName, Email INTO STUDENT CREATE TABLE FROM GRADE_FLAT;`
D. `CREATE TABLE STUDENT SELECT UNIQUE StudentID, FirstName, LastName, Email FROM GRADE_FLAT;`

**19. You have a new empty DELIVERABLE table with columns defined. Which statement correctly populates it from GRADE_FLAT?**

A. `INSERT INTO DELIVERABLE VALUES (SELECT Type, DeliverableNumber, DueDate FROM GRADE_FLAT);`
B. `INSERT INTO DELIVERABLE (Type, DeliverableNumber, DueDate) SELECT DISTINCT Type, DeliverableNumber, DueDate FROM GRADE_FLAT;`
C. `COPY DELIVERABLE FROM GRADE_FLAT WHERE Type IS NOT NULL;`
D. `UPDATE DELIVERABLE SET Type, DeliverableNumber, DueDate = (SELECT Type, DeliverableNumber, DueDate FROM GRADE_FLAT);`

**20. Which query correctly finds all student-deliverable combinations that have NO recorded grade?**

A. `SELECT * FROM STUDENT_GRADE WHERE Score IS NULL;`
B. `SELECT s.StudentID, d.DeliverableID FROM STUDENT s JOIN DELIVERABLE d ON s.StudentID = d.DeliverableID WHERE Score IS NULL;`
C. `SELECT s.StudentID, d.DeliverableID FROM STUDENT s CROSS JOIN DELIVERABLE d LEFT JOIN STUDENT_GRADE sg ON s.StudentID = sg.StudentID AND d.DeliverableID = sg.DeliverableID WHERE sg.GradeID IS NULL;`
D. `SELECT s.StudentID, d.DeliverableID FROM STUDENT s FULL OUTER JOIN DELIVERABLE d ON s.StudentID = d.DeliverableID;`

**21. Which CASE expression correctly labels students as 'Pass' when their average score is 60 or above, and 'Fail' otherwise?**

A. `CASE WHEN AVG(Score) THEN 'Pass' ELSE 'Fail' END`
B. `CASE AVG(Score) >= 60 THEN 'Pass' ELSE 'Fail'`
C. `CASE WHEN AVG(Score) >= 60 THEN 'Pass' ELSE 'Fail' END`
D. `IF AVG(Score) >= 60 THEN 'Pass' ELSE 'Fail' END`

**22. Which query correctly uses HAVING to find students whose average score is below 75?**

A. `SELECT StudentID FROM STUDENT_GRADE WHERE AVG(Score) < 75 GROUP BY StudentID;`
B. `SELECT StudentID, AVG(Score) FROM STUDENT_GRADE GROUP BY StudentID HAVING AVG(Score) < 75;`
C. `SELECT StudentID FROM STUDENT_GRADE GROUP BY StudentID WHERE AVG(Score) < 75;`
D. `SELECT StudentID, AVG(Score) AS AvgScore FROM STUDENT_GRADE HAVING AvgScore < 75 GROUP BY StudentID;`

**23. Which query correctly uses a window function to show each student's average score next to every individual grade?**

A. `SELECT StudentID, Score, AVG(Score) AS StudentAvg FROM STUDENT_GRADE GROUP BY StudentID;`
B. `SELECT StudentID, Score, AVG(Score) OVER (PARTITION BY StudentID) AS StudentAvg FROM STUDENT_GRADE;`
C. `SELECT StudentID, Score, AVG(Score) OVER () AS StudentAvg FROM STUDENT_GRADE;`
D. `SELECT StudentID, Score, WINDOW AVG(Score) BY StudentID AS StudentAvg FROM STUDENT_GRADE;`

**24. Which transaction block correctly structures the safe update workflow for changing a student's email?**

A. `BEGIN; UPDATE STUDENT SET Email = 'new@email.com' WHERE StudentID = 101; COMMIT;`
B. `SELECT * FROM STUDENT WHERE StudentID = 101; BEGIN; UPDATE STUDENT SET Email = 'new@email.com' WHERE StudentID = 101; SELECT * FROM STUDENT WHERE StudentID = 101; COMMIT;`
C. `UPDATE STUDENT SET Email = 'new@email.com' WHERE StudentID = 101; ROLLBACK;`
D. `BEGIN; SELECT * FROM STUDENT; UPDATE STUDENT SET Email = 'new@email.com'; COMMIT;`

## Analyze Questions

**25. An instructor wants a report showing each student's individual quiz scores alongside that student's overall average and class rank. Which approach is most appropriate?**

A. GROUP BY StudentID with AVG and a subquery for rank
B. A window function with AVG() OVER (PARTITION BY StudentID) and RANK() OVER (ORDER BY AVG DESC)
C. Multiple separate queries combined with UNION
D. A CROSS JOIN between STUDENT and STUDENT_GRADE

**26. A query `SELECT StudentID, AVG(Score) FROM STUDENT_GRADE WHERE AVG(Score) < 70 GROUP BY StudentID` produces an error. What is the problem?**

A. STUDENT_GRADE does not have a Score column
B. AVG cannot be used with GROUP BY
C. WHERE cannot filter on aggregate functions — the condition AVG(Score) < 70 should be in a HAVING clause after GROUP BY
D. StudentID must be in the GROUP BY clause twice

**27. A reporting team needs a student performance summary that will be queried daily by five different dashboard tools. Which reusable structure is most appropriate?**

A. A CTE defined inside each dashboard query
B. A subquery copied into each tool's SQL
C. A view saved in the database that each tool can query with a simple SELECT
D. A one-time export to a spreadsheet

**28. You need to find which deliverables have NEVER been submitted by ANY student. Which join pattern should you use?**

A. INNER JOIN between DELIVERABLE and STUDENT_GRADE
B. LEFT JOIN from DELIVERABLE to STUDENT_GRADE, with WHERE sg.GradeID IS NULL
C. CROSS JOIN between STUDENT and DELIVERABLE
D. Self-join on DELIVERABLE

**29. A GRADE_FLAT table stores StudentID, FirstName, LastName, Email, Type, DeliverableNumber, DueDate, and Score all in one table. Alice's email appears in 6 different rows with two different values. This is an example of which kind of problem?**

A. An insertion anomaly — Alice cannot be added without a grade
B. A deletion anomaly — deleting Alice's grades would lose her contact information
C. An update anomaly — changing Alice's email in some rows but not others created conflicting copies
D. A normalization error — the table is in 3NF but has too many columns

**30. Three students tie for the highest average score of 94. What does RANK() return for the fourth-highest student (average 91)?**

A. 2
B. 3
C. 4
D. 1

**31. After migrating data from GRADE_FLAT into normalized tables, which constraint should be added FIRST to STUDENT_GRADE before foreign keys?**

A. A CHECK constraint on Score (0-100)
B. A UNIQUE constraint on GradeID
C. A PRIMARY KEY constraint on GradeID — every table needs a primary key before foreign keys can reference it
D. A NOT NULL constraint on StudentID

**32. In the at-risk student report CTE pipeline (§10.12), the MissingGrades CTE counts missing grades, ScoreAverages computes averages, and AttendanceRates computes attendance. The final SELECT joins all three. If a student has NO attendance records at all, what does COALESCE(ar.AttendanceRate, 0) ensure?**

A. That the student is excluded from the report
B. That the student's attendance rate displays as 0 instead of NULL, so they still appear in the report and can be flagged as at-risk
C. That the attendance calculation runs faster
D. That attendance data is averaged with grade data

## Evaluate Questions

**33. A company inherits a flat spreadsheet with 10,000 rows where customer name, address, and product details repeat across every order row. The team needs reliable monthly sales reports. Which approach does Chapter 10 support as the best first step?**

A. Build the sales reports directly from the spreadsheet, flagging any obvious errors manually
B. Run diagnostic queries to detect duplication and conflicts, then use SQL to extract entities into normalized tables with constraints before building reports
C. Convert the spreadsheet to a single database table and add indexes for performance
D. Export the data to a data warehouse and use business intelligence tools to clean it visually

**34. An analyst needs to produce a weekly report showing each store's total sales alongside every individual transaction. The report must also rank stores by total sales. Which combination of SQL tools is most appropriate?**

A. GROUP BY for totals, a separate query for detail rows, and manual ranking in a spreadsheet
B. A view for store totals, a CTE for transactions, and UNION to combine them
C. Window functions — SUM() OVER (PARTITION BY StoreID) for per-transaction store totals plus RANK() OVER (ORDER BY SUM DESC) for store ranking
D. A CROSS JOIN between stores and transactions with a HAVING clause

**35. A colleague writes `UPDATE STUDENT_GRADE SET Score = Score + 5;` and runs it on the production database. What does Chapter 10 identify as the main problem with this statement?**

A. The syntax is incorrect — UPDATE requires a FROM clause
B. The statement updates ALL rows because there is no WHERE clause, applying a 5-point curve to every student and every deliverable indiscriminately
C. Arithmetic inside UPDATE is not supported in SQLite
D. The statement will fail because Score is a read-only column

**36. A complex grading calculation requires four steps: filter exams only, compute per-student exam averages, join to a weight table, and assign letter grades. The query will only be used once for an end-of-semester report. Which structure is most appropriate?**

A. A permanent view saved in the database
B. Four separate queries with results exported to a spreadsheet
C. A CTE pipeline with named stages inside a single query, since the logic is specific to one report and benefits from being defined close to where it is used
D. A materialized view refreshed daily

**37. A university changes its grading policy: exams now count for 50% instead of 40%, and homework drops from 20% to 10%. In the Grading Database, where is the BEST place to make this change so that ALL grade reports reflect it immediately?**

A. Update every query that calculates final grades
B. Update the CASE expressions in the at-risk report
C. Update the single row in the ASSIGNMENT_TYPE or GRADE_WEIGHT table that stores the exam and homework weights
D. Export all grades to a spreadsheet and recalculate manually

**38. You suspect a flat table has inconsistent deliverable due dates — the same Quiz 1 showing different due dates in different rows. Which diagnostic approach from §10.3 is most direct?**

A. `SELECT * FROM GRADE_FLAT WHERE DueDate IS NULL;`
B. `SELECT Type, DeliverableNumber, COUNT(DISTINCT DueDate) AS DateVersions FROM GRADE_FLAT GROUP BY Type, DeliverableNumber HAVING COUNT(DISTINCT DueDate) > 1;`
C. `SELECT DISTINCT DueDate FROM GRADE_FLAT ORDER BY DueDate;`
D. `SELECT Type, DeliverableNumber, AVG(DueDate) FROM GRADE_FLAT GROUP BY Type, DeliverableNumber;`

**39. A database administrator needs to apply a 10% fee increase to all transactions above $1,000 in a production billing system. Which workflow does Chapter 10 recommend?**

A. Run the UPDATE immediately and check the results afterward
B. Write a SELECT to identify the affected rows, verify, wrap the UPDATE in a transaction, run it, verify again with SELECT, and only COMMIT if the verification confirms exactly the intended rows changed
C. Delete all transactions above $1,000 and re-insert them with the new fee
D. Export the billing table to a spreadsheet, make changes there, and import back

**40. A final project requires building a complete analytical pipeline that takes raw normalized data and produces a ranked at-risk report with multiple metrics. The chapter's integrated example (§10.12) suggests which design principle?**

A. Write one very long, dense query that does everything at once for maximum efficiency
B. Use a single GROUP BY with every possible aggregate function
C. Break the problem into named stages using CTEs — each stage solves one sub-problem — then join the stages in a final SELECT that labels results with business-meaningful categories
D. Export all data to a spreadsheet and use formulas instead of SQL

---

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Answer Key

### Remember Questions

**Question 1: What is the defining characteristic of advanced SQL as described in Chapter 10?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Number of tables is not the defining trait. |
| B      | No       | Keyword count is not the measure of advanced SQL. |
| C      | Yes      | §10.1 states: "Advanced SQL is not a different language. It is the same core logic — SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY — used in more deliberate combinations. The shift is from asking isolated questions to building reliable analytical workflows." |
| D      | No       | Cross-platform execution is a benefit, not the defining characteristic. |

**Question 2: How many tables are in the Grading Database schema used throughout Chapter 10?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | 5 is too few. |
| B      | No       | 6 is too few. |
| C      | Yes      | §10.2 lists seven tables: STUDENT, ASSIGNMENT_TYPE, DELIVERABLE, STUDENT_GRADE, SCHEDULE, ATTENDANCE, and GRADE_SCALE. |
| D      | No       | 8 is too many. |

**Question 3: Which of the following is NOT one of the three relational pathways identified in the Grading Database refresher?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Student Performance IS a pathway: STUDENT → STUDENT_GRADE → DELIVERABLE → ASSIGNMENT_TYPE. |
| B      | No       | Attendance IS a pathway: STUDENT → ATTENDANCE → SCHEDULE. |
| C      | No       | Grade Interpretation IS a pathway: STUDENT_GRADE → GRADE_SCALE. |
| D      | Yes      | "Course Planning: SCHEDULE → DELIVERABLE → STUDENT" is not one of the three pathways listed in §10.2. The three are Student Performance, Attendance, and Grade Interpretation. |

**Question 4: What does the acronym CTE stand for in SQL?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | "Calculated Table Expression" is made up. |
| B      | Yes      | §10.10 defines CTE as Common Table Expression. |
| C      | No       | "Composite Table Extension" is made up. |
| D      | No       | "Conditional Transaction Element" is made up. |

**Question 5: A window function differs from GROUP BY aggregation in what fundamental way?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Speed is not the fundamental difference. |
| B      | No       | Window functions work with any data type. |
| C      | Yes      | §10.9: "Ordinary aggregation collapses rows. Window functions calculate summaries while preserving detail rows." |
| D      | No       | Window functions do not require a separate CREATE statement. |

**Question 6: What does the COALESCE function do in SQL?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Combining tables is done with JOIN, not COALESCE. |
| B      | Yes      | §10.5: "COALESCE returns the first non-NULL value from a list of arguments." |
| C      | No       | Converting to uppercase is done with UPPER(). |
| D      | No       | Rounding is done with ROUND(). |

**Question 7: What does a CROSS JOIN between STUDENT (5 rows) and DELIVERABLE (6 rows) produce?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | 5 rows would be a filtered result, not a CROSS JOIN. |
| B      | No       | 6 rows would be a filtered result, not a CROSS JOIN. |
| C      | No       | 11 is the sum, not the product. |
| D      | Yes      | §10.4: "CROSS JOIN creates every expected student-deliverable pair." 5 × 6 = 30 combinations. |

**Question 8: Which SQL commands are used to control a transaction?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | START and STOP are not SQL transaction commands. |
| B      | Yes      | §10.11: "BEGIN TRANSACTION; ... COMMIT; ... ROLLBACK;" |
| C      | No       | OPEN and CLOSE are cursor commands, not transaction commands. |
| D      | No       | CREATE, ALTER, and DROP are DDL commands. |

### Understand Questions

**Question 9: Why is the CROSS JOIN + LEFT JOIN + IS NULL pattern necessary for finding missing grades?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | The pattern addresses absence of rows, not absence of columns. |
| B      | Yes      | §10.4.2: "Missing work is tricky because missing rows are invisible unless you first generate the rows that should exist." The CROSS JOIN generates every expected student-deliverable pair; LEFT JOIN checks which exist; IS NULL keeps only missing ones. |
| C      | No       | Speed is not the reason this pattern is used. |
| D      | No       | LEFT JOIN does not automatically filter NULL values — WHERE IS NULL is needed for that. |

**Question 10: Why can you NOT write `WHERE AVG(Score) < 75` in a SQL query?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | AVG is a valid SQL function. |
| B      | No       | WHERE clauses can contain numbers. |
| C      | Yes      | §10.6.2: "WHERE filters rows before aggregation. HAVING filters groups after aggregation." AVG has not been computed at the WHERE stage. |
| D      | No       | AVG can be used in SELECT and HAVING, not only SELECT. |

**Question 11: According to Chapter 10, why is storing grading weights in a policy table better than hard-coding them in formulas?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Storage space is not the argument. |
| B      | No       | Performance is not the primary argument. |
| C      | Yes      | §10.8: "Store grading policy in a table, not inside scattered formulas." The policy-table approach makes rules visible, auditable, and changeable in one place. |
| D      | No       | Hard-coded formulas can use decimal values. |

**Question 12: What is the difference between RANK() and ROW_NUMBER() as described in §10.9?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Both work with any data type. |
| B      | Yes      | §10.9: "RANK() assigns equal rank to ties and leaves gaps. DENSE_RANK() assigns equal rank without gaps. ROW_NUMBER() assigns a unique sequence even for ties." |
| C      | No       | Both can use PARTITION BY optionally. |
| D      | No       | Both are window functions used with OVER(), not with GROUP BY. |

**Question 13: Why does Chapter 10 emphasize running diagnostic queries before building reports?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | There is no platform requirement for diagnostic queries. |
| B      | Yes      | §10.3: "Before building dashboards or calculating grades, check whether the data can be trusted." Diagnostic SQL reveals duplication, inconsistency, and structural problems. |
| C      | No       | Cache warming is not a reason given. |
| D      | No       | Diagnostic queries are not the only way to create tables. |

**Question 14: What is the key difference between a view and a CTE in terms of persistence?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | Yes      | §10.10: "A view is persistent — it is saved in the database and can be queried repeatedly. A CTE is temporary — it exists only within a single query." |
| B      | No       | This is the reverse of the correct answer. |
| C      | No       | Views can only contain SELECT; CTEs also only contain SELECT logic within a query. |
| D      | No       | Views and CTEs are distinct tools with different persistence characteristics. |

**Question 15: Why does the safe UPDATE workflow in §10.11 use verify → modify → verify?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | SQL does not require three statements. |
| B      | Yes      | §10.11: "Write a SELECT to identify the target rows. Verify the result. Convert the SELECT into UPDATE or DELETE. Run the modification only when the target rows are confirmed." |
| C      | No       | The database does not auto-rollback without explicit ROLLBACK. |
| D      | No       | ACID properties describe transaction guarantees, not the verify-modify-verify workflow itself. |

**Question 16: According to the chapter, when should you use a window function instead of GROUP BY?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Neither window functions nor GROUP BY are for deleting rows. |
| B      | No       | One row per group is exactly what GROUP BY does — the opposite of when to use a window function. |
| C      | Yes      | §10.9 comparison table: use GROUP BY for "one row per group"; use window functions to "keep detail rows and add summary values." |
| D      | No       | Row count is not a deciding factor. |

### Apply Questions

**Question 17: Which SQL query correctly detects duplicate grade records — the same student with more than one score for the same deliverable?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | `WHERE Score = Score` is always true and does not detect duplicates. |
| B      | No       | GROUP BY only on StudentID would flag any student with multiple grades, not specifically duplicate student-deliverable pairs. |
| C      | Yes      | §10.3 diagnostic patterns: GROUP BY on both StudentID and DeliverableID with HAVING COUNT(*) > 1 correctly identifies the same student-deliverable pair appearing multiple times. |
| D      | No       | DISTINCT removes duplicates rather than detecting them. |

**Question 18: Which statement correctly uses CREATE TABLE AS SELECT to extract unique students from a flat GRADE_FLAT table?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | `CREATE TABLE ... FROM` is incorrect syntax. |
| B      | Yes      | §10.3.5: `CREATE TABLE STUDENT AS SELECT DISTINCT StudentID, FirstName, LastName, Email FROM GRADE_FLAT;` creates and populates the table in one step. |
| C      | No       | The syntax is jumbled and incorrect. |
| D      | No       | `SELECT UNIQUE` is not valid SQL; the keyword is DISTINCT. |

**Question 19: You have a new empty DELIVERABLE table with columns defined. Which statement correctly populates it from GRADE_FLAT?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | `INSERT INTO ... VALUES` expects literal values, not a subquery. |
| B      | Yes      | §10.3.6: `INSERT INTO target_table (columns) SELECT DISTINCT columns FROM source_table` is the correct data migration pattern. |
| C      | No       | COPY is not standard SQL for this purpose. |
| D      | No       | UPDATE modifies existing rows; it does not insert new rows from another table. |

**Question 20: Which query correctly finds all student-deliverable combinations that have NO recorded grade?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | This finds grades with NULL scores, not missing grade records. |
| B      | No       | JOIN requires a matching condition; without a proper ON clause linking through STUDENT_GRADE, it does not find missing grades. |
| C      | Yes      | §10.4.2: CROSS JOIN generates every pair, LEFT JOIN checks for actual grades, and WHERE sg.GradeID IS NULL keeps only missing ones. |
| D      | No       | FULL OUTER JOIN is not the pattern taught for finding missing records. |

**Question 21: Which CASE expression correctly labels students as 'Pass' when their average score is 60 or above, and 'Fail' otherwise?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Missing comparison operator after WHEN. |
| B      | No       | Missing WHEN keyword before the condition. |
| C      | Yes      | §10.5: `CASE WHEN condition THEN result ELSE default END` is correct syntax. |
| D      | No       | IF is not standard SQL CASE syntax; this is Access-specific IIf syntax. |

**Question 22: Which query correctly uses HAVING to find students whose average score is below 75?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | WHERE cannot contain AVG — aggregate condition must be in HAVING. |
| B      | Yes      | §10.6.2: GROUP BY groups the rows, then HAVING AVG(Score) < 75 filters the groups after aggregation. |
| C      | No       | WHERE must come before GROUP BY, not after. |
| D      | No       | HAVING must come after GROUP BY, and aliases from SELECT may not be available in HAVING in all platforms. |

**Question 23: Which query correctly uses a window function to show each student's average score next to every individual grade?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | GROUP BY collapses rows — you lose individual grade visibility. |
| B      | Yes      | §10.9: `AVG(Score) OVER (PARTITION BY StudentID)` computes each student's average and attaches it to every grade row without collapsing. |
| C      | No       | OVER() without PARTITION BY computes the overall average, not per-student. |
| D      | No       | WINDOW...BY is not valid SQL syntax. |

**Question 24: Which transaction block correctly structures the safe update workflow for changing a student's email?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Missing the pre-verification SELECT and post-verification SELECT. |
| B      | Yes      | §10.11: verify → BEGIN → modify → verify again → COMMIT. This block includes all elements of the safe workflow. |
| C      | No       | Missing BEGIN, and ROLLBACK after UPDATE undoes the change with no path to commit. |
| D      | No       | Missing WHERE clause on UPDATE — would change every student's email. |

### Analyze Questions

**Question 25: An instructor wants a report showing each student's individual quiz scores alongside that student's overall average and class rank. Which approach is most appropriate?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | GROUP BY would collapse individual quiz scores. |
| B      | Yes      | §10.9: window functions preserve detail rows. AVG() OVER (PARTITION BY StudentID) adds per-student average; RANK() OVER adds class rank — both alongside individual scores. |
| C      | No       | UNION stacks result sets vertically; it does not add columns alongside detail rows. |
| D      | No       | CROSS JOIN would generate far too many combinations, not the targeted window calculation needed. |

**Question 26: A query `SELECT StudentID, AVG(Score) FROM STUDENT_GRADE WHERE AVG(Score) < 70 GROUP BY StudentID` produces an error. What is the problem?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | STUDENT_GRADE does have a Score column in the GDB. |
| B      | No       | AVG can be used with GROUP BY; the issue is WHERE vs. HAVING. |
| C      | Yes      | §10.6.2 callout: "Do not write WHERE AVG(Score) < 75. Aggregate conditions belong in HAVING." WHERE filters rows before aggregation; AVG is not yet computed. |
| D      | No       | StudentID only needs to appear once in GROUP BY. |

**Question 27: A reporting team needs a student performance summary that will be queried daily by five different dashboard tools. Which reusable structure is most appropriate?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | A CTE would need to be copied into each tool's query — not reusable across tools. |
| B      | No       | Copying subqueries creates maintenance burden and inconsistency risk. |
| C      | Yes      | §10.10: "A view is persistent — it is saved in the database and can be queried repeatedly by multiple users, reports, and tools." |
| D      | No       | A spreadsheet export is static and not a reusable database structure. |

**Question 28: You need to find which deliverables have NEVER been submitted by ANY student. Which join pattern should you use?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | INNER JOIN returns only deliverables that DO have grades — the opposite of what is needed. |
| B      | Yes      | §10.4.3 join checklist: LEFT JOIN + IS NULL diagnoses missing parent records. LEFT JOIN from DELIVERABLE to STUDENT_GRADE with WHERE GradeID IS NULL returns deliverables with no matching grade. |
| C      | No       | CROSS JOIN alone generates combinations but does not filter for missing records. |
| D      | No       | A self-join compares rows within the same table, not across tables. |

**Question 29: A GRADE_FLAT table stores StudentID, FirstName, LastName, Email, Type, DeliverableNumber, DueDate, and Score all in one table. Alice's email appears in 6 different rows with two different values. This is an example of which kind of problem?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | An insertion anomaly is about being unable to add data without unrelated data. |
| B      | No       | A deletion anomaly is about losing data when deleting other data. |
| C      | Yes      | §10.3.2: "If this returns rows, the same student has conflicting email values — an update anomaly." An update anomaly occurs when changing a fact requires updating many rows and missing some creates inconsistency. |
| D      | No       | A flat table is not in 3NF, and the number of columns is not the issue. |

**Question 30: Three students tie for the highest average score of 94. What does RANK() return for the fourth-highest student (average 91)?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | RANK() does not skip to 2 after a three-way tie for 1. |
| B      | No       | RANK() does not return 3 after a three-way tie for 1. |
| C      | Yes      | §10.9: "RANK() assigns equal rank to ties and leaves gaps." Three students tie at rank 1, so the next rank is 4. |
| D      | No       | Only the tied students get rank 1. |

**Question 31: After migrating data from GRADE_FLAT into normalized tables, which constraint should be added FIRST to STUDENT_GRADE before foreign keys?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | CHECK is important but not the prerequisite for foreign keys. |
| B      | No       | UNIQUE is important but GradeID needs to be a PRIMARY KEY first. |
| C      | Yes      | §10.3.6: a table needs a primary key before foreign keys can reference it. The PK uniquely identifies each row and is the target of FK references. |
| D      | No       | NOT NULL is important but secondary to establishing the primary key. |

**Question 32: In the at-risk student report CTE pipeline (§10.12), the MissingGrades CTE counts missing grades, ScoreAverages computes averages, and AttendanceRates computes attendance. The final SELECT joins all three. If a student has NO attendance records at all, what does COALESCE(ar.AttendanceRate, 0) ensure?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | COALESCE with 0 keeps the student in the report, not excluded. |
| B      | Yes      | §10.12: COALESCE replaces NULL with 0 so students without attendance records still appear and can be flagged by the risk logic. Without COALESCE, NULL attendance would either hide them or break comparisons. |
| C      | No       | COALESCE does not affect query speed. |
| D      | No       | COALESCE does not average attendance with grade data. |

### Evaluate Questions

**Question 33: A company inherits a flat spreadsheet with 10,000 rows where customer name, address, and product details repeat across every order row. The team needs reliable monthly sales reports. Which approach does Chapter 10 support as the best first step?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Building reports on unverified flat data risks misleading results. |
| B      | Yes      | §10.3: "Diagnose before you analyze." Then §10.3.4–10.3.7: extract entities, create normalized tables, add constraints. This is the full diagnosis-to-restructuring workflow Chapter 10 teaches. |
| C      | No       | Converting to a single table preserves the flat-table problems. |
| D      | No       | Visual cleaning in BI tools does not fix the underlying structural problems. |

**Question 34: An analyst needs to produce a weekly report showing each store's total sales alongside every individual transaction. The report must also rank stores by total sales. Which combination of SQL tools is most appropriate?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Manual spreadsheet ranking is error-prone and not a SQL solution. |
| B      | No       | UNION stacks results vertically; it cannot show per-transaction totals alongside detail. |
| C      | Yes      | Window functions are designed for this: SUM() OVER adds per-store totals to each transaction row; RANK() OVER ranks stores — all without collapsing detail. |
| D      | No       | CROSS JOIN generates a Cartesian product, not targeted per-store calculations. |

**Question 35: A colleague writes `UPDATE STUDENT_GRADE SET Score = Score + 5;` and runs it on the production database. What does Chapter 10 identify as the main problem with this statement?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | UPDATE does not always require FROM. |
| B      | Yes      | §10.11 warning callout: "UPDATE STUDENT SET Email = 'unknown@albany.edu'; changes every student. DELETE FROM STUDENT_GRADE; removes every grade. SQL does what you ask, not what you mean." Missing WHERE clause = mass update. |
| C      | No       | Arithmetic in UPDATE is supported. |
| D      | No       | Score is not read-only. |

**Question 36: A complex grading calculation requires four steps: filter exams only, compute per-student exam averages, join to a weight table, and assign letter grades. The query will only be used once for an end-of-semester report. Which structure is most appropriate?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | A permanent view is overkill for a one-time report. |
| B      | No       | Four separate queries break the logical pipeline and require manual assembly. |
| C      | Yes      | §10.10: a CTE pipeline is ideal for multi-step logic that benefits from readability and is scoped to a single use. Each stage is named and verifiable independently. |
| D      | No       | A materialized view stores data physically and is refreshed — unnecessarily heavy for a one-time report. |

**Question 37: A university changes its grading policy: exams now count for 50% instead of 40%, and homework drops from 20% to 10%. In the Grading Database, where is the BEST place to make this change so that ALL grade reports reflect it immediately?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Updating every query is exactly what the policy-table approach avoids. |
| B      | No       | CASE expressions are downstream consumers of the policy, not the source of truth. |
| C      | Yes      | §10.8: "Store grading policy in a table, not inside scattered formulas." Updating one row in the weight table changes every query that joins to it. |
| D      | No       | Manual spreadsheet recalculation abandons the database approach. |

**Question 38: You suspect a flat table has inconsistent deliverable due dates — the same Quiz 1 showing different due dates in different rows. Which diagnostic approach from §10.3 is most direct?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | Checking for NULL due dates does not detect inconsistent non-NULL values. |
| B      | Yes      | §10.3.3 diagnostic table: "Inconsistent deliverable definitions: GROUP BY DeliverableType, DeliverableNumber then HAVING COUNT(DISTINCT DueDate) > 1." |
| C      | No       | Listing distinct due dates does not show which deliverable has the inconsistency. |
| D      | No       | Averaging dates is not meaningful for detecting inconsistency. |

**Question 39: A database administrator needs to apply a 10% fee increase to all transactions above $1,000 in a production billing system. Which workflow does Chapter 10 recommend?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | §10.11 explicitly warns against modifying without verification. |
| B      | Yes      | §10.11 safe workflow: verify with SELECT, wrap in transaction, modify, verify again, COMMIT only if correct. This protects production data. |
| C      | No       | Deleting and re-inserting risks data loss and breaks referential integrity. |
| D      | No       | Exporting to a spreadsheet bypasses database safety mechanisms. |

**Question 40: A final project requires building a complete analytical pipeline that takes raw normalized data and produces a ranked at-risk report with multiple metrics. The chapter's integrated example (§10.12) suggests which design principle?**

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A      | No       | A single dense query is the opposite of the CTE pipeline approach. |
| B      | No       | A single GROUP BY cannot handle multiple metrics from different tables with different grouping needs. |
| C      | Yes      | §10.12 key-takeaway callout: "Advanced SQL is not a single clever trick. It is a readable pipeline of smaller logical steps that transforms normalized data into actionable reports." The MissingGrades → ScoreAverages → AttendanceRates → final SELECT pattern demonstrates this. |
| D      | No       | Exporting to a spreadsheet is a step backward from a database solution. |

---

## Question Distribution Summary

### Bloom Level

| Bloom Level | Questions | Count |
| ----------- | --------- | ----- |
| Remember    | 1-8       | 8     |
| Understand  | 9-16      | 8     |
| Apply       | 17-24     | 8     |
| Analyze     | 25-32     | 8     |
| Evaluate    | 33-40     | 8     |

### Question Type

| Question Type                | Questions | Count |
| ---------------------------- | --------- | ----- |
| Single-answer MC             | 1-8, 10-16, 18-23, 25-40 | 33 |
| Multiple-answer (Select ALL) | 9, 17, 24 | 3 |

*Note: Select ALL questions are placed at Remember (9), Apply (17), and Apply (24) to require multi-option discrimination at key concept-check points. The remaining 37 questions use single-answer MC for clarity of assessment.*

### Design Criterion

| Design Criterion  | Questions | Count |
| ----------------- | --------- | ----- |
| Application-based | 17-32     | 16    |
| Scenario-based    | 9-16, 33-40 | 16    |
| Definition-only   | 1-8       | 8     |

