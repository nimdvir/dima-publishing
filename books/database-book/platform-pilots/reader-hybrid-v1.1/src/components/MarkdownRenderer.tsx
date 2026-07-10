import { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import type { Options } from 'rehype-sanitize';
import {
  slugifyHeading,
  uniqueId,
  textFromChildren,
  extractHeadingTocRaw,
  filterNonContentHeadings,
  contentStartsWithHeading,
  type HeadingTocItem,
} from '../utils/headings';
import ImageLightbox from './ImageLightbox';

// Custom sanitize schema: allow callout classes and YouTube iframes only
const customSchema: Options = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'div', 'span', 'iframe', 'img', 'figure', 'figcaption',
    'p', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'pre', 'code', 'blockquote', 'ul', 'ol', 'li',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'strong', 'em', 'br', 'hr', 'sup', 'sub',
  ],
  attributes: {
    ...defaultSchema.attributes,
    div: ['className', 'class'],
    span: ['className', 'class'],
    iframe: ['src', 'title', 'width', 'height', 'allow', 'allowFullScreen', 'frameBorder'],
    img: ['src', 'alt', 'width', 'height', 'title'],
    a: ['href', 'target', 'rel', 'title'],
    figure: ['className', 'class'],
    figcaption: ['className', 'class'],
    pre: ['className', 'class'],
    code: ['className', 'class'],
    h1: ['id'],
    h2: ['id'],
    h3: ['id'],
    th: ['align'],
    td: ['align'],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ['http', 'https', 'data'],
    href: ['http', 'https', 'mailto'],
  },
};

interface MarkdownRendererProps {
  content: string;
  /** Callback fired with all H1/H2/H3 headings found during render (for "On this page"). */
  onHeadingsExtracted?: (headings: HeadingTocItem[]) => void;
  suppressFirstImage?: boolean;
  /**
   * Called when an internal app link (e.g. /book/ch05/lets-build/1) is clicked,
   * so the SPA can navigate in-app instead of triggering a full-page reload.
   */
  onInternalLinkClick?: (href: string) => void;
}

/** Internal app routes that should navigate in-app rather than reload the page. */
const INTERNAL_ROUTE_RE = /^\/(book|labs|lab|appendices|login|account|admin)(\/|$)/;

export default function MarkdownRenderer({
  content,
  onHeadingsExtracted,
  suppressFirstImage = false,
  onInternalLinkClick,
}: MarkdownRendererProps) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  let imageCount = 0;

  // Deterministic heading IDs: precompute once per content, keyed by source line.
  // Generating IDs by mutating a counter during render is impure, so React
  // StrictMode's double-invoke double-counts duplicates and produces spurious
  // "-2" suffixes (and doubled "On this page" entries). Precomputing keeps DOM
  // IDs stable and pure. `node.position.start.line` gives each heading a stable
  // key that survives the double render.
  const rawToc = useMemo(() => extractHeadingTocRaw(content), [content]);
  const idByLine = useMemo(() => {
    const m = new Map<number, string>();
    for (const h of rawToc) m.set(h.line, h.id);
    return m;
  }, [rawToc]);
  const contentHeadings = useMemo<HeadingTocItem[]>(() => {
    // Omit the page's leading heading from "On this page" only when it acts as
    // the page TITLE — i.e., the page opens with a title-level (H1/H2) heading
    // that is either the sole heading or is followed by a deeper heading (its
    // child). Pages that open with sibling sections, or whose only heading is a
    // deeper subsection (H3, e.g. a continuation page), keep all of them so a
    // real section is never dropped and "On this page" is never left empty.
    const leadIsTitle =
      rawToc.length > 0 &&
      contentStartsWithHeading(content) &&
      rawToc[0].level <= 2 &&
      (rawToc.length === 1 || rawToc[1].level > rawToc[0].level);
    const items = leadIsTitle ? rawToc.slice(1) : rawToc;
    return filterNonContentHeadings(items).map(({ id, level, text }) => ({ id, level, text }));
  }, [rawToc, content]);

  // Fallback only for the rare heading whose source position is unavailable.
  const fallbackCounts = new Map<string, number>();
  const resolveHeadingId = (line: number | undefined, text: string): string =>
    (line != null ? idByLine.get(line) : undefined) ?? uniqueId(slugifyHeading(text), fallbackCounts);

  // Report this page's headings for the "On this page" rail.
  useEffect(() => {
    if (onHeadingsExtracted) onHeadingsExtracted(contentHeadings);
  }, [contentHeadings, onHeadingsExtracted]);

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, customSchema],
        ]}
        components={{
          // Custom H1/H2/H3 with stable IDs for "On this page" navigation
          h1: ({ node, children, ...props }: any) => {
            const id = resolveHeadingId(node?.position?.start?.line, textFromChildren(children));
            return <h1 {...props} id={id}>{children}</h1>;
          },
          h2: ({ node, children, ...props }: any) => {
            const id = resolveHeadingId(node?.position?.start?.line, textFromChildren(children));
            return <h2 {...props} id={id}>{children}</h2>;
          },
          h3: ({ node, children, ...props }: any) => {
            const id = resolveHeadingId(node?.position?.start?.line, textFromChildren(children));
            return <h3 {...props} id={id}>{children}</h3>;
          },
          // Anchor handler: internal app links navigate in-app (no reload);
          // external links open safely in a new tab.
          a: ({ href, children, ...props }: any) => {
            const rawHref = typeof href === "string" ? href : "";
            const isInternal = INTERNAL_ROUTE_RE.test(rawHref);
            const isExternal = /^https?:\/\//i.test(rawHref);

            if (isInternal) {
              return (
                <a
                  {...props}
                  href={rawHref}
                  onClick={(e) => {
                    // Let modified / non-left clicks open normally (new tab, etc.).
                    if (
                      e.defaultPrevented ||
                      e.button !== 0 ||
                      e.metaKey ||
                      e.ctrlKey ||
                      e.shiftKey ||
                      e.altKey
                    ) {
                      return;
                    }
                    if (!onInternalLinkClick) return;
                    e.preventDefault();
                    onInternalLinkClick(rawHref);
                  }}
                >
                  {children}
                </a>
              );
            }

            return (
              <a
                {...props}
                href={rawHref}
                {...(isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {children}
              </a>
            );
          },
          // Custom iframe handler: only allow YouTube / youtube-nocookie
          iframe: ({ src, ...props }: any) => {
            if (src && /^https:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com)\//.test(src)) {
              return (
                <div className="video-wrapper">
                  <iframe
                    src={src}
                    title={props.title || 'YouTube video'}
                    width={props.width || '560'}
                    height={props.height || '315'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder="0"
                    loading="lazy"
                  />
                </div>
              );
            }
            // Block non-YouTube iframes
            return (
              <div className="blocked-iframe">
                <p>&#x1F6AB; Embedded content blocked for security (non-YouTube source).</p>
              </div>
            );
          },
          // Images: click to enlarge in lightbox
          img: ({ src, alt, ...props }: any) => {
            imageCount += 1;

            if (suppressFirstImage && imageCount === 1) {
              return null;
            }

            return (
              <span
                className="image-zoom-wrapper"
                role="button"
                tabIndex={0}
                onClick={() => setLightbox({ src, alt: alt || '' })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightbox({ src, alt: alt || '' });
                  }
                }}
              >
                <img
                  src={src}
                  alt={alt || ''}
                  loading="lazy"
                  {...props}
                />
              </span>
            );
          },
          // Style tables
          table: ({ children, ...props }: any) => (
            <div className="table-wrapper">
              <table {...props}>{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
