"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Zap, Star, ArrowRight } from "lucide-react"

export function DealOfTheDay() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
            Deal of the Day
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6 font-modern">
            Unbeatable prices on premium mattresses. Don't miss out on these exclusive offers!
          </p>
          
          {/* Countdown Timer - Moved below description */}
          <div className="bg-white rounded-xl p-4 shadow-none mb-6 max-w-sm mx-auto">
            <div className="text-center">
              <p className="text-gray-600 mb-3 text-sm font-modern">Offer ends in:</p>
              <div className="flex justify-center items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 font-display">23</div>
                  <div className="text-xs text-gray-500 font-modern">Hours</div>
                </div>
                <div className="text-xl text-gray-300">:</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 font-display">45</div>
                  <div className="text-xs text-gray-500 font-modern">Minutes</div>
                </div>
                <div className="text-xl text-gray-300">:</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 font-display">12</div>
                  <div className="text-xs text-gray-500 font-modern">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Deal Card */}
        <div className="bg-white rounded-3xl shadow-none overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Image Section */}
            <div className="relative h-80 lg:h-full bg-gradient-to-br from-orange-50 to-red-100">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
              <Image
                src="/sofa.jpeg"
                alt="Premium Mattress Deal"
                fill
                className="object-cover"
              />
              {/* Deal Badge */}
              <div className="absolute top-6 left-6 z-20">
                <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 px-4 py-2 text-lg font-bold shadow-lg">
                  60% OFF
                </Badge>
              </div>
              {/* Rating */}
              <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 bg-white/90 px-3 py-2 rounded-full">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700 font-modern">4.9</span>
              </div>
            </div>

            {/* Right: Content Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-display">
                  Cascade Premium Hybrid Mattress
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 font-modern">
                  Experience ultimate comfort with our best-selling hybrid mattress. Features advanced cooling technology, 
                  premium memory foam layers, and superior edge support for undisturbed sleep.
                </p>
              </div>

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent font-display">£299</span>
                  <span className="text-2xl text-gray-400 line-through font-modern">£749</span>
                  <span className="text-lg text-green-600 font-semibold font-modern">Save £450</span>
                </div>
                <p className="text-sm text-gray-500 font-modern">Free delivery & 100-night trial included</p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 font-modern">Free Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 font-modern">100-Night Trial</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 font-modern">10-Year Warranty</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700 font-modern">Premium Quality</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Zap className="w-5 h-5 mr-2" />
                Claim This Deal Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Deal 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="relative mb-4">
              <Image
                src="/bedcollect.jpeg"
                alt="Memory Foam Mattress"
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              <Badge className="absolute top-2 right-2 bg-red-500 text-white">40% OFF</Badge>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-display">Memory Foam Mattress</h4>
            <p className="text-gray-600 text-sm mb-3 font-modern">Ultra-comfortable memory foam with cooling technology</p>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-red-600 font-display">£199</span>
                <span className="text-lg text-gray-400 line-through font-modern">£329</span>
              </div>
              <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                View Deal
              </Button>
            </div>
          </div>

          {/* Deal 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="relative mb-4">
              <Image
                src="/hello.jpeg"
                alt="Hybrid Mattress"
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              <Badge className="absolute top-2 right-2 bg-orange-500 text-white">35% OFF</Badge>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-display">Hybrid Mattress</h4>
            <p className="text-gray-600 text-sm mb-3 font-modern">Perfect blend of springs and foam for optimal support</p>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-red-600 font-display">£249</span>
                <span className="text-lg text-gray-400 line-through font-modern">£379</span>
              </div>
              <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                View Deal
              </Button>
            </div>
          </div>

          {/* Deal 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="relative mb-4">
              <Image
                src="/hi.jpeg"
                alt="Pocket Spring Mattress"
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              <Badge className="absolute top-2 right-2 bg-green-500 text-white">25% OFF</Badge>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2 font-display">Pocket Spring Mattress</h4>
            <p className="text-gray-600 text-sm mb-3 font-modern">Individual pocket springs for personalized comfort</p>
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-red-600 font-display">£179</span>
                <span className="text-lg text-gray-400 line-through font-modern">£239</span>
              </div>
              <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                View Deal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
