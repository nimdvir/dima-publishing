---
title: "Chapter 11: Database Administration"
chapter: 11
section: "Core Concepts"
description: "Explains how database administration keeps data secure, available, consistent, recoverable, and performant across file-based, server-based, and cloud database environments."
keywords:
  - database administration
  - DBA
  - ACID properties
  - transactions
  - concurrency control
  - locking
  - security
  - role-based access control
  - backup and recovery
  - performance tuning
  - cloud databases
date: 2026-05-18
author: "Nimrod Dvir, PhD"
lang: en-US
toc: true
---

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

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

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

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## What Is Database Administration?

**Database administration** is the discipline of managing databases so that they remain secure, reliable, available, recoverable, and efficient over time.

<!-- Pending figure: figure-11.1-a-dba-ensures-the.png — A DBA ensures the database survives real-world use. — A conceptual illustration showing a DBA monitoring a healthy database system, preventing chaos and data loss. -->


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

<!-- Pending figure: figure-11.2-design-creates-structure-administration.png — Design creates structure; Administration keeps it running. — A split-screen illustration comparing a blueprint (Design) with engine maintenance (Administration). -->


| Question | Design Perspective | Administration Perspective |
|---|---|---|
| What should the database look like? | Entities, tables, keys, relationships | Does the implemented structure remain healthy? |
| How should facts be stored? | Normalization and schema design | Integrity checks and change management |
| How should users get answers? | SQL queries and reporting views | Performance tuning and access control |
| What happens when something fails? | Usually not the design focus | Backup, recovery, logs, and disaster planning |
| Who can access data? | May be specified as a requirement | Implemented through users, roles, and privileges |

A simple way to remember the difference:

> **Design creates the structure. Administration keeps the structure dependable.**

### Data Administration vs. Database Administration

In larger organizations, there is often a distinction between **Data Administration** and **Database Administration**.

<!-- Pending figure: figure-11.3-da-manages-policy-dba.png — DA manages policy; DBA manages operations. — A visual comparing Data Administration (focusing on policy documents and governance) to Database Administration (focusing on servers and technical performance). -->


| Role | Scope | Main Focus | Typical Questions |
|---|---|---|---|
| **Data Administration (DA)** | Organization-wide | Governance, policy, standards, meaning, compliance | What does this data mean? Who owns it? How may it be used? |
| **Database Administration (DBA)** | Specific database systems | Technical reliability, security, recovery, performance | Is the database secure, backed up, available, and efficient? |

**Data Administration** is concerned with the organizational meaning and governance of data. It defines naming standards, data definitions, privacy rules, retention policies, and compliance expectations.

**Database Administration** is concerned with implementation and operations. It manages accounts, permissions, backups, recovery procedures, performance, monitoring, and system maintenance.

In a small organization, one person may perform both roles. In a large organization, they may be separate departments. The distinction matters because data problems are not only technical. They are also policy, governance, and accountability problems.

### The DBA as Guardian of Data Trust

The DBA protects the conditions under which data can be trusted.

<!-- Pending figure: figure-11.4-visualizing-the-dba-as.png — Visualizing The DBA as Guardian of Data Trust. — A diagram or illustration explaining the key concepts of The DBA as Guardian of Data Trust. -->


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

<!-- Pending figure: figure-11.5-the-dba-supports-the.png — The DBA supports the entire data ecosystem. — An organization chart showing how the DBA interacts with Data Engineers, Data Scientists, and Data Analysts. -->


- **Data Engineers** build and maintain the pipelines that move data from operational databases into analytical data warehouses or data lakes.
- **Data Analysts** query the data to produce reports, dashboards, and business insights.
- **Data Scientists** use the data to build predictive models, run experiments, and uncover deep patterns using machine learning.
- **Application Developers** write the code that connects user interfaces to the database.
- **Infrastructure Operators** manage the servers, networks, and cloud environments where the databases run.

The DBA enables all these roles by ensuring the foundational database remains fast, secure, and available.

---

## Core DBA Responsibilities

Although DBA work varies by organization and platform, most responsibilities fall into several major categories.

<!-- Pending figure: figure-11.6-the-five-pillars-of.png — The five pillars of DBA responsibility. — A circular diagram showing the core DBA duties: Security, Concurrency, Backup, Performance, and Maintenance. -->


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

### Security and Access Management

Security ensures that users can do what they need to do, but no more.

<!-- Pending figure: figure-11.7-visualizing-security-and-access.png — Visualizing Security and Access Management. — A diagram or illustration explaining the key concepts of Security and Access Management. -->


In a grading system:

- Students may read their own grades.
- Teaching assistants may enter attendance.
- Instructors may update grades.
- Administrators may manage users and system settings.
- No ordinary user should be able to delete the entire grade table.

A DBA implements those boundaries through authentication, authorization, roles, and privileges.

### Concurrency Control

Concurrency control manages simultaneous access. Databases are shared systems. Multiple users may read and write at the same time. Without coordination, one user's update may overwrite another's work or produce inconsistent results.

