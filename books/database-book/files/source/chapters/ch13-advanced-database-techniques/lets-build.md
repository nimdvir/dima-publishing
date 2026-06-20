<!-- Let's Build revision: restructured to task pattern with descriptive H3 names, added canonical icon and intro, added Peek Ahead. Content preserved from ch13-lets-build-2026-05-19.md. -->
---
title: "Chapter 13: Let's Build — Hardening the Grading Database"
chapter: 13
section: "Let's Build"
description: "Students apply indexes, transactions, constraints, triggers, audit trails, and analytical views to harden the Grading Database for performance, integrity, auditability, and reliability."
keywords:
  - Let's Build
  - indexes
  - transactions
  - constraints
  - triggers
  - audit trail
  - database hardening
  - Grading Database
  - SQL
  - SQLite
  - PostgreSQL
  - Microsoft Access
date: 2026-06-16
author: "Nimrod Dvir, PhD"
---

# Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

In this chapter, you strengthen the Grading Database so it behaves more like a professional system. The goal is not to use every advanced feature just because it exists. The goal is to identify real risks and apply targeted controls that improve performance, data quality, auditability, and reliability. By the end, your database will be faster, safer, and more trustworthy — ready for the reporting tools in Chapter 14.

This Let's Build is hands-on. You will write SQL, create database objects, and explain your design choices. The companion lab — **Lab 13 — Hardening PetVax for Production** — transfers these same techniques to the PetVax veterinary clinic project.

## Before You Begin

You will need:

- Your current Grading Database
- A SQL environment that supports indexes and transactions (SQLite or PostgreSQL recommended for full trigger support)
- Microsoft Access if you want to implement macros and data macros
- A short write-up explaining your design choices

If your platform does not support a particular technique — for example, triggers in Access — describe the closest practical alternative and explain the trade-off.

## Identify Critical Risks

Before writing code, decide what problem each advanced technique is solving.

| Risk | Example | Control |
|---|---|---|
| Slow queries | Grade reports take too long | Indexes |
| Duplicate grade records | One student gets two rows for the same deliverable | Unique constraint |
| Invalid scores | `Score = 145` | Check constraint |
| Partial updates | A grade changes but the audit entry is missing | Transaction |
| Hidden changes | Someone edits grades without a record | Trigger and audit table |

**Write one sentence for each risk explaining whether it is currently present in your database.** This risk assessment is the most important step — hardening without first identifying what needs protection often wastes effort.

## Add Performance Indexes

Create indexes on the fields you filter or join most often.

```sql
CREATE INDEX idx_sg_student
ON STUDENT_GRADE(StudentID);

CREATE INDEX idx_sg_deliverable
ON STUDENT_GRADE(DeliverableID);

CREATE INDEX idx_attendance_student
ON ATTENDANCE(StudentID);
```

**Explain why those indexes make sense for the grading workflow.** Which queries become faster? Which reports or screens benefit most?

If your platform supports plan inspection, test one query before and after indexing. For example, in SQLite:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM STUDENT_GRADE WHERE StudentID = 101;
```

**Describe what changed in the query plan.** A full table scan before indexing should become an index lookup after.

## Add Data Quality Controls

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

**If you are working in Access or another platform with syntax limits, explain how you enforced the same rule** — through indexed fields, validation rules, or table design properties. The principle matters more than the exact syntax.

## Create an Audit Trail

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

**If your platform does not support triggers in the same way, describe the closest practical alternative.** In Access, data macros can produce similar behavior. In application-only environments, document where the audit logic would need to live.

**Test your trigger.** Update a grade, then check whether a row appeared in `GRADE_AUDIT`. If nothing appears, check that your trigger condition is correct.

## Protect Grade Corrections with Transactions

Wrap a multi-step correction in transaction control.

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

**Explain why a transaction is safer than running the steps one at a time without protection.** What would happen if the first `UPDATE` succeeded but the second failed? Why does that matter for a grading system?

## Build One Analytical Object

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

If your platform does not support window functions, build a simpler summary object — such as a view that calculates each student's average score — and explain the trade-off.

**Query your view.** Does it return the data you expect? Are the running averages increasing sensibly as more deliverables are added?

## Check Your Work

Before submitting, verify each control:

- [ ] Indexes exist on `StudentID`, `DeliverableID`, and `DueDate`.
- [ ] A `CHECK` constraint prevents scores outside 0–100.
- [ ] A `UNIQUE` constraint prevents duplicate grade records.
- [ ] A `GRADE_AUDIT` table exists and is populated by a trigger or equivalent.
- [ ] A transaction-protected grade correction runs without errors.
- [ ] At least one analytical view or query returns usable monitoring data.

## Common Mistakes

- **Indexing too many columns.** Indexes speed up reads but slow down writes. Start with join columns and common filter columns.
- **Forgetting `WHERE` in trigger conditions.** An `AFTER UPDATE` trigger without `WHEN OLD.Score <> NEW.Score` writes an audit row on every update, even if nothing changed.
- **Skipping `ROLLBACK` testing.** Test what happens when a transaction fails. The database should return to its prior valid state.
- **Using triggers for simple rules.** A `CHECK` constraint is clearer, faster, and easier to debug than a trigger for simple range validation.
- **Mixing platform syntax without checking.** Constraints written for PostgreSQL may not run in SQLite or Access without adjustment. Always test on your actual platform.

## Submit or Save

Submit the following:

- SQL file or screenshots showing indexes, constraints, transaction logic, and trigger or alternative control
- one brief note explaining each design choice
- evidence that the audit or monitoring object works

## What This Shows

By the end of this exercise, your Grading Database has been strengthened in at least five ways: faster queries (indexes), safer updates (transactions), better data quality (constraints), automatic auditability (triggers), and reusable analytics (views). These are the same categories of hardening that real production databases use — not because someone decided to "add features," but because each control protects against a specific, predictable risk.

## Peek Ahead — Chapter 14

Chapter 14 connects your now-hardened Grading Database to Microsoft Power BI. The dashboards you build there will be more trustworthy because the data underneath them is protected by the controls you added here. A dashboard is only as reliable as the database that feeds it.
