# Chapter 10: Advanced SQL for Business Analysis

<div class="video-embed">
  <p><strong>🎬 Chapter Overview Video:</strong> Ch 10 — Advanced SQL for Business Analysis</p>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/G69DkWdnz44?si=p_0zDn9AuesExDcr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <p><a href="https://youtu.be/G69DkWdnz44">Watch on YouTube</a></p>
</div>

*Figure 10.1: Advanced SQL connects clean relational data to repeatable analysis, reporting, and business decisions.*

Chapter 5 introduced SQL as the language of relational databases. Chapter 9 showed how business requirements become a relational design. This chapter brings those ideas together by using SQL as an analytical instrument. Every technique begins with a business question and ends with a result that someone can interpret, verify, and use.

Advanced SQL is not mainly about memorizing more commands. It is about three habits:

- **Relational thinking:** identifying the entities, events, and relationships that contain the needed facts.
- **Analytical clarity:** translating a business question into the correct level of detail, filters, calculations, and categories.
- **Engineering discipline:** making SQL readable, reusable, testable, and safe.

## Learning Objectives

After completing this chapter, you should be able to:

1. **Apply** multi-table joins, grouped aggregations, calculated fields, and `CASE` logic to business questions.
2. **Analyze** query results to diagnose missing, duplicated, inconsistent, orphaned, or out-of-range data.
3. **Evaluate** whether a query's grain, join logic, handling of `NULL`, and business rules support a trustworthy conclusion.
4. **Create** a reusable reporting view that implements an explicit grading or intervention policy.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Core Concepts

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-concepts" alt="Core Concepts section icon" width="220">
</p>

## Chapter Videos

<div class="video-embed">
  <p><strong>Chapter Overview Video:</strong> Ch 10 - Advanced SQL for Business Analysis</p>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/G69DkWdnz44?si=p_0zDn9AuesExDcr" title="Chapter 10 overview video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <p><a href="https://youtu.be/G69DkWdnz44">Watch the Chapter 10 overview video on YouTube</a></p>
</div>

<div class="video-embed">
  <p><strong>How Advanced SQL Builds Analytical Pipelines</strong></p>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/kFlSsAMlYTU?si=QsF7mibkd57zyqDj" title="How Advanced SQL Builds Analytical Pipelines video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <p><a href="https://youtu.be/kFlSsAMlYTU">Watch How Advanced SQL Builds Analytical Pipelines on YouTube</a></p>
</div>

## 10.1 From Basic SQL to Analytical SQL

<img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch10-advanced-sql-queries/infographics-Mastering_Advanced_SQL_Techniques" alt="Chapter 10 infographic previewing the advanced SQL analytical arc" loading="lazy">

*Figure 10.1 — Chapter 10 infographic previewing the advanced SQL analytical arc from diagnostics to the integrated at-risk student report.*

<img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch10-advanced-sql-queries/ch10-analytical-sql-roadmap-infographic" alt="The Analytical SQL Roadmap" loading="lazy">

*Figure 10.2 — The Analytical SQL Roadmap: A visual guide to the chapter's progression from query grammar to data refactoring, advanced joins, aggregation, window functions, and reusable views.*

Basic SQL answers questions such as, "Which students scored above 90?" Advanced SQL asks how that answer was produced and whether it can be trusted:

- Is the source data complete and consistent?
- Which table stores the main event?
- Which tables provide descriptive or policy context?
- Does the calculation handle missing values correctly?
- Should the logic be reused in another report or dashboard?
- Can the query be explained to someone who did not write it?

### Four Questions Before Writing an Advanced Query

| Question | SQL implication |
| --- | --- |
| What decision will the result support? | Determines the output, level of detail, and risk of error. |
| Which table stores the event being measured? | Start from `STUDENT_GRADE`, `ATTENDANCE`, or another transaction table. |
| Which tables add context or policy? | Join to `STUDENT`, `DELIVERABLE`, `ASSIGNMENT_TYPE`, `SCHEDULE`, or `GRADE_SCALE`. |
| How should the result be delivered? | Choose aggregation, a window function, a CTE, a view, or another reusable structure. |

Consider the question, "Which students may need academic support because their average score is below 75?"

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

The syntax matters, but the reasoning matters more. The query starts with the event table, connects each score to a student, groups the events at the student level, and applies a threshold after aggregation.

### Tools Used in This Chapter

SQLite is the primary teaching engine because it supports standard joins, `CASE`, common table expressions, views, and modern window functions in a portable database file. Microsoft Access remains a parallel track for students working in the desktop interface.

| Environment | Role in this chapter |
| --- | --- |
| DB Browser for SQLite | Primary environment for the canonical chapter database and saved SQL files |
| SQLiteOnline | Fast browser-based testing when a local application is unavailable |
| Microsoft Access | Parallel workflow using saved queries and Access-specific functions |

The business logic transfers across platforms, but some syntax differs. Short **In Access** notes identify the important substitutions. PostgreSQL and Supabase return in Chapter 14, after the SQLite patterns are established.

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Advanced SQL is structured reasoning</strong></p>
  <p>A query becomes advanced when it connects trustworthy data, explicit business rules, and a decision-ready result.</p>
</div>

