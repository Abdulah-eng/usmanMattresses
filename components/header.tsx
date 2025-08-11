"use client"

import { useState, useEffect } from "react"
import { useMounted } from "@/hooks/use-mobile"
import Link from "next/link"
import { Menu, Search, ShoppingCart, Heart, X, Phone, MapPin, Truck, ChevronDown, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { MegaMenu } from "@/components/mega-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 4,
    minutes: 48,
    seconds: 0
  })
  const mounted = useMounted()
  const { state } = useCart()

  // Countdown timer effect - only run on client
  useEffect(() => {
    if (!mounted) return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [mounted])

  const navigationItems = [
    { name: "Mattresses", href: "/mattresses", key: "mattresses" },
    { name: "Adjustable Bases", href: "/adjustable-bases", key: "adjustable-bases" },
    { name: "Pillows", href: "/pillows", key: "pillows" },
    { name: "Bedding", href: "/bedding", key: "bedding" },
    { name: "Box Springs & Bed Bases", href: "/box-springs", key: "box-springs" }
  ]

  return (
    <header className="bg-white shadow-sm relative z-50">
      {/* Sales Banner */}
      <div className="bg-[#dc2626] text-white"> {/* Changed to dark red #dc2626 */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-2 text-sm font-medium">
            <span className="mr-4">UP TO 50% OFF - MID WEEK SAVINGS | ENDS IN</span> {/* Original text */}
            {mounted ? (
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded-lg px-2 py-1 shadow-sm">
                  <span className="font-bold text-black">{timeLeft.hours.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-white font-medium">HOURS</span> {/* Text-white */}
                <div className="bg-white rounded-lg px-2 py-1 shadow-sm">
                  <span className="font-bold text-black">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-white font-medium">MINS</span> {/* Text-white */}
                <div className="bg-white rounded-lg px-2 py-1 shadow-sm">
                  <span className="font-bold text-black">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-white font-medium">SECS</span> {/* Text-white */}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="bg-white rounded-lg px-2 py-1 shadow-sm">
                  <span className="font-bold text-black">01</span>
                </div>
                <span className="text-white font-medium">DAYS</span>
                <div className="bg-white rounded-lg px-2 py-1 shadow-sm">
                  <span className="font-bold text-black">04</span>
                </div>
                <span className="text-white font-medium">HOURS</span>
                <div className="bg-white rounded-lg px-2 py-1 shadow-sm">
                  <span className="font-bold text-black">48</span>
                </div>
                <span className="text-white font-medium">MINS</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Search Bar - Left */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search for your bedroom upgrade...."
                className="w-full pr-12 border-gray-300 rounded-lg"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-800 hover:bg-blue-900 rounded-full h-8 w-8 p-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Logo - Center */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="text-3xl font-bold text-blue-800 font-serif">
              MattressKing™
            </Link>
          </div>

          {/* Account/Basket - Right */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end text-sm">
              <Link href="/track-order" className="text-blue-900 hover:text-blue-700">Track Order</Link>
              <Link href="/account" className="text-blue-900 hover:text-blue-700">My Account</Link>
              <Link href="/signin" className="text-blue-900 hover:text-blue-700">Sign In / Register</Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative text-blue-800 hover:text-blue-700">
                  <ShoppingCart className="h-5 w-5 mr-1" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">BASKET</span>
                    <span className="font-medium">£{state.total.toFixed(2)}</span>
                  </div>
                  {state.itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {state.itemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Full Width */}
      <div className="bg-blue-800 text-white w-full">
        <div className="px-4">
          <nav className="hidden md:flex items-center justify-between py-3">
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu(item.key)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center text-white hover:text-gray-200 font-medium py-2"
                  >
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-8">
              <Link href="/sale" className="text-white hover:text-gray-200 font-medium py-2 flex items-center">
                🏷️ Sale
              </Link>
              
              <Link href="/mattress-guide" className="text-white hover:text-gray-200 font-medium py-2">
                Mattress Guide
              </Link>
              
              <Link href="/mattress-finder" className="text-white hover:text-gray-200 font-medium py-2 flex items-center">
                🧭 Mattress Finder Quiz
              </Link>
            </div>
          </nav>

          {/* Mega Menu */}
          <div
            onMouseEnter={() => {/* Keep mega menu open */}}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            {navigationItems.map((item) => (
              <MegaMenu
                key={item.key}
                category={item.key}
                isVisible={activeMegaMenu === item.key}
                onClose={() => setActiveMegaMenu(null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-orange-50 py-3 w-full">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm text-blue-800">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span>Trustpilot ★★★★ Rated Excellent</span>
            </div>
            <div>Buy today, delivered tomorrow</div>
            <div>Klarna. Buy now & pay later available</div>
            <div>5 Year manufacturer's guarantee</div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4">
              <div className="mb-4">
                <Input
                  type="search"
                  placeholder="Search for your bedroom upgrade...."
                  className="w-full"
                />
              </div>
              <div className="flex flex-col space-y-2 text-sm">
                <Link href="/contact" className="text-blue-800 hover:text-blue-700">Contact Us</Link>
                <Link href="/about" className="text-blue-800 hover:text-blue-700">About</Link>
              </div>
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-medium text-gray-900 hover:text-blue-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/sale"
                className="font-medium text-gray-700 hover:text-blue-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏷️ Sale
              </Link>
              <Link
                href="/mattress-guide"
                className="font-medium text-gray-700 hover:text-blue-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mattress Guide
              </Link>
              <Link
                href="/mattress-finder"
                className="font-medium text-gray-700 hover:text-blue-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                🧭 Mattress Finder Quiz
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
