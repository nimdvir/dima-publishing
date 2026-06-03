/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentPanel } from './components/ContentPanel';
import { BookCoverPage } from './components/BookCoverPage';
import { CHAPTERS } from './chaptersData';
import { SectionType } from './types';
import { Loader2, LogIn, LogOut, User as UserIcon, Menu } from 'lucide-react';
import { useAuth } from './AuthContext';

const SECTIONS_ORDER: SectionType[] = ['intro', 'concepts', 'build', 'questions', 'terms', 'rat'];

const SECTIONS_NAME: Record<SectionType, string> = {
  intro: 'Introduction',
  concepts: 'Main Concepts',
  build: "Let's Build",
  questions: 'Review Questions',
  terms: 'Terms Treasury',
  rat: 'RAT (Reading Test)'
};

export default function App() {
  const { user, progress, loading, signIn, logout, updateSectionComplete, updateQuizScore } = useAuth();
  
  // App routing states
  const [currentScope, setCurrentScope] = useState<'welcome' | 'chapter' | 'lab' | 'appendix' | 'ai_chat'>('chapter');
  const [activeLabId, setActiveLabId] = useState<string>('welcome');
  const [activeAppendixId, setActiveAppendixId] = useState<string>('treasury');
  const [labCompletionMap, setLabCompletionMap] = useState<Record<string, boolean>>({});

  const [activeChapterId, setActiveChapterId] = useState(CHAPTERS[0].id);
  const [activeSectionId, setActiveSectionId] = useState<SectionType>('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showCoverPage, setShowCoverPage] = useState(true);

  const completedSections = progress?.completedSections || [];

  // Find active chapter index and object
  const activeChapterIndex = useMemo(() => {
    return CHAPTERS.findIndex(c => c.id === activeChapterId);
  }, [activeChapterId]);

  const activeChapter = useMemo(() => {
    return CHAPTERS[activeChapterIndex] || CHAPTERS[0];
  }, [activeChapterIndex]);

  // Handle Direct Navigation click in sidebar or searches
  const handleSelectSection = (chapterId: string, sectionId: SectionType) => {
    setShowCoverPage(false);
    setCurrentScope('chapter');
    setActiveChapterId(chapterId);
    setActiveSectionId(sectionId);
  };

  const handleSelectScope = (scope: 'welcome' | 'chapter' | 'lab' | 'appendix' | 'ai_chat') => {
    setShowCoverPage(false);
    setCurrentScope(scope);
  };

  const handleSelectLab = (labId: string) => {
    setShowCoverPage(false);
    setCurrentScope('lab');
    setActiveLabId(labId);
  };

  const handleSelectAppendix = (appendixId: string) => {
    setShowCoverPage(false);
    setCurrentScope('appendix');
    setActiveAppendixId(appendixId);
  };

  // Mark current section read
  const handleMarkSectionComplete = async (chapterId: string, sectionId: SectionType) => {
    await updateSectionComplete(chapterId, sectionId);
  };

  // Complete RAT
  const handleQuizComplete = async (score: number) => {
    await updateQuizScore(activeChapterId, score);
  };

  // Next and Previous calculations
  const currentSectionIndex = SECTIONS_ORDER.indexOf(activeSectionId);

  const prevSectionInfo = useMemo(() => {
    if (currentSectionIndex > 0) {
      const prevSecId = SECTIONS_ORDER[currentSectionIndex - 1];
      return {
        chapterId: activeChapterId,
        sectionId: prevSecId,
        name: SECTIONS_NAME[prevSecId]
      };
    } else if (activeChapterIndex > 0) {
      const prevChapter = CHAPTERS[activeChapterIndex - 1];
      const lastSecId = SECTIONS_ORDER[SECTIONS_ORDER.length - 1];
      return {
        chapterId: prevChapter.id,
        sectionId: lastSecId,
        name: `${prevChapter.title.split('.')[0]}. ${SECTIONS_NAME[lastSecId]}`
      };
    }
    return null;
  }, [activeChapterIndex, activeChapterId, currentSectionIndex]);

  const nextSectionInfo = useMemo(() => {
    if (currentSectionIndex < SECTIONS_ORDER.length - 1) {
      const nextSecId = SECTIONS_ORDER[currentSectionIndex + 1];
      return {
        chapterId: activeChapterId,
        sectionId: nextSecId,
        name: SECTIONS_NAME[nextSecId]
      };
    } else if (activeChapterIndex < CHAPTERS.length - 1) {
      const nextChapter = CHAPTERS[activeChapterIndex + 1];
      const firstSecId = SECTIONS_ORDER[0];
      return {
        chapterId: nextChapter.id,
        sectionId: firstSecId,
        name: `${nextChapter.title.split('.')[0]}. ${SECTIONS_NAME[firstSecId]}`
      };
    }
    return null;
  }, [activeChapterIndex, activeChapterId, currentSectionIndex]);

  // Handlers for navigation button triggers
  const handleNavigate = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && prevSectionInfo) {
      setActiveChapterId(prevSectionInfo.chapterId);
      setActiveSectionId(prevSectionInfo.sectionId);
    } else if (direction === 'next' && nextSectionInfo) {
      setActiveChapterId(nextSectionInfo.chapterId);
      setActiveSectionId(nextSectionInfo.sectionId);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-zinc-50">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-3" />
        <span className="text-zinc-500 text-xs font-semibold uppercase tracking-widest animate-pulse">
          Syncing educational environment...
        </span>
      </div>
    );
  }

  if (showCoverPage) {
    return (
      <BookCoverPage onEnterReader={() => setShowCoverPage(false)} />
    );
  }

  return (
    <div className="flex h-screen bg-zinc-100 text-zinc-800 font-sans overflow-hidden">
      {/* Searchable Collapsible Sidebar */}
      <Sidebar
        chapters={CHAPTERS}
        activeChapterId={activeChapterId}
        activeSectionId={activeSectionId}
        completedSections={completedSections}
        onSelectSection={handleSelectSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onBackToCover={() => setShowCoverPage(true)}
        isCoverActive={showCoverPage}
        currentScope={currentScope}
        activeLabId={activeLabId}
        activeAppendixId={activeAppendixId}
        onSelectScope={handleSelectScope}
        onSelectLab={handleSelectLab}
        onSelectAppendix={handleSelectAppendix}
        labCompletionMap={labCompletionMap}
      />
      
      {/* Primary Workspace Panel */}
      <main className="flex-1 flex flex-col h-full bg-white relative overflow-hidden">
        {/* Top Header Navigation bar */}
        <header className="h-16 border-b border-zinc-200 flex items-center justify-between px-3 sm:px-6 bg-white/90 backdrop-blur-md sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-3">
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                title="Expand Navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest leading-none mb-1">
                Active Topic
              </span>
              <span className="text-sm font-bold text-zinc-800 truncate max-w-[110px] sm:max-w-[300px] md:max-w-[400px]">
                {activeChapter.title}
              </span>
            </div>
          </div>
          
          {/* User Signin integration */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-200 shrink-0">
                      <span className="text-xs font-black text-indigo-700 uppercase">{user.netId.slice(0, 2)}</span>
                    </div>
                    <div className="flex flex-col text-right hidden md:flex">
                      <span className="text-xs font-bold text-zinc-800 leading-tight">
                        {user.fullName}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-500 leading-none mt-0.5">
                        NetID: {user.netId}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 mt-1 rounded-sm tracking-widest border leading-none hidden sm:inline-block ${
                    user.hasPaid 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {user.hasPaid ? '🟢 UPGRADED' : `🟡 TRIAL (${user.trialCount}/3)`}
                  </span>
                </div>
                
                <button 
                  onClick={async () => {
                    await logout();
                    setShowCoverPage(true);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors text-xs font-bold text-zinc-650 cursor-pointer"
                  title="Switch student account / Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowCoverPage(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white transition-all text-sm font-bold shadow-sm cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-indigo-400" />
                <span>Sign In via NetID</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Content and sections panels */}
        <ContentPanel
          currentScope={currentScope}
          chapter={activeChapter}
          chapters={CHAPTERS}
          sectionId={activeSectionId}
          completedSections={completedSections}
          activeLabId={activeLabId}
          activeAppendixId={activeAppendixId}
          onSelectChapterSection={handleSelectSection}
          onSelectLab={handleSelectLab}
          onSelectAppendix={handleSelectAppendix}
          onMarkSectionComplete={handleMarkSectionComplete}
          onNavigate={handleNavigate}
          onQuizComplete={handleQuizComplete}
          prevSectionName={prevSectionInfo ? prevSectionInfo.name : null}
          nextSectionName={nextSectionInfo ? nextSectionInfo.name : null}
        />
      </main>
    </div>
  );
}
