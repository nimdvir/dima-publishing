# Building the Lab 06 starter and answer `.accdb` files

Instructor / author note. Students never run these steps — they receive the prebuilt `.accdb` files. This document exists so the database files can be regenerated from the CSVs at any time.

Plan on about 10 minutes per file. Build the **starter** first, then copy it and add the relationships + queries to produce the **answer** file.

## Build 1 — `lab-06-petvax-relational-starter.accdb`

### 1. Create an empty database

1. Open Microsoft Access → **Blank database**.
2. Name it `lab-06-petvax-relational-starter.accdb` and save into this `assets/` folder.
3. Delete the auto-created `Table1`.

### 2. Import each CSV

For each CSV in the order below, go to **External Data → New Data Source → From File → Text File** and:

1. Pick the CSV. Choose **Import the source data into a new table** → OK.
2. Wizard: **Delimited** → Next → **Comma** delimiter, **First Row Contains Field Names** checked → Next.
3. On the field-options screen, set each field's data type using the table further down. This is the most important step — Access guesses wrong for the integer ID columns.
4. **Choose my own primary key** → pick the PK shown below.
5. Import to table name = CSV stem in UPPERCASE (`OWNER`, `PET`, `PET_OWNER`, `SERVICE_TYPE`, `APPOINTMENT`, `APPOINTMENT_SERVICE`).
6. Do **not** save the import steps.

Import in this order so foreign-key columns can later resolve cleanly:

1. `OWNER.CSV` → `OWNER`
2. `PET.CSV` → `PET`
3. `SERVICE_TYPE.CSV` → `SERVICE_TYPE`
4. `PET_OWNER.CSV` → `PET_OWNER`
5. `APPOINTMENT.CSV` → `APPOINTMENT`
6. `APPOINTMENT_SERVICE.CSV` → `APPOINTMENT_SERVICE`

### 3. Field types

Open each table in Design View after import and verify every field matches this table. Foreign-key columns **must match the parent primary key type exactly** or Access will refuse to draw the relationship.

