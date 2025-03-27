'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <main className="min-h-screen px-6 py-12 bg-gradient-to-b from-purple-50 to-white text-gray-800">
      <section className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Chào mừng đến với HappyGut!</h1>
        <p className="text-lg mb-4">
          <strong>Lưu Nhuận Linh</strong> là bài thuốc gia truyền đặc trị táo bón, nổi tiếng của dòng họ Lưu.
        </p>
        <p className="text-lg mb-4">
          Sản phẩm được phân phối thông qua ứng dụng <strong>HappyGut</strong> với trải nghiệm Web3 và thanh toán bằng đồng <strong>Pi</strong> tiện lợi.
        </p>
        <p className="text-lg mb-8">
          Phù hợp cho mọi đối tượng từ trẻ em đến người lớn tuổi.
        </p>

        <div className="flex justify-center mb-10">
          <Image
            src="/images/luu-nhuan-linh.jpg"
            alt="Sản phẩm Lưu Nhuận Linh"
            width={300}
            height={300}
            className="rounded-xl shadow-md"
          />
        </div>

        <Link href="/product">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition">
            Truy cập Ứng dụng Pi App
          </button>
        </Link>
      </section>

      <section className="max-w-5xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">💪 Tăng cường tiêu hóa</h3>
          <p className="text-gray-600 text-sm">Giúp hệ tiêu hoá khỏe mạnh, giảm đầy hơi, táo bón</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">🌱 100% thiên nhiên</h3>
          <p className="text-gray-600 text-sm">Chiết xuất từ thảo mộc, an toàn cho mọi đối tượng</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">🧠 Cân bằng hệ vi sinh</h3>
          <p className="text-gray-600 text-sm">Ổn định hệ vi khuẩn có lợi trong đường ruột</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-xl font-semibold mb-2">⚡ Mua hàng bằng Pi</h3>
          <p className="text-gray-600 text-sm">Thanh toán dễ dàng, nhanh chóng qua Pi Network</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-24 text-center">
        <h2 className="text-3xl font-bold mb-8">✨ Khách hàng nói gì?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-xl p-6 text-left">
            <p className="text-sm italic mb-2">“Tôi từng khổ sở vì táo bón mãn tính, nhưng từ khi dùng Lưu Nhuận Linh, cơ thể nhẹ nhõm hẳn. Rất đáng tin!”</p>
            <p className="text-xs font-semibold">— Nguyễn Văn Bình, Hà Nội</p>
          </div>
          <div className="bg-white shadow rounded-xl p-6 text-left">
            <p className="text-sm italic mb-2">“Tôi chọn Lưu Nhuận Linh vì thành phần thiên nhiên. Mẹ tôi 70 tuổi dùng rất hợp và tiêu hóa tốt hơn rõ rệt.”</p>
            <p className="text-xs font-semibold">— Trần Thị Mai, Đà Nẵng</p>
          </div>
        </div>
      </section>
    </main>
  )
}