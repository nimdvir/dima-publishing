<!-- metadata: date="2026-06-11"; chapter="11"; section="terms"; title="Chapter 11 Terms Treasury"; description="Key terms for database administration" -->

# Chapter 11: Database Administration — Term Treasury

---

## Essential Vocabulary

### A

- **ACID Properties** — Atomicity, Consistency, Isolation, and Durability; the four guarantees that define reliable transaction processing.
- **After-Image** — A log record capturing the state of data after a change, used during rollforward recovery.
- **Atomicity** — The ACID property meaning "all or nothing"; either every operation in a transaction completes, or none of them do.
- **Authentication** — The process of verifying a user's identity before granting database access (e.g., username, password, biometric, token, single sign-on).
- **Authorization** — Determining what actions an authenticated user is permitted to perform within a database.
- **Availability** — The security goal ensuring authorized users can access the database when needed.

### B

- **Backup** — A copy of the database (full, incremental, or differential) used for recovery after failure.
- **Backward Compatibility** — The principle that schema changes and new features must not disrupt current operations or invalidate historical data.
- **Before-Image** — A log record capturing the state of data before a change, used during rollback recovery.

### C

- **Capacity Planning** — Anticipating future storage, memory, and processing needs to prevent resource exhaustion.
- **CIA Triad** — Confidentiality, Integrity, and Availability; the three foundational goals of information security.
- **Compaction (Cleanup)** — Removing unused data, temporary records, or obsolete objects to reduce storage usage and improve performance (e.g., `VACUUM` in SQLite).
- **Concurrency Control** — Mechanisms that manage simultaneous access to a database, preventing conflicts and data corruption.
- **Confidentiality** — The security goal ensuring sensitive data is accessible only to authorized users.
- **Consistency** — The ACID property ensuring that transactions move the database from one valid state to another.
- **Corrupted Data** — Data left in an invalid or unusable state by incomplete transactions without proper concurrency control.
- **Cursor** — A database mechanism that provides a pointer into a result set, allowing row-by-row navigation and processing.

### D

- **Data Administration (DA)** — The organizational function responsible for data governance, policies, standards, naming conventions, metadata management, and compliance across the organization.
- **Database Administration (DBA)** — The technical function responsible for managing database security, performance, availability, recovery, user access, and enforcing constraints at the system level.
- **Database Administrator (DBA)** — The person who manages the technical, operational, and strategic aspects of databases.
- **Database-Level Lock** — A lock applied to the entire database; rare, usually used only during maintenance.
- **Deadlock** — A situation in which two or more transactions wait for each other's locks in a circular dependency, preventing any from proceeding.
- **Differential Backup** — A backup capturing all changes since the last full backup; faster recovery than incremental, smaller than full.
- **Dirty Read** — Reading data that is in the middle of being changed by another transaction.
- **Durability** — The ACID property guaranteeing that once a transaction is committed, it is permanent.
- **Dynamic Cursor** — A cursor that reflects real-time changes to underlying data; more flexible but more resource-intensive.

### E

- **Exclusive Lock (Write Lock)** — A lock that prevents any other transaction from reading or writing the locked data; required for INSERT, UPDATE, and DELETE.

### F

- **Full Backup** — A complete copy of the entire database at a specific point in time; simplest to restore but most storage-intensive.

### G

- **Growing Phase** — The first phase of Two-Phase Locking where a transaction acquires all needed locks; no lock may be released.

### I

- **Inconsistent Read** — A user reads data that is in the middle of being changed, resulting in partial or contradictory information.
- **Incremental Backup** — A backup capturing only changes since the last backup of any type; efficient storage but slower recovery.
- **Index** — A data structure that speeds up data retrieval by allowing the DBMS to locate rows quickly without scanning the entire table.
- **Insider Threat** — A security risk from authorized users who may misuse access, intentionally or unintentionally.
- **Integrity** — The security goal ensuring data remains accurate, complete, and unaltered except through approved processes.
- **Integrity Check** — Verifying that constraints, relationships, and references remain valid (e.g., `PRAGMA integrity_check` in SQLite).
- **Isolation** — The ACID property ensuring that concurrent transactions do not interfere with each other.

