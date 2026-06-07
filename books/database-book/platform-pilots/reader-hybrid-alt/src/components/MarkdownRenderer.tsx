import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { HeadingTocItem } from "../types";

type MarkdownRendererProps = {
  content: string;
};

function textFromChildren(children: unknown): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join("");
  if (children && typeof children === "object" && "props" in children) {
    const props = children.props as { children?: unknown };
    return textFromChildren(props.children);
  }
  return "";
}

export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "section";
}

function uniqueId(base: string, counts: Map<string, number>): string {
  const count = counts.get(base) ?? 0;
  counts.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

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

function isAllowedYouTubeSrc(src: string | undefined): boolean {
  if (!src) return false;
  try {
    const url = new URL(src);
    const hostname = url.hostname.replace(/^www\./, "");
    return url.protocol === "https:" && (hostname === "youtube.com" || hostname === "youtube-nocookie.com");
  } catch {
    return false;
  }
}

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "div",
    "span",
    "figure",
    "figcaption",
    "iframe",
  ],
  attributes: {
    ...defaultSchema.attributes,
    div: ["className", "class"],
    span: ["className", "class"],
    figure: ["className", "class"],
    figcaption: ["className", "class"],
    code: ["className", "class"],
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
    th: ["align", "colspan", "rowspan"],
    td: ["align", "colspan", "rowspan"],
    iframe: [
      "src",
      "title",
      "width",
      "height",
      "allow",
      "allowFullScreen",
      "allowfullscreen",
      "frameBorder",
      "frameborder",
    ],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ["http", "https"],
  },
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const headingCounts = new Map<string, number>();

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
        components={{
          a({ children, href, ...props }) {
            return (
              <a href={href} rel="noreferrer" target={href?.startsWith("http") ? "_blank" : undefined} {...props}>
                {children}
              </a>
            );
          },
          h2({ children, ...props }) {
            const id = uniqueId(slugifyHeading(textFromChildren(children)), headingCounts);
            return (
              <h2 id={id} {...props}>
                {children}
              </h2>
            );
          },
          h3({ children, ...props }) {
            const id = uniqueId(slugifyHeading(textFromChildren(children)), headingCounts);
            return (
              <h3 id={id} {...props}>
                {children}
              </h3>
            );
          },
          iframe({ src, title, width, height, allow, ...props }) {
            const source = typeof src === "string" ? src : undefined;
            if (!isAllowedYouTubeSrc(source)) {
              return <div className="blocked-embed">Embedded media blocked by prototype allow-list.</div>;
            }

            return (
              <iframe
                src={source}
                title={typeof title === "string" ? title : "YouTube video"}
                width={typeof width === "string" ? width : "560"}
                height={typeof height === "string" ? height : "315"}
                allow={typeof allow === "string" ? allow : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                {...props}
              />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
