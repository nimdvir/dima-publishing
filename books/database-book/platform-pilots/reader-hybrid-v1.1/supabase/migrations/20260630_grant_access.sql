-- Grant 'manual' access through end of Fall 2026 for every roster member who has registered
INSERT INTO public.access_grants (user_id, email, grant_type, status, granted_at, expires_at, course_code, semester)
SELECT u.id, u.email, 'manual', 'active', now(), '2026-12-31 23:59:59+00'::timestamptz, 'BITM330', 'Summer 2026'
FROM auth.users u
JOIN public.allowed_emails ae ON ae.email = u.email
WHERE NOT EXISTS (
  SELECT 1 FROM public.access_grants ag
  WHERE ag.user_id = u.id AND ag.status='active' AND ag.expires_at > now()
);

-- Extend any already-existing (but expired) grants for roster members
UPDATE public.access_grants ag
SET expires_at = '2026-12-31 23:59:59+00'::timestamptz, status='active'
FROM auth.users u
JOIN public.allowed_emails ae ON ae.email = u.email
WHERE ag.user_id = u.id AND ag.expires_at <= '2027-01-01'::timestamptz;

-- Fix activate_student_trial to use valid grant_type='manual' and extended expiry
CREATE OR REPLACE FUNCTION public.activate_student_trial()
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path='public'
AS $$
DECLARE
  v_user_id UUID; v_email TEXT; v_is_allowed BOOLEAN;
  v_allowed_record RECORD; v_existing_grant RECORD;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('allowed',false,'reason','Not authenticated.','first_name',NULL,'last_name',NULL,'email',NULL,'free_until',NULL,'access_ends_at',NULL,'has_active_access',false);
  END IF;
  SELECT email INTO v_email FROM auth.users WHERE id = v_user_id;
  SELECT * INTO v_allowed_record FROM public.allowed_emails WHERE email = v_email;
  v_is_allowed := FOUND;
  IF NOT v_is_allowed THEN
    RETURN jsonb_build_object('allowed',false,'reason','Your email is not on the enrolled student roster. Contact your instructor.','first_name',NULL,'last_name',NULL,'email',v_email,'free_until',NULL,'access_ends_at',NULL,'has_active_access',false);
  END IF;
  SELECT * INTO v_existing_grant FROM public.access_grants WHERE user_id = v_user_id AND status='active' AND expires_at > now() ORDER BY created_at DESC LIMIT 1;
  IF FOUND THEN
    RETURN jsonb_build_object('allowed',true,'reason','Existing access grant is still active.','first_name',v_allowed_record.first_name,'last_name',v_allowed_record.last_name,'email',v_email,'free_until',NULL,'access_ends_at',v_existing_grant.expires_at,'has_active_access',true);
  END IF;
  INSERT INTO public.access_grants (user_id, email, grant_type, status, granted_at, expires_at, course_code, semester)
  VALUES (v_user_id, v_email, 'manual', 'active', now(), '2026-12-31 23:59:59+00'::timestamptz, 'BITM330', 'Summer 2026');
  RETURN jsonb_build_object('allowed',true,'reason','Enrolled student access activated.','first_name',v_allowed_record.first_name,'last_name',v_allowed_record.last_name,'email',v_email,'free_until',NULL,'access_ends_at','2026-12-31 23:59:59+00'::timestamptz,'has_active_access',true);
END;
$$;
