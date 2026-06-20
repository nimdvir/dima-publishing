<!-- markdownlint-disable MD013 MD033 -->

# Chapter 6 — Term Treasury

*Essential vocabulary for understanding the relational model, keys, integrity rules, and connected table design.*

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-tt" alt="Term Treasury section icon" width="220">
</p>

# Terms and Concepts

| Term / Concept | Definition | Business Significance | Examples |
|---|---|---|---|
| Attribute | The relational term for a column; one property or characteristic of a subject. | Knowing the correct term lets you communicate precisely with database professionals and documentation. | `Email` in `STUDENT`; `Score` in `STUDENT_GRADE` |
| Atomic Value | A cell value that holds one indivisible piece of data. | Storing multiple values in one cell breaks filtering, aggregation, and joins. | `"Quiz 1, Quiz 2"` in one cell violates atomicity; each should be a separate row. |
| Candidate Key | Any column or combination of columns that could uniquely identify each row in a table. | Identifying all candidate keys helps a designer choose the best primary key. | `StudentID` and `Email` are both candidate keys for `STUDENT`. |
| Composite Key | A key made from two or more columns that work together to identify a row uniquely. | Used when no single column is unique on its own; common in junction tables and enrollment-style records. | `(StudentID, DeliverableID)` as a unique constraint in `STUDENT_GRADE`; `(BuildingNumber, ApartmentNumber)` for apartments. |
| Data Redundancy | The repeated storage of the same fact in multiple rows or places. | Redundancy increases storage, creates conflicting values, and makes updates risky. | Alice's email repeating in every grade row of a flat table. |
| Deletion Anomaly | Deleting one row unintentionally removes facts that should have remained. | Loss of student identity when the only grade row is deleted; loss of audit trail. | Deleting Carla's only score row also removes her name and email from the flat table. |
| Entity | A real-world object, person, place, concept, or event that the database needs to store information about. | Identifying entities is the first step in designing a schema; each entity often becomes a table. | Student, Deliverable, Class Meeting, Assignment Type. |
| Entity Integrity | The rule that primary keys must be unique and never NULL. | Guarantees every row has a stable, reachable identity that other tables can reference. | A `STUDENT` row with `StudentID = NULL` violates entity integrity and cannot be referenced by foreign keys. |
| Foreign Key | A column in one table that references a primary key in another table to create a connection. | Foreign keys are the "connective tissue" that lets separated tables relate without duplicating data. | `STUDENT_GRADE.StudentID` references `STUDENT.StudentID`. |
| Functional Dependency | A relationship where the value of one attribute (or set of attributes) determines the value of another. | Formal tool for deciding which attributes belong together in a table; sets up normalization. | `StudentID → FirstName, LastName, Email`; `AssignmentType → Quantity, Weight, WeightPerItem`. |
| Insertion Anomaly | A fact cannot be added to the database because another, unrelated fact is not yet available. | New students cannot be stored until they have a grade; new deliverables cannot exist without a score. | Daniel cannot be added to the flat table without inventing a NULL score row. |
| Junction Table | A table that resolves a many-to-many relationship by storing one row for each valid pairing between related records. | Replaces comma-separated lists and repeated columns with a clean relational structure. | `STUDENT_GRADE` (between `STUDENT` and `DELIVERABLE`); `ATTENDANCE` (between `STUDENT` and `SCHEDULE`). |
| Modification Anomaly | A structural problem caused by poor table design; includes update, insertion, and deletion anomalies. | Signals that a table is mixing different subjects and needs to be decomposed. | All three anomalies appear in `GRADE_FLAT` because student, assignment, and score facts are forced together. |
| Natural Key | A real-world attribute that already has business meaning and could identify a row. | Tempting because meaningful, but risky because business values can change or be entered inconsistently. | `LetterGrade` in `GRADE_SCALE`; `AssignmentType` in `ASSIGNMENT_TYPE`; email addresses (risky). |
| Orphan Record | A child row in a table that references a non-existent parent row in another table. | Orphan records produce meaningless data and broken joins; referential integrity prevents them. | A `STUDENT_GRADE` row with `StudentID = 'S9999'` when no such student exists. |
| Primary Key | The candidate key chosen as the official unique identifier for a table. | Gives every row a stable address that foreign keys can point to. | `STUDENT.StudentID`; `STUDENT_GRADE.GradeID`; `GRADE_SCALE.LetterGrade`. |
| Referential Integrity | The rule that every non-null foreign key value must match an existing primary key in the referenced table. | Prevents orphan records and maintains valid connections between tables over time. | Access refuses an insert into `STUDENT_GRADE` with a `StudentID` not found in `STUDENT`. |
| Relation | The formal relational term for a table; a collection of related rows representing one subject. | Distinguishes a properly structured table from an arbitrary spreadsheet grid. | `STUDENT` is a relation; a CSV dump with mixed subjects is not. |
| Relational Model | A formal method of organizing data into tables (relations) where each represents one subject and connections are made through keys. | The theoretical foundation behind every modern DBMS; separates storage from reporting. | Introduced by E. F. Codd (1970); implemented in Access, SQLite, PostgreSQL, Oracle. |
| Schema | A formal description of a database's structure, including table names, columns, keys, and relationships. | Serves as the blueprint that developers, analysts, and administrators share. | `STUDENT(StudentID, FirstName, LastName, Email, Birthday)` in notation form. |
| Surrogate Key | An artificial, system-generated identifier (often an integer) with no business meaning, used for stability. | Short, stable, and independent of changing business details; simplifies joins. | `GradeID` in `STUDENT_GRADE`; `DeliverableID` in `DELIVERABLE`; `AttendanceID` in `ATTENDANCE`. |
| Tuple | The relational term for a row or record; one occurrence or instance of a subject. | Recognizing formal terminology helps when reading database documentation and theory. | One row in `STUDENT` (Alice Johnson) is one tuple. |
| Update Anomaly | A single fact stored in multiple rows must be changed in every instance to avoid conflicting data. | Partial updates create contradictions; relational design eliminates the problem by storing facts once. | Alice's email appears in 3 flat-table rows; updating only 2 creates conflicting addresses. |

# Acronyms and Abbreviations

| Acronym | Full Form |
|---------|-----------|
| DBMS | Database Management System |
| ERD | Entity-Relationship Diagram |
| FK | Foreign Key |
| PK | Primary Key |
| SQL | Structured Query Language |
