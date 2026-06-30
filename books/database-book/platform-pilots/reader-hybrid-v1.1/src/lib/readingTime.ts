import { supabase } from './supabaseClient';

let activeSessionId: number | null = null;
let activeSessionStart: Date | null = null;

/**
 * Start a reading session for a chapter.
 * Call when user navigates to a new chapter/section.
 */
export async function startReadingSession(
  chapterId: string,
  sectionId?: string,
): Promise<void> {
  if (!supabase) return;

  // End any previous session first
  await endReadingSession();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data, error } = await supabase
    .from('reading_sessions')
    .insert({
      user_id: user.id,
      email: user.email,
      chapter_id: chapterId,
      section_id: sectionId ?? null,
      started_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (error) {
    console.warn('Failed to start reading session:', error.message);
    return;
  }

  activeSessionId = data.id;
  activeSessionStart = new Date();
}

/**
 * End the current reading session, recording the duration.
 */
export async function endReadingSession(): Promise<void> {
  if (!supabase || activeSessionId === null) return;

  const endedAt = new Date();
  const durationSeconds = activeSessionStart
    ? Math.round((endedAt.getTime() - activeSessionStart.getTime()) / 1000)
    : null;

  // Only record if at least 5 seconds (ignore accidental opens)
  if (durationSeconds !== null && durationSeconds < 5) {
    // Delete too-short sessions
    await supabase.from('reading_sessions').delete().eq('id', activeSessionId);
  } else {
    await supabase
      .from('reading_sessions')
      .update({
        ended_at: endedAt.toISOString(),
        duration_seconds: durationSeconds,
      })
      .eq('id', activeSessionId);
  }

  activeSessionId = null;
  activeSessionStart = null;
}

/**
 * Format seconds into a human-readable duration.
 */
export function formatDuration(totalSeconds: number): string {
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
