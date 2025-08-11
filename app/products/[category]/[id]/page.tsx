import { notFound } from "next/navigation"
import { ProductDetailHappy } from "@/components/product-detail-happy"
import { ProductGridNew } from "@/components/product-grid-new"
import { getProductsByCategory } from "@/lib/product-data"

interface PageProps {
  params: Promise<{ category: string; id: string }>
}

async function getProduct(category: string, id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products?category=${encodeURIComponent(category)}&id=${encodeURIComponent(id)}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data.products?.[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category, id } = await params
  
  // Fetch the actual product data
  const product = await getProduct(category, id)
  
  if (!product) {
    notFound()
  }
  
  // Transform the product data to match ProductDetailCard interface
  const productDetail = {
    id: product.id,
    name: product.name || 'Unknown Product',
    brand: product.brand || 'Unknown Brand',
    brandColor: product.brandColor || 'blue',
    badge: product.badge || '',
    badgeColor: product.badgeColor || 'gray',
    image: (product.images && product.images[0]) || product.image || '',
    rating: Number(product.rating || 4.0),
    reviewCount: Number(product.reviewCount || product.review_count || 50),
    firmness: product.firmness || 'Medium',
    firmnessLevel: Number(product.firmnessLevel || product.firmness_level || 6),
    features: product.features || ['Premium Quality'],
    originalPrice: Number(product.originalPrice || product.original_price || product.price || 0),
    currentPrice: Number(product.currentPrice || product.current_price || product.price || 0),
    savings: Number(product.savings || Math.max(Number(product.originalPrice || product.original_price || product.price || 0) - Number(product.currentPrice || product.current_price || product.price || 0), 0)),
    freeDelivery: product.freeDelivery || product.free_delivery || 'Tomorrow',
    setupService: Boolean(product.setupService || product.setup_service),
    setupCost: product.setupCost || product.setup_cost ? Number(product.setupCost || product.setup_cost) : undefined,
    certifications: product.certifications || ['OEKO-TEX', 'Made in UK'],
    sizes: product.sizes || ['Single', 'Double', 'King', 'Super King'],
    selectedSize: product.selectedSize || product.selected_size || 'Queen',
    monthlyPrice: product.monthlyPrice || product.monthly_price ? Number(product.monthlyPrice || product.monthly_price) : Math.floor(Number(product.price || 0) / 12),
    images: product.images || [],
    category: product.category || category,
    type: product.type || 'Standard',
    size: product.size || 'Queen',
    comfortLevel: product.comfortLevel || product.comfort_level || 'Medium',
    inStore: Boolean(product.inStore !== false),
    onSale: Boolean(product.onSale || product.on_sale),
  }
  
  const alsoViewed = getProductsByCategory(productDetail.category).slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <ProductDetailHappy product={productDetail} />
      </div>
      <ProductGridNew products={alsoViewed} title="Customers also viewed" />
    </div>
  )
}


