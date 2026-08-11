create extension if not exists pgcrypto;

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null check (char_length(first_name) between 1 and 15),
  last_name text not null check (char_length(last_name) between 1 and 15),
  email text not null check (char_length(email) <= 320),
  phone text not null check (char_length(phone) between 7 and 40),
  state text not null check (char_length(state) between 2 and 32),
  company text not null check (char_length(company) between 1 and 40),
  industry text,
  assistance text not null,
  help text not null check (char_length(help) between 1 and 500),
  project_type text not null,
  timeline text not null,
  description text not null check (char_length(description) between 1 and 1500),
  source_page text not null default '/contact',
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  viewed boolean not null default false,
  viewed_at timestamptz,
  notification_sent boolean not null default false,
  sheet_synced boolean not null default false
);

create index inquiries_created_at_idx on public.inquiries (created_at desc);
create index inquiries_status_created_at_idx on public.inquiries (status, created_at desc);
create index inquiries_email_created_at_idx on public.inquiries (email, created_at desc);

alter table public.inquiries enable row level security;

revoke all on public.inquiries from anon, authenticated;
grant all on public.inquiries to service_role;