## 10.2 Joins as Business Connections

### 10.2.1 Grading Database Refresher

The Grading Database remains the running case. Its normalized structure allows each fact to be stored once and combined when needed.

| Table | What it stores |
| --- | --- |
| `STUDENT` | Student identity and contact information |
| `ASSIGNMENT_TYPE` | Category-level policy, such as weight and maximum points |
| `DELIVERABLE` | Specific graded items, such as Quiz 1 or Exam 2 |
| `STUDENT_GRADE` | One student's score on one deliverable |
| `SCHEDULE` | Class dates, weeks, and topics |
| `ATTENDANCE` | Whether a student attended a scheduled class meeting |
| `GRADE_SCALE` | Numeric ranges and corresponding letter grades |

The most common relational pathways are:

- **Student performance:** `STUDENT → STUDENT_GRADE → DELIVERABLE → ASSIGNMENT_TYPE`
- **Attendance:** `STUDENT → ATTENDANCE → SCHEDULE`
- **Grade interpretation:** calculated result → `GRADE_SCALE`

`STUDENT_GRADE` is the central junction table. It resolves the many-to-many relationship between students and deliverables. A composite unique constraint on `(StudentID, DeliverableID)` can enforce the policy that each student has no more than one current score for each deliverable, while `GradeID` remains the surrogate primary key.

The examples assume that `ASSIGNMENT_TYPE` includes `DeliverableType`, `CategoryWeight`, and `MaximumPoints`. Your database may use different field names, but the relational logic remains the same.

A join condition is more than syntax. It states the business rule that connects two facts. For example, `sg.StudentID = s.StudentID` means that each grade record belongs to the student whose identifier it carries.

### 10.2.2 An `INNER JOIN` as a Business Rule

The following query connects students to recorded grades. Because it uses an `INNER JOIN`, students without grade records do not appear.

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       sg.DeliverableID,
       sg.Score
FROM STUDENT AS s
INNER JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
ORDER BY s.StudentID, sg.DeliverableID;
```

The join answers a precise question: **Which students have matching grade records?** If the business question changes to "Which students have no grade records?" the join strategy must change as well.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.3 Outer Joins and the Business Meaning of `NULL`

<img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch10-advanced-sql-queries/ch10-finding-visible-absence" alt="Finding the visible absence: LEFT JOIN exposes what INNER JOIN hides" loading="lazy">

*Figure 10.4 — Finding the visible absence: a LEFT JOIN exposes what an INNER JOIN hides when searching for missing grades.*

An `INNER JOIN` returns only matched rows. A `LEFT JOIN` preserves every row from the left table, even when no related row exists. That difference answers one of the most valuable business questions: **Who or what is missing?**

### 10.3.1 Finding Missing Grades

A missing grade is represented by the absence of a row, not by a value stored in `STUDENT_GRADE`. First create the combinations that should exist, then compare them with the combinations that do exist.

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
WHERE sg.GradeID IS NULL
ORDER BY d.DueDate, s.LastName;
```

`CROSS JOIN` creates every expected student-deliverable pair. `LEFT JOIN` searches for a matching grade. The `NULL` test keeps only the gaps.

## 10.4 Advanced Join Patterns

Advanced joins reconstruct business meaning from normalized tables. The goal is not to use more joins. The goal is to follow the correct relational pathway and preserve the right rows.

### 10.4.1 Joining Through Multiple Tables

A complete report connects four tables so that each score has a student, deliverable, and grading-policy context.

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       d.DeliverableType,
       d.DeliverableNumber,
       d.DueDate,
       sg.Score,
       at.MaximumPoints
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
JOIN DELIVERABLE AS d
  ON sg.DeliverableID = d.DeliverableID
JOIN ASSIGNMENT_TYPE AS at
  ON d.DeliverableType = at.DeliverableType
ORDER BY s.LastName,
         d.DeliverableType,
         d.DeliverableNumber;
```

### 10.4.2 Self-Joins

A self-join compares rows in the same table. The following query identifies two deliverables scheduled for the same due date, which may create an avoidable workload concentration.

```sql
SELECT d1.DeliverableType AS FirstType,
       d1.DeliverableNumber AS FirstNumber,
       d2.DeliverableType AS SecondType,
       d2.DeliverableNumber AS SecondNumber,
       d1.DueDate
FROM DELIVERABLE AS d1
JOIN DELIVERABLE AS d2
  ON d1.DueDate = d2.DueDate
 AND d1.DeliverableID < d2.DeliverableID
ORDER BY d1.DueDate;
```

The condition `d1.DeliverableID < d2.DeliverableID` prevents a row from matching itself and avoids returning each pair twice.

| Business need | Preferred pattern |
| --- | --- |
| Return only complete matches | `INNER JOIN` |
| Preserve every row from one table | `LEFT JOIN` |
| Generate expected combinations | `CROSS JOIN` followed by `LEFT JOIN` |
| Compare rows within one table | Self-join with two aliases |
| Diagnose missing parent records | `LEFT JOIN` plus `IS NULL` |

## 10.5 Aggregation with `GROUP BY`

<img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch10-advanced-sql-queries/ch10-the-aggregation-funnel" alt="The aggregation funnel: detail rows flow through GROUP BY into one summary row per group" loading="lazy">

*Figure 10.6 — The aggregation funnel: detail rows flow through GROUP BY into one summary row per group.*

Aggregation changes the grain of a result. Before writing `GROUP BY`, finish this sentence: **Each output row should represent one _____.** The answer might be one student, one deliverable, one month, or one assignment category.

### 10.5.1 One Row per Student

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore,
       MIN(sg.Score) AS LowestScore,
       MAX(sg.Score) AS HighestScore,
       COUNT(sg.GradeID) AS GradesRecorded
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY AverageScore ASC;
```

