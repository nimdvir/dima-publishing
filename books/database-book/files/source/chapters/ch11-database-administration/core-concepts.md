# Chapter 11: Database Administration

Chapter 9 showed us how to design databases from business requirements. Chapter 10 showed us how to query them professionally for insight. Chapter 11 now asks a different question: who protects the data, keeps it running, and makes sure it is still there tomorrow?

Database design and SQL are forward-looking disciplines — they build and query. Database administration is a sustaining discipline — it guards, maintains, recovers, and evolves. Every well-designed system that supports real decisions depends on someone making sure it stays secure, fast, available, and trustworthy.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Core Concepts

# What Is Database Administration?

**Database administration** is the discipline of managing databases so that they remain secure, reliable, available, recoverable, and efficient over time.

Earlier chapters focused on the structure and use of databases:

- Chapter 6 introduced the relational model.
- Chapter 7 explained normalization.
- Chapter 9 used advanced SQL to analyze and report from the Grading Database.
- Chapter 10 explained how business requirements become database designs.

Those chapters focused on what a database **is** and what it can **do**. Chapter 11 focuses on how a database **survives real use**.

A database may begin as a clean design. Then reality arrives:

- Users enter data.
- Users make mistakes.
- Tables grow.
- Queries get slower.
- Permissions need to change.
- Hardware fails.
- Backups need to be restored.
- Regulations require audit trails.
- Cloud bills increase.
- Reports become mission-critical.

A database administrator, or **DBA**, is responsible for keeping the database trustworthy under those conditions.

## Design vs. Administration

<!-- FIGURE PLACEHOLDER: Design creates structure; Administration keeps it running. Recommend chapter-media. -->

Database design and database administration are related, but they are not the same.

| Question | Design Perspective | Administration Perspective |
|---|---|---|
| What should the database look like? | Entities, tables, keys, relationships | Does the implemented structure remain healthy? |
| How should facts be stored? | Normalization and schema design | Integrity checks and change management |
| How should users get answers? | SQL queries and reporting views | Performance tuning and access control |
| What happens when something fails? | Usually not the design focus | Backup, recovery, logs, and disaster planning |
| Who can access data? | May be specified as a requirement | Implemented through users, roles, and privileges |

A simple way to remember the difference:

> **Design creates the structure. Administration keeps the structure dependable.**

## Data Administration vs. Database Administration

In larger organizations, there is often a distinction between **Data Administration** and **Database Administration**.

| Role | Scope | Main Focus | Typical Questions |
|---|---|---|---|
| **Data Administration (DA)** | Organization-wide | Governance, policy, standards, meaning, compliance | What does this data mean? Who owns it? How may it be used? |
| **Database Administration (DBA)** | Specific database systems | Technical reliability, security, recovery, performance | Is the database secure, backed up, available, and efficient? |

**Data Administration** is concerned with the organizational meaning and governance of data. It defines naming standards, data definitions, privacy rules, retention policies, and compliance expectations.

**Database Administration** is concerned with implementation and operations. It manages accounts, permissions, backups, recovery procedures, performance, monitoring, and system maintenance.

In a small organization, one person may perform both roles. In a large organization, they may be separate departments. The distinction matters because data problems are not only technical. They are also policy, governance, and accountability problems.

## The DBA as Guardian of Data Trust

The DBA protects the conditions under which data can be trusted.

Those conditions include:

- **Accuracy:** data is not corrupted or accidentally overwritten.
- **Security:** sensitive data is not exposed to unauthorized users.
- **Availability:** authorized users can access the database when needed.
- **Recoverability:** data can be restored after failure.
- **Performance:** queries and reports run within acceptable time.
- **Continuity:** the system can survive failures, growth, and change.

For the Grading Database, these responsibilities are concrete. Students should not see other students' grades. Instructors should be able to update grades safely. A missing backup should not cause the loss of a semester's records. A report should not take ten minutes to calculate class averages. DBA work makes those expectations possible.

> **Key Takeaway:** Database administration is not a background technical chore. It is the work that keeps organizational data usable, protected, and credible.

## The Data Professional Ecosystem

A DBA does not work alone. Database administration interacts with several other data-focused roles:

- **Data Engineers** build and maintain the pipelines that move data from operational databases into analytical data warehouses or data lakes.
- **Data Analysts** query the data to produce reports, dashboards, and business insights.
- **Data Scientists** use the data to build predictive models, run experiments, and uncover deep patterns using machine learning.
- **Application Developers** write the code that connects user interfaces to the database.
- **Infrastructure Operators** manage the servers, networks, and cloud environments where the databases run.

The DBA enables all these roles by ensuring the foundational database remains fast, secure, and available.

---

# Core DBA Responsibilities

Although DBA work varies by organization and platform, most responsibilities fall into several major categories.

