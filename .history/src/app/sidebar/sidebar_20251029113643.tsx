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
    <div className='flex h-full text-black dark:text-white p-4 rounded-xl transition-colors duration-300'>
      <div className='w-64 h-screen text-black dark:text-white p-4 rounded-xl transition-colors duration-300 duration-300'>
        {/* Заголовок */}
        <div className='flex items-center justify-between h-20 px-4 border-b border-gray-200 dark:border-gray-700'>
          <div className='flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black'>
            <ChartNoAxesCombined />
            {t('title')}
          </div>

          {/* Переключатель темы */}
          <ThemeToggle />
        </div>

        {/* Навигация */}
        <div className='flex-1 overflow-y-auto'>
          <h1 className='text-xs ml-4 text-gray-400 dark:text-gray-500 mt-4'>
            {t('overview')}
          </h1>
          <nav className='flex flex-col gap-6 p-4'>
            <Link
              href='/dashboard'
              className='flex items-center gap-2 font-medium text-black dark:text-amber-100 hover:text-red-600 dark:hover:text-red-400 transition-colors'
            >
              <LayoutDashboard size={18} />
              <span>{t('dashboard')}</span>
            </Link>

            <Link
              href='/Articles'
              className='flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors'
            >
              <BookOpenCheck size={18} />
              <span>{t('articles')}</span>
            </Link>

            <Link
              href='/Tasks'
              className='flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors'
            >
              <ClipboardList size={18} />
              <span>{t('tasks')}</span>
            </Link>

            <Link
              href='/Profile'
              className='flex items-center gap-2 font-medium text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors'
            >
              <Users size={18} />
              <span>{t('pro')}</span>
            </Link>

            {/* Переключатель языка */}
            <LanguageSwitcher />
          </nav>
        </div>

        {/* Кнопка выхода */}
        <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
          <button
            className='w-full px-4 py-2 bg-red-500 text-white rounded-xl font-medium shadow-md hover:bg-red-600 active:scale-95 transition-all'
            onClick={() =>
              signOut({
                callbackUrl: '/'
              })
            }
          >
            {t('logout')}
          </button>
        </div>
      </div>
    </div>
  )
}
