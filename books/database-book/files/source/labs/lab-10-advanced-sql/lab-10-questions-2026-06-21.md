---
section: "Lab Questions"
lab: "Lab 10"
title: "Advanced SQL for PetVax Analytics"
date: "2026-06-21"
---

# Lab 10: Advanced SQL for PetVax Analytics

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

*Apply diagnostic queries, CTE pipelines, window functions, and safe updates to the PetVax clinic database — the same advanced SQL you practiced on the Grading Database.*

## Overview

In this lab you move from basic queries to professional SQL that diagnoses problems, ranks performance, and protects data integrity. Using the PetVax clinic database you designed in Lab 09, you will write diagnostic queries that find operational gaps, build a multi-stage CTE pipeline that ranks veterinarians by utilization and revenue, create a reusable performance view, use window functions to compare without collapsing detail, and practice a safe bulk update wrapped in a transaction.

The primary environment is **Microsoft Access SQL View**. For window functions and CTEs — which standard Access does not support — use SQLite (sqliteonline.com) with the provided setup script. Every query you write here transfers the same advanced SQL patterns from the Grading Database Let's Build to the veterinary clinic domain.

- Chapter: Chapter 10 — Advanced SQL for Business Analysis.
- Builds on: [ch10-lets-build-2026-06-19.md](../../ch10-advanced-sql-queries/lets-build/ch10-lets-build-2026-06-19.md).
- Estimated time: ~75 minutes.
- Tools: Microsoft Access SQL View (primary); SQLite (sqliteonline.com) for CTEs and window functions.

## Scenario

PetVax has been running for two years and the clinic database is growing. The clinic manager wants to move beyond simple lookups — *which pets are scheduled today?* — to deeper operational questions:

- Are there vets with zero appointments in the last 30 days?
- Which pets have never received a vaccination?
- Which invoices are still unpaid?
- Which vet generates the most revenue per month?
- If we raise all service charges by 5%, what would change?

Your job is to write the advanced SQL that answers these questions. You will use the PetVax schema from Lab 09 (or the provided starter script). Every query should be production-ready: diagnostic queries check for problems before analysis, updates are wrapped in transactions, and views make complex logic reusable.

## Required Files and Tools

| Item            | Detail                                                                                                            |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| Tool 1          | Microsoft Access — for all single-statement queries (Steps 1–2, 4–5)                                              |
| Tool 2          | SQLite (sqliteonline.com) — for CTE pipeline and window functions (Steps 3 and 5)                                 |
| Starter script  | [`lab-10-petvax-setup.sql`](./assets/lab-10-petvax-setup.sql) — creates and populates the PetVax schema in SQLite |
| Submission file | `Lab10-PetVax-AdvancedSQL-LastName.sql` — all queries with labels and comments                                    |
| Where to submit | Upload your `.sql` file to the Lab 10 dropbox                                                                     |

Before you begin: download the starter script and load it into SQLite to create the PetVax schema with sample data. Write your queries in Access first, then copy the window-function and CTE queries to SQLite.

## Steps

### Step 1 — Verify the schema

**Do.** Run the starter script in SQLite. Confirm the row counts for the main tables. In Access, open your Lab 09 database or import the starter tables. Verify you can see all seven tables: `OWNER`, `PET`, `VETERINARIAN`, `APPOINTMENT`, `SERVICE`, `APPOINTMENT_SERVICE`, `INVOICE`.

**Check 1.** *(Short answer)* After running the setup script, how many rows are in the `VETERINARIAN` table?

**Check 2.** *(Short answer)* How many rows are in the `APPOINTMENT` table?

### Step 2 — Write diagnostic queries

**Do.** Write four queries that detect data problems before any analysis begins. Diagnostic queries answer the question "Is the data clean enough to trust?" Write each query in Access SQL View and save it with a clear name.

**Query A — Idle Vets:** Find veterinarians who have zero appointments in the last 30 days. Use a `LEFT JOIN` between `VETERINARIAN` and `APPOINTMENT` and check for `NULL` appointment IDs. Also include the filter `ApptDate >= DATE() - 30` or the equivalent date calculation for your platform.

**Query B — Never Vaccinated:** Find pets that have never received a vaccination service. Join `PET` to `APPOINTMENT` to `APPOINTMENT_SERVICE` and look for pets where no service is related to vaccination (use a `LEFT JOIN` with `IS NULL`). Vaccination services have "Vaccination" in the `ServiceName`.

**Query C — Unpaid Invoices:** Find invoices where `TotalAmount > 0` but `PaidDate IS NULL`. These represent revenue the clinic has earned but not collected.

**Query D — Duplicate Appointments:** Find appointments where the same pet sees the same vet on the same date and time. Use `GROUP BY PetID, VetID, ApptDate, ApptTime HAVING COUNT(*) > 1`.

**Check 3.** *(Multiple choice)* Which type of JOIN is best for finding vets with no appointments?

- A. `INNER JOIN`
- B. `LEFT JOIN ... WHERE right_table.ID IS NULL`
- C. `CROSS JOIN`
- D. `RIGHT JOIN`

