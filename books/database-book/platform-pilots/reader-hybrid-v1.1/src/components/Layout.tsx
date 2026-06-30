import type { ReactNode } from "react";
import type { ReaderScope, DemoUser, BookChapter, BookLab, BookAppendix } from "../types";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { FeedbackLink } from "./FeedbackLink";
import { Home, Menu, X, User, LogOut } from "lucide-react";

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
  onSelectPage: (page: import("../types").BookPage) => void;
  labs: BookLab[];
  activeLabId: string;
  onSelectLab: (lab: BookLab) => void;
  appendices: BookAppendix[];
  activeAppendixId: string;
  onSelectAppendix: (appendix: BookAppendix) => void;
  progress: number;
  children: ReactNode;
  isAuthenticated?: boolean;
  onOpenLogin?: () => void;
}

const SCOPE_LABELS: Record<ReaderScope, string> = {
  welcome: "Home",
  book: "Reader",
  labs: "Labs",
  appendices: "Appendices",
  login: "Sign in",
  admin: "Admin",
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
  appendices,
  activeAppendixId,
  onSelectAppendix,
  progress,
  children,
  isAuthenticated = false,
  onOpenLogin,
}: LayoutProps) {
  return (
    <div className="app-shell">
      {/* Skip link — first focusable element for keyboard users */}
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <button
            className="hamburger"
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="header-brand">
            <button
              className="home-btn"
              onClick={() => onNavigateScope("welcome")}
              title="Home"
            >
              <Home size={18} />
            </button>
            <span className="brand-publisher">
              Using <span className="brand-highlight">Data</span> to Drive{" "}
              <span className="brand-highlight">Performance</span>
            </span>
            <span className="brand-scope">{SCOPE_LABELS[scope]}</span>
          </div>
          <div className="header-right">
            {demoUser ? (
              <div className="user-chip">
                <User size={14} className="user-avatar" />
                <span className="user-name">{demoUser.netId}</span>
                <button
                  className="sign-out-btn"
                  onClick={onSignOut}
                  title="Sign out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                className="header-login-btn"
                onClick={() => onNavigateScope("login")}
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Progress bar */}
      {scope === "book" && (
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
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
            appendices={appendices}
            activeAppendixId={activeAppendixId}
            onSelectAppendix={onSelectAppendix}
            onClose={() => {}}
            isAuthenticated={isAuthenticated}
            onOpenLogin={onOpenLogin}
          />
        </aside>

        {/* Mobile nav */}
        <MobileNav open={sidebarOpen} onClose={() => onToggleSidebar()}>
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
            appendices={appendices}
            activeAppendixId={activeAppendixId}
            onSelectAppendix={onSelectAppendix}
            onClose={() => onToggleSidebar()}
            isAuthenticated={isAuthenticated}
            onOpenLogin={onOpenLogin}
          />
        </MobileNav>

        {/* Main content */}
        <main className="main-content" id="main-content">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-brand">
          <img
            className="footer-logo"
            src="https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto/q_auto/v1/Dima-publishing/dima-publishing-logo/icon-192x192.png?_a=BAMAAAX00"
            alt="DIMA Publishing"
          />
          <span className="footer-copyright">
            &copy; {new Date().getFullYear()} DIMA Publishing. All rights
            reserved.
          </span>
        </div>
        <span className="footer-updated">Last updated June 17, 2026</span>
      </footer>

      {/* Feedback — floating report button */}
      {scope !== "welcome" && scope !== "login" && <FeedbackLink />}
    </div>
  );
}
