create table if not exists public.request_data (
  data_mode text not null default 'live',
  request_type text not null,
  id text not null,
  employee_name text not null default '',
  status text not null default 'open',
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  primary key (data_mode, request_type, id)
);

create index if not exists request_data_data_mode_type_idx
  on public.request_data (data_mode, request_type);

create index if not exists request_data_employee_name_idx
  on public.request_data (employee_name);

create index if not exists request_data_status_idx
  on public.request_data (status);

alter table public.request_data enable row level security;

comment on table public.request_data is
  'Centrale upsert-only opslag voor verlof- en ruilverzoeken. Delete-sync/intrekken wordt later apart en expliciet opgelost.';
