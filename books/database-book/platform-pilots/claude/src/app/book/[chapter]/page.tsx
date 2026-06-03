import Link from "next/link";
import { notFound } from "next/navigation";

import { getChapter, getAdjacentChapters } from "@/lib/book";
import { hasBookAccess } from "@/lib/access";
import { ReaderShell } from "@/components/ReaderShell";
import { BottomNav } from "@/components/BottomNav";
import { MarkdownView } from "@/components/MarkdownView";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter: slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const access = await hasBookAccess();
  const locked = !chapter.preview && !access;

  if (locked) {
    return (
      <ReaderShell currentSlug={slug}>
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-3xl" aria-hidden>
            🔒
          </p>
          <h1 className="mt-2 text-xl font-bold text-slate-900">
            {chapter.title}
          </h1>
          <p className="mt-2 text-slate-600">
            This chapter is part of the full book. Purchase access to read it.
          </p>
          <Link
            href="/#pricing"
            className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
          >
            Get full access
          </Link>
        </div>
      </ReaderShell>
    );
  }

  const { prev, next } = getAdjacentChapters(slug);

  return (
    <ReaderShell currentSlug={slug}>
      <article>
        <MarkdownView markdown={chapter.markdown} />
      </article>
      <BottomNav prev={prev} next={next} />
    </ReaderShell>
  );
}
