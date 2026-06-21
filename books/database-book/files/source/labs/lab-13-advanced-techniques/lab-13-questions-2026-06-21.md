---
section: "Lab Questions"
lab: "Lab 13"
title: "Hardening the PetVax Database"
date: "2026-06-21"
---

# Lab 13: Hardening the PetVax Database

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

*Add constraints, indexes, an audit trail, and transaction-protected updates to make the PetVax database production-ready.*

## Overview

A database that works for one user with clean test data is different from one that survives daily use by multiple staff members. In this lab you harden the PetVax database: you add CHECK constraints to prevent invalid data entry, create indexes on frequently searched fields, build an audit table that logs every change to service charges, protect multi-step updates with transactions, and create an analytical view for vet utilization trends.

- Chapter: Chapter 13 — Advanced Database Techniques.
- Estimated time: ~75 minutes.
- Tool: Microsoft Access SQL View (primary); SQLite for triggers.

## Scenario

PetVax is growing fast. With more staff entering data, more appointments being booked, and more invoices being generated, the risk of bad data creeping in is real — a negative weight on a pet record, a backdated appointment, a service charge changed without anyone knowing who changed it or why. Your job is to add the controls that prevent these problems before they affect patient care or business decisions.

## Required Files and Tools

| Item            | Detail                                                                   |
| --------------- | ------------------------------------------------------------------------ |
| Tool            | Microsoft Access SQL View                                                |
| Submission file | `Lab13-PetVax-Hardening-LastName.sql` — all SQL statements with comments |
| Where to submit | Upload your `.sql` file to the Lab 13 dropbox                            |

## Steps

### Step 1 — Add CHECK constraints

**Do.** Write ALTER TABLE statements (or include constraints in CREATE TABLE) that enforce these rules:

- `PET.Weight > 0`
- `APPOINTMENT.ApptDate >= DATE()` (no backdated appointments)
- `INVOICE.TotalAmount >= 0`
- `APPOINTMENT_SERVICE.Charge >= 0`
- `INVOICE.PaymentMethod IN ('Cash', 'Card', 'Check', 'Insurance')`

**Check 1.** *(Short answer)* What does a CHECK constraint do when an INSERT or UPDATE violates its condition?
**Check 2.** *(Multi-select)* Which of these should have a CHECK constraint? Select all that apply.

- A. PET.Weight must be positive
- B. OWNER.Email must contain "@"
- C. APPOINTMENT.ApptTime must be between 08:00 and 18:00
- D. INVOICE.PaidDate must not be before APPOINTMENT.ApptDate

### Step 2 — Add performance indexes

**Do.** Create indexes on: `OWNER.LastName`, `PET.Name`, `APPOINTMENT.ApptDate`, `INVOICE.PaidDate`. Document why each index helps a specific clinic workflow.

**Check 3.** *(Short answer)* Which SQL command creates an index?
**Check 4.** *(Multiple choice)* Which PetVax query would benefit most from an index on `APPOINTMENT.ApptDate`?

- A. Finding an owner by email
- B. Listing today's appointments
- C. Counting total pets in the database
- D. Updating a service description

### Step 3 — Build a service charge audit trail

**Do.** Create a `SERVICE_CHARGE_AUDIT` table with columns: AuditID (AutoNumber PK), ServiceID, OldCharge, NewCharge, ChangedAt (date/time), ChangedBy (user). In SQLite, write a trigger that fires on UPDATE to `SERVICE.DefaultCharge` and logs the old and new values. In Access, describe how you would use a data macro or form-level VBA to achieve the same result.

**Check 5.** *(Short answer)* What SQL command creates a trigger in SQLite?
**Check 6.** *(Multiple choice)* Why is an audit trail important for service charges?

- A. It makes queries run faster
- B. It records who changed what and when — essential for billing disputes and accountability
- C. It prevents duplicate service names
- D. It automatically backs up the database

### Step 4 — Protect updates with transactions

**Do.** Write a transaction that increases all service charges by 5%, verifies the result, and either commits or rolls back. Include the verify-before and verify-after SELECT statements.

**Check 7.** *(Short answer)* What keyword undoes all changes in a transaction?
**Check 8.** *(Multiple choice)* When should you use ROLLBACK instead of COMMIT?

- A. When the update completed successfully
- B. When the verify-after query shows unexpected or wrong values
- C. When you want to save the changes permanently
- D. ROLLBACK and COMMIT do the same thing

### Step 5 — Build a vet utilization trend view

**Do.** Create a view `VET_UTILIZATION_TREND` that shows each vet's monthly appointment count. In SQLite, add a window function that computes a 3-month moving average alongside each month's count.

**Check 9.** *(Short answer)* Which window function computes an average over a sliding window of rows?

---

## Submission

Submit `Lab13-PetVax-Hardening-LastName.sql` containing constraints, indexes, audit table, transaction, and utilization view — each labeled with a comment header.

Final grade = quiz score (9 questions) + AI-graded artifact.
