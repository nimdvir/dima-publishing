"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Starts Stripe Checkout. If the user is not signed in (401), routes them to
 * login first and returns to pricing afterward. Access is granted only by the
 * webhook after payment, never here.
 */
export function BuyButton({
  label = "Get full access",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });

      if (res.status === 401) {
        router.push("/login?redirect=/%23pricing");
        return;
      }

      const data = await res.json();

      if (data.alreadyOwned) {
        router.push("/book");
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(data.error ?? "Could not start checkout.");
    } catch {
      setError("Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={
          className ??
          "rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        }
      >
        {loading ? "Starting checkout…" : label}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
