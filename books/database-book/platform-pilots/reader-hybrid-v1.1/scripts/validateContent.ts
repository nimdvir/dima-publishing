import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GENERATED = path.resolve(__dirname, "..", "src", "generated", "bookData.ts");

interface BookPage {
  id: string;
  chapterId: string;
  sectionSlug: string;
  sectionTitle: string;
  pageNumber: number;
  totalPages: number;
  navTitle?: string;
  content: string;
  exists: boolean;
}

interface BookSection {
  id: string;
  slug: string;
  title: string;
  exists: boolean;
  sourceFile: string | null;
  pages: BookPage[];
}

interface BookChapter {
  id: string;
  title: string;
  sections: BookSection[];
}

function extractConst<T>(source: string, name: string, nextName: string): T {
  const pattern = new RegExp(
    `export const ${name}: [^=]+ = ([\\s\\S]*?);\\r?\\n\\r?\\nexport const ${nextName}`,
  );
  const match = source.match(pattern);
  if (!match) throw new Error(`Could not parse generated ${name}`);
  return JSON.parse(match[1]) as T;
}

function slugifyHeading(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[`*_~[\]()]/g, "")
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "section"
  );
}

function headingIds(content: string): string[] {
  const counts = new Map<string, number>();
  const ids: string[] = [];
  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^(#|##|###)\s+(.+)$/);
    if (!match) continue;
    const base = slugifyHeading(match[2].replace(/[#*_`~]/g, "").trim());
    const count = counts.get(base) ?? 0;
    counts.set(base, count + 1);
    ids.push(count === 0 ? base : `${base}-${count + 1}`);
  }
  return ids;
}

function roadmapTargets(content: string): string[] {
  return [...content.matchAll(/\[[^\]]+\]\(#([^)]+)\)/g)].map((m) => m[1]);
}

function hasVideoOrPlaceholder(content: string): boolean {
  return /(youtube\.com|youtu\.be|<iframe|Video placeholder|video-placeholder)/i.test(
    content,
  );
}

function hasQuestionClumps(content: string): boolean {
  return content
    .split(/\r?\n/)
    .some((line) => (line.match(/(?:^|\s)\d+\.\s+/g) || []).length > 1);
}

function main() {
  const source = fs.readFileSync(GENERATED, "utf-8");
  const chapters = extractConst<BookChapter[]>(
    source,
    "BOOK_CHAPTERS",
    "FLAT_READER_PAGES",
  );
  const pages = extractConst<BookPage[]>(
    source,
    "FLAT_READER_PAGES",
    "BOOK_LABS",
  );

  const errors: string[] = [];
  const readerChapters = chapters.filter((chapter) => /^ch(0[1-9]|1[0-7])$/.test(chapter.id));

  for (const chapter of readerChapters) {
    const chapterPages = pages.filter((page) => page.chapterId === chapter.id);
    const ids = new Set(chapterPages.flatMap((page) => headingIds(page.content)));

    for (const section of chapter.sections) {
      if (!section.exists) {
        errors.push(`${chapter.id}/${section.slug}: generated placeholder section`);
      }
      for (const page of section.pages) {
        if (/\$mainFile/.test(page.content)) {
          errors.push(`${chapter.id}/${section.slug}/p${page.pageNumber}: contains $mainFile`);
        }
      }
    }

    const intro = chapter.sections.find((section) => section.slug === "introduction");
    if (!intro || !intro.exists || intro.pages.length < 1) {
      errors.push(`${chapter.id}: missing introduction`);
    } else {
      const content = intro.pages.map((page) => page.content).join("\n");
      if (!hasVideoOrPlaceholder(content)) {
        errors.push(`${chapter.id}/introduction: missing video or video placeholder`);
      }
      if (!/Chapter Roadmap/i.test(content) || !/\|/.test(content)) {
        errors.push(`${chapter.id}/introduction: missing Chapter Roadmap table`);
      }
      const targets = roadmapTargets(content);
      if (targets.length === 0) {
        errors.push(`${chapter.id}/introduction: roadmap has no hash links`);
      }
      for (const target of targets) {
        if (!ids.has(target)) {
          errors.push(`${chapter.id}/introduction: broken roadmap target #${target}`);
        }
      }
    }

    const core = chapter.sections.find((section) => section.slug === "core-concepts");
    if (!core || !core.exists) {
      errors.push(`${chapter.id}: missing Core Concepts`);
    } else if (core.pages.length < 5 || core.pages.length > 10) {
      errors.push(`${chapter.id}/core-concepts: ${core.pages.length} pages, expected 5-10`);
    }

    for (const slug of ["review-questions", "rat"]) {
      const section = chapter.sections.find((candidate) => candidate.slug === slug);
      if (!section || !section.exists) {
        errors.push(`${chapter.id}/${slug}: missing section`);
        continue;
      }
      if (section.pages.length !== 2) {
        errors.push(`${chapter.id}/${slug}: ${section.pages.length} pages, expected 2`);
      }
      const answerPage = section.pages.find((page) => /Answer Key/i.test(page.content));
      if (!answerPage || answerPage.pageNumber !== 2) {
        errors.push(`${chapter.id}/${slug}: answer key must be on page 2`);
      }
      if (hasQuestionClumps(section.pages.map((page) => page.content).join("\n"))) {
        errors.push(`${chapter.id}/${slug}: multiple numbered questions on one line`);
      }
    }
  }

  if (errors.length > 0) {
    console.error("Content validation failed:\n");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(
    `Content validation passed: ${readerChapters.length} chapters, ${pages.length} generated reader pages.`,
  );
}

main();