This query produces one row per student. `AVG()` shows the center of the student's recorded performance, while `MIN()` and `MAX()` show the range. Changing the grouping columns would change the meaning of every calculated measure.

### 10.5.2 Distinct Counts and Conditional Aggregation

```sql
SELECT d.DeliverableType,
       d.DeliverableNumber,
       COUNT(DISTINCT sg.StudentID) AS StudentsGraded,
       SUM(CASE WHEN sg.Score >= 70 THEN 1 ELSE 0 END) AS PassingCount,
       SUM(CASE WHEN sg.Score < 70 THEN 1 ELSE 0 END) AS FailingCount
FROM DELIVERABLE AS d
JOIN STUDENT_GRADE AS sg
  ON d.DeliverableID = sg.DeliverableID
GROUP BY d.DeliverableID,
         d.DeliverableType,
         d.DeliverableNumber;
```

`COUNT(DISTINCT ...)` protects a measure from double-counting repeated identifiers. `CASE` inside `SUM()` or `COUNT()` creates category-specific measures in a single query.

### 10.5.3 Percentages and Ratios

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(
           100.0 * SUM(CASE WHEN a.Attended = 1 THEN 1 ELSE 0 END)
           / NULLIF(COUNT(*), 0),
           1
       ) AS AttendanceRate
FROM STUDENT AS s
JOIN ATTENDANCE AS a
  ON s.StudentID = a.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY AttendanceRate ASC;
```

`100.0` forces decimal division. `NULLIF(COUNT(*), 0)` prevents a division-by-zero error.

### 10.5.4 Aggregating Aggregates

A subquery can calculate one row per student, after which the outer query compares those student averages.

```sql
SELECT ROUND(AVG(StudentAverage), 2) AS AverageOfStudentAverages
FROM (
    SELECT StudentID,
           AVG(Score) AS StudentAverage
    FROM STUDENT_GRADE
    GROUP BY StudentID
) AS StudentSummaries;
```

This is different from `AVG(Score)` across all grade rows. The two calculations answer different questions when students have different numbers of recorded grades.

## 10.6 Filtering Groups with `HAVING`

`WHERE` filters detail rows before grouping. `HAVING` filters groups after an aggregate has been calculated. Use `HAVING` when the condition depends on `AVG()`, `COUNT()`, `SUM()`, or another aggregate.

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
WHERE sg.Score IS NOT NULL
GROUP BY s.StudentID, s.FirstName, s.LastName
HAVING AVG(sg.Score) < 75
ORDER BY AverageScore ASC;
```

The `WHERE` clause removes ungraded rows before the average is calculated. The `HAVING` clause then keeps only student groups whose calculated average is below 75.

## 10.7 Calculated Fields and `CASE` Logic

Reports rarely display raw values alone. They clean text, handle missing values, calculate new measures, and translate numbers into categories.

### 10.7.1 SQLite and Access Equivalents

| Need | SQLite | Microsoft Access |
| --- | --- | --- |
| Replace `NULL` | `COALESCE(Score, 0)` | `Nz([Score], 0)` |
| Conditional result | `CASE WHEN Score >= 60 THEN 'Pass' ELSE 'Fail' END` | `IIf([Score] >= 60, "Pass", "Fail")` |
| Current date | `DATE('now')` | `Date()` |
| Join text | `FirstName || ' ' || LastName` | `[FirstName] & " " & [LastName]` |
| Extract year | `strftime('%Y', DueDate)` | `DatePart("yyyy", [DueDate])` |

### 10.7.2 Codifying Business Rules with `CASE`

```sql
SELECT s.StudentID,
       s.FirstName || ' ' || s.LastName AS StudentName,
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
ORDER BY AverageScore DESC;
```

Expressions can also support common reporting needs:

```sql
SELECT StudentID,
       Score,
       ROUND(Score * 1.05, 2) AS ScoreWithFivePercentBonus,
       COALESCE(CAST(Score AS TEXT), 'Not Graded') AS DisplayScore
FROM STUDENT_GRADE;
```

<div class="callout important">
  <p><strong>❗ Important: NULL is not zero</strong></p>
  <p>Use zero only when the business policy says a missing value should count as zero. Otherwise, preserve the distinction between "not submitted," "not graded," and an actual score of zero.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.8 Diagnosing Data Problems with SQL

<img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch10-advanced-sql-queries/ch10-ch10-diagnostics-restructuring" alt="Diagnostic SQL identifies update and insertion anomalies" loading="lazy">

*Figure 10.3 — Diagnostic SQL identifies update and insertion anomalies in flat data, which are then resolved by extracting entities into normalized tables.*

