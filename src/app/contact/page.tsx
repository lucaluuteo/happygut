'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="bg-gradient-to-b from-green-50 to-white text-gray-800 min-h-screen relative">
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
        </div>

        <nav className="hidden sm:flex space-x-6">
          <Link href="/">Trang Chủ</Link>
          <Link href="/product">Sản Phẩm</Link>
          <Link href="/about">Giới Thiệu</Link>
          <Link href="/contact">Liên Hệ</Link>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed top-14 right-0 w-48 bg-teal-600 rounded-lg shadow-lg z-50 transition-all duration-300">
            <ul className="flex flex-col text-left">
              <li><Link href="/" className="block text-white px-4 py-2 hover:bg-teal-700 transition">Trang Chủ</Link></li>
              <li><Link href="/product" className="block text-white px-4 py-2 hover:bg-teal-700 transition">Sản Phẩm</Link></li>
              <li><Link href="/about" className="block text-white px-4 py-2 hover:bg-teal-700 transition">Giới Thiệu</Link></li>
              <li><Link href="/contact" className="block text-white px-4 py-2 hover:bg-teal-700 transition">Liên Hệ</Link></li>
            </ul>
          </div>
        )}
      </header>

      {/* Contact Section */}
      <section className="py-12 px-6 sm:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-teal-700 text-center">Liên Hệ</h2>
        
        <div className="bg-white p-6 rounded-lg shadow border border-teal-200 space-y-4 text-gray-700 text-lg">
          <div>
            <p><strong>📞 Số điện thoại:</strong> 0964 742 031</p>
          </div>
          <div>
            <p><strong>📧 Email:</strong> lienhe@happygut.vn</p>
          </div>
          <div>
            <p><strong>📍 Địa chỉ văn phòng:</strong> 123 Đường ABC, Phường DEF, Quận GHI, TP. Hồ Chí Minh</p>
          </div>
          <div>
            <p><strong>🕒 Giờ làm việc:</strong> Thứ 2 - Thứ 7, từ 8:00 sáng đến 6:00 chiều</p>
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
