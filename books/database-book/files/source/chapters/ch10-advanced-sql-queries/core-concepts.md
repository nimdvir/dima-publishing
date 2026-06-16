<!-- Chapter edit: aggressive trim (~8,500→~5,000 words), fixed Ch9→Ch10 numbering, canonical structure, HTML callouts, page breaks. Moved Review Questions to reflection, removed Suggested Figures and Key Concepts (folded into Summary). Compressed diagnostics, cleaning, date functions, and window functions. Technical meaning preserved. -->
---
title: "Chapter 10: Advanced SQL for Business Analysis"
chapter: 10
section: "Core Concepts"
description: "Takes SQL from basic queries to sophisticated analysis using the full Grading Database. Covers advanced JOINs, conditional functions, aggregation, date queries, weighted grades, window functions, reusable pipelines, safe data modification, and an integrated at-risk student report."
keywords:
  - advanced SQL
  - JOIN patterns
  - aggregation
  - window functions
  - CTE
  - views
  - weighted grades
  - CASE expression
  - COALESCE
  - safe UPDATE DELETE
date: 2026-06-12
author: "Nimrod Dvir, PhD"
---

# Chapter 10: Advanced SQL for Business Analysis

*From Queries to Managerial Insight*

<!-- FIGURE PLACEHOLDER: Chapter 10 infographic previewing the advanced SQL arc (diagnostics → joins → aggregation → weighted grades → pipelines → at-risk report). Recommend chapter-media. -->

Chapter 5 introduced SQL as the language of relational databases. Chapter 9 showed how to design databases from requirements. This chapter returns to SQL with a more advanced goal: using queries to diagnose data problems, connect normalized tables, calculate meaningful metrics, and create reusable reporting logic.

Advanced SQL is not a different language. It is the same core logic — `SELECT`, `FROM`, `WHERE`, `JOIN`, `GROUP BY`, `ORDER BY` — used in more deliberate combinations. The shift is from asking isolated questions to building reliable analytical workflows.

<!-- FIGURE PLACEHOLDER: Video overview embed for Chapter 10. Recommend chapter-media. -->

---

## Learning Objectives

After completing this chapter, you will be able to:

1. Explain how advanced SQL extends basic query logic into analysis and decision support.
2. Diagnose redundancy, inconsistency, and missing data using SQL.
3. Write multi-table queries that reconstruct reports from normalized tables.
4. Use `INNER JOIN`, `LEFT JOIN`, and `CROSS JOIN` appropriately.
5. Use `GROUP BY`, `HAVING`, and conditional aggregation to produce performance metrics.
6. Use `CASE`, `COALESCE()`, and Access-specific functions (`IIf()`, `Nz()`) to create interpretable output.
7. Write date-aware queries across Access, SQLite, and PostgreSQL patterns.
8. Calculate weighted grades using policy tables.
9. Explain how window functions differ from ordinary aggregation.
10. Use views, CTEs, and subqueries to build reusable query pipelines.
11. Apply safe workflows for `UPDATE` and `DELETE` statements.
12. Design an end-to-end query pipeline that turns normalized data into decision-ready reports.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Core Concepts

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-concepts" alt="Core Concepts section icon" width="220">
</p>

## Chapter Roadmap

| Section | Main Focus | Why It Matters |
|---:|---|---|
| 10.1 | From Basic SQL to Advanced SQL | Mental shift from retrieval to analysis. |
| 10.2 | Grading Database Refresher | Reviews the schema used throughout the chapter. |
| 10.3 | Diagnosing Data Problems | SQL reveals redundancy, inconsistency, and missing data. |
| 10.4 | Advanced JOIN Patterns | Joins reconstruct reports and find missing records. |
| 10.5 | Cleaning and Conditional Functions | Access-specific and portable SQL patterns compared. |
| 10.6 | Analytical Aggregation | Metrics using `GROUP BY`, `HAVING`, and conditional counts. |
| 10.7 | Date and Time Queries | Due dates, deadlines, and time-window analysis. |
| 10.8 | Weighted Grades and Policy Tables | Final grades calculated from stored rules, not hard-coded formulas. |
| 10.9 | Window Functions | Rankings and running analytics without collapsing rows. |
| 10.10 | Reusable Reporting Pipelines | Views, CTEs, and subqueries manage complexity and reuse. |
| 10.11 | Safe Data Modification | `UPDATE` and `DELETE` with discipline. |
| 10.12 | Integrated Example: At-Risk Student Report | End-to-end capstone combining multiple techniques. |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.1 From Basic SQL to Advanced SQL

