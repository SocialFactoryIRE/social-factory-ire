
-- 1. Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- 2. Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Helper: check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role IN ('admin', 'editor')
  )
$$;

-- RLS for user_roles: only admins can read/manage
CREATE POLICY "Admins can read all roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 4. admin_leads table
CREATE TABLE public.admin_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_leads ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.validate_admin_lead_status()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status NOT IN ('new', 'contacted', 'closed') THEN
    RAISE EXCEPTION 'Invalid lead status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_validate_admin_lead_status BEFORE INSERT OR UPDATE ON public.admin_leads
  FOR EACH ROW EXECUTE FUNCTION public.validate_admin_lead_status();

CREATE POLICY "Admins/editors can read leads" ON public.admin_leads
  FOR SELECT TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can insert leads" ON public.admin_leads
  FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update leads" ON public.admin_leads
  FOR UPDATE TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins can delete leads" ON public.admin_leads
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 5. cms_pages table
CREATE TABLE public.cms_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text DEFAULT '',
  seo_title text,
  seo_description text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins/editors can read pages" ON public.cms_pages
  FOR SELECT TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can insert pages" ON public.cms_pages
  FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update pages" ON public.cms_pages
  FOR UPDATE TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins can delete pages" ON public.cms_pages
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 6. blog_posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text DEFAULT '',
  featured_image text,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins/editors can read blog posts" ON public.blog_posts
  FOR SELECT TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can insert blog posts" ON public.blog_posts
  FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can update blog posts" ON public.blog_posts
  FOR UPDATE TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins can delete blog posts" ON public.blog_posts
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 7. media_files table
CREATE TABLE public.media_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  filename text NOT NULL,
  type text DEFAULT 'image',
  uploaded_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins/editors can read media" ON public.media_files
  FOR SELECT TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins/editors can insert media" ON public.media_files
  FOR INSERT TO authenticated WITH CHECK (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins can delete media" ON public.media_files
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 8. site_settings table (single row)
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name text DEFAULT 'Social Factory',
  contact_email text,
  instagram_url text,
  linkedin_url text,
  analytics_id text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins/editors can read settings" ON public.site_settings
  FOR SELECT TO authenticated USING (public.is_admin_or_editor(auth.uid()));
CREATE POLICY "Admins can update settings" ON public.site_settings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Insert default settings row
INSERT INTO public.site_settings (site_name, contact_email) VALUES ('Social Factory', 'hello@socialfactory.ie');

-- 9. Create media storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Admins/editors can upload media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'media' AND public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Anyone can read media" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'media');

CREATE POLICY "Admins can delete media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
