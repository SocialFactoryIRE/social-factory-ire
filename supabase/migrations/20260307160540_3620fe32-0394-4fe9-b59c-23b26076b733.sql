
-- Create a view exposing only safe profile columns for authenticated lookups
CREATE VIEW public.profile_display AS
  SELECT user_id, display_name FROM public.profiles;

-- Grant access to the view for authenticated users
GRANT SELECT ON public.profile_display TO authenticated;

-- Tighten the profiles SELECT policy to own profile only
DROP POLICY "Authenticated can read display names" ON public.profiles;

CREATE POLICY "Users can read own profile"
ON public.profiles FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- Fix noticeboard INSERT policy to require chapter membership
DROP POLICY "Authors can insert own posts" ON public.noticeboard_posts;

CREATE POLICY "Authors can insert own posts"
ON public.noticeboard_posts FOR INSERT TO authenticated
WITH CHECK (
  author_id = auth.uid()
  AND (
    chapter_id IS NULL
    OR public.is_chapter_member(auth.uid(), chapter_id)
  )
);
