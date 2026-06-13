export interface CourseOutlineItem {
  chapter: string;
  title: string;
  subtitle: string;
  focus: string;
}

export const COURSE_OUTLINE: CourseOutlineItem[] = [
  {
    chapter: '01',
    title: 'Introduction to the Textbook',
    subtitle: 'Orientation to the book and the journey from data to decision',
    focus: 'The course promise, learning arc, tools, projects, and habits for success.',
  },
  {
    chapter: '02',
    title: 'Foundations of Information Systems',
    subtitle: 'How data drives business performance',
    focus: 'DIKW, R.E.A.D., information systems, KPIs, and strategic alignment.',
  },
  {
    chapter: '03',
    title: 'Understanding Data Fundamentals',
    subtitle: 'The foundation of every database, query, and decision',
    focus: 'Data types, metadata, quality, governance, ethics, and structured thinking.',
  },
  {
    chapter: '04',
    title: 'Introduction to Databases',
    subtitle: 'From spreadsheets to structured systems',
    focus: 'DBMS concepts, tables, keys, constraints, and why flat files break down.',
  },
  {
    chapter: '05',
    title: 'SQL: The Language of Databases',
    subtitle: 'How structured queries transform stored data into business insight',
    focus: 'Creating, inserting, filtering, joining, grouping, and calculating with SQL.',
  },
  {
    chapter: '06',
    title: 'The Relational Model',
    subtitle: 'How connected tables replace redundancy with structure',
    focus: 'Relationships, keys, integrity, relational reasoning, and connected data.',
  },
  {
    chapter: '07',
    title: 'Data Normalization',
    subtitle: 'Designing tables that reduce redundancy and protect meaning',
    focus: 'Functional dependencies, normal forms, and cleaner database design.',
  },
  {
    chapter: '08',
    title: 'Midterm Review: Concepts',
    subtitle: 'A checkpoint across foundations, data, databases, and SQL',
    focus: 'Integrated review of the first half of the book and its core concepts.',
  },
  {
    chapter: '09',
    title: 'Database Design and ER Modeling',
    subtitle: 'Turning business requirements into reliable information systems',
    focus: 'Entities, attributes, relationships, cardinality, ERDs, and design choices.',
  },
  {
    chapter: '10',
    title: 'Advanced SQL for Business Analysis',
    subtitle: 'Writing queries that support deeper analytical work',
    focus: 'Advanced joins, subqueries, CTEs, window logic, and business analysis patterns.',
  },
  {
    chapter: '11',
    title: 'Database Administration',
    subtitle: 'Protecting, maintaining, and governing database systems',
    focus: 'Security, backup, performance, permissions, transactions, and reliability.',
  },
  {
    chapter: '12',
    title: 'Business Intelligence and Analytics',
    subtitle: 'Using data to improve performance',
    focus: 'BI workflows, dashboards, dimensional thinking, and performance analysis.',
  },
  {
    chapter: '13',
    title: 'Advanced Database Techniques',
    subtitle: 'Extending database work beyond the basics',
    focus: 'Automation, integration, advanced structures, and modern database capabilities.',
  },
  {
    chapter: '14',
    title: 'Power BI, Microsoft Access, and Business Reporting',
    subtitle: 'Turning database outputs into usable reports',
    focus: 'Access reporting, Power BI dashboards, DAX, and communication for decisions.',
  },
  {
    chapter: '15',
    title: 'Business Strategy and Information Systems',
    subtitle: 'Aligning data, technology, and competitive advantage',
    focus: 'Strategy frameworks, KPIs, analytics, and information systems as strategic assets.',
  },
  {
    chapter: '16',
    title: 'Final Integration: Project, Test, and Course Synthesis',
    subtitle: 'From data to decisions in a full-cycle review',
    focus: 'Final project, assessment preparation, SQL guidance, and full-course synthesis.',
  },
  {
    chapter: '17',
    title: 'Designing Systems That Matter',
    subtitle: 'From technical skill to managerial judgment',
    focus: 'The complete learning journey, professional habits, ethics, and next steps.',
  },
];
