import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'ru', 'de', 'pl', 'el'],
  defaultLocale: 'en'
})

export const config = {
  matcher: ['/', '/(ru|en|de|pl|el)/:path*']
}
