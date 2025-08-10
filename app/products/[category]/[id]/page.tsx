import { notFound } from "next/navigation"
import { ProductDetailCard } from "@/components/product-detail-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface PageProps {
  params: { category: string; id: string }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category, id } = params
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/products?id=${id}&category=${category}`)
    if (!res.ok) {
      return notFound()
    }
    const data = await res.json()
    
    if (!data || !data.products || data.products.length === 0) {
      return notFound()
    }
    
    const p = data.products[0] as any
    const product = {
      id: p.id,
      name: p.name,
      brand: p.brand,
      brandColor: p.brand_color || 'blue',
      badge: p.badge || '',
      badgeColor: p.badge_color || 'gray',
      image: (p.images && p.images[0]) || '',
      rating: Number(p.rating || 0),
      reviewCount: Number(p.review_count || 0),
      firmness: p.firmness || '',
      firmnessLevel: p.firmness_level ?? 0,
      features: p.features || [],
      originalPrice: Number(p.original_price || 0),
      currentPrice: Number(p.current_price || 0),
      savings: Number(p.savings || Math.max(Number(p.original_price||0) - Number(p.current_price||0), 0)),
      freeDelivery: p.free_delivery || '',
      setupService: Boolean(p.setup_service),
      setupCost: p.setup_cost ? Number(p.setup_cost) : undefined,
      certifications: p.certifications || [],
      sizes: p.sizes || [],
      selectedSize: p.selected_size || undefined,
      monthlyPrice: p.monthly_price ? Number(p.monthly_price) : undefined,
      images: p.images || [],
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <ProductDetailCard product={product} />
        </div>
        <Footer />
      </div>
    )
  } catch (error) {
    console.error('Error fetching product:', error)
    return notFound()
  }
}


