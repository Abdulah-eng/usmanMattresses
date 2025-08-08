"use client"

import Image from "next/image"
import { Star, Truck } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

interface Product {
  id: number
  name: string
  brand: string
  brandColor: string
  badge: string
  badgeColor: string
  image: string
  rating: number
  reviewCount: number
  firmness: string
  features: string[]
  originalPrice: number
  currentPrice: number
  savings: number
  freeDelivery: string
  size?: string // Optional size field
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'fill-orange-600 text-orange-600' 
            : i < rating 
            ? 'fill-orange-300 text-orange-600' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: product.image,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        size: product.size || 'Queen' // Default size
      }
    })
  }

  return (
    <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white border border-gray-200 rounded-xl overflow-hidden">
      <CardContent className="p-6">
        {/* Brand and Badge */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-gray-600 mb-1">{product.brand}</div>
            <div className={`text-lg font-bold ${product.brandColor === 'orange' ? 'text-orange-700' : 'text-blue-900'}`}>
              {product.brand}
            </div>
          </div>
          <Badge 
            variant={product.badgeColor === 'orange' ? 'default' : 'secondary'}
            className={product.badgeColor === 'orange' ? 'bg-orange-200 text-orange-800 border-orange-300' : 'bg-blue-900 text-white border-blue-900'}
          >
            {product.badge}
          </Badge>
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          {product.name}
        </h3>

        {/* Product Image */}
        <div className="relative mb-6 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-contain bg-white"
          />
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="font-semibold">{product.rating}</span>
          <span className="text-sm text-gray-500">Based on {product.reviewCount} reviews</span>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <span className="font-medium">{product.firmness}</span>
          </div>
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 border border-gray-400 rounded-sm flex items-center justify-center">
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm text-gray-500">from</span>
            <span className="text-2xl font-bold text-gray-900">£{product.currentPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500 line-through">£{product.originalPrice.toFixed(2)}</span>
            <span className="text-orange-700 font-medium">save £{product.savings.toFixed(2)}</span>
          </div>
        </div>

        {/* Free Delivery */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Truck className="h-4 w-4" />
          <span>Free delivery {product.freeDelivery}</span>
        </div>

        {/* Add to Cart Button */}
        <Button 
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-medium"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
