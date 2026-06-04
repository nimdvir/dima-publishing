import { BOOK_CHAPTERS, BOOK_LABS } from '../generated/bookData';

interface HomePageProps {
  onEnterReader: () => void;
  onOpenLabs: () => void;
  onOpenLogin: () => void;
}

export default function HomePage({
  onEnterReader,
  onOpenLabs,
  onOpenLogin,
}: HomePageProps) {
  const coverUrl = 'https://res.cloudinary.com/dkndq6lyz/image/upload/q_auto,f_auto/cover-5-20_ajw15x.jpg';
  const videoUrl = 'https://res.cloudinary.com/dkndq6lyz/video/upload/q_auto,f_auto,vc_auto/v1779827458/all_of_them_dcs22p.mp4';

  return (
    <div className="home-page">
      <div className="home-hero">
        {/* Cover image */}
        <div className="cover-image-card">
          <img
            src={coverUrl}
            alt="Using Data to Drive Business Performance — Book Cover"
            className="cover-img"
          />
        </div>

        {/* Video preview */}
        <div className="home-video-card">
          <h2 className="home-section-title">Course Overview</h2>
          <div className="video-wrapper">
            <video
              controls
              preload="metadata"
              poster={coverUrl}
              className="home-video"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="home-ctas">
          <button className="cta-btn cta-primary" onClick={onEnterReader}>
            <span className="cta-icon">&#x1F4D6;</span>
            Enter Reader
          </button>
          <button className="cta-btn cta-secondary" onClick={onOpenLabs}>
            <span className="cta-icon">&#x1F9EA;</span>
            Open Labs
          </button>
          <button className="cta-btn cta-outline" onClick={onOpenLogin}>
            <span className="cta-icon">&#x1F512;</span>
            Demo Login / Access
          </button>
        </div>

        {/* TOC */}
        <div className="home-toc">
          <h2 className="home-section-title">Table of Contents</h2>
          <div className="toc-list">
            {BOOK_CHAPTERS.map(ch => (
              <div key={ch.id} className="toc-chapter">
                <h3 className="toc-chapter-title">
                  {ch.id.toUpperCase()}: {ch.title}
                </h3>
                <ul className="toc-sections">
                  {ch.sections.map(sec => (
                    <li key={sec.id} className="toc-section-item">
                      {sec.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="toc-chapter">
              <h3 className="toc-chapter-title">Hands-On Labs</h3>
              <ul className="toc-sections">
                {BOOK_LABS.map(lab => (
                  <li key={lab.id} className="toc-section-item">
                    {lab.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="home-overview">
          <p>
            This online textbook takes you from raw data to better business decisions.
            You will learn how to organize data into tables, connect it with relationships,
            query it with SQL, analyze it with business intelligence tools, and apply
            managerial judgment at every step.
          </p>
          <p className="home-author">Nimrod Dvir, PhD</p>
        </div>

        <div className="home-notice">
          <strong>Reader Hybrid v1</strong> &mdash; frontend prototype.
          No backend, no real auth, no payments, no database.
        </div>
      </div>
    </div>
  );
}
