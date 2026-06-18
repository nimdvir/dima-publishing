# RAT 9 — Top Questions (Optimized)

**Source:** Chapter 9 — Database Design and ER Modeling (ch09-main-2026-06-17.md)
**Date:** 2026-06-17
**Total:** 10 questions (2 multi-select + 8 multiple-choice)
**Bloom distribution:** 3 Understand, 5 Apply, 1 Analyze, 1 Evaluate
**Selection criteria:** Core chapter concepts — data anomalies, ER modeling, Crow's Foot notation, relationship types, weak/associative entities, surrogate keys, recursive relationships, logical vs physical design, and common design mistakes.
**CSV file:** `rat-9-optimized.csv`

---

<div style="background: #F0FDFA; border-left: 4px solid #0F766E; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0;">
<p style="margin: 0 0 8px 0; font-size: 1.05em; color: #18181b;">This <strong>Reading Assessment Test (RAT)</strong> is based on <strong style="color: #0f766e;">Chapter 9: Database Design and ER Modeling</strong> in the course textbook, <a rel="noopener" href="https://data-pilot.dimapublishing.com/" style="color: #0e7490; font-weight: 600; text-decoration: none;"> <strong>Using Data to Drive Business Performance</strong> </a>.</p>
<p style="margin: 0; font-size: 0.95em; color: #18181b;">Make sure you complete reading the chapter and then answer the questions here: <a rel="noopener" href="https://data-pilot.dimapublishing.com/book/ch09/introduction/1" style="color: #4f46e5; font-weight: 600; text-decoration: none;"> Chapter 9 — Database Design and ER Modeling → </a></p>
</div>

---

## Multi-Select Questions

**Q1. Data anomalies identification**

*Short description: Data anomalies identification*

A professor stores all grading data in one flat GRADE_FLAT table with columns: StudentID, StudentName, StudentEmail, DeliverableName, Score, DeliverableType, Weight. The same student appears in multiple rows. A student changes their email address.

Select ALL that apply.

A. Update anomaly: the new email must be changed in every row where that student appears  ← ✓ CORRECT
*Feedback: Correct — because student data repeats in every grade row, changing one fact requires updating many rows.*

B. Deletion anomaly: removing the only grade row for a student also removes the only record that the student exists  ← ✓ CORRECT
*Feedback: Correct — when deleting the last grade, the student record is lost because themes are mixed in one table.*

C. Join anomaly: the flat table cannot be joined with other tables
*Feedback: Incorrect — there is no named anomaly called a join anomaly. The four named anomalies are insertion, update, deletion, and redundancy.*

D. Insertion anomaly: a new student who has not submitted any work cannot be added to the table  ← ✓ CORRECT
*Feedback: Correct — because student and grade data are mixed, there is no place to record a student without also recording a grade.*

E. Redundancy: StudentName and StudentEmail repeat across every grade row for that student  ← ✓ CORRECT
*Feedback: Correct — flat tables store the same non-key data in many rows, wasting storage and risking inconsistency.*

**Hint:** Chapter 9 names four specific anomaly types. Think about what happens when themes are mixed in one table.

**Explanation:** Chapter 9 revisits the four modification anomalies that drive the need for database design: update (one change requires many edits), insertion (cannot add one fact without another), deletion (removing one fact destroys another), and redundancy (same data stored repeatedly). The GRADE_FLAT table exhibits all four because it mixes student, deliverable, and grade themes.

**Points:** 2 | **Difficulty:** 3/5 | **ID:** BITM330-RAT9-Q1 | **Bloom:** Understand

---

**Q2. ER modeling concepts**

*Short description: ER modeling concepts*

Chapter 9 introduces Entity-Relationship (ER) modeling as the primary tool for database design. Which statements correctly describe ER modeling concepts?

Select ALL that apply.

A. An entity is a thing or object we track — like STUDENT or DELIVERABLE — and becomes a table in the relational model  ← ✓ CORRECT
*Feedback: Correct — entities represent real-world objects or concepts. Each entity maps to a table in the physical database.*

B. Attributes are always single-valued and cannot be composite
*Feedback: Incorrect — Chapter 9 describes attribute types including composite, multi-valued, and derived attributes.*

C. A relationship describes an association between entities — such as a STUDENT submits a DELIVERABLE  ← ✓ CORRECT
*Feedback: Correct — relationships connect entities and are implemented through foreign keys or junction tables.*

