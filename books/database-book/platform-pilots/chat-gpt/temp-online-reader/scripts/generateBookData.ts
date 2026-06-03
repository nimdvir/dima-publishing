/**
 * Generates src/generated/bookData.ts from the first four synced book chapters.
 *
 * Stable-first resolution per section:
 * 1. Try the canonical stable filename.
 * 2. If missing, try the latest dated fallback file.
 * 3. If missing, generate a placeholder section.
 *
 * Dated fallback files are temporary compatibility inputs only. The final reader
 * should consume the stable six-file chapter contract after source sync writes it.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { BookChapter, BookSection } from "../src/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE_ROOT = resolve(__dirname, "../../../../files/source/chapters");
const OUTPUT_PATH = resolve(__dirname, "../src/generated/bookData.ts");

const SOURCE_CHAPTERS = [
  "ch01-introduction-to-course",
  "ch02-mis-and-bitm",
  "ch03-what-is-data",
  "ch04-databases",
] as const;

type SectionDef = {
  slug: string;
  title: string;
  stableFile: string;
  fallbackPrefix: string | null;
};

const SECTION_DEFS: SectionDef[] = [
  { slug: "introduction", title: "Introduction", stableFile: "index.md", fallbackPrefix: null },
  { slug: "core-concepts", title: "Core Concepts", stableFile: "core-concepts.md", fallbackPrefix: "main" },
  { slug: "lets-build", title: "Let's Build", stableFile: "lets-build.md", fallbackPrefix: "lets-build" },
  { slug: "review-questions", title: "Review Questions", stableFile: "review-questions.md", fallbackPrefix: "reflection" },
  { slug: "terms-treasury", title: "Terms Treasury", stableFile: "terms-treasury.md", fallbackPrefix: "terms" },
  { slug: "rat", title: "RAT", stableFile: "rat.md", fallbackPrefix: "rat" },
];

function parseChapterNumber(folderName: string): number {
  const match = folderName.match(/^ch(\d+)/i);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function chapterPrefix(chapterNumber: number): string {
  return `ch${String(chapterNumber).padStart(2, "0")}`;
}

function parseDate(filename: string): string | null {
  const match = filename.match(/(\d{4}-\d{2}-\d{2})\.md$/);
  return match ? match[1] : null;
}

function extractH1(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function titleFromFolder(folderName: string, chapterNumber: number): string {
  const words = folderName
    .replace(/^ch\d+-/i, "")
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return `Chapter ${chapterNumber}: ${words.join(" ")}`;
}

function latestDatedFallback(files: string[], chapter: string, fallbackPrefix: string): string | null {
  const pattern = new RegExp(`^${chapter}-${fallbackPrefix}-\\d{4}-\\d{2}-\\d{2}\\.md$`, "i");
  let best: { filename: string; date: string } | null = null;

  for (const filename of files) {
    if (!pattern.test(filename)) continue;
    const date = parseDate(filename);
    if (!date) continue;
    if (!best || date > best.date) {
      best = { filename, date };
    }
  }

  return best?.filename ?? null;
}

function readMarkdown(chapterDir: string, filename: string): string {
  return readFileSync(join(chapterDir, filename), "utf-8");
}

function placeholder(title: string): string {
  return `# ${title}\n\nThis section is not available yet.`;
}

function readSection(
  chapterDir: string,
  files: string[],
  chapter: string,
  def: SectionDef,
  order: number,
): BookSection {
  let resolvedFile: string | null = null;
  let content: string | null = null;

  if (files.includes(def.stableFile)) {
    resolvedFile = def.stableFile;
    content = readMarkdown(chapterDir, def.stableFile);
  } else if (def.fallbackPrefix) {
    const fallback = latestDatedFallback(files, chapter, def.fallbackPrefix);
    if (fallback) {
      resolvedFile = fallback;
      content = readMarkdown(chapterDir, fallback);
    }
  }

  return {
    id: `${chapter}-${def.slug}`,
    slug: def.slug,
    title: def.title,
    order,
    stableFile: def.stableFile,
    fallbackPattern: def.fallbackPrefix ? `${chapter}-${def.fallbackPrefix}-YYYY-MM-DD.md` : null,
    resolvedFile,
    exists: Boolean(content),
    content: content ?? placeholder(def.title),
  };
}

function buildChapter(folderName: string, order: number): BookChapter {
  const chapterDir = join(SOURCE_ROOT, folderName);
  if (!existsSync(chapterDir)) {
    throw new Error(`Missing chapter source folder: ${chapterDir}`);
  }

  const files = readdirSync(chapterDir).filter((filename) => filename.endsWith(".md"));
  const chapterNumber = parseChapterNumber(folderName);
  const chapter = chapterPrefix(chapterNumber);
  const sections = SECTION_DEFS.map((def, index) => readSection(chapterDir, files, chapter, def, index + 1));
  const titleCandidate = sections.find((section) => section.exists)?.content ?? "";
  const title = extractH1(titleCandidate) ?? titleFromFolder(folderName, chapterNumber);

  return {
    id: chapter,
    slug: folderName,
    folderName,
    title,
    order,
    sections,
  };
}

function main(): void {
  if (!existsSync(SOURCE_ROOT)) {
    throw new Error(`Missing source root: ${SOURCE_ROOT}`);
  }

  const chapters = SOURCE_CHAPTERS.map((folderName, index) => buildChapter(folderName, index + 1));

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  const body = `// Auto-generated by scripts/generateBookData.ts. Do not edit by hand.\nimport type { BookChapter } from \"../types\";\n\nexport const BOOK_CHAPTERS: BookChapter[] = ${JSON.stringify(chapters, null, 2)};\n`;
  writeFileSync(OUTPUT_PATH, body, "utf-8");

  console.log(`Generated ${chapters.length} chapters -> ${OUTPUT_PATH}`);
  for (const chapter of chapters) {
    const resolved = chapter.sections
      .map((section) => `${section.title}: ${section.resolvedFile ?? "placeholder"}`)
      .join(" | ");
    console.log(`  ${chapter.id}: ${resolved}`);
  }
}

main();
