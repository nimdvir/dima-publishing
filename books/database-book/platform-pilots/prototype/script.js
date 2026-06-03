const chapterFileMap = {
  ch1: "ch01-introduction-to-course.html",
  ch2: "ch02-mis-and-bitm.html",
  ch3: "ch03-what-is-data.html",
  ch4: "ch04-databases.html",
  ch5: "ch05-sql.html",
  ch6: "ch06-relational-model.html",
  ch7: "ch07-normalization.html",
  ch8: "ch08-midterm-review.html",
  ch9: "ch09-advanced-sql-queries.html",
  ch10: "ch10-database-design.html",
  ch11: "ch11-database-administration.html",
  ch12: "ch12-business-intelligence.html",
  ch13: "ch13-advanced-database-techniques.html",
  ch14: "ch14-powerbi.html",
  ch15: "ch15-business-strategy-is.html",
  ch16: "ch16-final-review.html",
  ch17: "ch17-conclusion.html",
};

const chapterCatalog = [
  {
    id: "ch1",
    number: 1,
    title: "Introduction to the Textbook",
    subtitle: "Orientation to the Book and the Journey from Data to Decisions",
    description: "Frames the book as one connected path from data to decisions and introduces the course tools, projects, and learning arc.",
    status: "sample",
    progress: 82,
    readTime: "18 min",
    available: true,
  },
  {
    id: "ch2",
    number: 2,
    title: "Foundations of Information Systems",
    subtitle: "How data, systems, management, and performance fit together",
    description: "Shows why information systems matter, how data gains meaning, and why quality and interpretation shape business performance.",
    status: "sample",
    progress: 44,
    readTime: "22 min",
    available: true,
  },
  { id: "ch3", number: 3, title: "What Is Data", subtitle: "Placeholder chapter", description: "Placeholder for the data foundations chapter.", status: "placeholder", progress: 0, readTime: "16 min", available: false },
  { id: "ch4", number: 4, title: "Introduction to Databases", subtitle: "Placeholder chapter", description: "Placeholder for database foundations and structure.", status: "placeholder", progress: 0, readTime: "24 min", available: false },
  { id: "ch5", number: 5, title: "SQL", subtitle: "Placeholder chapter", description: "Placeholder for query language fundamentals.", status: "placeholder", progress: 0, readTime: "26 min", available: false },
  { id: "ch6", number: 6, title: "Relational Model", subtitle: "Placeholder chapter", description: "Placeholder for entities, keys, and relationships.", status: "placeholder", progress: 0, readTime: "21 min", available: false },
  { id: "ch7", number: 7, title: "Normalization", subtitle: "Placeholder chapter", description: "Placeholder for data integrity and structure refinement.", status: "placeholder", progress: 0, readTime: "19 min", available: false },
  { id: "ch8", number: 8, title: "Midterm Review", subtitle: "Placeholder chapter", description: "Placeholder for review and consolidation.", status: "placeholder", progress: 0, readTime: "15 min", available: false },
  { id: "ch9", number: 9, title: "Advanced SQL Queries", subtitle: "Placeholder chapter", description: "Placeholder for joins, subqueries, and analytical patterns.", status: "placeholder", progress: 0, readTime: "27 min", available: false },
  { id: "ch10", number: 10, title: "Database Design", subtitle: "Placeholder chapter", description: "Placeholder for design methods and modeling.", status: "placeholder", progress: 0, readTime: "23 min", available: false },
  { id: "ch11", number: 11, title: "Database Administration", subtitle: "Placeholder chapter", description: "Placeholder for security, maintenance, and governance.", status: "placeholder", progress: 0, readTime: "18 min", available: false },
  { id: "ch12", number: 12, title: "Business Intelligence", subtitle: "Placeholder chapter", description: "Placeholder for dashboards and reporting.", status: "placeholder", progress: 0, readTime: "20 min", available: false },
  { id: "ch13", number: 13, title: "Advanced Database Techniques", subtitle: "Placeholder chapter", description: "Placeholder for advanced platform topics.", status: "placeholder", progress: 0, readTime: "20 min", available: false },
  { id: "ch14", number: 14, title: "Power BI", subtitle: "Placeholder chapter", description: "Placeholder for visual analytics and storytelling.", status: "placeholder", progress: 0, readTime: "18 min", available: false },
  { id: "ch15", number: 15, title: "Business Strategy and Information Systems", subtitle: "Placeholder chapter", description: "Placeholder for strategy integration.", status: "placeholder", progress: 0, readTime: "17 min", available: false },
  { id: "ch16", number: 16, title: "Final Review", subtitle: "Placeholder chapter", description: "Placeholder for the closing review sequence.", status: "placeholder", progress: 0, readTime: "14 min", available: false },
  { id: "ch17", number: 17, title: "Conclusion", subtitle: "Placeholder chapter", description: "Placeholder for final synthesis and next steps.", status: "placeholder", progress: 0, readTime: "12 min", available: false },
];

