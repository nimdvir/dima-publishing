# Lab 06: Building the PetVax Relational Database in Access

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

*Take the relational design pattern you practiced on the Grading Database and rebuild it for PetVax: separated subjects, junction tables, enforced relationships, and three payoff queries.*

## Overview

In this lab you take a starter PetVax database that already contains six tables of clinic data and turn it into a real relational design. You will identify primary keys, create five relationships with referential integrity enforced, prove that referential integrity is doing real work by trying to insert bad rows, and then build three saved queries that pay off the relational design — a multi-table billing join, a `LEFT JOIN` summary that surfaces an owner with no pets, and a missing-records anti-join that uses `CROSS JOIN` plus `LEFT JOIN ... IS NULL`.

- Chapter: Chapter 6 — The Relational Model.
- Builds on: [ch06-lets-build-2026-05-24.md](../../ch06-relational-model/lets-build/ch06-lets-build-2026-05-24.md) (Grading Database walkthrough in Access).
- Estimated time: ~60–75 minutes.
- Tool: Microsoft Access (desktop).

## Scenario

PetVax is a small veterinary clinic. Until now its records have lived in a flat appointment spreadsheet. The owner has asked you to convert that into a real relational database so the clinic can ask harder questions — *who never came back for a vaccination?*, *which owners have no pets on file?*, *which appointments were billed off the standard fee?* — without scrolling through rows.

The starter database `lab-06-petvax-relational-starter.accdb` already contains six tables loaded with starter data. Your job is to wire the relationships, enforce referential integrity, and write the three queries.

> ⚠️ **Heads-up:** The starter file ships with **no relationships and no saved queries**. That is intentional. Building those is the graded work.

## Required Files and Tools

| Item | Detail |
| --- | --- |
| Tool | Microsoft Access (2019 or newer; Microsoft 365 also works) |
| Starter database | [`lab-06-petvax-relational-starter.accdb`](./assets/lab-06-petvax-relational-starter.accdb) (in `assets/`) |
| Submission file 1 | `Lab06-PetVax-Relational-LastName.accdb` (required) |
| Submission file 2 | `Lab06-PetVax-Relationships-LastName.pdf` (required — relationship report) |
| Where to submit | Upload both files to the Lab 06 dropbox in your course site |

Before you make any changes: download the starter database, open it in Access, and save a working copy as `Lab06-PetVax-Relational-LastName.accdb`. Work in the copy from this point forward.

## Steps

### Step 1 — Open and save a working copy

**Do.** Download `lab-06-petvax-relational-starter.accdb` from `assets/`. Open it in Access. Use **File → Save As → Save Database As → Access Database** and save the working copy as `Lab06-PetVax-Relational-LastName.accdb`. Close the starter file. From this point on, work only in your working copy.

In the **Navigation Pane** on the left, look at the list of tables.

**Check 1.** *(Short answer)* How many tables are in the starter database?

### Step 2 — Inspect tables and primary keys

**Do.** Open each table in **Design View** (right-click the table name → **Design View**). Look for the small key icon next to one field — that field is the primary key. Note down the primary key for each table. Then close every table before moving on.

**Check 2.** *(Matching)* Match each table to its primary key.

| Table | Primary Key options |
| --- | --- |
| `OWNER` | `OwnerID` · `OwnerName` · `OwnerEmail` |
| `PET` | `PetID` · `PetName` · `BreedName` |
| `PET_OWNER` | `PetOwnerID` · `PetID` · `OwnerID` |
| `APPOINTMENT` | `AppointmentID` · `PetID` · `AppointmentDate` |
| `SERVICE_TYPE` | `ServiceType` · `StandardFee` · `RequiresVaccineTracking` |
| `APPOINTMENT_SERVICE` | `AppointmentServiceID` · `AppointmentID` · `ServiceType` |

**Check 3.** *(Multiple choice)* Which table resolves the many-to-many relationship between owners and pets?

- A. `OWNER`
- B. `PET`
- C. `PET_OWNER`
- D. `APPOINTMENT`

### Step 3 — Create the five relationships

:::callout{type="warning" title="⚠️ Close every open table first"}
Access will not let you edit relationships while a child table is open in Datasheet or Design View. Close every table before opening the Relationships window.
:::

**Do.** Open **Database Tools → Relationships**. Click **Show Table** and add all six PetVax tables to the layout. Drag the parent field onto the matching child field to create each of the five relationships in the table below. For **every** relationship, in the **Edit Relationships** dialog:

- check **Enforce Referential Integrity**;
- leave **Cascade Update Related Fields** unchecked;
- leave **Cascade Delete Related Records** unchecked.

| # | Parent table | Child table | Join fields |
| - | --- | --- | --- |
| 1 | `OWNER` | `PET_OWNER` | `OwnerID` → `OwnerID` |
| 2 | `PET` | `PET_OWNER` | `PetID` → `PetID` |
| 3 | `PET` | `APPOINTMENT` | `PetID` → `PetID` |
| 4 | `APPOINTMENT` | `APPOINTMENT_SERVICE` | `AppointmentID` → `AppointmentID` |
| 5 | `SERVICE_TYPE` | `APPOINTMENT_SERVICE` | `ServiceType` → `ServiceType` |

Save the layout (**Ctrl+S**) and keep the Relationships window open for the next check.

:::callout{type="warning" title="⚠️ Do not check Cascade Delete"}
Deleting an owner should never automatically delete the pets, appointments, and billing records attached to them. That history is needed for audits, reporting, and the clinic's own records. Leave both cascade boxes unchecked.
:::

**Check 4.** *(Short answer)* After all relationships are created, how many relationship lines are visible in the Relationships window?

**Check 5.** *(Multi-select)* Which tables are **child tables** in at least one relationship? Select all that apply.

- A. `OWNER`
- B. `PET`
- C. `PET_OWNER`
- D. `APPOINTMENT`
- E. `SERVICE_TYPE`
- F. `APPOINTMENT_SERVICE`

### Step 4 — Test referential integrity

Three invalid inserts that should all be rejected. For each one, open the target table in Datasheet View, type the bad row at the bottom (including the primary-key value shown — the PKs are manually entered, not AutoNumber), press Enter, read the error message Access shows, then press **Esc** to cancel the row. Do not leave any of these test rows in the table.

| Test | Target table | Bad values to enter | Why it should fail |
| --- | --- | --- | --- |
| A | `PET_OWNER` | `PetOwnerID = 99`, `PetID = 1`, `OwnerID = 999` | `OwnerID 999` does not exist in `OWNER`. |
| B | `APPOINTMENT` | `AppointmentID = 199`, `PetID = 999`, `AppointmentDate = 2026-04-20`, `AppointmentStatus = Scheduled`, `ReminderSent = Yes` | `PetID 999` does not exist in `PET`. |
| C | `APPOINTMENT_SERVICE` | `AppointmentServiceID = 99`, `AppointmentID = 101`, `ServiceType = Grooming`, `PaymentAmount = 45` | `Grooming` does not exist in `SERVICE_TYPE`. |

You should see the same error dialog for each test: *"You cannot add or change a record because a related record is required in table ..."*

**Check 6.** *(Multiple choice)* What should happen when you try to enter `OwnerID = 999` in `PET_OWNER`?

- A. Access accepts it because `OwnerID` is just a number
- B. Access creates a new owner automatically
- C. Access rejects it because the related owner does not exist
- D. Access deletes the pet

**Check 7.** *(Multiple choice)* Which Chapter 6 concept is the database enforcing when it rejects these rows?

- A. Query sorting
- B. Referential integrity
- C. Spreadsheet formatting
- D. Aggregation

### Step 5 — Query 1: Appointment billing detail

This is the PetVax version of the Let's Build's weighted-contribution join. Instead of joining students, deliverables, and grading rules, you join pets, appointments, services, and standard fees.

**Do.** Open **Create → Query Design**. Add four tables: `PET`, `APPOINTMENT`, `APPOINTMENT_SERVICE`, and `SERVICE_TYPE`. Access draws the join lines automatically from the relationships you defined in Step 3.

Drag these fields into the grid, in this order:

| Table | Field |
| --- | --- |
| `PET` | `PetName` |
| `PET` | `AnimalType` |
| `APPOINTMENT` | `AppointmentDate` |
| `APPOINTMENT` | `AppointmentStatus` |
| `APPOINTMENT_SERVICE` | `ServiceType` |
| `APPOINTMENT_SERVICE` | `PaymentAmount` |
| `SERVICE_TYPE` | `StandardFee` |

In the next empty Field cell, add the calculated column:

```text
PaymentDifference: [PaymentAmount]-[StandardFee]
```

Sort by `AppointmentDate` ascending. Run the query (**!**). Save it as `qryAppointmentBillingDetail`.

Switch to **SQL View** to see the SQL Access generated. You should see four `INNER JOIN` clauses and the `PaymentDifference` calculation.

