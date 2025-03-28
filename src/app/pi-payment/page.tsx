'use client'

import { useEffect, useState } from 'react'

type PiUser = {
  uid: string
  username: string
}

type PiPayment = {
  identifier: string
  transaction?: {
    txid: string
  }
}

function getErrorMessage(err: unknown): string {
  if (typeof err === 'object' && err !== null && 'message' in err) {
    return String((err as { message: string }).message)
  }
  return 'Không rõ lỗi'
}

declare global {
  interface Window {
    Pi?: {
      init: (config: { version: string; sandbox?: boolean }) => void
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound: (payment: PiPayment) => void
      ) => Promise<{ user: PiUser; accessToken: string }>
      createPayment: (
        paymentData: {
          amount: number
          memo: string
          metadata: Record<string, unknown>
        },
        callbacks: {
          onReadyForServerApproval: (paymentId: string) => void
          onReadyForServerCompletion: (paymentId: string, txid: string) => void
          onCancel: (paymentId: string) => void
          onError: (error: unknown, payment: unknown) => void
        }
      ) => Promise<{ paymentId: string }>
    }
  }
}

export default function Home() {
  const [user, setUser] = useState<PiUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [status, setStatus] = useState<string>('🔄 Đang tải SDK...')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.minepi.com/pi-sdk.js'
    script.async = true
    script.onload = () => {
      if (window.Pi) {
        window.Pi.init({ version: '2.0', sandbox: false })
        setStatus('✅ SDK đã sẵn sàng')
      } else {
        setStatus('❌ SDK không tải được')
      }
    }
    document.body.appendChild(script)
  }, [])

  const handleLogin = async () => {
    const Pi = window.Pi
    if (!Pi) {
      setStatus('❌ Pi SDK chưa sẵn sàng')
      return
    }

    setStatus('🔐 Đang đăng nhập...')

    try {
      const auth = await Pi.authenticate(['username', 'payments'], async (payment: PiPayment) => {
        console.log('⚠️ Có giao dịch chưa hoàn tất:', payment)
        alert('⚠️ Có giao dịch chưa hoàn tất — đang xử lý...')

        const txid = payment.transaction?.txid
        if (!txid) {
          console.warn('⚠️ Giao dịch treo không có txid, bỏ qua xử lý.')
          alert('⚠️ Giao dịch treo không có txid, bỏ qua.')
          return
        }

        const res = await fetch('/api/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId: payment.identifier,
            txid,
          }),
        })

        const result = await res.json()
        console.log('✅ Đã xử lý giao dịch treo:', result)
        alert('✅ Giao dịch treo đã được xử lý: ' + JSON.stringify(result))
      })

      setUser(auth.user)
      setAccessToken(auth.accessToken)
      setStatus(`✅ Đăng nhập thành công: ${auth.user.username}`)
    } catch {
      setStatus('❌ Người dùng huỷ hoặc lỗi đăng nhập')
    }
  }

  const handlePayment = async () => {
    const Pi = window.Pi
    if (!Pi) {
      alert('❌ Pi SDK chưa sẵn sàng')
      return
    }

    setStatus('💸 Đang tạo giao dịch...')

    try {
      await Pi.createPayment(
        {
          amount: 0.001,
          memo: 'Thanh toán thử nghiệm HappyGut',
          metadata: { productId: 'sample01' },
        },
        {
          onReadyForServerApproval: async (paymentId: string) => {
            console.log('📦 [approve] paymentId:', paymentId)
            alert('📦 Gửi approve: ' + paymentId)

            const res = await fetch('/api/approve', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paymentId }),
            })

            const data = await res.json()
            console.log('✅ [approve] server response:', data)
            alert('✅ Approve xong: ' + JSON.stringify(data))
          },

          onReadyForServerCompletion: async (paymentId: string, txid: string) => {
            console.log('🎯 [complete] paymentId:', paymentId)
            console.log('🎯 [complete] txid:', txid)
            alert('🎯 Sẵn sàng complete: ' + txid)

            try {
              const res = await fetch('/api/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentId, txid }),
              })

              const data: { success: boolean; [key: string]: unknown } = await res.json()
              console.log('✅ [complete] response:', data)

              if (!data.success) {
                alert('❌ Complete thất bại: ' + JSON.stringify(data))
                console.warn('❌ Không lưu Supabase do lỗi complete:', data)
                return
              }

              alert('✅ Giao dịch đã complete: ' + JSON.stringify(data))

              await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  paymentId,
                  txid,
                  username: user?.username || '',
                  uid: user?.uid || '',
                  amount: 0.001,
                  productId: 'sample01',
                }),
              })
            } catch (err: unknown) {
              console.error('❌ Lỗi khi gọi /complete:', err)
              alert('❌ Lỗi complete: ' + getErrorMessage(err))
            }
          },

          onCancel: (paymentId: string) => {
            console.log('❌ [cancelled] paymentId:', paymentId)
            alert('❌ Người dùng huỷ giao dịch')
          },

          onError: (error: unknown) => {
            console.error('🔥 [error]', error)
            alert('🔥 Lỗi thanh toán: ' + getErrorMessage(error))
          },
        }
      )
    } catch (err) {
      console.error('❌ createPayment failed:', err)
      alert('❌ Gọi createPayment thất bại: ' + getErrorMessage(err))
      setStatus('❌ Người dùng huỷ hoặc lỗi khi thanh toán')
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">HappyGut Pi App</h1>

      {user ? (
        <div className="text-green-600">
          <p>Xin chào <strong>{user.username}</strong>!</p>
          <p className="text-sm mt-2 break-all">Access Token: {accessToken}</p>
          <button
            onClick={handlePayment}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
          >
            Thanh toán 0.001 Pi
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Đăng nhập Pi
        </button>
      )}

      <p className="mt-6 text-sm text-gray-500">{status}</p>
    </main>
  )
}
