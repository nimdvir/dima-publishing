// ── Source resolution type ──
export type SourceType =
  | 'stable'
  | 'dated-fallback'
  | 'chapter-fallback'
  | 'placeholder';

// ── Application scope ──
export type ReaderScope =
  | 'welcome'
  | 'book'
  | 'labs'
  | 'ai-assistant'
  | 'login';

// ── Demo user (localStorage only) ──
export interface DemoUser {
  netId: string;
  studentId: string;
  accessStatus: string;
  createdAt: string; // ISO string
}

// ── Book data model ──
export interface BookChapter {
  id: string;        // e.g. "ch01"
  slug: string;      // e.g. "ch01-introduction-to-course"
  title: string;
  folderName: string;
  sections: BookSection[];
}

export interface BookSection {
  id: string;        // e.g. "ch01-introduction"
  slug: string;      // e.g. "introduction"
  title: string;     // e.g. "Introduction"
  fileName: string;
  exists: boolean;
  sourceFile: string | null;
  sourceType: SourceType;
  pages: BookPage[];
}

export interface BookPage {
  id: string;
  slug: string;
  title: string;
  content: string;    // raw Markdown
  pageNumber: number;
  totalPages: number;
  chapterId: string;
  chapterSlug: string;
  sectionId: string;
  sectionSlug: string;
  sectionTitle: string;
  sourceFile: string | null;
  sourceType: SourceType;
  exists: boolean;
}

export interface BookLab {
  id: string;         // e.g. "lab-01-petvax-intro"
  slug: string;
  title: string;
  folderName: string;
  content: string;    // raw Markdown
  exists: boolean;
  sourceFile: string | null;
  sourceType: SourceType;
}

// ── AI Assistant ──
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
