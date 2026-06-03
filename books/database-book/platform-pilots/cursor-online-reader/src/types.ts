export type BookSection = {
  id: string;
  slug: string;
  title: string;
  fileName: string;
  content: string;
  exists: boolean;
};

export type BookChapter = {
  id: string;
  slug: string;
  title: string;
  folderName: string;
  sections: BookSection[];
};

export type FlatSection = {
  chapterId: string;
  sectionId: string;
  chapterTitle: string;
  sectionTitle: string;
};
