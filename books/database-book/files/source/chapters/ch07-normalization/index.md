# Chapter 7: Data Normalization

Chapter 6 introduced the relational model: data is stored in separate tables, rows represent instances, and keys connect related records. Chapter 7 asks the next question: how do we know whether those tables are designed well?

Normalization is the design discipline that helps database designers reduce redundancy, prevent data anomalies, and place each fact where it belongs. It is not a software feature, a button in Access, or a SQL command that automatically fixes a database. It is a way of reasoning about structure.

## Chapter Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/AxaULgjuo8o" title="Chapter 7 overview video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Watch the Chapter 7 overview video](https://www.youtube.com/watch?v=AxaULgjuo8o)

# Chapter Roadmap

| Topic | Why It Matters |
| --- | --- |
| [7.1 Why Normalization Matters](#7-1-why-normalization-matters) | Key topic in this chapter's Core Concepts reading. |
| [7.2 Functional Dependencies: The Logic Behind Normalization](#7-2-functional-dependencies-the-logic-behind-normalization) | Key topic in this chapter's Core Concepts reading. |
| [7.3 Normal Forms: A Step-by-Step Design Checklist](#7-3-normal-forms-a-step-by-step-design-checklist) | Key topic in this chapter's Core Concepts reading. |
| [7.4 First Normal Form (1NF): One Cell, One Fact](#7-4-first-normal-form-1nf-one-cell-one-fact) | Key topic in this chapter's Core Concepts reading. |
| [7.5 Second Normal Form (2NF): The Whole Key](#7-5-second-normal-form-2nf-the-whole-key) | Key topic in this chapter's Core Concepts reading. |
| [7.6 Third Normal Form (3NF): Nothing But the Key](#7-6-third-normal-form-3nf-nothing-but-the-key) | Key topic in this chapter's Core Concepts reading. |
| [7.7 The Normalized Grading Database](#7-7-the-normalized-grading-database) | Key topic in this chapter's Core Concepts reading. |
| [7.8 Normalization and Analytics](#7-8-normalization-and-analytics) | Key topic in this chapter's Core Concepts reading. |
| [7.9 Denormalization: When Redundancy Is Intentional](#7-9-denormalization-when-redundancy-is-intentional) | Key topic in this chapter's Core Concepts reading. |
| [7.10 Common Normalization Mistakes](#7-10-common-normalization-mistakes) | Key topic in this chapter's Core Concepts reading. |

---
