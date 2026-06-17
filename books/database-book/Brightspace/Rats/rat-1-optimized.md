# RAT 1 — Top Questions (Optimized)

**Source:** Chapter 1 — Introduction to the Textbook
**Date:** 2026-06-17
**Total:** 10 questions (2 multi-select + 8 multiple-choice)
**Bloom distribution:** 1 Understand, 3 Apply, 3 Analyze, 3 Evaluate
**Selection criteria:** Higher Bloom levels (Apply, Analyze, Evaluate), scenario-based reasoning, AI-resistance, and broad coverage of chapter themes.
**CSV file:** `rat-1-optimized.csv`

---

<div style="background: #F0FDFA; border-left: 4px solid #0F766E; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0;">
  <p style="margin: 0 0 8px 0; font-size: 1.05em; color: #18181B;">
    This <strong>Reading Assessment Test (RAT)</strong> is based on
    <strong style="color: #0F766E;">Chapter 1: Introduction to the Textbook</strong>
    in the course textbook,
    <a href="https://data-pilot.dimapublishing.com/" style="color: #0E7490; font-weight: 600; text-decoration: none;">
      <strong>Using Data to Drive Business Performance</strong>
    </a>.
  </p>
  <p style="margin: 0; font-size: 0.95em; color: #18181B;">
    Make sure you complete reading the chapter and then answer the questions here:
    <a href="https://data-pilot.dimapublishing.com/book/ch01/introduction/1" style="color: #4F46E5; font-weight: 600; text-decoration: none;">
      Chapter 1 — Introduction to the Textbook →
    </a>
  </p>
</div>

---

## Multi-Select Questions

**Q1. Core Competencies for Workplace Data Reasoning**

*Short description: Workplace competencies*

An employer asks an entry-level analyst to question a number in a weekly report. Which Chapter 1 competencies most directly support doing this well?

Select ALL that apply.

A. Data integrity and system quality  ← ✓ CORRECT
*Feedback: Correct — data integrity and system quality helps judge whether the number is reliable.*

B. Cloud network engineering
*Feedback: Incorrect — cloud network engineering is not one of the five core competencies named in Chapter 1.*

C. Performance-oriented analysis  ← ✓ CORRECT
*Feedback: Correct — performance-oriented analysis is directly about interpreting reports and metrics.*

D. Strategic problem solving  ← ✓ CORRECT
*Feedback: Correct — strategic problem solving connects technical reasoning to recommended action.*

E. Foundational information literacy  ← ✓ CORRECT
*Feedback: Correct — foundational information literacy supports reasoning about how data supports decisions.*

**Hint:** Think about which competencies Chapter 1 names and which one is a distractor not in the list.

**Explanation:** The five core competencies support workplace data reasoning: performance-oriented analysis helps interpret metrics, data integrity and system quality helps judge trustworthiness, foundational information literacy explains how data supports decisions, and strategic problem solving connects evidence to recommendations. Cloud network engineering is not a Chapter 1 competency.

**Points:** 2 | **Difficulty:** 5/5 | **ID:** BITM330-RAT1-Q1 | **Bloom:** Evaluate

---

**Q2. Consequences of Poor Database Design**

*Short description: Design consequences*

Select ALL that apply: Which consequences of a poorly designed database are described in Chapter 1?

A. Missing information  ← ✓ CORRECT
*Feedback: Correct — missing information is named as a consequence of poor database design.*

B. Faster query performance
*Feedback: Incorrect — faster query performance is NOT a consequence of poor design; poor design slows things down.*

C. Duplicate records  ← ✓ CORRECT
*Feedback: Correct — duplicate records are named as a consequence of poor database design.*

D. Confusing dashboards  ← ✓ CORRECT
*Feedback: Correct — confusing dashboards are named as a consequence of poor database design.*

E. Inconsistent reports  ← ✓ CORRECT
*Feedback: Correct — inconsistent reports are named as a consequence of poor database design.*

**Hint:** Chapter 1 lists four specific consequences — one option is the opposite of what poor design causes.

**Explanation:** In "Why Databases Matter for Business Performance," the chapter says a poorly designed database can create duplicate records, inconsistent reports, missing information, and confusing dashboards. Faster query performance is not a consequence of poor design.

**Points:** 2 | **Difficulty:** 4/5 | **ID:** BITM330-RAT1-Q2 | **Bloom:** Analyze

---

## Multiple-Choice Questions

**Q3. Coffee Shop — Root Cause of Data Problems**

*Short description: Data structure roots*

In the chapter's coffee shop example, which of the following is the root reason the owner cannot determine which supplier problems affect daily sales?

A. The shop does not use Power BI
*Feedback: Incorrect — Power BI would not fix disconnected source data; the problem is upstream.*

B. The owner does not know SQL
*Feedback: Incorrect — SQL skill matters later, but the root issue is disconnected data structure.*

C. The data is stored across disconnected spreadsheets with inconsistent identifiers, so the records cannot be linked  ← ✓ CORRECT
*Feedback: Correct — this is the chapter's root-cause explanation: inconsistent names across separate spreadsheets make linked business questions hard to answer.*

