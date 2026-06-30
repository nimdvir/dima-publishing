-- =============================================================================
-- Reader Access Control: Enrolled Students Only + Time Tracking
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/akjidhxkcuubeajsntrz/sql/new
-- =============================================================================

-- 1. ALLOWED EMAILS TABLE — class roster for enrolled-only access
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.allowed_emails (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  netid TEXT,
  first_name TEXT,
  last_name TEXT,
  added_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS: only admins can read/write, but we also need the server-side
-- activate_student_trial function to read it. Use SECURITY DEFINER on the function.
ALTER TABLE public.allowed_emails ENABLE ROW LEVEL SECURITY;

-- Seed the Summer 2026 roster (26 students)
INSERT INTO public.allowed_emails (email, netid, first_name, last_name) VALUES
  ('ayi@albany.edu', 'HY468697', 'Hojoon', 'Yi'),
  ('bmhan@albany.edu', 'BH338872', 'Braxton', 'Han'),
  ('tmgabriel@albany.edu', 'TG938768', 'Temi', 'Gabriel'),
  ('sadkison@albany.edu', 'SA325635', 'Sabrina', 'Adkison'),
  ('yamoo@albany.edu', 'YA235341', 'Yasin', 'Amoo'),
  ('kcheng6@albany.edu', 'KC689542', 'Kelvin', 'Cheng'),
  ('jaguirrejean-baptiste@albany.edu', 'JA657549', 'Joshua', 'Aguirre Jean-Baptiste'),
  ('dtspencer@albany.edu', 'DS177491', 'Demara', 'Spencer'),
  ('ajean-baptiste@albany.edu', 'AJ734272', 'Ariann', 'Jean-Baptiste'),
  ('lwilliams25@albany.edu', 'LW344939', 'Leyoura', 'Williams'),
  ('hfeng2@albany.edu', 'HF152966', 'Chase', 'Feng'),
  ('nmoenifar@albany.edu', 'NM286877', 'Nadine', 'Moenifar'),
  ('nantwi@albany.edu', 'NA384176', 'Nelly', 'Antwi'),
  ('thuq@albany.edu', 'TH568127', 'Tahseen Sumain', 'Huq'),
  ('rsalanazi@albany.edu', 'RA997352', 'Reem', 'Alanazi'),
  ('amohan3@albany.edu', 'AM679481', 'Anisha', 'Mohan'),
  ('kmagassouba@albany.edu', 'KM272894', 'Kadiatou', 'Magassouba'),
  ('ichong@albany.edu', 'IC494338', 'Issac', 'Chong'),
  ('ssampler@albany.edu', 'SS753637', 'Sean', 'Sampler'),
  ('cmbowen@albany.edu', 'CB957969', 'Chelsea', 'Bowen'),
  ('ccatanzarite@albany.edu', 'CC173555', 'Connor', 'Catanzarite'),
  ('mmoore26@albany.edu', 'MM873872', 'Mahkai', 'Moore'),
  ('apooran@albany.edu', 'AP613967', 'Ashton', 'Pooran'),
  ('lyadav@albany.edu', 'LY148466', 'Lavkush', 'Yadav'),
  ('abajwa@albany.edu', 'AB868381', 'Arooj', 'Bajwa'),
  ('ndavila3@albany.edu', 'ND138778', 'Nadine', 'Davila')
ON CONFLICT (email) DO UPDATE SET
  netid = EXCLUDED.netid,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name;


-- 2. READING SESSIONS TABLE — time tracking
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.reading_sessions (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  chapter_id TEXT NOT NULL,
  section_id TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  UNIQUE (user_id, chapter_id, started_at)
);

ALTER TABLE public.reading_sessions ENABLE ROW LEVEL SECURITY;

-- RLS: users can insert/read their own sessions
CREATE POLICY "Users can manage own reading sessions"
  ON public.reading_sessions
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- 3. UPDATED activate_student_trial — ENROLLED-ONLY CHECK
-- =============================================================================
CREATE OR REPLACE FUNCTION public.activate_student_trial()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_user_id UUID;
  v_email TEXT;
  v_is_allowed BOOLEAN;
  v_allowed_record RECORD;
  v_existing_grant RECORD;
  v_trial_days INT := 180; -- 6-month access window
BEGIN
  -- Get current authenticated user
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'Not authenticated.',
      'first_name', NULL,
      'last_name', NULL,
      'email', NULL,
      'free_until', NULL,
      'access_ends_at', NULL,
      'has_active_access', false
    );
  END IF;

  -- Get user email from auth
  SELECT email INTO v_email FROM auth.users WHERE id = v_user_id;

  -- ENROLLED-ONLY CHECK: verify email is in the allowed roster
  SELECT * INTO v_allowed_record
  FROM public.allowed_emails
  WHERE email = v_email;

  v_is_allowed := FOUND;

  IF NOT v_is_allowed THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'reason', 'Your email is not on the enrolled student roster. If you believe this is an error, contact your instructor.',
      'first_name', NULL,
      'last_name', NULL,
      'email', v_email,
      'free_until', NULL,
      'access_ends_at', NULL,
      'has_active_access', false
    );
  END IF;

  -- Check if user already has an active access grant
  SELECT * INTO v_existing_grant
  FROM public.access_grants
  WHERE user_id = v_user_id AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;

  IF FOUND THEN
    RETURN jsonb_build_object(
      'allowed', true,
      'reason', 'Existing access grant is still active.',
      'first_name', v_allowed_record.first_name,
      'last_name', v_allowed_record.last_name,
      'email', v_email,
      'free_until', NULL,
      'access_ends_at', v_existing_grant.expires_at,
      'has_active_access', true
    );
  END IF;

  -- Create new access grant
  INSERT INTO public.access_grants (user_id, grant_type, expires_at)
  VALUES (v_user_id, 'student_trial', now() + (v_trial_days || ' days')::INTERVAL);

  RETURN jsonb_build_object(
    'allowed', true,
    'reason', 'Enrolled student access activated.',
    'first_name', v_allowed_record.first_name,
    'last_name', v_allowed_record.last_name,
    'email', v_email,
    'free_until', NULL,
    'access_ends_at', now() + (v_trial_days || ' days')::INTERVAL,
    'has_active_access', true
  );
