import React, { useState, useEffect, useMemo } from 'react';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, Play, CheckCircle2, Circle, HelpCircle, 
  Sparkles, Terminal, BookOpen, Quote, Info, Highlighter, Trash2, Edit3, X, Save, Clock,
  Database, Code, Copy, RotateCcw, Check, GraduationCap, Star, BookMarked, Layers, Search, RefreshCw, CheckSquare, Award, ShieldCheck
} from 'lucide-react';
import { Chapter, SectionType, SectionInfo, Highlight } from '../types';
import { Quiz } from './Quiz';
import { cn, calculateReadingTime } from '../utils';
import { useAuth } from '../AuthContext';
import { LABS, LabChallenge } from '../labsData';
import { AiChatCompanion } from './AiChatCompanion';

interface ContentPanelProps {
  currentScope: 'welcome' | 'chapter' | 'lab' | 'appendix' | 'ai_chat';
  chapter: Chapter;
  chapters: Chapter[];
  sectionId: SectionType;
  completedSections: string[];
  activeLabId: string;
  activeAppendixId: string;
  onSelectChapterSection: (chapterId: string, sectionId: SectionType) => void;
  onSelectLab: (labId: string) => void;
  onSelectAppendix: (appId: string) => void;
  onMarkSectionComplete: (chapterId: string, sectionId: SectionType) => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  onQuizComplete: (score: number) => void;
  prevSectionName: string | null;
  nextSectionName: string | null;
}

const SECTIONS_METADATA: Record<SectionType, { title: string; subtitle: string; icon: any; color: string }> = {
  intro: { 
    title: 'Introduction', 
    subtitle: 'Hook & Core Alignment', 
    icon: BookOpen,
    color: 'text-indigo-600 bg-indigo-50 border-indigo-150'
  },
  concepts: { 
    title: 'Core Concepts', 
    subtitle: 'Theory & Core Frameworks', 
    icon: Info,
    color: 'text-rose-600 bg-rose-50 border-rose-150'
  },
  build: { 
    title: "Let's Build", 
    subtitle: 'Hands-on Code Laboratory', 
    icon: Terminal,
    color: 'text-emerald-600 bg-emerald-50 border-emerald-150'
  },
  questions: { 
    title: 'Review & Reflection', 
    subtitle: 'Self-explanation Exercises', 
    icon: HelpCircle,
    color: 'text-amber-600 bg-amber-50 border-amber-150'
  },
  terms: { 
    title: 'Terms Treasury', 
    subtitle: 'Key Glossary & Core Definitions', 
    icon: Sparkles,
    color: 'text-purple-600 bg-purple-50 border-purple-150'
  },
  rat: { 
    title: 'Reading Assessment Test (RAT)', 
    subtitle: 'Verify Knowledge Retention', 
    icon: CheckCircle2,
    color: 'text-teal-600 bg-teal-50 border-teal-150'
  }
};

// Helper function to apply user text highlights recursively into React nodes
export function applyHighlights(children: React.ReactNode, highlights: Highlight[]): React.ReactNode {
  if (!highlights || highlights.length === 0) return children;

  const processText = (text: string): React.ReactNode[] | string => {
    // Sort highlights by length descending to match longest substrings first
    const sortedHls = [...highlights].sort((a, b) => b.selectedText.length - a.selectedText.length);
    
    let segments: { text: string; highlight?: Highlight }[] = [{ text }];

    for (const hl of sortedHls) {
      const matchText = hl.selectedText;
      if (!matchText) continue;

      const newSegments: { text: string; highlight?: Highlight }[] = [];
      for (const seg of segments) {
        if (seg.highlight) {
          newSegments.push(seg);
          continue;
        }

        const parts = seg.text.split(matchText);
        if (parts.length > 1) {
          parts.forEach((part, idx) => {
            if (part) newSegments.push({ text: part });
            if (idx < parts.length - 1) {
              newSegments.push({ text: matchText, highlight: hl });
            }
          });
        } else {
          newSegments.push(seg);
        }
      }
      segments = newSegments;
    }

    return segments.map((seg, index) => {
      if (seg.highlight) {
        let colorClasses = "bg-yellow-105 hover:bg-yellow-200/50 text-yellow-950 border-b-2 border-yellow-400";
        if (seg.highlight.color === 'green') colorClasses = "bg-emerald-105 hover:bg-emerald-200/50 text-emerald-950 border-b-2 border-emerald-400";
        if (seg.highlight.color === 'rose') colorClasses = "bg-rose-105 hover:bg-rose-200/50 text-rose-950 border-b-2 border-rose-400";
        if (seg.highlight.color === 'blue') colorClasses = "bg-sky-105 hover:bg-sky-200/50 text-sky-950 border-b-2 border-sky-400";

        return (
          <mark 
            key={index} 
            className={`${colorClasses} px-0.5 rounded-xs relative group cursor-pointer transition-all inline`}
            title={seg.highlight.note ? `Note: ${seg.highlight.note}` : undefined}
          >
            {seg.text}
            {seg.highlight.note && (
              <span className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2.5 bg-zinc-950 text-zinc-150 text-[10px] rounded-lg shadow-2xl max-w-xs w-48 z-40 leading-normal font-sans text-center">
                <span className="font-extrabold text-indigo-400 block mb-0.5 text-left text-[9px] uppercase tracking-wider">Note Annotation</span>
                <span className="block text-left text-zinc-300">{seg.highlight.note}</span>
              </span>
            )}
          </mark>
        );
      }
      return seg.text;
    });
  };

  const recursiveMap = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === 'string') {
      return processText(node);
    }
    if (React.isValidElement(node)) {
      const element = node as React.ReactElement<{ children?: React.ReactNode }>;
      if (element.props && element.props.children) {
        return React.cloneElement(element, {
          ...element.props,
          children: React.Children.map(element.props.children, recursiveMap)
        } as any);
      }
    }
    if (Array.isArray(node)) {
      return node.map(recursiveMap);
    }
    return node;
  };

  return React.Children.map(children, recursiveMap);
}

