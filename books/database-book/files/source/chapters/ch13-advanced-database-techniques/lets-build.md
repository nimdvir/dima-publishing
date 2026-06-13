<!-- metadata: date="2026-05-19"; chapter="13"; section="lets-build"; title="Chapter 13 Lets Build"; description="Hands-on practice for advanced techniques" -->

<!-- Sources: BITM330-Book-draft/chapter-drafts/ch13-advanced-database-techniques/main/ch13-main-rewritten-2026-05-18.md; .docs/lets-build/lets-build-outline-2026-05-06.md -->

# Let's Build: Hardening the Grading Database

![Let's Build](<../../../../.images/Ch0 General/sections/section optimized/resize-let-build-resize-optimized.gif>)

## Overview

In this chapter, you strengthen the Grading Database so it behaves more like a professional system. The goal is not to use every advanced feature just because it exists. The goal is to identify real risks and apply targeted controls that improve performance, data quality, auditability, and reliability.

## What You Will Need

- Your current Grading Database
- A SQL environment that supports indexes and transactions
- SQLite or PostgreSQL if you want to implement triggers directly in SQL
- A short write-up explaining your design choices

## Part A: Identify the Risks First

Before writing code, decide what problem each advanced technique is solving.

| Risk | Example | Control |
|---|---|---|
| Slow queries | Grade reports take too long | Indexes |
| Duplicate grade records | One student gets two rows for the same deliverable | Unique constraint |
| Invalid scores | `Score = 145` | Check constraint |
| Partial updates | A grade changes but the audit entry is missing | Transaction |
| Hidden changes | Someone edits grades without a record | Trigger and audit table |

Write one sentence for each risk explaining whether it is currently present in your database.

## Part B: Add Performance Indexes

Create indexes on the fields you filter or join most often.

```sql
CREATE INDEX idx_sg_student
ON STUDENT_GRADE(StudentID);

CREATE INDEX idx_sg_deliverable
ON STUDENT_GRADE(DeliverableID);

CREATE INDEX idx_attendance_student
ON ATTENDANCE(StudentID);
```

Then explain why those indexes make sense for the grading workflow.

If your platform supports plan inspection, test one query before and after indexing.

## Part C: Add Data Quality Controls

Use constraints to stop bad data at the point of entry.

```sql
ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT chk_score_range
CHECK (Score BETWEEN 0 AND 100);
```

```sql
ALTER TABLE STUDENT
ADD CONSTRAINT uq_student_email
UNIQUE (Email);
```

```sql
ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT uq_student_deliverable
UNIQUE (StudentID, DeliverableID);
```

If you are working in Access or another platform with syntax limits, explain how you enforced the same rule through indexed fields, validation rules, or table design.

## Part D: Create an Audit Trail

Create a table that records grade changes.

```sql
CREATE TABLE GRADE_AUDIT (
    AuditID INTEGER PRIMARY KEY,
    GradeID INTEGER NOT NULL,
    OldScore INTEGER,
    NewScore INTEGER,
    ChangedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ChangeReason TEXT
);
```

Then add a trigger that writes to that table when a score changes.

```sql
CREATE TRIGGER trg_audit_grade_update
AFTER UPDATE ON STUDENT_GRADE
FOR EACH ROW
WHEN OLD.Score <> NEW.Score
BEGIN
    INSERT INTO GRADE_AUDIT (GradeID, OldScore, NewScore)
    VALUES (OLD.GradeID, OLD.Score, NEW.Score);
END;
```

If your platform does not support triggers in the same way, describe the closest practical alternative.

## Part E: Use a Transaction for a Grade Correction

Protect a multi-step correction with transaction control.

```sql
BEGIN;

UPDATE STUDENT_GRADE
SET Score = 92
WHERE GradeID = 10;

UPDATE GRADE_AUDIT
SET ChangeReason = 'Corrected data entry error'
WHERE GradeID = 10
  AND ChangeReason IS NULL;

COMMIT;
```

If the result is wrong, use:

```sql
ROLLBACK;
```

Explain why a transaction is safer than running the steps one at a time without protection.

## Part F: Build One Advanced Analytical Object

Create one reusable object that supports monitoring or reporting.

Example: a student progress view with a running average.

```sql
CREATE VIEW StudentProgress AS
SELECT
    s.StudentID,
    s.FirstName,
    s.LastName,
    d.DueDate,
    d.Type,
    d.DeliverableNumber,
    sg.Score,
    AVG(sg.Score) OVER (
        PARTITION BY s.StudentID
        ORDER BY d.DueDate
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS RunningAverage
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
    ON s.StudentID = sg.StudentID
JOIN DELIVERABLE AS d
    ON sg.DeliverableID = d.DeliverableID;
```

If your platform does not support window functions, build a simpler summary object and explain the tradeoff.

## Deliverable

Submit the following:

- SQL file or screenshots showing indexes, constraints, transaction logic, and trigger or alternative control
- one brief note explaining each design choice
- evidence that the audit or monitoring object works

## Reflection Questions

- Which advanced technique gave the biggest reliability improvement?
- Which technique would be hardest to maintain over time?
- How do these controls support trust in the database's outputs?

## Connection Forward

Chapter 14 uses a more polished reporting tool, but that tool is only useful if the database underneath it is reliable.