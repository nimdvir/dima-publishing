import type { FlatSection } from "../types";

type BottomNavigationProps = {
  previous: FlatSection | null;
  next: FlatSection | null;
  onNavigate: (chapterId: string, sectionId: string) => void;
};

export function BottomNavigation({ previous, next, onNavigate }: BottomNavigationProps) {
  return (
    <nav className="bottom-nav" aria-label="Previous and next sections">
      <div>
        {previous && (
          <button type="button" onClick={() => onNavigate(previous.chapterId, previous.sectionId)}>
            <span>Previous</span>
            <strong>{previous.sectionTitle}</strong>
            <small>{previous.chapterTitle}</small>
          </button>
        )}
      </div>
      <div>
        {next && (
          <button type="button" onClick={() => onNavigate(next.chapterId, next.sectionId)}>
            <span>Next</span>
            <strong>{next.sectionTitle}</strong>
            <small>{next.chapterTitle}</small>
          </button>
        )}
      </div>
    </nav>
  );
}
