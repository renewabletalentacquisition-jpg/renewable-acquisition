alter table public.prospects
  add column if not exists qualification_checks jsonb default '{}'::jsonb,
  add column if not exists qualified_at timestamptz,
  add column if not exists rejected_at timestamptz;
