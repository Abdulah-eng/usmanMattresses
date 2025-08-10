import { Star, ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function ReviewSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Proven Excellence: Discover why 1,500+ Customers gave us Five Stars!
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Review */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">5.0</span>
            </div>
            
            {/* Review Content */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-3">Great Customer Service</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                My fiancé and I had great customer service from Alan. He never pressured us to buy a mattress on the first day we were looking, but he still took the time to help us find the right one. We came back months later ready to make the purchase, and he remembered us! He helped us in our purchase and sched...
              </p>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                <span>More</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            
            {/* Store Info */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">Store</span>
              </div>
              <span className="text-gray-700">Store: Mattress King Oklahoma City.</span>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-yellow-400' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            {/* Reviewer */}
            <div className="text-sm text-gray-600">
              Malory Hunt <span className="text-green-600">Verified Buyer</span>
            </div>
          </div>
          
          {/* Right Side - Store Image */}
          <div className="relative">
            <div className="bg-gray-200 rounded-lg h-96 w-full flex items-center justify-center">
              <span className="text-gray-500">Store Interior Image</span>
            </div>
          </div>
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3">
            Read all reviews
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
