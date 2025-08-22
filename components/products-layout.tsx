"use client"

import { useState, useEffect } from "react"
import { CategoryFilters } from "@/components/category-filters"
import { ProductGrid } from "@/components/product-grid"
import { PopularCategories } from "@/components/popular-categories"
import { HorizontalFilterBar } from "@/components/horizontal-filter-bar"
import { Button } from "@/components/ui/button"
import { Filter, X } from 'lucide-react'

interface ProductsLayoutProps {
  category: string
}

export function ProductsLayout({ category }: ProductsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [productCount, setProductCount] = useState(0)
  const [filters, setFilters] = useState<Record<string, any>>({
    priceRange: [0, 2000],
    'Mattress Type': [],
    Firmness: [],
    Size: [],
    Features: [],
    Brand: [],
    'Pillow Type': [],
    'Fill Material': [],
    'Product Type': [],
    'Material': [],
    'Thread Count': [],
    'Base Type': [],
    'Style': [],
    'In-store': false,
    'Sale': false
  })
  const [sortBy, setSortBy] = useState("popular")

  // Fetch product count for the category
  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await fetch(`/api/products?category=${encodeURIComponent(category)}`)
        if (response.ok) {
          const data = await response.json()
          setProductCount(data.products?.length || 0)
        }
      } catch (error) {
        console.error('Error fetching product count:', error)
        setProductCount(0)
      }
    }

    fetchProductCount()
  }, [category])

  const categoryTitles: Record<string, string> = {
    mattresses: "Mattresses",
    beds: "Beds",
    "bed-frames": "Bed Frames",
    sofas: "Sofas",
    "bunk-beds": "Bunk Beds",
    pillows: "Pillows",
    bedding: "Bedding",
    "adjustable-bases": "Adjustable Bases",
    "box-springs": "Box Springs & Bed Bases",
    toppers: "Mattress Toppers",
    kids: "Kids Furniture & Bedding",
    sale: "Sale & Clearance"
  }

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters)
  }

  const handlePopularCategorySelect = (filterKey: string, filterValue: string) => {
    setFilters(prevFilters => {
      const currentValues = Array.isArray(prevFilters[filterKey]) ? prevFilters[filterKey] : [];
      const newValues = currentValues.includes(filterValue)
        ? currentValues.filter((item: string) => item !== filterValue)
        : [...currentValues, filterValue];
      return { ...prevFilters, [filterKey]: newValues };
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{categoryTitles[category] || "Products"}</h1>
          <p className="text-sm text-gray-500">{productCount} items</p>
        </div>
        
        <Button
          variant="outline"
          className="lg:hidden border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Popular Categories */}
      <PopularCategories onCategorySelect={handlePopularCategorySelect} />

      {/* Horizontal Filter Bar */}
      <HorizontalFilterBar 
        category={category}
        filters={filters}
        onFiltersChange={handleFilterChange}
        onOpenAllFilters={() => setSidebarOpen(true)}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <CategoryFilters category={category} onFiltersChange={handleFilterChange} />
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-80 bg-white overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CategoryFilters category={category} onFiltersChange={handleFilterChange} />
              </div>
            </div>
          </div>
        )}

        <ProductGrid category={category} filters={filters} sortBy={sortBy} />
      </div>
    </div>
  )
}
