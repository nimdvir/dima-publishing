---
title: "Chapter 13: Readiness Assessment Test — Advanced Database Techniques"
chapter: 13
section: "RAT"
description: "40-question readiness assessment covering indexes, transactions, constraints, triggers, window functions, analytics patterns, security, platform comparisons, macros, and stored procedures from Chapter 13."
keywords:
  - RAT
  - quiz
  - assessment
  - indexes
  - transactions
  - constraints
  - triggers
  - security
  - macros
  - stored procedures
date: 2026-06-16
author: "Nimrod Dvir, PhD"
---

# Readiness Assessment Test (RAT): Advanced Database Techniques

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/RAT_nqr5a3?_a=BAMAAAX00" alt="RAT or Quiz section icon" width="220">
</p>

<p align="center">

## Assessment Design Notes

This RAT checks whether students completed the Chapter 13 reading and can reason with the chapter's core concepts before class. Questions span indexing, transactions, constraints, triggers, window functions, analytics patterns, security, platform comparisons, macros, and stored procedures. The assessment emphasizes application and reasoning over recall.

### Bloom Distribution

| Bloom Level | Required Count | Intent |
|---|---|---|
| Remember | 8 | Foundational vocabulary and structural facts |
| Understand | 8 | Explain why concepts matter, interpret, and paraphrase |
| Apply | 8 | Use chapter concepts in realistic grading-database scenarios |
| Analyze | 8 | Compare alternatives, diagnose trade-offs, and break down systems |
| Evaluate | 8 | Judge design quality and choose the best approach under constraints |

### Design Criterion Coverage

| Design Criterion | Bloom Sections Used | Questions | Count |
|---|---|---|---|
| Application-based | Apply, Analyze, Evaluate | 1-8 in each | 12 |
| Scenario-based | Apply, Analyze, Evaluate | distributed | 12 |
| Definition-only | Remember, Understand | distributed | 10 |
| Schema-specific | Apply, Analyze | 3, 5, 9, 15, 17, 31 | 6 |

### AI-Resistance Strategies Used

1. **Chapter-specific reasoning** — Questions reference the Grading Database, specific SQL syntax from the chapter, and platform-specific details (Access macros, SQLite `PRAGMA`, PostgreSQL `EXPLAIN ANALYZE`).
2. **Schema-specific context** — Several questions name actual Grading Database tables (`STUDENT_GRADE`, `GRADE_AUDIT`, `DELIVERABLE`, `ATTENDANCE`) and columns (`StudentID`, `DeliverableID`, `Score`, `DueDate`) from the chapter.
3. **Scenario stems with embedded traps** — Distractors draw on common misconceptions (treating `CHECK` as a trigger, confusing `RANK` with `DENSE_RANK`, confusing authentication with authorization).
4. **Multi-answer discrimination** — Select ALL questions require distinguishing closely related concepts (which DBMSs support triggers, which index columns are beneficial).
5. **Non-obvious correct answers** — Some correct answers are paraphrased rather than keyword-matched (e.g., "enforcement regardless of access path" rather than "trigger runs automatically").
6. **Platform-specific details** — Questions test Access macro behavior, SQLite's `PRAGMA foreign_keys`, PostgreSQL's `CREATE FUNCTION` + `CREATE TRIGGER` pattern.
7. **Output prediction** — Apply-level questions ask students to predict what a specific SQL statement or constraint would produce or prevent.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Remember Questions

**1. Which SQL command starts a transaction?**

A. `SAVE`

B. `OPEN`

C. `BEGIN`

D. `START`

**2. What does a `CHECK` constraint do?**

A. Verifies that a foreign key references an existing primary key

B. Restricts the allowed values in a column using a logical expression

C. Automatically creates an index on the constrained column

D. Logs every change to the constrained column in an audit table

**3. Which term describes a lookup structure that helps the DBMS find rows quickly without scanning the entire table?**

A. Trigger

B. View

C. Index

D. Constraint

**4. What is the principle of least privilege?**

A. Every user should have access to all tables by default

B. Users should receive only the access necessary for their responsibilities

C. Permissions should be assigned to individual users rather than roles

D. The database administrator should have the fewest permissions

**5. In the ACID acronym, what does the "A" stand for?**

A. Authentication

B. Authorization

C. Atomicity

D. Automation

**6. Which SQL command permanently saves changes made inside a transaction?**

A. `SAVE`

B. `COMMIT`

C. `END`

D. `FINALIZE`

**7. What does a `UNIQUE` constraint prevent?**

A. `NULL` values in the constrained column

B. Foreign key violations

C. Duplicate values in the constrained column or columns

D. Values outside a specified range

**8. Select ALL that apply: Which of the following are valid trigger timing options?**

A. `BEFORE`

B. `DURING`

C. `AFTER`

D. `INSTEAD OF`

E. `WHILE`

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Understand Questions

**9. In the Grading Database, why would creating an index on `STUDENT_GRADE(StudentID)` improve performance?**

A. It prevents duplicate grades for the same student.

B. It lets the DBMS find all grades for a student without scanning the entire `STUDENT_GRADE` table.

C. It automatically recalculates the student's average score.

D. It encrypts the student's grade records for security.

**10. Why does the chapter describe a grade update without a transaction as risky?**

A. Because `UPDATE` statements are slower without transactions.

B. Because if one step succeeds and another fails, the database is left in an inconsistent partial state.

C. Because transactions are required by SQL standards for any write operation.

D. Because the DBMS will reject any `UPDATE` not wrapped in `BEGIN` and `COMMIT`.

**11. What is the main reason the chapter recommends adding a composite `UNIQUE` constraint on `(StudentID, DeliverableID)` in `STUDENT_GRADE`?**

A. To speed up queries that join `STUDENT` and `DELIVERABLE`.

B. To prevent a student from receiving two different scores for the same deliverable.

C. To ensure that `StudentID` and `DeliverableID` are never `NULL`.

D. To create an automatic backup of grade records.

**12. Select ALL that apply: Which of the following are good reasons to use a trigger rather than application code for a rule?**

A. The rule must be enforced regardless of which application or tool changes the data.

B. The rule involves complex user-interface messages.

