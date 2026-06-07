import { BOOK_CHAPTERS, BOOK_LABS } from '../generated/bookData';
import { BookOpen, FlaskConical, LogIn, Database, Layers, BarChart3, Video, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onEnterReader: () => void;
  onOpenLabs: () => void;
  onOpenLogin: () => void;
}

const FEATURE_CARDS = [
  {
    icon: Database,
    title: 'Learn the structure',
    description: 'Data, tables, relationships, and SQL.',
  },
  {
    icon: Layers,
    title: 'Practice the workflow',
    description: 'Labs, examples, and applied exercises.',
  },
  {
    icon: BarChart3,
    title: 'Think like a manager',
    description: 'Analytics, systems, and decisions.',
  },
];

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
        {/* ── Cover image (top) ── */}
        <div className="cover-image-card">
          <img
            src={coverUrl}
            alt="Using Data to Drive Business Performance — Book Cover"
            className="cover-img"
          />
        </div>

        {/* ── Hero section ── */}
        <div className="home-hero-card">
          <p className="home-prototype-label">Frontend Prototype</p>
          <h1 className="home-book-title">Using Data to Drive Business Performance</h1>
          <p className="home-subtitle">
            Databases, information systems, analytics, and managerial decision-making.
          </p>
          <p className="home-author">Nimrod Dvir, PhD</p>
        </div>

        {/* ── Book description ── */}
        <div className="home-description-card">
          <p>
            <em>Using Data to Drive Business Performance</em> is an applied introduction
            to databases, information systems, analytics, and managerial decision-making.
            The book teaches students how data moves from raw records into structured
            tables, relationships, queries, dashboards, and business decisions. Through
            examples, labs, and review activities, students learn not only how database
            systems work, but why they matter for organizational performance.
          </p>
        </div>

        {/* ── Feature cards ── */}
        <div className="home-features">
          {FEATURE_CARDS.map(card => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="home-feature-card">
                <div className="feature-icon-wrap">
                  <Icon size={22} className="feature-icon" />
                </div>
                <h3 className="feature-title">{card.title}</h3>
                <p className="feature-desc">{card.description}</p>
              </div>
            );
          })}
        </div>

        {/* ── CTA buttons ── */}
        <div className="home-ctas">
          <button className="cta-btn cta-primary" onClick={onEnterReader}>
            <BookOpen size={18} className="cta-icon" />
            Enter Reader
          </button>
          <button className="cta-btn cta-secondary" onClick={onOpenLabs}>
            <FlaskConical size={18} className="cta-icon" />
            Open Labs
          </button>
          <button className="cta-btn cta-outline" onClick={onOpenLogin}>
            <LogIn size={18} className="cta-icon" />
            Demo Login / Access
          </button>
        </div>

        {/* ── Video preview ── */}
        <div className="home-video-card">
          <h2 className="home-section-title">
            <Video size={16} className="cta-icon" />
            Course Overview Video
          </h2>
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

        {/* ── Table of Contents ── */}
        <div className="home-toc">
          <h2 className="home-section-title">Table of Contents</h2>
          <div className="toc-list">
            {BOOK_CHAPTERS.map(ch => (
              <div key={ch.id} className="toc-chapter">
                <div className="toc-chapter-title-row">
                  <ChevronRight size={14} className="toc-chevron" />
                  <h3 className="toc-chapter-title">
                    {ch.id.toUpperCase()}: {ch.title}
                  </h3>
                </div>
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
              <div className="toc-chapter-title-row">
                <FlaskConical size={14} className="toc-chevron" />
                <h3 className="toc-chapter-title">Hands-On Labs</h3>
              </div>
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

        {/* ── Overview ── */}
        <div className="home-overview">
          <p>
            This online textbook takes you from raw data to better business decisions.
            You will learn how to organize data into tables, connect it with relationships,
            query it with SQL, analyze it with business intelligence tools, and apply
            managerial judgment at every step.
          </p>
          <p className="home-author">Nimrod Dvir, PhD</p>
        </div>

        {/* ── Notice ── */}
        <div className="home-notice">
          <strong>Reader Hybrid v1.1</strong> &mdash; frontend prototype.
          No backend, no real auth, no payments, no database.
        </div>
      </div>
    </div>
  );
}
