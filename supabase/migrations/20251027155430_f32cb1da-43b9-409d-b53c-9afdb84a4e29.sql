-- Create table for join submissions
CREATE TABLE public.join_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  interest TEXT
);

-- Enable Row Level Security
ALTER TABLE public.join_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit (INSERT)
CREATE POLICY "Anyone can submit join requests"
ON public.join_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Prevent public read access
CREATE POLICY "No public read access to join submissions"
ON public.join_submissions
FOR SELECT
TO anon, authenticated
USING (false);