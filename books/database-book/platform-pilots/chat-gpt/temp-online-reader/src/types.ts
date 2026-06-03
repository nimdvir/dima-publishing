export type BookSection = {
  id: string;
  slug: string;
  title: string;
  order: number;
  stableFile: string;
  fallbackPattern: string | null;
  resolvedFile: string | null;
  exists: boolean;
  content: string;
};

export type BookChapter = {
  id: string;
  slug: string;
  folderName: string;
  title: string;
  order: number;
  sections: BookSection[];
};

export type FlatSection = {
  chapterId: string;
  sectionId: string;
  chapterTitle: string;
  sectionTitle: string;
};
