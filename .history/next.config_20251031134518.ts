/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  i18n: {
    locales: ['ru', 'en', 'pl', 'de', 'el'], // добавь сюда все свои языки
    defaultLocale: 'ru',
    localeDetection: false // с этого язык сайт будет начинаться
  }
}

export default nextConfig