<!-- Pending figure: figure-11.8-visualizing-concurrency-control.png — Visualizing Concurrency Control. — A diagram or illustration explaining the key concepts of Concurrency Control. -->


Concurrency control protects the database when many operations overlap.

### Transaction Management

A transaction groups several database operations into one logical unit. Either all of the operations succeed, or none of them do. Transactions are essential when a business action requires multiple related updates.

<!-- Pending figure: figure-11.9-visualizing-transaction-management.png — Visualizing Transaction Management. — A diagram or illustration explaining the key concepts of Transaction Management. -->


For example, updating a grade may also require recording who made the change and when. The update and the audit record should succeed together.

### Backup and Recovery

Backups protect against data loss. Recovery procedures define how the database will be restored after a failure.

<!-- Pending figure: figure-11.10-visualizing-backup-and-recovery.png — Visualizing Backup and Recovery. — A diagram or illustration explaining the key concepts of Backup and Recovery. -->


A backup strategy is not complete until it has been tested. An untested backup is a hope, not a plan.

### Performance Monitoring and Tuning

Performance is the difference between a useful system and an ignored system. A report that takes too long to run may not be used. A gradebook that freezes during updates undermines trust.

<!-- Pending figure: figure-11.11-visualizing-performance-monitoring-and.png — Visualizing Performance Monitoring and Tuning. — A diagram or illustration explaining the key concepts of Performance Monitoring and Tuning. -->


DBAs monitor query speed, indexing, locks, storage, memory, and system load.

### Maintenance and Evolution

Databases change. New reports are requested. New columns are added. Old data is archived. Indexes are rebuilt. Files are compacted. Permissions are reviewed. Maintenance keeps the database healthy as it ages.

<!-- Pending figure: figure-11.12-visualizing-maintenance-and-evolution.png — Visualizing Maintenance and Evolution. — A diagram or illustration explaining the key concepts of Maintenance and Evolution. -->


> **Real-World Example:**  
> An online retailer stores orders, inventory, customers, and payments in PostgreSQL. The DBA team manages nightly backups, monitors slow queries, restricts payment-data access, and creates indexes for high-volume order searches. When a software bug deletes several hundred order rows, the DBA restores the affected data from backup and transaction logs. The business experiences a manageable incident instead of a permanent loss.

---

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Multi-User Databases and Concurrency Control

A database becomes more complicated the moment more than one person or process uses it at the same time.

<!-- Pending figure: figure-11.13-visualizing-multi-user-databases.png — Visualizing Multi-User Databases and Concurrency Control. — A diagram or illustration explaining the key concepts of Multi-User Databases and Concurrency Control. -->


Imagine this grading scenario:

1. Instructor A opens Alice's Quiz 2 grade and changes it from 84 to 90.
2. Instructor B opens the same grade before A saves the change.
3. Instructor B changes the grade from 84 to 88.
4. Both save their work.

Which grade should remain: 90 or 88?

Without concurrency control, one update may overwrite the other. This is called a **lost update**.

### Common Concurrency Problems

When operations overlap, several read and write anomalies can occur:

<!-- Pending figure: figure-11.14-without-concurrency-control-updates.png — Without concurrency control, updates can be lost. — A diagram illustrating a lost update: two users read the same value, both update it, and the last write overwrites the first. -->


| Problem | What Happens | Example |
|---|---|---|
| **Lost update** | One user's change overwrites another user's change. | Two instructors edit the same grade simultaneously. |
| **Dirty read** | A user reads uncommitted data that may later be rolled back. | A report includes a provisional grade before the update is finalized. |
| **Nonrepeatable read** | A user reads the same row twice during a transaction and gets different results. | An instructor checks a score, but it changes before they finish their review. |
| **Phantom read** | A query rerun returns new rows inserted by another transaction. | A new grade appears mid-calculation during a class average report. |

These problems occur because database operations overlap in time.

### Cursors

A **cursor** is a database mechanism that acts as a pointer to a specific row within a query result set. When an application needs to process rows one by one instead of as a single batch, it uses a cursor. 

<!-- Pending figure: figure-11.15-a-cursor-processes-one.png — A cursor processes one row at a time. — A visual representation of a query result set with a pointer (cursor) highlighting one specific row as the active record. -->


Different cursor types handle concurrency differently:
- **Static cursors** take a snapshot of the data. If another user changes the data while the cursor is open, the static cursor does not see the change.
- **Dynamic cursors** reflect all changes made to the rows in the result set as you scroll through them.
- **Keyset cursors** fix the membership of the result set when opened, but detect changes to the values of those existing rows.

Holding cursors open while waiting for user input can severely degrade concurrency by keeping locks active too long.

### Locks

A **lock** is a temporary control that prevents conflicting access to data.

<!-- Pending figure: figure-11.16-locks-prevent-conflicting-modifications.png — Locks prevent conflicting modifications. — An illustration of a padlock on a specific database table row, preventing a second user from modifying it while the first user is active. -->


