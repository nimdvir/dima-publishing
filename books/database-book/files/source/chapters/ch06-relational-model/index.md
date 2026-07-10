# Chapter 6: The Relational Model

*How Connected Tables Replace Redundancy with Structure, Integrity, and Analytical Power*

Chapter 4 introduced databases as structured systems for storing organizational data. Chapter 5 showed how SQL retrieves, filters, joins, and summarizes that data. Chapter 6 asks a deeper design question:

## Chapter Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/vWVWVtFS070" title="Chapter 6 overview video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Watch the Chapter 6 overview video](https://www.youtube.com/watch?v=vWVWVtFS070)

# Chapter Roadmap

| Topic | Why It Matters |
| --- | --- |
| [2. What the Relational Model Does Differently](#2-what-the-relational-model-does-differently) | See how the relational model replaces redundancy with structure and integrity. |
| [2.1 Definition](#2-1-definition) | Pin down exactly what a relation is — the formal foundation underneath every SQL table. |
| [2.2 The Relational Model Is Not a Software Product](#2-2-the-relational-model-is-not-a-software-product) | Separate the conceptual model from the products that implement it. |
| [2.3 Properties of a Formal Relation](#2-3-properties-of-a-formal-relation) | Learn the rules that keep relational data clean, unique, and predictable. |
| [2.4 Relational Vocabulary](#2-4-relational-vocabulary) | Speak the language of databases — relation, tuple, attribute, domain, and more. |
| [2.5 Where This Chapter Is Going: The Seven-Table Schema](#2-5-where-this-chapter-is-going-the-seven-table-schema) | Preview the multi-table design that anchors the rest of the chapter's discussion. |
| [3. Entities, Attributes, Relationships, and Relations](#3-entities-attributes-relationships-and-relations) | Map real-world objects and their connections into a structured database design. |
| [3.1 Entities](#3-1-entities) | Define the things your database tracks — customers, orders, students, and courses. |
| [3.2 Attributes](#3-2-attributes) | Identify the properties that describe each entity and belong in its columns. |
| [3.3 Relationships](#3-3-relationships) | Model how entities connect — the logic that makes JOINs meaningful. |

---
