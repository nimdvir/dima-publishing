# Chapter 9: Review and Reflection

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-revie-resized" alt="Review and Reflection section icon" width="220">
</p>

*Review the core ideas of database design, then think more deeply about how structure shapes every query, report, and business decision that depends on data.*

---

# Review Questions

*These questions check your understanding of the key concepts, definitions, and frameworks from Chapter 9.*

**1. What are insertion, update, and deletion anomalies? Use the `GRADE_FLAT` table from Section 9.2 to give one concrete example of each.**

**2. Explain the difference between conceptual, logical, and physical database design. Who is the primary audience for each level, and why should these levels not be collapsed too early?**

**3. How do entities, attributes, and relationships differ? Give one example of each from the Grading Database.**

**4. Distinguish between a superkey, a candidate key, and a primary key. Why are surrogate keys often preferred over natural keys?**

**5. What two things does Crow's Foot notation communicate? Explain the difference between cardinality and optionality using the `STUDENT ||--o{ STUDENT_GRADE` relationship as your example.**

**6. Why does the foreign key belong on the many side of a one-to-many relationship? What would go wrong if it were placed on the one side?**

**7. Why can relational databases not implement many-to-many relationships directly? What is an associative entity, and what role does `STUDENT_GRADE` play in resolving the M:N between `STUDENT` and `DELIVERABLE`?**

**8. Define weak entity. How does a weak entity's primary key differ from a strong entity's? Give an example using `COURSE` and `SECTION`.**

---

# Reflection Questions

*These questions ask you to interpret, compare, evaluate, or apply the chapter's ideas beyond straightforward recall.*

**1. The chapter argues that "many query problems are actually design problems in disguise." Do you agree? Describe a scenario where a query that looks correct returns misleading results because of a structural flaw in the schema.**

**2. Section 9.4 shows how business rules become structural rules (e.g., foreign keys, unique constraints, CHECK constraints). Choose two business rules from the Grading Database and explain what would happen if they were enforced only by human memory rather than by the database itself.**

**3. The mapping algorithm in Section 9.10 provides a step-by-step process for converting an ERD into relational tables. Where in that process do designers make the most consequential decisions, and why? Consider the difference between mapping a strong entity and mapping an M:N relationship.**

**4. The chapter presents three strategies for mapping specialization/generalization hierarchies to tables. For the Grading Database, imagine adding a `PERSON` supertype with `STUDENT` and `INSTRUCTOR` subtypes. Which strategy would you choose, and what trade-offs would you accept?**

**5. Section 9.9 states that denormalization "should come after a clean design exists." Why is this sequence important? Describe a situation where denormalizing before designing would create problems that are difficult to fix later.**

**6. Lucidchart and Mermaid serve different purposes in the design process. In a team project with both business stakeholders and developers, how would you use each tool at different stages? What risks arise from skipping the visual design step entirely?**

**7. The chapter lists eight common modeling mistakes (Section 9.12). Choose one mistake that you think is the most dangerous in a business context and explain why. How would you build a review step into the design process to catch it?**

---

# Personal Reflection Questions

*These questions invite you to connect the chapter's ideas to your own experience, goals, and development as a professional.*

**1. Before this chapter, how did you think about database structure? Has your understanding of "why tables are organized the way they are" changed? What was the most surprising concept?**

**2. Think about a real system you interact with regularly (a registration system, an online store, a streaming platform, a food delivery app). What entities, attributes, and relationships would you expect in its underlying database? Try sketching a rough ERD with at least four entities.**

**3. Consider the Grading Database schema. If you were redesigning it from scratch for a different course (say, a lab science course with experiments, lab partners, and equipment), what entities would change? What relationships would be different?**

**4. The chapter describes the shift from database user to database designer. Where do you see yourself on that spectrum right now? What skills from this chapter do you most want to practice further?**

**5. Reflect on the common mistakes section. Have you made any of these mistakes in your own work so far (in this course or elsewhere)? Which mistake do you think is the most tempting to make, and what would help you avoid it?**

**6. The SDLC places database design early in the system development process. Think about a group project or work experience where the team jumped straight to building without planning the data structure. What problems resulted, or what problems could have resulted?**

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Answer Key

