<!-- metadata: date="2026-06-03" -->

<!-- markdownlint-disable MD013 MD024 MD036 -->

# Lab 03 Questions

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

## PetVax Spreadsheet Fundamentals: When a Flat File Starts to Break

**Chapter:** Chapter 3 — Understanding Data Fundamentals  
**Project:** PetVax veterinary clinic  
**Platform:** Brightspace auto-graded quiz + Google Sheets or Excel workbook  
**Estimated time:** about 60 minutes  
**Starter file:** `assets/lab-03-petvax-spreadsheet-starter-2026-05-24.xlsx`  
**Submission artifact:** completed spreadsheet workbook  

---

## What This Lab Is

This lab is a guided spreadsheet workflow.

The quiz questions are not just a test. They are checkpoints that guide you through the spreadsheet work. Every quiz answer is exact, so Brightspace can grade it automatically. At the end, you upload your completed spreadsheet file so an AI grader can confirm you actually did the steps behind your answers.

The main goal is to experience the central Chapter 3 lesson:

> A spreadsheet is useful for entering, viewing, filtering, and summarizing data, but flat files become fragile when data is repeated, updated, connected, and reused.

![Figure 3.11 - Spreadsheet Strengths vs. Database Capabilities](../../../../.images/Ch4%20Databases/optimized/ch04-to-add-spreadsheet-vs-database-strengths.png)
*Figure 3.11: Spreadsheet Strengths vs. Database Capabilities. Contrasts the flexible, personal calculation grid of Excel/Sheets with the structured, concurrent, and governed storage of database systems.*

You will use a PetVax appointment spreadsheet to practice:

- fields and records;
- identifiers versus values;
- data types and data quality;
- `VLOOKUP` or `XLOOKUP`;
- filters and formula-based queries;
- pivot tables;
- redundancy;
- update anomaly;
- insertion anomaly;
- deletion anomaly;
- query fragility.

You are not building an Access database yet. That begins in Chapter 4. This lab shows why Chapter 4 is needed.

---

## How This Lab Is Graded

This lab has **two graded parts**. You must complete both.

### Part 1 — Brightspace quiz (auto-graded)

You answer 24 questions inside the Brightspace quiz for this lab. Brightspace grades these automatically. Every answer is exact: a specific choice, match, order, or value. Many answers come directly from the spreadsheet work you do, so **do the work first, then answer**. Your quiz answers should match what your workbook shows.

### Part 2 — Spreadsheet file (AI-checked)

You upload your completed workbook to the separate file-submission assignment. An AI grader checks that the file is **complete** and that your work is **authentic** — that the required artifacts are present and that the values in the file match the quiz answers you gave. The file is not re-scored question by question. It is proof that you actually did the work.

**Final grade = Brightspace quiz score + spreadsheet file submission.**

---

## What You Will Submit

Submit your completed spreadsheet file.

Use this filename:

`Lab03-PetVax-Spreadsheet-LastName.xlsx`

(Replace `LastName` with your own last name. Do not include spaces or em-dashes — they break some LMS uploads.)

Your file should show that you completed the steps, including:

- lookup formulas in `APPOINTMENTS_FLAT`;
- a formula-based query in `QUERY_AREA`;
- a pivot table or pivot-style summary in `PIVOT_SUMMARY`;
- the added Maple record;
- the modified Sarah Perry email in only one row;
- the inserted Rex placeholder row;
- the deleted Angel appointment row;
- the Step 6.5 identifier note in the `Notes` cell of row 1003 or 1007.

---

## Workbook Overview

Open the starter workbook. It contains these sheets:

| Sheet | Purpose |
|---|---|
| `APPOINTMENTS_FLAT` | Main flat-file appointment log |
| `BREED_REFERENCE` | Breed lookup table with animal type and healthy weight information |
| `DATA_DICTIONARY` | Field definitions and intended meaning |
| `QUERY_AREA` | Space for a formula-based query |
| `PIVOT_SUMMARY` | Space for a pivot table or pivot-style summary |

