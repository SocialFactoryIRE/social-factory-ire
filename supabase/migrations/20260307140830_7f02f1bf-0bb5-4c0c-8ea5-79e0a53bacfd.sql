
-- 1. town_halls
CREATE TABLE public.town_halls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL DEFAULT 'Ireland',
  region text,
  county text,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.town_halls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read town_halls" ON public.town_halls FOR SELECT TO authenticated USING (true);

-- 2. local_chapters
CREATE TABLE public.local_chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  town_hall_id uuid REFERENCES public.town_halls(id),
  name text NOT NULL,
  county text NOT NULL,
  town text,
  is_active boolean NOT NULL DEFAULT true
);
ALTER TABLE public.local_chapters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read local_chapters" ON public.local_chapters FOR SELECT TO authenticated USING (true);

-- 3. chapter_members
CREATE TABLE public.chapter_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid NOT NULL REFERENCES public.local_chapters(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'member',
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(chapter_id, user_id)
);
ALTER TABLE public.chapter_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can select own memberships" ON public.chapter_members FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can insert own memberships" ON public.chapter_members FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- 4. noticeboard_posts
CREATE TABLE public.noticeboard_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chapter_id uuid REFERENCES public.local_chapters(id) ON DELETE SET NULL,
  title text NOT NULL,
  body text,
  category text NOT NULL DEFAULT 'general',
  is_pinned boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.noticeboard_posts ENABLE ROW LEVEL SECURITY;

-- Security definer function to check chapter membership
CREATE OR REPLACE FUNCTION public.is_chapter_member(_user_id uuid, _chapter_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.chapter_members
    WHERE user_id = _user_id AND chapter_id = _chapter_id
  )
$$;

-- Noticeboard RLS
CREATE POLICY "Authenticated can read global posts" ON public.noticeboard_posts FOR SELECT TO authenticated USING (chapter_id IS NULL);
CREATE POLICY "Chapter members can read chapter posts" ON public.noticeboard_posts FOR SELECT TO authenticated USING (chapter_id IS NOT NULL AND public.is_chapter_member(auth.uid(), chapter_id));
CREATE POLICY "Authors can insert own posts" ON public.noticeboard_posts FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "Authors can update own posts" ON public.noticeboard_posts FOR UPDATE TO authenticated USING (author_id = auth.uid()) WITH CHECK (author_id = auth.uid());
CREATE POLICY "Authors can delete own posts" ON public.noticeboard_posts FOR DELETE TO authenticated USING (author_id = auth.uid());

-- Seed data
INSERT INTO public.town_halls (id, name, country) VALUES ('a0000000-0000-0000-0000-000000000001', 'Social Factory Ireland', 'Ireland');
INSERT INTO public.local_chapters (town_hall_id, name, county) VALUES ('a0000000-0000-0000-0000-000000000001', 'Limerick', 'Limerick');
INSERT INTO public.local_chapters (town_hall_id, name, county) VALUES ('a0000000-0000-0000-0000-000000000001', 'Dublin', 'Dublin');
