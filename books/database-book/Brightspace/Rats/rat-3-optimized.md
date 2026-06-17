# RAT 3 — Top Questions (Optimized)

**Source:** Chapter 3 — Understanding Data Fundamentals (ch03-main-2026-06-16.md)
**Date:** 2026-06-17
**Total:** 10 questions (2 multi-select + 8 multiple-choice)
**Bloom distribution:** 1 Understand, 4 Apply, 4 Analyze, 1 Evaluate
**Selection criteria:** Higher Bloom levels (Apply, Analyze, Evaluate), scenario-based reasoning, AI-resistance, and broad coverage of all major chapter sections.
**CSV file:** `rat-3-optimized.csv`

---

<div style="background: #F0FDFA; border-left: 4px solid #0F766E; padding: 16px 20px; margin: 24px 0; border-radius: 0 6px 6px 0;">
  <p style="margin: 0 0 8px 0; font-size: 1.05em; color: #18181B;">
    This <strong>Reading Assessment Test (RAT)</strong> is based on
    <strong style="color: #0F766E;">Chapter 3: Understanding Data Fundamentals</strong>
    in the course textbook,
    <a href="https://data-pilot.dimapublishing.com/" style="color: #0E7490; font-weight: 600; text-decoration: none;">
      <strong>Using Data to Drive Business Performance</strong>
    </a>.
  </p>
  <p style="margin: 0; font-size: 0.95em; color: #18181B;">
    Make sure you complete reading the chapter and then answer the questions here:
    <a href="https://data-pilot.dimapublishing.com/book/ch03/introduction/1" style="color: #4F46E5; font-weight: 600; text-decoration: none;">
      Chapter 3 — Understanding Data Fundamentals →
    </a>
  </p>
</div>

---

## Multi-Select Questions

**Q1. Modification Anomalies — Flat Grading Sheet**

*Short description: Modification anomalies*

A professor tracks grades in a single flat spreadsheet with these columns: StudentID, StudentName, StudentEmail, DeliverableName, Score, DueDate.

Select ALL that apply.

A. Update anomaly: correcting a student's email requires editing every row where that student appears  ← ✓ CORRECT
*Feedback: Correct — because student info repeats in every grade row, a single change requires multiple edits, risking inconsistency.*

B. Calculation anomaly: the spreadsheet automatically averages scores incorrectly
*Feedback: Incorrect — there is no named anomaly called a calculation anomaly in Chapter 3; the four named anomalies are insertion, update, deletion, and data redundancy.*

C. Insertion anomaly: a new student who has not yet submitted any work cannot be added to the sheet  ← ✓ CORRECT
*Feedback: Correct — without a grade row to attach to, there is no place to record that a student exists — an insertion anomaly.*

D. Deletion anomaly: removing the only grade row for a student also removes the only record that the student exists  ← ✓ CORRECT
*Feedback: Correct — when student and grade data are mixed in one table, deleting a grade row can inadvertently destroy the student record.*

E. Data redundancy: the same student name and email are stored in every grade row for that student  ← ✓ CORRECT
*Feedback: Correct — repeating student attributes across multiple rows is data redundancy, which wastes storage and creates inconsistency risk.*

**Hint:** Chapter 3 names four specific anomaly types. Think about what happens to student data when grade rows are added, changed, or removed.

**Explanation:** Chapter 3 describes four modification anomalies in flat files: insertion anomaly (cannot add one fact without another), update anomaly (changing one value requires editing multiple rows), deletion anomaly (removing one fact accidentally removes another), and data redundancy (same data stored in multiple places). The grading sheet exhibits all four because student and grade themes are mixed in one table.

**Points:** 2 | **Difficulty:** 4/5 | **ID:** BITM330-RAT3-Q1 | **Bloom:** Analyze

---

**Q2. Data Quality Dimensions — Customer Database Problems**

*Short description: Quality dimensions*

