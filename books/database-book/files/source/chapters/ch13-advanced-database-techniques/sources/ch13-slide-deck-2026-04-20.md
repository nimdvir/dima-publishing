<!-- metadata: date="2026-06-11"; chapter="13"; type="source"; title="Source: Slide Deck" -->
<!-- _class: title -->

# Chapter 13
## Advanced Database Techniques

**BITM 330 — Using Data to Drive Business Performance**
Microsoft Access with the Grading Database

<!-- 
SPEAKER NOTES — Title Slide
- Welcome students and frame the shift: this chapter moves from writing correct queries to building reliable systems.
- Mention that today's tools — indexes, validation, forms, macros, and VBA — are the difference between a database that works once and one that works every time.
- Platform: Microsoft Access, Grading Database.
- Duration: 60 minutes, lecture + live demo + student follow-along.
-->

---

## Lesson Snapshot

| | |
|---|---|
| **Duration** | 60 minutes |
| **Platform** | Microsoft Access — Grading Database |
| **Mode** | Short lecture → Live demo → Student follow-along |
| **Tables in focus** | `STUDENT`, `DELIVERABLE`, `WEIGHT`, `STUDENT_GRADE` |

### By the end of class, you will be able to:

1. Explain why advanced techniques matter after the database already "works"
2. Use Access design settings to improve performance and data quality
3. Build a grade-entry form with dropdowns
4. Distinguish among indexes, macros, and VBA — and know when to use each

<!-- 
SPEAKER NOTES — Lesson Snapshot
- Read or paraphrase the learning outcomes aloud.
- Emphasize outcome 1: students often think "correct SQL = done." Today reframes that.
- Quickly confirm: Grading Database is open, Navigation Pane shows the four key tables, Relationships diagram is accessible via Database Tools.
-->

---

## One-Hour Agenda

| Time | Segment |
|---|---|
| 0–8 min | Opening frame and relationship diagram |
| 8–18 min | Indexes in Access |
| 18–28 min | Constraints and validation |
| 28–40 min | Grade-entry form with dropdowns |
| 40–48 min | Access macros |
| 48–55 min | VBA and transaction thinking |
| 55–58 min | Analytics and platform limits |
| 58–60 min | Security close and recap |

<!-- 
SPEAKER NOTES — Agenda
- Show this slide briefly and move on. Do not read each row slowly.
- Tell students the agenda is also in the lesson script if they want to preview each section.
- Remind them to keep the Grading Database open and follow along.
-->

---

# Part 1: The Relationship Diagram

## *0–8 Minutes*

<!-- 
SPEAKER NOTES — Section divider
- Transition cue: "So far, we have spent a lot of time making sure our queries are correct. Today we shift to a harder question."
- Ask the class before moving forward: "What could go wrong in a grading database even if the SQL is correct?"
-->

---

## Correct SQL Is Not Enough

> "What happens when the database is used **repeatedly**, by **multiple people**, with **real consequences**?"

Being correct once is not enough. The system must also:

- 🚀 Stay **fast** under repeated use
- 🛡️ **Prevent mistakes** at the point of entry
- 🔒 **Protect sensitive data** from unauthorized access

📝 **Note:** Chapter 13 is about turning a *working* database into a *reliable* one.

<!-- 
SPEAKER NOTES — Correct SQL Is Not Enough
- Ask students: "Which matters more to an instructor — a correct report, a fast report, or a secure report?"
- Pull expected answers: slow reports, wrong/duplicate grades, unauthorized edits, missing updates.
- The answer is: all three matter. That is the point.
- Transition: "The relationship diagram tells us exactly where reliability matters most."
-->

---

## The Grading Database Relationship Map

| Table | Role |
|---|---|
| `STUDENT` | One row per student |
| `DELIVERABLE` | One row per assignment, quiz, exam, or project item |
| `WEIGHT` | Point and quantity rules for deliverable types |
| `STUDENT_GRADE` | Connects a student to a deliverable; stores the earned grade |

📖 **Definition:** `STUDENT_GRADE` is the **junction table** — it is where relationships become action.

<!-- 
SPEAKER NOTES — Relationship Map
- Open the Grading Database live.
- Go to Database Tools → Relationships.
- Add STUDENT, DELIVERABLE, WEIGHT, and STUDENT_GRADE if needed.
- Point to the lines: "These lines represent primary key to foreign key connections."
- Student follow-along: Open Database Tools → Relationships. Identify which field connects STUDENT to STUDENT_GRADE, and which connects DELIVERABLE to STUDENT_GRADE.
- Ask: "STUDENT_GRADE exists because __________." Have students write one sentence.
-->

