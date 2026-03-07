
-- 1. Prevent users from changing is_staff on their own profile
CREATE OR REPLACE FUNCTION public.prevent_is_staff_change()
RETURNS trigger LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.is_staff IS DISTINCT FROM OLD.is_staff THEN
    RAISE EXCEPTION 'is_staff cannot be changed by users';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_prevent_is_staff_change
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.prevent_is_staff_change();

-- 2. Add validation trigger for noticeboard posts
CREATE OR REPLACE FUNCTION public.validate_noticeboard_post()
RETURNS trigger LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF char_length(NEW.title) > 200 THEN
    RAISE EXCEPTION 'Title must be 200 characters or fewer';
  END IF;
  IF NEW.body IS NOT NULL AND char_length(NEW.body) > 10000 THEN
    RAISE EXCEPTION 'Body must be 10000 characters or fewer';
  END IF;
  IF NEW.category NOT IN ('general', 'event', 'resource', 'opportunity') THEN
    RAISE EXCEPTION 'Invalid category: %', NEW.category;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_noticeboard_post
BEFORE INSERT OR UPDATE ON public.noticeboard_posts
FOR EACH ROW EXECUTE FUNCTION public.validate_noticeboard_post();

-- 3. Add validation trigger for proposal comments
CREATE OR REPLACE FUNCTION public.validate_proposal_comment()
RETURNS trigger LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF char_length(NEW.body) > 5000 THEN
    RAISE EXCEPTION 'Comment must be 5000 characters or fewer';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_proposal_comment
BEFORE INSERT OR UPDATE ON public.proposal_comments
FOR EACH ROW EXECUTE FUNCTION public.validate_proposal_comment();

-- 4. Add validation for proposal title/body length
CREATE OR REPLACE FUNCTION public.validate_proposal()
RETURNS trigger LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.type NOT IN ('proposal','initiative','co_design','vote') THEN
    RAISE EXCEPTION 'Invalid proposal type: %', NEW.type;
  END IF;
  IF NEW.status NOT IN ('draft','open','voting','closed','adopted','rejected') THEN
    RAISE EXCEPTION 'Invalid proposal status: %', NEW.status;
  END IF;
  IF char_length(NEW.title) > 200 THEN
    RAISE EXCEPTION 'Title must be 200 characters or fewer';
  END IF;
  IF char_length(NEW.body) > 20000 THEN
    RAISE EXCEPTION 'Body must be 20000 characters or fewer';
  END IF;
  RETURN NEW;
END;
$$;
