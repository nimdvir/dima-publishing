<!-- Let's Build for Chapter 3: built with the Grading Database (GD) in Google Sheets. Companion to Lab 03 (PetVax). Revised 2026-06-02. -->

## Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/Lets-build_fqsqux?_a=BAMAAAiu0" alt="Let's Build" />
</p>

Chapter 3 explained what data is, how it becomes meaningful, and why fields, types, metadata, and quality matter before any database tool enters the picture. In this Let's Build (LB), you will turn those ideas into something you can see and touch. You will build a small Google Sheets workbook based on the Grading Database (GD), then deliberately stress it until its spreadsheet limits become visible. There is no submission required for this LB; it is the rehearsal for **Lab 03 — Transferring Data Fundamentals to PetVax**, where you will apply the same moves to a messy veterinary clinic record and submit your workbook for a grade.

![Grading Database fields flowing from data cards into a simple table and small database tables](../.images/optimized/ch03-lb-grading-database-preview.png)

*The Grading Database starts as a simple gradebook, but the same fields will later support a more reliable database structure.*

### Purpose

The point of this build is not to create a database — that begins in Chapter 4. The point is to feel how data behaves inside a spreadsheet: how fields and records work, how types and metadata give values meaning, how filters and pivots produce information, and where the structure begins to crack when data is repeated, shared, and updated. By the end, you should be able to explain in your own words why organizations eventually move from spreadsheets and flat files toward databases.

![Grading Database fields organized as a simple structured table before becoming separate database tables](../.images/optimized/ch03-lb-grading-database-small-system.png)

*This build keeps the Grading Database small enough to inspect while previewing why structured tables matter.*

### What You Will Practice

* fields, records, and table discipline
* identifying data types and measurement levels
* writing a small data dictionary (metadata in practice)
* distinguishing missing values: `NULL`, `0`, `""`, and `" "`
* filters, sorts, and formula-based queries (`FILTER`, `SORT`)
* simulating a relationship with `VLOOKUP`
* summarizing data with pivot tables
* naming the data-quality dimensions when a value goes wrong
* recognizing where lifecycle and stewardship gaps appear in everyday data work

![Sample grading fields connected to grouping aggregation trends and dashboard outcomes](../.images/optimized/ch03-lb-data-types-dashboard-outcomes.png)

*Different field types support different analytical behaviors: grouping, aggregation, trends, and status filters.*

### Before You Begin

You need a Google account and a blank Google Sheets workbook. Plan about 60 minutes. You will create three tabs in one workbook: `GRADEBOOK`, `GRADE_WEIGHT`, and `DATA_DICTIONARY`. Keep your workbook open as you read — every section asks you to do something small, then check what you see.

### Create the Workbook and Three Sheets

Open Google Sheets and create a blank workbook. Name it:

**`LB03 — Grading Data Fundamentals — Your Name`**

Add three sheet tabs in this order: `GRADEBOOK`, `GRADE_WEIGHT`, `DATA_DICTIONARY`.

**Why three tabs and not one.** Chapter 3 stresses that themes of data should stay apart even before a database is involved. Grades, grading rules, and field definitions are three different themes, so each gets its own sheet.

### Define the Structure Before Entering Data

A table is more than a grid. Before typing any values, decide what each column means.

![Data hierarchy from bits and bytes to fields records tables and databases](../.images/optimized/ch03-lb-data-hierarchy.png)

*The data hierarchy reminds you that a spreadsheet table is one level in a larger data structure.*

In row 1 of `GRADEBOOK`, enter these headers (column A through K):

`RecordID`, `StudentID`, `FirstName`, `LastName`, `Email`, `Birthday`, `DeliverableType`, `DeliverableNumber`, `DueDate`, `Topic`, `Score`.

In row 1 of `GRADE_WEIGHT`, enter (column A through D):

`DeliverableType`, `ItemCount`, `CategoryWeight`, `WeightPerItem`.

