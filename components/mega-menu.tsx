"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"

interface MegaMenuProduct {
  id: number
  name: string
  image: string
  price: number
  monthlyPrice: number
  badge?: string
  rating?: number
  category: string
}

interface MegaMenuProps {
  category: string
  isVisible: boolean
  onClose: () => void
}

export function MegaMenu({ category, isVisible, onClose }: MegaMenuProps) {
  const { dispatch } = useCart()

  const megaMenuProducts: Record<string, MegaMenuProduct[]> = {
    mattresses: [
      {
        id: 101,
        name: "King Arthur Memory Foam Mattress",
        image: "/mattress-image.svg",
        price: 386.75,
        monthlyPrice: 18,
        badge: "Best Seller",
        rating: 4.8,
        category: "mattresses"
      },
      {
        id: 102,
        name: "Dream Mirapocket 1000 Mattress",
        image: "/mattress-image.svg",
        price: 290.70,
        monthlyPrice: 15,
        badge: "New Model",
        rating: 4.0,
        category: "mattresses"
      },
      {
        id: 103,
        name: "Ice Arthur Cooling Mattress",
        image: "/mattress-image.svg",
        price: 475.15,
        monthlyPrice: 22,
        badge: "Best Seller",
        rating: 4.5,
        category: "mattresses"
      },
      {
        id: 104,
        name: "Premium Hybrid Mattress",
        image: "/mattress-image.svg",
        price: 599.99,
        monthlyPrice: 28,
        badge: "Premium",
        rating: 4.7,
        category: "mattresses"
      }
    ],
    pillows: [
      {
        id: 201,
        name: "Memory Foam Pillow",
        image: "/mattress-image.svg",
        price: 45.99,
        monthlyPrice: 8,
        badge: "Best Seller",
        rating: 4.6,
        category: "pillows"
      },
      {
        id: 202,
        name: "Cooling Gel Pillow",
        image: "/mattress-image.svg",
        price: 65.99,
        monthlyPrice: 12,
        badge: "Cooling",
        rating: 4.4,
        category: "pillows"
      },
      {
        id: 203,
        name: "Down Alternative Pillow",
        image: "/mattress-image.svg",
        price: 35.99,
        monthlyPrice: 6,
        rating: 4.2,
        category: "pillows"
      },
      {
        id: 204,
        name: "Cervical Support Pillow",
        image: "/mattress-image.svg",
        price: 55.99,
        monthlyPrice: 10,
        badge: "Orthopedic",
        rating: 4.5,
        category: "pillows"
      }
    ],
    bedding: [
      {
        id: 301,
        name: "FRIO 5-Sided Premium Cooling Mattress Protector",
        image: "/mattress-image.svg",
        price: 75.95,
        monthlyPrice: 18,
        badge: "Best Seller",
        category: "bedding"
      },
      {
        id: 302,
        name: "Premium Smooth Waterproof Mattress Protector",
        image: "/mattress-image.svg",
        price: 45.95,
        monthlyPrice: 11,
        badge: "Best Seller",
        category: "bedding"
      },
      {
        id: 303,
        name: "Encase HD 360° Mattress Protector",
        image: "/mattress-image.svg",
        price: 84.95,
        monthlyPrice: 21,
        category: "bedding"
      },
      {
        id: 304,
        name: "Soft Washed Microfiber Sheets",
        image: "/mattress-image.svg",
        price: 44.95,
        monthlyPrice: 11,
        badge: "Best Seller",
        category: "bedding"
      }
    ],
    "adjustable-bases": [
      {
        id: 401,
        name: "Adjustable Base Pro",
        image: "/mattress-image.svg",
        price: 1299.00,
        monthlyPrice: 65,
        badge: "Smart",
        rating: 4.9,
        category: "adjustable-bases"
      },
      {
        id: 402,
        name: "Basic Adjustable Base",
        image: "/mattress-image.svg",
        price: 599.00,
        monthlyPrice: 30,
        badge: "Value",
        rating: 4.3,
        category: "adjustable-bases"
      },
      {
        id: 403,
        name: "Premium Adjustable Base",
        image: "/mattress-image.svg",
        price: 1899.00,
        monthlyPrice: 95,
        badge: "Premium",
        rating: 4.8,
        category: "adjustable-bases"
      },
      {
        id: 404,
        name: "Split King Adjustable Base",
        image: "/mattress-image.svg",
        price: 2499.00,
        monthlyPrice: 125,
        badge: "Split",
        rating: 4.7,
        category: "adjustable-bases"
      }
    ],
    "box-springs": [
      {
        id: 501,
        name: "Premium Box Spring",
        image: "/mattress-image.svg",
        price: 199.99,
        monthlyPrice: 12,
        badge: "Classic",
        rating: 4.4,
        category: "box-springs"
      },
      {
        id: 502,
        name: "Platform Bed Frame",
        image: "/mattress-image.svg",
        price: 299.99,
        monthlyPrice: 15,
        badge: "Modern",
        rating: 4.6,
        category: "box-springs"
      },
      {
        id: 503,
        name: "Metal Bed Frame",
        image: "/mattress-image.svg",
        price: 149.99,
        monthlyPrice: 9,
        badge: "Durable",
        rating: 4.2,
        category: "box-springs"
      },
      {
        id: 504,
        name: "Wooden Storage Frame",
        image: "/mattress-image.svg",
        price: 449.99,
        monthlyPrice: 22,
        badge: "Storage",
        rating: 4.7,
        category: "box-springs"
      }
    ]
  }

  const products = megaMenuProducts[category] || []

  const handleAddToCart = (product: MegaMenuProduct) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        brand: "MattressKing",
        image: product.image,
        currentPrice: product.price,
        originalPrice: product.price * 1.2,
        size: 'Queen'
      }
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating) 
            ? 'fill-orange-600 text-orange-600' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  if (!isVisible || products.length === 0) return null

  return (
    <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 capitalize mb-2">{category.replace('-', ' ')}</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative bg-gray-50 rounded-lg overflow-hidden mb-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-contain bg-white group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-orange-600 text-white">
                    🔥 {product.badge}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-blue-900">
                  {product.name}
                </h3>
                
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-xs text-gray-500">({product.rating})</span>
                  </div>
                )}
                
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-gray-500">starting at</span>
                    <span className="font-bold text-gray-900">${product.price}</span>
                  </div>
                  <div className="text-xs text-blue-900">
                    or as low as <span className="underline">${product.monthlyPrice}/month</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
                      <Button 
              asChild 
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-full"
            >
            <Link href={`/${category}`}>
              Shop all {category.replace('-', ' ')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
