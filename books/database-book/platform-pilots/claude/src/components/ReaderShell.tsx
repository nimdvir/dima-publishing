import Link from "next/link";

import { getChapter, getChapterList } from "@/lib/book";
import { hasBookAccess } from "@/lib/access";
import { Sidebar, type SidebarChapter } from "@/components/Sidebar";

/**
 * Shared reader layout: a chapter sidebar plus the page content.
 *
 * A chapter is "locked" when it is not a preview chapter and the user has no
 * active access. Locked chapters still appear in the sidebar (with a lock) but
 * their sections are hidden and links route to pricing.
 */
export async function ReaderShell({
  currentSlug,
  children,
}: {
  currentSlug: string | null;
  children: React.ReactNode;
}) {
  const access = await hasBookAccess();
  const list = getChapterList();

  const chapters: SidebarChapter[] = list.map((meta) => {
    const locked = !meta.preview && !access;
    const sections = locked ? [] : (getChapter(meta.slug)?.sections ?? []);
    return { ...meta, locked, sections };
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-8 px-4 py-8">
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-8">
          <Link
            href="/book"
            className="mb-4 block text-xs font-semibold uppercase tracking-wide text-slate-500 hover:text-slate-800"
          >
            Contents
          </Link>
          <Sidebar chapters={chapters} currentSlug={currentSlug} />
        </div>
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
