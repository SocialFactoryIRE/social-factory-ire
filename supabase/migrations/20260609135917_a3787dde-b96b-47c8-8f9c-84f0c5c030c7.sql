
-- 1. Add guard to is_chapter_member to prevent leaking other users' membership
CREATE OR REPLACE FUNCTION public.is_chapter_member(_user_id uuid, _chapter_id uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF auth.uid() IS NOT NULL AND _user_id <> auth.uid() THEN
    RETURN false;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.chapter_members
    WHERE user_id = _user_id AND chapter_id = _chapter_id
  );
END;
$$;

-- 2. Ensure status-transition trigger is attached to proposals UPDATE
DROP TRIGGER IF EXISTS enforce_proposal_status_transition_trg ON public.proposals;
CREATE TRIGGER enforce_proposal_status_transition_trg
BEFORE UPDATE ON public.proposals
FOR EACH ROW
EXECUTE FUNCTION public.enforce_proposal_status_transition();

-- Also ensure validation trigger is present
DROP TRIGGER IF EXISTS validate_proposal_trg ON public.proposals;
CREATE TRIGGER validate_proposal_trg
BEFORE INSERT OR UPDATE ON public.proposals
FOR EACH ROW
EXECUTE FUNCTION public.validate_proposal();