---

## Relationship Diagram

```
STUDENT ─────────────────┐
 (StudentID PK)          │
                         ▼
                   STUDENT_GRADE
                   (StudentID FK)
                   (DeliverableID FK)
                   (Score / Grade)
                         ▲
 (DeliverableID PK)      │
DELIVERABLE ─────────────┘
     │
     │ (WeightTypeID FK)
     ▼
  WEIGHT
  (WeightTypeID PK)
```

🔑 **Key Takeaway:** Index and validate around these relationships — they are where errors cause the most damage.

<!-- 
SPEAKER NOTES — Relationship Diagram
- Use this slide as a visual reference while the live Access window is open.
- Emphasize: STUDENT and DELIVERABLE do not directly store the grade story. STUDENT_GRADE brings them together.
- Transition: "Now that we know where the relationships live, we can work through the same sequence an instructor would actually use: indexes, validation, a form, macros, and then VBA."
-->

---

# Part 2: Indexes in Access

## *8–18 Minutes*

<!-- 
SPEAKER NOTES — Section divider
- Quick framing: "Performance is a design choice, not magic."
-->

---

## What Is an Index?

> An index is a structure that helps Access **find rows faster**.

📖 **Analogy:** Like the index in a textbook — the pages are the same, but the index lets you jump instead of scanning.

### Three types to know:

| Index Type | Purpose |
|---|---|
| **Primary key index** | Finds one specific record quickly |
| **Foreign key index** | Matches related rows across tables quickly |
| **Unique index** | Prevents duplicate values (e.g., duplicate emails) |

<!-- 
SPEAKER NOTES — What Is an Index?
- The analogy works well. Use it.
- Preview the quick-check question coming up: "Why would we NOT index every field?"
- Answer: indexes improve reads but add overhead to inserts, updates, storage, and maintenance.
-->

---

## Where to Add Indexes — Grading Database

| Table | Field | Index Setting | Reason |
|---|---|---|---|
| `STUDENT` | `StudentID` | Auto (primary key) | Unique identifier |
| `STUDENT` | `Email` | Yes (No Duplicates) | Search field; must be unique |
| `STUDENT_GRADE` | `StudentID` | Yes (Duplicates OK) | FK; one student → many grades |
| `STUDENT_GRADE` | `DeliverableID` | Yes (Duplicates OK) | FK; one deliverable → many grades |

⚠️ **Warning:** `Duplicates OK` on a foreign key is intentional — one student can receive many grades.

<!-- 
SPEAKER NOTES — Where to Add Indexes
- Demo steps:
  1. Right-click STUDENT → Design View → click Email field → Field Properties → Indexed → Yes (No Duplicates) → Save.
  2. Right-click STUDENT_GRADE → Design View → click StudentID → Yes (Duplicates OK). Repeat for DeliverableID. Save.
- Student follow-along: mirror the same steps.
- Highlight the contrast: Email uses No Duplicates (prevents bad data AND speeds search). FK fields use Duplicates OK (many grades per student is expected).
- Quick check: "Why would we not index every field?" Target answer: overhead on writes, storage cost, maintenance burden.
-->

---

## Index Demo Checklist

**STUDENT table — Design View:**
- [ ] `StudentID` — confirm key icon is present
- [ ] `Email` — set `Indexed` to `Yes (No Duplicates)` → Save

**STUDENT_GRADE table — Design View:**
- [ ] `StudentID` — set `Indexed` to `Yes (Duplicates OK)`
- [ ] `DeliverableID` — set `Indexed` to `Yes (Duplicates OK)` → Save

💡 **Tip:** One design choice — two jobs. The `Email` index speeds up search *and* blocks duplicate records.

<!-- 
SPEAKER NOTES — Index Demo Checklist
- Use this as your live checklist during the demo.
- Narrate each step so students can follow along.
- If students finish early, ask: "Which other fields in STUDENT_GRADE might benefit from indexing?"
-->

---

# Part 3: Constraints and Validation

## *18–28 Minutes*

<!-- 
SPEAKER NOTES — Section divider
- Bridge from indexes: "Indexes help Access find and match data. Validation rules help Access *reject* bad data."
-->

