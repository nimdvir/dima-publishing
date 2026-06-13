<!-- metadata: date="2026-06-11"; chapter="11"; type="source"; title="Source: GPT Deep Research"; description="Source material for chapter 11" -->

# Database Administration

## Chapter overview and learning objectives

Database work does not end at design and SQL. In real organizations, databases operate continuously under changing workloads, evolving requirements, and ever-present risk—hardware faults, human mistakes, software defects, and security threats. As a result, database administration (DBA work) is best understood as **protecting and operating a living system**, not “finishing a build.” This lifecycle perspective matches both classic DBA practice and broader operations thinking: most of a system’s lifespan is spent *in use and maintenance*, not initial construction (Beyer et al., 2016; Mullins, 2002). citeturn8view0turn5view0

The course DBA materials frame this point in business terms: database administration is about maximizing a database’s value while balancing the conflicting goals of protection, availability, and usability (Dvir, 2021). fileciteturn0file0 fileciteturn0file1

**Learning objectives.** By the end of this chapter, students should be able to:

- Explain the role and responsibilities of a database administrator and why DBA work is both operational and strategic (Mullins, 2002; Kroenke et al., 2020). citeturn5view0turn4view1  
- Describe how DBMSs support multi-user work safely and consistently, and what can go wrong without concurrency control (Kroenke et al., 2020; Silberschatz et al., 2020). citeturn4view1turn5view1  
- Understand transactions and why ACID properties matter for reliability, auditability, and trust (Gray & Reuter, 1993; Silberschatz et al., 2020). citeturn6view2turn5view1  
- Explain core database security concepts (authentication, authorization, roles, least privilege) and their practical enforcement (Ben-Natan, 2005; Dvir, 2021). citeturn10view0 fileciteturn0file0  
- Describe backup and recovery strategies (including logging-based recovery) and why testing recovery matters as much as taking backups (Kumar & Son, 2015; Kroenke et al., 2020). citeturn6view0turn4view1  
- Recognize performance and maintenance concerns that emerge only at scale, and how DBA practices reduce operational risk (Mullins, 2002; Ramakrishnan & Gehrke, 2003). citeturn5view0turn6view3  

## The DBA role and the operating reality of databases

**What is database administration?** The course materials define database administration as a business function: managing a database to maximize organizational value while balancing protection and availability (Dvir, 2021). In professional practice, this aligns with platform-independent DBA guidance that frames DBA work as a broad discipline spanning environment setup, change management, availability, security, integrity, and performance (Mullins, 2002). fileciteturn0file0turn0file1 citeturn5view0

**Why “set it and forget it” fails.** Even a well-designed schema degrades without operational care:

- Workloads change (e.g., reporting spikes during deadlines or end-of-month closes).  
- Data grows (affecting indexes, I/O patterns, and maintenance).  
- Users change (new teams, new roles, new permissions).  
- Requirements evolve (new attributes, new reports, new integrations).  

DBA work exists because *real systems are dynamic systems*—and the cost of failure is often business continuity and trust (Beyer et al., 2016; Mullins, 2002). citeturn8view0turn5view0

**Data administration vs. database administration.** The DBA lecture materials distinguish two commonly conflated functions:

- **Data administration**: organization-wide, management-oriented work focused on corporate data privacy and security policy.  
- **Database administration**: database-specific, technical work focused on the DBMS, its performance, security enforcement, and associated applications.  
- **DBA (the person/role)**: the individual responsible for a database and enabling its development and use (Dvir, 2021). fileciteturn0file0turn0file1  

This split matters because many database failures are not purely technical. They are often *governance failures expressed through technology* (e.g., unclear definitions, uncontrolled access growth, undocumented changes), which is why mature organizations treat DBA work as both technical execution and risk management (Mullins, 2002; Gertz & Jajodia, 2007). citeturn5view0turn10view1

**The DBA’s expanded surface area.** Modern DBMS environments commonly contain more than tables: stored procedures, triggers, and functions (often grouped under persistent stored modules) become operational assets that can improve quality and consistency—but also introduce risk if unmanaged (Dvir, 2021; Ramakrishnan & Gehrke, 2003). fileciteturn0file1 citeturn6view3

## Core DBA responsibilities

**The three pillars.** A very instructor-friendly framing from the DBA lecture materials is that three administrative functions are necessary to prevent multi-user database “chaos”:

