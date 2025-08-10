"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck, Shield, CheckCircle } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function CheckoutPage() {
  const { state } = useCart()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'card',
    deliveryOption: 'standard'
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
            <Button asChild className="bg-blue-900 hover:bg-blue-800">
              <Link href="/mattresses">Start Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
            
            {/* Progress Steps */}
            <div className="flex items-center space-x-4 mb-8">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                  </div>
                                      <span className={`ml-2 text-sm ${step >= stepNumber ? 'text-blue-900' : 'text-gray-500'}`}>
                    {stepNumber === 1 ? 'Information' : stepNumber === 2 ? 'Delivery' : 'Payment'}
                  </span>
                  {stepNumber < 3 && <div className="w-8 h-px bg-gray-300 mx-4" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Oklahoma City"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          placeholder="73101"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(405) 555-0123"
                      />
                    </div>

                    <Button onClick={nextStep} className="w-full bg-blue-900 hover:bg-blue-800">
                      Continue to Delivery
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={formData.deliveryOption}
                      onValueChange={(value) => handleInputChange('deliveryOption', value)}
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="standard" id="standard" />
                        <div className="flex-1">
                          <Label htmlFor="standard" className="font-medium">Standard Delivery</Label>
                          <p className="text-sm text-gray-600">5-7 business days • FREE</p>
                        </div>
                        <Truck className="h-5 w-5 text-gray-400" />
                      </div>
                      
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="white-glove" id="white-glove" />
                        <div className="flex-1">
                          <Label htmlFor="white-glove" className="font-medium">White Glove Delivery</Label>
                          <p className="text-sm text-gray-600">Setup & old mattress removal • £99</p>
                        </div>
                        <Shield className="h-5 w-5 text-gray-400" />
                      </div>
                    </RadioGroup>

                    <div className="flex gap-4 mt-6">
                      <Button variant="outline" onClick={prevStep} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={nextStep} className="flex-1 bg-blue-900 hover:bg-blue-800">
                        Continue to Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange('paymentMethod', value)}
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <div className="flex-1">
                          <Label htmlFor="card" className="font-medium">Credit/Debit Card</Label>
                        </div>
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="financing" id="financing" />
                        <div className="flex-1">
                          <Label htmlFor="financing" className="font-medium">0% APR Financing</Label>
                          <p className="text-sm text-gray-600">Subject to credit approval</p>
                        </div>
                      </div>
                    </RadioGroup>

                    {formData.paymentMethod === 'card' && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the Terms of Service and Privacy Policy
                      </Label>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <Button variant="outline" onClick={prevStep} className="flex-1">
                        Back
                      </Button>
                      <Button className="flex-1 bg-blue-900 hover:bg-blue-800" onClick={async ()=>{
                        const res = await fetch('/api/checkout', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ items: state.items, customer: { email: formData.email } })
                        })
                        const data = await res.json()
                        if (data?.url) window.location.href = data.url
                      }}>
                        Pay with Stripe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                          <span className="absolute -top-2 -right-2 bg-blue-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600">{item.brand}</p>
                          <p className="text-sm font-medium">£{(item.currentPrice * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>£{state.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery</span>
                      <span className={formData.deliveryOption === 'white-glove' ? '' : 'text-green-600'}>
                        {formData.deliveryOption === 'white-glove' ? '£99.00' : 'FREE'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>£{(state.total * 0.2).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>£{(state.total * 1.2 + (formData.deliveryOption === 'white-glove' ? 99 : 0)).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
