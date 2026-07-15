---
title: "Chapter 11: Database Administration and Advanced Database Techniques"
chapter: 11
section: "Core Concepts"
description: "Explains how database administration protects security, integrity, availability, recoverability, and performance, then introduces indexes, constraints, views, triggers, macros, and stored routines."
keywords:
  - database administration
  - DBA
  - least privilege
  - concurrency control
  - transactions
  - ACID
  - backup and recovery
  - RPO
  - RTO
  - indexes
  - query plans
  - constraints
  - views
  - triggers
  - data macros
  - stored procedures
date: 2026-07-12
author: "Nimrod Dvir, PhD"
lang: en-US
toc: true
---

# Chapter 11: Database Administration and Advanced Database Techniques

*From queries that are correct to systems that remain reliable*

A database can be designed correctly, normalized carefully, and queried with excellent SQL. It can still fail the organization that depends on it.

Imagine that two instructors update the same grade at the same time. One change silently overwrites the other. A teaching assistant receives permission to view grades and accidentally gains permission to delete the grade table. A laptop containing the only copy of an Access database stops working. A report that once ran instantly now takes several minutes because the table has grown to millions of rows. None of these problems is mainly about writing a better `SELECT` statement.

They are administration problems.

![Figure 11.1: Database administration protects the conditions that make organizational data trustworthy — security, integrity, availability, recoverability, and performance.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.1-dba-overview)

**Database administration** is the work of keeping a database secure, accurate, available, recoverable, and efficient throughout its life. It begins after design, but it also reaches backward into design decisions. A database that cannot be backed up, monitored, secured, or changed safely is not ready for serious use.

This chapter has two parts. Part A focuses on protecting the database through security, concurrency control, transactions, backup, and recovery. Part B focuses on making the database work harder through indexes, query plans, constraints, views, triggers, macros, and stored routines. Together, these practices move the course from writing correct queries to operating reliable information systems.

## Learning Objectives

After completing this chapter, you should be able to:

1. explain the role of a database administrator and distinguish database administration from data administration;
2. describe how security, availability, integrity, performance, capacity, and change management support business continuity;
3. explain authentication, authorization, roles, privileges, and least privilege;
4. analyze common concurrency problems, including lost updates, inconsistent reads, and deadlocks;
5. explain ACID properties and use `BEGIN`, `COMMIT`, and `ROLLBACK` to protect a multi-step operation;
6. compare backup approaches and explain recovery point objectives, recovery time objectives, rollback, and rollforward;
7. create an index and interpret a simple query plan;
8. apply constraints, views, and automation to improve data quality, security, and reporting;
9. distinguish triggers, Access macros, data macros, stored procedures, and functions; and
10. audit a database using a practical security, continuity, integrity, and performance checklist.

## Chapter Roadmap

<div class="video-container">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/1QX02C7xBYk" title="Ch 11 - DB Administration (5:35)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

*Chapter 11 overview video (5:35) — a quick orientation before you read.*

| Part | Main Question | Core Ideas |
|---|---|---|
| Part A | How do we protect a database that people depend on? | DBA role, security, concurrency, ACID transactions, backup, recovery, continuity |
| Part B | How do we make the database enforce rules and perform work more effectively? | Indexes, query plans, constraints, views, triggers, macros, stored routines |
| Practice | How do we evaluate whether a database is ready for real use? | Platform comparison, common mistakes, administrative checklist |

---

## Part A: Protecting the Database

<!-- PAGE BREAK -->

### 11.1 What Is Database Administration?

![Figure 11.2: A database administrator ensures the database survives real-world use through security, availability, integrity, and recoverability.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.2-dba-role)

Database administration is the business and technical function of managing a database so that it continues to create value while remaining protected and available. The work includes far more than installing software or creating user accounts. A database administrator must protect the conditions that make data trustworthy (Dvir, 2021; Kroenke et al., 2020; Mullins, 2002).

Those conditions include:

- **confidentiality:** sensitive data is visible only to authorized people;
- **integrity:** records remain correct, complete, and consistent;
- **availability:** authorized users can access the system when they need it;
- **recoverability:** data can be restored after failure or error;
- **performance:** queries and transactions complete within an acceptable time;
- **accountability:** important actions can be traced to users, processes, and times; and
- **evolution:** the database can change without creating uncontrolled risk.

The person responsible for these outcomes is commonly called a **database administrator**, or **DBA**. In a small organization, one employee may combine DBA, developer, analyst, and IT support duties. In a larger organization, database administration may be divided among platform DBAs, cloud engineers, security teams, data engineers, and application teams. The job title may change, but the responsibilities remain.

Microsoft describes the DBA as an operational data professional responsible for access, security, backup, high availability, and restoration after failure. The DBA works with data engineers, analysts, developers, and infrastructure operators because all of them depend on a stable data foundation (Microsoft, n.d.).

> **💡 Key takeaway: Design creates the structure; administration protects the promise**
> A schema shows how data should be organized. Administration makes sure the system remains secure, correct, available, and useful after real users and real failures arrive.

### 11.2 Data Administration and Database Administration

