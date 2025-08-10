import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { sendMail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const { orderId, clientEmail } = await req.json()
  const { data, error } = await supabase
    .from('orders')
    .update({ status: 'dispatched', dispatched_at: new Date().toISOString() })
    .eq('id', orderId)
    .select('*')
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (clientEmail) {
    await sendMail({
      to: clientEmail,
      subject: 'Your order has been dispatched',
      html: `<p>Order #${orderId} has been dispatched. Thank you for shopping with us!</p>`,
    })
  }

  return NextResponse.json({ order: data })
}



