<!-- metadata: date="2026-06-11"; chapter="13"; type="source"; title="Source: Lesson Script" -->

# Chapter 13 Lesson Script: Advanced Database Techniques with Microsoft Access

## Lesson Snapshot

- Duration: 60 minutes
- Course context: BITM 330, Chapter 13
- Platform: Microsoft Access with the Grading Database
- Teaching mode: short lecture plus guided live demo plus student follow-along

## Learning Outcomes

By the end of this lesson, students should be able to:

1. Explain why advanced database techniques matter after a database already "works."
2. Explain the relationship structure among `STUDENT`, `DELIVERABLE`, `WEIGHT`, and `STUDENT_GRADE` in Microsoft Access.
3. Use Microsoft Access design settings to improve performance and data quality.
4. Build a simple grade-entry form that uses dropdowns for students and deliverables.
5. Distinguish among indexes, macros, and VBA and explain when each one is used.
6. Connect indexing, validation, form design, automation, and security to the Grading Database.
7. Distinguish between what Access handles well and what would require a server DBMS such as SQL Server or PostgreSQL.

## Materials and Setup

- Microsoft Access installed and open
- Grading Database available before class starts
- Tables visible in the Navigation Pane: `STUDENT`, `STUDENT_GRADE`, `DELIVERABLE`, `WEIGHT`, `ATTENDANCE`
- Relationship diagram available: `.docs/lets-build/relationship.png`
- A few saved queries or reports already present, if available
- Projector ready for switching between Design View, Datasheet View, Relationships, forms, macros, and queries

## Instructor Preparation

Before class:

1. Open the Grading Database and confirm sample data is loaded.
2. Make sure `Email` exists in `STUDENT` and `Grade` or `Score` exists in `STUDENT_GRADE`.
3. If possible, create a copy of the database so you can demonstrate safe updates without risking the working file.
4. Prepare one simple summary query that shows average score by student or by deliverable.
5. Open `Database Tools` -> `Relationships` and confirm the same connections shown in `.docs/lets-build/relationship.png` appear in Access.
6. If you plan to show automation, prepare one simple form with a button or confirm that `Create` -> `Macro` is available.
7. If macro security prompts appear when the file opens, click `Enable Content` before class starts.

## Relationship Map for This Lesson

Use this language at the start of class:

- `STUDENT` stores one row per student.
- `DELIVERABLE` stores one row per assignment, quiz, exam, or project item.
- `WEIGHT` stores point and quantity rules for deliverable types.
- `STUDENT_GRADE` connects a student to a deliverable and stores the earned grade.

Teaching interpretation of the relationship diagram:

- One student can appear in many grade records.
- One deliverable can appear in many grade records.
- One deliverable type can connect to weighting rules.
- `STUDENT_GRADE` is the table where relationships become action because it joins students to specific course work.

## One-Hour Agenda

| Time | Segment | Goal |
| --- | --- | --- |
| 0-8 min | Opening frame and relationships | Use the diagram to ground the whole lesson |
| 8-18 min | Indexes in Access | Define indexes and show where to create them |
| 18-28 min | Constraints and validation | Prevent bad data at the point of entry |
| 28-40 min | Grade-entry form with dropdowns | Build a practical interface for entering grades |
| 40-48 min | Access macros | Add simple workflow automation to the form |
| 48-55 min | VBA and transaction thinking | Show where code fits when macros are not enough |
| 55-58 min | Analytics and platform limits | Use grading queries and discuss window-function gaps |
| 58-60 min | Security close and recap | Connect technique choices to trust and governance |

## Detailed Lesson Script

## 0-8 Minutes: Opening Frame and Relationship Diagram

Instructor says:

"So far, we have spent a lot of time making sure our queries are correct. Today we shift to a harder question: what happens when the database is used repeatedly, by multiple people, with real consequences? In a grading system, being correct once is not enough. The system also has to stay fast, prevent mistakes, and protect sensitive data."

"Chapter 13 is about turning a working database into a reliable one. In Access, we will not see every enterprise feature, but we can see the design mindset clearly. The relationship diagram tells us where reliability matters most."

Instructor does:

