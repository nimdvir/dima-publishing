import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import type { ReaderScope, DemoUser, BookPage, BookLab, BookAppendix } from "./types";
import {
  BOOK_CHAPTERS,
  FLAT_READER_PAGES,
  BOOK_LABS,
  BOOK_APPENDICES,
} from "./generated/bookData";
import { extractHeadingToc } from "./utils/headings";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import DemoLogin from "./components/DemoLogin";
import UpdatePassword from "./components/UpdatePassword";
import ChapterReader from "./components/ChapterReader";
import LabsView from "./components/LabsView";
import AppendicesView from "./components/AppendicesView";
import AdminDashboard from "./components/AdminDashboard";
import { supabase } from "./lib/supabaseClient";
import { getMyAccess } from "./lib/courseAccess";
import { getLastPosition } from "./lib/readingProgress";
import { checkIsAdmin } from "./lib/adminApi";
import { isChapterGated } from "./lib/freePreview";

// Optional display convenience only — Supabase Auth session is the real authority.
const LS_DEMO_USER = "reader-hybrid-v1.1:demoUser";

const VALID_SCOPES = new Set(["welcome", "book", "labs", "appendices", "login", "reset-password", "admin"]);
const KNOWN_CHAPTER_IDS = new Set(BOOK_CHAPTERS.map((c) => c.id));

/** Pre-built lookup: pageId → index in FLAT_READER_PAGES (avoids repeated findIndex). */
const PAGE_INDEX_MAP = new Map<string, number>(
  FLAT_READER_PAGES.map((p, i) => [p.id, i]),
);

type RouteState = {
  scope: ReaderScope;
  chapter?: string;
  section?: string;
  page?: number;
  lab?: string;
  appendix?: string;
};

