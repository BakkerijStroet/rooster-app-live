create table if not exists public.employee_data (
  data_mode text not null default 'live',
  data_key text not null,
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  primary key (data_mode, data_key)
);

create index if not exists employee_data_data_mode_idx
  on public.employee_data (data_mode);

alter table public.employee_data enable row level security;

comment on table public.employee_data is
  'Centrale opslag voor medewerkerlijst, medewerker-meta en bevoegdheden. De Vercel API gebruikt de Supabase service role; clients lezen/schrijven niet direct.';
