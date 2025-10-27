-- Create newsletter_signups table
CREATE TABLE public.newsletter_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert
CREATE POLICY "Anyone can submit newsletter signups"
ON public.newsletter_signups
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to prevent public reads
CREATE POLICY "No public read access to newsletter signups"
ON public.newsletter_signups
FOR SELECT
TO anon
USING (false);