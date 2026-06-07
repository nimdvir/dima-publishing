export type SourceType = "stable" | "dated-fallback" | "chapter-fallback" | "placeholder";

export type ReaderScope = "welcome" | "book" | "labs" | "ai-assistant" | "login";

export type DemoUser = {
  netId: string;
  studentId: string;
  accessStatus: string;
  createdAt: string;
};

export type BookPage = {
  id: string;
  slug: string;
  title: string;
  content: string;
  pageNumber: number;
  totalPages: number;
  chapterId: string;
  chapterSlug: string;
  sectionId: string;
  sectionSlug: string;
  sectionTitle: string;
  sourceFile: string;
  sourceType: SourceType;
  exists: boolean;
};

export type BookSection = {
  id: string;
  slug: string;
  title: string;
  fileName: string;
  exists: boolean;
  sourceFile: string;
  sourceType: SourceType;
  pages: BookPage[];
};

export type BookChapter = {
  id: string;
  slug: string;
  title: string;
  folderName: string;
  sections: BookSection[];
};

export type BookLab = {
  id: string;
  slug: string;
  title: string;
  folderName: string;
  content: string;
  exists: boolean;
  sourceFile: string;
  sourceType: SourceType;
};

export type HeadingTocItem = {
  id: string;
  level: 2 | 3;
  text: string;
};
