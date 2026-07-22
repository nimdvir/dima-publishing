/**
 * generateBookData.ts — Reader Hybrid v1.1
 *
 * Scans chapters 1-10 and first 10 labs, resolves files via
 * stable → dated-fallback → placeholder, splits on page-break
 * markers, and writes src/generated/bookData.ts.
 *
 * Incremental: compares source file hashes against a generation
 * manifest and skips the rebuild when nothing changed.
 * Use --force to bypass the check.
 */

import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { fileURLToPath } from "url";
import { COURSE_OUTLINE } from "../src/content/courseOutline";

// ── Resolve repo root relative to this script ──
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..", "..", "..", "..", "..");
const PROJECT_ROOT = path.join(REPO_ROOT, "books", "database-book");
const SOURCE_CHAPTERS = path.join(PROJECT_ROOT, "files", "source", "chapters");
const SOURCE_LABS = path.join(PROJECT_ROOT, "files", "source", "labs");
const OUTPUT = path.resolve(__dirname, "..", "src", "generated", "bookData.ts");
const MANIFEST_PATH = path.resolve(
  __dirname,
  "..",
  "src",
  "generated",
  ".generation-manifest.json",
);
const FORCE = process.argv.includes("--force");

// ── Generation manifest types ──
interface ManifestEntry {
  file: string;
  hash: string;
}
interface GenerationManifest {
  generated_at: string;
  chapters: Record<string, Record<string, ManifestEntry>>;
  labs: Record<string, ManifestEntry>;
}

function hashFile(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath);
    return (
      "sha256:" + crypto.createHash("sha256").update(content).digest("hex")
    );
  } catch {
    return "missing";
  }
}

function loadManifest(): GenerationManifest | null {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  } catch {
    return null;
  }
}

