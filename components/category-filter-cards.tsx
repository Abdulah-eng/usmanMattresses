import { Snowflake, Waves, ArrowUp, Dumbbell } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

export function CategoryFilterCards() {
  const categories = [
    {
      id: 1,
      title: "Most Cooling",
      items: "10 Items",
      icon: <Snowflake className="h-8 w-8 text-orange-500" />,
      href: "/mattresses?filter=cooling"
    },
    {
      id: 2,
      title: "Soft Comfort",
      items: "8 Items",
      icon: <Waves className="h-8 w-8 text-orange-500" />,
      href: "/mattresses?filter=soft"
    },
    {
      id: 3,
      title: "Firm Comfort",
      items: "7 Items",
      icon: <Waves className="h-8 w-8 text-orange-500" />,
      href: "/mattresses?filter=firm"
    },
    {
      id: 4,
      title: "Medium Comfort",
      items: "16 Items",
      icon: <Waves className="h-8 w-8 text-orange-500" />,
      href: "/mattresses?filter=medium"
    },
    {
      id: 5,
      title: "Heavy People",
      items: "12 Items",
      icon: <Dumbbell className="h-8 w-8 text-orange-500" />,
      href: "/mattresses?filter=heavy"
    },
    {
      id: 6,
      title: "Most Support",
      items: "14 Items",
      icon: <ArrowUp className="h-8 w-8 text-orange-500" />,
      href: "/mattresses?filter=support"
    }
  ]

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-left">
          Shop by Comfort & Support
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="bg-white hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-gray-100 hover:border-orange-200"
            >
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                  {category.title}
                </h3>
                <p className="text-orange-600 text-xs font-medium">
                  {category.items}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
