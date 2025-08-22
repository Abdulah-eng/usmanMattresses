import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(_req: NextRequest) {
  try {
    // Products
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    const safeProducts = productsError ? [] : (products || [])
    if (productsError) console.error('Stats API products error:', productsError)

    // Orders
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
    const safeOrders = ordersError ? [] : (orders || [])
    if (ordersError) console.error('Stats API orders error:', ordersError)

    const totalProducts = safeProducts.length || 0
    const featuredProducts = safeProducts.filter((p: any) => p.featured).length || 0
    const onSaleProducts = safeProducts.filter((p: any) => p.on_sale).length || 0
    const outOfStockProducts = safeProducts.filter((p: any) => !p.in_stock).length || 0
    const recentProducts = safeProducts.slice(0, 5)

    const totalOrders = safeOrders.length || 0
    const totalRevenue = safeOrders.reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0)

    // Optionally compute customers as distinct emails
    const customerEmails = new Set(safeOrders.map((o: any) => o.customer_email).filter(Boolean))
    const totalCustomers = customerEmails.size

    return NextResponse.json({
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue,
        totalCustomers,
        featuredProducts,
        onSaleProducts,
        outOfStockProducts,
        recentProductsCount: recentProducts.length,
      },
      recentProducts,
    })
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


