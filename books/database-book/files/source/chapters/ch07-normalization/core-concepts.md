<!-- Chapter edit: improved structure, readability, callouts, and build hygiene. Technical meaning preserved. -->
---
title: "Chapter 7: Data Normalization"
author: "Nimrod Dvir, PhD"
date: 2026-05-30
lang: en-US
toc: true
---

# Chapter 7: Data Normalization

*From Flat Files to Reliable Relational Design*

Chapter 6 introduced the relational model: data is stored in separate tables, rows represent instances, and keys connect related records. Chapter 7 asks the next question: how do we know whether those tables are designed well?

The answer is **normalization**.

Normalization is the design discipline that helps database designers reduce redundancy, prevent data anomalies, and place each fact where it belongs. It is not a software feature, a button in Access, or a SQL command that automatically fixes a database. It is a way of reasoning about structure.

This chapter uses the **Grading Database** as the main case. We begin with a flat grading table that looks convenient but hides repeated student facts, repeated assignment facts, and repeated grading rules. Then we use **functional dependencies** and the first three **normal forms** to rebuild that table into a more reliable relational design.

By the end of the chapter, you should be able to look at a messy table and ask:

- What facts are repeated?
- What does each attribute depend on?
- Which facts belong together?
- Which facts should be separated into their own tables?
- How can the original report still be recreated with SQL joins or views?

That last question matters. Normalization does not mean that users lose the reports they need. It means the database stores facts cleanly, and SQL reconstructs useful reporting views when needed.

## Learning Objectives

After completing this chapter, you will be able to:

1. Define normalization and explain why it protects data integrity.
2. Identify redundancy, inconsistency, and modification anomalies in a flat table.
3. Explain functional dependencies and use them to reason about table design.
4. Distinguish among **First Normal Form (1NF)**, **Second Normal Form (2NF)**, and **Third Normal Form (3NF)**.
5. Apply 1NF by removing multi-valued cells and repeating columns.
6. Apply 2NF by removing partial dependencies from composite-key tables.
7. Apply 3NF by removing transitive dependencies and separating rules from transactional facts.
8. Explain why junction tables are necessary for many-to-many relationships.
9. Explain when controlled denormalization may be justified and what risks it creates.

## Chapter Roadmap

| Part | Section | Main Question |
|---:|---|---|
| 1 | Why Normalization Matters | What goes wrong when too many facts are stored in one table? |
| 2 | Functional Dependencies | How do we know which facts belong together? |
| 3 | Normal Forms | What sequence of design checks improves table structure? |
| 4 | First Normal Form | Is each cell storing one fact? |
| 5 | Second Normal Form | Does every non-key attribute depend on the whole key? |
| 6 | Third Normal Form | Does every non-key attribute depend only on the key? |
| 7 | Normalized Grading Database | What does the improved schema look like? |
| 8 | Normalization and Analytics | How do normalized databases still support reports and dashboards? |
| 9 | Denormalization | When is intentional redundancy acceptable? |
| 10 | Common Mistakes | What pitfalls should designers avoid? |

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 7.1 Why Normalization Matters

### 7.1.1 The Problem: Flat Tables Feel Convenient

Many organizations begin with one large table because it feels simple. One spreadsheet can show students, assignments, due dates, scores, emails, attendance, and grading rules all in one place. At first, that convenience is attractive.

The problem appears when the data changes. A flat table may be easy to read, but it is hard to maintain. It repeats the same facts many times, allows inconsistencies to creep in, and makes ordinary operations risky. The larger the table becomes, the more fragile it gets.

**Example: A flat grading table**

Consider this simplified grading table. It follows the Chapter 6 convention of using `S1001`-style student IDs, scores on a 0-100 scale, and separate fields for `CategoryWeight` and `WeightPerItem`.

| GradeID | StudentID | FirstName | LastName | Email | AssignmentType | DeliverableNumber | DueDate | CategoryWeight | WeightPerItem | Score |
|---:|---|---|---|---|---|---:|---|---:|---:|---:|
| 1 | S1001 | Alice | Johnson | alice@university.edu | Quiz | 1 | 2026-09-10 | 20 | 5 | 90 |
| 2 | S1001 | Alice | Johnson | alice@university.edu | Quiz | 2 | 2026-09-17 | 20 | 5 | 95 |
| 3 | S1001 | Alice | Johnson | alice@university.edu | Exam | 1 | 2026-10-05 | 40 | 20 | 87 |
| 4 | S1002 | Brian | Lee | brian@university.edu | Quiz | 1 | 2026-09-10 | 20 | 5 | 75 |
| 5 | S1002 | Brian | Lee | brian@university.edu | Quiz | 2 | 2026-09-17 | 20 | 5 | 80 |
| 6 | S1003 | Carla | Mendez | carla@university.edu | Quiz | 1 | 2026-09-10 | 20 | 5 | 100 |
| 7 | S1003 | Carla | Mendez | carla@university.edu | Exam | 1 | 2026-10-05 | 40 | 20 | 92 |

