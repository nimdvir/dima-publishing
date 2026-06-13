<!-- metadata: date="2026-05-18"; chapter="11"; section="main-rewritten"; title="Chapter 11: Database Administration"; description="Explains how database administration keeps data secure, available, consistent, recoverable, and performant across file-based, server-based, and cloud database environments."; author="Nimrod Dvir, PhD" -->
# Chapter 11: Database Administration

*Keeping Databases Secure, Reliable, Recoverable, and Ready for Use*

Database design answers the question: **How should data be structured?**

SQL answers the question: **How can we retrieve, transform, and analyze that data?**

Database administration answers a different question: **How do we keep the database working correctly once people depend on it?**

That question matters because real databases do not live in quiet classrooms. They live inside organizations. They support students checking grades, instructors updating records, customers placing orders, analysts running dashboards, and managers making decisions. They are accessed by multiple users, changed over time, exposed to security risks, affected by hardware and software failures, and expected to remain available when people need them.

A well-designed database can still fail if it is poorly administered. It can become slow. It can lose data. It can expose private information. It can allow the wrong person to delete the wrong table. It can become impossible to recover after a crash. Database administration is the discipline that prevents those failures.

In this chapter, you will learn how database administrators think about reliability, security, concurrency, transactions, backups, recovery, performance, maintenance, and cloud responsibility. The examples continue to use the Grading Database, but the principles apply to any business system that stores important data.

---

## Learning Objectives

After completing this chapter, you will be able to:

1. Explain the role of a Database Administrator and why the role matters for business continuity.
2. Distinguish between Data Administration and Database Administration.
3. Explain how concurrency control protects shared databases from conflicting updates.
4. Describe locks, lock granularity, two-phase locking, optimistic locking, pessimistic locking, and deadlocks.
5. Explain transactions and the ACID properties.
6. Apply transaction-control logic using `BEGIN`, `COMMIT`, and `ROLLBACK`.
7. Explain database security concepts including authentication, authorization, role-based access control, and least privilege.
8. Compare full, incremental, and differential backups.
9. Explain rollback, rollforward, recovery logs, before-images, and after-images.
10. Describe how indexes, query plans, and maintenance tasks support performance.
11. Compare DBA responsibilities in Microsoft Access, SQLite, PostgreSQL, Supabase, and cloud-hosted systems.
12. Apply basic DBA thinking to the Grading Database.

---

## Chapter Roadmap

| Section | Main Question | Core Ideas |
|---|---|---|
| 11.1 | What is database administration? | DBA role, data administration, operational reliability |
| 11.2 | What does a DBA do? | Security, concurrency, backup, performance, maintenance |
| 11.3 | What happens when multiple users access data? | Locks, lost updates, deadlocks, optimistic and pessimistic control |
| 11.4 | How do transactions protect reliability? | ACID, `BEGIN`, `COMMIT`, `ROLLBACK` |
| 11.5 | How is database access controlled? | Authentication, authorization, roles, privileges, least privilege |
| 11.6 | How do databases recover from failure? | Backups, logs, rollback, rollforward, disaster recovery |
| 11.7 | How do DBAs keep databases fast? | Indexes, query plans, tuning, monitoring |
| 11.8 | How do databases evolve safely? | Maintenance, integrity checks, schema change |
| 11.9 | How does administration differ by platform? | Access, SQLite, PostgreSQL, Supabase, cloud responsibility |
| 11.10 | How can students practice DBA thinking? | Hands-on administrative tasks using the Grading Database |

---

## 11.1 What Is Database Administration?

**Database administration** is the discipline of managing databases so that they remain secure, reliable, available, recoverable, and efficient over time.

Earlier chapters focused on the structure and use of databases:

- Chapter 6 introduced the relational model.
- Chapter 7 explained normalization.
- Chapter 10 used advanced SQL to analyze and report from the Grading Database.
- Chapter 9 covered database design and ER modeling foundations.
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

### 11.1.1 Design vs. Administration

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

### 11.1.2 Data Administration vs. Database Administration

In larger organizations, there is often a distinction between **Data Administration** and **Database Administration**.

| Role | Scope | Main Focus | Typical Questions |
|---|---|---|---|
| **Data Administration (DA)** | Organization-wide | Governance, policy, standards, meaning, compliance | What does this data mean? Who owns it? How may it be used? |
| **Database Administration (DBA)** | Specific database systems | Technical reliability, security, recovery, performance | Is the database secure, backed up, available, and efficient? |

