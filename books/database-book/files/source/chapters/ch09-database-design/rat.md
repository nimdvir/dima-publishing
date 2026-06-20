# Readiness Assessment Test (RAT): Chapter 9 — From Data to Design

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/RAT_nqr5a3?_a=BAMAAAX00" alt="RAT or Quiz section icon" width="220">
</p>
<p align="center">

---

## Assessment Design Notes

This RAT checks whether students completed the Chapter 9 reading and can reason about database design concepts — anomalies, the SDLC, ER modeling, Crow's Foot notation, relationship types, advanced modeling patterns, normalization as a design check, and the mapping algorithm — before class discussion begins.

### Bloom Distribution

| Bloom Level | Required Count | Intent |
|---|---|---|
| Remember | 8 | Foundational vocabulary and structural facts with minimal pure recall |
| Understand | 8 | Explain why concepts matter, interpret, and paraphrase |
| Apply | 8 | Use chapter concepts in realistic scenarios and technical tasks |
| Analyze | 8 | Compare alternatives, break down systems, and diagnose trade-offs |
| Evaluate | 8 | Judge design quality and choose the best approach under constraints |

### Design Criterion Coverage

| Design Criterion | Bloom Sections Used | Questions | Count |
|---|---|---|---|
| Application-based | Apply, Analyze, Evaluate | 5, 6, 7, 8, 17, 18, 19, 20, 25, 26, 27, 28, 33 | 13 |
| Scenario-based | Understand, Apply, Analyze, Evaluate | 11, 12, 21, 22, 23, 24, 34, 35, 36, 37, 38 | 11 |
| Definition-only | Remember, Understand | 1, 2, 3, 4, 9, 10, 13, 14, 15, 16, 29, 30, 31, 32, 39, 40 | 16 |

### AI-Resistance Strategies Used

1. Chapter-specific reasoning over generic knowledge (GDB schema, `GRADE_FLAT` anomaly examples).
2. Schema-specific context using exact tables, columns, and SQL from the chapter.
3. Scenario stems with embedded traps that depend on chapter principles.
4. Multi-answer options requiring fine-grained discrimination among related concepts.
5. Distractors drawn from adjacent but distinct chapter concepts.
6. Output prediction from concrete Grading Database data.
7. Platform-specific details (Access AutoNumber vs. SQLite `INTEGER PRIMARY KEY` vs. PostgreSQL `GENERATED AS IDENTITY`).

---

## Remember Questions

**1. What is a data anomaly?**

A. A SQL syntax error that prevents a query from executing

B. A data integrity problem caused by storing data in a poorly structured or redundant way

C. A missing index that slows query performance

D. A constraint violation that occurs when inserting a new row

**2. In the chapter's `GRADE_FLAT` table, which three categories of facts are mixed into a single table?**

A. Student identity, deliverable definition, and performance outcome

B. Student identity, instructor identity, and course catalog

C. Attendance records, grade scale, and assignment weights

D. Query results, stored procedures, and view definitions

**3. Which type of anomaly occurs when deleting a score row accidentally removes the only record of a student's identity?**

A. Insertion anomaly

B. Update anomaly

C. Deletion anomaly

D. Referential anomaly

**4. What does the acronym SDLC stand for in the context of database design?**

A. Structured Data Logic Configuration

B. System Development Life Cycle

C. Sequential Database Linking Convention

D. Software Design and Layout Criteria

**5. Select ALL that apply: Which of the following are valid attribute types described in Section 9.4.3?**

A. Composite

B. Multi-valued

C. Derived

D. Recursive

E. Simple

**6. In Crow's Foot notation, the symbol `o{` at the end of a relationship line means:**

A. Exactly one, mandatory participation

B. Zero or one, optional participation

C. Zero or many, optional participation

D. One or more, mandatory participation

**7. Select ALL that apply: Which of the following are names used in the chapter for a table that resolves a many-to-many relationship?**

A. Associative entity

B. Junction table

C. Intersection table

D. Lookup table

E. Bridge table

**8. According to the chapter, which key type is an artificial, system-generated identifier such as `GradeID` AutoNumber?**

A. Natural key

B. Candidate key

C. Surrogate key

D. Foreign key

## Understand Questions

**9. Why does the chapter argue that "many query problems are actually design problems in disguise"?**

A. Because SQL syntax errors are caused by poor table naming conventions

B. Because a poorly structured schema forces fragile queries that must work around structural flaws

C. Because queries always run slower on unnormalized tables

D. Because SQL cannot execute against flat tables

**10. Why should the three levels of database design — conceptual, logical, and physical — not be collapsed too early?**

A. Because conceptual design requires SQL before entities can be identified

B. Because collapsing them forces the designer to choose a DBMS before understanding the business rules

C. Because physical design must always precede logical design

D. Because each level requires a separate database management system

**11. Select ALL that apply: In the `GRADE_FLAT` table, which of the following are consequences of Alice's email appearing in every grade row?**

A. Updating Alice's email requires changing every row where she appears

B. Missing one update creates conflicting versions of her email

C. Alice cannot have more than one grade entry