| Table                 | Field                     | Data Type            | Notes                                                                                                                                                                                                                                                                                                                       |
| --------------------- | ------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OWNER`               | `OwnerID`                 | Number, Long Integer | Primary key                                                                                                                                                                                                                                                                                                                 |
| `OWNER`               | `OwnerName`               | Short Text           |                                                                                                                                                                                                                                                                                                                             |
| `OWNER`               | `OwnerEmail`              | Short Text           |                                                                                                                                                                                                                                                                                                                             |
| `PET`                 | `PetID`                   | Number, Long Integer | Primary key                                                                                                                                                                                                                                                                                                                 |
| `PET`                 | `PetName`                 | Short Text           |                                                                                                                                                                                                                                                                                                                             |
| `PET`                 | `AnimalType`              | Short Text           |                                                                                                                                                                                                                                                                                                                             |
| `PET`                 | `BreedName`               | Short Text           |                                                                                                                                                                                                                                                                                                                             |
| `PET`                 | `WeightKg`                | Number, Double       |                                                                                                                                                                                                                                                                                                                             |
| `SERVICE_TYPE`        | `ServiceType`             | Short Text           | Primary key (natural key)                                                                                                                                                                                                                                                                                                   |
| `SERVICE_TYPE`        | `StandardFee`             | Currency             |                                                                                                                                                                                                                                                                                                                             |
| `SERVICE_TYPE`        | `RequiresVaccineTracking` | Short Text           | Stores `Yes` / `No` as text (matches CSV). **Intentional choice** — keeping this as Short Text means the CSV import lands verbatim and the lab's `WHERE RequiresVaccineTracking = 'Yes'` criterion works as-is. Do not "fix" this to a Yes/No (boolean) field; that would require coercing on import and rewriting the SQL. |
| `PET_OWNER`           | `PetOwnerID`              | Number, Long Integer | Primary key                                                                                                                                                                                                                                                                                                                 |
| `PET_OWNER`           | `PetID`                   | Number, Long Integer | FK → `PET.PetID`                                                                                                                                                                                                                                                                                                            |
| `PET_OWNER`           | `OwnerID`                 | Number, Long Integer | FK → `OWNER.OwnerID`                                                                                                                                                                                                                                                                                                        |
| `APPOINTMENT`         | `AppointmentID`           | Number, Long Integer | Primary key                                                                                                                                                                                                                                                                                                                 |
| `APPOINTMENT`         | `PetID`                   | Number, Long Integer | FK → `PET.PetID`                                                                                                                                                                                                                                                                                                            |
| `APPOINTMENT`         | `AppointmentDate`         | Date/Time            | Short Date format                                                                                                                                                                                                                                                                                                           |
| `APPOINTMENT`         | `AppointmentStatus`       | Short Text           |                                                                                                                                                                                                                                                                                                                             |
| `APPOINTMENT`         | `ReminderSent`            | Short Text           |                                                                                                                                                                                                                                                                                                                             |
| `APPOINTMENT_SERVICE` | `AppointmentServiceID`    | Number, Long Integer | Primary key                                                                                                                                                                                                                                                                                                                 |
| `APPOINTMENT_SERVICE` | `AppointmentID`           | Number, Long Integer | FK → `APPOINTMENT.AppointmentID`                                                                                                                                                                                                                                                                                            |
| `APPOINTMENT_SERVICE` | `ServiceType`             | Short Text           | FK → `SERVICE_TYPE.ServiceType`                                                                                                                                                                                                                                                                                             |
| `APPOINTMENT_SERVICE` | `PaymentAmount`           | Currency             |                                                                                                                                                                                                                                                                                                                             |

Manually-entered Long Integer primary keys (not AutoNumber) are used so the CSV IDs survive import and the foreign-key references stay valid. The lab does not require students to add new rows that would need generated IDs.

### 4. Confirm row counts

In the Navigation pane, open each table and check the row count:

| Table                 | Rows |
| --------------------- | ---- |
| `OWNER`               | 6    |
| `PET`                 | 7    |
| `PET_OWNER`           | 8    |
| `SERVICE_TYPE`        | 4    |
| `APPOINTMENT`         | 8    |
| `APPOINTMENT_SERVICE` | 9    |

### 5. Leave relationships and queries empty

Do **not** open **Database Tools → Relationships**. Do **not** create any saved queries. Students do that work.

### 6. Compact and close

**File → Info → Compact & Repair Database** → save → close.

The student-facing starter is done.

## Build 2 — `lab-06-petvax-relational-ANSWER.accdb`

### 1. Copy the starter

In File Explorer, copy `lab-06-petvax-relational-starter.accdb` and rename the copy to `lab-06-petvax-relational-ANSWER.accdb`. Open it in Access.

### 2. Add the 5 relationships

Open **Database Tools → Relationships**. Use **Show Table** to add all 6 tables. Drag each parent field onto the matching child field. For every relationship: check **Enforce Referential Integrity**; leave **Cascade Update** and **Cascade Delete** **unchecked**.

| #   | Parent         | Child                 | Join Fields                       |
| --- | -------------- | --------------------- | --------------------------------- |
| 1   | `OWNER`        | `PET_OWNER`           | `OwnerID` → `OwnerID`             |
| 2   | `PET`          | `PET_OWNER`           | `PetID` → `PetID`                 |
| 3   | `PET`          | `APPOINTMENT`         | `PetID` → `PetID`                 |
| 4   | `APPOINTMENT`  | `APPOINTMENT_SERVICE` | `AppointmentID` → `AppointmentID` |
| 5   | `SERVICE_TYPE` | `APPOINTMENT_SERVICE` | `ServiceType` → `ServiceType`     |

Save the layout.

### 3. Add the 4 saved queries

For each query: **Create → Query Design → Close** the Show Table dialog → switch to **SQL View** → paste the SQL below → save with the exact name shown. Build `qryExpectedRequiredVaccinations` **before** `qryMissingRequiredVaccinations` (the second query reads from the first).

#### `qryAppointmentBillingDetail`

```sql
SELECT PET.PetName,
       PET.AnimalType,
       APPOINTMENT.AppointmentDate,
       APPOINTMENT.AppointmentStatus,
       APPOINTMENT_SERVICE.ServiceType,
       APPOINTMENT_SERVICE.PaymentAmount,
       SERVICE_TYPE.StandardFee,
       [PaymentAmount]-[StandardFee] AS PaymentDifference
FROM SERVICE_TYPE
INNER JOIN (APPOINTMENT
INNER JOIN (PET
INNER JOIN APPOINTMENT_SERVICE
       ON APPOINTMENT.AppointmentID = APPOINTMENT_SERVICE.AppointmentID)
       ON PET.PetID = APPOINTMENT.PetID)
       ON SERVICE_TYPE.ServiceType = APPOINTMENT_SERVICE.ServiceType
ORDER BY APPOINTMENT.AppointmentDate;
```

Run it. Expect **9 rows**, **2** with a nonzero `PaymentDifference`.

> Access often rewrites the join order in the SQL editor. As long as the query runs and returns 9 rows, the rewrite is fine.

#### `qryOwnerPetSummary`

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

Run it. Expect **6 rows**. Hannah Reyes appears with `PetCount = 0`.

#### `qryExpectedRequiredVaccinations` (build this one first)

```sql
SELECT PET.PetID,
       PET.PetName,
       PET.AnimalType,
       SERVICE_TYPE.ServiceType
FROM PET, SERVICE_TYPE
WHERE SERVICE_TYPE.RequiresVaccineTracking = 'Yes';
```

Run it. Expect **7 rows** — every pet paired with `Vaccination`.

#### `qryMissingRequiredVaccinations`

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

Run it. Expect **5 rows**: Bandit, Charlie, Coco, Luna, Whiskers (Buddy and Maple already have a vaccination on file).

> The two-query split is deliberate. Access's Jet engine sometimes rejects the equivalent single-query form (`FROM (PET, SERVICE_TYPE) LEFT JOIN (...) ON cond1 AND cond2`) with a `JOIN expression not supported` error. Staging it through a saved cross-join query is reliable and easier to debug.

### 4. Compact and close

**File → Info → Compact & Repair Database** → save → close.

Both files are now ready. Keep them in this `assets/` folder so the questions file can link to the student-facing starter.
