
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  IF _user_id <> auth.uid() THEN RETURN false; END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  IF _user_id <> auth.uid() THEN RETURN false; END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin','editor')
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_chapter_member(_user_id uuid, _chapter_id uuid)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN false; END IF;
  IF _user_id <> auth.uid() THEN RETURN false; END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.chapter_members
    WHERE user_id = _user_id AND chapter_id = _chapter_id
  );
END;
$$;
