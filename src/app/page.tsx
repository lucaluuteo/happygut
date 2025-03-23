'use client'

import { useState } from 'react'

type PiUser = {
  uid: string
  username: string
}

declare global {
  interface Window {
    Pi?: {
      init: (config: { version: string; sandbox?: boolean }) => void
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound: (payment: unknown) => void
      ) => Promise<{ user: PiUser }>
    }
  }
}

export default function Home() {
  const [user, setUser] = useState<PiUser | null>(null)

  const handleLogin = async () => {
    try {
      if (!window.Pi) {
        alert('Pi SDK chưa sẵn sàng. Vui lòng mở trong Pi Browser.')
        return
      }

      window.Pi.init({
        version: '2.0',
        sandbox: true,
      })

      const scopes = ['username']
      const auth = await window.Pi.authenticate(scopes, (payment) => {
        console.log('⏳ Giao dịch chưa hoàn tất:', payment)
      })

      setUser(auth.user)
      console.log('✅ Đăng nhập thành công:', auth.user)
    } catch (err) {
      console.error('❌ Lỗi đăng nhập Pi:', err)
      alert('Đăng nhập Pi thất bại.')
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">HappyGut Pi App</h1>

      {user ? (
        <p className="text-green-600">
          ✅ Xin chào <strong>{user.username}</strong>!
        </p>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          Đăng nhập Pi
        </button>
      )}
    </main>
  )
}
