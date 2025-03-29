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
  metadata: {
    productId: string
  }
  transaction: {
    txid: string
  }
  from_address: string
  memo: string
  network: string
  username?: string
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

    console.log('📦 Dữ liệu Pi API trả về:', piData)

    const payment: PiPaymentResponse = piData

    const { data, error } = await supabase.from('orders').insert([
      {
        payment_id: payment.identifier,
        txid: payment.transaction?.txid || '',
        uid: payment.user_uid || '',
        amount: payment.amount ?? null, // Đảm bảo dữ liệu được ghi nhận là số hoặc null
        price_pi: payment.amount ?? null, // Nếu cột này là để ghi nhận số Pi thanh toán
        product_id: payment.metadata?.productId || '',
        username: payment.username || '',
        wallet_address: payment.from_address || '',
        memo: payment.memo || '',
        status: 'completed',
        network: payment.network || 'Pi Testnet',
        created_at: new Date().toISOString()
      },
    ])

    if (error) {
      console.error('❌ Lỗi lưu đơn hàng vào Supabase:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (error: unknown) {
    console.error('❌ Lỗi xử lý server:', error)

    let message = 'Lỗi máy chủ'
    if (typeof error === 'object' && error !== null && 'message' in error) {
      message = String((error as { message: string }).message)
    }

    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
