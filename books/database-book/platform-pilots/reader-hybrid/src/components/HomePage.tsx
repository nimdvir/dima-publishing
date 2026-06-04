interface HomePageProps {
  onEnterReader: () => void;
  onOpenLabs: () => void;
  onOpenAI: () => void;
  onOpenLogin: () => void;
}

export default function HomePage({
  onEnterReader,
  onOpenLabs,
  onOpenAI,
  onOpenLogin,
}: HomePageProps) {
  return (
    <div className="home-page">
      <div className="home-hero">
        {/* CSS-only cover card */}
        <div className="cover-card">
          <div className="cover-card-inner">
            <div className="cover-publisher">DIMA Publishing</div>
            <div className="cover-swoosh" />
            <h1 className="cover-title">
              Using Data to Drive Business Performance
            </h1>
            <div className="cover-subtitle">
              Databases, Information Systems, Analytics, and Managerial Decision-Making
            </div>
            <div className="cover-author">Nimrod Dvir, PhD</div>
            <div className="cover-accent-line" />
          </div>
        </div>

        <div className="home-overview">
          <p>
            This online textbook takes you from raw data to better business decisions.
            You will learn how to organize data into tables, connect it with relationships,
            query it with SQL, analyze it with business intelligence tools, and apply
            managerial judgment at every step.
          </p>
        </div>

        <div className="home-ctas">
          <button className="cta-btn cta-primary" onClick={onEnterReader}>
            <span className="cta-icon">&#x1F4D6;</span>
            Enter Reader
          </button>
          <button className="cta-btn cta-secondary" onClick={onOpenLabs}>
            <span className="cta-icon">&#x1F9EA;</span>
            Open Labs
          </button>
          <button className="cta-btn cta-secondary" onClick={onOpenAI}>
            <span className="cta-icon">&#x1F916;</span>
            Try AI Assistant
          </button>
          <button className="cta-btn cta-outline" onClick={onOpenLogin}>
            <span className="cta-icon">&#x1F512;</span>
            Demo Login / Access
          </button>
        </div>

        <div className="home-notice">
          <strong>Reader Hybrid v1</strong> &mdash; frontend prototype.
          No backend, no real auth, no payments, no database.
        </div>
      </div>
    </div>
  );
}
