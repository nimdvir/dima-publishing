import Link from "next/link";

import { getChapterList } from "@/lib/book";
import { createClient } from "@/lib/supabase/server";
import { hasBookAccess } from "@/lib/access";
import { BuyButton } from "@/components/BuyButton";

export default async function LandingPage() {
  const chapters = getChapterList();
  const previews = chapters.filter((c) => c.preview);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const owns = user ? await hasBookAccess() : false;

  return (
    <div className="mx-auto w-full max-w-4xl px-4">
      <header className="flex items-center justify-between py-6">
        <span className="font-semibold text-slate-900">
          Databases &amp; Business Performance
        </span>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/book" className="text-slate-600 hover:text-slate-900">
            Read
          </Link>
          {user ? (
            <Link
              href="/auth/signout"
              className="text-slate-600 hover:text-slate-900"
            >
              Sign out
            </Link>
          ) : (
            <Link href="/login" className="text-slate-600 hover:text-slate-900">
              Sign in
            </Link>
          )}
        </nav>
      </header>

      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Using Data to Drive Business Performance
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          An interactive textbook on databases and management information
          systems. Move from business questions to data-driven decisions.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          {owns ? (
            <Link
              href="/book"
              className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
            >
              Continue reading
            </Link>
          ) : (
            <BuyButton />
          )}
        </div>
      </section>

      {previews.length > 0 && (
        <section className="py-8">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
            Free preview chapters
          </h2>
          <ul className="mx-auto mt-4 flex max-w-md flex-col gap-2">
            {previews.map((chapter) => (
              <li key={chapter.slug}>
                <Link
                  href={`/preview/${chapter.slug}`}
                  className="block rounded-lg border border-slate-200 px-4 py-3 text-center text-slate-800 hover:border-emerald-300 hover:bg-emerald-50"
                >
                  {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section id="pricing" className="py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Full access</h2>
          <p className="mt-2 text-slate-600">
            Every chapter, notes, and reading progress. One-time purchase.
          </p>
          <div className="mt-6">
            {owns ? (
              <Link
                href="/book"
                className="inline-block rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
              >
                You own this — read now
              </Link>
            ) : (
              <BuyButton />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
