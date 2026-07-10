import { BookOpen, LogIn, Database, Layers, BarChart3, Video, ListTree, ArrowDown, ClipboardCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import AnimatedBookCover from './AnimatedBookCover';
import { COURSE_OUTLINE } from '../content/courseOutline';

interface HomePageProps {
  onEnterReader: () => void;
  onOpenLogin: () => void;
  onOpenChapter: (chapterId: string) => void;
}

const FEATURE_CARDS = [
  {
    icon: Database,
    title: 'Build the Foundation',
    description: 'Understand how data, information systems, and business performance connect.',
  },
  {
    icon: Layers,
    title: 'Design and Query Data',
    description: 'Move from records to tables, relationships, SQL, and reliable database structures.',
  },
  {
    icon: ClipboardCheck,
    title: 'Practice With Labs',
    description: 'Apply each chapter through guided practice and the PetVax Veterinary Clinic labs.',
  },
  {
    icon: BarChart3,
    title: 'Analyze for Decisions',
    description: 'Turn data into dashboards, insights, and managerial action.',
  },
];

const CHAPTER_STRUCTURE = [
  {
    title: 'Introduction',
    description: "What you'll learn and why it matters.",
  },
  {
    title: 'Core Concepts',
    description: 'The main text with examples, figures, and callouts.',
  },
  {
    title: "Let's Build and Hands-On Lab",
    description: 'Use guided Grading Database practice, then transfer the ideas through the PetVax Veterinary Clinic lab.',
  },
  {
    title: 'Review and Reflection Questions',
    description: 'Check understanding and connect the key ideas to business situations.',
  },
  {
    title: 'Terms Treasury',
    description: 'Essential vocabulary, definitions, and business context.',
  },
  {
    title: 'RAT: Reading Assessment Test',
    description: "A readiness assessment to confirm you're prepared.",
  },
];

export default function HomePage({
  onEnterReader,
  onOpenLogin,
  onOpenChapter,
}: HomePageProps) {
  const coverUrl = 'https://res.cloudinary.com/dkndq6lyz/image/upload/f_auto,q_auto/bitm330book/0-cover-image/ch00-cover-art2-cropped.gif';
  const overviewVideoEmbedUrl = 'https://www.youtube-nocookie.com/embed/TjJoWX4vgFs?si=o2BuKL6jeGqtBfTS';
  const reducedMotion = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Trigger title highlight sweep animation once on mount
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.add("animate-title");
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: reducedMotion ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: reducedMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut' as const, delay },
  });

  const scrollToOutline = () => {
    document.getElementById('inside-the-book')?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero-copy">
          <motion.p className="home-prototype-label" {...fadeUp(0)}>
            Digital Textbook
          </motion.p>
          <motion.h1 id="home-title" className="home-book-title" ref={titleRef} {...fadeUp(0.06)}>
            Using Data to Drive Business Performance
          </motion.h1>
          <motion.p className="home-subtitle" {...fadeUp(0.12)}>
            Databases, Information Systems, Analytics, and Managerial Decision-Making
          </motion.p>
          <motion.p className="home-author" {...fadeUp(0.16)}>
            Nimrod Dvir, PhD
          </motion.p>
          <motion.p className="home-description" {...fadeUp(0.2)}>
            Using Data to Drive Business Performance is an applied introduction to databases,
            information systems, analytics, and managerial decision-making. The book teaches
            students how data moves from raw records into structured tables, relationships,
            queries, dashboards, and business decisions.
          </motion.p>
          <motion.p className="home-description" {...fadeUp(0.23)}>
            Through examples, labs, review activities, and recurring case studies, students
            learn not only how database systems work, but why they matter for organizational
            performance, strategic thinking, and better decision-making.
          </motion.p>
          <motion.div className="home-ctas" {...fadeUp(0.27)}>
            <button className="cta-btn cta-primary" onClick={onEnterReader}>
              <BookOpen size={18} className="cta-icon" />
              Enter Reader
            </button>
            <button className="cta-btn cta-secondary" onClick={scrollToOutline}>
              <ArrowDown size={18} className="cta-icon" />
              View Book Outline
            </button>
            <button className="cta-btn cta-outline" onClick={onOpenLogin}>
              <LogIn size={18} className="cta-icon" />
              Sign in
            </button>
          </motion.div>
        </div>
        <div className="home-cover-column">
          <AnimatedBookCover coverUrl={coverUrl} />
        </div>
      </section>

      <section className="home-features" aria-label="Book learning arc">
        {FEATURE_CARDS.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              className="home-feature-card"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={reducedMotion ? undefined : { y: -5, scale: 1.01 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.35, ease: 'easeOut', delay: 0.12 + index * 0.07 }
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
          Textbook Overview Video
        </h2>
        <div className="home-video-frame">
          <iframe
            className="home-video-iframe"
            src={overviewVideoEmbedUrl}
            title="Using Data to Drive Business Performance: Textbook Overview Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>

      <section className="home-outline" id="inside-the-book" aria-labelledby="inside-book-title">
        <h2 id="inside-book-title" className="home-section-title">
          <ListTree size={16} className="cta-icon" />
          Inside the Book
        </h2>
        <div className="outline-grid">
          {COURSE_OUTLINE.map((chapter, index) => {
            const chapterId = `ch${chapter.chapter}`;
            return (
            <motion.article
              key={chapter.chapter}
              className="outline-card outline-card--interactive"
              role="button"
              tabIndex={0}
              aria-label={`Open Chapter ${chapter.chapter}: ${chapter.title}`}
              onClick={() => onOpenChapter(chapterId)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpenChapter(chapterId);
                }
              }}
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.3, ease: 'easeOut', delay: 0.03 * index }
              }
            >
              <span className="outline-number">{chapter.chapter}</span>
              <div className="outline-copy">
                <h3 className="outline-title">{chapter.title}</h3>
                <p className="outline-subtitle">{chapter.subtitle}</p>
                <p className="outline-focus">{chapter.focus}</p>
              </div>
            </motion.article>
            );
          })}
        </div>
      </section>

      <section className="home-chapter-structure" aria-labelledby="chapter-structure-title">
        <div className="chapter-structure-heading">
          <h2 id="chapter-structure-title" className="home-section-title">
            <BookOpen size={16} className="cta-icon" />
            What's Inside Each Chapter
          </h2>
          <p>
            Chapters are designed around a recurring learning structure so students can
            move from explanation to guided building, hands-on lab transfer, review,
            vocabulary, and readiness checks.
          </p>
        </div>
        <div className="chapter-structure-grid">
          {CHAPTER_STRUCTURE.map((item, index) => (
            <motion.article
              key={item.title}
              className="chapter-structure-card"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.28, ease: 'easeOut', delay: 0.04 * index }
              }
            >
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.article>
          ))}
        </div>
        <p className="chapter-structure-note">
          The hands-on lab is part of the chapter's learning path, not an add-on. It uses
          the PetVax Veterinary Clinic project so students transfer the same database
          logic into a second business setting.
        </p>
      </section>

      <section className="home-final-cta" aria-labelledby="home-final-title">
        <h2 id="home-final-title">Start learning how data becomes business performance.</h2>
        <div className="home-final-actions">
          <button className="cta-btn cta-primary" onClick={onEnterReader}>
            <BookOpen size={18} className="cta-icon" />
            Start Reading
          </button>
          <button className="cta-btn cta-outline" onClick={onOpenLogin}>
            <LogIn size={18} className="cta-icon" />
            Sign in / Create account
          </button>
        </div>
      </section>
    </div>
  );
}