**One row, one record.** Each row in `GRADEBOOK` will represent one student receiving one score on one deliverable. Each row in `GRADE_WEIGHT` will describe one grading category.

![Compact data hierarchy showing bit byte field record table and database levels](../.images/optimized/ch03-lb-data-hierarchy-detail.png)

*A field such as `Score` only becomes useful when it sits inside a record, table, and larger data system.*

### Build the Data Dictionary

Metadata is "data about data." It tells the next person (and your future self) what each field means and how it should behave. In the `DATA_DICTIONARY` tab, add these headers in row 1: `FieldName`, `Sheet`, `Meaning`, `IntendedKind`, `WhyItMatters`. Then enter the rows below.

| FieldName           | Sheet         | Meaning                          | IntendedKind     | WhyItMatters                                          |
| ------------------- | ------------- | -------------------------------- | ---------------- | ----------------------------------------------------- |
| `RecordID`          | GRADEBOOK     | Identifies one grade record      | Identifier       | Distinguishes one row from another                    |
| `StudentID`         | GRADEBOOK     | Identifies one student           | Identifier       | Looks numeric but should never be averaged            |
| `FirstName`         | GRADEBOOK     | Student first name               | Text             | Descriptive label                                     |
| `LastName`          | GRADEBOOK     | Student last name                | Text             | Descriptive label                                     |
| `Email`             | GRADEBOOK     | Student email address            | Text             | Contact value; should be consistent across rows       |
| `Birthday`          | GRADEBOOK     | Student birth date               | Date             | Must be a real date so it sorts and filters correctly |
| `DeliverableType`   | GRADEBOOK     | Category of graded work          | Categorical text | Used for grouping and lookups                         |
| `DeliverableNumber` | GRADEBOOK     | Sequence within a category       | Whole number     | Distinguishes Quiz 1 from Quiz 2                      |
| `DueDate`           | GRADEBOOK     | Original deadline                | Date             | Supports date math and turnaround analysis            |
| `Topic`             | GRADEBOOK     | Topic of the deliverable         | Text             | Adds business context                                 |
| `Score`             | GRADEBOOK     | Points earned, 0 to 100          | Numeric (ratio)  | Can be summed, averaged, and compared                 |
| `DeliverableType`   | GRADE_WEIGHT  | Matching category key            | Categorical text | Join key for `VLOOKUP`                                |
| `ItemCount`         | GRADE_WEIGHT  | Count of items in the category   | Whole number     | Supports per-item math                                |
| `CategoryWeight`    | GRADE_WEIGHT  | Total course weight for category | Numeric          | Drives grade weighting                                |
| `WeightPerItem`     | GRADE_WEIGHT  | Weight of one item               | Numeric          | Used in weighted-contribution formula                 |

**Why this small artifact matters.** Without a dictionary, anyone using the workbook has to guess. With one, you have written down the shared meaning the chapter calls metadata. This same idea, scaled up, is what data governance teams maintain for real systems.

![Metadata notes surrounding a grading data dictionary table](../.images/optimized/ch03-lb-metadata-data-dictionary.png)

*A data dictionary turns field names into shared rules that another person can follow.*

### Classify Your Fields by Measurement Level

The chapter introduced four measurement levels — **nominal**, **ordinal**, **interval**, **ratio** — because the level decides which calculations make sense. Try this quick classification in your own words, then check the model answers.

![Measurement ladder from nominal to ratio with classroom examples](../.images/optimized/ch03-lb-measurement-level-ladder.png)

*The measurement level tells you whether a field can be counted, ordered, compared by distance, or used in full arithmetic.*

**Quick classify.** Label each field as Nominal, Ordinal, Interval, or Ratio.

| Field                            | Your answer | Model answer | Why                                                            |
| -------------------------------- | ----------- | ------------ | -------------------------------------------------------------- |
| `StudentID`                      | ?           | Nominal      | An identifier with no order or amount                          |
| `DeliverableType`                | ?           | Nominal      | Category labels with no inherent order                         |
| `SatisfactionRating (1–5)`       | ?           | Ordinal      | Ordered ranks, but the gap between 1 and 2 is not equal to 4–5 |
| `DueDate`                        | ?           | Interval     | Ordered, equal calendar intervals, but no true zero            |
| `Score` (0–100)                  | ?           | Ratio        | Ordered, equal intervals, and a meaningful zero                |

