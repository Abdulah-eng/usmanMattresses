"use client"
import { useEffect, useMemo, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  LogOut, 
  Settings, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Users, 
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Save,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'

const ADMIN_EMAIL = 'mabdulaharshad@gmail.com'

async function fetchJSON(url: string, options?: RequestInit) {
  const res = await fetch(url, { ...options, headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) } })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export default function AdminPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [banner, setBanner] = useState({ imageUrl: '', headline: '', subheadline: '', ctaLabel: '', ctaHref: '' })
  const [promo, setPromo] = useState({ title: '', endsAt: '' })
  const [product, setProduct] = useState<any>({ 
    name: '', 
    brand: '', 
    category: 'mattresses', 
    price: 0, 
    description: '',
    images: [] as string[],
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 0
  })
  const [orders, setOrders] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [saving, setSaving] = useState(false)

  // Check for existing session on component mount
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        // Check if user is admin
        if (session.user.email === ADMIN_EMAIL) {
          loadAdminData()
        } else {
          // Not admin, sign out
          await supabase.auth.signOut()
          setUser(null)
        }
      }
    }
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        if (session.user.email === ADMIN_EMAIL) {
          setUser(session.user)
          loadAdminData()
        } else {
          await supabase.auth.signOut()
          alert('Access denied. Only admin users can access this panel.')
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setBanner({ imageUrl: '', headline: '', subheadline: '', ctaLabel: '', ctaHref: '' })
        setPromo({ title: '', endsAt: '' })
        setOrders([])
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadAdminData = async () => {
    try {
      const b = await fetchJSON('/api/banner');
      if (b?.value) setBanner(b.value)
      const p = await fetchJSON('/api/promo');
      if (p?.value) setPromo(p.value)
      const o = await fetchJSON('/api/orders');
      setOrders(o.orders || [])
    } catch (error) {
      console.error('Failed to load admin data:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      })

      if (error) {
        alert(`Login failed: ${error.message}`)
        return
      }

      if (data.user?.email !== ADMIN_EMAIL) {
        await supabase.auth.signOut()
        alert('Access denied. Only admin users can access this panel.')
        return
      }

      setUser(data.user)
      setEmail('')
      setPassword('')
      
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const saveBanner = async () => {
    setSaving(true)
    try {
      await fetchJSON('/api/banner', { method: 'POST', body: JSON.stringify(banner) })
      alert('Banner saved successfully!')
    } catch (error) {
      alert('Failed to save banner')
    } finally {
      setSaving(false)
    }
  }

  const savePromo = async () => {
    setSaving(true)
    try {
      await fetchJSON('/api/promo', { method: 'POST', body: JSON.stringify(promo) })
      alert('Promo saved successfully!')
    } catch (error) {
      alert('Failed to save promo')
    } finally {
      setSaving(false)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    
    // Get the current session token
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.access_token) {
      throw new Error('No authentication token available')
    }
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      },
      body: formData
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Upload failed')
    }
    
    const data = await response.json()
    return data.url
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const imageUrl = await uploadImage(file)
      
      if (index !== undefined) {
        // Update existing image
        setProduct((p: any) => ({ 
          ...p, 
          images: p.images.map((u: string, i: number) => i === index ? imageUrl : u) 
        }))
      } else {
        // Add new image
        setProduct((p: any) => ({ 
          ...p, 
          images: [...(p.images || []), imageUrl] 
        }))
      }
    } catch (error) {
      alert('Failed to upload image')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  const addProductImage = () => setProduct((p: any) => ({ ...p, images: [...(p.images||[]), ''] }))
  const removeProductImage = (index: number) => setProduct((p: any) => ({ ...p, images: p.images.filter((_: string, i: number) => i !== index) }))

  const dispatchOrder = async (orderId: string, clientEmail: string) => {
    try {
      await fetchJSON('/api/orders/dispatch', { method: 'POST', body: JSON.stringify({ orderId, clientEmail }) })
      const o = await fetchJSON('/api/orders');
      setOrders(o.orders || [])
      alert('Order dispatched successfully!')
    } catch (error) {
      alert('Failed to dispatch order')
    }
  }

  const saveProduct = async () => {
    if (!product.name || !product.price || !product.category) {
      alert('Please fill in all required fields (name, price, category)')
      return
    }

    if (!product.images || product.images.length === 0) {
      alert('Please add at least one product image')
      return
    }

    // Filter out empty image URLs
    const validImages = product.images.filter((img: string) => img.trim() !== '')

    if (validImages.length === 0) {
      alert('Please add at least one valid product image')
      return
    }

    setSaving(true)
    try {
      // Get the current session token
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) {
        throw new Error('No authentication token available')
      }

      const productData = {
        ...product,
        images: validImages,
        price: Number(product.price),
        created_at: new Date().toISOString()
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(productData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save product')
      }

      const result = await response.json()
      alert(`Product "${product.name}" saved successfully!`)
      
      // Reset product form
      setProduct({
        name: '',
        description: '',
        price: 0,
        category: 'mattresses',
        images: [''],
        size: '',
        material: '',
        color: '',
        brand: '',
        inStock: true,
        featured: false,
        rating: 4.5,
        reviewCount: 0
      })
      
    } catch (error) {
      console.error('Error saving product:', error)
      alert(`Failed to save product: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSaving(false)
    }
  }

  // Dashboard stats
  const dashboardStats = useMemo(() => {
    const totalOrders = orders.length
    const pendingOrders = orders.filter(o => o.status !== 'dispatched').length
    const totalRevenue = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0)
    
    return {
      totalOrders,
      pendingOrders,
      totalRevenue: totalRevenue.toFixed(2),
      avgOrderValue: totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'
    }
  }, [orders])

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Admin Login</CardTitle>
            <p className="text-gray-600 text-sm">Access your dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Admin Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                  placeholder="admin@example.com"
                  required
                  disabled={loading}
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} 
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="h-12 text-base"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Only authorized admin users can access this panel.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your store and content</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.email}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white p-1 shadow-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total Orders</p>
                      <p className="text-3xl font-bold">{dashboardStats.totalOrders}</p>
                    </div>
                    <ShoppingCart className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Pending Orders</p>
                      <p className="text-3xl font-bold">{dashboardStats.pendingOrders}</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Total Revenue</p>
                      <p className="text-3xl font-bold">£{dashboardStats.totalRevenue}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Avg Order Value</p>
                      <p className="text-3xl font-bold">£{dashboardStats.avgOrderValue}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          order.status === 'dispatched' ? 'bg-green-500' : 'bg-orange-500'
                        }`} />
                        <div>
                          <p className="font-medium text-gray-900">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">{order.customer_email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">£{order.total}</p>
                        <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Add New Product
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Product Name *</Label>
                      <Input 
                        value={product.name} 
                        onChange={(e)=>setProduct({...product, name:e.target.value})} 
                        placeholder="Enter product name"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Brand</Label>
                      <Input 
                        value={product.brand} 
                        onChange={(e)=>setProduct({...product, brand:e.target.value})} 
                        placeholder="Enter brand name"
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Category *</Label>
                      <Select value={product.category} onValueChange={(value) => setProduct({...product, category: value})}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mattresses">Mattresses</SelectItem>
                          <SelectItem value="pillows">Pillows</SelectItem>
                          <SelectItem value="bedding">Bedding</SelectItem>
                          <SelectItem value="beds">Beds</SelectItem>
                          <SelectItem value="adjustable-bases">Adjustable Bases</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Price *</Label>
                      <Input 
                        type="number" 
                        value={product.price} 
                        onChange={(e)=>setProduct({...product, price:Number(e.target.value)})} 
                        placeholder="0.00"
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <Textarea 
                        value={product.description} 
                        onChange={(e)=>setProduct({...product, description:e.target.value})} 
                        placeholder="Enter product description"
                        className="mt-2"
                        rows={4}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="inStock"
                          checked={product.inStock}
                          onCheckedChange={(checked) => setProduct({...product, inStock: checked})}
                        />
                        <Label htmlFor="inStock">In Stock</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={product.featured}
                          onCheckedChange={(checked) => setProduct({...product, featured: checked})}
                        />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Product Images *</Label>
                    <Button size="sm" variant="outline" onClick={addProductImage} disabled={uploading}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {(product.images||[]).map((imageUrl: string, i: number) => (
                      <div key={i} className="border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-3 hover:border-gray-400 transition-colors">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Image {i + 1}</Label>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeProductImage(i)}
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        {imageUrl ? (
                          <div className="relative">
                            <img 
                              src={imageUrl} 
                              alt={`Product ${i + 1}`} 
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            <div className="absolute top-2 right-2">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, i)}
                                className="hidden"
                                id={`image-upload-${i}`}
                              />
                              <Label htmlFor={`image-upload-${i}`} className="cursor-pointer bg-white/90 rounded-full p-2 hover:bg-white shadow-md">
                                <Upload className="h-4 w-4 text-gray-600" />
                              </Label>
                            </div>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, i)}
                              className="hidden"
                              id={`image-upload-${i}`}
                            />
                            <Label htmlFor={`image-upload-${i}`} className="cursor-pointer">
                              <div className="space-y-2">
                                <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="text-sm text-gray-500">Click to upload</p>
                              </div>
                            </Label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  onClick={saveProduct} 
                  disabled={uploading || saving}
                >
                  {saving ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving Product...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Product
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Order Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="font-semibold text-gray-900">Order #{order.id}</div>
                          <div className="text-sm text-gray-600">{order.customer_email}</div>
                        </div>
                        <Badge variant={order.status === 'dispatched' ? 'default' : 'secondary'}>
                          {order.status === 'dispatched' ? (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Dispatched
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Pending
                            </div>
                          )}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-gray-600 mb-3">
                        <div>Created: {new Date(order.created_at).toLocaleDateString()}</div>
                        <div>Total: £{order.total}</div>
                      </div>
                      <div className="flex gap-2">
                        {order.status !== 'dispatched' && (
                          <Button 
                            size="sm" 
                            onClick={()=>dispatchOrder(order.id, order.customer_email)} 
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                          >
                            Dispatch Order
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-900">Admin Account</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    You are currently signed in as an administrator with full access to all features.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Email</span>
                    <span className="text-sm text-gray-600">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Role</span>
                    <Badge variant="default">Administrator</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Last Sign In</span>
                    <span className="text-sm text-gray-600">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}