At first glance, the table seems useful. You can see who the student is, what the deliverable was, when it was due, how much the category and item count toward the final grade, and what score the student earned.

But structurally, this table mixes four different kinds of facts:

| Kind of Fact | Columns | Better Home |
|---|---|---|
| Student facts | `StudentID`, `FirstName`, `LastName`, `Email` | `STUDENT` |
| Category rules | `AssignmentType`, `CategoryWeight`, `WeightPerItem` | `ASSIGNMENT_TYPE` |
| Deliverable facts | `AssignmentType`, `DeliverableNumber`, `DueDate` | `DELIVERABLE` |
| Performance facts | `StudentID`, deliverable identifier, `Score` | `STUDENT_GRADE` |

The table is not just wide. It is conceptually confused. One row is trying to describe a student, a deliverable, a grading rule, and a performance result at the same time.

### 7.1.2 Redundancy

**Redundancy** occurs when the same fact is stored more than once.

In the flat table, Alice's name and email appear in every row tied to Alice. Quiz due dates repeat for every student who completed that quiz. The category weight and item weight repeat for every row in the same assignment category.

Redundancy is not automatically bad. Sometimes repeated values are intentionally created for reporting or performance. But uncontrolled redundancy in a base table is dangerous because repeated facts can drift apart.

**Concrete example**

Suppose Alice changes her email address to `alice.johnson@albany.edu`.

In the flat table, the database must update every row where Alice appears:

| GradeID | StudentID | Old Email | New Email Needed? |
|---:|---|---|---|
| 1 | S1001 | alice@university.edu | Yes |
| 2 | S1001 | alice@university.edu | Yes |
| 3 | S1001 | alice@university.edu | Yes |

If one row is missed, the table now contains two versions of Alice's email.

In a normalized design, Alice's email appears once in `STUDENT`. The update happens one time.

```sql
UPDATE STUDENT
SET Email = 'alice.johnson@albany.edu'
WHERE StudentID = 'S1001';
```

That is the basic promise of normalization: store the fact once, then reference it when needed.

### 7.1.3 Modification Anomalies

A **modification anomaly** is a structural problem that makes inserting, updating, or deleting data produce unwanted side effects. There are three classic types.

| Anomaly | What Goes Wrong | Grading Example |
|---|---|---|
| **Update anomaly** | A repeated fact must be changed in many places | Alice's email must be updated in every row where Alice appears |
| **Insertion anomaly** | A fact cannot be added without another unrelated fact | A new student cannot be added until the student has a score |
| **Deletion anomaly** | Deleting one fact accidentally deletes another fact | Deleting Carla's only grade also removes the only stored record of Carla |

**Update anomaly**

If Quiz 1 changes from a `WeightPerItem` of 5 to 6, every Quiz 1 row must be updated.

```text
Quiz 1 for Alice -> update WeightPerItem
Quiz 1 for Brian -> update WeightPerItem
Quiz 1 for Carla -> update WeightPerItem
```

A normalized design stores the item weight rule once.

**Insertion anomaly**

A new student named Daniel joins the course before completing any assignment. In the flat table, every row represents a grade event, so there is no clean place to store Daniel unless the system invents a fake score row.

In a normalized design, Daniel belongs in `STUDENT` immediately:

```sql
INSERT INTO STUDENT (StudentID, FirstName, LastName, Email)
VALUES ('S1004', 'Daniel', 'Kim', 'daniel@university.edu');
```

No grade row is needed yet.

**Deletion anomaly**

Carla has only one recorded score. If that score row is deleted, the flat table may lose Carla's name and email as well.

In a normalized design, deleting a score does not delete the student:

```sql
DELETE FROM STUDENT_GRADE
WHERE StudentID = 'S1003'
  AND DeliverableID = 1;
```

Carla remains in `STUDENT`.

### 7.1.4 Definition of Normalization

**Normalization** is the process of organizing relational data so that each fact is stored in the right place, redundancy is reduced, and relationships are represented through keys rather than repeated text.

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Put each fact where it belongs</strong></p>
  <p>Normalization is not about adding tables for their own sake. It is about deciding where each fact belongs so the fact is stored once and stays consistent.</p>
</div>

A retailer faces the same problem as the grading database. One order spreadsheet may store customer name, product name, order date, sales representative, and shipping address in the same row. That works for a few orders, but it breaks when a customer changes address, a product price changes, or a sales representative moves territories. Normalization separates customer facts, product facts, order facts, and employee facts so each can be maintained reliably.

![Flat table compared to normalized STUDENT table](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch07-normalization/ch07-easy-at-first)

*Figure 7.1 — Flat tables feel convenient at first, but updating repeated facts can lead to inconsistencies like disconnected student records.*

