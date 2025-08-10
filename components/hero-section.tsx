import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6">
            Find Your Perfect Sleep
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover premium mattresses, adjustable bases, and sleep accessories designed for ultimate comfort and support
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              <Link href="/mattresses">Shop Mattresses</Link>
            </Button>
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
              <Link href="/mattress-finder">Take Mattress Quiz</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg">
              <Link href="/financing">Learn About Financing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