const labCatalog = [
  {
    id: "lab-orientation",
    title: "Orientation and Workflow Check",
    relatedChapter: "Chapter 1",
    description: "Map the book's data-to-decisions arc and identify where each tool fits in the learning workflow.",
    estimate: "20 minutes",
    difficulty: "Introductory",
    status: "sample",
    href: "book/chapters/ch01-introduction-to-course.html",
  },
  {
    id: "lab-read-framework",
    title: "READ Framework Analysis",
    relatedChapter: "Chapter 2",
    description: "Classify business examples by representation, expression, association, and decision deployment.",
    estimate: "35 minutes",
    difficulty: "Foundational",
    status: "sample",
    href: "book/chapters/ch02-mis-and-bitm.html",
  },
  {
    id: "lab-data-audit",
    title: "Data Quality Audit",
    relatedChapter: "Chapter 3",
    description: "Placeholder lab for checking accuracy, completeness, timeliness, and consistency.",
    estimate: "40 minutes",
    difficulty: "Foundational",
    status: "placeholder",
    href: "locked.html",
  },
  {
    id: "lab-schema-walkthrough",
    title: "Database Structure Walkthrough",
    relatedChapter: "Chapter 4",
    description: "Placeholder lab for exploring tables, keys, and constraints.",
    estimate: "45 minutes",
    difficulty: "Intermediate",
    status: "placeholder",
    href: "locked.html",
  },
  {
    id: "lab-select-practice",
    title: "SELECT Practice Set",
    relatedChapter: "Chapter 5",
    description: "Placeholder lab for SQL query practice and interpretation.",
    estimate: "50 minutes",
    difficulty: "Intermediate",
    status: "placeholder",
    href: "locked.html",
  },
  {
    id: "lab-dashboard-brief",
    title: "Dashboard Recommendation Brief",
    relatedChapter: "Chapter 12",
    description: "Placeholder lab for translating analytical output into a management recommendation.",
    estimate: "60 minutes",
    difficulty: "Advanced",
    status: "placeholder",
    href: "locked.html",
  },
];

