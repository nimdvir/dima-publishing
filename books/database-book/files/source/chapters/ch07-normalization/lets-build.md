<!-- Let's Build 07 created 2026-06-16: moved hands-on SQL + Access content from Ch07 main appendix into a guided LB using the Grading Database, and appended Midterm Review from Ch08. Companion lab placeholder: Lab 07 — Normalizing a Veterinary Clinic Database. -->

## Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>
Chapter 7 explained that normalization is a way of thinking about <em>where each fact belongs</em>. In this Let's Build (LB) you turn that thinking into action: you take a single flat grading table, split it into four normalized tables in Access, connect those tables with enforced relationships, and rebuild the original report using SQL. Because this chapter marks the end of the first half of the course, this section also includes a Midterm Review wrap-up. The work you do here is the source material for <strong>Lab 07 — Normalizing a Veterinary Clinic Database</strong>.
</p>

### Purpose

Move from reading about 1NF, 2NF, and 3NF to building a normalized schema you can defend. By the end you should be able to look at any messy flat table and explain which facts belong together, which belong apart, and how to reconstruct a report without storing the same fact twice. You will also consolidate your knowledge of chapters 1 through 7 into a single framework before the midterm.

### What You Will Practice

- Diagnosing redundancy and update, insertion, and deletion anomalies in a flat table.
- Designing four normalized tables in Access (`STUDENT`, `ASSIGNMENT_TYPE`, `DELIVERABLE`, `STUDENT_GRADE`).
- Writing append (`INSERT INTO ... SELECT`) queries in Access SQL View to migrate data from a flat source.
- Creating relationships in the Relationships window and enforcing referential integrity.
- Reconstructing a flat report with an `INNER JOIN` query across four tables.
- Synthesizing database concepts through a schema review, query bank, and concept map.

### Before You Begin

You need:

- Microsoft Access (any recent version).
- A starter Access file or Excel workbook containing one table named `GRADE_FLAT` that mixes student, deliverable, and score facts in every row. A ready-to-use 25-row starter is provided at [`assets/grade_flat_starter.csv`](assets/grade_flat_starter.csv) — import it into Access (External Data → New Data Source → From File → Text File) and name the table `GRADE_FLAT`.
- About 60–75 minutes of focused time.
- The Chapter 7 reading, especially §7.4–§7.7.
- Earlier notes and queries from Chapters 1–6.

A useful `GRADE_FLAT` looks like this:

| GradeID | StudentID | FirstName | LastName | Email                | AssignmentType | DeliverableNumber | DueDate    | PointsPerOne | Weight | Topic       | Score |
| ------: | --------: | --------- | -------- | -------------------- | -------------- | ----------------: | ---------- | -----------: | -----: | ----------- | ----: |
|       1 |       101 | Alice     | Johnson  | alice@university.edu | Quiz           |                 1 | 2026-09-10 |           20 |     20 | Data basics |    18 |
|       2 |       101 | Alice     | Johnson  | alice@university.edu | Quiz           |                 2 | 2026-09-20 |           20 |     20 | Tables      |    19 |
|       3 |       101 | Alice     | Johnson  | alice@university.edu | Exam           |                 1 | 2026-10-05 |          100 |     30 | Midterm     |    87 |
|       4 |       102 | Bob       | Smith    | bob@university.edu   | Quiz           |                 1 | 2026-09-10 |           20 |     20 | Data basics |    15 |
|       5 |       102 | Bob       | Smith    | bob@university.edu   | Quiz           |                 2 | 2026-09-20 |           20 |     20 | Tables      |    17 |

> 💡 **Tip:** If your starter file uses `DeliverableType` rather than `AssignmentType`, rename it consistently before you begin so the SQL examples below run unchanged.

### Diagnose the Flat Table

Open `GRADE_FLAT` in Datasheet View and read it row by row before you touch a thing.

**What facts are repeated, and where should each one live?**

| Repeated fact            | Where it repeats                           | Better home       |
| ------------------------ | ------------------------------------------ | ----------------- |
| Student name and email   | Every grade row for the same student       | `STUDENT`         |
| Assignment category rule | Every row for the same `AssignmentType`    | `ASSIGNMENT_TYPE` |
| Deliverable due date     | Every student row for the same deliverable | `DELIVERABLE`     |
| Score                    | One row per student-deliverable pairing    | `STUDENT_GRADE`   |

**Expected output:** a short list (in your own notes) of at least three repeated facts and the table each one belongs in. This list is your blueprint for the rest of the LB.

