# RAT 11 — Top Questions (Optimized)

**Source:** Chapter 11 — Database Administration (ch11-main-2026-06-17.md)
**Date:** 2026-06-17
**Total:** 10 questions (2 multi-select + 8 multiple-choice)
**Bloom distribution:** 3 Understand, 5 Apply, 2 Analyze
**Selection criteria:** Core DBA concepts — ACID properties, DBA responsibilities, concurrency control, transactions, deadlocks, backup strategies, RBAC, recovery logs, locking strategies, and performance tuning.
**CSV file:** `rat-11-optimized.csv`

---

<div style="background: #F0FDFA; border-left: 4px solid #0F766E; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0;">
<p style="margin: 0 0 8px 0; font-size: 1.05em; color: #18181b;">This <strong>Reading Assessment Test (RAT)</strong> is based on <strong style="color: #0f766e;">Chapter 11: Database Administration</strong> in the course textbook, <a rel="noopener" href="https://data-pilot.dimapublishing.com/" style="color: #0e7490; font-weight: 600; text-decoration: none;"> <strong>Using Data to Drive Business Performance</strong> </a>.</p>
<p style="margin: 0; font-size: 0.95em; color: #18181b;">Make sure you complete reading the chapter and then answer the questions here: <a rel="noopener" href="https://data-pilot.dimapublishing.com/book/ch11/introduction/1" style="color: #4f46e5; font-weight: 600; text-decoration: none;"> Chapter 11 — Database Administration → </a></p>
</div>

---

## Multi-Select Questions

**Q1. ACID properties**

*Short description: ACID properties*

Chapter 11 introduces ACID as the foundation of reliable database transactions. Which statements correctly describe ACID properties?

Select ALL that apply.

A. Atomicity ensures a transaction is all-or-nothing — either every step completes successfully or the entire transaction is rolled back  ← ✓ CORRECT
*Feedback: Correct — atomicity means the DBMS treats a multi-step transaction as a single unit. If any step fails, all changes are undone.*

B. Consistency means the database automatically optimizes query performance for every transaction
*Feedback: Incorrect — consistency means a transaction moves the database from one valid state to another, preserving all defined rules and constraints. It is not about query optimization.*

C. Isolation ensures concurrent transactions do not interfere with each other — each transaction appears to run alone  ← ✓ CORRECT
*Feedback: Correct — isolation prevents the problems of concurrent access (dirty reads, non-repeatable reads, phantom reads) so transactions do not see each other's intermediate states.*

D. Durability guarantees that once a transaction is committed, it survives system failures — the result is permanent  ← ✓ CORRECT
*Feedback: Correct — durability means committed data is written to stable storage (disk, write-ahead log) and will survive crashes, power loss, or hardware failures.*

E. ACID properties only apply to financial databases — they are unnecessary for educational or analytical systems
*Feedback: Incorrect — Chapter 11 emphasizes that ACID is relevant to ANY multi-user database where data integrity matters, from banking to grading systems.*

**Hint:** ACID = Atomicity (all-or-nothing), Consistency (valid state), Isolation (no interference), Durability (permanent).