function parsePositiveInt(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function parseQueryParams(): RouteState {
  const params = new URLSearchParams(window.location.search);
  const rawScope = params.get("scope") || "";
  const scope: ReaderScope = (
    VALID_SCOPES.has(rawScope) ? rawScope : "welcome"
  ) as ReaderScope;
  const chapter = params.get("chapter") || undefined;
  const section = params.get("section") || undefined;
  const page = parsePositiveInt(params.get("page") || undefined);
  const lab = params.get("lab") || undefined;
  return { scope, chapter, section, page, lab };
}

function parsePathFromString(pathname: string): RouteState {
  const parts = pathname
    .split("/")
    .filter(Boolean)
    .map((part) => decodeURIComponent(part));
  const [route, chapter, section, page] = parts;

  if (!route || route === "welcome") return { scope: "welcome" };
  if (route === "login") return { scope: "login" };
  if (route === "book") {
    return {
      scope: "book",
      chapter,
      section,
      page: parsePositiveInt(page),
    };
  }
  if (route === "labs" || route === "lab") {
    return {
      scope: "labs",
      lab: chapter,
    };
  }
  if (route === "appendices") {
    return {
      scope: "appendices",
      appendix: chapter,
    };
  }
  if (route === "account" && chapter === "update-password") {
    return { scope: "reset-password" };
  }
  if (route === "reset-password") {
    return { scope: "reset-password" };
  }
  if (route === "admin") {
    return { scope: "admin" };
  }

  return { scope: "welcome" };
}

function parsePathParams(): RouteState {
  return parsePathFromString(window.location.pathname);
}

/**
 * Parse an in-content link href (e.g. "/book/ch05/lets-build/1") into a route.
 * Returns null for external links, hash links, or anything not an internal app route.
 */
function parseInternalHref(href: string): RouteState | null {
  if (!href || !href.startsWith("/")) return null;
  const pathname = href.split("#")[0].split("?")[0];
  const route = parsePathFromString(pathname);
  return route.scope === "welcome" && pathname !== "/" ? null : route;
}

function parseLocationParams(): RouteState {
  const params = new URLSearchParams(window.location.search);
  return params.has("scope") ? parseQueryParams() : parsePathParams();
}

function resolveRoutePage(route: RouteState): BookPage | null {
  if (
    !route.chapter ||
    !route.section ||
    !KNOWN_CHAPTER_IDS.has(route.chapter)
  ) {
    return null;
  }

  const pageNumber = route.page || 1;
  return (
    FLAT_READER_PAGES.find(
      (p) =>
        p.chapterId === route.chapter &&
        p.sectionSlug === route.section &&
        p.pageNumber === pageNumber,
    ) ||
    FLAT_READER_PAGES.find(
      (p) =>
        p.chapterId === route.chapter &&
        p.sectionSlug === route.section &&
        p.pageNumber === 1,
    ) ||
    null
  );
}

function resolveLabId(routeLab: string | undefined): string | undefined {
  if (!routeLab) return undefined;
  return BOOK_LABS.find((lab) => lab.id === routeLab || lab.slug === routeLab)
    ?.id;
}

/**
 * Resolve the reader page to resume on from a saved progress position.
 * Prefers page 1 of the last section read; falls back to the chapter's first page.
 */
function resolveResumePage(
  chapterId: string,
  lastSection: string | null,
): BookPage | null {
  if (!KNOWN_CHAPTER_IDS.has(chapterId)) return null;
  if (lastSection) {
    const inSection = FLAT_READER_PAGES.find(
      (p) =>
        p.chapterId === chapterId &&
        p.sectionId === lastSection &&
        p.pageNumber === 1,
    );
    if (inSection) return inSection;
  }
  return (
    FLAT_READER_PAGES.find((p) => p.chapterId === chapterId) ?? null
  );
}

function buildRoutePath(
  scope: ReaderScope,
  opts?: { chapter?: string; section?: string; page?: number; lab?: string; appendix?: string },
) {
  if (scope === "book" && opts?.chapter && opts?.section) {
    const page = opts.page && opts.page > 0 ? opts.page : 1;
    return `/book/${encodeURIComponent(opts.chapter)}/${encodeURIComponent(opts.section)}/${page}`;
  }
  if (scope === "book") return "/book";
  if (scope === "labs" && opts?.lab)
    return `/labs/${encodeURIComponent(opts.lab)}`;
  if (scope === "labs") return "/labs";
  if (scope === "appendices" && opts?.appendix)
    return `/appendices/${encodeURIComponent(opts.appendix)}`;
  if (scope === "appendices") return "/appendices";
  if (scope === "login") return "/login";
  if (scope === "reset-password") return "/account/update-password";
  if (scope === "admin") return "/admin";
  return "/";
}

function writeRoute(
  scope: ReaderScope,
  opts?: { chapter?: string; section?: string; page?: number; lab?: string; appendix?: string },
) {
  const url = buildRoutePath(scope, opts);
  window.history.pushState(null, "", url);
}

/** Smooth-scroll to a heading by id, respecting reduced-motion. Returns true if found. */
function scrollToHeadingId(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });
  return true;
}

