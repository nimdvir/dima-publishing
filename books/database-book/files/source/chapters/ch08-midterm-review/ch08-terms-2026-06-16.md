# Chapter 8: Midterm Review — Term Treasury

> Cumulative reference covering Chapters 2–7, synthesized for midterm preparation. Use this as a consolidated study guide for the Chapter 8 midterm test and project.

---

## Essential Vocabulary

### A

- **Access (Microsoft Access)** — A desktop relational DBMS with a visual interface for building tables, queries, forms, and reports; one of three platforms used in the course alongside SQLite and Supabase.
- **ACID Properties** — Atomicity, Consistency, Isolation, Durability; four guarantees that define reliable transaction processing.
- **Aggregation** — Combining multiple data values into a summary measure (SUM, AVG, COUNT, MIN, MAX).
- **Alias** — A temporary name assigned to a table or column in a query using the `AS` keyword.
- **Anomaly (Data Anomaly)** — A data integrity problem caused by poor table design: insertion anomaly, update anomaly, or deletion anomaly.
- **Atomicity** — The property that a transaction is "all or nothing"; either every operation completes or none of them do.
- **Attribute** — A property or characteristic of an entity; becomes a column in a relational table.
- **Audit Trail** — A record of changes to data (who, when, what changed) used for accountability and compliance.

### B

- **BETWEEN** — A SQL operator that filters values within an inclusive range (e.g., `Score BETWEEN 60 AND 100`).
- **Bloom's Taxonomy** — A hierarchy of cognitive skills (Remember, Understand, Apply, Analyze, Evaluate, Create) used to frame learning outcomes.
- **Boolean Logic** — Logic using AND, OR, and NOT operators to combine conditions in SQL WHERE clauses.
- **Business Rule** — A policy or constraint governing how data is structured and enforced in a database.

### C

- **Candidate Key** — A minimal set of attributes that uniquely identifies each row; one is chosen as the primary key.
- **Cardinality** — The number of rows in a table, or the type of relationship between entities (1:1, 1:N, M:N).
- **CASCADE** — A referential integrity action that automatically propagates changes (updates or deletes) from parent to child records.
- **CASE Expression** — A SQL construct that returns different values based on conditions; used for conditional logic within queries.
- **Column** — A single attribute or field in a relational table; holds one type of data.
- **Composite Key** — A primary key composed of two or more columns.
- **Constraint** — A rule enforced by the DBMS to maintain data integrity (PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, CHECK, DEFAULT).
- **CREATE TABLE** — A DDL statement that defines a new table with its columns, data types, and constraints.
- **CROSS JOIN** — A join that returns every combination of rows from two tables (Cartesian product).
- **CTE (Common Table Expression)** — A temporary named result set defined with `WITH` that simplifies complex queries.

### D

- **Data** — Raw, unprocessed facts without context.
- **Data Definition Language (DDL)** — SQL commands that define database structure: CREATE, ALTER, DROP.
- **Data Independence** — The ability to change the database schema without affecting applications.
- **Data Manipulation Language (DML)** — SQL commands that work with data: SELECT, INSERT, UPDATE, DELETE.
- **Data Type** — The kind of value a column can hold (INTEGER, TEXT, REAL, DATE, BOOLEAN, etc.).
- **Database** — An organized collection of related data managed by a DBMS.
- **Database Management System (DBMS)** — Software that creates, manages, and provides controlled access to databases.
- **Decomposition** — Splitting a table into smaller tables to eliminate redundancy, as part of normalization.
- **DELETE** — A DML statement that removes rows from a table.
- **Denormalization** — The deliberate reversal of normalization to improve query performance, accepting controlled redundancy.
- **Derived Attribute** — An attribute whose value is calculated from other stored data (e.g., Age from DateOfBirth).
- **DIKW Hierarchy** — Data → Information → Knowledge → Wisdom; a framework for understanding how raw facts become actionable insight.
- **DISTINCT** — A SQL keyword that eliminates duplicate rows from query results.

### E

- **Entity** — A distinguishable real-world object or concept about which data is stored; becomes a table in a relational database.
- **Entity-Relationship (ER) Model** — A conceptual data model using entities, attributes, and relationships to represent database structure.
- **ERD (Entity-Relationship Diagram)** — A visual diagram depicting entities, their attributes, and the relationships between them.