Start in `APPOINTMENTS_FLAT`.

---

# Step 1 — Inspect the Flat File

In `APPOINTMENTS_FLAT`, each row is one appointment record.

The sheet includes appointment details such as:

- appointment ID;
- date and time;
- pet name;
- owner name and email;
- breed;
- weight;
- service type;
- appointment status;
- reminder status;
- payment amount.

This is a flat file because appointment, pet, owner, breed, service, and payment information all live in one sheet.

![Figure 3.3 - The Data Hierarchy](../../../../.images/Ch4%20Databases/optimized/ch04-to-add-data-hierarchy.png)
*Figure 3.3: The Data Hierarchy. Shows how individual data characters (bytes) form fields (columns), which group into records (rows) to build the flat tables checked in Step 1.*

> 🔍 **Filtering and sorting rule.** You may apply a filter when a step asks you to. **Clear the filter before moving to the next step.** Do **not** permanently sort the sheet, because later steps refer to rows by their original `AppointmentID`.

## Quiz Question 1

**Brightspace question type:** Short Answer / Fill in the Blank  
**Auto-graded:** Yes  
**Points:** 1

Before making any changes, how many appointment records are in `APPOINTMENTS_FLAT`?

Do not count the header row.

---

![Figure 3.8 - Data Types and Analytical Uses](../../../../.images/Ch4%20Databases/optimized/ch04-to-add-data-types-analytical-uses.png)
*Figure 3.8: Data Types and Measurement Scales. Connects nominal labels, ordinal ranks, interval values, and ratio scales with their valid statistical and analytical operations.*

## Quiz Question 2

**Brightspace question type:** Multiple Choice  
**Auto-graded:** Yes  
**Points:** 1

Which column should be treated as a numeric measurement that can be averaged meaningfully?

A. `AppointmentID`  
B. `OwnerEmail`  
C. `WeightKg`  
D. `PetName`  

---

## Quiz Question 3

**Brightspace question type:** Multi-Select  
**Auto-graded:** Yes  
**Points:** 2

Which pet names appear with more than one owner in the starter file? Select all that apply.

A. Buddy  
B. Charlie  
C. Coco  
D. Angel  
E. Pumpkin  

---

# Step 2 — Add Lookup Columns

The flat file stores `BreedName`, but it does not directly store the animal type, average healthy breed weight, or overweight threshold. Those values are in `BREED_REFERENCE`.

In `APPOINTMENTS_FLAT`, use either `XLOOKUP` or `VLOOKUP` to fill these columns:

| Column | Field |
|---|---|
| N | `AnimalType` |
| O | `AvgHealthyWeightKg` |
| P | `OverweightThresholdKg` |
| Q | `WeightStatus` |
| R | `PetOwnerKey` |

## Suggested `XLOOKUP` formulas

In `N2`:

```excel
=XLOOKUP(G2,BREED_REFERENCE!$A$2:$A$20,BREED_REFERENCE!$B$2:$B$20,"Breed not found")
```

In `O2`:

```excel
=XLOOKUP(G2,BREED_REFERENCE!$A$2:$A$20,BREED_REFERENCE!$D$2:$D$20,"Breed not found")
```

In `P2`:

```excel
=XLOOKUP(G2,BREED_REFERENCE!$A$2:$A$20,BREED_REFERENCE!$E$2:$E$20,"Breed not found")
```

In `Q2`:

```excel
=IF(H2>P2,"Above breed range","Within/under breed range")
```

In `R2`:

```excel
=D2&" | "&E2
```

Copy these formulas down through all existing appointment rows.

## Alternative `VLOOKUP` formulas

In `N2`:

```excel
=VLOOKUP(G2,BREED_REFERENCE!$A$2:$E$20,2,FALSE)
```

In `O2`:

```excel
=VLOOKUP(G2,BREED_REFERENCE!$A$2:$E$20,4,FALSE)
```

In `P2`:

