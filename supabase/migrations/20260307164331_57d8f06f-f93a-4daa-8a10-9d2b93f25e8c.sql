-- Drop old personality columns
ALTER TABLE public.personality_results
  DROP COLUMN IF EXISTS dim_a,
  DROP COLUMN IF EXISTS dim_b,
  DROP COLUMN IF EXISTS dim_c,
  DROP COLUMN IF EXISTS dim_d,
  DROP COLUMN IF EXISTS type_code;

-- Add OCEAN columns
ALTER TABLE public.personality_results
  ADD COLUMN ocean_o decimal(3,2),
  ADD COLUMN ocean_c decimal(3,2),
  ADD COLUMN ocean_e decimal(3,2),
  ADD COLUMN ocean_a decimal(3,2),
  ADD COLUMN ocean_n decimal(3,2);