<img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch10-advanced-sql-queries/ch10-danger-flat-tables-update-anomalies" alt="The danger of flat tables: update, insertion, and deletion anomalies" loading="lazy">

*Figure 10.3b — The danger of flat tables: update, insertion, and deletion anomalies illustrated.*

SQL can audit a dataset before it becomes the basis for a report. The most useful diagnostic queries search for missing values, duplicates, conflicting descriptions, invalid ranges, and orphaned records.

### 10.8.1 Detecting Redundancy and Anomalies

Student details repeat for every graded item:

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

Repeated data is especially dangerous when the copies disagree:

```sql
SELECT StudentID,
       COUNT(DISTINCT Email) AS EmailVersions
FROM GRADE_FLAT
GROUP BY StudentID
HAVING COUNT(DISTINCT Email) > 1;
```

This query detects an update anomaly: the same student appears with more than one email address. Similar patterns identify other problems.

| Data-quality problem | Diagnostic pattern |
| --- | --- |
| Conflicting deliverable due dates | Group by deliverable and count distinct due dates |
| Duplicate scores | Group by student and deliverable, then use `HAVING COUNT(*) > 1` |
| Invalid scores | Filter with `WHERE Score < 0 OR Score > 100` |
| Missing required IDs | Filter with `WHERE StudentID IS NULL` |
| Orphaned child records | Use `LEFT JOIN` and keep rows where the parent key is `NULL` |

A flat table creates three classic anomalies:

- **Update anomaly:** one fact must be corrected in many rows.
- **Insertion anomaly:** a student cannot be stored until an unrelated grade exists.
- **Deletion anomaly:** deleting the only grade may also delete the student's identity information.

## 10.9 Restructuring Data with SQL: Executing a Normalization

Chapter 9 designed normalized structures. This section uses SQL to carry out that design when data arrives in a flat imported table named `GRADE_FLAT`.

### 10.9.1 Extracting Entities

Every group of attributes that repeatedly describes the same thing suggests a separate entity.

```sql
SELECT DISTINCT StudentID,
                FirstName,
                LastName,
                Email
FROM GRADE_FLAT
ORDER BY StudentID;
```

This query extracts unique students. Deliverables can be extracted by grouping their repeated attributes:

```sql
SELECT DeliverableType,
       DeliverableNumber,
       MIN(DueDate) AS DueDate,
       MIN(Topic) AS Topic
FROM GRADE_FLAT
GROUP BY DeliverableType, DeliverableNumber
ORDER BY DeliverableType, DeliverableNumber;
```

`MIN()` is used because every selected column that is not part of the `GROUP BY` must be aggregated. In clean data, all copies of the due date and topic should already match. If they do not, the conflict should be reviewed rather than silently accepted.

### 10.9.2 Creating Tables from Queries

SQLite supports `CREATE TABLE AS SELECT`:

```sql
CREATE TABLE STUDENT_STAGE AS
SELECT DISTINCT StudentID,
                FirstName,
                LastName,
                Email
FROM GRADE_FLAT;
```

Microsoft Access and SQL Server use `SELECT ... INTO` for the same general purpose:

```sql
SELECT DISTINCT StudentID,
                FirstName,
                LastName,
                Email
INTO STUDENT_STAGE
FROM GRADE_FLAT;
```

These commands are useful for staging and exploration. They infer the new columns from the query output, but they usually do not create the primary keys, foreign keys, uniqueness rules, or validation constraints required by the final design.

### 10.9.3 Migrating into the Normalized Schema

A safer production workflow creates the target tables with explicit data types and constraints, then inserts cleaned sets of rows.

```sql
INSERT INTO STUDENT (StudentID, FirstName, LastName, Email)
SELECT DISTINCT StudentID,
                TRIM(FirstName),
                TRIM(LastName),
                LOWER(TRIM(Email))
FROM GRADE_FLAT
WHERE StudentID IS NOT NULL
  AND FirstName IS NOT NULL
  AND LastName IS NOT NULL;
```

After the `DELIVERABLE` table has been populated, map each flat record to its new `DeliverableID`:

```sql
INSERT INTO STUDENT_GRADE (StudentID, DeliverableID, Score)
SELECT gf.StudentID,
       d.DeliverableID,
       gf.Score
FROM GRADE_FLAT AS gf
JOIN DELIVERABLE AS d
  ON gf.DeliverableType = d.DeliverableType
 AND gf.DeliverableNumber = d.DeliverableNumber;
```

The practical sequence is **clean first, constrain second**:

1. Extract and clean the data.
2. Verify row counts and mappings.
3. Resolve duplicates and invalid values.
4. Apply primary keys, foreign keys, `UNIQUE`, `NOT NULL`, and `CHECK` constraints.

For example, SQLite can enforce one score per student per deliverable with a unique index:

```sql
CREATE UNIQUE INDEX uq_student_deliverable
ON STUDENT_GRADE (StudentID, DeliverableID);
```

Important primary-key, foreign-key, `NOT NULL`, and `CHECK` constraints should be defined when the SQLite table is created. **In Access**, use a make-table query for exploration, then define keys and validation rules in Design View before loading production data.

### 10.9.4 Verifying the Migration

Never drop the source table until the new structure has been tested.

