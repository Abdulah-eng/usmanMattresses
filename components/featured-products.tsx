"use client"

import { ProductCard } from "@/components/product-card"

export function FeaturedProducts() {
  const featuredProducts = [
    {
      id: 1,
      name: "King Arthur Mattress",
      brand: "ARTHUR SLEEP",
      brandColor: "orange",
      badge: "Best Seller",
      badgeColor: "orange",
      image: "/mattress-image.svg",
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
      name: "Dream Mirapocket 1000 Mattress",
      brand: "SILENTNIGHT",
      brandColor: "orange",
      badge: "New Model",
      badgeColor: "gray",
      image: "/mattress-image.svg",
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
      images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop"]
    },
    {
      id: 3,
      name: "Ice Arthur Mattress",
      brand: "ARTHUR SLEEP",
      brandColor: "orange",
      badge: "Cooling",
      badgeColor: "gray",
      image: "/mattress-image.svg",
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

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
