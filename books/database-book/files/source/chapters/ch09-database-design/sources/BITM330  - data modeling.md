<!-- metadata: date="2026-06-11"; chapter="09"; type="source"; title="Source: Data Modeling"; description="Source material for chapter 9" -->

Improving
Business
Performance with
Information
Technologies

BITM 330

Prof. Nim Dvir

Learning Objectives

• Learn the basic steps of systems analysis

and design

• Learn the basic stages of database

development

• Understand the purpose and role of a data

model

• Know the principle components of the E-R

data model

Learning Objectives

• Understand how to interpret traditional E-R

diagrams

• Understand how to interpret the Information
Engineering (I E) model’s Crow’s Foot E-R
diagrams

• Learn to construct E-R diagrams

• Learn the purpose of a database management

system (DBMS)

• Know how to represent 1:1, 1:N, N:M, and binary

relationships with the E-R model

Learning Objectives

• Understand two types of weak entities and how to use

them

• Understand nonidentifying and identifying relationships

and know how to use them

• Know how to represent subtype entities with the E-R

model

• Know how to represent recursive relationships with the E-

R model

• Learn how to create an E-R diagram from source

documents

The Entity-Relationship Data Model

When you create a database, data requirements must first be documented in a data model

FOR ERD -LUCIDCHART
HTTPS://LUCID.APP/

Data and Information

What is data? What is
information?

Data and Information

• Data is defined as recorded facts and

numbers

• Information is defined as:

–Data presented in a meaningful

context

–Data processed by summing,
ordering, averaging, grouping,
comparing, or other similar
operations

What is an Information System?

• A System is defined as a set of components that

interact to achieve some purpose or goal

• An information system is a system that has the
goal of producing information and is composed of
the following components:

– Hardware
– Software
– Data
– Procedures
– People

The Five-Component Information
System Framework

A Generalized Business Process

A business process is a set of activities that transform input into
outputs

The Manufacturing Process

The Manufacturing Process with
Supporting Information System

Systems Analysis and Design

• Systems analysis and design is the process of creating and

maintaining information systems.

• The classic methodology used in systems analysis and design

to developed information systems is called the systems
development life cycle (S D L C) and is composed of the
following steps:

– Systems definition
– Requirements analysis
– Component design
– Implementation
– System maintenance

The S D L C in Use

The System Definition Step

• The system definition step is a process that starts with the

need for an information system to support a business process
as its input and produces a plan as its output.

• This step includes:

– Define the information system project goals and scope
– Assess the feasibility of the project (cost, schedule,

technical, organizational)

– Form the project team
– Plan the project (specify tasks, assign personnel,
determine task dependencies, set schedules)

• The deliverable is the project plan

The Requirements Analysis Step

• The requirements analysis step is a process that starts with the
project plan as its input and produces a set of approved user
requirements as its output

The Requirements Analysis Step

• This step includes:

– Conduct user interviews
– Evaluate existing systems
– Determine needed new forms/reports/queries
– Identify needed new applications features and

functions

– Consider security
– Consider the five components of an information
system – hardware, software, data, procedures,
people

• The deliverable is the approved user requirements

The Component Design Step

• The component design step is a process that starts with
the approved user requirements as its input and produces
a final system design as its output.

• This step includes:

– Determine hardware specifications
– Determine program (software) specifications
– Create the database design
– Design business procedures
– Create job descriptions for business personnel

• The deliverable is the documented system design

The Implementation Step

• The Implementation step is a process that starts with the final
system design as its input and produces a final system as its
output.

• This step includes:

– Build system components
– Conduct component tests
– Integrate the components
– Conduct integrated component tests
– Convert to the new system

• The deliverable is the installed and functioning information

system.

The S D L C Design and
Implementation Steps for the Five
Information System Components

The System Maintenance Step

• The system maintenance step is a process that starts with the

implemented system as its input and produces an updated
system or a request of system modification using the S D L C as
its output.

• This step includes:

– Update the system with patches, service packs, and new

software releases

– Record and prioritize requests for system changes of

enhancements

• The deliverable is an updated system and the start of a new

S D L C cycle to enhance the information system.

What are the Steps in the Database
Development Process?

• The database development process is a subset
of the S D L C that consists of three major stages:

1.Requirements analysis

2.Component design

3.Implementation

The Entity-Relationship Data Model

When you create a database, data requirements must first be documented in a data model

The Entity-Relationship Data Model

• A number of techniques can be used to

create data models
– The most popular is the entity-

relationship model created by Peter
Chen in 1976 (now interpreted as the
extended entity-relationship model)
▪ The most important elements of the E-

R model are entities, attributes,
identifiers, and relationships.

Entities

• An entity is something that

users want to track.
Examples include
customers, purchases,
products, etc.

• Entities of a given type are
grouped into an entity
class such as EMPLOYEE
(a  collection of all
EMPLOYEE entities) which
are shown in all caps.

