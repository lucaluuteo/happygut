'use client'

import { useState } from 'react'

type PiUser = {
  uid: string
  username: string
}

export default function Home() {
  const [user, setUser] = useState<PiUser | null>(null)

  const handleLogin = async () => {
    try {
      const Pi = (window as any).Pi
      if (!Pi) {
        alert('Pi SDK chưa sẵn sàng. Hãy mở trong Pi Browser.')
        return
      }

      // Khởi tạo SDK nếu chưa có
      Pi.init({
        version: '2.0',
        sandbox: true, // đổi thành false nếu deploy production
      })

      // Gọi đăng nhập
      const scopes = ['username']
      function onIncompletePaymentFound(payment: any) {
        console.log('⏳ Giao dịch chưa hoàn tất:', payment)
      }

      const auth = await Pi.authenticate(scopes, onIncompletePaymentFound)
      setUser(auth.user)
      console.log('✅ Đăng nhập thành công:', auth.user)
    } catch (err) {
      console.error('❌ Lỗi đăng nhập Pi:', err)
      alert('Đăng nhập Pi thất bại. Kiểm tra lại Pi Browser.')
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
