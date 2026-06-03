import React, { useState, useMemo } from 'react';
import { 
  BookOpen, CheckCircle2, Circle, ChevronLeft, ChevronRight, Search, Menu, X, 
  HelpCircle, Sparkles, BookMarked, Terminal, List, Award, Clock, LayoutDashboard, Lock, MessageSquare
} from 'lucide-react';
import { cn, calculateReadingTime } from '../utils';
import { Chapter, SectionType, SectionInfo } from '../types';
import { useAuth } from '../AuthContext';
import { LABS } from '../labsData';

interface SidebarProps {
  chapters: Chapter[];
  activeChapterId: string;
  activeSectionId: SectionType;
  completedSections: string[]; // List of 'chapterId_sectionId'
  onSelectSection: (chapterId: string, sectionId: SectionType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onBackToCover?: () => void;

  // Multi-Scope Navigation Extensions
  currentScope: 'welcome' | 'chapter' | 'lab' | 'appendix' | 'ai_chat';
  activeLabId: string;
  activeAppendixId: string;
  onSelectScope: (scope: 'welcome' | 'chapter' | 'lab' | 'appendix' | 'ai_chat') => void;
  onSelectLab: (labId: string) => void;
  onSelectAppendix: (appendixId: string) => void;
  labCompletionMap: Record<string, boolean>;
}

const SECTIONS: SectionInfo[] = [
  { id: 'intro', title: 'Introduction' },
  { id: 'concepts', title: 'Main Concepts' },
  { id: 'build', title: "Let's Build" },
  { id: 'questions', title: 'Review Questions' },
  { id: 'terms', title: 'Terms Treasury' },
  { id: 'rat', title: 'RAT (Reading Test)' }
];

export function Sidebar({ 
  chapters, 
  activeChapterId, 
  activeSectionId, 
  completedSections, 
  onSelectSection,
  isOpen,
  setIsOpen,
  onBackToCover,

  currentScope,
  activeLabId,
  activeAppendixId,
  onSelectScope,
  onSelectLab,
  onSelectAppendix,
  labCompletionMap
}: SidebarProps) {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({
    [activeChapterId]: true
  });

  // Auto-expand the active chapter in the sidebar as the reader navigates the course book
  React.useEffect(() => {
    setExpandedChapters(prev => ({
      ...prev,
      [activeChapterId]: true
    }));
  }, [activeChapterId]);

  const toggleChapterHeader = (id: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Build searchable index of everything inside all 16 chapters
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    
    const matches: {
      chapterId: string;
      chapterTitle: string;
      sectionId: SectionType;
      sectionTitle: string;
      matchText: string;
    }[] = [];

    chapters.forEach(ch => {
      // Check Intro
      if (ch.introduction.toLowerCase().includes(query)) {
        matches.push({
          chapterId: ch.id,
          chapterTitle: ch.title,
          sectionId: 'intro',
          sectionTitle: 'Introduction',
          matchText: ch.introduction.substring(0, 100) + '...'
        });
      }

      // Check Concepts / Subsections
      ch.concepts.subsections.forEach(sub => {
        if (sub.title.toLowerCase().includes(query) || sub.content.toLowerCase().includes(query)) {
          matches.push({
            chapterId: ch.id,
            chapterTitle: ch.title,
            sectionId: 'concepts',
            sectionTitle: `Concepts: ${sub.title}`,
            matchText: sub.content.substring(0, 100) + '...'
          });
        }
      });

      // Check Build
      if (ch.build.toLowerCase().includes(query)) {
        matches.push({
          chapterId: ch.id,
          chapterTitle: ch.title,
          sectionId: 'build',
          sectionTitle: "Let's Build",
          matchText: ch.build.substring(0, 100) + '...'
        });
      }

      // Check Questions
      if (ch.questions.toLowerCase().includes(query)) {
        matches.push({
          chapterId: ch.id,
          chapterTitle: ch.title,
          sectionId: 'questions',
          sectionTitle: 'Review Questions',
          matchText: ch.questions.substring(0, 100) + '...'
        });
      }

      // Check Terms
      ch.terms.forEach(term => {
        if (term.term.toLowerCase().includes(query) || term.definition.toLowerCase().includes(query)) {
          matches.push({
            chapterId: ch.id,
            chapterTitle: ch.title,
            sectionId: 'terms',
            sectionTitle: `Terms: ${term.term}`,
            matchText: term.definition.substring(0, 100) + '...'
          });
        }
      });

      // Check RAT questions
      ch.rat.forEach(q => {
        if (q.question.toLowerCase().includes(query) || q.explanation.toLowerCase().includes(query)) {
          matches.push({
            chapterId: ch.id,
            chapterTitle: ch.title,
            sectionId: 'rat',
            sectionTitle: 'Reading Assessment Test',
            matchText: q.question
          });
        }
      });
    });

    return matches;
  }, [searchQuery, chapters]);

