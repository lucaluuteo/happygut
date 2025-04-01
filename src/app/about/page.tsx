'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu } from 'lucide-react'

export default function About() {
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
      </header>

      {/* About Section */}
      <section className="py-12 px-6 sm:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-teal-700 text-center">Về HappyGut & Lưu Nhuận Linh</h2>
        
        <div className="space-y-6 text-gray-700">
          <p>
            <strong>HappyGut</strong> là một ứng dụng độc đáo phát triển trong hệ sinh thái Pi Network, giúp người dùng dễ dàng thực hiện thanh toán bằng Pi. 
            Ứng dụng này hỗ trợ người dùng sử dụng sản phẩm <strong>Lưu Nhuận Linh</strong>, một phương thuốc gia truyền đặc biệt của dòng họ Lưu.
          </p>
          
          <h3 className="text-2xl font-bold mt-8 text-teal-700">Nguồn Gốc & Phát Triển</h3>
          <p>
            Sản phẩm <strong>Lưu Nhuận Linh</strong> là một phương thuốc quý giá được truyền lại qua nhiều thế hệ của dòng họ Lưu. 
            Danh y tiên sinh <strong>Lưu Đức Tâm</strong> đã nghiên cứu, cải thiện và phát triển công thức này, giúp mang lại hiệu quả tối ưu trong việc hỗ trợ tiêu hóa và cải thiện sức khỏe đường ruột.
          </p>

          <h3 className="text-2xl font-bold mt-8 text-teal-700">Công Dụng Chính</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>Hỗ trợ nhuận tràng, đặc trị tình trạng táo bón.</li>
            <li>Giúp tăng sức bền thành mạch, tốt cho tiêu hóa.</li>
            <li>Tăng nhu động ruột, cải thiện sự lưu thông hệ tiêu hóa.</li>
          </ul>

          <h3 className="text-2xl font-bold mt-8 text-teal-700">Thành Phần Chính</h3>
          <ul className="list-disc ml-6 space-y-2">
            <li>Hà Thủ Ô: 620mg</li>
            <li>Bạch Vi: 500mg</li>
            <li>Trần Bì: 520mg</li>
            <li>Bạch Truật: 560mg</li>
            <li>Cam Thảo: 100mg</li>
            <li>Bạch Thược: 500mg</li>
            <li>Ngà Truật: 560mg</li>
            <li>Hương Phụ: 400mg</li>
            <li>Hoắc Hương: 350mg</li>
          </ul>

          <div className="text-center my-8">
            <Link href="/product">
              <button className="px-5 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">Xem Sản Phẩm</button>
            </Link>
          </div>

          <Image 
            src="/images/luu-nhuan-linh.JPG" 
            alt="Sản phẩm Lưu Nhuận Linh" 
            width={300} 
            height={300} 
            className="mx-auto my-6 rounded-lg shadow"
          />
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
