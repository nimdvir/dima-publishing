import type { BookChapter } from "../types";

type SidebarProps = {
  chapters: BookChapter[];
  activeChapterId: string;
  activeSectionId: string;
  expandedChapterIds: Set<string>;
  onToggleChapter: (chapterId: string) => void;
  onSelectSection: (chapterId: string, sectionId: string) => void;
};

export function Sidebar({
  chapters,
  activeChapterId,
  activeSectionId,
  expandedChapterIds,
  onToggleChapter,
  onSelectSection,
}: SidebarProps) {
  return (
    <nav className="chapter-nav" aria-label="Book chapters">
      <h2>Contents</h2>
      <ol>
        {chapters.map((chapter) => {
          const isOpen = expandedChapterIds.has(chapter.id);
          const isActiveChapter = chapter.id === activeChapterId;
          return (
            <li key={chapter.id} className={isActiveChapter ? "active-chapter" : undefined}>
              <div className="chapter-row">
                <button
                  type="button"
                  className="chapter-toggle"
                  aria-expanded={isOpen}
                  onClick={() => onToggleChapter(chapter.id)}
                >
                  <span aria-hidden>{isOpen ? "-" : "+"}</span>
                  <span className="sr-only">{isOpen ? "Collapse" : "Expand"} {chapter.title}</span>
                </button>
                <button
                  type="button"
                  className="chapter-title-button"
                  onClick={() => onSelectSection(chapter.id, chapter.sections[0]?.id ?? "")}
                >
                  {chapter.title}
                </button>
              </div>
              {isOpen && (
                <ol className="section-list">
                  {chapter.sections.map((section) => (
                    <li key={section.id}>
                      <button
                        type="button"
                        className={section.id === activeSectionId ? "active-section" : undefined}
                        onClick={() => onSelectSection(chapter.id, section.id)}
                        aria-current={section.id === activeSectionId ? "page" : undefined}
                      >
                        <span>{section.title}</span>
                        {!section.exists && <span className="missing-dot" aria-label="Missing source">!</span>}
                      </button>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
