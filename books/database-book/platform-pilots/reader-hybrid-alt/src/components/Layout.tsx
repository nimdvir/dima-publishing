import type { ReactNode } from "react";
import { MobileNav } from "./MobileNav";
import { Sidebar } from "./Sidebar";
import type { BookChapter, BookLab, BookPage, DemoUser, ReaderScope } from "../types";

type LayoutProps = {
  children: ReactNode;
  scope: ReaderScope;
  chapters: BookChapter[];
  labs: BookLab[];
  activePage: BookPage | null;
  activeLab: BookLab | null;
  demoUser: DemoUser | null;
  onNavigateScope: (scope: ReaderScope) => void;
  onNavigatePage: (pageId: string) => void;
  onNavigateLab: (labId: string) => void;
  onSignOut: () => void;
};

const scopeLabels: Record<ReaderScope, string> = {
  welcome: "Welcome",
  book: "Reader",
  labs: "Labs",
  "ai-assistant": "AI Assistant",
  login: "Demo Access",
};

export function Layout({
  children,
  scope,
  chapters,
  labs,
  activePage,
  activeLab,
  demoUser,
  onNavigateScope,
  onNavigatePage,
  onNavigateLab,
  onSignOut,
}: LayoutProps) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="topbar">
        <button className="brand-button" type="button" onClick={() => onNavigateScope("welcome")}>
          <span className="brand-mark">D</span>
          <span>
            <strong>DIMA Publishing</strong>
            <small>{scopeLabels[scope]}</small>
          </span>
        </button>

        <div className="topbar-actions">
          {demoUser ? (
            <div className="user-chip">
              <span>{demoUser.netId.slice(0, 2).toUpperCase()}</span>
              <div>
                <strong>{demoUser.netId}</strong>
                <small>{demoUser.accessStatus}</small>
              </div>
              <button type="button" onClick={onSignOut}>Sign out</button>
            </div>
          ) : (
            <button className="button button-secondary" type="button" onClick={() => onNavigateScope("login")}>
              Demo Login
            </button>
          )}

          <MobileNav
            scope={scope}
            chapters={chapters}
            labs={labs}
            activePage={activePage}
            activeLab={activeLab}
            onNavigateScope={onNavigateScope}
            onNavigatePage={onNavigatePage}
            onNavigateLab={onNavigateLab}
          />
        </div>
      </header>

      <div className="workspace">
        <Sidebar
          scope={scope}
          chapters={chapters}
          labs={labs}
          activePage={activePage}
          activeLab={activeLab}
          onNavigateScope={onNavigateScope}
          onNavigatePage={onNavigatePage}
          onNavigateLab={onNavigateLab}
        />

        <main id="main-content" className="main-panel">
          {children}
        </main>
      </div>
    </div>
  );
}
