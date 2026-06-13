<!-- metadata: date="2026-06-03" -->

<!-- markdownlint-disable MD013 MD024 MD036 -->

# Lab 02 Questions — Managing PetVax as a Business System

**Chapter:** Chapter 2 — Foundations of Information Systems  
**Project:** PetVax veterinary clinic  
**Platform:** Brightspace auto-graded quiz + separate file upload  
**Estimated time:** about 60 minutes  
**Submission artifact:** one-page PetVax Performance Logic Map  
**Files used:** `assets/dr-dima-tuesday-notebook.png`

---

## Lab Purpose

In Chapter 2, you learned that data becomes valuable only when it helps people understand performance and make decisions. You also learned the major foundations of information systems: business performance, KPIs, DIKW, R.E.A.D., data quality, information behavior, the Input-Process-Output model, information systems versus information technology, the five-component framework, MIS, BITM, strategic alignment, and governance.

In this lab, you will apply those ideas to **PetVax**, a small veterinary clinic.

This lab is not just a quiz. The questions are also instructions. As you answer the questions, you will build the file you submit at the end: a **PetVax Performance Logic Map**.

You are not building a database yet. You are not creating tables, assigning data types, writing SQL, or building relationships. Those come later.

For now, your job is to look at messy operational notes and ask:

> What would PetVax need from an information system in order to measure performance, improve processes, and make better decisions?

---

## How This Lab Is Graded

This lab has **two graded parts**. You must complete both.

### Part 1 — Brightspace quiz (auto-graded)

You answer 16 questions inside the Brightspace quiz for this lab. Brightspace grades these automatically. Every answer is exact: a specific choice, match, order, or value. Many answers come directly from the work you do while building your Logic Map, so **do the work first, then answer**. Your quiz answers should match what you wrote in your file.

### Part 2 — Logic Map file (AI-checked)

You upload your completed **PetVax Performance Logic Map** to the separate file-submission assignment. An AI grader checks that the file is **complete** and that you carried **one consistent PetVax problem** through the whole map. The file is not re-scored for writing quality. It is proof that you actually did the work behind your quiz answers.

**Final grade = Brightspace quiz score + Logic Map file submission.**

---

## PetVax Scenario

*See Exhibit A below for Dr. Dima's Tuesday notebook.*

PetVax is a small veterinary clinic that provides routine pet vaccination and basic care services. The clinic currently records many activities in handwritten notes. These notes are useful because they capture real work as it happens. But they are also incomplete, inconsistent, and difficult to summarize.

PetVax wants to improve performance in areas such as:

- appointment completion;
- vaccination follow-up;
- reminder calls;
- payment tracking;
- lab-result follow-up;
- emergency referral follow-up;
- clear records for pets, owners, and services.

Your task is to use the notebook excerpt below as evidence and build one logic map showing how PetVax could move from messy notes to better information-system design.

---

## Required Files and Tools

- **Starter exhibit:** `assets/dr-dima-tuesday-notebook.png` (provided in this lab folder).
- **Tool:** a word processor (Google Docs, Microsoft Word, or any editor that can export PDF).
- **Final artifact:** one-page **PetVax Performance Logic Map**, saved as `Lab02-LogicMap-YourName.docx` or `Lab02-LogicMap-YourName.pdf`.

---

## Exhibit A — Dr. Dima’s Tuesday Notebook