### K

- **Keyset Cursor** — A hybrid cursor: the set of rows is fixed when opened, but changes to column values are visible; new rows inserted by others are not visible.

### L

- **Lock** — A temporary control that regulates access to data while it is being read or modified.
- **Lock Contention** — A performance problem caused by too many users competing for the same data.
- **Lock Granularity** — The level of detail at which locks are applied: row-level, table-level, or database-level.
- **Logical Unit of Work** — Another name for a transaction; a sequence of operations that must fully complete or not occur at all.
- **Lost Update** — A concurrency problem where two users update the same record and one update silently overwrites the other.

### O

- **Optimistic Locking** — A concurrency strategy that assumes conflicts are rare; transactions proceed without locks and conflicts are checked before committing.

### P

- **Pessimistic Locking** — A concurrency strategy that assumes conflicts are likely; data is locked before modification begins.
- **Principle of Least Privilege** — The security practice of granting users only the minimum permissions necessary for their tasks.
- **Privilege** — A specific allowed action on a database object (e.g., SELECT, INSERT, UPDATE, DELETE).

### R

- **Recovery Log (Transaction Log)** — A file recording all database changes (before-images and after-images) to support rollback and rollforward recovery.
- **Referential Integrity** — A constraint ensuring that foreign key values correspond to existing primary key values.
- **Reindexing** — Rebuilding indexes that have become fragmented due to frequent modifications (e.g., `REINDEX` in SQLite).
- **Reprocessing** — A recovery technique involving re-entering transactions from external sources when logs or backups are incomplete; typically a last resort.
- **Role** — A named collection of privileges representing a job function (e.g., instructor, administrator, analyst).
- **Role-Based Access Control (RBAC)** — A security model that assigns permissions to roles rather than individual users.
- **Rollback** — Undoing uncommitted or erroneous transactions using before-images from the transaction log.
- **Rollback Journal (Delete Mode)** — SQLite's default journal mode; writes original content to a separate journal file before modifying a page.
- **Rollforward** — Reapplying committed transactions from a log after restoring from a backup, up to a specific point in time.
- **Row-Level Lock** — A lock applied only to specific rows being modified; highest concurrency but higher overhead.
- **Row-Level Security (RLS)** — A security mechanism (e.g., in PostgreSQL/Supabase) that restricts which rows a user can access based on policies.

### S

- **Serializability** — The guarantee that concurrent transactions produce results equivalent to some sequential ordering.
- **Service Level Agreement (SLA)** — A formal agreement defining expectations for uptime, performance, backup frequency, and recovery time.
- **Shared Lock (Read Lock)** — A lock that allows multiple transactions to read data simultaneously but prevents modification.
- **Shared Responsibility Model** — In cloud databases, the division where the provider manages infrastructure and the DBA manages schema, security, backup policies, and performance.
- **Shrinking Phase** — The second phase of Two-Phase Locking where a transaction releases its locks; once any lock is released, no new lock may be acquired.
- **SQL Injection** — A security attack where malicious input manipulates database queries; defended by parameterized queries and input validation.
- **Static Cursor** — A cursor that takes a snapshot of the result set when opened; subsequent changes are not visible.

### T

- **Table-Level Lock** — A lock applied to an entire table; simpler but restricts concurrent access.
- **Transaction** — A logical unit of work consisting of one or more database operations that must succeed or fail as a whole.
- **Two-Phase Locking (2PL)** — A concurrency control protocol with a growing phase (acquiring locks) and a shrinking phase (releasing locks) that ensures serializability.

### W

- **Write-Ahead Logging (WAL)** — A journal mode where changes are written to a log file before modifying the database; offers better concurrency and improved crash recovery.

---