| Responsibility | What It Protects | Example in the Grading Database |
|---|---|---|
| Security and access control | Confidentiality and integrity | Students can view only their own grades |
| Concurrency control | Correctness under multi-user access | Two users cannot overwrite the same grade silently |
| Transaction management | Reliability of multi-step operations | Grade update and audit entry succeed or fail together |
| Backup and recovery | Data survival after failure | Restore grade records after accidental deletion |
| Performance tuning | Responsiveness and usability | Index `StudentID` to speed up student-grade reports |
| Maintenance | Long-term health | Compact, repair, reindex, and check integrity |
| Documentation and change management | Continuity and accountability | Record schema changes and backup schedules |
| Capacity planning | Future growth | Plan for more sections, students, logs, and reports |

## Security and Access Management

Security ensures that users can do what they need to do, but no more.

In a grading system:

- Students may read their own grades.
- Teaching assistants may enter attendance.
- Instructors may update grades.
- Administrators may manage users and system settings.
- No ordinary user should be able to delete the entire grade table.

A DBA implements those boundaries through authentication, authorization, roles, and privileges.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Concurrency Control

Concurrency control manages simultaneous access. Databases are shared systems. Multiple users may read and write at the same time. Without coordination, one user's update may overwrite another's work or produce inconsistent results.

Concurrency control protects the database when many operations overlap.

## Transaction Management

A transaction groups several database operations into one logical unit. Either all of the operations succeed, or none of them do. Transactions are essential when a business action requires multiple related updates.

For example, updating a grade may also require recording who made the change and when. The update and the audit record should succeed together.

## Backup and Recovery

Backups protect against data loss. Recovery procedures define how the database will be restored after a failure.

A backup strategy is not complete until it has been tested. An untested backup is a hope, not a plan.

## Performance Monitoring and Tuning

Performance is the difference between a useful system and an ignored system. A report that takes too long to run may not be used. A gradebook that freezes during updates undermines trust.

DBAs monitor query speed, indexing, locks, storage, memory, and system load.

## Maintenance and Evolution

Databases change. New reports are requested. New columns are added. Old data is archived. Indexes are rebuilt. Files are compacted. Permissions are reviewed. Maintenance keeps the database healthy as it ages.

> **Real-World Example:**  
> An online retailer stores orders, inventory, customers, and payments in PostgreSQL. The DBA team manages nightly backups, monitors slow queries, restricts payment-data access, and creates indexes for high-volume order searches. When a software bug deletes several hundred order rows, the DBA restores the affected data from backup and transaction logs. The business experiences a manageable incident instead of a permanent loss.

---

# Multi-User Databases and Concurrency Control

A database becomes more complicated the moment more than one person or process uses it at the same time.

Imagine this grading scenario:

1. Instructor A opens Alice's Quiz 2 grade and changes it from 84 to 90.
2. Instructor B opens the same grade before A saves the change.
3. Instructor B changes the grade from 84 to 88.
4. Both save their work.

Which grade should remain: 90 or 88?

Without concurrency control, one update may overwrite the other. This is called a **lost update**.

## Common Concurrency Problems

<!-- FIGURE PLACEHOLDER: Lost update scenario — two users read the same value, both update it, and the last write overwrites the first. Recommend chapter-media. -->

When operations overlap, several read and write anomalies can occur:

| Problem | What Happens | Example |
|---|---|---|
| **Lost update** | One user's change overwrites another user's change. | Two instructors edit the same grade simultaneously. |
| **Dirty read** | A user reads uncommitted data that may later be rolled back. | A report includes a provisional grade before the update is finalized. |
| **Nonrepeatable read** | A user reads the same row twice during a transaction and gets different results. | An instructor checks a score, but it changes before they finish their review. |
| **Phantom read** | A query rerun returns new rows inserted by another transaction. | A new grade appears mid-calculation during a class average report. |

These problems occur because database operations overlap in time.

## Cursors

A **cursor** is a database mechanism that processes query results one row at a time instead of as a single batch. Cursors are sometimes necessary in application code, but they can degrade concurrency by holding locks open while waiting for user interaction. In most analytical and reporting scenarios, set-based SQL operations are preferred over row-by-row cursor processing.

<div class="callout note">
  <p><strong>📝 Advanced Note: Cursor Types</strong></p>
  <p>Different cursor types handle concurrency differently:</p>
  <ul>
    <li><strong>Static cursors</strong> take a snapshot of the data. Changes made by other users while the cursor is open are not visible.</li>
    <li><strong>Dynamic cursors</strong> reflect all changes to the result set rows as you scroll.</li>
    <li><strong>Keyset cursors</strong> fix the membership of the result set when opened but detect changes to existing row values.</li>
  </ul>
</div>

## Locks

A **lock** is a temporary control that prevents conflicting access to data.

| Lock Type | Purpose | Example |
|---|---|---|
| Shared lock | Allows reading while preventing conflicting writes | Several users view the same grade report |
| Exclusive lock | Allows one transaction to modify data while blocking conflicting access | One instructor updates a grade |

## Lock Granularity

Locks may apply at different levels.