END;
$$;


-- 4. UPDATED get_my_access — also check allowed_emails
-- =============================================================================
CREATE OR REPLACE FUNCTION public.get_my_access()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_user_id UUID;
  v_email TEXT;
  v_has_access BOOLEAN := false;
  v_grant_type TEXT;
  v_expires_at TIMESTAMPTZ;
  v_first_name TEXT;
  v_last_name TEXT;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object(
      'has_access', false,
      'first_name', NULL,
      'last_name', NULL,
      'email', NULL,
      'active_grant_type', NULL,
      'expires_at', NULL
    );
  END IF;

  SELECT email INTO v_email FROM auth.users WHERE id = v_user_id;

  -- Get name from roster if available
  SELECT ae.first_name, ae.last_name INTO v_first_name, v_last_name
  FROM public.allowed_emails ae
  WHERE ae.email = v_email;

  -- Check for active access grant
  SELECT grant_type, expires_at INTO v_grant_type, v_expires_at
  FROM public.access_grants
  WHERE user_id = v_user_id AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;

  v_has_access := v_grant_type IS NOT NULL;

  RETURN jsonb_build_object(
    'has_access', v_has_access,
    'first_name', v_first_name,
    'last_name', v_last_name,
    'email', v_email,
    'active_grant_type', v_grant_type,
    'expires_at', v_expires_at
  );
END;
$$;


-- 5. ADMIN DASHBOARD FUNCTIONS
-- =============================================================================

