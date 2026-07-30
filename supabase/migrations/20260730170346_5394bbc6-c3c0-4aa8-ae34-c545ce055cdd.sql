DROP POLICY IF EXISTS "Anyone can submit contact messages" ON public.contacts;
CREATE POLICY "Anyone can submit contact messages"
ON public.contacts FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND char_length(subject) BETWEEN 1 AND 200
  AND char_length(message) BETWEEN 1 AND 5000
);

DROP POLICY IF EXISTS "Anyone can submit newsletter signups" ON public.newsletter_signups;
CREATE POLICY "Anyone can submit newsletter signups"
ON public.newsletter_signups FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(email) BETWEEN 3 AND 255
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);