<!-- metadata: date="2026-06-12"; chapter="10"; section="main"; title="Chapter 10 – Advanced SQL for Business Analysis"; description="Core concepts for advanced SQL"; author="Nimrod Dvir, PhD" -->
# Chapter 10: Advanced SQL for Business Analysis

*From Queries to Managerial Insight*

Chapter 5 introduced SQL as the language of relational databases. Chapter 8 brought the first half of the course together through the midterm review and project. This chapter returns to SQL with a more advanced goal: using queries to diagnose data problems, connect normalized tables, calculate meaningful metrics, and create reusable reporting logic.

Advanced SQL is not a different language. It is the same core logic you already know—`SELECT`, `FROM`, `WHERE`, `JOIN`, `GROUP BY`, and `ORDER BY`—used in more deliberate combinations. The shift is from asking isolated questions to building reliable analytical workflows.

In this chapter, SQL becomes a bridge between **relational design** and **business intelligence**. You will use the Grading Database to answer questions such as:

- Which students are missing work?
- Which deliverables are most difficult?
- Which students are at risk?
- How should weighted grades be calculated?
- How can we reuse the same query logic across reports?
- How do Access-specific functions compare with more portable SQL patterns?

The goal is not to memorize more syntax. The goal is to learn how to think with SQL.

---

## Learning Objectives

After completing this chapter, you will be able to:

1. Explain how advanced SQL extends basic query logic into analysis, reporting, and decision support.
2. Diagnose redundancy, inconsistency, missing data, and duplicate records using SQL.
3. Write multi-table queries that reconstruct useful reports from normalized tables.
4. Use `INNER JOIN`, `LEFT JOIN`, and `CROSS JOIN` appropriately in grading-database scenarios.
5. Use `GROUP BY`, `HAVING`, `COUNT(DISTINCT)`, and conditional aggregation to produce performance metrics.
6. Use `CASE`, Access `IIf()`, `COALESCE()`, and Access `Nz()` to create interpretable output.
7. Write date-aware queries using Access, SQLite, PostgreSQL, and SQL Server-style patterns.
8. Calculate weighted grades using policy tables rather than hard-coded assumptions.
9. Explain how window functions differ from ordinary aggregation.
10. Use views, CTEs, and subqueries to build reusable and readable query pipelines.
11. Apply safe workflows for `UPDATE` and `DELETE` statements.
12. Design an end-to-end query set that turns normalized grading data into decision-ready reports.

---

## Chapter Roadmap

| Section | Main Focus | Why It Matters |
|---:|---|---|
| 10.1 | From Basic SQL to Advanced SQL | Establishes the mental shift from retrieval to analysis. |
| 10.2 | Grading Database Refresher | Reviews the schema used throughout the chapter. |
| 10.3 | Diagnosing Data Problems | Shows how SQL reveals redundancy, inconsistency, and missing data. |
| 10.4 | Advanced JOIN Patterns | Uses joins to reconstruct reports and find missing records. |
| 10.5 | Cleaning and Conditional Functions | Compares Access-specific and portable SQL patterns. |
| 10.6 | Analytical Aggregation | Builds metrics using `GROUP BY`, `HAVING`, and conditional counts. |
| 10.7 | Date and Time Queries | Handles due dates, deadlines, weeks, and time windows. |
| 10.8 | Weighted Grades | Calculates final grades using policy tables. |
| 10.9 | Window Functions | Introduces ranking, running totals, and moving averages. |
| 10.10 | Reusable Reporting Pipelines | Uses views, CTEs, and subqueries to manage complexity. |
| 10.11 | Safe Data Modification | Updates and deletes data carefully. |
| 10.12 | Integrated Reporting Example | Pulls the chapter together through an at-risk student report. |

---

## 10.1 From Basic SQL to Advanced SQL

Chapter 5 focused on the grammar of SQL. You learned how to retrieve rows, filter results, sort output, join tables, summarize data, and modify records. Those skills are still the foundation.

Chapter 10 asks a more advanced question:

> How can SQL support reliable analysis and decision-making across a real relational database?

A beginner might write one query to answer one question. An advanced SQL user asks how the query fits into a larger workflow:

- Is the data clean enough to trust?
- Which table stores the main event?
- Which tables provide context?
- Should the result show detail rows, summary rows, or both?
- Should the logic be saved for future reuse?
- Is the calculation based on a business rule that should live in a table?

That is the difference between using SQL as a lookup tool and using SQL as an analytical system.

### Four Questions Before Writing an Advanced Query

Before writing an advanced SQL query, ask four questions.

| Question | Why It Matters | SQL Implication |
|---|---|---|
| **What is the business question?** | A query should answer a clear question, not just return data. | Determines filters, calculations, and output columns. |
| **Which table stores the main event?** | Most analysis begins with the transaction or event table. | Start from tables such as `STUDENT_GRADE` or `ATTENDANCE`. |
| **Which tables provide context?** | Event rows often need names, dates, categories, or rules. | Join to `STUDENT`, `DELIVERABLE`, `ASSIGNMENT_TYPE`, or `SCHEDULE`. |
| **What kind of output is needed?** | Detail, summary, ranking, and reports require different query patterns. | Choose joins, aggregation, window functions, views, or CTEs. |

### Example: Turning a Business Question into SQL Logic

Suppose the question is:

> Which students are currently at risk because their average score is below 75?

That question implies a sequence:

1. The main event table is `STUDENT_GRADE`, because grades are stored there.
2. Student context comes from `STUDENT`.
3. The metric is average score, so we need `AVG()` and `GROUP BY`.
4. The result should include only students below a threshold, so we need `HAVING`.

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
HAVING AVG(sg.Score) < 75
ORDER BY AverageScore ASC;
```

This is not just a query. It is a small decision-support tool. It identifies students who may need attention.

#### Key Takeaway

Advanced SQL begins when you stop asking, “What syntax do I need?” and start asking, “What decision does this query support?”

---

## 10.2 Grading Database Refresher

The Grading Database is the running case for this chapter. It is useful because it contains the same design challenges found in business systems: people, events, rules, transactions, deadlines, and performance measures.

### Core Tables

| Table | What It Stores | Typical Questions |
|---|---|---|
| `STUDENT` | Student identity and contact information | Who is enrolled? Which session is a student in? |
| `ASSIGNMENT_TYPE` | Category-level grading rules | How many quizzes are there? How much is each category worth? |
| `DELIVERABLE` | Specific graded items | When is Quiz 2 due? What topic does Exam 1 cover? |
| `STUDENT_GRADE` | One student's score on one deliverable | What did each student earn? Who is missing work? |
| `SCHEDULE` | Class meetings, weeks, dates, and topics | What happened in Week 6? Which classes occurred before spring break? |
| `ATTENDANCE` | Whether a student attended a class meeting | How often did each student attend? |
| `GRADE_SCALE` | Letter-grade thresholds | Which letter grade corresponds to a numeric score? |

### The Main Relational Pathways

Most Chapter 9 queries use one of three pathways.

#### Student Performance Pathway

```text
STUDENT -> STUDENT_GRADE -> DELIVERABLE -> ASSIGNMENT_TYPE
```

Use this path when analyzing scores, deliverables, weighted grades, and assignment categories.

#### Attendance Pathway

```text
STUDENT -> ATTENDANCE -> SCHEDULE
```

Use this path when analyzing attendance rates, weekly trends, or class-session participation.

#### Grade Interpretation Pathway

```text
STUDENT_GRADE -> GRADE_SCALE
```

Use this path when converting numeric scores into letter grades or performance bands.

### Why the Schema Matters

In a flat spreadsheet, a report may already contain student names, deliverable labels, due dates, and scores in one row. In a relational database, those facts are intentionally separated. That separation reduces redundancy, but it means useful reports must be reconstructed through joins.

That is not a weakness. It is the point of relational design.

A normalized database stores facts cleanly. SQL turns those facts into views, summaries, and decisions.

---

## 10.3 Diagnosing Data Problems with SQL

Advanced SQL is not only for producing polished reports. It also helps diagnose whether the data can be trusted.

Before building dashboards or calculating grades, an analyst should ask:

- Are there duplicate records?
- Are there conflicting values?
- Are required values missing?
- Are there impossible scores?
- Are there orphaned records?
- Are business rules being violated?

SQL can answer those questions directly.

### 10.3.1 Detecting Repeated Student Details in a Flat Table

Suppose you inherit a flat table named `GRADE_FLAT`.

| StudentID | FirstName | LastName | Email | DeliverableType | DeliverableNumber | DueDate | Score |
|---:|---|---|---|---|---:|---|---:|
| 101 | Alice | Johnson | alice@uni.edu | Quiz | 1 | 2026-02-05 | 92 |
| 101 | Alice | Johnson | alice@uni.edu | Quiz | 2 | 2026-02-12 | 88 |
| 101 | Alice | Johnson | alice@uni.edu | Exam | 1 | 2026-03-10 | 91 |
| 102 | Bob | Lee | bob@uni.edu | Quiz | 1 | 2026-02-05 | 77 |

Alice's information repeats because one row combines student facts and grade facts.

```sql
SELECT StudentID,
       FirstName,
       LastName,
       Email,
       COUNT(*) AS TimesRepeated
FROM GRADE_FLAT
GROUP BY StudentID, FirstName, LastName, Email
HAVING COUNT(*) > 1;
```

If Alice appears in three rows, the result shows that her student details are stored three times. In a normalized design, Alice should appear once in `STUDENT`.

### 10.3.2 Detecting Conflicting Emails

Repeated data becomes dangerous when the copies disagree.

```sql
SELECT StudentID,
       COUNT(DISTINCT Email) AS EmailVersions
FROM GRADE_FLAT
GROUP BY StudentID
HAVING COUNT(DISTINCT Email) > 1;
```

If this query returns rows, the same student has more than one email value. That is an update anomaly. Someone corrected the email in one row but not all rows.

#### Common Mistake

Do not assume duplicate data is harmless. Duplicate data creates more places where reality can split into competing versions.

### 10.3.3 Detecting Inconsistent Deliverable Definitions

Deliverable details should be stable. Quiz 1 should not have different due dates in different rows.

```sql
SELECT DeliverableType,
       DeliverableNumber,
       COUNT(DISTINCT DueDate) AS DueDateVersions
FROM GRADE_FLAT
GROUP BY DeliverableType, DeliverableNumber
HAVING COUNT(DISTINCT DueDate) > 1;
```

If this returns results, the same deliverable has conflicting due dates. That means the table is mixing deliverable facts with student-grade facts.

### 10.3.4 Detecting Duplicate Grade Records

In a normalized grade table, the business rule is usually:

> One student should have one score for one deliverable.

Even if `STUDENT_GRADE` has a surrogate key such as `GradeID`, the pair `(StudentID, DeliverableID)` should usually be unique.

```sql
SELECT StudentID,
       DeliverableID,
       COUNT(*) AS NumberOfRows
FROM STUDENT_GRADE
GROUP BY StudentID, DeliverableID
HAVING COUNT(*) > 1;
```

If this query returns rows, the database may contain duplicate score records.

A structural fix is a composite `UNIQUE` constraint:

```sql
ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT uq_student_deliverable
UNIQUE (StudentID, DeliverableID);
```

Platform note: Some systems, including SQLite, have limits on adding constraints after table creation. In those systems, define the constraint when creating the table or recreate the table with the correct structure.

### 10.3.5 Detecting Scores Outside the Valid Range

```sql
SELECT GradeID,
       StudentID,
       DeliverableID,
       Score
FROM STUDENT_GRADE
WHERE Score < 0
   OR Score > 100;
```

This query checks whether values violate the expected grading range.

A structural fix is a `CHECK` constraint:

```sql
CHECK (Score BETWEEN 0 AND 100)
```

### 10.3.6 Detecting Orphaned Grade Records

An orphan record occurs when a child table refers to a parent record that does not exist.

```sql
SELECT sg.GradeID,
       sg.StudentID
FROM STUDENT_GRADE AS sg
LEFT JOIN STUDENT AS s
  ON sg.StudentID = s.StudentID
WHERE s.StudentID IS NULL;
```

This query finds grade records linked to nonexistent students. In a correctly enforced relational database, referential integrity should prevent this.

#### Key Takeaway

Diagnostic SQL helps you test the health of a database before trusting its reports.

---

## 10.4 Advanced JOIN Patterns

Joins are the everyday language of relational databases. Basic joins retrieve related facts. Advanced joins help answer richer questions: complete reports, missing work, orphan records, expected-but-absent events, and category-level performance.

### 10.4.1 Complete Gradebook Report

A complete gradebook report needs student names, deliverable labels, due dates, topics, and scores.

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       d.DeliverableType,
       d.DeliverableNumber,
       d.DueDate,
       d.Topic,
       sg.Score
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
JOIN DELIVERABLE AS d
  ON sg.DeliverableID = d.DeliverableID
ORDER BY s.LastName,
         s.FirstName,
         d.DeliverableType,
         d.DeliverableNumber;
```

The stored data is normalized. The query reconstructs a report-friendly view.

### 10.4.2 Adding Assignment-Type Rules

Sometimes a score needs context. A score of 18 is excellent if the deliverable is worth 20 points, but weak if it is worth 100.