**Explanation:** Chapter 11 presents ACID as the four essential guarantees of transaction processing: Atomicity (all-or-nothing execution), Consistency (valid state transitions), Isolation (concurrent transactions don't interfere), and Durability (committed data survives failures). These properties ensure that databases remain reliable even under concurrent access and system failures.

**Points:** 2 | **Difficulty:** 3/5 | **ID:** BITM330-RAT11-Q1 | **Bloom:** Understand

---

**Q2. DBA responsibilities**

*Short description: DBA responsibilities*

Chapter 11 describes the role of the Database Administrator (DBA). Which responsibilities does the chapter identify as core DBA duties?

Select ALL that apply.

A. Managing backup and recovery — ensuring data can be restored after hardware failure, human error, or disaster  ← ✓ CORRECT
*Feedback: Correct — backup and recovery is a primary DBA responsibility. The DBA designs backup strategies and tests recovery procedures.*

B. Implementing security and access control — managing user accounts, permissions, and role-based access  ← ✓ CORRECT
*Feedback: Correct — the DBA controls who can access what data through authentication, authorization, and role-based access control (RBAC).*

C. Writing all SQL queries for end users — the DBA serves as the only interface to the database
*Feedback: Incorrect — DBAs manage the database environment, not write every query. End users and analysts write their own queries against properly secured databases.*

D. Monitoring and tuning performance — identifying slow queries, managing indexes, and optimizing resource usage  ← ✓ CORRECT
*Feedback: Correct — performance monitoring and tuning is an ongoing DBA responsibility to ensure the database responds quickly as data volume and user count grow.*

E. Designing ER diagrams and normalization — the DBA is primarily a database designer
*Feedback: Incorrect — database design is a separate role (often performed by data architects or developers). The DBA focuses on operational management of running databases.*

**Hint:** DBA = operational management: security, backup, performance, maintenance. Design is a separate role.

**Explanation:** Chapter 11 positions the DBA as the operational steward of the database: responsible for security and access control, backup and recovery planning, performance monitoring and tuning, maintenance, and ensuring ACID reliability. The DBA role is distinct from database design.

**Points:** 2 | **Difficulty:** 3/5 | **ID:** BITM330-RAT11-Q2 | **Bloom:** Understand

---

## Multiple-Choice Questions

**Q3. Concurrency control**

*Short description: Concurrency control*

Two instructors try to update the same student's grade simultaneously. The DBMS prevents them from interfering with each other. According to Chapter 11, what mechanism provides this protection?

A. Normalization — separating data into related tables prevents update conflicts
*Feedback: Incorrect — normalization reduces redundancy but does not manage simultaneous access by multiple users.*

B. Concurrency control — locking mechanisms and isolation levels ensure transactions do not interfere with each other  ← ✓ CORRECT
*Feedback: Correct — concurrency control uses locks and isolation levels to manage simultaneous access, preventing lost updates, dirty reads, and other interference.*

C. ACID consistency — the database rejects any transaction that changes a grade
*Feedback: Incorrect — consistency ensures valid state transitions, not simultaneous access management.*

D. Triggers — automated database programs that fire when a grade changes
*Feedback: Incorrect — triggers respond to data changes but do not manage simultaneous access by multiple users.*

**Hint:** Multiple users changing the same data simultaneously requires what kind of control?

**Explanation:** Chapter 11 explains concurrency control as the set of mechanisms (locks, isolation levels, two-phase locking) that allow multiple users to work with the same database simultaneously without corrupting data.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT11-Q3 | **Bloom:** Understand

---

**Q4. Transaction definition**

*Short description: Transaction definition*

According to Chapter 11, what is a database transaction?

A. A SQL SELECT query that retrieves data without modifying it
*Feedback: Incorrect — a SELECT is a query, which may be part of a transaction, but a transaction is a broader concept of grouped operations.*

B. A logical unit of work — one or more database operations that must succeed or fail together as a single unit  ← ✓ CORRECT
*Feedback: Correct — a transaction groups multiple SQL statements into an all-or-nothing unit.*

C. The process of converting a flat table into normalized tables
*Feedback: Incorrect — that is database design or data migration, not a transaction.*

D. A backup copy of the database stored in a separate location
*Feedback: Incorrect — that is a backup, not a transaction. Transactions manage live data operations.*

**Hint:** A transaction groups operations so they succeed together or fail together.

**Explanation:** Chapter 11 defines a transaction as a logical unit of work — a sequence of database operations that must be treated as a single, indivisible unit. If any operation fails, the entire transaction is rolled back.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT11-Q4 | **Bloom:** Understand

---

**Q5. Deadlock**

*Short description: Deadlock*

Transaction A locks Table X and then waits for Table Y. Transaction B locks Table Y and then waits for Table X. Neither can proceed. According to Chapter 11, what is this situation called?

A. Transaction timeout — both transactions will automatically abort after a set time period
*Feedback: Incorrect — while timeouts can break deadlocks, the situation itself is a deadlock.*

B. Deadlock — two transactions each hold a lock the other needs, creating a circular wait  ← ✓ CORRECT
*Feedback: Correct — deadlock occurs when each transaction waits for a resource held by the other. Neither can proceed until one releases its lock.*

C. Lock escalation — the DBMS upgrades row-level locks to table-level locks
*Feedback: Incorrect — lock escalation converts many fine-grained locks into fewer coarse ones for efficiency, not to resolve circular waits.*

D. Optimistic locking — both transactions assume no conflict and proceed without locking
*Feedback: Incorrect — optimistic locking avoids locks by checking for conflicts at commit time. This scenario describes actual locking with a circular dependency.*

**Hint:** Circular wait: A waits for B's resource, B waits for A's resource. What is this called?

**Explanation:** Chapter 11 describes deadlock as a situation where two or more transactions form a circular dependency. The DBMS detects deadlocks and resolves them by aborting one transaction (the victim), rolling back its work, and allowing the other to proceed.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT11-Q5 | **Bloom:** Apply

---

**Q6. Backup types**

*Short description: Backup types*

A DBA runs a full backup every Sunday and backs up only the data that changed since Sunday on Tuesday. According to Chapter 11, what type of backup is the Tuesday backup?

A. Full backup — all data is copied each time
*Feedback: Incorrect — a full backup copies everything. The Tuesday backup only copies changes.*

B. Differential backup — it copies all changes since the last full backup
*Feedback: Incorrect — differential backup copies all changes since the last FULL backup (cumulative). The question describes an incremental backup.*

C. Incremental backup — it copies only the data that changed since the last backup of any type  ← ✓ CORRECT
*Feedback: Correct — incremental backup captures only changes since the most recent backup, minimizing time and storage per backup.*

D. Mirror backup — a real-time copy maintained on a separate server
*Feedback: Incorrect — mirroring maintains a live synchronized copy, not periodic backups of changes.*

**Hint:** Full = everything. Differential = all changes since last full. Incremental = only changes since last backup.

**Explanation:** Chapter 11 distinguishes three backup types: full (complete copy), differential (all changes since the last full backup — cumulative), and incremental (only changes since the last backup of any type — smallest/fastest).

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT11-Q6 | **Bloom:** Apply

---

**Q7. Role-based access control**

*Short description: RBAC*

A university database gives instructors permission to update grades for their own courses but not to view student financial records. According to Chapter 11, what security model implements this?

A. Role-Based Access Control (RBAC) — permissions are assigned to roles rather than individual users  ← ✓ CORRECT
*Feedback: Correct — RBAC groups users into roles and assigns permissions to roles. Instructors get grade-update permissions; registrars get financial-record access.*

B. Discretionary Access Control — each user decides who can access their own data
*Feedback: Incorrect — discretionary access control lets data owners grant permissions. The scenario describes centrally managed role-based permissions.*

C. Mandatory Access Control — the operating system enforces security classifications
*Feedback: Incorrect — mandatory access control uses system-enforced security labels. The scenario describes role-based access management.*

D. Network firewall — the database is protected by restricting IP addresses
*Feedback: Incorrect — a firewall protects at the network level. RBAC protects at the database level based on user roles.*

**Hint:** Permissions assigned to roles (Instructor, Student, Admin), not individuals. What model is this?

**Explanation:** Chapter 11 presents Role-Based Access Control (RBAC) as the standard database security model. Users are assigned to roles, and permissions are granted to roles. This simplifies administration.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT11-Q7 | **Bloom:** Apply

---

**Q8. Recovery log**

*Short description: Recovery log*

After a power failure, the DBMS uses a recovery log to restore the database to a consistent state. According to Chapter 11, what does the recovery log record?

A. Only the SQL queries that users submitted — SELECT statements are replayed in order
*Feedback: Incorrect — SELECT queries do not change data and are not logged for recovery.*

B. Every change to the database — before-images and after-images of modified data, recorded in a write-ahead log before changes are applied  ← ✓ CORRECT
*Feedback: Correct — the write-ahead log records all modifications to stable storage BEFORE the actual data is changed, enabling undo/redo during recovery.*

C. Only failed transactions — the DBMS only logs operations that did not complete successfully
*Feedback: Incorrect — the log records ALL changes so the DBMS can undo uncommitted transactions and redo committed ones after a crash.*

D. The current state of every table — a snapshot taken before each transaction begins
*Feedback: Incorrect — the log records individual changes, not full table snapshots.*

**Hint:** The recovery log writes changes BEFORE applying them to the database. Why? So it can undo or redo after a crash.

**Explanation:** Chapter 11 explains the write-ahead log as the foundation of recovery. After a crash, the DBMS uses the log to UNDO uncommitted transactions (rollback) and REDO committed ones (roll-forward).

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT11-Q8 | **Bloom:** Apply

---

**Q9. Optimistic vs pessimistic locking**

*Short description: Locking strategies*

A DBA chooses a locking strategy for a database where most transactions read data and conflicts are rare. According to Chapter 11, which strategy is most appropriate?

A. Pessimistic locking — lock resources before reading to prevent any possibility of conflict
*Feedback: Incorrect — pessimistic locking acquires locks early, which adds overhead even when conflicts are rare.*

B. Optimistic locking — assume conflicts are rare, proceed without locks, and check for conflicts only at commit time  ← ✓ CORRECT
*Feedback: Correct — optimistic locking is ideal for read-heavy, low-conflict workloads. It avoids lock overhead.*

C. No locking — disable all concurrency control since conflicts are rare
*Feedback: Incorrect — even if conflicts are rare, completely disabling concurrency control risks data corruption when conflicts do occur.*

D. Two-phase locking — acquire all locks before any operation and release all after commit
*Feedback: Incorrect — two-phase locking is a protocol for ensuring serializability, not a choice between optimistic and pessimistic strategies.*

**Hint:** If conflicts are rare, why pay the overhead of locking everything? Check for conflicts only when committing.

**Explanation:** Chapter 11 contrasts pessimistic locking (acquire locks early) with optimistic locking (assume conflicts are rare, check at commit time). Optimistic locking is preferred for read-heavy, low-conflict environments.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT11-Q9 | **Bloom:** Apply

---

**Q10. Performance tuning**

*Short description: Performance tuning*

A query that used to run in under a second now takes 30 seconds after the database grew to 100,000 rows. According to Chapter 11, what should the DBA investigate FIRST?

A. Rewrite the query as a stored procedure — stored procedures always run faster than regular SQL
*Feedback: Incorrect — the first step is diagnosing WHY performance degraded, not assuming a specific fix.*

B. Check whether the query can use an index — missing indexes are the most common cause of performance degradation as data grows  ← ✓ CORRECT
*Feedback: Correct — indexes are the primary tool for query performance. As tables grow, queries without proper indexes switch to slow full-table scans.*

C. Restore the database from backup — the performance problem indicates data corruption
*Feedback: Incorrect — slower performance as data grows is expected without proper indexing, not a sign of corruption.*

D. Add more RAM to the server — hardware upgrades are the first response to performance problems
*Feedback: Incorrect — Chapter 11 emphasizes that hardware upgrades should come AFTER software optimization. Indexing and query tuning come first.*

**Hint:** As tables grow, the DBMS scans more data. What structure helps the DBMS find rows without scanning everything?

**Explanation:** Chapter 11 emphasizes that performance tuning starts with diagnosis: examine query plans, check for missing indexes, analyze slow queries. Indexes are the most impactful tool. Hardware upgrades are the last resort, not the first step.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT11-Q10 | **Bloom:** Analyze

---

## Quick-Reference Answer Key

| # | Type | Correct Answer(s) | Points | Difficulty | Bloom |
|---|------|-------------------|--------|------------|-------|
| 1 | MS   | A, C, D           | 2      | 3          | Understand |
| 2 | MS   | A, B, D           | 2      | 3          | Understand |
| 3 | MC   | B                 | 1      | 2          | Understand |
| 4 | MC   | B                 | 1      | 2          | Understand |
| 5 | MC   | B                 | 1      | 2          | Apply |
| 6 | MC   | C                 | 1      | 2          | Apply |
| 7 | MC   | A                 | 1      | 2          | Apply |
| 8 | MC   | B                 | 1      | 3          | Apply |
| 9 | MC   | B                 | 1      | 3          | Apply |
| 10 | MC   | B                 | 1      | 3          | Analyze |