C. The rule should run automatically without depending on developers remembering to add it.

D. The rule needs to show a custom dialog box to the user.

E. The rule is a universal data-quality check that should never be bypassed.

**13. How does a `DEFAULT` constraint improve data quality?**

A. It automatically corrects invalid values after they are inserted.

B. It supplies a known value when none is provided, reducing ambiguity.

C. It prevents any row from being inserted without an explicit value.

D. It validates that the provided value matches the column's data type.

**14. Why does the chapter warn that triggers can create debugging problems?**

A. Triggers are slower than equivalent application code.

B. Triggers are written in a different language than SQL.

C. A user may run a simple statement and not realize that additional actions are happening behind the scenes.

D. Triggers automatically disable foreign key constraints while running.

**15. In the Grading Database, what is the relationship between `GRADE_AUDIT` and a trigger on `STUDENT_GRADE`?**

A. `GRADE_AUDIT` replaces the need for a trigger entirely.

B. The trigger writes rows to `GRADE_AUDIT` automatically when grades change, creating a change history.

C. `GRADE_AUDIT` is a backup table that the trigger restores from if an error occurs.

D. The trigger reads from `GRADE_AUDIT` to validate new scores before they are inserted.

**16. Select ALL that apply: Which of the following are trade-offs of adding indexes to a table?**

A. Faster `SELECT` queries

B. Increased storage space

C. Slower `INSERT` operations

D. Automatically improved data integrity

E. Additional maintenance overhead during `UPDATE` and `DELETE`

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Apply Questions

**17. An instructor runs this SQL on the Grading Database:**

```sql
CREATE INDEX idx_deliverable_duedate
ON DELIVERABLE (DueDate);
```

**Which of the following queries would benefit most from this index?**

A. `SELECT * FROM STUDENT WHERE StudentID = 101;`

B. `SELECT * FROM DELIVERABLE WHERE DueDate < '2026-05-01';`

C. `SELECT COUNT(*) FROM STUDENT_GRADE;`

D. `INSERT INTO DELIVERABLE VALUES (10, 'Quiz', 4, '2026-05-10', 'Normalization');`

**18. A developer writes this transaction:**

```sql
BEGIN;
UPDATE STUDENT_GRADE SET Score = 95 WHERE GradeID = 12;
INSERT INTO GRADE_AUDIT (GradeID, OldScore, NewScore)
VALUES (12, 88, 95);
COMMIT;
```

**If the `INSERT` statement fails because `GRADE_AUDIT` does not exist, what happens?**

A. The `UPDATE` succeeds, and the `INSERT` is skipped.

B. Both statements fail, and the database returns to its state before `BEGIN`.

C. The `UPDATE` is saved, but the `INSERT` error is logged.

D. The transaction automatically creates the `GRADE_AUDIT` table.

**19. Which `CHECK` constraint would correctly prevent invalid scores in the Grading Database?**

A. `CHECK (Score IS NOT NULL)`

B. `CHECK (Score > 0)`

C. `CHECK (Score BETWEEN 0 AND 100)`

D. `CHECK (Score IN ('A', 'B', 'C', 'D', 'F'))`

**20. A student runs this query:**

```sql
EXPLAIN QUERY PLAN
SELECT * FROM STUDENT_GRADE WHERE StudentID = 101;
```

**The output says `SCAN TABLE STUDENT_GRADE`. What does this indicate?**

A. The query is using an index and is optimally fast.

B. The database is scanning every row in the table, and an index on `StudentID` may help.

C. The query has a syntax error that must be fixed.

D. The `STUDENT_GRADE` table is empty.

**21. Select ALL that apply: A grading system uses this table definition. Which constraints are present?**

```sql
CREATE TABLE STUDENT_GRADE (
    GradeID INTEGER PRIMARY KEY,
    StudentID INTEGER NOT NULL,
    DeliverableID INTEGER NOT NULL,
    Score INTEGER CHECK (Score BETWEEN 0 AND 100),
    UNIQUE (StudentID, DeliverableID),
    FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID)
);
```

A. `PRIMARY KEY`

B. `NOT NULL` (on `StudentID` and `DeliverableID`)

C. `CHECK` (on `Score`)

D. `DEFAULT` (on `Score`)

E. `UNIQUE` (on the `StudentID, DeliverableID` pair)

**22. An Access developer wants to display a message — "Score must be between 0 and 100" — when a user enters an invalid grade on a form. Which tool is the best fit for this task?**

A. A `CHECK` constraint on the `STUDENT_GRADE` table

B. A trigger on `STUDENT_GRADE`

C. A macro attached to the form's Before Update event

D. A stored procedure

**23. A database has this trigger:**

```sql
CREATE TRIGGER trg_log_grade_update
AFTER UPDATE ON STUDENT_GRADE
FOR EACH ROW
BEGIN
    INSERT INTO GRADE_AUDIT (GradeID, OldScore, NewScore)
    VALUES (OLD.GradeID, OLD.Score, NEW.Score);
END;
```

**An instructor runs `UPDATE STUDENT_GRADE SET Score = 92 WHERE GradeID = 10;`. What happens?**

A. Only the `STUDENT_GRADE` row is updated.

B. The `STUDENT_GRADE` row is updated, and a new row is automatically inserted into `GRADE_AUDIT`.

C. The update is blocked because triggers prevent direct modifications.

D. The trigger replaces the `UPDATE` with an `INSERT` into `GRADE_AUDIT` only.

**24. Select ALL that apply: In PostgreSQL, which steps are required to create an audit trigger?**

A. Create an audit table with appropriate columns.

B. Create a trigger function using `CREATE OR REPLACE FUNCTION`.

C. Create the trigger using `CREATE TRIGGER` that references the function.

D. Enable the trigger using `ALTER TRIGGER ... ENABLE`.

E. Write a stored procedure that manually calls the trigger.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Analyze Questions

**25. A developer adds ten indexes to a table with frequent inserts. Queries become faster, but data entry slows noticeably. What is the most likely explanation?**

A. The indexes have a syntax error that degrades performance.

B. Each `INSERT` must now update all ten indexes in addition to the table.