---

## Why Validation Rules Matter

> "A score of **145** can still be unique and still be **wrong**."

Primary keys keep rows unique — they do not guarantee values make sense.

✅ **Good practice:** Turn assumptions into rules.

| Assumption | Rule |
|---|---|
| Scores should be reasonable | `Between 0 And 100` |
| Email is required | `Is Not Null` |
| Attendance has limited values | `In ("Present","Absent","Late")` |
| One grade per student per deliverable | Unique index on composite key |

<!-- 
SPEAKER NOTES — Why Validation Rules Matter
- Ask: "Why is preventing bad data better than cleaning it later?"
- Pull answers: cheaper, faster, easier to audit, prevents downstream errors.
- Ask: "What other fields in this database should have validation rules?" Pull examples from students.
-->

---

## Adding a Validation Rule — Demo

**Table:** `STUDENT_GRADE` | **Field:** `Score`

| Property | Value |
|---|---|
| **Validation Rule** | `Between 0 And 100` |
| **Validation Text** | `Score must be between 0 and 100` |

🧪 **Test:** Switch to Datasheet View and enter `145`. Access rejects the value and shows the message.

📝 **Note:** We did not wait for a report to reveal the mistake. We **blocked it at entry**. That is cheaper, safer, and easier to audit.

<!-- 
SPEAKER NOTES — Adding a Validation Rule
- Demo steps:
  1. Open STUDENT_GRADE in Design View.
  2. Select Score field.
  3. In Field Properties, enter validation rule and text.
  4. Save.
  5. Switch to Datasheet View and try 145 — show the rejection message.
- Optional: open ATTENDANCE and point out a field where only limited values should be allowed.
- Transition: "Indexes help Access find and match data. Validation rules help Access reject bad data. Next, we give instructors a better way to enter grades."
-->

---

# Part 4: Grade-Entry Form with Dropdowns

## *28–40 Minutes*

<!-- 
SPEAKER NOTES — Section divider
- Key concept: the form does not change the database structure. It builds a better interface on top of the structure.
-->

---

## The Problem with Direct Table Entry

`STUDENT_GRADE` stores **IDs** because that keeps relationships consistent.

But instructors do not want to type `StudentID = 42` and `DeliverableID = 7` from memory.

**Solution:** A form that shows **names in dropdowns** while storing the correct **IDs in the table**.

🔑 **Key Takeaway:** We are not changing the database. We are building a better interface on top of it.

<!-- 
SPEAKER NOTES — The Problem with Direct Table Entry
- This is the design lesson: normalization is preserved; the form is the UX layer.
- Analogy: ATM shows account names but works with account numbers underneath.
-->

---

## Building `frmGradeEntry` — Step by Step

1. Select `STUDENT_GRADE` in Navigation Pane
2. `Create` → `Form Wizard`
3. Add fields: `StudentID`, `DeliverableID`, `Grade` (or `Score`)
4. Layout: **Columnar** → Name the form `frmGradeEntry`
5. Choose **Modify the form's design** → Finish

**Then in Design View:**

6. Replace `StudentID` text box with a **Combo Box** → reads from `STUDENT` (show `LastName`, `FirstName`, store `StudentID`)
7. Replace `DeliverableID` text box with a **Combo Box** → reads from `DELIVERABLE`
8. Add a `Button` → `Record Operations` → `Save Record` → label: **Save Grade**
9. Save the form → test in Form View

<!-- 
SPEAKER NOTES — Building frmGradeEntry
- Walk through each step on screen, pausing for students to follow.
- Property Sheet checks to narrate:
  - Control Source = StudentID
  - Bound Column = 1
  - Column Count = 2 or 3
  - Column Widths: ID column hidden, name column shown
- Show the optional row source SQL:
    SELECT StudentID, LastName & ", " & FirstName AS StudentName FROM STUDENT ORDER BY LastName, FirstName;
- Student follow-along guide is in the lesson script — students build the same form.
- Transition: "Now that we have a form, we can automate common actions on it. That is where macros come in."
-->

---

## Combo Box Property Sheet — Key Settings

| Property | StudentID Combo | DeliverableID Combo |
|---|---|---|
| **Control Source** | `StudentID` | `DeliverableID` |
| **Row Source** | `STUDENT` table | `DELIVERABLE` table |
| **Bound Column** | 1 | 1 |
| **Column Count** | 2–3 | 2 |
| **Column Widths** | Hide ID; show name | Hide ID; show name |

