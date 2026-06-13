<!-- metadata: date="2026-06-11"; chapter="10"; type="source"; title="Source: Infographic ChatGPT"; description="Source material for chapter 10" -->

Below is a **structured Markdown (`.md`) translation of your diagram**. I preserved **all nodes, hierarchy, and concepts**, while organizing them into a **clean teaching document suitable for a GitHub textbook, Jupyter Book, or lecture notes**.

---

# Advanced SQL with the Grading Database

This guide presents advanced SQL concepts using a **grading database scenario**, progressing from schema normalization to analytics and governance.

---

# 1. Normalization and Schema Refactoring

## Diagnostic Queries

Before restructuring a schema, diagnostic queries help identify structural issues.

### Detecting Duplication

Identify duplicate records.

```sql
SELECT column_name, COUNT(*)
FROM table_name
GROUP BY column_name
HAVING COUNT(*) > 1;
```

### Detecting Conflicting Values

Identify inconsistencies across repeated entities.

Example:

```sql
SELECT StudentID, COUNT(DISTINCT Email)
FROM STUDENT
GROUP BY StudentID
HAVING COUNT(DISTINCT Email) > 1;
```

### Detecting Spelling Inconsistencies

Look for inconsistent values.

```sql
SELECT DISTINCT DeliverableType
FROM GRADE;
```

### Detecting Operational Anomalies

Three anomalies indicate poor schema design:

| Type           | Description                               |
| -------------- | ----------------------------------------- |
| Update anomaly | Redundant updates across rows             |
| Insert anomaly | Missing context prevents insertion        |
| Delete anomaly | Removing a record deletes unrelated facts |

---

# 2. Extracting Entities

Flat tables often contain multiple entities mixed together.

## Examining Students

```sql
SELECT DISTINCT StudentID, FirstName, LastName, Email
FROM GRADE;
```

## Extracting Deliverables

```sql
SELECT DeliverableType, DeliverableNumber, DueDate
FROM GRADE
GROUP BY DeliverableType, DeliverableNumber, DueDate;
```

---

# 3. Creating New Tables

Once entities are identified, new relational tables are created.

### Create Table Using Existing Data

```sql
CREATE TABLE STUDENT AS
SELECT DISTINCT StudentID, FirstName, LastName, Email
FROM GRADE;
```

### Using SELECT INTO

```sql
SELECT DISTINCT DeliverableType, DeliverableNumber, DueDate
INTO DELIVERABLE
FROM GRADE;
```

### Junction Table Creation

```sql
CREATE TABLE STUDENT_GRADE (
    StudentID INTEGER,
    DeliverableID INTEGER,
    Score INTEGER,
    PRIMARY KEY (StudentID, DeliverableID)
);
```

---

# 4. Data Migration

Migrating data into the normalized schema.

## Insert Data

```sql
INSERT INTO STUDENT_GRADE
SELECT StudentID, DeliverableID, Score
FROM GRADE;
```

---

## De-duplication Strategies

Common techniques:

```sql
SELECT DISTINCT
GROUP BY
WINDOW functions
```

---

## Verification of Migration

```sql
SELECT COUNT(*) FROM GRADE;
SELECT COUNT(*) FROM STUDENT_GRADE;
```

---

# 5. Hardening with Constraints

Constraints enforce data integrity.

## Primary Keys

```sql
PRIMARY KEY (StudentID)
```

## Foreign Keys

```sql
FOREIGN KEY (StudentID)
REFERENCES STUDENT(StudentID)
```

## Validation Constraints

```sql
CHECK (Score BETWEEN 0 AND 100)
```

---

# 6. SQL Fundamentals and Cleaning

## SELECT for Reporting

### Column Aliasing

```sql
SELECT FirstName AS Student
FROM STUDENT;
```

### Filtering

```sql
SELECT *
FROM STUDENT
WHERE Grade > 90;
```

### Ordering

```sql
ORDER BY Grade DESC;
```

---

# 7. Cleaning Patterns

## Trimming Whitespace

```sql
TRIM(Name)
```

---

## Standardizing Case

```sql
LOWER(email)
UPPER(lastname)
```

---

## Replacing NULL Values

```sql
COALESCE(column, 'Unknown')
```

---

## Pattern Validation

```sql
WHERE email LIKE '%@albany.edu'
```

---

## Casting Data Types

```sql
CAST(score AS INTEGER)
```

---

# 8. Relational Queries (JOINs)

## INNER JOIN

Returns only matching records.

```sql
SELECT *
FROM STUDENT
INNER JOIN STUDENT_GRADE
ON STUDENT.StudentID = STUDENT_GRADE.StudentID;
```

---

## LEFT JOIN

Preserves unmatched rows.

```sql
SELECT *
FROM STUDENT
LEFT JOIN STUDENT_GRADE
ON STUDENT.StudentID = STUDENT_GRADE.StudentID;
```

---

## Multi-Join Chains

Joining multiple tables:

```sql
STUDENT
JOIN STUDENT_GRADE
JOIN DELIVERABLE
```

---

