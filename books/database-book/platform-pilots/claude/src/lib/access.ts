import "server-only";

import { createClient } from "@/lib/supabase/server";
import { BOOK_PRODUCT_ID } from "@/lib/book";

/**
 * Server-side check for an active book entitlement for the signed-in user.
 * Relies on RLS: the query can only return the caller's own grant row.
 */
export async function hasBookAccess(): Promise<boolean> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from("access_grants")
    .select("status, end_date")
    .eq("product_id", BOOK_PRODUCT_ID)
    .maybeSingle();

  if (error || !data) return false;
  if (data.status !== "active" && data.status !== "comped") return false;
  if (data.end_date && new Date(data.end_date) < new Date()) return false;

  return true;
}
