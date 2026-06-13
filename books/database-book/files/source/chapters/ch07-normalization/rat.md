<!-- metadata: date="2026-05-19" -->

# Readiness Assessment Test (RAT): Data Normalization

![RAT](https://res.cloudinary.com/dkndq6lyz/image/upload/w_200/f_auto/q_auto/RAT_big?_a=BAMAAAhK0)

> **Part of:** Chapter 7 -- *How a flat table becomes a reliable database by storing each fact once and linking it through keys*  
> **Main chapter file:** [ch07-main-edited-2026-05-18.md](../main/ch07-main-edited-2026-05-18.md)  
> **Let's Build file:** No current Chapter 7 Lets-Build file is present in this chapter folder.  
> **Key terms:** [ch07-terms-2026-05-05.md](../terms/ch07-terms-2026-05-05.md)

---

## Remember

**1. What does normalization try to accomplish in a relational database?**

A. Store each fact once so redundancy is reduced and integrity improves

B. Replace all joins with one large report-ready table

C. Make every table use only one column

D. Eliminate the need for primary and foreign keys

**2. Select ALL that apply: Which anomalies are named in Chapter 7 as predictable results of poor structure?**

A. Update anomaly

B. Insertion anomaly

C. Deletion anomaly

D. Formatting anomaly

E. Indexing anomaly

**3. In the notation `X -> Y`, what is `X` called?**

A. The dependent

B. The determinant

C. The foreign key

D. The lookup value

**4. Select ALL that apply: Which situations violate First Normal Form (1NF) in the chapter?**

A. A `Grades` cell that contains `90, 85, 88`

B. Columns named `Grade1`, `Grade2`, and `Grade3`

C. One grade stored per row in a single `Grade` column

D. A comma-separated list of dates stored in one cell

E. A single date value stored in one date field

**5. Which normal form is designed to remove partial dependencies?**

A. 1NF

B. 2NF

C. 3NF

D. BCNF

**6. Select ALL that apply: Which tools are identified in Chapter 7 as bridges between normalized storage and analytics-friendly presentation?**

A. JOINs

B. Views

C. CTEs

D. Surrogate keys

E. Dashboards built on reporting layers

**7. In the Chapter 7 grading example, which table stores the score earned by one student on one deliverable?**

A. `STUDENT`

B. `DELIVERABLE`

C. `STUDENT_GRADE`

D. `GRADE_SCALE`

**8. Select ALL that apply: Which are presented as intentional denormalization patterns in Chapter 7?**

A. Summary tables refreshed on a schedule

B. Materialized views

C. Cached totals such as a frequently displayed GPA

D. Repeating student email in every score row

E. Skipping normalization because joins take effort

---

## Understand

**9. Why do flat tables often feel simple to users at first?**

A. Because one row appears to hold the full story in a spreadsheet-like format

B. Because flat tables enforce referential integrity automatically

C. Because anomalies disappear when all facts are stored together

D. Because repeated values are easy for the DBMS to detect and fix

**10. Select ALL that apply: Why does Chapter 7 say the flat grading table fails as it grows?**

A. It mixes different kinds of facts in one structure

B. It repeats student and deliverable information across rows

C. It creates update, insertion, and deletion anomalies

D. It becomes invalid only because it lacks a dashboard

E. It treats unrelated changes as if they belong in the same row

**11. Why are the normal forms described as cumulative rather than optional?**

A. Because every table must satisfy all higher normal forms before 1NF

B. Because a table in 3NF has already satisfied 1NF and 2NF

C. Because 2NF and 3NF are competing alternatives chosen by user preference

D. Because only BCNF matters in business systems

**12. Select ALL that apply: What does the dependency `DeliverableID -> DueDate, DeliverableType, DeliverableNumber` tell a designer?**

A. Due date is a fact about the deliverable

B. Deliverable details belong together in a deliverable-focused table

C. Each student's grade row should store its own copy of the due date

D. Repeating deliverable facts in score rows is structurally suspect

E. `DeliverableID` works as the determinant for those attributes

**13. Why does Chapter 7 say a junction table is necessary in the grading design?**

A. Because scores are facts about the relationship between students and deliverables

B. Because a junction table removes the need for keys

C. Because every database must have exactly one junction table

D. Because deliverables can never have a primary key

**14. Select ALL that apply: Why does Chapter 7 treat 3NF as useful for business rules?**

A. It centralizes rules in one place

B. It reduces hidden duplication

C. It makes reports more consistent

D. It removes the need for lookups

E. It lowers the cost of changing rules later

**15. Why does Chapter 7 reject the claim that normalized data is bad for analysis?**

A. Because normalization eliminates the need for queries

B. Because storage design and presentation design solve different problems, and SQL bridges them

C. Because analysts should work only with raw transactional tables and never with views

D. Because denormalization is forbidden in all reporting systems

**16. Select ALL that apply: Which statements about the practical build in Access match the chapter?**

A. The Lookup Wizard can help users choose related values for foreign keys

B. The Lookup Wizard replaces actual relationship design

C. Referential integrity should still be defined explicitly

D. Setting `Indexed: No Duplicates` on `Email` can help enforce uniqueness

E. Access is described as a visual learning tool rather than the only valid platform

---

## Apply

**17. Alice changes her email address after three deliverables have already been graded. In the normalized design from Chapter 7, where should that change be made?**

A. In all three rows of `STUDENT_GRADE`

B. In one row of `STUDENT`

C. In `DELIVERABLE`

D. In `GRADE_SCALE`

**18. Select ALL that apply: A table keyed by `(StudentID, DeliverableID)` also stores `FirstName`, `LastName`, `DeliverableType`, and `Score`. Which attributes create the 2NF problem described in Chapter 7?**

A. `FirstName`

B. `LastName`

C. `DeliverableType`

D. `Score`

E. The composite key itself

**19. A grade table stores both `Score` and `LetterGrade`, where the letter grade is determined from score ranges. Which design problem is Chapter 7 describing?**

A. A 1NF violation caused by repeating columns

B. A 2NF violation caused by partial dependencies

C. A 3NF violation caused by a transitive dependency

D. A referential integrity failure

**20. Select ALL that apply: Which migration steps match the chapter's move from `GRADE_EXAMPLE` to a normalized design?**

A. Use `SELECT DISTINCT` to load unique student facts into `STUDENT`

B. Use `SELECT DISTINCT` to load unique deliverable facts into `DELIVERABLE`

C. Keep relationship facts such as score in `STUDENT_GRADE`

D. Resolve conflicting student emails before trusting the migration

E. Copy the entire flat table directly into `STUDENT`

**21. A table stores `Grade1`, `Grade2`, and `Grade3` as separate columns. What is the Chapter 7 fix?**

A. Rename the columns to `Quiz1`, `Quiz2`, and `Quiz3`

B. Store one grade per row in a single grade column

C. Add `Grade4` and `Grade5` in advance to make the table scalable

D. Replace the numeric grades with letter grades only

**22. Select ALL that apply: Which dependencies justify keeping attributes together in the same table?**

A. `StudentID -> FirstName, LastName, Email`

B. `DeliverableID -> DeliverableType, DeliverableNumber, DueDate`

C. `(StudentID, DeliverableID) -> Score`

D. `Score -> LetterGrade` inside the transaction table

E. `ZipCode -> City, State` inside a student table without a separate lookup

**23. After migrating student data, which result from `GROUP BY Email HAVING COUNT(*) > 1` indicates a clean load?**

A. One row per student

B. Zero rows returned

C. One row with the highest count only

D. At least one duplicate so the query proves data exists

**24. Select ALL that apply: According to Chapter 7, when might controlled denormalization be reasonable?**

A. When read performance is critical

B. When the data is queried far more often than it is updated

C. When the system is operating at very large scale

D. When a designer wants to avoid learning joins

E. When summary data can be refreshed or synchronized safely

---

## Analyze

**25. A designer splits data into two tables, `STUDENT` and `STUDENT_DETAILS`, but still stores `FirstName` and `LastName` redundantly in both. Which chapter idea best diagnoses the problem?**

A. Multiple tables automatically guarantee normalization

B. Normalization adds formal rules beyond simply using more than one table

C. Redundancy disappears whenever a DBMS is used instead of a spreadsheet

D. The design must already be in BCNF because there are two tables

**26. Select ALL that apply: Which categories of facts does Chapter 7 say are mixed together in the flat grading table?**

A. Student facts

B. Deliverable facts

C. Performance facts

D. Attendance facts

E. Server log facts

**27. Which question most directly tests for the 2NF issue in a composite-key table?**

A. Does every non-key attribute depend on the whole key?

B. Does the table have more than five columns?

C. Is there at least one surrogate key?

D. Does every value use the same font and format?

**28. Select ALL that apply: Which examples fit Chapter 7's explanation of a transitive dependency?**

A. `Score -> LetterGrade`

B. `ZipCode -> City, State`

C. `InstructorID -> InstructorEmail`

D. `(StudentID, DeliverableID) -> Score`

E. `StudentID -> Email`

**29. If a table is correctly in 3NF, what must also be true?**

A. It is also in 1NF and 2NF

B. It no longer needs primary keys

C. It contains only one table in the whole database

D. It cannot use lookup tables

**30. Select ALL that apply: Which statements show the chapter's separation of storage design and presentation design?**

A. Normalization belongs to storage design

B. Views and CTEs belong to presentation and reporting logic

C. One oversized table should serve both storage accuracy and dashboard convenience

D. Reports can recombine normalized tables without changing base storage

E. Pushing report convenience into base tables can create technical debt

**31. In the flat grading design, deleting the only row for a deliverable also erases its due date and point value. Which anomaly is this?**

A. Update anomaly

B. Insertion anomaly

C. Deletion anomaly

D. Sort anomaly

**32. Select ALL that apply: Which clues suggest a table is modeling a relationship rather than a single entity?**

A. The natural identifier is a composite key

B. The facts exist at the intersection of two entities

C. The table resolves a many-to-many relationship

D. The main non-key fact depends on both key parts together

E. Every non-key attribute depends on `StudentID` alone

---

## Evaluate

**33. Which design choice is most defensible if the grading policy changes often but historical scores must stay trustworthy?**

A. Store `LetterGrade` redundantly in every score row and update all rows each semester

B. Put grading ranges in a separate `GRADE_SCALE` table and look them up when needed

C. Keep the rules in a spreadsheet outside the database and trust users to check it manually

D. Store the rules in the `Email` field because it is unique

**34. Select ALL that apply: Which arguments best support using a normalized base schema even when a dashboard team wants faster reporting?**

A. It keeps one authoritative source of truth for core facts

B. It makes later summary layers more trustworthy

C. It allows business rules to be changed in one place

D. It makes joins unnecessary in every reporting workflow

E. It reduces the risk of stale duplicated values in metrics

**35. Which judgment best matches Chapter 7's advice about denormalization?**

A. Denormalize first and normalize only if problems appear later

B. Normalize first, then denormalize intentionally only when performance needs justify it

C. Avoid normalization entirely in systems that use dashboards

D. Denormalization and normalization are interchangeable design styles

**36. Select ALL that apply: A proposed `STUDENT_GRADE` table stores `Email`, `DueDate`, `Score`, and `LetterGrade` in every row. Which critiques are most defensible from Chapter 7?**

A. `Email` repeats a student fact that belongs in `STUDENT`

B. `DueDate` repeats a deliverable fact that belongs in `DELIVERABLE`

C. `LetterGrade` risks a transitive dependency if it is determined from score rules

D. The design increases the chance of update anomalies

E. The design is automatically correct because everything needed for a report is in one row

**37. If an instructor has only enough time to make one structural improvement to a fragile flat grading file, which choice best improves long-term integrity?**

A. Add more color formatting so repeated facts stand out visually

B. Separate student, deliverable, and score facts into related tables based on their determinants

C. Hide unused columns and keep all facts in one place

D. Replace all IDs with student names to make rows more readable

**38. Select ALL that apply: Which conditions from Chapter 7 justify performance-oriented denormalization most strongly?**

A. Read performance is critical

B. Queries vastly outnumber updates

C. The system operates at very large scale

D. Safeguards exist to keep duplicated values synchronized

E. The schema was never normalized in the first place

**39. Which judgment best reflects the chapter's treatment of the Access Lookup Wizard?**

A. It is a helpful interface aid, but it does not replace defining relationships and referential integrity

B. It makes normalization unnecessary in Access

C. It should be used instead of foreign keys

D. It is the only safe way to build tables

**40. Select ALL that apply: Why are verification queries an important final step after migration to a normalized design?**

A. They confirm that duplicate entity facts were consolidated correctly

B. They expose hidden data-quality conflicts that normalization forces into view

C. They help confirm one trustworthy version of the truth

D. They show whether implementation matches the intended design

E. They eliminate the need for primary keys and constraints

---

## Assessment Design Notes

- Primary source base: [ch07-main-edited-2026-05-18.md](../main/ch07-main-edited-2026-05-18.md)
- Secondary source base: [ch07-terms-2026-05-05.md](../terms/ch07-terms-2026-05-05.md)
- Current Chapter 7 Lets-Build file: none present in the chapter folder at the time of this update.
- AI-resistance strategies used: chapter-specific grading-database references, dependency reasoning, scenario traps around anomalies and denormalization, multi-answer discrimination, migration and verification logic, and platform-specific Access notes.

| Bloom Level | Target Count |
| --- | ---: |
| Remember | 8 |
| Understand | 8 |
| Apply | 8 |
| Analyze | 8 |
| Evaluate | 8 |

| Design Criterion | Target Count |
| --- | ---: |
| Application-based | 14 |
| Scenario-based | 12 |
| Definition-only | 14 |

| Design Criterion | Bloom Sections Used | Questions | Count |
| --- | --- | --- | ---: |
| Application-based | Apply, Analyze, Evaluate | 17-24, 25, 27, 30, 33-40 | 14 |
| Scenario-based | Understand, Apply, Analyze, Evaluate | 10, 12, 14-16, 17-24, 25, 28, 30-40 | 12 |
| Definition-only | Remember, Understand, Analyze | 1-9, 11, 13, 26, 29, 31-32 | 14 |

---

## Answer Key

**1. What does normalization try to accomplish in a relational database?**

Correct answer: A

Explanation: Section 7.1 defines normalization as organizing data so each fact is stored once, redundancy is reduced, and integrity improves.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This matches the chapter definition in Section 7.1. |
| B | No | The chapter argues against one giant report-ready table. |
| C | No | Normalization is about fact placement, not one-column tables. |
| D | No | Keys remain central in normalized design. |

**2. Select ALL that apply: Which anomalies are named in Chapter 7 as predictable results of poor structure?**

Correct answers: A, B, C

Explanation: Section 7.1.2 names update, insertion, and deletion anomalies as the recurring failures caused by poor table structure.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Update anomaly is explicitly named. |
| B | Yes | Insertion anomaly is explicitly named. |
| C | Yes | Deletion anomaly is explicitly named. |
| D | No | The chapter does not define a formatting anomaly. |
| E | No | Indexing anomaly is not one of the three anomalies discussed. |

**3. In the notation `X -> Y`, what is `X` called?**

Correct answer: B

Explanation: Section 7.2 states that the left side of the dependency is the determinant.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | The dependent is on the right side. |
| B | Yes | This is the chapter's term for the left side of the arrow. |
| C | No | A determinant is not automatically a foreign key. |
| D | No | Lookup value is not the formal term used in the chapter. |

**4. Select ALL that apply: Which situations violate First Normal Form (1NF) in the chapter?**

Correct answers: A, B, D

Explanation: Section 7.4 explains that multi-valued cells, repeating columns, and lists inside one cell violate 1NF.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | A bundled grades cell is the chapter's main 1NF violation example. |
| B | Yes | Repeating columns such as `Grade1`, `Grade2`, `Grade3` violate 1NF. |
| C | No | One grade per row is the fix, not the violation. |
| D | Yes | A comma-separated list of dates is still a multi-valued cell. |
| E | No | One atomic date value does not violate 1NF. |

**5. Which normal form is designed to remove partial dependencies?**

Correct answer: B

Explanation: Section 7.5 identifies 2NF as the stage that removes partial dependencies.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | 1NF handles atomic values and repeating groups. |
| B | Yes | 2NF removes attributes that depend on only part of a composite key. |
| C | No | 3NF removes transitive dependencies. |
| D | No | BCNF is discussed as a higher form, not the 2NF stage. |

**6. Select ALL that apply: Which tools are identified in Chapter 7 as bridges between normalized storage and analytics-friendly presentation?**

Correct answers: A, B, C, E

Explanation: Sections 7.8 and Key Concepts describe joins, views, CTEs, and reporting layers as bridges from normalized storage to analysis and decisions.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | JOINs reassemble normalized tables for analysis. |
| B | Yes | Views are explicitly named as bridges. |
| C | Yes | CTEs are explicitly named as bridges. |
| D | No | Surrogate keys support structure, not the analytics bridge itself. |
| E | Yes | Dashboards built on reporting layers are part of the chapter's storage-to-decisions pipeline. |

**7. In the Chapter 7 grading example, which table stores the score earned by one student on one deliverable?**

Correct answer: C

Explanation: Sections 7.2.2 and 7.5.3 place `Score` in `STUDENT_GRADE` because it depends on the student-deliverable combination.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `STUDENT` stores student facts such as name and email. |
| B | No | `DELIVERABLE` stores deliverable facts such as due date and type. |
| C | Yes | `STUDENT_GRADE` stores the relationship fact `Score`. |
| D | No | `GRADE_SCALE` stores lookup rules for letter-grade ranges. |

**8. Select ALL that apply: Which are presented as intentional denormalization patterns in Chapter 7?**

Correct answers: A, B, C

Explanation: Section 7.7.2 names summary tables, materialized views, and cached totals as examples of intentional denormalization.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Summary tables refreshed on a schedule are given as an example. |
| B | Yes | Materialized views are explicitly named. |
| C | Yes | Cached totals such as GPA are given as an example. |
| D | No | Repeating email in score rows is bad design, not intentional denormalization. |
| E | No | The chapter says denormalization comes after normalization, not instead of it. |

**9. Why do flat tables often feel simple to users at first?**

Correct answer: A

Explanation: Section 7.1.1 says each row seems to tell the whole story, which feels familiar to spreadsheet users.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is the chapter's explanation for the appeal of flat tables. |
| B | No | Flat tables do not automatically enforce referential integrity. |
| C | No | The anomalies are hidden, not eliminated. |
| D | No | The DBMS does not automatically fix repeated facts in a flat design. |

**10. Select ALL that apply: Why does Chapter 7 say the flat grading table fails as it grows?**

Correct answers: A, B, C, E

Explanation: Sections 7.1.1 and 7.1.2 explain that the table mixes different facts, repeats values, and creates anomalies because unrelated changes are forced into the same row.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | The chapter says the table mixes different kinds of facts. |
| B | Yes | Repetition of student and deliverable data is central to the problem. |
| C | Yes | Update, insertion, and deletion anomalies are named outcomes. |
| D | No | Dashboard absence is not the cause of failure. |
| E | Yes | One row is overloaded with unrelated facts. |

**11. Why are the normal forms described as cumulative rather than optional?**

Correct answer: B

Explanation: Section 7.3 states that a table in 3NF has already satisfied 1NF and 2NF.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | The sequence goes upward from 1NF, not downward. |
| B | Yes | This captures the chapter's cumulative model. |
| C | No | The chapter explicitly rejects treating them as alternatives. |
| D | No | BCNF is not the only form that matters in business systems. |

**12. Select ALL that apply: What does the dependency `DeliverableID -> DueDate, DeliverableType, DeliverableNumber` tell a designer?**

Correct answers: A, B, D, E

Explanation: Section 7.2.2 explains that these are deliverable facts determined by `DeliverableID`, so they belong together in `DELIVERABLE` and should not be repeated in score rows.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Due date is a deliverable fact. |
| B | Yes | The attributes belong in a deliverable-focused table. |
| C | No | The chapter argues against repeating due dates in each grade row. |
| D | Yes | Repetition of deliverable facts in score rows is exactly the design problem. |
| E | Yes | `DeliverableID` is the determinant for those attributes. |

**13. Why does Chapter 7 say a junction table is necessary in the grading design?**

Correct answer: A

Explanation: Section 7.5.4 says a score belongs to the relationship between one student and one deliverable, so the many-to-many relationship needs `STUDENT_GRADE`.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is the chapter's explanation for the junction table. |
| B | No | Junction tables still rely on keys. |
| C | No | Not every database has exactly one junction table. |
| D | No | Deliverables can still have primary keys. |

**14. Select ALL that apply: Why does Chapter 7 treat 3NF as useful for business rules?**

Correct answers: A, B, C, E

Explanation: Section 7.6.3 says 3NF centralizes rules, reduces hidden duplication, improves consistency, and lowers change costs.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Centralizing rules is a core benefit of 3NF. |
| B | Yes | Hidden duplication is reduced. |
| C | Yes | Reports become more consistent. |
| D | No | 3NF often relies on lookups rather than removing them. |
| E | Yes | The chapter explicitly ties 3NF to lower change cost. |

**15. Why does Chapter 7 reject the claim that normalized data is bad for analysis?**

Correct answer: B

Explanation: Section 7.8 says normalization serves storage correctness while presentation tools such as joins, views, and CTEs support analysis.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Queries are still necessary in normalized systems. |
| B | Yes | This is the chapter's central argument about storage versus presentation. |
| C | No | The chapter explicitly supports views and other presentation layers. |
| D | No | Denormalization is allowed in controlled cases. |

**16. Select ALL that apply: Which statements about the practical build in Access match the chapter?**

Correct answers: A, C, D, E

Explanation: Section 7.9.1 says the Lookup Wizard is a UI helper, referential integrity still matters, indexed uniqueness can help on email, and Access is a visual learning tool.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | The chapter says the Lookup Wizard can help beginners choose related values. |
| B | No | The chapter explicitly says it does not replace actual relationship design. |
| C | Yes | Relationships and referential integrity still need to be defined. |
| D | Yes | The email indexing note appears in the practical build guidance. |
| E | Yes | Access is framed as a visual learning tool rather than the only valid platform. |

**17. Alice changes her email address after three deliverables have already been graded. In the normalized design from Chapter 7, where should that change be made?**

Correct answer: B

Explanation: Sections 7.1.2 and 7.5.3 show that student facts belong in `STUDENT`, so one update there prevents repeated-row edits.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Updating all score rows repeats the flat-table problem. |
| B | Yes | Student email belongs in one row of `STUDENT`. |
| C | No | `DELIVERABLE` stores deliverable facts, not student email. |
| D | No | `GRADE_SCALE` stores grading rules, not student contact data. |

**18. Select ALL that apply: A table keyed by `(StudentID, DeliverableID)` also stores `FirstName`, `LastName`, `DeliverableType`, and `Score`. Which attributes create the 2NF problem described in Chapter 7?**

Correct answers: A, B, C

Explanation: Section 7.5.2 says `FirstName` and `LastName` depend only on `StudentID`, while `DeliverableType` depends only on `DeliverableID`. `Score` depends on the full key.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `FirstName` depends on only part of the key. |
| B | Yes | `LastName` depends on only part of the key. |
| C | Yes | `DeliverableType` depends on only part of the key. |
| D | No | `Score` belongs because it depends on the whole composite key. |
| E | No | The composite key is not the violation; the misplaced non-key attributes are. |

**19. A grade table stores both `Score` and `LetterGrade`, where the letter grade is determined from score ranges. Which design problem is Chapter 7 describing?**

Correct answer: C

Explanation: Section 7.6.1 identifies `Score -> LetterGrade` as a transitive dependency and therefore a 3NF issue.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | This is not about repeating columns or bundled cells. |
| B | No | The issue is not dependence on only part of a composite key. |
| C | Yes | The letter grade depends on another non-key attribute, `Score`. |
| D | No | Referential integrity concerns foreign key matching, not this rule dependency. |

**20. Select ALL that apply: Which migration steps match the chapter's move from `GRADE_EXAMPLE` to a normalized design?**

Correct answers: A, B, C, D

Explanation: Section 7.9.3 shows `SELECT DISTINCT` loads for entities, relationship facts into `STUDENT_GRADE`, and warns that conflicting values require data cleansing.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Student facts are extracted distinctly into `STUDENT`. |
| B | Yes | Deliverable facts are extracted distinctly into `DELIVERABLE`. |
| C | Yes | Relationship facts remain in `STUDENT_GRADE`. |
| D | Yes | The chapter explicitly warns that conflicts must be resolved before trusting the migration. |
| E | No | Copying the whole flat table into `STUDENT` would preserve the original structural problem. |

**21. A table stores `Grade1`, `Grade2`, and `Grade3` as separate columns. What is the Chapter 7 fix?**

Correct answer: B

Explanation: Section 7.4.2 says repeating columns should be replaced by one grade per row in a single column structure.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Renaming repeating columns does not fix the structural issue. |
| B | Yes | This is the chapter's 1NF-compliant fix. |
| C | No | Adding more repeating columns makes the problem worse. |
| D | No | Changing to letters does not solve the repeating-column problem. |

**22. Select ALL that apply: Which dependencies justify keeping attributes together in the same table?**

Correct answers: A, B, C

Explanation: Sections 7.2.2 and 7.2.3 say attributes sharing the same determinant belong together. `Score -> LetterGrade` and `ZipCode -> City, State` signal lookup or rule separation issues instead.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Student attributes share `StudentID` as their determinant. |
| B | Yes | Deliverable attributes share `DeliverableID` as their determinant. |
| C | Yes | Score belongs with the student-deliverable relationship because it depends on both. |
| D | No | This suggests a rule lookup, not keeping both in the transaction table. |
| E | No | This suggests a separate lookup or rule table rather than storage together in a student row. |

**23. After migrating student data, which result from `GROUP BY Email HAVING COUNT(*) > 1` indicates a clean load?**

Correct answer: B

Explanation: Section 7.9.3 says the expected result of the verification query is zero rows returned.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | The query is not designed to show one row per student. |
| B | Yes | Zero rows means no duplicate emails were found. |
| C | No | Returning one row would mean at least one duplicate exists. |
| D | No | Duplicates are a warning sign, not proof of a clean load. |

**24. Select ALL that apply: According to Chapter 7, when might controlled denormalization be reasonable?**

Correct answers: A, B, C, E

Explanation: Section 7.7.2 says denormalization may be justified when read performance is critical, queries far outnumber updates, systems are large scale, and summary or cached data can be synchronized safely.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Critical read performance is a named condition. |
| B | Yes | Read-heavy workloads are a named condition. |
| C | Yes | Very large scale is a named condition. |
| D | No | Avoiding joins is not a valid design reason in the chapter. |
| E | Yes | Safe synchronization is part of responsible denormalization. |

**25. A designer splits data into two tables, `STUDENT` and `STUDENT_DETAILS`, but still stores `FirstName` and `LastName` redundantly in both. Which chapter idea best diagnoses the problem?**

Correct answer: B

Explanation: Section 7.1.3 says multiple tables alone do not guarantee normalization. Formal dependency-based rules still matter.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | The chapter explicitly rejects this misconception. |
| B | Yes | This captures the chapter's point that normalization adds formal rules beyond table count. |
| C | No | DBMS use alone does not remove redundancy. |
| D | No | The presence of two tables does not imply BCNF. |

**26. Select ALL that apply: Which categories of facts does Chapter 7 say are mixed together in the flat grading table?**

Correct answers: A, B, C

Explanation: Section 7.1.1 identifies student facts, deliverable facts, and performance facts as the three categories mixed together.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Student facts are one named category. |
| B | Yes | Deliverable facts are one named category. |
| C | Yes | Performance facts are one named category. |
| D | No | Attendance is not part of the Chapter 7 flat grading table example. |
| E | No | Server log facts are unrelated to the chapter example. |

**27. Which question most directly tests for the 2NF issue in a composite-key table?**

Correct answer: A

Explanation: Section 7.5 frames the 2NF test as whether each non-key attribute depends on the whole composite key rather than only part of it.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is the exact diagnostic question 2NF requires. |
| B | No | Column count does not determine 2NF compliance. |
| C | No | A surrogate key is not the defining 2NF test. |
| D | No | Formatting is irrelevant to dependency structure. |

**28. Select ALL that apply: Which examples fit Chapter 7's explanation of a transitive dependency?**

Correct answers: A, B, C

Explanation: Section 7.6 explains transitive dependency as a non-key attribute depending on another non-key attribute; the chapter uses `Score -> LetterGrade` and gives similar business examples like `ZipCode -> City, State` and `InstructorID -> InstructorEmail`.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is the chapter's main grading example of transitive dependency. |
| B | Yes | This is given as a supporting business example. |
| C | Yes | This also fits the chapter's business examples. |
| D | No | This is a valid relationship fact, not a transitive dependency. |
| E | No | `StudentID -> Email` is a direct dependency that belongs in `STUDENT`. |

**29. If a table is correctly in 3NF, what must also be true?**

Correct answer: A

Explanation: Section 7.3 states that the normal forms are cumulative, so 3NF implies 1NF and 2NF are already satisfied.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This matches the chapter's cumulative progression rule. |
| B | No | Keys remain essential in 3NF. |
| C | No | 3NF says nothing about the number of tables in the full database. |
| D | No | Lookup tables are often part of a correct 3NF design. |

**30. Select ALL that apply: Which statements show the chapter's separation of storage design and presentation design?**

Correct answers: A, B, D, E

Explanation: Sections 7.7 and 7.8 distinguish storage design from presentation design and warn against forcing report convenience into base tables.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Normalization belongs to storage design. |
| B | Yes | Views and CTEs are presentation/reporting tools. |
| C | No | The chapter argues against one oversized table serving both concerns. |
| D | Yes | Reports can recombine normalized tables. |
| E | Yes | The chapter treats this mixing as a source of technical debt. |

**31. In the flat grading design, deleting the only row for a deliverable also erases its due date and point value. Which anomaly is this?**

Correct answer: C

Explanation: Section 7.1.2 defines deletion anomaly as deleting a row and unintentionally erasing unrelated facts.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Update anomaly involves repeated edits. |
| B | No | Insertion anomaly involves being unable to add something cleanly. |
| C | Yes | This is the chapter's deletion-anomaly pattern. |
| D | No | Sort anomaly is not a chapter concept. |

**32. Select ALL that apply: Which clues suggest a table is modeling a relationship rather than a single entity?**

Correct answers: A, B, C, D

Explanation: Section 7.5.1 and 7.5.4 show that composite keys, many-to-many resolution, and facts depending on both entities together are clues that the table models a relationship.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | A composite key often signals an intersection of entities. |
| B | Yes | Facts existing only at the intersection indicate a relationship table. |
| C | Yes | Junction tables resolve many-to-many relationships. |
| D | Yes | A fact depending on both key parts is relationship data. |
| E | No | Dependence on `StudentID` alone suggests an entity table, not a relationship table. |

**33. Which design choice is most defensible if the grading policy changes often but historical scores must stay trustworthy?**

Correct answer: B

Explanation: Section 7.6.2 says rule data such as grading ranges should live in a separate table like `GRADE_SCALE` so changes happen in one place.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Repeating and updating all score rows reintroduces the 3NF problem. |
| B | Yes | This centralizes rules while keeping score facts separate. |
| C | No | Manual spreadsheets outside the database weaken control and consistency. |
| D | No | `Email` has nothing to do with grading rules. |

**34. Select ALL that apply: Which arguments best support using a normalized base schema even when a dashboard team wants faster reporting?**

Correct answers: A, B, C, E

Explanation: Sections 7.7 and 7.8 argue that normalized base tables protect one source of truth, safer rule changes, and more trustworthy reporting, while summary layers can be added later.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | One authoritative source of truth is a core benefit. |
| B | Yes | Reliable base data makes later summary layers more trustworthy. |
| C | Yes | Centralized rules are easier to update safely. |
| D | No | Normalized design does not eliminate joins. |
| E | Yes | The chapter ties normalized storage to reduced stale duplication in analytics. |

**35. Which judgment best matches Chapter 7's advice about denormalization?**

Correct answer: B

Explanation: Section 7.7.2 says denormalization should be intentional and should follow normalization rather than replace it.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | The chapter rejects denormalization-first design. |
| B | Yes | This is the chapter's explicit rule of thumb. |
| C | No | Dashboards do not justify skipping normalization. |
| D | No | The chapter treats them as different steps with different purposes. |

**36. Select ALL that apply: A proposed `STUDENT_GRADE` table stores `Email`, `DueDate`, `Score`, and `LetterGrade` in every row. Which critiques are most defensible from Chapter 7?**

Correct answers: A, B, C, D

Explanation: The chapter's 2NF and 3NF sections show that email and due date belong with different determinants, letter grade risks a transitive dependency, and the whole design raises update-anomaly risk.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `Email` belongs in `STUDENT`, not repeated in every grade row. |
| B | Yes | `DueDate` belongs in `DELIVERABLE`, not repeated in every grade row. |
| C | Yes | `LetterGrade` determined by score rules is a 3NF concern. |
| D | Yes | Repeated facts and rules increase update risk. |
| E | No | Report convenience does not make the design structurally sound. |

**37. If an instructor has only enough time to make one structural improvement to a fragile flat grading file, which choice best improves long-term integrity?**

Correct answer: B

Explanation: The chapter's overall argument is that student, deliverable, and score facts should be separated according to their determinants and linked through keys.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Formatting may improve visibility but not structural integrity. |
| B | Yes | This is the chapter's core normalization move. |
| C | No | Hiding columns leaves the structural flaw in place. |
| D | No | Replacing IDs with names weakens identity and does not solve redundancy. |

**38. Select ALL that apply: Which conditions from Chapter 7 justify performance-oriented denormalization most strongly?**

Correct answers: A, B, C, D

Explanation: Section 7.7.2 names critical read performance, read-heavy workloads, very large scale, and synchronization safeguards as justification conditions.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is one of the chapter's direct justifications. |
| B | Yes | This is one of the chapter's direct justifications. |
| C | Yes | This is one of the chapter's direct justifications. |
| D | Yes | The chapter says safeguards are needed to keep duplicated values in sync. |
| E | No | Skipping normalization first is the opposite of the chapter's advice. |

**39. Which judgment best reflects the chapter's treatment of the Access Lookup Wizard?**

Correct answer: A

Explanation: Section 7.9.1 says the Lookup Wizard is a helpful UI aid but not a replacement for actual relationships and referential integrity.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is the chapter's exact framing. |
| B | No | The chapter says normalization still matters. |
| C | No | Foreign keys and relationships are still required. |
| D | No | The chapter does not present it as the only safe method. |

**40. Select ALL that apply: Why are verification queries an important final step after migration to a normalized design?**

Correct answers: A, B, C, D

Explanation: Section 7.9.3 says verification queries confirm duplicates were consolidated, reveal hidden data-quality conflicts, and help prove that implementation matches the intended trustworthy design.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | The duplicate-email query checks whether entity facts were consolidated correctly. |
| B | Yes | Conflicting values become visible during verification. |
| C | Yes | Verification supports the goal of one trustworthy version of the truth. |
| D | Yes | The chapter says normalization is complete only when implementation and verification support the design. |
| E | No | Verification queries do not replace keys or constraints. |

---

## Question Distribution Summary

### Bloom Level

| Bloom Level | Questions | Count |
| --- | --- | ---: |
| Remember | 1-8 | 8 |
| Understand | 9-16 | 8 |
| Apply | 17-24 | 8 |
| Analyze | 25-32 | 8 |
| Evaluate | 33-40 | 8 |

### Question Type

| Question Type | Questions | Count |
| --- | --- | ---: |
| Single-answer MC | 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39 | 20 |
| Select ALL | 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40 | 20 |

### Design Criterion

| Design Criterion | Questions | Count |
| --- | --- | ---: |
| Application-based | 17-24, 30, 33-40 | 16 |
| Scenario-based | 10, 12, 14-20, 24-25, 28, 30, 33-40 | 14 |
| Definition-only | 1-9, 11, 13, 21-23, 26-27, 29, 31-32 | 10 |
