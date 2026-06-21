---
section: "Lab Questions"
lab: "Lab 11"
title: "DBA Practices for PetVax"
date: "2026-06-21"
---

# Lab 11: DBA Practices for PetVax

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

*Apply database administration practices — security roles, backup planning, recovery drills, integrity checks, and performance indexing — to the PetVax clinic database.*

## Overview

A clinic database is a production system. Real animals' health records, billing data, and appointment histories depend on it. In this lab you move from building and querying to protecting and managing. You will define three security roles for clinic staff, write a one-page backup and recovery plan, simulate recovering from a data loss scenario, check database integrity using built-in Access tools, create performance indexes, and document the business impact of your administrative decisions.

- Chapter: Chapter 11 — Database Administration.
- Builds on: [ch11-lets-build-2026-06-19.md](../../ch11-database-administration/lets-build/ch11-lets-build-2026-06-19.md).
- Estimated time: ~75 minutes.
- Tool: Microsoft Access (primary); SQLite for PRAGMA-based integrity checks.

## Scenario

PetVax has grown to three veterinarians, two receptionists, and a practice manager. The database now holds two years of appointments, invoices, and medical records. A single mistake — deleting the wrong owner, losing a week of appointments, exposing financial data to the wrong person — could disrupt operations or violate privacy rules.

The practice manager has asked you to put basic DBA protections in place: who can access what, how to recover from accidents, how to check that the database is healthy, and how to keep common queries fast as the data grows.

## Required Files and Tools

| Item            | Detail                                                                           |
| --------------- | -------------------------------------------------------------------------------- |
| Tool            | Microsoft Access — open your PetVax database from Labs 04–10                     |
| Submission file | `Lab11-PetVax-DBA-LastName.pdf` — a single PDF containing all deliverables below |
| Where to submit | Upload your PDF to the Lab 11 dropbox                                            |

## Steps

### Step 1 — Define clinic security roles

**Do.** Write a role-based access control (RBAC) policy for PetVax. Define three roles and document what each role can and cannot do.

| Role         | Can Do                                                             | Cannot Do                           |
| ------------ | ------------------------------------------------------------------ | ----------------------------------- |
| Receptionist | INSERT/UPDATE appointments and owner/pet info; VIEW service lists  | See financial data or medical notes |
| Veterinarian | SELECT/UPDATE medical records and appointments; VIEW own schedule  | Modify billing                      |
| Manager      | Full access — financial reports, revenue data, all admin functions | (none — highest privilege)          |

Write this as a one-page policy document. For each role, list the specific tables and operations (SELECT, INSERT, UPDATE, DELETE) that are allowed or denied.

**Check 1.** *(Multi-select)* Which operations should a Receptionist be allowed on the `APPOINTMENT` table? Select all that apply.

- A. SELECT
- B. INSERT
- C. UPDATE
- D. DELETE

**Check 2.** *(Multiple choice)* Who should have access to `INVOICE.TotalAmount` and `INVOICE.PaidDate`?

- A. Receptionist only
- B. Veterinarian only
- C. Manager only
- D. All three roles

**Check 3.** *(Matching)* Match each role to its primary responsibility.

| Role         | Responsibility                                                                           |
| ------------ | ---------------------------------------------------------------------------------------- |
| Receptionist | Schedule and update appointments · Review medical history · Oversee revenue and staffing |
| Veterinarian | Schedule and update appointments · Review medical history · Oversee revenue and staffing |
| Manager      | Schedule and update appointments · Review medical history · Oversee revenue and staffing |

### Step 2 — Write a backup and recovery plan

**Do.** Write a one-page backup plan answering:

- Backup frequency (how often?)
- Backup type (full copy of the `.accdb` file)
- Storage location (local drive, external drive, cloud)
- Retention period (how many days of backups kept?)
- RTO (Recovery Time Objective): how quickly must the database be back online?
- RPO (Recovery Point Objective): how much data can the clinic afford to lose?

Then perform a backup drill: close your database, copy the `.accdb` file, rename the copy with today's date, and reopen the backup to verify the data is intact.

**Check 4.** *(Short answer)* What does RPO stand for in backup planning?

**Check 5.** *(Multiple choice)* If the clinic backs up daily at 6 PM and the database crashes at 2 PM the next day, what is the maximum data that could be lost?

