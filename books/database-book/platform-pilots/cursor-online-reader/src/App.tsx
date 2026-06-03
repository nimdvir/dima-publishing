import { useCallback, useEffect, useMemo, useState } from "react";
import { BOOK_CHAPTERS } from "./generated/bookData";
import type { BookChapter, BookSection, FlatSection } from "./types";
import { Layout } from "./components/Layout";
import { Sidebar } from "./components/Sidebar";
import { MobileNav } from "./components/MobileNav";
import { ChapterReader } from "./components/ChapterReader";

const BOOK_TITLE =
  "Using Data to Drive Business Performance: Databases and Management Information Systems";

function flattenSections(chapters: BookChapter[]): FlatSection[] {
  const flat: FlatSection[] = [];
  for (const chapter of chapters) {
    for (const section of chapter.sections) {
      flat.push({
        chapterId: chapter.id,
        sectionId: section.id,
        chapterTitle: chapter.title,
        sectionTitle: section.title,
      });
    }
  }
  return flat;
}

function findSection(
  chapters: BookChapter[],
  chapterId: string,
  sectionId: string,
): { chapter: BookChapter; section: BookSection } | null {
  const chapter = chapters.find((c) => c.id === chapterId);
  if (!chapter) return null;
  const section = chapter.sections.find((s) => s.id === sectionId);
  if (!section) return null;
  return { chapter, section };
}

function readUrlSelection(): { chapterId: string; sectionId: string } | null {
  const params = new URLSearchParams(window.location.search);
  const chapterId = params.get("chapter");
  const sectionSlug = params.get("section");
  if (!chapterId || !sectionSlug) return null;
  const chapter = BOOK_CHAPTERS.find((c) => c.id === chapterId);
  if (!chapter) return null;
  const section = chapter.sections.find((s) => s.slug === sectionSlug);
  if (!section) return null;
  return { chapterId, sectionId: section.id };
}

function writeUrlSelection(chapterId: string, sectionSlug: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set("chapter", chapterId);
  url.searchParams.set("section", sectionSlug);
  window.history.replaceState(null, "", url.toString());
}

export default function App() {
  const chapters = BOOK_CHAPTERS;
  const flat = useMemo(() => flattenSections(chapters), [chapters]);

  const defaultChapter = chapters[0];
  const defaultSection = defaultChapter?.sections[0];

  const urlSelection = readUrlSelection();

  const [activeChapterId, setActiveChapterId] = useState(
    urlSelection?.chapterId ?? defaultChapter?.id ?? "",
  );
  const [activeSectionId, setActiveSectionId] = useState(
    urlSelection?.sectionId ?? defaultSection?.id ?? "",
  );
  const [expandedChapterIds, setExpandedChapterIds] = useState<Set<string>>(
    () => new Set([urlSelection?.chapterId ?? defaultChapter?.id ?? ""]),
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const goToSection = useCallback(
    (chapterId: string, sectionId: string) => {
      setActiveChapterId(chapterId);
      setActiveSectionId(sectionId);
      setExpandedChapterIds((prev) => {
        const next = new Set(prev);
        next.add(chapterId);
        return next;
      });
      setIsSidebarOpen(false);

      const chapter = chapters.find((c) => c.id === chapterId);
      const section = chapter?.sections.find((s) => s.id === sectionId);
      if (chapter && section) {
        writeUrlSelection(chapterId, section.slug);
      }
    },
    [chapters],
  );

  const activeIndex = flat.findIndex(
    (f) => f.chapterId === activeChapterId && f.sectionId === activeSectionId,
  );

  const previous = activeIndex > 0 ? flat[activeIndex - 1] : null;
  const next =
    activeIndex >= 0 && activeIndex < flat.length - 1
      ? flat[activeIndex + 1]
      : null;

  const goPrev = useCallback(() => {
    if (previous) goToSection(previous.chapterId, previous.sectionId);
  }, [previous, goToSection]);

  const goNext = useCallback(() => {
    if (next) goToSection(next.chapterId, next.sectionId);
  }, [next, goToSection]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  const selection = findSection(chapters, activeChapterId, activeSectionId);
  if (!selection) {
    return (
      <div className="app-error">
        <p>No chapter content loaded. Run <code>npm run generate</code>.</p>
      </div>
    );
  }

  const toggleChapter = (chapterId: string) => {
    setExpandedChapterIds((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) next.delete(chapterId);
      else next.add(chapterId);
      return next;
    });
  };

  return (
    <Layout
      bookTitle={BOOK_TITLE}
      isSidebarOpen={isSidebarOpen}
      mobileNav={
        <MobileNav
          isOpen={isSidebarOpen}
          onOpen={() => setIsSidebarOpen(true)}
          onClose={() => setIsSidebarOpen(false)}
        />
      }
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
      <ChapterReader
        chapter={selection.chapter}
        section={selection.section}
        previous={previous}
        next={next}
        onNavigate={goToSection}
      />
    </Layout>
  );
}
