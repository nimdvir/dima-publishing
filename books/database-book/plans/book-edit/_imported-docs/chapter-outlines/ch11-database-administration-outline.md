<!-- metadata: date="2026-06-11"; chapter="11"; type="outline"; title="Chapter 11 Outline"; description="Chapter 11 structural outline" -->

# Chapter 11 Outline: Database Administration

Keeping Data Secure, Available, and Reliable

This outline follows the chapter structure and keeps only chapter sections reflected in the manuscript.

## Chapter Overview

* Reposition the course from database design and SQL use toward the operational work that keeps databases dependable after deployment.
* Frame database administration as the discipline responsible for reliability, security, performance, and recoverability over time.
* Present the DBA as the guardian of organizational data and connect administrative decisions to business continuity, trust, and compliance.
* Bridge backward to Chapters 6, 7, and 9, then forward to Chapter 12 by showing that analytics depend on well-administered systems.

## Learning Objectives

* Explain the role and responsibilities of a Database Administrator.
* Distinguish Data Administration from Database Administration.
* Describe concurrency control, transaction management, security, backup and recovery, performance monitoring, and platform differences.
* Compare DBA work across file-based, server-based, and cloud environments.

## 1. What Is Database Administration?

* Define database administration as the operational and strategic work of keeping a live database healthy over time.
* Contrast database design's focus on structure with database administration's focus on ongoing correctness, safety, and performance.
* Show why a well-designed database still fails without active monitoring, maintenance, security, and recovery planning.

### The DBA Role in Context

* Explain how live systems change continuously through inserts, updates, deletes, concurrent access, new requirements, failures, and attacks.
* Reinforce that a database cannot be treated as a finished artifact once deployed.
* Use the hospital EHR example to show the operational consequences of missing indexes and neglected maintenance.

### Data Administration vs. Database Administration

* Separate organization-wide governance and policy work from technical database implementation and support.
* Explain Data Administration as standards, metadata, ownership, privacy, and compliance.
* Explain Database Administration as security, performance, uptime, backup, recovery, and system-level enforcement.
* Reinforce that small organizations may combine these roles, while larger organizations usually separate them.

## 2. Core DBA Responsibilities

* Organize the DBA role around a small set of recurring responsibilities that apply across Access, SQLite, PostgreSQL, and cloud platforms.
* Position the DBA as the person responsible for reliability, security, and performance under real operating conditions.

### The Three Pillars of Database Administration

* Explain concurrency control as the work of protecting shared data when many users or processes interact with the same system.
* Explain security and access management as the work of ensuring users can do only what their roles require.
* Explain backup and recovery as the work of preparing the database to survive errors, outages, and data loss events.
* Use the Grading Database to ground these pillars in familiar examples such as grade updates, access restrictions, and restoration after accidental deletion.

### Additional Responsibilities

* Add monitoring, performance tuning, capacity planning, documentation, and change management to the DBA responsibility set.
* Show how DBAs coordinate with developers, infrastructure teams, and service-level expectations.
* Use the online retailer example to connect monitoring, role-based security, backup, and rapid recovery to business operations.

## 3. Multi-User Databases and Concurrency Control

* Introduce concurrency control as the mechanism that allows simultaneous access without sacrificing correctness.
* Show that concurrency problems are inevitable in shared systems, not rare exceptions.

### Why Concurrency Is a Problem

* Explain lost updates, inconsistent reads, and corrupted data as typical results of uncontrolled simultaneous access.
* Use the grading system example of instructors, students, and automated processes acting at the same time.

### Locking Concepts

* Define shared locks for reads and exclusive locks for writes.
* Explain lock granularity at the row, table, and database level as a trade-off between concurrency and overhead.
* Reinforce that DBAs balance safety, throughput, and system simplicity.

### Two-Phase Locking

* Explain the growing and shrinking phases of two-phase locking.
* Connect 2PL to serializability and to the internal behavior of enterprise DBMSs.

