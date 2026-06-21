# Appendix C: SQL Quick Reference

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-concepts" alt="SQL Reference section icon" width="220">
</p>

<p align="center">

This appendix provides a concise reference for every SQL statement, clause, function, and pattern taught in *Using Data to Drive Business Performance*. It is organized into four parts: syntax templates, business-question patterns, dialect differences, and a visual JOIN reference.

**How to use this appendix:** Look up a specific SQL keyword in Part 1. Find the right query pattern for a business question in Part 2. Check platform differences in Part 3. Use Part 4 to choose the correct JOIN type.

---

## Part 1: SQL Quick Reference

Syntax templates use `[brackets]` for optional parts and `...` for repeating elements. Replace `table`, `column`, and `value` with your actual names.

### SELECT — Retrieving Data

```sql
SELECT [DISTINCT] column1, column2, ...
FROM table
[WHERE condition]
[GROUP BY column1, column2, ...]
[HAVING aggregate_condition]
[ORDER BY column1 [ASC|DESC], column2 [ASC|DESC]];
```

| Clause | Purpose | Example |
|---|---|---|
| `SELECT` | Which columns to return (required) | `SELECT FirstName, LastName, Score` |
| `DISTINCT` | Remove duplicate rows | `SELECT DISTINCT DeliverableType FROM GRADEBOOK` |
| `FROM` | Which table to query (required) | `FROM STUDENT_GRADE` |
| `WHERE` | Filter rows before grouping | `WHERE Score >= 80` |
| `GROUP BY` | Group rows for aggregation | `GROUP BY StudentID` |
| `HAVING` | Filter groups after aggregation | `HAVING AVG(Score) < 70` |
| `ORDER BY` | Sort results | `ORDER BY Score DESC` |

**Execution order (logical):** `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY`

### Filtering Rows with WHERE

```sql
-- Comparison
WHERE Score >= 80
WHERE DueDate = '2026-03-15'

-- Range
WHERE Score BETWEEN 60 AND 100

-- Set membership
WHERE DeliverableType IN ('Quiz', 'Exam')

-- Pattern matching
WHERE Email LIKE '%@university.edu'
WHERE LastName LIKE 'J%'

-- NULL check (use IS, not =)
WHERE Score IS NULL
WHERE Email IS NOT NULL

-- Combining conditions
WHERE Score >= 80 AND DeliverableType = 'Exam'
WHERE Score < 60 OR Score IS NULL
WHERE NOT (DeliverableType = 'Quiz')
```

### Aggregate Functions

```sql
COUNT(column)    -- Count non-NULL values
COUNT(*)         -- Count all rows
SUM(column)      -- Total of numeric values
AVG(column)      -- Average of numeric values (ignores NULL)
MIN(column)      -- Minimum value
MAX(column)      -- Maximum value
```

**Example:**
```sql
SELECT 
    COUNT(*) AS TotalGrades,
    AVG(Score) AS AverageScore,
    MIN(Score) AS LowestScore,
    MAX(Score) AS HighestScore
FROM STUDENT_GRADE;
```

### GROUP BY and HAVING

```sql
-- Average score per student
SELECT StudentID, AVG(Score) AS AvgScore
FROM STUDENT_GRADE
GROUP BY StudentID;

-- Students with average below 70 (filter after grouping)
SELECT StudentID, AVG(Score) AS AvgScore
FROM STUDENT_GRADE
GROUP BY StudentID
HAVING AVG(Score) < 70;

-- Count grades per deliverable type (exclude Exams)
SELECT DeliverableType, COUNT(*) AS GradeCount
FROM STUDENT_GRADE
WHERE DeliverableType <> 'Exam'
GROUP BY DeliverableType
ORDER BY GradeCount DESC;
```

### JOIN — Combining Tables

