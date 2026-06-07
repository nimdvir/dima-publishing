import { useEffect, useMemo } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { extractHeadingToc, MarkdownRenderer } from "./MarkdownRenderer";
import type { BookChapter, BookPage } from "../types";

type ChapterReaderProps = {
  chapters: BookChapter[];
  activePage: BookPage;
  previousPage: BookPage | null;
  nextPage: BookPage | null;
  onNavigatePage: (pageId: string) => void;
};

export function ChapterReader({
  chapters,
  activePage,
  previousPage,
  nextPage,
  onNavigatePage,
}: ChapterReaderProps) {
  const chapter = chapters.find((candidate) => candidate.id === activePage.chapterId);
  const tocItems = useMemo(() => extractHeadingToc(activePage.content), [activePage.content]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activePage.id]);

  return (
    <article className="reader-view">
      <header className="reader-header">
        <p className="eyebrow">{activePage.chapterId.toUpperCase()} / {activePage.sectionTitle}</p>
        <h1>{chapter?.title ?? activePage.chapterId}</h1>
        <div className="reader-meta">
          <span>{activePage.title}</span>
          {activePage.totalPages > 1 && (
            <span>Page {activePage.pageNumber} of {activePage.totalPages}</span>
          )}
          <span className={`source-pill source-${activePage.sourceType}`}>{activePage.sourceType}</span>
        </div>
      </header>

      <div className="reader-content-grid">
        <div className="reader-article">
          <MarkdownRenderer content={activePage.content} />
        </div>

        <aside className="page-toc" aria-label="On this page">
          <p className="eyebrow">On This Page</p>
          {tocItems.length > 0 ? (
            <nav>
              {tocItems.map((item) => (
                <a className={item.level === 3 ? "toc-h3" : ""} href={`#${item.id}`} key={item.id}>
                  {item.text}
                </a>
              ))}
            </nav>
          ) : (
            <p>No H2/H3 headings on this page.</p>
          )}
        </aside>
      </div>

      <BottomNavigation
        previous={
          previousPage
            ? {
                id: previousPage.id,
                title: previousPage.title,
                eyebrow: "Previous page",
              }
            : null
        }
        next={
          nextPage
            ? {
                id: nextPage.id,
                title: nextPage.title,
                eyebrow: "Next page",
              }
            : null
        }
        onNavigate={onNavigatePage}
      />
    </article>
  );
}
