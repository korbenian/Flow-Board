'use client'
import ReactCountryFlag from 'react-country-flag'
import { useState, useEffect } from 'react'

// 🔹 Этот компонент просто меняет язык и сообщает об этом Provider'у через localStorage
export default function LanguageSwitcher () {
  const [locale, setLocale] = useState('en')

  useEffect(() => {
    const saved = localStorage.getItem('locale') || 'en'
    setLocale(saved)
  }, [])

  const changeLanguage = (newLocale: string) => {
    if (newLocale === locale) return
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)

    // 🟢 уведомим приложение о смене языка (без перезагрузки)
    window.dispatchEvent(new Event('languageChange'))
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