![Figure 11.3: Data administration governs meaning, ownership, and policy; database administration implements security, availability, and recovery.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.3-data-vs-database-admin)

The terms **data administration** and **database administration** are sometimes used as synonyms. A useful distinction separates organization-wide governance from system-specific operations.

| Area | Data Administration | Database Administration |
|---|---|---|
| Scope | The organization and its data assets | A database, DBMS, or database platform |
| Main concern | Meaning, ownership, policy, quality, privacy, retention | Security enforcement, availability, recovery, performance, maintenance |
| Typical questions | What does this field mean? Who owns it? How long may it be kept? | Who can access this table? Is the backup valid? Why is the query slow? |
| Common outputs | Data standards, dictionaries, governance policies, stewardship assignments | Roles, backup schedules, monitoring rules, indexes, recovery procedures |

**Data administration** asks whether the organization is managing data responsibly. It deals with shared definitions, metadata, ownership, acceptable use, privacy, retention, and data quality standards.

**Database administration** turns many of those policies into technical controls. If a policy says that only instructors may change grades, the DBA helps implement the roles, permissions, views, application rules, and audit records that enforce the policy.

The boundary is not perfect. A permission decision may involve legal policy, business ownership, and DBMS configuration at the same time. Mature organizations therefore treat governance and operations as connected functions rather than separate worlds.

### 11.3 Core DBA Responsibilities

![Figure 11.4: The core DBA responsibilities — security, concurrency, transactions, backup, performance, capacity, change management, and documentation — are interconnected.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.4-dba-responsibilities)

The classic administration responsibilities can be organized into eight connected areas.

| Responsibility | What It Protects | Grading Database Example |
|---|---|---|
| Security and access control | Confidentiality and integrity | Graders can update scores but cannot change table structures |
| Concurrency control | Correctness during simultaneous use | Two users cannot silently overwrite the same grade |
| Transaction management | Reliability of multi-step work | A grade update and its audit record succeed or fail together |
| Backup and recovery | Survival after failure | Restore records after accidental deletion or file corruption |
| Performance management | Timely access and usable reports | Index `StudentID` for student-level grade reports |
| Capacity and availability planning | Continued operation as demand grows | Plan for more sections, users, submissions, logs, and dashboards |
| Change and configuration management | Safe evolution | Review and document a new grade-status field before deployment |
| Documentation and metadata | Continuity and shared understanding | Record table meanings, permissions, backup schedule, and data lineage |

These responsibilities are connected. A new index may improve a report but slow down inserts. A new automation may improve consistency but make troubleshooting harder. A strict security rule may protect confidentiality but prevent a legitimate workflow. Database administration therefore involves trade-offs, not a checklist of independent technical tasks.

A service-level agreement, or **SLA**, may formalize expectations such as uptime, response time, backup frequency, and incident response. In a cloud environment, the SLA also helps clarify what the provider manages and what the customer must still configure and verify.

Documentation deserves special attention. Data becomes much harder to use when no one knows where it came from, what a field means, who changed a rule, or which report depends on a view. Metadata, data dictionaries, change logs, and runbooks support both technical recovery and business interpretation. Good administration helps data move from people who create it to people who use it for decisions.

<!-- PAGE BREAK -->

### 11.4 Security, Roles, and Least Privilege

![Figure 11.5: Database security combines authentication (Who are you?) with authorization (What are you allowed to do?), enforced through roles and least privilege.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.5-security-roles)

Database security aims to ensure that **authorized users perform authorized actions**. That sentence contains two separate controls (Benantar, 2006; Ben-Natan, 2005).

- **Authentication** asks, “Who are you?”
- **Authorization** asks, “What are you allowed to do?”

A username and password may authenticate a user. A role or permission then determines whether that user may read, insert, update, delete, execute, or alter a database object.

#### Roles and Privileges

A **privilege** is permission to perform an action on an object. Common privileges include `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `EXECUTE`, and the ability to alter database structures.

A **role** groups privileges so they can be assigned consistently. Roles are easier to review than hundreds of custom user-by-user permissions.

A practical role matrix for the Grading Database might look like this:

| Role | Read Student Details | Read Grades | Change Scores | Change Structure | Manage Users and Backups |
|---|---:|---:|---:|---:|---:|
| Report viewer | Limited | Summary view only | No | No | No |
| Grader | Yes | Yes | Yes, selected columns | No | No |
| Instructor | Yes | Yes | Yes | Limited or no | No |
| DBA | As required | As required | As required | Yes | Yes |

Students would usually access grades through an application rather than receiving direct database accounts. The application can combine authentication with rules that restrict each student to the correct rows.

PostgreSQL supports role-based permissions such as:

```sql
CREATE ROLE grader;

