export interface LabStep {
  title: string;
  instruction: string;
  hint?: string;
}

export interface LabChallenge {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estMinutes: number;
  objective: string;
  steps: LabStep[];
  startingCode: string;
  solutionCommand: string;
  exerciseType: 'sql' | 'schema' | 'express' | 'websocket';
  validationKeyword: string;
  hint: string;
}

export const LABS: LabChallenge[] = [
  {
    id: 'lab1',
    title: 'Lab 1: Clinic Information Flow Analysis',
    subtitle: 'Understanding the Vet Clinic as an Information System',
    difficulty: 'Beginner',
    estMinutes: 20,
    objective: 'Analyze the operational information flow of PetVax Animal Hospital. Identify core processes, human actors (veterinarians, receptionists, owners), and database queries.',
    startingCode: `-- Analytical Exercise: Vet Clinic Info Flow
-- Document the actors, process inputs, and outcomes below.
-- Write standard SQL syntax showing which table stores client records,
-- and identify the database table name where OWNER data is saved.

CREATE TABLE Owners (
  owner_id INTEGER PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT
);
`,
    solutionCommand: 'CREATE TABLE Owners',
    exerciseType: 'schema',
    validationKeyword: 'owners',
    hint: 'Confirm you are defining a Table named Owners to record customer names and contact phone details.',
    steps: [
      {
        title: 'Step 1: Identify Actors and Procedures',
        instruction: 'Establish the core actors in the PetVax workspace: Veterinarians, Receptionists, and Pet Owners. Note their primary procedural interactions with database files.'
      },
      {
        title: 'Step 2: Define Transaction Inputs',
        instruction: 'Document what inputs are captured when a Pet is brought in for a vaccine: Owner contact information, Pet breed, and Treatment date.'
      }
    ]
  },
  {
    id: 'lab2',
    title: 'Lab 2: Dealing with Spreadsheet Limits',
    subtitle: 'Raw Data and the Limits of Flat Files',
    difficulty: 'Beginner',
    estMinutes: 25,
    objective: 'Explore a flat Excel spreadsheet of PetVax transactions and note standard problems: record redundancies, blank fields, and spelling conflicts.',
    startingCode: `-- Excel data import clean-up simulation
-- Write query script checking for duplicate pet entries
-- inside a simulated raw flat spreadsheet log.

SELECT pet_name, COUNT(*) 
FROM RawSpreadsheetImport 
GROUP BY pet_name 
HAVING COUNT(*) > 1;
`,
    solutionCommand: 'RawSpreadsheetImport',
    exerciseType: 'sql',
    validationKeyword: 'having count',
    hint: 'Ensure that you keep the HAVING COUNT(*) aggregation check to list duplicate names in flat file registers.',
    steps: [
      {
        title: 'Step 1: Redundancy Audit',
        instruction: 'Analyze how entering multiple pet visits in a single row repeats owner telephone records and triggers data redundancy.'
      },
      {
        title: 'Step 2: Inconsistency Trace',
        instruction: 'Find spelling mismatches across vaccine names in a spreadsheet row (e.g., "Rabies" vs "rabies vax") and identify the resulting anomalies.'
      }
    ]
  },
  {
    id: 'lab3',
    title: 'Lab 3: Data Types & Measurement Scales',
    subtitle: 'Data Types and Measurement Levels',
    difficulty: 'Beginner',
    estMinutes: 30,
    objective: 'Classify PetVax clinical attributes (e.g. Pet ID, Breed weight, Treatment cost) using scales: nominal, ordinal, interval, and ratio.',
    startingCode: `-- Classifying clinical attributes
-- Assign database columns with accurate primitive types
-- (INTEGER, TEXT, REAL) and note measurement scales.

CREATE TABLE Pets (
  pet_id INTEGER PRIMARY KEY, -- Nominal
  pet_name TEXT,              -- Nominal
  weight_lbs REAL             -- Ratio representation
);
`,
    solutionCommand: 'CREATE TABLE Pets',
    exerciseType: 'schema',
    validationKeyword: 'real',
    hint: 'Make sure you define key numeric measurements (like weight) using REAL or DECIMAL types to handle decimals.',
    steps: [
      {
        title: 'Step 1: Metric Scale Categorization',
        instruction: 'Map Pet attributes to nominal (e.g., pet name), ordinal (e.g., severity scale of sickness), and ratio (e.g., numeric weight) categories.'
      },
      {
        title: 'Step 2: Choose Typed Representations',
        instruction: 'Select matching SQL column definitions: INTEGER for primary key flags, TEXT for alphabetic breed categories, and REAL for numeric weight metrics.'
      }
    ]
  },
  {
    id: 'lab4',
    title: 'Lab 4: Spreadsheet to Tables',
    subtitle: 'Extracting Relational Entities',
    difficulty: 'Beginner',
    estMinutes: 30,
    objective: 'Refactor flat spreadsheet structures by separating data into distinct tables: Owners, Pets, Visits, Treatments, and Invoices.',
    startingCode: `-- Normalization pre-planning layout
-- Create separate parent-child records
-- and bind matching Primary Key connections.

CREATE TABLE Owners (
  owner_id INTEGER PRIMARY KEY,
  email TEXT UNIQUE NOT NULL
);

CREATE TABLE Pets (
  pet_id INTEGER PRIMARY KEY,
  owner_id INTEGER,
  pet_name TEXT,
  FOREIGN KEY(owner_id) REFERENCES Owners(owner_id)
);
`,
    solutionCommand: 'REFERENCES Owners',
    exerciseType: 'schema',
    validationKeyword: 'foreign key',
    hint: 'Add a FOREIGN KEY condition block referencing Owners to model the One-to-Many connection.',
    steps: [
      {
        title: 'Step 1: Entity Separation',
        instruction: 'Separate high-level customer details (e.g. phone) from medical records to prevent duplicated information.'
      },
      {
        title: 'Step 2: Primary Key Assignments',
        instruction: 'Assign unique surrogate ID numbers to act as the primary keys for key business tables.'
      }
    ]
  },
  {
    id: 'lab5',
    title: 'Lab 5: Building a Relational Schema',
    subtitle: 'Building the First Relational Database',
    difficulty: 'Intermediate',
    estMinutes: 35,
    objective: 'Create a database in Microsoft Access. Define tables, assign primary and foreign keys, and configure referential integrity.',
    startingCode: `-- SQL schema model creation script
-- Create the main transaction records table (Visits)
-- linking both Owner, Pet, and Invoice keys.

CREATE TABLE Visits (
  visit_id INTEGER PRIMARY KEY,
  pet_id INTEGER,
  visit_date DATE,
  notes TEXT,
  FOREIGN KEY(pet_id) REFERENCES Pets(pet_id)
);
`,
    solutionCommand: 'REFERENCES Pets',
    exerciseType: 'schema',
    validationKeyword: 'references',
    hint: 'Make sure your child tables link back to parent primary keys using correct REFERENCES attributes.',
    steps: [
      {
        title: 'Step 1: Parent-Child Hierarchy Design',
        instruction: 'Design database tables in the logical sequence of relationships: create parent tables (Owners) before child tables (Pets).'
      },
      {
        title: 'Step 2: Configure Constraints',
        instruction: 'Add referential integrity constraints to prevent deleting an Owner while they have active Pet medical records.'
      }
    ]
  },
  {
    id: 'lab6',
    title: 'Lab 6: Querying Vet Clinic Data',
    subtitle: 'Analyzing Clinics with SQL Joins',
    difficulty: 'Intermediate',
    estMinutes: 40,
    objective: 'Write SQL statements to query PetVax tables, calculating pet counts, breed tallies, and owners with matching records.',
    startingCode: `-- Querying PetVax Data
-- Write a SELECT statement joining Owners and Pets.
-- Return the list of owner names and their corresponding pet names.

SELECT Owners.last_name, Pets.pet_name
FROM Owners
INNER JOIN Pets ON Owners.owner_id = Pets.owner_id;
`,
    solutionCommand: 'INNER JOIN Pets',
    exerciseType: 'sql',
    validationKeyword: 'last_name',
    hint: 'Use active JOIN commands to connect Owners with their Pets on the matching owner_id key.',
    steps: [
      {
        title: 'Step 1: Connect tables with JOIN',
        instruction: 'Use standard INNER JOIN statements to link different tables on positive primary key values.'
      },
      {
        title: 'Step 2: Retrieve records with SELECT',
        instruction: 'Project specific columns (e.g. owner last name) to keep your query response clean and lightweight.'
      }
    ]
  },
  {
    id: 'lab7',
    title: 'Lab 7: Aggregation & Financial metrics',
    subtitle: 'Aggregation and Business Metrics',
    difficulty: 'Intermediate',
    estMinutes: 35,
    objective: 'Query financials in PetVax. Compute the sum of treatments, average checkups, and count visits over consecutive dates.',
    startingCode: `-- Financial aggregate reporting
-- Calculate total revenue generated from medical procedures.
-- List total treatment costs grouped by animal breed.

SELECT breed, SUM(cost) AS total_revenue
FROM Treatments
GROUP BY breed;
`,
    solutionCommand: 'SUM(cost)',
    exerciseType: 'sql',
    validationKeyword: 'group by',
    hint: 'Whenever you use aggregate calculations like SUM, remember to include the referenced non-aggregate columns in your GROUP BY clause.',
    steps: [
      {
        title: 'Step 1: Compute cumulative values',
        instruction: 'Use mathematical aggregations like SUM, COUNT, and AVG to summarize business values.'
      },
      {
        title: 'Step 2: Filter results with GROUP BY',
        instruction: 'Group results by categorical columns to generate useful summary totals for management.'
      }
    ]
  },
  {
    id: 'lab8',
    title: 'Lab 8: Conditional Logic & Advanced Filters',
    subtitle: 'Advanced SQL Logic',
    difficulty: 'Intermediate',
    estMinutes: 45,
    objective: 'Write database queries using conditional CASE statements to flags cats as "Senior" or "Young" base on calendar ages.',
    startingCode: `-- Conditional animal classifications
-- Write a CASE expression to group pets by age:
-- If age > 8 then 'Senior', else 'Junior'.

SELECT pet_name, age,
  CASE 
    WHEN age > 8 THEN 'Senior'
    ELSE 'Junior'
  END AS clinical_category
FROM Pets;
`,
    solutionCommand: 'WHEN age > 8',
    exerciseType: 'sql',
    validationKeyword: 'clinical_category',
    hint: 'Use correct the CASE structure (WHEN ... THEN ...) and name the column using an AS label.',
    steps: [
      {
        title: 'Step 1: Compose branches with CASE',
        instruction: 'Implement business classification rules directly in SQL using the CASE expression.'
      },
      {
        title: 'Step 2: Set fallback conditions',
        instruction: 'Add an ELSE condition to handle alternative cases and prevent null values in your results.'
      }
    ]
  },
  {
    id: 'lab9',
    title: 'Lab 9: Entity Relation Modeling',
    subtitle: 'Full Clinic ERD Modeling',
    difficulty: 'Intermediate',
    estMinutes: 40,
    objective: 'Design a comprehensive physical ERD for PetVax, showing optionality, relationships, and keys in Lucidchart.',
    startingCode: `-- ERD Logical layout draft mapping
-- List tables, primary keys (PK), and foreign keys (FK)
-- to construct a clear relational system blueprint.

-- TABLE: Owner (id PK, name, phone)
-- TABLE: Pet (id PK, o_id FK, name, breed)
-- TABLE: Vet (id PK, name, specialty)
`,
    solutionCommand: 'TABLE: Pet',
    exerciseType: 'schema',
    validationKeyword: 'fk',
    hint: 'Be sure to identify foreign key mapping lines (FK) properly when creating entity blueprints.',
    steps: [
      {
        title: 'Step 1: Map Entities and Attributes',
        instruction: 'Draw logical entities for owners, veterinarian details, medicine stocks, and clinical visits.'
      },
      {
        title: 'Step 2: Define Cardinality and Optionality',
        instruction: 'Draw relationship connectors following Crow\'s Foot notation to show One-to-Many bounds.'
      }
    ]
  },
  {
    id: 'lab10',
    title: 'Lab 10: Schema Normalization & Cleanup',
    subtitle: 'Normalization and Schema Refinement',
    difficulty: 'Intermediate',
    estMinutes: 40,
    objective: 'Trace database anomalies and refactor multi-value cells into 3NF. Remove transitive dependencies from clinic files.',
    startingCode: `-- Fixing redundant columns and duplicates
-- Identify transitive dependencies (like vet phone depending on vet name)
-- and split them into separate tables.

CREATE TABLE Veterinarians (
  vet_id INTEGER PRIMARY KEY,
  vet_name TEXT,
  phone TEXT
);
`,
    solutionCommand: 'CREATE TABLE Veterinarians',
    exerciseType: 'schema',
    validationKeyword: 'phone',
    hint: 'Make sure non-key columns depend solely on the primary key, avoiding transitive dependencies.',
    steps: [
      {
        title: 'Step 1: Audit normal forms',
        instruction: 'Check if any multi-valued cells violate 1NF, or if composite keys trigger partial dependencies.'
      },
      {
        title: 'Step 2: Remove Transitive Dependencies',
        instruction: 'Isolate transitive attributes into their own tables to normalize the schema to 3NF.'
      }
    ]
  },
  {
    id: 'lab11',
    title: 'Lab 11: Production Table Constraints',
    subtitle: 'Constraints and Data Quality',
    difficulty: 'Advanced',
    estMinutes: 45,
    objective: 'Create tables in Supabase (PostgreSQL). Configure constraints (CHECK weights > 0, NOT NULL emails, UNIQUE phone).',
    startingCode: `-- Custom constraint declarations
-- Define the customer table with strong database audits
-- to block invalid values before writes occur.

CREATE TABLE Customers (
  cust_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  CHECK (LENGTH(email) > 5)
);
`,
    solutionCommand: 'CHECK (LENGTH(email)',
    exerciseType: 'schema',
    validationKeyword: 'unique',
    hint: 'Include UNIQUE and NOT NULL constraints to ensure data consistency.',
    steps: [
      {
        title: 'Step 1: Enforce attribute rules',
        instruction: 'Add NOT NULL and UNIQUE constraints to prevent missing or duplicate customer rows.'
      },
      {
        title: 'Step 2: Leverage CHECK assertions',
        instruction: 'Use CHECK constraints to ensure numeric clinic values (like weights and costs) are valid.'
      }
    ]
  },
  {
    id: 'lab12',
    title: 'Lab 12: Creating Views for Clinic Reports',
    subtitle: 'Views and Reporting Layers',
    difficulty: 'Advanced',
    estMinutes: 40,
    objective: 'Write SQL statements to create reporting views: MonthRevenue, OwnerBillingOverview, and PatientGeneralSummary.',
    startingCode: `-- Composing Reporting Views
-- Compile an SQL select query and save it using 
-- the CREATE VIEW command for reusable reporting.

CREATE VIEW MonthlyRevenueSummary AS
SELECT DATE_TRUNC('month', visit_date) AS month, SUM(cost) AS total
FROM PetVisits
GROUP BY month;
`,
    solutionCommand: 'CREATE VIEW',
    exerciseType: 'sql',
    validationKeyword: 'group by',
    hint: 'Always package your complex JOIN queries into clean virtual Views to simplify reporting tasks.',
    steps: [
      {
        title: 'Step 1: Create reusable Views',
        instruction: 'Combine multiple join operations and save the results as a database View.'
      },
      {
        title: 'Step 2: Query views like regular tables',
        instruction: 'Expose the reporting view to your dashboards, avoiding raw table security risks.'
      }
    ]
  },
  {
    id: 'lab13',
    title: 'Lab 13: Transaction Safeguards',
    subtitle: 'Transactions and Reliability',
    difficulty: 'Advanced',
    estMinutes: 50,
    objective: 'Enforce database reliability. Use BEGIN, COMMIT, and ROLLBACK transactions to make sure invoices generate only if visits save.',
    startingCode: `-- Transaction processing checks
-- Rollback incomplete clinic changes 
-- to keep parent-child tables balanced.

BEGIN TRANSACTION;
INSERT INTO Invoices (visit_id, amount) VALUES (10, 120.00);
-- If verification fails:
ROLLBACK;
`,
    solutionCommand: 'BEGIN TRANSACTION',
    exerciseType: 'sql',
    validationKeyword: 'rollback',
    hint: 'Wrap multiple related INSERT commands in a single transaction to guarantee data integrity.',
    steps: [
      {
        title: 'Step 1: Package database changes',
        instruction: 'Group dependent insert commands within transaction blocks to prevent inconsistent states.'
      },
      {
        title: 'Step 2: Commit or Rollback safely',
        instruction: 'Apply ROLLBACK to undo changes if any step fails, keeping database files pristine.'
      }
    ]
  },
  {
    id: 'lab14',
    title: 'Lab 14: Analyzing Performance Indexes',
    subtitle: 'Performance and Indexing',
    difficulty: 'Advanced',
    estMinutes: 45,
    objective: 'Speed up query execution. Add database Indexes on foreign keys and evaluate query runtime differences.',
    startingCode: `-- Tuning query speeds
-- Pin search columns and add lookup indices
-- using the CREATE INDEX statement.

CREATE INDEX idx_pet_breed ON Pets(breed);
`,
    solutionCommand: 'CREATE INDEX',
    exerciseType: 'sql',
    validationKeyword: 'idx_pet_breed',
    hint: 'Add an index on columns that are frequently used in JOIN or WHERE clauses to speed up query execution.',
    steps: [
      {
        title: 'Step 1: Find query bottlenecks',
        instruction: 'Identify slow table scans on columns frequently used in filter and sort operations.'
      },
      {
        title: 'Step 2: Build Lookup Indexes',
        instruction: 'Add database indexes on the highest-traffic join columns to speed up retrieval speeds.'
      }
    ]
  },
  {
    id: 'lab15',
    title: 'Lab 15: Data Wisdom Strategy',
    subtitle: 'Strategic Capstone Presentation',
    difficulty: 'Advanced',
    estMinutes: 50,
    objective: 'Combine your database models, SQL reporting views, and dashboard views into a presentation on business performance.',
    startingCode: `-- Practical database integration challenge
-- Build a final view summarizing business performance,
-- combining treatments and patient metrics.

CREATE VIEW StrategicClinicGrowth AS
SELECT count(visit_id) AS annual_visits, avg(amount) AS average_bill
FROM PatientBillingRecords;
`,
    solutionCommand: 'CREATE VIEW',
    exerciseType: 'sql',
    validationKeyword: 'annual_visits',
    hint: 'Present performance metrics (like annual visit counts) in a single summary View.',
    steps: [
      {
        title: 'Step 1: Model strategic metrics',
        instruction: 'Combine operations and billing tables in a unified business report.'
      },
      {
        title: 'Step 2: Deliver insights to management',
        instruction: 'Help managers make data-driven decisions that improve business performance.'
      }
    ]
  }
];
