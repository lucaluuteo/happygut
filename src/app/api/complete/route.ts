import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { paymentId, txid } = body

    if (!paymentId || !txid) {
      return NextResponse.json({ success: false, error: 'Thiếu paymentId hoặc txid' }, { status: 400 })
    }

    // Gọi Pi API để xác nhận giao dịch
    const piRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_SECRET || ''}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txid }),
    })

    const piData = await piRes.json()

    // Nếu Pi trả lỗi hoặc không có dữ liệu, không lưu đơn
    if (!piData || !piData.data || !piData.data.transaction || !piData.data.transaction.txid) {
      console.error('❌ Không có dữ liệu giao dịch hợp lệ từ Pi API:', piData)
      return NextResponse.json({ success: false, error: 'Lỗi xử lý giao dịch từ Pi' }, { status: 400 })
    }

    const payment = piData.data

    // Lưu đơn hàng vào Supabase
    const { data, error } = await supabase.from('orders').insert([
      {
        payment_id: payment.identifier,
        txid: payment.transaction.txid,
        uid: payment.user.uid || '', // có thể không có nếu thiếu
        username: payment.user.username || '',
        amount: payment.amount || 0.001,
        product_id: payment.metadata?.productId || 'sample01',
      },
    ])

    if (error) {
      console.error('❌ Lỗi lưu đơn vào Supabase:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (err) {
    console.error('🔥 Lỗi máy chủ /complete:', err)
    return NextResponse.json({ success: false, error: 'Lỗi máy chủ' }, { status: 500 })
  }
}