const readerSamples = {
  ch1: {
    label: "Chapter 1",
    title: "Introduction to the Textbook",
    subtitle: "Orientation to the Book and the Journey from Data to Decisions",
    progress: 82,
    readTime: "18 minute sample",
    sections: [
      {
        id: "orientation",
        nav: "Orientation",
        heading: "Orientation to the Book and the Journey from Data to Decisions",
        html: `
          <p>Welcome to <em>Using Data to Drive Business Performance: Databases and Management Information Systems</em>. The manuscript frames the book as a map for students who need to understand how information systems, databases, SQL, analytics, and business decisions connect.</p>
          <p>The core message in the Chapter 1 draft is that readers should not learn databases as disconnected technical terms. They should learn how data becomes structure, how structure supports analysis, and how analysis supports better decisions.</p>
          <div class="callout callout--gold">
            <strong>Key takeaway</strong>
            <p>The point of the course is not memorizing isolated terms. It is building systems thinking so students can see how data, structure, analysis, and decisions work together.</p>
          </div>
          <figure>
            <img src="assets/learning-arc.svg" alt="A five-step learning arc showing data flowing into tables, relationships, queries, analytics, and decisions">
            <figcaption>The prototype uses the book's central learning arc as a visual spine across pages.</figcaption>
          </figure>
        `,
      },
      {
        id: "why-this-book-exists",
        nav: "Why This Book Exists",
        heading: "Why This Book Exists",
        html: `
          <p>The Chapter 1 draft highlights three common student reactions: terms feel disconnected, SQL seems detached from business value, and databases can feel intimidating. The prototype treats those concerns as design requirements.</p>
          <p>That is why this reader uses strong wayfinding, plain chapter labels, and visible progress cues. The screen should reduce friction instead of making the book feel denser than it already is.</p>
        `,
      },
      {
        id: "competencies",
        nav: "Core Competencies",
        heading: "Five Core Competencies",
        html: `
          <table>
            <thead>
              <tr><th>Competency</th><th>What It Means</th></tr>
            </thead>
            <tbody>
              <tr><td>Foundational information literacy</td><td>Explain how data, databases, and systems support organizational decisions.</td></tr>
              <tr><td>Applied database management</td><td>Design and query relational data to answer realistic business questions.</td></tr>
              <tr><td>Strategic problem solving</td><td>Combine technical reasoning and business context to recommend action.</td></tr>
            </tbody>
          </table>
        `,
      },
      {
        id: "tool-ecosystem",
        nav: "Tool Ecosystem",
        heading: "The Tools You Will Use",
        html: `
          <p>The manuscript names a practical tool ecosystem: Access, SQL, SQLite, PostgreSQL or Supabase, spreadsheets, forms, diagramming tools, analytics environments, and companion materials. In the platform, those tools can become linked resources, callouts, and lab launch points.</p>
          <pre><code>Data -> Tables -> Relationships -> Queries -> Analytics -> Decisions</code></pre>
        `,
      },
    ],
  },
  ch2: {
    label: "Chapter 2",
    title: "Foundations of Information Systems",
    subtitle: "How data, systems, management, and performance fit together",
    progress: 44,
    readTime: "22 minute sample",
    sections: [
      {
        id: "why-information-systems-matter",
        nav: "Why Systems Matter",
        heading: "Why Information Systems Matter",
        html: `
          <p>Chapter 2 opens with a clear claim: every business activity leaves a data trail. Sales, shipments, website clicks, customer complaints, late assignments, hospital visits, and payment records all become inputs that organizations can observe.</p>
          <p>The draft then draws the larger distinction that matters for this prototype: data helps organizations observe activity, while information systems help them organize activity so managers can understand problems, evaluate options, and decide what to do next.</p>
          <div class="callout">
            <strong>Key idea</strong>
            <p>Data does not improve business performance by itself. Data becomes valuable when people use information systems to organize it, interpret it, and act on it.</p>
          </div>
          <figure>
            <img src="assets/system-map.svg" alt="A campus-style system map showing business activity becoming data, information, analysis, and decisions">
            <figcaption>A reader page can use diagrams to show how scattered activity becomes system-supported evidence.</figcaption>
          </figure>
        `,
      },
      {
        id: "from-raw-data-to-meaning",
        nav: "Raw Data to Meaning",
        heading: "From Raw Data to Meaning",
        html: `
          <p>The chapter draft emphasizes that data is made of raw observations, symbols, identifiers, measurements, and recorded facts. A value such as <code>42</code> means very little by itself until context explains what it represents and why it matters.</p>
          <p>That insight translates directly into the platform design. The reader should show headings, callouts, captions, and related labs so that information never sits without context.</p>
        `,
      },
      {
        id: "dikw-and-read",
        nav: "DIKW and READ",
        heading: "Data, Information, Knowledge, Wisdom, and the R.E.A.D. Framework",
        html: `
          <table>
            <thead>
              <tr><th>Stage</th><th>Guiding Question</th><th>Meaning</th></tr>
            </thead>
            <tbody>
              <tr><td>Data</td><td>What was recorded?</td><td>Raw observations, values, or facts.</td></tr>
              <tr><td>Information</td><td>What happened?</td><td>Data organized into a pattern or summary.</td></tr>
              <tr><td>Knowledge</td><td>Why is it happening?</td><td>Interpretation based on context and comparison.</td></tr>
              <tr><td>Wisdom</td><td>What should we do?</td><td>Judgment about action and consequences.</td></tr>
            </tbody>
          </table>
          <p>The same chapter introduces the R.E.A.D. framework as the work that moves organizations from stored records toward decisions. That concept is well-suited to sidebar summaries, progress markers, and lab links.</p>
        `,
      },
      {
        id: "sql-preview",
        nav: "SQL Preview",
        heading: "SQL Preview Box",
        html: `
          <p>Chapter 2 is conceptual, but the platform still needs to show how technical examples will look later in the book. This code block previews the visual treatment for SQL without pretending that the current chapter is a query tutorial.</p>
          <pre><code>SELECT deliverable_type,
       AVG(score) AS average_score,
       COUNT(*) AS records_count
FROM gradebook
GROUP BY deliverable_type
ORDER BY average_score DESC;</code></pre>
          <div class="callout callout--gold">
            <strong>Design note</strong>
            <p>Syntax highlighting can be added later. For the prototype, the important part is a readable academic presentation with generous spacing and clear contrast.</p>
          </div>
        `,
      },
      {
        id: "data-quality",
        nav: "Data Quality",
        heading: "Why Data Quality Matters",
        html: `
          <p>The chapter stresses four recurring quality dimensions: accuracy, completeness, timeliness, and consistency. That emphasis supports platform features such as definition callouts, glossary links, and companion labs that ask students to test data quality assumptions.</p>
        `,
      },
    ],
  },
};

