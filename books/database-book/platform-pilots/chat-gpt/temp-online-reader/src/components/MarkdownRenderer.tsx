import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type HastNode = {
  type?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function isTrustedIframeSrc(src: unknown): boolean {
  const raw = Array.isArray(src) ? src[0] : src;
  if (typeof raw !== "string") return false;

  try {
    const url = new URL(raw, "https://example.com");
    const allowedHosts = new Set(["www.youtube.com", "youtube.com", "www.youtube-nocookie.com"]);
    return allowedHosts.has(url.hostname) && url.pathname.startsWith("/embed/");
  } catch {
    return false;
  }
}

function rehypeTrustedIframes() {
  return (tree: HastNode) => {
    function visit(node: HastNode): void {
      if (!node.children) return;
      node.children = node.children.filter((child) => {
        if (child.type === "element" && child.tagName === "iframe") {
          return isTrustedIframeSrc(child.properties?.src);
        }
        visit(child);
        return true;
      });
    }

    visit(tree);
  };
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
    iframe: [
      "src",
      "title",
      "width",
      "height",
      "allow",
      "allowFullScreen",
      "allowfullscreen",
      "loading",
      "referrerPolicy",
      "referrerpolicy",
    ],
    code: ["className", "class"],
    img: ["src", "alt", "title", "width", "height"],
    a: ["href", "title", "target", "rel"],
    th: ["align", "colspan", "rowspan"],
    td: ["align", "colspan", "rowspan"],
  },
  protocols: {
    ...defaultSchema.protocols,
    src: ["http", "https"],
    href: ["http", "https", "mailto"],
  },
};

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeTrustedIframes, [rehypeSanitize, sanitizeSchema]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
