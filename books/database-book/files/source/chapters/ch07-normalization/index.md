# Chapter 7: Data Normalization

*From Flat Files to Reliable Relational Design*

Chapter 6 introduced the relational model: data is stored in separate tables, rows
represent instances, and keys connect related records. Chapter 7 asks the next
question: how do we know whether those tables are designed well? The answer is
**normalization** — the design discipline that helps database designers reduce
redundancy, prevent data anomalies, and place each fact where it belongs.

## Chapter Roadmap

| Section | Main Question | Why It Matters |
| --- | --- | --- |
| [7.1 Why Normalization Matters](#7-1-why-normalization-matters) | What goes wrong when too many facts are stored in one table? | Frames normalization as protection against redundancy and anomalies. |
| [7.2 Functional Dependencies: The Logic Behind Normalization](#7-2-functional-dependencies-the-logic-behind-normalization) | How do we know which facts belong together? | Functional dependencies are the reasoning tool behind every normal form. |
| [7.3 Normal Forms: A Step-by-Step Design Checklist](#7-3-normal-forms-a-step-by-step-design-checklist) | What sequence of design checks improves table structure? | Normal forms turn good design into a repeatable checklist. |
| [7.4 First Normal Form (1NF): One Cell, One Fact](#7-4-first-normal-form-1nf-one-cell-one-fact) | Is each cell storing one fact? | Removes multi-valued cells and repeating columns. |
| [7.5 Second Normal Form (2NF): The Whole Key](#7-5-second-normal-form-2nf-the-whole-key) | Does every non-key attribute depend on the whole key? | Removes partial dependencies from composite-key tables. |
| [7.6 Third Normal Form (3NF): Nothing But the Key](#7-6-third-normal-form-3nf-nothing-but-the-key) | Does every non-key attribute depend only on the key? | Removes transitive dependencies and separates rules from facts. |
| [7.7 The Normalized Grading Database](#7-7-the-normalized-grading-database) | What does the improved schema look like? | Shows the payoff: a clean, reliable multi-table design. |
| [7.8 Normalization and Analytics](#7-8-normalization-and-analytics) | How do normalized databases still support reports and dashboards? | Joins reconstruct report-ready views from normalized tables. |
| [7.9 Denormalization: When Redundancy Is Intentional](#7-9-denormalization-when-redundancy-is-intentional) | When is intentional redundancy acceptable? | Explains controlled trade-offs for performance. |
| [7.10 Common Normalization Mistakes](#7-10-common-normalization-mistakes) | What pitfalls should designers avoid? | Helps you recognize and prevent predictable design errors. |

## Chapter Files

- [Main Chapter](ch07-main-2026-06-16.md)
- [Let's Build](ch07-lets-build-2026-06-16.md)
- [Review & Reflection](ch07-reflection-2026-06-16.md)
- [Terms Treasury](ch07-terms-2026-06-16.md)
- [Readiness Assessment Test](ch07-rat-2026-06-16.md)

## Lab

- [Lab 7 Questions](lab-07-questions-2026-06-16.md)
