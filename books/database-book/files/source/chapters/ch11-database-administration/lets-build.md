## Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

This section turns the chapter's concepts into practice. The goal is not to become a professional DBA immediately. The goal is to recognize administrative responsibilities and apply them thoughtfully.

### Purpose

Move from building and querying databases to protecting and managing them. By the end, you will be able to identify critical risks in a production database, apply basic administrative controls across three platforms, document a backup and recovery plan, and explain why database administration is not just IT work — it is a business responsibility.

### What You Will Practice

- Identifying high-risk tables and rating them by sensitivity.
- Enforcing referential integrity and understanding cascade rules.
- Performing and verifying backups.
- Checking database integrity with built-in platform tools.
- Creating indexes and measuring their performance impact.
- Using transactions to protect multi-step changes.
- Defining roles and granting privileges (PostgreSQL/Supabase).
- Creating views that limit what each role can see.

### Before You Begin

You need:

- Your current Grading Database in Microsoft Access (`.accdb`).
- A SQLite environment (sqliteonline.com or DB Browser for SQLite) with the GDB schema loaded from an earlier chapter.
- Optional: Supabase or PostgreSQL access if you want to practice the role-based security layer.
- About 75 minutes of focused time.
- The Chapter 11 reading, especially the sections on security, backup and recovery, integrity, and performance.

### Practice Layer 1: Microsoft Access

**Task 1: Identify critical tables.**

Rank tables by sensitivity.

| Table           | Risk Level     | Why                  |
| --------------- | -------------- | -------------------- |
| `STUDENT`       | High           | Personal information |
| `STUDENT_GRADE` | High           | Academic performance |
| `ATTENDANCE`    | Medium to high | Participation record |
| `DELIVERABLE`   | Medium         | Course structure     |
| `GRADE_SCALE`   | Medium         | Policy rules         |
| `SCHEDULE`      | Lower          | Course calendar      |

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

### Practice Layer 2: SQLite

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

### Practice Layer 3: Supabase / PostgreSQL

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

### What the Hands-On Work Teaches

| Platform            | What You Practice                                            |
| ------------------- | ------------------------------------------------------------ |
| Access              | Visual relationships, local backup, compact/repair           |
| SQLite              | Explicit pragmas, transactions, indexes, file responsibility |
| Supabase/PostgreSQL | Roles, privileges, transactions, views, cloud responsibility |

The core lesson is consistent:

> DBA thinking is not platform-specific. The tools change, but the responsibilities remain.

### Check Your Work

Verify that:

- [ ] Access Relationships window shows enforced referential integrity on at least three relationships.
- [ ] A timestamped backup copy of your `.accdb` file opens correctly and shows your data.
- [ ] `PRAGMA integrity_check` in SQLite returns `ok`.
- [ ] `EXPLAIN QUERY PLAN` shows your index is being used.
- [ ] A transaction block in SQLite or PostgreSQL successfully commits and a rollback test works.
- [ ] Your PostgreSQL `GradeReport` view returns the same data as the underlying three-table JOIN.

### Common Mistakes

- **Forgetting to enable foreign keys in SQLite.** `PRAGMA foreign_keys = ON;` must be set every session — it is off by default.
- **Skipping the backup verify step.** A backup file that will not open is not a backup.
- **Indexing every column.** Indexes speed up reads but slow down writes. Index only columns used in WHERE, JOIN, and ORDER BY clauses.
- **Using cascade delete without justification.** Accidentally deleting a student could cascade-delete all their grades. In most grading scenarios, restrict is safer.
- **Granting privileges on base tables instead of views.** A view lets you expose exactly the columns each role needs and nothing more.

### What This Shows

Database administration is not a separate specialty — it is the layer of responsibility that keeps a database trustworthy. Without enforced relationships, orphan records creep in. Without backups, a single mistake can destroy work. Without transactions, multi-step changes can leave data in an inconsistent state. Without roles, everyone sees everything. Each practice layer in this LB reinforces the same idea: the tools change across platforms, but the responsibilities of security, integrity, recoverability, and performance are universal.

### Submit or Save

Save your work as a single document containing:

1. Your Access relationship screenshots showing enforced referential integrity.
2. A screenshot of the SQLite `PRAGMA integrity_check` output.
3. The SQL scripts for index creation, transaction blocks, and WAL mode switch.
4. The PostgreSQL role and privilege statements along with the `GradeReport` view.

There is no LMS submission for this Let's Build. The DBA skills you practiced here — backup, integrity, indexes, transactions, and role-based access — will be applied across every subsequent chapter and lab.

### Peek Ahead — Chapter 12

In Chapter 12, you will shift from managing the database to analyzing the data it contains. You will build a Business Intelligence layer — transforming operational tables into analytical views, writing KPI queries, and designing dashboards that help managers make data-driven decisions. The administrative discipline you practiced here (backups, integrity, transactions) is the foundation that makes trustworthy BI possible.
