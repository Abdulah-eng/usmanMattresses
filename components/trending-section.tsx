import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from 'react'
import { ArrowRight, TrendingUp, Sparkles, Clock, Star } from 'lucide-react'
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
}

export function TrendingSection() {
  const [items, setItems] = useState<TrendingItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true)
        const res = await fetch('/api/homepage?key=trending')
        const json = await res.json()
        const mapped = (json.sections?.[0]?.items || []).map((it: any) => ({
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
          discount_label: it.discount_label
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
      discount_label: "25% OFF"
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
      discount_label: "22% OFF"
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
      discount_label: "18% OFF"
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
      discount_label: "17% OFF"
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
      discount_label: "19% OFF"
    }
  ]

  const displayItems = items.length > 0 ? items : fallbackItems

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
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white h-full">
                {/* Image - Made square and wider */}
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  
                  {/* Badge */}
                  {item.badge && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 shadow-lg font-semibold">
                        {item.badge}
                      </Badge>
                    </div>
                  )}
                  
                  {/* Rating */}
                  {item.rating && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-3 h-3 text-orange-500 fill-current" />
                      <span className="text-xs font-semibold text-black">{item.rating}</span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-4 sm:p-6 flex flex-col h-full">
                  <div className="flex-1">
                    {/* Category */}
                    {item.category && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-3 h-3 text-orange-500" />
                        <span className="text-xs font-medium text-gray-600 uppercase tracking-wide font-modern">
                          {item.category}
                        </span>
                      </div>
                    )}
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-black mb-2 line-clamp-2 font-display">
                      {item.title}
                    </h3>
                    
                    {/* Subtitle */}
                    {item.subtitle && (
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3 font-modern">
                        {item.subtitle}
                      </p>
                    )}
                    
                    {/* Price Section */}
                    {item.price && (
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl font-bold text-black font-display">
                          £{item.price}
                        </span>
                        {item.original_price && item.original_price > item.price && (
                          <>
                            <span className="text-lg text-gray-500 line-through font-modern">
                              £{item.original_price}
                            </span>
                            {item.discount_label && (
                              <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">
                                {item.discount_label}
                              </Badge>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs font-medium font-modern">{item.read_time}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm group-hover:from-orange-500 group-hover:to-red-600 transition-all duration-300 shadow-lg">
                      Claim Deal Now
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
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


