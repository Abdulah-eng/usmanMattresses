import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sectionKey = searchParams.get('section')
    
    let query = supabase
      .from('homepage_content')
      .select('*')
      .eq('is_active', true)

    if (sectionKey) {
      query = query.eq('section_key', sectionKey)
    }

    const { data: content, error } = await query

    if (error) {
      console.error('Error fetching homepage content:', error)
      return NextResponse.json({ error: 'Failed to fetch homepage content' }, { status: 500 })
    }

    if (sectionKey) {
      return NextResponse.json({ content: content?.[0]?.content || [] })
    }

    // Transform data to match frontend expectations
    const transformedContent = content?.reduce((acc, item) => {
      acc[item.section_key] = item.content
      return acc
    }, {} as Record<string, any>) || {}

    return NextResponse.json({ content: transformedContent })
  } catch (error) {
    console.error('Homepage content API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sectionKey, content } = body
    
    if (!sectionKey || !content) {
      return NextResponse.json({ error: 'Section key and content are required' }, { status: 400 })
    }

    // Check if section already exists
    const { data: existingSection } = await supabase
      .from('homepage_content')
      .select('id')
      .eq('section_key', sectionKey)
      .single()

    let result
    if (existingSection) {
      // Update existing section
      const { data, error } = await supabase
        .from('homepage_content')
        .update({ content, updated_at: new Date().toISOString() })
        .eq('section_key', sectionKey)
        .select()

      if (error) {
        console.error('Error updating homepage content:', error)
        return NextResponse.json({ error: 'Failed to update homepage content' }, { status: 500 })
      }
      result = data[0]
    } else {
      // Create new section
      const { data, error } = await supabase
        .from('homepage_content')
        .insert({
          section_key: sectionKey,
          content,
          is_active: true
        })
        .select()

      if (error) {
        console.error('Error creating homepage content:', error)
        return NextResponse.json({ error: 'Failed to create homepage content' }, { status: 500 })
      }
      result = data[0]
    }

    return NextResponse.json({ content: result })
  } catch (error) {
    console.error('Homepage content API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { sectionKey, content } = body
    
    if (!sectionKey || !content) {
      return NextResponse.json({ error: 'Section key and content are required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('homepage_content')
      .update({ content, updated_at: new Date().toISOString() })
      .eq('section_key', sectionKey)
      .select()

    if (error) {
      console.error('Error updating homepage content:', error)
      return NextResponse.json({ error: 'Failed to update homepage content' }, { status: 500 })
    }

    return NextResponse.json({ content: data[0] })
  } catch (error) {
    console.error('Homepage content API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const sectionKey = searchParams.get('section')
    
    if (!sectionKey) {
      return NextResponse.json({ error: 'Section key is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('homepage_content')
      .delete()
      .eq('section_key', sectionKey)

    if (error) {
      console.error('Error deleting homepage content:', error)
      return NextResponse.json({ error: 'Failed to delete homepage content' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Homepage content deleted successfully' })
  } catch (error) {
    console.error('Homepage content API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
