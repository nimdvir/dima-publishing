# Readiness Assessment Test (RAT): Chapter 3 — Understanding Data Fundamentals

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/RAT_nqr5a3?_a=BAMAAAX00" alt="RAT or Quiz section icon" width="220">
</p>
<p align="center">

## Assessment Design Notes

This RAT checks whether students completed the Chapter 3 reading and can reason with the chapter's core concepts — data fundamentals, classification, representation, structure, stewardship, and the bridge from spreadsheets to databases — before class discussion. Questions are grounded in the Grading Database running example, the chapter's tables and definitions, the Let's Build Google Sheets exercise, and the business scenarios the chapter presents.

### Bloom Distribution

| Bloom Level | Questions | Count |
|---|---|---|
| Remember | 1–8 | 8 |
| Understand | 9–16 | 8 |
| Apply | 17–24 | 8 |
| Analyze | 25–32 | 8 |
| Evaluate | 33–40 | 8 |

### Design Criterion Coverage

| Design Criterion | Bloom Sections Used | Questions | Count |
|---|---|---|---|
| Application-based | Apply, Analyze, Evaluate | 17–19, 22–24, 26, 28, 30, 32, 34–37, 40 | 14 |
| Scenario-based | Understand, Apply, Analyze, Evaluate | 10–12, 18, 21, 27, 29–31, 35, 38 | 12 |
| Definition-only | Remember, Understand | 1–9, 13–16, 20, 25 | 14 |

### AI-Resistance Strategies Used

1. **Chapter-specific reasoning** — questions reference the Grading Database fields (`StudentID`, `Score`, `DueDate`, `DeliverableType`) and the Let's Build Google Sheets tabs (`GRADEBOOK`, `GRADE_WEIGHT`, `DATA_DICTIONARY`).
2. **Schema-specific context** — questions use exact table structures, data hierarchy levels, and measurement-level classifications from the chapter.
3. **Scenario stems with embedded traps** — distractors drawn from adjacent concepts (e.g., ordinal-vs-interval confusion, NULL-vs-zero, spreadsheet-vs-table).
4. **Multi-answer discrimination** — Select ALL questions require distinguishing subtly different data quality dimensions, metadata components, or anomaly types.
5. **Non-obvious correct answers** — paraphrased chapter language rather than keyword-matched definitions.
6. **Output prediction** — questions ask students to predict what would happen if a data type were changed, a definition were missing, or a flat file were updated incorrectly.
7. **Platform-specific detail** — questions reference SQLite, Access, and PostgreSQL type names from the chapter's cross-platform data types table.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Remember Questions

**1. How does Chapter 3 define data?**

A. A final decision produced by an executive dashboard
B. A collection of values, symbols, measures, or observations that represent something about the world
C. A software tool used to store and query information
D. A summary report that compares performance across departments

**2. Which sequence correctly lists the data hierarchy from smallest to largest?**

A. Byte, bit, field, record, table, database
B. Bit, field, byte, record, database, table
C. Bit, byte, field, record, table, database
D. Field, bit, byte, table, record, database

**3. In the R.E.A.D. model, which stage means connecting data across records, time, or entities?**

A. Representation
B. Expression
C. Association
D. Deployment

**4. Select ALL that apply: Which are data quality dimensions named in Chapter 3?**

A. Accuracy
B. Profitability
C. Completeness
D. Timeliness
E. Popularity

**5. Which term describes data that fits predefined rows, columns, and types?**

A. Unstructured data
B. Semi-structured data
C. Structured data
D. Binary data

**6. Select ALL that apply: Which are valid measurement levels in the NOIR classification?**

A. Nominal
B. Operational
C. Interval
D. Ratio
E. Relational

**7. In the Grading Database, which field is best classified as nominal?**

A. Score
B. DueDate
C. DeliverableType
D. AttendanceCount

**8. Select ALL that apply: Which items does Chapter 3 identify as different stored conditions that should not be treated as the same thing?**

