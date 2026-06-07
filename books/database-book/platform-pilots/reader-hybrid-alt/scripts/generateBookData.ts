import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { BookChapter, BookLab, BookPage, BookSection, SourceType } from "../src/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE_ROOT = join(__dirname, "../../../files/source");
const CHAPTER_ROOT = join(SOURCE_ROOT, "chapters");
const LAB_ROOT = join(SOURCE_ROOT, "labs");
const OUTPUT_PATH = join(__dirname, "../src/generated/bookData.ts");

const PLACEHOLDER = `# Section Missing

This section is not available yet.`;

const REQUIRED_CHAPTERS = [
  "ch01-introduction-to-course",
  "ch02-mis-and-bitm",
  "ch03-what-is-data",
  "ch04-databases",
];

const SECTION_DEFS = [
  { slug: "introduction", title: "Introduction", stableFile: "index.md", fallbackPrefix: "main" },
  { slug: "core-concepts", title: "Core Concepts", stableFile: "core-concepts.md", fallbackPrefix: "main" },
  { slug: "lets-build", title: "Let's Build", stableFile: "lets-build.md", fallbackPrefix: "lets-build" },
  { slug: "review-questions", title: "Review Questions", stableFile: "review-questions.md", fallbackPrefix: "reflection" },
  { slug: "terms-treasury", title: "Terms Treasury", stableFile: "terms-treasury.md", fallbackPrefix: "terms" },
  { slug: "rat", title: "RAT: Reading Test", stableFile: "rat.md", fallbackPrefix: "rat" },
] as const;

type SectionDef = (typeof SECTION_DEFS)[number];

type ResolvedMarkdown = {
  content: string;
  exists: boolean;
  sourceFile: string;
  sourceType: SourceType;
};

type Counts = Record<SourceType, number>;

const emptyCounts = (): Counts => ({
  stable: 0,
  "dated-fallback": 0,
  "chapter-fallback": 0,
  placeholder: 0,
});

function chapterPrefixFromFolder(folderName: string): string {
  const match = folderName.match(/^ch(\d{2})-/i);
  return match ? `ch${match[1]}` : folderName.slice(0, 4).toLowerCase();
}

