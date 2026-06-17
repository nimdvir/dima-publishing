---
title: "Lab 07: Normalizing a Veterinary Clinic Database"
chapter: 7
section: "Lab Questions"
description: "SAM-style guided lab: transfer the Let's Build 07 normalization workflow from the Grading Database to the PetVax veterinary clinic."
keywords:
  - lab 07
  - PetVax
  - normalization
  - referential integrity
  - Access
  - SQL
date: 2026-06-16
author: "Nimrod Dvir"
---

# Lab 07: Normalizing a Veterinary Clinic Database

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

*In Let's Build 07 you normalized the Grading Database together. In this lab you do it again â€” on your own, for PetVax.*

## Overview

You are given one flat table, `PETVAX_FLAT`, that mixes owner, pet, veterinarian, visit, and treatment facts in every row. Your job is to redesign it as a normalized six-table Microsoft Access database, enforce real relationships between the tables, and rebuild the original report with a single query.

- Chapter: Chapter 7 â€” Data Normalization.
- Builds on: [ch07-lets-build-2026-06-16.md](../../ch07-normalization/lets-build/ch07-lets-build-2026-06-16.md).
- Estimated time: about 60 minutes.
- Tool: Microsoft Access (2019 or newer; Microsoft 365 also works).

> ðŸ“˜ **Concept connection â€” the transfer idea:**
> In the Grading Database, a *score* belongs to the relationship between a student and a deliverable.
> In PetVax, a *charge* belongs to the relationship between a visit and a treatment.
> Same normalization logic, new domain.

## Scenario

PetVax is a small veterinary clinic. Each appointment ("visit") can include one or more billable treatments â€” a vaccine, an exam, a blood panel, a medication. Today the clinic stores every visit-treatment line in a single flat spreadsheet, so owner names, pet breeds, vet names, visit dates, treatment prices, and individual charges are all repeated on every row. The clinic owner wants you to redesign the storage so each fact lives in exactly one place, and then prove the flat report can still be reproduced from the normalized design.

## Required Files and Tools

| Item | Detail |
| --- | --- |
| Tool | Microsoft Access (desktop) |
| Starter data | [`assets/petvax_flat_starter.csv`](./assets/petvax_flat_starter.csv) â€” 28 rows, 22 columns |
| Import guide | [`assets/README.md`](./assets/README.md) |
| Submission file 1 | `Lab07-Normalized-PetVax-LastName.accdb` (required) |
| Submission file 2 | `Lab07-PetVax-Screenshots-LastName.pdf` (required â€” see Submission) |

Before you start: follow [`assets/README.md`](./assets/README.md) to import the CSV into Access as a table named **`PETVAX_FLAT`**. Save the database as `Lab07-Normalized-PetVax-LastName.accdb`. Work in that file from now on.

> âš ï¸ **Do not edit or delete `PETVAX_FLAT`.** It is your source table and your comparison point for every later check. Leave it untouched even when you start building the normalized tables.

## Target Normalized Schema

Your finished database must contain these six normalized tables in addition to the unchanged `PETVAX_FLAT`:

```text
OWNER(OwnerID, OwnerFirstName, OwnerLastName, OwnerEmail, OwnerPhone)
PET(PetID, OwnerID, PetName, Species, Breed, BirthDate)
VET(VetID, VetFirstName, VetLastName)
VISIT(VisitID, PetID, VetID, VisitDate, VisitReason)
TREATMENT(TreatmentCode, TreatmentName, TreatmentCategory, StandardPrice)
VISIT_TREATMENT(VisitTreatmentID, VisitID, TreatmentCode, ActualCharge)
```

> âœ… **Good Practice:** In Access, foreign keys that point to a Long Integer primary key must themselves be **Number â†’ Field Size = Long Integer**. `TreatmentCode` is text, so its foreign key in `VISIT_TREATMENT` must be **Short Text** of the same size. Mismatched sizes will block referential integrity later.

## Steps

### Step 1 â€” Import the starter and confirm the row count

**Do.** Follow [`assets/README.md`](./assets/README.md) to import `petvax_flat_starter.csv` into your new database as a table named exactly `PETVAX_FLAT`. Open the table in Datasheet View.

**Check 1.** *(Short answer â€” exact integer)* How many rows are in `PETVAX_FLAT`?

### Step 2 â€” Diagnose redundancy

**Do.** Scroll through `PETVAX_FLAT` and look for facts that are repeated across multiple rows. In your screenshot/notes file, list at least five repeated facts, where each one repeats, and which normalized table should store it. Use the format from the Let's Build diagnosis table.

