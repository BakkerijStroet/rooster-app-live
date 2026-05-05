create table if not exists public.planning_entries (
  data_mode text not null default 'live',
  id text not null,
  employee_name text not null default '',
  day date,
  shift_name text not null default '',
  start_time text not null default '',
  end_time text not null default '',
  payload jsonb not null,
  deleted_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  primary key (data_mode, id)
);

create index if not exists planning_entries_data_mode_day_idx
  on public.planning_entries (data_mode, day);

create index if not exists planning_entries_employee_name_idx
  on public.planning_entries (employee_name);

create index if not exists planning_entries_deleted_at_idx
  on public.planning_entries (deleted_at);

alter table public.planning_entries enable row level security;

comment on table public.planning_entries is
  'Centrale opslag voor roosterregels uit localStorage-key urenrooster-entries. Verwijderen gebruikt deleted_at tombstones; geen harde deletes.';