D. The table violates First Normal Form

E. The table stores Alice's email redundantly

**12. The chapter states that a business rule like "a student should not have two scores for the same deliverable" is enforced by a unique constraint on `(StudentID, DeliverableID)`. Why is structural enforcement better than relying on data-entry discipline?**

A. Because unique constraints improve query speed

B. Because structural enforcement makes violations impossible rather than merely unlikely

C. Because data-entry discipline only works in Microsoft Access

D. Because unique constraints eliminate the need for primary keys

**13. Select ALL that apply: Which of the following correctly describe how Crow's Foot notation translates into SQL design decisions?**

A. A required relationship means the foreign key is `NOT NULL`

B. An optional relationship means the foreign key may allow `NULL`

C. A one-to-many relationship means the foreign key goes on the one side

D. A many-to-many relationship requires creating an associative table

E. Referential integrity requires adding a `FOREIGN KEY` constraint

**14. Why does the chapter say that an associative entity like `STUDENT_GRADE` stores the `Score` attribute rather than placing it in `STUDENT` or `DELIVERABLE`?**

A. Because `Score` is a derived attribute that should be computed

B. Because `Score` is a fact about a specific student's performance on a specific deliverable, not about either entity alone

C. Because `STUDENT` and `DELIVERABLE` are weak entities that cannot hold attributes

D. Because `Score` must be stored in the table with the fewest rows

**15. What is the key difference between a weak entity and a strong entity?**

A. A weak entity has no attributes

B. A weak entity cannot be uniquely identified by its own attributes alone and depends on an owner entity

C. A weak entity cannot participate in relationships

D. A weak entity uses only foreign keys and has no primary key

**16. Why does the chapter recommend that logical design should remain platform-independent?**

A. Because logical design uses SQL syntax that only works in one DBMS

B. Because a good logical design can move across platforms; a tool-dependent design is fragile

C. Because platform-independent designs never require foreign keys

D. Because conceptual design already handles all platform-specific decisions

## Apply Questions

**17. An instructor wants to add a new deliverable "Project 1" to the Grading Database before any student has submitted work. In the `GRADE_FLAT` table, why is this problematic, and which table in the normalized design solves it?**

A. It is problematic because `GRADE_FLAT` requires student and score data for every row; the `DELIVERABLE` table stores deliverables independently

B. It is problematic because `GRADE_FLAT` does not have a `DueDate` column; the `SCHEDULE` table stores deliverable dates

C. It is not problematic; `GRADE_FLAT` allows NULL values for student columns

D. It is problematic because the `STUDENT` table requires a grade entry; the `ATTENDANCE` table resolves the dependency

**18. Given the Crow's Foot notation `STUDENT ||--o{ STUDENT_GRADE`, write the SQL constraint that enforces the mandatory participation of `STUDENT_GRADE` in this relationship.**

A. `StudentID INTEGER, FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID)`

B. `StudentID INTEGER NOT NULL, FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID)`

C. `StudentID INTEGER UNIQUE, FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID)`

D. `StudentID INTEGER DEFAULT 0, FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID)`

**19. A university needs to track students who have multiple phone numbers. According to the chapter's attribute-type classification, how should this be modeled?**

A. Add `Phone1`, `Phone2`, `Phone3` columns to the `STUDENT` table

B. Store all phone numbers in a single comma-separated text field

C. Create a separate `STUDENT_PHONE(StudentID, PhoneNumber)` table because phone numbers are a multi-valued attribute

D. Store the phone numbers as a derived attribute calculated from the student's email

**20. Select ALL that apply: In the chapter's coffee shop worked example (Section 9.10.6), which of the following are entities identified during the design process?**

A. `CUSTOMER`

B. `MENU_ITEM`

C. `ORDER`

D. `ORDER_TOTAL`

E. `ORDER_LINE`

**21. The chapter shows that `SECTION(CourseID, SectionNumber, MeetingTime)` is a weak entity depending on `COURSE`. What SQL clause enforces this identity dependence?**

A. `UNIQUE (SectionNumber)`

B. `PRIMARY KEY (CourseID, SectionNumber)` plus `FOREIGN KEY (CourseID) REFERENCES COURSE(CourseID)`

C. `CHECK (SectionNumber > 0)`

D. `DEFAULT (CourseID)` in the `SECTION` table

**22. Select ALL that apply: Which represent correct steps in the chapter's five-step mapping algorithm for translating an ERD into relational tables?**

A. Map strong entities to tables

B. Map weak entities by including the owner's primary key

C. Place the foreign key on the one side of a 1:N relationship

D. Create a junction table for M:N relationships

E. Map multi-valued attributes to separate tables

**23. An `EMPLOYEE` table has a `ManagerID` column that references `EmployeeID` in the same table. What type of relationship does this represent?**

A. One-to-one relationship

B. Many-to-many relationship

C. Recursive relationship

D. Weak entity relationship

**24. In the Grading Database, the business rule "a score must be between 0 and 100" is enforced by which SQL mechanism?**

A. `FOREIGN KEY (Score) REFERENCES GRADE_SCALE(MaxScore)`

