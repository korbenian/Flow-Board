'use client'
import Link from 'next/link'
import {
  Inbox,
  LayoutDashboard,
  BookOpenCheck,
  ClipboardList,
  Users,
  UserPen,
  ChartNoAxesCombined
} from 'lucide-react'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
  return (
    <div className='flex'>
      {/* Сайдбар */}
      <div className='w-64 h-screen bg-white shadow-md flex flex-col'>
        {/* Заголовок */}
        <div className='flex items-center gap-2 text-blue-600 font-black h-20 px-4'>
          <ChartNoAxesCombined />
          FlowBoard
        </div>

        {/* Навигация */}
        <div className='flex-1'>
          <h1 className='text-xs ml-4 text-gray-400'>OVERVIEW</h1>
          <nav className='flex flex-col gap-6 p-4'>
            <Link
              href='/dashboard'
              className='flex items-center gap-2 font-medium text-gray-700 hover:text-red-600 transition-colors'
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>

            <Link
              href='/Inbox'
              className='flex items-center gap-2 font-medium text-gray-700 hover:text-red-600 transition-colors'
            >
              <Inbox size={18} />
              <span>Inbox</span>
            </Link>

            <Link
              href='/Articles'
              className='flex items-center gap-2 font-medium text-gray-700 hover:text-red-600 transition-colors'
            >
              <BookOpenCheck size={18} />
              <span>Articles</span>
            </Link>

            <Link
              href='/Tasks'
              className='flex items-center gap-2 font-medium text-gray-700 hover:text-red-600 transition-colors'
            >
              <ClipboardList size={18} />
              <span>Tasks</span>
            </Link>

            <Link
              href='/Group'
              className='flex items-center gap-2 font-medium text-gray-700 hover:text-red-600 transition-colors'
            >
              <Users size={18} />
              <span>Group</span>
            </Link>
            <Link
              href='/Profile'
              className='flex items-center gap-2 font-medium text-gray-700 hover:text-red-600 transition-colors'
            >
              <UserPen size={18} />
              <span>Profile</span>
            </Link>
          </nav>
        </div>

        {/* Кнопка выхода прижата к низу */}
        <div className='p-4'>
          <button
            className='
            w-full
            px-4 py-2
            bg-red-500
            text-white
            rounded-xl
            font-medium
            shadow-md
            hover:bg-red-600
            active:scale-95
            transition-all
          '
            onClick={() =>
              signOut({
                callbackUrl: '/'
              })
            }
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
