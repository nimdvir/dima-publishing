<!-- markdownlint-disable MD013 MD024 MD033 MD034 MD036 -->

# Lab 04: Building a PetVax Database in Microsoft Access

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center">

<p align="center"><em>Take the same DBMS moves you practiced on the Grading Database and apply them to a real PetVax clinic dataset in Microsoft Access.</em></p>

## Overview

This lab is a guided Microsoft Access workflow.

In Chapter 4 you learned what a database is and how a DBMS protects data with tables, primary keys, validation rules, forms, queries, and reports. In the **Let's Build** you practiced those moves on the Grading Database. In this lab you apply the same moves to **PetVax**, the veterinary clinic you first met in Lab 03.

In Lab 03 you saw a flat PetVax appointment spreadsheet start to break: owner details repeated, two different pets were both named Charlie, Coco had two owners, and a single edit could leave the file inconsistent. This lab moves that same clinic data into Access so you can see what a real DBMS does better, and what a flat table still cannot fix.

This lab has **two graded parts**. You must complete both:

- **Part 1 — Brightspace quiz (auto-graded).** You answer a set of exact-answer questions inside the Brightspace quiz for this lab. Many answers come from work you do in Access, so **do the step first, then answer**.
- **Part 2 — Access file (AI-checked).** You upload your finished `.accdb` file to the separate file-submission assignment. An AI grader confirms the file is complete and authentic — that the tables, rules, form, queries, and report exist and that the values match your quiz answers.

**Final grade = Brightspace quiz score + Access file submission.**

- **Chapter:** Chapter 4 — Introduction to Databases
- **Builds on:** the Chapter 4 Let's Build (Grading Database walkthrough)
- **Tool:** Microsoft Access (Desktop, 2019 or later)
- **Estimated time:** about 60 minutes

## Scenario

PetVax is a single-location veterinary clinic. The front desk has been tracking appointments in one flat spreadsheet that mixes pet, owner, appointment, service, and payment details on each row. The owner wants to move to Access so she can enforce data quality, look up information faster, and print simple reports for staff.

You have been given two data files exported from the old spreadsheet:

- `PETVAX_APPOINTMENTS` — one row per appointment.
- `SERVICE_RATES` — the clinic's standard fee for each service type.

You will import both into a new Access database, add rules, build a form, write queries, join the two tables in one query, and produce a report.

> ⚠️ **Heads-up:** `PETVAX_APPOINTMENTS` is still a **flat table**. Pet, owner, appointment, service, and payment data all live on one row. That is intentional for Lab 04. Chapter 6 will refactor it into proper relational tables.

<!-- separator between callouts -->

> 🛑 **Do not use the Relationships window in this lab.** Do not open **Database Tools → Relationships** and do not enforce referential integrity. You will create exactly one *query-level* join in Step 9. Formal relationships come in Chapter 6.

## Required Files and Tools

| Item | Detail |
| --- | --- |
| Tool | Microsoft Access (Desktop, 2019 or later) |
| Starter data | `assets/PETVAX_APPOINTMENTS-2026-06-03.csv` and `assets/SERVICE_RATES-2026-06-03.csv` |
| Submission file | `Lab04-PetVax-Access-LastName.accdb` |
| Where to submit | Upload to the Lab 04 file-submission assignment in your course site |

---

## Step 1 — Create the database and import the data

**Do.**

1. Open Microsoft Access and choose **Blank database**.
2. Name it `Lab04-PetVax-Access-LastName.accdb` (replace `LastName` with your real last name, no spaces). Click **Create**.
3. Access opens a blank `Table1`. Close it without saving (right-click the tab → **Close**).
4. On the **External Data** tab, click **New Data Source → From File → Text File**. Browse to `PETVAX_APPOINTMENTS-2026-06-03.csv` and choose **Import the source data into a new table**. Click **OK**.
5. In the wizard: keep **Delimited**, comma delimiter, and check **First Row Contains Field Names**. Click **Next**.
6. Confirm the field data types below, then finish the import and name the table `PETVAX_APPOINTMENTS`. When asked about a primary key, choose **No primary key** for now (you will set it in Step 2).
7. Repeat steps 4–6 for `SERVICE_RATES-2026-06-03.csv`. Name that table `SERVICE_RATES`.