```excel
=VLOOKUP(G2,BREED_REFERENCE!$A$2:$E$20,5,FALSE)
```

Use the same formulas for `Q2` and `R2` as above.

---

## Quiz Question 4

**Brightspace question type:** Multiple Choice  
**Auto-graded:** Yes  
**Points:** 1

What does the lookup formula do in this lab?

A. It deletes duplicate rows from the appointment table  
B. It pulls breed information from `BREED_REFERENCE` into `APPOINTMENTS_FLAT`  
C. It creates a true database relationship with referential integrity  
D. It turns the spreadsheet into Access  

---

## Quiz Question 5

**Brightspace question type:** Short Answer / Fill in the Blank  
**Auto-graded:** Yes  
**Points:** 1

After filling the lookup and weight-status formulas through the starter records, how many appointment records are marked:

`Above breed range`

---

# Step 3 — Filter the Flat File

Use filters in `APPOINTMENTS_FLAT`.

Filter `AppointmentStatus` to show only:

`No-show`

## Quiz Question 6

**Brightspace question type:** Short Answer / Fill in the Blank  
**Auto-graded:** Yes  
**Points:** 1

Which pet has the `No-show` appointment in the starter file?

---

Now clear the filter.

Filter `ReminderSent` to show only:

`FALSE`

## Quiz Question 7

**Brightspace question type:** Short Answer / Fill in the Blank  
**Auto-graded:** Yes  
**Points:** 1

Before any modifications, how many records have `ReminderSent = FALSE`?

---

# Step 4 — Create a Formula-Based Query

Go to `QUERY_AREA`.

In cell `A5`, enter this formula:

```excel
=FILTER(APPOINTMENTS_FLAT!A2:Q25, APPOINTMENTS_FLAT!Q2:Q25="Above breed range")
```

This is intentionally a fixed-range formula. It only looks at rows 2 through 25.

## Quiz Question 8

**Brightspace question type:** Short Answer / Fill in the Blank  
**Auto-graded:** Yes  
**Points:** 1

How many records does the fixed-range `FILTER` formula return before you add new rows?

---

# Step 5 — Create a Pivot Summary

Go to `PIVOT_SUMMARY`.

Create a pivot table or pivot-style summary using `APPOINTMENTS_FLAT`.

Use:

| Pivot Area | Field |
|---|---|
| Rows | `AnimalType` |
| Values | `AppointmentID`, summarized by count |
| Values | `WeightKg`, summarized by average |

If your pivot table does not update automatically, refresh it after formulas are filled.

> 📎 **Treat this pivot as a starter-data snapshot.** Build it now, before Step 7. **Do not refresh or rebuild it** after you add Maple, add Rex, or delete Angel. The pivot is meant to summarize the original 24-row starter file so the grader can compare against fixed expected counts.

## Quiz Question 9

**Brightspace question type:** Matching  
**Auto-graded:** Yes  
**Points:** 2

Match each animal type to its appointment count in the starter file.

| Animal Type | Count |
|---|---|
| Cat | 6 |
| Dog | 18 |

---

## Quiz Question 10

**Brightspace question type:** Multiple Choice  
**Auto-graded:** Yes  
**Points:** 1

Using your pivot table, what is the average `WeightKg` for dogs in the starter file, rounded to one decimal place?

A. 14.4  
B. 16.5  
C. 18.3  
D. 20.1  

---

# Step 6 — Identify Flat-File Redundancy

A flat file repeats facts across many rows.

In this file, owner and pet information is repeated because each row is an appointment, not a separate owner table or pet table.

![Figure 3.10 - One Big Table vs. Related Tables](../../../../.images/Ch4%20Databases/optimized/figure_47_one_big_table_vs_related_tablesc.jpg)
*Figure 3.10: Redundancy in Flat Tables vs. Relational Design. Visualizes how splitting a multi-theme table into independent related tables eliminates duplicate storage and modification risks.*

## Quiz Question 11

