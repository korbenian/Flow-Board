import { useRouter, usePathname } from 'next/navigation'
import ReactCountryFlag from 'react-country-flag'
import { useState, useEffect } from 'react'

export default function LanguageSwitcher () {
  const [locale, setLocale] = useState('en')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const saved = localStorage.getItem('locale') || 'en'
    setLocale(saved)
  }, [])

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)

    // Перенаправляем на новую локаль
    const newPath = pathname.replace(/^\/(en|ru|pl|de|el)/, '') // убираем старую локаль из URL
    router.push(`/${newLocale}${newPath || ''}`)
  }

  return (
    <div className='flex flex-col gap-2 mt-4'>
      <select
        value={locale}
        onChange={e => changeLanguage(e.target.value)}
        className='border rounded p-2'
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
