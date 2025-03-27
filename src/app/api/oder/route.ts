import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const { paymentId, txid, username, uid, amount, productId } = body

  const { data, error } = await supabase.from('orders').insert([
    {
      payment_id: paymentId,
      txid,
      username,
      uid,
      amount,
      product_id: productId,
    },
  ])

  if (error) {
    console.error('❌ Lỗi lưu đơn hàng:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data }, { status: 200 })
}
