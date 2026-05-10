create table if not exists public.sonicite_contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  role text,
  message text not null,
  locale text not null default 'zh',
  source text not null default 'website',
  created_at timestamptz not null default now()
);

create index if not exists sonicite_contact_messages_created_at_idx
  on public.sonicite_contact_messages (created_at desc);

alter table public.sonicite_contact_messages enable row level security;
