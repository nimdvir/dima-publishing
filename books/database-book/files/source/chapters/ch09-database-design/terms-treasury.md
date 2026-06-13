<!-- metadata: date="2026-03-08"; chapter="09"; section="terms"; title="Chapter 9 Terms Treasury"; description="Key terms for database design" -->

# Term Treasury: Chapter 9 -- Database Design

## Key Terms

### A

- **Aggregation**: An EER concept that treats a relationship set as a higher-level entity, allowing it to participate in other relationships. Used when a relationship itself needs to be part of another relationship.
- **Associative (Intersection) Entity**: An entity created to resolve a many-to-many relationship, containing foreign keys to both parent entities and often carrying its own attributes (e.g., STUDENT_GRADE).
- **Attribute**: A property or characteristic of an entity that describes a single fact about it (e.g., FirstName, Email, DueDate).

### B

- **BCNF (Boyce-Codd Normal Form)**: A stricter version of Third Normal Form in which every determinant must be a candidate key.

### C

- **Candidate Key**: A minimal superkey -- a set of attributes that uniquely identifies an entity, from which no attribute can be removed without losing uniqueness.
- **Cardinality Ratio**: A constraint specifying the maximum number of relationship instances an entity can participate in (1:1, 1:N, M:N).
- **Composite Attribute**: An attribute that can be decomposed into smaller component attributes (e.g., Address into Street, City, ZipCode).
- **Conceptual Data Model**: A high-level, abstract model of the business domain, independent of any technology or DBMS. Focuses on entities, relationships, and business rules.
- **Crow's Foot Notation**: A visual notation system for ER diagrams that uses specific symbols (lines, circles, and "crow's feet") to represent cardinality and participation constraints.

### D

- **Data Anomaly**: A data integrity problem (insertion, update, or deletion) caused by poor table structure and redundant data storage.
- **Deletion Anomaly**: A data anomaly where removing one piece of data inadvertently destroys other, unrelated data.
- **Denormalization**: The deliberate process of combining normalized tables to improve query performance, accepting some redundancy as a trade-off.
- **Derived Attribute**: An attribute whose value can be calculated from other stored attributes (e.g., Age derived from BirthDate).
- **Discriminator**: An attribute in a supertype entity that indicates which subtype applies (e.g., StudentType with values 'Undergraduate' or 'Graduate').
- **Disjoint (Exclusive) Subtyping**: A specialization constraint where each superclass instance belongs to at most one subclass.

### E