| Lock Type | Purpose | Example |
|---|---|---|
| Shared lock | Allows reading while preventing conflicting writes | Several users view the same grade report |
| Exclusive lock | Allows one transaction to modify data while blocking conflicting access | One instructor updates a grade |

### Lock Granularity

Locks may apply at different levels.

<!-- Pending figure: figure-11.17-finer-granularity-increases-concurrency.png — Finer granularity increases concurrency but requires more overhead. — A visual comparing different lock levels: a padlock on an entire database, a padlock on a table, and a padlock on a single row. -->


| Granularity | Meaning | Advantage | Disadvantage |
|---|---|---|---|
| Row-level lock | Locks only selected rows | High concurrency | More overhead |
| Page-level lock | Locks a storage page containing multiple rows | Balanced overhead | May block unrelated rows |
| Table-level lock | Locks an entire table | Simpler | Reduces concurrency |
| Database-level lock | Locks the whole database | Safe for major maintenance | Blocks most activity |

A file-based database may use broader locks. A server-based DBMS usually supports finer-grained locking.

### Pessimistic and Optimistic Locking

DBMSs and applications generally manage conflicts using one of two strategies.

<!-- Pending figure: figure-11.18-visualizing-pessimistic-and-optimistic.png — Visualizing Pessimistic and Optimistic Locking. — A diagram or illustration explaining the key concepts of Pessimistic and Optimistic Locking. -->


| Strategy | Assumption | How It Works | Best For |
|---|---|---|---|
| **Pessimistic locking** | Conflicts are likely | Lock data before editing | Banking, inventory, high-risk updates |
| **Optimistic locking** | Conflicts are rare | Allow edits, then check for conflicts before saving | Read-heavy systems, low-conflict environments |

In a grading database, pessimistic locking might be appropriate if several instructors often edit the same records. Optimistic locking might be acceptable if grade edits are rare and usually performed by one instructor.

### Two-Phase Locking

**Two-Phase Locking (2PL)** is a protocol that helps ensure transactions behave correctly under concurrency.

<!-- Pending figure: figure-11.19-2pl-ensures-serializable-transactions.png — 2PL ensures serializable transactions. — A line graph showing the Two-Phase Locking protocol: a growing phase where locks are acquired, and a shrinking phase where locks are released. -->


It has two phases:

1. **Growing phase:** the transaction acquires locks but cannot release any.
2. **Shrinking phase:** the transaction releases locks but cannot acquire any new ones.

Once a transaction enters the shrinking phase and starts releasing locks, it can no longer lock new data. This disciplined rule helps guarantee **serializability**, meaning that even if transactions run at the same time, the final result is equivalent to some safe sequential order.

### Deadlocks

A **deadlock** occurs when two or more transactions wait for each other indefinitely.

<!-- Pending figure: figure-11.20-deadlocks-occur-when-two.png — Deadlocks occur when two transactions wait indefinitely for each other. — A diagram showing User A holding Lock 1 and waiting for Lock 2, while User B holds Lock 2 and waits for Lock 1, creating a circular wait. -->


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

## Transactions and ACID Reliability

Concurrency control manages simultaneous users. Transactions manage reliability when operations succeed, fail, or partially complete.

<!-- Pending figure: figure-11.21-visualizing-transactions-and-acid.png — Visualizing Transactions and ACID Reliability. — A diagram or illustration explaining the key concepts of Transactions and ACID Reliability. -->


A **transaction** is a logical unit of work made of one or more database operations. The database treats the group as one all-or-nothing action.

### Why Transactions Matter

Suppose an instructor updates a grade and records an audit entry.

<!-- Pending figure: figure-11.22-transactions-ensure-operations-complete.png — Transactions ensure operations complete entirely or not at all. — A sequence diagram showing an incomplete transaction (money deducted from Account A but not added to Account B) causing inconsistent data. -->


```text
Step 1: Update STUDENT_GRADE.
Step 2: Insert a row into GRADE_AUDIT.
```

If Step 1 succeeds and Step 2 fails, the grade changes but there is no record of who changed it. If Step 2 succeeds and Step 1 fails, the audit log claims a change occurred when it did not. Both outcomes are bad.

A transaction ensures that the two operations succeed or fail together.

### Transaction Control Commands

Most relational DBMSs support three core transaction commands:

<!-- Pending figure: figure-11.23-commit-saves-changes-rollback.png — COMMIT saves changes; ROLLBACK discards them. — A flowchart showing BEGIN, followed by SQL operations, ending in either a COMMIT (saving) or ROLLBACK (undoing). -->


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

### The ACID Properties

Reliable transactions are governed by the **ACID** properties.

<!-- Pending figure: figure-11.24-acid-guarantees-reliable-transactions.png — ACID guarantees reliable transactions. — A quadrant graphic summarizing the four ACID properties: Atomicity, Consistency, Isolation, and Durability. -->


| Property | Meaning | Grading Database Example |
|---|---|---|
| **Atomicity** | All operations succeed or none do | Grade update and audit insert happen together |
| **Consistency** | Rules remain valid before and after | Score must remain between 0 and 100 |
| **Isolation** | Concurrent transactions do not interfere | Two instructors cannot corrupt the same grade |
| **Durability** | Committed changes survive failure | Saved grade remains after a crash |

