-- Comprehensive Category-Based Database Schema for Admin Dashboard
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create storage bucket for product images if not exists
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for public access to product images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  logo TEXT,
  description TEXT,
  website TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create mattresses table
CREATE TABLE IF NOT EXISTS mattresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Information
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  
  -- Pricing
  original_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  savings DECIMAL(10,2) GENERATED ALWAYS AS (original_price - current_price) STORED,
  monthly_price DECIMAL(10,2),
  
  -- Images
  main_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  
  -- Product Details
  short_description TEXT,
  long_description TEXT,
  description_paragraph_1 TEXT,
  description_paragraph_2 TEXT,
  description_paragraph_3 TEXT,
  description_image_1 TEXT,
  description_image_2 TEXT,
  description_image_3 TEXT,
  
  -- Mattress Specific
  mattress_type TEXT, -- Memory Foam, Innerspring, Hybrid, Latex, Adjustable
  firmness_level INTEGER CHECK (firmness_level >= 1 AND firmness_level <= 10),
  firmness_description TEXT,
  firmness_scale_image TEXT,
  
  -- Marketing and Selling Points
  reasons_to_buy TEXT[] DEFAULT '{}',
  
  -- Specifications
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  materials TEXT[] DEFAULT '{}',
  
  -- Dimensions
  dimensions JSONB, -- {height, length, width, weight_capacity}
  
  -- Ratings and Reviews
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- Inventory and Status
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  on_sale BOOLEAN DEFAULT false,
  
  -- Delivery and Setup
  dispatch_time TEXT,
  setup_service BOOLEAN DEFAULT false,
  setup_cost DECIMAL(10,2),
  free_delivery BOOLEAN DEFAULT false,
  
  -- Product Questions and FAQ
  product_questions JSONB DEFAULT '[]', -- [{question, answer}]
  
  -- Warranty and Care
  warranty_info JSONB, -- {period, coverage, exclusions}
  care_instructions TEXT,
  care_image TEXT,
  
  -- Search Filters
  filter_mattress_type TEXT[] DEFAULT '{}',
  filter_firmness TEXT[] DEFAULT '{}',
  filter_sizes TEXT[] DEFAULT '{}',
  filter_features TEXT[] DEFAULT '{}',
  filter_brand TEXT[] DEFAULT '{}',
  filter_material TEXT[] DEFAULT '{}',
  filter_min_price DECIMAL(10,2) DEFAULT 0,
  filter_max_price DECIMAL(10,2) DEFAULT 2000,
  filter_in_store BOOLEAN DEFAULT false,
  filter_on_sale BOOLEAN DEFAULT false,
  
  -- SEO and Meta
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create beds table
CREATE TABLE IF NOT EXISTS beds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Information
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  
  -- Pricing
  original_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  savings DECIMAL(10,2) GENERATED ALWAYS AS (original_price - current_price) STORED,
  monthly_price DECIMAL(10,2),
  
  -- Images
  main_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  
  -- Product Details
  short_description TEXT,
  long_description TEXT,
  description_paragraph_1 TEXT,
  description_paragraph_2 TEXT,
  description_paragraph_3 TEXT,
  description_image_1 TEXT,
  description_image_2 TEXT,
  description_image_3 TEXT,
  
  -- Bed Specific
  bed_type TEXT, -- Platform Bed, Storage Bed, Canopy Bed, Four Poster, Sleigh Bed
  style TEXT, -- Modern, Traditional, Industrial, Rustic, Contemporary
  
  -- Marketing and Selling Points
  reasons_to_buy TEXT[] DEFAULT '{}',
  
  -- Specifications
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  materials TEXT[] DEFAULT '{}',
  
  -- Dimensions
  dimensions JSONB, -- {height, length, width, weight_capacity}
  
  -- Ratings and Reviews
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- Inventory and Status
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  on_sale BOOLEAN DEFAULT false,
  
  -- Delivery and Setup
  dispatch_time TEXT,
  setup_service BOOLEAN DEFAULT false,
  setup_cost DECIMAL(10,2),
  free_delivery BOOLEAN DEFAULT false,
  
  -- Product Questions and FAQ
  product_questions JSONB DEFAULT '[]', -- [{question, answer}]
  
  -- Warranty and Care
  warranty_info JSONB, -- {period, coverage, exclusions}
  care_instructions TEXT,
  care_image TEXT,
  
  -- Search Filters
  filter_bed_type TEXT[] DEFAULT '{}',
  filter_style TEXT[] DEFAULT '{}',
  filter_sizes TEXT[] DEFAULT '{}',
  filter_features TEXT[] DEFAULT '{}',
  filter_brand TEXT[] DEFAULT '{}',
  filter_material TEXT[] DEFAULT '{}',
  filter_min_price DECIMAL(10,2) DEFAULT 0,
  filter_max_price DECIMAL(10,2) DEFAULT 2000,
  filter_in_store BOOLEAN DEFAULT false,
  filter_on_sale BOOLEAN DEFAULT false,
  
  -- SEO and Meta
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sofas table
CREATE TABLE IF NOT EXISTS sofas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Information
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  
  -- Pricing
  original_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  savings DECIMAL(10,2) GENERATED ALWAYS AS (original_price - current_price) STORED,
  monthly_price DECIMAL(10,2),
  
  -- Images
  main_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  
  -- Product Details
  short_description TEXT,
  long_description TEXT,
  description_paragraph_1 TEXT,
  description_paragraph_2 TEXT,
  description_paragraph_3 TEXT,
  description_image_1 TEXT,
  description_image_2 TEXT,
  description_image_3 TEXT,
  
  -- Sofa Specific
  sofa_type TEXT, -- Sectional, Loveseat, Sleeper Sofa, Recliner, Chesterfield
  style TEXT, -- Modern, Traditional, Industrial, Rustic, Contemporary
  
  -- Marketing and Selling Points
  reasons_to_buy TEXT[] DEFAULT '{}',
  
  -- Specifications
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  materials TEXT[] DEFAULT '{}',
  
  -- Dimensions
  dimensions JSONB, -- {height, length, width, weight_capacity}
  
  -- Ratings and Reviews
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- Inventory and Status
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  on_sale BOOLEAN DEFAULT false,
  
  -- Delivery and Setup
  dispatch_time TEXT,
  setup_service BOOLEAN DEFAULT false,
  setup_cost DECIMAL(10,2),
  free_delivery BOOLEAN DEFAULT false,
  
  -- Product Questions and FAQ
  product_questions JSONB DEFAULT '[]', -- [{question, answer}]
  
  -- Warranty and Care
  warranty_info JSONB, -- {period, coverage, exclusions}
  care_instructions TEXT,
  care_image TEXT,
  
  -- Search Filters
  filter_sofa_type TEXT[] DEFAULT '{}',
  filter_style TEXT[] DEFAULT '{}',
  filter_sizes TEXT[] DEFAULT '{}',
  filter_features TEXT[] DEFAULT '{}',
  filter_brand TEXT[] DEFAULT '{}',
  filter_material TEXT[] DEFAULT '{}',
  filter_min_price DECIMAL(10,2) DEFAULT 0,
  filter_max_price DECIMAL(10,2) DEFAULT 2000,
  filter_in_store BOOLEAN DEFAULT false,
  filter_on_sale BOOLEAN DEFAULT false,
  
  -- SEO and Meta
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pillows table
CREATE TABLE IF NOT EXISTS pillows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Information
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  
  -- Pricing
  original_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  savings DECIMAL(10,2) GENERATED ALWAYS AS (original_price - current_price) STORED,
  monthly_price DECIMAL(10,2),
  
  -- Images
  main_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  
  -- Product Details
  short_description TEXT,
  long_description TEXT,
  description_paragraph_1 TEXT,
  description_paragraph_2 TEXT,
  description_paragraph_3 TEXT,
  description_image_1 TEXT,
  description_image_2 TEXT,
  description_image_3 TEXT,
  
  -- Pillow Specific
  pillow_type TEXT, -- Memory Foam, Down, Feather, Latex, Buckwheat
  firmness TEXT, -- Soft, Medium, Firm
  
  -- Marketing and Selling Points
  reasons_to_buy TEXT[] DEFAULT '{}',
  
  -- Specifications
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  materials TEXT[] DEFAULT '{}',
  
  -- Dimensions
  dimensions JSONB, -- {height, length, width, weight_capacity}
  
  -- Ratings and Reviews
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- Inventory and Status
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  on_sale BOOLEAN DEFAULT false,
  
  -- Delivery and Setup
  dispatch_time TEXT,
  setup_service BOOLEAN DEFAULT false,
  setup_cost DECIMAL(10,2),
  free_delivery BOOLEAN DEFAULT false,
  
  -- Product Questions and FAQ
  product_questions JSONB DEFAULT '[]', -- [{question, answer}]
  
  -- Warranty and Care
  warranty_info JSONB, -- {period, coverage, exclusions}
  care_instructions TEXT,
  care_image TEXT,
  
  -- Search Filters
  filter_pillow_type TEXT[] DEFAULT '{}',
  filter_firmness TEXT[] DEFAULT '{}',
  filter_sizes TEXT[] DEFAULT '{}',
  filter_features TEXT[] DEFAULT '{}',
  filter_brand TEXT[] DEFAULT '{}',
  filter_material TEXT[] DEFAULT '{}',
  filter_min_price DECIMAL(10,2) DEFAULT 0,
  filter_max_price DECIMAL(10,2) DEFAULT 2000,
  filter_in_store BOOLEAN DEFAULT false,
  filter_on_sale BOOLEAN DEFAULT false,
  
  -- SEO and Meta
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create toppers table
CREATE TABLE IF NOT EXISTS toppers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Information
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  
  -- Pricing
  original_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  savings DECIMAL(10,2) GENERATED ALWAYS AS (original_price - current_price) STORED,
  monthly_price DECIMAL(10,2),
  
  -- Images
  main_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  
  -- Product Details
  short_description TEXT,
  long_description TEXT,
  description_paragraph_1 TEXT,
  description_paragraph_2 TEXT,
  description_paragraph_3 TEXT,
  description_image_1 TEXT,
  description_image_2 TEXT,
  description_image_3 TEXT,
  
  -- Topper Specific
  topper_type TEXT, -- Memory Foam, Latex, Gel, Wool, Bamboo
  
  -- Marketing and Selling Points
  reasons_to_buy TEXT[] DEFAULT '{}',
  
  -- Specifications
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  materials TEXT[] DEFAULT '{}',
  
  -- Dimensions
  dimensions JSONB, -- {height, length, width, weight_capacity}
  
  -- Ratings and Reviews
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- Inventory and Status
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  on_sale BOOLEAN DEFAULT false,
  
  -- Delivery and Setup
  dispatch_time TEXT,
  setup_service BOOLEAN DEFAULT false,
  setup_cost DECIMAL(10,2),
  free_delivery BOOLEAN DEFAULT false,
  
  -- Product Questions and FAQ
  product_questions JSONB DEFAULT '[]', -- [{question, answer}]
  
  -- Warranty and Care
  warranty_info JSONB, -- {period, coverage, exclusions}
  care_instructions TEXT,
  care_image TEXT,
  
  -- Search Filters
  filter_topper_type TEXT[] DEFAULT '{}',
  filter_sizes TEXT[] DEFAULT '{}',
  filter_features TEXT[] DEFAULT '{}',
  filter_brand TEXT[] DEFAULT '{}',
  filter_material TEXT[] DEFAULT '{}',
  filter_min_price DECIMAL(10,2) DEFAULT 0,
  filter_max_price DECIMAL(10,2) DEFAULT 2000,
  filter_in_store BOOLEAN DEFAULT false,
  filter_on_sale BOOLEAN DEFAULT false,
  
  -- SEO and Meta
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bunkbeds table
CREATE TABLE IF NOT EXISTS bunkbeds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Information
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  
  -- Pricing
  original_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  savings DECIMAL(10,2) GENERATED ALWAYS AS (original_price - current_price) STORED,
  monthly_price DECIMAL(10,2),
  
  -- Images
  main_image TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  
  -- Product Details
  short_description TEXT,
  long_description TEXT,
  description_paragraph_1 TEXT,
  description_paragraph_2 TEXT,
  description_paragraph_3 TEXT,
  description_image_1 TEXT,
  description_image_2 TEXT,
  description_image_3 TEXT,
  
  -- Bunk Bed Specific
  bunk_bed_type TEXT, -- Standard Bunk, L-Shaped, Twin over Full, Twin over Twin, Full over Full
  
  -- Marketing and Selling Points
  reasons_to_buy TEXT[] DEFAULT '{}',
  
  -- Specifications
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  materials TEXT[] DEFAULT '{}',
  
  -- Dimensions
  dimensions JSONB, -- {height, length, width, weight_capacity}
  
  -- Ratings and Reviews
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- Inventory and Status
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  on_sale BOOLEAN DEFAULT false,
  
  -- Delivery and Setup
  dispatch_time TEXT,
  setup_service BOOLEAN DEFAULT false,
  setup_cost DECIMAL(10,2),
  free_delivery BOOLEAN DEFAULT false,
  
  -- Product Questions and FAQ
  product_questions JSONB DEFAULT '[]', -- [{question, answer}]
  
  -- Warranty and Care
  warranty_info JSONB, -- {period, coverage, exclusions}
  care_instructions TEXT,
  care_image TEXT,
  
  -- Search Filters
  filter_bunk_bed_type TEXT[] DEFAULT '{}',
  filter_sizes TEXT[] DEFAULT '{}',
  filter_features TEXT[] DEFAULT '{}',
  filter_brand TEXT[] DEFAULT '{}',
  filter_material TEXT[] DEFAULT '{}',
  filter_min_price DECIMAL(10,2) DEFAULT 0,
  filter_max_price DECIMAL(10,2) DEFAULT 2000,
  filter_in_store BOOLEAN DEFAULT false,
  filter_on_sale BOOLEAN DEFAULT false,
  
  -- SEO and Meta
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create frequently_bought_together table
CREATE TABLE IF NOT EXISTS frequently_bought_together (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL,
  product_category TEXT NOT NULL, -- mattresses, beds, sofas, etc.
  related_items JSONB DEFAULT '[]', -- [{image, name, promotionalText, discount}]
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create homepage_content table
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_key TEXT UNIQUE NOT NULL, -- mattress_types, gallery_items, sofa_types, trending_items, promotional_cards
  content JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Mattresses', 'mattresses', 'Premium comfort for better sleep', 1),
('Beds', 'beds', 'Stylish frames for every bedroom', 2),
('Sofas', 'sofas', 'Comfort meets style in your living room', 3),
('Bunk Beds', 'bunkbeds', 'Space-saving solutions for kids', 4),
('Mattress Toppers', 'toppers', 'Extra comfort for your existing mattress', 5),
('Pillows', 'pillows', 'Perfect support for your head and neck', 6),
('Bedding', 'bedding', 'Complete bedding solutions', 7),
('Adjustable Bases', 'adjustable-bases', 'Customizable sleep positions', 8),
('Box Springs', 'box-springs', 'Foundation support for mattresses', 9),
('Kids', 'kids', 'Furniture and bedding for children', 10),
('Guides', 'guides', 'Helpful guides and tips', 11)
ON CONFLICT (slug) DO NOTHING;

-- Insert default brands
INSERT INTO brands (name, description) VALUES
('ARTHUR SLEEP', 'Premium sleep solutions'),
('SILENTNIGHT', 'Trusted sleep comfort'),
('SLEEPWELL', 'Quality sleep products'),
('DREAMLAND', 'Dream sleep experience'),
('BEDORA', 'Your sleep partner')
ON CONFLICT (name) DO NOTHING;

-- Insert default homepage content
INSERT INTO homepage_content (section_key, content) VALUES
('mattress_types', '[]'),
('gallery_items', '[]'),
('sofa_types', '[]'),
('trending_items', '[]'),
('promotional_cards', '[]'),
('guides', '[]')
ON CONFLICT (section_key) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_mattresses_brand ON mattresses(brand_id);
CREATE INDEX IF NOT EXISTS idx_mattresses_featured ON mattresses(featured);
CREATE INDEX IF NOT EXISTS idx_mattresses_on_sale ON mattresses(on_sale);
CREATE INDEX IF NOT EXISTS idx_mattresses_in_stock ON mattresses(in_stock);

CREATE INDEX IF NOT EXISTS idx_beds_brand ON beds(brand_id);
CREATE INDEX IF NOT EXISTS idx_beds_featured ON beds(featured);
CREATE INDEX IF NOT EXISTS idx_beds_on_sale ON beds(on_sale);
CREATE INDEX IF NOT EXISTS idx_beds_in_stock ON beds(in_stock);

CREATE INDEX IF NOT EXISTS idx_sofas_brand ON sofas(brand_id);
CREATE INDEX IF NOT EXISTS idx_sofas_featured ON sofas(featured);
CREATE INDEX IF NOT EXISTS idx_sofas_on_sale ON sofas(on_sale);
CREATE INDEX IF NOT EXISTS idx_sofas_in_stock ON sofas(in_stock);

CREATE INDEX IF NOT EXISTS idx_pillows_brand ON pillows(brand_id);
CREATE INDEX IF NOT EXISTS idx_pillows_featured ON pillows(featured);
CREATE INDEX IF NOT EXISTS idx_pillows_on_sale ON pillows(on_sale);
CREATE INDEX IF NOT EXISTS idx_pillows_in_stock ON pillows(in_stock);

CREATE INDEX IF NOT EXISTS idx_toppers_brand ON toppers(brand_id);
CREATE INDEX IF NOT EXISTS idx_toppers_featured ON toppers(featured);
CREATE INDEX IF NOT EXISTS idx_toppers_on_sale ON toppers(on_sale);
CREATE INDEX IF NOT EXISTS idx_toppers_in_stock ON toppers(in_stock);

CREATE INDEX IF NOT EXISTS idx_bunkbeds_brand ON bunkbeds(brand_id);
CREATE INDEX IF NOT EXISTS idx_bunkbeds_featured ON bunkbeds(featured);
CREATE INDEX IF NOT EXISTS idx_bunkbeds_on_sale ON bunkbeds(on_sale);
CREATE INDEX IF NOT EXISTS idx_bunkbeds_in_stock ON bunkbeds(in_stock);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_mattresses_updated_at BEFORE UPDATE ON mattresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_beds_updated_at BEFORE UPDATE ON beds
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sofas_updated_at BEFORE UPDATE ON sofas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pillows_updated_at BEFORE UPDATE ON pillows
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_toppers_updated_at BEFORE UPDATE ON toppers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bunkbeds_updated_at BEFORE UPDATE ON bunkbeds
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies
ALTER TABLE mattresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE beds ENABLE ROW LEVEL SECURITY;
ALTER TABLE sofas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pillows ENABLE ROW LEVEL SECURITY;
ALTER TABLE toppers ENABLE ROW LEVEL SECURITY;
ALTER TABLE bunkbeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE frequently_bought_together ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access" ON mattresses FOR SELECT USING (true);
CREATE POLICY "Public read access" ON beds FOR SELECT USING (true);
CREATE POLICY "Public read access" ON sofas FOR SELECT USING (true);
CREATE POLICY "Public read access" ON pillows FOR SELECT USING (true);
CREATE POLICY "Public read access" ON toppers FOR SELECT USING (true);
CREATE POLICY "Public read access" ON bunkbeds FOR SELECT USING (true);
CREATE POLICY "Public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON brands FOR SELECT USING (true);
CREATE POLICY "Public read access" ON homepage_content FOR SELECT USING (true);
CREATE POLICY "Public read access" ON frequently_bought_together FOR SELECT USING (true);

-- Admin full access (you'll need to implement proper authentication)
CREATE POLICY "Admin full access" ON mattresses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON beds FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON sofas FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON pillows FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON toppers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON bunkbeds FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON brands FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON homepage_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON frequently_bought_together FOR ALL USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
