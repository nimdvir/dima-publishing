import "server-only";

import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const CHAPTERS_DIR = path.join(CONTENT_DIR, "chapters");

export const BOOK_PRODUCT_ID =
  process.env.NEXT_PUBLIC_BOOK_PRODUCT_ID ?? "database-book";

export type ChapterMeta = {
  slug: string;
  title: string;
  preview: boolean;
  order: number;
};

export type ChapterSection = {
  id: string;
  title: string;
};

export type Chapter = ChapterMeta & {
  markdown: string;
  sections: ChapterSection[];
};

type BookManifest = {
  product_id?: string;
  chapters: { slug: string; title: string; preview?: boolean }[];
};

function readManifest(): BookManifest {
  const file = path.join(CONTENT_DIR, "book.yaml");
  const raw = fs.readFileSync(file, "utf8");
  return yaml.load(raw) as BookManifest;
}

/**
 * Returns the newest dated `main` markdown file for a chapter.
 * Filenames follow chNN-main-YYYY-MM-DD.md; the latest date wins.
 */
function resolveLatestMainFile(slug: string): string | null {
  const mainDir = path.join(CHAPTERS_DIR, slug, "main");
  if (!fs.existsSync(mainDir)) return null;

  const dated = fs
    .readdirSync(mainDir)
    .filter((name) => /-main-\d{4}-\d{2}-\d{2}\.md$/.test(name))
    .sort(); // ISO dates sort lexicographically

  if (dated.length === 0) return null;
  return path.join(mainDir, dated[dated.length - 1]);
}

function slugify(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Extract H2 headings as navigable sections (ignores fenced code blocks). */
function extractSections(markdown: string): ChapterSection[] {
  const sections: ChapterSection[] = [];
  let inFence = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (match) {
      const title = match[1].trim();
      sections.push({ id: slugify(title), title });
    }
  }
  return sections;
}

export function getChapterList(): ChapterMeta[] {
  const manifest = readManifest();
  return manifest.chapters.map((c, index) => ({
    slug: c.slug,
    title: c.title,
    preview: Boolean(c.preview),
    order: index,
  }));
}

export function getChapter(slug: string): Chapter | null {
  const meta = getChapterList().find((c) => c.slug === slug);
  if (!meta) return null;

  const file = resolveLatestMainFile(slug);
  if (!file) return null;

  const parsed = matter(fs.readFileSync(file, "utf8"));
  const markdown = parsed.content;
  const title =
    (typeof parsed.data.title === "string" && parsed.data.title) || meta.title;

  return {
    ...meta,
    title,
    markdown,
    sections: extractSections(markdown),
  };
}

export function getAdjacentChapters(slug: string): {
  prev: ChapterMeta | null;
  next: ChapterMeta | null;
} {
  const list = getChapterList();
  const i = list.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? list[i - 1] : null,
    next: i < list.length - 1 ? list[i + 1] : null,
  };
}