## Intersection Tables (Many-to-Many)

Junction tables represent relationships.

Example:

```sql
(StudentID, DeliverableID)
```

---

## Composite Uniqueness Constraints

```sql
UNIQUE (StudentID, DeliverableID)
```

---

# 9. Performance Metrics

## Aggregations

```sql
AVG()
COUNT()
SUM()
MIN()
MAX()
```

Example:

```sql
SELECT StudentID, AVG(Score)
FROM STUDENT_GRADE
GROUP BY StudentID;
```

---

## GROUP BY and HAVING

```sql
SELECT StudentID, COUNT(*)
FROM STUDENT_GRADE
GROUP BY StudentID
HAVING COUNT(*) > 5;
```

---

## Nested Aggregation

```sql
SELECT AVG(StudentAverage)
FROM (
    SELECT AVG(Score) AS StudentAverage
    FROM STUDENT_GRADE
    GROUP BY StudentID
) t;
```

---

# 10. Conditional Logic

## CASE Expressions

```sql
CASE
    WHEN Score >= 90 THEN 'A'
    WHEN Score >= 80 THEN 'B'
    ELSE 'C'
END
```

---

## Mapping Letter Grades

```sql
SELECT Score,
CASE
 WHEN Score >= 90 THEN 'A'
 WHEN Score >= 80 THEN 'B'
 ELSE 'C'
END AS LetterGrade
FROM STUDENT_GRADE;
```

---

## Flagging At-Risk Students

```sql
CASE
 WHEN AVG(Score) < 70 THEN 'At Risk'
 ELSE 'OK'
END
```

---

# 11. Time-Aware Queries

## Upcoming Due Dates

```sql
SELECT *
FROM DELIVERABLE
WHERE DueDate > CURRENT_DATE;
```

---

## Overdue Deliverables

```sql
WHERE DueDate < CURRENT_DATE
```

---

## Attendance Trends

Time-based analytics.

---

# 12. Weighted Calculations

## Assignment Category Weights

Example:

| Category  | Weight |
| --------- | ------ |
| Quizzes   | 20%    |
| Exercises | 30%    |
| Exams     | 50%    |

---

## Policy Table Integration

```sql
JOIN CATEGORY_WEIGHTS
```

---

## Grade Auditing

Ensuring grading calculations remain consistent.

---

# 13. Window Functions

Window functions allow calculations across row sets.

## Syntax

```sql
OVER (PARTITION BY ... ORDER BY ...)
```

---

## Ranking

```sql
RANK()
DENSE_RANK()
```

Example:

```sql
RANK() OVER (ORDER BY Score DESC)
```

---

## Running Totals

```sql
SUM(Score)
OVER (PARTITION BY StudentID ORDER BY Date)
```

---

## Moving Averages

```sql
AVG(Score)
OVER (ORDER BY Date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)
```

---

# 14. Reusable Query Artifacts

## Views

Saved queries.

```sql
CREATE VIEW StudentAverages AS
SELECT StudentID, AVG(Score)
FROM STUDENT_GRADE
GROUP BY StudentID;
```

---

## Common Table Expressions (CTEs)

```sql
WITH averages AS (
 SELECT StudentID, AVG(Score) avg_score
 FROM STUDENT_GRADE
 GROUP BY StudentID
)
SELECT *
FROM averages;
```

---

## Subqueries

Used in:

* WHERE
* FROM
* SELECT

Example:

```sql
SELECT *
FROM STUDENT
WHERE StudentID IN (
 SELECT StudentID
 FROM STUDENT_GRADE
);
```

---

## UNION Operations

```sql
UNION
UNION ALL
```

---

# 15. Performance and Speed

## Indexes

Indexes improve query performance.

```sql
CREATE INDEX idx_student
ON STUDENT(StudentID);
```

---

## Query Plans

Analyzing query performance.

```sql
EXPLAIN
SELECT * FROM STUDENT;
```

---

# 16. Advanced Mechanics

## Transactions

ACID properties ensure reliability.

```sql
BEGIN;
UPDATE ...
COMMIT;
```

---

## Triggers

Automated database actions.

Example:

```sql
CREATE TRIGGER update_grade_log
AFTER UPDATE ON STUDENT_GRADE
```

---

## Audit Logging

Tracking historical changes.

---

# 17. Data Governance

Ensuring database reliability and transparency.

## Referential Integrity

Foreign keys prevent orphan records.

---

## Periodic Integrity Checks

Scheduled data validation.

---

## Reproducibility and Transparency

Best practices:

* documented queries
* version control
* reproducible analytics pipelines

---

# Key Takeaways

A robust SQL workflow includes:

1. Schema normalization
2. Data cleaning
3. Relational joins
4. Aggregations and analytics
5. Reusable queries
6. Performance optimization
7. Governance and integrity

Together these practices transform raw data into **reliable decision-making systems**.

---

If you'd like, I can also convert this into a **full chapter for your BITM330 textbook**, including:

* grading database schema
* real SQL exercises
* practice problems
* diagrams
* lab assignments.
