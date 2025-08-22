"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Snowflake, Waves, Weight, ArrowUpFromLine, ChevronRight, Bed, ArrowUp } from 'lucide-react'
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

// Custom icon for Heavy people category
const HeavyPeopleIcon = () => (
  <div className="relative">
    <Bed className="h-8 w-8 text-blue-600" />
    <div className="absolute -top-1 -right-1 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
      240+
    </div>
  </div>
)

// Custom icon for Most Support category
const MostSupportIcon = () => (
  <div className="flex flex-col items-center">
    <Waves className="h-6 w-6 text-blue-600 mb-1" />
    <div className="flex gap-1">
      <ArrowUp className="h-3 w-3 text-blue-600" />
      <ArrowUp className="h-3 w-3 text-blue-600" />
      <ArrowUp className="h-3 w-3 text-blue-600" />
    </div>
  </div>
)

// Custom icon for Soft/Medium Comfort with circle above waves
const ComfortIcon = () => (
  <div className="flex flex-col items-center">
    <div className="w-2 h-2 bg-blue-600 rounded-full mb-1"></div>
    <Waves className="h-6 w-6 text-blue-600" />
  </div>
)

// Custom icon for Firm Comfort with lines and circle
const FirmComfortIcon = () => (
  <div className="flex flex-col items-center">
    <div className="w-2 h-2 bg-blue-600 rounded-full mb-1"></div>
    <div className="flex flex-col gap-1">
      <div className="w-6 h-0.5 bg-blue-600"></div>
      <div className="w-6 h-0.5 bg-blue-600"></div>
    </div>
  </div>
)

export function PopularCategories({ onCategorySelect }: PopularCategoriesProps) {
  const categories: PopularCategory[] = [
    { name: "Most Cooling", icon: Snowflake, itemsCount: 10, filterKey: "Features", filterValue: "Cooling" },
    { name: "Soft Comfort", icon: ComfortIcon, itemsCount: 8, filterKey: "Firmness", filterValue: "Soft" },
    { name: "Firm Comfort", icon: FirmComfortIcon, itemsCount: 7, filterKey: "Firmness", filterValue: "Firm" },
    { name: "Medium Comfort", icon: ComfortIcon, itemsCount: 16, filterKey: "Firmness", filterValue: "Medium" },
    { name: "Heavy people", icon: HeavyPeopleIcon, itemsCount: 12, filterKey: "Features", filterValue: "Heavy Duty" },
    { name: "Most Support", icon: MostSupportIcon, itemsCount: 14, filterKey: "Features", filterValue: "Extra Support" },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Popular categories</h2>
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Card 
              key={category.name} 
              className="flex-shrink-0 w-40 h-32 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors border border-gray-200 bg-white"
              onClick={() => onCategorySelect(category.filterKey, category.filterValue)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center">
                {category.name === "Heavy people" ? (
                  <HeavyPeopleIcon />
                ) : category.name === "Most Support" ? (
                  <MostSupportIcon />
                ) : category.name === "Soft Comfort" || category.name === "Medium Comfort" ? (
                  <ComfortIcon />
                ) : category.name === "Firm Comfort" ? (
                  <FirmComfortIcon />
                ) : (
                  <category.icon className="h-8 w-8 text-blue-600 mb-2" />
                )}
                <p className="font-medium text-gray-800">{category.name}</p>
                <p className="text-sm text-gray-500">{category.itemsCount} Items</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border-gray-200 hover:border-gray-300"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </div>
  )
}
