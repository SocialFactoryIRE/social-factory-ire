
-- Fix security definer view by setting it to invoker
ALTER VIEW public.profile_display SET (security_invoker = on);
