-- Create rate limiting table to prevent abuse of public endpoints
CREATE TABLE IF NOT EXISTS public.rate_limit_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  endpoint text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on rate limiting table
ALTER TABLE public.rate_limit_tracking ENABLE ROW LEVEL SECURITY;

-- Create index for faster lookups
CREATE INDEX idx_rate_limit_tracking_ip_endpoint_created 
ON public.rate_limit_tracking(ip_address, endpoint, created_at DESC);

-- No public access - only edge functions should access this
CREATE POLICY "No public access to rate limiting"
ON public.rate_limit_tracking
FOR ALL
USING (false);