- A. Nothing — daily backups are sufficient
- B. Up to 20 hours of data (from 6 PM yesterday to 2 PM today)
- C. Everything — the backup is useless
- D. Only the data entered between 6 PM and midnight

**Check 6.** *(Multiple choice)* Which is the most important step after copying a backup file?

- A. Delete the original to save space
- B. Verify the backup opens correctly and shows the expected data
- C. Rename the backup to something cryptic for security
- D. Email the backup to every staff member

### Step 3 — Simulate a recovery

**Do.** Imagine the following scenario:

> "A staff member accidentally deleted all appointments for last week."

Write a short recovery walkthrough: which tables are affected (APPOINTMENT, APPOINTMENT_SERVICE, INVOICE), where the last good backup is, how you restore it to a safe location, how you compare the restored version against the damaged version, and what data is still missing after recovery.

**Check 7.** *(Multi-select)* If the APPOINTMENT table is damaged, which other tables are likely affected due to referential integrity? Select all that apply.

- A. OWNER
- B. APPOINTMENT_SERVICE
- C. INVOICE
- D. SERVICE
- E. PET

**Check 8.** *(Short answer)* After restoring from backup, what data is most likely still missing?

### Step 4 — Check database integrity

**Do.** In Access, open **Database Tools → Compact and Repair Database**. This rebuilds indexes, reclaims unused space, and checks for structural corruption.

Open **Database Tools → Relationships** and confirm all relationships show "Enforce Referential Integrity." Verify that no orphan records exist by running a query that joins APPOINTMENT to PET on PetID and checks for NULL on the PET side.

In SQLite (optional), run:

```sql
PRAGMA integrity_check;
```

**Check 9.** *(Multiple choice)* What does Compact and Repair do in Access?

- A. Deletes old records to free space
- B. Rebuilds indexes, reclaims unused space, and checks for structural problems
- C. Creates a backup copy of the database
- D. Resets all primary key auto-numbers to 1

**Check 10.** *(Short answer)* What output does `PRAGMA integrity_check` return when the database is healthy?

### Step 5 — Add performance indexes

**Do.** Identify three fields that are searched frequently in the PetVax database and would benefit from indexes. Create the indexes and document your choices.

Recommended targets:
- `OWNER.LastName` — receptionists search by owner name daily
- `PET.Name` — pet lookups at check-in
- `APPOINTMENT.ApptDate` — daily schedule queries

In Access, open each table in **Design View**, select the field, and set **Indexed** to **Yes (Duplicates OK)** in the field properties. In SQLite, use `CREATE INDEX`.

**Check 11.** *(Multi-select)* Which criteria should guide your decision to add an index? Select all that apply.

- A. The column is used in WHERE clauses frequently
- B. The column is used in JOIN conditions
- C. The column is used in ORDER BY clauses
- D. The column is rarely queried but contains unique values
- E. The column is a foreign key

**Check 12.** *(Multiple choice)* What is a downside of adding too many indexes?

- A. They take up no space so there is no downside
- B. They slow down INSERT, UPDATE, and DELETE operations
- C. They prevent referential integrity from being enforced
- D. They make SELECT queries slower

**Check 13.** *(Short answer)* In SQLite, what command shows whether a query is using the index you created?

### Step 6 — Document business impact

**Do.** Write a short memo (3–4 sentences) answering: What does the clinic lose if the database goes down for 4 hours? For 2 days? What data would be permanently lost without proper backups?

---

## Submission

Submit one file:

- `Lab11-PetVax-DBA-LastName.pdf` — containing your RBAC policy, backup plan, recovery walkthrough, integrity verification notes, index documentation, and business impact memo.

> ⚠️ **Missing-file rule:** If the PDF is missing, you receive zero for the file-submission part.

Final grade = quiz score (13 questions) + AI-graded artifact.

## Optional Extensions

- Write the actual SQL GRANT and REVOKE statements for the three roles (requires PostgreSQL or SQL Server — not available in Access).
- Test your backup recovery by intentionally deleting a few rows and restoring them from the backup copy.
- Use `EXPLAIN QUERY PLAN` in SQLite to compare a query before and after adding an index.
