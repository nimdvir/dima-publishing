import { useEffect, useState } from "react";
import type { BookChapter, BookLab, BookPage, ReaderScope } from "../types";

type SidebarProps = {
  scope: ReaderScope;
  chapters: BookChapter[];
  labs: BookLab[];
  activePage: BookPage | null;
  activeLab: BookLab | null;
  onNavigateScope: (scope: ReaderScope) => void;
  onNavigatePage: (pageId: string) => void;
  onNavigateLab: (labId: string) => void;
};

export function Sidebar({
  scope,
  chapters,
  labs,
  activePage,
  activeLab,
  onNavigateScope,
  onNavigatePage,
  onNavigateLab,
}: SidebarProps) {
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!activePage) return;
    setExpandedChapters((current) => ({
      ...current,
      [activePage.chapterId]: true,
    }));
  }, [activePage]);

  function toggleChapter(chapterId: string) {
    setExpandedChapters((current) => ({
      ...current,
      [chapterId]: !current[chapterId],
    }));
  }

  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <nav className="scope-nav" aria-label="Reader scopes">
        <button className={scope === "welcome" ? "active" : ""} type="button" onClick={() => onNavigateScope("welcome")}>
          Home
        </button>
        <button className={scope === "book" ? "active" : ""} type="button" onClick={() => onNavigateScope("book")}>
          Book
        </button>
        <button className={scope === "labs" ? "active" : ""} type="button" onClick={() => onNavigateScope("labs")}>
          Labs
        </button>
        <button className={scope === "ai-assistant" ? "active" : ""} type="button" onClick={() => onNavigateScope("ai-assistant")}>
          AI Assistant
        </button>
        <button className={scope === "login" ? "active" : ""} type="button" onClick={() => onNavigateScope("login")}>
          Access
        </button>
      </nav>

      <div className="sidebar-section">
        <div className="sidebar-heading">
          <span>Chapters</span>
          <small>{chapters.length} loaded</small>
        </div>

        <div className="chapter-nav">
          {chapters.map((chapter) => {
            const isExpanded = expandedChapters[chapter.id] ?? chapter.id === activePage?.chapterId;
            const isActiveChapter = activePage?.chapterId === chapter.id;

            return (
              <section className="chapter-group" key={chapter.id}>
                <button
                  className={`chapter-toggle ${isActiveChapter ? "active" : ""}`}
                  type="button"
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <span>{chapter.id.toUpperCase()}</span>
                  <strong>{chapter.title}</strong>
                  <em>{isExpanded ? "-" : "+"}</em>
                </button>

                {isExpanded && (
                  <div className="section-nav">
                    {chapter.sections.map((section) => {
                      const isActiveSection =
                        activePage?.chapterId === chapter.id && activePage.sectionSlug === section.slug;

                      return (
                        <div className="section-group" key={section.id}>
                          <button
                            className={`section-link ${isActiveSection ? "active" : ""}`}
                            type="button"
                            onClick={() => onNavigatePage(section.pages[0]?.id ?? "")}
                          >
                            <span>{section.title}</span>
                            <small>{section.exists ? section.sourceType : "placeholder"}</small>
                          </button>

                          {section.pages.length > 1 && (
                            <div className="page-nav">
                              {section.pages.map((page) => (
                                <button
                                  className={activePage?.id === page.id ? "active" : ""}
                                  type="button"
                                  key={page.id}
                                  onClick={() => onNavigatePage(page.id)}
                                >
                                  Page {page.pageNumber}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-heading">
          <span>Labs</span>
          <small>{labs.length} loaded</small>
        </div>
        <div className="lab-nav">
          {labs.map((lab) => (
            <button
              className={activeLab?.id === lab.id && scope === "labs" ? "active" : ""}
              type="button"
              key={lab.id}
              onClick={() => onNavigateLab(lab.id)}
            >
              <span>{lab.title}</span>
              <small>{lab.sourceType}</small>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