### Optimistic vs. Pessimistic Locking

* Contrast conflict-expected and conflict-rare strategies for multi-user processing.
* Show when each strategy is appropriate and why high-contention environments often favor pessimistic locking.
* Use the banking example to show the consequences of choosing the wrong concurrency strategy.

### Deadlocks

* Define deadlocks as circular waits between competing transactions.
* Explain why they occur, how DBMSs detect and resolve them, and why the DBA goal is reduction rather than total elimination.

## 4. Transactions and Reliability

* Shift from simultaneous access to the question of what happens when a sequence of related operations fails partway through.
* Present transactions as the core reliability mechanism that keeps business data consistent.

### What Is a Transaction?

* Define a transaction as a grouped unit of work that must succeed or fail as a whole.
* Use the grading example of inserting a grade, updating an average, and writing an audit entry to show why partial completion is unacceptable.

### SQL Transaction Control

* Explain the role of `BEGIN TRANSACTION`, `COMMIT`, and `ROLLBACK`.
* Reinforce that transactions give both applications and DBAs explicit control over when changes become permanent.

### ACID Properties

* Define Atomicity, Consistency, Isolation, and Durability as the guarantees that make transaction processing trustworthy.
* Explain each property in operational terms and tie each one to familiar grading-system behavior.

### Why ACID Matters for Business Systems

* Connect transactions to financial accuracy, auditability, trustworthy reporting, and systems of record.
* Reinforce that professional database systems differ from file collections because of these guarantees.

## 5. Database Security

* Present security as a core DBA function rather than a secondary application concern.
* Frame security around organizational trust, legal compliance, and business continuity.

### Security Goals: The CIA Triad

* Define confidentiality, integrity, and availability as the three goals that shape database security.
* Show why an effective security posture balances all three rather than over-optimizing one.

### Authentication vs. Authorization

* Separate identity verification from permission management.
* Reinforce that a valid user may still be restricted from viewing or changing specific data.

### Roles and Privileges

* Explain role-based access control as a scalable way to assign permissions through job functions.
* Use the Grading Database rights matrix to show how different roles receive different access to tables and actions.
* Reinforce the principle of least privilege.

### DBMS Security Guidelines

* Summarize practical security administration: strong authentication, logging, encryption, permission review, and auditability.
* Emphasize that security controls must be maintained over time, not configured once and forgotten.

### Security Risks

* Cover unauthorized access, accidental loss, insider threats, and SQL injection.
* Reinforce parameterized queries and access discipline as practical defenses.
* Use the healthcare example to show security boundaries and audit logging in a regulated environment.

## 6. Backup and Recovery

* Present backup and recovery as the DBA's last line of defense when failures happen.
* Reinforce that mature systems assume failure and plan for it explicitly.

### Why Databases Fail

* Cover hardware failure, software defects, human error, malicious activity, and environmental disasters.
* Reinforce that backup planning is about inevitability, not pessimism.

### Backup Strategies

* Compare full, incremental, and differential backups in terms of storage cost, speed, and recovery complexity.
* Show why organizations often combine periodic full backups with more frequent change-based backups.

### Recovery Techniques

* Explain rollback, rollforward, and reprocessing as recovery options tied to different failure scenarios.
* Reinforce that recovery method depends on both the nature of the failure and the quality of the available logs and backups.

### Recovery Logs

* Define before-images and after-images and explain their roles in undoing or replaying changes.
* Reinforce the importance of logs in restoring the database to a consistent state.

### Journal Modes

* Use SQLite rollback journaling and WAL mode to show how logging strategy affects both recovery and concurrency.
* Connect journal-mode choices to DBA trade-offs rather than treating them as implementation trivia.

## 7. Performance Monitoring and Tuning

* Present performance as an ongoing administrative concern that grows in importance as data volume and user activity increase.
* Reinforce that performance problems damage user trust and reduce the value of reports and analytics.

### Why Performance Is a DBA Concern