1. Open the Grading Database.
2. Show the main tables in the Navigation Pane.
3. Go to `Database Tools` -> `Relationships`.
4. If needed, click `Show Table` and add `STUDENT`, `DELIVERABLE`, `WEIGHT`, and `STUDENT_GRADE` to the Relationships window.
5. Point to the lines between the tables and explain that the lines represent relationships between primary keys and matching foreign keys.
6. Briefly remind students that grades are sensitive, errors matter, and late fixes are expensive.

Instructor says while showing the relationship window:

"This picture is the whole logic of the grading system. `STUDENT` and `DELIVERABLE` do not directly store the final story. `STUDENT_GRADE` brings them together. That means if we teach indexes, VBA, and macros well, we should teach them around this relationship structure, not as isolated features."

Student follow-along:

1. Open the same database.
2. Click `Database Tools`.
3. Click `Relationships`.
4. Identify which field connects `STUDENT` to `STUDENT_GRADE`.
5. Identify which field connects `DELIVERABLE` to `STUDENT_GRADE`.
6. Write one sentence: `STUDENT_GRADE` exists because __________.

Ask the class:

- "What could go wrong in a grading database even if the SQL syntax is correct?"
- "Which matters more to an instructor: a correct report, a fast report, or a secure report?"

Expected student responses:

- Slow reports
- Wrong or duplicate grades
- Unauthorized edits
- Missing or inconsistent updates

Transition line:

"Now that we know where the relationships live, we can move through the same sequence an instructor would actually use: indexes, validation, a grade-entry form, macros, and then VBA."

## 8-18 Minutes: Indexes in Access

Teaching goal:

Students see that performance is a design choice, not magic.

Instructor says:

"An index is a structure that helps Access find rows faster. Think of it like the index in a textbook. The book still has the same pages, but the index helps you jump to the topic you want instead of scanning every page."

"In the Grading Database, fields like `StudentID`, `DeliverableID`, and `Email` are strong candidates because we join, search, and filter on them repeatedly. The relationship diagram tells us exactly where indexes matter: on keys we use to connect tables and on fields we search often."

Plain-language definition to give students:

- Primary key index: helps Access find one specific record quickly.
- Foreign key index: helps Access match related rows across tables quickly.
- Unique index: helps Access prevent duplicate values, such as repeated email addresses.

Instructor step-by-step demo:

1. In the Navigation Pane, right-click `STUDENT` and choose `Design View`.
2. Click the `StudentID` field.
3. Point out the key icon and explain that primary keys are indexed because Access needs them for fast identification.
4. Click the `Email` field.
5. In the lower `Field Properties` pane, find `Indexed`.
6. Change `Indexed` to `Yes (No Duplicates)`.
7. Press `Ctrl+S` or click `Save`.
8. Close the table.
9. Right-click `STUDENT_GRADE` and choose `Design View`.
10. Click `StudentID`.
11. In `Field Properties`, set `Indexed` to `Yes (Duplicates OK)`.
12. Click `DeliverableID`.
13. Set `Indexed` to `Yes (Duplicates OK)`.
14. Save the table.

What to say during the demo:

- "`StudentID` in `STUDENT` is a primary key. Each value must be unique, so Access treats it as a key field."
- "`StudentID` in `STUDENT_GRADE` is different. Many rows can contain the same student because one student can receive many grades. That is why we use `Duplicates OK` on the index."
- "`Email` is not the primary key here, but it is still a field we may search often, and we probably do not want duplicates."

Student follow-along guide:

1. Open `STUDENT` in `Design View`.
2. Click `Email`.
3. Find the `Indexed` property in the bottom half of the screen.
4. Set it to `Yes (No Duplicates)`.
5. Save the table.
6. Open `STUDENT_GRADE` in `Design View`.
7. Click `StudentID`, then `DeliverableID`.
8. Confirm both fields use `Yes (Duplicates OK)`.
9. Return to the Relationships window and explain to a partner why the two settings are different.

Instructor says during demo:

"This is one of the best examples of one design choice doing two jobs at once. For `Email`, the index helps us search quickly and also helps us stop accidental duplicate records. On foreign-key fields, the index improves matching speed across related tables."

