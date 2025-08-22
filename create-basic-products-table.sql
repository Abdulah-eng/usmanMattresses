-- Create a basic products table with essential fields only
-- Run this in your Supabase SQL editor to create the table

-- Drop the table if it exists (be careful with this in production!)
-- DROP TABLE IF EXISTS products CASCADE;

-- Create basic products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Information
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand_id UUID,
  category_id UUID,
  
  -- Pricing
  original_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  current_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  
  -- Images
  main_image TEXT NOT NULL DEFAULT '',
  
  -- Descriptions
  short_description TEXT DEFAULT '',
  long_description TEXT DEFAULT '',
  
  -- Arrays
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  
  -- Status
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  on_sale BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create basic categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create basic brands table if it doesn't exist
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some sample data
INSERT INTO categories (name, slug) VALUES 
  ('Mattresses', 'mattresses'),
  ('Beds', 'beds'),
  ('Sofas', 'sofas')
ON CONFLICT (name) DO NOTHING;

INSERT INTO brands (name) VALUES 
  ('Premium Sleep'),
  ('Comfort Plus'),
  ('Luxury Living')
ON CONFLICT (name) DO NOTHING;

-- Verify the tables were created
SELECT 'products' as table_name, COUNT(*) as row_count FROM products
UNION ALL
SELECT 'categories' as table_name, COUNT(*) as row_count FROM categories
UNION ALL
SELECT 'brands' as table_name, COUNT(*) as row_count FROM brands;
