import Link from "next/link";

import { getChapterList } from "@/lib/book";
import { hasBookAccess } from "@/lib/access";
import { ReaderShell } from "@/components/ReaderShell";

export const metadata = {
  title: "Contents",
};

export default async function BookHomePage() {
  const chapters = getChapterList();
  const access = await hasBookAccess();

  return (
    <ReaderShell currentSlug={null}>
      <h1 className="text-2xl font-bold text-slate-900">Table of Contents</h1>
      {!access && (
        <p className="mt-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
          You have preview access. Unlock every chapter from the{" "}
          <Link href="/#pricing" className="font-medium underline">
            pricing section
          </Link>
          .
        </p>
      )}
      <ol className="mt-6 flex flex-col gap-2">
        {chapters.map((chapter, i) => {
          const locked = !chapter.preview && !access;
          return (
            <li key={chapter.slug}>
              <Link
                href={locked ? "/#pricing" : `/book/${chapter.slug}`}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 hover:border-emerald-300 hover:bg-emerald-50"
              >
                <span className="text-slate-800">
                  <span className="mr-2 text-slate-400">{i + 1}.</span>
                  {chapter.title}
                </span>
                {locked ? (
                  <span className="text-sm text-slate-400">🔒 Locked</span>
                ) : chapter.preview && !access ? (
                  <span className="text-sm text-emerald-700">Preview</span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ol>
    </ReaderShell>
  );
}
