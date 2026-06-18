# RAT 6 — Top Questions (Optimized)

**Source:** Chapter 6 — The Relational Model (ch06-main-2026-05-29.md)
**Date:** 2026-06-17
**Total:** 10 questions (2 multi-select + 8 multiple-choice)
**Bloom distribution:** 3 Understand, 4 Apply, 2 Analyze, 1 Evaluate
**Selection criteria:** Higher Bloom levels (Apply, Analyze, Evaluate), scenario-based reasoning, AI-resistance, and broad coverage of all major chapter sections.
**CSV file:** `rat-6-optimized.csv`

---

<div style="background: #F0FDFA; border-left: 4px solid #0F766E; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0;">
<p style="margin: 0 0 8px 0; font-size: 1.05em; color: #18181b;">This <strong>Reading Assessment Test (RAT)</strong> is based on <strong style="color: #0f766e;">Chapter 6: The Relational Model</strong> in the course textbook, <a rel="noopener" href="https://data-pilot.dimapublishing.com/" style="color: #0e7490; font-weight: 600; text-decoration: none;"> <strong>Using Data to Drive Business Performance</strong> </a>.</p>
<p style="margin: 0; font-size: 0.95em; color: #18181b;">Make sure you complete reading the chapter and then answer the questions here: <a rel="noopener" href="https://data-pilot.dimapublishing.com/book/ch06/introduction/1" style="color: #4f46e5; font-weight: 600; text-decoration: none;"> Chapter 6 — The Relational Model → </a></p>
</div>

---

## Multi-Select Questions

**Q1. Flat-table anomalies**

*Short description: Flat-table anomalies*

A professor stores all grading data in one flat spreadsheet with these columns: StudentID, StudentName, StudentEmail, DeliverableName, Score, DeliverableType, Weight. A student changes their email address.

Select ALL that apply.

A. Update anomaly: the new email must be edited in every row where that student appears  ← ✓ CORRECT
*Feedback: Correct — update anomaly occurs when changing one fact requires updating many rows, risking inconsistency.*

B. Join anomaly: the flat table cannot be joined with other tables
*Feedback: Incorrect — there is no anomaly called a join anomaly. The four named anomalies are insertion, update, deletion, and redundancy.*

C. Insertion anomaly: a new student who has not submitted any work cannot be added to the spreadsheet  ← ✓ CORRECT
*Feedback: Correct — because student and grade data are mixed, there is no place to record a student without also recording a grade.*

D. Deletion anomaly: removing the only grade row for a student also removes the only record that the student exists  ← ✓ CORRECT
*Feedback: Correct — when deleting the last grade for a student, the student record itself is lost because themes are mixed.*

E. Redundancy: the same student name, email, deliverable type, and weight repeat across multiple rows  ← ✓ CORRECT
*Feedback: Correct — flat tables store the same data in many rows, wasting storage and creating inconsistency risk.*

**Hint:** Chapter 6 names four specific anomaly types. Think about what happens when data is mixed in one table.

**Explanation:** Chapter 6 revisits the four modification anomalies: update (one change requires many edits), insertion (cannot add one fact without another), deletion (removing one fact destroys another), and redundancy (same data stored repeatedly). The flat grading spreadsheet exhibits all four because it mixes student, deliverable, and grade themes in one table.

**Points:** 2 | **Difficulty:** 3/5 | **ID:** BITM330-RAT6-Q1 | **Bloom:** Understand

---

**Q2. Key types identification**

*Short description: Key types identification*

The Grading Database uses several types of keys across its seven tables. Match each description to the correct key type.

Select ALL that apply.

A. A surrogate key is a system-generated identifier like an auto-numbered StudentID that has no business meaning  ← ✓ CORRECT
*Feedback: Correct — surrogate keys are artificial identifiers created by the system, such as auto-increment integers.*

B. A surrogate key is any column that could uniquely identify a row, including natural values like email
*Feedback: Incorrect — that describes a candidate key. Surrogate keys are specifically artificial, not natural.*

C. A composite key uses two or more columns together to uniquely identify a row  ← ✓ CORRECT
*Feedback: Correct — composite keys combine multiple columns (e.g., StudentID + DeliverableID) to form a unique identifier.*

