<!-- markdownlint-disable MD036 -->
<!-- metadata: date="2026-05-24" -->

## Let's Build

The main chapter built the first three tables of the Grading Database in Access — `STUDENT`, `DELIVERABLE`, and `STUDENT_GRADE` — and showed how referential integrity stops orphan rows. This Let's Build extends that work to the full seven-table schema, adds the four new relationships, and then writes the three queries from §8 inside Access: a weighted-contribution join, an attendance summary with `LEFT JOIN`, and a missing-grades anti-join that uses `CROSS JOIN` and `LEFT JOIN ... WHERE IS NULL`. By the end you will have a complete relational Grading Database that mirrors the §7 ERD and three saved queries that prove the design works. There is no submission for this Let's Build — the graded transfer happens in **Lab 06 — Building the PetVax Relational Database**, where you rebuild this logic for a veterinary clinic.

### Purpose

Make the §7 seven-table Grading Database real in Access, enforce referential integrity on every parent-child link, and run the §8 queries against the live tables so the relational design pays off in front of you.

### What You Will Practice

- Extending an existing Access database without breaking the relationships already drawn.
- Matching foreign-key data types to parent primary-key types (the most common Access error).
- Drawing one-to-many relationships and enforcing referential integrity in the Relationships window.
- Writing multi-table joins in Query Design View and inspecting the generated SQL.
- Using `LEFT JOIN` two different ways: to keep the left side, and as the core of an anti-join.
- Reading `CROSS JOIN` as the way to enumerate the universe of expected combinations.

### Before You Begin

You should have the `.accdb` from the main chapter §9 walkthrough open, with three tables already created and populated:

- `STUDENT` with the four students `S1001` Alice, `S1002` Brian, `S1003` Carla, `S1004` Daniel.
- `DELIVERABLE` (empty or partly populated).
- `STUDENT_GRADE` (empty or partly populated).
- Two relationship lines already drawn: `STUDENT` → `STUDENT_GRADE` and `DELIVERABLE` → `STUDENT_GRADE`, both with **Enforce Referential Integrity** checked.

If your instructor provides `gradingdb-ch06-starter.accdb`, use that file — it already contains the three tables and two relationships above. Otherwise, complete the §9 walkthrough first. Save your working copy as `gradingdb-ch06.accdb`. Plan about 75–90 minutes; the four new tables and three queries can be split across two sittings if needed.

:::callout{type="takeaway" title="💡 What changed from Chapter 4?"}
In Chapter 4, you used Access to create a working database. In Chapter 6, you use Access to create a *relational design*. The difference is not the software — it is that related facts now live in separate tables and are connected through enforced relationships.
:::

### Starting State Checklist

Before continuing, confirm your database matches every row below. Most later errors come from starting with mismatched field types.

| Check | Expected |
|-------|----------|
| Table exists | `STUDENT` |
| Table exists | `DELIVERABLE` |
| Table exists | `STUDENT_GRADE` |
| `STUDENT.StudentID` data type | Short Text |
| `DELIVERABLE.DeliverableID` data type | AutoNumber |
| `STUDENT_GRADE.StudentID` data type | Short Text |
| `STUDENT_GRADE.DeliverableID` data type | Number / Long Integer |
| Relationship exists | `STUDENT` → `STUDENT_GRADE` |
| Relationship exists | `DELIVERABLE` → `STUDENT_GRADE` |
| Referential integrity | Enforced on both relationships |

If any row does not match, fix it before continuing.

### Seed the Deliverables and Grades

Before adding new tables, populate `DELIVERABLE` and `STUDENT_GRADE` so the later queries have data to work with. Open `DELIVERABLE` and enter five rows. `DeliverableID` is AutoNumber, so Access assigns 1–5 in order:

| AssignmentType | DeliverableNumber | DueDate    | Topic           |
|----------------|------------------:|------------|-----------------|
| Quiz           | 1                 | 2026-09-10 | Database Basics |
| Quiz           | 2                 | 2026-09-17 | SQL Basics      |
| Homework       | 1                 | 2026-09-24 | Entity Design   |
| Exam           | 1                 | 2026-10-05 | Midterm         |
| Project        | 1                 | 2026-11-05 | Final Project   |

