'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, ShoppingCart } from 'lucide-react'

interface Order {
  product: string;
  quantity: number;
  customerName: string;
  phoneNumber: string;
  address: string;
}

export default function Checkout() {
  const [order, setOrder] = useState<Order | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem('order') || 'null');
    setOrder(storedOrder);
  }, []);

  const handlePayment = () => {
    if (order) {
      alert('Thanh toán thành công! Cảm ơn bạn đã mua hàng.');
      localStorage.removeItem('order');
      localStorage.removeItem('cart');
      window.location.href = '/';
    }
  };

  return (
    <main className="bg-gradient-to-b from-green-50 to-white text-gray-800 min-h-screen">
      {/* Header */}
      <header className="bg-teal-600 text-white py-4 px-6 sm:px-8 flex justify-between items-center relative">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl sm:text-2xl font-bold">HappyGut</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <ShoppingCart className="w-6 h-6 text-white cursor-pointer" />
          </Link>
          <div className="sm:hidden relative">
            <button onClick={() => setMenuOpen(!menuOpen)}>
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

      <section className="py-12 px-6 sm:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-teal-700 text-center">Thanh Toán</h2>
        
        {!order ? (
          <p className="text-center">Không tìm thấy đơn hàng cần thanh toán.</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow border border-teal-200 space-y-4">
            <h3 className="text-xl font-bold">Sản Phẩm: {order.product}</h3>
            <p><strong>Tên khách hàng:</strong> {order.customerName}</p>
            <p><strong>Số điện thoại:</strong> {order.phoneNumber}</p>
            <p><strong>Địa chỉ giao hàng:</strong> {order.address}</p>
            <p><strong>Số lượng:</strong> {order.quantity}</p>
            <p><strong>Giá:</strong> {order.quantity} Pi</p>

            <div className="text-center mt-6">
              <button 
                onClick={handlePayment} 
                className="px-5 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
              >
                Thanh Toán Bằng Pi
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
