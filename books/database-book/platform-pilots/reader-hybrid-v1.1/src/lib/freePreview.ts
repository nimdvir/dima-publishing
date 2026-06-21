export const FREE_PREVIEW_CHAPTER_IDS = new Set([
  "ch00",
  "ch01",
  "ch02",
  "ch03",
  "ch04",
]);

export function isFreePreviewChapter(chapterId: string): boolean {
  return FREE_PREVIEW_CHAPTER_IDS.has(chapterId);
}

export function isChapterGated(chapterId: string): boolean {
  return !isFreePreviewChapter(chapterId);
}