```sql
SELECT COUNT(*) AS FlatGradeRows
FROM GRADE_FLAT;

SELECT COUNT(*) AS NormalizedGradeRows
FROM STUDENT_GRADE;
```

Check for flat rows that failed to map to a deliverable:

```sql
SELECT gf.*
FROM GRADE_FLAT AS gf
LEFT JOIN DELIVERABLE AS d
  ON gf.DeliverableType = d.DeliverableType
 AND gf.DeliverableNumber = d.DeliverableNumber
WHERE d.DeliverableID IS NULL;
```

Finally, reconstruct the original report from the normalized tables. If the normalized join produces the same business facts, the refactoring preserved meaning while removing redundancy.

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       d.DeliverableType,
       d.DeliverableNumber,
       sg.Score
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
JOIN DELIVERABLE AS d
  ON sg.DeliverableID = d.DeliverableID
ORDER BY s.StudentID, d.DeliverableType, d.DeliverableNumber;
```

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: SQL can refactor data</strong></p>
  <p>The same language that finds data problems can extract entities, migrate records, validate relationships, and prepare a database for trustworthy analysis.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.10 Date and Time Queries

Time-aware queries support deadlines, workload planning, trend analysis, and intervention.

| Need | SQLite | Microsoft Access |
| --- | --- | --- |
| Current date | `DATE('now')` | `Date()` |
| Add 7 days | `DATE(DueDate, '+7 days')` | `DateAdd("d", 7, [DueDate])` |
| Difference in days | `JULIANDAY(EndDate) - JULIANDAY(StartDate)` | `DateDiff("d", [StartDate], [EndDate])` |
| Extract month | `strftime('%m', DueDate)` | `DatePart("m", [DueDate])` |

### 10.10.1 Lateness and Missing Grades

The following SQLite query finds overdue deliverables that still have no grade recorded:

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       d.DeliverableType,
       d.DeliverableNumber,
       d.DueDate,
       CAST(JULIANDAY('now') - JULIANDAY(d.DueDate) AS INTEGER) AS DaysOverdue
FROM STUDENT AS s
CROSS JOIN DELIVERABLE AS d
LEFT JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
 AND d.DeliverableID = sg.DeliverableID
WHERE d.DueDate < DATE('now')
  AND sg.GradeID IS NULL
ORDER BY DaysOverdue DESC, s.LastName;
```

**In Access:** replace the date calculation with `DateDiff("d", [DueDate], Date())` and use `Date()` in the filter.

### 10.10.2 Date Ranges

Managers often need a bounded planning window rather than every past or future record. This SQLite query returns deliverables due during the next 14 days:

```sql
SELECT DeliverableID,
       DeliverableType,
       DeliverableNumber,
       DueDate
FROM DELIVERABLE
WHERE DueDate BETWEEN DATE('now') AND DATE('now', '+14 days')
ORDER BY DueDate;
```

**In Access:** use `WHERE DueDate BETWEEN Date() AND DateAdd("d", 14, Date())`.

### 10.10.3 Grouping by Month or Week

Date functions can also change the grain of a report. The next query produces one row per due-date month and compares workload with recorded performance:

```sql
SELECT strftime('%Y-%m', d.DueDate) AS DueMonth,
       COUNT(DISTINCT d.DeliverableID) AS DeliverablesDue,
       ROUND(AVG(sg.Score), 2) AS AverageScore
FROM DELIVERABLE AS d
LEFT JOIN STUDENT_GRADE AS sg
  ON d.DeliverableID = sg.DeliverableID
GROUP BY strftime('%Y-%m', d.DueDate)
ORDER BY DueMonth;
```

Replace `'%Y-%m'` with `'%Y-%W'` to group by year and week in SQLite. In Access, use `Format([DueDate], "yyyy-mm")` for a month label or `DatePart("ww", [DueDate])` for a week number. These groupings support workload planning and trend analysis, but the analyst must still explain what each row represents.

## 10.11 Weighted Grades and Policy Tables

A final grade is usually not a simple average. Categories may carry different weights. Those weights should be stored in `ASSIGNMENT_TYPE`, not repeated inside multiple queries.

Assume `ASSIGNMENT_TYPE.CategoryWeight` stores decimal values such as `0.20`, `0.30`, and `0.50`.

```sql
WITH CategoryAverages AS (
    SELECT sg.StudentID,
           d.DeliverableType,
           AVG(sg.Score) AS CategoryAverage
    FROM STUDENT_GRADE AS sg
    JOIN DELIVERABLE AS d
      ON sg.DeliverableID = d.DeliverableID
    GROUP BY sg.StudentID, d.DeliverableType
),
FinalGrades AS (
    SELECT ca.StudentID,
           SUM(ca.CategoryAverage * at.CategoryWeight) AS FinalNumericGrade
    FROM CategoryAverages AS ca
    JOIN ASSIGNMENT_TYPE AS at
      ON ca.DeliverableType = at.DeliverableType
    GROUP BY ca.StudentID
)
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(fg.FinalNumericGrade, 2) AS FinalNumericGrade,
       gs.LetterGrade
FROM FinalGrades AS fg
JOIN STUDENT AS s
  ON fg.StudentID = s.StudentID
JOIN GRADE_SCALE AS gs
  ON fg.FinalNumericGrade BETWEEN gs.MinScore AND gs.MaxScore
ORDER BY FinalNumericGrade DESC;
```

