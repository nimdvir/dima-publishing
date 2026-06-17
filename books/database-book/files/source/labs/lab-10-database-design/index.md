# Lab 10: Advanced SQL for PetVax Business Analysis

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center">

<p align="center"><em>Map, query, and analyze the PetVax veterinary database with advanced SQL</em></p>

## Overview

This lab transfers the advanced SQL techniques from Chapter 10 and Let's Build 10 to the PetVax veterinary clinic. You will map the PetVax database schema in Lucidchart, then write diagnostic queries, CTE pipelines, views, window functions, and safe data modifications â€” the same skills you practiced on the Grading Database, now applied to a real business context.

**This lab has two graded parts:**

1. **Quiz part** â€” auto-gradable check questions embedded in the steps below. Each answer comes from work you actually perform, so a value you computed or observed becomes the answer you select or enter.
2. **File submission part** â€” a structured artifact (Lucidchart ERD, SQL script, and screenshots) that proves you completed every step. An AI grader will review your submitted file against the rubric.

**Estimated time:** 60â€“75 minutes.

## Scenario

PetVax is a growing veterinary clinic with three locations. The practice manager needs better visibility into clinic operations: Which services generate the most revenue? Which pets are overdue for checkups? Are certain vets seeing more complex cases? The current system stores data in a set of related tables, but no one on staff knows how to query them effectively.

You have been given access to the PetVax database with the following schema:

| Table | What It Stores |
|---|---|
| `OWNER` | Pet owner contact information |
| `PET` | Individual pets and their species, breed, and birth date |
| `VET` | Veterinarian staff information |
| `VISIT` | Clinic visits â€” which pet saw which vet on which date |
| `TREATMENT` | Individual treatments performed during a visit |
| `PAYMENT` | Payments made for visits |

The tables are related as follows:

- `OWNER` (1) â”€â”€â”€ (M) `PET` â€” each owner can have multiple pets.
- `PET` (1) â”€â”€â”€ (M) `VISIT` â€” each pet can have multiple clinic visits.
- `VET` (1) â”€â”€â”€ (M) `VISIT` â€” each vet handles multiple visits.
- `VISIT` (1) â”€â”€â”€ (M) `TREATMENT` â€” each visit can include multiple treatments.
- `VISIT` (1) â”€â”€â”€ (1) `PAYMENT` â€” each visit has one associated payment.

## Required Files and Tools

| What You Need | Details |
|---|---|
| **Lucidchart** | Free education account at [lucid.co](https://lucid.co) |
| **SQL environment** | SQLite ([sqliteonline.com](https://sqliteonline.com/)) or Supabase (PostgreSQL) |
| **PetVax starter database** | `assets/petvax-starter.sql` â€” run this to create and populate the six PetVax tables |
| **Artifact files to submit** | `ch10-petvax-erd-YourName.png` + `ch10-petvax-sql-YourName.sql` + screenshots |

---

## Steps

### Step 1 â€” Set Up the PetVax Database

**Do:** Download the PetVax starter SQL file from `assets/petvax-starter.sql`. Run it in your SQL environment to create and populate all six tables. Verify the tables exist by running:

```sql
SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name;
```

You should see `OWNER`, `PET`, `VET`, `VISIT`, `TREATMENT`, and `PAYMENT`.

**Check:** How many tables are in the PetVax database after running the starter script?

A) 4
B) 5
C) 6
D) 7

---

### Step 2 â€” Map the PetVax ERD in Lucidchart

**Do:** Create a new Entity Relationship Diagram in Lucidchart. Model all six PetVax tables. This is the centerpiece of the lab â€” a visual map of the entire database that makes every relationship and pathway visible.

For each table:
1. Add an entity box with the table name at the top.
2. List all columns below. Bold or underline the primary key.
3. Include the foreign key columns that link tables together.

Draw relationship lines between tables using **Crow's Foot notation**. Make sure to show:
- `OWNER` to `PET` (one owner, many pets)
- `PET` to `VISIT` (one pet, many visits)
- `VET` to `VISIT` (one vet, many visits)
- `VISIT` to `TREATMENT` (one visit, many treatments)
- `VISIT` to `PAYMENT` (one visit, one payment)

Label each relationship line with the foreign key column. Add a note identifying the three main business query pathways:
- **Revenue Pathway:** `OWNER â†’ PET â†’ VISIT â†’ PAYMENT`
- **Clinical Pathway:** `PET â†’ VISIT â†’ TREATMENT`
- **Vet Workload Pathway:** `VET â†’ VISIT`

Export the finished diagram as a PNG or PDF.

**Check (multi-select):** Which of the following are foreign keys in the PetVax schema? Select all that apply.

A) `OwnerID` in the `PET` table
B) `PetID` in the `VISIT` table
C) `VisitID` in the `VISIT` table
D) `VetID` in the `VISIT` table
E) `VisitID` in the `TREATMENT` table

---

### Step 3 â€” Run Diagnostic Queries on PetVax Data

**Do:** Before building reports, check whether the PetVax data is clean. Write and run these two diagnostic queries.

**Query 1 â€” Find treatments with invalid costs.** Treatments should never have a negative or zero cost. Write a query that returns any treatment row where `Cost <= 0`.

```sql
-- Write your diagnostic query here
```

**Query 2 â€” Find pets with duplicate names per owner.** An owner should not have two pets with the same name. Write a query that groups by `OwnerID` and `Name` and returns any combination that appears more than once.

