# Appendix B: Microsoft Access Tutorials

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

This appendix organizes the hands-on Microsoft Access instruction from across *Using Data to Drive Business Performance* into four graduated tutorials. Each tutorial references the corresponding chapter's Let's Build and Lab for complete step-by-step instructions, and includes key concepts, file locations, and troubleshooting guidance.

**How to use this appendix:** Start with Tutorial 1 if you are new to Access. Skip to Tutorial 2 or 3 if you need the relational design or normalization workflows. Use Tutorial 4 when you are ready for database administration tasks.

---

## Tutorial 1: Creating Your First Access Database

**Source:** Chapter 4 Let's Build & Lab 04  
**Skill level:** Beginner  
**Estimated time:** 60–90 minutes  
**Database file:** `LB04-GradingDatabase-YourName.accdb`

### What You Will Build

A flat grading database with two tables (`GRADEBOOK`, `GRADE_WEIGHT`), a data-entry form, four queries (filter, sort, aggregate, and join), and two reports — all without writing SQL. The companion Lab 04 transfers these same skills to the PetVax veterinary clinic.

### Key Skills

| Skill | Where Practiced |
|---|---|
| Create a blank Access database | Step 1 |
| Define fields with data types in Design View | Steps 2–3 |
| Set a primary key (AutoNumber) | Step 4 |
| Add validation rules (`BETWEEN`, `LIKE`, `IN`) | Step 5 |
| Make fields required (`NOT NULL`) | Step 6 |
| Enter records in Datasheet View | Step 8 |
| Test that validation rules block bad data | Step 9 |
| Generate a data-entry form from a table | Steps 14–16 |
| Build single-table queries in Query Design (filter, sort, aggregate) | Steps 17–20 |
| Build a query-level join across two tables | Step 21 |
| Generate reports from queries | Steps 22–23 |

### Design Decisions This Tutorial Teaches

1. **Flat design is deliberate.** The `GRADEBOOK` table stores student facts alongside grade facts — creating the redundancy that Chapters 6 and 7 will later fix. Understanding the flat-table problems makes the relational solution meaningful.

2. **StudentID is Short Text, not Number.** Identifiers are labels, not quantities. You never average or add StudentIDs. Using Short Text keeps that signal visible and prevents accidental arithmetic.

3. **A query-level join is not a relationship.** Tutorial 1 matches tables inside a query (`qryGradebookWithWeights`). No relationships are enforced. Tutorial 2 adds the Relationships window and referential integrity.

### Where to Find the Full Instructions

- **Let's Build 4:** `books/database-book/files/source/chapters/ch04-databases/lets-build.md` (23 steps)
- **Lab 04:** `books/database-book/files/source/labs/lab-04-intro-to-access/` (12 steps, 16 auto-graded Brightspace questions, PetVax domain)
- **Core Concepts 4:** `books/database-book/files/source/chapters/ch04-databases/core-concepts.md` (database theory behind the tutorial)

### Common Mistakes

| Mistake | Why It Happens | How to Fix It |
|---|---|---|
| Typing `RecordID` values manually | Forgetting that Access fills AutoNumber automatically | Delete the row, create a new one, let Access assign the number |
| Creating a form for the wrong table | Clicking the wrong table in the Navigation Pane before clicking Form | Delete the form, click `GRADEBOOK`, then Create → Form |
| Forgetting to set the Criteria row | Query returns all rows instead of filtered results | Reopen in Design View, type the condition in Criteria |
| Dragging the wrong field for a join | Dragging fields that don't match in meaning | Join `GRADEBOOK.DeliverableType` to `GRADE_WEIGHT.DeliverableType` |

### Transfer to PetVax (Lab 04)

Lab 04 applies Tutorial 1 skills to the PetVax veterinary clinic:
- Import `PETVAX_APPOINTMENTS` and `SERVICE_RATES` from CSV
- Set primary keys and validation rules
- Build `frmPETVAX_APPOINTMENTS` form
- Create `qryNoShows`, `qryVaccineDue`, `qryAveragePaymentByService`, `qryAppointmentsWithRates`
- Generate `rptNoShows`
- Compact & Repair before submission

---

## Tutorial 2: Building Relational Databases in Access

**Source:** Chapter 6 Core Concepts (§8) & Let's Build  
**Skill level:** Intermediate  
**Prerequisite:** Tutorial 1  
**Estimated time:** 90–120 minutes  
**Database file:** `LB06-GradingDatabase-Relational-YourName.accdb`

