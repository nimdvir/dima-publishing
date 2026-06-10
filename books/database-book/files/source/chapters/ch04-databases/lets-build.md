## Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

In this Let's Build, you turn the Chapter 4 ideas into a working database. You will create a small grading database in **Microsoft Access** with two tables, a primary key, a validation rule, required fields, a data-entry form, a handful of queries (including one query-level join), and two reports. The companion **Lab 04** applies these same skills to the PetVax veterinary clinic for a grade. The chapter previewed a more relational structure with separate `STUDENT`, `DELIVERABLE`, and `STUDENT_GRADE` tables. This build deliberately stays one step behind that target: it uses a flat `GRADEBOOK` table and a `GRADE_WEIGHT` lookup table, with no formal relationships. That gap is intentional. Chapter 5 will query these same tables with SQL, and Chapter 6 will refactor this design into a proper relational structure.

### Purpose

Make the Chapter 4 concepts concrete by building, inspecting, and querying a real Access database. By the end you should be able to recognize how tables, primary keys, constraints, forms, queries, and reports fit together inside a DBMS, and you should be able to name what this design still does not protect against.

### What You Will Practice

- Defining fields with appropriate data types in Access Design View.
- Setting a primary key.
- Enforcing a validation rule and required fields.
- Entering records into a table and through a form.
- Building single-table queries with the Query Design grid.
- Combining two tables through a query-level join.
- Generating reports from queries.
- Diagnosing the redundancy and anomaly risks that still remain.

### Before You Begin

**Step 1 — Create the database file.**

1. Open **Microsoft Access**.
2. Choose **Blank database**.
3. Name the file `LB04-GradingDatabase-YourName.accdb` (replace `YourName`).
4. Pick a folder where you can find it later and click **Create**.

Access opens an empty database with a blank `Table1`. You will rename it in the next section.

### Build the GRADEBOOK Table

`GRADEBOOK` is a **flat grade-record table**. One row equals one student receiving one score on one deliverable. It is not a Brightspace-style wide gradebook with one column per deliverable.

**Step 2 — Switch to Design View and name the table.** Right-click the `Table1` tab, choose **Design View**, and save it as `GRADEBOOK`.

**Step 3 — Define the GRADEBOOK fields.** Enter the following in Design View.

| Field Name | Access Data Type | Description |
| --- | --- | --- |
| `RecordID` | AutoNumber | Unique identifier for each grade record |
| `StudentID` | Short Text | Student identifier, such as `S1001` |
| `FirstName` | Short Text | Student first name |
| `LastName` | Short Text | Student last name |
| `Email` | Short Text | Student email |
| `Birthday` | Date/Time | Student birth date |
| `DeliverableType` | Short Text | Quiz, Homework, Exam, or Project |
| `DeliverableNumber` | Number | Sequence number within the category |
| `DueDate` | Date/Time | Due date for the deliverable |
| `Topic` | Short Text | Topic or label for the deliverable |
| `Score` | Number | Score on a 0–100 scale |

`StudentID` is stored as Short Text on purpose. It looks numeric, but it is an identifier, not a quantity. You are never going to average or add it. Values like `S1001` keep that signal visible. `Score`, by contrast, is a real measurement and stays Number.

**Step 4 — Set the primary key.** Click the row selector for `RecordID`, then click the **Primary Key** button in the ribbon. A small key icon should appear next to `RecordID`. A primary key uniquely identifies each row. `RecordID` identifies the grade record. `StudentID` identifies the student. They are not the same: Alice can appear in many grade records, but each row still needs its own `RecordID`.

**Step 5 — Add a validation rule on Score.** Click the `Score` field. In **Field Properties** at the bottom of the screen, set:

| Property | Value |
| --- | --- |
| Validation Rule | `Between 0 And 100` |
| Validation Text | `Score must be between 0 and 100.` |

This is one of the chapter's `CHECK`-style constraints in the form Access exposes through table design.

**Step 6 — Make important fields required.** In Field Properties, set **Required** to `Yes` for `StudentID`, `FirstName`, `LastName`, `DeliverableType`, `DeliverableNumber`, `DueDate`, and `Score`. Leave `Email` and `Topic` optional for now.

**Step 7 — Save the table.**

### Enter the Starter Records

**Step 8 — Enter six starter rows.** Switch `GRADEBOOK` to **Datasheet View** and enter the six rows below. Do not type `RecordID` — Access fills it in automatically.