function getChapterById(chapterId) {
  return chapterCatalog.find((chapter) => chapter.id === chapterId);
}

function getChapterHref(chapter) {
  if (!chapter) {
    return "locked.html";
  }
  const chapterFile = chapterFileMap[chapter.id];
  return chapterFile ? `book/chapters/${chapterFile}` : "locked.html";
}

function renderChapterCards() {
  document.querySelectorAll("[data-chapter-grid]").forEach((container) => {
    const mode = container.dataset.chapterGrid;
    const chapters = mode === "featured" ? chapterCatalog.slice(0, 4) : chapterCatalog;
    container.innerHTML = chapters.map((chapter) => {
      const chapterHref = getChapterHref(chapter);
      const hasGeneratedPage = chapterHref !== "locked.html";
      const actionLabel = hasGeneratedPage ? "Open chapter" : "Preview access";
      const statusLabel = hasGeneratedPage ? "HTML" : (chapter.status === "sample" ? "Sample" : "Placeholder");
      const statusClass = hasGeneratedPage ? "sample" : chapter.status;
      return `
        <article class="chapter-card">
          <div class="chapter-card__header">
            <div>
              <span class="chapter-card__label">Chapter ${chapter.number}</span>
              <h3>${chapter.title}</h3>
            </div>
            <span class="chapter-card__status status--${statusClass}">${statusLabel}</span>
          </div>
          <p>${chapter.description}</p>
          <div class="card-meta">
            <span class="chip">${chapter.readTime}</span>
            <span class="chip">${chapter.progress}% shown</span>
          </div>
          <a class="button ${hasGeneratedPage ? "button--primary" : ""}" href="${chapterHref}">${actionLabel}</a>
        </article>
      `;
    }).join("");
  });
}

function renderLabCards() {
  document.querySelectorAll("[data-lab-grid]").forEach((container) => {
    const mode = container.dataset.labGrid;
    const labs = mode === "dashboard" ? labCatalog.slice(0, 3) : labCatalog;
    container.innerHTML = labs.map((lab) => {
      const actionLabel = lab.status === "sample" ? "Open lab" : "Open placeholder";
      return `
        <article class="lab-card">
          <div class="lab-card__header">
            <div>
              <span class="lab-card__meta">${lab.relatedChapter}</span>
              <h3>${lab.title}</h3>
            </div>
            <span class="lab-card__status status--${lab.status}">${lab.status === "sample" ? "Sample" : "Placeholder"}</span>
          </div>
          <p>${lab.description}</p>
          <div class="card-meta">
            <span class="chip">${lab.estimate}</span>
            <span class="chip">${lab.difficulty}</span>
          </div>
          <a class="button ${lab.status === "sample" ? "button--primary" : ""}" href="${lab.href}">${actionLabel}</a>
        </article>
      `;
    }).join("");
  });
}