B. `UNIQUE (Score)`

C. `CHECK (Score BETWEEN 0 AND 100)`

D. `DEFAULT Score = 50`

## Analyze Questions

**25. In the proposed table `STUDENT_GRADE(StudentID, DeliverableID, FirstName, Email, DeliverableType, DueDate, Score)` with primary key `(StudentID, DeliverableID)`, why does this design violate Second Normal Form?**

A. Because `Score` does not depend on the primary key

B. Because `FirstName` and `Email` depend only on `StudentID`, not the full composite key

C. Because the table contains repeating groups

D. Because `DeliverableType` is a derived attribute

**26. Select ALL that apply: The chapter describes three strategies for mapping a specialization/generalization hierarchy to tables. Which of the following are cons identified for specific strategies?**

A. Superclass + subclass tables require joins to assemble a complete profile

B. Subclass tables only produce redundant shared fields

C. Single table with type column creates many NULLs and weaker constraints

D. Superclass + subclass tables cannot handle overlapping subtypes

E. Subclass tables only prevent storing shared attributes

**27. A designer puts `GradeID` as a foreign key in the `STUDENT` table instead of putting `StudentID` in `STUDENT_GRADE`. Why is this incorrect?**

A. Because `GradeID` is not a valid column name

B. Because placing the FK on the one side means a student could reference only one grade, violating the one-to-many relationship

C. Because `STUDENT` is a weak entity and cannot hold foreign keys

D. Because `GradeID` should be a natural key rather than a foreign key

**28. Select ALL that apply: When comparing the `GRADE_FLAT` table to the normalized Grading Database, which structural improvements does the normalized design provide?**

A. A deliverable can exist before any student submits a score

B. Updating a student's email requires changing only one row

C. Deleting a grade does not delete the student's identity

D. All data is stored in a single table for simpler queries

E. Business rules like "one score per student per deliverable" can be enforced by constraints

**29. The chapter distinguishes between an identifying relationship and a nonidentifying relationship. Which statement best captures the difference?**

A. Identifying relationships use foreign keys; nonidentifying relationships do not

B. In an identifying relationship, the child's primary key includes the parent's primary key; in a nonidentifying relationship, the child has its own independent primary key

C. Identifying relationships connect strong entities; nonidentifying relationships connect weak entities

D. Identifying relationships are one-to-many; nonidentifying relationships are many-to-many

**30. Why does the chapter caution against "treating reports as tables" (Section 9.12.2)?**

A. Because reports cannot be stored in databases

B. Because a report combines facts for display, while a table stores facts for long-term integrity; designing tables to look like reports creates anomalies

C. Because reports require special SQL syntax that tables do not support

D. Because reports always violate Third Normal Form

**31. The chapter explains that `Score` belongs in `STUDENT_GRADE` rather than in `STUDENT` or `DELIVERABLE`. Select ALL that apply: Which reasoning supports this placement?**

A. `Score` is a fact about a specific student's performance on a specific deliverable

B. `Score` depends on both `StudentID` and `DeliverableID` together

C. Placing `Score` in `STUDENT` would require a separate column for each deliverable

D. `Score` is a derived attribute that should not be stored at all

E. `STUDENT_GRADE` is the junction table that resolves the M:N relationship

**32. The chapter compares Lucidchart and Mermaid as ERD tools. What is the fundamental difference the chapter highlights?**

A. Lucidchart is free and Mermaid requires a license

B. Lucidchart is visual and drag-and-drop; Mermaid is text-based and version-controllable

C. Lucidchart generates SQL automatically; Mermaid cannot

D. Lucidchart only supports Chen notation; Mermaid only supports Crow's Foot

## Evaluate Questions

**33. A team is designing a database for a hospital patient record system. They propose storing patient demographics, diagnoses, prescriptions, and billing in a single flat table. Based on Chapter 9's principles, which is the strongest argument against this approach?**

A. Flat tables cannot store more than 100 columns

B. A flat design creates insertion, update, and deletion anomalies; separating the data into entities connected by relationships prevents structural data-integrity failures

C. SQL cannot query flat tables with more than five columns

D. Flat tables violate the SDLC because they skip the deployment phase

**34. Select ALL that apply: A company uses a single table `PRODUCT(ProductID, ProductName, SupplierName, SupplierPhone, CategoryName, Price)`. Which anomalies could occur?**

A. Changing a supplier's phone number requires updating every product row for that supplier

B. A new supplier cannot be added until they supply at least one product

C. Deleting the last product from a supplier removes all knowledge of that supplier

D. The table cannot store product prices

E. Adding a new category requires adding a new product

**35. A database designer proposes storing `Age` as a column in the `STUDENT` table alongside `Birthday`. Based on the chapter's attribute classification rules, what is the best recommendation?**

A. Store both `Age` and `Birthday` for convenience

B. Store only `Birthday` and compute `Age` in queries, because `Age` is a derived attribute that changes over time and creates an update problem

C. Store only `Age` because it is more useful than `Birthday`

D. Store `Age` as a foreign key referencing a separate `AGE_LOOKUP` table

