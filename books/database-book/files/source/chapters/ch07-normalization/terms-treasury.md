<!-- markdownlint-disable-file MD033 -->
# Chapter 7 - Term Treasury

*Essential Vocabulary - understand the key terms used throughout this chapter.*

<p align="center">
  <img src="g:/My Drive/0-Projects/!-important/BITM330-book-drive/.images/Ch0 General/sections/resize/terms-sized.min.gif" alt="Term Treasury" />
</p>

**Boyce-Codd Normal Form (BCNF)**
A stricter version of Third Normal Form that handles edge cases where a table has overlapping candidate keys. For most business database designs, satisfying 3NF is sufficient.

**Deletion Anomaly**
The problem that occurs when removing one row also removes a fact the organization still needs to keep. For example, deleting the only grade row for a deliverable can erase the only stored copy of that deliverable's due date and point value.

**Denormalization**
The intentional reintroduction of limited redundancy after normalization to improve performance or reporting speed. Denormalization is a conscious optimization decision made after a reliable normalized design already exists — not a substitute for good design.

**Determinant**
The attribute or set of attributes on the left side of a functional dependency that determines the value of another attribute. Written as `X -> Y`, where `X` is the determinant.

**First Normal Form (1NF)**
A table structure in which each cell holds exactly one value, each row represents one instance, and there are no multi-valued cells or repeating columns. 1NF is the entry point to relational design and makes data structurally queryable.

**Insertion Anomaly**
The problem that occurs when a new fact cannot be added to the database unless some unrelated fact is also entered. For example, a new student cannot be stored unless at least one grade row is also created.

**Multi-Valued Cell**
A cell that stores more than one value in a single field, such as a comma-separated list of grades. This violates the relational expectation that each cell holds exactly one atomic fact.

**Normal Form**
A standard design level used to evaluate and improve a table's structure by removing specific types of redundancy or dependency flaws. Normal forms are cumulative: a table in 3NF is already in 2NF and 1NF.

**Partial Dependency**
A dependency in which a non-key attribute depends on only part of a composite key rather than on the full key. Partial dependencies are removed when moving from 1NF to 2NF.

**Repeating Columns**
A design pattern that stores the same type of fact in multiple similar columns, such as `Grade1`, `Grade2`, and `Grade3`. Repeating columns prevent flexible querying and violate 1NF.

**Second Normal Form (2NF)**
A table structure that satisfies 1NF and ensures every non-key attribute depends on the entire composite primary key, not on just one part of it. 2NF removes partial dependencies by moving partially dependent attributes into their own focused tables.

**Single Source of Truth**
The design principle that each fact is stored in exactly one authoritative location so that updates remain consistent and there are no competing versions of the same information.

**Third Normal Form (3NF)**
A table structure that satisfies 2NF and ensures every non-key attribute depends only on the primary key — not on another non-key attribute. 3NF removes transitive dependencies by separating rules and lookup data into their own tables.

**Transitive Dependency**
A dependency in which a non-key attribute is determined by another non-key attribute rather than directly by the primary key. For example, if `Score` determines `LetterGrade`, then `LetterGrade` is transitively dependent and should be moved to a separate lookup table.

**Update Anomaly**
The problem that occurs when the same fact must be changed in multiple rows, creating the risk of inconsistent values if any row is missed. For example, if a student's email is stored in every grade row, one email change requires updating every one of those rows.

---

## Acronyms

| Acronym | Meaning |
| ------- | ------- |
| 1NF | First Normal Form |
| 2NF | Second Normal Form |
| 3NF | Third Normal Form |
| BCNF | Boyce-Codd Normal Form |