C. The DBMS automatically disables indexes during inserts.

D. The indexes are on the wrong columns and are being ignored.

**26. A grading database uses both a `CHECK` constraint (`Score BETWEEN 0 AND 100`) and a `BEFORE INSERT` trigger that also checks the score range. Which statement best describes this design?**

A. The trigger is redundant and should be removed because the constraint already enforces the rule.

B. The constraint is redundant and should be removed because the trigger provides more flexibility.

C. This is a good design because constraints and triggers protect data at different levels.

D. This will cause a conflict because constraints and triggers cannot both fire on the same table.

**27. Compare these two approaches to recording grade changes:**

**Approach A:** The application code runs an `INSERT INTO GRADE_AUDIT` before every `UPDATE`.

**Approach B:** A trigger on `STUDENT_GRADE` automatically inserts into `GRADE_AUDIT` on every `UPDATE`.

**Which statement best describes the trade-off?**

A. Approach A is always better because application code is easier to debug.

B. Approach B is always better because triggers are faster than application code.

C. Approach B guarantees the audit entry is written regardless of which tool or script performs the update, while Approach A depends on every developer remembering to include the audit step.

D. Both approaches are equally reliable because any `UPDATE` must go through the application.

**28. Select ALL that apply: A composite index on `(A, B)` is most useful when the query filters by which of the following?**

A. Column `A` only

B. Column `B` only

C. Both columns `A` and `B` (with `A` filtered first)

D. Both columns `A` and `B` (with `B` filtered first)

E. Neither column (any query benefits from any index)

**29. A small department uses Microsoft Access for grading with five instructors. The department head asks whether to switch to PostgreSQL. Which factor is the strongest argument for switching?**

A. Access does not support `SELECT` queries.

B. Access cannot enforce `CHECK` constraints.

C. Access has weak built-in security, limited concurrency, and no row-level security — making it unsuitable as the number of users and sensitivity of data grow.

D. Access databases cannot exceed 1 MB in size.

**30. A `GRADE_AUDIT` table stores `OldScore` and `NewScore` for every grade change. Which SQL pattern would identify grades that were changed more than three times?**

A. `SELECT GradeID FROM STUDENT_GRADE WHERE COUNT(*) > 3;`

B. `SELECT GradeID FROM GRADE_AUDIT GROUP BY GradeID HAVING COUNT(*) > 3;`

C. `SELECT GradeID FROM GRADE_AUDIT WHERE OldScore <> NewScore;`

D. `SELECT GradeID FROM STUDENT_GRADE JOIN GRADE_AUDIT USING (GradeID);`

**31. In the Grading Database, a developer writes:**

```sql
CREATE UNIQUE INDEX idx_one_grade_per_student_deliverable
ON STUDENT_GRADE (StudentID, DeliverableID);
```

**A later policy change allows students to resubmit deliverables for a revised score. What must happen to this index?**

A. Nothing — unique indexes automatically allow multiple rows for the same combination.

B. The index must be dropped or modified to include an `AttemptNumber` column before resubmissions can be stored.

C. The index can stay, but future inserts will be silently ignored.

D. The index will automatically convert to a non-unique index.

**32. Select ALL that apply: Which of the following are valid reasons to choose a stored procedure over application code for a multi-step grade correction?**

A. The same correction logic is needed from a web application, a reporting tool, and an admin script.

B. The logic involves conditional branching that is awkward in pure SQL.

C. Stored procedures are always faster than any other approach.

D. The process must be consistent regardless of which tool initiates it.

E. Stored procedures automatically create audit trails without additional code.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Evaluate Questions

**33. A team is designing a grading database. One member argues that all business rules should be enforced in the application code because "it is easier to change." Another argues they should be enforced in the database through constraints and triggers because "the database is the last line of defense." Which position does Chapter 13 most support?**

A. All rules should be in application code because databases are hard to modify.

B. All rules should be in the database because application code is unreliable.

C. Rules that must be universal and non-bypassable belong in the database; rules involving user interaction or frequent change may belong in the application — the strongest systems use both.

D. It does not matter where rules are enforced as long as they are documented somewhere.

**34. A production grading database stores five years of records with 50,000 students and 2 million grade rows. Reports that join `STUDENT`, `STUDENT_GRADE`, and `DELIVERABLE` on student ID are becoming slow. Which indexing strategy is most appropriate as a first step?**

A. Index every column in all three tables to maximize performance.

B. Index only the primary key columns, because they are already indexed.

C. Index `StudentID` and `DeliverableID` in `STUDENT_GRADE` (the foreign keys used in joins), then measure before adding more.

D. Remove all existing indexes and rebuild the database from scratch.

**35. An administrator needs to design permissions for a grading system used by students, instructors, teaching assistants, and department heads. Which design best follows the principle of least privilege?**

A. Give all users `SELECT`, `INSERT`, `UPDATE`, and `DELETE` on all tables and trust them to use the right ones.

B. Create one role per user type, grant only the necessary permissions to each role, and assign users to roles.

C. Give all permissions to the database administrator only and have all other users submit requests.

D. Create a single shared account for each user type and share the password.

**36. Select ALL that apply: A student reports that their grade disappeared from the system. The instructor cannot determine who changed it or when. Which hardening techniques would have prevented or helped diagnose this situation?**

A. An audit table recording old and new scores with timestamps

B. A trigger that logs every grade change automatically

C. An index on `StudentID` in `STUDENT_GRADE`

D. A `CHECK` constraint on the score range

E. Role-based permissions that restrict who can modify grades

**37. A course policy states that a student's final grade is the weighted average of quiz scores (30%), exam scores (50%), and project scores (20%). Which SQL approach would produce the most transparent and maintainable final-grade calculation?**

A. A single dense query with nested subqueries that computes everything at once.

B. Export all data to Excel and calculate grades manually each semester.

C. A chain of CTEs that calculates category averages, multiplies by weights, and sums the results — optionally wrapped in a view for reuse.

D. A trigger that recalculates the final grade after every individual score change.

**38. An organization currently uses Microsoft Access for a departmental grading system. They are considering moving to Supabase/PostgreSQL. Which capability would be the most significant improvement they would gain?**