**36. A junior developer argues that normalization to 3NF makes queries too complex and proposes keeping everything in flat tables. Based on Chapter 9, which response best addresses this argument?**

A. Agree, because flat tables are always faster

B. Normalization establishes structural correctness first; denormalization can be added later as a conscious optimization with a documented reason, refresh process, and accountability rule

C. Normalization is only useful for databases with fewer than 10 tables

D. Agree, because 3NF requires every table to have exactly three columns

**37. Select ALL that apply: A university wants to model the fact that a person can be both a student and an employee. Which design decisions from the chapter's specialization/generalization section are most appropriate?**

A. Use overlapping subtyping because a person can belong to multiple subtypes

B. Use disjoint subtyping because a person can only be one type

C. Use the superclass + subclass table strategy for normalized, flexible design

D. Use a single table with a type discriminator column for simpler queries

E. Use partial participation because not every person may be a student or employee

**38. A designer builds `STUDENT_GRADE` with a composite primary key `(StudentID, DeliverableID)`. Another designer prefers a surrogate key `GradeID` plus a unique constraint on `(StudentID, DeliverableID)`. According to the chapter, which statement is correct?**

A. Only the composite key version is valid; surrogate keys violate normalization

B. Only the surrogate key version is valid; composite keys are not supported in relational databases

C. Both enforce one score per student per deliverable; the choice depends on implementation preferences

D. Neither is valid; `STUDENT_GRADE` should use `Score` as its primary key

**39. The chapter lists "building before modeling" as the most common database design mistake. Select ALL that apply: Why is this considered the most dangerous?**

A. It skips requirements gathering and the ERD design phase

B. It leads to schemas that reflect developer assumptions rather than business rules

C. Subsequent structural mistakes become harder to detect and fix once tables are populated

D. It always produces databases that violate BCNF

E. It prevents the use of Crow's Foot notation

**40. A company's grading database currently runs in Microsoft Access. They plan to migrate to PostgreSQL for a web application. According to the chapter's discussion of logical vs. physical design, what determines the difficulty of this migration?**

A. Whether the database uses AutoNumber fields, because PostgreSQL does not support auto-incrementing keys

B. Whether the logical design is sound; if the design is platform-independent, migration mainly involves syntax and tooling changes

C. Whether the database has more than 10 tables, because PostgreSQL has a table limit

D. Whether the original database was built using Mermaid diagrams

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Answer Key

### Remember Questions

**Question 1: What is a data anomaly?**

Correct answer: **B**

Explanation: Section 9.2 defines a data anomaly as "a data integrity problem caused by storing data in a poorly structured or redundant way."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | SQL syntax errors are unrelated to data structure problems. |
| B | Yes | Matches the chapter's definition of data anomaly exactly. |
| C | No | Missing indexes affect performance, not data integrity structure. |
| D | No | Constraint violations are a mechanism, not the anomaly itself. |

**Question 2: In the chapter's `GRADE_FLAT` table, which three categories of facts are mixed into a single table?**

Correct answer: **A**

Explanation: Section 9.2.1 explicitly identifies three mixed subjects: student identity (`StudentID`, `FirstName`, `LastName`, `Email`), deliverable definition (`DeliverableType`, `DeliverableNumber`, `DueDate`, `PointsPerOne`), and performance outcome (`Score`).

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Matches the three categories listed in Section 9.2.1. |
| B | No | Instructor identity and course catalog are not part of `GRADE_FLAT`. |
| C | No | These are separate entities in the normalized design, not mixed in `GRADE_FLAT`. |
| D | No | These are database objects, not data categories in the flat table. |

**Question 3: Which type of anomaly occurs when deleting a score row accidentally removes the only record of a student's identity?**

Correct answer: **C**

Explanation: Section 9.2.4 defines deletion anomaly as occurring "when deleting one fact accidentally deletes another fact." Brian's student identity is lost when his only grade row is deleted.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Insertion anomaly is about inability to add a fact without unrelated data. |
| B | No | Update anomaly is about inconsistency from partial updates. |
| C | Yes | Matches the chapter's deletion anomaly definition and Brian example. |
| D | No | "Referential anomaly" is not a term used in the chapter. |

**Question 4: What does the acronym SDLC stand for in the context of database design?**

Correct answer: **B**

Explanation: Section 9.3.1 defines SDLC as "System Development Life Cycle."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Fabricated acronym expansion. |
| B | Yes | Matches the chapter definition. |
| C | No | Fabricated acronym expansion. |
| D | No | Fabricated acronym expansion. |

**Question 5: Select ALL that apply: Which of the following are valid attribute types described in Section 9.4.3?**

Correct answers: **A, B, C, E**

Explanation: Section 9.4.3 lists Simple, Composite, Single-valued, Multi-valued, Stored, and Derived as attribute types. Recursive is a relationship type, not an attribute type.

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Composite is listed in the attribute classification table. |
| B | Yes | Multi-valued is listed in the attribute classification table. |
| C | Yes | Derived is listed in the attribute classification table. |
| D | No | Recursive describes a relationship type (Section 9.8.3), not an attribute type. |
| E | Yes | Simple is listed in the attribute classification table. |