D. Crow's Foot notation uses symbols like ||, o|, and >o to represent cardinality and optionality  ← ✓ CORRECT
*Feedback: Correct — Crow's Foot is the notation used throughout Chapter 9 to visually represent relationship constraints.*

E. ER modeling replaces the need for SQL — once you draw the ERD, the database builds itself
*Feedback: Incorrect — ER modeling is a design tool. The ERD must be translated into SQL CREATE TABLE statements following the mapping algorithm.*

**Hint:** ER modeling = entities + attributes + relationships. Think about what each concept represents.

**Explanation:** Chapter 9 establishes ER modeling as the bridge between business requirements and database structure. Entities become tables, attributes become columns, and relationships become foreign keys or junction tables. Crow's Foot notation provides a visual language for expressing cardinality (how many) and optionality (must or may).

**Points:** 2 | **Difficulty:** 4/5 | **ID:** BITM330-RAT9-Q2 | **Bloom:** Analyze

---

## Multiple-Choice Questions

**Q3. Deletion anomaly**

*Short description: Deletion anomaly*

In the GRADE_FLAT table, a student has only one recorded grade. If that grade row is deleted, the student's name, email, and ID are also lost. What type of anomaly does this illustrate?

A. Insertion anomaly — the student cannot be added without a grade
*Feedback: Incorrect — insertion anomaly prevents adding data. This scenario involves removing data and losing unrelated information.*