**Why this matters.** A spreadsheet will happily average an identifier and produce a number. The number is meaningless. Knowing the measurement level is what tells you which operations are honest.

![Measurement levels with valid operations shown for each level](../.images/optimized/ch03-lb-measurement-level-operations.png)

*Valid operations depend on the meaning of the field, not just on whether the value looks like a number.*

![Nominal ordinal interval and ratio fields matched to appropriate operations](../.images/optimized/ch03-lb-nominal-ratio-operations.png)

*Moving from nominal to ratio data expands the calculations you can use, but only when the field meaning supports them.*

### Enter the Sample Data

Starting in row 2 of `GRADEBOOK`, enter these seven records:

| RecordID | StudentID | FirstName | LastName | Email                   | Birthday   | DeliverableType | DeliverableNumber | DueDate    | Topic           | Score |
| -------: | --------: | --------- | -------- | ----------------------- | ---------- | --------------- | ----------------: | ---------- | --------------- | ----: |
|        1 |      1001 | Alice     | Johnson  | alice@university.edu    | 2004-05-14 | Quiz            |                 1 | 2026-09-08 | Database Basics |    92 |
|        2 |      1002 | Brian     | Lee      | brian@university.edu    | 2003-11-22 | Quiz            |                 1 | 2026-09-08 | Database Basics |    84 |
|        3 |      1003 | Carla     | Mendez   | carla@university.edu    | 2004-02-09 | Homework        |                 1 | 2026-09-10 | Entity Design   |    95 |
|        4 |      1001 | Alice     | Johnson  | alice@university.edu    | 2004-05-14 | Quiz            |                 2 | 2026-09-15 | SQL Basics      |    88 |
|        5 |      1002 | Brian     | Lee      | brian@university.edu    | 2003-11-22 | Quiz            |                 2 | 2026-09-15 | SQL Basics      |    77 |
|        6 |      1003 | Carla     | Mendez   | carla@university.edu    | 2004-02-09 | Exam            |                 1 | 2026-10-01 | Midterm         |    91 |
|        7 |      1004 | Daniel    | Kim      | daniel@university.edu   | 2004-08-17 | Project         |                 1 | 2026-11-05 | Final Project   |    89 |

![Common business and classroom fields grouped by qualitative quantitative categorical and numerical types](../.images/optimized/ch03-lb-common-data-fields.png)

*The same gradebook includes labels, categories, dates, identifiers, and measurements that each need different handling.*

Then enter four rows in `GRADE_WEIGHT`:

| DeliverableType | ItemCount | CategoryWeight | WeightPerItem |
| --------------- | --------: | -------------: | ------------: |
| Quiz            |         4 |             20 |             5 |
| Homework        |         3 |             30 |            10 |
| Exam            |         2 |             40 |            20 |
| Project         |         1 |             10 |            10 |

![Business data examples classified by qualitative quantitative identifier and amount roles](../.images/optimized/ch03-lb-classifying-business-data.png)

*Classifying fields helps you decide which spreadsheet operation is meaningful and which would be misleading.*

**Notice the repetition already.** Alice's name, email, and birthday already appear twice. So do Brian's and Carla's. That repetition will matter in a few sections.

### Add Metadata, Validation, and Formatting

On both `GRADEBOOK` and `GRADE_WEIGHT`:

1. Bold row 1.
2. **View → Freeze → 1 row** so headers stay visible.
3. **Data → Create a filter** on the header row.
4. Format `Birthday` and `DueDate` as dates.
5. Format `Score`, `CategoryWeight`, and `WeightPerItem` as numbers.

Add two validation rules to `GRADEBOOK`:

* On `DeliverableType` (column G), add a **dropdown** populated from `GRADE_WEIGHT!A2:A5`.
* On `Score` (column K), add a **number rule** that values must be between `0` and `100`.

![Grading database fields mapped to text numeric date and Boolean analytical uses](../.images/optimized/ch03-lb-data-types-analytical-uses.png)

*This example extends the gradebook idea to show how each data type supports a different analytical behavior.*

![Structured semi-structured and unstructured data examples shown as different storage patterns](../.images/optimized/ch03-lb-data-structure-types.png)

*The LB uses structured data, but real organizations often also manage semi-structured and unstructured data.*

**Why this counts as metadata.** A dropdown is not just a UI feature. It is a written rule that says "these are the only valid categories." That rule lives outside the values themselves, which is exactly what metadata does.

### Represent Missing Values Carefully

The chapter showed that `0`, `""`, `" "`, and `NULL` are four different things even when a cell looks empty. Try each one on a temporary 8th row, then delete the row before moving on.

| Cell action                    | What you stored | What it means                          |
| ------------------------------ | --------------- | -------------------------------------- |
| Leave `Score` blank            | `NULL`          | No value was entered                   |
| Type `0` in `Score`            | Real zero       | Earned zero points                     |
| Type a single space in `Topic` | `" "`           | A stored space; still text             |
| Press Delete on `Topic`        | `""`            | Empty text                             |

**Try it.** Filter `Score` for "is empty." Does the cell containing `0` appear? It should not, because `0` is a real number, not a missing value. That is the conceptual difference that will matter once you start writing SQL with `IS NULL`.

### Filter, Sort, and Query the Data

Spreadsheets do not have a query engine, but filters, sorts, and a couple of formulas behave like early queries.

**Filter for Quiz records.** On `GRADEBOOK`, filter `DeliverableType = Quiz`. You should see four rows: Alice's two quizzes and Brian's two quizzes. Carla and Daniel disappear.

**Filter for low scores.** Clear the previous filter, then filter `Score < 80`. Only one row should remain: Brian Lee, Quiz 2, score 77.

**Sort by score.** Clear filters. Sort `GRADEBOOK` by `Score` descending. The top row should be Carla's Homework 1 (95). The bottom row should be Brian's Quiz 2 (77).

**Formula version of those queries.** In an empty area to the right of the table, type:

```text
=FILTER(A2:K8, K2:K8<80)
```

and somewhere below it:

```text
=SORT(A2:K8, 11, FALSE)
```

The `FILTER` formula returns the same single low-score row; `SORT` returns the same 7 rows in descending order by column 11 (`Score`).

**Why these feel almost like queries but aren't.** Both formulas hard-code the range `A2:K8`. Add row 9 later and the formulas will silently ignore it unless you update them by hand. A database query refers to the table by name, not by row range, which is why it keeps working as data grows.

### Simulate a Relationship with VLOOKUP

`VLOOKUP` imitates what a database does when it joins two tables on a shared key. It is useful, but the relationship is not enforced.

Add three new headers in `GRADEBOOK` columns L, M, N:

`CategoryWeight`, `WeightPerItem`, `WeightedContribution`.

In `L2`, enter:

```text
=VLOOKUP(G2, GRADE_WEIGHT!A:D, 3, FALSE)
```

In `M2`, enter:

```text
=VLOOKUP(G2, GRADE_WEIGHT!A:D, 4, FALSE)
```

In `N2`, enter:

```text
=(K2/100)*M2
```

Copy all three formulas down through row 8. Your output should match:

| RecordID | DeliverableType | Score | WeightPerItem | WeightedContribution |
| -------: | --------------- | ----: | ------------: | -------------------: |
|        1 | Quiz            |    92 |             5 |                 4.60 |
|        2 | Quiz            |    84 |             5 |                 4.20 |
|        3 | Homework        |    95 |            10 |                 9.50 |
|        4 | Quiz            |    88 |             5 |                 4.40 |
|        5 | Quiz            |    77 |             5 |                 3.85 |
|        6 | Exam            |    91 |            20 |                18.20 |
|        7 | Project         |    89 |            10 |                 8.90 |

**Why this is a fragile join.** The lookup works only as long as `DeliverableType` values match exactly between sheets, the range `GRADE_WEIGHT!A:D` stays valid, and nobody overwrites a formula cell with a typed value. A real database relationship would not allow you to type `quiz` in lowercase if the related table only has `Quiz`. The spreadsheet will.

### Summarize with Pivot Tables

Pivot tables are where rows of data turn into information. Select the `GRADEBOOK` data range, then **Insert → Pivot table**.

**Average score by deliverable type.** Set Rows = `DeliverableType`, Values = `Score`, summarized by **AVERAGE**. You should see:

| DeliverableType | Average Score |
| --------------- | ------------: |
| Exam            |         91.00 |
| Homework        |         95.00 |
| Project         |         89.00 |
| Quiz            |         85.25 |

**Count records by student.** In a second pivot, set Rows = `StudentID`, Values = `RecordID`, summarized by **COUNTA**:

| StudentID | Count |
| --------: | ----: |
|      1001 |     2 |
|      1002 |     2 |
|      1003 |     2 |
|      1004 |     1 |

**The DIKW arc, made visible.** A raw `77` in `GRADEBOOK` is **data**. An average quiz score of `85.25` is **information**. Noticing that quiz scores trail homework scores is the beginning of **knowledge**. Deciding to add a quiz-prep session is **wisdom**. The pivot table is the bridge from one to the next.

### Add and Modify Data — Watch What Breaks

This is the most important section. Make each change and write down what you observe.

**Add a new grade record.** Insert this row at the bottom of `GRADEBOOK`:

| RecordID | StudentID | FirstName | LastName | Email                | Birthday   | DeliverableType | DeliverableNumber | DueDate    | Topic               | Score |
| -------: | --------: | --------- | -------- | -------------------- | ---------- | --------------- | ----------------: | ---------- | ------------------- | ----: |
|        8 |      1001 | Alice     | Johnson  | alice@university.edu | 2004-05-14 | Homework        |                 2 | 2026-09-20 | Normalization Intro |    93 |

Check: did your `=FILTER(...)` formula include row 8? (No — it still uses `A2:K8`.) Did your pivot tables include it? (Only if you refresh or extend the source range.) Did `VLOOKUP` copy down to L8, M8, N8 automatically? (No — you must copy the formulas down.) This is the **completeness** dimension of data quality starting to slip.

**Change one Alice email.** On one Alice row only, change `alice@university.edu` to `alice.johnson@university.edu`. Leave her other rows alone. You now have one student stored with two different emails. That is the **consistency** and **uniqueness** dimensions failing at the same time, and the spreadsheet did nothing to stop you.

**Change `Quiz` to `quiz`.** In one Quiz row, replace `Quiz` with `quiz`. If your dropdown validation is set to "Reject input," the change is blocked. If it is set to "Show warning," the value is stored and your pivot table will now show two categories instead of one, and the `VLOOKUP` for that row may return `#N/A`. That is the **validity** dimension at work, and it shows why categorical text needs disciplined representation.

**Change a category weight.** In `GRADE_WEIGHT`, change `WeightPerItem` for `Quiz` from `5` to `6`. Every weighted contribution for a Quiz row updates immediately. That is useful — and risky. A single typo in a supporting sheet has just rippled through every quiz score in the workbook with no warning. This is the **accuracy** dimension under stress.

### Why a Flat File Breaks — Redundancy and Anomalies

The previous section showed *symptoms*. This section names the underlying *problems*. These four terms are the structural reason organizations move from spreadsheets to databases, and you will meet them again in Chapter 4.

![Spreadsheet strengths contrasted with database strengths](../.images/optimized/ch03-lb-spreadsheet-database-strengths.png)

*Spreadsheets are useful for quick individual work, while databases become stronger when shared structure, validation, and reuse matter.*

**Data redundancy.** Look at `GRADEBOOK`. You have **four students** (1001, 1002, 1003, 1004) but **eight stored copies** of their identity data — Alice's name, email, and birthday appear three times; Brian's and Carla's each appear twice. Every new grade for an existing student copies their identity again. Storage is cheap; the real cost is that every copy is a future chance for the copies to disagree.

**Update (modification) anomaly.** You already saw this when you changed one of Alice's emails. To update her email *correctly*, you must find and change every row where she appears. Miss one and the workbook now stores two different emails for the same person. There is no single Alice record to update — only scattered copies.

**Insertion anomaly — try it.** Try to add a new student, **Emma Park, StudentID 1005**, who has not yet received any grades. Where does she go? `GRADEBOOK` requires a `DeliverableType`, `DueDate`, `Score`, and so on for every row. You can either invent a blank or placeholder grade row just to record that Emma exists, or leave her out of the workbook entirely. Neither is honest. **Write one sentence** in a scratch cell describing what felt wrong about adding Emma. The same problem blocks adding a brand-new `DeliverableType` that no one has been graded on yet.

**Deletion anomaly — try it.** Now delete **RecordID 7** (Daniel Kim, Project 1). You did not just delete a grade. You also deleted the only record that **Daniel exists**, and the only record that the **Project** category has ever been used. Refresh your pivot tables and confirm Daniel and Project are gone. **Write one sentence** about what was lost. Then press **Ctrl+Z** to undo before continuing.

**Query fragility.** Even when the data is correct, the spreadsheet makes asking questions awkward. Formulas like `=FILTER(A2:K8, ...)` hard-code a row range, so new rows silently drop out. `Quiz`, `quiz`, and `QUIZ` count as three categories in a pivot. Nothing forces `DeliverableType` values to match between sheets, so `VLOOKUP` can return `#N/A` without warning. And you cannot ask "list all students" separately from "list all grades" because students and grades live in the same rows.

**Each problem, each fix.**

| Problem               | What you saw in the workbook                                | Root cause                                       | Chapter 4 fix                                  |
| --------------------- | ----------------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------- |
| Data redundancy       | Alice's identity stored three times                         | Students and grades share one table              | Separate `Students` and `Grades` tables        |
| Update anomaly        | Two different emails for the same Alice                     | Many copies of one fact                          | One row per student; grades reference the student |
| Insertion anomaly     | No clean place for Emma Park                                | Identity only exists alongside a grade           | Independent `Students` table                   |
| Deletion anomaly      | Removing Daniel's grade removed Daniel                      | Identity only exists alongside a grade           | Independent `Students` table                   |
| Query fragility       | Hard-coded ranges, case drift, `#N/A` lookups               | No enforced types, keys, or table names          | Typed columns, enforced relationships, queries by table name |

A spreadsheet lets these problems happen. A database is designed to prevent them. That is the move you will make in Chapter 4.

### Lifecycle Thinking in One Minute

The chapter introduced the data lifecycle — collection, storage, cleaning, integration, use, retention, archiving, anonymization, and deletion. Your small workbook already shows why this matters.

**Try it.** Ask yourself three questions about your `GRADEBOOK`:

1. **Retention:** How long should you keep Brian's quiz scores? After the course ends, do the individual scores still need to exist, or is the final grade enough?
2. **Anonymization:** If you were asked to share your workbook with a colleague to demonstrate spreadsheet fragility, which columns would you strip first to protect student privacy?
3. **Deletion:** When you deleted Daniel's row during the deletion-anomaly exercise, you accidentally removed the only record that Daniel and the Project category existed. What did you lose that you did not intend to lose?

**Write one sentence** for each question. The point is not to produce a policy document. The point is to notice that everyday data decisions — what to keep, what to share, when to delete — are lifecycle and ethics decisions, not just technical ones. When organizations skip these questions, they end up with data that is either too valuable to delete or too risky to keep, and nobody knows who owns the decision.

### Check Your Work

Before moving on, confirm each of these. If any answer is off, retrace the section that produced it.

| Check                                                            | Expected value                                |
| ---------------------------------------------------------------- | --------------------------------------------- |
| Number of records in `GRADEBOOK` (after adding row 8)            | 8                                             |
| Number of unique `StudentID` values                              | 4                                             |
| Result of filtering `Score < 80`                                 | 1 row (Brian, Quiz 2, 77)                     |
| `WeightedContribution` for RecordID 6 (Carla, Exam)              | 18.20                                         |
| Average Quiz score from the pivot (original 7 rows)              | 85.25                                         |
| Count of records for StudentID 1001 (after adding row 8)         | 3                                             |
| Dropdown values available for `DeliverableType`                  | Quiz, Homework, Exam, Project                 |

### What This Shows

Each Chapter 3 idea appeared somewhere concrete in this build:

| Chapter 3 idea                  | Where it appeared in this LB                                       |
| ------------------------------- | ------------------------------------------------------------------ |
| Data and context                | Raw values became meaningful only after headers and a dictionary    |
| Fields and records              | One row in `GRADEBOOK` = one grade for one student                  |
| Data types and measurement level| Quick-classify mini-check; date and number formatting               |
| Metadata                        | `DATA_DICTIONARY` tab and dropdown rules                            |
| Missing values                  | `NULL`, `0`, `""`, and `" "` exercise                               |
| Spreadsheet queries             | Filters, sorts, `=FILTER`, `=SORT`                                  |
| Simulated relationships         | `VLOOKUP` from `GRADEBOOK` to `GRADE_WEIGHT`                        |
| Pivot summaries                 | Average score and record count pivots                               |
| Data quality dimensions         | Completeness, consistency, uniqueness, validity, accuracy           |
| Spreadsheet fragility           | Ranges, casing, repeated data, easy overwrites                      |
| Data lifecycle and stewardship  | Retention, anonymization, and deletion questions about your workbook |

A spreadsheet helped you **see** the data. A database is designed to **manage** the data more reliably over time. That gap is the bridge into Chapter 4.

### Common Mistakes

* Averaging `StudentID` because Sheets allows it. The result is a number with no business meaning.
* Entering dates as text (`9/8/26`) so they cannot be sorted or filtered as dates.
* Letting `Quiz`, `quiz`, and `QUIZ` accumulate as three different categories.
* Overwriting a `VLOOKUP` cell with a typed value, breaking the link without warning.
* Hard-coding ranges like `A2:K8` in `FILTER` or `SORT`, so new rows silently drop out.
* Treating a blank cell, `0`, and `""` as the same thing in formulas and filters.
* Storing student identity on every grade row, so one student ends up with two emails after a single edit.

### Submit or Save

There is no submission for this LB. Save your workbook as **`LB03 — Grading Data Fundamentals — Your Name`** in your course Drive folder. You will reuse these same moves in **Lab 03 — Transferring Data Fundamentals to PetVax**, where you will rebuild this structure for a messy veterinary clinic record and submit the workbook for a grade.

### Peek Ahead — Chapter 4

In Chapter 4, you will move from a spreadsheet to **Microsoft Access**, and the four problems you just named will each get a structural fix:

* **Data redundancy** disappears once student identity lives in its own `Students` table and grades reference the student by `StudentID` instead of repeating name, email, and birthday on every row.
* **Update anomalies** stop because an email lives in exactly one place; changing it once changes it everywhere it is shown.
* **Insertion anomalies** stop because a new student can be added to `Students` without needing a grade, and a new deliverable category can be added without needing a student.
* **Deletion anomalies** stop because removing a grade no longer removes the student or the category — they exist in their own tables.
* **Query fragility** is replaced by typed columns, validation rules the system actually enforces, and queries that refer to tables by name rather than to fragile cell ranges.

Every place this LB felt fragile is a place Chapter 4 will show how a database is designed to be sturdy.
