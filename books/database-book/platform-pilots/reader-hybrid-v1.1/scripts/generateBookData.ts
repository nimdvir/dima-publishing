/**
 * generateBookData.ts — Reader Hybrid v1
 *
 * Scans chapters 1-4 and first 4 labs, resolves files via
 * stable → dated-fallback → placeholder, splits on page-break
 * markers, and writes src/generated/bookData.ts.
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ── Resolve repo root relative to this script ──
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..', '..', '..');
const PROJECT_ROOT = path.join(REPO_ROOT, 'books', 'database-book');
const SOURCE_CHAPTERS = path.join(PROJECT_ROOT, 'files', 'source', 'chapters');
const SOURCE_LABS = path.join(PROJECT_ROOT, 'files', 'source', 'labs');
const OUTPUT = path.resolve(__dirname, '..', 'src', 'generated', 'bookData.ts');

// ── Types mirroring src/types.ts (duplicated for standalone script) ──
type SourceType = 'stable' | 'dated-fallback' | 'chapter-fallback' | 'placeholder';

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

interface BookChapter {
  id: string;
  slug: string;
  title: string;
  folderName: string;
  sections: BookSection[];
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

// ── Chapter definitions (chapters 1-4) ──
const CHAPTERS: { id: string; slug: string; folderName: string }[] = [
  { id: 'ch01', slug: 'ch01-introduction-to-course', folderName: 'ch01-introduction-to-course' },
  { id: 'ch02', slug: 'ch02-mis-and-bitm', folderName: 'ch02-mis-and-bitm' },
  { id: 'ch03', slug: 'ch03-what-is-data', folderName: 'ch03-what-is-data' },
  { id: 'ch04', slug: 'ch04-databases', folderName: 'ch04-databases' },
];

// ── Section definitions (in order) ──
interface SectionDef {
  slug: string;
  title: string;
  stableFile: string;
  datedPattern: string; // regex string, {N} will be replaced with chapter number
}

const SECTIONS: SectionDef[] = [
  { slug: 'introduction', title: 'Introduction', stableFile: 'index.md', datedPattern: '' },
  { slug: 'core-concepts', title: 'Core Concepts', stableFile: 'core-concepts.md', datedPattern: '^ch{N}-main-\\d{4}-\\d{2}-\\d{2}\\.md$' },
  { slug: 'lets-build', title: "Let's Build", stableFile: 'lets-build.md', datedPattern: '^ch{N}-lets-build-\\d{4}-\\d{2}-\\d{2}\\.md$' },
  { slug: 'review-questions', title: 'Review Questions', stableFile: 'review-questions.md', datedPattern: '^ch{N}-reflection-\\d{4}-\\d{2}-\\d{2}\\.md$' },
  { slug: 'terms-treasury', title: 'Terms Treasury', stableFile: 'terms-treasury.md', datedPattern: '^ch{N}-terms-\\d{4}-\\d{2}-\\d{2}\\.md$' },
  { slug: 'rat', title: 'RAT: Reading Test', stableFile: 'rat.md', datedPattern: '^ch{N}-rat-\\d{4}-\\d{2}-\\d{2}\\.md$' },
];

// ── Lab definitions (first 4) ──
const LABS: { id: string; slug: string; folderName: string; chapterId: string }[] = [
  { id: 'lab-01', slug: 'lab-01-petvax-intro', folderName: 'lab-01-petvax-intro', chapterId: 'ch01' },
  { id: 'lab-02', slug: 'lab-02-petvax-system', folderName: 'lab-02-petvax-system', chapterId: 'ch02' },
  { id: 'lab-03', slug: 'lab-03-data-types-and-tables', folderName: 'lab-03-data-types-and-tables', chapterId: 'ch03' },
  { id: 'lab-04', slug: 'lab-04-intro-to-access', folderName: 'lab-04-intro-to-access', chapterId: 'ch04' },
];

// ── Warnings accumulator ──
const WARNINGS: string[] = [];
function warn(msg: string) {
  WARNINGS.push(msg);
  console.warn(`  ⚠ ${msg}`);
}

// ── Exclusion filter for dated files ──
const EXCLUDE_PATTERN = /edit|edits|rewrite|rewritten|draft|outline|concept|notes|scratch|backup|archive|termtreasury/i;

// ── Page-break handling ──
const PAGE_BREAK_SENTINEL = '\u0000PAGEBREAK\u0000';

const PAGE_BREAK_REGEX = /<!--\s*PAGE\s*BREAK\s*-->|<!--\s*pagebreak\s*-->|<!--\s*page-break\s*-->|<div\s+class\s*=\s*["']page-break["']\s*><\/div>|<div\s+style\s*=\s*["']page-break-after\s*:\s*always\s*;?\s*["']\s*><\/div>/gi;

function splitPages(raw: string): string[] {
  const normalized = raw.replace(PAGE_BREAK_REGEX, PAGE_BREAK_SENTINEL);
  const segments = normalized.split(PAGE_BREAK_SENTINEL);
  return segments
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

function extractTitle(content: string, fallback: string): string {
  const match = content.match(/^#\s+(.+?)(?:\s+#\s+)?$/m);
  return match ? match[1].trim() : fallback;
}

// ── Placeholder content ──
const PLACEHOLDER_MD = `# Section Missing\n\nThis section is not available yet.`;
const LAB_PLACEHOLDER_MD = `# Lab Not Available\n\nThis lab is not available yet.`;

// ── File resolution helpers ──

function readFileSafe(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
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
    .filter(f => pattern.test(f) && !EXCLUDE_PATTERN.test(f))
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
  sectionDef: SectionDef
): { sourceFile: string | null; sourceType: SourceType; content: string } {
  // 1. Try stable file
  if (sectionDef.stableFile) {
    const stablePath = path.join(chapterDir, sectionDef.stableFile);
    const content = readFileSafe(stablePath);
    if (content !== null && content.trim().length > 0) {
      // For Introduction (index.md), check it's not just a table-of-contents stub
      if (sectionDef.slug === 'introduction' && /^#\s+Chapter\s+\d/i.test(content)) {
        // index.md is a TOC stub — fall through to main-file intro extraction
      } else {
        return { sourceFile: sectionDef.stableFile, sourceType: 'stable', content };
      }
    }
  }

  // 2. Try dated fallback
  if (sectionDef.datedPattern) {
    const chNum = chapterId.replace('ch', '');
    const regexStr = sectionDef.datedPattern.replace('{N}', chNum);
    const regex = new RegExp(regexStr, 'i');
    const latest = findLatestDated(chapterDir, regex);
    if (latest) {
      const content = readFileSafe(path.join(chapterDir, latest));
      if (content !== null && content.trim().length > 0) {
        return { sourceFile: latest, sourceType: 'dated-fallback', content };
      }
    }
  }

  // 3. Introduction special case: extract intro portion from the latest main file
  if (sectionDef.slug === 'introduction') {
    const mainPattern = new RegExp(`^${chapterId}-main-\\d{4}-\\d{2}-\\d{2}\\.md$`, 'i');
    const mainFile = findLatestDated(chapterDir, mainPattern);
    if (mainFile) {
      const mainContent = readFileSafe(path.join(chapterDir, mainFile));
      if (mainContent) {
        // Slice from start to the first page-break marker (intro = page 1)
        const pbIndex = mainContent.search(PAGE_BREAK_REGEX);
        let introContent = pbIndex !== -1 ? mainContent.substring(0, pbIndex).trim() : mainContent;
        // Strip leading H1 lines (the two-line chapter heading: "# Chapter N:" / "# Real Title")
        introContent = introContent
          .split('\n')
          .filter(line => !/^#\s+/.test(line))
          .join('\n')
          .trim();
        if (introContent.length > 0) {
          return { sourceFile: mainFile, sourceType: 'dated-fallback', content: introContent };
        }
      }
    }
  }

  // 4. Placeholder
  return { sourceFile: null, sourceType: 'placeholder', content: PLACEHOLDER_MD };
}

/**
 * Resolve a lab file.
 */
