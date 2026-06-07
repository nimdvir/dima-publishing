import type { ReactNode } from 'react';
import type { ReaderScope, DemoUser, BookChapter, BookLab } from '../types';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { Home, Menu, X, User, LogOut } from 'lucide-react';

interface LayoutProps {
  scope: ReaderScope;
  demoUser: DemoUser | null;
  onSignOut: () => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onNavigateScope: (scope: ReaderScope) => void;
  chapters: BookChapter[];
  activeChapterId: string;
  activeSectionId: string;
  activePageId: string;
  onSelectSection: (sectionId: string) => void;
  onSelectPage: (page: import('../types').BookPage) => void;
  labs: BookLab[];
  activeLabId: string;
  onSelectLab: (lab: BookLab) => void;
  progress: number;
  noticeDismissed: boolean;
  onDismissNotice: () => void;
  children: ReactNode;
}

const SCOPE_LABELS: Record<ReaderScope, string> = {
  welcome: 'Home',
  book: 'Reader',
  labs: 'Labs',
  login: 'Login / Access',
};

export default function Layout({
  scope,
  demoUser,
  onSignOut,
  sidebarOpen,
  onToggleSidebar,
  onNavigateScope,
  chapters,
  activeChapterId,
  activeSectionId,
  activePageId,
  onSelectSection,
  onSelectPage,
  labs,
  activeLabId,
  onSelectLab,
  progress,
  noticeDismissed,
  onDismissNotice,
  children,
}: LayoutProps) {
  return (
    <div className="app-shell">
      {/* Skip link — first focusable element for keyboard users */}
      <a className="skip-link" href="#main-content">Skip to main content</a>

      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <button
            className="hamburger"
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="header-brand">
            <button className="home-btn" onClick={() => onNavigateScope('welcome')} title="Home">
              <Home size={18} />
            </button>
            <span className="brand-publisher">DIMA Publishing</span>
            <span className="brand-scope">{SCOPE_LABELS[scope]}</span>
          </div>
          <div className="header-right">
            {demoUser ? (
              <div className="user-chip">
                <User size={14} className="user-avatar" />
                <span className="user-name">{demoUser.netId}</span>
                <button className="sign-out-btn" onClick={onSignOut} title="Sign out">
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button className="header-login-btn" onClick={() => onNavigateScope('login')}>
                Login / Access
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      {scope === 'book' && (
        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      <div className="app-body">
        {/* Desktop sidebar */}
        <aside className="sidebar desktop-sidebar">
          <Sidebar
            scope={scope}
            onNavigateScope={onNavigateScope}
            chapters={chapters}
            activeChapterId={activeChapterId}
            activeSectionId={activeSectionId}
            activePageId={activePageId}
            onSelectSection={onSelectSection}
            onSelectPage={onSelectPage}
            labs={labs}
            activeLabId={activeLabId}
            onSelectLab={onSelectLab}
            onClose={() => {}}
          />
        </aside>

        {/* Mobile nav */}
        <MobileNav
          open={sidebarOpen}
          onClose={() => onToggleSidebar()}
        >
          <Sidebar
            scope={scope}
            onNavigateScope={onNavigateScope}
            chapters={chapters}
            activeChapterId={activeChapterId}
            activeSectionId={activeSectionId}
            activePageId={activePageId}
            onSelectSection={onSelectSection}
            onSelectPage={onSelectPage}
            labs={labs}
            activeLabId={activeLabId}
            onSelectLab={onSelectLab}
            onClose={() => onToggleSidebar()}
          />
        </MobileNav>

        {/* Main content */}
        <main className="main-content" id="main-content">
          {children}
        </main>
      </div>

      {/* Prototype notice — dismissible */}
      {!noticeDismissed && (
        <div className="prototype-notice is-visible">
          <span>Frontend prototype only &mdash; no real auth, payments, or production infrastructure.</span>
          <button className="notice-dismiss" onClick={onDismissNotice} aria-label="Dismiss notice">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
