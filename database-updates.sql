-- Database updates for product form changes
-- Run this in your Supabase SQL editor to update the products table

-- Remove hero-related columns from products table
ALTER TABLE products 
DROP COLUMN IF EXISTS hero_small_images,
DROP COLUMN IF EXISTS hero_big_images,
DROP COLUMN IF EXISTS below_hero_sections;

-- Update description_images column to description_sections (if it exists)
-- First, check if the column exists and then convert it properly
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'description_images'
    ) THEN
        -- Add a new JSONB column
        ALTER TABLE products ADD COLUMN description_sections_new JSONB DEFAULT '[]'::jsonb;
        
        -- Update the new column with converted data
        UPDATE products 
        SET description_sections_new = (
            SELECT jsonb_agg(
                jsonb_build_object(
                    'title', '',
                    'content', '',
                    'image', COALESCE(description_images[i], '')
                )
            )
            FROM generate_series(1, array_length(description_images, 1)) AS i
            WHERE array_length(description_images, 1) IS NOT NULL
        );
        
        -- Update NULL values to empty array
        UPDATE products 
        SET description_sections_new = '[]'::jsonb 
        WHERE description_sections_new IS NULL;
        
        -- Drop the old column and rename the new one
        ALTER TABLE products DROP COLUMN description_images;
        ALTER TABLE products RENAME COLUMN description_sections_new TO description_sections;
    END IF;
END $$;

-- If description_sections column doesn't exist, add it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'description_sections'
    ) THEN
        ALTER TABLE products ADD COLUMN description_sections JSONB DEFAULT '[]'::jsonb;
    END IF;
END $$;

-- Ensure dimensions column exists and has the right structure
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'dimensions'
    ) THEN
        -- Add dimensions column as JSONB
        ALTER TABLE products ADD COLUMN dimensions JSONB DEFAULT '{}'::jsonb;
    ELSE
        -- If dimensions column exists but is not JSONB, convert it
        IF (SELECT data_type FROM information_schema.columns 
            WHERE table_name = 'products' AND column_name = 'dimensions') != 'jsonb' THEN
            ALTER TABLE products ALTER COLUMN dimensions TYPE JSONB USING 
            CASE 
                WHEN dimensions IS NULL THEN '{}'::jsonb
                ELSE dimensions::jsonb
            END;
        END IF;
    END IF;
END $$;

-- Verify the changes
SELECT 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
AND column_name IN ('description_sections', 'dimensions')
ORDER BY column_name;
