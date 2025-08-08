import { ProductCard } from "@/components/product-card"

export function FeaturedProducts() {
  const featuredProducts = [
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
      features: ["20MM MEMORY FOAM", "2000 POCKET SPRINGS", "34CM DEPTH"],
      originalPrice: 455.00,
      currentPrice: 386.75,
      savings: 68.25,
      freeDelivery: "Tomorrow"
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
      freeDelivery: "Tomorrow"
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
      features: ["GEL FOAM", "3000 POCKET SPRINGS", "30CM DEPTH"],
      originalPrice: 559.00,
      currentPrice: 475.15,
      savings: 83.85,
      freeDelivery: "Tomorrow"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most popular mattresses loved by thousands of customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