## Review Questions

**Question 1: What are insertion, update, and deletion anomalies? Use the `GRADE_FLAT` table from Section 9.2 to give one concrete example of each.**
Suggested Answer: An **insertion anomaly** occurs when you cannot add a fact without adding an unrelated fact. In `GRADE_FLAT`, the instructor cannot add a new deliverable (e.g., "Project 1") before any student has submitted it, because every row also requires student and score data. An **update anomaly** occurs when the same fact is stored in many rows and updating only some creates inconsistency. If Alice changes her email, it must be updated in every row where she appears; missing one row creates conflicting versions. A **deletion anomaly** occurs when deleting one fact accidentally destroys another. If Brian has only one grade row and that row is deleted, his entire student record disappears from the database. All three are caused by mixing unrelated facts (student identity, deliverable definition, scores) in a single flat table.

**Question 2: Explain the difference between conceptual, logical, and physical database design. Who is the primary audience for each level, and why should these levels not be collapsed too early?**
Suggested Answer: **Conceptual design** identifies what the business domain contains (entities and relationships at a high level); its audience is business stakeholders who need to confirm that the system captures the right concepts. **Logical design** defines tables, attributes, keys, and constraints independently of any DBMS; its audience is database designers and analysts. **Physical design** implements the logical model in a specific platform (e.g., Access AutoNumber vs. PostgreSQL `GENERATED AS IDENTITY`); its audience is database administrators and developers. Collapsing these levels too early means the tool drives the design rather than the business rules, leading to platform-dependent structures that are harder to migrate and maintain.

**Question 3: How do entities, attributes, and relationships differ? Give one example of each from the Grading Database.**
Suggested Answer: An **entity** is a real-world object or concept the database represents (e.g., `STUDENT`). An **attribute** is a property of an entity (e.g., `Email` in `STUDENT`). A **relationship** describes how entities are connected (e.g., one `STUDENT` earns many `STUDENT_GRADE` records, a one-to-many relationship). Entities become tables, attributes become columns, and relationships are implemented through foreign keys or junction tables.

**Question 4: Distinguish between a superkey, a candidate key, and a primary key. Why are surrogate keys often preferred over natural keys?**
Suggested Answer: A **superkey** is any set of attributes that uniquely identifies a row (e.g., `{StudentID, FirstName}`). A **candidate key** is a minimal superkey from which no attribute can be removed without losing uniqueness (e.g., `{StudentID}` or `{Email}` if email is unique). A **primary key** is the candidate key officially chosen as the identifier. Surrogate keys (like `GradeID` AutoNumber) are preferred because they are short, stable, and unlikely to change, whereas natural keys (like email) may change over time or violate uniqueness assumptions.

**Question 5: What two things does Crow's Foot notation communicate? Explain the difference between cardinality and optionality using `STUDENT ||--o{ STUDENT_GRADE`.**
Suggested Answer: Crow's Foot notation communicates **(1) cardinality** (how many records can participate) and **(2) optionality** (whether participation is required or optional). In `STUDENT ||--o{ STUDENT_GRADE`: the `||` on the STUDENT side means "exactly one" (each grade must belong to one student — mandatory participation); the `o{` on the STUDENT_GRADE side means "zero or many" (a student may have no grades yet, or many grades — optional participation on the STUDENT side of the relationship). This encodes the business rule that a student can exist before any grades are entered, but every grade must be linked to a student.

**Question 6: Why does the foreign key belong on the many side of a one-to-many relationship? What would go wrong if it were placed on the one side?**
Suggested Answer: The foreign key belongs on the many side because each row on the many side needs to identify which single row on the one side it belongs to. If the foreign key were placed on the one side (e.g., putting `GradeID` in `STUDENT`), a student could reference only one grade, which contradicts the one-to-many rule. You would need multiple columns (`GradeID1`, `GradeID2`, ...) or multiple rows for the same student, both of which violate normalization.