This query separates policy from calculation:

1. Calculate the student's average within each category.
2. Multiply each category average by the weight stored in the database.
3. Sum the weighted contributions.
4. Join the numeric result to the grade scale.

A policy table makes the logic auditable. If the syllabus changes, the weight is updated once instead of being edited in every report.

<div class="callout avoid">
  <p><strong>❌ Avoid: Averaging averages without weights</strong></p>
  <p>An average of category averages is correct only when every category has the same intended weight.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.12 Subqueries and Views: Reusable Reporting Pipelines

Complex questions become easier to test when the logic is divided into named steps. Subqueries answer focused questions inside a statement, CTEs expose a multi-stage pipeline, and views preserve approved reporting logic for reuse.

### 10.12.1 Subqueries: Queries Within Queries

A subquery is a `SELECT` statement placed inside another SQL statement. It is useful when a business question naturally contains a second question.

#### Subquery in `WHERE`

> Which recorded scores are above the overall average?

```sql
SELECT s.FirstName,
       s.LastName,
       d.DeliverableType,
       d.DeliverableNumber,
       sg.Score
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
JOIN DELIVERABLE AS d
  ON sg.DeliverableID = d.DeliverableID
WHERE sg.Score > (
    SELECT AVG(Score)
    FROM STUDENT_GRADE
);
```

The inner query returns one value. A subquery that returns exactly one value is called a **scalar subquery** and can be used like a constant in `WHERE` or `SELECT`.

#### Subquery in `FROM`

A subquery in `FROM` creates a temporary derived table.

```sql
SELECT StudentID,
       ROUND(AverageScore, 2) AS AverageScore
FROM (
    SELECT StudentID,
           AVG(Score) AS AverageScore
    FROM STUDENT_GRADE
    GROUP BY StudentID
) AS StudentAverages
WHERE AverageScore > 85
ORDER BY AverageScore DESC;
```

Derived tables must be given an alias.

#### Subquery in `SELECT`

A scalar subquery can add a comparison value to every detail row.

```sql
SELECT sg.StudentID,
       sg.DeliverableID,
       sg.Score,
       (
           SELECT ROUND(AVG(sg2.Score), 2)
           FROM STUDENT_GRADE AS sg2
           WHERE sg2.DeliverableID = sg.DeliverableID
       ) AS DeliverableAverage
FROM STUDENT_GRADE AS sg;
```

This is a **correlated subquery** because the inner query refers to `sg.DeliverableID` from the outer query.

#### `EXISTS` for Relationship Checks

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

`EXISTS` asks whether at least one matching row exists. It is often clearer than counting when the business question is simply yes or no.

### 10.12.2 CTEs and Views

Subqueries, common table expressions, and views all manage complexity, but they operate at different scopes.

#### Common Table Expressions

A common table expression, or CTE, names a temporary result set for one statement.

```sql
WITH StudentAverages AS (
    SELECT StudentID,
           AVG(Score) AS AverageScore
    FROM STUDENT_GRADE
    GROUP BY StudentID
)
SELECT StudentID,
       ROUND(AverageScore, 2) AS AverageScore
FROM StudentAverages
WHERE AverageScore > 85;
```

CTEs are especially useful when a query has several stages. Their names make the order of reasoning visible and allow one stage to be tested before the next is added. Modern SQLite supports CTEs. Microsoft Access does not support the `WITH` syntax, so saved queries can play a similar instructional role.

A CTE is not automatically faster than a subquery. Database optimizers may rewrite both forms. Choose the structure that makes the logic clearest, then inspect performance when the dataset is large enough for performance to matter.

#### Views

A view saves a query as a virtual table.

```sql
CREATE VIEW StudentPerformanceSummary AS
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore,
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

The view can be queried like a table:

```sql
SELECT *
FROM StudentPerformanceSummary
WHERE Status = 'At Risk';
```

Views improve consistency because dashboards and reports can share one definition. They can also support governance. For example, an advisor-facing view may expose names, averages, and risk categories while omitting birthdays or other fields that are not needed for advising.


#### Choosing the Right Structure

| Structure | Best use | Persistence |
| --- | --- | --- |
| Subquery | A focused comparison or local calculation | One statement |
| CTE | A readable, multi-stage pipeline | One statement |
| View | Shared reporting logic and controlled access | Saved database object |
| Access saved query | Reusable Access-specific logic | Saved database object |

#### A Governed Advisor View

A reusable view should expose only the information its audience needs. The following SQLite view reuses the shared performance definition but omits email, birthday, and other fields that are unnecessary for advising:

```sql
CREATE VIEW AdvisorStudentRisk AS
SELECT StudentID,
       FirstName,
       LastName,
       AverageScore,
       Status
FROM StudentPerformanceSummary
WHERE Status IN ('At Risk', 'Needs Attention');
```

The view does not replace access controls, but it creates a consistent reporting boundary. A governed view should also have a documented owner, calculation definition, intended audience, and review schedule.

### 10.12.3 Combining Compatible Results with `UNION`

A join combines columns from related tables. `UNION` combines rows from compatible result sets. Each query must return the same number of columns in a compatible order.

The following query creates a single stream of student engagement events:

```sql
SELECT a.StudentID,
       sc.ClassDate AS EventDate,
       'Attended Class' AS EventType
