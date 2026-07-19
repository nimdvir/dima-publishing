---
section: "Lab Questions"
lab: "Lab 12"
title: "Business Intelligence for PetVax"
date: "2026-06-21"
---

# Lab 12: Business Intelligence for PetVax

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

*Build a Business Intelligence layer on the PetVax database — define KPIs, write analytical queries, create reusable views, and present findings as a management brief.*

## Overview

An operational database records transactions. A BI layer helps managers understand what those transactions mean. In this lab you move from CRUD operations to analytical thinking: you define KPIs for the clinic, build SQL queries that calculate them, create a core analytical view, produce three management reports, and translate one report into plain-language recommendations for the clinic manager.

- Chapter: Chapter 12 — Business Intelligence.
- Builds on: [ch12-lets-build-2026-06-19.md](../../ch12-business-intelligence/lets-build/ch12-lets-build-2026-06-19.md).
- Estimated time: ~75 minutes.
- Tool: Microsoft Access SQL View.

## Scenario

The PetVax practice manager wants to stop guessing and start measuring. She needs answers to questions like: Which services generate the most revenue? Which vets are busiest? Are clients coming back? Which pets are overdue for follow-up care?

You will build the SQL queries that turn the operational PetVax database into a decision-support system.

## Required Files and Tools

| Item            | Detail                                                                  |
| --------------- | ----------------------------------------------------------------------- |
| Tool            | Microsoft Access SQL View                                               |
| Submission file | `Lab12-PetVax-BI-LastName.pdf` — queries, results, and management brief |
| Where to submit | Upload your PDF to the Lab 12 dropbox                                   |

## Steps

### Step 1 — Define BI questions and KPIs

**Do.** Write down five business questions the clinic manager needs answered. Then define a measurable KPI for each.

**Check 1.** *(Multi-select)* Which of the following are suitable BI questions for PetVax? Select all that apply.

- A. Which services generate the most revenue?
- B. What is Dr. Smith's license number?
- C. Which vets see the most patients per month?
- D. What is the client retention rate?
- E. Which pets are overdue for follow-up?

**Check 2.** *(Matching)* Match each KPI to its business question.

| KPI                       | Business Question                                          |
| ------------------------- | ---------------------------------------------------------- |
| Average revenue per visit | How much does the clinic earn per appointment?             |
| Vaccine compliance rate   | What percentage of pets are up to date on vaccinations?    |
| Client retention rate     | What percentage of clients return after their first visit? |
| Appointment no-show rate  | What percentage of scheduled appointments are missed?      |

### Step 2 — Build a core analytical view

**Do.** Create a view called `CLINIC_BI` that combines key facts from multiple tables into one analytical structure. Include: Owner name, Pet name, Species, Vet name, Appointment date, Service name, Service charge, Invoice total, Payment status. Save it in Access as a named query.

**Check 3.** *(Short answer)* How many tables did your `CLINIC_BI` view JOIN together?
**Check 4.** *(Multiple choice)* Why create a BI view instead of querying base tables directly?

- A. Views are required for all BI work
- B. A view encapsulates complex joins once and can be reused for multiple reports
- C. Views automatically update when base tables change structure
- D. Views are faster than tables

### Step 3 — Build three BI reports

**Do.** Write three analytical queries:

**Report 1 — Revenue by Service:** GROUP BY service name, SUM of charges, COUNT of times performed, and average charge. Order by total revenue descending.

**Report 2 — Vet Performance:** COUNT of appointments per vet, total revenue per vet, average revenue per appointment. Include vets with zero appointments using a LEFT JOIN.

**Report 3 — Client Health:** COUNT of visits per owner, date of last visit, and a CASE-based status column: Active (visit in last 6 months), Lapsed (6–12 months), Inactive (>12 months).

**Check 5.** *(Short answer)* In Report 1, which SQL clause groups rows by service name?
**Check 6.** *(Short answer)* In Report 2, which JOIN type ensures vets with zero appointments still appear?

### Step 4 — Find at-risk pets

**Do.** Write a query that identifies pets overdue for follow-up: last appointment was more than 6 months ago, OR the pet has never received a vaccination service. Use LEFT JOIN and IS NULL patterns.

**Check 7.** *(Multiple choice)* Which SQL pattern finds pets with no vaccination record?

- A. `INNER JOIN ... WHERE ServiceName = 'Vaccination'`
- B. `LEFT JOIN ... WHERE right_table.ID IS NULL`
- C. `CROSS JOIN ... WHERE ServiceName IS NULL`
- D. `RIGHT JOIN ... WHERE PetID IS NOT NULL`

### Step 5 — Write a management brief

**Do.** Choose ONE of your three reports from Step 3. Write a half-page management brief in plain language. Answer: What does the data show? Why does it matter? What should the clinic do next? Write for someone who does not know SQL.

**Check 8.** *(Short answer)* In one sentence, what is the most important finding from your chosen report?

---

## Submission

Submit `Lab12-PetVax-BI-LastName.pdf` containing all five steps: KPI definitions, BI view code, three report queries with results, at-risk pet query with results, and management brief.

Final grade = quiz score (8 questions) + AI-graded artifact.

## Optional Extensions

- Add a fourth report: Monthly Revenue Trend using GROUP BY on appointment month.
- Create a query that ranks clients by lifetime value (total revenue per owner).
