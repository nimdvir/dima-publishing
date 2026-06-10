# Readiness Assessment Test (RAT): Chapter 10 -- From Data to Design: Building Reliable Information Systems

![RAT Header](<../../.images/Ch0 General/sections/RAT.png>)

> **Part of:** Chapter 10 -- *From Data to Design: Building Reliable Information Systems*
> **Main chapter file:** [ch10-edited-2026-03-08.md](ch10-edited-2026-03-08.md)
> **Key terms:** [ch10-TermTreasury-2026-03-08.md](ch10-TermTreasury-2026-03-08.md)

---

## Assessment Design Notes

### Bloom's Taxonomy Distribution

| Bloom's Level | Target Count | Actual Count |
|:---|:---|:---|
| **Remember** | 2--3 | 3 |
| **Understand** | 5--6 | 5 |
| **Apply** | 5--6 | 6 |
| **Analyze** | 3--4 | 3 |
| **Evaluate** | 2--3 | 3 |

### AI-Resistance Strategies Applied

1. **Chapter-specific reasoning over generic knowledge.** Distractors use technically plausible database design statements that contradict *this chapter's* specific framing -- for example, confusing the chapter's key hierarchy (superkey > candidate key > primary key) with generic definitions, or misattributing SDLC phases.
2. **Schema-specific context.** Questions reference the Grading Database's exact entities (STUDENT, DELIVERABLE, STUDENT_GRADE, CLASS SESSION), its attribute names, and the chapter's sample data. Generic ER modeling knowledge is insufficient.
3. **Scenario-based stems with embedded traps.** Application questions describe realistic design situations where the correct answer depends on applying a chapter-specific principle (e.g., why an associative entity is needed, how participation constraints affect NULL values).
4. **Multi-answer questions with fine-grained distinctions.** Each "Select ALL" option is individually plausible; pattern-matching should fail. Students must discriminate between closely related options about normalization, ER modeling constructs, and mapping rules.
5. **Distractors drawn from adjacent concepts.** Wrong answers borrow language from related but distinct ideas -- confusing logical design with physical design, confusing weak entities with associative entities, confusing cardinality with participation.
6. **Non-obvious correct answers.** Correct options are deliberately rephrased from the chapter's exact wording, requiring genuine understanding rather than keyword matching.
7. **Output prediction from concrete data.** Questions ask students to predict the structural consequences of specific design decisions using the Grading Database's entities and relationships.

---

## Individual RAT (iRAT)

Complete this assessment individually to test your understanding of Chapter 10: *From Data to Design: Building Reliable Information Systems*.

---

### Single-Answer Multiple Choice (Questions 1--15)

---

**1. According to the chapter, what is the primary purpose of database design?** -- *Bloom's Level: Remember*

- A) To write efficient SQL queries that return results quickly
- B) To make data anomalies structurally impossible by organizing data into well-defined entities, relationships, and constraints
- C) To choose the correct DBMS platform for deployment
- D) To create indexes that speed up query performance

---

**2. The chapter describes a hierarchy of keys used in database design. Which of the following correctly orders the hierarchy from broadest to most specific?** -- *Bloom's Level: Remember*

- A) Primary key > Candidate key > Superkey > Foreign key
- B) Foreign key > Primary key > Candidate key > Superkey
- C) Superkey > Candidate key > Primary key > Foreign key
- D) Candidate key > Superkey > Primary key > Foreign key

---

**3. In the chapter's discussion of ER diagrams, which shape is used to represent a relationship set?** -- *Bloom's Level: Remember*

- A) Rectangle
- B) Oval
- C) Diamond
- D) Double-bordered rectangle

---

**4. The chapter states that "good queries assume good design." Which of the following best explains *why* advanced SQL features like joins, subqueries, and aggregations depend on well-modeled databases?** -- *Bloom's Level: Understand*