### Atomicity

Atomicity means **all or nothing**. If a transaction has five steps, the database does not keep only the first three if Step 4 fails. It rolls the entire transaction back.

<!-- Pending figure: figure-11.25-atomicity-all-steps-succeed.png — Atomicity: all steps succeed, or all fail. — An illustration of an 'all-or-nothing' concept: either all steps of a process light up green, or they all revert to empty. -->


### Consistency

Consistency means that a transaction moves the database from one valid state to another. It cannot violate constraints such as:

<!-- Pending figure: figure-11.26-visualizing-consistency.png — Visualizing Consistency. — A diagram or illustration explaining the key concepts of Consistency. -->


- primary key uniqueness,
- valid foreign keys,
- `NOT NULL` rules,
- score-range rules,
- business constraints.

For example, a transaction should not insert a grade for a nonexistent student.

### Isolation

Isolation means that each transaction behaves as if it were running alone, even when many transactions are active. Different DBMSs offer different isolation levels, but the purpose is always the same: prevent one transaction from seeing or disrupting unsafe intermediate states.

<!-- Pending figure: figure-11.27-isolation-hides-uncommitted-changes.png — Isolation hides uncommitted changes from other users. — An illustration showing two separate, shielded transaction tunnels operating independently on a database. -->


### Durability

Durability means that once a transaction is committed, the change survives system failure. If the database confirms that a grade update was saved, the grade should still be there after a restart.

<!-- Pending figure: figure-11.28-committed-data-survives-system.png — Committed data survives system failures. — An illustration of a server experiencing a power outage, but the committed data remains safely stored on a hard drive. -->


> **Real-World Example:**  
> In banking, transferring money requires decreasing one account balance and increasing another. If the debit succeeds but the credit fails, money disappears. If the credit succeeds but the debit fails, money appears. Transactions prevent both failures by treating the transfer as one unit of work.

---

## Database Security

Database security ensures that data is protected from unauthorized access, unauthorized modification, accidental damage, and unnecessary exposure.

<!-- Pending figure: figure-11.29-visualizing-database-security.png — Visualizing Database Security. — A diagram or illustration explaining the key concepts of Database Security. -->


Security is not only about hackers. Many security problems come from ordinary users having more privileges than they need.

### The CIA Triad

Database security is often described through the **CIA triad**.

<!-- Pending figure: figure-11.30-the-cia-triad-defines.png — The CIA triad defines core security goals. — A triangle diagram showing Confidentiality, Integrity, and Availability. -->


| Goal | Meaning | Grading Database Example |
|---|---|---|
| **Confidentiality** | Only authorized users can access sensitive data | Students cannot see other students' grades |
| **Integrity** | Data remains accurate and protected from unauthorized change | Only instructors can update grades |
| **Availability** | Authorized users can access the database when needed | Grade reports are available before advising |

Security must balance all three. A database that is perfectly confidential but unavailable is not useful. A database that is highly available but exposes private data is dangerous.

### Authentication and Authorization

Security begins with two questions.

<!-- Pending figure: figure-11.31-visualizing-authentication-and-authorization.png — Visualizing Authentication and Authorization. — A diagram or illustration explaining the key concepts of Authentication and Authorization. -->


| Concept | Question | Example |
|---|---|---|
| **Authentication** | Who are you? | User logs in with credentials |
| **Authorization** | What are you allowed to do? | Instructor can update grades; student cannot |

A user may be authenticated but still not authorized to perform a specific action.

### Roles and Privileges

Professional databases usually use **role-based access control (RBAC)**.

<!-- Pending figure: figure-11.32-roles-simplify-permission-management.png — Roles simplify permission management. — A diagram showing individual users assigned to roles (like 'Instructor' or 'Student'), and roles being granted specific privileges on tables. -->


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

### Least Privilege

The **principle of least privilege** says that users should receive only the permissions required to do their work.

<!-- Pending figure: figure-11.33-users-receive-only-the.png — Users receive only the access they strictly need. — An illustration of a user passing through a restricted access gate with a badge that only allows entry to specific required rooms. -->


This principle protects against both malicious misuse and honest mistakes. A teaching assistant who does not need to delete grades should not have `DELETE` privileges on `STUDENT_GRADE`.

### Example: Role-Based Permissions

In PostgreSQL-style SQL, permissions may look like this:

<!-- Pending figure: figure-11.34-visualizing-example-role-based.png — Visualizing Example: Role-Based Permissions. — A diagram or illustration explaining the key concepts of Example: Role-Based Permissions. -->


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

<!-- Pending figure: figure-11.35-visualizing-views-as-security.png — Visualizing Views as Security Layers. — A diagram or illustration explaining the key concepts of Views as Security Layers. -->


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

<!-- Pending figure: figure-11.36-sql-injection-tricks-the.png — SQL injection tricks the database into running malicious commands. — An illustration of a web form where an attacker enters 'DROP TABLE users' hidden in a name field, showing how untrusted input can execute as code. -->


