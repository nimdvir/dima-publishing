# Chapter 1: Introduction to the Textbook

## Orientation to the Book and the Journey from Data to Decisions

Welcome to *Using Data to Drive Business Performance: Databases and Management Information Systems*. This chapter is your map for the book. It explains where the book is going, what you will build, which tools you will use, and why this material matters for business students, managers, analysts, entrepreneurs, and anyone whose work depends on data.

The book follows one continuous learning arc that connects information systems, relational databases, SQL, analytics, and decision-making. You will work with two main projects, the Grading Database and PetVax, so you can move from guided practice to independent application. The goal is not to memorize disconnected technical steps. The goal is to understand how data becomes structure, how structure supports analysis, and how analysis supports better business decisions.

The book is built around a simple but powerful idea: data becomes valuable when people organize it, connect it, question it, analyze it, and use it to make better decisions. You will not learn databases as a pile of disconnected terms. You will learn databases as part of a larger business system.

The central arc of the book is:

```text
Data -> Tables -> Relationships -> Queries -> Analytics -> Decisions
```

![Six-stage flow from data to decisions](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/flow.png)
*The book's central learning arc moves from data to tables, relationships, queries, analytics, and decisions.*

That arc gives the entire book its shape. Data becomes tables. Tables form relationships. Relationships make queries possible. Queries support analytics. Analytics inform decisions. Decisions shape business performance.

**After reading this chapter, you will be able to:**

- explain why this book connects databases, SQL, analytics, and business performance;
- describe the book's central learning arc from data to decisions;
- identify the major tools used throughout the book and explain what each one is for;
- describe the role of the Grading Database and the PetVax Veterinary Hospital Database;
- explain how the chapters build from foundations to strategy;
- recognize how the book's chapter structure supports guided learning and independent application; and
- describe the habits that help students succeed in technical business learning.

![Chapter 1 overview infographic linking structure, insight, strategy, and project-based learning](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/ch01-infographic.png)
*Chapter 1 at a glance: the course connects structure, insight, strategy, and project-based learning.*

