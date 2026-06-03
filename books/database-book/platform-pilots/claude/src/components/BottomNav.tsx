import Link from "next/link";

import type { ChapterMeta } from "@/lib/book";

/**
 * Bottom previous / next chapter navigation for the reader.
 */
export function BottomNav({
  prev,
  next,
}: {
  prev: ChapterMeta | null;
  next: ChapterMeta | null;
}) {
  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-12 flex items-stretch justify-between gap-4 border-t border-slate-200 pt-6"
    >
      <div className="flex-1">
        {prev && (
          <Link
            href={`/book/${prev.slug}`}
            className="flex flex-col rounded-lg border border-slate-200 p-4 hover:border-emerald-300 hover:bg-emerald-50"
          >
            <span className="text-xs text-slate-500">← Previous</span>
            <span className="font-medium text-slate-800">{prev.title}</span>
          </Link>
        )}
      </div>
      <div className="flex-1 text-right">
        {next && (
          <Link
            href={`/book/${next.slug}`}
            className="flex flex-col rounded-lg border border-slate-200 p-4 hover:border-emerald-300 hover:bg-emerald-50"
          >
            <span className="text-xs text-slate-500">Next →</span>
            <span className="font-medium text-slate-800">{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
