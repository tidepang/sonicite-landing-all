create table if not exists public.sonicite_blog_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  date_text text not null,
  read_time text not null,
  image text not null default '/images/sonicite-product.jpg',
  summary text not null default '',
  body jsonb not null default '[]'::jsonb,
  docx_url text,
  docx_object_key text,
  docx_file_name text,
  is_published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists sonicite_blog_articles_published_sort_idx
  on public.sonicite_blog_articles (is_published, sort_order);

alter table public.sonicite_blog_articles enable row level security;

drop policy if exists "Public can read published Sonicite blog articles" on public.sonicite_blog_articles;
create policy "Public can read published Sonicite blog articles"
  on public.sonicite_blog_articles
  for select
  using (is_published = true);
