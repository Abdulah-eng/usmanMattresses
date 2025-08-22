"use client"

import { Bed, User, Grid, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function MattressTypesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const mattressTypes = [
    {
      id: 1,
      title: "Hybrid Mattresses",
      icon: <Bed className="h-5 w-5 text-orange-500" />,
      description: "Hybrid mattresses blend the support of innerspring coils with the comfort of foam layers, offering a balanced sleep experience. This versatile construction suits various sleep styles and provides both pressure relief and spinal alignment.",
      image: "/bedcollect.jpeg"
    },
    {
      id: 2,
      title: "Orthopaedic Mattresses",
      icon: <User className="h-5 w-5 text-orange-500" />,
      description: "Orthopedic mattresses are engineered to provide targeted support for the spine and joints, effectively reducing pain and promoting better posture. Their firmness levels are carefully calibrated to distribute weight evenly.",
      image: "/sofa.jpeg"
    },
    {
      id: 3,
      title: "Memory Foam Mattresses",
      icon: <Grid className="h-5 w-5 text-orange-500" />,
      description: "Memory foam mattresses excel in offering contouring support, adapting to your body's unique shape for personalized comfort. Their pressure-relieving qualities that provide a luxurious sleep experience that alleviates aches and pains.",
      image: "/hello.jpeg"
    },
    {
      id: 4,
      title: "Pocket Spring Mattresses",
      icon: <Bed className="h-5 w-5 text-orange-500" />,
      description: "Pocket spring mattresses feature individually wrapped springs that move independently, providing targeted support and reducing motion transfer. Perfect for couples who want undisturbed sleep.",
      image: "/hi.jpeg"
    },
    {
      id: 5,
      title: "Latex Mattresses",
      icon: <Grid className="h-5 w-5 text-orange-500" />,
      description: "Latex mattresses offer natural resilience and breathability, with excellent temperature regulation and hypoallergenic properties. They provide consistent support and long-lasting comfort.",
      image: "/hell.jpeg"
    },
    {
      id: 6,
      title: "Gel Memory Foam",
      icon: <User className="h-5 w-5 text-orange-500" />,
      description: "Gel memory foam mattresses combine the contouring benefits of memory foam with advanced cooling technology. The gel infusion helps regulate temperature for a cooler, more comfortable sleep.",
      image: "/sofacollect.jpg"
    }
  ]

  const cardsPerView = 3
  const maxIndex = mattressTypes.length - cardsPerView

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4 font-display">
            Our Mattress Types
          </h2>
          <p className="text-lg text-gray-700 font-modern">
            Tailored comfort, trusted support — discover mattresses made just for you.
          </p>
        </div>
        
        <div className="relative">
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
              {mattressTypes.map((type) => (
                <div key={type.id} className="text-center flex-shrink-0 w-full md:w-1/3 px-4">
                  <div className="relative mb-6">
                    <div className="relative w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={type.image}
                        alt={type.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center mb-3">
                    {type.icon}
                    <h3 className="font-semibold text-black ml-2 text-lg font-display">
                      {type.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-700 text-sm leading-relaxed font-modern">
                    {type.description}
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
