import { notFound } from "next/navigation"
import Image from "next/image"
import { Check, Star } from "lucide-react"
import { ProductDetailHappy } from "@/components/product-detail-happy"
import { ProductGridNew } from "@/components/product-grid-new"

interface PageProps {
  params: Promise<{ category: string; id: string }>
}

// Local product data that matches the featured products
const localProducts = {
  'Silentnight mattresses': [
    {
      id: 1,
      name: "King Arthur Mattress",
      brand: "SILENTNIGHT",
      brandColor: "blue",
      badge: "Premium",
      badgeColor: "blue",
      image: "/mattress-image.svg",
      rating: 4.8,
      reviewCount: 127,
      firmness: "Medium",
      firmnessLevel: 6,
      features: ["Bamboo cover", "Motion isolation", "Edge support", "CertiPUR foam"],
      originalPrice: 499.00,
      currentPrice: 424.15,
      savings: 74.85,
      freeDelivery: "Tomorrow",
      setupService: false,
      setupCost: 0,
      certifications: ["OEKO-TEX", "Made in UK"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Queen",
      monthlyPrice: 35,
      images: ["/mattress-image.svg"],
      category: "mattresses",
      type: "Premium",
      size: "Queen Size",
      comfortLevel: "Medium",
      inStore: true,
      onSale: true,
      shortDescription: "Premium comfort with bamboo cover",
      longDescription: "Experience luxury sleep with our premium King Arthur mattress featuring advanced motion isolation technology and a breathable bamboo cover."
    },
    {
      id: 2,
      name: "Dream Mirapocket 1000 Mattress",
      brand: "SILENTNIGHT",
      brandColor: "blue",
      badge: "Eco",
      badgeColor: "green",
      image: "/mattress-image.svg",
      rating: 4.0,
      reviewCount: 256,
      firmness: "Medium-Firm",
      firmnessLevel: 7,
      features: ["ECO COMFORT™", "1000 POCKET SPRINGS", "24CM DEPTH", "Motion isolation"],
      originalPrice: 342.00,
      currentPrice: 290.70,
      savings: 51.30,
      freeDelivery: "Tomorrow",
      setupService: false,
      setupCost: 0,
      certifications: ["OEKO-TEX", "Made in UK"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Queen",
      monthlyPrice: 24,
      images: ["/mattress-image.svg"],
      category: "mattresses",
      type: "Eco",
      size: "Queen Size",
      comfortLevel: "Medium-Firm",
      inStore: true,
      onSale: true,
      shortDescription: "Eco-friendly comfort with 1000 pocket springs",
      longDescription: "Sustainable luxury meets exceptional comfort with our ECO COMFORT™ technology and 1000 individual pocket springs for perfect support."
    },
    {
      id: 3,
      name: "Ice Arthur Mattress",
      brand: "SILENTNIGHT",
      brandColor: "blue",
      badge: "Cooling",
      badgeColor: "blue",
      image: "/mattress-image.svg",
      rating: 4.5,
      reviewCount: 189,
      firmness: "Medium",
      firmnessLevel: 6,
      features: ["GEL FOAM", "3000 POCKET SPRINGS", "30CM DEPTH", "Cooling"],
      originalPrice: 559.00,
      currentPrice: 475.15,
      savings: 83.85,
      freeDelivery: "Tomorrow",
      setupService: false,
      setupCost: 0,
      certifications: ["OEKO-TEX", "Made in UK"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Queen",
      monthlyPrice: 40,
      images: ["/mattress-image.svg"],
      category: "mattresses",
      type: "Cooling",
      size: "Queen Size",
      comfortLevel: "Medium",
      inStore: true,
      onSale: true,
      shortDescription: "Advanced cooling technology with gel foam",
      longDescription: "Stay cool all night with our innovative gel foam technology and 3000 pocket springs for ultimate comfort and temperature regulation."
    },
    {
      id: 4,
      name: "Premium Memory Foam Mattress",
      brand: "SILENTNIGHT",
      brandColor: "blue",
      badge: "Memory Foam",
      badgeColor: "purple",
      image: "/mattress-image.svg",
      rating: 4.7,
      reviewCount: 203,
      firmness: "Medium-Soft",
      firmnessLevel: 5,
      features: ["Memory foam", "Pressure relief", "Motion isolation", "Breathable cover"],
      originalPrice: 399.00,
      currentPrice: 339.15,
      savings: 59.85,
      freeDelivery: "Tomorrow",
      setupService: false,
      setupCost: 0,
      certifications: ["OEKO-TEX", "Made in UK"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Queen",
      monthlyPrice: 28,
      images: ["/mattress-image.svg"],
      category: "mattresses",
      type: "Memory Foam",
      size: "Queen Size",
      comfortLevel: "Medium-Soft",
      inStore: true,
      onSale: true,
      shortDescription: "Premium memory foam for ultimate comfort",
      longDescription: "Experience the perfect balance of support and comfort with our premium memory foam mattress designed for pressure relief and motion isolation."
    }
  ],
  'beds': [
    {
      id: 5,
      name: "Modern Platform Bed",
      brand: "BEDORA",
      brandColor: "gray",
      badge: "Modern",
      badgeColor: "gray",
      image: "/mattress-image.svg",
      rating: 4.6,
      reviewCount: 89,
      firmness: "N/A",
      firmnessLevel: 0,
      features: ["Platform design", "Under-bed storage", "Easy assembly", "Modern style"],
      originalPrice: 299.00,
      currentPrice: 254.15,
      savings: 44.85,
      freeDelivery: "Tomorrow",
      setupService: true,
      setupCost: 49,
      certifications: ["Made in UK", "FSC Certified"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Queen",
      monthlyPrice: 21,
      images: ["/mattress-image.svg"],
      category: "beds",
      type: "Platform",
      size: "Queen Size",
      comfortLevel: "N/A",
      inStore: true,
      onSale: true,
      shortDescription: "Modern platform bed with storage",
      longDescription: "Contemporary design meets functionality with our modern platform bed featuring built-in storage and easy assembly."
    }
  ],
  'sofas': [
    {
      id: 6,
      name: "Premium Fabric Sofa",
      brand: "BEDORA",
      brandColor: "brown",
      badge: "Premium",
      badgeColor: "brown",
      image: "/mattress-image.svg",
      rating: 4.4,
      reviewCount: 67,
      firmness: "N/A",
      firmnessLevel: 0,
      features: ["Premium fabric", "Deep seating", "Sturdy frame", "Easy clean"],
      originalPrice: 599.00,
      currentPrice: 509.15,
      savings: 89.85,
      freeDelivery: "Tomorrow",
      setupService: true,
      setupCost: 79,
      certifications: ["Made in UK", "Fire Retardant"],
      sizes: ["2-Seater", "3-Seater", "Corner"],
      selectedSize: "3-Seater",
      monthlyPrice: 42,
      images: ["/mattress-image.svg"],
      category: "sofas",
      type: "Fabric",
      size: "3-Seater",
      comfortLevel: "N/A",
      inStore: true,
      onSale: true,
      shortDescription: "Premium fabric sofa with deep seating",
      longDescription: "Luxurious comfort with our premium fabric sofa featuring deep seating and a sturdy frame for lasting durability."
    }
  ],
  'pillows': [
    {
      id: 7,
      name: "Memory Foam Pillow",
      brand: "BEDORA",
      brandColor: "blue",
      badge: "Memory Foam",
      badgeColor: "blue",
      image: "/mattress-image.svg",
      rating: 4.3,
      reviewCount: 156,
      firmness: "Medium",
      firmnessLevel: 6,
      features: ["Memory foam", "Neck support", "Hypoallergenic", "Washable cover"],
      originalPrice: 49.00,
      currentPrice: 41.65,
      savings: 7.35,
      freeDelivery: "Tomorrow",
      setupService: false,
      setupCost: 0,
      certifications: ["OEKO-TEX", "Hypoallergenic"],
      sizes: ["Standard", "King"],
      selectedSize: "Standard",
      monthlyPrice: 3,
      images: ["/mattress-image.svg"],
      category: "pillows",
      type: "Memory Foam",
      size: "Standard",
      comfortLevel: "Medium",
      inStore: true,
      onSale: true,
      shortDescription: "Memory foam pillow for neck support",
      longDescription: "Perfect neck support with our memory foam pillow designed to maintain proper alignment and provide ultimate comfort."
    }
  ],
  'toppers': [
    {
      id: 8,
      name: "Gel Memory Foam Topper",
      brand: "BEDORA",
      brandColor: "blue",
      badge: "Cooling",
      badgeColor: "blue",
      image: "/mattress-image.svg",
      rating: 4.5,
      reviewCount: 98,
      firmness: "Medium",
      firmnessLevel: 6,
      features: ["Gel memory foam", "Cooling technology", "Pressure relief", "Easy fit"],
      originalPrice: 89.00,
      currentPrice: 75.65,
      savings: 13.35,
      freeDelivery: "Tomorrow",
      setupService: false,
      setupCost: 0,
      certifications: ["OEKO-TEX", "Cooling"],
      sizes: ["Single", "Double", "King", "Super King"],
      selectedSize: "Queen",
      monthlyPrice: 6,
      images: ["/mattress-image.svg"],
      category: "toppers",
      type: "Gel Memory Foam",
      size: "Queen",
      comfortLevel: "Medium",
      inStore: true,
      onSale: true,
      shortDescription: "Cooling gel memory foam topper",
      longDescription: "Transform your mattress with our cooling gel memory foam topper that provides pressure relief and temperature regulation."
    }
  ],
  'bunkbeds': [
    {
      id: 9,
      name: "Wooden Bunk Bed",
      brand: "BEDORA",
      brandColor: "brown",
      badge: "Space Saving",
      badgeColor: "green",
      image: "/mattress-image.svg",
      rating: 4.2,
      reviewCount: 45,
      firmness: "N/A",
      firmnessLevel: 0,
      features: ["Solid wood", "Space saving", "Safety rails", "Easy assembly"],
      originalPrice: 399.00,
      currentPrice: 339.15,
      savings: 59.85,
      freeDelivery: "Tomorrow",
      setupService: true,
      setupCost: 69,
      certifications: ["Made in UK", "Safety Certified"],
      sizes: ["Twin/Twin", "Twin/Full"],
      selectedSize: "Twin/Twin",
      monthlyPrice: 28,
      images: ["/mattress-image.svg"],
      category: "bunkbeds",
      type: "Wooden",
      size: "Twin/Twin",
      comfortLevel: "N/A",
      inStore: true,
      onSale: true,
      shortDescription: "Space-saving wooden bunk bed",
      longDescription: "Maximize bedroom space with our solid wood bunk bed featuring safety rails and easy assembly for peace of mind."
    }
  ],
  'kids': [
    {
      id: 10,
      name: "Kids Bed Frame",
      brand: "KIDS BEDDING",
      brandColor: "purple",
      badge: "Kids",
      badgeColor: "purple",
      image: "/mattress-image.svg",
      rating: 4.6,
      reviewCount: 89,
      firmness: "N/A",
      firmnessLevel: 0,
      features: ["Fun design", "Safety rails", "Low height", "Easy access"],
      originalPrice: 199.00,
      currentPrice: 169.15,
      savings: 29.85,
      freeDelivery: "Tomorrow",
      setupService: true,
      setupCost: 39,
      certifications: ["Made in UK", "Safety Certified"],
      sizes: ["Twin", "Full"],
      selectedSize: "Twin",
      monthlyPrice: 14,
      images: ["/mattress-image.svg"],
      category: "kids",
      type: "Kids",
      size: "Twin",
      comfortLevel: "N/A",
      inStore: true,
      onSale: true,
      shortDescription: "Fun and safe kids bed frame",
      longDescription: "Create a magical bedroom with our fun and safe kids bed frame featuring safety rails and an engaging design."
    }
  ]
}

function getProduct(category: string, id: string) {
  try {
    // Convert category to match the keys in localProducts
    let categoryKey = category
    if (category === 'mattresses') categoryKey = 'Silentnight mattresses'
    
    const products = localProducts[categoryKey as keyof typeof localProducts]
    if (!products) return null
    
    const product = products.find(p => p.id === parseInt(id))
    return product || null
  } catch (error) {
    console.error('Error getting product:', error)
    return null
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category, id } = await params
  
  // Get the product from local data
  const product = getProduct(category, id)
  
  if (!product) {
    notFound()
  }
  
  // Transform the product data to match ProductDetailCard interface
  const productDetail = {
    id: product.id,
    name: product.name || 'Unknown Product',
    brand: product.brand || 'Unknown Brand',
    brandColor: product.brandColor || 'blue',
    badge: product.badge || '',
    badgeColor: product.badgeColor || 'gray',
    image: (product.images && product.images[0]) || product.image || '',
    rating: Number(product.rating || 4.0),
    reviewCount: Number(product.reviewCount || 50),
    firmness: product.firmness || 'Medium',
    firmnessLevel: Number(product.firmnessLevel || 6),
    features: product.features || ['Premium Quality'],
    originalPrice: Number(product.originalPrice || 0),
    currentPrice: Number(product.currentPrice || 0),
    savings: Number(product.savings || Math.max(Number(product.originalPrice || 0) - Number(product.currentPrice || 0), 0)),
    freeDelivery: product.freeDelivery || 'Tomorrow',
    setupService: Boolean(product.setupService),
    setupCost: product.setupCost ? Number(product.setupCost) : undefined,
    certifications: product.certifications || ['OEKO-TEX', 'Made in UK'],
    sizes: product.sizes || ['Single', 'Double', 'King', 'Super King'],
    selectedSize: product.selectedSize || 'Queen',
    monthlyPrice: product.monthlyPrice ? Number(product.monthlyPrice) : Math.floor(Number(product.currentPrice || 0) / 12),
    images: product.images || [],
    category: product.category || category,
    type: product.type || 'Standard',
    size: product.size || 'Queen',
    comfortLevel: product.comfortLevel || 'Medium',
    inStore: Boolean(product.inStore !== false),
    onSale: Boolean(product.onSale),
    // Additional fields from database
    colors: [],
    materials: [],
    dimensions: {},
    dispatchTime: undefined,
    reasonsToBuy: [],
    promotionalOffers: [],
    productQuestions: [],
    warrantyInfo: {},
    careInstructions: undefined,
    stockQuantity: undefined,
    inStock: true,
    shortDescription: product.shortDescription,
    longDescription: product.longDescription
  }
  
  // Get related products from the same category
  let alsoViewed: any[] = []
  try {
    const categoryKey = category === 'mattresses' ? 'Silentnight mattresses' : category
    const products = localProducts[categoryKey as keyof typeof localProducts]
    if (products) {
      alsoViewed = products.filter(p => p.id !== product.id).slice(0, 4)
    }
  } catch {}

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
        {(product.reasonsToBuy || product.reasons_to_buy)?.length > 0 && (
          <section className="mt-10 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Reasons to buy</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(product.reasonsToBuy || product.reasons_to_buy || []).map((reason: string, idx: number) => (
                <li key={`reason-${idx}`} className="flex items-start gap-2 text-blue-900/80">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="font-medium">{reason}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Four blocks below hero with image + content */}
        {(product.belowHeroSections || product.below_hero_sections)?.length > 0 && (
          <section className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(product.belowHeroSections || product.below_hero_sections || []).slice(0,4).map((block: any, idx: number) => (
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


