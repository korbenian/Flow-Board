'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  BookOpenCheck,
  ClipboardList,
  Users,
  ChartNoAxesCombined
} from 'lucide-react'
import LanguageSwitcher from './../components/LanguageSwitcher'
import ThemeToggle from '../ThemeToggle'

export default function Sidebar () {
  const t = useTranslations('sidebar')

  return (
    <div className='flex h-full p-4 rounded-xl transition-colors duration-300 bg-white dark:bg-gray-900 text-black dark:text-white'>
      <div className='w-64 h-screen p-4 rounded-xl transition-colors duration-300 bg-white dark:bg-gray-900 text-black dark:text-white'>
        {/* Заголовок */}
        <div className='flex items-center justify-between h-20 px-4 border-b border-gray-300 dark:border-gray-700'>
          <div className='flex items-center gap-2 font-black'>
            <ChartNoAxesCombined />
            {t('title')}
          </div>
          <ThemeToggle />
        </div>

        {/* Навигация */}
        <div className='flex-1 overflow-y-auto'>
          <h1 className='text-xs ml-4 mt-4 text-gray-500 dark:text-gray-400'>
            {t('overview')}
          </h1>

          <nav className='flex flex-col gap-6 p-4'>
            <Link href='/dashboard' className='flex items-center gap-2'>
              <LayoutDashboard size={18} />
              <span>{t('dashboard')}</span>
            </Link>

            <Link href='/Articles' className='flex items-center gap-2'>
              <BookOpenCheck size={18} />
              <span>{t('articles')}</span>
            </Link>

            <Link href='/Tasks' className='flex items-center gap-2'>
              <ClipboardList size={18} />
              <span>{t('tasks')}</span>
            </Link>

            <Link href='/Profile' className='flex items-center gap-2'>
              <Users size={18} />
              <span>{t('pro')}</span>
            </Link>

            <LanguageSwitcher />
          </nav>
        </div>

        {/* Кнопка выхода */}
        <div className='p-4 border-t border-gray-300 dark:border-gray-700'>
          <button
            className='w-full px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 active:scale-95 transition-all'
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            {t('logout')}
          </button>
        </div>
      </div>
    </div>
  )
}
