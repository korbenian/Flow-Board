'use client'
import AddTask from '../../components/addTask'
import { useTranslations } from 'next-intl'
import Sidebar from '../../sidebar/sidebar'
export default function TaskPage () {
  const t = useTranslations('tas')
  return (
    <div className='flex'>
      {/* Сайдбар слева */}
      <Sidebar />

      {/* Контент справа */}
      <main className='flex-1 p-6'>
        <h1 className='text-2xl font-bold mb-6'>{t('Tasks')}</h1>
        <AddTask />
      </main>
    </div>
  )
}