- A) Because advanced SQL features require more computing power, and well-designed databases have better hardware
- B) Because advanced SQL assumes clear entity separation, stable keys, and structurally enforced rules -- without these, queries either fail or produce misleading results
- C) Because well-designed databases automatically optimize SQL queries, regardless of how they are written
- D) Because advanced SQL was developed specifically for normalized databases and cannot run on any other structure

---

**5. The chapter distinguishes between three levels of database design: conceptual, logical, and physical. Why does the chapter insist that logical design should be completed before physical design decisions are made?** -- *Bloom's Level: Understand*

- A) Because conceptual and logical designs are cheaper to create, so teams should use them to save development costs
- B) Because logical design defines entities, relationships, keys, and constraints independently of any DBMS, ensuring the design remains valid across platforms rather than being locked into one tool's conventions
- C) Because physical design is only relevant for enterprise databases, not for smaller systems like the Grading Database
- D) Because logical design automatically generates the physical schema, so no additional physical decisions are needed

---

**6. The chapter describes participation constraints as either total (mandatory) or partial (optional). Why does the chapter argue that failing to specify participation constraints leaves an ER model incomplete?** -- *Bloom's Level: Understand*

- A) Because participation constraints only apply to many-to-many relationships, and leaving them out makes the diagram inaccurate
- B) Because without participation constraints, the model does not answer critical business questions -- such as whether a deliverable can exist before any scores are entered or whether a student must have attendance records
- C) Because participation constraints determine which DBMS to use for implementation
- D) Because total participation is always required for all relationships in a well-designed database

---

**7. The chapter explains that normalization progresses through a series of normal forms (1NF through BCNF). According to the chapter, what does Third Normal Form (3NF) specifically eliminate?** -- *Bloom's Level: Understand*

- A) Repeating groups and multi-valued attributes
- B) Partial dependencies where a non-key attribute depends on only part of a composite key
- C) Transitive dependencies where a non-key attribute depends on another non-key attribute
- D) All remaining anomalies caused by non-candidate-key determinants

---

**8. The chapter warns that denormalization should only be done "with justification." Which of the following best captures the chapter's position on when denormalization is appropriate?** -- *Bloom's Level: Understand*

- A) Whenever the database has more than five tables, because excessive normalization always hurts performance
- B) When queries require excessive joins, in read-heavy applications, or for reporting/data warehousing scenarios where speed outweighs the risk of redundancy
- C) Whenever surrogate keys are used, because surrogate keys make normalization unnecessary
- D) Only during the planning phase of the SDLC, before any tables have been created

---

**9. A university registrar stores student records, course information, advisor assignments, and transcript data all in a single flat spreadsheet. A student withdraws from one course, and the registrar deletes that row. The row also contained the only record of the student's advisor assignment. Based on the chapter, which type of data anomaly has occurred?** -- *Bloom's Level: Apply*

- A) Insertion anomaly
- B) Update anomaly
- C) Deletion anomaly
- D) Referential integrity violation

---

**10. During a design review of the Grading Database, a team member proposes storing a student's Age as a column in the STUDENT table. Another team member argues that only BirthDate should be stored. Based on the chapter's discussion of attribute classification, which argument aligns with the chapter?** -- *Bloom's Level: Apply*

- A) Age should be stored because it is used more frequently than BirthDate in reports
- B) Both Age and BirthDate should be stored to ensure consistency and avoid calculation errors
- C) Age is a derived attribute -- it should be computed from BirthDate at query time rather than stored, because storing it creates maintenance overhead and risks inconsistency
- D) BirthDate is a composite attribute and should be decomposed into BirthDay, BirthMonth, and BirthYear

---

**11. Consider the following Crow's Foot notation from the chapter:**

```
DELIVERABLE ||----o{ STUDENT_GRADE
```

**Which of the following correctly reads this relationship?** -- *Bloom's Level: Apply*

