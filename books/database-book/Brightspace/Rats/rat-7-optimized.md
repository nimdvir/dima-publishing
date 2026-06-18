# RAT 7 — Top Questions (Optimized)

**Source:** Chapter 7 — Data Normalization (ch07-main-2026-06-16.md)
**Date:** 2026-06-17
**Total:** 10 questions (2 multi-select + 8 multiple-choice)
**Bloom distribution:** 3 Understand, 5 Apply, 1 Analyze, 1 Evaluate
**Selection criteria:** Higher Bloom levels (Apply, Analyze, Evaluate), scenario-based reasoning, AI-resistance, and broad coverage of all major chapter sections (Why Normalization Matters, Functional Dependencies, 1NF, 2NF, 3NF, Denormalization, Common Mistakes).
**CSV file:** `rat-7-optimized.csv`

---

<div style="background: #F0FDFA; border-left: 4px solid #0F766E; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0;">
<p style="margin: 0 0 8px 0; font-size: 1.05em; color: #18181b;">This <strong>Reading Assessment Test (RAT)</strong> is based on <strong style="color: #0f766e;">Chapter 7: Data Normalization</strong> in the course textbook, <a rel="noopener" href="https://data-pilot.dimapublishing.com/" style="color: #0e7490; font-weight: 600; text-decoration: none;"> <strong>Using Data to Drive Business Performance</strong> </a>.</p>
<p style="margin: 0; font-size: 0.95em; color: #18181b;">Make sure you complete reading the chapter and then answer the questions here: <a rel="noopener" href="https://data-pilot.dimapublishing.com/book/ch07/introduction/1" style="color: #4f46e5; font-weight: 600; text-decoration: none;"> Chapter 7 — Data Normalization → </a></p>
</div>

---

## Multi-Select Questions

**Q1. Modification anomalies in denormalized data**

*Short description: Modification anomalies*

A company stores all project data in one flat table: ProjectID, ProjectName, EmployeeID, EmployeeName, EmployeeDept, HoursWorked. The same employee works on multiple projects. An employee transfers to a different department.

Select ALL that apply.

A. Update anomaly: the employee's new department must be changed in every project row for that employee  ← ✓ CORRECT
*Feedback: Correct — because EmployeeDept repeats in every project row, a department transfer requires updating many rows.*

B. Normalization anomaly: the table violates 3NF by storing unrelated data together
*Feedback: Incorrect — there is no anomaly called a normalization anomaly. The named anomalies are insertion, update, deletion, and redundancy.*

C. Insertion anomaly: a new employee who is not yet assigned to any project cannot be recorded  ← ✓ CORRECT
*Feedback: Correct — without a project to attach to, there is no place to record that an employee exists.*

D. Deletion anomaly: removing the only project for an employee removes the employee record entirely  ← ✓ CORRECT
*Feedback: Correct — when employee and project data are mixed, deleting a project row can destroy the employee record.*

E. Redundancy: EmployeeName and EmployeeDept repeat across every project row for that employee  ← ✓ CORRECT
*Feedback: Correct — flat tables store the same non-key attributes in multiple rows, wasting space and risking inconsistency.*

**Hint:** Think about what happens when employee data and project data are mixed in one table.

**Explanation:** Chapter 7 explains that flat tables mixing multiple themes create the same four modification anomalies: update (one change requires many edits), insertion (cannot add one fact without another), deletion (removing one fact destroys another), and redundancy (same data stored repeatedly). Normalization systematically eliminates these by separating themes into their own tables.

**Points:** 2 | **Difficulty:** 3/5 | **ID:** BITM330-RAT7-Q1 | **Bloom:** Understand

---

**Q2. Functional dependencies**

*Short description: Functional dependencies*

In the flat Grading Database table, the following columns exist: StudentID, StudentName, DeliverableID, DeliverableName, Score. Which functional dependencies are correct?

Select ALL that apply.

A. StudentID → StudentName: given a StudentID, there is exactly one StudentName  ← ✓ CORRECT
*Feedback: Correct — StudentID determines StudentName. Each StudentID maps to exactly one student name.*

B. Score → StudentID: given a score, you can determine which student earned it
*Feedback: Incorrect — the same score (e.g., 85) could belong to multiple students. Score does not uniquely determine StudentID.*

C. (StudentID, DeliverableID) → Score: given a student and deliverable, there is exactly one score  ← ✓ CORRECT
*Feedback: Correct — the combination of student and deliverable uniquely determines the grade. This is a composite determinant.*

D. DeliverableName → Score: given a deliverable name, you can determine the score a student earned
*Feedback: Incorrect — different students earn different scores on the same deliverable. DeliverableName alone does not determine Score.*

