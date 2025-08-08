import { Header } from "@/components/header"
import { ProductsLayout } from "@/components/products-layout"
import { Footer } from "@/components/footer"

export default function SalePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🏷️ Sale & Clearance</h1>
          <p className="text-xl text-gray-700">Save big on premium mattresses and sleep accessories</p>
        </div>
      </div>
      <ProductsLayout category="sale" />
      <Footer />
    </div>
  )
}
