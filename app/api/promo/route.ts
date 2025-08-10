import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  const { data, error } = await supabase.from('settings').select('*').eq('key', 'promo_countdown').single()
  if (error && error.code !== 'PGRST116') return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ value: data?.value || null })
}

export async function POST(req: NextRequest) {
  const value = await req.json()
  const { data, error } = await supabase
    .from('settings')
    .upsert({ key: 'promo_countdown', value }, { onConflict: 'key' })
    .select('*')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ value: data.value })
}