A. The ability to use `SELECT` statements

B. The ability to create tables with primary keys

C. Built-in row-level security, role-based access control, and support for concurrent multi-user access

D. The ability to store text data

**39. A developer adds a trigger that updates three other tables every time a grade is changed. After deployment, grade entry becomes noticeably slower. What is the most likely cause, and what is the best recommendation?**

A. Triggers are inherently slow and should never be used — remove the trigger entirely.

B. The trigger is performing too much work on each grade change — review whether all three table updates are necessary or whether some logic can be moved to a stored procedure or scheduled job.

C. The database server needs more RAM — hardware is always the bottleneck.

D. The `STUDENT_GRADE` table needs more indexes to speed up the trigger.

**40. Select ALL that apply: Which of the following are characteristics of a well-hardened production database?**

A. Common join and filter columns are indexed based on measured query patterns.

B. Every column in every table has an index to maximize read performance.

C. Multi-step data changes that must succeed or fail together are wrapped in transactions.

D. Business rules such as valid score ranges are enforced by database constraints rather than user memory.

E. Grade changes are automatically recorded in an audit table through triggers or equivalent mechanisms.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Answer Key

### Remember Questions

**1. Which SQL command starts a transaction?**
**Correct Answer:** C. `BEGIN`
**Explanation:** Section 13.3.1 — `BEGIN` starts a transaction, `COMMIT` saves changes, and `ROLLBACK` cancels them. `SAVE` and `START` are not standard SQL transaction commands.
| Option | Analysis |
|---|---|
| A | `SAVE` is not a standard SQL transaction command (there is `SAVEPOINT`, which is different). |
| B | `OPEN` is used for cursors, not transactions. |
| C | **Correct.** `BEGIN` opens a transaction block. |
| D | `START` is not a standard SQL transaction command (some DBMSs use `START TRANSACTION`, but `BEGIN` is the standard form taught in the chapter). |

**2. What does a `CHECK` constraint do?**
**Correct Answer:** B. Restricts the allowed values in a column using a logical expression.
**Explanation:** Section 13.4.3 — A `CHECK` constraint restricts allowed values using an expression such as `Score BETWEEN 0 AND 100`.
| Option | Analysis |
|---|---|
| A | That describes a `FOREIGN KEY` constraint, not `CHECK`. |
| B | **Correct.** `CHECK` enforces a logical condition on column values. |
| C | `CHECK` does not create indexes; that is the job of `CREATE INDEX` or `UNIQUE`/`PRIMARY KEY`. |
| D | That describes a trigger or audit mechanism, not a `CHECK` constraint. |

**3. Which term describes a lookup structure that helps the DBMS find rows quickly without scanning the entire table?**
**Correct Answer:** C. Index
**Explanation:** Section 13.2.2 — An index is a lookup structure, like a textbook index, that lets the DBMS jump to relevant rows instead of scanning everything.
| Option | Analysis |
|---|---|
| A | A trigger is automatic database logic that responds to data events. |
| B | A view is a saved query, not a performance structure. |
| C | **Correct.** An index is a lookup structure for faster data retrieval. |
| D | A constraint is a rule that restricts data values or relationships. |

**4. What is the principle of least privilege?**
**Correct Answer:** B. Users should receive only the access necessary for their responsibilities.
**Explanation:** Section 13.8.2 — The principle of least privilege states that users should receive only the access necessary for their responsibilities — nothing more.
| Option | Analysis |
|---|---|
| A | This is the opposite of least privilege. |
| B | **Correct.** Least privilege means minimal necessary access. |
| C | The chapter recommends assigning permissions to roles, not individuals. |
| D | DBAs typically need broad permissions to manage the system. |

**5. In the ACID acronym, what does the "A" stand for?**
**Correct Answer:** C. Atomicity
**Explanation:** Section 13.3.4 — ACID stands for Atomicity, Consistency, Isolation, Durability. Atomicity means all steps in a transaction succeed or all fail.
| Option | Analysis |
|---|---|
| A | Authentication is a security concept, not part of ACID. |
| B | Authorization is a security concept, not part of ACID. |
| C | **Correct.** Atomicity is the "A" in ACID. |
| D | Automation is not part of the ACID acronym. |

**6. Which SQL command permanently saves changes made inside a transaction?**
**Correct Answer:** B. `COMMIT`
**Explanation:** Section 13.3.1 — `COMMIT` saves all changes made during the transaction permanently. `ROLLBACK` cancels them.
| Option | Analysis |
|---|---|
| A | `SAVE` is not a standard transaction command. |
| B | **Correct.** `COMMIT` makes transaction changes permanent. |
| C | `END` is not a standard SQL transaction command. |
| D | `FINALIZE` is not a standard SQL transaction command. |

**7. What does a `UNIQUE` constraint prevent?**
**Correct Answer:** C. Duplicate values in the constrained column or columns.
**Explanation:** Section 13.4.4 — A `UNIQUE` constraint prevents duplicate values. It is different from `NOT NULL` (which prevents missing values) and `CHECK` (which restricts allowed ranges).
| Option | Analysis |
|---|---|
| A | That describes a `NOT NULL` constraint. |
| B | That describes a `FOREIGN KEY` constraint. |
| C | **Correct.** `UNIQUE` prevents duplicate values. |
| D | That describes a `CHECK` constraint. |

**8. Select ALL that apply: Which of the following are valid trigger timing options?**
**Correct Answers:** A, C, D
**Explanation:** Section 13.5.1 — Valid trigger timing options are `BEFORE`, `AFTER`, and `INSTEAD OF`. `DURING` and `WHILE` are not standard trigger timing options.
| Option | Analysis |
|---|---|
| A | **Correct.** `BEFORE` triggers fire before the data change. |
| B | `DURING` is not a standard trigger timing option. |
| C | **Correct.** `AFTER` triggers fire after the data change. |
| D | **Correct.** `INSTEAD OF` triggers replace the triggering action (used primarily with views). |
| E | `WHILE` is a control-flow keyword, not a trigger timing option. |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Understand Questions

