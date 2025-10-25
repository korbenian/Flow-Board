'use client'

import { useTask } from '../components/context/TaskContext'
import { use, useState } from 'react'
import EditProfile from './EditProfile'
import Sidebar from '../sidebar/sidebar'
import AvatarUpload from './AvatarUpload'
import { Task } from '../components/context/TaskContext'
import TechSelector from './TechSelector'
export default function ProfileUser () {
  const { profile } = useTask()
  const [isEditing, setIsEditing] = useState(false)
  const [techStack, settechStack] = useState<string[]>([])
  const [showTech, setShowTech] = useState(false)
  const { tasks } = useTask()
  if (!profile) return <p>Загрузка...</p>

  return (
    <div className='flex'>
      {/* Сайдбар */}
      <div className='w-64'>
        <Sidebar />
      </div>

      {/* Основной контент */}
      <div className='p-4 flex-col flex flex-row'>
        {!isEditing ? (
          <>
            {/* Профиль */}
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col'>
                <AvatarUpload />
                <p className='text-black font-black capitalize'>
                  {profile.name || 'Не указано'}
                </p>

                <div className='flex gap-3.5'>
                  <h1 className='text-gray-600 font-medium'>
                    {profile.pseudoname || 'Не указано'}
                  </h1>
                  <p>•</p>
                  <h2 className='text-gray-500 font-extralight'>
                    {profile.age || 'Не указано'}
                  </h2>
                  <p>•</p>
                  <h3 className='text-gray-500 font-light'>
                    {profile.sex || 'Не указано'}
                  </h3>
                </div>
              </div>

              <div>
                <h1 className='w-[45%]'>
                  {profile.description || 'Не указано'}
                </h1>
                <h2>{profile.location || 'Не указано'}</h2>
                <h3>{profile.email || 'Не указано'}</h3>
              </div>

              <button
                className='cursor-pointer w-2/6 bg-blue-700 text-amber-50 rounded-3xl'
                onClick={() => setIsEditing(true)}
              >
                Заполнить Профиль
              </button>
              <button
                className='cursor-pointer bg-blue-600 w-1/2 text-white px-3 py-1 rounded transition duration-200 hover:bg-blue-700'
                onClick={() => setShowTech(prev => !prev)}
              >
                {showTech ? 'Скрыть технологии' : 'Добавить технологии'}
              </button>

              <div
                className={`
    transition-all duration-300 overflow-hidden
    ${showTech ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}
  `}
              >
                <TechSelector onChange={list => settechStack(list)} />
              </div>

              <p className='text-sm text-gray-600 mt-2'>
                Технологии: {techStack.join(', ') || 'Не выбрано'}
              </p>
            </div>

            {/* Готовые задачи */}
            <div className='mt-8 w-2xs'>
              <h2 className='text-lg font-bold mb-3'>Готовые задачи</h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-[25rem]'>
                {tasks
                  .filter(task => task.status === 'Done')
                  .map(task => (
                    <div
                      key={task.id}
                      className='bg-white border  border-gray-200 shadow-sm rounded-xl p-5 flex flex-col transition'
                    >
                      <div className='flex-1'>
                        <div className='flex items-center justify-between'>
                          <h1 className='font-semibold text-lg text-gray-800'>
                            {task.title}
                          </h1>
                        </div>

                        <h2 className='text-sm text-gray-500 mt-1'>
                          Дедлайн: {task.deadline}
                        </h2>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className='w-[50%]'></div>
          </>
        ) : (
          <EditProfile user={profile} onClose={() => setIsEditing(false)} />
        )}
      </div>
    </div>
  )
}
