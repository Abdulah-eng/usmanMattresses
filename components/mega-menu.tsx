"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { ProductCard } from "@/components/product-card"

interface MegaMenuProduct {
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
  firmnessLevel: number
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
  monthlyPrice: number
  images?: string[]
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
        brand: "ARTHUR SLEEP",
        brandColor: "orange",
        badge: "Best Seller",
        badgeColor: "orange",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        rating: 4.8,
        reviewCount: 127,
        firmness: "MEDIUM FIRM",
        firmnessLevel: 7,
        features: ["Bamboo cover", "Motion isolation", "Edge support", "CertiPUR foam"],
        originalPrice: 499.00,
        currentPrice: 424.15,
        savings: 74.85,
        freeDelivery: "Mon, 11 Aug",
        setupService: true,
        setupCost: 49,
        certifications: ["OEKO-TEX", "CertiPUR-US", "Made in UK", "100-Night Trial", "10-Year Warranty"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "King",
        monthlyPrice: 35,
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
        category: "mattresses"
      },
      {
        id: 102,
        name: "Dream Mirapocket 1000 Mattress",
        brand: "SILENTNIGHT",
        brandColor: "orange",
        badge: "New Model",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        rating: 4.0,
        reviewCount: 256,
        firmness: "MEDIUM",
        firmnessLevel: 6,
        features: ["ECO COMFORT™", "1000 POCKET SPRINGS", "24CM DEPTH", "Motion isolation"],
        originalPrice: 342.00,
        currentPrice: 290.70,
        savings: 51.30,
        freeDelivery: "Tomorrow",
        setupService: false,
        certifications: ["OEKO-TEX", "Made in UK", "100-Night Trial", "5-Year Warranty"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "Double",
        monthlyPrice: 25,
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
        category: "mattresses"
      },
      {
        id: 103,
        name: "Ice Arthur Cooling Mattress",
        brand: "ARTHUR SLEEP",
        brandColor: "orange",
        badge: "Cooling",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        rating: 4.5,
        reviewCount: 189,
        firmness: "MEDIUM",
        firmnessLevel: 6,
        features: ["GEL FOAM", "3000 POCKET SPRINGS", "30CM DEPTH", "Cooling", "Edge support"],
        originalPrice: 559.00,
        currentPrice: 475.15,
        savings: 83.85,
        freeDelivery: "Tomorrow",
        setupService: true,
        setupCost: 49,
        certifications: ["OEKO-TEX", "CertiPUR-US", "Made in UK", "100-Night Trial", "10-Year Warranty"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "King",
        monthlyPrice: 40,
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
        category: "mattresses"
      },
      {
        id: 104,
        name: "Premium Hybrid Mattress",
        brand: "SLEEPWELL",
        brandColor: "orange",
        badge: "Premium",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        rating: 4.7,
        reviewCount: 320,
        firmness: "MEDIUM FIRM",
        firmnessLevel: 7,
        features: ["Hybrid Technology", "Pocket Springs", "Memory Foam", "Edge support"],
        originalPrice: 699.00,
        currentPrice: 599.99,
        savings: 99.01,
        freeDelivery: "Tomorrow",
        setupService: true,
        setupCost: 49,
        certifications: ["OEKO-TEX", "CertiPUR-US", "Made in UK", "100-Night Trial", "10-Year Warranty"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "King",
        monthlyPrice: 50,
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
        category: "mattresses"
      }
    ],
    pillows: [
      {
        id: 201,
        name: "Memory Foam Pillow",
        brand: "MattressKing",
        brandColor: "blue",
        badge: "Best Seller",
        badgeColor: "orange",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        rating: 4.6,
        reviewCount: 250,
        firmness: "Medium",
        firmnessLevel: 6,
        features: ["Memory Foam", "Pressure Relief", "Hypoallergenic"],
        originalPrice: 60.00,
        currentPrice: 49.99,
        savings: 10.01,
        freeDelivery: "Tomorrow",
        setupService: false,
        certifications: ["OEKO-TEX", "Made in UK"],
        sizes: ["Standard", "Queen", "King"],
        selectedSize: "Standard",
        monthlyPrice: 6,
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
        category: "pillows"
      },
      {
        id: 202,
        name: "Cooling Gel Pillow",
        brand: "Cool Dreams",
        brandColor: "blue",
        badge: "Cooling",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        rating: 4.4,
        reviewCount: 180,
        firmness: "Soft",
        firmnessLevel: 3,
        features: ["Cooling Gel", "Temperature Regulation"],
        originalPrice: 75.00,
        currentPrice: 65.00,
        savings: 10.00,
        freeDelivery: "Tomorrow",
        setupService: false,
        certifications: ["OEKO-TEX", "Made in UK"],
        sizes: ["Standard", "Queen", "King"],
        selectedSize: "Queen",
        monthlyPrice: 8,
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
        category: "pillows"
      },
      {
        id: 203,
        name: "Down Alternative Pillow",
        brand: "Comfort Plus",
        brandColor: "blue",
        badge: "Popular",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        rating: 4.2,
        reviewCount: 120,
        firmness: "Medium",
        firmnessLevel: 5,
        features: ["Down Alternative", "Hypoallergenic", "Soft"],
        originalPrice: 45.00,
        currentPrice: 35.99,
        savings: 9.01,
        freeDelivery: "Tomorrow",
        setupService: false,
        certifications: ["OEKO-TEX", "Made in UK"],
        sizes: ["Standard", "Queen", "King"],
        selectedSize: "Standard",
        monthlyPrice: 4,
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
        category: "pillows"
      },
      {
        id: 204,
        name: "Cervical Support Pillow",
        brand: "Ortho Sleep",
        brandColor: "blue",
        badge: "Orthopedic",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        rating: 4.5,
        reviewCount: 95,
        firmness: "Firm",
        firmnessLevel: 8,
        features: ["Cervical Support", "Neck Pain Relief", "Ergonomic"],
        originalPrice: 70.00,
        currentPrice: 55.99,
        savings: 14.01,
        freeDelivery: "Tomorrow",
        setupService: false,
        certifications: ["OEKO-TEX", "Made in UK", "Medical Grade"],
        sizes: ["Standard", "Queen", "King"],
        selectedSize: "Standard",
        monthlyPrice: 7,
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"],
        category: "pillows"
      }
    ],
    bedding: [
      {
        id: 301,
        name: "FRIO 5-Sided Premium Cooling Mattress Protector",
        brand: "MattressKing",
        brandColor: "blue",
        badge: "Best Seller",
        badgeColor: "orange",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
        rating: 4.7,
        reviewCount: 500,
        firmness: "N/A",
        firmnessLevel: 0,
        features: ["Cooling", "Waterproof", "5-Sided Protection"],
        originalPrice: 90.00,
        currentPrice: 75.95,
        savings: 14.05,
        freeDelivery: "Tomorrow",
        setupService: false,
        certifications: ["OEKO-TEX", "Made in UK", "100-Night Trial"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "Queen",
        monthlyPrice: 8,
        images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop"],
        category: "bedding"
      },
      {
        id: 302,
        name: "Premium Smooth Waterproof Mattress Protector",
        brand: "MattressKing",
        brandColor: "blue",
        badge: "Best Seller",
        badgeColor: "orange",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
        rating: 4.5,
        reviewCount: 300,
        firmness: "N/A",
        firmnessLevel: 0,
        features: ["Waterproof", "Smooth Finish"],
        originalPrice: 55.00,
        currentPrice: 45.95,
        savings: 9.05,
        freeDelivery: "Tomorrow",
        setupService: false,
        certifications: ["OEKO-TEX", "Made in UK"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "Queen",
        monthlyPrice: 6,
        images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop"],
        category: "bedding"
      },
      {
        id: 303,
        name: "Encase HD 360° Mattress Protector",
        brand: "MattressKing",
        brandColor: "blue",
        badge: "New",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
        rating: 4.3,
        reviewCount: 150,
        firmness: "N/A",
        firmnessLevel: 0,
        features: ["360 Protection", "HD Quality"],
        originalPrice: 100.00,
        currentPrice: 84.95,
        savings: 15.05,
        freeDelivery: "Tomorrow",
        setupService: false,
        certifications: ["OEKO-TEX", "Made in UK"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "Queen",
        monthlyPrice: 9,
        images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop"],
        category: "bedding"
      },
      {
        id: 304,
        name: "Soft Washed Microfiber Sheets",
        brand: "MattressKing",
        brandColor: "blue",
        badge: "Best Seller",
        badgeColor: "orange",
        image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
        rating: 4.6,
        reviewCount: 400,
        firmness: "N/A",
        firmnessLevel: 0,
        features: ["Soft", "Wrinkle-Free", "Microfiber"],
        originalPrice: 50.00,
        currentPrice: 44.95,
        savings: 5.05,
        freeDelivery: "Tomorrow",
        setupService: false,
        certifications: ["OEKO-TEX", "Made in UK"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "Queen",
        monthlyPrice: 5,
        images: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop"],
        category: "bedding"
      }
    ],
    "adjustable-bases": [
      {
        id: 401,
        name: "Adjustable Base Pro",
        brand: "Adjustable Sleep",
        brandColor: "blue",
        badge: "Smart",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        rating: 4.9,
        reviewCount: 600,
        firmness: "N/A",
        firmnessLevel: 0,
        features: ["Massage", "USB Ports", "Zero Gravity", "Wireless Remote"],
        originalPrice: 1500.00,
        currentPrice: 1299.00,
        savings: 201.00,
        freeDelivery: "Tomorrow",
        setupService: true,
        setupCost: 99,
        certifications: ["Made in UK", "5-Year Warranty"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "Queen",
        monthlyPrice: 65,
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
        category: "adjustable-bases"
      },
      {
        id: 402,
        name: "Basic Adjustable Base",
        brand: "Adjustable Sleep",
        brandColor: "blue",
        badge: "Value",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        rating: 4.3,
        reviewCount: 250,
        firmness: "N/A",
        firmnessLevel: 0,
        features: ["Basic Adjustments", "Remote Control"],
        originalPrice: 699.00,
        currentPrice: 599.00,
        savings: 100.00,
        freeDelivery: "Tomorrow",
        setupService: true,
        setupCost: 49,
        certifications: ["Made in UK", "3-Year Warranty"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "Queen",
        monthlyPrice: 30,
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
        category: "adjustable-bases"
      },
      {
        id: 403,
        name: "Premium Adjustable Base",
        brand: "Adjustable Sleep",
        brandColor: "blue",
        badge: "Premium",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        rating: 4.8,
        reviewCount: 400,
        firmness: "N/A",
        firmnessLevel: 0,
        features: ["Premium Massage", "USB Ports", "Zero Gravity", "Anti-Snore"],
        originalPrice: 2100.00,
        currentPrice: 1899.00,
        savings: 201.00,
        freeDelivery: "Tomorrow",
        setupService: true,
        setupCost: 149,
        certifications: ["Made in UK", "10-Year Warranty"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "Queen",
        monthlyPrice: 95,
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
        category: "adjustable-bases"
      },
      {
        id: 404,
        name: "Split King Adjustable Base",
        brand: "Adjustable Sleep",
        brandColor: "blue",
        badge: "Split",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        rating: 4.7,
        reviewCount: 180,
        firmness: "N/A",
        firmnessLevel: 0,
        features: ["Split Design", "Independent Control", "Massage", "USB Ports"],
        originalPrice: 2800.00,
        currentPrice: 2499.00,
        savings: 301.00,
        freeDelivery: "Tomorrow",
        setupService: true,
        setupCost: 199,
        certifications: ["Made in UK", "10-Year Warranty"],
        sizes: ["Split King", "Split California King"],
        selectedSize: "Split King",
        monthlyPrice: 125,
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
        category: "adjustable-bases"
      }
    ],
    "box-springs": [
      {
        id: 501,
        name: "Premium Box Spring",
        brand: "Bed Frame Co",
        brandColor: "blue",
        badge: "Classic",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        rating: 4.4,
        reviewCount: 180,
        firmness: "N/A",
        firmnessLevel: 0,
        features: ["Premium Quality", "Durable Construction"],
        originalPrice: 249.99,
        currentPrice: 199.99,
        savings: 50.00,
        freeDelivery: "Tomorrow",
        setupService: true,
        setupCost: 29,
        certifications: ["Made in UK", "3-Year Warranty"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "Queen",
        monthlyPrice: 12,
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
        category: "box-springs"
      },
      {
        id: 502,
        name: "Platform Bed Frame",
        brand: "Bed Frame Co",
        brandColor: "blue",
        badge: "Modern",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        rating: 4.6,
        reviewCount: 220,
        firmness: "N/A",
        firmnessLevel: 0,
        features: ["Modern Design", "Platform Support"],
        originalPrice: 349.99,
        currentPrice: 299.99,
        savings: 50.00,
        freeDelivery: "Tomorrow",
        setupService: true,
        setupCost: 39,
        certifications: ["Made in UK", "5-Year Warranty"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "Queen",
        monthlyPrice: 15,
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
        category: "box-springs"
      },
      {
        id: 503,
        name: "Metal Bed Frame",
        brand: "Bed Frame Co",
        brandColor: "blue",
        badge: "Durable",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        rating: 4.2,
        reviewCount: 150,
        firmness: "N/A",
        firmnessLevel: 0,
        features: ["Metal Construction", "Durable"],
        originalPrice: 179.99,
        currentPrice: 149.99,
        savings: 30.00,
        freeDelivery: "Tomorrow",
        setupService: true,
        setupCost: 19,
        certifications: ["Made in UK", "2-Year Warranty"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "Queen",
        monthlyPrice: 9,
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
        category: "box-springs"
      },
      {
        id: 504,
        name: "Wooden Storage Frame",
        brand: "Bed Frame Co",
        brandColor: "blue",
        badge: "Storage",
        badgeColor: "gray",
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        rating: 4.7,
        reviewCount: 95,
        firmness: "N/A",
        firmnessLevel: 0,
        features: ["Storage Drawers", "Wooden Construction"],
        originalPrice: 549.99,
        currentPrice: 449.99,
        savings: 100.00,
        freeDelivery: "Tomorrow",
        setupService: true,
        setupCost: 49,
        certifications: ["Made in UK", "5-Year Warranty"],
        sizes: ["Single", "Double", "King", "Super King"],
        selectedSize: "Queen",
        monthlyPrice: 22,
        images: ["https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop"],
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
        brand: product.brand,
        image: product.image,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        size: product.selectedSize || 'Queen'
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
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
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
