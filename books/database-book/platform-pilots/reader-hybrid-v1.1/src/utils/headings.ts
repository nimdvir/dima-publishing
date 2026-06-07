/**
 * Heading utilities for the Reader Hybrid v1.1.
 * Adopted from reader-hybrid-alt; self-contained with no dependencies.
 */

export interface HeadingTocItem {
  id: string;
  level: 2 | 3;
  text: string;
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

/** Extract H2/H3 headings from raw Markdown content for the "On this page" panel. */
export function extractHeadingToc(content: string): HeadingTocItem[] {
  const counts = new Map<string, number>();
  const headings: HeadingTocItem[] = [];

  for (const line of content.split(/\r?\n/)) {
    const match = line.match(/^(##|###)\s+(.+)$/);
    if (!match) continue;

    const text = match[2].replace(/[#*_`~]/g, "").trim();
    if (!text) continue;

    headings.push({
      id: uniqueId(slugifyHeading(text), counts),
      level: match[1] === "##" ? 2 : 3,
      text,
    });
  }

  return headings;
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
