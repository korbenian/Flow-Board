'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LanguageSwitcher () {
  const router = useRouter()
  const pathname = usePathname()
  const [locale, setLocale] = useState('en')

  useEffect(() => {
    // Берём текущий язык из URL
    const match = pathname.match(/^\/(en|ru|pl|de|el)/)
    const current = match ? match[1] : 'en'
    setLocale(current)
  }, [pathname])

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return

    // Убираем старую локаль из пути
    const newPath = pathname.replace(/^\/(en|ru|pl|de|el)/, '')
    router.push(`/${newLocale}${newPath || ''}`)
  }

  return (
    <div className='flex flex-col gap-2 mt-4'>
      <select
        value={locale}
        onChange={e => changeLanguage(e.target.value)}
        className='border rounded p-2 bg-white dark:bg-gray-800 dark:text-white'
      >
        <option value='en'>English</option>
        <option value='ru'>Русский</option>
        <option value='pl'>Polski</option>
        <option value='de'>Deutsch</option>
        <option value='el'>Ελληνικά</option>
      </select>
    </div>
  )
}