## Acronyms

| Acronym | Full Meaning |
|---------|-------------|
| **2PL** | Two-Phase Locking |
| **ACID** | Atomicity, Consistency, Isolation, Durability |
| **API** | Application Programming Interface |
| **BITM** | Business IT Management |
| **CIA** | Confidentiality, Integrity, Availability |
| **DA** | Data Administration |
| **DBA** | Database Administration / Database Administrator |
| **DBMS** | Database Management System |
| **ER** | Entity-Relationship |
| **GDPR** | General Data Protection Regulation |
| **GUI** | Graphical User Interface |
| **IS** | Information Systems |
| **PII** | Personally Identifiable Information |
| **RBAC** | Role-Based Access Control |
| **RLS** | Row-Level Security |
| **SLA** | Service Level Agreement |
| **SQL** | Structured Query Language |
| **WAL** | Write-Ahead Logging |

---

## Key Concepts

### Foundational Ideas

1. **The DBA as Guardian of Organizational Data** — The database administrator ensures reliability, security, performance, and recoverability across the full lifecycle of a database system.

2. **Database Administration Is Ongoing** — Even a perfectly designed database can fail without active administration. Performance degrades, storage fills up, security gaps emerge, and data integrity is compromised without ongoing oversight.

3. **Data Administration vs. Database Administration** — DA is organization-wide (governance, privacy, compliance, metadata, policies). DBA is system-specific (security, performance, backups, constraints). DA sets the rules; DBA enforces them through technology.

4. **Three Pillars of Database Administration** — (1) Concurrency Control, (2) Security and Access Management, (3) Backup and Recovery. These apply regardless of platform.

5. **ACID as a Business Requirement** — ACID properties ensure financial accuracy, auditability, and trust. Without them, databases behave like unreliable spreadsheets under stress.

6. **The CIA Triad** — Database security is built on Confidentiality (access restricted to authorized users), Integrity (data remains accurate), and Availability (database is accessible when needed).

7. **DBA Principles Are Platform-Independent** — Whether working with Access, SQLite, PostgreSQL, or cloud-hosted platforms, the fundamental responsibilities remain the same.

### Concept Overview

1. **Concurrency Control** — Mechanisms allowing multiple users to access and modify a database simultaneously without sacrificing correctness.

2. **Locking** — Shared (read) locks allow concurrent reads; exclusive (write) locks prevent any other access during modification. Granularity: row-level, table-level, database-level.

3. **Two-Phase Locking (2PL)** — Growing phase (acquire locks) then shrinking phase (release locks), ensuring serializability.

4. **Optimistic vs. Pessimistic Locking** — Pessimistic locks data early (frequent conflicts expected); optimistic proceeds without locks and checks before committing (rare conflicts expected).

5. **Deadlocks** — Circular waits among transactions; DBMSs detect and resolve by rolling back a victim transaction.

6. **Transactions** — Logical units of work grouping operations into indivisible actions: `BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`.

7. **ACID Properties** — Atomicity (all-or-nothing), Consistency (valid state to valid state), Isolation (invisible mid-flight), Durability (committed = permanent).

8. **Authentication & Authorization** — Authentication verifies identity ("Who are you?"); Authorization determines permissions ("What can you do?").

9. **Role-Based Access Control (RBAC)** — Permissions assigned to roles (not individuals) based on job functions, supporting the principle of least privilege.

10. **Backup Strategies** — Full (complete copy), Incremental (changes since last backup), Differential (changes since last full). Typically combined.

11. **Recovery Techniques** — Rollback (undo with before-images), Rollforward (restore + reapply with after-images), Reprocessing (re-enter transactions; last resort).

12. **Transaction Logs** — Record every change via before-images and after-images, enabling precise recovery.

13. **Journal Modes** — SQLite supports Rollback Journal (delete mode) and WAL mode (better concurrency and crash recovery).

14. **Indexes** — Speed up reads but slow writes; a core DBA performance lever.

