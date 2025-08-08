"use client"

import { ProductGridNew } from "@/components/product-grid-new"
import { ProductDetailCard } from "@/components/product-detail-card"
import { useState } from "react"

export default function ProductShowcasePage() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

  const showcaseProducts = [
    {
      id: 1,
      name: "Bedora Living Premium",
      brand: "Bedora Living",
      brandColor: "orange",
      badge: "Best Seller",
      badgeColor: "orange",
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
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
      images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"]
    },
    {
      id: 2,
      name: "Dream Mirapocket 1000",
      brand: "SILENTNIGHT",
      brandColor: "orange",
      badge: "New Model",
      badgeColor: "gray",
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
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
      images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"]
    },
    {
      id: 3,
      name: "Ice Arthur Cooling",
      brand: "ARTHUR SLEEP",
      brandColor: "orange",
      badge: "Cooling",
      badgeColor: "gray",
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
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
      images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop"]
    }
  ]

  const selectedProductData = showcaseProducts.find(p => p.id === selectedProduct)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Product Showcase</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedProduct(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedProduct === null
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setSelectedProduct(1)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedProduct !== null
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Detail View
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {selectedProduct === null ? (
        <ProductGridNew 
          products={showcaseProducts} 
          title="Product Cards with Orange Color Scheme" 
        />
      ) : selectedProductData ? (
        <ProductDetailCard product={selectedProductData} />
      ) : null}
    </div>
  )
}