```sql
-- INNER JOIN: rows that match in both tables
SELECT s.FirstName, s.LastName, g.Score
FROM STUDENT s
INNER JOIN STUDENT_GRADE g ON s.StudentID = g.StudentID;

-- LEFT JOIN: all rows from left table, matching rows from right (NULL where no match)
SELECT s.FirstName, s.LastName, g.Score
FROM STUDENT s
LEFT JOIN STUDENT_GRADE g ON s.StudentID = g.StudentID;

-- Multiple joins
SELECT s.FirstName, g.Score, d.DeliverableType
FROM STUDENT s
INNER JOIN STUDENT_GRADE g ON s.StudentID = g.StudentID
INNER JOIN DELIVERABLE d ON g.DeliverableID = d.DeliverableID;

-- Self-join (table joined to itself — use different aliases)
SELECT a.StudentID, a.Score AS Quiz1Score, b.Score AS Quiz2Score
FROM STUDENT_GRADE a
INNER JOIN STUDENT_GRADE b ON a.StudentID = b.StudentID
WHERE a.DeliverableID = 1 AND b.DeliverableID = 2;

-- CROSS JOIN + LEFT JOIN (find missing combinations)
SELECT s.StudentID, d.DeliverableID
FROM STUDENT s
CROSS JOIN DELIVERABLE d
LEFT JOIN STUDENT_GRADE g ON s.StudentID = g.StudentID AND d.DeliverableID = g.DeliverableID
WHERE g.StudentGradeID IS NULL;
```

### Aliases

```sql
-- Column alias (appears in output)
SELECT FirstName AS Student, Score AS Grade FROM STUDENT_GRADE;

-- Table alias (shortens table references in joins)
SELECT s.FirstName, g.Score
FROM STUDENT s
INNER JOIN STUDENT_GRADE g ON s.StudentID = g.StudentID;
```

### CASE Expression

```sql
-- Simple classification
SELECT StudentID, Score,
    CASE 
        WHEN Score >= 90 THEN 'A'
        WHEN Score >= 80 THEN 'B'
        WHEN Score >= 70 THEN 'C'
        WHEN Score >= 60 THEN 'D'
        ELSE 'F'
    END AS LetterGrade
FROM STUDENT_GRADE;

-- Conditional aggregation
SELECT StudentID,
    COUNT(CASE WHEN Score >= 80 THEN 1 END) AS HighScores,
    COUNT(CASE WHEN Score < 60 THEN 1 END) AS LowScores
FROM STUDENT_GRADE
GROUP BY StudentID;
```

### Subqueries

```sql
-- Scalar subquery (returns one value)
SELECT FirstName, LastName,
    (SELECT AVG(Score) FROM STUDENT_GRADE) AS ClassAverage
FROM STUDENT;

-- Subquery in WHERE (find students who scored above average)
SELECT StudentID, Score
FROM STUDENT_GRADE
WHERE Score > (SELECT AVG(Score) FROM STUDENT_GRADE);

-- Subquery with IN (students who have at least one missing grade)
SELECT StudentID, FirstName
FROM STUDENT
WHERE StudentID IN (
    SELECT DISTINCT StudentID 
    FROM STUDENT_GRADE 
    WHERE Score IS NULL
);

-- Correlated subquery (references outer query)
SELECT s.StudentID, s.FirstName,
    (SELECT COUNT(*) FROM STUDENT_GRADE g WHERE g.StudentID = s.StudentID) AS GradeCount
FROM STUDENT s;
```

### Common Table Expressions (CTEs)

