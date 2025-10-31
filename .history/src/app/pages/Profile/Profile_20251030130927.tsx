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
    <div className='flex'>
      <div className='w-64'>
        <Sidebar />
      </div>

      <div className='p-4 flex-col flex flex-row'>
        {!isEditing ? (
          <>
            {/* Профиль */}
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col'>
                <AvatarUpload />
                <p className='text-black font-black capitalize'>
                  {profile.name || t('notSpecified')}
                </p>

                <div className='flex gap-3.5'>
                  <h1 className='text-gray-600 font-medium'>
                    {profile.pseudoname || t('notSpecified')}
                  </h1>
                  <p>•</p>
                  <h2 className='text-gray-500 font-extralight'>
                    {profile.age || t('notSpecified')}
                  </h2>
                  <p>•</p>
                  <h3 className='text-gray-500 font-light'>
                    {profile.sex || t('notSpecified')}
                  </h3>
                </div>
              </div>

              <div>
                <h1 className='w-[45%]'>
                  {profile.description || t('notSpecified')}
                </h1>
                <h2>{profile.location || t('notSpecified')}</h2>
                <h3>{profile.email || t('notSpecified')}</h3>
              </div>

              <button
                className='cursor-pointer w-2/6 bg-blue-700 text-amber-50 rounded-3xl'
                onClick={() => setIsEditing(true)}
              >
                {t('fillProfile')}
              </button>

              <button
                className='cursor-pointer bg-blue-600 w-1/2 text-white px-3 py-1 rounded transition duration-200 hover:bg-blue-700'
                onClick={() => setShowTech(prev => !prev)}
              >
                {showTech ? t('hideTech') : t('addTech')}
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  showTech ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                }`}
              >
                <TechSelector onChange={list => setTechStack(list)} />
              </div>

              <p className='text-sm text-gray-600 mt-2'>
                {t('technologies')}: {techStack.join(', ') || t('notSelected')}
              </p>
            </div>

            {/* Готовые задачи */}
            <div className='mt-8 w-2xs'>
              <h2 className='text-lg font-bold mb-3'>{t('completedTasks')}</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-[25rem]'>
                {tasks.filter(task => task.status === 'Done').length > 0 ? (
                  tasks
                    .filter(task => task.status === 'Done')
                    .map(task => (
                      <div
                        key={task.id}
                        className='bg-white border border-gray-200 shadow-sm rounded-xl p-5 flex flex-col transition'
                      >
                        <div className='flex-1'>
                          <div className='flex items-center justify-between'>
                            <h1 className='font-semibold text-lg text-gray-800'>
                              {task.title}
                            </h1>
                          </div>
                          <h2 className='text-sm text-gray-500 mt-1'>
                            {t('deadline')}: {task.deadline}
                          </h2>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className='text-sm text-gray-500'>{t('noTasksDone')}</p>
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
