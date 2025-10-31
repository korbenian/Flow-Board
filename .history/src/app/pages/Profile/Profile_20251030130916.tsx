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
    <div className='flex min-h-screen bg-gray-50 transition-colors duration-300'>
      {/* Sidebar */}
      <div className='w-64 border-r border-gray-200 dark:border-gray-700 bg-white text-black dark:text-white transition-colors duration-300'>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className='flex-1 p-6 flex flex-col'>
        {!isEditing ? (
          <>
            {/* Профиль */}
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-start'>
                <AvatarUpload />
                <p className='text-2xl font-bold text-gray-900 dark:text-amber-300 mt-2 capitalize'>
                  {profile.name || t('notSpecified')}
                </p>

                <div className='flex gap-3.5 text-gray-600 dark:text-gray-400 font-medium'>
                  <h1>{profile.pseudoname || t('notSpecified')}</h1>
                  <p>•</p>
                  <h2>{profile.age || t('notSpecified')}</h2>
                  <p>•</p>
                  <h3>{profile.sex || t('notSpecified')}</h3>
                </div>
              </div>

              {/* Описание */}
              <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm transition-colors duration-300'>
                <h1 className='text-gray-800 dark:text-gray-100 font-medium'>
                  {profile.description || t('notSpecified')}
                </h1>
                <h2 className='text-gray-500 dark:text-gray-400 mt-1'>
                  {profile.location || t('notSpecified')}
                </h2>
                <h3 className='text-gray-500 dark:text-gray-400 mt-1'>
                  {profile.email || t('notSpecified')}
                </h3>
              </div>

              {/* Кнопки */}
              <div className='flex gap-3'>
                <button
                  className='cursor-pointer w-1/3 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl py-2 px-4 font-medium transition-colors duration-300 shadow-sm hover:shadow-md'
                  onClick={() => setIsEditing(true)}
                >
                  {t('fillProfile')}
                </button>

                <button
                  className='cursor-pointer w-1/3 bg-amber-500 hover:bg-amber-600 text-black dark:text-white rounded-3xl py-2 px-4 font-medium transition-colors duration-300 shadow-sm hover:shadow-md'
                  onClick={() => setShowTech(prev => !prev)}
                >
                  {showTech ? t('hideTech') : t('addTech')}
                </button>
              </div>

              {/* TechSelector */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  showTech ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <TechSelector onChange={list => setTechStack(list)} />
              </div>

              <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>
                {t('technologies')}: {techStack.join(', ') || t('notSelected')}
              </p>
            </div>

            {/* Готовые задачи */}
            <div className='mt-10'>
              <h2 className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'>
                {t('completedTasks')}
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5 w-[25rem]'>
                {tasks.filter(task => task.status === 'Done').length > 0 ? (
                  tasks
                    .filter(task => task.status === 'Done')
                    .map(task => (
                      <div
                        key={task.id}
                        className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300'
                      >
                        <div className='flex items-center justify-between'>
                          <h1 className='font-semibold text-lg text-gray-900 dark:text-amber-300'>
                            {task.title}
                          </h1>
                        </div>
                        <h2 className='text-sm text-gray-600 dark:text-gray-400 mt-1'>
                          {t('deadline')}: {task.deadline}
                        </h2>
                      </div>
                    ))
                ) : (
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    {t('noTasksDone')}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <EditProfile user={profile} onClose={() => setIsEditing(false)} />
        )}
      </div>
    </div>
  )
}
