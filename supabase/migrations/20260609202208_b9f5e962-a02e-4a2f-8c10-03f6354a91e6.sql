
-- Fix mutable search_path on SECURITY DEFINER functions
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;

-- Tighten proposal status transitions for non-staff authors
CREATE OR REPLACE FUNCTION public.enforce_proposal_status_transition()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
DECLARE
  is_staff_user boolean;
BEGIN
  SELECT COALESCE(is_staff, false) INTO is_staff_user
  FROM public.profiles WHERE user_id = auth.uid();

  IF NEW.status IN ('adopted','rejected')
     AND (OLD.status IS DISTINCT FROM NEW.status)
     AND NOT COALESCE(is_staff_user, false)
  THEN
    RAISE EXCEPTION 'Only staff can mark proposals as adopted or rejected';
  END IF;

  -- Non-staff authors may only set status to 'draft' or 'open'
  IF (OLD.status IS DISTINCT FROM NEW.status)
     AND NOT COALESCE(is_staff_user, false)
     AND NEW.status NOT IN ('draft','open')
  THEN
    RAISE EXCEPTION 'Authors can only set proposal status to draft or open';
  END IF;

  RETURN NEW;
END;
$function$;

DROP TRIGGER IF EXISTS enforce_proposal_status_transition_trg ON public.proposals;
CREATE TRIGGER enforce_proposal_status_transition_trg
BEFORE UPDATE ON public.proposals
FOR EACH ROW EXECUTE FUNCTION public.enforce_proposal_status_transition();