Unsafe pattern:

```text
"SELECT * FROM STUDENT WHERE Email = '" + user_input + "';"
```

If user input is inserted directly into SQL text, malicious input can alter the query.

The safer approach is to use **parameterized queries**, where user input is treated as data rather than executable SQL.

> **Important:** SQL injection is one of the most preventable database attacks. Never build SQL commands by directly concatenating untrusted user input.

### Security as a Continuous Process

Security is not finished after accounts are created. DBAs must regularly:

<!-- Pending figure: figure-11.37-visualizing-security-as-a.png — Visualizing Security as a Continuous Process. — A diagram or illustration explaining the key concepts of Security as a Continuous Process. -->


- remove inactive users,
- rotate or manage credentials,
- review permissions,
- audit access logs,
- patch DBMS software,
- enforce encryption where appropriate,
- monitor suspicious activity.

> **Key Takeaway:** Database security is the disciplined management of identity, permissions, exposure, and accountability.

---

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Backup and Recovery

Backup and recovery planning answers one of the most important operational questions:

<!-- Pending figure: figure-11.38-visualizing-backup-and-recovery.png — Visualizing Backup and Recovery. — A diagram or illustration explaining the key concepts of Backup and Recovery. -->


> **What will we do when something goes wrong?**

Not if. When.

Failures can come from hardware, software, human error, cyberattacks, cloud outages, accidental deletes, corrupted files, or natural disasters.

### Backup Types

| Backup Type | What It Stores | Advantage | Disadvantage |
|---|---|---|---|
| **Full backup** | Complete database copy | Easiest to restore | Takes the most time and storage |
| **Incremental backup** | Changes since the last backup of any type | Efficient storage | Slower restore; multiple files needed |
| **Differential backup** | Changes since the last full backup | Faster restore than incremental | Grows larger until next full backup |

<!-- Pending figure: figure-11.39-comparing-backup-strategies.png — Comparing backup strategies. — A timeline graphic comparing Full backups (large, infrequent) with Incremental (small, frequent) and Differential backups. -->


A common strategy combines periodic full backups with more frequent incremental or differential backups.

### Recovery Objectives: RPO and RTO

Two practical concepts guide recovery planning.

<!-- Pending figure: figure-11.40-rpo-and-rto-guide.png — RPO and RTO guide recovery planning. — A timeline showing a disaster event. RPO measures maximum acceptable data loss (time backwards); RTO measures maximum acceptable downtime (time forwards). -->


| Term | Meaning | Question |
|---|---|---|
| **Recovery Point Objective (RPO)** | Maximum acceptable data loss | How much data can we afford to lose? |
| **Recovery Time Objective (RTO)** | Maximum acceptable downtime | How quickly must we recover? |

For a personal practice database, losing one day of work may be acceptable. For a payroll database, losing one day may be unacceptable. For a hospital system, even a few minutes of downtime may be dangerous.

### Recovery Logs

A **recovery log** records changes made to the database. Logs allow the system to undo or redo operations during recovery.

<!-- Pending figure: figure-11.41-logs-record-changes-to.png — Logs record changes to enable recovery. — An illustration of a transaction log acting like a flight recorder, sequentially recording every INSERT, UPDATE, and DELETE. -->


| Log Record | Meaning | Used For |
|---|---|---|
| Before-image | Value before the change | Rollback |
| After-image | Value after the change | Rollforward |

### Rollback and Rollforward

| Technique | What It Does | Example |
|---|---|---|
| **Rollback** | Undoes incomplete or incorrect transactions | Undo a failed grade update |
| **Rollforward** | Restores a backup, then reapplies logged changes | Restore Monday backup and replay Tuesday transactions |

<!-- Pending figure: figure-11.42-rollback-undoes-rollforward-rebuilds.png — Rollback undoes; Rollforward rebuilds. — A visual comparing Rollback (rewinding an action) to Rollforward (replaying logs to rebuild a lost state). -->


Rollback is like pressing undo. Rollforward is like restoring an older version and replaying everything valid that happened after it.

### Disaster Recovery Planning

A backup file alone is not a disaster recovery plan. A recovery plan should define:

<!-- Pending figure: figure-11.43-a-backup-file-is.png — A backup file is only part of a full DR plan. — A checklist graphic showing a comprehensive Disaster Recovery Plan covering backups, offsite storage, and team roles. -->


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

<!-- Pending figure: figure-11.44-visualizing-file-based-backup.png — Visualizing File-Based Backup Example. — A diagram or illustration explaining the key concepts of File-Based Backup Example. -->


Example naming convention:

```text
GradingDB_backup_2026-05-18_1400.accdb
grading_backup_2026-05-18_1400.sqlite
```

A timestamped naming convention makes it easier to identify recovery points.

### SQLite Backup and Journal Modes

SQLite supports explicit backup and journal mechanisms.

<!-- Pending figure: figure-11.45-visualizing-sqlite-backup-and.png — Visualizing SQLite Backup and Journal Modes. — A diagram or illustration explaining the key concepts of SQLite Backup and Journal Modes. -->


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

