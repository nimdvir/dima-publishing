<!-- markdownlint-disable MD013 MD024 MD028 MD033 MD034 MD036 -->

# Lab 05: Querying the PetVax Database with SQL

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center"><em>Take the SQL moves you practiced on the Grading Database and run them against the same PetVax clinic data you built in Access, now stored in SQLite.</em></p>

## Overview

This lab is a guided SQLite workflow.

In Chapter 5 you learned to write SQL: `SELECT`, `WHERE`, `ORDER BY`, `DISTINCT`, `IS NULL`, `INSERT`, the aggregate functions `COUNT` and `AVG` with `GROUP BY` and `HAVING`, calculated fields, `CASE`, and the safe `UPDATE` workflow. In the **Let's Build** you practiced those moves on the Grading Database. In this lab you apply the same moves to **PetVax**, the veterinary clinic you have been following since Lab 03.

The data is the same clinic you moved into Microsoft Access in Lab 04. PetVax has now exported its appointment data to a SQLite database so the analytics team can query it with SQL. You load a starter script, add two appointments, answer business questions, and submit a clean `.sql` file the owner can rerun.

This lab has **two graded parts**. You must complete both:

- **Part 1 — Brightspace quiz (auto-graded).** You answer a set of exact-answer questions inside the Brightspace quiz for this lab. Most answers come from running a query, so **run the query first, then answer**.
- **Part 2 — SQL file (AI-checked).** You upload your finished `.sql` script to the separate file-submission assignment. An AI grader confirms the script is complete and authentic — that the required statements exist and that the values match your quiz answers.

**Final grade = Brightspace quiz score + SQL file submission.**

- **Chapter:** Chapter 5 — Structured Query Language (SQL)
- **Builds on:** the Chapter 5 Let's Build (Grading Database walkthrough in SQLite)
- **Tool:** SQLiteOnline (browser) or DB Browser for SQLite (desktop)
- **Estimated time:** about 60 minutes

> 💡 **Note:** This lab uses **one table at a time**. You will query `PETVAX_APPOINTMENTS` and `SERVICE_RATES` separately. Combining two tables in one query (a `JOIN`) is the focus of Chapter 6, so it is intentionally left out here.

## Scenario

PetVax is the same single-location veterinary clinic from Lab 04. The clinic moved its appointments out of Access and into a SQLite database. The owner hands you a starter script that creates two tables — `PETVAX_APPOINTMENTS` (April 2026 appointments) and `SERVICE_RATES` (the standard fee for each service) — and loads 24 starter rows. Your job is to load the script, add two new appointments, answer questions about the data, and produce a clean `.sql` file the owner can rerun whenever she wants.

> ⚠️ **Heads-up:** This is the same data you used in Lab 04, so a few totals will look familiar. The difference is that you now produce every answer with a SQL query instead of an Access click. Run every query against the data you load in Step 1.

> 🛑 **Run statements in order.** A few check answers depend on rows you insert in Step 8. Running a later query before its step will give you the wrong answer.

## Required Files and Tools