**Check for conflicting facts before you migrate.** Normalization reveals data-quality problems but does not fix them. Before splitting the table, scan `GRADE_FLAT` and ask:

- Does the same `StudentID` always have the same `Email`, `FirstName`, and `LastName`?
- Does the same `AssignmentType` always have the same `PointsPerOne` and `Weight`?
- Does the same deliverable (same `AssignmentType` + `DeliverableNumber`) always have the same `DueDate` and `Topic`?

The provided starter file is clean. In real data, fix any conflicts in `GRADE_FLAT` before running the append queries below — otherwise `SELECT DISTINCT` will silently keep multiple versions of the same fact.

> 📘 **Concept connection:** This is the heart of normalization. Each repeated fact is a sign that the table is mixing *kinds* of facts. 1NF removes multi-valued cells, 2NF removes partial dependencies, 3NF removes transitive dependencies — but the practical effect is always the same: facts move to the table where they belong.

### Create the Four Normalized Tables

In Access, switch to **Create → Table Design** and build four empty tables. Define the primary key and required fields for each one before adding any data.

**Table `STUDENT`**

| Field     | Data type  | Field size / rule            |
| --------- | ---------- | ---------------------------- |
| StudentID | Number     | Long Integer; Primary key    |
| FirstName | Short Text | Required                     |
| LastName  | Short Text | Required                     |
| Email     | Short Text | Indexed: Yes (No Duplicates) |

**Table `ASSIGNMENT_TYPE`**

| Field          | Data type  | Field size / rule      |
| -------------- | ---------- | ---------------------- |
| AssignmentType | Short Text | Primary key            |
| Quantity       | Number     | Long Integer; Optional |
| PointsPerOne   | Number     | Long Integer; Required |
| Weight         | Number     | Long Integer; Required |

**Table `DELIVERABLE`**

| Field             | Data type  | Field size / rule          |
| ----------------- | ---------- | -------------------------- |
| DeliverableID     | AutoNumber | Primary key (Long Integer) |
| AssignmentType    | Short Text | Foreign key                |
| DeliverableNumber | Number     | Long Integer; Required     |
| DueDate           | Date/Time  | Required                   |
| Topic             | Short Text | Optional                   |

**Table `STUDENT_GRADE`**

| Field         | Data type | Field size / rule                             |
| ------------- | --------- | --------------------------------------------- |
| GradeID       | Number    | Long Integer; Primary key (from `GRADE_FLAT`) |
| StudentID     | Number    | Long Integer; Foreign key                     |
| DeliverableID | Number    | Long Integer; Foreign key                     |
| Score         | Number    | Long Integer; Required                        |

**Expected output:** four empty tables visible in the Navigation Pane, each with a key icon next to its primary key field.

> ✅ **Good Practice:** Build the structure first; load the data second. Manually copying columns from `GRADE_FLAT` into the new tables is how data quality gets buried.

> ✅ **Good Practice:** In Access, every foreign key that points to an AutoNumber primary key must be `Number` with **Field Size = Long Integer**. If the sizes do not match exactly, the Relationships window will refuse to enforce referential integrity — often with a vague error. Set this on every ID field before you load data.

### Extract Students

> ⚠️ **Before you run any append query:** Run each append query **once**. If you run the same append query a second time without first clearing the target table, Access will either create duplicate rows or fail with a primary-key violation halfway through. If something goes wrong, open the target table, delete all rows, then re-run the append.

Move student identity facts out of `GRADE_FLAT` and into `STUDENT`.

In Access, choose **Create → Query Design**, close the Show Table dialog, and switch to **SQL View**. Paste:

```sql
INSERT INTO STUDENT (StudentID, FirstName, LastName, Email)
SELECT DISTINCT StudentID, FirstName, LastName, Email
FROM GRADE_FLAT;
```

Save the query as `q01_Append_Students` and run it. Open `STUDENT`.

**Expected output:** one row per unique student. Five `GRADE_FLAT` rows for Alice should collapse to one `STUDENT` row.

> ⚠️ **Common Mistake:** If the same `StudentID` appears with two spellings of an email, the append may succeed but `STUDENT.Email` will hold whichever spelling Access encountered first. That is a data-quality problem in `GRADE_FLAT`, not an Access bug. Fix the source before continuing.

### Extract Assignment Type Rules

Move grading-category rules out of `GRADE_FLAT` and into `ASSIGNMENT_TYPE`.

