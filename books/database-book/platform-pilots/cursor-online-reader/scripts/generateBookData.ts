/**
 * Generates src/generated/bookData.ts from book chapter Markdown.
 *
 * Path resolution:
 * - Uses import.meta.url (fileURLToPath + dirname) so this script works regardless of cwd when npm run generate is called.
 * - SOURCE_ROOT resolves from scripts/ → ../../../files/source/chapters
 * - Logical absolute path: books/database-book/files/source/chapters
 *
 * Section content resolution (per chapter):
 *
 * Introduction:
 *   1. index.md
 *   2. placeholder (no dated fallback)
 *
 * Core Concepts:
 *   1. core-concepts.md
 *   2. latest chNN-main-YYYY-MM-DD.md
 *   3. placeholder
 *
 * Let's Build:
 *   1. lets-build.md
 *   2. latest chNN-lets-build-*
 *   3. placeholder
 *
 * Review Questions:
 *   1. review-questions.md
 *   2. latest chNN-reflection-*
 *   3. placeholder
 *
 * Terms Treasury:
 *   1. terms-treasury.md
 *   2. latest chNN-terms-*
 *   3. placeholder
 *
 * RAT:
 *   1. rat.md
 *   2. latest chNN-rat-*
 *   3. placeholder
 *
 * Future: USE_DATED_FALLBACK=false could disable dated fallback (not implemented).
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import type { BookChapter, BookSection } from "../src/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
/** Canonical chapter Markdown root: books/database-book/files/source/chapters */
const SOURCE_ROOT = join(__dirname, "../../../files/source/chapters");
const OUTPUT_PATH = join(__dirname, "../src/generated/bookData.ts");

const PLACEHOLDER = `# Section Missing

This section is not available yet.`;

const EXCLUDED_PATTERNS = [
  /-edit-/i,
  /-rewrite-/i,
  /-draft/i,
  /-outline/i,
  /-concepts\.md$/i,
  /-edited-/i,
  /-rewritten-/i,
  /TermTreasury/i,
];

type SectionDef = {
  slug: string;
  title: string;
  fileName: string;
  fallbackPrefix: string | null;
};

const SECTION_DEFS: SectionDef[] = [
  // Introduction: index.md only — no dated main fallback (see header comment)
  { slug: "introduction", title: "Introduction", fileName: "index.md", fallbackPrefix: null },
  { slug: "core-concepts", title: "Core Concepts", fileName: "core-concepts.md", fallbackPrefix: "main" },
  { slug: "lets-build", title: "Let's Build", fileName: "lets-build.md", fallbackPrefix: "lets-build" },
  { slug: "review-questions", title: "Review Questions", fileName: "review-questions.md", fallbackPrefix: "reflection" },
  { slug: "terms-treasury", title: "Terms Treasury", fileName: "terms-treasury.md", fallbackPrefix: "terms" },
  { slug: "rat", title: "RAT: Reading Test", fileName: "rat.md", fallbackPrefix: "rat" },
];

function parseChapterNumber(folderName: string): number {
  const match = folderName.match(/^ch(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
}

function isExcludedFile(name: string): boolean {
  return EXCLUDED_PATTERNS.some((p) => p.test(name));
}

function parseDateFromFilename(name: string): string | null {
  const match = name.match(/(\d{4}-\d{2}-\d{2})\.md$/);
  return match ? match[1] : null;
}

function slugToTitle(slug: string, chapterNum: number): string {
  const withoutPrefix = slug.replace(/^ch\d+-/i, "");
  const words = withoutPrefix
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  return `Chapter ${chapterNum}: ${words.join(" ")}`;
}

function extractH1(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function findLatestFallback(
  files: string[],
  chapterPrefix: string,
  sectionPrefix: string,
): string | null {
  const pattern = new RegExp(
    `^${chapterPrefix}-${sectionPrefix}-\\d{4}-\\d{2}-\\d{2}\\.md$`,
    "i",
  );
  let best: { name: string; date: string } | null = null;

  for (const name of files) {
    if (!pattern.test(name) || isExcludedFile(name)) continue;
    const date = parseDateFromFilename(name);
    if (!date) continue;
    if (!best || date > best.date) {
      best = { name, date };
    }
  }

  return best?.name ?? null;
}

function readSectionContent(
  chapterDir: string,
  files: string[],
  chapterPrefix: string,
  def: SectionDef,
): { content: string; exists: boolean; resolvedFile: string } {
  const canonicalPath = join(chapterDir, def.fileName);
  try {
    const content = readFileSync(canonicalPath, "utf-8");
    return { content, exists: true, resolvedFile: def.fileName };
  } catch {
    // canonical missing
  }

  if (def.fallbackPrefix) {
    const fallbackName = findLatestFallback(files, chapterPrefix, def.fallbackPrefix);
    if (fallbackName) {
      const content = readFileSync(join(chapterDir, fallbackName), "utf-8");
      return { content, exists: true, resolvedFile: fallbackName };
    }
  }

  return { content: PLACEHOLDER, exists: false, resolvedFile: def.fileName };
}

function buildChapter(folderName: string): BookChapter {
  const chapterDir = join(SOURCE_ROOT, folderName);
  const files = readdirSync(chapterDir).filter((f: string) => f.endsWith(".md"));
  const chapterNum = parseChapterNumber(folderName);
  const chapterPrefix = `ch${String(chapterNum).padStart(2, "0")}`;
  const slug = folderName.replace(/^ch\d+-/i, "") || folderName;

  let indexContent = "";
  try {
    indexContent = readFileSync(join(chapterDir, "index.md"), "utf-8");
  } catch {
    // no index
  }

  const title =
    (indexContent ? extractH1(indexContent) : null) ??
    slugToTitle(folderName, chapterNum) ??
    folderName;

  const sections: BookSection[] = SECTION_DEFS.map((def) => {
    const { content, exists } = readSectionContent(chapterDir, files, chapterPrefix, def);
    return {
      id: `${chapterPrefix}-${def.slug}`,
      slug: def.slug,
      title: def.title,
      fileName: def.fileName,
      content,
      exists,
    };
  });

  return {
    id: chapterPrefix,
    slug,
    title,
    folderName,
    sections,
  };
}

function main(): void {
  const folders = readdirSync(SOURCE_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^ch\d+/i.test(d.name))
    .map((d) => d.name)
    .sort((a: string, b: string) => parseChapterNumber(a) - parseChapterNumber(b));

  const chapters: BookChapter[] = folders.map(buildChapter);

  const outDir = dirname(OUTPUT_PATH);
  mkdirSync(outDir, { recursive: true });

  const body = `// Auto-generated by scripts/generateBookData.ts — do not edit.
import type { BookChapter } from '../types';

export const BOOK_CHAPTERS: BookChapter[] = ${JSON.stringify(chapters, null, 2)};
`;

  writeFileSync(OUTPUT_PATH, body, "utf-8");
  console.log(`Generated ${OUTPUT_PATH} (${chapters.length} chapters)`);
}

main();
