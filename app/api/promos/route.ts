import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key') // e.g., 'mattress_finder'

    let query = supabase
      .from('promos')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (key) {
      query = query.eq('key', key)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching promos:', error)
      return NextResponse.json({ error: 'Failed to fetch promos' }, { status: 500 })
    }

    return NextResponse.json({ promos: data || [] })
  } catch (error) {
    console.error('Promos API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { data, error } = await supabase
      .from('promos')
      .upsert(body, { onConflict: 'key' })
      .select()

    if (error) {
      console.error('Error saving promo:', error)
      return NextResponse.json({ error: 'Failed to save promo' }, { status: 500 })
    }

    return NextResponse.json({ promo: data?.[0] })
  } catch (error) {
    console.error('Promos API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