**Check 4.** *(Short answer)* In Query B, which keyword do you use to find pets where no matching vaccination service exists?

**Check 5.** *(Multi-select)* Which of the following are valid diagnostic questions for the PetVax database? Select all that apply.

- A. Which owners have no pets on file?
- B. Which appointments have no linked services?
- C. What is the average invoice amount per owner?
- D. Which invoices have a TotalAmount that does not match the sum of their APPOINTMENT_SERVICE charges?

### Step 3 — Build a CTE pipeline for vet ranking

**Do.** Switch to SQLite for this step. Write a multi-stage CTE that ranks veterinarians by appointment count and revenue.

Structure your query as three CTEs feeding into one final SELECT:

```sql
WITH
ApptCounts AS (
    -- Count appointments per vet per month
),
RevenuePerVet AS (
    -- Sum invoice totals per vet
),
VetRanking AS (
    -- RANK vets by appointment count and revenue
)
SELECT ...
```

Your final output should show: vet first and last name, appointment count, total revenue, and rank — ordered by rank ascending.

**Check 6.** *(Short answer)* In your `VetRanking` CTE, which window function did you use to assign ranks?

**Check 7.** *(Multiple choice)* What does `RANK() OVER (ORDER BY TotalRevenue DESC)` return when two vets have exactly the same total revenue?

- A. The same rank for both, then the next rank is skipped (e.g., 1, 1, 3)
- B. The same rank for both, then the next rank continues (e.g., 1, 1, 2)
- C. An error — RANK cannot handle ties
- D. Random assignment of different ranks

**Check 8.** *(Short answer)* How many vets appear in your final ranked output?

### Step 4 — Create a reusable VET_PERFORMANCE view

**Do.** In Access SQL View, create a view called `VET_PERFORMANCE` that combines:

- Vet first and last name
- Total appointment count
- Average revenue per appointment
- Return visit rate (number of pets that visited this vet more than once divided by total unique pets seen)

Save the view and query it with `SELECT * FROM VET_PERFORMANCE ORDER BY AvgRevenuePerAppointment DESC;`.

**Check 9.** *(Short answer)* What SQL command creates a reusable view?

**Check 10.** *(Multiple choice)* Why create a view instead of running the same JOIN query every time?

- A. Views are faster than tables
- B. Views encapsulate complex logic once and can be queried like a table
- C. Views automatically update the underlying data
- D. Views are required for all multi-table queries

### Step 5 — Safe UPDATE with transaction protection

**Do.** The clinic manager wants to raise all service charges by 5%. Before you run the update, you must verify the current values, wrap the change in a transaction, verify the result, and either commit or roll back.

In SQLite, write this workflow:

```sql
-- 1. Verify BEFORE
SELECT ServiceID, ServiceName, DefaultCharge FROM SERVICE ORDER BY ServiceID;

-- 2. Begin transaction
BEGIN;

-- 3. Apply the update
UPDATE SERVICE
SET DefaultCharge = ROUND(DefaultCharge * 1.05, 2);

-- 4. Verify AFTER
SELECT ServiceID, ServiceName, DefaultCharge FROM SERVICE ORDER BY ServiceID;

-- 5. COMMIT if correct, ROLLBACK if wrong
COMMIT;
-- ROLLBACK;  -- uncomment this instead if the update looks wrong
```

In Access, the transaction pattern uses **BeginTrans** / **CommitTrans** macros or VBA. For SQL View, Access automatically commits each statement — so write the UPDATE as a standalone query that you verify carefully before running.

**Check 11.** *(Multiple choice)* What is the purpose of wrapping an UPDATE in a transaction?

- A. It makes the query run faster
- B. It ensures the change is either fully applied or fully undone — never half-applied
- C. It bypasses referential integrity checks
- D. It creates an automatic backup

**Check 12.** *(Short answer)* After your UPDATE, what is the new DefaultCharge for the service that was previously $50.00? Enter a number to two decimal places.

**Check 13.** *(Multiple choice)* What happens if you forget the `WHERE` clause in an UPDATE statement?

- A. Nothing — the DBMS ignores it
- B. Every row in the table is updated
- C. The query fails with a syntax error
- D. Only the first row is updated

**Check 14.** *(Short answer)* In the safe UPDATE workflow, what is the purpose of the "Verify BEFORE" step?

---

## Submission

Submit one file:

- `Lab10-PetVax-AdvancedSQL-LastName.sql` — containing ALL queries from Steps 1–5, with clear comment headers labeling each query.

> ⚠️ **Missing-file rule:** If the `.sql` file is missing, you receive zero for the file-submission part of this lab.

Each query in your file must be labeled with a comment:

```sql
-- Query A: Idle Vets (Step 2)
SELECT ...
```

Final grade = quiz score (14 questions, auto-graded) + AI-graded artifact (SQL file checked for correctness and completeness).

## Optional Extensions

- Add a `HAVING` clause to Query A that only shows vets with more than 2 missed months.
- Write a window function query that shows each vet's monthly revenue alongside a 3-month moving average.
- In the CTE pipeline from Step 3, add a `DENSE_RANK()` column and compare the output to `RANK()`.
