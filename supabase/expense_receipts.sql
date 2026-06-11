create table if not exists public.expense_receipts (
  id uuid not null default gen_random_uuid(),
  data_mode text not null default 'live',
  receipt_date date not null default current_date,
  employee_name text not null,
  kind text not null,
  amount numeric(10, 2) not null,
  paid_with text not null,
  remark text,
  photo_path text,
  photo_mime_type text,
  photo_size_bytes integer,
  status text not null default 'new',
  admin_note text,
  status_updated_at timestamptz,
  status_updated_by text,
  deleted_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  primary key (id),
  constraint expense_receipts_data_mode_check check (data_mode in ('live', 'test')),
  constraint expense_receipts_employee_name_check check (length(btrim(employee_name)) > 0),
  constraint expense_receipts_kind_check check (kind in ('fuel', 'supermarket', 'bakery_purchase', 'other')),
  constraint expense_receipts_amount_check check (amount >= 0),
  constraint expense_receipts_paid_with_check check (paid_with in ('employee_advance', 'business_account', 'cash', 'other')),
  constraint expense_receipts_photo_size_bytes_check check (photo_size_bytes is null or photo_size_bytes >= 0),
  constraint expense_receipts_status_check check (status in ('new', 'approved', 'rejected', 'processed'))
);

create index if not exists expense_receipts_data_mode_receipt_date_idx
  on public.expense_receipts (data_mode, receipt_date desc);

create index if not exists expense_receipts_data_mode_status_idx
  on public.expense_receipts (data_mode, status);

create index if not exists expense_receipts_data_mode_employee_name_idx
  on public.expense_receipts (data_mode, employee_name);

create index if not exists expense_receipts_deleted_at_idx
  on public.expense_receipts (deleted_at);

create or replace function public.set_expense_receipts_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_expense_receipts_updated_at on public.expense_receipts;

create trigger set_expense_receipts_updated_at
before update on public.expense_receipts
for each row
execute function public.set_expense_receipts_updated_at();

alter table public.expense_receipts enable row level security;

drop policy if exists "expense_receipts_service_role_all" on public.expense_receipts;

create policy "expense_receipts_service_role_all"
  on public.expense_receipts
  for all
  to service_role
  using (true)
  with check (true);

comment on table public.expense_receipts is
  'Centrale opslag voor ingediende bonnen en zakelijke kosten. Foto-opslag volgt later via private Supabase Storage; frontend gebruikt deze tabel alleen via service-role Vercel API.';
