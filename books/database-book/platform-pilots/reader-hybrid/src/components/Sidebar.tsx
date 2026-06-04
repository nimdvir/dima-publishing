import { useState } from 'react';
import type { ReaderScope, BookChapter, BookLab, BookPage } from '../types';
import { FLAT_READER_PAGES } from '../generated/bookData';

interface SidebarProps {
  scope: ReaderScope;
  onNavigateScope: (scope: ReaderScope) => void;
  chapters: BookChapter[];
  activeChapterId: string;
  activeSectionId: string;
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
          className={`scope-link ${scope === 'book' ? 'active' : ''}`}
          onClick={() => onNavigateScope('book')}
        >
          <span className="scope-icon">&#x1F4D6;</span> Book
        </button>
        <button
          className={`scope-link ${scope === 'labs' ? 'active' : ''}`}
          onClick={() => onNavigateScope('labs')}
        >
          <span className="scope-icon">&#x1F9EA;</span> Labs
        </button>
        <button
          className={`scope-link ${scope === 'ai-assistant' ? 'active' : ''}`}
          onClick={() => onNavigateScope('ai-assistant')}
        >
          <span className="scope-icon">&#x1F916;</span> AI Assistant
        </button>
        <button
          className={`scope-link ${scope === 'login' ? 'active' : ''}`}
          onClick={() => onNavigateScope('login')}
        >
          <span className="scope-icon">&#x1F512;</span> Login / Access
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
                <span className="chapter-caret">{expandedChapters.has(ch.id) ? '\u25BC' : '\u25B6'}</span>
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
                          {sec.title}
                          {!sec.exists && <span className="badge-placeholder">missing</span>}
                        </button>
                        {activeSectionId === sec.id && sectionPages.length > 1 && (
                          <div className="section-pages">
                            {sectionPages.map(p => (
                              <button
                                key={p.id}
                                className="page-link"
                                onClick={() => onSelectPage(p)}
                              >
                                {p.title}
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
