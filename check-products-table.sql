-- Check the actual structure of the products table
-- Run this in your Supabase SQL editor to see what columns exist

-- Check if products table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'products'
) as table_exists;

-- If table exists, show its structure
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'products'
ORDER BY ordinal_position;

-- Check if categories table exists and has data
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'categories'
) as categories_table_exists;

-- If categories table exists, show its data
SELECT * FROM categories LIMIT 5;

-- Check if brands table exists and has data
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'brands'
) as brands_table_exists;

-- If brands table exists, show its data
SELECT * FROM brands LIMIT 5;
