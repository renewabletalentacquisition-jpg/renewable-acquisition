CREATE TABLE IF NOT EXISTS public.applicants (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  first_name text,
  last_name text,
  email text,
  phone text,
  city text,
  start_timing text,
  commission_only text,
  door_to_door text,
  relocate text,
  team_housing text,
  background text[],
  coachable text,
  financial_stability text,
  score int,
  outcome text
);

ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'service role full access' AND tablename = 'applicants'
  ) THEN
    EXECUTE 'CREATE POLICY "service role full access" ON public.applicants FOR ALL USING (true) WITH CHECK (true)';
  END IF;
END
$$;
