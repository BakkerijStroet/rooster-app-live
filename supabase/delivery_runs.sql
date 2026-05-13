create table if not exists public.delivery_runs (
  id uuid not null default gen_random_uuid(),
  data_mode text not null default 'live',
  source_filename text not null,
  source_hash text not null,
  payload jsonb not null default '{}'::jsonb,
  deleted_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  primary key (id),
  constraint delivery_runs_data_mode_check check (data_mode in ('live', 'test')),
  constraint delivery_runs_source_filename_check check (length(btrim(source_filename)) > 0),
  constraint delivery_runs_source_hash_check check (length(btrim(source_hash)) > 0),
  constraint delivery_runs_data_mode_source_hash_key unique (data_mode, source_hash)
);

create index if not exists delivery_runs_data_mode_created_at_idx
  on public.delivery_runs (data_mode, created_at desc);

create index if not exists delivery_runs_data_mode_updated_at_idx
  on public.delivery_runs (data_mode, updated_at desc);

create index if not exists delivery_runs_deleted_at_idx
  on public.delivery_runs (deleted_at);

create or replace function public.set_delivery_runs_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_delivery_runs_updated_at on public.delivery_runs;

create trigger set_delivery_runs_updated_at
before update on public.delivery_runs
for each row
execute function public.set_delivery_runs_updated_at();

alter table public.delivery_runs enable row level security;

drop policy if exists "delivery_runs_service_role_all" on public.delivery_runs;

create policy "delivery_runs_service_role_all"
  on public.delivery_runs
  for all
  to service_role
  using (true)
  with check (true);

comment on table public.delivery_runs is
  'Centrale opslag voor bezorgrun-snapshots. Verwijderen gebruikt deleted_at tombstones; geen harde deletes. Frontend gebruikt deze tabel alleen via service-role Vercel API.';
