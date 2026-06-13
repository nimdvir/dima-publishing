<!-- metadata: date="2026-06-11"; chapter="09"; type="outline"; title="Chapter 9 Outline"; description="Chapter 9 structural outline" -->

# Chapter 9 Outline: Database Design and ER Modeling

Designing Databases Before Writing Queries

This outline follows the chapter structure and keeps only chapter sections reflected in the manuscript.

## Chapter Overview

* Reposition the course from working with databases to designing them.
* Explain that SQL skill depends on one foundational assumption: the database has already been designed well.
* Frame Chapter 10 as the shift from querying data to creating structures that others can rely on.

### Why Design Comes Before SQL

* Show that even precise queries cannot fix a poorly structured database.
* Explain that unclear relationships, inconsistent tables, and missing business rules make SQL fragile.
* Reinforce that many apparent query problems are actually design problems.

* Connect the chapter back to earlier material.
* Explain that Chapters 6 and 7 introduced the relational model and normalization as structural foundations.
* Show that Chapter 10 expands that work into a broader systems and design framework.

## The Cost of Poor Design: Data Anomalies

* Introduce data anomalies as the predictable outcome of poor database design.
* Reinforce that anomalies come from redundant or improperly organized data rather than from unusual edge cases.

### Insertion Anomaly

* Explain that new data cannot be added cleanly because unrelated required data is missing.
* Use the flat grading-table example to show why a new deliverable cannot be recorded before a student grade exists.

### Update Anomaly

* Show that repeated facts force the same change to be made in many places.
* Reinforce that missing one repeated row creates conflicting data for the same real-world fact.

### Deletion Anomaly

* Explain that removing one record can unintentionally remove another fact that still matters.
* Use the flat grading-table example to show how deleting a grade can also delete student information.

* Reinforce the chapter's core warning.
* Show that these anomalies are structurally inevitable in flat, poorly designed systems.
* Position the remaining chapter as the answer to how design makes such failures impossible by structure rather than by caution.

## The System Development Life Cycle (SDLC)

* Introduce the SDLC as the framework for moving from a business problem to a working information system.
* Emphasize that databases exist inside a broader systems process rather than as isolated tables.

### What Is the SDLC?

* Define the SDLC as a structured framework for planning, building, deploying, and maintaining information systems.
* Reinforce that database design must support workflows, reporting, and long-term integrity.
* Show that skipping design inside the SDLC leads to systems that work briefly and then fail under pressure.

### SDLC Phases: A Database View

* Walk through the phases from planning and analysis to maintenance with a database lens.
* Explain planning and analysis as the stage for identifying stakeholders, business requirements, and system questions.
* Explain design as the stage where conceptual, logical, and physical database structures are defined.
* Reinforce that development should implement the blueprint rather than improvise it.
* Explain testing, deployment, and maintenance as phases where the design is validated, put into use, and adapted over time.

* Connect early design decisions to long-term cost.
* Reinforce that mistakes made early are the most expensive to repair later.

## From Requirements to Structure

* Explain that database design begins before any table is created.
* Frame design as the work of translating real-world business needs into a logical data model rather than into immediate code.

### Identifying Core Design Elements

* Define entities as the things the organization needs to track.
* Use the Grading Database to identify core entities such as STUDENT, DELIVERABLE, CLASS SESSION, and GRADE.

* Define attributes as the descriptive properties of each entity.
* Distinguish simple versus composite, single-valued versus multi-valued, and stored versus derived attributes.
* Reinforce that data should be stored in its smallest logical parts and that derived values are usually better computed at query time.

* Define relationships as the links among entities.
* Show how students, deliverables, class sessions, grades, and attendance connect in the Grading Database.

### Design Before SQL

* Warn against jumping directly into SQL or data types before relationships are understood.
* Reinforce that effective design delays tool-specific decisions until business logic is clear.
* Distinguish business-logic design from later implementation choices such as data types, indexes, and DBMS features.

## Entity-Relationship (ER) Modeling

* Introduce ER modeling as the chapter's main conceptual and visual design method.
* Explain that ER modeling describes what data exists, how it is structured, and how the pieces relate before any SQL is written.

### What ER Modeling Is

* Define ER modeling as a visual and conceptual method for database design.
* Explain that it bridges business understanding and technical structure.
* Reinforce that it helps stakeholders agree on structure before implementation begins.

### Entities and Attributes in ERDs

* Explain how entities are represented in ER diagrams.
* Show how attributes are classified and represented, including regular, key, multi-valued, derived, and composite attributes.
* Reinforce that attribute type affects later relational mapping decisions.

### The Key Hierarchy

* Explain the difference among superkeys, candidate keys, primary keys, foreign keys, and surrogate keys.
* Reinforce that keys both identify entities and connect related tables.
* Show why choosing the right key matters to later relational implementation.

### Relationships: Cardinality and Participation

* Explain cardinality ratios as the limits on how many relationship instances an entity can participate in.
* Cover 1:1, 1:N, and M:N relationships with business-oriented examples.

* Explain participation constraints as rules about whether involvement in a relationship is required or optional.
* Reinforce that cardinality and participation together express business rules that later affect foreign-key nullability and constraint design.

## Crow's Foot Notation

* Introduce Crow's Foot notation as the chapter's standard visual language for relationship rules.
* Reinforce that it is widely used in tools such as Access, Lucidchart, Visio, and Draw.io.

### Why Crow's Foot Notation Matters