- A) Each DELIVERABLE must be associated with at least one STUDENT_GRADE; each STUDENT_GRADE may be associated with zero or one DELIVERABLE
- B) Each DELIVERABLE can be associated with zero or many STUDENT_GRADE records; each STUDENT_GRADE must be associated with exactly one DELIVERABLE
- C) Each DELIVERABLE can be associated with exactly one STUDENT_GRADE; each STUDENT_GRADE can be associated with many DELIVERABLES
- D) Each DELIVERABLE is optionally associated with one STUDENT_GRADE; each STUDENT_GRADE is optionally associated with one DELIVERABLE

---

**12. A designer is modeling a university library system and identifies a BOOK_COPY entity that cannot be uniquely identified without knowing which BOOK it belongs to. The primary key of BOOK_COPY is {BookID, CopyNumber}. Based on the chapter, what type of entity is BOOK_COPY?** -- *Bloom's Level: Apply*

- A) A strong entity with a composite primary key
- B) A weak entity with CopyNumber as a partial key, dependent on BOOK through an identifying relationship
- C) An associative entity resolving a many-to-many relationship between BOOK and LIBRARY
- D) A recursive entity that references itself

---

**13. According to the chapter's mapping algorithm, how should a many-to-many (M:N) relationship between STUDENT and COURSE be implemented in a relational schema?** -- *Bloom's Level: Apply*

- A) Place StudentID as a foreign key in the COURSE table
- B) Place CourseID as a foreign key in the STUDENT table
- C) Create a new intersection (junction) table containing foreign keys from both STUDENT and COURSE
- D) Combine both entities into a single STUDENT_COURSE table with all attributes from both

---

**14. A team is designing the Grading Database and must decide how to handle a student's phone numbers, knowing that students may have a mobile number, a home number, and a work number. Based on the chapter's guidance on attribute types and normal form rules, which approach aligns with 1NF?** -- *Bloom's Level: Apply*

- A) Store all phone numbers in a single comma-separated text field in the STUDENT table
- B) Add three columns to the STUDENT table: MobilePhone, HomePhone, WorkPhone
- C) Create a separate STUDENT_PHONE table with StudentID as a foreign key and individual rows for each phone number
- D) Store only the primary phone number and discard the others

---

**15. A designer creates a Crow's Foot ERD and uses a dashed line between STUDENT_GRADE and STUDENT, but uses a solid line between ORDER_ITEM and ORDER in a separate retail database. Based on the chapter, what is the significance of this visual distinction?** -- *Bloom's Level: Apply*

- A) Dashed lines indicate optional relationships; solid lines indicate mandatory relationships
- B) Dashed lines represent nonidentifying relationships where the child has its own independent primary key; solid lines represent identifying relationships where the child's primary key includes the parent's primary key
- C) Dashed lines indicate one-to-one relationships; solid lines indicate one-to-many relationships
- D) The distinction is purely aesthetic and has no structural meaning

---

### Multiple-Answer Questions (Questions 16--20)

*Select ALL that apply for each question. Each question has at least two correct answers.*

---

**16. The chapter identifies six SDLC phases viewed through a database design lens. Which of the following statements accurately reflect the chapter's description of how these phases apply to database work? *(Select ALL that apply.)*** -- *Bloom's Level: Analyze*

- A) During Planning and Analysis, the focus is on understanding what information must be captured and what questions the system must answer -- no tables are created and no SQL is written
- B) During the Design phase, the designer selects the specific DBMS vendor and purchases licensing before any modeling begins
- C) During Testing, the team verifies that data integrity rules are enforced by structure and that required queries return correct results under realistic conditions
- D) The Maintenance phase is typically the shortest phase, since well-designed databases rarely need updates
- E) The chapter states that mistakes made early in the SDLC are the most expensive to fix later, because once data accumulates and users depend on the system, redesign becomes costly and disruptive

---

