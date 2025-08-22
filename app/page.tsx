"use client"

import { useState } from "react"
import HeroSection from "@/components/hero-section"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { MattressFinderPromo } from "@/components/mattress-finder-promo"
import { TrendingSection } from "@/components/trending-section"
import { CustomerGallery } from "@/components/customer-gallery"
import { IdeasGuides } from "@/components/ideas-guides"
import { CategoryFilterCards } from "@/components/category-filter-cards"
import { ReviewSection } from "@/components/review-section"
import { DealOfTheDay } from "@/components/deal-of-the-day"
import { MattressTypesSection } from "@/components/mattress-types-section"
import { SofaTypesSection } from "@/components/sofa-types-section"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('Silentnight mattresses')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <HeroSection onCategoryChange={setSelectedCategory} />
      <FeaturedProducts selectedCategory={selectedCategory} />
      <CategoryFilterCards />
      <MattressFinderPromo />
      <MattressTypesSection />
      <DealOfTheDay />
      <CustomerGallery />
      <IdeasGuides />
      <SofaTypesSection />
      <TrendingSection />
      <CategoryGrid />
      <ReviewSection />
    </div>
  )
}
