import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  const { data, error } = await supabase.from('settings').select('*').eq('key', 'home_banner').single()
  if (error && error.code !== 'PGRST116') return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ value: data?.value || null })
}

export async function POST(req: NextRequest) {
  const { imageUrl, headline, subheadline, ctaLabel, ctaHref } = await req.json()
  const payload = { imageUrl, headline, subheadline, ctaLabel, ctaHref }
  const { data, error } = await supabase
    .from('settings')
    .upsert({ key: 'home_banner', value: payload }, { onConflict: 'key' })
    .select('*')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ value: data.value })
}



