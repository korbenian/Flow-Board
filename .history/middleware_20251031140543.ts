import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // 🌍 Доступные языки
  locales: ['en', 'ru', 'pl', 'de', 'el'],

  // 🏁 Язык по умолчанию (если в URL нет /ru, /pl и т.п.)
  defaultLocale: 'en',

  // 🔧 Можно явно указать: куда применять мидлвар
  localePrefix: 'always'
})

export const config = {
  matcher: ['/', '/(en|ru|pl|de|el)/:path*']
}