function resolveLab(labDef: typeof LABS[0]): { sourceFile: string | null; sourceType: SourceType; content: string; title: string } {
  const labDir = path.join(SOURCE_LABS, labDef.folderName);

  // 1. index.md in lab folder
  let content = readFileSafe(path.join(labDir, 'index.md'));
  if (content && content.trim().length > 0) {
    return { sourceFile: 'index.md', sourceType: 'stable', content, title: extractTitle(content, labDef.slug) };
  }

  // 2. README.md in lab folder
  content = readFileSafe(path.join(labDir, 'README.md'));
  if (content && content.trim().length > 0) {
    return { sourceFile: 'README.md', sourceType: 'stable', content, title: extractTitle(content, labDef.slug) };
  }

  // 3. First .md file in lab folder
  const labFiles = listDirSafe(labDir).filter(f => f.endsWith('.md')).sort();
  if (labFiles.length > 0) {
    content = readFileSafe(path.join(labDir, labFiles[0]));
    if (content && content.trim().length > 0) {
      return { sourceFile: labFiles[0], sourceType: 'stable', content, title: extractTitle(content, labDef.slug) };
    }
  }

  // 4. Chapter-folder fallback: find lab-NN-questions-YYYY-MM-DD.md in matching chapter
  const labNum = labDef.id.replace('lab-', '');
  const chapterFolders = listDirSafe(SOURCE_CHAPTERS).filter(f => f.startsWith(`ch${labNum}-`));
  if (chapterFolders.length > 0) {
    const chDir = path.join(SOURCE_CHAPTERS, chapterFolders[0]);
    const labQuestionPattern = new RegExp(`^lab-${labNum}-questions-\\d{4}-\\d{2}-\\d{2}\\.md$`, 'i');
    const latest = findLatestDated(chDir, labQuestionPattern);
    if (latest) {
      content = readFileSafe(path.join(chDir, latest));
      if (content && content.trim().length > 0) {
        return { sourceFile: latest, sourceType: 'chapter-fallback', content, title: extractTitle(content, labDef.slug) };
      }
    }
  }

  // 5. Placeholder
  return { sourceFile: null, sourceType: 'placeholder', content: LAB_PLACEHOLDER_MD, title: labDef.slug };
}

