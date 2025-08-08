"use client"

import Image from "next/image"
import { Star, Truck, Clock, Leaf, Zap, Shield, Check, ArrowRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

interface ProductDetail {
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
  firmnessLevel: number // 1-10 scale
  features: string[]
  originalPrice: number
  currentPrice: number
  savings: number
  freeDelivery: string
  setupService?: boolean
  setupCost?: number
  certifications: string[]
  sizes: string[]
  selectedSize?: string
  monthlyPrice?: number
  images?: string[] // Multiple product images
}

interface ProductDetailCardProps {
  product: ProductDetail
}

export function ProductDetailCard({ product }: ProductDetailCardProps) {
  const { dispatch } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.selectedSize || product.sizes[0])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'fill-orange-500 text-orange-500' 
            : i < rating 
            ? 'fill-orange-300 text-orange-500' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const renderFirmnessScale = (level: number) => {
    return (
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-600">Soft</span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-500 rounded-full transition-all duration-300"
            style={{ width: `${level * 10}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">Firm</span>
      </div>
    )
  }

  const getFeatureIcon = (feature: string) => {
    const featureLower = feature.toLowerCase()
    if (featureLower.includes('bamboo') || featureLower.includes('organic')) return <Leaf className="h-3 w-3" />
    if (featureLower.includes('motion')) return <Zap className="h-3 w-3" />
    if (featureLower.includes('foam') || featureLower.includes('certipur')) return <Shield className="h-3 w-3" />
    return <Check className="h-3 w-3" />
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
        size: selectedSize
      }
    })
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Product Images Section */}
      <div className="relative">
        {/* Main Product Image */}
        <div className="relative w-full h-80 bg-gray-50">
          <Image
            src={product.images?.[selectedImage] || product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-4 right-4 space-y-2">
            <Badge className="bg-orange-500 text-white border-0 px-3 py-1 text-sm font-medium">
              {product.badge}
            </Badge>
            <Badge className="bg-orange-500 text-white border-0 px-3 py-1 text-sm font-medium">
              Save £{product.savings.toFixed(2)}
            </Badge>
          </div>
        </div>

        {/* Thumbnail Images */}
        {product.images && product.images.length > 1 && (
          <div className="flex gap-2 mt-4 px-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="px-4 py-6 space-y-6">
        {/* Brand and Product Name */}
        <div className="relative">
          <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{product.name}</h1>
          <p className="text-gray-900">{product.brand} Premium</p>
          <p className="text-sm text-gray-600">Luxury Hybrid Mattress with Support</p>
          
          {/* Brand Logo */}
          <div className="absolute top-0 right-0 w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{product.brand.substring(0, 2)}</span>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="font-semibold text-gray-900">{product.rating}</span>
          <span className="text-sm text-gray-500">Based on {product.reviewCount} reviews</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {product.features.map((feature, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className="bg-white border-gray-200 text-gray-700 px-3 py-1 text-sm"
            >
              <span className="mr-1">{getFeatureIcon(feature)}</span>
              {feature}
            </Badge>
          ))}
        </div>

        {/* Firmness Scale */}
        {renderFirmnessScale(product.firmnessLevel || 7)}

        {/* Pricing */}
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Starting from</div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">£{product.currentPrice.toFixed(2)}</span>
            <div className="flex flex-col">
              <span className="text-gray-500 line-through">£{product.originalPrice.toFixed(2)}</span>
              <span className="text-orange-600 font-medium">Save £{product.savings.toFixed(2)}</span>
            </div>
          </div>
          {product.monthlyPrice && (
            <p className="text-sm text-gray-900">Pay monthly from £{product.monthlyPrice}/mo. No fees.</p>
          )}
          <p className="text-xs text-gray-500">*Prices vary. Free UK delivery.</p>
        </div>

        {/* Delivery and Service */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-900">Free Delivery</span>
            </div>
            <span className="text-sm text-gray-600">{product.freeDelivery}</span>
          </div>
          {product.setupService && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-900">Setup Service</span>
              </div>
              <span className="text-sm text-gray-600">+£{product.setupCost}</span>
            </div>
          )}
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap gap-2">
          {product.certifications.map((cert, index) => (
            <Badge 
              key={index}
              variant="outline" 
              className="bg-white border-gray-200 text-gray-700 px-3 py-1 text-sm"
            >
              {cert}
            </Badge>
          ))}
        </div>

        {/* Sizes */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-900">Sizes</div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 text-lg rounded-lg"
          onClick={handleAddToCart}
        >
          Buy Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
