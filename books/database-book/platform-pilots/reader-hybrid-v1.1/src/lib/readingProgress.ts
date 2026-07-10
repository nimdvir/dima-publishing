import { supabase } from "./supabaseClient";

export type ChapterProgress = {
  chapter_id: string;
  status: "opened" | "in_progress" | "completed";
  last_section: string | null;
  updated_at: string;
};

/**
 * Track a page view: upsert the chapter row to in_progress and record the section.
 * Uses the existing public.progress table (chapter-level granularity).
 */
export async function trackPageView(input: {
  chapterId: string;
  sectionId?: string;
  pageId: string;
}): Promise<void> {
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  // Upsert at chapter level: mark in_progress, record last section
  await supabase.from("progress").upsert(
    {
      user_id: user.id,
      chapter_id: input.chapterId,
      status: "in_progress",
      last_section: input.sectionId ?? null,
    },
    { onConflict: "user_id, chapter_id" },
  );
}

/**
 * Get all reading progress for the current user.
 */
export async function getAllProgress(): Promise<ChapterProgress[]> {
  if (!supabase) return [];

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("progress")
    .select("chapter_id, status, last_section, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.warn("Failed to load reading progress:", error.message);
    return [];
  }

  return (data as ChapterProgress[]) ?? [];
}

/**
 * Get the user's most recent reading position (newest updated chapter row).
 * Used to resume reading after login. Returns null when there is no history.
 */
export async function getLastPosition(): Promise<ChapterProgress | null> {
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("progress")
    .select("chapter_id, status, last_section, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.warn("Failed to load last reading position:", error.message);
    return null;
  }

  return (data as ChapterProgress) ?? null;
}

/**
 * Get progress status for a specific chapter.
 * Returns null if the chapter has never been opened.
 */
export async function getChapterProgress(
  chapterId: string,
): Promise<ChapterProgress | null> {
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("progress")
    .select("chapter_id, status, last_section, updated_at")
    .eq("user_id", user.id)
    .eq("chapter_id", chapterId)
    .maybeSingle();

  if (error) {
    console.warn("Failed to load chapter progress:", error.message);
    return null;
  }

  return (data as ChapterProgress) ?? null;
}

/**
 * Mark a chapter as completed.
 */
export async function markChapterCompleted(chapterId: string): Promise<void> {
  if (!supabase) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("progress").upsert(
    {
      user_id: user.id,
      chapter_id: chapterId,
      status: "completed",
    },
    { onConflict: "user_id, chapter_id" },
  );
}

/**
 * Mark the previous page as completed when navigating past it.
 * For now this is a no-op — the chapter-level tracking already
 * captures progress via trackPageView.
 */
export async function markPageCompleted(_pageId: string): Promise<void> {
  // Chapter-level progress is sufficient; no per-page table exists.
  // This function is kept for API compatibility with ChapterReader.
}
