create table if not exists public.work_logs (
  data_mode text not null default 'live',
  id text not null,
  employee_name text not null default '',
  day date,
  shift_name text not null default '',
  status text not null default 'draft',
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  primary key (data_mode, id)
);

create index if not exists work_logs_data_mode_day_idx
  on public.work_logs (data_mode, day);

create index if not exists work_logs_employee_name_idx
  on public.work_logs (employee_name);

create index if not exists work_logs_status_idx
  on public.work_logs (status);

alter table public.work_logs enable row level security;

comment on table public.work_logs is
  'Centrale opslag voor urenregistraties uit localStorage-key urenrooster-work-logs. De Vercel API gebruikt de Supabase service role; clients lezen/schrijven niet direct.';
