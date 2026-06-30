-- Fix admin functions:
--   1. get_all_student_progress and get_all_chapter_progress referenced
--      public.progress (table doesn't exist) and re.inserted_at (column is
--      created_at). Rewrite to derive chapter activity from reader_events
--      and reading_sessions, which are the tables actually populated by the
--      reader app.
--   2. chapters_completed has no source; left as 0 until a completion signal
--      is recorded.

DROP FUNCTION IF EXISTS public.get_all_student_progress() CASCADE;
DROP FUNCTION IF EXISTS public.get_all_chapter_progress() CASCADE;

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
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: admin only.';
  END IF;

  RETURN QUERY
  WITH user_chapters AS (
    SELECT user_id, chapter_id FROM public.reader_events    WHERE chapter_id IS NOT NULL
    UNION
    SELECT user_id, chapter_id FROM public.reading_sessions WHERE chapter_id IS NOT NULL
  )
  SELECT
    u.email::TEXT,
    ae.first_name,
    ae.last_name,
    ae.netid,
    u.created_at,
    u.last_sign_in_at,
    COALESCE((SELECT COUNT(DISTINCT chapter_id) FROM user_chapters uc WHERE uc.user_id = u.id), 0)::BIGINT,
    0::BIGINT,
    COALESCE((SELECT COUNT(*) FROM public.reader_events re WHERE re.user_id = u.id), 0)::BIGINT,
    COALESCE((SELECT SUM(duration_seconds) FROM public.reading_sessions rs WHERE rs.user_id = u.id), 0)::BIGINT,
    GREATEST(
      (SELECT MAX(created_at) FROM public.reader_events    re WHERE re.user_id = u.id),
      (SELECT MAX(started_at) FROM public.reading_sessions rs WHERE rs.user_id = u.id)
    )
  FROM auth.users u
  LEFT JOIN public.allowed_emails ae ON ae.email = u.email
  WHERE ae.email IS NOT NULL
     OR EXISTS (SELECT 1 FROM public.reader_events    re WHERE re.user_id = u.id)
     OR EXISTS (SELECT 1 FROM public.reading_sessions rs WHERE rs.user_id = u.id)
  ORDER BY u.created_at DESC NULLS LAST;
END;
$$;

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
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Access denied: admin only.';
  END IF;

  RETURN QUERY
  WITH ch AS (
    SELECT user_id, chapter_id, MAX(created_at) AS last_at, NULL::TEXT AS last_section_hint
    FROM public.reader_events
    WHERE chapter_id IS NOT NULL
    GROUP BY user_id, chapter_id
    UNION ALL
    SELECT user_id, chapter_id, MAX(started_at), MAX(section_id)
    FROM public.reading_sessions
    WHERE chapter_id IS NOT NULL
    GROUP BY user_id, chapter_id
  ),
  agg AS (
    SELECT user_id, chapter_id, MAX(last_at) AS last_at, MAX(last_section_hint) AS last_section
    FROM ch
    GROUP BY user_id, chapter_id
  )
  SELECT
    u.email::TEXT,
    ae.first_name,
    ae.last_name,
    a.chapter_id::TEXT,
    'in_progress'::TEXT,
    a.last_section,
    a.last_at
  FROM agg a
  JOIN auth.users u ON u.id = a.user_id
  LEFT JOIN public.allowed_emails ae ON ae.email = u.email
  ORDER BY u.email, a.chapter_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_all_student_progress() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_all_chapter_progress() TO authenticated;
