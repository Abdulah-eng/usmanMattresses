-- Comprehensive Products Database Schema for Admin Dashboard
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

-- Create products table with comprehensive fields
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Information
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  
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
  description_images TEXT[] DEFAULT '{}',
  
  -- Marketing and Selling Points
  reasons_to_buy TEXT[] DEFAULT '{}',
  
  -- Specifications
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  materials TEXT[] DEFAULT '{}',
  product_type TEXT, -- e.g., mattress, bed, sofa, pillow, bedding
  
  -- Dimensions (stored as JSON for flexibility)
  dimensions JSONB,
  
  -- Hero/Gallery Assets for PDP
  hero_small_images TEXT[] DEFAULT '{}', -- expect up to 2 items
  hero_big_images TEXT[] DEFAULT '{}',   -- gallery carousel (array)
  below_hero_sections JSONB DEFAULT '[]', -- array of 4 objects: {image, title, content}
  
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
  
  -- Promotional Offers
  promotional_offers JSONB DEFAULT '[]',
  
  -- Product Questions and FAQ
  product_questions JSONB DEFAULT '[]',
  
  -- Warranty and Care
  warranty_info JSONB,
  care_instructions TEXT,
  
  -- SEO and Meta
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_variants table for different sizes/colors combinations
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size TEXT,
  color TEXT,
  sku TEXT UNIQUE,
  price DECIMAL(10,2),
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_images table for better image management
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_main BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create promotional_offers table
CREATE TABLE IF NOT EXISTS promotional_offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  offer_type TEXT NOT NULL, -- 'add_product', 'save_percentage', 'free_shipping', etc.
  title TEXT NOT NULL,
  description TEXT,
  discount_percentage DECIMAL(5,2),
  discount_amount DECIMAL(10,2),
  add_product_id UUID REFERENCES products(id),
  add_product_quantity INTEGER DEFAULT 1,
  minimum_purchase DECIMAL(10,2),
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_questions table
CREATE TABLE IF NOT EXISTS product_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create warranty_info table
CREATE TABLE IF NOT EXISTS warranty_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  warranty_type TEXT NOT NULL, -- 'manufacturer', 'extended', 'lifetime'
  duration TEXT NOT NULL, -- '1 year', '5 years', 'lifetime'
  coverage_details TEXT,
  terms_conditions TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table for dashboard access
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Mattresses', 'mattresses', 'Premium comfort for better sleep', 1),
('Beds', 'beds', 'Stylish frames for every bedroom', 2),
('Sofas', 'sofas', 'Comfort meets style in your living room', 3),
('Bunk Beds', 'bunk-beds', 'Space-saving solutions for kids', 4),
('Mattress Toppers', 'mattress-toppers', 'Extra comfort for your existing mattress', 5),
('Pillows', 'pillows', 'Perfect support for your head and neck', 6),
('Bedding', 'bedding', 'Complete bedding solutions', 7),
('Adjustable Bases', 'adjustable-bases', 'Customizable sleep positions', 8),
('Box Springs', 'box-springs', 'Foundation support for mattresses', 9),
('Beanbags', 'beanbags', 'Comfortable seating solutions', 10)
ON CONFLICT (slug) DO NOTHING;

-- Insert default brands
INSERT INTO brands (name, description) VALUES
('ARTHUR SLEEP', 'Premium sleep solutions'),
('SILENTNIGHT', 'Trusted sleep comfort'),
('SLEEPWELL', 'Quality sleep products'),
('DREAMLAND', 'Dream sleep experience'),
('BEDORA', 'Your sleep partner')
ON CONFLICT (name) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_on_sale ON products(on_sale);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);

-- Site-wide promos/content (e.g., Mattress Finder Promo)
CREATE TABLE IF NOT EXISTS promos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL, -- e.g., 'mattress_finder'
  title TEXT,
  description TEXT,
  media_type TEXT CHECK (media_type IN ('image','video')) DEFAULT 'image',
  media_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE promos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON promos FOR SELECT USING (true);
CREATE POLICY "Admin full access" ON promos FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for products, categories, and brands
CREATE POLICY "Public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Public read access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read access" ON brands FOR SELECT USING (true);

-- Admin full access (you'll need to implement proper authentication)
CREATE POLICY "Admin full access" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON brands FOR ALL USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
