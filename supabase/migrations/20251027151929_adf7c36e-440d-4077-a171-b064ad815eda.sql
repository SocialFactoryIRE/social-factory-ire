-- Create contacts table for storing contact form submissions
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact messages (public form)
CREATE POLICY "Anyone can submit contact messages"
ON public.contacts
FOR INSERT
TO public
WITH CHECK (true);

-- Create policy to prevent public reading of contact messages (admin only)
-- This ensures contact messages are private and only accessible through backend
CREATE POLICY "No public read access to contacts"
ON public.contacts
FOR SELECT
TO public
USING (false);

-- Add index for better query performance on created_at
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);