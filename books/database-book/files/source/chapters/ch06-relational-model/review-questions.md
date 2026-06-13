<!-- markdownlint-disable MD025 MD041 MD003 MD022 MD007 MD032 -->
<!-- metadata: date="2026-03-22" -->

# Chapter 6: Review and Reflection

![Reflection GIF](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/review_cncyn6?_a=BAMAAAiu0)

*Pause, review, and think more deeply about how relational structure turns scattered grading facts into a coherent system.*

## Review Questions

*These questions help you review the chapter's main ideas, terms, frameworks, and examples.*

1. Why does the chapter argue that a flat grading table becomes unreliable as requirements grow?
2. What is the difference between an entity, a relation, and a relationship table in this chapter's schema?
3. Why does the chapter separate `ASSIGNMENT_TYPE` from `DELIVERABLE`?
4. How do primary keys and foreign keys work together in the seven-table grading design?
5. Why is `STUDENT_GRADE` described as a junction table?
6. What does referential integrity protect in the grading database?
7. Why can surrogate primary keys and business-rule uniqueness constraints exist at the same time?
8. How does the chapter use functional dependency to preview normalization in Chapter 7?

## Reflection Questions

*These questions encourage you to interpret the chapter, connect ideas, and think critically about how they apply in practice.*

1. Why is `ASSIGNMENT_TYPE` a stronger teaching choice than naming the category-rules table `WEIGHT`?
2. What does the chapter suggest about the risks of treating every table as if it were only an entity table?
3. Why is it useful to describe `GRADE_SCALE` as a lookup or interpretation table instead of a normal transactional parent?
4. How does the move from one flat row to several related tables improve the credibility of reports?
5. When might a natural key be a good design choice, and when is a surrogate key safer?
6. Why do JOINs become necessary in a relational design rather than feeling like an optional advanced technique?

## Personal Reflection Questions

*These questions help you connect the chapter to your own habits, goals, strengths, and developing professional skills.*

1. Where have you seen duplicated data create confusion or inconsistency in your own work, school, or daily life?
2. Which anomaly from the chapter, update, insertion, or deletion, feels most dangerous to you, and why?
3. Which Chapter 6 concept still feels least intuitive to you: keys, referential integrity, junction tables, or functional dependency?
4. If you had to explain the relational model to a spreadsheet-heavy coworker or classmate, what example from this chapter would you use first?
5. How might this chapter change the way you design a spreadsheet, form, or tracking system in the future?
6. What habit do you want to build so you notice structural problems in data earlier instead of after errors appear?

## Answer Key

### Review

**Question 1: Why does the chapter argue that a flat grading table becomes unreliable as requirements grow?**
Suggested Answer: The chapter argues that a flat table becomes unreliable because it mixes several subjects at once, including student identity, assignment-type rules, deliverable details, and score outcomes. As those facts repeat across rows, the design creates data redundancy and leads to update, insertion, and deletion anomalies.

**Question 2: What is the difference between an entity, a relation, and a relationship table in this chapter's schema?**
Suggested Answer: An entity is the real-world thing being modeled, such as a student or a class session. A relation is the table structure used to represent one well-defined subject. A relationship table, such as `STUDENT_GRADE`, represents connections between subjects rather than storing one standalone entity by itself.

**Question 3: Why does the chapter separate `ASSIGNMENT_TYPE` from `DELIVERABLE`?**
Suggested Answer: The chapter separates them because they store different kinds of facts. `ASSIGNMENT_TYPE` holds category-level grading rules such as quantity, points per type, and weight, while `DELIVERABLE` stores specific graded items such as Quiz 1 or Exam 2. Keeping them separate prevents repeating category rules inside every deliverable or score row.

**Question 4: How do primary keys and foreign keys work together in the seven-table grading design?**
Suggested Answer: Primary keys uniquely identify rows inside their own tables, while foreign keys connect those rows across tables. For example, `StudentID` identifies a student in `STUDENT`, and that same key appears as a foreign key in `STUDENT_GRADE` and `ATTENDANCE` to link related facts without copying student names into every row.

**Question 5: Why is `STUDENT_GRADE` described as a junction table?**
Suggested Answer: `STUDENT_GRADE` is a junction table because it resolves the many-to-many relationship between students and deliverables. Each row records one student's result on one deliverable, which turns one many-to-many relationship into two one-to-many relationships.

**Question 6: What does referential integrity protect in the grading database?**
Suggested Answer: Referential integrity protects the validity of relationships between tables. It ensures that non-null foreign key values, such as `StudentID` or `DeliverableID`, must point to existing rows in the related tables, preventing orphaned or logically impossible records.

