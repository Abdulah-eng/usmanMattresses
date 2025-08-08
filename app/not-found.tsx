import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto text-center">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-400">404</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            We've lost this page
          </h1>
          
          <p className="text-gray-600 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved
          </p>

                      <Button asChild className="bg-blue-900 hover:bg-blue-800">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