| Item | Detail |
| --- | --- |
| Tool (option A) | [SQLiteOnline](https://sqliteonline.com/) — browser, no install |
| Tool (option B) | [DB Browser for SQLite](https://sqlitebrowser.org/) — desktop, saves a `.db` file |
| Starter script | `assets/petvax-lab05-setup-2026-06-03.sql` |
| Submission file | `Lab05-PetVax-SQL-LastName.sql` (required) |
| Optional second file | `Lab05-PetVax-SQL-LastName.db` (only if you used DB Browser) |
| Where to submit | Upload to the Lab 05 file-submission assignment in your course site |

**Before you make any changes:** download `petvax-lab05-setup-2026-06-03.sql`, open a new SQL script in your tool, and add a comment header so future-you knows whose file this is:

```sql
-- Lab 05: Querying the PetVax Database with SQL
-- Your Name
-- Chapter 5
```

From here on, write every statement into that one script and keep it saved. The script is what you submit. Label each required query with a SQL comment such as `-- Check 3: No-show appointments` so the grader can find your work quickly.

---

## Step 1 — Load the starter database

**Do.** Open `petvax-lab05-setup-2026-06-03.sql` from `assets/`. Copy its entire contents into your SQL editor *below* your comment header and run it. The script drops any old tables, creates `PETVAX_APPOINTMENTS` and `SERVICE_RATES`, and inserts the starter data. Confirm the load:

```sql
SELECT COUNT(*) FROM PETVAX_APPOINTMENTS;
SELECT COUNT(*) FROM SERVICE_RATES;
```

**Check (Question 1).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 1

How many rows are in `PETVAX_APPOINTMENTS` immediately after running the setup script?

---

## Step 2 — Identify the primary key

**Do.** Read the `CREATE TABLE PETVAX_APPOINTMENTS` statement at the top of the setup script and find the column declared as `PRIMARY KEY`.

**Check (Question 2).**

- **Brightspace type:** Multiple Choice
- **Auto-graded:** Yes
- **Points:** 2

Which column is the primary key of `PETVAX_APPOINTMENTS`?

- A. `PetName`
- B. `OwnerEmail`
- C. `AppointmentID`
- D. `ServiceType`

> 💡 **Note:** A single pet or owner can appear on many appointment rows, so neither `PetName` nor `OwnerEmail` can identify a row. `AppointmentID` identifies the appointment.

---

## Step 3 — Filter the no-shows

**Do.** Write a query that returns every appointment whose status is `No-show`. Show `AppointmentID`, `PetName`, `AppointmentDate`, and `ServiceType`. Sort by `AppointmentDate`. Label the query `-- Check 3: No-show appointments`.

```sql
SELECT AppointmentID, PetName, AppointmentDate, ServiceType
FROM PETVAX_APPOINTMENTS
WHERE AppointmentStatus = 'No-show'
ORDER BY AppointmentDate;
```

**Check (Question 3).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

How many starter rows have `AppointmentStatus = 'No-show'`?

---

## Step 4 — Find vaccine-due appointments

**Do.** Write a query that lists every appointment where `VaccineDue = 'Yes'`. Show `PetName`, `OwnerName`, `ServiceType`, and `AppointmentDate`. Label it `-- Check 4: Vaccine-due appointments`.

**Check (Question 4).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

How many starter rows have `VaccineDue = 'Yes'`?

---

## Step 5 — Find appointments that did not get a reminder

**Do.** Write a query that lists every appointment where `ReminderSent = 'No'`. Show `PetName`, `AppointmentDate`, `AppointmentStatus`, and `ReminderSent`. Label it `-- Check 5: Reminder not sent`.

**Check (Question 5).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

How many starter rows have `ReminderSent = 'No'`?

---

## Step 6 — List the distinct service types

**Do.** Use `DISTINCT` to list each unique `ServiceType` that appears in the starter data.

```sql
SELECT DISTINCT ServiceType
FROM PETVAX_APPOINTMENTS;
```

**Check (Question 6).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 1

How many distinct service types appear in the starter data (before any inserts)?

---

## Step 7 — Find the highest single payment

**Do.** Sort the appointments by `PaymentAmount` from high to low and look at the top row. Use `AppointmentID` as a second sort field so the result stays predictable if two appointments tie.

```sql
SELECT PetName, ServiceType, PaymentAmount
FROM PETVAX_APPOINTMENTS
ORDER BY PaymentAmount DESC, AppointmentID DESC
LIMIT 1;
```

**Check (Question 7).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

Which pet has the highest single `PaymentAmount` in the starter data?

---

## Step 8 — Add two new appointments

**Do.** Write two `INSERT` statements. The first records Maple's vaccination (the same appointment you added through the Access form in Lab 04). The second records a new General Checkup for Biscuit, whose owner email is missing on file.

```sql
-- Check 8: Add two appointments
INSERT INTO PETVAX_APPOINTMENTS
    (AppointmentID, AppointmentDate, AppointmentTime, PetName, OwnerName, OwnerEmail,
     AnimalType, BreedName, WeightKg, ServiceType, VaccineDue, AppointmentStatus,
     ReminderSent, PaymentAmount, Notes)
VALUES
    (1025, '2026-04-03', '10:30 AM', 'Maple', 'Priya Shah', 'priya.shah@example.com',
     'Dog', 'Beagle', 16, 'Vaccination', 'Yes', 'Scheduled', 'Yes', 0,
     'Added through the Access form in Lab 04');

INSERT INTO PETVAX_APPOINTMENTS
    (AppointmentID, AppointmentDate, AppointmentTime, PetName, OwnerName, OwnerEmail,
     AnimalType, BreedName, WeightKg, ServiceType, VaccineDue, AppointmentStatus,
     ReminderSent, PaymentAmount, Notes)
VALUES
    (1026, '2026-04-03', '11:00 AM', 'Biscuit', 'Hannah Reyes', NULL,
     'Cat', 'Sphynx', 4.2, 'General Checkup', 'No', 'Completed', 'Yes', 90.29,
     'Owner email missing on file');
```

Confirm the row count moved:

```sql
SELECT COUNT(*) FROM PETVAX_APPOINTMENTS;
```

**Check (Question 8).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

How many rows are in `PETVAX_APPOINTMENTS` after running both inserts?

---

## Step 9 — Find appointments with a missing owner email

**Do.** Write a query that returns every appointment whose `OwnerEmail` is `NULL`.

```sql
SELECT AppointmentID, PetName, OwnerName, OwnerEmail
FROM PETVAX_APPOINTMENTS
WHERE OwnerEmail IS NULL;
```

> ⚠️ **Common mistake:** `WHERE OwnerEmail = NULL` returns no rows, ever. `NULL` is not a value you can compare with `=`. Always use `IS NULL` or `IS NOT NULL`.

**Check (Question 9).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

How many appointments have `OwnerEmail IS NULL` after both inserts?

---

## Step 10 — Filter on a numeric threshold

**Do.** Write a query that returns every appointment whose `PaymentAmount` is at least 100. Show `PetName`, `ServiceType`, and `PaymentAmount`. Sort by `PaymentAmount` descending. Label it `-- Check 10: Payments of 100 or more`.

```sql
SELECT PetName, ServiceType, PaymentAmount
FROM PETVAX_APPOINTMENTS
WHERE PaymentAmount >= 100
ORDER BY PaymentAmount DESC;
```

**Check (Question 10).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

How many rows have `PaymentAmount >= 100` after both inserts?

---

## Step 11 — Count appointments per service

**Do.** Group the appointments by `ServiceType` and count how many appointments fall in each group. Sort from most to fewest.

```sql
SELECT ServiceType, COUNT(*) AS AppointmentCount
FROM PETVAX_APPOINTMENTS
GROUP BY ServiceType
ORDER BY AppointmentCount DESC;
```

**Check (Question 11).**

- **Brightspace type:** Multiple Choice
- **Auto-graded:** Yes
- **Points:** 1

After both inserts, which `ServiceType` has the **most** appointments?

- A. General Checkup
- B. Dental Cleaning
- C. Vaccination
- D. Emergency Visit

---

## Step 12 — Average payment by service, then filter the groups

**Do.** Group the appointments by `ServiceType`, compute the average `PaymentAmount`, then add a `HAVING` clause to keep only the services whose average is at least 100.

```sql
SELECT ServiceType,
       ROUND(AVG(PaymentAmount), 2) AS AvgPayment
FROM PETVAX_APPOINTMENTS
GROUP BY ServiceType
HAVING AVG(PaymentAmount) >= 100;
```

> 💡 **Note:** `WHERE` filters rows before grouping. `HAVING` filters groups after aggregation. Writing `WHERE AVG(PaymentAmount) >= 100` is a common SQL error.

**Check (Question 12).**

- **Brightspace type:** Multi-Select
- **Auto-graded:** Yes
- **Points:** 2

Which service categories appear in the `HAVING` result? Select **all** that apply.

- A. Vaccination
- B. General Checkup
- C. Dental Cleaning
- D. Emergency Visit
- E. Grooming - Basic

---

## Step 13 — Build a CASE calculated field and count the tiers

**Do.** Use a `CASE` expression to label every appointment by payment tier, then group by the label to count how many fall in each tier.

```sql
SELECT
    CASE
        WHEN PaymentAmount >= 150 THEN 'High'
        WHEN PaymentAmount >= 50  THEN 'Standard'
        ELSE 'Low'
    END AS PaymentTier,
    COUNT(*) AS TierCount
FROM PETVAX_APPOINTMENTS
GROUP BY PaymentTier
ORDER BY TierCount DESC;
```

**Check (Question 13).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

After both inserts, how many appointments fall in the **Low** tier (`PaymentAmount` under 50)?

---

## Step 14 — Query the service-rate table on its own

**Do.** The second table, `SERVICE_RATES`, holds the clinic's standard fee for each service. Query it directly to find the most expensive standard service.

```sql
SELECT ServiceType, StandardFee
FROM SERVICE_RATES
ORDER BY StandardFee DESC;
```

> 💡 **Note:** Right now you are looking at the two tables **separately**. To match each appointment to its standard fee in one result — and flag appointments billed above or below that fee — you would combine the tables with a `JOIN`. That is the focus of Chapter 6.

**Check (Question 14).**

- **Brightspace type:** Multiple Choice
- **Auto-graded:** Yes
- **Points:** 1

Which service has the **highest** `StandardFee` in `SERVICE_RATES`?

- A. Vaccination
- B. General Checkup
- C. Dental Cleaning
- D. Emergency Visit

---

## Step 15 — (Optional) Practice a safe update

> ⚠️ **Optional, not graded.** If you include this block in your submitted `.sql` file, leave the `UPDATE` statement commented out unless your instructor tells you to run it. The required quiz answers are based on the database state **before** this optional update.

**Do.** Suppose the front desk realizes Bella's vaccination should have been recorded as `Completed` instead of left as it is. First verify the row with a `SELECT`. If your instructor asks you to practice the update, uncomment the `UPDATE` lines and run them.

```sql
SELECT AppointmentID, PetName, AppointmentStatus
FROM PETVAX_APPOINTMENTS
WHERE AppointmentID = 1011;

-- Optional preview only. Do not run unless instructed.
-- UPDATE PETVAX_APPOINTMENTS
-- SET    AppointmentStatus = 'Completed'
-- WHERE  AppointmentID = 1011;
```

> 🛑 **Caution:** Never run an `UPDATE` without a `WHERE` clause. `UPDATE PETVAX_APPOINTMENTS SET AppointmentStatus = 'Completed';` would change **every** row in the table.

---

## Step 16 — Save and submit

**Do.** Make sure your `.sql` file contains, in order:

1. Your comment header (name, lab, chapter).
2. The full contents of `petvax-lab05-setup-2026-06-03.sql`.
3. Every query you wrote for Steps 3 through 14 (the two `INSERT` statements from Step 8 included).
4. Optionally, the safe-update preview from Step 15, with the `UPDATE` lines still commented out unless your instructor told you to run them.

Save the file as `Lab05-PetVax-SQL-LastName.sql` (replace `LastName` with your real last name, no spaces). If you used DB Browser for SQLite, you may also save and submit `Lab05-PetVax-SQL-LastName.db`. SQLiteOnline users submit the `.sql` only.

> ✅ **Required statements in your submission**
>
> - The full setup script (both `CREATE TABLE` and all `INSERT` statements)
> - The two new `INSERT` rows: Maple (1025) and Biscuit (1026)
> - Queries for Checks 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, and 14
> - Each required query labeled with a `-- Check N:` comment

## Submission

- Save the file as `Lab05-PetVax-SQL-LastName.sql` (use your real last name, no spaces).
- Upload the `.sql` (and optional `.db`) to the Lab 05 file-submission assignment.
- Answer the auto-graded quiz questions in the Brightspace quiz for this lab.
- **Grading:** quiz checks (26 pts) + AI-graded review of your `.sql` (14 pts) = **40 pts**.

## Optional Extensions

These are not required and are not graded.

- Add a query that returns the average `PaymentAmount` per `AnimalType` (Dog vs. Cat).
- Write a query that counts appointments per `AppointmentDate`.
- Add a `DELETE` *preview* from the Let's Build: write the `SELECT` that would identify a removable row, but do **not** run the `DELETE`.

