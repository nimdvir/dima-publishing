<!-- markdownlint-disable MD060 -->

## Let's Build — Managing a Course as a Business System

![Let's Build](https://res.cloudinary.com/dkndq6lyz/image/upload/w_200/f_auto/q_auto/LetsBuild_big?_a=BAMAAAhK0)

Chapter 2 introduced a lot of vocabulary quickly: business performance, KPIs, decisions, processes, the DIKW hierarchy, R.E.A.D., information behavior, and the five components of an information system. Each idea makes sense on its own; the hard part is seeing how they fit together. This Let's Build forces that connection by applying the major Chapter 2 ideas to one example you already know intimately — *this course* — and using it to sketch the logic that the rest of the book will turn into a working database.

> **Main chapter file:** [ch02-main-2026-05-21.md](../main/ch02-main-2026-05-21.md)
> **Companion lab:** Lab 02 — *Managing PetVax as a Business System* (Brightspace quiz + Google Doc deliverable)

---

### What You'll Build

A short **thinking workbook** — a Google Doc you keep for yourself — that turns this course into a worked example of every major idea from Chapter 2. You will not build tables, schemas, or software yet. You will build the **logic** that the rest of the book will eventually turn into a database.

There is no submission for this Let's Build. Lab 02 is where you do this work for a grade, on a different scenario (PetVax, a small veterinary clinic).

### What You'll Need

- The Chapter 2 main reading.
- A blank Google Doc titled `LB02 — Course as a System — <Your Name>`.
- About 45-60 minutes.
- Your own honest answers. The point is to think, not to be right on the first try.

### How To Use This File

Every question follows the same pattern:

- **Ask** — a question is posed.
- **Try it** — you answer first in your workbook.
- **Guided answer** — a short model answer to compare against.
- **Concept connection** — the Chapter 2 idea this question is teaching.
- **Reflection** — a quick check before moving on.

Do not skip ahead to the guided answer. The model answer is most useful *after* you have written something of your own.

---

### The Course as a System

We usually think of a course as a class on a schedule. In Chapter 2 terms, a course is also a **business-like system**: it has goals, stakeholders, inputs, processes, outputs, performance measures, and decisions. This section makes that frame explicit.

**If this course were a business, what would count as good performance?**

**Try it.** In your workbook, write 2-3 sentences. Do not just say *good grades*. Push on what the course is trying to accomplish.

**Guided answer.** Good performance means the course is helping students actually learn the material, stay engaged with it, build skills they can use later, and finish in a position to apply what they learned. Grades are one signal of that, but they are not the whole story. A course where everyone scores 90 percent because the quizzes were trivial is not performing well. A course where students struggle but build real skill might be performing better than its averages suggest.

**Concept connection.** Chapter 2 frames every organization as a system with goals, stakeholders, and measurable outcomes. A course fits that frame. Defining performance is the *first* design decision — everything else (what to measure, what to record, what to act on) depends on it.

**Reflection.** Did you define performance only as grades, or did you include learning, engagement, and skill?

---

**Who are the stakeholders, and what does each one need from the course?**

**Try it.** List the stakeholders. For each, write one sentence about what they need to know.

**Guided answer.** The two primary stakeholders are:

- **Students** need to know where they stand, what is missing, how they are doing in different categories, and what to do next.
- **Instructor** needs accurate records, reliable calculations, fast summaries, and early signals when a student may need help.

Several other stakeholders also depend on the course, even if they interact with it less directly: **teaching assistants** (grading and feedback), the **department head** and **dean** (program quality, accreditation, comparisons across sections), **parents** (often paying tuition and asking how things are going), **peer students in later courses** (who inherit whatever skills this course built or failed to build), and the **ITS team** (which keeps Brightspace, email, and campus accounts running). Same course, very different information needs.

**Concept connection.** Chapter 2 defines a stakeholder as anyone who affects or is affected by an organization's activities. One system usually serves several stakeholders at once, with different summaries and different decisions for each.

**Reflection.** Whose needs did you forget? Most students remember themselves and the instructor and stop there.

---

### From Performance to KPIs to Decisions

If performance is the goal, **KPIs** are how we make performance visible, and **decisions** are how we act on what we see. This section forces the link between the three.

**What KPIs would tell you the course is performing well?**

**Try it.** Brainstorm 5-7 measures. Push past grades. Think about engagement, preparation, participation, and risk.

**Guided answer.** A useful first KPI set goes well beyond grades:

- **Current weighted average** — overall performance so far.
- **Missing deliverables count** — workflow and completion behavior.
- **Attendance rate** — physical or virtual presence.
- **Participation rate** — questions asked, discussion contributions.
- **Reading and material access** — did students open the assigned chapter, video, or Brightspace page?
- **Lab and assignment completion rate** — by category, not just overall.
- **Improvement over time** — is a student trending up or down?
- **Risk indicators** — combinations like *no submission in two weeks AND falling average*.

Grades alone are a lagging signal. Most of these other measures appear *before* a grade drops, which is why they are worth tracking.

**Concept connection.** Chapter 2 argues that KPIs translate goals into measurable signals, and that good KPI design is a managerial choice. What you choose to measure shapes attention, and attention shapes behavior.

**Reflection.** Which of your KPIs would *change instructor behavior* if it went red?

---

**For each KPI, what decision could the instructor actually make?**

**Try it.** Take 4-5 KPIs from the list above. For each, write the decision it would support if it went red.

**Guided answer.**

| KPI | Decision it supports if it goes red |
| --- | --- |
| Low quiz scores on one topic | Reteach the topic; revise the quiz; add practice material |
| Low attendance | Check engagement; review class pacing; reach out individually |
| Low reading/material use | Improve visibility; explain why the reading matters; rework the assignment that depends on it |
| Missing labs | Contact the student early; adjust reminders; check for a structural issue (unclear submission, broken link) |
| Low participation | Redesign discussion format; add small-group structure; lower the barrier to speaking |
| Risk indicator triggered | Personal outreach; referral to advising or tutoring |

**Concept connection.** This is the **data-to-performance chain** from Chapter 2 in miniature. A KPI is only useful if it points to a decision. A dashboard tile with no decision attached is decoration, not management.

**Reflection.** Did any of your KPIs *not* connect to a decision? Those are candidates to drop.

---

**Quick classify — is each item Data, a KPI, or a Decision?**

Students consistently blur these three. Before moving on, label each item below.

**Try it.** For each row, write *Data*, *KPI*, or *Decision* in your workbook.

| Item | Data, KPI, or Decision? |
| --- | --- |
| Maya scored 85 on Quiz 1 | |
| Average quiz score this term | |
| Missing-deliverables count | |
| The instructor emails students with two missing assignments | |
| The instructor reteaches a topic after low quiz scores | |

**Model answers.** *Data, KPI, KPI, Decision, Decision.* If you missed one, slow down — this distinction drives the rest of the activity.

**Concept connection.** **Data** is a single recorded fact. A **KPI** is a measure built from many facts to make performance visible. A **decision** is the action a person takes because of what the KPI shows. Mixing them up is how dashboards end up full of numbers nobody acts on.

**Reflection.** Which of the three is hardest for you to spot in everyday life — raw data, the measure built from it, or the decision it should drive?

---

### Where the Evidence Comes From

KPIs do not appear from nowhere. Every measure depends on a **business process** that produces a **record**. If the process is sloppy, the record is sloppy, the KPI is sloppy, and the decision is sloppy.

**What course processes generate the evidence behind your KPIs?**

**Try it.** List the activities that happen in this course. For each, write what record it produces.

**Guided answer.**

| Process | Record it creates |
| --- | --- |
| Reading the assigned chapter | Brightspace page-view log |
| Showing up to class | Attendance mark for that session |
| Asking or answering questions | Participation note or chat log |
| Submitting an assignment or lab | Submission record with timestamp |
| Grading a deliverable | Score, comment, possibly a rubric row |
| Returning feedback | Feedback record visible to the student |
| Reaching out to a struggling student | Email log, advising note |

Notice that none of these records *appear in the database* — they happen first in the world, and then somebody captures them. The capture step is where most data quality lives or dies.

**Concept connection.** Chapter 2's **IPO model** treats every organization (and every information system inside it) as turning inputs into outputs through a process. The records that fill the Grading Database are the *outputs of course processes*. Weak processes produce weak data, no matter how good the database design is.

**Reflection.** Which process in your list is the most fragile? Where is data most likely to be missed or recorded inconsistently?

---

### From Records to Action

So far you have performance, KPIs, decisions, processes, and records. This section asks the harder question: **how do records become action?** This is where DIKW and R.E.A.D. earn their keep.

**Pick one KPI. Climb the DIKW ladder for it.**

**Try it.** Choose one KPI (the missing-deliverables count is a good one) and fill in the four levels.

**Guided answer (using missing-deliverables count).**

| DIKW Level | In the course | Guiding question |
| --- | --- | --- |
| **Data** | A single submission record — or its absence — for one student on one deliverable | What was recorded? |
| **Information** | A list of every student with the number of missing deliverables this term | What happened? |
| **Knowledge** | A pattern: students who miss early-term work are far more likely to fail the course | Why is it happening? |
| **Wisdom** | Decision: contact at-risk students by Week 4 instead of Week 10 | What should we do? |

**Concept connection.** DIKW is not a vocabulary exercise. It is a ladder, and every step requires work — counting, comparing, interpreting, deciding. The Grading Database is valuable only because it lets people climb that ladder reliably.

**Reflection.** At what step on your ladder does *judgment* start to matter more than software?

---

**Trace the same KPI through R.E.A.D.**

**Try it.** Map your KPI to the four R.E.A.D. stages.

**Guided answer (still using missing-deliverables count).**

| R.E.A.D. stage | What happens here |
| --- | --- |
| **Representation and Retrieval** | Record submissions, due dates, and student identifiers so the system can later answer "who is missing what?" |
| **Expression and Experience** | Display a missing-work view or dashboard the instructor can scan in under a minute |
| **Association and Acquisition** | Spot the pattern that missing work clusters early in the term and predicts later trouble |
| **Decision-Making and Deployment** | Send outreach, adjust deadlines, revise reminder structure, then watch whether the pattern improves |

**Concept connection.** Chapter 2 pairs DIKW and R.E.A.D. on purpose. **DIKW** describes the stages of meaning. **R.E.A.D.** describes the organizational and technical *work* required to move through those stages. One is the staircase, the other is the climbing.

**Reflection.** Which R.E.A.D. stage in your trace depends most on human judgment, and which depends most on the system?

---

**Who needs this information, why, and where do they look for it?**

**Try it.** For your KPI, write one or two sentences for the instructor and one or two sentences for the student.

**Guided answer.** The **instructor** needs missing-work information to intervene early, so they look at it weekly in a Brightspace report or a custom view. A **student** needs the same information to recover before grades collapse, so they look in the Brightspace "Grades" tab — usually on their phone, often the night before something is due. Teaching assistants, advisors, and parents may also have an interest, but their needs are narrower and less frequent.

**Concept connection.** This is **information behavior** from Chapter 2: people recognize a need, seek information, process what they find, and apply it. The same data feeds different people through different channels for different reasons. A system that ignores those differences will be technically correct and practically useless.

**Reflection.** If the only place this information lived were a printed report on the instructor's desk, who would lose access?

---

### Naming the System

You have now described a working information system — you just have not named it yet. This section names it, diagnoses it with the five-component framework, and lists the data it would need to capture.

**Diagnose the course system with the five-component framework.**

**Try it.** For each component, write what currently exists in *this* course. Be concrete.

**Guided answer.**

| Component | In this course |
| --- | --- |
| **Hardware** | Students bring a mix of MacBooks, Windows laptops, and phones. Many do most of their Brightspace checking on a phone. The instructor uses a desktop with two monitors. Classrooms have a projector and instructor PC. |
| **Software** | Brightspace (LMS), email, Google Docs and Sheets, Microsoft Access on the instructor's machine, sometimes Excel for quick analysis, browser-based readings. |
| **Data** | Grades, attendance marks, submission timestamps, material-view logs, participation notes, contact information. |
| **Processes** | Submit assignments by 11:59 PM, attendance taken about ten minutes into class, late penalty applied consistently, weekly grading turnaround, end-of-term grade calculation. |
| **People** | Students, instructor, teaching assistants, advisors, department head, dean, parents, peer students in later courses, the **ITS team** that keeps Brightspace and accounts running. |

**Concept connection.** Chapter 2 defines an information system as a **socio-technical arrangement** — not just software. The five-component framework forces you to see all of it at once.

**Reflection.** Which component, in *your* version of this course, is the weakest link?

---

**If student performance is poor, is that automatically a technology problem?**

**Try it.** Write one paragraph. Use the five-component framework to push back on the easy answer.

**Guided answer.** Almost never. Poor performance can come from any of the five components. The hardware could be fine and the software flawless, but the **process** of submitting work might be unclear, the **data** about who is missing what might be inconsistent, or the **people** part — student engagement, instructor follow-up, TA grading speed — might be the actual bottleneck. "Buy better software" is usually the most expensive and least useful response to a system problem.

**Concept connection.** This is the chapter's distinction between **information systems and information technology**. Technology is one component of five. Treating a system failure as a technology failure misdiagnoses most real cases.

**Reflection.** Name a past frustration you blamed on "the technology" that was probably actually about process or people.

---

**Name the system. What data would it need to capture?**

Everything you have described so far is a working information system. In the rest of this book we will call it the **Grading Database**. The name is misleading on purpose — it is not just a place to store grades. It is a course-performance information system that helps the instructor and students monitor learning, engagement, preparation, participation, and risk, and that helps everyone make better decisions because of what it shows.

**Try it.** Given the KPIs you chose and the decisions they support, list (in plain bullets, no tables) what the Grading Database would need to capture. No field types, no schema, no relationships yet.

**Guided answer.** At minimum, the Grading Database would need to capture:

- which students are enrolled;
- which deliverables exist, what category they belong to, and when they are due;
- whether each student submitted each deliverable, and the score they received;
- attendance for each class session;
- material- and reading-access events tied to a student and a moment in time;
- the weighting rules the course uses to combine all of the above into a grade.

That is the shopping list. Chapter 3 starts to wrestle with the *shape* that shopping list should take.

**Concept connection.** This closes the backward-design loop: performance → KPIs → decisions → processes → records → DIKW/R.E.A.D. → **data the system needs**. You did not start by listing data. You earned the list by working backward from what the course is trying to accomplish.

**Reflection.** Look at your list. Which item is most likely to be captured inconsistently in the real world?

---

### Your Course Performance Logic Map

By the end of this activity, you should be able to summarize your whole chain of thinking on a single page. Fill this in for the KPI you traced across the earlier sections. Nothing to submit — the goal is that you can re-draw it from memory.

| Layer | Your answer |
| --- | --- |
| Course-performance problem | |
| KPI | |
| Raw data needed | |
| Information summary | |
| Knowledge / pattern | |
| Wisdom / decision | |
| Process that creates the data | |
| R.E.A.D. stage most involved | |
| Weakest five-component link | |
| Why this is an information system | |

If any row is hard to fill in, that is the row to go back and re-think — it is usually a sign of a weak link in the chain.

---

### Final Reflection

Write 4-5 sentences in your workbook answering one of these:

1. Before this exercise, what did you think a "grading database" was for? Has that changed?
2. If you had to choose one KPI to start with — knowing it would shape what the system measures and what the instructor pays attention to — which one would you choose, and why?
3. Where in this course do you see the *biggest gap* between what is currently captured and what would be useful to capture?

---

### Peek Ahead — Chapter 3

When you wrote your list of what the Grading Database needs to capture, you probably pictured something familiar: a Brightspace-style gradebook with one row per student and columns labeled Quiz 1, Quiz 2, Lab 1, and so on. That **wide** layout works fine for one section of thirty students. It quietly breaks the moment you add an assignment, run a second section, or try to answer a question like *what is the average score across all quizzes?* In Chapter 3 we will build exactly that wide gradebook in Google Sheets, feel the pain on purpose, and discover why rethinking the shape of the data unlocks everything that comes after.

---

### What This Prepares You For

- **Lab 02** asks you to run the same analysis for **PetVax**, a small veterinary clinic — different domain, same questions, graded deliverable.
- **Chapter 3** moves your data-capture list into a flat spreadsheet and exposes its limits.
- **Chapter 4** turns the cleaned-up list into the first real database tables in Access.

For now, the point is small but important: a database is the answer to a management question, not the starting point.