| StudentID | FirstName | LastName | Email | Birthday | DeliverableType | DeliverableNumber | DueDate | Topic | Score |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- | ---: |
| S1001 | Alice | Johnson | alice@university.edu | 5/14/2004 | Quiz | 1 | 9/8/2026 | Database Basics | 92 |
| S1002 | Brian | Lee | brian@university.edu | 11/22/2003 | Quiz | 1 | 9/8/2026 | Database Basics | 84 |
| S1003 | Carla | Mendez | carla@university.edu | 2/9/2004 | Homework | 1 | 9/10/2026 | Entity Design | 95 |
| S1001 | Alice | Johnson | alice@university.edu | 5/14/2004 | Quiz | 2 | 9/15/2026 | SQL Basics | 88 |
| S1002 | Brian | Lee | brian@university.edu | 11/22/2003 | Quiz | 2 | 9/15/2026 | SQL Basics | 77 |
| S1003 | Carla | Mendez | carla@university.edu | 2/9/2004 | Exam | 1 | 10/1/2026 | Midterm | 91 |

**Expected result.**

| Check | Expected |
| --- | --- |
| Number of records | 6 |
| Students appearing more than once | Alice, Brian, Carla |
| Number of quiz records | 4 |
| Highest score | Carla, 95 |
| Lowest score | Brian, 77 |

### Test the Validation Rule

**Step 9 — Try an out-of-range score.** In any row, temporarily try to enter `150` in the `Score` field and press Tab. Access should refuse the value and show the message `Score must be between 0 and 100.` Restore the original score and move on.

The database just enforced a rule that a spreadsheet would have silently accepted. That is one of the chapter's core differences between a flat file and a DBMS.

### Build the GRADE_WEIGHT Table

`GRADE_WEIGHT` stores grading-category metadata, not student scores.

**Step 10 — Create the table.** On the **Create** tab, click **Table Design**. Save it as `GRADE_WEIGHT`.

**Step 11 — Define the fields.**

| Field Name | Access Data Type | Description |
| --- | --- | --- |
| `DeliverableType` | Short Text | Category name |
| `ItemCount` | Number | Number of items in that category |
| `CategoryWeight` | Number | Total course weight for the category |
| `WeightPerItem` | Number | Weight assigned to each item |

**Step 12 — Set the primary key.** Set `DeliverableType` as the primary key. This works only because each deliverable type appears once in this simplified table; in a more realistic design, the category would get its own surrogate ID.

**Step 13 — Save the table**, switch to **Datasheet View**, and enter:

| DeliverableType | ItemCount | CategoryWeight | WeightPerItem |
| --- | ---: | ---: | ---: |
| Quiz | 4 | 20 | 5 |
| Homework | 3 | 30 | 10 |
| Exam | 2 | 40 | 20 |
| Project | 1 | 10 | 10 |

**Expected result.**

| Check | Expected |
| --- | --- |
| Records in `GRADE_WEIGHT` | 4 |
| Primary key field | `DeliverableType` |
| Weight per quiz | 5 |
| Total course weight for exams | 40 |

### Create a Data-Entry Form

A form is another interface for the same table, not a separate copy of the data. It makes record entry easier to read and reduces accidental edits to neighboring rows.

**Step 14 — Create `frmGRADEBOOK`.** In the Navigation Pane, click the `GRADEBOOK` table. On the **Create** tab, click **Form**. Access generates a form from the table. Save it as `frmGRADEBOOK`.

**Step 15 — Use the form to add a new record.**

| Field | Value |
| --- | --- |
| StudentID | S1004 |
| FirstName | Daniel |
| LastName | Kim |
| Email | daniel@university.edu |
| Birthday | 8/17/2004 |
| DeliverableType | Project |
| DeliverableNumber | 1 |
| DueDate | 11/5/2026 |
| Topic | Final Project |
| Score | 89 |

**Step 16 (optional) — Create `frmGRADE_WEIGHT`.** Repeat the process with the `GRADE_WEIGHT` table and save the form as `frmGRADE_WEIGHT`. It makes editing category weights easier later.

**Expected result.**

| Check | Expected |
| --- | --- |
| Records in `GRADEBOOK` after Daniel is added | 7 |
| New student added | Daniel Kim |
| New deliverable type now present in `GRADEBOOK` | Project |
| Object used to enter the record | `frmGRADEBOOK` |

### Build Single-Table Queries

A query asks a question of the data. You will use the **Query Design** grid here. Chapter 5 will rewrite these as SQL.

