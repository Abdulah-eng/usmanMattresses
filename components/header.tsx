"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart, Heart, X, Phone, MapPin, Truck, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { MegaMenu } from "@/components/mega-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const { state } = useCart()

  const navigationItems = [
    { name: "Mattresses", href: "/mattresses", key: "mattresses" },
    { name: "Adjustable Bases", href: "/adjustable-bases", key: "adjustable-bases" },
    { name: "Pillows", href: "/pillows", key: "pillows" },
    { name: "Bedding", href: "/bedding", key: "bedding" },
    { name: "Box Springs & Bed Bases", href: "/box-springs", key: "box-springs" }
  ]

  return (
    <header className="bg-white shadow-sm relative z-50">
      {/* Top bar */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <Link href="/about" className="hover:text-blue-200">About Us</Link>
              <Link href="/contact" className="hover:text-blue-200">Contact Us</Link>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <Truck className="h-4 w-4" />
                <span>Delivery & Pickup</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Oklahoma Find Stores</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>405.564.0561</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            MattressKing
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Search everything at MattressKing"
                className="w-full pr-12 border-gray-300"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-900 hover:bg-blue-800 rounded-full h-8 w-8 p-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Heart className="h-5 w-5 mr-1" />
              Wishlist
            </Button>
            
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5 mr-1" />
                Cart
                {state.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.itemCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button className="bg-blue-900 hover:bg-blue-800 text-white px-6">
              Financing
            </Button>

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

        {/* Navigation */}
        <div className="border-t border-gray-200 relative">
          <nav className="hidden md:flex items-center py-4 gap-8">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveMegaMenu(item.key)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-blue-900 font-medium py-2"
                >
                  {item.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
            
            <Link href="/sale" className="text-blue-900 font-medium hover:text-blue-800 flex items-center py-2">
              🏷️ Sale
            </Link>
            
            <Link href="/mattress-guide" className="text-gray-700 hover:text-blue-900 font-medium py-2">
              Mattress Guide
            </Link>
            
            <Link href="/mattress-finder" className="text-gray-700 hover:text-blue-900 font-medium flex items-center py-2">
              🧭 Mattress Finder Quiz
            </Link>
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <div className="mb-4">
                <Input
                  type="search"
                  placeholder="Search everything at MattressKing"
                  className="w-full"
                />
              </div>
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-medium text-gray-900 hover:text-blue-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/sale"
                className="font-medium text-blue-900 hover:text-blue-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏷️ Sale
              </Link>
              <Link
                href="/mattress-guide"
                className="font-medium text-gray-700 hover:text-blue-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                Mattress Guide
              </Link>
              <Link
                href="/mattress-finder"
                className="font-medium text-gray-700 hover:text-blue-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                🧭 Mattress Finder Quiz
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
