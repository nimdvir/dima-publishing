# Chapter 6: The Relational Model

*How Connected Tables Replace Redundancy with Structure, Integrity, and Analytical Power*

This chapter explains the relational model — the foundation of modern database design. It shows why flat tables break down as data complexity grows, how separating subjects into connected tables with primary and foreign keys eliminates redundancy and modification anomalies, and how entity and referential integrity protect data relationships. The Grading Database serves as the running case study, moving from one fragile flat table to a robust seven-table relational schema. SQL joins are introduced as the analytical payoff — they reconstruct report-ready views from separate tables on demand.

## Chapter Roadmap

| Section | Main Question | Why It Matters |
| --- | --- | --- |
| [1. Why One Big Table Fails](#1-why-one-big-table-fails) | What goes wrong when everything is stored together? | Introduces redundancy and modification anomalies. |
| [2. What the Relational Model Does Differently](#2-what-the-relational-model-does-differently) | What does the relational model do differently? | Explains the logic of tables, rows, columns, and relationships. |
| [3. Entities, Attributes, Relationships, and Relations](#3-entities-attributes-relationships-and-relations) | What real-world things are we modeling? | Connects business concepts to schema design. |
| [4. Keys: How Tables Identify Rows](#4-keys-how-tables-identify-rows) | How does each row get a stable identity? | Shows how records are uniquely identified. |
| [5. Foreign Keys and Relationship Types](#5-foreign-keys-and-relationship-types) | How do tables connect? | Explains one-to-many and many-to-many relationships. |
| [6. Integrity Rules: Protecting Identity and Relationships](#6-integrity-rules-protecting-identity-and-relationships) | How does the database protect valid connections? | Prevents orphan records and invalid references. |
| [7. Redesigning the Grading Database](#7-redesigning-the-grading-database) | How does a flat gradebook become relational? | Applies the model to a concrete course database. |
| [8. Querying a Relational Design with Joins](#8-querying-a-relational-design-with-joins) | How do separated tables become useful reports? | Shows why relational structure supports SQL analysis. |
| [9. Microsoft Access as a Visual Learning Tool](#9-microsoft-access-as-a-visual-learning-tool) | How does this look in Microsoft Access? | Builds the design hands-on and makes integrity visible. |
| [10. Functional Dependencies and the Bridge to Normalization](#10-functional-dependencies-and-the-bridge-to-normalization) | How do we know what belongs together? | Prepares the transition to normalization. |

## Chapter Files

- [Main Chapter](ch06-main-2026-05-29.md)
- [Let's Build](ch06-lets-build-2026-05-24.md)
- [Review & Reflection](ch06-reflection-2026-03-22.md)
- [Terms Treasury](ch06-terms-2026-06-16.md)
- [Readiness Assessment Test](ch06-rat-2026-05-19.md)
- [Lab](lab-06-questions-2026-05-24.md)
