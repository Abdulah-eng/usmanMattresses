import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getProductsByCategory } from '@/lib/product-data'

// Create Supabase client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || undefined
    const id = searchParams.get('id') || undefined
    
    let query = supabase.from('products').select('*')
    
    if (id) {
      query = query.eq('id', id)
    }
    if (category) {
      query = query.eq('category', category)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    
    // If database has products, return them with proper mapping
    if (data && data.length > 0) {
      const mappedProducts = data.map((p: any) => ({
        id: p.id,
        name: p.name || 'Unknown Product',
        brand: p.brand || 'Unknown Brand',
        brandColor: p.brand_color || 'blue',
        badge: p.badge || '',
        badgeColor: p.badge_color || 'gray',
        image: (p.images && p.images[0]) || '',
        rating: Number(p.rating || 4.0),
        reviewCount: Number(p.review_count || 50),
        firmness: p.firmness || 'Medium',
        firmnessLevel: p.firmness_level ?? 6,
        features: p.features || ['Premium Quality'],
        originalPrice: Number(p.original_price || p.price || 0),
        currentPrice: Number(p.current_price || p.price || 0),
        savings: Number(p.savings || Math.max(Number(p.original_price || p.price || 0) - Number(p.current_price || p.price || 0), 0)),
        freeDelivery: p.free_delivery || 'Tomorrow',
        setupService: Boolean(p.setup_service),
        setupCost: p.setup_cost ? Number(p.setup_cost) : undefined,
        certifications: p.certifications || ['OEKO-TEX', 'Made in UK'],
        sizes: p.sizes || ['Single', 'Double', 'King', 'Super King'],
        selectedSize: p.selected_size || 'Queen',
        monthlyPrice: p.monthly_price ? Number(p.monthly_price) : Math.floor(Number(p.price || 0) / 12),
        images: p.images || [],
        category: p.category || category || 'mattresses',
        type: p.type || 'Standard',
        size: p.size || 'Queen',
        comfortLevel: p.comfort_level || 'Medium',
        inStore: Boolean(p.in_store !== false),
        onSale: Boolean(p.on_sale),
      }))
      
      return NextResponse.json({ products: mappedProducts })
    }
    
    // If database is empty, return mock data
    if (category) {
      const mockProducts = getProductsByCategory(category)
      return NextResponse.json({ products: mockProducts })
    }
    
    // Return empty array if no category specified and no database products
    return NextResponse.json({ products: [] })
    
  } catch (error) {
    console.error('Products API error:', error)
    
    // Fallback to mock data if there's an error
    try {
      const { searchParams } = new URL(req.url)
      const category = searchParams.get('category')
      if (category) {
        const mockProducts = getProductsByCategory(category)
        return NextResponse.json({ products: mockProducts })
      }
    } catch (fallbackError) {
      console.error('Fallback to mock data failed:', fallbackError)
    }
    
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = req.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    
    // Verify the JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 })
    }

    // Check if user is admin (optional additional security)
    if (user.email !== 'mabdulaharshad@gmail.com') {
      return NextResponse.json({ error: 'Access denied - Admin only' }, { status: 403 })
    }

    const body = await req.json()
    
    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json({ 
        error: 'Missing required fields: name, price, and category are required' 
      }, { status: 400 })
    }

    // Validate price is a positive number
    if (typeof body.price !== 'number' || body.price <= 0) {
      return NextResponse.json({ 
        error: 'Price must be a positive number' 
      }, { status: 400 })
    }

    // Validate images array
    if (!Array.isArray(body.images) || body.images.length === 0) {
      return NextResponse.json({ 
        error: 'At least one product image is required' 
      }, { status: 400 })
    }

    // Filter out empty image URLs
    const validImages = body.images.filter((img: string) => img && img.trim() !== '')
    
    if (validImages.length === 0) {
      return NextResponse.json({ 
        error: 'At least one valid product image is required' 
      }, { status: 400 })
    }

    // Prepare product data
    const productData = {
      name: body.name.trim(),
      description: body.description?.trim() || '',
      price: Number(body.price),
      category: body.category.trim(),
      images: validImages,
      size: body.size?.trim() || '',
      material: body.material?.trim() || '',
      color: body.color?.trim() || '',
      brand: body.brand?.trim() || 'Unknown', // Provide default value for brand
      in_stock: body.inStock !== undefined ? Boolean(body.inStock) : true,
      featured: body.featured !== undefined ? Boolean(body.featured) : false,
      created_at: body.created_at || new Date().toISOString()
    }

    console.log('Saving product:', productData.name)

    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select('*')
      .single()

    if (error) {
      console.error('Product insert error:', error)
      return NextResponse.json({ 
        error: 'Failed to save product to database',
        details: error.message 
      }, { status: 500 })
    }

    console.log('Product saved successfully:', data.id)

    return NextResponse.json({ 
      product: data,
      message: 'Product saved successfully'
    })

  } catch (error) {
    console.error('Products POST error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}



