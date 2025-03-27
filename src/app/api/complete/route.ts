import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

type PiPayment = {
  amount: number
  memo: string
  metadata: {
    productId?: string
    productName?: string
  }
  user_uid: string
}

export async function POST(req: NextRequest) {
  const { paymentId, txid } = await req.json()

  if (!paymentId || !txid) {
    return NextResponse.json(
      { success: false, error: 'Thiếu paymentId hoặc txid' },
      { status: 400 }
    )
  }

  try {
    const piRes = await fetch('https://api.minepi.com/v2/payments/complete', {
      method: 'POST',
      headers: {
        Authorization: `Key ${process.env.PI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentId, txid }),
    })

    const piData = await piRes.json()

    const payment = piData.data as PiPayment | null

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Không có dữ liệu giao dịch từ Pi API' },
        { status: 400 }
      )
    }

    // Lưu đơn hàng vào Supabase
    const metadata = payment.metadata || {}

    const { error } = await supabase.from('orders').insert([
      {
        payment_id: paymentId,
        txid,
        product_id: metadata.productId || 'unknown',
        product_name: metadata.productName || 'Không rõ',
        price_pi: payment.amount,
        user_uid: payment.user_uid || 'unknown',
        status: 'completed',
      },
    ])

    if (error) {
      console.error('❌ Lỗi khi lưu Supabase:', error)
      return NextResponse.json(
        { success: false, error: 'Lỗi lưu đơn hàng Supabase' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data: piData.data })
  } catch (err: unknown) {
    console.error('🔥 Lỗi xử lý complete:', err)
    return NextResponse.json(
      { success: false, error: 'Lỗi xử lý giao dịch' },
      { status: 500 }
    )
  }
}
