"use client"

import Image from "next/image"
import { Star, Leaf, Zap, Shield, Check } from 'lucide-react'
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
  firmnessLevel?: number // 1-10 scale
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
  images?: string[] // Multiple product images
  category: string
  type?: string
  price?: number // Added for cases where currentPrice is not available
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Queen'))
  const [selectedFirmness, setSelectedFirmness] = useState(product.firmness || 'Medium')
  const categoryForLink = product.category || 'mattresses'

  // Ensure product has required fields with fallbacks
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
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(safeRating) 
            ? 'fill-orange-500 text-orange-500' 
            : i < safeRating 
            ? 'fill-orange-300 text-orange-500' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const renderFirmnessScale = (level: number) => {
    const firmnessLevels = [
      { name: 'Soft', value: 3 },
      { name: 'Medium', value: 6 },
      { name: 'Firm', value: 8 },
      { name: 'Super Firm', value: 10 }
    ]

    const getFirmnessValue = (firmnessName: string) => {
      const level = firmnessLevels.find(l => l.name === firmnessName)
      return level ? level.value : 6
    }

    const currentLevel = getFirmnessValue(selectedFirmness)

    return (
      <div className="space-y-3 mb-4">
        <div className="text-sm font-medium text-gray-900">Firmness Level</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${currentLevel * 10}%` }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {firmnessLevels.map((firmness) => (
            <button
              key={firmness.name}
              onClick={() => setSelectedFirmness(firmness.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedFirmness === firmness.name
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {firmness.name}
            </button>
          ))}
        </div>
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

  const getProductImage = (category: string, type: string) => {
    // High-quality lifestyle images for different categories
    const imageMap: Record<string, string> = {
      'mattresses': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop',
      'pillows': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      'bedding': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
      'adjustable-bases': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      'box-springs': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop',
      'beds': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop',
      'sofas': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop'
    }
    
    // Specific lifestyle images based on product type
    const typeSpecificImages: Record<string, string> = {
      'Memory Foam': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      'Hybrid': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop',
      'Spring': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
      'Cooling Gel': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      'Mattress Protectors': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
      'Sheets': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop',
      'Premium': 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop',
      'Smart': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      'Memory Foam Pillow': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      'Cooling Gel Pillow': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      'Down Alternative Pillow': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      'Cervical Support Pillow': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
    }
    
    return typeSpecificImages[type] || imageMap[category] || 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop'
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
        size: selectedSize
      }
    })
  }

  return (
    <Card className="group product-card bg-white border-2 border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-xl overflow-hidden">
      <CardContent className="p-0 product-card-content">
        {/* Product Images Section */}
        <div className="relative">
          {/* Main Product Image */}
          <Link href={`/products/${categoryForLink}/${safeProduct.id}`}>
            <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200">
              <Image
                src={safeProduct.images?.[selectedImage] || safeProduct.image || getProductImage(safeProduct.category || '', safeProduct.type || '')}
                alt={safeProduct.name}
                fill
                className="object-cover"
              />
              
              {/* Free Gift Badge - Top Left */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-900 text-white border-0 px-3 py-1 text-sm font-medium shadow-lg">
                  Free Gift
                </Badge>
              </div>
              
              {/* Badges - Top Right */}
              <div className="absolute top-4 right-4 space-y-2">
                {safeProduct.badge && (
                  <Badge className="bg-orange-500 text-white border-0 px-3 py-1 text-sm font-medium shadow-lg">
                    {safeProduct.badge}
                  </Badge>
                )}
                {safeProduct.savings && safeProduct.savings > 0 && (
                  <Badge className="bg-orange-500 text-white border-0 px-3 py-1 text-sm font-medium shadow-lg">
                    Save £{safeProduct.savings.toFixed(2)}
                  </Badge>
                )}
              </div>
            </div>
          </Link>

          {/* Thumbnail Images */}
          {safeProduct.images && safeProduct.images.length > 1 && (
            <div className="flex gap-2 mt-4 px-4">
              {safeProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index ? 'border-orange-500 shadow-md' : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${safeProduct.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="px-6 py-6 space-y-5 flex-1 flex flex-col">
          {/* Product Name */}
          <div className="relative">
            <Link href={`/products/${categoryForLink}/${safeProduct.id}`} className="block">
              <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2 hover:underline">{safeProduct.name}</h3>
            </Link>
          </div>

          {/* Rating and Reviews */}
          {safeProduct.rating && safeProduct.rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex">{renderStars(safeProduct.rating)}</div>
              <span className="font-semibold text-gray-900">{safeProduct.rating}</span>
              {safeProduct.reviewCount && safeProduct.reviewCount > 0 && (
                <span className="text-sm text-gray-500">Based on {safeProduct.reviewCount} reviews</span>
              )}
            </div>
          )}

          {/* Features */}
          {safeProduct.features && safeProduct.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {safeProduct.features.map((feature, index) => (
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
          )}

          {/* Firmness Scale */}
          {safeProduct.firmnessLevel && safeProduct.firmnessLevel > 0 && renderFirmnessScale(safeProduct.firmnessLevel)}

          {/* Pricing */}
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Starting from</div>
            <div className="flex items-baseline gap-3">
              {safeProduct.currentPrice && safeProduct.currentPrice > 0 ? (
                <>
                  <span className="text-2xl font-bold text-gray-900">£{safeProduct.currentPrice.toFixed(2)}</span>
                  {safeProduct.originalPrice && safeProduct.originalPrice > safeProduct.currentPrice && (
                    <div className="flex flex-col">
                      <span className="text-gray-500 line-through text-sm">£{safeProduct.originalPrice.toFixed(2)}</span>
                      {safeProduct.savings && safeProduct.savings > 0 && (
                        <span className="text-orange-600 font-medium text-sm">Save £{safeProduct.savings.toFixed(2)}</span>
                      )}
                    </div>
                  )}
                </>
              ) : safeProduct.price && safeProduct.price > 0 ? (
                <span className="text-2xl font-bold text-gray-900">£{safeProduct.price.toFixed(2)}</span>
              ) : (
                <span className="text-2xl font-bold text-gray-900">Price not available</span>
              )}
            </div>
          </div>

          {/* Sizes */}
          {safeProduct.sizes && safeProduct.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-gray-900">Sizes</div>
              <div className="flex flex-wrap gap-2">
                {safeProduct.sizes.map((size) => (
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
          )}

          {/* Call to Action */}
          <div className="mt-auto pt-4">
            <Button 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              onClick={handleAddToCart}
            >
              Buy Now &gt;
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
