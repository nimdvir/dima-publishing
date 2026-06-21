---
section: "Lab Questions"
lab: "Lab 09"
title: "Designing a Veterinary Clinic Database"
date: "2026-06-21"
---

# Lab 09: Designing a Veterinary Clinic Database

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

*Take the full design workflow you practiced on the Grading Database — Lucidchart ERD, Mermaid diagram-as-code, and SQL DDL — and apply it to PetVax from scratch.*

## Overview

In this lab you design a veterinary clinic database from the ground up. Starting from a plain-English list of business rules, you will identify the core entities and their attributes, draw a Crow's Foot ERD in Lucidchart, code the same design as a Mermaid diagram, and translate everything into executable SQL `CREATE TABLE` statements with primary keys, foreign keys, and constraints.

This is not a build lab — you are not creating an `.accdb` file with tables and data. You are producing the three design artifacts every professional database project starts with: a visual ERD, a diagram-as-code version, and the DDL that turns the design into a real database.

- Chapter: Chapter 9 — Database Design and ER Modeling.
- Builds on: [ch09-lets-build-2026-06-19.md](../../ch09-database-design/lets-build/ch09-lets-build-2026-06-19.md) (Grading Database design walkthrough).
- Estimated time: ~60 minutes.
- Tools: Lucidchart (free account), a Mermaid viewer (VS Code or mermaid.live), and Microsoft Access SQL View for DDL verification.

## Scenario

PetVax Veterinary Clinic needs a database. The clinic manager has given you these business rules:

> We have owners who bring in their pets. Each owner can have multiple pets. Each pet belongs to exactly one owner. Owners have a first name, last name, phone number, email address, and mailing address. Pets have a name, species (Dog, Cat, Bird, Reptile, or Other), breed, birth date, and current weight.
>
> We employ veterinarians. Each vet has a first name, last name, and a unique state license number.
>
> Owners schedule appointments for their pets. Each appointment is for exactly one pet and is assigned to exactly one veterinarian. Appointments have a date, a start time, and a reason for the visit.
>
> During an appointment, the vet may perform one or more services. Each service has a name, a description, and a default charge. The actual charge for a service performed at a specific appointment may differ from the default. You can add notes about the service performed.
>
> After the appointment, an invoice is generated. Each invoice is tied to exactly one appointment and shows a total amount, the date it was paid, and the payment method (Cash, Card, Check, or Insurance).

Your job is to turn these rules into a professional database design.

## Required Files and Tools

| Item              | Detail                                                                 |
| ----------------- | ---------------------------------------------------------------------- |
| Tools             | Lucidchart (free), Mermaid viewer, Microsoft Access (SQL View for DDL) |
| Submission file 1 | `Lab09-PetVax-ERD-LastName.pdf` — exported Lucidchart ERD              |
| Submission file 2 | `Lab09-PetVax-Mermaid-LastName.txt` — Mermaid diagram code             |
| Submission file 3 | `Lab09-PetVax-DDL-LastName.sql` — SQL CREATE TABLE statements          |
| Where to submit   | Upload all three files to the Lab 09 dropbox                           |

## Steps

### Step 1 — Extract the entities

**Do.** Read the business rules in the Scenario above. List every distinct thing the clinic needs to track — these are your entities. For each entity, list its attributes (the facts stored about each instance of that entity). Underline the attribute that will serve as the primary key.

Use this format in a text file or on paper:

```
ENTITY_NAME(PK_attribute, attribute2, attribute3, ...)
```

**Check 1.** *(Multi-select)* Which of the following should be entities in the PetVax database? Select all that apply.

- A. Owner
- B. VisitDate
- C. Pet
- D. Veterinarian
- E. Appointment
- F. Service
- G. TotalAmount
- H. Invoice

**Check 2.** *(Short answer)* How many entities did you identify? Enter a number.

**Check 3.** *(Matching)* Match each entity to its correct primary key.

| Entity       | Primary Key                             |
| ------------ | --------------------------------------- |
| OWNER        | OwnerID · OwnerEmail · LastName         |
| PET          | PetID · PetName · Species               |
| VETERINARIAN | VetID · LicenseNumber · LastName        |
| APPOINTMENT  | ApptID · ApptDate · PetID               |
| SERVICE      | ServiceID · ServiceName · DefaultCharge |
| INVOICE      | InvoiceID · ApptID · TotalAmount        |

### Step 2 — Identify relationships and cardinality

**Do.** For each pair of related entities, decide:

- Is the relationship one-to-one, one-to-many, or many-to-many?
- Is the relationship mandatory or optional on each side?

Write your answers down. You will need them for the ERD.

**Check 4.** *(Multiple choice)* What is the cardinality between OWNER and PET?

- A. One-to-one (each owner has exactly one pet)
- B. One-to-many (one owner can have multiple pets, each pet belongs to one owner)
- C. Many-to-many (owners can share pets, pets can have multiple owners)
- D. There is no direct relationship

**Check 5.** *(Multiple choice)* Which relationship is many-to-many and requires a junction table?

- A. PET to APPOINTMENT
- B. VETERINARIAN to APPOINTMENT
- C. APPOINTMENT to SERVICE
- D. APPOINTMENT to INVOICE

**Check 6.** *(Multiple choice)* The junction table for the many-to-many relationship between APPOINTMENT and SERVICE should be named:

- A. SERVICE_LIST
- B. APPOINTMENT_SERVICE
- C. VISIT_SERVICES
- D. TREATMENT

### Step 3 — Draw the ERD in Lucidchart