Quick check question:

"Why would we not index every field in every table?"

Target answer:

Because indexes improve reads but add overhead to inserts, updates, storage, and maintenance.

## 18-28 Minutes: Constraints and Validation in Access

Teaching goal:

Students see how Access enforces data quality before bad data spreads.

Instructor says:

"Primary keys keep rows unique, but they do not guarantee the values make sense. A score of 145 can still be unique and still be wrong. Advanced database work means we turn assumptions into rules."

Live demo:

1. Open `STUDENT_GRADE` in Design View.
2. Select the `Score` field.
3. Set the Validation Rule to `Between 0 And 100`.
4. Set Validation Text to `Score must be between 0 and 100`.
5. Save the table.
6. Switch to Datasheet View and attempt to enter an invalid score such as `145`.
7. Let Access reject the value and read the message aloud.
8. Open `ATTENDANCE` and point out a field where only limited values should be allowed.

Instructor says during demo:

"Notice what happened. We did not wait for a report to reveal the mistake. We blocked the mistake at entry. That is cheaper, safer, and easier to audit."

Ask the class:

- "Why is preventing bad data better than cleaning it later?"
- "What other fields in this database should have validation rules?"

Good examples to pull from students:

- Email required
- Due date required
- Attendance limited to approved values
- One grade per student per deliverable

Bridge line:

"Indexes help Access find and match data. Validation rules help Access reject bad data. The next step is to give instructors and students a better way to enter grades than typing directly into a table."

## 28-40 Minutes: Grade-Entry Form With Dropdowns

Teaching goal:

Students see how Microsoft Access forms make a normalized table easier to use without changing the underlying relationships.

Instructor says:

"The `STUDENT_GRADE` table should store IDs because that is how relationships stay consistent. But instructors do not want to enter grades by memorizing `StudentID` and `DeliverableID` values. A form solves that problem. It can show student names and assignment names in dropdowns while still saving the correct IDs in the table."

"This is an important design lesson. We are not changing the database structure. We are building a better interface on top of the structure."

Instructor step-by-step demo:

1. In the Navigation Pane, click the `STUDENT_GRADE` table once.
2. Click `Create` -> `Form Wizard`.
3. Make sure the selected source is `Table: STUDENT_GRADE`.
4. Move these fields into the selected list: `StudentID`, `DeliverableID`, and `Grade` or `Score`.
5. Click `Next`.
6. Choose `Columnar` for a simple beginner layout.
7. Click `Next`.
8. Name the form `frmGradeEntry`.
9. Choose `Modify the form's design`.
10. Click `Finish`.
11. In `Design View`, click the `StudentID` control.
12. If it is a text box, replace it with a `Combo Box` from the `Controls` group.
13. When the wizard opens, choose `I want the combo box to get the values from another table or query`.
14. Select the `STUDENT` table.
15. Choose the fields `StudentID`, `FirstName`, and `LastName`.
16. Sort by `LastName`.
17. Store the selected value in the `StudentID` field.
18. Finish the wizard.
19. Repeat the process for `DeliverableID`, but use the `DELIVERABLE` table and select `DeliverableID` plus the assignment-name field used in your database.
20. In `Design View`, click `Button` in the `Controls` group and place a button near the bottom of the form.
21. If the Command Button Wizard opens, choose `Record Operations` -> `Save Record`.
22. Set the button text to `Save Grade`.
23. Finish the wizard.
24. Save the form.
25. Switch to `Form View` and test one grade entry.
26. Change one value and click `Save Grade` so students can see a deliberate save action.

What to say during the demo:

- "The form is based on `STUDENT_GRADE` because that is where the grade record belongs."
- "The dropdown displays names, but Access still stores the key value."
- "This keeps the database normalized and still makes data entry human-friendly."
- "The `Save Grade` button gives the instructor a clear finish point for each entry instead of leaving the save step invisible."

Property Sheet checks to show on screen:

1. Click the student combo box.
2. Press `F4` if the `Property Sheet` is not visible.
3. Confirm `Control Source` is `StudentID`.
4. Confirm `Bound Column` is `1`.
5. Confirm `Column Count` is `2` or `3`, depending on how the wizard built the list.
6. Show `Column Widths` and explain that the ID column can be hidden while the student name is shown.

