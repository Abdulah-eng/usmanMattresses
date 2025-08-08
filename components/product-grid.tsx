"use client"

import { useState } from "react"
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

  // Mock products data - extended to support new filters
  const allProducts = [
    {
      id: 1,
      name: "King Arthur Mattress",
      brand: "ARTHUR SLEEP",
      brandColor: "orange",
      badge: "Best Seller",
      badgeColor: "orange",
      image: getCategoryImage('mattresses'),
      rating: 4.8,
      reviewCount: 127,
      firmness: "MEDIUM FIRM",
      firmnessLevel: 7,
      features: ["Bamboo cover", "Motion isolation", "Edge support", "CertiPUR foam"],
      originalPrice: 499.00,
      currentPrice: 424.15,
      savings: 74.85,
      freeDelivery: "Mon, 11 Aug",
      setupService: true,
      setupCost: 49,
      certifications: ["OEKO-TEX", "CertiPUR-US", "Made in UK", "100-Night Trial", "10-Year Warranty"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "King",
      monthlyPrice: 35,
      images: [
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop',
      ],
      category: "mattresses",
      type: "Memory Foam",
      size: "King Size",
      comfortLevel: "Firm",
      inStore: true,
      onSale: true
    },
    {
      id: 2,
      name: "Dream Mirapocket 1000 Mattress",
      brand: "SILENTNIGHT",
      brandColor: "orange",
      badge: "New Model",
      badgeColor: "gray",
      image: getCategoryImage('mattresses'),
      rating: 4.0,
      reviewCount: 256,
      firmness: "MEDIUM",
      firmnessLevel: 6,
      features: ["ECO COMFORT™", "1000 POCKET SPRINGS", "24CM DEPTH", "Motion isolation"],
      originalPrice: 342.00,
      currentPrice: 290.70,
      savings: 51.30,
      freeDelivery: "Tomorrow",
      setupService: false,
      certifications: ["OEKO-TEX", "Made in UK", "100-Night Trial", "5-Year Warranty"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Double",
      monthlyPrice: 25,
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop',
      ],
      category: "mattresses",
      type: "Spring",
      size: "Double",
      comfortLevel: "Medium",
      inStore: false,
      onSale: true
    },
    {
      id: 3,
      name: "Ice Arthur Mattress",
      brand: "ARTHUR SLEEP",
      brandColor: "orange",
      badge: "Cooling",
      badgeColor: "gray",
      image: getCategoryImage('mattresses'),
      rating: 4.5,
      reviewCount: 189,
      firmness: "MEDIUM",
      firmnessLevel: 6,
      features: ["GEL FOAM", "3000 POCKET SPRINGS", "30CM DEPTH", "Cooling", "Edge support"],
      originalPrice: 559.00,
      currentPrice: 475.15,
      savings: 83.85,
      freeDelivery: "Tomorrow",
      setupService: true,
      setupCost: 49,
      certifications: ["OEKO-TEX", "CertiPUR-US", "Made in UK", "100-Night Trial", "10-Year Warranty"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "King",
      monthlyPrice: 40,
      images: [
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
      ],
      category: "mattresses",
      type: "Hybrid",
      size: "King Size",
      comfortLevel: "Medium",
      inStore: true,
      onSale: false
    },
    {
      id: 4,
      name: "FRIO 5-Sided Premium Cooling Mattress Protector",
      brand: "MattressKing",
      brandColor: "blue",
      badge: "Best Seller",
      badgeColor: "orange",
      image: getCategoryImage('bedding'),
      rating: 4.7,
      reviewCount: 500,
      firmness: "N/A",
      firmnessLevel: 0,
      features: ["Cooling", "Waterproof"],
      originalPrice: 90.00,
      currentPrice: 75.95,
      savings: 14.05,
      freeDelivery: "Tomorrow",
      setupService: false,
      certifications: ["OEKO-TEX", "Made in UK", "100-Night Trial"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Queen",
      monthlyPrice: 8,
      images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'],
      category: "bedding",
      type: "Mattress Protectors",
      size: "Queen",
      comfortLevel: "N/A",
      inStore: true,
      onSale: true
    },
    {
      id: 5,
      name: "Premium Smooth Waterproof Mattress Protector",
      brand: "MattressKing",
      brandColor: "blue",
      badge: "Best Seller",
      badgeColor: "orange",
      image: getCategoryImage('bedding'),
      rating: 4.5,
      reviewCount: 300,
      firmness: "N/A",
      firmnessLevel: 0,
      features: ["Waterproof"],
      originalPrice: 55.00,
      currentPrice: 45.95,
      savings: 9.05,
      freeDelivery: "Tomorrow",
      setupService: false,
      certifications: ["OEKO-TEX", "Made in UK"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Queen",
      monthlyPrice: 6,
      images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'],
      category: "bedding",
      type: "Mattress Protectors",
      size: "Queen",
      comfortLevel: "N/A",
      inStore: false,
      onSale: true
    },
    {
      id: 6,
      name: "Encase HD 360° Mattress Protector",
      brand: "MattressKing",
      brandColor: "blue",
      badge: "New",
      badgeColor: "gray",
      image: getCategoryImage('bedding'),
      rating: 4.3,
      reviewCount: 150,
      firmness: "N/A",
      firmnessLevel: 0,
      features: ["360 Protection"],
      originalPrice: 100.00,
      currentPrice: 84.95,
      savings: 15.05,
      freeDelivery: "Tomorrow",
      setupService: false,
      certifications: ["OEKO-TEX", "Made in UK"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Queen",
      monthlyPrice: 9,
      images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'],
      category: "bedding",
      type: "Mattress Protectors",
      size: "Queen",
      comfortLevel: "N/A",
      inStore: true,
      onSale: false
    },
    {
      id: 7,
      name: "Soft Washed Microfiber Sheets",
      brand: "MattressKing",
      brandColor: "blue",
      badge: "Best Seller",
      badgeColor: "orange",
      image: getCategoryImage('bedding'),
      rating: 4.6,
      reviewCount: 400,
      firmness: "N/A",
      firmnessLevel: 0,
      features: ["Soft", "Wrinkle-Free"],
      originalPrice: 50.00,
      currentPrice: 44.95,
      savings: 5.05,
      freeDelivery: "Tomorrow",
      setupService: false,
      certifications: ["OEKO-TEX", "Made in UK"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Queen",
      monthlyPrice: 5,
      images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'],
      category: "bedding",
      type: "Sheets",
      size: "Queen",
      comfortLevel: "N/A",
      inStore: true,
      onSale: true
    },
    {
      id: 8,
      name: "Memory Foam Pillow",
      brand: "MattressKing",
      brandColor: "blue",
      badge: "Comfort",
      badgeColor: "gray",
      image: getCategoryImage('pillows'),
      rating: 4.5,
      reviewCount: 250,
      firmness: "Medium",
      firmnessLevel: 6,
      features: ["Memory Foam", "Pressure Relief"],
      originalPrice: 60.00,
      currentPrice: 49.99,
      savings: 10.01,
      freeDelivery: "Tomorrow",
      setupService: false,
      certifications: ["OEKO-TEX", "Made in UK"],
      sizes: ["Standard", "Queen", "King"],
      selectedSize: "Standard",
      monthlyPrice: 6,
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'],
      category: "pillows",
      type: "Memory Foam",
      size: "Standard",
      comfortLevel: "Medium",
      inStore: true,
      onSale: false
    },
    {
      id: 9,
      name: "Adjustable Base Pro",
      brand: "Adjustable Sleep",
      brandColor: "blue",
      badge: "Smart",
      badgeColor: "gray",
      image: getCategoryImage('adjustable-bases'),
      rating: 4.9,
      reviewCount: 600,
      firmness: "N/A",
      firmnessLevel: 0,
      features: ["Massage", "USB Ports", "Zero Gravity"],
      originalPrice: 1500.00,
      currentPrice: 1299.00,
      savings: 201.00,
      freeDelivery: "Tomorrow",
      setupService: true,
      setupCost: 99,
      certifications: ["Made in UK", "5-Year Warranty"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Queen",
      monthlyPrice: 65,
      images: ['https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop'],
      category: "adjustable-bases",
      type: "Premium",
      size: "Queen",
      comfortLevel: "N/A",
      inStore: true,
      onSale: true
    },
    {
      id: 10,
      name: "Heavy Duty Mattress",
      brand: "Strong Sleep",
      brandColor: "orange",
      badge: "Durable",
      badgeColor: "orange",
      image: getCategoryImage('mattresses'),
      rating: 4.7,
      reviewCount: 300,
      firmness: "Firm",
      firmnessLevel: 9,
      features: ["Heavy Duty", "Extra Support", "Edge support"],
      originalPrice: 700.00,
      currentPrice: 620.00,
      savings: 80.00,
      freeDelivery: "Tomorrow",
      setupService: true,
      setupCost: 49,
      certifications: ["OEKO-TEX", "Made in UK", "100-Night Trial", "10-Year Warranty"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "King",
      monthlyPrice: 55,
      images: ['https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop'],
      category: "mattresses",
      type: "Hybrid",
      size: "King Size",
      comfortLevel: "Firm",
      inStore: true,
      onSale: false
    },
    {
      id: 11,
      name: "Cooling Gel Pillow",
      brand: "Cool Dreams",
      brandColor: "blue",
      badge: "Cooling",
      badgeColor: "gray",
      image: getCategoryImage('pillows'),
      rating: 4.6,
      reviewCount: 180,
      firmness: "Soft",
      firmnessLevel: 3,
      features: ["Cooling Gel"],
      originalPrice: 75.00,
      currentPrice: 65.00,
      savings: 10.00,
      freeDelivery: "Tomorrow",
      setupService: false,
      certifications: ["OEKO-TEX", "Made in UK"],
      sizes: ["Standard", "Queen", "King"],
      selectedSize: "Queen",
      monthlyPrice: 8,
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'],
      category: "pillows",
      type: "Cooling Gel",
      size: "Queen",
      comfortLevel: "Soft",
      inStore: false,
      onSale: true
    },
    {
      id: 12,
      name: "Organic Cotton Sheets",
      brand: "Eco Sleep",
      brandColor: "blue",
      badge: "Organic",
      badgeColor: "gray",
      image: getCategoryImage('bedding'),
      rating: 4.8,
      reviewCount: 450,
      firmness: "N/A",
      firmnessLevel: 0,
      features: ["Organic", "Hypoallergenic"],
      originalPrice: 120.00,
      currentPrice: 99.00,
      savings: 21.00,
      freeDelivery: "Tomorrow",
      setupService: false,
      certifications: ["OEKO-TEX", "Made in UK", "Organic Certified"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "King",
      monthlyPrice: 10,
      images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'],
      category: "bedding",
      type: "Sheets",
      size: "King",
      comfortLevel: "N/A",
      inStore: true,
      onSale: false
    },
    // Add more products as needed to fill out categories and filters
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 13,
      name: `Comfort ${category} ${i + 1}`,
      brand: "SLEEPWELL",
      brandColor: "blue",
      badge: "Popular",
      badgeColor: "gray",
      image: getCategoryImage(category),
      rating: 4.2 + (i % 6) * 0.1,
      reviewCount: 50 + (i * 25) % 500,
      firmness: ["SOFT", "MEDIUM", "FIRM"][i % 3],
      firmnessLevel: [3, 6, 8][i % 3],
      features: ["Premium Quality", "Long Lasting", "Comfortable", "Motion Isolation", "Edge Support"],
      originalPrice: 300 + (i * 20) % 400,
      currentPrice: 250 + (i * 15) % 300,
      savings: 50 + (i * 5) % 100,
      freeDelivery: "Tomorrow",
      setupService: i % 2 === 0,
      setupCost: i % 2 === 0 ? 49 : undefined,
      certifications: ["OEKO-TEX", "Made in UK", "100-Night Trial"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: ["Single", "Double", "King", "Super King"][i % 4],
      monthlyPrice: Math.floor((250 + (i * 15) % 300) / 12),
      images: [getCategoryImage(category)],
      category,
      type: ["Memory Foam", "Spring", "Hybrid", "Latex", "Adjustable"][i % 5],
      size: ["Twin", "Twin XL", "Full", "Queen", "King", "California King"][i % 6],
      comfortLevel: ["Soft", "Medium", "Firm", "Extra Firm"][i % 4],
      inStore: i % 2 === 0,
      onSale: i % 3 === 0
    }))
  ]

  // Filter products based on current filters
  const filteredProducts = allProducts.filter(product => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
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