```sql
SELECT s.FirstName,
       s.LastName,
       d.DeliverableType,
       d.DeliverableNumber,
       at.PointsPerOne,
       sg.Score
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
JOIN DELIVERABLE AS d
  ON sg.DeliverableID = d.DeliverableID
JOIN ASSIGNMENT_TYPE AS at
  ON d.DeliverableType = at.DeliverableType
ORDER BY s.LastName, d.DeliverableType, d.DeliverableNumber;
```

This query follows the pathway:

```text
STUDENT -> STUDENT_GRADE -> DELIVERABLE -> ASSIGNMENT_TYPE
```

### 10.4.3 Finding Missing Grades with `CROSS JOIN` and `LEFT JOIN`

Missing work is tricky because missing rows are not visible unless we first generate the rows that should exist.

The logic is:

1. Every student should be paired with every deliverable.
2. A recorded grade may or may not exist for that pair.
3. Missing grades are the expected pairs with no matching grade row.

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       d.DeliverableID,
       d.DeliverableType,
       d.DeliverableNumber,
       d.DueDate
FROM STUDENT AS s
CROSS JOIN DELIVERABLE AS d
LEFT JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
 AND d.DeliverableID = sg.DeliverableID
WHERE sg.GradeID IS NULL
ORDER BY s.LastName, d.DueDate;
```

`CROSS JOIN` creates the expected grid. `LEFT JOIN` checks whether each expected student-deliverable pair has a grade. `WHERE sg.GradeID IS NULL` keeps only missing grade rows.

#### Common Mistake

Do not try to find missing grades by searching only `STUDENT_GRADE`. Missing grades are absent from that table. You need an expected list first.

### 10.4.4 Finding Deliverables with No Submissions

```sql
SELECT d.DeliverableID,
       d.DeliverableType,
       d.DeliverableNumber,
       d.DueDate,
       d.Topic
FROM DELIVERABLE AS d
LEFT JOIN STUDENT_GRADE AS sg
  ON d.DeliverableID = sg.DeliverableID
WHERE sg.GradeID IS NULL;
```

This query is useful for checking whether a deliverable has been created but no grade records have been entered.

### 10.4.5 Joining Attendance to the Schedule

Attendance analysis uses a different relational path.

```sql
SELECT s.FirstName,
       s.LastName,
       sch.Week,
       sch.ClassDate,
       sch.Topic,
       a.Attended
FROM STUDENT AS s
JOIN ATTENDANCE AS a
  ON s.StudentID = a.StudentID
JOIN SCHEDULE AS sch
  ON a.ClassNum = sch.ClassNum
ORDER BY s.LastName, sch.ClassDate;
```

The query reconstructs attendance history from three tables.

### 10.4.6 Join Checklist

Before writing a join, ask:

1. What is the main event table?
2. Which table provides labels or context?
3. Which key connects the tables?
4. Should unmatched rows be preserved?

| Situation | Preferred Join |
|---|---|
| Only matched records matter | `INNER JOIN` |
| Need all rows from the left table | `LEFT JOIN` |
| Need expected combinations | `CROSS JOIN` followed by `LEFT JOIN` |
| Need to diagnose missing parent records | `LEFT JOIN` plus `IS NULL` |

---

## 10.5 Cleaning and Conditional Functions

Real data is rarely clean. Names have extra spaces. Emails use inconsistent case. Scores may be missing. Access uses functions such as `Nz()` and `IIf()`, while other SQL systems use functions such as `COALESCE()` and `CASE`.

This section treats Access as a gateway. You learn the idea in Access, then recognize the portable SQL equivalent.

### 10.5.1 Access SQL and Portable SQL Compared

| Need | Microsoft Access | SQLite / PostgreSQL / Common SQL Pattern |
|---|---|---|
| Replace `NULL` with a default | `Nz([Score], 0)` | `COALESCE(Score, 0)` |
| Conditional value | `IIf([Score] >= 60, "Pass", "Fail")` | `CASE WHEN Score >= 60 THEN 'Pass' ELSE 'Fail' END` |
| Current date | `Date()` | `CURRENT_DATE` or `DATE('now')` in SQLite |
| Current date and time | `Now()` | `CURRENT_TIMESTAMP` or `datetime('now')` in SQLite |
| Days between dates | `DateDiff("d", [StartDate], [EndDate])` | Platform-specific: `DATEDIFF(...)`, date subtraction, or `JULIANDAY()` |
| Add days to a date | `DateAdd("d", 30, [DueDate])` | Platform-specific: `DATEADD(...)`, `+ INTERVAL`, or `DATE(..., '+30 days')` |
| Extract year | `DatePart("yyyy", [DueDate])` | `EXTRACT(YEAR FROM DueDate)`, `YEAR(DueDate)`, or `strftime('%Y', DueDate)` |

The concept is portable. The function name is not always portable.

### 10.5.2 Replacing Missing Scores for Display

A missing score is not automatically a zero. It may mean not graded yet, not submitted, or not applicable. Be careful.

#### Access

```sql
SELECT StudentID,
       DeliverableID,
       Nz([Score], 0) AS DisplayScore
FROM STUDENT_GRADE;
```

#### Standard-style SQL

```sql
SELECT StudentID,
       DeliverableID,
       COALESCE(Score, 0) AS DisplayScore
FROM STUDENT_GRADE;
```

This changes the query result. It does not change the stored value.

#### Warning

Only treat missing scores as zero if the grading policy says missing work should count as zero. Otherwise, display a label such as `Not Graded`.

```sql
SELECT StudentID,
       DeliverableID,
       COALESCE(CAST(Score AS TEXT), 'Not Graded') AS ScoreStatus
FROM STUDENT_GRADE;
```

### 10.5.3 Conditional Labels with `IIf()` and `CASE`

#### Access

```sql
SELECT FirstName,
       LastName,
       IIf([Score] >= 60, "Pass", "Fail") AS PassFail
FROM STUDENT_GRADE;
```

This example assumes the score is available in the query context.

#### Portable SQL

```sql
SELECT s.FirstName,
       s.LastName,
       sg.Score,
       CASE
           WHEN sg.Score >= 60 THEN 'Pass'
           ELSE 'Fail'
       END AS PassFail
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID;
```

`CASE` is more verbose than `IIf()`, but it is more portable and easier to extend.

### 10.5.4 Multi-Level Performance Bands

```sql
SELECT s.FirstName,
       s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore,
       CASE
           WHEN AVG(sg.Score) >= 90 THEN 'High Performance'
           WHEN AVG(sg.Score) >= 80 THEN 'On Track'
           WHEN AVG(sg.Score) >= 70 THEN 'Needs Attention'
           ELSE 'At Risk'
       END AS PerformanceBand
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY AverageScore ASC;
```

This query converts raw averages into meaningful categories.

### 10.5.5 Cleaning Text Values

#### Remove Extra Spaces

```sql
SELECT TRIM(FirstName) AS CleanFirstName,
       TRIM(LastName) AS CleanLastName
