"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Heart, MessageCircle, Shield, ChevronDown, ChevronUp, X, ShoppingCart, Truck, Clock } from "lucide-react"
import Image from "next/image"

import { ColorSelection } from "@/components/color-selection"
import { useCart } from "@/lib/cart-context"

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
    type?: string
    colors?: string[]
    materials?: string[]
    dimensions?: {
      height: string
      length: string
      width: string
      mattress_size: string
      max_height: string
      weight_capacity: string
      pocket_springs: string
      comfort_layer: string
      support_layer: string
    }
    dispatchTime?: string
    reasonsToBuy?: string[]
    promotionalOffers?: any[]
    productQuestions?: any[]
    warrantyInfo?: any
    careInstructions?: string
    stockQuantity?: number
    inStock?: boolean
    shortDescription?: string
    longDescription?: string
    setupService?: boolean
    setupCost?: number
    monthlyPrice?: number
    comfortLevel?: string
    firmness?: string
    firmnessLevel?: number
    certifications?: string[]
    inStore?: boolean
    onSale?: boolean
  }
}

export function ProductDetailHappy({ product }: ProductDetailHappyProps) {
  // Safety check for product data
  if (!product || !product.name) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  const router = useRouter()
  const { dispatch } = useCart()
  const [selectedImage, setSelectedImage] = useState(product.images && product.images.length ? product.images[0] : product.image)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors && product.colors.length > 0 ? product.colors[0] : "Standard")
  const [quantity, setQuantity] = useState(1)
  const [sizeModalOpen, setSizeModalOpen] = useState(false)
  const [imageModalOpen, setImageModalOpen] = useState(false)

  const [addItemModalOpen, setAddItemModalOpen] = useState(false)
  const [addToBasketModalOpen, setAddToBasketModalOpen] = useState(false)

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({ description: true })

  // Debug function to test modal
  const handleAddToBasketClick = () => {
    console.log('Add to Basket clicked!')
    console.log('Current modal state:', addToBasketModalOpen)
    setAddToBasketModalOpen(true)
    console.log('Modal state after setting:', true)
  }

  const addToCart = () => {
    // Add to cart logic here
    console.log(`Adding ${quantity} ${product.name} to cart`)
    
    // Actually add the item to cart using cart context
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: selectedImage || product.image,
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        size: selectedSizeData?.name || 'Standard'
      }
    })
    
    // Open the add to basket modal to show success state
    setAddToBasketModalOpen(true)
  }

  const [isButtonSticky, setIsButtonSticky] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentSofaImage, setCurrentSofaImage] = useState(0)
  const buttonRef = useRef<HTMLDivElement>(null)
  
  // Sofa images array for the carousel
  const sofaImages = product.images && product.images.length > 0 ? product.images : [product.image]

  // Dynamic size data from product
  const sizeData = product.sizes && product.sizes.length > 0 ? product.sizes.map((size, index) => ({
    name: size,
    dimensions: `${size} dimensions`, // You can enhance this with actual dimension data if available
    availability: product.inStock ? "In Stock" : "Dispatched within 45 Days",
    inStock: product.inStock || false,
    wasPrice: product.originalPrice || 0,
    currentPrice: product.currentPrice || 0
  })) : [
    { 
      name: "Standard Size", 
      dimensions: "Standard dimensions", 
      availability: "In Stock",
      inStock: true,
      wasPrice: product.originalPrice || 0,
      currentPrice: product.currentPrice || 0
    }
  ]
  
  // Ensure we have valid prices
  const originalPrice = product.originalPrice || product.currentPrice || 0
  const currentPrice = product.currentPrice || product.originalPrice || 0
  const hasValidPrices = originalPrice > 0 && currentPrice > 0
  
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
  
  // Dynamic mattress data - can be populated from database or removed if not needed
  const mattressData: MattressItem[] = product.promotionalOffers?.filter(offer => offer.type === 'mattress')?.map(offer => ({
    id: offer.id || 1,
    name: offer.name || "Related Mattress",
    image: offer.image || "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
    rating: offer.rating || 5,
    reviewCount: offer.reviewCount || 200,
    originalPrice: offer.originalPrice || 179.99,
    currentPrice: offer.currentPrice || 161.99,
    firmness: offer.firmness || "Soft-Medium",
    savings: offer.savings || "10%"
  })) || []

  // Dynamic pillow data - can be populated from database or removed if not needed
  const pillowData: PillowItem[] = product.promotionalOffers?.filter(offer => offer.type === 'pillow')?.map(offer => ({
    id: offer.id || 1,
    name: offer.name || "Related Pillow",
    image: offer.image || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    rating: offer.rating || 5,
    reviewCount: offer.reviewCount || 200,
    originalPrice: offer.originalPrice || 149.99,
    currentPrice: offer.currentPrice || 134.99,
    type: offer.type || "Memory Foam",
    savings: offer.savings || "10%"
  })) || []
  
  const [selectedSize, setSelectedSize] = useState(product.selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : "Standard Size"))
  
  // Get the selected size data with fallback
  const selectedSizeData = sizeData.find(size => size.name === selectedSize) || sizeData[0] || {
    name: "Standard Size",
    dimensions: "Standard dimensions",
    availability: "In Stock",
    inStock: true,
    wasPrice: originalPrice,
    currentPrice: currentPrice
  }

  // Ensure selectedSizeData is always defined
  if (!selectedSizeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  // Ensure selectedSizeData has valid prices
  if (!selectedSizeData.wasPrice || !selectedSizeData.currentPrice) {
    selectedSizeData.wasPrice = selectedSizeData.wasPrice || originalPrice
    selectedSizeData.currentPrice = selectedSizeData.currentPrice || currentPrice
  }

  // Safe monthly price calculation
  const monthlyPrice = selectedSizeData.currentPrice > 0 ? Math.floor(selectedSizeData.currentPrice / 12) : 0

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image]

  const openAddToBasketModal = () => {
    console.log('Opening Add to Basket modal')
    // Directly add to cart when opening modal
    // This simulates the behavior you want
    setAddToBasketModalOpen(true)
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



  // Scroll effect for sticky button - enabled for both mobile and desktop
  useEffect(() => {
    const handleScroll = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        // Button becomes sticky when it's about to go out of view (with a small buffer)
        const isPastButton = rect.bottom < window.innerHeight - 20
        setIsButtonSticky(isPastButton)
      }
    }

    const handleResize = () => {
      // Reset sticky state when resizing
      setIsButtonSticky(false);
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
    <>
      <style jsx>{`
        .safe-area-bottom {
          padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
        }
        @media (max-width: 640px) {
          .safe-area-bottom {
            padding-left: max(1rem, env(safe-area-inset-left));
            padding-right: max(1rem, env(safe-area-inset-right));
          }
        }
        .mobile-sticky-button {
          max-width: 100vw;
          width: 100vw;
          left: 0;
          right: 0;
        }
      `}</style>
      <div className="bg-white border border-gray-100 rounded-xl p-3 sm:p-4 lg:p-4 pb-20 sm:pb-24 lg:pb-4">
      

      

      
      {/* Mobile: Product Details First */}
      <div className="lg:hidden mb-8 bg-white border-b border-gray-200">
        {/* Product Details Section for Mobile */}
        <div className="space-y-4">
          {/* Merged Product Info & Size Card */}
          <div className="rounded-xl p-4 sm:p-6 bg-white shadow-lg border border-gray-100">
            {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 break-words">{product.name}</h1>
              
              {/* Green Box with Reviews, Stars, and Savings - No Original Price */}
              {selectedSizeData && selectedSizeData.wasPrice && selectedSizeData.currentPrice && selectedSizeData.wasPrice > selectedSizeData.currentPrice && (
              <div className="bg-green-600 border border-green-700 rounded-lg p-3 mb-4 max-w-full overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-2 h-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <span className="text-sm sm:text-lg text-white break-words">
                        Save £{(selectedSizeData.wasPrice > 0 && selectedSizeData.currentPrice > 0 ? (selectedSizeData.wasPrice - selectedSizeData.currentPrice).toFixed(2) : '0.00')}
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
                  <div className="font-black text-lg sm:text-xl lg:text-2xl text-black mb-3 break-words">{selectedSizeData.name}</div>
                  
                  {/* Pricing - Now under the size name */}
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 line-through">Was £{selectedSizeData.wasPrice > 0 ? selectedSizeData.wasPrice.toFixed(2) : '0.00'}</div>
                    <div className="text-2xl font-black text-orange-600">£{selectedSizeData.currentPrice > 0 ? selectedSizeData.currentPrice.toFixed(2) : '0.00'}</div>
                  </div>
                </div>
                
                {/* Right Side: Dimensions and Availability */}
                <div className="text-left sm:text-right sm:ml-4 min-w-0">
                  {/* Dimensions */}
                  <div className="font-semibold text-base sm:text-lg lg:text-xl text-gray-800 mb-3 break-words">{selectedSizeData.dimensions}</div>
                  
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
                  {/* Dynamic features from product */}
                  {product.features && product.features.length > 0 ? (
                    product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 min-w-0">
                        <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 break-words">{feature}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 break-words">{product.firmness || 'Medium-Firm'}</span>
                      </div>
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 break-words">{product.dimensions?.pocket_springs || '1000 Springs'}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <ColorSelection 
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              colors={product.colors || ["Standard"]}
              className="mb-4"
            />

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
                3 payments of <span className="font-semibold">£{(selectedSizeData.currentPrice > 0 ? (selectedSizeData.currentPrice / 3).toFixed(2) : '0.00')}</span> at 0% interest with <span className="font-semibold">Klarna</span>
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
            <div className="relative h-[60vh] sm:h-[70vh] lg:h-[95vh] xl:h-[100vh] 2xl:h-[110vh] rounded-xl overflow-hidden bg-gray-50 cursor-pointer mb-4" onClick={() => {
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
                        className={`relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer group flex-shrink-0 ${
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
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
                <div className="flex items-start gap-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">100-night sleep trial guarantee</span>
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
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden max-w-32 mx-auto shadow-inner">
                      <div className="h-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 rounded-full shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300" style={{ width: '80%' }}></div>
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
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden max-w-32 mx-auto shadow-inner">
                      <div className="h-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 rounded-full shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300" style={{ width: '65%' }}></div>
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
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden max-w-32 mx-auto shadow-inner">
                      <div className="h-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 rounded-full shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300" style={{ width: '80%' }}></div>
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
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden max-w-32 mx-auto shadow-inner">
                      <div className="h-full bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 rounded-full shadow-lg transform hover:scale-y-125 hover:shadow-xl transition-all duration-300" style={{ width: '95%' }}></div>
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
                            {((product as any).longDescription) || `Discover ${product.name} — designed for comfort, support, and everyday durability.`}
                          </p>
                        </div>
                        
                        {/* Divider */}
                        <div className="border-t border-gray-200 my-8"></div>
                        
                        {/* Premium Sleep Technology Section */}
                        <div className="text-center space-y-6">
                          <h3 className="text-2xl font-bold text-gray-900">Premium Sleep Technology</h3>
                          <div className="relative h-80 lg:h-96 xl:h-[28rem] rounded-xl overflow-hidden bg-gray-100 mx-auto max-w-3xl lg:max-w-4xl">
                            <img 
                              src="/hello.jpeg" 
                              alt="Premium mattress with pocket springs showing internal structure"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3EMattress Springs%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                          <div className="max-w-3xl mx-auto space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                              Our advanced mattress technology combines the best of both worlds. The innovative pocket spring system provides targeted support while the premium memory foam layers offer exceptional comfort and pressure relief.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                              Each spring works independently to contour to your body shape, ensuring optimal spinal alignment and reducing pressure points for a truly restful night's sleep.
                            </p>
                          </div>
                        </div>
                        
                        {/* Divider */}
                        <div className="border-t border-gray-200 my-8"></div>
                        
                        {/* Superior Comfort Features Section */}
                        <div className="text-center space-y-6">
                          <h3 className="text-2xl font-bold text-gray-900">Superior Comfort Features</h3>
                          <div className="relative h-80 lg:h-96 xl:h-[28rem] rounded-xl overflow-hidden bg-gray-100 mx-auto max-w-3xl lg:max-w-4xl">
                            <img 
                              src="/hi.jpeg" 
                              alt="Luxury mattress with premium bedding and pillows"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3EMattress Comfort%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                          <div className="max-w-3xl mx-auto space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                              Every detail has been carefully considered to provide the ultimate sleep experience. The breathable bamboo cover regulates temperature while the edge-to-edge support ensures you can use the full mattress surface without roll-off.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                              Our advanced pressure relief system adapts to your sleeping position, providing personalized comfort that evolves with your body's needs throughout the night.
                            </p>
                          </div>
                        </div>
                        
                        {/* Divider */}
                        <div className="border-t border-gray-200 my-8"></div>
                        
                        {/* Quality Assurance Section */}
                        <div className="text-center space-y-6">
                          <h3 className="text-2xl font-bold text-gray-900">Quality Assurance</h3>
                          <div className="relative h-80 lg:h-96 xl:h-[28rem] rounded-xl overflow-hidden bg-gray-100 mx-auto max-w-4xl">
                            <img 
                              src="/hell.jpeg" 
                              alt="Professional mattress testing and quality control"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3EMattress Quality%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                          <div className="max-w-3xl mx-auto space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                              We stand behind the quality of our mattress with comprehensive testing and certification. Every mattress undergoes rigorous quality control to ensure it meets our exacting standards for comfort, durability, and performance.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                              Backed by a 10-year warranty and 100-night trial, you can purchase with complete confidence. Our commitment to quality means you'll enjoy exceptional sleep for years to come.
                            </p>
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
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                          <p className="text-gray-600">Product Dimensions</p>
                        </div>
                        
                        {/* Swipeable Sofa Images Carousel */}
                        <div className="relative mb-8">
                          <div className="flex justify-center">
                            <div className="relative h-80 lg:h-96 xl:h-[28rem] 2xl:h-[32rem] w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl rounded-xl overflow-hidden bg-gray-100">
                              {/* Current Image */}
                              <img 
                                src={sofaImages[currentSofaImage]} 
                                alt={`Sofa showing mattress dimensions and scale - View ${currentSofaImage + 1}`}
                                className="w-full h-full object-cover transition-opacity duration-300"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Crect width='400' height='300' fill='%23f4f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3ESofa Image%3C/text%3E%3C/svg%3E";
                                }}
                              />
                              
                              {/* Navigation Arrows */}
                              <button 
                                onClick={() => setCurrentSofaImage(prev => prev === 0 ? sofaImages.length - 1 : prev - 1)}
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                              >
                                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              
                              <button 
                                onClick={() => setCurrentSofaImage(prev => prev === sofaImages.length - 1 ? 0 : prev + 1)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
                              >
                                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          {/* Image Thumbnails */}
                          <div className="flex justify-center mt-4 space-x-3">
                            {sofaImages.map((image, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentSofaImage(index)}
                                className={`relative w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer group flex-shrink-0 ${
                                  index === currentSofaImage 
                                    ? "border-blue-500 ring-2 ring-blue-200 scale-105" 
                                    : "border-gray-200 hover:border-blue-300"
                                }`}
                              >
                                <img 
                                  src={image} 
                                  alt={`Sofa view ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' fill='%23f3f4f6'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%236b7280'%3ESofa Thumbnail%3C/text%3E%3C/svg%3E";
                                  }}
                                />
                                
                                {/* Hover Overlay */}
                                <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 ${
                                  index === currentSofaImage ? 'bg-blue-500/20' : ''
                                }`}></div>
                              </button>
                            ))}
                          </div>
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
                                  <span className="text-gray-900 font-semibold">{product.dimensions?.height || '25 cm'}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">B: Length</span>
                                  <span className="text-gray-900 font-semibold">{product.dimensions?.length || 'L 190cm'}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">C: Width</span>
                                  <span className="text-gray-900 font-semibold">{product.dimensions?.width || '135cm'}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900 mb-4">Mattress Specifications</h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Mattress Size</span>
                                  <span className="text-gray-900 font-semibold">{product.dimensions?.mattress_size || '135cm x L 190cm cm'}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Maximum Height</span>
                                  <span className="text-gray-900 font-semibold">{product.dimensions?.max_height || '25 cm'}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Weight Capacity</span>
                                  <span className="text-gray-900 font-semibold">{product.dimensions?.weight_capacity || '200 kg'}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-xl font-semibold text-gray-900 mb-4">Construction Details</h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Pocket Springs</span>
                                  <span className="text-gray-900 font-semibold">{product.dimensions?.pocket_springs || '1000 count'}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Comfort Layer</span>
                                  <span className="text-gray-900 font-semibold">{product.dimensions?.comfort_layer || '8 cm'}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                                  <span className="font-medium text-gray-700">Support Layer</span>
                                  <span className="text-gray-900 font-semibold">{product.dimensions?.support_layer || '17 cm'}</span>
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
                                 <div className="relative w-48 h-32 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                                   {/* Quilted Pattern - Top Layer */}
                                   <div className="absolute inset-2 grid grid-cols-12 grid-rows-6 gap-1">
                                     {Array.from({ length: 72 }).map((_, i) => (
                                       <div key={i} className="w-1 h-1 bg-gray-300 rounded-full opacity-40 hover:opacity-80 transition-opacity duration-200"></div>
                                     ))}
                                   </div>
                                   
                                   {/* Memory Foam Layer - Light Blue */}
                                   <div className="absolute top-4 left-1 right-1 h-2 bg-gradient-to-r from-blue-100 to-blue-200 rounded-sm border border-blue-200"></div>
                                   
                                   {/* Pocket Springs Pattern - Subtle dots */}
                                   <div className="absolute inset-4 grid grid-cols-10 grid-rows-5 gap-1">
                                     {Array.from({ length: 50 }).map((_, i) => (
                                       <div key={i} className="w-1 h-1 bg-gray-400 rounded-full opacity-60 hover:opacity-80 transition-opacity duration-200"></div>
                                     ))}
                                   </div>
                                   
                                   {/* Elegant Inner Border */}
                                   <div className="absolute inset-1 border border-gray-200 rounded-lg opacity-60"></div>
                                   
                                   {/* Hover Effect Overlay */}
                                   <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                                  
                                                                     {/* Dimension Labels */}
                                   <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                     <div className="flex items-center gap-1 bg-white rounded px-2 py-1 shadow-sm border border-gray-200">
                                       <span className="text-xs font-bold text-gray-700">A</span>
                                       <span className="text-xs text-gray-600">25cm</span>
                                       <span className="text-xs text-gray-500">Height</span>
                                     </div>
                                   </div>
                                   <div className="absolute -right-6 top-1/2 transform -translate-y-1/2">
                                     <div className="flex items-center gap-1 bg-white rounded px-2 py-1 shadow-sm border border-gray-200">
                                       <span className="text-xs font-bold text-gray-700">B</span>
                                       <span className="text-xs text-gray-600">{product.dimensions?.length || 'L 190cm'}</span>
                                       <span className="text-xs text-gray-500">Length</span>
                                     </div>
                                   </div>
                                   <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                                     <div className="flex items-center gap-1 bg-white rounded px-2 py-1 shadow-sm border border-gray-200">
                                       <span className="text-xs font-bold text-gray-700">C</span>
                                       <span className="text-xs text-gray-600">{product.dimensions?.width || '135cm'}</span>
                                       <span className="text-xs text-gray-500">Width</span>
                                     </div>
                                   </div>
                                  
                                                                     {/* Comfort Layer Indicator - Blue */}
                                   <div className="absolute top-1 left-1 right-1 h-3 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 rounded-sm border border-blue-300"></div>
                                   
                                   {/* Support Layer Indicator - Green */}
                                   <div className="absolute bottom-1 left-1 right-1 h-3 bg-gradient-to-r from-green-200 via-green-300 to-green-400 rounded-sm border border-green-300"></div>
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
                              <div 
                                key={size.name} 
                                className={`bg-white p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 cursor-pointer ${
                                  selectedSize === size.name 
                                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                }`}
                                onClick={() => setSelectedSize(size.name)}
                              >
                                <div className="font-semibold text-gray-900 mb-2">{size.name}</div>
                                <div className="text-sm text-gray-600 mb-2">{size.dimensions}</div>
                                <div className="text-sm text-orange-600 font-semibold">£{size.currentPrice.toFixed(2)}</div>
                                
                                {/* Selection Indicator */}
                                {selectedSize === size.name && (
                                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                                    </svg>
                                  </div>
                                )}
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
                          {product.productQuestions && product.productQuestions.length > 0 ? (
                            product.productQuestions.map((question, index) => (
                              <div key={index} className="border-b border-gray-200 pb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">{question.question || `Question ${index + 1}`}</h4>
                                <p className="text-gray-700 text-sm">{question.answer || 'Answer not available'}</p>
                              </div>
                            ))
                          ) : (
                            <>
                              <div className="border-b border-gray-200 pb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">How firm is this mattress?</h4>
                                <p className="text-gray-700 text-sm">This product has a {product.firmness?.toLowerCase() || 'medium-firm'} feel, providing excellent support while maintaining comfort for most sleepers.</p>
                              </div>
                              
                              <div className="border-b border-gray-200 pb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">What's the difference between pocket springs and regular springs?</h4>
                                <p className="text-gray-700 text-sm">Pocket springs are individually wrapped, allowing them to move independently and provide targeted support. Regular springs are connected and move together, offering less precise support.</p>
                              </div>
                              
                              <div className="border-b border-gray-200 pb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">How long does delivery take?</h4>
                                <p className="text-gray-700 text-sm">{product.dispatchTime || 'Standard delivery takes 3-5 business days. Express delivery is available for next-day delivery in most areas.'}</p>
                              </div>
                              
                              <div className="border-b border-gray-200 pb-4">
                                <h4 className="font-semibold text-gray-900 mb-2">Can I return the mattress if I don't like it?</h4>
                                <p className="text-gray-700 text-sm">Yes! We offer a 100-night trial period. If you're not completely satisfied, you can return the mattress for a full refund.</p>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">How do I care for my mattress?</h4>
                                <p className="text-gray-700 text-sm">{product.careInstructions || 'Rotate your mattress every 3-6 months, use a mattress protector, and clean spills immediately. The bamboo cover is removable and machine washable.'}</p>
                              </div>
                            </>
                          )}
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
                          {product.warrantyInfo && Object.keys(product.warrantyInfo).length > 0 ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                </svg>
                                <span className="font-semibold text-green-800">{product.warrantyInfo.duration || '10-Year Full Warranty'}</span>
                              </div>
                              <p className="text-green-700 text-sm">{product.warrantyInfo.description || 'Comprehensive coverage against manufacturing defects, sagging, and structural issues.'}</p>
                            </div>
                          ) : (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                                </svg>
                                <span className="font-semibold text-green-800">10-Year Full Warranty</span>
                              </div>
                              <p className="text-green-700 text-sm">Comprehensive coverage against manufacturing defects, sagging, and structural issues.</p>
                            </div>
                          )}
                        </div>
                        
                        {/* Care Instructions */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Care Instructions</h4>
                          {product.careInstructions ? (
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                <div>
                                  <span className="text-gray-700 text-sm">{product.careInstructions}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
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
                            </div>
                          )}
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
        <div className="hidden lg:block lg:col-span-2 space-y-2 lg:sticky lg:top-0 lg:self-start z-30 bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200 transition-all duration-300" style={{ position: 'sticky', top: 0, willChange: 'transform', transform: 'translateZ(0)' }}>
          {/* Merged Product Info & Size Card */}
          <div className="rounded-xl p-4 bg-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative z-0">
            {/* Product Title */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">{product.name}</h1>
              
              {/* Green Box with Reviews, Stars, and Savings - No Original Price */}
              {selectedSizeData && selectedSizeData.wasPrice && selectedSizeData.currentPrice && selectedSizeData.wasPrice > selectedSizeData.currentPrice && (
              <div className="bg-green-600 border border-green-700 rounded-lg p-3 mb-3 max-w-md">
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
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="flex items-start justify-between mb-2">
                {/* Left Side: Size Name and Pricing */}
                <div className="flex-1">
                  {/* Size Name */}
                  <div className="font-semibold text-lg text-gray-900 mb-1">{selectedSizeData.name}</div>
                  
                  {/* Pricing - Now under the size name */}
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 line-through">Was £{selectedSizeData.wasPrice > 0 ? selectedSizeData.wasPrice.toFixed(2) : '0.00'}</div>
                    <div className="text-2xl font-black text-orange-600">£{selectedSizeData.currentPrice > 0 ? selectedSizeData.currentPrice.toFixed(2) : '0.00'}</div>
                  </div>
                </div>
                
                {/* Right Side: Dimensions and Availability */}
                <div className="text-right ml-4">
                  {/* Dimensions */}
                  <div className="font-semibold text-base sm:text-lg lg:text-xl text-gray-800 mb-2">{selectedSizeData.dimensions}</div>
                  
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
                  {/* Dynamic features from product */}
                  {product.features && product.features.length > 0 ? (
                    product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 min-w-0">
                        <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 break-words">{feature}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 break-words">{product.firmness || 'Medium-Firm'}</span>
                      </div>
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                        <span className="text-sm text-gray-700 break-words">{product.dimensions?.pocket_springs || '1000 Springs'}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <ColorSelection 
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              colors={product.colors || ["Standard"]}
              className="mb-4"
            />

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
                3 payments of <span className="font-semibold">£{(selectedSizeData.currentPrice > 0 ? (selectedSizeData.currentPrice / 3).toFixed(2) : '0.00')}</span> at 0% interest with <span className="font-semibold">Klarna</span>
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



      {/* Mobile Sticky Add to Basket Button - Sticks to bottom when scrolled past original button */}
      <div className={`lg:hidden transition-all duration-300 mobile-sticky-button ${
        isButtonSticky 
          ? 'fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 p-4 pb-6 shadow-lg safe-area-bottom overflow-hidden' 
          : 'hidden'
      }`}>
        <div className="relative group w-full max-w-full overflow-hidden">
          {/* Main Button Background with Orange Theme */}
          <button 
            onClick={() => setAddToBasketModalOpen(true)} 
            className="w-full max-w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden shadow-lg border border-orange-400/20"
          >
            {/* Add to Basket Text */}
            <div className="relative z-10 flex items-center gap-3 min-w-0 flex-1 max-w-full">
              <div className="w-5 h-5 text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"/>
                </svg>
              </div>
              <span className="font-bold text-lg truncate max-w-full">Add to Basket</span>
            </div>
          </button>
          
          {/* Quantity Controls Overlay */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 max-w-[100px]">
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
            <div className="w-10 h-6 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center min-w-0">
              <span className="text-sm font-bold text-white truncate">{quantity}</span>
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



      {/* Add to Basket Top Strip */}
      {addToBasketModalOpen && (
        <div className="fixed top-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-lg transition-all duration-300 animate-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Left Side - Product Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Product Image */}
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={selectedImage || product.image || "/placeholder.svg"} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm truncate">{product.name}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="truncate">{selectedSizeData.name}</span>
                    <span className="truncate">{selectedSizeData.dimensions}</span>
                </div>
                  </div>
                </div>

              {/* Center - Quantity Controls */}
              <div className="hidden md:flex items-center gap-3">
                      <button 
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors disabled:opacity-40"
                        disabled={quantity <= 1}
                      >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                        </svg>
                      </button>
                <span className="text-sm font-semibold w-8 text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                  </div>

              {/* Right Side - Pricing and Actions */}
              <div className="flex items-center gap-4 flex-shrink-0">
                {/* Pricing */}
                <div className="text-right hidden sm:block">
                      {selectedSizeData.wasPrice && selectedSizeData.wasPrice > selectedSizeData.currentPrice && (
                    <div className="text-xs text-gray-500 line-through">Was £{(selectedSizeData.wasPrice > 0 ? (selectedSizeData.wasPrice * quantity).toFixed(2) : '0.00')}</div>
                      )}
                  <div className="text-lg font-bold text-orange-600">£{(selectedSizeData.currentPrice > 0 ? (selectedSizeData.currentPrice * quantity).toFixed(2) : '0.00')}</div>
                  </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setAddToBasketModalOpen(false)}
                    className="px-3 py-1.5 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 text-xs"
                    >
                    Continue Shopping
                    </button>
                    
                    <button 
                      onClick={() => {
                        // Navigate to cart page
                        window.location.href = '/cart';
                      }}
                    className="px-4 py-1.5 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white rounded-lg font-semibold transition-colors duration-200 text-xs flex items-center gap-1"
                    >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"/>
                      </svg>
                    Go to Cart
                    </button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}



      </div>
    </>
  )
}

export default ProductDetailHappy


