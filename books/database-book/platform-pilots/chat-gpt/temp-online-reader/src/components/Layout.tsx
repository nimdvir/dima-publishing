import type { ReactNode } from "react";

type LayoutProps = {
  bookTitle: string;
  bookSubtitle: string;
  sidebar: ReactNode;
  sidebarOpen: boolean;
  onOpenSidebar: () => void;
  onCloseSidebar: () => void;
  children: ReactNode;
};

export function Layout({
  bookTitle,
  bookSubtitle,
  sidebar,
  sidebarOpen,
  onOpenSidebar,
  onCloseSidebar,
  children,
}: LayoutProps) {
  return (
    <div className="reader-shell">
      <a className="skip-link" href="#reader-main">Skip to reader content</a>
      <header className="topbar">
        <button className="menu-button" type="button" onClick={onOpenSidebar} aria-label="Open chapter navigation">
          Menu
        </button>
        <div>
          <p className="eyebrow">Database Book</p>
          <h1>{bookTitle}</h1>
          <p>{bookSubtitle}</p>
        </div>
      </header>

      <div className="reader-layout">
        <aside className="sidebar desktop-sidebar">{sidebar}</aside>
        <main id="reader-main" className="reader-main" tabIndex={-1}>{children}</main>
      </div>

      {sidebarOpen && (
        <div className="mobile-sidebar" role="dialog" aria-modal="true" aria-label="Chapter navigation">
          <div className="mobile-sidebar-panel">
            <button className="close-button" type="button" onClick={onCloseSidebar}>
              Close
            </button>
            {sidebar}
          </div>
        </div>
      )}
    </div>
  );
}
