---
title: "Let's Build: Hands-On DBA Practice"
chapter: 11
section: "Let's Build"
description: "Hands-on practice applying DBA concepts like relationships, backups, constraints, and roles to the Grading Database across different platforms."
date: 2026-06-16
author: "Nimrod Dvir, PhD"
---

# Hands-On DBA Practice with the Grading Database

This section turns the chapter's concepts into practice. The goal is not to become a professional DBA immediately. The goal is to recognize administrative responsibilities and apply them thoughtfully.

## Practice Layer 1: Microsoft Access

**Task 1: Identify critical tables.**

Rank tables by sensitivity.

| Table | Risk Level | Why |
|---|---|---|
| `STUDENT` | High | Personal information |
| `STUDENT_GRADE` | High | Academic performance |
| `ATTENDANCE` | Medium to high | Participation record |
| `DELIVERABLE` | Medium | Course structure |
| `GRADE_SCALE` | Medium | Policy rules |
| `SCHEDULE` | Lower | Course calendar |

**Task 2: Enforce referential integrity.**

In Access:

1. Open **Database Tools > Relationships**.
2. Add `STUDENT`, `DELIVERABLE`, and `STUDENT_GRADE`.
3. Connect `STUDENT.StudentID` to `STUDENT_GRADE.StudentID`.
4. Connect `DELIVERABLE.DeliverableID` to `STUDENT_GRADE.DeliverableID`.
5. Check **Enforce Referential Integrity**.
6. Allow cascade update only when appropriate.
7. Avoid cascade delete unless you can justify it.

**Task 3: Simulate backup.**

1. Close the database.
2. Copy the `.accdb` file.
3. Rename the copy with a timestamp.
4. Reopen the backup copy and verify the data.

**Task 4: Compact and repair.**

Use **Database Tools > Compact and Repair Database**. This reinforces the idea that file-based databases need maintenance.

## Practice Layer 2: SQLite

**Enable foreign keys.**

```sql
PRAGMA foreign_keys = ON;
```

**Check database integrity.**

```sql
PRAGMA integrity_check;
```

**Create an index.**

```sql
CREATE INDEX idx_student_grade_student
ON STUDENT_GRADE(StudentID);
```

**Check whether the index is used.**

```sql
EXPLAIN QUERY PLAN
SELECT *
FROM STUDENT_GRADE
WHERE StudentID = 5;
```

**Use a transaction.**

```sql
BEGIN TRANSACTION;

UPDATE STUDENT_GRADE
SET Score = 95
WHERE GradeID = 10;

-- If the result is correct:
COMMIT;

-- If the result is wrong:
-- ROLLBACK;
```

**Switch to WAL mode.**

```sql
PRAGMA journal_mode = WAL;
```

## Practice Layer 3: Supabase / PostgreSQL

**Create roles.**

```sql
CREATE ROLE instructor;
CREATE ROLE analyst;
```

**Grant privileges.**

```sql
GRANT SELECT ON STUDENT TO analyst;
GRANT SELECT ON STUDENT_GRADE TO analyst;

GRANT SELECT, INSERT, UPDATE ON STUDENT_GRADE TO instructor;
```

**Create an index.**

```sql
CREATE INDEX idx_student_grade_deliverable
ON STUDENT_GRADE(DeliverableID);
```

**Use a transaction.**

```sql
BEGIN;

UPDATE STUDENT_GRADE
SET Score = 88
WHERE GradeID = 12;

COMMIT;
```

**Create a safer reporting view.**

```sql
CREATE VIEW GradeReport AS
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
  ON sg.DeliverableID = d.DeliverableID;
```

Then grant access to the view rather than the base tables:

```sql
GRANT SELECT ON GradeReport TO analyst;
```

## What the Hands-On Work Teaches

| Platform | What You Practice |
|---|---|
| Access | Visual relationships, local backup, compact/repair |
| SQLite | Explicit pragmas, transactions, indexes, file responsibility |
| Supabase/PostgreSQL | Roles, privileges, transactions, views, cloud responsibility |

The core lesson is consistent:

> DBA thinking is not platform-specific. The tools change, but the responsibilities remain.
