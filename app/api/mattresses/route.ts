import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    
    let query = supabase
      .from('mattresses')
      .select(`
        *,
        brands (
          id,
          name,
          logo
        )
      `)
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    const { data: products, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

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
      category: 'mattresses',
      type: product.mattress_type || 'Standard',
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
    console.error('Mattresses API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    // Transform frontend data to database format
    const mattressData = {
      name: body.name,
      slug: body.name?.toLowerCase().replace(/\s+/g, '-') || '',
      brand_id: body.brand_id,
      original_price: body.originalPrice || body.currentPrice,
      current_price: body.currentPrice,
      monthly_price: body.monthlyPrice,
      main_image: body.mainImage || body.image,
      images: body.images || [],
      short_description: body.shortDescription,
      long_description: body.longDescription,
      mattress_type: body.type,
      firmness_level: body.firmnessLevel,
      firmness_description: body.firmness,
      reasons_to_buy: body.reasonsToBuy,
      sizes: body.sizes,
      colors: body.colors,
      features: body.features,
      materials: body.materials,
      dimensions: body.dimensions,
      rating: body.rating,
      review_count: body.reviewCount,
      in_stock: body.inStock,
      stock_quantity: body.stockQuantity,
      featured: body.featured,
      on_sale: body.onSale,
      dispatch_time: body.dispatchTime,
      setup_service: body.setupService,
      setup_cost: body.setupCost,
      free_delivery: body.freeDelivery === 'Free',
      product_questions: body.productQuestions,
      warranty_info: body.warrantyInfo,
      care_instructions: body.careInstructions,
      care_image: body.careImage,
      // Filter fields
      filter_mattress_type: body.filterMattressType,
      filter_firmness: body.filterFirmness,
      filter_sizes: body.filterSizes,
      filter_features: body.filterFeatures,
      filter_brand: body.filterBrand,
      filter_material: body.filterMaterial,
      filter_min_price: body.filterMinPrice,
      filter_max_price: body.filterMaxPrice,
      filter_in_store: body.filterInStore,
      filter_on_sale: body.filterOnSale
    }
    
    const { data, error } = await supabase
      .from('mattresses')
      .insert([mattressData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ product: data[0] })
  } catch (error) {
    console.error('Mattresses API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, ...updateData } = body
    
    // Transform frontend data to database format
    const mattressData = {
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
      mattress_type: updateData.type,
      firmness_level: updateData.firmnessLevel,
      firmness_description: updateData.firmness,
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
      .from('mattresses')
      .update(mattressData)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ product: data[0] })
  } catch (error) {
    console.error('Mattresses API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('mattresses')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Mattresses API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