// ── Main generation ──

function main() {
  console.log('Reader Hybrid — Book Data Generator\n');

  // Validate source root
  if (!fs.existsSync(SOURCE_CHAPTERS)) {
    console.error(`ERROR: Chapter source root not found: ${SOURCE_CHAPTERS}`);
    process.exit(1);
  }

  // Check at least one of the 4 required chapter folders exists
  const availableChapterFolders = CHAPTERS.filter(ch =>
    fs.existsSync(path.join(SOURCE_CHAPTERS, ch.folderName))
  );
  if (availableChapterFolders.length === 0) {
    console.error('ERROR: Zero of the four required chapter folders found in source. Exiting.');
    process.exit(1);
  }

  const chapters: BookChapter[] = [];
  const allPages: BookPage[] = [];

  let totalSectionsResolved = 0;
  const sourceTypeCounts: Record<string, number> = { stable: 0, 'dated-fallback': 0, placeholder: 0 };

  for (const ch of CHAPTERS) {
    const chapterDir = path.join(SOURCE_CHAPTERS, ch.folderName);
    const sections: BookSection[] = [];

    // Extract chapter title: handle two-line H1 pattern ("# Chapter N:" / "# Real Title")
    let chapterTitle = ch.slug;
    const mainPattern = new RegExp(`^${ch.id}-main-\\d{4}-\\d{2}-\\d{2}\\.md$`, 'i');
    const mainFile = findLatestDated(chapterDir, mainPattern);
    if (mainFile) {
      const mainContent = readFileSafe(path.join(chapterDir, mainFile));
      if (mainContent) {
        const lines = mainContent.split('\n');
        const h1Lines = lines
          .filter(l => /^#\s+/.test(l))
          .map(l => l.replace(/^#\s+/, '').trim());
        if (h1Lines.length >= 2 && /^Chapter\s+\d+/i.test(h1Lines[0])) {
          // Two-line H1: "Chapter N:" / "Real Title"
          chapterTitle = h1Lines[1];
        } else if (h1Lines.length >= 1) {
          // Single H1: strip "Chapter N: " prefix if present
          chapterTitle = h1Lines[0].replace(/^Chapter\s+\d+:\s*/i, '');
        }
      }
    }

    for (const sectionDef of SECTIONS) {
      const { sourceFile, sourceType, content } = resolveSection(chapterDir, ch.id, ch.slug, sectionDef);
      const sectionId = `${ch.id}-${sectionDef.slug}`;
      const exists = sourceType !== 'placeholder';

      // Split into pages
      const pageSegments = splitPages(content);
      const pages: BookPage[] = pageSegments.map((seg, i) => ({
        id: `${sectionId}-page-${i + 1}`,
        slug: `${sectionDef.slug}-page-${i + 1}`,
        title: extractTitle(seg, `${sectionDef.title} \u2014 Page ${i + 1}`),
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
      }));

      sections.push({
        id: sectionId,
        slug: sectionDef.slug,
        title: sectionDef.title,
        fileName: sourceFile || '',
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

    chapters.push({
      id: ch.id,
      slug: ch.slug,
      title: chapterTitle,
      folderName: ch.folderName,
      sections,
    });
  }

  // ── Labs ──
  const labs: BookLab[] = [];
  const labSourceTypeCounts: Record<string, number> = { stable: 0, 'chapter-fallback': 0, placeholder: 0 };

  for (const labDef of LABS) {
    const { sourceFile, sourceType, content, title } = resolveLab(labDef);
    const exists = sourceType !== 'placeholder';

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

    labSourceTypeCounts[sourceType] = (labSourceTypeCounts[sourceType] || 0) + 1;

    if (!exists) {
      warn(`${labDef.id}: placeholder (no lab content found)`);
    } else if (sourceType === 'chapter-fallback') {
      warn(`${labDef.id}: using chapter-fallback (lab folder is empty)`);
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
    GENERATION_WARNINGS: WARNINGS,
  };

  const ts = `// Auto-generated by scripts/generateBookData.ts — do not edit manually
// Generated: ${new Date().toISOString()}

import type { BookChapter, BookPage, BookLab } from '../types';

export const BOOK_CHAPTERS: BookChapter[] = ${JSON.stringify(chapters, null, 2)};

export const FLAT_READER_PAGES: BookPage[] = ${JSON.stringify(allPages, null, 2)};

export const BOOK_LABS: BookLab[] = ${JSON.stringify(labs, null, 2)};

export const GENERATION_WARNINGS: string[] = ${JSON.stringify(WARNINGS, null, 2)};
`;

  fs.writeFileSync(OUTPUT, ts, 'utf-8');
  console.log(`\n  Wrote ${OUTPUT}`);

  // ── Console summary ──
  console.log('\n═══════════════════════════════════════');
  console.log('  GENERATION SUMMARY');
  console.log('═══════════════════════════════════════');
  console.log(`  Chapters loaded:      ${chapters.length}`);
  console.log(`  Sections resolved:    ${totalSectionsResolved}`);
  console.log(`    stable:             ${sourceTypeCounts['stable'] || 0}`);
  console.log(`    dated-fallback:     ${sourceTypeCounts['dated-fallback'] || 0}`);
  console.log(`    placeholder:        ${sourceTypeCounts['placeholder'] || 0}`);
  console.log(`  Reader pages:         ${allPages.length}`);
  console.log(`  Labs loaded:          ${labs.length}`);
  console.log(`    stable:             ${labSourceTypeCounts['stable'] || 0}`);
  console.log(`    chapter-fallback:   ${labSourceTypeCounts['chapter-fallback'] || 0}`);
  console.log(`    placeholder:        ${labSourceTypeCounts['placeholder'] || 0}`);
  console.log(`  Warnings:             ${WARNINGS.length}`);
  if (WARNINGS.length > 0) {
    WARNINGS.forEach(w => console.log(`    - ${w}`));
  }
  console.log('═══════════════════════════════════════\n');
}

main();
