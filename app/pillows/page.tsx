import { Header } from "@/components/header"
import { ProductsLayout } from "@/components/products-layout"
import { Footer } from "@/components/footer"

export default function PillowsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductsLayout category="pillows" />
      <Footer />
    </div>
  )
}
