# Chapter 7 Term Treasury - Data Normalization

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-terms-sizedmin" alt="Terms Treasury section icon" width="220">
</p>

<p align="center">

<!-- Companion: Key terms and definitions - 2026-06-16 -->

| Term / Concept | Definition | Business Significance | Examples |
|---|---|---|---|
| **Deletion Anomaly** | A structural error where removing one row accidentally deletes a different fact that the organization still needs. | Causes permanent loss of valuable data and breaks historical records. | Deleting a student's only grade also deletes their email and name from a flat table. |
| **Denormalization** | The intentional reintroduction of redundancy into a database after it has been normalized. | Speeds up reporting and dashboards by pre-combining data, though it requires extra effort to keep redundant facts synchronized. | Storing a calculated average score on the student record to avoid recalculating it. |
| **Determinant** | The attribute or set of attributes on the left side of a functional dependency that determines the value of another attribute. | Identifies which attributes drive the values of others, telling the designer which facts belong together in the same table. | `StudentID` is the determinant for `FirstName` and `Email`. |
| **First Normal Form (1NF)** | A structural baseline where each cell contains a single value, each row represents one instance, and there are no repeating columns. | Makes data structurally queryable so that individual facts can be searched, sorted, and filtered without unpacking text strings. | Storing each grade as its own row instead of a comma-separated list. |
| **Insertion Anomaly** | A structural error where a new fact cannot be added to the database unless some unrelated fact is also entered. | Prevents organizations from recording real-world events as they happen, forcing the use of fake or temporary data. | Being unable to add a new student until they complete their first assignment. |
| **Modification Anomaly** | A predictable structural problem (update, insertion, or deletion) that makes changing data risky and produces unwanted side effects. | Destroys data integrity and makes the database fragile as it grows. | Having to update Alice's email in 15 different grade rows. |
| **Multi-Valued Cell** | A cell that stores more than one fact in a single field. | Violates 1NF and prevents the database from accurately finding or calculating individual facts. | A `Grades` column containing "90, 85, 88". |
| **Normal Form** | A standard design level used to evaluate and improve a table's structure by removing specific types of redundancy or dependency flaws. | Provides a systematic, step-by-step checklist to guarantee that a database design is reliable. | 1NF, 2NF, and 3NF. |
| **Partial Dependency** | A flaw where a non-key attribute depends on only part of a composite primary key. | Violates 2NF and causes facts about one part of a relationship to be repeated unnecessarily. | `FirstName` depending only on `StudentID` in a grade table keyed by `(StudentID, DeliverableID)`. |
| **Repeating Columns** | A design pattern that stores the same type of fact in multiple similar columns. | Violates 1NF, wastes space, and forces the database structure to change whenever a new fact of that type occurs. | `Grade1`, `Grade2`, and `Grade3` columns. |
| **Second Normal Form (2NF)** | A design level where the table is in 1NF and every non-key attribute depends on the entire primary key, not just part of it. | Eliminates partial dependencies, ensuring that facts about the relationship are separated from facts about the individual entities. | Moving student details from a grade table into a dedicated `STUDENT` table. |
| **Single Source of Truth** | The design principle that each fact is stored in exactly one authoritative location. | Prevents competing versions of the same information and guarantees that updates remain consistent. | Storing a student's email address only in the `STUDENT` table. |
| **Third Normal Form (3NF)** | A design level where the table is in 2NF and every non-key attribute depends only directly on the primary key. | Eliminates transitive dependencies, ensuring that business rules and lookup facts are stored independently of transaction records. | Moving the `MinScore` rules into a `GRADE_SCALE` table instead of repeating them on every grade. |
| **Transitive Dependency** | A flaw where a non-key attribute is determined by another non-key attribute rather than directly by the primary key. | Violates 3NF and causes rules or lookup facts to be dangerously repeated across many rows. | `Score` determining `LetterGrade`. |
| **Update Anomaly** | A structural error where a single real-world change requires updating multiple rows to maintain consistency. | Increases the risk of human error and data drift if any row is missed during the update. | Changing a quiz's weight from 5 to 6 points and having to update 200 student grade rows. |

## Acronyms and Abbreviations

| Abbreviation | Full Form | Brief Meaning | Where It Appears |
|---|---|---|---|
| **1NF** | First Normal Form | A baseline design where each cell holds one fact. | Normal Forms section |
| **2NF** | Second Normal Form | A design level resolving partial dependencies. | Normal Forms section |
| **3NF** | Third Normal Form | A design level resolving transitive dependencies. | Normal Forms section |