**Check 2.** *(Matching)* Match each repeated fact to the table where it belongs.

| Repeated fact | Target table options |
| --- | --- |
| Owner email | `OWNER` Â· `PET` Â· `VET` Â· `VISIT` Â· `TREATMENT` Â· `VISIT_TREATMENT` |
| Pet breed | `OWNER` Â· `PET` Â· `VET` Â· `VISIT` Â· `TREATMENT` Â· `VISIT_TREATMENT` |
| Vet last name | `OWNER` Â· `PET` Â· `VET` Â· `VISIT` Â· `TREATMENT` Â· `VISIT_TREATMENT` |
| Visit date | `OWNER` Â· `PET` Â· `VET` Â· `VISIT` Â· `TREATMENT` Â· `VISIT_TREATMENT` |
| Standard treatment price | `OWNER` Â· `PET` Â· `VET` Â· `VISIT` Â· `TREATMENT` Â· `VISIT_TREATMENT` |
| Actual charge for a treatment on a specific visit | `OWNER` Â· `PET` Â· `VET` Â· `VISIT` Â· `TREATMENT` Â· `VISIT_TREATMENT` |

### Step 3 â€” Create the six normalized tables (Design View)

**Do.** Use **Create â†’ Table Design** to build each of the six tables listed above. For every table:

- Set the primary key shown in the schema (key icon next to the field).
- Use **Number â†’ Field Size = Long Integer** for every numeric ID field (`OwnerID`, `PetID`, `VetID`, `VisitID`, `VisitTreatmentID`). Do **not** use AutoNumber â€” the IDs already exist in the CSV and must be preserved exactly.
- Use **Short Text** for `TreatmentCode` in both `TREATMENT` (primary key) and `VISIT_TREATMENT` (foreign key) â€” same size in both tables.
- Use **Date/Time** for `BirthDate` and `VisitDate`.
- Mark name and email fields as Required.

Save each table with the exact name from the schema. Leave all six tables empty for now.

**Check 3.** *(Multi-select â€” choose all correct answers)* Which of the following statements about the normalized design are true?

- A. `ActualCharge` belongs in `VISIT_TREATMENT` because it describes a specific treatment on a specific visit.
- B. `StandardPrice` belongs in `TREATMENT` because it is a fact about the treatment itself, not about any one visit.
- C. `OwnerEmail` belongs in `VISIT` because it is needed when the owner books a visit.
- D. `Breed` belongs in `PET` because it is a fact about the pet, not about the owner or the visit.
- E. `VisitDate` belongs in `VISIT_TREATMENT` because every treatment line happens on a date.

### Step 4 â€” Append OWNER (worked template)

**Do.** Open **Create â†’ Query Design**, close the Show Table dialog, and switch to **SQL View**. Paste, save as `q01_Append_Owners`, then run it.

```sql
INSERT INTO OWNER (OwnerID, OwnerFirstName, OwnerLastName, OwnerEmail, OwnerPhone)
SELECT DISTINCT OwnerID, OwnerFirstName, OwnerLastName, OwnerEmail, OwnerPhone
FROM PETVAX_FLAT;
```

Open `OWNER` in Datasheet View.

**Check 4.** *(Short answer â€” exact integer)* How many rows are in `OWNER`?

> ðŸ’¡ **Tip:** This query is the template. You will write the next four append queries (`q02`â€“`q05`) yourself, following the same `INSERT INTO â€¦ SELECT DISTINCT â€¦ FROM PETVAX_FLAT` pattern. Pick the right columns for each target table from the schema.

> âš ï¸ **Run each append exactly once.** If you re-run an append without first deleting the rows it added, Access will either create duplicates or fail with a primary-key violation halfway through.

### Step 5 â€” Append PET (write it yourself)

**Do.** Create a new query named `q02_Append_Pets`. Use `INSERT INTO PET (...) SELECT DISTINCT ... FROM PETVAX_FLAT;` to populate `PET` with `PetID`, `OwnerID`, `PetName`, `Species`, `Breed`, `BirthDate`. Run it once. Open `PET`.

**Check 5.** *(Short answer â€” exact integer)* How many rows are in `PET`?

### Step 6 â€” Append VET (write it yourself)

**Do.** Create `q03_Append_Vets` and populate `VET` with `VetID`, `VetFirstName`, `VetLastName`. Run it once. Open `VET`.

**Check 6.** *(Short answer â€” exact integer)* How many rows are in `VET`?