export default function App() {
  const [scope, setScope] = useState<ReaderScope>("welcome");
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(() => !!supabase);

  // Book reader state
  const [activeChapterId, setActiveChapterId] = useState<string>("ch01");
  const [activeSectionId, setActiveSectionId] =
    useState<string>("ch01-introduction");
  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  // Labs state
  const [activeLabId, setActiveLabId] = useState<string>(
    BOOK_LABS[0]?.id || "lab-01",
  );

  // Appendices state
  const [activeAppendixId, setActiveAppendixId] = useState<string>(
    BOOK_APPENDICES[0]?.id || "appendix-a",
  );

  // Mobile sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Heading id to scroll to once the destination page has rendered (roadmap links).
  const pendingScrollIdRef = useRef<string | null>(null);

  // Guards the one-time "resume where you left off" jump after a session loads.
  const didAutoResumeRef = useRef(false);

  // On app load, check existing Supabase session (real authority) and hydrate display state.
  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return;
    }
    const client = supabase;

    async function checkSession() {
      try {
        const {
          data: { session },
        } = await client.auth.getSession();

        if (session?.user?.email) {
          try {
            const access = await getMyAccess();
            if (access.has_access) {
              setDemoUser({
                netId: session.user.email,
                studentId: "",
                accessStatus: "active",
                createdAt: new Date().toISOString(),
              });
              try {
                setIsAdmin(await checkIsAdmin());
              } catch {
                setIsAdmin(false);
              }
            }
          } catch {
            // Access check failed — user has session but no access. Don't hydrate.
          }
        }
      } finally {
        setAuthLoading(false);
      }
    }

    checkSession();

    // Listen for auth state changes (cross-tab signout, etc.)
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setScope("reset-password");
        writeRoute("reset-password");
      } else if (event === "SIGNED_OUT") {
        setDemoUser(null);
        setIsAdmin(false);
        localStorage.removeItem(LS_DEMO_USER);
      } else if (event === "SIGNED_IN" && session?.user?.email) {
        try {
          const access = await getMyAccess();
          if (access.has_access) {
            const user: DemoUser = {
              netId: session.user.email,
              studentId: "",
              accessStatus: "active",
              createdAt: new Date().toISOString(),
            };
            setDemoUser(user);
            try {
              setIsAdmin(await checkIsAdmin());
            } catch {
              setIsAdmin(false);
            }
          }
        } catch {
          /* access check failed — leave unauthenticated */
        }
      }

      setAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const applyRouteState = useCallback((route: RouteState) => {
    setScope(route.scope);

    const routePage = resolveRoutePage(route);
    if (routePage) {
      setActiveChapterId(routePage.chapterId);
      setActiveSectionId(routePage.sectionId);
      setActivePageIndex(routePage.pageNumber - 1);
    }

    const routeLabId = resolveLabId(route.lab);
    if (routeLabId) setActiveLabId(routeLabId);

    const routeAppendixId = BOOK_APPENDICES.find(
      (a) => a.id === route.appendix || a.slug === route.appendix,
    )?.id;
    if (routeAppendixId) setActiveAppendixId(routeAppendixId);
  }, []);

  // Redirect unauthorized users only when viewing labs, appendices, or gated chapters.
  // Front matter and Ch01-Ch04 remain readable without login.
  useEffect(() => {
    if (!authLoading && !demoUser) {
      if (scope === "labs" || scope === "appendices") {
        setScope("login");
        writeRoute("login");
        return;
      }
      if (
        scope === "book" &&
        activeChapterId &&
        isChapterGated(activeChapterId)
      ) {
        setScope("login");
        writeRoute("login");
        return;
      }
    }
  }, [scope, demoUser, authLoading, activeChapterId]);

  // Parse route on load. Query-string URLs remain supported for older links.
  useEffect(() => {
    applyRouteState(parseLocationParams());
  }, [applyRouteState]);

  // popstate listener
  useEffect(() => {
    const handler = () => {
      applyRouteState(parseLocationParams());
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [applyRouteState]);

  // Navigate to a scope — allow the free preview, gate labs and Ch05+.
  const navigateScope = useCallback(
    (newScope: ReaderScope) => {
      // Labs always require login.
      if ((newScope === "labs" || newScope === "appendices") && !demoUser && !authLoading) {
        setScope("login");
        writeRoute("login");
        return;
      }

      setScope(newScope);
      setSidebarOpen(false);
      if (newScope === "book") {
        const firstPage = FLAT_READER_PAGES[0];
        if (firstPage) {
          setActiveChapterId(firstPage.chapterId);
          setActiveSectionId(firstPage.sectionId);
          setActivePageIndex(0);
          writeRoute("book", {
            chapter: firstPage.chapterId,
            section: firstPage.sectionSlug,
            page: 1,
          });
          return;
        }
      }
      if (newScope === "labs") {
        const firstLab = BOOK_LABS[0];
        if (firstLab) {
          setActiveLabId(firstLab.id);
          writeRoute("labs", { lab: firstLab.id });
          return;
        }
      }
      if (newScope === "appendices") {
        const firstAppendix = BOOK_APPENDICES[0];
        if (firstAppendix) {
          setActiveAppendixId(firstAppendix.id);
          writeRoute("appendices", { appendix: firstAppendix.id });
          return;
        }
      }
      writeRoute(newScope);
    },
    [demoUser, authLoading],
  );

  // Navigate to a specific page
  const navigateToPage = useCallback((page: BookPage) => {
    setScope("book");
    setActiveChapterId(page.chapterId);
    setActiveSectionId(page.sectionId);
    setActivePageIndex(page.pageNumber - 1);
    writeRoute("book", {
      chapter: page.chapterId,
      section: page.sectionSlug,
      page: page.pageNumber,
    });
  }, []);

  // Returning visitor with a live session: resume at their last reading position,
  // but only when they land on the bare root/welcome. An explicit deep link
  // (e.g. /book/ch07/...) always wins and is never overridden.
  // NOTE: must be declared after navigateToPage — it references that callback.
  useEffect(() => {
    if (authLoading || !demoUser || didAutoResumeRef.current) return;
    didAutoResumeRef.current = true;
    if (parsePathParams().scope !== "welcome") return;
    getLastPosition()
      .then((pos) => {
        if (!pos) return;
        const page = resolveResumePage(pos.chapter_id, pos.last_section);
        if (page && parsePathParams().scope === "welcome") {
          navigateToPage(page);
        }
      })
      .catch(() => {});
  }, [authLoading, demoUser, navigateToPage]);

  // Navigate to a lab
  const navigateToLab = useCallback((lab: BookLab) => {
    setScope("labs");
    setActiveLabId(lab.id);
    writeRoute("labs", { lab: lab.id });
  }, []);

  // Navigate to an appendix
  const navigateToAppendix = useCallback((appendix: BookAppendix) => {
    setScope("appendices");
    setActiveAppendixId(appendix.id);
    writeRoute("appendices", { appendix: appendix.id });
  }, []);

  // Navigate to an internal app link (e.g. a /book/... cross-link inside content).
  // Routes through the SPA so no full-page reload occurs. External/unknown links
  // fall through to the browser's default behavior (handled by the link itself).
  const navigateToInternalPath = useCallback(
    (href: string) => {
      const route = parseInternalHref(href);
      if (!route) return;

      if (route.scope === "book") {
        const page = resolveRoutePage(route);
        if (page) {
          navigateToPage(page);
          return;
        }
        // Chapter/section not resolvable: fall back to the book scope.
        navigateScope("book");
        return;
      }
      if (route.scope === "labs") {
        const labId = resolveLabId(route.lab);
        const lab = labId ? BOOK_LABS.find((l) => l.id === labId) : undefined;
        if (lab) {
          navigateToLab(lab);
          return;
        }
        navigateScope("labs");
        return;
      }
      if (route.scope === "appendices") {
        const appendix = BOOK_APPENDICES.find(
          (a) => a.id === route.appendix || a.slug === route.appendix,
        );
        if (appendix) {
          navigateToAppendix(appendix);
          return;
        }
        navigateScope("appendices");
        return;
      }
      navigateScope(route.scope);
    },
    [navigateToPage, navigateToLab, navigateToAppendix, navigateScope],
  );

  // Navigate to an in-book heading anchor (e.g. a Chapter Roadmap row). Resolves the
  // target across pages and sections, switching pages when the heading lives elsewhere.
  const navigateToHeading = useCallback(
    (rawId: string) => {
      let targetId = rawId;
      try {
        targetId = decodeURIComponent(rawId);
      } catch {
        /* keep raw */
      }
      if (!targetId) return;

      // Already on the current page?
      if (scrollToHeadingId(targetId)) return;

      // Search the current chapter first, then the whole book, for the page that owns it.
      const inChapter = FLAT_READER_PAGES.filter(
        (p) => p.chapterId === activeChapterId,
      );
      const pools = [inChapter, FLAT_READER_PAGES];
      for (const pool of pools) {
        const targetPage = pool.find((p) =>
          extractHeadingToc(p.content).some((h) => h.id === targetId),
        );
        if (targetPage) {
          pendingScrollIdRef.current = targetId;
          navigateToPage(targetPage);
          return;
        }
      }
      // Unresolved anchor: leave the reader where it is.
    },
    [activeChapterId, navigateToPage],
  );

  // Supabase-powered login — email passed from DemoLogin after successful auth+access check.
  const handleDemoLogin = useCallback((email: string) => {
    const user: DemoUser = {
      netId: email,
      studentId: "",
      accessStatus: "active",
      createdAt: new Date().toISOString(),
    };
    setDemoUser(user);
    // Optional display convenience only — Supabase session is the real authority.
    localStorage.setItem(LS_DEMO_USER, JSON.stringify(user));
    checkIsAdmin().then(setIsAdmin).catch(() => setIsAdmin(false));
    // Smoother return: drop the reader at the last saved reading position.
    // Falls back to the start of the book when there is no history.
    getLastPosition()
      .then((pos) => {
        const page = pos
          ? resolveResumePage(pos.chapter_id, pos.last_section)
          : null;
        if (page) navigateToPage(page);
        else navigateScope("book");
      })
      .catch(() => navigateScope("book"));
  }, [navigateToPage, navigateScope]);

  const handleSignOut = useCallback(async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setDemoUser(null);
    setIsAdmin(false);
    localStorage.removeItem(LS_DEMO_USER);
  }, []);

  // Find current page from FLAT_READER_PAGES
  const currentPage = useMemo(() => {
    return (
      FLAT_READER_PAGES.find(
        (p) =>
          p.sectionId === activeSectionId &&
          p.pageNumber === activePageIndex + 1,
      ) || null
    );
  }, [activeSectionId, activePageIndex]);

  // Progress calculation
  const progress = useMemo(() => {
    if (!currentPage) return 0;
    const idx = PAGE_INDEX_MAP.get(currentPage.id) ?? -1;
    return FLAT_READER_PAGES.length > 0
      ? ((idx + 1) / FLAT_READER_PAGES.length) * 100
      : 0;
  }, [currentPage]);

  // Scroll to top on page change — unless a roadmap link queued a heading to land on.
  useEffect(() => {
    const pendingId = pendingScrollIdRef.current;
    if (pendingId) {
      pendingScrollIdRef.current = null;
      // Wait for the destination page to render, then scroll to the heading.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!scrollToHeadingId(pendingId)) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage?.id]);

  const currentSectionPages = useMemo(() => {
    return FLAT_READER_PAGES.filter((p) => p.sectionId === activeSectionId);
  }, [activeSectionId]);

  // Navigation helpers (all using PAGE_INDEX_MAP)
  const currentIdx = currentPage
    ? (PAGE_INDEX_MAP.get(currentPage.id) ?? -1)
    : -1;
  const showReaderEntryCover = scope === "book" && currentIdx === 0;

  const goNext = useCallback(() => {
    if (
      scope === "book" &&
      currentIdx >= 0 &&
      currentIdx < FLAT_READER_PAGES.length - 1
    ) {
      navigateToPage(FLAT_READER_PAGES[currentIdx + 1]);
    }
  }, [scope, currentIdx, navigateToPage]);

  const goPrev = useCallback(() => {
    if (scope === "book" && currentIdx > 0) {
      navigateToPage(FLAT_READER_PAGES[currentIdx - 1]);
    }
  }, [scope, currentIdx, navigateToPage]);

  const hasNext = currentIdx >= 0 && currentIdx < FLAT_READER_PAGES.length - 1;
  const hasPrev = currentIdx > 0;
  const nextPage = hasNext ? FLAT_READER_PAGES[currentIdx + 1] : null;
  const prevPage = hasPrev ? FLAT_READER_PAGES[currentIdx - 1] : null;

  const activeLab = useMemo(
    () => BOOK_LABS.find((l) => l.id === activeLabId) || BOOK_LABS[0],
    [activeLabId],
  );

  const activeAppendix = useMemo(
    () => BOOK_APPENDICES.find((a) => a.id === activeAppendixId) || BOOK_APPENDICES[0],
    [activeAppendixId],
  );

  return (
    <Layout
      scope={scope}
      demoUser={demoUser}
      isAdmin={isAdmin}
      onSignOut={handleSignOut}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen((o) => !o)}
      onNavigateScope={navigateScope}
      chapters={BOOK_CHAPTERS}
      progress={progress}
      isAuthenticated={!!demoUser}
      onOpenLogin={() => {
        setScope("login");
        writeRoute("login");
      }}
      activeChapterId={activeChapterId}
      activeSectionId={activeSectionId}
      activePageId={currentPage?.id || ""}
      onSelectSection={(sectionId) => {
        setActiveSectionId(sectionId);
        setActivePageIndex(0);
        const chapter = BOOK_CHAPTERS.find((c) =>
          c.sections.some((s) => s.id === sectionId),
        );
        const section = chapter?.sections.find((s) => s.id === sectionId);
        if (section) {
          const chapterId = section.pages[0]?.chapterId || chapter?.id;
          if (chapterId) {
            setActiveChapterId(chapterId);
            writeRoute("book", {
              chapter: chapterId,
              section: section.slug,
              page: 1,
            });
          }
        }
        setScope("book");
        setSidebarOpen(false);
      }}
      onSelectPage={(page) => {
        navigateToPage(page);
        setSidebarOpen(false);
      }}
      labs={BOOK_LABS}
      activeLabId={activeLabId}
      onSelectLab={(lab) => {
        navigateToLab(lab);
        setSidebarOpen(false);
      }}
      appendices={BOOK_APPENDICES}
      activeAppendixId={activeAppendixId}
      onSelectAppendix={(appendix) => {
        navigateToAppendix(appendix);
        setSidebarOpen(false);
      }}
    >
      {scope === "welcome" && (
        <HomePage
          onEnterReader={() => navigateScope("book")}
          onOpenLogin={() => navigateScope("login")}
        />
      )}
      {scope === "login" && (
        <DemoLogin
          onLogin={handleDemoLogin}
          onCancel={() => navigateScope("welcome")}
        />
      )}
      {scope === "reset-password" && (
        <UpdatePassword
          onDone={() => {
            setScope("login");
            writeRoute("login");
          }}
        />
      )}
      {scope === "book" &&
        !demoUser &&
        !authLoading &&
        activeChapterId &&
        isChapterGated(activeChapterId) && (
          <div className="demo-login-page">
            <div className="login-card">
              <h2>Access required</h2>
              <p className="login-desc">
                Sign in with your university email to read chapters beyond
                Chapter 4.
              </p>
              <div className="login-actions">
                <button
                  className="cta-btn cta-primary"
                  onClick={() => {
                    setScope("login");
                    writeRoute("login");
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        )}
      {scope === "book" &&
        currentPage &&
        (demoUser || (activeChapterId && !isChapterGated(activeChapterId))) && (() => {
          const currentChapter = BOOK_CHAPTERS.find((c) => c.id === activeChapterId);
          return (
          <ChapterReader
            page={currentPage}
            allPages={currentSectionPages}
            onNavigate={navigateToPage}
            onHashNavigate={navigateToHeading}
            onPathNavigate={navigateToInternalPath}
            hasPrev={hasPrev}
            hasNext={hasNext}
            prevPage={prevPage}
            nextPage={nextPage}
            onPrev={goPrev}
            onNext={goNext}
            showEntryCover={showReaderEntryCover}
            roadmapItems={currentChapter?.roadmapItems}
            chapterSubtitle={currentChapter?.subtitle}
            sections={currentChapter?.sections}
            onSelectSection={(sectionId) => {
              const section = currentChapter?.sections.find(
                (s) => s.id === sectionId,
              );
              const firstPage = section?.pages[0];
              if (firstPage) navigateToPage(firstPage);
            }}
          />
          );
        })()}
      {scope === "labs" && !demoUser && !authLoading && (
        <div className="demo-login-page">
          <div className="login-card">
            <h2>Access required</h2>
            <p className="login-desc">
              Sign in with your university email to access the labs.
            </p>
            <div className="login-actions">
              <button
                className="cta-btn cta-primary"
                onClick={() => {
                  setScope("login");
                  writeRoute("login");
                }}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}
      {scope === "labs" && demoUser && activeLab && (
        <LabsView
          labs={BOOK_LABS}
          activeLab={activeLab}
          onSelectLab={navigateToLab}
          onNavigatePath={navigateToInternalPath}
        />
      )}
      {scope === "appendices" && demoUser && activeAppendix && (
        <AppendicesView
          appendices={BOOK_APPENDICES}
          activeAppendix={activeAppendix}
          onSelectAppendix={navigateToAppendix}
          onNavigatePath={navigateToInternalPath}
        />
      )}
      {scope === "admin" && (
        <AdminDashboard />
      )}
    </Layout>
  );
}