A company's customer database has the following issues: (1) several records have email addresses like "john@gnail.com" instead of "john@gmail.com," (2) three different spellings exist for the same company name, (3) 15% of the "LastPurchaseDate" field is blank, and (4) the same customer appears twice with different ID numbers.

Select ALL that apply.

A. The misspelled email addresses are an accuracy problem — the data does not reflect the real-world value  ← ✓ CORRECT
*Feedback: Correct — accuracy means data correctly represents the real-world entity. "gnail.com" is factually wrong.*

B. The multiple spellings of the same company name are a consistency problem — the same entity is represented differently across records  ← ✓ CORRECT
*Feedback: Correct — consistency means the same data is represented the same way everywhere. Three different spellings violate consistency.*

C. The blank LastPurchaseDate fields are a completeness problem — required data is missing  ← ✓ CORRECT
*Feedback: Correct — completeness means all necessary data is present. Missing values in a key field are a completeness failure.*

D. The duplicate customer records are a timeliness problem — the data was not updated quickly enough
*Feedback: Incorrect — duplicates are a uniqueness problem (same entity recorded more than once), not a timeliness problem. Timeliness is about data being current when needed.*

E. The duplicate customer with different IDs is a uniqueness problem — the same real-world entity is recorded more than once  ← ✓ CORRECT
*Feedback: Correct — uniqueness means each real-world entity appears exactly once in the database. Duplicates violate uniqueness.*

**Hint:** Map each issue to a single data quality dimension: accuracy, completeness, consistency, uniqueness, or timeliness.

**Explanation:** Chapter 3 covers five key data quality dimensions: accuracy (data is correct), completeness (no missing values), consistency (same data represented the same way), uniqueness (no duplicates), and timeliness (data is current). The scenario exhibits accuracy (misspelled emails), consistency (different company name spellings), completeness (blank dates), and uniqueness (duplicate records) problems. No timeliness issue is described — duplicates are uniqueness, not timeliness.

**Points:** 2 | **Difficulty:** 4/5 | **ID:** BITM330-RAT3-Q2 | **Bloom:** Analyze

---

## Multiple-Choice Questions

**Q3. Data Hierarchy — Building Blocks**

*Short description: Data hierarchy*

A database stores customer information. A customer's first name "Maria" is stored in a FirstName column, alongside LastName, Email, and Phone columns, all within a Customer record. According to Chapter 3's data hierarchy, what is "Maria" — and what is the group of columns (FirstName, LastName, Email, Phone)?

A. "Maria" is a record; the column group is a file
*Feedback: Incorrect — a record is a complete set of fields for one entity, not a single value.*

B. "Maria" is a field value; the column group is a record  ← ✓ CORRECT
*Feedback: Correct — a field (or column) holds a single piece of data. A record (or row) is the complete set of fields describing one entity — in this case, one customer.*

C. "Maria" is a byte; the column group is a field
*Feedback: Incorrect — a byte is 8 bits and stores one character, not a whole word like "Maria."*

D. "Maria" is a table; the column group is a database
*Feedback: Incorrect — a table is a collection of records; a single value is far below the table level in the hierarchy.*

**Hint:** The data hierarchy: bit → byte → field → record → file/table → database. Where does a single value fit?

**Explanation:** Chapter 3's data hierarchy builds from the smallest unit upward: bit → byte → field (column) → record (row) → file/table → database. A single value like "Maria" is a field value. The complete set of fields for one entity (FirstName + LastName + Email + Phone for one customer) is a record.

**Points:** 1 | **Difficulty:** 2/5 | **ID:** BITM330-RAT3-Q3 | **Bloom:** Understand

---

**Q4. NOIR Measurement Levels — Survey Data Classification**

*Short description: Measurement levels*

A market research survey collects: (1) customer age in years, (2) satisfaction rating on a 1–5 scale, (3) preferred product category from a list of 8 options, and (4) customer ID number. Using Chapter 3's NOIR classification, which measurement level applies to the satisfaction rating (1–5 scale)?