**Question 7: Why can surrogate primary keys and business-rule uniqueness constraints exist at the same time?**
Suggested Answer: A surrogate primary key gives a table a stable system-generated identifier, but business rules may still require certain combinations to remain unique. In this chapter, `GradeID` can be the primary key of `STUDENT_GRADE` while `(StudentID, DeliverableID)` still needs to stay unique if each student should have only one score per deliverable.

**Question 8: How does the chapter use functional dependency to preview normalization in Chapter 7?**
Suggested Answer: The chapter uses functional dependency to show that some attributes belong together because they share the same determinant. In this schema, `AssignmentType` determines `Quantity`, `PointsPerType`, and `Weight`, so those values belong in `ASSIGNMENT_TYPE`. Chapter 7 formalizes that logic as normalization.

### Reflection

**Question 1: Why is `ASSIGNMENT_TYPE` a stronger teaching choice than naming the category-rules table `WEIGHT`?**
Suggested Answer: `ASSIGNMENT_TYPE` is a stronger teaching choice because the table stores more than weight alone. It also stores quantity and points per type, so the name reflects the full business role of the table rather than one attribute inside it. That makes the schema easier to explain and less misleading.

**Question 2: What does the chapter suggest about the risks of treating every table as if it were only an entity table?**
Suggested Answer: The chapter suggests that this oversimplification causes confusion when students meet relationship and event tables. Tables such as `STUDENT_GRADE` and `ATTENDANCE` are not just noun-like entity tables. Treating every table as an entity hides important relational design patterns and makes later topics harder to understand.

**Question 3: Why is it useful to describe `GRADE_SCALE` as a lookup or interpretation table instead of a normal transactional parent?**
Suggested Answer: That wording is useful because `GRADE_SCALE` does not directly govern each raw score row. Instead, it is used after numeric results have been aggregated and interpreted. Calling it a lookup or interpretation table makes the chapter's logic more precise and avoids implying a direct foreign-key-style parent-child relationship that the schema does not actually use.

**Question 4: How does the move from one flat row to several related tables improve the credibility of reports?**
Suggested Answer: Reports become more credible because each fact is stored once in the right place and then reconstructed through joins. That reduces contradictions, prevents stale copies of the same fact, and allows integrity rules to block invalid references before they reach reports or dashboards.

**Question 5: When might a natural key be a good design choice, and when is a surrogate key safer?**
Suggested Answer: A natural key is a good choice when the value is stable, meaningful, and truly unique in the business context, such as `LetterGrade` in a bounded grading scale. A surrogate key is safer when real-world values may change, be reused, or fail to stay unique over time.

**Question 6: Why do JOINs become necessary in a relational design rather than feeling like an optional advanced technique?**
Suggested Answer: JOINs become necessary because relational design deliberately stores subjects separately instead of duplicating a report-ready view in one table. Once students, deliverables, category rules, and score rows are stored separately, joins are the normal way to reconstruct the exact view needed for a question.

### Personal Reflection

**Question 1: Where have you seen duplicated data create confusion or inconsistency in your own work, school, or daily life?**
Suggested Answer: A strong personal reflection might describe repeated contact lists, duplicated schedule spreadsheets, or copied grade trackers that drift out of sync over time. The key idea is to connect the chapter's data redundancy problem to a real situation where the same fact had to be updated in more than one place.

**Question 2: Which anomaly from the chapter, update, insertion, or deletion, feels most dangerous to you, and why?**
Suggested Answer: A thoughtful response might choose deletion anomaly because it can silently erase important information, or update anomaly because it creates conflicting versions of the truth. The strongest answers explain why that risk matters in a real business or academic setting.

**Question 3: Which Chapter 6 concept still feels least intuitive to you: keys, referential integrity, junction tables, or functional dependency?**
Suggested Answer: A good personal response would identify one concept honestly and explain where the confusion remains. For example, a student might say functional dependency feels abstract until tied to `ASSIGNMENT_TYPE`, or that junction tables became clearer only after seeing `STUDENT_GRADE` resolve a many-to-many relationship.

**Question 4: If you had to explain the relational model to a spreadsheet-heavy coworker or classmate, what example from this chapter would you use first?**
Suggested Answer: A strong answer would likely use Alice's repeated email updates or Bob's deletion anomaly because those examples are concrete and easy to understand. They show that relational design is not theory for its own sake; it prevents real mistakes.

**Question 5: How might this chapter change the way you design a spreadsheet, form, or tracking system in the future?**
Suggested Answer: A thoughtful response might explain that the student would stop mixing unrelated facts in one sheet, separate categories from transactions, or think more carefully about what each row actually represents. The most persuasive answers show a shift from convenience-first design to structure-first thinking.

**Question 6: What habit do you want to build so you notice structural problems in data earlier instead of after errors appear?**
Suggested Answer: Good answers might mention asking what one row represents, checking whether a fact is stored more than once, or identifying which field really determines other attributes before building a table. The chapter encourages students to look for structural warning signs before they become reporting problems.