Example row source to show if you want one polished dropdown query:

```sql
SELECT StudentID, LastName & ", " & FirstName AS StudentName
FROM STUDENT
ORDER BY LastName, FirstName;
```

Student follow-along guide:

1. Open the `STUDENT_GRADE` table.
2. Use `Create` -> `Form Wizard` to build a basic form.
3. Add `StudentID`, `DeliverableID`, and `Grade` or `Score`.
4. Save the form as `frmGradeEntry`.
5. In `Design View`, turn `StudentID` into a combo box that reads from `STUDENT`.
6. Turn `DeliverableID` into a combo box that reads from `DELIVERABLE`.
7. Add one button that uses `Record Operations` -> `Save Record` and label it `Save Grade`.
8. Save the form.
9. In `Form View`, enter one test grade using the dropdowns and click `Save Grade`.
10. Explain to a partner why the form shows names even though the table stores IDs.

Bridge line:

"Now that we have a form that makes grade entry easier, the next step is to automate common actions on that form. That is where macros help first."

## 40-48 Minutes: Access Macros

Teaching goal:

Students see how Access can enforce workflow at the interface level.

Instructor says:

"A macro in Access is a no-code or low-code automation tool. Instead of writing program statements line by line, you choose actions from menus such as `OpenQuery`, `OpenForm`, `MessageBox`, or `Requery`."

"Not every rule belongs in SQL. Access is also an application platform. Macros help us guide user behavior so the database is easier to use correctly."

Plain-language definition to give students:

- Macro: a saved sequence of Access actions.
- VBA: written code for more detailed logic.
- Good rule of thumb: start with a macro for simple interface automation and use VBA when the logic becomes more complex.

Keep this explanation simple for the class:

- Standalone macro: a macro you build from `Create` -> `Macro` and save as its own object.
- Embedded macro: a macro attached to a form control such as a button's `On Click` event.
- Data macro: a macro attached to a table event such as `Before Change` or `After Insert`.

Instructor says:

"Do not treat all macros as the same thing. Access gives us three different places to automate. A standalone macro runs as its own object. An embedded macro runs from a form or report event. A data macro runs when table data changes."

### Macro Designer Options to Show Slowly

Show these parts of the Macro Designer window one at a time:

1. `Action Catalog`: the list of available actions.
2. `Add New Action`: the place where you choose the next step in the macro.
3. Action arguments: the settings that appear under each action, such as query name or message text.
4. `MessageBox`: shows instructions or warnings to the user.
5. `OpenQuery`: runs or opens a saved query.
6. `OpenForm`: opens another form.
7. `Requery`: refreshes the data shown on a form or report.
8. `If`: lets the macro branch based on a condition.
9. `RunMenuCommand`: tells Access to perform a built-in command.
10. Table-event actions in data macros, such as `RaiseError` or `CreateRecord`, appear only when you are editing a data macro.

What to say while showing the Macro Designer:

- "The action catalog is the menu of things Access can do for us."
- "Each row in the macro is one instruction."
- "The arguments below the action are the details that make the instruction specific."
- "Do not panic if your action list does not match mine exactly. Access shows different actions in standalone macros, embedded macros, and data macros."
- "If students get lost, come back to one question: what action should Access do next?"

Live demo:

Start with a very simple standalone macro so the class sees the Macro Designer without too many moving parts. After that, show how the same idea connects to the grade-range example and then to data macros.

### Simple Demo 1: Standalone Macro in Macro Designer

1. Go to `Create` -> `Macro`.
2. If the `Action Catalog` is hidden, click `Action Catalog` on the ribbon so students can see the action list.
3. Click `Add New Action`.
4. Choose `MessageBox`.
5. In the message text box, type `Remember to save the current grade before moving to the next student.`
6. Click the next `Add New Action` row.
7. Choose `OpenQuery`.
8. In `Query Name`, choose a simple existing query, such as an average-grade query or one of the projected-grade queries if you already built them.
9. Click `Save` and name the macro `mcrGradeReminder`.
10. Double-click `mcrGradeReminder` in the Navigation Pane to test it.
11. Tell students what happened in order: first Access showed a message, then Access opened a query.