![Photo of Dr. Dima's handwritten Tuesday notebook with pet visits, payments, reminders, and unresolved follow-up notes](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_900/bitm330book/00-general/labs/dr-dima-tuesday-notebook)

### Working Transcription

Some handwriting is ambiguous. Use this transcription as the official version for the lab.

**Dr. Dima’s Notebook — Tuesday**  
**Tues 5/14**

- **9:30** Buddy *(Beagle?)* — weight 15 — Vx + checkup — **$120**
- **10am** Misty — cat → sneezing, ear wax. gave drops.  
  ~11 B.’s owner called back about follow up?? need date
- **11:15** Charlie — dog — weight 8kg — shots? — **cash $40**

**12 LUNCH**

Charlie *(other one)* — lab — **pending**

- **~2pm** Bandit — york — dental cleaning — **220**
- **3:15** emergency — vomit, lethargy — small dog *(~7)* — refer?  
  **outcome:** ? follow w/ owner
- **4** vacc reminder calls — did 5? **lost track**  
  Buddy — recheck 6 wks (**no date set**)
- **5:30** Mango — cat?? — 4.1 — **rabies due**

**end of day:** **cash drawer ~$600–650**, **receipts** in folder

**Totals:** ?

---

## Your Final File

Create a Google Doc, Word document, or PDF titled:

`Lab02-LogicMap-YourName`

At the end of the lab, upload the file to the **Lab 02 file-submission** assignment in Brightspace.

Your file must contain this completed table:

| Layer | Your Answer |
|---|---|
| Notebook evidence | |
| PetVax performance problem | |
| KPI | |
| Data: one raw fact | |
| Information: summary or comparison | |
| Knowledge: pattern or explanation | |
| Wisdom: decision or action | |
| Process that creates the data | |
| Information user and use | |
| Data-quality risk | |
| R.E.A.D. stage most involved | |
| Weakest five-component link | |
| Why this is an information system | |

Carry **one PetVax problem** through the whole table. Do not switch examples halfway through.

---

# Step 1 — Inspect the Raw Note

Before you analyze the system, inspect the note carefully. Good information systems begin with careful attention to what is actually recorded.

In your file, complete the row:

`Notebook evidence`

Use one line or phrase from Exhibit A that you will build your logic map around. Examples: `vacc reminder calls — did 5? lost track`, `Buddy — recheck 6 wks (no date set)`, `outcome: ? follow w/ owner`, or `cash drawer ~$600–650`.

## Quiz Question 1

**Question type:** Short answer  
**Points:** 1

What date appears at the top of Dr. Dima’s notebook?

## Quiz Question 2

**Question type:** Multiple choice  
**Points:** 1

Which pet has **rabies due** written next to the visit?

A. Buddy  
B. Misty  
C. Bandit  
D. Mango

## Quiz Question 3

**Question type:** Multiple choice  
**Points:** 1

What end-of-day cash drawer range is recorded in the notebook?

A. $400–$450  
B. $500–$550  
C. $600–$650  
D. $700–$750

## Quiz Question 4

**Question type:** Multiple choice  
**Points:** 1

Which notebook line most clearly suggests that PetVax lost track of a process?

A. Bandit — york — dental cleaning — 220  
B. vacc reminder calls — did 5? lost track  
C. Buddy — weight 15  
D. receipts in folder

---

# Step 2 — Choose One PetVax Performance Problem

A performance problem is something that prevents the organization from achieving a goal that matters.

Choose **one** problem from the notebook. You will use this same problem for the rest of the lab.

Examples:

- reminder calls are not tracked reliably;
- follow-up dates are missing;
- appointment outcomes are unclear;
- daily revenue totals are uncertain;
- pet identities are ambiguous;
- vaccination status is hard to monitor;
- lab-result follow-up is pending without a clear owner;
- emergency referral outcome is unknown.

In your file, complete the row:

`PetVax performance problem`

## Quiz Question 5

**Question type:** Multi-select  
**Points:** 2

Which of the following are reasonable PetVax performance problems shown in the notebook? Select all that apply.

A. Reminder calls are not tracked reliably  
B. Follow-up dates are missing  
C. Emergency outcome is unclear  
D. The notebook has spiral binding  
E. Daily revenue totals are uncertain  
F. Pet identities may be ambiguous

---

# Step 3 — Choose a KPI

A KPI is a measurable signal used to evaluate progress toward an important goal.

Choose one KPI that would help PetVax monitor your chosen problem.

Examples:

| PetVax problem | Possible KPI |
|---|---|
| Reminder calls are not tracked reliably | Reminder completion rate |
| Follow-up dates are missing | Follow-up scheduling completion rate |
| Appointment outcomes are unclear | Completed outcome documentation rate |
| Daily revenue totals are uncertain | Daily revenue reconciliation accuracy |
| Vaccination status is hard to monitor | Overdue vaccination count |
| Pet identities are ambiguous | Ambiguous patient record count |
| Lab follow-up is pending | Pending lab follow-up count |
| Emergency outcome is unknown | Emergency follow-up completion rate |

In your file, complete the row:

`KPI`

## Quiz Question 6

**Question type:** Matching  
**Points:** 2

Match each PetVax problem to the most appropriate KPI.

| Problem | KPI |
|---|---|
| Reminder calls are not tracked reliably | Reminder completion rate |
| Follow-up dates are missing | Follow-up scheduling completion rate |
| Daily revenue totals are uncertain | Daily revenue reconciliation accuracy |
| Emergency outcome is unknown | Emergency follow-up completion rate |

## Quiz Question 7

**Question type:** Multiple choice  
**Points:** 1

Which option is the best example of a KPI for the notebook problem `vacc reminder calls — did 5? lost track`?

A. Buddy is a Beagle  
B. Reminder completion rate  
C. The notebook is on paper  
D. Dr. Dima writes a note

---

# Step 4 — Build the DIKW Chain

The DIKW hierarchy explains how raw records become meaningful and actionable.

- **Data:** one raw recorded fact.
- **Information:** organized, summarized, or compared data.
- **Knowledge:** a pattern, explanation, relationship, or likely cause.
- **Wisdom:** a decision or action based on judgment.

A KPI is not a DIKW level. A KPI is a performance measure that often uses data and information to support knowledge and decisions.

In your file, complete these rows:

- `Data: one raw fact`
- `Information: summary or comparison`
- `Knowledge: pattern or explanation`
- `Wisdom: decision or action`

## Quiz Question 8

**Question type:** Ordering  
**Points:** 3

Put this DIKW sequence in the correct order.

A. PetVax creates a rule that follow-ups must be scheduled before checkout.  
B. Buddy needs a recheck in 6 weeks, but no date was set.  
C. Missing follow-up dates increase the chance that care tasks are forgotten.  
D. Several visit notes include follow-up actions without clear dates or outcomes.

## Quiz Question 9

**Question type:** Matching  
**Points:** 3

Match each notebook-based example to the correct DIKW category.

| Example | DIKW category |
|---|---|
| `Mango — cat?? — 4.1 — rabies due` | Data |
| Several pets have unresolved follow-up or vaccination notes | Information |
| Missing dates make it more likely that follow-up care will be delayed | Knowledge |
| Require staff to schedule follow-ups before the visit is closed | Wisdom / Decision |

---

# Step 5 — Connect the Problem to a Business Process

KPIs do not appear from nowhere. Every KPI depends on a process that creates records.

In your file, complete the row:

`Process that creates the data`

Examples:

- appointment scheduling process;
- reminder-call process;
- visit checkout process;
- vaccination follow-up process;
- lab-result follow-up process;
- emergency referral process;
- end-of-day cash reconciliation process.

## Quiz Question 10

**Question type:** Multiple choice  
**Points:** 1

Which process most directly created the problem shown in `vacc reminder calls — did 5? lost track`?

A. Appointment reminder process  
B. Dental cleaning process  
C. Cash drawer process  
D. Weight measurement process

---

# Step 6 — Identify a Data-Quality Risk

Poor data quality can weaken KPIs and lead to bad decisions.

Use one of these dimensions:

- **Accuracy:** data matches reality.
- **Completeness:** required data is present.
- **Timeliness:** data is current enough for the decision.
- **Consistency:** the same idea is recorded the same way.

In your file, complete the row:

`Data-quality risk`

## Quiz Question 11

**Question type:** Matching  
**Points:** 3

Match each notebook item to the data-quality issue it best illustrates.

| Notebook item | Data-quality issue |
|---|---|
| `outcome: ?` | Completeness |
| `cash drawer ~$600–650` | Accuracy / precision |
| `Buddy — recheck 6 wks (no date set)` | Completeness / timeliness |
| `Charlie (other one)` | Consistency / identification ambiguity |

---

# Step 7 — Identify Information Behavior

Information behavior focuses on how people recognize information needs, look for information, interpret it, and use it.

In your file, complete the row:

`Information user and use`

Examples:

- The clinic manager reviews unresolved follow-up notes and changes the reminder process.
- Front desk staff check the reminder list and call pet owners.
- A veterinarian checks emergency follow-up notes before deciding whether to call the owner.
- A technician reviews pending lab notes and updates the owner.
- The person handling cash compares receipts with the cash drawer total.

## Quiz Question 12

**Question type:** Multiple choice  
**Points:** 1

Which example best shows information behavior?

A. The notebook says `cash $40`  
B. Staff search the notebook to find which owners need follow-up calls  
C. Mango is a cat  
D. The notebook has lined paper

---

# Step 8 — Connect the Problem to R.E.A.D.

R.E.A.D. explains the work an information system performs to move from records to decisions.

- **Representation and Retrieval:** record and retrieve the right facts.
- **Expression and Experience:** display information clearly.
- **Association and Acquisition:** identify patterns and explanations.
- **Decision-Making and Deployment:** act on what was learned.

In your file, complete the row:

`R.E.A.D. stage most involved`

## Quiz Question 13

**Question type:** Matching  
**Points:** 2

Match each R.E.A.D. stage to the best PetVax example.

| R.E.A.D. stage | Example |
|---|---|
| Representation and Retrieval | Convert handwritten notes into structured visit records |
| Expression and Experience | Show a daily dashboard of unresolved follow-ups, reminders, and pending labs |
| Association and Acquisition | Notice that missing follow-up dates lead to missed care tasks |
| Decision-Making and Deployment | Change the checkout process so follow-ups are scheduled immediately |

---

# Step 9 — Diagnose the Five-Component Risk

An information system includes hardware, software, data, processes, and people.

In your file, complete the row:

`Weakest five-component link`

Examples:

- **Hardware:** the paper notebook can be lost or unavailable.
- **Software:** no structured scheduling or reminder system is shown.
- **Data:** dates, outcomes, and totals are incomplete or ambiguous.
- **Processes:** reminder calls and follow-ups are not consistently tracked.
- **People:** staff rely on memory and handwritten notes.

## Quiz Question 14

**Question type:** Multi-select  
**Points:** 1

A PetVax manager says, “Reminder calls were lost track of, so the software must be broken.” Which information-system components might actually be involved? Select all that apply.

A. Hardware  
B. Software  
C. Data  
D. Processes  
E. People

---

# Step 10 — Connect to MIS, BITM, Strategy, and Governance

Chapter 2 also connects information systems to management.

- **MIS** asks how information supports managerial work.
- **BITM** asks how technology choices support business goals.
- **Strategic alignment** asks whether systems support what the organization is trying to do.
- **Governance** asks who owns decisions, data, access, risk, and accountability.

## Quiz Question 15

**Question type:** Matching  
**Points:** 2

Match each Chapter 2 concept to the best PetVax example.

| Concept | Example |
|---|---|
| MIS | The clinic manager uses a daily follow-up dashboard to monitor unresolved tasks |
| BITM | PetVax decides whether to invest in a scheduling and reminder platform |
| Strategic alignment | PetVax chooses systems that support reliable vaccination follow-up and clear owner communication |
| Governance | PetVax defines who can edit vaccine records and who is responsible for reminder accuracy |

---

# Step 11 — Final File Check

Before submitting, make sure your logic map uses the same PetVax problem from beginning to end.

In your file, complete the row:

`Why this is an information system`

Your answer should explain why the PetVax case is more than software or recordkeeping. A strong answer mentions people, processes, data, technology, and decisions.

## Quiz Question 16

**Question type:** Multi-select  
**Points:** 1

Which items must appear in your submitted PetVax Performance Logic Map? Select all that apply.

A. Notebook evidence  
B. PetVax performance problem  
C. KPI  
D. Data, information, knowledge, and wisdom  
E. Process that creates the data  
F. Information user and use  
G. Data-quality risk  
H. R.E.A.D. stage  
I. Weakest five-component link  
J. SQL query  
K. Data type for each field

---

# Submission

Complete **both** parts in Brightspace.

1. **Take the Brightspace quiz.** Answer all 16 questions. The quiz is auto-graded. Because many answers come from your Logic Map, finish your file first so your answers match your work.
2. **Upload your Logic Map file.** Save it as `Lab02-LogicMap-YourName.docx` or `Lab02-LogicMap-YourName.pdf` and upload it to the **Lab 02 file-submission** assignment. Make sure all 13 rows are filled and that **one consistent PetVax problem** runs through the entire map.

**Final grade = Brightspace quiz score + Logic Map file submission.**

---

## Optional Extension

These are not required.

1. Add a second KPI for the same PetVax problem.
2. Propose one improvement to the notebook process that would reduce ambiguity.
3. Explain how your KPI could create unintended behavior.
4. Explain what evidence would show that PetVax’s decision improved performance.
---

## Hint — What Good Notes Look Like

The example below shows how completed performance notes can connect one problem to a KPI, DIKW chain, and business process. Your layout does not need to match this exactly — any clear, consistent structure works.

![Example of organized PetVax performance logic map notes showing problem-KPI-DIKW chain connections](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_900/bitm330book/00-general/labs/dr-diamond-notes)

*An example of clearly structured performance notes. Focus on covering all 13 rows consistently, not on matching this format exactly.*