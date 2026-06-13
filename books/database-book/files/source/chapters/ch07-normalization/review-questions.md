<!-- metadata: date="2026-05-26" -->

<!-- markdownlint-disable MD025 -->
# Chapter 7: Review and Reflection

![Reflection GIF](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/review_cncyn6?_a=BAMAAAiu0)
<!-- markdownlint-enable MD025 -->

*Use these questions to review how normalization protects data quality and to think more carefully about when structure, relationships, and reporting needs should shape database design.*

## Review Questions

*These questions help you review the chapter's main ideas, terms, frameworks, and examples.*

1. How does Chapter 7 distinguish normalization from the broader relational model introduced in Chapter 6?
2. Why does the chapter begin with a flat grading table, and what problems does that structure make easier to see?
3. What is a determinant, and why does the chapter treat determinants as a guide for deciding where table boundaries should go?
4. What structural problems does 1NF remove, and why does the chapter describe 1NF as an entry point rather than a complete design solution?
5. How does Chapter 7 define a partial dependency, and what specific repair rule does it give for resolving a 2NF violation?
6. How does a transitive dependency differ from a partial dependency, and what kind of table redesign does 3NF usually require?
7. What does the chapter mean by a single source of truth, and how does normalization help create it?
8. Why does the chapter argue that many-to-many relationships must be resolved with a junction table, and what does that junction table store?

## Reflection Questions

*These questions encourage you to interpret the chapter, connect ideas, and think critically about how they apply in practice.*

1. Why is a wide spreadsheet-like table often attractive to users at first even when it creates update, insertion, and deletion anomalies later?
2. The chapter says normalization is not about making smaller tables for their own sake. What larger organizational goal is the chapter really defending?
3. Why does the chapter present 1NF, 2NF, and 3NF as cumulative stages instead of separate menu options a designer can choose among?
4. How does the grading database example show that a reporting-friendly layout is not always the same as a storage-friendly design?
5. The Let's Build companion rebuilds the original flat grading report from the four normalized tables using SQL joins and a view. What does that exercise teach about the relationship between normalized storage and the reports business users see?
6. When does denormalization make sense according to the chapter, and why does the chapter insist that it should follow, rather than replace, sound normalization?
7. Why does the chapter treat referential integrity (enforced through primary and foreign keys) as part of normalization's payoff rather than as a separate topic?
8. If a manager says joins are inconvenient and wants one table to hold everything, how would Chapter 7 respond to that argument?
9. Lab 07 transfers the same normalization logic to a veterinary clinic, where a treatment's catalog price (`StandardPrice`) and what was actually billed on a specific visit (`ActualCharge`) end up in two different tables. Why does the catalog price belong with the treatment itself while the actual charge belongs with the visit-and-treatment pairing, and what would go wrong if you stored both in the same table?

## Personal Reflection Questions

*These questions help you connect the chapter to your own habits, goals, strengths, and developing professional skills.*

1. Which Chapter 7 idea currently feels most intuitive to you: spotting anomalies, tracing determinants, applying 1NF, separating 2NF issues, diagnosing 3NF problems, or designing a junction table for a many-to-many relationship? Why?
2. Which distinction feels hardest right now: flat table versus normalized design, partial dependency versus transitive dependency, normalization versus denormalization, or a foreign key versus a junction table? What would help you remember it?
3. When you work with spreadsheets or reports, where have you seen information repeated in ways that could eventually create inconsistent updates?
4. If you had to explain single source of truth to a non-technical coworker, what example would you use from school, work, or personal experience?
5. Do you personally tend to prefer convenience for immediate reporting or structure for long-term reliability? How might that habit help you, and how might it limit you?
6. If you were redesigning a process you already know, what facts would you try to store once and then connect through keys instead of copying into multiple places?
7. As you think about your future career, why might the ability to question data structure matter even if you are not the person building the database itself?

## Answer Key

### Review

**Question 1: How does Chapter 7 distinguish normalization from the broader relational model introduced in Chapter 6?**
Suggested Answer: Chapter 6 introduces the relational model as the idea of storing data in related tables connected through keys. Chapter 7 builds on that foundation by asking whether those tables are structured well enough to keep facts accurate over time. Normalization is therefore a design-testing discipline inside relational thinking. It does not replace the relational model; it evaluates and improves how a relational design stores facts so that anomalies are prevented before they happen.