1. **Concurrency control** to ensure consistent results under simultaneous use  
2. **Security** to ensure only authorized users take authorized actions  
3. **Backup and recovery** to protect the database and restore it quickly and accurately after failure (Dvir, 2021). fileciteturn0file1turn0file0  

This triad maps well to mainstream DBMS theory and practice: transaction management + concurrency control protect correctness, security protects confidentiality/integrity/availability, and recovery protects durability and continuity (Gray & Reuter, 1993; Silberschatz et al., 2020; Mullins, 2002). citeturn6view2turn5view1turn5view0

**Additional responsibilities that become “real” in production.** The DBA lecture slides explicitly emphasize tasks students often underestimate until they see production systems:

- Creating a system to gather and prioritize user-reported errors and ensure they are corrected  
- Managing database configuration and change control (requests, review, projects/tasks)  
- Ensuring appropriate documentation is maintained (structure, concurrency control, security, backup/recovery, applications)  
- In cloud contexts, ensuring there is a service-level agreement that covers backups, response time, and error reporting (Dvir, 2021). fileciteturn0file0turn0file1  

These responsibilities align closely with platform-independent DBA best practices emphasizing change management, availability, integrity, and performance as continuous operational commitments (Mullins, 2002). citeturn5view0

## Multi-user access and concurrency control

**Why concurrency is a problem.** When multiple users read and write concurrently, the database must prevent interference that produces incorrect outcomes. The DBA lecture materials define concurrency control as ensuring one user’s work does not inappropriately influence another’s work and emphasize the expectation that users should get the same logical result whether the system has one user or hundreds (Dvir, 2021). fileciteturn0file0turn0file1  

### What can go wrong without control

The lecture materials highlight two classic anomalies:

- **Lost update**: one user’s update overwrites another’s update.  
- **Inconsistent read**: a user reads data that reflect only part of another user’s transaction (Dvir, 2021). fileciteturn0file0turn0file1  

These map directly to standard DBMS concurrency theory, where uncontrolled interleavings can violate correctness notions like serializability (Silberschatz et al., 2020; Ramakrishnan & Gehrke, 2003). citeturn5view1turn6view3  

### Locking basics

A practical control mechanism emphasized in the slides is **resource locking**, where updates are protected by locks that prevent conflicting access:

- **Shared (read) lock**: permits reading but prevents modification by others.  
- **Exclusive (write) lock**: prevents any other transaction from reading or changing the locked item (Dvir, 2021). fileciteturn0file0turn0file1  

DBMS textbooks typically expand this into lock granularity (row/page/table), intent locks, and deadlock handling strategies, but the conceptual core remains: locks bound the allowable interleavings to preserve correctness (Ramakrishnan & Gehrke, 2003; Silberschatz et al., 2020). citeturn6view3turn5view1  

### Serializable transactions and two-phase locking

The DBA slides introduce an essential correctness target: concurrent results should match results obtained under **some serial ordering** (serializability). They also present **two-phase locking** as a way to achieve serializable schedules (Dvir, 2021). fileciteturn0file0turn0file1  

This is consistent with standard DBMS treatment: serializability provides a strong correctness guarantee for concurrent execution, and disciplined locking protocols (e.g., two-phase locking variants) are a classic way to approach that guarantee (Silberschatz et al., 2020; Ramakrishnan & Gehrke, 2003). citeturn5view1turn6view3  

### Deadlocks

The lecture materials define **deadlock** (the “deadly embrace”) as a condition where transactions wait on each other’s locks, causing a cycle of waiting that prevents completion (Dvir, 2021). fileciteturn0file0turn0file1  

In practice, DBMSs handle deadlocks through combinations of detection (wait-for graphs), victim selection and rollback, and/or timeout-based avoidance strategies (Ramakrishnan & Gehrke, 2003; Silberschatz et al., 2020). citeturn6view3turn5view1  

### Optimistic vs. pessimistic locking

The DBA slides distinguish two philosophies:

- **Optimistic locking** assumes conflicts are rare and checks at commit time; on conflict, the transaction is rolled back and retried.  
- **Pessimistic locking** assumes conflicts are likely and locks earlier to prevent them (Dvir, 2021). fileciteturn0file0turn0file1  

This aligns with broader transaction processing literature where concurrency control strategies are evaluated as trade-offs between throughput, latency, and the cost of aborts/retries (Gray & Reuter, 1993; Ramakrishnan & Gehrke, 2003). citeturn6view2turn6view3  

### Where cursors appear in DBA practice