GRANT SELECT ON STUDENT, DELIVERABLE, STUDENT_GRADE TO grader;
GRANT UPDATE (Score) ON STUDENT_GRADE TO grader;
```

The exact syntax and available controls vary by DBMS. The principle remains the same: grant the minimum access needed for the job.

#### Least Privilege

The **principle of least privilege** means that a user, application, or process receives only the permissions required to complete its task. Least privilege reduces accidental damage and limits what an attacker can do with a compromised account.

For example, a reporting account may need `SELECT` access to a view. It does not need permission to delete rows, alter tables, or create new users. A grading application may need to update `Score`, but it may not need permission to change `StudentID` or `DeliverableID`.

> **⚠️ Warning: Convenience can become permanent overpermission**
> Granting broad access may solve an immediate problem, but temporary permissions often remain long after the task is finished. Review roles regularly and remove access that is no longer needed.

Security also includes encryption, patching, secure network configuration, account review, logging, and protection of backup files. A database can be well protected while running and still expose sensitive data through an unencrypted backup copied to an unsecured location.

<!-- PAGE BREAK -->

### 11.5 Multi-User Databases and Concurrency

![Figure 11.6: Concurrency control prevents lost updates, dirty reads, and deadlocks when multiple users access the same data simultaneously.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.6-concurrency)

A database becomes more difficult to manage when several users or processes work at the same time. **Concurrency control** prevents one transaction from interfering with another in a way that produces incorrect results.

Consider a grade record with a score of 84:

1. Instructor A reads 84 and plans to change it to 90.
2. Instructor B reads 84 and plans to change it to 88.
3. Instructor A saves 90.
4. Instructor B saves 88.

The final value is 88, and Instructor A's change has disappeared. This is a **lost update**.

#### Common Concurrency Problems

| Problem | What Happens | Business Risk |
|---|---|---|
| Lost update | One change overwrites another | A grade, balance, or inventory adjustment disappears |
| Dirty read | A transaction reads uncommitted data that may be rolled back | A report uses a value that never becomes official |
| Nonrepeatable read | The same row produces a different value when read again | A calculation changes during one unit of work |
| Phantom read | A repeated query returns new or missing rows | A count or summary changes while it is being processed |

DBMSs use locks, transaction isolation, and versioning to control these problems (Gray & Reuter, 1993; Silberschatz et al., 2020).

#### Shared and Exclusive Locks

A **shared lock** generally allows several transactions to read the same resource while preventing a conflicting write. An **exclusive lock** protects a resource being changed so that another transaction cannot make a conflicting change.

Lock behavior depends on the DBMS and its isolation model. Modern systems may use multiversion concurrency control, or **MVCC**, so readers can see an earlier committed version while a writer is working. The main idea is more important than the implementation detail: the DBMS coordinates overlapping work so users do not produce invalid results.

Locks can be applied at different levels, including a row, page, table, or database. Fine-grained locks permit more concurrency but require more coordination. Coarse locks are simpler but can block more users.

#### Isolation and Serializable Results

A concurrent schedule is **serializable** when its final result is logically equivalent to some valid one-at-a-time ordering of the transactions. The transactions may overlap for speed, but the outcome should still make sense as if they had run in a safe sequence.

One classic approach is **two-phase locking**. During a growing phase, a transaction obtains the locks it needs. After it begins releasing locks, it enters a shrinking phase and does not obtain new ones. Modern DBMSs may combine locking with MVCC and several isolation levels, but serializability remains an important reference point for correctness.

Stronger isolation prevents more anomalies but may reduce concurrency or cause more retries. A DBA chooses settings based on the business risk. A temporary difference in a product recommendation may be acceptable. A lost payment or duplicated grade is not.

#### Deadlocks

A **deadlock** occurs when transactions wait for each other in a cycle.

- Transaction A locks the grade row and waits for the audit row.
- Transaction B locks the audit row and waits for the grade row.
- Neither can continue.

Most server DBMSs detect deadlocks and choose one transaction as the victim. That transaction is rolled back, and the application may retry it. Good transaction design reduces deadlock risk by accessing resources in a consistent order and keeping transactions short.

#### Optimistic and Pessimistic Control

**Pessimistic concurrency control** assumes that conflicts are likely. It locks data before or while it is being changed. This can prevent conflicts, but users may wait longer.

**Optimistic concurrency control** assumes that conflicts are uncommon. It reads the data, performs work, and then checks whether the original version has changed. If a conflict occurred, the transaction is rejected or retried.

A common optimistic pattern uses a version number:

```sql
UPDATE STUDENT_GRADE
SET Score = 90,
    VersionNumber = VersionNumber + 1
WHERE GradeID = 42
  AND VersionNumber = 7;
```

If zero rows are updated, another transaction changed the record after it was read. The application should not silently overwrite the newer value.

> **✅ Check your understanding: Conflict or failure?**
> A deadlock is not evidence that the database is broken. It is evidence that two valid transactions formed an unsafe waiting cycle. The DBMS resolves the cycle by rolling back one transaction.

<!-- PAGE BREAK -->

### 11.6 Transactions and ACID Reliability

![Figure 11.7: The ACID properties — Atomicity, Consistency, Isolation, and Durability — guarantee reliable transactions that protect business operations.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.7-acid-transactions)

A **transaction** is a logical unit of work. It may contain one SQL statement or several related statements. The transaction should leave the database in a valid state, even if an error occurs halfway through.

Suppose an instructor corrects a grade. The business action may require two changes:

1. update the score in `STUDENT_GRADE`; and
2. insert a record into `GRADE_CHANGE_LOG`.

If the score changes but the audit record fails, the database loses accountability. If the audit record is inserted but the score change fails, the log describes an event that did not happen. The two statements belong in one transaction.

```sql
BEGIN;

