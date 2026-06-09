
CREATE TABLE public.neb_festival_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  card_number int NOT NULL CHECK (card_number BETWEEN 1 AND 16),
  card_topic text NOT NULL,
  question text NOT NULL,
  answer text NOT NULL,
  name text,
  email text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.validate_neb_festival_answer()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF char_length(NEW.answer) > 2000 OR char_length(NEW.answer) < 1 THEN
    RAISE EXCEPTION 'Answer must be 1-2000 characters';
  END IF;
  IF NEW.name IS NOT NULL AND char_length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be 100 characters or fewer';
  END IF;
  IF NEW.email IS NOT NULL AND char_length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email must be 255 characters or fewer';
  END IF;
  IF char_length(NEW.card_topic) > 100 THEN
    RAISE EXCEPTION 'Topic too long';
  END IF;
  IF char_length(NEW.question) > 500 THEN
    RAISE EXCEPTION 'Question too long';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_neb_festival_answer_trigger
BEFORE INSERT OR UPDATE ON public.neb_festival_answers
FOR EACH ROW EXECUTE FUNCTION public.validate_neb_festival_answer();

GRANT INSERT ON public.neb_festival_answers TO anon, authenticated;
GRANT ALL ON public.neb_festival_answers TO service_role;

ALTER TABLE public.neb_festival_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an answer"
  ON public.neb_festival_answers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only admins can read answers"
  ON public.neb_festival_answers FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