D. A natural key is always preferred over a surrogate key because it carries business meaning
*Feedback: Incorrect — Chapter 6 discusses trade-offs. Natural keys can change (emails, names) while surrogates are stable.*

E. A candidate key is any column or set of columns that could serve as the primary key  ← ✓ CORRECT
*Feedback: Correct — candidate keys are all possible unique identifiers. The primary key is the one chosen from among the candidates.*

**Hint:** Surrogate = artificial. Natural = real-world meaning. Composite = multiple columns. Candidate = any potential PK.

**Explanation:** Chapter 6 defines key types: candidate keys (any column(s) that could uniquely identify rows), primary keys (the chosen candidate), surrogate keys (system-generated, no business meaning), natural keys (real-world identifiers like SSN), and composite keys (two or more columns combined). Each serves a different purpose in relational design.

**Points:** 2 | **Difficulty:** 4/5 | **ID:** BITM330-RAT6-Q2 | **Bloom:** Analyze

---

## Multiple-Choice Questions

**Q3. Relational model definition**

*Short description: Relational model definition*

Chapter 6 defines the relational model. Which statement best captures what distinguishes the relational model from flat-file approaches?

A. The relational model stores all data in a single table with relationships defined by formulas
*Feedback: Incorrect — that describes a flat file. The relational model separates data into multiple related tables.*

B. The relational model organizes data into separate tables by subject and uses keys to define relationships between them  ← ✓ CORRECT
*Feedback: Correct — the relational model's core principle is separating data into themed tables linked by primary and foreign keys.*

C. The relational model requires all relationships to be defined through spreadsheet formulas like VLOOKUP
*Feedback: Incorrect — VLOOKUP is a spreadsheet concept. The relational model uses keys and joins, not cell formulas.*

D. The relational model stores relationships as separate files outside the database
*Feedback: Incorrect — relationships are defined within the database through foreign key constraints, not in external files.*

**Hint:** The key word is separate tables linked by keys — not one big table.

**Explanation:** Chapter 6 defines the relational model as organizing data into separate tables (relations) by subject, with keys (primary and foreign) defining relationships between tables. This separation by theme is what solves the anomalies of flat-file design and is the foundation of modern database systems.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT6-Q3 | **Bloom:** Understand

---

**Q4. Entity vs attribute**

*Short description: Entity vs attribute*

In the Grading Database, STUDENT is an entity and StudentName is an attribute. Which of the following correctly distinguishes an entity from an attribute?

A. An entity is a column; an attribute is a row
*Feedback: Incorrect — an entity maps to a table (or row), not a column. An attribute maps to a column.*

B. An entity is a thing we track (like STUDENT); an attribute is a property that describes it (like StudentName)  ← ✓ CORRECT
*Feedback: Correct — entities are the objects or concepts we store data about. Attributes are the characteristics that describe them.*

C. An entity and an attribute are the same thing — the terms are interchangeable
*Feedback: Incorrect — Chapter 6 explicitly distinguishes entities from attributes as different relational concepts.*

D. An entity is the database file; an attribute is the table name
*Feedback: Incorrect — a database file contains tables. An entity represents a real-world object that becomes a table.*

**Hint:** Entity = thing we track. Attribute = property that describes that thing.

**Explanation:** Chapter 6 defines entities as the objects or concepts we store data about (STUDENT, DELIVERABLE, COURSE). Attributes are the properties or characteristics that describe entities (StudentName, Score, DueDate). In the relational model, entities become tables and attributes become columns.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT6-Q4 | **Bloom:** Understand

---

**Q5. Surrogate vs natural keys**

*Short description: Surrogate vs natural keys*

The Grading Database uses StudentID (an auto-number) as the primary key for the STUDENT table rather than StudentEmail. What is the strongest justification for this choice according to Chapter 6?

A. StudentID is shorter and takes less storage space than StudentEmail
*Feedback: Incorrect — storage efficiency is a minor concern. The primary reason is stability, not size.*

B. StudentEmail can change; a surrogate key like StudentID never needs to change, making it a stable identifier for relationships  ← ✓ CORRECT
*Feedback: Correct — natural keys (emails, names) can change. Surrogate keys are immutable, which protects foreign key relationships from cascading updates.*

C. Auto-numbers are required by SQLite — natural keys are not supported
*Feedback: Incorrect — SQLite supports both natural and surrogate keys. Surrogate keys are a design choice, not a technical requirement.*