| Granularity | Meaning | Advantage | Disadvantage |
|---|---|---|---|
| Row-level lock | Locks only selected rows | High concurrency | More overhead |
| Page-level lock | Locks a storage page containing multiple rows | Balanced overhead | May block unrelated rows |
| Table-level lock | Locks an entire table | Simpler | Reduces concurrency |
| Database-level lock | Locks the whole database | Safe for major maintenance | Blocks most activity |

A file-based database may use broader locks. A server-based DBMS usually supports finer-grained locking.

## Pessimistic and Optimistic Locking

DBMSs and applications generally manage conflicts using one of two strategies.

| Strategy | Assumption | How It Works | Best For |
|---|---|---|---|
| **Pessimistic locking** | Conflicts are likely | Lock data before editing | Banking, inventory, high-risk updates |
| **Optimistic locking** | Conflicts are rare | Allow edits, then check for conflicts before saving | Read-heavy systems, low-conflict environments |

In a grading database, pessimistic locking might be appropriate if several instructors often edit the same records. Optimistic locking might be acceptable if grade edits are rare and usually performed by one instructor.

## Two-Phase Locking

**Two-Phase Locking (2PL)** is a protocol that helps ensure transactions behave correctly under concurrency.

It has two phases:

1. **Growing phase:** the transaction acquires locks but cannot release any.
2. **Shrinking phase:** the transaction releases locks but cannot acquire any new ones.

Once a transaction enters the shrinking phase and starts releasing locks, it can no longer lock new data. This disciplined rule helps guarantee **serializability**, meaning that even if transactions run at the same time, the final result is equivalent to some safe sequential order.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Deadlocks

A **deadlock** occurs when two or more transactions wait for each other indefinitely.

Example:

- Transaction A locks `STUDENT` and waits for `STUDENT_GRADE`.
- Transaction B locks `STUDENT_GRADE` and waits for `STUDENT`.

Neither can continue.

Modern DBMSs detect deadlocks and resolve them by choosing one transaction as the victim, rolling it back, and allowing the other transaction to continue.

DBAs reduce deadlocks by:

- keeping transactions short,
- accessing tables in a consistent order,
- indexing foreign keys,
- avoiding unnecessary locks,
- monitoring deadlock logs.

> **Key Takeaway:** Concurrency control allows many users to work with the same database without turning shared data into shared chaos.

> **Advanced Note: Multi-Version Concurrency Control (MVCC).** PostgreSQL and Supabase use MVCC instead of traditional read locks. Under MVCC, readers see a consistent snapshot of the data without blocking writers, and writers create new versions of rows rather than overwriting them. This is why PostgreSQL can handle high-concurrency analytical workloads efficiently. The trade-off is that old row versions must be periodically cleaned up through a process called vacuuming.

---

# Transactions and ACID Reliability

Concurrency control manages simultaneous users. Transactions manage reliability when operations succeed, fail, or partially complete. A transaction defines the unit of work; concurrency control determines how multiple transactions interact safely.

A **transaction** is a logical unit of work made of one or more database operations. The database treats the group as one all-or-nothing action.

## Why Transactions Matter

Suppose an instructor updates a grade and records an audit entry.

```text
Step 1: Update STUDENT_GRADE.
Step 2: Insert a row into GRADE_AUDIT.
```

If Step 1 succeeds and Step 2 fails, the grade changes but there is no record of who changed it. If Step 2 succeeds and Step 1 fails, the audit log claims a change occurred when it did not. Both outcomes are bad.

A transaction ensures that the two operations succeed or fail together.

## Transaction Control Commands

Most relational DBMSs support three core transaction commands:

| Command | Meaning |
|---|---|
| `BEGIN` or `BEGIN TRANSACTION` | Starts a transaction |
| `COMMIT` | Saves all changes permanently |
| `ROLLBACK` | Undoes all changes since the transaction began |

Example:

```sql
BEGIN TRANSACTION;

UPDATE STUDENT_GRADE
SET Score = 92
WHERE GradeID = 5;

INSERT INTO GRADE_AUDIT (GradeID, ActionTaken, ActionTime)
VALUES (5, 'Score updated to 92', CURRENT_TIMESTAMP);

COMMIT;
```

If a problem occurs before `COMMIT`, the transaction can be undone:

```sql
ROLLBACK;
```

## The ACID Properties

<!-- FIGURE PLACEHOLDER: ACID quadrant — Atomicity, Consistency, Isolation, Durability as four pillars of transaction reliability. Recommend chapter-media. -->

Reliable transactions are governed by the **ACID** properties.

| Property | Meaning | Grading Database Example |
|---|---|---|
| **Atomicity** | All operations succeed or none do | Grade update and audit insert happen together |
| **Consistency** | Rules remain valid before and after | Score must remain between 0 and 100 |
| **Isolation** | Concurrent transactions do not interfere | Two instructors cannot corrupt the same grade |
| **Durability** | Committed changes survive failure | Saved grade remains after a crash |

## Atomicity

Atomicity means **all or nothing**. If a transaction has five steps, the database does not keep only the first three if Step 4 fails. It rolls the entire transaction back.