**Question 2: Why does the chapter begin with a flat grading table, and what problems does that structure make easier to see?**
Suggested Answer: The chapter starts with a flat grading table because it looks familiar and convenient, which makes the resulting design problems easier to recognize. In one wide table, repeated student facts, repeated deliverable facts, and grading rules sit alongside actual score facts in the same rows. That structure makes update, insertion, and deletion anomalies visible in a concrete way and shows that one row is trying to describe a student, a deliverable, a grading rule, and a performance result at the same time. It frames normalization as a fix for a real business problem rather than an abstract rule.

**Question 3: What is a determinant, and why does the chapter treat determinants as a guide for deciding where table boundaries should go?**
Suggested Answer: A determinant is the attribute or set of attributes on the left side of a functional dependency (written `X -> Y`) that determines the value of another attribute. Chapter 7 treats determinants as a design guide because attributes that depend on the same determinant usually belong together in the same table. When different attributes depend on different determinants, that signals the table is mixing different kinds of facts. Tracing determinants helps move from a vague wide table toward cleanly bounded tables like `STUDENT`, `ASSIGNMENT_TYPE`, `DELIVERABLE`, and `STUDENT_GRADE`.

**Question 4: What structural problems does 1NF remove, and why does the chapter describe 1NF as an entry point rather than a complete design solution?**
Suggested Answer: 1NF removes multi-valued cells and repeating columns so each cell holds one fact and each row represents one instance. That structural cleanup is what makes a table queryable with SQL at all. The chapter calls 1NF an entry point because a 1NF table can still contain partial dependencies, transitive dependencies, and substantial redundancy. In other words, 1NF makes the table usable, but it does not finish the design work that 2NF and 3NF are meant to handle.

**Question 5: How does Chapter 7 define a partial dependency, and what specific repair rule does it give for resolving a 2NF violation?**
Suggested Answer: A partial dependency occurs when a non-key attribute depends on only part of a composite key instead of on the full key. The repair rule is direct: move the partially dependent attributes into a new table whose primary key is the determinant they actually depend on. The original table then keeps only the attributes that depend on the entire composite key. That separation is how the chapter explains reaching 2NF, and it is what justifies pulling assignment-type facts out of the deliverable rows in the grading example.

**Question 6: How does a transitive dependency differ from a partial dependency, and what kind of table redesign does 3NF usually require?**
Suggested Answer: A partial dependency comes from depending on only part of a composite key. A transitive dependency occurs when a non-key attribute depends on another non-key attribute rather than directly on the primary key. To reach 3NF, the designer usually creates a new lookup or rules table whose key is the intermediate determinant, then references that table by foreign key. In the grading example, this is how grading rules and assignment-type facts move out of the deliverable record so each non-key attribute depends only on its own key.

**Question 7: What does the chapter mean by a single source of truth, and how does normalization help create it?**
Suggested Answer: A single source of truth means that each fact lives in exactly one authoritative location instead of being copied into many rows or tables. Normalization supports this by separating student facts, deliverable facts, grading-rule facts, and performance facts into the tables where they logically belong. When a fact is stored once, updates stay consistent automatically and different reports cannot disagree about basic information. That is what makes downstream analytics trustworthy.

**Question 8: Why does the chapter argue that many-to-many relationships must be resolved with a junction table, and what does that junction table store?**
Suggested Answer: A many-to-many relationship cannot be stored cleanly in either of the two parent tables without repeating values or losing facts. The chapter resolves this by introducing a junction (also called bridge or associative) table whose rows each represent one pairing of the two entities. The junction table holds foreign keys back to both parents and may store attributes that belong to the pairing itself, such as a score or a date. In the grading database, `STUDENT_GRADE` plays this role: it links one student to one deliverable and records the score for that specific pairing.

### Reflection

**Question 1: Why is a wide spreadsheet-like table often attractive to users at first even when it creates update, insertion, and deletion anomalies later?**
Suggested Answer: A wide table puts many facts in one place and feels easy to browse, filter, export, or explain to someone who is thinking like a report consumer rather than a system designer. It avoids the up-front cost of learning joins or relationships. The trade-off is that the convenience hides structural risk: once the data changes often, the repeated facts in that wide table drift apart, and what looked simple becomes the source of inconsistent reports.

