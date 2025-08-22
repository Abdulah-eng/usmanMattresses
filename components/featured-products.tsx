"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"

interface FeaturedProductsProps {
  selectedCategory?: string
}

interface Product {
  id: number
  name: string
  brand: string
  brandColor: string
  badge: string
  badgeColor: string
  image: string
  rating: number
  reviewCount: number
  firmness: string
  firmnessLevel: number
  features: string[]
  originalPrice: number
  currentPrice: number
  savings: number
  freeDelivery: string
  setupService: boolean
  setupCost?: number
  certifications: string[]
  sizes: string[]
  selectedSize: string
  monthlyPrice: number
  images: string[]
  category: string
  type: string
  size: string
  comfortLevel: string
  inStore: boolean
  onSale: boolean
  price: number
}

export function FeaturedProducts({ selectedCategory = 'Silentnight mattresses' }: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Extract category from selectedCategory string (e.g., "Silentnight mattresses" -> "mattresses")
  const getCategoryFromSelection = (selection: string): string => {
    if (selection.includes('mattresses')) return 'mattresses'
    if (selection.includes('beds')) return 'beds'
    if (selection.includes('sofas')) return 'sofas'
    if (selection.includes('pillows')) return 'pillows'
    if (selection.includes('toppers')) return 'toppers'
    if (selection.includes('bunkbeds')) return 'bunkbeds'
    if (selection.includes('kids')) return 'kids'
    if (selection.includes('guides')) return 'guides'
    return 'mattresses' // default fallback
  }

  // Fetch products from database based on selected category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const category = getCategoryFromSelection(selectedCategory)
        const response = await fetch(`/api/products?category=${encodeURIComponent(category)}&limit=4`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setProducts(data.products || [])
      } catch (err) {
        console.error('Error fetching featured products:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
        // Fallback to empty array if API fails
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [selectedCategory])

  // Fallback products if no products found or error occurs
  const fallbackProducts: Product[] = [
    {
      id: 1,
      name: "Premium Memory Foam Mattress",
      brand: "SLEEP COMFORT",
      brandColor: "blue",
      badge: "Premium",
      badgeColor: "blue",
      image: "/mattress-image.svg",
      rating: 4.7,
      reviewCount: 203,
      firmness: "MEDIUM SOFT",
      firmnessLevel: 5,
      features: ["Memory Foam", "Temperature Regulation", "Motion Isolation"],
      originalPrice: 599.00,
      currentPrice: 509.15,
      savings: 89.85,
      freeDelivery: "Tomorrow",
      setupService: true,
      setupCost: 49,
      certifications: ["OEKO-TEX", "CertiPUR-US", "Made in UK", "100-Night Trial", "10-Year Warranty"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "King",
      monthlyPrice: 42,
      images: ["/mattress-image.svg"],
      category: "mattresses",
      type: "Memory Foam",
      size: "King Size",
      comfortLevel: "Medium Soft",
      inStore: true,
      onSale: true,
      price: 509.15
    },
    {
      id: 2,
      name: "Luxury Hybrid Mattress",
      brand: "SLEEP LUXURY",
      brandColor: "purple",
      badge: "Luxury",
      badgeColor: "purple",
      image: "/mattress-image.svg",
      rating: 4.9,
      reviewCount: 156,
      firmness: "MEDIUM FIRM",
      firmnessLevel: 7,
      features: ["Hybrid Technology", "Pocket Springs", "Memory Foam", "Edge Support"],
      originalPrice: 799.00,
      currentPrice: 679.15,
      savings: 119.85,
      freeDelivery: "Tomorrow",
      setupService: true,
      setupCost: 49,
      certifications: ["OEKO-TEX", "CertiPUR-US", "Made in UK", "100-Night Trial", "15-Year Warranty"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "King",
      monthlyPrice: 57,
      images: ["/mattress-image.svg"],
      category: "mattresses",
      type: "Hybrid",
      size: "King Size",
      comfortLevel: "Medium Firm",
      inStore: true,
      onSale: true,
      price: 679.15
    },
    {
      id: 3,
      name: "Cooling Gel Mattress",
      brand: "COOL SLEEP",
      brandColor: "cyan",
      badge: "Cooling",
      badgeColor: "cyan",
      image: "/mattress-image.svg",
      rating: 4.6,
      reviewCount: 89,
      firmness: "MEDIUM",
      firmnessLevel: 6,
      features: ["Gel Technology", "Cooling Properties", "Motion Isolation", "Hypoallergenic"],
      originalPrice: 449.00,
      currentPrice: 381.65,
      savings: 67.35,
      freeDelivery: "Tomorrow",
      setupService: false,
      setupCost: undefined,
      certifications: ["OEKO-TEX", "CertiPUR-US", "Made in UK", "100-Night Trial", "8-Year Warranty"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Double",
      monthlyPrice: 32,
      images: ["/mattress-image.svg"],
      category: "mattresses",
      type: "Gel Foam",
      size: "Double Size",
      comfortLevel: "Medium",
      inStore: true,
      onSale: true,
      price: 381.65
    },
    {
      id: 4,
      name: "Organic Natural Mattress",
      brand: "NATURE SLEEP",
      brandColor: "green",
      badge: "Organic",
      badgeColor: "green",
      image: "/mattress-image.svg",
      rating: 4.8,
      reviewCount: 127,
      firmness: "MEDIUM SOFT",
      firmnessLevel: 5,
      features: ["100% Organic", "Natural Materials", "Chemical Free", "Eco Friendly"],
      originalPrice: 899.00,
      currentPrice: 764.15,
      savings: 134.85,
      freeDelivery: "Tomorrow",
      setupService: true,
      setupCost: 49,
      certifications: ["GOTS Certified", "OEKO-TEX", "Made in UK", "100-Night Trial", "20-Year Warranty"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "King",
      monthlyPrice: 64,
      images: ["/mattress-image.svg"],
      category: "mattresses",
      type: "Organic",
      size: "King Size",
      comfortLevel: "Medium Soft",
      inStore: true,
      onSale: true,
      price: 764.15
    }
  ]

  // Use database products if available, otherwise fallback to hardcoded products
  const displayProducts = products.length > 0 ? products : fallbackProducts

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sleep Luxury, Every Night
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our premium collection of {selectedCategory.toLowerCase()} designed for ultimate comfort and luxury. 
            {loading ? ' Loading...' : ` Showing ${displayProducts.length} products from our ${getCategoryFromSelection(selectedCategory)} collection.`}
          </p>
        </div>

        {error && (
          <div className="text-center mb-8">
            <p className="text-red-600 text-sm">
              {error} - Showing fallback products
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {products.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Products loaded from database • Category: {getCategoryFromSelection(selectedCategory)}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
