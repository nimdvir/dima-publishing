import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import type { Options } from 'rehype-sanitize';

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
    div: ['className', 'class', 'style'],
    span: ['className', 'class'],
    iframe: ['src', 'title', 'width', 'height', 'allow', 'allowFullScreen', 'frameBorder'],
    img: ['src', 'alt', 'width', 'height', 'title'],
    a: ['href', 'target', 'rel', 'title'],
    figure: ['className', 'class'],
    figcaption: ['className', 'class'],
    pre: ['className', 'class'],
    code: ['className', 'class'],
    th: ['style', 'align'],
    td: ['style', 'align'],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ['http', 'https', 'data'],
    href: ['http', 'https', 'mailto'],
  },
};

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, customSchema],
        ]}
        components={{
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
          // Ensure images are responsive
          img: ({ src, alt, ...props }: any) => (
            <img
              src={src}
              alt={alt || ''}
              loading="lazy"
              {...props}
            />
          ),
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
    </div>
  );
}
