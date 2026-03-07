
-- Drop the view approach since it won't work with restricted RLS
DROP VIEW IF EXISTS public.profile_display;

-- Create a security definer function to safely look up display names
CREATE OR REPLACE FUNCTION public.get_display_names(user_ids uuid[])
RETURNS TABLE(user_id uuid, display_name text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.user_id, p.display_name
  FROM public.profiles p
  WHERE p.user_id = ANY(user_ids);
$$;