Chapter 5 focused on SQL grammar: retrieving rows, filtering, sorting, joining, and summarizing. This chapter asks a different question:

> How can SQL support reliable analysis and decision-making across a real relational database?

A beginner writes one query to answer one question. An advanced user asks how the query fits into a larger workflow: Is the data clean? Which tables provide context? Should the logic be saved for reuse? Is the calculation based on a business rule stored in a table?

### Four Questions Before Writing an Advanced Query

| Question | SQL Implication |
|---|---|
| What is the business question? | Determines filters, calculations, and output columns. |
| Which table stores the main event? | Start from `STUDENT_GRADE`, `ATTENDANCE`, etc. |
| Which tables provide context? | Join to `STUDENT`, `DELIVERABLE`, `ASSIGNMENT_TYPE`, `SCHEDULE`. |
| What kind of output is needed? | Choose joins, aggregation, window functions, views, or CTEs. |

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

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.2 Grading Database Refresher

The Grading Database is the running case for this chapter. Most queries follow one of three relational pathways.

| Table | What It Stores |
|---|---|
| `STUDENT` | Student identity and contact information |
| `ASSIGNMENT_TYPE` | Category-level grading rules (weights, points) |
| `DELIVERABLE` | Specific graded items (Quiz 1, Exam 2, etc.) |
| `STUDENT_GRADE` | One student's score on one deliverable |
| `SCHEDULE` | Class meetings, weeks, dates, and topics |
| `ATTENDANCE` | Whether a student attended a class meeting |
| `GRADE_SCALE` | Letter-grade thresholds |

**Student Performance:** `STUDENT → STUDENT_GRADE → DELIVERABLE → ASSIGNMENT_TYPE`
**Attendance:** `STUDENT → ATTENDANCE → SCHEDULE`
**Grade Interpretation:** `STUDENT_GRADE → GRADE_SCALE`

A normalized database stores facts cleanly. SQL turns those facts into views, summaries, and decisions. The design principles behind this schema were covered in Chapter 9.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.3 Diagnosing Data Problems with SQL

Before building dashboards or calculating grades, check whether the data can be trusted. SQL can answer diagnostic questions directly.

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

| Problem | What to Check |
|---|---|
| Inconsistent deliverable definitions | `GROUP BY DeliverableType, DeliverableNumber` then `HAVING COUNT(DISTINCT DueDate) > 1` |
| Duplicate grade records | `GROUP BY StudentID, DeliverableID` then `HAVING COUNT(*) > 1` |
| Scores outside valid range | `WHERE Score < 0 OR Score > 100` |
| Orphaned grade records | `LEFT JOIN STUDENT ... WHERE s.StudentID IS NULL` |

<div class="callout tip">
  <p><strong>💡 Tip: Diagnose before you analyze</strong></p>
  <p>Diagnostic SQL helps you test the health of a database before trusting its reports.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.4 Advanced JOIN Patterns

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

| Situation | Preferred Join |
|---|---|
| Only matched records matter | `INNER JOIN` |
| Need all rows from the left table | `LEFT JOIN` |
| Need expected combinations | `CROSS JOIN` + `LEFT JOIN` |
| Need to diagnose missing parent records | `LEFT JOIN` + `IS NULL` |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.5 Cleaning and Conditional Functions

Real data is rarely clean. Access uses `Nz()` and `IIf()`; other SQL systems use `COALESCE()` and `CASE`. This section treats Access as a gateway: learn the idea in Access, then recognize the portable equivalent.