```sql
-- Named temporary result set (cleaner than nested subqueries)
WITH StudentAverages AS (
    SELECT StudentID, AVG(Score) AS AvgScore
    FROM STUDENT_GRADE
    GROUP BY StudentID
)
SELECT s.FirstName, s.LastName, sa.AvgScore
FROM STUDENT s
INNER JOIN StudentAverages sa ON s.StudentID = sa.StudentID
WHERE sa.AvgScore >= 80
ORDER BY sa.AvgScore DESC;

-- Multiple CTEs in a pipeline
WITH 
  GradedStudents AS (
    SELECT DISTINCT StudentID FROM STUDENT_GRADE WHERE Score IS NOT NULL
  ),
  StudentStats AS (
    SELECT StudentID, COUNT(*) AS TotalGrades, AVG(Score) AS AvgScore
    FROM STUDENT_GRADE
    WHERE StudentID IN (SELECT StudentID FROM GradedStudents)
    GROUP BY StudentID
  )
SELECT * FROM StudentStats WHERE TotalGrades >= 3;
```

### Window Functions

```sql
-- Row number (assigns a unique sequential number in the specified order)
SELECT StudentID, Score,
    ROW_NUMBER() OVER (ORDER BY Score DESC) AS Rank
FROM STUDENT_GRADE;

-- Rank (same score gets same rank, leaves gaps)
SELECT StudentID, Score,
    RANK() OVER (ORDER BY Score DESC) AS ScoreRank
FROM STUDENT_GRADE;

-- Running total
SELECT StudentID, DueDate, Score,
    SUM(Score) OVER (PARTITION BY StudentID ORDER BY DueDate) AS RunningTotal
FROM STUDENT_GRADE;

-- Moving average
SELECT StudentID, DueDate, Score,
    AVG(Score) OVER (PARTITION BY StudentID ORDER BY DueDate ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS MovingAvg3
FROM STUDENT_GRADE;
```

### Views

```sql
-- Create a saved query as a virtual table
CREATE VIEW vw_StudentAverages AS
SELECT StudentID, COUNT(*) AS TotalGrades, AVG(Score) AS AvgScore
FROM STUDENT_GRADE
GROUP BY StudentID;

-- Query the view like any table
SELECT * FROM vw_StudentAverages WHERE AvgScore < 70;
```

### Data Modification

```sql
-- Insert a single row
INSERT INTO STUDENT (StudentID, FirstName, LastName, Email)
VALUES ('S1050', 'Elena', 'Torres', 'elena@university.edu');

-- Insert from a query (append query / data migration)
INSERT INTO STUDENT (StudentID, FirstName, LastName, Email, Birthday)
SELECT DISTINCT StudentID, FirstName, LastName, Email, Birthday
FROM GRADEBOOK;

-- Update rows
UPDATE STUDENT
SET Email = 'alice.johnson@university.edu'
WHERE StudentID = 'S1001';

-- Delete rows
DELETE FROM STUDENT_GRADE
WHERE Score IS NULL AND DueDate < '2026-01-01';

-- Safe update pattern: SELECT first, then UPDATE
SELECT * FROM STUDENT WHERE StudentID = 'S1001';  -- Verify the row
UPDATE STUDENT SET Email = 'new@university.edu' WHERE StudentID = 'S1001';
```

### Transactions

```sql
-- Group operations that must succeed or fail together
BEGIN TRANSACTION;

INSERT INTO STUDENT (StudentID, FirstName, LastName, Email)
VALUES ('S1050', 'Elena', 'Torres', 'elena@university.edu');

INSERT INTO STUDENT_GRADE (StudentID, DeliverableID, Score)
VALUES ('S1050', 1, 88);

COMMIT;   -- Make changes permanent
-- or
ROLLBACK; -- Undo all changes since BEGIN
```

### Data Definition (DDL)

```sql
-- Create a table
CREATE TABLE STUDENT (
    StudentID TEXT PRIMARY KEY,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Email TEXT UNIQUE,
    Birthday DATE
);

-- Add a column
ALTER TABLE STUDENT ADD COLUMN Phone TEXT;

-- Remove a table (be careful)
DROP TABLE IF EXISTS temp_import;
```

---

## Part 2: SQL by Business Question

Common business questions mapped to the SQL pattern that answers them. Replace table and column names with your schema.

