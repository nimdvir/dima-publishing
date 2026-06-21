---
section: "Lab Questions"
lab: "Lab 15"
title: "Strategic Analysis of PetVax"
date: "2026-06-21"
---

# Lab 15: Strategic Analysis of PetVax

![Lab banner](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/lab_jpifze?_a=BAMAAAiu0)

*Use advanced SQL and strategic thinking to answer high-level business questions about the PetVax clinic — trends, quality, early warning, scenario testing, and retention.*

## Overview

This lab moves from operational reporting to strategic analysis. You will write SQL queries that do not just describe what happened, but help the clinic manager decide what to do next. You will analyze visit volume trends, assess service profitability, flag follow-up compliance gaps, simulate a price increase scenario, and segment clients by value.

- Chapter: Chapter 15 — Business Strategy and Information Systems.
- Estimated time: ~75 minutes.
- Tool: Microsoft Access SQL View (primary); SQLite for window functions.

## Scenario

The PetVax owner is considering expanding to a second location. Before making that decision, she needs data-driven answers: Are visit volumes trending up or down? Which services are most profitable? Are clients returning or churning? If we raise prices 10%, what changes? Which clients are most valuable?

## Required Files and Tools

| Item            | Detail                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------- |
| Tool            | Microsoft Access SQL View; SQLite for window functions                                    |
| Submission file | `Lab15-PetVax-Strategy-LastName.pdf` — SQL queries, results, and strategic interpretation |
| Where to submit | Upload your PDF to the Lab 15 dropbox                                                     |

## Steps

### Step 1 — Trend analysis: visit volume over time

**Do.** Compute monthly appointment counts for the last 12 months. In SQLite, add a 3-month moving average using a window function.

**Check 1.** *(Short answer)* What window function computes a moving average?
**Check 2.** *(Multiple choice)* A 3-month moving average smooths out which kind of variation?

- A. Seasonal patterns
- B. Month-to-month random fluctuation
- C. Data entry errors
- D. Primary key collisions

### Step 2 — Service profitability

**Do.** Calculate total revenue and appointment count per service type. Rank services by revenue. Identify the highest-margin and lowest-margin services. Recommend which services to promote and which may need price adjustment.

**Check 3.** *(Short answer)* Which service generates the highest total revenue in your data?

### Step 3 — Early warning: follow-up compliance

**Do.** Find pets overdue for follow-up: last visit more than 6 months ago. Calculate the potential lost revenue if each missed follow-up represents a $75 visit. Flag pets for a reminder campaign.

**Check 4.** *(Multiple choice)* Which type of clinic decision does this query support?

- A. Hiring new veterinarians
- B. Running a reminder campaign to bring pets back
- C. Changing the clinic's hours
- D. Buying new equipment

### Step 4 — Scenario testing: price increase impact

**Do.** Simulate a 10% increase in all service charges. Calculate how annual revenue would change based on the last 12 months of historical data. Write a short paragraph explaining the assumptions and limitations of this simulation.

**Check 5.** *(Short answer)* If you raise all service charges by 10% and appointment volume stays the same, by what percentage does annual revenue increase?

### Step 5 — Client retention and segmentation

**Do.** Segment clients into three tiers: High-value (top 20% by total revenue), Regular (middle 60%), and Lapsed (no visits in 6+ months). Calculate the count and percentage of clients in each tier.

**Check 6.** *(Short answer)* What percentage of PetVax clients fall into the Lapsed category?
**Check 7.** *(Multi-select)* Which strategic actions follow from client segmentation? Select all that apply.

- A. Send win-back offers to Lapsed clients
- B. Create a loyalty program for High-value clients
- C. Fire all Regular clients
- D. Investigate why clients are churning

### Step 6 — Strategic interpretation

**Do.** Choose your most important finding from Steps 1–5. Write one paragraph explaining what the data shows and one paragraph recommending what the clinic should do. Write for the clinic owner — plain language, no SQL jargon.

**Check 8.** *(Short answer)* In one sentence, what is your top strategic recommendation for PetVax?

---

## Submission

Submit `Lab15-PetVax-Strategy-LastName.pdf` containing all SQL queries with results and strategic interpretations.

Final grade = quiz score (8 questions) + AI-graded artifact.
