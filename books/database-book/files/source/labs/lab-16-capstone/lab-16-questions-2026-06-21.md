---
section: "Lab Questions"
lab: "Lab 16"
title: "Final PetVax Capstone Integration"
date: "2026-06-21"
---

# Lab 16: Final PetVax Capstone Integration

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

*Package the complete PetVax database project — design, build, query, automate, administer, and analyze — into a professional capstone submission.*

## Overview

This is the final hands-on lab. You will deliver a complete, production-ready PetVax clinic database that demonstrates every skill from the full course: ERD design, SQL DDL, operational and analytical queries, macros for automation, DBA documentation, BI reports, and strategic analysis. You are not learning new tools here — you are proving you can integrate everything you have learned into one coherent system.

- Chapter: Chapter 16 — Final Integration.
- Estimated time: ~120 minutes (capstone).
- Tool: Microsoft Access (primary), Lucidchart, SQL, PDF editor.

## Scenario

The PetVax owner is reviewing your work before signing off on the database project. She needs to see the full picture: the design, the working database, the queries that answer business questions, the automation that saves staff time, the admin practices that keep data safe, and the analytics that support strategic decisions.

## Required Files and Tools

| Item              | Detail                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------------- |
| Submission file 1 | `Lab16-PetVax-Capstone-LastName.accdb` — working Access database                                    |
| Submission file 2 | `Lab16-PetVax-Capstone-LastName.pdf` — portfolio with ERD, SQL, results, screenshots, documentation |
| Where to submit   | Upload both files to the Lab 16 dropbox                                                             |

## Steps

### Part A — Design and implement the full schema

**Do.** Your `.accdb` must contain at least 7 tables: OWNER, PET, VETERINARIAN, APPOINTMENT, SERVICE, APPOINTMENT_SERVICE, INVOICE. All tables must have primary keys, foreign keys with enforced referential integrity, appropriate data types, and CHECK constraints where applicable. Tables must be populated with realistic sample data (at least 5 owners, 8 pets, 3 vets, 15 appointments).

**Check 1.** *(Short answer)* How many tables are in your submitted database?
**Check 2.** *(Short answer)* How many relationships have referential integrity enforced?

### Part B — Write 10 required queries

**Do.** Write and save these named queries in your Access database:

1. Today's Appointment Schedule (owner, pet, vet, time, reason)
2. Pets Due for Vaccination (pets with no vaccination service in last 12 months)
3. Outstanding Invoices (TotalAmount > 0, PaidDate IS NULL)
4. Revenue by Service Type (GROUP BY with SUM and COUNT)
5. Vet Utilization Rate (appointments per vet, compare to available slots)
6. Client Visit Frequency (visits per owner, identify gaps > 6 months)
7. Weighted Revenue per Vet (total revenue / appointment count)
8. Vaccine Compliance Rate (vaccinated pets / total pets)
9. Top 5 Clients by Revenue (owners ranked by total invoice amount)
10. Monthly Revenue Trend (GROUP BY month, last 12 months)

**Check 3.** *(Short answer)* In Query 3, which condition identifies unpaid invoices?
**Check 4.** *(Short answer)* In Query 10, which SQL clause groups rows by month?

### Part C — Create 2 macros

**Do.** Create at least two macros: one that automates a routine task (e.g., generating today's appointment list) and one that automates a report (e.g., monthly revenue summary). Include screenshots and descriptions in your PDF.

**Check 5.** *(Multiple choice)* What is the purpose of macros in an Access database?

- A. To replace SQL queries
- B. To automate repetitive tasks and reduce manual steps
- C. To create new tables automatically
- D. To replace the need for primary keys

### Part D — Document 3 admin practices

**Do.** Write one paragraph each explaining how you would apply these three DBA practices to the PetVax database: security roles, backup strategy, and integrity checks. Be specific — name the tables, the roles, the backup frequency.

**Check 6.** *(Short answer)* What backup frequency do you recommend for PetVax?

### Part E — Assemble the portfolio PDF

**Do.** Create a PDF containing: ERD diagram (exported from Lucidchart), SQL DDL code as text, all 10 queries with explanations and results, macro screenshots with descriptions, DBA documentation, and a final reflection (2–3 paragraphs on what you learned across the full course arc).

**Check 7.** *(Short answer)* In your final reflection, what is the most important skill you developed across the course?

---

## Submission

Submit two files: `Lab16-PetVax-Capstone-LastName.accdb` and `Lab16-PetVax-Capstone-LastName.pdf`.

> ⚠️ **Missing-file rule:** If either file is missing, you receive zero for the file-submission part.

Final grade = quiz score (7 questions) + AI-graded `.accdb` + AI-graded PDF portfolio.
