
-- Allow authenticated users to read display_name of any profile (for noticeboard author names)
CREATE POLICY "Authenticated can read display names"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Drop the old restrictive select policy since the new one is broader
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
