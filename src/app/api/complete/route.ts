import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

const PI_API_URL = 'https://api.minepi.com/v2/payments' // ✅ Sửa từ /payments → /v2/payments
const PI_SERVER_API_KEY = process.env.PI_SERVER_API_KEY || ''

type PiPaymentResponse = {
  identifier: string
  user_uid: string
  amount: number
  metadata: {
    productId: string
  }
  transaction: {
    txid: string
  }
}

export async function POST(req: Request) {
  try {
    const { paymentId, txid } = await req.json()

    if (!paymentId || !txid) {
      return NextResponse.json({ success: false, error: 'Thiếu paymentId hoặc txid' }, { status: 400 })
    }

    const piRes = await fetch(`${PI_API_URL}/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${PI_SERVER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txid }),
    })

    let piData: any = null
    const text = await piRes.text()

    try {
      piData = JSON.parse(text)
    } catch (e) {
      console.error('❌ Không parse được JSON từ Pi API:', text)
      return NextResponse.json({
        success: false,
        error: 'Lỗi từ Pi API (không phải JSON)',
        detail: text,
      }, { status: 500 })
    }

    if (!piRes.ok) {
      console.error('❌ Lỗi từ Pi API:', piData)
      return NextResponse.json({
        success: false,
        error: 'Lỗi xử lý giao dịch từ Pi',
        detail: piData,
      }, { status: 400 })
    }

    const payment: PiPaymentResponse = piData

    const { data, error } = await supabase.from('orders').insert([
      {
        payment_id: payment.identifier,
        txid: payment.transaction.txid,
        uid: payment.user_uid,
        amount: payment.amount,
        product_id: payment.metadata?.productId || '',
        status: 'completed',
      },
    ])

    if (error) {
      console.error('❌ Lỗi lưu đơn hàng vào Supabase:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error: unknown) {
    console.error('❌ Lỗi xử lý server:', error)
    return NextResponse.json({ success: false, error: 'Lỗi máy chủ', detail: String(error) }, { status: 500 })
  }
}
