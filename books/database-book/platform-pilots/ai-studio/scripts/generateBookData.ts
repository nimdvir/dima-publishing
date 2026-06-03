/**
 * generateBookData.ts
 * 
 * Build-time script that reads Markdown chapter files from files/source/chapters/
 * and generates src/generated/bookData.ts as typed Chapter[] data.
 * 
 * Run: npx tsx scripts/generateBookData.ts
 * Also wired as: npm run generate  and  npm run prebuild
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Types (mirrors src/types.ts) ──────────────────────────────────────────

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Subsection {
  title: string;
  content: string;
}

interface Term {
  term: string;
  definition: string;
}

interface Chapter {
  id: string;
  title: string;
  introduction: string;
  concepts: {
    title: string;
    subsections: Subsection[];
  };
  build: string;
  questions: string;
  terms: Term[];
  rat: QuizQuestion[];
}

// ── Configuration ─────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, '..');
const CHAPTERS_DIR = path.resolve(PROJECT_ROOT, 'chapters');
const OUTPUT_FILE = path.resolve(PROJECT_ROOT, 'src', 'generated', 'bookData.ts');

// ── Helpers ───────────────────────────────────────────────────────────────

/** Extract a YYYY-MM-DD date from a filename like ch01-main-2026-06-02.md */
function extractDate(filename: string): string | null {
  const match = filename.match(/(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
}

/** Find the latest dated file matching a pattern in a folder.
 *  E.g., findLatest(folder, /ch\d\d-main-.*\.md/) returns the most recent main file.
 */
function findLatest(folder: string, pattern: RegExp): string | null {
  if (!fs.existsSync(folder)) return null;
  const files = fs.readdirSync(folder).filter(f => pattern.test(f));
  if (files.length === 0) return null;

  // Sort by extracted date descending
  files.sort((a, b) => {
    const da = extractDate(a);
    const db = extractDate(b);
    if (da && db) return db.localeCompare(da);
    if (da) return -1;
    if (db) return 1;
    return b.localeCompare(a);
  });

  return files[0];
}

/** Read a file, return its trimmed content, or empty string if missing. */
function readFile(folder: string, filename: string | null): string {
  if (!filename) return '';
  const filePath = path.join(folder, filename);
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf-8').trim();
}

/** Extract chapter number from folder name like "ch01-introduction-to-course" */
function extractChapterNumber(folderName: string): string {
  const match = folderName.match(/^ch(\d+)/);
  return match ? match[1] : '';
}

/** Extract a human-readable title from folder name.
 *  "ch01-introduction-to-course" → "Introduction to Course"
 */
function folderNameToTitle(folderName: string): string {
  // Remove chNN- prefix
  const withoutPrefix = folderName.replace(/^ch\d+-/, '');
  // Convert hyphens to spaces, capitalize words
  return withoutPrefix
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Try to extract a title from the first H1 in markdown content. */
function extractH1Title(markdown: string): string | null {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/** Escape backticks and backslashes for template literal embedding. */
function escapeTemplateLiteral(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

// ── Main Generator ────────────────────────────────────────────────────────

function generate(): void {
  if (!fs.existsSync(CHAPTERS_DIR)) {
    console.error(`ERROR: Chapters directory not found: ${CHAPTERS_DIR}`);
    process.exit(1);
  }

  const folders = fs.readdirSync(CHAPTERS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.startsWith('ch'))
    .map(d => d.name)
    .sort();

  const chapters: Chapter[] = [];

  for (const folderName of folders) {
    const folderPath = path.join(CHAPTERS_DIR, folderName);
    const chapterNum = extractChapterNumber(folderName);

    // Skip non-chapter folders
    if (!chapterNum) continue;

    // Read index.md
    const indexContent = readFile(folderPath, 'index.md');

    // Find latest dated files for each section
    const mainFile = findLatest(folderPath, new RegExp(`^ch0?${chapterNum}-main-.*\\.md$`));
    const letsBuildFile = findLatest(folderPath, new RegExp(`^ch0?${chapterNum}-lets-build-.*\\.md$`));
    const reflectionFile = findLatest(folderPath, new RegExp(`^ch0?${chapterNum}-reflection-.*\\.md$`));
    const termsFile = findLatest(folderPath, new RegExp(`^ch0?${chapterNum}-terms-.*\\.md$`));
    const ratFile = findLatest(folderPath, new RegExp(`^ch0?${chapterNum}-rat-.*\\.md$`));

    // Skip chapters with no content at all
    if (!mainFile && !indexContent && !letsBuildFile) {
      console.log(`  SKIP ${folderName}: no content files found`);
      continue;
    }

    // Read section content
    const mainMd = readFile(folderPath, mainFile);
    const buildMd = readFile(folderPath, letsBuildFile);
    const questionsMd = readFile(folderPath, reflectionFile);
    const termsMd = readFile(folderPath, termsFile);
    const ratMd = readFile(folderPath, ratFile);

    // Determine chapter title: prefer H1 from main, then from index, then folder name
    const h1Title = extractH1Title(mainMd) || extractH1Title(indexContent);
    const chapterTitle = h1Title || `Chapter ${chapterNum}: ${folderNameToTitle(folderName)}`;

    // Concepts: wrap main markdown in a single subsection
    const conceptsSubsections: Subsection[] = mainMd
      ? [{ title: 'Core Concepts', content: mainMd }]
      : [];

    // Terms: try to parse the 4-column table; fallback to raw markdown
    let terms: Term[] = [];
    if (termsMd) {
      const parsed = parseTermsTable(termsMd);
      if (parsed.length > 0) {
        terms = parsed;
      } else {
        // Fallback: store raw markdown as a single term entry
        terms = [{ term: 'Terms Treasury', definition: termsMd }];
      }
    }

    // RAT: for MVP, store as empty array; UI will fall back to markdown rendering
    const rat: QuizQuestion[] = [];

    chapters.push({
      id: `ch${chapterNum}`,
      title: chapterTitle,
      introduction: indexContent || '',
      concepts: {
        title: 'Core Concepts',
        subsections: conceptsSubsections,
      },
      build: buildMd,
      questions: questionsMd,
      terms,
      rat,
    });

    console.log(`  OK   ch${chapterNum}: ${chapterTitle.substring(0, 60)}${chapterTitle.length > 60 ? '...' : ''}`);
  }

  // ── Write output ──────────────────────────────────────────────────────────

  const output = generateOutput(chapters);

  // Ensure output directory exists
  const outDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`\nGenerated ${chapters.length} chapters → ${path.relative(PROJECT_ROOT, OUTPUT_FILE)}`);
}

// ── Terms Table Parser ────────────────────────────────────────────────────

/**
 * Parse a 4-column Markdown terms table into Term[] objects.
 * Expected format:
 * | Term / Concept | Definition | Business Significance | Examples |
 * |---|---|---|---|
 * | **Term Name** | Definition text | Business significance | Examples |
 */
function parseTermsTable(markdown: string): Term[] {
  const terms: Term[] = [];
  const lines = markdown.split('\n');

  let inTable = false;
  for (const line of lines) {
    const trimmed = line.trim();

    // Detect table rows: must start and end with |
    if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) {
      if (inTable && trimmed === '') break; // empty line after table = end
      continue;
    }

    // Skip separator rows like |---|---|
    if (/^\|[\s\-:]+\|[\s\-:]+\|/.test(trimmed)) continue;

    // Skip header row
    if (trimmed.includes('Term / Concept') || trimmed.includes('Definition')) {
      inTable = true;
      continue;
    }

    // Parse data row
    const cells = trimmed
      .split('|')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    if (cells.length >= 2) {
      // Strip bold markers from term
      const termName = cells[0].replace(/\*\*/g, '').trim();
      // Combine definition + business significance + examples
      const definition = cells.slice(1).join(' — ').replace(/\*\*/g, '').trim();
      if (termName && definition) {
        terms.push({ term: termName, definition });
      }
    }
  }

  return terms;
}

// ── Output Generator ──────────────────────────────────────────────────────

function generateOutput(chapters: Chapter[]): string {
  const header = `/**
 * GENERATED FILE — DO NOT EDIT DIRECTLY
 * 
 * Generated by: npm run generate  (scripts/generateBookData.ts)
 * Source: files/source/chapters/
 * Generated: ${new Date().toISOString()}
 */
import { Chapter } from '../types';

export const CHAPTERS: Chapter[] = [
`;

  const chapterEntries = chapters.map(ch => {
    const intro = escapeTemplateLiteral(ch.introduction);
    const build = escapeTemplateLiteral(ch.build);
    const questions = escapeTemplateLiteral(ch.questions);

    const subsections = ch.concepts.subsections.map(sub => {
      const content = escapeTemplateLiteral(sub.content);
      const title = escapeTemplateLiteral(sub.title);
      return `      {
        title: \`${title}\`,
        content: \`${content}\`
      }`;
    }).join(',\n');

    const terms = ch.terms.map(t => {
      const term = escapeTemplateLiteral(t.term);
      const def = escapeTemplateLiteral(t.definition);
      return `    { term: \`${term}\`, definition: \`${def}\` }`;
    }).join(',\n');

    return `  {
    id: '${ch.id}',
    title: \`${escapeTemplateLiteral(ch.title)}\`,
    introduction: \`${intro}\`,
    concepts: {
      title: 'Core Concepts',
      subsections: [
${subsections}
      ]
    },
    build: \`${build}\`,
    questions: \`${questions}\`,
    terms: [
${terms}
    ],
    rat: []
  }`;
  });

  const footer = `
];
`;

  return header + chapterEntries.join(',\n\n') + footer;
}

// ── Run ────────────────────────────────────────────────────────────────────

generate();
