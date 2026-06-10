<!-- markdownlint-disable MD060 -->

## Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center">

Chapter 2 introduced a lot of vocabulary quickly: business questions, decisions, KPIs, processes, the DIKW hierarchy, R.E.A.D., stakeholders, information behavior, data quality, and the five components of an information system. Each idea makes sense on its own. The hard part is seeing how they connect. This Let's Build walks you through that connection one step at a time, using a system you already know well — *this course* — and ends with the logic that the rest of the book will turn into a working database. There is no submission for this Let's Build. **Lab 02 — Running PetVax with Information** is where you do this same work for a grade, on a different scenario (a small veterinary clinic). Do the thinking here first, and Lab 02 becomes a transfer, not a cold start.

---

### How To Use This File

This activity is built to be done **in order**, top to bottom. Each section adds one layer to a single chain of reasoning, and later sections reuse what you wrote in earlier ones. Skipping around breaks the chain.

You will keep a short **thinking workbook** — a Google Doc titled `LB02 — Course as a System — <Your Name>`. You will not build tables, schemas, or software yet. You will build the **logic** that the rest of the book turns into a database. Budget about 45-60 minutes.

Inside each section, the same rhythm repeats:

- **Ask** — a question is posed in bold.
- **Try it** — you answer first, in your own words, in your workbook.
- **Guided answer** — a short model answer to compare against.
- **Concept connection** — the Chapter 2 idea the step is teaching.
- **Reflection** — a quick check before you move on.
- **In Lab 02** — the matching step you will do for PetVax.

Do not skip ahead to the guided answer. The model answer is most useful *after* you have written something of your own.

---

### Start With the Questions

Every information system exists to answer questions that lead to decisions. So the first step is not "what data do we have?" It is "what is this system actually being asked?"

**First, what questions would a course need to answer to be run well?**

**Try it.** In your workbook, write 6-8 questions someone running this course would genuinely ask during the term. Push past grades. Think about engagement, preparation, participation, and risk.

**Guided answer.** A strong list goes well beyond final scores:

- Are students keeping up with the assigned work?
- Who is at risk of falling behind, and how early can we tell?
- Which topics are students struggling with most?
- Are students actually opening the readings and materials?
- Is participation healthy, or is the room silent?
- How is the class doing overall, by category, not just on average?
- Is any individual student trending sharply down?

**Next, separate the real performance questions from the noise.** Not every question a person *could* ask about a course is one the system needs to answer. Classify each item below as **Track** (a real course-performance question worth building for) or **Skip** (interesting, but not what this system is for).

| Question | Track or Skip? |
| --- | --- |
| Are students keeping up with their deliverables? | |
| What is the instructor's favorite coffee order? | |
| Who is at risk of failing, and how early can we see it? | |
| Which classroom has the best view? | |
| Which topics have the lowest quiz scores? | |
| What is today's cafeteria menu? | |
| Are students opening the assigned readings? | |
| How many parking spots are open on campus? | |

**Model answers.** Track: rows 1, 3, 5, 7. Skip: rows 2, 4, 6, 8. The "Skip" rows may be fun, but no course decision depends on them, so the system should not carry them.

**Then, match each question you kept to the decision it supports.** A question is only worth tracking if a decision depends on the answer.

| Question (Track) | Decision it supports |
| --- | --- |
| Are students keeping up with deliverables? | Send early outreach; adjust reminders; check for a broken submission step |
| Who is at risk of failing? | Personal outreach by Week 4; referral to advising or tutoring |
| Which topics have low quiz scores? | Reteach the topic; revise the quiz; add practice material |
| Are students opening the readings? | Improve visibility; explain why the reading matters; rework the dependent assignment |

**Concept connection.** Chapter 2 frames every organization as a system that exists to support **decisions**. A question with no decision attached is decoration. Matching questions to decisions *before* designing anything is what keeps a system from filling up with numbers nobody acts on.

**Reflection.** Did any question you wrote fail to connect to a decision? Those are the first ones to drop.

