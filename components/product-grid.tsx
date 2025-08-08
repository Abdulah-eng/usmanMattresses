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

  // Mock products data - extended to support new filters
  const allProducts = [
    {
      id: 1,
      name: "King Arthur Mattress",
      brand: "ARTHUR SLEEP",
      brandColor: "orange",
      badge: "Good Housekeeping",
      badgeColor: "orange",
      image: "/mattress-image.svg",
      rating: 4.8,
      reviewCount: 344,
      firmness: "MEDIUM FIRM",
      features: ["20MM MEMORY FOAM", "2000 POCKET SPRINGS", "34CM DEPTH", "Cooling", "Extra Support"],
      originalPrice: 455.00,
      currentPrice: 386.75,
      savings: 68.25,
      freeDelivery: "Tomorrow",
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
      image: "/mattress-image.svg",
      rating: 4.0,
      reviewCount: 256,
      firmness: "MEDIUM",
      features: ["ECO COMFORT™", "1000 POCKET SPRINGS", "24CM DEPTH"],
      originalPrice: 342.00,
      currentPrice: 290.70,
      savings: 51.30,
      freeDelivery: "Tomorrow",
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
      badge: "New Model",
      badgeColor: "gray",
      image: "/mattress-image.svg",
      rating: 4.5,
      reviewCount: 189,
      firmness: "MEDIUM",
      features: ["GEL FOAM", "3000 POCKET SPRINGS", "30CM DEPTH", "Cooling"],
      originalPrice: 559.00,
      currentPrice: 475.15,
      savings: 83.85,
      freeDelivery: "Tomorrow",
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
      image: "/mattress-image.svg",
      rating: 4.7,
      reviewCount: 500,
      firmness: "N/A",
      features: ["Cooling", "Waterproof"],
      originalPrice: 90.00,
      currentPrice: 75.95,
      savings: 14.05,
      freeDelivery: "Tomorrow",
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
      image: "/mattress-image.svg",
      rating: 4.5,
      reviewCount: 300,
      firmness: "N/A",
      features: ["Waterproof"],
      originalPrice: 55.00,
      currentPrice: 45.95,
      savings: 9.05,
      freeDelivery: "Tomorrow",
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
      image: "/mattress-image.svg",
      rating: 4.3,
      reviewCount: 150,
      firmness: "N/A",
      features: ["360 Protection"],
      originalPrice: 100.00,
      currentPrice: 84.95,
      savings: 15.05,
      freeDelivery: "Tomorrow",
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
      image: "/mattress-image.svg",
      rating: 4.6,
      reviewCount: 400,
      firmness: "N/A",
      features: ["Soft", "Wrinkle-Free"],
      originalPrice: 50.00,
      currentPrice: 44.95,
      savings: 5.05,
      freeDelivery: "Tomorrow",
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
      image: "/mattress-image.svg",
      rating: 4.5,
      reviewCount: 250,
      firmness: "Medium",
      features: ["Memory Foam", "Pressure Relief"],
      originalPrice: 60.00,
      currentPrice: 49.99,
      savings: 10.01,
      freeDelivery: "Tomorrow",
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
      image: "/mattress-image.svg",
      rating: 4.9,
      reviewCount: 600,
      firmness: "N/A",
      features: ["Massage", "USB Ports", "Zero Gravity"],
      originalPrice: 1500.00,
      currentPrice: 1299.00,
      savings: 201.00,
      freeDelivery: "Tomorrow",
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
      image: "/mattress-image.svg",
      rating: 4.7,
      reviewCount: 300,
      firmness: "Firm",
      features: ["Heavy Duty", "Extra Support"],
      originalPrice: 700.00,
      currentPrice: 620.00,
      savings: 80.00,
      freeDelivery: "Tomorrow",
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
      image: "/mattress-image.svg",
      rating: 4.6,
      reviewCount: 180,
      firmness: "Soft",
      features: ["Cooling Gel"],
      originalPrice: 75.00,
      currentPrice: 65.00,
      savings: 10.00,
      freeDelivery: "Tomorrow",
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
      image: "/mattress-image.svg",
      rating: 4.8,
      reviewCount: 450,
      firmness: "N/A",
      features: ["Organic", "Hypoallergenic"],
      originalPrice: 120.00,
      currentPrice: 99.00,
      savings: 21.00,
      freeDelivery: "Tomorrow",
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
      image: "/mattress-image.svg",
      rating: 4.2 + Math.random() * 0.6,
      reviewCount: Math.floor(Math.random() * 500) + 50,
      firmness: ["SOFT", "MEDIUM", "FIRM"][Math.floor(Math.random() * 3)],
      features: ["Premium Quality", "Long Lasting", "Comfortable", "Motion Isolation", "Edge Support"],
      originalPrice: 300 + Math.random() * 400,
      currentPrice: 250 + Math.random() * 300,
      savings: 50 + Math.random() * 100,
      freeDelivery: "Tomorrow",
      category,
      type: ["Memory Foam", "Spring", "Hybrid", "Latex", "Adjustable"][Math.floor(Math.random() * 5)],
      size: ["Twin", "Twin XL", "Full", "Queen", "King", "California King"][Math.floor(Math.random() * 6)],
      comfortLevel: ["Soft", "Medium", "Firm", "Extra Firm"][Math.floor(Math.random() * 4)],
      inStore: Math.random() > 0.5,
      onSale: Math.random() > 0.5
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
          <ProductCard key={product.id} product={product} />
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
