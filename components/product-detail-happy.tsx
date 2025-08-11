"use client"

import Image from "next/image"
import { useState } from "react"
import { Check, Star, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
  }
}

export function ProductDetailHappy({ product }: ProductDetailHappyProps) {
  const { dispatch } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.selectedSize || product.sizes[0])
  const [selectedColor, setSelectedColor] = useState<string>("Oak")

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image]

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
      ))}
    </div>
  )

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        image: gallery[0],
        currentPrice: product.currentPrice,
        originalPrice: product.originalPrice,
        size: selectedSize,
      },
    })
  }

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: gallery */}
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-50">
            <Image src={gallery[selectedImage] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {gallery.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-20 w-24 rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx ? "border-primary" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image src={src} alt={`${product.name}-${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {product.badge && (
                <Badge className="bg-secondary text-white border-0">{product.badge}</Badge>
              )}
              <div className="text-sm text-gray-500">5 Year manufacturer&apos;s guarantee</div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-2">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-600">{product.rating.toFixed(1)} ({product.reviewCount} Reviews)</span>
            </div>
          </div>

          {/* Price block */}
          <div className="space-y-1">
            <div className="flex items-end gap-3">
              <div className="text-3xl font-extrabold text-gray-900">${product.currentPrice.toFixed(2)}</div>
              {product.originalPrice > product.currentPrice && (
                <div className="text-gray-500 line-through text-lg">${product.originalPrice.toFixed(2)}</div>
              )}
            </div>
            {product.savings > 0 && (
              <div className="text-secondary font-semibold">You Save: ${product.savings.toFixed(2)}</div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="border rounded-xl p-4">
              <div className="text-sm font-semibold text-gray-900 mb-3">Choose Colour</div>
              <div className="flex gap-3">
                {["Oak", "Walnut", "White"].map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-4 py-2 rounded-lg border text-sm ${
                      selectedColor === c ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="border rounded-xl p-4">
              <div className="text-sm font-semibold text-gray-900 mb-3">Choose Size</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium ${
                      selectedSize === size ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="border rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">Add a mattress</div>
                <div className="text-sm text-gray-600">Save an extra <span className="font-semibold">10%</span></div>
              </div>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Browse</Button>
            </div>
          </div>

          <Button onClick={addToCart} className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-6">
            Add to Basket
          </Button>

          {/* Delivery snippet */}
          <div className="rounded-xl border p-4 flex items-center gap-3">
            <Truck className="h-5 w-5 text-primary" />
            <div className="text-sm text-gray-700">
              Order now and get it delivered <span className="font-semibold">{product.freeDelivery || "tomorrow"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reasons to buy */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Reasons to Buy</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Contemporary design headboard",
            "Classic finish compliments any bedroom décor",
            "Solid slatted base ensures optimum support and comfort",
            "Low foot-end creates the illusion of space",
            "Strong and sturdy wooden legs",
            "Delivered flat-packed with comprehensive instructions",
          ].map((reason, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border">
              <Check className="h-5 w-5 text-emerald-600 shrink-0" />
              <span className="text-sm text-gray-700">{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Details accordions */}
      <div className="mt-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="desc">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700 leading-relaxed">
                Designed with timeless style and built for everyday comfort. Crafted from quality
                materials and finished in our signature tones to match your bedroom. Pair with one of
                our mattresses to complete your setup.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="dimensions">
            <AccordionTrigger>Dimensions</AccordionTrigger>
            <AccordionContent>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>Headboard Height: 105 cm</li>
                <li>Foot End Height: 35 cm</li>
                <li>Clearance: 20 cm</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="questions">
            <AccordionTrigger>Product Questions</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700 text-sm">Have a question? Call us or chat and we&apos;ll help you choose the perfect option.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="instructions">
            <AccordionTrigger>Instructions</AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700 text-sm">Delivered flat-packed with easy assembly instructions included.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Reviews summary */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Reviews</h2>
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 p-6 rounded-xl border">
            <div className="flex items-center gap-3 mb-2">
              {renderStars(product.rating)}
              <div className="text-2xl font-bold">{product.rating.toFixed(1)}</div>
            </div>
            <div className="text-sm text-gray-600">Based on {product.reviewCount} reviews</div>
          </div>
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
            {[5, 4, 3, 2, 1].map((stars, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 text-sm">{stars} Star</div>
                <div className="h-2 flex-1 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${stars === 5 ? 88 : stars === 4 ? 6 : stars === 1 ? 6 : 0}%` }} />
                </div>
                <div className="w-10 text-right text-sm text-gray-600">{stars === 5 ? "88.2%" : stars === 4 ? "5.9%" : stars === 1 ? "5.9%" : "0%"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Example reviews */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[{
            name: "Molly",
            date: "Jul 28th, 2025",
            text: "Delivery was faultless and the bed is such great quality and easy to put together took 1 person. Could not recommend this company and this bed more.",
          },
          {
            name: "William",
            date: "May 6th, 2025",
            text: "Excellent product, very high quality and looks classy",
          },
          {
            name: "Sharon",
            date: "Jan 14th, 2025",
            text: "I wish I had chosen the natural wood finish",
          }].map((r, idx) => (
            <div key={idx} className="rounded-xl border p-5 space-y-3 bg-gray-50">
              <div className="flex items-center gap-2">{renderStars(idx === 2 ? 1 : 5)} <span className="text-xs text-gray-500">{r.date}</span></div>
              <p className="text-sm text-gray-700">{r.text}</p>
              <div className="font-semibold text-gray-900">{r.name}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button variant="outline" className="px-6">Show more reviews</Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailHappy


