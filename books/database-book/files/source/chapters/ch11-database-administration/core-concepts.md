<!-- metadata: date="2026-05-05"; chapter="11"; section="main"; title="Chapter 11 – Database Administration"; description="Covers the responsibilities of a Database Administrator, including concurrency control, transaction management, security, backup and recovery, and performance tuning across local and cloud environments." -->
# Chapter 11: Database Administration

*Administration, Security, and Operational Reliability*

This chapter covers the professional role of the database administrator and the practices that keep organizational data secure, available, and performing well. The chapter includes user management, role-based access control, backup and recovery strategies, performance tuning, compliance requirements, and disaster recovery planning.

**After reading this chapter, students will be able to:**

- Describe the core responsibilities of a DBA and explain why the role matters for business continuity
- Explain backup and recovery strategies and evaluate trade-offs between them
- Identify security risks in a database environment and recommend access control policies

## Chapter Overview

Previous chapters focused on **how databases are designed** and **how data is queried using SQL**. Chapter 6 established the relational model. Chapter 7 applied normalization to remove redundancy and protect data integrity. Chapter 9 used the Grading Database to build complex queries. These skills define what a database looks like and how it is used.

This chapter addresses what happens after a database is deployed.

Database administration (DBA) is the discipline focused on keeping databases **reliable, secure, and high-performing over time**. Designers decide how data should be structured. Analysts decide how data should be queried. Database administrators ensure that systems continue to function correctly under real operating conditions: multiple users, continuous updates, security threats, hardware failures, and evolving business requirements.

At the center of this chapter is the idea that the DBA acts as the **guardian of organizational data**. This role includes:

* Protecting data from loss, corruption, and unauthorized access
* Ensuring that concurrent users can safely read and write data
* Maintaining performance as data volume and usage grow
* Preparing systems to recover quickly from errors and failures

Administrative decisions directly shape **business continuity and stakeholder trust**. A poorly administered database leads to downtime, inaccurate reports, lost records, or security breaches. All of these undermine decision-making and organizational credibility. Strong database administration enables consistent reporting, dependable analytics, and confidence in the information systems that support daily operations.

Throughout this chapter, database administration is presented as a **strategic function** that connects system design, operational reliability, and business performance. Chapter 12 will show how well-administered databases power business intelligence and analytics at scale.

[Image: figure-11.1-dba-scope.png]
Caption: Database administration encompasses security, performance, reliability, and long-term maintenance, extending far beyond initial schema design and query writing.
Prompt: Conceptual diagram showing a database at the center, surrounded by responsibilities labeled: Security, Performance, Backup and Recovery, Concurrency, Monitoring, Maintenance. Clean academic style, neutral colors, no branding.

---

## Learning Objectives

By the end of this chapter, students will be able to:

* Explain the role and responsibilities of a Database Administrator
* Distinguish between Data Administration and Database Administration
* Describe how DBMSs handle multi-user access safely through locking and concurrency control
* Understand transaction management and the ACID properties
* Explain database security principles, including authentication, authorization, and role-based access control
* Describe backup strategies and recovery techniques
* Recognize performance monitoring and maintenance concerns in real systems
* Compare DBA responsibilities across file-based, server-based, and cloud-hosted platforms

---

## 1. What Is Database Administration?

### The DBA Role in Context

Database administration is both an **operational** and a **strategic** function. Database design focuses on *what* data is stored and *how* it is structured. Database administration focuses on *how that system behaves over time* under real-world conditions.

In previous chapters, you worked primarily on **database design and SQL**:

* Designing tables and relationships
* Normalizing data structures
* Writing queries to retrieve, analyze, and report data

These activities define the **shape and logic** of a database. Database administration, by contrast, is concerned with **keeping that database healthy, secure, and performant** once it is live.

A useful way to frame the difference:

* **Database design** asks: *What should the database look like?*
* **Database administration** asks: *How do we ensure it continues to work correctly tomorrow, next month, and next year?*

Databases are not static. They change continuously as:

* New data is inserted
* Existing data is updated or deleted
* Users run queries simultaneously
* Business requirements evolve
* Systems face failures, attacks, or performance pressure

A "set it and forget it" approach is not viable. Even a perfectly designed database can fail without active administration. Performance degrades, storage fills up, security gaps emerge, and data integrity erodes without ongoing oversight.

##### 🌍 Real-World Example
##### A regional hospital runs an electronic health records (EHR) system. After the system was deployed, administrators discovered that query response times doubled within six months as patient records grew. A DBA identified missing indexes and fragmented tables, resolved the bottleneck in a day, and scheduled regular maintenance. Without that intervention, staff would have experienced delays accessing patient data during critical care moments.

[Image: figure-11.2-design-vs-admin.png]
Caption: Database design focuses on structure, while database administration focuses on reliability, security, and operational continuity over time.
Prompt: Split diagram with two columns. Left column titled "Database Design" (entities, relationships, normalization, ER diagrams). Right column titled "Database Administration" (backups, permissions, transactions, monitoring). Minimalist textbook diagram.

---

### Data Administration vs. Database Administration

In larger organizations, responsibilities around data are often divided into two related but distinct roles: **Data Administration (DA)** and **Database Administration (DBA)**.

| Term | Scope | Focus |
|------|-------|-------|
| **Data Administration (DA)** | Organization-wide | Data governance, privacy, corporate policy, and compliance |
| **Database Administration (DBA)** | Specific database systems | Implementation, maintenance, performance, and user support |

**Data Administration (DA)** focuses on the *organizational and policy side* of data:

* Defining data standards and naming conventions
* Managing data definitions and metadata
* Ensuring regulatory compliance (for example, privacy laws such as GDPR or audit requirements)
* Establishing rules about who owns data and how it may be used

Data administrators are concerned with **what data means** and **how it should be governed across the organization**.

**Database Administration (DBA)** focuses on the *technical execution* of those policies and designs:

* Managing database security and user access
* Monitoring and tuning performance
* Ensuring availability and uptime
* Performing backups and recovery
* Enforcing constraints and integrity rules at the system level

DBAs are concerned with **how data is stored, accessed, protected, and recovered in practice**.

Both roles matter, especially as systems grow in size and complexity. Data administration sets the rules and expectations. Database administration ensures those rules are enforced reliably by the technology. When either role is missing, organizations tend to experience inconsistent data, system failures, or a loss of trust in their information systems.

📝 **Note:**
In small organizations, one person often fills both roles. In large enterprises, Data Administration and Database Administration are separate departments with distinct reporting structures and compliance responsibilities.

[Image: figure-11.3-da-vs-dba.png]
Caption: Data administration governs policies and standards, while database administration enforces those decisions through technical mechanisms.
Prompt: Venn diagram showing Data Administration and Database Administration. Overlap labeled "Data Governance." Data Admin includes policy, compliance, metadata; DBA includes performance, backups, security.

---

## 2. Core DBA Responsibilities

Database administration revolves around a small number of **foundational responsibilities** that keep data trustworthy and systems operational. These responsibilities apply regardless of whether the database is Microsoft Access on a desktop, SQLite in a local application, or PostgreSQL running in the cloud.

### The Three Pillars of Database Administration

Most DBA work can be organized around three essential pillars.

#### 1. Concurrency Control

Concurrency control is the DBA's responsibility to ensure that **multiple users can safely access and modify the database at the same time**.

In real systems, databases are rarely used by a single person:

* Multiple students may be viewing grades simultaneously
* An instructor may be updating scores while reports are being generated
* Automated systems may be inserting or querying data in the background

Without proper concurrency control, these simultaneous actions can lead to:

* Lost updates (one user overwriting another's changes)
* Inconsistent or partially written data
* Confusing results where different users see different versions of the truth

DBAs rely on mechanisms such as **locking**, **transactions**, and **isolation levels** to ensure that concurrent activity does not compromise data integrity. Even in small systems, concurrency matters the moment more than one user or process touches the database.

#### 2. Security and Access Management

Security is not just about preventing external attackers. It is about **ensuring that users can only do what they are authorized to do**.

Core security responsibilities include:

* Creating and managing user accounts
* Assigning roles and permissions
* Restricting access to sensitive data
* Preventing accidental or malicious changes

In the context of a grading database, security questions include:

* Can students see only their own grades?
* Who is allowed to insert or update grades?
* Who can modify the grading scale or delete records?

A well-administered database enforces these rules at the database level, not just in the application interface. This reduces risk and increases trust in the system.

#### 3. Backup and Recovery

Backup and recovery address a simple but critical reality: **things go wrong**.

Failures occur due to:

* Hardware or cloud service outages
* Software bugs
* Human error (accidental deletes or updates)
* Security incidents

DBAs are responsible for ensuring that data can be **restored quickly and accurately** when something goes wrong. This includes:

* Regular, automated backups
* Clear recovery procedures
* Testing that backups actually work

A database without a recovery plan is not a professional system, regardless of how well it is designed.

### Additional Responsibilities

Beyond the three pillars, DBAs handle a range of ongoing responsibilities that support system stability and growth.

* **Monitoring and performance tuning**
  Watching query performance, identifying bottlenecks, and optimizing indexes or configurations before users notice slowdowns.

* **Capacity planning**
  Anticipating future data growth and ensuring there is enough storage, memory, and processing power to support it.

* **Documentation and change management**
  Keeping records of schema changes, configuration decisions, and maintenance procedures so systems remain understandable and auditable over time.

* **Coordination with system administrators and developers**
  Working with infrastructure teams, application developers, and analysts to ensure that database changes align with application needs and organizational goals. In many organizations, DBAs collaborate on **Service Level Agreements (SLAs)** covering backups, uptime, response times, and recovery objectives.

Together, these responsibilities position the DBA as a **guardian of reliability, security, and performance**. Users and developers interact with data through queries and applications. The DBA ensures that the underlying system remains stable, trustworthy, and resilient.

##### 🌍 Real-World Example
##### An online retailer runs a PostgreSQL database that handles orders, inventory, and customer records. The DBA team monitors query response times, manages nightly incremental backups, and enforces role-based access so that warehouse staff can view inventory but cannot modify customer payment data. When a software update accidentally deleted 300 order records, the team restored them within 20 minutes using the previous night's backup and a transaction log replay.

---

## 3. Multi-User Databases and Concurrency Control

One of the defining characteristics of a real database system is that **multiple users and processes interact with it at the same time**. As soon as this happens, coordination becomes necessary. Concurrency control is the set of mechanisms that allow databases to support simultaneous access **without sacrificing correctness**.

### Why Concurrency Is a Problem

In a single-user environment, database operations are straightforward: one action happens at a time. In multi-user systems, many actions occur **in parallel**.

Common scenarios include:

* An instructor updating grades while students are viewing their results
* An administrator generating reports while new records are being inserted
* Automated processes running alongside human users

Without concurrency control, these overlapping actions can lead to serious problems:

* **Lost updates**
  Two users update the same record, and one update silently overwrites the other.

* **Inconsistent reads**
  A user reads data that is in the middle of being changed, resulting in partial or contradictory information.

* **Corrupted data**
  Incomplete transactions leave the database in an invalid or unusable state.

Concurrency issues are not rare edge cases. They are **inevitable** in any shared database system.

[Image: figure-11.4-concurrency-conflict.png]
Caption: Without concurrency control, simultaneous access can result in lost updates, inconsistent reads, or corrupted data.
Prompt: Timeline-style diagram showing two users attempting to update the same record simultaneously, leading to lost updates without locking. Educational schematic style.

---

### Locking Concepts

To manage concurrency, databases use **locks**: temporary controls that regulate access to data while it is being read or modified.

#### Shared (Read) Locks

A shared lock allows multiple users to **read** the same data at the same time.

* Used for `SELECT` operations
* Prevents data from being modified while it is being read
* Multiple shared locks can coexist

Example: many students viewing grades simultaneously.

#### Exclusive (Write) Locks

An exclusive lock is required when data is **modified**.

* Used for `INSERT`, `UPDATE`, and `DELETE`
* Prevents other users from reading or writing the locked data
* Only one exclusive lock can exist at a time

Example: an instructor updating a student's grade.

#### Lock Granularity

Locks can be applied at different levels of detail, known as **granularity**:

* **Row-level locks**: lock only the specific rows being modified (high concurrency, higher overhead)
* **Table-level locks**: lock the entire table (simpler, but restricts access)
* **Database-level locks**: lock the entire database (rare, usually during maintenance)

DBAs balance granularity to achieve both **performance and safety**.

[Image: figure-11.5-lock-types.png]
Caption: Databases manage concurrency using locks of varying types and granularity, balancing consistency with performance.
Prompt: Hierarchical diagram showing database-level, table-level, and row-level locks. Include shared (read) and exclusive (write) lock icons.

---

### Two-Phase Locking

To guarantee that concurrent transactions produce correct results, many DBMSs implement **Two-Phase Locking (2PL)**. This protocol divides a transaction's locking behavior into two distinct stages:

1. **Growing phase** — The transaction acquires all the locks it needs. New locks can be obtained, but no lock may be released.
2. **Shrinking phase** — The transaction releases its locks. Once any lock is released, no new lock may be acquired.

This separation ensures **serializability**: the result of concurrent transactions is equivalent to some sequential ordering, even though they ran in parallel. Two-phase locking is a foundational concept used internally by most enterprise DBMSs.

---

### Optimistic vs. Pessimistic Locking

DBMSs and applications generally follow one of two strategies for managing conflicts:

* **Pessimistic locking** assumes that conflicts are likely. Data is locked *before* any modification begins, preventing other users from accessing it until the transaction completes. This approach is safer but can reduce throughput when contention is low.

* **Optimistic locking** assumes that conflicts are rare. Transactions proceed without locking, but before committing, the system checks whether another transaction modified the same data in the meantime. If a conflict is detected, the transaction rolls back and retries.

| Strategy | Assumption | When to Use |
|----------|------------|-------------|
| **Pessimistic** | Conflicts are frequent | High-contention environments (e.g., inventory, banking) |
| **Optimistic** | Conflicts are rare | Read-heavy systems with infrequent writes |

In practice, many systems use a combination of both approaches depending on the operation and data sensitivity.

##### 🌍 Real-World Example
##### A national bank processes thousands of simultaneous account transfers each minute. The core ledger uses pessimistic locking on account balance rows to guarantee that no two transfers can update the same account at the same time. If pessimistic locking were replaced with optimistic locking, a high-frequency burst of concurrent transfers could produce incorrect balances, resulting in financial discrepancies that are difficult to audit and resolve.

---

### Deadlocks

A **deadlock** occurs when two or more transactions block each other in a circular wait, and none can proceed.

Example scenario:

* Transaction A locks Table 1 and waits for Table 2
* Transaction B locks Table 2 and waits for Table 1

Both transactions are waiting indefinitely.

#### Why Deadlocks Happen

Deadlocks arise from:

* Competing transactions accessing shared resources
* Poorly ordered locking strategies
* Long-running transactions

They are a natural consequence of concurrency, not a sign of failure.

#### How DBMSs Handle Deadlocks

Modern DBMSs automatically manage deadlocks by:

* **Detecting cycles** in lock dependencies
* **Choosing a victim transaction** to roll back
* Releasing locks so other transactions can proceed

From a DBA perspective, the goal is not to eliminate deadlocks entirely, but to **minimize their frequency and impact** through good design, indexing, and transaction management.

Concurrency control ensures that databases remain **correct, consistent, and usable** even under heavy simultaneous access. Without it, shared data systems would quickly become unreliable and untrustworthy.

[Image: figure-11.6-deadlock.png]
Caption: Deadlocks occur when transactions hold locks the other needs, requiring the DBMS to intervene and resolve the conflict.
Prompt: Diagram showing Transaction A locking Resource 1 and waiting for Resource 2, while Transaction B locks Resource 2 and waits for Resource 1. Circular dependency emphasized.

---

## 4. Transactions and Reliability

Concurrency control solves *who can access data at the same time*. Transactions solve a deeper question: **what happens when something goes wrong**. Transactions are the foundation of database reliability, ensuring that complex operations either complete correctly or leave the database unchanged.

### What Is a Transaction?

A **transaction** is a grouped unit of work that combines one or more database operations into a single, indivisible action.

Key characteristics:

* A transaction may include multiple statements (`INSERT`, `UPDATE`, `DELETE`)
* The database treats the group as **one operation**
* The transaction either fully succeeds, or fully fails, leaving no partial effects

This "all-or-nothing" behavior is essential when operations are interdependent.

Example from the grading system:

* Insert a new grade
* Update the student's average
* Record an audit log entry

If any step fails, none of the changes should persist.

### SQL Transaction Control

Transactions are controlled explicitly through SQL statements:

```sql
BEGIN TRANSACTION;

UPDATE STUDENT_GRADE SET Score = 92 WHERE GradeID = 5;
INSERT INTO AuditLog (Action, Timestamp) VALUES ('Grade Updated', CURRENT_TIMESTAMP);

COMMIT;  -- Saves all changes permanently
```

If a problem is detected before committing:

```sql
ROLLBACK;  -- Undoes all changes since BEGIN
```

The three key commands are:

* **`BEGIN TRANSACTION`** — Marks the start of a transaction
* **`COMMIT`** — Saves all changes permanently
* **`ROLLBACK`** — Undoes all changes, restoring the previous state

These commands give both applications and DBAs explicit control over when changes become permanent.

[Image: figure-11.8-transaction-lifecycle.png]
Caption: Transactions ensure that groups of operations either complete fully or leave the database unchanged.
Prompt: Flow diagram: BEGIN TRANSACTION then Operations then COMMIT (success path) or ROLLBACK (failure path).

---

### ACID Properties

Transactions are governed by four core guarantees, collectively known as **ACID**. These properties define what it means for a database to be reliable.

| Property | Meaning | Example |
|----------|---------|---------|
| **Atomicity** | All actions succeed or none do | Both the grade update and audit entry occur, or neither does |
| **Consistency** | Database remains valid before and after | No constraints are violated |
| **Isolation** | Transactions appear to occur independently | Two instructors editing grades do not interfere |
| **Durability** | Committed changes are permanent | Data persists after system failure |

#### Atomicity

Atomicity means **all or nothing**.

* Either every operation in the transaction completes
* Or none of them do

If a system crashes halfway through, the database rolls back to its previous state.

#### Consistency

Consistency ensures that transactions move the database from one **valid state** to another.

* All rules, constraints, and relationships must hold
* Foreign keys, data types, and business rules are enforced

A transaction cannot leave the database in an invalid condition.

#### Isolation

Isolation controls how transactions interact with each other.

* Each transaction behaves as if it were running alone
* Intermediate states are not visible to other users

This prevents dirty reads, lost updates, and inconsistent results.

#### Durability

Durability guarantees that once a transaction is committed, it is **permanent**.

* Data survives crashes, power failures, and restarts
* Changes are written to stable storage

If the system acknowledges success, the data must persist.

[Image: figure-11.7-acid-properties.png]
Caption: The ACID properties define the reliability guarantees that transactions provide in modern database systems.
Prompt: Four-quadrant diagram labeled Atomicity, Consistency, Isolation, Durability with brief one-line descriptions. Clean academic infographic.

---

### Why ACID Matters for Business Systems

ACID is not a technical luxury. It is a **business requirement**.

* **Financial accuracy**
  Incomplete or duplicated transactions result in incorrect balances, grades, or payments.

* **Auditability**
  Organizations must trust that records reflect what actually happened, not partial attempts.

* **Trust in reported results**
  Dashboards, reports, and decisions rely on data being complete and correct.

Without transactions and ACID guarantees, databases would behave like unreliable spreadsheets under stress. With them, databases become **systems of record** that organizations can depend on.

🔑 **Key Takeaway:**
ACID properties are what separate a professional database from a collection of files. Every business system that handles money, health records, grades, or inventory depends on these guarantees to remain trustworthy.

---

## 5. Database Security

Database security ensures that data is **accessible to the right users, protected from misuse, and available when needed**. From a DBA perspective, security is not optional or secondary. It is a core responsibility that directly affects organizational trust, legal compliance, and business continuity.

### Security Goals: The CIA Triad

Database security is built around three foundational goals, often referred to as the **CIA triad**:

* **Confidentiality**
  Sensitive data is accessible only to authorized users. Student records, grades, and personal information must not be exposed to unauthorized individuals.

* **Integrity**
  Data must remain accurate, complete, and unaltered except through approved processes. Unauthorized or accidental changes undermine trust in the system.

* **Availability**
  Authorized users must be able to access the database when needed. Security mechanisms should protect data without preventing legitimate use.

A secure database balances all three goals rather than optimizing one at the expense of the others.

[Image: figure-11.9-security-layers.png]
Caption: Database security relies on layered controls that protect confidentiality, integrity, and availability.
Prompt: Layered security diagram: Authentication then Authorization then Roles then Privileges then Data. Shield-style visual metaphor.

---

### Authentication vs. Authorization

Database security distinguishes between **identity** and **permission**.

* **Authentication** answers: *Who are you?*
  This is handled through usernames, passwords, certificates, biometric data, or integrated identity systems (tokens, single sign-on).

* **Authorization** answers: *What are you allowed to do?*
  Once authenticated, the database determines which operations the user may perform.

A user may be authenticated successfully but still restricted from reading, modifying, or deleting certain data.

---

### Roles and Privileges

Modern databases manage access through **roles** rather than individual users.

* **Roles** represent job functions or responsibilities (e.g., instructor, administrator, analyst).
* **Privileges** define allowed actions such as `SELECT`, `INSERT`, `UPDATE`, or `DELETE`.

Assigning privileges to roles rather than individuals:

* Simplifies management
* Reduces errors
* Supports consistent policy enforcement

This approach supports the **principle of least privilege**: users receive only the minimum permissions required to perform their tasks and no more.

#### Example: Grading Database Access Rights

Consider how different roles might access data in a grading system:

| Table | Teaching Assistants | Instructors | System Administrator |
|-------|-------------------|-------------|---------------------|
| **STUDENT** | Read | Read, Insert, Update | Full privileges |
| **STUDENT_GRADE** | Read | Read, Insert, Update, Delete | Full privileges |
| **GRADE_SCALE** | Read | Read | Full privileges |
| **ATTENDANCE** | Read, Insert | Read, Insert, Update | Full privileges |

Access rights are granted through **roles**, not directly to individual users, to simplify management and auditing.

[Image: figure-11.10-rbac.png]
Caption: Role-based access control simplifies security management by separating users from direct privilege assignments.
Prompt: Diagram showing users assigned to roles, roles assigned privileges, privileges applied to tables.

---

### DBMS Security Guidelines

Beyond roles and privileges, DBAs follow established security practices:

* **Enforce the principle of least privilege** — grant only the permissions necessary for each role.
* **Require strong authentication** — enforce password policies, multi-factor authentication where supported.
* **Audit all administrative activities** — maintain logs of who accessed or modified data and when.
* **Encrypt data at rest and in transit** — protect data from interception or unauthorized physical access.
* **Regularly review and revoke unnecessary permissions** — accounts and roles should be audited periodically.

---

### Security Risks

DBAs must actively guard against multiple categories of risk:

* **Unauthorized access**
  External attackers or misconfigured permissions can expose sensitive data.

* **Accidental data loss**
  Legitimate users with excessive privileges may unintentionally delete or overwrite data.

* **Insider threats**
  Authorized users may misuse access, intentionally or unintentionally, causing harm.

* **SQL injection**
  Malicious input submitted through application interfaces can manipulate database queries. Parameterized queries and input validation are essential defenses.

❗ **Important:**
SQL injection remains one of the most common and preventable database attacks. Applications that build SQL statements using unvalidated user input are vulnerable. Always use parameterized queries when passing user-supplied values to the database.

Effective database security combines technical controls, monitoring, and disciplined access management to minimize these risks while supporting normal operations.

##### 🌍 Real-World Example
##### A healthcare clinic stores patient records in a SQL Server database. HIPAA compliance requires that only treating physicians can view full patient records, while billing staff can see insurance information but not diagnostic notes. The DBA configured role-based access control to enforce these boundaries and enabled audit logging on all access to sensitive tables. When a routine audit detected an employee querying records outside their assigned patient list, the log provided the evidence needed for an internal review.

---

## 6. Backup and Recovery

Backup and recovery are the DBA's **last line of defense** against data loss. No matter how well a system is designed or secured, failures are inevitable. The difference between a minor incident and a catastrophic outage is almost always the quality of the backup and recovery strategy.

### Why Databases Fail

Databases fail for many reasons, often outside the DBA's direct control:

* **Hardware failure**
  Disk crashes, memory failures, or power loss can instantly make data unavailable.

* **Software bugs**
  Errors in the DBMS, applications, or updates can corrupt data or cause system crashes.

* **Human error**
  Accidental deletions, incorrect updates, or misconfigured scripts are among the most common causes of data loss.

* **Malicious activity**
  Attacks such as ransomware, unauthorized access, or intentional sabotage can compromise or destroy data.

* **Environmental disasters**
  Fires, floods, and other physical events can damage servers and infrastructure.

Because failure is not a question of *if* but *when*, backups must be planned, tested, and maintained continuously.

---

### Backup Strategies

DBAs typically combine multiple backup types to balance reliability, storage cost, and recovery speed.

* **Full backups**
  A complete copy of the entire database at a specific point in time.
  * Simplest to restore
  * Most storage-intensive
  * Typically performed on a scheduled basis (e.g., weekly)

* **Incremental backups**
  Store only the changes made since the last backup (full or incremental).
  * Efficient storage use
  * Faster to create
  * Slower recovery because multiple backups must be applied in sequence

* **Differential backups**
  Store all changes since the last full backup.
  * Faster recovery than incremental backups
  * Larger than incremental backups but smaller than full backups

A common strategy is **periodic full backups combined with frequent incremental or differential backups**.

[Image: figure-11.11-backup-strategies.png]
Caption: Backup strategies determine how databases can be restored after failure or data loss.
Prompt: Timeline diagram showing full backup, incremental backups, and recovery points. Include rollback and rollforward paths.

---

### Recovery Techniques

Recovery methods depend on the type of failure and the available backups.

| Method | Description | When Used |
|--------|-------------|-----------|
| **Rollback** | Undoing incomplete or incorrect transactions using before-images from the log | Errors detected immediately; incomplete transactions after a crash |
| **Rollforward** | Restoring from a backup and reapplying logged changes (after-images) up to a specific point | System crashes or data corruption requiring point-in-time recovery |
| **Reprocessing** | Re-entering transactions from external sources when logs or backups are incomplete | Last resort when logs are unavailable; slow and error-prone |

---

### Recovery Logs

Recovery relies heavily on **transaction logs**, which record every change made to the database.

* **Before-images**
  The state of data before a change occurs.
  Used to undo operations during rollback.

* **After-images**
  The state of data after a change occurs.
  Used to reapply changes during rollforward.

Logging ensures that databases can recover to a **consistent, known state**, even after unexpected failures. Without logs, precise recovery would be impossible, and data integrity could not be guaranteed.

[Image: figure-11.12-recovery-log.png]
Caption: Transaction logs enable databases to recover reliably by replaying or undoing changes.
Prompt: Diagram showing transaction log with before-image and after-image entries, linked to rollback and rollforward recovery.

---

### Journal Modes

Different DBMSs use different logging strategies. SQLite supports two primary journal modes:

* **Rollback journal (delete mode)** — The default. Before modifying a page, SQLite writes the original content to a separate journal file. If the transaction is rolled back or the system crashes, the journal restores the original state.

* **Write-Ahead Logging (WAL)** — Instead of writing before-images to a journal, changes are written to a WAL file first. The original database remains untouched until a checkpoint occurs. WAL mode offers better concurrency (readers do not block writers) and improved crash recovery.

Understanding journal modes helps DBAs make informed decisions about reliability, concurrency, and performance trade-offs.

Effective backup and recovery planning transforms failures from disasters into manageable events. It is one of the clearest indicators of a mature database administration practice.

##### 🌍 Real-World Example
##### A payroll services company runs a weekly full backup and nightly differential backups of its SQL Server database. One Friday morning, a misconfigured script accidentally truncated the employee hours table. Because the nightly differential backup from Thursday was available, the DBA restored the table to its Thursday state and reprocessed Friday's time entries from the payroll system's input logs. Total data loss was less than one business day. Without the differential backup, the recovery would have taken days and required manual data re-entry from paper records.

---

## 7. Performance Monitoring and Tuning

Performance is not a one-time optimization task. It is an ongoing responsibility that sits with database administration. A database that works well in development can become slow, unstable, or unusable as data volume and user activity increase.

### Why Performance Is a DBA Concern

Performance problems directly affect both users and the organization:

* **Slow databases frustrate users**
  Delays in loading reports, dashboards, or transaction screens reduce productivity and confidence in the system.

* **Poor performance undermines decision-making**
  If analytics and reports take too long to run, they are less likely to be used, delaying or distorting business decisions.

* **Performance issues often appear only at scale**
  Queries that seem harmless on small datasets can become bottlenecks when tables grow or when many users access the system simultaneously.

Because performance degrades gradually, DBAs must monitor systems continuously rather than reacting only after complaints arise.

[Image: figure-11.13-query-bottleneck.png]
Caption: Performance issues often arise from a combination of query design, indexing, locking, and hardware constraints.
Prompt: Diagram showing query path with bottlenecks labeled: missing index, lock contention, slow disk, inefficient query.

---

### Common Performance Factors

Several recurring issues are responsible for most database performance problems:

* **Poor indexing**
  Queries are forced to scan entire tables instead of locating rows efficiently.

* **Inefficient queries**
  Unnecessary joins, poorly written conditions, or repeated calculations increase execution time.

* **Lock contention**
  Too many users competing for the same data can cause waits, timeouts, or deadlocks.

* **Hardware constraints**
  Limited memory, slow disks, or insufficient CPU resources can bottleneck even well-designed databases.

Effective tuning requires understanding both the **logical design** of the database and the **physical environment** in which it runs.

---

### Indexes

Indexes are one of the most powerful tools for improving database performance.

* **Why indexes speed up queries**
  An index allows the DBMS to locate rows quickly without scanning the entire table, similar to how an index in a book lets you jump directly to relevant pages.

* **Trade-offs: faster reads vs. slower writes**
  While indexes improve read performance, they add overhead to insert, update, and delete operations because the index must be maintained. Not every column should be indexed.

DBAs can verify whether indexes are being used effectively. For example, in SQLite:

```sql
EXPLAIN QUERY PLAN
SELECT * FROM STUDENT_GRADE WHERE StudentID = 5;
```

This command shows whether the DBMS is using an index or performing a full table scan, helping the DBA make informed indexing decisions.

[Image: figure-11.14-index-tradeoff.png]
Caption: Indexes accelerate read operations but introduce overhead during inserts and updates.
Prompt: Balanced scale diagram showing faster reads on one side and slower writes on the other, with indexes in the center.

Indexes will be explored in more depth in Chapter 13, but from a DBA perspective they represent a core performance lever that must be applied thoughtfully and monitored over time.

Performance monitoring and tuning are where database administration becomes both technical and strategic, balancing user needs, system limits, and long-term growth.

---

## 8. Cursors and Multi-User Processing

In some situations, applications need to process query results **one row at a time** rather than operating on the entire result set at once. A **cursor** is a database mechanism that provides a pointer into a result set, allowing row-by-row navigation and processing.

### Types of Cursors

* **Static cursor** — Takes a snapshot of the result set at the time the cursor is opened. Changes made by other users after the snapshot are not visible. Simple and predictable.

* **Dynamic cursor** — Reflects real-time changes to the underlying data. If another user inserts, updates, or deletes a row, the dynamic cursor sees the change. More flexible but more resource-intensive.

* **Keyset cursor** — A hybrid approach. The set of rows is fixed when the cursor is opened (like static), but changes to column values in those rows are visible (like dynamic). New rows inserted by others are not visible; deleted rows become inaccessible.

### When Cursors Are Used

Cursors are commonly used in:

* Procedural SQL (stored procedures and triggers)
* Application-level logic where row-by-row processing is required
* Report generation that requires sequential evaluation of records

### DBA Consideration

Cursors consume memory and processing resources, especially dynamic cursors in high-concurrency environments. DBAs should be aware of cursor usage patterns and encourage set-based SQL operations (which process entire result sets at once) whenever possible, as they are generally more efficient.

💡 **Tip:**
If you find yourself writing a cursor to process rows one at a time, ask whether the same result can be achieved with a single set-based SQL statement. In most cases it can, and the performance difference will be significant on large tables.

---

## 9. Database Maintenance and Evolution

Databases are living systems. Once deployed, they continue to change as data grows, users evolve, and business requirements shift. Database administration is not only about keeping systems running today. It is also about ensuring they remain reliable and adaptable over time.

### Ongoing Maintenance Tasks

Regular maintenance prevents small issues from becoming serious failures. Common DBA maintenance responsibilities include:

* **Integrity checks**
  Verifying that constraints, relationships, and references remain valid. This helps detect corruption or logical inconsistencies early.

  ```sql
  PRAGMA integrity_check;  -- SQLite example
  ```

* **Reindexing**
  Over time, indexes can become fragmented due to frequent inserts, updates, and deletes. Reindexing restores efficient access paths and improves query performance.

  ```sql
  REINDEX;  -- SQLite example
  ```

* **Cleanup and compaction**
  Removing unused data, temporary records, or obsolete objects reduces storage usage and improves performance, especially in long-running systems.

  ```sql
  VACUUM;  -- SQLite: reclaims unused space and defragments the database file
  ```

* **Monitoring growth**
  Tracking table sizes, index growth, and transaction volume allows DBAs to anticipate capacity needs before limits are reached.

These tasks are typically scheduled and automated, but they still require oversight and interpretation by a skilled administrator. A simple maintenance script might look like:

```sql
-- Maintenance routine
PRAGMA integrity_check;
VACUUM;
REINDEX;
```

[Image: figure-11.15-maintenance-cycle.png]
Caption: Database maintenance is an ongoing cycle that preserves performance, integrity, and reliability.
Prompt: Circular lifecycle diagram: Monitor then Tune then Backup then Audit then Update then Monitor.

---

### Schema Changes Over Time

No database schema remains static.

* **Why requirements always change**
  New reports are needed, policies evolve, regulations change, and systems are extended to support new workflows or users.

* **How good design reduces migration pain**
  Normalized structures, clear relationships, and well-defined keys make schema changes easier and safer. Poorly designed databases are brittle and difficult to modify without breaking existing functionality. This is one of the reasons normalization, covered in Chapter 7, pays long-term dividends.

* **Importance of backward compatibility**
  Many systems depend on existing tables, queries, and applications. DBAs must manage changes carefully so new features do not disrupt current operations or invalidate historical data.

Database maintenance and evolution highlight why administration is a long-term commitment. Well-designed databases age gracefully, while poorly designed ones become increasingly costly to maintain.

---

## 10. DBA Work in Modern Environments

Database administration looks different today than it did a decade ago. While the core responsibilities remain the same, the environments in which databases run have diversified. Modern DBAs must understand both lightweight, file-based systems and large-scale, cloud-hosted platforms.

### File-Based vs. Server-Based DBMSs

Not all databases operate in the same way, and administration practices vary accordingly.

* **File-based DBMSs (SQLite and Microsoft Access)**
  These systems store the entire database in a single file. They are easy to set up, portable, and ideal for learning, prototyping, and small-scale applications.
  Administration tasks are minimal, but also limited:
  * Concurrency is restricted (SQLite uses database-level write locks).
  * Security is often handled at the file or operating system level.
  * Backup typically involves copying the database file.

* **Server-based DBMSs (PostgreSQL, SQL Server, Oracle)**
  These systems run as dedicated services that manage multiple users, concurrent transactions, and large volumes of data.
  DBA responsibilities expand significantly:
  * User and role management
  * Fine-grained security controls
  * Advanced backup, replication, and recovery strategies
  * Performance tuning and resource allocation

Understanding both categories helps explain why concepts learned in Access or SQLite still matter, even when working with enterprise platforms.

[Image: figure-11.16-file-vs-server.png]
Caption: File-based and server-based DBMSs differ significantly in concurrency, scalability, and administrative complexity.
Prompt: Comparison diagram showing file-based databases on one side and server-based databases on the other, highlighting users, concurrency, and administration differences.

---

### Cloud Considerations

Cloud databases introduce new opportunities and new responsibilities.

* **Availability and uptime**
  Cloud providers offer built-in redundancy, failover, and geographic replication. DBAs must still design systems that take advantage of these features and define acceptable downtime.

* **Cost management**
  Storage, compute, and query volume often directly affect cost. Poor design or inefficient queries can become expensive at scale.

* **Shared responsibility models**
  Cloud providers manage infrastructure and hardware, but DBAs remain responsible for:
  * Data design and integrity
  * Security configuration
  * Backup policies and recovery plans
  * Performance optimization at the schema and query level

[Image: figure-11.17-cloud-responsibility.png]
Caption: In cloud databases, infrastructure is managed by the provider, while data governance and performance remain the DBA's responsibility.
Prompt: Stack diagram dividing responsibilities between Cloud Provider and DBA: infrastructure vs. schema, security, and performance.

In modern environments, the DBA role has expanded rather than disappeared. Whether working with local files, enterprise servers, or cloud platforms, effective database administration remains essential for reliable, secure, and scalable systems.

---

## Chapter Summary

Database administration is both a **technical** and a **managerial** discipline. It completes the lifecycle of a database system, bridging the gap between design and long-term operational reliability. The core themes of this chapter can be summarized as follows:

* **Database administration is an ongoing responsibility, not a one-time task.** Even a perfectly designed database requires continuous oversight to maintain performance, security, and integrity.

* **Concurrency control protects shared data.** Through locking mechanisms, two-phase locking, and pessimistic or optimistic strategies, databases ensure that simultaneous access does not produce lost updates or corrupted data.

* **Transactions and ACID properties guarantee reliability.** By grouping operations into atomic, consistent, isolated, and durable units, transactions prevent partial failures from leaving the database in an invalid state.

* **Security is a layered responsibility.** Authentication verifies identity, authorization controls access, and role-based access control ensures that users can only perform actions appropriate to their function. The principle of least privilege reduces risk.

* **Backup and recovery planning is non-negotiable.** Full, incremental, and differential backups, combined with transaction logs, before-images, and after-images, enable recovery from every category of failure.

* **Performance monitoring and tuning prevent degradation over time.** Indexes, query analysis, and proactive monitoring keep databases responsive as data volume and usage grow.

* **Maintenance keeps systems healthy.** Integrity checks, reindexing, compaction, and schema evolution are recurring responsibilities that distinguish sustainable systems from brittle ones.

* **DBA principles are platform-independent.** Whether working with Microsoft Access, SQLite, PostgreSQL, or cloud-hosted platforms, the fundamental responsibilities of concurrency control, security, backup, and performance remain the same.

Through concurrency control, security enforcement, and recovery planning, DBAs serve as the guardians of organizational data integrity. A skilled DBA ensures that data remains **accurate**, **secure**, and **recoverable**, that systems maintain **availability** under concurrent loads, and that organizations meet **compliance** and **governance** standards. Chapter 12 builds on this foundation to explore how well-administered databases power business intelligence and analytics.

---

## Key Terms

* **ACID Properties** — Atomicity, Consistency, Isolation, and Durability; the four guarantees that define reliable transaction processing.
* **After-Image** — A log record capturing the state of data after a change, used during rollforward recovery.
* **Authentication** — The process of verifying a user's identity before granting database access.
* **Authorization** — Determining what actions an authenticated user is permitted to perform.
* **Backup** — A copy of the database (full, incremental, or differential) used for recovery after failure.
* **Before-Image** — A log record capturing the state of data before a change, used during rollback recovery.
* **Capacity Planning** — Anticipating future storage, memory, and processing needs to prevent resource exhaustion.
* **CIA Triad** — Confidentiality, Integrity, and Availability; the three foundational goals of information security.
* **Concurrency Control** — Mechanisms that manage simultaneous access to a database, preventing conflicts and data corruption.
* **Cursor** — A database mechanism for navigating through a result set one row at a time.
* **Data Administration (DA)** — The organizational function responsible for data governance, policies, standards, and compliance.
* **Database Administration (DBA)** — The technical function responsible for managing database security, performance, availability, and recovery.
* **Deadlock** — A situation in which two or more transactions are waiting for each other's locks, preventing any from proceeding.
* **Differential Backup** — A backup that captures all changes since the last full backup.
* **Durability** — The ACID property guaranteeing that committed transactions survive system failures.
* **Exclusive Lock** — A lock that prevents any other transaction from reading or writing the locked data.
* **Full Backup** — A complete copy of the entire database at a specific point in time.
* **Incremental Backup** — A backup that captures only the changes since the last backup of any type.
* **Index** — A data structure that speeds up data retrieval at the cost of additional write overhead.
* **Isolation** — The ACID property ensuring that concurrent transactions do not interfere with each other.
* **Lock Granularity** — The level of detail at which locks are applied: row-level, table-level, or database-level.
* **Optimistic Locking** — A concurrency strategy that allows transactions to proceed without locks and checks for conflicts only before committing.
* **Pessimistic Locking** — A concurrency strategy that locks data before modification to prevent conflicts.
* **Principle of Least Privilege** — The security practice of granting users only the minimum permissions necessary.
* **Recovery Log** — A file recording all database changes (before-images and after-images) to support rollback and rollforward recovery.
* **Referential Integrity** — A constraint ensuring that foreign key values always correspond to existing primary key values.
* **Role-Based Access Control (RBAC)** — A security model that assigns permissions to roles rather than individual users.
* **Rollback** — Undoing uncommitted or erroneous transactions using before-images.
* **Rollforward** — Reapplying committed transactions from a log after restoring from a backup.
* **Service Level Agreement (SLA)** — A formal agreement defining expectations for uptime, performance, backup frequency, and recovery time.
* **Shared Lock** — A lock that allows multiple transactions to read the same data simultaneously but prevents modification.
* **Transaction** — A logical unit of work consisting of one or more database operations that must succeed or fail as a whole.
* **Two-Phase Locking (2PL)** — A concurrency control protocol with a growing phase (acquiring locks) and a shrinking phase (releasing locks) to ensure serializability.
* **Write-Ahead Logging (WAL)** — A journal mode in which changes are written to a log file before modifying the database, improving concurrency and crash recovery.

---

## Review Questions

1. What is the difference between Data Administration and Database Administration? Why do larger organizations separate these roles?
2. Explain the three pillars of database administration and give an example of each using the Grading Database.
3. What is the lost update problem, and how do locks prevent it?
4. Compare shared locks and exclusive locks. When is each type used?
5. Describe the two-phase locking protocol. Why does it guarantee serializability?
6. When would a DBA choose optimistic locking over pessimistic locking?
7. Explain each of the ACID properties and why they matter for business systems.
8. Write a SQL transaction that inserts a new student and a grade for that student. Show how `ROLLBACK` would be used if the grade insert fails.
9. Compare full, incremental, and differential backups. What are the trade-offs of each?
10. Explain the difference between rollback and rollforward recovery. When is each used?
11. What is the principle of least privilege, and how does role-based access control support it?
12. Why do indexes improve read performance but slow down write operations?
13. How do DBA responsibilities differ between SQLite (file-based) and PostgreSQL (server-based)?
14. What does the shared responsibility model mean in cloud database administration?

---

## Let's Build: Database Administration for the Grading Database

This final section translates DBA concepts into concrete practice using the course's **Grading Database**. The goal is not to turn you into a production DBA overnight. The goal is to help you **recognize administrative responsibilities**, understand **why they matter**, and practice them in realistic, controlled settings.

We begin with **Microsoft Access**, because its visual interface makes administrative concepts tangible and easier to reason about before moving to SQL-centric platforms.

---

## Hands-On DBA Tutorial 1: Microsoft Access

### Why Start with Microsoft Access?

Microsoft Access is particularly effective for learning database administration concepts because:

* Administrative actions are **visible and explicit**
* You can observe the effects of design and control decisions immediately
* Many enterprise concepts (transactions, constraints, integrity) are present, just simplified

Access helps bridge the gap between **conceptual DBA knowledge** and **technical execution**.

---

### Step 1: Identifying Critical Tables and Relationships

In the Grading Database, not all tables are equally sensitive.

**High-risk tables** (require the most protection):

* **STUDENT** — Personally identifiable information (PII)
* **STUDENT_GRADE** — Academic performance data
* **ATTENDANCE** — Participation records

**Why this matters:**
DBAs prioritize protection based on **impact**. Losing or corrupting grade data has far greater consequences than losing a schedule description.

[Image: figure-11.A-table-criticality.png]
Caption: Not all tables carry equal risk; DBAs prioritize protection based on the business impact of data loss or corruption.
Prompt: Grading Database tables ranked by criticality, using a color-coded tier system (high, medium, low risk). Clean academic style.

---

### Step 2: Enforcing Data Integrity with Relationships

1. Open **Database Tools > Relationships**
2. Add the following tables: STUDENT, DELIVERABLE, STUDENT_GRADE
3. Create relationships:
   * STUDENT.StudentID > STUDENT_GRADE.StudentID
   * DELIVERABLE.DeliverableID > STUDENT_GRADE.DeliverableID
4. Enable:
   * **Enforce Referential Integrity**
   * **Cascade Update Related Fields**
   * (Do *not* enable Cascade Delete at this stage)

**What this demonstrates:**

* How DBAs prevent orphaned records
* How structure enforces business rules automatically
* Why integrity checks reduce downstream errors

[Image: figure-11.B-access-relationships.png]
Caption: The Relationships window in Access makes referential integrity visible and enforceable through a visual interface.
Prompt: Screenshot of the Access Relationships window with STUDENT, DELIVERABLE, and STUDENT_GRADE tables connected, Enforce Referential Integrity checkbox highlighted.

---

### Step 3: Transaction Awareness (Conceptual in Access)

While Access does not expose `BEGIN TRANSACTION` in the same way as server-based DBMSs, it still **executes operations transactionally**.

**Exercise:**

1. Attempt to insert a STUDENT_GRADE record with a nonexistent StudentID
2. Observe the error and rollback behavior

**Lesson:**

* Transactions protect the database even when users make mistakes
* ACID principles exist even when hidden from view

---

### Step 4: Simulated Backup and Restore

**Backup in Access (Manual Simulation):**

1. Close the database
2. Copy the `.accdb` file to a backup location
3. Rename it with a timestamp: `GradingDB_backup_2026_03_15.accdb`

**Restore Simulation:**

1. Reopen the backup copy
2. Verify table contents and relationships

**What this teaches:**

* File-based backup concepts
* Why backup frequency matters
* Why DBAs automate this process in enterprise systems

---

### Step 5: Basic Performance and Maintenance Tasks

**Compact and Repair:**

1. Go to **Database Tools > Compact and Repair Database**

**Why this matters:**

* Reclaims unused space
* Improves performance
* Reduces file corruption risk

**Index Awareness:**

1. Open STUDENT table in Design View
2. Confirm:
   * Primary key indexed
   * Email field indexed (No Duplicates)

**Lesson:**
Indexes are administrative decisions, not just design choices. Every index is a performance trade-off.

---

### Step 6: Security and Access Control (Conceptual Preview)

Although Access has limited role-based security compared to enterprise DBMSs:

* You can restrict access by:
  * File permissions
  * Front-end / back-end separation
* This introduces the idea that:
  * **Not all users should see or modify all data**

**DBA mindset introduced:**

* Protect by default
* Grant only what is necessary
* Separate data storage from data entry interfaces

---

### What You Should Take Away from the Access Tutorial

By administering the Grading Database in Access, you have practiced:

* Identifying critical data assets
* Enforcing integrity through relationships
* Understanding transactional safety
* Performing backup and maintenance tasks
* Thinking like a DBA, not just a query writer

These same responsibilities will reappear in more explicit, code-driven forms when we move to **SQLite** and **Supabase (PostgreSQL)** in the next sections.

---

## Hands-On DBA Tutorial 2: SQLite

This section revisits database administration concepts using **SQLite**, a lightweight but fully relational database engine. While SQLite lacks a centralized server and dedicated DBA interface, it is widely used in production environments (mobile apps, embedded systems, analytics tools), which makes it an excellent platform for understanding **practical, code-driven database administration**.

The emphasis here is on **explicit control**: unlike Microsoft Access, SQLite makes administrative responsibilities visible through SQL commands and file-level operations.

---

### Why SQLite for DBA Practice?

SQLite is valuable for learning DBA fundamentals because:

* It uses **real SQL** for schema, constraints, and transactions
* Administrative actions are **not hidden behind a GUI**
* The entire database lives in a **single file**, making backup and recovery concrete
* It exposes the **limits and responsibilities** of file-based databases

SQLite forces you to think like both a **developer and an administrator**.

### Tools Used

You may use either (or both):

* **SQLiteOnline** (browser-based, no installation): [sqliteonline.com](https://sqliteonline.com)
* **DB Browser for SQLite** (desktop GUI with SQL editor)

All examples below are compatible with both.

---

### Step 1: Understanding the SQLite Database File

In SQLite, the database *is* the file.

* One `.db` or `.sqlite` file contains:
  * Tables
  * Indexes
  * Data
  * Constraints
* There is no separate server process

**DBA implication:**
If the file is corrupted, deleted, or overwritten, the entire database is affected.

---

### Step 2: Enforcing Integrity Explicitly

SQLite **does not enforce foreign keys by default**.

Before doing anything else, enable them:

```sql
PRAGMA foreign_keys = ON;
```

**Why this matters:**

* Without this, foreign key constraints are silently ignored
* SQLite trusts the DBA to turn safety features on

**Lesson:**
DBA responsibility includes *knowing what the DBMS does not protect by default*.

---

### Step 3: Transaction Control in SQLite

SQLite supports explicit transaction control.

**Example: Transactional Insert**

```sql
BEGIN TRANSACTION;

INSERT INTO STUDENT (StudentID, FirstName, LastName, Email)
VALUES (10, 'Test', 'Student', 'test@student.edu');

INSERT INTO STUDENT_GRADE (GradeID, StudentID, DeliverableID, Score)
VALUES (999, 10, 1, 95);

COMMIT;
```

If any statement fails, you can manually roll back:

```sql
ROLLBACK;
```

**What this demonstrates:**

* Atomicity: either everything succeeds or nothing does
* Why transactions are critical for multi-step operations
* How SQLite enforces ACID behavior despite being lightweight

---

### Step 4: Simulated Failure and Recovery

**Scenario: Accidental Data Deletion**

```sql
DELETE FROM STUDENT_GRADE;
```

This removes *all grades*.

**Recovery (File-Based):**

* Restore from a backup copy of the database file
* SQLite has no built-in recovery beyond logs and backups

**DBA lesson:**

* SQLite relies heavily on **external backup discipline**
* Backups are not optional, even for "small" databases

---

### Step 5: Backup Strategy (SQLite Style)

**Manual Backup:**

1. Close all database connections
2. Copy the database file:
   ```
   grading.db > grading_backup_2026_03_15.db
   ```

**Command-Line Backup (Advanced):**

```
sqlite3 grading.db ".backup 'grading_backup_2026_03_15.db'"
```

**Takeaway:**

* Backup frequency depends on update rate and business criticality
* File-based systems demand careful operational discipline

---

### Step 6: Integrity Checking

SQLite includes a built-in integrity check:

```sql
PRAGMA integrity_check;
```

**Result:**

* Returns `ok` if the database structure is sound
* Flags corruption or index inconsistencies otherwise

**DBA insight:**
Integrity checks are proactive safeguards. They detect problems *before* users do.

---

### Step 7: Index Awareness and Performance

**Creating an Index:**

```sql
CREATE INDEX idx_student_grade_student
ON STUDENT_GRADE(StudentID);
```

**Why this matters:**

* Speeds up joins and filters
* Essential for analytics queries

**Verifying Index Usage:**

```sql
EXPLAIN QUERY PLAN
SELECT * FROM STUDENT_GRADE WHERE StudentID = 5;
```

This shows whether SQLite is using the index or performing a full table scan.

**Trade-off:**

* Faster reads
* Slower writes
* More storage

**DBA decision-making:**
Indexes are strategic choices, not defaults.

---

### Step 8: Journal Mode and Concurrency

**Check the current journal mode:**

```sql
PRAGMA journal_mode;
```

**Switch to Write-Ahead Logging (WAL) for better concurrency:**

```sql
PRAGMA journal_mode = WAL;
```

WAL mode enables **non-blocking reads** alongside writes and provides **automatic crash recovery**. This is a practical DBA decision that improves both reliability and performance.

---

### Step 9: Security Realities in SQLite

SQLite has **no built-in user authentication**.

Security relies on:

* File system permissions
* Application-layer access control
* Encryption tools (external)

**Implication:**
SQLite is best suited for single-user applications, trusted environments, and embedded systems.

**Lesson:**
DBA responsibilities extend beyond the database engine itself.

---

### What This Tutorial Reinforces

By administering the Grading Database in SQLite, you practiced:

* Explicit transaction control
* File-based backup and recovery
* Integrity enforcement
* Performance tuning with indexes
* Journal mode configuration
* Security awareness without server-level protections

SQLite highlights a critical DBA truth:

> Lightweight databases still require heavyweight responsibility.

---

## Hands-On DBA Tutorial 3: Supabase (PostgreSQL in the Cloud)

This final hands-on tutorial shifts database administration from **local and file-based systems** to a **cloud-based, enterprise-grade DBMS**. Supabase runs on **PostgreSQL**, which means you are now working in an environment where **DBA responsibilities are shared** between you and the platform provider.

This section focuses on **modern database administration realities**: availability, security, performance, and governance in a managed cloud environment.

---

### Why Supabase for DBA Practice?

Supabase is ideal for learning cloud DBA concepts because:

* It uses **real PostgreSQL**, not a simplified variant
* It exposes **SQL-level control** while handling infrastructure for you
* It makes **security, roles, and access control unavoidable**
* It mirrors how modern production databases are actually managed

Supabase introduces a key reality: **DBA work does not disappear in the cloud. It changes.**

---

### The Shared Responsibility Model

In Supabase and most cloud DBMSs, responsibilities are divided:

**Handled by Supabase:**

* Physical hardware
* Operating system
* Database engine installation and patching
* High availability and replication
* Automated backups

**Handled by You (the DBA):**

* Schema design and constraints
* Role and permission management
* Query performance
* Data integrity
* Business logic enforcement

---

### Step 1: Project Setup and Environment Awareness

**Creating a Project:**

1. Log in to **supabase.com**
2. Create a new project (for example: *Grading Database*)
3. Choose region and database password
4. Wait for provisioning to complete

**What the DBA should notice:**

* PostgreSQL is already running
* No server configuration required
* The database is immediately accessible via SQL

This is **deployment as an administrative abstraction**.

---

### Step 2: Roles, Authentication, and Access Control

Supabase introduces **role-based access control (RBAC)**.

**Key Roles:**

* `postgres` — superuser (full control)
* `anon` — public access (limited)
* `authenticated` — logged-in users
* Custom roles (recommended for real systems)

**DBA Principle:**
Permissions should be assigned to **roles**, not individuals.

**Example: Granting Read Access**

```sql
GRANT SELECT ON STUDENT TO authenticated;
```

**Why this matters:**

* Prevents accidental modification
* Enforces least privilege
* Supports multi-user environments

---

### Step 3: Enforcing Data Integrity with Constraints

Unlike SQLite, PostgreSQL **enforces constraints by default**.

**Foreign Key Example:**

```sql
ALTER TABLE STUDENT_GRADE
ADD CONSTRAINT fk_student
FOREIGN KEY (StudentID)
REFERENCES STUDENT(StudentID);
```

**DBA insight:**
Constraints shift responsibility from application code to the database. This improves reliability and auditability.

---

### Step 4: Transactions in a Multi-User Environment

PostgreSQL provides full ACID compliance.

**Transactional Update Example:**

```sql
BEGIN;

UPDATE STUDENT_GRADE
SET Score = Score + 5
WHERE DeliverableID = 2;

COMMIT;
```

**If something goes wrong:**

```sql
ROLLBACK;
```

**Why this matters in the cloud:**

* Multiple users may modify data simultaneously
* Transactions prevent partial updates
* Isolation ensures users do not see inconsistent data

---

### Step 5: Backup, Recovery, and Versioning

Supabase provides **automated backups**.

**DBA Responsibilities Still Include:**

* Understanding backup frequency
* Knowing recovery windows
* Planning for logical errors (not just crashes)

**Key Insight:**
Backups protect against **system failure**, not always **human error**. Deleting rows intentionally still requires recovery planning.

---

### Step 6: Monitoring and Performance Awareness

Supabase provides dashboards for:

* Query performance
* Connection usage
* Storage growth

**DBA-Level Actions:**

* Identify slow queries
* Add indexes strategically
* Monitor query patterns

**Index Example:**

```sql
CREATE INDEX idx_grade_student
ON STUDENT_GRADE(StudentID);
```

**Cloud reality:**
Performance problems scale faster in shared environments.

---

### Step 7: Security Beyond the Database

Supabase integrates:

* Authentication
* API access
* Row-level security (RLS)

**Conceptual Example:**
Only allow students to see *their own* grades.

```sql
CREATE POLICY student_view_own_grades
ON STUDENT_GRADE
FOR SELECT
USING (auth.uid() = StudentID);
```

**DBA Insight:**
Modern DBAs help design **data governance**, not just schemas.

---

### Step 8: Availability, Trust, and Business Impact

Cloud databases raise expectations:

* Always-on access
* Fast response times
* Secure data handling

**DBA choices affect:**

* User trust
* System uptime
* Legal and compliance exposure

Administration decisions are **business decisions**.

---

### What This Tutorial Reinforces

By administering the Grading Database in Supabase, you practiced:

* Cloud-based role and permission management
* Transaction safety in multi-user systems
* Constraint enforcement at scale
* Performance tuning in shared environments
* Understanding shared responsibility models

Supabase highlights a final DBA truth:

> The cloud reduces server-management burdens, not accountability.

---

### Closing Perspective Across All Three Tutorials

| Platform | DBA Emphasis |
|----------|-------------|
| MS Access | Visual administration and local control |
| SQLite | Explicit responsibility and file-based discipline |
| Supabase | Governance, security, and scalability |

Together, these environments show that **database administration is not tool specific**. The principles remain constant, even as platforms evolve.
