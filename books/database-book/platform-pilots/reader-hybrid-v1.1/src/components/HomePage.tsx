import {
  BookOpen,
  LogIn,
  Database,
  Layers,
  BarChart3,
  Video,
  ListTree,
  ClipboardCheck,
  ChevronRight,
  FlaskConical,
  FileCode2,
  Wrench,
  FolderDown,
  Target,
  RefreshCw,
  Bot,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import AnimatedBookCover from './AnimatedBookCover';
import { COURSE_OUTLINE } from '../content/courseOutline';

interface HomePageProps {
  onEnterReader: () => void;
  onOpenLogin: () => void;
  onOpenChapter: (chapterId: string) => void;
}

const ARC_STAGES = ['Data', 'Tables', 'Relationships', 'Queries', 'Analytics', 'Decisions'];

const COURSEWARE_ITEMS = [
  { icon: BookOpen, text: 'The complete digital textbook (16 chapters, mapped to a 15-week semester)' },
  { icon: FlaskConical, text: 'Database laboratories with auto-gradable assessments' },
  { icon: FileCode2, text: 'SQL exercises and sample databases' },
  { icon: Wrench, text: 'Microsoft Access, SQLite, PostgreSQL, and Supabase materials' },
  { icon: FolderDown, text: 'Downloadable datasets and starter files' },
  { icon: Target, text: 'Guided semester project materials' },
  { icon: RefreshCw, text: 'Platform access with ongoing updates and corrected editions' },
  { icon: Bot, text: 'AI agents integrated directly into labs: students learn to work with AI responsibly, not around it' },
];

const TOOL_ROWS = [
  { tool: 'SQLite', use: 'Lightweight, real SQL from day one' },
  { tool: 'Supabase (PostgreSQL)', use: 'Modern cloud-native databases' },
  { tool: 'Microsoft Access', use: 'The desktop standard curricula still require' },
  { tool: 'Power BI', use: 'Business intelligence and dashboarding' },
  { tool: 'Google Sheets, Forms & Colab', use: 'Data collection and analysis' },
  { tool: 'Lucidchart & Mermaid', use: 'ER modeling and diagramming' },
  { tool: 'AI agents in the labs', use: 'Responsible, hands-on AI-assisted work' },
];

const STUDENT_QUOTES = [
  '"I understand the terms, but not how they connect."',
  '"We learn SQL, but I do not know why it matters."',
  '"I can follow the steps, but I still do not see the bigger picture."',
  '"We use the tools, but I want to know how they fit together in a real business setting."',
];

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
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Trigger title highlight sweep animation once on mount
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.add("animate-title");
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const intervalId = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % STUDENT_QUOTES.length);
    }, 3200);
    return () => window.clearInterval(intervalId);
  }, [reducedMotion]);

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
            Digital Textbook
          </motion.p>
          <motion.h1 id="home-title" className="home-book-title" ref={titleRef} {...fadeUp(0.06)}>
            Turn Messy Data into Business Performance
          </motion.h1>
          <motion.p className="home-subtitle" {...fadeUp(0.12)}>
            Interactive courseware that teaches business students how to transform raw data
            into structured databases, reliable queries, trustworthy systems, meaningful
            reports, strategic decisions, and career-ready evidence of data fluency.
          </motion.p>
          <motion.p className="home-author" {...fadeUp(0.16)}>
            <em>Using Data to Drive Business Performance</em> · Nimrod Dvir, PhD
          </motion.p>
          <motion.div className="home-ctas" {...fadeUp(0.27)}>
            <button className="cta-btn cta-primary" onClick={onEnterReader}>
              <BookOpen size={18} className="cta-icon" />
              Start Reading
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

      <section
        className="home-arc-strip"
        aria-label="Learning arc: Data, Tables, Relationships, Queries, Analytics, Decisions"
      >
        <div className="arc-track">
          {ARC_STAGES.map((stage, index) => (
            <span className="arc-stage" key={stage}>
              <span className="arc-pill">{stage}</span>
              {index < ARC_STAGES.length - 1 && (
                <ChevronRight size={18} className="arc-arrow" aria-hidden="true" />
              )}
            </span>
          ))}
        </div>
        <p className="arc-caption">
          One cumulative arc, start to finish: recognize data, organize it, connect it,
          question it, communicate it, decide with it.
        </p>
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

      <section className="home-pitch" aria-label="Book pitch">
        <p>
          This book teaches business students how to turn messy data into structured
          databases, reliable queries, trustworthy systems, meaningful reports, strategic
          decisions, and career-ready evidence of data fluency.
        </p>
      </section>

      <section className="home-courseware" aria-labelledby="courseware-title">
        <h2 id="courseware-title" className="home-section-title">
          <Layers size={16} className="cta-icon" />
          A Courseware Platform, Not "Just a Book"
        </h2>
        <p className="home-section-intro">
          One integrated learning system replaces the stack of resources instructors
          normally have to stitch together:
        </p>
        <div className="courseware-grid">
          {COURSEWARE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.text}
                className="courseware-card"
                initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 0.3, ease: 'easeOut', delay: 0.04 * index }
                }
              >
                <div className="courseware-icon-wrap">
                  <Icon size={20} className="courseware-icon" />
                </div>
                <p>{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="home-why" aria-labelledby="why-title">
        <h2 id="why-title" className="home-section-title">
          <Database size={16} className="cta-icon" />
          Why This Exists
        </h2>
        <div className="home-why-prose">
          <p>
            For years, no textbook on the market satisfied what a modern business database
            course actually needs. Existing options are <strong>overpriced</strong>{' '}
            (often well over the cost students should have to pay), <strong>outdated</strong> (built almost entirely
            around a single legacy desktop tool), and <strong>incomplete</strong> (either
            theory manuals without business context, or software manuals without theory).
          </p>
          <p>
            The evidence is visible in how peer programs cope: many business schools end
            up assigning <em>two-book bundles</em>, a theory text plus a separate
            Microsoft Access manual, because no single resource
            integrates database theory, SQL, modern tools, and business context.
          </p>
          <p>Students feel the gap too. The most common things they report:</p>
          <div className="home-quote-rotator" aria-live="polite">
            <blockquote>{STUDENT_QUOTES[quoteIndex]}</blockquote>
          </div>
          <p>
            This courseware was built to close that gap: one coherent system where data
            structure visibly produces business outcomes.
          </p>
          <section className="home-educator-note" aria-labelledby="educators-title">
            <h3 id="educators-title">For Instructors &amp; Educators</h3>
            <p>
              Business remains the #1 undergraduate major in the U.S., with thousands of
              students enrolling in introductory MIS and database courses every semester;
              yet the dominant texts have evolved only incrementally for three decades.
              This courseware was designed from the ground up for business students:
              databases treated not as a side topic, but as the structural core of
              business performance systems, with strategy and managerial judgment
              addressed explicitly and AI framed as a consequence of strong data
              practices rather than a decorative final chapter.
            </p>
          </section>
        </div>
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

      <section className="home-tools" aria-labelledby="tools-title">
        <h2 id="tools-title" className="home-section-title">
          <Wrench size={16} className="cta-icon" />
          Modern Tools, Not Just Legacy Software
        </h2>
        <p className="home-section-intro">
          Most database textbooks are still built almost entirely around Microsoft Access.
          This courseware keeps the Access coverage curricula expect, and deliberately
          takes students beyond it, into technologies they'll actually encounter at work:
        </p>
        <div className="tools-list">
          {TOOL_ROWS.map((row) => (
            <div className="tool-row" key={row.tool}>
              <span className="tool-name">{row.tool}</span>
              <span className="tool-desc">{row.use}</span>
            </div>
          ))}
        </div>
        <p className="tools-closing">
          No major database textbook on the market <span className="tools-accent-combines">combines</span>{' '}
          this toolset, and nearly all of these tools are <span className="tools-accent-free">free</span>{' '}
          for students.
        </p>
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
        <p className="chapter-structure-note chapter-structure-note--secondary">
          Assessments are explicitly structured around Bloom's Taxonomy: Reading
          Assessment Tests for comprehension, discussion and reflection for evaluation,
          and hands-on labs for analysis and creation, carried by two running projects,
          a Grading Database built step by step in guided sections and the PetVax case
          study applied independently in labs.
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
