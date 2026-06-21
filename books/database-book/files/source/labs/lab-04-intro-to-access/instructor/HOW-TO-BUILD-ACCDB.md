<!-- markdownlint-disable MD013 MD024 MD036 -->

# How to Build the Lab 04 Starter Access Database (Instructor Notes)

This file explains how to turn the two CSV files into a starter Microsoft Access database (`.accdb`) for Lab 04. Students do **not** see this file. There are two distribution options:

- **Option A (recommended): distribute the CSVs.** Students import the CSVs themselves. This is what the student instructions assume, because importing teaches an Access skill and forces real Access use. If you choose this, you do **not** need to build an `.accdb` at all — just hand out the two CSV files.
- **Option B: distribute a pre-built `.accdb`.** Build the database once using the steps below, then give students a starter file with the two tables already imported.

Use Option B only if you want students to skip the import step.

## Source Files

| File | Rows | Purpose |
| --- | --- | --- |
| `assets/PETVAX_APPOINTMENTS-2026-06-03.csv` | 24 | One row per appointment |
| `assets/SERVICE_RATES-2026-06-03.csv` | 6 | Standard fee per service type |

## Field Reference (PETVAX_APPOINTMENTS)

| Field | Access Data Type | Notes |
| --- | --- | --- |
| `AppointmentID` | Number (Long Integer) | Primary key (1001–1024) |
| `AppointmentDate` | Date/Time | `m/d/yyyy` format |
| `AppointmentTime` | Short Text | e.g. `9:00 AM` |
| `PetName` | Short Text | Required |
| `OwnerName` | Short Text | Required |
| `OwnerEmail` | Short Text | |
| `AnimalType` | Short Text | Dog / Cat |
| `BreedName` | Short Text | |
| `WeightKg` | Number (Double) | Validation rule `Between 0 And 100` |
| `ServiceType` | Short Text | Required; joins to `SERVICE_RATES` |
| `VaccineDue` | Short Text | `Yes` / `No` |
| `AppointmentStatus` | Short Text | Required; Completed / No-show / Scheduled |
| `ReminderSent` | Short Text | `Yes` / `No` |
| `PaymentAmount` | Number (Double) | Validation rule `>=0` |
| `Notes` | Short Text | |

## Field Reference (SERVICE_RATES)

| Field | Access Data Type | Notes |
| --- | --- | --- |
| `ServiceType` | Short Text | Matches `PETVAX_APPOINTMENTS.ServiceType` |
| `StandardFee` | Number (Double) | |
| `RequiresVaccineTracking` | Short Text | `Yes` / `No` |

## Build Steps (Option B)

1. Open Microsoft Access and choose **Blank database**. Name it `Lab04-PetVax-Access-STARTER.accdb` and click **Create**.
2. Close the empty `Table1` without saving (right-click the tab → **Close**).
3. **External Data → New Data Source → From File → Text File.** Browse to `PETVAX_APPOINTMENTS-2026-06-03.csv`. Choose **Import the source data into a new table** and click **OK**.
4. In the wizard: keep **Delimited**, comma delimiter, and check **First Row Contains Field Names**.
5. On the field-options screen, set each field's data type to match the **Field Reference** table above. (Access usually guesses these correctly; double-check `AppointmentID` is a whole number and `WeightKg`/`PaymentAmount` are decimals.)
6. When asked about a primary key, choose **No primary key**. Name the table `PETVAX_APPOINTMENTS` and finish.
7. Repeat steps 3–6 for `SERVICE_RATES-2026-06-03.csv`. Name that table `SERVICE_RATES`.
8. **Database Tools → Compact and Repair Database**, then save.

> 💡 **Note:** If you want students to also practice setting the primary key and validation rules (Steps 2 and 3 of the lab), stop here and leave those out. If you want a fully wired starter, add the PK on `AppointmentID` and the two validation rules before saving.

## Verification (after import)

Confirm these counts before distributing:

- `PETVAX_APPOINTMENTS` = 24 rows.
- `SERVICE_RATES` = 6 rows.
- No header row imported as data (first record is `AppointmentID` 1001, PetName Buddy).
- `AppointmentDate` displays as real dates, not text.

## Answer-Key Counts (for reference)

These match the values in `lab-04-answers-2026-06-03.md`:

- After students add the Maple record (`AppointmentID` 1025): 25 rows.
- No-shows: 2 (Mango 1006, Max 1010).
- Vaccine due = Yes after Maple: 12.
- Dental Cleaning average payment: 123.32.
- Highest average service: Emergency Visit (439).
- `qryAppointmentsWithRates` join: 25 rows (a much larger number means the join line is missing).
