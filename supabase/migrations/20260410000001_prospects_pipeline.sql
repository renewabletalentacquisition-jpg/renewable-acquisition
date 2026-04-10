create table if not exists public.prospects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  -- Identity
  username text,
  full_name text,
  platform text default 'instagram',
  profile_url text,
  avatar_url text,

  -- Contact
  phone text,
  email text,
  location text,

  -- Pipeline stage
  stage text default 'scraped' check (stage in ('scraped','qualified','messaged','replied','interview_scheduled','hired','rejected')),
  stage_updated_at timestamptz default now(),

  -- Metadata
  bio text,
  scraped_from text,
  notes text,
  score integer default 0,
  signals text,
  message_sent text,
  message_sent_at timestamptz,
  interview_date timestamptz
);

alter table public.prospects enable row level security;

create policy "anon can insert prospects" on public.prospects
  for insert to anon with check (true);

create policy "service role full access on prospects" on public.prospects
  for all to service_role using (true);

create index if not exists prospects_stage_idx on public.prospects (stage);
create index if not exists prospects_created_at_idx on public.prospects (created_at desc);
