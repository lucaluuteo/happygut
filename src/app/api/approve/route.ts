// src/app/api/approve/route.ts

import { NextResponse } from 'next/server'

const PI_API_KEY = process.env.PI_API_KEY || ''

export async function POST(req: Request) {
  try {
    const { paymentId } = await req.json()

    if (!paymentId) {
      return NextResponse.json({ error: 'Thiếu paymentId' }, { status: 400 })
    }

    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        Authorization: `Key ${PI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status })
    }

    return NextResponse.json({ success: true, data })
  } catch {
    return NextResponse.json({ error: 'Lỗi server khi approve' }, { status: 500 })
  }
}