A. NULL
B. Zero (0)
C. An empty string ("")
D. A blank space (" ")
E. A formula error (#VALUE!)

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Understand Questions

**9. Why does Chapter 3 say the "data is the new oil" analogy falls short?**

A. Oil is more valuable than data in most industries
B. Oil is consumed when used, but data can be reused many times without being depleted
C. Oil requires specialized equipment to extract, but data does not
D. Oil is a natural resource, but data is manufactured

**10. A manager notices that two departments report different revenue for the same quarter. According to Chapter 3, what is the most likely root cause?**

A. The SQL queries contain syntax errors
B. Each department defines "customer" or "revenue" differently
C. The database server is running slowly
D. The dashboard software is outdated

**11. Why does the chapter warn against calculating the "average StudentID" or "average ZIP code"?**

A. These fields are too long to average efficiently
B. These fields contain digits but are identifiers, not quantities — the average has no business meaning
C. These fields are stored as text, so averages are impossible
D. These fields have too many missing values to produce a reliable average

**12. Select ALL that apply: Why does Chapter 3 treat metadata as essential rather than optional?**

A. Metadata gives people and systems a common language for what fields mean
B. Metadata replaces the need for a database management system
C. Without metadata, two departments can interpret the same field name differently and produce conflicting reports
D. Metadata records allowed values and formats so data entry stays consistent
E. Metadata automatically generates SQL queries for analysis

**13. How does DIKW differ from R.E.A.D. in the chapter's framing?**

A. DIKW explains increasing levels of meaning; R.E.A.D. explains the practical work needed to make data usable
B. DIKW is about databases; R.E.A.D. is about spreadsheets
C. DIKW applies only to quantitative data; R.E.A.D. applies only to qualitative data
D. DIKW is a newer model that replaced R.E.A.D.

**14. Why does the chapter state that data governance is distinct from data quality?**

A. Governance is a software product; quality is a manual process
B. Quality is the condition of the data; governance is the accountability system that maintains that condition over time
C. Governance applies only to financial data; quality applies to all data
D. Quality is about speed; governance is about accuracy

**15. Select ALL that apply: According to Chapter 3, why do flat files become fragile as data grows?**

A. Repeated facts create update anomalies when a value changes
B. There is no enforced way to join one sheet to another reliably
C. Formulas refer to cell ranges rather than named tables
D. Flat files automatically delete old records after a time limit
E. Categorical text can drift across cases (Quiz, quiz, QUIZ)

**16. What is the main reason Chapter 3 gives for organizations to move from spreadsheets to databases?**

A. Databases are less expensive than spreadsheet software
B. Databases provide structure, control, and shared access that flat files cannot as data grows in scale and reuse
C. Spreadsheets cannot store numbers
D. Databases require no training to use

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Apply Questions

**17. A grading spreadsheet has these columns: `StudentID, StudentName, DeliverableType, Score, DueDate`. The same student appears in 12 rows with their name spelled "Jon" in 8 rows and "John" in 4 rows. Which data quality dimension is most clearly violated?**

A. Timeliness
B. Validity
C. Consistency
D. Accuracy

**18. A clinic stores appointment dates as plain text in a spreadsheet. When the manager tries to count how many appointments occurred in March, the formula returns zero results. What is the most likely cause?**

A. The spreadsheet ran out of storage space
B. Dates stored as text cannot be compared with date logic, so March dates are present but invisible to the formula
C. The manager used the wrong spreadsheet software
D. Appointments were never entered in the first place

**19. In the Let's Build Google Sheets exercise, the `GRADEBOOK` tab uses `VLOOKUP` to pull category weights from the `GRADE_WEIGHT` tab. What limitation of this approach does Chapter 3 highlight?**

A. VLOOKUP can only search to the right, never to the left
B. VLOOKUP has no enforcement — if a deliverable ID is mistyped in GRADEBOOK, the formula silently returns an error or wrong value
C. VLOOKUP works only with numeric data
D. VLOOKUP requires internet access to function

**20. A field stores `Score` values. Which measurement level does it belong to, and why?**

A. Nominal, because scores are labels
B. Ordinal, because students can be ranked by score
C. Interval, because score differences are meaningful but zero is arbitrary
D. Ratio, because scores have equal intervals and a true zero (0 means no points earned)

**21. Select ALL that apply: A company stores customer orders in a single flat CSV file with these columns: `OrderID, CustomerName, CustomerEmail, ProductName, ProductPrice, OrderDate`. Which problems would this structure create?**

A. Updating a customer's email requires editing every order row for that customer
B. A new customer cannot be recorded until they place an order
C. Deleting the only order for a customer also removes the only record that the customer exists
D. The CSV format cannot store dates
E. Product prices repeated in every order row can become inconsistent if a price changes

**22. In the Grading Database, `AttendanceStatus` can be `Present`, `Absent`, or `Excused`. A new instructor enters `present` (lowercase). Which data quality dimension is weakened?**

A. Timeliness
B. Consistency
C. Uniqueness
D. Completeness

**23. A data dictionary entry for `DueDate` specifies: "Original deadline for the deliverable. Format: YYYY-MM-DD. Required." Without this entry, what misinterpretation is most likely?**

A. Someone might store DueDate as an image
B. Someone might interpret DueDate as the submission date instead of the original deadline
C. Someone might delete the DueDate column entirely
D. Someone might convert DueDate to a different time zone automatically

**24. Select ALL that apply: The chapter describes the data lifecycle as moving through several stages. Which stages appear in the chapter's lifecycle table?**

A. Collection
B. Monetization
C. Cleaning
D. Retention and Archiving
E. Anonymization and Deletion

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Analyze Questions

**25. A dataset has temperature readings in Celsius and customer satisfaction ratings on a 1–5 scale. Why are these two fields at different measurement levels?**

A. Temperature has more decimal places than satisfaction ratings
B. Temperature is interval (equal gaps, no true zero); satisfaction ratings are ordinal (ordered but gaps are not equal)
C. Temperature is nominal; satisfaction ratings are ratio
D. Both are at the same level because both use numbers

**26. Select ALL that apply: A flat grading file has these columns: `StudentID, StudentName, DeliverableType, Score, DueDate, InstructorComment`. Which anomalies could occur in this structure?**

A. Update anomaly: changing a student's name requires editing every row where that student appears
B. Insertion anomaly: a new student cannot be added to the file until they receive a grade
C. Calculation anomaly: the file automatically averages scores incorrectly
D. Deletion anomaly: removing the only grade for a student also removes the only record that the student exists
E. Storage anomaly: the file doubles in size every time it is opened

**27. A retail analyst notices that "monthly sales" reports from two regions never match. The analyst discovers that Region A defines `OrderDate` as the date the order was placed, while Region B defines it as the date the order shipped. Which Chapter 3 concept would have prevented this?**

A. A faster database server
B. A shared data dictionary with a single definition of `OrderDate`
C. A larger spreadsheet with more rows
D. A more powerful dashboard tool

**28. Select ALL that apply: Chapter 3 describes semi-structured and unstructured data as relevant even in a relational database course. Why?**

A. Organizations often capture unstructured data as inputs that later get classified, cleaned, and routed into structured tables
B. Semi-structured formats like JSON and XML are common in APIs and data exchange between systems
C. Unstructured data is always more accurate than structured data
D. Understanding all three types helps students see where structured data comes from in the data-to-decisions arc
E. Semi-structured data can bypass the need for a database entirely

**29. A grading sheet has `Score` stored as text (`"92"`, `"88"`, `"75"`). An analyst tries to calculate the average using a spreadsheet function. What happens, and why?**

A. The average calculates correctly because text and numbers are interchangeable
B. The average function ignores text values, returning a wrong result or an error
C. The spreadsheet automatically converts text to numbers before calculating
D. The average function converts text to zero, making the average too low

**30. A mid-size company keeps all customer, order, and product data in one spreadsheet. Which of the "six rules for good tables" from Chapter 3 is most clearly violated?**

A. One row, one record
B. Consistent representation
C. Separated themes — different subjects should live in different tables
D. Stable identifiers

**31. Select ALL that apply: Chapter 3 compares spreadsheets and databases. Which statements accurately reflect the chapter's comparison?**

A. Spreadsheets support flexible, visual data exploration for small datasets
B. Databases enforce types, relationships, and constraints that spreadsheets do not
C. Spreadsheets are always faster than databases for any amount of data
D. Databases reduce data redundancy by separating themes into related tables
E. A spreadsheet may contain a well-formed table, several loose tables, or no true table at all

**32. The chapter states that big data is described by three Vs. What do each of the three Vs measure?**

A. Volume (how much), velocity (how fast), and variety (how many forms)
B. Volume (how much), validity (how accurate), and value (how useful)
C. Velocity (how fast), veracity (how trustworthy), and volume (how much)
D. Variety (how many forms), visualization (how displayed), and volume (how much)

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Evaluate Questions

**33. A university wants to track student grades across multiple courses, instructors, and semesters. They currently use a single shared spreadsheet. Which is the strongest argument for moving to a database?**

A. Databases are newer technology than spreadsheets
B. The spreadsheet has repeated student names, mixed themes, and no way to enforce that a StudentID in a grade row matches a real student — databases solve all three problems
C. Databases can store more colors than spreadsheets
D. Spreadsheets cannot be shared with multiple users

**34. Select ALL that apply: Chapter 3 argues that big data and AI "raise the stakes" for data fundamentals. Which reasons support that claim?**

A. A bad definition hidden in a dashboard summarizing one million rows can damage more decisions than the same error in a small spreadsheet
B. AI models trained on inconsistent or poorly governed data produce inconsistent or poorly governed results
C. Big data tools automatically fix all data quality problems
D. Scale magnifies the cost of getting fundamentals wrong and the value of getting them right
E. AI systems can infer correct definitions even when data is poorly labeled

**35. A hospital stores patient visit notes as unstructured text files. The analytics team wants to use this data to predict readmission risk. According to Chapter 3, what must happen first before structured analysis is possible?**

A. The files must be deleted and re-entered by hand
B. The unstructured text must be classified, cleaned, and routed into structured fields that capture the relevant information
C. The hospital must purchase a new database server
D. The text files must be converted to images for faster processing

**36. Select ALL that apply: A nonprofit organization collects donor information including names, emails, donation amounts, and payment methods. They want to design a responsible data management approach. Which Chapter 3 recommendations apply?**

A. Create a data dictionary defining each field's meaning, format, and allowed values
B. Assign governance roles so someone owns decisions about who can update donor records
C. Store all data indefinitely because more data is always better
D. Apply lifecycle thinking — keep useful donor data and retire data whose retention period has passed
E. Consider ethics: what data should be collected, who should access it, and what harm could follow from misuse

**37. A manager is choosing between keeping data in a shared Google Sheet and investing in a database. The data includes customer profiles, orders, products, and shipping records that multiple departments update daily. Which factor most strongly favors the database?**

A. The Google Sheet has reached its row limit
B. The data spans multiple related themes (customers, orders, products) that must stay connected while being updated independently — exactly what databases are designed to manage
C. The database software has a more attractive interface
D. Google Sheets cannot display charts

**38. Select ALL that apply: An instructor is building a grading system and must decide how to handle missing scores. Which approaches align with Chapter 3's guidance on NULL and missing values?**

A. Treat all blank cells as zeros because missing work deserves no points
B. Distinguish NULL (not yet entered) from zero (earned zero points) so averages are not distorted
C. Document what missing values mean in a data dictionary so all instructors use the same conventions
D. Use required fields and NOT NULL constraints where appropriate to reduce ambiguity
E. Leave missing values unlabeled so the system can decide how to handle them automatically

**39. Two proposed data designs are being considered for a small business. Design A stores everything in one flat spreadsheet. Design B separates customers, orders, and products into related tables with shared identifiers. The business expects to grow from 100 to 10,000 customers over two years. Which design does Chapter 3's reasoning support, and why?**

A. Design A, because spreadsheets are always sufficient for business data
B. Design B, because separating themes into related tables prevents redundancy, update anomalies, and the structural fragility that flat files exhibit as data grows
C. Design A, because flat files are faster than databases at any scale
D. Design B, because databases are required by law for businesses with more than 1,000 customers

**40. Select ALL that apply: A data analyst discovers that a dashboard shows average customer spending has increased 15% month over month. Before presenting this to leadership, which questions from Chapter 3 should the analyst investigate?**

A. Is `customer` defined the same way across all source systems, or could the increase be caused by a definition change?
B. Are the underlying values accurate, complete, and current?
C. Does the dashboard look visually appealing?
D. Could NULL values or missing records be distorting the average?
E. Is the data timely — does the report reflect the most recent month's data, or is there a lag?

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Answer Key

### Remember Questions

**Question 1: How does Chapter 3 define data?**

**Correct Answer:** B

**Explanation:** Chapter 3 defines data as "a collection of values, symbols, measures, or observations that represent something about the world" (Data, Meaning, and Context section). The chapter emphasizes that data is the recorded starting point for later analysis, not a finished report or decision.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | A dashboard-produced decision is closer to wisdom, not raw data. |
| B | Yes | Matches the chapter's definition: values, symbols, measures, or observations. |
| C | No | Describes a DBMS or software tool, not data itself. |
| D | No | Describes information or a report, not raw data. |

---

**Question 2: Which sequence correctly lists the data hierarchy from smallest to largest?**

**Correct Answer:** C

**Explanation:** Chapter 3 presents the hierarchy as: bit (smallest binary unit), byte (8 bits), field (one stored value), record (related fields), table (similar records), database (related tables). Each level adds more organization and meaning.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Byte cannot precede bit — a byte is 8 bits. |
| B | No | Field cannot precede byte, and database cannot precede table. |
| C | Yes | Correct ascending order: bit → byte → field → record → table → database. |
| D | No | Bit must come first, and table before database. |

---

**Question 3: In the R.E.A.D. model, which stage means connecting data across records, time, or entities?**

**Correct Answer:** C

**Explanation:** Chapter 3 explains that Association means data is "connected across records, time, or entities." Representation captures data in a usable form, Expression organizes it clearly, and Deployment uses it to support action.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Representation is about capturing data in a usable form. |
| B | No | Expression is about labeling and organizing data clearly. |
| C | Yes | Association means connecting data across records, time, or entities. |
| D | No | Deployment is about using data to support action. |

---

**Question 4: Select ALL that apply: Which are data quality dimensions named in Chapter 3?**

**Correct Answers:** A, C, D

**Explanation:** Chapter 3 names six data quality dimensions: accuracy, completeness, consistency, timeliness, validity, and uniqueness. Profitability and popularity are not data quality dimensions.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Accuracy is one of the six dimensions (values match reality). |
| B | No | Profitability is a business metric, not a data quality dimension. |
| C | Yes | Completeness is one of the six dimensions (required values are present). |
| D | Yes | Timeliness is one of the six dimensions (data is current when needed). |
| E | No | Popularity is not a data quality dimension. |

---

**Question 5: Which term describes data that fits predefined rows, columns, and types?**

**Correct Answer:** C

**Explanation:** Chapter 3 defines structured data as data that "fits predefined rows, columns, and types, such as a student grades table." This is the form relational databases and SQL are designed to manage.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Unstructured data has no fixed schema (emails, images, audio). |
| B | No | Semi-structured data has labels but flexible form (JSON, XML). |
| C | Yes | Structured data fits predefined rows, columns, and types. |
| D | No | Binary data is about storage form (encoded bytes), not structure. |

---

**Question 6: Select ALL that apply: Which are valid measurement levels in the NOIR classification?**

**Correct Answers:** A, C, D

**Explanation:** NOIR stands for Nominal, Ordinal, Interval, and Ratio. Operational and Relational are not measurement levels — Operational relates to business processes and Relational relates to database design.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Nominal is the N in NOIR — labels categories without order. |
| B | No | Operational is not a measurement level. |
| C | Yes | Interval is the I in NOIR — equal gaps, no true zero. |
| D | Yes | Ratio is the R in NOIR — equal gaps and a true zero. |
| E | No | Relational describes a database model, not a measurement level. |

---

**Question 7: In the Grading Database, which field is best classified as nominal?**

**Correct Answer:** C

**Explanation:** `DeliverableType` stores values like Quiz, Homework, Exam, and Project — labels without inherent order. Score is ratio, DueDate is interval, and AttendanceCount would be ratio. Nominal fields support counting and segmentation, not ranking.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Score is ratio — it has equal intervals and a true zero. |
| B | No | DueDate is interval — dates have equal spacing but no true zero. |
| C | Yes | DeliverableType labels categories (Quiz, Homework, Exam) without order. |
| D | No | AttendanceCount (a count of attendances) would be ratio. |

---

**Question 8: Select ALL that apply: Which items does Chapter 3 identify as different stored conditions that should not be treated as the same thing?**

**Correct Answers:** A, B, C, D

**Explanation:** Chapter 3 devotes a table and extended discussion to distinguishing NULL (no value stored), zero (real numeric value), an empty string (text with no characters), and a blank space (text containing a space character). A formula error is not included in this comparison.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | NULL means no value is stored at all. |
| B | Yes | Zero (0) is a real numeric value equal to zero. |
| C | Yes | An empty string ("") is text with no characters. |
| D | Yes | A blank space (" ") is text containing a space character. |
| E | No | Formula errors are not among the four stored conditions the chapter distinguishes. |

### Understand Questions

**Question 9: Why does Chapter 3 say the "data is the new oil" analogy falls short?**

**Correct Answer:** B

**Explanation:** The chapter argues that "oil is consumed when used; data is not. A grading dataset can support attendance analysis, quiz performance analysis, advising decisions, and course redesign without being depleted." Data is reusable — its value grows through reuse rather than being consumed.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | The chapter does not compare relative value. |
| B | Yes | Oil is consumed when used; data can be reused many times. |
| C | No | The chapter does not discuss extraction effort in the analogy. |
| D | No | The chapter does not contrast natural vs. manufactured resources. |

---

**Question 10: A manager notices that two departments report different revenue for the same quarter. According to Chapter 3, what is the most likely root cause?**

**Correct Answer:** B

**Explanation:** The chapter's "Why Data Fundamentals Drive Business Performance" section states that "two departments report different revenue for the same quarter because each defines 'customer' differently." This is a data-fundamentals problem, not a technical one.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Chapter 3 says "none of these are SQL problems." |
| B | Yes | Different definitions of key terms cause conflicting reports — a data-fundamentals issue. |
| C | No | Server speed is not cited as the cause of definitional conflicts. |
| D | No | Dashboard software is not the root cause — the problem is upstream in shared meaning. |

---

**Question 11: Why does the chapter warn against calculating the "average StudentID" or "average ZIP code"?**

**Correct Answer:** B

**Explanation:** The chapter warns in the "Avoid: Averaging an identifier" callout that "digits do not make a field numeric. Ask first what the field represents before deciding what operations make sense." StudentID and ZIP code contain digits but are identifiers, not quantities.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Field length is not the issue. |
| B | Yes | Digits in identifiers do not represent quantities — averaging them produces meaningless results. |
| C | No | The chapter does not say averaging is technically impossible, just meaningless. |
| D | No | Missing values are a separate concern from identifier-vs-quantity classification. |

---

**Question 12: Select ALL that apply: Why does Chapter 3 treat metadata as essential rather than optional?**

**Correct Answers:** A, C, D

**Explanation:** Chapter 3 treats metadata as governance infrastructure. A shared data dictionary gives people and systems a common language (A), prevents conflicting interpretations (C), and records allowed values and formats (D). Metadata does not replace a DBMS or auto-generate SQL.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Metadata gives people and systems a common language for field meanings. |
| B | No | Metadata complements a DBMS; it does not replace it. |
| C | Yes | Conflicting field interpretations cause reporting conflicts that metadata prevents. |
| D | Yes | Allowed values and formats documented in metadata keep data entry consistent. |
| E | No | Metadata does not auto-generate SQL queries. |

---

**Question 13: How does DIKW differ from R.E.A.D. in the chapter's framing?**

**Correct Answer:** A

**Explanation:** The chapter states: "DIKW explains the increasing meaning; R.E.A.D. explains the work needed to make that meaning usable." Both models are applied together in the chapter's consolidated treatment.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | DIKW explains meaning levels; R.E.A.D. explains the practical work. |
| B | No | Both models apply to any data, not tied to specific tools. |
| C | No | Both models apply regardless of data classification. |
| D | No | The chapter presents them as complementary, not sequential replacements. |

---

**Question 14: Why does the chapter state that data governance is distinct from data quality?**

**Correct Answer:** B

**Explanation:** The chapter's Business Insight callout states: "Data quality is the condition of the data. Data governance is the set of roles, rules, and processes used to maintain that condition."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Governance is roles and processes, not a software product. |
| B | Yes | Quality is the condition; governance is the accountability system maintaining it. |
| C | No | Governance applies to all data, not only financial. |
| D | No | Governance is about roles and accountability, not speed. |

---

**Question 15: Select ALL that apply: According to Chapter 3, why do flat files become fragile as data grows?**

**Correct Answers:** A, B, C, E

**Explanation:** The chapter describes four anomalies (redundancy, update, insertion, deletion) plus query fragility where formulas use cell ranges and categorical text drifts. Flat files do not automatically delete records.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Repeated facts create update anomalies. |
| B | Yes | Flat files lack enforced joins between sheets. |
| C | Yes | Chapter 3 mentions formulas referring to cell ranges instead of tables. |
| D | No | Flat files do not auto-delete records. |
| E | Yes | Categorical text drift (Quiz/quiz/QUIZ) is a flat-file fragility. |

---

**Question 16: What is the main reason Chapter 3 gives for organizations to move from spreadsheets to databases?**

**Correct Answer:** B

**Explanation:** Chapter 3 frames the move as driven by scale and structural needs: databases "provide the structure, control, and shared access that flat files cannot" when data must be shared, updated repeatedly, and connected across themes.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Cost is not the primary argument presented. |
| B | Yes | Structure, control, and shared access are the chapter's core rationale. |
| C | No | Spreadsheets can store numbers — the issue is structure, not capability. |
| D | No | Databases require training; ease of use is not the argument. |

### Apply Questions

**Question 17: A grading spreadsheet has these columns: `StudentID, StudentName, DeliverableType, Score, DueDate`. The same student appears in 12 rows with their name spelled "Jon" in 8 rows and "John" in 4 rows. Which data quality dimension is most clearly violated?**

**Correct Answer:** C

**Explanation:** Consistency asks "whether the same fact is represented the same way across records." The same student's name spelled two different ways in the same dataset is a consistency failure.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Timeliness is about whether data is current — not the issue here. |
| B | No | Validity is about values following defined rules — "Jon" and "John" may both be valid names. |
| C | Yes | The same fact (student name) is represented inconsistently across rows. |
| D | No | Accuracy would apply if the name were wrong, not if it were inconsistently spelled. |

---

**Question 18: A clinic stores appointment dates as plain text in a spreadsheet. When the manager tries to count how many appointments occurred in March, the formula returns zero results. What is the most likely cause?**

**Correct Answer:** B

**Explanation:** Chapter 3 explains that storing dates as text prevents date math: "If `DueDate` is stored in inconsistent formats, turnaround analysis becomes harder." Text-stored dates cannot be compared with date-range logic.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Storage space is unrelated to date comparison logic. |
| B | Yes | Text-stored dates are invisible to date-range formulas. |
| C | No | Software choice is not the issue — data representation is. |
| D | No | The appointments exist but are stored in a format formulas cannot interpret as dates. |

---

**Question 19: In the Let's Build Google Sheets exercise, the `GRADEBOOK` tab uses `VLOOKUP` to pull category weights from the `GRADE_WEIGHT` tab. What limitation of this approach does Chapter 3 highlight?**

**Correct Answer:** B

**Explanation:** The Terms file notes that VLOOKUP "is fragile, depends on exact matches, and has no enforcement, which is why databases replace it with real relationships." A mistyped deliverable ID produces a silent error or wrong value — no referential integrity check exists.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | VLOOKUP's right-only limitation is a technical detail, not the chapter's main point. |
| B | Yes | VLOOKUP lacks enforcement — errors are silent, which databases solve with constraints. |
| C | No | VLOOKUP works with text values as well as numeric. |
| D | No | VLOOKUP works offline in Google Sheets. |

---

**Question 20: A field stores `Score` values. Which measurement level does it belong to, and why?**

**Correct Answer:** D

**Explanation:** Score is ratio because it has equal intervals (the difference between 80 and 85 is the same as between 90 and 95) and a true zero (0 means no points earned). This supports all arithmetic including ratios and percentages.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Score is not a label — it is a measurable quantity. |
| B | No | While students can be ranked by score, the equal-interval and true-zero properties push it to ratio. |
| C | No | Score has a true zero (0 = no points), disqualifying it from interval. |
| D | Yes | Score has equal intervals and a meaningful zero — ratio level. |

---

**Question 21: Select ALL that apply: A company stores customer orders in a single flat CSV file with these columns: `OrderID, CustomerName, CustomerEmail, ProductName, ProductPrice, OrderDate`. Which problems would this structure create?**

**Correct Answers:** A, B, C, E

**Explanation:** Flat files mixing customer and order themes create update anomalies (A — editing email in every row), insertion anomalies (B — new customer needs an order to exist), deletion anomalies (C — deleting last order loses the customer), and redundancy (E — price changes must update every row). CSV can store dates (D is false).

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Customer email repeated in every order row creates an update anomaly. |
| B | Yes | A new customer cannot exist without an order — insertion anomaly. |
| C | Yes | Deleting the only order removes the only customer record — deletion anomaly. |
| D | No | CSV can store dates as text; the problem is lack of type enforcement. |
| E | Yes | Product prices repeated in every row become inconsistent if a price changes. |

---

**Question 22: In the Grading Database, `AttendanceStatus` can be `Present`, `Absent`, or `Excused`. A new instructor enters `present` (lowercase). Which data quality dimension is weakened?**

**Correct Answer:** B

**Explanation:** Consistency is weakened because the same concept is now represented two different ways (`Present` vs. `present`). The chapter warns that "if one instructor records `Quiz` and another records `quiz`, consistency is weak."

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Timeliness is about currency, not case formatting. |
| B | Yes | The same status is represented inconsistently (mixed case). |
| C | No | Uniqueness is about duplicate records, not formatting. |
| D | No | Completeness is about whether values are present, not their format. |

---

**Question 23: A data dictionary entry for `DueDate` specifies: "Original deadline for the deliverable. Format: YYYY-MM-DD. Required." Without this entry, what misinterpretation is most likely?**

**Correct Answer:** B

**Explanation:** Chapter 3 warns that without metadata, "`DueDate` could mean original deadline, extended deadline, or submission date." The data dictionary entry prevents this by locking in one shared meaning.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Storage format issues are unlikely without the entry. |
| B | Yes | Without the definition, DueDate could be interpreted as submission date instead of original deadline. |
| C | No | Column deletion is an operational error, not a misinterpretation. |
| D | No | Time zone conversion is a separate technical issue. |

---

**Question 24: Select ALL that apply: The chapter describes the data lifecycle as moving through several stages. Which stages appear in the chapter's lifecycle table?**

**Correct Answers:** A, C, D, E

**Explanation:** The chapter's lifecycle table includes: Collection, Storage, Cleaning, Integration, Use, Retention & Archiving, and Anonymization & Deletion. Monetization is not in the table.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Collection is the first lifecycle stage. |
| B | No | Monetization is not a lifecycle stage in the chapter's table. |
| C | Yes | Cleaning is a lifecycle stage (fix errors, remove duplicates). |
| D | Yes | Retention & Archiving is a named lifecycle stage. |
| E | Yes | Anonymization & Deletion is the final lifecycle stage. |

### Analyze Questions

**Question 25: A dataset has temperature readings in Celsius and customer satisfaction ratings on a 1–5 scale. Why are these two fields at different measurement levels?**

**Correct Answer:** B

**Explanation:** Temperature in Celsius is interval: equal gaps exist between degrees, but 0°C does not mean "no temperature." Satisfaction ratings are ordinal: categories are ordered (1 < 5), but the gap between 1 and 2 is not proven equal to the gap between 4 and 5.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Decimal places do not determine measurement level. |
| B | Yes | Temperature is interval (equal gaps, no true zero); satisfaction is ordinal (ordered, unequal gaps). |
| C | No | Temperature is not nominal, and satisfaction is not ratio. |
| D | No | Both use numbers, but their measurement levels differ fundamentally. |

---

**Question 26: Select ALL that apply: A flat grading file has these columns: `StudentID, StudentName, DeliverableType, Score, DueDate, InstructorComment`. Which anomalies could occur in this structure?**

**Correct Answers:** A, B, D

**Explanation:** Chapter 3 describes four named anomalies. Update anomaly: changing a student's name requires editing every row (A). Insertion anomaly: cannot add a new student until they have a grade (B). Deletion anomaly: deleting the only grade removes the student record (D). Calculation and storage anomalies are not among the four named anomaly types.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Updating a name in every row is an update anomaly. |
| B | Yes | Needing a grade to add a student is an insertion anomaly. |
| C | No | "Calculation anomaly" is not one of the four named anomaly types. |
| D | Yes | Losing the student when the last grade is deleted is a deletion anomaly. |
| E | No | "Storage anomaly" is not one of the four named anomaly types. |

---

**Question 27: A retail analyst notices that "monthly sales" reports from two regions never match. The analyst discovers that Region A defines `OrderDate` as the date the order was placed, while Region B defines it as the date the order shipped. Which Chapter 3 concept would have prevented this?**

**Correct Answer:** B

**Explanation:** The chapter's Example callout describes this exact problem: "A retail analyst noticed that monthly sales reports from two regional offices never matched. The fix was not new software. The fix was a shared data dictionary." A shared data dictionary locks in one definition.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Server speed does not fix definitional conflicts. |
| B | Yes | A shared data dictionary with one definition of OrderDate prevents this mismatch. |
| C | No | More rows do not fix inconsistent definitions. |
| D | No | A better dashboard cannot fix upstream definitional conflicts. |

---

**Question 28: Select ALL that apply: Chapter 3 describes semi-structured and unstructured data as relevant even in a relational database course. Why?**

**Correct Answers:** A, B, D

**Explanation:** Chapter 3 states that unstructured data is "often captured as inputs...and then classified, cleaned, and routed into structured tables" (A). Semi-structured formats like JSON and XML are used in APIs (B). Understanding all three types situates structured data in the larger data ecosystem (D). Unstructured data is not inherently more accurate, and semi-structured data does not eliminate the need for databases.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Unstructured inputs are later classified and moved into structured systems. |
| B | Yes | JSON and XML are common API and data-exchange formats. |
| C | No | The chapter does not claim unstructured data is more accurate. |
| D | Yes | The chapter places structured data within the full data-type context. |
| E | No | Semi-structured data complements, rather than replaces, databases. |

---

**Question 29: A grading sheet has `Score` stored as text (`"92"`, `"88"`, `"75"`). An analyst tries to calculate the average using a spreadsheet function. What happens, and why?**

**Correct Answer:** B

**Explanation:** Chapter 3 warns that "if `Score` is stored as text, averages become fragile." Spreadsheet average functions typically ignore text cells or return errors rather than silently converting them, producing wrong results.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Text and numbers are not interchangeable in spreadsheet functions. |
| B | Yes | Text values are ignored by numeric functions, producing wrong averages or errors. |
| C | No | Spreadsheets do not automatically convert text to numbers in all contexts. |
| D | No | Spreadsheets do not convert text to zero by default. |

---

**Question 30: A mid-size company keeps all customer, order, and product data in one spreadsheet. Which of the "six rules for good tables" from Chapter 3 is most clearly violated?**

**Correct Answer:** C

**Explanation:** The chapter's table rules include "Separated themes: different subjects (students, grades) live apart." Storing customers, orders, and products in one sheet mixes three distinct themes, creating redundancy and anomaly risk.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Each row could still describe one instance — the deeper problem is mixed themes. |
| B | No | Representation may or may not be inconsistent; mixing themes is the clearer violation. |
| C | Yes | Customers, orders, and products are three separate themes forced into one table. |
| D | No | Identifiers may still be stable; the primary issue is theme separation. |

---

**Question 31: Select ALL that apply: Chapter 3 compares spreadsheets and databases. Which statements accurately reflect the chapter's comparison?**

**Correct Answers:** A, B, D, E

**Explanation:** The chapter says spreadsheets work well for small, flexible, visual tasks (A). Databases enforce types, relationships, and constraints (B). Databases reduce redundancy by separating themes (D). A spreadsheet may contain a well-formed table, several loose tables, or none (E). Spreadsheets are not always faster — performance depends on scale and task.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Spreadsheets support flexible, visual exploration for small datasets. |
| B | Yes | Databases enforce types, relationships, and constraints that spreadsheets do not. |
| C | No | Performance depends on scale; databases outperform spreadsheets at larger scales. |
| D | Yes | Database tables separate themes, reducing redundancy. |
| E | Yes | A spreadsheet can contain zero, one, or several informal tables. |

---

**Question 32: The chapter states that big data is described by three Vs. What do each of the three Vs measure?**

**Correct Answer:** A

**Explanation:** Chapter 3 defines big data by volume (how much data), velocity (how fast it arrives), and variety (how many different forms). The chapter cites Gantz & Reinsel (2012) and Kitchin (2014).

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Volume, velocity, and variety are the three Vs cited in the chapter. |
| B | No | Validity and value are not among the three Vs in this chapter. |
| C | No | Veracity is sometimes discussed in big data literature but not in this chapter's three Vs. |
| D | No | Visualization is not one of the three Vs. |

### Evaluate Questions

**Question 33: A university wants to track student grades across multiple courses, instructors, and semesters. They currently use a single shared spreadsheet. Which is the strongest argument for moving to a database?**

**Correct Answer:** B

**Explanation:** The chapter argues databases prevent the specific problems this scenario presents: repeated student names (redundancy), mixed themes (grades + courses + students), and lack of referential integrity between grade rows and valid students.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Newness is not a valid design criterion. |
| B | Yes | Databases directly address redundancy, mixed themes, and referential integrity — the scenario's specific problems. |
| C | No | Color support is irrelevant to structural data integrity. |
| D | No | Spreadsheets can be shared — shared access is not the core limitation. |

---

**Question 34: Select ALL that apply: Chapter 3 argues that big data and AI "raise the stakes" for data fundamentals. Which reasons support that claim?**

**Correct Answers:** A, B, D

**Explanation:** The chapter's Big Data section and Key Takeaway callout state: scale spreads errors further (A), AI models amplify bad data (B), and scale magnifies both the cost of getting fundamentals wrong and the value of getting them right (D). Big data tools do not auto-fix quality, and AI does not infer correct definitions from poorly labeled data.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | Errors in large datasets damage more decisions. |
| B | Yes | AI trained on bad data produces bad results. |
| C | No | Big data tools do not automatically fix quality problems. |
| D | Yes | Scale raises both the cost of mistakes and the value of good fundamentals. |
| E | No | AI cannot reliably infer correct definitions from poorly labeled data. |

---

**Question 35: A hospital stores patient visit notes as unstructured text files. The analytics team wants to use this data to predict readmission risk. According to Chapter 3, what must happen first before structured analysis is possible?**

**Correct Answer:** B

**Explanation:** Chapter 3 states that unstructured data like "emails, images, audio, PDFs, and videos" must be "classified, cleaned, and routed into structured tables for analysis." The hospital must extract relevant fields from the unstructured notes first.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Re-entry by hand is not required — classification and extraction can be automated. |
| B | Yes | Unstructured data must be classified, cleaned, and routed into structured fields before analysis. |
| C | No | Hardware is not the prerequisite — structure is. |
| D | No | Converting text to images would reduce, not increase, analytical utility. |

---

**Question 36: Select ALL that apply: A nonprofit organization collects donor information including names, emails, donation amounts, and payment methods. They want to design a responsible data management approach. Which Chapter 3 recommendations apply?**

**Correct Answers:** A, B, D, E

**Explanation:** The chapter recommends creating data dictionaries (A), assigning governance roles (B), applying lifecycle thinking — keeping useful data and retiring the rest (D), and considering ethics around collection, access, and potential harm (E). Storing data indefinitely contradicts lifecycle thinking.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | A data dictionary defines field meanings, formats, and allowed values. |
| B | Yes | Governance assigns ownership and accountability for data decisions. |
| C | No | Lifecycle thinking advises keeping data only as long as needed. |
| D | Yes | Lifecycle management includes retaining useful data and retiring expired data. |
| E | Yes | Ethics questions — what to collect, who accesses it, what harm is possible — are core chapter topics. |

---

**Question 37: A manager is choosing between keeping data in a shared Google Sheet and investing in a database. The data includes customer profiles, orders, products, and shipping records that multiple departments update daily. Which factor most strongly favors the database?**

**Correct Answer:** B

**Explanation:** The scenario presents multiple related themes updated independently by different departments — exactly the pattern Chapter 3 identifies as pushing organizations from spreadsheets toward databases. Databases separate themes into related tables while maintaining connections.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Row limits are a secondary concern; structural needs are primary. |
| B | Yes | Multiple related themes updated independently is the core use case for databases. |
| C | No | Interface aesthetics are not a design criterion in the chapter. |
| D | No | Google Sheets can display charts; this is not the limiting factor. |

---

**Question 38: Select ALL that apply: An instructor is building a grading system and must decide how to handle missing scores. Which approaches align with Chapter 3's guidance on NULL and missing values?**

**Correct Answers:** B, C, D

**Explanation:** Chapter 3 emphasizes distinguishing NULL from zero to avoid distorting averages (B), documenting missing-value meanings in a data dictionary (C), and using NOT NULL constraints where appropriate (D). Treating all blanks as zeros (A) would inflate failure rates — the chapter explicitly warns against this. Leaving missing values unlabeled (E) contradicts the chapter's emphasis on reducing ambiguity.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | Treating blanks as zeros distorts averages — the chapter warns against this. |
| B | Yes | Distinguishing NULL from zero prevents averages from being distorted. |
| C | Yes | A data dictionary should document what missing values mean. |
| D | Yes | Required fields and NOT NULL constraints reduce ambiguity. |
| E | No | Leaving missing values unlabeled increases ambiguity, contradicting the chapter's guidance. |

---

**Question 39: Two proposed data designs are being considered for a small business. Design A stores everything in one flat spreadsheet. Design B separates customers, orders, and products into related tables with shared identifiers. The business expects to grow from 100 to 10,000 customers over two years. Which design does Chapter 3's reasoning support, and why?**

**Correct Answer:** B

**Explanation:** Chapter 3 argues that separating themes into related tables "reduces repetition and makes updates more reliable" and that flat files exhibit redundancy, update anomalies, and structural fragility as data grows. The growth trajectory makes Design B clearly superior.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | No | The chapter explicitly shows why spreadsheets become fragile at scale. |
| B | Yes | Separated themes prevent redundancy, anomalies, and fragility as data scales. |
| C | No | Flat files are not faster at scale; this claim is unsubstantiated. |
| D | No | No legal requirement is stated; the reasoning is structural, not regulatory. |

---

**Question 40: Select ALL that apply: A data analyst discovers that a dashboard shows average customer spending has increased 15% month over month. Before presenting this to leadership, which questions from Chapter 3 should the analyst investigate?**

**Correct Answers:** A, B, D, E

**Explanation:** The chapter emphasizes checking definitions (A — "customer" defined consistently?), verifying accuracy, completeness, and currency of underlying values (B), checking for NULL distortion (D — missing records could inflate averages), and confirming timeliness (E — data lag). Visual appeal (C) is not a data-fundamentals concern.

| Option | Correct? | Reasoning |
| ------ | -------- | --------- |
| A | Yes | A definition change could artificially inflate the average. |
| B | Yes | Accuracy, completeness, and currency of underlying values must be verified. |
| C | No | Visual design does not validate data integrity. |
| D | Yes | NULL values or missing records can distort averages — the analyst should check. |
| E | Yes | A reporting lag could mean the increase reflects old data, not a real trend. |

---

## Question Distribution Summary

### Bloom Level

| Bloom Level | Questions | Count |
|---|---|---|
| Remember | 1–8 | 8 |
| Understand | 9–16 | 8 |
| Apply | 17–24 | 8 |
| Analyze | 25–32 | 8 |
| Evaluate | 33–40 | 8 |

### Question Type

| Question Type | Questions | Count |
|---|---|---|
| Single-answer MC | 1–3, 5, 7, 9–11, 13, 14, 16–18, 20, 22, 23, 25, 27, 29, 30, 32, 33, 35, 37, 39 | 26 |
| Multiple-answer (Select ALL) | 4, 6, 8, 12, 15, 21, 24, 26, 28, 31, 34, 36, 38, 40 | 14 |

### Design Criterion

| Design Criterion | Questions | Count |
|---|---|---|
| Application-based | 17–19, 22–24, 26, 28, 30, 32, 34–37, 40 | 14 |
| Scenario-based | 10–12, 18, 21, 27, 29–31, 35, 38 | 12 |
| Definition-only | 1–9, 13–16, 20, 25 | 14 |
