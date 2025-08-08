import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect Sleep
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700">
            Discover premium mattresses, adjustable bases, and sleep accessories designed for ultimate comfort and support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-900 hover:bg-blue-800 text-white px-8">
              <Link href="/mattresses">Shop Mattresses</Link>
            </Button>
            <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8">
              <Link href="/mattress-finder">Take Mattress Quiz</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50 px-8">
              <Link href="/financing">Learn About Financing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