Then open `STUDENT_GRADE` and enter eight rows. Leave `GradeID` blank (AutoNumber):

| StudentID | DeliverableID | Score |
|-----------|--------------:|------:|
| S1001     | 1             | 90    |
| S1001     | 2             | 95    |
| S1001     | 4             | 87    |
| S1002     | 1             | 75    |
| S1002     | 2             | 79    |
| S1003     | 3             | 95    |
| S1003     | 4             | 91    |
| S1004     | 5             | 89    |

**Expected state:** 5 rows in `DELIVERABLE`, 8 rows in `STUDENT_GRADE`. Notice that not every student has a score on every deliverable — that gap is what the anti-join in the last query will surface.

### Add the ASSIGNMENT_TYPE Table

Create a new table in **Create → Table Design**. This table stores category-level grading rules once, so they no longer repeat in every deliverable row.

| Field            | Data Type  | Notes                |
|------------------|------------|----------------------|
| `AssignmentType` | Short Text | Primary key (natural key — the category name itself) |
| `Quantity`       | Number     | Required             |
| `PointsPerType`  | Number     | Required             |
| `Weight`         | Number     | Required (percent of final grade) |
| `WeightPerItem`  | Number     | Required (`Weight` ÷ `Quantity`) |

Select `AssignmentType` and click the key icon to set it as the primary key. Save as `ASSIGNMENT_TYPE`. Enter the four category rows from the chapter:

| AssignmentType | Quantity | PointsPerType | Weight | WeightPerItem |
|----------------|---------:|--------------:|-------:|--------------:|
| Quiz           | 4        | 100           | 20     | 5             |
| Homework       | 3        | 100           | 30     | 10            |
| Exam           | 2        | 100           | 40     | 20            |
| Project        | 1        | 100           | 10     | 10            |

**Expected output:** four rows. The category rules now live in exactly one place.

### Add the SCHEDULE Table

Class meetings deserve their own table because attendance attaches to them. Create another table in Design View:

| Field        | Data Type  | Notes                                            |
|--------------|------------|--------------------------------------------------|
| `ClassNum`   | Number     | Primary key (manually entered, not AutoNumber, so the values match what you reference in `ATTENDANCE`) |
| `Week`       | Number     | Required                                         |
| `ClassDate`  | Date/Time  | Required                                         |
| `Topic`      | Short Text | Optional                                         |
| `Format`     | Short Text | Optional                                         |

Save as `SCHEDULE` and enter four meetings:

| ClassNum | Week | ClassDate  | Topic                | Format    |
|---------:|-----:|------------|----------------------|-----------|
| 1        | 1    | 2026-09-01 | Course Introduction  | In person |
| 2        | 2    | 2026-09-08 | Data and Information | In person |
| 3        | 3    | 2026-09-15 | SQL Basics           | Online    |
| 4        | 4    | 2026-09-22 | Relational Design    | In person |

**Expected output:** four scheduled class meetings.

### Add the ATTENDANCE Table

`ATTENDANCE` is a junction table. It resolves the many-to-many relationship between students and class meetings: one student attends many meetings, and one meeting is attended by many students. Create the table in Design View — and read the data-type warning carefully before saving.

| Field          | Data Type  | Notes                                                  |
|----------------|------------|--------------------------------------------------------|
| `AttendanceID` | AutoNumber | Primary key (surrogate)                                |
| `ClassNum`     | Number, Long Integer | Foreign key → `SCHEDULE.ClassNum`            |
| `StudentID`    | **Short Text** | Foreign key → `STUDENT.StudentID` — must match parent type |
| `Attended`     | Yes/No     | Required                                               |

:::callout{type="warning" title="⚠️ Foreign-key types must match the parent"}
`STUDENT.StudentID` is **Short Text** (values like `S1001`), so the `StudentID` foreign key in `ATTENDANCE` must also be Short Text. `SCHEDULE.ClassNum` is a Number, so the `ClassNum` foreign key in `ATTENDANCE` must be Number (Long Integer). If the types do not match, Access will refuse to draw the relationship in the next step.
:::

Save as `ATTENDANCE`. Enter sixteen rows — every student against every meeting, with some marked absent so the data looks realistic. Leave `AttendanceID` blank:

| ClassNum | StudentID | Attended |
|---------:|-----------|----------|
| 1        | S1001     | Yes      |
| 1        | S1002     | Yes      |
| 1        | S1003     | Yes      |
| 1        | S1004     | No       |
| 2        | S1001     | Yes      |
| 2        | S1002     | No       |
| 2        | S1003     | Yes      |
| 2        | S1004     | Yes      |
| 3        | S1001     | Yes      |
| 3        | S1002     | Yes      |
| 3        | S1003     | Yes      |
| 3        | S1004     | Yes      |
| 4        | S1001     | No       |
| 4        | S1002     | Yes      |
| 4        | S1003     | Yes      |
| 4        | S1004     | Yes      |

**Expected output:** sixteen attendance rows.

### Add the GRADE_SCALE Lookup Table

The grade scale converts a final numeric grade into a letter. It is a small reference table that does not connect to anything yet — Chapter 12 will use it in range queries.

| Field         | Data Type  | Notes              |
|---------------|------------|--------------------|
| `LetterGrade` | Short Text | Primary key        |
| `MinScore`    | Number     | Required           |
| `MaxScore`    | Number     | Required           |

Save as `GRADE_SCALE` and enter five rows:

| LetterGrade | MinScore | MaxScore |
|-------------|---------:|---------:|
| A           | 90       | 100      |
| B           | 80       | 89       |
| C           | 70       | 79       |
| D           | 60       | 69       |
| F           | 0        | 59       |

**Expected output:** five letter-grade bands. Policy now lives in one place. This simplified scale uses five broad bands; a later chapter may refine it into plus/minus grades.

### Wire the New Relationships

Close every open table — Access will not let you edit relationships while a child table is open. Then open **Database Tools → Relationships** and add `ASSIGNMENT_TYPE`, `SCHEDULE`, and `ATTENDANCE` to the layout next to your existing three tables.

Draw three new relationships. For each one, check **Enforce Referential Integrity**.

:::callout{type="warning" title="⚠️ Do not check Cascade Delete"}
Leave **Cascade Update** and **Cascade Delete** unchecked in this build. Deleting a student should not automatically delete their grade and attendance history — that data is needed for audits, appeals, and reporting (chapter §6.4).
:::

1. Drag `ASSIGNMENT_TYPE.AssignmentType` onto `DELIVERABLE.AssignmentType`. Access can enforce this relationship only because every `AssignmentType` already used in `DELIVERABLE` (Quiz, Homework, Exam, Project) exists in `ASSIGNMENT_TYPE`. If you typed `Homework` as `Home Work` or `Project` as `Projects`, the relationship will fail — fix the typo in `DELIVERABLE` first.
2. Drag `SCHEDULE.ClassNum` onto `ATTENDANCE.ClassNum`.
3. Drag `STUDENT.StudentID` onto `ATTENDANCE.StudentID`.

**Expected output:** five total relationship lines, each labeled **1** on the parent side and **∞** on the child side. `GRADE_SCALE` sits unconnected for now — that is fine.

| Parent table     | Child table     | Relationship |
|------------------|-----------------|--------------|
| `STUDENT`        | `STUDENT_GRADE` | 1 → many     |
| `DELIVERABLE`    | `STUDENT_GRADE` | 1 → many     |
| `ASSIGNMENT_TYPE`| `DELIVERABLE`   | 1 → many (new) |
| `SCHEDULE`       | `ATTENDANCE`    | 1 → many (new) |
| `STUDENT`        | `ATTENDANCE`    | 1 → many (new) |

### Test Referential Integrity

The Relationships window is now doing work. Prove it with three insert attempts that should all fail. Open the target table, try to add the bad row, and watch Access reject it. Cancel each row after the error message.

| Try inserting into | Bad value                          | Why it should fail |
|--------------------|------------------------------------|--------------------|
| `ATTENDANCE`       | `ClassNum = 99`, `StudentID = S1001` | `ClassNum 99` does not exist in `SCHEDULE`. |
| `ATTENDANCE`       | `ClassNum = 1`, `StudentID = 'S9999'` | `S9999` does not exist in `STUDENT`. |
| `DELIVERABLE`      | `AssignmentType = 'Lab'`             | `Lab` does not exist in `ASSIGNMENT_TYPE`. |

