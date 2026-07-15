import { useMemo, useState } from 'react';
import type { BookChapter, BookLab, BookPage } from '../types';

interface ActivityDashboardProps {
  chapters: BookChapter[];
  pages: BookPage[];
  labs: BookLab[];
  onOpenPage: (page: BookPage) => void;
  onOpenLab: (lab: BookLab) => void;
}

type SortKey = 'chapter' | 'pages' | 'words' | 'media' | 'activities';

const SECTION_WEIGHTS: Record<string, number> = {
  introduction: 1,
  'core-concepts': 2,
  'lets-build': 3,
  'review-questions': 4,
  'readiness-assessment': 5,
  terms: 6,
};

function countMatches(value: string, pattern: RegExp) {
  return value.match(pattern)?.length ?? 0;
}

function wordCount(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function sectionWeight(slug: string) {
  return SECTION_WEIGHTS[slug] ?? 9;
}

export default function ActivityDashboard({ chapters, pages, labs, onOpenPage, onOpenLab }: ActivityDashboardProps) {
  const [query, setQuery] = useState('');
  const [activeSection, setActiveSection] = useState('all');
  const [sortKey, setSortKey] = useState<SortKey>('chapter');

  const analytics = useMemo(() => {
    const livePages = pages.filter(page => page.exists);
    const chapterRows = chapters.map(chapter => {
      const chapterPages = livePages.filter(page => page.chapterId === chapter.id);
      const content = chapterPages.map(page => page.content).join('\n');
      const chapterLabs = labs.filter(lab => lab.folderName === chapter.folderName && lab.exists);
      return {
        id: chapter.id,
        title: chapter.title,
        pages: chapterPages.length,
        sections: chapter.sections.filter(section => section.exists).length,
        missingSections: chapter.sections.filter(section => !section.exists).length,
        words: wordCount(content),
        images: countMatches(content, /!\[[^\]]*\]\([^)]*\)|<img\b/gi),
        videos: countMatches(content, /youtube\.com\/embed|youtu\.be\//gi),
        callouts: countMatches(content, /class=["'][^"']*callout|<aside\b/gi),
        questions: countMatches(content, /\?/g),
        sqlMentions: countMatches(content, /\bSQL\b|SELECT\s+|CREATE\s+TABLE/gi),
        labCount: chapterLabs.length,
        firstPage: chapterPages[0],
      };
    });

    const sectionRows = chapters.flatMap(chapter => chapter.sections.map(section => {
      const sectionPages = livePages.filter(page => page.sectionId === section.id);
      const content = sectionPages.map(page => page.content).join('\n');
      return {
        id: section.id,
        chapterId: chapter.id,
        title: section.title,
        slug: section.slug,
        pages: sectionPages.length,
        words: wordCount(content),
        activities: countMatches(content, /(^|\n)\s*(\d+\.|[-*])\s+|\btask\b|\bactivity\b|\bexercise\b/gi),
      };
    }));

    const totals = chapterRows.reduce((acc, row) => ({
      pages: acc.pages + row.pages,
      words: acc.words + row.words,
      images: acc.images + row.images,
      videos: acc.videos + row.videos,
      callouts: acc.callouts + row.callouts,
      questions: acc.questions + row.questions,
      sqlMentions: acc.sqlMentions + row.sqlMentions,
      missingSections: acc.missingSections + row.missingSections,
    }), { pages: 0, words: 0, images: 0, videos: 0, callouts: 0, questions: 0, sqlMentions: 0, missingSections: 0 });

    return { chapterRows, sectionRows, totals };
  }, [chapters, pages, labs]);

  const sectionOptions = useMemo(() => ['all', ...Array.from(new Set(analytics.sectionRows.map(row => row.title)))], [analytics.sectionRows]);
  const maxWords = Math.max(...analytics.chapterRows.map(row => row.words), 1);

  const filteredChapters = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return analytics.chapterRows
      .filter(row => !needle || `${row.id} ${row.title}`.toLowerCase().includes(needle))
      .filter(row => activeSection === 'all' || analytics.sectionRows.some(section => section.chapterId === row.id && section.title === activeSection && section.pages > 0))
      .sort((a, b) => {
        if (sortKey === 'chapter') return a.id.localeCompare(b.id);
        if (sortKey === 'media') return (b.images + b.videos) - (a.images + a.videos);
        if (sortKey === 'activities') return (b.questions + b.callouts + b.sqlMentions) - (a.questions + a.callouts + a.sqlMentions);
        return b[sortKey] - a[sortKey];
      });
  }, [activeSection, analytics.chapterRows, analytics.sectionRows, query, sortKey]);

  const topPages = useMemo(() => pages
    .filter(page => page.exists)
    .map(page => ({ page, score: countMatches(page.content, /\?|\btask\b|\bactivity\b|\bSQL\b|SELECT\s+/gi) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6), [pages]);

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <p className="eyebrow">Textbook database activity center</p>
        <h1>Interactive dashboard for book content, labs, media, and learning activity</h1>
        <p>
          Explore the generated reader data as a living textbook database: chapter coverage, page volume,
          lab availability, embedded media, callouts, SQL emphasis, and question-heavy activity areas.
        </p>
      </section>

      <section className="metric-grid" aria-label="Textbook database summary metrics">
        <Metric label="Chapters" value={chapters.length} detail={`${analytics.totals.missingSections} missing sections flagged`} />
        <Metric label="Reader pages" value={analytics.totals.pages} detail="Generated from chapter Markdown" />
        <Metric label="Words" value={analytics.totals.words.toLocaleString()} detail="Approximate instructional volume" />
        <Metric label="Labs" value={labs.filter(lab => lab.exists).length} detail={`${labs.length} lab records indexed`} />
        <Metric label="Media" value={analytics.totals.images + analytics.totals.videos} detail={`${analytics.totals.images} images · ${analytics.totals.videos} videos`} />
        <Metric label="Activity signals" value={analytics.totals.questions + analytics.totals.callouts + analytics.totals.sqlMentions} detail="Questions, callouts, and SQL mentions" />
      </section>

      <section className="dashboard-controls" aria-label="Dashboard filters">
        <label>
          Search chapters
          <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Try ch07, SQL, analytics..." />
        </label>
        <label>
          Section coverage
          <select value={activeSection} onChange={event => setActiveSection(event.target.value)}>
            {sectionOptions.map(option => <option key={option} value={option}>{option === 'all' ? 'All sections' : option}</option>)}
          </select>
        </label>
        <label>
          Sort by
          <select value={sortKey} onChange={event => setSortKey(event.target.value as SortKey)}>
            <option value="chapter">Chapter order</option>
            <option value="pages">Reader pages</option>
            <option value="words">Word count</option>
            <option value="media">Media count</option>
            <option value="activities">Activity signals</option>
          </select>
        </label>
      </section>

      <section className="dashboard-layout">
        <div className="dashboard-card wide-card">
          <div className="card-heading"><h2>Chapter activity map</h2><span>{filteredChapters.length} chapters shown</span></div>
          <div className="chapter-bars">
            {filteredChapters.map(row => (
              <button key={row.id} className="chapter-bar" onClick={() => row.firstPage && onOpenPage(row.firstPage)}>
                <span className="bar-label"><strong>{row.id.toUpperCase()}</strong> {row.title}</span>
                <span className="bar-track"><span style={{ width: `${Math.max(4, (row.words / maxWords) * 100)}%` }} /></span>
                <span className="bar-meta">{row.pages} pages · {row.words.toLocaleString()} words · {row.images + row.videos} media</span>
              </button>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-heading"><h2>Section mix</h2><span>pages</span></div>
          <div className="section-pills">
            {analytics.sectionRows
              .filter(row => row.pages > 0)
              .sort((a, b) => sectionWeight(a.slug) - sectionWeight(b.slug) || a.chapterId.localeCompare(b.chapterId))
              .slice(0, 18)
              .map(row => <span key={row.id}>{row.chapterId.toUpperCase()} · {row.title} <strong>{row.pages}</strong></span>)}
          </div>
        </div>
      </section>

      <section className="dashboard-layout">
        <div className="dashboard-card">
          <div className="card-heading"><h2>High-activity pages</h2><span>open in reader</span></div>
          <div className="action-list">
            {topPages.map(({ page, score }) => (
              <button key={page.id} onClick={() => onOpenPage(page)}>
                <span>{page.chapterId.toUpperCase()} · {page.sectionTitle}</span>
                <strong>{page.title}</strong>
                <em>{score} activity signals</em>
              </button>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-heading"><h2>Lab database</h2><span>{labs.length} records</span></div>
          <div className="action-list compact-list">
            {labs.slice(0, 8).map(lab => (
              <button key={lab.id} onClick={() => onOpenLab(lab)}>
                <span>{lab.id.replace('lab-', 'Lab ')}</span>
                <strong>{lab.title}</strong>
                <em>{lab.exists ? 'available' : 'missing source'}</em>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string | number; detail: string }) {
  return (
    <article className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{detail}</em>
    </article>
  );
}
