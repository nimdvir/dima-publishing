# Lab 02: PetVax System Analysis - Student Sample Submission

## Student Header

- Name: Sample Student
- Lab: Lab 02 - Running PetVax with Information
- Chapter: Chapter 2
- Date: 2026-05-24

## Step 2 - Data Items for One Business Question

**Question chosen:** Q4 - Are pets getting their vaccines on time?

Data items needed:

- Pet ID, so each animal can be tracked even if names repeat.
- Vaccine type, such as rabies or distemper.
- Vaccine due date, so the clinic knows when the next shot should happen.
- Vaccine administered date, so the clinic can compare what was due with what actually happened.
- Owner phone number or email, so reminders can be sent.
- Reminder-sent date, so staff can check whether follow-up happened.

## Step 10 - Buddy DIKW Ladder

| DIKW Level | Buddy Example |
| --- | --- |
| Data | 15.2 kg recorded as Buddy's weight. |
| Information | Buddy is a 5-year-old Beagle who weighed 15.2 kg on the visit date. |
| Knowledge | Healthy adult Beagles are usually 9-11 kg, so Buddy is about 38% above the upper healthy range. |
| Wisdom | Recommend a supervised diet plan and schedule a follow-up weigh-in in about six weeks. |

## Step 11 - Three More DIKW Ladders

### Q3 - Which Services Are Most and Least Popular?

| DIKW Level | Example |
| --- | --- |
| Data | Five dental cleanings, three vaccinations, and two checkups were recorded this week. |
| Information | Dental cleaning was the most common service this week. |
| Knowledge | Dental visits are higher than usual compared with the past few weeks, so demand may be rising. |
| Wisdom | Schedule another trained assistant during dental-heavy days and make sure dental supplies are stocked. |

### Q4 - Are Pets Getting Their Vaccines on Time?

| DIKW Level | Example |
| --- | --- |
| Data | Pet ID P118 has a rabies vaccine due date of 2026-05-01 and an administered date of 2026-05-12. |
| Information | This pet received the rabies vaccine 11 days late. |
| Knowledge | Several late vaccines in the same month suggest the reminder process is not working well. |
| Wisdom | Send automatic reminders two weeks before the due date and ask the front desk to call owners who do not respond. |

### Q7 - What Are the Most Common Reasons Pets Come to the ER?

| DIKW Level | Example |
| --- | --- |
| Data | ER visits list vomiting, breathing trouble, injury, and poisoning as presenting conditions. |
| Information | Vomiting appears as the most common ER reason this month. |
| Knowledge | A spike in vomiting cases may point to owners needing better food-safety guidance. |
| Wisdom | Create a short client handout about unsafe foods and review supply levels for nausea treatment. |

## Step 12 - R.E.A.D. Trace for Buddy

| R.E.A.D. Stage | Buddy Example |
| --- | --- |
| R - Representation and Retrieval | Record Buddy's pet ID, breed, visit date, and weight in the clinic system. |
| E - Expression and Experience | Show Buddy's current weight beside the healthy Beagle range so the vet and owner can understand it quickly. |
| A - Association and Acquisition | Compare Buddy's 15.2 kg weight with the 9-11 kg healthy range and calculate that he is about 38% over the upper end. |
| D - Decision-Making and Deployment | Recommend a diet plan, schedule a follow-up, and record the plan so staff can check progress later. |

## Step 14 - Stakeholders and System Needs

| Stakeholder | What They Need from the System |
| --- | --- |
| Pet owner | Appointment reminders, vaccine reminders, and a clear receipt showing what service the pet received. |
| Vet nurse | A daily schedule showing each pet, visit reason, vaccine status, and any follow-up instructions. |
| Accountant | Monthly totals for revenue and expenses, separated by service type and expense category. |

## Step 15 - KPIs and Decision Triggers

| Question | KPI | Refresh Cycle | Decision if It Goes Wrong |
| --- | --- | --- | --- |
| Q2 - Which neighborhoods do most clients come from? | Top five neighborhoods by client count | Quarterly | Advertise in nearby neighborhoods with low client counts or consider where a second location might make sense. |
| Q7 - What are the most common ER reasons? | Top five ER presenting conditions | Monthly | If one condition spikes, prepare client education materials and check related supplies. |
| Q9 - Which patients are over- or underweight? | Percent of pets outside the healthy weight range | Quarterly | Start a follow-up program for weight checks and diet conversations. |

## Step 16a - Notebook Page Problem

The biggest problem is that two pets can have the same name without a stable patient ID, which affects Q4 about vaccines on time because Dr. Dima could record or check the vaccine history for the wrong Charlie.

## Step 17 - Is the Notebook-and-Receipts Setup an Information System?

Yes, the notebook-and-receipts setup is an information system even though it is not digital. The hardware is paper, pens, folders, and the filing cabinet. The software is the set of rules Dr. Dima follows for writing notes and receipts. The data are the appointment facts, payments, vaccine notes, and patient details. The people are Dr. Dima, the nurses, front-desk staff, and owners. The processes are intake, treatment, billing, and follow-up.

## Step 18 - Weakest Component

The weakest component is data. The notebook page cannot be filtered, searched, or summarized easily, and some facts are unclear or repeated. For example, two pets can share a name, and a weight or payment may be written without enough structure to compare it later. This makes Q1, profitability, hard because Dr. Dima would have to reread pages and receipts by hand to add totals.

## Step 19 - Limits of Paper and One Small First Step

Two questions that are hard to answer with paper are Q1, whether the clinic is profitable, and Q4, whether vaccines are on time. The paper system breaks down at the information level because it cannot quickly total revenue or list overdue vaccine records. In R.E.A.D. terms, representation and retrieval are weak because the facts exist but are hard to retrieve in a useful form. A small first step would be a simple shared spreadsheet with date, pet ID, owner, service, vaccine due date, amount charged, and payment status. That would let the clinic search, filter, and total basic facts before buying a larger system.
