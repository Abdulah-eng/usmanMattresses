import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Check if environment variables are set
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    const featured = searchParams.get('featured')
    
    // Health check endpoint
    if (category === 'health') {
      return NextResponse.json({ 
        status: 'ok', 
        message: 'Products API is working',
        timestamp: new Date().toISOString()
      })
    }
    
    if (!category) {
      return NextResponse.json({ error: 'Category parameter is required' }, { status: 400 })
    }

    // Map category to table name
    const categoryTableMap: Record<string, string> = {
      'mattresses': 'mattresses',
      'beds': 'beds',
      'sofas': 'sofas',
      'pillows': 'pillows',
      'toppers': 'toppers',
      'bunkbeds': 'bunkbeds',
      'kids': 'kids',
      'guides': 'guides'
    }

    const tableName = categoryTableMap[category]
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    console.log('Fetching products from table:', tableName, 'for category:', category)

    let query = supabase
      .from(tableName)
      .select(`
        *,
        brands (
          id,
          name,
          logo
        )
      `)
      .order('created_at', { ascending: false })

    if (featured === 'true') {
      query = query.eq('featured', true)
    }

    if (limit) {
      query = query.limit(parseInt(limit))
    }

    const { data: products, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json({ 
        error: 'Database error', 
        details: error.message,
        code: error.code 
      }, { status: 500 })
    }

    console.log('Found products:', products?.length || 0)

    // Transform the data to match the frontend expectations
    const transformedProducts = products?.map(product => ({
      id: product.id,
      name: product.name,
      brand: product.brands?.name || 'Unknown Brand',
      brandColor: 'blue', // Default color since we don't store this in DB
      badge: product.on_sale ? 'On Sale' : '',
      badgeColor: product.on_sale ? 'orange' : 'gray',
      image: product.images?.[0] || product.main_image || '/placeholder.svg',
      rating: Number(product.rating || 4.0),
      reviewCount: Number(product.review_count || 50),
      firmness: product.firmness_description || 'Medium',
      firmnessLevel: Number(product.firmness_level || 6),
      features: product.features || ['Premium Quality'],
      originalPrice: Number(product.original_price || 0),
      currentPrice: Number(product.current_price || 0),
      savings: Number(product.savings || 0),
      freeDelivery: product.free_delivery ? 'Free' : 'Tomorrow',
      setupService: Boolean(product.setup_service),
      setupCost: product.setup_cost ? Number(product.setup_cost) : undefined,
      certifications: ['OEKO-TEX', 'Made in UK'], // Default certifications
      sizes: product.sizes || ['Single', 'Double', 'King', 'Super King'],
      selectedSize: product.sizes?.[0] || 'Queen',
      monthlyPrice: product.monthly_price ? Number(product.monthly_price) : undefined,
      images: product.images || [],
      category: category,
      type: product.mattress_type || product.bed_type || product.sofa_type || product.pillow_type || 'Standard',
      size: product.sizes?.[0] || 'Queen',
      comfortLevel: product.firmness_description || 'Medium',
      inStore: Boolean(product.in_stock !== false),
      onSale: Boolean(product.on_sale),
      // Additional fields for the admin panel
      shortDescription: product.short_description,
      longDescription: product.long_description,
      colors: product.colors,
      materials: product.materials,
      dimensions: product.dimensions,
      dispatchTime: product.dispatch_time,
      reasonsToBuy: product.reasons_to_buy,
      productQuestions: product.product_questions,
      warrantyInfo: product.warranty_info,
      careInstructions: product.care_instructions,
      careImage: product.care_image,
      stockQuantity: product.stock_quantity,
      inStock: Boolean(product.in_stock),
      // Filter fields
      filterMattressType: product.filter_mattress_type,
      filterFirmness: product.filter_firmness,
      filterSizes: product.filter_sizes,
      filterFeatures: product.filter_features,
      filterBrand: product.filter_brand,
      filterMaterial: product.filter_material,
      filterMinPrice: product.filter_min_price,
      filterMaxPrice: product.filter_max_price,
      filterInStore: Boolean(product.filter_in_store),
      filterOnSale: Boolean(product.filter_on_sale)
    })) || []

    return NextResponse.json({ products: transformedProducts })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { category, ...productData } = body
    
    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 })
    }

    // Map category to table name
    const categoryTableMap: Record<string, string> = {
      'mattresses': 'mattresses',
      'beds': 'beds',
      'sofas': 'sofas',
      'pillows': 'pillows',
      'toppers': 'toppers',
      'bunkbeds': 'bunkbeds',
      'kids': 'kids',
      'guides': 'guides'
    }

    const tableName = categoryTableMap[category]
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    // Handle brand - if it's a string, we'll need to create or find the brand
    let brandId = productData.brand_id || null
    
    if (productData.brand && typeof productData.brand === 'string' && !productData.brand_id) {
      try {
        // Try to find existing brand
        const { data: existingBrand } = await supabase
          .from('brands')
          .select('id')
          .eq('name', productData.brand)
          .single()
        
        if (existingBrand) {
          brandId = existingBrand.id
        } else {
          // Create new brand if it doesn't exist
          const { data: newBrand, error: brandError } = await supabase
            .from('brands')
            .insert([{ name: productData.brand, description: `${productData.brand} brand` }])
            .select()
            .single()
          
          if (newBrand && !brandError) {
            brandId = newBrand.id
          }
        }
      } catch (error) {
        console.warn('Could not handle brand:', productData.brand, error)
        brandId = null
      }
    }

    // Transform frontend data to database format
    const dbData = {
      name: productData.name || 'New Product',
      slug: (productData.name || 'new-product').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      brand_id: brandId,
      original_price: productData.originalPrice || productData.currentPrice || 0,
      current_price: productData.currentPrice || 0,
      monthly_price: productData.monthlyPrice || null,
      main_image: productData.mainImage || productData.image || '/placeholder.svg',
      images: Array.isArray(productData.images) ? productData.images : [],
      short_description: productData.shortDescription || productData.name || 'New product description',
      long_description: productData.longDescription || productData.shortDescription || productData.name || 'New product description',
      // Category-specific fields
      ...(category === 'mattresses' && {
        mattress_type: productData.type || 'Standard',
        firmness_level: productData.firmnessLevel || 6,
        firmness_description: productData.firmness || 'Medium'
      }),
      ...(category === 'beds' && {
        bed_type: productData.type || 'Standard',
        style: productData.style || 'Modern'
      }),
      ...(category === 'sofas' && {
        sofa_type: productData.type || 'Standard',
        style: productData.style || 'Modern'
      }),
      ...(category === 'pillows' && {
        pillow_type: productData.type || 'Standard',
        style: productData.style || 'Modern'
      }),
      reasons_to_buy: Array.isArray(productData.reasonsToBuy) ? productData.reasonsToBuy : ['Quality', 'Comfort'],
      sizes: Array.isArray(productData.sizes) ? productData.sizes : ['Standard'],
      colors: Array.isArray(productData.colors) ? productData.colors : ['White'],
      features: Array.isArray(productData.features) ? productData.features : ['Quality'],
      materials: Array.isArray(productData.materials) ? productData.materials : ['Premium Fabric'],
      dimensions: productData.dimensions || { height: '25cm', length: '200cm', width: '150cm', weight_capacity: '150kg' },
      rating: productData.rating || 4.0,
      review_count: productData.reviewCount || 0,
      in_stock: productData.inStock !== false,
      stock_quantity: productData.stockQuantity || 0,
      featured: productData.featured || false,
      on_sale: productData.onSale || false,
      dispatch_time: productData.dispatchTime || 'Tomorrow',
      setup_service: productData.setupService || false,
      setup_cost: productData.setupCost || null,
      free_delivery: productData.freeDelivery === 'Free',
      product_questions: Array.isArray(productData.productQuestions) ? productData.productQuestions : [],
      warranty_info: productData.warrantyInfo || { period: '1 Year', coverage: 'Basic warranty' },
      care_instructions: productData.careInstructions || 'Regular cleaning recommended',
      care_image: productData.careImage || '/placeholder.svg',
      // Filter fields
      filter_mattress_type: Array.isArray(productData.filterMattressType) ? productData.filterMattressType : [],
      filter_firmness: Array.isArray(productData.filterFirmness) ? productData.filterFirmness : [],
      filter_sizes: Array.isArray(productData.filterSizes) ? productData.filterSizes : [],
      filter_features: Array.isArray(productData.filterFeatures) ? productData.filterFeatures : [],
      filter_brand: Array.isArray(productData.filterBrand) ? productData.filterBrand : [],
      filter_material: Array.isArray(productData.filterMaterial) ? productData.filterMaterial : [],
      filter_min_price: productData.filterMinPrice || 0,
      filter_max_price: productData.filterMaxPrice || 2000,
      filter_in_store: productData.filterInStore || false,
      filter_on_sale: productData.filterOnSale || false
    }

    console.log('Inserting data into table:', tableName)
    console.log('Data being inserted:', JSON.stringify(dbData, null, 2))

    const { data, error } = await supabase
      .from(tableName)
      .insert([dbData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json({ 
        error: 'Database error', 
        details: error.message,
        code: error.code 
      }, { status: 500 })
    }

    console.log('Successfully inserted product:', data[0])
    return NextResponse.json({ product: data[0] })
  } catch (error) {
    console.error('Products API error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'Unknown error type')
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, category, ...updateData } = body
    
    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 })
    }

    // Map category to table name
    const categoryTableMap: Record<string, string> = {
      'mattresses': 'mattresses',
      'beds': 'beds',
      'sofas': 'sofas',
      'pillows': 'pillows',
      'toppers': 'toppers',
      'bunkbeds': 'bunkbeds',
      'kids': 'kids',
      'guides': 'guides'
    }

    const tableName = categoryTableMap[category]
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    // Transform frontend data to database format
    const dbData = {
      name: updateData.name,
      slug: updateData.name?.toLowerCase().replace(/\s+/g, '-') || '',
      brand_id: updateData.brand_id,
      original_price: updateData.originalPrice || updateData.currentPrice,
      current_price: updateData.currentPrice,
      monthly_price: updateData.monthlyPrice,
      main_image: updateData.mainImage || updateData.image,
      images: updateData.images || [],
      short_description: updateData.shortDescription,
      long_description: updateData.longDescription,
      // Category-specific fields
      ...(category === 'mattresses' && {
        mattress_type: updateData.type,
        firmness_level: updateData.firmnessLevel,
        firmness_description: updateData.firmness
      }),
      ...(category === 'beds' && {
        bed_type: updateData.type,
        style: updateData.style
      }),
      ...(category === 'sofas' && {
        sofa_type: updateData.type,
        style: updateData.style
      }),
      ...(category === 'pillows' && {
        pillow_type: updateData.type,
        style: updateData.style
      }),
      reasons_to_buy: updateData.reasonsToBuy,
      sizes: updateData.sizes,
      colors: updateData.colors,
      features: updateData.features,
      materials: updateData.materials,
      dimensions: updateData.dimensions,
      rating: updateData.rating,
      review_count: updateData.reviewCount,
      in_stock: updateData.inStock,
      stock_quantity: updateData.stockQuantity,
      featured: updateData.featured,
      on_sale: updateData.onSale,
      dispatch_time: updateData.dispatchTime,
      setup_service: updateData.setupService,
      setup_cost: updateData.setupCost,
      free_delivery: updateData.freeDelivery === 'Free',
      product_questions: updateData.productQuestions,
      warranty_info: updateData.warrantyInfo,
      care_instructions: updateData.careInstructions,
      care_image: updateData.careImage,
      // Filter fields
      filter_mattress_type: updateData.filterMattressType,
      filter_firmness: updateData.filterFirmness,
      filter_sizes: updateData.filterSizes,
      filter_features: updateData.filterFeatures,
      filter_brand: updateData.filterBrand,
      filter_material: updateData.filterMaterial,
      filter_min_price: updateData.filterMinPrice,
      filter_max_price: updateData.filterMaxPrice,
      filter_in_store: updateData.filterInStore,
      filter_on_sale: updateData.filterOnSale
    }

    const { data, error } = await supabase
      .from(tableName)
      .update(dbData)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ product: data[0] })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const category = searchParams.get('category')
    
    if (!id || !category) {
      return NextResponse.json({ error: 'Product ID and category are required' }, { status: 400 })
    }

    // Map category to table name
    const categoryTableMap: Record<string, string> = {
      'mattresses': 'mattresses',
      'beds': 'beds',
      'sofas': 'sofas',
      'pillows': 'pillows',
      'toppers': 'toppers',
      'bunkbeds': 'bunkbeds',
      'kids': 'kids',
      'guides': 'guides'
    }

    const tableName = categoryTableMap[category]
    if (!tableName) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
    }

    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Products API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}



