-- Setup Admin User Account
-- Run this in your Supabase SQL editor after setting up authentication

-- Enable Row Level Security (RLS) on auth.users if not already enabled
-- This is typically enabled by default in Supabase

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN user_email = 'mabdulaharshad@gmail.com';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a policy for admin-only access to settings table
CREATE POLICY "Admin only access to settings" ON settings
  FOR ALL USING (is_admin(auth.jwt() ->> 'email'));

-- Create a policy for admin-only access to products table
CREATE POLICY "Admin only access to products" ON products
  FOR ALL USING (is_admin(auth.jwt() ->> 'email'));

-- Create a policy for admin-only access to orders table
CREATE POLICY "Admin only access to orders" ON orders
  FOR ALL USING (is_admin(auth.jwt() ->> 'email'));

-- Create a policy for admin-only access to order_items table
CREATE POLICY "Admin only access to order_items" ON order_items
  FOR ALL USING (is_admin(auth.jwt() ->> 'email'));

-- Enable RLS on all tables
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Note: To create the admin user account, you need to:
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to Authentication > Users
-- 3. Click "Add User"
-- 4. Enter email: mabdulaharshad@gmail.com
-- 5. Set a secure password
-- 6. The user will receive an email to confirm their account
-- 7. Once confirmed, they can sign in to the admin panel

-- Alternative: Use the Supabase CLI to create the user
-- supabase auth signup mabdulaharshad@gmail.com --password your_secure_password