FROM ATTENDANCE AS a
JOIN SCHEDULE AS sc
  ON a.ClassNum = sc.ClassNum
WHERE a.Attended = 1

UNION ALL

SELECT sg.StudentID,
       d.DueDate AS EventDate,
       'Grade Recorded' AS EventType
FROM STUDENT_GRADE AS sg
JOIN DELIVERABLE AS d
  ON sg.DeliverableID = d.DeliverableID
ORDER BY StudentID, EventDate;
```

- `UNION` removes duplicate rows.
- `UNION ALL` preserves duplicates and is usually faster because it does not perform the duplicate-removal step.

Preserve duplicates when repeated events are meaningful. A student who attended five classes should normally contribute five attendance events.

### 10.12.4 Integrated Example: An At-Risk Student Pipeline

<div class="video-embed">
  <p><strong>🎬 At-Risk Report Pipeline Walkthrough</strong></p>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/G69DkWdnz44?si=uiBg5Un11uX4_bb7" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  <p><a href="https://youtu.be/G69DkWdnz44">Watch on YouTube</a></p>
</div>

<img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch10-advanced-sql-queries/ch10-at-risk-report-pipeline-anatomy" alt="Anatomy of the at-risk report pipeline" loading="lazy">

*Figure 10.8 — Anatomy of the at-risk report pipeline: from raw grades to an actionable intervention list.*

The final query combines missing-grade detection, score averages, attendance rates, conditional logic, and CTEs. The SQLite version below counts only deliverables whose due dates have passed.

```sql
WITH MissingGrades AS (
    SELECT s.StudentID,
           COUNT(*) AS MissingGradeCount
    FROM STUDENT AS s
    CROSS JOIN DELIVERABLE AS d
    LEFT JOIN STUDENT_GRADE AS sg
      ON s.StudentID = sg.StudentID
     AND d.DeliverableID = sg.DeliverableID
    WHERE d.DueDate < DATE('now')
      AND sg.GradeID IS NULL
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
           100.0 * SUM(CASE WHEN Attended = 1 THEN 1 ELSE 0 END)
           / NULLIF(COUNT(*), 0) AS AttendanceRate
    FROM ATTENDANCE
    GROUP BY StudentID
),
RiskReport AS (
    SELECT s.StudentID,
           s.FirstName,
           s.LastName,
           COALESCE(sa.AverageScore, 0) AS AverageScore,
           COALESCE(mg.MissingGradeCount, 0) AS MissingGradeCount,
           COALESCE(ar.AttendanceRate, 0) AS AttendanceRate,
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
)
SELECT StudentID,
       FirstName,
       LastName,
       ROUND(AverageScore, 2) AS AverageScore,
       MissingGradeCount,
       ROUND(AttendanceRate, 1) AS AttendanceRate,
       RiskCategory
FROM RiskReport
ORDER BY CASE RiskCategory
             WHEN 'High Risk' THEN 1
             WHEN 'Needs Attention' THEN 2
             ELSE 3
         END,
         AverageScore ASC;
```

| CTE | Role in the pipeline |
| --- | --- |
| `MissingGrades` | Counts overdue deliverables without a grade. |
| `ScoreAverages` | Calculates one average per student. |
| `AttendanceRates` | Converts attendance events into a percentage. |
| `RiskReport` | Joins the measures and applies the risk policy. |
| Final `SELECT` | Formats and sorts the decision-ready result. |

The thresholds in this example are policy choices, not universal truths. A responsible analyst documents them, tests their effects, and revises them with the stakeholders who will act on the report.

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: SQL can become a decision pipeline</strong></p>
  <p>Advanced SQL combines small, testable steps into a result that is accurate, explainable, and useful for action.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.13 ★ Stretch: Window Functions Without Collapsing Rows

`GROUP BY` reduces rows to one row per group. A window function calculates across related rows while preserving each detail row.

### 10.13.1 Average Alongside Detail

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

### 10.13.2 Ranking Students

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
       ROW_NUMBER() OVER (ORDER BY AverageScore DESC) AS RowNumber,
       RANK() OVER (ORDER BY AverageScore DESC) AS ClassRank,
       DENSE_RANK() OVER (ORDER BY AverageScore DESC) AS DenseClassRank
FROM StudentAverages;
```

- `ROW_NUMBER()` gives each row a unique sequence.
- `RANK()` gives ties the same rank and leaves gaps.
- `DENSE_RANK()` gives ties the same rank without gaps.

#### Ranking Without Window Functions

A platform without window functions can rank a saved student-average query by comparing it with itself. Assume `StudentAverages` contains one row per student.

```sql
SELECT a.StudentID,
       a.AverageScore,
       1 + COUNT(b.StudentID) AS ClassRank
FROM StudentAverages AS a
LEFT JOIN StudentAverages AS b
  ON b.AverageScore > a.AverageScore
GROUP BY a.StudentID, a.AverageScore
ORDER BY ClassRank;
```

