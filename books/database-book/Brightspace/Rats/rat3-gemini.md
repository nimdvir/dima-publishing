# Top 10 High-Value Questions for Chapter 3: Understanding Data Fundamentals

This document curates the 10 most valuable, application and scenario-based questions from the Chapter 3 RAT. They target the Apply, Analyze, and Evaluate Bloom levels to test students on deeper conceptual understanding and practical reasoning.

## Multiple Answer (Select ALL that apply)

**1. A company stores customer orders in...**
Select ALL that apply: A company stores customer orders in a single flat CSV file with these columns: `OrderID, CustomerName, CustomerEmail, ProductName, ProductPrice, OrderDate`. Which problems would this structure create?

[x] Product prices repeated in every order row can become inconsistent if a price changes
[x] Updating a customer's email requires editing every order row for that customer
[ ] The CSV format cannot store dates
[x] Deleting the only order for a customer also removes the only record that the customer exists
[x] A new customer cannot be recorded until they place an order

**Explanation:** Flat files mixing customer and order themes create update anomalies (A), insertion anomalies (B), deletion anomalies (C), and redundancy (E). CSV can store dates (D is false).

**2. A flat grading file has these...**
Select ALL that apply: A flat grading file has these columns: `StudentID, StudentName, DeliverableType, Score, DueDate, InstructorComment`. Which anomalies could occur in this structure?

[x] Deletion anomaly: removing the only grade for a student also removes the only record that the student exists
[x] Update anomaly: changing a student's name requires editing every row where that student appears
[ ] Calculation anomaly: the file automatically averages scores incorrectly
[x] Insertion anomaly: a new student cannot be added to the file until they receive a grade
[ ] Storage anomaly: the file doubles in size every time it is opened

**Explanation:** Chapter 3 describes four named anomalies. Update anomaly: changing a student's name requires editing every row (A). Insertion anomaly: cannot add a new student until they have a grade (B). Deletion anomaly: deleting the only grade removes the student record (D). Calculation and storage anomalies are not among the four named anomaly types.

**3. A clinic stores appointment dates as...**
A clinic stores appointment dates as plain text in a spreadsheet. When the manager tries to count how many appointments occurred in March, the formula returns zero results. What is the most likely cause?

[ ] The spreadsheet ran out of storage space
[ ] The manager used the wrong spreadsheet software
[ ] Appointments were never entered in the first place
[x] Dates stored as text cannot be compared with date logic, so March dates are present but invisible to the formula

**Explanation:** Storing dates as text prevents date math. If `DueDate` is stored in inconsistent formats, turnaround analysis becomes harder. Text-stored dates cannot be compared with date-range logic.

**4. In the Let's Build Google Sheets...**
In the Let's Build Google Sheets exercise, the `GRADEBOOK` tab uses `VLOOKUP` to pull category weights from the `GRADE_WEIGHT` tab. What limitation of this approach does Chapter 3 highlight?

[x] VLOOKUP has no enforcement — if a deliverable ID is mistyped in GRADEBOOK, the formula silently returns an error or wrong value
[ ] VLOOKUP can only search to the right, never to the left
[ ] VLOOKUP requires internet access to function
[ ] VLOOKUP works only with numeric data

**Explanation:** VLOOKUP is fragile, depends on exact matches, and has no enforcement, which is why databases replace it with real relationships. A mistyped deliverable ID produces a silent error or wrong value — no referential integrity check exists.

**5. A retail analyst notices that "monthly...**
A retail analyst notices that "monthly sales" reports from two regions never match. The analyst discovers that Region A defines `OrderDate` as the date the order was placed, while Region B defines it as the date the order shipped. Which Chapter 3 concept would have prevented this?

[x] A shared data dictionary with a single definition of `OrderDate`
[ ] A more powerful dashboard tool
[ ] A faster database server
[ ] A larger spreadsheet with more rows

**Explanation:** A shared data dictionary locks in one definition. Without it, the same term can be used for different metrics across the organization, making data integration impossible.

**6. A grading sheet has `Score` stored...**
A grading sheet has `Score` stored as text (`"92"`, `"88"`, `"75"`). An analyst tries to calculate the average using a spreadsheet function. What happens, and why?

[ ] The average function converts text to zero, making the average too low
[ ] The spreadsheet automatically converts text to numbers before calculating
[x] The average function ignores text values, returning a wrong result or an error
[ ] The average calculates correctly because text and numbers are interchangeable

**Explanation:** If `Score` is stored as text, averages become fragile. Spreadsheet average functions typically ignore text cells or return errors rather than silently converting them, producing wrong results.

**7. A university wants to track student...**
A university wants to track student grades across multiple courses, instructors, and semesters. They currently use a single shared spreadsheet. Which is the strongest argument for moving to a database?

[x] The spreadsheet has repeated student names, mixed themes, and no way to enforce that a StudentID in a grade row matches a real student — databases solve all three problems
[ ] Spreadsheets cannot be shared with multiple users
[ ] Databases are newer technology than spreadsheets
[ ] Databases can store more colors than spreadsheets

**Explanation:** Databases directly address redundancy, mixed themes, and lack of referential integrity between records — the specific problems presented by tracking multiple interconnected domains in a flat spreadsheet.

**8. A hospital stores patient visit notes...**
A hospital stores patient visit notes as unstructured text files. The analytics team wants to use this data to predict readmission risk. According to Chapter 3, what must happen first before structured analysis is possible?

[ ] The text files must be converted to images for faster processing
[x] The unstructured text must be classified, cleaned, and routed into structured fields that capture the relevant information
[ ] The files must be deleted and re-entered by hand
[ ] The hospital must purchase a new database server

**Explanation:** Unstructured data like "emails, images, audio, PDFs, and videos" must be "classified, cleaned, and routed into structured tables for analysis." Relevant fields must be extracted from the unstructured notes first.

**9. A manager is choosing between keeping...**
A manager is choosing between keeping data in a shared Google Sheet and investing in a database. The data includes customer profiles, orders, products, and shipping records that multiple departments update daily. Which factor most strongly favors the database?

[ ] The Google Sheet has reached its row limit
[x] The data spans multiple related themes (customers, orders, products) that must stay connected while being updated independently — exactly what databases are designed to manage
[ ] The database software has a more attractive interface
[ ] Google Sheets cannot display charts

**Explanation:** The scenario presents multiple related themes updated independently by different departments — exactly the pattern that pushes organizations from spreadsheets toward databases. Databases separate themes into related tables while maintaining connections.

**10. Two proposed data designs are being...**
Two proposed data designs are being considered for a small business. Design A stores everything in one flat spreadsheet. Design B separates customers, orders, and products into related tables with shared identifiers. The business expects to grow from 100 to 10,000 customers over two years. Which design does Chapter 3's reasoning support, and why?

[ ] Design A, because flat files are faster than databases at any scale
[ ] Design A, because spreadsheets are always sufficient for business data
[ ] Design B, because databases are required by law for businesses with more than 1,000 customers
[x] Design B, because separating themes into related tables prevents redundancy, update anomalies, and the structural fragility that flat files exhibit as data grows

**Explanation:** Separating themes into related tables reduces repetition and makes updates more reliable. Flat files exhibit redundancy, update anomalies, and structural fragility as data grows. The growth trajectory makes Design B clearly superior.