**Brightspace question type:** Multi-Select  
**Auto-graded:** Yes  
**Points:** 2

Which owners have more than one pet in the starter file? Select all that apply.

A. Sarah Perry  
B. Wendy Henry  
C. Jenna Powell  
D. Mariah Davis  
E. Richard Bowman  

---

# Step 6.5 — Same Pet Name, Co-Owned Pet: Why We Need Primary Keys

> 💡 `AppointmentID` identifies an appointment, not a pet. That is why an `AppointmentID` cannot solve the "two Charlies" problem you are about to see.

The starter file already contains two situations that are obvious when a human reads the comments but invisible to the spreadsheet itself.

**Situation 1 — two pets, same name.** Look at rows `AppointmentID = 1003` and `AppointmentID = 1004` in `APPOINTMENTS_FLAT`. Both have `PetName = Charlie`. One is a Labrador Retriever owned by Barry Jones; the other is a Beagle owned by Angela Garcia. The `Notes` column literally says "Different Charlie" — but if those notes were missing, nothing in the columns would tell you these are two different dogs.

**Situation 2 — one pet, two owners.** Now look at rows `AppointmentID = 1007` and `AppointmentID = 1008`. Both have `PetName = Coco`, `BreedName = Poodle`, and `WeightKg = 11`, but two different owners (Alex Rivera and Jordan Rivera). The `Notes` say "Co-owner 1" and "Co-owner 2" — a shared-custody case.

Do not edit these rows. Just inspect them and answer the four checkpoints.

## Quiz Question 12

**Brightspace question type:** Multiple Choice  
**Auto-graded:** Yes  
**Points:** 1

Looking only at the columns in `APPOINTMENTS_FLAT` (no `Notes` text), can you tell whether rows 1003 and 1004 are the same dog named Charlie or two different dogs?

A. Yes — the `OwnerName` is enough to confirm they are different dogs  
B. Yes — the `BreedName` is enough to confirm they are different dogs  
C. No — `PetName` is not a unique identifier; only a stable `PetID` could answer this for sure  
D. No — the only fix is to ban duplicate pet names at the clinic  

---

## Quiz Question 13

**Brightspace question type:** Multiple Choice  
**Auto-graded:** Yes  
**Points:** 1

Which database concept introduced in Chapter 4 would prevent the "same name, different pet" ambiguity?

A. A pivot table  
B. A primary key, such as a `PetID` assigned to each pet  
C. A filter on `PetName`  
D. A larger spreadsheet  

---

## Quiz Question 14

**Brightspace question type:** Multi-Select  
**Auto-graded:** Yes  
**Points:** 2

Appointments 1007 and 1008 show the same Coco (same breed, same weight) with two different owners. What problems does this create in a flat appointment file? Select all that apply.

A. Coco's identity (name, breed, weight) is stored twice, so any future update can drift  
B. The spreadsheet cannot record that Coco has two owners without copying the entire pet record again for each appointment  
C. If Coco's weight changes, the new value must be typed into multiple rows by hand  
D. The spreadsheet automatically links the two owners to the same Coco  
E. From the columns alone, the workbook cannot prove that 1007 and 1008 refer to the same Coco rather than two different Cocos who happen to be Poodles weighing 11 kg  

---

## Quiz Question 15

**Brightspace question type:** Multiple Choice  
**Auto-graded:** Yes  
**Points:** 1

What database design cleanly records that one pet (Coco) is co-owned by two people?

A. Keep everything in one flat appointment sheet  
B. Add a third owner column to every appointment row, just in case  
C. Use a separate `Pets` table, a separate `Owners` table, and a link table that connects them — introduced in Chapter 4 and used in Chapter 6  
D. Delete one of the owner rows so each pet has only one owner  

---

## Workbook task for Q12–Q15

In `APPOINTMENTS_FLAT`, add a short note in the `Notes` cell of row **1003** (or row **1007**, your choice) that reads:

`Why PetName alone is a bad identifier: ...`

