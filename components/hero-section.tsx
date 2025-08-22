"use client"

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HeroSectionProps {
  onCategoryChange: (category: string) => void
}

export default function HeroSection({ onCategoryChange }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('mattresses')

  // Carousel images for the left banner
  const carouselImages = [
    {
      src: "/banner.jpg",
      alt: "Outdoor Super Sale",
      title: "OUTDOOR",
      subtitle: "SUPER SALE",
      price: "$39.99",
      discount: "SALE UP TO 30% OFF",
      edition: "2020 EDITION"
    },
    {
      src: "/sofa.jpeg",
      alt: "Sofa Collection",
      title: "SOFA",
      subtitle: "COLLECTION",
      price: "$299.99",
      discount: "SALE UP TO 40% OFF",
      edition: "NEW ARRIVAL"
    },
    {
      src: "/hi.jpeg",
      alt: "Bedroom Essentials",
      title: "BEDROOM",
      subtitle: "ESSENTIALS",
      price: "$199.99",
      discount: "SALE UP TO 35% OFF",
      edition: "BEST SELLER"
    }
  ]

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
    onCategoryChange(category)
  }

  return (
    <>
      {/* Main Hero Section */}
      <section className="w-full py-0 px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Banner - Carousel */}
          <div className="lg:col-span-2 relative h-96 lg:h-[500px] overflow-hidden rounded-lg group">
            <Image
              src={carouselImages[currentSlide].src}
              alt={carouselImages[currentSlide].alt}
              fill
              className="object-cover transition-transform duration-500"
            />
          </div>

          {/* Right Banners */}
          <div className="flex flex-col gap-3 h-96 lg:h-[500px]">
            {/* Image 1 */}
            <div className="relative w-full h-1/2 overflow-hidden rounded-lg group">
              <Image
                src="/hello.jpeg"
                alt="Bedroom Collection"
                fill
                className="object-cover transition-transform duration-500"
              />
            </div>

            {/* Image 2 */}
            <div className="relative w-full h-1/2 overflow-hidden rounded-lg group">
              <Image
                src="/hell.jpeg"
                alt="Living Room"
                fill
                className="object-cover transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Four Parallel Images Section */}
      <section className="relative w-full bg-white py-6">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Image 1 */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg group">
              <Image
                src="/sofacollect.jpg"
                alt="Sofa Collection"
                fill
                className="object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end">
                <div className="text-white p-4 w-full">
                  <h3 className="text-lg font-bold mb-2 font-display">Sofa Collection</h3>
                  <p className="text-sm text-gray-200 mb-3 font-modern">Premium comfort for your living space</p>
                  <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* Image 2 */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg group">
              <Image
                src="/bedcollect.jpeg"
                alt="Bed Collection"
                fill
                className="object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end">
                <div className="text-white p-4 w-full">
                  <h3 className="text-lg font-bold mb-2 font-display">Bed Collection</h3>
                  <p className="text-sm text-gray-200 mb-3 font-modern">Elegant designs for peaceful sleep</p>
                  <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* Image 3 */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg group">
              <Image
                src="/hello.jpeg"
                alt="Mattress Collection"
                fill
                className="object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end">
                <div className="text-white p-4 w-full">
                  <h3 className="text-lg font-bold mb-2 font-display">Mattress Collection</h3>
                  <p className="text-sm text-gray-200 mb-3 font-modern">Ultimate comfort and support</p>
                  <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* Image 4 */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg group">
              <Image
                src="/hi.jpeg"
                alt="Accessories Collection"
                fill
                className="object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end">
                <div className="text-white p-4 w-full">
                  <h3 className="text-lg font-bold mb-2 font-display">Accessories Collection</h3>
                  <p className="text-sm text-gray-200 mb-3 font-modern">Complete your perfect setup</p>
                  <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-300">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pick of the Bunch Section */}
      <section className="relative w-full bg-white pt-16 pb-4">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left Side - Title and Tagline */}
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-black font-display">Sleep Luxury, Every Night</h2>
              <p className="text-lg text-gray-700 font-modern">Discover our most-loved collections</p>
            </div>

            {/* Right Side - Navigation Buttons and Arrows */}
            <div className="flex items-center gap-3">
              {/* Special Mattresses Button */}
              <button 
                onClick={() => handleCategoryClick('mattresses')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 font-modern ${
                  selectedCategory === 'mattresses' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-black'
                }`}
              >
                Mattresses
              </button>

              {/* Other Category Buttons */}
              <button 
                onClick={() => handleCategoryClick('beds')}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 font-modern ${
                  selectedCategory === 'beds' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-black'
                }`}
              >
                Beds
              </button>
              <button 
                onClick={() => handleCategoryClick('sofas')}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 font-modern ${
                  selectedCategory === 'sofas' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-black'
                }`}
              >
                Sofas
              </button>
              <button 
                onClick={() => handleCategoryClick('pillows')}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 font-modern ${
                  selectedCategory === 'pillows' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-black'
                }`}
              >
                Pillows
              </button>
              <button 
                onClick={() => handleCategoryClick('toppers')}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 font-modern ${
                  selectedCategory === 'toppers' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-black'
                }`}
              >
                Toppers
              </button>
              <button 
                onClick={() => handleCategoryClick('bunk-beds')}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 font-modern ${
                  selectedCategory === 'bunk-beds' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-black'
                }`}
              >
                Bunkbeds
              </button>
              <button 
                onClick={() => handleCategoryClick('kids')}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 font-modern ${
                  selectedCategory === 'kids' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-white text-black'
                }`}
              >
                Kids
              </button>
            </div>
        </div>
      </div>
    </section>
    </>
  )
}
