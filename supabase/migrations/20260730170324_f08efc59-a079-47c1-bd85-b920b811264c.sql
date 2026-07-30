-- 1. Public read for published blog posts and CMS pages
CREATE POLICY "Public can read published blog posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (published = true);

GRANT SELECT ON public.blog_posts TO anon;

CREATE POLICY "Public can read cms pages"
ON public.cms_pages FOR SELECT
TO anon, authenticated
USING (true);

GRANT SELECT ON public.cms_pages TO anon;

-- 2. Revoke EXECUTE on internal SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.email_queue_dispatch() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.email_queue_wake() FROM anon, authenticated;

-- Member data lookups require authentication
REVOKE EXECUTE ON FUNCTION public.get_member_locations() FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_display_names(uuid[]) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_proposal_vote_counts(uuid[]) FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_all_users_for_admin() FROM anon;

-- 3. Storage: keep public URL access, stop bucket listing
DROP POLICY IF EXISTS "Public read access to avatars" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read media" ON storage.objects;

CREATE POLICY "Users can list own avatars"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Admins and editors can list media"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'media' AND public.is_admin_or_editor(auth.uid()));

-- 4. Replace always-true INSERT checks with real validation
DROP POLICY IF EXISTS "Anyone can submit join requests" ON public.join_submissions;
CREATE POLICY "Anyone can submit join requests"
ON public.join_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND (interest IS NULL OR char_length(interest) <= 2000)
);

DROP POLICY IF EXISTS "Anyone can submit an answer" ON public.neb_festival_answers;
CREATE POLICY "Anyone can submit an answer"
ON public.neb_festival_answers FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(answer) BETWEEN 1 AND 2000
  AND char_length(card_topic) <= 100
  AND char_length(question) <= 500
  AND (name IS NULL OR char_length(name) <= 100)
  AND (email IS NULL OR (char_length(email) <= 255 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'))
);