Instructor says during this first demo:

- "This is the easiest way to understand macros."
- "A macro is just a list of actions in the order we want Access to perform them."
- "Do not worry about advanced logic yet. First learn to recognize actions, arguments, and sequence."

### Simple Demo 2: Embedded Macro on the Form

1. Open `frmGradeEntry` in `Design View`.
2. Add a button if the form does not already have one.
3. Open the button's `Property Sheet`.
4. Click the `Event` tab.
5. Click inside `On Click`.
6. Choose `Embedded Macro` or `Macro Builder`, depending on what Access shows.
7. Add a `MessageBox` action that says `Grade saved. You can now review the projected range.`
8. Save the embedded macro.
9. Save the form.
10. Switch to `Form View` and click the button.

Instructor says:

"Now students can see the difference. The standalone macro lives in the Navigation Pane as its own object. The embedded macro lives inside the form event."

### Simple Demo 3: Data Macro

Instructor says:

"A data macro is different because it does not wait for a button click. It runs when table data changes."

Choose one very simple example: stop an invalid grade before it is saved.

1. In the Navigation Pane, right-click `STUDENT_GRADE` and choose `Design View`.
2. On the ribbon, find the `Table` tab or the area that shows table events.
3. Click `Before Change` to open a data macro.
4. In the data macro window, add an `If` action.
5. In the condition box, type `[Score] < 0 Or [Score] > 100`.
6. Inside the `If` block, add a `RaiseError` action.
7. In the error message box, type `Score must stay between 0 and 100.`
8. Save the data macro.
9. Save the table.
10. Switch to Datasheet View and try entering an invalid score such as `145`.
11. Show that the data macro blocks the save.

Explain the purpose clearly:

- Standalone macro: good for running a sequence of Access actions.
- Embedded macro: good for button clicks and form events.
- Data macro: good for table-level rules that should happen whenever data changes.

### Optional Advanced Example: Projected Grade Range Macro

If the instructor is comfortable, connect the earlier query work to a more useful standalone macro.

1. Build or confirm these saved queries: `qryMissingGradesThroughDate`, `qryProjectedMinGrade`, and `qryProjectedMaxGrade`.
2. Go to `Create` -> `Macro`.
3. Add `OpenQuery` for `qryMissingGradesThroughDate`.
4. Add `MessageBox` with `Check that all grades due by the cutoff date are filled before using the projections.`
5. Add `OpenQuery` for `qryProjectedMinGrade`.
6. Add `OpenQuery` for `qryProjectedMaxGrade`.
7. Add `MessageBox` with `The first projection is the minimum if future work becomes 0. The second projection is the maximum if future work becomes 100.`
8. Save the macro as `mcrProjectedGradeRange`.
9. Attach it to a button labeled `Show Projected Grade Range` on `frmGradeEntry`.

### Optional Advanced Example: Set All Grades After a Date to 100

Use this example only after warning students that update queries change many rows at once.

Instructor says:

"This example is powerful and dangerous. We are going to change many records with one action, so we must preview the records first before we run the update."

Business goal:

- Any deliverable after a chosen cutoff date should have its grade changed to `100`.

Safer teaching rule:

- First build a preview query.
- Then build the update query.
- Then build the macro that runs the update query.

Step 1: Build the preview query first

1. Click `Create` -> `Query Design`.
2. In the `Show Table` window, add `STUDENT_GRADE` and `DELIVERABLE`.
3. Close the `Show Table` window.
4. Confirm that `STUDENT_GRADE.DeliverableID` is joined to `DELIVERABLE.DeliverableID`.
5. In the query grid, add these fields: `StudentID`, `DeliverableID`, `Score` or `Grade`, and `DueDate`.
6. In the `DueDate` column, under `Criteria`, type `> [Enter cutoff date:]`.
7. Click `Run`.
8. When Access prompts for a date, enter a sample cutoff date.
9. Check that the records shown are exactly the grades you intend to change.
10. Save the query as `qryPreviewGradesAfterDate`.

Instructor says:

- "Never skip the preview query when you teach an update query."
- "If the preview is wrong, the update will also be wrong."

Step 2: Build the update query

1. Click `Create` -> `Query Design`.
2. Add `STUDENT_GRADE` and `DELIVERABLE`.
3. Close the `Show Table` window.
4. Confirm the join between the `DeliverableID` fields.
5. On the ribbon, click `Update`.
6. Add the grade field to the grid, either `Score` or `Grade`.
7. In the `Update To` row under that field, type `100`.
8. Add `DueDate` to the grid.
9. In the `Criteria` row under `DueDate`, type `> [Enter cutoff date:]`.
10. Click `Save` and name the query `qrySetGradesAfterDateTo100`.
11. Do not run it yet if you are still explaining the setup.

If you want to show the SQL view, use this pattern and replace `Score` with `Grade` if needed:

```sql
UPDATE STUDENT_GRADE
INNER JOIN DELIVERABLE
ON STUDENT_GRADE.DeliverableID = DELIVERABLE.DeliverableID
SET STUDENT_GRADE.Score = 100
WHERE DELIVERABLE.DueDate > [Enter cutoff date:];
```

Step 3: Build the standalone macro that runs the update

1. Click `Create` -> `Macro`.
2. Click `Add New Action`.
3. Choose `MessageBox`.
4. Type this message: `This macro will change all grades after the cutoff date to 100. Run the preview query first if you are not sure.`
5. Click the next `Add New Action` row.
6. Choose `OpenQuery`.
7. In `Query Name`, choose `qrySetGradesAfterDateTo100`.
8. Save the macro as `mcrSetGradesAfterDateTo100`.
9. Double-click the macro in the Navigation Pane to run it.
10. Enter the cutoff date when Access prompts you.

Instructor says while demonstrating the macro:

- "The macro itself is simple. The real work is in the update query."
- "Macros automate actions. Queries define which records are changed."

Optional safer version for class:

1. Create one macro called `mcrPreviewGradesAfterDate` that opens `qryPreviewGradesAfterDate`.
2. Create a second macro called `mcrSetGradesAfterDateTo100` that runs the update query.
3. Tell students to run the preview macro first and the update macro second.

Example query idea to explain on screen if students ask how the projection works:

```sql
ProjectedGrade: IIf([DueDate] <= [Enter cutoff date:], Nz([Score], 0), 0)
```

For the maximum version, keep the same condition but change the final `0` to `100`.

What to say while building the queries:

- "We are building the queries first because the macro only automates actions that already exist."
- "The cutoff date is a user prompt, so the same query can be reused every week without rewriting it."
- "The minimum query answers, 'What if everything left becomes zero?'"
- "The maximum query answers, 'What if everything left becomes perfect?'"

Option A: Show projected grade range after a cutoff date.

1. Open the grade-entry form.
2. Click `Show Projected Grade Range`.
3. Enter a cutoff date.
4. Show that Access first checks for missing grades due by that date, then opens the projected minimum and projected maximum queries.

Option B: Control workflow.

1. Show a form where required fields must be completed first.
2. Use macro logic or form settings to block the next step until fields are complete.

Student follow-along guide:

1. Create one standalone macro from `Create` -> `Macro`.
2. Add `MessageBox`.
3. Add `OpenQuery`.
4. Save the macro.
5. Test the macro from the Navigation Pane.
6. Open `frmGradeEntry` in `Design View`.
7. Add one embedded macro to a button's `On Click` event.
8. Save the form and test the button.
9. Open `STUDENT_GRADE` and add one data macro in `Before Change`.
10. Use an `If` condition and `RaiseError` to block an invalid score.
11. Save the table and test the rule.
12. If time remains, build `mcrProjectedGradeRange` as the advanced example.

Instructor says during demo:

"This does not replace database rules. It complements them. Validation protects the data itself. Macros protect the workflow the user follows."

Comparison statement for the board:

- Index: improves searching and matching.
- VBA: adds programmable logic and error handling.
- Macro: automates common interface actions.

Ask the class:

"What mistake can a macro reduce here, even if it cannot eliminate every possible error?"

Possible answers to pull from students:

- Forgetting to save the current record before moving on
- Forgetting to enter grades that should already be complete by the cutoff date
- Forgetting to check both the worst-case and best-case projection before advising a student
- Opening the wrong sequence of queries by hand
- Saving a value that should have been blocked at the table level

Bridge statement:

"In enterprise systems, similar behavior often lives in application code. Access makes the workflow layer visible, which is useful for learning."

Bridge line:

"Macros are excellent for simple interface actions. When the logic becomes more detailed, especially when error handling or all-or-nothing updates matter, we move to VBA."

## 48-55 Minutes: VBA and Transaction Thinking

Teaching goal:

Students understand that related changes should be treated as one logical unit, even in Access.

Instructor says:

"VBA stands for Visual Basic for Applications. It is the programming language built into Microsoft Access and other Microsoft Office tools. When Access forms, buttons, or events need more detailed logic than a macro can easily provide, developers often use VBA."

"A transaction means all steps succeed together or none of them count. Access is not the same as SQL Server here, but the thinking still matters. If grade entry affects multiple objects, we should not allow half-finished work."

"In desktop Access, true transaction control usually appears through VBA rather than pure query design. Even if you are not writing VBA from memory today, you need to understand what it is doing and where it lives."

Plain-language definition to give students:

- VBA is code.
- Macros are configured actions.
- We use VBA when we need more precise logic, branching, or error handling.

Instructor step-by-step navigation guide:

1. Open `frmGradeEntry` in `Design View`.
2. Click a button such as `Save Grade` if one exists, or add one if needed.
3. Open the `Property Sheet`.
4. Click the `Event` tab.
5. Locate `On Click`.
6. If the event says `Event Procedure`, click the build button with three dots.
7. Access opens the VBA editor.
8. Tell students: "This separate window is where Access stores procedural logic."
9. If no form button exists, go to `Create` -> `Module` and show a blank VBA module.

Live demo:

1. Use the grade-entry workflow on `frmGradeEntry` as the business example.
2. Explain the risk of partial changes if an error occurs mid-process.
3. Show this conceptual VBA snippet on screen or slide:

```vba
CurrentDb.BeginTrans

On Error GoTo RollbackHandler

DoCmd.RunSQL "INSERT INTO STUDENT_GRADE (StudentID, DeliverableID, Grade) VALUES (12, 3, 88);"

CurrentDb.CommitTrans
Exit Sub

RollbackHandler:
    CurrentDb.Rollback
    MsgBox "Grade update failed. No changes were saved."
```

Then explain that the important idea is not memorizing VBA syntax but understanding all-or-nothing behavior.

Explain the snippet one line at a time:

1. `CurrentDb.BeginTrans` starts the transaction.
2. `On Error GoTo RollbackHandler` tells Access what to do if something breaks.
3. `DoCmd.RunSQL ...` performs the change.
4. `CurrentDb.CommitTrans` saves the entire set of changes.
5. `CurrentDb.Rollback` cancels the transaction if an error appears.

Student follow-along guide:

1. Open `frmGradeEntry` in `Design View`, or open `Create` -> `Module` if a form is not available.
2. Locate where Access stores code.
3. Copy the five transaction ideas into notes: begin, check for errors, run change, commit, rollback.
4. Under each idea, write one sentence in plain English.
5. Answer this prompt: Why is VBA more suitable than a plain macro when error handling matters?

Instructor says after snippet:

"The business message is simple: either the grade update is complete and trustworthy, or it does not happen. Partial truth is dangerous in a database."

Mini discussion:

Ask: "Where in a grading workflow would partial updates create the biggest trust problem?"

Likely answers:

- Grade changed but summary not updated
- Student sees outdated average
- Instructor believes a correction was saved when it was not

## 55-58 Minutes: Analytics and Access Platform Limits

Teaching goal:

Students connect advanced analysis ideas to the Access toolset and understand its limits.

Instructor says:

"Advanced database work is not only about storing data safely. It is also about producing trustworthy analysis. Access can do aggregate queries and reporting well for small systems, but it does not match the full analytics power of server databases."

Live demo:

1. Open an aggregate query such as average score by student or by deliverable.
2. Run the query and interpret the result.
3. If available, sort descending to simulate ranking.
4. Explain that in PostgreSQL or SQL Server, window functions like `RANK()` would make this more direct and more powerful.

Instructor says during demo:

"Access helps us ask useful managerial questions: Who is struggling? Which deliverable has the lowest average? Which students may need intervention? But when the analytics become more complex, we often move to a server DBMS."

Quick compare statement:

- Access: good for local forms, reports, validation, and small-team workflow
- SQL Server or PostgreSQL: better for concurrency, permissions, and advanced analytics

## 58-60 Minutes: Security Close and Recap

Teaching goal:

Students connect technical features to trust, governance, and responsible system design.

Instructor says:

"The Grading Database is not just a technical object. It is part of an academic process. That means performance, validation, safe updates, and security all support trust. If the wrong person can edit grades, if duplicates exist, or if data entry allows nonsense values, the system fails even if the tables look fine."

"Access gives us a strong learning environment for this because we can see both the data layer and the user workflow layer."

Final recap questions:

1. "What problem do indexes solve?"
2. "What problem do validation rules solve?"
3. "Why is a grade-entry form better than typing directly into the table?"
4. "What problem do macros solve?"
5. "What is VBA, and when would we use it in Access?"
6. "What problem does transaction thinking solve?"

Strong closing summary:

"Today we moved from writing queries to designing reliability. That is the real point of advanced database techniques. A good database does not just return answers. It protects the quality, speed, and trustworthiness of those answers."

## Board Notes or Slide Headlines

- Correct SQL is necessary but not sufficient
- Relationships show where reliability matters
- Indexes improve retrieval speed
- Validation rules stop bad data early
- Forms make normalized tables easier to use
- Macros automate common workflow actions
- VBA adds programmable logic in Access
- Transaction thinking prevents partial truth
- Access is useful, but not enterprise-scale

## Quick Reference for a First-Time Access Instructor

If you forget where to click during class, use this sequence:

1. To show relationships: `Database Tools` -> `Relationships`
2. To change index settings: right-click table -> `Design View` -> field -> `Field Properties` -> `Indexed`
3. To show validation: right-click table -> `Design View` -> field -> `Validation Rule`
4. To build the grade-entry form: select `STUDENT_GRADE` -> `Create` -> `Form Wizard`
5. To turn IDs into dropdowns: form `Design View` -> `Combo Box` -> table/query wizard
6. To add a save button: form `Design View` -> `Button` -> `Record Operations` -> `Save Record`
7. To start in Macro Designer: `Create` -> `Macro`
8. To open an embedded macro: form `Design View` -> control `Property Sheet` -> `Event` -> `On Click`
9. To open a data macro: table `Design View` -> `Before Change` or `After Insert`
10. To show VBA: form `Design View` -> `Property Sheet` -> `Event` -> `On Click` -> `Event Procedure`

Suggested teaching sequence:

1. Start with the relationship diagram.
2. Show one index on a parent table and one on a related table.
3. Show one validation rule.
4. Build the grade-entry form on `STUDENT_GRADE`.
5. Convert `StudentID` and `DeliverableID` into dropdowns.
6. Add a `Save Grade` button so students see the record-save action.
7. Show one standalone macro in `Create` -> `Macro`.
8. Show one embedded macro on a form button.
9. Show one data macro on `STUDENT_GRADE`.
10. Show where VBA lives.

## Optional Student Exit Ticket

Ask students to answer in 2-3 sentences:

1. Which advanced technique from today would most improve the Grading Database immediately, and why?
2. Which task should stay in Access, and which task would be better in SQL Server or PostgreSQL?

## Instructor Notes on Platform Accuracy

- Access demonstrates indexing, validation, uniqueness, forms, reports, macros, and workflow control well.
- Access is not the best platform for demonstrating enterprise permissions, heavy concurrency, or advanced window functions.
- When discussing triggers, explain that Access relies more on macros, form logic, and application workflow than on the server-style trigger model used in systems such as PostgreSQL or SQL Server.
- If students ask about multi-user scaling, use that question to reinforce why organizations move from desktop databases to server DBMSs.