**9. In the Grading Database, why would creating an index on `STUDENT_GRADE(StudentID)` improve performance?**
**Correct Answer:** B. It lets the DBMS find all grades for a student without scanning the entire `STUDENT_GRADE` table.
**Explanation:** Section 13.2.2-13.2.3 — An index on `StudentID` creates a lookup structure so the DBMS can jump directly to the relevant rows rather than scanning every row.
| Option | Analysis |
|---|---|
| A | Preventing duplicates is the job of a `UNIQUE` constraint, not a plain index. |
| B | **Correct.** An index enables direct lookup, avoiding a full table scan. |
| C | Indexes do not perform calculations; they are lookup structures. |
| D | Indexes are for performance, not encryption. |

**10. Why does the chapter describe a grade update without a transaction as risky?**
**Correct Answer:** B. Because if one step succeeds and another fails, the database is left in an inconsistent partial state.
**Explanation:** Section 13.3.2 — Without transactions, a multi-step operation can partially succeed, leaving the database in an inconsistent state (e.g., grade updated but audit missing).
| Option | Analysis |
|---|---|
| A | Transactions are about safety, not speed. |
| B | **Correct.** Transactions prevent partial updates by grouping operations. |
| C | SQL does not require transactions for writes — but reliable systems use them. |
| D | `UPDATE` works without `BEGIN`/`COMMIT`; the risk is partial failure, not rejection. |

**11. What is the main reason the chapter recommends adding a composite `UNIQUE` constraint on `(StudentID, DeliverableID)` in `STUDENT_GRADE`?**
**Correct Answer:** B. To prevent a student from receiving two different scores for the same deliverable.
**Explanation:** Section 13.4.4 — A composite `UNIQUE` constraint on `(StudentID, DeliverableID)` enforces the business rule that one student can have only one score per deliverable.
| Option | Analysis |
|---|---|
| A | A `UNIQUE` constraint may incidentally help join performance, but its purpose is data integrity, not speed. |
| B | **Correct.** The constraint prevents duplicate grade records for the same student-deliverable combination. |
| C | `NOT NULL` prevents nulls; `UNIQUE` prevents duplicates. |
| D | `UNIQUE` constraints do not create backups. |

**12. Select ALL that apply: Which of the following are good reasons to use a trigger rather than application code for a rule?**
**Correct Answers:** A, C, E
**Explanation:** Section 13.5.1-13.5.2 — Triggers are best when enforcement must be universal (regardless of access path), automatic, and non-bypassable. They cannot show custom dialog boxes.
| Option | Analysis |
|---|---|
| A | **Correct.** Triggers fire regardless of which application or tool modifies the data. |
| B | Triggers cannot display user-interface messages; that is an application concern. |
| C | **Correct.** Triggers run automatically without depending on application developers. |
| D | Triggers operate at the database level and cannot show dialog boxes. |
| E | **Correct.** Universal, non-bypassable rules are a strong use case for triggers. |

**13. How does a `DEFAULT` constraint improve data quality?**
**Correct Answer:** B. It supplies a known value when none is provided, reducing ambiguity.
**Explanation:** Section 13.4.5 — A `DEFAULT` constraint supplies a fallback value so that data is never left in an ambiguous missing state.
| Option | Analysis |
|---|---|
| A | `DEFAULT` does not correct invalid values — it provides a value when none is given. |
| B | **Correct.** `DEFAULT` removes ambiguity by supplying a known fallback. |
| C | `DEFAULT` does not prevent inserts without explicit values; it fills in the missing value. |
| D | `DEFAULT` does not validate; it supplies. |

**14. Why does the chapter warn that triggers can create debugging problems?**
**Correct Answer:** C. A user may run a simple statement and not realize that additional actions are happening behind the scenes.
**Explanation:** Section 13.5.6 — "Hidden logic is still logic." The main risk is that triggers are invisible to users and application developers, causing unexpected side effects.
| Option | Analysis |
|---|---|
| A | Performance is a concern but not the primary debugging risk. |
| B | Triggers are written in SQL or a procedural SQL dialect. |
| C | **Correct.** The invisibility of trigger logic is the main debugging challenge. |
| D | Triggers do not automatically disable foreign key constraints. |

**15. In the Grading Database, what is the relationship between `GRADE_AUDIT` and a trigger on `STUDENT_GRADE`?**
**Correct Answer:** B. The trigger writes rows to `GRADE_AUDIT` automatically when grades change, creating a change history.
**Explanation:** Section 13.5.3 — An `AFTER UPDATE` trigger on `STUDENT_GRADE` inserts a row into `GRADE_AUDIT` recording the old and new scores.
| Option | Analysis |
|---|---|
| A | The trigger and audit table work together — the trigger populates the table. |
| B | **Correct.** The trigger automatically writes change records to the audit table. |
| C | `GRADE_AUDIT` is a history table, not a backup for restoration. |
| D | The trigger writes to `GRADE_AUDIT`, not reads from it for validation. |

**16. Select ALL that apply: Which of the following are trade-offs of adding indexes to a table?**
**Correct Answers:** A, B, C, E
**Explanation:** Section 13.2.6 — Indexes speed up reads (A) but cost storage (B), slow down inserts (C), and add maintenance overhead on updates and deletes (E). They do not automatically improve data integrity (D).
| Option | Analysis |
|---|---|
| A | **Correct.** Faster `SELECT` queries are the primary benefit. |
| B | **Correct.** Indexes consume additional storage space. |
| C | **Correct.** Each `INSERT` must update indexes as well as the table. |
| D | Indexes may enforce uniqueness if declared as `UNIQUE`, but plain indexes do not improve integrity. |
| E | **Correct.** `UPDATE` and `DELETE` operations must maintain indexes. |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Apply Questions

**17. An instructor runs `CREATE INDEX idx_deliverable_duedate ON DELIVERABLE (DueDate);`. Which query would benefit most?**
**Correct Answer:** B. `SELECT * FROM DELIVERABLE WHERE DueDate < '2026-05-01';`
**Explanation:** Section 13.2.2-13.2.3 — An index on `DueDate` benefits queries that filter by `DueDate`. Query B uses `WHERE DueDate < ...`, which directly leverages the index.
| Option | Analysis |
|---|---|
| A | This query filters by `StudentID`, not `DueDate` — would benefit from an index on `STUDENT.StudentID`. |
| B | **Correct.** This query filters by `DueDate`, directly matching the index. |
| C | This query has no filter on `DueDate`. |
| D | `INSERT` statements are slowed by indexes, not sped up. |

