<!-- Chapter edit 2026-06-05: structural restructure — orientation template, heading hierarchy, Learning Objectives section, single intro video, About-the-Author relocated. Technical meaning preserved. -->
<!-- metadata: date="2026-06-05" -->

<!-- Chapter edit 2026-06-05 (pass 2): section reorder — How the Book Is Organized now precedes How Each Chapter Works; Bloom's Taxonomy moved up to follow the chapter rhythm; The Tools You Will Use moved down to follow The Two Running Projects. Resolved two author comments (Let's Build lab-foundation note; RAT design note) by keeping the existing in-section explanations and removing the commented draft blocks (content preserved in the lets-build and rat companion files). -->

# Chapter 1: Introduction to the Textbook

*Orientation to the Book and the Journey from Data to Decision*

## Introduction

![Left-to-right roadmap diagram on a clean white background showing the book journey from raw data to tables, relationships, queries, analytics, and business decisions. Text in the image reads From data toward better business decisions. The tone is clear, organized, and encouraging.](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-cover)

*From data toward better business decisions.*

This chapter is your **orientation to the book and the Journey from Data to Decisions**. It explains where the book is going, what you will build, which tools you will use, and why this material matters for business students, managers, analysts, entrepreneurs, and anyone whose work depends on data.

<iframe width="560" height="315" src="https://www.youtube.com/embed/kpUTXxPuEuU?si=TPXRR5ALj18FrWwW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Watch the Chapter 1 overview video](https://youtu.be/kpUTXxPuEuU?si=e1N_f9y2ZLZNvP_i)

The book follows one continuous **Instructional Arc** that connects information systems, relational databases, **SQL**, analytics, and decision-making. It is built around a simple but powerful idea: data becomes valuable when people organize it, connect it, question it, analyze it, and use it to make better decisions. 


![Introductory visual connecting business questions, database structure, and decision use across the course](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-1-introduction2)

*This book keeps business questions, database structure, and decision use in one continuous teaching narrative.*


You will not learn databases as a pile of disconnected terms. You will learn databases as part of a larger business system that helps organizations improve performance with information technology.

You will also put theory into practice. You will work with two main projects, the **Grading Database** and PetVax, so you can move from **Guided Practice** to **Transfer Practice**. The goal is not to memorize disconnected technical steps. The goal is to understand how data becomes structure, how structure supports analysis, and how analysis supports better business decisions.

