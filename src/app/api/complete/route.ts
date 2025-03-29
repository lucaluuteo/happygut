import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

const PI_API_URL = 'https://api.minepi.com/v2/payments'
const PI_SERVER_API_KEY = process.env.PI_SERVER_API_KEY || ''

type PiPaymentResponse = {
  identifier: string
  user_uid: string
  amount: number
  memo: string
  metadata: {
    productId: string
  }
  transaction: {
    txid: string
  }
  from_address?: string
  network?: string
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

    const piData = await piRes.json()

    if (!piRes.ok) {
      console.error('❌ Lỗi từ Pi API:', piData)
      return NextResponse.json({
        success: false,
        error: 'Lỗi xử lý giao dịch từ Pi',
        detail: piData,
      }, { status: 400 })
    }

    const payment: PiPaymentResponse = piData

    // 📌 Thêm kiểm tra dữ liệu trước khi lưu
    if (!payment.amount || !payment.identifier || !payment.transaction?.txid) {
      console.error('❌ Dữ liệu không đầy đủ:', payment)
      return NextResponse.json({ success: false, error: 'Dữ liệu không đầy đủ' }, { status: 400 })
    }

    const { data, error } = await supabase.from('Orders').insert([
      {
        payment_id: payment.identifier,
        txid: payment.transaction.txid,
        user_uid: payment.user_uid,
        amount: payment.amount,
        product_id: payment.metadata?.productId || null,
        memo: payment.memo || null,
        wallet_address: payment.from_address || null,
        network: payment.network || null,
        status: 'completed'
      },
    ])

    if (error) {
      console.error('❌ Lỗi lưu đơn hàng vào Supabase:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error: unknown) {
    console.error('❌ Lỗi xử lý server:', error)
    return NextResponse.json({ success: false, error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