**Data Administration** is concerned with the organizational meaning and governance of data. It defines naming standards, data definitions, privacy rules, retention policies, and compliance expectations.

**Database Administration** is concerned with implementation and operations. It manages accounts, permissions, backups, recovery procedures, performance, monitoring, and system maintenance.

In a small organization, one person may perform both roles. In a large organization, they may be separate departments. The distinction matters because data problems are not only technical. They are also policy, governance, and accountability problems.

### 11.1.3 The DBA as Guardian of Data Trust

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

---

## 11.2 Core DBA Responsibilities

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

### 11.2.1 Security and Access Management

Security ensures that users can do what they need to do, but no more.

In a grading system:

- Students may read their own grades.
- Teaching assistants may enter attendance.
- Instructors may update grades.
- Administrators may manage users and system settings.
- No ordinary user should be able to delete the entire grade table.

A DBA implements those boundaries through authentication, authorization, roles, and privileges.

### 11.2.2 Concurrency Control

Concurrency control manages simultaneous access. Databases are shared systems. Multiple users may read and write at the same time. Without coordination, one user's update may overwrite another's work or produce inconsistent results.

Concurrency control protects the database when many operations overlap.

### 11.2.3 Transaction Management

A transaction groups several database operations into one logical unit. Either all of the operations succeed, or none of them do. Transactions are essential when a business action requires multiple related updates.

For example, updating a grade may also require recording who made the change and when. The update and the audit record should succeed together.

### 11.2.4 Backup and Recovery

Backups protect against data loss. Recovery procedures define how the database will be restored after a failure.

A backup strategy is not complete until it has been tested. An untested backup is a hope, not a plan.

### 11.2.5 Performance Monitoring and Tuning

Performance is the difference between a useful system and an ignored system. A report that takes too long to run may not be used. A gradebook that freezes during updates undermines trust.

DBAs monitor query speed, indexing, locks, storage, memory, and system load.

### 11.2.6 Maintenance and Evolution

Databases change. New reports are requested. New columns are added. Old data is archived. Indexes are rebuilt. Files are compacted. Permissions are reviewed. Maintenance keeps the database healthy as it ages.

> **Real-World Example:**  
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

### 11.3.1 Common Concurrency Problems

| Problem | What Happens | Example |
|---|---|---|
| Lost update | One user's change overwrites another user's change | Two instructors edit the same grade |
| Dirty read | A user reads uncommitted data that may later be rolled back | A report includes a grade before the update is finalized |
| Nonrepeatable read | A user reads the same row twice and gets different results | A score changes during a report |
| Phantom read | A query rerun returns new rows inserted by another transaction | A new grade appears during an average calculation |

These problems occur because database operations overlap in time.

### 11.3.2 Locks

A **lock** is a temporary control that prevents conflicting access to data.

| Lock Type | Purpose | Example |
|---|---|---|
| Shared lock | Allows reading while preventing conflicting writes | Several users view the same grade report |
| Exclusive lock | Allows one transaction to modify data while blocking conflicting access | One instructor updates a grade |

### 11.3.3 Lock Granularity

Locks may apply at different levels.

| Granularity | Meaning | Advantage | Disadvantage |
|---|---|---|---|
| Row-level lock | Locks only selected rows | High concurrency | More overhead |
| Page-level lock | Locks a storage page containing multiple rows | Balanced overhead | May block unrelated rows |
| Table-level lock | Locks an entire table | Simpler | Reduces concurrency |
| Database-level lock | Locks the whole database | Safe for major maintenance | Blocks most activity |

A file-based database may use broader locks. A server-based DBMS usually supports finer-grained locking.

### 11.3.4 Pessimistic and Optimistic Locking

DBMSs and applications generally manage conflicts using one of two strategies.

| Strategy | Assumption | How It Works | Best For |
|---|---|---|---|
| **Pessimistic locking** | Conflicts are likely | Lock data before editing | Banking, inventory, high-risk updates |
| **Optimistic locking** | Conflicts are rare | Allow edits, then check for conflicts before saving | Read-heavy systems, low-conflict environments |

In a grading database, pessimistic locking might be appropriate if several instructors often edit the same records. Optimistic locking might be acceptable if grade edits are rare and usually performed by one instructor.

### 11.3.5 Two-Phase Locking

**Two-Phase Locking (2PL)** is a protocol that helps ensure transactions behave correctly under concurrency.

It has two phases:

1. **Growing phase:** the transaction acquires locks.
2. **Shrinking phase:** the transaction releases locks.

