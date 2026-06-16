<!-- Sources: BITM330-Book-draft/chapter-drafts/ch11-database-administration/main/ch11-main-rewritten-2026-05-18.md; .docs/lets-build/lets-build-outline-2026-05-06.md -->

# Let's Build: Applying DBA Practices to the Grading Database

![Let's Build](<../../../../.images/Ch0 General/sections/section optimized/resize-let-build-resize-optimized.gif>)

## Overview

In this activity, you take the role of database administrator for the department's Grading Database. Your job is not to redesign the data model from scratch. Your job is to keep the system trustworthy, available, secure, and fast enough for real work.

This lab focuses on four DBA responsibilities: access control, backup and recovery, integrity and maintenance, and basic performance tuning.

## What You Will Need

- Your current Grading Database in Access, SQLite, or PostgreSQL
- Permission to create a backup copy of the database file
- A short written document for policies and observations

## Part A: Identify Sensitive Data and Define Roles

Start by deciding what needs the most protection.

| Table | Risk level | Why it matters |
|---|---|---|
| `STUDENT` | High | Stores personal information |
| `STUDENT_GRADE` | High | Stores academic performance |
| `ATTENDANCE` | Medium to high | Stores participation history |
| `DELIVERABLE` | Medium | Stores grading structure |
| `GRADE_SCALE` | Medium | Stores policy rules |
| `SCHEDULE` | Lower | Stores course calendar information |

Now define three roles for the system:

- `Instructor`: may read course data and update grades for assigned sections
- `Advisor`: may read student progress data but should not change grades
- `Admin`: may manage structure, backup, recovery, and permissions

Create a simple role matrix.

| Role | Read student data | Update grades | Change schema | Run backup |
|---|---|---|---|---|
| Instructor | Yes, limited | Yes, limited | No | No |
| Advisor | Yes | No | No | No |
| Admin | Yes | Yes | Yes | Yes |

### Platform Notes

- In Access, document these roles as a policy and implement the safest practical version through split databases, forms, saved queries, and controlled distribution.
- In PostgreSQL or Supabase, you can represent the policy with explicit role statements.

Example SQL:

```sql
CREATE ROLE instructor;
CREATE ROLE advisor;
CREATE ROLE admin;

GRANT SELECT ON STUDENT TO advisor;
GRANT SELECT ON STUDENT_GRADE TO advisor;

GRANT SELECT, INSERT, UPDATE ON STUDENT_GRADE TO instructor;
```

## Part B: Build a Backup and Recovery Plan

Write a one-page backup plan that answers these questions:

1. How often will the database be backed up?
2. Will the backup be full, incremental, or file-copy based?
3. Where will the backup be stored?
4. How long will backups be kept?
5. What is the recovery time objective (RTO)?
6. What is the recovery point objective (RPO)?

Then perform a simple backup drill.

### Access Version

1. Close the `.accdb` file.
2. Copy it to a backup folder.
3. Rename the copy with a timestamp.
4. Reopen the copied file and confirm that the data appears intact.

### SQLite Version

Run a file copy or export, then test the copy.

Recommended checks:

```sql
PRAGMA foreign_keys = ON;
PRAGMA integrity_check;
```

## Part C: Simulate a Recovery Scenario

Use this scenario:

> A faculty member accidentally deleted all grade records for one section.

Document your response in order.

1. Identify the affected tables.
2. Confirm when the last good backup was created.
3. Restore the backup copy to a safe location.
4. Compare restored data with the damaged version.
5. Explain what data could be recovered and what might still be lost.

The point of this part is not dramatic storytelling. The point is to prove that your backup plan can actually support recovery.

## Part D: Check Integrity and Routine Maintenance

Choose one platform path.

### Access

1. Open **Database Tools > Relationships**.
2. Confirm that key relationships are present.
3. Turn on **Enforce Referential Integrity** where appropriate.
4. Review cascade update and cascade delete carefully before enabling them.
5. Run **Compact and Repair Database**.

### SQLite

Use these checks:

```sql
PRAGMA foreign_keys = ON;
PRAGMA integrity_check;
```

Then review whether the schema clearly prevents orphaned grade rows.

## Part E: Run a Basic Performance Check

Pick one frequently filtered or joined field, such as `StudentID` in `STUDENT_GRADE`.

Create an index:

```sql
CREATE INDEX idx_student_grade_student
ON STUDENT_GRADE(StudentID);
```

Then run a simple query and inspect the plan.

```sql
EXPLAIN QUERY PLAN
SELECT *
FROM STUDENT_GRADE
WHERE StudentID = 5;
```

Write two or three sentences answering:

- What query did you test?
- Why was this column a reasonable indexing choice?
- Did the index improve the query enough to justify keeping it?

## Deliverable

Submit the following:

- role and permission policy
- backup and recovery plan
- documented recovery walkthrough
- integrity and maintenance notes
- short performance comparison note

## Reflection Questions

- Which DBA responsibility feels most important for a grading system?
- Which control would be easiest to ignore in real life?
- What is the business cost of getting DBA work wrong?

## Connection Forward

Chapter 12 uses the same database for a different purpose: turning stored data into reports, KPIs, and managerial insight.