-- Check if current user is admin (HARDCODED — only the instructor)
-- To add additional admins, add more emails to the list below.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_email TEXT;
BEGIN
  SELECT email INTO v_email FROM auth.users WHERE id = auth.uid();

  -- ONLY these emails can access the admin dashboard:
  RETURN v_email IN (
    'ndvir@albany.edu'
    -- Add additional admin emails here, one per line:
    -- , 'another-admin@albany.edu'
  );
END;
$$;

-- Get all registered users with their progress summary (admin only)
CREATE OR REPLACE FUNCTION public.get_all_student_progress()
RETURNS TABLE(
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  netid TEXT,
  registered_at TIMESTAMPTZ,
  last_sign_in TIMESTAMPTZ,
  chapters_opened BIGINT,
  chapters_completed BIGINT,
  total_events BIGINT,
  total_reading_seconds BIGINT,
  last_activity TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  -- Admin check
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: admin only.';
  END IF;

  RETURN QUERY
  SELECT
    u.email::TEXT,
    ae.first_name,
    ae.last_name,
    ae.netid,
    u.created_at AS registered_at,
    u.last_sign_in_at AS last_sign_in,
    COUNT(DISTINCT p.chapter_id) FILTER (WHERE p.status IS NOT NULL)::BIGINT AS chapters_opened,
    COUNT(DISTINCT p.chapter_id) FILTER (WHERE p.status = 'completed')::BIGINT AS chapters_completed,
    COUNT(re.id)::BIGINT AS total_events,
    COALESCE(SUM(rs.duration_seconds), 0)::BIGINT AS total_reading_seconds,
    GREATEST(
      MAX(p.updated_at),
      MAX(re.inserted_at),
      MAX(rs.started_at)
    ) AS last_activity
  FROM auth.users u
  LEFT JOIN public.allowed_emails ae ON ae.email = u.email
  LEFT JOIN public.progress p ON p.user_id = u.id
  LEFT JOIN public.reader_events re ON re.user_id = u.id
  LEFT JOIN public.reading_sessions rs ON rs.user_id = u.id
  WHERE EXISTS (
    -- Only show students who are in the roster OR have registered
    SELECT 1 FROM public.allowed_emails ae2 WHERE ae2.email = u.email
    UNION
    SELECT 1 FROM public.progress p2 WHERE p2.user_id = u.id
  )
  GROUP BY u.id, u.email, u.created_at, u.last_sign_in_at, ae.first_name, ae.last_name, ae.netid
  ORDER BY last_activity DESC NULLS LAST;
END;
$$;

-- Get detailed chapter-by-chapter progress for all students (admin only)
CREATE OR REPLACE FUNCTION public.get_all_chapter_progress()
RETURNS TABLE(
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  chapter_id TEXT,
  status TEXT,
  last_section TEXT,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: admin only.';
  END IF;

  RETURN QUERY
  SELECT
    u.email::TEXT,
    ae.first_name,
    ae.last_name,
    p.chapter_id::TEXT,
    p.status::TEXT,
    p.last_section::TEXT,
    p.updated_at
  FROM public.progress p
  JOIN auth.users u ON u.id = p.user_id
  LEFT JOIN public.allowed_emails ae ON ae.email = u.email
  WHERE EXISTS (SELECT 1 FROM public.allowed_emails a WHERE a.email = u.email)
  ORDER BY u.email, p.chapter_id;
END;
$$;

-- Get reading sessions with computed durations (admin only)
CREATE OR REPLACE FUNCTION public.get_all_reading_sessions()
RETURNS TABLE(
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  chapter_id TEXT,
  section_id TEXT,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: admin only.';
  END IF;

  RETURN QUERY
  SELECT
    u.email::TEXT,
    ae.first_name,
    ae.last_name,
    rs.chapter_id::TEXT,
    rs.section_id::TEXT,
    rs.started_at,
    rs.ended_at,
    rs.duration_seconds
  FROM public.reading_sessions rs
  JOIN auth.users u ON u.id = rs.user_id
  LEFT JOIN public.allowed_emails ae ON ae.email = u.email
  ORDER BY rs.started_at DESC;
END;
$$;