E. DeliverableID → DeliverableName: given a deliverable ID, there is exactly one deliverable name  ← ✓ CORRECT
*Feedback: Correct — DeliverableID determines DeliverableName. This is a straightforward functional dependency.*

**Hint:** Functional dependency: X → Y means given X, there is exactly one Y. Think about which columns determine which others.

**Explanation:** Chapter 7 defines functional dependencies as relationships where one attribute (or set) determines another. StudentID → StudentName means each student has one name. (StudentID, DeliverableID) → Score means the combination uniquely determines the grade. Understanding these dependencies is the foundation for applying normal forms correctly.

**Points:** 2 | **Difficulty:** 4/5 | **ID:** BITM330-RAT7-Q2 | **Bloom:** Analyze

---

## Multiple-Choice Questions

**Q3. Normalization definition**

*Short description: Normalization definition*

Chapter 7 defines normalization. Which statement best captures the purpose of normalization in database design?

A. Normalization combines all related data into a single table for faster queries
*Feedback: Incorrect — normalization does the opposite: it separates data into multiple tables by theme.*

B. Normalization is a systematic process of organizing data to reduce redundancy and eliminate modification anomalies  ← ✓ CORRECT
*Feedback: Correct — normalization applies formal rules (1NF, 2NF, 3NF) to restructure tables so each fact is stored in exactly one place.*

C. Normalization is a performance optimization that makes queries run faster by duplicating data
*Feedback: Incorrect — normalization typically reduces duplication, which can sometimes make queries slightly more complex but vastly improves data integrity.*

D. Normalization is an alternative to using primary keys — normalized tables do not need unique identifiers
*Feedback: Incorrect — normalization depends on primary keys. Every normalized table requires a primary key to identify rows.*

**Hint:** Normalization = reducing redundancy by separating data into themed tables using formal rules.

**Explanation:** Chapter 7 defines normalization as the systematic process of applying normal forms (1NF, 2NF, 3NF) to eliminate data redundancy and prevent modification anomalies. The goal is to ensure each fact is stored once, in the right table, dependent on the right key, reducing inconsistency and maintenance burden.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT7-Q3 | **Bloom:** Understand

---

**Q4. 1NF: multi-valued cell violation**

*Short description: 1NF multi-valued cell*

A table has a column called PhoneNumbers where a single cell contains "555-0100, 555-0200, 555-0300." According to Chapter 7, which normal form does this violate, and why?

A. First Normal Form (1NF) — each cell must contain a single atomic value, not a list  ← ✓ CORRECT
*Feedback: Correct — 1NF requires that every cell holds exactly one value. A comma-separated list of multiple phone numbers violates atomicity.*

B. Second Normal Form (2NF) — PhoneNumbers is not fully dependent on the primary key
*Feedback: Incorrect — while 2NF addresses partial dependencies, the multi-valued cell is a 1NF violation that must be fixed first.*

C. Third Normal Form (3NF) — PhoneNumbers is transitively dependent on another non-key column
*Feedback: Incorrect — 3NF addresses transitive dependencies. A multi-valued cell is a more fundamental 1NF problem.*

D. No normal form violation — storing multiple values in one cell is acceptable for performance
*Feedback: Incorrect — Chapter 7 explicitly states that 1NF requires atomic values. Multi-valued cells violate this fundamental rule.*

**Hint:** 1NF = One cell, one fact. A comma-separated list has multiple facts in one cell.

**Explanation:** Chapter 7 explains that First Normal Form (1NF) requires every cell to contain a single atomic value — one fact per cell. Storing multiple phone numbers in one cell violates this rule. The fix is to create a separate PHONE table where each phone number is its own row, linked back to the parent record by foreign key.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT7-Q4 | **Bloom:** Apply

---

**Q5. 1NF: repeating columns violation**

*Short description: 1NF repeating columns*

A course registration table has columns: StudentID, Course1, Course2, Course3, Course4. According to Chapter 7, which normal form does this violate?

A. First Normal Form (1NF) — repeating groups of columns (Course1, Course2, etc.) violate the atomicity and structure rules of 1NF  ← ✓ CORRECT
*Feedback: Correct — 1NF prohibits repeating groups. Course1-Course4 are essentially the same attribute repeated, which creates a rigid, non-scalable structure.*

B. Second Normal Form (2NF) — the course columns are partially dependent on the primary key
*Feedback: Incorrect — while there may be underlying dependency issues, the repeating column pattern is a 1NF structural violation.*

C. Third Normal Form (3NF) — Course1 through Course4 are transitively dependent
*Feedback: Incorrect — 3NF addresses transitive dependencies. Repeating columns are a 1NF violation that must be resolved first.*

D. No violation — this is a common and acceptable spreadsheet design pattern
*Feedback: Incorrect — Chapter 7 identifies repeating columns as a 1NF violation. What happens when a student takes 5 courses?*

