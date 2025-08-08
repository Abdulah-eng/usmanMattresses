import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'

export default function MattressGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Mattress Buying Guide</h1>
            <p className="text-xl text-gray-700">
              Everything you need to know to choose the perfect mattress
            </p>
          </div>

          {/* Mattress Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of Mattresses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Memory Foam</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Excellent pressure relief</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Motion isolation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Conforms to body shape</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Innerspring</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Traditional bounce and support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Good airflow and cooling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Wide range of firmness levels</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hybrid</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Combines foam and springs</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Balanced comfort and support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Good for all sleep positions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Latex</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Natural and eco-friendly</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Responsive and bouncy</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      <span className="text-sm">Naturally cooling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Firmness Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Firmness Guide</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Soft (1-3)</h3>
                      <p className="text-sm text-gray-600">Best for side sleepers and those who prefer a plush feel</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Medium (4-6)</h3>
                      <p className="text-sm text-gray-600">Great for combination sleepers and couples</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold">Firm (7-10)</h3>
                      <p className="text-sm text-gray-600">Ideal for back and stomach sleepers</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Size Guide */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Size Guide</h2>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Twin (38" x 75")</h3>
                    <p className="text-sm text-gray-600">Perfect for children and single adults</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Full (54" x 75")</h3>
                    <p className="text-sm text-gray-600">Good for single adults with more space</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Queen (60" x 80")</h3>
                    <p className="text-sm text-gray-600">Most popular size for couples</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">King (76" x 80")</h3>
                    <p className="text-sm text-gray-600">Maximum space for couples</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