UPDATE STUDENT_GRADE
SET Score = 90
WHERE GradeID = 42;

INSERT INTO GRADE_CHANGE_LOG
    (GradeID, OldScore, NewScore, ChangedBy, ChangedAt)
VALUES
    (42, 84, 90, 'ndvir', CURRENT_TIMESTAMP);

COMMIT;
```

If an error occurs before `COMMIT`, the transaction can be canceled:

```sql
ROLLBACK;
```

Many tools use **autocommit**, which saves each statement immediately. Autocommit is convenient for simple work but dangerous when several statements must succeed together. Transaction-control syntax also varies among platforms. PostgreSQL and SQLite support explicit SQL transactions. In Microsoft Access, transaction handling is commonly implemented through DAO or application code rather than a normal saved query.

#### The ACID Properties

Reliable transactions are commonly described through **ACID** (Gray & Reuter, 1993; Silberschatz et al., 2020).

| Property | Meaning | Grading Database Example |
|---|---|---|
| Atomicity | All steps succeed, or none are saved | Grade update and audit insert remain together |
| Consistency | The transaction preserves rules and moves the database from one valid state to another | The score remains within its permitted range and foreign keys remain valid |
| Isolation | Concurrent transactions do not see unsafe intermediate states | Another user does not report a half-completed correction |
| Durability | Committed changes survive a later failure | A saved grade remains after a restart or crash |

Consistency is often misunderstood. It does not mean that no other transaction may run. It means that the database's rules remain true before and after a successful transaction. Isolation controls how concurrent transactions interact.

> **💡 Key takeaway: A transaction is a business promise**
> `COMMIT` means the complete business action is accepted. `ROLLBACK` means the database returns to the state before that action began.

### 11.7 Backup, Recovery, and Business Continuity

![Figure 11.8: Backup and recovery strategy translates business continuity requirements into technical procedures — RPO defines acceptable data loss, RTO defines acceptable downtime.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.8-backup-recovery)

Failures cannot be eliminated. Hardware fails. Files become corrupted. Software contains bugs. Users delete records. Attackers may damage or encrypt data. **Backup and recovery** prepare the organization to restore service and trusted data after those events (Beyer et al., 2016; Kumar & Son, 2015).

#### Backup Types

| Backup Type | What It Copies | Strength | Limitation |
|---|---|---|---|
| Full | All selected data | Simplest restoration base | Takes the most time and storage |
| Differential | Changes since the last full backup | Faster restore than many incremental chains | Grows until the next full backup |
| Incremental | Changes since the most recent backup | Small and fast backup jobs | Restore may require several backup sets |

A common operational guideline is the **3-2-1 rule**: keep at least three copies of important data, on two types of storage, with one copy in a separate location. The exact design depends on risk, cost, regulations, and the database platform.

A copied file is not automatically a valid database backup. If a database is active while its files are copied, the result may be inconsistent. Use platform-supported backup tools or a process designed for safe file copying.

#### RPO and RTO

Two business measures shape a recovery plan:

- **Recovery point objective (RPO):** the maximum acceptable amount of data loss, measured in time.
- **Recovery time objective (RTO):** the maximum acceptable time required to restore service.

If a grading system has an RPO of 24 hours, the organization accepts the possibility of losing up to one day of changes. If that is unacceptable during final-grade week, backups or transaction-log protection must occur more frequently.

If the RTO is four hours, the organization expects the system to be usable within four hours after an incident. An RTO is meaningful only when the restore process, staffing, credentials, software, and documentation can meet it.

#### Rollback and Rollforward

DBMS recovery often uses a transaction log.

- A **before-image** records a value before it changed. It can support undo or rollback.
- An **after-image** records the value after the change. It can support redo or rollforward.

**Rollback** reverses incomplete or unwanted work. **Rollforward** reapplies committed changes after restoring an earlier backup. For example, a DBA may restore Sunday night's full backup and then replay logged transactions through Tuesday morning.

The words rollback and rollforward may be used at different levels. A user can roll back one uncommitted transaction. A recovery process can also undo incomplete transactions and redo committed transactions after a system failure.

#### Test the Restore

A backup strategy is incomplete until restoration has been tested. A successful backup message proves that a backup job finished. It does not prove that the organization can restore the correct database, on acceptable infrastructure, within the required time.

A restore test should verify:

1. the backup can be found and decrypted;
2. the database opens or starts correctly;
3. important tables and row counts are present;
4. constraints and relationships remain valid;
5. applications and reports can reconnect; and
6. the measured restore time supports the RTO.

Cloud services reduce some infrastructure work, but they do not remove customer responsibility. The customer still controls permissions, data classification, retention choices, exports, application logic, and the decision to test recovery. “The provider has backups” is not the same as “our organization has a verified recovery plan.”

#### Replication, Failover, and Backups

**Replication** maintains additional copies of data so another system can support reporting, geographic distribution, or continued service. **Failover** moves work to a standby system when the primary system becomes unavailable. These capabilities can improve availability and reduce downtime, but they do not replace backups.

A replicated mistake is still a mistake: an accidental deletion, damaged update, or malicious change may be copied quickly to every replica. Backups preserve earlier recovery points; replication and failover help maintain service. A continuity plan may use all three, but each addresses a different risk.

---

## Part B: Making the Database Work Harder

Protection is only one side of administration. A reliable database must also respond efficiently, enforce rules consistently, and provide stable interfaces for applications and reports.

<!-- PAGE BREAK -->

### 11.8 Performance: Indexes and Query Plans

![Figure 11.9: An index works like a textbook index — it helps the database locate rows directly instead of scanning every row. Query plans reveal whether the database is using that index.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.9-indexes-query-plans)

An **index** is a data structure that helps the DBMS locate rows without scanning every row in a table. It works like an index in a textbook. Instead of reading every page to find “deadlock,” you use an ordered reference that points to the relevant pages (Ramakrishnan & Gehrke, 2003).

Suppose the `STUDENT_GRADE` table contains millions of rows and reports frequently filter by `StudentID`:

```sql
SELECT GradeID, DeliverableID, Score
FROM STUDENT_GRADE
WHERE StudentID = 101;
```

An index can support that search:

```sql
CREATE INDEX idx_student_grade_student
ON STUDENT_GRADE (StudentID);
```

Indexes often improve filtering, joins, sorting, and uniqueness checks. They also create costs.

- Every index uses storage.
- Inserts, updates, and deletes may need to update the index.
- Too many indexes can slow write-heavy systems.
- An index that is never used still requires maintenance.

The goal is not to index every column. The goal is to support important query patterns.

#### Reading a Simple Query Plan

A **query plan** explains how the DBMS expects to execute a query. SQLite uses:

```sql
EXPLAIN QUERY PLAN
SELECT GradeID, DeliverableID, Score
FROM STUDENT_GRADE
WHERE StudentID = 101;
```

PostgreSQL uses `EXPLAIN`, with `EXPLAIN ANALYZE` available when you want the DBMS to run the query and report actual execution details.

In a simple SQLite plan:

- `SCAN STUDENT_GRADE` suggests that many or all rows are being examined.
- `SEARCH STUDENT_GRADE USING INDEX ...` suggests that an index is helping locate the rows.

A scan is not always bad. Reading a small table or returning most rows may be faster through a scan. Query-plan analysis asks whether the chosen method fits the business workload.

> **🧠 Think like a manager: Performance has a user and a cost**
> A faster query matters when it supports a valuable process. Before adding an index, identify the slow task, the affected users, the expected benefit, and the added write and maintenance cost.

<!-- PAGE BREAK -->

### 11.9 Constraints Beyond Primary Keys

![Figure 11.10: Constraints — NOT NULL, UNIQUE, CHECK, DEFAULT, and foreign keys — turn business rules into database-enforced rules that reject invalid data at the source.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.10-constraints)

A database should reject invalid data as early as possible. **Constraints** turn business rules into database rules.

| Constraint | Rule It Enforces | Example |
|---|---|---|
| `NOT NULL` | A value is required | Every grade row must identify a student |
| `UNIQUE` | A value or combination cannot repeat | One email address per student, when policy requires it |
| `CHECK` | A value must satisfy a condition | Score must be between 0 and 100 |
| `DEFAULT` | A value is supplied when none is entered | New records begin with `Status = 'Active'` |
| Foreign key | A referenced parent row must exist | Every `StudentID` in grades must exist in `STUDENT` |

A simplified table definition might include:

```sql
CREATE TABLE STUDENT_GRADE (
    GradeID       INTEGER PRIMARY KEY,
    StudentID     INTEGER NOT NULL,
    DeliverableID INTEGER NOT NULL,
    Score         NUMERIC CHECK (Score BETWEEN 0 AND 100),
    Status        TEXT DEFAULT 'Recorded',
    UNIQUE (StudentID, DeliverableID),
    FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID),
    FOREIGN KEY (DeliverableID) REFERENCES DELIVERABLE(DeliverableID)
);
```

The unique constraint prevents two grade rows for the same student and deliverable. The check constraint rejects impossible scores. Foreign keys reject orphaned grades.

Referential actions require judgment:

- `ON DELETE RESTRICT` prevents deletion when dependent rows exist.
- `ON DELETE CASCADE` automatically deletes dependent rows.
- `ON DELETE SET NULL` preserves the child row but removes the reference, when null is permitted.

Cascade delete can be useful, but it can also remove large amounts of data after one command. Use it only when the business meaning is clear and tested.

Microsoft Access supports field and record validation rules, such as `Between 0 And 100`, along with required fields, indexes, and relationship enforcement. SQLite and PostgreSQL support SQL constraints, although the exact options and alteration procedures differ.

SQLite requires foreign-key enforcement to be enabled for each database connection:

```sql
PRAGMA foreign_keys = ON;
```

Defining a foreign key in the schema is not enough if the active SQLite connection is not enforcing it. This is an important example of the difference between documenting a rule and operating the database so the rule is actually applied.

> **🚫 Common mistake: Relying only on forms for validation**
> A form may reject an invalid score, but data can also enter through imports, scripts, APIs, and other applications. Important rules belong as close to the data as the platform allows.

### 11.10 Views as Security and Reporting Layers

![Figure 11.11: A view acts as a virtual table — it simplifies complex queries, hides sensitive columns, and provides a stable reporting contract for applications and dashboards.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.11-views)

A **view** is a saved query that behaves like a virtual table. It can simplify complex logic, hide sensitive columns, restrict rows, and provide a stable reporting contract.

For example, a reporting view can summarize student performance without exposing email addresses or other unnecessary details:

```sql
CREATE VIEW vw_student_progress AS
SELECT
    s.StudentID,
    s.FirstName,
    s.LastName,
    ROUND(AVG(sg.Score), 2) AS AverageScore,
    COUNT(sg.GradeID) AS GradesRecorded
