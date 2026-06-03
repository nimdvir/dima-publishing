import type { ReactNode } from "react";

type LayoutProps = {
  bookTitle: string;
  sidebar: ReactNode;
  mobileNav: ReactNode;
  isSidebarOpen: boolean;
  children: ReactNode;
};

export function Layout({
  bookTitle,
  sidebar,
  mobileNav,
  isSidebarOpen,
  children,
}: LayoutProps) {
  return (
    <div className="app-layout">
      {mobileNav}
      <aside
        className={`sidebar${isSidebarOpen ? " sidebar-open" : ""}`}
        aria-label="Book navigation"
      >
        <div className="sidebar-header">
          <p className="sidebar-book-title">{bookTitle}</p>
        </div>
        {sidebar}
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}