**Hint:** What happens when a student needs a 5th course? Repeating columns = 1NF violation.

**Explanation:** Chapter 7 identifies repeating columns (Course1, Course2, Course3...) as a 1NF violation because they represent the same attribute repeated rather than a proper relational structure. The fix is to create a separate ENROLLMENT table with one row per student-course pair, which scales to any number of courses per student.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT7-Q5 | **Bloom:** Apply

---

**Q6. 2NF: partial dependency**

*Short description: 2NF partial dependency*

A table has a composite primary key of (StudentID, DeliverableID) and also has a column DeliverableName. DeliverableName depends only on DeliverableID, not on the full composite key. According to Chapter 7, which normal form does this violate?

A. First Normal Form (1NF) — DeliverableName is not atomic
*Feedback: Incorrect — DeliverableName is a single atomic value. The issue is partial dependency, not atomicity.*

B. Second Normal Form (2NF) — DeliverableName is partially dependent on only part of the composite key (DeliverableID)  ← ✓ CORRECT
*Feedback: Correct — 2NF requires that every non-key column depends on the entire composite key, not just part of it. DeliverableName depends only on DeliverableID, not the full (StudentID, DeliverableID).*

C. Third Normal Form (3NF) — DeliverableName is transitively dependent through another column
*Feedback: Incorrect — this is a partial dependency (2NF), not a transitive dependency (3NF). DeliverableName depends directly on DeliverableID, not transitively through another non-key column.*

D. No violation — partial dependencies are acceptable in well-designed databases
*Feedback: Incorrect — 2NF explicitly requires that non-key attributes depend on the whole key, not just part of it.*

**Hint:** 2NF = non-key columns must depend on the WHOLE key, not just part of it.

**Explanation:** Chapter 7 defines 2NF as requiring that every non-key attribute be fully functionally dependent on the entire primary key. When the key is composite (StudentID, DeliverableID), a column like DeliverableName that depends only on DeliverableID violates 2NF. The fix is to move DeliverableName to a DELIVERABLE table where DeliverableID is the full primary key.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT7-Q6 | **Bloom:** Apply

---

**Q7. 3NF: transitive dependency**

*Short description: 3NF transitive dependency*

A STUDENT table has columns: StudentID (PK), StudentName, AdvisorID, AdvisorName, AdvisorOffice. AdvisorName and AdvisorOffice depend on AdvisorID, which is not part of the primary key. According to Chapter 7, which normal form does this violate?

A. First Normal Form (1NF) — AdvisorName is not atomic
*Feedback: Incorrect — the advisor columns are atomic. The issue is a transitive dependency, not atomicity.*

B. Second Normal Form (2NF) — the primary key is not composite
*Feedback: Incorrect — 2NF only applies to tables with composite keys. StudentID is a single-column primary key.*

C. Third Normal Form (3NF) — AdvisorName and AdvisorOffice depend on AdvisorID, which is not the key  ← ✓ CORRECT
*Feedback: Correct — 3NF requires that non-key columns depend on the key, the whole key, and nothing but the key. Advisor attributes depend on AdvisorID, not StudentID.*

D. No violation — storing advisor details in the student table is efficient and recommended
*Feedback: Incorrect — Chapter 7 identifies this as a transitive dependency, which violates 3NF. Advisor data should be in a separate ADVISOR table.*

**Hint:** 3NF = nothing but the key. Do AdvisorName and AdvisorOffice depend directly on StudentID?

**Explanation:** Chapter 7 defines 3NF as requiring that every non-key column depends directly on the primary key — not transitively through another non-key column. AdvisorName depends on AdvisorID, not StudentID. This transitive dependency violates 3NF. The fix is to create a separate ADVISOR table where AdvisorID is the primary key.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT7-Q7 | **Bloom:** Apply

---

**Q8. Junction table for M:M relationships**

*Short description: Junction table for M:M*

After normalization, a STUDENT table and a COURSE table need to represent which students are enrolled in which courses. According to Chapter 7, what is the normalized way to implement this many-to-many relationship?

A. Add a CourseID column to the STUDENT table containing a comma-separated list of course IDs
*Feedback: Incorrect — multi-valued cells violate 1NF. Comma-separated lists prevent SQL from reliably querying or enforcing integrity.*

B. Create an ENROLLMENT junction table with StudentID and CourseID as foreign keys, together forming a composite primary key  ← ✓ CORRECT
*Feedback: Correct — a junction table resolves M:M relationships into two 1:M relationships. Each enrollment row represents one student in one course.*

C. Duplicate the COURSE table for each student who enrolls
*Feedback: Incorrect — duplicating entire tables is extreme redundancy and violates all normal forms.*