## Consistency

Consistency means that a transaction moves the database from one valid state to another. It cannot violate constraints such as:

- primary key uniqueness,
- valid foreign keys,
- `NOT NULL` rules,
- score-range rules,
- business constraints.

For example, a transaction should not insert a grade for a nonexistent student.

## Isolation

Isolation means that each transaction behaves as if it were running alone, even when many transactions are active. Different DBMSs offer different isolation levels, but the purpose is always the same: prevent one transaction from seeing or disrupting unsafe intermediate states.

## Durability

Durability means that once a transaction is committed, the change survives system failure. If the database confirms that a grade update was saved, the grade should still be there after a restart.

> **Real-World Example:**  
> In banking, transferring money requires decreasing one account balance and increasing another. If the debit succeeds but the credit fails, money disappears. If the credit succeeds but the debit fails, money appears. Transactions prevent both failures by treating the transfer as one unit of work.

---

# Database Security

Database security ensures that data is protected from unauthorized access, unauthorized modification, accidental damage, and unnecessary exposure.

Security is not only about hackers. Many security problems come from ordinary users having more privileges than they need.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## The CIA Triad

Database security is often described through the **CIA triad**.

| Goal | Meaning | Grading Database Example |
|---|---|---|
| **Confidentiality** | Only authorized users can access sensitive data | Students cannot see other students' grades |
| **Integrity** | Data remains accurate and protected from unauthorized change | Only instructors can update grades |
| **Availability** | Authorized users can access the database when needed | Grade reports are available before advising |

Security must balance all three. A database that is perfectly confidential but unavailable is not useful. A database that is highly available but exposes private data is dangerous.

## Authentication and Authorization

Security begins with two questions.

| Concept | Question | Example |
|---|---|---|
| **Authentication** | Who are you? | User logs in with credentials |
| **Authorization** | What are you allowed to do? | Instructor can update grades; student cannot |

A user may be authenticated but still not authorized to perform a specific action.

## Roles and Privileges

Professional databases usually use **role-based access control (RBAC)**.

- A **user** is an individual account.
- A **role** represents a job function.
- A **privilege** is permission to perform an action such as `SELECT`, `INSERT`, `UPDATE`, or `DELETE`.

Instead of granting permissions to each person one by one, the DBA grants permissions to roles and assigns users to roles.

Example roles for the Grading Database:

| Role | Appropriate Access |
|---|---|
| Student | Read own grades only |
| Teaching Assistant | Insert attendance, read grade reports |
| Instructor | Insert and update grades, read all course data |
| Department Admin | Read reports, audit submissions |
| DBA | Manage schema, backups, permissions, and maintenance |

## Least Privilege

The **principle of least privilege** says that users should receive only the permissions required to do their work.

This principle protects against both malicious misuse and honest mistakes. A teaching assistant who does not need to delete grades should not have `DELETE` privileges on `STUDENT_GRADE`.

## Example: Role-Based Permissions

In PostgreSQL-style SQL, permissions may look like this:

```sql
CREATE ROLE instructor;
CREATE ROLE teaching_assistant;
CREATE ROLE student_viewer;

GRANT SELECT ON STUDENT TO instructor;
GRANT SELECT, INSERT, UPDATE ON STUDENT_GRADE TO instructor;

GRANT SELECT ON STUDENT TO teaching_assistant;
GRANT SELECT, INSERT ON ATTENDANCE TO teaching_assistant;

GRANT SELECT ON GradebookSummary TO student_viewer;
```

The exact syntax varies across platforms, but the principle is stable: assign privileges to roles, then assign users to roles.

## Views as Security Layers

Views can reduce exposure by showing only the fields a role needs.

Example:

```sql
CREATE VIEW StudentGradeSummary AS
SELECT StudentID,
       DeliverableID,
       Score
FROM STUDENT_GRADE;
```

A student-facing view might omit email addresses, audit fields, instructor notes, or internal identifiers. The view becomes a controlled access layer.

## SQL Injection

**SQL injection** occurs when an attacker submits input that changes the meaning of a SQL command.

Unsafe pattern:

```text
"SELECT * FROM STUDENT WHERE Email = '" + user_input + "';"
```

If user input is inserted directly into SQL text, malicious input can alter the query.

The safer approach is to use **parameterized queries**, where user input is treated as data rather than executable SQL.

> **Important:** SQL injection is one of the most preventable database attacks. Never build SQL commands by directly concatenating untrusted user input.

## Security as a Continuous Process

Security is not finished after accounts are created. DBAs must regularly:

- remove inactive users,
- rotate or manage credentials,
- review permissions,
- audit access logs,
- patch DBMS software,
- enforce encryption where appropriate,
- monitor suspicious activity.

> **Key Takeaway:** Database security is the disciplined management of identity, permissions, exposure, and accountability.

---

# Backup and Recovery

Backup and recovery planning answers one of the most important operational questions:

> **What will we do when something goes wrong?**

Not if. When.

