
-- The profiles table already has county and town columns but we need country and city
-- county/town are for Irish local context; country/city are for global registration

-- Note: profiles already has 'county' and 'town' columns, so we just need to ensure
-- we use those or add new ones. Looking at the schema, county/town exist but are for 
-- Irish context. We'll repurpose them or add country/city.
-- Actually the plan says add country and city columns. Profiles already has county and town
-- but those are different. Let's add country and city.

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS country text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city text;

-- Update the handle_new_user trigger to store country and city from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, country, city)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    NEW.raw_user_meta_data->>'country',
    NEW.raw_user_meta_data->>'city'
  );
  RETURN NEW;
END;
$$;

-- Create aggregation function for homepage display
CREATE OR REPLACE FUNCTION public.get_member_locations()
RETURNS TABLE(country text, city text, member_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT p.country, p.city, COUNT(*) as member_count
  FROM public.profiles p
  WHERE p.country IS NOT NULL AND p.city IS NOT NULL
  GROUP BY p.country, p.city
  ORDER BY member_count DESC;
$$;
