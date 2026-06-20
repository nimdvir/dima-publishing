import { supabase, supabaseConfigError } from './supabaseClient';

export type TrialActivationResult = {
  allowed: boolean;
  reason: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  free_until: string | null;
  access_ends_at: string | null;
  has_active_access: boolean;
};

export type AccessStatus = {
  has_access: boolean;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  active_grant_type: string | null;
  expires_at: string | null;
};



function requireSupabase() {
  if (!supabase) {
    throw new Error(supabaseConfigError ?? 'Supabase is not configured.');
  }

  return supabase;
}

export async function activateStudentTrial() {
  const client = requireSupabase();
  const { data, error } = await client
    .rpc('activate_student_trial')
    .single();

  if (error) {
    throw error;
  }




  if (!data) {
    throw new Error('activate_student_trial returned no data.');
  }

  return data as TrialActivationResult;
}

export async function getMyAccess() {
  const client = requireSupabase();
  const { data, error } = await client
    .rpc('get_my_access')
    .single();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error('get_my_access returned no data.');
  }

  return data as AccessStatus;
}

export async function logReaderEvent(input: {
  eventType: string;
  chapterId?: string;
  sectionId?: string;
  pageId?: string;
  path?: string;
  metadata?: Record<string, unknown>;
}) {
  if (!supabase) {
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { error } = await supabase.from('reader_events').insert({
    user_id: user.id,
    email: user.email,
    event_type: input.eventType,
    chapter_id: input.chapterId ?? null,
    section_id: input.sectionId ?? null,
    page_id: input.pageId ?? null,
    path: input.path ?? window.location.pathname,
    metadata: input.metadata ?? {},
  });

  if (error && import.meta.env.DEV) {
    console.warn('Failed to log reader event:', error);
  }
}