| Business Question | SQL Pattern | Key Clauses |
|---|---|---|
| "How many...?" | `SELECT COUNT(*) FROM table WHERE ...` | `COUNT` |
| "What is the average...?" | `SELECT AVG(column) FROM table` | `AVG` |
| "Who are the top 10...?" | `SELECT ... ORDER BY column DESC LIMIT 10` | `ORDER BY`, `LIMIT` |
| "How many per category?" | `SELECT category, COUNT(*) FROM table GROUP BY category` | `GROUP BY`, `COUNT` |
| "Which categories average above X?" | `SELECT category, AVG(val) FROM table GROUP BY category HAVING AVG(val) > X` | `GROUP BY`, `HAVING`, `AVG` |
| "Find records with missing data" | `SELECT * FROM table WHERE column IS NULL` | `IS NULL` |
| "Find records between two dates" | `SELECT * FROM table WHERE datecol BETWEEN 'start' AND 'end'` | `BETWEEN` |
| "Find records matching a pattern" | `SELECT * FROM table WHERE column LIKE '%pattern%'` | `LIKE` |
| "Combine data from two tables" | `SELECT ... FROM table1 JOIN table2 ON table1.key = table2.key` | `JOIN`, `ON` |
| "Find items with no match in another table" | `SELECT ... FROM table1 LEFT JOIN table2 ON ... WHERE table2.key IS NULL` | `LEFT JOIN`, `IS NULL` |
| "Rank items by a metric" | `SELECT ..., RANK() OVER (ORDER BY metric DESC)` | `RANK`, `OVER` |
| "Calculate running total over time" | `SELECT ..., SUM(amount) OVER (ORDER BY date)` | `SUM`, `OVER`, `ORDER BY` |
| "Classify rows into categories" | `SELECT ..., CASE WHEN cond THEN 'label' ... END` | `CASE`, `WHEN` |
| "Find all possible combinations missing records" | `CROSS JOIN ... LEFT JOIN ... WHERE ... IS NULL` | `CROSS JOIN`, `LEFT JOIN` |
| "Break a complex question into steps" | `WITH step1 AS (...), step2 AS (...) SELECT ...` | `WITH` (CTE) |

---

## Part 3: SQL Dialect Notes

The book primarily uses **SQLite** for examples. Key differences when working in Microsoft Access or PostgreSQL (Supabase):

| Feature | SQLite | Microsoft Access | PostgreSQL / Supabase |
|---|---|---|---|
| **Auto-increment PK** | `INTEGER PRIMARY KEY` | `AUTOINCREMENT` in Design View or `COUNTER` in SQL | `SERIAL` or `GENERATED ALWAYS AS IDENTITY` |
| **String concatenation** | `\|\|` operator | `&` operator | `\|\|` operator |
| **LIMIT rows** | `LIMIT n` | `TOP n` in SELECT clause | `LIMIT n` |
| **Boolean type** | No native Boolean (use INTEGER 0/1) | Yes/No field type | Native `BOOLEAN` |
| **Date functions** | `date('now')`, `julianday()` | `Date()`, `DateDiff()` | `CURRENT_DATE`, `AGE()` |
| **String length** | `LENGTH()` | `LEN()` | `LENGTH()` or `CHAR_LENGTH()` |
| **Case-insensitive match** | `LIKE` is case-insensitive for ASCII; `COLLATE NOCASE` | `LIKE` is generally case-insensitive | `ILIKE` (case-insensitive LIKE) |
| **IS NULL vs = NULL** | `IS NULL` (never `= NULL`) | `IS NULL` (never `= NULL`) | `IS NULL` (never `= NULL`) — same across all |
| **CTEs (WITH)** | ✅ Supported | ❌ Not supported | ✅ Supported |
| **Window functions** | ✅ Supported (SQLite 3.25+) | ❌ Not supported | ✅ Supported |
| **Views** | ✅ `CREATE VIEW` | ✅ QueryDef objects | ✅ `CREATE VIEW` |
| **Transactions** | `BEGIN; ... COMMIT;` | Works through VBA transactions; not in query SQL | `BEGIN; ... COMMIT;` |
| **CHECK constraints** | ✅ Fully enforced | ✅ Enforced at table level | ✅ Fully enforced |
| **FOREIGN KEY enforcement** | Must enable with `PRAGMA foreign_keys = ON;` | ✅ Enforced when RI is checked in Relationships | ✅ Fully enforced |

