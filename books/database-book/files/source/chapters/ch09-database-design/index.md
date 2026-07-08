# Chapter 9: Database Design and ER Modeling

Up to this point, we have built database objects, worked with tables, created relationships, normalized data, and written SQL queries to retrieve and analyze information. That sequence matters because it gave us practical experience with what databases can do. But there is an important shift we need to make now.

## Chapter Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/Q0LRaJ1wl_I" title="Chapter 9 overview video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Watch the Chapter 9 overview video](https://www.youtube.com/watch?v=Q0LRaJ1wl_I)

# Chapter Roadmap

| Topic | Why It Matters |
| --- | --- |
| [9.1 From Querying Data to Designing Systems](#9-1-from-querying-data-to-designing-systems) | Shift from writing queries to designing the structures those queries depend on. |
| [9.2 The Cost of Poor Design: Data Anomalies](#9-2-the-cost-of-poor-design-data-anomalies) | Quantify what bad database design costs in real business terms. |
| [9.3 Database Design in the System Development Life Cycle](#9-3-database-design-in-the-system-development-life-cycle) | See where database design fits within the broader system development process. |
| [9.4 From Requirements to Structure](#9-4-from-requirements-to-structure) | Translate business needs into a concrete database blueprint. |
| [9.5 Entity-Relationship Modeling](#9-5-entity-relationship-modeling) | Learn ER modeling — the visual language for designing databases before writing a single CREATE statement. |
| [9.6 Crow's Foot Notation](#9-6-crow-s-foot-notation) | Read and draw ER diagrams using the industry-standard Crow's Foot symbols. |
| [9.7 Understanding Relationship Types](#9-7-understanding-relationship-types) | Master 1:1, 1:M, and M:N — the three relationship patterns behind every JOIN. |
| [9.8 Advanced ER Modeling Concepts](#9-8-advanced-er-modeling-concepts) | Handle composite keys, weak entities, and other real-world modeling challenges. |
| [9.9 Normalization as a Design-Quality Check](#9-9-normalization-as-a-design-quality-check) | Use normalization to validate your ER design before implementation. |
| [9.10 From ER Diagrams to Relational Tables](#9-10-from-er-diagrams-to-relational-tables) | Convert visual designs into actual CREATE TABLE statements — the designer's payoff. |

---