> **In Lab 02.** You will sort fifteen questions a New York City resident might ask and pick the nine that are real PetVax business questions, then match each to the clinic decision it supports.

---

### From Questions to Data and Knowledge

A question cannot be answered if the underlying records do not exist. This step works out two things for each question: the **data the course must capture**, and the **outside knowledge** needed to make sense of it.

**First, what records would the course need to answer your questions?**

**Try it.** Pick two of your "Track" questions. For each, list 4-6 specific data items the course would have to capture.

**Guided answer (using "who is at risk of failing?").** At minimum: student ID, each deliverable and its category, due date, submission status, score, and attendance per session. Notice none of these *appear* on their own — each one is produced by something that happens in the course first.

**Next, connect each record to the process that creates it.** If the process is sloppy, the record is sloppy, and every KPI built on it is sloppy too.

| Course process | Record it creates |
| --- | --- |
| Reading the assigned chapter | A material-view log entry |
| Showing up to class | An attendance mark for that session |
| Asking or answering questions | A participation note or chat entry |
| Submitting an assignment or lab | A submission record with a timestamp |
| Grading a deliverable | A score, a comment, possibly a rubric row |
| Reaching out to a struggling student | An email log or advising note |

**Then, identify the outside knowledge you need to interpret the data.** A number recorded inside the course often means nothing without a fact from outside it. A score of 62 means one thing against a passing line of 50 and something very different against a passing line of 70.

**Try it.** List 2-3 pieces of external knowledge the course needs. Examples: the grading scale that turns scores into letter grades, the institution's passing threshold, the historical pattern that early missed work predicts later failure.

**Concept connection.** This is Chapter 2's **IPO model** in miniature: course processes (inputs and processing) produce records (outputs). It is also the boundary between **data** and **knowledge** — internal records tell you *what happened*, external knowledge helps you judge *whether that is good or bad*.

![The IPO model: every system turns inputs into outputs through a process.](../../../../.images/ch02/figure-2.2-ipo-model.png)

*The IPO model: every system turns inputs into outputs through a process.*

**Reflection.** Which record on your list is the most fragile — the one most likely to be missed or written down inconsistently?

> **In Lab 02.** You will list the data items PetVax must capture for each business question, then identify the external knowledge (healthy weight ranges, vaccine schedules, industry benchmarks) the clinic needs to interpret its own records.

---

### Turn Goals Into KPIs and Decisions

A question points at a goal. A **KPI** makes the goal measurable. A **decision** acts on what the KPI shows. This step forces the link between all three.

**First, turn your questions into KPIs.**

**Try it.** Take 4-5 of your tracked questions and write one KPI for each. A KPI must be quantifiable.

**Guided answer.**

- Current weighted average — overall performance so far.
- Missing-deliverables count — completion behavior.
- Attendance rate — presence.
- Reading-access rate — did students open the assigned material?
- Risk indicator — for example, *no submission in two weeks AND a falling average*.

**Next, attach a decision to each KPI.** A KPI with no decision behind it is a number nobody uses.

| KPI | Decision if it goes red |
| --- | --- |
| Low quiz scores on one topic | Reteach the topic; revise the quiz; add practice |
| Low attendance | Check engagement; review pacing; reach out individually |
| Low reading access | Improve visibility; explain relevance; rework the dependent assignment |
| Missing deliverables | Contact the student early; check for a structural problem |
| Risk indicator triggered | Personal outreach; referral to advising |

**Then, harden the distinction with a quick classify.** Students consistently blur **data**, **KPIs**, and **decisions**. Label each row before moving on.

| Item | Data, KPI, or Decision? |
| --- | --- |
| Maya scored 85 on Quiz 1 | |
| Average quiz score this term | |
| Missing-deliverables count | |
| The instructor emails students with two missing assignments | |
| The instructor reteaches a topic after low quiz scores | |

**Model answers.** *Data, KPI, KPI, Decision, Decision.* A single recorded fact is **data**. A measure built from many facts is a **KPI**. The action a person takes because of the KPI is a **decision**. If you missed one, slow down — this distinction drives the rest of the book.

