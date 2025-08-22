-- Setup promos table for storing promotional content
-- Run this in your Supabase SQL editor to create the promos table

-- Create promos table if it doesn't exist
CREATE TABLE IF NOT EXISTS promos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  title TEXT,
  description TEXT,
  media_type TEXT CHECK (media_type IN ('image', 'video')) DEFAULT 'image',
  media_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on key for faster lookups
CREATE INDEX IF NOT EXISTS idx_promos_key ON promos(key);

-- Create index on is_active for filtering
CREATE INDEX IF NOT EXISTS idx_promos_active ON promos(is_active);

-- Insert default mattress finder promo if it doesn't exist
INSERT INTO promos (key, title, description, media_type, media_url, is_active) 
VALUES (
  'mattress_finder',
  'Find Your Perfect Mattress in Minutes',
  'Our smart Mattress Finder makes shopping simple — answer a few quick questions and instantly discover the best mattress for your comfort, support, and sleep style. Whether you need an orthopaedic mattress, memory foam, or luxury hybrid, we''ll match you with the ideal choice — tailored just for you.',
  'image',
  '/sofa.jpeg',
  true
) ON CONFLICT (key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  media_type = EXCLUDED.media_type,
  media_url = EXCLUDED.media_url,
  updated_at = NOW();

-- Verify the table was created
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'promos'
ORDER BY ordinal_position;

-- Verify the default promo was inserted
SELECT * FROM promos WHERE key = 'mattress_finder';

