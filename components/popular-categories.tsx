"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Snowflake, Waves, Weight, ArrowUpFromLine, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface PopularCategory {
  name: string
  icon: React.ElementType
  itemsCount: number
  filterKey: string
  filterValue: string
}

interface PopularCategoriesProps {
  onCategorySelect: (filterKey: string, filterValue: string) => void
}

export function PopularCategories({ onCategorySelect }: PopularCategoriesProps) {
  const categories: PopularCategory[] = [
    { name: "Most Cooling", icon: Snowflake, itemsCount: 10, filterKey: "Features", filterValue: "Cooling" },
    { name: "Soft Comfort", icon: Waves, itemsCount: 8, filterKey: "Firmness", filterValue: "Soft" },
    { name: "Firm Comfort", icon: Waves, itemsCount: 7, filterKey: "Firmness", filterValue: "Firm" },
    { name: "Medium Comfort", icon: Waves, itemsCount: 16, filterKey: "Firmness", filterValue: "Medium" },
    { name: "Heavy people", icon: Weight, itemsCount: 12, filterKey: "Features", filterValue: "Heavy Duty" },
    { name: "Most Support", icon: ArrowUpFromLine, itemsCount: 14, filterKey: "Features", filterValue: "Extra Support" },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Popular categories</h2>
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Card 
              key={category.name} 
              className="flex-shrink-0 w-40 h-32 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors"
              onClick={() => onCategorySelect(category.filterKey, category.filterValue)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <category.icon className="h-8 w-8 text-orange-500 mb-2" />
                <p className="font-medium text-gray-800">{category.name}</p>
                <p className="text-sm text-gray-500">{category.itemsCount} Items</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