Finish that sentence in your own words (about 25–50 words). Mention either *primary key / PetID* or *link / junction table*. This is the only prose in the lab; the AI grader checks for it.

---

# Step 7 — Add a New Appointment Record

Add this new record at the bottom of `APPOINTMENTS_FLAT`.

| Field | Value |
|---|---|
| `AppointmentID` | 1025 |
| `AppointmentDate` | 2026-04-02 |
| `AppointmentTime` | 13:00 |
| `PetName` | Maple |
| `OwnerName` | Priya Shah |
| `OwnerEmail` | priya.shah@example.com |
| `BreedName` | Beagle |
| `WeightKg` | 16.0 |
| `ServiceType` | Vaccination |
| `AppointmentStatus` | Scheduled |
| `ReminderSent` | TRUE |
| `PaymentAmount` | 64.91 |
| `Notes` | New appointment added during lab |

Fill the lookup formulas down for the new row.

## Quiz Question 16

**Brightspace question type:** Short Answer / Fill in the Blank  
**Auto-graded:** Yes  
**Points:** 1

After adding Maple, how many appointment records are now in `APPOINTMENTS_FLAT`?

Do not count the header row.

---

## Quiz Question 17

**Brightspace question type:** Short Answer / Fill in the Blank  
**Auto-graded:** Yes  
**Points:** 1

After adding Maple and filling the formulas down, how many appointment records in the full table should be marked:

`Above breed range`

---

> ⚠️ **Do not change the fixed range yet.** The point of the next question is to see that the formula does **not** automatically include the new Maple row. You will not edit the `FILTER` formula in this lab.

## Quiz Question 18

**Brightspace question type:** Multiple Choice  
**Auto-graded:** Yes  
**Points:** 1

If your fixed `FILTER` formula in `QUERY_AREA` still returns the old count after adding Maple, what problem does this illustrate?

A. Query fragility from hard-coded ranges  
B. A perfect database relationship  
C. A valid primary key constraint  
D. A deletion anomaly  

---

# Step 8 — Create an Update Anomaly

Now create an update anomaly.

Find only the row with:

`AppointmentID = 1001`

Change Sarah Perry's email in that row only from:

`sarah.perry@example.com`

to:

`sarah.new@example.com`

Do not change Sarah Perry's other rows.

## Quiz Question 19

**Brightspace question type:** Short Answer / Fill in the Blank  
**Auto-graded:** Yes  
**Points:** 1

After changing Sarah Perry's email in only one row, how many different email values now appear for Sarah Perry?

---

## Quiz Question 20

**Brightspace question type:** Multiple Choice  
**Auto-graded:** Yes  
**Points:** 1

What flat-file problem did you just create?

A. Update anomaly  
B. Insertion anomaly  
C. Deletion anomaly  
D. Validity constraint  

---

# Step 9 — Create an Insertion Anomaly

A flat appointment file has no clean place to store a pet that does not yet have an appointment.

Add this placeholder row at the bottom of `APPOINTMENTS_FLAT`:

| Field | Value |
|---|---|
| `AppointmentID` | 1026 |
| `AppointmentDate` | leave blank |
| `AppointmentTime` | leave blank |
| `PetName` | Rex |
| `OwnerName` | Morgan Pugh |
| `OwnerEmail` | morgan.pugh@example.com |
| `BreedName` | Mixed Breed |
| `WeightKg` | 23.0 |
| `ServiceType` | leave blank |
| `AppointmentStatus` | leave blank |
| `ReminderSent` | leave blank |
| `PaymentAmount` | leave blank |
| `Notes` | Pet exists, but no appointment yet |

Fill lookup formulas where possible.

## Quiz Question 21

**Brightspace question type:** Multiple Choice  
**Auto-graded:** Yes  
**Points:** 1

Why is the Rex row an insertion anomaly?

A. Rex can be stored cleanly only by inventing an incomplete appointment row  
B. Rex has too many completed appointments  
C. Rex is a duplicate of Buddy  
D. Rex is already in the pivot table  