**18. If the `INSERT` into `GRADE_AUDIT` fails because the table does not exist, what happens?**
**Correct Answer:** B. Both statements fail, and the database returns to its state before `BEGIN`.
**Explanation:** Section 13.3.1-13.3.2 — Since both statements are inside a transaction, if any statement fails, the entire transaction can be rolled back, restoring the prior state.
| Option | Analysis |
|---|---|
| A | Within a transaction, if one statement fails, the transaction does not partially succeed. |
| B | **Correct.** The transaction ensures atomicity — all succeed or all fail. |
| C | Transactions do not log errors and continue — they roll back. |
| D | Transactions do not automatically create missing tables. |

**19. Which `CHECK` constraint would correctly prevent invalid scores?**
**Correct Answer:** C. `CHECK (Score BETWEEN 0 AND 100)`
**Explanation:** Section 13.4.3 — A `CHECK` constraint with `BETWEEN 0 AND 100` correctly restricts scores to the valid range.
| Option | Analysis |
|---|---|
| A | This only prevents `NULL`, not out-of-range values. |
| B | This would reject `Score = 0`, which may be valid. |
| C | **Correct.** This restricts scores to 0-100 inclusive. |
| D | This uses letter-grade values, not numeric scores — wrong data type. |

**20. `EXPLAIN QUERY PLAN` output says `SCAN TABLE STUDENT_GRADE`. What does this indicate?**
**Correct Answer:** B. The database is scanning every row, and an index on `StudentID` may help.
**Explanation:** Section 13.2.7 — `SCAN TABLE` means a full table scan. An index on the filtered column (`StudentID`) would likely change this to an index-based lookup.
| Option | Analysis |
|---|---|
| A | `SCAN TABLE` means no index is being used — the opposite of optimal. |
| B | **Correct.** A full table scan suggests an index on the filtered column would help. |
| C | `EXPLAIN QUERY PLAN` output showing a scan does not mean a syntax error. |
| D | An empty table would still show a scan, but the question context implies data exists. |

**21. Select ALL that apply: Which constraints are present in the given `STUDENT_GRADE` table definition?**
**Correct Answers:** A, B, C, E
**Explanation:** The table definition includes `PRIMARY KEY` (A), `NOT NULL` on `StudentID` and `DeliverableID` (B), `CHECK (Score BETWEEN 0 AND 100)` (C), and `UNIQUE (StudentID, DeliverableID)` (E). There is no `DEFAULT` constraint (D).
| Option | Analysis |
|---|---|
| A | **Correct.** `GradeID INTEGER PRIMARY KEY` is present. |
| B | **Correct.** `StudentID INTEGER NOT NULL` and `DeliverableID INTEGER NOT NULL` are present. |
| C | **Correct.** `Score INTEGER CHECK (Score BETWEEN 0 AND 100)` is present. |
| D | No `DEFAULT` keyword appears in the definition. |
| E | **Correct.** `UNIQUE (StudentID, DeliverableID)` is present. |

**22. An Access developer wants to display a message when a user enters an invalid grade on a form. Which tool is best?**
**Correct Answer:** C. A macro attached to the form's Before Update event.
**Explanation:** Section 13.10.2 — Access macros are designed for interface-level automation including input validation messages. `CHECK` constraints block data but do not display friendly messages.
| Option | Analysis |
|---|---|
| A | A `CHECK` constraint blocks invalid data silently — no user message. |
| B | Access does not support SQL triggers natively (data macros are the closest equivalent). |
| C | **Correct.** Form macros provide interface-level validation with user-friendly messages. |
| D | Access does not support stored procedures. |

**23. An instructor runs `UPDATE STUDENT_GRADE SET Score = 92 WHERE GradeID = 10;` with the given trigger. What happens?**
**Correct Answer:** B. The `STUDENT_GRADE` row is updated, and a new row is automatically inserted into `GRADE_AUDIT`.
**Explanation:** Section 13.5.3 — The `AFTER UPDATE` trigger fires automatically after the update, inserting the old and new scores into `GRADE_AUDIT`.
| Option | Analysis |
|---|---|
| A | The trigger would also fire, inserting into `GRADE_AUDIT`. |
| B | **Correct.** The trigger responds to the update by logging the change. |
| C | The trigger is `AFTER UPDATE`, not `INSTEAD OF` — it does not block the update. |
| D | The trigger adds an audit row; it does not replace the update. |

**24. Select ALL that apply: In PostgreSQL, which steps are required to create an audit trigger?**
**Correct Answers:** A, B, C
**Explanation:** Section 13.5.5 — PostgreSQL requires: (A) an audit table, (B) a trigger function defined with `CREATE OR REPLACE FUNCTION`, and (C) a trigger created with `CREATE TRIGGER` referencing the function. `ALTER TRIGGER ... ENABLE` (D) is for enabling/disabling existing triggers, not required for creation. A stored procedure (E) is separate from triggers.
| Option | Analysis |
|---|---|
| A | **Correct.** You need a table to store audit records. |
| B | **Correct.** PostgreSQL separates trigger logic into a function. |
| C | **Correct.** The trigger binds the function to a table and event. |
| D | Triggers are enabled by default when created; `ALTER TRIGGER ... ENABLE` is not a creation step. |
| E | Stored procedures and triggers are separate mechanisms. |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Analyze Questions

**25. A developer adds ten indexes. Queries become faster, but data entry slows noticeably. What is the most likely explanation?**
**Correct Answer:** B. Each `INSERT` must now update all ten indexes in addition to the table.
**Explanation:** Section 13.2.6 — Every `INSERT`, `UPDATE`, and `DELETE` must maintain all indexes. Ten indexes means ten additional structures to update per write operation.
| Option | Analysis |
|---|---|
| A | Syntax errors would prevent index creation, not cause slowdown. |
| B | **Correct.** Index maintenance on writes is the classic trade-off. |
| C | The DBMS does not disable indexes during inserts. |
| D | If the indexes were on wrong columns, queries would not become faster — but they did. |