### F

- **Field** — A single data item within a record; synonymous with column in relational databases.
- **Five-Component Framework** — Hardware, Software, Data, Procedures, People; the five components of every information system.
- **Foreign Key (FK)** — A column that references the primary key of another table, establishing a relationship between them.
- **FROM Clause** — The SQL clause that specifies the table(s) from which data is retrieved.
- **Full Outer Join** — A join that returns all rows from both tables, with NULLs where no match exists.
- **Functional Dependency** — A relationship where one attribute uniquely determines another (e.g., StudentID → StudentName).

### G

- **GIGO (Garbage In, Garbage Out)** — The principle that poor-quality input produces poor-quality output.
- **GROUP BY** — A SQL clause that groups rows sharing common values for use with aggregate functions.

### H

- **HAVING** — A SQL clause that filters groups created by GROUP BY, as opposed to WHERE which filters individual rows.

### I

- **IN** — A SQL operator that tests whether a value matches any value in a list or subquery.
- **Index** — A data structure that speeds up data retrieval at the cost of additional write overhead.
- **Information** — Data that has been processed, organized, or structured to provide meaning and context.
- **Information System (IS)** — A system of hardware, software, data, procedures, and people that produces information for decision-making.
- **INNER JOIN** — A join that returns only rows with matching values in both tables.
- **INSERT** — A DML statement that adds new rows to a table.
- **Intersection Table (Junction Table)** — A table created to resolve a many-to-many relationship, containing foreign keys from both parent tables.

### J

- **JOIN** — A SQL operation that combines rows from two or more tables based on a related column.
- **Junction Table** — See Intersection Table.

### K

- **Key** — An attribute or set of attributes used to uniquely identify rows or establish relationships between tables.
- **Knowledge** — Information that has been interpreted, understood, and contextualized for decision-making.

### L

- **LEFT JOIN (LEFT OUTER JOIN)** — A join that returns all rows from the left table and matching rows from the right table; unmatched rows show NULLs.
- **LIKE** — A SQL operator used for pattern matching with wildcards (% for any characters, _ for one character).
- **Logical View** — The way users and applications see data, independent of physical storage.

### M

- **Management Information System (MIS)** — A system that provides managers with reports and tools for decision-making.
- **Many-to-Many (M:N) Relationship** — A relationship where multiple instances of one entity relate to multiple instances of another; resolved via a junction table.
- **Metadata** — Data about data; describes the structure, meaning, and context of stored information.
- **Modification Anomaly** — A collective term for insertion, update, and deletion anomalies caused by unnormalized data.

### N

- **Natural Key** — A key derived from real-world data (e.g., SSN, email) as opposed to a surrogate key.
- **NOIR Measurement Levels** — Nominal, Ordinal, Interval, Ratio; four levels describing the nature of data values.
- **Normal Form** — A standard for organizing relational data to reduce redundancy (1NF, 2NF, 3NF, BCNF).
- **Normalization** — The process of organizing tables into normal forms to eliminate redundancy and anomalies.
- **NOT NULL** — A constraint requiring that a column always contains a value.
- **NULL** — A marker representing missing, unknown, or inapplicable data; not the same as zero or empty string.

### O

- **One-to-Many (1:N) Relationship** — A relationship where one instance of an entity relates to many instances of another; the most common relationship type.
- **One-to-One (1:1) Relationship** — A relationship where one instance of an entity relates to exactly one instance of another.
- **ORDER BY** — A SQL clause that sorts query results by one or more columns (ASC or DESC).

### P

- **Partial Dependency** — When a non-key attribute depends on only part of a composite primary key; violates 2NF.
- **Physical View** — How data is actually stored on disk, managed by the DBMS.
- **Primary Key (PK)** — The column or set of columns that uniquely identifies each row in a table; cannot contain NULLs.

### Q

- **Query** — A request for data from a database, typically written in SQL.

### R