**Expected output:** three "You cannot add or change a record because a related record is required..." error dialogs. The model from §6 is now enforced by the DBMS.

### Query 1 — Weighted Contribution per Score

This is the four-table join from §8.3. It joins each grade to its student, to its deliverable, and to the deliverable's category rules — then multiplies score by per-item weight to show how much each score contributes to the final grade.

Open **Create → Query Design** and add `STUDENT`, `STUDENT_GRADE`, `DELIVERABLE`, and `ASSIGNMENT_TYPE`. Access draws the join lines automatically from the relationships you defined. Drag these fields into the grid:

| Table              | Field                |
|--------------------|----------------------|
| `STUDENT`          | `FirstName`          |
| `STUDENT`          | `LastName`           |
| `DELIVERABLE`      | `AssignmentType`     |
| `DELIVERABLE`      | `DeliverableNumber`  |
| `STUDENT_GRADE`    | `Score`              |
| `ASSIGNMENT_TYPE`  | `WeightPerItem`      |

Add one calculated column in an empty Field cell:

```text
WeightedContribution: Round([Score]*[WeightPerItem]/100,2)
```

Sort by `LastName` then `DueDate`. Save as `qryWeightedContribution`. Switch to **SQL View** and Access will show roughly:

```sql
SELECT STUDENT.FirstName, STUDENT.LastName,
       DELIVERABLE.AssignmentType, DELIVERABLE.DeliverableNumber,
       STUDENT_GRADE.Score, ASSIGNMENT_TYPE.WeightPerItem,
       Round([Score]*[WeightPerItem]/100,2) AS WeightedContribution
FROM ASSIGNMENT_TYPE
INNER JOIN (DELIVERABLE
INNER JOIN (STUDENT
INNER JOIN STUDENT_GRADE ON STUDENT.StudentID = STUDENT_GRADE.StudentID)
ON DELIVERABLE.DeliverableID = STUDENT_GRADE.DeliverableID)
ON ASSIGNMENT_TYPE.AssignmentType = DELIVERABLE.AssignmentType;
```

**Expected output:** eight rows, one per recorded score. A few examples:

| FirstName | LastName | AssignmentType | Score | WeightPerItem | WeightedContribution |
|-----------|----------|----------------|------:|--------------:|---------------------:|
| Alice     | Johnson  | Quiz           | 90    | 5             | 4.5                  |
| Alice     | Johnson  | Quiz           | 95    | 5             | 4.75                 |
| Alice     | Johnson  | Exam           | 87    | 20            | 17.4                 |
| Brian     | Lee      | Quiz           | 75    | 5             | 3.75                 |
| Daniel    | Kim      | Project        | 89    | 10            | 8.9                  |

The category rule lives once in `ASSIGNMENT_TYPE` and is applied wherever it is needed. That is the payoff of separated storage.

### Query 2 — Attendance Summary with LEFT JOIN

This is §8.4. It counts how many class meetings each student attended. The `LEFT JOIN` matters: it keeps students in the result even if they have no attendance rows yet — useful when looking for students whose attendance was never recorded.

Open **Create → Query Design** and add `STUDENT` and `ATTENDANCE`. Right-click the join line between them, choose **Join Properties**, and pick option 2: *Include ALL records from `STUDENT` and only those records from `ATTENDANCE` where the joined fields are equal.* That is a `LEFT JOIN`.

Add fields:

| Table        | Field       |
|--------------|-------------|
| `STUDENT`    | `StudentID` |
| `STUDENT`    | `FirstName` |
| `STUDENT`    | `LastName`  |
| `ATTENDANCE` | `Attended`  |

Click the **Totals** (Σ) button on the ribbon. Set the first three fields to **Group By**. For `Attended`, switch the cell to **Expression** and replace the field with:

```text
ClassesAttended: Nz(Sum(IIf([Attended]=Yes,1,0)),0)
```

:::callout{type="note" title="📝 Why the IIf and Nz wrappers"}
Access stores `Yes` internally as `-1` and `No` as `0`. A naked `Sum([Attended])` returns a negative number, so `IIf([Attended]=Yes,1,0)` converts each Yes to `+1`. The outer `Nz(...,0)` turns a missing sum into `0`, which is what you want for a student who has no attendance rows at all.
:::

