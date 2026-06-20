import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabasePublishableKey = import.meta.env
  .VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

export const supabaseConfigError = !supabaseUrl
  ? 'Missing VITE_SUPABASE_URL'
  : !supabasePublishableKey
    ? 'Missing VITE_SUPABASE_PUBLISHABLE_KEY'
    : null;

export const supabase: SupabaseClient | null = supabaseConfigError
  ? null
  : createClient(supabaseUrl!, supabasePublishableKey!);