The DBA slides define a **cursor** as a pointer into the row set returned by an SQL `SELECT` statement and note that cursor types differ (e.g., static vs. dynamic vs. keyset in some systems) (Dvir, 2021). fileciteturn0file0turn0file1  

From an administrative standpoint, cursors matter because they influence resource usage (memory, locks, network round trips) and can shape concurrency outcomes—especially when application code holds cursors open while users “think,” which is a polite way of saying: while concurrency slowly suffers (Mullins, 2002). citeturn5view0  

## Transactions and ACID reliability

**What is a transaction?** The DBA slides describe transactions as **logical units of work** and define an **atomic transaction** as one in which a series of database actions either all succeed or none occur (Dvir, 2021). fileciteturn0file0turn0file1  

They provide a business-realistic example of atomicity: updating a customer’s amount owed, updating a salesperson’s commission due, and inserting a new order record—actions that must not partially apply (Dvir, 2021). fileciteturn0file0turn0file1  

This “all-or-nothing” framing is foundational in transaction processing as a discipline for building reliable systems (Gray & Reuter, 1993; Silberschatz et al., 2020). citeturn6view2turn5view1  

### ACID properties and why they matter

ACID is the classic bundle of properties used to explain transactional reliability:

- **Atomicity**: no partial completion.  
- **Consistency**: integrity constraints are preserved from one consistent state to another.  
- **Isolation**: intermediate states are not visible to other transactions (to the degree defined by the isolation model/level).  
- **Durability**: once committed, results survive failure (Gray & Reuter, 1993; Silberschatz et al., 2020). citeturn6view2turn5view1  

For business systems, ACID matters because it underwrites outcomes people treat as factual: balances, invoices, inventory counts, grades, audit trails, and compliance artifacts. If the system can “half-post” a transaction, then every downstream report becomes suspect, which is not the kind of excitement accountants or accreditation committees typically request (Gertz & Jajodia, 2007). citeturn10view1  

### Transaction control language in practice

The DBA slides highlight SQL transaction control statements such as `BEGIN TRANSACTION`, `COMMIT`, and `ROLLBACK`, and explicitly note that syntax varies by DBMS (Dvir, 2021). fileciteturn0file0turn0file1  

A simple, tool-agnostic illustration looks like this (the precise keywords may differ across systems):

```sql
BEGIN TRANSACTION;

UPDATE Customer
SET AmountOwed = AmountOwed + 500
WHERE CustomerID = 42;

UPDATE Salesperson
SET CommissionDue = CommissionDue + 50
WHERE SalespersonID = 7;

INSERT INTO Orders(CustomerID, OrderDate, TotalAmount)
VALUES (42, CURRENT_DATE, 500);

COMMIT;   -- Or ROLLBACK if any step fails
```

This example is directly aligned with the lecture’s atomic-transaction scenario, but now expressed in a form students can recognize from SQL execution contexts (Dvir, 2021; Silberschatz et al., 2020). fileciteturn0file0turn0file1 citeturn5view1  

## Database security and access management

DBAs are security practitioners whether they planned on it or not. The DBA slides summarize the core intent succinctly: database security aims to ensure that **only authorized users perform authorized activities** (Dvir, 2021). fileciteturn0file0turn0file1  

Security research and practice treat database security as crucial because databases increasingly host not only operational data but also sensitive and high-value information whose compromise can cause financial loss and loss of public trust (Gertz & Jajodia, 2007). citeturn10view1  

### Security goals and the CIA framing

A widely used framing is the CIA triad:

- **Confidentiality**: prevent unauthorized disclosure.  
- **Integrity**: prevent unauthorized modification; ensure correctness and traceability.  
- **Availability**: ensure the system is usable when needed.  

In database contexts, these goals connect directly to access control, auditing, recovery, and operational resilience (Ben-Natan, 2005; Gertz & Jajodia, 2007; Mullins, 2002). citeturn10view0turn10view1turn5view0  

### Authentication vs. authorization

The DBS slides emphasize authentication and authorization as pillars of database security (Dvir, 2021). fileciteturn0file0turn0file1  

- **Authentication** answers: *Who are you?*  
- **Authorization** answers: *What are you allowed to do?*  

In practice, these are enforced by identity mechanisms (accounts, credentials, federated identity) plus privilege systems (grants, roles, object permissions) (Ben-Natan, 2005; Benantar, 2006). citeturn10view0turn10view2  

### Roles, privileges, and least privilege

A key principle emphasized in the DBA lecture materials is that administrative permissions should be granted to **user groups/roles rather than individual users**, except when necessary (Dvir, 2021). fileciteturn0file0turn0file1  