💡 **Tip:** Press `F4` to open the Property Sheet if it is not visible.

<!-- 
SPEAKER NOTES — Combo Box Property Sheet
- Show this slide while the form is open in Design View.
- Click the student combo box and walk through each property live.
- Emphasize that the bound column stores the ID — not what the user sees.
-->

---

## Optional Row Source SQL

```sql
SELECT StudentID, LastName & ", " & FirstName AS StudentName
FROM STUDENT
ORDER BY LastName, FirstName;
```

Access uses this to populate the dropdown — the user sees names, the table stores IDs.

🧪 **Test:** In Form View, enter one grade using the dropdowns and click **Save Grade**.

<!-- 
SPEAKER NOTES — Optional Row Source SQL
- Show this in the Row Source property of the combo box if time allows.
- Walk through what each part does: SELECT (columns), FROM (source), ORDER BY (alphabetical list).
- Student checkpoint: ask a partner "Why does the form show names if the table stores IDs?"
-->

---

# Part 5: Access Macros

## *40–48 Minutes*

<!-- 
SPEAKER NOTES — Section divider
- Bridge: "Forms make data entry easier. Macros automate the workflow around data entry."
-->

---

## What Is a Macro?

📖 **Definition:** A **macro** is a saved sequence of Access actions — no-code or low-code automation.

| Type | Where It Lives | When It Runs |
|---|---|---|
| **Standalone macro** | Navigation Pane as its own object | When you run or call it |
| **Embedded macro** | Inside a form/report control event | On button click, form open, etc. |
| **Data macro** | Attached to a table event | On Before Change, After Insert, etc. |

💡 **Good rule of thumb:** Start with a macro for simple interface automation. Use VBA when logic becomes more complex.

<!-- 
SPEAKER NOTES — What Is a Macro?
- Distinguish the three types clearly — students often confuse them.
- Emphasize: do not treat all macros as the same thing.
- Transition: "Let's see all three in action."
-->

---

## Macro Designer — Key Elements

| Element | Purpose |
|---|---|
| **Action Catalog** | List of all available actions |
| **Add New Action** | Choose the next step in the macro |
| **Action arguments** | Settings for each action (query name, message text, etc.) |
| **MessageBox** | Shows instructions or warnings to the user |
| **OpenQuery** | Runs or opens a saved query |
| **OpenForm** | Opens another form |
| **Requery** | Refreshes data on a form or report |
| **If** | Branches macro based on a condition |
| **RaiseError** | Stops a data macro and reports an error |

<!-- 
SPEAKER NOTES — Macro Designer Key Elements
- Show the Macro Designer window live via Create → Macro.
- Click Action Catalog on the ribbon if it is hidden.
- Walk through each element one at a time — do not show all at once.
- Tell students: "If you get lost, come back to one question: what action should Access do next?"
-->

---

## Demo 1: Standalone Macro (`mcrGradeReminder`)

1. `Create` → `Macro`
2. `Add New Action` → `MessageBox`
   - Message: *"Remember to save the current grade before moving to the next student."*
3. `Add New Action` → `OpenQuery`
   - Query Name: *(choose an existing query)*
4. Save as `mcrGradeReminder`
5. Double-click in Navigation Pane to test

🔑 **Key Takeaway:** A macro is just a **list of actions in the order** we want Access to perform them.

<!-- 
SPEAKER NOTES — Demo 1: Standalone Macro
- Run the demo live. Keep it simple.
- Narrate: "First Access shows a message, then Access opens a query."
- Student follow-along: Create → Macro → add MessageBox → add OpenQuery → save → test from Navigation Pane.
-->

---

## Demo 2: Embedded Macro on `frmGradeEntry`

1. Open `frmGradeEntry` in Design View
2. Select a button → open **Property Sheet**
3. Click `Event` tab → click `On Click`
4. Choose `Embedded Macro` or `Macro Builder`
5. Add `MessageBox`: *"Grade saved. You can now review the projected range."*
6. Save → switch to Form View → click the button

**Comparison:**

| Standalone Macro | Embedded Macro |
|---|---|
| Lives in Navigation Pane | Lives inside the form event |
| Run from anywhere | Runs when a specific control event fires |