**17. The chapter discusses several advanced ER modeling concepts. Which of the following correctly describe these concepts as presented in the chapter? *(Select ALL that apply.)*** -- *Bloom's Level: Analyze*

- A) A weak entity cannot be uniquely identified by its own attributes alone and requires an identifying relationship with a strong entity; its primary key is a composite of the owner's primary key and a partial key
- B) An associative (intersection) entity resolves a many-to-many relationship by transforming it into two one-to-many relationships, and often carries its own attributes that describe the relationship itself
- C) In a disjoint specialization, an entity instance can belong to multiple subclasses simultaneously
- D) Aggregation allows a relationship set to be treated as a higher-level abstract entity so it can participate in another relationship
- E) Recursive relationships occur when an entity has a relationship with itself, such as EMPLOYEE manages EMPLOYEE, and can take any cardinality (1:1, 1:N, or M:N)

---

**18. The chapter presents three strategies (A, B, C) for mapping specialization/generalization hierarchies to relational tables. Which of the following accurately describe these strategies and their trade-offs as discussed in the chapter? *(Select ALL that apply.)*** -- *Bloom's Level: Analyze*

- A) Strategy A (multiple tables) creates one table for the superclass plus one per subclass, where subclass tables include the superclass PK as both PK and FK -- this approach is normalized and avoids NULLs but requires JOINs
- B) Strategy B (subclass tables only) can only be used when every superclass instance must belong to a subclass (total specialization), and each subclass table contains all inherited superclass attributes
- C) Strategy C (single table) is always the best choice because it eliminates JOINs and produces the simplest queries regardless of the number of subclass-specific attributes
- D) Strategy A is best when integrity and storage efficiency are priorities, while Strategy C is best when there are few subclass-specific attributes and the hierarchy is disjoint
- E) Strategy B eliminates redundancy because superclass attributes are stored only once in a shared parent table

---

**19. The chapter lists several common mistakes in database modeling. Based on the chapter's specific warnings, which of the following are explicitly identified as modeling errors? *(Select ALL that apply.)*** -- *Bloom's Level: Evaluate*

- A) Implementing a many-to-many relationship by adding repeating columns (Student1, Student2, Student3) rather than creating an associative entity
- B) Using singular nouns for entity names instead of plural nouns
- C) Skipping the ER modeling step entirely and jumping straight into CREATE TABLE statements based on an informal understanding of requirements
- D) Failing to label relationship lines with verbs that describe the business rule (e.g., writing just a line instead of "earns" or "attends")
- E) Choosing SQLite over PostgreSQL for a prototype, since the chapter states all prototypes must use enterprise-grade databases

---

**20. The chapter compares the ER model to alternative modeling approaches (UML class diagrams and NoSQL data modeling). Which of the following statements about the ER model's strengths and limitations are consistent with the chapter's discussion? *(Select ALL that apply.)*** -- *Bloom's Level: Evaluate*

- A) The ER model excels at visualizing data relationships and communicating structure to both technical and non-technical stakeholders
- B) The ER model captures system behavior, methods, and operations in addition to data structure
- C) For very large enterprise systems with hundreds of entities, ERDs can become difficult to read and maintain
- D) The intellectual discipline of identifying entities, attributes, and relationships remains valuable even when the target implementation is not a relational database
- E) The ER model is the only valid approach for modern database design, and UML and NoSQL modeling are considered obsolete alternatives

---

---

## Answer Key

---

#### Question 1

**Correct Answer: B) To make data anomalies structurally impossible by organizing data into well-defined entities, relationships, and constraints**

*Explanation:* The chapter states in Section 10.2.4: "At its core, database design aims to make data anomalies structurally impossible." Every design principle introduced in the chapter -- entities, relationships, keys, normalization -- exists to prevent insertion, update, and deletion anomalies. Option A describes query writing, not design. Option C describes platform selection, which is a physical design decision. Option D describes indexing, which is a physical implementation concern.

---

#### Question 2