- **R.E.A.D. Framework** — Representation, Evaluation, Action/Decision, Deployment; a model for understanding how data becomes actionable insight.
- **Record** — A single row in a table, representing one instance of an entity.
- **Redundancy** — Unnecessary duplication of data, leading to anomalies and inconsistency.
- **Referential Integrity** — A constraint ensuring foreign key values correspond to existing primary key values in the referenced table.
- **Relational Database** — A database organized into tables (relations) with rows (tuples) and columns (attributes), connected by keys.
- **Relational Model** — A data model based on mathematical relations; data is stored in tables and manipulated through relational algebra/SQL.
- **Relationship** — An association between entities, classified by cardinality (1:1, 1:N, M:N).
- **RIGHT JOIN (RIGHT OUTER JOIN)** — A join that returns all rows from the right table and matching rows from the left table.
- **Row** — A single record or tuple in a relational table.

### S

- **Schema** — The overall structure of a database, including tables, columns, data types, keys, and constraints.
- **SELECT** — A DML statement that retrieves data from one or more tables.
- **Self-Join** — A join where a table is joined to itself; used for hierarchical or recursive relationships.
- **SQL (Structured Query Language)** — The standard language for managing and querying relational databases.
- **Subquery** — A query nested inside another query, used in WHERE, FROM, or SELECT clauses.
- **Surrogate Key** — A system-generated artificial identifier (e.g., auto-increment integer) used as a primary key.

### T

- **Table** — A structured collection of related data organized in rows and columns; the fundamental unit of a relational database.
- **Transaction** — A logical unit of work that groups database operations into an all-or-nothing action.
- **Transitive Dependency** — When a non-key attribute depends on another non-key attribute rather than directly on the primary key; violates 3NF.
- **Trigger** — A block of database logic that executes automatically in response to a data event (INSERT, UPDATE, DELETE).
- **Tuple** — A single row in a relation (table); synonymous with record.

### U

- **UNION** — A SQL operator that combines results from two or more SELECT statements, removing duplicates (UNION ALL keeps duplicates).
- **UPDATE** — A DML statement that modifies existing data in a table.

### V

- **View** — A saved SQL query that acts as a virtual table; does not store data but presents a filtered or joined perspective.

### W

- **WHERE Clause** — A SQL clause that filters rows based on specified conditions.
- **Wildcard** — A character used in pattern matching: `%` (any sequence of characters) and `_` (any single character) in SQL LIKE.
- **Window Function** — A SQL function that performs calculations across rows related to the current row without collapsing them (e.g., ROW_NUMBER, RANK, running totals).
- **Wisdom** — The highest level of the DIKW hierarchy; the ability to apply knowledge with judgment and foresight.

---

## Acronyms

| Acronym | Full Meaning |
|---------|-------------|
| **1NF** | First Normal Form |
| **2NF** | Second Normal Form |
| **3NF** | Third Normal Form |
| **ACID** | Atomicity, Consistency, Isolation, Durability |
| **BCNF** | Boyce-Codd Normal Form |
| **BITM** | Business Information Technology Management |
| **CTE** | Common Table Expression |
| **DBMS** | Database Management System |
| **DDL** | Data Definition Language |
| **DIKW** | Data, Information, Knowledge, Wisdom |
| **DML** | Data Manipulation Language |
| **ER** | Entity-Relationship |
| **ERD** | Entity-Relationship Diagram |
| **FK** | Foreign Key |
| **GIGO** | Garbage In, Garbage Out |
| **IS** | Information Systems |
| **M:N** | Many-to-Many (relationship) |
| **MIS** | Management Information System |
| **NOIR** | Nominal, Ordinal, Interval, Ratio |
| **PK** | Primary Key |
| **R.E.A.D.** | Representation, Evaluation, Action/Decision, Deployment |
| **SQL** | Structured Query Language |

---

## Key Concepts

### Foundational Ideas

1. **Information Systems & MIS (Ch 1–2)** — Every information system comprises five components: Hardware, Software, Data, Procedures, and People. MIS focuses on providing managers with information for decision-making. BITM extends this with emphasis on data management, SQL, and database design.

2. **Data Fundamentals (Ch 3)** — Data exists on a hierarchy (DIKW) and varies by structure (structured, semi-structured, unstructured) and measurement level (NOIR). Data quality is governed by GIGO; poor input yields poor output.

3. **Database Foundations (Ch 4)** — A database is an organized collection of related data managed by a DBMS. Key advantages over flat files: reduced redundancy, enforced integrity, concurrent access, security, and data independence.

