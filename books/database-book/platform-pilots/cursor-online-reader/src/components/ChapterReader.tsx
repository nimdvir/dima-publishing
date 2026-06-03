import type { BookChapter, BookSection, FlatSection } from "../types";
import { BottomNavigation } from "./BottomNavigation";
import { MarkdownRenderer } from "./MarkdownRenderer";

type ChapterReaderProps = {
  chapter: BookChapter;
  section: BookSection;
  previous: FlatSection | null;
  next: FlatSection | null;
  onNavigate: (chapterId: string, sectionId: string) => void;
};

export function ChapterReader({
  chapter,
  section,
  previous,
  next,
  onNavigate,
}: ChapterReaderProps) {
  return (
    <article className="chapter-reader">
      <header className="reader-header">
        <h1>{chapter.title}</h1>
        <h2>{section.title}</h2>
        {!section.exists && (
          <p className="section-missing-notice" role="status">
            This section file is not available yet. Showing placeholder.
          </p>
        )}
      </header>

      <MarkdownRenderer content={section.content} />

      <BottomNavigation
        previous={previous}
        next={next}
        onNavigate={onNavigate}
      />
    </article>
  );
}