**Question 6: In Crow's Foot notation, the symbol `o{` at the end of a relationship line means:**

Correct answer: **C**

Explanation: Section 9.6.1 shows `o{` as "zero or more" (0..*), combining the optional circle with the many crow's foot.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | That would be `||` (exactly one). |
| B | No | That would be `o|` (zero or one). |
| C | Yes | `o` = zero/optional + `{` = many = zero or more. |
| D | No | That would be `|{` (one or more). |

**Question 7: Select ALL that apply: Which of the following are names used in the chapter for a table that resolves a many-to-many relationship?**

Correct answers: **A, B, C, E**

Explanation: Section 9.7.3 lists "associative entity," "junction table," "intersection table," and "bridge table." Lookup table is a different concept.

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Used in Section 9.7.3. |
| B | Yes | Used in Section 9.7.3. |
| C | Yes | Used in Section 9.7.3. |
| D | No | Lookup table (e.g., `GRADE_SCALE`) is a reference table, not a junction table. |
| E | Yes | Used in Section 9.7.3. |

**Question 8: According to the chapter, which key type is an artificial, system-generated identifier such as `GradeID` AutoNumber?**

Correct answer: **C**

Explanation: Section 9.5.3 defines a surrogate key as an "artificial system-generated identifier" with `GradeID` AutoNumber as the example.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | A natural key is a real-world value like a university ID or email. |
| B | No | A candidate key is a minimal superkey; it can be natural or surrogate. |
| C | Yes | Matches the chapter's definition and example. |
| D | No | A foreign key references another table's key. |

---

### Understand Questions

**Question 9: Why does the chapter argue that "many query problems are actually design problems in disguise"?**

Correct answer: **B**

Explanation: Section 9.1.1 explains that if tables mix unrelated facts, queries become fragile workarounds — the problem is the schema, not the SQL.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | SQL syntax errors are a coding issue, not a design issue. |
| B | Yes | Captures the chapter's argument about fragile structure causing fragile queries. |
| C | No | Performance is a secondary concern; the chapter focuses on structural integrity. |
| D | No | SQL can execute against flat tables; the results are just unreliable. |

**Question 10: Why should the three levels of database design not be collapsed too early?**

Correct answer: **B**

Explanation: Section 9.3.3 states: "If you begin by choosing Access field types before understanding the business rules, the tool starts driving the design."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Conceptual design does not require SQL. |
| B | Yes | Matches the chapter's warning about tool-driven design. |
| C | No | Physical design follows logical design, not the reverse. |
| D | No | Different levels use the same DBMS at the physical stage only. |

**Question 11: Select ALL that apply: In the `GRADE_FLAT` table, which of the following are consequences of Alice's email appearing in every grade row?**

Correct answers: **A, B, E**

Explanation: Section 9.2.3 explains that Alice's email must be updated in every row; missing one creates conflicting versions. The email is stored redundantly by definition.

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Update anomaly requires changing every row. |
| B | Yes | Missing one row creates inconsistency. |
| C | No | Alice can have many grade entries; the problem is email redundancy, not entry limits. |
| D | No | Having repeated values in rows does not itself violate 1NF; repeating groups or non-atomic values would. |
| E | Yes | Email appears once per deliverable row — that is redundancy. |

**Question 12: Why is structural enforcement better than relying on data-entry discipline?**

Correct answer: **B**

Explanation: Section 9.2.5 states that a good schema "does not depend on users remembering to 'be careful.' It makes correctness easier by design."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Unique constraints enforce integrity, not speed. |
| B | Yes | Structural enforcement makes violations impossible, not just unlikely. |
| C | No | Data-entry discipline fails on all platforms, not just Access. |
| D | No | Unique constraints and primary keys serve different purposes. |

**Question 13: Select ALL that apply: Which of the following correctly describe how Crow's Foot notation translates into SQL design decisions?**

Correct answers: **A, B, D, E**

Explanation: Section 9.6.3 maps ER rules to SQL. The foreign key goes on the many side (not the one side), so C is incorrect.

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Required relationship → `NOT NULL` foreign key. |
| B | Yes | Optional relationship → nullable foreign key. |
| C | No | The foreign key goes on the many side, not the one side. |
| D | Yes | M:N → create an associative table. |
| E | Yes | Referential integrity → `FOREIGN KEY` constraint. |

**Question 14: Why does `STUDENT_GRADE` store the `Score` attribute?**

Correct answer: **B**

Explanation: Section 9.7.3 states: "The Score belongs in the junction table because the score is not a fact about the student alone and not a fact about the deliverable alone."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | `Score` is a stored attribute, not derived. |
| B | Yes | `Score` is a relationship attribute about the student-deliverable pair. |
| C | No | `STUDENT` and `DELIVERABLE` are strong entities. |
| D | No | Row count is irrelevant to attribute placement. |

**Question 15: What is the key difference between a weak entity and a strong entity?**

Correct answer: **B**