FROM STUDENT;
```

#### Standardize Emails

```sql
UPDATE STUDENT
SET Email = LOWER(TRIM(Email));
```

Use this only after checking the target rows. In production data, always verify before modifying.

#### Find Suspicious Email Formats

```sql
SELECT StudentID,
       FirstName,
       LastName,
       Email
FROM STUDENT
WHERE Email NOT LIKE '%@%.%';
```

This is not perfect email validation, but it catches obvious problems.

---

## 10.6 Analytical Aggregation

Aggregation turns many rows into summary information. This is where SQL becomes a business analytics tool.

### 10.6.1 Average Score Per Student

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore,
       COUNT(sg.GradeID) AS NumberOfGrades
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY AverageScore DESC;
```

This query produces student-level performance summaries.

### 10.6.2 Average Score Per Deliverable

```sql
SELECT d.DeliverableType,
       d.DeliverableNumber,
       d.Topic,
       ROUND(AVG(sg.Score), 2) AS ClassAverage,
       MIN(sg.Score) AS LowestScore,
       MAX(sg.Score) AS HighestScore,
       MAX(sg.Score) - MIN(sg.Score) AS ScoreSpread
FROM DELIVERABLE AS d
JOIN STUDENT_GRADE AS sg
  ON d.DeliverableID = sg.DeliverableID
GROUP BY d.DeliverableID,
         d.DeliverableType,
         d.DeliverableNumber,
         d.Topic
ORDER BY ClassAverage ASC;
```

This identifies difficult or uneven deliverables.

### 10.6.3 Assignment-Type Averages

```sql
SELECT d.DeliverableType,
       ROUND(AVG(sg.Score), 2) AS TypeAverage,
       COUNT(*) AS TotalGradeRows
FROM DELIVERABLE AS d
JOIN STUDENT_GRADE AS sg
  ON d.DeliverableID = sg.DeliverableID
GROUP BY d.DeliverableType
ORDER BY TypeAverage ASC;
```

This helps compare quizzes, exams, projects, and other categories.

### 10.6.4 `HAVING` for Group Filters

`WHERE` filters rows before aggregation. `HAVING` filters groups after aggregation.

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
HAVING AVG(sg.Score) < 75
ORDER BY AverageScore ASC;
```

This returns groups—students—whose average is below 75.

#### Common Mistake

Do not write `WHERE AVG(Score) < 75`. Aggregate functions belong in `HAVING`, not `WHERE`.

### 10.6.5 Conditional Aggregation

Conditional aggregation counts or sums only the rows that meet a condition.

```sql
SELECT d.DeliverableType,
       d.DeliverableNumber,
       COUNT(CASE WHEN sg.Score >= 70 THEN 1 END) AS PassingCount,
       COUNT(CASE WHEN sg.Score < 70 THEN 1 END) AS FailingCount,
       COUNT(CASE WHEN sg.Score IS NULL THEN 1 END) AS MissingCount
FROM DELIVERABLE AS d
CROSS JOIN STUDENT AS s
LEFT JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
 AND d.DeliverableID = sg.DeliverableID
GROUP BY d.DeliverableID, d.DeliverableType, d.DeliverableNumber
ORDER BY d.DeliverableType, d.DeliverableNumber;
```

This query creates a deliverable-level performance dashboard.

### 10.6.6 Score Bands

```sql
SELECT CASE
           WHEN Score >= 90 THEN '90-100'
           WHEN Score >= 80 THEN '80-89'
           WHEN Score >= 70 THEN '70-79'
           WHEN Score >= 60 THEN '60-69'
           ELSE 'Below 60'
       END AS ScoreBand,
       COUNT(*) AS NumberOfScores
FROM STUDENT_GRADE
GROUP BY CASE
             WHEN Score >= 90 THEN '90-100'
             WHEN Score >= 80 THEN '80-89'
             WHEN Score >= 70 THEN '70-79'
             WHEN Score >= 60 THEN '60-69'
             ELSE 'Below 60'
         END
ORDER BY ScoreBand;
```

Some systems allow grouping by the alias `ScoreBand`; others require repeating the expression. Repeating the expression is more portable.

### 10.6.7 Attendance Rate Per Student

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       COUNT(*) AS ClassesRecorded,
       SUM(CASE WHEN a.Attended = 1 THEN 1 ELSE 0 END) AS ClassesAttended,
       ROUND(
           100.0 * SUM(CASE WHEN a.Attended = 1 THEN 1 ELSE 0 END) / COUNT(*),
           1
       ) AS AttendanceRate
FROM STUDENT AS s
JOIN ATTENDANCE AS a
  ON s.StudentID = a.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY AttendanceRate ASC;
```

The `100.0` forces decimal arithmetic. Without it, some systems may perform integer division.

### 10.6.8 `COUNT(*)` vs. `COUNT(column)`

| Expression | Meaning |
|---|---|
| `COUNT(*)` | Counts rows, including rows with `NULL` values. |
| `COUNT(Score)` | Counts rows where `Score` is not `NULL`. |
| `COUNT(DISTINCT StudentID)` | Counts unique student IDs. |

Example:

```sql
SELECT COUNT(*) AS TotalRows,
       COUNT(Score) AS RowsWithScores
FROM STUDENT_GRADE;
```

If `TotalRows` is larger than `RowsWithScores`, some scores are missing.

---

## 10.7 Date and Time Queries

Dates are central to business logic. Organizations care about deadlines, delivery windows, transaction dates, payment dates, attendance dates, and reporting periods. In the Grading Database, dates support due-date tracking, attendance windows, weekly trends, and late-work reports.

Date syntax varies across platforms, so this section emphasizes the concept and then shows platform patterns.

### 10.7.1 Date Function Reference

| Need | Access | SQLite | PostgreSQL | SQL Server-style |
|---|---|---|---|---|
| Current date | `Date()` | `DATE('now')` | `CURRENT_DATE` | `CAST(GETDATE() AS date)` |
| Current date/time | `Now()` | `datetime('now')` | `CURRENT_TIMESTAMP` | `GETDATE()` |
| Add 7 days | `DateAdd("d", 7, [DueDate])` | `DATE(DueDate, '+7 days')` | `DueDate + INTERVAL '7 days'` | `DATEADD(day, 7, DueDate)` |
| Days between dates | `DateDiff("d", [Start], [End])` | `JULIANDAY(End) - JULIANDAY(Start)` | `EndDate - StartDate` | `DATEDIFF(day, StartDate, EndDate)` |
| Extract year | `DatePart("yyyy", [DueDate])` | `strftime('%Y', DueDate)` | `EXTRACT(YEAR FROM DueDate)` | `YEAR(DueDate)` |
| Extract month | `DatePart("m", [DueDate])` | `strftime('%m', DueDate)` | `EXTRACT(MONTH FROM DueDate)` | `MONTH(DueDate)` |

