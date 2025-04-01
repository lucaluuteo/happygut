'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, ShoppingCart } from 'lucide-react'

interface CartItem {
  product: string;
  quantity: number;
  customerName: string;
  phoneNumber: string;
  address: string;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (index: number, type: 'increase' | 'decrease') => {
    const updatedCart = [...cart];
    if (type === 'increase') {
      updatedCart[index].quantity += 1;
    } else if (type === 'decrease' && updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-teal-700 text-center">Giỏ Hàng</h2>
        
        {cart.length === 0 ? (
          <p className="text-center">Giỏ hàng của bạn đang trống.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow border border-teal-200 mb-4">
                <h3 className="text-xl font-bold mb-2">{item.product}</h3>
                <p><strong>Tên khách hàng:</strong> {item.customerName}</p>
                <p><strong>Số điện thoại:</strong> {item.phoneNumber}</p>
                <p><strong>Địa chỉ:</strong> {item.address}</p>
                <p><strong>Số lượng:</strong> {item.quantity}</p>
                
                <div className="flex items-center mt-4 space-x-4">
                  <button 
                    onClick={() => handleQuantityChange(index, 'decrease')} 
                    className="px-3 py-1 bg-teal-600 text-white rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(index, 'increase')} 
                    className="px-3 py-1 bg-teal-600 text-white rounded"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => handleRemoveItem(index)} 
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}

            <div className="text-center mt-8">
              <Link href="/checkout" className="px-5 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">
                Thanh Toán
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