Save as `qryAttendanceSummary`. **Expected output:**

| StudentID | FirstName | LastName | ClassesAttended |
|-----------|-----------|----------|----------------:|
| S1001     | Alice     | Johnson  | 3               |
| S1002     | Brian     | Lee      | 3               |
| S1003     | Carla     | Mendez   | 4               |
| S1004     | Daniel    | Kim      | 3               |

One row per student, even though some students were marked absent for some meetings. If a student had zero attendance rows at all, the `LEFT JOIN` would still return their name with `ClassesAttended = 0`.

### Query 3 — Find Missing Grades (CROSS JOIN + Anti-Join, Stretch)

> **Stretch query — read slowly.** This is the most advanced query in Chapter 6. The chapter (§8.5) explicitly hands it off to this Let's Build because it is the analytical payoff of separated storage. Take your time; the three-move breakdown below makes it readable.

This query answers: *which student-deliverable combinations do not yet have a score?* You cannot answer that by looking only at `STUDENT_GRADE`, because `STUDENT_GRADE` does not contain the missing rows; that is the whole point. You have to *generate* the expected universe first, then subtract what exists.

Build it in three moves.

**Move 1 — Enumerate the universe with `CROSS JOIN`.** A `CROSS JOIN` pairs every row of one table with every row of another. No `ON` clause, no matching condition — just every combination. `STUDENT` (4 rows) × `DELIVERABLE` (5 rows) = 20 expected pairs. That is the full set of scores that *could* exist.

**Move 2 — Attach what's actually there with `LEFT JOIN`.** A `LEFT JOIN` keeps every row on the left and fills in `NULL` on the right where there is no match. Joining the 20 expected pairs to `STUDENT_GRADE` on both `StudentID` and `DeliverableID` attaches a `GradeID` where a score was recorded and leaves `GradeID = NULL` where it was not.

**Move 3 — Keep only the empty ones with `WHERE ... IS NULL`.** This flips the `LEFT JOIN` from "show everything" into "show only the gaps." That pattern — `LEFT JOIN ... WHERE right_side IS NULL` — is called an **anti-join**. It returns "everything on the left that has no match on the right."

Open **Create → Query Design**. Add `STUDENT`, `DELIVERABLE`, and `STUDENT_GRADE`. Delete the join lines Access draws automatically — you will write the joins yourself in SQL. Switch to **SQL View** and replace the query with:

```sql
SELECT STUDENT.StudentID,
       STUDENT.FirstName,
       STUDENT.LastName,
       DELIVERABLE.DeliverableID,
       DELIVERABLE.AssignmentType,
       DELIVERABLE.DeliverableNumber
FROM (STUDENT, DELIVERABLE)
LEFT JOIN STUDENT_GRADE
       ON STUDENT.StudentID = STUDENT_GRADE.StudentID
      AND DELIVERABLE.DeliverableID = STUDENT_GRADE.DeliverableID
WHERE STUDENT_GRADE.GradeID IS NULL
ORDER BY STUDENT.LastName, DELIVERABLE.DueDate;
```

The `FROM (STUDENT, DELIVERABLE)` comma is Access's way of writing a cross join. Standard SQL and SQLite prefer the explicit keyword `CROSS JOIN` — same result. Save as `qryMissingGrades`.

**Expected output:** 20 − 8 = **12 rows**, one per missing pair. A few examples:

| StudentID | LastName | AssignmentType | DeliverableNumber |
|-----------|----------|----------------|------------------:|
| S1001     | Johnson  | Homework       | 1                 |
| S1001     | Johnson  | Project        | 1                 |
| S1004     | Kim      | Quiz           | 1                 |
| S1004     | Kim      | Quiz           | 2                 |
| S1002     | Lee      | Homework       | 1                 |
| S1002     | Lee      | Exam           | 1                 |

A flat single-table gradebook cannot answer this cleanly because the missing rows simply are not there. The relational design plus a cross join makes the gaps visible.

### Check Your Work