### Step 7 â€” Append TREATMENT (write it yourself)

**Do.** Create `q04_Append_Treatments` and populate `TREATMENT` with `TreatmentCode`, `TreatmentName`, `TreatmentCategory`, `StandardPrice`. Run it once. Open `TREATMENT`.

**Check 7.** *(Multi-select â€” choose all correct answers)* Which fields belong **only** in `TREATMENT` (not in any other normalized table)?

- A. `TreatmentName`
- B. `TreatmentCategory`
- C. `StandardPrice`
- D. `ActualCharge`
- E. `VisitDate`

### Step 8 â€” Append VISIT (write it yourself)

**Do.** Create `q05_Append_Visits` and populate `VISIT` with `VisitID`, `PetID`, `VetID`, `VisitDate`, `VisitReason`. Run it once. Open `VISIT`.

**Check 8.** *(Short answer â€” exact integer)* How many rows are in `VISIT`?

### Step 9 â€” Append VISIT_TREATMENT (the junction)

**Do.** Create `q06_Append_Visit_Treatments`. This time **do not** use `DISTINCT` â€” every line in `PETVAX_FLAT` is already a unique visit-treatment line.

```sql
INSERT INTO VISIT_TREATMENT (VisitTreatmentID, VisitID, TreatmentCode, ActualCharge)
SELECT VisitTreatmentID, VisitID, TreatmentCode, ActualCharge
FROM PETVAX_FLAT;
```

Run it once. Open `VISIT_TREATMENT`.

**Check 9.** *(Short answer â€” exact integer)* How many rows are in `VISIT_TREATMENT`?

> ðŸ’¡ **Key Takeaway:** `VISIT_TREATMENT` stores a *fact about the relationship* between a visit and a treatment â€” the charge. Neither side owns it alone.

### Step 10 â€” Build relationships and enforce referential integrity

:::callout{type="warning" title="âš ï¸ Close every open table first"}
Access will not let you edit relationships while a child table is open. Close every table before opening the Relationships window.
:::

**Do.** Open **Database Tools â†’ Relationships**, add all six normalized tables, then create the five relationships below. For **every** relationship, in the Edit Relationships dialog, check **Enforce Referential Integrity** before clicking Create. Leave both Cascade options unchecked.

| # | Parent | Child | Join fields |
| - | --- | --- | --- |
| 1 | `OWNER` | `PET` | `OwnerID` â†’ `OwnerID` |
| 2 | `PET` | `VISIT` | `PetID` â†’ `PetID` |
| 3 | `VET` | `VISIT` | `VetID` â†’ `VetID` |
| 4 | `VISIT` | `VISIT_TREATMENT` | `VisitID` â†’ `VisitID` |
| 5 | `TREATMENT` | `VISIT_TREATMENT` | `TreatmentCode` â†’ `TreatmentCode` |

Save the layout. You will need a screenshot of it for submission.

**Check 10.** *(Multi-select â€” choose all correct answers)* Which of these parent â†’ child pairs need referential integrity enforced in the PetVax design?

- A. `OWNER.OwnerID` â†’ `PET.OwnerID`
- B. `PET.PetID` â†’ `VISIT.PetID`
- C. `VET.VetID` â†’ `VISIT.VetID`
- D. `TREATMENT.TreatmentCode` â†’ `VISIT_TREATMENT.TreatmentCode`
- E. `OWNER.OwnerID` â†’ `VISIT.OwnerID`
- F. `PETVAX_FLAT.VisitID` â†’ `VISIT.VisitID`

### Step 11 â€” Test referential integrity

**Do.** Open `VISIT_TREATMENT` in Datasheet View. Start a new row with `VisitTreatmentID = 9999`, `VisitID = 9999` (a value that does **not** exist in `VISIT`), any real `TreatmentCode`, and any `ActualCharge`. Try to save the row. Take a screenshot of the error Access shows.

**Check 11.** *(True / False)* Access refused to save the row because the `VisitID` did not exist in the parent `VISIT` table.

### Step 12 â€” Rebuild the original flat report

**Do.** Create a new query named `q07_PetVax_Report_Normalized` and paste the following into SQL View. Save and run it.

