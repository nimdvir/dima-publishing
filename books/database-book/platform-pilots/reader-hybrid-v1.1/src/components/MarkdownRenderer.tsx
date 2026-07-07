import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import type { Options } from 'rehype-sanitize';
import { slugifyHeading, uniqueId, textFromChildren, type HeadingTocItem } from '../utils/headings';
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
}

export default function MarkdownRenderer({
  content,
  onHeadingsExtracted,
  suppressFirstImage = false,
}: MarkdownRendererProps) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  // Per-render heading counter keeps DOM IDs aligned with extracted H1/H2/H3 IDs.
  const headingCounts = new Map<string, number>();
  let imageCount = 0;

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
          h1: ({ children, ...props }: any) => {
            const text = textFromChildren(children);
            const id = uniqueId(slugifyHeading(text), headingCounts);
            return <h1 {...props} id={id}>{children}</h1>;
          },
          h2: ({ children, ...props }: any) => {
            const text = textFromChildren(children);
            const id = uniqueId(slugifyHeading(text), headingCounts);
            return <h2 {...props} id={id}>{children}</h2>;
          },
          h3: ({ children, ...props }: any) => {
            const text = textFromChildren(children);
            const id = uniqueId(slugifyHeading(text), headingCounts);
            return <h3 {...props} id={id}>{children}</h3>;
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
