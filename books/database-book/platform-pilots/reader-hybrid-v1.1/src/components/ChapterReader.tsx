import type { BookPage } from '../types';
import MarkdownRenderer from './MarkdownRenderer';
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
  return (
    <div className="chapter-reader">
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

      {/* Content */}
      <div className="reader-content">
        <MarkdownRenderer content={page.content} />
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
    </div>
  );
}
