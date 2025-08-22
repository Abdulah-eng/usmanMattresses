import { notFound } from "next/navigation"
import Image from "next/image"
import { Check, Star } from "lucide-react"
import { ProductDetailHappy } from "@/components/product-detail-happy"
import { ProductGridNew } from "@/components/product-grid-new"

interface PageProps {
  params: Promise<{ category: string; id: string }>
}

async function getProductFromDatabase(category: string, id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products?category=${category}&id=${id}`, {
      cache: 'no-store'
    })
    
    if (!res.ok) {
      console.error('Failed to fetch product:', res.status, res.statusText)
      return null
    }
    
    const data = await res.json()
    return data.products?.[0] || null
  } catch (error) {
    console.error('Error fetching product from database:', error)
    return null
  }
}

async function getRelatedProducts(category: string, excludeId: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products?category=${category}&limit=4`, {
      cache: 'no-store'
    })
    
    if (!res.ok) return []
    
    const data = await res.json()
    return (data.products || []).filter((p: any) => p.id !== excludeId).slice(0, 4)
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category, id } = await params
  
  // Get the product from database
  const product = await getProductFromDatabase(category, id)
  
  if (!product) {
    notFound()
  }
  
  // Transform the product data to match ProductDetailCard interface
  const productDetail = {
    id: product.id,
    name: product.name || 'Unknown Product',
    brand: product.brand || 'Unknown Brand',
    brandColor: 'blue', // Default since we don't store this in DB
    badge: product.on_sale ? 'On Sale' : '',
    badgeColor: product.on_sale ? 'orange' : 'gray',
    image: (product.images && product.images[0]) || product.main_image || '/mattress-image.svg',
    rating: Number(product.rating || 4.0),
    reviewCount: Number(product.review_count || 50),
    firmness: product.firmness_description || 'Medium',
    firmnessLevel: Number(product.firmness_level || 6),
    features: product.features || ['Premium Quality'],
    originalPrice: Number(product.original_price || 0),
    currentPrice: Number(product.current_price || 0),
    savings: Number(product.savings || Math.max(Number(product.original_price || 0) - Number(product.current_price || 0), 0)),
    freeDelivery: product.free_delivery ? 'Free' : 'Tomorrow',
    setupService: Boolean(product.setup_service),
    setupCost: product.setup_cost ? Number(product.setup_cost) : undefined,
    certifications: ['OEKO-TEX', 'Made in UK'], // Default certifications
    sizes: product.sizes || ['Single', 'Double', 'King', 'Super King'],
    selectedSize: product.sizes?.[0] || 'Queen',
    monthlyPrice: product.monthly_price ? Number(product.monthly_price) : Math.floor(Number(product.current_price || 0) / 12),
    images: product.images || [],
    category: product.category || category,
    type: product.mattress_type || product.bed_type || product.sofa_type || product.pillow_type || product.topper_type || product.bunk_bed_type || 'Standard',
    size: product.sizes?.[0] || 'Queen',
    comfortLevel: product.firmness_description || 'Medium',
    inStore: Boolean(product.in_stock !== false),
    onSale: Boolean(product.on_sale),
    // Additional fields from database
    colors: product.colors || [],
    materials: product.materials || [],
    dimensions: product.dimensions || {},
    dispatchTime: product.dispatch_time,
    reasonsToBuy: product.reasons_to_buy || [],
    promotionalOffers: [],
    productQuestions: product.product_questions || [],
    warrantyInfo: product.warranty_info || {},
    careInstructions: product.care_instructions,
    stockQuantity: product.stock_quantity,
    inStock: Boolean(product.in_stock !== false),
    shortDescription: product.short_description,
    longDescription: product.long_description
  }
  
  // Get related products from the same category
  const alsoViewed = await getRelatedProducts(category, product.id)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <ProductDetailHappy product={productDetail} />

        {/* Optional Hero Media from Admin (small + big images) */}
        {((product.images || []).length > 0) && (
          <section className="mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Two small images */}
              <div className="grid grid-cols-2 gap-4 order-2 lg:order-none">
                {(product.images || []).map((src: string, idx: number) => (
                  <div key={`small-${idx}`} className="relative h-40 rounded-lg overflow-hidden bg-gray-100">
                    <Image src={src} alt={`Small ${idx+1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>

              {/* Big images carousel (simple horizontal scroll) */}
              <div className="lg:col-span-2">
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {(product.images || []).map((src: string, idx: number) => (
                    <div key={`big-${idx}`} className="relative h-64 w-96 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image src={src} alt={`Big ${idx+1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Reasons to buy */}
        {(product.reasons_to_buy)?.length > 0 && (
          <section className="mt-10 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Reasons to buy</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(product.reasons_to_buy || []).map((reason: string, idx: number) => (
                <li key={`reason-${idx}`} className="flex items-start gap-2 text-blue-900/80">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="font-medium">{reason}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Four blocks below hero with image + content */}
        {(product.below_hero_sections)?.length > 0 && (
          <section className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(product.below_hero_sections || []).slice(0,4).map((block: any, idx: number) => (
                <div key={`block-${idx}`} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  {block?.image && (
                    <div className="relative h-40 bg-gray-100">
                      <Image src={block.image} alt={block?.title || `Block ${idx+1}`} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    {block?.title && <h4 className="font-semibold text-blue-900 mb-2">{block.title}</h4>}
                    {block?.content && <p className="text-blue-900/70 text-sm leading-relaxed">{block.content}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Product Reviews Section */}
        <div className="mt-10 border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-orange-50 to-blue-50">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Customer Reviews</h2>
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 sm:h-5 sm:w-5 ${i < (productDetail.rating || 4) ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="text-base sm:text-lg font-semibold text-gray-700">{productDetail.rating || 4.0}</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-sm sm:text-base text-gray-600">Based on {productDetail.reviewCount || 0} reviews</span>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">Real customers share their experience with the {productDetail.name}</p>
          </div>

          {/* Review Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Review 1 */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-orange-400 to-pink-400 flex items-center justify-center">
                  <span className="text-white font-semibold text-base sm:text-lg">S</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Sarah M.</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < 5 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4">"Absolutely love this mattress! The medium-firm feel is perfect and the pocket springs provide amazing support. I wake up feeling refreshed every morning."</p>
              <div className="text-xs sm:text-sm text-gray-500">Verified Purchase • 2 weeks ago</div>
            </div>

            {/* Review 2 */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                  <span className="text-white font-semibold text-base sm:text-lg">M</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Michael R.</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < 4 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4">"Great value for money! The memory foam layer is so comfortable and the delivery was super fast. My back pain has significantly improved."</p>
              <div className="text-xs sm:text-sm text-gray-500">Verified Purchase • 1 month ago</div>
            </div>

            {/* Review 3 */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-teal-400 flex items-center justify-center">
                  <span className="text-white font-semibold text-base sm:text-lg">E</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Emma L.</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < 5 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4">"Perfect mattress for our guest room! Guests always compliment how comfortable it is. The quality is excellent and it looks great too."</p>
              <div className="text-xs sm:text-sm text-gray-500">Verified Purchase • 3 weeks ago</div>
            </div>

            {/* Review 4 */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center">
                  <span className="text-white font-semibold text-base sm:text-lg">D</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">David K.</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < 4 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4">"Switched from a much more expensive mattress and honestly prefer this one! The pocket springs are fantastic and it stays cool throughout the night."</p>
              <div className="text-xs sm:text-sm text-gray-500">Verified Purchase • 2 months ago</div>
            </div>

            {/* Review 5 */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                  <span className="text-white font-semibold text-base sm:text-lg">L</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Lisa P.</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < 5 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4">"Best mattress I've ever owned! The combination of pocket springs and memory foam is perfect. No more tossing and turning at night."</p>
              <div className="text-xs sm:text-sm text-gray-500">Verified Purchase • 1 week ago</div>
            </div>

            {/* Review 6 */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gradient-to-br from-indigo-400 to-blue-400 flex items-center justify-center">
                  <span className="text-white font-semibold text-base sm:text-lg">J</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">James W.</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${i < 4 ? "text-orange-500 fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4">"Excellent mattress for the price! The quality is outstanding and it's incredibly comfortable. Highly recommend to anyone looking for a great mattress."</p>
              <div className="text-xs sm:text-sm text-gray-500">Verified Purchase • 1 month ago</div>
            </div>
          </div>

          {/* Review Stats */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-xs sm:text-sm text-gray-600">Would Recommend</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">{productDetail.rating || 4.0}/5</div>
              <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">{productDetail.reviewCount || 0}</div>
              <div className="text-xs sm:text-sm text-gray-600">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">5★</div>
              <div className="text-xs sm:text-sm text-gray-600">Most Common</div>
            </div>
          </div>

          {/* Write Review Button */}
          <div className="text-center mt-6 sm:mt-8">
            <button 
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Write a Review
            </button>
          </div>
        </div>
      </div>
      <ProductGridNew products={alsoViewed} title="Customers also viewed" />
    </div>
  )
}