A. Nominal — because the numbers are just labels
*Feedback: Incorrect — nominal data has categories with no meaningful order. A 1–5 scale HAS meaningful order (5 is higher than 1).*

B. Ratio — because the rating has a true zero point
*Feedback: Incorrect — ratio data requires a meaningful zero that represents the absence of the measured quantity. A satisfaction rating of 0 does not mean "no satisfaction" in a defined mathematical sense.*

C. Ordinal — because the numbers represent ordered categories where the distance between values is not necessarily equal  ← ✓ CORRECT
*Feedback: Correct — ordinal data has ordered categories (5 > 4 > 3 > 2 > 1) but the distance between 4 and 5 may not equal the distance between 2 and 3.*

D. Interval — because the scale has equal intervals between values
*Feedback: Incorrect — interval data requires equal distances between values. On a 1–5 satisfaction scale, the psychological distance between "very dissatisfied" (1) and "dissatisfied" (2) may differ from the distance between "satisfied" (4) and "very satisfied" (5).*

**Hint:** Does the 1–5 scale have meaningful order? Equal intervals? A true zero?

**Explanation:** Chapter 3's NOIR classification: Nominal (categories, no order), Ordinal (ordered categories, unequal intervals), Interval (ordered, equal intervals, no true zero), Ratio (ordered, equal intervals, true zero). A 1–5 satisfaction rating is ordinal — the numbers have meaningful order but the intervals between levels are not necessarily equal.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT3-Q4 | **Bloom:** Apply

---

**Q5. Data Type Consequences — Dates as Text**

*Short description: Data type trap*

A clinic stores appointment dates in a spreadsheet column formatted as plain text (e.g., "March 15, 2026"). When the manager tries to count how many appointments occurred in March, the formula returns zero. According to Chapter 3, what is the root cause?

A. The spreadsheet ran out of storage space
*Feedback: Incorrect — storage capacity is unrelated to date-type calculations.*

B. The manager used the wrong formula syntax
*Feedback: Incorrect — the formula is syntactically correct; the problem is the data type it operates on.*

C. Dates stored as text cannot be compared with date logic, so March dates are present but invisible to date-range formulas  ← ✓ CORRECT
*Feedback: Correct — text-stored dates are just character strings. Date functions require actual date-type data to perform comparisons and range checks.*

D. The appointments were never entered in the spreadsheet
*Feedback: Incorrect — the appointments exist as text entries; the problem is the data type, not data absence.*

**Hint:** What is the difference between a text string "March 15, 2026" and a date value March 15, 2026?

**Explanation:** Chapter 3 emphasizes that data types determine what operations are possible. A date stored as text is just a character string — it cannot be compared with date logic, filtered by month, or used in date arithmetic. Choosing the correct data type (DATE instead of TEXT) is essential for reliable analysis.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT3-Q5 | **Bloom:** Apply

---

**Q6. NULL Handling — Missing Grade Scenario**

*Short description: NULL handling*

A grading database has a Scores table where some rows have no value in the Score column because the student has not yet submitted the assignment. The column is defined to allow NULLs. According to Chapter 3, what is the most important consideration when calculating the class average?

A. NULL values are automatically treated as zero, so the average will be lower than the true average
*Feedback: Incorrect — NULL is not zero. NULL means "unknown" or "not applicable." Database systems typically exclude NULLs from aggregate functions, not treat them as zero.*

B. NULL values are excluded from the average calculation, so the average may appear higher than it should if unsubmitted assignments are not accounted for  ← ✓ CORRECT
*Feedback: Correct — most database systems exclude NULLs from AVG() calculations. The average of submitted scores may look fine, but it excludes students who have not submitted, potentially masking a problem.*

C. NULL values cause the average function to return an error, so the calculation cannot be performed
*Feedback: Incorrect — aggregate functions like AVG() typically handle NULLs gracefully by excluding them, not by throwing errors.*

