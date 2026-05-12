
-- 1. Block authenticated users from reading newsletter_signups
CREATE POLICY "No authenticated read access to newsletter signups"
ON public.newsletter_signups
FOR SELECT
TO authenticated
USING (false);

-- 2. Enforce proposal status transitions server-side
CREATE OR REPLACE FUNCTION public.enforce_proposal_status_transition()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.status IN ('adopted','rejected')
     AND (OLD.status IS DISTINCT FROM NEW.status)
     AND NOT EXISTS (
       SELECT 1 FROM public.profiles
       WHERE user_id = auth.uid() AND is_staff = true
     )
  THEN
    RAISE EXCEPTION 'Only staff can mark proposals as adopted or rejected';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_enforce_proposal_status ON public.proposals;
CREATE TRIGGER trg_enforce_proposal_status
BEFORE UPDATE ON public.proposals
FOR EACH ROW
EXECUTE FUNCTION public.enforce_proposal_status_transition();

-- 3. Lock down helper SECURITY DEFINER functions from direct RPC access.
-- These are only intended to be invoked from RLS policies / other DB functions.
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.is_admin_or_editor(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.is_chapter_member(uuid, uuid) FROM PUBLIC, anon, authenticated;