**Correct Answer: C) Superkey > Candidate key > Primary key > Foreign key**

*Explanation:* Section 10.5.4 defines the hierarchy: a superkey is any set of attributes that uniquely identifies an entity; a candidate key is a *minimal* superkey; a primary key is the candidate key *chosen* by the designer; and a foreign key references another entity's primary key. The hierarchy narrows from broadest (superkey, which includes redundant attributes) to most specific (primary key, a single selected candidate key). Foreign keys serve a different purpose (implementing relationships) but are placed at the end of the hierarchy as derived from primary keys.

---

#### Question 3

**Correct Answer: C) Diamond**

*Explanation:* Section 10.5.5 states: "In ER diagrams, relationships are represented by **diamond** symbols connecting the participating entity rectangles." Rectangles represent entities. Ovals represent attributes. Double-bordered rectangles represent weak entities.

---

#### Question 4

**Correct Answer: B) Because advanced SQL assumes clear entity separation, stable keys, and structurally enforced rules -- without these, queries either fail or produce misleading results**

*Explanation:* Section 10.1.1 states that advanced SQL "increasingly assumes that the underlying database is well modeled" and specifically expects "clear separation of entities (students, deliverables, grades), stable primary and foreign keys, [and] consistent rules enforced by structure rather than by memory or convention." Without these foundations, "advanced SQL features either fail outright or produce misleading results." Option A confuses design quality with hardware. Option C falsely claims automatic optimization. Option D incorrectly limits SQL's scope.

---

#### Question 5

**Correct Answer: B) Because logical design defines entities, relationships, keys, and constraints independently of any DBMS, ensuring the design remains valid across platforms rather than being locked into one tool's conventions**

*Explanation:* Section 10.11.1 states: "A good design does not depend on the tool. If your design only works in one DBMS, it is not a design -- it is a workaround." The three design levels (conceptual, logical, physical) are introduced in Section 10.3.3, Phase 2, where logical design is described as "tables, columns, primary keys, foreign keys, normalization rules" created for "database designers, developers" -- independent of technology choices. Option A trivializes the purpose to cost savings. Option C incorrectly limits physical design to enterprise systems. Option D falsely claims automatic generation.

---

#### Question 6

**Correct Answer: B) Because without participation constraints, the model does not answer critical business questions -- such as whether a deliverable can exist before any scores are entered or whether a student must have attendance records**

*Explanation:* Section 10.12.4 explicitly warns: "Failing to specify whether a relationship is optional or mandatory leaves critical business rules undocumented. Can a deliverable exist before any scores are entered? Can a student exist without any attendance records? If your ERD does not answer these questions, it is incomplete." Option A incorrectly limits participation constraints to M:N relationships. Option C conflates constraints with platform selection. Option D wrongly claims total participation is always required.

---

#### Question 7

**Correct Answer: C) Transitive dependencies where a non-key attribute depends on another non-key attribute**

*Explanation:* Section 10.8.2 defines 3NF as: "In 2NF, and no non-key attribute depends on another non-key attribute." The example given is that if ZipCode determines City, then City should be in a separate ZIP table. Option A describes what 1NF eliminates. Option B describes 2NF. Option D describes BCNF.

---

#### Question 8

**Correct Answer: B) When queries require excessive joins, in read-heavy applications, or for reporting/data warehousing scenarios where speed outweighs the risk of redundancy**

*Explanation:* Section 10.8.3 lists three conditions for considering denormalization: "Queries require excessive joins across many tables," "Read-heavy applications need faster retrieval," and "Reporting and data warehousing scenarios prioritize speed over purity." The key takeaway is: "Normalize by default; denormalize with justification." Option A applies a false threshold. Option C fabricates a connection between surrogate keys and normalization. Option D incorrectly places denormalization in the planning phase.

---

#### Question 9

**Correct Answer: C) Deletion anomaly**

