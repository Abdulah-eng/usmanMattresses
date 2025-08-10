import { Truck, Shield, Star, Heart, DollarSign } from 'lucide-react'

export function ShopBySizeSection() {
  const benefits = [
    {
      id: 1,
      title: "Free One-Day Delivery",
      icon: <Truck className="h-8 w-8 text-orange-500" />
    },
    {
      id: 2,
      title: "100-Night Comfort Guarantee",
      icon: <Shield className="h-8 w-8 text-orange-500" />
    },
    {
      id: 3,
      title: "2,100+ Five Star Reviews",
      icon: <Star className="h-8 w-8 text-orange-500" />
    },
    {
      id: 4,
      title: "20+ Years, 60K+ Happy Sleepers!",
      icon: <Heart className="h-8 w-8 text-orange-500" />
    },
    {
      id: 5,
      title: "Save Big on Quality Sleep!",
      icon: <DollarSign className="h-8 w-8 text-orange-500" />
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Benefits Section */}
        <div className="flex flex-wrap gap-16 justify-center">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="text-center min-w-[180px]">
              <div className="flex justify-center mb-5">
                {benefit.icon}
              </div>
              <p className="text-gray-700 text-sm font-medium leading-tight">
                {benefit.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