Use these data types during import:

| Field | Data Type |
| --- | --- |
| `AppointmentID` | Number (Long Integer) |
| `AppointmentDate` | Date/Time |
| `AppointmentTime` | Short Text |
| `PetName`, `OwnerName`, `OwnerEmail`, `AnimalType`, `BreedName` | Short Text |
| `WeightKg` | Number (Double) |
| `ServiceType` | Short Text |
| `VaccineDue`, `AppointmentStatus`, `ReminderSent` | Short Text |
| `PaymentAmount` | Number (Double) |
| `Notes` | Short Text |

**Check (Question 1).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 1

Open `PETVAX_APPOINTMENTS` in Datasheet View. How many appointment records does it contain? Do not count the header row.

---

## Step 2 — Set and read the primary key

**Do.** Right-click the `PETVAX_APPOINTMENTS` tab and choose **Design View**. Click the row selector for `AppointmentID`, then click **Primary Key** on the ribbon. A small key icon appears next to `AppointmentID`. Save the table.

**Check (Question 2).**

- **Brightspace type:** Multiple Choice
- **Auto-graded:** Yes
- **Points:** 2

Which field is the correct primary key for `PETVAX_APPOINTMENTS`?

- A. `PetName`
- B. `OwnerEmail`
- C. `AppointmentID`
- D. `ServiceType`

**Check (Question 3).**

- **Brightspace type:** Multiple Choice
- **Auto-graded:** Yes
- **Points:** 1

What does `AppointmentID` actually identify?

- A. The pet
- B. The owner
- C. One appointment record
- D. The service type

> 💡 **Note:** A single pet or owner can appear on many appointment rows, so neither `PetName` nor `OwnerEmail` can identify a row. `AppointmentID` identifies the appointment, not the pet or the person.

---

## Step 3 — Add validation rules and required fields

**Do.** Stay in Design View for `PETVAX_APPOINTMENTS` and set these field properties.

| Field | Property | Value |
| --- | --- | --- |
| `WeightKg` | Validation Rule | `Between 0 And 100` |
| `WeightKg` | Validation Text | `Weight must be between 0 and 100 kg.` |
| `PaymentAmount` | Validation Rule | `>=0` |
| `PaymentAmount` | Validation Text | `Payment amount cannot be negative.` |
| `AppointmentDate` | Required | Yes |
| `PetName` | Required | Yes |
| `OwnerName` | Required | Yes |
| `ServiceType` | Required | Yes |
| `AppointmentStatus` | Required | Yes |

Save the table. If Access offers to test existing data against the new rules, click **Yes** — the starter data already satisfies them.

**Check (Question 4).**

- **Brightspace type:** Multiple Choice
- **Auto-graded:** Yes
- **Points:** 2

If a user later tries to enter `WeightKg = 150`, what should Access do?

- A. Accept it, because databases are flexible.
- B. Reject it, because it violates the validation rule.
- C. Convert it to text automatically.
- D. Delete the record.

---

## Step 4 — Test the validation rule

**Do.** Switch `PETVAX_APPOINTMENTS` to Datasheet View. Pick any row and temporarily try to change its `WeightKg` to `150`. Press Tab. Access should refuse the value and show your validation text. Press Esc to discard the bad entry and restore the original value.

**Check (Question 5).**

- **Brightspace type:** Multiple Choice
- **Auto-graded:** Yes
- **Points:** 1

Which Chapter 4 concept did that test demonstrate?

- A. A validation rule (a constraint)
- B. A report
- C. A deletion anomaly
- D. A pivot table

---

## Step 5 — Create a data-entry form and add a record

**Do.** In the Navigation Pane, click `PETVAX_APPOINTMENTS` once. On the **Create** tab, click **Form**. Access builds a form bound to the table. Save it as `frmPETVAX_APPOINTMENTS`.

Switch the form to **Form View**, click **New (blank) record** at the bottom, and enter this appointment exactly:

| Field | Value |
| --- | --- |
| AppointmentID | 1025 |
| AppointmentDate | 4/3/2026 |
| AppointmentTime | 10:30 AM |
| PetName | Maple |
| OwnerName | Priya Shah |
| OwnerEmail | priya.shah@example.com |
| AnimalType | Dog |
| BreedName | Beagle |
| WeightKg | 16 |
| ServiceType | Vaccination |
| VaccineDue | Yes |
| AppointmentStatus | Scheduled |
| ReminderSent | Yes |
| PaymentAmount | 0 |
| Notes | Added through form |

Save and close the form.

**Check (Question 6).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

After adding Maple, how many records are in `PETVAX_APPOINTMENTS`?

---

## Step 6 — Build `qryNoShows`

**Do.** On the **Create** tab, click **Query Design**. Add `PETVAX_APPOINTMENTS`. Drag these fields to the grid: `AppointmentID`, `AppointmentDate`, `PetName`, `OwnerName`, `OwnerEmail`, `AppointmentStatus`. In the `AppointmentStatus` column **Criteria** row, type `No-show`. Run the query, then save it as `qryNoShows`.

**Check (Question 7).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

How many records does `qryNoShows` return?

---

## Step 7 — Build `qryVaccineDue`

**Do.** Start a new query (**Create → Query Design**). Add `PETVAX_APPOINTMENTS`. Drag `AppointmentID`, `AppointmentDate`, `PetName`, `OwnerName`, `BreedName`, `ServiceType`, `VaccineDue`. In the `VaccineDue` column **Criteria** row, type `Yes`. Run and save as `qryVaccineDue`.

> 💡 **Note:** `VaccineDue` holds the text `Yes` or `No`. Type `Yes` in the Criteria row to match the records that need a vaccine.

**Check (Question 8).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

After adding Maple, how many records does `qryVaccineDue` return?

---

## Step 8 — Build `qryAveragePaymentByService`

**Do.** New query. Add `PETVAX_APPOINTMENTS`. Drag `ServiceType` and `PaymentAmount` to the grid. On the ribbon, click **Totals** (the Σ symbol) — a **Total** row appears. Leave `Group By` under `ServiceType` and change `Group By` under `PaymentAmount` to `Avg`. Run and save as `qryAveragePaymentByService`.

**Check (Question 9).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

In `qryAveragePaymentByService`, what is the average payment for **Dental Cleaning** appointments? Enter the number Access shows (for example, `123.32`).

**Check (Question 10).**

- **Brightspace type:** Multiple Choice
- **Auto-graded:** Yes
- **Points:** 1

Which service type has the **highest** average payment?

- A. Vaccination
- B. General Checkup
- C. Dental Cleaning
- D. Emergency Visit

---

## Step 9 — Build the query-level join `qryAppointmentsWithRates`

> ⚠️ **Important:** This is a **query-level join**, not a formal relationship. You are not opening the Relationships window. You are asking Access to match rows from two tables inside one saved query. Formal relationships come in Chapter 6.

**Do.** Start a new query. Add **both** tables: `PETVAX_APPOINTMENTS` and `SERVICE_RATES`. If Access does not draw a join line automatically, drag `ServiceType` from `PETVAX_APPOINTMENTS` onto `ServiceType` in `SERVICE_RATES`. A thin line should connect the two `ServiceType` fields.

Add these fields to the grid:

- From `PETVAX_APPOINTMENTS`: `AppointmentID`, `PetName`, `OwnerName`, `ServiceType`, `PaymentAmount`.
- From `SERVICE_RATES`: `StandardFee`, `RequiresVaccineTracking`.

Run and save as `qryAppointmentsWithRates`.

> ⚠️ **Stop and check the join line.** If the line is missing, Access pairs every appointment with every service rate (a Cartesian product) and returns far too many rows. If your result looks too big, return to Design View and confirm the line connects `ServiceType` to `ServiceType`.

**Check (Question 11).**

- **Brightspace type:** Multiple Choice
- **Auto-graded:** Yes
- **Points:** 1

What does `qryAppointmentsWithRates` actually do?

- A. Permanently normalizes the database.
- B. Deletes duplicate owners.
- C. Temporarily combines appointment records with service-rate details inside one query.
- D. Creates a finished Chapter 6 relational design.

