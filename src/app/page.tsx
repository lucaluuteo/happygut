'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="bg-gradient-to-b from-green-50 to-white text-gray-800 min-h-screen">
      {/* Header */}
      <header className="bg-teal-600 text-white py-4 px-6 sm:px-8 flex justify-between items-center relative">
        <div className="flex items-center space-x-4">
          <Image src="/images/logo-luu-nhuan-linh.jpg" alt="Lưu Nhuận Linh Logo" width={50} height={50} />
          <h1 className="text-xl sm:text-2xl font-bold">HappyGut</h1>
        </div>
        
        <div className="sm:hidden relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Toggle menu" 
            aria-expanded={menuOpen}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>

          {menuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-teal-600 rounded-lg shadow-lg z-10 transition-all duration-300">
              <ul className="flex flex-col text-left">
                <li>
                  <Link href="/" className="block text-white px-4 py-2 hover:bg-teal-700 transition">Trang Chủ</Link>
                </li>
                <li>
                  <Link href="/product" className="block text-white px-4 py-2 hover:bg-teal-700 transition">Sản Phẩm</Link>
                </li>
                <li>
                  <Link href="/about" className="block text-white px-4 py-2 hover:bg-teal-700 transition">Giới Thiệu</Link>
                </li>
                <li>
                  <Link href="/contact" className="block text-white px-4 py-2 hover:bg-teal-700 transition">Liên Hệ</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        <nav className="hidden sm:flex space-x-6">
          <Link href="/">Trang Chủ</Link>
          <Link href="/product">Sản Phẩm</Link>
          <Link href="/about">Giới Thiệu</Link>
          <Link href="/contact">Liên Hệ</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-12 text-center bg-gradient-to-b from-teal-100 to-white">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-teal-700">Chăm Sóc Sức Khỏe Đường Ruột Toàn Diện</h2>
          <p className="mb-6 text-gray-700">Sản phẩm thảo dược tự nhiên, thanh toán dễ dàng qua Pi Network.</p>
          <Image src="/images/luu-nhuan-linh.JPG" alt="Sản phẩm Lưu Nhuận Linh" width={300} height={300} className="mx-auto mb-6 rounded-lg shadow" />
          <Link href="/product">
            <button className="px-5 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">Khám Phá Ngay</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-4">
        {[
          { title: '💪 Tăng Cường Tiêu Hóa', text: 'Hỗ trợ tiêu hóa khỏe mạnh, giảm đầy hơi, táo bón.' },
          { title: '🌱 Thành Phần Thiên Nhiên', text: '100% thảo dược thiên nhiên, an toàn cho mọi đối tượng.' },
          { title: '🧠 Cân Bằng Hệ Vi Sinh', text: 'Giúp ổn định hệ vi khuẩn có lợi trong đường ruột.' },
          { title: '⚡ Thanh Toán Bằng Pi', text: 'Thanh toán dễ dàng, nhanh chóng qua Pi Network.' }
        ].map((feature, index) => (
          <div key={index} className="bg-white rounded-xl shadow p-6 text-center border border-green-300">
            <h3 className="text-xl font-semibold mb-2 text-teal-700">{feature.title}</h3>
            <p className="text-gray-600">{feature.text}</p>
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-green-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-teal-700">✨ Khách Hàng Nói Gì?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-xl p-6">
              <p className="italic text-gray-700">“Lưu Nhuận Linh giúp tôi cải thiện tiêu hóa rõ rệt. Sản phẩm thật tuyệt vời!”</p>
              <p className="text-sm font-bold mt-2 text-teal-700">- Nguyễn Văn A, Hà Nội</p>
            </div>
            <div className="bg-white shadow rounded-xl p-6">
              <p className="italic text-gray-700">“Mẹ tôi dùng sản phẩm và đã thấy cải thiện rất nhiều. Cảm ơn HappyGut!”</p>
              <p className="text-sm font-bold mt-2 text-teal-700">- Trần Thị B, Đà Nẵng</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-800 text-white py-6">
        <div className="text-center">
          <p>© 2025 Lưu Nhuận Linh - All rights reserved.</p>
          <p>Liên hệ: 0964 742 031</p>
        </div>
      </footer>
    </main>
  )
}