**Concept connection.** Chapter 2 argues that KPIs translate goals into measurable signals and that choosing KPIs is a managerial decision. What you measure shapes attention, and attention shapes behavior.

**Reflection.** Which of your KPIs would actually *change instructor behavior* if it went red? The ones that would not are candidates to drop.

> **In Lab 02.** You will write KPIs for PetVax questions — vaccine-overdue rate, ER mortality rate, shift-staffing rate — and state the refresh cycle and the decision each one triggers when it moves the wrong way.

---

### Climb the DIKW Ladder

You now have questions, data, KPIs, and decisions. The harder question is *how a single record becomes a decision*. DIKW describes that climb, one rung at a time.

**First, climb the ladder for one KPI.**

**Try it.** Choose one KPI — the missing-deliverables count works well — and fill in all four levels.

**Guided answer (missing-deliverables count).**

| DIKW level | In the course | Guiding question |
| --- | --- | --- |
| **Data** | A single submission record, or its absence, for one student on one deliverable | What was recorded? |
| **Information** | A list of every student with their count of missing deliverables this term | What happened? |
| **Knowledge** | The pattern that students who miss early work are far more likely to fail | Why is it happening? |
| **Wisdom** | The decision to contact at-risk students by Week 4 instead of Week 10 | What should we do? |

**Next, apply the ladder to two more KPIs.** The pattern only sticks when you run it more than once.

**Try it.** Pick two other KPIs from your list and fill in the same four rows for each. One sentence per cell is enough.

**Guided answer (reference rows).**

| KPI | Data | Information | Knowledge | Wisdom |
| --- | --- | --- | --- | --- |
| Low reading access | One material-view log entry for one student | Share of the class that opened this week's reading | Weeks with low reading access have lower quiz scores | Move the reading earlier and explain why it matters |
| Attendance rate | One attendance mark for one session | Attendance percentage by week | Attendance dips before grades drop | Reach out after two missed sessions, not at midterm |

**Concept connection.** DIKW is not a vocabulary exercise. It is a ladder, and every rung takes work — recording, summarizing, interpreting, deciding. The Grading Database is valuable only because it lets people climb that ladder reliably.

![The DIKW ladder applied to the course Grading Database.](../../../../.images/ch02/dikw-grading.png)

*The DIKW ladder applied to the course Grading Database.*

**Reflection.** At which rung does *human judgment* start to matter more than software?

> **In Lab 02.** You will walk one PetVax case — is Buddy the Beagle overweight? — up the full Data → Information → Knowledge → Wisdom ladder, then repeat it for three more clinic decisions.

---

### Trace It Through R.E.A.D.

DIKW names the *stages of meaning*. R.E.A.D. names the *work* an organization does to move through those stages. Tracing the same KPI through both shows the difference.

**Try it.** Take the KPI you climbed in the last step and map it to the four R.E.A.D. stages.

**Guided answer (missing-deliverables count).**

| R.E.A.D. stage | What happens here |
| --- | --- |
| **Representation and Retrieval** | Record submissions, due dates, and student IDs so the system can later answer "who is missing what?" |
| **Expression and Experience** | Display a missing-work view the instructor can scan in under a minute |
| **Association and Acquisition** | Spot that missing work clusters early in the term and predicts later trouble |
| **Decision-Making and Deployment** | Send outreach, adjust reminders, then watch whether the pattern improves |

**Concept connection.** Chapter 2 pairs DIKW and R.E.A.D. on purpose. DIKW is the staircase; R.E.A.D. is the climbing. One describes what meaning looks like at each stage, the other describes the technical and organizational work that gets you there.

![The R.E.A.D. framework: the work of moving from records to decisions.](../../../../.images/ch02/read-framework.png)

*The R.E.A.D. framework: the work of moving from records to decisions.*

**Reflection.** Which R.E.A.D. stage in your trace leans most on human judgment, and which leans most on the system?

> **In Lab 02.** You will trace the Buddy decision through all four R.E.A.D. stages and match clinic activities — recording a weight, showing a chart, spotting a pattern, sending reminders — to the right stage.

---