Once a transaction starts releasing locks, it cannot acquire new ones. This rule helps guarantee **serializability**, meaning that even if transactions run at the same time, the final result is equivalent to some safe sequential order.

### 11.3.6 Deadlocks

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

---

## 11.4 Transactions and ACID Reliability

Concurrency control manages simultaneous users. Transactions manage reliability when operations succeed, fail, or partially complete.

A **transaction** is a logical unit of work made of one or more database operations. The database treats the group as one all-or-nothing action.

### 11.4.1 Why Transactions Matter

Suppose an instructor updates a grade and records an audit entry.

```text
Step 1: Update STUDENT_GRADE.
Step 2: Insert a row into GRADE_AUDIT.
```

If Step 1 succeeds and Step 2 fails, the grade changes but there is no record of who changed it. If Step 2 succeeds and Step 1 fails, the audit log claims a change occurred when it did not. Both outcomes are bad.

A transaction ensures that the two operations succeed or fail together.

### 11.4.2 Transaction Control Commands

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

### 11.4.3 The ACID Properties

Reliable transactions are governed by the **ACID** properties.

| Property | Meaning | Grading Database Example |
|---|---|---|
| **Atomicity** | All operations succeed or none do | Grade update and audit insert happen together |
| **Consistency** | Rules remain valid before and after | Score must remain between 0 and 100 |
| **Isolation** | Concurrent transactions do not interfere | Two instructors cannot corrupt the same grade |
| **Durability** | Committed changes survive failure | Saved grade remains after a crash |

### 11.4.4 Atomicity

Atomicity means **all or nothing**. If a transaction has five steps, the database does not keep only the first three if Step 4 fails. It rolls the entire transaction back.

### 11.4.5 Consistency

Consistency means that a transaction moves the database from one valid state to another. It cannot violate constraints such as:

- primary key uniqueness,
- valid foreign keys,
- `NOT NULL` rules,
- score-range rules,
- business constraints.

For example, a transaction should not insert a grade for a nonexistent student.

### 11.4.6 Isolation

Isolation means that each transaction behaves as if it were running alone, even when many transactions are active. Different DBMSs offer different isolation levels, but the purpose is always the same: prevent one transaction from seeing or disrupting unsafe intermediate states.

### 11.4.7 Durability

Durability means that once a transaction is committed, the change survives system failure. If the database confirms that a grade update was saved, the grade should still be there after a restart.

> **Real-World Example:**  
> In banking, transferring money requires decreasing one account balance and increasing another. If the debit succeeds but the credit fails, money disappears. If the credit succeeds but the debit fails, money appears. Transactions prevent both failures by treating the transfer as one unit of work.

---

## 11.5 Database Security

Database security ensures that data is protected from unauthorized access, unauthorized modification, accidental damage, and unnecessary exposure.

Security is not only about hackers. Many security problems come from ordinary users having more privileges than they need.

### 11.5.1 The CIA Triad

Database security is often described through the **CIA triad**.

| Goal | Meaning | Grading Database Example |
|---|---|---|
| **Confidentiality** | Only authorized users can access sensitive data | Students cannot see other students' grades |
| **Integrity** | Data remains accurate and protected from unauthorized change | Only instructors can update grades |
| **Availability** | Authorized users can access the database when needed | Grade reports are available before advising |

Security must balance all three. A database that is perfectly confidential but unavailable is not useful. A database that is highly available but exposes private data is dangerous.

### 11.5.2 Authentication and Authorization

Security begins with two questions.

| Concept | Question | Example |
|---|---|---|
| **Authentication** | Who are you? | User logs in with credentials |
| **Authorization** | What are you allowed to do? | Instructor can update grades; student cannot |

A user may be authenticated but still not authorized to perform a specific action.

### 11.5.3 Roles and Privileges

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

### 11.5.4 Least Privilege

The **principle of least privilege** says that users should receive only the permissions required to do their work.

This principle protects against both malicious misuse and honest mistakes. A teaching assistant who does not need to delete grades should not have `DELETE` privileges on `STUDENT_GRADE`.

### 11.5.5 Example: Role-Based Permissions

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

### 11.5.6 Views as Security Layers

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

### 11.5.7 SQL Injection

**SQL injection** occurs when an attacker submits input that changes the meaning of a SQL command.

Unsafe pattern:

```text
"SELECT * FROM STUDENT WHERE Email = '" + user_input + "';"
```

If user input is inserted directly into SQL text, malicious input can alter the query.

The safer approach is to use **parameterized queries**, where user input is treated as data rather than executable SQL.

