import { useState, useCallback, useEffect, useMemo } from 'react';
import type { ReaderScope, DemoUser, BookPage, BookLab } from './types';
import { BOOK_CHAPTERS, FLAT_READER_PAGES, BOOK_LABS } from './generated/bookData';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import DemoLogin from './components/DemoLogin';
import ChapterReader from './components/ChapterReader';
import LabsView from './components/LabsView';

const LS_DEMO_USER = 'reader-hybrid-v1.1:demoUser';
const LS_NOTICE_DISMISSED = 'reader-hybrid-v1.1:prototypeNoticeDismissed';

const VALID_SCOPES = new Set(['welcome', 'book', 'labs', 'login']);
const KNOWN_CHAPTER_IDS = new Set(BOOK_CHAPTERS.map(c => c.id));

/** Pre-built lookup: pageId → index in FLAT_READER_PAGES (avoids repeated findIndex). */
const PAGE_INDEX_MAP = new Map<string, number>(
  FLAT_READER_PAGES.map((p, i) => [p.id, i])
);

function parseQueryParams(): {
  scope: ReaderScope;
  chapter?: string;
  section?: string;
  page?: number;
  lab?: string;
} {
  const params = new URLSearchParams(window.location.search);
  const rawScope = params.get('scope') || '';
  const scope: ReaderScope = (VALID_SCOPES.has(rawScope) ? rawScope : 'welcome') as ReaderScope;
  const chapter = params.get('chapter') || undefined;
  const section = params.get('section') || undefined;
  const pageStr = params.get('page');
  const page = pageStr ? parseInt(pageStr, 10) : undefined;
  const lab = params.get('lab') || undefined;
  return { scope, chapter, section, page, lab };
}

function writeQueryParams(
  scope: ReaderScope,
  opts?: { chapter?: string; section?: string; page?: number; lab?: string }
) {
  const params = new URLSearchParams();
  params.set('scope', scope);
  if (opts?.chapter) params.set('chapter', opts.chapter);
  if (opts?.section) params.set('section', opts.section);
  if (opts?.page !== undefined) params.set('page', String(opts.page));
  if (opts?.lab) params.set('lab', opts.lab);
  const qs = params.toString();
  const url = `${window.location.pathname}${qs ? '?' + qs : ''}`;
  window.history.pushState(null, '', url);
}