Do not memorize every dialect. Learn the pattern: current date, add time, subtract dates, extract parts.

### 10.7.2 Upcoming Deliverables

#### SQLite

```sql
SELECT DeliverableType,
       DeliverableNumber,
       DueDate,
       Topic
FROM DELIVERABLE
WHERE DueDate BETWEEN DATE('now') AND DATE('now', '+14 days')
ORDER BY DueDate;
```

#### Access

```sql
SELECT DeliverableType,
       DeliverableNumber,
       DueDate,
       Topic
FROM DELIVERABLE
WHERE DueDate BETWEEN Date() AND DateAdd("d", 14, Date())
ORDER BY DueDate;
```

### 10.7.3 Overdue Deliverables Without Grades

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       d.DeliverableType,
       d.DeliverableNumber,
       d.DueDate
FROM STUDENT AS s
CROSS JOIN DELIVERABLE AS d
LEFT JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
 AND d.DeliverableID = sg.DeliverableID
WHERE d.DueDate < CURRENT_DATE
  AND sg.GradeID IS NULL
ORDER BY d.DueDate, s.LastName;
```

For SQLite, replace `CURRENT_DATE` with `DATE('now')`. For Access, use `Date()`.

### 10.7.4 Days Since Due Date

#### Access

```sql
SELECT DeliverableType,
       DeliverableNumber,
       DueDate,
       DateDiff("d", [DueDate], Date()) AS DaysPastDue
FROM DELIVERABLE
WHERE DueDate < Date();
```

#### SQLite

```sql
SELECT DeliverableType,
       DeliverableNumber,
       DueDate,
       CAST(JULIANDAY(DATE('now')) - JULIANDAY(DueDate) AS INTEGER) AS DaysPastDue
FROM DELIVERABLE
WHERE DueDate < DATE('now');
```

### 10.7.5 Attendance Trend by Week

```sql
SELECT sch.Week,
       COUNT(*) AS AttendanceRows,
       SUM(CASE WHEN a.Attended = 1 THEN 1 ELSE 0 END) AS PresentRows,
       ROUND(
           100.0 * SUM(CASE WHEN a.Attended = 1 THEN 1 ELSE 0 END) / COUNT(*),
           1
       ) AS AttendanceRate
FROM SCHEDULE AS sch
JOIN ATTENDANCE AS a
  ON sch.ClassNum = a.ClassNum
GROUP BY sch.Week
ORDER BY sch.Week;
```

This query turns attendance records into a weekly engagement trend.

---

## 10.8 Weighted Grades and Policy Tables

A final grade is rarely a simple average of all scores. Different categories may carry different weights. Quizzes may count for 20 percent, exams for 40 percent, projects for 30 percent, and participation for 10 percent.

The correct design principle is:

> Store grading policy in a table, not inside scattered formulas.

### 10.8.1 Example Weight Table

```text
GRADE_WEIGHT(
    DeliverableType,
    CategoryWeight
)
```

| DeliverableType | CategoryWeight |
|---|---:|
| Quiz | 0.20 |
| Homework | 0.25 |
| Exam | 0.35 |
| Project | 0.20 |

The weights should sum to 1.0.

```sql
SELECT SUM(CategoryWeight) AS TotalWeight
FROM GRADE_WEIGHT;
```

If the result is not 1.0, the grading policy is incomplete or inconsistent.

### 10.8.2 Average Score by Student and Category

First compute each student's average within each category.

```sql
SELECT sg.StudentID,
       d.DeliverableType,
       ROUND(AVG(sg.Score), 2) AS CategoryAverage
FROM STUDENT_GRADE AS sg
JOIN DELIVERABLE AS d
  ON sg.DeliverableID = d.DeliverableID
GROUP BY sg.StudentID, d.DeliverableType;
```

This is the first stage of weighted grading.

### 10.8.3 Weighted Final Grade Using a CTE

```sql
WITH CategoryAverages AS (
    SELECT sg.StudentID,
           d.DeliverableType,
           AVG(sg.Score) AS CategoryAverage
    FROM STUDENT_GRADE AS sg
    JOIN DELIVERABLE AS d
      ON sg.DeliverableID = d.DeliverableID
    GROUP BY sg.StudentID, d.DeliverableType
)
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(SUM(ca.CategoryAverage * gw.CategoryWeight), 2) AS WeightedFinalGrade
FROM STUDENT AS s
JOIN CategoryAverages AS ca
  ON s.StudentID = ca.StudentID
JOIN GRADE_WEIGHT AS gw
  ON ca.DeliverableType = gw.DeliverableType
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY WeightedFinalGrade DESC;
```

This query has two stages:

1. Calculate category averages.
2. Multiply each category average by its category weight and sum the result.

### 10.8.4 Handling Missing Categories

A student may not yet have grades in every category. That creates a policy question:

- Should missing categories be ignored until graded?
- Should missing work count as zero?
- Should the grade be calculated only through completed deliverables?

SQL can implement any of these policies, but the policy must be explicit.

#### Example: Calculate Using Only Completed Categories

```sql
WITH CategoryAverages AS (
    SELECT sg.StudentID,
           d.DeliverableType,
           AVG(sg.Score) AS CategoryAverage
    FROM STUDENT_GRADE AS sg
    JOIN DELIVERABLE AS d
      ON sg.DeliverableID = d.DeliverableID
    GROUP BY sg.StudentID, d.DeliverableType
)
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(
           SUM(ca.CategoryAverage * gw.CategoryWeight) / SUM(gw.CategoryWeight),
           2
       ) AS CurrentWeightedGrade
FROM STUDENT AS s
JOIN CategoryAverages AS ca
  ON s.StudentID = ca.StudentID
JOIN GRADE_WEIGHT AS gw
  ON ca.DeliverableType = gw.DeliverableType
GROUP BY s.StudentID, s.FirstName, s.LastName;
```

This divides by the sum of weights represented by completed categories. It is an up-to-date grade, not necessarily the final semester grade.

### 10.8.5 Joining to the Grade Scale

```sql
WITH FinalGrades AS (
    SELECT s.StudentID,
           s.FirstName,
           s.LastName,
           ROUND(SUM(ca.CategoryAverage * gw.CategoryWeight), 2) AS FinalNumericGrade
    FROM STUDENT AS s
    JOIN (
        SELECT sg.StudentID,
               d.DeliverableType,
               AVG(sg.Score) AS CategoryAverage
        FROM STUDENT_GRADE AS sg
        JOIN DELIVERABLE AS d
          ON sg.DeliverableID = d.DeliverableID
        GROUP BY sg.StudentID, d.DeliverableType
    ) AS ca
      ON s.StudentID = ca.StudentID
    JOIN GRADE_WEIGHT AS gw
      ON ca.DeliverableType = gw.DeliverableType
    GROUP BY s.StudentID, s.FirstName, s.LastName
)
SELECT fg.StudentID,
       fg.FirstName,
       fg.LastName,
       fg.FinalNumericGrade,
       gs.LetterGrade