<!-- 
SPEAKER NOTES — Demo 2: Embedded Macro
- Contrast with Demo 1: "The standalone macro lives in the Navigation Pane. The embedded macro lives inside the form event."
- Walk through the steps live.
-->

---

## Demo 3: Data Macro on `STUDENT_GRADE`

**Goal:** Block an invalid score before it is saved.

1. Right-click `STUDENT_GRADE` → Design View
2. Ribbon → `Table` tab → click `Before Change`
3. Add `If` action
   - Condition: `[Score] < 0 Or [Score] > 100`
4. Inside `If` block: add `RaiseError`
   - Error message: *"Score must stay between 0 and 100."*
5. Save → test by entering `145` in Datasheet View

🧪 **Result:** Access blocks the save and shows the error message.

<!-- 
SPEAKER NOTES — Demo 3: Data Macro
- Key distinction: "A data macro does not wait for a button click. It runs when table data changes."
- This is different from a validation rule — it is programmable table-level logic.
- Note for students: table-event actions like RaiseError only appear in the data macro context.
-->

---

## Three Macro Types — Summary

| Type | Good for |
|---|---|
| **Standalone macro** | Running a sequence of Access actions |
| **Embedded macro** | Button clicks and form events |
| **Data macro** | Table-level rules that run whenever data changes |

❓ **Discussion:** "What mistake can a macro reduce here, even if it cannot eliminate every possible error?"

Possible answers:
- Forgetting to save before moving to the next student
- Forgetting to check grades due before the cutoff date
- Opening the wrong sequence of queries by hand

<!-- 
SPEAKER NOTES — Three Macro Types Summary
- Pull discussion answers from students.
- Bridge: "In enterprise systems, similar behavior lives in application code. Access makes the workflow layer visible — which is useful for learning."
- Transition: "Macros are excellent for simple interface actions. When logic becomes more detailed — especially error handling — we move to VBA."
-->

---

## Optional: Projected Grade Range Macro

**Business goal:** Show minimum and maximum projected grades based on a cutoff date.

```
mcrProjectedGradeRange
  └─ OpenQuery: qryMissingGradesThroughDate
  └─ MessageBox: "Check that all grades due by the cutoff are filled."
  └─ OpenQuery: qryProjectedMinGrade
  └─ OpenQuery: qryProjectedMaxGrade
  └─ MessageBox: "Min = if remaining work scores 0. Max = if remaining work scores 100."
```

💡 **Tip:** The cutoff date is a user prompt — the same macro works every week without rewriting.

<!-- 
SPEAKER NOTES — Optional Projected Grade Range Macro
- Show only if time permits and students are comfortable with macro basics.
- The projected grade queries use IIf with Nz:
    ProjectedGrade: IIf([DueDate] <= [Enter cutoff date:], Nz([Score], 0), 0)
    For max version: replace final 0 with 100.
- Attach the macro to a button labeled "Show Projected Grade Range" on frmGradeEntry.
-->

---

# Part 6: VBA and Transaction Thinking

## *48–55 Minutes*

<!-- 
SPEAKER NOTES — Section divider
- Bridge: "Macros are configured actions. VBA is code. We use VBA when we need more precise logic, branching, or error handling."
-->

---

## What Is VBA?

📖 **Definition:** **VBA (Visual Basic for Applications)** is the programming language built into Microsoft Access and other Microsoft Office applications.

| | Macro | VBA |
|---|---|---|
| **Nature** | Configured actions | Written code |
| **Best for** | Simple workflow automation | Detailed logic, branching, error handling |
| **Learning curve** | Low | Medium |

🧠 **Concept:** Use macros first. Move to VBA when logic becomes complex or when **error handling matters**.

<!-- 
SPEAKER NOTES — What Is VBA
- Navigate live: frmGradeEntry → Design View → Save Grade button → Property Sheet → Event tab → On Click → Event Procedure → click the "..." button.
- Show the VBA editor window.
- Tell students: "This separate window is where Access stores procedural logic."
- Alternative: Create → Module to show a blank VBA module.
-->

---

## Transaction Thinking

> "Either the grade update is **complete and trustworthy**, or it **does not happen**."

📖 **Definition:** A **transaction** means all steps succeed together, or none of them count.

**Risk of partial updates in grading:**
- Grade changed but summary not updated
- Student sees outdated average
- Instructor believes a correction was saved — but it was not

❗ **Important:** Partial truth is dangerous in a database.

