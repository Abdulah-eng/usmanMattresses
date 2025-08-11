import { HeroSection } from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryFilterCards } from "@/components/category-filter-cards"
import { ReviewSection } from "@/components/review-section"
import { ShopBySizeSection } from "@/components/shop-by-size-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <ShopBySizeSection />
      <CategoryGrid />
      <FeaturedProducts />
      <CategoryFilterCards />
      <ReviewSection />
    </div>
  )
}
