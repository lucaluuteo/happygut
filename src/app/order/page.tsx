'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, ShoppingCart } from 'lucide-react'

export default function Order() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); 
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    setQuantity(prev => type === 'increase' ? prev + 1 : prev > 1 ? prev - 1 : 1);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newItem = {
      product: 'Lưu Nhuận Linh',
      quantity,
      customerName,
      phoneNumber,
      address
    };
    cart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Sản phẩm đã được thêm vào giỏ hàng.');
  };

  const handleBuyNow = () => {
    const order = {
      product: 'Lưu Nhuận Linh',
      quantity,
      customerName,
      phoneNumber,
      address
    };
    localStorage.setItem('order', JSON.stringify(order));
    window.location.href = '/checkout';
  };

  return (
    <main className="bg-gradient-to-b from-green-50 to-white text-gray-800 min-h-screen relative">
      {/* Header */}
      <header className="bg-teal-600 text-white py-4 px-6 sm:px-8 flex justify-between items-center relative">
        <div className="flex items-center space-x-4">
          <Image src="/images/logo-luu-nhuan-linh.jpg" alt="Lưu Nhuận Linh Logo" width={50} height={50} />
          <h1 className="text-xl sm:text-2xl font-bold">HappyGut</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <ShoppingCart className="w-6 h-6 text-white cursor-pointer" />
          </Link>
          <div className="sm:hidden relative">
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        <nav className="hidden sm:flex space-x-6">
          <Link href="/">Trang Chủ</Link>
          <Link href="/product">Sản Phẩm</Link>
          <Link href="/about">Giới Thiệu</Link>
          <Link href="/contact">Liên Hệ</Link>
        </nav>

        {menuOpen && (
          <nav className="fixed top-14 right-0 w-48 bg-teal-600 rounded-lg shadow-lg z-50 transition-all duration-300">
            <ul className="flex flex-col text-left">
              <li><Link href="/" className="block text-white px-4 py-2 hover:bg-teal-700 transition">Trang Chủ</Link></li>
              <li><Link href="/product" className="block text-white px-4 py-2 hover:bg-teal-700 transition">Sản Phẩm</Link></li>
              <li><Link href="/about" className="block text-white px-4 py-2 hover:bg-teal-700 transition">Giới Thiệu</Link></li>
              <li><Link href="/contact" className="block text-white px-4 py-2 hover:bg-teal-700 transition">Liên Hệ</Link></li>
            </ul>
          </nav>
        )}
      </header>

      {/* Order Section */}
      <section className="py-12 px-6 sm:px-8 max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-teal-700 text-center">Đặt Mua Sản Phẩm</h2>

        <div className="mb-6 text-center">
          <Image 
            src="/images/luu-nhuan-linh.JPG" 
            alt="Sản phẩm Lưu Nhuận Linh" 
            width={300} 
            height={300} 
            className="mx-auto rounded-lg shadow"
            priority 
          />
        </div>

        {/* Biểu Đồ Giá Pi */}
        <div className="bg-white p-6 rounded-lg shadow border border-teal-200 mb-6">
          <h3 className="text-lg font-bold text-teal-700 mb-4">Biểu Đồ Giá Pi (Thời Gian Thực)</h3>
          <iframe
            src="https://www.okx.com/en-au/price/pi-network-pi"
            width="100%"
            height="500"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        <div className="flex items-center justify-center mb-6 space-x-4">
          <button onClick={() => handleQuantityChange('decrease')} className="px-4 py-2 bg-teal-600 text-white rounded-lg">-</button>
          <span className="text-lg">{quantity}</span>
          <button onClick={() => handleQuantityChange('increase')} className="px-4 py-2 bg-teal-600 text-white rounded-lg">+</button>
        </div>

        <div className="flex justify-center space-x-4">
          <button className="px-5 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">Mua Ngay</button>
          <button className="px-5 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition">Thêm vào Giỏ Hàng</button>
        </div>
      </section>
    </main>
  )
}
