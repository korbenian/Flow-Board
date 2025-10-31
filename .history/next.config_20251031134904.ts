/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  i18n: {
    locales: ['en', 'ru', 'pl', 'de', 'fr'], // порядок не критичен
    defaultLocale: 'en', // 🌍 теперь по умолчанию английский
    localeDetection: false // 🔒 выключаем автоопределение
  }
}

export default nextConfig
