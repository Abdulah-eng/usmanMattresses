"use client"

import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const gallery = [
  {
    id: 1,
    image: "/hello.jpeg",
    title: "Modern Bedroom Design",
    description: "Transform your bedroom with our latest collection of premium mattresses and bedding accessories. Create a sanctuary that reflects your personal style and ensures restful sleep."
  },
  {
    id: 2,
    image: "/hell.jpeg",
    title: "Luxury Sleep Experience",
    description: "Discover the perfect balance of comfort and support with our handpicked selection of high-quality mattresses. Every detail is crafted for your ultimate relaxation."
  },
  {
    id: 3,
    image: "/hi.jpeg",
    title: "Contemporary Living Space",
    description: "Elevate your home decor with our stylish furniture pieces. From elegant sofas to comfortable beds, we offer solutions that combine beauty and functionality."
  },
  {
    id: 4,
    image: "/sofa.jpeg",
    title: "Comfortable Seating Solutions",
    description: "Experience unparalleled comfort with our premium sofa collection. Designed for both style and relaxation, our furniture transforms any room into a welcoming space."
  },
  {
    id: 5,
    image: "/sofacollect.jpg",
    title: "Elegant Home Furnishings",
    description: "Create a cohesive look throughout your home with our carefully curated furniture pieces. Each item is selected to enhance your living environment."
  },
  {
    id: 6,
    image: "/bedcollect.jpeg",
    title: "Bedroom Essentials Collection",
    description: "Complete your bedroom setup with our essential collection. From mattresses to accessories, we provide everything you need for a perfect night's sleep."
  }
]

export function CustomerGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const cardsPerView = 3
  const maxIndex = gallery.length - cardsPerView

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  return (
    <section className="w-full bg-white py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black text-center font-display">Turn Your Bedroom Into Inspiration</h2>
        <p className="mt-2 text-gray-700 text-center font-modern">Share your perfect bed, sofa or mattress look with us on Instagram.</p>
        <p className="mt-1 text-gray-700 text-center font-modern">Your style could be our next feature — and inspire others to rest better</p>

        <div className="mt-8 relative">
          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6 text-black" />
            </button>
          )}
          
          {currentIndex < maxIndex && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6 text-black" />
            </button>
          )}

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
            >
              {gallery.map((item) => (
                <div key={item.id} className="text-center flex-shrink-0 w-full md:w-1/3 px-4">
                  <div className="relative mb-6">
                    <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <h3 className="font-semibold text-black text-lg font-display">
                      {item.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed font-modern">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


