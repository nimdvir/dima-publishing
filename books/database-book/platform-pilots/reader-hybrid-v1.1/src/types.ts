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
  | 'appendices'
  | 'login'
  | 'reset-password'
  | 'admin';

// ── Demo user (localStorage only) ──
export interface DemoUser {
  netId: string;
  studentId: string;
  accessStatus: string;
  createdAt: string; // ISO string
}

// ── Book data model ──
export interface RoadmapItem {
  topic: string;       // display text (e.g. "Why This Book Exists")
  anchor: string;      // heading anchor (e.g. "why-this-book-exists")
  whyItMatters: string; // short explanation
}

export interface BookChapter {
  id: string;        // e.g. "ch01"
  slug: string;      // e.g. "ch01-introduction-to-course"
  title: string;
  subtitle?: string; // chapter topic/strapline, e.g. "How Data Drives Business Performance"
  folderName: string;
  sections: BookSection[];
  roadmapItems: RoadmapItem[];
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
  navTitle?: string;  // content-aware sidebar label
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

export interface BookAppendix {
  id: string;         // e.g. "appendix-a"
  slug: string;       // e.g. "appendix-a-terms-treasury"
  title: string;      // e.g. "Appendix A: Compiled Terms Treasury"
  content: string;    // raw Markdown
  sourceFile: string;
  sourceType: SourceType;
}

// ── AI Assistant ──
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