D. NULL values are treated as the column's default value, so the average is calculated as if those students scored the default
*Feedback: Incorrect — NULL is not replaced by a default value in aggregate calculations; it is excluded.*

**Hint:** NULL means "unknown" — how should an unknown value be treated when calculating an average?

**Explanation:** Chapter 3 explains that NULL represents missing or unknown data — it is not zero, not blank, and not a default value. In calculations, NULLs are typically excluded. For a class average, this means the average only reflects students who submitted work, which may give an overly optimistic picture if many students have not submitted.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT3-Q6 | **Bloom:** Apply

---

**Q7. Metadata and Data Dictionaries — Regional Sales Conflict**

*Short description: Data dictionary*

A national retailer discovers that "monthly sales" reports from two regions never match. Investigation reveals that Region A defines OrderDate as the date the customer placed the order, while Region B defines it as the date the order shipped. According to Chapter 3, which tool would have prevented this conflict?

A. A faster database server to process reports more quickly
*Feedback: Incorrect — processing speed does not resolve definitional disagreements about what a field means.*

B. A more advanced analytics dashboard with better visualizations
*Feedback: Incorrect — better visuals do not fix the underlying problem of inconsistent data definitions.*

C. A shared data dictionary that locks in one official definition of OrderDate for the entire organization  ← ✓ CORRECT
*Feedback: Correct — a data dictionary is metadata that defines what each field means, its data type, and business rules. A single shared definition prevents different interpretations of the same term.*

D. Separate databases for each region so conflicts are invisible
*Feedback: Incorrect — hiding the conflict does not resolve it; Chapter 3 advocates for shared, consistent definitions, not isolated silos.*

**Hint:** The problem is about definitions, not technology speed or features. What tool standardizes definitions?

**Explanation:** Chapter 3 introduces metadata as "data about data" and data dictionaries as the tool that documents field names, data types, formats, and business definitions. Without a shared data dictionary, the same term can mean different things in different parts of the organization, making data integration impossible. A single authoritative definition of OrderDate prevents this.

**Points:** 1 | **Difficulty:** 4/5 | **ID:** BITM330-RAT3-Q7 | **Bloom:** Analyze

---

**Q8. Data Governance — Customer Data Access**

*Short description: Governance balance*

A bank's marketing team wants direct access to the customer transaction database to build targeted campaigns. The compliance team objects, citing privacy regulations. According to Chapter 3's data governance principles, what should happen?

A. The marketing team should be given full access because data-driven marketing generates revenue
*Feedback: Incorrect — revenue goals do not override data governance and regulatory obligations.*

B. The compliance team should block all access, and marketing should use only publicly available data
*Feedback: Incorrect — overly restrictive governance can prevent legitimate business use of data.*

C. Data governance should establish policies that define who can access what data, under what conditions, with appropriate controls like data masking or aggregated views  ← ✓ CORRECT
*Feedback: Correct — data governance balances access and protection: defining roles, permissions, and controls so data can be used appropriately while remaining protected.*

D. The IT department should decide case by case based on who asks first
*Feedback: Incorrect — ad-hoc, case-by-case decisions without a governance framework lead to inconsistency and compliance risk.*

**Hint:** Data governance is about establishing policies that balance data utility with data protection — not all-or-nothing access.

**Explanation:** Chapter 3 describes data governance as the framework of policies, roles, and responsibilities for managing data as an organizational asset. Good governance does not mean either "lock everything down" or "open everything up." It means defining who can access what data, for what purposes, with what controls — such as providing aggregated or anonymized data to marketing rather than raw transaction records.

**Points:** 1 | **Difficulty:** 4/5 | **ID:** BITM330-RAT3-Q8 | **Bloom:** Analyze

---

**Q9. Data Lifecycle — Archiving Decision**

*Short description: Data lifecycle*