Failures can come from hardware, software, human error, cyberattacks, cloud outages, accidental deletes, corrupted files, or natural disasters.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Backup Types

<!-- FIGURE PLACEHOLDER: Backup timeline comparing full, incremental, and differential backup strategies. Recommend chapter-media. -->

| Backup Type | What It Stores | Advantage | Disadvantage |
|---|---|---|---|
| **Full backup** | Complete database copy | Easiest to restore | Takes the most time and storage |
| **Incremental backup** | Changes since the last backup of any type | Efficient storage | Slower restore; multiple files needed |
| **Differential backup** | Changes since the last full backup | Faster restore than incremental | Grows larger until next full backup |

A common strategy combines periodic full backups with more frequent incremental or differential backups.

## Recovery Objectives: RPO and RTO

<!-- FIGURE PLACEHOLDER: RPO/RTO disaster timeline showing the recovery point and recovery time objectives on a visual timeline. Recommend chapter-media. -->

Two practical concepts guide recovery planning.

| Term | Meaning | Question |
|---|---|---|
| **Recovery Point Objective (RPO)** | Maximum acceptable data loss | How much data can we afford to lose? |
| **Recovery Time Objective (RTO)** | Maximum acceptable downtime | How quickly must we recover? |

For a personal practice database, losing one day of work may be acceptable. For a payroll database, losing one day may be unacceptable. For a hospital system, even a few minutes of downtime may be dangerous.

## Recovery Logs

A **recovery log** records changes made to the database. Logs allow the system to undo or redo operations during recovery.

| Log Record | Meaning | Used For |
|---|---|---|
| Before-image | Value before the change | Rollback |
| After-image | Value after the change | Rollforward |

## Rollback and Rollforward

| Technique | What It Does | Example |
|---|---|---|
| **Rollback** | Undoes incomplete or incorrect transactions | Undo a failed grade update |
| **Rollforward** | Restores a backup, then reapplies logged changes | Restore Monday backup and replay Tuesday transactions |

Rollback is like pressing undo. Rollforward is like restoring an older version and replaying everything valid that happened after it.

## Disaster Recovery Planning

A backup file alone is not a disaster recovery plan. A recovery plan should define:

- where backups are stored,
- how often backups run,
- who can restore them,
- how restoration is tested,
- how long recovery should take,
- how much data loss is acceptable,
- how users will be notified during downtime.

A DBA should periodically perform test restores. The worst time to discover that backups are broken is after data is lost.

## File-Based Backup Example

For Microsoft Access or SQLite, backup may be as simple as copying the database file. But the file should be closed or safely backed up through a proper backup mechanism.

Example naming convention:

```text
GradingDB_backup_2026-05-18_1400.accdb
grading_backup_2026-05-18_1400.sqlite
```

A timestamped naming convention makes it easier to identify recovery points.

## SQLite Backup and Journal Modes

SQLite supports explicit backup and journal mechanisms.

Example command-line backup:

```bash
sqlite3 grading.db ".backup 'grading_backup_2026-05-18.db'"
```

SQLite also supports journal modes.

```sql
PRAGMA journal_mode;
PRAGMA journal_mode = WAL;
```

**Write-Ahead Logging (WAL)** can improve concurrency because readers and writers interfere less with each other. It also supports crash recovery by writing changes to a log before they are checkpointed into the main database file.

## Cloud Backup Considerations

Cloud platforms often provide automated backups, snapshots, and point-in-time recovery. However, cloud backups do not remove DBA responsibility.

A DBA still needs to know:

- how often backups occur,
- how far back recovery can go,
- whether backups include all schemas and data,
- who has permission to restore,
- what recovery will cost,
- whether human error is covered.

> **Key Takeaway:** A database without a tested recovery plan is not reliable. It is merely lucky.

---

## End-to-End Scenario: The Gradebook Crash

<!-- FIGURE PLACEHOLDER: Recovery in action — the Gradebook Crash scenario showing backup, log replay, and rollforward. Recommend chapter-media. -->

Consider how security, transactions, and recovery work together during an incident:

1. **The Mistake:** An exhausted teaching assistant intends to delete one duplicate grade row. Because their role was mistakenly granted broad `DELETE` privileges instead of least privilege, they run a delete query without a `WHERE` clause.
2. **The Damage:** All 4,000 grades for the semester are deleted. Because this was a single atomic transaction, it succeeds completely. The data is gone.
3. **The Panic:** The instructor cannot see any grades.
4. **The Recovery:** The DBA is called. They check the **recovery log** and see the massive delete transaction. They initiate a **restore** using last night's full backup. They then **rollforward** the logs, replaying all valid transactions that happened this morning—stopping exactly one second before the TA's destructive command.
5. **The Aftermath:** The grades are restored. The DBA reviews the TA role, revokes the broad `DELETE` permission, and enforces least privilege.

This is why DBA work is a continuous cycle of protection, response, and improvement.

> **Key Takeaway:** DBA disciplines act together. Access control reduces the risk of accidents, transactions ensure the accident is a clean boundary, and recovery restores the system to a valid state.