D. Link the tables through a shared natural key like CourseName
*Feedback: Incorrect — natural keys like names can change and are not guaranteed unique. Foreign keys should reference stable primary keys.*

**Hint:** Many-to-many = three tables: the two entities plus a bridge table with foreign keys.

**Explanation:** Chapter 7 covers junction tables (also called associative or bridge tables) as the normalized solution for many-to-many relationships. The ENROLLMENT table contains foreign keys to both STUDENT and COURSE, with the pair forming a composite primary key. This resolves the M:M into two 1:M relationships while preserving full normalization.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT7-Q8 | **Bloom:** Apply

---

**Q9. Denormalization use case**

*Short description: Denormalization use case*

Chapter 7 discusses denormalization — intentionally introducing redundancy for performance. In which scenario would denormalization be most justified?

A. A database designer skips normalization because it seems too complex
*Feedback: Incorrect — Chapter 7 advocates normalizing first, then selectively denormalizing only when performance requires it. Skipping normalization is not denormalization.*

B. A reporting system that runs thousands of times per day joins the same six tables every time — storing a pre-joined summary table reduces query load  ← ✓ CORRECT
*Feedback: Correct — controlled denormalization for read-heavy reporting workloads can be justified when the performance benefit outweighs the redundancy risk.*

C. A table with 10 rows — normalization is unnecessary for small datasets
*Feedback: Incorrect — even small tables benefit from normalized design. The principles apply regardless of row count.*

D. A developer prefers seeing all data in one spreadsheet view
*Feedback: Incorrect — personal preference is not a justification for denormalization. The decision should be based on measured performance needs.*

**Hint:** Denormalization = intentional, controlled redundancy for performance, not laziness.

**Explanation:** Chapter 7 explains that denormalization is the intentional introduction of redundancy for performance reasons, typically in read-heavy environments like reporting systems. The key principle is normalize first, then denormalize selectively and only when measured performance requires it. Pre-joined summary tables for frequent reports are a classic justified use case.

**Points:** 1 | **Difficulty:** 4/5 | **ID:** BITM330-RAT7-Q9 | **Bloom:** Evaluate

---

**Q10. Over-normalization mistake**

*Short description: Over-normalization mistake*

A student normalizes a table and moves StudentName to a separate table with columns: StudentNameID (PK), StudentName. The original table now references StudentNameID. What normalization mistake has the student made?

A. No mistake — this is correct 2NF normalization
*Feedback: Incorrect — moving just the name (but not other student attributes) creates an unnecessary table. StudentName depends on StudentID, not the other way around.*

B. The student created an unnecessary table — StudentName depends on StudentID (the original key), so it should stay in the STUDENT table. Moving only the name creates an extra join with no redundancy benefit.  ← ✓ CORRECT
*Feedback: Correct — StudentName is directly dependent on StudentID. Moving it to a separate table doesn't reduce redundancy; it just forces an unnecessary join. This over-normalizes without solving a real dependency problem.*

C. The student should have also moved StudentEmail to the same table
*Feedback: Incorrect — the mistake is creating the name-only table at all, not which columns are in it.*

D. The student forgot to add a foreign key back to the original table
*Feedback: Incorrect — a foreign key exists (StudentNameID), but the entire table is unnecessary because StudentName properly belongs in the STUDENT table.*

**Hint:** Does moving StudentName to its own table actually reduce redundancy, or just add complexity?

**Explanation:** Chapter 7 warns against over-normalization — splitting tables when there is no real dependency violation to fix. StudentName is fully dependent on StudentID (the primary key), so it belongs in the STUDENT table. Creating a separate name table adds join complexity without solving any redundancy or anomaly problem. Normalization should fix real dependency issues, not arbitrarily split attributes.

**Points:** 1 | **Difficulty:** 4/5 | **ID:** BITM330-RAT7-Q10 | **Bloom:** Evaluate

---

## Quick-Reference Answer Key

| # | Type | Correct Answer(s) | Points | Difficulty | Bloom |
|---|------|-------------------|--------|------------|-------|
| 1 | MS   | A, C, D, E        | 2      | 3          | Understand |
| 2 | MS   | A, C, E           | 2      | 4          | Analyze |
| 3 | MC   | B                 | 1      | 2          | Understand |
| 4 | MC   | A                 | 1      | 3          | Apply |
| 5 | MC   | A                 | 1      | 3          | Apply |
| 6 | MC   | B                 | 1      | 3          | Apply |
| 7 | MC   | C                 | 1      | 3          | Apply |
| 8 | MC   | B                 | 1      | 3          | Apply |
| 9 | MC   | B                 | 1      | 4          | Evaluate |
| 10 | MC   | B                 | 1      | 4          | Evaluate |
