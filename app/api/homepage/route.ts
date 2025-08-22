import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')

    let sectionQuery = supabase.from('homepage_sections').select('*').eq('is_active', true)
    if (key) sectionQuery = sectionQuery.eq('key', key)
    const { data: sections, error: sectionError } = await sectionQuery
    if (sectionError) throw sectionError

    const sectionIds = (sections || []).map(s => s.id)
    let items: any[] = []
    if (sectionIds.length) {
      const { data: _items, error: itemError } = await supabase
        .from('homepage_section_items')
        .select('*')
        .in('section_id', sectionIds)
        .order('position', { ascending: true })
      if (itemError) throw itemError
      items = _items || []
    }

    const payload = (sections || []).map(s => ({
      ...s,
      items: items.filter(i => i.section_id === s.id)
    }))

    return NextResponse.json({ sections: payload })
  } catch (e) {
    console.error('Homepage GET error', e)
    return NextResponse.json({ error: 'Failed to fetch homepage sections' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // body: { section: { key, title, subtitle, is_active }, items: [...] }
    const { section, items } = body

    // upsert section by key
    const { data: upserted, error: upsertErr } = await supabase
      .from('homepage_sections')
      .upsert({ key: section.key, title: section.title, subtitle: section.subtitle, is_active: section.is_active }, { onConflict: 'key' })
      .select()
    if (upsertErr) throw upsertErr
    const sec = upserted?.[0]

    // replace items (simple strategy)
    if (sec) {
      await supabase.from('homepage_section_items').delete().eq('section_id', sec.id)
      if (Array.isArray(items) && items.length) {
        const insertRows = items.map((it: any, idx: number) => ({
          section_id: sec.id,
          title: it.title,
          subtitle: it.subtitle,
          content: it.content,
          image: it.image,
          href: it.href,
          category: it.category,
          read_time: it.read_time,
          badge: it.badge,
          rating: it.rating,
          price: it.price,
          original_price: it.original_price,
          discount_label: it.discount_label,
          is_featured: !!it.is_featured,
          position: it.position ?? idx,
          meta: it.meta || {}
        }))
        const { error: insErr } = await supabase.from('homepage_section_items').insert(insertRows)
        if (insErr) throw insErr
      }
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Homepage POST error', e)
    return NextResponse.json({ error: 'Failed to save homepage section' }, { status: 500 })
  }
}
