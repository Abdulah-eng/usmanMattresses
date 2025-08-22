import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react'
import { ArrowRight, TrendingUp, Sparkles, Clock, Star, Circle, Layers, Zap, Ruler, Truck } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

type TrendingItem = {
  title: string
  subtitle?: string
  image: string
  href: string
  category?: string
  read_time?: string
  badge?: string
  rating?: number
  price?: number
  original_price?: number
  discount_label?: string
  features?: string[]
  reviewCount?: number
  freeDelivery?: string
}

export function TrendingSection() {
  const [items, setItems] = useState<TrendingItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('/api/homepage-content?section=trending')
        const json = await res.json()
        const mapped = (json.content || []).map((it: any) => ({
          title: it.title,
          subtitle: it.subtitle,
          image: it.image,
          href: it.href || '#',
          category: it.category,
          read_time: it.read_time,
          badge: it.badge,
          rating: it.rating,
          price: it.price,
          original_price: it.original_price,
          discount_label: it.discount_label,
          features: it.features || ['Premium Quality', 'Comfort', 'Durability'],
          reviewCount: it.reviewCount || Math.floor(Math.random() * 200) + 50,
          freeDelivery: it.freeDelivery || 'Tomorrow'
        }))
        setItems(mapped)
      } catch (e) { 
        console.error('Failed to load trending items:', e)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  // Fallback data if API doesn't return items
  const fallbackItems: TrendingItem[] = [
    {
      title: "Memory Foam Revolution",
      subtitle: "Discover the latest in sleep technology with advanced cooling and pressure relief",
      image: "/cascade-main.jpg",
      href: "/mattresses",
      category: "Technology",
      read_time: "5 min read",
      badge: "Trending",
      rating: 4.8,
      price: 599,
      original_price: 799,
      discount_label: "25% OFF",
      features: ["Memory Foam", "Temperature Regulation", "Motion Isolation", "Pressure Relief"],
      reviewCount: 156,
      freeDelivery: "Tomorrow"
    },
    {
      title: "Hybrid Comfort",
      subtitle: "The perfect blend of support and softness for ultimate sleep experience",
      image: "/cascade-features.jpg",
      href: "/mattresses",
      category: "Comfort",
      read_time: "3 min read",
      badge: "Popular",
      rating: 4.9,
      price: 699,
      original_price: 899,
      discount_label: "22% OFF",
      features: ["Hybrid Technology", "Pocket Springs", "Memory Foam", "Edge Support"],
      reviewCount: 203,
      freeDelivery: "Tomorrow"
    },
    {
      title: "Smart Sleep Technology",
      subtitle: "AI-powered sleep tracking and personalized comfort recommendations",
      image: "/cascade-height.jpg",
      href: "/mattresses",
      category: "Innovation",
      read_time: "4 min read",
      badge: "New",
      rating: 4.7,
      price: 899,
      original_price: 1099,
      discount_label: "18% OFF",
      features: ["AI Technology", "Sleep Tracking", "Smart Controls", "Personalization"],
      reviewCount: 89,
      freeDelivery: "Tomorrow"
    },
    {
      title: "Eco-Friendly Sleep",
      subtitle: "Sustainable materials and organic comfort for conscious consumers",
      image: "/cascade-sleepers.jpg",
      href: "/mattresses",
      category: "Sustainability",
      read_time: "6 min read",
      badge: "Eco",
      rating: 4.6,
      price: 749,
      original_price: 899,
      discount_label: "17% OFF",
      features: ["Organic Materials", "Sustainable", "Eco-Friendly", "Natural Comfort"],
      reviewCount: 134,
      freeDelivery: "Tomorrow"
    },
    {
      title: "Luxury Sleep Experience",
      subtitle: "Premium materials and craftsmanship for the ultimate sleep indulgence",
      image: "/cascade-firmness.jpg",
      href: "/mattresses",
      category: "Luxury",
      read_time: "7 min read",
      badge: "Premium",
      rating: 4.9,
      price: 1299,
      original_price: 1599,
      discount_label: "19% OFF",
      features: ["Premium Materials", "Luxury Craftsmanship", "Ultimate Comfort", "Exclusive Design"],
      reviewCount: 78,
      freeDelivery: "Tomorrow"
    }
  ]

  const displayItems = items.length > 0 ? items : fallbackItems

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
    if (featureLower.includes('memory') || featureLower.includes('foam')) return <Layers className="h-4 w-4 text-gray-700" />
    if (featureLower.includes('spring') || featureLower.includes('pocket')) return <Zap className="h-4 w-4 text-gray-700" />
    if (featureLower.includes('temperature') || featureLower.includes('cooling')) return <Circle className="h-4 w-4 text-gray-700" />
    if (featureLower.includes('ai') || featureLower.includes('smart')) return <Zap className="h-4 w-4 text-gray-700" />
    return <Circle className="h-4 w-4 text-gray-700" />
  }

  if (isLoading) {
    return (
      <section className="w-full bg-gradient-to-br from-gray-50 via-white to-orange-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-full w-48 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 via-white to-orange-50 py-16 md:py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-orange-100 rounded-full mix-blend-multiply filter blur-lg opacity-50 animate-float animation-delay-4000"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-100" />
            <span className="text-xs sm:text-sm font-semibold">TRENDING NOW</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4 sm:mb-6 leading-tight px-4 font-display">
            Wake Up to What's{' '}
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
              Trending
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4 font-modern">
            Zzz-worthy topics too hot to snooze. Discover the latest innovations in sleep technology and comfort.
          </p>
        </div>

        {/* Trending Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {displayItems.map((item, index) => (
            <Link key={index} href={item.href} className="group block">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 h-full">
                {/* Product Image */}
                <div className="relative mb-6 -mx-6 -mt-6">
                  <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  
                  {/* Free Gift Badge - Top Left */}
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-blue-900 text-white border-0 px-3 py-1 text-sm font-medium">
                      Free Gift
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pr-0 flex flex-col h-full">
                  {/* Header - Product Title with Fixed Height */}
                  <div className="mb-4 h-16 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{item.title}</h3>
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">{renderStars(item.rating || 4.5)}</div>
                    <span className="font-bold text-gray-900">{item.rating}</span>
                    <span className="text-sm text-gray-600">Based on {item.reviewCount || 100} reviews</span>
                  </div>

                  {/* Features with Icons */}
                  <div className="space-y-2 mb-6">
                    {(item.features || ['Premium Quality', 'Comfort', 'Durability']).slice(0, 4).map((feature, index) => (
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
                      <span className="text-2xl font-bold text-gray-900">£{item.price}</span>
                      {item.original_price && item.original_price > item.price && (
                        <span className="text-lg text-gray-500 line-through">£{item.original_price}</span>
                      )}
                    </div>
                    {item.original_price && item.original_price > item.price && (
                      <span className="text-orange-500 font-semibold">
                        save £{(item.original_price - item.price).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Delivery Information */}
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-gray-600" />
                    <span className="text-sm text-gray-700">Free delivery {item.freeDelivery || 'Tomorrow'}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}