```sql
-- Write your diagnostic query here
```

Save both queries in your SQL script file.

**Check (short answer):** How many rows did your first diagnostic query (invalid treatment costs) return? Enter the exact number.

---

### Step 4 â€” Build a CTE Pipeline for Revenue Analysis

**Do:** The practice manager wants to know which pet species generates the most revenue. Build a three-stage CTE pipeline.

1. **VisitTotals** â€” Join `VISIT`, `PET`, and `PAYMENT`. For each visit, return the `Species` and the `Amount` paid.
2. **SpeciesRevenue** â€” Group by `Species` and calculate the total revenue and the number of visits.
3. **RankedSpecies** â€” Add a revenue rank using `RANK() OVER (ORDER BY TotalRevenue DESC)`.

The final query should return: `Species`, `TotalRevenue` (2 decimals), `VisitCount`, and `RevenueRank`, ordered by rank ascending. Save this query in your SQL script.

**Check (multiple choice):** Based on your query results, which species ranks FIRST by total revenue?

A) Dog
B) Cat
C) Bird
D) Rabbit

---

### Step 5 â€” Create a View for the Daily Operations Dashboard

**Do:** The practice manager needs a reusable view that shows today's key metrics at a glance. Create a view called `DailyOpsSummary` with these columns:

| Column | Source / Logic |
|---|---|
| `VisitDate` | From `VISIT` |
| `TotalVisits` | `COUNT(DISTINCT VisitID)` |
| `TotalRevenue` | `SUM(Amount)` from `PAYMENT` |
| `UniquePets` | `COUNT(DISTINCT PetID)` |
| `UniqueVets` | `COUNT(DISTINCT VetID)` |
| `AvgRevenuePerVisit` | `TotalRevenue / TotalVisits`, rounded to 2 decimals |

Group by `VisitDate`. After creating the view, run:

```sql
SELECT * FROM DailyOpsSummary ORDER BY VisitDate DESC;
```

Save both the `CREATE VIEW` statement and the `SELECT` query in your SQL script.

**Check (short answer):** On the date with the most visits in your result set, what was the `AvgRevenuePerVisit`? Enter the exact number rounded to 2 decimal places (e.g., 125.50).

---

### Step 6 â€” Rank Vets by Caseload with Window Functions

**Do:** The clinic director wants to see how the caseload distributes across vets. Write a query that, for each vet on each date they worked, shows:

| Column | How |
|---|---|
| `VetName` | `FirstName || ' ' || LastName` from `VET` |
| `VisitDate` | From `VISIT` |
| `DailyVisits` | Count of visits for that vet on that date |
| `VetTotalVisits` | `SUM(DailyVisits) OVER (PARTITION BY VetID)` â€” the vet's total across all dates |
| `VetRank` | `RANK() OVER (ORDER BY VetTotalVisits DESC)` |

Order by `VetRank`, then `VisitDate`. Save this query in your SQL script.

**Check (multiple choice):** The vet ranked #1 by total visits â€” what is their approximate share of all clinic visits?

A) Less than 25% of all visits
B) Between 25% and 40% of all visits
C) Between 40% and 55% of all visits
D) More than 55% of all visits

---

### Step 7 â€” Practice a Safe Update with a Transaction

**Do:** The clinic is running a promotion: a 10% discount on all treatments with a cost above $100, capped so no treatment cost falls below $100 after the discount. Apply this change safely.

1. **Verify first.** Write a `SELECT` that shows all treatments with `Cost > 100` before the change.
2. **Wrap in a transaction.** Use `BEGIN TRANSACTION;` then `UPDATE TREATMENT SET Cost = ...` with a `CASE` expression that applies the 10% discount but ensures the result is not less than 100.
3. **Verify again.** Run a `SELECT` confirming no treatment cost is below 100 and no treatment originally â‰¤ $100 was changed.
4. Add comments showing where you would `ROLLBACK` if verification fails and where you `COMMIT` if it passes.

Save the entire transaction block in your SQL script.

**Check (short answer):** After running the update (but before COMMIT), how many treatment rows were modified? Enter the exact number.

---

## Submission

Submit the following three files:

| File | Format | Naming Convention |
|---|---|---|
| PetVax ERD | PNG or PDF | `ch10-petvax-erd-YourName.png` |
| SQL script | `.sql` | `ch10-petvax-sql-YourName.sql` |
| Screenshots | PNG or JPG | `ch10-petvax-results-YourName.png` |

The SQL script must contain ALL queries from Steps 3 through 7, clearly separated by comments indicating the step number. The screenshots must show the output of: (a) your `DailyOpsSummary` view query, and (b) your window function vet-ranking query.

Upload all files to the assignment submission area in your LMS.

**Your final grade = quiz check-question correctness + AI-graded review of your submitted artifact file.**

## Optional Extensions

These are not required and do not affect your grade. Try them if you finish early or want extra practice.

- **Add a recursive query.** If PetVax had a `REFERRAL` table tracking which vet referred a case to which specialist, write a CTE that traces a referral chain.
- **Materialize the dashboard.** Research `CREATE MATERIALIZED VIEW` in PostgreSQL and explain when you would use one instead of a regular view for the `DailyOpsSummary`.
- **Add indexes.** Identify which columns in the PetVax schema would benefit from indexes for the queries you wrote. Add `CREATE INDEX` statements with comments explaining your choices.
