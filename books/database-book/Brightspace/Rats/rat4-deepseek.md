# RAT 4 — Top Questions (DeepSeek Curation)

**Source:** Chapter 4 — Introduction to Databases (ch04-main-2026-06-04.md)
**Date:** 2026-06-17
**Total:** 10 questions (2 multi-select + 8 multiple-choice)
**Bloom distribution:** 1 Understand, 3 Apply, 4 Analyze, 2 Evaluate
**Selection criteria:** Higher Bloom levels (Apply, Analyze, Evaluate), scenario-based reasoning, AI-resistance, and broad coverage of all major chapter sections.
**CSV file:** `rat4-deepseek.csv`

---

## Multi-Select Questions

**Q1. Flat-File Anomalies — Veterinary Clinic Appointments**

*Short description: Tests your ability to identify the specific anomalies that arise when pet, owner, and appointment themes are mixed in one flat table.*

A veterinary clinic tracks appointments in a single flat table with these columns: PetID, PetName, OwnerName, OwnerPhone, AppointmentDate, VetName, ServiceDescription.

Select ALL that apply.

A. Update anomaly: changing an owner's phone number requires editing every appointment row for that owner  ← ✓ CORRECT
*Feedback: Correct — owner information is repeated in every appointment row, so a phone number change requires multiple edits.*

B. Index anomaly: the table cannot be sorted by AppointmentDate
*Feedback: Incorrect — flat tables can be sorted; there is no named anomaly called an index anomaly in Chapter 4.*

C. Insertion anomaly: a new pet cannot be recorded in the system until they have an appointment  ← ✓ CORRECT
*Feedback: Correct — because the table mixes appointments and pets, there is no place to record a pet without also recording an appointment.*

D. Deletion anomaly: cancelling the only appointment for a pet also removes the only record that the pet and owner exist  ← ✓ CORRECT
*Feedback: Correct — when pet, owner, and appointment data are mixed, deleting an appointment row can destroy the pet and owner records.*

E. Data redundancy: the same owner name and phone number are stored in every appointment row for that owner's pets  ← ✓ CORRECT
*Feedback: Correct — repeating owner attributes across multiple rows is data redundancy, increasing storage and risking inconsistency.*

**Hint:** Chapter 4 names the same four anomaly types as Chapter 3. Think about what happens to pet/owner data when appointment rows are added, changed, or removed.

**Explanation:** Chapter 4 revisits the four modification anomalies — insertion, update, deletion, and data redundancy — in the context of flat table design. The veterinary clinic flat table exhibits all four: update anomaly (owner phone change requires many edits), insertion anomaly (new pet needs an appointment to be recorded), deletion anomaly (cancelling an appointment loses pet/owner data), and data redundancy (owner info repeated per appointment).

**Points:** 2 | **Difficulty:** 4/5 | **ID:** BITM330-RAT4-Q1 | **Bloom:** Analyze

---

**Q2. Database Approach Benefits — Multi-Department Retailer**

*Short description: Tests your ability to identify which specific database benefits directly address the problems described in a multi-department spreadsheet scenario.*

A retailer's purchasing, inventory, and sales departments each maintain their own spreadsheets with overlapping product data. Product IDs are inconsistent across departments, and the same product may have three different descriptions. The company is considering moving to a shared database.

Select ALL that apply.

A. Centralized source of truth: a single shared database ensures all departments work from the same product data  ← ✓ CORRECT
*Feedback: Correct — a database provides one authoritative copy of each data element, eliminating conflicting versions across spreadsheets.*

B. Faster spreadsheet formulas: the database will calculate totals faster than Excel
*Feedback: Incorrect — the database approach is about structural integrity, not formula speed comparisons with spreadsheets.*

C. Redundancy control: product data is stored once and referenced by ID, eliminating repeated and inconsistent product descriptions  ← ✓ CORRECT
*Feedback: Correct — databases control redundancy by design: each fact is stored in one place and linked via keys rather than copied.*

