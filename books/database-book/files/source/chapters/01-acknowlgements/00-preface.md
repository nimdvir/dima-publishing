# Preface

# Using Data to Drive Business Performance

## Databases and Management Information Systems

Welcome to **Using Data to Drive Business Performance: Databases and Management Information Systems**.

This book was written around a simple but important idea:

> **Organizations improve performance by using data to make better decisions.**

Businesses today generate enormous amounts of information. Every customer purchase, employee interaction, shipment, website click, financial transaction, and operational activity leaves behind data. Yet data alone does not create value.

Organizations succeed when they transform data into meaningful information, use that information to make better decisions, and align those decisions with business goals.

This book is designed to help you understand **how that process works**—not only technically, but managerially and strategically.

Rather than treating databases, analytics, information systems, and business strategy as separate topics, this book approaches them as **parts of one connected system**.

The result is a practical, business-focused understanding of how information technologies improve organizational performance.

---

# Why This Book Exists

Many textbooks teach databases as purely technical systems. Others teach Management Information Systems (MIS) at a high conceptual level without enough hands-on experience. Some focus heavily on software tools without explaining the larger business purpose behind them.

This book takes a different approach.

It integrates:

* **Business thinking**
* **Data and databases**
* **Information systems**
* **SQL and querying**
* **Analytics and reporting**
* **Managerial decision-making**
* **Technology strategy**

Throughout the book, you will repeatedly see one core idea:

```text
Data → Structure → Queries → Systems → Analytics → Decisions → Performance
```

This progression reflects how modern organizations actually operate.

Businesses collect data, organize it into structured systems, retrieve and analyze information, and ultimately use those insights to improve performance.

---

# The Logic of the Book

The book follows a deliberate intellectual progression:

```text
Business Value → Decisions → Measurement → Information Systems → Data Structures → Queries → Analytics → Strategy
```

This structure is intentional.

Rather than jumping immediately into databases or SQL, we begin with a more fundamental question:

> **Why do organizations need information systems in the first place?**

To answer that question, we first examine:

* What businesses are trying to accomplish
* How managers make decisions
* How performance is measured
* Why organizations rely on information systems
* How data supports managerial action

Only then do we move into the technical foundations of databases, querying, and analytics.

This approach mirrors both:

1. **How organizations actually function**, and
2. **How students learn complex concepts most effectively**

The goal is not simply to teach software or memorization.

The goal is to help you develop **systems thinking**.

---

# Concept Map of the Book

The entire book follows a connected conceptual architecture:

![Concept Map of the Book](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/Database-book-BITM330/01-acknowledgements/ch00-book-concept-map)

*Concept map showing the six-stage arc: Data → Tables → Relationships → Queries → Analytics → Decisions.*

The final arrow returns to **business value creation**, reinforcing an important idea:

> **Information systems are not ends in themselves. They exist to improve organizational performance.**

---

# How the Chapters Work Together

Each chapter builds on prior concepts.

The structure is intentionally cumulative.

| Conceptual Layer             | Core Question                                          | Chapters |
| ---------------------------- | ------------------------------------------------------ | -------- |
| **Business Foundations**     | What is a business trying to achieve?                  | 1–2      |
| **Managerial Decisions**     | What decisions must managers make?                     | 2        |
| **Performance Measurement**  | How do organizations know whether they are succeeding? | 2        |
| **Information Systems**      | How are operations and information coordinated?        | 2–3      |
| **Data Foundations**         | What is data and how is it represented?                | 3        |
| **Database Design**          | How do we structure business information?              | 4–6      |
| **Querying Data**            | How do we retrieve and manipulate information?         | 7–9      |
| **Analytics & Insight**      | How does data become managerial insight?               | 10–12    |
| **Strategic Technology Use** | How do organizations align technology with strategy?   | 13–16    |

As you move through the book, concepts introduced earlier will continue to reappear in deeper and more applied ways.

This repetition is intentional.

Real learning happens through **reinforcement and application**, not exposure alone.

---

# How This Book Supports Learning

This textbook follows a **progressive learning model**.

Instead of overwhelming students with technical complexity from the beginning, concepts are introduced in stages.

| Cognitive Stage              | Student Experience                          | Chapters |
| ---------------------------- | ------------------------------------------- | -------- |
| **Conceptual Understanding** | Why businesses need information and systems | 1–2      |
| **Representation**           | How business reality becomes data           | 3–5      |
| **System Design**            | Building databases and relationships        | 5–6      |
| **Procedural Skills**        | Writing SQL and retrieving information      | 7–9      |
| **Interpretation**           | Analyzing patterns and performance          | 10–12    |
| **Strategic Thinking**       | Aligning technology with business goals     | 13–16    |

The structure also aligns with **Bloom’s Taxonomy**, moving students from foundational knowledge toward higher-order thinking.

| Bloom Level    | Learning Focus                              |
| -------------- | ------------------------------------------- |
| **Remember**   | Terminology and system concepts             |
| **Understand** | IPO models and IS architecture              |
| **Apply**      | SQL and data manipulation                   |
| **Analyze**    | Interpreting patterns and relationships     |
| **Evaluate**   | Assessing KPIs and system performance       |
| **Create**     | Designing databases and analytics workflows |

The objective is not just to help students remember concepts.

It is to help them **think like business problem-solvers**.

---

# Learning by Building

One of the defining features of this book is that learning occurs through **continuous systems development**, not isolated examples.

The book uses two recurring cases:

| Case System                    | Purpose                                                            |
| ------------------------------ | ------------------------------------------------------------------ |
| **Grading Database**           | Demonstrates information system design and performance measurement |
| **Veterinary Clinic Database** | Hands-on labs for database creation, relationships, and querying   |

These cases evolve throughout the book.

Students move from understanding business goals to designing systems that support decisions.

```text
Business Goals
      ↓
KPIs
      ↓
Required Data
      ↓
Database Design
      ↓
Queries
      ↓
Reports
      ↓
Managerial Decisions
```

This approach reinforces a key principle:

> **Every table, relationship, and query should exist for a business reason.**

---

# A Final Thought Before We Begin

Modern organizations increasingly depend on people who can think across disciplines—people who understand business problems, data structures, technology, and decision-making together.

This book was written to help you become one of those people.

You do not need to be a programmer.

You do not need to be a statistician.

You do not even need to consider yourself “technical.”

You simply need curiosity, persistence, and a willingness to think systematically.

The skills you develop here—understanding systems, organizing information, writing queries, interpreting performance, and making evidence-based decisions—are among the most valuable skills in modern organizations.

Let’s begin.

## About the Author

**Dr. Nimrod Dvir **teaches Information Systems and Business Analytics at the University at Albany, State University of New York. His academic and professional background spans information science, human-computer interaction, management information systems, UX research, and digital product development.

His teaching and research focus on the ways data, technology, and information systems shape organizational decision-making and business performance. This book reflects that perspective by connecting databases, analytics, and information systems to practical business problems, human behavior, and the everyday work of modern organizations.

The goal of this book is to help students build confidence with technical concepts while understanding how data-driven organizations actually operate. Rather than treating databases as abstract technical systems, the book presents them as tools for organizing information, improving decisions, and creating business value.

![Portrait of Dr. Nimrod Dvir](https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto,c_limit,w_1600/bitm330book/ch01-introduction-to-course/ch01-me)

*Dr. Nimrod Dvir teaches Information Systems and Business Analytics at the University at Albany, SUNY, with a focus on databases, analytics, human-computer interaction, and business performance.*