The slides even provide a concrete illustration of role-based privileges (e.g., assistants vs. administrators) with differing rights such as read/insert/change versus grant rights and modify structure (Dvir, 2021). fileciteturn0file0turn0file1  

This maps strongly onto role-based access control (RBAC) as a security model and aligns with modern security guidance emphasizing **least privilege**—grant only what is necessary for the job, reducing both accidental damage and malicious misuse (Benantar, 2006). citeturn10view2  

In cloud/IAM contexts, Google’s security principles also explicitly call out least privilege and separation of duty as foundational practices for permission management (Google, 2017). citeturn5view4  

### Auditing: the underappreciated DBA superpower

DBA security is not only preventive; it is also detective and forensic. A practical DBA security perspective stresses auditing—building the capability to answer: *Who did what, when, from where, and did it succeed?* (Ben-Natan, 2005). citeturn10view0  

This becomes essential for incident response, regulatory requirements, and internal accountability—because “we think the database is fine” is not an audit standard (Ben-Natan, 2005; Gertz & Jajodia, 2007). citeturn10view0turn10view1  

## Backup, recovery, performance, and operating databases in modern environments

### Why databases fail

The DBA lecture materials list common causes of database failure and emphasize the need for recovery procedures because failure cannot be completely avoided in real systems (Dvir, 2021). fileciteturn0file0turn0file1  

In professional DBA practice, failure planning is not pessimism; it is realism. DBA guidance treats availability and recoverability as core outcomes, not optional add-ons (Mullins, 2002). citeturn5view0  

### Backup strategies and recovery modes

The lecture materials distinguish recovery approaches such as reprocessing and rollback/rollforward, and they frame logging-based recovery as central to reliable restoration (Dvir, 2021). fileciteturn0file0turn0file1  

From the research perspective, database recovery is treated as a discipline in its own right, with formal mechanisms and commercial implementations; it is not merely “restore a file and hope” (Kumar & Son, 2015). citeturn6view0  

**Reprocessing** (as described in the slides) replays activities from a point in time, but it can be impractical if transaction volume is high (Dvir, 2021). fileciteturn0file0turn0file1  

**Rollback/rollforward** uses logs (with before-images/after-images in the lecture materials) to undo uncommitted work and redo committed work to reach a consistent state (Dvir, 2021). This aligns with transaction processing literature that treats logging as essential for durability and recovery correctness (Gray & Reuter, 1993). fileciteturn0file0turn0file1 citeturn6view2  

A crucial operational lesson: backups are only as good as the organization’s confidence that restore actually works. DBA best practices therefore emphasize repeatable procedures, verification, and documentation—not just backup creation (Mullins, 2002). citeturn5view0  

### Performance monitoring and tuning

Performance becomes a DBA concern because slow databases cause user-visible failure: they block operations, delay decisions, and create cascading workarounds (spreadsheets, shadow systems, duplicated extracts). Platform-independent DBA guidance emphasizes performance as a central administrative responsibility alongside availability and integrity (Mullins, 2002). citeturn5view0  

DBMS research and teaching also connect performance to data structures and algorithms (e.g., indexing) and to operational concerns like contention and I/O overhead (Ramakrishnan & Gehrke, 2003). citeturn6view3  

In introductory courses, it is often helpful to preview indexes as a trade-off:

- indexes can speed lookups and joins dramatically,  
- but they impose overhead on writes (inserts/updates/deletes) and require maintenance (Ramakrishnan & Gehrke, 2003; Mullins, 2002). citeturn6view3turn5view0  

### Maintenance and evolution

The DBA slides emphasize operational processes beyond “technical knobs”: error reporting, prioritization, configuration control, documentation, and (in cloud settings) service-level agreements for backups and responsiveness (Dvir, 2021). fileciteturn0file0turn0file1  

This is consistent with broader operations perspectives stressing lifecycle ownership—systems must be monitored, maintained, adapted, and governed over long periods (Beyer et al., 2016; Mullins, 2002). citeturn8view0turn5view0  

### Modern DBA environments: file-based, server-based, and cloud

A practical way to teach “modern DBA” is to present DBA work as a spectrum:

| Environment style | Typical strengths | Typical DBA risk focus |
|---|---|---|
| File-based (single-file DB) | Simple deployment; good for learning and small apps | Concurrency limitations; backup is “easy” but easily forgotten; access control may be coarse |
| Server-based (client/server DBMS) | Strong concurrency, security controls, richer recovery | Configuration complexity; operational monitoring; patching and change management |
| Cloud-managed DB services | Outsourced infrastructure ops; high availability options | Shared responsibility for data access, governance, encryption choices, and incident readiness |

