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