**Check (Question 12).**

- **Brightspace type:** Short Answer / Fill in the Blank
- **Auto-graded:** Yes
- **Points:** 2

How many rows does `qryAppointmentsWithRates` return?

---

## Step 10 — Build a report

**Do.** In the Navigation Pane, click `qryNoShows` once. On the **Create** tab, click **Report**. Access builds a report from the query. Save it as `rptNoShows`. If you have time, open it in **Layout View** and tidy the title and column widths.

**Check (Question 13).**

- **Brightspace type:** Multiple Choice
- **Auto-graded:** Yes
- **Points:** 1

Which object should the PetVax manager open to review missed appointments?

- A. `frmPETVAX_APPOINTMENTS`
- B. `rptNoShows`
- C. `SERVICE_RATES`
- D. `qryVaccineDue`

---

## Step 11 — What Access improved, and what it did not

**Do.** Open `PETVAX_APPOINTMENTS` in Datasheet View one more time. Scroll until you see the same owner or the same pet name on more than one row. Notice that the table is still flat.

**Check (Question 14).**

- **Brightspace type:** Multi-Select
- **Auto-graded:** Yes
- **Points:** 1

Which capabilities did Access provide in this lab? Select **all** that apply.

- A. A primary key on `PETVAX_APPOINTMENTS`
- B. Validation rules on `WeightKg` and `PaymentAmount`
- C. A data-entry form (`frmPETVAX_APPOINTMENTS`)
- D. Saved, reusable queries
- E. A report built from a query
- F. Full normalization into separate `Pets`, `Owners`, and `Appointments` tables

**Check (Question 15).**

- **Brightspace type:** Multi-Select
- **Auto-graded:** Yes
- **Points:** 1

Which pet names appear with **more than one owner** in the data? Select **all** that apply.

- A. Buddy
- B. Charlie
- C. Coco
- D. Bella
- E. Angel

**Check (Question 16).**

- **Brightspace type:** Multi-Select
- **Auto-graded:** Yes
- **Points:** 2

Because `PETVAX_APPOINTMENTS` is still a flat table, which problems still exist? Select **all** that apply.

- A. Owner information repeats across appointment rows.
- B. Updating an owner's email in only one row could leave the database inconsistent.
- C. A pet cannot be stored cleanly without at least one appointment record.
- D. The database has already been fully normalized.
- E. Two different pets can share the same name, so `PetName` is not a reliable identifier.

---

## Step 12 — Save and submit

**Do.** Close all open tables, forms, queries, and reports. On the **Database Tools** tab, click **Compact and Repair Database**. Confirm the file is named `Lab04-PetVax-Access-LastName.accdb`, then upload it to the Lab 04 file-submission assignment.

> ✅ **Required objects in your submission**
>
> - Tables: `PETVAX_APPOINTMENTS`, `SERVICE_RATES`
> - Form: `frmPETVAX_APPOINTMENTS`
> - Queries: `qryNoShows`, `qryVaccineDue`, `qryAveragePaymentByService`, `qryAppointmentsWithRates`
> - Report: `rptNoShows`
> - New record: Maple / Priya Shah (`AppointmentID` 1025)
> - Validation rules on `WeightKg` (`Between 0 And 100`) and `PaymentAmount` (`>=0`)

## Submission

- Save the file as `Lab04-PetVax-Access-LastName.accdb` (use your real last name, no spaces).
- Upload the `.accdb` to the Lab 04 file-submission assignment.
- Answer the auto-graded quiz questions in the Brightspace quiz for this lab.
- **Grading:** quiz checks (24 pts) + AI-graded review of your `.accdb` (16 pts) = **40 pts**.

## Optional Extensions

These are not required and are not graded.

- Build `qryNoReminder`: appointments where `ReminderSent = No`. How many rows do you get?
- Build `qryPaymentsHighToLow`: `PetName`, `OwnerName`, `ServiceType`, `PaymentAmount`, sorted by `PaymentAmount` descending. Which pet is on top?
- Build a second report, `rptVaccineDue`, from `qryVaccineDue`, and tidy its layout.

