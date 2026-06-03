import Link from "next/link";
import { notFound } from "next/navigation";

import { getChapter } from "@/lib/book";
import { MarkdownView } from "@/components/MarkdownView";

/**
 * Public, unauthenticated preview of a single chapter.
 * Only chapters flagged `preview: true` in book.yaml are served here; any
 * other slug returns 404 so paid content is never exposed.
 */
export default async function PreviewChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter: slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter || !chapter.preview) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        This is a free preview chapter.{" "}
        <Link href="/#pricing" className="font-medium underline">
          Get the full book
        </Link>{" "}
        to read every chapter.
      </div>
      <article>
        <MarkdownView markdown={chapter.markdown} />
      </article>
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 text-center">
        <p className="font-medium text-slate-800">Want to keep reading?</p>
        <Link
          href="/#pricing"
          className="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
        >
          Get full access
        </Link>
      </div>
    </div>
  );
}
