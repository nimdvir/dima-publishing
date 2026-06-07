import { useState } from "react";
import type { BookChapter, BookLab, BookPage, ReaderScope } from "../types";

type MobileNavProps = {
  scope: ReaderScope;
  chapters: BookChapter[];
  labs: BookLab[];
  activePage: BookPage | null;
  activeLab: BookLab | null;
  onNavigateScope: (scope: ReaderScope) => void;
  onNavigatePage: (pageId: string) => void;
  onNavigateLab: (labId: string) => void;
};

export function MobileNav({
  scope,
  chapters,
  labs,
  activePage,
  activeLab,
  onNavigateScope,
  onNavigatePage,
  onNavigateLab,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  function closeAfter(action: () => void) {
    action();
    setOpen(false);
  }

  return (
    <div className="mobile-nav">
      <button className="icon-button" type="button" onClick={() => setOpen(true)} aria-label="Open navigation">
        <span></span>
        <span></span>
        <span></span>
      </button>

      {open && (
        <div className="mobile-overlay" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button className="mobile-scrim" type="button" onClick={() => setOpen(false)} aria-label="Close navigation" />
          <nav className="mobile-drawer">
            <div className="mobile-drawer-header">
              <strong>Navigation</strong>
              <button className="close-button" type="button" onClick={() => setOpen(false)} aria-label="Close navigation">
                x
              </button>
            </div>

            <div className="mobile-scope-grid">
              {(["welcome", "book", "labs", "ai-assistant", "login"] as ReaderScope[]).map((item) => (
                <button
                  className={scope === item ? "active" : ""}
                  type="button"
                  key={item}
                  onClick={() => closeAfter(() => onNavigateScope(item))}
                >
                  {item === "ai-assistant" ? "AI" : item}
                </button>
              ))}
            </div>

            <div className="mobile-list">
              <h3>Chapters</h3>
              {chapters.map((chapter) => (
                <div key={chapter.id}>
                  <strong>{chapter.id.toUpperCase()} {chapter.title}</strong>
                  {chapter.sections.map((section) => (
                    <button
                      className={
                        activePage?.chapterId === chapter.id && activePage.sectionSlug === section.slug
                          ? "active"
                          : ""
                      }
                      type="button"
                      key={section.id}
                      onClick={() => closeAfter(() => onNavigatePage(section.pages[0]?.id ?? ""))}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <div className="mobile-list">
              <h3>Labs</h3>
              {labs.map((lab) => (
                <button
                  className={activeLab?.id === lab.id ? "active" : ""}
                  type="button"
                  key={lab.id}
                  onClick={() => closeAfter(() => onNavigateLab(lab.id))}
                >
                  {lab.title}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
