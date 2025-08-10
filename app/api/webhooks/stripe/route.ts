import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { sendMail } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature') as string

  console.log('🔔 Webhook received:', { signature: signature ? 'present' : 'missing' })

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    console.log('✅ Webhook signature verified, event type:', event.type)
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    
    console.log('💰 Processing completed checkout session:', {
      sessionId: session.id,
      customerEmail: session.customer_details?.email,
      customerName: session.customer_details?.name,
      amount: session.amount_total,
      metadata: session.metadata
    })
    
    try {
      // Get the line items from the session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id)
      console.log('📦 Line items:', lineItems.data.length, 'items')
      
      // Calculate total
      const total = session.amount_total ? session.amount_total / 100 : 0
      console.log('💵 Total amount:', total)
      
      // Create order in database
      const orderData = {
        customer_email: session.customer_details?.email || session.metadata?.customerEmail || '',
        customer_name: session.customer_details?.name || 'Unknown',
        customer_phone: session.customer_details?.phone || '',
        shipping_address: session.customer_details?.address || {},
        billing_address: session.customer_details?.address || {},
        status: 'processing',
        total: total,
        stripe_payment_intent_id: session.payment_intent as string,
      }
      
      console.log('💾 Creating order in database:', orderData)
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single()

      if (orderError) {
        console.error('❌ Error creating order:', orderError)
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
      }

      console.log('✅ Order created successfully:', order.id)

      // Create order items
      let itemsCreated = 0
      for (const item of lineItems.data) {
        if (item.price?.product_data?.name) {
          // Extract product name and size from the line item name
          const nameParts = item.price.product_data.name.split(' (')
          const productName = nameParts[0]
          const size = nameParts[1] ? nameParts[1].replace(')', '') : 'Standard'
          
          console.log('🔍 Looking for product:', productName)
          
          // Find product by name (you might want to store product_id in metadata instead)
          const { data: product, error: productError } = await supabase
            .from('products')
            .select('id, price')
            .eq('name', productName)
            .single()

          if (productError) {
            console.error('❌ Error finding product:', productError)
            continue
          }

          if (product) {
            const { error: itemError } = await supabase
              .from('order_items')
              .insert({
                order_id: order.id,
                product_id: product.id,
                quantity: item.quantity || 1,
                price: (item.amount_total || 0) / 100,
              })

            if (itemError) {
              console.error('❌ Error creating order item:', itemError)
            } else {
              itemsCreated++
              console.log('✅ Order item created for product:', productName)
            }
          } else {
            console.log('⚠️ Product not found:', productName)
          }
        }
      }

      console.log(`📊 Created ${itemsCreated} order items`)

      // Send confirmation email to customer
      const customerEmail = session.customer_details?.email || session.metadata?.customerEmail
      if (customerEmail) {
        console.log('📧 Sending confirmation email to customer:', customerEmail)
        
        try {
          const emailResult = await sendMail({
            to: customerEmail,
            subject: 'Order Confirmation - Your Order Has Been Placed!',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Thank you for your order!</h2>
                <p>Dear ${session.customer_details?.name || 'Valued Customer'},</p>
                <p>We're excited to confirm that your order has been successfully placed and is now being processed.</p>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">Order Details:</h3>
                  <p><strong>Order ID:</strong> ${order.id}</p>
                  <p><strong>Total Amount:</strong> £${total.toFixed(2)}</p>
                  <p><strong>Status:</strong> Processing</p>
                  <p><strong>Items:</strong> ${itemsCreated} item(s)</p>
                </div>
                
                <p>We'll send you updates on your order status, including when it's dispatched and delivered.</p>
                
                <p>If you have any questions about your order, please don't hesitate to contact our customer service team.</p>
                
                <p>Thank you for choosing us!</p>
                <p>Best regards,<br>Your Mattress Store Team</p>
              </div>
            `,
          })
          
          console.log('✅ Customer confirmation email sent successfully')
        } catch (emailError) {
          console.error('❌ Error sending confirmation email to customer:', emailError)
          // Don't fail the webhook if email fails
        }
      } else {
        console.log('⚠️ No customer email found for confirmation')
      }

      // Notify admin of new order
      if (process.env.ADMIN_EMAIL) {
        console.log('📧 Sending admin notification to:', process.env.ADMIN_EMAIL)
        
        try {
          await sendMail({
            to: process.env.ADMIN_EMAIL,
            subject: 'New Order Received',
            html: `
              <div style="font-family: Arial, sans-serif;">
                <h2>New Order Received</h2>
                <p><strong>Order ID:</strong> ${order.id}</p>
                <p><strong>Customer:</strong> ${session.customer_details?.name || 'Unknown'}</p>
                <p><strong>Email:</strong> ${customerEmail || 'Unknown'}</p>
                <p><strong>Total:</strong> £${total.toFixed(2)}</p>
                <p><strong>Items:</strong> ${itemsCreated} item(s)</p>
                <p><strong>Stripe Session:</strong> ${session.id}</p>
              </div>
            `,
          })
          
          console.log('✅ Admin notification sent successfully')
        } catch (adminEmailError) {
          console.error('❌ Error sending admin notification:', adminEmailError)
        }
      }

      console.log('🎉 Webhook processing completed successfully')
      return NextResponse.json({ 
        success: true, 
        orderId: order.id, 
        itemsCreated,
        customerEmailSent: !!customerEmail,
        adminEmailSent: !!process.env.ADMIN_EMAIL
      })

    } catch (error) {
      console.error('❌ Error processing webhook:', error)
      return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
    }
  }

  console.log('ℹ️ Webhook event type not handled:', event.type)
  return NextResponse.json({ received: true })
}
