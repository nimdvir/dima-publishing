<!-- metadata: date="2026-06-11"; chapter="11"; section="reflection"; title="Chapter 11 Review & Reflection"; description="Review questions for DBA" -->

## Review and Reflection

![Reflection GIF](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/review_cncyn6?_a=BAMAAAiu0)
### Main Topics Covered
- The DBA role as an ongoing stewardship function that extends database design into operations, reliability, and trust.
- Clear distinction between Data Administration (policy, governance, compliance) and Database Administration (technical enforcement, uptime, performance, recovery).
- Concurrency control in multi-user systems, including lost updates, lock types (shared/exclusive), lock granularity, and deadlock handling.
- Transaction reliability through ACID, with practical control flow using BEGIN, COMMIT, and ROLLBACK in grading-system scenarios.
- Security architecture built on the CIA triad, authentication vs. authorization, and role-based access with least-privilege principles.
- Backup strategy trade-offs across full, incremental, and differential backups, plus rollback, rollforward, and reprocessing recovery paths.
- Log-based reliability concepts, including before-images/after-images and SQLite journal modes (rollback journal vs WAL).
- Performance monitoring and tuning through indexing decisions, query-plan analysis, and lock-contention awareness.
- Maintenance lifecycle tasks such as integrity checks, compaction/cleanup, reindexing, and schema evolution with backward-compatibility concerns.
- Platform-specific DBA practice across Microsoft Access (visual integrity + file operations), SQLite (explicit SQL + file discipline), and Supabase/PostgreSQL (cloud RBAC/RLS + shared responsibility).

### Review and Reflection Questions
#### ***Question 1: Why does this chapter treat database administration as “ongoing stewardship” rather than a one-time setup task?***
Database administration is ongoing stewardship because data systems change continuously after deployment. User volume grows, queries evolve, schema extensions appear, and security threats shift. A database that worked on launch day can degrade in performance, consistency, or recoverability if no one actively monitors locks, indexes, backups, and access controls over time.

The chapter’s “guardian of organizational data” framing emphasizes institutional trust. In a grading system, reliability means more than uptime; it includes defensible records, repeatable recovery, and controlled access for sensitive information. Regular maintenance, permission audits, integrity checks, and tested backup procedures are recurring responsibilities that preserve confidence long after initial setup.

#### ***Question 2: How do Data Administration and Database Administration complement each other in a real organization?***
Data Administration (DA) and Database Administration (DBA) operate at different but complementary levels. DA defines enterprise policies, standards, data definitions, and compliance expectations, while DBA enforces those expectations technically through schema controls, permissions, backup strategy, and performance operations.

This separation improves accountability and consistency. DA ensures organizational alignment across departments, and DBA ensures day-to-day execution aligns with policy in actual systems. In the chapter’s context, DA might define grade retention and privacy rules, while DBA implements role-based access, audit logs, and recovery procedures that make those rules practical and verifiable.

#### ***Question 3: In the grading database context, what could go wrong without concurrency control?***
Without concurrency control, simultaneous edits can silently overwrite one another, creating lost updates in grade records. For example, two instructors adjusting the same score could each read an old value and write conflicting results, leaving only one change visible. Inconsistent reads can also appear when reports capture intermediate states during active updates.

These failures affect fairness, auditability, and student trust. Concurrency mechanisms such as isolation levels, shared/exclusive locking, and deadlock handling preserve correctness under multi-user access. In the grading context, the goal is predictable outcomes: each transaction should see a coherent state, and committed changes should not be unintentionally reversed by competing operations.

#### ***Question 4: When should a team favor optimistic locking versus pessimistic locking?***
Favor optimistic locking when conflicts are expected to be rare and the workload is mostly read-heavy. In those environments, allowing concurrent edits and checking for version conflicts at commit time reduces blocking and improves throughput. This can work for many academic workflows where most records are viewed more often than edited.