B. Deletion anomaly — removing the only grade row also removes the only record that the student exists  ← ✓ CORRECT
*Feedback: Correct — deletion anomaly occurs when removing one fact (a grade) unintentionally destroys another fact (the student's identity).*

C. Update anomaly — the student's information is inconsistent across rows
*Feedback: Incorrect — update anomaly involves changing data inconsistently. This scenario involves deleting data.*

D. Redundancy anomaly — the same student data is stored multiple times
*Feedback: Incorrect — while redundancy exists in the flat table, the specific problem of losing student identity when deleting a grade is a deletion anomaly.*

**Hint:** Deletion anomaly = removing one fact destroys another unrelated fact.

**Explanation:** Chapter 9 explains that deletion anomaly occurs when themes are mixed in one table: removing a row for one purpose (deleting a grade) also removes data needed for another purpose (the student record). The normalized design solves this by storing students and grades in separate tables.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT9-Q3 | **Bloom:** Understand

---

**Q4. Crow's Foot notation**

*Short description: Crow's Foot notation*

In Crow's Foot notation, what does the symbol || mean at the end of a relationship line?

A. Exactly one — the entity on that side must participate exactly once  ← ✓ CORRECT
*Feedback: Correct — the double-bar (||) means "one and only one," indicating mandatory participation of exactly one.*

B. Zero or one — the entity on that side may or may not participate
*Feedback: Incorrect — zero-or-one is represented by |o (single bar with a circle), not ||.*

C. Zero or many — the entity on that side may participate any number of times or not at all
*Feedback: Incorrect — zero-or-many is represented by o{ (circle with crow's foot), not ||.*

D. Exactly many — the entity must participate with multiple related rows
*Feedback: Incorrect — there is no symbol for "exactly many." The crow's foot symbol represents zero-or-many or one-or-many.*

**Hint:** || = one and only one. |o = zero or one. o{ = zero or many. >o = one or many.

**Explanation:** Chapter 9 introduces Crow's Foot notation with four basic symbols: || (one, mandatory), |o (zero or one, optional), >o (one or many, mandatory many), and o{ (zero or many, optional many). These symbols express both cardinality (how many) and optionality (must or may).

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT9-Q4 | **Bloom:** Understand

---

**Q5. Surrogate key**

*Short description: Surrogate key*

In the Grading Database, GradeID is an auto-number column with no business meaning. According to Chapter 9, what type of key is this?

A. Natural key — it is derived from the data itself
*Feedback: Incorrect — a natural key has real-world meaning (like SSN or email). GradeID is system-generated and artificial.*

B. Surrogate key — it is a system-generated identifier with no business meaning  ← ✓ CORRECT
*Feedback: Correct — surrogate keys are artificial identifiers (like auto-numbers or UUIDs) that serve only to uniquely identify rows.*

C. Composite key — it is made up of two or more columns combined
*Feedback: Incorrect — a composite key uses multiple columns. GradeID is a single column.*

D. Foreign key — it references a primary key in another table
*Feedback: Incorrect — a foreign key points to another table's primary key. GradeID is the primary key of STUDENT_GRADE.*

**Hint:** Surrogate = system-generated, artificial, no business meaning. Natural = real-world identifier.

**Explanation:** Chapter 9 distinguishes surrogate keys (system-generated, like auto-number or UUID) from natural keys (real-world, like email or SSN). Surrogate keys are stable, never change, and are the default recommendation for primary keys in the textbook's design methodology.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT9-Q5 | **Bloom:** Understand

---

**Q6. Weak vs strong entity**

*Short description: Weak vs strong entity*

In the Grading Database, STUDENT_GRADE depends on STUDENT and DELIVERABLE for its identity — a grade cannot exist without both a student and a deliverable. According to Chapter 9, what type of entity is STUDENT_GRADE?

A. Strong entity — it has its own independent primary key (GradeID)
*Feedback: Incorrect — although STUDENT_GRADE may have a surrogate GradeID, it is existence-dependent on STUDENT and DELIVERABLE, making it a weak or associative entity.*

B. Associative entity — it represents a relationship (M:M between STUDENT and DELIVERABLE) that carries its own attribute (Score)  ← ✓ CORRECT
*Feedback: Correct — STUDENT_GRADE resolves the M:M relationship and stores the Score attribute that belongs to the relationship, not to either entity alone.*

C. Supertype entity — it generalizes STUDENT and DELIVERABLE into a single structure
*Feedback: Incorrect — a supertype generalizes subtypes. STUDENT_GRADE does not generalize STUDENT and DELIVERABLE.*

D. Derived entity — its data can be calculated from other tables without storage
*Feedback: Incorrect — STUDENT_GRADE stores actual Score values. It is not a derived or calculated entity.*

**Hint:** If an entity exists only because of a relationship between two other entities, what is it called?

**Explanation:** Chapter 9 identifies STUDENT_GRADE as an associative entity (also called a junction or bridge entity). It resolves the M:M relationship between STUDENT and DELIVERABLE and stores the Score attribute — which belongs to the relationship itself, not to either participating entity alone.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT9-Q6 | **Bloom:** Apply

---

**Q7. M:M resolution with junction table**

*Short description: M:M resolution*

A STUDENT can enroll in multiple COURSEs, and each COURSE has multiple STUDENTs. According to Chapter 9, how should this many-to-many relationship be implemented in a relational database?

A. Put a foreign key in both the STUDENT and COURSE tables pointing to each other
*Feedback: Incorrect — mutual foreign keys cannot properly represent multiple relationships between the same pair of entities.*

B. Create an ENROLLMENT junction table with foreign keys to both STUDENT and COURSE, together forming a composite primary key  ← ✓ CORRECT
*Feedback: Correct — many-to-many relationships require a third table that breaks the M:M into two 1:M relationships.*

C. Store multiple CourseIDs in a single STUDENT column, separated by commas
*Feedback: Incorrect — multi-valued cells violate First Normal Form and prevent SQL from reliably querying or enforcing integrity.*

D. Create a separate database for the enrollment relationship
*Feedback: Incorrect — all related data should exist within a single database. Separate databases prevent joining across the relationship.*

**Hint:** M:M always needs three tables: the two entities plus a bridge table with foreign keys to both.

**Explanation:** Chapter 9 explains that M:M relationships cannot be directly implemented with a single foreign key. A junction (associative) table — such as ENROLLMENT — containing foreign keys to both STUDENT and COURSE resolves the M:M into two 1:M relationships. The junction table's primary key is typically the composite of both foreign keys.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT9-Q7 | **Bloom:** Apply

---

**Q8. Self-referencing relationship**

*Short description: Self-referencing relationship*

An EMPLOYEE table has a ManagerID column that references EmployeeID in the same table. According to Chapter 9, what type of relationship does this represent?

A. Binary one-to-many — each employee has one manager in a separate MANAGER table
*Feedback: Incorrect — ManagerID references the same EMPLOYEE table, not a separate MANAGER table.*

B. Recursive (self-referencing) relationship — a foreign key in a table references the primary key of the same table  ← ✓ CORRECT
*Feedback: Correct — when a foreign key points back to the same table's primary key, it represents a recursive or self-referencing relationship.*

C. Many-to-many — employees and managers have a complex relationship requiring a junction table
*Feedback: Incorrect — although conceptually an employee could have multiple managers over time, a single ManagerID column represents a 1:M recursive relationship.*

D. Weak entity — EMPLOYEE depends on another entity for its identity
*Feedback: Incorrect — EMPLOYEE is a strong entity with its own primary key (EmployeeID). The ManagerID is a foreign key, not part of identity.*

**Hint:** A foreign key that points to the same table it belongs to represents what kind of relationship?

**Explanation:** Chapter 9 describes recursive (self-referencing) relationships as cases where a foreign key column references the primary key of the same table. EMPLOYEE.ManagerID → EMPLOYEE.EmployeeID is a classic example, used to represent hierarchical structures like reporting chains within a single table.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT9-Q8 | **Bloom:** Apply

---

**Q9. Logical vs physical design**

*Short description: Logical vs physical design*

According to Chapter 9, why should logical database design remain platform-independent?

A. Because all database platforms (Access, SQL Server, PostgreSQL) use identical SQL syntax
*Feedback: Incorrect — different platforms have different SQL dialects, data types, and constraint syntax.*

B. Because the logical design captures WHAT data and relationships are needed independently of HOW any specific DBMS implements them  ← ✓ CORRECT
*Feedback: Correct — logical design focuses on entities, attributes, and relationships without committing to a specific platform's data types or syntax.*

C. Because platform-independent designs can skip the implementation phase entirely
*Feedback: Incorrect — all designs must eventually be implemented. Logical design postpones platform decisions, not implementation.*

D. Because normalization rules only apply to logical designs, not physical implementations
*Feedback: Incorrect — normalization applies at both levels. The distinction is about when platform-specific decisions are made.*

**Hint:** Logical = WHAT (entities, attributes, relationships). Physical = HOW (data types, indexes, platform-specific syntax).

**Explanation:** Chapter 9 distinguishes three design levels: conceptual (business requirements), logical (platform-independent structure), and physical (platform-specific implementation). Keeping logical design independent allows the same design to be implemented on different DBMS platforms without redesigning the fundamental structure.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT9-Q9 | **Bloom:** Apply

---

**Q10. Reports vs tables design mistake**

*Short description: Reports vs tables*

A junior designer creates a table called MONTHLY_SALES_REPORT that combines customer names, product details, and monthly totals into a single table matching an existing report layout. According to Chapter 9, what design mistake does this represent?

A. No mistake — matching tables to report layouts is an efficient database design strategy
*Feedback: Incorrect — Chapter 9 explicitly warns against designing tables to match reports. Tables should model the underlying data, not presentation formats.*

B. First Normal Form violation — the table contains repeating groups of monthly columns
*Feedback: Incorrect — while the table might have design issues, the core mistake identified in Chapter 9 is about treating reports as tables, not a specific normal form violation.*

C. Treating reports as tables — tables should model entities and relationships, not presentation layouts  ← ✓ CORRECT
*Feedback: Correct — reports are outputs derived from queries over properly normalized tables. Designing tables to match reports embeds presentation logic into storage structure.*

D. Physical design error — the table uses the wrong data types for the target platform
*Feedback: Incorrect — the problem is structural (modeling a report instead of entities), not about data type selection.*

**Hint:** Should your tables model the business data, or should they mirror the final report layout?

**Explanation:** Chapter 9 lists "treating reports as tables" as one of the most common database design mistakes. Tables should model entities, attributes, and relationships — the underlying data structure. Reports are derived views created by queries. Designing tables to match reports creates redundancy, limits flexibility, and makes the database harder to maintain as reporting needs change.

**Points:** 1 | **Difficulty:** 4/5 | **ID:** BITM330-RAT9-Q10 | **Bloom:** Evaluate

---

## Quick-Reference Answer Key

| # | Type | Correct Answer(s) | Points | Difficulty | Bloom |
|---|------|-------------------|--------|------------|-------|
| 1 | MS   | A, B, D, E        | 2      | 3          | Understand |
| 2 | MS   | A, C, D           | 2      | 4          | Analyze |
| 3 | MC   | B                 | 1      | 2          | Understand |
| 4 | MC   | A                 | 1      | 2          | Understand |
| 5 | MC   | B                 | 1      | 2          | Understand |
| 6 | MC   | B                 | 1      | 3          | Apply |
| 7 | MC   | B                 | 1      | 3          | Apply |
| 8 | MC   | B                 | 1      | 3          | Apply |
| 9 | MC   | B                 | 1      | 3          | Apply |
| 10 | MC   | C                 | 1      | 4          | Evaluate |