![Flowchart showing update, insertion, and deletion anomalies](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch07-normalization/ch07-dangers)

*Figure 7.2 — Modification anomalies (update, insertion, and deletion) are structural dangers that occur when multiple subjects are mixed in a single flat table.*

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 7.2 Functional Dependencies: The Logic Behind Normalization

Normalization is based on **functional dependencies**. These describe how one attribute determines another.

### 7.2.1 What Is a Functional Dependency?

A **functional dependency** exists when one attribute, or one set of attributes, determines another attribute.

We write this as:

```text
X -> Y
```

This means that if you know `X`, you can determine `Y`. The attribute or attribute set on the left is called the **determinant**.

### 7.2.2 Everyday Examples

Functional dependencies are not just database theory. They describe ordinary relationships in the world.

| Functional Dependency | Meaning |
|---|---|
| `StudentID -> FirstName, LastName, Email` | A student ID determines the student's identity facts |
| `ZipCode -> City, State` | A ZIP code often determines a city and state |
| `ProductID -> ProductName, UnitPrice` | A product ID determines product details |
| `CourseSectionID -> MeetingTime, Room` | A course section determines its meeting information |

Functional dependencies are not always universal truths. They depend on the rules of the organization. For example, `ZipCode -> City` is not perfectly reliable in every real-world setting, but it may be acceptable in a simplified teaching database. Good design requires knowing the business context.

### 7.2.3 Functional Dependencies in the Grading Database

In the grading example, the dependencies look like this:

| Dependency | Interpretation |
|---|---|
| `StudentID -> FirstName, LastName, Email` | Student details depend on the student |
| `AssignmentType -> Quantity, PointsPerType, Weight, WeightPerItem` | Category rules depend on the assignment type |
| `DeliverableID -> AssignmentType, DeliverableNumber, DueDate` | Deliverable details depend on the deliverable |
| `(StudentID, DeliverableID) -> Score` | A score depends on the combination of student and deliverable |

These dependencies tell us which tables should exist.

| Determinant | Attributes It Determines | Likely Table |
|---|---|---|
| `StudentID` | `FirstName`, `LastName`, `Email` | `STUDENT` |
| `AssignmentType` | `Quantity`, `PointsPerType`, `Weight`, `WeightPerItem` | `ASSIGNMENT_TYPE` |
| `DeliverableID` | `AssignmentType`, `DeliverableNumber`, `DueDate` | `DELIVERABLE` |
| `(StudentID, DeliverableID)` | `Score` | `STUDENT_GRADE` |

### 7.2.4 The Design Rule

A practical rule follows:

<div class="callout good-practice">
  <p><strong>✅ Good Practice: Group attributes by determinant</strong></p>
  <p>Attributes that depend on the same determinant usually belong in the same table. Attributes that depend on different determinants usually belong in different tables.</p>
</div>

This rule is not a substitute for judgment, but it is a powerful starting point.

**Example**

If `FirstName` and `Email` depend on `StudentID`, then they belong in `STUDENT`.

If `Score` depends on both `StudentID` and `DeliverableID`, then it belongs in a table that represents that relationship, such as `STUDENT_GRADE`.

#### 🎨 Figure Suggestions

Figure 7.3: A dependency diagram for the grading database showing four determinants (`StudentID`, `AssignmentType`, `DeliverableID`, `(StudentID, DeliverableID)`) with arrows to the attributes each one determines, color-coded by the table each group lives in.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 7.3 Normal Forms: A Step-by-Step Design Checklist

Normalization happens through levels called **normal forms**. Each normal form checks for a different kind of structural problem.

| Normal Form | Main Question | Problem It Fixes | Memory Aid |
|---|---|---|---|
| **1NF** | Is each cell one value? | Multi-valued cells and repeating columns | One fact per cell |
| **2NF** | Does every non-key attribute depend on the whole key? | Partial dependencies | The whole key |
| **3NF** | Does every non-key attribute depend only on the key? | Transitive dependencies | Nothing but the key |

A common mnemonic captures all three:

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: The key, the whole key, and nothing but the key</strong></p>
  <ul>
    <li><strong>The key:</strong> every table needs a meaningful identifier.</li>
    <li><strong>The whole key:</strong> non-key attributes should depend on the full key, not part of it.</li>
    <li><strong>Nothing but the key:</strong> non-key attributes should not depend on other non-key attributes.</li>
  </ul>
</div>

Normal forms are cumulative. A table in 3NF must already satisfy 2NF and 1NF.

#### 🎨 Figure Suggestions

Figure 7.4: A staircase diagram showing 1NF, 2NF, and 3NF as three rising steps, with the structural problem each step removes labeled on the riser (multi-valued cells, partial dependencies, transitive dependencies).

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 7.4 First Normal Form (1NF): One Cell, One Fact

### 7.4.1 Definition

A table is in **First Normal Form (1NF)** when:

1. Each cell contains a single value.
2. Each row represents one instance.
3. There are no repeating groups or repeating columns.
4. Each column contains values of the same kind.

1NF makes data queryable. It does not fully remove redundancy, but it gives the table a usable relational shape.

### 7.4.2 Violation 1: A Multi-Valued Cell

This table violates 1NF because the `Grades` column stores several scores in one cell.

| StudentID | FirstName | LastName | Grades |
|---|---|---|---|
| S1001 | Alice | Johnson | 90, 85, 88 |
| S1002 | Brian | Lee | 92, 80 |

The database sees `90, 85, 88` as one text-like bundle, not three separate grade facts. That makes filtering, sorting, and averaging difficult.

**1NF fix**

Each grade becomes its own row.

| GradeID | StudentID | FirstName | LastName | Score |
|---:|---|---|---|---:|
| 1 | S1001 | Alice | Johnson | 90 |
| 2 | S1001 | Alice | Johnson | 85 |
| 3 | S1001 | Alice | Johnson | 88 |
| 4 | S1002 | Brian | Lee | 92 |
| 5 | S1002 | Brian | Lee | 80 |

Now each cell contains one value.

### 7.4.3 Violation 2: Repeating Columns

This table also violates 1NF because the structure repeats grades across columns.

| StudentID | FirstName | Grade1 | Grade2 | Grade3 |
|---|---|---:|---:|---:|
| S1001 | Alice | 90 | 85 | 88 |
| S1002 | Brian | 92 | 80 | NULL |

The problem is that the table design assumes a fixed number of grades. What happens when there is a fourth grade? Add `Grade4`? Then `Grade5`? That is not relational design. Relational databases grow by adding rows, not by adding repeating columns.

**1NF fix**

Use a row for each grade event.

| StudentID | DeliverableNumber | Score |
|---|---:|---:|
| S1001 | 1 | 90 |
| S1001 | 2 | 85 |
| S1001 | 3 | 88 |
| S1002 | 1 | 92 |
| S1002 | 2 | 80 |

### 7.4.4 What 1NF Does Not Solve

A 1NF table can still be poorly designed. For example:

| StudentID | DeliverableID | FirstName | LastName | DeliverableType | Score |
|---|---:|---|---|---|---:|
| S1001 | 1 | Alice | Johnson | Quiz | 90 |
| S1001 | 2 | Alice | Johnson | Quiz | 85 |
| S1002 | 1 | Brian | Lee | Quiz | 92 |

This table satisfies 1NF because every cell contains one value. But it still repeats student and deliverable facts. That is why we need 2NF.

<div class="callout avoid">
  <p><strong>❌ Avoid: Treating 1NF as the finish line</strong></p>
  <p>A table can pass 1NF and still be a maintenance nightmare. 1NF fixes cell-level problems, but it does not stop the same student name from appearing in dozens of rows.</p>
</div>

#### 🎨 Figure Suggestions

Figure 7.5: A before-and-after pair showing a multi-valued `Grades` cell on the left and the same data unpacked into one-row-per-grade on the right, with arrows from the comma-separated values to their new rows.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 7.5 Second Normal Form (2NF): The Whole Key

### 7.5.1 Definition

A table is in **Second Normal Form (2NF)** when:

1. It is already in 1NF.
2. Every non-key attribute depends on the **whole** primary key, not just part of it.

2NF matters mainly when a table has a **composite key**.

A **composite key** is a primary key made from two or more columns. In a grading table, the combination `(StudentID, DeliverableID)` can identify one student's result on one deliverable.

### 7.5.2 A 2NF Violation

Consider this table:

| StudentID | DeliverableID | FirstName | LastName | Email | DeliverableType | DueDate | Score |
|---|---:|---|---|---|---|---|---:|
| S1001 | 1 | Alice | Johnson | alice@university.edu | Quiz | 2026-09-10 | 90 |
| S1001 | 2 | Alice | Johnson | alice@university.edu | Quiz | 2026-09-17 | 85 |
| S1002 | 1 | Brian | Lee | brian@university.edu | Quiz | 2026-09-10 | 92 |

Assume the key is:

```text
(StudentID, DeliverableID)
```

Now inspect the dependencies:

| Attribute | Depends On | Problem? |
|---|---|---|
| `Score` | `(StudentID, DeliverableID)` | Good |
| `FirstName`, `LastName`, `Email` | `StudentID` only | Partial dependency |
| `DeliverableType`, `DueDate` | `DeliverableID` only | Partial dependency |

A **partial dependency** occurs when a non-key attribute depends on only part of a composite key.

### 7.5.3 2NF Fix: Separate Student, Deliverable, and Grade Facts

To fix the table, move attributes that depend only on `StudentID` to `STUDENT`, and move attributes that depend only on `DeliverableID` to `DELIVERABLE`.

**STUDENT**

| StudentID | FirstName | LastName | Email |
|---|---|---|---|
| S1001 | Alice | Johnson | alice@university.edu |
| S1002 | Brian | Lee | brian@university.edu |

**DELIVERABLE**

| DeliverableID | DeliverableType | DueDate |
|---:|---|---|
| 1 | Quiz | 2026-09-10 |
| 2 | Quiz | 2026-09-17 |

**STUDENT_GRADE**

| StudentID | DeliverableID | Score |
|---|---:|---:|
| S1001 | 1 | 90 |
| S1001 | 2 | 85 |
| S1002 | 1 | 92 |

Now each table has a clearer purpose.

| Table | What It Stores |
|---|---|
| `STUDENT` | Student facts |
| `DELIVERABLE` | Deliverable facts |
| `STUDENT_GRADE` | The score earned by one student on one deliverable |

### 7.5.4 Why Junction Tables Appear

`STUDENT_GRADE` is a **junction table** because it resolves a many-to-many relationship.

- One student can complete many deliverables.
- One deliverable can be completed by many students.
- The score belongs to the relationship between student and deliverable.

This same pattern appears in many business systems.

| Many-to-Many Relationship | Junction Table |
|---|---|
| Students enroll in courses | `ENROLLMENT(StudentID, CourseID, EnrollmentDate)` |
| Customers buy products | `ORDER_LINE(OrderID, ProductID, Quantity)` |
| Employees work on projects | `PROJECT_ASSIGNMENT(EmployeeID, ProjectID, Role)` |
| Pets receive treatments | `VISIT_TREATMENT(VisitID, TreatmentID, Charge)` |

The junction table is not extra complexity for its own sake. It represents something real: the relationship itself has data.

#### 🎨 Figure Suggestions

Figure 7.6: A three-panel diagram showing the 2NF-violating table at the top, then arrows splitting it into `STUDENT`, `DELIVERABLE`, and `STUDENT_GRADE` below, with the composite key `(StudentID, DeliverableID)` highlighted as the only legitimate determinant of `Score`.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 7.6 Third Normal Form (3NF): Nothing But the Key

### 7.6.1 Definition

A table is in **Third Normal Form (3NF)** when:

1. It is already in 2NF.
2. No non-key attribute depends on another non-key attribute.

A **transitive dependency** occurs when a non-key attribute depends on another non-key attribute instead of depending directly on the key.

### 7.6.2 A 3NF Violation: Letter Grades

Consider this table:

| GradeID | StudentID | DeliverableID | Score | LetterGrade |
|---:|---|---:|---:|---|
| 1 | S1001 | 1 | 92 | A- |
| 2 | S1002 | 1 | 88 | B+ |
| 3 | S1003 | 1 | 76 | C |

At first, this looks harmless. But `LetterGrade` is not an independent fact about the grade record. It is derived from `Score` according to a grading rule.

The dependency is:

```text
Score -> LetterGrade
```

That is a transitive dependency because:

```text
GradeID -> Score
Score -> LetterGrade
```

So:

```text
GradeID -> LetterGrade
```

only through `Score`.

### 7.6.3 3NF Fix: Separate Rules from Facts

The score belongs in `STUDENT_GRADE`. The letter-grade rule belongs in `GRADE_SCALE`.

**STUDENT_GRADE**

| GradeID | StudentID | DeliverableID | Score |
|---:|---|---:|---:|
| 1 | S1001 | 1 | 92 |
| 2 | S1002 | 1 | 88 |
| 3 | S1003 | 1 | 76 |

**GRADE_SCALE**

| LetterGrade | MinScore | MaxScore |
|---|---:|---:|
| A | 93 | 100 |
| A- | 90 | 92 |
| B+ | 87 | 89 |
| B | 83 | 86 |
| C | 70 | 79 |

Now the rule is stored once. If the grading scale changes, the database does not need to rewrite every grade record.

### 7.6.4 Another 3NF Example: Assignment Type Rules

Suppose `DELIVERABLE` stores both individual deliverable information and category-level rules:

| DeliverableID | AssignmentType | DeliverableNumber | DueDate | Quantity | PointsPerType | Weight | WeightPerItem |
|---:|---|---:|---|---:|---:|---:|---:|
| 1 | Quiz | 1 | 2026-09-10 | 4 | 100 | 20 | 5 |
| 2 | Quiz | 2 | 2026-09-17 | 4 | 100 | 20 | 5 |
| 3 | Exam | 1 | 2026-10-05 | 2 | 100 | 40 | 20 |

The dependency is:

```text
AssignmentType -> Quantity, PointsPerType, Weight, WeightPerItem
```

But `AssignmentType` is not the primary key of `DELIVERABLE`. The table mixes facts about individual deliverables with facts about assignment categories.

**Better design**

**ASSIGNMENT_TYPE**

