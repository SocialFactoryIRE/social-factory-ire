
-- Add new columns to profiles
ALTER TABLE public.profiles
  ADD COLUMN county text,
  ADD COLUMN town text,
  ADD COLUMN open_to_connect boolean NOT NULL DEFAULT true,
  ADD COLUMN is_staff boolean NOT NULL DEFAULT false;

-- Create member_tags table
CREATE TABLE public.member_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tag text NOT NULL,
  category text NOT NULL DEFAULT 'interest',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.member_tags ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can select own tags" ON public.member_tags
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Users can insert own tags" ON public.member_tags
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own tags" ON public.member_tags
  FOR DELETE TO authenticated USING (user_id = auth.uid());
