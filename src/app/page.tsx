'use client'

import { useEffect, useState } from 'react'

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
  const [sdkStatus, setSdkStatus] = useState<string>('')

  // Hiển thị trạng thái SDK khi trang vừa load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.Pi) {
        setSdkStatus('✅ SDK Pi đã được load')
      } else {
        setSdkStatus('❌ SDK Pi chưa load hoặc bị chặn')
      }
    }
  }, [])

  const handleLogin = async () => {
    try {
      const Pi = window.Pi
      if (!Pi || typeof Pi.authenticate !== 'function') {
        setSdkStatus('⚠️ Pi SDK chưa sẵn sàng hoặc không tồn tại')
        return
      }

      setSdkStatus('✅ SDK sẵn sàng. Bắt đầu đăng nhập...')

      Pi.init({
        version: '2.0',
        sandbox: true, // để true trong quá trình phát triển
      })

      const scopes = ['username']
      const auth = await Pi.authenticate(scopes, (payment) => {
        setSdkStatus('🔁 Có giao dịch chưa hoàn tất')
      })

      setUser(auth.user)
      setSdkStatus(`✅ Đăng nhập thành công: ${auth.user.username}`)
    } catch (err) {
      setSdkStatus('❌ Lỗi khi gọi Pi.authenticate() hoặc người dùng huỷ đăng nhập')
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

      {/* Hiển thị trạng thái SDK / lỗi */}
      <p className="mt-4 text-sm text-gray-500">{sdkStatus}</p>
    </main>
  )
}
