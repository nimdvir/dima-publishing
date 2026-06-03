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
    <nav className="sidebar-nav" aria-label="Chapters and sections">
      <ul className="chapter-list">
        {chapters.map((chapter) => {
          const isExpanded = expandedChapterIds.has(chapter.id);
          return (
            <li key={chapter.id} className="chapter-item">
              <button
                type="button"
                className="chapter-toggle"
                aria-expanded={isExpanded}
                onClick={() => onToggleChapter(chapter.id)}
              >
                <span className="chapter-toggle-icon" aria-hidden="true">
                  {isExpanded ? "▾" : "▸"}
                </span>
                <span className="chapter-toggle-title">{chapter.title}</span>
              </button>

              {isExpanded && (
                <ul className="section-list">
                  {chapter.sections.map((section) => {
                    const isActive =
                      chapter.id === activeChapterId &&
                      section.id === activeSectionId;
                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          className={`section-link${isActive ? " section-link-active" : ""}${!section.exists ? " section-link-missing" : ""}`}
                          aria-current={isActive ? "true" : undefined}
                          onClick={() =>
                            onSelectSection(chapter.id, section.id)
                          }
                        >
                          {section.title}
                          {!section.exists && (
                            <span className="section-missing-badge">
                              {" "}
                              (missing)
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