FROM FinalGrades AS fg
JOIN GRADE_SCALE AS gs
  ON fg.FinalNumericGrade BETWEEN gs.MinScore AND gs.MaxScore
ORDER BY fg.FinalNumericGrade DESC;
```

The grading scale is stored as data. The query uses it as a lookup rule.

#### Common Mistake

Do not average category averages unless every category has the same weight. Use a weight table.

---

## 10.9 Window Functions

Ordinary aggregation collapses rows. Window functions calculate summaries while preserving detail rows.

That distinction matters.

A `GROUP BY` query can tell you each student's average score. A window function can show each individual score and the student's average next to it.

### 10.9.1 `GROUP BY` vs. Window Functions

| Need | Use |
|---|---|
| One row per group | `GROUP BY` |
| Keep detail rows and add summary values | Window function |
| Rank rows | Window function |
| Running totals | Window function |
| Moving averages | Window function |

### 10.9.2 Student Average Next to Each Score

```sql
SELECT sg.StudentID,
       sg.DeliverableID,
       sg.Score,
       ROUND(
           AVG(sg.Score) OVER (PARTITION BY sg.StudentID),
           2
       ) AS StudentAverage
FROM STUDENT_GRADE AS sg
ORDER BY sg.StudentID, sg.DeliverableID;
```

Each grade row remains visible, but the student's average appears alongside it.

### 10.9.3 Ranking Students by Average

```sql
WITH StudentAverages AS (
    SELECT s.StudentID,
           s.FirstName,
           s.LastName,
           AVG(sg.Score) AS AverageScore
    FROM STUDENT AS s
    JOIN STUDENT_GRADE AS sg
      ON s.StudentID = sg.StudentID
    GROUP BY s.StudentID, s.FirstName, s.LastName
)
SELECT StudentID,
       FirstName,
       LastName,
       ROUND(AverageScore, 2) AS AverageScore,
       RANK() OVER (ORDER BY AverageScore DESC) AS ClassRank
FROM StudentAverages;
```

`RANK()` assigns equal rank to ties and leaves gaps. `DENSE_RANK()` assigns equal rank to ties without gaps. `ROW_NUMBER()` assigns a unique sequence number even when values tie.

### 10.9.4 Running Total by Student

```sql
SELECT StudentID,
       DeliverableID,
       Score,
       SUM(Score) OVER (
           PARTITION BY StudentID
           ORDER BY DeliverableID
       ) AS RunningScoreTotal
FROM STUDENT_GRADE
ORDER BY StudentID, DeliverableID;
```

The running total resets for each student because of `PARTITION BY StudentID`.

### 10.9.5 Moving Average

```sql
SELECT StudentID,
       DeliverableID,
       Score,
       ROUND(
           AVG(Score) OVER (
               PARTITION BY StudentID
               ORDER BY DeliverableID
               ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
           ),
           2
       ) AS ThreeItemMovingAverage
FROM STUDENT_GRADE
ORDER BY StudentID, DeliverableID;
```

This smooths performance across the current and previous two deliverables.

### Platform Note

Window functions are supported in PostgreSQL and modern SQLite. Microsoft Access does not support SQL window functions directly. In Access, similar results usually require saved queries, aggregate queries, or reports.

#### Key Takeaway

Window functions are useful when you need detail and summary in the same result.

---

## 10.10 Reusable Reporting Pipelines

Writing one correct query is useful. Writing query logic that can be reused is more valuable.

Three tools help manage reusable SQL logic:

| Tool | Best For | Scope |
|---|---|---|
| **Subquery** | One calculation inside another query | Temporary, inside one query |
| **CTE** | Multi-step readable query logic | Temporary, inside one query |
| **View** | Saved reporting logic | Persistent database object |

### 10.10.1 Views as Saved Reports

A view is a saved query that behaves like a virtual table.

```sql
CREATE VIEW StudentPerformanceSummary AS
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore,
       COUNT(sg.GradeID) AS NumberOfGrades,
       CASE
           WHEN AVG(sg.Score) < 70 THEN 'At Risk'
           WHEN AVG(sg.Score) < 80 THEN 'Needs Attention'
           ELSE 'On Track'
       END AS Status
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName;
```

You can query the view like a table:

```sql
SELECT *
FROM StudentPerformanceSummary
WHERE Status = 'At Risk';
```

Views reduce repetition. Instead of rewriting the same join and average logic in many reports, define it once.

#### Access Note

Microsoft Access uses saved queries rather than SQL views in the same way PostgreSQL or SQLite do. Conceptually, a saved Access query can serve a similar role as a reusable reporting object.

### 10.10.2 CTEs for Multi-Step Logic

A Common Table Expression, or CTE, creates named temporary results inside one query.

```sql
WITH StudentAverages AS (
    SELECT StudentID,
           AVG(Score) AS AverageScore
    FROM STUDENT_GRADE
    GROUP BY StudentID
),
StudentStatus AS (
    SELECT StudentID,
           AverageScore,
           CASE
               WHEN AverageScore < 70 THEN 'At Risk'
               WHEN AverageScore < 80 THEN 'Needs Attention'
               ELSE 'On Track'
           END AS Status
    FROM StudentAverages
)
SELECT s.FirstName,
       s.LastName,
       ROUND(ss.AverageScore, 2) AS AverageScore,
       ss.Status
FROM StudentStatus AS ss
JOIN STUDENT AS s
  ON ss.StudentID = s.StudentID
ORDER BY ss.AverageScore ASC;
```

The CTE makes the query easier to read because each stage has a name.

### 10.10.3 Subqueries for One-Step Comparisons

A subquery is a query inside another query.

```sql
SELECT s.FirstName,
       s.LastName,
       sg.Score
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
WHERE sg.Score > (
    SELECT AVG(Score)
    FROM STUDENT_GRADE
);
```

The inner query calculates the overall average. The outer query returns scores above that average.

### 10.10.4 `EXISTS` for Relationship Checks

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName
FROM STUDENT AS s
WHERE EXISTS (
    SELECT 1
    FROM STUDENT_GRADE AS sg
    JOIN DELIVERABLE AS d
      ON sg.DeliverableID = d.DeliverableID
    WHERE sg.StudentID = s.StudentID
      AND d.DeliverableType = 'Exam'
);
```

This returns students who have at least one exam score.

### 10.10.5 `UNION` and `UNION ALL`

`UNION` combines compatible query results and removes duplicates. `UNION ALL` keeps duplicates.

