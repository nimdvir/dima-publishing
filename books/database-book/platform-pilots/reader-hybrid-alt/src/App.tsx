import { useEffect, useMemo, useState } from "react";
import { AiAssistant } from "./components/AiAssistant";
import { ChapterReader } from "./components/ChapterReader";
import { DemoLogin } from "./components/DemoLogin";
import { HomePage } from "./components/HomePage";
import { LabsView } from "./components/LabsView";
import { Layout } from "./components/Layout";
import { BOOK_CHAPTERS, BOOK_LABS, FLAT_READER_PAGES } from "./generated/bookData";
import type { BookLab, BookPage, DemoUser, ReaderScope } from "./types";

const STORAGE_KEY = "reader-hybrid-alt:demoUser";
const READER_SCOPES: ReaderScope[] = ["welcome", "book", "labs", "ai-assistant", "login"];

function isReaderScope(value: string | null): value is ReaderScope {
  return value !== null && READER_SCOPES.some((scope) => scope === value);
}

function getFirstPage(): BookPage | null {
  return FLAT_READER_PAGES[0] ?? null;
}

function getFirstLab(): BookLab | null {
  return BOOK_LABS[0] ?? null;
}

function resolveBookPage(params: URLSearchParams): BookPage | null {
  const firstPage = getFirstPage();
  const chapterParam = params.get("chapter");
  const sectionParam = params.get("section");
  const pageParam = params.get("page");
  const pageNumber = pageParam ? Number.parseInt(pageParam, 10) : 1;

  if (!chapterParam) return firstPage;

  const chapter = BOOK_CHAPTERS.find((candidate) => candidate.id === chapterParam);
  if (!chapter) return firstPage;

  if (sectionParam) {
    const section = chapter.sections.find((candidate) => candidate.slug === sectionParam);
    if (section) {
      return (
        section.pages.find((page) => page.pageNumber === pageNumber) ??
        section.pages[0] ??
        firstPage
      );
    }
  }

  return chapter.sections[0]?.pages[0] ?? firstPage;
}

function resolveLab(params: URLSearchParams): BookLab | null {
  const requestedLab = params.get("lab");
  if (!requestedLab) return getFirstLab();
  return BOOK_LABS.find((lab) => lab.id === requestedLab) ?? getFirstLab();
}

function resolveFromLocation(): { scope: ReaderScope; pageId: string; labId: string } {
  const params = new URLSearchParams(window.location.search);
  const requestedScope = params.get("scope");
  const scope = isReaderScope(requestedScope) ? requestedScope : "welcome";
  const page = resolveBookPage(params);
  const lab = resolveLab(params);

  return {
    scope,
    pageId: page?.id ?? "",
    labId: lab?.id ?? "",
  };
}

function writeUrlForScope(scope: ReaderScope, page: BookPage | null, lab: BookLab | null): void {
  const params = new URLSearchParams();
  params.set("scope", scope);

  if (scope === "book" && page) {
    params.set("chapter", page.chapterId);
    params.set("section", page.sectionSlug);
    params.set("page", String(page.pageNumber));
  }

  if (scope === "labs" && lab) {
    params.set("lab", lab.id);
  }

  const nextUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, "", nextUrl);
}

function readStoredUser(): DemoUser | null {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<DemoUser>;
    if (
      typeof parsed.netId === "string" &&
      typeof parsed.studentId === "string" &&
      typeof parsed.accessStatus === "string" &&
      typeof parsed.createdAt === "string"
    ) {
      return {
        netId: parsed.netId,
        studentId: parsed.studentId,
        accessStatus: parsed.accessStatus,
        createdAt: parsed.createdAt,
      };
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return null;
}

export default function App() {
  const initial = resolveFromLocation();
  const [scope, setScope] = useState<ReaderScope>(initial.scope);
  const [activePageId, setActivePageId] = useState(initial.pageId);
  const [activeLabId, setActiveLabId] = useState(initial.labId);
  const [demoUser, setDemoUser] = useState<DemoUser | null>(() => readStoredUser());

  const activePage = useMemo(
    () => FLAT_READER_PAGES.find((page) => page.id === activePageId) ?? getFirstPage(),
    [activePageId],
  );
  const activeLab = useMemo(
    () => BOOK_LABS.find((lab) => lab.id === activeLabId) ?? getFirstLab(),
    [activeLabId],
  );
  const activePageIndex = activePage
    ? FLAT_READER_PAGES.findIndex((page) => page.id === activePage.id)
    : -1;
  const previousPage = activePageIndex > 0 ? FLAT_READER_PAGES[activePageIndex - 1] : null;
  const nextPage =
    activePageIndex >= 0 && activePageIndex < FLAT_READER_PAGES.length - 1
      ? FLAT_READER_PAGES[activePageIndex + 1]
      : null;

  useEffect(() => {
    const handlePopState = () => {
      const next = resolveFromLocation();
      setScope(next.scope);
      setActivePageId(next.pageId);
      setActiveLabId(next.labId);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function navigateScope(nextScope: ReaderScope) {
    const page = activePage ?? getFirstPage();
    const lab = activeLab ?? getFirstLab();
    setScope(nextScope);

    if (nextScope === "book" && page) setActivePageId(page.id);
    if (nextScope === "labs" && lab) setActiveLabId(lab.id);
    writeUrlForScope(nextScope, page, lab);
  }

  function navigatePage(pageId: string) {
    const page = FLAT_READER_PAGES.find((candidate) => candidate.id === pageId);
    if (!page) return;

    setScope("book");
    setActivePageId(page.id);
    writeUrlForScope("book", page, activeLab);
  }

  function navigateLab(labId: string) {
    const lab = BOOK_LABS.find((candidate) => candidate.id === labId);
    if (!lab) return;

    setScope("labs");
    setActiveLabId(lab.id);
    writeUrlForScope("labs", activePage, lab);
  }

  function handleDemoLogin(nextUser: DemoUser) {
    setDemoUser(nextUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  }

  function handleSignOut() {
    setDemoUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <Layout
      scope={scope}
      chapters={BOOK_CHAPTERS}
      labs={BOOK_LABS}
      activePage={activePage}
      activeLab={activeLab}
      demoUser={demoUser}
      onNavigateScope={navigateScope}
      onNavigatePage={navigatePage}
      onNavigateLab={navigateLab}
      onSignOut={handleSignOut}
    >
      {scope === "welcome" && <HomePage onNavigateScope={navigateScope} />}

      {scope === "book" && activePage && (
        <ChapterReader
          chapters={BOOK_CHAPTERS}
          activePage={activePage}
          previousPage={previousPage}
          nextPage={nextPage}
          onNavigatePage={navigatePage}
        />
      )}

      {scope === "book" && !activePage && (
        <section className="empty-state">
          <h1>Generated reader content is missing.</h1>
          <p>Run <code>npm run generate</code> inside this folder to build book data.</p>
        </section>
      )}

      {scope === "labs" && activeLab && (
        <LabsView labs={BOOK_LABS} activeLab={activeLab} onNavigateLab={navigateLab} />
      )}

      {scope === "labs" && !activeLab && (
        <section className="empty-state">
          <h1>Generated lab content is missing.</h1>
          <p>Run <code>npm run generate</code> inside this folder to build lab data.</p>
        </section>
      )}

      {scope === "ai-assistant" && <AiAssistant activePage={activePage} />}

      {scope === "login" && (
        <DemoLogin demoUser={demoUser} onSubmit={handleDemoLogin} onSignOut={handleSignOut} />
      )}
    </Layout>
  );
}