### What You Will Build

A seven-table relational grading database with enforced relationships and referential integrity — the full schema that supports the rest of the course. You will move from Tutorial 1's two flat-related tables to a properly normalized structure where each subject lives in its own table and keys connect them.

### The Seven-Table Schema

```
STUDENT(StudentID, FirstName, LastName, Email, Birthday)
DELIVERABLE(DeliverableID, DeliverableType, DeliverableNumber, DueDate, Topic, MaxScore)
STUDENT_GRADE(StudentGradeID, StudentID, DeliverableID, Score)
ASSIGNMENT_TYPE(DeliverableType, ItemCount, CategoryWeight, WeightPerItem)
SCHEDULE(ScheduleID, ClassDate, ClassTopic)
ATTENDANCE(AttendanceID, StudentID, ScheduleID, Status)
GRADE_SCALE(LetterGrade, MinScore)
```

### Key Skills

| Skill | Where Practiced |
|---|---|
| Create tables with surrogate AutoNumber primary keys | Building `STUDENT`, `DELIVERABLE`, `STUDENT_GRADE` |
| Match foreign key data types to the referenced primary key | AutoNumber PK → Short Text FK mismatch |
| Define relationships in the Relationships window | Dragging PK → FK for all 5 relationships |
| Enforce referential integrity (RI) | Check the "Enforce Referential Integrity" checkbox |
| Understand cascade options | Cascade Update Related Fields vs. Cascade Delete |
| Test RI: try inserting an orphan record | Insert `STUDENT_GRADE` row with `StudentID='S9999'` |
| Test RI: try deleting a referenced parent | Delete Alice from `STUDENT` while grades reference her |
| Build multi-table queries with calculated fields | `qryWeightedContribution` — 4-table JOIN + `Score * WeightPerItem` |
| Build a LEFT JOIN attendance summary with NULL handling | `qryAttendanceSummary` — LEFT JOIN + `IIf`/`Nz` |
| Build a CROSS JOIN + anti-join pattern (stretch) | `qryMissingGrades` — find students missing grades for active deliverables |

### Design Decisions This Tutorial Teaches

1. **Surrogate keys everywhere.** Every table gets its own AutoNumber PK. `StudentGradeID`, `DeliverableID`, `AttendanceID` — these have no business meaning and never change, which makes them stable foreign key targets.

2. **Number PK → Short Text FK is a trap.** Access AutoNumbers are `Long Integer`. If you create a foreign key as Short Text, the relationship cannot be enforced. Always check the data type in Design View before opening the Relationships window.

3. **Referential integrity is the database's immune system.** It prevents orphan records — child rows that point to parents that don't exist. Test it: try to insert a grade for a student who isn't in the `STUDENT` table. Access should refuse.

4. **The Relationships window is permanent. A query-level join is temporary.** Tutorial 1's joins lived only inside individual queries. Tutorial 2's relationships are enforced by the DBMS for every query, form, and report — automatically.

### Where to Find the Full Instructions

- **Core Concepts 6 (§8):** `books/database-book/files/source/chapters/ch06-relational-model/core-concepts.md` (Microsoft Access as a Visual Learning Tool — 5 sub-sections)
- **Let's Build 6:** `books/database-book/files/source/chapters/ch06-relational-model/lets-build.md` (seeding data, 3 advanced queries)
- **Lab 06:** `books/database-book/files/source/labs/lab-06-relational-model/` (PetVax relational build with CSV imports and `.accdb` starter file)

### Common Mistakes

| Mistake | Why It Happens | How to Fix It |
|---|---|---|
| Data type mismatch between PK and FK | Creating FK as Short Text when PK is AutoNumber | Open FK table in Design View, change FK field to Number (Long Integer) |
| Forgetting to save a table before creating relationships | Access needs saved tables with defined PKs | Save and close all tables, then open Relationships window |
| Dragging the wrong direction in Relationships | Dragging from child to parent instead of parent to child | Drag FROM the primary key table TO the foreign key table |
| Leaving orphan records before enabling RI | Existing data already violates the rule | Find and fix orphan rows with an unmatched query before enforcing RI |

---

## Tutorial 3: Normalization Workflow in Access

