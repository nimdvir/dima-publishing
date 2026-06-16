# RAT 1 — Top Questions (DeepSeek Curation)

**Source:** Chapter 1 RAT — Introduction to the Textbook
**Date:** 2026-06-13
**Total:** 10 questions (2 multiple-answer + 8 multiple-choice)
**Selection criteria:** Higher Bloom levels (Apply, Analyze, Evaluate), scenario-based reasoning, AI-resistance, and broad coverage of chapter themes.

---

## Multiple-Answer Questions

**1. Select ALL that apply: An employer asks an entry-level analyst to question a number in a weekly report. Which Chapter 1 competencies most directly support doing this well?**

*Short description: Tests your ability to discriminate among the five core competencies and identify which ones apply to real workplace data reasoning.*

A. Data integrity and system quality
B. Cloud network engineering
C. Performance-oriented analysis
D. Strategic problem solving
E. Foundational information literacy

**Correct Answer:** A, C, D, E
**Explanation:** The five core competencies support workplace data reasoning: performance-oriented analysis helps interpret metrics, data integrity and system quality helps judge trustworthiness, foundational information literacy explains how data supports decisions, and strategic problem solving connects evidence to recommendations. Cloud network engineering is not a Chapter 1 competency.

---

**2. Select ALL that apply: Which consequences of a poorly designed database are described in Chapter 1?**

*Short description: Tests your recall of the specific downstream problems that Chapter 1 warns result from bad database structure.*

A. Missing information
B. Faster query performance
C. Duplicate records
D. Confusing dashboards
E. Inconsistent reports

**Correct Answer:** A, C, D, E
**Explanation:** In "Why Databases Matter for Business Performance," the chapter says a poorly designed database can create duplicate records, inconsistent reports, missing information, and confusing dashboards. Faster query performance is not a consequence of poor design.

---

## Multiple-Choice Questions

**3. In the chapter's coffee shop example, which of the following is the root reason the owner cannot determine which supplier problems affect daily sales?**

*Short description: Tests your systems-thinking ability to trace a business problem to its root data-structure cause, not a surface tool gap.*

A. The shop does not use Power BI
B. The owner does not know SQL
C. The data is stored across disconnected spreadsheets with inconsistent identifiers, so the records cannot be linked
D. The owner has not enrolled in BITM330

**Correct Answer:** C
**Explanation:** In "Why Databases Matter for Business Performance," the chapter says disconnected spreadsheets with inconsistent names make it difficult to answer linked business questions. SQL skill and tools matter later, but the root issue is disconnected structure.

---

**4. A manager must choose where to invest first: a new dashboarding tool or a redesign of inconsistent source tables. Using Chapter 1's logic, which choice is better justified?**

*Short description: Tests your ability to apply the chapter's "structure before dashboards" thesis to a realistic managerial trade-off decision.*

A. The source-table redesign, because trustworthy analytics depend on structured, reliable data
B. Either choice is equally valid
C. The dashboarding tool, because BigQuery is mentioned in the chapter
D. The dashboarding tool, because managers want visuals

**Correct Answer:** A
**Explanation:** In "Why Databases Matter for Business Performance," the chapter argues that structure shapes what organizations can trust, report, and improve, so reliable source tables come before trustworthy dashboards.

---

**5. Two analysts must explain a misleading metric to leadership. Analyst A blames the dashboarding tool. Analyst B traces the issue back through queries, tables, relationships, and capture. Which response better reflects Chapter 1's framing of systems thinking?**

*Short description: Tests your understanding of systems thinking — tracing problems through the full data-to-decisions arc rather than stopping at the most visible surface level.*

A. Analyst A, because tools drive performance
B. Analyst B, because systems thinking traces problems through the data-to-decisions arc
C. Both are equally defensible
D. Analyst A, because the dashboard is what leadership sees

**Correct Answer:** B
**Explanation:** Chapter 1 defines systems thinking as seeing how data, structure, analysis, and decisions work together. Analyst B traces the issue through the data-to-decisions arc rather than stopping at the visible dashboard.