<!-- 
SPEAKER NOTES — Transaction Thinking
- Ask the class: "Where in a grading workflow would partial updates create the biggest trust problem?"
- Pull answers above.
- Emphasize: Access is not SQL Server — true transaction control usually appears through VBA in Access, not pure query design.
-->

---

## VBA Transaction Pattern

```vba
CurrentDb.BeginTrans

On Error GoTo RollbackHandler

DoCmd.RunSQL "INSERT INTO STUDENT_GRADE " & _
             "(StudentID, DeliverableID, Grade) " & _
             "VALUES (12, 3, 88);"

CurrentDb.CommitTrans
Exit Sub

RollbackHandler:
    CurrentDb.Rollback
    MsgBox "Grade update failed. No changes were saved."
```

<!-- 
SPEAKER NOTES — VBA Transaction Pattern
- Walk through line by line:
  1. BeginTrans — starts the transaction
  2. On Error GoTo — tells Access what to do if something breaks
  3. DoCmd.RunSQL — performs the change
  4. CommitTrans — saves the entire set of changes
  5. Rollback — cancels the transaction if an error appears
- Tell students: "You do not need to memorize VBA syntax today. You need to understand all-or-nothing behavior."
- Student follow-along: copy the five transaction ideas into notes (begin, check for errors, run change, commit, rollback). Write one sentence in plain English under each.
-->

---

## VBA Transaction — Five Ideas

| Step | VBA | Plain English |
|---|---|---|
| 1 | `BeginTrans` | Start watching — changes are not final yet |
| 2 | `On Error GoTo` | If anything breaks, jump to the safety handler |
| 3 | `DoCmd.RunSQL` | Make the actual change |
| 4 | `CommitTrans` | Everything worked — make the changes permanent |
| 5 | `Rollback` | Something broke — undo everything |

🔑 **Key Takeaway:** All-or-nothing updates protect the **trustworthiness** of the database.

<!-- 
SPEAKER NOTES — VBA Five Ideas
- Use this as a reference after showing the code.
- Ask: "Why is VBA more suitable than a plain macro when error handling matters?"
- Target answer: macros do not have built-in error handling or rollback capability.
-->

---

# Part 7: Analytics and Platform Limits

## *55–58 Minutes*

---

## What Access Does Well

- Aggregate queries (average score by student or deliverable)
- Simple ranking via sort + descending order
- Local forms, reports, validation, and small-team workflow
- Teaching the design mindset clearly

## Where Access Has Limits

- No native `RANK()`, `ROW_NUMBER()`, or window functions
- Limited concurrency for multi-user environments
- Not designed for enterprise-level permissions or heavy transaction loads

📝 **Note:** When analytics become more complex, organizations move to SQL Server or PostgreSQL.

<!-- 
SPEAKER NOTES — Analytics and Platform Limits
- Demo: Open an aggregate query (avg score by student or deliverable) → run it → sort descending to simulate ranking.
- Say: "Access helps us ask useful managerial questions: Who is struggling? Which deliverable has the lowest average?"
- Quick compare: "In PostgreSQL or SQL Server, RANK() would make this more direct and more powerful."
- If students ask about multi-user scaling, use that question to reinforce why organizations move from desktop to server DBMSs.
-->

---

## Access vs. Server DBMS — Quick Compare

| Capability | Access | SQL Server / PostgreSQL |
|---|---|---|
| Forms and reports | ✅ Strong | ❌ Not built-in |
| Validation rules | ✅ Built-in | ✅ CHECK constraints |
| Macros / workflow | ✅ Built-in | ❌ Application layer |
| Window functions | ❌ Not available | ✅ RANK, ROW_NUMBER, etc. |
| Multi-user concurrency | ⚠️ Limited | ✅ Strong |
| Enterprise permissions | ⚠️ Limited | ✅ Role-based security |
| Transaction control | ⚠️ Via VBA | ✅ Native SQL |

<!-- 
SPEAKER NOTES — Access vs. Server DBMS
- Use this as a reference, not a deep dive.
- The goal is awareness, not memorization.
- Transition: "The last two minutes connect everything we did today to trust and governance."
-->

---

# Part 8: Security Close and Recap

## *58–60 Minutes*

---

## The Grading Database Is Not Just a Technical Object

> "It is part of an **academic process**. That means performance, validation, safe updates, and security all support **trust**."

