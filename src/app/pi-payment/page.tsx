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

    try {
      const auth = await Pi.authenticate(['username', 'payments'], (payment: PiPayment) => {
        console.log('⚠️ Có giao dịch chưa hoàn tất:', payment)
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

            await fetch('/api/approve', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ paymentId }),
            })
          },

          onReadyForServerCompletion: async (paymentId: string, txid: string) => {
            console.log('🎯 [complete] paymentId:', paymentId)
            console.log('🎯 [complete] txid:', txid)

            try {
              const res = await fetch('/api/complete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentId, txid }),
              })

              const data = await res.json()
              console.log('✅ [complete] response:', data)
            } catch (err) {
              console.error('❌ Lỗi khi gọi /complete:', err)
            }
          },

          onCancel: (paymentId: string) => {
            console.log('❌ [cancelled] paymentId:', paymentId)
          },

          onError: (error: unknown) => {
            console.error('🔥 [error]', error)
          },
        }
      )
    } catch (err) {
      console.error('❌ createPayment failed:', err)
    }
  }

  return (
    <div>
      <button onClick={handleLogin}>Đăng nhập Pi</button>
      {user && <button onClick={handlePayment}>Thanh toán 0.001 Pi</button>}
    </div>
  )
}