---

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Performance Monitoring and Tuning

Performance tuning is the work of keeping the database responsive as usage grows.

A query that runs instantly on 50 rows may become slow on 5 million rows. A report that works for one instructor may fail when used by 400 users. Performance issues often appear gradually, which means DBAs must monitor proactively.

## Common Performance Problems

| Problem | Cause | Possible DBA Response |
|---|---|---|
| Slow filters | Missing index | Create index on filtered column |
| Slow joins | Missing index on foreign key | Index join columns |
| Long-running reports | Inefficient query or too much aggregation | Create view, summary table, or optimized query |
| Lock waits | Transactions hold locks too long | Shorten transactions, tune queries |
| Storage growth | Tables/logs/indexes expanding | Archive data, compact, plan capacity |
| High cloud cost | Inefficient queries or over-provisioning | Optimize queries, right-size resources |

## Indexes

An **index** is a data structure that helps the DBMS find rows faster.

Without an index, the DBMS may scan every row in a table. With an index, it can jump more directly to matching rows.

Example:

```sql
CREATE INDEX idx_student_grade_student
ON STUDENT_GRADE(StudentID);
```

This index can speed up queries that filter or join on `StudentID`.

## Index Trade-Offs

Indexes are not free.

| Benefit | Cost |
|---|---|
| Faster reads | Slower inserts, updates, and deletes |
| Faster joins | More storage |
| Faster filters and sorting | More maintenance overhead |

A DBA should avoid indexing every column just because indexes sound useful. Indexes are design decisions.

## The Handoff to Advanced Hardening

This chapter covers the foundations of database administration: managing concurrency, ensuring recoverability, and applying basic performance concepts like indexes. However, as systems scale, DBAs must dive much deeper into technical optimization.

In **Chapter 13**, you will explore advanced database hardening. That chapter dives into reading detailed query plans (like `EXPLAIN`), advanced index optimization, and deep security configurations necessary for enterprise-scale deployments. For now, understand that performance tuning is a continuous process of measurement and adjustment.

## Performance and Query Design

Some performance problems are not caused by the DBMS. They are caused by poor query logic.

Common issues include:

- joining more tables than necessary,
- filtering after aggregation when filtering could happen earlier,
- using functions on indexed columns in ways that prevent index use,
- returning `SELECT *` when only a few columns are needed,
- running large reports during peak transactional use.

## Performance and Business Impact

Performance is not only technical. It affects behavior.

If grade reports take too long, instructors may export data into spreadsheets and create unofficial copies. If dashboards are slow, managers may stop using them. If registration systems slow down under load, students lose trust.

> **Key Takeaway:** Performance tuning supports both technical efficiency and organizational confidence.

---

# Maintenance and Database Evolution

Databases are living systems. Once deployed, they continue to grow, change, and age.

## Routine Maintenance Tasks

| Task | Purpose | Example |
|---|---|---|
| Integrity checks | Detect corruption or invalid structure | `PRAGMA integrity_check;` in SQLite |
| Reindexing | Rebuild index structures | `REINDEX;` |
| Compaction | Reclaim unused file space | Access Compact and Repair; SQLite `VACUUM;` |
| Log monitoring | Manage log growth and detect issues | Review transaction logs |
| Permission review | Remove unnecessary access | Disable old accounts |
| Backup testing | Verify recoverability | Restore backup to test environment |
| Schema documentation | Preserve institutional knowledge | Update ERDs and data dictionaries |

SQLite examples:

```sql
PRAGMA integrity_check;
REINDEX;
VACUUM;
```

## Schema Changes

No schema remains perfect forever. New requirements emerge:

- Add submission timestamps.
- Track multiple attempts.
- Add grade-change reasons.
- Support multiple course sections.
- Add student accommodations.
- Archive old semesters.

Schema evolution should be managed carefully. A DBA should consider:

- migration scripts,
- backward compatibility,
- test environments,
- dependencies from reports and applications,
- rollback plans,
- documentation updates.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Change Management

Professional database environments usually require formal change management.

A change request should answer:

1. What is changing?
2. Why is it needed?
3. Which tables, views, queries, reports, or applications are affected?
4. How will the change be tested?
5. How will the change be reversed if it fails?
6. Who approved the change?

This may feel bureaucratic, but uncontrolled database changes are dangerous. A small schema change can break many reports.

## Documentation

A database without documentation becomes harder to maintain every semester, every release, and every staff transition.

Useful documentation includes:

- ER diagrams,
- table descriptions,
- key and relationship definitions,
- data dictionary,
- backup schedule,
- restore procedure,
- user roles,
- maintenance checklist,
- known limitations.

> **Real-World Example:**  
> A department builds a database in Access. The original designer leaves. Nobody knows why `StatusCode = 4` means "incomplete but excused." Reports become inconsistent because users interpret codes differently. A small data dictionary would have prevented the confusion.

---

# DBA Work Across Platforms

The principles of database administration are stable, but the implementation differs across platforms.

