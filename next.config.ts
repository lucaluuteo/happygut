/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'happygut.vercel.app', 'raw.githubusercontent.com'], // Thêm các domain bạn cần
  },
}

module.exports = nextConfig