  // Compute stats
  const stats = useMemo(() => {
    const totalSecs = chapters.length * SECTIONS.length;
    const completedSecs = completedSections.length;
    const pct = totalSecs > 0 ? Math.round((completedSecs / totalSecs) * 100) : 0;
    return { totalSecs, completedSecs, pct };
  }, [chapters, completedSections]);

  const selectSearchResult = (chapterId: string, sectionId: SectionType) => {
    onSelectSection(chapterId, sectionId);
    setSearchQuery('');
    setExpandedChapters(prev => ({ ...prev, [chapterId]: true }));
    // If on mobile, auto-close sidebar on select
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const sectionIcon = (id: SectionType) => {
    switch (id) {
      case 'intro': return <BookMarked className="w-3.5 h-3.5 shrink-0" />;
      case 'concepts': return <List className="w-3.5 h-3.5 shrink-0" />;
      case 'build': return <Terminal className="w-3.5 h-3.5 shrink-0" />;
      case 'questions': return <HelpCircle className="w-3.5 h-3.5 shrink-0" />;
      case 'terms': return <Sparkles className="w-3.5 h-3.5 shrink-0" />;
      case 'rat': return <Award className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  return (
    <>
      {/* Mobile Sidebar overlay backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-zinc-900/50 backdrop-blur-xs z-30 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Primary Sidebar Container */}
      <div 
        className={cn(
          "fixed md:relative top-0 bottom-0 left-0 z-40 bg-zinc-50 border-r border-zinc-200 flex flex-col transition-all duration-300 h-full",
          isOpen ? "w-80 translate-x-0" : "w-0 -translate-x-full md:w-16 md:translate-x-0 overflow-hidden"
        )}
      >
        {/* Header Area */}
        <div className="h-16 border-b border-zinc-200 px-4 flex items-center justify-between shadow-xs bg-white shrink-0">
          {(isOpen || window.innerWidth >= 768) && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                <BookOpen className="w-5 h-5" />
              </div>
              {isOpen && (
                <div className="flex flex-col">
                  <span className="font-bold text-zinc-900 leading-none">EduBook</span>
                  <span className="text-[10px] text-zinc-400 font-medium">Textbook Interactive</span>
                </div>
              )}
            </div>
          )}

          {/* Toggle icon block & Mobile close */}
          <div className="flex items-center gap-1 ml-auto">
            {isOpen ? (
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-700 rounded-lg hover:bg-zinc-100 transition-colors"
                title="Collapse Panel"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            ) : (
              <button 
                onClick={() => setIsOpen(true)}
                className="p-1 w-full text-zinc-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex justify-center py-2"
                title="Expand Panel"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Collapsed mini vertical scope switcher */}
        {!isOpen && (
          <div className="py-3 border-b border-zinc-200 flex flex-col items-center gap-2.5 bg-zinc-50/50 shrink-0">
            <button
              onClick={() => onSelectScope('welcome')}
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer border",
                currentScope === 'welcome' ? "bg-indigo-600 text-white border-indigo-500" : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-102"
              )}
              title="Orientation Lesson Overview"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectScope('chapter')}
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer border",
                currentScope === 'chapter' ? "bg-indigo-600 text-white border-indigo-500" : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-102"
              )}
              title="Lectures Textbook Chapters"
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onSelectScope('lab');
                onSelectLab('welcome');
              }}
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer border",
                currentScope === 'lab' ? "bg-emerald-600 text-white border-emerald-500" : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-102"
              )}
              title="Database Labs Playground"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                onSelectScope('appendix');
                onSelectAppendix('treasury');
              }}
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer border",
                currentScope === 'appendix' ? "bg-purple-600 text-white border-purple-500" : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-102"
              )}
              title="Appendix Glossary & Syntax Reference"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectScope('ai_chat')}
              className={cn(
                "w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer border relative",
                currentScope === 'ai_chat' ? "bg-amber-600 text-white border-amber-500 block" : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-102"
              )}
              title="AI Syllabus Study Tutor (Premium)"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Global Progress Indicators (Only when Expanded) */}
        {isOpen && onBackToCover && (
          <div className="px-4 pt-4 pb-1 shrink-0 flex flex-col gap-2">
            <button
              onClick={() => {
                onBackToCover?.();
                if (window.innerWidth < 768) {
                  setIsOpen(false);
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-150 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Book Cover & Overview</span>
            </button>

            {/* Welcome lesson Orientation page */}
            <button
              onClick={() => {
                onSelectScope('welcome');
                if (window.innerWidth < 768) {
                  setIsOpen(false);
                }
              }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all text-xs font-bold cursor-pointer",
                currentScope === 'welcome'
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-100"
                  : "bg-white hover:bg-zinc-50 border-zinc-200/60 text-zinc-700"
              )}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Video Welcome Intro</span>
              </div>
              <span className={cn(
                "text-[9px] px-1.5 py-0.2 rounded font-black font-mono border uppercase tracking-wider",
                currentScope === 'welcome' ? "bg-indigo-500 text-white border-indigo-400" : "bg-zinc-100 text-zinc-500 border-zinc-200"
              )}>
                Start
              </span>
            </button>

            {/* AI Syllabus Companion (Premium) */}
            <button
              onClick={() => {
                onSelectScope('ai_chat');
                if (window.innerWidth < 768) {
                  setIsOpen(false);
                }
              }}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-xl border transition-all text-xs font-bold cursor-pointer mt-0.5",
                currentScope === 'ai_chat'
                  ? "bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-100"
                  : "bg-white hover:bg-amber-50/30 border-zinc-200/60 text-zinc-700"
              )}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-500 shrink-0" />
                <span>AI Syllabus Tutor</span>
              </div>
              <span className="text-[8px] px-1.5 py-0.5 rounded font-black font-mono border uppercase tracking-wider flex items-center gap-0.5 bg-amber-55 bg-indigo-50 text-indigo-700 border-indigo-100">
                PRO AI
              </span>
            </button>
          </div>
        )}

        {/* Category segment tabs switcher for quick swap */}
        {isOpen && (
          <div className="px-4 py-1 flex gap-1 bg-zinc-50 border-b border-zinc-200/50 shrink-0">
            {[
              { scope: 'chapter', label: 'Lectures', activeColor: "bg-indigo-600 text-white border-indigo-600" },
              { scope: 'lab', label: 'Labs', activeColor: "bg-emerald-600 text-white border-emerald-600" },
              { scope: 'appendix', label: 'Appendix', activeColor: "bg-purple-600 text-white border-purple-600" }
            ].map(tab => {
              const isActive = currentScope === tab.scope;
              return (
                <button
                  key={tab.scope}
                  onClick={() => {
                    if (tab.scope === 'chapter') {
                      onSelectScope('chapter');
                      onSelectSection(chapters[0].id, 'intro');
                    } else if (tab.scope === 'lab') {
                      onSelectScope('lab');
                      onSelectLab('welcome');
                    } else if (tab.scope === 'appendix') {
                      onSelectScope('appendix');
                      onSelectAppendix('treasury');
                    }
                  }}
                  className={cn(
                    "flex-1 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-widest text-center border transition-all cursor-pointer leading-none",
                    isActive
                      ? tab.activeColor + " shadow-sm font-black"
                      : "bg-white border-zinc-200 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-102"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}

        {isOpen && (
          <div className="p-4 border-b border-zinc-200 bg-white/50 space-y-2 shrink-0">
            <div className="flex justify-between items-center text-xs font-semibold text-zinc-500">
              <span className="flex items-center gap-1.5 uppercase tracking-wider">
                Progress Status
              </span>
              <span>
                {stats.completedSecs}/{stats.totalSecs} Sections
              </span>
            </div>
            <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500"
                style={{ width: `${stats.pct}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-zinc-400">
              <span>Overall Completion</span>
              <span className="font-bold text-indigo-600">{stats.pct}%</span>
            </div>
          </div>
        )}

        {/* Search Panel Area (Only when Expanded) */}
        {isOpen && (
          <div className="p-3 border-b border-zinc-200 bg-white shrink-0 relative">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search index & content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-zinc-100 rounded-lg border-0 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all outline-hidden text-zinc-800"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content Lists */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-1">
          {searchQuery ? (
            /* Search results list view */
            <div className="space-y-2">
              <div className="px-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-widest flex justify-between items-center">
                <span>Matching Nodes</span>
                <span>{searchResults.length} matches</span>
              </div>
              {searchResults.length === 0 ? (
                <div className="text-center py-8 px-4">
                  <p className="text-xs text-zinc-400">No match found inside lessons</p>
                </div>
              ) : (
              searchResults.map((res, index) => {
                const matchedChapter = chapters.find(ch => ch.id === res.chapterId);
                const matchedTime = matchedChapter ? calculateReadingTime(matchedChapter, res.sectionId) : 0;
                return (
                  <button
                    key={index}
                    onClick={() => selectSearchResult(res.chapterId, res.sectionId)}
                    className="w-full text-left p-2.5 rounded-lg border border-zinc-200/55 bg-white hover:bg-indigo-50/50 hover:border-indigo-100 transition-all flex flex-col gap-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 justify-between">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider shrink-0 bg-indigo-50 px-1 rounded">
                          {res.sectionId}
                        </span>
                        <span className="text-[10px] font-medium text-zinc-400 truncate">
                          {res.chapterTitle}
                        </span>
                      </div>
                      {matchedTime > 0 && (
                        <span className="text-[9px] text-zinc-400 font-semibold flex items-center gap-0.5 shrink-0 bg-zinc-50 px-1.5 py-0.5 rounded border border-zinc-100">
                          <Clock className="w-2.5 h-2.5 text-zinc-350" />
                          {matchedTime}m
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-zinc-800 line-clamp-1">
                      {res.sectionTitle}
                    </span>
                    <span className="text-[10px] text-zinc-500 line-clamp-2">
                      {res.matchText}
                    </span>
                  </button>
                );
              })
              )}
            </div>
          ) : currentScope === 'lab' ? (
            /* LABS NAVIGATION PANEL LIST */
            <div className="space-y-1.5 p-1 animate-fadeIn select-none">
              {isOpen && (
                <div className="px-1.5 py-0.5 text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest flex items-center justify-between mb-2">
                  <span>Database Laboratory</span>
                  <span>{LABS.length} Challenges</span>
                </div>
              )}
              
              {isOpen ? (
                <button
                  onClick={() => {
                    onSelectLab('welcome');
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                  className={cn(
                    "w-full text-left p-3 rounded-xl transition-all cursor-pointer border flex items-center gap-2.5 text-xs font-semibold",
                    activeLabId === 'welcome'
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-100"
                      : "bg-white hover:bg-zinc-50 border-zinc-200/60 text-zinc-700"
                  )}
                >
                  <Terminal className="w-4 h-4 shrink-0" />
                  <span>Labs Welcome Introduction</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onSelectLab('welcome');
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer border mx-auto",
                    activeLabId === 'welcome' ? "bg-emerald-600 border-emerald-600 text-white" : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-102"
                  )}
                  title="Labs Orientation welcome"
                >
                  <Terminal className="w-4 h-4" />
                </button>
              )}

              {/* Individual lab entries lists */}
              {LABS.map((lb) => {
                const isActive = activeLabId === lb.id;
                const isCompleted = !!labCompletionMap[lb.id];
                
                if (!isOpen) {
                  return (
                    <button
                      key={lb.id}
                      onClick={() => {
                        onSelectLab(lb.id);
                        if (window.innerWidth < 768) {
                          setIsOpen(false);
                        }
                      }}
                      className={cn(
                        "w-10 h-10 rounded-lg flex flex-col items-center justify-center border transition-all cursor-pointer mx-auto relative",
                        isActive 
                          ? "bg-emerald-600 border-emerald-600 text-white" 
                          : isCompleted 
                            ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                            : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-102"
                      )}
                      title={lb.title}
                    >
                      <span className="text-[10px] font-black">{lb.id.replace('lab', 'L')}</span>
                      {isCompleted && (
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 absolute bottom-0.5 right-0.5" />
                      )}
                    </button>
                  );
                }

                return (
                  <button
                    key={lb.id}
                    onClick={() => {
                      onSelectLab(lb.id);
                      if (window.innerWidth < 768) {
                        setIsOpen(false);
                      }
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all cursor-pointer gap-2",
                      isActive
                        ? "bg-emerald-50 border-emerald-250 text-emerald-990 shadow-xs"
                        : "bg-white hover:bg-zinc-102 border-zinc-200/50 text-zinc-650"
                    )}
                  >
                    <span className="truncate flex items-center gap-2">
                       <Terminal className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{lb.title}</span>
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : currentScope === 'appendix' ? (
            /* APPENDIX NAVIGATION PANEL LIST */
            <div className="space-y-1.5 p-1 animate-fadeIn select-none">
              {isOpen && (
                <div className="px-1.5 py-0.5 text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest flex items-center justify-between mb-2">
                  <span>Appendix Treasury</span>
                  <span>Glossary & Syn</span>
                </div>
              )}

              {[
                { id: 'treasury', title: 'Term Treasury Glossary', subtitle: 'Definitions dictionary search', icon: Sparkles },
                { id: 'playground', title: 'SQL Query Playground', subtitle: 'Interactive sandbox console', icon: Terminal }
              ].map((ap) => {
                const isActive = activeAppendixId === ap.id;
                const ApIcon = ap.icon;

                if (!isOpen) {
                  return (
                    <button
                      key={ap.id}
                      onClick={() => {
                        onSelectAppendix(ap.id);
                        if (window.innerWidth < 768) {
                          setIsOpen(false);
                        }
                      }}
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center border transition-all cursor-pointer mx-auto",
                        isActive ? "bg-purple-600 border-purple-600 text-white" : "bg-white border-zinc-200 text-zinc-550 hover:bg-zinc-102"
                      )}
                      title={ap.title}
                    >
                      <ApIcon className="w-4 h-4" />
                    </button>
                  );
                }

                return (
                  <button
                    key={ap.id}
                    onClick={() => {
                      onSelectAppendix(ap.id);
                      if (window.innerWidth < 768) {
                        setIsOpen(false);
                      }
                    }}
                    className={cn(
                      "w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between",
                      isActive
                        ? "bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100"
                        : "bg-white hover:bg-zinc-50 border-zinc-200/60"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={cn("p-1.5 rounded-lg shrink-0", isActive ? "bg-purple-700" : "bg-purple-50 text-purple-700")}>
                        <ApIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left min-w-0">
                        <div className={cn("text-xs font-bold truncate", isActive ? "text-white" : "text-zinc-800")}>{ap.title}</div>
                        <div className={cn("text-[9px] truncate", isActive ? "text-purple-200" : "text-zinc-400")}>{ap.subtitle}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
                  </button>
                );
              })}
            </div>
          ) : (
            /* Standard Chapter Accordion List (Lectures scope) */
            chapters.map((chapter) => {
              const isChapterExpanded = expandedChapters[chapter.id];
              const isActiveChapter = chapter.id === activeChapterId;
              
              // Compute chapter completion statistics
              const chapterSectionCompletions = SECTIONS.filter(sec => 
                completedSections.includes(`${chapter.id}_${sec.id}`)
              ).length;
              
              const isChapterFullyComplete = chapterSectionCompletions === SECTIONS.length;

              return (
                <div key={chapter.id} className="space-y-0.5">
                  {/* Chapter Heading Bar */}
                  <div className="flex items-center gap-1">
                    {/* Collapsed side bar - just render chapter number icon */}
                    {!isOpen ? (
                      <button
                        onClick={() => {
                          setIsOpen(true);
                          setExpandedChapters(prev => ({ ...prev, [chapter.id]: true }));
                        }}
                        className={cn(
                          "w-12 h-10 rounded-lg flex flex-col items-center justify-center border transition-all hover:bg-indigo-50/40 relative cursor-pointer",
                          isActiveChapter 
                            ? "bg-indigo-50 border-indigo-200 text-indigo-600" 
                            : isChapterFullyComplete 
                              ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                              : "bg-white border-zinc-200 text-zinc-700"
                        )}
                        title={chapter.title}
                      >
                        <span className="text-xs font-bold leading-none">{chapter.id.replace('ch', '')}</span>
                        {isChapterFullyComplete ? (
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 absolute bottom-1 right-1" />
                        ) : (
                          <div className="text-[9px] text-zinc-400 font-bold mt-0.5">{chapterSectionCompletions}/6</div>
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleChapterHeader(chapter.id)}
                        className={cn(
                          "flex-1 text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-all font-semibold break-words min-w-0 cursor-pointer border",
                          isActiveChapter
                            ? "bg-indigo-50/60 border-indigo-150 text-indigo-950 font-bold"
                            : isChapterFullyComplete
                              ? "bg-emerald-50/60 border-emerald-150 text-emerald-800 hover:bg-emerald-100/40"
                              : "text-zinc-700 hover:bg-zinc-100 bg-white/70 border border-zinc-200/40"
                        )}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1 pr-1">
                          {isChapterFullyComplete ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-zinc-300 flex items-center justify-center shrink-0">
                              <span className="text-[8px] font-bold text-zinc-400">{chapterSectionCompletions}</span>
                            </div>
                          )}
                          <span className="truncate text-xs tracking-tight">{chapter.title}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 self-center shrink-0">
                          {isChapterExpanded ? '▼' : '▶'}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Chapter Section listings (nested accordion) */}
                  {isOpen && isChapterExpanded && (
                    <div className="pl-6 pr-1 py-0.5 space-y-0.5 border-l border-zinc-200 ml-5 my-0.5">
                      {SECTIONS.map((sec) => {
                        const isSecActive = isActiveChapter && activeSectionId === sec.id;
                        const isSecCompleted = completedSections.includes(`${chapter.id}_${sec.id}`);
                        const readingTime = calculateReadingTime(chapter, sec.id);

                        return (
                          <button
                            key={sec.id}
                            onClick={() => {
                              onSelectSection(chapter.id, sec.id);
                              // Close sidebar on mobile
                              if (window.innerWidth < 768) {
                                setIsOpen(false);
                              }
                            }}
                            className={cn(
                              "w-full text-left px-3 py-1.5 rounded-lg text-[11px] flex items-center justify-between transition-all font-medium cursor-pointer gap-2",
                              isSecActive
                                ? "bg-indigo-600 text-white shadow-xs"
                                : isSecCompleted
                                  ? "text-emerald-700 hover:bg-emerald-50 bg-emerald-50/25"
                                  : "text-zinc-650 hover:bg-zinc-150"
                            )}
                          >
                            <span className="flex items-center gap-1.5 truncate min-w-0 flex-1">
                              {sectionIcon(sec.id)}
                              <span className="truncate">{sec.title}</span>
                            </span>
                            
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span 
                                className={cn(
                                  "text-[9px] font-semibold flex items-center gap-0.5 opacity-60",
                                  isSecActive ? "text-indigo-200" : "text-zinc-400"
                                )}
                                title={`Estimated reading time: ${readingTime} mins`}
                              >
                                <Clock className="w-2.5 h-2.5 shrink-0" />
                                {readingTime}m
                              </span>
                              
                              {isSecCompleted ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              ) : (
                                <Circle className={cn("w-3 h-3 shrink-0", isSecActive ? "text-indigo-400" : "text-zinc-300")} />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