A company's five-year-old customer order records are rarely accessed but must be retained for legal reasons for two more years. According to Chapter 3's data lifecycle, which stage should these records enter?

A. Creation — because the records still exist
*Feedback: Incorrect — creation is the initial capture/generation stage, not for data that has existed for five years.*

B. Destruction — because the data is old and rarely used
*Feedback: Incorrect — the data still has a legal retention requirement; destruction would violate compliance obligations.*

C. Archival — because the data is infrequently accessed but must be preserved for compliance  ← ✓ CORRECT
*Feedback: Correct — the archival stage is for data that has low active use but must be retained for legal, regulatory, or historical reasons, often moved to lower-cost storage.*

D. Active use — because the data may occasionally be needed
*Feedback: Incorrect — active use is for data regularly accessed in day-to-day operations. "Rarely accessed" data does not belong in active storage.*

**Hint:** Think about the lifecycle stages: is this data being created, actively used, archived for retention, or destroyed?

**Explanation:** Chapter 3's data lifecycle includes creation, active use, archival, and destruction stages. Five-year-old records with a legal retention requirement but low access frequency belong in the archival stage — preserved in lower-cost storage until the retention period expires, at which point they can be securely destroyed.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT3-Q9 | **Bloom:** Apply

---

**Q10. Big Data — Smart City Traffic Sensors**

*Short description: Big Data velocity*

A city installs thousands of traffic sensors that generate real-time vehicle count data every second. The data includes numeric readings, GPS coordinates, and camera images of license plates. Using Chapter 3's three Vs of Big Data, which V is most prominently represented by the every-second streaming sensor readings?

A. Volume — because thousands of sensors produce a large total amount of data
*Feedback: Incorrect — while volume is present, the defining characteristic described ("every second," "real-time," "streaming") points to velocity.*

B. Velocity — because the data arrives continuously at high speed and requires real-time or near-real-time processing  ← ✓ CORRECT
*Feedback: Correct — velocity refers to the speed of data generation and the need for rapid processing. Every-second sensor readings are a classic velocity scenario.*

C. Variety — because the data includes numbers, coordinates, and images in different formats
*Feedback: Incorrect — variety is present (numeric readings, GPS, images) but the question asks about the every-second streaming aspect specifically.*

D. All three Vs are equally prominent in this scenario
*Feedback: Incorrect — while all three Vs appear, the streaming, real-time nature of "every second" data makes velocity the most prominent characteristic described.*

**Hint:** The three Vs: Volume (size), Velocity (speed of arrival), Variety (different formats). Which one does "every second" point to?

**Explanation:** Chapter 3 introduces Big Data's three Vs: Volume (scale of data), Velocity (speed of data generation and processing), and Variety (different data formats and sources). Real-time sensor data arriving every second is a velocity-dominant scenario — the challenge is keeping up with the speed of incoming data rather than just its size or format diversity.

**Points:** 1 | **Difficulty:** 3/5 | **ID:** BITM330-RAT3-Q10 | **Bloom:** Apply

---

## Quick-Reference Answer Key

| #   | Type | Correct Answer(s) | Points | Difficulty | Bloom      |
| --- | ---- | ----------------- | ------ | ---------- | ---------- |
| 1   | MS   | A, C, D, E        | 2      | 4          | Analyze    |
| 2   | MS   | A, B, C, E        | 2      | 4          | Analyze    |
| 3   | MC   | B                 | 1      | 2          | Understand |
| 4   | MC   | C                 | 1      | 3          | Apply      |
| 5   | MC   | C                 | 1      | 3          | Apply      |
| 6   | MC   | B                 | 1      | 3          | Apply      |
| 7   | MC   | C                 | 1      | 4          | Analyze    |
| 8   | MC   | C                 | 1      | 4          | Analyze    |
| 9   | MC   | C                 | 1      | 3          | Apply      |
| 10  | MC   | B                 | 1      | 3          | Apply      |