D. StudentEmail might not be unique across all students
*Feedback: Incorrect — emails are generally unique. The issue is mutability (values can change), not uniqueness.*

**Hint:** What happens to foreign key references in other tables if the primary key value changes?

**Explanation:** Chapter 6 recommends surrogate keys (like auto-numbered IDs) because they are stable: they never need to change once assigned. Natural keys like emails can change (students change email providers), and changing a primary key value requires updating every foreign key that references it — a costly cascade. Surrogates avoid this problem entirely.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT6-Q5 | **Bloom:** Apply

---

**Q6. One-to-many relationship**

*Short description: One-to-many relationship*

In the Grading Database, one STUDENT can submit many DELIVERABLEs. The DELIVERABLE table contains a StudentID column that references STUDENT.StudentID. What type of relationship does this represent?

A. One-to-one — each student has exactly one deliverable
*Feedback: Incorrect — students have many deliverables. One-to-one would mean exactly one deliverable per student.*

B. One-to-many — one student relates to many deliverables, and the foreign key is placed in the DELIVERABLE table  ← ✓ CORRECT
*Feedback: Correct — the foreign key goes in the many-side table (DELIVERABLE). Each deliverable references exactly one student, but one student can have many deliverables.*

C. Many-to-many — students and deliverables have a complex relationship
*Feedback: Incorrect — this is a direct one-to-many relationship. Many-to-many requires a junction table.*

D. Self-referencing — the table references itself through the foreign key
*Feedback: Incorrect — a self-referencing relationship would have a foreign key pointing to the same table, not a different one.*

**Hint:** Foreign key goes on the many side. Where is StudentID placed?

**Explanation:** Chapter 6 explains that one-to-many relationships are implemented by placing the foreign key in the table on the many side. DELIVERABLE.StudentID references STUDENT.StudentID, meaning each deliverable belongs to one student, but each student can have multiple deliverables — a classic one-to-many relationship.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT6-Q6 | **Bloom:** Apply

---

**Q7. Many-to-many resolution**

*Short description: Many-to-many resolution*

A STUDENT can enroll in multiple COURSEs, and each COURSE has multiple STUDENTs. According to Chapter 6, how should this many-to-many relationship be implemented in a relational database?

A. Put a foreign key in both the STUDENT and COURSE tables pointing to each other
*Feedback: Incorrect — mutual foreign keys cannot represent multiple relationships between the same entities.*

B. Create a junction table (e.g., ENROLLMENT) with foreign keys to both STUDENT and COURSE  ← ✓ CORRECT
*Feedback: Correct — many-to-many relationships require a third table that breaks the relationship into two one-to-many relationships.*

C. Store multiple CourseIDs in a single STUDENT column, separated by commas
*Feedback: Incorrect — multi-valued cells violate first normal form and prevent reliable querying and integrity enforcement.*

D. Create a separate database for each relationship type
*Feedback: Incorrect — all relationships should exist within a single database. Separate databases would prevent joining across the relationship.*

**Hint:** Many-to-many needs three tables: the two entities plus a bridge table with foreign keys to both.

**Explanation:** Chapter 6 explains that many-to-many relationships cannot be directly implemented with a single foreign key. Instead, a junction (or associative) table is created — such as ENROLLMENT — containing foreign keys to both STUDENT and COURSE. Each row in the junction table represents one student enrolled in one course, resolving the M:M relationship into two 1:M relationships.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT6-Q7 | **Bloom:** Apply

---

**Q8. Referential integrity**

*Short description: Referential integrity*

A staff member tries to insert a STUDENT_GRADE row with StudentID 99999, but no student with that ID exists in the STUDENT table. The DBMS rejects the insertion. Which integrity rule is being enforced?

A. Entity integrity — every table must have a primary key
*Feedback: Incorrect — entity integrity requires that primary keys are unique and non-null. The issue here is a foreign key violation.*

B. Referential integrity — every foreign key value must match an existing primary key in the referenced table  ← ✓ CORRECT
*Feedback: Correct — referential integrity ensures that cross-table references are valid. A non-existent StudentID violates this rule.*

C. Domain integrity — StudentID must be a valid integer
*Feedback: Incorrect — domain integrity enforces data type and value constraints. The issue is cross-table reference validity, not data type.*

