"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, BookOpen, ArrowRight, Heart } from 'lucide-react'
import Image from 'next/image'

interface Guide {
  id: number
  title: string
  category: string
  image: string
  rating: number
  reviewCount: number
  readTime: string
  description: string
  features: string[]
  difficulty: string
  author: string
  lastUpdated: string
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading guides
    const mockGuides: Guide[] = [
      {
        id: 1,
        title: "Complete Mattress Buying Guide",
        category: "Buying Guide",
        image: "/bedcollect.jpeg",
        rating: 4.9,
        reviewCount: 456,
        readTime: "15 min read",
        description: "Everything you need to know about choosing the perfect mattress for your sleep style, body type, and budget.",
        features: ["Sleep position analysis", "Firmness guide", "Material comparison", "Price ranges"],
        difficulty: "Beginner",
        author: "Sleep Expert Team",
        lastUpdated: "2 weeks ago"
      },
      {
        id: 2,
        title: "How to Choose the Right Bed Frame",
        category: "Interior Design",
        image: "/hello.jpeg",
        rating: 4.7,
        reviewCount: 234,
        readTime: "8 min read",
        description: "Learn how to select the perfect bed frame that complements your bedroom style and provides the support you need.",
        features: ["Style matching", "Size considerations", "Material guide", "Assembly tips"],
        difficulty: "Beginner",
        author: "Interior Design Pro",
        lastUpdated: "1 week ago"
      },
      {
        id: 3,
        title: "Sofa Selection Masterclass",
        category: "Living Room",
        image: "/sofa.jpeg",
        rating: 4.8,
        reviewCount: 189,
        readTime: "12 min read",
        description: "Master the art of choosing the perfect sofa for your living space, from size to style and everything in between.",
        features: ["Room measurement", "Style coordination", "Fabric selection", "Maintenance tips"],
        difficulty: "Intermediate",
        author: "Furniture Specialist",
        lastUpdated: "3 days ago"
      },
      {
        id: 4,
        title: "Pillow Selection for Better Sleep",
        category: "Sleep Health",
        image: "/hi.jpeg",
        rating: 4.6,
        reviewCount: 167,
        readTime: "10 min read",
        description: "Discover how the right pillow can transform your sleep quality and reduce neck and back pain.",
        features: ["Sleep position guide", "Material comparison", "Firmness levels", "Care instructions"],
        difficulty: "Beginner",
        author: "Sleep Health Expert",
        lastUpdated: "5 days ago"
      },
      {
        id: 5,
        title: "Kids Room Design Essentials",
        category: "Kids & Family",
        image: "/hell.jpeg",
        rating: 4.9,
        reviewCount: 298,
        readTime: "18 min read",
        description: "Create the perfect sleep environment for your children with our comprehensive room design guide.",
        features: ["Safety considerations", "Color psychology", "Storage solutions", "Growth planning"],
        difficulty: "Intermediate",
        author: "Child Development Expert",
        lastUpdated: "1 week ago"
      },
      {
        id: 6,
        title: "Mattress Care & Maintenance",
        category: "Care & Maintenance",
        image: "/sofacollect.jpg",
        rating: 4.5,
        reviewCount: 145,
        readTime: "14 min read",
        description: "Extend the life of your mattress with proper care and maintenance techniques for optimal sleep hygiene.",
        features: ["Cleaning methods", "Protection tips", "Rotation schedule", "Troubleshooting"],
        difficulty: "Beginner",
        author: "Mattress Care Specialist",
        lastUpdated: "2 weeks ago"
      }
    ]

    setTimeout(() => {
      setGuides(mockGuides)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-black mb-4 font-display">Sleep & Furniture Guides</h1>
          <p className="text-lg text-gray-700 font-modern">
            Expert advice and comprehensive guides to help you make informed decisions about your sleep setup, 
            furniture selection, and home design. From beginners to experts, we have the knowledge you need.
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Card key={guide.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-0">
                {/* Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 left-2 bg-white/80 hover:bg-white text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {guide.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {guide.difficulty}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-black mb-2 text-lg font-display line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed font-modern line-clamp-3">
                      {guide.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {guide.features.slice(0, 2).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="font-modern">{guide.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-modern">{guide.rating}</span>
                      <span className="font-modern">({guide.reviewCount})</span>
                    </div>
                  </div>

                  {/* Author & Date */}
                  <div className="mb-4 text-sm text-gray-600">
                    <p className="font-modern">By <span className="font-semibold">{guide.author}</span></p>
                    <p className="font-modern">Updated {guide.lastUpdated}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Guide
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
