import type { Metadata } from 'next'
import { Inter, Poppins, Outfit, Playfair_Display } from 'next/font/google'
import './globals.css'
import { CartProvider } from "@/lib/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap'
})

const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-outfit',
  display: 'swap'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${outfit.style.fontFamily};
  --font-inter: ${inter.variable};
  --font-poppins: ${poppins.variable};
  --font-outfit: ${outfit.variable};
  --font-playfair: ${playfair.variable};
}
        `}</style>
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${outfit.variable} ${playfair.variable}`}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
