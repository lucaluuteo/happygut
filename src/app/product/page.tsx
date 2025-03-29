import { useState } from 'react'
import { PiNetwork } from '@pinet/pi-sdk'

const pi = new PiNetwork({
  apiKey: process.env.NEXT_PUBLIC_PI_API_KEY!,
  sandbox: true,
})

export default function PaymentPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

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

      // Thêm lắng nghe sự kiện thanh toán hoàn tất từ Pi Wallet
      pi.onPaymentComplete(async (result) => {
        if (result.success && result.data.transaction_verified) {
          // Gọi API /api/complete để xác nhận giao dịch
          const res = await fetch('/api/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paymentId: identifier,
              txid: result.data.transaction.txid,
            }),
          })
          
          const data = await res.json()
          
          if (data.success) {
            setMessage('Thanh toán thành công và đã được ghi nhận!')
          } else {
            setError('Lỗi khi lưu giao dịch vào Supabase.')
          }
        } else {
          setError('Thanh toán thất bại hoặc chưa được xác thực hoàn tất.')
        }
      })

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
