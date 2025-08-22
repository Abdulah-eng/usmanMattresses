-- Orders schema (run in Supabase SQL editor)

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Orders table
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  customer_email text,
  customer_name text,
  status text not null default 'pending', -- pending | processing | completed | cancelled
  total_amount numeric(10,2) not null default 0,
  currency text not null default 'GBP',
  shipping_address jsonb,
  billing_address jsonb,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Order items table
create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text,
  product_image text,
  quantity integer not null default 1,
  unit_price numeric(10,2) not null default 0,
  total_price numeric(10,2) generated always as (quantity * unit_price) stored
);

-- Indexes
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_order_items_order_id on public.order_items(order_id);

-- RLS
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Policies: Public read (optional) and admin full access
do $$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'orders' and policyname = 'Public read orders'
  ) then
    create policy "Public read orders" on public.orders for select using (true);
  end if;
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'order_items' and policyname = 'Public read order_items'
  ) then
    create policy "Public read order_items" on public.order_items for select using (true);
  end if;
end $$;

-- Optionally, restrict writes to authenticated/admin users depending on your auth setup