**Check 8.** *(Short answer)* How many rows are returned by `qryAppointmentBillingDetail`?

**Check 9.** *(Short answer)* How many of those rows have a nonzero `PaymentDifference`?

**Check 10.** *(Multiple choice)* What does the `PaymentDifference` column represent?

- A. The number of pets per owner
- B. The difference between the amount actually paid and the standard fee for that service
- C. The number of appointments per pet
- D. Whether the owner has an email address

### Step 6 — Query 2: Owner pet summary with LEFT JOIN

This is the PetVax version of the Let's Build's attendance summary. The `LEFT JOIN` matters because it keeps every owner in the result — even an owner who has no pets on file.

**Do.** Open **Create → Query Design**. Add `OWNER` and `PET_OWNER`. Right-click the join line between them, choose **Join Properties**, and pick option 2: *Include ALL records from `OWNER` and only those records from `PET_OWNER` where the joined fields are equal.* That is a `LEFT JOIN`.

Drag these fields into the grid:

| Table | Field |
| --- | --- |
| `OWNER` | `OwnerID` |
| `OWNER` | `OwnerName` |
| `PET_OWNER` | `PetID` |

Click the **Totals** (Σ) button on the ribbon. Set the first two fields to **Group By**. For `PetID`, change the cell from `Group By` to **Count**. Then rename the column by editing the Field row (top row) of the `PetID` column so it reads exactly:

```text
PetCount: PetID
```

This tells Access *"display this column with the heading PetCount, computed from the PetID field."* Sort by `OwnerName` ascending. Save as `qryOwnerPetSummary`.

:::callout{type="tip" title="💡 Stuck in Design View? Use SQL View instead"}
If the Totals row or alias is fighting you, switch the query to **SQL View** (Home → View → SQL View) and paste this in place of whatever is there:

```sql
SELECT OWNER.OwnerID,
       OWNER.OwnerName,
       Count(PET_OWNER.PetID) AS PetCount
FROM OWNER
LEFT JOIN PET_OWNER
       ON OWNER.OwnerID = PET_OWNER.OwnerID
GROUP BY OWNER.OwnerID, OWNER.OwnerName
ORDER BY OWNER.OwnerName;
```

Run, then save as `qryOwnerPetSummary`.
:::

:::callout{type="note" title="📝 Why Count(PetID) and not Count(*)"}
`Count(*)` counts rows, including rows where the right side of the `LEFT JOIN` is null. `Count(PetID)` counts only non-null values, so an owner with no pets correctly shows `0` instead of `1`.
:::

**Check 11.** *(Short answer)* How many rows are returned by `qryOwnerPetSummary`?

**Check 12.** *(Short answer)* Which owner has zero pets? (Type the full name.)

### Step 7 — Query 3: Find pets missing a required vaccination (CROSS JOIN + anti-join, stretch)

> **Stretch query — read slowly.** This mirrors the missing-grades query from the Let's Build. It is the most advanced query in the lab. You will build it in **two stages** so each move is easy to inspect.

This query answers: *which pets do not yet have a vaccination on record?* You cannot answer that by looking only at `APPOINTMENT_SERVICE`, because the missing rows are not there. You have to generate the expected universe first, then subtract what exists.

The three moves from the Let's Build map onto two saved queries:

1. **Enumerate the universe with `CROSS JOIN`.** `PET` (7 pets) × `SERVICE_TYPE` (4 services) = 28 expected pet-service pairs. Filter to only the services that require vaccine tracking — there is one — and you get 7 expected pairs, one per pet. *(This is the first saved query.)*
2. **Attach what exists with `LEFT JOIN`.** Join those expected pairs to `APPOINTMENT` and `APPOINTMENT_SERVICE` on `PetID` and `ServiceType`. Pets with a matching vaccination row get an `AppointmentServiceID`; pets without one get `NULL`.
3. **Keep only the empties with `WHERE ... IS NULL`.** That converts the `LEFT JOIN` into an anti-join. *(Moves 2 and 3 are the second saved query.)*

#### Stage A — Build the universe

**Do.** Open **Create → Query Design** → **Close** the Show Table dialog → switch to **SQL View** and paste:

```sql
SELECT PET.PetID,
       PET.PetName,
       PET.AnimalType,
       SERVICE_TYPE.ServiceType
FROM PET, SERVICE_TYPE
WHERE SERVICE_TYPE.RequiresVaccineTracking = 'Yes';
```

