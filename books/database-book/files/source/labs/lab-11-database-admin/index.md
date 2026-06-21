<!-- metadata: date="2026-06-21" -->

# Lab 11: Securing and Maintaining the PetVax Database

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center"><em>Move from building databases to protecting them — back up the PetVax database, create users and permissions, and write a maintenance plan the clinic can follow.</em></p>

# Overview

Chapters 1 through 10 taught you to design, build, query, and analyze databases. Chapter 11 teaches you to protect and maintain them. A well-designed database is useless if it crashes, loses data, or exposes patient records to unauthorized users.

In the Let's Build, you practiced backup, restore, user management, and performance monitoring on the Grading Database. In this lab, you apply the same administrative discipline to PetVax.

**This lab has two graded parts:**

1. **Quiz part** — auto-gradable check questions embedded below.
2. **File submission part** — a Database Administration Plan document. An AI grader will review your submitted file.

**Estimated time:** 45–60 minutes.

> ⚠️ **Missing-file rule:** If the DBA Plan is missing, you receive zero for the file-submission part and may receive zero for the entire lab.

# Scenario

PetVax has grown to three locations with six veterinarians. The practice manager just received a worrying email: the front-desk computer crashed last week and the receptionist lost two days of appointment data because no one had set up automatic backups.

You have been asked to create a **Database Administration Plan** for PetVax. Your job is not to write code that runs automatically — it is to produce a written plan that answers the questions any clinic manager should be asking: What is backed up and how often? Who can access what? What happens if the server fails? How do we know the database is performing well?

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part 1: Backup and Recovery Plan

The PetVax database contains owner records, pet medical histories, appointment schedules, treatment logs, and billing data. The clinic cannot afford to lose more than one day of data.

Answer the following in your DBA Plan:

1. **What to back up:** List the specific PetVax tables that contain operational data (at least 5 tables).
2. **Backup frequency:** Recommend a backup schedule (daily, weekly, real-time). Explain why you chose that frequency for a veterinary clinic.
3. **Backup type:** Choose between full backup, differential backup, or transaction log backup. Explain your choice.
4. **Recovery procedure:** Write step-by-step instructions for restoring the database after a server crash. Include how to verify the restore worked.
5. **Off-site storage:** Should backup files be stored somewhere other than the clinic server? Why or why not?

> **Check Question 1:** Which PetVax table would cause the most operational damage if lost — VISIT or TREATMENT? Explain in one sentence. (Your reasoning will be one of the quiz answers.)

# Part 2: User Access and Security Plan

PetVax has four types of database users. For each, define what permissions they should have using the principle of least privilege.

| Role | Needs to Do | Recommended Permission Level |
|------|-------------|-----------------------------|
| Receptionist | View and create appointments, look up pet records | |
| Veterinarian | View full pet history, add treatment notes | |
| Practice Manager | View all data, run reports, but cannot delete records | |
| DBA (you) | Full control — backup, restore, create users, modify schema | |

For each role, specify whether they need SELECT, INSERT, UPDATE, DELETE, or administrative privileges. Use this format:

```sql
-- Example (do not copy — adapt for PetVax):
-- GRANT SELECT, INSERT ON VISIT TO receptionist;
```

> **Check Question 2:** Should the receptionist have DELETE permission on the VISIT table? Why or why not? (True/False quiz question.)

# Part 3: Performance Monitoring

A slow database frustrates staff and loses business. Write a plan for monitoring PetVax database performance.

1. **Slow query identification:** Name two signs that a PetVax query is running too slowly.
2. **Index suggestion:** Which column in the VISIT table should have an index to speed up appointment lookups by date? Explain.
3. **Growth forecast:** The clinic adds about 20 new visits per day. Estimate how many rows the VISIT table will contain after one year. Show your calculation.

> **Check Question 3:** After one year at 20 visits per day, approximately how many rows will the VISIT table contain? (Multiple choice: A. ~3,000 B. ~7,300 C. ~15,000 D. ~30,000)

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Lab Quiz

Answer all questions.

## Question 1 — Backup Impact (Multiple Choice)

Which PetVax table would cause the most operational damage if its data were permanently lost?

- A. OWNER (owner names and contact info)
- B. PET (pet names, species, breeds)
- C. VISIT (appointment dates, times, and vet assignments)
- D. TREATMENT (treatment names and standard fees)

## Question 2 — Receptionist DELETE (True/False)

The receptionist should have DELETE permission on the VISIT table.

- True
- False

## Question 3 — VISIT Growth (Multiple Choice)

At 20 visits per day, approximately how many rows will the VISIT table contain after one year?

- A. ~3,000
- B. ~7,300
- C. ~15,000
- D. ~30,000

## Question 4 — Backup Frequency (Multiple Choice)

For a veterinary clinic that cannot afford to lose more than one day of data, the most appropriate backup frequency is:

- A. Weekly full backup only
- B. Daily full backup
- C. Daily full backup plus transaction log backups every hour
- D. Real-time replication only, no backups

## Question 5 — Least Privilege (Select All That Apply)

Which permissions should a PetVax receptionist have on the OWNER table? Select all that apply.

- A. SELECT (view owner records)
- B. INSERT (add new owners)
- C. UPDATE (edit owner contact information)
- D. DELETE (remove owners from the system)
- E. CREATE TABLE

# Submission

Submit one file: `lab-11-petvax-dba-plan.pdf`

Your DBA Plan must include all three parts:

1. Backup and Recovery Plan (5 items)
2. User Access and Security Plan (4 roles with SQL GRANT statements)
3. Performance Monitoring Plan (3 items with growth calculation)

Label each part clearly. The AI grader will confirm that all sections are complete and that your security recommendations follow the principle of least privilege.

> ⚠️ If the DBA Plan is missing, you receive zero for the file-submission part and may receive zero for the entire lab.

# Lab 11 Completion Checklist

- [ ] Part 1: All 5 backup/recovery items answered with PetVax-specific details
- [ ] Part 2: All 4 roles have permission levels and SQL GRANT statements
- [ ] Part 3: Growth calculation shown with work
- [ ] Quiz answers match the recommendations in your plan
- [ ] File saved as PDF and uploaded to the correct assignment folder
