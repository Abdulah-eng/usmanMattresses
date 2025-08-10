-- Supabase Database Schema for Mattress Store
-- Run this in your Supabase SQL editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for public access to product images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Create settings table for banner and promo data
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  specifications JSONB,
  size TEXT,
  material TEXT,
  color TEXT,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address JSONB NOT NULL,
  billing_address JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'dispatched', 'delivered', 'cancelled')),
  total DECIMAL(10,2) NOT NULL,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Insert default banner settings
INSERT INTO settings (key, value) VALUES 
('banner', '{"imageUrl": "", "headline": "Find Your Perfect Sleep", "subheadline": "Discover premium mattresses for ultimate comfort", "ctaLabel": "Shop Now", "ctaHref": "/mattresses"}')
ON CONFLICT (key) DO NOTHING;

-- Insert default promo settings
INSERT INTO settings (key, value) VALUES 
('promo', '{"title": "UP TO 50% OFF - MID WEEK SAVINGS", "endsAt": ""}')
ON CONFLICT (key) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions (adjust based on your Supabase setup)
-- These are typically handled automatically by Supabase, but you can add custom permissions here if needed

-- Example product data (optional - for testing)
INSERT INTO products (name, brand, category, price, description, images, size, material, color, featured) VALUES 
('Cascade Medium Mattress', 'SleepWell', 'mattresses', 899.99, 'Premium medium-firm mattress with memory foam and pocket springs', ARRAY['https://example.com/cascade-medium-1.jpg', 'https://example.com/cascade-medium-2.jpg'], 'Queen', 'Memory Foam + Pocket Springs', 'White', true),
('Cloud Comfort Pillow', 'SleepWell', 'pillows', 49.99, 'Ultra-soft memory foam pillow for neck support', ARRAY['https://example.com/cloud-comfort-1.jpg'], 'Standard', 'Memory Foam', 'White', false),
('Luxury Bedding Set', 'SleepWell', 'bedding', 199.99, '100% cotton bedding set with premium finish', ARRAY['https://example.com/luxury-bedding-1.jpg', 'https://example.com/luxury-bedding-2.jpg'], 'Queen', '100% Cotton', 'Ivory', true)
ON CONFLICT DO NOTHING;
