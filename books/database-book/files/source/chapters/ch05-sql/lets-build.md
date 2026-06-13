<!-- markdownlint-disable MD013 MD024 MD028 MD033 MD034 MD036 MD041 MD060 -->
<!-- metadata: date="2026-06-03" -->

## Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

In Chapter 4 you clicked queries together in Access Query Design. Here you write them yourself in **SQL**, against the Grading Database (GD) you already know. This Let's Build is the **teaching twin** of your graded lab: every move you practice here on the GD is the same move you will run on the PetVax clinic in **Lab 05 — Querying the PetVax Database with SQL**. Work through it once on the GD, and the lab becomes a guided transfer instead of a cold start.

There is no submission for this Let's Build. Save your `.sql` file for yourself; the graded work happens in Lab 05.

### Purpose

Move from clicking queries to writing them. By the end you can read any clause in this build, predict its result before you run it, and recognize the exact same pattern when it reappears in Lab 05 with veterinary-clinic data.

### What You Will Practice

- Loading a database from a setup script and confirming the row count.
- Filtering rows with `WHERE`, comparison operators, and text flags.
- Handling missing values with `IS NULL`.
- Listing unique values with `DISTINCT`.
- Sorting with `ORDER BY` and finding a top value.
- Adding rows with `INSERT INTO`.
- Summarizing with `COUNT`, `AVG`, `GROUP BY`, and `HAVING`.
- Labeling rows with `CASE`.
- Querying a second table on its own (joins wait for Chapter 6).
- Previewing the safe-update workflow.

> 💡 **Note:** This build uses **one table at a time**. You query `GRADEBOOK` and `GRADE_WEIGHT` separately. Combining two tables in a single query (a `JOIN`) is the focus of Chapter 6, so it is left out here on purpose — exactly as it is in Lab 05.

### Before You Begin

Use **SQLite**. Either tool works:

| Tool | Best for |
|---|---|
| [SQLiteOnline](https://sqliteonline.com/) | Quick start in a browser, no install |
| [DB Browser for SQLite](https://sqlitebrowser.org/) | Saving a local `.db` file |

Open a new SQL script and start it with a comment header:

```sql
-- LB05: Querying the Grading Database with SQL
-- Your Name
-- Chapter 5 Let's Build
```

SQL comments begin with `--`. The database ignores them; they exist for the reader. Write every statement into this one script and keep it saved. Run the statements **in order** — a few later results depend on rows you insert partway through.

> 🛑 **Run in order.** Running a check before the step that loads its data will give you the wrong answer. This is the same rule you will follow in Lab 05.

### Load the Grading Database

Open `assets/ch05-lb-setup-2026-06-03.sql`, copy its full contents below your header, and run it. The script drops any old tables, creates `GRADEBOOK` and `GRADE_WEIGHT`, and inserts the starter data. Confirm the load:

```sql
SELECT COUNT(*) FROM GRADEBOOK;
SELECT COUNT(*) FROM GRADE_WEIGHT;
```

Expected: **12** grade records and **6** category rows. If the counts are off, fix the load before going further — every later query depends on it.

### Find the Primary Key

Read the `CREATE TABLE GRADEBOOK` statement and find the column declared `PRIMARY KEY`. It is `RecordID`. A single student or deliverable type appears on many rows, so neither can identify a row — but each `RecordID` is unique.

### Filter the Missing Submissions

**Which records were never submitted?** Filter on the `Status` flag:

```sql
SELECT RecordID, FirstName, LastName, DeliverableType, DueDate
FROM GRADEBOOK
WHERE Status = 'Missing'
ORDER BY DueDate;
```

Expected: **2 rows** (Brian's Quiz 2 and Emma's Exam 1). In Lab 05 this same query finds the clinic's `No-show` appointments.

### List Records Flagged for Retake

**Which records are flagged `Retake = 'Yes'`?**

```sql
SELECT FirstName, LastName, DeliverableType, Status
FROM GRADEBOOK
WHERE Retake = 'Yes';
```

Expected: **3 rows** (RecordID 4, 8, 11). A `Yes`/`No` flag column is queried the same way in Lab 05, where it finds the appointments with a vaccine due.

### Find Records With No Feedback Sent

**Which graded records never got feedback returned?**

```sql
SELECT FirstName, LastName, DeliverableType, FeedbackSent
FROM GRADEBOOK
WHERE FeedbackSent = 'No';
```

Expected: **3 rows** (RecordID 2, 4, 8). In Lab 05 the same pattern finds appointments where no reminder was sent.

### List the Distinct Deliverable Types

**What categories of work appear in the gradebook?** Use `DISTINCT`:

```sql
SELECT DISTINCT DeliverableType
FROM GRADEBOOK;
```

Expected: **6** types — Quiz, Homework, Exam, Project, Lab, Participation. Lab 05 runs the identical query to list the clinic's distinct service types.

### Find the Highest Score

Sort high to low and look at the top row. A second sort field keeps the result predictable on ties:

```sql
SELECT FirstName, LastName, DeliverableType, Score
FROM GRADEBOOK
ORDER BY Score DESC, RecordID DESC
LIMIT 1;
```

Expected: **Daniel Kim, Homework, 100**. (Missing rows have a `NULL` score, which sorts below every number.) In Lab 05 this finds the pet with the highest single payment.

### Add Two New Records

Write two `INSERT` statements. The first adds a graded quiz for a new student. The second adds a homework record whose email is missing on file.

```sql
-- Add two records
INSERT INTO GRADEBOOK
    (RecordID, StudentID, FirstName, LastName, Email,
     DeliverableType, DeliverableNumber, DueDate, Status, Retake, FeedbackSent, Score)
VALUES
    (13, 'S1007', 'Olivia', 'Reed', 'olivia@university.edu',
     'Quiz', 2, '2026-09-15', 'Graded', 'No', 'Yes', 81);

INSERT INTO GRADEBOOK
    (RecordID, StudentID, FirstName, LastName, Email,
     DeliverableType, DeliverableNumber, DueDate, Status, Retake, FeedbackSent, Score)
VALUES
    (14, 'S1008', 'Lucas', 'Gray', NULL,
     'Homework', 1, '2026-09-10', 'Graded', 'No', 'Yes', 88);
```

Confirm the count moved:

```sql
SELECT COUNT(*) FROM GRADEBOOK;
```

Expected: **14**. Lab 05 has the same two-insert step — one normal record and one with a missing field.

### Find Records With a Missing Email

**Which records have no email on file?**

```sql
SELECT RecordID, FirstName, LastName, Email
FROM GRADEBOOK
WHERE Email IS NULL;
```

Expected: **1 row** (Lucas Gray, the record you just added).

> ⚠️ **Common mistake:** `WHERE Email = NULL` returns no rows, ever. `NULL` is not a value you can compare with `=`. Always use `IS NULL` or `IS NOT NULL`. This is the single most common slip in Lab 05.

### Filter on a Score Threshold

**Which records scored 90 or higher?**

```sql
SELECT FirstName, LastName, DeliverableType, Score
FROM GRADEBOOK
WHERE Score >= 90
ORDER BY Score DESC;
```

Expected: **6 rows** (scores 92, 90, 95, 100, 91, 93). `NULL` scores are skipped automatically. In Lab 05 the same numeric filter finds appointments billed at or above a dollar threshold.

### Count Records per Deliverable Type

**How many records are in each category?** Group and count:

```sql
SELECT DeliverableType, COUNT(*) AS RecordCount
FROM GRADEBOOK
GROUP BY DeliverableType
ORDER BY RecordCount DESC;
```

After both inserts, **Quiz** is the busiest category with **5** records. Lab 05 runs the identical grouping to find the clinic's busiest service.

### Average Score by Type, Then Filter the Groups

**Which categories average 90 or higher?** Group, average, then filter the groups with `HAVING`:

```sql
SELECT DeliverableType,
       ROUND(AVG(Score), 2) AS AvgScore
FROM GRADEBOOK
GROUP BY DeliverableType
HAVING AVG(Score) >= 90;
```

Expected: **Homework** (94.33) and **Exam** (91.0). `AVG` ignores `NULL`, so missing submissions do not drag the averages down.

> 💡 **Note:** `WHERE` filters rows *before* grouping. `HAVING` filters groups *after* aggregation. Writing `WHERE AVG(Score) >= 90` is a classic SQL error. Lab 05 reuses this exact `GROUP BY ... HAVING` shape.

### Label Each Record With CASE

**Sort every record into a performance band and count the bands.** A `CASE` expression builds the label; grouping by it counts each band:

```sql
SELECT
    CASE
        WHEN Score IS NULL  THEN 'Not Graded'
        WHEN Score >= 90    THEN 'High Performance'
        WHEN Score >= 80    THEN 'On Track'
        ELSE 'Needs Attention'
    END AS PerformanceBand,
    COUNT(*) AS BandCount
FROM GRADEBOOK
GROUP BY PerformanceBand
ORDER BY BandCount DESC;
```

Expected after both inserts: **High Performance = 6**, On Track = 5, Not Graded = 2, Needs Attention = 1 (total 14). The first `WHEN` catches missing scores so they are not mislabeled. Lab 05 builds the same kind of tiered `CASE` label on payment amounts.

### Query the Weight Table on Its Own

The second table, `GRADE_WEIGHT`, holds how much each category counts toward the final grade. Query it directly to find the heaviest category:

```sql
SELECT DeliverableType, CategoryWeight
FROM GRADE_WEIGHT
ORDER BY CategoryWeight DESC;
```

Expected: **Exam** carries the highest weight (40).

> 💡 **Note:** Right now you are reading the two tables **separately**. To match each grade record to its category weight in one result — and compute a weighted contribution — you would combine the tables with a `JOIN`. That is the focus of Chapter 6. Lab 05 stops at this same point, querying its rate table on its own.

### (Optional) Practice a Safe Update

> ⚠️ **Optional, not graded.** The required pattern is **`SELECT` first, change second**. Keep the `UPDATE` commented out unless you choose to run it.

Suppose Brian's missing Quiz 2 (RecordID 4) was actually submitted and should be graded. Verify the row first:

```sql
SELECT RecordID, FirstName, DeliverableType, Status, Score
FROM GRADEBOOK
WHERE RecordID = 4;

-- Optional preview only. Uncomment to practice.
-- UPDATE GRADEBOOK
-- SET    Status = 'Graded', Score = 79
-- WHERE  RecordID = 4;
```

> 🛑 **Caution:** Never run an `UPDATE` without a `WHERE` clause. `UPDATE GRADEBOOK SET Score = 79;` would change **every** row. SQL is obedient, not forgiving.

### Check Your Work

| Check | Expected |
|---|---:|
| Rows in `GRADEBOOK` after setup | 12 |
| Rows in `GRADEBOOK` after both inserts | 14 |
| `Status = 'Missing'` (starter) | 2 |
| `Retake = 'Yes'` (starter) | 3 |
| `FeedbackSent = 'No'` (starter) | 3 |
| Distinct deliverable types | 6 |
| Highest score | Daniel Kim, 100 |
| `Email IS NULL` (after inserts) | 1 |
| `Score >= 90` (after inserts) | 6 |
| Busiest category | Quiz (5) |
| `HAVING AVG(Score) >= 90` | Homework, Exam |
| High Performance band | 6 |
| Heaviest `GRADE_WEIGHT` category | Exam (40) |

### What This Shows

You moved from a database that *stores* data to one you can *question* in writing. Each clause did one job: `WHERE` filtered, `DISTINCT` deduplicated, `ORDER BY` ranked, `INSERT` added, `IS NULL` caught gaps, `GROUP BY`/`HAVING` summarized, and `CASE` turned numbers into labels — all without touching a join. The flat `GRADEBOOK` table still repeats student details across rows; better queries cannot fix weak design. Chapter 6 begins that fix.

### Common Mistakes

| Mistake | Why it matters | Fix |
|---|---|---|
| `WHERE Email = NULL` | `NULL` needs special comparison | Use `IS NULL` / `IS NOT NULL` |
| Forgetting quotes around text | SQL reads the value as a column name | Quote text: `'Quiz'` |
| `WHERE AVG(Score) >= 90` | Aggregates cannot go in `WHERE` | Use `HAVING AVG(Score) >= 90` |
| `UPDATE` without `WHERE` | Changes every row | Verify with `SELECT` first |
| Expecting Access syntax | SQLite uses different string and date syntax than Access | Watch the platform note |
| Running a check out of order | Counts depend on earlier inserts | Run top to bottom |

### How This Maps to Lab 05

Every section above has a twin in Lab 05. Work the GD here, then run the same move on PetVax there.

| This Let's Build (Grading Database) | Lab 05 (PetVax clinic) |
|---|---|
| Load `GRADEBOOK`, count rows | Load `PETVAX_APPOINTMENTS`, count rows |
| Filter `Status = 'Missing'` | Filter `AppointmentStatus = 'No-show'` |
| Filter `Retake = 'Yes'` | Filter `VaccineDue = 'Yes'` |
| Filter `FeedbackSent = 'No'` | Filter `ReminderSent = 'No'` |
| `DISTINCT DeliverableType` | `DISTINCT ServiceType` |
| Highest `Score` | Highest `PaymentAmount` |
| Two `INSERT`s (one with `NULL`) | Two `INSERT`s (one with `NULL` email) |
| `Email IS NULL` | `OwnerEmail IS NULL` |
| `Score >= 90` | `PaymentAmount >= 100` |
| `GROUP BY` count, find busiest | `GROUP BY` count, find busiest service |
| `GROUP BY ... HAVING AVG` | `GROUP BY ... HAVING AVG` |
| `CASE` performance bands | `CASE` payment tiers |
| Query `GRADE_WEIGHT` alone | Query `SERVICE_RATES` alone |

### Save Your Work

Save your script as `ch05_lb_<lastname>.sql` (and optionally a `.db` if you used DB Browser). Keep it — it is your worked template for **Lab 05 — Querying the PetVax Database with SQL**, where you run these same patterns on the clinic data for a grade.

### Peek Ahead — Chapter 6

Every query here read one table at a time, and you saw the seams: `GRADEBOOK` repeats each student's name and email on every row, and `GRADE_WEIGHT` sits off to the side, reachable only by a separate query. Chapter 6 introduces **relationships and joins**, which let you connect the two tables in a single statement — matching each grade record to its category weight, computing weighted contributions, and flagging records whose category does not exist. That is where these separate tables finally start working together.
