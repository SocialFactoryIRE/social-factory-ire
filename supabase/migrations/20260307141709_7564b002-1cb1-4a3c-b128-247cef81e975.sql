
-- 1. personality_results
CREATE TABLE public.personality_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  dim_a int,
  dim_b int,
  dim_c int,
  dim_d int,
  type_code text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.personality_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can select own results" ON public.personality_results FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own results" ON public.personality_results FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own results" ON public.personality_results FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- 2. communities
CREATE TABLE public.communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  suited_types text[],
  tags text[],
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can read communities" ON public.communities FOR SELECT TO authenticated USING (true);

-- 3. community_members
CREATE TABLE public.community_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id uuid NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member',
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(community_id, user_id)
);
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can select own community memberships" ON public.community_members FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own community memberships" ON public.community_members FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Seed communities
INSERT INTO public.communities (name, description, suited_types, tags) VALUES
  ('Connectors', 'For those who thrive on building relationships and bringing people together.', ARRAY['OAFS','OARS'], ARRAY['social','networking','community']),
  ('Thinkers', 'For analytical minds who love deep reflection and structured problem-solving.', ARRAY['ICRS','ICFS'], ARRAY['analysis','strategy','research']),
  ('Builders', 'For hands-on doers who turn ideas into reality through action.', ARRAY['OCRS','OCXS'], ARRAY['projects','making','innovation']),
  ('Dreamers', 'For creative visionaries who imagine new possibilities and inspire change.', ARRAY['IAXS','IAFS'], ARRAY['creativity','vision','arts']);