FROM STUDENT AS s
LEFT JOIN STUDENT_GRADE AS sg
    ON s.StudentID = sg.StudentID
GROUP BY
    s.StudentID,
    s.FirstName,
    s.LastName;
```

A reporting account can receive access to the view instead of the underlying tables. This supports least privilege and reduces duplicated SQL across dashboards.

Views can also act as **stable contracts**. A dashboard may depend on `vw_student_progress` even if the underlying schema later changes. The DBA or developer can revise the view while preserving the columns expected by the dashboard.

Views do not automatically solve every security problem. Some systems allow users to reach underlying tables through other paths. Row-level security, application rules, and careful privileges may still be needed. Performance also matters because a normal view usually stores the query definition, not a permanent copy of the results.

<!-- PAGE BREAK -->

### 11.11 Triggers and Data Macros

![Figure 11.12: Triggers and data macros run automatically in response to database events — they enforce rules, write audit records, and synchronize data, but require clear documentation.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.12-triggers-automation)

A **trigger** is database logic that runs automatically when a specified event occurs. Common events include `INSERT`, `UPDATE`, and `DELETE`.

Triggers can:

- write audit records;
- enforce rules that involve several fields or tables;
- maintain derived or summary data;
- prevent unsafe changes; and
- synchronize related records.

The following SQLite trigger records a grade change:

```sql
CREATE TRIGGER trg_grade_audit
AFTER UPDATE OF Score ON STUDENT_GRADE
WHEN OLD.Score IS NOT NEW.Score
BEGIN
    INSERT INTO GRADE_CHANGE_LOG
        (GradeID, OldScore, NewScore, ChangedAt)
    VALUES
        (OLD.GradeID, OLD.Score, NEW.Score, CURRENT_TIMESTAMP);
