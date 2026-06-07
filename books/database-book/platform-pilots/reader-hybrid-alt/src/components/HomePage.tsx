import type { ReaderScope } from "../types";

type HomePageProps = {
  onNavigateScope: (scope: ReaderScope) => void;
};

export function HomePage({ onNavigateScope }: HomePageProps) {
  return (
    <section className="home-view">
      <div className="home-copy">
        <p className="eyebrow">Frontend Prototype</p>
        <h1>Using Data to Drive Business Performance</h1>
        <p className="subtitle">
          Databases, information systems, analytics, and managerial decision-making.
        </p>
        <p className="author">Nimrod Dvir, PhD</p>
        <div className="home-actions">
          <button className="button button-primary" type="button" onClick={() => onNavigateScope("book")}>
            Enter Reader
          </button>
          <button className="button" type="button" onClick={() => onNavigateScope("labs")}>
            Open Labs
          </button>
          <button className="button" type="button" onClick={() => onNavigateScope("ai-assistant")}>
            Try AI Assistant
          </button>
          <button className="button button-secondary" type="button" onClick={() => onNavigateScope("login")}>
            Demo Login / Access
          </button>
        </div>
      </div>

      <div className="cover-art" aria-label="CSS book cover for Using Data to Drive Business Performance">
        <div className="cover-spine"></div>
        <div className="cover-grid">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="cover-title">
          <small>Using Data to</small>
          <strong>Drive Business Performance</strong>
        </div>
        <div className="cover-diagram">
          <i></i>
          <i></i>
          <i></i>
        </div>
        <p>DIMA Publishing</p>
      </div>

      <div className="overview-band">
        <div>
          <strong>Source-backed reader</strong>
          <span>Chapters 1-4 are generated from the canonical Markdown folders.</span>
        </div>
        <div>
          <strong>Page-break aware</strong>
          <span>Author page-break markers drive reader pages; headings stay inside pages.</span>
        </div>
        <div>
          <strong>Comparison build</strong>
          <span>No backend, no payment, no database, no live AI, and no real auth.</span>
        </div>
      </div>
    </section>
  );
}
