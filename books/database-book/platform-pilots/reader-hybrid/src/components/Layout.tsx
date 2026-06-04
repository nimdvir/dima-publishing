import type { ReactNode } from 'react';
import type { ReaderScope, DemoUser, BookChapter, BookLab } from '../types';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

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
  children,
}: LayoutProps) {
  return (
    <div className="app-shell">
      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <button
            className="hamburger"
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
          <div className="header-brand">
            <button className="home-btn" onClick={() => onNavigateScope('welcome')} title="Home">
              &#x2302;
            </button>
            <span className="brand-publisher">DIMA Publishing</span>
            <span className="brand-scope">{SCOPE_LABELS[scope]}</span>
          </div>
          <div className="header-right">
            {demoUser ? (
              <div className="user-chip">
                <span className="user-avatar">&#x1F464;</span>
                <span className="user-name">{demoUser.netId}</span>
                <button className="sign-out-btn" onClick={onSignOut} title="Sign out">
                  &#x2715;
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
        <main className="main-content">
          {children}
        </main>
      </div>

      {/* Prototype notice */}
      <div className="prototype-notice is-visible">
        Frontend prototype only &mdash; no real auth, payments, or production infrastructure.
      </div>
    </div>
  );
}