**Question 2: The chapter says normalization is not about making smaller tables for their own sake. What larger organizational goal is the chapter really defending?**
Suggested Answer: The larger goal is reliable decision support through accurate and maintainable data. Chapter 7 argues that organizations need systems where facts stay consistent as the database grows, users edit records, and many reports depend on shared data. Smaller, focused tables matter only because they help separate facts correctly. The real objective is integrity, clarity, and long-term reliability — the conditions under which managers can actually trust the numbers in front of them.

**Question 3: Why does the chapter present 1NF, 2NF, and 3NF as cumulative stages instead of separate menu options a designer can choose among?**
Suggested Answer: The forms are cumulative because each one assumes the previous one is already satisfied. A table cannot meaningfully reach 2NF if it still stores lists inside cells, and it cannot reach 3NF cleanly if 2NF problems remain. Presenting them as a sequence forces disciplined design — students learn to fix multi-valued cells first, then partial dependencies, then transitive dependencies — rather than picking whichever rule feels easiest to apply.

**Question 4: How does the grading database example show that a reporting-friendly layout is not always the same as a storage-friendly design?**
Suggested Answer: The original wide grading table looks convenient for viewing everything at once, but it mixes student, deliverable, rule, and performance facts in the same row, which causes anomalies as soon as anything changes. The four-table normalized design separates those facts so each is stored once and connected through keys. The example teaches that reporting convenience belongs in the presentation layer (queries, views, dashboards) rather than baked into the core storage tables.

**Question 5: The Let's Build companion rebuilds the original flat grading report from the four normalized tables using SQL joins and a view. What does that exercise teach about the relationship between normalized storage and the reports business users see?**
Suggested Answer: The exercise shows that nothing is lost when a database is normalized. The original wide report can be reconstructed on demand by joining `STUDENT`, `DELIVERABLE`, `ASSIGNMENT_TYPE`, and `STUDENT_GRADE` and exposing the result as a view. Storage and presentation are two different layers: facts are stored once for integrity, and queries or views reshape them into the columns business users want to see. That separation lets the design protect data quality without taking away the familiar reporting view.

**Question 6: When does denormalization make sense according to the chapter, and why does the chapter insist that it should follow, rather than replace, sound normalization?**
Suggested Answer: Denormalization makes sense when performance, reporting speed, or repeated analytical access creates a real and measurable need for controlled redundancy — for example, a precomputed summary table for a dashboard. The chapter insists it should follow normalization because a reliable normalized baseline tells the designer where the truth lives and where the copies live. Without that baseline, denormalization stops being optimization and becomes an excuse for weak design that quietly recreates the anomalies normalization was meant to prevent.

**Question 7: Why does the chapter treat referential integrity (enforced through primary and foreign keys) as part of normalization's payoff rather than as a separate topic?**
Suggested Answer: Normalization is what makes referential integrity meaningful. Once facts are split into focused tables like `STUDENT`, `DELIVERABLE`, and `STUDENT_GRADE`, primary and foreign keys are what hold those tables together and prevent orphan rows. The chapter treats integrity rules as the payoff because they are what convert a clean design on paper into a database the system itself will defend — rejecting a grade for a deliverable that does not exist, for example, instead of letting the inconsistency sit in the data.

**Question 8: If a manager says joins are inconvenient and wants one table to hold everything, how would Chapter 7 respond to that argument?**
Suggested Answer: Chapter 7 would acknowledge that joins add some up-front complexity to querying, but argue that the cost is justified because normalized structure protects long-term data quality. A single all-in-one table makes updates, insertions, and deletions risky and erodes trust in the data. The chapter's recommended response is to keep storage normalized and meet the manager's convenience need through views, saved queries, or summary tables in the presentation layer — preserving both ease of use and integrity instead of trading one for the other.