* Explain that Crow's Foot notation makes cardinality and optionality visible immediately.
* Show why a visual notation helps students read structural rules before implementing them in SQL.

### Core Symbols

* Introduce the symbols for one, optional, and many.
* Show how combinations of those symbols express mandatory or optional one and mandatory or optional many.

### Reading Crow's Foot Diagrams

* Teach students to read the symbols from the perspective of the opposite entity.
* Use STUDENT, STUDENT_GRADE, DELIVERABLE, FINAL_GRADE, and ATTENDANCE examples to make relationship patterns concrete.
* Reinforce that reading diagrams correctly is part of understanding business rules.

### Crow's Foot to SQL

* Show how Crow's Foot notation guides SQL implementation.
* Connect required relationships to `NOT NULL` foreign keys, optional relationships to nullable foreign keys, one-to-many patterns to foreign-key placement, and referential integrity to SQL constraints.

## Advanced ER Concepts

* Expand the design vocabulary beyond basic entities and one-to-many relationships.
* Show that realistic systems often need more expressive modeling constructs.

### Weak Entity Sets

* Define weak entities as entities that cannot be uniquely identified by their own attributes alone.
* Explain existence dependence, partial keys, and composite primary keys.
* Use homework submissions as an example of a weak entity tied to a deliverable.

### Associative (Intersection) Entities

* Define associative entities as the mechanism for resolving many-to-many relationships.
* Explain that they hold foreign keys to parent entities and often carry their own relationship-specific attributes.
* Use STUDENT_GRADE as the chapter's main associative-entity example.

### Specialization and Generalization

* Explain specialization as top-down creation of subclasses and generalization as bottom-up creation of a superclass.
* Reinforce inheritance of common attributes and the constraints of disjoint versus overlapping hierarchies.

### Recursive Relationships

* Define recursive relationships as relationships in which an entity is related to itself.
* Use the EMPLOYEE-manages-EMPLOYEE example to show how self-referencing structures appear in design.

## Normalization: Structural Integrity

* Reconnect ER modeling to normalization.
* Explain that ER modeling identifies what exists and how it relates, while normalization tests whether the resulting tables are structurally sound.

### Normal Forms

* Summarize First, Second, and Third Normal Form, plus BCNF, at a review level.
* Reinforce atomic values, removal of partial dependencies, removal of transitive dependencies, and the stricter rule of BCNF.
* Position this section as structural reinforcement rather than a full re-teaching of Chapter 7.

### When to Denormalize

* Explain denormalization as deliberate redundancy accepted for performance reasons.
* Reinforce that it should be done with justification and documented trade-offs rather than as a shortcut around good design.

## From ER Diagrams to Relational Tables

* Present the systematic mapping process that converts conceptual design into a relational schema.
* Reinforce that this step is where diagrams become implementable table structures.

* Walk through the mapping sequence.
* Explain strong entities becoming tables, weak entities inheriting owner keys, and relationships being mapped differently depending on cardinality.
* Cover 1:1, 1:N, M:N, and recursive relationship mappings.

* Explain how special attribute types map.
* Show that composite attributes become separate columns, multi-valued attributes usually become separate tables, and derived attributes are usually computed rather than stored.

* Explain the three strategies for mapping specialization hierarchies.
* Compare one-table-per-class, subclass-only, and single-table inheritance approaches with their trade-offs.

## Design vs. Implementation

* Distinguish clearly between logical design and physical design.
* Reinforce that good structure should remain valid even when the platform changes.

### Logical Design

* Define logical design as the platform-independent definition of entities, attributes, relationships, keys, and constraints.
* Emphasize that logical design captures meaning rather than software-specific details.

### Physical Design

* Define physical design as the DBMS-specific translation of the logical model into data types, indexes, platform features, and integrity actions.
* Show that implementation details vary even when the logical design remains the same.

### Why This Distinction Matters

* Reinforce that technologies change while design principles do not.
* Show that logically well-designed systems migrate and scale more easily than systems built around one tool's defaults.

## Chapter Summary

* Summarize the chapter's central argument that databases are designed rather than discovered.
* Reinforce that good structure comes from translating business needs, rules, and workflows into entities, relationships, and constraints.

* Revisit the main chapter takeaways.
* Emphasize anomalies as signs of bad design, the SDLC as the development framework, ER modeling as the shared visual language, Crow's Foot notation as the way to express relationship rules, and normalization as structural protection.
* Reinforce that a systematic ER-to-relational mapping process turns conceptual diagrams into reliable relational schemas.

* End on the chapter's practical design message.
* Show that when SQL becomes hard to write and read, the design is often the real problem.

## Let's Build

The Chapter 10 Let's Build section should have students create Entity-Relationship Diagrams for the Grading Database using both Lucidchart and Mermaid, then connect those designs to SQL implementation. The activity should guide students through identifying core entities, drawing relationships, applying Crow's Foot cardinality, adding primary and foreign keys, validating the diagram against business rules, and translating the design into portable, versionable diagram artifacts. The emphasis should stay on design-first thinking before implementation.

## Lab

The Chapter 10 lab should move students from recognizing design terminology to applying it in a database-modeling workflow. It should ask students to identify entities, attributes, keys, and relationships from a business scenario, express cardinality and participation constraints, choose appropriate ER constructs for more complex cases, and explain how the resulting design would map into relational tables. The hands-on work should stay introductory but concrete, centered on design reasoning, ER modeling, and schema mapping rather than on platform-specific coding details alone.
