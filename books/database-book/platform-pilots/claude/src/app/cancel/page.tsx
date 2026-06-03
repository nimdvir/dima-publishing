import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Checkout canceled</h1>
      <p className="mt-2 text-slate-600">
        No charge was made. You can pick up where you left off whenever you are
        ready.
      </p>
      <Link
        href="/#pricing"
        className="mt-8 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
      >
        Back to pricing
      </Link>
    </div>
  );
}
