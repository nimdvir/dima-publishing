import type { BookPage } from '../types';

interface BottomNavigationProps {
  hasPrev: boolean;
  hasNext: boolean;
  prevPage: BookPage | null;
  nextPage: BookPage | null;
  onPrev: () => void;
  onNext: () => void;
  onNavigate: (page: BookPage) => void;
}

export default function BottomNavigation({
  hasPrev,
  hasNext,
  prevPage,
  nextPage,
  onPrev,
  onNext,
  onNavigate,
}: BottomNavigationProps) {
  return (
    <nav className="bottom-nav" aria-label="Page navigation">
      <div className="bottom-nav-inner">
        {hasPrev && prevPage ? (
          <button className="nav-card nav-prev" onClick={onPrev}>
            <span className="nav-direction">&#x2190; Previous</span>
            <span className="nav-title">{prevPage.title}</span>
            <span className="nav-context">
              {prevPage.chapterId.toUpperCase()} &middot; {prevPage.sectionTitle}
            </span>
          </button>
        ) : (
          <div className="nav-card nav-empty" />
        )}

        {hasNext && nextPage ? (
          <button className="nav-card nav-next" onClick={onNext}>
            <span className="nav-direction">Next &#x2192;</span>
            <span className="nav-title">{nextPage.title}</span>
            <span className="nav-context">
              {nextPage.chapterId.toUpperCase()} &middot; {nextPage.sectionTitle}
            </span>
          </button>
        ) : (
          <div className="nav-card nav-empty" />
        )}
      </div>
    </nav>
  );
}
