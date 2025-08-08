import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function CategoryGrid() {
  const categories = [
    {
      name: "Mattresses",
      href: "/mattresses",
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&h=800&fit=crop",
      description: "Premium comfort for better sleep"
    },
    {
      name: "Beds",
      href: "/beds",
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&h=800&fit=crop",
      description: "Stylish frames for every bedroom"
    },
    {
      name: "Sofas",
      href: "/sofas",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop",
      description: "Comfort meets style in your living room"
    },
    {
      name: "Bunk Beds",
      href: "/bunk-beds",
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&h=800&fit=crop",
      description: "Space-saving solutions for kids"
    },
    {
      name: "Mattress Toppers",
      href: "/mattress-toppers",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop",
      description: "Extra comfort for your existing mattress"
    },
    {
      name: "Pillows",
      href: "/pillows",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop",
      description: "Perfect support for your head and neck"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find exactly what you need for your perfect sleep setup
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.name} href={category.href}>
              <Card className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white border border-gray-200 rounded-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={1200}
                      height={800}
                      className="w-full h-48 object-cover bg-white group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-900">
                      {category.name}
                    </h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
