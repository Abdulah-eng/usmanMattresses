import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    console.log('🔍 Testing database connection...')
    
    // Test basic connection
    const { data: testData, error: testError } = await supabase
      .from('products')
      .select('count')
      .limit(1)
    
    if (testError) {
      console.error('❌ Database connection test failed:', testError)
      return NextResponse.json({ 
        error: 'Database connection failed', 
        details: testError.message 
      }, { status: 500 })
    }
    
    console.log('✅ Database connection successful')
    
    // Check if orders table exists
    const { data: ordersTest, error: ordersError } = await supabase
      .from('orders')
      .select('count')
      .limit(1)
    
    if (ordersError) {
      console.log('⚠️ Orders table not found or accessible:', ordersError.message)
      return NextResponse.json({ 
        message: 'Database connected but orders table not found',
        suggestion: 'Run the SQL script in create-orders-table.sql in your Supabase SQL editor',
        error: ordersError.message
      }, { status: 404 })
    }
    
    // Check if order_items table exists
    const { data: itemsTest, error: itemsError } = await supabase
      .from('order_items')
      .select('count')
      .limit(1)
    
    if (itemsError) {
      console.log('⚠️ Order items table not found:', itemsError.message)
      return NextResponse.json({ 
        message: 'Orders table exists but order_items table not found',
        suggestion: 'Run the complete SQL script in create-orders-table.sql',
        error: itemsError.message
      }, { status: 404 })
    }
    
    // Get table counts
    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
    
    const { count: ordersCount } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
    
    const { count: itemsCount } = await supabase
      .from('order_items')
      .select('*', { count: 'exact', head: true })
    
    console.log('✅ All tables accessible')
    
    return NextResponse.json({ 
      message: 'Database connection and tables verified',
      tables: {
        products: { exists: true, count: productsCount },
        orders: { exists: true, count: ordersCount },
        order_items: { exists: true, count: itemsCount }
      },
      environment: {
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
        hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
        hasAdminEmail: !!process.env.ADMIN_EMAIL
      }
    })
    
  } catch (error) {
    console.error('❌ Unexpected error testing database:', error)
    return NextResponse.json({ 
      error: 'Unexpected error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
