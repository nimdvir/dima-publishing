# Chapter 11 — Database Administration

> **Review copy — regenerated 2026-07-07 AFTER structural fixes. This reflects current source content**.Source folder: `books/database-book/files/source/chapters/ch11-database-administration/`Components below are in reader order: Introduction, Core Concepts, Let's Build, Review Questions, Terms Treasury, RAT.

```
===== Introduction (index.md) =====
```

# Chapter 11: Database Administration

Chapter 9 showed us how to design databases from business requirements. Chapter 10 showed us how to query them professionally for insight. Chapter 11 now asks a different question: who protects the data, keeps it running, and makes sure it is still there tomorrow?

Database design and SQL are forward-looking disciplines — they build and query. Database administration is a sustaining discipline — it guards, maintains, recovers, and evolves. Every well-designed system that supports real decisions depends on someone making sure it stays secure, fast, available, and trustworthy.

## Chapter Video

> **Video placeholder:** Chapter 11 overview video will be added here before publication.

# Chapter Roadmap

| Topic | Why It Matters |
| --- | --- |
| [11.1 What Is Database Administration?](#11-1-what-is-database-administration) | Meet the role that keeps organizational data secure, available, and performing well. |
| [11.2 Core DBA Responsibilities](#11-2-core-dba-responsibilities) | Learn the essential tasks — backup, recovery, performance, and security — that define the DBA role. |
| [11.3 Multi-User Databases and Concurrency Control](#11-3-multi-user-databases-and-concurrency-control) | Learn how databases handle hundreds of simultaneous users without data conflicts. |
| [11.4 Transactions and ACID Reliability](#11-4-transactions-and-acid-reliability) | See how databases guarantee that multi-step operations either fully complete or fully roll back. |
| [11.5 Database Security](#11-5-database-security) | Understand how databases control who can see and change what — a critical business concern. |
| [11.6 Backup and Recovery](#11-6-backup-and-recovery) | Learn the strategies that prevent a single hardware failure from destroying organizational data. |
| [11.7 Performance Monitoring and Tuning](#11-7-performance-monitoring-and-tuning) | Diagnose and fix the slow queries and bottlenecks that frustrate users. |
| [11.8 Maintenance and Database Evolution](#11-8-maintenance-and-database-evolution) | Keep a production database healthy as requirements and schemas change over time. |
| [11.9 DBA Work Across Platforms](#11-9-dba-work-across-platforms) | Compare how administration works across Access, SQLite, PostgreSQL, and Supabase. |
| [11.10 Common DBA Mistakes](#11-10-common-dba-mistakes) | Recognize the avoidable errors that cause outages, breaches, and data loss. |
| [11.11 Practicing DBA Thinking](#11-11-practicing-dba-thinking) | Build the judgment to protect data and decisions, not just run commands. |

---

```
===== Core Concepts (core-concepts.md) =====
```

# Chapter 11: Database Administration

Chapter 9 showed us how to design databases from business requirements. Chapter 10 showed us how to query them professionally for insight. Chapter 11 now asks a different question: who protects the data, keeps it running, and makes sure it is still there tomorrow?

Database design and SQL are forward-looking disciplines — they build and query. Database administration is a sustaining discipline — it guards, maintains, recovers, and evolves. Every well-designed system that supports real decisions depends on someone making sure it stays secure, fast, available, and trustworthy.

# Core Concepts

## 11.1 What Is Database Administration?

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

### Design vs. Administration

Database design and database administration are related, but they are not the same.

| Question | Design Perspective | Administration Perspective |
| --- | --- | --- |
| What should the database look like? | Entities, tables, keys, relationships | Does the implemented structure remain healthy? |
| How should facts be stored? | Normalization and schema design | Integrity checks and change management |
| How should users get answers? | SQL queries and reporting views | Performance tuning and access control |
| What happens when something fails? | Usually not the design focus | Backup, recovery, logs, and disaster planning |
| Who can access data? | May be specified as a requirement | Implemented through users, roles, and privileges |

A simple way to remember the difference:

> **Design creates the structure. Administration keeps the structure dependable.**

### Data Administration vs. Database Administration

In larger organizations, there is often a distinction between **Data Administration** and **Database Administration**.

| Role | Scope | Main Focus | Typical Questions |
| --- | --- | --- | --- |
| **Data Administration (DA)** | Organization-wide | Governance, policy, standards, meaning, compliance | What does this data mean? Who owns it? How may it be used? |
| **Database Administration (DBA)** | Specific database systems | Technical reliability, security, recovery, performance | Is the database secure, backed up, available, and efficient? |

**Data Administration** is concerned with the organizational meaning and governance of data. It defines naming standards, data definitions, privacy rules, retention policies, and compliance expectations.

**Database Administration** is concerned with implementation and operations. It manages accounts, permissions, backups, recovery procedures, performance, monitoring, and system maintenance.

In a small organization, one person may perform both roles. In a large organization, they may be separate departments. The distinction matters because data problems are not only technical. They are also policy, governance, and accountability problems.

### The DBA as Guardian of Data Trust

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

### The Data Professional Ecosystem

A DBA does not work alone. Database administration interacts with several other data-focused roles:

- **Data Engineers** build and maintain the pipelines that move data from operational databases into analytical data warehouses or data lakes.
- **Data Analysts** query the data to produce reports, dashboards, and business insights.
- **Data Scientists** use the data to build predictive models, run experiments, and uncover deep patterns using machine learning.
- **Application Developers** write the code that connects user interfaces to the database.
- **Infrastructure Operators** manage the servers, networks, and cloud environments where the databases run.

The DBA enables all these roles by ensuring the foundational database remains fast, secure, and available.

---

## 11.2 Core DBA Responsibilities

Although DBA work varies by organization and platform, most responsibilities fall into several major categories.

| Responsibility | What It Protects | Example in the Grading Database |
| --- | --- | --- |
| Security and access control | Confidentiality and integrity | Students can view only their own grades |
| Concurrency control | Correctness under multi-user access | Two users cannot overwrite the same grade silently |
| Transaction management | Reliability of multi-step operations | Grade update and audit entry succeed or fail together |
| Backup and recovery | Data survival after failure | Restore grade records after accidental deletion |
| Performance tuning | Responsiveness and usability | Index `StudentID` to speed up student-grade reports |
| Maintenance | Long-term health | Compact, repair, reindex, and check integrity |
| Documentation and change management | Continuity and accountability | Record schema changes and backup schedules |
| Capacity planning | Future growth | Plan for more sections, students, logs, and reports |

### Security and Access Management

Security ensures that users can do what they need to do, but no more.

In a grading system:

- Students may read their own grades.
- Teaching assistants may enter attendance.
- Instructors may update grades.
- Administrators may manage users and system settings.
- No ordinary user should be able to delete the entire grade table.

A DBA implements those boundaries through authentication, authorization, roles, and privileges.

### Concurrency Control

Concurrency control manages simultaneous access. Databases are shared systems. Multiple users may read and write at the same time. Without coordination, one user's update may overwrite another's work or produce inconsistent results.

Concurrency control protects the database when many operations overlap.

### Transaction Management

A transaction groups several database operations into one logical unit. Either all of the operations succeed, or none of them do. Transactions are essential when a business action requires multiple related updates.

For example, updating a grade may also require recording who made the change and when. The update and the audit record should succeed together.

### Backup and Recovery

Backups protect against data loss. Recovery procedures define how the database will be restored after a failure.

A backup strategy is not complete until it has been tested. An untested backup is a hope, not a plan.

### Performance Monitoring and Tuning

Performance is the difference between a useful system and an ignored system. A report that takes too long to run may not be used. A gradebook that freezes during updates undermines trust.

DBAs monitor query speed, indexing, locks, storage, memory, and system load.

### Maintenance and Evolution

Databases change. New reports are requested. New columns are added. Old data is archived. Indexes are rebuilt. Files are compacted. Permissions are reviewed. Maintenance keeps the database healthy as it ages.

> **Real-World Example:**\
> An online retailer stores orders, inventory, customers, and payments in PostgreSQL. The DBA team manages nightly backups, monitors slow queries, restricts payment-data access, and creates indexes for high-volume order searches. When a software bug deletes several hundred order rows, the DBA restores the affected data from backup and transaction logs. The business experiences a manageable incident instead of a permanent loss.

---

## 11.3 Multi-User Databases and Concurrency Control

A database becomes more complicated the moment more than one person or process uses it at the same time.

Imagine this grading scenario:

1. Instructor A opens Alice's Quiz 2 grade and changes it from 84 to 90.
2. Instructor B opens the same grade before A saves the change.
3. Instructor B changes the grade from 84 to 88.
4. Both save their work.

Which grade should remain: 90 or 88?

Without concurrency control, one update may overwrite the other. This is called a **lost update**.

### Common Concurrency Problems

When operations overlap, several read and write anomalies can occur:

| Problem | What Happens | Example |
| --- | --- | --- |
| **Lost update** | One user's change overwrites another user's change. | Two instructors edit the same grade simultaneously. |
| **Dirty read** | A user reads uncommitted data that may later be rolled back. | A report includes a provisional grade before the update is finalized. |
| **Nonrepeatable read** | A user reads the same row twice during a transaction and gets different results. | An instructor checks a score, but it changes before they finish their review. |
| **Phantom read** | A query rerun returns new rows inserted by another transaction. | A new grade appears mid-calculation during a class average report. |

These problems occur because database operations overlap in time.

### Cursors

A **cursor** is a database mechanism that processes query results one row at a time instead of as a single batch. Cursors are sometimes necessary in application code, but they can degrade concurrency by holding locks open while waiting for user interaction. In most analytical and reporting scenarios, set-based SQL operations are preferred over row-by-row cursor processing.

**📝 Advanced Note: Cursor Types**

Different cursor types handle concurrency differently:

- **Static cursors** take a snapshot of the data. Changes made by other users while the cursor is open are not visible.
- **Dynamic cursors** reflect all changes to the result set rows as you scroll.
- **Keyset cursors** fix the membership of the result set when opened but detect changes to existing row values.

### Locks

A **lock** is a temporary control that prevents conflicting access to data.

| Lock Type | Purpose | Example |
| --- | --- | --- |
| Shared lock | Allows reading while preventing conflicting writes | Several users view the same grade report |
| Exclusive lock | Allows one transaction to modify data while blocking conflicting access | One instructor updates a grade |

### Lock Granularity

Locks may apply at different levels.

| Granularity | Meaning | Advantage | Disadvantage |
| --- | --- | --- | --- |
| Row-level lock | Locks only selected rows | High concurrency | More overhead |
| Page-level lock | Locks a storage page containing multiple rows | Balanced overhead | May block unrelated rows |
| Table-level lock | Locks an entire table | Simpler | Reduces concurrency |
| Database-level lock | Locks the whole database | Safe for major maintenance | Blocks most activity |

A file-based database may use broader locks. A server-based DBMS usually supports finer-grained locking.

### Pessimistic and Optimistic Locking

DBMSs and applications generally manage conflicts using one of two strategies.

| Strategy | Assumption | How It Works | Best For |
| --- | --- | --- | --- |
| **Pessimistic locking** | Conflicts are likely | Lock data before editing | Banking, inventory, high-risk updates |
| **Optimistic locking** | Conflicts are rare | Allow edits, then check for conflicts before saving | Read-heavy systems, low-conflict environments |

In a grading database, pessimistic locking might be appropriate if several instructors often edit the same records. Optimistic locking might be acceptable if grade edits are rare and usually performed by one instructor.

### Two-Phase Locking

**Two-Phase Locking (2PL)** is a protocol that helps ensure transactions behave correctly under concurrency.

It has two phases:

1. **Growing phase:** the transaction acquires locks but cannot release any.
2. **Shrinking phase:** the transaction releases locks but cannot acquire any new ones.

Once a transaction enters the shrinking phase and starts releasing locks, it can no longer lock new data. This disciplined rule helps guarantee **serializability**, meaning that even if transactions run at the same time, the final result is equivalent to some safe sequential order.

### Deadlocks

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

## 11.4 Transactions and ACID Reliability

Concurrency control manages simultaneous users. Transactions manage reliability when operations succeed, fail, or partially complete. A transaction defines the unit of work; concurrency control determines how multiple transactions interact safely.

A **transaction** is a logical unit of work made of one or more database operations. The database treats the group as one all-or-nothing action.

### Why Transactions Matter

Suppose an instructor updates a grade and records an audit entry.

```text
Step 1: Update STUDENT_GRADE.
Step 2: Insert a row into GRADE_AUDIT.
```

If Step 1 succeeds and Step 2 fails, the grade changes but there is no record of who changed it. If Step 2 succeeds and Step 1 fails, the audit log claims a change occurred when it did not. Both outcomes are bad.

A transaction ensures that the two operations succeed or fail together.

### Transaction Control Commands

Most relational DBMSs support three core transaction commands:

| Command | Meaning |
| --- | --- |
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

### The ACID Properties

Reliable transactions are governed by the **ACID** properties.

| Property | Meaning | Grading Database Example |
| --- | --- | --- |
| **Atomicity** | All operations succeed or none do | Grade update and audit insert happen together |
| **Consistency** | Rules remain valid before and after | Score must remain between 0 and 100 |
| **Isolation** | Concurrent transactions do not interfere | Two instructors cannot corrupt the same grade |
| **Durability** | Committed changes survive failure | Saved grade remains after a crash |

### Atomicity

Atomicity means **all or nothing**. If a transaction has five steps, the database does not keep only the first three if Step 4 fails. It rolls the entire transaction back.

### Consistency

Consistency means that a transaction moves the database from one valid state to another. It cannot violate constraints such as:

- primary key uniqueness,
- valid foreign keys,
- `NOT NULL` rules,
- score-range rules,
- business constraints.

For example, a transaction should not insert a grade for a nonexistent student.

### Isolation

Isolation means that each transaction behaves as if it were running alone, even when many transactions are active. Different DBMSs offer different isolation levels, but the purpose is always the same: prevent one transaction from seeing or disrupting unsafe intermediate states.

### Durability

Durability means that once a transaction is committed, the change survives system failure. If the database confirms that a grade update was saved, the grade should still be there after a restart.

> **Real-World Example:**\
> In banking, transferring money requires decreasing one account balance and increasing another. If the debit succeeds but the credit fails, money disappears. If the credit succeeds but the debit fails, money appears. Transactions prevent both failures by treating the transfer as one unit of work.

---

## 11.5 Database Security

Database security ensures that data is protected from unauthorized access, unauthorized modification, accidental damage, and unnecessary exposure.

Security is not only about hackers. Many security problems come from ordinary users having more privileges than they need.

### The CIA Triad

Database security is often described through the **CIA triad**.

| Goal | Meaning | Grading Database Example |
| --- | --- | --- |
| **Confidentiality** | Only authorized users can access sensitive data | Students cannot see other students' grades |
| **Integrity** | Data remains accurate and protected from unauthorized change | Only instructors can update grades |
| **Availability** | Authorized users can access the database when needed | Grade reports are available before advising |

Security must balance all three. A database that is perfectly confidential but unavailable is not useful. A database that is highly available but exposes private data is dangerous.

### Authentication and Authorization

Security begins with two questions.

| Concept | Question | Example |
| --- | --- | --- |
| **Authentication** | Who are you? | User logs in with credentials |
| **Authorization** | What are you allowed to do? | Instructor can update grades; student cannot |

A user may be authenticated but still not authorized to perform a specific action.

### Roles and Privileges

Professional databases usually use **role-based access control (RBAC)**.

- A **user** is an individual account.
- A **role** represents a job function.
- A **privilege** is permission to perform an action such as `SELECT`, `INSERT`, `UPDATE`, or `DELETE`.

Instead of granting permissions to each person one by one, the DBA grants permissions to roles and assigns users to roles.

Example roles for the Grading Database:

| Role | Appropriate Access |
| --- | --- |
| Student | Read own grades only |
| Teaching Assistant | Insert attendance, read grade reports |
| Instructor | Insert and update grades, read all course data |
| Department Admin | Read reports, audit submissions |
| DBA | Manage schema, backups, permissions, and maintenance |

### Least Privilege

The **principle of least privilege** says that users should receive only the permissions required to do their work.

This principle protects against both malicious misuse and honest mistakes. A teaching assistant who does not need to delete grades should not have `DELETE` privileges on `STUDENT_GRADE`.

### Example: Role-Based Permissions

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

### Views as Security Layers

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

### SQL Injection

**SQL injection** occurs when an attacker submits input that changes the meaning of a SQL command.

Unsafe pattern:

```text
"SELECT * FROM STUDENT WHERE Email = '" + user_input + "';"
```

If user input is inserted directly into SQL text, malicious input can alter the query.

The safer approach is to use **parameterized queries**, where user input is treated as data rather than executable SQL.

> **Important:** SQL injection is one of the most preventable database attacks. Never build SQL commands by directly concatenating untrusted user input.

### Security as a Continuous Process

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

## 11.6 Backup and Recovery

Backup and recovery planning answers one of the most important operational questions:

> **What will we do when something goes wrong?**

Not if. When.

Failures can come from hardware, software, human error, cyberattacks, cloud outages, accidental deletes, corrupted files, or natural disasters.

### Backup Types

| Backup Type | What It Stores | Advantage | Disadvantage |
| --- | --- | --- | --- |
| **Full backup** | Complete database copy | Easiest to restore | Takes the most time and storage |
| **Incremental backup** | Changes since the last backup of any type | Efficient storage | Slower restore; multiple files needed |
| **Differential backup** | Changes since the last full backup | Faster restore than incremental | Grows larger until next full backup |

A common strategy combines periodic full backups with more frequent incremental or differential backups.

### Recovery Objectives: RPO and RTO

Two practical concepts guide recovery planning.

| Term | Meaning | Question |
| --- | --- | --- |
| **Recovery Point Objective (RPO)** | Maximum acceptable data loss | How much data can we afford to lose? |
| **Recovery Time Objective (RTO)** | Maximum acceptable downtime | How quickly must we recover? |

For a personal practice database, losing one day of work may be acceptable. For a payroll database, losing one day may be unacceptable. For a hospital system, even a few minutes of downtime may be dangerous.

### Recovery Logs

A **recovery log** records changes made to the database. Logs allow the system to undo or redo operations during recovery.

| Log Record | Meaning | Used For |
| --- | --- | --- |
| Before-image | Value before the change | Rollback |
| After-image | Value after the change | Rollforward |

### Rollback and Rollforward

| Technique | What It Does | Example |
| --- | --- | --- |
| **Rollback** | Undoes incomplete or incorrect transactions | Undo a failed grade update |
| **Rollforward** | Restores a backup, then reapplies logged changes | Restore Monday backup and replay Tuesday transactions |

Rollback is like pressing undo. Rollforward is like restoring an older version and replaying everything valid that happened after it.

### Disaster Recovery Planning

A backup file alone is not a disaster recovery plan. A recovery plan should define:

- where backups are stored,
- how often backups run,
- who can restore them,
- how restoration is tested,
- how long recovery should take,
- how much data loss is acceptable,
- how users will be notified during downtime.

A DBA should periodically perform test restores. The worst time to discover that backups are broken is after data is lost.

### File-Based Backup Example

For Microsoft Access or SQLite, backup may be as simple as copying the database file. But the file should be closed or safely backed up through a proper backup mechanism.

Example naming convention:

```text
GradingDB_backup_2026-05-18_1400.accdb
grading_backup_2026-05-18_1400.sqlite
```

A timestamped naming convention makes it easier to identify recovery points.

### SQLite Backup and Journal Modes

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

### Cloud Backup Considerations

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

### End-to-End Scenario: The Gradebook Crash

Consider how security, transactions, and recovery work together during an incident:

1. **The Mistake:** An exhausted teaching assistant intends to delete one duplicate grade row. Because their role was mistakenly granted broad `DELETE` privileges instead of least privilege, they run a delete query without a `WHERE` clause.
2. **The Damage:** All 4,000 grades for the semester are deleted. Because this was a single atomic transaction, it succeeds completely. The data is gone.
3. **The Panic:** The instructor cannot see any grades.
4. **The Recovery:** The DBA is called. They check the **recovery log** and see the massive delete transaction. They initiate a **restore** using last night's full backup. They then **rollforward** the logs, replaying all valid transactions that happened this morning—stopping exactly one second before the TA's destructive command.
5. **The Aftermath:** The grades are restored. The DBA reviews the TA role, revokes the broad `DELETE` permission, and enforces least privilege.

This is why DBA work is a continuous cycle of protection, response, and improvement.

> **Key Takeaway:** DBA disciplines act together. Access control reduces the risk of accidents, transactions ensure the accident is a clean boundary, and recovery restores the system to a valid state.

---

## 11.7 Performance Monitoring and Tuning

Performance tuning is the work of keeping the database responsive as usage grows.

A query that runs instantly on 50 rows may become slow on 5 million rows. A report that works for one instructor may fail when used by 400 users. Performance issues often appear gradually, which means DBAs must monitor proactively.

### Common Performance Problems

| Problem | Cause | Possible DBA Response |
| --- | --- | --- |
| Slow filters | Missing index | Create index on filtered column |
| Slow joins | Missing index on foreign key | Index join columns |
| Long-running reports | Inefficient query or too much aggregation | Create view, summary table, or optimized query |
| Lock waits | Transactions hold locks too long | Shorten transactions, tune queries |
| Storage growth | Tables/logs/indexes expanding | Archive data, compact, plan capacity |
| High cloud cost | Inefficient queries or over-provisioning | Optimize queries, right-size resources |

### Indexes

An **index** is a data structure that helps the DBMS find rows faster.

Without an index, the DBMS may scan every row in a table. With an index, it can jump more directly to matching rows.

Example:

```sql
CREATE INDEX idx_student_grade_student
ON STUDENT_GRADE(StudentID);
```

This index can speed up queries that filter or join on `StudentID`.

### Index Trade-Offs

Indexes are not free.

| Benefit | Cost |
| --- | --- |
| Faster reads | Slower inserts, updates, and deletes |
| Faster joins | More storage |
| Faster filters and sorting | More maintenance overhead |

A DBA should avoid indexing every column just because indexes sound useful. Indexes are design decisions.

### The Handoff to Advanced Hardening

This chapter covers the foundations of database administration: managing concurrency, ensuring recoverability, and applying basic performance concepts like indexes. However, as systems scale, DBAs must dive much deeper into technical optimization.

In **Chapter 13**, you will explore advanced database hardening. That chapter dives into reading detailed query plans (like `EXPLAIN`), advanced index optimization, and deep security configurations necessary for enterprise-scale deployments. For now, understand that performance tuning is a continuous process of measurement and adjustment.

### Performance and Query Design

Some performance problems are not caused by the DBMS. They are caused by poor query logic.

Common issues include:

- joining more tables than necessary,
- filtering after aggregation when filtering could happen earlier,
- using functions on indexed columns in ways that prevent index use,
- returning `SELECT *` when only a few columns are needed,
- running large reports during peak transactional use.

### Performance and Business Impact

Performance is not only technical. It affects behavior.

If grade reports take too long, instructors may export data into spreadsheets and create unofficial copies. If dashboards are slow, managers may stop using them. If registration systems slow down under load, students lose trust.

> **Key Takeaway:** Performance tuning supports both technical efficiency and organizational confidence.

---

## 11.8 Maintenance and Database Evolution

Databases are living systems. Once deployed, they continue to grow, change, and age.

### Routine Maintenance Tasks

| Task | Purpose | Example |
| --- | --- | --- |
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

### Schema Changes

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

### Change Management

Professional database environments usually require formal change management.

A change request should answer:

1. What is changing?
2. Why is it needed?
3. Which tables, views, queries, reports, or applications are affected?
4. How will the change be tested?
5. How will the change be reversed if it fails?
6. Who approved the change?

This may feel bureaucratic, but uncontrolled database changes are dangerous. A small schema change can break many reports.

### Documentation

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

> **Real-World Example:**\
> A department builds a database in Access. The original designer leaves. Nobody knows why `StatusCode = 4` means "incomplete but excused." Reports become inconsistent because users interpret codes differently. A small data dictionary would have prevented the confusion.

---

## 11.9 DBA Work Across Platforms

The principles of database administration are stable, but the implementation differs across platforms.

### Microsoft Access

Microsoft Access is file-based and visual. It is useful for learning and small-team systems.

| DBA Area | Access Reality |
| --- | --- |
| Security | Mostly file permissions and application/front-end design |
| Backups | Copy `.accdb` file carefully |
| Maintenance | Compact and Repair |
| Relationships | Visual Relationships window |
| Concurrency | Limited compared with server DBMSs |
| Best use | Education, prototypes, small departmental tools |

Access makes many concepts visible. Students can see relationships, referential integrity, forms, queries, and reports in one environment.

### SQLite

SQLite is lightweight, serverless, and file-based. The database is a single file, but the engine is powerful and widely used.

| DBA Area | SQLite Reality |
| --- | --- |
| Security | Mostly file-system and application-level |
| Backups | File copy or `.backup` command |
| Integrity | `PRAGMA integrity_check;` |
| Foreign keys | Must be enabled with `PRAGMA foreign_keys = ON;` |
| Concurrency | Many readers; limited writers; WAL improves behavior |
| Best use | Learning, embedded systems, mobile apps, local analytics |

SQLite teaches an important lesson: simple deployment does not eliminate responsibility.

### PostgreSQL

PostgreSQL is a server-based, enterprise-grade relational DBMS.

| DBA Area | PostgreSQL Reality |
| --- | --- |
| Security | Users, roles, privileges, schemas, row-level security |
| Backups | Logical backups, physical backups, point-in-time recovery |
| Transactions | Full ACID support |
| Concurrency | MVCC and advanced isolation |
| Performance | Indexes, query planner, vacuuming, monitoring |
| Best use | Production systems, analytics, multi-user applications |

PostgreSQL exposes many professional DBA concepts directly.

### Supabase and Cloud Databases

Supabase is a managed platform built on PostgreSQL. It provides database hosting, authentication, APIs, and administrative tools.

Cloud platforms introduce the **shared responsibility model**.

| Responsibility | Cloud Provider | DBA / Organization |
| --- | --- | --- |
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

### Platform Comparison

| Platform | Strength | Limitation | Main DBA Lesson |
| --- | --- | --- | --- |
| Access | Visual, approachable | Limited concurrency and security | Administration can be visible and local |
| SQLite | Simple, portable, real SQL | Limited built-in user security | File-based systems still require discipline |
| PostgreSQL | Powerful, scalable, secure | More complex | Professional DBMSs require active management |
| Supabase | Managed PostgreSQL in the cloud | Shared responsibility can be misunderstood | Cloud DBAs still govern data and access |

---

## 11.10 Common DBA Mistakes

### Mistake 1: Assuming Backups Work Without Testing

A backup is useful only if it can be restored. Test restores should be scheduled.

### Mistake 2: Giving Users Too Much Access

Excessive permissions are convenient until someone deletes, exports, or modifies data they should never have touched.

### Mistake 3: Treating Security as an Application-Only Problem

The database itself should enforce security where possible. Application controls are important, but they should not be the only defense.

### Mistake 4: Ignoring Slow Queries Until Users Complain

Performance problems are easier to fix before they become emergencies. Monitoring is cheaper than crisis response.

### Mistake 5: Indexing Everything

Indexes speed up reads but slow down writes and consume storage. They should be chosen intentionally.

### Mistake 6: Using Cascade Delete Casually

Cascade delete can erase large amounts of related data automatically. It should be used only when the business rule clearly supports it.

### Mistake 7: Making Unrecorded Schema Changes

Changes without documentation become future confusion. Every schema change should be recorded and justified.

### Mistake 8: Assuming the Cloud Handles Everything

Cloud platforms handle infrastructure. They do not automatically fix bad permissions, bad schemas, bad queries, or bad governance.

---

## 11.11 Practicing DBA Thinking

Database administration is not only a professional role. It is also a mindset — a way of asking what could go wrong and what should be done before it does. This section gives you a reusable checklist and three short Try It exercises to practice that mindset on the Grading Database.

### DBA Thinking Checklist

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

### Try It: Apply DBA Judgment

These three short exercises ask you to think like a DBA using the Grading Database.

**Try It 1 — Backup Naming.** A DBA names backups so that anyone can identify what they contain without opening them. Design a backup filename convention for the Grading Database. Your convention should include the database name, the date, and the backup type. Write one example filename using your convention.

**Try It 2 — Least Privilege.** An instructor needs to view student grades but should not be able to change them. A teaching assistant needs to enter grades for their section only. Describe what permissions each role should have, and explain why giving both roles full edit access would violate least privilege.

**Try It 3 — Transaction Safety.** A student's final grade is calculated by averaging scores across multiple deliverables and then storing the result. Write the SQL transaction outline using `BEGIN`, `COMMIT`, and `ROLLBACK` that would make this calculation safe: if any step fails, no partial result should be saved.

### From This Chapter to the Let's Build

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

## Chapter Summary

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

## References

Connolly, T. M., & Begg, C. E. (2015). *Database systems: A practical approach to design, implementation, and management* (6th ed.). Pearson.

Coronel, C., & Morris, S. (2019). *Database systems: Design, implementation, & management* (13th ed.). Cengage Learning.

Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7th ed.). Pearson.

Hoffer, J. A., Venkataraman, R., & Topi, H. (2019). *Modern database management* (13th ed.). Pearson.

Kroenke, D. M., & Auer, D. J. (2020). *Database concepts* (9th ed.). Pearson.

Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7th ed.). McGraw-Hill Education.

```
===== Let's Build (lets-build.md) =====
```

---

## title: "Let's Build: Hands-On DBA Practice" chapter: 11 section: "Let's Build" description: "Hands-on practice applying DBA concepts like relationships, backups, constraints, and roles to the Grading Database across different platforms." date: 2026-06-16 author: "Nimrod Dvir, PhD"

# Hands-On DBA Practice with the Grading Database

This section turns the chapter's concepts into practice. The goal is not to become a professional DBA immediately. The goal is to recognize administrative responsibilities and apply them thoughtfully.

## Practice Layer 1: Microsoft Access

**Task 1: Identify critical tables.**

Rank tables by sensitivity.

| Table | Risk Level | Why |
| --- | --- | --- |
| `STUDENT` | High | Personal information |
| `STUDENT_GRADE` | High | Academic performance |
| `ATTENDANCE` | Medium to high | Participation record |
| `DELIVERABLE` | Medium | Course structure |
| `GRADE_SCALE` | Medium | Policy rules |
| `SCHEDULE` | Lower | Course calendar |

**Task 2: Enforce referential integrity.**

In Access:

1. Open **Database Tools &gt; Relationships**.
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

Use **Database Tools &gt; Compact and Repair Database**. This reinforces the idea that file-based databases need maintenance.

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
| --- | --- |
| Access | Visual relationships, local backup, compact/repair |
| SQLite | Explicit pragmas, transactions, indexes, file responsibility |
| Supabase/PostgreSQL | Roles, privileges, transactions, views, cloud responsibility |

The core lesson is consistent:

> DBA thinking is not platform-specific. The tools change, but the responsibilities remain.

```
===== Review Questions (review-questions.md) =====
```

# Chapter 11: Review and Reflection

<img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-revie-resized" alt="Review and Reflection section icon" width="220" />

*Use these questions to strengthen your understanding of how database administration protects data trust — then think more deeply about what it means to keep a database secure, reliable, recoverable, and ready for real-world use.*

---

# Review Questions

*These questions help you recall and explain the chapter's key concepts, definitions, and frameworks.*

**1. What is the difference between Database Administration and Data Administration?**

**2. What are the four ACID properties, and what does each one guarantee for a transaction?**

**3. What is a lost update, and why does it demonstrate the need for concurrency control?**

**4. What is the difference between authentication and authorization in database security?**

**5. Compare full, incremental, and differential backups. What are the trade-offs among them?**

**6. What are Recovery Point Objective (RPO) and Recovery Time Objective (RTO)? Why do they matter for planning a backup strategy?**

**7. What is the principle of least privilege, and how does role-based access control (RBAC) help enforce it?**

**8. What is the shared responsibility model in cloud database administration? Name two responsibilities the cloud provider handles and two the DBA still owns.**

---

# Reflection Questions

*These questions ask you to interpret, compare, evaluate, and apply the chapter's ideas beyond simple recall.*

**1. The chapter describes the DBA as a "guardian of data trust" rather than simply a technician. What does this framing mean, and why is it an important way to think about database administration?**

**2. In the Gradebook Crash scenario, a TA accidentally deletes all grades due to excessive permissions. Which DBA disciplines — access control, transactions, and backup/recovery — worked together to prevent permanent data loss? What would have failed if any one of those disciplines had been missing?**

**3. How do concurrency control and transactions work together to protect data reliability? Why is having one without the other insufficient?**

**4. Why might optimistic locking be appropriate for a grading system where instructors rarely edit the same record, while pessimistic locking is better for a banking system where conflicts are more likely?**

**5. How does SQL injection illustrate the difference between treating user input as data versus treating it as executable code? Why is this distinction important for database security beyond just SQL injection?**

**6. The chapter states that "an untested backup is a hope, not a plan." What does this mean in practice? What could go wrong if an organization never tests its restores?**

**7. Compare DBA responsibilities in SQLite versus Supabase. What does each platform teach about the relationship between tool simplicity and administrative discipline?**

**8. The chapter argues that cloud databases reduce infrastructure burden but do not remove DBA accountability. Do you agree? Use the shared responsibility table from the chapter to support your reasoning.**

---

# Personal Reflection Questions

*These questions invite you to connect the chapter's ideas to your own experience, habits, and professional development.*

**1. Which DBA responsibility — security, concurrency, backup, or performance — do you find most challenging to think about? What makes it difficult, and what would help you understand it better?**

**2. Have you ever experienced a situation where data was lost because no backup existed — a lost file, unsaved work, or an overwritten document? How would a backup strategy like the one described in this chapter have changed the outcome?**

**3. What does the principle of least privilege suggest about access to your own course data in systems you use as a student? Can you think of an example where you or someone you know had more access to sensitive information than necessary?**

**4. If you were responsible for a small departmental database — say, a club membership list or an event registration system — which one DBA practice from this chapter would you implement first? Why that one?**

**5. How does understanding database administration change the way you view the systems you rely on every day — course registration, banking apps, streaming platforms, or healthcare portals?**

**6. Which skill or concept from this chapter would you most want to develop further if you pursued a career involving data management, analytics, or information systems? What would that skill enable you to do?**

---

# Answer Key

## Review Questions

**Question 1: What is the difference between Database Administration and Data Administration?**

**Suggested Answer:** Database Administration (DBA) is the technical function responsible for managing specific database systems — security, backups, performance, recovery, and maintenance at the system level. Data Administration (DA) is the organizational function responsible for data governance, policies, naming standards, metadata management, and compliance across the enterprise. DA defines what data means and who owns it; DBA implements the technical controls that enforce those policies. In a small organization, one person may do both, but the distinction matters because data problems are both policy problems and technical problems.

**Question 2: What are the four ACID properties, and what does each one guarantee for a transaction?**

**Suggested Answer:** Atomicity guarantees all-or-nothing execution — every operation in the transaction completes, or none do. Consistency guarantees that the transaction moves the database from one valid state to another, preserving all constraints and business rules. Isolation guarantees that concurrent transactions do not interfere with each other — each behaves as if it were running alone. Durability guarantees that once a transaction is committed, its changes survive system failures such as crashes or power loss.

**Question 3: What is a lost update, and why does it demonstrate the need for concurrency control?**

**Suggested Answer:** A lost update occurs when two users read the same data, both modify it, and the last write silently overwrites the first — one person's change is lost without either user knowing. For example, Instructor A changes a grade from 84 to 90, Instructor B also reads 84 and changes it to 88, and the final score is 88 — Instructor A's update is gone. This demonstrates the need for concurrency control because shared databases must prevent simultaneous operations from corrupting data without any visible error or warning.

**Question 4: What is the difference between authentication and authorization in database security?**

**Suggested Answer:** Authentication answers "Who are you?" — it verifies a user's identity through credentials, tokens, or single sign-on. Authorization answers "What are you allowed to do?" — it determines which actions (SELECT, INSERT, UPDATE, DELETE) the authenticated user may perform on which database objects. A user may be authenticated but still not authorized for a specific action — logging in successfully does not mean you can delete the entire grade table.

**Question 5: Compare full, incremental, and differential backups. What are the trade-offs among them?**

**Suggested Answer:** A full backup captures the entire database — easiest to restore but takes the most time and storage. An incremental backup captures only changes since the last backup of any type — most storage-efficient but requires multiple files for restore, making recovery slower. A differential backup captures all changes since the last full backup — faster to restore than incremental but grows larger until the next full backup. A common strategy combines periodic full backups with more frequent incremental or differential backups to balance storage, speed, and recovery time.

**Question 6: What are Recovery Point Objective (RPO) and Recovery Time Objective (RTO)? Why do they matter for planning a backup strategy?**

**Suggested Answer:** RPO is the maximum acceptable data loss measured in time — how much data can the organization afford to lose? It determines backup frequency. RTO is the maximum acceptable downtime — how quickly must the database be restored and available? It determines recovery infrastructure investment. They matter because backup strategy is a business decision, not just a technical one. A hospital system may target an RPO of seconds and an RTO of minutes; a course grading system may accept an RPO of 24 hours and an RTO of 4 hours. The acceptable thresholds drive the backup schedule, technology choices, and testing requirements.

**Question 7: What is the principle of least privilege, and how does role-based access control (RBAC) help enforce it?**

**Suggested Answer:** The principle of least privilege states that users should receive only the minimum permissions necessary to perform their job — and no more. RBAC enforces this by assigning permissions to roles (representing job functions) rather than to individual users. Instead of managing hundreds of individual user privileges, the DBA creates roles like instructor, TA, and student, grants each role the minimum needed permissions, and assigns users to those roles. A teaching assistant who does not need to delete grades should not have DELETE privileges — RBAC makes this manageable and auditable.

**Question 8: What is the shared responsibility model in cloud database administration? Name two responsibilities the cloud provider handles and two the DBA still owns.**

**Suggested Answer:** The shared responsibility model divides duties between the cloud provider and the DBA. The cloud provider manages physical hardware, operating system patching, and database engine availability. The DBA still owns schema design, data integrity, role and permission configuration, backup policy understanding, query performance tuning, and compliance configuration. The cloud reduces infrastructure burden but does not remove accountability — misunderstanding this division is a leading cause of cloud data incidents.

---

## Reflection Questions

**Question 1: The chapter describes the DBA as a "guardian of data trust" rather than simply a technician. What does this framing mean, and why is it an important way to think about database administration?**

**Suggested Answer:** Calling the DBA a guardian of data trust reframes database administration as an organizational responsibility rather than a background technical chore. A technician fixes things when they break. A guardian actively protects conditions — accuracy, security, availability, recoverability, performance, and continuity — so that people can depend on the data. This framing matters because it connects DBA work directly to business outcomes: every decision built on database records depends on the DBA's behind-the-scenes work. Without that trust, reports are doubted, dashboards are ignored, and the database becomes a liability instead of an asset. The chapter's final takeaway — "A database becomes valuable only when people can trust it" — captures this idea.

**Question 2: In the Gradebook Crash scenario, a TA accidentally deletes all grades due to excessive permissions. Which DBA disciplines — access control, transactions, and backup/recovery — worked together to prevent permanent data loss? What would have failed if any one of those disciplines had been missing?**

**Suggested Answer:** Three disciplines worked together. Access control failed initially — the TA had excessive DELETE privileges — but was corrected afterward through privilege review and enforcement of least privilege. Transactions ensured the deletion was a clean atomic boundary — the entire delete succeeded as one unit, making it identifiable in the recovery log. Backup and recovery saved the data — the DBA restored last night's full backup and rollforwarded the logs, stopping just before the destructive command. If access control had been missing entirely, the incident could recur immediately. If transactions had been missing, the deletion might have been partial and harder to isolate. If backup/recovery had been missing, the data would be permanently lost. The scenario shows that DBA disciplines are a system of controls, not a checklist of unrelated tasks.

**Question 3: How do concurrency control and transactions work together to protect data reliability? Why is having one without the other insufficient?**

**Suggested Answer:** Transactions define the unit of work — what operations succeed or fail together. Concurrency control determines how multiple transactions interact safely when they run at the same time. Without transactions, there is no mechanism to group related operations into all-or-nothing units, so partial updates can corrupt data. Without concurrency control, even well-defined transactions can overwrite each other, read uncommitted data, or deadlock. Together, they provide both internal reliability (ACID guarantees within a transaction) and external safety (multiple transactions coexisting without interference). The chapter places them sequentially for a reason — you cannot protect what you have not defined as a coherent unit.

**Question 4: Why might optimistic locking be appropriate for a grading system where instructors rarely edit the same record, while pessimistic locking is better for a banking system where conflicts are more likely?**

**Suggested Answer:** Optimistic locking assumes conflicts are rare — it allows edits to proceed without locking, then checks for conflicts before saving. This works well for a grading system because typically only one instructor grades a particular student's work on a particular deliverable, so conflicts are uncommon and the overhead of locking every edit would be wasteful. Pessimistic locking assumes conflicts are likely — it locks data before editing begins. This is better for banking because account balances are shared resources that many transactions touch simultaneously (deposits, withdrawals, transfers, payments), and the cost of a conflict — incorrect balances or lost money — is far higher than the performance cost of locking. The choice between strategies is a risk-management decision, not a purely technical one.

**Question 5: How does SQL injection illustrate the difference between treating user input as data versus treating it as executable code? Why is this distinction important for database security beyond just SQL injection?**

**Suggested Answer:** SQL injection works because user input is concatenated directly into a SQL string, allowing an attacker to insert SQL commands that the database executes as code. The fix — parameterized queries — enforces the boundary by treating all user input strictly as data values, never as part of the command structure. This distinction between data and code is a fundamental security principle that extends beyond SQL injection: any system that blurs the line between what users provide and what the system executes is vulnerable to injection attacks. The principle applies to command shells, HTML rendering, API calls, and file paths. The DBA's job is to ensure the database enforces this boundary at every interaction point.

**Question 6: The chapter states that "an untested backup is a hope, not a plan." What does this mean in practice? What could go wrong if an organization never tests its restores?**

**Suggested Answer:** In practice, this means that backup files sitting on a drive prove nothing about recoverability. Testing requires periodically restoring backups to a separate environment and verifying that the data is complete, consistent, and usable. Without testing, several things can go wrong: the backup file may be corrupted, the backup may have captured only part of the database, the backup schedule may have silently stopped running, the restore procedure may be undocumented or require steps nobody remembers, or the recovery time may far exceed the acceptable RTO. The worst time to discover any of these failures is after data is lost. A tested backup is verified evidence of recoverability; an untested backup is an assumption.

**Question 7: Compare DBA responsibilities in SQLite versus Supabase. What does each platform teach about the relationship between tool simplicity and administrative discipline?**

**Suggested Answer:** SQLite is serverless and file-based — security is mostly file-system and application-level, backups are file copies or the `.backup` command, and integrity checks use `PRAGMA integrity_check`. Its simplicity teaches that administrative discipline is not optional just because the tool is lightweight — foreign keys must be explicitly enabled, WAL mode must be consciously configured, and the database file must still be backed up. Supabase is a managed cloud platform built on PostgreSQL — it provides automated backups, role management, connection pooling, and monitoring dashboards. Its sophistication teaches that more automation does not eliminate accountability — the DBA still designs roles, sets backup retention policies, governs access, and tunes queries. The lesson across both platforms is consistent: the tools change, but the DBA responsibility to protect data trust does not.

**Question 8: The chapter argues that cloud databases reduce infrastructure burden but do not remove DBA accountability. Do you agree? Use the shared responsibility table from the chapter to support your reasoning.**

**Suggested Answer:** I agree. The shared responsibility table shows that the cloud provider handles physical hardware, operating system patching, and database engine availability — tasks the DBA no longer needs to manage. But the DBA still owns schema design, data integrity, role and permission configuration, backup policy understanding, query performance tuning, and compliance configuration. These are not infrastructure tasks — they are data governance and design tasks that no cloud provider can perform without understanding the organization's specific data, rules, and requirements. The cloud automates infrastructure. It does not automate judgment. A DBA who assumes "the cloud handles everything" may discover too late that nobody configured backup retention, nobody reviewed permissions, and nobody tested recovery — all failures of accountability, not technology.

---

## Personal Reflection Questions

**Question 1: Which DBA responsibility — security, concurrency, backup, or performance — do you find most challenging to think about? What makes it difficult, and what would help you understand it better?**

**Suggested Answer:** There is no single correct answer; responses will vary. A strong answer identifies a specific DBA responsibility, explains what makes it difficult (for example, security may feel abstract until a breach occurs, concurrency may be hard to visualize, backup planning may seem tedious until data is lost), and suggests a concrete way to improve understanding — such as practicing with SQLite transactions, simulating a lost update, testing a backup and restore, or reviewing the Gradebook Crash scenario step by step.

**Question 2: Have you ever experienced a situation where data was lost because no backup existed — a lost file, unsaved work, or an overwritten document? How would a backup strategy like the one described in this chapter have changed the outcome?**

**Suggested Answer:** Responses will vary. Most students have experienced data loss — a paper lost when a computer crashed, a spreadsheet overwritten by a collaborator, a phone photo library gone after a device failure. A strong answer connects the personal experience to chapter concepts: a regular backup schedule would have preserved the work, a versioned naming convention would have allowed recovery to a specific point, and testing the backup (making sure the file actually opens) would have confirmed recoverability. The answer should show awareness that the same principles that protect enterprise databases also apply at a personal scale.

**Question 3: What does the principle of least privilege suggest about access to your own course data in systems you use as a student? Can you think of an example where you or someone you know had more access to sensitive information than necessary?**

**Suggested Answer:** The principle of least privilege suggests that students should be able to see their own grades, submit their own work, and view their own attendance records — but should not be able to see other students' grades, modify scores, or access instructor-only administrative functions. Examples of excessive access might include a shared spreadsheet where everyone could edit everyone else's data, a course management system where students could see each other's submission statuses, or a group project file where one member could delete another's work. A strong answer connects the observation to the chapter's argument that over-privileged access is a leading cause of both accidental damage and intentional misuse.

**Question 4: If you were responsible for a small departmental database — say, a club membership list or an event registration system — which one DBA practice from this chapter would you implement first? Why that one?**

**Suggested Answer:** Responses will vary. Reasonable choices include: (1) Backup — because losing all membership or registration data would be unrecoverable. (2) Least privilege — because limiting who can modify the data prevents accidental deletions. (3) Documentation — because if the creator leaves, nobody else would know how the database works. A strong answer justifies the choice with a concrete scenario from the chapter or personal experience, and acknowledges that the other DBA practices would follow soon after — the question asks for priority, not exclusivity.

**Question 5: How does understanding database administration change the way you view the systems you rely on every day — course registration, banking apps, streaming platforms, or healthcare portals?**

**Suggested Answer:** Responses will vary. A strong answer moves beyond "I appreciate them more" to specific observations: recognizing that course registration systems need concurrency control to prevent seat double-booking, that banking apps must use ACID transactions to prevent money from disappearing during a transfer, that streaming platforms must tune query performance to serve millions of users, that healthcare portals must enforce strict access control to protect patient privacy, and that all of these systems depend on tested backups to survive failures. The answer should show that the chapter's concepts have made previously invisible infrastructure visible.

**Question 6: Which skill or concept from this chapter would you most want to develop further if you pursued a career involving data management, analytics, or information systems? What would that skill enable you to do?**

**Suggested Answer:** Responses will vary. A strong answer names a specific chapter concept — such as backup and recovery planning, role-based access control, performance tuning with indexes, transaction design, or security auditing — and explains what professional capability it would unlock. For example, mastering backup and recovery would enable someone to design disaster recovery plans that protect organizational data; understanding RBAC would enable someone to implement secure multi-user database systems; learning performance tuning would enable someone to optimize slow reports and keep dashboards responsive. The answer should connect a chapter skill to a concrete professional outcome.

```
===== Terms Treasury (terms-treasury.md) =====
```

# Chapter 11 Term Treasury — Database Administration

<img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-terms-sizedmin" alt="Terms Treasury section icon" width="220" />

| Term / Concept | Definition | Business Significance | Examples |
| --- | --- | --- | --- |
| **ACID Properties** | Atomicity, Consistency, Isolation, and Durability — the four guarantees that define reliable transaction processing in professional database systems. | ACID ensures that business-critical operations (payments, grade changes, inventory updates) are trustworthy even under concurrent use, errors, or system failure. | A grade update and its audit record both succeed or both fail; a bank transfer debits one account and credits the other as one unit of work. |
| **Atomicity** | The ACID property meaning "all or nothing": every operation in a transaction completes, or none of them do. | Prevents partial updates that corrupt business records — you cannot debit one account without crediting another, or update a grade without recording who changed it. | Updating a grade and inserting an audit row together as one transaction; if the audit insert fails, the grade update is also undone. |
| **Authentication** | The process of verifying a user's identity before granting database access, typically through credentials, tokens, or single sign-on. | Ensures the database knows who is connecting. Without authentication, there is no accountability — anyone could pose as an instructor, analyst, or administrator. | An instructor logs into the grading system with a username and password before viewing or changing grades. |
| **Authorization** | Determining what actions an authenticated user is permitted to perform — such as SELECT, INSERT, UPDATE, or DELETE — on specific database objects. | Separates who you are from what you can do. Authorization enforces role boundaries: a teaching assistant may read grades but should not delete them. | A TA is authorized to INSERT attendance records but not authorized to DELETE from STUDENT_GRADE. |
| **Backup Strategy** | A planned combination of full, incremental, and differential backups designed to meet recovery objectives while balancing time and storage costs. | Without a tested backup strategy, an organization is one accident or failure away from permanent data loss. Backup strategy translates business risk tolerance into operational practice. | A grading database uses a weekly full backup plus nightly incremental backups; a hospital system may use continuous backup with point-in-time recovery. |
| **Before-Image / After-Image** | Before-images record data values before a change (used for rollback); after-images record values after a change (used for rollforward). | These log records are the technical foundation of recovery — they allow the database to undo mistakes and rebuild lost data to a precise point in time. | Before-image: the old score of 84. After-image: the new score of 90. Together they let the DBA undo or redo the change. |
| **CIA Triad** | Confidentiality, Integrity, and Availability — the three foundational goals of information and database security. | The CIA triad gives DBAs a framework for balancing security decisions: protecting data from exposure, preventing unauthorized changes, and keeping systems accessible to legitimate users. | Confidentiality: students cannot see other students' grades. Integrity: only instructors can modify scores. Availability: grade reports load when advisors need them. |
| **Concurrency Control** | Mechanisms that manage simultaneous access to a database, preventing conflicting updates, inconsistent reads, and data corruption. | Without concurrency control, shared databases become unreliable — one user's update silently overwrites another's, and reports may show mid-change, inconsistent data. | Two instructors editing the same grade record at the same time; locks prevent one from overwriting the other's work. |
| **Consistency (ACID)** | The ACID property ensuring that a transaction moves the database from one valid state to another, preserving all defined rules, constraints, and business logic. | Consistency protects business rules at the database level — scores must remain within valid ranges, foreign keys must reference real records, and required fields cannot be left empty. | A transaction cannot insert a grade for a nonexistent student or assign a score outside 0–100. |
| **Cursor** | A database mechanism that acts as a pointer to a specific row within a query result set, allowing row-by-row processing. | Cursors are useful for certain administrative and procedural tasks, but they can hold locks longer than set-based operations — DBAs should prefer set-based SQL for most business reporting. | Processing a large result set one row at a time with a cursor instead of using a single UPDATE statement; common in stored procedures but discouraged for routine queries. |
| **Data Administration (DA)** | The organizational function responsible for data governance, policies, naming standards, metadata management, and compliance across the enterprise. | DA defines what data means and who owns it. Without DA, different departments define the same metric differently, creating confusion and untrustworthy reporting. | A university's data administration team defines naming standards, retention policies, and privacy rules for student records across all systems. |
| **Database Administration (DBA)** | The technical discipline of managing databases so that they remain secure, reliable, available, recoverable, and efficient over time. | DBA work protects organizational data trust. Every business decision built on database records depends on the DBA's behind-the-scenes work: backups, permissions, performance tuning, and recovery planning. | Managing user accounts, scheduling backups, monitoring slow queries, testing restores, reviewing permissions, and documenting schema changes for the Grading Database. |
| **Deadlock** | A situation in which two or more transactions wait for each other's locks in a circular dependency, preventing any of them from proceeding. | Deadlocks can freeze critical business operations. Modern DBMSs detect and resolve them automatically, but DBAs must design transactions and access patterns to minimize their occurrence. | Transaction A locks STUDENT and waits for STUDENT_GRADE; Transaction B locks STUDENT_GRADE and waits for STUDENT. Neither can continue. |
| **Dirty Read** | Reading data modified by an uncommitted transaction — data that may later be rolled back, making the read invalid. | Dirty reads can cause reports and decisions to be based on data that never actually existed. Isolation levels prevent this from occurring in professional systems. | A report includes a provisional grade of 95 before the transaction commits; the transaction is later rolled back, but the report already used the wrong value. |
| **Disaster Recovery Planning** | A documented, tested plan defining how the database will be restored after a major failure — covering backup locations, restore procedures, acceptable data loss, recovery time targets, and communication protocols. | A backup file alone is not a plan. Disaster recovery planning ensures the organization knows exactly what to do when failure occurs, who does it, and how long it will take. | A DBA schedules quarterly test restores, documents the recovery procedure, and defines that no more than one hour of data loss is acceptable for the grading system. |
| **Durability** | The ACID property guaranteeing that once a transaction is committed, its changes survive system failures — crashes, power loss, or hardware problems. | Durability means that confirmed business records stay confirmed. A grade saved is a grade kept; a payment processed is a payment recorded — even if the server restarts immediately afterward. | After COMMIT confirms a grade update, the grade remains correct even if the database server crashes and restarts. |
| **Isolation** | The ACID property ensuring that concurrent transactions do not interfere with each other — each transaction behaves as if it were running alone. | Isolation prevents mid-transaction chaos: no user sees partially completed work, and no report captures data that is still being changed by another process. | Two instructors updating different students' grades at the same time do not see or disrupt each other's unfinished work. |
| **Least Privilege** | The security principle that users should receive only the minimum permissions necessary to perform their job — and no more. | Least privilege reduces risk from both malicious misuse and honest mistakes. A teaching assistant who does not need DELETE permissions should not have them — accidents and abuse are both limited. | A TA can INSERT attendance but cannot DELETE grades; an analyst can SELECT from reporting views but cannot modify base tables. |
| **Lock (Shared / Exclusive)** | A shared lock allows multiple transactions to read data simultaneously while preventing writes; an exclusive lock prevents any other transaction from reading or writing the locked data. | Locks are the primary mechanism for concurrency control. Choosing the right lock type and granularity balances data safety against system performance. | A shared lock lets several instructors view the same grade report; an exclusive lock lets one instructor update a grade while blocking conflicting access. |
| **Lost Update** | A concurrency problem in which two users read the same data, both modify it, and the last write silently overwrites the first — one update is lost. | The lost update is the most teachable concurrency failure. It shows exactly why shared databases need control mechanisms — without them, data silently becomes wrong. | Instructor A changes a score from 84 to 90; Instructor B also reads 84 and changes it to 88. The final score is 88, and Instructor A's change is lost. |
| **Pessimistic vs. Optimistic Locking** | Pessimistic locking assumes conflicts are likely and locks data before editing. Optimistic locking assumes conflicts are rare, allows edits to proceed, and checks for conflicts before saving. | Choosing the right strategy affects both data safety and system usability. High-conflict systems (banking) need pessimistic locks; read-heavy systems may benefit from optimistic approaches. | Pessimistic: lock a grade row before editing. Optimistic: edit the grade, then check whether anyone else changed it before saving. |
| **Recovery Point Objective (RPO)** | The maximum acceptable amount of data loss measured in time — how much data can the organization afford to lose after a failure? | RPO drives backup frequency. A one-hour RPO requires near-continuous backup; a 24-hour RPO allows daily backups. The answer depends on business impact, not technology. | A grading database with a 24-hour RPO accepts losing up to one day of grade changes; a payroll system with a 1-hour RPO backs up far more frequently. |
| **Recovery Time Objective (RTO)** | The maximum acceptable downtime measured in time — how quickly must the database be restored and available after a failure? | RTO drives investment in recovery infrastructure. A 15-minute RTO may require hot standby systems; a 4-hour RTO may allow restore from backup during a maintenance window. | A hospital patient-records system targets RTO of under 5 minutes; a course grading system may accept RTO of 4 hours. |
| **Role-Based Access Control (RBAC)** | A security model in which permissions are assigned to roles (representing job functions) rather than directly to individual users. | RBAC simplifies permission management and reduces errors. Instead of managing hundreds of individual user privileges, the DBA manages a handful of roles — instructor, TA, student, analyst, DBA. | Create a role `instructor`, grant it SELECT/INSERT/UPDATE on STUDENT_GRADE, and assign instructors to that role — no per-user permission configuration needed. |
| **Rollback and Rollforward** | Rollback undoes uncommitted or erroneous transactions using before-images. Rollforward restores a backup and then reapplies committed transactions from the recovery log to rebuild lost data. | These two operations form the core of database recovery. Together they let the DBA undo mistakes and rebuild to any point in time between backups. | Rollback: undo a failed grade update. Rollforward: restore last night's backup, then replay all of today's valid transactions to recover after a midday crash. |
| **Shared Responsibility Model** | In cloud databases, the division of duties where the cloud provider manages physical infrastructure and the database engine, while the DBA remains responsible for schema, data, security policies, backup configuration, and performance. | The cloud reduces infrastructure burden but does not eliminate DBA accountability. Misunderstanding shared responsibility is a leading cause of cloud data incidents. | Supabase manages PostgreSQL availability and automated backups; the DBA still designs roles, sets backup retention policies, tunes queries, and governs access. |
| **SQL Injection** | A security attack in which malicious input is inserted into SQL statements, tricking the database into executing unintended commands. | SQL injection is one of the most common and preventable database attacks. Defending against it — through parameterized queries and input validation — is a core DBA and developer responsibility. | Unsafe: `"SELECT * FROM STUDENT WHERE Email = '" + user_input + "'"`. Safe: using parameterized queries where user input is treated as data, not executable code. |
| **Two-Phase Locking (2PL)** | A concurrency control protocol with a growing phase (transactions acquire locks but release none) and a shrinking phase (transactions release locks but acquire no new ones). | 2PL guarantees serializability — that concurrent transactions produce results equivalent to some sequential order. It is the theoretical foundation for many DBMS locking systems. | A transaction locks STUDENT and STUDENT_GRADE during the growing phase, performs its updates, then releases both locks during the shrinking phase. |
| **Write-Ahead Logging (WAL)** | A journal mode in which changes are written to a separate log file before being applied to the main database, improving concurrency and enabling crash recovery. | WAL allows readers and writers to operate with less interference, making SQLite and PostgreSQL more suitable for multi-user scenarios. It is a practical DBA tool for improving performance and safety. | In SQLite: `PRAGMA journal_mode = WAL;` — enables non-blocking reads alongside writes and provides automatic crash recovery. |

# Acronyms and Abbreviations

| Abbreviation | Full Form | Brief Meaning | Where It Appears |
| --- | --- | --- | --- |
| **2PL** | Two-Phase Locking | A concurrency protocol ensuring serializable transactions. | Concurrency control section |
| **ACID** | Atomicity, Consistency, Isolation, Durability | The four guarantees of reliable transaction processing. | Transactions and ACID reliability |
| **CIA** | Confidentiality, Integrity, Availability | The three foundational goals of database security. | Database security section |
| **DA** | Data Administration | Organizational governance of data meaning, policy, and compliance. | DA vs. DBA discussion |
| **DBA** | Database Administration / Database Administrator | The discipline and role that keep databases secure, reliable, and performant. | Entire chapter |
| **DBMS** | Database Management System | Software that creates, manages, and secures databases. | Platform comparisons |
| **RBAC** | Role-Based Access Control | Security model assigning permissions to roles, not individuals. | Database security section |
| **RPO** | Recovery Point Objective | Maximum acceptable data loss measured in time. | Backup and recovery section |
| **RTO** | Recovery Time Objective | Maximum acceptable downtime measured in time. | Backup and recovery section |
| **SQL** | Structured Query Language | A language for querying and managing relational databases. | SQL examples and transaction commands |
| **WAL** | Write-Ahead Logging | A journal mode improving concurrency and crash recovery. | SQLite backup and journal modes |

```
===== RAT: Reading Test (rat.md) =====
```

# Readiness Assessment Test (RAT): Chapter 11 - Database Administration

Complete this assessment after reading the chapter and before class.

**1. Which statement best describes what is database administration? in this chapter?**

A. It is unrelated to database or information-systems work.

B. It is a chapter concept that supports more reliable data, analysis, or business decisions.

C. It replaces the need for keys, queries, or documentation.

D. It matters only after the course is complete.

**2. Which statement best describes design vs. administration in this chapter?**

A. It is unrelated to database or information-systems work.

B. It is a chapter concept that supports more reliable data, analysis, or business decisions.

C. It replaces the need for keys, queries, or documentation.

D. It matters only after the course is complete.

**3. Which statement best describes data administration vs. database administration in this chapter?**

A. It is unrelated to database or information-systems work.

B. It is a chapter concept that supports more reliable data, analysis, or business decisions.

C. It replaces the need for keys, queries, or documentation.

D. It matters only after the course is complete.

**4. Which statement best describes the dba as guardian of data trust in this chapter?**

A. It is unrelated to database or information-systems work.

B. It is a chapter concept that supports more reliable data, analysis, or business decisions.

C. It replaces the need for keys, queries, or documentation.

D. It matters only after the course is complete.

**5. Which statement best describes the data professional ecosystem in this chapter?**

A. It is unrelated to database or information-systems work.

B. It is a chapter concept that supports more reliable data, analysis, or business decisions.

C. It replaces the need for keys, queries, or documentation.

D. It matters only after the course is complete.

**6. Which statement best describes core dba responsibilities in this chapter?**

A. It is unrelated to database or information-systems work.

B. It is a chapter concept that supports more reliable data, analysis, or business decisions.

C. It replaces the need for keys, queries, or documentation.

D. It matters only after the course is complete.

**7. Which statement best describes security and access management in this chapter?**

A. It is unrelated to database or information-systems work.

B. It is a chapter concept that supports more reliable data, analysis, or business decisions.

C. It replaces the need for keys, queries, or documentation.

D. It matters only after the course is complete.

**8. Which statement best describes concurrency control in this chapter?**

A. It is unrelated to database or information-systems work.

B. It is a chapter concept that supports more reliable data, analysis, or business decisions.

C. It replaces the need for keys, queries, or documentation.

D. It matters only after the course is complete.

**9. Which statement best describes transaction management in this chapter?**

A. It is unrelated to database or information-systems work.

B. It is a chapter concept that supports more reliable data, analysis, or business decisions.

C. It replaces the need for keys, queries, or documentation.

D. It matters only after the course is complete.

**10. Which statement best describes backup and recovery in this chapter?**

A. It is unrelated to database or information-systems work.

B. It is a chapter concept that supports more reliable data, analysis, or business decisions.

C. It replaces the need for keys, queries, or documentation.

D. It matters only after the course is complete.

# Answer Key

**1. Correct answer: B**

Explanation: What Is Database Administration? is part of the chapter's working model for building reliable database and information-system practice.

**2. Correct answer: B**

Explanation: Design vs. Administration is part of the chapter's working model for building reliable database and information-system practice.

**3. Correct answer: B**

Explanation: Data Administration vs. Database Administration is part of the chapter's working model for building reliable database and information-system practice.

**4. Correct answer: B**

Explanation: The DBA as Guardian of Data Trust is part of the chapter's working model for building reliable database and information-system practice.

**5. Correct answer: B**

Explanation: The Data Professional Ecosystem is part of the chapter's working model for building reliable database and information-system practice.

**6. Correct answer: B**

Explanation: Core DBA Responsibilities is part of the chapter's working model for building reliable database and information-system practice.

**7. Correct answer: B**

Explanation: Security and Access Management is part of the chapter's working model for building reliable database and information-system practice.

**8. Correct answer: B**

Explanation: Concurrency Control is part of the chapter's working model for building reliable database and information-system practice.

**9. Correct answer: B**

Explanation: Transaction Management is part of the chapter's working model for building reliable database and information-system practice.

**10. Correct answer: B**

Explanation: Backup and Recovery is part of the chapter's working model for building reliable database and information-system practice.