## Microsoft Access

Microsoft Access is file-based and visual. It is useful for learning and small-team systems.

| DBA Area | Access Reality |
|---|---|
| Security | Mostly file permissions and application/front-end design |
| Backups | Copy `.accdb` file carefully |
| Maintenance | Compact and Repair |
| Relationships | Visual Relationships window |
| Concurrency | Limited compared with server DBMSs |
| Best use | Education, prototypes, small departmental tools |

Access makes many concepts visible. Students can see relationships, referential integrity, forms, queries, and reports in one environment.

## SQLite

SQLite is lightweight, serverless, and file-based. The database is a single file, but the engine is powerful and widely used.

| DBA Area | SQLite Reality |
|---|---|
| Security | Mostly file-system and application-level |
| Backups | File copy or `.backup` command |
| Integrity | `PRAGMA integrity_check;` |
| Foreign keys | Must be enabled with `PRAGMA foreign_keys = ON;` |
| Concurrency | Many readers; limited writers; WAL improves behavior |
| Best use | Learning, embedded systems, mobile apps, local analytics |

SQLite teaches an important lesson: simple deployment does not eliminate responsibility.

## PostgreSQL

PostgreSQL is a server-based, enterprise-grade relational DBMS.

| DBA Area | PostgreSQL Reality |
|---|---|
| Security | Users, roles, privileges, schemas, row-level security |
| Backups | Logical backups, physical backups, point-in-time recovery |
| Transactions | Full ACID support |
| Concurrency | MVCC and advanced isolation |
| Performance | Indexes, query planner, vacuuming, monitoring |
| Best use | Production systems, analytics, multi-user applications |

PostgreSQL exposes many professional DBA concepts directly.

## Supabase and Cloud Databases

Supabase is a managed platform built on PostgreSQL. It provides database hosting, authentication, APIs, and administrative tools.

Cloud platforms introduce the **shared responsibility model**.

| Responsibility | Cloud Provider | DBA / Organization |
|---|---:|---:|
| Physical hardware | Yes | No |
| Operating system patching | Usually yes | Usually no |
| Database engine availability | Often yes | Shared |
| Schema design | No | Yes |
| Data integrity | No | Yes |
| Roles and permissions | Shared | Yes |
| Query performance | Shared | Yes |
| Backup policy understanding | Shared | Yes |
| Compliance configuration | Shared | Yes |

The cloud reduces infrastructure burden. It does not remove accountability.

## Platform Comparison

<!-- FIGURE PLACEHOLDER: Platform comparison matrix — Access vs SQLite vs PostgreSQL vs Supabase across DBA dimensions. Recommend chapter-media. -->

| Platform | Strength | Limitation | Main DBA Lesson |
|---|---|---|---|
| Access | Visual, approachable | Limited concurrency and security | Administration can be visible and local |
| SQLite | Simple, portable, real SQL | Limited built-in user security | File-based systems still require discipline |
| PostgreSQL | Powerful, scalable, secure | More complex | Professional DBMSs require active management |
| Supabase | Managed PostgreSQL in the cloud | Shared responsibility can be misunderstood | Cloud DBAs still govern data and access |

---

# Common DBA Mistakes

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Mistake 1: Assuming Backups Work Without Testing

A backup is useful only if it can be restored. Test restores should be scheduled.

## Mistake 2: Giving Users Too Much Access

Excessive permissions are convenient until someone deletes, exports, or modifies data they should never have touched.

## Mistake 3: Treating Security as an Application-Only Problem

The database itself should enforce security where possible. Application controls are important, but they should not be the only defense.

## Mistake 4: Ignoring Slow Queries Until Users Complain

Performance problems are easier to fix before they become emergencies. Monitoring is cheaper than crisis response.

## Mistake 5: Indexing Everything

Indexes speed up reads but slow down writes and consume storage. They should be chosen intentionally.

## Mistake 6: Using Cascade Delete Casually

Cascade delete can erase large amounts of related data automatically. It should be used only when the business rule clearly supports it.

## Mistake 7: Making Unrecorded Schema Changes

Changes without documentation become future confusion. Every schema change should be recorded and justified.

## Mistake 8: Assuming the Cloud Handles Everything

Cloud platforms handle infrastructure. They do not automatically fix bad permissions, bad schemas, bad queries, or bad governance.

---

# Practicing DBA Thinking

Database administration is not only a professional role. It is also a mindset — a way of asking what could go wrong and what should be done before it does. This section gives you a reusable checklist and three short Try It exercises to practice that mindset on the Grading Database.

## DBA Thinking Checklist

Use this checklist when you think about any database you are responsible for, even a small one:

- Who can access this database, and should they?
- What roles exist, and what can each role do?
- Are backups scheduled, and when was the last restore tested?
- What is the recovery plan if the database becomes unavailable?
- Are there slow queries that should be reviewed?
- Do critical queries use appropriate indexes?
- Are foreign keys indexed where they are used in joins?
- When was the last integrity check run?
- Is there a maintenance window for reindexing or compaction?
- Is there a documented record of recent schema changes?