**Source:** Chapter 7 Let's Build (current) & historical Appendix B (`ch07-main-2026-05-21.md`)  
**Skill level:** Intermediate–Advanced  
**Prerequisite:** Tutorial 2  
**Estimated time:** 90–120 minutes  
**Database file:** Start from Tutorial 1's flat `GRADEBOOK` table

### What You Will Do

Start with the flat, redundant `GRADEBOOK` table from Tutorial 1 and normalize it into the relational structure from Tutorial 2 — using only Access tools. You will diagnose what is wrong with the flat design, create normalized tables, migrate data with append queries, enforce relationships, and verify that the normalized design produces identical reports.

### The 9-Step Normalization Workflow

1. **Diagnose the flat table.** Open `GRADEBOOK` and identify: repeated student facts (Alice's email appears 3 times), repeated deliverable facts (Quiz 1 due date appears 4 times), missing records (Daniel has no grade yet), and the themes mixed together (students + deliverables + scores).

2. **Create the normalized tables in Design View.** Build `STUDENT`, `ASSIGNMENT_TYPE`, `DELIVERABLE`, and `STUDENT_GRADE` with appropriate primary keys, data types, and field sizes.

3. **Choose data types carefully.** `StudentID` is Short Text (identifier). `Score` is Number. `DueDate` is Date/Time. `Email` is Short Text. Foreign keys must match the primary key's data type exactly.

4. **Build the foreign key fields.** `STUDENT_GRADE` needs `StudentID` (Short Text) and `DeliverableID` (Number, matching `DELIVERABLE.DeliverableID`'s AutoNumber type).

5. **Open the Relationships window.** Add all four tables. Drag `STUDENT.StudentID` → `STUDENT_GRADE.StudentID`. Drag `DELIVERABLE.DeliverableID` → `STUDENT_GRADE.DeliverableID`. Check "Enforce Referential Integrity" on both.

6. **Migrate data with append queries in SQL View.** Write four `INSERT INTO ... SELECT DISTINCT` queries to extract unique student facts, unique deliverable facts, unique assignment-type facts, and all grade records from the flat `GRADEBOOK` into the normalized tables.

7. **Save and run each append query.** Access will warn about the number of rows being appended. Confirm the counts match your expectations before proceeding.

8. **Test referential integrity.** Try inserting a grade for a non-existent student (`StudentID='S9999'`). Access should refuse. Try deleting a student who has grades. Access should refuse.

9. **Rebuild the flat report as a query.** Write `q05_Grade_Report_Normalized` using a 4-table JOIN to reconstruct the original `GRADEBOOK` view. Verify the output matches the original flat table.

### The Append Query Pattern

```sql
INSERT INTO STUDENT (StudentID, FirstName, LastName, Email, Birthday)
SELECT DISTINCT GRADEBOOK.StudentID, GRADEBOOK.FirstName, 
       GRADEBOOK.LastName, GRADEBOOK.Email, GRADEBOOK.Birthday
FROM GRADEBOOK;
```

Repeat this pattern for `ASSIGNMENT_TYPE`, `DELIVERABLE`, and `STUDENT_GRADE` — each extracting one theme from the flat table.

### The Lookup Wizard Warning

Access offers a **Lookup Wizard** that creates dropdown lists in tables. It looks like a relationship. It is not a relationship. A lookup hides the real foreign key value behind a display value, which confuses SQL queries, makes debugging harder, and breaks when the lookup source changes. **Never use the Lookup Wizard in table design.** Define relationships in the Relationships window instead.

### Where to Find the Full Instructions

- **Let's Build 7:** `books/database-book/files/source/chapters/ch07-normalization/lets-build.md` (complete normalization walkthrough with SQL append queries, options for AutoNumber PK vs. preserving existing IDs, midterm review checklist)
- **Core Concepts 7:** `books/database-book/files/source/chapters/ch07-normalization/core-concepts.md` (1NF, 2NF, 3NF theory)
- **Lab 07:** `books/database-book/files/source/labs/lab-07-normalization/` (PetVax normalization from flat CSV to relational `.accdb`)

---

## Tutorial 4: Database Administration in Access

**Source:** BITM330-BOOK-Notes2.md (DBA Lab Appendix)  
**Skill level:** Advanced  
**Prerequisite:** Tutorials 1–3  
**Estimated time:** 90–120 minutes  
**Domain:** VetClinic (PetVax)  

### What You Will Do

Move beyond building and querying to administering — the tasks that keep a production database reliable, fast, secure, and recoverable. You will create a small veterinary clinic database, then apply systematic administration practices: compact and repair, backup and restore, performance optimization, automation with macros, and security configuration.

### Part 1: Creating the VetClinic Database

Create `VetClinic.accdb` with three tables connected by foreign keys and referential integrity:

**OWNER**(OwnerID AutoNumber PK, FirstName Short Text, LastName Short Text, Phone Short Text, Email Short Text)  
**PET**(PetID AutoNumber PK, PetName Short Text, Species Short Text, Breed Short Text, BirthDate Date/Time, OwnerID Number FK → OWNER.OwnerID)  
**VISIT**(VisitID AutoNumber PK, VisitDate Date/Time, Reason Short Text, Diagnosis Short Text, TreatmentCost Currency, PetID Number FK → PET.PetID)

Open the Relationships window, add all three tables, drag `OWNER.OwnerID` → `PET.OwnerID`, drag `PET.PetID` → `VISIT.PetID`. Check **Enforce Referential Integrity** and **Cascade Update Related Fields** on both relationships. Do not check Cascade Delete — deleting an owner should not automatically delete their pets.

### Part 2: Populating Data

Enter at least 3 owners, 5 pets (distributed across the owners), and 8 visits (distributed across the pets) directly in Datasheet View. Use realistic veterinary data: routine checkups, vaccinations, injury treatments, follow-ups.

### Part 3: Managing Relationships

**Test referential integrity.** Try to add a visit with `PetID=999` (a pet that does not exist). Access should refuse.

**Test cascade update.** Change an OwnerID value in the `OWNER` table. The corresponding `PET.OwnerID` values should update automatically (because Cascade Update Related Fields is enabled).

**Test the absence of cascade delete.** Try to delete an owner who has pets. Access should refuse — preventing accidental loss of pet and visit records.

### Part 4: Compact and Repair Database

Access databases grow over time as records are added, deleted, and modified. The Compact and Repair operation reclaims unused space and rebuilds internal indexes.

1. Click **File** → **Info** → **Compact & Repair Database**. Access closes, compacts, and reopens the file.
2. Compare the file size before and after.
3. Enable automatic compacting: **File** → **Options** → **Current Database** → check **Compact on Close**.

### Part 5: Backup and Restore

**Manual backup.** Close the database. In Windows File Explorer, copy `VetClinic.accdb` to a backup folder. Rename it `VetClinic_backup_YYYY-MM-DD.accdb` with today's date.

**Restore.** Close the working database. Copy the backup file back to the working folder and remove the date suffix. Open and verify all tables, queries, and relationships are intact.

**Scheduled backup (Windows Task Scheduler).** Create a basic task that runs a PowerShell script to copy the `.accdb` file to a backup location daily. The script:
```powershell
$source = "C:\Databases\VetClinic.accdb"
$dest = "C:\Backups\VetClinic_backup_$(Get-Date -Format 'yyyy-MM-dd').accdb"
Copy-Item $source $dest
```

### Part 6: Query Optimization and Indexing

**Create an index.** Open `VISIT` in Design View. Click `VisitDate`. In Field Properties, set **Indexed** to **Yes (Duplicates OK)**. This speeds up queries that filter or sort by visit date. Use "No Duplicates" only for fields that must have unique values across all rows, such as an email address or employee ID.

**Run the Performance Analyzer.** Click **Database Tools** → **Analyze Performance**. Select all objects and click OK. Review the recommendations (add indexes, convert macros to VBA). Apply the suggestions that make sense for your workload — not every recommendation needs to be followed.

### Part 7: Automating DBA Tasks with Macros

**Maintenance Macro.** On the **Create** tab, click **Macro**. Build a macro that runs `CompactDatabase` on the current database, then saves and closes. Name it `mcrMaintenance`. This gives you a one-click maintenance button.

```
Macro: mcrMaintenance
  Action: RunMenuCommand
    Command: CompactDatabase
```

**Backup Macro (VBA).** Create a module with a VBA function that copies the current database to a backup folder with a timestamp:

```vba
Public Sub BackupDatabase()
    Dim sourcePath As String
    Dim backupPath As String
    Dim timestamp As String
    
    sourcePath = CurrentDb.Name
    timestamp = Format(Now, "yyyy-MM-dd_HHmmss")
    backupPath = "C:\Backups\VetClinic_backup_" & timestamp & ".accdb"
    
    FileCopy sourcePath, backupPath
    MsgBox "Backup saved to " & backupPath
End Sub
```

### Part 8: Security and Permissions

**Windows folder permissions.** Place the database in a folder with restricted access. Right-click the folder → **Properties** → **Security** → restrict to specific users or groups. This is the simplest and most effective Access security measure.

**Split database architecture.** Separate the database into two files:
- **Back-end:** Contains only the tables and data (`VetClinic_Data.accdb`)
- **Front-end:** Contains queries, forms, reports, macros, and linked table references (`VetClinic_App.accdb`)

Use the **Database Splitter** wizard (**Database Tools** → **Access Database** → **Split Database**) or do it manually: import tables into a new database, then use **External Data** → **Linked Table Manager** to link the front-end to the back-end.

**Encrypt with password.** **File** → **Info** → **Encrypt with Password**. Set a strong password. This encrypts the entire database file. You must enter the password every time you open it. Store the password in a secure location — there is no password recovery.

### Part 9: Access vs. SQLite DBA Comparison

| DBA Task | Microsoft Access | SQLite |
|---|---|---|
| Compact/Reclaim space | Compact & Repair (built-in) | `VACUUM;` command |
| Backup | File copy (.accdb) | File copy (.sqlite) or `.dump` |
| Indexing | Design View → Indexed property | `CREATE INDEX` SQL statement |
| Automation | Macros + VBA | Shell scripts + `.sql` files |
| Security | Folder permissions + password encryption | File permissions (no built-in encryption in standard SQLite) |
| Multi-user | Split database (front-end/back-end) | Not designed for concurrent writes; use client-server DBMS for multi-user |
| Performance analysis | Performance Analyzer wizard | `EXPLAIN QUERY PLAN` SQL statement |
| Migration | Import/Export wizards | `.dump` + `.read` or CSV import |

### Part 10: Lab Assignment

**Scenario:** You are the database administrator for VetClinic. The practice manager has asked you to ensure the database is reliable, recoverable, and performing well.

**Deliverables:**
1. `VetClinic.accdb` — fully built database with data, relationships, and RI
2. `VetClinic_DBA_Report.pdf` — a short report documenting:
   - Your compact & repair results (before/after file sizes)
   - Your backup strategy (screenshot of the backup folder with dated files)
   - Your indexing decisions (which fields you indexed and why)
   - Your security configuration (which measures you applied and why)
3. `VetClinic_Reflection.md` — answers to the Discussion Questions below

**Discussion Questions:**
1. Why does an Access database file grow over time even when you delete records?
2. What is the difference between Cascade Update and Cascade Delete? When would you use each?
3. Why might you choose NOT to enable Cascade Delete on a relationship?
4. What are the trade-offs of splitting a database into front-end and back-end files?

### Where to Find This Content

This tutorial is extracted from `BITM330-BOOK-Notes2.md` (Lab Appendix: Database Administration Hands-On with Microsoft Access). The corresponding chapter concepts are in:
- **Core Concepts 11:** `books/database-book/files/source/chapters/ch11-database-administration/core-concepts.md` (DBA theory, backup/recovery, security, performance)
- **Lab 11:** `books/database-book/files/source/labs/lab-11-database-admin/` (PetVax DBA lab)

---

## Tutorial Map: Which Tutorial for Which Skill

| If you need to... | Go to... |
|---|---|
| Create your first table with a primary key | Tutorial 1 |
| Add validation rules that block bad data | Tutorial 1 |
| Build a query without writing SQL | Tutorial 1 |
| Connect tables with enforced relationships | Tutorial 2 |
| Understand referential integrity and cascade options | Tutorial 2 |
| Build a multi-table query with calculated fields | Tutorial 2 |
| Fix a flat table by normalizing it | Tutorial 3 |
| Migrate data with append queries | Tutorial 3 |
| Avoid the Lookup Wizard trap | Tutorial 3 |
| Compact and repair a growing database | Tutorial 4 |
| Set up automated backups | Tutorial 4 |
| Index fields for faster queries | Tutorial 4 |
| Automate maintenance with macros and VBA | Tutorial 4 |
| Secure a database with encryption and split architecture | Tutorial 4 |

---

*Generated: 2026-06-21*
