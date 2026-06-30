import { supabase } from './supabaseClient';

// Types for admin dashboard
export type StudentProgress = {
  email: string;
  first_name: string | null;
  last_name: string | null;
  netid: string | null;
  registered_at: string;
  last_sign_in: string | null;
  chapters_opened: number;
  chapters_completed: number;
  total_events: number;
  total_reading_seconds: number;
  last_activity: string | null;
};

export type ChapterProgress = {
  email: string;
  first_name: string | null;
  last_name: string | null;
  chapter_id: string;
  status: string;
  last_section: string | null;
  updated_at: string;
};

export type ReadingSession = {
  email: string;
  first_name: string | null;
  last_name: string | null;
  chapter_id: string;
  section_id: string | null;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
};

function requireSupabase() {
  if (!supabase) throw new Error('Supabase not configured');
  return supabase;
}

export async function checkIsAdmin(): Promise<boolean> {
  const client = requireSupabase();
  const { data, error } = await client.rpc('is_admin');
  if (error) return false;
  return data === true;
}

export async function fetchAllStudentProgress(): Promise<StudentProgress[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .rpc('get_all_student_progress');
  if (error) throw error;
  return (data as StudentProgress[]) ?? [];
}

export async function fetchAllChapterProgress(): Promise<ChapterProgress[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .rpc('get_all_chapter_progress');
  if (error) throw error;
  return (data as ChapterProgress[]) ?? [];
}

export async function fetchAllReadingSessions(): Promise<ReadingSession[]> {
  const client = requireSupabase();
  const { data, error } = await client
    .rpc('get_all_reading_sessions');
  if (error) throw error;
  return (data as ReadingSession[]) ?? [];
}