*Explanation:* Section 10.2.3 defines a deletion anomaly as occurring "when removing one piece of data inadvertently destroys another, unrelated piece of data." The example mirrors the chapter's illustration: "If a student's only grade record is deleted from a flat table, and that row also contained the student's contact information, then the student's information disappears entirely -- even though the intent was only to remove the grade." In this scenario, deleting the course enrollment destroys the advisor assignment.

---

#### Question 10

**Correct Answer: C) Age is a derived attribute -- it should be computed from BirthDate at query time rather than stored, because storing it creates maintenance overhead and risks inconsistency**

*Explanation:* Section 10.4.2 classifies Age as a **derived attribute** -- "Calculated from other stored attributes" -- and the accompanying tip states: "It is generally best practice to compute derived values at query time rather than storing them." Storing Age would require constant updates and risk being out of date. Option A prioritizes usage frequency over design correctness. Option B creates redundancy. Option D misclassifies BirthDate.

---

#### Question 11

**Correct Answer: B) Each DELIVERABLE can be associated with zero or many STUDENT_GRADE records; each STUDENT_GRADE must be associated with exactly one DELIVERABLE**

*Explanation:* Section 10.6.3 teaches reading Crow's Foot: "Read the symbols from the perspective of the opposite entity." The `||` on the DELIVERABLE side means each STUDENT_GRADE relates to exactly one DELIVERABLE (mandatory one). The `o{` on the STUDENT_GRADE side means each DELIVERABLE relates to zero or many STUDENT_GRADE records (optional many). This matches the Grading Database's logic: a deliverable can exist before any grades are entered, but each grade must reference exactly one deliverable.

---

#### Question 12

**Correct Answer: B) A weak entity with CopyNumber as a partial key, dependent on BOOK through an identifying relationship**

*Explanation:* Section 10.7.1 defines a weak entity as one that "cannot be uniquely identified by its own attributes alone" and whose "primary key is formed by combining the owner's primary key with the partial key." BOOK_COPY's primary key {BookID, CopyNumber} includes the owner (BOOK) entity's key, and CopyNumber alone is the partial key (discriminator). This matches the chapter's SECTION/COURSE example. Option A misidentifies it as a strong entity. Option C describes an associative entity. Option D describes a recursive relationship.

---

#### Question 13

**Correct Answer: C) Create a new intersection (junction) table containing foreign keys from both STUDENT and COURSE**

*Explanation:* Section 10.10.3 states the mapping rule for M:N relationships: "Create a new intersection (junction) table containing FKs from both participating tables." Section 10.7.2 further explains that an associative entity "transforms one M:N relationship into two 1:N relationships." Options A and B would only handle a 1:N relationship. Option D combines entities instead of relating them, destroying their independent identity.

---

#### Question 14

**Correct Answer: C) Create a separate STUDENT_PHONE table with StudentID as a foreign key and individual rows for each phone number**

*Explanation:* Section 10.10.4 states: "Multi-valued attributes: Create a separate table with the multi-valued attribute and the primary key of the original entity as a foreign key." Phone numbers are classified as multi-valued (Section 10.5.3 lists "PhoneNumbers" as the example of a multi-valued attribute in the double-oval notation). Option A violates 1NF (which requires atomic values). Option B uses repeating groups (a fixed number of phone columns), which is inflexible. Option D discards valid data.

---

#### Question 15

**Correct Answer: B) Dashed lines represent nonidentifying relationships where the child has its own independent primary key; solid lines represent identifying relationships where the child's primary key includes the parent's primary key**

*Explanation:* Section 10.6.4 explicitly defines this distinction: "Identifying relationship (solid line): The child entity's primary key includes the parent's primary key." "Nonidentifying relationship (dashed line): The child entity has its own independent primary key. The foreign key references the parent but is not part of the child's primary key." STUDENT_GRADE has GradeID as its own PK (nonidentifying, dashed), while ORDER_ITEM's PK includes OrderID (identifying, solid). Option A confuses this with participation constraints. Option C confuses it with cardinality. Option D denies a meaningful distinction.

