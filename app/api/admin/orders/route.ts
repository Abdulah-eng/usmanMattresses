import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')

    let query = supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (
            id,
            name,
            images
          )
        )
      `)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    if (limit) {
      query = query.limit(parseInt(limit))
    }

    const { data, error } = await query
    if (error) {
      // If orders table doesn't exist yet or any other error, return empty list to keep UI functional
      console.error('Admin orders query error:', error)
      return NextResponse.json({ orders: [] })
    }

    return NextResponse.json({ orders: data || [] })
  } catch (error) {
    console.error('Admin orders API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


