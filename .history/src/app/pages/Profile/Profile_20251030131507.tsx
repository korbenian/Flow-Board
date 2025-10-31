'use client'

import { useTask } from '../../components/context/TaskContext'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import EditProfile from './EditProfile'
import Sidebar from '../../sidebar/sidebar'
import AvatarUpload from './AvatarUpload'
import TechSelector from './TechSelector'

export default function ProfileUser () {
  const t = useTranslations('profile')
  const { profile, tasks } = useTask()
  const [isEditing, setIsEditing] = useState(false)
  const [techStack, setTechStack] = useState<string[]>([])
  const [showTech, setShowTech] = useState(false)

  useEffect(() => {
    if (profile?.techStack) setTechStack(profile.techStack)
  }, [profile])

  if (!profile) return <p>{t('loading')}</p>

  return (
    <div className='flex min-h-screen transition-colors duration-300'>
      {/* Sidebar */}
      <aside className='w-64 border-r transition-colors duration-300'>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-6 flex flex-col'>
        {!isEditing ? (
          <>
            {/* Профиль */}
            <section className='flex flex-col gap-6'>
              {/* Основные данные */}
              <div className='flex flex-col items-start'>
                <AvatarUpload />

                <p className='text-2xl font-bold text-gray-900 mt-2 capitalize'>
                  {profile.name || t('notSpecified')}
                </p>

                <div className='flex gap-3.5 text-gray-600 font-medium'>
                  <span>{profile.pseudoname || t('notSpecified')}</span>
                  <span>•</span>
                  <span>{profile.age || t('notSpecified')}</span>
                  <span>•</span>
                  <span>{profile.sex || t('notSpecified')}</span>
                </div>
              </div>

              {/* Описание */}
              <div className='bg-white border border-gray-200 rounded-xl p-5 shadow-sm'>
                <p className='text-gray-800 font-medium'>
                  {profile.description || t('notSpecified')}
                </p>
                <p className='text-gray-500 mt-1'>
                  {profile.location || t('notSpecified')}
                </p>
                <p className='text-gray-500 mt-1'>
                  {profile.email || t('notSpecified')}
                </p>
              </div>

              {/* Кнопки */}
              <div className='flex gap-3'>
                <button
                  className='w-1/3 py-2 px-4 rounded-3xl font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition-colors duration-300'
                  onClick={() => setIsEditing(true)}
                >
                  {t('fillProfile')}
                </button>

                <button
                  className='w-1/3 py-2 px-4 rounded-3xl font-medium text-black bg-amber-500 hover:bg-amber-600 shadow-sm hover:shadow-md transition-colors duration-300'
                  onClick={() => setShowTech(prev => !prev)}
                >
                  {showTech ? t('hideTech') : t('addTech')}
                </button>
              </div>

              {/* Технологии */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  showTech ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <TechSelector onChange={list => setTechStack(list)} />
              </div>

              <p className='text-sm text-gray-600 mt-2'>
                {t('technologies')}: {techStack.join(', ') || t('notSelected')}
              </p>
            </section>

            {/* Завершённые задачи */}
            <section className='mt-10'>
              <h2 className='text-xl font-semibold mb-4 text-gray-900'>
                {t('completedTasks')}
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-[25rem]'>
                {tasks.filter(task => task.status === 'Done').length > 0 ? (
                  tasks
                    .filter(task => task.status === 'Done')
                    .map(task => (
                      <div
                        key={task.id}
                        className='bg-white border border-gray-200 rounded-xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300'
                      >
                        <div className='flex items-center justify-between'>
                          <h3 className='font-semibold text-lg text-gray-900'>
                            {task.title}
                          </h3>
                        </div>
                        <p className='text-sm text-gray-600 mt-1'>
                          {t('deadline')}: {task.deadline}
                        </p>
                      </div>
                    ))
                ) : (
                  <p className='text-sm text-gray-600'>{t('noTasksDone')}</p>
                )}
              </div>
            </section>
          </>
        ) : (
          <EditProfile user={profile} onClose={() => setIsEditing(false)} />
        )}
      </main>
    </div>
  )
}