### SQLite-Specific Notes

- **Foreign keys are OFF by default.** Run `PRAGMA foreign_keys = ON;` at the start of every session or the DB will silently accept orphan records.
- **No RIGHT OUTER JOIN.** Use `LEFT JOIN` and swap the table order.
- **No FULL OUTER JOIN.** Combine `LEFT JOIN` with `UNION` of the reverse.
- **No stored procedures.** Use application code or scripts.
- **No GRANT/REVOKE.** Security is at the file level.

### Access SQL-Specific Notes

- **Use Design View for table creation.** Access SQL `CREATE TABLE` is limited — Design View gives you access to all field properties.
- **QueryDefs vs. SQL.** Saved queries in Access are QueryDef objects. You can view their SQL in SQL View.
- **No LIMIT.** Use `TOP n` in the `SELECT` clause: `SELECT TOP 5 * FROM STUDENT_GRADE ORDER BY Score DESC`.
- **Use `NZ()` for NULL replacement.** `NZ(Score, 0)` returns 0 when Score is NULL. In SQLite use `COALESCE(Score, 0)`.
- **Use `IIF()` for conditional logic in queries.** `IIF(Score >= 80, 'Pass', 'Fail')`. In SQLite use `CASE WHEN`.

---

## Part 4: JOIN Quick Reference

### JOIN Types

| JOIN Type | What It Returns | When to Use |
|---|---|---|
| **INNER JOIN** | Rows that match in both tables | "Show me grades with student names" |
| **LEFT JOIN** | All rows from left table + matching right rows (NULL if no match) | "Show all students, even those with no grades" |
| **CROSS JOIN** | Every combination of rows from both tables | "Show every possible student-deliverable pairing" |
| **Self-JOIN** | A table joined to itself | "Compare a student's Quiz 1 score to their Quiz 2 score" |
| **CROSS JOIN + LEFT JOIN** | Find missing combinations | "Which students are missing which deliverables?" |

### JOIN Syntax Patterns

```sql
-- Pattern 1: Simple two-table join (most common)
SELECT ...
FROM table1 t1
INNER JOIN table2 t2 ON t1.key = t2.key;

-- Pattern 2: Multi-table join (chain through keys)
SELECT ...
FROM table1 t1
INNER JOIN table2 t2 ON t1.key_a = t2.key_a
INNER JOIN table3 t3 ON t2.key_b = t3.key_b;

-- Pattern 3: Left join for "all from one side"
SELECT ...
FROM table1 t1
LEFT JOIN table2 t2 ON t1.key = t2.key;

-- Pattern 4: Find unmatched (anti-join)
SELECT ...
FROM table1 t1
LEFT JOIN table2 t2 ON t1.key = t2.key
WHERE t2.key IS NULL;

-- Pattern 5: Find missing combinations
SELECT t1.id, t2.id
FROM table1 t1
CROSS JOIN table2 t2
LEFT JOIN table3 t3 ON t1.id = t3.id1 AND t2.id = t3.id2
WHERE t3.id IS NULL;
```

### JOIN Decision Flowchart

1. Do you need data from more than one table? → **Use a JOIN**
2. Do you need ALL rows from the left table, even unmatched ones? → **LEFT JOIN**
3. Do you need only rows that match in both? → **INNER JOIN**
4. Do you need every possible combination? → **CROSS JOIN**
5. Do you need to find what is MISSING? → **LEFT JOIN + WHERE right-table.key IS NULL**

---

*Generated: 2026-06-21*
