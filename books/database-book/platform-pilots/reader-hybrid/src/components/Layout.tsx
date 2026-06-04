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
  onSelectSection: (sectionId: string) => void;
  onSelectPage: (page: import('../types').BookPage) => void;
  labs: BookLab[];
  activeLabId: string;
  onSelectLab: (lab: BookLab) => void;
  children: ReactNode;
}

const SCOPE_LABELS: Record<ReaderScope, string> = {
  welcome: 'Home',
  book: 'Reader',
  labs: 'Labs',
  'ai-assistant': 'AI Assistant',
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
  onSelectSection,
  onSelectPage,
  labs,
  activeLabId,
  onSelectLab,
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

      <div className="app-body">
        {/* Desktop sidebar */}
        <aside className="sidebar desktop-sidebar">
          <Sidebar
            scope={scope}
            onNavigateScope={onNavigateScope}
            chapters={chapters}
            activeChapterId={activeChapterId}
            activeSectionId={activeSectionId}
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
