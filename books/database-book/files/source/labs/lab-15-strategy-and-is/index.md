<!-- metadata: date="2026-06-21" -->

# Lab 15: PetVax Strategic Analysis — From Data to Competitive Advantage

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center"><em>Apply Porter's Five Forces, the value chain, and strategic IS alignment frameworks to PetVax — show how the database you built supports competitive advantage.</em></p>

# Overview

This lab is different from the ones before it. Labs 01 through 14 asked you to build, query, design, administer, analyze, and visualize data. Lab 15 asks you to step back and think strategically: **Does the information system we built actually help PetVax compete?**

Chapter 15 connects technical database skills to business strategy: competitive advantage, Porter's Five Forces, the value chain, the Resource-Based View, and strategic IS alignment. In this lab, you apply those frameworks to the PetVax clinic — the same business you have been modeling across 14 labs.

**This lab has two graded parts:**

1. **Quiz part** — auto-gradable check questions.
2. **File submission part** — a Strategic IS Analysis document.

**Estimated time:** 50–65 minutes.

> ⚠️ **Missing-file rule:** If the Strategic Analysis document is missing, you receive zero for the file-submission part.

# Scenario

PetVax operates three locations in a competitive veterinary market. Two national chains have opened clinics within five miles. A telemedicine startup is offering virtual vet consultations at half the price of an in-person visit. PetVax's practice manager is worried.

But PetVax has something the chains and the startup do not: **three years of clean, normalized, well-queried operational data** — the database you helped build across this course.

Your job in this lab is to answer one question: **Can PetVax's information system become a source of competitive advantage?**

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part 1: Porter's Five Forces Analysis

Apply Porter's Five Forces to PetVax. For each force, rate the threat level (High / Medium / Low) and explain how PetVax's database and information system could reduce that threat.

| Force | Threat Level | How PetVax's IS Reduces This Threat |
|-------|-------------|--------------------------------------|
| Rivalry among existing competitors | | |
| Threat of new entrants | | |
| Threat of substitute products/services | | |
| Bargaining power of buyers (pet owners) | | |
| Bargaining power of suppliers | | |

> **Check Question 1:** Which force do you think PetVax's database most effectively counters? (You will identify this in the quiz.)

# Part 2: Value Chain Analysis

Porter's value chain divides business activities into primary and support activities. For PetVax, identify at least two primary activities and two support activities where the database directly improves performance.

| Activity Type | Activity | How the Database Improves It |
|--------------|----------|------------------------------|
| Primary | | |
| Primary | | |
| Support | | |
| Support | | |

> **Check Question 2:** Which primary activity benefits most from the VISIT_TREATMENT table's ability to track which treatments were performed and what they cost?

# Part 3: Resource-Based View (RBV)

The RBV asks whether a resource is Valuable, Rare, Inimitable, and Non-substitutable (VRIN). Apply this to PetVax's database.

| Criterion | Does PetVax's Database Meet It? (Yes/No) | Evidence |
|-----------|------------------------------------------|----------|
| Valuable — Does it help the clinic perform better? | | |
| Rare — Do competitors have something similar? | | |
| Inimitable — Is it hard for competitors to copy? | | |
| Non-substitutable — Is there no easy substitute? | | |

Based on your analysis: is PetVax's database a source of **sustained** competitive advantage, **temporary** competitive advantage, or **competitive parity**? Explain in 2-3 sentences.

> **Check Question 3:** Based on the RBV, which VRIN criterion is PetVax's database WEAKEST on? (Multiple choice.)

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

# Part 4: Strategic Recommendation

Write a one-paragraph strategic recommendation for the PetVax practice manager. Your recommendation must:

1. Name one specific competitive threat
2. Name one specific capability of the PetVax database
3. Explain how the database capability can counter the threat
4. Suggest one concrete action the manager should take

Use this template:

> PetVax's main competitive threat is **[name the threat]**. However, the PetVax database can **[name the capability]**. By **[specific action]**, the clinic can **[expected outcome]**.

> **Check Question 4:** Your recommendation names one specific database capability. Which PetVax table is central to that capability? (Multiple choice.)

# Lab Quiz

## Question 1 — Strongest Force (Multiple Choice)

Which of Porter's Five Forces does PetVax's database most effectively counter?

- A. Rivalry among existing competitors
- B. Threat of new entrants
- C. Threat of substitute products
- D. Bargaining power of buyers

## Question 2 — Value Chain (Multiple Choice)

Which primary value chain activity benefits most from tracking treatment costs in VISIT_TREATMENT?

- A. Inbound logistics
- B. Operations (service delivery)
- C. Marketing and sales
- D. After-sales service

## Question 3 — Weakest VRIN (Multiple Choice)

Based on your RBV analysis, which VRIN criterion is PetVax's database weakest on?

- A. Valuable
- B. Rare
- C. Inimitable (hard to copy)
- D. Non-substitutable

## Question 4 — Central Table (Multiple Choice)

Which PetVax table is central to the capability you named in your strategic recommendation?

- A. OWNER
- B. PET
- C. VISIT
- D. VISIT_TREATMENT
- E. VET

## Question 5 — Competitive Advantage Type (Multiple Choice)

Based on your full analysis, PetVax's database most likely provides:

- A. Sustained competitive advantage (meets all VRIN criteria)
- B. Temporary competitive advantage (meets some VRIN criteria)
- C. Competitive parity (meets few or no VRIN criteria)
- D. Competitive disadvantage

## Question 6 — Information System vs. Strategy (True/False)

A good database alone is enough to guarantee competitive advantage.

- True
- False

# Submission

Submit one file: `lab-15-petvax-strategic-analysis.pdf`

Your Strategic IS Analysis must include all four parts:

1. Porter's Five Forces table (all 5 forces with threat levels and IS responses)
2. Value Chain analysis (2 primary + 2 support activities with database connections)
3. Resource-Based View analysis (all 4 VRIN criteria with evidence)
4. Strategic recommendation paragraph (threat + capability + action + outcome)

> ⚠️ If the Strategic Analysis is missing, you receive zero for the file-submission part.

# Lab 15 Completion Checklist

- [ ] Part 1: All 5 forces analyzed with IS-specific responses
- [ ] Part 2: At least 2 primary and 2 support activities identified
- [ ] Part 3: All 4 VRIN criteria evaluated with evidence, competitive advantage type stated
- [ ] Part 4: Recommendation names a specific threat, capability, action, and outcome
- [ ] Quiz answers are consistent with your analysis
- [ ] Single PDF uploaded