---

### Multiple-Answer Questions (Questions 16--20)

---

#### Question 16

**Correct Answers: A, C, E**

| Option | Correct? | Reasoning |
|--------|----------|-----------|
| **A** | Yes | Section 10.3.3, Phase 1 states: "At this stage, no tables are created, and no SQL is written. The focus is on understanding the information landscape, not implementation details." |
| **B** | No | Section 10.3.3, Phase 2 describes the Design phase as focused on conceptual, logical, and physical modeling -- not vendor selection and licensing. The chapter separates design (structure) from implementation (technology). |
| **C** | Yes | Section 10.3.3, Phase 4 states testing includes "confirming that required queries can be written cleanly and correctly, validating data integrity rules, and ensuring that business rules are enforced by structure, not by user memory." |
| **D** | No | Section 10.3.3, Phase 6 states the opposite: "Maintenance is the longest phase of the SDLC and where design quality truly reveals itself." The chapter's tip states: "In practice, most database work happens during maintenance, not initial development." |
| **E** | Yes | Section 10.3.1 warns: "Mistakes made early in the SDLC are the most expensive to fix later. A poorly designed table or missing relationship may seem harmless during development, but once data accumulates and users depend on it, redesign becomes costly, risky, and disruptive." |

---

#### Question 17

**Correct Answers: A, B, D, E**

| Option | Correct? | Reasoning |
|--------|----------|-----------|
| **A** | Yes | Section 10.7.1 states: "A weak entity set is an entity that cannot be uniquely identified by its own attributes alone" and "The primary key of a weak entity is formed by combining the owner's primary key with the partial key." The identifying relationship to the owner is always total participation. |
| **B** | Yes | Section 10.7.2 states an associative entity "transforms one M:N relationship into two 1:N relationships" and "often has its own attributes that describe the relationship itself." STUDENT_GRADE carries Score as a relationship attribute. |
| **C** | No | Section 10.7.3 defines *disjoint (d)* as: "Each instance belongs to at most one subclass." It is *overlapping (o)* specialization that allows membership in multiple subclasses. This is a common confusion between disjoint and overlapping constraints. |
| **D** | Yes | Section 10.7.5 defines aggregation as "treating a relationship set and its participating entities as a single, higher-level abstract entity, which can then participate in other relationships." The Manager-supervises-Works_On example illustrates this. |
| **E** | Yes | Section 10.7.4 states: "A recursive relationship occurs when an entity has a relationship with itself. These can take any cardinality: 1:1 Recursive... 1:N Recursive: EMPLOYEE manages other EMPLOYEES... M:N Recursive." |

---

#### Question 18

**Correct Answers: A, B, D**

| Option | Correct? | Reasoning |
|--------|----------|-----------|
| **A** | Yes | Section 10.10.5 describes Strategy A as: "One table for superclass + one per subclass; subclass tables include superclass PK as both PK and FK." Pros: "Normalized, no NULLs, extensible." Cons: "Requires JOINs." |
| **B** | Yes | Section 10.10.5 describes Strategy B as: "One table per subclass, each containing all inherited superclass attributes." Its "Best When" column states: "Every instance must belong to a subclass," confirming it requires total specialization. |
| **C** | No | Section 10.10.5 lists Strategy C's cons as: "Many NULLs, hard to enforce constraints." It is best only when there are "Few subclass-specific attributes; disjoint hierarchy." The chapter does not endorse it as universally best. |
| **D** | Yes | Section 10.10.5's "Best When" column states Strategy A is best when "Integrity and storage efficiency are priorities" and Strategy C is best when there are "Few subclass-specific attributes; disjoint hierarchy." |
| **E** | No | Strategy B *duplicates* superclass attributes into each subclass table ("each containing all inherited superclass attributes"), which introduces redundancy -- the opposite of what this option claims. It is Strategy A that avoids this duplication. |

