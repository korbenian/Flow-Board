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
    <aside className='flex flex-col h-screen w-64 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg rounded-xl transition-colors duration-300'>
      {/* Заголовок */}
      <div className='flex items-center justify-between h-20 px-5 border-b border-gray-200 dark:border-gray-700'>
        <div className='flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black text-lg'>
          <ChartNoAxesCombined />
          {t('title')}
        </div>
        <ThemeToggle />
      </div>

      {/* Навигация */}
      <nav className='flex-1 overflow-y-auto px-5 py-6'>
        <h2 className='text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4'>
          {t('overview')}
        </h2>

        <ul className='flex flex-col gap-4'>
          <li>
            <Link
              href='/dashboard'
              className='flex items-center gap-2 font-medium text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors'
            >
              <LayoutDashboard size={18} />
              {t('dashboard')}
            </Link>
          </li>

          <li>
            <Link
              href='/Articles'
              className='flex items-center gap-2 font-medium text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors'
            >
              <BookOpenCheck size={18} />
              {t('articles')}
            </Link>
          </li>

          <li>
            <Link
              href='/Tasks'
              className='flex items-center gap-2 font-medium text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors'
            >
              <ClipboardList size={18} />
              {t('tasks')}
            </Link>
          </li>

          <li>
            <Link
              href='/Profile'
              className='flex items-center gap-2 font-medium text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 transition-colors'
            >
              <Users size={18} />
              {t('pro')}
            </Link>
          </li>
        </ul>

        {/* Переключатель языка */}
        <div className='mt-8'>
          <LanguageSwitcher />
        </div>
      </nav>

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
    </aside>
  )
}