| Check                                            | Expected           |
|--------------------------------------------------|--------------------|
| Tables in the database                           | 7                  |
| Rows in `STUDENT` / `ASSIGNMENT_TYPE` / `DELIVERABLE` / `STUDENT_GRADE` | 4 / 4 / 5 / 8 |
| Rows in `SCHEDULE` / `ATTENDANCE` / `GRADE_SCALE` | 4 / 16 / 5         |
| Relationship lines with RI enforced              | 5                  |
| `S9999` insert into `ATTENDANCE`                 | Rejected           |
| `ClassNum = 99` insert into `ATTENDANCE`         | Rejected           |
| `AssignmentType = 'Lab'` insert into `DELIVERABLE` | Rejected         |
| `qryWeightedContribution` rows                   | 8                  |
| `qryAttendanceSummary` rows                      | 4                  |
| `qryMissingGrades` rows                          | 12                 |

### One Table, One Subject

Before the takeaway, look at what each table now stores. Every row in this map represents a different *kind* of fact, which is why each row earned its own table.

| Table             | One subject stored               |
|-------------------|----------------------------------|
| `STUDENT`         | Student identity                 |
| `ASSIGNMENT_TYPE` | Grading category rules           |
| `DELIVERABLE`     | Specific assignments             |
| `STUDENT_GRADE`   | Student scores on deliverables   |
| `SCHEDULE`        | Class meetings                   |
| `ATTENDANCE`      | Student-class attendance records |
| `GRADE_SCALE`     | Letter-grade policy              |

### What This Shows

You did more than add tables. You separated subjects. Student identity lives in `STUDENT`, category rules in `ASSIGNMENT_TYPE`, deliverables in `DELIVERABLE`, scores in `STUDENT_GRADE`, meetings in `SCHEDULE`, attendance in `ATTENDANCE`, and grading policy in `GRADE_SCALE`. Two of those tables — `STUDENT_GRADE` and `ATTENDANCE` — are junction tables that resolve many-to-many relationships into pairs of one-to-many. The three saved queries prove the design works: `INNER JOIN` reconstructs a report from separated tables, `LEFT JOIN` keeps the left side when the right side is absent, and `CROSS JOIN` paired with an anti-join surfaces records that *should* exist but do not. None of those queries are easy to write against a flat table.

### Common Mistakes

- **Foreign-key type mismatch.** `STUDENT.StudentID` is Short Text, so every `StudentID` foreign key must also be Short Text. `DeliverableID` and `ClassNum` follow the same rule. Access refuses to draw the relationship line if the types disagree.
- **Trying to open Relationships with a table open.** Close every datasheet first or some relationship changes will silently fail to save.
- **Checking Cascade Delete by reflex.** This is rarely what you want. Deleting a student should not erase their attendance and grade history.
- **Naked `Sum([Attended])` returning negatives.** Access stores Yes as `-1`. Use `Sum(IIf([Attended]=Yes,1,0))` instead.
- **Missing a column from `GROUP BY`.** When using the Totals row, every non-aggregated column must be set to `Group By` or Access will refuse to run the query.
- **Expecting `qryMissingGrades` to return rows once every student has a score.** It will return zero rows — that means the grading is complete, not that the query is broken.

### Submit or Save

There is no graded submission for this Let's Build. To preserve your work for Lab 06:

1. Save the database as `gradingdb-ch06.accdb`.
2. Export the Relationships window as a PDF: open **Database Tools → Relationships → Relationship Report**, then **File → Save As → PDF** as `gradingdb-ch06-erd.pdf`.
3. Confirm the three saved queries are present: `qryWeightedContribution`, `qryAttendanceSummary`, `qryMissingGrades`.

The graded transfer of this design lives in **Lab 06 — Building the PetVax Relational Database**, where you rebuild the same logic — separated subjects, junction tables, enforced relationships, and the three-query pattern — against the PetVax veterinary clinic.

### Peek Ahead — Chapter 7

The seven tables are well-separated, but separation alone is not the same as good design. Each table still needs a stricter check: does every non-key column depend on the *whole* primary key and nothing else? That check is **normalization**, and Chapter 7 walks the Grading Database through 1NF, 2NF, and 3NF using the functional dependencies introduced in §10 of this chapter. The relational model gives you tables and keys. Normalization tells you whether the tables and keys you chose are the right ones.