<!-- Pending figure: figure-11.46-visualizing-cloud-backup-considerations.png — Visualizing Cloud Backup Considerations. — A diagram or illustration explaining the key concepts of Cloud Backup Considerations. -->


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

<!-- Pending figure: figure-11.47-recovery-in-action.png — Recovery in action. — A comic-style storyboard showing an instructor updating grades, a system crash, and the DBA restoring the database using a backup and rollforward logs. -->


1. **The Mistake:** An exhausted teaching assistant intends to delete one duplicate grade row. Because their role was mistakenly granted broad `DELETE` privileges instead of least privilege, they run a delete query without a `WHERE` clause.
2. **The Damage:** All 4,000 grades for the semester are deleted. Because this was a single atomic transaction, it succeeds completely. The data is gone.
3. **The Panic:** The instructor cannot see any grades.
4. **The Recovery:** The DBA is called. They check the **recovery log** and see the massive delete transaction. They initiate a **restore** using last night's full backup. They then **rollforward** the logs, replaying all valid transactions that happened this morning—stopping exactly one second before the TA's destructive command.
5. **The Aftermath:** The grades are restored. The DBA reviews the TA role, revokes the broad `DELETE` permission, and enforces least privilege.

This is why DBA work is a continuous cycle of protection, response, and improvement.

> **Key Takeaway:** DBA disciplines act together. Access control reduces the risk of accidents, transactions ensure the accident is a clean boundary, and recovery restores the system to a valid state.

---

## Performance Monitoring and Tuning

Performance tuning is the work of keeping the database responsive as usage grows.

<!-- Pending figure: figure-11.48-visualizing-performance-monitoring-and.png — Visualizing Performance Monitoring and Tuning. — A diagram or illustration explaining the key concepts of Performance Monitoring and Tuning. -->


A query that runs instantly on 50 rows may become slow on 5 million rows. A report that works for one instructor may fail when used by 400 users. Performance issues often appear gradually, which means DBAs must monitor proactively.

### Common Performance Problems

| Problem | Cause | Possible DBA Response |
|---|---|---|
| Slow filters | Missing index | Create index on filtered column |
| Slow joins | Missing index on foreign key | Index join columns |
| Long-running reports | Inefficient query or too much aggregation | Create view, summary table, or optimized query |
| Lock waits | Transactions hold locks too long | Shorten transactions, tune queries |
| Storage growth | Tables/logs/indexes expanding | Archive data, compact, plan capacity |
| High cloud cost | Inefficient queries or over-provisioning | Optimize queries, right-size resources |

<!-- Pending figure: figure-11.49-monitoring-identifies-performance-bottlenecks.png — Monitoring identifies performance bottlenecks. — A dashboard showing slow queries, high CPU usage, and lock waits. -->


### Indexes

An **index** is a data structure that helps the DBMS find rows faster.

<!-- Pending figure: figure-11.50-indexes-speed-up-data.png — Indexes speed up data retrieval. — A visual comparison between scanning a full book chapter page-by-page versus jumping directly to the correct page using the index at the back of the book. -->


Without an index, the DBMS may scan every row in a table. With an index, it can jump more directly to matching rows.

Example:

```sql
CREATE INDEX idx_student_grade_student
ON STUDENT_GRADE(StudentID);
```

This index can speed up queries that filter or join on `StudentID`.

### Index Trade-Offs

Indexes are not free.

<!-- Pending figure: figure-11.51-visualizing-index-trade-offs.png — Visualizing Index Trade-Offs. — A diagram or illustration explaining the key concepts of Index Trade-Offs. -->


| Benefit | Cost |
|---|---|
| Faster reads | Slower inserts, updates, and deletes |
| Faster joins | More storage |
| Faster filters and sorting | More maintenance overhead |

A DBA should avoid indexing every column just because indexes sound useful. Indexes are design decisions.

### The Handoff to Advanced Hardening

This chapter covers the foundations of database administration: managing concurrency, ensuring recoverability, and applying basic performance concepts like indexes. However, as systems scale, DBAs must dive much deeper into technical optimization.

In **Chapter 13**, you will explore advanced database hardening. That chapter dives into reading detailed query plans (like `EXPLAIN`), advanced index optimization, and deep security configurations necessary for enterprise-scale deployments. For now, understand that performance tuning is a continuous process of measurement and adjustment.

### Performance and Query Design

Some performance problems are not caused by the DBMS. They are caused by poor query logic.

<!-- Pending figure: figure-11.52-visualizing-performance-and-query.png — Visualizing Performance and Query Design. — A diagram or illustration explaining the key concepts of Performance and Query Design. -->


Common issues include:

- joining more tables than necessary,
- filtering after aggregation when filtering could happen earlier,
- using functions on indexed columns in ways that prevent index use,
- returning `SELECT *` when only a few columns are needed,
- running large reports during peak transactional use.

### Performance and Business Impact

Performance is not only technical. It affects behavior.