function saveManifest(manifest: GenerationManifest): void {
  const dir = path.dirname(MANIFEST_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
}

// ── Types mirroring src/types.ts (duplicated for standalone script) ──
type SourceType =
  | "stable"
  | "dated-fallback"
  | "chapter-fallback"
  | "placeholder";

interface BookSection {
  id: string;
  slug: string;
  title: string;
  fileName: string;
  exists: boolean;
  sourceFile: string | null;
  sourceType: SourceType;
  pages: BookPage[];
}

interface BookPage {
  id: string;
  slug: string;
  title: string;
  navTitle: string;
  content: string;
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

interface RoadmapItem {
  topic: string;
  anchor: string;
  whyItMatters: string;
}

interface BookChapter {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  folderName: string;
  sections: BookSection[];
  roadmapItems: RoadmapItem[];
}

interface BookLab {
  id: string;
  slug: string;
  title: string;
  folderName: string;
  content: string;
  exists: boolean;
  sourceFile: string | null;
  sourceType: SourceType;
}

interface BookAppendix {
  id: string;
  slug: string;
  title: string;
  content: string;
  sourceFile: string;
  sourceType: SourceType;
}

// ── Chapter definitions (chapters 1-10) ──
const CHAPTERS: { id: string; slug: string; folderName: string }[] = [
  {
    id: "ch01",
    slug: "ch01-introduction-to-course",
    folderName: "ch01-introduction-to-course",
  },
  { id: "ch02", slug: "ch02-mis-and-bitm", folderName: "ch02-mis-and-bitm" },
  { id: "ch03", slug: "ch03-what-is-data", folderName: "ch03-what-is-data" },
  { id: "ch04", slug: "ch04-databases", folderName: "ch04-databases" },
  { id: "ch05", slug: "ch05-sql", folderName: "ch05-sql" },
  {
    id: "ch06",
    slug: "ch06-relational-model",
    folderName: "ch06-relational-model",
  },
  { id: "ch07", slug: "ch07-normalization", folderName: "ch07-normalization" },
  {
    id: "ch08",
    slug: "ch08-midterm-review",
    folderName: "ch08-midterm-review",
  },
  {
    id: "ch09",
    slug: "ch09-database-design",
    folderName: "ch09-database-design",
  },
  {
    id: "ch10",
    slug: "ch10-advanced-sql-queries",
    folderName: "ch10-advanced-sql-queries",
  },
  {
    id: "ch11",
    slug: "ch11-database-administration",
    folderName: "ch11-database-administration",
  },
  {
    id: "ch12",
    slug: "ch12-business-intelligence",
    folderName: "ch12-business-intelligence",
  },
  {
    id: "ch13",
    slug: "ch13-advanced-database-techniques",
    folderName: "ch13-advanced-database-techniques",
  },
  { id: "ch14", slug: "ch14-powerbi", folderName: "ch14-powerbi" },
  {
    id: "ch15",
    slug: "ch15-business-strategy-is",
    folderName: "ch15-business-strategy-is",
  },
  { id: "ch16", slug: "ch16-final-review", folderName: "ch16-final-review" },
  { id: "ch17", slug: "ch17-conclusion", folderName: "ch17-conclusion" },
];

// ── Section definitions (in order) ──
interface SectionDef {
  slug: string;
  title: string;
  stableFile: string;
  datedPattern: string; // regex string, {N} will be replaced with chapter number
}

const SECTIONS: SectionDef[] = [
  {
    slug: "introduction",
    title: "Introduction",
    stableFile: "index.md",
    datedPattern: "",
  },
  {
    slug: "core-concepts",
    title: "Core Concepts",
    stableFile: "core-concepts.md",
    datedPattern: "^ch{N}-main-\\d{4}-\\d{2}-\\d{2}\\.md$",
  },
  {
    slug: "lets-build",
    title: "Let's Build",
    stableFile: "lets-build.md",
    datedPattern: "^ch{N}-lets-build-\\d{4}-\\d{2}-\\d{2}\\.md$",
  },
  {
    slug: "review-questions",
    title: "Review Questions",
    stableFile: "review-questions.md",
    datedPattern: "^ch{N}-reflection-\\d{4}-\\d{2}-\\d{2}\\.md$",
  },
  {
    slug: "terms-treasury",
    title: "Terms Treasury",
    stableFile: "terms-treasury.md",
    datedPattern: "^ch{N}-terms-\\d{4}-\\d{2}-\\d{2}\\.md$",
  },
  {
    slug: "rat",
    title: "RAT: Reading Test",
    stableFile: "rat.md",
    datedPattern: "^ch{N}-rat-\\d{4}-\\d{2}-\\d{2}\\.md$",
  },
];

// ── Lab definitions (first 10) ──
const LABS: {
  id: string;
  slug: string;
  folderName: string;
  chapterId: string;
}[] = [
  {
    id: "lab-01",
    slug: "lab-01-petvax-intro",
    folderName: "lab-01-petvax-intro",
    chapterId: "ch01",
  },
  {
    id: "lab-02",
    slug: "lab-02-petvax-system",
    folderName: "lab-02-petvax-system",
    chapterId: "ch02",
  },
  {
    id: "lab-03",
    slug: "lab-03-data-types-and-tables",
    folderName: "lab-03-data-types-and-tables",
    chapterId: "ch03",
  },
  {
    id: "lab-04",
    slug: "lab-04-intro-to-access",
    folderName: "lab-04-intro-to-access",
    chapterId: "ch04",
  },
  {
    id: "lab-05",
    slug: "lab-05-sql",
    folderName: "lab-05-sql",
    chapterId: "ch05",
  },
  {
    id: "lab-06",
    slug: "lab-06-relational-model",
    folderName: "lab-06-relational-model",
    chapterId: "ch06",
  },
  {
    id: "lab-07",
    slug: "lab-07-normalization",
    folderName: "lab-07-normalization",
    chapterId: "ch07",
  },
  {
    id: "lab-08",
    slug: "lab-08-midterm-review",
    folderName: "lab-08-midterm-review",
    chapterId: "ch08",
  },
  {
    id: "lab-09",
    slug: "lab-09-database-design",
    folderName: "lab-09-database-design",
    chapterId: "ch09",
  },
  {
    id: "lab-10",
    slug: "lab-10-advanced-sql",
    folderName: "lab-10-advanced-sql",
    chapterId: "ch10",
  },
  {
    id: "lab-11",
    slug: "lab-11-database-admin",
    folderName: "lab-11-database-admin",
    chapterId: "ch11",
  },
  {
    id: "lab-12",
    slug: "lab-12-business-intelligence",
    folderName: "lab-12-business-intelligence",
    chapterId: "ch12",
  },
  {
    id: "lab-13",
    slug: "lab-13-advanced-techniques",
    folderName: "lab-13-advanced-techniques",
    chapterId: "ch13",
  },
  {
    id: "lab-14",
    slug: "lab-14-powerbi",
    folderName: "lab-14-powerbi",
    chapterId: "ch14",
  },
  {
    id: "lab-15",
    slug: "lab-15-strategy-and-is",
    folderName: "lab-15-strategy-and-is",
    chapterId: "ch15",
  },
];

// ── Front-matter folder (preface + acknowledgements) ──
const FRONT_MATTER_FOLDER = "01-acknowlgements";

// ── Appendix definitions ──
const APPENDICES_SOURCE = path.join(PROJECT_ROOT, "files", "source", "appendices");

interface AppendixDef {
  id: string;
  slug: string;
  title: string;
  fileName: string;
}

const APPENDICES: AppendixDef[] = [
  {
    id: "appendix-a",
    slug: "appendix-a-terms-treasury",
    title: "Appendix A: Compiled Terms Treasury",
    fileName: "appendix-a-terms-treasury-2026-06-21.md",
  },
  {
    id: "appendix-b",
    slug: "appendix-b-access-tutorials",
    title: "Appendix B: Microsoft Access Tutorials",
    fileName: "appendix-b-access-tutorials-2026-06-21.md",
  },
  {
    id: "appendix-c",
    slug: "appendix-c-sql-reference",
    title: "Appendix C: SQL Quick Reference",
    fileName: "appendix-c-sql-reference-2026-06-21.md",
  },
];

function resolveAppendix(appDef: AppendixDef): BookAppendix | null {
  const filePath = path.join(APPENDICES_SOURCE, appDef.fileName);
  const content = readFileSafe(filePath);
  if (content && content.trim().length > 0) {
    return {
      id: appDef.id,
      slug: appDef.slug,
      title: appDef.title,
      content,
      sourceFile: appDef.fileName,
      sourceType: "stable",
    };
  }
  warn(`${appDef.id}: appendix file not found (${appDef.fileName})`);
  return null;
}

interface FrontMatterSectionDef {
  slug: string;
  title: string;
  fileName: string;
}

const FRONT_MATTER_SECTIONS: FrontMatterSectionDef[] = [
  { slug: "toc", title: "Table of Contents", fileName: "_generated-toc.md" },
  {
    slug: "acknowledgements",
    title: "Copyright & Publication Information",
    fileName: "00-acknowlgements.md",
  },
  { slug: "preface", title: "Preface", fileName: "00-preface.md" },
];

// ── Warnings accumulator ──
const WARNINGS: string[] = [];
function warn(msg: string) {
  WARNINGS.push(msg);
  console.warn(`  ⚠ ${msg}`);
}

// ── Exclusion filter for dated files ──
const EXCLUDE_PATTERN =
  /edit|edits|rewrite|rewritten|draft|outline|concept|notes|scratch|backup|archive|termtreasury/i;

// ── Page-break handling ──
const PAGE_BREAK_SENTINEL = "\u0000PAGEBREAK\u0000";

const PAGE_BREAK_REGEX =
  /<!--\s*PAGE\s*BREAK\s*-->|<!--\s*pagebreak\s*-->|<!--\s*page-break\s*-->|<div\s+class\s*=\s*["']page-break["']\s*><\/div>|<div\s+style\s*=\s*["']page-break-after\s*:\s*always\s*;?\s*["']\s*><\/div>/gi;

function splitPages(raw: string): string[] {
  const normalized = raw.replace(PAGE_BREAK_REGEX, PAGE_BREAK_SENTINEL);
  const segments = normalized.split(PAGE_BREAK_SENTINEL);
  return segments.map((s) => s.trim()).filter((s) => s.length > 0);
}

function extractTitle(content: string, fallback: string): string {
  const match = content.match(/^#\s+(.+?)(?:\s+#\s+)?$/m);
  return match ? match[1].trim() : fallback;
}

// ── Roadmap table parser ──

/**
 * Parse the "Chapter Roadmap" or "### Chapter Roadmap" table from
 * a chapter's Introduction page content. Returns an array of
 * { topic, anchor, whyItMatters } items.
 */
function parseRoadmap(introContent: string): RoadmapItem[] {
  // Find the roadmap heading and following table
  const roadmapIdx = introContent.search(/#{1,3}\s+Chapter Roadmap/i);
  if (roadmapIdx === -1) return [];

  const afterHeading = introContent.substring(roadmapIdx);
  const tableStart = afterHeading.indexOf("|");
  if (tableStart === -1) return [];

  // Extract table lines (skip header + separator rows)
  const lines = afterHeading
    .substring(tableStart)
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("|") && l.endsWith("|"));

  if (lines.length < 3) return []; // header + sep + at least 1 row

  const items: RoadmapItem[] = [];
  for (let i = 2; i < lines.length; i++) {
    const cells = lines[i]
      .split("|")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
    if (cells.length < 2) continue;

    // Parse topic link: [Topic Name](#anchor)
    const linkMatch = cells[0].match(/\[(.+?)\]\(#(.+?)\)/);
    if (!linkMatch) continue;

    items.push({
      topic: linkMatch[1],
      anchor: linkMatch[2],
      whyItMatters: cells[1],
    });
  }

  return items;
}

/**
 * Parse the chapter subtitle from the intro page. The subtitle is the first
 * italic line (*like this*) after the first H1 heading, stripped of markers.
 */
function parseSubtitle(introContent: string): string | undefined {
  const lines = introContent.split("\n");
  let pastFirstH1 = false;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!pastFirstH1 && /^#\s+/.test(line)) {
      pastFirstH1 = true;
      continue;
    }
    if (!pastFirstH1 || line.length === 0) continue;
    if (line.startsWith(">") || line.startsWith("<!--") || line.startsWith("```")) continue;
    const italicMatch = line.match(/^[*_](.+?)[*_]$/);
    if (italicMatch) {
      const text = italicMatch[1].trim();
      if (text.length > 3) return text;
    }
    if (line.length > 0 && !/^[#*_>|]/.test(line)) break;
  }
  return undefined;
}

/** 
 * Preserve the Chapter Roadmap heading and content in the intro page.
 * Previously stripped to avoid duplicating a rendered Roadmap component,
 * but now kept in-page for direct reader visibility.
 */
function stripRoadmapFromContent(content: string): string {
  return content;
}

/**
 * Generate a Table of Contents markdown page listing front matter and all
 * chapters with number, title, and subtitle. Links jump to each chapter intro.
 */
function generateTocContent(_chapters: BookChapter[]): string {
  const lines: string[] = [
    // Cover hero — the book title's first appearance in the reader. The two
    // key words gently shift between brand colors (styled in styles.css).
    '<div class="toc-hero">',
    '  <div class="toc-kicker">Digital Textbook</div>',
    '  <div class="toc-title">Using <span class="toc-word">Data</span> to Drive <span class="toc-word">Business</span> Performance</div>',
    '  <div class="toc-sub">Databases and Management Information Systems</div>',
    '  <div class="toc-author">Nimrod Dvir, PhD</div>',
    "</div>",
    "",
    "## How to Read This Book",
    "",
    "The chapters below are cumulative. Each one assumes the skills of the one before it, so they're meant to be read in order. **The first half builds your foundation** while you work with inherited databases: recognizing data, organizing tables, connecting relationships, querying with SQL. **Chapter 9 is the pivot,** where you shift from *using* databases to *designing* systems. The second half advances into advanced SQL, administration, reporting and analytics, managerial judgment, infrastructure, and careers, closing with how to turn everything you've built into career evidence.",
    "",
    "Two projects run through the entire book: the **Grading Database**, which you build step by step in guided sections, and the **PetVax** veterinary case study, where you apply each chapter's skills independently. By the final chapter, you won't just know database concepts; you'll have working systems you can point to.",
    "",
    "# Table of Contents",
    "",
    "## Front Matter",
    "",
    "- [Copyright & Publication Information](/book/ch00/acknowledgements/1)",
    "- [Preface](/book/ch00/preface/1)",
    "",
    "## Chapters",
    "",
    "| # | Chapter | Topic |",
    "| :--- | :--- | :--- |",
  ];

  // Chapter titles + topics come from the canonical course outline so every
  // chapter has a reliable topic (parsing them from intro markdown was fragile).
  for (const item of COURSE_OUTLINE) {
    const num = parseInt(item.chapter, 10);
    const link = `/book/ch${item.chapter}/introduction/1`;
    lines.push(`| ${num} | [${item.title}](${link}) | ${item.subtitle} |`);
  }

  lines.push("", "## Appendices", "");
  for (const app of APPENDICES) {
    lines.push(`- [${app.title}](/appendices/${app.id})`);
  }

  lines.push("", "## Labs", "", "- [PetVax Veterinary Clinic Labs](/labs)");

  return lines.join("\n");
}

// ── navTitle derivation (sidebar page labels) ──

/** Strip Markdown inline formatting and HTML tags from a heading/line. */
function cleanInlineMd(text: string): string {
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const NAV_TITLE_MAX = 60;
const GENERIC_NAV_HEADINGS = new Set([
  "introduction",
  "learning objectives",
  "core concepts",
  "let's build",
  "review and reflection",
  "terms treasury",
  "rat / quiz",
  "lab: transfer practice",
  "chapter lab",
]);

function truncateNavTitle(text: string): string {
  if (text.length <= NAV_TITLE_MAX) return text;
  const cut = text.slice(0, NAV_TITLE_MAX);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 30 ? cut.slice(0, lastSpace) : cut).trimEnd() + "\u2026";
}

/**
 * Derive a content-aware sidebar label for a page.
 * Order: first H2/H3 → first bold standalone line → first meaningful
 * sentence → inherit previous page's heading ("continued") → "Page N".
 */
function deriveNavTitle(
  content: string,
  pageNumber: number,
  prevNavTitle: string | null,
): string {
  const lines = content.split("\n");
  let inCodeFence = false;

  // Answer-key pages should label themselves before subsection headings like
  // "Review Questions" or "Remember Questions" take over the sidebar.
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (/^(```|~~~)/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const answerKeyMatch = line.match(/^#\s+Answer Key\s*#*\s*$/i);
    if (answerKeyMatch) return "Answer Key";
  }

  // If a page begins a major section, prefer that H1 over lower-level
  // component headings that may appear later on the same page.
  inCodeFence = false;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (/^(```|~~~)/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const headingMatch = line.match(/^(#{1,3})\s+(.+?)\s*#*\s*$/);
    if (!headingMatch) continue;
    const text = cleanInlineMd(headingMatch[2]);
    const isGeneric = GENERIC_NAV_HEADINGS.has(text.toLowerCase());
    if (headingMatch[1] === "#" && text.length > 0 && !isGeneric) {
      return truncateNavTitle(stripSectionNumber(text));
    }
    if (headingMatch[1] !== "#" && !isGeneric) break;
  }

  // 1. First H2/H3 heading
  inCodeFence = false;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (/^(```|~~~)/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const headingMatch = line.match(/^#{2,3}\s+(.+?)\s*#*\s*$/);
    if (headingMatch) {
      const text = cleanInlineMd(headingMatch[1]);
      if (text.length > 0 && !GENERIC_NAV_HEADINGS.has(text.toLowerCase())) {
        return truncateNavTitle(stripSectionNumber(text));
      }
    }
  }

  // 2. First H1 heading (fallback when page has no H2/H3)
  inCodeFence = false;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (/^(```|~~~)/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const headingMatch = line.match(/^#\s+(.+?)\s*#*\s*$/);
    if (headingMatch) {
      const text = cleanInlineMd(headingMatch[1]);
      if (text.length > 0) return truncateNavTitle(stripSectionNumber(text));
    }
  }

  // 3. First bold standalone line
  inCodeFence = false;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (/^(```|~~~)/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const boldMatch = line.match(/^(?:\*\*|__)(.+?)(?:\*\*|__)[.:]?$/);
    if (boldMatch) {
      const text = cleanInlineMd(boldMatch[1]);
      if (text.length > 0) return truncateNavTitle(text);
    }
  }

  // 4. First meaningful sentence from prose (skip figure captions)
  inCodeFence = false;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (/^(```|~~~)/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    if (
      line.length === 0 ||
      /^#/.test(line) ||
      /^<!--/.test(line) ||
      /^[-*+]\s/.test(line) ||
      /^\d+\.\s/.test(line) ||
      /^[|>]/.test(line) ||
      /^!\[/.test(line) ||
      /^</.test(line)
    ) {
      continue;
    }
    // Skip italic-wrapped lines that are figure captions
    if (/^\*Figure\s+\d/.test(line) || /^_Figure\s+\d/.test(line)) {
      continue;
    }
    const text = cleanInlineMd(line);
    // Skip prose that is obviously a figure caption
    if (/^Figure\s+\d/.test(text)) {
      continue;
    }
    if (text.length >= 12) {
      const sentence = text.match(/^(.+?[.!?])(\s|$)/);
      return truncateNavTitle(sentence ? sentence[1] : text);
    }
  }

  // 5. Inherit previous page's heading (page continues a subsection)
  if (prevNavTitle) {
    const base = prevNavTitle.replace(/\s*\(continued\)$/, "");
    return `${base} (continued)`;
  }

  // 6. Final fallback
  return `Page ${pageNumber}`;
}

/**
 * Derive the reader page title shown in the page header.
 * Format: "{sectionTitle} — Page {N} — {navTitle}"
 * This keeps the title specific and informative even when chapters are
 * updated or recompiled. The navTitle already contains the first H2/H3
 * (or best available content label) for each page.
 */
function derivePageTitle(
  _sectionTitle: string,
  pageNumber: number,
  navTitle: string,
): string {
  return `${navTitle}`;
}

// ── Placeholder content ──
const PLACEHOLDER_MD = `# Section Missing\n\nThis section is not available yet.`;
const LAB_PLACEHOLDER_MD = `# Lab Not Available\n\nThis lab is not available yet.`;

// ── File resolution helpers ──

function readFileSafe(filePath: string): string | null {
  try {
    let content = fs.readFileSync(filePath, "utf-8");
    // Strip YAML frontmatter (--- at start of file)
    content = stripYamlFrontmatter(content);
    return content;
  } catch {
    return null;
  }
}

/** Strip YAML frontmatter delimited by --- fences at the very start of content.
 *  Also skips leading HTML comments (<!-- ... -->) before the --- fences. */
function stripYamlFrontmatter(content: string): string {
  let trimmed = content.trimStart();
  // Skip leading HTML comments
  while (trimmed.startsWith("<!--")) {
    const endComment = trimmed.indexOf("-->");
    if (endComment === -1) break;
    trimmed = trimmed.substring(endComment + 3).trimStart();
  }
  if (!trimmed.startsWith("---")) return content;
  const afterFirst = trimmed.indexOf("\n", 3);
  if (afterFirst === -1) return content;
  const closingIndex = trimmed.indexOf("\n---", afterFirst + 1);
  if (closingIndex === -1) return content;
  // Return everything after the closing ---
  return trimmed.substring(closingIndex + 4).trimStart();
}

/** Strip section numbering like "7.1 " or "7.1: " or "Part 3: " from nav titles for cleaner sidebar display. */
function stripSectionNumber(text: string): string {
  return text
    .replace(/^Part\s+\d+\s*:\s*/i, "")
    .replace(/^\d+(?:\.\d+)+[.)]?\s+/, "")
    .replace(/^[A-Z]?\d+\.\d+\s+/, "")
    .replace(/^[A-Z]\d+\.\s+/, "")   // A1., B3., etc.
    .replace(/^\d+\.\s+/, "");       // 1., 2., etc.
}

function listDirSafe(dirPath: string): string[] {
  try {
    return fs.readdirSync(dirPath);
  } catch {
    return [];
  }
}

/**
 * Find the latest dated file matching the given regex pattern.
 */
function findLatestDated(dirPath: string, pattern: RegExp): string | null {
  const files = listDirSafe(dirPath);
  const matches = files
    .filter((f) => pattern.test(f) && !EXCLUDE_PATTERN.test(f))
    .sort()
    .reverse(); // descending alphabetical = latest date last
  return matches.length > 0 ? matches[0] : null;
}

/**
 * Resolve a section file for a given chapter.
 */
function resolveSection(
  chapterDir: string,
  chapterId: string,
  chapterSlug: string,
  sectionDef: SectionDef,
): { sourceFile: string | null; sourceType: SourceType; content: string } {
  let result: { sourceFile: string | null; sourceType: SourceType; content: string } | null = null;

  // 1. Try stable file
  if (sectionDef.stableFile) {
    const stablePath = path.join(chapterDir, sectionDef.stableFile);
    const content = readFileSafe(stablePath);
    if (content !== null && content.trim().length > 0) {
      result = {
        sourceFile: sectionDef.stableFile,
        sourceType: "stable",
        content,
      };
    }
  }

  // 2. Try dated fallback (only if stable didn't resolve)
  if (!result && sectionDef.datedPattern) {
    const chNum = chapterId.replace("ch", "");
    const regexStr = sectionDef.datedPattern.replace("{N}", chNum);
    const regex = new RegExp(regexStr, "i");
    const latest = findLatestDated(chapterDir, regex);
    if (latest) {
      let content = readFileSafe(path.join(chapterDir, latest));
      if (content !== null && content.trim().length > 0) {
        result = { sourceFile: latest, sourceType: "dated-fallback", content };
      }
    }
  }

  // 3. Introduction special case: extract intro portion from the latest main file
  if (!result && sectionDef.slug === "introduction") {
    const mainPattern = new RegExp(
      `^${chapterId}-main-\\d{4}-\\d{2}-\\d{2}\\.md$`,
      "i",
    );
    const mainFile = findLatestDated(chapterDir, mainPattern);
    if (mainFile) {
      const mainContent = readFileSafe(path.join(chapterDir, mainFile));
      if (mainContent) {
        const pbIndex = mainContent.search(PAGE_BREAK_REGEX);
        let introContent =
          pbIndex !== -1
            ? mainContent.substring(0, pbIndex).trim()
            : mainContent;
        let strippedFirstH1 = false;
        introContent = introContent
          .split("\n")
          .filter((line) => {
            if (!strippedFirstH1 && /^#\s+/.test(line)) {
              strippedFirstH1 = true;
              return false;
            }
            return true;
          })
          .join("\n")
          .trim();
        if (introContent.length > 0) {
          result = {
            sourceFile: mainFile,
            sourceType: "dated-fallback",
            content: introContent,
          };
        }
      }
    }
  }

  // 4. Placeholder
  if (!result) {
    return {
      sourceFile: null,
      sourceType: "placeholder",
      content: PLACEHOLDER_MD,
    };
  }

  // Post-resolution: strip intro from core-concepts (ALL source types — stable + dated)
  if (sectionDef.slug === "core-concepts") {
    const pbIndex = result.content.search(PAGE_BREAK_REGEX);
    if (pbIndex !== -1) {
      // Remove ONLY the first page break marker, preserve all subsequent breaks
      const match = PAGE_BREAK_REGEX.exec(result.content.substring(pbIndex));
      const skipLen = match ? match[0].length : 0;
      result.content = result.content.substring(pbIndex + skipLen).trim();
      // Reset regex lastIndex
      PAGE_BREAK_REGEX.lastIndex = 0;
    }
  }

  return result;
}

/**
 * Resolve a lab file.
 */
function resolveLab(labDef: (typeof LABS)[0]): {
  sourceFile: string | null;
  sourceType: SourceType;
  content: string;
  title: string;
} {
  const labDir = path.join(SOURCE_LABS, labDef.folderName);

  // 1. index.md in lab folder
  let content = readFileSafe(path.join(labDir, "index.md"));
  if (content && content.trim().length > 0) {
    return {
      sourceFile: "index.md",
      sourceType: "stable",
      content,
      title: extractTitle(content, labDef.slug),
    };
  }

  // 2. README.md in lab folder
  content = readFileSafe(path.join(labDir, "README.md"));
  if (content && content.trim().length > 0) {
    return {
      sourceFile: "README.md",
      sourceType: "stable",
      content,
      title: extractTitle(content, labDef.slug),
    };
  }

  // 3. First .md file in lab folder
  const labFiles = listDirSafe(labDir)
    .filter((f) => f.endsWith(".md"))
    .sort();
  if (labFiles.length > 0) {
    content = readFileSafe(path.join(labDir, labFiles[0]));
    if (content && content.trim().length > 0) {
      return {
        sourceFile: labFiles[0],
        sourceType: "stable",
        content,
        title: extractTitle(content, labDef.slug),
      };
    }
  }

  // 4. Chapter-folder fallback: find lab-NN-questions-YYYY-MM-DD.md in matching chapter
  const labNum = labDef.id.replace("lab-", "");
  const chapterFolders = listDirSafe(SOURCE_CHAPTERS).filter((f) =>
    f.startsWith(`ch${labNum}-`),
  );
  if (chapterFolders.length > 0) {
    const chDir = path.join(SOURCE_CHAPTERS, chapterFolders[0]);
    const labQuestionPattern = new RegExp(
      `^lab-${labNum}-questions-\\d{4}-\\d{2}-\\d{2}\\.md$`,
      "i",
    );
    const latest = findLatestDated(chDir, labQuestionPattern);
    if (latest) {
      content = readFileSafe(path.join(chDir, latest));
      if (content && content.trim().length > 0) {
        return {
          sourceFile: latest,
          sourceType: "chapter-fallback",
          content,
          title: extractTitle(content, labDef.slug),
        };
      }
    }
  }

  // 5. Placeholder
  return {
    sourceFile: null,
    sourceType: "placeholder",
    content: LAB_PLACEHOLDER_MD,
    title: labDef.slug,
  };
}

// ── Main generation ──

function main() {
  console.log("Reader Hybrid — Book Data Generator\n");

  // Validate source root
  if (!fs.existsSync(SOURCE_CHAPTERS)) {
    if (fs.existsSync(OUTPUT)) {
      console.log(
        `  Source root not available in this environment: ${SOURCE_CHAPTERS}`,
      );
      console.log(
        `  Reusing committed generated data at ${OUTPUT} and skipping regeneration.\n`,
      );
      process.exit(0);
    }
    console.error(`ERROR: Chapter source root not found: ${SOURCE_CHAPTERS}`);
    process.exit(1);
  }

  // Check at least one of the 4 required chapter folders exists
  const availableChapterFolders = CHAPTERS.filter((ch) =>
    fs.existsSync(path.join(SOURCE_CHAPTERS, ch.folderName)),
  );
  if (availableChapterFolders.length === 0) {
    if (fs.existsSync(OUTPUT)) {
      console.log(
        "  Required chapter folders are not available in this environment.",
      );
      console.log(
        `  Reusing committed generated data at ${OUTPUT} and skipping regeneration.\n`,
      );
      process.exit(0);
    }
    console.error(
      "ERROR: Zero of the four required chapter folders found in source. Exiting.",
    );
    process.exit(1);
  }

  // ── Incremental check: hash source files and compare to manifest ──
  if (!FORCE) {
    const prevManifest = loadManifest();
    if (prevManifest && fs.existsSync(OUTPUT)) {
      let allMatch = true;
      const changed: string[] = [];

      for (const ch of CHAPTERS) {
        const chDir = path.join(SOURCE_CHAPTERS, ch.folderName);
        for (const sec of SECTIONS) {
          const { sourceFile } = resolveSection(chDir, ch.id, ch.slug, sec);
          const filePath = sourceFile ? path.join(chDir, sourceFile) : "";
          const currentHash = sourceFile ? hashFile(filePath) : "placeholder";
          const prev = prevManifest.chapters?.[ch.id]?.[sec.slug];
          if (
            !prev ||
            prev.hash !== currentHash ||
            prev.file !== (sourceFile || "")
          ) {
            allMatch = false;
            changed.push(`${ch.id}/${sec.slug}`);
          }
        }
      }

      for (const labDef of LABS) {
        const { sourceFile } = resolveLab(labDef);
        const labDir = path.join(SOURCE_LABS, labDef.folderName);
        const filePath = sourceFile ? path.join(labDir, sourceFile) : "";
        const currentHash = sourceFile ? hashFile(filePath) : "placeholder";
        const prev = prevManifest.labs?.[labDef.id];
        if (
          !prev ||
          prev.hash !== currentHash ||
          prev.file !== (sourceFile || "")
        ) {
          allMatch = false;
          changed.push(labDef.id);
        }
      }

      // Check front-matter files (skip generated TOC which always refreshes)
      const fmCheckDir = path.join(SOURCE_CHAPTERS, FRONT_MATTER_FOLDER);
      for (const fmSec of FRONT_MATTER_SECTIONS) {
        if (fmSec.slug === "toc") continue; // generated, not file-backed
        const fmFilePath = path.join(fmCheckDir, fmSec.fileName);
        const fmFileExists = fs.existsSync(fmFilePath);
        const currentHash = fmFileExists ? hashFile(fmFilePath) : "placeholder";
        const prev = prevManifest.chapters?.["ch00"]?.[fmSec.slug];
        if (
          !prev ||
          prev.hash !== currentHash ||
          prev.file !== (fmFileExists ? fmSec.fileName : "")
        ) {
          allMatch = false;
          changed.push(`ch00/${fmSec.slug}`);
        }
      }

      if (allMatch) {
        console.log("  No source changes detected — skipping regeneration.");
        console.log("  (Use --force to rebuild anyway.)\n");
        process.exit(0);
      } else {
        console.log(`  Changes detected in: ${changed.join(", ")}`);
        console.log("  Rebuilding...\n");
      }
    } else {
      console.log("  No previous manifest — full build.\n");
    }
  } else {
    console.log("  --force: skipping incremental check.\n");
  }

  const chapters: BookChapter[] = [];
  const allPages: BookPage[] = [];

  let totalSectionsResolved = 0;
  const sourceTypeCounts: Record<string, number> = {
    stable: 0,
    "dated-fallback": 0,
    placeholder: 0,
  };

  // ── Build regular chapters first (needed for TOC generation) ──
  for (const ch of CHAPTERS) {
    const chapterDir = path.join(SOURCE_CHAPTERS, ch.folderName);
    const sections: BookSection[] = [];

    // Extract chapter title: handle two-line H1 pattern ("# Chapter N:" / "# Real Title")
    let chapterTitle = "";

    // Look for index.md first (always exists per chapter folder convention)
    const indexContent = readFileSafe(path.join(chapterDir, "index.md"));
    if (indexContent) {
      const idxTitle = extractTitle(indexContent, "");
      if (idxTitle && !/^Chapter\s+\d+[:\s]*$/i.test(idxTitle)) {
        chapterTitle = idxTitle.replace(/^Chapter\s+\d+:\s*/i, "").trim();
      }
    }

    // Fallback to main dated file H1
    if (!chapterTitle) {
      const mainPattern = new RegExp(
        `^${ch.id}-main-\\d{4}-\\d{2}-\\d{2}\\.md$`,
        "i",
      );
      const mainFile = findLatestDated(chapterDir, mainPattern);
      if (mainFile) {
        const mainContent = readFileSafe(path.join(chapterDir, mainFile));
        if (mainContent) {
          const lines = mainContent.split("\n");
          const h1Lines = lines
            .filter((l) => /^#\s+/.test(l))
            .map((l) => l.replace(/^#\s+/, "").trim());
          if (h1Lines.length >= 2 && /^Chapter\s+\d+/i.test(h1Lines[0])) {
            // Two-line H1: "Chapter N:" / "Real Title"
            chapterTitle = h1Lines[1];
          } else if (h1Lines.length >= 1) {
            // Single H1: strip "Chapter N: " prefix if present
            chapterTitle = h1Lines[0].replace(/^Chapter\s+\d+:\s*/i, "").trim();
          }
        }
      }
    }

    // Last-resort fallback
    if (!chapterTitle) {
      chapterTitle = ch.slug
        .replace(/^ch\d+-/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    for (const sectionDef of SECTIONS) {
      const { sourceFile, sourceType, content } = resolveSection(
        chapterDir,
        ch.id,
        ch.slug,
        sectionDef,
      );
      const sectionId = `${ch.id}-${sectionDef.slug}`;
      const exists = sourceType !== "placeholder";

      // Split into pages
      const pageSegments = splitPages(content);
      let prevNavTitle: string | null = null;
      const pages: BookPage[] = pageSegments.map((seg, i) => {
        const navTitle = deriveNavTitle(seg, i + 1, prevNavTitle);
        prevNavTitle = navTitle;
        return {
          id: `${sectionId}-page-${i + 1}`,
          slug: `${sectionDef.slug}-page-${i + 1}`,
          title: derivePageTitle(sectionDef.title, i + 1, navTitle),
          navTitle,
          content: seg,
          pageNumber: i + 1,
          totalPages: pageSegments.length,
          chapterId: ch.id,
          chapterSlug: ch.slug,
          sectionId,
          sectionSlug: sectionDef.slug,
          sectionTitle: sectionDef.title,
          sourceFile,
          sourceType,
          exists,
        };
      });

      sections.push({
        id: sectionId,
        slug: sectionDef.slug,
        title: sectionDef.title,
        fileName: sourceFile || "",
        exists,
        sourceFile,
        sourceType,
        pages,
      });

      allPages.push(...pages);
      totalSectionsResolved++;
      sourceTypeCounts[sourceType] = (sourceTypeCounts[sourceType] || 0) + 1;

      if (!exists) {
        warn(`${ch.id}/${sectionDef.slug}: placeholder (no source file found)`);
      }
    }

    // ── Append matching lab as a chapter section ──
    const matchingLab = LABS.find((l) => l.chapterId === ch.id);
    if (matchingLab) {
      const labResult = resolveLab(matchingLab);
      if (labResult.sourceType !== "placeholder") {
        const letsBuildSlug = `${ch.id}-lets-build`;
        const labHeader = `> 🧪 **Chapter Lab** — This lab extends the [Let's Build](/book/${ch.id}/lets-build/1) section. Work through the Let's Build activities first, then apply what you learned in the PetVax Veterinary Clinic project.\n\n---\n\n`;
        const labContent = labHeader + labResult.content;
        const labSectionId = `${ch.id}-chapter-lab`;
        const pageSegments = splitPages(labContent);
        let prevNavTitle: string | null = null;
        const labPages: BookPage[] = pageSegments.map((seg, i) => {
          const navTitle = deriveNavTitle(seg, i + 1, prevNavTitle);
          prevNavTitle = navTitle;
          return {
            id: `${labSectionId}-page-${i + 1}`,
            slug: `chapter-lab-page-${i + 1}`,
            title: extractTitle(seg, `Chapter Lab \u2014 Page ${i + 1}`),
            navTitle,
            content: seg,
            pageNumber: i + 1,
            totalPages: pageSegments.length,
            chapterId: ch.id,
            chapterSlug: ch.slug,
            sectionId: labSectionId,
            sectionSlug: "chapter-lab",
            sectionTitle: "Chapter Lab",
            sourceFile: labResult.sourceFile,
            sourceType: labResult.sourceType,
            exists: true,
          };
        });

        sections.push({
          id: labSectionId,
          slug: "chapter-lab",
          title: "Chapter Lab",
          fileName: labResult.sourceFile || "",
          exists: true,
          sourceFile: labResult.sourceFile,
          sourceType: labResult.sourceType,
          pages: labPages,
        });

        allPages.push(...labPages);
        totalSectionsResolved++;
        sourceTypeCounts[labResult.sourceType] =
          (sourceTypeCounts[labResult.sourceType] || 0) + 1;
      }
    }

    // Parse roadmap items before stripping from content
    const introSection = sections.find((s) => s.slug === "introduction");
    const introContent =
      introSection?.pages?.[0]?.content ?? "";
    const roadmapItems = parseRoadmap(introContent);
    const subtitle = parseSubtitle(introContent);

    // Strip the roadmap table from the intro page content so it doesn't
    // duplicate the rendered Roadmap component in the reader.
    if (introSection && introSection.pages.length > 0) {
      const introPage = introSection.pages[0];
      const stripped = stripRoadmapFromContent(introPage.content);
      if (stripped !== introPage.content) {
        introPage.content = stripped;
      }
    }

    chapters.push({
      id: ch.id,
      slug: ch.slug,
      title: chapterTitle,
      subtitle,
      folderName: ch.folderName,
      sections,
      roadmapItems,
    });
  }

  // ── Front matter (ch00: toc + preface + acknowledgements) ──
  // Built after chapters so the TOC can reference all chapter data.
  const fmDir = path.join(SOURCE_CHAPTERS, FRONT_MATTER_FOLDER);
  if (fs.existsSync(fmDir)) {
    const fmSections: BookSection[] = [];
    const fmPages: BookPage[] = [];

    for (const fmSec of FRONT_MATTER_SECTIONS) {
      let content: string;
      let sourceFile: string | null;
      let sourceType: SourceType;

      if (fmSec.slug === "toc") {
        // Generated TOC — uses chapter data, not a file on disk
        content = generateTocContent(chapters);
        sourceFile = "_generated";
        sourceType = "stable";
      } else {
        const fmFilePath = path.join(fmDir, fmSec.fileName);
        content = readFileSafe(fmFilePath) ?? "";
        sourceFile = fmSec.fileName;
        sourceType = "stable";

        if (content.trim().length === 0) {
          content = PLACEHOLDER_MD;
          sourceFile = null;
          sourceType = "placeholder";
          warn(`ch00/${fmSec.slug}: placeholder (${fmSec.fileName} not found)`);
        }
      }

      const sectionId = `ch00-${fmSec.slug}`;
      const exists = sourceType !== "placeholder";
      const pageSegments = splitPages(content);
      let prevNavTitle: string | null = null;
      const pages: BookPage[] = pageSegments.map((seg, i) => {
        const navTitle = deriveNavTitle(seg, i + 1, prevNavTitle);
        prevNavTitle = navTitle;
        return {
          id: `${sectionId}-page-${i + 1}`,
          slug: `${fmSec.slug}-page-${i + 1}`,
          title: derivePageTitle(fmSec.title, i + 1, navTitle),
          navTitle,
          content: seg,
          pageNumber: i + 1,
          totalPages: pageSegments.length,
          chapterId: "ch00",
          chapterSlug: "ch00-front-matter",
          sectionId,
          sectionSlug: fmSec.slug,
          sectionTitle: fmSec.title,
          sourceFile,
          sourceType,
          exists,
        };
      });

      fmSections.push({
        id: sectionId,
        slug: fmSec.slug,
        title: fmSec.title,
        fileName: fmSec.fileName,
        exists,
        sourceFile,
        sourceType,
        pages,
      });
      fmPages.push(...pages);

      totalSectionsResolved++;
      sourceTypeCounts[sourceType] = (sourceTypeCounts[sourceType] || 0) + 1;
    }

    // ch00 goes first in the chapters array
    chapters.unshift({
      id: "ch00",
      slug: "ch00-front-matter",
      title: "Front Matter",
      subtitle: undefined,
      folderName: FRONT_MATTER_FOLDER,
      sections: fmSections,
      roadmapItems: [],
    });
    allPages.unshift(...fmPages);
    console.log(`  Front matter: loaded (toc + preface + acknowledgements)`);
  } else {
    console.log(
      `  Front matter: folder not found (${FRONT_MATTER_FOLDER}) — skipped`,
    );
  }

  // ── Labs ──
  const labs: BookLab[] = [];
  const labSourceTypeCounts: Record<string, number> = {
    stable: 0,
    "chapter-fallback": 0,
    placeholder: 0,
  };

  for (const labDef of LABS) {
    const { sourceFile, sourceType, content, title } = resolveLab(labDef);
    const exists = sourceType !== "placeholder";

    labs.push({
      id: labDef.id,
      slug: labDef.slug,
      title,
      folderName: labDef.folderName,
      content,
      exists,
      sourceFile,
      sourceType,
    });

    labSourceTypeCounts[sourceType] =
      (labSourceTypeCounts[sourceType] || 0) + 1;

    if (!exists) {
      warn(`${labDef.id}: placeholder (no lab content found)`);
    } else if (sourceType === "chapter-fallback") {
      warn(`${labDef.id}: using chapter-fallback (lab folder is empty)`);
    }
  }

  // ── Appendices ──
  const appendices: BookAppendix[] = [];
  for (const appDef of APPENDICES) {
    const resolved = resolveAppendix(appDef);
    if (resolved) {
      appendices.push(resolved);
      console.log(`  ${appDef.id}: loaded (${appDef.fileName})`);
    }
  }

  // ── Write output ──
  const outputDir = path.dirname(OUTPUT);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const bookData = {
    BOOK_CHAPTERS: chapters,
    FLAT_READER_PAGES: allPages,
    BOOK_LABS: labs,
    BOOK_APPENDICES: appendices,
    GENERATION_WARNINGS: WARNINGS,
  };

  const ts = `// Auto-generated by scripts/generateBookData.ts — do not edit manually
// Generated: ${new Date().toISOString()}

import type { BookChapter, BookPage, BookLab, BookAppendix } from '../types';

export const BOOK_CHAPTERS: BookChapter[] = ${JSON.stringify(chapters, null, 2)};

export const FLAT_READER_PAGES: BookPage[] = ${JSON.stringify(allPages, null, 2)};

export const BOOK_LABS: BookLab[] = ${JSON.stringify(labs, null, 2)};

export const BOOK_APPENDICES: BookAppendix[] = ${JSON.stringify(appendices, null, 2)};

export const GENERATION_WARNINGS: string[] = ${JSON.stringify(WARNINGS, null, 2)};
`;

  fs.writeFileSync(OUTPUT, ts, "utf-8");
  console.log(`\n  Wrote ${OUTPUT}`);

  // ── Write generation manifest ──
  const manifest: GenerationManifest = {
    generated_at: new Date().toISOString(),
    chapters: {},
    labs: {},
  };
  for (const ch of chapters) {
    manifest.chapters[ch.id] = {};
    for (const sec of ch.sections) {
      const chDir = path.join(SOURCE_CHAPTERS, ch.folderName);
      const filePath = sec.sourceFile ? path.join(chDir, sec.sourceFile) : "";
      manifest.chapters[ch.id][sec.slug] = {
        file: sec.sourceFile || "",
        hash: sec.sourceFile ? hashFile(filePath) : "placeholder",
      };
    }
  }
  for (const lab of labs) {
    const labDir = path.join(SOURCE_LABS, lab.folderName);
    const filePath = lab.sourceFile ? path.join(labDir, lab.sourceFile) : "";
    manifest.labs[lab.id] = {
      file: lab.sourceFile || "",
      hash: lab.sourceFile ? hashFile(filePath) : "placeholder",
    };
  }
  saveManifest(manifest);
  console.log(`  Wrote generation manifest`);

  // ── Console summary ──
  console.log("\n═══════════════════════════════════════");
  console.log("  GENERATION SUMMARY");
  console.log("═══════════════════════════════════════");
  console.log(`  Chapters loaded:      ${chapters.length}`);
  console.log(`  Sections resolved:    ${totalSectionsResolved}`);
  console.log(`    stable:             ${sourceTypeCounts["stable"] || 0}`);
  console.log(
    `    dated-fallback:     ${sourceTypeCounts["dated-fallback"] || 0}`,
  );
  console.log(
    `    placeholder:        ${sourceTypeCounts["placeholder"] || 0}`,
  );
  console.log(`  Reader pages:         ${allPages.length}`);
  console.log(`  Labs loaded:          ${labs.length}`);
  console.log(`    stable:             ${labSourceTypeCounts["stable"] || 0}`);
  console.log(
    `    chapter-fallback:   ${labSourceTypeCounts["chapter-fallback"] || 0}`,
  );
  console.log(
    `    placeholder:        ${labSourceTypeCounts["placeholder"] || 0}`,
  );
  console.log(`  Warnings:             ${WARNINGS.length}`);
  if (WARNINGS.length > 0) {
    WARNINGS.forEach((w) => console.log(`    - ${w}`));
  }
  console.log("═══════════════════════════════════════\n");
}

main();