This pattern is useful in Microsoft Access, where `StudentAverages` can be a saved query. Window functions are usually clearer when the platform supports them.

### 10.13.3 Running Totals and Moving Averages

```sql
SELECT sg.StudentID,
       d.DueDate,
       d.DeliverableID,
       sg.Score,
       SUM(sg.Score) OVER (
           PARTITION BY sg.StudentID
           ORDER BY d.DueDate, d.DeliverableID
           ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS RunningPoints
FROM STUDENT_GRADE AS sg
JOIN DELIVERABLE AS d
  ON sg.DeliverableID = d.DeliverableID
ORDER BY sg.StudentID, d.DueDate, d.DeliverableID;
```

A moving average smooths short-term variation by averaging the current row with a limited number of preceding rows:

```sql
SELECT sg.StudentID,
       d.DueDate,
       sg.Score,
       ROUND(
           AVG(sg.Score) OVER (
               PARTITION BY sg.StudentID
               ORDER BY d.DueDate, d.DeliverableID
               ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
           ),
           2
       ) AS ThreeDeliverableMovingAverage
FROM STUDENT_GRADE AS sg
JOIN DELIVERABLE AS d
  ON sg.DeliverableID = d.DeliverableID;
```

### 10.13.4 Quartiles and Percentile Position

```sql
WITH StudentAverages AS (
    SELECT StudentID,
           AVG(Score) AS AverageScore
    FROM STUDENT_GRADE
    GROUP BY StudentID
)
SELECT StudentID,
       ROUND(AverageScore, 2) AS AverageScore,
       NTILE(4) OVER (ORDER BY AverageScore DESC) AS PerformanceQuartile,
       ROUND(
           100 * PERCENT_RANK() OVER (ORDER BY AverageScore),
           1
       ) AS PercentilePosition
FROM StudentAverages
ORDER BY AverageScore DESC;
```

`NTILE(4)` divides the ordered result into four similarly sized groups. `PERCENT_RANK()` estimates a row's relative position from 0 to 1. These measures describe relative standing, not mastery. A student can rank highly in a class where everyone struggled, so rankings should be interpreted alongside actual scores and policy thresholds.

Window functions are supported in modern SQLite. Microsoft Access does not support them directly. Treat this section as optional enrichment if your course is using Access only.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 10.14 Looking Ahead: Transactions and Reliability

Analytical SQL becomes operationally risky when it changes data. Before any `UPDATE` or `DELETE`, identify the target rows with `SELECT`, apply the same `WHERE` condition, and verify the result.

Chapter 11 develops this discipline through transactions, `COMMIT`, `ROLLBACK`, permissions, backup, recovery, and database governance. Every SQLite query in this chapter also prepares you for PostgreSQL and Supabase, which return in Chapter 14.

## Chapter Summary

This chapter moved from basic retrieval to analytical SQL. Joins connected business facts across normalized tables, while outer joins and `NULL` tests revealed missing records. Aggregation changed the grain of a result, and `HAVING` filtered calculated groups. `CASE`, calculated fields, and policy tables translated organizational rules into auditable logic.

Diagnostic queries exposed duplicates, conflicting values, invalid ranges, and orphaned records. SQL then carried out a normalization by extracting entities, creating tables, migrating data, and verifying that the new schema preserved the original business facts.

Subqueries, CTEs, views, and `UNION` organized complex work into reusable reporting pipelines. The governed advisor view showed that reuse also requires decisions about audience, data minimization, ownership, and review. Optional window functions added rankings, running measures, quartiles, and comparisons without removing detail rows.

The central lesson is simple: advanced SQL should make analysis more trustworthy, not merely more complicated. Chapter 11 turns to the controls that protect these databases when people and applications begin changing data.

*Review questions, key terms, practice exercises, and the chapter lab are provided in the companion files.*

---

## References

Connolly, T., & Begg, C. (2015). *Database systems: A practical approach to design, implementation, and management* (6th ed.). Pearson.

Date, C. J. (2004). *An introduction to database systems* (8th ed.). Pearson/Addison Wesley.

Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7th ed.). Pearson.

Hoffer, J. A., Venkataraman, R., & Topi, H. (2019). *Modern database management* (13th ed.). Pearson.

Laudon, K. C., & Laudon, J. P. (2024). *Management information systems: Managing the digital firm* (18th ed.). Pearson.

Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7th ed.). McGraw-Hill Education.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## SQL for Data Analysis Cheat Sheet

**[SQL for Data Analysis Cheat Sheet](https://drive.google.com/file/d/1oDJavH5vDGdKg0Fe51ekeUduwXzSSYnL/view?usp=sharing)**

<iframe src="https://drive.google.com/file/d/1oDJavH5vDGdKg0Fe51ekeUduwXzSSYnL/preview" title="SQL for Data Analysis Cheat Sheet preview"></iframe>

<!-- PAGE BREAK -->

<div style="page-break-after: always;"></div>

## Chapter 10 Visual Summary

<img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch10-advanced-sql-queries/ch10-mastering-advanced-sql-techniques" alt="Visual summary of mastering advanced SQL" loading="lazy">

*Figure 10.10 — Visual summary of the mastering advanced SQL journey, from data diagnostics to normalization, joins, aggregation, and final reports.*