---

#### Question 19

**Correct Answers: A, C, D**

| Option | Correct? | Reasoning |
|--------|----------|-----------|
| **A** | Yes | Section 10.12.1 explicitly warns: "Attempting to do so (for example, putting multiple StudentIDs in a single Deliverable row, or creating repeating columns like Student1, Student2, Student3) violates 1NF and creates maintenance nightmares." |
| **B** | No | The chapter actively recommends singular nouns: Section 10.9.5, Step 3 states: "name them with clear singular nouns such as STUDENT, COURSE, INSTRUCTOR... Singular nouns improve readability because each box represents one type of thing." Using singular nouns is a good practice, not a mistake. |
| **C** | Yes | Section 10.12.6 identifies this as "the single most common mistake": "jumping straight into CREATE TABLE statements based on an informal understanding of the requirements. This nearly always produces flat, denormalized structures." The chapter warns: "Never let SQL be your first design tool." |
| **D** | Yes | Section 10.12.2 warns: "An ERD line connecting two entities without a clear verb label... leaves the relationship ambiguous." The good practice is to "Label every relationship line with a verb that describes the business rule: STUDENT *earns* GRADE, not STUDENT *has* GRADE." |
| **E** | No | Section 10.11.3 describes SQLite as valid for "Learning, embedded systems, mobile apps" and Access as effective for "Education, rapid prototyping, small-team solutions." The chapter explicitly endorses non-enterprise platforms for appropriate use cases, including its own use of SQLite throughout the course. |

---

#### Question 20

**Correct Answers: A, C, D**

| Option | Correct? | Reasoning |
|--------|----------|-----------|
| **A** | Yes | Section 10.13.1 lists as a strength: "The graphical nature of ERDs makes them intuitive for visualizing complex data relationships, accessible to non-technical stakeholders" and "ERDs serve as a common language between business users and technical teams." |
| **B** | No | Section 10.13.2 explicitly states as a limitation: "The ER model describes the static structure of data but does not represent system behavior, data flow, or process logic." UML class diagrams, by contrast, include "Methods and operations" (Section 10.13.3). |
| **C** | Yes | Section 10.13.2 states: "For very large enterprise systems with hundreds of entities, ERDs can become difficult to read and maintain." This is an explicitly acknowledged limitation. |
| **D** | Yes | Section 10.13.3 states: "Regardless of the target technology, the intellectual discipline of analyzing a domain to identify its entities, attributes, and relationships remains necessary. The thought process that the ER model instills serves every data professional, even when the implementation is not a relational database." |
| **E** | No | The chapter explicitly presents UML and NoSQL modeling as valid alternative approaches with their own strengths (Section 10.13.3 comparison table). It states the ER model has limitations and compares rather than dismisses alternatives. |

---

## Question Distribution Summary

### Table 1: Bloom's Level

| Bloom's Level | Questions | Count |
|:---|:---|:---|
| **Remember** | 1, 2, 3 | 3 |
| **Understand** | 4, 5, 6, 7, 8 | 5 |
| **Apply** | 9, 10, 11, 12, 13, 14, 15 | 6 |
| **Analyze** | 16, 17, 18 | 3 |
| **Evaluate** | 19, 20 | 3 |

### Table 2: Question Type

| Question Type | Questions | Count |
|:---|:---|:---|
| Single-answer MC | 1--15 | 15 |
| Multiple-answer (Select ALL) | 16--20 | 5 |

### Table 3: Design Criterion

| Design Criterion | Questions | Count |
|:---|:---|:---|
| **Application-based** | 9, 11, 12, 13, 14, 15 | 6 |
| **Scenario-based** | 4, 6, 9, 10 | 4 |
| **Definition-only** | 1, 2, 3, 7, 8 | 5 |
