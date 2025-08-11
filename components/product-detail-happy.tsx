"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Truck, Heart, MessageCircle, Shield } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"
import { ReviewSection } from "@/components/review-section";

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
  }
}

export function ProductDetailHappy({ product }: ProductDetailHappyProps) {
  const { dispatch } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("Oak")
  const [selectedSize, setSelectedSize] = useState(product.selectedSize || product.sizes[0])
  const [sizeModalOpen, setSizeModalOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    description: false,
    dimensions: false,
    questions: false
  })

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image]

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: gallery[0],
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        size: selectedSize,
      }
    })
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: gallery - now takes 3/5 of the width */}
        <div className="lg:col-span-3">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50">
            <Image src={gallery[selectedImage] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          {/* Thumbnail images */}
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {gallery.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 ${
                  selectedImage === idx ? "border-primary" : "border-gray-200"
                }`}
              >
                <Image src={image} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: details - now takes 2/5 of the width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product info */}
          <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < (product.rating || 4) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviewCount || 0} reviews)</span>
            </div>
            <div className="text-3xl font-bold text-black mb-2">£{product.currentPrice}</div>
            {product.originalPrice && product.originalPrice > product.currentPrice && (
              <div className="text-lg text-gray-500 line-through">£{product.originalPrice}</div>
            )}
          </div>

          {/* Save Amount */}
          {product.originalPrice && product.originalPrice > product.currentPrice && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-green-800">
                  Save £{(product.originalPrice - product.currentPrice).toFixed(2)} ({Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100)}% off)
                </span>
              </div>
            </div>
          )}

          {/* Select Colour */}
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

          {/* Product Features */}
          <div className="border rounded-xl p-4">
            <div className="text-sm font-semibold text-gray-900 mb-3">Product Features</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="text-sm text-gray-700">Medium-Firm</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-700">Pocket Spring</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-700">1000 Springs</span>
              </div>
            </div>
          </div>

          {/* Choose Size - Clickable Option */}
          <div className="border-b border-gray-200 pb-4">
            <button 
              onClick={() => setSizeModalOpen(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 text-gray-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <span className="text-blue-800 font-semibold">Choose Colour</span>
              </div>
              <div className="text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </div>
            </button>
          </div>

          {/* Size Modal */}
          {sizeModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Choose a Colour</h3>
                  <button 
                    onClick={() => setSizeModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Oak", description: "Natural wood finish", icon: "🟤" },
                    { name: "Walnut", description: "Rich dark finish", icon: "🟫" },
                    { name: "White", description: "Clean modern look", icon: "⚪" }
                  ].map((colour) => (
                    <div key={colour.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-6 text-2xl">
                          {colour.icon}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{colour.name}</div>
                          <div className="text-sm text-gray-500">{colour.description}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedColor(colour.name);
                          setSizeModalOpen(false);
                        }}
                        className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 text-sm"
                      >
                        Choose
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="border rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">Add a mattress</div>
              <div className="text-sm text-gray-600">Save an extra <span className="font-semibold">10%</span></div>
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Browse</Button>
          </div>

          <Button onClick={addToCart} className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6">
            Add to Basket
          </Button>

          {/* Klarna Payment Option */}
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-5 bg-pink-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-black">Klarna</span>
              </div>
              <div className="text-sm text-gray-700">
                3 payments of <span className="font-semibold">£{(product.currentPrice / 3).toFixed(2)}</span> at 0% interest with <span className="font-semibold">Klarna</span>
              </div>
            </div>
            <div className="text-sm text-primary underline cursor-pointer">Learn more</div>
          </div>

          {/* Daily Deals Countdown */}
          <div className="bg-[#dc2626] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">L</span>
              </div>
              <div className="text-sm font-bold text-white">TODAY ONLY - Summer Holiday Daily Deals</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded-lg px-2 py-1 shadow-sm">
                <span className="font-bold text-[#dc2626] text-sm">11</span>
              </div>
              <span className="text-white text-sm">HOURS</span>
              <div className="bg-white rounded-lg px-2 py-1 shadow-sm">
                <span className="font-bold text-[#dc2626] text-sm">22</span>
              </div>
              <span className="text-white text-sm">MINS</span>
              <div className="bg-white rounded-lg px-2 py-1 shadow-sm">
                <span className="font-bold text-[#dc2626] text-sm">09</span>
              </div>
              <span className="text-white text-sm">SECS</span>
            </div>
          </div>

          {/* Delivery snippet */}
          <div className="rounded-xl border p-4 flex items-center gap-3">
            <Truck className="h-5 w-5 text-primary" />
            <div className="text-sm text-gray-700">
              Order now and get it delivered <span className="font-semibold">{product.freeDelivery || "tomorrow"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Firmness Scale */}
      <div className="mt-12 bg-white p-6 rounded-lg border border-gray-200">
        <div className="text-center">
          {/* Circular Object with Wavy Lines Icon */}
          <div className="w-16 h-16 mx-auto mb-4 text-gray-700">
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
          <h3 className="text-lg font-bold text-gray-800 mb-6">Firmness Scale</h3>
          
          {/* Scale Bar */}
          <div className="relative">
            {/* Numerical Ranges */}
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>1-3</span>
              <span>3-4</span>
              <span className="text-gray-700 font-medium">4-6</span>
              <span>6-8</span>
              <span>8-9</span>
              <span>9-10</span>
            </div>
            
            {/* Scale Bar Segments */}
            <div className="flex h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gray-200 flex-1"></div>
              <div className="h-full bg-gray-200 flex-1"></div>
              <div className="h-full bg-blue-600 flex-1"></div>
              <div className="h-full bg-gray-200 flex-1"></div>
              <div className="h-full bg-gray-200 flex-1"></div>
              <div className="h-full bg-gray-200 flex-1"></div>
            </div>
            
            {/* Descriptive Labels */}
            <div className="flex justify-between text-sm text-gray-700 mt-2">
              <span>Plush</span>
              <span>Medium-Plush</span>
              <span className="text-blue-600 font-semibold">Medium</span>
              <span>Medium-Firm</span>
              <span>Firm</span>
              <span>Extra-firm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Specifications */}
      <div className="mt-6 bg-white p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Support */}
          <div className="text-center border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="w-12 h-12 mx-auto mb-3 text-gray-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M4 5h2M18 5h2M8 3h8M6 9h12M6 11h12M6 13h12"/>
                <path d="M4 17l2 2M20 17l-2 2"/>
              </svg>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <h3 className="text-base font-bold text-gray-800">Support</h3>
              <div className="w-4 h-4 text-gray-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex h-1 bg-gray-100 rounded-full overflow-hidden max-w-40 mx-auto">
                <div className="h-full bg-blue-600 flex-1"></div>
                <div className="h-full bg-blue-600 flex-1"></div>
                <div className="h-full bg-gray-200 flex-1"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-700 max-w-40 mx-auto">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* Pressure Relief */}
          <div className="text-center border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="w-12 h-12 mx-auto mb-3 text-gray-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M12 2c-2 0-4 1-4 4v2c0 2 1 3 4 4s4 2 4 4v2c0 3-2 4-4 4"/>
              </svg>
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-3">Pressure Relief</h3>
            <div className="space-y-2">
              <div className="flex h-1 bg-gray-100 rounded-full overflow-hidden max-w-40 mx-auto">
                <div className="h-full bg-blue-600 flex-1"></div>
                <div className="h-full bg-blue-600 flex-1"></div>
                <div className="h-full bg-gray-200 flex-1"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-700 max-w-40 mx-auto">
                <span>Basic</span>
                <span>Average</span>
                <span>Advanced</span>
              </div>
            </div>
          </div>

          {/* Air Circulation */}
          <div className="text-center border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="w-12 h-12 mx-auto mb-3 text-gray-700">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M8 3h8M6 9h12M6 11h12M6 13h12"/>
                <path d="M4 17l2 2M20 17l-2 2"/>
              </svg>
            </div>
            <div className="flex items-center justify-center gap-2 mb-3">
              <h3 className="text-base font-bold text-gray-800">Air Circulation</h3>
              <div className="w-4 h-4 text-gray-500">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex h-1 bg-gray-100 rounded-full overflow-hidden max-w-40 mx-auto">
                <div className="h-full bg-blue-600 flex-1"></div>
                <div className="h-full bg-blue-600 flex-1"></div>
                <div className="h-full bg-gray-200 flex-1"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-700 max-w-40 mx-auto">
                <span>Good</span>
                <span>Better</span>
                <span>Best</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Accordion Sections */}
      <div className="mt-12 space-y-4">
        {/* Description */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <div 
            className="flex items-center justify-between p-6 cursor-pointer group"
            onClick={() => toggleSection('description')}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Description</h3>
                <p className="text-sm text-gray-500">Product details and specifications</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors">
              <svg 
                className={`w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-all duration-200 ${
                  expandedSections.description ? 'rotate-45' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
          </div>
          
          {/* Expandable Content */}
          {expandedSections.description && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="pt-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Mersey 1000 Pocket Spring Memory Reflex Foam Mattress has been designed to offer you high levels of support that will make every night a dream. From its independent pocket springs to the layers of innovative foam, every inch of this mattress has been carefully designed to give you fantastic value for money.
                </p>
                <h4 className="font-semibold text-blue-800 mb-3">Individually Wrapped 1000 Pocket Sprung Mattress</h4>
                <p className="text-gray-700 leading-relaxed">
                  Get high support from the Mersey Memory Foam Mattress thanks to the 1000 individually wrapped pocket springs. These springs work independently from each other, reducing the risk of being jolted awake as it helps to minimise movement without reducing the support you receive.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Dimensions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <div 
            className="flex items-center justify-between p-6 cursor-pointer group"
            onClick={() => toggleSection('dimensions')}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Dimensions</h3>
                <p className="text-sm text-gray-500">Size and measurement details</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-green-50 transition-colors">
              <svg 
                className={`w-4 h-4 text-gray-600 group-hover:text-green-600 transition-all duration-200 ${
                  expandedSections.dimensions ? 'rotate-45' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
          </div>
          
          {/* Expandable Content */}
          {expandedSections.dimensions && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3">Available Sizes</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between">
                        <span>Small Single:</span>
                        <span className="font-medium">2'6" x 6'3" (75cm x 190cm)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Single:</span>
                        <span className="font-medium">3' x 6'3" (90cm x 190cm)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Small Double:</span>
                        <span className="font-medium">4' x 6'3" (120cm x 190cm)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Double:</span>
                        <span className="font-medium">4'6" x 6'3" (135cm x 190cm)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>King:</span>
                        <span className="font-medium">5' x 6'6" (150cm x 200cm)</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Super King:</span>
                        <span className="font-medium">6' x 6'6" (180cm x 200cm)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-3">Mattress Specifications</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex justify-between">
                        <span>Height:</span>
                        <span className="font-medium">25cm (10")</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Weight:</span>
                        <span className="font-medium">Varies by size</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Spring Count:</span>
                        <span className="font-medium">1000 pocket springs</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Firmness:</span>
                        <span className="font-medium">Medium (4-6)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Questions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
          <div 
            className="flex items-center justify-between p-6 cursor-pointer group"
            onClick={() => toggleSection('questions')}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">Product Questions</h3>
                <p className="text-sm text-gray-500">Frequently asked questions</p>
              </div>
            </div>
            <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-purple-50 transition-colors">
              <svg 
                className={`w-4 h-4 text-gray-600 group-hover:text-purple-600 transition-all duration-200 ${
                  expandedSections.questions ? 'rotate-45' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </div>
          </div>
          
          {/* Expandable Content */}
          {expandedSections.questions && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <div className="pt-6 space-y-4">
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-purple-800 mb-2">What is the firmness level of this mattress?</h4>
                  <p className="text-gray-700">This mattress has a medium firmness rating (4-6 on a scale of 1-10), providing the perfect balance of support and comfort for most sleepers.</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-purple-800 mb-2">How long does delivery take?</h4>
                  <p className="text-gray-700">Standard delivery takes 2-3 working days. Express delivery is available for next-day delivery in most areas.</p>
                </div>
                <div className="border-b border-gray-100 pb-4">
                  <h4 className="font-semibold text-purple-800 mb-2">What is the warranty period?</h4>
                  <p className="text-gray-700">This mattress comes with a 5-year manufacturer's warranty covering defects in materials and workmanship.</p>
                </div>
                <div className="pb-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Can I return the mattress if I'm not satisfied?</h4>
                  <p className="text-gray-700">Yes, we offer a 100-night trial period. If you're not completely satisfied, you can return the mattress for a full refund.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reasons to Buy */}
      <div className="mt-12 border border-gray-200 rounded-xl p-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Reasons to Buy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-sm text-gray-700">Premium quality pocket spring construction</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-sm text-gray-700">Medium-firm support for optimal comfort</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-sm text-gray-700">1000 individual springs for superior support</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-sm text-gray-700">Available with fast delivery</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-sm text-gray-700">Multiple size options to suit any bed</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <span className="text-sm text-gray-700">Premium fabric cover with breathable design</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Reviews */}
      <div className="mt-12 border border-gray-200 rounded-xl p-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Reviews</h2>
        <ReviewSection />
      </div>
    </div>
  )
}

export default ProductDetailHappy


