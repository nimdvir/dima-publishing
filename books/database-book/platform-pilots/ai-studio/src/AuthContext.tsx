// DEMO ONLY: This prototype uses local/demo authentication.
// Production will use Supabase Auth plus Stripe-backed access_grants.
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProgress, Highlight } from './types';
import { 
  StudentRecord, 
  authenticateStudent, 
  getStudentProgressSupabase, 
  saveStudentProgressSupabase,
  recordStudentPayment,
  incrementStudentTrial,
  isSupabaseConfigured
} from './supabase';

interface AuthContextType {
  user: StudentRecord | null;
  progress: UserProgress | null;
  highlights: Highlight[];
  loading: boolean;
  signIn: (netId: string, studentNumber: string) => Promise<StudentRecord>;
  logout: () => Promise<void>;
  updateSectionComplete: (chapterId: string, sectionId: string) => Promise<void>;
  updateQuizScore: (chapterId: string, score: number) => Promise<void>;
  addHighlight: (chapterId: string, sectionId: string, selectedText: string, color: string, note?: string) => Promise<void>;
  deleteHighlight: (highlightId: string) => Promise<void>;
  updateHighlightNote: (highlightId: string, note: string) => Promise<void>;
  incrementTrial: () => Promise<number>;
  completePayment: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_USER_KEY = 'edubook_active_student_session';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StudentRecord | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);

  // Auto-restore active session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const stored = sessionStorage.getItem(SESSION_USER_KEY);
        if (stored) {
          const credentials = JSON.parse(stored);
          const studentDoc = await authenticateStudent(credentials.netId, credentials.studentNumber);
          setUser(studentDoc);
          
          // Fetch student progress database
          const prog = await getStudentProgressSupabase(studentDoc.netId);
          setProgress(prog);

          // Get highlights
          const storedHl = localStorage.getItem(`edubook_highlights_${studentDoc.netId}`);
          if (storedHl) {
            setHighlights(JSON.parse(storedHl));
          }
        } else {
          // Initialize guest placeholder progress until login
          setProgress({
            completedChapters: [],
            completedSections: [],
            quizScores: {}
          });
        }
      } catch (e) {
        console.error("Session restoration error:", e);
        sessionStorage.removeItem(SESSION_USER_KEY);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Sync highlights state when student changes
  useEffect(() => {
    if (user) {
      const storedHl = localStorage.getItem(`edubook_highlights_${user.netId}`);
      if (storedHl) {
        setHighlights(JSON.parse(storedHl));
      } else {
        setHighlights([]);
      }
    } else {
      // Local clean slate for unlogged guests
      setHighlights([]);
    }
  }, [user]);

  // Authenticate student session
  const signIn = async (netId: string, studentNumber: string) => {
    setLoading(true);
    try {
      const studentDoc = await authenticateStudent(netId, studentNumber);
      setUser(studentDoc);

      // Save credentials to session to survive browser tab refresh
      sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify({
        netId: studentDoc.netId,
        studentNumber: studentDoc.studentNumber
      }));

      // Pull progress
      const prog = await getStudentProgressSupabase(studentDoc.netId);
      setProgress(prog);

      setLoading(false);
      return studentDoc;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = async () => {
    setUser(null);
    setProgress({
      completedChapters: [],
      completedSections: [],
      quizScores: {}
    });
    setHighlights([]);
    sessionStorage.removeItem(SESSION_USER_KEY);
  };

  // Section completion tracker synced with backend
  const updateSectionComplete = async (chapterId: string, sectionId: string) => {
    const sectionKey = `${chapterId}_${sectionId}`;
    const SECTIONS_METRIC = ['intro', 'concepts', 'build', 'questions', 'terms', 'rat'];
    const currentProgress = progress || { completedChapters: [], completedSections: [], quizScores: {} };

    if (currentProgress.completedSections.includes(sectionKey)) return;

    const newCompletedSections = [...new Set([...currentProgress.completedSections, sectionKey])];
    const allSecsComplete = SECTIONS_METRIC.every(sec => newCompletedSections.includes(`${chapterId}_${sec}`));
    const newCompletedChapters = allSecsComplete
      ? [...new Set([...currentProgress.completedChapters, chapterId])]
      : currentProgress.completedChapters;

    const nextProg: UserProgress = {
      ...currentProgress,
      completedChapters: newCompletedChapters,
      completedSections: newCompletedSections
    };

    setProgress(nextProg);

    if (user) {
      await saveStudentProgressSupabase(user.netId, nextProg);
      // Auto increment trial usage limit tracking if checking trial status
      if (!user.hasPaid) {
        await incrementTrial();
      }
    }
  };

  // Quiz grade register synced with backend
  const updateQuizScore = async (chapterId: string, score: number) => {
    const currentProgress = progress || { completedChapters: [], completedSections: [], quizScores: {} };
    const sectionKey = `${chapterId}_rat`;

    // Passing is >=2 out of 3
    const isPassing = score >= 2;
    const newCompletedSections = isPassing
      ? [...new Set([...currentProgress.completedSections, sectionKey])]
      : currentProgress.completedSections;

    const SECTIONS_METRIC = ['intro', 'concepts', 'build', 'questions', 'terms', 'rat'];
    const allSecsComplete = SECTIONS_METRIC.every(sec => newCompletedSections.includes(`${chapterId}_${sec}`));
    const newCompletedChapters = allSecsComplete
      ? [...new Set([...currentProgress.completedChapters, chapterId])]
      : currentProgress.completedChapters;

    const newQuizScores = {
      ...currentProgress.quizScores,
      [chapterId]: Math.max(currentProgress.quizScores[chapterId] || 0, score)
    };

    const nextProg: UserProgress = {
      completedChapters: newCompletedChapters,
      completedSections: newCompletedSections,
      quizScores: newQuizScores
    };

    setProgress(nextProg);

    if (user) {
      await saveStudentProgressSupabase(user.netId, nextProg);
      // Completing quizzes uses user resources limit, increment trial if not paid
      if (!user.hasPaid) {
        await incrementTrial();
      }
    }
  };

  // Highlighter actions saved inside student local outline
  const addHighlight = async (chapterId: string, sectionId: string, selectedText: string, color: string, note?: string) => {
    const highlightId = `hl_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const newHighlight: Highlight = {
      id: highlightId,
      userId: user?.netId || 'guest',
      chapterId,
      sectionId,
      selectedText,
      color,
      note: note || '',
      createdAt: new Date().toISOString()
    };

    const nextHlList = [...highlights, newHighlight];
    setHighlights(nextHlList);

    if (user) {
      localStorage.setItem(`edubook_highlights_${user.netId}`, JSON.stringify(nextHlList));
    } else {
      localStorage.setItem('edubook_highlights_guest', JSON.stringify(nextHlList));
    }
  };

  const deleteHighlight = async (highlightId: string) => {
    const nextHlList = highlights.filter(h => h.id !== highlightId);
    setHighlights(nextHlList);

    if (user) {
      localStorage.setItem(`edubook_highlights_${user.netId}`, JSON.stringify(nextHlList));
    } else {
      localStorage.setItem('edubook_highlights_guest', JSON.stringify(nextHlList));
    }
  };

  const updateHighlightNote = async (highlightId: string, note: string) => {
    const nextHlList = highlights.map(h => h.id === highlightId ? { ...h, note } : h);
    setHighlights(nextHlList);

    if (user) {
      localStorage.setItem(`edubook_highlights_${user.netId}`, JSON.stringify(nextHlList));
    } else {
      localStorage.setItem('edubook_highlights_guest', JSON.stringify(nextHlList));
    }
  };

  // Increment Trial usages
  const incrementTrial = async (): Promise<number> => {
    if (!user) return 0;
    const nextVal = await incrementStudentTrial(user.netId);
    setUser(prev => prev ? { ...prev, trialCount: nextVal } : null);
    return nextVal;
  };

  // Convert status to Paid fully
  const completePayment = async () => {
    if (!user) return;
    await recordStudentPayment(user.netId);
    setUser(prev => prev ? { ...prev, hasPaid: true } : null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      progress, 
      highlights,
      loading, 
      signIn, 
      logout, 
      updateSectionComplete, 
      updateQuizScore,
      addHighlight,
      deleteHighlight,
      updateHighlightNote,
      incrementTrial,
      completePayment
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