```sql
INSERT INTO ASSIGNMENT_TYPE (AssignmentType, PointsPerOne, Weight)
SELECT DISTINCT AssignmentType, PointsPerOne, Weight
FROM GRADE_FLAT;
```

Save as `q02_Append_Assignment_Types` and run it.

**Expected output:** one row per category, for example:

| AssignmentType | PointsPerOne | Weight |
| -------------- | -----------: | -----: |
| Quiz           |           20 |     20 |
| Exam           |          100 |     30 |
| Project        |          100 |     20 |

> ⚠️ **Common Mistake:** If `Quiz` appears more than once with different `PointsPerOne` values, the flat table holds contradictory rules. Normalization surfaces the conflict but does not pick a winner — you have to decide which rule is correct and clean `GRADE_FLAT` before re-running the append.

### Create Deliverables

Each specific quiz, exam, or project is a deliverable. **Use Option A** — it matches the provided starter CSV, which has no `DeliverableID` column. Use Option B only if your instructor gave you a `GRADE_FLAT` that already includes a stable `DeliverableID`.

**Option A (default) — let Access generate `DeliverableID` as an AutoNumber:**

```sql
INSERT INTO DELIVERABLE (AssignmentType, DeliverableNumber, DueDate, Topic)
SELECT DISTINCT AssignmentType, DeliverableNumber, DueDate, Topic
FROM GRADE_FLAT;
```

**Option B (advanced) — preserve an existing `DeliverableID` from `GRADE_FLAT`:**

```sql
INSERT INTO DELIVERABLE (DeliverableID, AssignmentType, DeliverableNumber, DueDate, Topic)
SELECT DISTINCT DeliverableID, AssignmentType, DeliverableNumber, DueDate, Topic
FROM GRADE_FLAT;
```

Save as `q03_Append_Deliverables` and run it.

**Expected output:** one row per deliverable (e.g., one row for `Quiz 1`, one for `Quiz 2`, one for `Exam 1`) — not one row per student score.

### Load Student Grades

Now move the score facts. Which append query you use depends on which option you chose in the previous step:

| In `q03_Append_Deliverables` you used...                | Use this `q04` query                                                    |
| ------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Option A** — Access generated `DeliverableID`         | The join version (below) — `GRADE_FLAT` has no `DeliverableID` to copy. |
| **Option B** — `GRADE_FLAT` already had `DeliverableID` | The direct-copy version (below).                                        |

**Direct-copy version (Option B only)** — if `GRADE_FLAT` already has `DeliverableID`:

```sql
INSERT INTO STUDENT_GRADE (GradeID, StudentID, DeliverableID, Score)
SELECT GradeID, StudentID, DeliverableID, Score
FROM GRADE_FLAT;
```

**Join version (Option A default)** — join `GRADE_FLAT` to the new `DELIVERABLE` table to look up the right ID:

```sql
INSERT INTO STUDENT_GRADE (GradeID, StudentID, DeliverableID, Score)
SELECT gf.GradeID,
       gf.StudentID,
       d.DeliverableID,
       gf.Score
FROM GRADE_FLAT AS gf
INNER JOIN DELIVERABLE AS d
   ON gf.AssignmentType    = d.AssignmentType
  AND gf.DeliverableNumber = d.DeliverableNumber
  AND gf.DueDate           = d.DueDate;
```

Save as `q04_Append_Student_Grades` and run it.

**Expected output:** one row per student-per-deliverable. No names, no due dates, no rule columns — only IDs and a score.

> 💡 **Key Takeaway:** `STUDENT_GRADE` is the junction between students and deliverables. It stores a *fact about the relationship*, not facts about either side.

### Build Relationships and Enforce Referential Integrity

Open **Database Tools → Relationships**, add all four tables, then drag the parent primary key onto the matching child foreign key for each pair below. In every Edit Relationships dialog, check **Enforce Referential Integrity** before clicking **Create**.

| Parent                           | Child                         | Meaning                             |
| -------------------------------- | ----------------------------- | ----------------------------------- |
| `STUDENT.StudentID`              | `STUDENT_GRADE.StudentID`     | One student, many grade records     |
| `DELIVERABLE.DeliverableID`      | `STUDENT_GRADE.DeliverableID` | One deliverable, many grade records |
| `ASSIGNMENT_TYPE.AssignmentType` | `DELIVERABLE.AssignmentType`  | One category, many deliverables     |

**Expected output:** a Relationships window that looks like:

```text
ASSIGNMENT_TYPE 1───∞ DELIVERABLE 1───∞ STUDENT_GRADE ∞───1 STUDENT
```

Save the layout and take a screenshot — you will need it for the submission checklist.

> ⚠️ **Common Mistake:** The Access Lookup Wizard creates a friendly dropdown but does **not** replace a real relationship. A lookup field helps data entry; referential integrity protects the database. Use both, but never confuse one for the other.

### Test Referential Integrity

A normalized design should make bad data hard to enter. Prove it.

1. Open `STUDENT_GRADE` in Datasheet View.
2. In a new row, type `StudentID = 9999` (a value that does not exist in `STUDENT`), pick any real `DeliverableID`, and a score.
3. Try to save the row.

**Expected output:** Access refuses the save with a referential-integrity error. Note the exact message in your screenshots.

**Why does that matter?** Without enforced referential integrity, a grade could exist for a student who does not. That is an orphan record, and orphan records are the kind of bug that quietly corrupts every report built on top of them.

### Rebuild the Original Report

Normalization separates storage from presentation. Now show that the original flat report can be reconstructed on demand.

Create a new query and switch to **SQL View**:

```sql
SELECT s.StudentID,
       s.FirstName,
       s.LastName,
       s.Email,
       at.AssignmentType,
       d.DeliverableNumber,
       d.DueDate,
       at.PointsPerOne,
       at.Weight,
       sg.Score
FROM ((STUDENT AS s
       INNER JOIN STUDENT_GRADE AS sg
              ON s.StudentID = sg.StudentID)
       INNER JOIN DELIVERABLE AS d
              ON sg.DeliverableID = d.DeliverableID)
       INNER JOIN ASSIGNMENT_TYPE AS at
              ON d.AssignmentType = at.AssignmentType
ORDER BY s.LastName, s.FirstName, at.AssignmentType, d.DeliverableNumber;
```

Save as `q05_Grade_Report_Normalized` and run it. Access will keep its own parentheses around the joins; that is normal Access SQL, not a mistake.

**Expected output:** a result set that looks like the original `GRADE_FLAT` (student name, email, category, deliverable, due date, points, weight, score), but every fact is now sourced from the table where it belongs.

> 💡 **Tip:** If Access rewrites the parentheses after you save the query, that is normal. If the query refuses to run with a "JOIN expression not supported" error, rebuild it in **Query Design View** first (drag tables, drag join lines), then switch back to SQL View to see the parenthesized join structure Access prefers.

> 💡 **Key Takeaway:** Normalization does not remove the report — it relocates the facts. The query is the report.

### Optional Extension — Add SCHEDULE, ATTENDANCE, GRADE_SCALE

If you finish early, extend the schema to the full seven-table Grading Database introduced in §7.7.

Create three more tables:

```text
SCHEDULE(ClassNum, Week, ClassDate, Topic, Format)
ATTENDANCE(AttendanceID, StudentID, ClassNum, Attended)
GRADE_SCALE(LetterGrade, MinScore, MaxScore)
```

Then add two relationships in the Relationships window:

- `STUDENT.StudentID` → `ATTENDANCE.StudentID`
- `SCHEDULE.ClassNum` → `ATTENDANCE.ClassNum`

Leave `GRADE_SCALE` standalone for now. It is a rule table that translates numeric scores into letter grades; you will join it from a query in Chapter 9, not enforce it as a relationship here.

**Expected output:** a seven-table Relationships window with referential integrity enforced on every line except `GRADE_SCALE`.

### Check Your Work

Walk through this checklist before you save:

| Check                                                      | Pass? |
| ---------------------------------------------------------- | ----- |
| Student names and emails appear only in `STUDENT`          |       |
| Category rules appear only in `ASSIGNMENT_TYPE`            |       |
| Deliverable due dates appear only in `DELIVERABLE`         |       |
| Scores appear only in `STUDENT_GRADE`                      |       |
| All three core relationships enforce referential integrity |       |
| `q05_Grade_Report_Normalized` reproduces the flat report   |       |
| An invalid `StudentID` in `STUDENT_GRADE` is rejected      |       |

### What This Shows

You have now done in Access what the chapter described in prose. Five flat-table rows for Alice became one row in `STUDENT`, three rows in `DELIVERABLE`, two rows in `ASSIGNMENT_TYPE`, and five rows in `STUDENT_GRADE`. No fact was lost; every fact moved to the table where it belongs. The report still exists — it is just reconstructed by `q05` instead of stored as raw rows.