- **Enhanced Entity-Relationship (EER) Model**: An extension of the basic ER model that adds constructs for weak entities, specialization/generalization, and aggregation.
- **Entity**: A distinguishable real-world object or concept about which data is stored (e.g., STUDENT, DELIVERABLE).
- **Entity Class**: The collection of all entities of a given type (e.g., all students).
- **Entity Instance**: A single occurrence of an entity (e.g., Student #2001).
- **Entity-Relationship (ER) Model**: A conceptual data model introduced by Peter Chen (1976) that uses entities, attributes, and relationships to represent the structure of a database.

### F

- **Foreign Key**: An attribute in one table that references the primary key of another table, establishing a link between them and enforcing referential integrity.
- **First Normal Form (1NF)**: A normal form requiring that every column contains only atomic values, with no repeating groups, and each row is unique.

### G

- **Generalization**: The process of defining a shared superclass from common characteristics found in multiple entity sets (bottom-up approach).

### I

- **ID-Dependent Weak Entity**: A weak entity whose primary key includes the parent entity's primary key as a component.
- **Identifying Relationship**: A relationship connecting a weak entity to its owner, providing part of the weak entity's identity. Represented by a double diamond in Chen notation and a solid line in Crow's Foot notation.
- **Insertion Anomaly**: A data anomaly where new data cannot be added because other, unrelated data is missing.

### L

- **Logical Data Model**: A detailed, platform-independent data model specifying tables, columns, keys, and constraints without committing to a specific DBMS.

### M

- **Multi-valued Attribute**: An attribute that can hold multiple values for a single entity (e.g., PhoneNumbers).

### N

- **Nonidentifying Relationship**: A relationship where the child entity has its own independent primary key. The foreign key references the parent but is not part of the child's primary key. Represented by a dashed line in Crow's Foot notation.
- **Normalization**: The process of organizing tables to minimize redundancy and eliminate data anomalies, following a progression of normal forms (1NF, 2NF, 3NF, BCNF).

### O

- **Overlapping (Inclusive) Subtyping**: A specialization constraint where an instance can belong to multiple subclasses simultaneously.

### P

- **Partial Key (Discriminator of a Weak Entity)**: An attribute of a weak entity that distinguishes among instances related to the same owner entity.
- **Partial Participation**: A participation constraint where an entity is not required to participate in a relationship (represented by a single line).
- **Participation Constraint**: A constraint specifying whether an entity's existence depends on its participation in a relationship (total/mandatory or partial/optional).
- **Physical Data Model**: A technology-specific model specifying data types, indexes, storage parameters, and security settings for a particular DBMS.
- **Primary Key**: The candidate key selected as the unique identifier for an entity set; must not contain null values.

### R

- **Recursive Relationship**: A relationship in which an entity is related to itself (e.g., EMPLOYEE manages EMPLOYEE).
- **Referential Integrity**: A constraint ensuring that foreign key values correspond to existing primary key values in the referenced table.
- **Relationship**: An association between two or more entities that reflects a business rule.
- **Relationship Degree**: The number of entity sets participating in a relationship (binary = 2, unary/recursive = 1, ternary = 3).

### S

- **SDLC (System Development Life Cycle)**: A structured framework for planning, building, deploying, and maintaining information systems through deliberate phases.
- **Second Normal Form (2NF)**: A normal form requiring that the table is in 1NF and every non-key attribute depends on the entire primary key (no partial dependencies).
- **Specialization**: The process of defining subclasses of a superclass, where each subclass has attributes or relationships not shared by the entire superclass (top-down approach).
- **Superkey**: A set of one or more attributes that, taken collectively, can uniquely identify an entity within an entity set.
- **Surrogate Key**: A system-generated artificial identifier used as the primary key when no natural key is suitable (e.g., auto-incrementing integer).

### T

- **Third Normal Form (3NF)**: A normal form requiring that the table is in 2NF and no non-key attribute depends on another non-key attribute (no transitive dependencies).
- **Total Participation**: A participation constraint where every entity in the set must participate in at least one relationship instance (represented by a double line).

### U

- **Update Anomaly**: A data anomaly where updating a fact in one place but not others creates data inconsistencies.

### W

- **Weak Entity Set**: An entity that cannot be uniquely identified by its own attributes alone and depends on a strong entity for its existence and identity.

---

## Acronyms

| Acronym | Meaning |
|--|--|
| BCNF | Boyce-Codd Normal Form |
| DBMS | Database Management System |
| DDL | Data Definition Language |
| EER | Enhanced Entity-Relationship |
| ER | Entity-Relationship |
| ERD | Entity-Relationship Diagram |
| FK | Foreign Key |
| PK | Primary Key |
| SDLC | System Development Life Cycle |
| SQL | Structured Query Language |
| UML | Unified Modeling Language |

---

## Key Concepts

### Design Before Implementation
Database design is a thinking exercise, not a coding exercise. The most important design work happens before any SQL is written.

### The Three Levels of Design
Conceptual (what the business needs), Logical (platform-independent tables and relationships), and Physical (DBMS-specific implementation).

### ER Modeling as a Bridge
ER diagrams translate business understanding into technical structure, serving as a shared language between stakeholders and developers.

### Normalization as Structural Insurance
Normal forms (1NF through BCNF) systematically eliminate redundancy and anomalies, ensuring each fact is stored exactly once.

### The Mapping Algorithm
A systematic five-step process converts ER diagrams into relational table definitions: map strong entities, map weak entities, map relationships, map special attributes, and map hierarchies.
