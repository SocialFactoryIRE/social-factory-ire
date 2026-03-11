
CREATE OR REPLACE FUNCTION public.get_all_users_for_admin()
RETURNS TABLE(
  user_id uuid,
  email text,
  display_name text,
  country text,
  city text,
  county text,
  town text,
  membership_type text,
  onboarded boolean,
  created_at timestamptz,
  role text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT
    p.user_id,
    u.email::text,
    p.display_name,
    p.country,
    p.city,
    p.county,
    p.town,
    p.membership_type,
    p.onboarded,
    p.created_at,
    ur.role::text
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.user_id
  LEFT JOIN public.user_roles ur ON ur.user_id = p.user_id
  WHERE public.has_role(auth.uid(), 'admin')
  ORDER BY p.created_at DESC;
$$;
