# Top 10 High-Value Questions for Chapter 4: Introduction to Databases

This document curates the 10 most valuable, application and scenario-based questions from the Chapter 4 RAT. They target the Apply, Analyze, and Evaluate Bloom levels to test students on deeper conceptual understanding and practical reasoning.

## Multiple Answer (Select ALL that apply)

**1. In the chapter's Let's Build Access...**
Select ALL that apply: In the chapter's Let's Build Access activity, the `GRADEBOOK` table includes student attributes (FirstName, LastName, Email) alongside grade data. What problems would this structure create as the database grows?

[x] Updating a student's email requires editing every grade row for that student
[x] Deleting the only grade for a student removes the only record that the student exists
[ ] The table cannot store more than 255 characters per row
[x] The table mixes two subjects — students and grades — that should be separated
[x] A student's name and email are repeated in every row where they appear

**Explanation:** Mixing students and grades in one table creates update anomalies (A — email changes require many edits), redundancy (B — attributes repeated per row), mixed subjects (C — violates relational table rules), and deletion anomalies (E — losing the last grade loses the student).

**2. Chapter 4's PetVax connections show how...**
Select ALL that apply: Chapter 4's PetVax connections show how Lab 03 problems map to database concepts. Which mappings are correct?

[x] Fixed FILTER() range missed new rows → query fragility → use table/field names in SQL
[x] Sarah Perry's email changed in only one row → update anomaly → use separate tables with foreign keys
[x] Coco the pet had two owners → need for related tables → use a link table connecting pets to owners
[x] Angel's appointment deleted, erasing evidence Angel existed → deletion anomaly → store pet facts separately from appointments
[ ] Two pets named Coco → need for better color coding in the spreadsheet

**Explanation:** All four mappings are correct: Sarah Perry's email inconsistency → update anomaly (A), Coco's two owners → need for link table (B), fixed FILTER() range → query fragility → SQL table names (C), Angel's deletion → deletion anomaly → separate tables (D). Color coding (E) is not a database concept solution.

**3. In the PetVax scenario, Rex could...**
In the PetVax scenario, Rex could not be recorded in the system until he had an appointment. Which Chapter 4 concept explains why this is a problem?

[ ] Data independence
[ ] Physical view separation
[ ] Program-data dependence
[x] Insertion anomaly — one fact (pet exists) cannot be added without another fact (appointment)

**Explanation:** An insertion anomaly occurs when you cannot add one fact (a pet exists) without also adding an unrelated fact (an appointment). This is exactly the insertion anomaly scenario described in the chapter.

**4. A database has a `PET` table...**
A database has a `PET` table with `PetID` as primary key and an `APPOINTMENT` table with `PetID` referencing `PET(PetID)`. What happens if someone tries to insert an appointment with `PetID = 99` when no pet with `PetID = 99` exists in the `PET` table?

[x] The DBMS rejects the insertion because the foreign key constraint is violated
[ ] The DBMS automatically creates a new pet with PetID = 99
[ ] The appointment is created and PetID is changed to match the nearest existing pet
[ ] The appointment is created with a warning

**Explanation:** The foreign key constraint `REFERENCES PET(PetID)` prevents orphaned records. The DBMS rejects the insertion because the referenced `PetID` must exist in the `PET` table.

**5. A company keeps customer data in...**
A company keeps customer data in departmental spreadsheets. Marketing has one version, Sales has another, and Customer Service has a third. According to Chapter 4, which specific database benefit would most directly address this problem?

[ ] Historical analysis — studying records over time
[ ] Data independence — separating physical and logical views
[ ] Concurrency control — managing simultaneous access
[x] Centralized source of truth — everyone works from the same official data

**Explanation:** The scenario describes competing copies and governance conflicts — exactly what a centralized source of truth solves. Data independence (A), concurrency (C), and historical analysis (D) address different problems.

**6. In a flat grading file, deleting...**
In a flat grading file, deleting all quiz scores for a particular deliverable also removes any record that the deliverable type existed. Which anomaly is this, and what database feature prevents it?

[ ] Insertion anomaly, prevented by NOT NULL
[ ] Update anomaly, prevented by CHECK constraints
[x] Deletion anomaly, prevented by separating deliverables and grades into related tables with foreign keys
[ ] Compression anomaly, prevented by database indexing

**Explanation:** Deleting quiz scores also removing the deliverable's existence is a deletion anomaly. The solution is separating deliverables and grades into related tables with a foreign key — deleting grades no longer deletes the deliverable definition.

**7. A small business stores customer data...**
A small business stores customer data in a single spreadsheet with these columns: `CustomerID, Name, Email, OrderID, Product, Price, OrderDate`. As the business grows, which single change would most improve data reliability?

[ ] Add more color coding to distinguish different types of data
[ ] Add more rows to the existing spreadsheet
[x] Separate the data into related tables — CUSTOMER and ORDER — with a foreign key linking them
[ ] Convert the spreadsheet to a CSV file for faster loading

**Explanation:** Separating mixed themes into related tables with foreign keys prevents the redundancy, anomalies, and governance conflicts of flat files. Color coding (A), more rows (C), or CSV conversion (D) do not address structural fragility.

**8. Two database designs are proposed for...**
Two database designs are proposed for a veterinary clinic. Design A uses one flat table: `VISIT(PetName, OwnerName, OwnerPhone, VisitDate, Service, Fee)`. Design B uses related tables: `PET(PetID, PetName, OwnerID)`, `OWNER(OwnerID, OwnerName, OwnerPhone)`, `VISIT(VisitID, PetID, VisitDate, Service, Fee)`. Which design does Chapter 4's reasoning support, and why?

[x] Design B, because separating subjects into related tables prevents redundancy, update anomalies, and the structural fragility that flat tables exhibit
[ ] Design A, because fewer tables are always easier to manage
[ ] Design B, because databases require at least three tables by rule
[ ] Design A, because all the data fits on one screen

**Explanation:** Design B separates subjects (pets, owners, visits) into related tables — exactly what Chapter 4 recommends to prevent redundancy, update anomalies, and structural fragility. Fewer tables (A) is simpler but structurally worse.

**9. The chapter's Let's Build uses Microsoft...**
The chapter's Let's Build uses Microsoft Access, but the chapter also discusses SQLite and PostgreSQL. When would an organization choose a server-based platform like PostgreSQL over a file-based platform like Access or SQLite?

[ ] When the database does not need to enforce any rules or constraints
[x] When the organization needs multi-user concurrent access, strong typing, and production-style workflows
[ ] When the database will contain fewer than 100 records
[ ] When only one person ever needs to access the data

**Explanation:** Chapter 4 presents the architectural spectrum with server-based platforms for multi-user concurrent access, strong typing, and production workflows. Single-user (A), tiny datasets (C), or no rules needed (D) describe scenarios where file-based platforms suffice.

**10. An organization currently uses a single...**
An organization currently uses a single flat CSV file for all customer, order, and product data. A consultant recommends moving to a database. Based on Chapter 4, what is the strongest argument for following this recommendation?

[ ] CSV files cannot be opened on modern computers
[x] A database with related tables, primary keys, foreign keys, and constraints would prevent the redundancy, anomalies, and governance conflicts that are inevitable in a single flat file as data grows
[ ] CSV files are an outdated format that will stop working soon
[ ] Databases are required by law for any business with customers

**Explanation:** The strongest argument is structural: databases prevent the redundancy, anomalies, and governance conflicts inevitable in flat files. CSV obsolescence (A), legal requirements (C), and incompatibility (D) are not arguments made in the chapter.