export default function App() {
  const [scope, setScope] = useState<ReaderScope>('welcome');
  const [demoUser, setDemoUser] = useState<DemoUser | null>(null);

  // Book reader state
  const [activeChapterId, setActiveChapterId] = useState<string>('ch01');
  const [activeSectionId, setActiveSectionId] = useState<string>('ch01-introduction');
  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  // Labs state
  const [activeLabId, setActiveLabId] = useState<string>(BOOK_LABS[0]?.id || 'lab-01');

  // Mobile sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dismissible prototype notice
  const [noticeDismissed, setNoticeDismissed] = useState(() => {
    try { return localStorage.getItem(LS_NOTICE_DISMISSED) === '1'; } catch { return false; }
  });
  const dismissNotice = useCallback(() => {
    setNoticeDismissed(true);
    try { localStorage.setItem(LS_NOTICE_DISMISSED, '1'); } catch { /* ignore */ }
  }, []);

  // Hydrate demo user from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_DEMO_USER);
      if (stored) {
        setDemoUser(JSON.parse(stored));
      }
    } catch { /* ignore */ }
  }, []);

  // Parse query params on load
  useEffect(() => {
    const qp = parseQueryParams();
    if (qp.scope && qp.scope !== 'welcome') {
      setScope(qp.scope);
    }
    if (qp.chapter && KNOWN_CHAPTER_IDS.has(qp.chapter)) {
      setActiveChapterId(qp.chapter);
    }
    if (qp.chapter && qp.section && KNOWN_CHAPTER_IDS.has(qp.chapter)) {
      setActiveSectionId(`${qp.chapter}-${qp.section}`);
    }
    if (qp.lab) setActiveLabId(qp.lab);
    if (qp.page !== undefined) setActivePageIndex(qp.page - 1);
  }, []);

  // popstate listener
  useEffect(() => {
    const handler = () => {
      const qp = parseQueryParams();
      setScope(qp.scope);
      if (qp.chapter && KNOWN_CHAPTER_IDS.has(qp.chapter)) {
        setActiveChapterId(qp.chapter);
      }
      if (qp.chapter && qp.section && KNOWN_CHAPTER_IDS.has(qp.chapter)) {
        setActiveSectionId(`${qp.chapter}-${qp.section}`);
      }
      if (qp.lab) setActiveLabId(qp.lab);
      if (qp.page !== undefined) setActivePageIndex(qp.page - 1);
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  // Navigate to a scope
  const navigateScope = useCallback((newScope: ReaderScope) => {
    setScope(newScope);
    setSidebarOpen(false);
    if (newScope === 'book') {
      const firstPage = FLAT_READER_PAGES[0];
      if (firstPage) {
        setActiveChapterId(firstPage.chapterId);
        setActiveSectionId(firstPage.sectionId);
        setActivePageIndex(0);
        writeQueryParams('book', { chapter: firstPage.chapterId, section: firstPage.sectionSlug, page: 1 });
        return;
      }
    }
    if (newScope === 'labs') {
      const firstLab = BOOK_LABS[0];
      if (firstLab) {
        setActiveLabId(firstLab.id);
        writeQueryParams('labs', { lab: firstLab.slug });
        return;
      }
    }
    writeQueryParams(newScope);
  }, []);

  // Navigate to a specific page
  const navigateToPage = useCallback((page: BookPage) => {
    setScope('book');
    setActiveChapterId(page.chapterId);
    setActiveSectionId(page.sectionId);
    setActivePageIndex(page.pageNumber - 1);
    writeQueryParams('book', {
      chapter: page.chapterId,
      section: page.sectionSlug,
      page: page.pageNumber,
    });
  }, []);

  // Navigate to a lab
  const navigateToLab = useCallback((lab: BookLab) => {
    setScope('labs');
    setActiveLabId(lab.id);
    writeQueryParams('labs', { lab: lab.slug });
  }, []);

  // Demo login
  const handleDemoLogin = useCallback((netId: string, studentId: string) => {
    const user: DemoUser = {
      netId,
      studentId,
      accessStatus: 'trial',
      createdAt: new Date().toISOString(),
    };
    setDemoUser(user);
    localStorage.setItem(LS_DEMO_USER, JSON.stringify(user));
  }, []);

  const handleSignOut = useCallback(() => {
    setDemoUser(null);
    localStorage.removeItem(LS_DEMO_USER);
  }, []);

  // Find current page from FLAT_READER_PAGES
  const currentPage = useMemo(() => {
    return FLAT_READER_PAGES.find(
      p => p.sectionId === activeSectionId && p.pageNumber === activePageIndex + 1
    ) || null;
  }, [activeSectionId, activePageIndex]);

  // Progress calculation
  const progress = useMemo(() => {
    if (!currentPage) return 0;
    const idx = PAGE_INDEX_MAP.get(currentPage.id) ?? -1;
    return FLAT_READER_PAGES.length > 0 ? ((idx + 1) / FLAT_READER_PAGES.length) * 100 : 0;
  }, [currentPage]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage?.id]);

  const currentSectionPages = useMemo(() => {
    return FLAT_READER_PAGES.filter(p => p.sectionId === activeSectionId);
  }, [activeSectionId]);

  // Navigation helpers (all using PAGE_INDEX_MAP)
  const currentIdx = currentPage ? (PAGE_INDEX_MAP.get(currentPage.id) ?? -1) : -1;

  const goNext = useCallback(() => {
    if (scope === 'book' && currentIdx >= 0 && currentIdx < FLAT_READER_PAGES.length - 1) {
      navigateToPage(FLAT_READER_PAGES[currentIdx + 1]);
    }
  }, [scope, currentIdx, navigateToPage]);

  const goPrev = useCallback(() => {
    if (scope === 'book' && currentIdx > 0) {
      navigateToPage(FLAT_READER_PAGES[currentIdx - 1]);
    }
  }, [scope, currentIdx, navigateToPage]);

  const hasNext = currentIdx >= 0 && currentIdx < FLAT_READER_PAGES.length - 1;
  const hasPrev = currentIdx > 0;
  const nextPage = hasNext ? FLAT_READER_PAGES[currentIdx + 1] : null;
  const prevPage = hasPrev ? FLAT_READER_PAGES[currentIdx - 1] : null;

  const activeLab = useMemo(() => BOOK_LABS.find(l => l.id === activeLabId) || BOOK_LABS[0], [activeLabId]);

  return (
    <Layout
      scope={scope}
      demoUser={demoUser}
      onSignOut={handleSignOut}
      sidebarOpen={sidebarOpen}
      onToggleSidebar={() => setSidebarOpen(o => !o)}
      onNavigateScope={navigateScope}
      chapters={BOOK_CHAPTERS}
      progress={progress}
      noticeDismissed={noticeDismissed}
      onDismissNotice={dismissNotice}
      activeChapterId={activeChapterId}
      activeSectionId={activeSectionId}
      activePageId={currentPage?.id || ''}
      onSelectSection={(sectionId) => {
        setActiveSectionId(sectionId);
        setActivePageIndex(0);
        const section = BOOK_CHAPTERS
          .flatMap(c => c.sections)
          .find(s => s.id === sectionId);
        if (section) {
          setActiveChapterId(section.id.split('-').slice(0, 2).join('-'));
          writeQueryParams('book', { chapter: section.pages[0]?.chapterId, section: section.slug, page: 1 });
        }
        setScope('book');
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
    >
      {scope === 'welcome' && (
        <HomePage
          onEnterReader={() => navigateScope('book')}
          onOpenLabs={() => navigateScope('labs')}
          onOpenLogin={() => navigateScope('login')}
        />
      )}
      {scope === 'login' && (
        <DemoLogin onLogin={handleDemoLogin} onCancel={() => navigateScope('welcome')} />
      )}
      {scope === 'book' && currentPage && (
        <ChapterReader
          page={currentPage}
          allPages={currentSectionPages}
          onNavigate={navigateToPage}
          hasPrev={hasPrev}
          hasNext={hasNext}
          prevPage={prevPage}
          nextPage={nextPage}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
      {scope === 'labs' && activeLab && (
        <LabsView
          labs={BOOK_LABS}
          activeLab={activeLab}
          onSelectLab={navigateToLab}
        />
      )}
    </Layout>
  );
}