Run it. You should see **7 rows** — every pet paired with `Vaccination`. Save as `qryExpectedRequiredVaccinations`.

The `FROM PET, SERVICE_TYPE` comma is Access's way of writing a cross join. Standard SQL and SQLite use the explicit keyword `CROSS JOIN` — same result.

#### Stage B — Anti-join against the universe

**Do.** Open **Create → Query Design** → **Close** the Show Table dialog → switch to **SQL View** and paste:

```sql
SELECT e.PetID,
       e.PetName,
       e.AnimalType,
       e.ServiceType
FROM qryExpectedRequiredVaccinations AS e
LEFT JOIN (APPOINTMENT
     INNER JOIN APPOINTMENT_SERVICE
            ON APPOINTMENT.AppointmentID = APPOINTMENT_SERVICE.AppointmentID)
       ON e.PetID = APPOINTMENT.PetID
      AND e.ServiceType = APPOINTMENT_SERVICE.ServiceType
WHERE APPOINTMENT_SERVICE.AppointmentServiceID IS NULL
ORDER BY e.PetName;
```

Run the query. Save it as `qryMissingRequiredVaccinations`.

**Check 13.** *(Short answer)* How many pets are missing a required vaccination?

**Check 14.** *(Multi-select)* Which pet records appear in `qryMissingRequiredVaccinations`? Select all that apply.

- A. PetID 1 — Buddy
- B. PetID 2 — Bandit
- C. PetID 3 — Coco
- D. PetID 4 — Charlie
- E. PetID 5 — Whiskers
- F. PetID 6 — Luna
- G. PetID 7 — Maple

### Step 8 — Export the relationship report

**Do.** Open **Database Tools → Relationships** to bring the layout back into focus. On the ribbon, click **Relationship Report**. Access opens a print preview of the layout. Use **File → Save As → Save Object As → PDF or XPS** (or **External Data → PDF or XPS**) to export it as `Lab06-PetVax-Relationships-LastName.pdf` in the same folder as your `.accdb`.

**Check 15.** *(Multiple choice)* Why is the relationship report useful?

- A. It proves the Access file contains the intended table relationships
- B. It replaces the database file
- C. It deletes invalid records
- D. It creates a spreadsheet copy

### Step 9 — Final concept check

**Check 16.** *(Multi-select)* Which statements are true about the relational PetVax design you just built? Select all that apply.

- A. Owner facts are stored once in `OWNER`.
- B. Pet facts are stored once in `PET`.
- C. `PET_OWNER` allows a pet to have multiple owners.
- D. `APPOINTMENT_SERVICE` allows one appointment to include multiple service line items.
- E. Referential integrity allows child records to point to nonexistent parents.
- F. The relational design removes the need for joins.

## Submission

Submit both files to the Lab 06 dropbox:

1. `Lab06-PetVax-Relational-LastName.accdb` — your completed database with 5 relationships and 3 saved queries.
2. `Lab06-PetVax-Relationships-LastName.pdf` — the relationship report you exported in Step 8.

Your grade = quiz check-question score (20 pts) + Access file rubric (16 pts) + relationship report (4 pts) = **40 points total**.

## Check Your Work

Before you submit, confirm:

| Check | Expected |
| --- | --- |
| Tables in the database | 6 |
| Relationship lines with RI enforced | 5 |
| Cascade delete enabled on any relationship | No |
| Any of the Step 4 invalid test rows left in a table | No |
| `qryAppointmentBillingDetail` exists | Yes |
| `qryAppointmentBillingDetail` rows | 9 |
| `qryOwnerPetSummary` exists | Yes |
| `qryOwnerPetSummary` rows | 6 |
| Owner with `PetCount = 0` | Hannah Reyes |
| `qryExpectedRequiredVaccinations` exists | Yes |
| `qryExpectedRequiredVaccinations` rows | 7 |
| `qryMissingRequiredVaccinations` exists | Yes |
| `qryMissingRequiredVaccinations` rows | 5 |
| Relationship report PDF saved | Yes |

## Optional Extensions

Not required. Try one of these only if you have time after the main lab is complete and submitted.

- Add an `OwnerPhone` field to `OWNER` and update at least two existing rows.
- Modify `qryOwnerPetSummary` to also show the number of appointments per owner (hint: you will need to join through `PET_OWNER`, `PET`, and `APPOINTMENT`).
- Add a new service category to `SERVICE_TYPE` and write a test that proves your `qryMissingRequiredVaccinations` query still works.
