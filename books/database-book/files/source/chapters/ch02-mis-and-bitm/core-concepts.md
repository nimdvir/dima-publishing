<!-- metadata: date="2026-06-22" -->
<!-- Chapter edit (2026-06-22): integrated networks, EIS, business-function transformation, emerging technologies (cloud/AI/IoT/blockchain), cybersecurity, and data ethics; expanded chapter summary. Technical meaning preserved. -->

# Chapter 2: Foundations of Information Systems

## Learning Objectives

After reading this chapter, you will be able to:

<!-- markdownlint-disable MD032 -->
- define data, information, knowledge, and wisdom;
- explain how raw data becomes useful for business decisions;
- describe business performance and explain why it is multidimensional;
- explain how KPIs translate goals into measurable signals;
- define information systems and distinguish them from information technology;
- describe the five components of an information system;
- explain how MIS and BITM connect systems, management, and strategy.
<!-- markdownlint-enable MD032 -->

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Core Concepts

<img src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_600/bitm330book/00-general/ch00-concepts" alt="Core Concepts section icon" width="220" loading="lazy">

[Watch supplementary video 1](https://www.youtube.com/watch?v=yvo3Uj_6U4s)

<iframe width="560" height="315" src="https://www.youtube.com/embed/yvo3Uj_6U4s" title="Chapter 2 supplementary video 1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<!-- MEDIA HANDOFF: Uploaded to Cloudinary by user override -->
![Chapter 2 concept map: foundations of information systems, from data to business performance](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch02-mis-and-bitm/ch02-concepts)

_Figure 2.1 — Chapter 2 concept map: foundations of information systems, from data to business performance._

### Framing the Course Title

The course this book supports is called *Business Information Technology Management*. Each word in that title matters. **Business** reminds us that the starting point is not technology. The starting point is an organization that creates value under constraints. **Information** reminds us that data becomes useful when it is organized, interpreted, and connected to decisions. **Technology** reminds us that tools — databases, software, networks, analytics platforms — make information work scalable and repeatable. **Management** reminds us that every technology choice is also a resource decision, a people decision, and a strategy decision.

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

![Chapter 2 study questions](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-study-questions)

_Figure 2.2 — The eight study questions that frame Chapter 2._

### Why Foundations Matter

Every business activity leaves a trail.

A sale, a shipment, a website click, a customer complaint, a returned item, a delivery delay, or a payment record can all become data. These records may look small by themselves. But together, they allow organizations to see what is happening.

That is the starting point.

Data helps organizations observe activity. Information systems help organizations organize that activity. Managers use those systems to understand problems, evaluate options, and decide what to do next.

This is why information systems are not just technical tools. They are business systems. They shape what people can see, what they can measure, what they can trust, and what they can improve.

An online retailer might use data to decide which products to stock more of, which shipping routes to adjust, and which customers to offer promotions. A university might use data to identify students who need support. In each case, data becomes useful only when it is organized and connected to a decision.

This chapter builds the conceptual foundation for the rest of the book. Later chapters focus more directly on data types, databases, SQL, relational design, analytics, and strategy. Here, we begin with the larger logic: how data, systems, management, and performance fit together.

<div class="callout key-takeaway">
  <p><strong>🔑 Key Takeaway: Data alone does not improve performance</strong></p>
  <p>Data becomes valuable only when people use information systems to organize it, interpret it, and act on it. Storing records is not the same as using them.</p>
</div>

![Business activity creates data everywhere, and information systems make those records usable for decisions](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-interaction-data)

_Figure 2.3 — Business activity creates data everywhere, and information systems make those records usable for decisions._

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### From Data to Business Meaning

The book is titled *Using Data to Drive Business Performance*. Before we go further, we need a clear idea of what data is and how it becomes meaningful in a business context.

![Chapter 2 infographic overview](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-infographic-overview)

_Figure 2.4 — Chapter 2 infographic overview._

![Foundations of Information Systems Management — concept overview showing the relationships between data, systems, management, and business performance](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch02-mis-and-bitm/ch02-foundations-is-management)

_Figure 2.5 — Foundations of Information Systems Management: core concepts and their relationships._

#### What Is Data?

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

For example, an online retailer may record that Product A sold 120 units last week. That number becomes more useful when the retailer also knows the prior week's sales, the product category, the price, the promotion history, and the inventory level. The value is no longer just a number. It becomes part of a business story.

![Data as raw material — processed into information, knowledge, and wisdom](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-data-as-raw-material)

_Figure 2.6 — Data as raw material: data is processed into information, knowledge, and wisdom._

Data matters because modern organizations depend on visibility. Managers cannot improve what they cannot observe, and they cannot observe at scale without records. Every interaction, workflow, and decision leaves a trace. Those traces become the raw material for measurement, analysis, and control.

That is why data is the starting point, not the endpoint.

![Chapter 2 learning objectives slide](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-02)

_Figure 2.7 — Chapter 2 learning objectives._

#### The DIKW Hierarchy

What is data? What is information? What is knowledge? What is wisdom? These four questions sit at the heart of one of the most useful frameworks in information systems: the **DIKW hierarchy** (Ackoff, 1989).

The hierarchy can be understood through four guiding questions:

| Level           | Guiding Question     | Meaning                                                     |
| --------------- | -------------------- | ----------------------------------------------------------- |
| **Data**        | What was recorded?   | Raw observations, values, symbols, or facts                 |
| **Information** | What happened?       | Data organized into a meaningful pattern or summary         |
| **Knowledge**   | Why is it happening? | Interpretation based on context, comparison, and experience |
| **Wisdom**      | What should we do?   | Judgment about action, priorities, and consequences         |

A student example helps. A student receives an exam score of 68. That score is data. If the class average was 82 and the student missed most questions about SQL joins, the score becomes information. If the instructor recognizes that several students struggled with joins, that becomes knowledge about a learning gap. If the instructor adds a new practice activity before the next assessment, that is wisdom in action.

![Moving from raw data to information, knowledge, and wisdom](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-data-iwsom)

_Figure 2.8 — Moving from raw data to information, knowledge, and wisdom._

The same pattern appears in business. An online retailer records sales transactions. Those transactions are data. A report showing that certain products sell faster on weekends is information. A manager recognizing that weekend demand is tied to promotional timing is using knowledge. Adjusting inventory and marketing before the weekend is a decision based on wisdom.

![The DIKW hierarchy moving from data to information, knowledge, and wisdom](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-03)

_Figure 2.9 — The DIKW hierarchy: moving from data to information, knowledge, and wisdom._

The key point is simple: storing data is not the same as using data. Organizations create value when they move from records to interpretation and from interpretation to action. In that sense, MIS exists to move organizations up this hierarchy — from raw records to better decisions.

#### The R.E.A.D. Framework

The DIKW hierarchy describes stages of meaning. But this book is also concerned with the organizational and technical work that makes those stages possible. That is why we introduce the **R.E.A.D. framework**.

Where DIKW describes stages of meaning, R.E.A.D. describes the work required to move through those stages.

| Stage | Name                               | What It Involves                                                                                                                             |
| ----- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **R** | **Representation and Retrieval**   | Structuring raw inputs so data is accurate, accessible, and consistently stored. This is where database design and SQL begin.                |
| **E** | **Expression and Experience**      | Presenting information through forms, reports, dashboards, and interfaces that people can understand and use.                                |
| **A** | **Association and Acquisition**    | Identifying patterns, relationships, and explanations that turn information into knowledge. Analytics and business intelligence emerge here. |
| **D** | **Decision-Making and Deployment** | Translating insight into action, strategy, process changes, or system improvements.                                                          |

![The R.E.A.D. framework](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-04)

_Figure 2.10 — The R.E.A.D. framework: representation and retrieval, expression and experience, association and acquisition, decision-making and deployment._

The same four stages show up in very different settings. The two examples below — a university grading database and an online retailer — will both come back in later chapters.

| R.E.A.D. stage                     | Grading database example                                                                       | Online retailer example                                                           |
| ---------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Representation and Retrieval**   | Grade records are entered consistently and stored in a structured database.                    | Orders, returns, payments, and shipping scans are captured in shared systems.     |
| **Expression and Experience**      | A report shows which students have missing assignments.                                        | Dashboards show order volume, late shipments, and customer complaints.            |
| **Association and Acquisition**    | Patterns reveal that students who miss early assignments are more likely to fall behind later. | Analysis reveals that late deliveries spike when one warehouse runs low on staff. |
| **Decision-Making and Deployment** | The instructor reaches out earlier or redesigns the first two weeks of the term.               | Managers reassign inventory, change staffing, and update delivery rules.          |

DIKW explains how meaning develops. R.E.A.D. explains how organizations and systems help that development happen in practice. Later chapters return to these stages in more applied ways — Chapter 3 examines data itself in detail before the book moves into database design and SQL.

![DIKW and R.E.A.D. compared](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-dikw-read-compared)

_Figure 2.11 — DIKW and R.E.A.D. compared: DIKW describes how meaning develops, while R.E.A.D. shows the organizational work that moves data toward action._

![R.E.A.D. online-retailer walkthrough](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-read-online-retailer-walkthrough)

_Figure 2.12 — R.E.A.D. framework applied to an online retailer._

#### Why Data Quality Matters

![The data-to-performance chain](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-11)

_Figure 2.13 — The data-to-performance chain._

Not all data is equally useful.

If data is inaccurate, incomplete, inconsistent, or outdated, every later step becomes weaker. A dashboard may look impressive, but if the data behind it is wrong, the dashboard only helps people make wrong decisions faster.

Four data quality dimensions matter throughout this book:

| Dimension        | Meaning                                 | Example Problem                                        |
| ---------------- | --------------------------------------- | ------------------------------------------------------ |
| **Accuracy**     | Data matches reality                    | A customer address is entered incorrectly              |
| **Completeness** | Required data is present                | A patient record is missing allergy information        |
| **Timeliness**   | Data is current enough for the decision | Inventory data updates after orders are already placed |
| **Consistency**  | The same idea is recorded the same way  | One system uses "NY" while another uses "New York"     |

![Data quality dimensions slide](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-05)

_Figure 2.14 — Four dimensions of data quality: accuracy, completeness, timeliness, and consistency._

Data quality is a management issue. Poor data quality distorts KPIs, misleads managers, frustrates customers, and reduces trust in systems. Good decisions require trustworthy data. Chapter 3 examines data quality, classification, and governance in more depth — including how data is structured into fields, records, and tables before Chapter 4 introduces databases as the organizing technology.

![KPI before and after data cleaning](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-kpi-before-after-cleaning)

_Figure 2.15 — KPI before and after data cleaning: quality data leads to trustworthy metrics._

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Business as a Performance System

#### What Is a Business?

To understand what information systems must support, we need a clear idea of what a business is. In this book, a business is not limited to a private company that earns profit. The term includes any organization that transforms resources into valued outcomes under constraints.

A **business** is an organization that creates value by transforming inputs into outputs under conditions of limited resources, competing priorities, and uncertainty.

That definition includes retailers, manufacturers, hospitals, nonprofits, schools, banks, and government agencies. Each of these organizations pursues goals, allocates resources, and works under constraints. Profit may matter in some cases, but the broader pattern is the same: organizations exist to create outcomes that matter to stakeholders.

**Stakeholders** are the people and groups affected by the organization's actions. They include customers, employees, owners, suppliers, students, regulators, patients, and the broader public. Because stakeholders care about different outcomes — financial, operational, social, and strategic — business performance is always multidimensional. An online retailer may track revenue, margin, customer satisfaction, and supply reliability. A hospital may track patient safety, operating efficiency, regulatory compliance, and financial sustainability at the same time. A university may track enrollment, retention, learning outcomes, and budget stability.

This is why data matters. Organizations need evidence about how well they are creating value, where processes are breaking down, and what adjustments are needed. **Value creation** — turning resources into outcomes that matter to stakeholders — is the central managerial challenge, and data is what makes that challenge visible and measurable. Without that evidence, management depends too heavily on anecdote and guesswork.

#### The Input-Process-Output Model

A useful way to understand how organizations work is the **Input-Process-Output (IPO) model**.

![Basic Input-Process-Output model](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-image-008)

_Figure 2.16 — Basic Input-Process-Output model._

Every business takes in inputs, transforms them through processes, and produces outputs.

| IPO Element   | Meaning                              | Business Example                                    |
| ------------- | ------------------------------------ | --------------------------------------------------- |
| **Inputs**    | Resources used by the organization   | Labor, materials, money, time, data                 |
| **Processes** | Activities that transform inputs     | Production, service delivery, analysis, scheduling  |
| **Outputs**   | Results produced by the organization | Products, services, reports, experiences, decisions |

The IPO model gives students a practical mental map. Instead of seeing an organization as a confusing set of departments, the model highlights transformation. Something enters the system. Work is performed. Something of value comes out.

The model also helps explain why data belongs in a business textbook. Data can function as both an input and an output. Organizations use data as an input to decisions, planning, and analysis. At the same time, every business process produces new data as an output. Data is part of a continuous feedback loop, not a one-time resource.

For the online retailer, inputs include inventory, labor, warehouse space, software tools, and incoming customer orders. Processes include payment validation, picking, packing, shipping, and customer-service follow-up. Outputs include delivered orders, updated inventory levels, customer experiences, and new operational data that managers can analyze.

The IPO model will appear again when the chapter defines information systems. That is not an accident. Information systems are themselves organized arrangements that take in inputs, process them, and generate outputs.

![Input-Process-Output model](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-input-output)

_Figure 2.17 — Input-Process-Output model applied to a business context._

#### Efficiency, Effectiveness, and KPIs

Once a business is understood as a value-creating system, the next question is how to judge whether it is performing well.

**Business performance** refers to how well an organization achieves important goals for relevant stakeholders. Performance is not the same as activity. An organization can be busy without being effective. It can produce many reports without improving decisions. It can use advanced technology without improving outcomes.

Two of the most important dimensions of performance are efficiency and effectiveness.

- **Efficiency** means doing things right. The focus is on using resources well and reducing waste.
- **Effectiveness** means doing the right things. The focus is on achieving goals that actually matter.

Organizations usually need both. A company can be efficient but ineffective if it produces the wrong product well. A university office can process forms quickly but still fail students if the process does not solve their problems.

Measuring performance is harder than it looks. As the productivity paradox shows (Brynjolfsson, 1993), technology investments do not always produce visible or immediate returns — the benefits may be delayed, distributed across the organization, or difficult to isolate from other factors. This is why clear KPIs and good data matter: without them, organizations cannot tell whether their systems are actually improving performance.

Because performance is complex, organizations use **Key Performance Indicators (KPIs)**. A KPI is a quantifiable signal used to evaluate progress toward an important goal.

KPIs fall into several common categories, each tied to a different aspect of organizational performance:

- **Financial KPIs** measure economic results: revenue growth, profit margin, return on investment.
- **Operational KPIs** measure how well internal processes run: order fulfillment time, system uptime, error rates.
- **Customer KPIs** measure how the market experiences the organization: retention rate, Net Promoter Score, churn rate.
- **Innovation KPIs** measure progress toward new capabilities: products launched, R&D investment, adoption rates.

| Goal                         | Possible KPI                |
| ---------------------------- | --------------------------- |
| Improve customer loyalty     | Customer retention rate     |
| Improve delivery reliability | On-time delivery percentage |
| Improve student success      | Course completion rate      |
| Improve profitability        | Gross margin                |

A KPI is useful only when people understand what it means, where the data comes from, and what decision it should support. A trustworthy KPI usually needs several design decisions behind it: a clear business goal, a precise formula, a reliable data source, a refresh cycle, an owner who is expected to act on it, and thresholds that indicate acceptable or risky performance.

When KPI design is sloppy, behavior gets distorted. If a call center tracks average handling time without tracking resolution quality, employees may rush customers off the phone. If a school tracks pass rates without checking learning depth, instructors may lower standards. Metrics shape attention, incentives, and action, which is why measurement is always a management issue, not just a reporting issue.

<div class="callout business-insight">
  <p><strong>📊 Business Insight: KPIs shape behavior</strong></p>
  <p>When you evaluate a KPI, ask not only what it measures but also what behavior it encourages. A KPI that looks neutral on a dashboard can drive teams toward speed at the cost of quality, or short-term wins at the cost of long-term performance.</p>
</div>

![Efficiency vs. effectiveness 2x2 matrix](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-efficiency-vs-effectiveness-matrix)

_Figure 2.18 — Efficiency vs. effectiveness 2x2 matrix._

#### The Data-to-Performance Chain

![The data-to-performance chain blueprint](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-chain-blueprint)

_Figure 2.19 — The data-to-performance chain blueprint._

The **Data-to-Performance Chain** is the progression by which data becomes information, informs decisions, changes outcomes, and generates new data. The central logic of this chapter can be stated simply:

```text
Data -> Information -> Insight -> Decision -> Performance
```

![The data-to-wisdom hierarchy within a performance chain](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-data-to-wisdom)

_Figure 2.20 — The data-to-wisdom hierarchy within a performance chain._

Data is captured from activity. Data becomes information when it is organized and placed in context. Information becomes insight when people recognize a pattern, cause, risk, or opportunity. Insight becomes valuable when it informs a decision. A decision matters when it changes behavior, operations, or outcomes.

For the online retailer, each order creates data: order time, product, quantity, payment method, shipping address, and delivery timestamp. A weekly report showing late deliveries in one region is information. Further analysis revealing that one warehouse is understaffed is insight. A staffing adjustment is a decision. If on-time delivery improves, the decision affects performance.

This chain helps explain why the book connects technical and managerial topics. A database is not valuable merely because it stores records. It is valuable when its structure helps an organization ask better questions and make better decisions.

![The data-to-performance chain](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-chain)

_Figure 2.21 — The data-to-performance chain: performance improves when organizations collect data, summarize it, choose a response, act, and learn from the results._

#### Management as Decision-Making

Management can be understood as decision-making under uncertainty (Simon, 1997). Managers decide what to prioritize, what to measure, how to allocate resources, when to intervene, and how to evaluate results.

![From operational inputs to managerial evidence](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-input-2-evidence)

_Figure 2.22 — From operational inputs to managerial evidence._

Information improves management because it reduces uncertainty and makes decisions more disciplined. Without reliable information, managers may depend too heavily on guesses, habits, anecdotes, or the loudest voice in the room.

Organizations make decisions at different levels.

| Decision Level  | Time Horizon | Common Information Need                   | Example                             |
| --------------- | ------------ | ----------------------------------------- | ----------------------------------- |
| **Operational** | Short term   | Current status, alerts, task queues       | Which orders need attention today?  |
| **Managerial**  | Medium term  | Reports, KPIs, trends, comparisons        | Which department is falling behind? |
| **Strategic**   | Long term    | Forecasts, scenarios, investment analysis | Should we open a new location?      |

The same data can support more than one level. The difference is often aggregation, interpretation, time horizon, and responsibility. In the online-retailer example, one order record can trigger an operational alert about a late shipment, feed a managerial dashboard on warehouse performance, and contribute to a strategic discussion about whether the company should invest in a new fulfillment center.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Information Systems as Organizational Engines

Data alone does not create value. Organizations need systems that help people capture, store, process, retrieve, interpret, and use data consistently.

#### Why Data Alone Is Not Enough

Small groups can sometimes manage with memory, informal conversations, and ad hoc spreadsheets. Larger organizations cannot. As operations grow, problems of scale, consistency, accountability, and coordination become too large for informal methods.

Several recurring organizational problems explain why formal systems are necessary:

- **Scale**: people cannot manually coordinate large volumes of activity.
- **Memory**: organizations need records that outlast individual employees.
- **Visibility**: managers need reliable operational truth, not scattered stories.
- **Control**: standardized processes make auditing, comparison, and accountability possible.
- **Learning**: improvement depends on comparing results over time.

An information system makes information work repeatable. The same event can be recorded the same way, calculated the same way, and reported the same way across time and users. That repeatability turns information work from an improvised task into an organizational capability. The online retailer might begin with a spreadsheet that tracks late orders once a week. A full information system makes that calculation reliable every day, across customer service, warehouse, and management teams, using the same data definitions and business rules.

![Repeatable operational workflow in an information system](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-image-003)

_Figure 2.23 — A repeatable operational workflow in an information system._

#### Information Behavior: How People Search for and Use Information

![T.D. Wilson's information behavior model](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-wilson-information-behavior-model)

_Figure 2.24 — T.D. Wilson's information behavior model._

Systems work better when designers understand the human side of information. In information science, **information behavior** refers to how people recognize information needs, search for information, encounter information, retrieve it, evaluate it, and use it in context (Wilson, 1981, 2000).

For this chapter, three ideas are especially useful.

**Information need.** An information need is the gap between what a person knows and what they need to know in order to solve a problem, answer a question, or make a decision. Wilson (1981) argued that understanding a need means understanding three things together: *why* the person decided to look, *what purpose* the information will serve, and *how* it will be used once found. A dashboard pulled up without those three answers is activity, not inquiry.

**Information-seeking behavior.** Information-seeking behavior is the set of actions people take to search for, find, retrieve, and evaluate information — running a query, opening a report, filtering a dashboard, scanning notes, or asking a colleague. Seeking is usually better understood as a *session* than as a single search: people refine queries, change directions, and combine sources as their understanding develops (Wilson, 2000). Not all useful information comes from active search either — people also encounter it through alerts, peer conversations, or dashboards they happen to glance at.

**Information use.** Information use is what people actually do with information once they have it: decide, explain, share, act, redesign a process, or set it aside. A report that is never used does not improve performance, no matter how accurate it is.

| Concept                          | Meaning                                                                                                                            | Online-retailer example                                                                                                                            |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Information need**             | The gap between what a person knows and what they need to know in order to solve a problem, answer a question, or make a decision. | A customer-service lead notices a spike in complaints and needs to know whether one warehouse, carrier, or product category is causing the issue.  |
| **Information-seeking behavior** | The actions people take to search for, find, retrieve, and evaluate information.                                                   | The lead opens a dashboard, filters late shipments by warehouse and week, checks recent complaint notes, and asks a logistics manager for context. |
| **Information use**              | What people do with information once they have it: decide, explain, share, act, redesign a process, or ignore it.                  | The lead reassigns support staff, updates customer-service scripts, and escalates the warehouse staffing problem to operations.                    |

Information behavior matters because a database is not useful merely because it contains records. It is useful when people can connect those records to real questions and actions. Barriers such as unclear labels, poor search tools, missing permissions, inconsistent definitions, or low trust in the data can prevent users from moving from information need to information use.

![Management as decision-making slide](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-09)

_Figure 2.25 — Management as decision-making._

<div class="callout business-insight">
  <p><strong>📊 Business Insight: Information that no one uses has no value</strong></p>
  <p>When you evaluate a report or dashboard, ask three questions in order: What need does it serve? How will people find and read it? What decision will it support? If any answer is unclear, the system is producing data, not information.</p>
</div>

These three ideas map directly onto R.E.A.D. **Representation and Retrieval** supplies the records people search through. **Expression and Experience** shapes how information is encountered, scanned, and trusted. **Decision-Making and Deployment** is information use in action. The rest of the book moves through these layers in order: Chapters 4 and 5 build the retrieval layer with databases and SQL; Chapters 9 and 14 shape the experience layer with analytics and Power BI; later strategy and decision chapters return to how information is actually used. Designing a good information system means designing for all three.

![Information behavior links need, seeking, and use](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-information-behavior-workflow)

_Figure 2.26 — Information behavior links need, seeking, and use; barriers at any stage can prevent information from turning into action._

#### What Is an Information System?

An **information system** is a coordinated arrangement of people, processes, data, and technology that collects, processes, stores, and distributes information to support coordination, control, analysis, and decision-making (Laudon & Laudon, 2024).

The important word is **coordinated**. An information system is not just software. It includes the people who use it, the rules they follow, the data they enter, and the technology that supports the work.

A full information system can be described as a five-part operating loop:

1. **Input** — capturing raw data from business activity (orders, scans, entries, sensors).
2. **Processing** — checking, calculating, sorting, and organizing that data into usable form.
3. **Storage** — keeping data accessible, secure, and consistent over time.
4. **Output** — delivering information through reports, dashboards, alerts, and recommendations.
5. **Feedback** — using output to adjust inputs, processes, or decisions, closing the learning loop.

Feedback is the piece that ties information systems back to managerial learning and performance improvement. Without feedback, an information system is a one-way pipeline. With feedback, it becomes a cycle — and cycles improve over time.

For example, a **customer relationship management (CRM)** system is not only CRM software. The full system also includes customer data, sales workflows, follow-up rules, dashboards, training, and reporting routines. Failures often come from unclear processes, weak data standards, poor training, or lack of trust in the output — not from the software alone.

![Information Systems Architecture Overview diagram showing the layers and components of business information systems](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch02-mis-and-bitm/ch02-information-systems-architecture-overview)

_Figure 2.27 — Information Systems Architecture Overview: the layered structure of business information systems._

![An information system follows the input-process-output logic](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-06)

_Figure 2.28 — An information system follows the same input-process-output logic as the business processes it supports._

#### Information Systems vs. Information Technology

Students often use **information system** and **information technology** as if they mean the same thing. They are related, but they are not identical.

| Term                            | Meaning                                                                                          | Example                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| **Information Technology (IT)** | The technical tools and infrastructure used to support digital work                              | Software, servers, networks, devices, databases                                                        |
| **Information System (IS)**     | The full arrangement of people, processes, data, and technology that supports work and decisions | A complete sales process that uses software, shared data standards, dashboards, and follow-up routines |

![Venn diagram showing the intersection of Information Technology, Information Systems, and Business Management](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch02-mis-and-bitm/ch02-ven)

_Figure 2.29 — The relationship between Information Technology, Information Systems, and Business Management._

![Efficiency, effectiveness, and KPIs slide](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-07)

_Figure 2.30 — Efficiency, effectiveness, and KPIs._

This distinction matters because many organizations treat system problems as software problems. Sometimes the real issue is unclear data, weak processes, poor training, low trust, or a mismatch between the system and the work.

Consider an online retailer that installs a new order-management system. The software is modern and the hardware works. But if the company does not train staff on how to enter orders consistently, does not define what each order status means, and does not check whether the end-of-day reports match actual shipments, the data will be unreliable. The technology is in place, but the information system has failed — because the people and process components were neglected.

<div class="callout avoid">
  <p><strong>❌ Avoid: Buying a tool is not building a system</strong></p>
  <p>A CRM application is information technology. A sales process that defines what customer stages mean, trains staff to update records consistently, uses dashboards in weekly review meetings, and follows up on overdue opportunities is an information system. Buying the tool does not guarantee the system.</p>
</div>

#### The Five-Component Framework

One useful way to describe an information system is the **five-component framework** (Kroenke & Boyle, 2021).

| Component     | Meaning                   | Example                                                  |
| ------------- | ------------------------- | -------------------------------------------------------- |
| **Hardware**  | Physical devices          | Computers, servers, scanners, phones                     |
| **Software**  | Programs and applications | Databases, operating systems, business apps              |
| **Data**      | Recorded facts and values | Transactions, customer records, grades, inventory        |
| **Processes** | Rules and workflows       | Approvals, standards, procedures, reporting routines     |
| **People**    | Users and stakeholders    | Employees, managers, analysts, customers, administrators |

All five components matter. A system can fail because the hardware is unreliable, the software is confusing, the data is inaccurate, the process is weak, or people do not trust or use the system well. A database project is therefore never only a database project. It is also a people project, a process project, and a decision-making project.

![The five-component framework](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-08)

_Figure 2.31 — The five components of an information system._

People are especially important because they define goals, interpret outputs, and choose actions. Hardware and software can automate parts of the process, but they do not decide what the organization should value or how competing goals should be balanced. That is why business courses pay such close attention to the managerial side of systems.

In the online-retailer example, hardware includes scanners, warehouse devices, and servers. Software includes the storefront, payment platform, order-management system, and database. Data includes orders, inventory counts, delivery timestamps, and complaint records. Processes define how orders are validated, packed, shipped, and refunded. People include customers, warehouse staff, managers, analysts, and support agents. If delivery times worsen, the cause could lie in any one of the five components or in the relationships among them.

A practical way to use this framework is to ask what happens when one component fails:

| Component Problem | What Goes Wrong                            | Business Result                                     |
| ----------------- | ------------------------------------------ | --------------------------------------------------- |
| Hardware issue    | Scanners or servers fail                   | Inventory records and orders become inaccessible    |
| Software issue    | Interface is confusing or buggy            | Employees enter wrong data or bypass the system     |
| Data issue        | Duplicate or inconsistent customer records | Reports become unreliable, customer service suffers |
| Process issue     | No standard return or refund workflow      | Refunds are inconsistent, customers lose trust      |
| People issue      | Staff do not trust or use the dashboard    | Decisions revert to guesswork despite good data     |

When a system underperforms, the cause could lie in any one component. Fixing the right component requires asking the right diagnostic question: is this a technology problem, a data problem, a process problem, or a people problem?

![The five components of an information system working together](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-components)

_Figure 2.32 — Information systems work only when hardware, software, data, processes, and people support one another._

![Components of an Information System — hardware, software, data, processes, people, and networks in a unified framework](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch02-mis-and-bitm/ch02-components-of-is)

_Figure 2.33 — Components of an Information System: hardware, software, data, processes, people, and networks working together._

<div class="callout tip">
  <p><strong>💡 Tip: Remember the five components with a simple frame</strong></p>
  <p>Hardware is the machinery. Software is the logic. Data is the raw material. Processes are the rules. People give the system purpose. All five must work together for the system to deliver value.</p>
</div>

One more element connects all five components: **networks**. A network is a system of interconnected devices that can share data and resources. Networks are the backbone of communication in modern business, enabling everything from email to real-time collaboration and cloud access. They can be local, such as a **Local Area Network (LAN)** that connects computers within a single office, or vast, like a **Wide Area Network (WAN)** that connects multiple offices across the globe. The Internet is the largest WAN of all, providing a global platform for commerce, communication, and cloud-based information systems. Without networks, each component of an information system would operate in isolation.

#### Common Types of Business Information Systems

Organizations use many different kinds of information systems. Each type serves a distinct purpose, supports different decisions, and depends on quality data.

![Types of business information systems organized by organizational level and business function](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch02-mis-and-bitm/ch02-types-of-business-is)

_Figure 2.34 — Types of business information systems organized by organizational level and business function._

The table below introduces the most common categories.

| Type                                | Main Purpose                            | Example                                              | Main Decision Level    |
| ----------------------------------- | --------------------------------------- | ---------------------------------------------------- | ---------------------- |
| Transaction Processing System (TPS) | Records daily business activity         | Sales entries, order processing, attendance tracking | Operational            |
| Management Information System (MIS) | Summarizes activity for managers        | KPI reports, weekly performance dashboards           | Managerial             |
| Decision Support / BI System        | Supports analysis and comparison        | Power BI dashboards, forecasting, what-if modeling   | Managerial / Strategic |
| Enterprise System                   | Integrates major business functions     | ERP, CRM, HR systems                                 | Cross-functional       |
| Executive Information System (EIS)  | Supports senior executive decisions     | Strategic dashboards, KPI scorecards, market trends  | Strategic              |
| Knowledge / Collaboration System    | Helps people share and find information | Microsoft Teams, SharePoint, knowledge bases         | Organizational         |

Notice how each system type depends on the same foundations this chapter has already established. A TPS needs accurate data entry. An MIS needs consistent definitions and trustworthy KPIs. A BI system needs clean, well-structured data to produce meaningful analysis. An enterprise system such as **ERP** integrates all core business functions — operations, finance, HR, and sales — into a single unified suite with a central database, providing one source of truth across the organization. An EIS gives senior leaders a high-level graphical overview of key performance indicators. A collaboration system needs clear processes so people know what information to share and where to find it.

Databases are not the whole information system in any of these categories, but they often form its memory. They store the records that systems process, retrieve, report, and analyze. That is why the next chapters move from broad information-system concepts into data, databases, tables, relationships, and queries. Later in the book, you will see these system types again — transaction processing in Chapter 4, MIS reporting in Chapter 5, BI and analytics in Chapters 9 and 14, and enterprise and strategy concerns in Chapter 15.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### How IT Transforms Business Functions

Information systems are not implemented for their own sake. They are deployed to solve problems and create value in specific areas of the business.

- **Operations:** IT has revolutionized how companies produce goods and deliver services. **Supply Chain Management (SCM)** systems use real-time data to track inventory, manage logistics, and coordinate with suppliers, reducing costs and minimizing delays. In manufacturing, automation and robotics controlled by software increase production speed and precision.
- **Marketing and Sales:** The internet and data analytics have fundamentally changed marketing. Digital marketing allows companies to reach a global audience through websites, social media, and targeted advertising. Customer Relationship Management (CRM) systems store every interaction a customer has with a company, providing a complete view that helps sales teams personalize their approach and improve customer service.
- **Finance and Accounting:** Financial software automates bookkeeping, invoicing, and financial reporting, dramatically reducing manual errors. These systems provide managers with real-time dashboards showing the financial health of the organization, enabling faster, more accurate decisions about budgeting, investment, and risk.
- **Human Resources:** **Human Resource Information Systems (HRIS)** streamline payroll, benefits administration, and compliance. They also play a strategic role in talent management, helping HR professionals recruit, track applicant data, manage employee performance, and identify skill gaps.

In each of these functions, the same pattern applies: technology turns scattered data into organized, accessible information that supports better decisions.

### Why System Design Matters

Design choices in information systems are never neutral. Decisions about what data to collect, how to structure it, how to present it, and who can access it directly shape what managers can see and act upon.

Well-designed systems make performance visible. They reduce ambiguity by using consistent definitions. They support accountability by making it clear who entered what and when. They enable learning by allowing organizations to compare results over time and across units.

Poorly designed systems obscure reality. They delay action by burying useful information inside confusing reports. They create false confidence when dashboards look polished but rest on inconsistent data. They frustrate users who cannot find what they need or cannot trust what they find.

This is why information systems should be viewed as strategic assets rather than technical afterthoughts. A system that is fast and modern but poorly aligned with business processes can do more harm than good. A system that is simpler but well-designed — with clear data definitions, sensible workflows, and outputs that match real decisions — can transform how an organization operates.

The five-component framework makes this practical. When a system underperforms, the cause could lie in any component. Hardware might be unreliable. Software might be confusing. Data might be inaccurate. Processes might be unclear. People might not trust or use the system well. Fixing the right component requires asking the right diagnostic question: is this a technology problem, a data problem, a process problem, or a people problem?

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Managing Information Systems for Business Value

![MIS, BITM, alignment, and governance](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-mis-bitm-alignment-governance)

_Figure 2.35 — MIS, BITM, alignment, and governance._

Information systems matter because they make better managerial action possible — not because the technology exists on its own. A system that no one trusts, no one uses, or no one connects to a real decision is just overhead. The next sections explore how organizations manage information systems to create business value: through MIS (managerial use of information), BITM (strategic management of technology), alignment (fitting systems to goals), and governance (deciding who decides).

#### Putting the Terms Side by Side

Before going deeper, it helps to see the four key terms — IT, IS, MIS, and BITM — compared directly.

| Term                                                  | Focus                                                  | Central question                                                   | Example                                                                           |
| ----------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **Information Technology (IT)**                       | Tools and infrastructure                               | What technology do we have?                                        | Servers, networks, software licenses, cloud platforms                             |
| **Information System (IS)**                           | Coordinated people-process-data-technology arrangement | How do we turn data into decisions?                                | A complete sales system with software, workflows, data standards, and training    |
| **Management Information Systems (MIS)**              | Using information for management                       | What information do managers need, and how do they get it?         | Dashboards, reports, KPIs that support planning, organizing, and controlling      |
| **Business Information Technology Management (BITM)** | Managing technology as a strategic resource            | Which technologies should we invest in, and how do we govern them? | Technology roadmaps, investment decisions, governance structures, risk management |

IT is the toolbox. IS is the workshop. MIS is the manager's view of the workshop. BITM is the leadership's strategy for the toolbox and the workshop together.

![Management information systems compared with business IT management](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-image-009)

_Figure 2.36 — Management information systems compared with business IT management._

#### Management Information Systems (MIS)

**Management Information Systems (MIS)** is the field of study and practice focused on using information systems to support managerial work, organizational coordination, and business performance.

MIS asks practical questions:

- What information do managers need?
- How should that information be captured?
- How should it be reported?
- Who should have access to it?
- How can systems improve coordination and decisions?

MIS is not just about tools. It is about how information supports management. It supports planning through forecasting and trend analysis, organizing through workflow visibility and resource allocation, leading through communication and accountability, and controlling through KPIs, exception reports, and audit trails. An operations manager who uses daily reports on late shipments, return rates, and packing errors to decide whether to reassign labor or adjust service promises is doing the work MIS is designed to support.

#### Business Information Technology Management (BITM)

**Business Information Technology Management (BITM)** focuses on how organizations select, design, govern, and adapt technology to support business goals.

BITM is closely related to MIS, but it puts more emphasis on managing technology as a business resource. It asks which technologies an organization should invest in, how risks should be managed, and how technology value should be measured.

In simple terms, MIS focuses on how information systems support management. BITM focuses on how technology choices are managed as strategic business decisions. The online retailer uses MIS when managers monitor late shipments and return rates. It uses BITM when leadership decides whether to adopt a new order-management platform, redesign fulfillment workflows, retrain staff, and define who can approve major system changes.

#### Strategic Alignment

**Strategic alignment** is the principle that information systems and technology investments should support the organization's goals, structure, and strategy (Henderson & Venkatraman, 1993). A system can be technically impressive and still fail if it does not fit the organization. An online retailer that competes on low cost needs systems that support inventory control and operational discipline. A hospital that competes on quality needs systems that support accurate records, safe care, and coordinated decisions. The better question is not only, "Does the system work?" The better question is, "Does the system help the organization do what it is trying to do?"

![Strategic alignment slide](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-10)

_Figure 2.37 — Strategic alignment._

Strategic alignment can support several common business aims:

- **Cost leadership** through efficiency, standardization, and waste reduction.
- **Differentiation** through service quality, personalization, and customer experience.
- **Innovation** through new business models, platforms, and digital capabilities.

If the online retailer competes on fast and reliable delivery, its systems must support accurate inventory visibility, dependable checkout, timely shipping updates, and rapid issue resolution. If those capabilities are weak, the strategy fails in execution no matter how good the technology looks on paper.

#### Governance and Accountability

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

With the rise of digital data comes the risk of cyber threats. **Cybersecurity** is the practice of protecting systems, networks, and data from digital attacks, theft, and damage. It includes technical safeguards like firewalls, encryption, and antivirus software, as well as training employees to recognize phishing attacks and follow security procedures. No information system is complete without security.

The ability to collect vast amounts of data also raises important ethical questions about privacy and consent. Businesses must be transparent about what data they collect and how they use it. Regulations like the **General Data Protection Regulation (GDPR)** in Europe set strict rules for handling personal data. Responsible information systems balance the power of data with the obligation to protect the people behind it.

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Foundations That Carry Forward

Organizations now work with a new generation of technologies that extend the reach of information systems. These tools can be powerful, but they do not remove the need for strong foundations.

- **Cloud Computing** delivers computing services — servers, storage, databases, and software — over the internet. Instead of owning and maintaining their own IT infrastructure, companies can rent access from providers like Amazon Web Services (AWS) or Microsoft Azure. This provides flexibility, scalability, and cost savings, but it does not remove the need for governance, security, or data quality.
- **Artificial Intelligence (AI) and Machine Learning (ML)** enable systems to recognize patterns, make predictions, and automate decisions. AI is a broad field focused on creating machines that perform tasks requiring human intelligence. **ML**, a subset of AI, trains algorithms on large datasets to identify patterns. Businesses use AI for customer service chatbots, predictive analytics that forecast equipment failure, and recommendation engines that personalize shopping experiences. AI still depends on clean, well-structured data. When AI is added to a weak information system, it scales the weaknesses too.
- **The Internet of Things (IoT)** refers to the vast network of physical devices — from vehicles to factory sensors to home appliances — embedded with sensors and software that connect and exchange data over the internet. In business, IoT sensors on machinery monitor performance in real time. In logistics, they track the location and condition of shipments. IoT generates enormous volumes of data, which makes database design and data quality more important, not less.
- **Blockchain** is a secure, decentralized, and transparent way of recording transactions. While best known as the technology behind cryptocurrencies, its business applications include more secure supply chains, streamlined cross-border payments, and tamper-resistant digital records.

These technologies are exciting, but they all depend on the same foundations this chapter introduced. Artificial intelligence still depends on data quality. Cloud systems still require governance. Dashboards still require clear definitions. Automation still requires good process design. The tools change. The core challenge remains: turning data into useful, trustworthy, actionable intelligence.

![Innovation paradox](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-innovation-paradox)

_Figure 2.38 — Innovation paradox: technology value depends on process and organization._

![Sweet spot of innovation](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-sweet-spot-innovation)

_Figure 2.39 — Sweet spot of innovation: intersection of technology, business, and human needs._

<div class="callout info">
  <p><strong>ℹ️ AI connection: New tools, same foundations</strong></p>
  <p>Generative AI assistants can draft reports, summarize dashboards, and suggest queries. They still depend on the same foundations this chapter introduced: clean data, clear processes, sensible KPIs, and governance over who can act on what. When AI is added to a weak information system, it scales the weaknesses too.</p>
</div>

The tools change. The core challenge remains. Organizations still need to turn data into useful, trustworthy, actionable intelligence.

![Foundations leading into data fundamentals](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1200/bitm330book/ch02-mis-and-bitm/ch02-foundations-leading-data-fundamentals)

_Figure 2.40 — Foundations leading into data fundamentals._

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

### Apply the Concepts

Before moving on, test your understanding by working through a short exercise. Choose a business you know — an online retailer, a coffee shop, a campus office, a streaming service, or any organization you interact with regularly. For that business, answer these five questions in order:

1. **Identify a business need.** What problem or opportunity does the organization face?
2. **Identify relevant data.** What records, measurements, or observations would help address that need?
3. **Trace the DIKW path.** How would that data become information, knowledge, and a possible decision?
4. **Name the five IS components.** What hardware, software, data, processes, and people would the supporting system need?
5. **Name the performance outcome.** What KPI or result would tell you whether the system improved performance?

This exercise is not about getting a perfect answer. It is about practicing the habit of connecting data, systems, and decisions — the habit this entire book is designed to build.

![The data-to-performance chain](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-slide-11)

_Figure 2.41 — The data-to-performance chain._

<!-- PAGE BREAK -->
<div style="page-break-after: always;"></div>

## Chapter Summary

Chapter 2 explained why information systems matter for business performance.

The chapter began with the basic question of what data is and how it gains meaning. It used the DIKW hierarchy to show how raw records can become information, knowledge, and wisdom. It then introduced the R.E.A.D. framework to show the organizational and technical work required to move through those stages in practice.

The chapter then defined a business as a value-creating system that transforms inputs into outputs under constraints. The Input-Process-Output model offered a simple way to understand that transformation. The discussion of efficiency, effectiveness, KPIs, and decision levels showed how organizations judge whether they are performing well and how the same data supports different kinds of decisions.

From there, the chapter explained why organizations need information systems — and what those systems actually are. It distinguished information systems from information technology, added the five-part operating loop, and used the five-component framework — hardware, software, data, processes, people, and the networks that connect them. The chapter also introduced the most common types of business information systems — TPS, MIS, BI/DSS, enterprise, EIS, and collaboration systems — and showed how IT transforms operations, marketing, finance, and HR.

Finally, the chapter connected systems to management with a side-by-side comparison of IT, IS, MIS, and BITM. MIS emphasizes the managerial use of information. BITM emphasizes technology as a strategic business resource. Strategic alignment explains why systems must fit organizational goals. IT governance explains how decision rights, accountability, risk, and value review shape results. The chapter closed with cybersecurity, data ethics, and the emerging technologies — cloud, AI, IoT, and blockchain — that extend the reach of information systems while depending on the same foundations.

This foundation matters because the rest of the book builds directly on it. Chapter 3 examines data itself — classification, structure, metadata, and governance. Chapter 4 introduces databases as the core technology for reliable data management. Every later chapter — on SQL, the relational model, normalization, analytics, and strategy — depends on the ideas established here: that data gains meaning through organization, that systems are more than tools, and that performance improves when managers connect information to action.

<!-- MEDIA HANDOFF: Uploaded to Cloudinary by user override -->
![Chapter 2 at a glance: foundations of information systems, connecting data, systems, management, and performance](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/ch02-mis-and-bitm/ch02-all)

_Figure 2.42 — Chapter 2 at a glance: foundations of information systems, from data to business performance._

![The data-to-performance chain blueprint](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch02-mis-and-bitm/ch02-data-to-performance-chain-blueprint)

_Figure 2.43 — The data-to-performance chain: connecting data, decisions, and outcomes._

---

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