function buildPlaceholderReader(chapterId) {
  const chapter = getChapterById(chapterId) || chapterCatalog[0];
  return {
    label: `Chapter ${chapter.number}`,
    title: chapter.title,
    subtitle: "Placeholder chapter view",
    progress: 8,
    readTime: `${chapter.readTime} placeholder`,
    sections: [
      {
        id: "placeholder-overview",
        nav: "Overview",
        heading: "Placeholder screen for the broader textbook sequence",
        html: `
          <p>This chapter is represented as a placeholder in the static prototype. The card exists to show how the dashboard and reader will scale across the full textbook.</p>
          <div class="callout callout--gold">
            <strong>Prototype note</strong>
            <p>The reader can support deep links, progress, labs, and access checks later without changing the overall page structure.</p>
          </div>
        `,
      },
    ],
  };
}

function renderReader() {
  const readerRoot = document.querySelector("[data-reader]");
  if (!readerRoot) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const chapterId = params.get("chapter") || "ch2";
  const chapter = getChapterById(chapterId) || chapterCatalog[1];
  const sample = readerSamples[chapterId] || buildPlaceholderReader(chapterId);

  document.querySelector("[data-reader-label]").textContent = sample.label;
  document.querySelector("[data-reader-title]").textContent = sample.title;
  document.querySelector("[data-reader-subtitle]").textContent = sample.subtitle;
  document.querySelector("[data-reader-time]").textContent = sample.readTime;
  document.querySelector("[data-reader-sidebar-title]").textContent = `${sample.label}: ${sample.title}`;
  document.querySelector("[data-reader-progress-label]").textContent = `${sample.progress}%`;
  document.querySelector("[data-reader-progress-bar]").style.width = `${sample.progress}%`;

  const toc = document.querySelector("[data-reader-toc]");
  toc.innerHTML = sample.sections.map((section, index) => `
    <a href="#${section.id}">${index + 1}. ${section.nav}</a>
  `).join("");

  const miniCatalog = document.querySelector("[data-reader-mini-catalog]");
  miniCatalog.innerHTML = chapterCatalog.map((item) => `
    <a class="${item.id === chapter.id ? "is-current" : ""}" href="${getChapterHref(item)}">Chapter ${item.number}: ${item.title}</a>
  `).join("");

  const body = document.querySelector("[data-reader-body]");
  body.innerHTML = sample.sections.map((section, index) => `
    <section class="reader-section" id="${section.id}">
      <span class="reader-kicker">Section ${index + 1}</span>
      <h2>${section.heading}</h2>
      ${section.html}
    </section>
  `).join("");

  const chapterIndex = chapterCatalog.findIndex((item) => item.id === chapter.id);
  const previous = chapterIndex > 0 ? chapterCatalog[chapterIndex - 1] : null;
  const next = chapterIndex + 1 < chapterCatalog.length ? chapterCatalog[chapterIndex + 1] : null;

  const prevLink = document.querySelector("[data-prev-link]");
  const prevLabel = document.querySelector("[data-prev-label]");
  if (previous) {
    prevLink.href = getChapterHref(previous);
    prevLabel.textContent = `Chapter ${previous.number}: ${previous.title}`;
  } else {
    prevLink.href = "dashboard.html";
    prevLabel.textContent = "Dashboard";
  }

  const nextLink = document.querySelector("[data-next-link]");
  const nextLabel = document.querySelector("[data-next-label]");
  if (next) {
    nextLink.href = getChapterHref(next);
    nextLabel.textContent = `Chapter ${next.number}: ${next.title}`;
  } else {
    nextLink.href = "labs.html";
    nextLabel.textContent = "Labs";
  }
}

function setupSidebarToggle() {
  const button = document.querySelector("[data-sidebar-toggle]");
  const sidebar = document.querySelector("[data-reader-sidebar]");
  if (!button || !sidebar) {
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

function setupPrototypeNotice() {
  const notice = document.querySelector("[data-prototype-notice]");
  if (!notice) {
    return;
  }

  let timeoutId;
  document.querySelectorAll("[data-faux-action]").forEach((button) => {
    button.addEventListener("click", () => {
      notice.textContent = button.dataset.fauxAction;
      notice.classList.add("is-visible");
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        notice.classList.remove("is-visible");
      }, 2800);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderChapterCards();
  renderLabCards();
  renderReader();
  setupSidebarToggle();
  setupPrototypeNotice();
});
