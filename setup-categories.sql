-- Setup required categories for Shop by Comfort & Support section
-- Run this in your Supabase SQL editor to ensure all categories exist

-- Insert categories if they don't exist
INSERT INTO categories (name, slug, description, sort_order, is_active) 
VALUES 
  ('Special Mattresses', 'special-mattresses', 'Premium and featured mattress products', 1, true),
  ('Sale', 'sale', 'Products currently on sale', 2, true),
  ('Bed Frames', 'bed-frames', 'Bed frames and bed bases', 3, true),
  ('Mattresses', 'mattresses', 'All mattress products', 4, true),
  ('Sofa Beds', 'sofa-beds', 'Convertible sofa bed products', 5, true),
  ('BunkBeds', 'bunkbeds', 'Bunk bed and loft bed products', 6, true),
  ('Kids', 'kids', 'Children\'s furniture and bedding', 7, true)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sort_order = EXCLUDED.sort_order,
  is_active = EXCLUDED.is_active;

-- Verify categories exist
SELECT id, name, slug, sort_order, is_active 
FROM categories 
WHERE slug IN ('special-mattresses', 'sale', 'bed-frames', 'mattresses', 'sofa-beds', 'bunkbeds', 'kids')
ORDER BY sort_order;