```sql
SELECT o.OwnerID,
       o.OwnerFirstName,
       o.OwnerLastName,
       p.PetID,
       p.PetName,
       p.Species,
       p.Breed,
       v.VisitID,
       v.VisitDate,
       v.VisitReason,
       vt.VetFirstName,
       vt.VetLastName,
       t.TreatmentCode,
       t.TreatmentName,
       t.TreatmentCategory,
       t.StandardPrice,
       vtx.ActualCharge
FROM (((OWNER AS o
        INNER JOIN PET AS p
                ON o.OwnerID = p.OwnerID)
        INNER JOIN (VET AS vt
        INNER JOIN VISIT AS v
                ON vt.VetID = v.VetID)
                ON p.PetID = v.PetID)
        INNER JOIN VISIT_TREATMENT AS vtx
                ON v.VisitID = vtx.VisitID)
        INNER JOIN TREATMENT AS t
                ON vtx.TreatmentCode = t.TreatmentCode
ORDER BY o.OwnerLastName, p.PetName, v.VisitDate, t.TreatmentName;
```

> ðŸ’¡ **Tip:** Access keeps its own parentheses around nested joins. If the query saves and runs, the parenthesization is fine. If you get a "JOIN expression not supported" error, rebuild the query in **Query Design View** by dragging join lines, then switch back to SQL View.

**Check 12.** *(Short answer â€” exact integer, no `$` sign)* What is the **sum of `ActualCharge`** across every row returned by `q07_PetVax_Report_Normalized`?

> ðŸ’¡ **Key Takeaway:** The query is the report. Normalization did not remove the flat view of the data â€” it relocated the facts. `q07` reassembles them on demand.

## Check Your Work

Walk through this list before you submit:

| Check | Pass? |
| --- | --- |
| `PETVAX_FLAT` is unchanged (still 28 rows) |  |
| Six normalized tables exist with correct primary keys |  |
| All six append queries (`q01`â€“`q06`) saved and run exactly once |  |
| Five relationships exist, all with referential integrity enforced |  |
| Invalid `VisitID` row was rejected (screenshot captured) |  |
| `q07_PetVax_Report_Normalized` returns the same number of rows as `PETVAX_FLAT` |  |
| Sum of `ActualCharge` in `q07` equals sum of `ActualCharge` in `PETVAX_FLAT` |  |

## Submission

Submit **two files** to the Lab 07 dropbox in your course site.

### 1. Microsoft Access file

```text
Lab07-Normalized-PetVax-LastName.accdb
```

Must contain:

- the unchanged `PETVAX_FLAT` table;
- the six normalized tables: `OWNER`, `PET`, `VET`, `VISIT`, `TREATMENT`, `VISIT_TREATMENT`;
- the seven saved queries: `q01_Append_Owners`, `q02_Append_Pets`, `q03_Append_Vets`, `q04_Append_Treatments`, `q05_Append_Visits`, `q06_Append_Visit_Treatments`, `q07_PetVax_Report_Normalized`;
- the five relationships with referential integrity enforced.

### 2. PDF of screenshots

```text
Lab07-PetVax-Screenshots-LastName.pdf
```

Must include, in this order:

1. `PETVAX_FLAT` open in Datasheet View showing the row count in the status bar.
2. The Relationships window showing all five lines with `1` and `âˆž` symbols.
3. The referential-integrity error from Step 11.
4. The first 20 rows of `q07_PetVax_Report_Normalized`.

Your final grade combines the check-question answers (Checks 1â€“12) with a review of the submitted `.accdb` file and PDF screenshots.

## Optional Extensions

Optional. Not required. Do not turn in if you do not complete them.

1. **Per-visit totals.** Build a query `q08_Visit_Totals` that returns one row per visit with `VisitID`, `VisitDate`, owner name, pet name, and the **sum of `ActualCharge`** for that visit. Use `GROUP BY`.
2. **Add a STAFF_NOTES table.** Add a seventh table `STAFF_NOTES(NoteID, VisitID, NoteText, NoteDate)` with a relationship to `VISIT` and referential integrity enforced. Add two sample notes for two different visits.
3. **Dirty-data challenge.** Make a copy of `PETVAX_FLAT` named `PETVAX_FLAT_DIRTY`. Introduce small inconsistencies (e.g., the same owner with two phone formats, the same vet with a name typo, the same treatment with two different `StandardPrice` values). Re-run your six append queries against the dirty copy and write a one-paragraph note in your PDF describing which inconsistencies showed up in the normalized tables and how you would clean them in the source.

## Peek Ahead â€” Chapter 8

Chapter 8 is the midterm review. The PetVax schema you just built is the kind of design you should be able to read, query, and explain from memory. Chapter 9 then returns to SQL with multi-table queries built on exactly this style of normalized schema.
