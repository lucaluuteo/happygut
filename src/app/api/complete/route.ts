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

    // Gọi API của Pi để xác thực giao dịch (nếu cần)
    // Trong ví dụ này, giả sử thông tin đơn hàng đã có trong metadata khi tạo payment

    // Em sẽ demo tạm thông tin đơn hàng mẫu, trong thực tế có thể lấy từ SDK hoặc truy ngược từ paymentId
    const fakeOrder = {
      product_id: 'sample01',
      product_name: 'HappyGut Test',
      price_pi: 0.001,
      user_uid: 'unknown', // Nếu muốn chuẩn xác, phải lưu UID ngay từ lúc tạo payment
      payment_id: paymentId,
      txid: txid,
      status: 'completed',
    }

    const { data, error } = await supabase.from('Orders').insert([fakeOrder])

    if (error) {
      console.error('Lỗi khi lưu đơn hàng vào Supabase:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 200 })
  } catch (err) {
    console.error('Lỗi khi xử lý /api/complete:', err)
    return NextResponse.json({ success: false, error: 'Lỗi máy chủ' }, { status: 500 })
  }
}