**Question 9: Lab 07 transfers the same normalization logic to a veterinary clinic, where a treatment's catalog price (`StandardPrice`) and what was actually billed on a specific visit (`ActualCharge`) end up in two different tables. Why does the catalog price belong with the treatment itself while the actual charge belongs with the visit-and-treatment pairing, and what would go wrong if you stored both in the same table?**
Suggested Answer: `StandardPrice` is a fact about the treatment as a catalog item — it has one value per treatment code regardless of which pet receives it. `ActualCharge` is a fact about the relationship between a specific visit and a specific treatment, because the same treatment can be discounted, surcharged, or waived on different visits. That is why the chapter pattern puts `StandardPrice` in `TREATMENT` and `ActualCharge` in the junction table `VISIT_TREATMENT`, exactly like the grading example puts grading rules in their own table and the score in `STUDENT_GRADE`. Storing both prices in one table would either repeat the catalog price on every billing line (an update anomaly waiting to happen when the clinic raises prices) or overwrite the catalog price every time a single visit was discounted, destroying the reference value. Splitting them lets each fact live in one place and lets reports rebuild the billed-vs-standard comparison on demand.

### Personal Reflection

**Question 1: Which Chapter 7 idea currently feels most intuitive to you: spotting anomalies, tracing determinants, applying 1NF, separating 2NF issues, diagnosing 3NF problems, or designing a junction table for a many-to-many relationship? Why?**
Suggested Answer: A strong response chooses one area and explains why it feels natural. A student might say spotting anomalies feels intuitive because repeated contact information or due dates are easy to notice in a wide table. Another might prefer 1NF because removing multi-valued cells is concrete, or junction tables because they map cleanly onto familiar pairings like students and courses. The best answer connects the choice to a specific habit, prior example, or moment in the Let's Build exercise.

**Question 2: Which distinction feels hardest right now: flat table versus normalized design, partial dependency versus transitive dependency, normalization versus denormalization, or a foreign key versus a junction table? What would help you remember it?**
Suggested Answer: A thoughtful answer names the difficult distinction honestly and proposes a memory aid. A student might say partial versus transitive dependency is hardest and decide to ask whether the problem comes from only part of a composite key or from another non-key column in the middle. Another might say foreign key versus junction table and remember it by asking whether one row needs to point to one parent, or whether each row needs to pair two parents. The important part is showing a deliberate learning strategy.

**Question 3: When you work with spreadsheets or reports, where have you seen information repeated in ways that could eventually create inconsistent updates?**
Suggested Answer: A plausible response might mention repeated customer contact data, copied product descriptions, duplicated deadlines across tabs, or repeated employee details in many rows. The student should explain how changing one copy without changing the others could produce conflicting reports. A strong answer connects that everyday experience back to the chapter's update anomaly idea.

**Question 4: If you had to explain single source of truth to a non-technical coworker, what example would you use from school, work, or personal experience?**
Suggested Answer: A good answer uses a concrete shared record — a class roster, a staff contact list, an inventory sheet — where one official source controls what everyone else sees. The explanation should show that when the authoritative record is updated, every dependent report or process stays aligned, and that copying it into many places is what creates disagreement. The strongest responses keep the example easy to picture.

**Question 5: Do you personally tend to prefer convenience for immediate reporting or structure for long-term reliability? How might that habit help you, and how might it limit you?**
Suggested Answer: A strong response identifies a real preference and evaluates it honestly. Someone who prefers convenience may produce reports quickly but overlook maintenance risk. Someone who prefers structure may design carefully but need to work harder to communicate short-term benefits to stakeholders. The best answer names both the advantage and the trade-off rather than treating one preference as obviously correct.

**Question 6: If you were redesigning a process you already know, what facts would you try to store once and then connect through keys instead of copying into multiple places?**
Suggested Answer: A thoughtful response might mention customer records, employee details, product information, course rosters, or event schedules as the entity-style facts to store once, and then describe how related transactions or activity records (orders, visits, grades) would connect back through keys. The strongest answers show an instinct for separating stable entity data from repeated event data and gesture at where a junction table might be needed.

**Question 7: As you think about your future career, why might the ability to question data structure matter even if you are not the person building the database itself?**
Suggested Answer: A strong answer explains that many roles depend on trusting reports, requesting new data, and interpreting patterns without writing the schema directly. Being able to question how data is organized helps a professional spot weak assumptions, ask better questions of analysts and developers, and recognize when a "simple" reporting request is really hiding a structural problem. Structure shapes decision quality, and that link is valuable far beyond technical database roles.