Explanation: Section 9.8.1 defines a weak entity as one that "cannot be uniquely identified by its own attributes alone. Its identity depends on an owner entity."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Weak entities have attributes. |
| B | Yes | Matches the chapter's definition. |
| C | No | Weak entities participate in identifying relationships. |
| D | No | Weak entities have composite primary keys that include the owner's key. |

**Question 16: Why does the chapter recommend platform-independent logical design?**

Correct answer: **B**

Explanation: Section 9.13.3 states: "A good logical design can move across platforms. A design that only works because of one tool's quirks is fragile."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Logical design is independent of SQL syntax. |
| B | Yes | Matches the chapter's portability argument. |
| C | No | Platform-independent designs still use foreign keys. |
| D | No | Conceptual design does not handle platform specifics. |

---

### Apply Questions

**Question 17: An instructor wants to add "Project 1" before any student has submitted it. Why is this problematic in `GRADE_FLAT`?**

Correct answer: **A**

Explanation: Section 9.2.2 describes the insertion anomaly: `GRADE_FLAT` requires student and score data in every row, preventing standalone deliverable storage.

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Matches the insertion anomaly and solution described in 9.2.2. |
| B | No | `GRADE_FLAT` does have `DueDate`; the problem is the student/score dependency. |
| C | No | Even with NULLs, the row would still require `StudentID`. |
| D | No | `ATTENDANCE` is unrelated to deliverable storage. |

**Question 18: Which SQL constraint enforces mandatory participation in `STUDENT ||--o{ STUDENT_GRADE`?**

Correct answer: **B**

Explanation: Section 9.6.3 shows that mandatory participation on the `STUDENT_GRADE` side requires `NOT NULL` on `StudentID`.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Without `NOT NULL`, the FK could be NULL, allowing grades without students. |
| B | Yes | `NOT NULL` + `FOREIGN KEY` enforces mandatory participation. |
| C | No | `UNIQUE` would limit each student to one grade — wrong constraint. |
| D | No | `DEFAULT 0` would assign a fake student, not enforce the relationship. |

**Question 19: How should multiple phone numbers per student be modeled?**

Correct answer: **C**

Explanation: Section 9.4.3 classifies phone numbers as a multi-valued attribute and recommends creating a separate related table.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Multiple columns is a repeating-group pattern that violates 1NF. |
| B | No | Comma-separated values violate atomicity (1NF). |
| C | Yes | Matches the chapter's multi-valued attribute guidance. |
| D | No | Phone numbers are not derived from email. |

**Question 20: Select ALL that apply: In the coffee shop worked example, which are entities identified during design?**

Correct answers: **A, B, C, E**

Explanation: Section 9.10.6 identifies `CUSTOMER`, `MENU_ITEM`, `ORDER`, and `ORDER_LINE`. `ORDER_TOTAL` is not a separate entity.

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Listed as an entity in the worked example. |
| B | Yes | Listed as an entity in the worked example. |
| C | Yes | Listed as an entity in the worked example. |
| D | No | The order total is an attribute or computed value, not a separate entity. |
| E | Yes | The junction table resolving the M:N between orders and menu items. |

**Question 21: What SQL enforces the identity dependence of `SECTION` on `COURSE`?**

Correct answer: **B**

Explanation: Section 9.10.2 shows `PRIMARY KEY (CourseID, SectionNumber)` plus `FOREIGN KEY (CourseID) REFERENCES COURSE(CourseID)`.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | `UNIQUE (SectionNumber)` would make section numbers globally unique, which is wrong. |
| B | Yes | Composite PK + FK enforces weak entity identity dependence. |
| C | No | `CHECK` validates values, not identity. |
| D | No | `DEFAULT` does not enforce identity dependence. |

**Question 22: Select ALL that apply: Which are correct steps in the five-step mapping algorithm?**

Correct answers: **A, B, D, E**

Explanation: Section 9.10 lists the steps. Step 3 places the FK on the many side, not the one side, so C is incorrect.

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Step 1: Map strong entities. |
| B | Yes | Step 2: Map weak entities with owner's PK. |
| C | No | Step 3 places the FK on the many side, not the one side. |
| D | Yes | Step 4: Create junction table for M:N. |
| E | Yes | Step 5: Map multi-valued attributes to separate tables. |

**Question 23: A `ManagerID` column referencing `EmployeeID` in the same table represents what type of relationship?**

Correct answer: **C**

Explanation: Section 9.8.3 defines this as a recursive relationship where "an entity relates to itself."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | A self-join can support multiple reports, not limited to 1:1. |
| B | No | This is a 1:N self-relationship, not M:N. |
| C | Yes | Matches the chapter's definition and `EMPLOYEE` example. |
| D | No | `EMPLOYEE` is a strong entity; the self-reference is recursive, not weak. |

**Question 24: Which SQL mechanism enforces "a score must be between 0 and 100"?**

Correct answer: **C**

Explanation: Section 9.4.5 shows `CHECK (Score BETWEEN 0 AND 100)` as the structural expression of this business rule.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Score is not a foreign key to `GRADE_SCALE`. |
| B | No | `UNIQUE` prevents duplicates, not range violations. |
| C | Yes | `CHECK` constraint enforces the value range. |
| D | No | `DEFAULT` sets an initial value, not a range constraint. |

