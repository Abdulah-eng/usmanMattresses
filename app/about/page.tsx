import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">About MattressKing</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6">
              For over 30 years, MattressKing has been Oklahoma's trusted source for quality sleep solutions. 
              We're committed to helping you find the perfect mattress, adjustable base, and sleep accessories 
              to ensure you get the best night's sleep possible.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6">
              Founded in 1990, MattressKing started as a small family business with a simple mission: 
              to provide high-quality sleep products at affordable prices. Today, we've grown to become 
              one of Oklahoma's largest mattress retailers, with multiple locations across the state.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Our Commitment</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Quality products from trusted brands</li>
              <li>Expert sleep consultations</li>
              <li>Competitive pricing and financing options</li>
              <li>Exceptional customer service</li>
              <li>Fast, reliable delivery and setup</li>
              <li>Sleep trial periods for peace of mind</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Why Choose MattressKing?</h2>
            <p className="text-gray-700 mb-6">
              We understand that choosing the right mattress is a significant investment in your health and well-being. 
              That's why our sleep experts are here to guide you through the process, helping you find the perfect 
              match for your sleep style, preferences, and budget.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
