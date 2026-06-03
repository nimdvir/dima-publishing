import { useCallback, useEffect, useMemo, useState } from "react";
import { BOOK_CHAPTERS } from "./generated/bookData";
import type { BookChapter, BookSection, FlatSection } from "./types";
import { BottomNavigation } from "./components/BottomNavigation";
import { ChapterReader } from "./components/ChapterReader";
import { Layout } from "./components/Layout";
import { Sidebar } from "./components/Sidebar";

const BOOK_TITLE = "Using Data to Drive Business Performance";
const BOOK_SUBTITLE = "Temporary four-chapter online reader";

function flattenSections(chapters: BookChapter[]): FlatSection[] {
  return chapters.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      chapterId: chapter.id,
      sectionId: section.id,
      chapterTitle: chapter.title,
      sectionTitle: section.title,
    })),
  );
}

function findSection(
  chapters: BookChapter[],
  chapterId: string,
  sectionId: string,
): { chapter: BookChapter; section: BookSection } | null {
  const chapter = chapters.find((item) => item.id === chapterId);
  if (!chapter) return null;
  const section = chapter.sections.find((item) => item.id === sectionId);
  if (!section) return null;
  return { chapter, section };
}

function readUrlSelection(chapters: BookChapter[]): { chapterId: string; sectionId: string } | null {
  const params = new URLSearchParams(window.location.search);
  const chapterId = params.get("chapter");
  const sectionSlug = params.get("section");
  if (!chapterId || !sectionSlug) return null;

  const chapter = chapters.find((item) => item.id === chapterId);
  const section = chapter?.sections.find((item) => item.slug === sectionSlug);
  if (!chapter || !section) return null;
  return { chapterId: chapter.id, sectionId: section.id };
}

function writeUrlSelection(chapterId: string, sectionSlug: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set("chapter", chapterId);
  url.searchParams.set("section", sectionSlug);
  window.history.replaceState(null, "", url.toString());
}

export default function App() {
  const chapters = BOOK_CHAPTERS;
  const flatSections = useMemo(() => flattenSections(chapters), [chapters]);
  const defaultChapter = chapters[0];
  const defaultSection = defaultChapter?.sections[0];
  const urlSelection = readUrlSelection(chapters);

  const [activeChapterId, setActiveChapterId] = useState(
    urlSelection?.chapterId ?? defaultChapter?.id ?? "",
  );
  const [activeSectionId, setActiveSectionId] = useState(
    urlSelection?.sectionId ?? defaultSection?.id ?? "",
  );
  const [expandedChapterIds, setExpandedChapterIds] = useState<Set<string>>(
    () => new Set([urlSelection?.chapterId ?? defaultChapter?.id ?? ""]),
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeIndex = flatSections.findIndex(
    (item) => item.chapterId === activeChapterId && item.sectionId === activeSectionId,
  );
  const previous = activeIndex > 0 ? flatSections[activeIndex - 1] : null;
  const next = activeIndex >= 0 && activeIndex < flatSections.length - 1 ? flatSections[activeIndex + 1] : null;

  const goToSection = useCallback(
    (chapterId: string, sectionId: string) => {
      const chapter = chapters.find((item) => item.id === chapterId);
      const section = chapter?.sections.find((item) => item.id === sectionId);
      if (!chapter || !section) return;

      setActiveChapterId(chapter.id);
      setActiveSectionId(section.id);
      setExpandedChapterIds((current) => {
        const nextExpanded = new Set(current);
        nextExpanded.add(chapter.id);
        return nextExpanded;
      });
      setSidebarOpen(false);
      writeUrlSelection(chapter.id, section.slug);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [chapters],
  );

  const toggleChapter = (chapterId: string) => {
    setExpandedChapterIds((current) => {
      const nextExpanded = new Set(current);
      if (nextExpanded.has(chapterId)) nextExpanded.delete(chapterId);
      else nextExpanded.add(chapterId);
      return nextExpanded;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (event.key === "ArrowLeft" && previous) {
        goToSection(previous.chapterId, previous.sectionId);
      }
      if (event.key === "ArrowRight" && next) {
        goToSection(next.chapterId, next.sectionId);
      }
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToSection, next, previous]);

  const selection = findSection(chapters, activeChapterId, activeSectionId);
  if (!selection) {
    return (
      <main className="app-error">
        <h1>No book data loaded</h1>
        <p>Run <code>npm run generate</code> from this reader folder.</p>
      </main>
    );
  }

  return (
    <Layout
      bookTitle={BOOK_TITLE}
      bookSubtitle={BOOK_SUBTITLE}
      sidebarOpen={sidebarOpen}
      onOpenSidebar={() => setSidebarOpen(true)}
      onCloseSidebar={() => setSidebarOpen(false)}
      sidebar={
        <Sidebar
          chapters={chapters}
          activeChapterId={activeChapterId}
          activeSectionId={activeSectionId}
          expandedChapterIds={expandedChapterIds}
          onToggleChapter={toggleChapter}
          onSelectSection={goToSection}
        />
      }
    >
      <ChapterReader chapter={selection.chapter} section={selection.section} />
      <BottomNavigation previous={previous} next={next} onNavigate={goToSection} />
    </Layout>
  );
}