END;
```

`OLD` refers to the row before the update. `NEW` refers to the updated row. A production audit design should also capture user identity, source application, and a reason for the change when possible.

Triggers are powerful because they run no matter which application submits the SQL. That same invisibility can make them difficult to debug. A developer may update one row and discover that several other changes occurred automatically.

> **⚠️ Warning: Invisible automation needs visible documentation**
> Every trigger should have a clear name, purpose, owner, test case, and explanation of side effects. Automation that no one remembers is technical debt wearing a clever hat.

Microsoft Access does not use server-style SQL triggers. It provides **data macros** that run in response to table events, such as before a change, after an update, or after a deletion. Data macros can validate data, create related records, and respond to table changes. They serve a role similar to triggers within the Access environment.

### 11.12 Macros and Automation in Microsoft Access

An Access **macro** is a sequence of actions that automates a task without requiring traditional programming. Macros may support navigation, data entry, validation, reporting, and user interaction.

| Macro Type | Where It Lives | Typical Use |
|---|---|---|
| Standalone macro | A separate database object | Open several reports, run queries, display a message |
| Embedded macro | Attached to a form, report, or control event | Run actions when a button is clicked or a form opens |
| Event-driven data macro | Attached to a table event | Validate or respond when data is inserted, updated, or deleted |
| Named data macro | Reusable table-level logic | Run a shared set of data actions from other macros |

A command button that closes a form may use an embedded macro. A startup routine that opens the main navigation form may use a standalone macro. A data macro may reject a score outside the permitted range or add a timestamp after a record changes.

Automation should support a defined business rule, not compensate for a confusing database design. Before building a macro, ask:

1. What event starts the automation?
2. What actions will occur?
3. What happens if one action fails?
4. Can the user understand what changed?
5. Is the same rule already enforced by a constraint?
6. Who will maintain the macro later?

Access macros are useful for classroom and departmental applications, but they are not a complete replacement for server-side security, transactions, or centralized administration.

### 11.13 Stored Procedures and Functions

A **stored procedure** or **stored function** is reusable program logic stored in a server DBMS. It can accept parameters, execute SQL, apply business rules, and return a result.

A small PostgreSQL function can package a grade update:

```sql
CREATE OR REPLACE FUNCTION update_grade(
    p_grade_id INTEGER,
    p_new_score NUMERIC
)
RETURNS VOID
LANGUAGE SQL
AS $$
    UPDATE STUDENT_GRADE
    SET Score = p_new_score
    WHERE GradeID = p_grade_id;