| AssignmentType | Quantity | PointsPerType | Weight | WeightPerItem |
|---|---:|---:|---:|---:|
| Quiz | 4 | 100 | 20 | 5 |
| Homework | 3 | 100 | 30 | 10 |
| Exam | 2 | 100 | 40 | 20 |
| Project | 1 | 100 | 10 | 10 |

**DELIVERABLE**

| DeliverableID | AssignmentType | DeliverableNumber | DueDate |
|---:|---|---:|---|
| 1 | Quiz | 1 | 2026-09-10 |
| 2 | Quiz | 2 | 2026-09-17 |
| 3 | Exam | 1 | 2026-10-05 |

This is cleaner because category rules live in `ASSIGNMENT_TYPE`, while individual assignments live in `DELIVERABLE`.

### 7.6.5 Business Example: Customer Region

A sales table might include:

| OrderID | CustomerID | CustomerName | RegionCode | RegionManager |
|---:|---:|---|---|---|
| 1 | 501 | Northwind Books | NE | Taylor |
| 2 | 502 | Hudson Supply | NE | Taylor |
| 3 | 503 | Valley Foods | SW | Jordan |

If `RegionCode -> RegionManager`, then `RegionManager` belongs in a `REGION` table, not repeated in every order or customer row.

**REGION**

| RegionCode | RegionManager |
|---|---|
| NE | Taylor |
| SW | Jordan |

This is the same logic as the grading database. Rules and lookup facts belong in lookup tables, not repeated across transaction rows.

### 7.6.6 Before and After at a Glance

Before moving from design to the finished schema, it helps to see the journey in one compact view.

| Aspect | Flat Grading Table | Normalized Design |
|---|---|---|
| Tables | 1 | 7 (`STUDENT`, `ASSIGNMENT_TYPE`, `DELIVERABLE`, `STUDENT_GRADE`, `SCHEDULE`, `ATTENDANCE`, `GRADE_SCALE`) |
| Student facts | Repeated in every grade row | Stored once in `STUDENT` |
| Category rules | Repeated in every deliverable row | Stored once in `ASSIGNMENT_TYPE` |
| Letter-grade rule | Embedded in each grade row | Stored once in `GRADE_SCALE` |
| Update of one student email | Many row updates, risk of drift | One row update |
| Adding a new student before any grade | Not possible without a fake row | One `INSERT` into `STUDENT` |
| Producing the original flat report | Already flat | Recreated with a `JOIN` or a view |

The normalized schema separates **storage** from **presentation**. Storage stays clean and consistent. Presentation is reconstructed on demand through SQL joins, views, and reporting tools.

#### 🎨 Figure Suggestions

Figure 7.7: A two-column visual: on the left, the flat grading table with redundant cells highlighted; on the right, the seven normalized tables arranged like cards, with key columns marked and lines showing how a SQL join would reassemble the original report.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 7.7 The Normalized Grading Database

After applying 1NF, 2NF, and 3NF, the Grading Database can be organized into focused tables. This section uses the same seven-table design introduced in Chapter 6, now explained through the lens of normalization.

### 7.7.1 Seven-Table Schema

| Table | Purpose |
|---|---|
| `STUDENT` | Stores student identity and contact information |
| `ASSIGNMENT_TYPE` | Stores grading categories and category-level rules |
| `DELIVERABLE` | Stores specific deliverables such as Quiz 1 or Exam 1 |
| `STUDENT_GRADE` | Stores one student's score on one deliverable |
| `SCHEDULE` | Stores class meeting dates, topics, and formats |
| `ATTENDANCE` | Stores whether a student attended one class meeting |
| `GRADE_SCALE` | Stores final letter-grade thresholds |

### 7.7.2 Schema Notation

```text
STUDENT(StudentID, FirstName, LastName, Email, Birthday)

ASSIGNMENT_TYPE(AssignmentType, Quantity, PointsPerType, Weight, WeightPerItem)

DELIVERABLE(DeliverableID, AssignmentType, DeliverableNumber, DueDate, Topic)

STUDENT_GRADE(GradeID, StudentID, DeliverableID, Score)

SCHEDULE(ClassNum, Week, ClassDate, Topic, Format)

ATTENDANCE(AttendanceID, StudentID, ClassNum, Attended)

GRADE_SCALE(LetterGrade, MinScore, MaxScore)
```

In the early flat-table examples, `CategoryWeight` names the business idea plainly. In the schema shorthand, Chapter 6 uses `Weight` for the same category-level rule.

### 7.7.3 How the Tables Connect

| Relationship | Meaning |
|---|---|
| `ASSIGNMENT_TYPE.AssignmentType` -> `DELIVERABLE.AssignmentType` | One assignment type can have many deliverables |
| `STUDENT.StudentID` -> `STUDENT_GRADE.StudentID` | One student can have many grade records |
| `DELIVERABLE.DeliverableID` -> `STUDENT_GRADE.DeliverableID` | One deliverable can have many student scores |
| `STUDENT.StudentID` -> `ATTENDANCE.StudentID` | One student can have many attendance records |
| `SCHEDULE.ClassNum` -> `ATTENDANCE.ClassNum` | One class meeting can have many attendance records |