![Learning objectives graphic linking Chapter 1 goals to the course's business, technical, and systems-thinking outcomes](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-figure12-objectives)
*The opening visual shows the learning goals that connect business meaning, technical structure, and the data-to-decisions journey.*



![Six-stage flow from data to decisions](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-flow)
*The book's central learning arc moves from data to tables, relationships, queries, analytics, and decisions.*

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Follow the arc</strong></p>
  <p>Data → Tables → Relationships → Queries → Analytics → Decisions</p>
  <p>Keep this sequence in mind as you read. Every chapter helps you move from raw data to better business decisions.</p>
</div>





<div class="page-break"></div>

## Core Concepts: The Data-to-Decisions Journey

### Learning Objectives

**After reading this chapter, you will be able to:**

- explain why this book connects databases, SQL, analytics, and business performance;
- describe the book's central learning arc from data to decisions;
- identify the major tools used throughout the book and explain what each one is for;
- describe the role of the Grading Database and the PetVax Veterinary Hospital Database;
- explain how the chapters build from foundations to strategy;
- recognize how the book's chapter structure supports guided learning and independent application;
- describe the habits that help students succeed in technical business learning; and
- explain why this course takes a systems-thinking rather than a tool-first approach.

<div class="page-break"></div>



![Chapter 1 overview infographic linking structure, insight, strategy, and project-based learning](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-ch01-infographic)
*Chapter 1 at a glance: the course connects structure, insight, strategy, and project-based learning.*

<div class="page-break"></div>

### Why This Book Exists

When I talk to students after an information systems or database course, and you often hear some version of the same three concerns:

> "I understand the terms, but not how they connect."
>
> "We learned SQL, but I do not really know why it matters."
>
> "Databases feel intimidating."

Those reactions are honest. They point to a real learning problem.

![Students confronting disconnected course ideas and uncertainty about how databases, SQL, analytics, and strategy fit together](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-frustration)
*Many students start with fragmented ideas about databases and analytics, which makes the subject feel harder than it needs to be.*

Many students do not struggle with information systems because they are unwilling to learn. They struggle because the material often feels fragmented. A typical textbook or course might teach information systems in one chapter, data in another, SQL later, dashboards near the end, and business strategy somewhere else. Each topic may be useful, but students are left to answer the most important question on their own: **how does this all connect?**


![Introductory visual for the course data-to-decisions journey](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-figure-1-1-intro)

*The chapter begins by connecting database learning to practical business questions.*


That missing connection shows up quickly. A student may learn the definition of a database but not understand why database structure affects business reporting. A student may write a SQL query but not understand what decision the query supports. A student may see a dashboard but not know whether the numbers behind it are trustworthy. In those moments, the problem is not motivation. It is structure.

![Business problem illustration showing the gap between disconnected technical tasks and clear business decisions](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-problem)
*The missing link is often the connection between technical work and the decision it is supposed to support.*

This book was written to solve that problem. The goal is not to turn every business student into a software engineer. The goal is to help you understand how data systems work well enough to ask better questions, design better structures, interpret outputs, and make stronger decisions.

Here is the promise of the book:

> **You will learn how data becomes business performance.**

![Visual showing how raw data moves through structure, queries, and analysis into business decisions](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-image-002)
*Data becomes more useful as it moves through structure, queries, analysis, and decision use.*

That means you will learn technical skills, but always with a business purpose. You will write SQL because SQL helps answer questions. You will design tables because table structure affects accuracy. You will study relationships because relationships determine what a system can know. You will build reports and dashboards because decision-makers need clear evidence, not just stored records.

This book is also written for a mixed audience. It is meant to be clear enough for business students who do not see themselves as technical, and rigorous enough for students who already have some technical background. If you are newer to data work, the chapters take you step by step. If you arrive with more experience, the relational design, SQL, and analytics sections give you room to push further.

![Transition roadmap showing the course moving from foundations to structure, queries, analytics, and strategy](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-pathway)

*Chapter 1 provides orientation, and the next chapters build the foundation that leads into structure, queries, analytics, and strategy.*

The work is practical for a reason. Most early business careers now expect some level of data fluency. Internships and entry-level roles in analytics, operations, marketing, finance, consulting, and product work routinely ask new hires to pull data, write a query, read a report, or question a number. This book is designed to help you arrive ready for that kind of work — not as a software engineer, but as a business person who can think clearly with data.

If the technical side of this material feels new, that is fine. You do not need to arrive as a programmer. You do need curiosity, patience, and a willingness to work through examples carefully. Errors and small frustrations are part of learning here, not signs that you do not belong.



<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Build systems thinking</strong></p>
  <p>The point of this course is not to memorize database terms. It is to build <strong>systems thinking</strong>: the ability to see how data, structure, analysis, and decisions work together.</p>
</div>

![Reliable reporting begins with well-structured records and relationships](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-image-003)
*Business performance depends on structured, reliable data systems that connect records to decisions.*

<div class="page-break"></div>

### The Big Idea: From Data to Decisions

As we mentioned earlier, every chapter in this book sits somewhere on one continuous arc:

> **Data -> Tables -> Relationships -> Queries -> Analytics -> Decisions**

Read it left to right.


![Continuous blueprint connecting data, tables, relationships, queries, analytics, and decisions](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-master-blueprint-continuous)

*The master blueprint shows how the book's core arc stays connected from start to finish.*


- **Data** is the raw material: records, numbers, categories, dates, names, transactions, clicks, payments, grades, appointments, and observations.
- **Tables** give data structure by organizing it into rows and columns.
- **Relationships** connect tables so the system can represent real business activity.
- **Queries** ask precise questions of the data.
- **Analytics** turn query results into patterns, summaries, metrics, charts, and explanations.
- **Decisions** use those outputs to improve action, performance, and strategy.


![Phase 1 visual showing how real activity becomes structured data](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-phase-1-structuring-reality)

*Phase 1 focuses on structuring real-world activity into reliable data, tables, and relationships.*



![Phase 2 visual showing how queries and analytics extract value from structured data](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-phase-2-extracting-value)

*Phase 2 focuses on using queries and analytics to extract business value from structured data.*


A simple real-world example makes this easier to see.

Imagine a veterinary clinic that wants to reduce missed appointments. At first, the clinic may only have scattered records: pet names, owner names, appointment dates, phone numbers, treatment notes, and payment information. Those records become useful only when they are organized. The clinic needs tables for owners, pets, appointments, treatments, and invoices. Those tables need relationships so each pet is connected to the correct owner and each appointment is connected to the correct pet.

Once the structure is reliable, the clinic can query the data. Which appointments are missed most often? Which reminders seem to work? Which days have the highest no-show rates? Those query results can feed analytics. The analytics can support decisions about reminders, staffing, scheduling, and customer service.

![Dashboard and report view showing how structured query results become usable metrics and decisions](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-business-performance-architecture)

*When data is structured well, query results can become reports, metrics, and decisions that managers can actually use.*

That is the journey from data to decisions. The same pattern appears in retail, banking, healthcare, higher education, logistics, marketing, and digital platforms. The domain changes. The logic remains.

<div class="page-break"></div>

### Why Databases Matter for Business Performance

A database is not just a place to store data. It is a structure that shapes what an organization can see, measure, report, and improve. That is why database design has business consequences.

A poorly designed database can make simple questions hard to answer. It can create duplicate records, inconsistent reports, missing information, and confusing dashboards. A well-designed database makes information easier to retrieve, compare, trust, and use.

Think about a coffee shop. If sales, inventory, suppliers, and menu items are tracked in separate spreadsheets with inconsistent names, the owner may struggle to answer basic questions:

- Which items sell out fastest?
- Which ingredients are wasted most often?
- Which supplier problems affect daily sales?
- Which products have strong sales but weak profit margins?

Those are business questions. But answering them depends on data structure.

Now think about a larger organization. A hospital needs accurate patient, appointment, billing, and treatment records. A retailer needs reliable product, inventory, customer, and sales data. A university needs information about students, courses, assignments, grades, and attendance. 


In every case, performance depends on whether the organization can capture the right data, structure it correctly, retrieve it efficiently, and interpret it responsibly.


![Innovation paradox visual linking technology value to systems and decisions](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-innovation-pardox)

*Technology creates value only when organizations connect innovation to clear systems and decisions.*


This is why the book connects databases with management information systems. The database is not separate from the business. It is part of how the business learns.

<div class="page-break"></div>

### What Makes This Book Different

This book is built around a common problem in MIS and database learning: readers are too often asked to connect the important ideas on their own.

Some books stay mostly conceptual. They talk about strategy, digital change, or business value, but give students very little real data work. Other books go hard in the opposite direction. They teach tools and syntax, but leave students wondering why any of it matters. That split creates a real learning problem. Students may learn pieces of the work without seeing how structure, analysis, and judgment fit together.

This book tries to close that gap without making the material heavier or more intimidating. It does so through four design choices.

1. **Business Meaning** first. Technical work appears in context, not in isolation. You will usually begin with a question an organization might actually care about.
2. **One continuous system narrative.** You will not jump randomly from topic to topic. Each major idea prepares you for the next one.
3. **Guided practice and transfer.** You first learn a structure in a familiar setting, then use the same logic in a different business context.
4. **Practical tools across a connected workflow.** The point is not to chase software trends. The point is to show how core ideas travel across environments.

The book is not a software manual. It is also not a purely conceptual management text. It sits in the space between business judgment and technical structure. That middle space is where real information systems work happens.

![Disconnected database topics shown as separate puzzle pieces with student concerns about SQL, databases, analytics, and strategy](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-ch1-illusion-of-fragmented-knowledge)
*Students often experience databases, SQL, analytics, and strategy as disconnected topics instead of one connected system.*


<div class="page-break"></div>

## How the Book Is Organized

This section zooms out from a single chapter to the whole book. It shows how the chapters connect, how the six parts build on each other, and which competencies the book develops.

### The Book Flow: From Foundations to Strategy

The book is organized as a journey from foundations to strategy. Each chapter adds a new layer. The early chapters give you the vocabulary and logic to understand why data matters. The middle chapters build technical skill with databases, SQL, and design. The later chapters connect those skills to analytics, management, and strategy.


![First-half course roadmap from foundations through relational design](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-updated-part-1)

*The first half of the book builds the foundation for data, databases, SQL, and relational design.*



![Second-half course roadmap from administration through analytics and strategy](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-updated-part-2)

*The second half of the book connects database skill to administration, analytics, strategy, and integration.*


### The Six-Part Journey

The chapters are grouped into six broad parts. Each part builds on the previous one, so the book gradually moves from foundational concepts to practical database work, then to broader questions of business performance, strategy, and ethical decision-making.

|                                              Part | Chapters  | Main Focus                                                                                                                                                                                            | Why It Matters                                                                                                                                             |
| ------------------------------------------------: | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                           **Part 1: Foundations** | **1–3**   | Introduces the textbook, explains how information systems support business performance, and establishes core data concepts such as data types, metadata, quality, governance, and the data lifecycle. | Gives students the conceptual foundation for understanding why data matters before they begin working with databases directly.                             |
|                     **Part 2: Databases and SQL** | **4–5**   | Introduces databases as an improvement over spreadsheets and flat files, then presents SQL as the language used to ask structured business questions.                                                 | Helps students see databases not as abstract technical tools, but as practical systems for organizing and retrieving useful business information.          |
|                     **Part 3: Relational Design** | **6–8**   | Explains the relational model, connected tables, redundancy reduction, normalization, and midterm integration of the first half of the course.                                                        | Shows students how good database structure improves accuracy, consistency, and reliability.                                                                |
|               **Part 4: Advanced SQL and Design** | **9–10**  | Extends SQL into more advanced analytical patterns and moves from querying existing databases to designing reliable information systems.                                                              | Helps students connect database querying with system design, business rules, and deeper analytical thinking.                                               |
| **Part 5: Administration, BI, and Visualization** | **11–14** | Covers database administration, security, backup, recovery, access control, business intelligence, analytics, advanced database techniques, and Power BI.                                             | Connects database work to operational reliability, managerial reporting, dashboards, and decision support.                                                 |
|              **Part 6: Strategy and Integration** | **15–17** | Connects information systems to business strategy, integrates the course as a whole, and closes with ethics, responsibility, and lifelong learning in data-driven work.                               | Encourages students to think beyond technical skills and consider how information systems shape organizations, decisions, and professional responsibility. |


![Visual roadmap showing how the first half of the book is organized, covering Foundations, Databases and SQL, and Relational Design](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-how-the-book-is-organized)

*The first half of the book establishes the core database foundations and relational design principles.*

![Visual roadmap showing how the second half of the book is organized, covering Advanced SQL, Administration, Business Intelligence, and Strategy](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-organized-part2)

*The second half of the book connects database structure to administration, analytics, business intelligence, and strategy.*

The sequence is cumulative. Early chapters give you vocabulary and logic. Middle chapters build technical skill. Later chapters connect those skills to analytics, management, and strategy. You cannot write strong SQL against weak structure. You cannot build trustworthy analytics from messy data definitions. You cannot talk about strategy in a useful way if the underlying system cannot capture and report information well.

You are not just learning isolated tools. You are learning a way of seeing systems.

![Six-part book roadmap from foundations through databases, design, analytics, and strategy](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-ch1-six-part-journey-foundations-to-strategy)
*The book progresses through six connected parts, moving from foundations to databases, design, analytics, and strategy.*

### Five Core Competencies

By the end of this book, you should be able to do five things well. These are the book's **Core Competencies**, and every chapter develops at least one of them.

![Five core competencies mapped across the course from foundational literacy to strategic problem solving](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-competencies-map)
*The course competencies build from foundational understanding toward stronger analysis, design, and decision-making.*

| Competency                            | What It Means                                                                                        |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Foundational information literacy** | Explain how data, databases, and information systems support organizational decision-making.         |
| **Applied database management**       | Design and query relational databases to answer realistic business questions.                        |
| **Data integrity and system quality** | Use relational modeling and normalization to make data accurate, consistent, and reliable.           |
| **Performance-oriented analysis**     | Interpret reports, metrics, and outputs in ways that connect technical work to business performance. |
| **Strategic problem solving**         | Combine technical reasoning and business context to evaluate options and recommend decisions.        |

![Five core systems competencies shown as stacked levels from information literacy to strategic problem solving](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-ch1-developing-five-core-systems-competencies)
*Five core systems competencies moving from foundational information literacy to strategic problem solving.*

These competencies move from foundational to integrative. The first helps you talk about data systems intelligently. The fifth helps you sit in a meeting and argue, with evidence, for one option over another.

![Five core systems competencies shown as connected capabilities, not isolated tasks](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-image-005)
*The course builds connected capabilities — information literacy, database management, data integrity, performance-oriented analysis, and strategic problem solving.*

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Anchor every chapter to a competency</strong></p>
  <p>When a chapter feels abstract, ask which competency it is building. That single question keeps the work grounded.</p>
</div>

---

<div class="page-break"></div>

## Why the Book Is Sequenced This Way

This book is organized around a deliberate learning sequence. The goal is not only to introduce topics in a reasonable order, but to help you build the kind of mental model that professionals use when working with real information systems.

![Conceptual architecture of the book showing the progression from business foundations through database design, queries, analytics, and strategy](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/Database-book-BITM330/ch01-introduction-to-course/ch01-book-conceptual-architecture)

*The book's learning progression moves from business foundations through structured data, querying, analytics, and strategic decision-making.*

The sequence follows a simple progression:

```
Business value
↓
Decisions
↓
Measurement
↓
Information systems
↓
Data foundations
↓
Database design
↓
Queries
↓
Analytics
↓
Strategy
```

This order matters.

Before writing complex queries, you first need to understand what a business is trying to accomplish, what decisions managers need to make, and what performance measures matter. Before designing dashboards, you need to understand the structure of the data underneath them. Before using analytics strategically, you need to understand how tables, relationships, keys, and queries shape what can be measured and trusted.

In other words, the book moves from **why systems matter** to **how systems are built**, and then to **how systems support decisions**.

The chapters are arranged to support that cognitive progression:

| Chapters | Topic Focus | Cognitive Goal |
|---|---|---|
| **1–3** | Business foundations, information systems, and data fundamentals | Build conceptual understanding |
| **4** | Databases and DBMS concepts | Understand structured data storage |
| **5** | SQL basics | Develop procedural querying skills |
| **6** | The relational model | Understand structural reasoning through keys and relationships |
| **7** | Normalization | Learn design logic and data integrity principles |
| **8** | Midterm review | Integrate and check first-half understanding |
| **9** | Database design and ER modeling | Think like a system designer |
| **10** | Advanced SQL for business analysis | Ask deeper analytical questions of designed databases |
| **11** | Database administration | Understand operational reliability, security, and maintenance |
| **12** | Business intelligence and analytics | Turn operational data into insight |
| **13** | Advanced database techniques | Improve performance, flexibility, and technical robustness |
| **14** | Power BI and business reporting | Communicate insight to decision-makers |
| **15** | Business strategy and information systems | Connect systems to competitive advantage |
| **16–17** | Final integration and conclusion | Synthesize the full data-to-decisions journey |

The first half of the book builds the foundation. You begin with business performance, information systems, data fundamentals, databases, SQL basics, the relational model, and normalization. These chapters give you the vocabulary and structure needed to understand how reliable data systems work.

The midterm functions as an integration checkpoint. By that point, you should understand the basic logic of data, tables, relationships, SQL, and normalization.

After the midterm, the book shifts from understanding existing database structures to designing and extending them. That is why the next major step is **database design and ER modeling**. At this stage, you are ready to ask a deeper question:

> How would I design a reliable database from scratch?

This is where requirements, entities, attributes, relationships, cardinality, optionality, and ER diagrams come together. These concepts help you think like a database designer, not just a database user.

Only after that design foundation is in place do we move into **advanced SQL**. This sequence is intentional. Advanced SQL depends on understanding schema logic. To write complex joins, subqueries, CTEs, window functions, and analytical queries, you need to understand how the database is structured and why it was designed that way.

A useful way to think about the second half of the book is:

```
Design
→ Advanced SQL
→ Database administration
→ Business intelligence
→ Advanced database techniques
→ Reporting
→ Strategy
→ Integration
```

This sequence mirrors how database work develops in organizations. First, a system must be designed. Then it can be queried. Then it must be administered, secured, optimized, analyzed, visualized, and aligned with strategy.

The Grading Database supports this progression throughout the book. Early on, it helps illustrate tables, keys, relationships, and normalization. Later, it becomes a system for design, advanced querying, reporting, business intelligence, and strategic analysis.

This is one of the central lessons of the course:

> A database is not just a place to store data. It is a structured model of how an organization understands its work.

By the end of the book, you will not only know individual tools and concepts. You will understand how they fit together into a complete system for turning data into decisions.

---

<div class="page-break"></div>

## How Each Chapter Works

This section explains both how each chapter is organized and how the chapters fit together into one connected book.

Every chapter follows a predictable rhythm so you can focus on the ideas, not on guessing what comes next.

![Chapter rhythm diagram](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-image-008)
*The chapter rhythm moves from concepts and guided building to vocabulary, reflection, assessment, and lab application. Every chapter follows a repeatable learning sequence that supports steady growth.*

### Introduction

The **Introduction** orients you to the chapter. It explains what the chapter covers, why the topic matters for business, and how it connects to the data-to-decisions arc.

### Learning Objectives

The **Learning Objectives** list what you should be able to do after reading the chapter. Use them as a checklist, and revisit any objective you cannot yet meet before moving on.

### Core Concepts

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-concepts" alt="Core Concepts section icon" width="220">
</p>

<p align="center"><em>Core Concepts introduces the main ideas, explanations, examples, and diagrams that frame the chapter.</em></p>

The **Core Concepts** section introduces the essential ideas that shape each chapter. Here, you will encounter the key terms, models, principles, and examples needed to understand the topic before applying it in practice. This section helps you see not only *what* a concept means, but also *why* it matters in business and information systems. Most concepts are reinforced with a business example, a diagram, or a short scenario so the idea is easy to picture before you apply it.

### Let's Build

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-let-build-resize" alt="Let's Build section icon" width="220">
</p>

<p align="center"><em>Let's Build guides you step by step through the Grading Database so you can turn concepts into practice.</em></p>

The **Let's Build** section turns concepts into guided practice. In this part of the chapter, you will work through the Grading Database in a structured and manageable way. The goal is to help you move from understanding an idea to using it to build tables, relationships, queries, forms, reports, or other database components. Let's Build is also the foundation for the chapter Lab: the steps you complete here become your reference and model when you transfer the same logic to the PetVax case.

### Terms Treasury

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-terms-sizedmin" alt="Terms Treasury section icon" width="220">
</p>

<p align="center"><em>Terms Treasury reinforces the vocabulary you need to recognize, understand, and use correctly.</em></p>

The **Terms Treasury** section highlights the vocabulary you need throughout the chapter. Database work depends on precise language, so this section helps you recognize important terms, connect them to examples, and use them correctly in class discussions, assignments, quizzes, and technical explanations. Each term appears in a table with its definition, its business significance, and a short example. A separate Acronyms and Abbreviations list explains short forms such as SQL, ERD, and DBMS and shows where they appear.

### Review and Reflection

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-revie-resized" alt="Review and Reflection section icon" width="220">
</p>

<p align="center"><em>Review and Reflection helps you connect technical ideas to business meaning and real-world decisions.</em></p>

The **Review and Reflection** section gives you an opportunity to pause, consolidate, and make meaning from what you have learned. Rather than simply repeating definitions, this section asks you to connect technical ideas to business problems, organizational decisions, and real-world information systems. It has three parts: Review Questions that check your understanding of the core ideas, Reflection Questions that ask you to weigh trade-offs in realistic business situations, and Personal Reflection Questions that connect the chapter to your own habits, goals, and professional development.

### RAT / Quiz

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/RAT_nqr5a3?_a=BAMAAAX00" alt="RAT or Quiz section icon" width="220">
</p>



<p align="center"><em>RAT / Quiz checks reading comprehension and conceptual understanding before class or before advanced work.</em></p>

The **RAT / Quiz** section checks your reading comprehension and conceptual understanding. These assessments are designed to help you identify what you already understand and where you may need additional review. They also reinforce the most important ideas so that you are prepared to participate, practice, and apply the material. The questions are built around Bloom's Taxonomy, moving from recall toward application and analysis, and they use chapter-specific scenarios rather than generic facts. That design rewards students who actually read the chapter and makes the questions harder to answer with a quick web or AI lookup.

### Lab: Transfer Practice

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lb" alt="Lab section icon" width="220">
</p>

<p align="center"><em>Lab asks you to apply the chapter's ideas more independently, often through the PetVax case.</em></p>

The **Lab** section asks you to apply the chapter's ideas more independently. In many chapters, the lab uses the PetVax case to help you transfer what you learned from the guided Grading Database examples into a new business context. This section gives you practice solving problems, making design choices, and working with data in a way that more closely resembles real-world database tasks.

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/00-general/ch00-all-sections" alt="Visual showing the repeatable chapter sequence that supports steady growth" >
</p>

<p align="center"><em>Every chapter follows a repeatable learning sequence — concepts, build, terms, reflection, quiz, and lab — that supports steady growth.</em></p>

This structure is deliberate. Each chapter moves you through several levels of learning. You begin by recognizing key terms and understanding core ideas. You then explain those ideas in your own words, apply them in guided examples, and transfer them to more independent work. As the course progresses, you will also analyze relationships, evaluate design choices, and create your own structures, queries, reports, and recommendations.

In other words, assessment in this book is not only about memorizing definitions. It is about learning how to think with the material: how to ask better questions, organize information more clearly, design more reliable systems, and use data to support meaningful business decisions.

---

<div class="page-break"></div>

## Bloom's Taxonomy in Practice


![Alternate learning progression graphic showing how the course deepens from basic understanding toward stronger judgment and creation](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-8-levels)

*Alternate progression view for Bloom-style learning growth across the course.*


The chapters and assessments are designed around **Bloom's Taxonomy**, which describes levels of thinking from simpler to more complex forms of learning.

| Bloom Level    | What It Looks Like in This Book                                              |
| -------------- | ---------------------------------------------------------------------------- |
| **Remember**   | Recall key terms such as table, field, primary key, relationship, and query. |
| **Understand** | Explain why a relational database is different from a spreadsheet.           |
| **Apply**      | Write a SQL query or build a small table structure.                          |
| **Analyze**    | Identify how tables relate or where a design creates redundancy.             |
| **Evaluate**   | Compare two possible database designs and justify which one is stronger.     |
| **Create**     | Design a new structure, query, report, dashboard, or recommendation.         |

Reading quizzes usually target the lower levels. Reflections and labs push you toward analysis, evaluation, and creation. The goal is to move you from recognizing terms to building things with them.

![Bloom's Taxonomy staircase linking remember, understand, apply, analyze and evaluate, and create to course activities](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-ch1-blooms-taxonomy-in-practice)
*Bloom's Taxonomy shows how the course moves from remembering terms to creating new structures, queries, dashboards, and recommendations.*

![Additional Chapter 1 visual reinforcing Bloom's taxonomy as a progression from remembering toward creating and evaluating](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-image-009)
*Alternate visual for "Bloom's Taxonomy in Practice": the course is built to move you toward stronger thinking and more independent work.*

---

<div class="page-break"></div>


## The Two Running Projects

The book uses two recurring projects.

### The Grading Database

![Grading Database project icon](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-grading)

*The Grading Database provides guided practice in a familiar academic setting.*



The first is the **Grading Database**. This is the guided instructional case. It uses a familiar setting: students, courses, assignments, attendance, grades, and performance. Because the domain is easy to understand, you can focus on the database logic. Through the Grading Database, you will learn how tables work, how keys identify records, how relationships connect entities, how SQL queries answer questions, and how reports summarize performance. We will practice it during the "Let's Build" sections of each chapter, and you will return to it repeatedly as you learn new techniques.

### PetVax Veterinary Hospital Database

![PetVax lab project icon](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-lab-logo)

*PetVax provides transfer practice in a veterinary clinic setting.*



The second is the **PetVax Veterinary Hospital Database**. This is the applied lab case. It asks you to transfer what you learned from the Grading Database to a different business setting. Instead of students and assignments, you will work with owners, pets, appointments, treatments, invoices, and operational questions. We will practice these during the "Lab" sections of each chapter, and you will return to it repeatedly as you apply new techniques to a different domain.



Together, the two projects move you from guided practice to transfer practice. The Grading Database builds confidence in a familiar setting. PetVax asks you to apply the same logic more independently in a new business context. That distinction matters because real learning is not just repeating one example. Real learning means recognizing the same structure in a new context.

![Comparison table contrasting the Grading Database and PetVax Veterinary Hospital projects as guided and transfer practice](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-ch1-two-projects-one-goal-achieving-transfer)
*The Grading Database builds confidence in a familiar setting, and PetVax asks you to transfer the same logic to a new business context.*

### Where Each Project Reappears

The table below previews where each project shows up across the book so you can see how the work compounds.

| Chapter range | Grading Database (Let's Build) | PetVax (Lab)                                                       |
| ------------- | ------------------------------ | ------------------------------------------------------------------ |
| Ch 3–5        | Build first tables, run first SELECT queries | Inspect PetVax tables and write parallel queries     |
| Ch 6–7        | Add relationships, normalize the schema      | Diagnose anomalies and redesign PetVax tables        |
| Ch 9          | Advanced SQL for grade analytics             | Advanced SQL for appointment and revenue analytics   |
| Ch 11–13      | Apply administration, views, and procedures  | Apply the same techniques to PetVax operations       |
| Ch 14         | Build a Power BI dashboard on grading data   | Build a Power BI dashboard on PetVax performance     |

Use this table as a quick reference whenever you wonder where the next stretch of practice is going.
---

<div class="page-break"></div>

## The Tools You Will Use


![Tool ecosystem showing database, spreadsheet, analytics, and workflow platforms used throughout the course](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-all-tools)

*The book uses a practical tool ecosystem for collecting, structuring, querying, analyzing, and communicating data.*


Real data work rarely happens in one tool. Different tools support different parts of the same workflow. This book introduces a practical **Tool Ecosystem** so you can understand how business data moves across environments.



| Tool or Environment                           | Main Role in the Book                                                                                |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Microsoft Access**                          | Helps you see tables, relationships, forms, queries, and reports in a visual database environment.   |
| **SQL**                                       | Provides the core language for asking precise questions of relational data.                          |
| **SQLite**                                    | Offers a lightweight way to practice SQL and relational database logic.                              |
| **Supabase / PostgreSQL**                     | Introduces a modern cloud database environment based on PostgreSQL.                                  |
| **Google Sheets or spreadsheets**             | Shows how raw or messy data often begins before it is cleaned, structured, and moved into database form. |
| **Google Forms**                              | Shows one practical way data can be collected before it enters a database workflow.                  |
| **Google Colab**                              | Supports code-based analysis and reproducible examples when that format helps.                       |
| **Lucidchart, Mermaid, or diagramming tools** | Support ERDs, data models, workflows, and other visual plans before a system is built.               |
| **BigQuery**                                  | Provides light exposure to larger-scale analytical environments.                                     |
| **Power BI**                                  | Turns cleaned and queried data into dashboards and reports for decision-makers.                      |
| **GitHub and digital companion materials**    | Provide working files, examples, scripts, sample data, and supporting resources.                     |
| **AI-supported workflows**                    | Can help explain, debug, revise, and reflect on technical work when used carefully and responsibly.  |

The goal is not to memorize every button in every platform. The goal is to understand what each tool is good for and where it fits in a larger workflow.

![Tool overview showing database, spreadsheet, analytics, and workflow platforms used throughout the course](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-tools)
*A summary of the platforms used across collection, modeling, querying, reporting, and reflection.*

A spreadsheet is useful for quick inspection and small-scale data entry. Access is useful for seeing relational structure and building simple database applications. SQLite is useful for direct SQL practice. Supabase and PostgreSQL show how relational databases work in modern cloud settings. Diagramming tools help you think before you build. Power BI helps turn results into communication. BigQuery gives you a glimpse of the wider analytics landscape. GitHub supports companion files, versioning, and reproducible course materials. AI tools can support learning, debugging, and reflection, but they do not replace careful thinking.

The tools are different, but the workflow is connected.

![Workflow map showing tools for data collection, modeling, storage, querying, analytics, communication, versioning, and AI-supported workflows](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-ch1-tool-ecosystem-mapped-to-workflow)
*Each tool fits into a larger workflow, from data collection and modeling to querying, analytics, communication, and support.*

---

<div class="page-break"></div>


## How to Read and Use This Book

This book works best when you treat it as something to use, not just something to skim.

Read the main chapter first to understand the concepts and the business meaning behind them. Pay attention to the examples. When a table, relationship, or query appears, pause and ask what business question it helps answer. Then work with the companion materials. The terms, reflections, reading assessments, and labs are not extras. They are part of how the book helps you move from recognition to application.

![Study workflow visual showing students moving from reading to practice, review, and self-check while using the book](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-image-011)
*The book works best when reading, practice, review, and self-check are treated as one connected routine.*

A few habits will help you most:

- **Start with the business question.** Ask what problem the system is supposed to solve.
- **Pay attention to structure.** Small design choices often create large reporting consequences later.
- **Test your work.** Run the query, inspect the output, and ask whether the result makes sense.
- **Use errors as clues.** A failed query or broken relationship usually points to something worth learning.
- **Connect technical tasks to business meaning.** If you cannot explain why a query matters, the work is not finished yet.
- **Work steadily.** Database learning builds over time. Gaps early in the book can return later.
- **Use the digital materials.** Files, examples, and companion resources make abstract ideas easier to inspect.

You do not need to move fast. You do need to move carefully. Database work rewards patience, checking, and revision more than guessing.

<div class="callout tip">
  <p><strong>💡 Tip: Write the question first</strong></p>
  <p>Before you write a query, write the business question in plain English. If you cannot state the question clearly, you cannot write a clean query for it.</p>
</div>

![Business transaction records showing the raw events that need consistent database structure before they can support reporting](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-transaction)


*Every useful report starts with transactions and records that are captured consistently enough to be connected, summarized, and trusted.*

<div class="page-break"></div>

## How to Succeed in This Course

The previous section described how to use the book. These habits apply to the course as a whole.

![Additional Chapter 1 visual reinforcing the habits that support success in technical business learning](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-image-012)
*Alternate visual for "How to Succeed in This Course": curiosity, resilience, professionalism, and attention to detail matter throughout the semester.*

- **Stay curious.** Ask what a term means, why a system is designed a certain way, and what business question the data should answer.
- **Work professionally.** Keep up with deadlines, organize your files, and treat each assignment as practice for real business work.
- **Stay engaged.** Participate in class, use the labs and companion materials, and talk through confusing ideas before they grow.
- **Pay attention to detail.** Small mistakes in names, keys, formulas, and query logic can change results, so check your work carefully.
- Practice **Resilient Problem Solving**. Errors, failed queries, and revisions are part of learning how information systems work. Treat them as clues, not as signs that you cannot do the course.

Together, these habits form the **Student Mindset** that supports technical business learning.

![Student mindset wheel showing curiosity, professionalism, engagement, attention to detail, and resilient problem solving](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-student-success)
*Students succeed when they combine curiosity, professionalism, engagement, attention to detail, and resilient problem solving.*

## The Digital Companion

The book includes **Digital Companion** materials with working files, sample data, SQL scripts, database files, and lab resources.

**Repository:** https://github.com/nimdvir/dima-publishing/blob/main/books/database-book/files

Use the companion materials the way you would use a lab manual. Open them alongside the chapter, run the examples, inspect the files, and experiment. The book's ideas become easier to understand once you can work with them directly.

![Companion-materials visual showing files, scripts, examples, and support resources gathered around the book's digital workflow](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-image-013)
*The digital companion extends the chapter with working files, scripts, examples, and other materials you can inspect directly.*

<div class="page-break"></div>



## Chapter Summary

![One-page Chapter 1 concept map summarizing the book's purpose, structure, and learning journey](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-ch01-info)
*This concept map pulls together the chapter's main ideas before the written wrap-up.*



Chapter 1 introduced the purpose and structure of *Using Data to Drive Business Performance: Databases and Management Information Systems*. The chapter explained why the book exists, showed the central arc from data to decisions, and connected database structure to business reporting, analysis, and performance.

It also introduced the book's tools, chapter pattern, learning progression, and two running projects. The larger message is straightforward: the goal is not to memorize isolated software steps. The goal is to understand how technical structure supports better business questions, better analysis, and better decisions. This is what **systems thinking** means: seeing how data, structure, queries, analytics, and decisions work together as one connected system rather than as separate technical topics.

Chapter 2 builds on that foundation by explaining how data, information systems, and business performance connect, starting with the R.E.A.D. framework.

![Visual summary of Chapter 1 highlighting the learning arc, chapter structure, tools, and transition into Chapter 2](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-database-architecture-business)
*A second summary graphic revisits the chapter's main ideas before the written wrap-up.*

## What Comes Next

Chapter 1 is meant to orient you, not overload you.

At this point, you should have a clear sense of what the book is trying to do, how it is organized, and why its technical work matters. You should also have a clearer picture of the book's main logic: data becomes structure, structure supports questions, questions support analysis, and analysis supports decisions.

Chapter 2 takes that orientation and builds the conceptual foundation underneath it. It explains how information systems connect data, technology, people, and processes in organizations, and it introduces the **R.E.A.D.** framework that you will use across the rest of the book.

![Progression visual showing how Chapter 1 leads into later database, SQL, analytics, and strategy work](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-progression)
*Chapter 1 leads into the chapters that follow, building from orientation toward structure, queries, analytics, and strategy.*

---


## References

Anderson, L. W., & Krathwohl, D. R. (2001). *A taxonomy for learning, teaching, and assessing: A revision of Bloom's taxonomy of educational objectives*. Longman.

Davenport, T. H., & Harris, J. G. (2017). *Competing on analytics: The new science of winning* (Updated ed.). Harvard Business Review Press.

Krathwohl, D. R. (2002). A revision of Bloom's taxonomy: An overview. *Theory Into Practice, 41*(4), 212-218.

Laudon, K. C., & Laudon, J. P. (2024). *Management information systems: Managing the digital firm* (18th ed.). Pearson.

Stair, R. M., & Reynolds, G. W. (2021). *Principles of information systems* (14th ed.). Cengage Learning.
