'use client'

import { useState } from 'react'
import { PiNetwork } from '@pinet/pi-sdk'

const pi = new PiNetwork({
  apiKey: process.env.NEXT_PUBLIC_PI_API_KEY!,
  sandbox: true,
})

export default function PaymentPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handlePayment = async () => {
    try {
      setLoading(true)
      setError(null)
      setMessage(null)

      const payment = await pi.createPayment({
        amount: 0.001,
        memo: 'Thanh toán thử nghiệm HappyGut',
        metadata: { productId: 'sample01' }
      })

      if (!payment.success) {
        setError('Lỗi tạo thanh toán')
        return
      }

      const { identifier, txid } = payment.data
      setMessage('Giao dịch đã được approve. Vui lòng hoàn tất thanh toán trong Pi Wallet.')
    } catch (err) {
      console.error('Lỗi trong quá trình thanh toán:', err)
      setError('Lỗi trong quá trình thanh toán')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <button
        onClick={handlePayment}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        {loading ? 'Đang xử lý...' : 'Thanh toán 0.001 Pi'}
      </button>

      {error && <div className="text-red-500 mt-4">{error}</div>}
      {message && <div className="text-green-500 mt-4">{message}</div>}
    </div>
  )
}