Two ideas to carry forward:

- **Storage and presentation are different jobs.** Tables hold facts; queries and views shape them.
- **Referential integrity is design, not decoration.** Once enforced, the database itself refuses to accept orphan records.

### Midterm Schema Review Checklist

Now that your Grading Database is normalized, verify its overall structure. 

**Does your database meet all of these requirements?**

- Every table has a primary key.
- Every foreign key relationship is defined clearly.
- Referential integrity is enforced where your platform supports it.
- No table contains repeating columns.
- No field stores multiple values in one cell.
- No partial dependencies remain.
- No transitive dependencies remain.
- Field names use a consistent style.
- Table names are clear and professional.

If you answer "no" to any item, write one sentence explaining what still needs to be fixed.

### Midterm Query Bank Review

Return to the business questions from Chapter 1 and rebuild or collect the queries that answer them using your newly normalized database.

**What business question does each query answer, and what SQL features does it rely on?**

For each query, annotate the business question, the tables it uses, the SQL concepts, and the chapter where you first learned that feature. For example:

| Query name               | Business question                           | SQL concepts used                   | First chapter used |
| ------------------------ | ------------------------------------------- | ----------------------------------- | ------------------ |
| `Q1_CurrentGrades`       | What is each student's current performance? | `SELECT`, `JOIN`, `AVG`, `GROUP BY` | Chapter 5          |
| `Q2_AttendanceByStudent` | Who is missing class most often?            | `SELECT`, `JOIN`, calculated field  | Chapter 5          |

### Midterm Concept Map

Create a one-page concept map connecting the major ideas from the first half of the course. 

**How do these terms relate to one another in a real system?**

Your map should include these terms: data, information, database, table, primary key, foreign key, relational model, normalization, SQL, and anomaly. Next to each term, add one concrete example from your Grading Database.

### Practice Explanation

**Why is a primary key different from an ordinary field?**

**Why did the flat-table design become a problem?**

**Why is normalization useful even when it adds more tables?**

**How does SQL help turn stored data into business answers?**

**What is one business risk that appears when database design is sloppy?**

Choose any two of the prompts above and answer them in short paragraphs to practice explaining technical concepts in plain language.

### Optional Peer Review

If peer review is part of your class process, exchange databases or diagrams with a classmate. Give feedback on an unresolved normalization issue, a missing relationship, an unclear naming convention, or a query that is difficult to understand. Keep the feedback specific and respectful.

### Common Mistakes

- Treating a Lookup Wizard dropdown as a real relationship.
- Appending data before defining keys, then discovering duplicates that block the primary key.
- Copying student names into `STUDENT_GRADE` "just in case" — that re-creates the redundancy you just removed.
- Re-running an append query a second time without clearing the target table; you get duplicate rows.
- Forgetting to check **Enforce Referential Integrity** when creating each relationship.

### Submit or Save

Save your Access file as:

```text
LB07_Normalized_Grading_Database_<YourName>.accdb
```

It should contain:

- The original `GRADE_FLAT` table (unchanged).
- The four normalized tables: `STUDENT`, `ASSIGNMENT_TYPE`, `DELIVERABLE`, `STUDENT_GRADE` (plus `SCHEDULE`, `ATTENDANCE`, `GRADE_SCALE` if you completed the extension).
- The five queries: `q01_Append_Students`, `q02_Append_Assignment_Types`, `q03_Append_Deliverables`, `q04_Append_Student_Grades`, `q05_Grade_Report_Normalized`.
- Enforced relationships visible in the Relationships window.

Capture four screenshots and keep them with the file:

1. `GRADE_FLAT` before normalization.
2. The Relationships window with referential integrity enforced.
3. The `q05_Grade_Report_Normalized` result set.
4. The referential-integrity error from the invalid-row test.

**Midterm Review Deliverables:**

- Completed schema checklist.
- Annotated query bank.
- Concept map.
- Short written responses to two review prompts.
- Optional peer review note, if assigned.

There is no LMS submission for this LB. The graded work happens in **Lab 07 — Normalizing a Veterinary Clinic Database**, which transfers the same normalization workflow to the PetVax case.

### Peek Ahead — Chapter 8

Chapter 8 is a dedicated Midterm Review that reinforces the connections you built here. After the midterm, Chapter 9 returns to SQL with multi-table queries, CTEs, and window functions that rely on exactly the design you just produced.