---

**6. A new analyst is asked to pull the customers who churned last quarter. Applying Chapter 1's SQL Pattern callout, what should the analyst do first?**

*Short description: Tests your recall of a key practical habit from the chapter — framing the business question before touching any tool or query.*

A. Write the business question in plain English before writing the query
B. Export every table to a spreadsheet
C. Open Power BI and build a dashboard
D. Email the manager for a list of churned customers

**Correct Answer:** A
**Explanation:** The SQL Pattern callout says to write the business question in plain English before writing the query. A dashboard or spreadsheet comes after clarifying the question and retrieving data.

---

**7. A clinic wants to reduce missed appointments. Using the chapter's data-to-decisions arc, which stage turns reliable appointment records into a missed-appointment rate by weekday?**

*Short description: Tests your ability to map a real business task onto the correct stage of the data-to-decisions arc.*

A. Relationships
B. Data
C. Tables
D. Queries feeding analytics

**Correct Answer:** D
**Explanation:** In "The Big Idea," the veterinary clinic example shows structured appointment records being queried and analyzed to produce patterns such as no-show rates. Raw data and tables organize records, but queries and analytics produce the metric the manager can act on.

---

**8. Chapter 1 says decisions depend on whether data is captured, structured, retrieved, and interpreted responsibly. If a hospital captures patient IDs inconsistently, which downstream step is most directly weakened first?**

*Short description: Tests your ability to reason cumulatively through the data-to-decisions arc — identifying which stage breaks first when an upstream step fails.*

A. Capture, because the form will reject entries
B. Interpretation, because dashboards will look odd
C. Structure and retrieval, because the same patient cannot be reliably linked across tables
D. Decisions, because managers will refuse to act

**Correct Answer:** C
**Explanation:** The chapter's hospital example and data-to-decisions logic imply that inconsistent capture first harms structure and retrieval because records cannot be reliably connected. Interpretation and decisions may suffer later, but the first downstream weakness is linking and retrieval.

---

**9. According to Chapter 1, what is the main purpose of including Bloom's Taxonomy in the book's design?**

*Short description: Tests your understanding of the book's pedagogical architecture — why Bloom's levels are built into the chapter structure.*

A. To rank students by ability
B. To move students from recognizing terms to building things with them
C. To replace traditional letter grades
D. To match reading quizzes to lab assignments

**Correct Answer:** B
**Explanation:** In "Bloom's Taxonomy in Practice," the chapter says the goal is to move students from recognizing terms to building things with them — from Remember through Create.

---

**10. A student claims, "Errors and failed queries mean I am not cut out for this course." Based on Chapter 1, which response is best justified?**

*Short description: Tests your recall of the chapter's growth-mindset success habits — the practical, encouraging framing the book gives for technical struggle.*

A. Disagree; the chapter says errors do not occur in well-designed databases
B. Agree; database work requires natural talent
C. Disagree; the chapter frames errors as clues and resilient problem solving as a success habit
D. Agree; the chapter says students should avoid mistakes

**Correct Answer:** C
**Explanation:** In "How to Succeed in This Course," the chapter says errors, failed queries, and revisions are part of learning and should be treated as clues, not signs that students cannot do the course.

---

## Quick-Reference Answer Key

| #   | Type       | Correct Answer(s) | Bloom Level |
| --- | ---------- | ----------------- | ----------- |
| 1   | Select ALL | A, C, D, E        | Evaluate    |
| 2   | Select ALL | A, C, D, E        | Analyze     |
| 3   | MC         | C                 | Analyze     |
| 4   | MC         | A                 | Evaluate    |
| 5   | MC         | B                 | Evaluate    |
| 6   | MC         | A                 | Apply       |
| 7   | MC         | D                 | Apply       |
| 8   | MC         | C                 | Analyze     |
| 9   | MC         | B                 | Understand  |
| 10  | MC         | C                 | Evaluate    |
