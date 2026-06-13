import { useState } from 'react';
import type { ReaderScope, BookChapter, BookLab, BookPage } from '../types';
import { FLAT_READER_PAGES } from '../generated/bookData';
import {
  BookOpen, FlaskConical, LogIn, ChevronDown, ChevronRight,
  LayoutDashboard, BookMarked, Layers, Terminal, HelpCircle, Sparkles, Award,
} from 'lucide-react';

/** Icons for each reader area (keyed by section title). */
const SECTION_ICONS: Record<string, React.ReactNode> = {
  'Introduction': <BookMarked size={14} />,
  'Core Concepts': <Layers size={14} />,
  "Let's Build": <Terminal size={14} />,
  'Review Questions': <HelpCircle size={14} />,
  'Terms Treasury': <Sparkles size={14} />,
  'RAT: Reading Test': <Award size={14} />,
};

/** Subtitles for reader areas. */
const SECTION_SUBTITLES: Record<string, string> = {
  'Introduction': 'Hook & Core Alignment',
  'Core Concepts': 'Theory & Core Frameworks',
  "Let's Build": 'Hands-on Code Laboratory',
  'Review Questions': 'Self-explanation Exercises',
  'Terms Treasury': 'Key Glossary & Core Definitions',
  'RAT: Reading Test': 'Verify Knowledge Retention',
};

interface SidebarProps {
  scope: ReaderScope;
  onNavigateScope: (scope: ReaderScope) => void;
  chapters: BookChapter[];
  activeChapterId: string;
  activeSectionId: string;
  activePageId: string;
  onSelectSection: (sectionId: string) => void;
  onSelectPage: (page: BookPage) => void;
  labs: BookLab[];
  activeLabId: string;
  onSelectLab: (lab: BookLab) => void;
  onClose: () => void;
}

export default function Sidebar({
  scope,
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
  onClose,
}: SidebarProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set([activeChapterId])
  );

  const toggleChapter = (chId: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      if (next.has(chId)) next.delete(chId);
      else next.add(chId);
      return next;
    });
  };

  return (
    <div className="sidebar-inner">
      {/* Scope nav */}
      <div className="sidebar-scope-nav">
        <button
          className={`scope-link ${scope === 'welcome' ? 'active' : ''}`}
          onClick={() => { onNavigateScope('welcome'); onClose(); }}
        >
          <LayoutDashboard size={16} className="scope-icon" /> Home
        </button>
        <button
          className={`scope-link ${scope === 'book' ? 'active' : ''}`}
          onClick={() => onNavigateScope('book')}
        >
          <BookOpen size={16} className="scope-icon" /> Book
        </button>
        <button
          className={`scope-link ${scope === 'labs' ? 'active' : ''}`}
          onClick={() => onNavigateScope('labs')}
        >
          <FlaskConical size={16} className="scope-icon" /> Labs
        </button>
        <button
          className={`scope-link ${scope === 'login' ? 'active' : ''}`}
          onClick={() => onNavigateScope('login')}
        >
          <LogIn size={16} className="scope-icon" /> Login / Access
        </button>
      </div>

      <hr className="sidebar-divider" />

      {/* Book scope: chapters and sections */}
      {scope === 'book' && (
        <div className="sidebar-chapters">
          {chapters.map(ch => (
            <div key={ch.id} className="sidebar-chapter">
              <button
                className={`chapter-toggle ${activeChapterId === ch.id ? 'active' : ''}`}
                onClick={() => toggleChapter(ch.id)}
              >
                <span className="chapter-caret">{expandedChapters.has(ch.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</span>
                <span className="chapter-label">{ch.id.toUpperCase()}: {ch.title}</span>
              </button>
              {expandedChapters.has(ch.id) && (
                <div className="chapter-sections">
                  {ch.sections.map(sec => {
                    const sectionPages = FLAT_READER_PAGES.filter(p => p.sectionId === sec.id);
                    return (
                      <div key={sec.id} className="sidebar-section">
                        <button
                          className={`section-link ${activeSectionId === sec.id ? 'active' : ''}`}
                          onClick={() => onSelectSection(sec.id)}
                        >
                          <span className="section-icon">
                            {SECTION_ICONS[sec.title] || null}
                          </span>
                          <span className="section-text">
                            <span className="section-title">{sec.title}</span>
                            {SECTION_SUBTITLES[sec.title] && (
                              <span className="section-subtitle">{SECTION_SUBTITLES[sec.title]}</span>
                            )}
                          </span>
                          {!sec.exists && <span className="badge-placeholder">missing</span>}
                        </button>
                        {sectionPages.length > 1 && (
                          <div className="section-pages">
                            {sectionPages.map(p => (
                              <button
                                key={p.id}
                                className={`page-link ${p.id === activePageId ? 'active' : ''}`}
                                onClick={() => onSelectPage(p)}
                              >
                                <span className="page-link-num">{p.pageNumber}</span>
                                <span className="page-link-title">{p.navTitle || p.title}</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Labs scope: lab list */}
      {scope === 'labs' && (
        <div className="sidebar-labs">
          {labs.map(lab => (
            <button
              key={lab.id}
              className={`lab-link ${activeLabId === lab.id ? 'active' : ''}`}
              onClick={() => onSelectLab(lab)}
            >
              <span className="lab-num">{lab.id.replace('lab-', 'Lab ')}</span>
              <span className="lab-title">{lab.title}</span>
              {!lab.exists && <span className="badge-placeholder">missing</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
