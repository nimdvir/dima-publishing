"use client";

import { useState } from "react";
import Link from "next/link";

import type { ChapterMeta, ChapterSection } from "@/lib/book";

export type SidebarChapter = ChapterMeta & {
  locked: boolean;
  sections: ChapterSection[];
};

/**
 * Collapsible chapter navigation.
 * The current chapter is expanded by default and its sections are shown.
 * Locked chapters render a lock marker and link to the pricing/landing page.
 */
export function Sidebar({
  chapters,
  currentSlug,
}: {
  chapters: SidebarChapter[];
  currentSlug: string | null;
}) {
  return (
    <nav aria-label="Chapters" className="text-sm">
      <ul className="flex flex-col gap-1">
        {chapters.map((chapter) => (
          <SidebarItem
            key={chapter.slug}
            chapter={chapter}
            isCurrent={chapter.slug === currentSlug}
          />
        ))}
      </ul>
    </nav>
  );
}

function SidebarItem({
  chapter,
  isCurrent,
}: {
  chapter: SidebarChapter;
  isCurrent: boolean;
}) {
  const [open, setOpen] = useState(isCurrent);
  const hasSections = chapter.sections.length > 0;
  const href = chapter.locked ? "/#pricing" : `/book/${chapter.slug}`;

  return (
    <li>
      <div className="flex items-center gap-1">
        {hasSections && (
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Collapse chapter" : "Expand chapter"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-slate-500 hover:bg-slate-100"
          >
            <span aria-hidden>{open ? "−" : "+"}</span>
          </button>
        )}
        {!hasSections && <span className="w-6" aria-hidden />}

        <Link
          href={href}
          aria-current={isCurrent ? "page" : undefined}
          className={`flex-1 rounded px-2 py-1 ${
            isCurrent
              ? "bg-emerald-50 font-medium text-emerald-900"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {chapter.title}
          {chapter.locked && (
            <span className="ml-1 text-slate-400" title="Locked" aria-label="Locked">
              🔒
            </span>
          )}
        </Link>
      </div>

      {open && hasSections && (
        <ul className="ml-7 mt-1 flex flex-col gap-0.5 border-l border-slate-200 pl-3">
          {chapter.sections.map((section) => (
            <li key={section.id}>
              <Link
                href={
                  chapter.locked
                    ? "/#pricing"
                    : `/book/${chapter.slug}#${section.id}`
                }
                className="block rounded px-2 py-0.5 text-slate-600 hover:bg-slate-100"
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
