# Lab 07 — Starter Assets

This folder holds the starter data for **Lab 07: Normalizing a Veterinary Clinic Database**.

## Files

| File | Purpose |
| --- | --- |
| `petvax_flat_starter.csv` | A single deliberately flat table (`PETVAX_FLAT`) of 28 visit-treatment line items. Mixes owner, pet, vet, visit, and treatment facts in every row. This is the *only* data file students need. |

## How to import the CSV into Access

1. Open Microsoft Access and create a new blank database. Save it as `Lab07-Normalized-PetVax-LastName.accdb`.
2. **External Data → New Data Source → From File → Text File.**
3. Browse to `petvax_flat_starter.csv` and choose **Import the source data into a new table in the current database**.
4. In the Import Text Wizard:
   - Choose **Delimited**, then **Comma**.
   - Check **First Row Contains Field Names**.
   - On the field-options screen, set data types:
     - `VisitTreatmentID`, `OwnerID`, `PetID`, `VetID`, `VisitID`, `StandardPrice`, `ActualCharge` → **Long Integer**.
     - `BirthDate`, `VisitDate` → **Date/Time** (format `YYYY-MM-DD`).
     - All other text fields → **Short Text**.
   - When asked about the primary key, choose **Let Access add primary key** — *no*, choose **No primary key** for now (you will set keys on the normalized tables, not on the flat one).
   - Name the imported table exactly **`PETVAX_FLAT`** (case as shown). The lab steps reference this name.
5. Open `PETVAX_FLAT` in Datasheet View. You should see **28 rows** and **22 columns**.

> ⚠️ **Do not change `PETVAX_FLAT` after importing.** The lab uses it as the read-only source for every append query.

## Data dictionary

| Field | Meaning | Example |
| --- | --- | --- |
| `VisitTreatmentID` | Unique line item for a treatment performed during a visit | 1001 |
| `OwnerID` | Unique owner identifier | 201 |
| `OwnerFirstName` | Owner first name | Maya |
| `OwnerLastName` | Owner last name | Cohen |
| `OwnerEmail` | Owner email address | maya.cohen@example.com |
| `OwnerPhone` | Owner phone number | 518-555-0101 |
| `PetID` | Unique pet identifier | 301 |
| `PetName` | Pet name | Luna |
| `Species` | Animal species | Dog |
| `Breed` | Pet breed | Yorkie |
| `BirthDate` | Pet date of birth | 2021-06-12 |
| `VetID` | Unique veterinarian identifier | 401 |
| `VetFirstName` | Veterinarian first name | Erin |
| `VetLastName` | Veterinarian last name | Patel |
| `VisitID` | Unique visit identifier | 501 |
| `VisitDate` | Date of visit | 2026-09-12 |
| `VisitReason` | Reason for visit | Annual exam |
| `TreatmentCode` | Unique treatment code | VAC-RAB |
| `TreatmentName` | Treatment name | Rabies vaccine |
| `TreatmentCategory` | Treatment category | Vaccine |
| `StandardPrice` | Standard treatment price | 45 |
| `ActualCharge` | Amount charged for this visit-treatment line | 45 |