Favor pessimistic locking when conflicts are frequent or the cost of collision is high, such as tightly timed grade finalization windows or high-stakes financial-style updates. Locking earlier prevents simultaneous writes from diverging, though it may increase wait time. The chapter’s decision lens is practical: choose based on contention probability and business impact of a conflict.

#### ***Question 5: How do ACID properties translate into business value, not just technical correctness?***
ACID creates business value by protecting process reliability in real workflows. If updating a grade also requires updating an audit trail, atomicity ensures both actions succeed together or both fail, avoiding partial records that trigger disputes. Durability guarantees approved changes remain recorded even after crashes, supporting continuity and accountability.

Consistency and isolation protect decision quality. Consistency enforces institutional rules (valid references, permitted ranges), while isolation prevents concurrent operations from producing misleading intermediate states in dashboards or reports. In business terms, ACID reduces rework, strengthens audit defensibility, and preserves stakeholder trust in the system’s outputs.

#### ***Question 6: What is the practical difference between rollback and rollforward recovery, and why should DBAs know both?***
Rollback and rollforward solve different recovery moments. Rollback undoes incomplete or erroneous transactions using prior state information, returning the database to a known good condition before the failed operation. It is immediate and transaction-focused, commonly used when an update fails validation or an error occurs mid-process.

Rollforward starts from a restored backup and replays committed log entries to recover work completed after that backup, often toward a specific point in time. DBAs need both because incident types vary: some require undoing bad current changes, while others require rebuilding state after media loss. Together they provide completeness in continuity planning.

#### ***Question 7: How does role-based access control improve security in this chapter’s grading examples?***
Role-based access control (RBAC) improves security by assigning privileges to roles instead of individuals, then mapping users to those roles. In grading systems, this enables clear boundaries: TAs may enter scores, instructors may approve or adjust them, and administrators may manage configuration without broad data-edit privileges.

This structure enforces least privilege and reduces permission sprawl that often occurs with ad hoc grants. It also improves audit readiness because access intent is documented at the role level and easier to review periodically. For sensitive tables like student identity and grade records, RBAC lowers exposure risk while keeping operational responsibilities clear.

#### ***Question 8: What does the chapter’s SQLite section reveal about DBA responsibility in lightweight systems?***
The SQLite section shows that lightweight tooling does not eliminate administration duties; it changes where those duties sit. Foreign-key enforcement may require explicit activation, backups are file-centric and must be disciplined, and security depends heavily on application controls and operating-system protections rather than server-level user management.

DBA responsibility remains concrete: choose journal mode appropriately (including WAL when beneficial), schedule integrity checks, manage file permissions, and document recovery procedures. In educational or departmental deployments, SQLite can be highly effective, but only when governance and operational habits are treated with the same seriousness as larger server platforms.

#### ***Question 9: How does cloud administration in Supabase/PostgreSQL change the DBA role without eliminating it?***
Cloud platforms shift infrastructure burden but do not remove data stewardship. Providers manage much of the underlying hardware, patching, and baseline availability, while DBAs remain responsible for schema design, index strategy, data lifecycle controls, permissions, and policy enforcement that reflect organizational requirements.

In Supabase/PostgreSQL, governance decisions such as RBAC, row-level security, and exposure of views or APIs still require deliberate DBA design. The shared-responsibility model means reliability is collaborative: the platform supplies resilient infrastructure, but institutional trust still depends on how administrators model access, monitor usage, and validate recovery outcomes.

#### ***Question 10: Which chapter example best demonstrates that administration decisions are business decisions?***
A strong example is accidental grade deletion followed by controlled restore from backup plus log-based recovery. Technically, this is a DBA procedure; operationally, it protects academic continuity, prevents manual reconstruction errors, and preserves institutional credibility when stakeholders question record integrity.

Another clear example is applying row-level security so students can view only their own records. That configuration choice directly supports privacy obligations and reduces breach risk. In both cases, the chapter demonstrates that administration settings are not merely technical preferences—they are policy enforcement mechanisms with legal, reputational, and educational consequences.
