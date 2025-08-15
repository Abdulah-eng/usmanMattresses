"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Heart, MessageCircle, Shield, ChevronDown, ChevronUp, X, ShoppingCart, Truck, Clock } from "lucide-react"
import Image from "next/image"
import { ReviewSection } from "@/components/review-section"

export interface ProductDetailHappyProps {
  product: {
    id: number
    name: string
    brand: string
    brandColor: string
    badge: string
    badgeColor: string
    image: string
    images?: string[]
    rating: number
    reviewCount: number
    features: string[]
    originalPrice: number
    currentPrice: number
    savings: number
    freeDelivery: string
    sizes: string[]
    selectedSize?: string
    category?: string
  }
}

export function ProductDetailHappy({ product }: ProductDetailHappyProps) {
  const [selectedImage, setSelectedImage] = useState(product.image)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState("Oak")
  const [quantity, setQuantity] = useState(1)
  const [sizeModalOpen, setSizeModalOpen] = useState(false)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [addItemModalOpen, setAddItemModalOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ description: true })
  const [isButtonSticky, setIsButtonSticky] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const buttonRef = useRef<HTMLDivElement>(null)

  // Size data array
  const sizeData = [
    { 
      name: "3' Single", 
      dimensions: "W 90cm X L 190cm (3' x 6'3\")", 
      availability: "Dispatched within 45 Days",
      inStock: false,
      wasPrice: 579.00,
      currentPrice: 520.00
    },
    { 
      name: "4' Small Double", 
      dimensions: "W 120cm X L 190cm (4' x 6'3\")", 
      availability: "In Stock",
      inStock: true,
      wasPrice: 679.00,
      currentPrice: 620.00
    },
    { 
      name: "4'6 Double", 
      dimensions: "W 135cm X L 190cm (4'6\" x 6'3\")", 
      availability: "In Stock",
      inStock: true,
      wasPrice: 679.00,
      currentPrice: 620.00
    },
    { 
      name: "5' Kingsize", 
      dimensions: "W 150cm X L 200cm (5' x 6'6\")", 
      availability: "In Stock",
      inStock: true,
      wasPrice: 799.00,
      currentPrice: 740.00
    },
    { 
      name: "6' Super Kingsize", 
      dimensions: "W 180cm X L 200cm (6' x 6'6\")", 
      availability: "In Stock",
      inStock: true,
      wasPrice: 999.00,
      currentPrice: 890.00
    },
    { 
      name: "5' Kingsize ZIP", 
      dimensions: "5' x 6'6\" Or Two Halves 2'6\" x 6'6\"", 
      availability: "Dispatched within 45 Days",
      inStock: false,
      wasPrice: 1549.00,
      currentPrice: 1379.00
    },
    { 
      name: "6' Super Kingsize ZIP", 
      dimensions: "6' x 6'6\" Or Two Halves 3' x 6'6\"", 
      availability: "Dispatched within 45 Days",
      inStock: false,
      wasPrice: 1899.00,
      currentPrice: 1699.00
    }
  ]
  
  // Mattress and pillow data for the add item modal
  interface MattressItem {
    id: number
    name: string
    image: string
    rating: number
    reviewCount: number
    originalPrice: number
    currentPrice: number
    firmness: string
    savings: string
  }
  
  interface PillowItem {
    id: number
    name: string
    image: string
    rating: number
    reviewCount: number
    originalPrice: number
    currentPrice: number
    type: string
    savings: string
  }
  
  const mattressData: MattressItem[] = [
    {
      id: 1,
      name: "Theo Pocket Spring Mattress",
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
      rating: 5,
      reviewCount: 208,
      originalPrice: 179.99,
      currentPrice: 161.99,
      firmness: "Soft-Medium",
      savings: "10%"
    },
    {
      id: 2,
      name: "Noah Memory Foam Spring Mattress",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 5,
      reviewCount: 204,
      originalPrice: 149.99,
      currentPrice: 134.99,
      firmness: "Medium",
      savings: "10%"
    },
    {
      id: 3,
      name: "Premium Hybrid Mattress",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
      rating: 5,
      reviewCount: 156,
      originalPrice: 299.99,
      currentPrice: 269.99,
      firmness: "Medium-Firm",
      savings: "10%"
    }
  ]
  
  const pillowData: PillowItem[] = [
    {
      id: 1,
      name: "Memory Foam Comfort Pillow",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 5,
      reviewCount: 189,
      originalPrice: 39.99,
      currentPrice: 35.99,
      type: "Memory Foam",
      savings: "10%"
    },
    {
      id: 2,
      name: "Cooling Gel Pillow",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=300&fit=crop",
      rating: 5,
      reviewCount: 167,
      originalPrice: 49.99,
      currentPrice: 44.99,
      type: "Cooling Gel",
      savings: "10%"
    },
    {
      id: 3,
      name: "Premium Down Alternative Pillow",
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
      rating: 5,
      reviewCount: 203,
      originalPrice: 69.99,
      currentPrice: 62.99,
      type: "Down Alternative",
      savings: "10%"
    }
  ]
  
  const [selectedSize, setSelectedSize] = useState("3' Single")
  
  // Get the selected size data
  const selectedSizeData = sizeData.find(size => size.name === selectedSize) || sizeData[0]

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image]

  const addToCart = () => {
    // Add to cart logic here
    console.log(`Adding ${quantity} ${product.name} to cart`)
  }

  // Carousel navigation functions
  const goToNextImage = () => {
    const currentIndex = gallery.findIndex(img => img === selectedImage);
    const newIndex = (currentIndex + 1) % gallery.length;
    setSelectedImage(gallery[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  const goToPreviousImage = () => {
    const currentIndex = gallery.findIndex(img => img === selectedImage);
    const newIndex = currentIndex <= 0 ? gallery.length - 1 : currentIndex - 1;
    setSelectedImage(gallery[newIndex]);
    setCurrentImageIndex(newIndex);
  };

  // Update current index when selected image changes
  useEffect(() => {
    const index = gallery.findIndex(img => img === selectedImage);
    setCurrentImageIndex(index >= 0 ? index : 0);
  }, [selectedImage, gallery]);

  // Scroll effect for sticky button - disabled on mobile for better performance
  useEffect(() => {
    const handleScroll = () => {
      // Only enable scroll effects on desktop
      if (window.innerWidth < 1024) {
        setIsButtonSticky(false);
        return;
      }

      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        // Button becomes sticky when it's about to go out of view (with a small buffer)
        const isPastButton = rect.bottom < window.innerHeight - 20
        setIsButtonSticky(isPastButton)
      }
    }

    const handleResize = () => {
      // Reset sticky state when switching between mobile/desktop
      if (window.innerWidth < 1024) {
        setIsButtonSticky(false);
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4">
      {/* Mobile: Product Details First */}
      <div className="lg:hidden mb-8 bg-white border-b border-gray-200">
        {/* Product Details Section for Mobile */}
        <div className="space-y-4">
          {/* Merged Product Info & Size Card */}
          <div className="rounded-xl p-4 sm:p-6 bg-white shadow-lg border border-gray-100">
            {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 break-words">{product.name}</h1>
              
              {/* Green Box with Reviews, Stars, and Savings - No Original Price */}
              {selectedSizeData.wasPrice && selectedSizeData.wasPrice > selectedSizeData.currentPrice && (
              <div className="bg-green-600 border border-green-700 rounded-lg p-3 mb-4 max-w-full overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2 h-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <span className="text-sm sm:text-lg font-bold text-white break-words">
                        Save £{(selectedSizeData.wasPrice - selectedSizeData.currentPrice).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 sm:h-5 sm:w-5 ${i < (product.rating || 4) ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <span className="text-sm sm:text-base font-semibold text-white">{product.reviewCount || 0}</span>
                    </div>
                  </div>
                </div>
              )}
              
            {/* Size and Pricing Section */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0">
                {/* Left Side: Size Name and Pricing */}
                <div className="flex-1 min-w-0">
                  {/* Size Name */}
                  <div className="font-semibold text-lg text-gray-900 mb-2 break-words">{selectedSizeData.name}</div>
                  
                  {/* Pricing - Now under the size name */}
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 line-through">Was £{selectedSizeData.wasPrice.toFixed(2)}</div>
                    <div className="text-2xl font-bold text-orange-600">£{selectedSizeData.currentPrice.toFixed(2)}</div>
                  </div>
                </div>
                
                {/* Right Side: Dimensions and Availability */}
                <div className="text-left sm:text-right sm:ml-4 min-w-0">
                  {/* Dimensions */}
                  <div className="text-sm text-gray-600 mb-3 break-words">{selectedSizeData.dimensions}</div>
                  
                  {/* Availability Status */}
                  <div className="flex items-center gap-2">
                    {selectedSizeData.inStock ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className="text-sm font-medium break-words">{selectedSizeData.availability}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-orange-600">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span className="text-sm font-medium break-words">{selectedSizeData.availability}</span>
                      </div>
                    )}
                  </div>
                  

                </div>
              </div>
            </div>
              
              {/* Product Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Product Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-x-4 gap-y-2">
                  {/* Left Column */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 break-words">Medium-Firm</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 break-words">1000 Springs</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 break-words">Memory Foam</span>
                  </div>
                  
                  {/* Right Column */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 break-words">Pocket Spring</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518-4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 break-words">Premium Quality</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 break-words">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Mattress/Pillow Button */}
            <button 
              onClick={() => setAddItemModalOpen(true)}
              className="w-full bg-orange-50 border border-orange-300 rounded-lg p-4 hover:border-orange-400 hover:bg-orange-100 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md mb-4"
            >
              <div className="flex items-center gap-3">
                {/* Mattress/Pillow Icon */}
                <div className="w-8 h-8 text-gray-600 flex-shrink-0">
                  {product.category === 'beds' ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="7" width="18" height="10" rx="2" ry="2"/>
                      <line x1="3" y1="12" x2="21" y2="12"/>
                      <line x1="3" y1="15" x2="21" y2="15"/>
                      <line x1="3" y1="9" x2="21" y2="9"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  )}
                </div>
                
                {/* Text Content */}
                <div className="text-left min-w-0">
                  <div className="font-bold text-black text-sm">
                    {product.category === 'beds' ? 'Add a mattress' : 'Add a pillow'}
                  </div>
                  <div className="text-sm text-gray-600">
                    Save an <span className="font-bold text-black">extra 10%</span>
                  </div>
                </div>
              </div>
            </button>

            {/* Choose Size - Clickable Option */}
            <div className="border-2 border-blue-800 rounded-lg p-4 bg-blue-800">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setSizeModalOpen(true)}>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"/>
                    </svg>
                  </div>
                  <span className="text-white font-semibold text-lg">Choose Size</span>
                </div>
                <div className="w-6 h-6 text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Modern Unified Quantity and Add to Basket Button */}
            <div className="space-y-4" ref={buttonRef}>
            {/* Enhanced Single Button with Modern Design */}
            <div className="relative group">
              {/* Main Button Background with Orange Theme and Enhanced Styling */}
                  <button 
                onClick={addToCart} 
                className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white text-lg py-7 rounded-2xl transition-all duration-300 flex items-center justify-start relative overflow-hidden pl-6 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] border border-orange-400/20"
              >
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Add to Basket Text with Enhanced Typography */}
                <div className="relative z-10 flex items-center gap-3">
                  {/* Improved Shopping Cart Icon - Matching the Choose Size button style */}
                  <div className="w-6 h-6 text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"/>
                    </svg>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="font-bold text-xl tracking-wide">Add to Basket</span>
                  </div>
                </div>
                  </button>
              
              {/* Enhanced Quantity Controls Overlay - Smaller Size and Closer to Corner */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                {/* Minus Button with Smaller Size */}
                  <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    quantity > 1 && setQuantity(quantity - 1);
                  }}
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group/btn"
                  disabled={quantity <= 1}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-3 h-3 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                    </svg>
                  </button>
                
                {/* Enhanced Quantity Display - Smaller Size */}
                <div className="relative">
                  <div className="w-12 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-white tracking-wide">{quantity}</span>
                </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-full bg-white/10 blur-sm scale-110"></div>
              </div>
              
                {/* Plus Button with Smaller Size */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuantity(quantity + 1);
                  }}
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group/btn"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-3 h-3 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
            </div>

              {/* Subtle Bottom Glow Effect - Orange Theme */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-y-1/2 w-4/5 h-2 bg-orange-600/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Klarna Payment Option */}
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-5 bg-pink-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-black">Klarna</span>
              </div>
              <div className="text-sm text-gray-700">
                3 payments of <span className="font-semibold">£{(selectedSizeData.currentPrice / 3).toFixed(2)}</span> at 0% interest with <span className="font-semibold">Klarna</span>
              </div>
            </div>
            <div className="text-sm text-primary underline cursor-pointer">Learn more</div>
          </div>
        </div>
      </div>

      {/* Desktop: Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 relative">
        {/* Left: gallery - takes 3/5 of the width */}
        <div className="lg:col-span-3 min-w-0">
          <div className="z-10">
            {/* Main Large Image */}
            <div className="relative h-[60vh] sm:h-[70vh] lg:h-[95vh] rounded-xl overflow-hidden bg-gray-50 cursor-pointer mb-4" onClick={() => {
              const currentIndex = gallery.findIndex(img => img === selectedImage);
              setModalImageIndex(currentIndex >= 0 ? currentIndex : 0);
              setImageModalOpen(true);
            }}>
              <Image 
                src={selectedImage || product.image || "/placeholder.svg"} 
                alt={product.name} 
                fill 
                className="object-cover"
                priority
                onError={(e) => {
                  console.error('Image failed to load:', e)
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg"
                }}
              />
            </div>
            
            {/* Image Carousel with Navigation Arrows */}
            {gallery.length > 1 && (
              <div className="mb-4">
                {/* Carousel Container */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Left Navigation Arrow */}
                  <button
                    onClick={goToPreviousImage}
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-200 z-10 group"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  {/* Image Thumbnails */}
                  <div className="flex gap-2 sm:gap-3 flex-1 overflow-hidden">
                    {gallery.map((image, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImage(image)}
                        className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer group flex-shrink-0 ${
                          selectedImage === image 
                            ? "border-orange-500 ring-2 ring-orange-200 scale-105" 
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                      >
                        <Image 
                          src={image} 
                          alt={`${product.name} ${idx + 1}`} 
                          fill 
                          className="object-cover"
                        />
                        
                        {/* Hover Overlay */}
                        <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 ${
                          selectedImage === image ? 'bg-orange-500/20' : ''
                        }`}></div>
                        

                      </div>
                    ))}
                  </div>
                  
                  {/* Right Navigation Arrow */}
                  <button
                    onClick={goToNextImage}
                    className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-200 z-10 group"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Premium Sleep Experience Section - Beneath the image gallery */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg mt-8">
            {/* 1. Premium Sleep Experience Header */}
            <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                  Premium Sleep Experience
                </h2>
              </div>
              
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium mb-4">
                Experience the perfect blend of <span className="font-bold text-orange-700">luxury comfort</span> and <span className="font-bold text-orange-700">advanced technology</span>. 
                Our premium mattress combines 1000 individual pocket springs with memory foam layers for 
                <span className="font-bold text-orange-700"> exceptional support</span> and <span className="font-bold text-orange-700">ultimate relaxation</span>.
              </p>
              
              <div className="flex items-center gap-2 text-orange-700 font-semibold text-sm">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-xs sm:text-sm">10-Year Warranty • Free Delivery • 100-Night Trial</span>
              </div>
            </div>

            {/* 2. Reasons to Buy */}
            <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100">
              <h2 className="text-lg sm:text-xl font-bold text-black mb-6">Reasons to Buy</h2>
              <div className="grid grid-cols-1 gap-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">Premium quality pocket spring construction</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">Advanced memory foam comfort layers</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">Superior edge-to-edge support</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">Temperature regulating technology</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">10-year warranty for peace of mind</span>
                </div>
              </div>
            </div>

            {/* 3. Features You'll Love */}
            <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100">
                              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Features you'll love</h2>
                </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Support System */}
                <div className="text-center min-w-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-orange-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="8" width="20" height="8" rx="1" ry="1"/>
                      <path d="M4 10h2M8 10h2M12 10h2M16 10h2M20 10h2"/>
                      <rect x="2" y="12" width="20" height="4" rx="1" ry="1"/>
                      <path d="M4 14h2M8 14h2M12 14h2M16 14h2M20 14h2"/>
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Support System</div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Pocket Springs</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Individually pocketed springs work to give you support exactly where you need it.
                  </p>
                </div>
                
                {/* Comfort Fillings */}
                <div className="text-center min-w-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-orange-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Comfort Fillings</div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Memory Foam</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Moulds to your body, giving orthopaedic support and superb comfort.
                  </p>
                </div>
                
                {/* Firmness */}
                <div className="text-center min-w-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-orange-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="3"/>
                      <path d="M12 11v6"/>
                      <path d="M8 15h8"/>
                      <path d="M6 21h12"/>
                    </svg>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mb-1">Firmness</div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Medium</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Good all-rounder for front, side or back sleepers.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Firmness Scale */}
            <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100">
              <div className="text-center">
                {/* Circular Object with Wavy Lines Icon */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-gray-700">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {/* Circular object (weight/pressure) */}
                    <circle cx="12" cy="6" r="2" fill="currentColor"/>
                    {/* Three wavy lines decreasing in length */}
                    <path d="M4 18c0 0 2-1 8-1s8 1 8 1" strokeWidth="1.5"/>
                    <path d="M5 20c0 0 2-1 7-1s7 1 7 1" strokeWidth="1.5"/>
                    <path d="M6 22c0 0 2-1 6-1s6 1 6 1" strokeWidth="1.5"/>
                  </svg>
                </div>
                
                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">Firmness Scale</h3>
                
                {/* Scale Bar */}
                <div className="relative min-w-0 overflow-hidden">
                  {/* Numerical Ranges */}
                  <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-2 px-1">
                    <span className="break-words">1-2</span>
                    <span className="break-words">3-4</span>
                    <span className="text-gray-700 font-medium break-words">5-6</span>
                    <span className="break-words">7-8</span>
                    <span className="break-words">8-9</span>
                    <span className="break-words">9-10</span>
                  </div>
                  
                  {/* Scale Bar Segments */}
                  <div className="flex h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gray-200 flex-1 rounded-l-full"></div>
                    <div className="h-full bg-gray-200 flex-1"></div>
                    <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 flex-1 shadow-lg transform hover:scale-y-110 transition-all duration-300 rounded-md"></div>
                    <div className="h-full bg-gray-200 flex-1"></div>
                    <div className="h-full bg-gray-200 flex-1"></div>
                    <div className="h-full bg-gray-200 flex-1 rounded-r-full"></div>
                  </div>
                  
                  {/* Descriptive Labels */}
                  <div className="flex justify-between text-xs sm:text-sm text-gray-700 mt-2 px-1">
                    <span className="break-words">Plush</span>
                    <span className="break-words">Medium-Plush</span>
                    <span className="text-orange-600 font-semibold break-words">Medium</span>
                    <span className="break-words">Medium-Firm</span>
                    <span className="break-words">Firm</span>
                    <span className="break-words">Extra-firm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Product Specifications Grid */}
            <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                
                {/* Support */}
                <div className="text-center border border-gray-200 rounded-lg p-3 bg-white transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 mx-auto mb-2 text-gray-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M4 5h2M18 5h2M8 3h8M6 9h12M6 11h12M6 13h12"/>
                      <path d="M4 17l2 2M20 17l-2 2"/>
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-gray-800">Support</h3>
                    <div className="w-3 h-3 text-gray-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex h-2 bg-gray-100 rounded-full overflow-hidden max-w-32 mx-auto shadow-inner">
                      <div className="h-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 flex-1 shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300 rounded-l-full"></div>
                      <div className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 flex-1 shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300"></div>
                      <div className="h-full bg-gray-200 flex-1 rounded-r-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-700 max-w-32 mx-auto">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>

                {/* Pressure Relief */}
                <div className="text-center border border-gray-200 rounded-lg p-3 bg-white transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 mx-auto mb-2 text-gray-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                      <path d="M12 11v6"/>
                      <path d="M8 15h8"/>
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-gray-800">Pressure Relief</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex h-2 bg-gray-100 rounded-full overflow-hidden max-w-32 mx-auto shadow-inner">
                      <div className="h-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 flex-1 shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300 rounded-l-full"></div>
                      <div className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 flex-1 shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300"></div>
                      <div className="h-full bg-gray-200 flex-1 rounded-r-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-700 max-w-32 mx-auto">
                      <span>Basic</span>
                      <span>Medium</span>
                      <span>Advanced</span>
                    </div>
                  </div>
                </div>

                {/* Air Circulation */}
                <div className="text-center border border-gray-200 rounded-lg p-3 bg-white transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 mx-auto mb-2 text-gray-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 12h6l3-9 3 9h6"/>
                      <path d="M3 12v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6"/>
                      <path d="M7 8l2-4 2 4"/>
                      <path d="M15 8l2-4 2 4"/>
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-gray-800">Air Circulation</h3>
                    <div className="w-3 h-3 text-gray-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex h-2 bg-gray-100 rounded-full overflow-hidden max-w-32 mx-auto shadow-inner">
                      <div className="h-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 flex-1 shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300 rounded-l-full"></div>
                      <div className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 flex-1 shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300"></div>
                      <div className="h-full bg-gray-200 flex-1 rounded-r-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-700 max-w-32 mx-auto">
                      <span>Good</span>
                      <span>Better</span>
                      <span>Best</span>
                    </div>
                  </div>
                </div>

                {/* Durability */}
                <div className="text-center border border-gray-200 rounded-lg p-3 bg-white transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 mx-auto mb-2 text-gray-700">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-sm font-bold text-gray-800">Durability</h3>
                    <div className="w-3 h-3 text-gray-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                        <line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex h-2 bg-gray-100 rounded-full overflow-hidden max-w-32 mx-auto shadow-inner">
                      <div className="h-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 flex-1 shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300 rounded-l-full"></div>
                      <div className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 flex-1 shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300"></div>
                      <div className="h-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 flex-1 shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300 rounded-r-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-700 max-w-32 mx-auto">
                      <span>Good</span>
                      <span>Better</span>
                      <span>Best</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Collapsible Sections (Accordion) */}
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="space-y-4">
                {/* Description Card */}
                <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl border border-orange-200 transition-all duration-200 overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-6 cursor-pointer group"
                    onClick={() => toggleSection('description')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-black group-hover:text-gray-800 transition-colors">Description</h3>
                        <p className="text-sm font-semibold text-black">Product details and specifications</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <svg 
                        className={`w-4 h-4 text-black group-hover:text-gray-800 transition-all duration-200 ${expandedSections.description ? 'rotate-45' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Expandable Description Content */}
                  {expandedSections.description && (
                    <div className="px-6 pb-6 border-t border-orange-200">
                      <div className="pt-6 space-y-12">
                        {/* Introduction */}
                        <div className="text-center">
                          <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
                            The King Arthur Mattress represents the pinnacle of sleep technology, combining advanced pocket spring engineering with premium memory foam comfort layers. This hybrid mattress is designed to provide exceptional support and pressure relief for all sleeping positions.
                          </p>
                        </div>
                        
                        {/* Premium Sleep Technology Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                          <div className="order-2 lg:order-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left">Premium Sleep Technology</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              Our advanced mattress technology combines the best of both worlds. The innovative pocket spring system provides targeted support while the premium memory foam layers offer exceptional comfort and pressure relief.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                              Each spring works independently to contour to your body shape, ensuring optimal spinal alignment and reducing pressure points for a truly restful night's sleep.
                            </p>
                          </div>
                          <div className="order-1 lg:order-2 relative h-64 lg:h-80 rounded-xl overflow-hidden bg-gray-100">
                            <img 
                              src="/images/mattress-springs.jpg" 
                              alt="Premium mattress with pocket springs showing internal structure"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3EMattress Springs%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                        </div>
                        
                        {/* Superior Comfort Features Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                          <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden bg-gray-100">
                            <img 
                              src="/images/mattress-comfort.jpg" 
                              alt="Luxury mattress with premium bedding and pillows"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3EMattress Comfort%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left">Superior Comfort Features</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              Every detail has been carefully considered to provide the ultimate sleep experience. The breathable bamboo cover regulates temperature while the edge-to-edge support ensures you can use the full mattress surface without roll-off.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                              Our advanced pressure relief system adapts to your sleeping position, providing personalized comfort that evolves with your body's needs throughout the night.
                            </p>
                          </div>
                        </div>
                        
                        {/* Quality Assurance Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                          <div className="order-2 lg:order-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left">Quality Assurance</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                              We stand behind the quality of our mattress with comprehensive testing and certification. Every mattress undergoes rigorous quality control to ensure it meets our exacting standards for comfort, durability, and performance.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                              Backed by a 10-year warranty and 100-night trial, you can purchase with complete confidence. Our commitment to quality means you'll enjoy exceptional sleep for years to come.
                            </p>
                          </div>
                          <div className="order-1 lg:order-2 relative h-64 lg:h-80 rounded-xl overflow-hidden bg-gray-100">
                            <img 
                              src="/images/mattress-quality.jpg" 
                              alt="Professional mattress testing and quality control"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Crect width='%23f3f4f6'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3EMattress Quality%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Dimensions Card */}
                <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl border border-orange-200 transition-all duration-200 overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-6 cursor-pointer group"
                    onClick={() => toggleSection('dimensions')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-black group-hover:text-gray-800 transition-colors">Dimensions</h3>
                        <p className="text-sm font-semibold text-black">Size and measurement details</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <svg 
                        className={`w-4 h-4 text-black group-hover:text-gray-800 transition-all duration-200 ${expandedSections.dimensions ? 'rotate-45' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Expandable Dimensions Content */}
                  {expandedSections.dimensions && (
                    <div className="px-6 pb-6 border-t border-orange-200">
                      <div className="pt-6 space-y-8">
                        {/* Product Name Header */}
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">King Arthur Mattress</h3>
                          <p className="text-gray-600">Premium Hybrid Mattress Dimensions</p>
                        </div>
                        
                        {/* Dimensions Grid Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                          {/* Technical Specifications */}
                          <div className="space-y-6">
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900 mb-4">Overall Dimensions</h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">A: Height</span>
                                  <span className="text-gray-900 font-semibold">25 cm</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">B: Length</span>
                                  <span className="text-gray-900 font-semibold">200 cm</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">C: Width</span>
                                  <span className="text-gray-900 font-semibold">180 cm</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900 mb-4">Mattress Specifications</h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Mattress Size</span>
                                  <span className="text-gray-900 font-semibold">200 x 180 cm</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Maximum Height</span>
                                  <span className="text-gray-900 font-semibold">25 cm</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Weight Capacity</span>
                                  <span className="text-gray-900 font-semibold">200 kg</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900 mb-4">Construction Details</h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Pocket Springs</span>
                                  <span className="text-gray-900 font-semibold">1000 count</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Comfort Layer</span>
                                  <span className="text-gray-900 font-semibold">8 cm</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Support Layer</span>
                                  <span className="text-gray-900 font-semibold">17 cm</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-500 italic">
                              All measurements are approximate and may vary slightly.
                            </div>
                          </div>
                          
                          {/* Technical Diagram */}
                          <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden bg-gray-50 border border-gray-200">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                              {/* Mattress Diagram */}
                              <div className="relative w-full h-full flex items-center justify-center">
                                {/* Main Mattress */}
                                <div className="relative w-48 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg border-2 border-orange-400 shadow-lg">
                                  {/* Pocket Springs Pattern */}
                                  <div className="absolute inset-2 grid grid-cols-8 grid-rows-4 gap-1">
                                    {Array.from({ length: 32 }).map((_, i) => (
                                      <div key={i} className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-60"></div>
                                    ))}
                                  </div>
                                  
                                  {/* Dimension Labels */}
                                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                    <div className="flex items-center gap-1">
                                      <span className="text-xs font-bold text-gray-700">A</span>
                                      <span className="text-xs text-gray-600">25cm</span>
                                    </div>
                                  </div>
                                  <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
                                    <div className="flex items-center gap-1">
                                      <span className="text-xs font-bold text-gray-700">B</span>
                                      <span className="text-xs text-gray-600">200cm</span>
                                    </div>
                                  </div>
                                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                                    <div className="flex items-center gap-1">
                                      <span className="text-xs font-bold text-gray-700">C</span>
                                      <span className="text-xs text-gray-600">180cm</span>
                                    </div>
                                  </div>
                                  
                                  {/* Comfort Layer Indicator */}
                                  <div className="absolute top-1 left-1 right-1 h-2 bg-gradient-to-r from-blue-200 to-blue-300 rounded-sm"></div>
                                  
                                  {/* Support Layer Indicator */}
                                  <div className="absolute bottom-1 left-1 right-1 h-2 bg-gradient-to-r from-green-200 to-green-300 rounded-sm"></div>
                                </div>
                                
                                {/* Dimension Lines */}
                                <div className="absolute top-0 left-1/2 w-px h-8 bg-red-500"></div>
                                <div className="absolute top-1/2 right-0 w-8 h-px bg-red-500"></div>
                                <div className="absolute bottom-0 left-1/2 w-px h-8 bg-red-500"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Available Sizes Grid */}
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-4">Available Sizes</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sizeData.map((size) => (
                              <div key={size.name} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="font-semibold text-gray-900 mb-2">{size.name}</div>
                                <div className="text-sm text-gray-600 mb-2">{size.dimensions}</div>
                                <div className="text-sm text-orange-600 font-semibold">£{size.currentPrice.toFixed(2)}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Additional Notes */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Important Notes</h4>
                          <div className="space-y-2 text-sm text-gray-700">
                            <p>• Mattress dimensions are standard sizes as listed above</p>
                            <p>• Maximum mattress height should not exceed 25 cm for optimal fit</p>
                            <p>• Weight capacity is distributed across the entire mattress surface</p>
                            <p>• Pocket spring count may vary slightly due to manufacturing tolerances</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Product Questions Card */}
                <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl border border-orange-200 transition-all duration-200 overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-6 cursor-pointer group"
                    onClick={() => toggleSection('questions')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-black group-hover:text-gray-800 transition-colors">Product Questions</h3>
                        <p className="text-sm font-semibold text-black">Frequently asked questions</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <svg 
                        className={`w-4 h-4 text-black group-hover:text-gray-800 transition-all duration-200 ${expandedSections.questions ? 'rotate-45' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Expandable Questions Content */}
                  {expandedSections.questions && (
                    <div className="px-6 pb-6 border-t border-orange-200">
                      <div className="pt-6 space-y-6">
                        {/* FAQ Section */}
                        <div className="space-y-4">
                          <div className="border-b border-gray-200 pb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">How firm is this mattress?</h4>
                            <p className="text-gray-700 text-sm">The King Arthur Mattress has a medium-firm feel, rated 6-7 on a scale of 1-10. This provides excellent support while maintaining comfort for most sleepers.</p>
                          </div>
                          
                          <div className="border-b border-gray-200 pb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">What's the difference between pocket springs and regular springs?</h4>
                            <p className="text-gray-700 text-sm">Pocket springs are individually wrapped, allowing them to move independently and provide targeted support. Regular springs are connected and move together, offering less precise support.</p>
                          </div>
                          
                          <div className="border-b border-gray-200 pb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">How long does delivery take?</h4>
                            <p className="text-gray-700 text-sm">Standard delivery takes 3-5 business days. Express delivery is available for next-day delivery in most areas.</p>
                          </div>
                          
                          <div className="border-b border-gray-200 pb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Can I return the mattress if I don't like it?</h4>
                            <p className="text-gray-700 text-sm">Yes! We offer a 100-night trial period. If you're not completely satisfied, you can return the mattress for a full refund.</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">How do I care for my mattress?</h4>
                            <p className="text-gray-700 text-sm">Rotate your mattress every 3-6 months, use a mattress protector, and clean spills immediately. The bamboo cover is removable and machine washable.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Warranty & Care Card */}
                <div className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl border border-orange-200 transition-all duration-200 overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-6 cursor-pointer group"
                    onClick={() => toggleSection('warranty')}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-black group-hover:text-gray-800 transition-colors">Warranty & Care</h3>
                        <p className="text-sm font-semibold text-black">Warranty details and care instructions</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <svg 
                        className={`w-4 h-4 text-black group-hover:text-gray-800 transition-all duration-200 ${expandedSections.warranty ? 'rotate-45' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Expandable Warranty Content */}
                  {expandedSections.warranty && (
                    <div className="px-6 pb-6 border-t border-orange-200">
                      <div className="pt-6 space-y-6">
                        {/* Warranty Details */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Warranty Coverage</h4>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                              </svg>
                              <span className="font-semibold text-green-800">10-Year Full Warranty</span>
                            </div>
                            <p className="text-green-700 text-sm">Comprehensive coverage against manufacturing defects, sagging, and structural issues.</p>
                          </div>
                        </div>
                        
                        {/* Care Instructions */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Care Instructions</h4>
                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <span className="font-medium text-gray-900">Regular Rotation:</span>
                                <span className="text-gray-700 text-sm"> Rotate your mattress every 3-6 months to ensure even wear.</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <span className="font-medium text-gray-900">Use a Mattress Protector:</span>
                                <span className="text-gray-700 text-sm"> Protect against spills, stains, and allergens.</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <span className="font-medium text-gray-900">Clean Spills Immediately:</span>
                                <span className="text-gray-700 text-sm"> Blot with a clean cloth and mild detergent if needed.</span>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <span className="font-medium text-gray-900">Bamboo Cover Care:</span>
                                <span className="text-gray-700 text-sm"> Remove and machine wash on gentle cycle, air dry.</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Trial Period */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">100-Night Trial</h4>
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-blue-800 text-sm">
                              Try your mattress risk-free for 100 nights. If you're not completely satisfied, 
                              return it for a full refund. No questions asked.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: details - takes 2/5 of the width */}
        <div className="hidden lg:block lg:col-span-2 space-y-4 lg:sticky lg:top-0 lg:self-start z-30 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200 transition-all duration-300" style={{ position: 'sticky', top: 0, willChange: 'transform', transform: 'translateZ(0)' }}>
          {/* Merged Product Info & Size Card */}
          <div className="rounded-xl p-6 bg-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative z-0">
            {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              {/* Green Box with Reviews, Stars, and Savings - No Original Price */}
              {selectedSizeData.wasPrice && selectedSizeData.wasPrice > selectedSizeData.currentPrice && (
              <div className="bg-green-600 border border-green-700 rounded-lg p-3 mb-4 max-w-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                        <span className="text-lg font-bold text-white">
                          Save £{(selectedSizeData.wasPrice - selectedSizeData.currentPrice).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-5 w-5 ${i < (product.rating || 4) ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                        ))}
                      </div>
                      <span className="text-base font-semibold text-white">{product.reviewCount || 0}</span>
                    </div>
                  </div>
                </div>
              )}
              
            {/* Size and Pricing Section */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-start justify-between mb-3">
                {/* Left Side: Size Name and Pricing */}
                <div className="flex-1">
                  {/* Size Name */}
                  <div className="font-semibold text-lg text-gray-900 mb-2">{selectedSizeData.name}</div>
                  
                  {/* Pricing - Now under the size name */}
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 line-through">Was £{selectedSizeData.wasPrice.toFixed(2)}</div>
                    <div className="text-2xl font-bold text-orange-600">£{selectedSizeData.currentPrice.toFixed(2)}</div>
                  </div>
                </div>
                
                {/* Right Side: Dimensions and Availability */}
                <div className="text-right ml-4">
                  {/* Dimensions */}
                  <div className="text-sm text-gray-600 mb-3">{selectedSizeData.dimensions}</div>
                  
                  {/* Availability Status */}
                  <div className="flex items-center justify-end gap-2">
                    {selectedSizeData.inStock ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className="text-sm font-medium">{selectedSizeData.availability}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-orange-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span className="text-sm font-medium">{selectedSizeData.availability}</span>
                      </div>
                    )}
                  </div>
                  
                </div>
              </div>
            </div>
              
              {/* Product Features */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Product Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-x-4 gap-y-2">
                  {/* Left Column */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 break-words">Medium-Firm</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 break-words">1000 Springs</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9 9 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 break-words">Memory Foam</span>
                  </div>
                  
                  {/* Right Column */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 break-words">Pocket Spring</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518-4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 break-words">Premium Quality</span>
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 break-words">Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Mattress/Pillow Button */}
            <button 
              onClick={() => setAddItemModalOpen(true)}
              className="w-full bg-orange-50 border border-orange-300 rounded-lg p-4 hover:border-orange-400 hover:bg-orange-100 transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md mb-4"
            >
              <div className="flex items-center gap-3">
                {/* Mattress/Pillow Icon */}
                <div className="w-8 h-8 text-gray-600 flex-shrink-0">
                  {product.category === 'beds' ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="7" width="18" height="10" rx="2" ry="2"/>
                      <line x1="3" y1="12" x2="21" y2="12"/>
                      <line x1="3" y1="15" x2="21" y2="15"/>
                      <line x1="3" y1="9" x2="21" y2="9"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                      <path d="M12 6v6l4 2"/>
                    </svg>
                  )}
                </div>
                
                {/* Text Content */}
                <div className="text-left min-w-0">
                  <div className="font-bold text-black text-sm">
                    {product.category === 'beds' ? 'Add a mattress' : 'Add a pillow'}
                  </div>
                  <div className="text-sm text-gray-600">
                    Save an <span className="font-bold text-black">extra 10%</span>
                  </div>
                </div>
              </div>
            </button>

            {/* Choose Size - Clickable Option */}
            <div className="border-2 border-blue-800 rounded-lg p-4 bg-blue-800">
              <div className="flex items-center justify-between cursor-pointer" onClick={() => setSizeModalOpen(true)}>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"/>
                    </svg>
                  </div>
                  <span className="text-white font-semibold text-lg">Choose Size</span>
                </div>
                <div className="w-6 h-6 text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Modern Unified Quantity and Add to Basket Button */}
            <div className="space-y-4" ref={buttonRef}>
            {/* Enhanced Single Button with Modern Design */}
            <div className="relative group">
              {/* Main Button Background with Orange Theme and Enhanced Styling */}
                  <button 
                onClick={addToCart} 
                className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:via-orange-700 hover:to-orange-800 text-white text-lg py-7 rounded-2xl transition-all duration-300 flex items-center justify-start relative overflow-hidden pl-6 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] border border-orange-400/20"
              >
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Add to Basket Text with Enhanced Typography */}
                <div className="relative z-10 flex items-center gap-3">
                  {/* Improved Shopping Cart Icon - Matching the Choose Size button style */}
                  <div className="w-6 h-6 text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"/>
                    </svg>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="font-bold text-xl tracking-wide">Add to Basket</span>
                  </div>
                </div>
                  </button>
              
              {/* Enhanced Quantity Controls Overlay - Smaller Size and Closer to Corner */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                {/* Minus Button with Smaller Size */}
                  <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    quantity > 1 && setQuantity(quantity - 1);
                  }}
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group/btn"
                  disabled={quantity <= 1}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-3 h-3 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
                    </svg>
                  </button>
                
                {/* Enhanced Quantity Display - Smaller Size */}
                <div className="relative">
                  <div className="w-12 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-white tracking-wide">{quantity}</span>
                </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-full bg-white/10 blur-sm scale-110"></div>
              </div>
              
                {/* Plus Button with Smaller Size */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setQuantity(quantity + 1);
                  }}
                  className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group/btn"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-3 h-3 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
            </div>

              {/* Subtle Bottom Glow Effect - Orange Theme */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-y-1/2 w-4/5 h-2 bg-orange-600/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          {/* Klarna Payment Option */}
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-5 bg-pink-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-black">Klarna</span>
              </div>
              <div className="text-sm text-gray-700">
                3 payments of <span className="font-semibold">£{(selectedSizeData.currentPrice / 3).toFixed(2)}</span> at 0% interest with <span className="font-semibold">Klarna</span>
              </div>
            </div>
            <div className="text-sm text-primary underline cursor-pointer">Learn more</div>
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {imageModalOpen && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 backdrop-blur-sm transition-all duration-200 hover:scale-110"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image 
                src={gallery[modalImageIndex] || "/placeholder.svg"} 
                alt={product.name} 
                fill 
                className="object-contain" 
              />
            </div>

            {/* Navigation Arrows */}
            {gallery.length > 1 && (
              <>
                {/* Left Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalImageIndex(modalImageIndex === 0 ? gallery.length - 1 : modalImageIndex - 1);
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                {/* Right Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalImageIndex(modalImageIndex === gallery.length - 1 ? 0 : modalImageIndex + 1);
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Counter */}
            {gallery.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full backdrop-blur-sm border border-gray-200 shadow-lg">
                <span className="text-sm font-medium">
                  {modalImageIndex + 1} of {gallery.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Write a Review</h3>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Review Form */}
            <div className="p-6 space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-orange-400 transition-colors flex items-center justify-center"
                    >
                      <Star className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label htmlFor="reviewTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  id="reviewTitle"
                  placeholder="Summarize your experience"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Review Content */}
              <div>
                <label htmlFor="reviewContent" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  id="reviewContent"
                  rows={4}
                  placeholder="Share your experience with this mattress..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
                />
              </div>

              {/* Name */}
              <div>
                <label htmlFor="reviewerName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="reviewerName"
                  placeholder="How should we display your name?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setReviewModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Add to Basket Button - Disabled on mobile for better performance */}
      <div className="lg:hidden hidden">
        <div className="relative group">
          {/* Main Button Background with Orange Theme */}
          <button 
            onClick={addToCart} 
            className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-start relative overflow-hidden pl-4 shadow-lg border border-orange-400/20"
          >
            {/* Add to Basket Text */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-5 h-5 text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"/>
                </svg>
              </div>
              <span className="font-bold text-lg">Add to Basket</span>
            </div>
          </button>
          
          {/* Quantity Controls Overlay */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {/* Minus Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                quantity > 1 && setQuantity(quantity - 1);
              }}
              className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={quantity <= 1}
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" />
              </svg>
            </button>
            
            {/* Quantity Display */}
            <div className="w-10 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
              <span className="text-sm font-bold text-white">{quantity}</span>
            </div>
            
            {/* Plus Button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setQuantity(quantity + 1);
              }}
              className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-300"
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Select Colour - Only show for non-mattress products */}
      {!product.name.toLowerCase().includes('mattress') && (
      <div className="border rounded-xl p-4">
        <div className="text-sm font-semibold text-gray-900 mb-3">Select Colour</div>
        <div className="flex gap-3">
          {["Oak", "Walnut", "White"].map((c) => (
            <button
              key={c}
              onClick={() => setSelectedColor(c)}
              className={`px-4 py-2 rounded-lg border text-sm ${
                selectedColor === c ? "bg-blue-800 text-white border-blue-800" : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      )}

      {/* Size Modal */}
      {sizeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-semibold">Choose a Size</h3>
              <button 
                onClick={() => setSizeModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {sizeData.map((size) => (
                <div
                  key={size.name}
                  className={`relative p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 cursor-pointer ${
                    selectedSize === size.name 
                      ? 'border-blue-500 bg-blue-50 shadow-md' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setSelectedSize(size.name);
                    setSizeModalOpen(false);
                  }}
                >
                  {/* Size Name */}
                  <div className="font-semibold text-base sm:text-lg text-gray-900 mb-2">{size.name}</div>
                   
                  {/* Dimensions */}
                  <div className="text-xs sm:text-sm text-gray-600 mb-3">{size.dimensions}</div>
                   
                  {/* Availability Status */}
                  <div className="flex items-center gap-2 mb-3">
                    {size.inStock ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span className="text-xs sm:text-sm font-medium">{size.availability}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-orange-600">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span className="text-xs sm:text-sm font-medium">{size.availability}</span>
                      </div>
                    )}
                  </div>
                   
                  {/* Pricing */}
                  <div className="space-y-1">
                    <div className="text-xs sm:text-sm text-gray-500 line-through">Was £{size.wasPrice.toFixed(2)}</div>
                    <div className="text-lg sm:text-xl font-bold text-orange-600">£{size.currentPrice.toFixed(2)}</div>
                  </div>
                   
                  {/* Selection Indicator */}
                  {selectedSize === size.name && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {addItemModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end z-50">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {product.category === 'beds' ? 'Add a Mattress' : 'Add a Pillow'}
              </h3>
              <button 
                onClick={() => setAddItemModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Promotional Banner */}
            <div className="bg-red-600 text-white p-4 text-center">
              <p className="text-sm font-medium">
                SAVE 10% on any {product.category === 'beds' ? 'mattress' : 'pillow'} when you buy a {product.category === 'beds' ? 'bed' : 'mattress'}. 
                Discount automatically added in the checkout.
              </p>
            </div>

                        {/* Items List */}
            <div className="p-4 space-y-4">
              {product.category === 'beds' ? 
                mattressData.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    {/* Item Image */}
                    <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                      <a href="#" className="text-blue-600 text-xs underline">View Info</a>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < item.rating ? "text-green-500 fill-current" : "text-gray-300"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">{item.reviewCount} Reviews</span>
                      </div>
                      
                      {/* Price */}
                      <div className="space-y-1">
                        <div className="text-gray-500 line-through text-sm">Was £{item.originalPrice.toFixed(2)}</div>
                        <div className="font-bold text-gray-900">£{item.currentPrice.toFixed(2)}</div>
                        <div className="text-red-600 text-xs font-medium">You Save {item.savings}</div>
                      </div>
                      
                      {/* Firmness */}
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-700 bg-white">
                          {item.firmness}
                        </button>
                      </div>
                      
                      {/* Add Button */}
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                        Add
                      </button>
                    </div>
                  </div>
                )) : 
                pillowData.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    {/* Item Image */}
                    <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                      <a href="#" className="text-blue-600 text-xs underline">View Info</a>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < item.rating ? "text-green-500 fill-current" : "text-gray-300"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">{item.reviewCount} Reviews</span>
                      </div>
                      
                      {/* Price */}
                      <div className="space-y-1">
                        <div className="text-gray-500 line-through text-sm">Was £{item.originalPrice.toFixed(2)}</div>
                        <div className="font-bold text-gray-900">£{item.currentPrice.toFixed(2)}</div>
                        <div className="text-red-600 text-xs font-medium">You Save {item.savings}</div>
                      </div>
                      
                      {/* Type */}
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-700 bg-white">
                          {item.type}
                        </button>
                      </div>
                      
                      {/* Add Button */}
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                        Add
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}

      {/* Product Reviews */}
      <div className="mt-8 sm:mt-12 border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Customer Reviews</h2>
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 sm:h-5 sm:w-5 ${i < 4 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-base sm:text-lg font-semibold text-gray-700">4.8</span>
            </div>
            <span className="text-gray-500">•</span>
            <span className="text-sm sm:text-base text-gray-600">Based on 127 reviews</span>
          </div>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">Real customers share their experience with the King Arthur Mattress</p>
        </div>

        {/* Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Review 1 */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center">
                <span className="text-white font-semibold text-base sm:text-lg">S</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Sarah M.</h4>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < 5 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4">"Absolutely love this mattress! The medium-firm feel is perfect and the pocket springs provide amazing support. I wake up feeling refreshed every morning."</p>
            <div className="text-xs sm:text-sm text-gray-500">Verified Purchase • 2 weeks ago</div>
          </div>

          {/* Review 2 */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                <span className="text-white font-semibold text-base sm:text-lg">M</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Michael R.</h4>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < 4 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4">"Great value for money! The memory foam layer is so comfortable and the delivery was super fast. My back pain has significantly improved."</p>
            <div className="text-xs sm:text-sm text-gray-500">Verified Purchase • 1 month ago</div>
          </div>

          {/* Review 3 */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center">
                <span className="text-white font-semibold text-base sm:text-lg">E</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Emma L.</h4>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < 5 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4">"Perfect mattress for our guest room! Guests always compliment how comfortable it is. The quality is excellent and it looks great too."</p>
            <div className="text-xs sm:text-sm text-gray-500">Verified Purchase • 3 weeks ago</div>
          </div>

          {/* Review 4 */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center">
                <span className="text-white font-semibold text-base sm:text-lg">D</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">David K.</h4>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < 4 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4">"Switched from a much more expensive mattress and honestly prefer this one! The pocket springs are fantastic and it stays cool throughout the night."</p>
            <div className="text-xs sm:text-sm text-gray-500">Verified Purchase • 2 months ago</div>
          </div>

          {/* Review 5 */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                <span className="text-white font-semibold text-base sm:text-lg">L</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Lisa P.</h4>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < 5 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4">"Best mattress I've ever owned! The combination of pocket springs and memory foam is perfect. No more tossing and turning at night."</p>
            <div className="text-xs sm:text-sm text-gray-500">Verified Purchase • 1 week ago</div>
          </div>

          {/* Review 6 */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-indigo-400 to-blue-400 flex items-center justify-center">
                <span className="text-white font-semibold text-base sm:text-lg">J</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">James W.</h4>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < 4 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-4">"Excellent mattress for the price! The quality is outstanding and it's incredibly comfortable. Highly recommend to anyone looking for a great mattress."</p>
            <div className="text-xs sm:text-sm text-gray-500">Verified Purchase • 1 month ago</div>
          </div>
        </div>

        {/* Review Stats */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-xs sm:text-sm text-gray-600">Would Recommend</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">4.8/5</div>
            <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">127</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">5★</div>
            <div className="text-xs sm:text-sm text-gray-600">Most Common</div>
          </div>
        </div>

        {/* Write Review Button */}
        <div className="text-center mt-6 sm:mt-8">
          <button 
            onClick={() => setReviewModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Write a Review
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailHappy


