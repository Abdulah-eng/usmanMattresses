-- Migration script to add missing columns to products table
-- Run this in your Supabase SQL editor to update your existing products table

-- Add missing columns to products table
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS size TEXT,
ADD COLUMN IF NOT EXISTS material TEXT,
ADD COLUMN IF NOT EXISTS color TEXT,
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Update existing products to have default values for new columns
UPDATE products 
SET 
  size = COALESCE(size, ''),
  material = COALESCE(material, ''),
  color = COALESCE(color, ''),
  featured = COALESCE(featured, false)
WHERE size IS NULL OR material IS NULL OR color IS NULL OR featured IS NULL;

-- Create index for featured column for better performance
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

-- Verify the changes
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;
