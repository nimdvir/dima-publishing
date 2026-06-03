import { Chapter } from './types';

export const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    title: 'Chapter 1: Introduction to the Textbook',
    introduction: 'Welcome to BITM330. This chapter orients you to the course syllabus, the R.E.A.D. framework, our five core competencies, and the systems-thinking approach. We introduce our continuous chapter case study: the Grading Database (GDB), demonstrating how simple records track your course performance and guide your learning journey.',
    concepts: {
      title: 'Systems-Thinking and Course Orientation',
      subsections: [
        {
          title: 'The R.E.A.D. Framework & Core Competencies',
          content: 'The R.E.A.D. framework outlines our learning strategy: Research (gathering evidence), Evaluate (critical analysis), Analyze (dissecting structures), and Decide (informed action). Through this framework, we build five core competencies: information literacy, systems thinking, database design, query proficiency, and data-driven strategy.'
        },
        {
          title: 'A Systems-Thinking Approach to Databases',
          content: 'Systems thinking views a database not as a passive pile of tables, but as an active, interconnected component of a larger business system. You will learn to trace how data enters the system, how it is processed and protected, and how queries feed business intelligence to support organizational survival.'
        },
        {
          title: 'The Grading Database (GDB) Case Study',
          content: 'Our active chapter case study is the Grading Database (GDB). A university course is itself a management information system tracking students, sections, submissions, and grades. Designing a robust GDB helps us understand primary keys, relationships, and queries using data we generate every week.'
        }
      ]
    },
    build: '### Let\'s Build: Mapping Your Course Performance\n\nIdentify the core entities needed for a basic Grading Database (GDB). Sketch a simple text diagram showing how student IDs connect your personal profile to registered class sections.',
    questions: '1. What are the four pillars of the R.E.A.D. framework and how do they apply to databases?\n2. Contrast a spreadsheet view of grades with a systems-thinking relational gradebook database.\n3. Identify three operational questions the Grading Database (GDB) can answer for a professor.',
    terms: [
      { term: 'R.E.A.D. Framework', definition: 'Research, Evaluate, Analyze, Decide — a structured workflow for critical decision-making.' },
      { term: 'Systems Thinking', definition: 'The process of understanding how individual components influence one another within a whole entity.' },
      { term: 'Grading Database (GDB)', definition: 'The core pedagogical database used in this book to model course metrics and grade records.' }
    ],
    rat: [
      {
        question: 'Which competency of the course emphasizes tracing the flow of data from inputs to strategic business indicators?',
        options: ['Database Design', 'Systems Thinking', 'Technical Synthesizers', 'Spreadsheet Tabulation'],
        correctAnswer: 1,
        explanation: 'Systems thinking bridges individual tables with macro business operations.'
      }
    ]
  },
  {
    id: 'ch2',
    title: 'Chapter 2: Foundations of Information Systems',
    introduction: 'This chapter details the foundational scaffolding of Management Information Systems (MIS). We analyze the classic Input-Process-Output (IPO) model, the Data-Information-Knowledge-Wisdom (DIKW) hierarchy, and the five-component IS framework. We explore how systems align with business behavior and support operational tasks.',
    concepts: {
      title: 'The Five-Component Framework & DIKW',
      subsections: [
        {
          title: 'The Five-Component IS Framework',
          content: 'Information systems comprise five core components: Hardware, Software, Data, Procedures, and People. Hardware and software are technological. Procedures and people are human. Data is the key bridge connecting the technical side with the human actors who execute business activities.'
        },
        {
          title: 'The DIKW Hierarchy',
          content: 'The DIKW chain describes the hierarchy of cognitive value: Data (raw signals/values), Information (data given meaning by context), Knowledge (information processed and contextualized for application), and Wisdom (the ability to make sound business decisions based on knowledge).'
        },
        {
          title: 'Strategic Alignment and Human Factors',
          content: 'A database is worthless if procedures fail or if people lack the literacy to input or retrieve data accurately. We analyze Wilson\'s information behavior model to understand how human needs, cognitive biases, and organizational roles drive system adoption.'
        }
      ]
    },
    build: '### Let\'s Build: The GDB Input-Process-Output Model\n\nDraft an Input-Process-Output (IPO) flow chart for submitting a course quiz. Label the raw inputs, the storage/calculation processes, and the output dashboard displayed on the student screen.',
    questions: '1. Detail the five components of an information system using the context of a student enrollment portal.\n2. Walk through a specific business example tracing raw facts from Data up to actionable Wisdom.\n3. Why do technology-first system implementations frequently fail without standard procedures?',
    terms: [
      { term: 'DIKW Hierarchy', definition: 'A framework showing the progressive transition from raw Data to Information, Knowledge, and strategic Wisdom.' },
      { term: 'IPO Model', definition: 'Input-Process-Output; the core structural pattern of computer systems.' },
      { term: 'Five-Component Framework', definition: 'The structural elements of an IS: Hardware, Software, Data, Procedures, and People.' }
    ],
    rat: [
      {
        question: 'Which component of the five-component framework acts as the bridge between the computer side and the human side?',
        options: ['Data', 'Software', 'Procedures', 'Hardware'],
        correctAnswer: 0,
        explanation: 'Data is stored digitally but is produced, interpreted, and utilized by human actors through procedures.'
      }
    ]
  },
  {
    id: 'ch3',
    title: 'Chapter 3: Understanding Data Fundamentals',
    introduction: 'Data is the lifeblood of modern commerce. This chapter explores data classification (structured vs. unstructured data, qualitative vs. quantitative observations), measurement levels (nominal, ordinal, interval, ratio), metadata, data quality criteria, master data governance, and the regulatory, ethical, and lifecycle dimensions of system records.',
    concepts: {
      title: 'Data Classification and Quality governance',
      subsections: [
        {
          title: 'Structured vs Unstructured Data',
          content: 'Structured data conforms to strict schemas (e.g., standard SQL row-column tables). Unstructured data lacks predefined models (e.g., PDF transcripts, image grids). We explore qualitative data (categorical) and quantitative data (numerical/metrics) as structural categories.'
        },
        {
          title: 'Four Levels of Measurement',
          content: 'Measurement scales determine how data can be mathematically analyzed: Nominal (unranked labels), Ordinal (relative ranks), Interval (known distance with no true zero point), and Ratio (true zero point permitting percentage comparisons).'
        },
        {
          title: 'Metadata and System Governance',
          content: 'Metadata is "data about data" — it describes field types, limits, and sources. Data quality is evaluated along six dimensions: Accuracy, Completeness, Consistency, Timeliness, Validity, and Uniqueness. System lifecycle management protects data from creation to erasure.'
        }
      ]
    },
    build: '### Let\'s Build: Data Dictionary Definition\n\nDesign a data dictionary metadata template for the student grade field. Define its measurement level (Ratio), data type (Decimal/Float), validation rules (0.0 to 100.0), and description.',
    questions: '1. Classify three course attributes using the nominal, ordinal, interval, and ratio measurement levels.\n2. Why are metadata models and schema catalogs core requirements for maintaining enterprise databases?\n3. Describe an operational business failure caused by a lack of database consistency.',
    terms: [
      { term: 'Nominal Level', definition: 'The lowest measurement level, using labels or categories with no dynamic order.' },
      { term: 'Metadata', definition: 'Structured information that describes, explains, locates, or otherwise makes it easier to retrieve data.' },
      { term: 'Data Governance', definition: 'A system of rights and accountabilities for information-related processes.' }
    ],
    rat: [
      {
        question: 'A student score of 95% on an exam falls under which scale of data measurement?',
        options: ['Nominal', 'Ordinal', 'Interval', 'Ratio'],
        correctAnswer: 3,
        explanation: 'Test scores possess a true zero point and allow ratio comparisons (e.g., 90 is twice 45), making them ratio data.'
      }
    ]
  },
  {
    id: 'ch4',
    title: 'Chapter 4: Introduction to Databases',
    introduction: 'We shift from raw data files to structured databases. This chapter examines why spreadsheets fall short for multi-user transactional data. We review standard file-system traps (redundancy, inconsistency, program-data dependence), define Database Management Systems (DBMS), and study core entity grids, primary keys, and basic SELECT statement formats.',
    concepts: {
      title: 'Spreadsheets vs Databases & the DBMS',
      subsections: [
        {
          title: 'The Limits of Spreadsheets',
          content: 'Spreadsheets are designed for single-user analytical calculations. When forced to handle transactional history, they trigger data anomalies, lack multi-user concurrent support, allow inconsistent entries, and couple data definitions with local processing programs.'
        },
        {
          title: 'The Database Management System (DBMS)',
          content: 'The DBMS is security software that sits between physical data storage files and human queries. It guarantees concurrency control, structural abstraction, transactional security, and schema access controls.'
        },
        {
          title: 'Entity Integrity and Primary Keys',
          content: 'Every record in a table must be uniquely identifiable. Entity integrity is enforced via Primary Keys (PKs), which must be non-null and absolutely unique within that table.'
        }
      ]
    },
    build: '### Let\'s Build: Writing Your First SELECT Command\n\nWrite a simple SQL statement querying your Grading Database. Extract the full names of all active students registered in class.',
    questions: '1. Explain three operational database problems that arise when spreadsheets are treated as transactional ledgers.\n2. What is client-server database abstraction and how does it separate physical storage from client views?\n3. Define the rule of entity integrity and explain why primary keys must never be null.',
    terms: [
      { term: 'DBMS', definition: 'Database Management System; software that controls data creation, maintenance, and logical queries.' },
      { term: 'Entity Integrity', definition: 'A rule requiring every table to have a unique primary key with non-null entries.' },
      { term: 'Primary Key', definition: 'A column or set of columns that uniquely identifies each row in a database table.' }
    ],
    rat: [
      {
        question: 'Which of the following describes program-data dependence?',
        options: ['Changes in data access logic require changes to application program layouts', 'Databases require heavy application server platforms', 'Users depend on passwords to modify schemas', 'Queries trigger syntax warnings if keys are null'],
        correctAnswer: 0,
        explanation: 'Program-data dependence means file structures are defined directly within local program scripts, so any structural change breaks the software.'
      }
    ]
  },
  {
    id: 'ch5',
    title: 'Chapter 5: SQL — The Language of Databases',
    introduction: 'Structured Query Language (SQL) is the universal tool for interacting with relational databases. This chapter unpacks SQL syntax, covering Data Definition Language (DDL) and Data Manipulation Language (DML). We master core SELECT statements, WHERE filters, ORDER BY sort conditions, JOIN techniques, GROUP BY/HAVING groupings, nested subqueries, and views.',
    concepts: {
      title: 'SQL Syntax, DML/DDL & Analytical Joins',
      subsections: [
        {
          title: 'DDL vs DML Sub-languages',
          content: 'Data Definition Language (CREATE, ALTER, DROP) defines schema walls. Data Manipulation Language (SELECT, INSERT, UPDATE, DELETE) processes rows inside those walls.'
        },
        {
          title: 'Aggregations and Groupings',
          content: 'Using COUNT, SUM, AVG, and MIN/MAX extracts business intelligence. We explore the critical syntax rule: WHERE screens individual rows before grouping, whereas HAVING filters grouped rows afterwards.'
        },
        {
          title: 'Relational JOIN Mechanics',
          content: 'Relationships are materialized at query-time. We explore INNER JOINs (matching intersections), LEFT JOINs (retaining all left rows), and how joins connect transaction details with master entity catalogs.'
        }
      ]
    },
    build: '### Let\'s Build: Aggregate Grade Computations\n\nComprehensively calculate GPA trends. Write a SQL command to group submission grades by student IDs and compute average scores, filtered for students averaging above 85.0.',
    questions: '1. Describe the difference in execution sequence between WHERE filters and HAVING conditions.\n2. Write a template query joining three tables (STUDENTS, SUBMISSIONS, SECTIONS) to outline enrollment grids.\n3. When should you prefer a LEFT OUTER JOIN over a standard INNER JOIN in business reporting?',
    terms: [
      { term: 'DML', definition: 'Data Manipulation Language; SQL commands (like SELECT, INSERT) used to process stored values.' },
      { term: 'INNER JOIN', definition: 'A query join mechanism returning only rows that have matching records in both tables.' },
      { term: 'HAVING Clause', definition: 'An aggregate filter applied to groups created by a GROUP BY clause.' }
    ],
    rat: [
      {
        question: 'Which SQL clause is used to filter individual records before group aggregation is executed?',
        options: ['HAVING', 'WHERE', 'ORDER BY', 'GROUP BY'],
        correctAnswer: 1,
        explanation: 'The WHERE clause filters individual records before groups are formed; HAVING filters cumulative groups.'
      }
    ]
  },
  {
    id: 'ch6',
    title: 'Chapter 6: The Relational Model',
    introduction: 'In this chapter, we explore how connected tables replace flat-file redundancy with elegant relational structures. We define primary and foreign keys, explore relationship cardinalities, discuss how relational integrity rules block anomalies during operations, and learn to document connections.',
    concepts: {
      title: 'Database Schema Design and Integrity',
      subsections: [
        {
          title: 'Data Anomalies Unpacked',
          content: 'Unstructured schemas trigger three painful anomalies: Insertion Anomalies (cannot register data without unrelated entities), Deletion Anomalies (losing critical records when unrelated values are deleted), and Update Anomalies (updating a value in one row leaves duplicates out of sync).'
        },
        {
          title: 'Referential Integrity & Foreign Keys',
          content: 'Referential integrity requires that every Foreign Key (FK) value must match an existing Primary Key (PK) value in the parent table. This prevents orphan records and preserves the integrity of connections.'
        },
        {
          title: 'Cardinality Mechanics',
          content: 'We map real-world relationships into three cardinalities: One-to-One (1:1), One-to-Many (1:N), and Many-to-Many (M:N). M:N relationships require an associative junction table holding composite foreign keys.'
        }
      ]
    },
    build: '### Let\'s Build: Resolve a Many-to-Many Grade Map\n\nStudents register for multiple Class Sections, and Class Sections host multiple Students. Draft a SQL schema defining an associative junction table `ENROLLMENTS` containing relative composite foreign keys.',
    questions: '1. Define the three types of data anomalies and give an example of how they appear in a flat spreadsheet gradebook.\n2. How does referential integrity prevent orphan records from corrupting a database?\n3. Detail the step-by-step procedure to resolve a M:N relationship in physical database systems.',
    terms: [
      { term: 'Foreign Key', definition: 'A column in one table that references the primary key of another table.' },
      { term: 'Referential Integrity', definition: 'A rule requiring foreign key values to match active parent primary keys.' },
      { term: 'Junction Table', definition: 'A mapping table created to resolve Many-to-Many relationships into two One-to-Many relationships.' }
    ],
    rat: [
      {
        question: 'In a 1:N relationship, on which side of the relationship is the Foreign Key always placed?',
        options: ['The "1" side (Parent Table)', 'The "N" side (Child Table)', 'Directly inside both tables simultaneously', 'Neither; it requires a junction table'],
        correctAnswer: 1,
        explanation: 'To model a One-to-Many relationship, the parent\'s Primary Key is stored as a Foreign Key on the "Many" side (Child Table).'
      }
    ]
  },
  {
    id: 'ch7',
    title: 'Chapter 7: Data Normalization',
    introduction: 'Normalization is the structured discipline of database refinement. We examine functional dependencies, define First, Second, and Third Normal Form, learn to identify partial and transitive dependency loops, and analyze the practical business trade-offs of denormalization.',
    concepts: {
      title: 'Functional Dependencies & Normal Forms',
      subsections: [
        {
          title: 'First Normal Form (1NF)',
          content: 'First Normal Form requires that all fields contain atomic (indivisible) values, there are no repeating groups, and each row has a unique identifier.'
        },
        {
          title: 'Second Normal Form (2NF)',
          content: 'Second Normal Form requires that the table is in 1NF and contains zero partial dependencies. This means every non-key column must depend on the entire primary key, not just a portion of a composite key.'
        },
        {
          title: 'Third Normal Form (3NF)',
          content: 'Third Normal Form requires that the table is in 2NF and contains zero transitive dependencies. Non-key columns must not depend on other non-key columns; they must depend on the primary key, the whole key, and nothing but the key.'
        }
      ]
    },
    build: '### Let\'s Build: Refactoring a 2NF Redundancy\n\nConsider a table where student details depend on student ID, but student advisor details depend on advisor name. Identify the transitive dependency and split this table into two clean 3NF entities.',
    questions: '1. What is the fundamental difference between a partial dependency and a transitive dependency?\n2. How does normalizing database tables prevent data redundancy and update anomalies?\n3. Why might a business select to denormalize parts of an analytics database schema?',
    terms: [
      { term: 'Functional Dependency', definition: 'A relationship where the value of one attribute uniquely determines the value of another.' },
      { term: 'Partial Dependency', definition: 'A dependency where a non-key column depends on only part of a composite primary key.' },
      { term: 'Transitive Dependency', definition: 'A dependency where a non-key column depends on another non-key column.' }
    ],
    rat: [
      {
        question: 'What is the goal of Third Normal Form (3NF)?',
        options: ['Eliminating repeating groups', 'Removing partial dependencies on composite keys', 'Eliminating transitive dependencies on non-key columns', 'Merging all attributes into a single optimized master table'],
        correctAnswer: 2,
        explanation: '3NF specifically targets and removes transitive dependencies, ensuring all non-key columns depend solely on the primary key.'
      }
    ]
  },
  {
    id: 'ch8',
    title: 'Chapter 8: Midterm Review — Concepts',
    introduction: 'We have reached the midpoint check. This chapter compiles our core database topics (DIKW, data classification, relational schemas, join mechanics, schema modeling, and normalization) into a unified mental model. Use this integrated review to prepare for your midterm evaluation.',
    concepts: {
      title: 'Core Concept Integration',
      subsections: [
        {
          title: 'Review: Systems Thinking and Structures',
          content: 'We connect the technical design of relational databases back to business operations. Trace how user interactions translate into database INSERT queries, how schemas protect records, and how SQL queries produce KPIs.'
        },
        {
          title: 'Review: Data Classifications to Norm Forms',
          content: 'Review the transition from nominal/ordinal observation classifications into atomic columns (1NF), fully key-dependent relations (2NF), and clean entities free of transitive dependencies (3NF).'
        },
        {
          title: 'Review: Relational Schema Logic',
          content: 'Synthesize integrity check principles: how primary validation constraints prevent database write corruption, and how joins resolve query schemas.'
        }
      ]
    },
    build: '### Let\'s Build: Midterm Comprehensive Design Challenge\n\nCreate a complete logical database schema for the Grading Database (GDB). Write SQL commands to create students, courses, enrollments, and homework assignments, with foreign keys and validation constraints.',
    questions: '1. Trace a data value from a student submission through the database and into a class performance report.\n2. Walk through how normalization and referential integrity work together to prevent database anomalies.\n3. Draft an SQL query that joins four tables to retrieve student grades, advisor names, and class sections.',
    terms: [
      { term: 'Midpoint Synthesis', definition: 'Integrating fundamental concepts with practical query and design techniques.' },
      { term: 'Concept Maps', definition: 'Visual models that organize complex topics and illustrate relationship networks.' },
      { term: 'Logical Schema', definition: 'An abstract model illustrating the organization of tables, keys, and constraints.' }
    ],
    rat: [
      {
        question: 'Which element is NOT required to guarantee entity and referential integrity in a SQL database?',
        options: ['Primary Key constraints', 'Uniqueness rules', 'Consistent use of spreadsheets', 'Foreign Key constraints'],
        correctAnswer: 2,
        explanation: 'Spreadsheets operate outside of database constraints and cannot guarantee entity or referential integrity.'
      }
    ]
  },
  {
    id: 'ch9',
    title: 'Chapter 9: Advanced SQL With the Grading Database',
    introduction: 'This chapter covers advanced SQL queries. We use the Grading Database (GDB) to master advanced JOIN patterns, nested subqueries, CASE statements, and Common Table Expressions (CTEs), allowing us to extract deeper insights from course datasets.',
    concepts: {
      title: 'Common Table Expressions and Conditional Queries',
      subsections: [
        {
          title: 'Common Table Expressions (CTEs)',
          content: 'CTEs (using the WITH clause) let you write cleaner, easier-to-read SQL queries by defining temporary result sets that can be referenced like regular tables.'
        },
        {
          title: 'Nested and Correlated Subqueries',
          content: 'Subqueries allow you to nest one query inside another. Correlated subqueries reference columns from the outer query, evaluating row-by-row to handle complex filtering logic.'
        },
        {
          title: 'Conditional CASE Logic',
          content: 'The CASE expression adds if-then-else logic to queries. This is ideal for transforming raw numeric scores into letter grades directly in the database.'
        }
      ]
    },
    build: '### Let\'s Build: Grading Database Class Curve\n\nWrite an SQL query using a CASE statement to assign grades in the Grading Database (GDB). Convert numeric scores above 90.0 to \'A\', above 80.0 to \'B\', and others to \'C\'.',
    questions: '1. Give two advantages of using Common Table Expressions over subqueries.\n2. Write a correlated subquery that finds students whose grades are higher than their class average.\n3. How do database-level calculations (like CASE statements) simplify frontend application code?',
    terms: [
      { term: 'CTE', definition: 'Common Table Expression; a readable temporary result query block defined via the WITH keyword.' },
      { term: 'Correlated Subquery', definition: 'A subquery that references columns from the primary outer query.' },
      { term: 'CASE Expression', definition: 'An SQL structure that provides conditional evaluation logic within select lists.' }
    ],
    rat: [
      {
        question: 'Which clause defines temporary inline query results using Common Table Expressions?',
        options: ['HAVING', 'WITH', 'GROUP BY', 'CASE'],
        correctAnswer: 1,
        explanation: 'The WITH clause is used to declare Common Table Expressions.'
      }
    ]
  },
  {
    id: 'ch10',
    title: 'Chapter 10: From Data to Design: Building Information Systems',
    introduction: 'How do you design a database from scratch? This chapter covers the database development lifecycle, showing how to gather requirements, build Entity-Relationship Diagrams (ERDs), and create logical schemas.',
    concepts: {
      title: 'Requirements Gathering and Schema Modeling',
      subsections: [
        {
          title: 'The Database Development Lifecycle',
          content: 'Database development is a structured process: gather user requirements, create a conceptual model (identifying core business objects), design the logical schema, build the physical database, and tune security.'
        },
        {
          title: 'Composing Entity-Relationship Diagrams',
          content: 'We use Crow\'s Foot notation to construct detailed Entity-Relationship Diagrams (ERDs). We define entities, attributes, primary/foreign keys, cardinality, and optionality.'
        },
        {
          title: 'Bridging Conceptual and Physical Schemas',
          content: 'We examine logical mapping rules: converting entities into physical tables, translating attributes into typed columns, and using foreign keys or junction tables to preserve relationships.'
        }
      ]
    },
    build: '### Let\'s Build: Designing an Advisor Assignment ERD\n\nDeconstruct student advising requirements. Sketch a Crow\'s Foot ERD modeling students and academic advisors, confirming keys and relationship cardinality.',
    questions: '1. What are the key steps in the database development lifecycle?\n2. What does Crow\'s Foot notation tell us about the relationship between two entities?\n3. When should a design use optional relationships instead of mandatory ones?',
    terms: [
      { term: 'ERD', definition: 'Entity-Relationship Diagram; a visual model showing entities, attributes, and relationships.' },
      { term: 'Crow\'s Foot', definition: 'A standard notation style used to show cardinality and optionality in ERDs.' },
      { term: 'Cardinality', definition: 'The numerical limits of a relationship between connected entities.' }
    ],
    rat: [
      {
        question: 'What is the goal of conceptual database modeling?',
        options: ['Writing SQL queries', 'Identifying core business entities and their relationships', 'Setting database backup schedules', 'Applying indexes to columns'],
        correctAnswer: 1,
        explanation: 'Conceptual modeling focus on identifying business entities and relationships, independent of technology details.'
      }
    ]
  },
  {
    id: 'ch11',
    title: 'Chapter 11: Database Administration (DBA)',
    introduction: 'In this chapter, we explore how databases are managed and secured in production. We review the role of Database Administrators (DBAs), user management, Role-Based Access Control (RBAC), backup and recovery, indexing, and compliance.',
    concepts: {
      title: 'Database Security and Operations',
      subsections: [
        {
          title: 'The Database Administrator (DBA) Role',
          content: 'The DBA is responsible for keeping production systems running. Their responsibilities include performance tuning, database monitoring, software updates, and space allocation.'
        },
        {
          title: 'Role-Based Access Control (RBAC)',
          content: 'Enterprises use Role-Based Access Control (RBAC) to manage security. DBAs group permissions into roles (e.g., student, instructor), and assign users to the appropriate role to prevent data leaks.'
        },
        {
          title: 'Backup, Recovery, and Compliance',
          content: 'To prevent data loss, DBAs set scheduled back policies and plan for disaster recovery. They also ensure databases comply with regulations like GDPR, HIPAA, and FERPA.'
        }
      ]
    },
    build: '### Let\'s Build: Composing Role-Based Grants\n\nWrite SQL security scripts to create roles for instructors and students, and grant appropriate SELECT/INSERT privileges on class tables.',
    questions: '1. Explain the role of a Database Administrator in an enterprise.\n2. How does Role-Based Access Control (RBAC) make database systems more secure?\n3. Why is it important to test database backup and recovery plans regularly?',
    terms: [
      { term: 'DBA', definition: 'Database Administrator; the role responsible for database health, performance, security, and backups.' },
      { term: 'RBAC', definition: 'Role-Based Access Control; a method of managing database access based on user roles.' },
      { term: 'FERPA', definition: 'A federal law protecting the privacy of student education records.' }
    ],
    rat: [
      {
        question: 'Which SQL command is used to assign role privileges to user profiles?',
        options: ['REVOKE', 'GRANT', 'GIVE', 'PERMIT'],
        correctAnswer: 1,
        explanation: 'GRANT is the standard DCL command used to assign privileges or database roles to users.'
      }
    ]
  },
  {
    id: 'ch12',
    title: 'Chapter 12: Business Intelligence and Analytics',
    introduction: 'Business Intelligence (BI) turns raw operational data into strategic insight. This chapter explores data warehousing, ETL pipelines, star schemas, dimensional modeling, and how organizations use dashboards to track business performance.',
    concepts: {
      title: 'Data Warehouses, Star Schemas & ETL',
      subsections: [
        {
          title: 'Operational Databases vs Data Warehouses',
          content: 'Operational databases (OLTP) are optimized for fast daily transactions. Data warehouses (OLAP) pool historical data from multiple sources to support complex, analytical queries.'
        },
        {
          title: 'Star Schemas and Dimensional Modeling',
          content: 'Data warehouses use star schemas to organize data into fact tables (containing business metrics) and dimension tables (containing descriptive attributes).'
        },
        {
          title: 'The Extraction, Transformation, and Loading (ETL) Process',
          content: 'ETL pipelines extract data from source systems, clean and restructure it, and load it into data warehouses, ensuring data quality across the organization.'
        }
      ]
    },
    build: '### Let\'s Build: Designing a Star Schema Grade Warehouse\n\nConvert our operational records into a star schema. Design a fast grade performance fact table connected to student, advisor, and time dimension tables.',
    questions: '1. Contrast operational transactional databases (OLTP) with analytical data warehouses (OLAP).\n2. Detail the star schema fact and dimension tables needed to track sales performance in an e-commerce platform.\n3. What are the key stages of the Extraction, Transformation, and Loading (ETL) process?',
    terms: [
      { term: 'Data Warehouse', definition: 'A database optimized for reporting and analysis that pools information from different sources.' },
      { term: 'ETL', definition: 'Extract, Transform, Load; the process of moving and restructuring data from source to warehouse.' },
      { term: 'Fact Table', definition: 'The central table in a star schema that contains numerical business metrics.' }
    ],
    rat: [
      {
        question: 'The star schema comprises a central table holding numerical measurements, which is surrounded by:',
        options: ['Spreadsheets', 'Transactional registries', 'Dimension tables', 'Indexed tables'],
        correctAnswer: 2,
        explanation: 'In star schemas, the central fact table is surrounded by dimension tables containing descriptive attributes.'
      }
    ]
  },
  {
    id: 'ch13',
    title: 'Chapter 13: Advanced Database Techniques',
    introduction: 'As database systems scale, maintaining swift query speeds is critical. This chapter covers indexing, stored procedures, database views, triggers, and query performance tuning.',
    concepts: {
      title: 'Query Tuning, Indexes, and Programmable Triggers',
      subsections: [
        {
          title: 'Understanding Database Indexes',
          content: 'Indexes speed up data retrieval by creating lookup structures. However, they also slow down write operations because they must be updated whenever data changes.'
        },
        {
          title: 'Stored Procedures and Dynamic Views',
          content: 'Stored procedures save query logic directly on the database server, reducing network traffic. Views save complex JOIN queries, making it easier for users to query data.'
        },
        {
          title: 'Database Triggers',
          content: 'Triggers are automated scripts that execute on the database server whenever an INSERT, UPDATE, or DELETE command is run, helping to enforce data quality rules.'
        }
      ]
    },
    build: '### Let\'s Build: Designing an SQL Query Index\n\nIdentify slow query paths in the Grading Database. Write an SQL command to create an index on frequently searched columns to speed up retrieval times.',
    questions: '1. How does a database index speed up data retrieval, and what are its performance trade-offs?\n2. What is a stored procedure and when should you use one instead of application-level code?\n3. Describe how database triggers help enforce data quality and transaction auditing.',
    terms: [
      { term: 'Database Index', definition: 'A lookup structure used to speed up row retrieval inside tables.' },
      { term: 'Database Trigger', definition: 'An automated script that runs in response to database modifications.' },
      { term: 'Stored Procedure', definition: 'A precompiled group of SQL statements saved directly on the database server.' }
    ],
    rat: [
      {
        question: 'Which database feature allows you to save complex queries and expose them like regular tables?',
        options: ['Trigger', 'View', 'Index', 'Primary Key'],
        correctAnswer: 1,
        explanation: 'A View is a virtual table base on an SQL query, allowing users to query complex relationships easily.'
      }
    ]
  },
  {
    id: 'ch14',
    title: 'Chapter 14: Power BI — Data Visualization',
    introduction: 'This chapter covers Power BI. We explore data connections, relational modeling, DAX calculations (calculated columns and measures), and how to build interactive dashboards to communicate insights to decision-makers.',
    concepts: {
      title: 'Data Modeling, DAX, and Dashboards',
      subsections: [
        {
          title: 'Data Modeling in Power BI',
          content: 'Power BI is more than a visualization tool. It is an analytical engine. We import data, define table relationships, and build scalable star schemas.'
        },
        {
          title: 'Data Analysis Expressions (DAX)',
          content: 'DAX is the programming language of Power BI. We master calculated columns (computed row-by-row) and measures (calculated on dynamic aggregates) to build business metrics.'
        },
        {
          title: 'Power BI Dashboards',
          content: 'We use Power BI to build interactive dashboards. Learn how to design layouts and select charts that explain business performance.'
        }
      ]
    },
    build: '### Let\'s Build: Creating a Power BI DAX Measure\n\nWrite a DAX measure to calculate course averages in Power BI. Distinguish between a calculated column and an aggregate measure.',
    questions: '1. What are the key stages of importing and modeling data in Power BI?\n2. Contrast Calculated Columns and Measures in DAX, and explain when to use each.\n3. How should dashboard designers structure charts to maximize clarity for managers?',
    terms: [
      { term: 'Power BI', definition: 'A business analytics service by Microsoft that provides interactive visualizations.' },
      { term: 'DAX', definition: 'Data Analysis Expressions; the formula language used in Power BI.' },
      { term: 'Power BI Measure', definition: 'A dynamic calculation used in Power BI dashboards that recalculates based on filters.' }
    ],
    rat: [
      {
        question: 'When using DAX in Power BI, which calculation type evaluates row-by-row during data refresh?',
        options: ['Aggregate Measure', 'Calculated Column', 'Visual Filter', 'Star Schema Model'],
        correctAnswer: 1,
        explanation: 'Calculated columns evaluate row-by-row during data refresh and store values directly in the dataset model.'
      }
    ]
  },
  {
    id: 'ch15',
    title: 'Chapter 15: Business Strategy and Information Systems',
    introduction: 'Information systems are powerful strategic tools. This chapter explores how organizations align technology with strategy, analyzing Porter\'s Five Forces, the Value Chain model, and the Resource-Based View (RBV) of competitive advantage.',
    concepts: {
      title: 'Competitive Advantage and Value Chains',
      subsections: [
        {
          title: 'Porter\'s Five Forces Model',
          content: 'We analyze how technology shifts the competitive landscape along five dimensions: threat of new entrants, bargaining power of buyers, bargaining power of suppliers, threat of substitute products, and competitive rivalry.'
        },
        {
          title: 'Value Chain Analysis',
          content: 'The Value Chain model groups organizational activities into primary (e.g., operations, sales) and support (e.g., HR, technology) activities, showing how technology can reduce costs and improve product quality.'
        },
        {
          title: 'The Resource-Based View (RBV)',
          content: 'To deliver a sustainable competitive advantage, an organization\'s resources must be Valuable, Rare, Inimitable, and Non-substitutable (VRIN). We analyze how database designs can defend competitive positions.'
        }
      ]
    },
    build: '### Let\'s Build: Mapping Value Chain Grade Actions\n\nIdentify primary and support activities in high-performance course administration. Map how database automation improves administrative efficiency.',
    questions: '1. How can databases support Porter\'s competitive strategies?\n2. Explain the difference between primary and support activities in value chain models.\n3. How does the Resource-Based View explain why database software alone is not a sustainable competitive advantage?',
    terms: [
      { term: 'Porter\'s Five Forces', definition: 'A model used to analyze an industry\'s attractive structure and competitive intensity.' },
      { term: 'Value Chain Model', definition: 'A model mapping internal business activities to identify where value is created.' },
      { term: 'VRIN Framework', definition: 'A tool used to evaluate if an organization\'s resources provide a sustainable competitive advantage.' }
    ],
    rat: [
      {
        question: 'According to the VRIN framework, which attribute describes a resource that competitors cannot easily copy?',
        options: ['Valuable', 'Rare', 'Inimitable', 'Non-substitutable'],
        correctAnswer: 2,
        explanation: 'Inimitable resources are highly complex or context-specific, meaning they cannot be easily duplicated by competitors.'
      }
    ]
  },
  {
    id: 'ch16',
    title: 'Chapter 16: Final Review and Course Integration',
    introduction: 'We have reached our final review. This chapter integrates topics from Ch1–15, connecting database design, SQL querying, administration, business intelligence, and business strategy into a single, cohesive mental model.',
    concepts: {
      title: 'Full-Cycle Textbook Review',
      subsections: [
        {
          title: 'Review: Integrated Schema modeling',
          content: 'We review logical database design. We walk through the process of gathering requirements, mapping ERDs, and normalizing tables up to 3NF.'
        },
        {
          title: 'Review: Querying and Information Systems',
          content: 'We review SQL syntax. We practice using aggregates, JOINs, subqueries, and views to turn operational records into business intelligence.'
        },
        {
          title: 'Review: Strategic Systems Alignment',
          content: 'We review information system strategy. We analyze how databases align with competitive positions to drive business value.'
        }
      ]
    },
    build: '### Let\'s Build: Capstone Schema Design\n\nCreate a complete physical schema for our database. Write create commands, add indices, configure roles, and design view aggregates to summarize outcomes.',
    questions: '1. Outline the complete database development process from initial user interviews to production rollout.\n2. Write a comprehensive query that joins homework assignments with class averages and identifies top students.\n3. How do transactional databases (OLTP) feed analytical systems (OLAP) to support strategic decision-making?',
    terms: [
      { term: 'Capstone Integration', definition: 'The process of uniting different components into a unified system.' },
      { term: 'Relational Loop', definition: 'A complete cycle of database operations, from record inputs to strategic action.' },
      { term: 'Strategic Advantage', definition: 'A superior position that allows an organization to outperform its competitors.' }
    ],
    rat: [
      {
        question: 'Which of the following describes the complete database developmental path?',
        options: ['Requirements → ERD → Normalized Schemas → SQL DDL → Access control config', 'SQL DDL → Spreadsheets → Normalization', 'Unnormalized inputs → Star schemas → Views → Normalization logic', 'Primary Keys → Foreign Keys → Spreadsheets'],
        correctAnswer: 0,
        explanation: 'Standard database development follows a structured path: gather requirements, create conceptual models (ERDs), design normalized logical schemas, write DDL SQL, and set up security.'
      }
    ]
  },
  {
    id: 'ch17',
    title: 'Chapter 17: Designing Systems That Matter',
    introduction: 'In our final chapter, we look beyond technology. We examine the ethical responsibilities of managing student data, explore the role of management oversight, and establish a lifelong learning plan to navigate the future of database systems.',
    concepts: {
      title: 'Academic Data Ethics and Managerial Judgment',
      subsections: [
        {
          title: 'Ethical Dimensions of Academic Databases',
          content: 'Data is information power. We examine the ethical responsibilities of protecting student records, addressing bias in algorithms, and complying with laws like FERPA.'
        },
        {
          title: 'The Manager\'s Role in Database Governance',
          content: 'Managers write policies and supervise data programs. Learn how to hire data specialists, make budgeting choices, and champion data quality across the organization.'
        },
        {
          title: 'Continuous Mastery and Lifelong Learning',
          content: 'Technology changes quickly, but foundational database design concepts (like entity integrity, SQL, and normalization) remain constant as you navigate your career.'
        }
      ]
    },
    build: '### Let\'s Build: Academic Privacy Policy Draft\n\nDraft an ethical database administration policy for a university grading platform. Define access limits and data retention rules.',
    questions: '1. What are the key ethical responsibilities of database managers when storing personal user details?\n2. How do regulations like FERPA shape academic database designs and policies?\n3. What step in this textbook had the biggest impact on your systems thinking perspective?',
    terms: [
      { term: 'Database Ethics', definition: 'The branch of ethics that focuses on data ownership, privacy, and algorithmic bias.' },
      { term: 'FERPA compliance', definition: 'Structuring systems to comply with federal laws protecting student data.' },
      { term: 'Continuous Mastery', definition: 'The commitment to lifelong learning and professional growth.' }
    ],
    rat: [
      {
        question: 'Which element is most important for protecting student privacy in academic databases?',
        options: ['Using unencrypted spreadsheets', 'Role-Based Access Control and FERPA compliance policies', 'Granting full access to all users', 'Deleting audit trails daily'],
        correctAnswer: 1,
        explanation: 'Role-Based Access Control (RBAC) and FERPA compliance policies ensure student records are only seen by authorized users.'
      }
    ]
  }
];