export function ContentPanel({
  currentScope,
  chapter,
  chapters,
  sectionId,
  completedSections,
  activeLabId,
  activeAppendixId,
  onSelectChapterSection,
  onSelectLab,
  onSelectAppendix,
  onMarkSectionComplete,
  onNavigate,
  onQuizComplete,
  prevSectionName,
  nextSectionName
}: ContentPanelProps) {
  const { user, highlights, addHighlight, deleteHighlight, updateHighlightNote } = useAuth();

  // DEMO ONLY: Payment state placeholder. Stripe Checkout will be connected in production.
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // --- 1. Course Introduction Welcome Page states ---
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [onboardingChecklist, setOnboardingChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('mis_onboarding_list');
      return saved ? JSON.parse(saved) : {
        syllabus: true,
        welcomeVideo: false,
        profileSetUp: false,
        sandboxRun: false,
      };
    } catch {
      return { syllabus: true, welcomeVideo: false, profileSetUp: false, sandboxRun: false };
    }
  });

  const toggleOnboarding = (key: string) => {
    const updated = { ...onboardingChecklist, [key]: !onboardingChecklist[key] };
    setOnboardingChecklist(updated);
    try {
      localStorage.setItem('mis_onboarding_list', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const COURSE_VIDEOS = [
    { title: "Course Introduction & Syllabus", url: "https://www.youtube.com/embed/Tk33XPZaXpE", duration: "8:24", desc: "Understanding how information systems, databases, and structured schemas unlock business intelligence and growth." },
    { title: "Relational Schema Modeling", url: "https://www.youtube.com/embed/UrYLYV7WSHM", duration: "12:15", desc: "How to structure relational entities, assign keys (Primary & Foreign), and model tables to eradicate redundancy." },
    { title: "Express Routing & REST API Architectures", url: "https://www.youtube.com/embed/SccSCuHhOw0", duration: "9:40", desc: "Piping client requests through Node runtime pipelines and composing organized JSON outputs via active endpoints." },
    { title: "Cooperative Live WebSockets Sync", url: "https://www.youtube.com/embed/28_z8S0g0fE", duration: "11:55", desc: "Composing full bidirectional socket pathways to orchestrate state broadcast streams across connected users." }
  ];

  // --- 2. Interactive Practical Labs Workspace states ---
  const [selectedLabStep, setSelectedLabStep] = useState(0);
  const activeLab = useMemo(() => {
    return LABS.find(l => l.id === activeLabId) || LABS[0];
  }, [activeLabId]);

  const [labCode, setLabCode] = useState(() => activeLab.startingCode);
  const [labTerminalLogs, setLabTerminalLogs] = useState<string[]>(["SQLite Database Sandbox ready.", "Modify the code on the left and check Verify Solution..."]);
  const [labSuccessFeedback, setLabSuccessFeedback] = useState<string | null>(null);
  const [labCompletionMap, setLabCompletionMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('mis_labs_completion_map');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showLabHint, setShowLabHint] = useState(false);

  // Synchronize dynamic code when switching labs
  useEffect(() => {
    setLabCode(activeLab.startingCode);
    setLabTerminalLogs([
      "SQLite Real-time Engine initialized.",
      `Activated template: ${activeLab.title}`,
      "Prepare your query/code statements and press Verify Solution above."
    ]);
    setLabSuccessFeedback(null);
    setSelectedLabStep(0);
    setShowLabHint(false);
  }, [activeLabId, activeLab]);

  const handleVerifyLab = () => {
    const codeLower = labCode.toLowerCase();
    const cleanLogs = [...labTerminalLogs];
    cleanLogs.push(`> [sys] EXECUTING COMPILER CHECK FOR: ${activeLab.title.toUpperCase()}`);
    
    const solutionKeyword = activeLab.validationKeyword.toLowerCase();
    const solutionCmd = activeLab.solutionCommand.toLowerCase();
    
    const containsKeyword = codeLower.includes(solutionKeyword);
    const containsCmd = codeLower.includes(solutionCmd);
    
    if (containsKeyword || containsCmd) {
      cleanLogs.push(`> [compiler] Parsing schema properties... Success!`);
      cleanLogs.push(`> [compiler] Running assertion triggers... Completed!`);
      cleanLogs.push(`[SUCCESS] EXECUTED LAB SATISFACTORILY (Exit Code 0).`);
      setLabTerminalLogs(cleanLogs);
      setLabSuccessFeedback(`Terrific! You completed all the step-by-step challenges for "${activeLab.title}". The laboratory is marked complete.`);
      const updatedMap = { ...labCompletionMap, [activeLab.id]: true };
      setLabCompletionMap(updatedMap);
      try {
        localStorage.setItem('mis_labs_completion_map', JSON.stringify(updatedMap));
      } catch (err) {
        console.error(err);
      }
    } else {
      cleanLogs.push(`> [evaluator] Code does not yet target objective.`);
      cleanLogs.push(`> [evaluator] Missing key command pattern or construct: "${activeLab.validationKeyword}"`);
      cleanLogs.push(`[WARNING] RUNTIME CODE FAILURE (Exit Code 1). Try again!`);
      setLabTerminalLogs(cleanLogs);
      setLabSuccessFeedback(null);
    }
  };

  const handleResetLab = () => {
    setLabCode(activeLab.startingCode);
    setLabTerminalLogs(["Workspace reset successfully.", "Ready for new submission."]);
    setLabSuccessFeedback(null);
  };

  // --- 3. Appendix & Terms Treasury states ---
  const [glossarySearch, setGlossarySearch] = useState('');
  const [selectedGlossaryChapter, setSelectedGlossaryChapter] = useState('all');
  const [gameModeActive, setGameModeActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameTotal, setGameTotal] = useState(0);
  const [gameSelectionResult, setGameSelectionResult] = useState<'correct' | 'incorrect' | null>(null);
  const [gameSelectionText, setGameSelectionText] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Compile aggregate definitions dictionary across all 16 chapters
  const ALL_GLOSSARY_TERMS = useMemo(() => {
    const arr: { term: string; definition: string; chapterId: string; chapterTitle: string }[] = [];
    chapters.forEach(ch => {
      ch.terms.forEach(t => {
        arr.push({
          term: t.term,
          definition: t.definition,
          chapterId: ch.id,
          chapterTitle: ch.title
        });
      });
    });
    return arr;
  }, [chapters]);

  const filteredGlossary = useMemo(() => {
    let list = ALL_GLOSSARY_TERMS;
    if (selectedGlossaryChapter !== 'all') {
      list = list.filter(t => t.chapterId === selectedGlossaryChapter);
    }
    if (glossarySearch.trim()) {
      const q = glossarySearch.toLowerCase();
      list = list.filter(t => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q));
    }
    return list;
  }, [ALL_GLOSSARY_TERMS, glossarySearch, selectedGlossaryChapter]);

  // Flashcards definitions game setup
  const [gameQuestion, setGameQuestion] = useState<{
    correctTerm: string;
    definition: string;
    options: string[];
  } | null>(null);

  const initNewGameQuestion = () => {
    if (ALL_GLOSSARY_TERMS.length === 0) return;
    setGameSelectionResult(null);
    setGameSelectionText('');
    
    // Choose a random term
    const randomIndex = Math.floor(Math.random() * ALL_GLOSSARY_TERMS.length);
    const correctNode = ALL_GLOSSARY_TERMS[randomIndex];
    
    // Generate 3 decoy matches
    const decoys: string[] = [];
    while (decoys.length < 3) {
      const idx = Math.floor(Math.random() * ALL_GLOSSARY_TERMS.length);
      const dec = ALL_GLOSSARY_TERMS[idx].term;
      if (dec !== correctNode.term && !decoys.includes(dec)) {
        decoys.push(dec);
      }
    }
    
    const finalOptions = [correctNode.term, ...decoys].sort(() => Math.random() - 0.5);
    setGameQuestion({
      correctTerm: correctNode.term,
      definition: correctNode.definition,
      options: finalOptions
    });
  };

  const handleAnswerGame = (termSelected: string) => {
    if (!gameQuestion || gameSelectionResult) return;
    setGameTotal(prev => prev + 1);
    setGameSelectionText(termSelected);
    if (termSelected === gameQuestion.correctTerm) {
      setGameScore(prev => prev + 1);
      setGameSelectionResult('correct');
    } else {
      setGameSelectionResult('incorrect');
    }
  };

  // SQL syntax cheatsheet mock playground querying states
  const [sqlPlaygroundQuery, setSqlPlaygroundQuery] = useState(`SELECT Users.email, Orders.created_at, OrderItems.unit_price \nFROM Users\nJOIN Orders ON Users.user_id = Orders.user_id\nJOIN OrderItems ON Orders.order_id = OrderItems.order_id\nWHERE OrderItems.unit_price > 50\nORDER BY OrderItems.unit_price DESC;`);
  
  const [mockSQLData, setMockSQLData] = useState<{ columns: string[]; rows: any[] } | null>({
    columns: ['email', 'created_at', 'unit_price'],
    rows: [
      { email: 'nimrod.dvir@gmail.com', created_at: '2026-05-28 02:10:45', unit_price: 299.99 },
      { email: 'student.alpha@berkeley.edu', created_at: '2026-05-27 15:44:12', unit_price: 99.99 },
      { email: 'colleague.dev@stanford.edu', created_at: '2026-05-28 11:23:09', unit_price: 55.50 }
    ]
  });

  const runMockSQLPlayground = () => {
    const qLower = sqlPlaygroundQuery.toLowerCase();
    
    if (qLower.includes('users') && qLower.includes('orders') && qLower.includes('join')) {
      setMockSQLData({
        columns: ['email', 'created_at', 'unit_price'],
        rows: [
          { email: 'nimrod.dvir@gmail.com', created_at: '2026-05-28 02:10:45', unit_price: 299.99 },
          { email: 'student.alpha@berkeley.edu', created_at: '2026-05-27 15:44:12', unit_price: 99.99 },
          { email: 'colleague.dev@stanford.edu', created_at: '2026-05-28 11:23:09', unit_price: 55.50 }
        ]
      });
    } else if (qLower.includes('users')) {
      setMockSQLData({
        columns: ['user_id', 'email', 'created_at'],
        rows: [
          { user_id: 1, email: 'nimrod.dvir@gmail.com', created_at: '2026-05-25 08:30:00' },
          { user_id: 2, email: 'student.alpha@berkeley.edu', created_at: '2026-05-26 14:12:00' },
          { user_id: 3, email: 'colleague.dev@stanford.edu', created_at: '2026-05-27 09:20:00' }
        ]
      });
    } else if (qLower.includes('products')) {
      setMockSQLData({
        columns: ['product_id', 'product_name', 'unit_price', 'stock_level'],
        rows: [
          { product_id: 101, product_name: 'SQL Cloud Engine Suite', unit_price: 299.99, stock_level: 45 },
          { product_id: 102, product_name: 'Database Security Sandbox', unit_price: 99.99, stock_level: 120 },
          { product_id: 103, product_name: 'Relational Model Visualizer', unit_price: 49.99, stock_level: 8 }
        ]
      });
    } else {
      setMockSQLData({
        columns: ['query_status'],
        rows: [
          { query_status: 'Executed successfully. Return set empty. Tip: Select from tables: Users, Products.' }
        ]
      });
    }
  };

  const copySyntax = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // --- Sub-renderers calculations ---
  const sectionHighlights = useMemo(() => {
    return highlights.filter(h => h.chapterId === chapter.id && h.sectionId === sectionId);
  }, [highlights, chapter.id, sectionId]);

  const readingTime = useMemo(() => {
    return calculateReadingTime(chapter, sectionId);
  }, [chapter, sectionId]);

  const currentMetadata = SECTIONS_METADATA[sectionId];
  const IconComponent = currentMetadata.icon;
  const isCompleted = completedSections.includes(`${chapter.id}_${sectionId}`);

  // Render markdown parser wrapper
  const renderMarkdown = (text: string) => {
    return (
      <div className="prose prose-zinc prose-indigo max-w-none text-zinc-700 leading-relaxed text-sm my-4">
        <Markdown
          components={{
            h1: ({ children }) => <h1 className="text-2xl font-bold tracking-tight text-zinc-900 mt-6 mb-3 border-b border-zinc-100 pb-1">{applyHighlights(children, sectionHighlights)}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold tracking-tight text-zinc-800 mt-6 mb-2">{applyHighlights(children, sectionHighlights)}</h2>,
            p: ({ children }) => <p className="mb-4 leading-relaxed text-zinc-650">{applyHighlights(children, sectionHighlights)}</p>,
            code: ({ children }) => (
              <code className="bg-zinc-100 text-indigo-600 px-1 py-0.5 rounded font-mono text-[13px]">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-zinc-950 text-zinc-100 p-4 rounded-xl overflow-x-auto my-5 shadow-xs font-mono text-xs">
                {children}
              </pre>
            ),
            ul: ({ children }) => <ul className="list-disc pl-5 space-y-1.5 my-3 text-zinc-650">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1.5 my-3 text-zinc-650">{children}</ol>,
            li: ({ children }) => <li className="pl-0.5">{applyHighlights(children, sectionHighlights)}</li>,
          }}
        >
          {text}
        </Markdown>
      </div>
    );
  };

  // Render contents based on active section key
  const renderSectionContent = () => {
    switch (sectionId) {
      case 'intro':
        return (
          <div className="space-y-6 animate-fadeIn">
            {renderMarkdown(chapter.introduction)}
          </div>
        );

      case 'concepts':
        return (
          <div className="space-y-8 animate-fadeIn">
            <h2 className="text-xl font-bold text-zinc-900 tracking-tight border-b border-zinc-100 pb-2 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-rose-500 rounded-full" />
              {chapter.concepts.title}
            </h2>
            <motion.div 
              className="space-y-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {chapter.concepts.subsections.map((sub, idx) => (
                <motion.div 
                  key={idx} 
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    }
                  }}
                  whileHover={{ 
                    scale: 1.015, 
                    y: -2,
                    boxShadow: "0 6px 16px -4px rgba(0, 0, 0, 0.06), 0 2px 6px -2px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="bg-white border border-zinc-200 p-5 rounded-2xl shadow-xs hover:border-zinc-300 transition-colors"
                >
                  <h3 className="text-base font-bold text-zinc-800 mb-2 flex items-center gap-1.5">
                    <span className="text-xs text-indigo-500 font-bold bg-indigo-50/70 p-1 w-5 h-5 flex items-center justify-center rounded">
                      2.{idx + 1}
                    </span>
                    {applyHighlights(sub.title, sectionHighlights)}
                  </h3>
                  <div className="text-zinc-600 leading-relaxed text-sm">
                    {renderMarkdown(sub.content)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        );

      case 'build':
        return (
          <div className="space-y-6 animate-fadeIn">
            {renderMarkdown(chapter.build)}
          </div>
        );

      case 'questions':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-xl text-zinc-800">
              <div className="flex items-center gap-2 font-bold mb-3 text-amber-900">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                Reflective Assessment Prompts
              </div>
              {renderMarkdown(chapter.questions)}
            </div>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapter.terms.map((term, index) => (
                <div 
                  key={index}
                  className="bg-white border border-zinc-200 p-4 rounded-xl shadow-xs flex flex-col gap-2 transition-all hover:bg-zinc-50/30"
                >
                  <span className="font-bold text-indigo-600 text-sm">{applyHighlights(term.term, sectionHighlights)}</span>
                  <div className="text-zinc-500 text-xs leading-relaxed">{renderMarkdown(term.definition)}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'rat':
        if (!chapter.rat || chapter.rat.length === 0) {
          return (
            <div className="animate-fadeIn max-w-xl mx-auto py-8 text-center">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
                <HelpCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-zinc-800 mb-2">RAT Questions Coming Soon</h3>
                <p className="text-sm text-zinc-500">Structured quiz questions for this chapter will be available in a future update.</p>
              </div>
            </div>
          );
        }
        return (
          <div className="animate-fadeIn max-w-xl mx-auto py-2">
            <Quiz 
              questions={chapter.rat} 
              onComplete={onQuizComplete}
              inline={true}
            />
          </div>
        );
    }
  };

  // --- HTML5 Video and Text Welcoming Page ---
  const renderBookWelcome = () => {
    return (
      <div className="flex-1 flex flex-col h-full bg-zinc-50 overflow-y-auto animate-fadeIn select-none p-6 md:p-8 space-y-8">
        {/* Banner */}
        <div className="bg-indigo-600 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden shadow-xl gap-4 shrink-0">
          <div className="relative z-10 max-w-xl">
            <span className="text-[10px] text-indigo-200 font-extrabold uppercase tracking-widest bg-indigo-700/60 px-2.5 py-1 rounded-full border border-indigo-500/20">Welcome Orientation</span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-3 mb-2 text-white">Management Information Systems</h1>
            <p className="text-sm text-indigo-150 leading-relaxed max-w-lg">
              Welcome to your digital textbook space. This educational portal balances rigorous textbook chapters, hands-on SQL and API sandbox labs, and a Term Treasury dictionary study workspace.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-3 shrink-0 relative z-10">
            <GraduationCap className="w-10 h-10 text-indigo-200" />
            <div>
              <div className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">Instructor Course Coordinator</div>
              <div className="text-sm font-extrabold text-white">Dr. Nimrod Dvir</div>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-indigo-500 opacity-20 blur-2xl" />
        </div>

        {/* Video & Checklist Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Video Section */}
          <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="p-5 border-b border-zinc-150 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-indigo-600 fill-indigo-100 shrink-0" />
                <h3 className="text-sm font-extrabold text-zinc-800">Dynamic Orientation Lessons Video</h3>
              </div>
              <div className="text-xs text-zinc-500 font-bold bg-zinc-100 px-2 py-0.5 rounded border border-zinc-150">
                Duration: {COURSE_VIDEOS[activeVideoIndex].duration}
              </div>
            </div>
            
            {/* The absolute Video IFrame Embed Container */}
            <div className="aspect-video bg-black relative">
              <iframe
                src={COURSE_VIDEOS[activeVideoIndex].url}
                title={COURSE_VIDEOS[activeVideoIndex].title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video description */}
            <div className="p-5 bg-zinc-50/50">
              <h4 className="text-sm font-bold text-zinc-900 mb-1">{COURSE_VIDEOS[activeVideoIndex].title}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">{COURSE_VIDEOS[activeVideoIndex].desc}</p>
            </div>

            {/* Video Curriculum tracklist selector */}
            <div className="p-4 border-t border-zinc-150 space-y-1 bg-white">
              <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest px-1 mb-2">Orientation Playlist Curriculum</div>
              {COURSE_VIDEOS.map((vid, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveVideoIndex(idx);
                    toggleOnboarding('welcomeVideo');
                  }}
                  className={cn(
                    "w-full flex items-center justify-between text-left p-2.5 rounded-xl transition-all cursor-pointer",
                    activeVideoIndex === idx
                      ? "bg-indigo-50/70 border border-indigo-150 text-indigo-900 font-semibold"
                      : "hover:bg-zinc-50 text-zinc-700 font-medium"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={cn(
                      "w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold",
                      activeVideoIndex === idx ? "bg-indigo-600 text-white" : "bg-zinc-100 text-zinc-500"
                    )}>
                      {idx + 1}
                    </div>
                    <div className="truncate min-w-0">
                      <div className="text-xs font-bold truncate">{vid.title}</div>
                      <div className="text-[10px] text-zinc-400 font-medium truncate">{vid.desc}</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded ml-2 shrink-0">{vid.duration}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Checklist and Overview Column */}
          <div className="space-y-6">
            <div className="bg-white border border-zinc-200 rounded-3xl p-5 shadow-xs">
              <h3 className="text-sm font-extrabold text-zinc-900 mb-4 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-indigo-600" />
                <span>Onboarding Checklist</span>
              </h3>
              
              <div className="space-y-3">
                {[
                  { key: 'syllabus', label: 'Review Orientation Syllabus Syllabus', subtext: 'Read description materials' },
                  { key: 'welcomeVideo', label: 'Complete Introductory Lecture Overview', subtext: 'Watch classroom video introduction' },
                  { key: 'profileSetUp', label: 'Set Up Local Workspace Account Identity', subtext: 'Sign In to sync your test scores' },
                  { key: 'sandboxRun', label: 'Run Simulated Queries in the Sandbox', subtext: 'Explore labs workspace or SQL editor' }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => toggleOnboarding(item.key)}
                    className="w-full flex items-start gap-3 p-3 rounded-2xl hover:bg-zinc-50 border border-transparent hover:border-zinc-150 text-left cursor-pointer transition-all"
                  >
                    <div className="mt-0.5 shrink-0">
                      {onboardingChecklist[item.key] ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-300" />
                      )}
                    </div>
                    <div>
                      <div className={cn("text-xs font-bold leading-none mb-0.5", onboardingChecklist[item.key] ? "line-through text-zinc-400" : "text-zinc-800")}>
                        {item.label}
                      </div>
                      <div className="text-[10px] text-zinc-500 leading-tight">{item.subtext}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-6 pt-4 border-t border-zinc-150">
                <div className="flex justify-between items-center text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider mb-2">
                  <span>Getting Started Progress</span>
                  <span className="text-indigo-600">
                    {Math.round((Object.values(onboardingChecklist).filter(Boolean).length / Object.keys(onboardingChecklist).length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-300" 
                    style={{ width: `${(Object.values(onboardingChecklist).filter(Boolean).length / Object.keys(onboardingChecklist).length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-xs">
                <span className="text-[9px] text-indigo-500 font-extrabold uppercase tracking-widest block mb-0.5">Chapters Completed</span>
                <span className="text-2xl font-black text-zinc-800 tracking-tight">{completedSections.length}</span>
                <span className="text-zinc-400 text-[10px] font-medium block leading-none mt-1">out of 96 total sections</span>
              </div>
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-xs">
                <span className="text-[9px] text-emerald-500 font-extrabold uppercase tracking-widest block mb-0.5">Glossary Words</span>
                <span className="text-2xl font-black text-zinc-800 tracking-tight">{ALL_GLOSSARY_TERMS.length}</span>
                <span className="text-zinc-400 text-[10px] font-medium block leading-none mt-1">aggregate definitions</span>
              </div>
            </div>

            {/* Navigation Assist CTA Card */}
            <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-4 text-white shadow-md relative overflow-hidden flex flex-col gap-3">
              <p className="text-[11px] text-zinc-300 leading-relaxed relative z-10 pr-6">
                Directly select active lessons in the side panel or switch category tabs to trigger Labs exercises!
              </p>
              <button
                onClick={() => onSelectChapterSection('ch1', 'intro')}
                className="self-start text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors z-10"
              >
                <span>Browse Chapter 1 Syllabus HTML5</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="absolute bottom-[-10px] right-[-10px] text-zinc-800 opacity-20 pointer-events-none">
                <BookOpen className="w-24 h-24 stroke-[4]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Database Laboratory workspace ---
  const renderLab = () => {
    const isLabWelcome = activeLabId === 'welcome';

    if (isLabWelcome) {
      return (
        <div className="flex-1 flex flex-col h-full bg-zinc-50 overflow-y-auto animate-fadeIn p-6 md:p-8 space-y-8">
          {/* Header Banner */}
          <div className="bg-emerald-600 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center relative overflow-hidden shadow-md gap-4 shrink-0">
            <div>
              <span className="text-[10px] text-emerald-200 font-extrabold uppercase tracking-widest bg-emerald-700/60 px-2.5 py-1 rounded-full border border-emerald-500/20">Practical Application Suite</span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-3 mb-2 text-white">Database Labs Workspace</h1>
              <p className="text-sm text-emerald-100 leading-relaxed max-w-lg">
                Translate critical knowledge theories directly into operational schemas and SQL scripts. Solve 4 distinct database laboratory challenges below to score completion rewards.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-3 shrink-0">
              <Terminal className="w-10 h-10 text-emerald-200" />
              <div>
                <div className="text-[10px] font-bold text-emerald-200 uppercase tracking-wider">Database Engine</div>
                <div className="text-sm font-extrabold text-white">SQLite Core v3.0</div>
              </div>
            </div>
          </div>

          {/* Lab List Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LABS.map((lb) => {
              const isCompleted = !!labCompletionMap[lb.id];
              return (
                <div 
                  key={lb.id}
                  className="bg-white border hover:border-zinc-300 rounded-2xl p-5 shadow-xs transition-all relative group flex flex-col justify-between hover:-translate-y-0.5 space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <span className={cn(
                        "text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider leading-none",
                        lb.difficulty === 'Beginner' ? "bg-emerald-50 border-emerald-100 text-emerald-600" :
                        lb.difficulty === 'Intermediate' ? "bg-amber-50 border-amber-100 text-amber-600" :
                        "bg-rose-50 border-rose-100 text-rose-600"
                      )}>
                        {lb.difficulty}
                      </span>
                      {isCompleted ? (
                        <span className="text-[9px] font-bold bg-emerald-50 border border-emerald-100 text-emerald-600 px-2.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                          <Check className="w-2.5 h-2.5" /> Completed
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold bg-zinc-100 border border-zinc-200 text-zinc-500 px-2.5 py-0.5 rounded-full">
                          Ready to Launch
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-extrabold text-zinc-800 leading-snug">{lb.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">{lb.subtitle}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-300" /> Est: {lb.estMinutes} mins
                    </span>
                    <button
                      onClick={() => onSelectLab(lb.id)}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer pr-1"
                    >
                      <span>Start Lab Suite</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SQLite Quick Guide Onboard */}
          <div className="bg-zinc-900 text-white rounded-2xl p-5 border border-zinc-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="max-w-xl space-y-1">
              <h3 className="text-sm font-extrabold text-zinc-105 flex items-center gap-1.5 leading-none">
                <BookMarked className="w-4 h-4 text-emerald-400" /> Syllabus Laboratory Rule
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                Assertion units will check code for appropriate schemas and keywords. Ensure keys and aggregate logic comply with design structures to activate rewards.
              </p>
            </div>
            <button
              onClick={() => onSelectLab('lab1')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold leading-none shrink-0 cursor-pointer shadow-md shadow-emerald-950/20"
            >
              Enter Lab 1: ERDs
            </button>
          </div>
        </div>
      );
    }

    const isCurrentCompleted = !!labCompletionMap[activeLab.id];

    return (
      <div className="flex-1 flex flex-col h-full bg-zinc-50 animate-fadeIn overflow-hidden">
        {/* Lab Workspace Top Bar */}
        <div className="border-b border-zinc-200 px-6 py-4 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between shrink-0 gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectLab('welcome')}
              className="p-1 px-2.5 bg-zinc-100 hover:bg-zinc-200 select-none text-zinc-650 cursor-pointer transition-colors text-xs font-bold rounded-lg border border-zinc-200"
            >
              ← All Labs Overview
            </button>
            <div className="h-6 w-px bg-zinc-200 hidden sm:block" />
            <div>
              <div className="text-[9px] uppercase font-bold text-zinc-400 leading-none">Practical Lab Assignment</div>
              <h1 className="text-base font-extrabold text-zinc-800 leading-tight pt-1 truncate max-w-xs md:max-w-md">{activeLab.title}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleVerifyLab}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-lg leading-none cursor-pointer shadow-md shadow-emerald-50 transition-colors flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Verify Solution & Compile
            </button>
            <button
              onClick={handleResetLab}
              className="p-2 text-zinc-500 hover:text-zinc-800 bg-zinc-100 hover:bg-zinc-200 rounded-lg border border-zinc-200 cursor-pointer transition-colors"
              title="Reset code template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Outer Split Layout */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Instructions Left Column */}
          <div className="w-full lg:w-[420px] bg-white border-b lg:border-b-0 lg:border-r border-zinc-200 overflow-y-auto flex flex-col shrink-0">
            {/* Objective Metadata card */}
            <div className="p-5 border-b border-zinc-150 space-y-3 shrink-0">
              <div className="flex justify-between items-center text-[10px] font-extrabold uppercase text-zinc-400 tracking-wider">
                <span>Lab Blueprint Goal</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[8px]",
                  activeLab.difficulty === 'Beginner' ? "bg-emerald-50 text-emerald-600" :
                  activeLab.difficulty === 'Intermediate' ? "bg-amber-50 text-amber-600" :
                  "bg-rose-50 text-rose-600"
                )}>
                  {activeLab.difficulty}
                </span>
              </div>
              <p className="text-xs text-zinc-700 leading-relaxed font-semibold">
                {activeLab.objective}
              </p>
            </div>

            {/* Stepper Steps Tabs Selection */}
            <div className="p-4 border-b border-zinc-100 space-y-2 bg-zinc-50/50">
              <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Step-by-step Milestones</div>
              <div className="space-y-1">
                {activeLab.steps.map((st, sIdx) => {
                  const isActive = selectedLabStep === sIdx;
                  return (
                    <button
                      key={sIdx}
                      onClick={() => setSelectedLabStep(sIdx)}
                      className={cn(
                        "w-full flex text-left items-start gap-2.5 p-2 px-3 rounded-xl transition-all cursor-pointer border",
                        isActive 
                          ? "bg-white border-zinc-200 text-zinc-850 shadow-xs" 
                          : "bg-transparent border-transparent text-zinc-500 hover:bg-zinc-102"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black",
                        isActive ? "bg-emerald-600 text-white" : "bg-zinc-200 text-zinc-650"
                      )}>
                        {sIdx + 1}
                      </div>
                      <span className="text-xs font-bold leading-tight mt-0.5">{st.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step specific instructions guidelines detail */}
            <div className="p-5 flex-1 space-y-4">
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-black text-zinc-400 tracking-widest leading-none">Objective Instructions</div>
                <h3 className="text-xs font-bold text-zinc-800 mt-2">{activeLab.steps[selectedLabStep].title}</h3>
                <p className="text-xs text-zinc-650 leading-relaxed pt-1.5 bg-slate-50 border border-zinc-100 p-3.5 rounded-2xl italic">
                  "{activeLab.steps[selectedLabStep].instruction}"
                </p>
              </div>

              {/* Toggle Hint button */}
              <div className="pt-2 border-t border-zinc-100">
                <button
                  onClick={() => setShowLabHint(!showLabHint)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{showLabHint ? 'Hide System Hint Option' : 'Show System Hint Option'}</span>
                </button>
                {showLabHint && (
                  <div className="mt-2.5 p-3 rounded-xl bg-orange-50 border border-orange-100 text-[11px] text-orange-950 leading-relaxed shadow-inner">
                    <span className="font-extrabold uppercase text-[9px] text-orange-600 block mb-0.5">Assistance Trigger</span>
                    {activeLab.hint}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Code Workspace Editor and Terminal Console Right Column */}
          <div className="flex-1 flex flex-col overflow-hidden bg-zinc-900">
            {/* Validation Banner or Success feedback message */}
            {labSuccessFeedback && (
              <div className="bg-emerald-500 text-white p-4.5 px-6 shrink-0 relative flex items-center justify-between gap-4 animate-slideDown shadow-lg">
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-5 h-5 text-emerald-100 shrink-0" />
                  <div>
                    <div className="font-extrabold text-xs">Achievement Registered!</div>
                    <div className="text-[11px] leading-tight text-emerald-100 mt-0.5">{labSuccessFeedback}</div>
                  </div>
                </div>
                <button
                  onClick={() => setLabSuccessFeedback(null)}
                  className="text-emerald-100 hover:text-white p-1 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* The Code Editor container */}
            <div className="flex-1 flex flex-col min-h-[300px] relative">
              <div className="border-b border-zinc-800 px-4 py-2 bg-zinc-950 flex justify-between items-center shrink-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Sandbox code_editor.sql
                </span>
                <span className="text-[9px] text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded font-mono">
                  UTF-8 text SQL
                </span>
              </div>
              <textarea
                value={labCode}
                onChange={(e) => setLabCode(e.target.value)}
                placeholder="-- Write SQL here..."
                className="flex-1 w-full p-5 bg-zinc-950 text-emerald-400 font-mono text-xs focus:outline-hidden resize-none leading-relaxed overflow-y-auto selection:bg-emerald-950 selection:text-emerald-300"
              />
            </div>

            {/* Terminal Panel */}
            <div className="h-[200px] border-t border-zinc-800 bg-zinc-950 flex flex-col overflow-hidden shrink-0">
              <div className="border-b border-zinc-800 px-4 py-2 bg-zinc-902 flex justify-between items-center shrink-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 font-mono">Interactive Output Console Logs</span>
                <button
                  onClick={() => setLabTerminalLogs([`Console output flushed at ${new Date().toLocaleTimeString()} ...`])}
                  className="text-[9px] text-zinc-500 hover:text-zinc-300 select-none cursor-pointer uppercase font-bold"
                >
                  Clear Logs
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 py-2.5 font-mono text-[10px] text-zinc-300 space-y-1 selection:bg-blue-950 select-text">
                {labTerminalLogs.map((log, index) => {
                  let logClass = "text-zinc-400";
                  if (log.startsWith("[SUCCESS]")) logClass = "text-emerald-400 font-bold";
                  if (log.startsWith("[WARNING]")) logClass = "text-amber-400 font-bold";
                  if (log.startsWith('[evaluator]')) logClass = "text-zinc-500";
                  if (log.startsWith('>')) logClass = "text-indigo-400";
                  return (
                    <div key={index} className={cn("leading-relaxed", logClass)}>
                      {log}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Appendix & Term Treasury ---
  const renderAppendix = () => {
    const isTreasury = activeAppendixId === 'treasury';

    if (isTreasury) {
      return (
        <div className="flex-1 flex flex-col h-full bg-zinc-50 overflow-hidden animate-fadeIn">
          {/* Glossary Header Board */}
          <div className="px-6 py-5 border-b border-zinc-150 bg-white flex flex-col md:flex-row md:items-center md:justify-between shrink-0 gap-4">
            <div>
              <span className="text-[10px] text-indigo-500 font-extrabold uppercase tracking-widest leading-none">Comprehensive Appendix dictionary</span>
              <h1 className="text-xl font-extrabold text-zinc-800 leading-tight pt-1">Appendix: Term Treasury Glossary</h1>
            </div>
            
            <button
              onClick={() => {
                setGameModeActive(!gameModeActive);
                if (!gameModeActive) {
                  initNewGameQuestion();
                }
              }}
              className={cn(
                "px-4 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer",
                gameModeActive 
                  ? "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-150"
              )}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>{gameModeActive ? 'Close Flashcards Mini-Game' : 'Vocabulary Flashcards Match Challenge'}</span>
            </button>
          </div>

          {gameModeActive ? (
            /* Interactive Flashcard Review Game Screen */
            <div className="flex-1 p-6 overflow-y-auto flex items-center justify-center bg-indigo-50/20">
              <div className="max-w-lg w-full bg-white border border-indigo-100 rounded-3xl p-6.5 shadow-xl space-y-6 animate-scaleUp">
                {/* Game Stats */}
                <div className="flex justify-between items-center bg-indigo-50 border border-indigo-120 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-indigo-950">
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-indigo-600" />
                    <span>Vocabulary match streak:</span>
                    <span className="font-black text-indigo-700">{gameScore} / {gameTotal}</span>
                  </div>
                  <button
                    onClick={() => {
                      setGameScore(0);
                      setGameTotal(0);
                      initNewGameQuestion();
                    }}
                    className="text-[9px] hover:underline"
                  >
                    Reset statistics
                  </button>
                </div>

                {/* Definition prompt card */}
                {gameQuestion && (
                  <div className="space-y-4">
                    <div className="text-[10px] uppercase font-black text-zinc-400 tracking-widest leading-none text-center">Formulate Vocabulary definition term match</div>
                    
                    <div className="bg-zinc-50 border border-zinc-150 p-5 rounded-2xl italic text-xs leading-relaxed text-zinc-800 text-center font-medium. relative">
                      "{gameQuestion.definition}"
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-100/80 px-2 py-0.5 rounded text-[8px] border border-indigo-200 text-indigo-800 font-bold select-none leading-none">
                        Definition text prompt
                      </div>
                    </div>

                    {/* Choices multiple choice button blocks */}
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {gameQuestion.options.map((option, oIdx) => {
                        const isChosen = gameSelectionText === option;
                        const isCorrectOption = option === gameQuestion.correctTerm;
                        
                        let optBtnStyle = "bg-white hover:bg-zinc-50 border-zinc-205 text-zinc-800 text-xs font-semibold p-3.5 rounded-xl text-left border cursor-pointer hover:border-zinc-350 transition-all";
                        
                        if (gameSelectionResult) {
                          if (isCorrectOption) {
                            optBtnStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 text-xs font-bold p-3.5 rounded-xl text-left border flex justify-between items-center";
                          } else if (isChosen) {
                            optBtnStyle = "bg-rose-50 border-rose-300 text-rose-900 text-xs font-bold p-3.5 rounded-xl text-left border flex justify-between items-center";
                          } else {
                            optBtnStyle = "bg-zinc-50 border-zinc-200 text-zinc-400 text-xs p-3.5 rounded-xl text-left border opacity-40 select-none";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={!!gameSelectionResult}
                            onClick={() => handleAnswerGame(option)}
                            className={optBtnStyle}
                          >
                            <span>{option}</span>
                            {gameSelectionResult && isCorrectOption && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                            {gameSelectionResult && isChosen && !isCorrectOption && <X className="w-4 h-4 text-rose-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next match controls */}
                    {gameSelectionResult && (
                      <div className="pt-4 flex flex-col justify-center items-center gap-3 animate-slideUp">
                        <span className={cn(
                          "text-xs font-bold font-sans",
                          gameSelectionResult === 'correct' ? "text-emerald-600" : "text-rose-600"
                        )}>
                          {gameSelectionResult === 'correct' ? '✦ Magnificent job! Match established!' : `✦ Incorrect. Correct match was "${gameQuestion.correctTerm}"`}
                        </span>
                        <button
                          onClick={initNewGameQuestion}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer shadow-lg shadow-indigo-100 flex items-center gap-1.5"
                        >
                          Next Vocabulary Match <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Traditional Dictionary query board list */
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Search & Filter sub bar */}
              <div className="px-6 py-3 border-b border-zinc-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="w-full sm:w-[250px] relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={glossarySearch}
                    onChange={(e) => setGlossarySearch(e.target.value)}
                    placeholder="Filter vocabulary glossary..."
                    className="w-full pl-9 pr-4 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-hidden focus:border-indigo-500 placeholder-zinc-400 transition-all font-sans"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Chapter Context:</span>
                  <select
                    value={selectedGlossaryChapter}
                    onChange={(e) => setSelectedGlossaryChapter(e.target.value)}
                    className="bg-zinc-50 border border-zinc-200 text-zinc-700 text-xs px-2 py-1.5 rounded-lg focus:outline-hidden focus:border-indigo-500 font-sans cursor-pointer"
                  >
                    <option value="all">Display All (16 Chapters Combined)</option>
                    {chapters.map(ch => (
                      <option key={ch.id} value={ch.id}>Chapter {ch.title.split('.')[0]}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vocabulary terms list container */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {filteredGlossary.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center">
                    <Search className="w-12 h-12 text-zinc-300 stroke-[1.5] mb-2" />
                    <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">No matching metadata records</span>
                    <p className="text-[11px] text-zinc-500 max-w-sm mt-1">Adjust database search entries or select another specific Chapter context filter above.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredGlossary.map((gt, gIdx) => (
                      <div
                        key={gIdx}
                        className="bg-white border select-text border-zinc-200 hover:border-zinc-300 p-4.5 rounded-2xl shadow-xs space-y-2.5 transition-all hover:bg-zinc-50/20 group relative overflow-hidden"
                      >
                        <div className="flex justify-between items-start gap-3 flex-wrap">
                          <span className="font-extrabold text-sm text-indigo-700 leading-tight">{gt.term}</span>
                          <span className="text-[8px] bg-zinc-100 text-zinc-555 border border-zinc-205 px-2 py-0.5 rounded uppercase font-bold select-none leading-none tracking-wider shrink-0 block">
                            Ch {gt.chapterId.substring(2)}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-650 leading-relaxed max-w-[92%]">{gt.definition}</p>
                        
                        <div className="absolute bottom-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity select-none flex items-center">
                          <span className="text-[8px] text-zinc-400 italic">Term dictionary record</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    // SQL SYNTAX PLAYGROUND REFERENCE
    return (
      <div className="flex-1 flex flex-col h-full bg-zinc-50 overflow-hidden animate-fadeIn select-none font-sans">
        {/* Header Title */}
        <div className="px-6 py-5 border-b border-zinc-200 bg-white shrink-0">
          <span className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest leading-none">Interactive syntax schemas</span>
          <h1 className="text-xl font-extrabold text-zinc-800 pt-1 leading-none">Appendix: SQL Query Syntax Reference Card</h1>
        </div>

        {/* Structured Grid containing reference and interactive play workspace */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Reference Column Left */}
          <div className="w-full lg:w-[480px] bg-white border-b lg:border-b-0 lg:border-r border-zinc-200 overflow-y-auto p-5 space-y-6 flex flex-col shrink-0">
            <div className="space-y-1">
              <h2 className="text-xs font-black uppercase text-zinc-400 tracking-wider flex items-center gap-1.5">
                <Database className="w-4 h-4 text-indigo-500" /> Standard Database Command Card
              </h2>
              <p className="text-[11px] text-zinc-500 leading-relaxed pt-1 font-sans">
                A dictionary guide referencing operational queries. Use the handy Copy widget icons inside code slots to transfer syntaxes directly.
              </p>
            </div>

            {/* Reference lists item grids */}
            <div className="space-y-4 font-sans">
              {[
                { 
                  cmd: 'CREATE TABLE',
                  desc: 'Formulates state relationships with primary constraints and entity attributes.',
                  code: 'CREATE TABLE Students (\n  student_id INTEGER PRIMARY KEY DEFAULT,\n  email TEXT UNIQUE NOT NULL,\n  cumulative_spending NUMERIC\n);'
                },
                { 
                  cmd: 'SELECT FROM JOIN',
                  desc: 'Cross-aggregates rows matching foreign links to gather consolidated views.',
                  code: 'SELECT Users.email, Orders.created_at \nFROM Users\nJOIN Orders ON Users.user_id = Orders.user_id\nWHERE Orders.total > 50;'
                },
                { 
                  cmd: 'GROUP BY HAVING',
                  desc: 'Funnels database collections into aggregate buckets filtered with constraints.',
                  code: 'SELECT email, SUM(unit_price) AS total\nFROM Users JOIN LineItems\nGROUP BY email\nHAVING total > 150;'
                }
              ].map((syn, idx) => (
                <div key={idx} className="border border-zinc-205 rounded-2xl overflow-hidden shadow-xs hover:border-zinc-300 transition-colors bg-white">
                  <div className="p-3 border-b border-zinc-150 bg-zinc-50 flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-800 font-mono">{syn.cmd}</span>
                    <button
                      onClick={() => copySyntax(syn.code, idx)}
                      className="text-[10px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 cursor-pointer select-none"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-600 font-black">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Syntax</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-zinc-950 text-left">
                    <pre className="text-[11px] text-indigo-400 font-mono leading-relaxed truncate">{syn.code}</pre>
                  </div>
                  <div className="p-3 bg-white text-[10px] text-zinc-500 leading-relaxed border-t border-zinc-100">
                    {syn.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Playground Column Right */}
          <div className="flex-1 flex flex-col overflow-hidden bg-zinc-900">
            {/* Query Entry Area */}
            <div className="flex-1 flex flex-col relative min-h-[220px]">
              <div className="border-b border-zinc-800 px-4 py-2 bg-zinc-950 flex justify-between items-center shrink-0">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 font-mono flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-500" /> Interactive SQL Sandbox Query Engine
                </span>
                <button
                  onClick={runMockSQLPlayground}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-black uppercase cursor-pointer shadow-md leading-none transition-colors"
                >
                  Execute Query
                </button>
              </div>

              <textarea
                value={sqlPlaygroundQuery}
                onChange={(e) => setSqlPlaygroundQuery(e.target.value)}
                className="flex-1 w-full bg-zinc-950 text-indigo-300 font-mono text-xs p-5 focus:outline-hidden resize-none leading-relaxed overflow-y-auto"
                placeholder="-- Write query here..."
              />
            </div>

            {/* Simulated Query Row Output Results */}
            <div className="h-[250px] border-t border-zinc-800 bg-zinc-950 flex flex-col overflow-hidden shrink-0">
              <div className="border-b border-zinc-800 px-4 py-2 bg-zinc-902 shrink-0">
                <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest font-mono">ResultSet Output Table Matrix</span>
              </div>

              <div className="flex-1 overflow-auto p-4 select-text font-mono text-left">
                {mockSQLData ? (
                  <table className="w-full text-left font-mono text-[10px] text-zinc-350 border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500 font-black uppercase">
                        {mockSQLData.columns.map((cName) => (
                          <th key={cName} className="pb-2 pr-4">{cName}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-850">
                      {mockSQLData.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-zinc-900/40">
                          {mockSQLData.columns.map((cName) => (
                            <td key={cName} className="py-2.5 pr-4 truncate max-w-[180px]">{row[cName]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-[10px] text-zinc-500 font-mono">Execute a database query above to compile matrix properties...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [selectionCoords, setSelectionCoords] = useState<{
    top: number;
    left: number;
    text: string;
  } | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [showHighlightsNotebook, setShowHighlightsNotebook] = useState(false);
  const [isEditingNoteId, setIsEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState('');

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const popover = document.getElementById('highlight-popover');
      if (popover && popover.contains(e.target as Node)) {
        return;
      }
      setSelectionCoords(null);
      setNoteInput('');
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleMouseUp = (e: React.MouseEvent) => {
    const popover = document.getElementById('highlight-popover');
    if (popover && popover.contains(e.target as Node)) {
      return;
    }

    const selection = window.getSelection();
    if (!selection) return;

    const trimmed = selection.toString().trim();
    if (trimmed.length >= 3 && trimmed.length <= 1000) {
      try {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setSelectionCoords({
          top: rect.top - 120,
          left: rect.left + rect.width / 2,
          text: trimmed
        });
      } catch (err) {
        console.error("Selection boundary calculation failed", err);
      }
    }
  };

  // DEMO ONLY: Payment gateway placeholder. Stripe Checkout will be connected in production.
  const handleDemoUnlock = () => {
    setPaymentSuccess(true);
  };

  // DEMO ONLY: Payment gateway placeholder. Stripe Checkout will be connected in production.
  const renderStripePaywall = () => {
    if (paymentSuccess) {
      return (
        <div className="flex-1 flex flex-col justify-center items-center p-8 bg-zinc-50 font-sans text-center">
          <div className="max-w-md w-full bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-zinc-900 leading-tight">Access Unlocked (Demo)</h2>
              <p className="text-xs text-zinc-500 leading-relaxed px-2">
                This is a prototype. In production, Stripe Checkout will handle secure payment and access grants.
              </p>
            </div>
            <button
              onClick={() => setPaymentSuccess(false)}
              className="w-full text-center py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              Continue to Textbook
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-zinc-50 font-sans text-center">
        <div className="max-w-md w-full bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0110 0v4"></path>
            </svg>
          </div>
          <h2 className="text-xl font-extrabold text-zinc-900">Continue to Secure Checkout</h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Stripe Checkout will be connected in the production version.
          </p>
          <button
            onClick={handleDemoUnlock}
            className="w-full text-center py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer"
          >
            Unlock Access (Demo)
          </button>
        </div>
      </div>
    );
  };

  // Paid Tier Lock checks for unpaid students!
  if (user && !user.hasPaid) {
    // Lock Chapters other than Chapter 1
    if (currentScope === 'chapter' && chapter.id !== 'ch1') {
      return renderStripePaywall();
    }
    // Lock Labs
    if (currentScope === 'lab') {
      return renderStripePaywall();
    }
    // Lock AI Chat
    if (currentScope === 'ai_chat') {
      return renderStripePaywall();
    }
    // Lock non-treasury parts of appendix (like SQL terminal/playground)
    if (currentScope === 'appendix' && activeAppendixId !== 'treasury') {
      return renderStripePaywall();
    }
    // Keep old trial usage limit triggers as a safeguard for Chapter 1
    if (user.trialCount >= 10) {
      return renderStripePaywall();
    }
  }

  if (currentScope === 'welcome') {
    return renderBookWelcome();
  }
  if (currentScope === 'lab') {
    return renderLab();
  }
  if (currentScope === 'appendix') {
    return renderAppendix();
  }
  if (currentScope === 'ai_chat') {
    return <AiChatCompanion />;
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white/50 relative">
      {user && !user.hasPaid && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-2.5 text-xs font-semibold shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 shadow-inner">
          <div className="flex items-center gap-2 flex-wrap text-zinc-50">
            <span className="bg-white/20 text-white px-1.5 py-0.5 rounded text-[9px] uppercase font-black tracking-widest border border-white/10 shrink-0">
              DEMO TRIAL ACTIVE
            </span>
            <span>Educational sandbox trial: <strong>{user.trialCount} of 3</strong> previews used. Demo mode: upgrade to production for full access.</span>
          </div>
          <button
            onClick={handleDemoUnlock}
            className="bg-zinc-950 text-white hover:bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer shrink-0 self-start sm:self-auto"
          >
            Unlock Access (Demo)
          </button>
        </div>
      )}
      {/* Current Section Title Board */}
      <div className="border-b border-zinc-150 px-8 py-5 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between shrink-0 gap-3">
        <div className="flex items-center gap-3.5">
          <div className={cn("p-2 rounded-xl border", currentMetadata.color)}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-zinc-400">
                {currentMetadata.subtitle}
              </span>
              <span className="text-zinc-300 text-xs shrink-0 select-none">•</span>
              <span className="text-[10px] text-zinc-500 font-bold flex items-center gap-1 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-150 shrink-0">
                <Clock className="w-3 h-3 text-zinc-400 shrink-0" /> {readingTime} min read
              </span>
              {isCompleted && (
                <span className="text-[9px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5 shrink-0">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Read
                </span>
              )}
            </div>
            <h1 className="text-xl font-extrabold text-zinc-800 tracking-tight">
              {currentMetadata.title}
            </h1>
          </div>
        </div>

        {/* Action button grouping */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          {/* Notes Toggle Button */}
          <button
            onClick={() => setShowHighlightsNotebook(!showHighlightsNotebook)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border",
              showHighlightsNotebook 
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "bg-zinc-100 border-zinc-200 text-zinc-650 hover:bg-zinc-200/60"
            )}
            title="Toggle study outline notes"
          >
            <Highlighter className="w-3.5 h-3.5" />
            <span>My Notes ({sectionHighlights.length})</span>
          </button>

          {/* Option to manually toggle section completion (not for quiz/rat) */}
          {sectionId !== 'rat' && (
            <button
              onClick={() => onMarkSectionComplete(chapter.id, sectionId)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border",
                isCompleted 
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                  : "bg-indigo-600/10 border border-indigo-150 text-indigo-600 hover:bg-indigo-600/20"
              )}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  Done
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 shrink-0" />
                  Mark as Read
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main split work region: reading text panel + interactive sticky notebook side sheet */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Main Reading area */}
        <div 
          onMouseUp={handleMouseUp}
          className="flex-1 overflow-y-auto px-6 py-8 md:px-12 bg-white/30"
        >
          <div className="max-w-3xl mx-auto min-h-full flex flex-col justify-between">
            <div className="flex-1">{renderSectionContent()}</div>

            {/* Spacer to push navbar footer down nicely */}
            <div className="h-16 shrink-0" />
          </div>
        </div>

        {/* Study Notes & Highlighter list side drawer */}
        {showHighlightsNotebook && (
          <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-zinc-200 bg-zinc-50/70 flex flex-col h-[350px] lg:h-full shrink-0 overflow-hidden animate-slideIn">
            {/* Sidebar header */}
            <div className="p-4 border-b border-zinc-200 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Highlighter className="w-4 h-4 text-indigo-500" />
                <h2 className="text-sm font-bold text-zinc-800">My Study Notes</h2>
              </div>
              <button
                onClick={() => setShowHighlightsNotebook(false)}
                className="text-zinc-400 hover:text-zinc-650 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* highlights collection lists */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {user && !user.hasPaid ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-amber-50/25 border border-dashed border-amber-250 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-3 border border-amber-100">
                    <Star className="w-6 h-6 animate-pulse text-amber-500" />
                  </div>
                  <h3 className="text-xs font-black text-zinc-850 uppercase tracking-wider leading-none">Premium Notes Locked</h3>
                  <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed font-sans">
                    Personalized highlight tags, saved annotations, and active margin reflections require a verified student textbook activation.
                  </p>
                  <button
                    onClick={handleDemoUnlock}
                    className="mt-4 w-full text-center py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Unlock Access (Demo)
                  </button>
                </div>
              ) : sectionHighlights.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 py-8">
                  <div className="w-10 h-10 rounded-full bg-zinc-150 flex items-center justify-center text-zinc-400 mb-2">
                    <Highlighter className="w-5 h-5 opacity-50" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-500 font-sans">No Highlights in Section</p>
                  <p className="text-[10px] text-zinc-400 max-w-[180px] mt-1 leading-normal font-sans">
                    Select and highlight any text chunk inside the textbook lesson to persist notes.
                  </p>
                </div>
              ) : (
                sectionHighlights.map((hl) => {
                  let colorBorder = "border-yellow-400";
                  let colorBg = "bg-yellow-50/40 text-yellow-950";
                  let dotBg = "bg-yellow-400";
                  if (hl.color === 'green') {
                    colorBorder = "border-emerald-400";
                    colorBg = "bg-emerald-50/40 text-emerald-955";
                    dotBg = "bg-emerald-400";
                  } else if (hl.color === 'rose') {
                    colorBorder = "border-rose-400";
                    colorBg = "bg-rose-50/40 text-rose-955";
                    dotBg = "bg-rose-400";
                  } else if (hl.color === 'blue') {
                    colorBorder = "border-sky-400";
                    colorBg = "bg-sky-50/40 text-sky-955";
                    dotBg = "bg-sky-400";
                  }

                  return (
                    <div 
                      key={hl.id}
                      className={`p-3 rounded-xl border border-zinc-200 bg-white shadow-xs flex flex-col gap-2 relative group hover:border-zinc-300 transition-all border-l-3 ${colorBorder}`}
                    >
                      <p className={`text-xs font-semibold italic line-clamp-3 leading-relaxed p-2 rounded-lg font-sans ${colorBg}`}>
                        "{hl.selectedText}"
                      </p>

                      {hl.note ? (
                        <div>
                          {isEditingNoteId === hl.id ? (
                            <div className="flex flex-col gap-1.5 mt-1">
                              <textarea
                                value={editingNoteText}
                                onChange={(e) => setEditingNoteText(e.target.value)}
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-xs text-zinc-855 focus:outline-hidden resize-none h-14 font-sans focus:border-indigo-500"
                              />
                              <div className="flex justify-end gap-1.5">
                                <button
                                  onClick={() => setIsEditingNoteId(null)}
                                  className="px-2 py-1 text-[10px] text-zinc-500 hover:bg-zinc-100 rounded font-bold cursor-pointer"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={async () => {
                                    await updateHighlightNote(hl.id, editingNoteText);
                                    setIsEditingNoteId(null);
                                  }}
                                  className="px-2 py-1 text-[10px] bg-indigo-650 hover:bg-indigo-700 text-white rounded font-bold flex items-center gap-1 cursor-pointer"
                                >
                                  <Save className="w-3 h-3" /> Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-zinc-50 border border-zinc-100 p-2.5 rounded-lg relative">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[9px] font-extrabold uppercase tracking-wider text-zinc-400 flex items-center gap-1 font-sans">
                                  <span className={`w-1.5 h-1.5 rounded-full ${dotBg}`} /> Personal Note
                                </span>
                                <button
                                  onClick={() => {
                                    setIsEditingNoteId(hl.id);
                                    setEditingNoteText(hl.note || '');
                                  }}
                                  className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-indigo-600 p-0.5 rounded transition-opacity cursor-pointer duration-100"
                                  title="Edit reflection note"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="text-xs text-zinc-650 leading-relaxed font-sans">{hl.note}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        isEditingNoteId === hl.id ? (
                          <div className="flex flex-col gap-1.5 mt-1">
                            <textarea
                              value={editingNoteText}
                              onChange={(e) => setEditingNoteText(e.target.value)}
                              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2 text-xs text-zinc-800 focus:outline-hidden resize-none h-14 font-sans focus:border-indigo-500"
                              placeholder="Type notebook note..."
                            />
                            <div className="flex justify-end gap-1.5">
                              <button
                                onClick={() => setIsEditingNoteId(null)}
                                className="px-2 py-1 text-[10px] text-zinc-500 hover:bg-zinc-100 rounded font-bold cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={async () => {
                                  await updateHighlightNote(hl.id, editingNoteText);
                                  setIsEditingNoteId(null);
                                }}
                                className="px-2 py-1 text-[10px] bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <Save className="w-3 h-3" /> Save Note
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setIsEditingNoteId(hl.id);
                              setEditingNoteText('');
                            }}
                            className="self-start text-[10px] text-indigo-500 hover:text-indigo-650 hover:underline font-bold flex items-center gap-1 py-0.5 cursor-pointer font-sans"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Attach reflection notes</span>
                          </button>
                        )
                      )}

                      {/* quick delete highlighter action */}
                      <button
                        onClick={() => deleteHighlight(hl.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-rose-500 p-1 rounded-sm transition-opacity cursor-pointer duration-150"
                        title="Remove highlight"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating popup selection toolbar */}
      {selectionCoords && (
        <div 
          id="highlight-popover"
          className="fixed z-50 bg-zinc-950 text-zinc-100 border border-zinc-805 shadow-2xl rounded-2xl p-4 flex flex-col gap-3 animate-scaleUp w-85 font-sans"
          style={{ 
            top: `${Math.max(20, selectionCoords.top)}px`, 
            left: `${selectionCoords.left}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {user && !user.hasPaid ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-1.5 leading-none">
                  🔒 Highlight Annotation Locked
                </span>
                <button 
                  onClick={() => setSelectionCoords(null)}
                  className="text-zinc-500 hover:text-zinc-300 p-1 rounded-lg transition-colors cursor-pointer animate-none"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                Highlighting text, saving chapter bookmarks, and writing dynamic side annotations are locked under the trial sandbox. Complete Stripe setup to annotate syllabus topics!
              </p>
              <button
                onClick={() => {
                  setSelectionCoords(null);
                  handleDemoUnlock();
                }}
                className="w-full text-center py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black rounded-lg text-[10px] uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                Instant Upgrade ($25)
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 flex items-center gap-1 font-sans">
                  <Highlighter className="w-3 h-3 text-indigo-400" /> Save Highlight Match
                </span>
                <button 
                  onClick={() => setSelectionCoords(null)}
                  className="text-zinc-400 hover:text-zinc-150 p-1 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[11px] text-zinc-300 italic line-clamp-2 leading-relaxed bg-zinc-900 border border-zinc-805 p-2 rounded-lg font-sans">
                "{selectionCoords.text}"
              </p>

              <div>
                <textarea
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Add reflection note annotation (optional)..."
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-150 placeholder-zinc-500 focus:outline-hidden focus:border-indigo-500 resize-none h-14 font-sans"
                />
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-zinc-800">
                <span className="text-[10px] font-bold text-zinc-400">Tint Tone:</span>
                <div className="flex items-center gap-2">
                  {[
                    { id: 'yellow', name: 'Yellow', bg: 'bg-yellow-400 hover:scale-110 active:scale-95 text-yellow-900' },
                    { id: 'green', name: 'Emerald', bg: 'bg-emerald-400 hover:scale-110 active:scale-95 text-emerald-900' },
                    { id: 'rose', name: 'Rose', bg: 'bg-rose-400 hover:scale-110 active:scale-95 text-rose-900' },
                    { id: 'blue', name: 'Blue', bg: 'bg-sky-400 hover:scale-110 active:scale-95 text-sky-900' }
                  ].map((color) => (
                    <button
                      key={color.id}
                      onClick={async () => {
                        await addHighlight(chapter.id, sectionId, selectionCoords.text, color.id, noteInput);
                        setSelectionCoords(null);
                        setNoteInput('');
                        window.getSelection()?.removeAllRanges();
                      }}
                      className={`${color.bg} w-6 h-6 rounded-full shadow-md cursor-pointer transition-transform duration-100 flex items-center justify-center text-[10px] font-black`}
                      title={`Highlight as ${color.name}`}
                    >
                      h
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Nav Link Footer Navigation controls */}
      <div className="h-20 border-t border-zinc-200 bg-zinc-50 px-8 flex items-center justify-between shrink-0 shadow-inner z-10">
        <div>
          {prevSectionName && (
            <button
              onClick={() => onNavigate('prev')}
              className="flex flex-col text-left group cursor-pointer"
            >
              <span className="text-[9px] font-extrabold uppercase text-zinc-400 tracking-wider flex items-center gap-0.5 group-hover:text-indigo-600 transition-colors">
                <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-0.5" /> 
                Previous Section
              </span>
              <span className="text-xs font-bold text-zinc-700 group-hover:text-zinc-900 transition-colors truncate max-w-[120px] sm:max-w-[200px]">
                {prevSectionName}
              </span>
            </button>
          )}
        </div>

        {/* Mark Read and Next button */}
        <button
          onClick={() => {
            if (sectionId !== 'rat' && !isCompleted) {
              onMarkSectionComplete(chapter.id, sectionId);
            }
            onNavigate('next');
          }}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold leading-none flex items-center gap-2.5 transition-all shadow-md shadow-indigo-100 cursor-pointer"
        >
          <span>
            {sectionId === 'rat' 
              ? 'Next Session' 
              : isCompleted 
                ? 'Continue' 
                : 'Mark Read & Next'}
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div>
          {nextSectionName && (
            <button
              onClick={() => {
                if (sectionId !== 'rat' && !isCompleted) {
                  onMarkSectionComplete(chapter.id, sectionId);
                }
                onNavigate('next');
              }}
              className="flex flex-col text-right items-end group cursor-pointer"
            >
              <span className="text-[9px] font-extrabold uppercase text-zinc-400 tracking-wider flex items-center gap-0.5 group-hover:text-indigo-600 transition-colors">
                Next Section 
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-xs font-bold text-zinc-700 group-hover:text-zinc-900 transition-colors truncate max-w-[120px] sm:max-w-[200px]">
                {nextSectionName}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
