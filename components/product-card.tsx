"use client"

import Image from "next/image"
import { Star, Circle, Zap, Layers, Ruler, Truck } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

interface Product {
  id: number
  name: string
  brand: string
  brandColor?: string
  badge?: string
  badgeColor?: string
  image?: string
  rating?: number
  reviewCount?: number
  firmness?: string
  firmnessLevel?: number
  features?: string[]
  originalPrice?: number
  currentPrice?: number
  savings?: number
  freeDelivery?: string
  setupService?: boolean
  setupCost?: number
  certifications?: string[]
  sizes?: string[]
  selectedSize?: string
  monthlyPrice?: number
  images?: string[]
  category: string
  type?: string
  price?: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const categoryForLink = product.category || 'mattresses'

  const safeProduct = {
    ...product,
    name: product.name || 'Unknown Product',
    brand: product.brand || 'Unknown Brand',
    rating: product.rating || 4.0,
    reviewCount: product.reviewCount || 0,
    firmness: product.firmness || 'Medium',
    firmnessLevel: product.firmnessLevel || 6,
    features: product.features || ['Premium Quality'],
    originalPrice: product.originalPrice || product.price || 0,
    currentPrice: product.currentPrice || product.price || 0,
    savings: product.savings || 0,
    sizes: product.sizes || ['Queen'],
    images: product.images || [product.image || ''],
    category: product.category || 'mattresses',
    type: product.type || 'Standard',
  }

  const renderStars = (rating: number) => {
    const safeRating = Math.max(0, Math.min(5, rating))
    const fullStars = Math.floor(safeRating)
    const hasHalfStar = safeRating % 1 !== 0
    
    return Array.from({ length: 5 }, (_, i) => {
      if (i < fullStars) {
        return <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
      } else if (i === fullStars && hasHalfStar) {
        return <Star key={i} className="h-4 w-4 fill-orange-500 text-orange-500" />
      } else {
        return <Star key={i} className="h-4 w-4 text-gray-300" />
      }
    })
  }

  const getFeatureIcon = (feature: string) => {
    const featureLower = feature.toLowerCase()
    if (featureLower.includes('firm') || featureLower.includes('medium')) return <Circle className="h-4 w-4" />
    if (featureLower.includes('memory') || featureLower.includes('foam')) return <Layers className="h-4 w-4" />
    if (featureLower.includes('spring') || featureLower.includes('pocket')) return <Zap className="h-4 w-4" />
    if (featureLower.includes('depth') || featureLower.includes('cm')) return <Ruler className="h-4 w-4" />
    return <Circle className="h-4 w-4" />
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: safeProduct.id,
        name: safeProduct.name,
        brand: safeProduct.brand,
        image: safeProduct.image || safeProduct.images?.[0] || '',
        currentPrice: safeProduct.currentPrice || safeProduct.price || 0,
        originalPrice: safeProduct.originalPrice || safeProduct.price || 0,
        size: safeProduct.selectedSize || 'Queen'
      }
    })
  }

  return (
    <Link href={`/products/${categoryForLink}/${safeProduct.id}`} className="block">
      <Card className="group product-card bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden cursor-pointer">
        <CardContent className="p-6 pr-0">
          {/* Product Image - Moved Up and Made Larger */}
          <div className="relative mb-6 -mx-6 -mt-6">
            <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
              <Image
                src={safeProduct.images?.[selectedImage] || safeProduct.image || '/mattress-image.svg'}
                alt={safeProduct.name}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Free Gift Badge - Top Left */}
            <div className="absolute top-3 left-3 z-10">
              <Badge className="bg-blue-900 text-white border-0 px-3 py-1 text-sm font-medium">
                Free Gift
              </Badge>
            </div>
          </div>

          {/* Header - Product Title with Fixed Height */}
          <div className="mb-4 h-16 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-gray-900 leading-tight">{safeProduct.name}</h3>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">{renderStars(safeProduct.rating)}</div>
            <span className="font-bold text-gray-900">{safeProduct.rating}</span>
            <span className="text-sm text-gray-600">Based on {safeProduct.reviewCount} reviews</span>
          </div>

          {/* Features with Icons */}
          <div className="space-y-2 mb-6">
            {safeProduct.features?.slice(0, 4).map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-gray-700">
                  {getFeatureIcon(feature)}
                </div>
                <span className="text-sm text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Pricing Section */}
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-1">from</div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-2xl font-bold text-gray-900">£{safeProduct.currentPrice.toFixed(2)}</span>
              {safeProduct.originalPrice && safeProduct.originalPrice > safeProduct.currentPrice && (
                <span className="text-lg text-gray-500 line-through">£{safeProduct.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {safeProduct.savings && safeProduct.savings > 0 && (
              <span className="text-orange-500 font-semibold">save £{safeProduct.savings.toFixed(2)}</span>
            )}
          </div>

          {/* Delivery Information */}
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-700">Free delivery {safeProduct.freeDelivery}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
