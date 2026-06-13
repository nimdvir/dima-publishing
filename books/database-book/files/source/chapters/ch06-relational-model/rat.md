<!-- metadata: date="2026-05-19" -->

# Readiness Assessment Test (RAT): Chapter 6 - The Relational Model

![RAT](https://res.cloudinary.com/dkndq6lyz/image/upload/w_200/f_auto/q_auto/RAT_big?_a=BAMAAAhK0)

> **Part of:** Chapter 6 -- *How Connected Tables Create Structure, Integrity, and Analytical Power*  
> **Main chapter file:** [ch06-main-edited-2026-05-18.md](../main/ch06-main-edited-2026-05-18.md)  
> **Let's Build file:** [ch06-lets-build-2026-03-22.md](../lets-build/ch06-lets-build-2026-03-22.md)  
> **Key terms:** [ch06-terms-2026-03-22.md](../terms/ch06-terms-2026-03-22.md)

---

## Remember

**1. In the Chapter 6 grading schema, which table stores category-level grading rules such as quantity, points per type, and weight?**

A. `STUDENT`

B. `ASSIGNMENT_TYPE`

C. `DELIVERABLE`

D. `GRADE_SCALE`

**2. Select ALL that apply: Which attributes belong in `ASSIGNMENT_TYPE` in the chapter's revised schema?**

A. `AssignmentType`

B. `Quantity`

C. `PointsPerType`

D. `Score`

E. `Weight`

**3. Which table resolves the many-to-many relationship between students and deliverables in Chapter 6?**

A. `SCHEDULE`

B. `ATTENDANCE`

C. `STUDENT_GRADE`

D. `GRADE_SCALE`

**4. Select ALL that apply: Which of the following are foreign keys in the chapter's grading design?**

A. `STUDENT_GRADE.StudentID`

B. `STUDENT_GRADE.DeliverableID`

C. `ATTENDANCE.ClassNum`

D. `STUDENT.Email`

E. `DELIVERABLE.AssignmentType`

**5. Which relational term is the formal equivalent of a row?**

A. Attribute

B. Relation

C. Tuple

D. Domain

**6. Select ALL that apply: Which signs in the flat grading example show data redundancy?**

A. The same student email appears in multiple rows.

B. The same category weight appears in multiple rows.

C. Each row stores one score value.

D. The same deliverable details can repeat across student rows.

E. The final letter thresholds live in a separate lookup table.

**7. What role does `GRADE_SCALE` play in the revised Chapter 6 schema?**

A. It stores each raw score row before the score reaches `STUDENT_GRADE`.

B. It acts as a lookup or interpretation table after weighted averages are calculated.

C. It replaces `ASSIGNMENT_TYPE` for exams and projects.

D. It stores attendance codes for each class meeting.

**8. Select ALL that apply: Which chapter examples can function as natural keys in this bounded schema?**

A. `LetterGrade` in `GRADE_SCALE`

B. `AssignmentType` in `ASSIGNMENT_TYPE`

C. `GradeID` in `STUDENT_GRADE`

D. `StudentID` in `STUDENT`

E. `AttendanceID` in `ATTENDANCE`

## Understand

**9. Why does the chapter separate `ASSIGNMENT_TYPE` from `DELIVERABLE`?**

A. Because Access requires every table to have exactly three fields.

B. Because category rules and specific graded items are different kinds of facts.

C. Because `DELIVERABLE` is only used for attendance.

D. Because `ASSIGNMENT_TYPE` stores final letter grades.

**10. Select ALL that apply: How does referential integrity improve the grading database?**

A. It blocks a score row that points to a nonexistent student.

B. It blocks a deliverable row that references an assignment type that does not exist.

C. It guarantees that every score is academically fair.

D. It reduces orphaned records.

E. It automatically computes weighted averages.

**11. Why does the chapter say a surrogate primary key does not eliminate business-rule uniqueness?**

A. Because surrogate keys work only in SQL Server, not Access.

B. Because a table can still need unique combinations like `(StudentID, DeliverableID)` even when it has `GradeID`.

C. Because surrogate keys must always be paired with natural keys as composite primary keys.

D. Because surrogate keys are used only for temporary import tables.

**12. Select ALL that apply: Why does the chapter avoid showing a direct transactional relationship from `GRADE_SCALE` to `STUDENT_GRADE` in the ERD?**

A. `GRADE_SCALE` is used after aggregation and interpretation, not as the parent of each raw score row.

B. A raw score row can exist before any final letter-grade interpretation is applied.

C. Every score in `STUDENT_GRADE` must directly store a foreign key to `GRADE_SCALE`.

D. Drawing that line would overstate a dependency the schema does not actually use.

E. `GRADE_SCALE` stores assignment-type policy rather than final-grade policy.

**13. Why do JOINs become necessary in the chapter's relational design?**

A. Because normalized designs store related facts in separate tables that must be reconnected for reports.

B. Because a JOIN is the only way to enforce primary keys.

C. Because Access cannot display more than one table at a time.

D. Because foreign keys remove the need for relationships.

**14. Select ALL that apply: Which statements reflect the chapter's principle that tables should represent well-defined subjects?**

A. `STUDENT` should store one kind of fact: student identity.

B. `STUDENT_GRADE` should also store attendance notes for convenience.

C. `ATTENDANCE` should store attendance facts.

D. A table should avoid mixing multiple grains of data in one row.

E. Every table must describe only a physical person or object, never a relationship.

**15. Why is `SCHEDULE` kept separate from `ATTENDANCE` in the chapter's design?**

A. Because class meetings and attendance events are different subjects with different rows.

B. Because schedule data cannot be stored in Access.

C. Because `ATTENDANCE` should contain all course policy rules.

D. Because `SCHEDULE` is only a temporary import table.

**16. Select ALL that apply: What follows from the chapter's functional dependency example `AssignmentType -> Quantity, PointsPerType, Weight`?**

A. Those attributes belong together in `ASSIGNMENT_TYPE`.

B. Repeating those values inside every score row would create unnecessary redundancy.

C. The example previews the logic of normalization in the next chapter.

D. `AssignmentType` should be stored only in `STUDENT`.

E. Every deliverable of the same type must have the same due date.

## Apply

**17. An instructor changes the Homework weight from 25 to 20. Which table should be updated in the revised schema?**

A. `STUDENT`

B. `ASSIGNMENT_TYPE`

C. `STUDENT_GRADE`

D. `ATTENDANCE`

**18. Select ALL that apply: Which values normally belong in a new `STUDENT_GRADE` row?**

A. `StudentID`

B. `DeliverableID`

C. The student's score value

D. `Quantity`

E. `Weight`

**19. A report needs student name, deliverable title, assignment type, weight, and score. Which join path best fits the chapter's design?**

A. Join `STUDENT_GRADE` to `STUDENT` and `DELIVERABLE`, then join `DELIVERABLE` to `ASSIGNMENT_TYPE`.

B. Join `GRADE_SCALE` directly to `STUDENT` and ignore `DELIVERABLE`.

C. Join only `STUDENT` and `ATTENDANCE` because scores should already contain all other details.

D. Join `SCHEDULE` to `GRADE_SCALE` because both are lookup tables.

**20. Select ALL that apply: Which operations would likely be blocked by referential integrity?**

A. Inserting a `STUDENT_GRADE` row with a nonexistent `DeliverableID`

B. Deleting a `STUDENT` row that is still referenced by score rows

C. Updating `DELIVERABLE.AssignmentType` to a value not found in `ASSIGNMENT_TYPE`

D. Inserting a new `ASSIGNMENT_TYPE` row with a valid new category

E. Adding a student to `STUDENT` before any scores exist

**21. A registrar wants a student identifier that will remain stable even if names or emails change. Which key choice best matches the chapter's guidance?**

A. Use `StudentID` as a surrogate key.

B. Use student name as the primary key.

C. Use email as the primary key because it is easier to remember.

D. Use letter grade as the primary key.

**22. Select ALL that apply: Which fields from the flat grading example should be moved into `ASSIGNMENT_TYPE` rather than repeated in score rows?**

A. `AssignmentType`

B. `Quantity`

C. `PointsPerType`

D. `Weight`

E. `StudentEmail`

**23. Before any student submits Quiz 3, where should the new graded item be recorded?**

A. `STUDENT_GRADE`

B. `GRADE_SCALE`

C. `DELIVERABLE`

D. `ATTENDANCE`

**24. Select ALL that apply: Which design choices help enforce the rule that each student should have only one score per deliverable?**

A. Add a unique constraint on `(StudentID, DeliverableID)`.

B. Add form or application validation that blocks duplicate score entries.

C. Repeat student names in `STUDENT_GRADE` so duplicates are easier to spot visually.

D. Keep `StudentID` and `DeliverableID` as foreign keys in `STUDENT_GRADE`.

E. Use `DeliverableName` alone as the only key for the table.

## Analyze

**25. A department changes the Project weight, but only some rows in the flat table are updated. Which problem does this reveal most directly?**

A. Insertion anomaly

B. Update anomaly

C. Domain constraint

D. Outer join behavior

**26. Select ALL that apply: Which observations show that a single mega-table violates single responsibility in Chapter 6?**

A. One row stores student identity, deliverable details, and score results together.

B. The same assignment-type policy repeats across many rows.

C. One row may imply both a class meeting fact and a grading fact.

D. `GRADE_SCALE` exists as a separate table.

E. Different facts in the row change on different schedules.

**27. Which key strategy best balances simple row identity with business-rule protection in `STUDENT_GRADE`?**

A. Use only `StudentName` as the primary key.

B. Use only `DeliverableName` as the primary key.

C. Use surrogate `GradeID` as the primary key and also enforce uniqueness on `(StudentID, DeliverableID)`.

D. Remove keys and rely on sorting to detect duplicates.

**28. Select ALL that apply: Which tables are needed to reconstruct a report with student name, deliverable title, assignment-type weight, and score?**

A. `STUDENT`

B. `DELIVERABLE`

C. `ASSIGNMENT_TYPE`

D. `STUDENT_GRADE`

E. `SCHEDULE`

**29. If grade thresholds were copied into every score row instead of stored once in `GRADE_SCALE`, which structural problem would intensify?**

A. Update anomaly caused by duplicated policy values

B. Stronger normalization

C. Fewer joins with no trade-off

D. Better referential integrity enforcement

**30. Select ALL that apply: Which statements correctly compare transactional or event tables with lookup or reference tables in Chapter 6?**

A. `STUDENT_GRADE` records score results.

B. `GRADE_SCALE` interprets final numeric ranges.

C. `ASSIGNMENT_TYPE` stores category policy values.

D. `ATTENDANCE` is only a lookup table.

E. `GRADE_SCALE` is the direct parent of each raw score row.

**31. A team wants to delete a student's last score row but keep the student enrolled in the system. Which design handles that goal better?**

A. A flat table where student identity exists only inside score rows

B. A relational design where `STUDENT` is separate from `STUDENT_GRADE`

C. A design that stores all data in `GRADE_SCALE`

D. A design with no primary keys

**32. Select ALL that apply: Which comparisons between the flat model and the relational model are accurate in Chapter 6?**

A. The flat model can hide several different subjects inside one row.

B. The relational model uses keys and joins to reconnect separated facts.

C. The flat model automatically prevents orphaned references.

D. The relational model may use more tables but gives clearer responsibilities.

E. The relational model removes the need for queries.

## Evaluate

**33. An instructor adds a new category called Lab with its own quantity, points per type, and weight. What is the best schema-level response?**

A. Add a new row to `ASSIGNMENT_TYPE`, then create deliverables as needed.

B. Put the Lab weight directly into each student's score row.

C. Replace `DELIVERABLE` with `GRADE_SCALE`.

D. Store Lab only in `SCHEDULE`.

**34. Select ALL that apply: Which design choices best improve auditability and transparency in the chapter's grading database?**

A. Store assignment-type rules once in `ASSIGNMENT_TYPE`.

B. Keep final letter-grade thresholds in `GRADE_SCALE`.

C. Allow conflicting copies of weight values inside score rows.

D. Enforce relationships with primary keys and foreign keys.

E. Separate deliverables from score rows.

**35. Which judgment about `LetterGrade` as the primary key of `GRADE_SCALE` best matches the chapter's reasoning?**

A. It is unacceptable because every primary key must be numeric.

B. It is acceptable in this bounded design because the value is meaningful and unique in that table.

C. It is acceptable only if copied into every score row.

D. It is weaker than having no key at all.

**36. Select ALL that apply: Which proposed shortcuts should be rejected based on the chapter's design logic?**

A. Copy student email into every score row for convenience.

B. Store assignment-type weight on every `STUDENT_GRADE` row.

C. Merge `SCHEDULE` and `ATTENDANCE` just to reduce the number of tables.

D. Omit foreign keys because joins can reconnect rows later anyway.

E. Keep `ASSIGNMENT_TYPE` separate from `DELIVERABLE`.

**37. A coworker says, "Let's keep one mega-table because reporting will be easier." Which response best fits Chapter 6?**

A. Reporting becomes easier when all facts are duplicated in the same row.

B. Keep well-defined tables and use joins to reconstruct reports from cleaner underlying data.

C. Avoid queries by storing every possible report column in `STUDENT`.

D. Replace primary keys with descriptive text fields so reports look nicer.

**38. Select ALL that apply: Which checks should be made before enabling cascade delete in a relational grading database?**

A. Confirm that dependent rows should truly disappear with the parent row.

B. Understand the business meaning of the delete action.

C. Test the delete behavior on sample data first.

D. Assume cascade delete is always the safest default.

E. Verify whether audit or record-retention needs argue against cascade delete.

**39. Which evaluation of using student email as the primary key in `STUDENT` best matches the chapter's reasoning?**

A. It is ideal because emails never change.

B. It is risky because descriptive business values can change and are not always ideal stable identifiers.

C. It is required whenever a table contains personal data.

D. It is stronger than a surrogate key in every case.

**40. Select ALL that apply: Which teaching moves would best help spreadsheet-heavy learners understand the value of the relational model?**

A. Start with flat-table anomalies such as repeated emails and deletion risk.

B. Show the principle that one table should represent one well-defined subject.

C. Use the Access Relationships window to visualize keys and one-to-many links.

D. Promise that joins are unnecessary once a schema is normalized.

E. Connect cleaner structure to more trustworthy reporting.

## Assessment Design Notes

| Bloom Level | Target Count |
| --- | --- |
| Remember | 8 |
| Understand | 8 |
| Apply | 8 |
| Analyze | 8 |
| Evaluate | 8 |

| Design Criterion | Bloom Sections Used | Questions | Count |
| --- | --- | --- | --- |
| Application-based | Apply, Analyze, Evaluate | 17, 18, 19, 21, 22, 23, 24, 28, 31, 33, 34, 35, 38, 40 | 14 |
| Scenario-based | Remember, Understand, Apply, Analyze, Evaluate | 6, 14, 20, 25, 26, 27, 29, 30, 32, 36, 37, 39 | 12 |
| Definition-only | Remember, Understand | 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 15, 16 | 14 |

AI-resistance strategies used in this RAT:

1. Questions are grounded in the chapter's exact seven-table grading schema rather than generic database trivia.
2. Distractors reuse nearby Chapter 6 ideas, such as lookup tables, surrogate keys, and convenience-driven duplication.
3. Several items require reasoning about the chapter's flat-to-relational progression and its specific anomaly examples.
4. Multi-answer items force fine-grained discrimination among plausible options.
5. Join questions require reconstructing reports from the chapter's actual schema.
6. Access workflow details are included so students must connect abstract design to implementation.

## Answer Key

### Answer Key: Remember

**1. In the Chapter 6 grading schema, which table stores category-level grading rules such as quantity, points per type, and weight?**

Correct Answer: B

Explanation: Section reference: schema design and ERD discussion. The chapter explains that `ASSIGNMENT_TYPE` stores category-level policy values, including quantity, points per type, and weight, while `DELIVERABLE` stores specific assignments.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `STUDENT` stores student identity, not grading policy. |
| B | Yes | `ASSIGNMENT_TYPE` is the table for category-level rules. |
| C | No | `DELIVERABLE` stores specific graded items such as Quiz 1. |
| D | No | `GRADE_SCALE` interprets final numeric results into letter grades. |

**2. Select ALL that apply: Which attributes belong in `ASSIGNMENT_TYPE` in the chapter's revised schema?**

Correct Answers: A, B, C, E

Explanation: Section reference: flat-to-relational decomposition and functional dependency bridge. The chapter groups `AssignmentType`, `Quantity`, `PointsPerType`, and `Weight` together because those attributes are determined by assignment type.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `AssignmentType` identifies the category row. |
| B | Yes | `Quantity` is a category-level rule. |
| C | Yes | `PointsPerType` is also category-level policy. |
| D | No | A score belongs to a student's result, not the type definition. |
| E | Yes | `Weight` belongs to the assignment-type policy. |

**3. Which table resolves the many-to-many relationship between students and deliverables in Chapter 6?**

Correct Answer: C

Explanation: Section reference: relationship types and junction tables. The chapter states that `STUDENT_GRADE` acts as the junction table between `STUDENT` and `DELIVERABLE`.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `SCHEDULE` tracks class meetings. |
| B | No | `ATTENDANCE` records attendance events. |
| C | Yes | `STUDENT_GRADE` resolves the many-to-many relationship. |
| D | No | `GRADE_SCALE` is a lookup table for final-grade interpretation. |

**4. Select ALL that apply: Which of the following are foreign keys in the chapter's grading design?**

Correct Answers: A, B, C, E

Explanation: Section reference: primary keys, foreign keys, and relationships. The chapter uses foreign keys to connect related tables without copying descriptive data into every row.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `STUDENT_GRADE.StudentID` points to `STUDENT`. |
| B | Yes | `STUDENT_GRADE.DeliverableID` points to `DELIVERABLE`. |
| C | Yes | `ATTENDANCE.ClassNum` points to `SCHEDULE`. |
| D | No | `STUDENT.Email` is an attribute, not a foreign key in this design. |
| E | Yes | `DELIVERABLE.AssignmentType` points to `ASSIGNMENT_TYPE`. |

**5. Which relational term is the formal equivalent of a row?**

Correct Answer: C

Explanation: Section reference: characteristics of a formal relation. The chapter pairs relation/table, tuple/row, and attribute/column as equivalent terms.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | An attribute is a column. |
| B | No | A relation is a table. |
| C | Yes | A tuple is the formal term for a row. |
| D | No | A domain refers to the allowable set of values. |

**6. Select ALL that apply: Which signs in the flat grading example show data redundancy?**

Correct Answers: A, B, D

Explanation: Section reference: flat-table example and anomaly discussion. The chapter shows redundancy when repeated student details, repeated policy values, and repeated deliverable details appear across multiple rows.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Repeated emails are a direct redundancy example. |
| B | Yes | Repeated weights show policy duplication. |
| C | No | One score per row is not the redundancy problem by itself. |
| D | Yes | Repeated deliverable details across multiple students are redundant. |
| E | No | A separate lookup table reduces duplication rather than showing it. |

**7. What role does `GRADE_SCALE` play in the revised Chapter 6 schema?**

Correct Answer: B

Explanation: Section reference: seven-table schema and ERD clarification. The chapter reframes `GRADE_SCALE` as a lookup or interpretation table used after weighted averages are aggregated.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Raw scores live in `STUDENT_GRADE`, not `GRADE_SCALE`. |
| B | Yes | This is the chapter's explicit framing for `GRADE_SCALE`. |
| C | No | `GRADE_SCALE` does not replace assignment-type policy. |
| D | No | Attendance codes belong to attendance logic, not grade-scale thresholds. |

**8. Select ALL that apply: Which chapter examples can function as natural keys in this bounded schema?**

Correct Answers: A, B

Explanation: Section reference: natural keys versus surrogate keys. The chapter treats `LetterGrade` and `AssignmentType` as reasonable natural keys in bounded, stable contexts, while `GradeID`, `StudentID`, and `AttendanceID` are surrogate identifiers.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `LetterGrade` is meaningful and unique within `GRADE_SCALE`. |
| B | Yes | `AssignmentType` is meaningful and unique within `ASSIGNMENT_TYPE`. |
| C | No | `GradeID` is a surrogate key. |
| D | No | `StudentID` is treated as a surrogate key in the chapter. |
| E | No | `AttendanceID` is also a surrogate key. |

### Answer Key: Understand

**9. Why does the chapter separate `ASSIGNMENT_TYPE` from `DELIVERABLE`?**

Correct Answer: B

Explanation: Section reference: decomposition from flat file to relational structure. The chapter separates the tables because category rules and specific graded items are different subjects and should not be stored at the same grain.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | The separation is conceptual, not an Access limitation. |
| B | Yes | The two tables store different kinds of facts. |
| C | No | `DELIVERABLE` is part of grading, not attendance. |
| D | No | Final letter grades belong to `GRADE_SCALE`. |

**10. Select ALL that apply: How does referential integrity improve the grading database?**

Correct Answers: A, B, D

Explanation: Section reference: referential integrity. The chapter states that every non-null foreign key must match an existing referenced key, which blocks invalid references and reduces orphaned records.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Invalid student references should be blocked. |
| B | Yes | Invalid assignment-type references should also be blocked. |
| C | No | Referential integrity does not judge academic fairness. |
| D | Yes | Preventing broken links reduces orphaned records. |
| E | No | Weighted averages are computed by logic or queries, not RI rules. |

**11. Why does the chapter say a surrogate primary key does not eliminate business-rule uniqueness?**

Correct Answer: B

Explanation: Section reference: keys and business-rule uniqueness. The chapter explicitly distinguishes a surrogate key such as `GradeID` from a separate rule that `(StudentID, DeliverableID)` should remain unique.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | The issue is design logic, not DBMS compatibility. |
| B | Yes | This is the chapter's specific example. |
| C | No | Surrogate keys do not require composite primary keys. |
| D | No | Surrogate keys are not limited to temporary tables. |

**12. Select ALL that apply: Why does the chapter avoid showing a direct transactional relationship from `GRADE_SCALE` to `STUDENT_GRADE` in the ERD?**

Correct Answers: A, B, D

Explanation: Section reference: ERD precision revision. The chapter clarifies that `GRADE_SCALE` is applied after aggregation and that showing a direct parent-child line to raw score rows would imply a dependency the design does not use.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `GRADE_SCALE` is an interpretation layer, not a raw-score parent. |
| B | Yes | Score rows can exist before final grade interpretation. |
| C | No | The chapter explicitly avoids implying this direct foreign key. |
| D | Yes | That line would misrepresent the design. |
| E | No | Assignment-type policy belongs to `ASSIGNMENT_TYPE`. |

**13. Why do JOINs become necessary in the chapter's relational design?**

Correct Answer: A

Explanation: Section reference: JOIN explanation and reporting logic. The chapter explains that once facts are stored once in separate tables, joins reconstruct the exact report view needed for analysis.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This is the central reason joins are needed. |
| B | No | Primary keys are enforced without using joins. |
| C | No | Access can work with multiple related tables. |
| D | No | Foreign keys create relationships; they do not remove the need for joins. |

**14. Select ALL that apply: Which statements reflect the chapter's principle that tables should represent well-defined subjects?**

Correct Answers: A, C, D

Explanation: Section reference: relational principles and single responsibility. The chapter argues that each table should represent one well-defined subject and avoid mixing multiple grains or topics in a single row.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `STUDENT` should contain student identity facts. |
| B | No | Attendance notes do not belong inside `STUDENT_GRADE`. |
| C | Yes | `ATTENDANCE` should store attendance facts. |
| D | Yes | Avoiding mixed grain is part of the chapter's argument. |
| E | No | Relationship and event tables are valid parts of relational design. |

**15. Why is `SCHEDULE` kept separate from `ATTENDANCE` in the chapter's design?**

Correct Answer: A

Explanation: Section reference: schedule and attendance decomposition. The chapter treats class meetings and each student's attendance at those meetings as different subjects that should be stored separately.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | The tables represent related but different kinds of facts. |
| B | No | Access can store both kinds of data. |
| C | No | Attendance is not course policy. |
| D | No | `SCHEDULE` is not presented as temporary. |

**16. Select ALL that apply: What follows from the chapter's functional dependency example `AssignmentType -> Quantity, PointsPerType, Weight`?**

Correct Answers: A, B, C

Explanation: Section reference: functional dependency bridge to Chapter 7. The chapter uses this dependency to show why those attributes belong in `ASSIGNMENT_TYPE` and how this logic previews normalization.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | The determinant and dependent values belong together. |
| B | Yes | Repeating them elsewhere would create redundancy. |
| C | Yes | The example is the chapter's preview of normalization logic. |
| D | No | `AssignmentType` does not belong only in `STUDENT`. |
| E | No | Due dates belong to specific deliverables, not the assignment type itself. |

### Answer Key: Apply

**17. An instructor changes the Homework weight from 25 to 20. Which table should be updated in the revised schema?**

Correct Answer: B

Explanation: Section reference: `ASSIGNMENT_TYPE` and policy storage. The chapter stores category-level weights once in `ASSIGNMENT_TYPE`, so that is the correct table to update.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `STUDENT` stores student facts. |
| B | Yes | Homework weight is a category-level rule. |
| C | No | `STUDENT_GRADE` stores individual results, not category policy. |
| D | No | `ATTENDANCE` is unrelated to assignment weight. |

**18. Select ALL that apply: Which values normally belong in a new `STUDENT_GRADE` row?**

Correct Answers: A, B, C

Explanation: Section reference: scoring table and junction-table logic. The chapter describes `STUDENT_GRADE` as one student's result on one deliverable, so the row needs student, deliverable, and score information rather than repeated category-policy values.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | The score must identify the student. |
| B | Yes | The row must identify the deliverable. |
| C | Yes | The row stores the student's result. |
| D | No | `Quantity` belongs in `ASSIGNMENT_TYPE`. |
| E | No | `Weight` also belongs in `ASSIGNMENT_TYPE`. |

**19. A report needs student name, deliverable title, assignment type, weight, and score. Which join path best fits the chapter's design?**

Correct Answer: A

Explanation: Section reference: JOIN example. The chapter shows that score rows connect to students and deliverables, and deliverables connect to assignment types for category-level policy values.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This path reconstructs the report from the relevant tables. |
| B | No | `GRADE_SCALE` is not the source of raw score detail. |
| C | No | Attendance does not replace deliverable and assignment-type data. |
| D | No | `SCHEDULE` is unrelated to the requested report. |

**20. Select ALL that apply: Which operations would likely be blocked by referential integrity?**

Correct Answers: A, B, C

Explanation: Section reference: referential integrity and Access relationships. The chapter explains that invalid foreign-key references and unsafe deletes can be blocked when integrity is enforced.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | A score row cannot point to a missing deliverable. |
| B | Yes | Deleting a referenced student would strand dependent rows. |
| C | Yes | A deliverable cannot reference a missing assignment type. |
| D | No | Adding a valid new parent row is allowed. |
| E | No | A student can exist before scores are entered. |

**21. A registrar wants a student identifier that will remain stable even if names or emails change. Which key choice best matches the chapter's guidance?**

Correct Answer: A

Explanation: Section reference: surrogate keys. The chapter prefers surrogate identifiers such as `StudentID` when descriptive business values may change.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `StudentID` is stable even if descriptive values change. |
| B | No | Names are not reliable unique identifiers. |
| C | No | Emails may change and are not always ideal keys. |
| D | No | Letter grade does not identify a student. |

**22. Select ALL that apply: Which fields from the flat grading example should be moved into `ASSIGNMENT_TYPE` rather than repeated in score rows?**

Correct Answers: A, B, C, D

Explanation: Section reference: decomposition table and schema revision. The chapter moves assignment-type policy values out of flat rows and into `ASSIGNMENT_TYPE` so they are stored once.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `AssignmentType` identifies the policy category. |
| B | Yes | `Quantity` belongs with assignment type. |
| C | Yes | `PointsPerType` also belongs there. |
| D | Yes | `Weight` belongs there too. |
| E | No | `StudentEmail` belongs in `STUDENT`. |

**23. Before any student submits Quiz 3, where should the new graded item be recorded?**

Correct Answer: C

Explanation: Section reference: deliverables versus score rows. The chapter treats a specific graded item such as Quiz 3 as a deliverable that can exist before any student scores are entered.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | `STUDENT_GRADE` is for actual student results. |
| B | No | `GRADE_SCALE` is unrelated to creating a new quiz. |
| C | Yes | `DELIVERABLE` stores specific graded items. |
| D | No | `ATTENDANCE` stores attendance records. |

**24. Select ALL that apply: Which design choices help enforce the rule that each student should have only one score per deliverable?**

Correct Answers: A, B, D

Explanation: Section reference: surrogate keys and business-rule uniqueness. The chapter's logic supports a separate uniqueness rule on `(StudentID, DeliverableID)`, along with the foreign keys and practical validation that keep score entries consistent.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | A composite uniqueness rule directly enforces the business rule. |
| B | Yes | Validation can help prevent duplicate entry attempts. |
| C | No | Repeating names increases redundancy rather than enforcing the rule. |
| D | Yes | The foreign keys are part of the structural design that ties the row to the correct entities. |
| E | No | `DeliverableName` alone cannot identify one student's unique score row. |

### Answer Key: Analyze

**25. A department changes the Project weight, but only some rows in the flat table are updated. Which problem does this reveal most directly?**

Correct Answer: B

Explanation: Section reference: anomalies. The chapter uses repeated policy values to illustrate update anomalies, where one fact must be changed in many places and inconsistencies appear when some rows are missed.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Insertion anomaly is about being unable to add a fact cleanly. |
| B | Yes | This is the chapter's update-anomaly pattern. |
| C | No | A domain constraint is a different concept. |
| D | No | Outer join behavior is unrelated. |

**26. Select ALL that apply: Which observations show that a single mega-table violates single responsibility in Chapter 6?**

Correct Answers: A, B, C, E

Explanation: Section reference: single responsibility and decomposition. The chapter argues that overloaded rows mix facts that belong to different subjects and change on different schedules, which is why decomposition is needed.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | One row mixes identity, deliverable, and score facts. |
| B | Yes | Repeated policy values show the table is carrying too much. |
| C | Yes | The row can blend different event types. |
| D | No | The existence of another table does not itself prove a violation. |
| E | Yes | Different update rhythms are a sign the row contains multiple subjects. |

**27. Which key strategy best balances simple row identity with business-rule protection in `STUDENT_GRADE`?**

Correct Answer: C

Explanation: Section reference: key strategy around `STUDENT_GRADE`. The chapter keeps surrogate `GradeID` for row identity while also preserving the business-rule uniqueness of `(StudentID, DeliverableID)`.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Student names are unstable and not unique enough. |
| B | No | Deliverable name alone cannot identify one student's result. |
| C | Yes | This matches the chapter's revised key logic. |
| D | No | Keys cannot be replaced by sorting. |

**28. Select ALL that apply: Which tables are needed to reconstruct a report with student name, deliverable title, assignment-type weight, and score?**

Correct Answers: A, B, C, D

Explanation: Section reference: JOIN example and report reconstruction. The report requires the student table, the score table, the deliverable table, and the assignment-type table.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Needed for student name. |
| B | Yes | Needed for deliverable title. |
| C | Yes | Needed for assignment-type weight. |
| D | Yes | Needed for the score result. |
| E | No | `SCHEDULE` is not needed for this report. |

**29. If grade thresholds were copied into every score row instead of stored once in `GRADE_SCALE`, which structural problem would intensify?**

Correct Answer: A

Explanation: Section reference: lookup-table logic and policy separation. Duplicating grade thresholds across many rows would create policy redundancy and make threshold changes vulnerable to update anomalies.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Duplicated policy values create update-risk. |
| B | No | Copying values around weakens normalization. |
| C | No | Fewer joins would come at the cost of poorer structure. |
| D | No | Referential integrity does not improve from that duplication. |

**30. Select ALL that apply: Which statements correctly compare transactional or event tables with lookup or reference tables in Chapter 6?**

Correct Answers: A, B, C

Explanation: Section reference: schema responsibilities. The chapter treats `STUDENT_GRADE` as a results table, `GRADE_SCALE` as a lookup or interpretation table, and `ASSIGNMENT_TYPE` as the place for policy values.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | `STUDENT_GRADE` stores scoring events or outcomes. |
| B | Yes | `GRADE_SCALE` interprets final numeric ranges. |
| C | Yes | `ASSIGNMENT_TYPE` stores category rules. |
| D | No | `ATTENDANCE` records events, not a simple lookup. |
| E | No | The chapter explicitly avoids this direct-parent framing. |

**31. A team wants to delete a student's last score row but keep the student enrolled in the system. Which design handles that goal better?**

Correct Answer: B

Explanation: Section reference: deletion anomaly and decomposition. The relational design keeps student identity in `STUDENT`, so deleting a score row does not erase the student's existence.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | That design risks a deletion anomaly. |
| B | Yes | Separate tables preserve the student record. |
| C | No | `GRADE_SCALE` is unrelated to enrollment storage. |
| D | No | Removing keys weakens structure further. |

**32. Select ALL that apply: Which comparisons between the flat model and the relational model are accurate in Chapter 6?**

Correct Answers: A, B, D

Explanation: Section reference: flat versus relational comparison. The chapter presents the relational model as using more clearly defined tables, keys, and joins to replace duplication with structured relationships.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | One flat row can hide several subjects at once. |
| B | Yes | Keys and joins reconnect facts for reporting. |
| C | No | Flat models do not automatically enforce foreign-key logic. |
| D | Yes | More tables can mean clearer responsibilities. |
| E | No | Queries remain essential in a relational design. |

### Answer Key: Evaluate

**33. An instructor adds a new category called Lab with its own quantity, points per type, and weight. What is the best schema-level response?**

Correct Answer: A

Explanation: Section reference: schema extensibility and assignment-type logic. The chapter's design supports growth by adding a new row to `ASSIGNMENT_TYPE` and then creating any needed deliverables.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | This extends the schema without duplicating policy values. |
| B | No | Putting policy values into score rows recreates redundancy. |
| C | No | `GRADE_SCALE` is not a substitute for deliverables. |
| D | No | `SCHEDULE` does not define assignment categories. |

**34. Select ALL that apply: Which design choices best improve auditability and transparency in the chapter's grading database?**

Correct Answers: A, B, D, E

Explanation: Section reference: policy visibility and trustworthy reporting. The chapter values storing rules once, keeping thresholds visible, separating deliverables from results, and enforcing keys so reports remain credible and explainable.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | One stored copy of policy is easier to audit. |
| B | Yes | Thresholds become visible and maintainable. |
| C | No | Conflicting copies reduce transparency. |
| D | Yes | Enforced keys make relationships reliable. |
| E | Yes | Separating deliverables from scores clarifies what each row means. |

**35. Which judgment about `LetterGrade` as the primary key of `GRADE_SCALE` best matches the chapter's reasoning?**

Correct Answer: B

Explanation: Section reference: natural keys. The chapter allows natural keys when the value is meaningful, stable, and unique enough within a bounded table like `GRADE_SCALE`.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Primary keys do not have to be numeric. |
| B | Yes | This matches the chapter's bounded natural-key reasoning. |
| C | No | Copying it into every score row is not required. |
| D | No | A meaningful bounded key is stronger than no key. |

**36. Select ALL that apply: Which proposed shortcuts should be rejected based on the chapter's design logic?**

Correct Answers: A, B, C, D

Explanation: Section reference: redundancy, decomposition, and foreign keys. The chapter repeatedly rejects convenience-driven duplication and missing relationships because they weaken integrity and clarity.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Repeating email values recreates update-anomaly risk. |
| B | Yes | Repeating weight values in score rows recreates policy redundancy. |
| C | Yes | Merging unrelated subjects just to reduce table count weakens structure. |
| D | Yes | Foreign keys are essential to trustworthy relationships. |
| E | No | Keeping those tables separate follows the chapter's logic. |

**37. A coworker says, "Let's keep one mega-table because reporting will be easier." Which response best fits Chapter 6?**

Correct Answer: B

Explanation: Section reference: joins and trustworthy reporting. The chapter argues that cleaner underlying storage matters more than report convenience in the base table, because joins can reconstruct reports from well-structured data.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Duplication may look convenient but creates contradictions. |
| B | Yes | This is the chapter's core trade-off. |
| C | No | Overloading `STUDENT` would not solve the structural problem. |
| D | No | Descriptive text fields are not better identifiers for this purpose. |

**38. Select ALL that apply: Which checks should be made before enabling cascade delete in a relational grading database?**

Correct Answers: A, B, C, E

Explanation: Section reference: referential actions and delete caution. The chapter presents cascade behavior as something that must match the business meaning of the relationship rather than a default to enable automatically.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Cascade should be used only when dependent rows should truly disappear. |
| B | Yes | The meaning of the delete must be understood first. |
| C | Yes | Testing prevents accidental data loss. |
| D | No | Cascade delete is not always safest. |
| E | Yes | Audit needs may argue for preserving history instead. |

**39. Which evaluation of using student email as the primary key in `STUDENT` best matches the chapter's reasoning?**

Correct Answer: B

Explanation: Section reference: surrogate keys and stable identifiers. The chapter warns that descriptive values such as emails can change and are not always the best stable identifier for relational design.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | No | Emails can change. |
| B | Yes | This is exactly why the chapter favors a surrogate `StudentID`. |
| C | No | Personal data does not have to be the primary key. |
| D | No | The chapter does not say descriptive keys are always stronger. |

**40. Select ALL that apply: Which teaching moves would best help spreadsheet-heavy learners understand the value of the relational model?**

Correct Answers: A, B, C, E

Explanation: Section reference: chapter examples and Access implementation. The chapter's strongest teaching path starts with concrete anomalies, then shows one-subject-per-table design, visual relationships, and the reporting benefits of cleaner structure.

| Option | Correct? | Reasoning |
| --- | --- | --- |
| A | Yes | Concrete anomaly examples make the problem visible. |
| B | Yes | The one-subject principle captures the structural shift clearly. |
| C | Yes | Visual relationship tools help students see keys and links. |
| D | No | Normalization does not remove the need for joins. |
| E | Yes | Trustworthy reporting is one of the chapter's core outcomes. |

## Question Distribution Summary

### Bloom Level

| Bloom Level | Questions | Count |
| --- | --- | --- |
| Remember | 1, 2, 3, 4, 5, 6, 7, 8 | 8 |
| Understand | 9, 10, 11, 12, 13, 14, 15, 16 | 8 |
| Apply | 17, 18, 19, 20, 21, 22, 23, 24 | 8 |
| Analyze | 25, 26, 27, 28, 29, 30, 31, 32 | 8 |
| Evaluate | 33, 34, 35, 36, 37, 38, 39, 40 | 8 |

### Question Type

| Question Type | Questions | Count |
| --- | --- | --- |
| Single-answer MC | 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39 | 20 |
| Select ALL | 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40 | 20 |

### Design Criterion

| Design Criterion | Questions | Count |
| --- | --- | --- |
| Application-based | 17, 18, 19, 21, 22, 23, 24, 28, 31, 33, 34, 35, 38, 40 | 14 |
| Scenario-based | 6, 14, 20, 25, 26, 27, 29, 30, 32, 36, 37, 39 | 12 |
| Definition-only | 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 15, 16 | 14 |
