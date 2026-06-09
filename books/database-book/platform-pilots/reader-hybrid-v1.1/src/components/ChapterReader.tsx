import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { BookPage } from '../types';
import { extractHeadingToc } from '../utils/headings';
import MarkdownRenderer from './MarkdownRenderer';
import OnThisPage, { OnThisPageMobile } from './OnThisPage';
import BottomNavigation from './BottomNavigation';

interface ChapterReaderProps {
  page: BookPage;
  allPages: BookPage[];
  onNavigate: (page: BookPage) => void;
  hasPrev: boolean;
  hasNext: boolean;
  prevPage: BookPage | null;
  nextPage: BookPage | null;
  onPrev: () => void;
  onNext: () => void;
}

export default function ChapterReader({
  page,
  allPages,
  onNavigate,
  hasPrev,
  hasNext,
  prevPage,
  nextPage,
  onPrev,
  onNext,
}: ChapterReaderProps) {
  // Extract H2/H3 headings from the current page content for "On this page"
  const headings = useMemo(() => extractHeadingToc(page.content), [page.content]);
  const reducedMotion = useReducedMotion();

  return (
    <div className="chapter-reader">
      <motion.div
        key={page.id}
        className="reader-page-motion"
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.22, ease: 'easeOut' }}
      >
        {/* Reader header */}
        <div className="reader-header">
          <div className="reader-breadcrumb">
            <span className="breadcrumb-chapter">{page.chapterId.toUpperCase()}</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-section">{page.sectionTitle}</span>
          </div>
          <h2 className="reader-page-title">{page.title}</h2>
          <div className="reader-meta">
            {page.totalPages > 1 && (
              <span className="page-indicator">
                Page {page.pageNumber} of {page.totalPages}
              </span>
            )}
            <span className={`source-badge source-${page.sourceType}`}>
              {page.sourceType}
            </span>
          </div>
        </div>

        {/* Page tabs (if multi-page section) */}
        {allPages.length > 1 && (
          <div className="page-tabs">
            {allPages.map(p => (
              <button
                key={p.id}
                className={`page-tab ${p.id === page.id ? 'active' : ''}`}
                onClick={() => onNavigate(p)}
              >
                {p.pageNumber}
              </button>
            ))}
          </div>
        )}

        {/* Mobile: collapsible "On this page" above the article */}
        <OnThisPageMobile headings={headings} />

        {/* Reader body: main article + right-side "On this page" rail */}
        <div className="reader-body">
          <div className="reader-content">
            <MarkdownRenderer content={page.content} />
          </div>
          <OnThisPage headings={headings} />
        </div>

        {/* Bottom navigation */}
        <BottomNavigation
          hasPrev={hasPrev}
          hasNext={hasNext}
          prevPage={prevPage}
          nextPage={nextPage}
          onPrev={onPrev}
          onNext={onNext}
          onNavigate={onNavigate}
        />
      </motion.div>
    </div>
  );
}