**Step 17 — Build `qryQuizRecords` (which records are quizzes?).** On the **Create** tab, click **Query Design**, add `GRADEBOOK`, drop `FirstName`, `LastName`, `DeliverableType`, `DeliverableNumber`, and `Score` into the grid. Under `DeliverableType`, type `Quiz` in the **Criteria** row. Run, then save as `qryQuizRecords`.

Expected result — 4 rows:

| FirstName | LastName | DeliverableType | DeliverableNumber | Score |
| --- | --- | --- | ---: | ---: |
| Alice | Johnson | Quiz | 1 | 92 |
| Brian | Lee | Quiz | 1 | 84 |
| Alice | Johnson | Quiz | 2 | 88 |
| Brian | Lee | Quiz | 2 | 77 |

**Step 18 — Build `qryLowScores` (scores below 80).** New query in Query Design, add `GRADEBOOK`, drop `FirstName`, `LastName`, `DeliverableType`, `DeliverableNumber`, `Score`. Under `Score`, type `<80`. Run and save as `qryLowScores`.

Expected result — 1 row:

| FirstName | LastName | DeliverableType | DeliverableNumber | Score |
| --- | --- | --- | ---: | ---: |
| Brian | Lee | Quiz | 2 | 77 |

**Step 19 — Build `qryScoresDescending` (highest scores first).** New query, add `GRADEBOOK`, drop the same five fields. Under `Score`, set the **Sort** row to **Descending**. Run and save as `qryScoresDescending`.

Expected top and bottom rows:

| FirstName | LastName | DeliverableType | Score |
| --- | --- | --- | ---: |
| Carla | Mendez | Homework | 95 |
| ... | ... | ... | ... |
| Brian | Lee | Quiz | 77 |

**Step 20 — Build `qryAverageScoreByType` (average score per category).** New query, add `GRADEBOOK`, drop `DeliverableType` and `Score`. Click **Totals** in the ribbon — a new **Total** row appears. Leave `Group By` under `DeliverableType` and change `Group By` to `Avg` under `Score`. Run and save as `qryAverageScoreByType`.

Expected result (after adding Daniel):

| DeliverableType | AvgOfScore |
| --- | ---: |
| Exam | 91 |
| Homework | 95 |
| Project | 89 |
| Quiz | 85.25 |

This is the database version of a pivot-table summary, except it lives as a reusable, named object.

### Build a Query-Level Join

This is the first time you combine two tables. Read carefully: this is a **query-level join**, not a formal relational design. You are not creating relationships or referential integrity yet. You are asking Access to match rows from two tables inside one query so you can display grade records alongside their category-level weights.

**Step 21 — Build `qryGradebookWithWeights` (student records with category weights).** New query in Query Design. Add **both** tables: `GRADEBOOK` and `GRADE_WEIGHT`. If Access does not draw a join line automatically, drag `DeliverableType` from `GRADEBOOK` onto `DeliverableType` in `GRADE_WEIGHT`. A line should appear between the two tables.

Add these fields:

- From `GRADEBOOK`: `FirstName`, `LastName`, `DeliverableType`, `DeliverableNumber`, `Score`.
- From `GRADE_WEIGHT`: `CategoryWeight`, `WeightPerItem`.

Run and save as `qryGradebookWithWeights`.

Expected result — 7 rows, each showing the category weight alongside the score. For example:

| DeliverableType | CategoryWeight | WeightPerItem |
| --- | ---: | ---: |
| Quiz | 20 | 5 |
| Project | 10 | 10 |

This feels like a spreadsheet `VLOOKUP` or `XLOOKUP`, but Access is doing it as part of a saved query. The database design itself is still not relational — that comes in Chapter 6.

### Build Two Reports

A report turns query output into a layout you can print or share.

**Step 22 — Build `rptLowScores`.** In the Navigation Pane, click `qryLowScores`. On the **Create** tab, click **Report**. Save as `rptLowScores`. It should show Brian Lee's Quiz 2 score of 77.

**Step 23 — Build `rptAverageScoreByType`.** Select `qryAverageScoreByType`, click **Create** → **Report**, save as `rptAverageScoreByType`. It should list the four deliverable types and their averages (Exam 91, Homework 95, Project 89, Quiz 85.25).

If you have time, open either report in **Layout View** and clean up the title, column widths, and label names.

### Check Your Work

Your database should now contain these objects:

| Object Type | Required | Optional |
| --- | --- | --- |
| Table | `GRADEBOOK`, `GRADE_WEIGHT` | — |
| Form | `frmGRADEBOOK` | `frmGRADE_WEIGHT` |
| Query | `qryQuizRecords`, `qryLowScores`, `qryScoresDescending`, `qryAverageScoreByType`, `qryGradebookWithWeights` | — |
| Report | `rptLowScores`, `rptAverageScoreByType` | — |

And these results should match:

| Check | Expected |
| --- | --- |
| Records in `GRADEBOOK` after Daniel is added | 7 |
| Records in `GRADE_WEIGHT` | 4 |
| `Score = 150` rejected by validation rule | Yes |
| `qryQuizRecords` row count | 4 |
| `qryLowScores` row count | 1 |
| Highest score | Carla Mendez, 95 |
| Quiz average | 85.25 |
| `qryGradebookWithWeights` row count | 7 |

### What This Shows

You now have a small but real DBMS environment instead of a spreadsheet. Tables enforce structure and data types. A primary key uniquely identifies each row. A validation rule rejects bad input before it lands. A form is a friendlier interface to the same underlying table. Queries answer specific questions and live as reusable objects. A query-level join can combine two tables on demand. Reports present query results in a readable layout. None of this required SQL — but everything you just did, you will do again in SQL in Chapter 5.

Three questions worth sitting with before you move on:

- **Why is `StudentID` not the same thing as `RecordID`?**
- **What did the `Score` validation rule prevent that a spreadsheet would have allowed?**
- **Why is `qryGradebookWithWeights` not the same as a real relational design?**

### What This Build Does Not Fix Yet

This is the bridge to Chapter 6. The database works, but five problems remain visible in the design:

- **Redundancy.** Alice's name, email, and birthday repeat on every row she appears in. So do Brian's and Carla's.
- **Update anomaly risk.** If Alice changes her email, you have to update multiple rows. Miss one, and the database disagrees with itself.
- **Insertion anomaly risk.** There is no clean place to add a new student who has not submitted anything yet. Students only exist as grade rows.
- **Deletion anomaly risk.** If you delete the only grade row for a project, you may also delete the only evidence that the project existed.
- **No formal relationships.** The join in `qryGradebookWithWeights` is a query-time match. Access is not enforcing that every `DeliverableType` in `GRADEBOOK` must exist in `GRADE_WEIGHT`, or that every grade must belong to a known student.

Chapter 6 will refactor this into a relational design with separate `STUDENT`, `DELIVERABLE`, and `STUDENT_GRADE` tables connected by foreign keys.

### Common Mistakes

- **Typed `RecordID` values.** `RecordID` is AutoNumber — Access fills it in. If you try to type a value, Access ignores it or warns you.
- **Set `StudentID` as Number.** Then later realized you wanted `S1001`-style IDs. Changing the data type after data is entered can be painful. Set it to Short Text up front.
- **Validation rule won't accept the syntax.** It is `Between 0 And 100`, not `0-100` or `>=0 AND <=100`. Quotes are not needed.
- **Required field left blank.** If you set **Required** to Yes, Access blocks the row until you fill that field. Either fill it or change Required back to No.
- **Join line missing in the two-table query.** Without the line connecting `DeliverableType` to `DeliverableType`, Access returns a Cartesian product (every row of one table paired with every row of the other) instead of a clean join.
- **Totals row hidden.** The **Total** row only appears after you click **Totals** in the ribbon. If you don't see it, that's why.
- **Saved the table instead of the query, or vice versa.** When Access prompts to save, check whether you're saving `GRADEBOOK`, `qryQuizRecords`, or something else. The active object's name appears in the prompt.
- **Tried to make a report from a table instead of a query.** You can, but reports built from queries inherit your filters and sorts. That's usually what you want.

### Submit or Save

Save and close the database. Confirm the file is named `LB04-GradingDatabase-YourName.accdb`. Keep it somewhere you can find it again — Chapter 5 will reuse these same two tables to introduce SQL, and Chapter 6 will use them as the starting point for normalization.

### Peek Ahead — Chapter 5

In Chapter 5 you will stop clicking and start writing. The same questions you just answered with the Query Design grid — show the quizzes, show the low scores, sort by score, average by category, combine `GRADEBOOK` with `GRADE_WEIGHT` — become short SQL statements you can read, edit, and share. Chapter 5 will use the same table logic in SQL, including Access SQL View and/or SQLite, so you will start to see why SQL is the lingua franca that every relational database in the chapter's platform table speaks.