$$;

SELECT update_grade(42, 90);
```

In production, the routine might also validate the score, write an audit record, check the caller's permissions, and raise a meaningful error.

Stored routines can improve reuse, consistency, security, and network efficiency. They also move logic into the database, where it must be versioned, tested, documented, and coordinated with application code.

Some DBMSs also support **cursors**, which process query results one row at a time. Cursors can help with procedural tasks, but set-based SQL is usually easier to optimize. Use a cursor only when the work truly requires row-by-row processing.

<!-- PAGE BREAK -->

### 11.14 Administration Across Platforms

![Figure 11.13: Platform choice affects administrative capabilities — Access, SQLite, PostgreSQL, and Supabase each offer different strengths for security, backup, and performance management.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.13-platform-comparison)

Administration changes with the platform. The underlying goals remain security, integrity, availability, recoverability, performance, and controlled change.

| Platform | Administrative Strengths | Important Limits or Risks | Useful Practices |
|---|---|---|---|
| Microsoft Access | Forms, reports, validation, relationships, macros, data macros | File-based sharing, limited centralized security, corruption risk when poorly shared | Split front end and back end, back up the file, compact and repair, control folder access |
| SQLite | Portable file, transactions, constraints, indexes, triggers, simple deployment | No built-in user accounts, one file can become a single point of failure, write concurrency is limited | Use application security, enable foreign keys, consider WAL mode, run `PRAGMA integrity_check`, back up safely |
| PostgreSQL | Roles, strong transactions, MVCC, views, triggers, functions, detailed query plans, mature backup tools | More configuration and operational complexity | Use roles, least privilege, monitored backups, `EXPLAIN`, routine maintenance, tested recovery |
| Supabase | Managed PostgreSQL, authentication integration, APIs, row-level security capabilities | Shared responsibility remains; policies and application design can still be wrong | Review roles and policies, test row access, export critical data, verify backup and recovery assumptions |

Platform choice is a business decision. Access may be appropriate for a small departmental workflow. SQLite may fit a local application or prototype. PostgreSQL may support a multi-user operational system. A managed service such as Supabase can reduce infrastructure work, but it does not remove the need for security design, data governance, and recovery planning.

---

## Common DBA and Automation Mistakes

![Figure 11.14: The most damaging database administration mistakes — untested backups, overbroad access, undocumented automation, and direct production changes — are ordinary decisions repeated over time.](https://res.cloudinary.com/dkndq6lyz/image/upload/w_1600/Database-book-BITM330/ch11-database-administration/figure-11.14-common-mistakes)

The most damaging mistakes are often ordinary decisions repeated over time.

1. **Backups are created but never restored.** The organization discovers missing files, broken credentials, or corrupted backups during an emergency.
2. **Everyone receives broad access.** Convenience replaces least privilege, and no one can explain who truly needs which rights.
3. **The cloud is treated as automatic protection.** Managed infrastructure is confused with complete governance and recovery.
4. **Every column is indexed.** Write performance declines, storage grows, and maintenance increases without improving important queries.
5. **No query plan is checked.** Performance decisions are based on guesses rather than evidence.
6. **Validation exists only in the interface.** Imports, scripts, or APIs bypass the form and insert invalid data.
7. **Cascade delete is used casually.** One parent deletion removes valuable dependent records.
8. **Transactions are too long.** Locks remain open while a user pauses, increasing blocking and deadlock risk.
9. **Triggers and macros are undocumented.** Automatic side effects surprise users and developers.
10. **Schema changes are made directly in production.** A quick fix breaks a report, view, form, or application.
11. **Audit logs collect data but are never reviewed.** Logging becomes storage, not accountability.
12. **One person knows the recovery process.** The procedure fails when that person is unavailable.

The common pattern is weak operational discipline. Reliable systems are built through repeatable procedures, review, testing, documentation, and clear ownership.

<!-- PAGE BREAK -->

## Practicing DBA Thinking

You do not need the job title “DBA” to think like one. Anyone who creates or manages an important database should ask the following questions.

### Security and Access

- [ ] Have sensitive tables and columns been identified?
- [ ] Does each user or application have only the access it needs?
- [ ] Are shared accounts avoided or controlled?
- [ ] Can important permission changes be reviewed?
- [ ] Are backup files protected as carefully as the live database?

### Integrity and Transactions

- [ ] Do primary keys and foreign keys enforce relationships?
- [ ] Do `NOT NULL`, `UNIQUE`, `CHECK`, and default rules enforce important business requirements?
- [ ] Are multi-step business actions protected by transactions?
- [ ] Could two users overwrite each other's work?
- [ ] Are triggers, data macros, and automated side effects documented?

### Backup and Continuity

- [ ] Is there a defined backup schedule?
- [ ] Are RPO and RTO stated in business terms?
- [ ] Is at least one backup stored separately from the primary system?
- [ ] Has a restore been tested recently?
- [ ] Can another qualified person follow the recovery instructions?

### Performance and Change

- [ ] Are the most important slow queries identified?
- [ ] Have query plans been inspected before adding indexes?
- [ ] Are unused or overlapping indexes reviewed?
- [ ] Are schema and automation changes tested before release?
- [ ] Are changes documented with date, owner, reason, and rollback plan?

### Applying the Checklist to the Grading Database

A practical hardening sequence is:

1. identify the most sensitive tables and fields;
2. define the `report_viewer`, `grader`, `instructor`, and `dba` roles;
3. create and verify a backup;
4. run an integrity check and search for duplicate or orphaned records;
5. inspect a slow student-progress query and add one justified index;
6. protect a grade correction with a transaction;
7. create a reporting view that omits unnecessary personal data;
8. add one documented audit trigger or Access data macro;
9. record the change, purpose, test evidence, and recovery steps; and
10. name the most important remaining risk.

This sequence is the foundation for **Let's Build 11: Harden and Automate the Grading Database**. The companion lab applies the same reasoning to PetVax through a role matrix, backup plan, RPO/RTO decision, integrity evidence, index recommendation, controlled view, automation, and short management memo.

> **💡 Key takeaway: Administration is continuous**
> Security, performance, recovery, and documentation are not tasks that become permanently finished. They must be reviewed as users, data, workloads, risks, and business requirements change.

## Key Concepts

- Database administration protects the conditions that make organizational data trustworthy.
- Data administration focuses on governance and meaning; database administration focuses on technical implementation and operation.
- Least privilege limits users and applications to the access required for their responsibilities.
- Concurrency control prevents unsafe interference among simultaneous transactions.
- ACID properties explain how transactions support complete, valid, isolated, and durable changes.
- RPO and RTO translate backup and recovery into business decisions about acceptable data loss and downtime.
- Indexes improve selected query patterns but add storage and write costs.
- Query plans provide evidence about how a DBMS intends to execute a query.
- Constraints reject invalid data close to its source.
- Views simplify reporting and can reduce exposure of sensitive data.
- Triggers and data macros automate responses to data events, but invisible automation requires strong documentation.
- Stored routines package reusable database logic and must be managed like application code.
- Platform capabilities differ, but security, integrity, recoverability, and controlled change remain universal goals.

## Key Terms

**ACID**, **after-image**, **authentication**, **authorization**, **backup**, **before-image**, **business continuity**, **concurrency control**, **constraint**, **data administration**, **data macro**, **database administration**, **database administrator (DBA)**, **deadlock**, **durability**, **exclusive lock**, **failover**, **index**, **isolation**, **least privilege**, **lock**, **lost update**, **macro**, **optimistic concurrency control**, **pessimistic concurrency control**, **privilege**, **query plan**, **recovery point objective (RPO)**, **recovery time objective (RTO)**, **replication**, **role**, **rollback**, **rollforward**, **shared lock**, **stored procedure**, **transaction**, **trigger**, **view**.

<div class="video-container">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/HHEjcTnq1Co" title="ch11 - Database Administration Detailed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

*Chapter 11 detailed walkthrough — a deeper dive into database administration concepts.*

## Chapter Summary

A database creates business value only while people can trust and use it. Database administration protects that trust through security, concurrency control, transactions, backup, recovery, performance management, maintenance, documentation, and controlled change.

The chapter began with the DBA's operational role and the distinction between organization-wide data governance and system-specific database administration. It then showed how roles and least privilege control access, how locks and isolation manage concurrent work, and how ACID transactions keep multi-step business actions complete and valid. Backup strategy, RPO, RTO, rollback, rollforward, and restore testing connected technical recovery to business continuity.

The second half moved from protection to capability. Indexes and query plans help the DBMS find data efficiently. Constraints enforce rules. Views provide reusable reporting and security layers. Triggers, data macros, Access macros, stored procedures, and functions automate work. Each technique can improve reliability, but each also creates trade-offs and maintenance responsibilities.

The central lesson is simple: a correct database is not enough. Organizations need databases that remain correct, secure, recoverable, understandable, and responsive as real use changes them over time.

## References

Benantar, M. (2006). *Access control systems: Security, identity management and trust models*. Springer.

Ben-Natan, R. (2005). *Implementing database security and auditing*. Elsevier.

Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (2016). *Site reliability engineering: How Google runs production systems*. O'Reilly Media.

Dvir, N. (2021). *Database administration* [BITM 300 lecture materials]. University at Albany, State University of New York.

Gray, J., & Reuter, A. (1993). *Transaction processing: Concepts and techniques*. Morgan Kaufmann.

Kroenke, D. M., Auer, D. J., Vandenberg, S. L., & Yoder, R. C. (2020). *Database concepts* (9th ed.). Pearson.

Kumar, V., & Son, S. H. (2015). *Database recovery*. Springer.

Microsoft. (n.d.). *Data professionals*. Microsoft Learn.

Mullins, C. S. (2002). *Database administration: The complete guide to practices and procedures*. Addison-Wesley Professional.

Ramakrishnan, R., & Gehrke, J. (2003). *Database management systems* (3rd ed.). McGraw-Hill.

Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7th ed.). McGraw-Hill Education.
