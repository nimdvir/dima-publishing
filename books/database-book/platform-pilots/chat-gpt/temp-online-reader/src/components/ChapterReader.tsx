import type { BookChapter, BookSection } from "../types";
import { MarkdownRenderer } from "./MarkdownRenderer";

type ChapterReaderProps = {
  chapter: BookChapter;
  section: BookSection;
};

export function ChapterReader({ chapter, section }: ChapterReaderProps) {
  return (
    <article className="chapter-reader">
      <header className="reader-header">
        <p className="eyebrow">{chapter.id.toUpperCase()}</p>
        <h2>{chapter.title}</h2>
        <div className="section-heading-row">
          <h3>{section.title}</h3>
          <span className="source-pill">{section.resolvedFile ?? "placeholder"}</span>
        </div>
        {!section.exists && (
          <p className="missing-notice" role="status">
            This source section was not found. A placeholder is shown.
          </p>
        )}
      </header>
      <MarkdownRenderer content={section.content} />
    </article>
  );
}
