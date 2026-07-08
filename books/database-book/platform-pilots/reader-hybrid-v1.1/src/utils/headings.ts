/**
 * Heading utilities for the Reader Hybrid v1.1.
 * Adopted from reader-hybrid-alt; self-contained with no dependencies.
 */

export interface HeadingTocItem {
  id: string;
  level: 1 | 2 | 3;
  text: string;
}

export interface RawHeadingTocItem extends HeadingTocItem {
  /** 1-based source line, matching hast `node.position.start.line`. */
  line: number;
}

/** Generate a URL-safe slug from a heading text string. */
export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "section";
}

/** Ensure unique IDs across a page by appending a counter when a slug repeats. */
export function uniqueId(base: string, counts: Map<string, number>): string {
  const count = counts.get(base) ?? 0;
  counts.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

/**
 * Extract H1/H2/H3 headings with their source line in a single deterministic
 * pass. Unfiltered — includes UI/chrome headings — so it can supply stable DOM
 * IDs keyed by line. `line` is 1-based to match hast `node.position.start.line`.
 */
export function extractHeadingTocRaw(content: string): RawHeadingTocItem[] {
  const counts = new Map<string, number>();
  const headings: RawHeadingTocItem[] = [];
  let activeFence: { char: "`" | "~"; length: number } | null = null;

  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      const fence = fenceMatch[1];
      const fenceChar = fence[0] as "`" | "~";
      if (!activeFence) activeFence = { char: fenceChar, length: fence.length };
      else if (activeFence.char === fenceChar && fence.length >= activeFence.length) activeFence = null;
      continue;
    }

    if (activeFence) continue;

    const match = line.match(/^(#|##|###)\s+(.+)$/);
    if (!match) continue;

    const text = match[2].replace(/[#*_`~]/g, "").trim();
    if (!text) continue;

    const level = match[1].length as 1 | 2 | 3;

    headings.push({
      id: uniqueId(slugifyHeading(text), counts),
      level,
      text,
      line: i + 1,
    });
  }

  return headings;
}

/** Extract H1/H2/H3 headings from raw Markdown content for the "On this page" panel. */
export function extractHeadingToc(content: string): HeadingTocItem[] {
  return filterNonContentHeadings(
    extractHeadingTocRaw(content).map(({ id, level, text }) => ({ id, level, text })),
  );
}

/**
 * True when the content's first meaningful line is a Markdown heading (skipping
 * blank lines and HTML comments). Such a page leads with its own title heading —
 * which the reader shows as the page title and therefore omits both from the
 * header (to avoid a duplicate) and from the "On this page" rail.
 */
export function contentStartsWithHeading(content: string): boolean {
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("<!--")) continue; // skip leading HTML comments
    return /^#{1,6}\s/.test(line);
  }
  return false;
}

/** Headings that are UI/chrome, not instructional content — excluded from "On this page". */
const NON_CONTENT_HEADINGS = new Set([
  "chapter video",
  "supplementary video",
  "chapter roadmap",
  "learning objectives",
  "core concepts",
]);

/** Regex patterns for headings that should be excluded from "On this page". */
const NON_CONTENT_PATTERNS = [
  /^supplementary video\b/i,
];

/** Filter out headings that represent UI chrome rather than instructional content. */
export function filterNonContentHeadings(headings: HeadingTocItem[]): HeadingTocItem[] {
  return headings.filter((h) => {
    const lower = h.text.toLowerCase();
    if (NON_CONTENT_HEADINGS.has(lower)) return false;
    if (NON_CONTENT_PATTERNS.some((p) => p.test(lower))) return false;
    return true;
  });
}

/**
 * Extract the plain-text content from React children for use in heading ID generation.
 * Handles strings, numbers, arrays, and React elements with children.
 */
export function textFromChildren(children: unknown): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join("");
  if (children && typeof children === "object" && "props" in children) {
    const props = (children as { props?: { children?: unknown } }).props;
    return props?.children !== undefined ? textFromChildren(props.children) : "";
  }
  return "";
}