If you want a short visual introduction before moving into the chapter, [watch the Chapter 1 overview video](https://youtu.be/DuRt2vlTcl0?si=JutKK-p0bLfVz7K0).

## Core Concepts

### Why This Book Exists

Talk to students after an information systems or database course, and you often hear some version of the same three concerns:

> "I understand the terms, but not how they connect."
>
> "We learned SQL, but I do not really know why it matters."
>
> "Databases feel intimidating."

Those reactions are honest. They point to a real learning problem.

![Students confronting disconnected course ideas and uncertainty about how databases, SQL, analytics, and strategy fit together](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/frustration.png)
*Many students start with fragmented ideas about databases and analytics, which makes the subject feel harder than it needs to be.*

Many students do not struggle with information systems because they are unwilling to learn. They struggle because the material often feels fragmented. A typical textbook or course might teach information systems in one chapter, data in another, SQL later, dashboards near the end, and business strategy somewhere else. Each topic may be useful, but students are often left to answer the most important question on their own: **how does this all connect?**

That missing connection shows up quickly. A student may learn the definition of a database but not understand why database structure affects business reporting. A student may write a SQL query but not understand what decision the query supports. A student may see a dashboard but not know whether the numbers behind it are trustworthy. In those moments, the problem is not motivation. It is structure.

This book was written to solve that problem.

The goal is not to turn every business student into a software engineer. The goal is to help you understand how data systems work well enough to ask better questions, design better structures, interpret outputs, and make stronger decisions.

Here is the promise of the book:

> **You will learn how data becomes business performance.**

That means you will learn technical skills, but always with a business purpose. You will write SQL because SQL helps answer questions. You will design tables because table structure affects accuracy. You will study relationships because relationships determine what a system can know. You will build reports and dashboards because decision-makers need clear evidence, not just stored records.

If the technical side of this material feels new, that is fine. You do not need to arrive as a programmer. You do need curiosity, patience, and a willingness to work through examples carefully. Errors and small frustrations are part of learning here, not signs that you do not belong.

> **Key takeaway:** The point of this course is not to memorize database terms. It is to build systems thinking: the ability to see how data, structure, analysis, and decisions work together.

### The Big Idea: From Data to Decisions

Every chapter in this book sits somewhere on one continuous arc:

> **Data -> Tables -> Relationships -> Queries -> Analytics -> Decisions**

Read it left to right.

- **Data** is the raw material: records, numbers, categories, dates, names, transactions, clicks, payments, grades, appointments, and observations.
- **Tables** give data structure by organizing it into rows and columns.
- **Relationships** connect tables so the system can represent real business activity.
- **Queries** ask precise questions of the data.
- **Analytics** turn query results into patterns, summaries, metrics, charts, and explanations.
- **Decisions** use those outputs to improve action, performance, and strategy.

A simple example makes this easier to see.

Imagine a veterinary clinic that wants to reduce missed appointments. At first, the clinic may only have scattered records: pet names, owner names, appointment dates, phone numbers, treatment notes, and payment information. Those records become useful only when they are organized. The clinic needs tables for owners, pets, appointments, treatments, and invoices. Those tables need relationships so each pet is connected to the correct owner and each appointment is connected to the correct pet.

Once the structure is reliable, the clinic can query the data. Which appointments are missed most often? Which reminders seem to work? Which days have the highest no-show rates? Those query results can feed analytics. The analytics can support decisions about reminders, staffing, scheduling, and customer service.

![Dashboard and report view showing how structured query results become usable metrics and decisions](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/data-dashboard.png)
*When data is structured well, query results can become reports, metrics, and decisions that managers can actually use.*

That is the journey from data to decisions.

The same pattern appears in retail, banking, healthcare, higher education, logistics, marketing, and digital platforms. The domain changes. The logic remains.

![Detailed workflow showing raw data collection, data processing, database linking, querying, analytics, and informed decision-making](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/flow2.png)
*The data-to-decisions journey starts with raw records, adds structure and relationships, and ends in analysis that supports better decisions.*

### Why Databases Matter for Business Performance

A database is not just a place to store data. It is a structure that shapes what an organization can see, measure, report, and improve.

That is why database design has business consequences.

A poorly designed database can make simple questions hard to answer. It can create duplicate records, inconsistent reports, missing information, and confusing dashboards. A well-designed database makes information easier to retrieve, compare, trust, and use.

Think about a coffee shop. If sales, inventory, suppliers, and menu items are tracked in separate spreadsheets with inconsistent names, the owner may struggle to answer basic questions:

- Which items sell out fastest?
- Which ingredients are wasted most often?
- Which supplier problems affect daily sales?
- Which products have strong sales but weak profit margins?

![Business transaction records showing the raw events that need consistent database structure before they can support reporting](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/transaction.png)
*Every useful report starts with transactions and records that are captured consistently enough to be connected, summarized, and trusted.*

Those are business questions. But answering them depends on data structure.

Now think about a larger organization. A hospital needs accurate patient, appointment, billing, and treatment records. A retailer needs reliable product, inventory, customer, and sales data. A university needs information about students, courses, assignments, grades, and attendance. In every case, performance depends on whether the organization can capture the right data, structure it correctly, retrieve it efficiently, and interpret it responsibly.

This is why the book connects databases with management information systems. The database is not separate from the business. It is part of how the business learns.

### What Makes This Book Different

This book is built around a common problem in MIS and database learning: readers are too often asked to connect the important ideas on their own.

Some books stay mostly conceptual. They talk about strategy, digital change, or business value, but give students very little real data work. Other books go hard in the opposite direction. They teach tools and syntax, but leave students wondering why any of it matters in the first place.

That split creates a real learning problem. Students may learn pieces of the work without seeing how structure, analysis, and judgment fit together.

![Introductory visual connecting business questions, database structure, and decision use across the course](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/1-introduction2.jpg)
*This book keeps business questions, database structure, and decision use in one continuous teaching narrative instead of separating them into isolated topics.*

This book tries to close that gap without making the material heavier or more intimidating.

It does so through four design choices.

First, the book starts with **business meaning**. Technical work appears in context, not in isolation. You will usually begin with a question an organization might actually care about.

Second, the book follows **one continuous system narrative**. You will not jump randomly from topic to topic. Each major idea prepares you for the next one.

Third, the book uses **guided practice and transfer**. You first learn a structure in a familiar setting, then use the same logic in a different business context.

Fourth, the book uses **practical tools across a connected workflow**. The point is not to chase software trends. The point is to show how core ideas travel across environments.

The book is not a software manual. It is also not a purely conceptual management text. It sits in the space between business judgment and technical structure.

That middle space is where real information systems work happens.

![Disconnected database topics shown as separate puzzle pieces with student concerns about SQL, databases, analytics, and strategy](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/ch1-illusion-of-fragmented-knowledge.png)
*Students often experience databases, SQL, analytics, and strategy as disconnected topics instead of one connected system.*

### What You Will Learn: Five Core Competencies

By the end of this book, you should be able to do five things well. These are the book's core competencies, and every chapter develops at least one of them.

![Five core competencies mapped across the course from foundational literacy to strategic problem solving](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/competencies-map.jpg)
*The course competencies build from foundational understanding toward stronger analysis, design, and decision-making.*

| Competency                            | What It Means                                                                                        |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Foundational information literacy** | Explain how data, databases, and information systems support organizational decision-making.         |
| **Applied database management**       | Design and query relational databases to answer realistic business questions.                        |
| **Data integrity and system quality** | Use relational modeling and normalization to make data accurate, consistent, and reliable.           |
| **Performance-oriented analysis**     | Interpret reports, metrics, and outputs in ways that connect technical work to business performance. |
| **Strategic problem solving**         | Combine technical reasoning and business context to evaluate options and recommend decisions.        |

These competencies move from foundational to integrative. The first helps you talk about data systems intelligently. The fifth helps you sit in a meeting and argue, with evidence, for one option over another.

> **Tip:** When a chapter feels abstract, ask which competency it is building. That single question keeps the work grounded.

### The Tools You Will Use

Real data work rarely happens in one tool. Different tools support different parts of the same workflow. This book introduces a practical ecosystem of tools so you can understand how business data moves across environments.

| Tool or Environment | Main Role in the Book |
| --- | --- |
| **Microsoft Access** | Helps you see tables, relationships, forms, queries, and reports in a visual database environment. |
| **SQL** | Provides the core language for asking precise questions of relational data. |
| **SQLite** | Offers a lightweight way to practice SQL and relational database logic. |
| **Supabase / PostgreSQL** | Introduces a modern cloud database environment based on PostgreSQL. |
| **Google Sheets or spreadsheets** | Shows how raw or messy data often begins before it is cleaned, structured, and moved into database form. |
| **Google Forms** | Shows one practical way data can be collected before it enters a database workflow. |
| **Google Colab** | Supports code-based analysis and reproducible examples when that format helps. |
| **Lucidchart, Mermaid, or diagramming tools** | Support ERDs, data models, workflows, and other visual plans before a system is built. |
| **BigQuery** | Provides light exposure to larger-scale analytical environments. |
| **Power BI** | Turns cleaned and queried data into dashboards and reports for decision-makers. |
| **GitHub and digital companion materials** | Provide working files, examples, scripts, sample data, and supporting resources. |
| **AI-supported workflows** | Can help explain, debug, revise, and reflect on technical work when used carefully and responsibly. |

The goal is not to memorize every button in every platform. The goal is to understand what each tool is good for and where it fits in a larger workflow.

A spreadsheet is useful for quick inspection and small-scale data entry. Access is useful for seeing relational structure and building simple database applications. SQLite is useful for direct SQL practice. Supabase and PostgreSQL show how relational databases work in modern cloud settings. Diagramming tools help you think before you build. Power BI helps turn results into communication. BigQuery gives you a glimpse of the wider analytics landscape. GitHub supports companion files, versioning, and reproducible course materials. AI tools can support learning, debugging, and reflection, but they do not replace careful thinking.

The tools are different, but the workflow is connected.

![Workflow map showing tools for data collection, modeling, storage, querying, analytics, communication, versioning, and AI-supported workflows](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/ch1-tool-ecosystem-mapped-to-workflow.png)
*Each tool fits into a larger workflow, from data collection and modeling to querying, analytics, communication, and support.*

### The Two Running Projects

The book uses two recurring projects.

The first is the **Grading Database**. This is the guided instructional case. It uses a familiar setting: students, courses, assignments, attendance, grades, and performance. Because the domain is easy to understand, you can focus on the database logic.

Through the Grading Database, you will learn how tables work, how keys identify records, how relationships connect entities, how SQL queries answer questions, and how reports summarize performance.

The second is the **PetVax Veterinary Hospital Database**. This is the applied lab case. It asks you to transfer what you learned from the Grading Database to a different business setting. Instead of students and assignments, you will work with owners, pets, appointments, treatments, invoices, and operational questions.

Together, the two projects move you from guided practice to transfer practice. The Grading Database builds confidence in a familiar setting. PetVax asks you to apply the same logic more independently in a new business context.

That distinction matters because real learning is not just repeating one example. Real learning means recognizing the same structure in a new context.

![Comparison table contrasting the Grading Database and PetVax Veterinary Hospital projects as guided and transfer practice](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/ch1-two-projects-one-goal-achieving-transfer.png)
*The Grading Database builds confidence in a familiar setting, and PetVax asks you to transfer the same logic to a new business context.*

### How Each Chapter Works

![Chapter workflow diagram showing the sequence from core concepts through guided work, review, quiz, and lab application](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/ch1-course-plan1.png)
*Each chapter follows a predictable rhythm so you can focus on the ideas, not on guessing what comes next.*

![Core Concepts section icon](../../../../.images/Ch0%20General/sections/resize/concepts.gif)
*Core Concepts introduces the main ideas with explanations, examples, and diagrams.*

![Let's Build section icon](../../../../.images/Ch0%20General/sections/resize/let-build-resize.gif)
*Let's Build guides you through the Grading Database one step at a time.*

![Terms Treasury section icon](../../../../.images/Ch0%20General/sections/resize/terms-sized.min.gif)
*Terms Treasury reinforces the vocabulary you need to recognize and use correctly.*

![Review and Reflection section icon](../../../../.images/Ch0%20General/sections/resize/revie-resized.gif)
*Review and Reflection helps you connect technical ideas to business meaning.*

![RAT section icon](../../../../.images/Ch0%20General/sections/RAT2.png)
*RAT or Quiz checks reading comprehension and conceptual understanding before class.*

![Lab section icon](../../../../.images/Ch0%20General/sections/resize/lB.gif)
*Lab asks you to apply the same ideas more independently in the PetVax case.*

Every chapter follows a consistent pattern, so you can spend your energy on the ideas instead of guessing what comes next.

| Chapter Component | Purpose |
| --- | --- |
| **Core Concepts** | Introduce the main ideas with explanations, examples, and diagrams. |
| **Let's Build** | Develop the running Grading Database project one step at a time. |
| **Terms Treasury** | Reinforce important vocabulary. |
| **Reflection Questions** | Connect technical ideas to business meaning. |
| **RAT or Quiz** | Check reading comprehension and conceptual understanding before class. |
| **Lab** | Apply the same ideas more independently in the PetVax Veterinary Hospital Database. |

This structure is deliberate. It moves you through different levels of learning.

First, you recognize key terms. Then you explain ideas in your own words. Then you apply those ideas in examples. Then you analyze relationships, evaluate design choices, and eventually create structures, queries, reports, or recommendations.

In other words, assessment is not just about memorization. It is about learning how to think with the material.

### Bloom's Taxonomy in Practice

The chapters and assessments are designed around Bloom's Taxonomy, which describes levels of thinking from simpler to more complex forms of learning.

| Bloom Level | What It Looks Like in This Book |
| --- | --- |
| **Remember** | Recall key terms such as table, field, primary key, relationship, and query. |
| **Understand** | Explain why a relational database is different from a spreadsheet. |
| **Apply** | Write a SQL query or build a small table structure. |
| **Analyze** | Identify how tables relate or where a design creates redundancy. |
| **Evaluate** | Compare two possible database designs and justify which one is stronger. |
| **Create** | Design a new structure, query, report, dashboard, or recommendation. |

Reading quizzes usually target the lower levels. Reflections and labs push you toward analysis, evaluation, and creation. The goal is to move you from recognizing terms to building things with them.

![Bloom's Taxonomy staircase linking remember, understand, apply, analyze and evaluate, and create to course activities](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/ch1-blooms-taxonomy-in-practice.png)
*Bloom's Taxonomy shows how the course moves from remembering terms to creating new structures, queries, dashboards, and recommendations.*

### How the Book Flows

The book is organized as a journey from foundations to strategy. Each chapter adds a new layer.

| Chapter | Main Focus                                | Why It Matters                                                                        |
| ------: | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| 1       | Introduction to the Textbook              | Shows how the book works and why the journey from data to decisions matters.          |
| 2       | Foundations of Information Systems        | Explains how data, systems, and business performance connect.                         |
| 3       | Understanding Data Fundamentals           | Defines data types, metadata, quality, governance, and the data lifecycle.            |
| 4       | Introduction to Databases                 | Explains why databases improve on spreadsheets and flat files.                        |
| 5       | SQL: The Language of Databases            | Teaches SQL as a way to ask business questions clearly.                               |
| 6       | The Relational Model                      | Shows how connected tables reduce redundancy and improve integrity.                   |
| 7       | Data Normalization                        | Teaches how to redesign messy structures into reliable relational designs.            |
| 8       | Midterm Review: Concepts                  | Integrates the first half of the book into a coherent mental model.                   |
| 9       | Advanced SQL With the Grading Database    | Uses more advanced SQL patterns for deeper analysis.                                  |
| 10      | From Data to Design                       | Moves from querying existing databases to designing reliable systems.                 |
| 11      | Database Administration                   | Covers security, backup, recovery, access control, and operational reliability.       |
| 12      | Business Intelligence and Analytics       | Connects databases to dashboards, KPIs, ETL, and managerial reporting.                |
| 13      | Advanced Database Techniques              | Introduces performance, views, triggers, procedures, and enterprise-grade techniques. |
| 14      | Power BI                                  | Turns database outputs into interactive reports for decision-makers.                  |
| 15      | Business Strategy and Information Systems | Connects data systems to competitive advantage and strategic alignment.               |
| 16      | Final Review and Course Integration       | Brings the full journey together from data fundamentals to decision-making.           |
| 17      | Designing Systems That Matter             | Closes with ethics, responsibility, and lifelong learning in data-driven work.        |

You can also think of the book in six broad parts.

| Part                                              | Chapters | Focus                                                                    |
| ------------------------------------------------- | -------: | ------------------------------------------------------------------------ |
| **Part 1: Foundations**                           | 1-3      | Orientation, information systems, and data fundamentals.                 |
| **Part 2: Databases and SQL**                     | 4-5      | Database basics and SQL as the language of databases.                    |
| **Part 3: Relational Design**                     | 6-8      | The relational model, normalization, and midterm integration.            |
| **Part 4: Advanced SQL and Design**               | 9-10     | Deeper querying and the movement from data to system design.             |
| **Part 5: Administration, BI, and Visualization** | 11-14    | Administration, analytics, advanced database techniques, and Power BI.   |
| **Part 6: Strategy and Integration**              | 15-17    | Business strategy, course integration, and responsible systems thinking. |

The sequence is cumulative. Early chapters give you vocabulary and logic. Middle chapters build technical skill. Later chapters connect those skills to analytics, management, and strategy.

You cannot write strong SQL against weak structure. You cannot build trustworthy analytics from messy data definitions. You cannot talk about strategy in a useful way if the underlying system cannot capture and report information well.

You are not just learning isolated tools. You are learning a way of seeing systems.

![Six-part book roadmap from foundations through databases, design, analytics, and strategy](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/ch1-six-part-journey-foundations-to-strategy.png)
*The book progresses through six connected parts, moving from foundations to databases, design, analytics, and strategy.*

### How to Read and Use This Book

This book works best when you treat it as something to use, not just something to skim.

Read the main chapter first to understand the concepts and the business meaning behind them. Pay attention to the examples. When a table, relationship, or query appears, pause and ask what business question it helps answer.

Then work with the companion materials. The terms, reflections, reading assessments, and labs are not extras. They are part of how the book helps you move from recognition to application.

![Study workflow visual showing students moving from reading to practice, review, and self-check while using the book](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_011.png)
*This study-workflow visual reinforces that the book works best when reading, practice, review, and self-check are treated as one connected routine.*

Several habits will help.

- **Start with the business question.** Ask what problem the system is supposed to solve.
- **Pay attention to structure.** Small design choices often create large reporting consequences later.
- **Test your work.** Run the query, inspect the output, and ask whether the result makes sense.
- **Use errors as clues.** A failed query or broken relationship usually points to something worth learning.
- **Connect technical tasks to business meaning.** If you cannot explain why a query matters, the work is not finished yet.
- **Work steadily.** Database learning builds over time. Gaps early in the book can return later.
- **Use the digital materials.** Files, examples, and companion resources make abstract ideas easier to inspect.

You do not need to move fast. You do need to move carefully. Database work rewards patience, checking, and revision more than guessing.

> **Tip:** Before you write a query, write the business question in plain English. If you cannot state the question clearly, you cannot write a clean query for it.

### How to Succeed in This Course

The previous section explained how to use the book. These habits will help you succeed in the course as a whole.

- **Stay curious.** Ask what a term means, why a system is designed a certain way, and what business question the data should answer.
- **Work professionally.** Keep up with deadlines, organize your files, and treat each assignment as practice for real business work.
- **Stay engaged.** Participate in class, use the labs and companion materials, and talk through confusing ideas before they turn into bigger problems.
- **Pay attention to detail.** Small mistakes in names, keys, formulas, and query logic can change results, so check your work carefully.
- **Practice resilient problem solving.** Errors, failed queries, and revisions are part of learning how information systems work. Treat them as clues, not as signs that you cannot do the course.

![Student mindset wheel showing curiosity, professionalism, engagement, attention to detail, and resilient problem solving](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/student-success.jpg)
*Students succeed when they combine curiosity, professionalism, engagement, attention to detail, and resilient problem solving.*

### The Digital Companion

The book includes digital companion materials with working files, sample data, SQL scripts, database files, and lab resources.

**Repository:** <https://github.com/nimdvir/BITM330-Book>

Use the companion materials the way you would use a lab manual. Open them alongside the chapter, run the examples, inspect the files, and experiment. The book's ideas become easier to understand once you can work with them directly.

![Companion-materials visual showing files, scripts, examples, and support resources gathered around the book's digital workflow](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_013.png)
*The digital companion extends the chapter with working files, scripts, examples, and other materials you can inspect directly.*

### About the Author

Dr. Nimrod Dvir teaches Information Systems and Business Analytics at the University at Albany, SUNY. His background includes Information Science, Human-Computer Interaction, and Management Information Systems, with experience across academia, UX research, and digital product development.

This book reflects his teaching focus: databases, analytics, and information systems should be connected to real business questions, human behavior, and organizational performance. The goal is to help students build confidence with technical concepts while learning how data-driven organizations actually work.

![Portrait of Dr. Nimrod Dvir](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/me.png)
*Dr. Nimrod Dvir connects databases, analytics, and information systems to real business questions and business performance.*

### What Comes Next

Chapter 1 is meant to orient you, not overload you.

At this point, you should have a clear sense of what the book is trying to do, how it is organized, and why its technical work matters. You should also have a clearer picture of the book's main logic: data becomes structure, structure supports questions, questions support analysis, and analysis supports decisions.

Chapter 2 now takes that orientation and builds the conceptual foundation underneath it. It explains how information systems connect data, technology, people, and processes in organizations.

![Transition roadmap showing the course moving from foundations to structure, queries, analytics, and strategy](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/pathway.jpg)
*Chapter 1 provides orientation, and the next chapters build the foundation that leads into structure, queries, analytics, and strategy.*

### Visual Recap

Before the written recap, the concept map below pulls the chapter's main ideas together in one place.

![One-page Chapter 1 concept map summarizing the book's purpose, structure, and learning journey before the written wrap-up](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/ch01-info.png)
*This one-page concept map pulls together the chapter's main ideas before the written recap and summary.*

## Key Concepts

- The book follows a continuous arc from data to tables, relationships, queries, analytics, and decisions.
- Databases matter because structure affects what organizations can measure, report, trust, and improve.
- SQL is not just syntax. It is a language for asking precise business questions.
- The Grading Database provides guided practice, while the PetVax Veterinary Hospital Database provides independent application.
- The book uses multiple tools because real data work moves across multiple environments.
- The chapter structure supports learning through concepts, guided building, vocabulary, reflection, assessment, and labs.
- Assessment emphasizes understanding, application, analysis, evaluation, and creation.
- The larger goal is systems thinking: understanding how technical structure supports business performance.

## Chapter Summary

![Visual summary of Chapter 1 highlighting the learning arc, chapter structure, tools, and transition into Chapter 2](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/ch01-summary2.png)
*This summary graphic revisits the chapter's main ideas before the written wrap-up.*

Chapter 1 introduced the purpose and structure of *Using Data to Drive Business Performance: Databases and Management Information Systems*. The chapter explained why the book exists, showed the central arc from data to decisions, and connected database structure to business reporting, analysis, and performance.

It also introduced the book's tools, chapter pattern, learning progression, and two running projects. The larger message is straightforward: the goal is not to memorize isolated software steps. The goal is to understand how technical structure supports better business questions, better analysis, and better decisions. Chapter 2 builds on that foundation by explaining how data, information systems, and business performance connect.

## References

Anderson, L. W., & Krathwohl, D. R. (2001). *A taxonomy for learning, teaching, and assessing: A revision of Bloom's taxonomy of educational objectives*. Longman.

Davenport, T. H., & Harris, J. G. (2017). *Competing on analytics: The new science of winning* (Updated ed.). Harvard Business Review Press.

Krathwohl, D. R. (2002). A revision of Bloom's taxonomy: An overview. *Theory Into Practice, 41*(4), 212-218.

Laudon, K. C., & Laudon, J. P. (2024). *Management information systems: Managing the digital firm* (18th ed.). Pearson.

Stair, R. M., & Reynolds, G. W. (2021). *Principles of information systems* (14th ed.). Cengage Learning.

## Appendix: Alternate Chapter 1 Visuals

The following gallery preserves alternate Chapter 1 visuals that support the same concepts without crowding the main narrative.

![Learning objectives graphic linking Chapter 1 goals to the course's business, technical, and systems-thinking outcomes](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/figure1.2-objectives.jpg)
*Alternate opening visual showing the learning goals that connect business meaning, technical structure, and the larger data-to-decisions journey.*

![Business problem illustration showing the gap between disconnected technical tasks and clear business decisions](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/problem.png)
*Alternate visual for "Why This Book Exists": the missing link is often the connection between technical work and the decision it is supposed to support.*

![Five core systems competencies shown as stacked levels from information literacy to strategic problem solving](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/ch1-developing-five-core-systems-competencies.png)
*Alternate competencies visual showing the course moving from foundational information literacy to strategic problem solving.*

![Tool overview showing database, spreadsheet, analytics, and workflow platforms used throughout the course](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/tools.png)
*Alternate tools visual summarizing the platforms used across collection, modeling, querying, reporting, and reflection.*

![Bloom's taxonomy graphic showing the course moving from remembering and understanding toward evaluation and creation](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/bloom.jpg)
*Alternate Bloom-style visual emphasizing the move from recognition toward stronger explanation, application, and creation.*

![Course roadmap showing how Chapter 1 leads into the rest of the book from foundations through analytics and strategy](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/ch1-course-plan2.png)
*Alternate roadmap showing how the early chapters build toward later analytics, reporting, and strategic work.*

![Alternate learning progression graphic showing how the course deepens from basic understanding toward stronger judgment and creation](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/8-levels.jpg)
*Alternate progression view for Bloom-style learning growth across the course.*

![Additional progression graphic summarizing the movement from Chapter 1 orientation into the rest of the course](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/progression.jpg)
*Additional progression visual showing how Chapter 1 leads into later database, SQL, analytics, and strategy work.*

![Additional Chapter 1 visual reinforcing why the book exists and why fragmented topics need a connected systems view](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_001.png)
*Alternate visual for "Why This Book Exists": the course is designed to connect ideas that students often meet in isolation.*

![Additional Chapter 1 visual reinforcing the move from raw data toward structure, analysis, and decisions](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_002.png)
*Alternate visual for "The Big Idea": data becomes more useful as it moves through structure, queries, analysis, and decision use.*

![Additional Chapter 1 visual reinforcing why business performance depends on structured, reliable data systems](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_003.png)
*Alternate visual for "Why Databases Matter": reliable reporting begins with well-structured records and relationships.*

![Additional Chapter 1 visual reinforcing the book's practice-first approach to linking business meaning and technical work](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_004.png)
*Alternate visual for "What Makes This Book Different": the book keeps business questions and technical structure in the same conversation.*

![Additional Chapter 1 visual reinforcing the five core competencies that the course develops over time](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_005.png)
*Alternate visual for "Five Core Competencies": the course builds connected capabilities, not isolated tasks.*

![Additional Chapter 1 visual reinforcing the mix of tools and platforms used across the course workflow](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_006.png)
*Alternate visual for "The Tools You Will Use": each tool supports part of the larger data-to-decisions workflow.*

![Additional Chapter 1 visual reinforcing the relationship between the Grading Database and the PetVax project](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_007.png)
*Alternate visual for "The Two Running Projects": guided practice in one project prepares you to transfer the same logic to another setting.*

![Additional Chapter 1 visual reinforcing the chapter structure from core concepts through guided work, review, and lab practice](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_008.png)
*Alternate visual for "How Each Chapter Works": every chapter follows a repeatable learning sequence that supports steady growth.*

![Additional Chapter 1 visual reinforcing Bloom's taxonomy as a progression from remembering toward creating and evaluating](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_009.png)
*Alternate visual for "Bloom's Taxonomy in Practice": the course is built to move you toward stronger thinking and more independent work.*

![Additional Chapter 1 visual reinforcing the full book roadmap from foundations to analytics and strategy](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_010.png)
*Alternate visual for "How the Book Flows": the textbook builds layer by layer from orientation to strategic use of information systems.*

![Additional Chapter 1 visual reinforcing the habits that support success in technical business learning](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_012.png)
*Alternate visual for "How to Succeed in This Course": curiosity, resilience, professionalism, and attention to detail matter throughout the semester.*

![Additional Chapter 1 visual reinforcing the author's role in connecting databases, analytics, and business questions](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_014.png)
*Alternate visual for "About the Author": the book is shaped by teaching that connects technical structure to real organizational questions.*

![Additional Chapter 1 visual reinforcing the transition from orientation into the chapters that follow](../../../../.images/Ch1%20Welcome%20to%20the%20Textbook/from-chapter/image_015.png)
*Alternate visual for "What Comes Next": Chapter 1 is a starting point, and the later chapters build the structure and analysis that follow.*