**Do.** Create a new Lucidchart document. Use the **Entity Relationship Diagram** template. For each entity from Step 1, add an entity box containing the table name and all columns. Bold or underline the primary key in each entity box. Mark foreign keys with `(FK)`.

Draw relationship lines using **Crow's Foot notation**. For each relationship line, show:

- Cardinality: one (`|`) or many (crow's foot `\<`)
- Optionality: mandatory (`|`) or optional (`O`)

Your finished ERD must include a junction table (`APPOINTMENT_SERVICE`) to resolve the many-to-many relationship between APPOINTMENT and SERVICE.

Export the finished diagram as a PDF: **File → Download As → PDF**. Name it `Lab09-PetVax-ERD-LastName.pdf`.

**Check 7.** *(Short answer)* How many entity boxes (including the junction table) should your completed ERD contain? Enter a number.

**Check 8.** *(Multiple choice)* The APPOINTMENT_SERVICE junction table should have which primary key?

- A. A single AutoNumber field (AppointmentServiceID)
- B. A composite primary key on (ApptID, ServiceID)
- C. ServiceID alone
- D. ApptID alone

**Check 9.** *(Multiple choice)* In Crow's Foot notation, which symbol on the PET side of the OWNER—PET relationship means "one owner can have many pets"?

- A. A single vertical line `|`
- B. A circle `O`
- C. A crow's foot (three lines spreading out)
- D. A dashed line

### Step 4 — Code the ERD in Mermaid

**Do.** Using the same design from your Lucidchart ERD, write the equivalent Mermaid diagram. Open VS Code or [mermaid.live](https://mermaid.live) and use the `erDiagram` syntax.

Your Mermaid diagram must include:

- Every entity with its attributes and data types
- Primary keys marked with `PK`
- Foreign keys marked with `FK`
- Every relationship with cardinality notation (`||--o{`, `}o--||`, etc.)

Save the Mermaid code as `Lab09-PetVax-Mermaid-LastName.txt`.

Here is a starter template:

```
erDiagram
    OWNER {
        int OwnerID PK
        string FirstName
        string LastName
        ...
    }
```

**Check 10.** *(Multiple choice)* In Mermaid, which notation means "exactly one"?

- A. `||`
- B. `}o`
- C. `o{`
- D. `|o`

**Check 11.** *(Short answer)* Counting the APPOINTMENT_SERVICE junction table, how many total relationship lines should your Mermaid diagram contain? Enter a number.

### Step 5 — Write the SQL CREATE TABLE statements

**Do.** Open Microsoft Access, create a new blank database, and open **SQL View** (Create → Query Design → close Show Table → SQL View). Write a `CREATE TABLE` statement for each entity from your design.

Your DDL must include:

- A `CREATE TABLE` statement for every entity (including the junction table)
- Every primary key declared with `PRIMARY KEY`
- Every foreign key declared with `REFERENCES parent_table(PK)`
- `NOT NULL` on required fields
- `UNIQUE` on fields that must be unique (Email, LicenseNumber)
- `CHECK` constraints where appropriate (e.g., species must be from a dropdown list)
- `ON DELETE RESTRICT` or `ON DELETE CASCADE` on foreign keys where you can justify the choice

Save all statements in one file named `Lab09-PetVax-DDL-LastName.sql`.

**Check 12.** *(Short answer)* How many `CREATE TABLE` statements are in your DDL file?

**Check 13.** *(Multiple choice)* Which field should have a `UNIQUE` constraint?

- A. Pet.Name
- B. Owner.Email
- C. Appointment.ApptDate
- D. Service.ServiceName

**Check 14.** *(Multi-select)* Which of the following CHECK constraints make sense for the PetVax database? Select all that apply.

- A. `CHECK (Weight > 0)` on PET
- B. `CHECK (Species IN ('Dog', 'Cat', 'Bird', 'Reptile', 'Other'))` on PET
- C. `CHECK (ApptDate >= DATE())` on APPOINTMENT
- D. `CHECK (TotalAmount >= 0)` on INVOICE
- E. `CHECK (PaymentMethod IN ('Cash', 'Card', 'Check', 'Insurance'))` on INVOICE

**Check 15.** *(Multiple choice)* For the foreign key from APPOINTMENT to PET, which referential action is most appropriate?

- A. `ON DELETE CASCADE` — deleting a pet should delete all its appointments
- B. `ON DELETE RESTRICT` — prevent deleting a pet that still has appointment history
- C. `ON DELETE SET NULL` — keep the appointment but remove the pet reference
- D. No referential action needed

**Check 16.** *(Short answer)* In your DDL, what data type did you assign to `Appointment.ApptDate`?

---

## Submission

Submit three files:

1. `Lab09-PetVax-ERD-LastName.pdf` — your exported Lucidchart ERD
2. `Lab09-PetVax-Mermaid-LastName.txt` — your Mermaid diagram code
3. `Lab09-PetVax-DDL-LastName.sql` — your SQL CREATE TABLE statements

> ⚠️ **Missing-file rule:** If any required file is missing, you receive zero for the file-submission part of this lab. All three files must be uploaded.

Final grade = quiz score (16 questions, auto-graded) + AI-graded artifact (three design files checked for correctness, completeness, and consistency).

## Optional Extensions

- Add a `MEDICATION` entity and a `PRESCRIPTION` junction table. Update your ERD, Mermaid, and DDL to include them.
- Write `INSERT INTO` statements for 3 sample rows in each table, respecting the foreign key order.
- In your Mermaid diagram, style the junction table with a different background color using `:::junction` class syntax.