**Question 7: Why can relational databases not implement many-to-many relationships directly? What is an associative entity, and what role does `STUDENT_GRADE` play?**
Suggested Answer: Relational databases cannot store M:N relationships directly because a single foreign-key column cannot reference multiple rows. An **associative entity** (also called a junction or bridge table) resolves this by creating a new table that holds foreign keys to both parent tables. `STUDENT_GRADE` resolves the M:N between `STUDENT` and `DELIVERABLE`: each row connects one student to one deliverable and stores the `Score`, which is a fact about the relationship itself rather than about either entity alone.

**Question 8: Define weak entity. How does a weak entity's primary key differ from a strong entity's? Give an example.**
Suggested Answer: A **weak entity** cannot be uniquely identified by its own attributes alone; its identity depends on an owner (strong) entity. Its primary key is a **composite key** that includes the owner's primary key plus the weak entity's partial key. For example, `SECTION(CourseID, SectionNumber, MeetingTime)` depends on `COURSE(CourseID, CourseTitle)`. `SectionNumber = 1` is not globally unique (many courses have Section 1), so the section's primary key is `(CourseID, SectionNumber)`. A strong entity like `STUDENT` has its own independent primary key (`StudentID`).

## Reflection Questions

**Question 1: The chapter argues that "many query problems are actually design problems in disguise." Do you agree?**
Suggested Answer: Yes, this claim is well supported. A query against a poorly normalized table may return duplicate rows, conflicting values, or incorrect aggregations not because the SQL is wrong, but because the underlying structure mixes unrelated facts. For example, if student email appears in every grade row, a `COUNT(DISTINCT Email)` to count students could be thrown off by a single mistyped email. The query is syntactically correct, but the result is misleading because the design did not enforce a single source of truth for student identity. Fixing the query is a patch; fixing the schema is the solution.

**Question 2: Choose two business rules from the Grading Database and explain what would happen if they were enforced only by human memory.**
Suggested Answer: (1) "A student should not have two scores for the same deliverable." Without a `UNIQUE(StudentID, DeliverableID)` constraint, duplicate grades could be entered accidentally, inflating or deflating averages. The error might not surface until final grade reports reveal impossible scores. (2) "Every grade must belong to an existing student." Without a `FOREIGN KEY` constraint referencing `STUDENT`, a typo in `StudentID` could create an orphaned grade that belongs to no one, silently distorting class averages. Human memory fails under time pressure, data entry volume, and staff turnover. Structural enforcement makes these errors impossible rather than merely unlikely.

**Question 3: Where in the mapping algorithm do designers make the most consequential decisions?**
Suggested Answer: The most consequential decisions occur when mapping M:N relationships and weak entities, because these steps create entirely new tables. When mapping a strong entity (Step 1), the entity already exists conceptually and the mapping is straightforward. But when resolving an M:N relationship (Step 4), the designer must decide which attributes belong in the junction table, what the primary key should be (composite vs. surrogate), and which constraints to enforce. Getting this wrong means the schema cannot accurately represent the business reality. Weak-entity mapping (Step 2) also carries high stakes because it defines identity dependence, which affects cascading deletes and referential integrity.

**Question 4: Imagine adding a `PERSON` supertype with `STUDENT` and `INSTRUCTOR` subtypes. Which mapping strategy would you choose?**
Suggested Answer: The superclass + subclass strategy is likely best here. Shared attributes (PersonID, FirstName, LastName, Email) go in `PERSON`. Subtype-specific attributes go in `STUDENT` (Major, ClassYear) and `INSTRUCTOR` (Department, OfficeHours). This avoids redundancy and supports the case where a person could be both student and instructor (overlapping subtypes). The trade-off is requiring joins to assemble a complete student or instructor profile. A single-table approach would be simpler to query but would produce many NULLs and weaker constraints, especially if the subtypes have substantially different attribute sets.

**Question 5: Why is it important that denormalization comes after a clean design?**
Suggested Answer: If you denormalize before designing, you never establish which facts belong where. Redundancies become invisible because there is no "correct" normalized baseline to compare against. Later, when anomalies surface, it is unclear whether the problem is intentional denormalization or accidental poor design. Starting with normalization establishes structural correctness and makes each redundancy a conscious, documented trade-off with a known refresh process. Reversing the order means patching problems reactively instead of preventing them structurally.

