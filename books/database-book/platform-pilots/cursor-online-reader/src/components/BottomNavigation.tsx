import type { FlatSection } from "../types";

type BottomNavigationProps = {
  previous: FlatSection | null;
  next: FlatSection | null;
  onNavigate: (chapterId: string, sectionId: string) => void;
};

export function BottomNavigation({
  previous,
  next,
  onNavigate,
}: BottomNavigationProps) {
  return (
    <nav className="bottom-nav" aria-label="Section navigation">
      {previous ? (
        <button
          type="button"
          className="bottom-nav-card bottom-nav-prev"
          onClick={() => onNavigate(previous.chapterId, previous.sectionId)}
          aria-label={`Previous: ${previous.chapterTitle}, ${previous.sectionTitle}`}
        >
          <span className="bottom-nav-label">Previous</span>
          <span className="bottom-nav-title">{previous.sectionTitle}</span>
          <span className="bottom-nav-chapter">{previous.chapterTitle}</span>
        </button>
      ) : (
        <div className="bottom-nav-card bottom-nav-disabled" aria-hidden="true">
          <span className="bottom-nav-label">Previous</span>
          <span className="bottom-nav-title">Start of book</span>
        </div>
      )}

      {next ? (
        <button
          type="button"
          className="bottom-nav-card bottom-nav-next"
          onClick={() => onNavigate(next.chapterId, next.sectionId)}
          aria-label={`Next: ${next.chapterTitle}, ${next.sectionTitle}`}
        >
          <span className="bottom-nav-label">Next</span>
          <span className="bottom-nav-title">{next.sectionTitle}</span>
          <span className="bottom-nav-chapter">{next.chapterTitle}</span>
        </button>
      ) : (
        <div className="bottom-nav-card bottom-nav-disabled" aria-hidden="true">
          <span className="bottom-nav-label">Next</span>
          <span className="bottom-nav-title">End of book</span>
        </div>
      )}
    </nav>
  );
}