D. The owner has not enrolled in BITM330
*Feedback: Incorrect — this is a humorous distractor unrelated to the data problem.*

**Hint:** Focus on the data structure problem, not the tools or skills gap.

**Explanation:** In "Why Databases Matter for Business Performance," the chapter says sales, inventory, suppliers, and menu items tracked in separate spreadsheets with inconsistent names make business questions hard to answer. SQL skill and tools matter later, but the root issue is disconnected structure.

**Points:** 1 | **Difficulty:** 4/5 | **ID:** BITM330-RAT1-Q3 | **Bloom:** Analyze

---

**Q4. Dashboard Tool vs. Source-Table Redesign**

*Short description: Structure first*

A manager must choose where to invest first: a new dashboarding tool or a redesign of inconsistent source tables. Using Chapter 1's logic, which choice is better justified?

A. The source-table redesign, because trustworthy analytics depend on structured, reliable data  ← ✓ CORRECT
*Feedback: Correct — the chapter argues structure shapes what organizations can trust, report, and improve; reliable source tables come before trustworthy dashboards.*

B. Either choice is equally valid
*Feedback: Incorrect — the chapter does not treat the two choices as equally strong.*

C. The dashboarding tool, because BigQuery is mentioned in the chapter
*Feedback: Incorrect — mentioning BigQuery does not justify dashboard-first investment.*

D. The dashboarding tool, because managers want visuals
*Feedback: Incorrect — visuals do not fix unreliable inputs.*

**Hint:** Think about the chapter's sequence: which comes first — structure or analytics?

**Explanation:** In "Why Databases Matter for Business Performance," the chapter argues that structure shapes what organizations can trust, report, and improve, so reliable source tables come before trustworthy dashboards.

**Points:** 1 | **Difficulty:** 5/5 | **ID:** BITM330-RAT1-Q4 | **Bloom:** Evaluate

---

**Q5. Systems Thinking — Tracing Problems Through the Arc**

*Short description: Systems thinking*

Two analysts must explain a misleading metric to leadership. Analyst A blames the dashboarding tool. Analyst B traces the issue back through queries, tables, relationships, and capture. Which response better reflects Chapter 1's framing of systems thinking?

A. Analyst A, because tools drive performance
*Feedback: Incorrect — the chapter says tools are part of a workflow, not the whole cause of performance.*

B. Analyst B, because systems thinking traces problems through the data-to-decisions arc  ← ✓ CORRECT
*Feedback: Correct — Chapter 1 defines systems thinking as seeing how data, structure, analysis, and decisions work together.*

C. Both are equally defensible
*Feedback: Incorrect — the two responses are not equally aligned with Chapter 1.*

D. Analyst A, because the dashboard is what leadership sees
*Feedback: Incorrect — the dashboard is visible, but Chapter 1 asks students to look at the system behind it.*

**Hint:** Systems thinking means looking at the whole chain, not just the most visible part.

**Explanation:** Chapter 1 defines systems thinking as seeing how data, structure, analysis, and decisions work together. Analyst B traces the issue through the data-to-decisions arc rather than stopping at the visible dashboard.

**Points:** 1 | **Difficulty:** 5/5 | **ID:** BITM330-RAT1-Q5 | **Bloom:** Evaluate

---

**Q6. SQL Pattern — Business Question First**

*Short description: Business question first*

A new analyst is asked to pull the customers who churned last quarter. Applying Chapter 1's SQL Pattern callout, what should the analyst do first?

A. Write the business question in plain English before writing the query  ← ✓ CORRECT
*Feedback: Correct — the SQL Pattern callout says to state the business question clearly before writing any SQL.*

B. Export every table to a spreadsheet
*Feedback: Incorrect — exporting tables skips the question-framing step that the chapter emphasizes.*

C. Open Power BI and build a dashboard
*Feedback: Incorrect — a dashboard comes after clarifying the question and retrieving data.*

D. Email the manager for a list of churned customers
*Feedback: Incorrect — asking for a list avoids doing the analytical work yourself.*

**Hint:** What does the SQL Pattern callout say should happen before any code is written?

**Explanation:** The SQL Pattern callout says to write the business question in plain English before writing the query. A dashboard or spreadsheet comes after clarifying the question and retrieving data.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT1-Q6 | **Bloom:** Apply

---

**Q7. Clinic Missed Appointments — Arc Stage**

*Short description: Arc stage mapping*

A clinic wants to reduce missed appointments. Using the chapter's data-to-decisions arc, which stage turns reliable appointment records into a missed-appointment rate by weekday?

A. Relationships
*Feedback: Incorrect — relationships enable the query but are not the metric-producing stage.*

B. Data
*Feedback: Incorrect — raw data contains appointment facts but not the summarized rate.*

C. Tables
*Feedback: Incorrect — tables organize records but do not produce the rate by themselves.*

D. Queries feeding analytics  ← ✓ CORRECT
*Feedback: Correct — queries and analytics produce the metric (missed-appointment rate by weekday) the manager can act on.*