Entities

• An entity instance
of an entity class is
the occurrence of a
particular entity,
such as
CUSTOMER
12345.

Attributes

• Entities have attributes, which describe the

entity’s characteristics.

• Examples include EmployeeName, DateOfHire,

and JobSkillCode.

• Attributes are shown with the first letter of each

word capitalized as shown above.

• An attribute has a data type (character, numeric,

date, currency, etc.)

The ITEM Entity and Two Entity
Instances

Identifiers

• Entity instances have identifiers,
which are attributes that name, or
identify, entity instances.

• Examples include ItemNumber

identifying an instance of ITEM and
SocialSecurityNumber identifying an
instance of EMPLOYEE.

Identifiers

• Identifiers may be unique or

nonunique
–Unique identifiers identifies one,

and only one, entity instance

–Nonunique identifiers identifies a

set in instances
▪An example is EmployeeName is
an example as there may be more
than one person with that name

Levels of Entity Attribute Display

Relationships

• Entities can be associated with one another

in relationships.

• The number of entity classes in the

relationship is known as the degree of the
relationship as follows:
– degree 2 is a binary relationship
– degree 3 is a ternary relationship

Example Relationships

Three Types of Binary Relationships

Maximum Cardinality

• Relationships are named and classified by

their cardinality, which is a word that
means count.

• Each of the three types of binary

relationships shown in the previous slide
have different maximum cardinalities.

Maximum Cardinality

• Maximum cardinality is the maximum
number of entity instances that may
participate in a relationship instance.

Minimum cardinality

• Minimum cardinality is the minimum
number of entity instances that must
participate in a relationship instance.

• These values typically assume a value
of zero (optional) or one (mandatory).

A Relationship with Minimum
Cardinalities

H A S - A Relationships

Understand how to interpret traditional E-R
diagrams
• The relationships in the previous slides are called H A S - A

relationships.

• The term is used because each entity instance has a

relationship to a second entity instance:

– an employee has a badge
– a badge has an employee

Variations of the E-R Model

Understand how to interpret the Information
Engineering (I E) model’s Crow’s Foot E-R
Diagrams
• Information Engineering (I E) [James Martin 1990] It uses

“crow’s feet” to show the many sides of a relationship, and is
sometimes called the crow’s foot model.

• Integrated Definition 1, Extended (I D E F I X) is a version of the

E-R model that is a national standard.

• Unified Modeling Language (UML) is a set of structures and

techniques for modeling and designing object-oriented
programs (O O P) and applications.

Two Versions of a 1:N    O-M
Relationship

Crow’s Foot Notation

Two Versions of a N:M   O-M
Relationship

Weak Entities

• A weak entity is an entity that cannot

exist in the database without the
existence of another entity.

• Any entity that is not a weak entity is

called a strong entity.

ID-Dependent Weak Entities

• An ID-dependent weak entity is a weak entity

that cannot exist without its parent entity.

• An ID-dependent weak entity has a composite

identifier:

– the first part of the identifier is the identifier for

the strong entity

– the second part of the identifier is the identifier

for the weak entity itself

Weak Entity Relationships

• The relationship between a strong and weak entity is

termed an identifying relationship if the weak entity is
ID-dependent:

– represented by a solid line

• The relationship between a strong and weak entity is

termed a nonidentifying relationship if the weak entity is
non-ID-dependent:

– represented by a dashed line
– also used between strong entities

Example ID-Dependent Entities

Non-ID-Dependent Weak Entities

Understand nonidentifying and identifying
relationships and how to use them
• All ID-dependent entities are weak entities,
but there are other entities that are weak
but not ID-dependent.

• A non-ID-dependent weak entity may have

a single or composite identifier, but the
identifier of the parent entity will be a
foreign key.

Weak Entity Examples

Examples of Required Entities

Associative Entities

Understand nonidentifying and identifying
relationships and how to use them
• An associative entity (also called an association entity) is
used whenever a pure N:M relationship cannot properly hold
attributes that are describing aspects of the relationship
between two entities.

• A new entity is then created to:
– link the two original entities
– hold the attributes

The Associative Entity

Subtype Entities

Know how to represent subtype entities with
the E-R model
• A subtype entity is a special case of another entity called

supertype.

• An attribute of the supertype indicates which of the subtypes is
appropriate for a given instance and is called a discriminator.

• Subtypes can be exclusive or inclusive:

– if exclusive, the supertype relates to at most one subtype
– if inclusive, the supertype can relate to one or more

subtypes

Example Subtype Entities

Subtype Entity Identifiers

Know how to represent subtype entities with
the E-R model
• The relationships that connect supertypes and subtypes are

called I S - A relationship because a subtype is the same entity
as the supertype.

• The identifier of a supertype and all of its subtypes is the same

attribute

Example Recursive Relationship

• It is possible for an entity to have a relationship to itself—this is

called a recursive relationship (also known as a unary
relationship)