### 7.7.4 Why This Design Is Better

| Problem in the Flat Table | Normalized Solution |
|---|---|
| Student emails repeat in every grade row | Store student information once in `STUDENT` |
| Due dates repeat for every student | Store deliverable details once in `DELIVERABLE` |
| Category rules repeat across deliverables | Store rules once in `ASSIGNMENT_TYPE` |
| Scores mix with student and deliverable facts | Store scores in `STUDENT_GRADE` |
| Attendance mixes with grades | Store attendance in `ATTENDANCE` |
| Letter-grade rules may repeat or be hard-coded | Store thresholds in `GRADE_SCALE` |

Normalization does not make the data disappear. It moves each fact to the table where it belongs.

#### 🎨 Figure Suggestions

Figure 7.8: An entity-relationship diagram of the seven-table grading schema with primary keys, foreign keys, and crow's-foot notation showing the cardinality of each relationship.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 7.8 Normalization and Analytics

A common worry is that normalization makes reporting harder. The reality is more nuanced.

<div class="callout business-insight">
  <p><strong>📊 Business Insight: Storage and presentation are different jobs</strong></p>
  <p>Normalization makes storage cleaner. SQL, views, and BI tools make presentation convenient. A well-designed database stores facts in normalized tables and serves reports through joins and views.</p>
</div>

### 7.8.1 Example: Student Average Scores

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       ROUND(AVG(sg.Score), 2) AS AverageScore
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
GROUP BY s.StudentID, s.FirstName, s.LastName
ORDER BY AverageScore DESC;
```

This query uses normalized tables to calculate a student-level summary.

### 7.8.2 Example: Weighted Contribution

```sql
SELECT s.FirstName,
       s.LastName,
       at.AssignmentType,
       d.DeliverableNumber,
       sg.Score,
       at.WeightPerItem,
       ROUND(sg.Score * at.WeightPerItem / 100.0, 2) AS WeightedContribution
FROM STUDENT AS s
JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
JOIN DELIVERABLE AS d
  ON sg.DeliverableID = d.DeliverableID
JOIN ASSIGNMENT_TYPE AS at
  ON d.AssignmentType = at.AssignmentType;
```

This example shows why normalized structure is useful. The score comes from `STUDENT_GRADE`, the assignment category comes from `DELIVERABLE`, and the weight rule comes from `ASSIGNMENT_TYPE`.

### 7.8.3 Example: Missing Grades

To find students who do not yet have a score for a deliverable, analysts often need a list of expected student-deliverable combinations.

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       d.DeliverableID,
       d.AssignmentType,
       d.DeliverableNumber
FROM STUDENT AS s
CROSS JOIN DELIVERABLE AS d
LEFT JOIN STUDENT_GRADE AS sg
  ON s.StudentID = sg.StudentID
 AND d.DeliverableID = sg.DeliverableID
WHERE sg.GradeID IS NULL
ORDER BY s.LastName, d.AssignmentType, d.DeliverableNumber;
```

This query is more advanced, but the idea is simple: compare what should exist with what actually exists. That is the bridge from clean storage to useful analysis.

#### 🎨 Figure Suggestions

Figure 7.9: A layered diagram with three labeled layers, from bottom to top: normalized tables, SQL joins and views, and dashboards or reports. Arrows show data flowing upward and queries flowing downward.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 7.9 Denormalization: When Redundancy Is Intentional

### 7.9.1 Definition

**Denormalization** is the intentional reintroduction of redundancy into a database or reporting layer to improve performance, simplify reporting, or support a specific operational need.

Denormalization should happen **after** a normalized design exists, not instead of normalization.

### 7.9.2 Appropriate Examples

| Denormalized Structure | Why It Might Be Useful |
|---|---|
| A summary table of daily sales totals | Speeds up dashboard loading |
| A cached current GPA field | Avoids recalculating a common metric repeatedly |
| A materialized view of customer order history | Improves reporting performance |
| A reporting table combining student, deliverable, and score data | Helps BI tools read a simpler structure |

### 7.9.3 Risk of Denormalization

Denormalization creates a synchronization problem. If a fact is stored in more than one place, the system must keep those copies consistent.

For example, if `AverageScore` is stored in a student summary table, it must be refreshed whenever `STUDENT_GRADE` changes. Otherwise, the summary becomes stale.

<div class="callout warning">
  <p><strong>⚠️ Warning: Denormalize on purpose, not by accident</strong></p>
  <p>Denormalization is an optimization strategy, not an excuse for messy design. Normalize first, then add controlled redundancy only when the performance or reporting benefit clearly outweighs the synchronization cost.</p>
</div>