* Explain how slow databases reduce productivity, delay decisions, and often emerge only when systems scale.
* Reinforce the need for proactive monitoring rather than complaint-driven reaction.

### Common Performance Factors

* Cover poor indexing, inefficient queries, lock contention, and hardware bottlenecks.
* Emphasize that tuning requires both logical understanding of the schema and awareness of the physical environment.

### Indexes

* Explain why indexes accelerate reads and slow writes.
* Use `EXPLAIN QUERY PLAN` in SQLite to show how DBAs verify whether indexing decisions are actually helping.
* Bridge forward to Chapter 13, where indexing is treated in more depth.

## 8. Cursors and Multi-User Processing

* Introduce cursors as row-by-row processing tools used when set-based logic is not sufficient.
* Reinforce that cursors matter to DBAs because they consume resources and can affect concurrency behavior.

### Types of Cursors

* Distinguish static, dynamic, and keyset cursors by how they respond to changes in the underlying result set.

### When Cursors Are Used

* Place cursors in procedural SQL, stored procedures, triggers, and sequential report logic.

### DBA Consideration

* Reinforce that set-based SQL is usually more efficient and that cursor usage should be visible to administrative oversight.

## 9. Database Maintenance and Evolution

* Present databases as living systems that require scheduled care and controlled change over time.
* Reinforce that long-term maintenance distinguishes sustainable systems from brittle ones.

### Ongoing Maintenance Tasks

* Cover integrity checks, reindexing, cleanup, compaction, and growth monitoring as recurring administrative duties.
* Use the SQLite examples with `PRAGMA integrity_check`, `VACUUM`, and `REINDEX` to make maintenance concrete.

### Schema Changes Over Time

* Explain that requirements evolve and that good relational design reduces migration pain.
* Reinforce the value of backward compatibility and the Chapter 7 normalization connection.

## 10. DBA Work in Modern Environments

* Expand the DBA discussion from traditional local databases to file-based, server-based, and cloud-managed systems.
* Reinforce that the core responsibilities remain stable even when the platform changes.

### File-Based vs. Server-Based DBMSs

* Compare SQLite and Access with server-based systems such as PostgreSQL and SQL Server.
* Explain how concurrency, security, backup, and tuning responsibilities change as platforms become more multi-user and service-oriented.

### Cloud Considerations

* Introduce availability, uptime, cost management, and shared-responsibility models as defining cloud concerns.
* Reinforce that cloud providers reduce infrastructure burdens without removing DBA accountability for data design, security, and performance.

## Chapter Summary

* Reaffirm that database administration completes the lifecycle of a database system by turning design into ongoing operational reliability.
* Summarize the chapter's major themes: concurrency control, transactions, security, backup and recovery, performance tuning, maintenance, and platform-aware administration.
* Emphasize that DBA principles are platform-independent even when tools differ.
* Bridge forward to Chapter 12 by showing that business intelligence depends on accurate, secure, and available data systems.

## Let's Build

The Chapter 11 Let's Build section should guide students through database administration practice using the Grading Database across three environments: Microsoft Access, SQLite, and Supabase. The sequence should move from visible relationship management and manual file-based administration in Access, to explicit transaction control, integrity checks, indexing, and journal-mode decisions in SQLite, and then to cloud-oriented role management, constraints, monitoring, backup awareness, and shared-responsibility thinking in Supabase. The practical emphasis should stay on learning how a DBA protects integrity, recovery, security, and performance across different platforms rather than on platform setup alone.

## Lab

The Chapter 11 lab should ask students to apply DBA thinking to a live or simulated grading database by identifying high-risk tables, defining access boundaries, testing constraint enforcement, describing a transaction and rollback scenario, comparing backup options, checking integrity or maintenance routines, and explaining how administration choices would differ across Access, SQLite, and a cloud-hosted PostgreSQL environment. The work should stay introductory but concrete, focused on operational reliability and governance rather than on design alone.
