// src/app/api/cancel/route.ts

import { NextResponse } from 'next/server'

const PI_API_KEY = process.env.PI_API_KEY || ''

export async function POST(req: Request) {
  try {
    const { paymentId } = await req.json()

    if (!paymentId) {
      return NextResponse.json({ error: 'Thiếu paymentId' }, { status: 400 })
    }

    const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/cancel`, {
      method: 'POST',
      headers: {
        Authorization: `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: data }, { status: res.status })
    }

    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json({ error: 'Lỗi server khi gọi /cancel' }, { status: 500 })
  }
}