```sql
SELECT StudentID, 'Grade' AS ActivitySource
FROM STUDENT_GRADE
UNION ALL
SELECT StudentID, 'Attendance' AS ActivitySource
FROM ATTENDANCE;
```

This creates a combined activity list. `UNION ALL` is appropriate because each grade and attendance record is a distinct activity.

### 10.10.6 Choosing the Right Tool

| Situation | Best Tool |
|---|---|
| Short one-time comparison | Subquery |
| Multi-step logic that should remain readable | CTE |
| Logic reused across reports or dashboards | View |
| Combining similar result sets | `UNION` or `UNION ALL` |
| Access-based reusable query | Saved query |

#### Key Takeaway

Reusable SQL logic is part of database design. Good queries become analytical infrastructure.

---

## 10.11 Safe Data Modification

Advanced SQL includes modifying data. That power requires discipline.

The safest workflow is:

1. Write a `SELECT` statement to identify the rows.
2. Verify the result.
3. Convert the `SELECT` into `UPDATE` or `DELETE`.
4. Run the modification only when the target rows are correct.

### 10.11.1 Safe `UPDATE`

Suppose Alice's email needs correction.

First verify:

```sql
SELECT StudentID,
       FirstName,
       LastName,
       Email
FROM STUDENT
WHERE StudentID = 101;
```

Then update:

```sql
UPDATE STUDENT
SET Email = 'alice.johnson@albany.edu'
WHERE StudentID = 101;
```

Then verify again:

```sql
SELECT StudentID,
       FirstName,
       LastName,
       Email
FROM STUDENT
WHERE StudentID = 101;
```

### 10.11.2 Updating Scores

```sql
SELECT GradeID,
       StudentID,
       DeliverableID,
       Score
FROM STUDENT_GRADE
WHERE GradeID = 42;
```

```sql
UPDATE STUDENT_GRADE
SET Score = 88
WHERE GradeID = 42;
```

The `WHERE` clause should target one known row.

### 10.11.3 Safe `DELETE`

Before deleting, select.

```sql
SELECT *
FROM ATTENDANCE
WHERE AttendanceID = 10;
```

Then delete only if the selected row is truly wrong.

```sql
DELETE FROM ATTENDANCE
WHERE AttendanceID = 10;
```

### 10.11.4 Dangerous Patterns

#### Missing `WHERE`

```sql
UPDATE STUDENT
SET Email = 'unknown@albany.edu';
```

This changes every student. That is almost never what you want.

```sql
DELETE FROM STUDENT_GRADE;
```

This removes every grade row. Again: little query, big disaster. SQL has no shame; it will do what you asked, not what you meant.

### 10.11.5 Transactions as a Safety Preview

Some systems allow changes inside a transaction.

```sql
BEGIN TRANSACTION;

UPDATE STUDENT_GRADE
SET Score = 88
WHERE GradeID = 42;

-- If correct:
COMMIT;

-- If wrong:
ROLLBACK;
```

Transactions are covered more fully later in the book. For now, remember the principle: when modifying important data, build in a way to verify and recover.

---

## 10.12 Integrated Example: At-Risk Student Report

This section pulls the chapter together. Suppose an instructor wants a report that identifies students who may need support.

The report should include:

- student name,
- average score,
- number of missing grades,
- attendance rate,
- risk category.

This requires several ideas from the chapter:

- joins,
- expected student-deliverable combinations,
- missing-grade detection,
- aggregation,
- conditional logic,
- CTEs.

### Step 1: Count Missing Grades

```sql
WITH MissingGrades AS (
    SELECT s.StudentID,
           COUNT(*) AS MissingGradeCount
    FROM STUDENT AS s
    CROSS JOIN DELIVERABLE AS d
    LEFT JOIN STUDENT_GRADE AS sg
      ON s.StudentID = sg.StudentID
     AND d.DeliverableID = sg.DeliverableID
    WHERE sg.GradeID IS NULL
    GROUP BY s.StudentID
)
SELECT *
FROM MissingGrades;
```

### Step 2: Compute Score Averages

```sql
WITH ScoreAverages AS (
    SELECT StudentID,
           AVG(Score) AS AverageScore
    FROM STUDENT_GRADE
    GROUP BY StudentID
)
SELECT *
FROM ScoreAverages;
```

### Step 3: Compute Attendance Rates

```sql
WITH AttendanceRates AS (
    SELECT StudentID,
           100.0 * SUM(CASE WHEN Attended = 1 THEN 1 ELSE 0 END) / COUNT(*) AS AttendanceRate
    FROM ATTENDANCE
    GROUP BY StudentID
)
SELECT *
FROM AttendanceRates;
```

### Step 4: Combine the Stages

```sql
WITH MissingGrades AS (
    SELECT s.StudentID,
           COUNT(*) AS MissingGradeCount
    FROM STUDENT AS s
    CROSS JOIN DELIVERABLE AS d
    LEFT JOIN STUDENT_GRADE AS sg
      ON s.StudentID = sg.StudentID
     AND d.DeliverableID = sg.DeliverableID
    WHERE sg.GradeID IS NULL
    GROUP BY s.StudentID
),
ScoreAverages AS (
    SELECT StudentID,
           AVG(Score) AS AverageScore
    FROM STUDENT_GRADE
    GROUP BY StudentID
),
AttendanceRates AS (
    SELECT StudentID,
           100.0 * SUM(CASE WHEN Attended = 1 THEN 1 ELSE 0 END) / COUNT(*) AS AttendanceRate
    FROM ATTENDANCE
    GROUP BY StudentID
)
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(COALESCE(sa.AverageScore, 0), 2) AS AverageScore,
       COALESCE(mg.MissingGradeCount, 0) AS MissingGradeCount,
       ROUND(COALESCE(ar.AttendanceRate, 0), 1) AS AttendanceRate,
       CASE
           WHEN COALESCE(sa.AverageScore, 0) < 70
             OR COALESCE(ar.AttendanceRate, 0) < 70
             OR COALESCE(mg.MissingGradeCount, 0) >= 3
           THEN 'High Risk'
           WHEN COALESCE(sa.AverageScore, 0) < 80
             OR COALESCE(ar.AttendanceRate, 0) < 80
             OR COALESCE(mg.MissingGradeCount, 0) >= 1
           THEN 'Needs Attention'
           ELSE 'On Track'
       END AS RiskCategory
FROM STUDENT AS s
LEFT JOIN ScoreAverages AS sa
  ON s.StudentID = sa.StudentID
LEFT JOIN MissingGrades AS mg
  ON s.StudentID = mg.StudentID
LEFT JOIN AttendanceRates AS ar
  ON s.StudentID = ar.StudentID
ORDER BY RiskCategory, AverageScore ASC;
```

### Reading the Query

This query is long, but it is not mysterious.