4. **SQL as the Universal Language (Ch 5)** — SQL divides into DDL (structure) and DML (data). Core operations: SELECT, INSERT, UPDATE, DELETE. Queries are built incrementally from simple retrieval to multi-table joins, grouping, and filtering.

5. **The Relational Model (Ch 6)** — Data is organized into tables connected by primary and foreign keys. Three principles: unique rows (PK), defined relationships (FK), and domain constraints. Referential integrity ensures consistency across related tables.

6. **Normalization (Ch 7)** — A systematic process of organizing tables to eliminate redundancy and anomalies. Progression: 1NF (atomic values) → 2NF (no partial dependencies) → 3NF (no transitive dependencies). The mnemonic: "The key, the whole key, and nothing but the key."

7. **Midterm Review (Ch 8)** — The midterm synthesizes Chapters 2–7 into two assessments: a test checking your ability to query and interpret an existing quiz database, and a project checking your ability to design, populate, and query a grading database from scratch. Together they confirm you can move from data to tables to relationships to queries to decisions as one connected system.

### Concept Overview

1. **Three-Platform Approach** — The course uses Access (visual, beginner-friendly), SQLite (lightweight, standards-compliant), and Supabase/PostgreSQL (cloud-scale, enterprise-grade) to demonstrate that core database concepts are platform-independent.

2. **Grading Database as Case Study** — A multi-table schema (STUDENT, DELIVERABLE, STUDENT_GRADE, ASSIGNMENT, SCHEDULE, ATTENDANCE, GRADE_SCALE) used throughout the course to ground every concept in a concrete, relatable domain.

3. **SQL Sublanguages** — DDL (CREATE, ALTER, DROP) defines structure. DML (SELECT, INSERT, UPDATE, DELETE) manipulates data. DCL (GRANT, REVOKE) controls access. TCL (BEGIN, COMMIT, ROLLBACK) manages transactions.

4. **JOIN Types** — INNER JOIN (matching rows only), LEFT JOIN (all left + matching right), RIGHT JOIN (all right + matching left), FULL OUTER JOIN (all from both), CROSS JOIN (Cartesian product), SELF JOIN (table joined to itself).

5. **Normal Forms** — 1NF: atomic values, unique rows. 2NF: no partial dependencies on composite keys. 3NF: no transitive dependencies. BCNF: every determinant is a candidate key.

6. **Entity-Relationship Modeling** — Entities (tables), attributes (columns), and relationships (foreign keys) form the conceptual foundation. Cardinality (1:1, 1:N, M:N) and participation (mandatory vs. optional) constrain every relationship.

7. **Referential Integrity** — FK values must match existing PK values. Enforcement options: RESTRICT (block), CASCADE (propagate), SET NULL (nullify). Prevents orphaned records.

### Application in Practice

1. **Building Queries Incrementally** — Start with simple SELECT, add WHERE filters, JOIN related tables, GROUP BY for summaries, HAVING for group filters, ORDER BY for sorting. Each clause adds one layer of logic.

2. **Detecting Missing Data** — LEFT JOIN from expected combinations to actual data, then filter WHERE actual IS NULL. Critical for finding missing student submissions.

3. **Weighted Grading** — Combine JOIN + GROUP BY + CASE + SUM to calculate weighted averages per student across different deliverable categories (quizzes, exams, projects).

4. **Normalization in Practice** — Identify anomalies in flat tables → decompose into separate entities → define relationships with foreign keys → validate that no partial or transitive dependencies remain.

5. **Window Functions for Analytics** — Use RANK(), ROW_NUMBER(), and running AVG() with OVER(PARTITION BY ... ORDER BY ...) to calculate rankings and cumulative metrics without collapsing row-level detail.

### Real-World Examples

1. **Grading System** — Students, deliverables, grades, attendance, and schedules modeled across seven related tables. Demonstrates entity identification, relationship types, normalization, and SQL query patterns.

2. **PetVax Clinic** — A veterinary clinic database exploring pet records, vaccinations, and appointments. Used for introducing entity design and hands-on SQL practice.

3. **Missing-Work Detection** — A LEFT JOIN pattern that cross-joins students with deliverables and identifies gaps where no grade exists — directly applicable to any attendance or completion tracking system.

4. **Academic Integrity & Audit** — Triggers that log every grade change to an audit table, preserving who changed what and when — required for FERPA compliance in educational settings.