**26. A database uses both a `CHECK` constraint and a `BEFORE INSERT` trigger checking the same score range. Which statement best describes this design?**
**Correct Answer:** A. The trigger is redundant and should be removed because the constraint already enforces the rule.
**Explanation:** Section 13.5.4 — The chapter states that a `CHECK` constraint is usually better for simple rules. Using both for the same rule is redundant; the constraint alone is clearer and faster.
| Option | Analysis |
|---|---|
| A | **Correct.** For simple range rules, a constraint is sufficient and cleaner. |
| B | The constraint is the simpler, more standard mechanism. |
| C | Using both for the same rule is redundancy, not layered protection. |
| D | Constraints and triggers can coexist without conflict. |

**27. Compare recording grade changes via application code vs. a trigger. Which best describes the trade-off?**
**Correct Answer:** C. Approach B guarantees the audit entry is written regardless of which tool or script performs the update, while Approach A depends on every developer remembering to include the audit step.
**Explanation:** Section 13.5.1 — A trigger fires regardless of the access path (application, admin tool, import script). Application-level auditing depends on every code path including the audit step.
| Option | Analysis |
|---|---|
| A | Application code may be easier to read but can be bypassed or forgotten. |
| B | Triggers are not necessarily faster; the advantage is universal enforcement. |
| C | **Correct.** The trigger guarantees enforcement across all access paths. |
| D | Data can be changed through paths other than the application (direct SQL, admin tools, scripts). |

**28. Select ALL that apply: A composite index on `(A, B)` is most useful when filtering by which columns?**
**Correct Answers:** A, C
**Explanation:** Section 13.2.4 — A composite index on `(A, B)` is most useful for queries filtering by `A` alone (A) or both `A` and `B` with `A` filtered first (C). It is less useful for queries filtering by `B` alone (B) because the index is organized by `A` first.
| Option | Analysis |
|---|---|
| A | **Correct.** The index can be used for queries filtering by the leading column. |
| B | The index is organized by `A` first, so filtering by `B` alone typically does not use it efficiently. |
| C | **Correct.** Filtering by both columns, with `A` first, uses the full index. |
| D | Filtering by `B` first does not match the index's column order efficiently. |
| E | Indexes are useful only when the query references the indexed columns. |

**29. A small department uses Access for grading. Which factor is the strongest argument for switching to PostgreSQL?**
**Correct Answer:** C. Access has weak built-in security, limited concurrency, and no row-level security — making it unsuitable as users and data sensitivity grow.
**Explanation:** Section 13.9.1 vs 13.9.3 — Access's limitations in security, concurrency, and scalability are the primary reasons to switch to a server DBMS as systems grow.
| Option | Analysis |
|---|---|
| A | Access fully supports `SELECT` queries. |
| B | Access supports validation rules (its equivalent of `CHECK` constraints). |
| C | **Correct.** Security, concurrency, and row-level access control are the core gaps. |
| D | Access databases can be up to 2 GB — far beyond 1 MB. |

**30. Which SQL pattern would identify grades changed more than three times from `GRADE_AUDIT`?**
**Correct Answer:** B. `SELECT GradeID FROM GRADE_AUDIT GROUP BY GradeID HAVING COUNT(*) > 3;`
**Explanation:** Section 13.7 — This uses `GROUP BY` and `HAVING` to count audit entries per grade and filter to those with more than three changes.
| Option | Analysis |
|---|---|
| A | `STUDENT_GRADE` stores current grades, not change history. |
| B | **Correct.** Grouping audit rows by `GradeID` and counting gives the number of changes. |
| C | This filters rows where old and new scores differ but does not count changes per grade. |
| D | A join without aggregation does not count changes. |

**31. A `UNIQUE` index on `(StudentID, DeliverableID)` exists. Policy now allows resubmissions. What must happen?**
**Correct Answer:** B. The index must be dropped or modified to include an `AttemptNumber` column before resubmissions can be stored.
**Explanation:** Section 13.2.5 — The chapter explicitly shows this scenario: if resubmissions are allowed, the unique index must include an `AttemptNumber` column to distinguish multiple attempts for the same student-deliverable pair.
| Option | Analysis |
|---|---|
| A | Unique indexes do not allow duplicate combinations. |
| B | **Correct.** The index must be restructured to accommodate the new business rule. |
| C | Duplicate inserts would fail with a constraint violation, not be silently ignored. |
| D | Indexes do not automatically convert from unique to non-unique. |

**32. Select ALL that apply: Which are valid reasons to choose a stored procedure over application code for a multi-step grade correction?**
**Correct Answers:** A, B, D
**Explanation:** Section 13.11.3 — Stored procedures are good when the same logic is needed from multiple tools (A), when logic involves branching that is awkward in SQL (B), and when consistency regardless of initiator matters (D). They are not always faster (C), and they do not automatically create audit trails (E).
| Option | Analysis |
|---|---|
| A | **Correct.** A stored procedure provides one callable routine for all access paths. |
| B | **Correct.** Procedural logic with conditions and branching suits stored procedures. |
| C | Stored procedures are not inherently faster than all other approaches. |
| D | **Correct.** Consistent execution regardless of the calling tool is a key benefit. |
| E | Audit trails require explicit logic — stored procedures do not create them automatically. |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Evaluate Questions

**33. Where should business rules be enforced — application code or database? Which position does Chapter 13 most support?**
**Correct Answer:** C. Rules that must be universal and non-bypassable belong in the database; rules involving user interaction or frequent change may belong in the application — the strongest systems use both.
**Explanation:** Sections 13.4, 13.5, 13.10, 13.11 — The chapter consistently advocates for database-level enforcement of universal rules while recognizing that application-level logic has its place for user interaction and flexibility.
| Option | Analysis |
|---|---|
| A | This ignores the database's role as the last line of defense. |
| B | This ignores the value of application-level user guidance. |
| C | **Correct.** A layered approach uses both where each is strongest. |
| D | The chapter argues that where rules are enforced matters — documentation alone is insufficient. |