D. Referential integrity enforcement: the database can enforce that every product ID in an order row matches a real product in the Products table  ← ✓ CORRECT
*Feedback: Correct — foreign key constraints ensure that references between tables are valid, preventing orphaned or mismatched records.*

E. Automatic report generation: the database will generate all department reports without any configuration
*Feedback: Incorrect — databases provide reliable data for reports but do not automatically generate reports without configuration or query design.*

**Hint:** What specific structural problems does a database solve that separate spreadsheets cannot?

**Explanation:** Chapter 4 identifies key benefits of the database approach over file-based systems: centralized source of truth (one authoritative copy), controlled redundancy (each fact stored once), and referential integrity (enforced valid references between tables). These directly address the retailer's problems of inconsistent IDs, conflicting descriptions, and data spread across silos. The database approach is about structural data integrity, not formula speed or automatic reporting.

**Points:** 2 | **Difficulty:** 4/5 | **ID:** BITM330-RAT4-Q2 | **Bloom:** Analyze

---

## Multiple-Choice Questions

**Q3. Database vs. DBMS — Correct Terminology**

*Short description: Tests your understanding of the precise distinction between a database, a DBMS, and a database system.*

A student says, "Our company just bought a new database called PostgreSQL." According to Chapter 4's terminology, what is the most accurate correction to this statement?

A. The statement is correct; PostgreSQL is a database
*Feedback: Incorrect — Chapter 4 distinguishes the database (the stored collection of data) from the DBMS (the software that manages it).*

B. PostgreSQL is a DBMS — database management system software. The database is the actual collection of structured data that PostgreSQL manages  ← ✓ CORRECT
*Feedback: Correct — the DBMS is the software (PostgreSQL, Access, SQLite). The database is the data itself — the tables, relationships, and stored records managed by the DBMS.*

C. PostgreSQL is a database system, not a database or a DBMS
*Feedback: Incorrect — while "database system" can refer to the DBMS + database combination, the more precise distinction is between DBMS (software) and database (data).*

D. PostgreSQL is a query language, not a database or DBMS
*Feedback: Incorrect — SQL is the query language; PostgreSQL is the DBMS that processes SQL queries.*

**Hint:** What is the difference between the software that manages data and the data itself?

**Explanation:** Chapter 4 defines three distinct terms: a database is the structured collection of related data; a DBMS (database management system) is the software that creates, manages, and controls access to databases (e.g., PostgreSQL, Microsoft Access, SQLite); and a database system is the combination of database + DBMS + applications. PostgreSQL is a DBMS — the software — not the database itself.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT4-Q3 | **Bloom:** Understand

---

**Q4. Data Independence — Logical vs. Physical View**

*Short description: Tests your understanding of data independence — the separation between how data is physically stored and how applications logically interact with it.*

A DBA moves a large customer table to a faster SSD storage array to improve query performance. Application developers who write reports against the customer table notice no difference and make no code changes. What Chapter 4 concept does this scenario illustrate?

A. Referential integrity — the foreign keys remained valid after the move
*Feedback: Incorrect — referential integrity is about valid references between tables, not about storage location transparency.*

B. Program-data dependence — the applications depended on the old storage location
*Feedback: Incorrect — program-data dependence is the problem databases solve. This scenario shows the opposite: applications were NOT affected by the storage change.*

C. Data independence — changes to the physical storage layer do not require changes to the logical view or application code  ← ✓ CORRECT
*Feedback: Correct — data independence means the DBMS insulates applications from physical storage details. Developers query the logical structure, and the DBMS handles where data physically resides.*

D. Data redundancy — the table was duplicated on the faster drive
*Feedback: Incorrect — the scenario describes moving (not duplicating) a table; this is about storage management, not redundancy.*

**Hint:** The key phrase is "no code changes" — what concept describes insulation from physical storage changes?