---

### Analyze Questions

**Question 25: Why does the proposed table violate Second Normal Form?**

Correct answer: **B**

Explanation: Section 9.9.2 shows that `FirstName` and `Email` depend only on `StudentID`, not the full composite key `(StudentID, DeliverableID)` — a partial dependency.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | `Score` does depend on the full composite key. |
| B | Yes | Partial dependencies on part of the composite key violate 2NF. |
| C | No | The table does not contain repeating groups (that would violate 1NF). |
| D | No | `DeliverableType` is a stored attribute, not derived. |

**Question 26: Select ALL that apply: Which are cons of specific mapping strategies?**

Correct answers: **A, B, C**

Explanation: Section 9.8.5 lists these cons in the strategy comparison table. D is false (superclass + subclass handles overlapping). E is false (subclass tables store all shared fields redundantly, not prevent them).

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Superclass + subclass requires joins. |
| B | Yes | Subclass tables only create redundant shared fields. |
| C | Yes | Single table produces many NULLs and weaker constraints. |
| D | No | Superclass + subclass can handle overlapping subtypes. |
| E | No | Subclass tables store shared attributes redundantly, not prevent storage. |

**Question 27: Why is placing `GradeID` in `STUDENT` incorrect?**

Correct answer: **B**

Explanation: Section 9.12.4 explains that placing the FK on the one side means a student could reference only one grade, contradicting the 1:N relationship.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | `GradeID` is a valid column name. |
| B | Yes | One FK column limits the student to one grade. |
| C | No | `STUDENT` is a strong entity that can hold foreign keys. |
| D | No | Whether `GradeID` is natural or surrogate is irrelevant to placement. |

**Question 28: Select ALL that apply: When comparing the `GRADE_FLAT` table to the normalized Grading Database, which structural improvements does the normalized design provide?**

Correct answers: **A, B, C, E**

Explanation: Sections 9.2.2–9.2.4 and 9.4.5 describe each improvement. D is false — the normalized design uses multiple tables, not one.

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Resolves the insertion anomaly from Section 9.2.2. |
| B | Yes | Resolves the update anomaly from Section 9.2.3. |
| C | Yes | Resolves the deletion anomaly from Section 9.2.4. |
| D | No | The normalized design uses multiple tables, not a single table. |
| E | Yes | `UNIQUE(StudentID, DeliverableID)` from Section 9.4.5. |

**Question 29: What best captures the difference between identifying and nonidentifying relationships?**

Correct answer: **B**

Explanation: An identifying relationship includes the parent's PK in the child's PK (e.g., `SECTION`). A nonidentifying relationship gives the child its own independent PK.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Both types use foreign keys. |
| B | Yes | Captures the PK composition difference. |
| C | No | Reversed — identifying connects weak entities to owners. |
| D | No | Both can be 1:N; the distinction is about identity, not cardinality. |

**Question 30: Why does the chapter caution against "treating reports as tables"?**

Correct answer: **B**

Explanation: Section 9.12.2 states: "A report combines facts for display. A table stores facts for long-term integrity."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Reports can be generated from database data. |
| B | Yes | Matches the chapter's display-vs-storage distinction. |
| C | No | Reports use standard SQL. |
| D | No | The issue is design philosophy, not specific normal form violations. |

**Question 31: Select ALL that apply: Which reasoning supports placing `Score` in `STUDENT_GRADE`?**

Correct answers: **A, B, E**

Explanation: Section 9.7.3 explains Score is a relationship fact. It depends on both keys. `STUDENT_GRADE` is the junction table.

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Score is about the student-deliverable pair. |
| B | Yes | Score depends on the full composite key. |
| C | No | Placing Score in STUDENT would require one column per deliverable — wrong, but the distractor is about column explosion, not the chapter's core reasoning. |
| D | No | Score is stored, not derived. |
| E | Yes | STUDENT_GRADE resolves the M:N. |

**Question 32: What fundamental difference does the chapter highlight between Lucidchart and Mermaid?**

Correct answer: **B**

Explanation: Section 9.11 describes Lucidchart as "visual drag-and-drop" and Mermaid as "text-based" and suitable for version control.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Both have free tiers; licensing is not the distinction made. |
| B | Yes | Matches the chapter's visual vs. text-based comparison. |
| C | No | Neither is described as automatically generating SQL. |
| D | No | Both support Crow's Foot notation. |

---

### Evaluate Questions

**Question 33: Why is a flat table for a hospital patient record system problematic?**

Correct answer: **B**

Explanation: The chapter's central argument (Sections 9.1–9.2) is that mixing unrelated facts creates anomalies; separating into entities connected by relationships prevents them.

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Column limits are a DBMS concern, not a design principle. |
| B | Yes | Applies the chapter's anomaly and entity-separation principles. |
| C | No | SQL can query tables of any width. |
| D | No | The SDLC deployment phase is unrelated to flat-table design. |

**Question 34: Select ALL that apply: Which anomalies could occur in `PRODUCT(ProductID, ProductName, SupplierName, SupplierPhone, CategoryName, Price)`?**

