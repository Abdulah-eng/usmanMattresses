"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProductGridProps {
  category: string
  filters: Record<string, any>
  sortBy: string
}

export function ProductGrid({ category, filters, sortBy }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 12
  const [dbProducts, setDbProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Helper: pick a representative lifestyle image per category
  const getCategoryImage = (cat: string): string => {
    const map: Record<string, string> = {
      mattresses: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop',
      pillows: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      bedding: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
      'adjustable-bases': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop',
      'box-springs': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop',
      beds: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop',
      sofas: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      default: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop',
    }
    return map[cat] || map.default
  }

  // Fetch products from API (Supabase)
  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/products?category=${encodeURIComponent(category)}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const json = await response.json()
        if (!mounted) return
        
        const rows = json.products || []
        
        if (rows.length === 0) {
          console.log(`No products found for category: ${category}`)
          setDbProducts([])
          return
        }
        
        const mapped = rows.map((p: any) => ({
          id: p.id || Math.random(),
          name: p.name || 'Unknown Product',
          brand: p.brand || 'Unknown Brand',
          brandColor: p.brandColor || p.brand_color || 'blue',
          badge: p.badge || '',
          badgeColor: p.badgeColor || p.badge_color || 'gray',
          image: (p.images && p.images[0]) || p.image || getCategoryImage(p.category || category),
          rating: Number(p.rating || 4.0),
          reviewCount: Number(p.reviewCount || p.review_count || 50),
          firmness: p.firmness || 'Medium',
          firmnessLevel: p.firmnessLevel ?? p.firmness_level ?? 6,
          features: p.features || ['Premium Quality'],
          originalPrice: Number(p.originalPrice || p.original_price || p.price || 0),
          currentPrice: Number(p.currentPrice || p.current_price || p.price || 0),
          savings: Number(p.savings || Math.max(Number(p.originalPrice || p.original_price || p.price || 0) - Number(p.currentPrice || p.current_price || p.price || 0), 0)),
          freeDelivery: p.freeDelivery || p.free_delivery || 'Tomorrow',
          setupService: Boolean(p.setupService || p.setup_service),
          setupCost: p.setupCost || p.setup_cost ? Number(p.setupCost || p.setup_cost) : undefined,
          certifications: p.certifications || ['OEKO-TEX', 'Made in UK'],
          sizes: p.sizes || ['Single', 'Double', 'King', 'Super King'],
          selectedSize: p.selectedSize || p.selected_size || (p.sizes && p.sizes.length > 0 ? p.sizes[0] : 'Queen'),
          monthlyPrice: p.monthlyPrice || p.monthly_price ? Number(p.monthlyPrice || p.monthly_price) : Math.floor(Number(p.currentPrice || p.current_price || p.price || 0) / 12),
          images: p.images || [],
          category: p.category || category,
          type: p.type || 'Standard',
          size: p.size || 'Queen',
          comfortLevel: p.comfortLevel || p.comfort_level || 'Medium',
          inStore: Boolean(p.inStore !== false && p.in_store !== false),
          onSale: Boolean(p.onSale || p.on_sale),
        }))
        
        console.log(`Loaded ${mapped.length} products for category: ${category}`)
        setDbProducts(mapped)
      } catch (error) {
        console.error('Error fetching products:', error)
        if (mounted) {
          setError(error instanceof Error ? error.message : 'Failed to fetch products')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }
    
    fetchProducts()
    
    return () => { mounted = false }
  }, [category])

  // Filter products based on current filters
  const filteredProducts = dbProducts.filter(product => {
    if (product.category !== category) return false
    
    // Apply filters from CategoryFilters (sidebar) and HorizontalFilterBar
    if (filters['Mattress Type'] && filters['Mattress Type'].length > 0 && !filters['Mattress Type'].includes(product.type)) return false
    if (filters['Pillow Type'] && filters['Pillow Type'].length > 0 && !filters['Pillow Type'].includes(product.type)) return false
    if (filters['Product Type'] && filters['Product Type'].length > 0 && !filters['Product Type'].includes(product.type)) return false
    if (filters['Base Type'] && filters['Base Type'].length > 0 && !filters['Base Type'].includes(product.type)) return false

    if (filters['Size'] && filters['Size'].length > 0 && !filters['Size'].includes(product.size)) return false
    if (filters['Firmness'] && filters['Firmness'].length > 0 && !filters['Firmness'].includes(product.firmness)) return false
    if (filters['Features'] && filters['Features'].length > 0) {
      const hasAllFeatures = filters['Features'].every((f: string) => product.features.includes(f));
      if (!hasAllFeatures) return false;
    }
    if (filters['Brand'] && filters['Brand'].length > 0 && !filters['Brand'].includes(product.brand)) return false
    if (filters['Material'] && filters['Material'].length > 0 && !filters['Material'].includes(product.features.find(f => f.includes('Material')) || '')) return false // Simplified material check
    if (filters['Fill Material'] && filters['Fill Material'].length > 0 && !filters['Fill Material'].includes(product.features.find(f => f.includes('Fill')) || '')) return false // Simplified fill material check
    if (filters['Style'] && filters['Style'].length > 0 && !filters['Style'].includes(product.features.find(f => f.includes('Style')) || '')) return false // Simplified style check

    if (filters.priceRange && (product.currentPrice < filters.priceRange[0] || product.currentPrice > filters.priceRange[1])) return false
    
    if (filters['In-store'] && !product.inStore) return false
    if (filters['Sale'] && !product.onSale) return false

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.currentPrice - b.currentPrice
      case "price-high":
        return b.currentPrice - a.currentPrice
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      case "popular": // Default sort
      default:
        return b.reviewCount - a.reviewCount // Example: sort by review count for popular
    }
  })

  // Paginate products
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage)

  return (
    <div className="flex-1">
      {/* Products Grid */}
      {error && <div className="text-sm text-red-600 mb-4">{error}</div>}
      {loading && <div className="text-sm text-gray-600 mb-4">Loading products…</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="h-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
                              className={page === currentPage ? "bg-blue-900 hover:bg-blue-800" : ""}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