**Explanation:** Chapter 4 explains data independence as a core DBMS benefit: the separation of the logical view (how data appears to users and applications — tables, columns, relationships) from the physical view (how data is actually stored on disk). When the DBA moved the table to a faster drive, the logical structure remained unchanged, so application code needed no modification.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT4-Q4 | **Bloom:** Apply

---

**Q5. Primary Key Characteristics — Student Table Design**

*Short description: Tests your understanding of the two essential properties of a primary key — uniqueness and non-nullability.*

A university's Student table uses StudentID as its primary key. Which of the following is the most important characteristic that StudentID must have to function correctly as a primary key, according to Chapter 4?

A. StudentID must be easy for students to remember
*Feedback: Incorrect — memorability is not a technical requirement for primary keys. Surrogate keys like auto-numbers are often not memorable at all.*

B. StudentID must be a number, not text
*Feedback: Incorrect — primary keys can be numeric, text, or other data types. The data type is a design choice, not a requirement.*

C. StudentID must be unique for every student and must never be NULL  ← ✓ CORRECT
*Feedback: Correct — a primary key must uniquely identify each row (entity integrity) and cannot contain NULL values. Every row must have a valid primary key value.*

D. StudentID must be the same across all related tables like Enrollment and Grades
*Feedback: Incorrect — while StudentID does appear as a foreign key in related tables, that is a foreign key relationship, not a primary key requirement.*

**Hint:** What are the two non-negotiable rules for primary keys: one about identity, one about values?

**Explanation:** Chapter 4 defines a primary key as a column (or set of columns) that uniquely identifies each row in a table. Two essential rules apply: uniqueness — no two rows can have the same primary key value; and non-nullability — every row must have a primary key value. These two properties together guarantee entity integrity: every row can be reliably identified and referenced.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT4-Q5 | **Bloom:** Apply

---

**Q6. Foreign Key Constraint — Enrollment Scenario**

*Short description: Tests your understanding of referential integrity — the foreign key constraint's role in preventing orphaned references.*

An Enrollment table has a foreign key StudentID that references the Student table's primary key. A staff member tries to insert an enrollment record for StudentID 99999, but no student with that ID exists in the Student table. According to Chapter 4, what should happen?

A. The DBMS should insert the enrollment and automatically create a new student with ID 99999
*Feedback: Incorrect — DBMSs do not automatically create parent records to satisfy foreign key constraints. That would violate data integrity principles.*

B. The DBMS should reject the insertion and return an error because the foreign key constraint is violated  ← ✓ CORRECT
*Feedback: Correct — referential integrity requires that every foreign key value must match an existing primary key value in the referenced table. A non-existent StudentID violates this constraint.*

C. The DBMS should insert the enrollment but mark StudentID 99999 as "pending verification"
*Feedback: Incorrect — DBMSs enforce constraints definitively; there is no "pending" state for constraint violations.*

D. The DBMS should insert the enrollment with a NULL StudentID instead
*Feedback: Incorrect — NULL may or may not be allowed depending on the column definition, but the DBMS does not silently substitute NULL for an invalid value.*

**Hint:** Foreign keys enforce that every reference must point to something that actually exists. What happens when it doesn't?

**Explanation:** Chapter 4 explains that foreign key constraints enforce referential integrity: every value in a foreign key column must match an existing primary key value in the referenced table, or be NULL if the column allows it. Inserting an enrollment with a non-existent StudentID violates this constraint, and the DBMS rejects the operation with an error. This protection prevents orphaned records.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT4-Q6 | **Bloom:** Apply

---

**Q7. Constraint Types — Product Table Design**

*Short description: Tests your ability to map business rules to the correct SQL constraint type — NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, or CHECK.*

A Product table needs these rules: (1) ProductName cannot be left blank, (2) no two products can have the same SKU value, and (3) Price must be greater than zero. According to Chapter 4's constraint types, which constraint handles rule (3)?

A. NOT NULL constraint — because Price must have a value
*Feedback: Incorrect — NOT NULL prevents blank values, but a price of $0 or -$5 would pass a NOT NULL check. Rule (3) is about valid values, not presence/absence.*

