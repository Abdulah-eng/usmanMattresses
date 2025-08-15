import Link from "next/link"
import { MessageCircle, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">MattressKing</h3>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-gray-900">King's Support Team</h4>
              
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat now
              </Button>
              
              <div className="flex items-center text-gray-600 min-w-0">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="break-words">(405) 564-0561</span>
              </div>
              
              <div className="flex items-center text-gray-600 min-w-0">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="break-words">Email</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="min-w-0">
            <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link href="/mattresses" className="text-gray-600 hover:text-blue-900 break-words">Mattresses</Link></li>
              <li><Link href="/adjustable-bases" className="text-gray-600 hover:text-blue-900 break-words">Adjustable Bases</Link></li>
              <li><Link href="/pillows" className="text-gray-600 hover:text-blue-900 break-words">Pillows</Link></li>
              <li><Link href="/bedding" className="text-gray-600 hover:text-blue-900 break-words">Bedding</Link></li>
              <li><Link href="/beds" className="text-gray-600 hover:text-blue-900 break-words">Bed Frames</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="min-w-0">
            <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-900 break-words">Contact Us</Link></li>
              <li><Link href="/financing" className="text-gray-600 hover:text-blue-900 break-words">Financing</Link></li>
              <li><Link href="/mattress-guide" className="text-gray-600 hover:text-blue-900 break-words">Mattress Guide</Link></li>
              <li><Link href="/mattress-finder" className="text-gray-600 hover:text-blue-900 break-words">Mattress Finder</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="min-w-0">
            <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4">About</h4>
            <ul className="space-y-2 mb-4 sm:mb-6">
              <li><Link href="/about" className="text-gray-600 hover:text-blue-900 break-words">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-900 break-words">Contact</Link></li>
            </ul>
            
            <div className="min-w-0">
              <h5 className="font-semibold text-gray-900 mb-2 sm:mb-3">Follow us</h5>
              <div className="flex space-x-3">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-900 cursor-pointer flex-shrink-0" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-900 cursor-pointer flex-shrink-0" />
                <Youtube className="h-5 w-5 text-gray-400 hover:text-blue-900 cursor-pointer flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2024 MattressKing. All rights reserved.
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <Link href="/about" className="text-gray-500 hover:text-blue-900 text-sm break-words">About</Link>
              <Link href="/contact" className="text-gray-500 hover:text-blue-900 text-sm break-words">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
