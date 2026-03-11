

## Plan: Country/City Registration + Homepage Member Map

### Overview

Add country and city dropdown fields to the registration form, store them in the profiles table, and display a visual summary of where members have signed up from at the bottom of the homepage.

---

### Part 1: Registration Form -- Country & City Dropdowns

**Data approach**: Use a static JSON file containing countries and their major cities (top 10-20 per country). This avoids external API dependencies and keeps the experience fast. The file will cover all countries with their largest cities.

- Create `src/data/countries-cities.ts` -- a typed constant exporting an array of `{ country: string, cities: string[] }` objects
- Add two new Select dropdowns to `Register.tsx` between the Display Name and Email fields:
  - **Country** dropdown (required) -- selecting a country populates the City dropdown
  - **City** dropdown (required) -- filtered by selected country
- Update the Zod schema to validate `country` and `city`
- Save country/city to `user_metadata` during signup, and update the `profiles` table

**Database change**: Add `country` and `city` columns to the `profiles` table (both nullable text, since existing users won't have them). Update the `handle_new_user` trigger to also store country/city from `raw_user_meta_data`.

```sql
ALTER TABLE public.profiles ADD COLUMN country text;
ALTER TABLE public.profiles ADD COLUMN city text;
```

Update the trigger:
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
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
```

---

### Part 2: Homepage Member Map / Summary

Add a new section near the bottom of the homepage (before the Newsletter CTA) showing where members are from.

**Data access**: Create a database function that returns aggregated, anonymous signup counts by country and city -- no personal data exposed. This avoids any RLS issues since profiles are user-only readable.

```sql
CREATE FUNCTION public.get_member_locations()
RETURNS TABLE(country text, city text, member_count bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public'
AS $$
  SELECT country, city, COUNT(*) as member_count
  FROM public.profiles
  WHERE country IS NOT NULL AND city IS NOT NULL
  GROUP BY country, city
  ORDER BY member_count DESC;
$$;
```

**UI component**: A new `MemberMapSection` component on the homepage showing:
- A heading like "Our Global Community"
- Country cards/badges showing member counts, grouped by country
- Cities listed under each country with their counts
- Styled with the existing brand colors (coral, sky, mint, accent)

This keeps it simple and visually appealing without requiring an actual map library. If you'd prefer an interactive map (e.g., with pins on a world map), that's an option but adds complexity.

---

### Summary of Changes

| Area | Change |
|------|--------|
| Database | Add `country` and `city` columns to `profiles`; update `handle_new_user` trigger; add `get_member_locations()` function |
| `src/data/countries-cities.ts` | Static data file with countries and their major cities |
| `src/pages/Register.tsx` | Add country and city Select dropdowns; pass to signup metadata and profile update |
| `src/components/MemberMapSection.tsx` | New component showing aggregated member locations |
| `src/pages/Index.tsx` | Add `MemberMapSection` before the Newsletter section |

