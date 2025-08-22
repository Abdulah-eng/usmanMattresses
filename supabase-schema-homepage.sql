-- Homepage Sections Schema (run in Supabase SQL editor)
create extension if not exists "uuid-ossp";

create table if not exists public.homepage_sections (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  title text,
  subtitle text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.homepage_section_items (
  id uuid primary key default uuid_generate_v4(),
  section_id uuid not null references public.homepage_sections(id) on delete cascade,
  title text,
  subtitle text,
  content text,
  image text,
  href text,
  category text,
  read_time text,
  badge text,
  rating numeric,
  price numeric,
  original_price numeric,
  discount_label text,
  is_featured boolean default false,
  position int default 0,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.homepage_sections enable row level security;
alter table public.homepage_section_items enable row level security;

-- Policies (idempotent)
do $$ begin
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='homepage_sections' and policyname='hs_select_public') then
    create policy hs_select_public on public.homepage_sections for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='homepage_sections' and policyname='hs_all_auth') then
    create policy hs_all_auth on public.homepage_sections for all using (auth.role() = 'authenticated');
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='homepage_section_items' and policyname='hsi_select_public') then
    create policy hsi_select_public on public.homepage_section_items for select using (true);
  end if;
  if not exists (select 1 from pg_policies where schemaname='public' and tablename='homepage_section_items' and policyname='hsi_all_auth') then
    create policy hsi_all_auth on public.homepage_section_items for all using (auth.role() = 'authenticated');
  end if;
end $$;

-- Indexes
create index if not exists idx_hsi_section on public.homepage_section_items(section_id);
create index if not exists idx_hsi_position on public.homepage_section_items(position);

-- Seed all homepage sections (safe)
insert into public.homepage_sections (key, title, subtitle, is_active) values
('hero_section', 'Hero Section', 'Main banner and category navigation', true),
('featured_products', 'Featured Products', 'Product showcase section', true),
('category_filter_cards', 'Category Filter Cards', 'Category navigation cards', true),
('mattress_finder_promo', 'Mattress Finder Promo', 'Mattress quiz promotion', true),
('mattress_types', 'Our Mattress Types', 'Different mattress categories', true),
('deal_of_the_day', 'Deal of the Day', 'Special offers and deals', true),
('customer_gallery', 'Customer Gallery', 'Customer photos and reviews', true),
('ideas_guides', 'Ideas & Guides', 'Helpful articles and tips', true),
('sofa_types', 'Our Sofa Types', 'Different sofa categories', true),
('trending_section', 'Trending Section', 'Popular and trending items', true),
('category_grid', 'Category Grid', 'Main category navigation', true),
('review_section', 'Review Section', 'Customer testimonials', true)
on conflict (key) do update set 
  title = excluded.title,
  subtitle = excluded.subtitle,
  is_active = excluded.is_active,
  updated_at = now();

-- Add some sample items for key sections
insert into public.homepage_section_items (section_id, title, subtitle, content, image, href, category, position) 
select 
  hs.id,
  'Memory Foam Mattress',
  'Ultimate comfort and support',
  'Experience the perfect balance of softness and support with our premium memory foam mattresses.',
  '/hello.jpeg',
  '/mattresses',
  'Mattresses',
  0
from public.homepage_sections hs where hs.key = 'mattress_types'
on conflict do nothing;

insert into public.homepage_section_items (section_id, title, subtitle, content, image, href, category, position) 
select 
  hs.id,
  'L-Shaped Sectional',
  'Modern living room centerpiece',
  'Transform your living space with our stylish and comfortable L-shaped sectional sofas.',
  '/sofa.jpeg',
  '/sofas',
  'Sofas',
  0
from public.homepage_sections hs where hs.key = 'sofa_types'
on conflict do nothing;

insert into public.homepage_section_items (section_id, title, subtitle, content, image, href, category, position) 
select 
  hs.id,
  'Special Offer',
  'Limited time deal',
  'Get up to 40% off on selected mattresses this week only.',
  '/bedcollect.jpeg',
  '/sale',
  'Sale',
  0
from public.homepage_sections hs where hs.key = 'deal_of_the_day'
on conflict do nothing;
