<!-- metadata: date="2026-06-21" -->

# Lab 13: Hardening the PetVax Database

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center"><em>Turn a working PetVax database into a reliable system — add indexes, write transactions, create triggers, and use window functions to surface patterns the practice manager needs to see.</em></p>

# Overview

Chapter 13 is about hardening: taking a database that works and making it reliable, fast, and safe under real-world use. Indexes speed up queries. Transactions protect data integrity during multi-step changes. Triggers enforce business rules automatically. Window functions reveal patterns that simple GROUP BY queries cannot.

In the Let's Build, you applied these techniques to the Grading Database. In this lab, you apply them to PetVax.

**This lab has two graded parts:**

1. **Quiz part** — auto-gradable check questions.
2. **File submission part** — a SQL script with all queries and a hardening report.

**Estimated time:** 55–70 minutes.

> ⚠️ **Missing-file rule:** If the SQL script is missing, you receive zero for the file-submission part.

# Scenario

PetVax has been running its database for six months. The practice manager reports two problems:

1. The appointment lookup screen is getting slower as the VISIT table grows.
2. Last week, a receptionist accidentally deleted an owner record, which caused errors in several related tables.
3. The manager wants to see which veterinarians are handling the most complex cases, but no existing report shows this.

Your job is to harden the PetVax database: make it faster, safer, and more informative.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part 1: Add Indexes

The VISIT table is growing by about 20 rows per day and now has over 3,000 rows. The most common query is:

```sql
SELECT * FROM VISIT WHERE VisitDate = '2026-06-21' ORDER BY VisitTime;
```

Write a `CREATE INDEX` statement that would speed up this query. Explain why you chose the column(s) you did.

```sql
-- Write your CREATE INDEX statement here

```

> **Check Question 1:** An index on which column would most improve the appointment lookup query above? (Multiple choice: A. VisitID B. VisitDate C. PetID D. VisitTime)

# Part 2: Write a Safe Transaction

The clinic is merging two pet records. Max (PetID = 42) was accidentally created twice. All of Max's visits (7 total) are under the duplicate record. Write a transaction that:

1. Moves all 7 visits from the duplicate PetID to the correct PetID.
2. Deletes the duplicate pet record.
3. Verifies the move succeeded before committing.

Use `BEGIN TRANSACTION`, `UPDATE`, `DELETE`, `SELECT` verification, and `COMMIT` or `ROLLBACK`.

```sql
-- Write your safe merge transaction here

```

> **Check Question 2:** If the UPDATE step succeeds but the verification SELECT shows only 6 rows moved (not 7), what should you do? (Multiple choice.)

# Part 3: Create a Trigger

The practice manager wants a rule: **No treatment charge can exceed $5,000.** If a receptionist tries to enter a charge above $5,000, the database should reject it automatically.

Write a `CREATE TRIGGER` statement (BEFORE INSERT ON VISIT_TREATMENT) that checks the ChargeAmount and raises an error if it exceeds $5,000.

For SQLite, use this pattern:

```sql
CREATE TRIGGER enforce_max_charge
BEFORE INSERT ON VISIT_TREATMENT
BEGIN
    SELECT CASE
        WHEN NEW.ChargeAmount > 5000 THEN
            RAISE(ABORT, 'Charge cannot exceed $5,000')
    END;
END;
```

> **Check Question 3:** What happens if someone tries to UPDATE an existing treatment charge from $200 to $6,000 with this trigger in place? (Multiple choice.)

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part 4: Window Functions for Vet Caseload Analysis

The practice manager wants to understand vet workloads. Using the PetVax schema (OWNER, PET, VET, VISIT, TREATMENT, VISIT_TREATMENT), write a query that returns:

| Column | Description |
|--------|-------------|
| VetName | FirstName + ' ' + LastName |
| VisitDate | Date of the visit |
| DailyVisits | Number of visits that vet handled on that date |
| RunningTotal | Cumulative visits for that vet across all dates (use SUM OVER) |
| VetRank | Rank of the vet by total visits (use RANK OVER) |

```sql
-- Write your window function query here

```

> **Check Question 4:** The vet ranked #1 by total visits has approximately what share of all clinic visits? (Multiple choice: A. <25% B. 25-40% C. 40-55% D. >55%)

# Lab Quiz

## Question 1 — Best Index (Multiple Choice)

To speed up `SELECT * FROM VISIT WHERE VisitDate = '2026-06-21'`, the best column to index is:

- A. VisitID
- B. VisitDate
- C. PetID
- D. VisitTime

## Question 2 — Transaction Safety (Multiple Choice)

If a verification SELECT shows only 6 rows moved instead of the expected 7, you should:

- A. COMMIT anyway — close enough
- B. ROLLBACK and investigate
- C. Run the UPDATE again without checking
- D. Delete the extra row manually

## Question 3 — Trigger Scope (Multiple Choice)

The `enforce_max_charge` trigger fires BEFORE INSERT. A receptionist updates an existing charge from $200 to $6,000. What happens?

- A. The update is blocked because the trigger fires
- B. The update succeeds because the trigger only fires on INSERT
- C. The update partially succeeds
- D. The database crashes

## Question 4 — Window Function (Multiple Choice)

The vet ranked #1 by total visits handles approximately what share of all clinic visits?

- A. Less than 25%
- B. Between 25% and 40%
- C. Between 40% and 55%
- D. More than 55%

## Question 5 — Index Impact (True/False)

Adding an index to a table always makes every query on that table faster.

- True
- False

# Submission

Submit one file: `lab-13-petvax-hardening.sql`

Your SQL script must contain:

1. CREATE INDEX statement (Part 1) with explanation comment
2. Full transaction block (Part 2) with verification
3. CREATE TRIGGER statement (Part 3)
4. Window function query (Part 4)

All SQL must be syntactically correct for SQLite. Include comments separating each part.

> ⚠️ If the SQL script is missing, you receive zero for the file-submission part.

# Lab 13 Completion Checklist

- [ ] Part 1: CREATE INDEX with column explanation
- [ ] Part 2: Transaction includes BEGIN, UPDATE, DELETE, verification SELECT, and COMMIT/ROLLBACK logic
- [ ] Part 3: Trigger checks ChargeAmount > 5000 and raises error
- [ ] Part 4: Window function uses SUM OVER and RANK OVER correctly
- [ ] All SQL is valid SQLite syntax
- [ ] Quiz answers match your SQL logic
