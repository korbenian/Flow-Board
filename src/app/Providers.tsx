//C:\Users\01\training\src\app\Providers.tsx
'use client'

import { ReactNode, useEffect, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { TaskProvider } from './components/context/TaskContext'

// 🟢 Импортируем переводы статически
import enMessages from '../../messages/en.json'
import plMessages from '../../messages/pl.json'
import ruMessages from '../../messages/ru.json'
import deMessages from '../../messages/de.json'
import elMessages from '../../messages/el.json'

// 🟣 Словарь для удобного выбора
const allMessages: Record<string, any> = {
  en: enMessages,
  pl: plMessages,
  ru: ruMessages,
  de: deMessages,
  el: elMessages
}

export default function Providers ({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en')
  useEffect(() => {
    const saved = localStorage.getItem('locale') || 'en'
    setLocale(saved)

    const handleLangChange = () => {
      const newLocale = localStorage.getItem('locale') || 'en'
      setLocale(newLocale)
    }

    window.addEventListener('languageChange', handleLangChange)
    return () => window.removeEventListener('languageChange', handleLangChange)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('locale') || 'en'
    setLocale(saved)
  }, [])

  const messages = allMessages[locale] || allMessages['en']

  return (
    <SessionProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <TaskProvider>{children}</TaskProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  )
}