<!-- Pending figure: figure-11.53-visualizing-performance-and-business.png — Visualizing Performance and Business Impact. — A diagram or illustration explaining the key concepts of Performance and Business Impact. -->


If grade reports take too long, instructors may export data into spreadsheets and create unofficial copies. If dashboards are slow, managers may stop using them. If registration systems slow down under load, students lose trust.

> **Key Takeaway:** Performance tuning supports both technical efficiency and organizational confidence.

---

## Maintenance and Database Evolution

Databases are living systems. Once deployed, they continue to grow, change, and age.

<!-- Pending figure: figure-11.54-visualizing-maintenance-and-database.png — Visualizing Maintenance and Database Evolution. — A diagram or illustration explaining the key concepts of Maintenance and Database Evolution. -->


### Routine Maintenance Tasks

| Task | Purpose | Example |
|---|---|---|
| Integrity checks | Detect corruption or invalid structure | `PRAGMA integrity_check;` in SQLite |
| Reindexing | Rebuild index structures | `REINDEX;` |
| Compaction | Reclaim unused file space | Access Compact and Repair; SQLite `VACUUM;` |
| Log monitoring | Manage log growth and detect issues | Review transaction logs |
| Permission review | Remove unnecessary access | Disable old accounts |
| Backup testing | Verify recoverability | Restore backup to test environment |
| Schema documentation | Preserve institutional knowledge | Update ERDs and data dictionaries |

<!-- Pending figure: figure-11.55-databases-require-ongoing-maintenance.png — Databases require ongoing maintenance. — An illustration of a DBA performing routine tasks like reindexing, compaction, and permission review. -->


SQLite examples:

```sql
PRAGMA integrity_check;
REINDEX;
VACUUM;
```

### Schema Changes

No schema remains perfect forever. New requirements emerge:

<!-- Pending figure: figure-11.56-schemas-evolve-as-business.png — Schemas evolve as business needs change. — A diagram showing a schema evolution from Version 1 (simple table) to Version 2 (added columns and constraints). -->


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

<!-- Pending figure: figure-11.57-formal-processes-protect-production.png — Formal processes protect production databases. — A workflow diagram showing the change management process: Request -> Review -> Test -> Approve -> Deploy. -->


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

<!-- Pending figure: figure-11.58-visualizing-documentation.png — Visualizing Documentation. — A diagram or illustration explaining the key concepts of Documentation. -->


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

## DBA Work Across Platforms

The principles of database administration are stable, but the implementation differs across platforms.

<!-- Pending figure: figure-11.59-visualizing-dba-work-across.png — Visualizing DBA Work Across Platforms. — A diagram or illustration explaining the key concepts of DBA Work Across Platforms. -->


### Microsoft Access

Microsoft Access is file-based and visual. It is useful for learning and small-team systems.

<!-- Pending figure: figure-11.60-visualizing-microsoft-access.png — Visualizing Microsoft Access. — A diagram or illustration explaining the key concepts of Microsoft Access. -->


| DBA Area | Access Reality |
|---|---|
| Security | Mostly file permissions and application/front-end design |
| Backups | Copy `.accdb` file carefully |
| Maintenance | Compact and Repair |
| Relationships | Visual Relationships window |
| Concurrency | Limited compared with server DBMSs |
| Best use | Education, prototypes, small departmental tools |

Access makes many concepts visible. Students can see relationships, referential integrity, forms, queries, and reports in one environment.

### SQLite

SQLite is lightweight, serverless, and file-based. The database is a single file, but the engine is powerful and widely used.

<!-- Pending figure: figure-11.61-visualizing-sqlite.png — Visualizing SQLite. — A diagram or illustration explaining the key concepts of SQLite. -->


| DBA Area | SQLite Reality |
|---|---|
| Security | Mostly file-system and application-level |
| Backups | File copy or `.backup` command |
| Integrity | `PRAGMA integrity_check;` |
| Foreign keys | Must be enabled with `PRAGMA foreign_keys = ON;` |
| Concurrency | Many readers; limited writers; WAL improves behavior |
| Best use | Learning, embedded systems, mobile apps, local analytics |

SQLite teaches an important lesson: simple deployment does not eliminate responsibility.

### PostgreSQL

PostgreSQL is a server-based, enterprise-grade relational DBMS.

<!-- Pending figure: figure-11.62-visualizing-postgresql.png — Visualizing PostgreSQL. — A diagram or illustration explaining the key concepts of PostgreSQL. -->


| DBA Area | PostgreSQL Reality |
|---|---|
| Security | Users, roles, privileges, schemas, row-level security |
| Backups | Logical backups, physical backups, point-in-time recovery |
| Transactions | Full ACID support |
| Concurrency | MVCC and advanced isolation |
| Performance | Indexes, query planner, vacuuming, monitoring |
| Best use | Production systems, analytics, multi-user applications |

PostgreSQL exposes many professional DBA concepts directly.

### Supabase and Cloud Databases

Supabase is a managed platform built on PostgreSQL. It provides database hosting, authentication, APIs, and administrative tools.