## Try It: Apply DBA Judgment

These three short exercises ask you to think like a DBA using the Grading Database.

**Try It 1 — Backup Naming.** A DBA names backups so that anyone can identify what they contain without opening them. Design a backup filename convention for the Grading Database. Your convention should include the database name, the date, and the backup type. Write one example filename using your convention.

**Try It 2 — Least Privilege.** An instructor needs to view student grades but should not be able to change them. A teaching assistant needs to enter grades for their section only. Describe what permissions each role should have, and explain why giving both roles full edit access would violate least privilege.

**Try It 3 — Transaction Safety.** A student's final grade is calculated by averaging scores across multiple deliverables and then storing the result. Write the SQL transaction outline using `BEGIN`, `COMMIT`, and `ROLLBACK` that would make this calculation safe: if any step fails, no partial result should be saved.

## From This Chapter to the Let's Build

The **Let's Build companion** for this chapter walks you through a complete DBA practice session on the Grading Database: setting up roles, simulating a concurrency problem, performing a backup, testing a restore, running integrity checks, and documenting changes. Use this chapter for the concepts and the checklist. Use the Let's Build for step-by-step guided practice.

---

- Database administration keeps databases reliable, secure, recoverable, and performant after deployment.
- Data Administration governs meaning, ownership, policy, and compliance; Database Administration implements technical controls.
- Concurrency control prevents simultaneous users from corrupting shared data.
- Locks coordinate reading and writing, but excessive locking can reduce performance.
- Transactions group operations into all-or-nothing units of work.
- ACID properties define the reliability guarantees of professional database systems.
- Authentication verifies identity; authorization controls permitted actions.
- Role-based access control assigns permissions to roles rather than individuals.
- The principle of least privilege reduces both security and accidental-damage risk.
- Backup planning must include recovery objectives, recovery procedures, and test restores.
- Recovery logs support rollback and rollforward.
- Indexes improve read performance but add write and storage overhead.
- Maintenance includes integrity checks, reindexing, compaction, backup testing, and documentation.
- Cloud database administration follows a shared responsibility model: infrastructure may be managed, but data governance remains the organization's responsibility.
- Practicing DBA thinking — using checklists, testing backups, applying least privilege, and documenting changes — builds the habits that protect real databases.

---

# Chapter Summary

This chapter explained how databases are kept reliable after they are designed and deployed. Earlier chapters showed how to structure data, write SQL, normalize tables, and design schemas. Chapter 11 added the operational layer: the practices that keep those databases secure, available, recoverable, and responsive over time.

The chapter began by distinguishing database administration from database design and data administration. Design defines structure. Data administration governs meaning and policy. Database administration manages the technical reality of running database systems under real conditions.

You then examined the core responsibilities of a DBA: security, concurrency control, transaction management, backup and recovery, performance tuning, maintenance, documentation, and capacity planning. These responsibilities apply whether the database is a small Access file, a SQLite database, a PostgreSQL server, or a managed cloud database.

The chapter also explained concurrency control, including locks, lock granularity, optimistic and pessimistic approaches, two-phase locking, and deadlocks. These concepts show how a DBMS protects shared data when multiple users act at the same time.

Transactions and ACID properties were presented as the foundation of database reliability. Atomicity, consistency, isolation, and durability explain why professional databases can support important systems such as banking, healthcare, inventory, payroll, and academic records.

Security was framed through confidentiality, integrity, and availability. You learned the difference between authentication and authorization, the value of role-based access control, and the importance of least privilege. You also saw how views can serve as controlled reporting layers and why SQL injection remains a serious risk.

Backup and recovery planning showed that reliable databases require tested recovery procedures, not just backup files. Full, incremental, and differential backups serve different purposes. Rollback, rollforward, before-images, after-images, and logs help restore data to a valid state after failure.

Finally, the chapter examined performance, maintenance, platform differences, and practical DBA thinking. The DBA Thinking Checklist, Try It exercises, and Let's Build companion give you structured ways to practice backup planning, least privilege, and transaction safety. Indexes, query plans, integrity checks, compaction, and schema-change discipline all contribute to long-term system health. The comparison among Access, SQLite, PostgreSQL, and Supabase reinforced the central lesson: platforms differ, but DBA responsibilities remain.

> **Final Takeaway:** A database becomes valuable only when people can trust it. Database administration is the work that protects that trust.

---

# References

Connolly, T. M., & Begg, C. E. (2015). *Database systems: A practical approach to design, implementation, and management* (6th ed.). Pearson.

Coronel, C., & Morris, S. (2019). *Database systems: Design, implementation, & management* (13th ed.). Cengage Learning.

Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7th ed.). Pearson.

Hoffer, J. A., Venkataraman, R., & Topi, H. (2019). *Modern database management* (13th ed.). Pearson.

Kroenke, D. M., & Auer, D. J. (2020). *Database concepts* (9th ed.). Pearson.

Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7th ed.). McGraw-Hill Education.
