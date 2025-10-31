'use client'

import { useEffect, useState } from 'react'
import { Task, useTask } from './../components/context/TaskContext'
import TaskForm from '../pages/Tasks/TaskForm'
import TaskView from '../pages/Tasks/TaskView'
import { useTranslations } from 'next-intl'

export default function AddTask () {
  const t = useTranslations('Tasks')
  const { tasks, handleNewTask, handleSave } = useTask()

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // 🔎 фильтрация
  const filteredTasks = tasks.filter(task => {
    const matchesTitle = (task.title || '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'All' || task.status === statusFilter
    return matchesTitle && matchesStatus
  })

  return (
    <div className='flex bg-gray-50 min-h-screen'>
      <div className='flex-1 p-6'>
        {/* Панель фильтров */}
        <div className='flex items-center gap-3 mb-6 bg-white px-4 py-3 rounded-xl shadow-sm'>
          <input
            type='text'
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className='border border-gray-300 rounded-lg px-3 py-2 w-96 focus:ring-2 focus:ring-blue-500 focus:outline-none'
          />

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className='border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
          >
            <option value='All'>{t('filterAll')}</option>
            <option value='To Do'>🔴 {t('filterTodo')}</option>
            <option value='In Progress'>🟡 {t('filterInProgress')}</option>
            <option value='Done'>✅ {t('filterDone')}</option>
          </select>
        </div>

        {/* Плавающая кнопка */}
        <button
          onClick={handleNewTask}
          className='fixed bottom-6 right-6 w-14 h-14 bg-blue-700 hover:bg-blue-800 text-white rounded-full shadow-xl text-3xl flex items-center justify-center transition'
        >
          +
        </button>

        {/* Карточки */}
        <div className='space-y-4'>
          {filteredTasks.map(task => (
            <div
              key={task.id}
              className='bg-white p-5 rounded-xl shadow hover:shadow-md transition'
            >
              {task.isEditing ? (
                <TaskForm task={task} onSave={handleSave} />
              ) : (
                <TaskView task={task} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