**Question 6: How would you use Lucidchart and Mermaid at different stages of a team project?**
Suggested Answer: In early design with business stakeholders, Lucidchart provides a shared visual workspace where non-technical participants can see entities, relationships, and cardinalities laid out visually. It supports real-time collaboration and produces polished diagrams for presentations. Once the design stabilizes, Mermaid captures the same structure as text-based code that can be version-controlled in GitHub, regenerated easily, and reviewed in pull requests. Skipping the visual step risks miscommunication with stakeholders; skipping the text step risks losing design documentation as the project evolves.

**Question 7: Which common modeling mistake is the most dangerous in a business context?**
Suggested Answer: "Building before modeling" (Section 9.12.1) is arguably the most dangerous because it skips the requirements and design phases entirely, leading to schemas that reflect the developer's assumptions rather than the business's actual rules. Every subsequent mistake (unresolved M:N, wrong foreign-key placement, missing optionality) becomes harder to detect and fix once tables are populated and applications depend on them. A design review step — where the ERD is reviewed against written business rules before any SQL is executed — catches most of these problems early, when they are inexpensive to fix.

## Personal Reflection Questions

**Question 1: How did your understanding of database structure change after this chapter?**
Suggested Answer: Before this chapter, many students think of databases as collections of tables with data in them, without much thought about why tables are separated or connected the way they are. After learning about anomalies, ER modeling, and the mapping algorithm, the shift is often realizing that table structure is not arbitrary — it encodes business rules. A common "most surprising concept" is that many-to-many relationships cannot be stored directly and require a junction table, which reveals that database structure actively shapes what questions SQL can answer.

**Question 2: What entities, attributes, and relationships would you expect in a system you use regularly?**
Suggested Answer: For a food delivery app, likely entities include `CUSTOMER`, `RESTAURANT`, `MENU_ITEM`, `ORDER`, and `ORDER_LINE` (junction). Attributes might include `CustomerID`, `Name`, `Address` for customers and `ItemName`, `Price`, `Category` for menu items. Key relationships: one customer places many orders (1:N), one order contains many menu items and one menu item appears in many orders (M:N resolved by `ORDER_LINE`). The ERD sketch should show at least these four entities with Crow's Foot notation.

**Question 3: How would the Grading Database change for a lab science course?**
Suggested Answer: New entities might include `EXPERIMENT`, `LAB_PARTNER_GROUP`, `EQUIPMENT`, and `LAB_REPORT`. The `DELIVERABLE` entity might split into lecture deliverables and lab deliverables. Relationships would change: students might work in groups (M:N between `STUDENT` and `LAB_PARTNER_GROUP`), experiments require equipment (M:N between `EXPERIMENT` and `EQUIPMENT`), and lab reports might be group-submitted rather than individual. The attendance model would also need to distinguish lecture attendance from lab attendance.

**Question 4: Where do you see yourself on the user-to-designer spectrum?**
Suggested Answer: Most students at this point are comfortable as users (writing queries against existing schemas) and beginning to understand design principles. Identifying which skills to practice further — such as drawing ERDs from requirements, recognizing anomalies in proposed designs, or translating Crow's Foot diagrams into SQL — helps set concrete learning goals for the remaining chapters and the Let's Build companion.

**Question 5: Which common mistake is the most tempting to make?**
Suggested Answer: Many students find "confusing attributes with entities" (Section 9.12.6) tempting because it feels simpler to add more columns to an existing table rather than creating a new entity. For example, adding `Phone1`, `Phone2`, `Phone3` to `STUDENT` instead of creating `STUDENT_PHONE`. Recognizing the pattern — if something could have multiple values or its own attributes, it may deserve its own table — is a design instinct that improves with practice.

**Question 6: Describe an experience where a team jumped to building without planning the data structure.**
Suggested Answer: A common scenario is a group project where the team immediately opens Access or a spreadsheet and starts creating columns without discussing what entities exist or how they relate. The result is often a single wide table that stores everything, leading to anomalies discovered late (e.g., duplicate customer names, lost records when rows are deleted). The lesson aligns with the chapter's central argument: spending time on requirements and ERD design before implementation saves far more time than fixing structural problems after the system is in use.
