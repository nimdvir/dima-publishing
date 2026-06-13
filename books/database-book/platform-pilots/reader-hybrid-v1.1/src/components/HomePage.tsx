import { BOOK_CHAPTERS, BOOK_LABS } from '../generated/bookData';
import { BookOpen, FlaskConical, LogIn, Database, Layers, BarChart3, Video, ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import AnimatedBookCover from './AnimatedBookCover';

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
  const coverUrl = 'https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto/bitm330book/0-cover-image/ch00-cover-art2-cropped.gif';
  const videoUrl = 'https://res.cloudinary.com/dkndq6lyz/video/upload/q_auto,f_auto,vc_auto/v1779827458/all_of_them_dcs22p.mp4';
  const videoPosterUrl = 'https://res.cloudinary.com/dkndq6lyz/image/upload/q_auto,f_auto/cover-5-20_ajw15x.jpg';
  const reducedMotion = useReducedMotion();

  const fadeUp = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: reducedMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut' as const, delay },
  });

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <motion.p className="home-prototype-label" {...fadeUp(0)}>
            Frontend Prototype
          </motion.p>
          <motion.h1 id="home-title" className="home-book-title" {...fadeUp(0.06)}>
            Using Data to Drive Business Performance
          </motion.h1>
          <motion.p className="home-subtitle" {...fadeUp(0.12)}>
            Databases, information systems, analytics, and managerial decision-making.
          </motion.p>
          <motion.p className="home-author" {...fadeUp(0.16)}>
            Nimrod Dvir, PhD
          </motion.p>
          <motion.p className="home-description" {...fadeUp(0.2)}>
            Using Data to Drive Business Performance is an applied introduction to databases,
            information systems, analytics, and managerial decision-making. The book teaches
            students how data moves from raw records into structured tables, relationships,
            queries, dashboards, and business decisions. Through examples, labs, and review
            activities, students learn not only how database systems work, but why they matter
            for organizational performance.
          </motion.p>
          <motion.div className="home-ctas" {...fadeUp(0.26)}>
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
          </motion.div>
        </div>
        <div className="home-cover-column">
          <AnimatedBookCover coverUrl={coverUrl} />
        </div>
      </section>

      <section className="home-features" aria-label="Reader features">
        {FEATURE_CARDS.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              className="home-feature-card"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={reducedMotion ? undefined : { y: -3 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.35, ease: 'easeOut', delay: 0.32 + index * 0.06 }
              }
            >
              <div className="feature-icon-wrap">
                <Icon size={22} className="feature-icon" />
              </div>
              <h3 className="feature-title">{card.title}</h3>
              <p className="feature-desc">{card.description}</p>
            </motion.div>
          );
        })}
      </section>

      <section className="home-video-card" aria-labelledby="overview-video-title">
        <h2 id="overview-video-title" className="home-section-title">
          <Video size={16} className="cta-icon" />
          Course Overview Video
        </h2>
        <div className="home-video-frame">
          <video
            controls
            preload="metadata"
            poster={videoPosterUrl}
            className="home-video"
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        </div>
      </section>

      <section className="home-toc" aria-labelledby="toc-title">
        <h2 id="toc-title" className="home-section-title">Table of Contents</h2>
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
      </section>

      <div className="home-notice">
        <strong>Reader Hybrid v1.1</strong> frontend prototype. No backend, no real auth,
        no payments, no database.
      </div>
    </div>
  );
}