Correct answers: **A, B, C, E**

Explanation: This table mixes product, supplier, and category facts. A = update anomaly; B, E = insertion anomalies; C = deletion anomaly. D is false — price can be stored.

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Update anomaly: supplier phone duplicated across products. |
| B | Yes | Insertion anomaly: cannot add a supplier without a product. |
| C | Yes | Deletion anomaly: deleting last product removes supplier data. |
| D | No | The table can store prices; the problem is structural, not field-level. |
| E | Yes | Insertion anomaly: cannot add a category without a product. |

**Question 35: Should `Age` be stored alongside `Birthday`?**

Correct answer: **B**

Explanation: Section 9.12.7 states: "Storing age creates an update problem because age changes over time."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Storing both creates an update problem for the derived value. |
| B | Yes | Matches the chapter's derived attribute guidance. |
| C | No | `Birthday` is the stored value; `Age` is derived. |
| D | No | Age is not a referential concept requiring a foreign key. |

**Question 36: How should a designer respond to the argument that 3NF makes queries too complex?**

Correct answer: **B**

Explanation: Section 9.9.3 states: "Normalize for correctness. Denormalize only with a documented reason, refresh process, and accountability rule."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Flat tables are not always faster; they create anomalies. |
| B | Yes | Matches the chapter's normalize-first, denormalize-with-reason approach. |
| C | No | Normalization applies regardless of table count. |
| D | No | 3NF has no column-count requirement. |

**Question 37: Select ALL that apply: Which design decisions support modeling a person who can be both student and employee?**

Correct answers: **A, C, E**

Explanation: Section 9.8.4: overlapping = can belong to multiple subtypes; superclass + subclass = normalized and flexible; partial = not required to be either.

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | Overlapping allows dual membership. |
| B | No | Disjoint would prevent a person from being both. |
| C | Yes | Superclass + subclass is the recommended normalized approach. |
| D | No | Single table works but produces NULLs; not the best choice. |
| E | Yes | Partial allows a person to be neither student nor employee. |

**Question 38: Composite PK vs. surrogate PK for `STUDENT_GRADE`?**

Correct answer: **C**

Explanation: Section 9.10.4 states: "Both enforce one score per student per deliverable."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | Both versions are valid. |
| B | No | Composite keys are fully supported. |
| C | Yes | Matches the chapter's statement that both are valid. |
| D | No | `Score` changes and would make a poor PK. |

**Question 39: Select ALL that apply: Why is "building before modeling" the most dangerous mistake?**

Correct answers: **A, B, C**

Explanation: Section 9.12.1 explains that skipping design leads to assumption-based schemas and harder-to-fix problems.

| Option | Correct? | Reasoning |
|---|---|---|
| A | Yes | The bad sequence skips requirements and ERD. |
| B | Yes | The schema reflects developer guesses, not business rules. |
| C | Yes | Populated tables make structural fixes expensive. |
| D | No | Building before modeling may or may not violate BCNF; the issue is process. |
| E | No | Crow's Foot can still be used retroactively; the issue is sequence. |

**Question 40: What determines the difficulty of migrating from Access to PostgreSQL?**

Correct answer: **B**

Explanation: Section 9.13.3 states: "If the logical design is sound, the migration mainly involves syntax and tooling."

| Option | Correct? | Reasoning |
|---|---|---|
| A | No | PostgreSQL supports auto-incrementing keys (`GENERATED AS IDENTITY`). |
| B | Yes | Matches the chapter's logical vs. physical design argument. |
| C | No | PostgreSQL has no practical table-count limit. |
| D | No | The diagramming tool is irrelevant to migration difficulty. |

---

## Question Distribution Summary

**Table 1: Bloom Level**

| Bloom Level | Questions | Count |
|---|---|---|
| Remember | 1, 2, 3, 4, 5, 6, 7, 8 | 8 |
| Understand | 9, 10, 11, 12, 13, 14, 15, 16 | 8 |
| Apply | 17, 18, 19, 20, 21, 22, 23, 24 | 8 |
| Analyze | 25, 26, 27, 28, 29, 30, 31, 32 | 8 |
| Evaluate | 33, 34, 35, 36, 37, 38, 39, 40 | 8 |

**Table 2: Question Type**

| Question Type | Questions | Count |
|---|---|---|
| Single-answer MC | 1, 2, 3, 4, 6, 8, 9, 10, 12, 14, 15, 16, 17, 18, 19, 21, 23, 24, 25, 27, 29, 30, 32, 33, 35, 36, 38, 40 | 28 |
| Multiple-answer (Select ALL) | 5, 7, 11, 13, 20, 22, 26, 28, 31, 34, 37, 39 | 12 |

**Table 3: Design Criterion**

| Design Criterion | Questions | Count |
|---|---|---|
| Application-based | 17, 18, 19, 20, 21, 22, 23, 24, 25, 27, 33, 35, 38 | 13 |
| Scenario-based | 11, 12, 26, 28, 34, 36, 37, 39, 40, 29, 30 | 11 |
| Definition-only | 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 31, 32 | 16 |
