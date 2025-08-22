"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Heart, Mail, X, Truck, HeadphonesIcon, ArrowRight, Instagram, Facebook, Youtube, Package, Car, RotateCcw, CreditCard, ChevronDown } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Sora } from 'next/font/google'
import { useCart } from "@/lib/cart-context"

const sora = Sora({ subsets: ['latin'], weight: ['800'] })

export function Header() {
  const { state } = useCart()

  return (
    <header className="relative z-50">
      {/* Top Bar - Dark Grey */}
      <div className="text-white border-b-2 border-gray-600" style={{ backgroundColor: '#33373E' }}>
        <div className="px-2">
          <div className="flex items-center justify-between py-2 text-sm">
            {/* Left Side - Navigation Links */}
            <div className="flex items-center space-x-4">
              <Link href="/contact" className="hover:text-orange-400 transition-colors">Contact</Link>
              <div className="w-px h-4 bg-white"></div>
              <Link href="/reviews" className="hover:text-orange-400 transition-colors">Reviews</Link>
              <div className="w-px h-4 bg-white"></div>
              <Link href="/support" className="hover:text-orange-400 transition-colors">Support</Link>
            </div>
            
            {/* Right Side - Email and Social Icons */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@davicishop.com</span>
              </div>
              <div className="w-px h-4 bg-white"></div>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <X className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Dark Grey Background */}
      <div className="text-white" style={{ backgroundColor: '#33373E' }}>
        <div className="px-2">
          <div className="flex items-center justify-between py-6">
            {/* Left: DAVICI Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-orange-500 rounded-full border-2 border-orange-400 flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className={`${sora.className} text-3xl font-extrabold tracking-tight`}>Bedora Living</span>
            </Link>

            {/* Center: Search Bar with Category Dropdown */}
            <div className="w-[600px] ml-auto mr-8">
              <div className="flex items-center bg-white rounded-md overflow-hidden">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="flex-1 border-0 focus:ring-0 text-gray-900 placeholder:text-gray-500"
                />
                <div className="flex items-center border-l border-gray-200">
                  <select className="px-4 py-2 text-gray-700 bg-transparent border-0 focus:ring-0 focus:outline-none">
                    <option>All Category</option>
                    <option>Mattresses</option>
                    <option>Beds</option>
                    <option>Sofas</option>
                    <option>Pillows</option>
                    <option>Toppers</option>
                    <option>Bunkbeds</option>
                    <option>Kids</option>
                  </select>
                  <div className="w-px h-6 bg-gray-200"></div>
                  <div className="px-2 py-1">
                    <button className="px-6 py-2 bg-orange-500 hover:bg-orange-600 transition-colors flex items-center justify-center min-w-[56px] rounded-sm">
                      <Search className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info Boxes and User Icons */}
            <div className="flex items-center space-x-6">
              {/* Free Shipping Box */}
              <div className="flex items-center space-x-3 border border-white rounded-lg p-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold">FREE SHIPPING</div>
                  <div className="text-gray-300">over order $120</div>
                </div>
              </div>

              {/* Call Us Box */}
              <div className="flex items-center space-x-3 border border-white rounded-lg p-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <HeadphonesIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold">CALL US FREE</div>
                  <div className="text-gray-300">+1 86.36.166</div>
                </div>
              </div>

              {/* User Icons */}
              <div className="flex items-center space-x-4">
                <Link href="/login" className="flex items-center space-x-2 hover:text-orange-400 transition-colors">
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Login</span>
                </Link>
                
                <Link href="/wishlist" className="hover:text-orange-400 transition-colors">
                  <Heart className="w-6 h-6" />
                </Link>
                
                <Link href="/cart" className="relative hover:text-orange-400 transition-colors">
                  <ShoppingCart className="w-6 h-6" />
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">0</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* First Navigation Bar - Dark Grey with Product Categories */}
      <div className="text-white" style={{ backgroundColor: '#33373E' }}>
        <div className="px-2">
          <div className="flex items-center justify-center py-3">
            <div className="flex items-center gap-8 text-sm font-medium">
              <Link href="/mattresses" className="group flex items-center gap-1 hover:text-orange-400 transition-colors">Mattresses <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-orange-400" /></Link>
              <Link href="/beds" className="group flex items-center gap-1 hover:text-orange-400 transition-colors">Beds <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-orange-400" /></Link>
              <Link href="/sofas" className="group flex items-center gap-1 hover:text-orange-400 transition-colors">Sofas <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-orange-400" /></Link>
              <Link href="/pillows" className="group flex items-center gap-1 hover:text-orange-400 transition-colors">Pillows <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-orange-400" /></Link>
              <Link href="/toppers" className="group flex items-center gap-1 hover:text-orange-400 transition-colors">Toppers <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-orange-400" /></Link>
              <Link href="/bunkbeds" className="group flex items-center gap-1 hover:text-orange-400 transition-colors">Bunkbeds <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-orange-400" /></Link>
              <Link href="/kids" className="group flex items-center gap-1 hover:text-orange-400 transition-colors">Kids <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-orange-400" /></Link>
              <Link href="/guides" className="group flex items-center gap-1 hover:text-orange-400 transition-colors">Guides <ChevronDown className="w-4 h-4 text-gray-300 group-hover:text-orange-400" /></Link>
              <Link href="/sale" className="flex items-center space-x-2 rounded-lg p-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div className="leading-5">
                  <div className="text-sm font-semibold">SALES & CLEARANCE</div>
                  <div className="text-xs text-gray-300">discount up to 60%</div>
                </div>
              </Link>
              <Link href="/mattress-finder" className="flex items-center space-x-2 rounded-lg p-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Search className="w-4 h-4 text-white" />
                </div>
                <div className="leading-5">
                  <div className="text-sm font-semibold">MATTRESS QUIZ</div>
                  <div className="text-xs text-gray-300">find your perfect match</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Second Navigation Bar - Light Grey with Promotional Information */}
      <div className="text-gray-800" style={{ backgroundColor: '#F5F5F5' }}>
        <div className="px-2">
          <div className="flex items-center justify-center py-1">
            <div className="grid grid-cols-4 gap-8 w-full max-w-6xl">
              {/* Click + Collect */}
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <Package className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="text-xs">
                  <div className="font-medium">Click + Collect now in as little as 15 minutes*</div>
                  <div className="text-xs text-gray-600">*Restrictions apply</div>
                </div>
              </div>

              {/* Free Delivery */}
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <Car className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="text-xs">
                  <div className="font-medium">Free delivery on 1000s of products</div>
                  <div className="text-xs text-gray-600">Selected products/locations</div>
                </div>
              </div>

              {/* 90 Day Returns */}
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <RotateCcw className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="text-xs">
                  <div className="font-medium">90 day returns policy</div>
                </div>
              </div>

              {/* Join B&Q Club */}
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                  <CreditCard className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="text-xs">
                  <div className="font-medium">Join B&Q Club</div>
                  <div className="text-xs text-gray-600">Save up to £100 a year ▲</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