> **Important:** SQL injection is one of the most preventable database attacks. Never build SQL commands by directly concatenating untrusted user input.

### 11.5.8 Security as a Continuous Process

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

### 11.6.1 Backup Types

| Backup Type | What It Stores | Advantage | Disadvantage |
|---|---|---|---|
| **Full backup** | Complete database copy | Easiest to restore | Takes the most time and storage |
| **Incremental backup** | Changes since the last backup of any type | Efficient storage | Slower restore; multiple files needed |
| **Differential backup** | Changes since the last full backup | Faster restore than incremental | Grows larger until next full backup |

A common strategy combines periodic full backups with more frequent incremental or differential backups.

### 11.6.2 Recovery Objectives: RPO and RTO

Two practical concepts guide recovery planning.

| Term | Meaning | Question |
|---|---|---|
| **Recovery Point Objective (RPO)** | Maximum acceptable data loss | How much data can we afford to lose? |
| **Recovery Time Objective (RTO)** | Maximum acceptable downtime | How quickly must we recover? |

For a personal practice database, losing one day of work may be acceptable. For a payroll database, losing one day may be unacceptable. For a hospital system, even a few minutes of downtime may be dangerous.

### 11.6.3 Recovery Logs

A **recovery log** records changes made to the database. Logs allow the system to undo or redo operations during recovery.

| Log Record | Meaning | Used For |
|---|---|---|
| Before-image | Value before the change | Rollback |
| After-image | Value after the change | Rollforward |

### 11.6.4 Rollback and Rollforward

| Technique | What It Does | Example |
|---|---|---|
| **Rollback** | Undoes incomplete or incorrect transactions | Undo a failed grade update |
| **Rollforward** | Restores a backup, then reapplies logged changes | Restore Monday backup and replay Tuesday transactions |

Rollback is like pressing undo. Rollforward is like restoring an older version and replaying everything valid that happened after it.

### 11.6.5 Disaster Recovery Planning

A backup file alone is not a disaster recovery plan. A recovery plan should define:

- where backups are stored,
- how often backups run,
- who can restore them,
- how restoration is tested,
- how long recovery should take,
- how much data loss is acceptable,
- how users will be notified during downtime.

A DBA should periodically perform test restores. The worst time to discover that backups are broken is after data is lost.

### 11.6.6 File-Based Backup Example

For Microsoft Access or SQLite, backup may be as simple as copying the database file. But the file should be closed or safely backed up through a proper backup mechanism.

Example naming convention:

```text
GradingDB_backup_2026-05-18_1400.accdb
grading_backup_2026-05-18_1400.sqlite
```

A timestamped naming convention makes it easier to identify recovery points.

### 11.6.7 SQLite Backup and Journal Modes

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

### 11.6.8 Cloud Backup Considerations

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

## 11.7 Performance Monitoring and Tuning

Performance tuning is the work of keeping the database responsive as usage grows.

A query that runs instantly on 50 rows may become slow on 5 million rows. A report that works for one instructor may fail when used by 400 users. Performance issues often appear gradually, which means DBAs must monitor proactively.

### 11.7.1 Common Performance Problems

| Problem | Cause | Possible DBA Response |
|---|---|---|
| Slow filters | Missing index | Create index on filtered column |
| Slow joins | Missing index on foreign key | Index join columns |
| Long-running reports | Inefficient query or too much aggregation | Create view, summary table, or optimized query |
| Lock waits | Transactions hold locks too long | Shorten transactions, tune queries |
| Storage growth | Tables/logs/indexes expanding | Archive data, compact, plan capacity |
| High cloud cost | Inefficient queries or over-provisioning | Optimize queries, right-size resources |

### 11.7.2 Indexes

An **index** is a data structure that helps the DBMS find rows faster.

Without an index, the DBMS may scan every row in a table. With an index, it can jump more directly to matching rows.

Example:

```sql
CREATE INDEX idx_student_grade_student
ON STUDENT_GRADE(StudentID);
```

This index can speed up queries that filter or join on `StudentID`.

### 11.7.3 Index Trade-Offs

Indexes are not free.

| Benefit | Cost |
|---|---|
| Faster reads | Slower inserts, updates, and deletes |
| Faster joins | More storage |
| Faster filters and sorting | More maintenance overhead |

A DBA should index columns that are frequently used in:

- joins,
- filters,
- sorting,
- grouping,
- foreign key relationships.

A DBA should avoid indexing every column just because indexes sound useful. Indexes are design decisions.