### Who Needs This — Stakeholders and Information Behavior

A system does not serve one person. Different stakeholders need different information, and the same data reaches them through different channels for different reasons.

**First, list the stakeholders and what each one needs.**

**Try it.** List the people who depend on this course system. For each, write one sentence about what they need to know.

**Guided answer.** The two primary stakeholders are **students**, who need to know where they stand and what to do next, and the **instructor**, who needs accurate records, fast summaries, and early warning signals. Others depend on it too: **teaching assistants** (grading and feedback), the **department head** and **dean** (program quality and comparisons), **advisors** (who to support), and the **ITS team** (which keeps the systems running). Same course, very different information needs.

**Next, trace the information behavior for one KPI.** Information only creates value when someone recognizes a need, seeks the information, and uses it.

**Try it.** For your KPI, write one or two sentences each for the instructor and the student, covering the need, where they look, and how they use it.

**Guided answer.** The **instructor** needs missing-work information to intervene early, looks at it weekly in a report or custom view, and uses it to send outreach. A **student** needs the same information to recover before grades collapse, looks in the "Grades" tab (usually on a phone, often the night before a deadline), and uses it to decide what to submit next.

**Concept connection.** This is **stakeholder analysis** and **information behavior** from Chapter 2. A stakeholder is anyone who affects or is affected by the system. Information behavior is the cycle of need, seeking, and use. A system that ignores who needs what, and how they look for it, will be technically correct and practically useless.

**Reflection.** If this information lived only as a printed report on the instructor's desk, which stakeholder would lose access?

> **In Lab 02.** You will identify which people and organizations are PetVax stakeholders, describe what each needs from the clinic's system, and match clinic scenarios to the need, seeking, and use stages of information behavior.

---

### Check the Data Quality

Every KPI and decision so far assumes the underlying records can be trusted. This step pressure-tests that assumption. Below is a snapshot of how the course might be recorded if no one were careful — the kind of informal notes a busy instructor might jot down.

```text
─── Quick grade notes — this week ───────────────

- Maya — quiz ok, ~85? — lab in
- J. Smith — missed class again
- John S. — turned in lab, no score yet
- Quiz 2 — most did fine
- attendance: took it late, a few unsure
- Lab 3 due... Tues? Wed? — check
- reading: think most opened it
- end of week: grades mostly entered
```

**Spot the data-quality problems.** Read the snapshot, then select every problem that is clearly visible.

| Problem | Present? |
| --- | --- |
| Approximations standing in for facts ("~85?", "most did fine") | |
| Ambiguous identifiers ("J. Smith" vs. "John S." — same person or two?) | |
| Missing values (a lab "turned in" with "no score yet") | |
| Inconsistent or uncertain dates ("Tues? Wed?") | |
| Incomplete records ("a few unsure" on attendance) | |
| The handwriting is too neat | |

**Model answers.** All rows are real problems except the last (a joke). The snapshot fails on every count.

**Next, name the data-quality dimension each problem violates.** Use the four dimensions from Chapter 2.

| Problem | Dimension |
| --- | --- |
| Approximations for facts ("~85?") | Accuracy |
| Ambiguous identifiers ("J. Smith" / "John S.") | Accuracy (and Consistency) |
| Missing score / "no score yet" | Completeness |
| Uncertain dates ("Tues? Wed?") | Consistency |
| "Attendance taken late" | Timeliness |

**Concept connection.** Chapter 2's four data-quality dimensions — **accuracy, completeness, timeliness, consistency** — are management concerns, not just technical ones. Poor data quality at the capture step distorts every KPI and misleads every decision built on top of it, no matter how good the database design is.

**Reflection.** Of the problems above, which one would hurt the course most if it happened every week for a full term, and which question from the first section would suffer most because of it?

> **In Lab 02.** You will read a page from Dr. Dima's handwritten clinic notebook, find every data-quality problem on it, and map each one to the accuracy, completeness, timeliness, or consistency dimension.

---

### Name and Diagnose the System

You have now described a working information system without naming it. This step names it, diagnoses it with the five-component framework, and confirms the data it must capture.