B. UNIQUE constraint — because each product must have a unique price
*Feedback: Incorrect — the scenario does not require unique prices; different products can have the same price. Rule (3) is about value validation.*

C. CHECK constraint — because it validates that a column's value satisfies a specific condition  ← ✓ CORRECT
*Feedback: Correct — CHECK constraints enforce domain integrity by validating that column values meet specified conditions (e.g., Price > 0, Age >= 18, Status IN ('Active','Inactive')).*

D. FOREIGN KEY constraint — because Price references values in another table
*Feedback: Incorrect — FOREIGN KEY constraints manage relationships between tables. Price validation against a business rule (must be > 0) is not a cross-table reference.*

**Hint:** Which constraint type validates that a value meets a specific condition like "greater than zero"?

**Explanation:** Chapter 4 covers five constraint types: NOT NULL (value required), UNIQUE (no duplicates), PRIMARY KEY (unique + not null, identifies each row), FOREIGN KEY (references must exist), and CHECK (value must satisfy a condition). Rule (3) — Price > 0 — is a CHECK constraint because it validates data against a domain condition rather than managing row identity, nullability, uniqueness, or cross-table references.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT4-Q7 | **Bloom:** Analyze

---

**Q8. SQL Declarative Nature — Query Intent**

*Short description: Tests your understanding of the declarative vs. procedural distinction — SQL describes WHAT to retrieve, not HOW to retrieve it.*

A new analyst writes a SQL query: SELECT CustomerName, COUNT(OrderID) FROM Customers JOIN Orders ON Customers.CustomerID = Orders.CustomerID GROUP BY CustomerName. According to Chapter 4, what makes SQL a "declarative" language?

A. SQL requires the analyst to specify which index to use for the JOIN
*Feedback: Incorrect — specifying indexes is a procedural instruction about HOW to execute the query. SQL does not require this.*

B. SQL requires the analyst to write the exact sequence of steps the DBMS must follow
*Feedback: Incorrect — this describes a procedural language. SQL is declarative precisely because it does NOT require step-by-step instructions.*

C. SQL describes the desired result — what data to retrieve and how to group it — while the DBMS determines the most efficient way to execute the query  ← ✓ CORRECT
*Feedback: Correct — declarative languages express the WHAT (desired output) while the system handles the HOW (execution plan, index selection, join strategy).*

D. SQL cannot perform calculations like COUNT without a separate programming language
*Feedback: Incorrect — SQL includes aggregate functions like COUNT, SUM, and AVG natively; no separate language is needed.*

**Hint:** Declarative = you say WHAT you want. Procedural = you say HOW to get it. Which one describes SQL?

**Explanation:** Chapter 4 contrasts SQL's declarative nature with procedural programming. In SQL, you declare the desired result — which columns, from which tables, with what grouping and conditions. You do not specify how the DBMS should scan tables, choose join algorithms, or use indexes. The DBMS query optimizer determines the most efficient execution plan automatically.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT4-Q8 | **Bloom:** Analyze

---

**Q9. Platform Choice — Access vs. SQLite vs. PostgreSQL**

*Short description: Tests your ability to select the appropriate database platform based on architectural requirements — concurrency, data integrity, and server deployment.*

A growing e-commerce company needs a database for its website that must: (1) support 500 simultaneous customer sessions, (2) enforce strict data types and relationships, and (3) run on a cloud server accessible to a development team. Using Chapter 4's platform comparison, which DBMS is the strongest fit?

A. Microsoft Access — because it enforces relationships and is easy to use
*Feedback: Incorrect — Access is a desktop/file-server DBMS not designed for 500 concurrent web users. It lacks the server-based architecture needed for high-concurrency web applications.*

B. SQLite — because it requires no server setup and is lightweight
*Feedback: Incorrect — SQLite is serverless and designed for single-user or low-concurrency embedded use (mobile apps, local tools). It is not suitable for 500 concurrent web sessions.*

