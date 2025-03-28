import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const piApiKey = process.env.PI_API_KEY || '' // dùng để gọi Pi API (nếu cần header auth)

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { paymentId, txid } = body

    if (!paymentId || !txid) {
      return NextResponse.json({ success: false, error: 'Thiếu paymentId hoặc txid' }, { status: 400 })
    }

    // Gọi Pi API để xác thực hoàn tất giao dịch
    const piRes = await fetch(`https://api.minepi.com/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Key ${piApiKey}`,
      },
      body: JSON.stringify({ txid }),
    })

    if (!piRes.ok) {
      const errorDetail = await piRes.text()
      console.error('🔥 Pi API trả về lỗi:', errorDetail)
      return NextResponse.json({
        success: false,
        error: 'Lỗi xử lý giao dịch từ Pi',
        detail: errorDetail,
      }, { status: 500 })
    }

    const payment = await piRes.json()

    // Nếu không có thông tin giao dịch thì không lưu
    if (!payment || !payment.identifier) {
      return NextResponse.json({
        success: false,
        error: 'Không có dữ liệu giao dịch từ Pi API',
      }, { status: 400 })
    }

    // Lưu đơn hàng vào Supabase
    const order = {
      payment_id: payment.identifier,
      txid,
      username: payment.user?.username || 'unknown',
      uid: payment.user?.uid || 'unknown',
      amount: payment.amount || 0.001,
      product_id: payment.metadata?.productId || 'unknown',
    }

    const { data, error } = await supabase.from('orders').insert([order])

    if (error) {
      console.error('❌ Lỗi lưu đơn hàng vào Supabase:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })

  } catch (err) {
    console.error('❌ Lỗi khi xử lý /api/complete:', err)
    return NextResponse.json({ success: false, error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
