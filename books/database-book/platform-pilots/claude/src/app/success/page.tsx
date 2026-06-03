import Link from "next/link";

/**
 * Post-checkout landing. Access is granted asynchronously by the Stripe webhook,
 * so this page only confirms the purchase and points the reader to the book.
 */
export default function SuccessPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center px-4 py-24 text-center">
      <p className="text-4xl" aria-hidden>
        ✅
      </p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">
        Payment received
      </h1>
      <p className="mt-2 text-slate-600">
        Thanks for your purchase. Your access is being activated. If the book
        does not open right away, refresh in a moment.
      </p>
      <Link
        href="/book"
        className="mt-8 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
      >
        Start reading
      </Link>
    </div>
  );
}