**Hint:** Which stage actually computes the metric from organized records?

**Explanation:** In "The Big Idea," the veterinary clinic example shows structured appointment records being queried and analyzed to produce patterns such as no-show rates. Raw data and tables organize records, but queries and analytics produce the metric the manager can act on.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT1-Q7 | **Bloom:** Apply

---

**Q8. Hospital Inconsistent IDs — Downstream Cascade**

*Short description: Capture cascade*

Chapter 1 says decisions depend on whether data is captured, structured, retrieved, and interpreted responsibly. If a hospital captures patient IDs inconsistently, which downstream step is most directly weakened first?

A. Capture, because the form will reject entries
*Feedback: Incorrect — capture is the upstream cause, not the downstream step weakened first.*

B. Interpretation, because dashboards will look odd
*Feedback: Incorrect — interpretation may suffer later, but the first downstream weakness is linking and retrieval.*

C. Structure and retrieval, because the same patient cannot be reliably linked across tables  ← ✓ CORRECT
*Feedback: Correct — inconsistent IDs make it impossible to reliably connect records, so structure and retrieval are weakened first.*

D. Decisions, because managers will refuse to act
*Feedback: Incorrect — decisions are affected later in the arc, after retrieval fails.*

**Hint:** Trace the arc step by step: capture → ? → ? — which breaks immediately after capture?

**Explanation:** The chapter's hospital example and data-to-decisions logic imply that inconsistent capture first harms structure and retrieval because records cannot be reliably connected. Interpretation and decisions may suffer later, but the first downstream weakness is linking and retrieval.

**Points:** 1 | **Difficulty:** 4/5 | **ID:** BITM330-RAT1-Q8 | **Bloom:** Analyze

---

**Q9. Purpose of Bloom's Taxonomy in the Book**

*Short description: Bloom's purpose*

According to Chapter 1, what is the main purpose of including Bloom's Taxonomy in the book's design?

A. To rank students by ability
*Feedback: Incorrect — Bloom's Taxonomy is not used to rank students by ability in this book.*

B. To move students from recognizing terms to building things with them  ← ✓ CORRECT
*Feedback: Correct — this closely paraphrases the chapter's stated purpose for including Bloom's Taxonomy.*

C. To replace traditional letter grades
*Feedback: Incorrect — Bloom's Taxonomy does not replace letter grades.*

D. To match reading quizzes to lab assignments
*Feedback: Incorrect — the purpose is broader than matching quizzes to labs.*

**Hint:** Think about progression: what does Bloom's Taxonomy help students do as they work through the chapter?

**Explanation:** In "Bloom's Taxonomy in Practice," the chapter says the goal is to move students from recognizing terms to building things with them — from Remember through Create.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT1-Q9 | **Bloom:** Understand

---

**Q10. Growth Mindset — Errors as Clues**

*Short description: Errors as clues*

A student claims, "Errors and failed queries mean I am not cut out for this course." Based on Chapter 1, which response is best justified?

A. Disagree; the chapter says errors do not occur in well-designed databases
*Feedback: Incorrect — the chapter does not claim errors disappear; good design reduces some problems, not all.*

B. Agree; database work requires natural talent
*Feedback: Incorrect — this contradicts the chapter's supportive framing that learning is about practice, not innate talent.*

C. Disagree; the chapter frames errors as clues and resilient problem solving as a success habit  ← ✓ CORRECT
*Feedback: Correct — the chapter says errors and failed queries are part of learning and should be treated as clues, not signs of failure.*

D. Agree; the chapter says students should avoid mistakes
*Feedback: Incorrect — the chapter does not say students should avoid all mistakes; it encourages learning from them.*

**Hint:** How does Chapter 1 frame mistakes — as failures or as learning opportunities?

**Explanation:** In "How to Succeed in This Course," the chapter says errors, failed queries, and revisions are part of learning and should be treated as clues, not signs that students cannot do the course.

**Points:** 1 | **Difficulty:** 5/5 | **ID:** BITM330-RAT1-Q10 | **Bloom:** Evaluate

---

## Quick-Reference Answer Key

| #   | Type | Correct Answer(s) | Points | Difficulty | Bloom      |
| --- | ---- | ----------------- | ------ | ---------- | ---------- |
| 1   | MS   | A, C, D, E        | 2      | 5          | Evaluate   |
| 2   | MS   | A, C, D, E        | 2      | 4          | Analyze    |
| 3   | MC   | C                 | 1      | 4          | Analyze    |
| 4   | MC   | A                 | 1      | 5          | Evaluate   |
| 5   | MC   | B                 | 1      | 5          | Evaluate   |
| 6   | MC   | A                 | 1      | 3          | Apply      |
| 7   | MC   | D                 | 1      | 3          | Apply      |
| 8   | MC   | C                 | 1      | 4          | Analyze    |
| 9   | MC   | B                 | 1      | 2          | Understand |
| 10  | MC   | C                 | 1      | 5          | Evaluate   |
