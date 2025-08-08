"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SlidersHorizontal, Bed, DollarSign, Waves, Store, Tag, ChevronDown } from 'lucide-react'

interface HorizontalFilterBarProps {
  category: string
  filters: Record<string, any>
  onFiltersChange: (filters: Record<string, any>) => void
  onOpenAllFilters: () => void
  sortBy: string
  onSortByChange: (value: string) => void
}

export function HorizontalFilterBar({ 
  category, 
  filters, 
  onFiltersChange, 
  onOpenAllFilters,
  sortBy,
  onSortByChange
}: HorizontalFilterBarProps) {

  const filterOptions: Record<string, Record<string, string[]>> = {
    mattresses: {
      "Size": ["Twin", "Twin XL", "Full", "Queen", "King", "California King"],
      "Feels": ["Soft", "Medium", "Firm", "Extra Firm"],
    },
    pillows: {
      "Size": ["Standard", "Queen", "King"],
      "Feels": ["Soft", "Medium", "Firm"],
    },
    bedding: {
      "Size": ["Twin", "Twin XL", "Full", "Queen", "King", "California King"],
    },
    "adjustable-bases": {
      "Size": ["Twin XL", "Full", "Queen", "King", "Split King"],
    },
    "box-springs": {
      "Size": ["Twin", "Twin XL", "Full", "Queen", "King", "California King"],
    }
  }

  const currentCategoryFilters = filterOptions[category] || {}

  const handleCheckboxFilterChange = (filterType: string, value: string, checked: boolean) => {
    const currentValues = Array.isArray(filters[filterType]) ? filters[filterType] : [];
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter((item: string) => item !== value);
    onFiltersChange({ ...filters, [filterType]: newValues });
  };

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: value });
  };

  const handleToggleFilterChange = (filterType: string) => {
    onFiltersChange({ ...filters, [filterType]: !filters[filterType] });
  };

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
      <div className="flex items-center gap-3 flex-wrap">
        <Button 
          className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-full flex items-center gap-2"
          onClick={onOpenAllFilters}
        >
          <SlidersHorizontal className="h-4 w-4" />
          All Filters
        </Button>

        {currentCategoryFilters["Size"] && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-6 py-2 rounded-full flex items-center gap-2">
                <Bed className="h-4 w-4" />
                Size
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4">
              <div className="space-y-2">
                {currentCategoryFilters["Size"].map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={Array.isArray(filters["Size"]) && filters["Size"].includes(size)}
                      onCheckedChange={(checked) => handleCheckboxFilterChange("Size", size, checked as boolean)}
                    />
                    <Label htmlFor={`size-${size}`}>{size}</Label>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="px-6 py-2 rounded-full flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-4 w-64">
            <Label className="mb-2 block">Price Range</Label>
            <Slider
              value={filters.priceRange || [0, 2000]}
              onValueChange={handlePriceRangeChange}
              max={2000}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>${filters.priceRange ? filters.priceRange[0] : 0}</span>
              <span>${filters.priceRange ? filters.priceRange[1] : 2000}</span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {currentCategoryFilters["Feels"] && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="px-6 py-2 rounded-full flex items-center gap-2">
                <Waves className="h-4 w-4" />
                Feels
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4">
              <div className="space-y-2">
                {currentCategoryFilters["Feels"].map((feel) => (
                  <div key={feel} className="flex items-center space-x-2">
                    <Checkbox
                      id={`feel-${feel}`}
                      checked={Array.isArray(filters["Feels"]) && filters["Feels"].includes(feel)}
                      onCheckedChange={(checked) => handleCheckboxFilterChange("Feels", feel, checked as boolean)}
                    />
                    <Label htmlFor={`feel-${feel}`}>{feel}</Label>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Button 
          variant={filters["In-store"] ? "default" : "outline"} 
          className={`px-6 py-2 rounded-full flex items-center gap-2 ${filters["In-store"] ? 'bg-blue-900 hover:bg-blue-800 text-white' : ''}`}
          onClick={() => handleToggleFilterChange("In-store")}
        >
          <Store className="h-4 w-4" />
          In-store
        </Button>

        <Button 
          variant={filters["Sale"] ? "default" : "outline"} 
          className={`px-6 py-2 rounded-full flex items-center gap-2 ${filters["Sale"] ? 'bg-blue-900 hover:bg-blue-800 text-white' : ''}`}
          onClick={() => handleToggleFilterChange("Sale")}
        >
          <Tag className="h-4 w-4" />
          Sale
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-600">Sort by:</span>
        <Select value={sortBy} onValueChange={onSortByChange}>
          <SelectTrigger className="w-36 rounded-full">
            <SelectValue placeholder="Popular" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
