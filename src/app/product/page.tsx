'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function Product() {
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

      {/* Product Section */}
      <section className="py-12 px-6 sm:px-8 max-w-sm mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-teal-700 text-center">Sản Phẩm Lưu Nhuận Linh</h2>

        {/* Image Slider */}
        <div className="mb-8 mx-auto max-w-[300px]">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={true}
            interval={3000}
            selectedItem={1}
            className="h-[300px]"  // Đặt chiều cao cố định cho Carousel
          >
            <div>
              <Image 
                src="/images/anh-san-pham1.jpg" 
                alt="Sản phẩm Lưu Nhuận Linh 1" 
                width={300} 
                height={300} 
                className="w-[300px] h-[300px] mx-auto mb-6 rounded-lg shadow"
                priority 
              />
            </div>
            <div>
              <Image 
                src="/images/anh-san-pham2.jpg" 
                alt="Sản phẩm Lưu Nhuận Linh 2" 
                width={300} 
                height={300} 
                className="w-[300px] h-[300px] mx-auto mb-6 rounded-lg shadow"
                priority 
              />
            </div>
            <div>
              <Image 
                src="/images/anh-san-pham3.jpg" 
                alt="Sản phẩm Lưu Nhuận Linh 3" 
                width={300} 
                height={300} 
                className="w-[300px] h-[300px] mx-auto mb-6 rounded-lg shadow"
                priority 
              />
            </div>
          </Carousel>
        </div>

        <div className="space-y-4 text-gray-700 text-center">
          <p><strong>Lưu Nhuận Linh</strong> là sản phẩm bảo vệ sức khỏe đường ruột, giúp:</p>
          <ul className="list-disc ml-6 text-left">
            <li>Hỗ trợ nhuận tràng, đặc trị tình trạng táo bón.</li>
            <li>Giúp tăng sức bền thành mạch, tốt cho tiêu hóa.</li>
            <li>Tăng nhu động ruột, cải thiện sự lưu thông hệ tiêu hóa.</li>
          </ul>
        </div>

        <div className="text-center mt-8">
          <Link href="/order">
            <button className="px-5 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">Đặt Mua Ngay</button>
          </Link>
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
