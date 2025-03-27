'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function ProductPage() {
  return (
    <main className="min-h-screen px-6 py-12 bg-white text-gray-800">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Lưu Nhuận Linh</h1>
        <p className="text-lg mb-6 text-gray-700">
          Bài thuốc gia truyền đặc trị táo bón, kết hợp thảo dược thiên nhiên giúp hỗ trợ hệ tiêu hóa toàn diện.
        </p>
        <div className="flex justify-center mb-8">
          <Image
            src="/images/luu-nhuan-linh.jpg"
            alt="Hình ảnh sản phẩm Lưu Nhuận Linh"
            width={300}
            height={300}
            className="rounded-xl shadow"
          />
        </div>
      </section>

      <section className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2">🎯 Công dụng chính</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Chống táo bón, nhuận tràng tự nhiên</li>
            <li>Giảm đầy hơi, chướng bụng, ăn uống kém</li>
            <li>Làm mềm phân, tăng cường nhu động ruột</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">🌿 Thành phần</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Diếp cá, Mã đề, Cam thảo, Hạt muồng, Cỏ ngọt...</li>
            <li>100% từ thảo dược gia truyền, không chất bảo quản</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">💊 Cách dùng</h2>
          <p className="text-gray-700">Ngày 2 lần, mỗi lần 4-6 viên sau ăn. Uống nhiều nước.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">💰 Giá bán</h2>
          <p className="text-gray-800 font-bold text-xl">0.5 Pi / hộp</p>
        </div>

        <div className="text-center mt-10">
          <Link href="/pi-payment">
            <button className="px-6 py-3 bg-green-600 text-white text-lg rounded-xl shadow hover:bg-green-700 transition">
              Mua ngay bằng Pi
            </button>
          </Link>
        </div>
      </section>
    </main>
  )
}