**34. A production database with 2 million grade rows has slow join reports. Which indexing strategy is most appropriate as a first step?**
**Correct Answer:** C. Index `StudentID` and `DeliverableID` in `STUDENT_GRADE` (the foreign keys used in joins), then measure before adding more.
**Explanation:** Section 13.2.6 — The chapter recommends indexing join columns and common filter columns first, then measuring before expanding. Indexing everything is wasteful; indexing nothing leaves the problem unsolved.
| Option | Analysis |
|---|---|
| A | Indexing every column is wasteful and slows writes — the chapter explicitly warns against this. |
| B | Primary keys are already indexed, but foreign keys (used in joins) may not be. |
| C | **Correct.** Target the columns most used in joins and filters, measure, then iterate. |
| D | Rebuilding from scratch is unnecessary and destructive. |

**35. Which permission design best follows the principle of least privilege for a multi-role grading system?**
**Correct Answer:** B. Create one role per user type, grant only the necessary permissions to each role, and assign users to roles.
**Explanation:** Section 13.8.2 — The chapter advocates role-based access control: create roles, grant minimal permissions per role, and assign users to roles.
| Option | Analysis |
|---|---|
| A | Granting all permissions to all users violates least privilege. |
| B | **Correct.** Role-based access with minimal grants per role follows least privilege. |
| C | This creates a bottleneck and does not grant necessary access to users. |
| D | Shared accounts prevent accountability and individual permission tracking. |

**36. Select ALL that apply: A student's grade disappeared and no one knows who changed it. Which hardening techniques would have helped?**
**Correct Answers:** A, B, E
**Explanation:** Sections 13.5.3, 13.8 — An audit table (A) and trigger logging (B) would record the change. Role-based permissions (E) would restrict who can modify grades in the first place. An index (C) improves performance but does not track changes. A `CHECK` constraint (D) restricts allowed values but does not log changes.
| Option | Analysis |
|---|---|
| A | **Correct.** An audit table would store the old and new values with timestamps. |
| B | **Correct.** A trigger would automatically record every grade change. |
| C | An index speeds up queries but provides no change-tracking. |
| D | A `CHECK` constraint restricts values but does not record changes. |
| E | **Correct.** Role-based permissions would limit who can modify grades. |

**37. Which SQL approach produces the most transparent and maintainable final-grade calculation?**
**Correct Answer:** C. A chain of CTEs that calculates category averages, multiplies by weights, and sums the results — optionally wrapped in a view for reuse.
**Explanation:** Section 13.7.5 — The chapter demonstrates a CTE-based weighted grade calculation and recommends breaking complex logic into readable stages, optionally wrapping in a view.
| Option | Analysis |
|---|---|
| A | Dense nested queries are hard to read, debug, and maintain. |
| B | Manual Excel calculation is error-prone and not reproducible. |
| C | **Correct.** CTEs make each stage visible, and views make the logic reusable. |
| D | A trigger recalculating after every score change is fragile and may have performance issues. |

**38. Moving from Access to Supabase/PostgreSQL — which capability is the most significant improvement?**
**Correct Answer:** C. Built-in row-level security, role-based access control, and support for concurrent multi-user access.
**Explanation:** Sections 13.9.1, 13.9.3 — Access has weak built-in security, limited concurrency, and no row-level security. PostgreSQL/Supabase provides all of these as built-in features.
| Option | Analysis |
|---|---|
| A | Access fully supports `SELECT`. |
| B | Access supports primary keys. |
| C | **Correct.** Security, access control, and concurrency are the key improvements. |
| D | Access supports text data. |

**39. A trigger updating three other tables on every grade change slows down grade entry. What is the most likely cause and best recommendation?**
**Correct Answer:** B. The trigger is performing too much work on each grade change — review whether all three table updates are necessary or whether some logic can be moved to a stored procedure or scheduled job.
**Explanation:** Section 13.5.6 — The chapter warns against triggers that do too much work, causing hidden performance problems. The fix is to review whether the trigger's workload is appropriate.
| Option | Analysis |
|---|---|
| A | Triggers have valid uses; the problem is not triggers in general but this specific trigger's workload. |
| B | **Correct.** Review the trigger's logic and consider offloading non-urgent work. |
| C | While hardware can help, a trigger updating three tables per grade change is a design issue, not just a hardware issue. |
| D | Adding indexes would not fix a trigger performing excessive work. |

**40. Select ALL that apply: Which are characteristics of a well-hardened production database?**
**Correct Answers:** A, C, D, E
**Explanation:** Throughout Chapter 13 — A well-hardened database has measured indexing (A), transaction-protected multi-step operations (C), constraint-enforced rules (D), and automatic audit logging (E). It does not index every column (B), which the chapter explicitly warns against.
| Option | Analysis |
|---|---|
| A | **Correct.** Indexing should be based on measured query patterns, not guesswork. |
| B | The chapter explicitly warns that indexing every column is usually a mistake. |
| C | **Correct.** Transactions protect multi-step operations from partial failure. |
| D | **Correct.** Constraints enforce business rules at the database level. |
| E | **Correct.** Automatic audit logging through triggers or equivalent mechanisms supports accountability. |

---

## Question Distribution Summary

| Bloom Level | MC Questions | Select ALL Questions | Total |
|---|---|---|---|
| Remember | 7 | 1 | 8 |
| Understand | 6 | 2 | 8 |
| Apply | 6 | 2 | 8 |
| Analyze | 6 | 2 | 8 |
| Evaluate | 5 | 3 | 8 |
| **Total** | **30** | **10** | **40** |

| Design Criterion | Count |
|---|---|
| Application-based | 14 |
| Scenario-based | 12 |
| Definition-only | 8 |
| Schema-specific (Grading Database) | 6 |

**AI-Resistance Strategies Applied:** Chapter-specific reasoning, schema-specific context (Grading Database tables/columns), scenario stems with embedded traps, multi-answer discrimination (Select ALL), non-obvious correct answers (paraphrased), platform-specific details (Access macros, SQLite `PRAGMA`, PostgreSQL trigger pattern), output prediction (Apply-level SQL reasoning).