| CTE | What It Does |
|---|---|
| `MissingGrades` | Counts expected student-deliverable pairs with no grade. |
| `ScoreAverages` | Calculates each student's average score. |
| `AttendanceRates` | Calculates each student's attendance percentage. |
| Final `SELECT` | Joins the pieces and labels each student by risk category. |

This is what advanced SQL looks like in practice: not a single clever trick, but a readable pipeline of smaller logical steps.

#### Key Takeaway

Advanced SQL helps transform normalized data into actionable reports without giving up data integrity.

---

## Key Concepts

### Foundational Ideas

- Advanced SQL extends basic query logic into reusable analysis and reporting workflows.
- A query should begin with a clear business question.
- The main event table often determines the structure of the query.
- Normalized storage requires joins, but it produces cleaner and more trustworthy reporting.
- Diagnostic SQL can reveal redundancy, inconsistency, duplicates, impossible values, and orphan records.

### Query Patterns

- `INNER JOIN` returns matched records.
- `LEFT JOIN` preserves all rows from the left table and helps identify missing matches.
- `CROSS JOIN` is useful for creating expected combinations, such as every student paired with every deliverable.
- `GROUP BY` summarizes rows into groups.
- `HAVING` filters groups after aggregation.
- Conditional aggregation uses `CASE` inside aggregate functions to count or summarize selected rows.
- Window functions calculate rankings, running totals, and moving averages while preserving detail rows.
- Views, CTEs, and subqueries help manage query complexity and reuse.

### Platform Awareness

- Access uses functions such as `Nz()`, `IIf()`, `DateAdd()`, `DateDiff()`, `DatePart()`, `Date()`, and `Now()`.
- Portable SQL patterns often use `COALESCE()`, `CASE`, `CURRENT_DATE`, `CURRENT_TIMESTAMP`, and platform-specific date functions.
- Date syntax varies widely across systems, so the concept matters more than memorizing one dialect.
- Access saved queries can play a similar instructional role to SQL views, although they are not identical.

### Practical Warnings

- Missing scores are not automatically zero.
- Do not join on names when stable IDs exist.
- Do not average category averages unless weights are equal.
- Do not use `WHERE` with aggregate conditions; use `HAVING`.
- Do not run `UPDATE` or `DELETE` without first verifying the target rows.
- Do not treat long SQL queries as proof of sophistication. The best advanced SQL is readable, testable, and tied to a clear question.

---

## Chapter Summary

Chapter 9 moved SQL from basic retrieval into advanced analysis and reporting. The chapter began by reframing SQL as a way to support business questions, not merely return rows. You reviewed the Grading Database schema and learned how its normalized structure shapes query design.

The chapter then showed how SQL can diagnose data problems. Queries can reveal repeated values, conflicting emails, inconsistent deliverable definitions, duplicate grade records, invalid scores, and orphaned rows. These diagnostic patterns help determine whether a database is trustworthy before reports are built on top of it.

You then used advanced join patterns to reconstruct gradebook reports, identify missing work, connect attendance to schedules, and preserve unmatched records when needed. From there, the chapter moved into analytical SQL: aggregation, `HAVING`, conditional counts, score bands, attendance rates, and weighted-grade calculations. These examples showed how SQL can turn raw rows into metrics and decision support.

The chapter also addressed platform differences. Access functions such as `Nz()`, `IIf()`, `DateAdd()`, `DateDiff()`, and `DatePart()` are useful in Access-based workflows, while portable SQL relies on patterns such as `COALESCE()`, `CASE`, and platform-specific date functions. Understanding the concept behind each function matters more than memorizing one system's syntax.

Finally, the chapter introduced window functions, views, CTEs, subqueries, `UNION`, and safe update/delete workflows. The integrated at-risk student report showed how these ideas can work together in a readable query pipeline.

The main lesson is simple: advanced SQL is not about making queries complicated. It is about making data work reliable, explainable, and useful for decisions.

---

## Review Questions

1. What makes SQL “advanced” in this chapter?
2. Why should an advanced query begin with a business question?
3. What is the difference between the main event table and context tables?
4. How can SQL detect conflicting values in a flat table?
5. Why is `(StudentID, DeliverableID)` an important business-rule combination in `STUDENT_GRADE`?
6. When should you use `LEFT JOIN` instead of `INNER JOIN`?
7. Why is `CROSS JOIN` useful for finding missing grades?
8. What is the difference between `WHERE` and `HAVING`?
9. Why is a missing score not automatically the same as a score of zero?
10. What is the difference between Access `Nz()` and SQL `COALESCE()`?
11. What is the difference between Access `IIf()` and SQL `CASE`?
12. Why do date functions vary across SQL platforms?
13. Why should grading weights be stored in a table?
14. What problem do window functions solve that `GROUP BY` cannot solve as easily?
15. When would you use a view instead of a CTE?
16. What is the safest workflow before running an `UPDATE` or `DELETE` statement?
17. Why are reusable query artifacts important for reporting and dashboards?
18. How does the integrated at-risk student report combine multiple advanced SQL ideas?

---

## Suggested Figures

| Figure | Suggested Placement | Caption |
|---:|---|---|
| Figure 10.1 | After Chapter Roadmap | Advanced SQL as the bridge from normalized storage to reporting and decisions. |
| Figure 10.2 | Section 10.3 | Diagnostic queries reveal redundancy, conflicts, missing values, and invalid records. |
| Figure 10.3 | Section 10.4 | `CROSS JOIN` plus `LEFT JOIN` creates expected student-deliverable pairs and finds missing grades. |
| Figure 10.4 | Section 10.6 | Aggregation turns detail rows into performance metrics. |
| Figure 10.5 | Section 10.7 | Access, SQLite, PostgreSQL, and SQL Server date functions compared. |
| Figure 10.6 | Section 10.8 | Weighted-grade calculation using category averages and a weight table. |
| Figure 10.7 | Section 10.9 | `GROUP BY` collapses rows; window functions preserve rows while adding analytical values. |
| Figure 10.8 | Section 10.10 | Views, CTEs, and subqueries as different levels of reusable query logic. |
| Figure 10.9 | Section 10.12 | At-risk student reporting pipeline built from missing grades, averages, and attendance rates. |

---

## References

Connolly, T., & Begg, C. (2015). *Database systems: A practical approach to design, implementation, and management* (6th ed.). Pearson.

Date, C. J. (2004). *An introduction to database systems* (8th ed.). Pearson/Addison Wesley.

Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7th ed.). Pearson.

Hoffer, J. A., Venkataraman, R., & Topi, H. (2019). *Modern database management* (13th ed.). Pearson.

Laudon, K. C., & Laudon, J. P. (2024). *Management information systems: Managing the digital firm* (18th ed.). Pearson.

Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7th ed.). McGraw-Hill Education.
