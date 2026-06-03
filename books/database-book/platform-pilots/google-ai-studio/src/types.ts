export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  completedChapters: string[];
  completedSections: string[];
  quizScores: Record<string, number>;
}

export interface Subsection {
  title: string;
  content: string;
}

export interface Term {
  term: string;
  definition: string;
}

export interface Chapter {
  id: string;
  title: string;
  introduction: string;
  concepts: {
    title: string;
    subsections: Subsection[];
  };
  build: string;
  questions: string;
  terms: Term[];
  rat: QuizQuestion[];
}

export type SectionType = 'intro' | 'concepts' | 'build' | 'questions' | 'terms' | 'rat';

export interface SectionInfo {
  id: SectionType;
  title: string;
}

export interface Highlight {
  id: string;
  userId?: string;
  chapterId: string;
  sectionId: string;
  selectedText: string;
  color: string;
  note?: string;
  createdAt: string;
}