**First, diagnose the course with the five-component framework.**

**Try it.** For each component, write what currently exists in *this* course. Be concrete.

**Guided answer.**

| Component | In this course |
| --- | --- |
| **Hardware** | Student laptops and phones (much Brightspace checking happens on a phone), the instructor's desktop, classroom projector and PC |
| **Software** | Brightspace, email, Google Docs and Sheets, Microsoft Access, sometimes Excel, browser-based readings |
| **Data** | Grades, attendance marks, submission timestamps, material-view logs, participation notes, contact info |
| **Processes** | Submit by 11:59 PM, attendance taken early in class, consistent late penalty, weekly grading, end-of-term grade calculation |
| **People** | Students, instructor, TAs, advisors, department head, dean, and the ITS team that keeps it running |

**Next, name the system and confirm its data.** From here on, the book calls this system the **Grading Database**. The name is misleading on purpose — it is not just a place to store grades. It is a course-performance information system that helps students and the instructor monitor learning, engagement, preparation, participation, and risk.

![Grading Database project icon](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-grading)

**Try it.** Given the questions, KPIs, and decisions from the earlier steps, list in plain bullets what the Grading Database must capture. No field types, no schema, no relationships yet.

**Guided answer.** At minimum:

- which students are enrolled;
- which deliverables exist, their category, and their due date;
- whether each student submitted each deliverable, and the score;
- attendance for each session;
- material- and reading-access events tied to a student and a moment;
- the weighting rules that combine all of the above into a grade.

That is the shopping list. Chapter 3 starts to wrestle with the *shape* it should take.

**Concept connection.** Chapter 2 defines an information system as a **socio-technical arrangement** — technology is one component of five. It also closes the backward-design loop: questions → KPIs → decisions → processes → records → DIKW/R.E.A.D. → **the data the system needs**. You earned the data list by reasoning backward from what the course is trying to accomplish.

**Reflection.** Which of the five components is the weakest link in *your* version of this course?

> **In Lab 02.** You will diagnose PetVax with the same five-component framework and confirm the data the clinic's system must capture to answer Dr. Dima's nine questions.

---

### Your Course Performance Logic Map

By now you should be able to summarize the whole chain on a single page. Fill this in for the KPI you traced across the earlier steps. Nothing to submit — the goal is that you can redraw it from memory.

| Layer | Your answer |
| --- | --- |
| Course-performance question | |
| KPI | |
| Raw data needed | |
| External knowledge needed | |
| Information summary | |
| Knowledge / pattern | |
| Wisdom / decision | |
| Process that creates the data | |
| Biggest data-quality risk | |
| Weakest five-component link | |

If a row is hard to fill in, that is the row to rethink — it usually marks a weak link in the chain.

---

### Final Reflection

Write 4-5 sentences in your workbook answering one of these:

1. Before this exercise, what did you think a "grading database" was for? Has that changed?
2. If you had to choose one KPI to start with — knowing it shapes what the system measures and what people pay attention to — which one would you choose, and why?
3. Where in this course do you see the biggest gap between what is currently captured and what would be useful to capture?

---

### Peek Ahead — Chapter 3

When you listed what the Grading Database must capture, you probably pictured something familiar: a gradebook with one row per student and columns labeled Quiz 1, Quiz 2, Lab 1, and so on. That **wide** layout works fine for one section of thirty students. It quietly breaks the moment you add an assignment, run a second section, or try to answer a question like *what is the average score across all quizzes?* In Chapter 3 we build exactly that wide gradebook in Google Sheets, feel the pain on purpose, and discover why rethinking the *shape* of the data unlocks everything that comes after.

---

### What This Prepares You For

- **Lab 02 — Running PetVax with Information** asks you to run this same reasoning for a small veterinary clinic — different domain, same questions, graded deliverable.
- **Chapter 3** moves your data-capture list into a flat spreadsheet and exposes its limits.
- **Chapter 4** turns the cleaned-up list into the first real database tables in Access.

For now, the point is small but important: a database is the answer to a management question, not the starting point.