If the system fails any of these tests — it fails, even if the tables look fine:

- ❌ Wrong person can edit grades
- ❌ Duplicate grades exist
- ❌ Data entry allows nonsense values
- ❌ Slow reports frustrate users
- ❌ Partial updates leave inconsistent records

<!-- 
SPEAKER NOTES — Security Close
- Frame this as the governance angle: a database is not just a technical artifact — it supports institutional trust.
- Remind students: Access shows us both the data layer and the user workflow layer — that is what makes it useful for learning.
-->

---

## Final Recap — Six Questions

1. What problem do **indexes** solve?
2. What problem do **validation rules** solve?
3. Why is a **grade-entry form** better than typing directly into the table?
4. What problem do **macros** solve?
5. What is **VBA**, and when would we use it in Access?
6. What problem does **transaction thinking** solve?

<!-- 
SPEAKER NOTES — Final Recap Questions
- Cold-call or use think-pair-share.
- Target answers:
  1. Indexes: slow retrieval and slow joins
  2. Validation: bad data entering the system
  3. Form: human-unfriendly IDs; normalization preserved but entry made easy
  4. Macros: repetitive workflow steps and user mistakes
  5. VBA: programmable logic when macros are not precise enough
  6. Transactions: partial updates leaving inconsistent state
-->

---

## Board Summary — Chapter 13 in One Slide

| Technique | Problem It Solves |
|---|---|
| **Indexes** | Slow retrieval and join performance |
| **Validation rules** | Bad data entering the system |
| **Grade-entry form** | Human-unfriendly ID-based entry |
| **Macros** | Repetitive workflow steps and user mistakes |
| **VBA** | Complex logic and all-or-nothing error handling |
| **Transactions** | Partial updates that leave inconsistent state |
| **Platform awareness** | Using the right tool for the scale of the problem |

🔑 **Key Takeaway:** A good database does not just return answers. It **protects the quality, speed, and trustworthiness** of those answers.

<!-- 
SPEAKER NOTES — Board Summary
- Read the key takeaway aloud.
- Ask for a show of hands: "Which technique from today would most improve the Grading Database immediately?"
- Optional exit ticket: have students write 2–3 sentences answering that question plus: "Which task should stay in Access, and which would be better in SQL Server or PostgreSQL?"
-->

---

## Exit Ticket

Answer in 2–3 sentences:

1. Which advanced technique from today would **most improve the Grading Database immediately**, and why?

2. Which task should **stay in Access**, and which task would be **better in SQL Server or PostgreSQL**?

<!-- 
SPEAKER NOTES — Exit Ticket
- Collect on paper or via a quick form (Teams, Canvas, etc.).
- Look for evidence that students understand the boundary between Access capabilities and server DBMS capabilities.
- This also reinforces the governance/trust framing from the security close.
-->

---

## Quick Reference — Where to Click in Access

| Task | Path |
|---|---|
| Show relationships | `Database Tools` → `Relationships` |
| Change index settings | Right-click table → `Design View` → field → `Indexed` |
| Add validation rule | Right-click table → `Design View` → field → `Validation Rule` |
| Build grade-entry form | Select `STUDENT_GRADE` → `Create` → `Form Wizard` |
| Turn ID into dropdown | Form `Design View` → replace text box with `Combo Box` |
| Add save button | Form `Design View` → `Button` → `Record Operations` → `Save Record` |
| Start Macro Designer | `Create` → `Macro` |
| Open embedded macro | Form `Design View` → control `Property Sheet` → `Event` → `On Click` |
| Open data macro | Table `Design View` → `Before Change` or `After Insert` |
| Show VBA editor | Form `Design View` → `Property Sheet` → `Event` → `On Click` → `Event Procedure` |

<!-- 
SPEAKER NOTES — Quick Reference
- Leave this on screen while students are working independently.
- This is also in the lesson script for instructor reference.
-->

---

<!-- _class: title -->

# Chapter 13 Complete

**Advanced Database Techniques**

> Correct SQL is necessary. Reliable design is the goal.

*BITM 330 — Using Data to Drive Business Performance*

<!-- 
SPEAKER NOTES — Closing Slide
- Leave this on screen as students complete the exit ticket or pack up.
- Optional: preview Chapter 14 — Business Strategy and Information Systems — by noting that today's reliability concepts feed directly into strategic IS design decisions.
-->