The cloud portion is not “DBA disappears”; it is “DBA work changes shape.” The course slides capture this explicitly through the idea of SLAs covering backups and response time (Dvir, 2021), while security guidance emphasizes disciplined role/permission management using least privilege and separation of duty (Google, 2017). fileciteturn0file0turn0file1 citeturn5view4  

### Let’s build: DBA practices for the Grading Database

To synthesize the chapter, treat the Grading Database as a production system—just smaller and friendlier.

**Identify the most critical assets.** In a grading context, “critical tables” are those whose corruption would destroy trust: students, deliverables, submissions/grades, and any audit trail of changes. Security research stresses that loss of trust in the data infrastructure is a real organizational cost (Gertz & Jajodia, 2007). citeturn10view1  

**Use transactions for grade updates.** Any action that updates multiple tables (e.g., recording a submission + updating grade totals + writing feedback status) should be treated as a single logical unit of work, consistent with the lecture’s atomic transaction framing (Dvir, 2021; Gray & Reuter, 1993). fileciteturn0file0turn0file1 citeturn6view2  

**Simulate concurrency problems in class.** A simple lab can reproduce the lost update problem by having two “TAs” update the same grade simultaneously without locking/transaction isolation and then showing the overwrite outcome (Dvir, 2021; Silberschatz et al., 2020). fileciteturn0file0turn0file1 citeturn5view1  

**Define roles and least privilege.** Create roles such as `grader`, `instructor`, and `report_viewer` and assign only necessary capabilities. This mirrors the lecture’s “permissions to groups” principle and aligns with least-privilege guidance (Dvir, 2021; Benantar, 2006; Google, 2017). fileciteturn0file0turn0file1 citeturn10view2turn5view4  

**Plan recovery as a teaching demonstration.** Even in a classroom database, demonstrate that recovery is not abstract:
- perform a “backup,”  
- introduce a controlled “oops” (accidental delete),  
- restore and verify correctness,  
- discuss what the recovery point objective would be in a real institution.  

This aligns with the slides’ emphasis on backup/recovery procedures and with DBA best-practice guidance emphasizing recoverability as an operational outcome (Dvir, 2021; Mullins, 2002; Kumar & Son, 2015). fileciteturn0file0turn0file1 citeturn5view0turn6view0  

**Key terms (quick reference).** Database administrator (DBA), transaction, atomicity, ACID, lock, deadlock, optimistic locking, pessimistic locking, backup, recovery, rollback, rollforward, cursor, privilege, role, auditing. (Dvir, 2021; Silberschatz et al., 2020). fileciteturn0file0turn0file1 citeturn5view1  

## References

Benantar, M. (2006). *Access control systems: Security, identity management and trust models*. Springer. citeturn10view2

Ben-Natan, R. (2005). *Implementing database security and auditing*. Elsevier. citeturn10view0

Beyer, B., Jones, C., Petoff, J., & Murphy, N. R. (2016). *Site reliability engineering: How Google runs production systems*. O’Reilly Media. citeturn8view0

Dvir, N. (2021). *Database administration (BITM300 fall 2021 week 12)* [Lecture slides]. University at Albany, SUNY. fileciteturn0file0turn0file1

Gertz, M., & Jajodia, S. (2007). *Handbook of database security: Applications and trends*. Springer. citeturn10view1

Google. (2017). *UK cloud security principles and Google Cloud* (White paper). citeturn5view4

Gray, J., & Reuter, A. (1993). *Transaction processing: Concepts and techniques*. Morgan Kaufmann. citeturn6view2

Kroenke, D. M., Auer, D. J., Vandenberg, S. L., & Yoder, R. C. (2020). *Database concepts* (9th ed.). Pearson. citeturn4view1

Kumar, V., & Son, S. H. (2015). *Database recovery*. Springer. citeturn6view0

Mullins, C. (2002). *Database administration: The complete guide to practices and procedures*. Addison-Wesley Professional. citeturn5view0

Ramakrishnan, R., & Gehrke, J. (2003). *Database management systems* (3rd ed.). McGraw-Hill. citeturn6view3

Silberschatz, A., Korth, H. F., & Sudarshan, S. (2020). *Database system concepts* (7th ed.). McGraw-Hill Education. citeturn5view1