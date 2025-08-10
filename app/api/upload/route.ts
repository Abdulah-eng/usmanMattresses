import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Create Supabase client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)

export async function POST(req: NextRequest) {
  try {
    // Debug logging
    console.log('Upload API called')
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('Service Role Key exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
    
    // Get the authorization header
    const authHeader = req.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No auth header or invalid format')
      return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    console.log('Token received, length:', token.length)
    
    // Verify the JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError) {
      console.log('Auth error:', authError.message)
      return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 })
    }
    
    if (!user) {
      console.log('No user found')
      return NextResponse.json({ error: 'Unauthorized - No user found' }, { status: 401 })
    }

    console.log('User authenticated:', user.email)

    // Check if user is admin (optional additional security)
    if (user.email !== 'mabdulaharshad@gmail.com') {
      console.log('Access denied for user:', user.email)
      return NextResponse.json({ error: 'Access denied - Admin only' }, { status: 403 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      console.log('No file provided')
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    console.log('File received:', file.name, 'Size:', file.size, 'Type:', file.type)

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.log('Invalid file type:', file.type)
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.log('File too large:', file.size)
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExtension}`

    console.log('Attempting to upload to bucket: product-images')
    console.log('Generated filename:', fileName)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return NextResponse.json({ 
        error: 'Failed to upload file to storage',
        details: error.message 
      }, { status: 500 })
    }

    console.log('File uploaded successfully:', data)

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    console.log('Public URL generated:', urlData.publicUrl)

    return NextResponse.json({ 
      url: urlData.publicUrl,
      fileName: fileName
    })

  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}