function chapterNumberFromPrefix(chapterPrefix: string): number {
  const match = chapterPrefix.match(/^ch(\d+)/i);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function titleCaseSlug(value: string): string {
  return value
    .replace(/^ch\d+-/i, "")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function stripFrontmatter(markdown: string): string {
  if (!markdown.startsWith("---")) return markdown;
  const end = markdown.indexOf("\n---", 3);
  if (end === -1) return markdown;
  return markdown.slice(end + 4).trimStart();
}

function stripHeadingMarks(value: string): string {
  return value.replace(/^#+\s*/, "").trim();
}

function extractChapterTitle(markdown: string, fallbackFolderName: string): string {
  const clean = stripFrontmatter(markdown);
  const lines = clean.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const chapterMatch = lines[index].match(/^#\s+Chapter\s+\d+\s*:\s*(.*)$/i);
    if (!chapterMatch) continue;

    const sameLineTitle = stripHeadingMarks(chapterMatch[1] ?? "");
    if (!sameLineTitle) {
      for (let next = index + 1; next < lines.length; next += 1) {
        const candidate = lines[next].trim();
        if (!candidate) continue;
        if (/^#\s+/.test(candidate)) return stripHeadingMarks(candidate);
        break;
      }
    }

    if (sameLineTitle) return sameLineTitle;
  }

  const firstH1 = clean.match(/^#\s+(.+)$/m);
  if (firstH1) return stripHeadingMarks(firstH1[1]);

  return titleCaseSlug(fallbackFolderName);
}

function extractFirstHeading(markdown: string, fallback: string): string {
  const match = markdown.match(/^#{1,6}\s+(.+)$/m);
  return match ? stripHeadingMarks(match[1]) : fallback;
}

function extractLeadBeforeFirstH2(markdown: string): string {
  const clean = stripFrontmatter(markdown).trim();
  const h2Index = clean.search(/^##\s+/m);
  if (h2Index === -1) return clean;
  return clean.slice(0, h2Index).trim();
}

function isTocStubIndex(markdown: string): boolean {
  return /^#\s+Chapter\s+\d/im.test(stripFrontmatter(markdown).trimStart());
}

function listMarkdownFiles(folderPath: string): string[] {
  if (!existsSync(folderPath)) return [];
  return readdirSync(folderPath).filter((name) => name.toLowerCase().endsWith(".md"));
}

function latestDatedFile(files: string[], chapterPrefix: string, fallbackPrefix: string): string | null {
  const strictPattern = new RegExp(
    `^${chapterPrefix}-${fallbackPrefix}-\\d{4}-\\d{2}-\\d{2}\\.md$`,
    "i",
  );

  let latest: { name: string; date: string } | null = null;

  for (const file of files) {
    if (!strictPattern.test(file)) continue;
    const date = file.match(/(\d{4}-\d{2}-\d{2})\.md$/i)?.[1];
    if (!date) continue;
    if (!latest || date > latest.date) {
      latest = { name: file, date };
    }
  }

  return latest?.name ?? null;
}

function resolveSection(
  chapterDir: string,
  files: string[],
  chapterPrefix: string,
  def: SectionDef,
  warnings: string[],
): ResolvedMarkdown {
  const stablePath = join(chapterDir, def.stableFile);

  if (def.slug === "introduction") {
    if (existsSync(stablePath)) {
      const indexContent = readFileSync(stablePath, "utf-8");
      if (!isTocStubIndex(indexContent)) {
        return {
          content: indexContent,
          exists: true,
          sourceFile: def.stableFile,
          sourceType: "stable",
        };
      }
    }

    const mainFallback = latestDatedFile(files, chapterPrefix, "main");
    if (mainFallback) {
      warnings.push(`${chapterPrefix} introduction used lead content from ${mainFallback}`);
      return {
        content: extractLeadBeforeFirstH2(readFileSync(join(chapterDir, mainFallback), "utf-8")),
        exists: true,
        sourceFile: mainFallback,
        sourceType: "dated-fallback",
      };
    }

    warnings.push(`${chapterPrefix} introduction placeholder generated`);
    return {
      content: PLACEHOLDER,
      exists: false,
      sourceFile: def.stableFile,
      sourceType: "placeholder",
    };
  }

  if (existsSync(stablePath)) {
    return {
      content: readFileSync(stablePath, "utf-8"),
      exists: true,
      sourceFile: def.stableFile,
      sourceType: "stable",
    };
  }

  const fallback = latestDatedFile(files, chapterPrefix, def.fallbackPrefix);
  if (fallback) {
    warnings.push(`${chapterPrefix} ${def.slug} used dated fallback ${fallback}`);
    return {
      content: readFileSync(join(chapterDir, fallback), "utf-8"),
      exists: true,
      sourceFile: fallback,
      sourceType: "dated-fallback",
    };
  }

  warnings.push(`${chapterPrefix} ${def.slug} placeholder generated`);
  return {
    content: PLACEHOLDER,
    exists: false,
    sourceFile: def.stableFile,
    sourceType: "placeholder",
  };
}

function splitPages(markdown: string): string[] {
  const sentinel = "\u0000PAGEBREAK\u0000";
  const markerPattern =
    /<!--\s*(?:PAGE\s+BREAK|PAGEBREAK|PAGE-BREAK)\s*-->|<div\s+class=["']page-break["']\s*><\/div>|<div\s+style=["']\s*page-break-after:\s*always;?\s*["']\s*><\/div>/gi;
  const normalized = markdown.replace(markerPattern, sentinel);
  const parts = normalized
    .split(sentinel)
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  return parts.length > 0 ? parts : [markdown.trim()];
}

function buildSectionPages(
  chapter: Pick<BookChapter, "id" | "slug">,
  section: Pick<BookSection, "id" | "slug" | "title" | "sourceFile" | "sourceType" | "exists">,
  content: string,
): BookPage[] {
  const segments = splitPages(content);

  return segments.map((segment, index) => {
    const pageNumber = index + 1;
    const slug = `${chapter.id}-${section.slug}-p${pageNumber}`;

    return {
      id: slug,
      slug,
      title: extractFirstHeading(segment, `${section.title} - Page ${pageNumber}`),
      content: segment,
      pageNumber,
      totalPages: segments.length,
      chapterId: chapter.id,
      chapterSlug: chapter.slug,
      sectionId: section.id,
      sectionSlug: section.slug,
      sectionTitle: section.title,
      sourceFile: section.sourceFile,
      sourceType: section.sourceType,
      exists: section.exists,
    };
  });
}

function buildChapter(folderName: string, warnings: string[], sectionCounts: Counts): BookChapter | null {
  const chapterDir = join(CHAPTER_ROOT, folderName);
  if (!existsSync(chapterDir)) {
    warnings.push(`${folderName} folder missing`);
    return null;
  }

  const files = listMarkdownFiles(chapterDir);
  const chapterPrefix = chapterPrefixFromFolder(folderName);
  const chapterNumber = chapterNumberFromPrefix(chapterPrefix);
  const chapterSlug = folderName.replace(/^ch\d+-/i, "");
  const latestMain = latestDatedFile(files, chapterPrefix, "main");
  const titleSource = latestMain
    ? readFileSync(join(chapterDir, latestMain), "utf-8")
    : existsSync(join(chapterDir, "index.md"))
      ? readFileSync(join(chapterDir, "index.md"), "utf-8")
      : "";
  const chapterShell = {
    id: chapterPrefix,
    slug: chapterSlug,
    title: titleSource ? extractChapterTitle(titleSource, folderName) : `Chapter ${chapterNumber}: ${titleCaseSlug(folderName)}`,
    folderName,
  };

  const sections = SECTION_DEFS.map((def) => {
    const resolved = resolveSection(chapterDir, files, chapterPrefix, def, warnings);
    sectionCounts[resolved.sourceType] += 1;

    const sectionShell = {
      id: `${chapterPrefix}-${def.slug}`,
      slug: def.slug,
      title: def.title,
      fileName: resolved.sourceFile,
      exists: resolved.exists,
      sourceFile: resolved.sourceFile,
      sourceType: resolved.sourceType,
    };

    const pages = buildSectionPages(chapterShell, sectionShell, resolved.content);

    return {
      ...sectionShell,
      pages,
    };
  });

  return {
    ...chapterShell,
    sections,
  };
}

function numericPrefix(value: string): number {
  const match = value.match(/(?:lab-)?(\d+)/i);
  return match ? Number.parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER;
}

function firstReadableMarkdown(folderPath: string): string | null {
  const files = listMarkdownFiles(folderPath).sort((a, b) => a.localeCompare(b));
  return files[0] ?? null;
}

function latestLabFallback(labNumber: number): { file: string; chapterFolder: string } | null {
  const chapterFolder = REQUIRED_CHAPTERS[labNumber - 1];
  if (!chapterFolder) return null;
  const chapterDir = join(CHAPTER_ROOT, chapterFolder);
  const chapterPrefix = `ch${String(labNumber).padStart(2, "0")}`;
  const pattern = new RegExp(`^lab-${String(labNumber).padStart(2, "0")}-questions-\\d{4}-\\d{2}-\\d{2}\\.md$`, "i");
  const files = listMarkdownFiles(chapterDir).filter((file) => pattern.test(file));
  let latest: { file: string; date: string } | null = null;

  for (const file of files) {
    const date = file.match(/(\d{4}-\d{2}-\d{2})\.md$/i)?.[1];
    if (!date) continue;
    if (!latest || date > latest.date) latest = { file, date };
  }

  return latest ? { file: latest.file, chapterFolder: `${chapterPrefix}-${chapterFolder.replace(/^ch\d+-/i, "")}` } : null;
}

function resolveLab(labFolderName: string, index: number, warnings: string[]): ResolvedMarkdown {
  const labDir = join(LAB_ROOT, labFolderName);
  const stableCandidates = ["index.md", "README.md"];

  for (const stable of stableCandidates) {
    const candidate = join(labDir, stable);
    if (existsSync(candidate)) {
      return {
        content: readFileSync(candidate, "utf-8"),
        exists: true,
        sourceFile: stable,
        sourceType: "stable",
      };
    }
  }

  const first = firstReadableMarkdown(labDir);
  if (first) {
    return {
      content: readFileSync(join(labDir, first), "utf-8"),
      exists: true,
      sourceFile: first,
      sourceType: "stable",
    };
  }

  const fallback = latestLabFallback(index + 1);
  if (fallback) {
    warnings.push(`${labFolderName} used chapter fallback ${fallback.file}`);
    return {
      content: readFileSync(join(CHAPTER_ROOT, fallback.chapterFolder, fallback.file), "utf-8"),
      exists: true,
      sourceFile: fallback.file,
      sourceType: "chapter-fallback",
    };
  }

  warnings.push(`${labFolderName} placeholder generated`);
  return {
    content: PLACEHOLDER,
    exists: false,
    sourceFile: "placeholder",
    sourceType: "placeholder",
  };
}

function buildLabs(warnings: string[], labCounts: Counts): BookLab[] {
  const existingFolders = existsSync(LAB_ROOT)
    ? readdirSync(LAB_ROOT, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort((a, b) => numericPrefix(a) - numericPrefix(b))
        .slice(0, 4)
    : [];

  const folders = [...existingFolders];
  while (folders.length < 4) {
    const n = folders.length + 1;
    folders.push(`lab-${String(n).padStart(2, "0")}-placeholder`);
  }

  return folders.map((folderName, index) => {
    const resolved = resolveLab(folderName, index, warnings);
    labCounts[resolved.sourceType] += 1;

    const labNumber = String(index + 1).padStart(2, "0");
    const id = folderName.startsWith("lab-") ? folderName : `lab-${labNumber}-${folderName}`;
    const title = resolved.exists ? extractFirstHeading(resolved.content, titleCaseSlug(folderName)) : `Lab ${labNumber}`;

    return {
      id,
      slug: id,
      title,
      folderName,
      content: resolved.content,
      exists: resolved.exists,
      sourceFile: resolved.sourceFile,
      sourceType: resolved.sourceType,
    };
  });
}

function renderGeneratedFile(
  chapters: BookChapter[],
  flatPages: BookPage[],
  labs: BookLab[],
  warnings: string[],
): string {
  return `// Auto-generated by scripts/generateBookData.ts - do not edit.
import type { BookChapter, BookLab, BookPage } from "../types";

export const BOOK_CHAPTERS: BookChapter[] = ${JSON.stringify(chapters, null, 2)};

export const FLAT_READER_PAGES: BookPage[] = ${JSON.stringify(flatPages, null, 2)};

export const BOOK_LABS: BookLab[] = ${JSON.stringify(labs, null, 2)};

export const GENERATION_WARNINGS: string[] = ${JSON.stringify(warnings, null, 2)};
`;
}

function printSummary(
  chapters: BookChapter[],
  flatPages: BookPage[],
  labs: BookLab[],
  sectionCounts: Counts,
  labCounts: Counts,
  warnings: string[],
): void {
  const placeholders = sectionCounts.placeholder + labCounts.placeholder;
  console.log("Reader Hybrid Alt - Book Data Generator");
  console.log(`Chapters loaded: ${chapters.length}`);
  console.log(`Sections resolved: stable=${sectionCounts.stable}, dated-fallback=${sectionCounts["dated-fallback"]}, chapter-fallback=${sectionCounts["chapter-fallback"]}, placeholder=${sectionCounts.placeholder}`);
  console.log(`Reader pages generated: ${flatPages.length}`);
  console.log(`Labs loaded: stable=${labCounts.stable}, dated-fallback=${labCounts["dated-fallback"]}, chapter-fallback=${labCounts["chapter-fallback"]}, placeholder=${labCounts.placeholder}`);
  console.log(`Placeholders generated: ${placeholders}`);
  console.log(`Generator warnings: ${warnings.length}`);
  for (const warning of warnings) {
    console.log(`- ${warning}`);
  }
}

function main(): void {
  const warnings: string[] = [];
  const sectionCounts = emptyCounts();
  const labCounts = emptyCounts();

  if (!existsSync(CHAPTER_ROOT)) {
    console.error(`Required chapter source root missing: ${CHAPTER_ROOT}`);
    process.exit(1);
  }

  const chapters = REQUIRED_CHAPTERS
    .map((folderName) => buildChapter(folderName, warnings, sectionCounts))
    .filter((chapter): chapter is BookChapter => chapter !== null);

  if (chapters.length === 0) {
    console.error("None of the four required chapter folders resolved. Refusing to write bookData.ts.");
    process.exit(1);
  }

  const flatPages = chapters.flatMap((chapter) =>
    chapter.sections.flatMap((section) => section.pages),
  );
  const labs = buildLabs(warnings, labCounts);

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, renderGeneratedFile(chapters, flatPages, labs, warnings), "utf-8");

  printSummary(chapters, flatPages, labs, sectionCounts, labCounts, warnings);

  const failedChapter = chapters.find(
    (chapter) => chapter.sections.filter((section) => section.exists).length < 5,
  );
  if (failedChapter) {
    console.error(
      `Generator self-check failed: ${failedChapter.id} has fewer than 5 of 6 sections marked exists: true.`,
    );
    process.exit(1);
  }
}

main();
