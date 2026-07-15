# Review and Reflection Questions
<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-revie-resized" alt="Review and Reflection section icon" width="220">
</p>

*Use these questions to strengthen your understanding of how database administration protects data trust — then think more deeply about what it means to keep a database secure, reliable, recoverable, and ready for real-world use.*

---

## Questions

### Review Questions

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

### Reflection Questions

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

### Personal Reflection Questions

*These questions invite you to connect the chapter's ideas to your own experience, habits, and professional development.*

**1. Which DBA responsibility — security, concurrency, backup, or performance — do you find most challenging to think about? What makes it difficult, and what would help you understand it better?**

**2. Have you ever experienced a situation where data was lost because no backup existed — a lost file, unsaved work, or an overwritten document? How would a backup strategy like the one described in this chapter have changed the outcome?**

**3. What does the principle of least privilege suggest about access to your own course data in systems you use as a student? Can you think of an example where you or someone you know had more access to sensitive information than necessary?**

**4. If you were responsible for a small departmental database — say, a club membership list or an event registration system — which one DBA practice from this chapter would you implement first? Why that one?**

**5. How does understanding database administration change the way you view the systems you rely on every day — course registration, banking apps, streaming platforms, or healthcare portals?**

**6. Which skill or concept from this chapter would you most want to develop further if you pursued a career involving data management, analytics, or information systems? What would that skill enable you to do?**

---

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Answer Key

### Review Questions

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

### Reflection Questions

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

### Personal Reflection Questions

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