15. **Cursors** — Pointers for row-by-row navigation: Static (snapshot), Dynamic (real-time), Keyset (hybrid). Set-based operations are generally preferred.

16. **Database Maintenance** — Ongoing tasks: integrity checks, reindexing, compaction/vacuum, monitoring growth, schema evolution, change management.

17. **Shared Responsibility Model (Cloud)** — Cloud providers manage infrastructure; DBAs remain responsible for schema, security, backup policies, performance, and data integrity.

### Application in Practice

1. **Enforcing Referential Integrity** — Access: Database Tools > Relationships > Enforce Referential Integrity. SQLite: `PRAGMA foreign_keys = ON;`. PostgreSQL: enforced by default.

2. **Transaction Control in SQL** — `BEGIN TRANSACTION;`, `COMMIT;`, `ROLLBACK;` for explicit control over when changes become permanent.

3. **Backup Procedures** — Access: copy `.accdb` with timestamp. SQLite: `.backup` command or file copy. Cloud: automated backups with DBA-managed policies.

4. **Integrity Checking** — SQLite: `PRAGMA integrity_check;` returns "ok" or flags corruption.

5. **Performance Tuning with Indexes** — `CREATE INDEX idx_name ON TABLE(Column);`. Verify with `EXPLAIN QUERY PLAN` in SQLite.

6. **Database Compaction** — SQLite: `VACUUM;` (reclaim space), `REINDEX;` (rebuild indexes). Access: Compact and Repair.

7. **Journal Mode Configuration** — Check: `PRAGMA journal_mode;`. Switch to WAL: `PRAGMA journal_mode = WAL;`.

8. **Security and Access Control** — SQL Server/PostgreSQL: `GRANT SELECT ON table TO role;`. SQLite: file-system permissions. Access: front-end/back-end separation.

9. **Identifying Critical Data Assets** — Prioritize by impact: STUDENT (PII), STUDENT_GRADE (academic data), ATTENDANCE tables are high-risk.

10. **Cloud DBA via Supabase** — Set up PostgreSQL projects, manage RBAC roles (`postgres`, `anon`, `authenticated`), enforce constraints, configure Row-Level Security policies.

### Real-World Examples

1. **Lost Update Problem** — Two users update the same grade simultaneously; without concurrency control, one update silently overwrites the other.

2. **Grading Database Transaction** — Insert a grade, update the average, record an audit entry. If any step fails, all changes roll back.

3. **Deadlock Scenario** — Transaction A locks Table 1 and waits for Table 2; Transaction B locks Table 2 and waits for Table 1. DBMS detects the cycle and rolls back one.

4. **Grading Database Access Rights** — TAs: Read on STUDENT, STUDENT_GRADE, GRADE_SCALE. Instructors: Read/Insert/Update/Delete on grades. SysAdmins: full privileges. Assigned to roles, not individuals.

5. **Bank Transfer (ACID)** — Both debit and credit must occur; atomicity ensures neither happens alone. Durability means the transfer survives a crash after commit.

6. **Accidental Deletion Recovery** — `DELETE FROM STUDENT_GRADE;` removes all grades. Recovery requires restoring from backup — demonstrating why backup discipline is essential.

7. **Heather Sweeney Designs Access Control** — Different roles (assistants, management, administrators) receive different privilege levels on SEMINAR, CUSTOMER, and INVOICE tables.

8. **SQLite WAL Mode** — `PRAGMA journal_mode = WAL;` enables non-blocking reads alongside writes and provides automatic crash recovery.

9. **Supabase Row-Level Security** — `CREATE POLICY student_view_own_grades ON STUDENT_GRADE FOR SELECT USING (auth.uid() = StudentID);` ensures students see only their own grades.

10. **Platform Comparison** — Same DBA principles across MS Access (visual/local), SQLite (explicit/file-based), and Supabase/PostgreSQL (governance, security, scalability). Tools change; responsibilities remain constant.