C. PostgreSQL — because it supports high concurrency, strict data typing, and client-server architecture suitable for web applications  ← ✓ CORRECT
*Feedback: Correct — PostgreSQL is a client-server DBMS designed for high-concurrency, production web workloads with strong typing, referential integrity, and cloud deployment.*

D. Any of the three — all databases handle 500 users equally well
*Feedback: Incorrect — Chapter 4 explicitly distinguishes between desktop/file-server DBMSs (Access), embedded DBMSs (SQLite), and client-server DBMSs (PostgreSQL). They are designed for very different concurrency and deployment scenarios.*

**Hint:** Which platform is designed for high-concurrency web applications with client-server architecture?

**Explanation:** Chapter 4 compares Access (desktop/file-server, single-user or small workgroup focus), SQLite (serverless embedded engine, low-concurrency applications), and PostgreSQL (client-server, designed for high-concurrency production workloads). For 500 simultaneous web users with strict data integrity requirements, PostgreSQL's client-server architecture and robust concurrency handling make it the clear choice.

**Points:** 1 | **Difficulty:** 5/5 | **ID:** BITM330-RAT4-Q9 | **Bloom:** Evaluate

---

**Q10. Spreadsheet-to-Database Transition — Growing Business**

*Short description: Tests your ability to recognize when a flat-file system has outgrown its limits and what the database approach fundamentally changes.*

A small business has tracked customers and orders in a single Google Sheet for two years. The sheet now has 8,000 rows, multiple people edit it simultaneously, and orders occasionally reference non-existent customer names due to typos. Which single step would most effectively address ALL of these problems, according to Chapter 4?

A. Add data validation dropdowns in Google Sheets to prevent typos
*Feedback: Incorrect — dropdowns reduce but do not eliminate entry errors. They do not address the structural problems of mixing themes in one sheet.*

B. Split the single sheet into separate Customer and Order sheets with VLOOKUP formulas
*Feedback: Incorrect — VLOOKUP has no enforcement. A mistyped customer name still silently fails. The structural problems of flat files persist.*

C. Move to a database with two related tables (Customer and Order) linked by a CustomerID foreign key with referential integrity enforced  ← ✓ CORRECT
*Feedback: Correct — a database separates mixed themes into related tables, eliminates redundancy, and enforces valid references through foreign key constraints — addressing all three problems structurally.*

D. Restrict editing access to one person at a time
*Feedback: Incorrect — this addresses the concurrency problem but not the structural problems of mixed themes and lack of referential integrity.*

**Hint:** Which solution addresses the STRUCTURAL problems — not just the symptoms like concurrency or typos?

**Explanation:** Chapter 4 explains that flat files like spreadsheets break down due to mixed themes, lack of referential integrity, and concurrency limits. A database with properly designed related tables and foreign key constraints solves all three problems at the structural level: Customer and Order are separate tables (clean themes), foreign keys ensure valid references (no phantom customers), and the DBMS manages concurrent access.

**Points:** 1 | **Difficulty:** 5/5 | **ID:** BITM330-RAT4-Q10 | **Bloom:** Evaluate

---

## Quick-Reference Answer Key

| #   | Type | Correct Answer(s) | Points | Difficulty | Bloom      |
| --- | ---- | ----------------- | ------ | ---------- | ---------- |
| 1   | MS   | A, C, D, E        | 2      | 4          | Analyze    |
| 2   | MS   | A, C, D           | 2      | 4          | Analyze    |
| 3   | MC   | B                 | 1      | 2          | Understand |
| 4   | MC   | C                 | 1      | 3          | Apply      |
| 5   | MC   | C                 | 1      | 3          | Apply      |
| 6   | MC   | B                 | 1      | 3          | Apply      |
| 7   | MC   | C                 | 1      | 3          | Analyze    |
| 8   | MC   | C                 | 1      | 3          | Analyze    |
| 9   | MC   | C                 | 1      | 5          | Evaluate   |
| 10  | MC   | C                 | 1      | 5          | Evaluate   |
