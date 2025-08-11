import Link from "next/link"
import { MessageCircle, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">MattressKing</h3>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">King's Support Team</h4>
              
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat now
              </Button>
              
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>(405) 564-0561</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>Email</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Products</h4>
            <ul className="space-y-2">
              <li><Link href="/mattresses" className="text-gray-600 hover:text-blue-900">Mattresses</Link></li>
              <li><Link href="/adjustable-bases" className="text-gray-600 hover:text-blue-900">Adjustable Bases</Link></li>
              <li><Link href="/pillows" className="text-gray-600 hover:text-blue-900">Pillows</Link></li>
              <li><Link href="/bedding" className="text-gray-600 hover:text-blue-900">Bedding</Link></li>
              <li><Link href="/beds" className="text-gray-600 hover:text-blue-900">Bed Frames</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-900">Contact Us</Link></li>
              <li><Link href="/financing" className="text-gray-600 hover:text-blue-900">Financing</Link></li>
              <li><Link href="/mattress-guide" className="text-gray-600 hover:text-blue-900">Mattress Guide</Link></li>
              <li><Link href="/mattress-finder" className="text-gray-600 hover:text-blue-900">Mattress Finder</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">About</h4>
            <ul className="space-y-2 mb-6">
              <li><Link href="/about" className="text-gray-600 hover:text-blue-900">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-blue-900">Contact</Link></li>
            </ul>
            
            <div>
              <h5 className="font-semibold text-gray-900 mb-3">Follow us</h5>
              <div className="flex space-x-3">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-900 cursor-pointer" />
                <Instagram className="h-5 w-5 text-gray-400 hover:text-blue-900 cursor-pointer" />
                <Youtube className="h-5 w-5 text-gray-400 hover:text-blue-900 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 MattressKing. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/about" className="text-gray-500 hover:text-blue-900 text-sm">About</Link>
              <Link href="/contact" className="text-gray-500 hover:text-blue-900 text-sm">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
