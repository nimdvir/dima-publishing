<!-- metadata: date="2026-06-11"; chapter="09"; type="source"; title="Source: Database Design Textbook"; description="Source material for chapter 9" -->

# **Tab 1**

# **From Concept to Schema: A Guide to Database Design and the Entity-Relationship Model**

## **The Discipline of Database Design**

The creation of a robust, efficient, and scalable information system is fundamentally dependent on the quality of its underlying database. While it may be tempting to approach data storage in an ad-hoc manner, particularly in the early stages of a project, such a strategy inevitably leads to systems that are difficult to maintain, slow to perform, and incapable of adapting to evolving business needs. The discipline of database design provides a systematic, engineering-based approach to modeling and implementing data storage solutions. A well-designed database is not merely a container for data; it is a structured, logical, and optimized representation of a real-world domain, forming the bedrock upon which successful applications are built.

### **The Imperative for Design: Beyond Ad-Hoc Data Storage**

Good database design is a matter of following a proper process to achieve a set of critical objectives that directly impact the utility and longevity of an information system.1 The primary goals of a structured design process are to ensure clarity, flexibility, maintainability, and performance.2

* **Clarity and Data Integrity:** A formal design process produces a clear blueprint of the system's data requirements, ensuring that data is organized logically and consistently.3 This structure helps maintain data integrity by minimizing redundancy and defining clear relationships, which in turn prevents data anomalies. For example, without a proper design, information about a single customer might be duplicated across multiple records, leading to inconsistencies if an update is only applied to one record.  
* **Flexibility and Maintainability:** Business needs are not static. A well-designed database is adaptable, allowing for easy updates and modifications as requirements change.2 A modular and normalized design prevents a single change from causing a cascade of required modifications throughout the system.  
* **Performance:** A structured design supports the efficient retrieval and storage of data.2 By analyzing data relationships and access patterns upfront, designers can implement indexing strategies and physical storage parameters that optimize query performance.

Conversely, the absence of a formal design process leads to significant and predictable problems. Unstructured or poorly structured databases are prone to **data anomalies**. An **insertion anomaly** occurs when one cannot add a new piece of data because another, unrelated piece of data is missing. An **update anomaly** arises from data redundancy, where changing a fact in one place leaves other instances of that fact unchanged, creating inconsistencies. A **deletion anomaly** occurs when deleting a piece of data inadvertently removes another, unrelated piece of data. These issues are symptomatic of a design that fails to correctly model the underlying entities and their relationships, a problem that a formal design process is intended to prevent.

### **The Database Design Lifecycle: A Phased Approach**

The process of designing a database is not a single, monolithic task but a lifecycle that can be broken down into a series of distinct phases, moving from a high-level, abstract understanding of requirements to a concrete, technology-specific implementation.4 While different sources may describe this process with varying terminology or levels of granularity, they converge on a core progression through four key phases: requirements analysis, conceptual design, logical design, and physical design.2

#### **Phase 1: Requirements Analysis**

The foundational phase of any design project is to determine the purpose of the database.1 This involves a thorough analysis of the information needs of the organization and its end-users. The primary goal is to gather and organize all types of information that the system needs to record and track.6 This is not a passive process; it requires active engagement with the problem domain.

Effective techniques for information gathering include:

* **Interviewing Stakeholders:** Direct communication with the people who will use the database—from data entry clerks to executive officers—is the most effective way to understand their needs, workflows, and objectives.1  
* **Analyzing Business Forms and Reports:** Existing documents such as invoices, timesheets, surveys, and reports are invaluable artifacts. They reveal the specific data items the business currently captures and the relationships between them.1 By listing each piece of information shown on a form, a designer can begin to build a comprehensive list of required data attributes.6  
* **Examining Existing Systems:** Combing through current data systems, whether digital spreadsheets or physical file cabinets, can uncover data and business rules that might otherwise be overlooked.1

The output of this phase is a detailed specification of the data requirements and business rules that the new database must support.

#### **Phase 2: Conceptual Design**

Once the requirements are understood, the conceptual design phase begins. The goal is to create a high-level, abstract data model that is completely independent of any specific hardware or Database Management System (DBMS).2 This model focuses on capturing the essence of the system, representing data as users perceive it in the "real world".2

This phase is about understanding the problem domain: identifying the key concepts (entities), the actors, and the interactions that occur.2 For example, in a library system, the core concepts are likely to be Books, Authors, and Borrowers.2 The conceptual model establishes the overall scope of what is to be included in the database.5 The primary tool and deliverable for this phase is the **Entity-Relationship Diagram (ERD)**, a visual representation of the system's entities and their relationships.2

#### **Phase 3: Logical Design**

The logical design phase translates the abstract conceptual model into a more detailed model based on a specific data modeling paradigm, most commonly the relational model.2 This stage entails creating tables and defining the relationships between them using primary and foreign keys.2

A key activity in this phase is **normalization**, a formal process of applying rules to the table structures to minimize data redundancy and improve data integrity.1 The logical model remains platform-independent; it describes the structure of a relational database in general, not for a specific product like Oracle or SQL Server.5 The output is a logical schema that captures the essence of the data in the form of tables, columns, and key constraints.2

#### **Phase 4: Physical Design**

The final phase, physical design, takes the logical model and maps it to a specific DBMS implementation.2 This is where the abstract design becomes a concrete blueprint for construction. This phase is technology-dependent, as different DBMS products have unique features, data types, and performance characteristics.5

Key decisions made during physical design include:

* **Data Types:** Selecting precise data types for each column (e.g., VARCHAR(100), INTEGER, TIMESTAMP).2  
* **Indexing:** Creating indexes on specific columns to speed up data retrieval operations.2  
* **Storage and Partitioning:** Defining how tables are physically stored on disk and whether large tables should be partitioned for better performance and manageability.2  
* **Security:** Implementing access controls, authentication mechanisms, and encryption to protect the data.2

The output of this phase is a physical schema that can be used to generate the Data Definition Language (DDL) scripts required to create the database.

The relationship between these phases and the practical steps of design is not one of contradiction but of integration. The pragmatic steps of requirements analysis, such as interviewing users, are the activities that provide the necessary input for the theoretical phase of conceptual design. The practical task of "dividing information into tables" is the core activity of the logical design phase. This phased approach provides a structured framework that guides the designer from a vague understanding of a business problem to a fully specified, optimized, and implementable database schema.

## **Data Modeling: The Architectural Blueprint**

Data modeling is the process of creating a visual representation or blueprint that organizes data structures, relationships, and rules to support database design.3 It serves as the essential bridge connecting abstract business requirements to a concrete physical database. A well-designed data model provides a common, unified view of an organization's data, reducing misunderstandings during development and ensuring that the final system accurately reflects the business domain.3 This process is typically carried out at three distinct levels of abstraction: conceptual, logical, and physical. Each level serves a different purpose, is intended for a different audience, and contains a progressively greater level of technical detail.3

### **The Three Levels of Data Model Abstraction**

The transition from a conceptual to a physical model is best understood not just as an increase in detail, but as a process of progressive refinement and the systematic application of constraints. The conceptual model is constrained only by the business rules of the domain. The logical model adds the formal constraints of the chosen data paradigm, such as the relational model's rules of normalization. Finally, the physical model adds the technological constraints of the specific DBMS. This layered approach is a powerful risk management strategy, allowing designers to validate business logic, ensure structural integrity, and optimize for performance in distinct, manageable stages.

#### **The Conceptual Data Model: The "What"**

The conceptual data model provides a high-level, abstract overview of the system, focusing on the "what" rather than the "how".3 It is the initial blueprint, often analogized to a whiteboard sketch, created in collaboration with business stakeholders and domain experts.3

* **Purpose:** Its primary purpose is to understand the problem domain, establish the scope of the system, and define a common vocabulary for all participants.2 It captures the main entities, their most important attributes, and the relationships between them, along with core business rules.3 For instance, a conceptual model for an e-commerce platform would identify entities like Customer, Product, and Order and define business rules such as "A customer can place multiple orders".2  
* **Audience:** The primary audience is non-technical: business analysts, managers, and end-users.10 The model must therefore be simple and easily understandable, often using basic boxes and lines to represent entities and relationships.3  
* **Components:** The model consists of high-level entities and the relationships connecting them. It intentionally omits technical details like data types, primary keys, or the specific structure of tables.3 It defines *what* entities exist, not which tables will be created.9

#### **The Logical Data Model: The "How of the Details"**

The logical data model is a more refined and structured version of the conceptual model. It adds technical detail, describing the "how" of the data structure, but remains independent of any specific DBMS.3

* **Purpose:** Its purpose is to translate the conceptual blueprint into the language of a specific data model, most commonly the relational model.2 It provides a detailed, platform-independent diagram of the data structures, constraints, and relationships.10 This is the stage where tables are formally defined, columns are specified, and normalization rules are applied to ensure the design is free from data anomalies.2  
* **Audience:** The logical model is created and used by data architects and business analysts.3 It is detailed enough for technical personnel but still expressed in terms of business entities and attributes, making it a valuable communication tool between business and technical teams.  
* **Components:** The model includes all entities (which will become tables), their attributes (columns), primary keys (PKs) to uniquely identify records, and foreign keys (FKs) to establish relationships between tables.10 It specifies relationship cardinalities precisely but does not include implementation-specific details like indexes or stored procedures.10

#### **The Physical Data Model: The "How of the Implementation"**

The physical data model is the final stage, translating the logical model into a specific DBMS implementation. It describes the "how" of the actual implementation, providing the final blueprint for database administrators (DBAs) and developers.2

* **Purpose:** Its purpose is to provide a complete, technology-dependent specification for creating the database.5 It refines the logical model with all the details required by the chosen DBMS, focusing on optimizing for performance, security, and storage.2  
* **Audience:** The primary audience is technical: DBAs who will build and maintain the database, and developers who will write applications that interact with it.3  
* **Components:** The physical model is the most detailed. It specifies exact table names, column names, and data types (e.g., VARCHAR(255), NUMBER(10,2)). It includes the definition of all primary keys, foreign keys, and other constraints (e.g., NOT NULL, UNIQUE). It also defines physical storage objects like indexes, table partitions, triggers, and stored procedures.2 Its design is bound by the rigid constraints and conventions of the target DBMS.10

The following table provides a comparative summary of these three levels of data modeling.

| Characteristic | Conceptual Data Model | Logical Data Model | Physical Data Model |
| :---- | :---- | :---- | :---- |
| **Primary Objective** | To establish the scope, entities, and business rules of the domain. | To define the structure of the data in a detailed, platform-independent manner. | To specify the database-specific implementation for performance and storage. |
| **Audience** | Business Stakeholders, Analysts | Data Architects, Business Analysts | Database Administrators (DBAs), Developers |
| **Level of Abstraction** | High-level, abstract | Detailed, structured | Concrete, implementation-specific |
| **Key Components** | High-level entities and relationships | Tables, columns, primary keys, foreign keys, cardinality | Tables, columns with specific data types, indexes, constraints, triggers |
| **DBMS Dependency** | Independent | Independent | Dependent on a specific DBMS |
| **Example** | Entities: Customer, Order. Relationship: "places". | Table Customer (CustomerID, Name). Table Order (OrderID, OrderDate, *CustomerID*). | Table dbo.Customers (CustomerID INT PRIMARY KEY, Name NVARCHAR(100) NOT NULL). Index on Name. |

## **The Entity-Relationship (ER) Model: A Unified View of Data**

At the heart of conceptual and logical data modeling lies the Entity-Relationship (ER) model. It is the de facto industry standard for creating a graphical, high-level representation of data. The ER model provides a formal, systematic way to model a universe of interest by representing what exists (entities), what properties those things have (attributes), and how they are related to one another (relationships).11

### **A Historical Perspective: Peter Chen's Contribution**

The ER model was introduced by Peter Chen in a seminal 1976 paper titled, "The Entity-Relationship Model: Toward a Unified View of Data".5 Before Chen's work, there was no standardized, easily understandable way to model data at a conceptual level. His contribution was revolutionary because it provided a blueprint to visualize database structures in a way that was both formally rigorous and intuitively understandable to technical and non-technical stakeholders alike.12 The ER model bridged the critical gap between how humans perceive data in the real world and how it must be structured for implementation in a database, typically a relational database.5 For over four decades, it has remained a cornerstone of database education and professional practice.5

### **Core Constructs of the ER Model**

The ER model is built upon three fundamental concepts: entities, attributes, and relationships.11 These constructs are visually represented in an Entity-Relationship Diagram (ERD) using a standardized set of symbols.7

#### **Entities and Entity Sets**

An **entity** is a real-world object or concept that is distinguishable from other objects and about which data needs to be stored.11 Entities can be physical objects (e.g., a specific employee, a product), abstract concepts (e.g., a bank account, a course), or events (e.g., a purchase, a registration).7 In an ERD, entities are often described as the "nouns" of the database.15 An **entity set** is a collection of similar entities.5 For example, the set of all students in a university is the STUDENT entity set. In an ERD, an entity set is represented by a **rectangle**.7

#### **Attributes**

**Attributes** are the properties or characteristics that describe an entity.11 For the STUDENT entity set, attributes might include StudentID, Name, and Address. In an ERD, attributes are represented by **ovals** connected to their entity set.7 Attributes are further classified based on their characteristics:

* **Simple (Atomic) vs. Composite Attributes:** A simple attribute cannot be subdivided into smaller components (e.g., Salary).14 A composite attribute is one that can be broken down into a hierarchy of smaller attributes (e.g., Address can be composed of Street, City, and ZipCode).7 A key design principle is to store information in its smallest logical parts to facilitate easier data retrieval.6  
* **Single-Valued vs. Multi-valued Attributes:** A single-valued attribute can have only one value for a particular entity (e.g., a person has one BirthDate). A multi-valued attribute can hold multiple values for a single entity (e.g., a person may have multiple PhoneNumber values).7 In an ERD, a multi-valued attribute is depicted with a **double oval**.7  
* **Stored vs. Derived Attributes:** A stored attribute is one whose value is physically stored in the database (e.g., BirthDate). A derived attribute is one whose value can be calculated or inferred from other stored attributes (e.g., Age can be derived from BirthDate).14 It is a best practice to avoid storing calculated data in tables; instead, the value should be computed when needed.6 A derived attribute is represented by a **dashed oval** in an ERD.7

#### **Relationships and Relationship Sets**

A **relationship** is an association between two or more entities.13 Relationships are the "verbs" of an ERD, describing how entities interact (e.g., a Student *enrolls in* a Course).15 A **relationship set** is a collection of similar relationships.5 In an ERD, a relationship set is represented by a **diamond** symbol, connecting the participating entity sets.7

* **Relationship Degree:** This refers to the number of entity sets participating in a relationship. The vast majority of relationships are **binary** (degree two). However, **unary** (or recursive) relationships, where an entity set relates to itself (e.g., an Employee *manages* other Employees), and **ternary** relationships (degree three) are also possible.14  
* **Roles:** In some relationships, particularly unary ones, the function of an entity is ambiguous. Roles are labels placed on the lines connecting an entity to a relationship to clarify its meaning. For example, in a Manages relationship on the Employee entity, the roles could be "Manager" and "Subordinate" to distinguish the two participants.5

### **The Hierarchy of Keys: Enforcing Uniqueness**

Keys are a special set of attributes used to uniquely identify entities and form the basis for relationships in a relational database. The concepts form a hierarchy of specificity.

* **Superkey:** A superkey is a set of one or more attributes that, when taken together, can uniquely identify a single entity within an entity set.18 For example, in a STUDENT entity set with attributes StudentID, SSN, and Name, the set {StudentID} is a superkey. The set {StudentID, Name} is also a superkey, as is {StudentID, SSN, Name}. The set of all attributes is always a trivial superkey.19  
* **Candidate Key:** A candidate key is a **minimal superkey**. This means it is a superkey from which no attribute can be removed without it losing its uniqueness property.14 In the STUDENT example, if both StudentID and SSN are unique, then {StudentID} and {SSN} are both candidate keys. The set {StudentID, Name} is a superkey but not a candidate key, because Name is redundant for ensuring uniqueness. An entity set can have multiple candidate keys.14  
* **Primary Key:** The primary key is the candidate key that is chosen by the database designer to be the main identifier for the entity set.9 This choice is often based on factors like stability, simplicity, and familiarity. The primary key must not contain null values and is conventionally **underlined** in an ERD.14  
* **Foreign Key:** A foreign key is an attribute or a set of attributes in one entity set that refers to the primary key of another (or the same) entity set.9 It is the mechanism that implements a relationship, acting as the logical "glue" that connects related data.14

### **Defining Business Rules with Structural Constraints**

The true power of the ER model lies in its ability to translate real-world business rules into precise, unambiguous structural constraints on the data model.20 A business rule such as, "Every employee must be assigned to exactly one department, but a department can exist without any employees," is not just a comment on a diagram; it is formally encoded using a combination of cardinality and participation constraints. This translation from natural language semantics to a formal graphical language is a core function of the ER model.

#### **Cardinality Ratios**

Cardinality ratios specify the maximum number of relationship instances in which an entity can participate.20 They define the maximum numerical correspondence between related entities.

* **One-to-One (1:1):** An instance of entity set A can be associated with at most one instance of entity set B, and an instance of B can be associated with at most one instance of A. Example: A Manager manages at most one Department, and a Department is managed by at most one Manager.22  
* **One-to-Many (1:N):** An instance of entity set A can be associated with zero or more instances of entity set B, but an instance of B can be associated with at most one instance of A. Example: One Department has many Employees, but each Employee works in only one Department.14  
* **Many-to-Many (M:N):** An instance of entity set A can be associated with zero or more instances of entity set B, and an instance of B can be associated with zero or more instances of A. Example: A Student can enroll in many Courses, and a Course can have many Students enrolled.14

#### **Participation Constraints**

Participation constraints specify whether an entity's existence is dependent on its participation in a relationship.20 This is also known as the minimum cardinality.

* **Total Participation (Mandatory):** Every entity in the set must participate in at least one relationship instance. For example, if every Employee must belong to a Department, the participation of Employee in the Works\_In relationship is total. This is represented by a **double line** from the entity set to the relationship diamond.7  
* **Partial Participation (Optional):** An entity in the set is not required to participate in a relationship instance. For example, if a Department can exist before any employees are assigned to it, the participation of Department in the Works\_In relationship is partial. This is represented by a **single line**.20

The combination of these constraints allows for a highly expressive model. For instance, the rule "Every employee must be assigned to exactly one department" is modeled by showing total participation for Employee and a cardinality of '1' on the Department side of the relationship.

| Component | Symbol | Description |
| :---- | :---- | :---- |
| **Strong Entity Set** | Rectangle | A collection of real-world objects with an independent existence. |
| **Weak Entity Set** | Double Rectangle | An entity set that depends on a strong entity for its existence and identity. |
| **Relationship Set** | Diamond | An association between two or more entity sets. |
| **Identifying Relationship** | Double Diamond | The relationship connecting a weak entity set to its owner. |
| **Attribute** | Oval | A property or characteristic of an entity or relationship. |
| **Key Attribute** | Oval with Underlined Text | An attribute that uniquely identifies an entity within its set (Primary Key). |
| **Multi-valued Attribute** | Double Oval | An attribute that can hold multiple values for a single entity. |
| **Derived Attribute** | Dashed Oval | An attribute whose value can be calculated from other attributes. |
| **Total Participation** | Double Line | Indicates that every entity in the set must participate in the relationship. |
| **Cardinality Ratios** | 1, N, M on lines | Specifies the maximum number of relationship instances per entity. |

## **Advanced Modeling with the Enhanced ER (EER) Model**

While the classic ER model is powerful, it lacks the constructs to represent more complex data semantics found in advanced applications like engineering design (CAD/CAM), telecommunications, or geographic information systems.23 The Enhanced Entity-Relationship (EER) model extends the original ER model with new concepts to handle these complexities with greater precision.23 These EER concepts, particularly specialization, generalization, and aggregation, show a convergence of database modeling principles with those of object-oriented programming, providing a richer language for describing data.25 This parallelism is crucial in modern software development, where an object-oriented application layer must interact seamlessly with a relational database. A well-designed EER model can lead to a database schema that maps more naturally to object-oriented code, simplifying the complex task of Object-Relational Mapping (ORM).

### **Weak Entity Sets**

A **weak entity set** is an entity that cannot be uniquely identified by its own attributes alone; its existence and identity are dependent on a relationship with another "owner" or "parent" entity, which is a strong entity.27

* **Characteristics:**  
  * **Existence Dependence:** A weak entity cannot exist without its owner. For example, an Invoice Line Item cannot exist without a corresponding Invoice.14  
  * **Identifying Relationship:** The relationship that connects a weak entity to its owner is called an identifying relationship. This relationship is always many-to-one from the weak entity to the strong entity, and the participation of the weak entity is always total.27  
  * **Partial Key (Discriminator):** A weak entity has a set of attributes called a partial key or discriminator that can distinguish among the weak entities that are related to the *same* owner entity.29 For example, for a Course\_Offering weak entity owned by a Course strong entity, the Section\_Number could be the partial key.  
  * **Primary Key:** The primary key of a weak entity set is a composite key formed by combining the primary key of its owner strong entity with the partial key of the weak entity itself.29 For Course\_Offering, the primary key would be {Course\_ID, Section\_Number}.  
* **Notation:** In an ERD, a weak entity set is represented by a **double-bordered rectangle**, and its identifying relationship is shown as a **double-bordered diamond**. The partial key is underlined with a **dashed line**.7

### **Modeling Hierarchies with Specialization and Generalization**

Specialization and generalization are powerful mechanisms for modeling "Is-A" relationships, creating a superclass/subclass hierarchy that is analogous to inheritance in object-oriented languages.23 A subclass entity inherits all the attributes and relationships of its superclass.23

* **Specialization (Top-Down Approach):** This is the process of defining subgroups or subclasses of a higher-level entity set (the superclass).25 These subclasses may have their own distinct attributes or participate in unique relationships not applicable to all members of the superclass.32 For example, the superclass EMPLOYEE can be specialized into subclasses SECRETARY (with attribute TypingSpeed) and ENGINEER (with attribute EngType).26  
* **Generalization (Bottom-Up Approach):** This is the inverse process of specialization.25 It involves identifying common characteristics among several entity sets and creating a shared, higher-level superclass that contains those common features.32 For example, the entity sets CAR and TRUCK could be generalized into a VEHICLE superclass that contains shared attributes like VehicleID and LicensePlateNo.26

#### **Constraints on Hierarchies**

To model these hierarchies accurately, the EER model includes two key constraints that are applied to the specialization/generalization relationship itself.25

* **Disjointness Constraint:** This specifies whether an instance of a superclass can be a member of one or more subclasses.  
  * **Disjoint (d):** An instance can be a member of at most *one* subclass. For example, an EMPLOYEE can be a SALARIED\_EMPLOYEE or an HOURLY\_EMPLOYEE, but not both. This is denoted with a 'd' inside the circle on the diagram.25  
  * **Overlapping (o):** An instance can be a member of *multiple* subclasses simultaneously. For example, a PERSON at a university could be both a STUDENT and an EMPLOYEE (e.g., a teaching assistant). This is denoted with an 'o' inside the circle.25  
* **Completeness Constraint:** This specifies whether an instance of a superclass must belong to a subclass.  
  * **Total Specialization:** Every instance in the superclass *must* be a member of at least one subclass. For example, if every VEHICLE must be either a CAR or a TRUCK, the specialization is total. This is represented by a **double line** connecting the superclass to the circle.25  
  * **Partial Specialization:** An instance in the superclass is *not required* to belong to any of the subclasses. For example, an EMPLOYEE might not be a SECRETARY, ENGINEER, or TECHNICIAN (e.g., they could be a MANAGER, which is not modeled as a subclass). This is represented by a **single line**.25

### **Modeling Complex Associations with Aggregation**

Aggregation is an abstraction concept used to model a relationship between entities and another relationship.24 It allows a relationship set and its participating entities to be treated as a single, higher-level entity set, which can then participate in other relationships.36

* **Purpose:** The primary purpose of aggregation is to resolve ambiguities that arise when a relationship itself needs to be the subject of another relationship. The standard ER model cannot represent relationships between relationships.37 Aggregation overcomes this limitation by "boxing up" a relationship into an abstract entity, thereby allowing other entities to form relationships with it.38  
* **Example:** Consider a scenario where an EMPLOYEE works on a PROJECT for a certain number of hours. This is represented by a Works\_On relationship. Now, suppose a MANAGER is assigned to supervise this specific work assignment (not just the employee or the project, but the combination of the two). To model this, the Works\_On relationship set is aggregated into a higher-level abstract entity. Then, a new Supervises relationship is created between this abstract entity and the MANAGER entity set.36 This accurately captures the semantic meaning that a manager supervises a specific employee's work on a specific project.

## **From Blueprint to Reality: Mapping the EER Model to a Relational Schema**

The final step in the logical design phase is the translation of the conceptual EER diagram into a relational schema—a set of definitions for tables, columns, and keys that can be implemented in a relational database.39 This is a crucial and systematic process that converts the graphical blueprint into a concrete implementation plan.40 While much of the mapping follows a standard algorithm, certain EER constructs, particularly specialization hierarchies, present the designer with important choices that involve trade-offs between data integrity, query performance, and storage efficiency.

### **Step-by-Step Mapping Algorithm**

The following algorithm provides a set of rules for converting EER constructs into relational tables.

#### **Step 1: Mapping Strong Entity Sets**

For each strong (or regular) entity set in the EER diagram, create a new table (relation).41

* The columns of the table correspond to the simple attributes of the entity set.  
* The primary key of the entity set becomes the primary key of the table.

#### **Step 2: Mapping Weak Entity Sets**

For each weak entity set, create a new table.40

* Include columns for all simple attributes of the weak entity.  
* Include the primary key of the owner strong entity as a set of columns in the new table. This set of columns will be a foreign key referencing the owner's table.  
* The primary key of the new table is a composite key consisting of the primary key from the owner entity and the partial key (discriminator) of the weak entity.43

#### **Step 3: Mapping Relationship Sets (by Cardinality)**

The mapping of a relationship set depends on its cardinality ratio.

* **Binary 1:1 Relationship:** Identify the two tables corresponding to the participating entities. Choose one of the tables (let's call it S) and add the primary key of the other table (T) to it as a foreign key. To minimize the use of null values, it is generally better to choose the table whose entity has *total participation* in the relationship to hold the foreign key.40 Any attributes of the relationship are also added as columns to table S.  
* **Binary 1:N Relationship:** Identify the tables for the participating entities. On the table corresponding to the entity on the "N" (many) side of the relationship, add the primary key of the table on the "1" (one) side as a foreign key.40 Any attributes of the relationship are also added as columns to the table on the "N" side.  
* **Binary M:N Relationship:** For each M:N relationship, create a new table (often called a junction, linking, or associative table) to represent the relationship itself.40  
  * This new table will contain foreign keys referencing the primary keys of the two participating entity tables.  
  * The primary key of this new junction table is a composite key formed by the combination of these two foreign keys.  
  * Any attributes on the M:N relationship become columns in this new table.14  
* **N-ary Relationship ():** Create a new table for the relationship. This table includes foreign keys that reference the primary keys of all n participating entity tables. The primary key of this new table is typically the composite of all these foreign keys.40

#### **Step 4: Mapping Attributes**

Special attribute types require specific handling.

* **Composite Attributes:** Do not create a column for the composite attribute itself. Instead, "flatten" the attribute by creating a separate column for each of its simple component attributes.46 For example, the composite attribute Name(FirstName, LastName) would be mapped to two columns: FirstName and LastName.  
* **Multi-valued Attributes:** For each multi-valued attribute, create a new table.40  
  * This table will have two main columns: one for the multi-valued attribute itself, and one for the primary key of the original entity (acting as a foreign key).  
  * The primary key of this new table is the combination of both of its columns.40

### **Strategies for Mapping Specialization/Generalization Hierarchies**

Mapping a superclass/subclass hierarchy is the most complex part of the process, as there is no single "best" method. The designer must choose a strategy based on the specific constraints of the hierarchy and the expected usage patterns of the application.46

The choice of mapping strategy represents a fundamental design trade-off. The different approaches balance the goals of normalization and data integrity against query performance and storage efficiency. For example, a highly normalized approach using multiple tables avoids data redundancy and null values, which is excellent for integrity. However, retrieving all information about a subclass instance requires performing a join operation, which can be computationally expensive. Conversely, using a single table for the entire hierarchy makes data retrieval for any instance extremely fast (no joins needed), but it can lead to tables with many null values, wasting storage space and complicating queries that use aggregate functions. Therefore, the optimal strategy is context-dependent; a system with high-performance read requirements might favor the single-table approach, whereas a system where data integrity is paramount would favor the multiple-table approach.

#### **Strategy A: Multiple Relations (ER Style)**

Create a separate table for the superclass and for each subclass.34

* **Superclass Table:** Contains the primary key and all shared attributes.  
* **Subclass Tables:** Each contains the primary key of the superclass (which serves as both the primary key and a foreign key for the subclass table) and only the specific attributes unique to that subclass.34  
* **Applicability:** This method works for any type of hierarchy (disjoint or overlapping, total or partial).42

#### **Strategy B: Multiple Relations (Subclass Relations Only)**

Create a separate table for each subclass only. The superclass itself does not get a table.48

* **Subclass Tables:** Each table includes all the attributes of the superclass (inherited) in addition to its own specific attributes. The primary key is the same as the superclass's key.  
* **Applicability:** This approach is only viable for **total** specializations, where every instance of the superclass must belong to one of the subclasses. If the specialization is partial, information about superclass instances that do not belong to any subclass would be lost.48 It can also lead to data redundancy if an instance belongs to overlapping subclasses.

#### **Strategy C: Single Relation with Nulls**

Create one single table to represent the entire hierarchy.46

* **Single Table:** This table includes columns for the primary key, all attributes of the superclass, and *all* attributes from *all* subclasses.  
* **Type Attribute:** A special column (a "discriminator" or "type" attribute) is added to indicate which subclass a given row belongs to.49  
* **Null Values:** For any given row, the columns corresponding to attributes of other subclasses will be filled with NULL values.46  
* **Applicability:** This approach is typically used for **disjoint** specializations to avoid complex logic for overlapping attributes. It can result in many null values if subclasses have many specific attributes.

| Strategy Name | Description | Pros (Advantages) | Cons (Disadvantages) | Best Use Case |
| :---- | :---- | :---- | :---- | :---- |
| **Multiple Relations (ER Style)** | One table for the superclass and one table for each subclass. Subclass tables link to the superclass via a shared primary/foreign key. | \- Highly normalized; no data redundancy. \- No wasted space on NULL values. \- Easy to add new subclasses. | \- Retrieving a complete subclass instance requires a JOIN operation, which can be slow. \- Information about one conceptual object is spread across multiple tables. | When data integrity and storage efficiency are paramount, and the database can handle the performance cost of joins. |
| **Single Relation with Nulls** | One table for the entire hierarchy, containing all attributes from the superclass and all subclasses. A "type" attribute distinguishes the subclass. | \- Very fast data retrieval; no JOINs are needed to get a complete instance. \- All information for an object is in one place. | \- Can waste significant storage space if subclasses have many specific attributes, leading to many NULL values. \- Can complicate queries (e.g., COUNT may behave unexpectedly with NULLs). \- Difficult to enforce NOT NULL constraints on subclass-specific attributes. | When read performance is the highest priority, the number of subclass-specific attributes is small, and subclasses are disjoint. |

## **Critical Perspectives and the Modern Data Landscape**

The Entity-Relationship model has been a foundational element of database design for decades. Its principles have shaped how generations of developers, architects, and administrators think about data. However, as technology evolves, it is essential to critically evaluate the model's strengths and weaknesses and understand its place within the broader landscape of modern data modeling, which now includes object-oriented paradigms and NoSQL databases.

### **Strengths and Limitations of the ER Model**

The enduring popularity of the ER model can be attributed to several key strengths.51

* **Strengths:**  
  * **Simplicity and Clarity:** The graphical nature of ERDs makes them an intuitive and straightforward way to visualize complex data relationships. This clarity makes them accessible to non-technical stakeholders, facilitating better communication and ensuring a shared understanding of the business domain.13  
  * **Effective Communication Tool:** ERDs serve as a common language between business users and technical teams, helping to bridge the gap between business requirements and database implementation.51  
  * **Supports Good Design:** The process of creating an ER model forces a systematic analysis of data requirements, which helps in designing a well-structured, normalized database that ensures data integrity and minimizes redundancy.51

Despite its strengths, the ER model is not without its limitations.51

* **Limitations:**  
  * **Complexity in Large Systems:** For very large and complex enterprise systems with hundreds of entities and relationships, ERDs can become convoluted and difficult to read and maintain.13  
  * **Focus on Structure, Not Behavior:** The ER model is excellent at describing the static structure of data but does not represent the behavior of the system or the flow of data through processes. It is a static model.52  
  * **Potential for Oversimplification:** The model may not be expressive enough to capture all complex business rules and constraints without extensions or additional documentation.51  
  * **Rigidity:** Once a detailed ER model is established, significant changes to business requirements can necessitate a substantial and time-consuming redesign.51

### **Comparative Analysis: ER vs. Other Modeling Paradigms**

The relevance of the ER model today is best understood by comparing it to other dominant modeling approaches.

#### **ER Model vs. UML Class Diagrams**

The Unified Modeling Language (UML) is a general-purpose modeling language for software engineering, and the Class Diagram is one of its most important components. While both ERDs and UML Class Diagrams can be used to model data structures, they originate from different paradigms and have different primary focuses.52

* **Focus:** ER diagrams are fundamentally **data-centric**. Their sole purpose is to model the entities, attributes, and relationships for a database, typically a relational one.52 UML Class Diagrams are **object-centric**. They are designed to model the static structure of an object-oriented system, which includes not only attributes (data) but also methods (behavior), inheritance, and other object-oriented concepts.53  
* **Scope:** ER modeling is a specialized technique for database design. UML is a much broader language intended to cover all aspects of software design, from requirements (Use Case Diagrams) to behavior (Sequence Diagrams) to structure (Class Diagrams).52 An ERD can be considered a subset of the capabilities offered by UML for data modeling.56  
* **Usage:** ERDs are the preferred tool for pure database design and data modeling tasks due to their specialized notation and clarity for that purpose. UML Class Diagrams are used when designing an entire object-oriented application, where the database is just one component of a larger system.53

#### **ER Model vs. NoSQL Data Modeling**

The rise of NoSQL databases, such as document databases like MongoDB, has introduced new data modeling paradigms that differ significantly from the relational model for which ERDs were designed.45 NoSQL databases are often schema-less and do not use tables or foreign keys in the traditional sense.45

Despite these differences, the conceptual process taught by ER modeling remains highly relevant. The fundamental task of identifying the core entities and relationships in a domain is a necessary first step, regardless of the target technology. The adaptation lies in the implementation of those concepts.45

* **Mapping Adaptation:**  
  * **Entities** in an ERD map to **Collections** in MongoDB.  
  * **Attributes** map to **Fields** within a JSON-like document.  
  * **Relationships** are not implemented with foreign keys but through two main strategies:  
    1. **Embedding (Denormalization):** If related data is frequently accessed together, it can be embedded as a sub-document or an array within a parent document. This corresponds to a one-to-one or one-to-many relationship where the "many" side is contained within the "one" side.45  
    2. **Referencing (Normalization):** If related data is large or accessed independently, one document can store a reference (like an ID) to another document in a separate collection. This is analogous to a traditional foreign key relationship.45

The critical decision in NoSQL data modeling—whether to embed or to reference—is driven by the same considerations of data access patterns and integrity that inform ER modeling. The intellectual discipline of analyzing a domain to identify its entities and relationships is a timeless and technology-agnostic skill. While the specific notations of an ERD are tied to the relational model, the thought process it instills is a foundational skill for any data professional. It remains one of the most effective pedagogical tools for teaching the fundamental principles of conceptual data modeling.

## **Chapter Summary and Key Terms**

This chapter has provided a comprehensive exploration of the database design process, from initial requirements gathering to the final mapping of a conceptual model to a relational schema.

* **The Importance of Design:** A structured design process is imperative for creating databases that are efficient, maintainable, and adaptable. The process follows a lifecycle of four main phases: **Requirements Analysis**, **Conceptual Design**, **Logical Design**, and **Physical Design**.  
* **Data Modeling Abstraction:** Data modeling is performed at three levels of abstraction. The **Conceptual model** provides a high-level business view. The **Logical model** adds platform-independent structural detail. The **Physical model** specifies the concrete, technology-dependent implementation.  
* **The Entity-Relationship (ER) Model:** The ER model, introduced by Peter Chen, is the standard for conceptual data modeling. Its core components are **Entities** (real-world objects), **Attributes** (their properties), and **Relationships** (the associations between them).  
* **Constraints and Keys:** The model uses **Keys** (Super, Candidate, Primary) to enforce uniqueness and **Structural Constraints** (Cardinality Ratios and Participation) to translate business rules into a formal data structure.  
* **The Enhanced ER (EER) Model:** The EER model extends the classic model with advanced concepts to handle greater complexity, including **Weak Entity Sets**, hierarchical relationships via **Specialization and Generalization**, and modeling relationships between relationships with **Aggregation**.  
* **Mapping to a Relational Schema:** A systematic algorithm exists to translate an EER diagram into a set of relational tables. This process involves specific rules for mapping entities, relationships of varying cardinalities, and special attribute types. Mapping specialization hierarchies presents a key design decision with trade-offs between normalization and performance.  
* **Modern Context:** While the ER model is designed for relational databases, the conceptual modeling skills it teaches are technology-agnostic and remain vital for designing systems with other technologies, including object-oriented applications (UML) and NoSQL databases.

### **Key Terms Glossary**

* **Aggregation:** An EER concept that treats a relationship set as a higher-level entity, allowing it to participate in other relationships.  
* **Attribute:** A property or characteristic of an entity or relationship.  
* **Candidate Key:** A minimal superkey; a set of attributes that uniquely identifies an entity and from which no attribute can be removed without losing uniqueness.  
* **Cardinality Ratio:** A constraint specifying the maximum number of relationship instances an entity can participate in (e.g., 1:1, 1:N, M:N).  
* **Conceptual Data Model:** A high-level, abstract data model that represents the business domain and is independent of any technology.  
* **Entity:** A distinguishable real-world object or concept about which data is stored.  
* **Entity-Relationship (ER) Model:** A high-level conceptual data model used to design and visualize the structure of a database.  
* **Foreign Key:** An attribute in one table that uniquely identifies a row of another table, used to establish a link between the data.  
* **Generalization:** An EER process of defining a more general entity type (a superclass) from a set of more specialized entity types (subclasses).  
* **Logical Data Model:** A detailed data model that describes the structure of the data (e.g., in tables and columns) but is independent of a specific DBMS.  
* **Normalization:** The process of organizing columns and tables in a relational database to minimize data redundancy.  
* **Participation Constraint:** A constraint specifying whether an entity's existence depends on its participation in a relationship (Total/Mandatory or Partial/Optional).  
* **Physical Data Model:** A data model that describes the database-specific implementation, including data types, indexes, and storage details.  
* **Primary Key:** The candidate key selected to be the unique identifier for an entity set.  
* **Relationship:** An association between two or more entities.  
* **Specialization:** An EER process of defining one or more subclasses of a superclass, where each subclass has attributes or relationships not shared by the entire superclass.  
* **Superkey:** A set of one or more attributes that, taken collectively, can uniquely identify an entity in an entity set.  
* **Weak Entity Set:** An entity set that does not have a primary key of its own and is dependent on a strong entity set for its existence and identity.

#### **Works cited**

1. Database Design Structure \- Schema Tutorial | Lucidchart, accessed October 12, 2025, [https://www.lucidchart.com/pages/tutorial/database-design-and-structure](https://www.lucidchart.com/pages/tutorial/database-design-and-structure)  
2. How to Design a Database in 3 Easy Steps: Conceptual, Logical and Physical Modeling, accessed October 12, 2025, [https://medium.com/@Samietex/how-to-design-a-database-in-3-easy-steps-conceptual-logical-and-physical-modeling-3bd2a789de04](https://medium.com/@Samietex/how-to-design-a-database-in-3-easy-steps-conceptual-logical-and-physical-modeling-3bd2a789de04)  
3. The Differences Between Conceptual, Logical, & Physical Data ..., accessed October 12, 2025, [https://www.couchbase.com/blog/conceptual-physical-logical-data-models/](https://www.couchbase.com/blog/conceptual-physical-logical-data-models/)  
4. How To Design Database ? | Database Design Process Explained \- Learn Computer Science, accessed October 12, 2025, [https://www.learncomputerscienceonline.com/how-to-design-database/](https://www.learncomputerscienceonline.com/how-to-design-database/)  
5. Entity–relationship model \- Wikipedia, accessed October 12, 2025, [https://en.wikipedia.org/wiki/Entity%E2%80%93relationship\_model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)  
6. Database design basics \- Microsoft Support, accessed October 12, 2025, [https://support.microsoft.com/en-us/office/database-design-basics-eb2159cf-1e30-401a-8084-bd4f9c9ca1f5](https://support.microsoft.com/en-us/office/database-design-basics-eb2159cf-1e30-401a-8084-bd4f9c9ca1f5)  
7. ER Diagram in DBMS An Entity–relationship model (ER model ..., accessed October 12, 2025, [https://www.du.ac.in/du/uploads/departments/Operational%20Research/24042020\_E-R%20Model.pdf](https://www.du.ac.in/du/uploads/departments/Operational%20Research/24042020_E-R%20Model.pdf)  
8. Data Models in DBMS \- GeeksforGeeks, accessed October 12, 2025, [https://www.geeksforgeeks.org/dbms/data-models-in-dbms/](https://www.geeksforgeeks.org/dbms/data-models-in-dbms/)  
9. Conceptual vs Logical vs Physical Data Model \- Visual Paradigm Online, accessed October 12, 2025, [https://online.visual-paradigm.com/knowledge/visual-modeling/conceptual-vs-logical-vs-physical-data-model](https://online.visual-paradigm.com/knowledge/visual-modeling/conceptual-vs-logical-vs-physical-data-model)  
10. Logical vs Physical Data Model \- Difference in Data Modeling \- AWS, accessed October 12, 2025, [https://aws.amazon.com/compare/the-difference-between-logical-and-physical-data-model/](https://aws.amazon.com/compare/the-difference-between-logical-and-physical-data-model/)  
11. Entity Relationship Diagrams – Tim Weninger, PhD, accessed October 12, 2025, [https://timweninger.com/teaching/database-systems-concepts/entity-relationship-diagrams/](https://timweninger.com/teaching/database-systems-concepts/entity-relationship-diagrams/)  
12. liambx.com, accessed October 12, 2025, [https://liambx.com/blog/er-diagrams-history-future-database-modeling\#:\~:text=Back%20in%201976%2C%20Peter%20Chen,and%20actually%20walking%20the%20terrain.](https://liambx.com/blog/er-diagrams-history-future-database-modeling#:~:text=Back%20in%201976%2C%20Peter%20Chen,and%20actually%20walking%20the%20terrain.)  
13. Entity-Relationship Model \- Dremio, accessed October 12, 2025, [https://www.dremio.com/wiki/entity-relationship-model/](https://www.dremio.com/wiki/entity-relationship-model/)  
14. Chapter 8 The Entity Relationship Data Model – Database Design – 2nd Edition, accessed October 12, 2025, [https://uen.pressbooks.pub/dbdesign01/chapter/chapter-8-entity-relationship-model/](https://uen.pressbooks.pub/dbdesign01/chapter/chapter-8-entity-relationship-model/)  
15. What are the building blocks of ER- model? \- Krayonnz, accessed October 12, 2025, [https://www.krayonnz.com/user/doubts/detail/61a5e5e92126bb00404e7d28/what-are-the-building-blocks-of-ER-model](https://www.krayonnz.com/user/doubts/detail/61a5e5e92126bb00404e7d28/what-are-the-building-blocks-of-ER-model)  
16. 2.2. ERD Basic Components — Database \- OpenDSA, accessed October 12, 2025, [https://opendsa.cs.vt.edu/ODSA/Books/Database/html/ERDComponents.html](https://opendsa.cs.vt.edu/ODSA/Books/Database/html/ERDComponents.html)  
17. Chapter 8 The Entity Relationship Data Model – Database Design ..., accessed October 12, 2025, [https://opentextbc.ca/dbdesign01/chapter/chapter-8-entity-relationship-model/](https://opentextbc.ca/dbdesign01/chapter/chapter-8-entity-relationship-model/)  
18. chat2db.ai, accessed October 12, 2025, [https://chat2db.ai/resources/blog/what-is-super-key-in-dbms\#:\~:text=Super%20keys%20are%20fundamental%20building,a%20row%20in%20a%20table.](https://chat2db.ai/resources/blog/what-is-super-key-in-dbms#:~:text=Super%20keys%20are%20fundamental%20building,a%20row%20in%20a%20table.)  
19. Superkey \- Wikipedia, accessed October 12, 2025, [https://en.wikipedia.org/wiki/Superkey](https://en.wikipedia.org/wiki/Superkey)  
20. Structural Constraints of Relationships in ER Model \- GeeksforGeeks, accessed October 12, 2025, [https://www.geeksforgeeks.org/dbms/structural-constraints-of-relationships-in-er-model/](https://www.geeksforgeeks.org/dbms/structural-constraints-of-relationships-in-er-model/)  
21. A Comparative Analysis of Entity-Relationship Diagrams1 \- CIn UFPE, accessed October 12, 2025, [https://www.cin.ufpe.br/\~in1008/aulas/A%20Comparative%20Analysis%20of%20Entity-Relationship%20Diagrams.pdf](https://www.cin.ufpe.br/~in1008/aulas/A%20Comparative%20Analysis%20of%20Entity-Relationship%20Diagrams.pdf)  
22. The Entity-Relationship (ER) Model \- GMU CS Department, accessed October 12, 2025, [https://cs.gmu.edu/\~jessica/cs450\_s12/cs450\_ER1.pdf](https://cs.gmu.edu/~jessica/cs450_s12/cs450_ER1.pdf)  
23. Enhanced entity–relationship model \- Wikipedia, accessed October 12, 2025, [https://en.wikipedia.org/wiki/Enhanced\_entity%E2%80%93relationship\_model](https://en.wikipedia.org/wiki/Enhanced_entity%E2%80%93relationship_model)  
24. Enhanced ER Model \- GeeksforGeeks, accessed October 12, 2025, [https://www.geeksforgeeks.org/dbms/enhanced-er-model/](https://www.geeksforgeeks.org/dbms/enhanced-er-model/)  
25. Enhanced ER Diagram Tutorial | Lucidchart, accessed October 12, 2025, [https://www.lucidchart.com/pages/enhanced-entity-relationship-diagram](https://www.lucidchart.com/pages/enhanced-entity-relationship-diagram)  
26. DBMS \- Enhanced ER (EER) Model \- Tutorials Point, accessed October 12, 2025, [https://www.tutorialspoint.com/dbms/dbms\_enhanced\_er\_model.htm](https://www.tutorialspoint.com/dbms/dbms_enhanced_er_model.htm)  
27. Special Relationships in ER Diagrams – Tim Weninger, PhD, accessed October 12, 2025, [https://timweninger.com/teaching/database-systems-concepts/special-relationships-in-er-diagrams/](https://timweninger.com/teaching/database-systems-concepts/special-relationships-in-er-diagrams/)  
28. How to represent a weak entity in ER diagram \- Gleek.io, accessed October 12, 2025, [https://www.gleek.io/blog/weak-entity-erd](https://www.gleek.io/blog/weak-entity-erd)  
29. Weak Entity Sets \- IUS, accessed October 12, 2025, [https://www.ius.edu.ba/sites/default/files/users/files/user765/ch06\_0.pdf](https://www.ius.edu.ba/sites/default/files/users/files/user765/ch06_0.pdf)  
30. Entity-Relationship Model \- Weak Entity Sets | Database Tutorial 3e \- YouTube, accessed October 12, 2025, [https://www.youtube.com/watch?v=wEKL\_z2kwLY](https://www.youtube.com/watch?v=wEKL_z2kwLY)  
31. What Is a Weak Entity and How Do I Denote It in an ER Diagram? | Vertabelo Database Modeler, accessed October 12, 2025, [https://vertabelo.com/blog/weak-entity-example/](https://vertabelo.com/blog/weak-entity-example/)  
32. www.cs.uct.ac.za, accessed October 12, 2025, [https://www.cs.uct.ac.za/mit\_notes/database/htmls/chp07.html\#:\~:text=Specialization%3A%20A%20means%20of%20identifying,features%20(bottom%2Dup).](https://www.cs.uct.ac.za/mit_notes/database/htmls/chp07.html#:~:text=Specialization%3A%20A%20means%20of%20identifying,features%20\(bottom%2Dup\).)  
33. Specialization and Generalization in Extended ER Model \- Tutorials Point, accessed October 12, 2025, [https://www.tutorialspoint.com/dbms/specialization\_and\_generalization\_in\_extended\_er\_model.htm](https://www.tutorialspoint.com/dbms/specialization_and_generalization_in_extended_er_model.htm)  
34. Mapping Generalizations and Specializations and Categories to Relational Databases \- CIn UFPE, accessed October 12, 2025, [https://www.cin.ufpe.br/\~in1008/aulas/Artigo%20sobre%20mapeamento%20de%20heranca%20e%20categoria%20para%20BDR.pdf](https://www.cin.ufpe.br/~in1008/aulas/Artigo%20sobre%20mapeamento%20de%20heranca%20e%20categoria%20para%20BDR.pdf)  
35. www.geeksforgeeks.org, accessed October 12, 2025, [https://www.geeksforgeeks.org/dbms/enhanced-er-model/\#:\~:text=Aggregation%3A%20EER%20model%20allows%20for,for%20a%20single%20entity%20instance.](https://www.geeksforgeeks.org/dbms/enhanced-er-model/#:~:text=Aggregation%3A%20EER%20model%20allows%20for,for%20a%20single%20entity%20instance.)  
36. Extended Entity-Relationship (EE-R) Model \- Tutorials Point, accessed October 12, 2025, [https://www.tutorialspoint.com/extended-entity-relationship-ee-r-model](https://www.tutorialspoint.com/extended-entity-relationship-ee-r-model)  
37. EER (enhanced entity relationship) diagram/model simply explained \- Database management 101 \- YouTube, accessed October 12, 2025, [https://www.youtube.com/watch?v=5TDaweCA4Wg](https://www.youtube.com/watch?v=5TDaweCA4Wg)  
38. Entity-Relationship Model \- Aggregation | Database Tutorial 3g \- YouTube, accessed October 12, 2025, [https://www.youtube.com/watch?v=rXxi4d\_aRtM](https://www.youtube.com/watch?v=rXxi4d_aRtM)  
39. Mapping an E-R Diagram to a Relational DBMS | Open Textbooks for Hong Kong, accessed October 12, 2025, [https://www.opentextbooks.org.hk/ditatopic/25280](https://www.opentextbooks.org.hk/ditatopic/25280)  
40. Mapping an ERD to a Relational Database – Relational Databases ..., accessed October 12, 2025, [https://pressbooks.pub/cmiller1137/chapter/implementing-entity-relationship-diagrams/](https://pressbooks.pub/cmiller1137/chapter/implementing-entity-relationship-diagrams/)  
41. Converting E-R Diagrams to Relational Model, accessed October 12, 2025, [https://users.cms.caltech.edu/\~donnie/dbcourse/intro0607/lectures/Lecture17.pdf](https://users.cms.caltech.edu/~donnie/dbcourse/intro0607/lectures/Lecture17.pdf)  
42. ER & EER to Relational Mapping \- TINMAN, accessed October 12, 2025, [https://tinman.cs.gsu.edu/\~raj/4710/sp03/ch9-part1.pdf](https://tinman.cs.gsu.edu/~raj/4710/sp03/ch9-part1.pdf)  
43. Slide 7- 1 \- CS@Purdue, accessed October 12, 2025, [https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf](https://www.cs.purdue.edu/homes/bb/CS348-F13/slides/ch07-Relational%20Database%20Design%20by%20ER-%20and%20EERR-to-Relational%20Mapping.pdf)  
44. Mapping an ERD to a Relational Database \- OER at Harper College, accessed October 12, 2025, [https://harpercollege.pressbooks.pub/relationaldatabases/chapter/implementing-entity-relationship-diagrams/](https://harpercollege.pressbooks.pub/relationaldatabases/chapter/implementing-entity-relationship-diagrams/)  
45. Equivalent of ERD for MongoDB \- GeeksforGeeks, accessed October 12, 2025, [https://www.geeksforgeeks.org/mongodb/equivalent-of-erd-for-mongodb/](https://www.geeksforgeeks.org/mongodb/equivalent-of-erd-for-mongodb/)  
46. ER→Relational Mapping \- CSE CGI Server, accessed October 12, 2025, [https://cgi.cse.unsw.edu.au/\~cs3311/22T3/content/er-rel-mapping/slides.html](https://cgi.cse.unsw.edu.au/~cs3311/22T3/content/er-rel-mapping/slides.html)  
47. 2.3. Converting ERD to a relational model — A Practical Introduction ..., accessed October 12, 2025, [https://runestone.academy/ns/books/published/practical\_db/PART2\_DATA\_MODELING/03-ERD-to-relational/ERD-to-relational.html](https://runestone.academy/ns/books/published/practical_db/PART2_DATA_MODELING/03-ERD-to-relational/ERD-to-relational.html)  
48. Mapping EER Model Constructs to Relations in Your Database | Bill ..., accessed October 12, 2025, [https://www.billbrown.info/post/options-for-mapping-eer-model-constructs-to-relations/](https://www.billbrown.info/post/options-for-mapping-eer-model-constructs-to-relations/)  
49. Mapping EER to Relational Follow a seven-step algorithm to convert the basic ER model constructs into relations … steps, accessed October 12, 2025, [https://courses.acs.uwinnipeg.ca/3902-001/EER%20to%20Relational.pdf](https://courses.acs.uwinnipeg.ca/3902-001/EER%20to%20Relational.pdf)  
50. Mapping specialization in EER \- Medium, accessed October 12, 2025, [https://medium.com/@ushanloshitha/mapping-specialization-in-eer-1a9fe3655833](https://medium.com/@ushanloshitha/mapping-specialization-in-eer-1a9fe3655833)  
51. Advantages and Disadvantages of an ER-Model \- EssayCorp, accessed October 12, 2025, [https://www.essaycorp.com/blog/advantages-and-disadvantages-of-an-er-model](https://www.essaycorp.com/blog/advantages-and-disadvantages-of-an-er-model)  
52. Difference between UML and ER diagram \- GeeksforGeeks, accessed October 12, 2025, [https://www.geeksforgeeks.org/dbms/difference-between-uml-and-er-diagram/](https://www.geeksforgeeks.org/dbms/difference-between-uml-and-er-diagram/)  
53. Class Diagram vs. Entity-Relationship Diagram (ERD): A ..., accessed October 12, 2025, [https://guides.visual-paradigm.com/class-diagram-vs-entity-relationship-diagram-erd-a-comparative-guide/](https://guides.visual-paradigm.com/class-diagram-vs-entity-relationship-diagram-erd-a-comparative-guide/)  
54. UML Deployment Diagrams Versus Entity-Relationship Diagrams \- LaunchDarkly, accessed October 12, 2025, [https://launchdarkly.com/blog/uml-deployment-diagrams-versus-entity-relationship/](https://launchdarkly.com/blog/uml-deployment-diagrams-versus-entity-relationship/)  
55. UML vs. ER diagrams: A detailed comparison | Gleek | Gleek, accessed October 12, 2025, [https://www.gleek.io/blog/uml-vs-erd](https://www.gleek.io/blog/uml-vs-erd)  
56. UML vs ER Diagrams : r/businessanalysis \- Reddit, accessed October 12, 2025, [https://www.reddit.com/r/businessanalysis/comments/756tpa/uml\_vs\_er\_diagrams/](https://www.reddit.com/r/businessanalysis/comments/756tpa/uml_vs_er_diagrams/)

# **Tab 2**

Perfect — we have everything needed.

Below is a **textbook chapter draft** integrating **Chapters 4 and 5 of Kroenke’s Database Concepts (10e)** with pedagogical commentary, examples, and contextual explanations suitable for your BITM 330 course.

---

# **Chapter X: From Data Models to Database Design**

## **1\. Introduction**

Designing a database is the process of transforming abstract business requirements into a structured, relational data model that can be implemented in a database management system (DBMS).  
 This chapter introduces the complete life cycle of data modeling and database design—from conceptual thinking using **Entity-Relationship (E-R) models** to **logical relational structures** that define how data is stored, connected, and maintained.

Students will learn how to:

* Build and interpret **E-R models**

* Represent entities, attributes, and relationships

* Apply **normalization** to remove redundancy

* Understand **weak entities**, **subtypes**, and **recursive relationships**

* Translate conceptual models into **relational database designs**

---

## **2\. Systems Analysis and the Role of the Data Model**

Every information system begins with **analysis**—understanding what information the business needs and how that information flows through processes.  
 This process is formalized through the **Systems Development Life Cycle (SDLC)**:

1. **System Definition** – Define goals, scope, and feasibility.

2. **Requirements Analysis** – Gather information through interviews, forms, reports, and business rules.

3. **Component Design** – Create specifications for hardware, software, and **database design**.

4. **Implementation** – Build, test, and deploy the system.

5. **Maintenance** – Monitor, refine, and enhance as needed.

The **database design phase** focuses on data: what should be stored, how it relates, and how users access it.

---

## **3\. Data Modeling and the Entity-Relationship Model**

### **3.1. Entities and Attributes**

* **Entity:** Something users want to track (e.g., Student, Course, Deliverable).

* **Entity Class:** The collection of all entities of one type.

* **Entity Instance:** A single occurrence (e.g., Student 2001).

* **Attributes:** Descriptive fields of entities (Name, GPA, Phone).

* **Identifiers:** Unique attributes (StudentID, InvoiceNumber).

Entities are shown as **rectangles**, and attributes are listed inside or connected by ovals.

### **3.2. Relationships**

Entities associate with others through **relationships**:

* **1:1 (One-to-One)** – Each instance relates to one other instance.

* **1:N (One-to-Many)** – One parent relates to multiple children.

* **N:M (Many-to-Many)** – Multiple instances of each relate to each other.

The **degree** of a relationship refers to how many entity classes are involved (binary \= 2, ternary \= 3).

---

## **4\. Cardinality and Crow’s Foot Notation**

**Cardinality** defines how many instances of one entity relate to another:

* **Maximum cardinality:** 1 or many (shown as a line or crow’s foot).

* **Minimum cardinality:** 0 or 1 (shown as a circle or dash).

For example:  
 A `Student` can enroll in many `Classes`, but each enrollment belongs to **exactly one** student.

Crow’s Foot notation is the modern standard:

* **|—** means one and only one

* **O—** means zero or one

* **\<—** means many

---

## **5\. Weak, Strong, and Associative Entities**

* **Strong Entity:** Exists independently (e.g., Customer).

* **Weak Entity:** Depends on another for existence (e.g., OrderLine needs Order).

* **ID-Dependent Weak Entity:** Primary key includes the parent’s key.

* **Associative (Intersection) Entity:** Used to represent **N:M** relationships with attributes of its own (e.g., Enrollment links Student and Course with a Grade field).

---

## **6\. Subtypes, Supertypes, and Recursive Relationships**

* **Subtype:** A special case of a supertype (e.g., Vehicle → Car, Truck).

* **Discriminator:** An attribute that determines the subtype.

* **Recursive Relationship:** An entity related to itself (e.g., Employee supervises Employee).

---

## **7\. From Data Models to Database Design**

### **7.1. The Three Levels of Design**

1. **Conceptual Design:** Abstract model (E-R diagrams).

2. **Logical Design:** Relational schema—tables, keys, relationships.

3. **Physical Design:** Implementation details—data types, indexes, constraints.

---

## **8\. Transforming the E-R Model into a Relational Design**

### **Step 1\. Create a Table for Each Entity**

Each entity becomes a **table**; attributes become **columns**.

Example:

CREATE TABLE Student (  
  StudentID INT PRIMARY KEY,  
  StudentName VARCHAR(50),  
  Major VARCHAR(30)  
);

### **Step 2\. Add Keys and Relationships**

* **Primary Key (PK):** Uniquely identifies each record.

* **Foreign Key (FK):** Links related tables.

**1:N Relationship:**  
 The PK from the **1-side** is added as an FK in the **N-side**.

**N:M Relationship:**  
 Create a **new intersection table** combining both keys.

### **Step 3\. Specify Column Properties**

Each column has:

* Data type (`INT`, `DATE`, `VARCHAR`)

* Constraints (`NOT NULL`, `DEFAULT`)

* Referential integrity rules (e.g., `ON DELETE CASCADE`)

---

## **9\. Normalization and Denormalization**

### **9.1. The Normalization Process**

Normalization removes redundancy and update anomalies by splitting data into logical tables.  
 Common forms include:

* **1NF:** Each cell holds one value.

* **2NF:** All non-key attributes depend on the whole key.

* **3NF:** No transitive dependencies.

* **BCNF:** Advanced rule to ensure all determinants are candidate keys.

### **9.2. When to Denormalize**

Denormalization combines tables for **performance** or **simplicity** when:

* Queries require excessive joins.

* Performance outweighs design purity.

---

## **10\. Representing Relationships in Practice**

| Relationship Type | Technique in Relational Model |
| ----- | ----- |
| 1:1 | Place PK of either table as FK in the other |
| 1:N | Place PK of parent in child table |
| N:M | Create intersection table with both PKs |
| Recursive | Use FK referencing same table |

---

## **11\. Practical Example – Honoria Sanchez Designs**

The Honoria Sanchez case demonstrates a full transformation from E-R model to relational design.

### **Entities:**

* Customer

* Contact

* Invoice

* LineItem

* Product

* Seminar

Each table specifies:

* **Primary Key** (e.g., `CustomerID`)

* **Foreign Keys** (e.g., `InvoiceNumber` in LineItem)

* **Data types** (`CHAR(25)`, `NUMERIC(9,2)`)

* **Constraints** (required, default values)

Relationships:

* `Customer` → `Contact` (1:N)

* `Invoice` → `LineItem` (1:N)

* `Product` → `LineItem` (1:N)

* `Customer` → `Invoice` (1:N)

---

## **12\. Database Implementation and Integrity**

Referential integrity ensures consistency across relationships:

* Foreign keys must match existing primary keys.

* Deleting a parent record cascades or restricts child deletions.

* Surrogate keys (like auto-increment IDs) simplify joins and indexing.

---

## **13\. Review Questions**

1. What is the difference between an entity class and an entity instance?

2. How is an N:M relationship represented in the relational model?

3. Why would you use denormalization?

4. What is an associative entity, and how is it different from a weak entity?

5. Explain the use of surrogate keys and their practical benefits.

---

## **14\. Summary**

Database design is both a science and an art. It requires:

* Logical thinking to build relationships and keys

* Understanding of normalization to ensure data integrity

* Pragmatic judgment to balance complexity and performance

From **E-R diagrams** to **SQL tables**, the process ensures that data is not only stored but also meaningful, efficient, and ready to support business decision-making.

---

Would you like me to include:

* The **Honoria Sanchez database schema tables** (with full column metadata from the slides)

* Or rewrite this as a **formatted Markdown EPUB-ready textbook chapter**?

# **Tab 3**

# **Chapter 4: Database Design and Modeling with Entity-Relationship Diagrams**

## **Learning Objectives**

* Understand the importance of database design in information systems  
* Learn the stages of database development and their relationship to SDLC  
* Master Entity-Relationship Diagram (ERD) notation and creation techniques  
* Apply normalization principles to eliminate data redundancy  
* Transform E-R models into relational database designs  
* Understand weak entities, subtype entities, and recursive relationships  
* Create and validate complete database designs using real-world examples

## **4.1 Introduction to Database Design and Information Systems**

Database design is the process of producing a detailed data model of a database that specifies data structures, relationships, constraints, and access methods. As defined in the Kroenke textbook, data represents recorded facts and numbers, while information is knowledge derived from data presented in a meaningful context.

An information system consists of five key components that work together to transform data into valuable information:

* Hardware \- Physical computing equipment  
* Software \- Programs and applications  
* Data \- Facts and information stored in the system  
* Procedures \- Instructions for using the system  
* People \- Users and technical staff

*"Well-designed databases are like well-organized libraries: information is easy to find, update, and expand while maintaining accuracy and consistency."*

## **4.2 Database Development Lifecycle and Systems Development**

The database development process is a crucial subset of the Systems Development Life Cycle (SDLC), which consists of five primary phases:

### **4.2.1 System Definition Phase**

* Define information system project goals and scope  
* Assess project feasibility (cost, schedule, technical, organizational)  
* Form project team and create detailed project plan  
* *Deliverable: Project Plan*

### **4.2.2 Requirements Analysis Phase**

* Conduct user interviews and evaluate existing systems  
* Determine needed forms, reports, and queries  
* Identify application features and functions  
* Document business rules and security requirements  
* *Deliverable: Approved User Requirements*

### **4.2.3 Component Design Phase**

* Determine hardware and software specifications  
* Create the database design (primary focus of this chapter)  
* Design business procedures and job descriptions  
* *Deliverable: Documented System Design*

### **4.2.4 Implementation Phase**

* Build system components and conduct testing  
* Create database and populate with data  
* Convert to new system and train personnel  
* *Deliverable: Installed and Functioning Information System*

### **4.2.5 System Maintenance Phase**

* Update system with patches and new releases  
* Record and prioritize change requests  
* *Deliverable: Updated System*

Key Insight: "During the implementation phase of developing a database system, the database is constructed, but the data model is transformed into a database design during the component design phase." (Kroenke, Chapter 4\)

## **4.3 Conceptual Design with Entity-Relationship Diagrams (ERD)**

### **4.3.1 Basic ERD Components**

Entities are objects or concepts about which data is stored. As defined in Kroenke:

* Entity Class: A collection of all entities of a given type (e.g., EMPLOYEE)  
* Entity Instance: A particular occurrence of an entity (e.g., Employee \#12345)

Attributes are properties or characteristics of entities that describe the entity's characteristics. Examples include EmployeeName, DateOfHire, and JobSkillCode.

Identifiers are attributes that name or identify entity instances:

* Unique identifiers identify one, and only one, entity instance  
* Nonunique identifiers identify a set of instances  
* Composite identifiers are composed of two or more attributes

### **4.3.2 Relationships and Cardinality**

Relationships represent associations between entities. The number of entity classes in a relationship is known as the degree:

* Binary relationships (degree 2\) involve two entity classes  
* Ternary relationships (degree 3\) involve three entity classes

Cardinality defines the numerical relationship between entities:

Maximum Cardinality \- The maximum number of entity instances that may participate in a relationship:

* One-to-One (1:1) \- One instance of Entity A relates to one instance of Entity B  
* One-to-Many (1:N) \- One instance of Entity A relates to many instances of Entity B  
* Many-to-Many (M:N) \- Many instances of Entity A relate to many instances of Entity B

Minimum Cardinality \- The minimum number of entity instances that must participate in a relationship:

* Optional (minimum of 0\) \- Participation is not required  
* Mandatory (minimum of 1\) \- Participation is required

### **4.3.3 ERD Notation Systems**

Traditional E-R Notation:

* Entities: Rectangles  
* Relationships: Diamonds  
* Maximum cardinality: Shown inside the diamond  
* Minimum cardinality: Shown by ovals (optional) or hash marks (mandatory)

Crow's Foot Notation (Information Engineering Model):

* Entities: Rectangles  
* Relationships: Lines with specific symbols  
* Maximum cardinality: Crow's foot (many) or single line (one)  
* Minimum cardinality: Circle (optional) or hash mark (mandatory)

text

Crow's Foot Symbol Guide:

|------|    Mandatory \- One (Exactly one)

|\>\>----|    Mandatory \- Many (One or more)

|0----|    Optional \- One (Zero or one)

|0\>\>----|    Optional \- Many (Zero or more)

### **4.3.4 Example: University Database ERD**

text

\[STUDENT\] \------\>|\< \-------- |ENROLLMENT| \-------- \>| \------\> \[COURSE\]

     |1                           |\*                     |1

     |                            |                      |

\[StudentID\]              \[EnrollmentDate\]         \[CourseID\]

\[FirstName\]              \[Grade\]                  \[CourseName\]

\[LastName\]                                          \[Credits\]

\[Email\]

Relationship Analysis:

* Each Student can enroll in many Courses (1:N relationship through ENROLLMENT)  
* Each Course can have many enrolled Students  
* ENROLLMENT is an associative entity with additional attributes like Grade and EnrollmentDate  
* Minimum cardinality: A Student must exist for an Enrollment (mandatory), but a Course might exist without enrollments (optional)

## **4.4 Advanced E-R Modeling Concepts**

### **4.4.1 Weak Entities**

A weak entity is an entity that cannot exist in the database without the existence of another entity. Any entity that is not weak is called a strong entity.

ID-Dependent Weak Entities:

* Cannot exist without their parent entity  
* Have a composite identifier containing the parent's key  
* Example: APARTMENT entity with composite key (BuildingName, ApartmentNumber)

Non-ID-Dependent Weak Entities:

* Logically depend on another entity but have their own identifier  
* Example: PRESCRIPTION depends on PATIENT but has its own PrescriptionID

Key Distinction: "An ID-dependent entity is an entity in which the identifier of the entity includes the identifier of another entity." (Kroenke, Chapter 4\)

### **4.4.2 Associative Entities**

An associative entity (also called an association entity) is used when a pure N:M relationship cannot properly hold attributes that describe aspects of the relationship between two entities.

Example Transformation:

text

Original N:M Relationship:

\[EMPLOYEE\] \----- N:M \----- \[PROJECT\]

With Associative Entity:

\[EMPLOYEE\] \----- 1:N \----- \[ASSIGNMENT\] \----- N:1 \----- \[PROJECT\]

                                |

                          \[HoursWorked\]

                          \[StartDate\]

                          \[Role\]

### **4.4.3 Subtype Entities**

A subtype entity is a special case of another entity called a supertype. An attribute of the supertype called a discriminator indicates which subtype is appropriate.

Subtype Characteristics:

* Exclusive subtypes: Supertype relates to at most one subtype  
* Inclusive subtypes: Supertype can relate to one or more subtypes  
* All subtypes inherit the supertype's identifier

Example:

text

\[STUDENT\] (supertype)

   |

isGradStudent (discriminator)

   |

   |------ \[UNDERGRADUATE\] (subtype)

   |       \[HighSchoolGPA\]

   |       \[ScoreOnSAT\]

   |

   |------ \[GRADUATE\] (subtype)

           \[UndergraduateGPA\]

           \[ScoreOnGMAT\]

### **4.4.4 Recursive Relationships**

A recursive relationship occurs when an entity has a relationship with itself. These can be 1:1, 1:N, or N:M relationships.

Examples:

* 1:1: PERSON sponsors another PERSON  
* 1:N: EMPLOYEE manages other EMPLOYEES  
* N:M: DOCTOR treats other DOCTORS as patients

## **4.5 Logical Design: Transforming E-R Models to Relational Database Design**

### **4.5.1 The Database Design Process**

A database design is a set of database specifications that can actually be implemented as a database in a DBMS. The transformation process follows these key steps:

1. Create tables for each entity  
   * Specify primary keys (consider surrogate keys)  
   * Define column properties (data type, null status, default values)  
   * Specify data constraints  
2. Create relationships using foreign keys  
   * Represent strong entity relationships (1:1, 1:N, N:M)  
   * Handle ID-dependent and non-ID-dependent weak entities  
   * Represent subtypes and recursive relationships  
3. Verify normalization and consider denormalization if needed

### **4.5.2 Representing Entities as Tables**

Basic Rules:

* Each entity becomes a table  
* Entity attributes become table columns  
* Entity identifier becomes the primary key  
* Evaluate each table against normalization criteria

Example Transformation:

text

ENTITY: ITEM

Attributes: ItemNumber, Description, Cost, ListPrice, QuantityOnHand

BECOMES TABLE: ITEM

Columns: ItemNumber (PK), Description, Cost, ListPrice, QuantityOnHand

### **4.5.3 Representing Relationships**

1:1 Relationships:

* Place the key of either table in the other table as a foreign key  
* Choice depends on business rules and query patterns

1:N Relationships:

* Place the key of the parent table (1 side) into the child table (N side) as a foreign key  
* "The term 'parent' refers to the table on the one side of a 1:N relationship, and the term 'child' refers to the table on the many side." (Kroenke, Chapter 5\)

N:M Relationships:

* Create an intersection table with a composite key  
* The intersection table contains foreign keys from both parent tables  
* Add any relationship attributes to the intersection table

### **4.5.4 Example: Relationship Transformations**

1:1 Relationship Example:

sql

*\-- Option A: Foreign key in EMPLOYEE*

EMPLOYEE (EmployeeNumber, LastName, FirstName, OfficeNumber, OfficePhone, LockerNumber(FK))

LOCKER (LockerNumber, LockerRoom, LockerSize)

*\-- Option B: Foreign key in LOCKER*

EMPLOYEE (EmployeeNumber, LastName, FirstName, OfficeNumber, OfficePhone)

LOCKER (LockerNumber, LockerRoom, LockerSize, EmployeeNumber(FK))

1:N Relationship Example:

sql

*\-- Parent table*

DEPARTMENT (DepartmentID, DepartmentName, Budget)

*\-- Child table with foreign key*

EMPLOYEE (EmployeeID, LastName, FirstName, HireDate, DepartmentID(FK))

N:M Relationship Example:

sql

*\-- Parent tables*

STUDENT (SID, StudentName, Phone, EmailAddress)

CLASS (ClassNumber, ClassTime, ClassName, Description)

*\-- Intersection table*

STUDENT\_CLASS (SID(FK), ClassNumber(FK), Grade, EnrollmentDate)

### **4.5.5 Representing Weak Entities**

ID-Dependent Weak Entities:

* The parent's key becomes part of the weak entity's primary key  
* Example: BUILDING and APARTMENT

sql

BUILDING (BuildingName, StreetAddress, City, State, ZIP)

APARTMENT (BuildingName(FK), ApartmentNumber, NumberOfBedrooms, 

           NumberOfBaths, MonthlyRent)

*\-- Composite PK: (BuildingName, ApartmentNumber)*

Non-ID-Dependent Weak Entities:

* Use same techniques as strong entities  
* Include foreign key to parent entity

### **4.5.6 Representing Subtype Entities**

Subtype Representation Options:

Option 1: Separate Tables

sql

*\-- Supertype*

STUDENT (StudentID, LastName, FirstName, isGradStudent)

*\-- Subtypes*

UNDERGRADUATE (StudentID(FK), HighSchoolGPA, ScoreOnSAT)

GRADUATE (StudentID(FK), UndergraduateGPA, ScoreOnGMAT)

Option 2: Single Table with Type Indicator

sql

STUDENT (StudentID, LastName, FirstName, isGradStudent,

         HighSchoolGPA, ScoreOnSAT, UndergraduateGPA, ScoreOnGMAT)

### **4.5.7 Representing Recursive Relationships**

1:1 Recursive:

sql

PERSON (Person, Phone, Email, PersonSponsored(FK))

*\-- PersonSponsored must exist in Person*

1:N Recursive:

sql

EMPLOYEE (EmployeeID, LastName, FirstName, ManagerID(FK))

*\-- ManagerID must exist in EmployeeID*

N:M Recursive:

sql

DOCTOR (Name, OfficeAddress, City, State, ZIP, Phone)

TREATMENT\_INTERSECTION (Physician(FK), Patient(FK))

*\-- Both Physician and Patient must exist in Name in DOCTOR*

## **4.6 Normalization and Denormalization**

### **4.6.1 Normalization Process**

Normalization is the process of organizing data to minimize redundancy and dependency by dividing tables and defining relationships.

Key Normal Forms:

* First Normal Form (1NF): Eliminate repeating groups, ensure atomic values  
* Second Normal Form (2NF): Meet 1NF, remove partial dependencies  
* Third Normal Form (3NF): Meet 2NF, remove transitive dependencies  
* Boyce-Codd Normal Form (BCNF): Every determinant is a candidate key

### **4.6.2 Normalization Example**

Unnormalized Data:

text

SALES\_COMMISSION (CheckNumber, SalespersonNumber, SalespersonLastName,

                 SalespersonFirstName, Phone, CheckDate, CommissionPeriod,

                 TotalCommissionSales, CommissionAmount, BudgetCategory)

Functional Dependencies Identified:

* SalespersonNumber → (SalespersonLastName, SalespersonFirstName, Phone, BudgetCategory)  
* CheckNumber → CheckDate  
* (SalespersonNumber, CommissionPeriod) → (TotalCommissionSales, CommissionAmount, CheckNumber, CheckDate)

Normalized Design:

sql

SALESPERSON (SalespersonNumber, SalespersonLastName, 

             SalespersonFirstName, Phone, BudgetCategory)

COMMISSION\_CHECK (CheckNumber, CheckDate)

SALES\_COMMISSION (SalespersonNumber(FK), CommissionPeriod, 

                  TotalCommissionSales, CommissionAmount, CheckNumber(FK))

### **4.6.3 Denormalization**

Denormalization is the process of consolidating relations that are in a higher normal form into a single relation that is in a lower normal form.

When to Denormalize:

* Improve query performance  
* Simplify complex data structures  
* Reduce join operations in frequently accessed data

Example Denormalization:

sql

*\-- Normalized*

CUSTOMER (CustomerNumber, CustomerName, StreetAddress, ZIP, ContactName(FK))

ZIP (ZIP, City, State)

CONTACT (ContactName, Phone)

*\-- Denormalized*

CUSTOMER (CustomerNumber, CustomerName, StreetAddress, City, State, ZIP, ContactName(FK))

CONTACT (ContactName, Phone)

Key Consideration: "Relations should not always be normalized to the highest degree possible. Denormalization can be desirable to improve performance when the performance gain outweighs the dangers of additional anomalies." (Kroenke, Chapter 5\)

## **4.7 Physical Database Design Considerations**

### **4.7.1 Column Properties Specification**

When implementing the database design, specify detailed column properties:

* Data Type: Character, numeric, date, etc.  
* Null Status: Whether the column allows NULL values  
* Default Value: Value supplied when no value is provided  
* Data Constraints: Restrictions on valid values

### **4.7.2 Surrogate Keys**

A surrogate key is a unique, system-supplied identifier used as the primary key when no natural key is suitable or when the natural key is inefficient.

When to Use Surrogate Keys:

* Natural key is lengthy text  
* No obvious natural key exists  
* Composite key would be too complex  
* Improve join performance

Example:

sql

SEMINAR (SeminarID, SeminarDate, SeminarTime, Location, SeminarTitle)

*\-- SeminarID is a surrogate key: Integer, AUTO\_INCREMENT*

## **4.8 Comprehensive Case Study: Honoria Sanchez Designs**

### **4.8.1 Business Context**

Honoria Sanchez is an interior designer specializing in home kitchen design who:

* Offers free seminars at various locations  
* Sells books and videos on kitchen design  
* Provides custom-design consulting services  
* Needs to track customers, seminars, contacts, and sales

### **4.8.2 Final Database Schema**

sql

SEMINAR (SeminarID, SeminarDate, SeminarTime, Location, SeminarTitle)

CUSTOMER (CustomerID, LastName, FirstName, EmailAddress, 

          EncryptedPassword, Phone, StreetAddress, City, State, ZIP)

SEMINAR\_CUSTOMER (SeminarID(FK), CustomerID(FK))

CONTACT (CustomerID(FK), ContactNumber, ContactDate, ContactType, SeminarID(FK))

PRODUCT (ProductNumber, ProductType, ProductDescription, UnitPrice, QuantityOnHand)

INVOICE (InvoiceNumber, InvoiceDate, CustomerID(FK), PaymentType, 

         SubTotal, Shipping, Tax, Total)

LINE\_ITEM (InvoiceNumber(FK), LineNumber, ProductNumber(FK), 

           Quantity, UnitPrice, Total)

### **4.8.3 Referential Integrity Constraints**

| Parent | Child | Constraint |
| :---- | :---- | :---- |
| SEMINAR | SEMINAR\_CUSTOMER | SeminarID in child must exist in parent |
| CUSTOMER | SEMINAR\_CUSTOMER | CustomerID in child must exist in parent |
| CUSTOMER | INVOICE | CustomerID in child must exist in parent |
| INVOICE | LINE\_ITEM | InvoiceNumber in child must exist in parent |
| PRODUCT | LINE\_ITEM | ProductNumber in child must exist in parent |

## **4.9 Database Design Tools and Validation**

### **4.9.1 Microsoft Access as a Prototyping Tool**

Microsoft Access can be used to build prototype databases that allow users to validate the data model by demonstrating the consequences of data modeling decisions. Key features include:

* Easy creation of multiple database copies for testing different models  
* Wizards for quick form and report mock-ups  
* Banded form and report editors for professional layouts  
* Ability to prototype regardless of the final DBMS

### **4.9.2 Validating the Data Model**

Validation Techniques:

* User review and feedback sessions  
* Prototyping with sample data and operations  
* Testing against all documented use cases  
* Verifying business rule enforcement  
* Checking form and report requirements

## **Chapter Summary**

* Database design transforms business requirements into a structured data model using E-R diagrams  
* The E-R model represents entities, attributes, relationships, and constraints visually  
* Relationships have cardinality (maximum and minimum) that define business rules  
* Weak entities, subtype entities, and recursive relationships handle special modeling cases  
* The relational model implements E-R designs through tables, keys, and referential integrity  
* Normalization eliminates data anomalies while denormalization may improve performance  
* Real-world validation ensures the design meets business needs

## **Key Terms**

* Entity-Relationship Diagram (ERD)  
* Cardinality (Maximum, Minimum)  
* Weak Entity (ID-dependent, Non-ID-dependent)  
* Associative Entity  
* Recursive Relationship  
* Surrogate Key  
* Normalization (1NF, 2NF, 3NF, BCNF)  
* Denormalization  
* Referential Integrity  
* Crow's Foot Notation

## **Review Questions**

1. What are the three main components of an ERD and how are they represented in different notations?  
2. Explain the difference between maximum and minimum cardinality with examples.  
3. How do ID-dependent weak entities differ from non-ID-dependent weak entities?  
4. Describe the process for transforming M:N relationships into relational tables.  
5. When should you consider denormalization in database design?

## **Exercises**

1. Create an ERD for a hospital management system tracking patients, doctors, appointments, and treatments using crow's foot notation.  
2. Normalize the following table to 3NF and explain each normalization step:  
3. text  
4. Order(OrderID, CustomerName, Product1, Product2, Product1Price, Product2Price, TotalAmount)  
5. Transform your hospital ERD into a complete relational schema with appropriate data types and referential integrity constraints.

*In the next chapter, we will explore Structured Query Language (SQL) and learn how to implement and query relational databases using this powerful language.*

# **Tab 4**

# **Chapter 4: Database Design and Modeling with Entity-Relationship Diagrams**

## **Learning Objectives**

* Understand the importance of database design in information systems  
* Learn the stages of database development and their relationship to SDLC  
* Master Entity-Relationship Diagram (ERD) notation and creation techniques  
* Apply normalization principles to eliminate data redundancy  
* Transform E-R models into relational database designs  
* Understand weak entities, subtype entities, and recursive relationships  
* Create and validate complete database designs using real-world examples

## **4.1 Introduction to Database Design and Information Systems**

Database design is the process of producing a detailed data model of a database that specifies data structures, relationships, constraints, and access methods. As defined in the Kroenke textbook, data represents recorded facts and numbers, while information is knowledge derived from data presented in a meaningful context.

An information system consists of five key components that work together to transform data into valuable information:

* Hardware \- Physical computing equipment  
* Software \- Programs and applications  
* Data \- Facts and information stored in the system  
* Procedures \- Instructions for using the system  
* People \- Users and technical staff

*"Well-designed databases are like well-organized libraries: information is easy to find, update, and expand while maintaining accuracy and consistency."*

## **4.2 Database Development Lifecycle and Systems Development**

The database development process is a crucial subset of the Systems Development Life Cycle (SDLC), which consists of five primary phases:

### **4.2.1 System Definition Phase**

* Define information system project goals and scope  
* Assess project feasibility (cost, schedule, technical, organizational)  
* Form project team and create detailed project plan  
* *Deliverable: Project Plan*

### **4.2.2 Requirements Analysis Phase**

* Conduct user interviews and evaluate existing systems  
* Determine needed forms, reports, and queries  
* Identify application features and functions  
* Document business rules and security requirements  
* *Deliverable: Approved User Requirements*

### **4.2.3 Component Design Phase**

* Determine hardware and software specifications  
* Create the database design (primary focus of this chapter)  
* Design business procedures and job descriptions  
* *Deliverable: Documented System Design*

### **4.2.4 Implementation Phase**

* Build system components and conduct testing  
* Create database and populate with data  
* Convert to new system and train personnel  
* *Deliverable: Installed and Functioning Information System*

### **4.2.5 System Maintenance Phase**

* Update system with patches and new releases  
* Record and prioritize change requests  
* *Deliverable: Updated System*

Key Insight: "During the implementation phase of developing a database system, the database is constructed, but the data model is transformed into a database design during the component design phase." (Kroenke, Chapter 4\)

## **4.3 Conceptual Design with Entity-Relationship Diagrams (ERD)**

### **4.3.1 Basic ERD Components**

Entities are objects or concepts about which data is stored. As defined in Kroenke:

* Entity Class: A collection of all entities of a given type (e.g., EMPLOYEE)  
* Entity Instance: A particular occurrence of an entity (e.g., Employee \#12345)

Attributes are properties or characteristics of entities that describe the entity's characteristics. Examples include EmployeeName, DateOfHire, and JobSkillCode.

Identifiers are attributes that name or identify entity instances:

* Unique identifiers identify one, and only one, entity instance  
* Nonunique identifiers identify a set of instances  
* Composite identifiers are composed of two or more attributes

### **4.3.2 Relationships and Cardinality**

Relationships represent associations between entities. The number of entity classes in a relationship is known as the degree:

* Binary relationships (degree 2\) involve two entity classes  
* Ternary relationships (degree 3\) involve three entity classes

Cardinality defines the numerical relationship between entities:

Maximum Cardinality \- The maximum number of entity instances that may participate in a relationship:

* One-to-One (1:1) \- One instance of Entity A relates to one instance of Entity B  
* One-to-Many (1:N) \- One instance of Entity A relates to many instances of Entity B  
* Many-to-Many (M:N) \- Many instances of Entity A relate to many instances of Entity B

Minimum Cardinality \- The minimum number of entity instances that must participate in a relationship:

* Optional (minimum of 0\) \- Participation is not required  
* Mandatory (minimum of 1\) \- Participation is required

### **4.3.3 ERD Notation Systems**

Traditional E-R Notation:

* Entities: Rectangles  
* Relationships: Diamonds  
* Maximum cardinality: Shown inside the diamond  
* Minimum cardinality: Shown by ovals (optional) or hash marks (mandatory)

Crow's Foot Notation (Information Engineering Model):

* Entities: Rectangles  
* Relationships: Lines with specific symbols  
* Maximum cardinality: Crow's foot (many) or single line (one)  
* Minimum cardinality: Circle (optional) or hash mark (mandatory)

text

Crow's Foot Symbol Guide:  
|------|    Mandatory \- One (Exactly one)  
|\>\>----|    Mandatory \- Many (One or more)  
|0----|    Optional \- One (Zero or one)

|0\>\>----|    Optional \- Many (Zero or more)

### **4.3.4 Example: University Database ERD**

text

\[STUDENT\] \------\>|\< \-------- |ENROLLMENT| \-------- \>| \------\> \[COURSE\]  
     |1                           |\*                     |1  
     |                            |                      |  
\[StudentID\]              \[EnrollmentDate\]         \[CourseID\]  
\[FirstName\]              \[Grade\]                  \[CourseName\]  
\[LastName\]                                          \[Credits\]

\[Email\]

Relationship Analysis:

* Each Student can enroll in many Courses (1:N relationship through ENROLLMENT)  
* Each Course can have many enrolled Students  
* ENROLLMENT is an associative entity with additional attributes like Grade and EnrollmentDate  
* Minimum cardinality: A Student must exist for an Enrollment (mandatory), but a Course might exist without enrollments (optional)

## **4.4 Advanced E-R Modeling Concepts**

### **4.4.1 Weak Entities**

A weak entity is an entity that cannot exist in the database without the existence of another entity. Any entity that is not weak is called a strong entity.

ID-Dependent Weak Entities:

* Cannot exist without their parent entity  
* Have a composite identifier containing the parent's key  
* Example: APARTMENT entity with composite key (BuildingName, ApartmentNumber)

Non-ID-Dependent Weak Entities:

* Logically depend on another entity but have their own identifier  
* Example: PRESCRIPTION depends on PATIENT but has its own PrescriptionID

Key Distinction: "An ID-dependent entity is an entity in which the identifier of the entity includes the identifier of another entity." (Kroenke, Chapter 4\)

### **4.4.2 Associative Entities**

An associative entity (also called an association entity) is used when a pure N:M relationship cannot properly hold attributes that describe aspects of the relationship between two entities.

Example Transformation:

text

Original N:M Relationship:  
\[EMPLOYEE\] \----- N:M \----- \[PROJECT\]

With Associative Entity:  
\[EMPLOYEE\] \----- 1:N \----- \[ASSIGNMENT\] \----- N:1 \----- \[PROJECT\]  
                                |  
                          \[HoursWorked\]  
                          \[StartDate\]

                          \[Role\]

### **4.4.3 Subtype Entities**

A subtype entity is a special case of another entity called a supertype. An attribute of the supertype called a discriminator indicates which subtype is appropriate.

Subtype Characteristics:

* Exclusive subtypes: Supertype relates to at most one subtype  
* Inclusive subtypes: Supertype can relate to one or more subtypes  
* All subtypes inherit the supertype's identifier

Example:

text

\[STUDENT\] (supertype)  
   |  
isGradStudent (discriminator)  
   |  
   |------ \[UNDERGRADUATE\] (subtype)  
   |       \[HighSchoolGPA\]  
   |       \[ScoreOnSAT\]  
   |  
   |------ \[GRADUATE\] (subtype)  
           \[UndergraduateGPA\]

           \[ScoreOnGMAT\]

### **4.4.4 Recursive Relationships**

A recursive relationship occurs when an entity has a relationship with itself. These can be 1:1, 1:N, or N:M relationships.

Examples:

* 1:1: PERSON sponsors another PERSON  
* 1:N: EMPLOYEE manages other EMPLOYEES  
* N:M: DOCTOR treats other DOCTORS as patients

## **4.5 Logical Design: Transforming E-R Models to Relational Database Design**

### **4.5.1 The Database Design Process**

A database design is a set of database specifications that can actually be implemented as a database in a DBMS. The transformation process follows these key steps:

1. Create tables for each entity  
   * Specify primary keys (consider surrogate keys)  
   * Define column properties (data type, null status, default values)  
   * Specify data constraints  
2. Create relationships using foreign keys  
   * Represent strong entity relationships (1:1, 1:N, N:M)  
   * Handle ID-dependent and non-ID-dependent weak entities  
   * Represent subtypes and recursive relationships  
3. Verify normalization and consider denormalization if needed

### **4.5.2 Representing Entities as Tables**

Basic Rules:

* Each entity becomes a table  
* Entity attributes become table columns  
* Entity identifier becomes the primary key  
* Evaluate each table against normalization criteria

Example Transformation:

text

ENTITY: ITEM  
Attributes: ItemNumber, Description, Cost, ListPrice, QuantityOnHand

BECOMES TABLE: ITEM

Columns: ItemNumber (PK), Description, Cost, ListPrice, QuantityOnHand

### **4.5.3 Representing Relationships**

1:1 Relationships:

* Place the key of either table in the other table as a foreign key  
* Choice depends on business rules and query patterns

1:N Relationships:

* Place the key of the parent table (1 side) into the child table (N side) as a foreign key  
* "The term 'parent' refers to the table on the one side of a 1:N relationship, and the term 'child' refers to the table on the many side." (Kroenke, Chapter 5\)

N:M Relationships:

* Create an intersection table with a composite key  
* The intersection table contains foreign keys from both parent tables  
* Add any relationship attributes to the intersection table

### **4.5.4 Example: Relationship Transformations**

1:1 Relationship Example:

sql

*\-- Option A: Foreign key in EMPLOYEE*  
EMPLOYEE (EmployeeNumber, LastName, FirstName, OfficeNumber, OfficePhone, LockerNumber(FK))  
LOCKER (LockerNumber, LockerRoom, LockerSize)

*\-- Option B: Foreign key in LOCKER*  
EMPLOYEE (EmployeeNumber, LastName, FirstName, OfficeNumber, OfficePhone)

LOCKER (LockerNumber, LockerRoom, LockerSize, EmployeeNumber(FK))

1:N Relationship Example:

sql

*\-- Parent table*  
DEPARTMENT (DepartmentID, DepartmentName, Budget)

*\-- Child table with foreign key*

EMPLOYEE (EmployeeID, LastName, FirstName, HireDate, DepartmentID(FK))

N:M Relationship Example:

sql

*\-- Parent tables*  
STUDENT (SID, StudentName, Phone, EmailAddress)  
CLASS (ClassNumber, ClassTime, ClassName, Description)

*\-- Intersection table*

STUDENT\_CLASS (SID(FK), ClassNumber(FK), Grade, EnrollmentDate)

### **4.5.5 Representing Weak Entities**

ID-Dependent Weak Entities:

* The parent's key becomes part of the weak entity's primary key  
* Example: BUILDING and APARTMENT

sql

BUILDING (BuildingName, StreetAddress, City, State, ZIP)  
APARTMENT (BuildingName(FK), ApartmentNumber, NumberOfBedrooms,   
           NumberOfBaths, MonthlyRent)

*\-- Composite PK: (BuildingName, ApartmentNumber)*

Non-ID-Dependent Weak Entities:

* Use same techniques as strong entities  
* Include foreign key to parent entity

### **4.5.6 Representing Subtype Entities**

Subtype Representation Options:

Option 1: Separate Tables

sql

*\-- Supertype*  
STUDENT (StudentID, LastName, FirstName, isGradStudent)

*\-- Subtypes*  
UNDERGRADUATE (StudentID(FK), HighSchoolGPA, ScoreOnSAT)

GRADUATE (StudentID(FK), UndergraduateGPA, ScoreOnGMAT)

Option 2: Single Table with Type Indicator

sql

STUDENT (StudentID, LastName, FirstName, isGradStudent,

         HighSchoolGPA, ScoreOnSAT, UndergraduateGPA, ScoreOnGMAT)

### **4.5.7 Representing Recursive Relationships**

1:1 Recursive:

sql

PERSON (Person, Phone, Email, PersonSponsored(FK))

*\-- PersonSponsored must exist in Person*

1:N Recursive:

sql

EMPLOYEE (EmployeeID, LastName, FirstName, ManagerID(FK))

*\-- ManagerID must exist in EmployeeID*

N:M Recursive:

sql

DOCTOR (Name, OfficeAddress, City, State, ZIP, Phone)  
TREATMENT\_INTERSECTION (Physician(FK), Patient(FK))

*\-- Both Physician and Patient must exist in Name in DOCTOR*

## **4.6 Normalization and Denormalization**

### **4.6.1 Normalization Process**

Normalization is the process of organizing data to minimize redundancy and dependency by dividing tables and defining relationships.

Key Normal Forms:

* First Normal Form (1NF): Eliminate repeating groups, ensure atomic values  
* Second Normal Form (2NF): Meet 1NF, remove partial dependencies  
* Third Normal Form (3NF): Meet 2NF, remove transitive dependencies  
* Boyce-Codd Normal Form (BCNF): Every determinant is a candidate key

### **4.6.2 Normalization Example**

Unnormalized Data:

text

SALES\_COMMISSION (CheckNumber, SalespersonNumber, SalespersonLastName,  
                 SalespersonFirstName, Phone, CheckDate, CommissionPeriod,

                 TotalCommissionSales, CommissionAmount, BudgetCategory)

Functional Dependencies Identified:

* SalespersonNumber → (SalespersonLastName, SalespersonFirstName, Phone, BudgetCategory)  
* CheckNumber → CheckDate  
* (SalespersonNumber, CommissionPeriod) → (TotalCommissionSales, CommissionAmount, CheckNumber, CheckDate)

Normalized Design:

sql

SALESPERSON (SalespersonNumber, SalespersonLastName,   
             SalespersonFirstName, Phone, BudgetCategory)  
COMMISSION\_CHECK (CheckNumber, CheckDate)  
SALES\_COMMISSION (SalespersonNumber(FK), CommissionPeriod, 

                  TotalCommissionSales, CommissionAmount, CheckNumber(FK))

### **4.6.3 Denormalization**

Denormalization is the process of consolidating relations that are in a higher normal form into a single relation that is in a lower normal form.

When to Denormalize:

* Improve query performance  
* Simplify complex data structures  
* Reduce join operations in frequently accessed data

Example Denormalization:

sql

*\-- Normalized*  
CUSTOMER (CustomerNumber, CustomerName, StreetAddress, ZIP, ContactName(FK))  
ZIP (ZIP, City, State)  
CONTACT (ContactName, Phone)

*\-- Denormalized*  
CUSTOMER (CustomerNumber, CustomerName, StreetAddress, City, State, ZIP, ContactName(FK))

CONTACT (ContactName, Phone)

Key Consideration: "Relations should not always be normalized to the highest degree possible. Denormalization can be desirable to improve performance when the performance gain outweighs the dangers of additional anomalies." (Kroenke, Chapter 5\)

## **4.7 Physical Database Design Considerations**

### **4.7.1 Column Properties Specification**

When implementing the database design, specify detailed column properties:

* Data Type: Character, numeric, date, etc.  
* Null Status: Whether the column allows NULL values  
* Default Value: Value supplied when no value is provided  
* Data Constraints: Restrictions on valid values

### **4.7.2 Surrogate Keys**

A surrogate key is a unique, system-supplied identifier used as the primary key when no natural key is suitable or when the natural key is inefficient.

When to Use Surrogate Keys:

* Natural key is lengthy text  
* No obvious natural key exists  
* Composite key would be too complex  
* Improve join performance

Example:

sql

SEMINAR (SeminarID, SeminarDate, SeminarTime, Location, SeminarTitle)

*\-- SeminarID is a surrogate key: Integer, AUTO\_INCREMENT*

## **4.8 Comprehensive Case Study: Honoria Sanchez Designs**

### **4.8.1 Business Context**

Honoria Sanchez is an interior designer specializing in home kitchen design who:

* Offers free seminars at various locations  
* Sells books and videos on kitchen design  
* Provides custom-design consulting services  
* Needs to track customers, seminars, contacts, and sales

### **4.8.2 Final Database Schema**

sql

SEMINAR (SeminarID, SeminarDate, SeminarTime, Location, SeminarTitle)  
CUSTOMER (CustomerID, LastName, FirstName, EmailAddress,   
          EncryptedPassword, Phone, StreetAddress, City, State, ZIP)  
SEMINAR\_CUSTOMER (SeminarID(FK), CustomerID(FK))  
CONTACT (CustomerID(FK), ContactNumber, ContactDate, ContactType, SeminarID(FK))  
PRODUCT (ProductNumber, ProductType, ProductDescription, UnitPrice, QuantityOnHand)  
INVOICE (InvoiceNumber, InvoiceDate, CustomerID(FK), PaymentType,   
         SubTotal, Shipping, Tax, Total)  
LINE\_ITEM (InvoiceNumber(FK), LineNumber, ProductNumber(FK), 

           Quantity, UnitPrice, Total)

### **4.8.3 Referential Integrity Constraints**

| Parent | Child | Constraint |
| :---- | :---- | :---- |
| SEMINAR | SEMINAR\_CUSTOMER | SeminarID in child must exist in parent |
| CUSTOMER | SEMINAR\_CUSTOMER | CustomerID in child must exist in parent |
| CUSTOMER | INVOICE | CustomerID in child must exist in parent |
| INVOICE | LINE\_ITEM | InvoiceNumber in child must exist in parent |
| PRODUCT | LINE\_ITEM | ProductNumber in child must exist in parent |

## **4.9 Database Design Tools and Validation**

### **4.9.1 Microsoft Access as a Prototyping Tool**

Microsoft Access can be used to build prototype databases that allow users to validate the data model by demonstrating the consequences of data modeling decisions. Key features include:

* Easy creation of multiple database copies for testing different models  
* Wizards for quick form and report mock-ups  
* Banded form and report editors for professional layouts  
* Ability to prototype regardless of the final DBMS

### **4.9.2 Validating the Data Model**

Validation Techniques:

* User review and feedback sessions  
* Prototyping with sample data and operations  
* Testing against all documented use cases  
* Verifying business rule enforcement  
* Checking form and report requirements

## **Chapter Summary**

* Database design transforms business requirements into a structured data model using E-R diagrams  
* The E-R model represents entities, attributes, relationships, and constraints visually  
* Relationships have cardinality (maximum and minimum) that define business rules  
* Weak entities, subtype entities, and recursive relationships handle special modeling cases  
* The relational model implements E-R designs through tables, keys, and referential integrity  
* Normalization eliminates data anomalies while denormalization may improve performance  
* Real-world validation ensures the design meets business needs

## **Key Terms**

* Entity-Relationship Diagram (ERD)  
* Cardinality (Maximum, Minimum)  
* Weak Entity (ID-dependent, Non-ID-dependent)  
* Associative Entity  
* Recursive Relationship  
* Surrogate Key  
* Normalization (1NF, 2NF, 3NF, BCNF)  
* Denormalization  
* Referential Integrity  
* Crow's Foot Notation

## **Review Questions**

1. What are the three main components of an ERD and how are they represented in different notations?  
2. Explain the difference between maximum and minimum cardinality with examples.  
3. How do ID-dependent weak entities differ from non-ID-dependent weak entities?  
4. Describe the process for transforming M:N relationships into relational tables.  
5. When should you consider denormalization in database design?

## **Exercises**

1. Create an ERD for a hospital management system tracking patients, doctors, appointments, and treatments using crow's foot notation.  
2. Normalize the following table to 3NF and explain each normalization step:  
3. text  
4. Order(OrderID, CustomerName, Product1, Product2, Product1Price, Product2Price, TotalAmount)  
5. Transform your hospital ERD into a complete relational schema with appropriate data types and referential integrity constraints.

*In the next chapter, we will explore Structured Query Language (SQL) and learn how to implement and query relational databases using this powerful language.*  
nice. I'd like a chapter about using LucidCharts for ERD with a subsection about using mermaid for erd

Read 10 web pages

Hmm, the user is asking for a textbook chapter about using LucidChart for ERD with a subsection about Mermaid. We previously discussed database design and modeling, so they're likely building educational materials and want practical tool guidance.

I need to provide comprehensive information about both tools, covering their basic usage, key features, and how they complement each other. The search results I saw give me excellent material for this.  provide thorough explanations of ERD fundamentals and LucidChart's capabilities, showing the step-by-step process for creating diagrams.  reveals that LucidChart now supports Mermaid code input directly, which is a crucial integration point.  offer detailed Mermaid syntax and practical examples, while  shows the community demand for better integration between these tools.

I can structure this with a comparison table first to give users an immediate overview, then dive into each tool separately. For LucidChart, I will cover the visual diagramming workflow and the new AI features. For Mermaid, I need to explain the text-based syntax thoroughly since it's less intuitive for beginners. The integration between both tools through the "diagram as code" feature is particularly valuable to highlight.

The authority of these sources is quite good \-  come from LucidChart's official documentation,  from Mermaid's official docs, and  from Mermaid Chart's blog with practical examples.  provides useful community perspective but has lower authority being a feature request forum.

I plan to use a table for the tool comparison since it will help users quickly understand the differences in approach, primary users, key features, and strengths. Then I can provide the detailed workflow sections with practical guidance and examples.

I have gathered information to help you understand how to use Lucidchart and Mermaid for creating Entity-Relationship Diagrams (ERDs). While a full textbook chapter is beyond the scope of this guide, the details below provide a solid foundation for using both tools.

Here is a quick comparison to help you understand their different approaches:

| Feature | Lucidchart | Mermaid |
| :---- | :---- | :---- |
| Primary Approach | Visual, drag-and-drop interface | Text-based syntax (markdown-inspired) |
| Primary Users | Business analysts, designers, teams for collaborative design | Developers, technical writers for documentation (e.g., markdown files, wikis) |
| Key Strengths | Ease of use, real-time collaboration, extensive formatting options | Version control friendly, easily integrated into docs and AI-assisted workflows |
| ERD Specifics | Supports conceptual, logical, and physical models; includes Enhanced ERD (EERD) features like subtypes/supertypes | Uses Crow's Foot notation; allows attribute definition with data types; relationships are defined with a concise syntax |

### **📊 Using Lucidchart for ERD**

Lucidchart is an intelligent diagramming application that is particularly well-suited for creating ERDs through a visual and intuitive process.

* Core ERD Components: The process involves identifying entities (nouns like Student, Course), relationships (verbs like "enrolls", "teaches"), and attributes (properties like StudentID, CourseName). You can also represent cardinality (e.g., one-to-many) to define the numerical rules of relationships.  
* Enhanced ERDs (EERDs): For more complex database modeling, Lucidchart supports Enhanced ERDs. EERDs include advanced concepts like supertypes and subtypes (e.g., a Student supertype with Undergraduate and Graduate subtypes), specialization and generalization, and inheritance, where subtypes inherit attributes from their supertype.  
* Creating Diagrams: You can start from scratch using the drag-and-drop editor, where entity-relationship shape libraries are readily available. Lucidchart also now includes a "Generate Diagram" AI feature that can create a diagram from a text prompt.

### **🧜 Using Mermaid for ERD**

Mermaid is a JavaScript-based tool that allows you to create diagrams and charts using a text-based syntax, which is ideal for inclusion in markdown files and documentation.

* Basic Syntax and Components: Mermaid ER diagrams are defined with simple code blocks. You declare entities and their relationships on a single line. Its syntax is compatible with PlantUML and uses crow's foot notation to represent cardinality.  
* Defining Attributes: You can define an entity's attributes within curly braces {}. While you can specify data types, Mermaid does not enforce a standard set of types.  
* Relationship Syntax: The relashionship part of the statement defines how entities connect. The syntax is \<first-entity\> \[\<relationship\> \<second-entity\> : \<relationship-label\>\].

Here is a simple example of a Mermaid ERD syntax and the resulting diagram:

### **🔗 Integration and Workflow**

You can use Lucidchart and Mermaid together in your projects.

* Lucidchart's "Diagram as Code" Feature: Lucidchart now allows you to import Mermaid code to create a diagram within a Lucidchart document. This is perfect for visualizing text-based definitions or sharing Mermaid-generated diagrams with collaborators who prefer a visual environment. Note that the resulting image is not editable in Lucidchart's canvas; you must modify the source code.  
* Community-Driven Workflows: There is significant user demand for the reverse feature—exporting a Lucidchart diagram to Mermaid code—to include diagrams in markdown documentation or use them with AI tools. Although this feature was highly requested, the information I found does not confirm its availability.

### **💡 Recommendations for Use**

* Choose Lucidchart if you are designing a database collaboratively, need a powerful visual editor, want to create Enhanced ERDs, or are less comfortable with writing code.  
* Choose Mermaid if your work is development-focused, you need to store your diagrams in version control (like Git), or you want to embed diagrams directly in markdown files for documentation or wikis.  
* For a Hybrid Approach, you can define the initial structure quickly with Mermaid AI and then import the code into Lucidchart for polishing, sharing, and presenting.

I hope this helps you get started with both Lucidchart and Mermaid for your database modeling tasks. Would you like a more detailed walkthrough of creating a specific part of an ERD, like defining cardinality constraints in Mermaid or creating subtypes in Lucidchart?  
create a slide deck for cha\[ter 4

We are creating a slide deck for Chapter 4, which covers Database Design and Modeling with Entity-Relationship Diagrams (ERD). The slides should cover the key topics from the chapter, including the importance of database design, the stages of database development, ERD components and notation, advanced E-R modeling concepts, transformation to relational design, normalization, and a case study.

Let's outline the slides:

1. Title Slide  
2. Learning Objectives  
3. Introduction to Database Design  
4. Database Development Lifecycle (SDLC)  
5. Conceptual Design with ERDs  
6. ERD Components: Entities, Attributes, Relationships  
7. Cardinality and Modality  
8. ERD Notation: Crow's Foot  
9. Advanced E-R Modeling: Weak Entities  
10. Advanced E-R Modeling: Associative Entities  
11. Advanced E-R Modeling: Subtype Entities  
12. Advanced E-R Modeling: Recursive Relationships  
13. Logical Design: Transforming E-R to Relational  
14. Normalization  
15. Denormalization  
16. Physical Design Considerations  
17. Case Study: Honoria Sanchez Designs  
18. Tools for ERD: Lucidchart and Mermaid  
19. Summary  
20. Key Terms  
21. Review Questions

We'll create the slide deck in markdown format, which can be used with tools like Marp, Deckset, or other markdown-to-slide tools.

Note: Since we are including Mermaid for ERD, we can use Mermaid code blocks in the slides to illustrate examples.

Let's create the slides one by one.

# **Chapter 4: Database Design and Modeling with Entity-Relationship Diagrams**

## **Slide 1: Title Slide**

# **Chapter 4**

## **Database Design and Modeling with Entity-Relationship Diagrams**

Database Concepts, 10e  
*Kroenke, Auer, Vandenberg, & Yoder*

---

## **Slide 2: Learning Objectives**

* Understand the importance of database design in information systems  
* Learn the stages of database development and their relationship to SDLC  
* Master Entity-Relationship Diagram (ERD) notation and creation techniques  
* Apply normalization principles to eliminate data redundancy  
* Transform E-R models into relational database designs  
* Understand weak entities, subtype entities, and recursive relationships

---

## **Slide 3: The Importance of Database Design**

Why Proper Design Matters:

* Data Integrity \- accuracy and consistency of stored data  
* Performance \- speed of data retrieval and manipulation  
* Scalability \- ability to handle growth in data volume  
* Maintainability \- ease of modifying database structure

"Well-designed databases are like well-organized libraries: information is easy to find, update, and expand."  
---

## **Slide 4: Database Development in SDLC**

Systems Development Life Cycle (SDLC):

1. System Definition \- Project planning and scope  
2. Requirements Analysis \- User interviews, forms, reports  
3. Component Design \- Database design creation  
4. Implementation \- Database construction  
5. System Maintenance \- Updates and enhancements

Database development occurs primarily in stages 2-4

---

## **Slide 5: Entity-Relationship Model Fundamentals**

Core Components:

* Entities \- Objects to track (CUSTOMER, PRODUCT)  
* Attributes \- Characteristics of entities (CustomerName, Price)  
* Identifiers \- Unique or non-unique attribute names  
* Relationships \- Associations between entities

Entity Types:

* Entity Class \- Collection of all entities of a type  
* Entity Instance \- Specific occurrence of an entity

---

## **Slide 6: Basic ERD Components**

text

\[STUDENT\] \------\>|\< \-------- |ENROLLMENT| \-------- \>| \------\> \[COURSE\]  
     |1                           |\*                     |1  
     |                            |                      |  
\[StudentID\]              \[EnrollmentDate\]         \[CourseID\]  
\[FirstName\]              \[Grade\]                  \[CourseName\]  
\[LastName\]                                          \[Credits\]

\[Email\]

Elements:

* Entities: Rectangles  
* Relationships: Diamonds or lines  
* Attributes: Ovals or listed in entity  
* Cardinality: Numerical relationships

---

## **Slide 7: Relationship Cardinality**

Maximum Cardinality:

* 1:1 \- One-to-One (EMPLOYEE to LOCKER)  
* 1:N \- One-to-Many (DEPARTMENT to EMPLOYEE)  
* N:M \- Many-to-Many (STUDENT to COURSE)

Minimum Cardinality:

* Optional (0) \- Participation not required  
* Mandatory (1) \- Participation required

---

## **Slide 8: Crow's Foot Notation**

| Symbol | Meaning | Numeric Meaning |  |  |
| :---- | :---- | :---- | :---- | :---- |
| \` | \--- | \` | Mandatory \- One | Exactly one |
| \` | \>\>--- | \` | Mandatory \- Many | One or more |
| \` | o--- | \` | Optional \- One | Zero or one |
| \` | o\>\>--- | \` | Optional \- Many | Zero or more |

Example:

text

\[DEPARTMENT\] |\>\>---o| \[EMPLOYEE\]

   1 side                    N side

---

## **Slide 9: Weak Entities**

ID-Dependent Weak Entities:

* Cannot exist without parent entity  
* Composite identifier includes parent's key  
* Example: APARTMENT (BuildingName, ApartmentNumber)

Non-ID-Dependent Weak Entities:

* Logically depend on another entity  
* Have their own identifier  
* Example: PRESCRIPTION depends on PATIENT

---

## **Slide 10: Associative Entities**

Used when N:M relationships need attributes:

Transforms N:M relationship into two 1:N relationships

---

## **Slide 11: Subtype Entities**

Supertype/Subtype Relationships:

text

\[STUDENT\] (supertype)  
   |  
isGradStudent (discriminator)  
   |  
   |------ \[UNDERGRADUATE\] (subtype)  
   |       \[HighSchoolGPA\]  
   |       \[ScoreOnSAT\]  
   |  
   |------ \[GRADUATE\] (subtype)  
           \[UndergraduateGPA\]

           \[ScoreOnGMAT\]

Types:

* Exclusive: Supertype relates to at most one subtype  
* Inclusive: Supertype can relate to multiple subtypes

---

## **Slide 12: Recursive Relationships**

Entity has relationship with itself:

1:1 Recursive:

* PERSON sponsors another PERSON

1:N Recursive:

* EMPLOYEE manages other EMPLOYEES

N:M Recursive:

* DOCTOR treats other DOCTORS as patients

sql

EMPLOYEE (EmployeeID, LastName, FirstName, ManagerID(FK))

*\-- ManagerID must exist in EmployeeID*

---

## **Slide 13: Transforming E-R to Relational Design**

Step 1: Create Tables for Entities

* Entities become tables  
* Attributes become columns  
* Identifiers become primary keys

Step 2: Create Relationships

* 1:1 \- Foreign key in either table  
* 1:N \- Foreign key in "many" side  
* N:M \- Create intersection table

Step 3: Verify Normalization

---

## **Slide 14: Relationship Transformation Examples**

1:1 Relationship:

sql

*\-- Option A or B*  
EMPLOYEE (EmployeeNumber, LastName, LockerNumber(FK))

LOCKER (LockerNumber, LockerRoom, LockerSize)

1:N Relationship:

sql

DEPARTMENT (DepartmentID, DepartmentName)

EMPLOYEE (EmployeeID, LastName, DepartmentID(FK))

N:M Relationship:

sql

STUDENT (SID, StudentName)  
CLASS (ClassNumber, ClassName)

ENROLLMENT (SID(FK), ClassNumber(FK), Grade)

---

## **Slide 15: Normalization Process**

Normal Forms:

* 1NF: Eliminate repeating groups, ensure atomic values  
* 2NF: Meet 1NF, remove partial dependencies  
* 3NF: Meet 2NF, remove transitive dependencies  
* BCNF: Every determinant is a candidate key

Goal: Minimize redundancy and dependency

---

## **Slide 16: Normalization Example**

Before Normalization:

text

SALES\_COMMISSION (CheckNumber, SalespersonNumber,   
                 SalespersonLastName, SalespersonFirstName,   
                 Phone, CheckDate, CommissionPeriod,  
                 TotalCommissionSales, CommissionAmount, 

                 BudgetCategory)

After Normalization:

sql

SALESPERSON (SalespersonNumber, SalespersonLastName,   
             SalespersonFirstName, Phone, BudgetCategory)  
COMMISSION\_CHECK (CheckNumber, CheckDate)  
SALES\_COMMISSION (SalespersonNumber(FK), CommissionPeriod,   
                  TotalCommissionSales, CommissionAmount, 

                  CheckNumber(FK))

---

## **Slide 17: Denormalization**

Purpose: Improve performance by reducing joins

When to Denormalize:

* Frequently accessed data with multiple joins  
* Read-heavy applications  
* Reporting and data warehousing

Trade-off: Complexity vs. performance

Example:

sql

*\-- Instead of normalizing ZIP codes, include in CUSTOMER*  
CUSTOMER (CustomerNumber, CustomerName, StreetAddress, 

          City, State, ZIP, ContactName(FK))

---

## **Slide 18: Physical Design Considerations**

Column Properties:

* Data types (int, varchar, date, numeric)  
* Null status (NULL or NOT NULL)  
* Default values  
* Data constraints

Surrogate Keys:

* System-generated identifiers  
* Used when natural keys are inefficient  
* Example: AUTO\_INCREMENT in MySQL

---

## **Slide 19: Case Study \- Honoria Sanchez Designs**

Business Context:

* Interior designer specializing in kitchens  
* Free seminars at various locations  
* Sells books and videos  
* Custom design consulting

Key Entities:

* SEMINAR, CUSTOMER, CONTACT, PRODUCT, INVOICE

---

## **Slide 20: Honoria Sanchez Database Schema**

sql

SEMINAR (SeminarID, SeminarDate, SeminarTime, Location, SeminarTitle)  
CUSTOMER (CustomerID, LastName, FirstName, EmailAddress,   
          EncryptedPassword, Phone, Address, City, State, ZIP)  
SEMINAR\_CUSTOMER (SeminarID(FK), CustomerID(FK))  
CONTACT (CustomerID(FK), ContactNumber, ContactDate, ContactType)  
PRODUCT (ProductNumber, ProductType, Description, UnitPrice, Quantity)  
INVOICE (InvoiceNumber, InvoiceDate, CustomerID(FK), PaymentType,   
         SubTotal, Shipping, Tax, Total)  
LINE\_ITEM (InvoiceNumber(FK), LineNumber, ProductNumber(FK), 

           Quantity, UnitPrice, Total)

---

## **Slide 21: ERD Tools \- Lucidchart**

Visual Drag-and-Drop Tool:

* User-friendly interface  
* Real-time collaboration  
* Extensive shape libraries  
* Enhanced ERD (EERD) features  
* AI-assisted diagram generation

Best For:

* Business analysts and designers  
* Collaborative design sessions  
* Professional documentation

---

## **Slide 22: ERD Tools \- Mermaid**

Text-Based Diagramming:

* Markdown-inspired syntax  
* Version control friendly  
* Easy integration with documentation  
* Crow's Foot notation support

Example Syntax:

text

\`\`\`mermaid  
erDiagram  
    CUSTOMER ||--o{ ORDER : places  
    CUSTOMER {  
        string customerId PK  
        string name  
    }

\`\`\`

Best For:

* Developers and technical writers  
* Documentation in markdown  
* AI-assisted workflows

---

## **Slide 23: Integration Approaches**

Hybrid Workflow:

1. Design in Lucidchart for collaboration  
2. Document with Mermaid for version control  
3. Implement in database management system

Lucidchart Features:

* Import Mermaid code for visualization  
* Professional formatting and styling  
* Team collaboration features

Mermaid Advantages:

* Text-based for easy editing  
* Perfect for technical documentation  
* AI prompt compatibility

---

## **Slide 24: Chapter Summary**

Key Takeaways:

* Database design is crucial for data integrity and performance  
* E-R diagrams visually represent data requirements  
* Relationships have cardinality rules that enforce business logic  
* Transformation to relational design follows specific patterns  
* Normalization eliminates anomalies while denormalization may improve performance  
* Modern tools support both visual and text-based approaches

---

## **Slide 25: Key Terms**

* Entity-Relationship Diagram (ERD)  
* Cardinality (Maximum, Minimum)  
* Weak Entity (ID-dependent, Non-ID-dependent)  
* Associative Entity  
* Recursive Relationship  
* Surrogate Key  
* Normalization (1NF, 2NF, 3NF, BCNF)  
* Denormalization  
* Crow's Foot Notation

---

## **Slide 26: Review Questions**

1. What are the three main components of an ERD and how are they represented?  
2. Explain the difference between maximum and minimum cardinality with examples.  
3. How do ID-dependent weak entities differ from non-ID-dependent weak entities?  
4. Describe the process for transforming M:N relationships into relational tables.  
5. When should you consider denormalization in database design?

---

## **Slide 27: Exercises**

1. Create an ERD for a hospital management system using crow's foot notation  
2. Normalize a denormalized table to 3NF and explain each step  
3. Transform your hospital ERD into a complete relational schema  
4. Create the same ERD using both Lucidchart and Mermaid  
5. Compare and contrast the two approaches

---

## **Slide 28: Next Steps**

In Chapter 5, we will explore:

* SQL Data Definition Language (DDL)  
* Creating tables from database designs  
* Implementing relationships with foreign keys  
* SQL Data Manipulation Language (DML)  
* Querying relational databases

---

## **Slide 29: References & Resources**

Textbook:

* Kroenke, D. M., Auer, D. J., Vandenberg, S. L., & Yoder, R. C. (2024). *Database Concepts* (10th ed.)

Tools:

* Lucidchart: [https://www.lucidchart.com/](https://www.lucidchart.com/)  
* Mermaid: [https://mermaid.js.org/](https://mermaid.js.org/)  
* MySQL Workbench  
* Microsoft Access

---

## **Slide 30: Questions & Discussion**

Thank You\!

*Questions?*  
I want more elaboration on using mermaid

We are creating a slide deck that includes a section on using Mermaid for ERD. We'll elaborate on Mermaid's syntax and capabilities for creating ERDs, and provide examples.

Let's break down the content for the Mermaid section:

1. Introduction to Mermaid  
2. Basic ERD Syntax in Mermaid  
3. Defining Entities and Attributes  
4. Defining Relationships  
5. Cardinality Notation  
6. Example ERD in Mermaid  
7. Advantages of Using Mermaid for ERD  
8. How to Render Mermaid Diagrams

We'll create several slides for this section.

# **Chapter 4: Database Design and Modeling**

## **Using Mermaid for Entity-Relationship Diagrams**

---

## **Slide 1: Introduction to Mermaid for ERD**

### **What is Mermaid?**

* Text-based diagramming tool using markdown-inspired syntax  
* JavaScript-based \- runs in browsers and markdown editors  
* Version control friendly \- diagrams as code  
* Perfect for documentation and technical writing

### **Key Advantages:**

* Text-based, so it's developer-friendly  
* Easily version controlled with Git  
* Integrates with documentation (GitHub, GitLab, docs)  
* AI-compatible \- can generate and modify with AI tools

---

## **Slide 2: Mermaid ERD Basic Structure**

### **Basic Syntax Template:**

markdown

\`\`\`mermaid  
erDiagram  
    ENTITY\_NAME {  
        data\_type attribute\_name PK  
        data\_type attribute\_name FK  
        data\_type attribute\_name  
    }  
      
    ENTITY\_1 ||--|| ENTITY\_2 : relationship\_label  
    ENTITY\_1 ||--o{ ENTITY\_3 : relationship\_label

\`\`\`

### **Core Components:**

* Entities: Defined with ENTITY\_NAME { attributes }  
* Attributes: Listed with data types and constraints  
* Relationships: Defined with cardinality symbols  
* Cardinality: Expressed with specific symbols

---

## **Slide 3: Entity and Attribute Definition**

### **Defining Entities:**

### **Attribute Syntax:**

* data\_type attribute\_name PK \- Primary Key  
* data\_type attribute\_name FK \- Foreign Key  
* data\_type attribute\_name \- Regular attribute

### **Common Data Types:**

* string, int, decimal, date, datetime, boolean

---

## **Slide 4: Relationship Cardinality in Mermaid**

### **Cardinality Symbols:**

| Symbol | Meaning | Description |  |  |  |  |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| \` |  | \-- |  | \` | One-to-One | Exactly one to exactly one |
| \` |  | \--o{\` | One-to-Many | One to zero or more |  |  |
| \`}o-- |  | \` | Many-to-One | Zero or more to one |  |  |
| }o--o{ | Many-to-Many | Zero or more to zero or more |  |  |  |  |
| \` |  | \-- | {\` | One-to-Many (at least one) | One to one or more |  |

### **Reading Direction:**

* Left side symbol applies to the left entity  
* Right side symbol applies to the right entity

---

## **Slide 5: Basic ERD Example**

### **Simple University Schema:**

markdown

\`\`\`mermaid  
erDiagram  
    STUDENT {  
        string student\_id PK  
        string first\_name  
        string last\_name  
        string email  
        date enrollment\_date  
    }  
      
    COURSE {  
        string course\_code PK  
        string course\_name  
        int credits  
    }  
      
    STUDENT ||--o{ ENROLLMENT : enrolls\_in  
    COURSE ||--o{ ENROLLMENT : has\_enrollments

\`\`\`

---

## **Slide 6: Complete ERD Example**

### **University Database with Attributes:**

markdown

\`\`\`mermaid  
erDiagram  
    STUDENT {  
        string student\_id PK  
        string first\_name  
        string last\_name  
        string email  
        date enrollment\_date  
    }  
      
    COURSE {  
        string course\_code PK  
        string course\_name  
        int credits  
        string department  
    }  
      
    ENROLLMENT {  
        string student\_id FK  
        string course\_code FK  
        date enrollment\_date  
        string grade  
    }  
      
    DEPARTMENT {  
        string dept\_code PK  
        string dept\_name  
        string building  
    }  
      
    STUDENT ||--o{ ENROLLMENT : enrolls\_in  
    COURSE ||--o{ ENROLLMENT : has\_enrollments  
    DEPARTMENT ||--o{ COURSE : offers

\`\`\`

---

## **Slide 7: Complex Relationships**

### **Multiple Relationship Types:**

markdown

\`\`\`mermaid  
erDiagram  
    EMPLOYEE {  
        int employee\_id PK  
        string name  
        string position  
        int department\_id FK  
        int manager\_id FK  
    }  
      
    DEPARTMENT {  
        int department\_id PK  
        string dept\_name  
        int manager\_id FK  
    }  
      
    PROJECT {  
        int project\_id PK  
        string project\_name  
        decimal budget  
    }  
      
    EMPLOYEE ||--o{ DEPARTMENT : works\_in  
    DEPARTMENT ||--|| EMPLOYEE : managed\_by  
    EMPLOYEE }o--|| EMPLOYEE : reports\_to  
    EMPLOYEE }o--o{ PROJECT : assigned\_to

\`\`\`

---

## **Slide 8: Weak Entities and Composite Keys**

### **ID-Dependent Weak Entity:**

markdown

\`\`\`mermaid  
erDiagram  
    BUILDING {  
        string building\_id PK  
        string building\_name  
        string address  
    }  
      
    APARTMENT {  
        string building\_id FK  
        string apartment\_number  
        int bedrooms  
        decimal rent  
    }  
      
    BUILDING ||--o{ APARTMENT : contains  
      
    *%% Composite key: (building\_id, apartment\_number)*

\`\`\`

### **Note: Mermaid doesn't explicitly support composite keys in syntax, but you can document them in comments**

---

## **Slide 9: Enhanced ERD Features**

### **Subtype Relationships:**

markdown

\`\`\`mermaid  
erDiagram  
    VEHICLE {  
        string vin PK  
        string make  
        string model  
        int year  
        string vehicle\_type  
    }  
      
    CAR {  
        string vin FK  
        int doors  
        string car\_type  
    }  
      
    TRUCK {  
        string vin FK  
        decimal cargo\_capacity  
        int axles  
    }  
      
    VEHICLE ||--|| CAR : is\_a  
    VEHICLE ||--|| TRUCK : is\_a

\`\`\`

---

## **Slide 10: Relationship Labels and Descriptions**

### **Descriptive Relationship Labels:**

markdown

\`\`\`mermaid  
erDiagram  
    DOCTOR {  
        int doctor\_id PK  
        string name  
        string specialty  
    }  
      
    PATIENT {  
        int patient\_id PK  
        string name  
        date date\_of\_birth  
    }  
      
    APPOINTMENT {  
        int appointment\_id PK  
        int doctor\_id FK  
        int patient\_id FK  
        datetime appointment\_time  
        string status  
    }  
      
    DOCTOR ||--o{ APPOINTMENT : "schedules appointment with"  
    PATIENT ||--o{ APPOINTMENT : "books appointment with"  
      
    DOCTANT }o--o{ PATIENT : "treats"

\`\`\`

---

## **Slide 11: Mermaid Configuration Options**

### **Styling and Configuration:**

markdown

\`\`\`mermaid  
erDiagram  
    CUSTOMER {  
        string customer\_id PK  
        string name  
        string email  
    }  
      
    ORDER {  
        string order\_id PK  
        string customer\_id FK  
        date order\_date  
        decimal total  
    }  
      
    CUSTOMER ||--o{ ORDER : places  
      
    *%% Optional configuration*  
    CUSTOMER {  
        background-color: \#e1f5fe  
    }  
      
    ORDER {  
        background-color: \#f3e5f5  
    }

\`\`\`

### **Themes Available:**

* default, forest, dark, neutral  
* Custom CSS styling

---

## **Slide 12: Practical Workflow with Mermaid**

### **Development Workflow:**

1. Design in Mermaid syntax  
2. Version control with Git  
3. Integrate with documentation  
4. Collaborate using code review processes

### **Tools that Support Mermaid:**

* GitHub/GitLab markdown files  
* VS Code with Mermaid extension  
* Obsidian notes  
* Notion (with some limitations)  
* Documentation generators (MkDocs, Docusaurus)

---

## **Slide 13: Mermaid vs. Visual Tools Comparison**

| Aspect | Mermaid | Lucidchart/[Draw.io](https://draw.io/) |
| :---- | :---- | :---- |
| Syntax | Text-based | Visual drag-and-drop |
| Version Control | Excellent | Limited |
| Collaboration | Code review | Real-time visual |
| Learning Curve | Developer-friendly | Business-user friendly |
| Integration | Docs as code | Export images |
| AI Compatibility | Excellent | Limited |

---

## **Slide 14: Mermaid with AI Assistance**

### **AI Prompt Examples:**

text

"Create a Mermaid ERD for an e-commerce system with   
Customers, Orders, Products, and Categories. 

Include appropriate relationships and attributes."

text

"Convert this database schema to Mermaid ERD syntax:  
\- Students (id, name, email)  
\- Courses (code, title, credits)  

\- Enrollments (student\_id, course\_code, grade)"

### **Benefits:**

* AI can generate and modify Mermaid code easily  
* Consistent syntax is AI-friendly  
* Easy to validate and correct

---

## **Slide 15: Advanced Mermaid Features**

### **Complex Database Schema:**

markdown

\`\`\`mermaid  
erDiagram  
    CUSTOMER {  
        string customer\_id PK  
        string company\_name  
        string contact\_name  
        string phone  
    }  
      
    ORDER {  
        int order\_id PK  
        string customer\_id FK  
        int employee\_id FK  
        date order\_date  
        date required\_date  
    }  
      
    ORDER\_DETAIL {  
        int order\_id FK  
        int product\_id FK  
        decimal unit\_price  
        int quantity  
        decimal discount  
    }  
      
    PRODUCT {  
        int product\_id PK  
        string product\_name  
        int category\_id FK  
        decimal unit\_price  
        int units\_in\_stock  
    }  
      
    CATEGORY {  
        int category\_id PK  
        string category\_name  
        string description  
    }  
      
    CUSTOMER ||--o{ ORDER : places  
    ORDER ||--o{ ORDER\_DETAIL : contains  
    PRODUCT ||--o{ ORDER\_DETAIL : included\_in  
    CATEGORY ||--o{ PRODUCT : categorizes

\`\`\`

---

## **Slide 16: Best Practices for Mermaid ERD**

### **Code Organization:**

1. Group related entities together  
2. Use consistent naming conventions  
3. Add comments for complex relationships  
4. Break large diagrams into smaller ones  
5. Use descriptive relationship labels

### **Readability Tips:**

* Order entities logically (parents before children)  
* Use line breaks between entity groups  
* Include both PK and FK markers  
* Document assumptions in comments

---

## **Slide 17: Hands-On Exercise**

### **Exercise: Create a Library System ERD**

Create a Mermaid ERD for a library management system with:

* Members (member\_id, name, email, join\_date)  
* Books (isbn, title, author, publication\_year)  
* Loans (loan\_id, member\_id, isbn, loan\_date, due\_date)  
* Authors (author\_id, name, nationality)

### **Requirements:**

* A member can borrow multiple books  
* A book can be borrowed by multiple members over time  
* Authors can write multiple books  
* Books can have multiple authors

---

## **Slide 18: Exercise Solution**

### **Library System Solution:**

markdown

\`\`\`mermaid  
erDiagram  
    MEMBER {  
        string member\_id PK  
        string name  
        string email  
        date join\_date  
    }  
      
    BOOK {  
        string isbn PK  
        string title  
        int publication\_year  
    }  
      
    LOAN {  
        string loan\_id PK  
        string member\_id FK  
        string isbn FK  
        date loan\_date  
        date due\_date  
        date return\_date  
    }  
      
    AUTHOR {  
        string author\_id PK  
        string name  
        string nationality  
    }  
      
    BOOK\_AUTHOR {  
        string isbn FK  
        string author\_id FK  
    }  
      
    MEMBER ||--o{ LOAN : borrows  
    BOOK ||--o{ LOAN : is\_borrowed  
    BOOK ||--o{ BOOK\_AUTHOR : written\_by  
    AUTHOR ||--o{ BOOK\_AUTHOR : writes

\`\`\`

---

## **Slide 19: Integration with Documentation**

### **GitHub/GitLab Markdown:**

markdown

\# Database Schema

\#\# Entity-Relationship Diagram

\`\`\`mermaid  
erDiagram  
    USER {  
        int user\_id PK  
        string username  
        string email  
    }  
    \-- rest of schema \--  
\`\`\`

\#\# Table Definitions

\- **\*\*USERS\*\***: Stores user account information  
\- **\*\*POSTS\*\***: User-generated content

\- **\*\*COMMENTS\*\***: Responses to posts

### **Benefits:**

* Documentation stays with code  
* Automatic updates when schema changes  
* Single source of truth

---

## **Slide 20: Common Pitfalls and Solutions**

### **Common Issues:**

1. Syntax errors \- missing brackets or commas  
2. Relationship confusion \- wrong cardinality symbols  
3. Overly complex diagrams \- too many entities  
4. Inconsistent naming \- mixed conventions

### **Solutions:**

* Use Mermaid Live Editor for testing  
* Start with simple relationships  
* Break large schemas into multiple diagrams  
* Establish naming conventions early

---

## **Slide 21: Mermaid Resources and Tools**

### **Official Resources:**

* [Mermaid.js.org](https://mermaid.js.org/) \- Official documentation  
* Mermaid Live Editor \- Online testing tool  
* GitHub Repository \- Source code and issues

### **Development Tools:**

* VS Code Extension \- Mermaid preview  
* Mermaid CLI \- Command line tool  
* Mermaid Plugins \- For various platforms

### **Learning Resources:**

* Interactive tutorials  
* Example gallery  
* Community forums

---

## **Slide 22: Summary \- Mermaid for ERD**

### **Key Benefits:**

* ✅ Text-based \- developer friendly  
* ✅ Version controllable \- works with Git  
* ✅ Documentation integrated \- markdown compatible  
* ✅ AI-friendly \- easy to generate and modify  
* ✅ Free and open source \- no licensing costs

### **Ideal Use Cases:**

* Technical documentation  
* Database design in development teams  
* API documentation  
* Educational materials  
* AI-assisted design processes

---

## **Slide 23: Next Steps with Mermaid**

### **Advanced Topics to Explore:**

* Custom styling and themes  
* Interactive diagrams with click events  
* Integration with CI/CD pipelines  
* Automated documentation generation  
* Custom Mermaid extensions

### **Practice Recommendations:**

1. Start with simple schemas  
2. Practice cardinality notation  
3. Experiment with different diagram types  
4. Integrate with your documentation workflow

---

## **Slide 24: Questions and Practice**

### **Practice Exercise:**

Convert the Honoria Sanchez Designs schema from Chapter 4 into Mermaid ERD syntax.

### **Discussion Questions:**

1. When would you choose Mermaid over visual tools like Lucidchart?  
2. How can Mermaid improve collaboration in development teams?  
3. What limitations have you encountered with Mermaid?  
4. How would you integrate Mermaid into your current workflow?

---

## **Slide 25: Additional Resources**

### **Quick Reference Card:**

text

Entity:      ENTITY { attribute type name PK }  
1:1:         ||--||  
1:Many:      ||--o{  
Many:1:      }o--||

Many:Many:   }o--o{

### **Useful Links:**

* Mermaid Official Docs: [https://mermaid.js.org/](https://mermaid.js.org/)  
* Live Editor: [https://mermaid.live/](https://mermaid.live/)  
* GitHub: [https://github.com/mermaid-js/mermaid](https://github.com/mermaid-js/mermaid)  
* VS Code Extension: "Mermaid Preview"

---

## **Slide 26: End of Mermaid Section**

### **Key Takeaways:**

* Mermaid provides a text-based approach to ERD creation  
* Perfect for developers and technical documentation  
* Integrates seamlessly with modern development workflows  
* AI-compatible for rapid prototyping and iteration

### **Next:**

We'll explore how to integrate Mermaid with visual tools like Lucidchart for a complete database design workflow.

# **Tab 5**

Perfect — we have everything needed.

Below is a **textbook chapter draft** integrating **Chapters 4 and 5 of Kroenke’s Database Concepts (10e)** with pedagogical commentary, examples, and contextual explanations suitable for your BITM 330 course.

---

# **Chapter X: From Data Models to Database Design**

## **1\. Introduction**

Designing a database is the process of transforming abstract business requirements into a structured, relational data model that can be implemented in a database management system (DBMS).  
 This chapter introduces the complete life cycle of data modeling and database design—from conceptual thinking using **Entity-Relationship (E-R) models** to **logical relational structures** that define how data is stored, connected, and maintained.

Students will learn how to:

* Build and interpret **E-R models**

* Represent entities, attributes, and relationships

* Apply **normalization** to remove redundancy

* Understand **weak entities**, **subtypes**, and **recursive relationships**

* Translate conceptual models into **relational database designs**

---

## **2\. Systems Analysis and the Role of the Data Model**

Every information system begins with **analysis**—understanding what information the business needs and how that information flows through processes.  
 This process is formalized through the **Systems Development Life Cycle (SDLC)**:

1. **System Definition** – Define goals, scope, and feasibility.

2. **Requirements Analysis** – Gather information through interviews, forms, reports, and business rules.

3. **Component Design** – Create specifications for hardware, software, and **database design**.

4. **Implementation** – Build, test, and deploy the system.

5. **Maintenance** – Monitor, refine, and enhance as needed.

The **database design phase** focuses on data: what should be stored, how it relates, and how users access it.

---

## **3\. Data Modeling and the Entity-Relationship Model**

### **3.1. Entities and Attributes**

* **Entity:** Something users want to track (e.g., Student, Course, Deliverable).

* **Entity Class:** The collection of all entities of one type.

* **Entity Instance:** A single occurrence (e.g., Student 2001).

* **Attributes:** Descriptive fields of entities (Name, GPA, Phone).

* **Identifiers:** Unique attributes (StudentID, InvoiceNumber).

Entities are shown as **rectangles**, and attributes are listed inside or connected by ovals.

### **3.2. Relationships**

Entities associate with others through **relationships**:

* **1:1 (One-to-One)** – Each instance relates to one other instance.

* **1:N (One-to-Many)** – One parent relates to multiple children.

* **N:M (Many-to-Many)** – Multiple instances of each relate to each other.

The **degree** of a relationship refers to how many entity classes are involved (binary \= 2, ternary \= 3).

---

## **4\. Cardinality and Crow’s Foot Notation**

**Cardinality** defines how many instances of one entity relate to another:

* **Maximum cardinality:** 1 or many (shown as a line or crow’s foot).

* **Minimum cardinality:** 0 or 1 (shown as a circle or dash).

For example:  
 A `Student` can enroll in many `Classes`, but each enrollment belongs to **exactly one** student.

Crow’s Foot notation is the modern standard:

* **|—** means one and only one

* **O—** means zero or one

* **\<—** means many

---

## **5\. Weak, Strong, and Associative Entities**

* **Strong Entity:** Exists independently (e.g., Customer).

* **Weak Entity:** Depends on another for existence (e.g., OrderLine needs Order).

* **ID-Dependent Weak Entity:** Primary key includes the parent’s key.

* **Associative (Intersection) Entity:** Used to represent **N:M** relationships with attributes of its own (e.g., Enrollment links Student and Course with a Grade field).

---

## **6\. Subtypes, Supertypes, and Recursive Relationships**

* **Subtype:** A special case of a supertype (e.g., Vehicle → Car, Truck).

* **Discriminator:** An attribute that determines the subtype.

* **Recursive Relationship:** An entity related to itself (e.g., Employee supervises Employee).

---

## **7\. From Data Models to Database Design**

### **7.1. The Three Levels of Design**

1. **Conceptual Design:** Abstract model (E-R diagrams).

2. **Logical Design:** Relational schema—tables, keys, relationships.

3. **Physical Design:** Implementation details—data types, indexes, constraints.

---

## **8\. Transforming the E-R Model into a Relational Design**

### **Step 1\. Create a Table for Each Entity**

Each entity becomes a **table**; attributes become **columns**.

Example:

CREATE TABLE Student (  
  StudentID INT PRIMARY KEY,  
  StudentName VARCHAR(50),  
  Major VARCHAR(30)  
);

### **Step 2\. Add Keys and Relationships**

* **Primary Key (PK):** Uniquely identifies each record.

* **Foreign Key (FK):** Links related tables.

**1:N Relationship:**  
 The PK from the **1-side** is added as an FK in the **N-side**.

**N:M Relationship:**  
 Create a **new intersection table** combining both keys.

### **Step 3\. Specify Column Properties**

Each column has:

* Data type (`INT`, `DATE`, `VARCHAR`)

* Constraints (`NOT NULL`, `DEFAULT`)

* Referential integrity rules (e.g., `ON DELETE CASCADE`)

---

## **9\. Normalization and Denormalization**

### **9.1. The Normalization Process**

Normalization removes redundancy and update anomalies by splitting data into logical tables.  
 Common forms include:

* **1NF:** Each cell holds one value.

* **2NF:** All non-key attributes depend on the whole key.

* **3NF:** No transitive dependencies.

* **BCNF:** Advanced rule to ensure all determinants are candidate keys.

### **9.2. When to Denormalize**

Denormalization combines tables for **performance** or **simplicity** when:

* Queries require excessive joins.

* Performance outweighs design purity.

---

## **10\. Representing Relationships in Practice**

| Relationship Type | Technique in Relational Model |
| ----- | ----- |
| 1:1 | Place PK of either table as FK in the other |
| 1:N | Place PK of parent in child table |
| N:M | Create intersection table with both PKs |
| Recursive | Use FK referencing same table |

---

## **11\. Practical Example – Honoria Sanchez Designs**

The Honoria Sanchez case demonstrates a full transformation from E-R model to relational design.

### **Entities:**

* Customer

* Contact

* Invoice

* LineItem

* Product

* Seminar

Each table specifies:

* **Primary Key** (e.g., `CustomerID`)

* **Foreign Keys** (e.g., `InvoiceNumber` in LineItem)

* **Data types** (`CHAR(25)`, `NUMERIC(9,2)`)

* **Constraints** (required, default values)

Relationships:

* `Customer` → `Contact` (1:N)

* `Invoice` → `LineItem` (1:N)

* `Product` → `LineItem` (1:N)

* `Customer` → `Invoice` (1:N)

---

## **12\. Database Implementation and Integrity**

Referential integrity ensures consistency across relationships:

* Foreign keys must match existing primary keys.

* Deleting a parent record cascades or restricts child deletions.

* Surrogate keys (like auto-increment IDs) simplify joins and indexing.

---

## **13\. Review Questions**

1. What is the difference between an entity class and an entity instance?

2. How is an N:M relationship represented in the relational model?

3. Why would you use denormalization?

4. What is an associative entity, and how is it different from a weak entity?

5. Explain the use of surrogate keys and their practical benefits.

---

## **14\. Summary**

Database design is both a science and an art. It requires:

* Logical thinking to build relationships and keys

* Understanding of normalization to ensure data integrity

* Pragmatic judgment to balance complexity and performance

From **E-R diagrams** to **SQL tables**, the process ensures that data is not only stored but also meaningful, efficient, and ready to support business decision-making.

---

Would you like me to include:

* The **Honoria Sanchez database schema tables** (with full column metadata from the slides)

* Or rewrite this as a **formatted Markdown EPUB-ready textbook chapter**?

# **Tab 6**

# **Using Mermaid for Entity-Relationship Diagrams**

## **Introduction to Mermaid ERD**

Mermaid is a powerful JavaScript-based diagramming tool that uses text-based syntax to create diagrams, including Entity-Relationship Diagrams (ERDs). Unlike visual drag-and-drop tools, Mermaid allows developers and technical writers to create and maintain database diagrams using simple, readable code that can be version-controlled and integrated directly into documentation.

### **Why Choose Mermaid for ERD?**

* Text-Based: Write diagrams as code, making them easy to edit, version, and collaborate on  
* Version Control Friendly: Store ERD code in Git repositories alongside your database schemas  
* Documentation Integration: Embed diagrams directly in markdown files, wikis, and technical documentation  
* AI Compatibility: Easy for AI tools to generate and modify diagram code  
* Platform Independent: Runs anywhere JavaScript is supported

## **Basic Mermaid ERD Syntax**

### **Core Structure**

All Mermaid ER diagrams begin with the erDiagram declaration followed by entity definitions and relationships:

markdown

\`\`\`mermaid  
erDiagram  
    ENTITY\_NAME {  
        data\_type attribute\_name PK  
        data\_type attribute\_name FK  
        data\_type attribute\_name  
    }  
      
    ENTITY\_1 ||--|| ENTITY\_2 : relationship\_label

\`\`\`

### **Defining Entities and Attributes**

Entities are defined with their attributes listed inside curly braces. Each attribute follows the pattern: data\_type attribute\_name constraints

Example:

markdown

\`\`\`mermaid  
erDiagram  
    CUSTOMER {  
        string customer\_id PK  
        string first\_name  
        string last\_name  
        string email  
        date created\_date  
    }  
      
    ORDER {  
        int order\_id PK  
        string customer\_id FK  
        date order\_date  
        decimal total\_amount  
    }

\`\`\`

### **Supported Data Types**

Mermaid doesn't enforce specific data types, but common conventions include:

* string for text data  
* int for integers  
* decimal or float for numbers with decimals  
* date, datetime for temporal data  
* boolean for true/false values

### **Primary and Foreign Keys**

* PK marks an attribute as a primary key  
* FK marks an attribute as a foreign key  
* Composite keys require manual documentation in comments

## **Relationship Cardinality Notation**

Mermaid uses specific symbols to represent relationship cardinality:

### **Cardinality Symbols**

| Symbol | Meaning | Description |  |  |  |  |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| \` |  | \-- |  | \` | One-to-One | Exactly one to exactly one |
| \` |  | \--o{\` | One-to-Many | One to zero or more |  |  |
| \`}o-- |  | \` | Many-to-One | Zero or more to one |  |  |
| }o--o{ | Many-to-Many | Zero or more to zero or more |  |  |  |  |
| \` |  | \-- | {\` | One-to-Many (at least one) | One to one or more |  |
| \`} | \-- |  | \` | Many-to-One (at least one) | One or more to one |  |

### **Reading Relationship Syntax**

The relationship syntax follows this pattern:

text

ENTITY\_1 \[CARDINALITY\_1\]--\[CARDINALITY\_2\] ENTITY\_2 : "relationship\_label"

Where:

* CARDINALITY\_1 applies to ENTITY\_1  
* CARDINALITY\_2 applies to ENTITY\_2  
* The relationship label describes the nature of the relationship

## **Complete ERD Examples**

### **Simple University Database**

markdown

\`\`\`mermaid  
erDiagram  
    STUDENT {  
        string student\_id PK  
        string first\_name  
        string last\_name  
        string email  
        date enrollment\_date  
    }  
      
    COURSE {  
        string course\_code PK  
        string course\_name  
        int credits  
        string department  
    }  
      
    ENROLLMENT {  
        string student\_id FK  
        string course\_code FK  
        date enrollment\_date  
        string grade  
    }  
      
    STUDENT ||--o{ ENROLLMENT : enrolls\_in  
    COURSE ||--o{ ENROLLMENT : has\_enrollments

\`\`\`

### **E-Commerce System**

markdown

\`\`\`mermaid  
erDiagram  
    CUSTOMER {  
        string customer\_id PK  
        string first\_name  
        string last\_name  
        string email  
        string phone  
    }  
      
    ORDER {  
        int order\_id PK  
        string customer\_id FK  
        date order\_date  
        string status  
        decimal total  
    }  
      
    PRODUCT {  
        int product\_id PK  
        string product\_name  
        string description  
        decimal price  
        int stock\_quantity  
    }  
      
    ORDER\_ITEM {  
        int order\_id FK  
        int product\_id FK  
        int quantity  
        decimal unit\_price  
    }  
      
    CATEGORY {  
        int category\_id PK  
        string category\_name  
        string description  
    }  
      
    CUSTOMER ||--o{ ORDER : places  
    ORDER ||--o{ ORDER\_ITEM : contains  
    PRODUCT ||--o{ ORDER\_ITEM : included\_in  
    CATEGORY ||--o{ PRODUCT : categorizes

\`\`\`

## **Advanced Mermaid ERD Features**

### **Weak Entity Representation**

While Mermaid doesn't have explicit syntax for weak entities, you can represent them using comments and relationship labels:

markdown

\`\`\`mermaid  
erDiagram  
    BUILDING {  
        string building\_id PK  
        string building\_name  
        string address  
    }  
      
    APARTMENT {  
        string building\_id FK  
        string apartment\_number  
        int bedrooms  
        decimal rent  
    }  
      
    BUILDING ||--o{ APARTMENT : contains  
      
    %% Apartment is a weak entity with composite key (building\_id, apartment\_number)

\`\`\`

### **Recursive Relationships**

Represent self-referencing relationships using the same entity on both sides:

markdown

\`\`\`mermaid  
erDiagram  
    EMPLOYEE {  
        int employee\_id PK  
        string name  
        string position  
        int manager\_id FK  
    }  
      
    EMPLOYEE }o--|| EMPLOYEE : reports\_to

\`\`\`

### **Subtype/Supertype Relationships**

Model inheritance relationships using one-to-one relationships:

markdown

\`\`\`mermaid  
erDiagram  
    VEHICLE {  
        string vin PK  
        string make  
        string model  
        int year  
        string vehicle\_type  
    }  
      
    CAR {  
        string vin FK  
        int doors  
        string car\_type  
    }  
      
    TRUCK {  
        string vin FK  
        decimal cargo\_capacity  
        int axles  
    }  
      
    VEHICLE ||--|| CAR : is\_a  
    VEHICLE ||--|| TRUCK : is\_a

\`\`\`

## **Styling and Configuration**

### **Basic Styling**

Mermaid supports limited styling options through configuration:

markdown

\`\`\`mermaid  
erDiagram  
    CUSTOMER {  
        string customer\_id PK  
        string name  
        string email  
    }  
      
    ORDER {  
        int order\_id PK  
        string customer\_id FK  
        date order\_date  
    }  
      
    CUSTOMER ||--o{ ORDER : places  
      
    %% Styling (if supported by your renderer)  
    CUSTOMER {  
        background-color: \#e1f5fe  
    }  
      
    ORDER {  
        background-color: \#f3e5f5  
    }

\`\`\`

### **Themes**

Mermaid supports different themes that can be set in the configuration:

* default  
* forest  
* dark  
* neutral

## **Integration with Documentation**

### **GitHub/GitLab Markdown**

Mermaid is natively supported in GitHub and GitLab markdown files:

markdown

**\# Database Schema Documentation**

**\#\# Entity-Relationship Diagram**

\`\`\`mermaid  
erDiagram  
    USER {  
        int user\_id PK  
        string username  
        string email  
    }  
      
    POST {  
        int post\_id PK  
        int user\_id FK  
        string title  
        text content  
    }  
      
    USER ||--o{ POST : writes  
\`\`\`

**\#\# Table Descriptions**

\- **\*\*USERS\*\***: Stores user account information

\- **\*\*POSTS\*\***: User-generated content

### **VS Code Integration**

Install the Mermaid extension for VS Code to preview diagrams in real-time:

1. Install "Mermaid Preview" extension  
2. Create a .md file with Mermaid code blocks  
3. Use the preview pane to see rendered diagrams

## **Best Practices for Mermaid ERD**

### **Code Organization**

1. Group Related Entities: Keep entities that have relationships close together in the code  
2. Consistent Naming: Use consistent naming conventions for entities and attributes  
3. Descriptive Labels: Use meaningful relationship labels  
4. Comments: Add comments to explain complex relationships or constraints

### **Readability Tips**

* Use line breaks between entity groups  
* Order entities logically (parents before children)  
* Keep diagrams focused \- break large schemas into multiple diagrams  
* Use consistent indentation

### **Example of Well-Organized ERD**

markdown

\`\`\`mermaid  
erDiagram  
    %% User Management Entities  
    USER {  
        int user\_id PK  
        string username  
        string email  
        date created\_at  
    }  
      
    PROFILE {  
        int user\_id FK  
        string first\_name  
        string last\_name  
        date date\_of\_birth  
    }  
      
    USER ||--|| PROFILE : has  
      
    %% Content Management Entities  
    POST {  
        int post\_id PK  
        int user\_id FK  
        string title  
        text content  
        date published\_at  
    }  
      
    COMMENT {  
        int comment\_id PK  
        int post\_id FK  
        int user\_id FK  
        text content  
        date created\_at  
    }  
      
    USER ||--o{ POST : writes  
    USER ||--o{ COMMENT : writes  
    POST ||--o{ COMMENT : has

\`\`\`

## **Common Patterns and Solutions**

### **Many-to-Many Relationships**

Always use junction tables for many-to-many relationships:

markdown

\`\`\`mermaid  
erDiagram  
    STUDENT {  
        string student\_id PK  
        string name  
    }  
      
    COURSE {  
        string course\_code PK  
        string title  
    }  
      
    ENROLLMENT {  
        string student\_id FK  
        string course\_code FK  
        date enrolled\_date  
        string grade  
    }  
      
    STUDENT ||--o{ ENROLLMENT : enrolls\_in  
    COURSE ||--o{ ENROLLMENT : has\_students

\`\`\`

### **Self-Referencing Relationships**

For hierarchical data:

markdown

\`\`\`mermaid  
erDiagram  
    EMPLOYEE {  
        int employee\_id PK  
        string name  
        int manager\_id FK  
    }  
      
    EMPLOYEE }o--|| EMPLOYEE : reports\_to

\`\`\`

## **Tools and Workflow**

### **Development Workflow**

1. Design: Create initial ERD in Mermaid syntax  
2. Version Control: Commit to Git repository  
3. Document: Integrate with markdown documentation  
4. Collaborate: Use code review processes for changes  
5. Maintain: Update as database schema evolves

### **Supported Platforms**

* GitHub/GitLab: Native Mermaid support in markdown  
* VS Code: With Mermaid preview extension  
* Obsidian: Native support in notes  
* Notion: Limited support  
* Documentation Generators: MkDocs, Docusaurus, etc.

## **Troubleshooting Common Issues**

### **Syntax Errors**

* Missing Braces: Ensure all entities have opening and closing braces  
* Relationship Format: Verify cardinality symbols are correct  
* Attribute Format: Use proper type name constraint format

### **Rendering Issues**

* Platform Support: Confirm your platform supports Mermaid  
* Version Compatibility: Some features may require specific Mermaid versions  
* Theme Conflicts: Check if custom themes affect rendering

## **Conclusion**

Mermaid provides a powerful, text-based approach to creating Entity-Relationship Diagrams that integrates seamlessly with modern development workflows. By treating diagrams as code, teams can version control their database designs, collaborate effectively, and maintain accurate documentation that evolves with their systems.

The simplicity of Mermaid's syntax makes it accessible for developers while providing enough expressiveness to model complex database relationships. When combined with version control and modern documentation practices, Mermaid ERDs become a living part of your system documentation rather than static artifacts that quickly become outdated.

# **GROQ**

# **Chapter: Data Modeling and Database Design**

## **Introduction to Data and Information Systems**

Data is defined as recorded facts and numbers. Information, on the other hand, is knowledge derived from data, presented in a meaningful context, or data processed through operations like summing, ordering, averaging, grouping, or comparing.

A system is a set of components that interact to achieve a purpose or goal. An information system specifically aims to produce information and consists of five components: hardware, software, data, procedures, and people.

![Systems development life cycle | SSADM Diagram | Systems development life  cycle | Draw The Diagram Of System Development Life Cycle][image1]  
[conceptdraw.com](https://www.conceptdraw.com/examples/draw-the-diagram-of-system-development-life-cycle)  
The Five-Component Information System Framework

Business processes are sets of activities that transform inputs into outputs. For example, in manufacturing, raw materials inventory leads to assembly activities, resulting in finished goods inventory. Information systems support these processes, such as updating inventories in databases.

Systems analysis and design involve creating and maintaining information systems using methodologies like the Systems Development Life Cycle (SDLC).

## **The Systems Development Life Cycle (SDLC)**

The SDLC is a classic methodology for developing information systems, comprising five steps:

1. **System Definition**: Define goals, scope, assess feasibility, form team, and plan project.  
2. **Requirements Analysis**: Conduct interviews, evaluate systems, determine forms/reports/queries, identify features, consider security and components.  
3. **Component Design**: Determine hardware/software specs, create database design, design procedures, create job descriptions.  
4. **Implementation**: Build/test components, integrate, convert to new system.  
5. **System Maintenance**: Update system, record change requests.

![Systems development life cycle | SSADM Diagram | Systems development life  cycle | Draw The Diagram Of System Development Life Cycle][image2]  
[conceptdraw.com](https://www.conceptdraw.com/examples/draw-the-diagram-of-system-development-life-cycle)  
A cyclical representation of the SDLC

The SDLC applies to the five information system components, with design and implementation tailored to each (e.g., hardware specs and installation, software programs and testing).

## **Database Development Process**

Database development is a subset of SDLC, focusing on:

1. **Requirements Analysis**: Gather sources like user interviews, forms, reports, queries, applications, websites, use cases, business rules.  
2. **Component Design**: Create data model, normalize, design tables.  
3. **Implementation**: Build database, populate with data, test.

## **The Entity-Relationship (E-R) Data Model**

Data requirements are documented in a data model, with the E-R model (extended version) being popular. Key elements:

* **Entities**: Things to track, grouped into classes (e.g., EMPLOYEE). Instances are specific occurrences (e.g., EMPLOYEE 123).  
* **Attributes**: Characteristics of entities (e.g., EmployeeName, data types like character, date).  
* **Identifiers**: Attributes naming instances, unique or nonunique.  
* **Relationships**: Associations between entities, with degree (binary: 2, ternary: 3). Cardinality includes maximum (1:1, 1:N, N:M) and minimum (0/optional, 1/mandatory).

E-R diagrams use rectangles for entities, diamonds for relationships, crow's foot notation for cardinality in some variations.

![Entity–relationship model - Wikipedia][image3]  
[en.wikipedia.org](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)  
![Data Modelling using ERD with Crow Foot Notation - CodeProject][image4]  
[codeproject.com](https://www.codeproject.com/articles/Data-Modelling-using-ERD-with-Crow-Foot-Notation)

### **Weak Entities and Relationships**

Weak entities depend on another entity for existence:

* **ID-Dependent**: Composite identifier includes parent's key, identifying relationship (solid line).  
* **Non-ID-Dependent**: Independent identifier, but still weak, nonidentifying relationship (dashed line).

Associative entities handle attributes in N:M relationships by linking entities.

### **Subtype Entities**

Subtypes are special cases of supertypes, connected via IS-A relationships. Discriminators determine subtype; can be exclusive or inclusive.

### **Recursive Relationships**

Entities relating to themselves (unary), treated similarly to binary but with care for cardinality.

## **Transforming E-R Models to Relational Designs**

Transform E-R to relational by creating tables for entities, adding keys, normalizing.

Steps:

1. Create tables for strong entities.  
2. Normalize tables.  
3. Consider denormalization if needed.  
4. Represent weak entities (add parent key if ID-dependent).  
5. Represent relationships (foreign keys or intersection tables).

![Entity–relationship model - Wikipedia][image5]  
[en.wikipedia.org](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)  
An example of transforming E-R to relational design

### **Normalization Process**

Normalization reduces anomalies:

* **1NF**: Atomic values, no repeating groups.  
* **2NF**: 1NF \+ no partial dependencies.  
* **3NF**: 2NF \+ no transitive dependencies.

Example: Split multivalued attributes, remove dependencies.

![Database Normalization: A Step-by-Step Guide with Examples][image6]  
[analyticsvidhya.com](https://www.analyticsvidhya.com/blog/2022/08/database-normalization-a-step-by-step-guide-with-examples/)  
Database normalization process steps

Denormalization may be used for performance, accepting some anomalies.

### **Representing Relationships in Relational Model**

* **1:1**: Foreign key in either table.  
* **1:N**: Foreign key in many-side (child).  
* **N:M**: Intersection table with composite key.  
* **Recursive**: Foreign key or intersection for unary.

### **SQL Joins for Relationships**

Use JOIN for binary/recursive relationships, e.g.:

sql  
SELECT \* FROM PARENT JOIN CHILD ON PARENT.Key \= CHILD.ForeignKey;

For recursive: Self-join with aliases.

## **Example: Honoria Sanchez Designs Database**

Using the Honoria Sanchez Designs case:

* Entities: SEMINAR, CUSTOMER, CONTACT, INVOICE, LINE\_ITEM, PRODUCT.  
* Relationships: SEMINAR-CUSTOMER (N:M via CONTACT), CUSTOMER-INVOICE (1:N), INVOICE-LINE\_ITEM (1:N), LINE\_ITEM-PRODUCT (N:1).

Column specifications (example for SEMINAR):

| Column Name | Data Type (Length) | Key | Required | Default Value | Remarks |
| ----- | ----- | ----- | ----- | ----- | ----- |
| SeminarID | Integer | Primary | Yes | DBMS supplied | Surrogate Key: Initial=1, Increment=1 |
| SeminarDate | Date | No | Yes | None | Format: yyyy-mm-dd |
| SeminarTime | Time | No | Yes | None | Format: hh:mm:ss.000 |
| Location | VarChar (100) | No | Yes | None | Blank |
| SeminarTitle | VarChar (100) | No | Yes | None | Blank |

Similar for other tables.

The final schema enforces referential integrity, e.g., cascade deletes where appropriate.

This chapter provides foundational knowledge for modeling and designing databases effectively.

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>

[image3]: <data:image/png;base64,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>

[image4]: <data:image/png;base64,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>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnAAAAIsCAMAAABFgWQdAAADAFBMVEX/3d11cnJxlHD+2P7s19fB5r3z3d20tNX/1dWLr4oTXBJlZprz9/Pt7fbt9ez98/3/xcX/zc3G2cW4iIhNS0nIyf6Oj7bmzMzImZn+ioqxdna72LkxLzHl5f/5BgbL6cru7v7l5vX+7v4LDGHMzeYCAQH+vb3RrNK6uv/d3f/YuLjk9OPFxt3L/sbv/O7+/tj4XFzT1P/l7uTY19edW6HW5tWGhobd6928+7bLp6eoqP+YmJnMy8z9/fPc3Oyny6T/5f+FeXnf4/nm/+R/r3Pj/99qDAze/9y9kpK6urzdxcXf8t/T/M7j4+2zhbZcCWKUSEympqXWq6v/zP/W1u3e3/Lc59y3yLb25fbKtrf//+24paWUlcZJZ0jk697W7tTv8/vU1ObnurplV1fR5c+XhYXCw/2pl5j29u3+/s7m5ub36/fb7dfr6+5ZAAAALQD//+VRUW2INDSgtZjt1u2iyJ7W/9JGYR3p9+eYxZVAPDuDg5yoqLny1dWBm4Dnzefd3eX19eSjjIz8p6cEBSyXmPClu6N4ICDb/9ey1a/P0eyt0qrqp6fu4+MYEA+7vN/r/+jX2+6jXFzzzc3bv9vn6/d9fq3yxcXn6Mjx/+////+4pLjP0P/X3cLBlsSYhpjX2//T89DV1fRibl/n6//y3vKzy69oXGP79++6v6LQ0d2oqdvx8NqWm4uio8yenrChof/27vzX2+U6O2P3+//a2/P37/fb59fhxuLb89vn6+jn5+/x8c3r5/McGRqwsLckIyD/5+f/+/uQkJXz2/P35vvr7+v79+VhYWz/4+P/8/On46H78/P36+v79/f77+//6+v/7+/uwu77+///9/f7+/sfHy735+f7//v37+/39/rz4+P3+/fz+/P/+v/z8/n34+Pz8//39//3//f3//P///rz5+f76+vz9/vz//P74+P75+fy7+/y6+uwsP/z9//59/Pz7+v37+v7++/6///38/v38//X1//X59v75/vr5//b1+/76+/n8+eusN6gxqA4HtLKAACAAElEQVR4Xux9CXxMZ/f/mTuTzGQyYxITIXgjNBhbUdIgtacUbaqlSi3d0KIorYa+aKutNFRVN0tTbTVobSWK1h6qGqrWkIYSsYTIyDaZffmf8zx3JjOZBH1Lf/1/5OvGzF3PnXu/9yzP85xzJUugGtX45yBUXFCNatxJVBOuGn8NOjZ1pI+ONNFXnbjiFiCpNqnVuCXoIAt0WV1shQBa0ONU8UMfvkeXxTa7EaoJV41bAuMSsgq/qgygCgSrew1+xQVg4GtvRrlqwlXjZui4X4dUUuE3pwBOaHYKv6mhlP7Yx5/h6lJaKtB6QOYxWpI+9D0Og/SRikuqUQ0PdGEF0FEIBqlKagcJ1DS61PIrgsqmNljVNqtVgpPEqlIbJFK9Sm5xgcvlcigCHVbQmpqfD8Od/VCt4apxQ1AogMrNCaTVUHu5UqZuhBlBtGosfMY/QmDKRT3ZVNywFFgkSgZ2n9dhPKgmXDWqhi5Lxywpks2AXpp242y2eCwjmhfYgrFBr2eTLQVVKW/9MJBdrYhqwlWjUlCQoNWTblODQaXuNnztVbZ87LyiDIXUKMevLjSyABYApb6rIpJUG8MeuyZPZJ1BC/squHLVhKtGpUCaxFlIt0mdcKAANVjtq+rsAwBylwSZ5gdGPWXnydzI9lUaUcc58E+urxA8VBOuGpWD9JsTpCG9S9FgmvcakWuk1DiKNVAMoClmk7hMglRE0oF9I7FuZjcwg4MzzhvVhKtGZegoIN3UsHPxVRibYAG5xU23Yr5egXTCP/rg4Mxz29iy/vjlh4hSKEWzqs/y0nHVzSLV8IeuQCUNxJhz1ftl6tXRMseRS1dCyGsrVjC+KWR2GchkADgFq1wyjctONFMAY5wDwCZ5vt8a2KFqUKa2yB3qCwU6TwNJtYarRiXQoZaC9hGw3kIsAsML6MN9Imo3BXSYF+fZcurFNUUjVxcrmKYr13EI5YOo5DB4EAzewWp15301KkVNgIix6yWMbwBbppzJkRRrmLtmhg6n6H/+Fw0v4v+cb+DNNzBuU8OnSoO4wg1ZhflqVIMUnMoMI6E3+W5A/zlhxXGX6wlYfX8DGPPHhJkjhwE0Nl0ESAVAa1mcfBoKdwwcs7Aw1LRu/Wr43kg7OVK7/D5kpVCqMnh1r1ZruGr4gQ006nRdbWKRKTlv/ebOfN866ovP19bo8f1Cts3ywtP4HyzFr0fxr+T7UIDtn+unBJlXTyl8je1kkf96/ToY1E4I9Ry6WsNVw4OvIRzycYLw8BOTP3j//dVFriKAEFJyB4+MOiAB57AaoWPLAJ6a92GhK9wWfdEF9XbBvjj03WqsQ0v6VfNmsajLmmBoYZGbFGaTouZ1jbFUgP3lQqo1XDVELK4huXaNphrXMmvMr/8eX4q0McnBdAh2FEPYpZWfr2He2s41Zk/ccOoJgPjBCfjNCK1pQXafz0ymIvL+GgKUKVkXqwfVGq4aIhKL3N8oRlXP3/zIBitvbiuCz97uuOiV3Y9FuyTffguwYmYa+nCDf8ZNu1+42PXI6mIDLQbl6HNmmDB5Lozj7XQN69fBpepSY1x56291s0g1RCx+ofy7TuWUNLgPvhHjTwXE4qciyBQUdD0oLOwU61QAE+AC2pr1P/AlFLlmmGknBTRsUqPmaihxCQavZpHqht9qiDjUvvx7U8c9trKaGd9PLQOZHcD6aevmqv/E5fbLnXNECVdlDO2LFO2LZO0L8GvvC/jXOFfWLA43+8a2eIjBDo2bpiph9B/3GUCivlB+5GoNVw0RId4mVeWUOmsEd8Dwc3fdc+ZkXJhDK9g4806/ePbxgJaJeiwKNC9DbF6f61DzJGSWUMtvaGG1Sa1GRSwb4fmqQz/fKVXIiHGQf+EsLYsF1nnFbChaUQkbnsRHKBHQuHoMakMw9r8O0HKrkBlcWgpoUss7U6sJVw0RPj4c13ERZWmZ23G25vpg1zmiHA8ikHbovzEfjn0wmLm7lwENI3XItponnUJSAuo3jF29u7aqo9RqVAIynYJDmqdMmAZRyuvXu0DNI+nAO7MIJja5P0QW0spri9ZeD0djOrzohJBptwuo3yCLNSSLqNZw1RDhZVLZaDhQ0uBLpawFzs5Ovc4W17w6NuTJ8BlzvbZkMOc3CaoN4jYvjJ8GyZAJwXmCA4L0EOrV7ltNuGq44W1SgfdvKSmZATkHaYmoqUKF2pxSVaHmsKkwDZJw00w7GlKkm+K6tsIAzOqeBn/odDR5fdDFFz9uIyoc20fovwJZIAhCqSAY7cF9TwlJSYUjT068MmWarWbNilvWtMVPe3ri5RPFqNpChFNHc+xGQVC5BOE6sLQaL1RrOA5epCBOz+oYsNzyChuw5HJe0iCro7eN+EvwEmOhPKjKxBjYKfiOk/0n4GNSCTreKeVUGym3IaLMjg5/2jRaAtOSmCor/yDFlZTQIhPQkOJuRspnwF9TUb9VE45Bh25t+J440CMFGANYhrkvaAm7hox3+7rkV5ICd1OgmHytRwwdsBIxPMOuXMw/xbvydjgR9GjQ02cXgHMOIopZlNkCMsmx8wDnkGlgB0rXwp+gZBlb+Nzs8y/7UE04gi6rSz7XaowAUodUaQSlUclrZqiMbM7Bt2VZvipDFZUMbgTUGOEopqZVFEOpxZWIUbOEu/9dzP+KCj6cCB0FmapAq1Nw0mUxCHUuA3PuNGJ2A33SedeFyyojG2AuBFrZsMtKT7y6awt0BdA0uEwFgYFOl0stdwjgUlusEofDYZZJbDaJxOxyOF1Wl0RtkwpU0MAlD4TAGmHaYK+h+jeHriBMayIxDrcYidpgdbocNguKMUslZiHAQmKsEl8xF+gM/wF4d22Vo6AACprKrgdKAp1OcFmlDmOwVWW12WyGAKONJovRZgOwqQqLpTaHyyVIJFCsVh4uCKuUb3e5hkNbGlroqWRgUBkEZ6y2UXbMQZyd+AscpC8xcBBiDsotMccssYd+NjiVRpWBsny5DvKN+auEWA3GI0b1gPY63qaJC2LgCI3iOYcr2gAcAxTT4CxsFpwV6ib8A5bVz6SKILMYx4vZkHEldcZPyQMV03F4tk4yuFTMJsvfloq4qwlHyb7kUTl52QxlN4kNGNkQAQ2Lo2Ar+iHtQAF52Z59Ajoll6DpIzYQFfy9Yn+wnGKDigomMDEDrguWGCg+qz9VaFbQCG42PJbZKZuqWRONBukd4Pq5JCKPxNQ/JTAxd5xwfkGDG3T+bsI1O6W+OeGqLJ0EdznhAC8k8UDqhN1zx5JGU6adya3pELsJ3WA9hi6JBZSW2ARqb4cYYZ6RVzPwb2iqBDynGOlmmJEBMbkb8lCEmOhJxxYliWKAyKeE+6KvPr7x+lEjG/xDHnilpWFuJyr34QjsqUQ3Drh7iyqaljKPE8+UrgR5oA4pc+CAHkO/Cg8e3L2EY3oHnNoiJTyTTRyapRArZoiJ5W6vGNxZvgRKLjc/0fYg6qWfjTz8N2irvLosLt1DrEbdpn7uYJODO1GlsQH/lYhhc/wrpx0KOubcFJHHWxnkNxBzO+BvUj0eBytnAxTdMChbNaEW4IYQ8Qv+H5G1ljQcsY9t6yllo3Xu97esdzPhqDJQMBS/6TwItZcHENvc6qacah6IbHCnlveUoopKL6G0S7y2VVsQsTEr2KB8Ljt2Dt4Sr4IJlUghMcQ5d7ad0vJSdu3lzpuLuQ3wM6nclHo1i7g6xedcld9LFp/RDeQ5AOfaAC6Axzf2vfI2203goSp35fzO9+4lHBo6lzXY8F84WHsVEaGcCuXVDMSCBuIOGjcXWOKl8rUMkDs2Excq1s/wQRy4zOoWmiYL+Czz2HzEcBEkzSMIysWAsk38QVSmgsuvTMdtRiUmlVw3Um4GV4deGTEHA2puKGSKjFS0N/gF6Rn3CzqnwrsU8FC4g+6Gvx9wNxMOowX1RDiyxcZmiQclNfXieBtGA+ZXKVzFbI7Y4MMEUL67deKsDKKC9xjqikAxkhiNbKM4y+nmVm6iGAZOb38xYB4kbFQaXcINxfx9+PWlMhPglCJ9Ho08GLM9o0zBmUb1k7xKKImOJ3mlUmPoo5HH7t2ewZp/y9wBhDfuWsLptBYIbhHfYDw9sFStRe6CVauhy/hVq1M8HFAMPGffPWyte9bszQXaqXhhOuwwqspA7qyidYSZ7YlH0sRZ+cAxPeD+raFFxDUUEzz+PSh7//Tq5Be7RQOEfYibmEeuZsZ72nseMRbzYPQYVWWGW2yE+d/ga1I7kvOGrqdRNf5g7c0GI3c83R5HBf+W+55uP8DcI/7YvR/bjaTnhIqUu2s775FvzlLNQcY3mvA/yerNJXuo9ZOZNhrhCkAPq/iVgV1ouursWVdMskA3pcEJlqquoxZ1RJfi7VwGTQvJyAIZbKK1MZqOnWr5TdOtfuoa1r6rSCkmMdYzbH++k2K9PARnVNqqxNwOTPCe0ZEkJxiE+A5C+lf53OegX17MroCX+8nOVlyJZl8uB8Uv768/svI5IcIgJc9PW74t3MU9DRdqyLRpnd52oX/rcOAkA8mcTk0SRjyZOHlm2oCpX62bHjls3dnL9de3Wzeiyevrnhosfaf36LQR5uGrwxpKQOZw0I4gf3TtoBib2lJ2uOLxOXQmq0x6fFYg3xrFrFtyvN4Xq4YuXdCnSZ5a9ln73xeC46NNj69bXQPiHev67nizTdDIhJEf/Hzko4CX0l6bWMLODUk3bGyCxCIprkLMbcEC756GgmBVoFM6Y8evS5/sxlwO0RWwaCwWbuoVdr4l/7SwqjeUzUVrbTDk3semTB8nOF0B8uIs756Su5ZwcVKX6QtVFKoze7DMwa7nEYMOlVvI1yn9Zk9/MviLIavXxK3eWZCwbk7ynNCzl8MDvk5JOzvf/rq1nlRC7Ak0yMxmRf/v9+xtbnVpvzjIkoC98X1W1s+dXNZZ/epYZHjHSIps1ZTPH9i2UBiz7sluoYXD35V8sG7dxpbX+6al7L64rveKzK82P70oNCEt6/m5G1Yh6Y7Xt8kdgQa7Hdr161gqdcobeuU/3W6cLP8BuoI4VE6SB+0LOiLb5HTivB0HmYUEU1DSFvDcLfHTjpSzKIqRdTIZ63QWjN1HTEl+xQAueV2rVx/gndTR/2Z08fpuMZtMdDmNtQEG9GSLUofuAvZIbx0zDNJ3fokz/2ErgiYb2tCaQJeLGxIFaNt+++30bxVWNusNs0KhmI5r+Eyx2RSIn0XpsAQCO4ysMczsLAR5t9VrPudbd1stTes4GNKewO+XT6KiePPq8+8bA4tcpDti8S+CtvI+79uMcpOqAx3Vr+kV8JVo0r0QkjBIA89CZ2CehsfZQA9B4fE3xJ2c79vaRqjJqurcm929OQ35lFwOJ54uQuedXDYLXbrG51ShO3q+DnDodDe4yLZztQsyrdj5PV3LQzVwftbM1GGnIYO5eSx2na8bA0KpEbJWeh2dY9YpvNI1zZKvW7MtzUwBbF/W5lc4oEhZtFc+4HWMGyyxu+nAGjhj6QqSt6BzaA0eLIzJOJ0+MrCYSwJzRECeqtRQsfjV7UTyC+5vWaAzqCDh51J2JixyoWcFr4FC3m9rzBOrbbAXKF+GJsSwVHYxWMORhLYWI2zjls9felddGugdNdytGo7hKHytoLvpbmub9dvusG6joT/0M+0egvPFPAduMTwGobCoH67IeRaGsWXifrFDjGtac4+6jB/TH6roJxu6xSB6RneF0TN6x6SmFQRRZxEH048Zv36jeG8V9IYux6D1wi0PhYyhe0xiMpI+FJOj/hloVY0kLRnLODxabuEm895ZXEuZzfSommmVGYMFOlM8XZenuQQR2NSgMYDVO2y4a5tFqFsrGGPGZvcBawIjs2VWsLw33tJEG7FWAN4UILY20W3Hy5zOGmpjM3bmyT7JtJdRv1PKSPeh3cAlXRwWp7T2+/ahsRm0Hxoe1HYKc6jJHGKGSLhWi6oVhV+rBddcvHRRLmsAVkh+7GqG9BAzP7FA64TsnZklLta9dcfg07Wlq7kT7SWKV1jkQE1GzF4q5A9TG5F55OnmXw5LGdnFvD0/4GBhtw96FIW8Xvih2ITIWo3k4CJ9bl47xqgqNXr1N9+tJpW6o8FY42L9U9tmuhtYhw5/6jpM7vX727AwAgY6XNPbw7GZsB6cw4yStQKqueDUYSaYfd/yzzOYnYtduByiX82kfsSqsCcOQ9PioftmfEyMQ+5kkCIIhaAglwL55UKKIdFqAU30jekzCf73ENqortxidZ7x+aDt2aeCS7wPfAfwkQ+ZV+ScZQ5aEbjMIeVDGVLNXbkZhTMKqPv2kO/3rPk2Y1iPUd9PfYoZCQ65y8xtRtcJNLQE9KGeVXethqN6LVJnjZDWAyEi5D6m41BlMeMayvRYEMsmJ9AHN2iko9KpR0DR8Jz8zcislsHJkGk3O6hci7+GY29BIzEKWcBHJ1SJsZCuoJuo4PnrLmJYPoTnE9GYpiPPkiAheWaiW0NcVXfgmgLIDL7qAOE3r6PfdlQoZgPLnrPwLjegWjbsfMzQ7bAldujqBqf7JqZ+3vh0YHR++Jf74oat2TFVMNNTyH4fnTjf8cGw8QNJ/3ud912r4ajjxiEtCUh/tH4WFE1LB/fVAgUSLAhMItuA0szJ0ropx52x8P6RkXBsJ5wK0AMvDxTs3rwiBIdRCRPaDd2pSKeCaeWQMAXHIDKNL2Weo5lOJ1CAhaciTucLmfY8F2+1/8cgWbNmJRl0t+JSoNZFNThmf4bptYG0IGNYoDXK9iWdrWuhFSQPkdMh9geTc6dQNNy73Ej63/u8714NR303qHw0ZWl9B9TX4aNXtDSD6x/mOIkQCxpwmCEQnfuMA+eorTM64Yuk5ASW7Es2Nctfw7ElcZRQrFaXQYuj285kPTwBPoYpjMq8m8hdc5KrOgbmKgbNgikw95w969CvzYCL8eslus3w6trqWKhyqp3TIgeg/WQKnVQ/Xgs85w5/mpT5tSQl5raXXCO+Kel0vMuea098b6+1eAA9KMzFJU2Imzf8eO7oRXDU6PIp9nD3Es6dXI6Ug2ZCdqeW1FwUkWH+kdZ5WOekmnwKcIKVmjbeCSzLozFCD79bmJjsFLIDi81sQBz5xP6EYyaVj76UOpWashbOMxt3RELExyZmT5OmuTkmUo7NJVHqncQV/lJZXsTHBYmUwh4Q6GG119FvO3xri6iCDUrzl8s3x1J1GjGi4p16BF8/gJ04f05MpOHScYfaOhgd8QarLqKQeHmHdzPh8E/V6AxPLae0t3Yd7Wwsvg5kUW9NW9phBQajZsVDs2Swbb9k8AmgAWK47tt8AZzTQhIA3MPhGBNWUkOKD0TC0YA4J92PGiyrM/GzV/MgS5nxypJrLrxpk+Z775IPklolwv1GHeTuHZsMVA8GWC+4IEq5g/AlXE2z2qCEifDYfbWvAm95ZoTj4QMjnK9uFmN4M7lwaCkyMs5k76QMfMHl856Gu5hwXsO9IALKiHOUKRra6Pz9sbuIjbymi4iIa1FvxW4FIZEl/Waiy5anYoNb3UTw13BsiZgQIIopo6ROpGsyDNv8es4Jz9E9iDjTenf3SWLBBC6GDbq4teyJvwXvcl1Z1GokgYgoCBuYdWwDq38JIuW89BvQI+Ib65BRmAFfDMyKRROQGUyuJ1SX6xKhCy3UWoBSy5EPqOaYnsOv05IzA2KhXQ60xrVZHQA2FaJmSqJdqKE8E0jrUOkMnJPrw/NvRDiELjyfhl6H6qW+YkDIjqr95ka3mCuHRo9ogWLQpvqICdEzMXdawXm3wzHCQbABarSAoz0HZil7jlfM5b6nqODcXoCHcGKsY5oL4xcW5UXs3e5kFUZIN8ulXlnjdzXhGFD/1LRS4hYbsh9RDEE2okRSQgvysnBiflUCSy4PMLHkcpVRSUqHhu2XeydVmVQRopqTsrznysWwYgleYlgKO7OllYycvf2oOACTDcA31MCzzGwWPhBdT1U+d2y55ynaUvcHJ10HhVEX8T7GOcg20eOoMGq0mnDMlTPUJGeXc44XNAgwUYtRi8yAJpkBNrAjPcRKBoxtZEpVvlrHX8P5EE7HhuDxzFQuRkmNUnaURMN/8D8SQ0u8CyaQmDscnHpQkXD89ZXOiOKgJjSv7hyJrucBlzqftVD7ABdNnycZT75p9kkZdwbsIBgd9FRWE84H3McKtfEKDBi4itlJEfIcYh7PqzJGQQ5uK1DuJbN3gdeJbj7pWv6E81oiJhNrLZ56EiiG9aQqjREkAoqNEXksX4AYzcU4BRIjtQl3OF1LhG/XFlVBYS/oVRvYA9jCSf6rvbZEuL+ROBKuHFktDx/rmsb8W9wsaVpOMRjFF/RWrMJy1xPODaboAvE6CWRd6dY76eoRWIEZXOAAiD7jVAKrnOHHgJuYVBEsBZ+neJJ9BRTDiyixskkkRqwtoqhCzJ1DFUk05OOinmL6mHyAaazUDwXqyZCYTD5nMl8A3O3k3gArMVJZEs3d29NQGa6rZE7kAt50Nku0QBrwdExm4c7iBbtOEYA/qhwt4gs0w54jiOVx8PC8aBNBWUqhL96/KsT8o6CSDXg2pbxAhZIxKqGFkEnNO0IyAE34yRaw+kloDAADBXoVNP5Mv+JwUK3hCGg+HFSWitXOQFtXKmVaB81qHkQA/yMdpCpVk62jegZUi0q6x8fQ3dCkEnRZXUQxoklVsgpxLHed/TF7CgaBVU1glpuJ+Z8Kg/0PqCoRmrmeXO876fEz4gUpJl+TKSvmdpJHQPUv+LnT4yImbPm7Ane7hmNXRJuvYo2zeI+leKGkTrH3r1jJBuXgUxtRTGpIiutQBTmJFxYw6ELF/W8OtpnOLUb9ZwQ3oez2IfMANMQ2LgbvqkqKhtUtht7Fd4ti/hY+GlFxCQrd7/EC7PQQlKIXoKLnj85bSdlazPFEruFJG0vRG6C4mtomQ1nWtv9p3+2Ey6LrSUOVnCkjpfgcO0H5SmFU4TELL5rEtqGvcktAw6jVGUgXgwQ9lCUjQVBBodc7pCrBvHIfTqyaI4ox1nZCx2GnQMPE0OEJJO3xC8UQmmIwgAQkKqODGqJVhpuIuV1w9xh7g+RS6/dvcXIe7jhKUTeTq4kqzygYSQ0LAtPNLiRkGTXieOoQVnrSdznh8CGk55cayCZBafqctkSzRmdD0wtprbtWC0L9Sg7s0vSKOVg7+9dgo3oSJ4NeW658qhwtAsw2gZ61vEhHga1TrwyAHpeheMTObRU2fHCYMi+jFVJc6NnVSVmhDvIiScz/MbxOoZQ7uKR/aRIvEP+foRLPrRw39uGo8zALOhbi9dJS2Vl3AVxehJaKR4AudP8/ovDvBFiyL4vCjM7hV+X35u64oOQFbWjEb8X6SWygvtL4zPWxC2J2ZiiMKtbMRNaX/fyqfTguxolBaWmHsDbHnPfNxgPyweMEGpQZSx2Q+MkHA2kA6r3wy9hFXV8FuqfUXwuGO5kDzeBXW0QE8+N4uS5yB8pr2rAHUiQarRXbcoA1HVZFi6o1HKu12WWPNk4vaHWgwottIZeC0Zo+LCqDRYVERJuEm9HWlR3/3ws8XQGvI/JAAq16HHMW/6I05ssdNJqadeBQaSNewYblldNiOT3IX4F5VrE6vvYGu1MiYb1bXmrOHySG3Smp05n8o6bTD787wJttbqaJUBDnUOClmRL4tHDRhe3H0bwyMUKcfxvDbcUEv6CBk4B0G9561kbJyGZQUstHXaDtjXUvoxXQkFtH1e/Q8XQKRD6VwJWVH26k4XgbPG828i9/zMiMYAVdKy2U8y8H+3lOKag6xBxeze6/3DP+xqeYAXjVTqIycQTlfTWFe9+lBif3OI6q2uF0JAW126SMgOvbWXUOd4IA3yqWBlewPzfxSMtpgKUUm59o22mI6jKIoy/v6CWupB1Ox5qryRegosfo4tZoFnMOqGckhq1H/5P+Oi2I0errtkgoQceOKhWLjXCVcqISwjEjypUkeLQoq97tux1QYMJDeKbz+QaV8/pfCDYAE9TPaIQ5RpbaJtJNJJpYWYaPsBYLG3lqaDDSKS29YuZr3CNxqxqAycd5Ov8L2+kdfL50Y1wjZBDdOOv4rmaecEdyzB+22fIJ7XanKednUss9DryzEfe1QWoJ7ZK3hbj4M1cOM2gk5h+WxBkPyp0NlxpFA0vNOv5DXCozqbossjXgbi8iHhmggb7VgvkwHMJgPsDwc+uMl+F8RDE1IJAmBZGgZF29D/XvhY6IoL3WKeZ9I/GNFvHxDgTGLwVnBVdEbIlH6TF6GiE9fvUTEaVGh8oQyoKMStBRIL4pOwVsJ2eHifGAk038Vj7DQAl35DfiHlNhwSMblWaMUqBKMbcDvibV43GAxODqEH8Qmghb0N0ojlewl4uLipk/IQqwmCE+HrVyTLyzJzRYRqNccFcndzd8nhJ/DcfVKAvcqE2odWQpjP2MporgS8d+8+QwA+k4sTj/HX0Ibyd0xIT470XD5q18fIpoibDIuaVDt07iNqsIZVc4nucSaIhhFSaVioJNh/fdQZzchfHC61ETwJze2+3BmVNHQuyoS2+U6zfg+XYWSikmKLv2mslTde4gKnbeAxtfIHGN1xy5bw4r18gfOF/v0+OAek4alIOKoM0saj2qpCKtn4bT4T+LykmvH8nr26QU/otMI7KZitI1/EIrqUemSBE77xVa8RmkpIydZzxuMFCbKKk53f8nnFM5hWknPLU6vPkG2+FhvtR9Rc0jU9l8MQYS5cEr+szfPxaVc9VBYVmVXVtOTTnfOPIHACw50NVN6pDd35gzhg3nM94RhEchGg8to6BY9U96K1pwWYONMO1Yg/kOo5E9KEDPYsVH0fuECXJwfKVs4+xdnOGUqMpUlgpNOhU0XEeBKTe14fOpHWl+7LwNQUqHd/k5X6A7o9TvIULWvqrPywFxMLS2qnJp/x7QkNZt6bPkLGmX1RH3cq7ihL34AJOiaw1HmS9H1QxYPgkwh57txCyra+mzTpahXKkPxxKhE+cC6SruJqKe0DzRZYJ52Jh2MKhw71ubMxK2vvzYhPTLp3snTB8PM5JhL8RpfyouF8NPcfPTef9cIrQuKw6FOtXOBwY+zxo+5Hh1KLTmdGO21AuiZTV7l89TvpYRM98IKnwO5VI+RJWBBZrlQMdG5cyXwpANyDf1t9t6bw2RO1zgclFZMJrcEJWBCwLtIQkbvsuDq6BtuR5jC4z+VXScfz+csOs9U5HLXT/DG+yp/GjgAPPAjIwdMGDgR3xx+cNNJMC9Ak3mNhF9qC+soh8tYo8+UChtWVTkKvKRkecyLwYY+d/3PjK9/qHWVccOS3bC2eZv9U0PrdFA/tY3+ZPcW7JzkweazXlVatDbBfFHiiC+GR4ofh54KUJ+v33UW4ZXdRFf0C91vJl+sGddMFAcsMfrjak+JhUX65UpL4T3HVs69t3fkNnust4kzM0xDjbHmqfI09YcQEp3VqSkwH6TUXCo9BU8xX8fdJSxBRKFuRi1VqDcYvGxGaPxQspXLT/yVDez4uDBHywbROPm9lOAnDEXmF247bWJ7flKPw0HKfRfcNnFR1FFuiiWI41IsW7SJ+NefxWWQ2LHCf1CUyXCB0euv/2fe5In1oMPNi2FJEufeC6GfDiX2YRSYifYQV1qNNxBo+rVtZVFl0c9EdKZK0AKdtxVgPtHs5WxGehnpLuCSM91bB7b/EuyquZBAc8+bOYVsRksYNxibveLXg1lel1W+Vl7E45H8JO6AST0ht4OT/ljbmjEVgIRrLGA9D6JCKSHwLgbpGUvdISRY0qNSnSj7+CluQ0IJ1uneyuR/S4LJV4CVQwBrsaWjIbYoyA51XrcwhaJn56CJHTw6bLS1hbKYEoHqmWA5IydUTzw6asOAU2q9+E50KQaUVF86r58xe7EdE2ztMRDDxgaXYXY5/fEHjlr6+1oBUPXLJwEI6Ce9fErv/yswQeBGSoqL2JWdFZkySKugkouvXNXNdFjUnWs6fCZsxuNoscBrhpdeoOj5z56GsXwFMi07t//UF82V7/dG+VHYs4D/sm3dmrztsqpMnQs9Jy2N+GIb+rWoTD2MQoLON0k770orlXQFJvx4YuKD5OucuYpqFFcJDXT/ZLU7z9LSd6vopEO/25Q0Q/lqkHmZuc8ixTQO4jVWMDbnPwwuJb8ao62aEssxrpd+7INYmncBm7BPTm+y4zPO9AYNvcxKoJVcI04OaBcCu7T9T9t1o2YPVv5Y4+Vx2d8+8QgSaOF8Y1xjTn2I3Ytg2Qu6BBkcmex4y4NhbE53L7cwUan8tEiWdQO61T/hD4k3VZ37CKAaVSPkt96PJUxdd+Rh9cuiZ+ZMnXCzI+PfjKs9qqRpwc8O2ADDJK0qXfpuEPcCT1Xu9KAvouXh+VVAVOXFeWE9N/gO52NjQx0yFGpzz0oj8ZfLDMTM+VDdsk+LOm44NMhbAcZuyD4LPKGAtrJFv38N8qPX3S65IHHPAf+VyLYGiB/4gVVdKRBZrYrzGNSKL3AHgCyAEVqqlazTnvlpfFpmd9nvvTc5Xpn/1wRvDhVoVB4ci9HAe4kg9hlAbW3jdMHWstMBb9TGSYfDC0AnRXF/Gf76YYgk5nxKnIx366yZUo7PN/nwddO9Ti0e83nuWlffxrRsOPFB09MPbzswDfTu259cLkdGPPp3GSd3xvb6JMXjMEkpqKQ24dfRdcAcbHgsmZgVFuzzGBXORgRvj9Qb+bPqc5nYmoO/ez67Ksz42VPznzl0WeaX7jn2e+Mb/00fFnzq1u3vlvvbK2NK3JOtwZij8FshwHXYmwgBB4rP21vDYeaVDobvvN2DCXpI1b3Fg0oaKxE3N3jgDkzCnkx2dNi1iTucrcYgXHbg83R8jupL+3fDPRjS6XHt22ZBvnnWElC5hKbgiTUU59vDjKt+7kAakHBY7Vgljky/0KkmHzJwAsSNgyHl2oNacJeSpBV9WgRIzybmDGJig65xfSF712SZJgJ4TAL/ww14PHwS6ks584OTtc0CawJMjEHnfZQxC78fnlpZolQKtxZx3jlbj5YqlsZOp7Bg8+yhWaQS/Cu1+iimtIUoCjo+HjYE7S8TfpQeJTqccXvhmGLhgbRltbP7Zrn1/TWlB0lD7fYRApaATJlmU8XlRfhspDhjwZsNvIInjdMhQQ9uToEdmw8bT4Z12Nne/gxYTGq9ukDgrrsSRlWGApnolMW7V0GNYlxjHNyi3HbsIcP5bncXWP/Vui0FqfS8CD+/qlLA/dSaK/wFDXCC+WK5CW06E/Mv6RGUAlXcLEZithAK0w+kfXRG0dLVCBo4/b5R5GvjGSvOnBIFJ8+urY/dM0/Vy6GFxZhCcX0xz54zh0NUyExCreYx3ud3u0U7Oy9B3eyAz9oyBAW+VDwQzWfvgSqtE6UN7tim7cZna4pPtIO9JvMMFKRcTYVV8Q2Frab7Y4La6lIY+oOJ532hi+6sziHKn5CrHYoYKzDhhSJ8CKcjr0EQs+iYLfCehYf5hhnQ3SIn+zx3HOSoQkA70fAO2mK9zCM2jFwccs4zd60USWr2ca8oUkefj0g32G+o8/ibUAoyyMw1ngjbGDSaWKPHzyljSpBLMx4OOMMfmyngWCCgTIGK4UWLEKwQXlmw5TlH53qWmElU5p+YjwdbEzM3KS8NbEgZCKtqWuyfN1tR3nXlo48OGPugnXebR6K/qagGb3NjccsEeovmfFTBIZWR787D7B7eIsfoHjEEQh/IQzubx3mZSBjYehFMKpobIdnWTnhdCwzBw9chM83a7yTS1wXYS5sfZKetkYGjObw4TuSiE+Aad/qhhIoGrO9EUgm119qYT0apBXxnKkQfWl++JUWH/DsWJt/c8G/AfvxB5e51CVHWy/K7DpBtuI7CkSp/qXYyO2bWM70G+m2IHTmQ03pyc7inTOmJQMcNapKUfPsq2wAJo343YfKokwwHrVvhsRfJkQv+pJIJ4ohLVeeTOwR45KYg6hiE4p5o2veQ0ZNQXKmvYRaUEnMnYNPjV9FqSRpPZlCXgI5I/YsaizT60FBF1CBSY6shQ9A5tjEtl6LZ9wfXI8BFJgOKwpgV4aZdqIIc/mipOAS9AS8zruccFlUhC5+++BvmRrFHWLT8bosN2kf2/jz5K5LTsZ9+NtymDOxjabHzumjFtfB26JZaHoZXIfaHFm4BlzUWMRajBq2h4l1lK6H4Wl+3MqS5f4NwAdMJZSqDUehBSyCYb+MhtwHpgfxHhX2pPgkluPHbJg2H1439f21pW5GaXwSpS0dpRQlNj5Jl1WpSaW2JoPK5TLCUU0U6o2wGaMh+sgKLsbFxbjp5hYzzTUfJkHI62dgp/CGEzYjqz057HfSMWaOGIcOrCAYB87QGZaSH4BcY64AbcLdAZpGfEmb4jd6ciS8sAgjJ2vLjAXotXzyooQ88nC9WmW9otSwQJfQ/Rtp+oQiitdANiru2/NPDvzq6XVDHvho4gsFBfvvjz0wOcAadP+qbZZtz8XVWzcobP8LSwfFPTHus5RPFn01nO3UMHTx77aN41AXAr0bHVHrDgZWfwM6CC8LRMWslpTNGDXusyPpG1YMymzXut0fj+jRZ0b01gc/gFNucDD01lNX6fFfg7ebw3vXEEo3nn0afhYyx71WKA8MRMVuDQ+CSqJUWqIzMzEudZlh8rhxnxrPr5j0H1k7eeMLj4li8PBuMTiRmODg7XWDercoyV2xc9ADXIwqkEp0mAp0cAcvZlce0wAzqYESpzR09DNx/R9KSZltQLU0apHMLLPbMY4Hxi6QhJ4jpU/fJWwB3n6aYJRZJouN2FOnk3Llx5lgsbsk1lCz57y9+lJp+ITaOeQ6lP7IGnlRKT7bEeLRTdFr3WPacY4W0J+4NP47bfwPy6mIGGsWRv1m02NEReXzOKvvqN/xd8Fe0CsFpxJkLZIgUci2JW0WxucBG3/Q/RptQmEDK6YUkbH30VTK/3UKmS0y7ei8UTkbz5CvKkaLEHRsDKvUCSQGklBMdJOrb5TRUXHflmybWqIUkEVtFj5rwsXQHWQp7JW+mO82w7dcF5XOc9ZIG7AyL/pVK5CeI6XFHDReDzSIStGyD16xkbdksGZhgOca563a24Kqw0Gp0WcwRwXCoYwuAWBbD/wAz+bDiGU0AYxQLKFpGYxeghP/ylcsg/Y/UqFEM8Zhva5DzZOQWULDBUUpX4um9V8JHWtTp0paSk0xco6nlVMPc7TOeAym4ibvgSWmOD7ZO8M8066hYl2UElc+Hsu/876ccMDEqGkcI5SLwUOFxuVly0Ux9xZH/MCLJ9G6JEhgecV4x6LPeGqC3Un4EI45WNLaVMTsJTt6uA9aeXDj1dsk8s7dI+bRj4r0xwZC9k4nFe4sNbLCnZUTjh53DKhkafNQgypWtclgHT7MdJfXu6WBI+73FYJYYlNBLZTQ8NRgVLc1TwjkSAcW0nuSGf6tPhww1yKOsoKcQqiVFxQRRxmxelq8oAEbXE8VM3ARKjaKDVABUkUbGtFKOXGiY+VPOE+5LpYkCPzlfExMWXAZHoqksBRjUYxIdVyRGVzM0gTKxVT2cuXbDJ9E6I4C6n6t1RBRBs1AiB6eB9Gzv+s6Yy5Mmeu1lQdT+Arzwrcm5oFs+WhIIrrhE1nKTICX6+lNOGZTDcrWkPg1ztkKf2oWLla9BR/SucHZxvVow/AIsu6X8YphBF/qVdb1thIufjtN7PP2gJSPWNWIj21m6b1iKMVIwf7wG7jrZlALIxtWT60U5Q1MVRMORB1nIGXqJcYthYsgaQzoB/H6Sbx8Esb+3mLuHPxfX0nj1EApowcjcS1yLqvlijfsU8wwA+ZOCZ8CjGTsg3gw/+CPVD7pxEOpiUn0dGJABZWMi/cZD0fvECXKodJXLqa3mtfMMW5rEEWU8+q3FyF25pshPzKSqVObUw/odgRjXOI90PM2mVReC5XFaV4ftwlkWYGXmKFCNrxElhLEwkZiVSOghF83CcT8DS/4E67io8ZYx8WoqbSDKIaVTqASTe4cWJVY0EYUc9t+5U1QyYhfppRZ4U5GOq+6nXRS3WmzXWzLLGj5ddd9hVxFU+HOPEpv9KdbRcIB9xUjrLYWkLOCD5CqeXW/sj6GyTRogXuG4gcPLEJrEzNxKz2eD9U8pEQmbzl/O2hg3ILQwvpwUcs9VX19ehNWKLWl3Z6WAjoMT71kow7UdO892ZcEKqFFyUjAaMBe515R8A2CBjd8xUgdVD3JXwwfCiBQNlzF8dl3FJVkbcWx7G1euDMAOUEhUyIkZzeJ1kB2zEE5urcHA/peWdCCryDNxgMdYMW6KlhThgojfuk98BRPsXCK+Drbe1heTfcXxjHP0mFTeUnazABThciN4HfZbw1kNDtCIYQGQ1H3wywHsvsuVQzs6o4PFfs7LGt13F4UZke3a3+8ad/fMLM6lqemtbAaRqKac4JXmhqvpFWen8Y6FipcSX8N57+E14ZxiyE156RjiyCB7jqEUJWYOwe/rC3ue6p4hR8D6SJkHVp+0cN1+7ZipS5Wu5M5Haz2Ma/Y6O8K+CXR8MKHZLyBqm0CP/bI7aNTvXlW83rNq9C25zQnsNgNINsWTE4u3ZIKuWH/m0klDghByLOQtrBLVe9Uz5XQte5KeAk+wQlgCOqTleE9SaOrDCEgK9X/rTvjq3pYWiQvF+gG13BuQ1ephvOnl9+j5okeuJhSqdIglqATwTWcV+2k/2MNB27LKl4X7n3in8yuKaNmV16yEz+oTpfbu+XnXsUN8ScccAGUskWcFovQMT4DKjJ6jQAuEJlG4fs0VpOUtCgLqSq6Hf+DSSW2BRPZirpfRpYNuZwOL/WBfrwnRUQ/2AT9XvpkCOxo9geesQwNrZ/6vmWwHy2WCZR6+3A0Bo0XCGJsYEUJRXMHFa7ozU0qSRHFoAqlG+f24dhQN9GHo2xfkkIFMP/RmoSVE058GH2UMgM/aTHAAf6wuE0A3nP2AoJKUJFw3Lp4Ds80qabMzgIqrkyBvdKCB1akQqmalSdwox0qqNGKl/3GiN+uC92vU4VBK0Cu2QJgUyp8ll0WtbU/UOPg5bo0Ifqvh145wU1m9GGGYMsnMORgzK4QKAsWw9hbhV+U6pJ0dEKYjRXe5SNXJy5CV+WYs6YedpvZxb4NUargCG4FTSIPUsUkcVTtxEUWGLixwVko3C/U/r+PUr1AillPF4lfpVKyr1E5OIv/sYnKM4CHAXLW51vVw1+RcEAXh7dO+epRaiwgBRoANqq3zOvQ+elRvzJ9f5Fw8bC9IwRffAQVBs6hSgtrQDyLiE1+BNoODAc4jNvoYXPO4aiPE2lNfzh5UUt79ut6ilRdyEWKJW4Rfu1wNUZAttwSA0dq6kfD2+kKvHYYQD4IiUu0Gk2nBSB3QkEukeHvtcPFhvX8ceKCGCgO7ZMPb2fQLUJ18WAi1P2Yi+lu+oRf2v+zdjgvxNE9ZU8lEqJGCQhyS8G0JkUhUCNfORKWXDitP0CnqAJVCSecXruvCxUmrhSVEI6BlbJhZGK0NnL2eUNldLKStG7FRhWWK7smf9Gk6upDW1Riw/q9NH39I1JjzlhoK2ZR+QOPfLjtpJXIvP6HgAxs1z9UCvvFv2CFqD2E/76HJLaYI66rBwLx5vsnXwJvSQ+xhD7QSHOsQfFaI3/OvOLxG5hU5h9ST4MRhmqyY4rjx+exrDu/piZwi3kg/vc2x7p/d5zE/F/0NPgCz5+Vwx6lU56JhpPh136dPjr4CqWATIZDC2BJhwZGJOsfj+R+s456D/ABqtr3rIpwBLob1GwkOKkMKfOj3T4uC0+oALLRwXyNio6bF/5K0KDL0kUVwBV4Sf/u8bw/Bj9dgWyRueV/IojNhyH7wkbo9UEfgFSaKytP2bgZqC+VvNWXNAebLC2lUgZQTgOeBe2fWh6YXHgQSjMU1MuJIZI4+MZfw3kIF2fBq4iXqoMmBnK/osytCmyrVEzoiOyJW9ZRUzo4/um+VC8wM7BvctP2G5tGG0LHkaZuBMi7M1qxZBt+ZSqn+fgazjPRaSfXxqGLQNWBK70LVRCOe4paGhVnl4nF5Hm9bREshBfjKbuMTE9VceItm9R4gIuq7rByU+q7W0G5BTxci4Rc5Fikz8aIXLaCgWg3Khs5d/8ICO953E4NJTfx5KguPHkN+Cz1hiYLgHLPvHngrmTgTlIiPlB/Mc8SlMLMdHmbeUZ8IAvxWofnV1XMRhQTDMbYsHuRbMS2CmJEEW5prIGTkmmYmHjBsjWCXrIk3OAm3h74mVTkWRxltHd7a1fTOh/nIs/yr6hSlnRQd7wAZyB6U1Pa6A+M5foVTHj1kfFXLM5ue+QB/ePOdB+3tr0KnWDn/ji/IXxVEI5HVFCT1Bv4BCdeRehIyZXHCsx0VnI9/oJJxdC07cqd2f3lHduKS4hykYxZbHKD5kQeQnnFxcP/GQD/gS162BVysbIzqQDe5thBE8BG7dIzcyMuMHi0D80oe9pr77hMBTQkZEGqMqkoxqwum57RdRZdNi6GBXhuMRVYDaIYsYSJ0rjgR9luwUhKrmpDdTtQuYZbfB8YpqPeMXxyuRne6sFzx9/v0s9/Rw+GBnrteRWrTYlQPxLUoOmuaCFzQ6Yy+tI7Y5edGhGHi6V7KhzOv7YIAfUb2uyaVkBDgLbU6DRwctHGadMyqYEO7CFwmWonUUURII1n4fTwi04+uHWTKhR1184YFzVJnOUKLtJrcsM9xxehKmY/ui0c7gNt+/SD7ofrXyzfuCpQP550Wvx8h/v5YXzj/pvn3lcBGoJv3Ah92h26rIYydqb+AzA5UIy6tHfMNlZRiMAGX95cDB8Kis/CtHeXPbAV1P5lOu4w6E6WZt13akR7C4x6dFf3gC9zlVe18yEHVO+cV2kNEoMhKgfCclTIO+35JSr48+E6r7SYCsbGCRun64SVu7rrmEH2PWrFngbwlD/GwA2VmqDQxGs0GLxDjPZs8fiNsJWIoAVd0I942V/8rGHxBju9Q4WieLIu3JnzZt0tmtT47R1tYVr4LvkKkAQ22G57b4ebZns7Q9M/LuGXep+16kxzOHHk6vd3ZJRjz9rh3XAI+g2BjaHBN7apNBwiuLT3Vgdrl3Drt2ZGWwvYy7UOM7Kwl75kdDUzNcfrxHnVFlH2cu4yqsqorbtyk0o1OoKfyaYUdp7yYVFb3QUwmVIDmPE2ZVQEWmc87FZ1TMdxTcpri6h7OjargImpKOT2wcekMlt4Od02YtClEe2dQsTDajJVYQV17Ei4CMiLEC8A+8iLAtY6wq1ZaYdnN3Uf2vXQwR+iY+Kcgj7UJ2CtoOGyePEk6s2gRse+2siDEAChv7JMVrxcnSBJ3NLymkWpbRCfE9nVEpP7/FOuPCdrZhKqDClvAqRHWCuYv/4KO2s6cZ/jdIbcE4WN6kHuPfgVOu/t3NnDOMinJwD4Tm0Pv4wR646e9ctuouMKtXi602Viyrc72bfbtBErPETNyJi44N6zjBRfNmK5gUsmiKuoNgR9Gnf0xP+dZFkqBz67ToOGFYezkKQ57SJmri5fPXRCbMawjCWjO+weOVM2bDAtyjjLlF/XUeNojp9baUgRvdRBdUerS/uUzd+HBvFQ9jxVeM9H7yvRTNLqA614eXPgTBRAlIXGcZG9p58EbAH9n6M6T5pKe9r61oC5G144/cnITd/izSSPqxx+PhzpN+pNFR6S2Jqc3UH1Rfi19a+yzEbFWcjNeOa6LUZ4V1FJT+qtR6m6+nD9feOHbu+NCDfVkIZ+mjVo0L6nZ3+cfHHQqrOdyVt958DC9qsG5TVdsu61+q5cqQlKRUeCo/G+yakHLTeNVHXKlCt7KTTh4LVFkr86h+olxCy5Pz3EHCvZ3fXIzskZElfsAVwrcQW/+G6Q0s7ceXaJGVKnXf58pDGr8igVjYpSvY5IyXFE3dwlefktlyK4LNhoAs1DGwCGpYS0bvzF86czEr4L4vkCCou86PX31CVZsR4xAW/NoEERN/tRfwcVfLgZzecGwWzl72/fMz+hmV4NzHhFWfI4uxBlwTR5kMdagFXzR6YkhKth/ujF2Q8/f+nB7q9XaCLxpR/qN71FhZFb7X7x8a4tn280koMjBxcCKceKJhXTRHNEP5dLLpcb4avtW7Y745+roXRKpU6VhXjuwWTvmRsj31jyXDnhRCx446dVUJg/fkiXlbBgqmEqwLNT6v3W+Sloujf0p9GHS35K9t66bdu2S5frV8bY6nsvrQRIhZHGHS6ymhUxZqB86JEBO4al43fZwowBP+/LGGoeWjZ06YrHNUO3vu61pdxkcmWNE0bSVfS69uXIygLh6jWTyyRq0NL2LnDNfz7I/Jj8sZ9XDH2CU3FgBvyGHz2+MW/4eZh5qKLnzwM1+QcPPB/NlBwi0GSNVDrVTjGW+0fQvJaw70On9Kd7SkeGexaiCc28fr2YOayGq+RJlZWJ7mtElCXKAIZJMCkcAuePdI5anjU4YJvyU9DqvM+6gkltTw0Fxmeym6QpjRNZ8aRACqqopjIDfRDr3NtrSPGh1jfKfwGlrbOta3KJJLhUaO/10sLwW4xS6xd1XykcbktNb6jWmPGI7+2IjJz4bm/InR0uvFdS2OgDiFyztdWkbxMWwuR60C/8aeWmZ5/LTX2OxcJa7u7tnXDfAe1KKOu43+fwFaG10O0zs7YOjRUfKlRwmuKcVFhoWvvRztXFo+OSh8KhD46nnu03uTbUUID0NKwuTA59fB2VJEQdJy9iGZWxkxVZT9EBu1UQANBl3TLIh5b53UkGTiEW+D6exIA8EC9hO8PcRh8NgzFsqFc7+GBYj6cuK+KmngQY3a7bpG4bTzbXnCYxuNrUNfBFmdIIKpG3dwReA2zj9nV7YUj7/x5NU6MVzb+nlBRcGNAAeShIlpT8mpywEn5X/KA/tRISAP9WJqC2Kwu2oDNviNLjjx6JO11+1fDC4hcWrx2sMnglcHsTjpUwAXWLeCrTRIVzxJ9XLBJMHHDp/mDRO68IyZL1HbY06NO14KhBSu8v8AtPboJ48lEvfvY5m4mkWIFaPPAjZUz+lO0wcAFbvvd853zYMDgNYJZeqW0893DbcJ62HumJYdOP/Mnya2+MLnxwG3lLZgUaCbOcjZpvHYc+Bbw2MA6SZgc2WFG3Kz4I90JxIxs+W6gMUxKLHlzqZMEs//XQcEbGsR+PX8ffmuI5thsx1/pQ9STFRlEM0vN0xGXQ9KYoH2VfuNAIUmPjFvKt4yaffu74ud4XJwIs6U0LNhoHr2H1Eug0E4tBQ1/vYAnl8kToOND9qGgvrx9NhhTucS/mxjT/W0iD4IQWT2yYBmkJ+B3JBmlDijcn0CY5UQBqdSnfSVUyb1Q9NLPyju5D+KQJwsWmUvTLpsg+j6eea4cD2egCmWAOZoIUVI0FGSqjiWqz2BV2sFg0LElMZnGwgRTDnlv9zVMutUUSaHXzzWXyCLgRzgaGlxUsKTvN6gcxHCtOG5eS22DFhIRPigyzUrd12i8c7dwAUtqWnrwQVOP7A+mROU3a/iEsOjGn4bHiBu699hadMY9a/M1LihvfmSCTNUCdeLQH/QqCrP2iRd8u/9I6f9Eos31Ax1eejnjHmJn6zFcZKe3s37X+z4nH1w16Y2nvg8vft22b99UnX40Bs52aNmRNh0S8bw5yacIK/mhVUcbQAgiyquyOlBmzr5AYhV322DVJ+9a5xndrnUhIe/xayZhrQ0bBur5pCWnDVydnpKTolo3s8uCJJ4onaHbft3//I48/PbzMDrhjw7lnDj9TSMVsygoqSrltWNDe/e3ChYLZKar1g9pcDLBqTVZrSlfQXisqQhVYZnt0SMfARn88r532258bwh6dXGvv8w932dq3Wc5r8CDu6QjLQR+3lHYCbZF1wooC/bmXn5b94qls65vToILgVj2SbLyZiVw3/L8oW/f8aipbwuBuAfVqCX1wwItUzoZVFaU9lb12gJHXWWa4xWYRiC/qfvm1ZtuK91IYykGBqBbW93fPrz+M/731xlvrD7+FfLwXF0B/ChfKW0n2Qn97mz8uDm7UwHmTqCHO4pQqnlNvpQRHGsRMVd8gSEf3s4tmaa1riUu7rB2wlpRnvYuF9lrXahXUchWEtXpgYeOd+LPZTqCorRtrX8SSIuE3/6CBlrQHp9T5dfQElk+MBjgwPGjWs20LzkRfq3Wt7WMzpVoan+K6NnY1WWmS9cjSWhdUjja7P/oIdy9Zxc4tNvDFiDcyS+5wydVl5V/ryc5/8WLbT5KG5H0+kkwqajoDmlMMEsoude+2O7tvmuWJ+xXxq96EOQrjaiF8W164Y0dX3CIvCih1thTym1nVK1HnbRx8ed0oo1fNAC8N10XhcFpXfSrIZQ6ZzMHaxBHme8xfX42jTFc52pLxqMZiR0li02XmAPSTpWaQLFPGK+hqiTs5bGMmdgG1LVAtsvoWE6Hjwfz1vGl1LEW1c7m22ttgL+Tm5lI7DeKNdHij29X0bsg3SNd165Z+wohhAbmjW3NzoQHQPnsbwIDnT7UpK8la8cPLlqAbt4tEOiRO+/Nnai9ujMGXXQax5F0EFOhLbMZTR8ILIMNwKjyXBQKl18LKjOEFrjL0/XN+yi+wm2X2UXZS9J3naVp+JhlncSITLlSaCN1FcLiEoGvnQtsAe9PjqMXbHu8PxXq1XmaCK7vAhRKuBReEn7xmxG/5waUFh8Ekc8E52c+XvtrSdziJiU21TxTmZAbTG99k5aritqPrr/Be/Hac4L37J18eV/fUEGglFHQy1CmVBkCd62Re17aylR7/ejwsHy6E5G3qm/ny+KW/Bmz/bEzroV+t2P88PrFhOSHUbeNQ/dJYBY3S/miafTx85nM253UPCbw0HCVtrfh6XYgnFJdTW8jDMzs9tmbg/Q+d0mt3FZ/s/sDCTW+FHkg1zTnd+HTqsG5fzml3qG0oHae8nUA+5cTG/yERmoaJrNyk/3oQ/OCl44ANfevvpea8sJ7WURudiL2HZ7heO78RtPHQ5KaqgAoEOWtMtCvXU8EuEFMiyXNmrT/PLeW1RcLFmg9iUxCAyZ0WWd+qHbq8NCnBzgvaV9G1RWIUsg5Ds6cpGp7jlTa9xFB5B7GKSXmJJh8xqHgfMsq2Z4KTUjxvrLX/HrybRdq3C361xmDW8oHhd1kaDGHvjcW57ldOpSW8NwEG3v+T/qkDL8b3LOrVc1Fa84zQvntc1B5clpZICdx8xyV/1GqwQjdJoBhchE+U6lSfWAdmCto4KD4NmguNzfdPCZk1a/z2ZH10fL4iovYo86jPn3zjJzkMq4Me9pNT2MbMomJUW+w6dq+S/Fvx4txy19bF+ruawqY19bc/jE55ebMuG3hZEesZC73XoSXe+/CMrEcA+davZQNq0rgZBIfUvkD1VeSac7E5V4kJXgj/UvxSXtyIFZ/hBTQa0sI698IiZ3KCHf0HWl1V1xaKMUb8GjB6rWEpT2D3BqufxL6Ui8E/U5DJjHabiZlzRvaJ8xQQrf9iHPY38Ns81eNPLX+K4gBCQhqPyYQkXIKRwtgdC9tTW7ZJv0ORMbjNGOPlLk+Er0hsfVSrnz67vKVt5Ttjw6D3ZNlZr54nbw1HNcEWbaMATAEsaGM+XAg6cMPqn6yReqDVheHN80NTRo7ZrlHuOQ1Dpg5cnbxtk+JFKt1Fb7FwkatnVnRWv3pi5Bw0RfVK0Jir9X6+TRXoCMFFzktbO6HhN8GlbvMx4OyKLAKu4xjBuJ6j/9fzEcBAvQ7LYARAPwk0ykMlSXwbsiv/nYU36drS0Ug4rVVd1gKih+dFX3s7UJgy16PfWFE4VD50x3m1GbF+EvJt7pQpkKweCqt+jRYgkyeXhxZW0bXFEoqlzoiyFpnjm8ByPV7duVN8xXirUfpj+o2JmTvXdQa26/WoMpBvaKtCb+KY/i2Ud23F6bU77CMkX1swMB8C1OYRxcdDosfZDg69uRG/1rkCdeAKTjkQ9docOET71b9I1iyZ74QaHuYcXO2YNyIqw1neu1WhmM2JsO4y5tKUmaHds2UWIp9FZi6aeKSsaO4o5ZYco3ZQ7xMvtF5c9sDpjjGrB13tFdm3bXu0EMW4l8NOLgeEO3PnQPf42HqNmjVr3brZ0Fvz4QD+A4GKToOa7DyS/UjfuB9tTRqvmvLNV7npXzFdSZNuPdJkvQ6ysrJ0WZ7C2Lnw8qPRDdpLXE2EEUERG7VK5BucOjnwxnyDgsZmq9xoNVhmjHpnd89rJo1h1ptBs3bRKua+U4NmcBnalHwIzhf1F6q4gABZj21ZD+h6r/9x4uFfMl8LzLNQgGSuqpjNxfooxiktrfmybcpvRbp+cSdLdwXN6k5ymBg8NmvCIgskNqFSvTAUs1v2cMPrJSv3jN4qZNoNNicIVhLjK+J2Yklr97cLjSV5zVtP2Bj2wxc7R9maprWCD5N20BOixLCgbt7uuvBItgEe+d1A05YJmV1+YW8ThHNKapF4MKFpIPlvv+2p858vr9Z++sAnRdeVHt+zXMOxXpjiHca33XVpqP9aAT8+FGSCsKAeO1MOLUw1j4Sw/c2j3hiWolm1+syvw1J6ty145ORuoLhNbJrrGqjuvPmoV5h6q11bCF1osEwLrfrgc4LPQYPsNPyRrj/OdKZQNX2+6LFBucbTg/ZEU7xvl8aexPm2UOdzLRDdQi5mbenje+hKQMGIyon3Vwl0qRO/GJ+Xpdw7bXqQK3zSfMhPmu/ecBLMxwXIPMljW2KNOshtlcxrMthZbrk4+NRfw4nDk5gUd+YlhHY06rIenj3u3aDZAEwMHZuAn0yMBP47b4gdsh5+lScuVZHCftvh7cPFgf63+1p9ta3J8YcTkxPSEoKjWOIUGyDh7s9td4gmescA4xAbjkn6LQGCV8KfS3p17vjKUce8LlGyS96D4rxMKjVSSiKegbepzYN50cS6ING7ZUXMvOBxcZmdMbM3RJipQmh/2JwZnOcS3BH8rTaLsJJMHUHT6vKp/E3L+pHmPQz9zx/OvlxP3OBSXcphIFNavqh08IMUO5xHOzwK1vWzoXHluTQvLBY3qQo804AGHEh4RiTLsdTaJa/Q05rV/drZA1PfwsBp6nv3QyOebd7y25AByDUqN4N+cQm7MgIfXF9ZXypbwjJQSDVQ8SSZW0yTovGsVlJWS7JWJAbg/kas2hVEXPtaNpoo7fQR4x5ZfMfgZVJBalSFOzqMt/157HE4NL1VMuXq8aGR3pRzo/5FN92EJJpPxIO9nvl166ckf7yrnz/Z4H3uXib1fEOHS+IcsnXrU8NTRsnsshQWUQTwlWXBFHWUg9wOpv/dfIPhaE5rq/f3sG1LuqdQZfdE8LfYLAJw9izqgiDZ4HufbRf4xMUj2dnZXSOK4crz5ufjHugUvFl7uXNmm6I//vhDIlyqf2n4hiEDDk+6FtXUpjsfEZGa3fShjFOn+g35ftfLTwt7zuq2ww+FHgtROfC06l+HQIlE4lIHlkqdYyYsxJ9jtpp2rWwz5UrdJiHnOgdY6oaHB7YMLfzpimbLz7/ldP9J/wu4hH2Sky84nQaV3Sngz7eCqYAOVrlJZWKoMLMEtVxgaU0TF3PduPP8iuGhv+c8ErIz3IZiutzbsvCnE2WnDu48vLv7dtMveGGTdqIYg0UVaGFiFPT6yzsJL5Ma+XNDU2Hhtpb6/xY8/WX7M+bf8uNhh+u9nch8k4ksqx4nk+fjnFJPLBAkrvcgcfv2B0PrjNl7bVPyfZ/VeFo7+72r8sMXIisxqcBbKWuXBXx04pH7+cgsHx3nKQ3qLtnInBoJRVQUwTc0RsHj9bN2U+BmpjdliAf9CyaVQGkNeJua1oWVm9iII4w7R11BAwvnSePxaKEtHBY7+cl/pQeOJQqCIcTkecvXTVUcgfSPhY2rorZNJY/ayxNxmTaiPxZ5JU1DhUNaiKW2kNZRyd05W1WbVAL+KBruid8owdwjhsGrRBPVcCVUJubOo8JokfbQaOq7b0UdnLdE/X1Aq6iC9dnJiT4bVILkRG3z05Nha6OMpxK3Htke+e5/R0af9W3L8SEcvfBMElEGnQdl1V/KlngIh9SimM2PcBJyE9m4REX63lwwpOLlKkEtUN57f6vtcOXQUXkHvBP5L32CnGNjMQFGfc4cu42PsOmDU7zT1U02jIuQjiZ9/YueX7clebf76w3BXDmgN2xLmdEgOmDwIxY1EPNvaZbZOyNQhrJDqycK+mQOVdEO5wa5cuARg0LErEubd4mmAEAxMqrNQSOs+ZuV/7Fk6AqEiwN5yZXo59CkzmwByb91PANRs12x25MSofVRcWLguTStjyYnvHm5lxwultZ7BzevFXVK+q7sSu2zFTtHfLq2yL2VKp2ytEQhrKVO1niSO4LnhZZ9S97y3em/WTDT1NcZGbFgFCQJmcFQytLn3Nfoln04N+LJlQsugrCC7pfrXk7nrEMsW79O/8Fk+IDGO41at6wfca3X1n7QFU4JqpjDFOf5RKb+DKgEpJ90oYWUnQbO6Kt/hkvFoiJECVa4i+V6ixm4lMFM9R4E2pylfJe3MPlrOK8lTIyYBIdq7s+I8vR+OjwXQ0MkjJyXKMNdlK6CmDuHZSO85+L26VTQqPDUPfDmttdzLLMjWh0F4f6ARhceorWWefAxLHns+8eOts5Z1ZwW5aiumr8jHh7v+dS1Hx8Y9+Yb+CtCz1Lqj0+tf+/O+7CssECJ02qXNl4Mxq3ftM9uV/LoHonrbYrhk+J3UNwuhu/0kXS8LAm5kbTdXGvpK01raFfeu/WXfZJMe6EBfQ4qeyv6brfsw7mBrpzOtqeBVKZYPG+XpdU7a6c1adLkdL8mylOgfHCzFiel6Ty0VvbDxT0CYchg3bJnlMPzS4JgD8SfLT9OxombeHEEOrkwc7ggu24NlBRaggEdOqPNpQoss9lsTqNNin9Oi9FgUwVaVcbgQDOVW5aAwaSWqQ+pmPMmogofjoOJyWpOYtCdswS7XPJAY7CVicHDczFGFIli7LYAoKZ39C4NVhRTZvYWc+dQXuOXEHmhoKGsFGRWdf8h7TYM/+lVpeWnyMMHjp7bti3/jNEwLlB/+YXaKW2+TH90b8zeU2lx0s1XdkwPs6X23vPk9I1bO0OUY/Zzo4pkwi8FceDdH+c74pcqbQK1FLCwLfH5Jg93+0EHERkHnH1/pmZJ93ZMv4WPnle7B4ZvVIOOaoclJYDdqDLS+ysMXmU+/rpJJSCVdVAfZAVhrYDS8IesBFJ1/WATKyoCm7gd3SGwYjYXtZUUT4preStenBvMshp4mhrLHAJW2Ii0Hf6JBo4V/LjOVJOfyvFXqJXpdlGMeG+ZGFGEWKLpZmLuHCrJ2qIKD43gTP498GfkrIBRvwN80MewU38VvsJQdHpsxjvJGc1n58hzNm5s0qzIHrWwz/GTm6AhFGj1pdFwVl5ZnX/yXsuRBVlxFoUVCVeihOwmyZCWJiyZ9f4bsXmAajMCrjH90wi3pHaC3FYto74+mhE9LRnd3aQEOxVALoVShVX+m9eFuuWuLR8Qe7QX63uebLSfn7zUB0lHE8BLfT5hn9D9YAw6b1HFoLvo3tSNff177Ky47AagBwP5RiMCuUFlPhrddP6fshSJiKutZPIqeYqq7NryBRdD34jWbJFbDIOyVA0khlnW/2tgSKS9BEHRJXAPvK0936XhhD61ghLhazgfcS3Eukb/9KX61vDsdVvGDIUfbXX3fVE7DMnm0pNPdQmdN3q6KsIva4unB/MqdBg/UCyFvkRiEkxLTkzObgLZuBWVpqMlvPwxLsgMYNW6BPJyWRU6L8JV9pzfCLw5rjDUZlB1x9mV4c3SmVbj0cOodTTRfft0JlANJRhyGeruCisIYT6cr5q7lUBVV14bDpWbllK+2f1XavKoQBA5WBrIi/CpooK/mRdv885Pu7EPB2KRIG8xzIfT5PEym8WsSpOvD8fFUH/WP+HD+SVCA0ve6mLDO4x6rv7x5ES1vo7tfAPUR/8FNqx+4rhGMqfaEAWH2rkkOdFXtKUYyYZCPo2nlO7xz4IGP8JxxImlbKQskmdRPNU/zBTbC5BgaVQ/iQrb8PCd3Gigcb6VWIFKlMFNoNMGQVEI1K6LdNvUbxP0mtQnLPv3RNZ5KnY29IdkGFywBVh/AlnXOt0P+lfsKth0C9qVGzle2IhKzVALxYzC4uttjvFMGcqDg145xdkX+JsnqMAMsMaK/ylKBVFM3SvO2CYaZNqxF9lgZhQTA7m6kNTz/P0W7sqEGKVSXn/5ge4YKjGpIkgNaeHFBY0ohWlq6qH5kOzuSa0DVIo1ESa1243PF9rRGs8uAukNTtjXpIrgFBGcwSWUcm8kztkhp8yeCQF9+Q4DElhYRRXT2LWB0holCivIDV4vmxbxF00qMgb5RvVjV65E9bVuT7v1+pYXLjzye/KCJm1h4zug7/MIHK47EV7dCC3hQq/or0aQ+tuysl7dXaCKL/NmXNgvtyAb1WZNq5IKGyEZWvTC/w5OdJ5r2OGKY3TyxXMAP8AS6FcEkVdb4sa1o1KuOg1UkrWUzKF3k/tNTCq17VCAimKMii7aqzEH5fFHrjcUwPEOG4SFYnJB80ub6S2BnIQf61w2SOm6ovXNr9iy/08jHPbogF7CVhBN9f3nj0y5gpwD/KOPRLgCMP946Hv4hIfJn0X6ZHWpmnCVaTgMHUL369ylQbV6scgUIYKGRdHIKNZZK3KN6Tcw4CWt7Fn8SyYVbSkKVZ0B2DRnToP10H+bawu18XouOdV9yBW/03OhfXtW4md1+5+PRdL1ioe6rK4If3EJ4vJ2n1C/InShhaw2nBq5FtFW+uKCgL5Pa3jGAoNfjZliGNQoW26JPbQZmAOBv1uOP5r95qpNqo65KRCqlzpVLbR2+b3FZ49cLZdSUYxGUtT86cI+i/pdWlCCS4QQavPjBvyOojKTSuj3Z1a/P7UvLrJM3LypfdjUbg9NxYVzXInItQ9fBvrgDcLdHioIk+bKSyYu0mOQcc+mChUkRXg3i7hRAGFHoCBYbQoEQ6DEKFisLqs6MJDyww3cwcUPlRVUgYFml9UqUDNvoNykuJ51vsA/fv9LzSL/gbCOX3/dY1OTZZ1PapIjt7/3aqFpjVLJnOtIvN+RUIwT/1qspBW7rr03O3G27f9x9x4AURzt//hzjTvgjuIhiiJFpFixISIKYlfQ2LvG3mOMFTX2RDCW2EVFY4mxxI41FkQERSxgRSx0UaS3u+Pab57ZO7jjjsS8ie/3/f8/zLI7u7M7tzPPPmXKM+e/eiZ5FmMyuOtwlcqiZdlt5nGiF2jj1gj3fKKqqtWiUtbofdvb2C0Z8LW3oEjGUiAleE8mFDMZwsnmHT7ZezKXgDCxSUEjvj6SoUo6M5hXwRLJ1GpVRRnTaFFDs4hHLrjnggnJRspRBSY0tMs53uOrfooimYB6ecRngyYbkiNgLlL4FBjkvODXuMNHkrrYlUhINixlhfhLLs6LqOraqkLga/So410imAbdXTtJW5jlxaaSb9mu9Nk9kcgH7vnAc9G9e6V22IGS2urBG8v6pjadpg3NqlVQkAtur6s/DoxzOC20LZW0oYAKg0oPyIwJj0oG4xpUX53Rw9/o2sIuBsLOjhYc71/Pjc4X1HA2xpmNZudAHSdV8530eMmzhjAsllgRjUp1Grcv/2BEb9WAKm8N34hgXDIs8ULng+qanNkw0HH0IHWYFu+1DddcsyjVvLshh6saLYKmb+mmK14/ljHZ0FlwOmxU48yGZsSsfMH4sjFraQluREMVMp7oaijhfwnGdTgPcd7SS+nTIgjdLYD1F28BtLTgwPYGMAhifbbAOKu9TVfCsuaZVPR9fRDWgxL6XoI+EJaXZGyOmVEdDqHVhSro1MFyDmFrQlq2FMyeg83uKpqG0oZRW2ru3zAaCswLj87aHgZunTVdpQbQ96JUBZL+/MHj8AxdxEXKPLTGQ29jv0gLYs6o3nC+i+sV/1f94hqJh/RGoObLBDkbIORowo8qDnp9pHaR0YnQCMyGA4ujekSVKzVERjsVagAzAbHIEscXl8ealfcOy9pYylGitWG0fL8k/G77KWFp2Ef+pQXwdZpdnRNHTfYO76aktV8P5g6HBkOfzX8zNePYndAZy8Bi04v1C541C4ZLH+uQBOJAypCqwQiHYxoKGDuV0XLxLFrs7LrvcatHzTU7jclQ6SaOkqFhN8xn63A+gN66DpX3p9SGlYj8jbKyGkEZn2YsFgmP55DfKf41vpRvqtHijuKAJaOgS61w1kRxb+Bb6PM3xpkNMjjG4YyeJy2i5eEMDr4MOorgTjkbh+JCTf7hNGOTesId6qTJWDZQmVMVN5Va0pXdqZlsNvSj//bsaqtffAHod20RBYwYp0pSARdvfX3QS3h/ZR+41AevNIAMGrTAGJ4kh+OEpQegW9PnqOGvT5fxjZirRghO0yyCrSLYBAdeYt9yNN228ACcyVW7WHBumBcP2CzSISYvntIjNosAHYtYPYvPF6ndCgPgR7NK5obktthmnB6vq+Ru2XaQvli2qVKyatmouFmPlxBY10qiFaU1t8W1JW/XsyiBfjQMKVBCqPSjpUNryOGYUYIMvVX6FhF19N6Icxoe1ChSsetmedxl7TnGhYmO1NYnbua0Nhtm5iUhuYVx93C9vC87aKSaSPUDETEVLl28Vb6jD4w6Qs9VURlUTgDS9KoTELJDqvsp/T4M/qMHStf0acfe2uqLVQORipqNDFvc0aGNoLmXZTz51OrVn/iR30/7ZVLJYglF3Tdejm0V383LzLcPckFk+0KTfHE1Fve5IpVkHPD+lyp6Qzh6TD23UicOFVqKy5MDx+ZC+GpgZuhXIm/znB53Lv76uPLETadrOpd14EHoba1/sIbetMBl3gnsDw065HpSSglBA60mp4cSblw5eXE2eeUaRaoK4qpLUKu860M1JIu4Ney8N4tp4dQDX7MvX/lt+6cflSqdW748csTDYcsl4JqbE2I7okts2qlmerEcmqJBRoOMhXBszcIGBZ1f+cbww4aHVREkRfWeBrHG/TGUC8cmexU9TMupckirVW+rWD/9FCuc6tnI+aroYjNc3hx7UvUme3yuSO1WCO71XF9TYYqBnFo2wdlhqrdrlD/1zfXD2dMOWe86tUV20rbgbav9rSD4bneWeizlcZohpwSd7SFwxB3Q/gTDBlkK5DzfJ5zXzN5mGByqVpTeyCuOHr6mBpGq9dymCfd8cTQWP8aQw+EZX5kKfvihXMOqkIJINufTxloNDhcwbJTglqoLuO7uoitSQWOdaLNp021/9peeCF0lUgMvks9/KTEUni3UnKkUopX96dWgGQFe1VHfDlb8nA2hWdN+1JN52IKmA1LNOAC/FL5bfBTurA6L/4gukwQCjQioDjxdZPL+wdXLuR3a9xgEpaWlKhVhdmzr6in/Et0Ig6v3c+dWjF3K/H89zwF2T/C7ZOeyKAtg+MPhxDgI9lf6Q9bDeXCBsMJhq5dZz+VoH0FuEotblX51Pe/iUUvQ/oSyQ9rresAcVPnUFRkTqmN9XDjEJR9dFhwFcXFRQKd46EBzh7rdm2VMj6hR+JFNVZ5noslGg8MhIN3bOA7iNnvXORqwtc/oBIh7kwCb2y+D5E6E5Hzbh2mTau5T33D7i4blfw6t7zsG4qVhV66s1NIbMBzOVo/eImnQgF6g/zSscK5rINF7gmlJBwZWptPjcChOkd6WqhKiZeX4qgYNBYxmU62hgHFHK+1CxOxT7YSPSqr+3K4tD3tI2v3zBHpMJaIYKjp+IHtWGhTL1/MOpg88Vz9LSfRQ2/r+Ua3229Yn6Wa6HlJPnSbWNAIz4ja9+YkbI+K5lb2qRrU4DzSDlqyXSpFF4wmNcgXalx39GupMOVVsarNryGvXX8u6ME0WoKvDof8kqeB47SWEq8ItMMgmHOIBV/6wO4qzkviabEiJTjqD1DM6HKLWjhmtFBeqb3/lmXhjbpNfysxHFyfMX7Dtm+/K9lRlQ6dfHpleLqy2uPK/DD0dLnD4pY9RL+7jIWMTENim2byZdq7QyhiTS/SsHCVJVTnGiICfIK3t+GMlOmqcvg6H62yJSmdY/vKamKn00yqy1F6rbAxnYpToBHRFQUJiaozEmrW0/O5nkJqV1MoXVypyn9+1pYCsbgzNtGI0s54JIvBH5rKkJXtV234Mtz5HvqvuUQni6edJ5K7r2IP0rIbYCKL7K3ot0EYQN21rlEP0Z8uklOboWFI0GqijEXy7E7/6vMgNk0pGBW0+5qt7G8j4SAU4TU3gHbIhuZY6tVHWeL0UiI0vw6DhG+eUHygJy8jXaUqKlE6nlgqw4CxBlSUoKxRI1i6vR+S27+YHw+FqslA2a0mmPX2CDL11FeIn4K3Pf740/N6CckN5v/toBVQZpI3LZ07r0TbSGMFl2lHrgapyGZqbGmSMSycsMGy4ZnQ2hS7B+RTkmalgXMqVigxLGZgpsT60ao03JFSoGRXau5LVAX7zAikXFOgjjg/lsQAd4U4pR2qWB1r/bKGfp8N1g8KAo6t3V6rXDtGdog80TIDlhx3BYZcyb4MLGgjgsHIl7Dz8Ifra6ve5Nukzjx0qeTy1tBQ6RVe1nShM760HQVGlf7jXXQx4DykZpUwlMrvchXE8RliIJ9lFEdJj/PaQV1sWRLjW70Nk0l+P7tk83QJ5DX5c0BKJMo5SDEnqvyzyoUluCTvLCFHPm/TA7x07ReTAx/m9+G2qpTgVTura+po0Zp2FgLzsQ++bAm/722+Xq2EzfFfezZklANbcdbLlMizqOKmasZovDGzEtfsIQj7ny3G4RZVdW4FvQRxxpThjC8OmkGU1QP7l9BB6mF/hQ/Nf2uLwl453mj+NnG25JuzFU0JXzW80v4H0ZptDbVUkOjjAvznlVq+wHA+Xyl4uXR0Oh8+Ivrc8X4FqasJTek5DAOMh6uaoc3H7kd1UGWykTMKGQtiAATeoO0yqGJ9x64g94UJAHvk3QCXgRfLRX9WcIGYCNLZb9LHVrVbi1Rdsp73tsJOcecbd2SHd4ab12OiUCR04klaU6Vd5F7kK0UHQNwDctScQnY1occjky1dkVylm+E7+/fsH9PT39/bGs+sAJH5FsMVy8i+ZhQ+WgLe/f8/+/fv3FGhdwyG8pXGJcjp0yThoNm8u8/WyEbS70tOflKx0aBY9EferyfICFqTeMJncA9Te9dVufvFT/JHOtBl529p3Z7qv9dsY/lVsrTy66HIbOIG2bdpoeRsjWwhny2nThjCm3Y078Tzg4+mTL/oFhE6bNPbmlgAAl7b3sKlMp5kEGrSZtsCOMAmXqlN6rh5QfwuK0pBYwtQ41DeQ4iyLrAb/eq6n/4hp/nHe9I/yOPz0pGGNBu0aaRl02Lxq9Ya+rEcflVDpwORz2+HQx2/OxTbnqpoQcBAFnYlKsWIVrIBVOjsKOlqp0sF0NDxelrQcIu6PvaRrMxrX4sxEpXDwxDln9GSD3IrOwzVlLqphyO8obdW1P3FUalbLu6bUxYwEKBFoWDvU8RgpLP0Vl1z/Ux+/pRtqu7ZDMYo3eaPEkNbre4LktTjyZsiSwSfVHCXnh8VDfjeTuRXVSQC77D5XZuTs1s2mVrNbQCeXfzn+RnS4R9D5Fgag/xauH87IzodUJSOwNZN1KHxqEQkNlDF+bdMv/jD8W4uy84GR5c22r7/oNSXpdrwXJbcMegO9ORIGwtw+YTrsv9pE6F2e/ozfbFmCqAmx4K8K9lwc/KZRl5uvV2/NJTU3MuxY/UO9HO2XmUsfvgy/Nalz43VNNheC1Q27OndWxKHaR9SOS1se/f2J0Og2P+DGLwM/nCA0rvERx1BcJckhkN40tIbQuBhhUkf5Q1DWd49bRYgDR4x6oFP/CU8MuxvoDDWw8B984lynijgkB0oKOiTHAptcDMycNVTxJKYSJJsopAN/Ep8gTL8AL6k3m5qbRUg2ZqZbFa7fmODrGMmGmaPE+OhmppXTbNB3Es1GUGtw8nV2cp6wjBSvEcn9b6FqtAgRqa2UNvNkkQHaM5EB2OzhFN0GIvlnXpkuTBEvEd98ec4X2lz0eh7QPDTwotek/NPxgShSMbXmLthIfnB2aF+dlhEdkUqJ81OhBPMl0nEk2f028ivTuIK4gunToedJV/s4sPK6h9I4csSFX7vubRQmmVSa15Ckle0Cs4GN8D4ZX+IZ9W2OsvyBtmiCtc//cxCRyo/sCnsjTBtaWnSqJLbqWEVDFc4yAzJJ8ujvvm8VlLXZsRWIA/1hvq4L1Ja8qmMt8vjAFoIi95sWR0bHeXs7M75NAesb+RjO8PYoYXgaIQac702vSQENWxA0FizbtlXY+BKwFeVCNvWdZxTEemYLyyXT37zusYjk4syYwKCbjdZcoVHNNSkjTQWOgmUbpgwO82I/x9SleTVl829AR6SCC1zRV4kin8tkz5HRBcDFqdPIibs3m/V0adPJh1h0eYz2RVM9fx6JC3ZrQV4/uzP8WBnXHZ7kARVcUUqQgKuQcksVQtGB8VwofieNnHtX9Kzn8svm7S4fkYDXwnXj5b9aXXb5+d1vFgq+d+vxwYPMpZY+x78aZX58DEshVQB37QpJeyWr9sYRtTd2ddrY9bbBsJ0akGluu/tJQX0o5TUrdOPXhej0To7p0CmdOq856wFnk+hWtTublAQ0iSNJuvW+XOA3pldaUWxGoP/HaWW27AtVGZus7amTEUVuhrNSrlbMZi/8bfHzwKb1u4bnDA6PCVNwpVIudcKq4OWW8qBYwQOpgifBE6Vc8noQt9Y9PHzyuoG5CQ3XXmK9nlQuLGHxYzKNDE9CNz657+uBXFjGCZyQatnDUs0K2B03uSobfC5PymQBUh7QbADdudJsDu1OtxPtu901OjaxlPxWED3OrJ7Hv4h7bSsPc21HxCfIoiHVWXPCORUyMjq0PldPqWyU0TBhWd3aygvcjw0HO15e/Ca1w87eyuctEtIFbXA8UkBq5V2pE4WPoXRmptnjqpFVVQRnA8BTflw4nFlSGoRho6Wmlvai80O7Oe6bKnYbdNk7Nh7aH88fo/7NcmDWbfnVQdu7dRIX1+o8aSBIfwu1kJ4fLJOi2eve4dl0Nodvm5vbUkJCd/olfw5y7ebM2NjeTNJXvOL1R4GpKt8R0oEQFCG6JHRAz2xVO7xAk0BrRYObFi3HPPXYnpw8xM0/iw05uXUfVZGAzRwjY8nMRRyVkFUyV7Xh3ELTT7U7uEB4OJ3xzgUpGu8KdK9Ld+QkOSOlU6EFYethW6LSZHen/VdZL2YW8k1KBNw88nhDH7/MSEALEadcVCabu/P121zbl6lr63sj88VskK7okSYbBfleMW9Siia8sPUCt/Y9LFJOzYmJeTGzFAeB0Wy+HB5WERyY3ySisd3L6ZUZEoojpgM2dsgB3FPJT/yDJH/+EmcavCcmmjv2vEvRuHB2ZugtMjV1dqr9JyjdfMFH53dXEVyujVDNdpa3a1CK3qOlAtcFwlGKTf0vbLxxZGGt5ezg0dNWrnncyGz1o7qHrdY9gpOjOVE7xgojAvumXOgVf6XWi+bneypAwAXvDdY7SeWw6jFj88Hpc0up2zv3dKtdTxZnZiQoxU0ryj841u4kMh95hbbJ9U+C/h5k232A7jyS+nvsHn8gHQY9dGz7852MinWfxHJTu19BPAT8P7LL5And3rXW4XGhaY11s0J4JJlzQG5iUiKb21zyLv4NLybb2zdNrkANa3EsLNAMWVpADxfcx7GRCsHPao8e3pZv7JwF1++wX8wslglLFCxlURJ45MYZcLhQOgATJByWXFghmzR3wob7D0Mi3ntbNi9UYDaL/WkeNCcmm8WYjRSWDXk03ss76FZCN8Fxdt+tmI2UDUw2+ln8m3hRNQAz8O6M7sPrvR18qEGT4xqGRSmuQ6y2Uc7ziH1l85wWjOtoJvkw69sbe+a6wqfs9aM6iUy9K8di6lqpQlCZN59hif66iNLKh6KeaCSZUs22NnwiGq1EQDSYm31AQFVctW2O1JTsNd5B8RqqxLPnytF7El3rAj7baKDTtbpRDw9wMW/y3r6P0Vb4ifGTpO6/zo4qdf2d+//MuO76LmLRWRb6+8iqtxD1uFZkixBDoH89XDGVWb4yHLSKfMIuA0PVA92KgEpcaFZqV4Z+PlTsbr3KsgHszENVS9v5kyJYsB7WAzYiS2GbLGRF6jOco8tuCjhbjXrrwtXp2aV/5j3JA2xv46KsIgBRkakb4JSTIFW5B2azyv8SWvoLQJMNYRu7Vsk7edPfcOUPOikOnptDNs0G+1G/6IA4HaMBoBD4dRas21xscwwG9jiOJ7EXq0MsdKhMbwD8cAJQgxtGlLwlI/54A5NLN7t7ibOs6OLeDKo1i3BUZt8GefozLuLQnjKVoDmF7SOMU5HVsLrfHT1nNprGAuofjtwRkj3Xjfr1/rs+fhl42AO3+Y2hOB0LqQ4o2aU5JpjtBND66CL5ZkK9/uUtwf879G6TBtSpjRjnDKKzrqq1KxMqbVXLiZs0R3rwzcM5yTglkrrSQqrD00H32jWEZx6aGUF2RKO6r2p9HacnESKgPm1wbUAhMSqqFpU0HCRQ+al5iGk21JGNTjbdCkbcbFg7kulSxGw+OYU6vitYBPrZkMJnfIJ9Yeh1bfmJCmWusAl/rNU1N2zYDSAkRx0pUrJDytPdMaDkRtJsDG3TmoNOeXo0+yiz0u3Z0vctIgTzUjPuV/bNhnXKTAHvOOpJniE3ZggKNv0xDSzagVAMvZHShDhvEzb4eVjCuufYUPC33eYz8LnrA+bc5nTN+4swcC/0jaBC/9hw9J2kMUkZh4QaF0qE1Gj/MIB/Ving9NS7VbPwqyjOWFscMjm6/BozGZVZn5NhduQczu8mzIxuDE8DjWMjy2wh2dHV6KvWFTPO4RCUl1a6aLJDTyK62WiygBCc/WuYjf1LNs3mi3I3hJHRIi//AJhzDZQVdvNgYAGlNl1UEpoWG+fB7KVfr/+jENnl8zmbjYwW0SU4wvqtK0rNPBOvveFuyrGv0LYXUYIDDY/TQMPj0IxnCM6kAqwWZZ/MXYT0Jixhl1prupb+FsERseoDBfaFAZHuLxtHyf/A2c956DlJQ3e6CJiLHqQnnwaG2uoR2rMvpM4IdRJVStVwE8O2ODo/DftXmLHNyIDKzSzL6OwWOg1XC+pGiZAA15wZ5oy8DWmDGeLMoGaCA8rj9LJBy+TPs6FDrquygS9PcHqztgLf2ooKHQA7Csjve/527LxA5fq9jvPoxQ5d13QYNA82noolAWMbYR45sfFNI4BrzSosc22g3vvnkA3rlfAE9AccVBstUquCpQIzz+R9ZQq7DWVEwzCVVLrrAobNVY58os4vgYhcbKk0XfoHBH0KYZMSKxaWq03oIskUf0+kUiBLMAX0n+T+sutRdOyguUBXUa1ywRg4azt27qMsewoluDCDYaVU8jhjLI6C5OZROUtZVI47xrFROR1XTzfsRaEuRujMIWRDBkTwJyKVghHQutkwK7obZIPzk3Sz+e/MuzcY8UukKhROg5m3vj6oobqmuTZWY8cAdD8Vm3yg1JGQG7zhOcKp1/2y1hPWcO3hZA5DtJS3AazvE2Y44ldvmqCNOF8oFykq5qpG3v9t3Hx33xdyHo+nZq3WMtMy6goTvWFSrLlJdLZItcJ0VYeGcezIViHwYk6FSilVl0kklQ5/wlpqDj4f5Fbz+yYia4UgSzSy76lTksVuKxa7uW2d2XrrnMzLczLNArfO3P5mjtsIybYOw3ueejpl+BxVifp2rpFJilBXeZkxH+eOM2iLY5CLjo1ynblF1LERrpvIkYpMFCwTE0WFnM3CjcTMTUoqcFXFCjbj1Ohxrk2SnlMjQytVf4JkLtiAXjYcaQXNRkGzIJs5i2aDMxd1s/nv+E7SbxZBOF63IyQ4OqCh/JkoW/LpE9iagbR3YaAsv9lXB055uDQpzXpXmOcC++Iae/Q7b86u3w29Xj//9GnUvXvZX4+WD86/cGHv9Sb69KavwyX5KWXkyxOByrIMmhINY3RLYrYRq22u+WKNMO14B8Ycxv8EOfN2sIPRu5I5ax7jZZlnghaVvmfIvyVSteh2XeNiBOjMQaquBrzP8npPeDXUY9KgghohpFqbOZRVzX6uDi2Pq5HFAfL2JBR7Yhk6MqJgvFJqwLhqQ02fXOfniVV36R16+FORqgG5yQOZtCYbIlSpm00N8Eijw5XiTH2j2Xw5GEyEDnzr8lachwN/0YYmbA6o80SgyhsRm+fHFpJAk1JtrvvmpqgREOa2Pkf87lsIAyucD60PwyHm1OU2mlNNQxajVitWzGf8HwcQI4qUOsvzCQTDTTTeya94c3HFt4tCUONlbCrUbspBd4ne/4jgqL8uNCG6lRGaY5tiWzTRRCUd4GlzeKqgSimhNLYperDx0TUTjECjx4WLB1S/UgUqV5N889AAyWP8dOmDutSi4jwvyejKmIbkZXhGNxt0bGA0G0psmM1/R5JWQn/WFmgnblFHE/U5ymBAosu2++5nRvGcMK8pdL8Gzzfu1+ie6IIdiSKUo+T0uZRO3TAYTr43mLXFqLeEy5Uyqi1jTpEvr8Jk0Z6VK6ENej5dOSVk8dim1IjDTxJpTeOSllFxdUvqc0eL/BmQMyAPYvQZ/d1nQMPjjBCAUVTlZphpzTB8+l98atXeRC/T/wtU1+EY+MFtP+U0uAR9Ln204Vy8hXOh1y8AVOw0Xj96HISv4SB0hludA5W54zEphFmV1DCUyoDgULllnAlRPke9jlbaUsjxqDc4TUsSkjZPjj005Ww6D1+QD+IY/Xr5D4yGfx3hq7AR/MxhtGi/FP7KaPifh3GCQ/jhHK5pRERO2+La55KSiNiLgbS9egE2WK/HGJ78WPwtSXKs0NBS0IEhwZGPDHk6tk6hMYVUB9SKN5VTIU5B90QFUTCmFbp9YCu4KAwMmsP/J4qdkap/psX9YxhyOMMz/9MwEKlaBKJfmsC3YCsqxAaCabDFNd2BsLFfir8lgXC0dJkrYWqoB1iV5IDLRaQAQ2HKwAjBUVATXuOBlE6/pxo0Y8JTt3kIje8kpqmIcjIjwuDfEKn/HFSqunK/IPEbktf/xKf2+aiZw2nhd5sIWPDLsYXJx2B4mBUQI5XwMxi+F3CKPUrfGjmbFjURnGHrlMbtdiWoP1p06a1pL2J6FA3xvyBSCRrPm/RlWdz/j0VqNRCqwoC0V7X7S0rTQGOGGyLJwwfESGKorJUozczKiWZXZVMJhSpVuZmW3kpLxeI8H6P0pjeT8f8QL9uGA8w6g15Evww0bZM6YJrlvwB8qu3/HWjGIP81bgfScBsCMWhi1RPVBOME5+EBfmI2yNBeBexp5NBlWtA7HKPS0UMz9B0mBpVKJRTKZMAW0xv/V9GSKHLNrwClOAxfivC+NJDKfHx9fHz96FH1y/85Pn8i4kXN6A9mr419How5JCSiMdc3VyIh/EylJvJUKQd1BVRU1EN+BiA3I9YDkH8VFRVqlozNVoNazQKTIom7eZJho7gaB5P8LwDHxyn2rYjN8BE+BsDJk/8qDAdgfvbCnX8LmT4N2CxsL1axWfYNjLUI/ofYUq2n4cuAW/0EhQfIkNoYa4H27XmLxZYp2EkVD+AV7wVQZA1/ZLynNir1RYv6nkyMHYbVBOvnT4T+0mgpD5+UR2qowBo8Kvvc/zUYitQvAkZv4UOyG469/f8eqvc0ADNiR8Fm/LqbdWa1jP82tsjO6uIJOidaymwAlvW2PSxIIRe3uFlvxMYRdBPHmKuc27pU9z+hOqMHdx/gbX0ALkuwzwq7rXjo111vWZ5/BEMr1fDMPwURoGwRSHHKzqoVbJUtsceK2Cr4dz4eg66tLwIDK7VysKA6EB0uJD/E0Uk6/kWqoHUsAiff/AFeX7XHnkCNjzhdJvc/YqX6FCT5KWHHg/jdjPIW46esXHjwX8F/wUol3M2HD7xVK6DFs2aAI3/YrJJ/7S0+20r9R6guUj3EMqFUVK5sPuSK1+MIMwVQb10aYtPMgNb47GJOFlnCINZSxZJzny4P7qzigJKIVr7OA/9XRGqBtYcSYOb4zs48ooby5L7/thPTLy9SPax9gVc/JyDvFOy/6FgW3gJgUKi42Bf+LR7334D+aBEP1NxEpXYTOuyIAL6Muvqp4m1aD6EaN3E4M5zyOOodFDh1pkZ5bTPPFmLR86u6nv/17/zvgchMIjl9COfFyam80uVNbv2CC5rg9CNSUdjxb3TFFONgnoY30E13Fz7JV3tBs0ORapBM5/rfyJeOhGar+PVzoEXoBvMZ8av27Pllo/mc/gAfskBOvp1/TnL/HZGq2yxCRwiqOOXLJrA7RwDjWqoSlNTwn4bqGCAtFjFjgstTgqPS2w8yQxdxOJH63+Md/xQqFSNFecCTF87tDOMPini81jwR4cT0wudWu6YhJUYbqscqD7Wxyv/VL1TFPrNxho5PUVnycla1sNnAmRG/Uj25KO2qYLPNWcjh1WcmYvzTFpKqidBfEno6HM5iEg1wuK4Zqs5HSirSeL2tlKXV3R9Tj2nUWSPC2VMVWS5EHqct6v/rri2ivHlYI39r/RTGqGs5ecCnrpv2Oj8hHI7wuRiPqkHifwn99vVqrIrocPqsjPB2Q46mua7zmM+EDzslIAdWjZnULG7KvGI8w2oL/vAA5vcB25IHzv9clfvv6HDVGn5V4P9xg4beXAZLZKygSv9wFBoqko4mZlJ1c4Mi5ax8qVmpqsrLM8zVvfx/gAJrvyR8y9ZP5QkhrWdD7WG+J3K+AtEqHo+wPN8ka+Nt38ZAqEOpRO/ZdPdPoHnMZ5Mb+FqKWuSsCtizuW2cxxRKb6C+sTjgcdtmG1rATFmLasn/d6Hb8EsYnDooN5J893xSGLz0rx/NG/pbIDALs4THTfaOC3+3DkdexCnO826+Oj8K107hchUyGUnBVeJN5M7Rvx8arRDKK9ANDMLoRGi/NE2oHqs81I8ZSfY58M3waSA151bYCnicGaN9lnS+2lRgFl/ncseUX5Zs91hoqlZxKmrluTbIJCkx1Ai85uvgbO8A4FoPAzi4KgEDHmKswYnWvtoL9Fq9jNBvDJPRQ20yBwe2vUPGn+VL4ZPp25QvZa2c/dJ7uSv3+ADwPzAe/McD/9jUprWdFNZbHn6MHKUqb+aY4ZNZ/V6jMF68LzwNLxhJph/729AhOD8pqJYP/RH4XCWXq4T61+o7ONn/Jsluw13Q0PRA1LCyPiGTX7QviAxnnZnSw8X1XNaos6fHlg3LfvHj2cGcgsHD8CY++W57v+jFYcn4Ik056o3s93NM83XI8LNXOzsqSXBwdrQnAWMOzjSmdtaP1ZQsgzxJ57lGgCQEziowB44YOKKKhH7ZKXFxdm1GbTpZJ6rryfm/xvVpu2sWx1plpgbywExwcKi55sk1PzWoeRJzrsprFgnctlN4XBUPY9y2GFOcm9NOe4Fe8+r5iBRJ9WT0UJOMLeES5ddZ/Sf5IrX5QAOWmsNu8TI04U5oyX6/AwcADhz4YeyBA6nj6h106hztNqn+tpTBJlyFo7rBX1Iclpu90eK98M3n10IG+VDoo/42dAjOtIILCqGYW8pXIscvFo/fswR+2+4S9Y39wHH5Makbpn01ok7B7hFn7lwoUu0t/tB10fVRQ/pd3hoVH1Ui7nOlRChFUWGigE3SrrnsUq3ner2urbQ0PzbbnhSfUs3hsoFNNs2OzTW6q7yuTaa0UHDlHLb9nb962QzsvrKPdUyxBdulnU8I55VEj/1xwebjMH1c3NCfEg9yli36CLum20g5ahbENjR1ZTwVGEdGhq+afIksfsuw3UDCnhm7ds9sFUYCHmIsPHVO2B4a2z2TXoN1p9YYJqOHYRAWBrvDlpEPm6tUx/xJvgCZHuYsE46FvEVotw0bX6/c/Qv80OUm2b5PrnOT0N1h9/iA56lJ07alBPKV5vLYv+RxpAbsOVi8pAb0i/f4MMPiN1YLShNgk0c4Ot7+qyowBh2jwUOo4vwyARe5I1YCn/AoMOl3ptcRmBR+9Xc/aVBDuJ8TNPqkNPD6TV/pQ1/JMGWhs2Rum0m/r5tmOaTZM4AF7dBdqRT8N/wxfiQ+sPMt6tmuckgQXUiHgy1/LLJ5JoInJFbuINHozmgyaj3LOKDUGiZGgF0IPsBOcYP6Eud9dopNoLjd6jDRdUKDydWK+ef4fZvYbeoWDE+awyN5imMBzlQw3u9AjQCC1Vn1mRPFFsw/JmhOBV2ofgHPGCTTjQG8Tr7Np5qx8ZzpK4ikFpIWcPbHGEtz8uI/DD0x1IVewpkkMPTE99/ydzaGvEHB8EwGgpI/bZPzBY62BqqVKwktDxoWv/FaoM0SCiLMYj5/WJIW1Qhu0ZPjSDToq/H9nlDpoNMjjwhGn8mzGtzW+SvvOlOCRv8KEqt8c6nS3PvoN9a/w01KcFaD231rwi1DZw/kXv8ZTt3LWSb51dvh6Oh4QsnksJWqIaQ6QSo4Ve7AyejOeLJ3SHPMGxsFmoSqu74qvozPAxD1D7nxkNCb8y1cSefq0QMwbsWq/ebhvc/YXS2CkhXUIxBtlTPeMkYNTACmc/77HzC0fUAOyb/KQC9oD3WvVU/G7EliJtkLSJBpjFdD+Nz1Q4W6fs4qrw3g+8erVnjXYqBzV+ngxLcnhoIbLGDFet15EJ4Uv8I2S44EZ3SSDwIJjo/U1vAd26B4WxQbFr/xWniHRKcGGXka5z8nOA8AM07dkIl2L6kHUqll4ZEzgkz7sXdfyk+tWlYryP9+2qKgGHhep+dDX36+OcQ8r5Pm+Ptr19c+j6Wu4ZNscsNpL2tjW4HfkVwdXw86XVt+So55BQzAF5kB8CMsxU2zgx+N7iqva5MB7Jyxk7xzAuFxxipJA1LmPsT85NkWiMYvvOq/dcywXjtXnSL8LekA4XEpzvDkYJRvu0cnc46fPvAEmj8iFcu5XWNFEd7MVYw91XTe914kxmtTSr20UtCyAsErR0hzl5KAh/oxSKMxTUrmjldI49u9reeMbflIzqmRU2Njb8NcVYuzk9rcNovy/4EhN9fXILR7TQJQknODznvrL3abBfODn5hCHqh0VmWpDj+lhWzgu4bQZyfMYIq4qngPpxsWv7FaIDXgRCjvjJpfVuMPrxm6HA7d0Y6xXyqgnmxAahXq19q/4TfXIiUjCyPVLP4K8rJdIgMiweMla+kPYDvlR4+XjZM8Hguk0oGnYUQwuneXCjpVzLZcl8guqSQ4nXY4Xz5f1rJh6owfoUX1j8bgozL+bdELAH0vpTqdUROmVSNH98AJoMAj/C2Vm229dcIDbNYc5xF8VjMPKxhYc+Vt+l7+Kfk4v+egDfnkqjyvxhY5P1DyZc2Tc7zjZjVjuldSVsNyWE1CQCeIJiGSHtJY5HL9WPVksHz1L7TJfHTw9iubqCvfmviEjyWYSFadsoH3lkcnEmkKLq7wWoiTpRB25Gsnu5DvAbjFi2OlMOfwCpAnO9YoVP2wK5PlyXbqEwGGxVvY0rD4jdZCKjyBVoTNJfCL/xHBoY9fll2rYSc+5AA6WqYdC+jsgfGfhI5odaBxewsa3yJxKIcB/BfUfhMGzxWE4Ax8/PqChYzlWQKw8CfNmf8QC39aAjtm7HysJsLIkOJQOhHOwCOchAeiMUvWzo9O8zpGTJizKoApsGcrzCb/2eg6eN94xcgBu5ZM39MTUpweAXYR3fUzlNMoiHggby680hFI5f7wvSZQ6MQqD/VjNSQjj0p6E7T5ndNtIWWQQBAAAIAASURBVOFxBpkic7MEKa8F2DinF1vc8E8GcNHQ2qJhrUnQ+NwkopWocm7rP5XGS5+F9x+0glNEvjSj3NqPyNOWjjZwq/oFivkbqp/5Eyyp2AuqRKyB6lf+Aro9DdgOBxZWa+w6+DP9CJTgNGOP0R8cpTmkNK0fZIbaqJtlsnO2JbVYnpj3UlEuLDPU4Ui9cVuy5bXQFwnjOdmUcU3yGWObmWT0RrrLXAyE4NBw0CW4zou+eUP1b0pwpNhbOO5ay4UJA4NuEWHqNmUPdt8I8syfNZsNwE4KBvEoVrtH0DX4CR16IScEx47xYdO+AB0gwcmEbDfhla6NIXQZrCEhmFBg6DISoM09HrR5iIHuSl+BOwlCegZjmmvu8EpzU+X9QYTgZif3gNt84wTHI19os1A4RehNQduJ6RSTRevgERwHQnBIdIDL2L49AdDp/qebLJD2Ch4UWiEVlMT4+HT/8U61Z/oR/taq0UedwtSwk7+uAkyhqTNab+v3t92pYvTPvwe9rq22oOKo7MoU38KTDyaZKYzLbYbmtHWt+WUaFzaAzI16I6TUWW8w1zyE/dw8W21RaqRry4/LGpDa7gBg3znZeIzTe/KQ/RM0QedQP0aJPpDeSO917nHeGpwulum31R8tLl4AtK6wp54n6plxfBP88fO+k8Q4PT0FwNkcpT7d4NkeOH+A2Mr+j6Y/ithckBGMPI4oVqq7EC5eYndT97mE5PgtE9yE/Wvv1umWKMChqGRDp+90SjANOoc6sXiSLD4OesGVXlX3r/L5xWMzEPLRr7bwPl3nTPVI8iXWafCpPPe2UUXJK25B8onFrtl2kL1o3SNtwuPksDXjVoeI1ShW25WRSHHiSNMKKLo7tfUopE8doMnWkt0J9mtLkQ4Nl5juwKL+y1qoqgHcEtbzUzOczsj/Tm8JhS7B+RSAGSDFNYU2Io9GCfs1Oq52tIiWvpkdBdWDTSrI0bYbDkkD3ofASzAvQfcilV2UOhyOz9r7Y88jZwN5Z6G//CLjyfBDPHyoRzhLm3gSwOuhigSdGHW4QerVqy7+AGAmSfK65+3fiu+rVlRTW9cvIHYdQ24txiTO3w+KK712UnLbsxU1zI91mt6EOvDRkvzuZ0Su9gf4tt5OL8droT85HSBcTo7Gam/TBesb6biFIByuXNg6Yduw756QB1+BXleQcsCbGBB2uci6qpLWDHmzV6R2COXFae+fFXTR5eb5WW9UaDbokNz63W9WJ3yk5AY2sHHaA/WKW8kugOKU0NrxYVDlhRI7ITUkxwFCchcgkjaQDFoiICS3Hr++KviBuYw14LF80G6cZwpYC7QKIrB4NYVdUy0QtTnCq+7+Cabomg+rLvb3M3OfWBOtpib1sybofLGoa7LZSna24jk83HO8TNij1q4ozdgkKQby4yS4MTsKE4BlggqYsHX2azh+6/06NluhyC5RkqcmGeoQfNYAaGEH/Xny/oS/SUDyISIi4iEuZs1msx/qBL1DNptL0jzE4SsIHt5P9s5OVQ/WBfP+PF6LziMC9rcpuN2rjoiI0ykoTD8KPsLHmzcGffwIAgEImjEuRyauT7nYmrN24ZtxIBLxeKI0gOU+05fQlrdKCFvjkkeO9Bi5PhTMmtUPeHbOAK8sHMHLMcoLohwx4KF+DDAA7xU0I3+VnZ7es4jlAaPwsDUVl1VY75O1XCWtLzkVagNl026o/W/hWXStQDCsQ4cOM2cCzNS5wZVsPxATVh0UGwXiDTahp3gmUt2apbgNZeAJLerRIiThrISAVIHRcteNYfVQspxAZRIRTf1hJEQ4tZjBrMf2t6AnUulMVOrLxozbFCDZu5XKIwmCEry+IwS3bL1uSpzhT9hbF4HKOzspYIu6YFEIOgml7mz0B/1qRSoxkXiesyJSkrXMnBBt4w1I8oyjIuqhyGDHjAbHTYVOCU3R+SAPzs4aOXLrefzAqqkQpULwEFP+dinXIrp1HGsiVnGoG0xpRr6cj4NOzYeUUzcuk2zrSMvMZ1OpCk+eftW6L8QtyY4uWYE87pPgSamXli9TEObcWjVxk3zptcdgjXMiCrxkTuJXyBcgcDkapBfjoucHBpCAh/qx6PkklAwPmB9PGJb4GZHC1ugVqsAr6H1ih01e23sk6DfwrN/zOrztHAtJi1CPIsLeAFZ0g+9v+yldsx8R1a0DIbUdDLntIJtXB0aRoyyu8yp486r2CXiQC09Mz2Nh6AFVuL0RPoJlKFIJvVHvoUiXOqVcVfyBEWzdWsBVSaEvkTL9sc3y4izeENEWa1WC4u+KVP0Rv0ngQX6lUlRebpZoKneDm4vWdXtk5vByCiQ1e1qrhZmVF3wHUkLoTUL4vRo+I/SZFLSKW+CdC2wrdrJkRDbhkCXsUrGm9ZNCuyL0bT8YoPPVScjb9n1OHQKwGeewGNjVY3SP70peWsvkCOa/j6hiFpXAT8KW+YIuLR6xf0zchqz5pzA2BZoJRtqljIQXv18OuDFiLNzoSpicdEp4vwMpzrDq1Lk4RbubD06yEleQxDHrYcGuXfriiH7Ica3hnSbuBU7wyl1Y2gZgpffF5XDsBXSCkuUYyKF+rBPR6JuIlkeDYxp6UmzxJA5JTjNpFdv19PEIptQpuDZdAqGWkW3isWXgVrfvFY7iMZ6EvTHSVIe7eeiO5rkF0GicrIcMbOa3eI2F0ay3zlVcBHFAH7j2fhkeI70RtCyEzq47oPfB6rWg2jH9qm4tYNVhPeDiPwS2Bbf6tphxSfvkz4c+h6N6nBCfzDGrcnmrwubGdcneYstkWvQy8EqolVcAixjvtGyNS1ooZ9N176FUz9FUlQ4nGABKp0ifoYz+RpS3koLQPQEQGdDqMTABNHuDWCT5Fb3NiTFGeByRx9sfjLkp2rJ0e6KJTksQ7cxiQ4ob3Mop39YZett1cqYXzqqmOJOajjzR6fLhhDkPoGTsoaM74ZQlEB6Htipida6NyyP5qBOpK7ARWKXXy0WkK681WzUxutEFjzdwxdv6yiwU7VmmzfyjnjWziB1yTafbzWDXO1TbIbT6Yk6ajfgZsR6I5VAQN6vT4YHm0c3OqiCuWtOvjyWom4XaBs+q3QlWrPJPXiW+QE7aWA9DciPUtjgEvdACw+NiqRpHeNxbt86wCjrC4o2mjR/MD36NloPuU4mMacue8fRuyXrCpSh/Y6vY77PFUOGhSAenrvrlHvkOGgZU1cImmLuJ0JuK8riz/Uf2WFW7c24qh2jRf5PD6fAchEeBLZIUoZwSYXm5wlyheP78OZu9bl2Iyq0guduMoqKJOTkziq7nJheoVOsIGRKtjaRQKMyL2WyhEp3Il/JtqWw2hBpSsW/pBNqnEpxvWABpvVtBQKttxOZohQHIoX4MmFjAXKi3S/OYs3JeBCy/ZcjhGLXLDSZ0vDz39ELvnJYks3F4agpylo+/wGV4BpOh5LdvRZdPTa8joPMQPGiaccs3lCngyThun9K7spiYu1VDdQliYmJUCY8SUOfiNWKWUrUDqGV6+OiRzAJ4AYcIPYEnbkZ2icFN8AhxLPCQYy7R48D7ConNopw/KOmXy5enTJxyUBfTRowYeYkVrNy0uKPdLVJgJ/JfZ2cfeghufYg2CztKlixu1qgCFqeUzCQaQOvLrdeSsw7BRB+8ZdcRwGKrBDmPxASfrzMM2I8ykNl4eBa1YMJd2WCPBwHdAW5UqwWe+0ReVS08DoDHcwHaQMQHej8lm+xKhv83UJ3DUaAqB5SDcszKzYh+YFeEwpcq6+i5CxkaamIKsKTej8vpvFTkbXihWsdKZdeWn3ljdgOnyLXo3J58YBHswGdR8KZHAOE97/ZOHiFNvHZ9qqRxq8dLYfLbrl1NYFPTnuD6vN1UaH+PfIT4bgWe+IEFXjzBbvtb55Fz+146XU2H80jyYb+dkfWkw8MTl0ceB7DsFX8KxnkQkxCKoM1XHfYGdZOGzWng6ZP98ajc56PlM5hPGNyTFqRYocuqNTFzW72x8BtzGB81pvgcfEWCxWEYk3sZz5R7cDwsN3S6l+6AdfXjbDBp+wJsx16Lyprze09p4oDS3/2h+304Ni9RdP8nOCmFSV0kY3lR0C8XVOM/bXi27P3zsnaoxy31JkrcBN5p6Ugwj4btPRKlel0N2F+vfDdlngV2ZIUsdoV3vAavsULW2nn+br38yJHvW6Q3VCxqZnHfYWau1bo1pQEd10gHt7kRH9+6FDv0FwMn2z7zgaHRhvjqqPUkv760BRQVOLbqhRkIetfaB8uzIPK2PfkPS1yyvG4tUm4IYUPk6NXLfw1AgbfSvt8TqsehGi2Biy8KCIdrvvMRv/hvmqlGZ95XubxVVagrRApWiVwu56iKa5lIVMFzJMFkJzLJkcjk8lI5m2Veoq7QuKSVJBn62dX6+PUDkx0sS6vUrhBxikMEcDJrl/WGiFoDIf9O72Mej5/57nV59kz80KrH8ufWrNlpF6IPlKSdsij7vRDGuSTs5206CAu6PHcnhN50NbDqPZ2wv9B9J0uRppdXLmRmtGQfFNs9bJpkmXLjkKy35HX5cHCLQz3gxuDsOtPLFEFXVh/elfpE5SASKmxzzsPZQknB/NhBgXZZvc07v2gat8i+VVeC2vZdu2KoTQ4dSfzHmKB0to1gTfTcWi4Ae5stqrU72uYTlMXWTVt0uWxU2rAtVu0vOUXGveI9aNB47MmfH8huyBuX1S/KAd7b1/YvfxGUvLrKlXLQ/dSJRdB4rPDly/Hyxw7poSaHw2YpdZtoGwBLvXJXa8/F3YgmcyPkcbaMm25VQfjV1S3BTft/PWvA0xa1slUdL4xrH81eFtP96agzO3YqVtXaN7vF7oobSG+gNl9//2BUlGPh1ijHrcyucCuzmxl7UuXoDgoeKJLR0GDl8CBYKYiHIR9gRFRk/PLOro9GeD7Y1vHumoQi51NtvDcUFDlvTIqZn/DqbX1s7Xff045I49efpOaupeHrpimU6j8dXWUAoxwOexv9lOgjzqRCQRiXqISDDkUo/6I+uxgI0a87+rNhm0AFlNbgkrYxoyQBDgwKvXblmQ+xNj/U7QsX2Q/bzJ1FFIX8/dap37VMjXoHA2q5via6w4DEdzBxicveS9n3hijIx+c+5AfYviEVZl5UgZfzSWI/fbAjpu9YYFromFZV7S5eHA+insV8DxFR1cb2HkFCgkAKUy7AAvPSQ6yEOZHz0xO7PbnyZnrs0NUgnfLyLcyH3lOg8R4BDPfeurhh/M1JqMPpo4uqNUyM5jxvHhUZAJ08T5eApfXek3EoNxMLJZ7J4F/v6Hb+ZP/tzSHv6O9XDv0WNX1G8/EbJKMEV8HK+2qzKHG/X8QW7MZ7YNZpGAiJ3oHLPcGc6HDJnRKLSSnWz9LNTQQZVtlQ4QrYVQprhrUYumcAhFq5e18NWac+HwvrisSKRZZin7szBaXeV63igiM5fmcth7quwxpyfS2EXudnNzu8Qg5yjrzqTYhIbcku+Pa3kvWEt3UvrBvxoR6wA7ZRVzFv1+Y3XW7ytvsfjRzSwYH7Dr7P3gcT88+McBnvstw2Z7Vk1uvby3+FzLqkxLvfIHZrt1Vq+HV0LxTRF97NJgG2NgyCC0EYg61nq8akVYdRDgeETaVlZNhUVEhMyvlqtgwID+ODQg1CkwrgV9Adm8UrqSC2AovwNolZ0RMbXOrOgL+Rz82tpQa5i22XijNmuEeAkJtW723vZwVE1/ARmXZ+sOVDBSu1AHzzJXCFA40/FkDrImm/vFZRTVWxhdD/Sh4kqQvB/4UacuqmqJLBwmtL5zqPJhTHDGrWt3XrvrjhbqafzzfTZj1rP8ny7K6WL+8T3vbmWmxZumv9HG7iyMa1THqwQyxPPBspCT4XPc4ro3nJYymYDVhTtm/N5aTeW7knDnFibn2t6t/+6dNnhYWFP7nQMPpZYePZLo8TvL132rD9bPqOdd6RVbfxO365RcTTiSm8DjaNH+V0eTv9fVH7fT9bON18C71fQCPlp7QHlwtPjWwB0UrwLsg2KZZ3a/pCPKD2qK1vCmwSK7wDofxh3YNDweRS7DsTSa+GQX78hp72DT0b2+NuELyd1y1WXZwDEHIDMjdOO9C7XZbpptjixMZNHveTmNXrPeBaclDZ5FrbnK/ZF06b4ZhasPBczusuMRUkef4aadqkvMdL540jgigvoaoi0uy5069O2/USZH3d36Q0ufXeqXMK690nHgg+mdYqsFNesmC9CXrkPPyBuHf83qTIAii6wfMqK5I2+bVF1Ej+h0x1scqS/75Rs0h1kPvrC1LbwJh+J051MbMoc823cc3Pd7XJz8eAh/kZRskKUc1oqA4h1MKdCP0nIcpLKaMrZZgcB0QcbCCrJZQZNxMQmzR7P7/ejV2VVJMl6mGTO21qD3ByWA6XIB9AWYtqjJEvqP5I/tOVnXAIhy5O8HNMNfo3wE1w0rnEoMCa3C3PXqyIP73nposg+gzR52EGYbK0NUE0dYvN13D09NTYY6owzx1f0Rb7EthJEkijt/Yf7jVm9OxrQbYHRo1wQqxlQraTUzbZj906cTJm0Sn6WCDNSwHQCJsJ5l+CWo4AqTd+31EL3M8AXL7sGrXrMrZRbHC3th4HYP0BljVqROzMIOZXLh+IC5kEwunJ8Bicjl149XL0kIyMevVEJODWZZDDhJMTP5Wx1P5CV2KQAhyaPHzd8Am3GwQ1WBOy8CvO84NS2DQ4aa63a4vn0Dpjl11f6HlzdG0R2BF56rpGfLdVBpiLaV7WTJYGwF/umHakpOgDMSLmExV27AvoBYIV3t8EXIXFLQFzZVbQjadHm8lWUVTyXl+D+U9ghMN52OR6uAptnOqZmHBZKoWwQihX8OSEx9VV8cQiFc+GBCE5FOarWaTYyfVyNYstqHCqZ2HjKsytvuLdCE00zUX1R6Gn8+Py5L7JbHYTYfOs02r5LQW4RE07FdUG7BKK4J34XW2Px9A/tWC3ic0re5OCxKZWKYXwMs4K2AUK6OLxxKpzhFrdNzm7OD+15IX71ekK+yoNwtfhcUMTFovj5CXrNHhd/cPZk9ovdK3F29XrwxlF9kSAD14w7t7CU/27Lj64oNWRJR9gXwZX4RrvmHtyR0wKe5Llfcti361P51jyWPXtHTN8q2Ya+Do41PFh72qdzo7i3I78Zuzql6fXn7YtNitpeHzAjkt9Hn21n/dg2FNo6vng3KJHMKT5rRJYEwXTB258aLVbNvrB0EclF5rGTih6le1m3zhOwr/W+GNkudtyz8Ymx7uYZEf2OqIerzufwiehgYXUbuzr2DZ2fnfGPH2TXwH3v9svVX4ihDd3PcSsUtv2sAb1e5ceTupnr81fPJg8bHhn3okRz++P/ZBesbX+x1kL2kgfJy//0bRMwebWqxpy7sdmtywKvpdcMSsiue/bgSbpk2PlcvOZp2DaWTNJlGtsqYRXHn2hZa/ke7zy5h0Ej8G2X9KpkoDMT2t/y+S9F2c+XRplLnfsXPpOlZzMGhFl7jRpW/E0ttGG30SX5tVPaWGUw3mI2YxnOBGLwyplEZZWbuFjsWzQhAmtBwX80HrChEGtl85zcrLDOcZArhM+x1bRZm30EVcjtMObIvqqVJHHV3cm6t5+gJMB37SH8Havyn4D68D0J0f6wTZ72HTkD9jV/hXYnK0LYE4bN/dC3WhH2r2DqyCtxlPVfnyM5uXlQmXWjb3zd25NLu7dWzRoBkwB2LcPIBi1SWzvNDXFgebkjLQTQPQZwcyJyzZLlnQ6cdB7JJrb8qpJy1pUttlHLse1qgfeDZOYVow4ue7nrdAo0y8/M3TlCJjy3fTVKzMzufch6+v3b/eKPgyBk50ge/rXUG9IqxmwM3P2Zi1VORMWhy1cxnAX2EXkVwSHP+h4c972KXiqdWwIEN5JOPKFC/DTT3R0V1NgBnkRztnBDw9isfNrQ1p+kwb3CxqlzA+2LSbvcFtHGaWFg+MniQoXodoETTbMBzqik4QhcA+vtthf5/aK94uz53JqnSX60e3d18n50m8ABpVFwpQNUObYhPavMdhqRMhoUFb9RCUMjYZKL+YgKmWrLL7C1l4vKLL+42UxW45eCPMFAPx6hY17FFhCPL9FUePFwvek8qkXc3apGKp5Ma/q2tI2i0QQs4EbAHcgDebvKjPHi7i2h/Z/5Y7+14C8wShyR8dIVSC5v6ZmEdryi8MuW6Tk7LVsIhixOGHo5ZJO0Qlrlwgm7psIwXRCAzFfyEbobXnqywFnogUQMscOZtuJ53F7BaeU4PzoGB/9UbPYtQXjozkelnFA9K9jL9BssKWNWpToUVmemoWqf/3djOqsE5uadYEKU1KkWyWmEjQZIDAg8tTpMWWPO0aHCntAgv5rkHfg8VUB+ya17Rj99RyiJwsfdZi5GAYgxcRqJDMdU3gh6AKqBYTe2sEOqV32IkXIB7sp9zudSwnv/8S0WF6tJnz5rAF9nj5779eXfLMR3SH/RRrTPZxmjuVrDg/nE01m20g8JUaSIRUQMPAbLHzHXJsmcJmkbpJIeEzfv2oWORj7+UaDB9iAiQmwhXyl/PtTm8M7pb6/PKNjQO/OM+RsFpfLVakEHA4XSuRTO/X3Cxw/aKmQvXpnXEr/4goOW1jBMlEqLUA7JZWiq6ajP81R/Udh2tHUrpAM7u7Jac7pYGV1WQ4mUCY3MZHLTcrk5mTT2eEFKKPXkesUp0OTeyqVO7mfVU8Mza+6/wTK6jZ5AxZ5Jw5MDy1NPRwYMX9+6cHCfq6e5a5dox7D49a4WE1ot+saegPHl5DU26O1e90owWzT+oF1Z09OKWk+lWTlrLOwCcKBD7tVrU+F2wiywP711ChiNrRMZPMgznvrvfagYrmp1O4lKnUpCXioHyshPxlXM9oaF5dTwSYK5Ud7mApj676839zOJP16n8OZ5fqvkZnh8NZKOMp/+UlFp4LBN5VgYvXztGJI6kU0KKIa/AYXRv4Wc4HsYKSG3s502xG7u3TD9UNIb+PPv5g/aVDvYkFFhr5y4yznHHfNySlxJEXonpzubCqUFxUVKT4VkZI2xxqo95yU+4ER71zKFPvO0TNlydcBK+STSfmLN+DYpHatdyoc24fNIk4v3OOnco32NCTWbDRUIzgPdwkxIdWEchZeDv3wU59ho/0HTxWouBxSiVCkPzSAAxyVmjt1sN/o0QFzDx878CqAqwChjEUsWHfzqletnAhtzx1+dadVankyYXDJQUnp/g5IckVy+fxESmRIZwY7uTkJcrkcHK0AOhJ6g2Ryf1Rx/5TU5jt3TTero09xPnfNBSaCCqula08NetDd79j8m/tnfn/R/80vNxQKLqE46Nbtfv1uhNyIQJMqHqan993s3jf92BxV7/zrSviYMKdiMo5dUCboTov2dQB2K5a69fc/rPw+ErKyJqyJDvkYyy9BipvtveWet3qLd4M19wYXqxsU00MS2jWojN0bjLGtcUSc8/kDG0Ni9JqsCfDocZf2xysapDdre2Sjng6Hb6GuZW5lPvb1hDCFA8fzAUcSP3Xi78XQ2DGNqAYTR46EoAsjSSDCdF/sPqS3EIgX+m3t++0JmynfWYQlzA9+MjRXXqGqNkvVkc1Z55XztsKRFGEyqFIbmjrYy60+zUdVTlPYJmXAsigx80m6yJzRqQVyf5Na9wi99U2mOlzgyFfhx4crVMbsiMS6dDCyMRgdLaL8xrLo4SN0jo8kpmZWEiwC9EioATmkihXgsF8ZPTDrypL7ExXhr0aLUJGK20VgB+S/aII2KbJ2nGpiuCO2FOX6TaBWpAq78iLwXnbb98ZHi4CHdUGSL49kterU6a2Kp1+/7w3N3p6O7gS9l9ChpBORtU1E9W3tkrVEEzxx+tjEU4N6Dm3c9KHTAXjSHAdhGs6004wWGcG3jPPEWXIIz9MgKmGGLf81mAGzMJAcMvd7JnoSkZrYYdgsg9EiCOxtUKvg0oZmgo7R7Xb3u7JoGJGqA6giprM2LsPeQlDdgOtzpu5pCePDnuFcGhEzfUsfzGiRUkak0nVmqWJTVQNMuZOizr9cvTLI1062GyhOsfqISP2z0SJ/IlL1RosQeqslFZUI27utk2nXYgDGow0SWxW94WER48WGXOZTiiuPMON/08N7TSmHju6qVB+qRouYV8DOBhDB5sJFku9F1H5eoKjFq/hqeJDGBN0YjdS6Q4cskBvx3oDrC7amEuJmctZFEq5Qh6NSV6zIdup3ftSRF02embpE975MLAenJQLpPlyIbJ8UYG0qGh7D37rBKf+eUx4MEc0eSPS3R5DszGFGRRhBmht4ajtGEai1AkNNfwGdFJr7Pa/BXtSWtldd0UGBNZTwLGTB0GsDjP+FdX7zjGGxHbATYQAz/LIDDTih4wyEwA4wGdKs39Q9U/h3DjzLDR5kClkydoFhk4iMDztnHK0sRRUE4NkXlKiqyv0yDmvRrwWmjvJrYbXRretaf0jBCjAqUf8MuhzOA00CjrfIfzUlNj4OnSbExjA2OpOrCpqB2ghLDZvD2jdbGFfnOjPiV8vjqo34FWli/xDOTkZH/AIyhwIxL9mNB6s2rOoHK/e+Cmq1fPHm070vN4aXyOYoprwktgJIxh9rkLFL/Bv3IcwmzOeJbZaGvxnMaWCzW8LEYWEnRx4UIVOjpi7dN0lh0nS8owk6h/oxZHHaAdMSJEHJmFhnu2Gz3qjoBJLq70HnNNTPaRG6oW1HiB65IBR76GcyJHcbaQ09L+G3jPQGyYuPSYn2diBvaRLhb8X4GtX5G+1qYA14XFtTbf8UZ+b2xXlMxmwGOCinY1uNQZfDiXFF6AFdQuTlfE4+oSMzpRoZGTrsIuQl0LIT7wQZSicSJf8quR6fUpxyZUeYtIbIGmGp4QdGsPPHb+OZacX/EPzsJ5S/Mu3RlSCUwlbZKmWOhMmtKDkw4mitE0MXeq0OmTP+cjSRq5envIRo6EQ+gt7xE2EjPwZeDxO/avdoNpxPIexKr39JD6VCSNjWq/9kc550GmwmAeaQbdpm8PMjhxiLABeXzSTgoX4MXGgMk+GNmvtxU6XZMY9nhEJ1yPh5poOCQzfkicc/XxHssxfgSAgsPgMDaDMIEtAZQm87YKbJ9Lrm0ikw/oA0pT88kXMERehpsTqQRgGWunbRNOb+Q2xldsbojdq3NUDHaPCQCFWS4bCXkJP3wOTpPpzeXxPOJRDIQCEgdCk978RQp92KeYVkd3vEVCl3b3NSLsj5KpQaF1QTRt8UtS1Usyq0nSqVvkUynNmsq7tdH9p4WfTPe5SPmHNKE3QO9WOGyVr0z7OY9jA19XjBLaKnVHtfonpnZJoKeDH2avKRL+NOTXU/+XDzSuG0+y6P/Xq/gbXcxj3dXlcUx0eBDdf/KbvX2hG1PzZ0OB/4hw/IZSpVtH1+QiZ9jO5DM+y5qvBp9x+xzWN3PxeVvX7wgMulG1d074EIMDCHNPYAr+nERPd0k+HFBw6vuQ5lqlo5P7zuvhYeTzPmXyQzMyMztfbL4d85H3hT+LKgg0PYoVBP6Yhpi7t1255EIElK+rp+t26vtuz7znKpWtBK2ePSvYQX96bPLVbIbmVmgr69gEjzA5XpkB/efJDN9U2z6F9D8RqNVUvWwsKiIrOw76VItUJ31EEVEqNrtFL1JkILVZbfbEBx+urSd2adTw9c29Kk6FVLlARqfpHp2f4mMilYeQY0gknAr7iz7rx53m8TBHHu4th2UJzUEsxiO+DNZj0S09XALtWIVJ2J0F2ANSB1RoTTbLTt/2MQoZyS+sQaBWoNHxg6X2ZcrNYC59MQE34yRwp3xTGv1woOjU2ZMaXxnpn7cKmo5U9GnnhI7Gi0Fp7Ksb23BveEdNbWtm+Gts9NISrY6YGndS9SAfvXqJaMiPDitJ+P72OrEqrN2tIBHakExHYAIldV20t+wjG/M/EK7fLagc1yHZLrFsOC+53uPIDcJ2CbasTm0QAZHG8A9IkAJ+e+/6ACgOiec58s3el0uqap6H9iNFSbCL0kcxdYyaCDc5eJfM6Ak4P3jTxyaOz7p72VqzLHSJs/DZlyc0zP0eGTXicEHZlUfJylPD59SIy9PKXtrVybAUdGHRl1Rinj2x27uTNbzYYHzGN1J0KX8Twb9gGI4GtEyeytmqBzqB8zkgxSibplDUxFGXlf9D2jQpe4hORa45DP01u79BzXtPdqSUQ/HO/de4kAhpMqzoATey3h4ezzI9xKiNKDk1Kp/mZQ+3Qi9C3xt4Oqnf8XsPe6Ww0ToQHJ7a6f3BLEOatOnZ3UtqN1AS//mBIeHWcGmhNag+OwZWbI+qkL6p7vdC6FWKe2ucXYVYGOi40C1WhPNhS0AKdsuxqK11iserLsHj8uvfQukajQxn43ITiTEdVPaaHrrstExclcTrgG8KfW+v30ummqpvuGOPl41p2wVL63xGLc21bNbzk/ujjm+MSD137ewTotc2nYtZXXni7nNosuOXw74p3f74Ns63EUpU27JiVefth0R3ex+Ex38Zmj2iaZDAeFuWLa8Enx8cXDw5+Fh9wOKbxaeLs/DXhoNBbCxKou3A65nXmjeJ1TfiLqjBlGWoGIdHKIxVFl8FY8tfHE6Qv3jLWVjE7Nf8FrbZc0yfWXGC4Mz2sZUfz81jyXh9mzByZIepSpCMWpIbYBkUQZBu7aHGLSHKJFM26085mamBD5fXp6dubU/dmZKRaJKdmZFOaJGCoPL7X5pBOrukZAbsJoSnp6+s2EhP2715RMNpFzbhtmCihVIa2BTF6mGj4WG4Gjm0T9Mt1KvjFmt1X7KMW8sbt3747Zxv40aqql0jbj8aDz15+Y5vLkavIKmYbylIEDAHv6tKsZ7u7h22+PMFa8n1ELneqEp+1cFx85XY0LFRn53USkSrWVbgB9Zzaib+ynogHq/FLAH7IgbrbljJDtt4otfpfxv6s3+9xX/CHtflP3sQZhRv1J3vaL1p0S7BzZ+daktsBewJ+R+fv/Y+9KAKKquvCZNyvDDMgiihugomMqrkiIgltplisu5ZaZirtmmuBGqL+AmpX7QmammVuamlq5omAILigkAQpuoMQiMAyzz3/PfTMwjECYqGR93uG9d997A86cd86555z7Xc7vi3cVi8BrIIQqDIxRwZmbVNTpxA9ENpVS3grjBtLL3ZR3GUveU9HTVQKZXZ4DzXOBNAT6v5m44IPZy1vd+khEBqfNlkCWYPcK8tQOToNCDU2fYjVf2fxCKXzH+85+3BbTWE0BwhY1l1x2IYP0Ox2ywfEyG60qw2LTdF0fs6MSshvSOmTfaY6zby6T3xgm6YP5LhyClTvUMwKdAxsoxuHq2K+7Np6lRkIRLJVzT5Fwix9+Gda264WcBWSwYFUgKgSLFMkT8OGSoSpAG/oNlP/xlrN54jIjfVX5Hk1VTSrSdXlO8SdDAOWOH0+qR+4bmvLh9KE74Yu4gr3jpyeO+Hn5ewG7u713mut3bnzKyLlDZ6/etxEm36x3brnSPWLnKN2bv9hvnKwCL9HE920KyjGpGDZCfhGgYRQDx9T91MA4NBE3Lo0MVARiGXFOtF6IU/ALM3f3P/xmk2HLlQ+KvmbqPIa1o4f23aKccXg7pGERlInj4UlzivCJsnK96SPUt4f0xjgRGqbBOvJiERZobGa7WY+blTlR9jJYh/cD9DFw9ADI21QRXRcC+fKB4dMACaxLPf/BjI9DkTgJ6yxXzOLARPTe5kBgggpU6BKUxylSAl8dMd7Gb+BvfwF4owFzAgXkIy7/G6jEpFoInL5fYBu/GKXt2kiIAH+7oav73oBsw2JIaPt48XzHttbburUYmhIDo3YWT9i8E84P/XP/4B+KG4L76RMTUs9mLN5q5eYk8uWdTCxX4IB1h4BrMTnxqaESqqjXU44DVwKWkDDPDl05PnhAWFL/cyM8h8GgAT8qoXadlsHkbzn83pZVqN8oiw31/cr/2iNib+qQXsSpAcANaWOcfG+cgE+kz7ilu8Yjm7PtzY6euIzOvL/dWH+jNVwBufDJGJwF6ADIxp1I7QnRI3+7EHDJlINkXrgaArZMvEQJReC6RqQsN/hWFr6R5BuwLhBa9j8t8HmvmJ6vsjicxSiVI+4y0nZp1k0a5PUCEFGyE1Qp4ARZtFHgLrvHYSt+lDHUFDtB3WEtZiYWMBj6ZbW7BW2+iXoenzX8m00b0JW7KTlfclkJ53xV4J2X5IPzfYiWcwtLgpiMN271WNBCOTS1g89h2H6d2lIVUW6VfVGDZS4BqBxooq+tkbOIBREZ+oNtpq4bW13fMDsynit7GVFt7TFwpPpLcUPIknz4IkExeWwOODwa/3Dzw0YobsEPgYhbXDZQNpHCyv8XpTB+fD7lf7zlbspexv1Lyv8qmlRAFWfTZXhTL7c0ZENiBQ7TMihxrLSxQpeFR3g3pVBCgTvH3hAzYNje3ESQ66DEh6tgrS38k0vXEjbbLXtU3mVPBx89KginvJBVbof0G/636/roVlv7rpmRHAhphXZZqN+ifLMq8XwOtnPFDf5eHza57JhN62EqZgnY7trN7OiJy4z30xw0t/y4wpMgas41CzwOfSEa+3WnFqfjP4K8w9C16aaEOSvP0GBI1aStFBV+vKY/qLwTVfxjqyZwVOKkcjFvZlOe23RyHOMlollAquAInEz6DbD62IlKHFB5o9mSRUvHuWfunRAO8QpJKR/hS136CJm7MEpgJO9Kcxs712WpYu3Y/kTc2EwWEYAcuyeSWWa42Z/46PQ0dQcoaM6FTa2Y0i9mR0JV78U+ZkcVXIZArVGlBQ3p/wJsdSFwwLGVqAv8udtK1hXgxzSYExvslEOZfauo4F4EKjGp5uVJ7ko1X6jWCOd8tV/n43yLvwntKn5VVK4ArIuKrCGLNiiCIqci9gQZrPCY+X6RiV3rbT+riIZEOaMk5+2MY/PaZYuyXijugQ/H7U5D4Gh5Ii13snpywAbBgWPXro3zmzXrw9YjAMf1HKmeuedT/vAeIP2cK25wMYVGcKERRLkZgKsBLmPQcRkNabhrPCo5scPPzeyogsuAa4ALdxrBvcro+k24732/ITBKzrueWUPf2aS9m3Nn+r27d+/+Pqdz4B6nB8Vk8FFebuGlId6qxHOwRJnyJBnYq6mOOwz+k/Syu/bbMCFKeQjZEiUnakupbkN7yg51liyG4lojtEmSo/qg8EQtKHUgynUoGZ9XYFJfKLz5kT5pbnzgh88z9rS+AsnNiJddPlWkCQGHMy27oNSwV2iP0l3LPWF52dPCuLybB+RsXYXHdBK3VYGmUlbfl4IqmlQcqAKuJgjORdBSD6mTXtNCkvg3lQE9uPKQxVm+MPioDJru7hUaFApMIlhnMmKi+YSl8aCXaVJZsJSYkNYMOSbQn3tgUwAsbzm7um1FRg1pb8uCHcnS6812LU+QR7Aql5X0VhmUZBqyWJIL8iQnOFKvoJJH5uWgEpNaxodjZz/rpQq9GJCvC91e2/cTcHZzK9flc+D3C3TqmBOMJp5daHA6ZiWSWn1nyNOjtAHRbgq6Ri9ObCh51xogcOzyleiv87HkCmgchPZQovwKvncfP89Bln1VAwrccwENyYFNcUhwyAEyxAYNcXoqX5nh5aBqcTgWJStCY3EcSh2KHTE/8y5f0QSn38ZYyZ/gCmH69pdzUpvhl0jZBZKLbYn1YZCK0LzcF2qGSQUaIPHVses8UvzlitDZN7tadlUVxKQ+L8jsGL1tvq0SRIICfGoq/S+8NFTZpALNcFHCLi6dZuRcxNe0TESxY+0P0nMFmVi62K8vsWWilmeN0kaGXIxALaxg1lYNgDddkNdHTykFkyxmZlkgwAErHv8enqPAAbWrIIVC0iouDHnJeBqBY3OQKipuUmC5kyDflBtoCYnQMpFucEtGqLY4VdTEnySXmC0FbcTLN6kI9Jhw6Q8ySMAaDNKQrLzCoOvm3oUVjrP+Gs/NpCLYOA99/CsrDHmpqMSklpdkugg+ciNVDT5ILLesM53XQEYFkGidn4iSlp6JNN0K9sJCtK1ykAsr0xovEUSyonwijdlmInQYaa84yH+j988Bln01CUTIvKOoS1cTxQ2ebiI0CzJQIN4cy4ZJVR3Z0uWdSkCOGDARwxFZc4gqjzupRpnUqqISi1AlPF+T+g9AJR9gqRddBrKkJG/IcaAixoBDYaFYzEjkEknJBRKUN7G4kJU3udzBIUfmnVSOvNFZ7jUJPj44bq0Eb6TPrPDjqhp2WHb869DNsqME5ZlUlDeAPIccUwaGjjPFJQRxCGTIpsxigMNYiVwlBLu80tM1GGhGKzKliIPpn+y17PsPT4mKTWr5Gi4JZD7IRwhiPV1SWcpBLQZiImLOztjICSp/UimmtxrrJYIcSR7IcIhriUDLjpqNGJHrM8vbGMuOfx0qnhdWroYjCo74b/Zq4rdJFSDn6uUY0fV06ACXoQNecLnD5ZxY0KPGkyr03FTQq9HaYsjtiapZ00TofwbStz2jOf0PlcNy0EDkxcc4ViCiRDRgnw5Ykwqe1zonuXYIB/gVwA8WbYG3b6a1vY4E+u1/iaGLSjHiQnb0YFe2VrtmhEWqht3erpZdfwfPNSzyT0AlqS0LDScD3ywVUsMBUWuMd9NcDejtU9XnbHE6tInDMYbdUdpCvfwd+XrbfnpD3kXnTDlWTJPBK0PE7Qk994/A8RsVho/+w1Oh4onQlhoOZBKBGtMMkjHJnlcT0oRILGK2wBuw6xSwUAIlelCLJX0bxfLPSx4rGB1gqYi5U15DUltVQEzG38ydWuK/sEjFYZGyGg7JCKFBqlTRRwteFwohQ0DljV3CEmvOYzCXSjcodrh2dL5tvq0ufzdXEfa658kbCjKIKJKoZGbphtX/lDjc/IP/IOP/j0XZahEZWlOOZGYs75QChLTUF/UbsHrNi4obC9xFmcPlysEW6zBVyGTjeTKG8nWB3MlUtv0P8eGeJXdqif98uIpTW08UYHL0CxyCWKouIYCBcicZ9VsMq+FMG9pptKrAYWN24gnJvGMShUHAqVEFmH+JuuO+S7fs+/v4z6RWbFLLxOEcJEq955unjfIGMSpQW9HBAoIqN7bWHDicS5eU9IAlkeYUGFmUFFvrcM/K9Xq1qoRd2kSbX5Pxxm+ydMu+//BcYKbhfHUqsP7oykkFEsOpoIHfpE3u9SPOsgMGVqudG48zSgDcC2Bh1pAhO6Gryz4VUXLNvqt3+CO8ibzEb2bHKyRFctPI4R9gUr/5DKsZqw+sSS2dEfivQyUm1UzDRWLwLWavAucUkbauY6+Oc4i9VLJ2M0YJMTG25AX4Ony401LwVcL7QwFq1YJHtFaRvU9xWFoLzIjmaz7O/1G98kbRbGWCZde/CBWntsrww/Gkm3//kKV5A/i5Y6u2ktiROyJGvyf/rC+/xShXdd57VruOdOuySPL7ezqYoFuX2G11wVteqvR5l4o/su1PvThyp+FucSOBipNv5DL/zHJeQA3DDlvdKMu+ZwQSYOe4fWM2Ie5fhviYCv/vZXOpioSf8w0Ctuw/6EDfwWpYPasTL2/6EtFZ8a6HUO8AHE3p0vCnAZOHjhp1CWydlVvPwuIZI+xsYIeN8S2ExQbm6KIRb08o6pHR8GRGxsnZpW9fE3HNV1Ah088zoWRA/x/MYS5wxArKokGpUhYbDEKI3rA/ayTUg5Pt38herJxcLBpwkjhzbc9tvKeEjTt37pwuhMhavcBwMy+U3MuzJQ6cgNz4WNT1t1aX4/1HHJk8/VidN9+sU/58r5qC9I2u9Sz7nhm0PGlhN4vefxM8LTtKUCpwMpCDOPVmC5FSSZrS0GxFm2SADNvXLrSwygvcaCUc1YtcFb9gMz68Si8vMobt1jMOOHG16CI+8Ybixyq81009ZN3ZGH33d4ceaN06IaF1Ta4WGZzuWuH4/RmA1SIHGzU+Y9n/70FVqkWSZMSkLlnm8SOGcslAgdNhwhv3Uqc+7ufbcMv8DuEjoSMZPEw+9ajP+wCTR56FwPDGde1UoGzyeOC+dKOfpgSRl2ggkVNJafK2BleLHHwOATOke00H74tvwEaWlf4/lIF54Lcj6DnOUxqNxKwCig6NwJWQJ5kRixjB0tlwAIrpMBa7vEQrj1wuTNQqDIywxodFzuv9LLueEXS+tUdh78U+etvrbjV1TtXzRyXVImY+nC8OFvJD9+6q6+WFNDalSXqgM++N/FxGlDlCySRC5+a16POUd/JDtQpJ+YWdNQrpf1SvvHl74099MyUfgG+rbIZHvmznvw4VV4uYJe8joSOjV4rOa3fN2HWqLcobLs9QDFbILYIT7k08XXTDkiexdF1KNrcKojWptW1n3yT6rZCRxxnftqyc1hhE3F5e4VP493DRyBwIxWOAryOj9j8Zb7MVwP9VOFth4LdMtYhQBTqFmFe4occ2hylPDOvL03AoblZYNkKu3qhJLbKdo2e0CjrxxnRhzawW+WZ6sWVXdUBq0BeDh+1xD/APhtpq89Wi/gOFuQ/nnYdLu0n1PGgJvQSNIPntuVaYpynLnWTasLcjsdISmL7WcFTW9EQH5LPRKpDwoZylj2oQum2PrN55B95Ep0mVIuRvO5R08ZdPDasgYiD4hxWAKJ+pnFLiVUQlqS1zfrj72Y4CDkelVXE3we2UQ9OG3+ng/zD7NISeAgi9UQTWuHJuycbJuog0chvnnO7NXOGB7W/fiuZwEgs0EiVx4NRJbJ7h5fLDVYSzQ2pbdj0bGpKXob7c4+YF+0DO4E/f/s1bdGVSr7UT+HXzDGC4D973Le94pVEl2nwErYgzEXYdnsfAvJN1FDJIanX7kkGKiu2jz0svnri6U2NkVhIz4S1w8JEIlKyrkAHTAJWi5k2E9nin+krfWHhf9JEqbZCDN2zHV7wQgIJwyHCImxOI/G2gqXH8bc8blZQnWZSYG6lsyCBDLrbNp5RdlMciuW8uE5he+wy9gHx63f90DfNgTs7DxexYqi7Q2uYr2Ik0OJmr9BOuaSZ1h++6VZZ9zwYf0Avpwn9wICvLhpiDYAiBOd1rZ1yIi0gKvO70QMXomcqmwr5yqMSkWs5pMOo4nEQDYJQ5BCVOorEOtQAPmXlGSaP0SVTa2IAdI3coy2dTwwSu1dFqpw3BwWn9LDgmG786IM4AwSHYgHO09l4gEtcXnHLyaywJyPNBJXE4S4GjoBMFcQoWSh1OsMexLEuaxMpfaH/Kn8TXUIZfrNdEHkKwVG4UNcukpreo7tEpUlbbkKFp2KqO53a7G/zOgV+3ED+kdX97yoYWyoSIgdfBKqfGMms9F1TdpLJgJ6faq9GdU4CYcnahugOelsielofMl1h6jpImUYhxYWRqSZHY94kJgjWqxDxmFFtBWo0gAod89o5g3Va1Ckpjyd3OnoOf6u7OSYNs/2ANEqNWxib8aqESgTMfpZYgW5Z9L9tRnC8AjkZvUEtAyzGAMFejUfEVKpVGpdHwFXKNRqiWaDlKCfLZIBWEQ/HV7CflDVxrzij1oFWAaRXXaoH3fZ8GehcQFXn0PjnrlOzz/zW9exqSp9fZ9MXyHpv6rW06ZvkWn1uuQvXljVtmcCQK+0b3/iWj1fi6FY5SyxU4cHTMBndOsQDkAo6BUUmLDFIBCNR04RYKDUjUIBCA0uDwmDEw5DphcbHd/XLkrQaFRTIONaNFotWGhg05Nrba+k02hm2+NDBfuR02tayzqcmaLU1gS2L/NcthU4f0mLH1cuo9Xnxy45I8B70eVyv8N6CqtPkWoENWgVqPXItENMUKPXHt5EgMhxsGqC0lg1gR5CKv15OyRlFjTOr8xhV6sn8P3he9bUEQeAAcwce/PTGmyXvJ0KoUWCe48NzWeqc50C0Qo8DJbhZ0tK8qntakgswxW9a8jlpCdJjGABKhTqLhGNRkEOqg5PMNpNnIwWBQczhchkikVisk2k7dvJE1MalP6LMaYlIj7P0rVPN/C94unCY88YLJF+yv+SR9/+72Zb8a1ty9mkseURc1NoH67t4tiZukE5YvDEpIt5uxdu00F62rsFGDf4GSezqTSqStudgauCDQGwwGqVAoVxuINQWxlVB4YMj0o0OmM60nCLnEujrryRk1uUJFLhTqdGrH5mK3OxYyVzNMam1PE5tdNcGbPHEuSu2MQ29G+7huOr+pDpxyz1XLySOKQ3UcZblkCladWjNz7fboAR+kT/le/t3gkc42uRxDw/uvvCf3VCbVyJ+EoTgySpXIxUvS0zRYM4z8Sf1AC1mXAeo+jm6LZZ2e+XYR+UpkWaIGliknLFITTKrPrmrPndLYm0fO1lUrphY7ACxDWyoByiM1LxzmQTjZkbunwC2AZnDup2gVxGGAxOlBFRaZ/MejEpP6hMCxjpuSSJtYzngOzYNYfl/Pmb/aQj5OUMWCJWDrlpRgm3/yskgRC57MSfwIGdg8ngGoibT56WPPWnY9G1DgXLNCPMMCZ9sWJ/gtA3Te3Im0zRu+J/wKadAe5Y5VdeTBjZwPKlAmZPsH/52F//5xqLrAeTNUuUlBblisj21m96nQQOlFSqffUx4bE9EDy/TAgS+PTfnSa6lzpoTOSCQfsl3pZ/ryMw0eh10tu54BdLEHsDXoQw44ArfA5hQ47x3WxJ2SvV8h5ztDNGlkZ89wQE+GfBqhCwHmcuruhpw0InIMB/JrKt99NaGS1FaZejgk9kV548LRlRp+++Mg4BhKqEXKEHWVOTLAzEn8Jfo3+Wf0dOkjibwmmNEStABXy65nwkUfPTs4DTswbVLfkOCzy4btdc+US4hyYy/ozP5AoSvFO5yje4Y7wJzAA2S4aktXY3qFUfFEaAsyG0xkcXXTbe0+EiN9EmZHTfrNqNhMZDYmcVNSMhvkslGK+jN+ixXknjKu3Es2qVfsn0PuVKrrDjndROf8thQAsadGc4oKDoVt6npsQCWuPfHq5HCrGS5h/INwdTui48A/TI067hVGJSbVYu6BvQSkngsbz/+Ipq2AFTcWMWVLgI1HaFMJDEKUysOH8rp4i6VcvX1pwS+83InQtvafVLe8+dhKBSE5OY5p52SrCshwARbegtAUMk6Yh/I2FS+ZSjfLkPICBRGa0BsHryh4z6GjIxwoFijvVMrc/wqjDD8cXRF6wV2WXkSca68FHtrGEjKbGGFbKngxZMCg8rqmYtUc6jgOgIpd57j/lKEKSSHKq1HFvVQfziP8LcuuZ4X3HQ9dyIGws2NSe9kg3zF0DxgKKlvevOFGaTNhvRJdOvTjiMK/1axbCDnYs/l+/xz/QKLjrru8wjqukmoRc26RJFc9/Lo1tL8GGULEn4uWBY8dNloFIiVx9CZM8IqIUY4+HgER5GCef51+B0cPnkDuUmpNNpVdn/s9D98Ag94gFJgIYl4it8iOPdP4ln3PCm/GTqoNEf+4dMrFXd98AB9sl6R53FWLh+xKHFxfGfvlDd7a81djz6+/sf78zPV7WrWvNVhA5I3b42NI/yB4RNtBp5RLU5LSs0aKhJxXOAJcCbeImcA5OgoM+q/mG42svr94sKrDDyNAy7MlMiUUvT8BrPf5T9gKMaN5378jW+/0wwiuDkTWxWB7qQFwirTG8Ydmcpd3OQYDJ8P4tj2rux6oyrh2bpjR4lcjGnKgTtGHOyKmLz8Fhm3bvgEF/2cHOdzc7DR8/A99p9l9tf7Hfcpp7d7qdP6nr5371HK+Ni0zV7R267b89KZb14QGGb6IPvtocfSdQY+x8vxVRfy9qghctisYdp/ylxBNJdSBVZ9LfTvy9v5v5K4pDq7HPU4POCcIetD/93PNEl473f7Hd9/7aPAPVzcJeO/mr5k0cNevA3srbyhcgN4JTpPnyoHjZlzJ/aWlttI//6KuZd+zwvu+C597Oeu9rvV/PUU7rG/wFx16qBZc2Rx7aYnukXq/TYDIZcXqnfHRM3o3XZW/8Y/ED1Xuvb6MGH90W2oukHtO/b7s3ME4v2ID1/Dq1o5UktoyGzTIQM/VHoTHhmJkW1V0XDRITTw28dkgkG55bzZ0gq4TN/befD7mj62gGXK5I0Cw78nFx0ZNzuhxaut5Oy9P/PSEIChu+2UHHBVXb2HGU8Nn/tUKR0rPAF/i0X4za9ypIHdTT58BXd96KxuuSP8cCcaQCDSC+aFYGE3jJB/GGT5ePHQPO3wAkNgF1F3QXQ8i/SscGKnKRGgZyMWQ5HVOpATDY4BaH8HBrGs467T3d7lT/9goUg7Ln4QVjEqiufhfe8EsgDbK7GKobXvP9nHhZNvvRcLHosc4xNDAYnhc654Ui0nqP/io9Je9QLivru6JMhQXZXb5tiu4HaUcYyGnc/vsWrGeMOjraG2zzgdPeZ2CVbpVDrB0fsa9d4bAFiBPb4NBX650P74oHCPAQe6ZoG+h9/4RRPmvcuS34onQZcMi4lZrjFFe0TqBoYiRQS3h5J0j7NdcFZExgR5HpEPxgjbsRTOJXMKfGDlZttFtFvMYT5HXSGbxHJePlweNIeg55qVw/G4e+sQ87uqBHX5ivvc/NrwF7rT+CBrkj4ZOu4jxzsW5gu9EhsHosDA+tIn8BOAoqrzkyIlQm+U1D4KPRWrjYoP/ADKM54FSDZckk+gVI+b/OT0NMGk66h0rSIHVp9ouNZyFn7yKJ3TKCbKF8RDhRYSXYQMi36XsOrWxMDjv9RMOBSNhv5JmWr3qNd3Eg/GMxMj1EPYSwiLp3Oei34gPh/OdhTnnj792SnDbfRtA5rzhnW06BTWcH905+p17kbWJlK3EVbNXE192fxvMAAbeySkSLBR+h7dvmjMDZuQRa3KdUUrzX+HsVjfLjhKYxeEwDMchD+ECmqMnQkeUhMiq2MqA0+uRzqYsf5IZtwjZU8awiX0vGAjHEgsYHSM3BuJefJorIMjVsqv64I1Z++4cN4ecOxCCKYafOk8NGgQQGU0XhPoEr1kxKm85GgGq4AB+SFoAdxs5p0hW6WcFgPBCjv/KM692Dr/qmQYGQsXRfl4iEbAscShMRqp8CiPDQ5ZxSxkgEEo20+XVFWYojgFLEmwM/L5wk/rNd66WXdWIPFxwvducNHBo39/W3R1S9kSvh4PkROfOcPQorIAVK8gDbmeUN4Rv9Axtkj3A67joyha4AGmB3RhaLP1vhHlYpHm+0Fot7vMaR1rL2Wt57ccRIl4JP5yTdVaRU8nowxqPkOeBg9LI1yohImJC93qjB/ew3T88Kl4ukarkDsawyHsvNizSMfpuC8u+6kR2AwO/9rG1iy+Lx5775vEfHuqoWjFBp1qAyx1MnX53dCpA1Cc5G4HVb18ReTt4aln8baeoT+0u9Fw4TndVkpMKr3XmKA38eq9qVATim1RYgGle8WsNApW0iNv6UkGdfX5NWm8GjOUaQ/VFRLqss4zylkUpRqhNJa9iLWhBwP1anTzO5mQcJypRDqriIig2CtqLrfjdUTRBatlXvWgIKru3x0xctSmL0/+K5I/0TVGXJgWtIxK3+KuvPhwBI4izFhV1lPwcAUDkDTP6f0RDYpeUDQFh4yBDErfqe//1mkIDRL2y8lZlbhGZgwqs5SBuA4l+rWR37XcyVpSNCymSqJpDljiWH469md0Uw8q5ywSpvO8mhDKh/aEAF9sSlix99EKrRaw2vYDf5s2ktQ6GA46tRAYYMTdsMVzpPBUuAV3poqQmiZbFoX6D0PWkc+3mh84ToeV2ZUK2wxmrOI9/bbWIZXmSvVKq0DsXQcvELgtSk8RdrD+yMiyFRcYLkKmLNjMsndtooiYzSXwxb14ok8gvxiUssdTEJHAvctAQARUmjasRSO0gBP2xVdCxy3m4+sXnPwEZOMAgFDhafYm1cJ0xSAzEuwuFkZ1hwmf3G0681BXJRvoCwyl8xefhV1XgiMghsYiUeLfIEYf8oZNSiei0+t7wcfFnJprfLheAjh4GvxYanI70SQm1UpHzBiBRCyhulF6k5C1fXLXIDWlXo9/4POGN1bqMVMkHj0PjW/U6D0caCFYthKkQxEocglVukUS9Ef32kbpw3cerJ14CjjIh4ttg0LAx31d5Hn4l1SIVlJgTu0r8t5Z6Zl548pQYKldE8Lr/WfvP29CY+GVAeZSSuq/1YL7cEQpB4ZStS6uga1fKwcFsyP/CBO6cy8gXRFFEBE4vBJti5BPpAudHzPUm/3mgSo7aVUBpQwXXCWA9wJh1H2945NcVvoA5gSx916ut3yotMS9/Eg3rnunFLIsN2QsKnxdKpCqRL1aA2CkdmpEuID16JjQIRQ1lDSduYZTFYk70izKp8z3x635RkCX58G0g8AAROegC8+sGTCdu21Q6l4aKHUZKQom4Re8b2uqLj6Bt1wsQNycwQUjE7VUOwBlRdZNKlxnIoyuz6QEVnYk7iZInheLHWQrk6eJrKH+SRE4pRgDFzWwCDeLFaDj3bV0tu54z0JOzUbWCQ+M7jv26fwh6crALUOTIx0S5zNZD9L7Pk+tOWz4XvTei3RhHnCT4L2C1qbpJRcjs8hwgRwJ6BrmTKGGXQmwL+cCjDKtGkH2tLVsBIYFS/iTgRlqwGbwQgctQu1p2PWd4AzpysBzn0jiMTaxrN+umbs9wtsY8iCZZR8I+CFVDwJaJlziQ4x8IDx9Qxt9X3Z5CpSa1NJdaAiovMpwHAyIDJRYpksIjlLwCQOHDxu4rQaLQ4RQd6reh6UQnqqy8vRDa/PSTFT5Rzwvo9p/wtl0SFrgyx1EpAsOaFl8sojOg5w3nDQfYE04+Wgc1cU3atowl4hZ73epBstvZfwe3SCXVIuVouBLIUHkJ1GhboZArBiSzoXIIuCUum0InLST+MyNQWzpuZnj+cbger8uqd159lUFGD2nds4zD1Q9OHla7Z4Izq/adYUx4n8NWyomXup7EwSnjeMblX6DbWFTiw5XDLYKQZYO3BBy4coFOzxgcHqulfAVfJVGrjefVEoHKoBULC8FBwYBOrpZIix3d75fDZfP8U1vHL44zlku9aHhfvN+gVp5V7TFrFr3+Hf+q7MxUm2sukKJ2eahWqyO/vGP/YFyHS5zkWds0MKz4YS2GV6/hq5tdMEclqa3yq7JQ8RNHTkWZV/WQA1yszqS8BUbI2fEEl5zT6/USCbnWIQ9rnEoveUHwOP+ihwsloAqLKXzgFDwwqU8cR+j3/eHccaQrhQxirhy/WPDbxEtCTtysJP/g9Q/yGYiKvPhvUXEVT4QuV8Mhn02j4mIMAhuIPdUxYFADr4gxAMNxLqQbzHTxitQGJOxSg8HAAUE+NLfOflKdPd9ZWztsfd0s+14k7t9vYDAU6ee6+SvG/8IfpG79baK1ey4kw4hvpTN0jeMyenUev7qbJldvMPxbhA0qnbVl6cMRWZM55JiFRSTQ8s08W8qUBNfc0sgwjLgoadA2VggqTxBH5cQQTVcmLGLhzD3XUaqV6/N896oAEw+MXlifenIdx6aef3+WIChU/cXNLW13/7KJUko75dBU1isfDCnFU41SZQ4qSmFOpE3h3MgzGXrpgelw+n4GzsKnBei0Us42X+R11cG2XWw/j/zYG3LnTCkWiqHMObAm+UUgIrZC5/RF4SI2n2QQOcDAsFUAH3yd4p4z0v42LHYYAbOSBoLTgwca42X/HlRsUi01HPhADnLDcRjJvHOe4qN37gkfE9nCqnMjfw1yjJhzJ4Harb69BprtkGTQ0rmymdTnOUqdI3AJsOx7OfC+6IO5Lkw8uDlAzp2QHLgAyj4Q6PBbAYgK/1uJphRlBU6W5Jslwey9YmQjsJujQ7KuEsXGwkhmQ4GV6ETikOfBbsAjT+YzHLGikjNOZ6B4bqmtg+1eVO60KvAmz54OcHUQ6Dgm/0f8CLKvEx85/9+l2lhUXeBosYh8UYzn5zqFUGUkh6Pixio2L+QWMdIoodRRHZdPqUVA3NYWeFczJahPS8vhnpsPN39ftS+58AxAV+6Oh0MWhHgChPbyJM/uyi89NCKkEPlHOW/UG0JP/lmUciWpLXMfjoY09FypX9tfhIUgBKrfjGBn3eFPLxNxEkqcSClSEpEkg1ShShEtbu/Y+oJeQUaxKvDNepa/+K+R3romyRuFS75S6BjsQR7BJVjbdR0YUT6yEfwDgBJGBnsyO3w8fDV52CJlGOViTzwtKp4IXUbD+RD3jftWz09U7KGQSBIqOOq/lRDDlWzYi5SUy4YSxCHEfpCQIUEaTNNf+VxMamGOq2VXDYBpReitrm+AFRSo/il5U1ayZPhVsY2C7v49kavEpJYJ/KrIcCGobZBRdoi4GVUcESqlMsYoYUYFZzpCcOhcGgrFwWYfOMv1ErMVoU071Yjjoa6WXTUBeVFRKlFcjhWAlVVOnIiJyrO8ouZBJgOZg4NMIpGBRGUvUUmwUajsiZ+EJ8h5vKx6YKbhfHUqPTcoVCMElRBi5N9vZfkvRUrb0z7K8WkONuY27NrQFKPM3X4t8A3J5t4DiUJU0denV84oiI4zLZpa/T5cj9dfaOnbU4Dl/4W3FntPTkr6qGsNdt6I0vLVYLWtHGOutCYIaM6cNLMN203jq7gYDLG4VdJ2lcThzDINVsUCw+o/+oNOR9qKg9BbVCfu8y71vvzfwx/7RM4I+OKtbw13jn9wdPSG0fx2m45df31nYEJbXkjggYDNC5wH6H+0XX+9I94L3ewWD9bqOfmObNYBuXGqFe5fjHuuEwGfAffvk3ZfYl1LUv/KD4NWNrI8X3OQne2TrSyWCIBnMBgkWkaikQo1HAFoBHIOR63mqAUa3JBOqc5gsFcY+BwQCAqaW5es9F0Z4s9XmGkoE/jVS//8neWxBF9In7/ON81tmM0dl6BBzJr+KpiRfzq7Vk52S68G7nVH7f82eFZjUbeFKU426q1agGNudUTXTvSh9x4fLTab6Lu6muNwAQ7Picah2pBEW4XjtJoAWZJMhREJVGoKorokt5o0X8uLddtgPF/nEcCUWryMUbfq6PUcyOWKaVSfmFsZ9er+PswFTqJXyBY8Jja0lkq4r2PthEtO+zjc0J1I+TYx3y8GREMHvLln5G7HHz7/1Y4MKbIbK5t2vxwcKB68yxYev3nlI3F4HxA+FnnVPeMKI1jjgqhegUv/8wfLrhqHHYste2oOUFx8IKcjnSyFmcidggOP8IQzfY6nbIApsAH8ieRtqAOPIug9Uz77PRM4dKVSRtJRDj76i38hdd0sO0pgkdpyfu8gGZY+FnHzMPrmCpCrV5LBqgjHqSGXdQPgF71r/oX+Tb/Hi/XMlquXlc10VrUMcEJJlKijQEVGtIvEa9sqYsS5FQ5UngGDV//satlXIxHQdGWe3cq5lt0vH0neMqwC0gOXK5cIj5ishfTPvHNWyFzfnxz0A05/5PcTqPrUHo2iZ9UBICczSy/ngg4kxMfH+EllqDi1VSpwyA8n7nlGWO8m0XGzDoiUOzs143Xb5+bQZzEoB7wdb0j5eS/8PHRfp6Ebdx0mf07+ktc6dLiss2oOPXqeVXzW85RA++1AZFke535OC4z62UKH5aNF7c01JJlVKcYAPI+nrXpw0UeF6y6L9fs3oDr7388cEca/yPjRoBWY2GLIBgkVhWcNQERPrOjkDA6tACLt0zkMUXM5Dn+R44mt0KEoFTgsZSvk9t5m+w6AbWitx7DALeTbAW9571tZL7Xb2YmnoCNsGaAqGBrWo93I1KaCvHMDhvzSouc7I1MNEDAI9ik39sDYiEiglrzX7CLWjlQ/YubX3O/xHwJ03shGLt6L7lpeHPSmCSX86gyQb0sblGxQ8AwcoU54CcRFowuJZz+/l0IuLZKoyPv8PX1iHvjtCHqOc/6hmCBKjC+iETe0pWZkD2XAMdDwWzGSJ3nF0PCwHwRnboJELVPImMIi1YaalTutDEtqrA/nnYeVQJxDxDdTnsepKaxyIwKGtJIIypolollyChrVB3ZVBHFH4rsjSQ+dfVxJ+quS1JaZwMmSOupBKi2aqW01wA9XTmFFDjdE5CjHCIKVMgoa8FDin4YC6uYkWnlEtgGYRK1Sx5RJ4FcHzsvfsuyqqUh3teypMSD21Lr1og1TBqG0lYgbe47lBTTfUBhFzpgOGEVs12kaZ6UzpspHJZkGc7oucNMb1HL7nl1/zHC+rZvMAyUPRynE6mq1WuBDMZ/IGJ9DNsVa+tICZiG0MRMmAI/nN7BN5zs/RwdGJ2oVevIAVCVe8xRI3/CRZVeNxWNcgqZGQsYF/RBurPJTdi15dKjCr3rZsj4+j3yLpEVt6NP9p5H4rYMIv2G0XMSYIeUfweAPvwXrdnJynF/xN1wJbX6Z5D3SPDCFUjgG+hnaRQkZ6DgK1GgryasYNZqVFXkVY5AYWFuK6rcrqGHt/3x3eX88L58ZM8a60FBm+kN14IbUtcJnpuahxoZFUL/1K5zSm+g2VFisgqujznUwKjNaCOQOMK877opYpYfOnAEvZnWc7kfB2AO7FdZFEp+KKQQ8LTtKUCaXSkwyoyvM1MYDs252wvQZsx1jgFkEMFePUo5/VDEVO3wpsWOuSLRoroiZVy80Zdh121nzwok5LcgsZMi7OlVX8g1xXOpq2fUfnh6+ZHwKhTBIKKTCJmR7t8y7NksZEwHKLV67ha/jNOKu6EvdDoTwkC39t9wFWHnT6EaxN6n94aSzXA+q8mdgISquFjGfRJMNjtdthByDRjt+xnT9qrNxO+vd9W2uGnjjt0Z5Si2PVYZWqGUBVaNStHIHJwSyO3h9m/W66Mui6Mttpo5WCQUaDsivO16uWOE+LXz255mCyP8MuNRQk2qllmjHqA8WiFQ0B6nT8YhDHnV71ms9L7dLmDxzVZt3Rh9/+/S+TmMWtNm8/4OtSc6Xa+eE/HZyRcqEUcPJlTz2JhDUPXFqqFBtKLpq+QtMqGpqC1WcUMXoJQqF2Dae17IZEGds3qr3a2fiSeeYHmEqz2vCOaFEyjt5nZFBSoPR6RdHZIXPCw1lQoOSi20zGfIAMSCMqzwO/ZS4Pbba8///WnBzoRhX0zANARFt5TYbO8JnHOjyLTFd+ZCzsS88+mGelV3CdK9RcLFZVreNwDXqGUwlqUT+W0HONTp1TwmLTIMMiB/HFOkdHjMKiMeTLcNhDZJlMIkt9UcdeEzwkdM88quOHgOvcD14WcfGMhBOBMK6Ww4oDbVykGIk7i8SH0+FAIflVN7/QaixPpxEwdjnWhmIZ2ZgCxkx1jVRKOfAZBE8hnAbO1vitjk4XJrzgWb/GmXvmQZccOe7ozNdMzhYhoGLxoiUIq9GwBMXgcSnwnFqN8uOEliY4SRIShIK5cyfukKJhCkoKNAmJiYyTHg4g6xdTF7OLxknf5mYl0PkSk+EkAkfwzDkCm1BQSYjMeiYPEYuFyZZzhR8FrSAmp6r/yeBB/1gonGEAKK2bdq0xZFAgC1svNUXwx8sJuLSL7aRpsNZHchoo02bNsbAiAicYQYgPVvFqDi19cSsLYSMUsSZagn0dI49+Vu1PGTnoqAsXTxUswoUWraWgE5lqE7lRp6UzjVlYtbToKbG4WRgr+R0aASHVRhqI044RvY/33F1/gbVRw/2Fo/+tp3HuG3jfl5/uOsHmxdlOd0W3kxi9N1rfdf43d5+dGEEXDFG5NaGDw/jFQZQVPhNVy0OVwJZkqPdJRuprkjI0Wj0BpAKirWCIr6hSKUqVrEgW42GXyQs1loLVAaDVsPhFEl5+dIixyrVS1UV3/i26mjZ9w/AGj/LnpqB1zg6A+fTZZLd+/q3kCu1IpgwIUKrGDpietG26Ze3DZQcXeGa3DJP76seZD2mtvX8oCZfbuu7K+kTn2/Ptv5VOwHwDvCJ3MCdcPR3qRwYgWnByCdQCbeIhQ9HkYQz25JkDnKs82To/GbyKgQpWwRq2twy4AgBBwlYUCWUQ04Slr9XI2L+MK3y+x+qA5E+KsY6M9G+HYzOOoeRLsSNFAiCuaTBmOVzYeoKmFq4AsasoEek4YkgWKFHBScCN0UjJWhCGMjEXIOxTrgcPKVJLQXOrXAg4wgUKRCYuJMoBLkS7ERiuGq2o0bs8B132rLvn4GaalLJ9ynRA8e5yPp1sj/BF2XOmLzEUL5xjQQWZJeN8dNEF84NBTd4MxdgRiDc1OLMvEqSl5WY1PI0nBnQ/6dTyIgWK5nTQ6f1kB9COTunJ6l6xG1OvPSHN34tOfRPT/2HylsNBq7gJ8kUF81UbIWtWzWZJj2nFGFEHyWOyh0raTS+bwz5Z4Hi+FCyq5nzmAGtguUO/zv4Cw1HYTY31juPbrD+zjRZtsKSgadFQFO7vFYJh5CAXw8X00MrfEieFsa/VGaXRx8XYJ8a3EAO+/BEGf9D1YTnXS1iCkdUHJaoCLRahKsXk1FoqDgUe+wfjV+a5US5PNjpoBbAIa2oETuw1eTMg3CIB6O8VVyhVEm1SGVjWxPo27LvbZr3hlujHa3olz41OsMcuEtkzRZdg5u4nnN15Rdk4OAtkzkwtORBhS97exV9AVb2S4Ccw2uqbzLcc4aPqT0lZHkgBEYnUSgSIWhmRsYMe8jlf9OoY1tZI5Ee85dzzRqBcu4C57aNGjmhvBVlZPypDw+HRIVCIkCxqSx5WXFqqyoa7gXhG/8fHq2Z8RN50mxuDj1D1Fz1UMCUuKHUBWX1ZynwiKEOKXqjUVWbBfdXeP4+HLE0f3cOopE9Ru6cTxd/0S+ss8S4nloFsAf/EGBVU6J1fq0ChY6RS8QlUbryUIkPV1MEjnx8K6HOo6apdZoeSAlP3yiFB88+cR352FVye7WWhzLGFStAj3JVFhhFVIC4hIidit2zSd3zM6nEiJLmDUyOHWlIFEY7ngbsqgj6rCYoc8SHPxwEdCEO8uB9WfQZcJwg1x4e1bkX9PsOej1mmeiyL3TdF7jlhJInr3xOQyUmtcYIHDDkg7w4clf0getbT96E6yHBXKwM/NtrGlDFhuz/5NN0yGEnKAEjVojaEOFzyDOqubvIzk5Z2SUKU/QaVR0XiTXM3u3p8NwEzgeicFFqqqapbo7yhovYWXXIwCmLPIVIyYZ8k1Tm2MVfqLZH8fpmNL0Sd6n6p4sMgW2+gq6PwODiCFGVfzyVTISuIQLnfdFHCoLikLM5sOPAL7LhAIHXgeH8fa4roqN8cuzR5SWKTayQHF6p8UQWz1j29Mwvjdd5Um7PWK+T8Uo91XblLabztHiOJlVmxzdPmuv5kX/riSzNJeHHwwoekTw+aAD4D400HeSIyhngk0qjsawJ+OvPpsabVKLfyGNT7BFGBGyALPvm9/dgTiD4hxUAsat/y5Wjn6gepPhpLsq744FyRSTLLv9yXvJjMBCvRcOBWs3sOogUnVH4PGOFLi3m4meLNdd0+c2/b1efl8Cx68rhHvW6aJoxp3LjVjF8sE6DJXmQ4ooIwK7BAaDQGLOqtArdPHMJcoeqadMaLnA4GBXWzyLituqzSSgYnI6f7neAbkTk1j94+rVbULnp81ibwUxBWRO+fjiWr8B6wycmAmG5voGjEmv6+PyG3CivL3DOVzBijJRbLuJETBdar9INdaDMNiUn0KRW4TLcVBF4tf6irwaQnwn4mge8TCyq1YiUdKk4X91TvRtQj8OCW4RlE0HHwjMJNyh8lGLEKGvVxC3yF4HfFwRG6jD1QNgq7Z265AkLDjHE/jDkzKMTjnMCg+s/oE/000EGGpzpK/bltE2Ga+2PixXBwLJ5AvqFpZPhkEwRZ8IJtcwvKrHi0xg4d87z6lmFHBfhLA0CscCvFCMRUWwzBiXMjio8UcFleFRVjz+KyIRPlp1Qw+dr+PABzHOObcuX5mK8AvOb3kzJb6oaknDZQ+8kmVCOksQmMLGYsXRDd2niEtNMchPHZBXEDZ4htfUCgEbCNQu6fzWeW+D7mamX0xH8IG4O4HqPdEE081v+AkjDrudq3kLfbAU1DELT7KSS2XDmKDMtqZ8WZm66nAGYu7F05eialJG4eVJVmeuwXa7mR+VdZnybp4AsSWZHvnw+v/WVHVvWnYftOxxPpa+aM59aVv3fj5LQsDgkoYHFWDguNeR3Djds1hIHCHQAVjVBM6ISk/qyNRz5j9zxEGSFHAgb/9kPyw2o34iknQPDqZRJX8OJhLCQYKHoaWdVqyR66aBHAG/MFymwhllo4NBZvsYJcaZZl6aplzgtE2eJ4NRLOKKMXQ5bl8UrGN0TuhUrrNkNsv3ogFgy8w3ojBvjedPRE5eVvk3Vhc7ON9InrRnwQ27c7/3leUj/gQlK3gMHYP8NInFMku/fXtIsibYcMHJgomCx2STTxnRJ9eClajhUblJQ8j1wRb5z1meDz5LOZbAQli0kOzlWm4Tb4yDbPxgXOqBRE4v7y4XMQQXWhb2Bv1eEc5NY5VYiaJZXs7kbMKk51HJClXJ5rPAU2hPUjvSjJorJFwUE37BAyJcLiVBrsCqQ7hqP5KYTvRf7mB2VfxmdN4VUHVF/aVXZyBs/mYibtHDK/N2D1vwy58qJd2AGj7e86Xb/Va5XRNebPTRG5Z4JbBIwYDO7fTqtZo6aG4fzFpJn9gA4km/0f0SzLVu4bNheGAZ7AVDkeAVB0cqEObHB4FTlldFkWC76drvYgybZKpW4N8J6DAVo8Ol3p/epRkWUyh6KHDJjG0y8scRy9YI6BxQGs4oI9JDIW7WFa23hSntyQH6wjcLs6Er7Ga6zzY7Kv+wa6BmiUrmRVVByNNhGrKm0MNb5Z781eX6Oi+F6RLSkw2VelnLtlmBiVoldjcJEdxVgNOd0A5FlN1TlBmw2cx4qvqwSVGJSX6LAyewu+vDBxh3CVnWIDPL3BUgmkhYUikvcwrBmRPrOwU/RqhzrPiu7BXOVqqcQuF9jlhnH9OYC53fafqjvj3YdbU6nRVkKHC3wN80uB+QqDvaBEoFDr41Y3Lb3s9rfaA2ksRkxNvhasmHjpOQ1zXWO2VF5l93AAsVr5KX6awVHhF2Pg1OnWcHXAhrWg9xoyXUPuA7pJ9uIrvgtbLbff1WhBpLdoIpLTaPA+KBupa+yG9BxKWepruSogsuiKpW5SgSuvIrfFwNva04Tbn3la2HXon2GfTqpSY9fDWvWnLqbe/eYGu7uXWMw9Opx926v493dM9Izf3HbsEQhq+3SqMF9y7exhKNEYFh8+9chPBDpQKgTEifVkC9CeRM5u1ntWzV8159uaXaDf+i/obbdqEsLFWvvx2xcOwZP5ws5PJwfJCT3yYsjGkcM0Ro4buQ3+ty749MIrveNyWgXmLG+Xd2F7eo+0NNX2U3dB8ZNg/b7zY7Ku2yh4du0DJ95PtaMo7BBo4oKZxHe970bcjh8z2m1XMLlH7eSjv7itRMbNwJs3Lg79cc6rfVivwmvdf7EykrM5eo5DRre9670E/Il/xMGmrjxuAyPx+VyebSZbQisPv+Ibtkji/PshuG5uVnVwz/c947lr0DE1zVq9CfxcgYN3mgf9VA/K8vj0HiYG93BF5UbgSTTPRPcIVMid4egW01uNQNDj84MNA+DLL5BqGKq4sfpuX2O/kq2j0Xlhd1gJeadOCZv7lLX80MvhZUSaaBGLMb7zi/qvuRxIfTCIjAfro7fUb4Qesb37AnoYNJGdkuP0PGEhabNLvMj6pGa3cTuDl1I3u3EmPZXaPi2XDWHI1pvot6EKlvdDXA7zAsaAm0ye5yVwtjt2Ppt75jpeOdybrcf9gQC1kZrUBmSTwhvLBc+OuKJ8nBI3gYa3yYd5EdJMx3Fk5OIJ06YjuLbkGsMaA18S9+6LCquFnk5Gu4+eWwZgUsWHJs23idpVcj25L2JQUTcBM64LCZ5ySUPc2ENOG+qs3P5gEsu9S8fq+0/SaLjGqIrf4KJRVULOXeT+2MBvlKr0oK2w6b3iIMmUoE2YJTVvmG6vDNuabPvXuq7z6uPQ/v3JdP2hTxyqqfVIuliPmhBqWSpXJTnud8FLBn5aW1Z9r17DUAf+TAu5tOmX6TdutXjYb+RJ7NXNjyZ3Y+0kVt1K0kbeTI2YuTWCDwaebLsUWzEydgxuGu8aeRJ0i47JSfvGvT6+1cYHlzwvVOujrt3z1tyrbGBoxcQCRld4L6zS0yduPHz4Eu4NvbdVWEnD355cPXgblffunZ8ZOuTGyeTJw1nK0d5S66W+3aA79iAK+AM3rMn3M2ub6c4zlT3ONI4IzrFjWCPOCPiOJvVIs7UkiPjCfPLrmTbhf/8LocBRnehXAVX9YnQLxC2oJsKB8howTXOlzhvxHFDZOKPeeEgQYaLTHlQ0K2Ffs6Zkb4fb1oVFhJcvzDHh+ZgKod4do+QeVA6KvUTYQGrMoatkJ87+w/wJnrL9WTMKJg5kfaJwEuEvlyM6SYRxMpSbxZklDh6wtLSQdSFadD9TBpucH8xaUvI7mJsuFv2iF5Gdk03de9+5mtwSQW+J5yA9tSTqwh5djIdX8PnE3kLXXEa/DT8/fs5oRAYlpQUljSWeG0e12PrN1gwWOvRpp20kFypAZ0sDzm1yoVvpK+Oh8otfQrAEWiIr7IbONIQ+rUMw43xqLzLiDQdGwQH6ay9p8WLFzhKLW8LyuVncxw9T9a98D9iTqGJROKMwnYFr9gzbzi0HwNE7JxTmkDoQudznj1EHU8kHIsNdn2gQnNcsWHFGmpFzDewOcBsJhyt1bfq3Qy6Ow4Fq6L99sOG7huwcPNtaP3dx3tqd+dGLgW7YpQ1L0pShtRjgRI4Sb7n3NjxTklkhKjyag5N1504tWAU7Fx9ZfjqBOg5OwEUCcRkJkD7K9Ce7CoEV0jD3bJHeBnuLjPe1PPKzgfkxGxY0bRPEnEseD6R5ZhUYhYxalQXx0DSdT1rr+gQ03466pODenBctWVi+gw4Cu9sX739esR7cwuv1B7mNnb7dYzA1NVQj+XJdwQ0qcK2ED+oLxGa1UdcZxAbMoM0sw2smQGzW67GjfGo7HnczEaR67sBBt2Or9B4d7PsKMHLGKWSD1KqCzn71Xju619nwHmg6o34bqy4GdGeKDo5uKfcgr0Lu4UU9Mzvr0yI6PqAEf5ZeW6Vzr2EBc3ufoqTL4kUGWeJ4PSQYpGSkiti+hQbnTNCy/jZySKo4chPkdvNA7CrEGnuFHPGYzTKR+jY+PGFad2nsd5NCdjcl90Jdg0yY6MoPcJVybzINV52FqpH/tNuw+Q+eojh6sr91rz5OsBQL6weli1ZMzp+FZKg/gAwsZXxghnklRwIaYXHH/BhQTfixvkHswES3yy7i/Pttt00ezdgPS7+IN2YNWW7gcoRdrJbulv2yNRVghnMYvmCYwcNWih3rFrJKPWFC5wsyUeqtAEMhnAL3v7UD5YN2xskcabGFAWuM0STRnb2DN8T7pzpnAJk5AAQeZRcqkzI9g/WEF+rUoEDsVQuDlLI3D2MBtILcPUmKlRWBg6qMg5SQNGBAlItKql+oxaVVvYrrx+R8dZBoraIkbMC1wPaCt4eHdh9q/lvImLmCbGeAEQ3x/I+g9U+KdqGmUD+K/i/Kd3geQxAx8ZAn5KbiajyO7Q4vRcFjnjSZl/bG0MCiHomv5UupATt07/tGBS8ZvTwdX09IAxWAbhZ07+d/vkJW5KBDBi+MrQRXYnP+nRwGuSSt9BgSG7JbrAUODL8btu4IWxjY9FkjME/NPAQ4FyZbeNg21Ty4K0fRxrulj0yUpEM1NCb8HVtYOPr7eCgBlOyT6LmCBwqN6XIoS4Rt47n8okt9UveO6wNWtMre4Z3JqI2df1UWA/4gug9xLLSAiwict1CWoXX3c2KHC4JST6x8qXOV6cCPUfMazktQcZzf61FmtGqEtlq229jNjz+bGNxtkgye2OeDhZtnLwUipdvnDyf9czo5PLfU7TgHAyQWCApZOICNvtGEpPqxbh3+c2loT8RmRPQBzUaFmvwm8Mfpt8bGmAP3SOamA6fgKbVHzgejbWj9/fJ84RrtXo5D4fehkgbbaSZAfQZOPTWlbk0t0B+gwcc63V0TUbSzrbk8Rl7tBX9rzyCHqehDtlgemQGAwPJf26CF4SI5pzeDmlU5EDPH6/+uozm9AVrFWfQ1catNv8Eb5PGZ2UNjnjGYp0gLRUs2S17hMTm8NCNWAMioAM1P5Ev54Ew/brdVYPK/FkpQSXVIk/kC587lOCQReSt1TkvIm/ki124V54iJ8pteGei3abSS6LX081ws7vOQkLzh8OItQs74OFgS0Yc5YsbeeByhMBIFFpYV5ikvRm9hx03kLGnsvji/HtQLFyanW3FyZ6frQNYmk0kDebfm2+KiXjBgOib2qS9i4i8aSWFtNoQP1AhnnShQ4SSCpJWzq3gjz9cXMDTxdOTbOBTIo1yT0/QeDZ39HRs7kIaniAvT3AB/h/kjpL72Z87AAcUEhUtHzEhClx7ogt3B3MLIW1mxL0Z1ebDDmM8YOzY/mhMH5F/cBr8Hz3Cq0VsRRsUd4wJ+c0+YFjaWDc+nwbBIsu8K+0oIgMGj8J0PgzEdgiK1xc/hCPMZYDLDDaGuYztySNgjhx5GFtMvhYipETNEQk/PcMV35R+Mk+i4mqRFxwWuX+/ZbFdvkdYYITTokHk+NNliX8e0L6ePXRWrVYffoXy1gngrcEF3TrFwldffVgrbbOzQ25oYo8e+u5g32zivdc4SekwxpBgr79fUXgk+56bTmMQjZmxOP27b28nn8nM/l0eg9SxWi0P5DyywYYsskgkK1fy2AgKuaCPgXvGL+7aL7cV4WumFuiUTBFkPyJf3r1GvImbCtvIZ9+evTMPWu/Ma73Wc6tzcXaO527XjGGnH8ze+YCMfOP09T/vnam/VLuXFT/6E5ddE7OjEhXkxLUH9a4ZmttMC0m8rqgjXb01pDXs3BkYE7Iue4RV6qaQeobJOoObeXQh2oe0BowdH7jf+He7xrSw/XbxdWId391OJD5fVafLazf93+781SmnaFCpeMRP5IiuAefgoMOrQxrsb95cPeOTD/VcruFe/AoL1g0XHW9yYTKn1ogmem4T/RGi3e4nZ6RyiBAwOg5Hb+BxDMCQRl5c0syOGAOH8wCSrZtrtfyBXGiiT7l6X19nnn3oJKGmvMBIfEyFYvWiNZwPcQE84Ox391bEG3tuQGjO6j1EwZn0GywCR3an2c975mWCOxlSLMR5Q3756lPHRI7kfo9KgyM5IGAEjCI9UXPyrFcCZLZ+c9dAh3FwDoMeqOyo/aQbVrPFxCjHOYTOmKHP7K7ZcDaVfMb+2gLGrJKbS39+AJ8bj0vr5LoXEvPyPWm/AxQWgtp3HAz7oxbAd9/D+wfJHfQEnpMuPlNyE8ILhFT1xpD/f1k/KACazod0uvtNT6023S879o7HAX/4jL92XQLpjPvc4e7nfQr8j5tumJg0MCzNAH1jDtxf0GHFwhRwwxUco1Y+GrfSdEkZmOIwxdvohkpAvfT0u28n4D49ZLdmR+SHSVLQEAP8gj/6VqbKKsAL1nDeBhFn0f51S/OFv57atm3bN9AjiOH+rP7O6lrnvtFD7Apb3P0i/uCb6R8FTXxn3/s9x060/Wai/enb/Xudbjpy2zYDGZRJf9x6UjG5tsLQoGFFKk6WZMMFpV6qLrSfMHWEIi7udkGSXQ+B7Z83OnToYD22zXvRArH1wutCgSC8Rd+WXh063LhhW89DWnfj772W3MWPNX5ygU5vAIUakmAz+Xx8DDze5iaNJuxpwOxsHX5iZ6AnGTyoFJ4Td7qNqad9BPVIq/vG0cbcOzeKsu/fd7lSkOVa+9YXJ8QfXCAnHkEbcl77qHtAYv1URR35Vvtb3XeGhx9I/2DP1UZ3fcd13jSB63LHpyRW288nt6dPLRe+5xa7n1cP/SiqTUAA6b0Jq4c/CPTNqVMUmLWH32H+L9axbVIno44TOaU+dOyHua5dq1c7p3Z5vKeH86QAcK3v42NRkunCcNt5qm+pndNawpEUot9sM5hMKedjK7f0TvvtIXe4m1vX67Ot3NwaDxaR5jbYChs5utjd/zd4UAsMyc2JZbglO9IyqfO5lmpBxN53GX25Gq7i1NaL1nDEzR0S//30IBrndbey+h/ZcJ3tVoDSKmXUZw0CXIcn45nNAZOv877s92Mb+PNg43rwv0+NMcYmq8MmZoBHVv1KVRyluCssZDIpvR1RedlnZ7eQNL2LZDuZ2tQOI0d63B02cmSHVC0ZrSQl8ZpK9sxW/JkD4Uh2l56uYCQ6Bp/o0jBG69vzIOwn0M/MA68T2EG8qcLvMbiLWSJsRr2xC1TK0ycwekGwug2ea8OmihZ3fTvWhS4ja0dGDXnpQD1YSTNyZ2Tkk+EsFefHEyvHhqT1WeyGh2Mh9a173dB/mzmhIRg6jCUeoHSHP3tt/6RDeAV4PGhxFPK9andOI+MNHx9vb7bIxQhf4LVhYylwSIOjBU/qncHVdtC9HXuJfkn3tWS33VpsQHbZo+5wtTs0mA3MwyPwkN6/F73qTA9MdJWLmpLa8mbU0t3LmnIx1UmQq074Zq5vlOb9diP3rM3M0LZatnFByhtjbWK7FEdZrb8Up67be/lEjeNDodXnY1xyQ0/hPV34OXncqbqb9hg6KRfZmMJxVGuEwDHo1bzCGVOmTJ+q75f8S8rttF6fx16Ovhf3XT/vnh3fT4+Lu9RL9G1a7C+DTq6Nivr9o0kB76tUigJQaznC/OuOSUSHUh/Ojdn0Yf823c44NmkQ4jh3Z+C6hq5/eNZfu4JIU/wj8iXWJb91P7RRdbpt5ZypuzP0N/upm8WHPr523fg9Qt14h3qPXpvumlH/+mv3rgaGrz0U0b2F4PqNhq8lX/S6Or3J4xWnmjxukfC4xQyyS9uNT0b3XBrTcdJ9ZpItRjcOdk8acJUJ1E3zr3/k8PpPbm/OXxprde7Thg3OLPttdHh83k04+CWEpSikjQaPXvnBkG/H67UcXpT3fbMk150GvMk/ux+5CarG/BTga+GMgcNION3hYa7VQ20B2LklHoWmO1osCpxyv9OE7FafbpkcbbcyddLlRpBrBW7pUYzBGpI7WEHS29dTjyqtXe/1iwsQKsv4n0ZUktp6sQJ3v4FN0ciiU3FLLtE0k7u61uc3IOqN7AP7Q7T+N97r8FX9z28OCFkbsbpFhO2piP11mjk6TvaA9DybDzc/BJS3pT2Wtj5/5Nf0QTbKCk0qgSw7212pVgs4oBdqtWqNyl4za9IGCDsdRZxjJrDLMOurg9YEdjlvCAqNxtWst0ydOmu8VC7XAENsKVMkkBfb3acuN5pUX50ugpjUHW/nrVu6pPsNx9jYTr83v86PetDmUd26KGwIV1cVFLnWqStzddW2c81r4SrLczXJG5E4Ljz6c1zY9Qxo7Hz0qPbU7CV5a9qkWDfK6t9qWkzca+2aLi6sJa9VS96zVi3SFraWLj/etd28dw8rkqZv/bCoYbdrX7Zdlfe7XVH/z6ZZw5D1CmjtUfDgw4ehTLSd7RlBcUJeTKPFbT6YtD9rnO0njn3rCmYMSd199HD8T7sz4v22YEMcPRRb+7HynRiX5MTExsRkpHINnI8vurXb3xwunLSHwZCYB94fP0xjutxws/l44wL7tU6Xl1w9GjPxoVW7hzDYKp0DBkhuzIf/JXPeO2ftKrhk/275kd9KTOqLTm0pwf/AiqK7dxthxCFFAhDUgPjMq2dD5EafDVOiN0T2hdEbYSPAJ+8ADFd0hnpwcM9tNkwC7plzbfrf75OUU7J4SgVIwjQkde31heyEX+t8nM7bvyWxIfpwANLYF6O/eTiInIFiBc4rB5yWKgehOFJmrHf9hrbjv54A/U+yrtD9zPlpGO+/v3JusZQWTpCjwdhM2yeOWMTDreaF6+6tSQHyze440/UWgBuGm1mYWT6fKF8NTH5fQt59VvsFd3bM2THmrQ27YCuQZ/TqvjxXAFwlC1Z80lVMnFpI25gaUZTQdnbWHHjruPT8NZE7npW5nxoAaseC5jadfvbM/nnqMcdOpJ20gezYWOh3hPyH3oIjD+sB2sq106/mDj1GbsIAHkB92N8UflgIsHzXwt1cZ5wDnWu/tguxvGcgoy54wl6TGzZjdrpx7wnUFJMK9+tze01KWXP1zTszMZCm7tHqI5fvP/n11wdeD2xTcr+1qXu2Ccyc2rvOzK0P3u7ddao+Fbr12/06xH74GbnaHbqkB9zkxHU+eTj79s1KFBwi+75jUoaNWis0kG9Kqs7lK7h6BqZugMRpRNWdItoOgPP7hsRp0HyqVi9XEeXG4RdqOSDHL/YOZLMxhUfj2hJMrRWS3mYimtQ33eYU/7gwUSw/DR97Oabxc3ObWrV3+e0Dh12p0erbLVr82qQF8hKfuyZr8cMldWbqx7ug6c/trG7k8vkfdvJZFgNa6Tvg+kvA18SknuohcJz1dv34CEH89O2sLSWWdXqT+BnfjNsyetbtfl+nHla2Pf+NO2Svim7gyvP8rYffazcfPrzEaXT+rub7IVdPRSydaJM+adkRv+HX+3wVfULomah9t9/hK6mHxkTuderTtXhoc466QW2XBmqX2qR5dvMKPXH+d1D1a57KaXi2e5aBw0l3g0YPc0FHNFx+3Ud50P5hckrAHbvB8un2uc2X24hlV+FBi+Li5gBnLmJal9dCe9fwTvMUNKlnusYGaHVPaVJftIYDEBYHOrqpPv5MyCeKJ3x456mccYMiG84lLtnnoAM/HezSEd9bt5NcGo25hyNiWB+9B9VbpvrOjPNdT0YMdACNS4bl+z4JGTu9nDxVcoblKSZI5BcnAr9/y/7+NMEDh/u3TCRDGQXle6AluU/CR9iW4UF3qNftp65L4PfBSlgcaHb6UvDRYzACLnUi+8PIa12nVefs7OBDPMcMEejZMya8gT9MMZJfDxwZOJts14yaALmkwQRYMxsygjPfGf3II7CZ9vAX31ybiAFLnCLa89B20VSY2sC/+Xc7493e+eQuOIkgesVczs7xv3pPmQItiE5+t+XlDj7KkxfWaJqpomQV1pzjmOtC1v/ZuxKAqKoufGZjhmGGbRDBhUVFR03coxFlMTLTNLdMzSxT3DVLTbSSNE3MrdxTVCrNNPctM1RcScENN9xYBESJEYYZYNY3/z33DdsIKJY1/PV5H/fd++57jMN5Z7n33HOI4Wo4Rv5frqc6h2TS6RuCvgcLQ+FU57Kx7nAdWww39BT50h+5ll15FvzNHE5hNnkUblPq64W89uqBRnpv6WL+i2GO4J1O6O31sl2cRGIA7B8CIzqB9y4IS1h52s5Oox92mdOmfeyl3r8dK+aZGlarw7nlypsVg8QOGGJwEs3DDL8NyNw//+ICXvTaDZd/2f+LLzl+iXS4+EP8BdXau2O+nQQCmeSRVKg3CwRCvY+jm5tbqQ4XCPw1v/7Y+vNZZ3/OOpk2euNDTU7wvsm73spt0qyp4+4Xz0VyhbK2Czpl1OcbE7zdCr/67tUbLVow8NUbL55ru/b2C8uH3s/qsbn+6/tv3X6UOU+dckNvtzrt2JkbrY0ZXmlFQ18fplNpRwTEpXimpHiSY87hOgF6e+ng92N/DhZ33/3iL49+LUoY26n14hDXrt9v+8Bp207dlLajZ+ki9obt7MczTJjGN9rt+zz4Tu/1fBj0wt1GWw988NrguyGMgdPA/hKUTbdAEJfbRhXx+y39hH23gNdP80f4GVAxOl3y+KVFyWeIDud1RwWqrJWCq6os/5c2uZo6vXjVNOogjPU8kUyg1yX/USD0/sMrzXSL1eFGLi8Yw61ch6s6xu/fTHANiUbu+ea29b/eavOo79arCx94Hx3z4orm4D1r/YghP+7/8fRpQnNfnQ4k9EZ4BtHyvCF5PnzzLYBn55s3329/rtPvORvOuqvBbIZqCM4tWe6it5MYzGYpCHQA8+ZuixO6qxpdePT78LdGvIIII8e7vqMGf5Pf3oGnFG4+vidIIzYX8iRCocGOSGFZMSW4/eT78QL++HrLW2dK83LBNxR8jznmBP/sNVVjvNB+f4+GD/e82sBzX9xHmy7xd2bn3D5fcDRzQP626wWer03bOXi6KwzYOmFw03U5G34NPK4WLB9/Hvpt73sM5uzMb33ExcvRzv+Hb8eYuKfK3MwzIL0hcBgBJDaZ4r/T/Xh4w7qv3Utonep48LftXvW6tIuFM90cNjfv6zF+Z3GXC90fXASji0/I9yk5I/rVnZ81EoIdz7UZ/DowDOBXVN5K9eau4aj1V/Q6bP3eQvI9sGl4cQr5u/2wXW0ohmaZTsVwv/l7H/e//f1K7+tpt4vhdaozAk7yCr3Jt5FCVEdOI0Jwx/JdB0Hl83DaKo2Gv3nxHmdGUkNzQpUhIjB3WQZ6CVzoNB7OAZ1tx5mO12H/65iSE9EpCGDXfHi73fQ6W+KjZow612VP6tSESPcswxP3iwQqMdYDUdveztd1v7hHB0V0e2pFp3MOzUxr5tBcoJIejwwQ/JmoCE0HjBFEbY/okfgwFKnvdIe4kANnT44eFLpk46wP8hsXDdo7st6cl17grl13dkbjInGPBkm/j4yGkZ/6jIRoGOVxI6rxqPqRMBsiRxZuSTM2SfOBNJ/i7nB5zoGeoV1ag8MPjTvlXb0DFyqupQJ6+wXiwr3Ut3nMwIu7kkSuCc3PwbBdJ0GEcjoCoohA97pHKi8IPaMddUMN0tfm3L647jfnSV5/7Myd1K9/JO5wtJ7bCxRy+va4cvV+UC/YB9yXH8H1dFTvC8tp+Ox5YWVKP64pEHrrfISBXnDgel6dkNxWqy4ICypbva/GW+Rv1uEUxEhsqrQP2REXtcPYZDR8+5Vy6wffjN8FfZHeOp2h6V9LyI0cu2D+yjMgOnPkgWfqqHOc2NToESGgJH8hAd0WURnYeFQ6sUORuK9XQrc9OvLV5wlBCHYoWSuEesgHp3wnQnF25EU35cQQPc+1/y3cH8jhmsSE5MhfHnNpo5w/lHl6FshnYeKzWXMSYJgXtYGXgfj34Qmknr98YeQb6FUBqPMg6mf8DPD1JORYsKw7uGdDvwtgsWsXdUFD9x347MjVKEm3Npd0vHKOjIGn4xV0hZwgIOvBbfhJNK6x39ouu6BL8+9hPYyIoiR3j1RRsJ58Y2uhy0m/rG29BoKz/oVRYbk+e2GRzwXBY36Y5O1tzYVJg9FKJeVYqOd1b0ivSFzseaXkRijTGzrDD/XwZu6k2QDZaQyncm8RCLHuKEVlOvLzRPxp0Kn0kUn9I1KdYs55jJ4sWwBnVs6fD0FBgO4ilMwAq07YBfMJ2+s07MgD8ahzwuGJV6f2ObbSoCIf+kR8FfRG2FIO6IyMVNOxk5f4+Id5RSAUCs0EOJWiUtEfWNiDdlJCJKOgKHPd8eCHnXt4MlIpIyn35VzpPgbojD8iFKjqXyyDnIXK4tHLAHKW20+jl8j5smJY0JDQmQBJkrQbksMZir/D1QdCcC0uQ2gXy4Nms5W1twjgcjDdEhOzd+uUFzxmuf308V50VL1B137XQ1QUFiD0BqD9EuCkCFbctR8xKzhmStj5SfKY/uoL7CMqPPgEGC/TT7QPC8McyYYW7JXCQizsUWmF3G1soTcZfqweg7MqgDTlmdSo7OkVgTdUjr9Zh8tEh5GGutueQWPTRq/J1jRqI/3VULx0zIv1668o7p4O69eTgiDamzfsejds5Teb3ysa8qv0pUYZt2Km7l3yUfEjxmyOr0Z/g9xmPPKnnTE3ODq0M7qgCXWYNA9UOicV1V5AxDeSghW2dDoQqXAhnUhWExgMnYcOvfXJlncLeYxQ5VbiLWJaw2utKWiV2gLXRi/4XP+kW73rPq8e6+r3k/q9q/dOLWEyuygWtOu1r/9NMOQ5b+7nDKeapiyPm384Zl/od679fzKazg2+aimEmwAAfX5JREFULIaO2ZMekfsfQmuP5ply9dw79+a3Ml8yAbfiLprMTD+zmeEVT/h4+E9dJyydxIx8eUJQoGtHP339FGMC/+LFi+1gPflpn6Gd0/irL0/z5w+6Le4la7H8PJPdPXzd5FHhYGBEjy5ZfUvefBhz4Vy3y969mt3q1eymOc3U0su/wFksViFxo6swOSqtoJ7KG/zquN5NMfdsRvgjTou0lF6a+WiMEd2oHkM13iJ/M8FRNARXPXh2DM4QbTd22+Qbv771uTEJLx6B5O7e3t7pQd7pEITUlkzMhZXg+O7X6qbnR3Xbq+y992KP1/R8/emGVTE3FvJiO4YXlnHCwisxzTHQmWJKbiIjUSP4bK8l5TG5QAmOT8N9EISMdYh+2SzVScUZdMu8L9f8La+10UeZW2/njVCPnQJZL5NPj6w7DX85VGfAbpCaD6ea717Ourq3q+626YF71m4h38T8nnMmbBWsEf/q0nWtQ3Hf47fyejTkT3e/7uGxkzzixjloLWtx517rTeYxJjjF/t4ySOz5Zh4wxpwWW3amvNU79sJIbWFOw5neMOYIfnjtlYvoVpVqhMY+p4/DoKi4jF7x3e78zp/0cFGSvtkFAwM8pYv1W+lt4HNGOiWrvW/d4t68xeUwnHRfkPxBGLCzswq82aOyytmZ8Ohm9vbHiFqMN968xVsb03KAXYJ5DFM5wWVUSVb/BMFlZjYwmx81eK+g/6zt98ITPd8fp527PsGxAJKTm8MFYrIS3XRXMswPW0m0osPpIacDO+25kzgyAlLb6K6Lq/aEYxHIs2OkwXmxuHiGe5r5dOM9ITbTqN4i4/mmFrV1aL+hPX78ZudAPsKo07EkZ9kIzWn58d4xamkRc5/1FjF15Db2upwtO5smEHikapr88d2ePcq4lHrZgk76PgGC3gGCBn0CnL16p+t7d3T2elvcuHdHQeO3BeSac4M+HdOVk8SvnYFXyQ0Xl98h93scFQhWGSTn0qU7sjaZRzG89PLTF/h/uJhZz4wU16Xr6q0TBK8c2bwgaOXw5K5b7+m9773/xq8lTn2j+i8j5PbCTwLt8kY/7rommrQ3JlVvGA28P8SmS5kVn4neIlzOr2al3pfH5ZBTM4/DpPv+HnyvRZ06dfz8/oBOeDxe1fmjRZ0/OnsRccrgTVwzdWw4Pm9Z9IJLUGNvkb/ZaCgFw82C+v0jouRrOJ1fFEyacubnN4m1irtpdtHr8wFWnlk5/lFz+BCmeezjJ+ZGQFKWCLxPK6resoUIwmx0oYIzlkA2FTxSRbC2vZnm2UZn8p91g7+4zwrZ8qB3FJ3pHXxEI0VVhA1pkPIq+eH6Dp56tMcCMIAWuA8epGCFKz+VVOAx4L7HWcvoAfR+8vOsxyNI9yQP9tE4Gq32WFlmI3VCkRaSpLe27ISWX2yc9dmc69kDX/tl1I0bhNJ8ZnaB5j4zYfz6QUovmBVvvlrYNXDv3pgkNd6nQ6cUtD/KPZS6mAMk1RGcDod1pAAe8pMnw3XkFFsr8KikakyOOaR1kh1GD3n4sjT6GVlfQWtUYnZY8LdPi1ggd+GmNgXHiB3g1gE6u2gWv/xNO7hApOB4vLqS7mj4ef49jwkriXEKiVMxvIgq3btaWqPAXVtOwQdVziWkhLG66Mqraf0H5qHw846XB8SqzsPq6JE/vwmwqYt30DCnvdqBxGotH81GmD/YFFd+19bLnU9Ck+GzWuP6KO69sWQKKl9Z0gdZV48No+gH0P+TLhuBbqKxnsCgUAhwN4Wg3ZXZO97rfetO12JYNuXasp4A6mGpJ2HLYJwLgW07f3KedPntKfz2gXshJskS1gZ3bVk/Dp0QePx+0GPfEvgxjnbM4WLIoJojBGDIsrSktrCz8rX76qZF/gmRisjNbODK8HQ9w1dnPDqf22nX6NYpV8cPM54b4e8/5hv/ESNWjs45J/7VLGrbfr9EeT33YkiUGXSuT9p3DxhbxMD7ZCXOooHWgY+xRQi9OSEhXbx+u4Xw+luz3hj95oWJHjsH7nzj1aUyu8xNHfT695brjE4qIWbZJgOFPKNWG7y//vYzLyw40SsXAr2A22zLtb0P+o3Jvqi9cEn77U8ajfbbHzRYyClWr9Gj0qpkmNZy00/kfq2W6Pw/Pkjipnx9iW/iVSKWAjMy6zXkKB/KRrfZOrbb2k5+6o/0BR1W5vQWd3Y4+WBQxChhny1NBtaJzij4pMWVzR2z39w7OH4rtAoHI0fpxzwuTwnSfU38t+YnDg2fPLKX2ocg9fM30kJ8SKFgT2mr9LRiq2QYSO+fTes14FEcGMyP/xqwSZFKwDuhcNIbkkbtcEsFDuS5pC/wzCafczo7S320a+xke/th57rwE6OTe4C7UlUFI6gUGGtQS4wBbbETp6x3sOwS6IJEZlj5B/XvJrgztj+8OmxImWS1U4nyqQ0hgjRYJuoud8d3WHOh3UwRpIqgP+yA/qNF/estHz3tPhZyOvrteqOBnMLbpOBp4rryrZJhyy03ifB+fMwOaHWjEZoslW2EZrtkLjq4YGh3JWbwlrSN2sbvzFr20yCOj89M9feXIKHhin0zGmZ84RT+Cpwn2ltkpAHQXAB3tM0rh04IzKpVDT8CH99esK/X97m9eoEU8JQUesq2elVsgbT8sGWQmwZJbX1SoMqt97YnUi1QpPubGfDfPbIDmJOLH5QtDK8ZLqVLC6cSpwIhtywMnVzuviqBC/acALctpVEucY+yCLRntWBa1Ob4qgHbt77qPCAvto1f9MhNhQ5D/dq8oRUJF46iG6ZF2rPs5mmtyNe9nulUQUkS2kCadY97CCYIAJpph0PosOEwC/MxzClXwSxLdc1XXK5VYdjG1DkQegw2wh3cMgiQyAVj1SHiFHnJGAdRAEum+0PUtYyLq81aiJf9NGsmeOS/Ej4lA0Y06T1AC5P6Qf/tF+jUHXmNq1yyR6nqqOuX0gh3I+yDXh4fTp/nD0mf0IngXuwpbc3zr9gCjA9WOizpk1XjDhJl266w8h3c1YrUf5rggCuory4+CIs6dD45fBLMJlbD/BngNyyWLmUNj9F2j4DbUEBjdVvfXBmQ4ByKNmqibtCNzpig3bIrFXZcWOJw22/TUL/i28NzJvf++c1NhV0J2UVv8p/mwBTbF2stG1PxxmB4X/KRocDM1ZQQnLAN3TmigYioz77YfR7aa25CM1Ik5NTSkpynLc3Nl1c0L9d6fNgXm2BoxArcFs0QlltdqDUMlM/uh6aaXL/fBrQaPqdh4HxfgEFwCPKX120Zeb5h372R6tkzgW5HfUKSukAgikNfIDSXNm6VzxUpjINVeFgqGFdZlffJKlJg3DwXUkjnlB1pPrvALKx9BKeIDzJwGaEAZndc9MKYOydf1Lf+GDer84ofiCG4S5OYxFxIIl/j05IbgVxi5HLqvZv0AM5aEuRhnBp25zgUizi48mxZQqX/QGuP08JUl9eSe5DcRAEiZ/+4a0YMgUkoDuNBYzhCuCJthBvuASasgAnEfrOqYIWlGnj8YbmW1TCsKbqn+MAFjQSVfMtntwaGpWYEJbHypeC7c1ff4cNOTYAJk5SypnMAtt09f9QJ50JAjTO0xAKJV3DZyNWVIhBDCgpLw3VdbnKH1o9F5cIVqJIYio+vRZGuIZtwE4eOl1N58N9qNkL/swQHuJgPUm39HH/YPU/23sZL5gdesOiD9+ZHgocsRns1F/pH6bU6bhVfYCWQY+oyafZ32/b4pgKbkREpzkJzSGFWsOh4hOAwrTuNnRQgGmdcA9eMXMx6zOazApbHcZkrrQHIH4Ueh+g+/NKKbqnHyvFXRbmW1TD2jwrUJ+0SMAZCAtX97wJPKyBPxgiR5iiTc1r9+XR4Z1z+a79ciwm//y5qb8Q4BcMtbySS+Eq0wXLAMAK8EsWdYzfsez2+fGb2HaQHvopuDS63hsyITfj/haE/pny6Ke3TH8mHHjKXFPh0E72b8GZQ0hjnj9Oc7cb4RSho5NViGln6vTsNp0VFwKSTkFMXo/tCJK/aSCKPQ07DDWkcgwdsz9XnAErWsqzHlpTHpdFsWFDmJqKhRVhVznXAncNclsElljyXkhyN8QttSiL2VgWM8VsdSmP8InOrWp6WwhLjF2nO/73eSxYXzAsHODekIzeEEHAEzoWg9laTGL9syNUTo29YhVQNX8ML31jgCG65bg2GjgSicHwIS2HBg6ULYPqHHvCAlKULHqijYWQT8t4JdTQfuPUvsGGRWgIFONkVz97h9oIIOjecpv4EmkBMIkytibVQBrmE4Ym5IHlX/vPugJxU7LLocWBvmQsrQfnISVSBgy5crcfA5LjpCwi9cc0oUC0IMlnimKOlB+idWRbF1zqYb4xPSLnWY8PccjGgOXnWE5hbKeQu7JQcuOdJfaOagnbsxtPGIZvz+gL0I9LUJYfSW+WTb5UDo0UTQt8yuOSUkj0bJV8GYzYWNII70SNBWmSSgiUxSBNi5zS5AxLPbA8OZC8lLKxJCmhc9eQ7eozH2TrB0dRuYMJw5r4OooMBMmK9wVTy6uJkSHXR4CoDmxaE8SxsCa/7GJtc2sAmSrWQHE3uXm5qlgXSG/oicoc4G/k/hsP8G+CQjQpcSUYMFFRUAeJRoiubRakUGDb/yaDkhuL6SUQXSMPmI6liGhoiCZKj0mGdsTd3dwxgdiiqvOU9S9h86u1XAgzYRFNborCnuT6xlwuikPaibE/hZdxU7JnsczjBw6xCj3yJpkIGxvKpSWxbpFrQXeVkgtlx08Jndx05NVzWH2Pl+9aYvSGQ5NaOJiS3d8b0EWMYuafDpdFEj9PacdkgV5ZYVxYrlr1HC+8fmpjN/05NleTLQPOCaB5PiGGJGV9lihlaPc9MNABfRs5eNHXMKwCp6tmR1FZ45kw0oyswIjaPMRP9YZFYwzUNw6A5HRMEvi7nldyzHhliwvseBDAgC8x2SiAv3UvwCRfzrkhYkquQDa8aDvcPTvxaQeW/uO3FO8f8e8CIW02J8mYPWb7WY54adiNNvGzo0b+p89Frzd1e8trcTayt13YiXkIKE5VU9sjcll+83+KqHAYdj+VOn8+9BoS7Ac3q/risKFnJQbfD00FY8NTSwhgk9LRiq7Jh+Jwa0Ruh/GQFqW41he2RkerIRilStZqcUk9Nhpv8LC8mQEjZKf5Xda56wtXCNdyWYZDQ8RL/Ug4PPYeJCgE5QsLac7gJ1OdGDCZmZ2xqNxDm3ChgpEWY3VhHpPHjX9fjsBUOhy+opsmDhWtfBEk6+b/ZF7BWvvW4p4AcJzLQw5zHgBhfqJbMDKLzrm3bI61ONg4o/Vrk+MPzD5/Zcydyp4Ml87EDZEss21Mf42+IEiHI1iVCrFwrkM0m+ORhbNdTwXITBmHF5G4AzVLcswAdgy15s8v9jhqgTKTKaSpLzEzetm2CwLwPN7EJK2RfRBfpUnBYZy9xu/a3QJBLtF+M/cPVlCTTrkak2gqHw8zPRQ8UEF2f/NeE9bN4Ipx8eyYkYxJRZPOo8BYQSXCt5bAFsABiY2dEwuUfs/LVqW0gATpeAolz/WEtpy9Djw9mAbnhGqbZLqA59DQSYWLl+auQf5XVJX/kci226ymHPSVwMN0hTf7QXBqH0pAFKE0t2iTqjDV6oBWI8kZeb54GJtyC2EuE2Exl1MbmXaQnbAZGoJeQ7xWdAq3XS7N6HoMi8l0XSnRodiDF2ezSVgU0uSNP/O0r7vCRCi7OmD+TVlICZHNKKiGI+suI2XTHTQnt0ZWMEpBT0kPoTFAMTtlIpGKasLEK5va0SPOx7vnLQAxWnAi2b3yVbqF91ozQFqCVCpTTYzZjXndjx43sYryF3Ojej8dBN4WUsjnC6MJvCQ6ApMhEeRzUEh0OZhI7awQrRNEseyZxWgpkc1QHBhOr1BaQzjRQXQMj9C4b1ttovOagoleLKLURerPTC6mzic0B8/u5wAkFzrcilNiyGlMzxLEEh2B45jCIFVg5f7DkVmZl0cDCJURYOpFZtA6m9prSg5EWshvPq4MNEdyXADt3EjJzwLj6WKwH1AiY8tiFq6Q7YZhCRmamKY+LMB8osLm26VZ7tLK4Gi7R2sAEhWiYykCTWCIZnhHfz7Lu+TMgdICHAhwycdGhA/nIOiUIRGiekhczj5RkhUMsDqspOuIPuUseSBjejITjRQYDzjOW8jdKahWtLCxIdlSymjnsaJ0J5oinLj5/X6LWdRAijwsp90sqwoYIDoFEVkirP0dulMWxbz9aBpKiIgl5LoPqGYLdkESBChvHXGhHaY2Y9lQVSv5zInWYdcefQiz5L2Q2CLSHYh8jsRKkuaHHMHtufch1y5WIjAYH4MoJLcaylmaNQFUtonwQyTiDqm5USFrobfkkJxXrqUWxtu7PxbADz1hPHCQ5wuPoFDYpRXOgvekgzyRS4qcoxzqtwLXu+L8DhinQJINQqNFwCS/jirjlIQLSqQHNI6EwOVmZTEZb3/+PgrwtCnmYT4MGoOPnd2plzG9Wv9WDLaGhoRB6/HhoK6agVdvQ/HxBL2hgCAsLdLEY3k+NOLbSAfM6nLFw/HJe+V9YZssDsIx6Aww76CohZomqDME8sRhjPFWLf8rjtxrcbGXd8ychdyOM66KvnVavl6n0Yr5KL1Xp7UCjl/JV2JKJhXbaixlkmPWdz4hlwdY9NUdYoxRFQ0kD13rMq9++335guiYnb+CAHy7+Zmd/+3ZUf0HCgb23dysv1bf3n7G1jmpAbm57SdOhrs5vf1y3oTwljDp8PAVwEyTIm6nsOFe+EPJxxxGbfhF3HYnOffZAVu/szPy2Q2U7eQ+uTI/+NFS2Yc3wOjNzl+a31Y268IYKdx5xgI834b2BDfu8y2OE+hb2R6qOLWJjIhVRNTt+RrAC8gRdu8Hlm2S5khiiMqLNKZPp5BWqbH9OiD4HZIYVchvgpuv7xztu2Ui7evaEo9zYictjJzbfMA4mdpqYNuE1OKA8jNcmrNhCxgLfIMyk6kLYU2l0uz7+Cj7OIeLxhWIzesqheCzlcL9+17koYfuAIbAp+pIfeqTkiE4MU5waqyF9W6Pf7nDEMo6VqWZd3UuYwoWqMjazEfppQF+754FcdiN2LuQiMrCwwV5yafnr4O1s3VNTyN0KwNGuUBG5WNb/t9tJrn4/CbpmZCVubup8s987Y5d9MfBQn93LRmXUT0x581zPcwVdnWHUgdv+/lniDr2G2tVzzHFzw3AtT8S30x41b/7okbvb5bhehUaOUWM0ikx84HBApNNdDjgZ+M79bfDWzgXNpy+ZNid85pnBm/+IX/nxdGNu/Om9guVSJ8vUiDDfyIdCfocUXbieC1KH3Go2Qtsgh/sPBDJ7MGpCtxzfMth+3/SMW80munymvNgWPpGB8jPCvmTwyy/wC7GolSEfHpe9s2Cq9xro5kJ0uAOy0Pv1LjbIdLF+YKUIYSuJtuPVmZFaXFcW5ROBWqbFwXqns+U9CB3FQYS+tHVTdxVpRcVIb7gjDkdowVc7ajiw8ZiqgS1N/FpQcUW5NgKXtv4MFODAl8HxA5vCW+yGbksIpbETbzRmEhYoXwFOOUJs2xz/6avqNc0EWU9w57rlJoYVPtHSp0tbCq4OHBznv00365Z4rBKb+O3NG693M3ySGz1y07LNyw0fwRLBxOMjo4OXwL5I5zc/WpJBtzxSr1W8qQt31GZ1PNeEXvnVLG3ZoEjVVKlw1hYc/zNGQ1hKWBGjDeiQDqvbKzNi048Wy74vFnupvJxUhMScVE5ORJKRg1akhRfEAEtlczS/zt3J6emZe/t2/fZNvvsKDNXFbKSgnqQSsQnslKNF73XKBzCiyNtEvT1TOPsNS/64VnBk4ohWqd2ieKKE0NNb350iun4++4eY7u4HBRgrA4zh9CbfZoLImPxrOo6Zg0aDfZV/QxvkcBWctGol/tzSliKvQf4Dg6Zon/jLtmwP8rcSjoZtesq2WFaHbE7Jjr343UW4+hr0HHysUm+XirAsbXXAdHjOY4sOs07PmH6Rdcm3SFN3yHEHPHLcx8yBOn8A65iP/K3UTXrZfn4sxEvs8jTE+qodS1slwJBstRt/aqVB4eDQ9vv+PW4+YENTyug6FiUwrCgsp6UVpTyiz5HBEKaEi5PPBhwYGpoAgfZPIDhqTMpBA2Iz13zw1mSvs5MsW9dE9hXIDWPekcP9jznucA8FKO5/oBvdAILtuB7+EH8UbhiL1Fygq6l0CaNS/CdSnwOeXaSiPJXou2j042IIrYmLF16AM98DxL6xp5xvEMGGPSe9gRQWKF1VXipxsbgYxOLib9OH3Wyc8cWr3w0VNap+Ro6KVDcXLQjNJtNEptuXD3pyNwdGi/h8MAoISdHFUgcoLHSAHLoqgXEJccGeQ4uRP+Pchm/PGlyC465fA+5o8tE5wCeG/+WqRaoNEtzZ5zUt8rfh2adFUuQF7q27PmC+3U4axcWQvXtpjxanPKd5/1ae4DqNz9rq6IQBUCnuOQXuNeDKp1gZPnYrus3/ni4M3z9jx+Tih9XPjtA59txMN9ALGYORyx388Y9nHnZ0Cn/tNypRiULGoeEI3XMcHHKQ6twLMTghBy/MOQYCwfEh/Vv+fOb6y78BJ+ldg6SQIzyLE03VhM3//1/aqmVwgfse+0JKWp+FQfgMuBmJepsF907Cw4ioD8r2hRFha77I6nAXv55o6fx6lfIA5Ns/YXYkjq1Q8HLBVFRgvNZ0/4pV3MO3g1z7zkG5aTZjHCv3UsdA1OXcSe98s/kz85eij0dJHGLjRjAL4Nq1Iq5EbVduQqUK2CCH+8uXtv52PPPSVlgjR7u2i8+kx3kaiGgkIjUg42CcIdftyI23Qm5C1mc7HbMWvTxWGn/S+/q36iFOu1LS15zKapmyzDfx1ITGbY//uDOrDoeIVZlYHKdUZLzURulWt1pDtWSOPdevQC80ccComzRxFSc1JeG38ycaCl5uLRza7GacqwM4EHlqORwcRp0O7spr3Lp194UuX0w50W4fnL4+/mOlwE5r5JhUF+W4oa2asPk2aDT85UtbtQixYYRNfShhDQLCs6ZJ265zy/b0eXVlfffgVz6do/nqlS5vW5zO6m3wqk/GDfmhYNign17pEzahEH7MGnJcyd789a2bkPNCldFmrBAvR1JgyJMLLgO/JTRlYAUcnaF2ODvxmLU/wOGpf/h8aVZygclpCVzna+hNWEDdcDSyRMsKYdVLW/9NizwHpPmAj+D2L69Z9z8F5D7ajiFXLNYoQVaHUI4hJnfCilWx+wgp9T9q8momXdoF4G0PwVvuS4aDwX3mqbt31AP2wDtB/RxhaxR738km0w8PG3zM7VDpkypDuTl2dJHW2aGLNKYm81QRskP3aLqRdjosmL6AnE9fQM5oDwV65AMUSXATjcW7y/Kw2jUtUrU/fG3B97MgbeGbry2cZn3hSSD8zVh/y/etyvy6X9+/DRaeh9XpAOtHeE55cBSg+zcLV3gFiodvajtrpON+45eT3U3Dzrw0PHj/vSYpJSsSJ0F+GA5scTNW74BebvYiWQ48jYyQD6NGV9UiwvUc0lRIHi1hGCxAegPcGYK5gimMuLkNJEVmdYnjKq9s3i/EUj8OGyS4/xOR6mPd8TQgIrXeFlmmptRVu8V+6LKa1H0+gFTmc/cYSE//4KQjbxb35d1w8uCENsbZSe5L+vjBmEYLPb+9cy3nKt70a0Jwz0HMvtKnPhWS5SdAoaFmJIpHaRFks67RacQAvoahuAGpjE8OJxXuR4VsCXXJJ6JUItRQH+nSab//ROrfClxpIOyt5hyOSDaZ7sEByODsL8nlgPkZEH3YKnI20OQ2MBurUmAi+i4nLfeQO17P+hD2nTskUle/lavSZWt2PzTddy9V88RQJLbe4kF3f9Aaaa38DmgLapdI/b9ANCwMgjJG9fRgnJmeB8R3Xt9fQj9dLDS3m9LcbDadiKWiYC+QcSX0dvzWnuResE+mFKmRaqpBiHUHBaEgDbjqGS6DGz2KcPOHRINe7XgRwztYfIOR3kAjtKa26mGD0yIYqb6WAkMQKxp6TwsOrBMY2CDwCZ46lSE3s2lxL/9iV0FYsV/sPTq1e5JOwSX3sbYWSyCX705G/kZGn7x3r93htleSP27j6ZHec8fqCSesB1dEJXPs8txcNzdZscQEHDQghEXAmCV2hNb0rPO43mwHAoFaqqe7tuzs9MXNHJLlVu6E1cT4tcGJ3xDrjloERaCCCiMmUEFOFdaXn4gwCMt1S+hJdP8OfpzX2wLMRe7WBXnXbtiNgrMidrPStATHj/cxXoE2TXfDvnU9B8MxCAsrd/XJkBOiDpSDRIfbVBnM1ARiMeFjyNvwRIyDCFfT8Og1C/+UyXFXZ4X3oWrD7z8d7i+EIj6QSfeVam9mv63Wq6VqDDJjPebJCJRCq6GghF4DPrlN2IhAeRLl5UnCw6xHWtCFXusCyz7lQNbXsLvPCkIEvygT+JlPcpu3eIuUQyDV38rFT5IUeeS3Rsrizp+OAxb00DL17lMhi+EdCESP6N7L8r/qPx3ub0IgCDsAmOJ9csCezlA8YWmpUjBq+2MP4ADs29erz4puq+o7t93QFtW4KujteDBe6zJsVf3POMmeIZDeNh1k0HPTMVHaE8jNekIAeRQbz4bYqGKNhsu84+RzWKjrKIWOCQBfOmH15ZdCXVPwXFBAPigHzYelI8Xg+gj/t4/ZDpXBBjnc469dLQBGfwYQChnwB3A6g1OmScDlqABqGowhLDas0AChW+CAMnxdL7hILIJbq+rjlax6N3stxZM+aCjQcvzW7vv0GufGetpBpPA+Qm7BWRrnTBeHJ22kKRUmcoyWTpgbK0Y1MK/OPv+Eps3rT7wPqpLN0CXQOoEq9rzoOAjBewXN3M4VY/CfcgEybDnG7+OonSIVAxvJdIw/REXYq5xeSJ0K4VnA1T1jCCi5zJ4vqyd7ja5v9QLvdO/dfT49eeCDZve7nKQEhsgCqHfz57bHgz9EOzUdaGJK2S8rYPAxN7Xyabahlb3byN0wpbG0SPT+rY7i/aeEZpUTzj+XJ7USaIE6G3N0vsFeCRAwT6QV03hTgCELENWI1P8I7i8CJgAQQOi0Re1Flw5OCf2wHrE4ZcfAUPOQsQg5bqLpCITNsRS3Dy13QnREQUv3Bk6aN6SjBYszIrvbEnokA3Celwi2X5T36x1zLmbin0bAlc3DyWVKV620yNSzbUK3qcIiId0cUxKvEbOTgeWggWkxIjJgrii9uOhzJqHu9xyMS1gWwbF2EVytE6kY/J+88CZ/2D0SAvu3N0PklFjhkrbK1FwiWA0iUNUwUgqGCVGAQ37oMUlBDqE51vcofB2hPPB4UH4kae3r5YHJ2Qit9SQd5Lvb1yBf4BD7VPtS2Xcb5alSwkhB2uqDORjwQYg7oUuZG0trLFiqo6AkRwhIR+yLbkLTIQbMmLidLqhWI1Jt0GiodUtb8YEmJ61Q5gFR83yv9muPntmO/c59lPBeTOLUCP8H6gJuIFMTeqNRaRwyHQRn7OFl3Ag9eIvhcM8DO2VEZMqQ9JZYnOGWCMcTrrZPJoOdVJKSriu5QmWsokZxbQgrzJEgvQUb+P26l9FbBZxFkjsbwDI49mcJhDrTceFLYYc91UUmNlbQf0tbzxWKeIWT1vElJUQtCoTpjiXdnA7ddKDsHwH9owpE6tNPI+EeA9GsGvCNkC/RSDoS1g+DZStgwlLBhBUHoCcpeAorBsN9yNKEXjHmO5O/dI0o2yJS5UT5lH6eN4+d5hASW9WOJTnkcQE0HVQwy9xKpSryN8rgSmPEBcMpDIxMd+5UI1JtkMPVMiggUKp1LFZGLYrStfdDesP1zrjj5sTzozfGLHKbGhFZPwsCmWehOHJLsiKvgXOxMxxzM7aFYxB6Xxl2Qzn4SPN6pBDZe0gTesyZmKTOV4ygEcTXMJhNCFvJlBLpljxLLEKCGUn7ywK1E/IiHGDOqxXZGlXiKL1ZULRrYCgK/yd9gv+Wtv4cFA25HIGYaeF96cziPT22HoyJiWmyoclLUyAmJvXbMz3T1+ZsF9dZ17V+oVncINP65qdB2Ak33olmhYYCjmnCGEnR5NyhJhj6nkg3iJT3TLnFbqNMJmEuzxBnx7uUGZZSs5AVdGlL7lYsYQap5xQAzaBt4kPil29MIR9WxIeAcMLiomWbFtgzR6IpgwuIPkt7CeMFSzAbvIl0vLfpp49AJxDqc6tb2rJBgntusUX+elBycxG+tCRq0aSj6u2fA8xdUxfWXLu2ZuJySIOYM5tfUPTO2f5Z8DCJ2Ghu8MSNyZUgBXIzISUzMzczw67g9/t2xUmk3HcoSCIFW3fsLmXYJWdm4jCodotWJaDvdm6uD5gSv8C2CQsfDqwe/nvAqSvKpqrhxj6S1N929gt/deYvd4c0/C5u0F5e5txd9XPPrXrjzJW7LdsOekfQiN5HfrzXsH6h1KgBt+pii9ggwT0psZANoSFwpHVVxk86RTj8GiT5fO7RuQMbh0HvsIGNl33Zdc1yiIG9v77WIeeUZnG40dOkw1g6fwK5GHQHQ/GUr/5UJB6N6cED5q7DW+ua2jc2GiWsDseHIw8TlxoP9otrxtQRXpywb8i2flBY333Tno/U7ZUvL5r5KKj5hy99o3z4/rUX/OoP/6Q/+yyhJiD9XFe7hgZxce7ljCrJygYX7xOsO2wTRHdTcJ18TONDU5rNLrydkLj2FphmNIYN82BDa4ANMxqbTHNhtfhOeidRB7cU//EmoVM9RSAuSNgMEnh9eEq4O2rB3TpOIlF+sdlM9105bQKZOW7k0cFQqKtHBwY4rw6e49dGwmzWI83wBvwMB7JV6bzVI/qikVFcbC7WiuCRhxju6HFepOqN0DZoNIRYd9gkFJggDOzG74CoNfcLHYiRBo3pknY2+JFyO5vOEMwdOLDp8QM3mneYFxWx44G6qUgVyNRspeu5YgmktQK5i4F5fWUb1iZQiSCf3QLrNx2cHpVKaU84e3oTbGDjY+p8t28HrQuIIe8IqPJxeliL83X+4+nYoJxqvEVskMNVPYdjS4iPB6nWFBEHbouEfgnBMJfKI42EkhxkSzzR+3LGjG3b5p7sOSe0syzODTyKHbXpTLzt0BuLZPKBilZNEoFIpNVi0V0e+ulPbW6HjNRdEoob4bxHRHhgtHZ1xGkG7Ij1ehUaTA6FHedCmneArUc247qDViQCu0lixyJoYifLSS7Z8FoJ/tPhnglyP28vO7GwxY1it5Br6g6fp82dAcvAT6bH+GjTT5OisaPhbo+EDWzZfmbxtKT5Ofmz+odL6pnqez2bufr8ILczmz/YfaBTYLgRjU8+zP/g8x5HCrpd3iqL2Hhrk+TrDv2+/fnl6F2ubeED/cbZw3M2PVBEzB6aU9f+4rE7s5ezNwVELy2I5BXb5aiq1+FscOLX9pe2MLefEOrn+Ect6iDs1yEICLnhrhKY/la7C+yQrW9BO7q1zvP23W2fwgk/p6nC2KtTI5Lcs2qS3/rvAObCc9CIW4279yFO72JCbHbKF6M9YF5ZwPy9LGhCbfbU09Dqym2gebchwE7fr8FmNaSpMYlPcnVLWzbI4VbY3kcqD0UmMU7NTnW1hf67I+D2tFBdzFw44vfIj+hsy2E0QKcRndaPeAHA+S2cyNfolx3hwsYLbuLiHNfdPy7ryPM0iXSZ9Dm2AbdiIih5+intNeeG/hIdHc7Xjo0+u4av5RuNRgGNWoM/2IODB72rOI/Tewep3xH5NosW6eZzV+k414jxwAWch9NWKaVskMPZ/NKWgguyYoCDi4i6ecSRWAu30FwgF5C7dYIznXDQGcLlFlzYukDjd/tu4/mfhszmdOg2mM06zOWobY3H6RipRtz6VqcB/CVgSVWMi6eUz9HcsmwybUt+YxoYDlNooxuJnR76ePGX8LnXwKitlUtbVVs4NgH0Q4Li2R3li8YuSjQD0tu2EnJDUhu/mdhqK2HzSiKbtr71Vrtsv9ZkCGSbeyjTm70Xs0ienBAp0AEm27ENopNDslzCVUs1lyF31RWfO8mv7/+CRuotTXVUjKU0ozEe9MJn++32f1FvYrZn0VqlHVxzyMalVBn9X4WU/wUVYINWapx1h62BwTS58pFfLRJTegMXJ/OX/azGjIfxZ4yZb20FuhFgIGwLhtkrXq+XDh3myXf4C5zwe7cNesNcKMlC4KolRcprN1p/tCbzqGrSsi+5Z0XTSjIeURRTsqMgF6ZNE8HrWW6qSRMXrfoMlNxr14yE3tAhLg9HVD3T8J9IrSHkMhA4FvvvTmqycE8BaQebRAaTXw66viGDY2eiECvHryRyFXUZ8leY/ynAceztOuVYYvQPke5ZBkyYaDvA7Ec0XaqK3xLgWvOOg/cT0Sg+OeN62xchQMRwpy0EUjCIdPDSwlhRwDE58L/j59FII9eMUIS2BfcpHDBtUKTaNlwAHMmLntREm9qWkFAk/HC4xQaIaALtDFdAO2Pp4InLF/Y92vXFc4NXArQTaebNBz9w7XLiBCE5Qp3zZk/5fWRuZKWZWP9JoJsdJhPPBvE1gL3c8+dh03t5rzc6LL99O7kbvFDnj3FQGPnHVYDNo24kh549nhmn/2wcYJbZW8XGIglm0MZwEU90ibFBK9WWvUUUmd5Ss1vj1e571/UE8wa/extCVr439ZHsoHz3hENMRvpZ5shLsz/6ZTsDn/VbeDDxS67DwfEXZm7O+rHZDJjZZoMZjpp42WJBHT/PQgdDhs0Yqrgq6yZTGYRmkHLMal6H4RNXXWuSkn3499Qw0dLU9LRT60M7d27eNmDKrSFLw0Q/HOv/vZLDO3167fjxo98tNpgc1EYOGuR+l9inVeMtYoMi1Zbn4RQCk1QruDiN8znOvBFIPDO+Wn5bMh0W5aT7a2/5S8Z/PqzRjLrRV1N+AU1SOyMp2ndazPjwJzUVrQi/dPuxPbg6kcpmtDgKTApNbB9GpuSJNSB2UqH0owG7uPRA2WmpMMk2XBMYwOiUjaEf1ChNywcZqWYezgYJzqZ1OLkLV9rS/YFrSV5pCRjfXNd318LPIhdofxgLxulQFx4CLMgf5QsLkrbO42tEn5xxazqPf6EdqnLkJr/siYvnj0jiqW1Kh6PAGHF0I3SjO2DZL8hutndSYdAkPiZkMALmzmZ3B7J+SVw7ffnYcIhqdLj/RGqNoLjkLTBOWOTB67zVDleuwO7CD5c+ym0ue6GbZsuOJDDbZX0tu52VddnZfcsZ8/bZ0fFjo/ltDh/iXoBvvR/BEfD7sNOvh5v+XDRWz3s2/7jniVx5bkazYr3eLo9jBqNOrwepXbHRjsPRFwrMhQZyYCXU29lppBkOYDZzCArt+CoX7cVcKBdgpBqRaoPTIiHWHbaEIJwniDLZx9/T+Fm6pq8aNDlvbNx+/36a18C7h/3P3t7ea8H7nXcg4As4MQm6t8swGhdvxaF+kinDbk4Jpvv5RE+IbPRPIFlOrAeaW5bLBUwnq1abTHZqtVpCCh6kmElTzVW742UNMkEhk0ynQsqzuKrnUm2Qw1US0sdmkGkvMjDCzefbNhx1bvI5wuP0G89d6TxGpZp19vexkgNZDn2hWzd3d/drB8fE9L307cJjg+9zj3TbpI00L4MPjvhlw/7GRcy9Hnt7dNXqzfE2xuAAXTnRtTMjwy3pvqNer5cWGISF5ODkCTkchiEHJ4+0Cg3kglSVdJ8My83NyKSOoOXxX9j8vwz4GrtFwlX4iTP7Hviho9hK7A8qP+ja8b6tv4KvAPbT5uiHC522AMzwmzJUr7hB03hHupUfb3vA3TvJmCI7WUNOhELC9B49Igc5A42GXsCJlCdOgjwOGyS4qtmxLSCeEWTNhqmJdSdO6msHfn7Z7c7A/F1wAmd9CX19RcgMWp69BR+T+nVcUg0Kyv9+wevHPT3XNJmUO9r/HNRNBHDPEjACW/L9rRzJcnkyOU6fBlLwwAp7iOytNll7iHVHKWyQ4OKsO2wMOlFk/4ip2lOgnZLeJBug3UqYT8iq5DKyto/xx37Y36kTIcNdYBTB1uzs7CO996091+WUcmpEf7VIBydszkp9HEhVJZSFp6U91VEbVLe0ZYMEV7U/vE0gPh54UUkRO0JO5Rja9vqK6M0frIRduyAoohM82k+oLIhSHzl7RKgNT+evPEPU0u7zR+9rM3H4qZBDEUlRBfiYWgSW2J4eVe9LsUGjweY9fusY+JwxU5fny3LhcpvfeHD63JgZR5Kbg/csWD9iCACWIdBpxHoy1ntXMqE3cF6gvznjm1GNTh25vvdui9f0fJXtGQx/Iarx+LVBDlf122ETQHffJI59JOT2V3KG35ik18NWosYRPQ4tB5ShWFi3OJa/kY4v9BzOozYtTyn7E3suqiBJzbWp3Vt/OaqWUv+tNDwTFE5gVxyqdPOVvXcNvp0wBmAzMUP7AjEeLECdbhclN/hwrMeElaOgZQxGGkmy18MzRhqpPahmpeE/b5Fng4ordT8GBxelQueTbVfcO3Th7U7jceGK0BycCGLpzkJv4zUet5uOOtclRvvJiCRwV+Ka1v83vVWHpxGpNDyJnBYFW8kVJR2WH38lbFykAkrV+HhGpeRBj9zoxFgOtF2l3whn0FhF6wFdfZRKPJvf4G0Yf37+NM6iUec4exJ3/BACPKWKif+/lqYUVYvU6jkc4fxy8jYq4uUyciKTA1dGK9oKVMoCTwcZ8uiQvxAh1h02B9bAVIGwfpJ/1CJYcQeGTIPlF6AToTiYQVkbOeYDsRbGv+835VKTc12Gr0mdOirSPUvzNG947UfVc6nVW6m5crdkt2bFWh99cbHEjsezM5ns7LCQg/dIoir2ydOCGyTTJJl/FWx5aasMmZkSe3MhM813cVGckeOsX2UvGzaFu/BigqPjjJtYrvrfOP7diCGNf413apSx8+DJz5cMzH/EmHFB6//aQkVUs7RVHcHJc6GZ2AF4egnY2dkxZoZ8XWVg+GahHaYikejdZOKM8s4Cfw42Py1iQa5EbJQUSu7fKMoX5g5vcf3IZMECmLJ0hGT5mRH+I1Z+67zgQr2+ivWj2ndbpxu59yvZ2FyRHsy1avrtWVHNtEhlVqo8We5ChKiOporCyNZQBGKNJddSOUg0EnKBut+RlkYGSvecv0C62rIDZkUogCvVOko9IGqH7GF/F81i72zPbPYSqadPc+ztuXCa8BQkTo2AB+oCA2NbLpfPDzV1wJSjYyFN1sqmIyGE13rpjCmwil4dR6txP8BbQ5eG4ykhN8wuRx3xcJGt3JOeBbVhWqQEinga/jJUGXVIBJ1h2dfj/G7TC36Q3b3rhzCKkJu2O06GFNzyfaa8NLUSNZoWIYYCRi5mtJgykwGXpp8BoTSXXHuW3LBh+RkdDXtAeus2owENj9CclvA8zH34L0I8nFZAYugx8N898oVT5kl0PyegWy/c2+sJxDjVwuQ+smOGa97e1WeS/LfAisPhHAd1bM8nMrSZJ3bVfQhQrD0u5BPBKsQOM+711wHY6brXeWcVXgaYMjM7jfA4k0xJ2J3mz7G52iNSgc6QKACEgtmww81X9uPSO0ceuBJqg3nXk3+nc72pubKQKD2ouDzDv0OcIp5epNLkrDT/jd2mHUhK4+b9zkfH9ZJoJuXBMQMHdMIQERJd3f7jdNmEWAvRCbSih3sNUWnWWFuGgguC+rnMQfnIDp1PDp8E+jVdYyePXjvKI+9UYnRyDzrX+y9R3iz4zlClWlSR4Ii5gIkLOYGfEIk5LkhGeZrZEjuHTYVD4QQqjJmOYOOmi19oqkY+F28huafYoFglapMOx0LuQkhOyMBBOCR6b2OXZVMWTzAITw5f7DCZkNuzJqOpzahGh6swLSIHN+CbeY0Dp0CC9EBzMLAylNCaTkRITFc6UKdDtzAVhgEgBEdYoCF86IAD+nixc+tCvdnM0bvBs8/M1ZZpkTLkSi563XWWMP1ixyRf5dybMcu+OCtRcun6sJGx40XFIr35/3/mrSKecloEjVOG9+0egN0OmJBEh+wNLFlJRDReTmmkCdoCmuMLLGxOqBN3IddPONAgYc+uxdU6kYpAsQr1PUC57lBhqlraQQkO3YGNBmdbMR3+FlQjUsuvtMgIvUlFhN5+E5kswVxBr1Kx9AYiWhBIadjCH6qSJDlkuLDo1z3oJqGR4uzdMy8Yhlh31AIogEe+LGVS/1ERk1NvwtTE1NTJERH97bNAx/wbrdOql7bKcTh5cgcGOnjC1hI2JjyyGmCzHU3zxaaVoxhuGNT/zWhsl/A4jhlTfFnwBpxg44SV9tQQtU+HK4ECnGQ55CWeE9kSkgDsiXH6r2NuFNXocOU4XHIHgHhP6W9OLHcTCnWrd/18Z+nCBZdhAyFL4dllMHvBS8OhNfyEXC1lre/A/j9+73zjFRUs/wo39uBDhLAHgvgiKSMJLHtyzWD73iKVAzOmJqXw3N2v7FFdvTpuWaP/fz/LKlG1t0g5gkOXwYWCn02oulHi+WhdEVwcc/u20fnonpHCo/7nhE5XZhi+1s0BZ4DJs+oGtneRnTgy0dv+yJ5zyOEs9+0RBDlZr4LVBCHWHbUFitPgzVVlZXkTXaTgzhshOu/TvH8nvVUjUsusVHmhns/7CXqAVmvkYA4c0/Wv3+JxhCF5r601tc269OtDjvevUwN5b17OqHMprffr+1zS04Sz44eO2nbl1+CijDZCHSZcyjfy4WdeRuKG0HSfOmafOnXqLGld/vc9BWqHt8jjyMwkpQGYmTMSsycMfhDVJhPSM/9l9imLarxFKi5tidmIh6JiAGcdzNmntWszEjYM2zPphl/kUObhDzDs97VuAGOIlrVsVQsUmnHHuoMTMHaX0EzNF+WjugdwA+xm3PZj43ReGFbhV/yfo1RnO+1Rvvs/lKCM4JLlEqbIIDjcjQ3tmi8KAD9Y1yR8wkgR74dNQ7t4i0cmOOXOdtnnIhYV24N36Ci8KyRDCB++3SR8yIuYVhNNC98O8O6wAjMXEtnnji79DU+JqtlxrYAC4vcExIPivar1mP9/hFh3lMLKAXU9rDtc2jg7aF34nVcd7nRXrRv64skOLduMgaCwvM+Fe2A4MUabvAXtQRd3JwCCWv10aQ9rshI0A1fMT/DsiLPuqF2Ij4d3SDXpQli09aV/D6reCF1+WgQkDEf8KrgeTsUZXi2sUUAd+ANLLE3DHha7Z3s2VmwLYsNgqyzsjzrGvDqwfxLOBQN4BYDr1RsFGM/aMvVb43nc2jstUgKar/vfjGqmRcoRXJBJRwiO7/ASQKI7m2ZaRMP1o1qHAdPti4ccKi6J2M+G68c8S5iNxEkl0ooCzp5bCDBj4g1jkaQQhJYJzxoTXK3yFqkUM7+07vmXoRpvkXJrqekOeqGkkGdyuV281mnxFyowigKio0V8PtgbQUAAgmQDCMAsAHKQH6SL2KR8I0SPNZG6kdfkMwAf/HFmdJFEzdEUWxZT91dpsFQBG89E8xSoV8e651+GajLRlLdSkwN1heYi6NHbob2AiEZD9nEiG44H0DQQNCmEPWF65ChNEYFABgcBOQ0+W0cak2bCDLhM+BsXZM+8olP7lW0Mp//vRkKValGFaREluOo5Yo24UDl/EeFnXh88zAF39hI1CSx5SCwVSlO6gu/r3qaDxzpwbfd9BHd+byjgqkWPyhx/az/9/Ie/EFb+cOjtK9WAI7QEhisTsL2uD6X3tJiF1Qpa5ymr6j6ip64PR5vmA/caebupQ5ywzAOzxjpcjW+wOdxobt3zL0M13iLlOZw82d2kA65aCkantMKWoGRg+RxCdI8EWpbPuT6sC/1xN0Nd0kBKWyfAn8bPJt6HuVzMSOKUzUXfJBmxUJ/ZBTPEuqPW4Yd/u9FQzVzqY7u2MHsmAzwGQMy3xOlfAF/BtMUWdlcK14dThDnzuTB9Ps7lEd5mLKLuc6X5byyo8SxHjW+wOfw3LVL1tEjFpS2EEjQSMIG0SMvQNDjQcgYwMJMcC2bMJ827n2652ximw7sQwcWMEQtQkCK1cblimv/GClXrj//hXwhrgsNoIoTHcaEQd0BrJBqx02Uny7xxS4ybQTgQ/uDCArhBakxHYoQiSZFEbYJC3LJVw1iJj6NqdlxbsOffzuGqUYusCS4ZizwRM5KApJCjhsJC6UN04CUiNh7z4bCFpiOh1j+XpiNRcwu5VWzWqrGVWvWySG3BG9Yd/zrEVTnxa01wFMlsdjnCrSQMl1GzwR6YIijChDfk1FIIsdFAD0h0hNo07E3W+E+k/odyqJTgSiSrDHc1MHxGpmRJDsOLWGiNnFrSegHXyEV3X+WflqUW/CdS/2nQ3d3xWFlfeVqEWHeUohItH8GSTgnHqpRzWeEvo7fn7S3yzK7vTw/0Fqn1CMQv6lkdlqtWi6rgcLhlUCnRKIlI5VriJzFs/kUxEMZWhKfI7aSExzFcwgdRgZP/NTRXY6WvZnjmJbenR+1e2sK9GQouSFWkelYWV7UeVSmHk9PsY0RuShgZA1KeVKNhGDqWyy0qqufszEXtDcQMo9HweDxgGEYi0VlussZzpp//8DwgBEZL97U8M4+rCtYcjihvijzoADoJg4tcnEfSog/THhnwUsdLvj465GGtIQ1S2yTpyMfyVikPEqWrSKKRqMXkpg6E1blUfC2qJvYqUOMbnhaBp/GVpdpJPG0FPidu52jdUVugiA9k0p1AlsP9EiJB4K4MEakDnyVQRdVcxprgkuWQRywChicu8sjq63QLujPnj1AzgSX4ctAJdSA2dH/nIUBw8mYNh4tR4rgSyPtTsZOq+7B/EqdZZViugDxSnVbEPyd6q70iNZ7oR/5mJmf2jqsv7ID+keBYINDVnNyqYxrWBEfkIi5tAaPu1DWh+8WrGeKiiCLMIQdmjJZkAQdbaJqauPtAXCR93ysMVAmMhmNmM1SXx3Ojn5pBkZccZGICWaMBZX9QzjNrKP+noDF5HCFiByhPdfwue1FHf0gSumUFwrPwuKpgFeNX7mNn4kuE9qO+vnl364j2fQqEZh6HRy6otCJQkaKj0GKLCnkOj2fmm14JHTp0d8y2G6/bGXmMQKhv5lAWyqbGCZ5rfMOTEJgBiobxbn4MhyNwMBOl04G8FyY3jUODhpnk2lODjC0t5VoVr+Gpuk5JR7XDyl/456Fo6MAR8Op7Lz/lqorIufpxq+1Cl1Xx/YYJ6hWaOQ0yQZFpfUfVeMqM0HKLexLMeMn/6qIzBsLZhISVmdnwISoVlhLgKYYdKWF6Qth3POfsy/09GamUkegk8iB56dgaIsS6408DmVqgTCgUCARawwfLoQU5acqaOCU87ylQMpKtS24q1yo9/eHphllaJUP+SShwGzwjrS/Igd3NDl1V3TL/8NPSvbKvF7n5R+bUlzJoO9TEfKh6LrWCt4gcXPWMdI4y9oylQ2iRoxXiJ+EmQtqicKKxk0pCeZ3/tOkKkKi5dpzSVa4aO3/U+IYnQyE4EQjoFK/Jh21dF73y7uxIlxzAwEaCEzUTrIFAbQ1awemKVckFOBvwNMPQZAk6Yf0L/iFgBjEhhrhbZNTBhla0r6nT1ATt1akJkVy3tJpJ1Wq8RSoQXKCOWAthTb+xNIU6YSm1VQxow+7qoiiN1sVCHCw8f1+CLpglGnmN/SmfB8FhMC0AV/XQqV184Xu3LT+kqg1IcHBabm1VVwNKKTwTFrDU9LRii3cCCe7Jw0wW8rQJKCDd3wShSrdvtrXvbxFbnOBpRzmgjZPBMYOoRmF5qiG48jpcoNLOwfDK7yGEWvgmcgBV3nQjB/LnrV5zol+XUUN37uTJISAcwgVy4PP5ocMwNqEIKY7PN9GbzIMGdZ2qlEi0qmYW7eSxTTRB6RDknW5deadbKrjZqnyrymFPgUCvjEAv33RFQ66AB+1muB4zdrZbO3HvOzsHXZm5eu0EngCYxgIHDqpyXtXrUng90Av8fPl8jb2AFD630IGvccAWn2tplVy4v+plv6cY5uDrawIv/IjV/+7nDUXDTEVDEHp8Pmm1g3gxM64RBMekfR6TFhocMvqT4Wl8l3zlauWrgiZN6vrWe0o97nJjlkdWggpWqoRRv/prnlBHGRbGtCnDSYfCQwFH77Q5FHyctDayAjWK+o2owInGmS65yfTCKY0EJJWuhxEREmiCIFLAREq5ytJJjtGD8bSkVcWwp5JGp9HAUgYy6b7Q7sqA2QMXuQJ8HATLCHc+uA2kUxepAdJ9lS505JMQZBJCgYRbMbt9pTgLQW2s+yrBJQanmnRBFub3DwLVjfoeELXItx60/3B2MF1ejAuGuFkJL3+05JuYxKkRkVwddQt6SlS9tFWOw8mL7cxzH/Z20FuebOITzkUoam8P4+nFgu1TYo/Gt+K3NIzhQIt+i2Hf8kOXG+0fFGzqrKNSVWe5CeA9048vGxmO3hJ0tQKHI8yJy21g5nFNZh6fC2Y7rokU9pS2eHzm3GR+WYsLVsPMjka+gcdtkJEe9GQul6HIu9QMOC6CdlfAecd+d3jf1GB2RHrdvZ23p3zwYkCInsc4CoScM4rMJzCZjIxAs9BocOC0WcN2cM2WUuGUbU3ICooua1U+7MpqWDOWqiLm0xlP8T95fpBf8hbwHJnGhN7uv6RLjYuLmXsUbtXtuqbuUUiLWRp8c4l90/OTbvebIDHyzEQYWN9fGS6ftRZrpShHcG4Shpe6WKvjg9aBFamAX4hop/CuR+SKrAsBipTvJJ9/sf5Sx3ckwtHRW7csyR7U/ccrqU2oVGVFajFfa3ypvq63nhEVW6yGUoJDcdjAi8vn8vk8Hp/fbiynXfRYTntS1tJT2lo7lhfxmaGsxbEeNvEFMoTH5fvW43o38K36L4WCishSUROjI1/Am96oz5RezdzbOU+Pki8/ezblxOW62pE/3IrvZm9meDwf8kU2Sq9StFHJDML4V2RvLp+uOGKYTspLRwwfK458jK2XjlhaJRecXN4q16p82CVyvLnc6c3voifU8zpFP+0/AkVDh5ZmELRYHaXyPu51Z9yGwxPrDvzavOzIkWVrvzZ/ucav3b2ZrRR307bP6r+ckJzZ3PBpSK4akVo+1AMhuI2f3rDYoU50dhc53Mif4VVBpt+mwq5LOheLYOgmrWlCwcK49/e8er7r6/bvvJHPmqo6S6hMCPbwH45puEtQqj8GnSDiQ4jStzXXB9JIgbIKfCxVSuGdvmWtSoYxjSDlMvloRsJOq9a50QZUQF5BU2KbStWZoF0G7ycKFqf64sWkX7ICYN37owO6R7DWAxphVa51UVsBTo8ZkMqQ21MtvS2uW4p1q/S0Yst6GPimQuPXhra7xBh4J6r4zc8ZuNCHIf9ziHEKb9ebfvUkTYaI8IPb5OfdxnfJ93e8I2yMoeaqJQHAEw37anZtlRGcnJiY0tCJIzCwCBs9GqM8aM/C0GjR7I9D/G4fdTjdnnQPjXZ6069Nq7gh/Q8UuvKNE+Y4AASDFoMnIbmJIGCSZlqRuTTmajkrNYhIRQ70TRu3CsYBzINP8LBUMK+k+upjPLW0Sq+XDKM4CCmXCPet/o8kd8mTCQwYIiDB88h5MLZrPaJssWT3Tc+5kbNFod8QAvK5gBMk1dn9QScChbpWt3JgggC8AYaHdil3sfVlS6m+VdJFMCe0y8lh6eSXrji0BFU+YtiWXvtboQCuwBGK/aMWOeT0/Dx4LktvEg0tltxqSHIhB2c0XZwandyD63bMt9pvikU1VmrFpa2i3Z92ao5bFehue4RLd3DrA6GUACkCRgf3oCeEspa0H5kxl9u9ZBM+3S4dYLfo/gyjRE39ABDllrZMQqGudSMYNw/27fNJu0L4FTksFVwprfbhqaVVer1kGGF9RKUCLuG/QsIyq/lLuXBlhLstmav+6PS48w1d6r82uzS/SapvH7Dfkdfr/NqwWF/yWAPOgAdVPSVnCjIx0IEDE0MhpSGsahh7lbwxqzDrGKmujiMFW7CKtmhVrlU2jL0JVsXGXh3cqGHKKPb1EVrU338EDGFvoW6LeDnuhN4GbsMuCSZuwnxElPSg8fxPIa6HcIvM4evJoSGRHfRJ3hUfUTOU6XC5uT4chhu25czomHA+Xwv8ABDxwSgArz9g1Badmm94xP981y5ZWrDb+Y7bWj38pmN2l4/U3dSfg8CoNUI03iQK/NFUV71tvPQRcKQX2eeWrlQFevG4TJuJ28eGcY422zEkc/2QzGbrS6tm60uqxKxyrcqG7RinbvNowbdjwOB1qhJ9GxeMGhBLnwgLEeM64mXNXq3p7PGLS/zfjYXdbRrMGiwaZPqJSOQsY7sD9bhr3tqyevUEgUCk53tyqU782GoT+eAm3UsTZmwceizrt3R9Vj4pAnpgpQM9KVn5joVZukJs0evlWo6F2LKMpgcp5DGJGxrub7qlxw9rhvF5Df5uHQ4XqhQviESCQv9X93Xw7bzmf+1dDUDM9/9/3/fuuqu7pCLyWB4SISIpiswwD83TPI4x8jA085zfaBjVxKyGPI0Zm9lii9HfEBJLIRFJyGNEUnddV1d3//f7872ru4qZbbbh1ff6fJ/v7nPv7/vp836/P+vnT3NpnJBhW2wGMCVi3YKIdbAgkWYnhUO6Zd0adR/1aI1Lku02x4hJ1vImNRvWuw0HLzeteFcDnjK0VbF6kn3eTw9WQjaQKufByibxbMEOyqo+8MimPXg9eUQKibUdxbMdI5YHZUVCek5V1ZM6gQTacBpz82xL80JQWOJCq7hAocKO3ZBWTbcUdmyLnUYX6a+4HbjUWntOVyTkZ5c3BjlTmd+cSVO74PVfXoQ1/uEoRSHNacJ6mAD4mpXWvz+kbFz2M5xZE9V7TBCQJsdUOZ/KimEnQNvZLfnklCaXyH0c00u/QC5Yx6Di4Z6IbDyx7a9Nc/WruBg1tDMBT0volZvgYV12vYe10h16rorpAWc0wspv+jeD9RBUK2oJITHSo3n2vGeC2NoZNzgD3w8FehHZ2Gcpr+4c4nR0ZreiE5A0C+almOdjT51cDnbvVbhpGZ5SPclkpKG9Fiy1os7ToZsHZF+Skg4HZSQHdozGeFpgBKgnN1ZnJIFKjEiX73G2CuZSTcrmlw8c+IgEA+DCTRADFWHSiIkG6Oqv3scG/5UtRlsM2JoXmvfXsAvZtY5O/WCNwy8FpvS2rloBvZmzNY1kgdjtXfX9fIF1uxJdSvgid+c0ZzzYEuBCSwiYsD4dAA2G/c2PHj7Uddbo67OCQEMDD55VTjGJz0ob0Iqad17H5VqDfgH3IgnYQ1bLHNsL9tHOk7fUT8/xxFXIYjtpTka21TKHtrJoClUq0G64HuoP8ty8V5RrnUTvW/Ed/z5k/gAwGSnL0wrMCltDDeg0qJ2OxGkgSdAloXpyQ3wfyiYFIlUuGD7uusjp88OCnEH+toNCikERD7ulb5nc2AhP0eFMZ6KxLaTCIi7p4SU3bb7iq4kYyA14imPgSY5RHPC1bWA2LOnVJavJg2AOUvNRg1OVhZsbczjBhqWWaOVpxD/1Ef/EX7kHXxwFNWlxqdzQMQYSzPhZ+sNP/UHTO+er8MxbDrt1JaXGP9VGx53rKMCSXL3I3hb1tu/eo11Cvxr7whb1By0yOTKH8mrxNXgubExL2wKdY1Y2PtPCfrpXEBCXS3fMsV6btO1dEyMLORzHtYFxQ1ftwYckBnkVILOaSkm5LS+zM9zVRzs+kt2oIb/gP611P2VsP2ViwxuFzjeGfyXqEQsN7RLZyEizHCI5vDgGekGuOyS3bWw/dGqGFhJeKIdbPhsXJDf1sigIiZo6KUkHRG9fZSnlcyH0DJ7hRaedwP8ngDE5JDlU5OCooH2PIrQg5sGgkHypYlZ+5JN03qdYqcbRItaQwyk4uSzV6cs1IA/4TDp7Oe5dDDxdEZDGsrMZb2PrhMVgvny5ubrOmh5Oskikt9RUGdJbxaA4BgkyuNbI1pDeaGhzNey5t2fPPeBw4eAuLdxdoMVoi8OFQ7vDnc5cTRfT9Uiqjg4fVLw/jM9gDVK2k1hsCb3PlfRo18Wt3rgox/5a7YQCqRTu86/7AAUtxzv1/wmOyyXWbtKsXrcdHR0tASiGJCW3z2dNKtxZaTR0kGBNwnQqrYovk8/gKPSJQRV469GH16xXJxZHxRZfXw3S4LqZR7WFA6Ouum/tA1uPAjS8bCtu6e7OLmS2KcBWmBpC7Ys3GqzUtuKokBphdSBJF9QFhkAgTQUJQ8+Al5fXlCkwZQqjOoC5c+fSgSGfpn8KuiTw7dw5pkZIVGFd/VD6E/DkaBHjsdTbNaBYIypWieZ+MPmjpE3XhZlc3/PWv+CR4EP4Ok9crcBOlo1LAdixJfjgERhQu6CRR/U3I98IgviLE5VFimKuoLg8n+a+QX901AqDO6Q/dugjhsZOe9Kg1W4kKoGlUOD0E7d806yTUktOIKeQYU6gs+R0/JZAh0uWELIEunbQFk2YK32cxDC6RNouYWMgmg2mjOF0vSny5EY6MdgVQ2rhia6rrjfdHL0LYIwT94WdWUlOUa37BUhrBbVyiizBbpNfWr3d4wbdKbE325+z+cbN6eYlNdRCXf/v7rUPNB7qunWrnmzSep3buKi3Tzye12pbbqttvr3rWxYJ3e82dDqQoLt4O3ZCUqt7CUdvt1Dl7e75QOXWLe1Kvtb7cN1F4sL2d0aG79ThsWPxE6JqFCohsR7dInTb1Q1v1AuuP2fGt98ki0rjX5zNMNGmblb6ZEuLGQEhYXe5e/MBfJt0S/WD4mKzuaHrJsImmLI6ccrqDh06JMKmcU7rWo4GMCsOP7T68Jax8EazUeaCOj8uHDS6MFvWohpfOqsynlI234QVpeEfx5UqsnJKUsF15t71TSOG9Rrl3tVi0UCAz8HOjhayHeyoDYaB5pr33UfJD4etiXxwVxsKqan5KrkcuRK7kx6GiWV8yN8LegmMzWoSpiQ1fz1xeNDlW2FJHOfriy/Txpc1LH9nzx52BWEEHP6WmGVl5Fo7lyL3rLco0zzrXHi3muNZbJofjAcpzRR2f9YhGHTo0H3STgtaap3AsTUcyZ8Y6t998vzOjRyRcxG7GWN6TzAEw2y9ziJnUAWbKmE7jo5VKIhZubpBI8a0OMhNaAnyycP9oOGkryIAAq6j/eVKx7zxdEdHcUs//hbIHm3wgJ7fvUC42Z1NbLnIrDAqBGRWHkdwT9DHH6cV3p4lnzt07hkvLyD2xs7E/25SPbtoCp+SuxWZnMO+nJZhIYtqLoiKiyi76bPDNOL3oacsr1iiA0uBYvwC/6nND6hOnUq88ctp6YmBfrWbmMJVjCr0sY0fJXb/qoiD+PiLU+bkiM3MCjSgLIamyWX3NAxt3agnOVA9TZ6t+slPuOcKlKBdzmVZgeC6zaJUqVpied15+j0YmNQAF7gz/d4dfgvuNADHgdLMmb/psqrp0lMbia9cabznUH61Ix6Z774/2aKWMWtYXqSObtBSiL+letSa1htGrZox1XktwK+/IpM0EyUN2nDTbE1J0SNRhtcJKCiqWZKQMGaYNBmSS1YO/+DNE3ciL3h2mqoVpv2asdXmxJxyR0WnBlDkIdC5fbzl6N7Rwnm+22IG2CuLVOAe5u17WXgfXO/fj7SYnGJV20GiyFmuEt5waV/YNDlpeKpbojh06NrBt85Bndr34c59+cRtefcclk7AW0DM4NZm3zc3uylepYscK6z34jhc+zbNJ/kOLm4NOQduZ/sE+UKXA/WPnBa3m9ZYl/oFsrcOAIHdYTp9oA6JH3Y+O24iauFm9+BQRgQgj7N/f+XPo7P2vfP2ryN9fOo/YaDrKUNbFZStk6Sic5xCoZNn5ednpqamIntpcqD7B18viIxcY2W1Bl/fsyZyzYIHeQ8nOAGEcqi4pWbm52fhdZSKj9ytSm1SB5lMI/yRXBDgju9TD2AGwOa2ANMkX0/DByaiECKmHZJCBEyLkEojpuEBkMaeBcClHsd7kfv/gkyyG0v6r4DZCGc0P+u+uztwfPj7D6P9ZtFu+8nToyi8d8Eq38k/XzmLmtPWQUBe6gI0SpzpjJHtkk6Bx2frl6egktzup9kps2ebavHMDQpxALEd3XvhGhqi+Fm8YSHlsIGr68CWE21Onm+kzoSDAAv3Vfvpbi6IB99FpuaNKp4rPxnPxR34j8yMBA/I/ZA3hkS6X1rsnzDuUfOvv6bFqGledfNXnPb48Y2hzbV3gnJ3dkZdCZz+NwT/D6ofOvShmlTrFfUC4d4KWL1i5BQaGHCCQvy28Vd34reJ69wY/ue94sasMEpWtuKq/J3hadEilerD0QBBJzYPOViy7Gewz2PjES4QrB9n45EaHZgKNKJplQVEuBaKasqqZh83WKk+IGvO1XeIXYaG6RASrKQccr5fmsM4ON7CBh7Z5P+wwR86usyv43ItZ/z3Zs2Se972+A4mu/l3dIFY31hK7UFuOfynncC1/7briPBW+3ZVGt3yRKocuvN/KzNGjrTKjOJHTi9EBXWNSsj6EuwEk9fASNAM2BvdOnzk9vZq2yvb9s1j1wlaZ445B3NsLzSv+mHxEesi4oTOVgng0WehHfk6HMNid9CYqH5mJ/LyEHYN1F+hEZ9zjTH/8odzhqmfztFgYSLUyJTYO/bxjY3aNargbOc4+LJHctELtFGB9ZH8++aaGZ9CIP2mTd9fND2kaRbY9+rbc3T7gU1yBdX9I/5v0MCRPaUp50aJetX32rOz/sfvj7z8jRvzkNBFZoLDT4vIfIpbxHRoi5DmTNFhOTSXOJGbJSgoSdAe+0vUW396iQjpTDa8tyyPDqGarwCq1aVEcgNhpdnHk+3AY3MLWHgVmsF1ayS3fnvCR0lhDxqiK1fGmgO0hUfQ9t6jtgfAv8HhZqmNxz26ZmtjBi00x0LwG977DX5rp56xEmat1MIe99qjtf323E2EI5DZ6ppAaDTo3QnifTQcpLZMLZ2NOtNP9aHrIhizBVUPsW0vlzZda+nws1gqzKZfHN7mrf91tRcpYZKix1doUmwJqQ9hnp/XkXzmMFK4rdIjqMdIgKhWcbG+2Bm7FJnmybuz34M4b1dGY7sGivXtQPYfT98z0HWXBXys526M3ly/xW97u3AgaXsLXdl5eBnXJuFFhv56ikst1dp1q1SlX11hY6dZS0GiPl/vhNuGrTX27dxwL2pKaIr83kwYebuJ2xk44yTdoJSenzji4+38UBdesTRd0vRczdbXeUIQlTVU0Z41k0zGCExQmeD42klpzpIiJQkSBSv0YEFcDIjbqcACF+RqKqpqo6+fRIJZaQtKVmi1ouc0KbHrPnhwxP0MuMty47HL9/TbD3dt7tXmYCU74dAbNo/ghxa4NvlwzNlNkI+/Cyr4346+9mEbADwGn09Gkbrydm3gqqvp+g2weCF/c2H5++BPdswT4rOHXl5mWcuFRKX/1rZ+W+i24QDNQq4NH/0NftjNhW9AdEO4ut5lsDQaGSaA7fbr+CFg/4xhobsiz3/DNSi/Zzm6layFOBsgekPYFcLy2Z/Wb9bT4kpfLX4lxtYGGi0MjR/Dm3fEsMtSMbf+Hfx1m315i5yBBGLvhLc9l3SCiaxkhiVbGPhVtlW2arr1/KftxlWUk9NXBS9tShEhBAUMgLYnPIJ+7RC6ekUUitfTKFpXvDd5L0CD4NB4r1JbqNF6Lv787IKmM/1Prk+LCqnzZCb3RJdwFSK1HM6ku5gVazkt+8Cg0jISJ2DL8p6BvLacWfFT6hBWJVI5TkzzQhRAwxatFkMjX16kPohedwqOX4ZmuHUoEwZc7Az2n+LWbshcEuuLD5isoGELm0PId7n2oe17xfRyBTteIBpB0yloetRM0Y5lqKplA+oas3Zf7R8LF74b1blNnGAyklzCN1ML6me1uf9ZdA/hyUtt4IM3AFU99XzpwnQPiJ4RPlRWSar6gMhNOw5FquBS3MRhC13h1w/XZn5KUSt993aAUx3AfLmRuSkqGfLW2NV163TQbw70qTf8KEBfYM7n7MiT50iTXXiVROrx647xsQkXa5Rf/SJg57Zobs3xM4ObXiE1Sd5rb8qH0CZ8V48USP740/zULR/VcUq/EOw6eAx4JHhNWA+lj+/XEuzMDGW/fuSYavd6J82aN2i+5jkmV6+CwxmDMTlgfE5lQSuG0JUyIHMze2S8oyIM0SLHjGKztSwkbHIYPDx2DODudoo/cMkyo0MtGu87RMwOZZArxJJihGe2+wl+QvLkVdF+e/Bf/Sm1o4rbyHMrDud5Qmv/sKiaMcPW+g7Z/x1AGLy1dVCp9/oRJ4cudYHRpPdL/DeMfwSXxqkFP9eHwSc+WYOXbbVMnPJjemF4QOaGbppx7E4rZrIFZuLqaOyJ9huIacZ5L9YzJ8vwACQ3gFO4bkeP7SnogAtrVoxEE3Ynv9V3vc1Uu738NYy/4Y/0Sx9kcQM3jGgLOoeIGrebVlJF/044W3OWpa3GdZ2xYs3nTZla7jp07ZXzkeEDzb1GOT1KbuQCV+q8fXdHnUDZkgXgdWJLTtMH9ZoNkPXkOceSsdVuf3YcV4KEzPj7g6iQCK2H80N8NSuUm5mBRgdySSkHApkSdSAR/ubFuIg0oNOZaSxLOa28uEQsobAClv1MV5qiLFqksfbAY1fHs6p06JfBtZAnwQkZkdiVaiVbo25M+Th1yhibfs6NIudFVSv0r7m/ELofKQ2MQuNCVUiVc5CuzTRQ/cFV3WXodzT/UazibrPx72uN/AkU5eHJCT7UXJgzbOWuSXdXTEr7XOTlNSmam38oYLCdtfvXi1qEXl3X802ba+9utBrY/cHaa9syv6u25tKs+2kpb71/1aZjvTM5v0Ra16jmRnjILw/Z6nS/GYNKbnJHhQ6LHXs4XoIGtZMg+1rjbxTtfPcMPepcfFF8dPzKw02t7iRWv6TwqZkVlHkk2mf9sugpl+o2T2rEfZPcME7s1D3T+Yr3/epXGt/fkQnbXKHj983NsoS9tq8YS7k0Zd/jb4ZnckOUVJNBmbVkrHp8cjEyi4ja6a0PbUbmccI9wPxifPwiB+gxSJfsVbTzW9khaPOdu2Pd5Pd+uDJaCU2Lp4bN79FBdPOu10q7XJnm1h9Jj2aogsNRaRCyU6meDVPgGCO1UBI3U0EdGnbSqsiMyLJg7E7I1yWk7GcasH5yvXzDmCxjUTYNgY8scoUhIya32WYLuw5C8j58l8E/3ojbCbZ9vwbfaXh8WfLab6klWxs5oVbLX0/gPQtl6IRGAzZyh28TZopOJ4wZ2hi3BgDMF309d6taemVeCHwAg6KEHftEhaypOR4ZmUtzuQIOTYiT1m8Yv6Cx58XQqwGWitKuGi3HkkgN90Wi9+G0jPFR6OViZngW1oEf/KI1t6BguOU9yDk24r0f5tXpvfG3q4339oZb8Wpz7XT4DCYkrzQnLy80Luw3wi8bfjzwPm198onh5hTm+uKRPygKtY27bVfc87hin/X9UEOgL+ztW3bOnLI1vXDCXzxLWHBv5YRT3kkb+/dWQN4fSo7mUaUOR+TGfk6hFrhSq2hSmxI//AKFYzK0gWQaV6TxA9zmDp5Ts5+dK+UtB6iky5VFi/iU63D99oh84fgNGnMrYMsTkUMJ8uwcRm6dD0Ef0gHJLTKjXyW3iHMahUy7na8Z/PXmeLfxAS6zvRXf7YfdccxtDqTwxYx6D8JCYI1uCmxSLwNpmJ3lW4vHFbgGwmDNSI+QeYNWZac7CrNNk1U7SQB1uJUdmVsEwmYpwHVtMZjlzth828YCJpc++tGv9ipB8OLxHzt0/LGeX7jDwnspv42Hj3/1L5wWYa4K2Dh8k0XHHQ6FwYszRfVUdfAW4O26Sz0CZOQWuf3whYpUqpEkrkZhvo5vx0lP5ktBPnfo9kAYgNoNDdeXk9xeUhm8aIxod/DqD0NxT/GqS6glCJI2jou1u6OBii6wZ0AlDof8zbmIueForoZqc08g0xB7pU0+7OfHUqINGdBWeV3O2jqrLDuD2OYbC1AJKMgXGZ5cUoHFGQrp+ND4UAob2EEm9wuae8jjeK2MCAotAiK/ig07zP9DemsRa8LVdht4pgH8G58HdXhz9cEbX4pTN2ftn6AYTZ9sE6+ZQa9ZJ7BTb34DX1F5gf0DZqkXJ9YvUIeCe7vJ+SHzKCjBSXPMk8a4jFAkoecpzh9X+/iCYhjqcW/+yh8av3Htt7+CrVbwfjLpaPv5vfgxwx85vOkA4SzwAVliDf38UcghdwyjgS7w17tHHxbx7YsCPkvSYvNB80LCjo/dPHPFG/shlNxruxnFeZ0gMutLrG4v7KURfEZvcMINwh4smfkRsrfjyN9SzO9IKwxkPxsqcDjeAUe/s5Jb8luRO3cwkS8tog8xp9AcDxZNCCwKHbvQqtjL6T5IGq6plafiqGAXsTkjBlEeniQRDCh1iPXUi0Ticdi8Ewb59oy6eAIzbUL8YeFnsqxqwMjNJlar7Uf88Z59XbD8wlp7zizf6Et3iten2IstHcf47ftmDSy+Hqje4a2whDj8/ERxvFEbMo9iNDbhh/fGA+MKNpuD+vPGc/MWRG9JacUSHCigzlikFmGvj4trsjdqIb9LNW5tl3emvnP1zG2bYTssVMuD3pFvLhz9Q8gw4nBjw2w3DB61N9MBOv4GY1dav7PcYfjlidxA22Kf37pYRdf6H93EFXaN+qaxV5z4815a6szn+fGeF57AWarrZiOPa9k9Dt47tx3OgBcqY0RxrMpHX0ZuDEhyPkhvI7/n3jk4feL6CbVzf6bkBruH+WA04fqzo8JcW2nOVBzOUtFHWFTr51yqLcISt/TkRvCggRkWW8MqPqiB0ruQHWo+SIe88yq5qjoyh7LoSzAWqSB2nbrnOhOpFAZHQ/KuF/kMphsN2UJMz7ThV1GWPkJqo5GGPXQt1965dni09VldJVlEIw1i/Gsdkqb89U5QCzgZbb6QuE6c1OuEnskRu9vkdRjJDfeqx2y2f7ywQbVR/U4HRAcpWBim9mQFPVQvUr2crPRMSnodHNUaOAJv7jKnaFTRXYpMzqYYQVRyaV2Eiu3A/RQ6WIhr7+0yLxy4C7/3RY/rqAsxoEg95zV06pc9kn8vHeivB0vWeqhFkms/ZrN3OBSng9eUQCI5PkvkhBdSHtEaMPYGI70gvba5esKpsZEXZvnfAS6fe4ZcmqpgYqU6I9+Xa3XCNpn252P7q/nMVOJvtOLhDx4b/WEj+ONCW+RwEpVAUZFEoBOotW+9m6HYGjFaJyzSCYpr6LOgodxK9QFZaWSS1WNVhpBLvyLkKA/G9zQ8uJFXHd45Uf0G4DJrf3V/XIy2TlTHY3Cj+s0HN7vcENCFdG234z3h+9uJk6C0onEnlz6yEIJWOKfl/a4DBy/RNq0v67B6fNMMuFly3Sf67Fk32ISvs2dZFtykzVMG1A2uKZ1zstbBZkhvW8ax9C0t3K5gazcoFa3TuQ2raav5+dKpa5dunzt/+/aJa+npQu15c5DJIOCkLOCMDDmyTBZ4UhuYIA5M0GrF4gwIuAABZ8SBFzLwIcgQi1NPF5y/lI3XX0KYj0qKOzhuw/RVVXyNvxvysw1kuTJxxMGFaRcEN4bUyvhl5LhJgYcgrRewWNFxm2DTJmByBd4DWD1u3NU7jN62JM+at2myWEVFtf6ogcpgzOFQcaFptj5rvmOnilW8NOJvvCwtt6jKxSpJVWJyrCBmd650HxoQTKzqmUTFiF/DHf4cfKGKiF+9oYpPr1hj4whjMgPG3vlZDYHc0vnEzYD/KtiZem1qCny5KhDUWYExc850ioYtKfgA4vdFE9UkRbUTCFVyt+SIoZHWEQBfw3u4UANfmzZlB0ybJ5427bgh4hderEiFspyGwtYQElUyKK7DOr9lP7xDTA6ten3cPvI6Xn1bDVOs5nkm3+/i3WTqxjR9TsPz8beKIeZgYan6wOow6VZEcVUSHElUtoVNgoHi9ASHP1gPOJ+FJquqaoJr+4FgFUznE0tYPQ9yP7CF4YlbJgcoMUUC0W3RaCipnETjCbk076YYLB13Qbpvj/EtFmcH7FB7Q/P1y+aD3upZlukwXwr9pTlpPeoOTR0y+DQ4bIFBq+/oE1RN05IpxFzpkxyxoE+idNB+fmwP2Mu0KTtg2lR52rgImJaZ4WI9FHppj0leaIg5gyd+SS1lNSyKqgHtx+TcW7dqzhnYziemDiCaY9IUjYnV2C64uAUmgMuWnEEUXl4MedxzjDHwME2iAa32LY9PDJsSvb3AchskbSBB3UXP4wz8DRivsMJGUGZpWXc8gJTKVVGuiyXR9N7j4Kj4M5MxdMXXiHBote/aOY3hYTQFZTXQBOmLIOzs7luhPlNbQMtdV+NY8nLchEvQHC4hu5OO63k1EBba214+x8gtRcPqd1XZk5REkxwxbUhLNdWL3oUvNj82ZZgZmhbX+UmzHfnceqOt68an0YvBse3Z+Nj/eW/iUGF/wdEi5UA+55CNJNdS2rnIcd7MiLlDKf6SxZAARdgiczvh9dFi3aqPiNzUFx7adiVyq6qLnhVGbhFnmhvwY8Un5XvKi/pC+KmjXdTjpXr+VhUYg0Pk9pgadb+0fDIRw9AWEkcnye4Baz7YAwFlu54HI/b0mwEpbYHKPVSJXGsfNDI1ENQKosYEZG0e2++tC4WN/TT7QTFacWnAWxNAMSQRjdOrgdUDzIc36kbWQhAbF6YeML2XHsIiVG+dIBmYYORl4xfw3hd806fHezDxwHbogwutmm4d2P4FbpWfTdeP7PHeWRo/8SYHygv2ipjiTt2goLobwqDz9wErVs2hHBqvYEZrRG3MZr2lW07OkC1JMKs3cMUKY8fUH4cxh0MGd+LwfKIcIh5ehzO4RML7jj26yn1e8VFznUeCQOcB54o6MJFq4HECXqTSvx0nv1LpylickUgVop3aqDfAUr037jmRCdBvjRZ/feQMVaTek3cENZQbjlQzqfUYP1gSmb/uSsBJ2yXfwP4BsBXAMhFg2GZzgP4jMs6cDoDoLYPCHgGk81UMKpX5II2uqFqbZDeIUcKChltHt7h9DlzPlqeWtT2HW65n2wIuuDr9qPEWxxY6jeMvansO1xy3jq5xWvNlj8xG2jNKC3wWK77piwCrLaJtlA2L3MNaTtoMacNsIuYCDAUvZqVSauoPxw/ds5gNtffkXN/YPwWEiusNn6G2yFNgXMwGNbhpyx+jTladf+YMIpXWw799f0Kh/41qOcOSbjQctmNj6XdcM6ZRkfpN9KaP+5c8lsJ0y+VF6jK/QrlI5WuLDCCCeVptEZOmcm0RKpbw+7VFnNOcbUmsApIc+K1csd11/jLz6eYLMy8N2B0nhWGwA6D+ivyY04DGaQrJUlLfTj5hXI5qi0AbJJpc95B5IG52may3J6Js6O1JuIGmoAZC5B4JvdAivvPP1RYBJlWv+2ZD65/GI8l5J54splBMyKJDyqajwRY+AmRvB2H6N0FgF9vweW2FMpgWsxHOZQQnVVuRToZWgxHBNdkWv/bWgHnqd68sXlhv7LU5j8dvowMGHY4ITvKYTndsPQSNOX0SOr4Mfjjeq4MyfOC1RlBeH+kJZZL0TVWnXYNzoJMUPFXR5gsDoemwUh0FITEHajYtnQrm57agvQB3NhX6/Vo9AI0FRwhIb9szBVqd0Vx3FD65tggwV5xW3IqLwdWpACEwj16mDYTwzUefG29Vfdq8LwF64b2SOCh5aoWUvx3MV15tHuWo2naO67Zi6no2dg7Q9ErTrOJVH0Eb7+OQNAuNU8h/fuO0DMYcTq4VLmo0FPRDCF3QNlBbGazU8L7n3/7q8I0Dg4PCh0VtLhw6t2b6jm3lIjWvCxkRfNGlvXm3l6p00kcVrVRW/hKqESNk8zwYdv9hkO5WUops4Yk/FAlB7Ulna6C4OzGa/k7hrUdejn5r/7FVH03ZtHPXFql6s62/TTvyvQ0KIuZWRNLx5BMFG9XsLZLb1eO03DVohFRHycy5CS5yNJ+UqbgAW2Vb9O5GW7ha+bRe+NQoXEF7xu2Y5IW7RCqA5tYSs6IP5AX2s4YP5CzQsunMGysmLp99ijlDegONnVZpUf0xVBhLXfC1oTo5oQtLds8lWsqBn1qNOFzsH2UVDuBxBNrY9NyB+9VSDylZXkYXeUQkfIF3La4cIsfIAxmTUEZE9ySV/xmA6mK1fLrd0yiOAzsSlEhNKa2HLgqACy0H6t6KgzHzFlx1ko72tM158/TpgIGApgWZieXXVQG2VyhXElFqG4G21zUHzgngZi/Uy65ZsaWR8WovMj6MDhhvnXOCm064oxENtybDMfYAPuF9Xxi0UFw0KGpeSMwWQXSH5mYoUZtC1uiAsRPXz5aM3XJwVn/orblTKTrnuWCqw4GA2/zjXVbqDbkcWqNS80JzHfGjjnWjaj6o6b25Sa61IL/a+q3R1hlNHpAZK+AzTfn6cGqpY4NPb0bCSbmCU+odcRWKkjN34jFS55DygC/qTQ2UVtmUHS87LZ5d/yygdCCA605gl7sILPsDVyu/3YSUXuIWMOqsS1+AgIHXQWGdzYqZ+1SID6kE+tylqGbUeGiwFVjcjD58hjXQhm+aXjHeqnya/nrSQYqE/4y5UAHOaZ43HG0LWwPUaA86GuqSz51S+40mIDkO6l7zbLtSaYf4p2kczwwTgkOZqvX44IcdXRJIqLJiNkhwwKY9gpoPdIKa2bjYATzQ2T3Q8RXkeIKjYjZIcHhF/wYznFLzudIygjMyGozgQ0FWjPb0TRklmjZVnfYH4JmbxlxyGnHr//vO76Od+TF7ghbJFtXyexelKSiCDNZCbtrv9iZTCFjBezLjiVoohsS4MRxoecF464mnAd0t/g9+ob8LJFcdssF3E9kOgn21ix/VNh99CgQ51+FhCthl/nnlTQ8jgvMpLQKZ0kI0zamJR5eb1+FZynXxihiTqAkeZsUQnHUwA1JLVPICpW1Ft8iLRyeazw3ZCavctShqDEC3ZttTctdv6I0HyTgleqOxBbGGe1K9VR5sIg8a6dBz26cCCe73oL9N2Xwh/zQ8T1LsqpVt9iL3MGjfGUCRpvYGOK6+8JAGYPDpYHNE/wUw0uGOIYtTWCotDi89sN2GiCuBURwPVrrGpHqSoZqNwXXuIdWGZyTsDQwFpDcF90zTSP/NwN/ypCf+Q4tAAz8O3gIh8vsjVf73m0C08zzg6a2Iy7EGYl5P/dnpGBtbozMpdMnnCeKfBYzycaNPUhbogP42/J2f9sYvCCcp4Y1TqOsGoYUVhjt+m3X8ONrQG9MSg9BaYCNZfwm9mQ5tOdvyPM4l/YMS55s23/J79TwOqF4XY3V8bTjQ87dCc0qZU6+9UiLanoOaSWq+XKUDSVkw6D/I4RhQqrJp8nB1WdisqP+r5/J/0BOuKzRiikQCJLc/3ZMUlM9eaSzIvss6Z1t+Snb9gT85n+eLAm+uFvrm5GwgmoNZ/rYoTe+kO2qrLJr3fDAZvE9jk7sJAEkOIH2S1jntwoylOpZsra8IZ9zwlBccKJDMzwD7iIdMEU7Np6m2AJR22ZXcIv8ESF7RuAMLjiC/nD4FtNV5TRHbS0P1f4LHIC35lBI/o8BVCU3FLod2p1mjxB3AmF0OkvyTfMr/KrDITAohYf5CQCHACfKIt/2uhvvMMHaLpDF9mJOB0j4Vop20GU1qfHhgFNz8rcDuAdPgSKKWN4hR5iuujIa0goODVNmBwVwqyPLkKqI3SdK/pHcpwITToioHXLoTbmvq4je5o9CcoSgmo3OeC0hC1rnO2baG6kpFlMhLvgMtNpy8fLczJRdRj/wHiE5abI7KRmsktkVBFIjEKkL+ZfRWMcQcWUKRWbFWCFoLANfgQOQB6U0iFs3PrBnrDGURR84kKHDL4lRD63ajmweGarlgPygBUHGl9InLIkUI/yyHKwNFLaFxwJd6BUNgyJ8hAGRu+oh83tHBQPzTPdGQSQ9E7UTZyPEkepr718PTKsUR+6havjSltYJFa/2VqOD4RQmAD6Ncp7XEPjoHgzQuqU7chzAD6a7w2zoRjxzBCpJBYZ8mOn1etQlaBQeGhnKjRwOUlIBKDrpS7NxH+gL/epRHi/yzoBmhNaDRchp+1mpmaz43BRCl2lK2EU9pWqElqIixKUmxFWqVSHJKijVVgZAKFDBuJ1caPbT/YuQ5QrojJLVWOP6pQKSqUZHD6WsnkVfZUkV9aV9QQkTpwh82Kr/LkArl9ZMsSJZij1dQV/4VHI5cHsTjtLgA2qVkmj5l7pnfAeV0McZGHI3PjbRQ9UZK00hgUmSRe6Kkzy9QhFxCd4RIzj5LrpSrSlmVAlZe6s/w1b8bpK3xSi8xt79OdzOgIsEhaAaXIn1vqij/2R6oYJeMJbW5pOoXoFIfRGwUWSBX8TVtlCg4Knbnv4PgyOVFs/HyD4uWE2qe11owSNISDh9J7B6d1dsNUopYsILeJzwpUu/hRXz4haT1zYyEWlRnivSNsmfy3wxP8rphZ/1lzjcjVEFwDMT85ajNAVXcEVoo+YlwLFRUP4lKKNEqe8pJUWmSwZk9YnVuqnh0/4b5dv8EyFz0fIZxhadBXz5PAIKPz7ShlHD3POsDt7JpCEFCYzJsLJDFB0q0u07nWvFJ49ximQrJjZSOJ/TUK4GqCY6YFFpWzLSn4knloqMMfEkbIjcOZSyxNuuqvTX/Cg7HwEtQgxB9LmFKGkcRMklUzDpaUQDWzSiFRWmZozIPKLzGSt/w+wSkvgkXaInsRDHYl1Tk/dUluUpGAwOJReucsqhxMuopB8Qw3xfwzI2vp0RiQkkeJ5rs4l+NckojYnsuesO/ImaKcj2tILHWFjWa5KU6PhSfkRgFEObpp23naU7HgqeDhTDkPpT0yb71WCks1cqVtv8JH8lfj6o5HNNUmFQFXplTUWMoDscDqY9DwVqml9jGM8d6Jfy7ROqfBbnGZaoPrBJ7ufWkXEomRIneGIlVBgtO1QtYsJB8EgPun4O6lPG4Kjrr5UeZ97MibJ1BLpdrEZZCoRIbJCoLC7Cwt8cF+85CqQStVmkhBEs6SS4vciYKrQxD2fyXA8iYtMpAlJgferPcXRpL0EFeHqM3KS70KmuIDvPyiB7ZmarcD/PcEzu30gqpbsuriSo4XEUrldP2toVHNOc58GaYfg0a2qelJ2rt/wtW6l8C5zTS3ywHNEiOpq9PlqghdXdIi0+4mbK4eNh4J6jTuPcNV/BTyBrF4AMli2vEsSqK33qC0vtyo6IOh9TCj9Ro0UxQyrUu7ukgKWmQ7FV9W7rDUaDO4/McPEQ9pKoG97sD1EpPoPLlqEdr5WwY5+XWTgY0AKQ3im4zQrckSMzNdZQUHVkHPX55n6LLKfy+PNqGB11UGr0wxTeWU2j//Urv34GKBJdGxqmFFiyViqPLwD25x9d3+dwtmHifZTAU8YkMLLwcH16oXuTQdWXspBMHE5UCkCk4OeR0eo6yYf8FpDnngIV20iK+IlcR0Q/aC+z5y0PaupKwcWdPmLgdt3uDRy3wgwndQ+ey+eTwMdWxVHG6CBYvTBSVCEvlyj/jm/mvoqIOh1aYHFBrU03t+WuttLCYZXd0qJ9I2bxBDB5lNRv5PTqzu9/NOfCphVWfsDoWSiGpczksJMyAf8vQ1l8CGwjZu4vVIjaBmhYzePcHK8hYiOtXJGZix7nVdoy/8q1+am2TlKGwdh2NN18pmBKcc3u0E2Q6RWT3z77bH7rlbgkqKERuYCA0D76iiAe/RQfw+GNdaWLQ/gOH2/6wUltHYCmTF7XvVG5AvDxGA5pRatL283S6QjOJhPQ4ZHDM3Ub/5gKpc3ZX+Udxmx38CNvzh7McOKs8nYDZF2g7FOoKW8IsEaos8ueNUvkvw0SkUgCm1tLFSnxwHGSTwkH9mcdn/5XVsKGSNmW1RUgnxi4n/7pqD0C/7gPnyO7LFNIc25dQjUtzVsotzFVdErBDiqhTHoOVwKpMpIb2XV+IZqynSwoyPOt3M3eRDH13b5Ga7yIBmOVBIQpYtTRzZdhgNLJUSRXf4RWACcGh+qYV+nTnPlOV78vTF7N5JmiOtvml4VdKywKb8n0vlUgF1cz5PaglISqVepAai/THROo7q5LqS8Fh9HioDqey6+q94ngAabLI8IRSX3oEp53WVBQurwpMIn5piPDjvC+Y80Nv8/MmKXZSi/5ve9T6eJpvLPDcDgrCgqqoLQIWc5L3UNCvIWnrZXKLUP8IltZL+4zxNzV04bM+zAF8AwbM8VyWUlQY89nh90o2rV2aXU05Y2VMrxHRFARVnkdJuXBHlzpv/43yjMAkbvAVgVEFTB+pELipFhEaSalIVKrnfUUgZeFJGyXpwyOX5LwzZAtt4OKvOdHVn51SwkhSwC6SiNRdLx7pW2CpKbbVV3U0TF/530cNMBPoLAd8Uu1XVQsRfe/JsJH6Rlwozvwe4nfcKQHRjlui1EvSQ8VirShRtEOcpiVroYRe/mw+KpHj8rvOO3OnaiWgkeQ8rPAOrwCMCM680Ezbo+8MNZRCKT6XpaUiATG4Eqkae3XU/ox1yXMuuC2M1ShXRx0dEy9rEKHIcsIntwSsiN6QwbGL8Gk/eLBbiVaSp6+6WjYj9H8eD2sUF4slj959K+ZO7FFPkUikFvmPjRSBUlQy9IGFSqC2l8kKoc9j2bwj0LZU1ueS2t5CdodiU0Ed74/MDfvx7fjGzpGFF2W5RSXKs68gvZkqElrLWWl5OrMyl6ZRNYb1i3VNitYNm1c4fNS2hcn/t+HHb7gJI/vyx5ibznCRWaGurxk/dQyPl8dKJXAKTiXafsHZaenbaiZPE8gZCe1neEOhube3Nwg6enuLQTDE2/uHQvD2biolnYPyxClNfPrhIc59I7WpJVlyNkr2CqJCMZvN4x4zRQPNMIMOx9sM7+JrW0EsvCHo2gQ2UuGkQv/209l1Bh0OJLo8ptkMVI6FEbB1NH9br/fK3uE/j06QI5eBsppLqktXZ4CbMb/RJClUb4qOUpUCVqgAKHmSr3jJuodw9M2wDDR0PSAYLsmyWBnkV3Joq1ykOkOxmLuQ5yBSoxAtwX4qaRc5tgCsREUlJSLJ1q+HnE9ul7k8pkmDJbv86jYtSLCXHegtQolKIjVP0H4sqNWCkpISqWhjfW5M9fGTLDz7MdBP8rLg1q0aZhqNXDdaMqU0NOlyzZ5nrRp/aH4+YSN2EX5/kVItKlECLaBkW6RxJGwcOLm08YP2J454fjE0NP7iJG2eVscpiyH5VRSppvXhLLmI9+tc4h9ZvrYIHUGB4P3OBKn0Dan3dysvD92QNOzauO+buQ3123AUzzGcwhth0NwOAgIfq3TlZupLBRr504JQa18ALtqM3o9bYrdBmq9s0dttZxaDYfiFnzIFpMvP/hxUwOe79T2ysgkpMFQHg82e8jL2zjPAuLaIipKgvz54sazUGykprJYNxUxTN6obPMD1QqldtpokrVpKNhjVsiFdhic3KUyYoZFl6Th4Cd2abN47PuJXaZ9H6eJayHDq27Ugq+KZ5bCXHXFZIgLKpUwFyAeaPxufxldSnoJpbZH2+M8+sbvDvvJ9aikV3mYDgQIdanbZpNhJIRtfUhAwejOCFOotWDPy+8hUMiNMoileEhCNaCm2XqewRBrLLNa4gBNEu4BVaPr+n1M6NKoZy7JB8ETfB9dOtea+cNEGqqJdzLRcaCqaqzSFNrE3Cc2dXeHerwgqleuqBrMb3N5FwSA8j2Mmg14TRu5Go1hl1StZaXgWNEKjPVDLae6akT8+hFTZ/dKXksHpwZfEAEoXB5bTJqJENtqjzwlDbsZSw+jk4EDKpaQkccbbiLkZ6kq9kjAJwGwPRHHiTXn21d34ST8oMITJVWJ0pmDUxhth+lMT3m7t+006XCpBDe4l11E65QDL3LJUEdGRE0gEYqqN4wKURBlNVMZyKcWFNLJFxFYejP9SKrfPCtOhLew64nEuUGNwWor/ErNiVqCLV4QNk2EYGh56ox9PshkMiae1cAlkChWVI3yJu1Wf1Mbni+upjiV8sOlmKGmLFhVlUrK0EFWppYKS21iyJSpvL2FgwzOjwggyx5Vy+bJUyJ6sGJI3ox3YgXQBwGw1oyskskJ6sUZNxDZbbbZAKl0ghV49Jkw7GNl9LseVlGQpKPdSX0rupQSjlxw7VMWUHEJRWmojV+jkco5T4ZJFC5eFq7hDLlcosD/yOE6JD6FEaZeW+zI/ir8P05wGZyYohFoLYAW7ZnTNAPuEuBzeF1wF1NLln3irnNM01nvnBnPBgWjzs2pdLzV/M4JhtnYln98GJrUwmA5nBsWsvAO8Ij3yu6iQRMMEBQWYgwXary5abm5wRu/HHTzIl5QGLa81utYN4DA0qgnMu2QvW/T2trnBjE+SamwgN9uXNMi8Mph0TWP9ZguUOU7pk4aGCibhgf9GbbgXhIoEB+xZpeJJFlZ5RHMs854e2cCoBinzkNYAHABCWlvEwwQywYJJOQn2Q2qzyuNUrKDNq5ZWTgQHdseQ6KguIb7KmngfTS4e4EthvgahcpogGf1KG1LaqGQXGmAisQZtLzS8eLvfYO8jtQX7oSUm1pQAVWqhqlQgfYRG/+vH+TWeiMoEB7wqB4bMVL2vycjuJ9MfaEtfOwmJjXmY4NVjbq/xR1EFwVGVB+tcnuRQnNrm6Kt2EYwmnmX1bDhcVZDNXyIy2Pyv9ZXXeAoq5qUCz6FOMvtBzqGClsMh91JkN1aQv4kjOiRS5Cntqh2N1JDehvdhhcuZcfEar/EkVMHhymCwvpiH04xiIYDZ/WX1L2nfa5v/Nf4InpY6lObsnBYP1vFgq1RKBEol4AIqFS20KlEKJEqlLQitIS3tCZVsXuM1TFGFSC0HsS160WCzZxotNIaIVKe0TQLPHL6OpPMxw6mv8Rq/i6eJ1Nd4jb8cTxOpr/Eafzn+Hxnx098nrmhKAAAAAElFTkSuQmCC>

[image6]: <data:image/png;base64,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>