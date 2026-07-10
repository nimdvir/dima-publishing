import { useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { BookPage, BookSection, RoadmapItem } from "../types";
import type { HeadingTocItem } from "../utils/headings";
import { filterNonContentHeadings, contentStartsWithHeading } from "../utils/headings";
import { trackPageView, markPageCompleted } from "../lib/readingProgress";
import { startReadingSession, endReadingSession } from "../lib/readingTime";
import MarkdownRenderer from "./MarkdownRenderer";
import OnThisPage, { OnThisPageMobile } from "./OnThisPage";
import BottomNavigation from "./BottomNavigation";
import ReaderEntryCoverRotator from "./ReaderEntryCoverRotator";
import ChapterRoadmapBar from "./ChapterRoadmapBar";
interface ChapterReaderProps {
  page: BookPage;
  allPages: BookPage[];
  onNavigate: (page: BookPage) => void;
  onHashNavigate?: (targetId: string) => void;
  onPathNavigate?: (path: string) => void;
  hasPrev: boolean;
  hasNext: boolean;
  prevPage: BookPage | null;
  nextPage: BookPage | null;
  onPrev: () => void;
  onNext: () => void;
  showEntryCover: boolean;
  roadmapItems?: RoadmapItem[];
  chapterSubtitle?: string;
  sections?: BookSection[];
  onSelectSection?: (sectionId: string) => void;
}

/** Short labels for the in-chapter section switcher. */
const SECTION_TAB_LABELS: Record<string, string> = {
  "Review Questions": "Review",
  "Terms Treasury": "Key Terms",
  "RAT: Reading Test": "Reading Test",
  "Chapter Lab": "Lab",
};

export default function ChapterReader({
  page,
  allPages,
  onNavigate,
  onHashNavigate,
  onPathNavigate,
  hasPrev,
  hasNext,
  prevPage,
  nextPage,
  onPrev,
  onNext,
  showEntryCover,
  roadmapItems,
  chapterSubtitle,
  sections,
  onSelectSection,
}: ChapterReaderProps) {
  // Extract headings from the MarkdownRenderer (guarantees ID match with DOM).
  // Each render reports the CURRENT page's full heading list, so we replace
  // rather than merge — merging with previous state leaked a prior page's
  // headings into "On this page". React StrictMode double-renders in dev, but
  // both reports are identical, so the equality check keeps a stable reference.
  const [headings, setHeadings] = useState<HeadingTocItem[]>([]);
  const handleHeadingsExtracted = useCallback((h: HeadingTocItem[]) => {
    const filtered = filterNonContentHeadings(h);
    setHeadings((prev) => {
      if (
        filtered.length === prev.length &&
        filtered.every((m, i) => m.id === prev[i].id && m.text === prev[i].text)
      ) {
        return prev;
      }
      return filtered;
    });
  }, []);

  const reducedMotion = useReducedMotion();

  // Track reading progress on every page view
  useEffect(() => {
    trackPageView({
      chapterId: page.chapterId,
      sectionId: page.sectionId,
      pageId: page.id,
    });
    // Start timing this reading session
    startReadingSession(page.chapterId, page.sectionId);
  }, [page.id, page.chapterId, page.sectionId]);

  // End reading session on unmount
  useEffect(() => {
    return () => {
      endReadingSession();
    };
  }, []);

  // Mark page as completed when user navigates past it
  useEffect(() => {
    if (prevPage?.id) {
      markPageCompleted(prevPage.id);
    }
  }, [page.id, prevPage?.id]);

  // Roadmap and other in-content "#anchor" links must jump across reader pages,
  // so intercept them and route through the chapter-aware handler.
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onHashNavigate) return;
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || !href.startsWith("#") || href.length < 2) return;
    e.preventDefault();
    onHashNavigate(href.slice(1));
  };

  return (
    <div className="chapter-reader">
      <motion.div
        key={page.id}
        className="reader-page-motion"
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reducedMotion ? { duration: 0 } : { duration: 0.22, ease: "easeOut" }
        }
      >
        {/* Reader header */}
        <div className="reader-header">
          <div className="reader-breadcrumb">
            <span className="breadcrumb-chapter">
              {page.chapterId.toUpperCase()}
            </span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-section">{page.sectionTitle}</span>
          </div>
          {/* Only show the derived page title when the content does NOT already
              open with its own heading — otherwise the same heading appears twice. */}
          {!contentStartsWithHeading(page.content) && (
            <h2 className="reader-page-title">{page.title}</h2>
          )}
          <div className="reader-meta">
            {page.totalPages > 1 && (
              <span className="page-indicator">
                Page {page.pageNumber} of {page.totalPages}
              </span>
            )}
          </div>
        </div>

        {/* In-chapter section switcher — jump directly between the chapter's
            sections (Introduction, Core Concepts, Let's Build, …). */}
        {sections && sections.length > 1 && onSelectSection && (
          <nav className="section-switcher" aria-label="Chapter sections">
            {sections.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`section-switch-tab ${s.id === page.sectionId ? "active" : ""}`}
                aria-current={s.id === page.sectionId ? "page" : undefined}
                onClick={() => onSelectSection(s.id)}
              >
                {SECTION_TAB_LABELS[s.title] || s.title}
              </button>
            ))}
          </nav>
        )}

        {/* Page tabs (if multi-page section) */}
        {allPages.length > 1 && (
          <div className="page-tabs">
            {allPages.map((p) => (
              <button
                key={p.id}
                className={`page-tab ${p.id === page.id ? "active" : ""}`}
                onClick={() => onNavigate(p)}
                data-tooltip={p.navTitle || ""}
              >
                {p.pageNumber}
              </button>
            ))}
          </div>
        )}

        {/* Mobile: collapsible "On this page" above the article */}
        <OnThisPageMobile headings={headings} />

        {/* Chapter subtitle + inline roadmap (intro pages only) */}
        {page.sectionSlug === "introduction" && (chapterSubtitle || (roadmapItems && roadmapItems.length > 0)) && (
          <div className="chapter-intro-header">
            {chapterSubtitle && (
              <p className="chapter-subtitle">{chapterSubtitle}</p>
            )}
            {roadmapItems && roadmapItems.length > 0 && (
              <ChapterRoadmapBar
                items={roadmapItems}
                onTopicClick={(anchor) => onHashNavigate?.(anchor)}
                inline={true}
              />
            )}
          </div>
        )}

        {/* Reader body: main article + right-side "On this page" rail */}
        <div className="reader-body">
          <div className="reader-content" onClick={handleContentClick}>
            {showEntryCover && (
              <ReaderEntryCoverRotator
                classicUrl="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto/bitm330book/0-cover-image/ch00-cover-art2-cropped.gif"
                goldUrl="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto/bitm330book/0-cover-image/ch00-cover-gold.gif"
              />
            )}
            <MarkdownRenderer
              content={page.content}
              suppressFirstImage={showEntryCover}
              onHeadingsExtracted={handleHeadingsExtracted}
              onInternalLinkClick={onPathNavigate}
            />
          </div>
          <OnThisPage headings={headings} />
        </div>

        {/* Bottom navigation */}
        <BottomNavigation
          hasPrev={hasPrev}
          hasNext={hasNext}
          prevPage={prevPage}
          nextPage={nextPage}
          onPrev={onPrev}
          onNext={onNext}
          onNavigate={onNavigate}
        />
      </motion.div>
    </div>
  );
}
