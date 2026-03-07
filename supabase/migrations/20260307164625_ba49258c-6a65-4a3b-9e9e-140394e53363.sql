-- Create culture_results table
CREATE TABLE public.culture_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  scores jsonb NOT NULL DEFAULT '{}',
  top_values text[] DEFAULT '{}',
  completed_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.culture_results ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read own culture result"
ON public.culture_results FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own culture result"
ON public.culture_results FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own culture result"
ON public.culture_results FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());