D. User-defined integrity — a custom business rule blocks the insertion
*Feedback: Incorrect — while referential integrity can be seen as a type of business rule, it is specifically enforced by foreign key constraints in the DBMS.*

**Hint:** Foreign key constraint: every reference must point to something that exists. What rule enforces this?

**Explanation:** Chapter 6 defines referential integrity as the rule that every foreign key value must match an existing primary key value in the referenced table (or be NULL if allowed). The DBMS enforces this automatically through foreign key constraints, preventing orphaned records that reference non-existent parents.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT6-Q8 | **Bloom:** Apply

---

**Q9. Entity integrity**

*Short description: Entity integrity*

The STUDENT table has StudentID as its primary key. A user tries to insert a new student row but leaves StudentID blank (NULL). The DBMS rejects the insertion. Which rule is being enforced?

A. Entity integrity — a primary key cannot be NULL; every row must have a valid identifier  ← ✓ CORRECT
*Feedback: Correct — entity integrity requires that every row has a unique, non-null primary key value. NULL violates this fundamental rule.*

B. Referential integrity — the StudentID must match an existing value in another table
*Feedback: Incorrect — referential integrity governs foreign keys, not primary keys. StudentID is a primary key.*

C. Domain integrity — StudentID must be a positive integer
*Feedback: Incorrect — while domain integrity could enforce data type, the NULL rejection is specifically about entity integrity.*

D. Check constraint — a rule was defined that StudentID cannot be NULL
*Feedback: Incorrect — while CHECK could also enforce non-null, entity integrity is the fundamental relational rule that primary keys cannot be NULL.*

**Hint:** Primary key = must be unique and never NULL. Which rule guarantees this?

**Explanation:** Chapter 6 defines entity integrity as the requirement that every table have a primary key and that the primary key value cannot be NULL. This ensures that every row can be uniquely identified and referenced. Without entity integrity, there would be no reliable way to distinguish or reference individual rows.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT6-Q9 | **Bloom:** Understand

---

**Q10. Join reconstruction**

*Short description: Join reconstruction*

The Grading Database separates student names (in STUDENT) from grades (in STUDENT_GRADE). A report needs to show StudentName alongside each grade. According to Chapter 6, how is this information reconstructed?

A. Copy the student name into every grade row each time a report is generated
*Feedback: Incorrect — copying data is exactly what the relational model avoids. Data should be stored once and linked via keys.*

B. Join STUDENT and STUDENT_GRADE on StudentID to bring the student name into the grade result set  ← ✓ CORRECT
*Feedback: Correct — JOIN reconstructs the original view by linking related tables through their primary/foreign key relationship.*

C. Use a spreadsheet VLOOKUP function to pull names from the STUDENT table into the grade report
*Feedback: Incorrect — VLOOKUP is a spreadsheet concept. In a database, JOIN performs this operation natively and with enforcement.*

D. Store all data in one flat table so nothing needs to be reconstructed
*Feedback: Incorrect — this is the flat-table approach that the relational model explicitly rejects because of anomalies.*

**Hint:** When data is split across tables, how do you bring it back together for a report?

**Explanation:** Chapter 6 demonstrates that JOINS are the mechanism for reconstructing information split across related tables. When STUDENT_GRADE is joined with STUDENT ON StudentID, the student's name, email, and other attributes are brought into the result set. This is the power of the relational model: store once, join as needed.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT6-Q10 | **Bloom:** Apply

---

## Quick-Reference Answer Key

| # | Type | Correct Answer(s) | Points | Difficulty | Bloom |
|---|------|-------------------|--------|------------|-------|
| 1 | MS   | A, C, D, E        | 2      | 3          | Understand |
| 2 | MS   | A, C, E           | 2      | 4          | Analyze |
| 3 | MC   | B                 | 1      | 2          | Understand |
| 4 | MC   | B                 | 1      | 2          | Understand |
| 5 | MC   | B                 | 1      | 3          | Apply |
| 6 | MC   | B                 | 1      | 2          | Apply |
| 7 | MC   | B                 | 1      | 3          | Apply |
| 8 | MC   | B                 | 1      | 3          | Apply |
| 9 | MC   | A                 | 1      | 2          | Understand |
| 10 | MC   | B                 | 1      | 3          | Apply |
