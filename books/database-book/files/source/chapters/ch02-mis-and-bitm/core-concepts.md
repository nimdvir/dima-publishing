<!-- Chapter edit: restored supplementary video, folded in comprehensive briefing content (coffee-shop POS example, Productivity Paradox context), placed new images (concepts map + summary visual), normalized page breaks to canonical format. Technical meaning preserved. -->

# Chapter 2: Foundations of Information Systems

*How Data Drives Business Performance*

![Slide 1: Foundations of Information Systems](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-01)

<iframe width="560" height="315" src="https://www.youtube.com/embed/TtQPqJm5BIs?si=LBI1rRg0eEznsDbl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Watch the Chapter 2 video](https://youtu.be/TtQPqJm5BIs?si=LBI1rRg0eEznsDbl)

<iframe width="560" height="315" src="https://www.youtube.com/embed/yvo3Uj_6U4s?si=umMPBbvXsLZfE0Ul" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Watch the Chapter 2 supplementary video](https://youtu.be/yvo3Uj_6U4s)

This chapter establishes the conceptual foundations that connect business performance to information systems. As introduced in Chapter 1, this book follows a clear path: data becomes tables, tables form relationships, relationships enable queries, queries support analytics, and analytics inform decisions. Chapter 2 explains why that path matters. It shows how information systems turn raw observations into business decisions. Along the way, it introduces two simple frameworks: the **DIKW hierarchy** (data, information, knowledge, wisdom) and the **R.E.A.D. framework** (representation and retrieval, expression and experience, association and acquisition, decision-making and deployment). DIKW describes how meaning develops â€” what was recorded, what happened, why it is happening, and what should be done. R.E.A.D. describes the organizational and technical work required to move through those stages in practice. The chapter also separates **information technology** (the tools) from the broader **information system** (the tools plus people, data, and processes). Finally, it explains why **data quality** and **strategic alignment** are managerial concerns, not just technical ones.


**After reading this chapter, you will be able to:**

- define data, information, knowledge, and wisdom;
- explain how raw data becomes useful for business decisions;
- describe business performance and explain why it is multidimensional;
- explain how KPIs translate goals into measurable signals;
- define information systems and distinguish them from information technology;
- describe the five components of an information system;
- explain how MIS and BITM connect systems, management, and strategy.

![Chapter Objectives](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-learning-objectives)

*Figure 2.3 â€” Learning Objectives.*

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Core Concepts

<p align="center">
  <img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-concepts" alt="Core Concepts section icon" width="220">
</p>

<p align="center">

<!-- MEDIA HANDOFF: Uploaded to Cloudinary by user override -->
![Chapter 2 Core Concepts Map](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch02-mis-and-bitm/ch02-concepts)

*Figure 2.1 â€” Chapter 2 concept map: foundations of information systems, from data to business performance.*

### Framing the Course Title

The course this book supports is called *Business Information Technology Management*. Each word in that title matters. **Business** reminds us that the starting point is not technology. The starting point is an organization that creates value under constraints. **Information** reminds us that data becomes useful when it is organized, interpreted, and connected to decisions. **Technology** reminds us that tools â€” databases, software, networks, analytics platforms â€” make information work scalable and repeatable. **Management** reminds us that every technology choice is also a resource decision, a people decision, and a strategy decision.

Together, those four words describe the work of turning data into performance. That is the arc this chapter, and this book, follows.

Before we move into databases, SQL, and analytics, we need a foundation.



Specifically, ask yourself whether you can answer these questions:

- **What is data?**
- **What is a business?**
- **What is business performance?**
- **How can data improve business performance?**
- **What is an information system?**
- **What is information technology?**
- **What are Management Information Systems (MIS)?**
- **What is Business Information Technology Management (BITM)?**

Those questions are the foundation of this chapter.

![Study Questions](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-study-questions)
*Figure 2.2 â€” Study Questions.*

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Why Foundations Matter

Every business activity leaves a trail.

A sale, a shipment, a website click, a customer complaint, a late assignment, a hospital visit, a delivery delay, or a payment record can all become data. These records may look small by themselves. But together, they allow organizations to see what is happening.

That is the starting point.

Data helps organizations observe activity. Information systems help organizations organize that activity. Managers use those systems to understand problems, evaluate options, and decide what to do next.

This is why information systems are not just technical tools. They are business systems. They shape what people can see, what they can measure, what they can trust, and what they can improve.

A coffee shop might use data to decide how much milk to order. A hospital might use data to manage staffing. A university might use data to identify students who need support. A retailer might use data to understand which products sell quickly and which sit on shelves. In each case, data becomes useful only when it is organized and connected to a decision.

This chapter builds the conceptual foundation for the rest of the book. Later chapters focus more directly on data types, databases, SQL, relational design, analytics, and strategy. Here, we begin with the larger logic: how data, systems, management, and performance fit together.

<div class="callout key-takeaway">
  <p><strong>ðŸ”‘ Key Takeaway: Data alone does not improve performance</strong></p>
  <p>Data becomes valuable only when people use information systems to organize it, interpret it, and act on it. Storing records is not the same as using them.</p>
</div>



![Examples of business data from retail transactions, website analytics, patient monitoring, and student systems](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-interaction-data)
*Figure 2.6 â€” Business activity creates data everywhere, and information systems make those records usable for decisions.*



<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## From Data to Business Meaning

The book is titled *Using Data to Drive Business Performance*. Before we go further, we need a clear idea of what data is and how it becomes meaningful in a business context.

![Chapter 2 Infographic Overview](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-infographic-overview)
*Figure 2.7 â€” Chapter 2 Infographic Overview.*

### What Is Data?

**Data** consists of raw observations, symbols, identifiers, measurements, and recorded facts that represent aspects of reality.

In a business setting, data can include:

- customer IDs;
- transaction amounts;
- product codes;
- timestamps;
- attendance records;
- appointment dates;
- inventory counts;
- ratings;
- addresses;
- payment statuses.

A single piece of data often means very little by itself. The number `42` could mean 42 dollars, 42 students, 42 minutes, 42 units sold, or 42 customer complaints. A date like `2026-03-08` might be a delivery date, a payment date, a birthday, or an appointment date.

Data needs context.

Context tells us what a value represents, where it came from, when it was recorded, and how it should be interpreted. Without context, data is just a recorded trace. With context, data can become evidence.

For example, a retailer may record that Product A sold 120 units last week. That number becomes more useful when the retailer also knows the prior week's sales, the product category, the price, the promotion history, and the inventory level. The value is no longer just a number. It becomes part of a business story.

![Data as Raw Material](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-data-as-raw-material)
*Figure 2.8 â€” Data as Raw Material: Data is processed into information, knowledge, and wisdom.*

Data matters because modern organizations depend on visibility. Managers cannot improve what they cannot observe, and they cannot observe at scale without records. Every interaction, workflow, and decision leaves a trace. Those traces become the raw material for measurement, analysis, and control.

That is why data is the starting point, not the endpoint.

![Slide 2: Learning Objectives](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-02)

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>


### The DIKW Hierarchy

What is data? What is information? What is knowledge? What is wisdom? These four questions sit at the heart of one of the most useful frameworks in information systems: the **DIKW hierarchy** (Ackoff, 1989).

The hierarchy can be understood through four guiding questions:

| Level           | Guiding Question     | Meaning                                                     |
| --------------- | -------------------- | ----------------------------------------------------------- |
| **Data**        | What was recorded?   | Raw observations, values, symbols, or facts                 |
| **Information** | What happened?       | Data organized into a meaningful pattern or summary         |
| **Knowledge**   | Why is it happening? | Interpretation based on context, comparison, and experience |
| **Wisdom**      | What should we do?   | Judgment about action, priorities, and consequences         |

A student example helps. A student receives an exam score of 68. That score is data. If the class average was 82 and the student missed most questions about SQL joins, the score becomes information. If the instructor recognizes that several students struggled with joins, that becomes knowledge about a learning gap. If the instructor adds a new practice activity before the next assessment, that is wisdom in action.

![Moving from data to information, knowledge, and wisdom](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-data-iwsom)

*Moving from raw data to information, knowledge, and wisdom.*

The same pattern appears in business. A grocery store records sales transactions. Those transactions are data. A report showing that dairy products sell faster on weekends is information. A manager recognizing that weekend demand is tied to family shopping patterns is using knowledge. Adjusting staffing and inventory before the weekend is a decision based on wisdom.

![DIKW Staircase Exam Example](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-03)

*The DIKW Hierarchy.*
*Figure 2.9 â€” The DIKW Hierarchy: Moving from data to information, knowledge, and wisdom.*


The key point is simple: storing data is not the same as using data. Organizations create value when they move from records to interpretation and from interpretation to action.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### The R.E.A.D. Framework

The DIKW hierarchy describes stages of meaning. But this book is also concerned with the organizational and technical work that makes those stages possible. That is why we introduce the **R.E.A.D. framework**.

Where DIKW describes stages of meaning, R.E.A.D. describes the work required to move through those stages.

| Stage | Name | What It Involves |
|---|---|---|
| **R** | **Representation and Retrieval** | Structuring raw inputs so data is accurate, accessible, and consistently stored. This is where database design and SQL begin. |
| **E** | **Expression and Experience** | Presenting information through forms, reports, dashboards, and interfaces that people can understand and use. |
| **A** | **Association and Acquisition** | Identifying patterns, relationships, and explanations that turn information into knowledge. Analytics and business intelligence emerge here. |
| **D** | **Decision-Making and Deployment** | Translating insight into action, strategy, process changes, or system improvements. |

![The R.E.A.D. Framework](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-04)

The same four stages show up in very different settings. The two examples below â€” a university grading database and an online retailer â€” will both come back in later chapters.

| R.E.A.D. stage | Grading database example | Online retailer example |
|---|---|---|
| **Representation and Retrieval** | Grade records are entered consistently and stored in a structured database. | Orders, returns, payments, and shipping scans are captured in shared systems. |
| **Expression and Experience** | A report shows which students have missing assignments. | Dashboards show order volume, late shipments, and customer complaints. |
| **Association and Acquisition** | Patterns reveal that students who miss early assignments are more likely to fall behind later. | Analysis reveals that late deliveries spike when one warehouse runs low on staff. |
| **Decision-Making and Deployment** | The instructor reaches out earlier or redesigns the first two weeks of the term. | Managers reassign inventory, change staffing, and update delivery rules. |

DIKW explains how meaning develops. R.E.A.D. explains how organizations and systems help that development happen in practice. Later chapters return to these stages in more applied ways â€” Chapter 3 examines data itself in detail before the book moves into database design and SQL.

![Figure 2.2: DIKW and R.E.A.D. Compared](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-dikw-read-compared)
*Figure 2.11 â€” DIKW and R.E.A.D. Compared: DIKW describes how meaning develops, while R.E.A.D. shows the organizational work that helps move data toward action.*

![R.E.A.D. online-retailer walkthrough](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-read-online-retailer-walkthrough)
*Figure 2.12 â€” R.E.A.D. online-retailer walkthrough.*

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Why Data Quality Matters

![The data-to-performance Chain](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-11)

*The data-to-performance Chain.*

Not all data is equally useful.

If data is inaccurate, incomplete, inconsistent, or outdated, every later step becomes weaker. A dashboard may look impressive, but if the data behind it is wrong, the dashboard only helps people make wrong decisions faster.

Four data quality dimensions matter throughout this book:

| Dimension        | Meaning                                 | Example Problem                                        |
| ---------------- | --------------------------------------- | ------------------------------------------------------ |
| **Accuracy**     | Data matches reality                    | A customer address is entered incorrectly              |
| **Completeness** | Required data is present                | A patient record is missing allergy information        |
| **Timeliness**   | Data is current enough for the decision | Inventory data updates after orders are already placed |
| **Consistency**  | The same idea is recorded the same way  | One system uses "NY" while another uses "New York"     |


![Slide 5: ](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-05)

Data quality is a management issue. Poor data quality distorts KPIs, misleads managers, frustrates customers, and reduces trust in systems. Good decisions require trustworthy data. Chapter 3 examines data quality, classification, and governance in more depth.

![KPI Before and After Cleaning](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-kpi-before-after-cleaning)
*Figure 2.13 â€” KPI Before and After Cleaning: Quality data leads to trustworthy metrics.*

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Business as a Performance System

### What Is a Business?

To understand what information systems must support, we need a clear idea of what a business is. In this book, a business is not limited to a private company that earns profit. The term includes any organization that transforms resources into valued outcomes under constraints.

A **business** is an organization that creates value by transforming inputs into outputs under conditions of limited resources, competing priorities, and uncertainty.

That definition includes retailers, manufacturers, hospitals, nonprofits, schools, banks, and government agencies. Each of these organizations pursues goals, allocates resources, and works under constraints. Profit may matter in some cases, but the broader pattern is the same: organizations exist to create outcomes that matter to stakeholders.

**Stakeholders** are the people and groups affected by the organization's actions. They include customers, employees, owners, suppliers, students, regulators, patients, and the broader public. Because stakeholders care about different outcomes, business performance is always multidimensional. A hospital may track patient safety, operating efficiency, regulatory compliance, and financial sustainability at the same time. A university may track enrollment, retention, learning outcomes, and budget stability. A retailer may track revenue, margin, customer satisfaction, and supply reliability.

This is why data matters. Organizations need evidence about how well they are creating value, where processes are breaking down, and what adjustments are needed. Without that evidence, management depends too heavily on anecdote and guesswork.


### The Input-Process-Output Model

A useful way to understand how organizations work is the **Input-Process-Output (IPO) model**.

![Basic Input-Process-Output Model](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-image-008)
*Figure 2.14 â€” Basic Input-Process-Output Model.*

Every business takes in inputs, transforms them through processes, and produces outputs.

| IPO Element | Meaning | Business Example |
|---|---|---|
| **Inputs** | Resources used by the organization | Labor, materials, money, time, data |
| **Processes** | Activities that transform inputs | Production, service delivery, analysis, scheduling |
| **Outputs** | Results produced by the organization | Products, services, reports, experiences, decisions |

The IPO model gives students a practical mental map. Instead of seeing an organization as a confusing set of departments, the model highlights transformation. Something enters the system. Work is performed. Something of value comes out.

The model also helps explain why data belongs in a business textbook. Data can function as both an input and an output. Organizations use data as an input to decisions, planning, and analysis. At the same time, every business process produces new data as an output. Data is part of a continuous feedback loop, not a one-time resource.

For the online retailer, inputs include inventory, labor, warehouse space, software tools, and incoming customer orders. Processes include payment validation, picking, packing, shipping, and customer-service follow-up. Outputs include delivered orders, updated inventory levels, customer experiences, and new operational data that managers can analyze.

The IPO model will appear again when the chapter defines information systems. That is not an accident. Information systems are themselves organized arrangements that take in inputs, process them, and generate outputs.

![Input-Process-Output Model](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-input-output)

### Efficiency, Effectiveness, and KPIs

Once a business is understood as a value-creating system, the next question is how to judge whether it is performing well.

**Business performance** refers to how well an organization achieves important goals for relevant stakeholders. Performance is not the same as activity. An organization can be busy without being effective. It can produce many reports without improving decisions. It can use advanced technology without improving outcomes.

Two of the most important dimensions of performance are efficiency and effectiveness.

- **Efficiency** means doing things right. The focus is on using resources well and reducing waste.
- **Effectiveness** means doing the right things. The focus is on achieving goals that actually matter.

Organizations usually need both. A company can be efficient but ineffective if it produces the wrong product well. A university office can process forms quickly but still fail students if the process does not solve their problems.

Measuring performance is harder than it looks. As the productivity paradox shows (Brynjolfsson, 1993), technology investments do not always produce visible or immediate returns â€” the benefits may be delayed, distributed across the organization, or difficult to isolate from other factors. This is why clear KPIs and good data matter: without them, organizations cannot tell whether their systems are actually improving performance.

Because performance is complex, organizations use **Key Performance Indicators (KPIs)**. A KPI is a quantifiable signal used to evaluate progress toward an important goal.

| Goal | Possible KPI |
|---|---|
| Improve customer loyalty | Customer retention rate |
| Improve delivery reliability | On-time delivery percentage |
| Improve student success | Course completion rate |
| Improve profitability | Gross margin |

A KPI is useful only when people understand what it means, where the data comes from, and what decision it should support. A trustworthy KPI usually needs several design decisions behind it: a clear business goal, a precise formula, a reliable data source, a refresh cycle, an owner who is expected to act on it, and thresholds that indicate acceptable or risky performance.

When KPI design is sloppy, behavior gets distorted. If a call center tracks average handling time without tracking resolution quality, employees may rush customers off the phone. If a school tracks pass rates without checking learning depth, instructors may lower standards. Metrics shape attention, incentives, and action, which is why measurement is always a management issue, not just a reporting issue.

<div class="callout business-insight">
  <p><strong>ðŸ“Š Business Insight: KPIs shape behavior</strong></p>
  <p>When you evaluate a KPI, ask not only what it measures but also what behavior it encourages. A KPI that looks neutral on a dashboard can drive teams toward speed at the cost of quality, or short-term wins at the cost of long-term performance.</p>
</div>

![Efficiency vs Effectiveness 2x2 Matrix](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-efficiency-vs-effectiveness-matrix)
*Figure 2.17 â€” Efficiency vs Effectiveness 2x2 Matrix.*

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### The Data-to-Performance Chain

![The Data-to-Performance Chain](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-chain-blueprint)

The central logic of this chapter can be stated simply:

```text
Data -> Information -> Insight -> Decision -> Performance
```

![The data-to-wisdom hierarchy within a performance chain](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-data-to-wisdom)


Data is captured from activity. Data becomes information when it is organized and placed in context. Information becomes insight when people recognize a pattern, cause, risk, or opportunity. Insight becomes valuable when it informs a decision. A decision matters when it changes behavior, operations, or outcomes.

Consider a delivery company. Each delivery creates data: pickup time, drop-off time, route, driver, distance, customer rating, and delay reason. A weekly report showing delays in one region is information. Further analysis that reveals warehouse congestion is insight. A staffing or routing change is a decision. If on-time delivery improves, the decision affects performance.

This chain helps explain why the book connects technical and managerial topics. A database is not valuable merely because it stores records. It is valuable when its structure helps an organization ask better questions and make better decisions.

![Figure 2.3: The Data-to-Performance Chain](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-chain)
*Figure 2.18 â€” The Data-to-Performance Chain: Performance improves when organizations collect new data, summarize it, choose a response, act, and learn from the results.*

### Management as Decision-Making

Management can be understood as decision-making under uncertainty (Simon, 1997). Managers decide what to prioritize, what to measure, how to allocate resources, when to intervene, and how to evaluate results.

![From operational inputs to managerial evidence](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-input-2-evidence)

Information improves management because it reduces uncertainty and makes decisions more disciplined. Without reliable information, managers may depend too heavily on guesses, habits, anecdotes, or the loudest voice in the room.

Organizations make decisions at different levels.

| Decision Level | Time Horizon | Common Information Need | Example |
|---|---|---|---|
| **Operational** | Short term | Current status, alerts, task queues | Which orders need attention today? |
| **Managerial** | Medium term | Reports, KPIs, trends, comparisons | Which department is falling behind? |
| **Strategic** | Long term | Forecasts, scenarios, investment analysis | Should we open a new location? |

The same data can support more than one level. The difference is often aggregation, interpretation, time horizon, and responsibility. In the online-retailer example, one order record can trigger an operational alert about a late shipment, feed a managerial dashboard on warehouse performance, and contribute to a strategic discussion about whether the company should invest in a new fulfillment center.


![-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Information Systems as Organizational Engines

Data alone does not create value. Organizations need systems that help people capture, store, process, retrieve, interpret, and use data consistently.

### Why Data Alone Is Not Enough

Small groups can sometimes manage with memory, informal conversations, and ad hoc spreadsheets. Larger organizations cannot. As operations grow, problems of scale, consistency, accountability, and coordination become too large for informal methods.

Several recurring organizational problems explain why formal systems are necessary:

- **Scale**: people cannot manually coordinate large volumes of activity.
- **Memory**: organizations need records that outlast individual employees.
- **Visibility**: managers need reliable operational truth, not scattered stories.
- **Control**: standardized processes make auditing, comparison, and accountability possible.
- **Learning**: improvement depends on comparing results over time.

An information system makes information work repeatable. The same event can be recorded the same way, calculated the same way, and reported the same way across time and users. That repeatability turns information work from an improvised task into an organizational capability. The online retailer might begin with a spreadsheet that tracks late orders once a week. A full information system makes that calculation reliable every day, across customer service, warehouse, and management teams, using the same data definitions and business rules.

![Repeatable operational workflow in an information system](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-image-003)

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Information Behavior: How People Search for and Use Information

![T.D. Wilson's Information Behavior Model](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-wilson-information-behavior-model)
*Figure 2.21 â€” T.D. Wilson's Information Behavior Model.*

Systems work better when designers understand the human side of information. In information science, **information behavior** refers to how people recognize information needs, search for information, encounter information, retrieve it, evaluate it, and use it in context (Wilson, 1981, 2000).

For this chapter, three ideas are especially useful.

**Information need.** An information need is the gap between what a person knows and what they need to know in order to solve a problem, answer a question, or make a decision. Wilson (1981) argued that understanding a need means understanding three things together: *why* the person decided to look, *what purpose* the information will serve, and *how* it will be used once found. A dashboard pulled up without those three answers is activity, not inquiry.

**Information-seeking behavior.** Information-seeking behavior is the set of actions people take to search for, find, retrieve, and evaluate information â€” running a query, opening a report, filtering a dashboard, scanning notes, or asking a colleague. Seeking is usually better understood as a *session* than as a single search: people refine queries, change directions, and combine sources as their understanding develops (Wilson, 2000). Not all useful information comes from active search either â€” people also encounter it through alerts, peer conversations, or dashboards they happen to glance at.

**Information use.** Information use is what people actually do with information once they have it: decide, explain, share, act, redesign a process, or set it aside. A report that is never used does not improve performance, no matter how accurate it is.

| Concept | Meaning | Online-retailer example |
|---|---|---|
| **Information need** | The gap between what a person knows and what they need to know in order to solve a problem, answer a question, or make a decision. | A customer-service lead notices a spike in complaints and needs to know whether one warehouse, carrier, or product category is causing the issue. |
| **Information-seeking behavior** | The actions people take to search for, find, retrieve, and evaluate information. | The lead opens a dashboard, filters late shipments by warehouse and week, checks recent complaint notes, and asks a logistics manager for context. |
| **Information use** | What people do with information once they have it: decide, explain, share, act, redesign a process, or ignore it. | The lead reassigns support staff, updates customer-service scripts, and escalates the warehouse staffing problem to operations. |

Information behavior matters because a database is not useful merely because it contains records. It is useful when people can connect those records to real questions and actions. Barriers such as unclear labels, poor search tools, missing permissions, inconsistent definitions, or low trust in the data can prevent users from moving from information need to information use.

![Slide 9: Management as Decision-Making](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-09)

<div class="callout business-insight">
  <p><strong>ðŸ“Š Business Insight: Information that no one uses has no value</strong></p>
  <p>When you evaluate a report or dashboard, ask three questions in order: What need does it serve? How will people find and read it? What decision will it support? If any answer is unclear, the system is producing data, not information.</p>
</div>

These three ideas map directly onto R.E.A.D. **Representation and Retrieval** supplies the records people search through. **Expression and Experience** shapes how information is encountered, scanned, and trusted. **Decision-Making and Deployment** is information use in action. The rest of the book moves through these layers in order: Chapters 4 and 5 build the retrieval layer with databases and SQL; Chapters 9 and 14 shape the experience layer with analytics and Power BI; later strategy and decision chapters return to how information is actually used. Designing a good information system means designing for all three.

![Workflow showing an employee moving from information need to information seeking to information use, with barriers such as unclear labels, missing permissions, delayed data updates, inconsistent definitions of late shipment, and low trust in the data](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-information-behavior-workflow)
*Figure 2.22 â€” Information behavior links need, seeking, and use; barriers at any stage can prevent information from turning into action.*

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### What Is an Information System?

An **information system** is a coordinated arrangement of people, processes, data, and technology that collects, processes, stores, and distributes information to support coordination, control, analysis, and decision-making (Laudon & Laudon, 2024).

The important word is **coordinated**. An information system is not just software. It includes the people who use it, the rules they follow, the data they enter, and the technology that supports the work.

A full information system can be described as a five-part operating loop:

1. **Input** â€” capturing raw data from business activity (orders, scans, entries, sensors).
2. **Processing** â€” checking, calculating, sorting, and organizing that data into usable form.
3. **Storage** â€” keeping data accessible, secure, and consistent over time.
4. **Output** â€” delivering information through reports, dashboards, alerts, and recommendations.
5. **Feedback** â€” using output to adjust inputs, processes, or decisions, closing the learning loop.

Feedback is the piece that ties information systems back to managerial learning and performance improvement. Without feedback, an information system is a one-way pipeline. With feedback, it becomes a cycle â€” and cycles improve over time.

For example, a customer relationship management (CRM) system is not only CRM software. The full system also includes customer data, sales workflows, follow-up rules, dashboards, training, and reporting routines. Failures often come from unclear processes, weak data standards, poor training, or lack of trust in the output â€” not from the software alone.



![Input-Process-Output Model](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-06)

*Figure 2.23 â€” An information system follows the same input-process-output logic as the business processes it supports.*

### Information Systems vs. Information Technology

Students often use **information system** and **information technology** as if they mean the same thing. They are related, but they are not identical.

| Term | Meaning | Example |
|---|---|---|
| **Information Technology (IT)** | The technical tools and infrastructure used to support digital work | Software, servers, networks, devices, databases |
| **Information System (IS)** | The full arrangement of people, processes, data, and technology that supports work and decisions | A complete sales process that uses software, shared data standards, dashboards, and follow-up routines |

![Slide 7: Efficiency, Effectiveness, and KPIs](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-07)



This distinction matters because many organizations treat system problems as software problems. Sometimes the real issue is unclear data, weak processes, poor training, low trust, or a mismatch between the system and the work.

Consider a coffee shop that installs a new point-of-sale system. The software is modern and the hardware works. But if the shop does not train staff on how to enter orders consistently, does not define what each menu button means, and does not check whether the end-of-day reports match the cash drawer, the data will be unreliable. The technology is in place, but the information system has failed â€” because the people and process components were neglected.

<div class="callout avoid">
  <p><strong>âŒ Avoid: Buying a tool is not building a system</strong></p>
  <p>A CRM application is information technology. A sales process that defines what customer stages mean, trains staff to update records consistently, uses dashboards in weekly review meetings, and follows up on overdue opportunities is an information system. Buying the tool does not guarantee the system.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### The Five-Component Framework

One useful way to describe an information system is the **five-component framework** (Kroenke & Boyle, 2021).

| Component | Meaning | Example |
|---|---|---|
| **Hardware** | Physical devices | Computers, servers, scanners, phones |
| **Software** | Programs and applications | Databases, operating systems, business apps |
| **Data** | Recorded facts and values | Transactions, customer records, grades, inventory |
| **Processes** | Rules and workflows | Approvals, standards, procedures, reporting routines |
| **People** | Users and stakeholders | Employees, managers, analysts, customers, administrators |

All five components matter. A system can fail because the hardware is unreliable, the software is confusing, the data is inaccurate, the process is weak, or people do not trust or use the system well. A database project is therefore never only a database project. It is also a people project, a process project, and a decision-making project.

![The Five-Component Framework](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-08)
*The five components of an information system.*

People are especially important because they define goals, interpret outputs, and choose actions. Hardware and software can automate parts of the process, but they do not decide what the organization should value or how competing goals should be balanced. That is why business courses pay such close attention to the managerial side of systems.

In the online-retailer example, hardware includes scanners, warehouse devices, and servers. Software includes the storefront, payment platform, order-management system, and database. Data includes orders, inventory counts, delivery timestamps, and complaint records. Processes define how orders are validated, packed, shipped, and refunded. People include customers, warehouse staff, managers, analysts, and support agents. If delivery times worsen, the cause could lie in any one of the five components or in the relationships among them.

![The five components of an information system working together](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-components)
*Figure 2.24 â€” Information systems work only when hardware, software, data, processes, and people support one another.*

<div class="callout tip">
  <p><strong>ðŸ’¡ Tip: Remember the five components with a simple frame</strong></p>
  <p>Hardware is the machinery. Software is the logic. Data is the raw material. Processes are the rules. People give the system purpose. All five must work together for the system to deliver value.</p>
</div>

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Managing Information Systems for Business Value

![Figure 2.5: MIS, BITM, Alignment, and Governance](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-mis-bitm-alignment-governance)
*Figure 2.25 â€” MIS, BITM, Alignment, and Governance.*

Information systems matter because they make better managerial action possible â€” not because the technology exists on its own. A system that no one trusts, no one uses, or no one connects to a real decision is just overhead. The next sections explore how organizations manage information systems to create business value: through MIS (managerial use of information), BITM (strategic management of technology), alignment (fitting systems to goals), and governance (deciding who decides).

### Putting the Terms Side by Side

Before going deeper, it helps to see the four key terms â€” IT, IS, MIS, and BITM â€” compared directly.

| Term | Focus | Central question | Example |
|---|---|---|---|
| **Information Technology (IT)** | Tools and infrastructure | What technology do we have? | Servers, networks, software licenses, cloud platforms |
| **Information System (IS)** | Coordinated people-process-data-technology arrangement | How do we turn data into decisions? | A complete sales system with software, workflows, data standards, and training |
| **Management Information Systems (MIS)** | Using information for management | What information do managers need, and how do they get it? | Dashboards, reports, KPIs that support planning, organizing, and controlling |
| **Business Information Technology Management (BITM)** | Managing technology as a strategic resource | Which technologies should we invest in, and how do we govern them? | Technology roadmaps, investment decisions, governance structures, risk management |

IT is the toolbox. IS is the workshop. MIS is the manager's view of the workshop. BITM is the leadership's strategy for the toolbox and the workshop together.

![Management information systems compared with business IT management](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-image-009)

### Management Information Systems (MIS)

**Management Information Systems (MIS)** is the field of study and practice focused on using information systems to support managerial work, organizational coordination, and business performance.

MIS asks practical questions:

- What information do managers need?
- How should that information be captured?
- How should it be reported?
- Who should have access to it?
- How can systems improve coordination and decisions?

MIS is not just about tools. It is about how information supports management. It supports planning through forecasting and trend analysis, organizing through workflow visibility and resource allocation, leading through communication and accountability, and controlling through KPIs, exception reports, and audit trails. An operations manager who uses daily reports on late shipments, return rates, and packing errors to decide whether to reassign labor or adjust service promises is doing the work MIS is designed to support.

### Business Information Technology Management (BITM)

**Business Information Technology Management (BITM)** focuses on how organizations select, design, govern, and adapt technology to support business goals.

BITM is closely related to MIS, but it puts more emphasis on managing technology as a business resource. It asks which technologies an organization should invest in, how risks should be managed, and how technology value should be measured.

In simple terms, MIS focuses on how information systems support management. BITM focuses on how technology choices are managed as strategic business decisions. The retailer uses MIS when managers monitor late shipments and return rates. It uses BITM when leadership decides whether to adopt a new order-management platform, redesign fulfillment workflows, retrain staff, and define who can approve major system changes.



A system can be technically impressive and still fail if it does not fit the organization. A retailer that competes on low cost needs systems that support inventory control and operational discipline. A hospital that competes on quality needs systems that support accurate records, safe care, and coordinated decisions. The better question is not only, "Does the system work?" The better question is, "Does the system help the organization do what it is trying to do?"

![Strategic Alignment](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-10)

Strategic alignment can support several common business aims:

- **Cost leadership** through efficiency, standardization, and waste reduction.
- **Differentiation** through service quality, personalization, and customer experience.
- **Innovation** through new business models, platforms, and digital capabilities.

If the online retailer competes on fast and reliable delivery, its systems must support accurate inventory visibility, dependable checkout, timely shipping updates, and rapid issue resolution. If those capabilities are weak, the strategy fails in execution no matter how good the technology looks on paper.

<!-- PAGE BREAK -->
### Governance and Accountability

**IT governance** refers to the decision rights, accountability structures, priorities, and oversight mechanisms used to guide technology investments and system use (Weill & Ross, 2004).

Governance is not the same as day-to-day system administration. Administration focuses on operating the systems well. Governance focuses on deciding whether the organization is investing in the right systems, under the right controls, for the right reasons. Governance asks:

- Who decides which systems are built or purchased?
- Who owns the data?
- Who is responsible for security?
- How are risks managed?
- Who can change records, reports, or system settings?
- How does the organization know whether a system creates value?

These questions matter because technology value is often harder to judge than managers expect. Brynjolfsson's work on the productivity paradox (1993) reminds us that the benefits of IT may be delayed, distributed, or difficult to isolate. A support platform may not increase revenue immediately, but it may reduce churn, improve retention, or lower error rates over time. Governance helps organizations define what value means before disappointment sets in.

Governance also matters because systems shape trust and accountability. Access controls, audit logs, data definitions, approval workflows, and ownership assignments all determine whether a system is safe, fair, and reliable. A technically capable system can still fail if no one knows who is responsible for data quality, security, or follow-up action.


<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Foundations That Carry Forward

Organizations now work with cloud platforms, artificial intelligence, big data analytics, Internet of Things devices, automation tools, and digital transformation initiatives. These tools can be powerful, but they do not remove the need for strong foundations. Artificial intelligence still depends on data quality. Cloud systems still require governance. Dashboards still require clear definitions. Automation still requires good process design.



![Innovation Paradox](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-innovation-paradox)
*Figure 2.4 â€” Innovation Paradox: Technology value depends on process and organization.*
![Sweet Spot of Innovation](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-sweet-spot-innovation)
*Figure 2.5 â€” Sweet Spot of Innovation: Intersection of technology, business, and human needs.*

<div class="callout info">
  <p><strong>â„¹ï¸ AI connection: New tools, same foundations</strong></p>
  <p>Generative AI assistants can draft reports, summarize dashboards, and suggest queries. They still depend on the same foundations this chapter introduced: clean data, clear processes, sensible KPIs, and governance over who can act on what. When AI is added to a weak information system, it scales the weaknesses too.</p>
</div>

The tools change. The core challenge remains. Organizations still need to turn data into useful, trustworthy, actionable intelligence.

![Figure 2.6: Foundations Leading into Data Fundamentals](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-foundations-leading-data-fundamentals)
*Figure 2.29 â€” Foundations Leading into Data Fundamentals.*

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Apply the Concepts

Before moving on, test your understanding by working through a short exercise. Choose a business you know â€” a coffee shop, a campus office, a delivery app, a streaming service, or any organization you interact with regularly. For that business, answer these five questions in order:

1. **Identify a business need.** What problem or opportunity does the organization face?
2. **Identify relevant data.** What records, measurements, or observations would help address that need?
3. **Trace the DIKW path.** How would that data become information, knowledge, and a possible decision?
4. **Name the five IS components.** What hardware, software, data, processes, and people would the supporting system need?
5. **Name the performance outcome.** What KPI or result would tell you whether the system improved performance?

This exercise is not about getting a perfect answer. It is about practicing the habit of connecting data, systems, and decisions â€” the habit this entire book is designed to build.

![The data-to-performance Chain](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-11)

*The data-to-performance Chain.*

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Chapter Summary

Chapter 2 explained why information systems matter for business performance.

The chapter began with the basic question of what data is and how it gains meaning. It used the DIKW hierarchy to show how raw records can become information, knowledge, and wisdom. It then introduced the R.E.A.D. framework to show the organizational and technical work required to move through those stages in practice.

The chapter then defined a business as a value-creating system that transforms inputs into outputs under constraints. The Input-Process-Output model offered a simple way to understand that transformation. The discussion of efficiency, effectiveness, KPIs, and decision levels showed how organizations judge whether they are performing well and how the same data supports different kinds of decisions.

From there, the chapter explained why organizations need information systems â€” and what those systems actually are. It distinguished information systems from information technology, added the five-part operating loop (input, processing, storage, output, feedback), and used the five-component framework to show that hardware, software, data, processes, and people all matter.

Finally, the chapter connected systems to management with a side-by-side comparison of IT, IS, MIS, and BITM. MIS emphasizes the managerial use of information. BITM emphasizes technology as a strategic business resource. Strategic alignment explains why systems must fit organizational goals. IT governance explains how decision rights, accountability, risk, and value review shape results.

This foundation matters because the rest of the book builds directly on it. Chapter 3 examines data itself â€” classification, structure, metadata, and governance. Chapter 4 introduces databases as the core technology for reliable data management. Every later chapter â€” on SQL, the relational model, normalization, analytics, and strategy â€” depends on the ideas established here: that data gains meaning through organization, that systems are more than tools, and that performance improves when managers connect information to action.

<!-- MEDIA HANDOFF: Uploaded to Cloudinary by user override -->
![Chapter 2 Summary: Foundations of Information Systems â€” from data to business performance](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch02-mis-and-bitm/ch02-all)

*Figure 2.30 â€” Chapter 2 at a glance: foundations of information systems, connecting data, systems, management, and performance.*

![The Data-to-Performance Chain](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-chain-blueprint)

*The Data-to-Performance Chain.*



## References

Ackoff, R. L. (1989). From data to wisdom. *Journal of Applied Systems Analysis, 16*(1), 3-9.

Brynjolfsson, E. (1993). The productivity paradox of information technology. *Communications of the ACM, 36*(12), 66-77.

Henderson, J. C., & Venkatraman, N. (1993). Strategic alignment: Leveraging information technology for transforming organizations. *IBM Systems Journal, 32*(1), 4-16.

Kroenke, D. M., & Boyle, R. J. (2021). *Experiencing MIS* (9th ed.). Pearson.

Laudon, K. C., & Laudon, J. P. (2024). *Management information systems: Managing the digital firm* (18th ed.). Pearson.

Simon, H. A. (1997). *Administrative behavior: A study of decision-making processes in administrative organizations* (4th ed.). Free Press.

Weill, P., & Ross, J. W. (2004). *IT governance: How top performers manage IT decision rights for superior results*. Harvard Business School Press.

Wilson, T. D. (1981). On user studies and information needs. *Journal of Documentation, 37*(1), 3-15. https://doi.org/10.1108/eb026702

Wilson, T. D. (2000). Human information behavior. *Informing Science, 3*(2), 49-56.
