import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

/**
 * Renders trusted, first-party book Markdown to HTML.
 * rehype-raw is enabled because chapters use inline HTML callout blocks.
 * Only first-party content is passed here; never render untrusted user input.
 */
export function MarkdownView({ markdown }: { markdown: string }) {
  return (
    <article className="prose prose-slate max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