#### 🎨 Figure Suggestions

Figure 7.10: A scale or balance graphic with "Storage integrity" on one side and "Reporting speed" on the other, illustrating that denormalization shifts weight toward speed at the cost of integrity if not managed carefully.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## 7.10 Common Normalization Mistakes

| Mistake | Why It Causes Problems | Better Approach |
|---|---|---|
| Storing lists in one cell | Hard to filter, count, or join | Store one value per row |
| Creating `Quiz1`, `Quiz2`, `Quiz3` columns | New deliverables require new columns | Store deliverables as rows |
| Repeating student names in grade rows | Updates become inconsistent | Store student facts in `STUDENT` |
| Storing category rules in each deliverable row | Rule changes require many edits | Store rules in `ASSIGNMENT_TYPE` |
| Storing letter grades in every grade row | Derived labels become stale | Store numeric score and use `GRADE_SCALE` |
| Using reports as base tables | Presentation needs distort storage design | Store normalized facts and build views |

#### 🎨 Figure Suggestions

Figure 7.11: A quick-reference card listing each common mistake on the left and a small visual of the better approach on the right, designed so students can scan it before a design exercise.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Key Concepts

### Foundational Ideas

- **Normalization** is a design discipline for placing facts in the right tables.
- **Redundancy** creates inconsistency risk when repeated facts are updated unevenly.
- **Modification anomalies** are predictable symptoms of poor structure.
- **Functional dependencies** describe which attributes determine other attributes.
- **Normal forms** are cumulative design checks: 1NF, then 2NF, then 3NF.
- **Junction tables** represent many-to-many relationships and often store facts about the relationship itself.
- **Views** allow normalized storage to support flat, report-friendly outputs.

### Normal Form Summary

| Normal Form | Rule | Example Violation | Fix |
|---|---|---|---|
| **1NF** | Each cell contains one value; no repeating groups | `Grades = "90, 85, 88"` | Store each grade as a separate row |
| **2NF** | Every non-key attribute depends on the whole key | `FirstName` depends only on `StudentID` in a composite-key table | Move student facts to `STUDENT` |
| **3NF** | Non-key attributes depend only on the key | `LetterGrade` depends on `Score` | Move grading rules to `GRADE_SCALE` |

### Practical Design Checklist

Before accepting a table design, ask:

1. Does each row represent one kind of thing?
2. Does each cell contain one value?
3. Is there a clear primary key?
4. Does every non-key attribute depend on the key?
5. If the key is composite, does every non-key attribute depend on the whole key?
6. Does any non-key attribute depend on another non-key attribute?
7. Are lookup rules or category definitions stored once?
8. Can the original report be recreated with joins or views?

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Chapter Summary

This chapter explained how normalization turns a working relational design into a reliable one. Chapter 6 introduced the idea of connected tables; Chapter 7 showed how to test and improve those tables by asking where each fact belongs.

The chapter began with a flat grading table that looked useful but mixed student facts, deliverable facts, grading rules, and score facts in one structure. That design created redundancy and led to update, insertion, and deletion anomalies. Functional dependencies then provided the reasoning tool needed to diagnose the structure.

First Normal Form required each cell to contain one value and removed repeating groups. Second Normal Form removed partial dependencies from composite-key tables by separating student facts, deliverable facts, and score facts. Third Normal Form removed transitive dependencies by separating rule-based and lookup data, such as assignment-type rules and grade-scale thresholds.

The chapter also showed how normalized storage supports analysis. SQL joins, views, and reporting layers allow users to see convenient flat outputs while the underlying database remains clean and trustworthy. Finally, the chapter explained that denormalization can be useful in controlled situations, but only after the normalized design is understood.

Normalization is not about making databases more complicated. It is about making them safer, clearer, and easier to maintain as real organizational data changes over time.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Looking Ahead

Chapter 8 reviews and integrates the first half of the course. You will revisit data fundamentals, database structure, SQL basics, keys, relationships, and normalization as one connected system.

Chapter 9 then returns to SQL in a richer way, using the normalized Grading Database to answer more advanced questions across multiple related tables.

Chapter 10 moves from querying normalized databases to designing database systems from business requirements.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## References

Codd, E. F. (1970). A relational model of data for large shared data banks. *Communications of the ACM, 13*(6), 377-387.

Connolly, T., & Begg, C. (2015). *Database systems: A practical approach to design, implementation, and management* (6th ed.). Pearson.

Date, C. J. (2004). *An introduction to database systems* (8th ed.). Pearson.

Elmasri, R., & Navathe, S. B. (2016). *Fundamentals of database systems* (7th ed.). Pearson.

Hoffer, J. A., Venkataraman, R., & Topi, H. (2019). *Modern database management* (13th ed.). Pearson.

Laudon, K. C., & Laudon, J. P. (2024). *Management information systems: Managing the digital firm* (18th ed.). Pearson.