<!-- Pending figure: figure-11.63-visualizing-supabase-and-cloud.png — Visualizing Supabase and Cloud Databases. — A diagram or illustration explaining the key concepts of Supabase and Cloud Databases. -->


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

### Platform Comparison

| Platform | Strength | Limitation | Main DBA Lesson |
|---|---|---|---|
| Access | Visual, approachable | Limited concurrency and security | Administration can be visible and local |
| SQLite | Simple, portable, real SQL | Limited built-in user security | File-based systems still require discipline |
| PostgreSQL | Powerful, scalable, secure | More complex | Professional DBMSs require active management |
| Supabase | Managed PostgreSQL in the cloud | Shared responsibility can be misunderstood | Cloud DBAs still govern data and access |

<!-- Pending figure: figure-11.64-comparing-database-platforms-by.png — Comparing database platforms by use case. — A quadrant chart mapping Access, SQLite, PostgreSQL, and Supabase by complexity and deployment scale. -->


---

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Common DBA Mistakes


<!-- Pending figure: figure-11.65-visualizing-common-dba-mistakes.png — Visualizing Common DBA Mistakes. — A diagram or illustration explaining the key concepts of Common DBA Mistakes. -->

### Mistake 1: Assuming Backups Work Without Testing

A backup is useful only if it can be restored. Test restores should be scheduled.

<!-- Pending figure: figure-11.66-visualizing-mistake-1-assuming.png — Visualizing Mistake 1: Assuming Backups Work Without Testing. — A diagram or illustration explaining the key concepts of Mistake 1: Assuming Backups Work Without Testing. -->


### Mistake 2: Giving Users Too Much Access

Excessive permissions are convenient until someone deletes, exports, or modifies data they should never have touched.

<!-- Pending figure: figure-11.67-visualizing-mistake-2-giving.png — Visualizing Mistake 2: Giving Users Too Much Access. — A diagram or illustration explaining the key concepts of Mistake 2: Giving Users Too Much Access. -->


### Mistake 3: Treating Security as an Application-Only Problem

The database itself should enforce security where possible. Application controls are important, but they should not be the only defense.

<!-- Pending figure: figure-11.68-visualizing-mistake-3-treating.png — Visualizing Mistake 3: Treating Security as an Application-Only Problem. — A diagram or illustration explaining the key concepts of Mistake 3: Treating Security as an Application-Only Problem. -->


### Mistake 4: Ignoring Slow Queries Until Users Complain

Performance problems are easier to fix before they become emergencies. Monitoring is cheaper than crisis response.

<!-- Pending figure: figure-11.69-visualizing-mistake-4-ignoring.png — Visualizing Mistake 4: Ignoring Slow Queries Until Users Complain. — A diagram or illustration explaining the key concepts of Mistake 4: Ignoring Slow Queries Until Users Complain. -->


### Mistake 5: Indexing Everything

Indexes speed up reads but slow down writes and consume storage. They should be chosen intentionally.

<!-- Pending figure: figure-11.70-visualizing-mistake-5-indexing.png — Visualizing Mistake 5: Indexing Everything. — A diagram or illustration explaining the key concepts of Mistake 5: Indexing Everything. -->


### Mistake 6: Using Cascade Delete Casually

Cascade delete can erase large amounts of related data automatically. It should be used only when the business rule clearly supports it.

<!-- Pending figure: figure-11.71-visualizing-mistake-6-using.png — Visualizing Mistake 6: Using Cascade Delete Casually. — A diagram or illustration explaining the key concepts of Mistake 6: Using Cascade Delete Casually. -->


### Mistake 7: Making Unrecorded Schema Changes

Changes without documentation become future confusion. Every schema change should be recorded and justified.

<!-- Pending figure: figure-11.72-visualizing-mistake-7-making.png — Visualizing Mistake 7: Making Unrecorded Schema Changes. — A diagram or illustration explaining the key concepts of Mistake 7: Making Unrecorded Schema Changes. -->


### Mistake 8: Assuming the Cloud Handles Everything

Cloud platforms handle infrastructure. They do not automatically fix bad permissions, bad schemas, bad queries, or bad governance.

<!-- Pending figure: figure-11.73-visualizing-mistake-8-assuming.png — Visualizing Mistake 8: Assuming the Cloud Handles Everything. — A diagram or illustration explaining the key concepts of Mistake 8: Assuming the Cloud Handles Everything. -->


---

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Key Concepts

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

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Chapter Summary

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

## References

Connolly, T. M., & Begg, C. E. (2015). *Database systems: A practical approach to design, implementation, and management* (6th ed.). Pearson.

Coronel, C., & Morris, S. (2019). *Database systems: Design, implementation, & management* (13th ed.). Cengage Learning.

Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7th ed.). Pearson.

Hoffer, J. A., Venkataraman, R., & Topi, H. (2019). *Modern database management* (13th ed.). Pearson.

Kroenke, D. M., & Auer, D. J. (2020). *Database concepts* (9th ed.). Pearson.

Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7th ed.). McGraw-Hill Education.