### 11.7.4 Reading Query Plans

A query plan shows how the DBMS intends to execute a query.

In SQLite:

```sql
EXPLAIN QUERY PLAN
SELECT *
FROM STUDENT_GRADE
WHERE StudentID = 5;
```

The result helps determine whether SQLite is using an index or scanning the whole table.

### 11.7.5 Performance and Query Design

Some performance problems are not caused by the DBMS. They are caused by poor query logic.

Common issues include:

- joining more tables than necessary,
- filtering after aggregation when filtering could happen earlier,
- using functions on indexed columns in ways that prevent index use,
- returning `SELECT *` when only a few columns are needed,
- running large reports during peak transactional use.

### 11.7.6 Performance and Business Impact

Performance is not only technical. It affects behavior.

If grade reports take too long, instructors may export data into spreadsheets and create unofficial copies. If dashboards are slow, managers may stop using them. If registration systems slow down under load, students lose trust.

> **Key Takeaway:** Performance tuning supports both technical efficiency and organizational confidence.

---

## 11.8 Maintenance and Database Evolution

Databases are living systems. Once deployed, they continue to grow, change, and age.

### 11.8.1 Routine Maintenance Tasks

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

### 11.8.2 Schema Changes

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

### 11.8.3 Change Management

Professional database environments usually require formal change management.

A change request should answer:

1. What is changing?
2. Why is it needed?
3. Which tables, views, queries, reports, or applications are affected?
4. How will the change be tested?
5. How will the change be reversed if it fails?
6. Who approved the change?

This may feel bureaucratic, but uncontrolled database changes are dangerous. A small schema change can break many reports.

### 11.8.4 Documentation

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

## 11.9 DBA Work Across Platforms

The principles of database administration are stable, but the implementation differs across platforms.

### 11.9.1 Microsoft Access

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

### 11.9.2 SQLite

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

### 11.9.3 PostgreSQL

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

### 11.9.4 Supabase and Cloud Databases

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

### 11.9.5 Platform Comparison

| Platform | Strength | Limitation | Main DBA Lesson |
|---|---|---|---|
| Access | Visual, approachable | Limited concurrency and security | Administration can be visible and local |
| SQLite | Simple, portable, real SQL | Limited built-in user security | File-based systems still require discipline |
| PostgreSQL | Powerful, scalable, secure | More complex | Professional DBMSs require active management |
| Supabase | Managed PostgreSQL in the cloud | Shared responsibility can be misunderstood | Cloud DBAs still govern data and access |

---

## 11.10 Hands-On DBA Practice with the Grading Database

This section turns the chapter's concepts into practice. The goal is not to become a professional DBA immediately. The goal is to recognize administrative responsibilities and apply them thoughtfully.

### 11.10.1 Practice Layer 1: Microsoft Access

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

### 11.10.2 Practice Layer 2: SQLite

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

### 11.10.3 Practice Layer 3: Supabase / PostgreSQL

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

### 11.10.4 What the Hands-On Work Teaches

| Platform | What You Practice |
|---|---|
| Access | Visual relationships, local backup, compact/repair |
| SQLite | Explicit pragmas, transactions, indexes, file responsibility |
| Supabase/PostgreSQL | Roles, privileges, transactions, views, cloud responsibility |

The core lesson is consistent:

> DBA thinking is not platform-specific. The tools change, but the responsibilities remain.

---

## 11.11 Common DBA Mistakes

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

## 11.12 Key Concepts

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

---

## 11.13 Chapter Summary

This chapter explained how databases are kept reliable after they are designed and deployed. Earlier chapters showed how to structure data, write SQL, normalize tables, and design schemas. Chapter 11 added the operational layer: the practices that keep those databases secure, available, recoverable, and responsive over time.

The chapter began by distinguishing database administration from database design and data administration. Design defines structure. Data administration governs meaning and policy. Database administration manages the technical reality of running database systems under real conditions.

You then examined the core responsibilities of a DBA: security, concurrency control, transaction management, backup and recovery, performance tuning, maintenance, documentation, and capacity planning. These responsibilities apply whether the database is a small Access file, a SQLite database, a PostgreSQL server, or a managed cloud database.

The chapter also explained concurrency control, including locks, lock granularity, optimistic and pessimistic approaches, two-phase locking, and deadlocks. These concepts show how a DBMS protects shared data when multiple users act at the same time.

Transactions and ACID properties were presented as the foundation of database reliability. Atomicity, consistency, isolation, and durability explain why professional databases can support important systems such as banking, healthcare, inventory, payroll, and academic records.