---

# Step 10 — Create a Deletion Anomaly

Now delete the row with:

`AppointmentID = 1022`

This is Angel's only appointment row in the flat file.

## Quiz Question 22

**Brightspace question type:** Short Answer / Fill in the Blank  
**Auto-graded:** Yes  
**Points:** 1

After deleting `AppointmentID = 1022`, which pet name disappears from the appointment file?

---

## Quiz Question 23

**Brightspace question type:** Multiple Choice  
**Auto-graded:** Yes  
**Points:** 1

What flat-file problem does deleting Angel's only appointment illustrate?

A. Deletion anomaly  
B. Update anomaly  
C. Query fragility  
D. Measurement validity  

---

# Step 11 — Final File Submission

This lab is submitted in two places.

### 1. Submit the Brightspace quiz

Answer all 24 quiz questions inside the Brightspace quiz for this lab. Brightspace grades them automatically. Make sure your answers match the values in your workbook.

### 2. Upload your spreadsheet file

Upload your completed workbook to the separate file-submission assignment, using the filename `Lab03-PetVax-Spreadsheet-LastName.xlsx`. The AI grader checks that the required work is present and authentic — not that each cell is re-scored.

## Required Evidence in the File

| Required Evidence | Where It Should Appear |
|---|---|
| Lookup formulas filled for `AnimalType`, `AvgHealthyWeightKg`, `OverweightThresholdKg`, `WeightStatus`, and `PetOwnerKey` | `APPOINTMENTS_FLAT` |
| Fixed-range `FILTER` formula | `QUERY_AREA` |
| Pivot table or pivot-style summary | `PIVOT_SUMMARY` |
| Maple appointment added | `APPOINTMENTS_FLAT` |
| Sarah Perry email changed in only one row | `APPOINTMENTS_FLAT` |
| Rex placeholder row added | `APPOINTMENTS_FLAT` |
| Angel appointment deleted | `APPOINTMENTS_FLAT` |
| Note explaining why `PetName` is a bad identifier (from Step 6.5) | `Notes` cell of row 1003 or 1007 |

## Final-State Checklist (what the AI grader looks for)

| Item | Final State |
|---|---|
| Maple | Exists as `AppointmentID = 1025` with lookup formulas filled |
| Rex | Exists as `AppointmentID = 1026` with blank appointment date, time, service, status, reminder, and payment |
| Angel | `AppointmentID = 1022` has been **deleted** (no row remains) |
| Sarah Perry | Has **two different** email values across her rows |
| Fixed `FILTER` formula in `QUERY_AREA` | Still uses the range `A2:Q25` (do not expand it) |
| Pivot summary in `PIVOT_SUMMARY` | Shows the **original starter snapshot** — Dog = 18, Cat = 6, avg dog weight ≈ 18.3 — not the modified file |
| Identifier note from Step 6.5 | Appears in the `Notes` cell of row `1003` **or** row `1007` and begins `Why PetName alone is a bad identifier:` |

---

# Final Concept Check

![Figure 3.12 - Spreadsheets vs. Databases Comparative Summary](../../../../.images/Ch4%20Databases/optimized/ch04-to-add-spreadsheet-vs-database-detailed.png)
*Figure 3.12: Comparative Summary. Detailed structural contrast of flat spreadsheet limitations against relational database capabilities, reinforcing the main takeaways of Lab 03.*

## Quiz Question 24

**Brightspace question type:** Ordering  
**Auto-graded:** Yes  
**Points:** 4

Put these ideas in the order students experienced them in the lab.

A. A flat file repeats owner and pet facts across appointment rows  
B. A lookup formula simulates a connection to breed reference data  
C. An update, insertion, or deletion anomaly reveals why the spreadsheet is fragile  
D. Chapter 4 moves toward databases because related data needs stronger structure  

---

## Optional Extension

Not required.

1. Create a second pivot table showing average weight by `BreedName`.
2. Add data validation to `BreedName` using the breed list.