### Access vs. Portable SQL

| Need | Microsoft Access | SQLite / PostgreSQL |
|---|---|---|
| Replace `NULL` with a default | `Nz([Score], 0)` | `COALESCE(Score, 0)` |
| Conditional value | `IIf([Score] >= 60, "Pass", "Fail")` | `CASE WHEN Score >= 60 THEN 'Pass' ELSE 'Fail' END` |
| Current date | `Date()` | `CURRENT_DATE` / `DATE('now')` |
| Days between dates | `DateDiff("d", [Start], [End])` | Platform-specific |
| Extract year | `DatePart("yyyy", [DueDate])` | `EXTRACT(YEAR FROM DueDate)` / `strftime('%Y', DueDate)` |

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

| Expression | Meaning |
|---|---|
| `COUNT(*)` | Counts all rows, including rows with `NULL` values. |
| `COUNT(Score)` | Counts rows where `Score` is not `NULL`. |
| `COUNT(DISTINCT StudentID)` | Counts unique student IDs. |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.7 Date and Time Queries

Date syntax varies across platforms, so learn the pattern and look up the specific function.

### Date Function Reference

| Need | Access | SQLite | PostgreSQL |
|---|---|---|---|
| Current date | `Date()` | `DATE('now')` | `CURRENT_DATE` |
| Add 7 days | `DateAdd("d", 7, [DueDate])` | `DATE(DueDate, '+7 days')` | `DueDate + INTERVAL '7 days'` |
| Days between | `DateDiff("d", [Start], [End])` | `JULIANDAY(End) - JULIANDAY(Start)` | `EndDate - StartDate` |
| Extract year | `DatePart("yyyy", [DueDate])` | `strftime('%Y', DueDate)` | `EXTRACT(YEAR FROM DueDate)` |

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

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.9 Window Functions

Ordinary aggregation collapses rows. Window functions calculate summaries while preserving detail rows.

### `GROUP BY` vs. Window Functions

| Need | Use |
|---|---|
| One row per group | `GROUP BY` |
| Keep detail rows and add summary values | Window function |
| Rank rows | Window function |

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

Writing one correct query is useful. Writing query logic that can be reused is more valuable.

| Tool | Best For | Scope |
|---|---|---|
| **Subquery** | One calculation inside another query | Temporary |
| **CTE** | Multi-step readable logic | Temporary |
| **View** | Saved reporting logic | Persistent |

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

| Situation | Best Tool |
|---|---|
| Short one-time comparison | Subquery |
| Multi-step readable logic | CTE |
| Logic reused across reports | View |
| Combining similar result sets | `UNION` / `UNION ALL` |
| Access-based reusable query | Saved query |

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Query logic as infrastructure</strong></p>
  <p>Reusable SQL logic is part of database design. Good queries become analytical infrastructure.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

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

### Transactions as a Safety Preview

```sql
BEGIN TRANSACTION;
UPDATE STUDENT_GRADE SET Score = 88 WHERE GradeID = 42;
-- If correct: COMMIT;
-- If wrong: ROLLBACK;
```

Transactions are covered more fully in the database administration chapter.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

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

| CTE | What It Does |
|---|---|
| `MissingGrades` | Counts expected student-deliverable pairs with no grade. |
| `ScoreAverages` | Calculates each student's average score. |
| `AttendanceRates` | Calculates each student's attendance percentage. |
| Final `SELECT` | Joins the pieces and labels each student by risk category. |

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: SQL as a decision pipeline</strong></p>
  <p>Advanced SQL is not a single clever trick. It is a readable pipeline of smaller logical steps that transforms normalized data into actionable reports.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Chapter Summary

This chapter moved SQL from basic retrieval into advanced analysis and reporting. The chapter began by reframing SQL as a way to support business questions, not merely return data.

You reviewed the Grading Database schema and learned how its normalized structure — designed in Chapter 9 — shapes query design. Diagnostic SQL revealed how to detect redundancy, conflicting values, duplicates, invalid scores, and orphaned rows before building reports.

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