Security was framed through confidentiality, integrity, and availability. You learned the difference between authentication and authorization, the value of role-based access control, and the importance of least privilege. You also saw how views can serve as controlled reporting layers and why SQL injection remains a serious risk.

Backup and recovery planning showed that reliable databases require tested recovery procedures, not just backup files. Full, incremental, and differential backups serve different purposes. Rollback, rollforward, before-images, after-images, and logs help restore data to a valid state after failure.

Finally, the chapter examined performance, maintenance, platform differences, and hands-on DBA practice. Indexes, query plans, integrity checks, compaction, and schema-change discipline all contribute to long-term system health. The comparison among Access, SQLite, PostgreSQL, and Supabase reinforced the central lesson: platforms differ, but DBA responsibilities remain.

> **Final Takeaway:** A database becomes valuable only when people can trust it. Database administration is the work that protects that trust.

---

## Key Terms

| Term | Definition |
|---|---|
| ACID | Atomicity, Consistency, Isolation, and Durability; the core transaction reliability properties |
| Authentication | Verifying a user's identity |
| Authorization | Determining what an authenticated user is allowed to do |
| Backup | A copy of database data used for recovery |
| Before-image | The value of data before a change, used for rollback |
| After-image | The value of data after a change, used for rollforward |
| Concurrency control | Mechanisms that coordinate simultaneous database access |
| Deadlock | A circular waiting situation where transactions block each other |
| Differential backup | A backup of all changes since the last full backup |
| Durability | The guarantee that committed data survives failure |
| Exclusive lock | A lock used for writing that prevents conflicting access |
| Full backup | A complete copy of the database |
| Incremental backup | A backup of changes since the last backup |
| Index | A structure that speeds retrieval but adds write overhead |
| Isolation | The guarantee that concurrent transactions do not interfere incorrectly |
| Least privilege | Granting only the minimum permissions required |
| Lock granularity | The level at which a lock is applied, such as row, table, or database |
| Optimistic locking | Conflict strategy that checks for conflicts at commit time |
| Pessimistic locking | Conflict strategy that locks data before editing |
| RBAC | Role-Based Access Control; permissions assigned to roles rather than individuals |
| Recovery log | A record of database changes used for rollback and rollforward |
| RPO | Recovery Point Objective; maximum acceptable data loss |
| RTO | Recovery Time Objective; maximum acceptable downtime |
| Shared lock | A read lock that allows concurrent reads but prevents conflicting writes |
| Transaction | A logical unit of work that succeeds or fails as a whole |
| Two-phase locking | A locking protocol with growing and shrinking phases |
| WAL | Write-Ahead Logging; a logging mode where changes are written to a log before being applied |

---

## Review Questions

1. What is the difference between database design and database administration?
2. How does Data Administration differ from Database Administration?
3. Why does a database need concurrency control?
4. What is the lost update problem? Give an example from the Grading Database.
5. Compare shared locks and exclusive locks.
6. What is lock granularity, and why does it matter?
7. Compare optimistic and pessimistic locking.
8. What is a deadlock, and how do DBMSs usually resolve it?
9. What is a transaction?
10. Explain each ACID property using a grading or business example.
11. Why is `ROLLBACK` important?
12. What is the difference between authentication and authorization?
13. How does role-based access control support the principle of least privilege?
14. Why should students not be granted direct access to all rows in `STUDENT_GRADE`?
15. Compare full, incremental, and differential backups.
16. What are RPO and RTO?
17. Explain the difference between rollback and rollforward recovery.
18. Why are indexes both useful and costly?
19. What does `EXPLAIN QUERY PLAN` help a DBA understand?
20. How do DBA responsibilities differ across Access, SQLite, PostgreSQL, and Supabase?
21. What does the shared responsibility model mean in cloud database administration?
22. Why is a tested restore more important than a backup file alone?

---

## References

Connolly, T. M., & Begg, C. E. (2015). *Database systems: A practical approach to design, implementation, and management* (6th ed.). Pearson.

Coronel, C., & Morris, S. (2019). *Database systems: Design, implementation, & management* (13th ed.). Cengage Learning.

Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7th ed.). Pearson.

Hoffer, J. A., Venkataraman, R., & Topi, H. (2019). *Modern database management* (13th ed.). Pearson.

Kroenke, D. M., & Auer, D. J. (2020). *Database concepts* (9th ed.). Pearson.

Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7th ed.). McGraw-Hill Education.
